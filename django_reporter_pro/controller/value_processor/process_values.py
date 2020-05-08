from django.db.models import F, Sum, Count, Max, Min, Avg
from django_reporter_pro.enums.enum_mixin import EnumMixin
from django_reporter_pro.extensions.django.db.models.expressions import ForceF
from django_reporter_pro.extensions.django.db.models.functions.postgresql.timestamp import DateFromTimeStamp
from django_reporter_pro.extensions.django.db.models.sql.jsonb_datastructure import JsonbFunctionTable, JsonbFunction


class AggregateEnum(EnumMixin):
    # Regular aggregations
    UN_AGGREGATED = 'unagg'
    COUNT_DISTINCT = 'count'
    COUNT_ALL = 'countall'
    SUM = 'sum'
    AVERAGE = 'average'
    MINIMUM = 'min'
    MAXIMUM = 'max'
    # Date aggregations
    GROUP_DAILY = 'daily'
    GROUP_MONTHLY = 'monthly'
    # Jsonb aggregations
    JSONB_AGGREGATION = 'jsonb_aggregation'
    JSONB_JOIN = 'jsonb_join'


class ProcessMeasure(object):
    @classmethod
    def build_query(cls, model=None, query=None, dimensions=None, measures=None):
        # Process values
        _values = []
        _headers = []
        _order_by = []
        for key in dimensions.keys():
            _dimension_field = dimensions.get(key)
            _display_config = _dimension_field.get('_display_config')
            # Adding dimensions as query VALUES fields
            _field_key = _dimension_field.get('query_name')
            _values.append(_field_key)
            # Populating dimension display detail
            _text = _dimension_field.get('verbose_name')
            if _display_config:
                _text = _display_config.get('label')
                if _display_config.get('sort') == 'ascending':
                    _order_by.append(_field_key)
                elif _display_config.get('sort') == 'descending':
                    _order_by.append('-' + _field_key)
            _headers.append({
                "text": _text,
                "value": _field_key,
            })
        # Process _annotations
        _pre_annotations = {}
        _annotations = {}
        for key in measures.keys():
            _measure_field = measures.get(key)
            _measure_config = _measure_field.get('_measure_config')
            _group_by = _measure_config.get('group_by')
            _measure = _measure_config.get('aggregation', 'unagg')
            # Adding annotations functions
            if str(_measure).startswith('jsonb'):
                _annotation_key = _measure_field.get('query_name') + '_' + _measure
                query, _function = cls.build_jsonb_function(
                    query=query, field=_measure_field, measure_config=_measure_config)
            else:
                _annotation_key = _measure_field.get('query_name') + '_' + _measure
                _function = cls.build_measure_function(key=_measure_field.get('name'), measure=_measure)
            if _function:
                if _group_by:
                    _pre_annotations[_annotation_key] = _function
                    _values.append(_annotation_key)
                else:
                    _annotations[_annotation_key] = _function
            # Adding _annotations in table values list
            _text = _measure_field.get('verbose_name')
            if _measure_config:
                _text = _measure_config.get('label')
                if _measure_config.get('sort') == 'ascending':
                    _order_by.append(_annotation_key)
                elif _measure_config.get('sort') == 'descending':
                    _order_by.append('-' + _annotation_key)
            _headers.append({
                "text": _text,
                "value": _annotation_key,
            })
        # measure end
        query = query.annotate(**_pre_annotations) if len(_pre_annotations.keys()) > 0 else query
        query = query.values(*_values) if _values else query
        query = query.annotate(**_annotations) if len(_annotations.keys()) > 0 else query
        query = query.values(*list(_annotations.keys())) if not _values else query
        query = query.order_by(*_order_by) if _order_by else query
        return _headers, query

    @classmethod
    def build_measure_function(cls, key, measure):
        _function = F(key)
        if measure == AggregateEnum.COUNT_DISTINCT.value:
            _function = Count(key, distinct=True)
        elif measure == AggregateEnum.COUNT_ALL.value:
            _function = Count(key)
        elif measure == AggregateEnum.SUM.value:
            _function = Sum(key)
        elif measure == AggregateEnum.AVERAGE.value:
            _function = Avg(key)
        elif measure == AggregateEnum.MINIMUM.value:
            _function = Min(key)
        elif measure == AggregateEnum.MAXIMUM.value:
            _function = Max(key)
        elif measure == AggregateEnum.GROUP_DAILY.value:
            _function = DateFromTimeStamp(key, 'YYYY-MM-DD')
        elif measure == AggregateEnum.GROUP_MONTHLY.value:
            _function = DateFromTimeStamp(key, 'YYYY-MM')
        return _function

    @classmethod
    def build_jsonb_function(cls, field, query, measure_config):
        _function = None
        _measure = measure_config.get('aggregation')
        if _measure == AggregateEnum.JSONB_JOIN.value:
            _jsonb_config = measure_config.get('jsonb_config')
            _function = ForceF(model=query.model, name=_jsonb_config.get('aggregate_field'),
                               json_field=field.get('query_name'))
            # join jsonb config with query
            _jsonb_columns = [(_column['field'], _column['type']) for _column in _jsonb_config.get('jsonb_columns')]
            join_config = JsonbFunctionTable(
                table_name=query.model._meta.db_table,
                function_name=JsonbFunction.JSONB_TO_RECORDSET,
                field_name='{0}__{1}'.format(
                    field.get('query_name'),
                    '__'.join([_path for _path in _jsonb_config.get('jsonb_path').split(',')])
                ),
                columns=_jsonb_columns,
            )
            query.query.join(join=join_config)
        return query, _function
