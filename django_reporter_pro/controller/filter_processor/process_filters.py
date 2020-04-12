from django.db.models import Q

from areion.areion_extension.enums.strong_enum import StrongEnum


class FilterTypeEnum(StrongEnum):
    EQUAL = 'eq'
    NOT_EQUAL = 'neq'
    IN = 'in'
    NOT_IN = 'not_in'
    LIKE = 'like'
    NOT_LIKE = 'not_like'
    LIKE_CASE_INS = 'ilike'
    NOT_LIKE_CASE_INS = 'not_ilike'
    GREATER_THAN = 'gt'
    GREATER_THAN_EQUAL = 'gte'
    LESS_THAN = 'lt'
    LESS_THAN_EQUAL = 'lte'
    BETWEEN_INCLUSIVE = 'numbti'
    IS_NULL = 'is_null'
    NOT_NULL = 'not_null'


class ProcessFilter(object):
    @classmethod
    def build_query(cls, query=None, filters=None):
        filter_queries = None
        for _and_filters in filters:
            _and_queries = None
            for key in _and_filters.keys():
                _filter = _and_filters.get(key)
                _filter_key = _filter.get('query_name')
                _filter_query = cls.get_q_expression(key=_filter_key, config=_filter.get('_filter_config'))
                _and_queries = _filter_query if not _and_queries else _and_queries & _filter_query
            if _and_queries:
                filter_queries = _and_queries if not filter_queries else filter_queries | Q(_and_queries)
        if filter_queries:
            query = query.filter(filter_queries)
        return query

    @classmethod
    def get_q_expression(cls, key, config):
        query = Q()
        filter_type = config.get('filter')
        filter_inputs = config.get('filterInputs')
        if filter_type == FilterTypeEnum.BETWEEN_INCLUSIVE.value:
            _query_dict = {}
            _query_dict[key + '__gte'] = float(filter_inputs[0])
            _query_dict[key + '__lte'] = float(filter_inputs[1])
            query = Q(**_query_dict)
        elif filter_type == FilterTypeEnum.GREATER_THAN.value:
            _query_dict = {}
            _query_dict[key + '__gt'] = float(filter_inputs[0])
            query = Q(**_query_dict)
        elif filter_type == FilterTypeEnum.EQUAL.value:
            _query_dict = {}
            _query_dict[key] = filter_inputs[0]
            query = Q(**_query_dict)
        return query
