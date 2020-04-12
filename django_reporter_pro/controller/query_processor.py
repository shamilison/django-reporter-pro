from django.apps import apps

from django_reporter.django_reporter_pro.controller.dimension_processor.process_dimensions import ProcessDimension
from django_reporter.django_reporter_pro.controller.filter_processor.process_filters import ProcessFilter

get_model = apps.get_model


class QueryProcessor(object):
    @classmethod
    def build_query(cls, configuration=None):
        query = None
        if not configuration:
            return query
        model_info = configuration.get('table')
        model = get_model(model_info.get('app_label'), model_info.get('model_name'))
        query = model.objects.all()
        headers, query = ProcessDimension.build_query(query=query, dimensions=configuration.get('dimensions'))
        query = ProcessFilter.build_query(query=query, filters=configuration.get('filters'))
        return headers, query
