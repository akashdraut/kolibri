# -*- coding: utf-8 -*-
# Generated by Django 1.11.29 on 2022-05-16 23:03
from __future__ import unicode_literals

from django.db import migrations
from django.db import models

import kolibri.core.discovery.models


class Migration(migrations.Migration):

    dependencies = [
        ("discovery", "0003_networklocation_subset_of_users_device"),
    ]

    operations = [
        migrations.AlterField(
            model_name="networklocation",
            name="id",
            field=models.CharField(
                default=kolibri.core.discovery.models._uuid_string,
                editable=False,
                max_length=36,
                primary_key=True,
                serialize=False,
            ),
        ),
    ]
