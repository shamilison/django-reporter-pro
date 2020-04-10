from django.conf.urls import url

from django_reporter_pro.views.report_configuration_get_view import ReportConfigurationGETView
from django_reporter_pro.views.report_configuration_post_view import ReportConfigurationPOSTView
from django_reporter_pro.views.report_models_view import ReportModelView

urlpatterns = [
    url(r'report-model-info/', ReportModelView.as_view(), name='report_model_info'),
    url(r'report-configuration/create', ReportConfigurationPOSTView.as_view(),
        name='report_configuration_create'),
    url(r'report-configuration/update/(?P<pk>(\d{,}))/$', ReportConfigurationPOSTView.as_view(),
        name='report_configuration_update'),
    url(r'report-configuration/detail/(?P<pk>(\d{,}))/$', ReportConfigurationGETView.as_view(),
        name='report_configuration_get'),
]
