# Created by shamilsakib at 04/10/20

from django.contrib.contenttypes.models import ContentType
from django.contrib.postgres.fields import JSONField
from django.db import models
from django.utils import timezone


# BASE_MODEL = models.Model
# if hasattr(settings, 'BASE_MODEL') and getattr(settings, 'BASE_MODEL'):
#     BASE_MODEL = getattr(settings, 'BASE_MODEL')


class ReportConfigurationManager(models.Manager):
    def __init__(self, user_field=None, user_fields=None):
        super(ReportConfigurationManager, self).__init__()

    def get_queryset(self):
        queryset = super(ReportConfigurationManager, self).get_queryset()
        queryset = queryset.filter(is_deleted=0, is_active=True)
        return queryset


class ReportConfiguration(models.Model):
    model = models.ForeignKey(ContentType, default=None, null=True, on_delete=models.SET_NULL, related_name='reports')
    information = JSONField(max_length=8192, default=None, null=True)
    dimensions = JSONField(max_length=8192, default=None, null=True)
    measures = JSONField(max_length=8192, default=None, null=True)
    filters = JSONField(max_length=8192, default=None, null=True)
    searches = JSONField(max_length=8192, default=None, null=True)
    orders = JSONField(max_length=8192, default=None, null=True)
    report_config = JSONField(max_length=8192, default=None, null=True)

    is_draft = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_deleted = models.SmallIntegerField(default=0)

    created_at = models.DateTimeField(editable=False, default=timezone.now)
    updated_at = models.DateTimeField(editable=False, default=timezone.now)

    objects = ReportConfigurationManager()

    def __init__(self, *args, **kwargs):
        super(ReportConfiguration, self).__init__(*args, **kwargs)

    def __str__(self):
        return f'Model: {self.model}'

    def save(self, force_insert=False, force_update=False, using=None, update_fields=None, **kwargs):
        super(ReportConfiguration, self).save(force_insert, force_update, using, update_fields)

    class Meta:
        app_label = 'django_reporter_pro'
