# Created by shamilsakib at 7/14/2016
import uuid

from django.core.management.base import BaseCommand
from django_reporter_pro.models import ReportConfiguration


class Command(BaseCommand):
    def __init__(self, *args, **kwargs):
        super(Command, self).__init__(*args, **kwargs)
        self.requires_model_validation = True

    def handle(self, *args, **options):
        for report_config in ReportConfiguration.objects.all():
            # Updating Keys for dimensions
            _dimensions = report_config.dimensions
            _keys = _dimensions.keys()
            for _key in _keys:
                _field = _dimensions.get(_key)
                if _key == _field['key_name']:
                    _new_key = str(uuid.uuid4()).replace('-', '')
                    _field['unique_id'] = _new_key
                    _dimensions[_new_key] = _field
                    del _dimensions[_key]
                if _field.get('_display_config') and not _field.get('_dimension_config'):
                    _field['_dimension_config'] = _field['_display_config']
                    del _field['_display_config']
            print(_dimensions)
            report_config.dimensions = _dimensions
            # Updating Keys for measures
            _measures = report_config.measures
            _keys = _measures.keys()
            for _key in _keys:
                _field = _measures.get(_key)
                if _key == _field['key_name']:
                    _new_key = str(uuid.uuid4()).replace('-', '')
                    _field['unique_id'] = _new_key
                    _measures[_new_key] = _field
                    del _measures[_key]
            print(_measures)
            report_config.measures = _measures
            # Updating Keys for filters
            _filters = report_config.filters
            if _filters:
                for _sub_filter in _filters:
                    _keys = _sub_filter.keys()
                    for _key in _keys:
                        _field = _sub_filter.get(_key)
                        if _key == _field['key_name']:
                            _new_key = str(uuid.uuid4()).replace('-', '')
                            _field['unique_id'] = _new_key
                            _sub_filter[_new_key] = _field
                            del _sub_filter[_key]
                print(_filters)
                report_config.filters = _filters
            # Updating Keys for measures
            _orders = report_config.orders
            if _orders:
                for _field in _orders:
                    if _field.get('type') == 'dimension':
                        _keys = _dimensions.keys()
                        for _key in _keys:
                            _d_field = _dimensions.get(_key)
                            if _d_field and _field.get('key_name') == _d_field.get('key_name'):
                                _field['unique_id'] = _d_field.get('unique_id')
                    elif _field.get('type') == 'measure':
                        _keys = _measures.keys()
                        for _key in _keys:
                            _m_field = _measures.get(_key)
                            if _m_field and _field.get('key_name') == _m_field.get('key_name'):
                                _field['unique_id'] = _m_field.get('unique_id')
                    else:
                        pass
                    if _field.get('key_name') and not _field.get('value'):
                        _field['value'] = _field['key_name']
            print(_orders)
            report_config.orders = _orders
            # Updating Keys for searches
            _searches = report_config.searches
            _keys = _searches.keys()
            for _key in _keys:
                _field = _searches.get(_key)
                if _key == _field['key_name']:
                    _new_key = str(uuid.uuid4()).replace('-', '')
                    _field['unique_id'] = _new_key
                    _searches[_new_key] = _field
                    del _searches[_key]
            print(_searches)
            report_config.searches = _searches
            # Save the report
            report_config.save()
