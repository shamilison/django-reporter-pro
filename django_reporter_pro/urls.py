from django.conf.urls import url
from django.urls import path
from django.views.generic import TemplateView
from django_reporter_pro.views.report_configuration_disable_view import ReportConfigurationDisableView
from django_reporter_pro.views.report_configuration_get_view import ReportConfigurationGETView
from django_reporter_pro.views.report_configuration_post_view import ReportConfigurationPOSTView
from django_reporter_pro.views.report_configuration_preview import ReportConfigurationPreView
from django_reporter_pro.views.report_list_view import ReportConfigurationListView
from django_reporter_pro.views.report_models_view import ReportModelView

urlpatterns = [
    # VueJS development environment loader
    path("django-reporter/", TemplateView.as_view(template_name="django_report_pro.html"),
         name="django_report_url", ),

    # VueJS distribution loader
    path("django-reporter-pro/", TemplateView.as_view(template_name="django_reporter_pro.html"),
         name="django_report_pro_url", ),

    # System data information APIs
    url(r'report-model-info/', ReportModelView.as_view(), name='report_model_info'),

    # Report Configuration APIs
    url(r'report-configuration/list/$', ReportConfigurationListView.as_view(),
        name='report_configuration_list'),
    url(r'report-configuration/create', ReportConfigurationPOSTView.as_view(),
        name='report_configuration_create'),
    url(r'report-configuration/update/(?P<pk>(\d{,}))/$', ReportConfigurationPOSTView.as_view(),
        name='report_configuration_update'),
    url(r'report-configuration/detail/(?P<pk>[\w\-]+)/$', ReportConfigurationGETView.as_view(),
        name='report_configuration_get'),
    url(r'report-configuration/delete/(?P<pk>[\w\-]+)/$', ReportConfigurationDisableView.as_view(),
        name='report_configuration_get'),

    # Preview APIs
    url(r'report-configuration-preview/$', ReportConfigurationPreView.as_view(),
        name='report_configuration_generic_preview'),
    url(r'report-configuration-preview/(?P<pk>[\w\-]+)/$', ReportConfigurationPreView.as_view(),
        name='report_configuration_targeted_preview'),
]
