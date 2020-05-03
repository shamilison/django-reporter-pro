# Created by shamilsakib at 7/14/2016

from django.core.management.base import BaseCommand
from django.db.models import Count, F
from django.db.models.sql.datastructures import BaseTable

from pocket_survey.survey_backbone.models import QuestionResponseEntity, QuestionGroup


class Command(BaseCommand):
    def __init__(self, *args, **kwargs):
        super(Command, self).__init__(*args, **kwargs)
        self.requires_model_validation = True

    def handle(self, *args, **options):
        responses = QuestionResponseEntity.objects.filter(
            question_id='48cd9a54-65ee-4809-8d0d-743222a6c17d'
        ).values('question__title').annotate(count=Count(F('uuid')))
        print(responses)
        print(responses.query)
        # Adding extra JOIN
        join = BaseTable(table_name=QuestionGroup._meta.db_table, alias='TTT')
        responses.query.join(join=join)
        print(responses.query)
        print(responses)
