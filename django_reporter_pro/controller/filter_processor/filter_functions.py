from django_reporter_pro.extensions.basic.time_fication import get_date_from_string, get_date_n_days_ago, \
    get_date_n_week_ago, get_date_n_month_ago, get_date_n_year_ago


class BaseFilterFunction:
    operators = []
    inputs = []
    to_many = False
    is_not = False

    def __init__(self, key, inputs, **kwargs):
        self.key = key
        if inputs:
            self.inputs = inputs

    def process_inputs(self):
        return self.inputs

    def get_filter_expression(self):
        expression = dict()
        processed_inputs = self.process_inputs()
        if not self.to_many:
            for _op, _input in zip(self.operators, processed_inputs):
                if _op:
                    expression[self.key + '__' + _op] = _input
                else:
                    expression[self.key] = _input
        else:
            expression[self.key + '__' + self.operators[0]] = self.inputs
        return self.is_not, expression


class NotFilterFunction(BaseFilterFunction):
    is_not = True


class EqualFilter(BaseFilterFunction):
    operators = [None]


class NotEqualFilter(NotFilterFunction):
    operators = [None]


class InFilter(BaseFilterFunction):
    operators = ['in']
    to_many = True


class NotInFilter(NotFilterFunction):
    operators = ['in']
    to_many = True


class LikeFilter(BaseFilterFunction):
    operators = ['contains']


class NotLikeFilter(NotFilterFunction):
    operators = ['contains']


class LikeCaseIFilter(BaseFilterFunction):
    operators = ['contains']


class NotLikeCaseIFilter(NotFilterFunction):
    operators = ['contains']


class RegexMatchFilter(BaseFilterFunction):
    operators = ['regex']


class GreaterThanFilter(BaseFilterFunction):
    operators = ['gt']


class GreaterThanEqualFilter(BaseFilterFunction):
    operators = ['gte']


class LessThanFilter(BaseFilterFunction):
    operators = ['lt']


class LessThanEqualFilter(BaseFilterFunction):
    operators = ['lte']


class BetweenFilter(BaseFilterFunction):
    operators = ['gte', 'lte']


class IsEmptyFilter(BaseFilterFunction):
    operators = ['isnull']
    inputs = [True]


class NotIsEmptyFilter(BaseFilterFunction):
    operators = ['isnull']
    inputs = [False]


class NDayFilter(BaseFilterFunction):
    operators = ['isnull']
    inputs = [False]


class DateFilterFunction(BaseFilterFunction):
    is_timestamp = False

    def __init__(self, key, inputs, _filter=False, **kwargs):
        super(DateFilterFunction, self).__init__(key, inputs, **kwargs)
        self.is_timestamp = _filter.get('_python_type').split('.')[-1:][0] in ['BigIntegerField']


class DateLessOrEqualFilter(DateFilterFunction):
    operators = ['lte']

    def process_inputs(self):
        if self.is_timestamp:
            return [int(get_date_from_string(date_input=self.inputs[0], end_of_day=True).timestamp() * 1000)]
        else:
            return get_date_from_string(date_input=self.inputs[0], end_of_day=True)


class DateGreaterOrEqualFilter(DateFilterFunction):
    operators = ['gte']

    def process_inputs(self):
        if self.is_timestamp:
            return [int(get_date_from_string(date_input=self.inputs[0]).timestamp() * 1000)]
        else:
            return get_date_from_string(date_input=self.inputs[0])


class LastNDaysFilter(DateFilterFunction):
    operators = ['gte']

    def process_inputs(self):
        if self.is_timestamp:
            return [int(get_date_n_days_ago(n=int(self.inputs[0])).timestamp() * 1000)]
        else:
            return [get_date_n_days_ago(n=int(self.inputs[0]))]


class LastNWeeksFilter(DateFilterFunction):
    operators = ['gte']

    def process_inputs(self):
        if self.is_timestamp:
            return [int(get_date_n_week_ago(n=int(self.inputs[0])).timestamp() * 1000)]
        else:
            return [get_date_n_week_ago(n=int(self.inputs[0]))]


class LastNMonthFilter(DateFilterFunction):
    operators = ['gte']

    def process_inputs(self):
        if self.is_timestamp:
            return [int(get_date_n_month_ago(n=int(self.inputs[0])).timestamp() * 1000)]
        else:
            return [get_date_n_month_ago(n=int(self.inputs[0]))]


class LastNYearsFilter(DateFilterFunction):
    operators = ['gte']

    def process_inputs(self):
        if self.is_timestamp:
            return [int(get_date_n_year_ago(n=int(self.inputs[0])).timestamp() * 1000)]
        else:
            return [get_date_n_year_ago(n=int(self.inputs[0]))]


class DateRangeFilter(DateFilterFunction):
    operators = ['gte', 'lte']

    def process_inputs(self):
        if self.is_timestamp:
            return [
                int(get_date_from_string(date_input=self.inputs[0]).timestamp() * 1000),
                int(get_date_from_string(date_input=self.inputs[1], end_of_day=True).timestamp() * 1000)
            ]
        else:
            return [
                get_date_from_string(date_input=self.inputs[0]),
                get_date_from_string(date_input=self.inputs[1], end_of_day=True)
            ]
