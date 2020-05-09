from django.db.models import Q
from django_reporter_pro.controller.filter_processor.filter_functions import *

FILTERS_MAPPING = {
    'eq': EqualFilter,
    'neq': NotEqualFilter,
    'in': InFilter,
    'not_in': NotInFilter,
    'like': LikeFilter,
    'not_like': NotLikeFilter,
    'ilike': LikeCaseIFilter,
    'not_ilike': NotLikeCaseIFilter,
    'regex': RegexMatchFilter,
    'gt': GreaterThanFilter,
    'gte': GreaterThanEqualFilter,
    'lt': LessThanFilter,
    'lte': LessThanEqualFilter,
    'numbti': BetweenFilter,
    'd_gte': DateLessOrEqualFilter,
    'd_lte': DateGreaterOrEqualFilter,
    'd_range': DateRangeFilter,
    'n_day': LastNDaysFilter,
    'n_week': LastNWeeksFilter,
    'n_month': LastNMonthFilter,
    'n_year': LastNYearsFilter,
    'is_null': IsEmptyFilter,
    'not_null': NotIsEmptyFilter,
}


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
                _filter_query = cls.get_q_expression(_filter=_filter)
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
    def get_q_expression(cls, _filter):
        _query = Q()
        key = _filter.get('query_name')
        config = _filter.get('_filter_config')
        filter_type = config.get('filter')
        filter_inputs = config.get('filterInputs')
        filter_function = FILTERS_MAPPING.get(filter_type)
        if filter_function:
            _is_not, _expression = filter_function(key, filter_inputs, _filter=_filter).get_filter_expression()
            _query = ~Q(**_expression) if _is_not else Q(**_expression)
        return _query

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
