from django.conf.urls import url

from django_reporter_pro.views.report_models_view import ReportModelView

urlpatterns = [
    url(r'^report-model-info/', ReportModelView.as_view(), name='report_model_info'),
]
