# Created by shamilsakib at 04/10/20

from django.conf import settings
from django.contrib.contenttypes.models import ContentType
from django.db import models
from jsonfield import JSONField

BASE_MODEL = settings.BASE_MODEL
if not settings.BASE_MODEL:
    BASE_MODEL = models.Model


class ReportConfiguration(BASE_MODEL):
    model = models.ForeignKey(ContentType, default=None, null=True, on_delete=models.SET_NULL, related_name='reports')
    dimensions = JSONField(max_length=8192, default=None, null=True)
    measures = JSONField(max_length=8192, default=None, null=True)
    filters = JSONField(max_length=8192, default=None, null=True)

    def __init__(self, *args, **kwargs):
        super(ReportConfiguration, self).__init__(*args, **kwargs)

    def __str__(self):
        return f'Model: {self.model}'

    def save(self, force_insert=False, force_update=False, using=None, update_fields=None, **kwargs):
        super(ReportConfiguration, self).save(force_insert, force_update, using, update_fields, **kwargs)

    class Meta:
        app_label = 'django_reporter_pro'
