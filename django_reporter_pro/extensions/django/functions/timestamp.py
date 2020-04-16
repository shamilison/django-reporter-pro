from django.db.backends.postgresql.operations import DatabaseOperations
from django.db.models import DateField
from django.db.models.lookups import (
    Transform, )


# EXTRACT(\'month\' FROM T2."date_of_birth") AS "month"
# TO_CHAR(TO_TIMESTAMP({0}::float/1000), \'YYYY-MM-DD\')


class ExtendedDatabaseOperations(DatabaseOperations):

    def timestamp_extract_date(self, field_name):
        # https://www.postgresql.org/docs/current/functions-datetime.html#FUNCTIONS-DATETIME-EXTRACT
        return "TO_CHAR(TO_TIMESTAMP({0}::float/1000), \'YYYY-MM-DD\')".format(field_name)


class DateFromTimeStamp(Transform):
    output_field = DateField()

    def __init__(self, expression, **extra):
        super().__init__(expression, **extra)

    def as_sql(self, compiler, connection):
        sql, params = compiler.compile(self.lhs)
        sql = ExtendedDatabaseOperations(connection=connection).timestamp_extract_date(field_name=sql)
        return sql, params

    def resolve_expression(self, query=None, allow_joins=True, reuse=None, summarize=False, for_save=False):
        copy = super().resolve_expression(query, allow_joins, reuse, summarize, for_save)
        return copy
