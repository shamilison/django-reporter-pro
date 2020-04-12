class ProcessDimension(object):
    @classmethod
    def build_query(cls, query=None, dimensions=None):
        values = []
        headers = []
        for key in dimensions.keys():
            dimension = dimensions.get(key)
            # Adding dimensions as query VALUES fields
            values.append(dimension.get('attname'))
            # Populating dimension display detail
            _text = dimension.get('verbose_name')
            if dimension.get('_display_config'):
                _text = dimension.get('_display_config').get('label')
            headers.append({
                "text": _text,
                "value": dimension.get('attname'),
            })
        query = query.values(*values)
        return headers, query
