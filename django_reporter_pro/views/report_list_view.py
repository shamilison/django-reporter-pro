# coding=utf-8
# Created by shamilsakib at 7/19/2016
from django.http.response import JsonResponse
from django_reporter_pro.models import ReportConfiguration
from rest_framework.exceptions import APIException
from rest_framework.views import APIView


class ReportConfigurationListView(APIView):
    authentication_classes = ()
    permission_classes = ()

    def dispatch(self, request, *args, **kwargs):
        return super(ReportConfigurationListView, self).dispatch(request, *args, **kwargs)

    def get(self, request, *args, **kwargs):
        _reports = ReportConfiguration.objects.all()
        if request.GET.get('type') == 'macro':
            _reports = _reports.filter(information__has_key='is_macro', information__is_macro=True)
        return JsonResponse(data={
            "results": [{
                'key': _report.pk,
                'value': _report.pk,
                'text': _report.information.get('title') if _report.information else 'N/A',
                'title': _report.information.get('title') if _report.information else 'N/A',
                'identifier': _report.information.get('identifier') if _report.information else None,
                'created_at': str(_report.created_at),
            } for _report in _reports]
        })

    def post(self, request, *args, **kwargs):
        raise APIException('POST method not allowed.')
