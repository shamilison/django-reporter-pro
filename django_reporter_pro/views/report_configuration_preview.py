# coding=utf-8
# Created by shamilsakib at 7/19/2016
from django.db.models import QuerySet
from django.http.response import JsonResponse
from django_reporter_pro.controller.query_processor import QueryProcessor
from django_reporter_pro.extensions.handlers.json_handler import JSONHandler
from django_reporter_pro.models import ReportConfiguration
from rest_framework.exceptions import APIException, NotFound
from rest_framework.views import APIView


class ReportConfigurationPreView(APIView):
    authentication_classes = ()
    permission_classes = ()

    def dispatch(self, request, *args, **kwargs):
        return super(ReportConfigurationPreView, self).dispatch(request, *args, **kwargs)

    def get(self, request, *args, **kwargs):
        raise APIException('GET method not allowed.')

    def post(self, request, *args, **kwargs):
        post_data = request.data
        headers, query = QueryProcessor.build_query(configuration=post_data)
        if isinstance(query, dict):
            results = [query]
        else:
            results = list(query)
        return JsonResponse(data={
            'headers': headers,
            'results': results,
        })

    def put(self, request, *args, **kwargs):
        try:
            report_config = ReportConfiguration.objects.get(pk=int(kwargs.get('pk')))
        except:
            report_config = ReportConfiguration.objects.get(information__identifier=kwargs.get('pk'))
        if not report_config:
            raise NotFound("Report configuration not found.")
        search_inputs = request.data
        configuration = {
            'table': JSONHandler().to_json(
                report_config.model.model_class(), depth=2,
                expand=[(
                    '_meta', [
                        'label', 'app_label', 'model_name', 'object_name', 'db_table', 'installed',
                        'abstract', 'proxy', 'auto_created',
                        ('pk', ['column', 'verbose_name']),
                    ],
                )]
            ).get('_meta'),
            'information': report_config.information,
            'dimensions': report_config.dimensions,
            'measures': report_config.measures,
            'filters': report_config.filters,
            'searches': report_config.searches,
            'orders': report_config.orders,
            'search_inputs': search_inputs,
            'report_config': report_config.report_config,
        }
        headers, query = QueryProcessor.build_query(request=request, configuration=configuration)
        if isinstance(query, dict):
            results = [query]
        else:
            results = list(query)
        return JsonResponse(data={
            'headers': headers,
            'results': results,
        })
