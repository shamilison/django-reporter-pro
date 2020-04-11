from django.apps import apps

get_model = apps.get_model


class QueryProcessor(object):
    def build_query(self, configuration=None):
        query = None
        if not configuration:
            return query
        model_info = configuration.get('table')
        model = get_model(model_info.get('app_label'), model_info.get('model_name'))
        dimensions = configuration.get('dimensions')
        values = []
        for key in dimensions.keys():
            dimension = dimensions.get(key)
            values.append(dimension.get('attname'))
        query = model.objects.all().values(*values)
        filters = configuration.get('filters')
        query_filter = None
        for filter in filters:
            pass
        print(str(query.query))
        return query
