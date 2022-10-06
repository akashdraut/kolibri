from django.db.models.query import F

from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from kolibri.core.content.models import ContentNode
from kolibri.core.content.api import ContentNodeProgressViewset
from kolibri.core.content.serializers import ContentNodeSlimSerializer
from .serializers import LearnerClassroomSerializer
from kolibri.core.auth.api import KolibriAuthPermissionsFilter
from kolibri.core.auth.models import Classroom
from kolibri.core.auth.filters import HierarchyRelationsFilter
from kolibri.core.lessons.models import Lesson
from kolibri.core.lessons.models import LessonAssignment
from kolibri.core.lessons.serializers import LessonSerializer


class KnowledgeMapViewset(ReadOnlyModelViewSet):
    def retrieve(self, request, pk=None):
        def get_progress(node):
            serializer = ContentNodeProgressViewset.serializer_class(node)
            serializer.context['request'] = request
            return serializer.data['progress_fraction']

        def get_progress_by_id(id):
            nodes = ContentNode.objects.filter(id=id)
            return 0.0 if len(nodes) == 0 else get_progress(nodes[0])

        def filter_pending(prereqs):
            return filter(lambda p: p['progress'] < 1.0, prereqs)

        def info(nodes):
            return map(lambda n: {'title': n.title,
                                  'content_id': n.content_id,
                                  'progress': get_progress(n),
                                  'id': n.id}, nodes)

        def get_children(parent_id):
            children = ContentNode.objects.filter(parent=parent_id, available=True)
            serialized = ContentNodeSlimSerializer(children, many=True).data
            for c, s in zip(children, serialized):
                s['progress_fraction'] = get_progress(c)
                s['pendingPrerequisites'] = filter_pending(info(c.has_prerequisite.all()))
            return serialized

        children = get_children(pk)
        for child in children:
            grand_children = get_children(child['id'])
            child['children'] = grand_children
        return Response({'results': children, 'progress': get_progress_by_id(pk)})
class LearnerClassroomViewset(ReadOnlyModelViewSet):
    """
    Returns all Classrooms for which the requesting User is a member,
    along with all associated assignments.
    """
    filter_backends = (KolibriAuthPermissionsFilter,)
    permission_classes = (IsAuthenticated,)
    serializer_class = LearnerClassroomSerializer

    def get_queryset(self):
        return HierarchyRelationsFilter(Classroom.objects.all()).filter_by_hierarchy(
            target_user=self.request.user,
            ancestor_collection=F('id')
        )

class LearnerLessonViewset(ReadOnlyModelViewSet):
    """
    Special Viewset for Learners to view Lessons to which they are assigned.
    The core Lesson Viewset is locked down to Admin users only.
    """
    serializer_class = LessonSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        assignments = HierarchyRelationsFilter(LessonAssignment.objects.all()) \
            .filter_by_hierarchy(
                target_user=self.request.user,
                ancestor_collection=F('collection')
        )
        return Lesson.objects.filter(
            lesson_assignments__in=assignments,
            is_active=True
        ).distinct()