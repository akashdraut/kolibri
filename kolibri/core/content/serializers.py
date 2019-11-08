from django.core.cache import cache
from django.db.models import Manager
from django.db.models import Sum
from django.db.models.query import RawQuerySet
from le_utils.constants import content_kinds
from rest_framework import serializers

from kolibri.core.content.models import AssessmentMetaData
from kolibri.core.content.models import ChannelMetadata
from kolibri.core.content.models import ContentNode
from kolibri.core.content.models import File
from kolibri.core.content.models import Language
from kolibri.core.content.models import LocalFile
from kolibri.core.content.utils.channels import get_mounted_drive_by_id
from kolibri.core.content.utils.content_types_tools import (
    renderable_contentnodes_without_topics_q_filter,
)
from kolibri.core.content.utils.content_types_tools import renderable_files_q_filter
from kolibri.core.content.utils.file_availability import (
    get_available_checksums_from_disk,
)
from kolibri.core.content.utils.file_availability import (
    get_available_checksums_from_remote,
)
from kolibri.core.discovery.models import NetworkLocation
from kolibri.core.fields import create_timezonestamp


def _files_for_nodes(nodes):
    return LocalFile.objects.filter(files__contentnode__in=nodes)


def _total_file_size(files_or_nodes):
    if issubclass(files_or_nodes.model, LocalFile):
        localfiles = files_or_nodes
    elif issubclass(files_or_nodes.model, ContentNode):
        localfiles = _files_for_nodes(files_or_nodes)
    else:
        raise TypeError("Expected queryset for LocalFile or ContentNode")
    return localfiles.distinct().aggregate(Sum("file_size"))["file_size__sum"] or 0


class DynamicFieldsModelSerializer(serializers.ModelSerializer):
    def __init__(self, *args, **kwargs):
        # Instantiate the superclass normally
        super(DynamicFieldsModelSerializer, self).__init__(*args, **kwargs)

        # enable dynamic fields specification!
        if "request" in self.context and self.context["request"].GET.get(
            "fields", None
        ):
            fields = self.context["request"].GET["fields"].split(",")
            # Drop any fields that are not specified in the `fields` argument.
            allowed = set(fields)
            existing = set(self.fields.keys())
            for field_name in existing - allowed:
                self.fields.pop(field_name)


class ChannelMetadataSerializer(serializers.ModelSerializer):
    root = serializers.PrimaryKeyRelatedField(read_only=True)
    lang_code = serializers.SerializerMethodField()
    lang_name = serializers.SerializerMethodField()
    available = serializers.SerializerMethodField()

    def to_representation(self, instance):
        # TODO: rtibbles - cleanup this for device specific serializer.
        value = super(ChannelMetadataSerializer, self).to_representation(instance)

        value.update({"num_coach_contents": instance.root.num_coach_contents})

        # if the request includes a GET param 'include_fields', add the requested calculated fields
        if "request" in self.context:

            include_fields = (
                self.context["request"].GET.get("include_fields", "").split(",")
            )

            if include_fields:

                # build querysets for the full set of channel nodes, as well as those that are unrenderable
                channel_nodes = ContentNode.objects.filter(channel_id=instance.id)
                unrenderable_nodes = channel_nodes.exclude(
                    renderable_contentnodes_without_topics_q_filter
                )

                if "total_resources" in include_fields:
                    # count the total number of renderable non-topic resources in the channel
                    # (note: it's faster to count them all and then subtract the unrenderables, of which there are fewer)
                    value["total_resources"] = (
                        channel_nodes.dedupe_by_content_id().count()
                        - unrenderable_nodes.dedupe_by_content_id().count()
                    )

                if "total_file_size" in include_fields:
                    # count the total file size of files associated with renderable content nodes
                    # (note: it's faster to count them all and then subtract the unrenderables, of which there are fewer)
                    value["total_file_size"] = _total_file_size(
                        channel_nodes
                    ) - _total_file_size(unrenderable_nodes)

                if "on_device_resources" in include_fields:
                    # read the precalculated total number of resources from the channel already available
                    value["on_device_resources"] = instance.total_resource_count

                if "on_device_file_size" in include_fields:
                    # read the precalculated total size of available files associated with the channel
                    value["on_device_file_size"] = instance.published_size

        return value

    def get_lang_code(self, instance):
        if instance.root.lang is None:
            return None

        return instance.root.lang.lang_code

    def get_lang_name(self, instance):
        if instance.root.lang is None:
            return None

        return instance.root.lang.lang_name

    def get_available(self, instance):
        return instance.root.available

    class Meta:
        model = ChannelMetadata
        fields = (
            "author",
            "description",
            "id",
            "last_updated",
            "lang_code",
            "lang_name",
            "name",
            "root",
            "thumbnail",
            "version",
            "available",
        )


class PublicChannelSerializer(serializers.ModelSerializer):
    included_languages = serializers.SerializerMethodField()
    matching_tokens = serializers.SerializerMethodField("match_tokens")
    language = serializers.SerializerMethodField()
    icon_encoding = serializers.SerializerMethodField()
    last_published = serializers.SerializerMethodField()
    public = serializers.SerializerMethodField()

    def get_public(self, instance):
        return True

    def get_language(self, instance):
        if instance.root.lang is None:
            return None

        return instance.root.lang.lang_code

    def get_icon_encoding(self, instance):
        return instance.thumbnail

    def get_included_languages(self, instance):
        return list(instance.included_languages.all().values_list("id", flat=True))

    def get_last_published(self, instance):
        return (
            None
            if not instance.last_updated
            else create_timezonestamp(instance.last_updated)
        )

    def match_tokens(self, channel):
        return []

    class Meta:
        model = ChannelMetadata
        fields = (
            "id",
            "name",
            "language",
            "included_languages",
            "description",
            "total_resource_count",
            "version",
            "published_size",
            "last_published",
            "icon_encoding",
            "matching_tokens",
            "public",
        )


class LowerCaseField(serializers.CharField):
    def to_representation(self, obj):
        return super(LowerCaseField, self).to_representation(obj).lower()


class LanguageSerializer(serializers.ModelSerializer):
    id = LowerCaseField(max_length=14)
    lang_code = LowerCaseField(max_length=3)
    lang_subcode = LowerCaseField(max_length=10)

    class Meta:
        model = Language
        fields = ("id", "lang_code", "lang_subcode", "lang_name", "lang_direction")


class FileSerializer(serializers.ModelSerializer):
    checksum = serializers.CharField(source="local_file_id")
    storage_url = serializers.SerializerMethodField()
    download_url = serializers.SerializerMethodField()
    extension = serializers.SerializerMethodField()
    file_size = serializers.SerializerMethodField()
    lang = LanguageSerializer()
    available = serializers.BooleanField(source="local_file.available")

    def get_storage_url(self, target_node):
        return target_node.get_storage_url()

    def get_download_url(self, target_node):
        return target_node.get_download_url()

    def get_extension(self, target_node):
        return target_node.get_extension()

    def get_file_size(self, target_node):
        return target_node.get_file_size()

    class Meta:
        model = File
        fields = (
            "storage_url",
            "id",
            "priority",
            "available",
            "file_size",
            "extension",
            "checksum",
            "preset",
            "lang",
            "supplementary",
            "thumbnail",
            "download_url",
        )


class FileThumbnailSerializer(serializers.ModelSerializer):
    """
    Serializer used only in ContentNodeSlimSerializer (at the moment) to return minimum data
    for frontend to be able to render thumbnails for content browsing
    """

    available = serializers.BooleanField(source="local_file.available")
    storage_url = serializers.SerializerMethodField()

    def get_storage_url(self, target_node):
        # Avoid doing an extra db query if the file is not even a thumbnail
        if not target_node.thumbnail:
            return None

        return target_node.get_storage_url()

    class Meta:
        model = File
        fields = ("storage_url", "available", "thumbnail")


class AssessmentMetaDataSerializer(serializers.ModelSerializer):

    assessment_item_ids = serializers.JSONField(default="[]")
    mastery_model = serializers.JSONField(default="{}")

    class Meta:
        model = AssessmentMetaData
        fields = (
            "assessment_item_ids",
            "number_of_assessments",
            "mastery_model",
            "randomize",
            "is_manipulable",
        )


def get_summary_logs(content_ids, user):
    from kolibri.core.logger.models import ContentSummaryLog

    if not content_ids:
        return ContentSummaryLog.objects.none()
    # get all summary logs for the current user that correspond to the descendant content nodes
    return ContentSummaryLog.objects.filter(user=user, content_id__in=content_ids)


def get_topic_progress_fraction(topic, user):
    leaf_ids = (
        topic.get_descendants(include_self=False)
        .order_by()
        .exclude(kind=content_kinds.TOPIC)
        .values_list("content_id", flat=True)
    )
    return round(
        (
            get_summary_logs(leaf_ids, user).aggregate(Sum("progress"))["progress__sum"]
            or 0
        )
        / (len(leaf_ids) or 1),
        4,
    )


def get_content_progress_fraction(content, user):
    from kolibri.core.logger.models import ContentSummaryLog

    try:
        # add up all the progress for the logs, and divide by the total number of content nodes to get overall progress
        overall_progress = ContentSummaryLog.objects.get(
            user=user, content_id=content.content_id
        ).progress
    except ContentSummaryLog.DoesNotExist:
        return None
    return round(overall_progress, 4)


def get_topic_and_content_progress_fraction(node, user):
    if node.kind == content_kinds.TOPIC:
        return get_topic_progress_fraction(node, user)
    else:
        return get_content_progress_fraction(node, user)


def get_topic_and_content_progress_fractions(nodes, user):
    leaf_ids = (
        nodes.get_descendants(include_self=True)
        .order_by()
        .exclude(available=False)
        .exclude(kind=content_kinds.TOPIC)
        .values_list("content_id", flat=True)
    )

    leaf_node_logs = get_summary_logs(leaf_ids, user)

    overall_progress = {}

    for log in leaf_node_logs.values("content_id", "progress"):
        overall_progress[log["content_id"]] = round(log["progress"], 4)

    for node in nodes:
        if node.kind == content_kinds.TOPIC:
            topic_leaf_ids = (
                node.get_descendants(include_self=True)
                .order_by()
                .exclude(available=False)
                .exclude(kind=content_kinds.TOPIC)
                .values_list("content_id", flat=True)
            )

            overall_progress[node.content_id] = (
                round(
                    sum(overall_progress.get(leaf_id, 0) for leaf_id in topic_leaf_ids)
                    / len(topic_leaf_ids),
                    4,
                )
                if topic_leaf_ids
                else 0.0
            )

    return overall_progress


def get_content_progress_fractions(nodes, user):
    if isinstance(nodes, RawQuerySet) or isinstance(nodes, list):
        leaf_ids = [datum.content_id for datum in nodes]
    else:
        leaf_ids = nodes.exclude(kind=content_kinds.TOPIC).values_list(
            "content_id", flat=True
        )

    summary_logs = get_summary_logs(leaf_ids, user)

    # make a lookup dict for all logs to allow mapping from content_id to current progress
    overall_progress = {
        log["content_id"]: round(log["progress"], 4)
        for log in summary_logs.values("content_id", "progress")
    }
    return overall_progress


class ContentNodeListSerializer(serializers.ListSerializer):
    def to_representation(self, data):

        # Dealing with nested relationships, data can be a Manager,
        # so, first get a queryset from the Manager if needed
        data = data.all() if isinstance(data, Manager) else data

        # initialize cache key
        cache_key = None

        # ensure that we are filtering by the parent only
        # this allows us to only cache results on the learn page
        from .api import ContentNodeFilter

        parent_filter_only = set(self.context["request"].GET.keys()).intersection(
            ContentNodeFilter.Meta.fields
        ) == set(["parent"])

        # Cache parent look ups only
        if parent_filter_only:
            cache_key = "contentnode_list_{parent}".format(
                parent=self.context["request"].GET.get("parent")
            )

            if cache.get(cache_key):
                return cache.get(cache_key)

        if not data:
            return data

        if (
            "request" not in self.context
            or not self.context["request"].user.is_facility_user
        ):
            progress_dict = {}
        else:
            user = self.context["request"].user
            # Don't annotate topic progress as too expensive
            progress_dict = get_content_progress_fractions(data, user)

        result = []
        topic_only = True

        # Allow results to be limited after all queryset filtering has occurred
        if self.limit:
            data = data[: self.limit]

        for item in data:
            obj = self.child.to_representation(
                item,
                progress_fraction=progress_dict.get(item.content_id),
                annotate_progress_fraction=False,
            )
            topic_only = topic_only and obj.get("kind") == content_kinds.TOPIC
            result.append(obj)

        # Only store if all nodes are topics, because we don't annotate progress on them
        # This has the happy side effect of not caching our dynamically calculated
        # recommendation queries, which might change for the same user over time
        # because they do not return topics
        if topic_only and parent_filter_only:
            cache.set(cache_key, result, 60 * 10)

        return result


class ContentNodeSerializer(DynamicFieldsModelSerializer):
    parent = serializers.PrimaryKeyRelatedField(read_only=True)
    files = FileSerializer(many=True, read_only=True)
    assessmentmetadata = AssessmentMetaDataSerializer(
        read_only=True, allow_null=True, many=True
    )
    lang = LanguageSerializer()

    class Meta:
        model = ContentNode
        fields = (
            "id",
            "assessmentmetadata",
            "author",
            "available",
            "channel_id",
            "coach_content",
            "content_id",
            "description",
            "files",
            "kind",
            "lang",
            "license_description",
            "license_name",
            "license_owner",
            "num_coach_contents",
            "parent",
            "sort_order",
            "title",
        )
        list_serializer_class = ContentNodeListSerializer

    def __new__(cls, *args, **kwargs):
        # This is overwritten to provide a ListClassSerializer for many=True
        limit = kwargs.pop("limit", None)
        new = super(ContentNodeSerializer, cls).__new__(cls, *args, **kwargs)
        new.limit = limit
        return new

    def to_representation(
        self, instance, progress_fraction=None, annotate_progress_fraction=True
    ):
        if progress_fraction is None and annotate_progress_fraction:
            if (
                "request" not in self.context
                or not self.context["request"].user.is_facility_user
            ):
                # Don't try to annotate for a non facility user
                progress_fraction = 0.0
            else:
                user = self.context["request"].user
                if instance.kind != content_kinds.TOPIC:
                    progress_fraction = get_content_progress_fraction(instance, user)
        value = super(ContentNodeSerializer, self).to_representation(instance)
        value["progress_fraction"] = progress_fraction
        return value


class ContentNodeSlimSerializer(DynamicFieldsModelSerializer):
    """
    Lighter version of the ContentNodeSerializer whose purpose is to provide a minimum
    subset of ContentNode fields necessary for functional content browsing
    """

    parent = serializers.PrimaryKeyRelatedField(read_only=True)
    files = FileThumbnailSerializer(many=True, read_only=True)

    class Meta:
        model = ContentNode
        fields = (
            "id",
            "parent",
            "description",
            "channel_id",
            "content_id",
            "kind",
            "files",
            "title",
            "num_coach_contents",
        )


class ContentNodeGranularSerializer(serializers.ModelSerializer):
    num_coach_contents = serializers.SerializerMethodField()
    total_resources = serializers.SerializerMethodField()
    on_device_resources = serializers.SerializerMethodField()
    importable = serializers.SerializerMethodField()

    class Meta:
        model = ContentNode
        fields = (
            "id",
            "available",
            "coach_content",
            "importable",
            "kind",
            "num_coach_contents",
            "on_device_resources",
            "title",
            "total_resources",
        )

    def get_total_resources(self, instance):
        if instance.kind == content_kinds.TOPIC:
            return (
                instance.get_descendants(include_self=True)
                .filter(renderable_contentnodes_without_topics_q_filter)
                .distinct()
                .count()
            )
        # Otherwise just return 1 because, we shouldn't be serializing any unrenderable leaf nodes
        return 1

    def get_on_device_resources(self, instance):
        if instance.kind == content_kinds.TOPIC:
            return (
                instance.get_descendants(include_self=True)
                .filter(renderable_contentnodes_without_topics_q_filter)
                .filter(available=True)
                .distinct()
                .count()
            )
        # Either it's on the device, or it's not!
        return int(instance.available)

    def get_num_coach_contents(self, instance):
        # If for exporting, only show what is available on server. For importing,
        # show all of the coach contents in the topic.
        for_export = self.context["request"].query_params.get("for_export", None)
        if for_export:
            return instance.num_coach_contents
        if instance.kind == content_kinds.TOPIC:
            return (
                instance.get_descendants()
                .filter(renderable_contentnodes_without_topics_q_filter)
                .filter(coach_content=True)
                .exclude(kind=content_kinds.TOPIC)
                .distinct()
                .count()
            )
        return int(instance.coach_content)

    def checksums_from_drive_id(self, drive_id, instance):
        try:
            datafolder = get_mounted_drive_by_id(drive_id)
        except KeyError:
            raise serializers.ValidationError(
                "The external drive with given drive id {} does not exist.".format(
                    drive_id
                )
            )

        return get_available_checksums_from_disk(instance.channel_id, datafolder)

    def checksums_from_peer_id(self, peer_id, instance):
        try:
            network_location = NetworkLocation.objects.values("base_url").get(
                id=peer_id
            )
            base_url = network_location["base_url"]
        except NetworkLocation.DoesNotExist:
            raise serializers.ValidationError(
                "The network location with the id {} does not exist".format(peer_id)
            )

        return get_available_checksums_from_remote(instance.channel_id, base_url)

    def get_importable(self, instance):
        drive_id = self.context["request"].query_params.get(
            "importing_from_drive_id", None
        )
        peer_id = self.context["request"].query_params.get(
            "importing_from_peer_id", None
        )

        # If import is from Studio, assume it is importable.
        if drive_id is None and peer_id is None:
            return True

        if drive_id is not None and peer_id is not None:
            raise serializers.ValidationError(
                "Must specify at most one of importing_from_drive_id and importing_from_peer_id"
            )
        if drive_id is not None:
            channel_checksums = self.checksums_from_drive_id(drive_id, instance)

        elif peer_id is not None:
            channel_checksums = self.checksums_from_peer_id(peer_id, instance)

        if instance.kind == content_kinds.TOPIC:
            descendants = (
                instance.get_descendants()
                .exclude(kind=content_kinds.TOPIC)
                .filter(renderable_contentnodes_without_topics_q_filter)
            )
            content_files = File.objects.filter(
                supplementary=False, contentnode__in=descendants
            )
            file_requirement_operator = any
        else:
            content_files = instance.files.filter(supplementary=False)
            file_requirement_operator = all
        content_files = list(
            content_files.filter(renderable_files_q_filter)
            .values_list("local_file_id", flat=True)
            .distinct()
        )

        # If ContentNode has no files, then it is not importable.
        if not content_files:
            return False

        return file_requirement_operator(
            checksum in channel_checksums for checksum in content_files
        )


class ContentNodeProgressListSerializer(serializers.ListSerializer):
    def to_representation(self, data):

        if not data:
            return data

        if (
            "request" not in self.context
            or not self.context["request"].user.is_facility_user
        ):
            progress_dict = {}
        else:
            user = self.context["request"].user
            # Don't annotate topic progress as too expensive
            progress_dict = get_topic_and_content_progress_fractions(data, user)

        # Dealing with nested relationships, data can be a Manager,
        # so, first get a queryset from the Manager if needed
        iterable = data.all() if isinstance(data, Manager) else data

        return [
            self.child.to_representation(
                item,
                progress_fraction=progress_dict.get(item.content_id, 0.0),
                annotate_progress_fraction=False,
            )
            for item in iterable
        ]


class ContentNodeProgressSerializer(serializers.Serializer):
    def to_representation(
        self, instance, progress_fraction=None, annotate_progress_fraction=True
    ):
        if progress_fraction is None and annotate_progress_fraction:
            if (
                "request" not in self.context
                or not self.context["request"].user.is_facility_user
            ):
                # Don't try to annotate for a non facility user
                progress_fraction = 0
            else:
                user = self.context["request"].user
                progress_fraction = (
                    get_topic_and_content_progress_fraction(instance, user) or 0.0
                )
        return {"id": instance.id, "progress_fraction": progress_fraction}

    class Meta:
        list_serializer_class = ContentNodeProgressListSerializer
