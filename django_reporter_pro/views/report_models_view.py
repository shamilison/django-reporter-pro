# coding=utf-8
# Created by shamilsakib at 7/19/2016
from django.apps import apps

from django_reporter_pro.views.model_json_info_view import ModelJsonHandlerView


class ReportModelView(ModelJsonHandlerView):

    def dispatch(self, request, *args, **kwargs):
        return super(ReportModelView, self).dispatch(request, *args, **kwargs)

    def get_json(self, request, data=None, expand=[], *args, **kwargs):
        if request.GET.get('all_models', 'no') == 'yes':
            models = apps.get_models(include_auto_created=True)
            return super(ReportModelView, self).get_json(
                request, data=models,
                expand=[
                    (
                        '_meta', [
                            'label', 'app_label', 'model_name',
                            'object_name', 'db_table',
                            'installed', 'abstract', 'proxy', 'auto_created',
                            (
                                'pk', [
                                    'column', 'verbose_name'
                                ]
                            ),
                        ],
                    ),
                ],
                *args, **kwargs
            )
        elif request.GET.get('one_model', 'no') == 'yes':
            model = None
            app_label = request.GET.get('app_label')
            model_name = request.GET.get('model_name')
            if app_label is None and model_name is None:
                root_model_info = request.GET.get('field_name')
                root_model = root_model_info.split('.', 2)
                app_label = root_model[0]
                model_name = root_model[1]
                model = apps.get_model(app_label, model_name)
                for field in root_model[2].split('.'):
                    model = model._meta.get_field(field).related_model
            if model is None:
                model = apps.get_model(app_label, model_name)
            return super(ReportModelView, self).get_json(
                request, data=model,
                expand=[
                    (
                        '_meta', [
                            'label', 'app_label', 'model_name',
                            'object_name', 'db_table',
                            'installed', 'abstract', 'proxy', 'auto_created',
                            (
                                'fields', [
                                    'attname', 'column', 'name', 'blank', 'editable', 'null', 'help_text',
                                    'many_to_many', 'many_to_one', 'one_to_one', 'one_to_many',
                                    'primary_key', 'unique', 'verbose_name', '_python_type',
                                    (
                                        'related_model', [
                                            (
                                                '_meta', [
                                                    'label', 'app_label', 'model_name',
                                                    'object_name', 'db_table',
                                                ]
                                            )
                                        ]
                                    ), (
                                        'remote_field', [
                                            'field_name', 'name', 'editable', 'null',
                                            'many_to_many', 'many_to_one', 'one_to_one', 'one_to_many',
                                            'parent_link', 'related_query_name', 'related_name', 'symmetrical'
                                        ]
                                    )
                                ]
                            ),
                            (
                                'pk', [
                                    'column', 'verbose_name'
                                ]
                            ),

                        ],
                    ),
                ],
                *args, **kwargs
            )
        return super(ReportModelView, self).get_json(
            request, data={},
            expand=[],
            *args, **kwargs
        )

    def get(self, request, *args, **kwargs):
        return super(ReportModelView, self).get(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return super(ReportModelView, self).post(request, *args, **kwargs)
