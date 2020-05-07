from django.db.models import Lookup
from django.db.models.lookups import In, PatternLookup


class NotEqual(Lookup):
    lookup_name = 'ne'

    def as_sql(self, compiler, connection):
        lhs, lhs_params = self.process_lhs(compiler, connection)
        rhs, rhs_params = self.process_rhs(compiler, connection)
        params = lhs_params + rhs_params
        return '%s <> %s' % (lhs, rhs), params


class NotIn(In):
    lookup_name = 'not_in'

    def get_rhs_op(self, connection, rhs):
        return 'NOT IN %s' % rhs


class NotLike(PatternLookup):
    lookup_name = 'not_contains'

    def get_rhs_op(self, connection, rhs):
        return 'NOT LIKE %s' % rhs


class NotILike(PatternLookup):
    lookup_name = 'not_icontains'

    def get_rhs_op(self, connection, rhs):
        return 'NOT LIKE LOWER(%s)' % rhs
