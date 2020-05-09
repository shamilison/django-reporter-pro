from django.apps import apps

from django_reporter_pro.controller.filter_processor.process_filters import ProcessFilter
from django_reporter_pro.controller.value_processor.process_values import ProcessMeasure

get_model = apps.get_model


class QueryProcessor(object):
    @classmethod
    def build_query(cls, request=None, configuration=None):
        query = None
        if not configuration:
            return query
        model_info = configuration.get('table')
        model = get_model(model_info.get('app_label'), model_info.get('model_name'))
        query = model.objects.all()
        # Apply information Configs
        information_config = configuration.get('information')
        if information_config.get('clear_order'):
            query.query.default_ordering = False
        # Apply filter Configs
        query = ProcessFilter.build_query(
            model=model, request=request, query=query, filters=configuration.get('filters'),
            searches=configuration.get('searches'), search_inputs=configuration.get('search_inputs')
        )
        # Apply dimension and measure Configs
        headers = configuration.get('orders')
        query = ProcessMeasure.build_query(
            model=model, query=query, dimensions=configuration.get('dimensions'),
            measures=configuration.get('measures'))
        return headers, query
