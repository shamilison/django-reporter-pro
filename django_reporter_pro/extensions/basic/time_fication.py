from datetime import datetime, timedelta
from dateutil.relativedelta import relativedelta


def get_date_n_days_ago(n=None, time_now=datetime.now()):
    if not n:
        return time_now.replace(hour=0, minute=0, second=0, microsecond=0)
    return (time_now - timedelta(days=n)).replace(hour=0, minute=0, second=0, microsecond=0)


def get_date_n_week_ago(n=None, time_now=datetime.now()):
    if not n:
        return time_now.replace(hour=0, minute=0, second=0, microsecond=0)
    days_to_back = (n - (1 if (time_now.weekday() + 1) % 7 > 0 else 0)) * 7 + (time_now.weekday() + 1) % 7
    return (time_now - timedelta(days=days_to_back)).replace(hour=0, minute=0, second=0, microsecond=0)


def get_date_n_month_ago(n=None, time_now=datetime.now()):
    if not n:
        return time_now.replace(hour=0, minute=0, second=0, microsecond=0)
    return (time_now - relativedelta(months=n - 1)).replace(day=1, hour=0, minute=0, second=0, microsecond=0)


def get_date_n_year_ago(n=None, time_now=datetime.now()):
    if not n:
        return time_now.replace(hour=0, minute=0, second=0, microsecond=0)
    return (time_now - relativedelta(years=n - 1)).replace(month=1, day=1, hour=0, minute=0, second=0, microsecond=0)


def get_date_from_string(date_input=None, _format='%Y-%m-%d', end_of_day=False):
    if not date_input:
        return datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)
    result = datetime.strptime(date_input, _format)
    if end_of_day:
        return result.replace(hour=23, minute=59, second=59, microsecond=0)
    else:
        return result.replace(hour=0, minute=0, second=0, microsecond=0)
