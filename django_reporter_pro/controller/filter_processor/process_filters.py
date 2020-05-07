from django.db.models import Q
from django_reporter_pro.enums.enum_mixin import EnumMixin

from django_reporter_pro.extensions.basic.time_fication import get_date_n_week_ago, get_date_n_days_ago, \
    get_date_n_month_ago, get_date_n_year_ago, get_date_from_string


# Field.register_lookup(NotEqual)
# Field.register_lookup(NotIn)
# Field.register_lookup(NotLike)
# Field.register_lookup(NotILike)

# TODO: Upgrade filter checks using dynamically determined operator valuation
class FilterTypeEnum(EnumMixin):
    EQUAL = 'eq'
    NOT_EQUAL = 'neq'
    IN = 'in'
    NOT_IN = 'not_in'
    LIKE = 'like'
    NOT_LIKE = 'not_like'
    LIKE_CASE_INS = 'ilike'
    NOT_LIKE_CASE_INS = 'not_ilike'
    MATCHES_REGEX = 'regex'
    GREATER_THAN = 'gt'
    GREATER_THAN_EQUAL = 'gte'
    LESS_THAN = 'lt'
    LESS_THAN_EQUAL = 'lte'
    BETWEEN_INCLUSIVE = 'numbti'
    DATE_RANGE = 'date_range'
    N_DAY = 'n_day'
    N_WEEK = 'n_week'
    N_MONTH = 'n_month'
    N_YEAR = 'n_year'
    IS_NULL = 'is_null'
    NOT_NULL = 'not_null'

    # IS_NULL = 'isnull'
    # NOT_NULL = 'not_null'
    # EXACT = 'exact'
    # IEXACT = 'iexact'
    # CONTAINS = 'contains'
    # ICONTAINS = 'icontains'
    # STARTSWITH = 'startswith'
    # ISTARTSWITH = 'istartswith'
    # ENDSWITH = 'endswith'
    # IENDSWITH = 'iendswith'
    # DATE_RANGE = 'range'


class ProcessFilter(object):
    @classmethod
    def build_query(cls, model=None, request=None, query=None, filters=None, searches=None, search_inputs=None):
        _filter_queries = None
        if model and hasattr(model, 'provide_reporter_pro_query_request'):
            query = getattr(model, 'provide_reporter_pro_query_request')(model=model, request=request, query=query)
        for _and_filters in filters:
            _and_queries = None
            for key in _and_filters.keys():
                _filter = _and_filters.get(key)
                if _filter.get('_filter_config').get('apply_date_filter'):
                    _filter_query = cls.get_time_q_expression(filter=_filter)
                else:
                    _filter_query = cls.get_q_expression(filter=_filter)
                _and_queries = _filter_query if not _and_queries else _and_queries & _filter_query
            if _and_queries:
                _filter_queries = _and_queries if not _filter_queries else _filter_queries | Q(_and_queries)
        _search_queries = cls.build_search_query(searches=searches, search_inputs=search_inputs)
        if _search_queries:
            _filter_queries = _search_queries if not _filter_queries else _filter_queries & _search_queries
        if _filter_queries:
            query = query.filter(_filter_queries)
        return query

    @classmethod
    def build_search_query(cls, searches=None, search_inputs=None):
        if not search_inputs:
            return None
        _search_queries = None
        for _key in searches.keys():
            _values = search_inputs.get(_key)
            if not _values:
                continue
            _search = searches.get(_key)
            _search_key = _search.get('query_name')
            _or_queries = None
            for _val in _values.split(','):
                if _search.get('many_to_one', None) is True:
                    _query = Q(**{_search_key: _val})
                else:
                    _query = Q(**{_search_key + '__icontains': _val})
                _or_queries = _query if not _or_queries else _or_queries | _query
            if _or_queries:
                _search_queries = _or_queries if not _search_queries else _search_queries & Q(_or_queries)
        return _search_queries

    @classmethod
    def get_q_expression(cls, filter):
        _query = Q()
        _include_dict = {}
        _exclude_dict = {}
        key = filter.get('query_name')
        config = filter.get('_filter_config')
        filter_type = config.get('filter')
        filter_inputs = config.get('filterInputs')
        if filter_type == FilterTypeEnum.EQUAL.value:
            _include_dict[key] = filter_inputs[0]
        elif filter_type == FilterTypeEnum.NOT_EQUAL.value:
            _exclude_dict[key] = filter_inputs[0]
        elif filter_type == FilterTypeEnum.IN.value:
            _include_dict[key + '__in'] = filter_inputs
        elif filter_type == FilterTypeEnum.NOT_IN.value:
            _exclude_dict[key + '__in'] = filter_inputs
        elif filter_type == FilterTypeEnum.LIKE.value:
            _include_dict[key + '__contains'] = filter_inputs[0]
        elif filter_type == FilterTypeEnum.NOT_LIKE.value:
            _exclude_dict[key + '__contains'] = filter_inputs[0]
        elif filter_type == FilterTypeEnum.LIKE_CASE_INS.value:
            _include_dict[key + '__icontains'] = filter_inputs[0]
        elif filter_type == FilterTypeEnum.NOT_LIKE_CASE_INS.value:
            _exclude_dict[key + '__icontains'] = filter_inputs[0]
        elif filter_type == FilterTypeEnum.MATCHES_REGEX.value:
            _include_dict[key + '__regex'] = r'{0}'.format(filter_inputs[0])
        elif filter_type == FilterTypeEnum.GREATER_THAN.value:
            _include_dict[key + '__gt'] = float(filter_inputs[0])
        elif filter_type == FilterTypeEnum.GREATER_THAN_EQUAL.value:
            _include_dict[key + '__gte'] = float(filter_inputs[0])
        elif filter_type == FilterTypeEnum.LESS_THAN.value:
            _include_dict[key + '__lt'] = float(filter_inputs[0])
        elif filter_type == FilterTypeEnum.LESS_THAN_EQUAL.value:
            _include_dict[key + '__lte'] = float(filter_inputs[0])
        elif filter_type == FilterTypeEnum.BETWEEN_INCLUSIVE.value:
            _include_dict[key + '__gte'] = float(filter_inputs[0])
            _include_dict[key + '__lte'] = float(filter_inputs[1])
        elif filter_type == FilterTypeEnum.IS_NULL.value:
            _include_dict[key + '__isnull'] = True
        elif filter_type == FilterTypeEnum.NOT_NULL.value:
            _include_dict[key + '__isnull'] = False
        if _include_dict:
            _query = Q(**_include_dict)
        if _exclude_dict:
            _query = ~Q(**_exclude_dict)
        return _query

    @classmethod
    def get_time_inputs(cls, field_type, filter_type, inputs):
        resolved_inputs = []
        if field_type in ['BigIntegerField']:
            if filter_type == FilterTypeEnum.N_DAY.value:
                date_time_then = int(get_date_n_days_ago(n=int(inputs[0])).timestamp() * 1000)
                resolved_inputs.append(date_time_then)
            elif filter_type == FilterTypeEnum.N_WEEK.value:
                date_time_then = int(get_date_n_week_ago(n=int(inputs[0])).timestamp() * 1000)
                resolved_inputs.append(date_time_then)
            elif filter_type == FilterTypeEnum.N_MONTH.value:
                date_time_then = int(get_date_n_month_ago(n=int(inputs[0])).timestamp() * 1000)
                resolved_inputs.append(date_time_then)
            elif filter_type == FilterTypeEnum.N_YEAR.value:
                date_time_then = int(get_date_n_year_ago(n=int(inputs[0])).timestamp() * 1000)
                resolved_inputs.append(date_time_then)
            elif filter_type == FilterTypeEnum.DATE_RANGE.value:
                time_start = int(get_date_from_string(date_input=inputs[0]).timestamp() * 1000)
                time_end = int(get_date_from_string(date_input=inputs[1], end_of_day=True).timestamp() * 1000)
                resolved_inputs.append(time_start)
                resolved_inputs.append(time_end)
        else:
            if filter_type == FilterTypeEnum.N_DAY.value:
                date_time_then = get_date_n_days_ago(n=int(inputs[0]))
                resolved_inputs.append(date_time_then)
            elif filter_type == FilterTypeEnum.N_WEEK.value:
                date_time_then = get_date_n_week_ago(n=int(inputs[0]))
                resolved_inputs.append(date_time_then)
            elif filter_type == FilterTypeEnum.N_MONTH.value:
                date_time_then = get_date_n_month_ago(n=int(inputs[0]))
                resolved_inputs.append(date_time_then)
            elif filter_type == FilterTypeEnum.N_YEAR.value:
                date_time_then = get_date_n_year_ago(n=int(inputs[0]))
                resolved_inputs.append(date_time_then)
            elif filter_type == FilterTypeEnum.DATE_RANGE.value:
                time_start = get_date_from_string(date_input=inputs[0])
                time_end = get_date_from_string(date_input=inputs[1], end_of_day=True)
                resolved_inputs.append(time_start)
                resolved_inputs.append(time_end)
        return resolved_inputs

    @classmethod
    def get_time_q_expression(cls, filter):
        _query = Q()
        _include_dict = {}
        _exclude_dict = {}
        key = filter.get('query_name')
        config = filter.get('_filter_config')
        filter_type = config.get('filter')
        filter_inputs = config.get('filterInputs')
        _field_type = filter.get('_python_type').split('.')[-1:][0]
        if filter_type == FilterTypeEnum.EQUAL.value:
            _include_dict[key] = filter_inputs[0]
        elif filter_type == FilterTypeEnum.NOT_EQUAL.value:
            _exclude_dict[key] = filter_inputs[0]
        elif filter_type == FilterTypeEnum.IN.value:
            _include_dict[key + '__in'] = filter_inputs
        elif filter_type == FilterTypeEnum.NOT_IN.value:
            _exclude_dict[key + '__in'] = filter_inputs
        elif filter_type == FilterTypeEnum.GREATER_THAN.value:
            _include_dict[key + '__gt'] = float(filter_inputs[0])
        elif filter_type == FilterTypeEnum.GREATER_THAN_EQUAL.value:
            _include_dict[key + '__gte'] = float(filter_inputs[0])
        elif filter_type == FilterTypeEnum.LESS_THAN.value:
            _include_dict[key + '__lt'] = float(filter_inputs[0])
        elif filter_type == FilterTypeEnum.LESS_THAN_EQUAL.value:
            _include_dict[key + '__lte'] = float(filter_inputs[0])
        elif filter_type == FilterTypeEnum.BETWEEN_INCLUSIVE.value:
            _include_dict[key + '__gte'] = float(filter_inputs[0])
            _include_dict[key + '__lte'] = float(filter_inputs[1])
        elif filter_type == FilterTypeEnum.DATE_RANGE.value:
            resolved_inputs = cls.get_time_inputs(
                field_type=_field_type, filter_type=filter_type, inputs=filter_inputs)
            _include_dict[key + '__gte'] = resolved_inputs[0]
            _include_dict[key + '__lte'] = resolved_inputs[1]
        elif filter_type in [FilterTypeEnum.N_DAY.value, FilterTypeEnum.N_WEEK.value,
                             FilterTypeEnum.N_MONTH.value, FilterTypeEnum.N_YEAR.value]:
            resolved_inputs = cls.get_time_inputs(
                field_type=_field_type, filter_type=filter_type, inputs=filter_inputs)
            _include_dict[key + '__gte'] = resolved_inputs[0]
        elif filter_type == FilterTypeEnum.IS_NULL.value:
            _include_dict[key + '__isnull'] = True
        elif filter_type == FilterTypeEnum.NOT_NULL.value:
            _include_dict[key + '__isnull'] = False
        if _include_dict:
            _query = Q(**_include_dict)
        if _exclude_dict:
            _query = ~Q(**_exclude_dict)
        return _query
