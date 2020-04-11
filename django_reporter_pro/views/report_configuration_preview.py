# coding=utf-8
# Created by shamilsakib at 7/19/2016
from django.http.response import JsonResponse
from rest_framework.exceptions import APIException
from rest_framework.views import APIView

from django_reporter.django_reporter_pro.controller.query_processor import QueryProcessor


class ReportConfigurationPreView(APIView):
    authentication_classes = ()
    permission_classes = ()

    def dispatch(self, request, *args, **kwargs):
        return super(ReportConfigurationPreView, self).dispatch(request, *args, **kwargs)

    def get(self, request, *args, **kwargs):
        raise APIException('GET method not allowed.')

    def post(self, request, *args, **kwargs):
        post_data = request.data
        query = QueryProcessor().build_query(configuration=post_data)
        print(query)
        if query.query:
            print(str(query.query))
        return JsonResponse(data={})
