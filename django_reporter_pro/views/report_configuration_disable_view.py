# coding=utf-8
# Created by shamilsakib at 7/19/2016
from django.http.response import JsonResponse
from django_reporter_pro.models import ReportConfiguration
from rest_framework.exceptions import APIException
from rest_framework.views import APIView


class ReportConfigurationDisableView(APIView):
    authentication_classes = ()
    permission_classes = ()

    def dispatch(self, request, *args, **kwargs):
        return super(ReportConfigurationDisableView, self).dispatch(request, *args, **kwargs)

    def get(self, request, *args, **kwargs):
        raise APIException('GET method not allowed.')

    def put(self, request, *args, **kwargs):
        report_config = ReportConfiguration.objects.get(pk=kwargs.get('pk'))
        report_config.is_active = False
        report_config.save()
        return JsonResponse(data={
            'uuid': report_config.pk,
            'success': True,
        })
