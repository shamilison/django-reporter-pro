export default {
    results: {
        _meta: {
            label: "survey_backbone.QuestionResponseEntity",
            app_label: "survey_backbone",
            model_name: "questionresponseentity",
            object_name: "QuestionResponseEntity",
            db_table: "survey_backbone_questionresponseentity",
            installed: true,
            abstract: false,
            proxy: false,
            auto_created: false,
            fields: [
                {
                    attname: "uuid",
                    column: "uuid",
                    name: "uuid",
                    blank: false,
                    editable: true,
                    null: false,
                    help_text: "",
                    many_to_many: "None",
                    many_to_one: "None",
                    one_to_one: "None",
                    one_to_many: "None",
                    primary_key: true,
                    unique: true,
                    verbose_name: "uuid",
                    _python_type: "django.db.models.fields.CharField",
                    related_model: null,
                    remote_field: null
                },
                {
                    attname: "accessor",
                    column: "accessor",
                    name: "accessor",
                    blank: false,
                    editable: true,
                    null: false,
                    help_text: "",
                    many_to_many: "None",
                    many_to_one: "None",
                    one_to_one: "None",
                    one_to_many: "None",
                    primary_key: false,
                    unique: false,
                    verbose_name: "accessor",
                    _python_type: "django.db.models.fields.CharField",
                    related_model: null,
                    remote_field: null
                },
                {
                    attname: "identifier",
                    column: "identifier",
                    name: "identifier",
                    blank: false,
                    editable: true,
                    null: true,
                    help_text: "",
                    many_to_many: "None",
                    many_to_one: "None",
                    one_to_one: "None",
                    one_to_many: "None",
                    primary_key: false,
                    unique: false,
                    verbose_name: "identifier",
                    _python_type: "django.db.models.fields.CharField",
                    related_model: null,
                    remote_field: null
                },
                {
                    attname: "is_locked",
                    column: "is_locked",
                    name: "is_locked",
                    blank: false,
                    editable: true,
                    null: false,
                    help_text: "",
                    many_to_many: "None",
                    many_to_one: "None",
                    one_to_one: "None",
                    one_to_many: "None",
                    primary_key: false,
                    unique: false,
                    verbose_name: "is locked",
                    _python_type: "django.db.models.fields.BooleanField",
                    related_model: null,
                    remote_field: null
                },
                {
                    attname: "is_deleted",
                    column: "is_deleted",
                    name: "is_deleted",
                    blank: false,
                    editable: true,
                    null: false,
                    help_text: "",
                    many_to_many: "None",
                    many_to_one: "None",
                    one_to_one: "None",
                    one_to_many: "None",
                    primary_key: false,
                    unique: false,
                    verbose_name: "is deleted",
                    _python_type: "django.db.models.fields.SmallIntegerField",
                    related_model: null,
                    remote_field: null
                },
                {
                    attname: "executed_at",
                    column: "executed_at",
                    name: "executed_at",
                    blank: false,
                    editable: true,
                    null: true,
                    help_text: "",
                    many_to_many: "None",
                    many_to_one: "None",
                    one_to_one: "None",
                    one_to_many: "None",
                    primary_key: false,
                    unique: false,
                    verbose_name: "executed at",
                    _python_type: "django.db.models.fields.BigIntegerField",
                    related_model: null,
                    remote_field: null
                },
                {
                    attname: "created_at",
                    column: "created_at",
                    name: "created_at",
                    blank: false,
                    editable: false,
                    null: false,
                    help_text: "",
                    many_to_many: "None",
                    many_to_one: "None",
                    one_to_one: "None",
                    one_to_many: "None",
                    primary_key: false,
                    unique: false,
                    verbose_name: "created at",
                    _python_type: "django.db.models.fields.BigIntegerField",
                    related_model: null,
                    remote_field: null
                },
                {
                    attname: "created_by_id",
                    column: "created_by_id",
                    name: "created_by",
                    blank: false,
                    editable: true,
                    null: true,
                    help_text: "",
                    many_to_many: false,
                    many_to_one: true,
                    one_to_one: false,
                    one_to_many: false,
                    primary_key: false,
                    unique: false,
                    verbose_name: "Created By",
                    _python_type: "django.db.models.fields.related.ForeignKey",
                    related_model: {
                        _meta: {
                            label: "areion_backbone.UserEntity",
                            app_label: "areion_backbone",
                            model_name: "userentity",
                            object_name: "UserEntity",
                            db_table: "areion_backbone_userentity"
                        }
                    },
                    remote_field: {
                        field_name: "uuid",
                        name: "+",
                        editable: false,
                        null: true,
                        many_to_many: false,
                        many_to_one: false,
                        one_to_one: false,
                        one_to_many: true,
                        parent_link: false,
                        related_query_name: "None",
                        related_name: "+",
                        symmetrical: false
                    }
                },
                {
                    attname: "updated_at",
                    column: "updated_at",
                    name: "updated_at",
                    blank: false,
                    editable: false,
                    null: false,
                    help_text: "",
                    many_to_many: "None",
                    many_to_one: "None",
                    one_to_one: "None",
                    one_to_many: "None",
                    primary_key: false,
                    unique: false,
                    verbose_name: "updated at",
                    _python_type: "django.db.models.fields.BigIntegerField",
                    related_model: null,
                    remote_field: null
                },
                {
                    attname: "updated_by_id",
                    column: "updated_by_id",
                    name: "updated_by",
                    blank: false,
                    editable: true,
                    null: true,
                    help_text: "",
                    many_to_many: false,
                    many_to_one: true,
                    one_to_one: false,
                    one_to_many: false,
                    primary_key: false,
                    unique: false,
                    verbose_name: "Updated By",
                    _python_type: "django.db.models.fields.related.ForeignKey",
                    related_model: {
                        _meta: {
                            label: "areion_backbone.UserEntity",
                            app_label: "areion_backbone",
                            model_name: "userentity",
                            object_name: "UserEntity",
                            db_table: "areion_backbone_userentity"
                        }
                    },
                    remote_field: {
                        field_name: "uuid",
                        name: "+",
                        editable: false,
                        null: true,
                        many_to_many: false,
                        many_to_one: false,
                        one_to_one: false,
                        one_to_many: true,
                        parent_link: false,
                        related_query_name: "None",
                        related_name: "+",
                        symmetrical: false
                    }
                },
                {
                    attname: "organization_id",
                    column: "organization_id",
                    name: "organization",
                    blank: false,
                    editable: true,
                    null: false,
                    help_text: "",
                    many_to_many: false,
                    many_to_one: true,
                    one_to_one: false,
                    one_to_many: false,
                    primary_key: false,
                    unique: false,
                    verbose_name: "Organization",
                    _python_type: "django.db.models.fields.related.ForeignKey",
                    related_model: {
                        _meta: {
                            label: "areion_backbone.OrganizationEntity",
                            app_label: "areion_backbone",
                            model_name: "organizationentity",
                            object_name: "OrganizationEntity",
                            db_table: "areion_backbone_organizationentity"
                        }
                    },
                    remote_field: {
                        field_name: "uuid",
                        name: "+",
                        editable: false,
                        null: true,
                        many_to_many: false,
                        many_to_one: false,
                        one_to_one: false,
                        one_to_many: true,
                        parent_link: false,
                        related_query_name: "None",
                        related_name: "+",
                        symmetrical: false
                    }
                },
                {
                    attname: "question_id",
                    column: "question_id",
                    name: "question",
                    blank: false,
                    editable: true,
                    null: true,
                    help_text: "",
                    many_to_many: false,
                    many_to_one: true,
                    one_to_one: false,
                    one_to_many: false,
                    primary_key: false,
                    unique: false,
                    verbose_name: "question",
                    _python_type: "django.db.models.fields.related.ForeignKey",
                    related_model: {
                        _meta: {
                            label: "survey_backbone.QuestionEntity",
                            app_label: "survey_backbone",
                            model_name: "questionentity",
                            object_name: "QuestionEntity",
                            db_table: "survey_backbone_questionentity"
                        }
                    },
                    remote_field: {
                        field_name: "uuid",
                        name: "responses",
                        editable: false,
                        null: true,
                        many_to_many: false,
                        many_to_one: false,
                        one_to_one: false,
                        one_to_many: true,
                        parent_link: false,
                        related_query_name: "None",
                        related_name: "responses",
                        symmetrical: false
                    }
                },
                {
                    attname: "related_to_id",
                    column: "related_to_id",
                    name: "related_to",
                    blank: false,
                    editable: true,
                    null: true,
                    help_text: "",
                    many_to_many: false,
                    many_to_one: true,
                    one_to_one: false,
                    one_to_many: false,
                    primary_key: false,
                    unique: false,
                    verbose_name: "related to",
                    _python_type: "django.db.models.fields.related.ForeignKey",
                    related_model: {
                        _meta: {
                            label: "survey_backbone.ProfileRelationEntity",
                            app_label: "survey_backbone",
                            model_name: "profilerelationentity",
                            object_name: "ProfileRelationEntity",
                            db_table: "survey_backbone_profilerelationentity"
                        }
                    },
                    remote_field: {
                        field_name: "uuid",
                        name: "questionresponseentity",
                        editable: false,
                        null: true,
                        many_to_many: false,
                        many_to_one: false,
                        one_to_one: false,
                        one_to_many: true,
                        parent_link: false,
                        related_query_name: "None",
                        related_name: "None",
                        symmetrical: false
                    }
                },
                {
                    attname: "survey_response_id",
                    column: "survey_response_id",
                    name: "survey_response",
                    blank: false,
                    editable: true,
                    null: true,
                    help_text: "",
                    many_to_many: false,
                    many_to_one: true,
                    one_to_one: false,
                    one_to_many: false,
                    primary_key: false,
                    unique: false,
                    verbose_name: "survey response",
                    _python_type: "django.db.models.fields.related.ForeignKey",
                    related_model: {
                        _meta: {
                            label: "survey_backbone.SurveyResponseEntity",
                            app_label: "survey_backbone",
                            model_name: "surveyresponseentity",
                            object_name: "SurveyResponseEntity",
                            db_table: "survey_backbone_surveyresponseentity"
                        }
                    },
                    remote_field: {
                        field_name: "uuid",
                        name: "responses",
                        editable: false,
                        null: true,
                        many_to_many: false,
                        many_to_one: false,
                        one_to_one: false,
                        one_to_many: true,
                        parent_link: false,
                        related_query_name: "None",
                        related_name: "responses",
                        symmetrical: false
                    }
                },
                {
                    attname: "answer",
                    column: "answer",
                    name: "answer",
                    blank: false,
                    editable: true,
                    null: true,
                    help_text: "",
                    many_to_many: "None",
                    many_to_one: "None",
                    one_to_one: "None",
                    one_to_many: "None",
                    primary_key: false,
                    unique: false,
                    verbose_name: "answer",
                    _python_type: "django.contrib.postgres.fields.jsonb.JSONField",
                    related_model: null,
                    remote_field: null
                },
                {
                    attname: "configuration",
                    column: "configuration",
                    name: "configuration",
                    blank: false,
                    editable: true,
                    null: true,
                    help_text: "",
                    many_to_many: "None",
                    many_to_one: "None",
                    one_to_one: "None",
                    one_to_many: "None",
                    primary_key: false,
                    unique: false,
                    verbose_name: "configuration",
                    _python_type: "django.contrib.postgres.fields.jsonb.JSONField",
                    related_model: null,
                    remote_field: null
                },
                {
                    attname: "value",
                    column: "value",
                    name: "value",
                    blank: false,
                    editable: true,
                    null: true,
                    help_text: "",
                    many_to_many: "None",
                    many_to_one: "None",
                    one_to_one: "None",
                    one_to_many: "None",
                    primary_key: false,
                    unique: false,
                    verbose_name: "value",
                    _python_type: "django.db.models.fields.TextField",
                    related_model: null,
                    remote_field: null
                },
                {
                    attname: "photo_id",
                    column: "photo_id",
                    name: "photo",
                    blank: false,
                    editable: true,
                    null: true,
                    help_text: "",
                    many_to_many: false,
                    many_to_one: true,
                    one_to_one: false,
                    one_to_many: false,
                    primary_key: false,
                    unique: false,
                    verbose_name: "photo",
                    _python_type: "django.db.models.fields.related.ForeignKey",
                    related_model: {
                        _meta: {
                            label: "areion_backbone.ImageFileEntity",
                            app_label: "areion_backbone",
                            model_name: "imagefileentity",
                            object_name: "ImageFileEntity",
                            db_table: "areion_backbone_fileentity"
                        }
                    },
                    remote_field: {
                        field_name: "uuid",
                        name: "questionresponseentity",
                        editable: false,
                        null: true,
                        many_to_many: false,
                        many_to_one: false,
                        one_to_one: false,
                        one_to_many: true,
                        parent_link: false,
                        related_query_name: "None",
                        related_name: "None",
                        symmetrical: false
                    }
                },
                {
                    attname: "reward",
                    column: "reward",
                    name: "reward",
                    blank: false,
                    editable: true,
                    null: false,
                    help_text: "",
                    many_to_many: "None",
                    many_to_one: "None",
                    one_to_one: "None",
                    one_to_many: "None",
                    primary_key: false,
                    unique: false,
                    verbose_name: "reward",
                    _python_type: "django.db.models.fields.IntegerField",
                    related_model: null,
                    remote_field: null
                },
                {
                    attname: "charge",
                    column: "charge",
                    name: "charge",
                    blank: false,
                    editable: true,
                    null: false,
                    help_text: "",
                    many_to_many: "None",
                    many_to_one: "None",
                    one_to_one: "None",
                    one_to_many: "None",
                    primary_key: false,
                    unique: false,
                    verbose_name: "charge",
                    _python_type: "django.db.models.fields.IntegerField",
                    related_model: null,
                    remote_field: null
                },
                {
                    attname: "location_id",
                    column: "location_id",
                    name: "location",
                    blank: false,
                    editable: true,
                    null: true,
                    help_text: "",
                    many_to_many: false,
                    many_to_one: true,
                    one_to_one: false,
                    one_to_many: false,
                    primary_key: false,
                    unique: false,
                    verbose_name: "location",
                    _python_type: "django.db.models.fields.related.ForeignKey",
                    related_model: {
                        _meta: {
                            label: "areion_backbone.GeoLocation",
                            app_label: "areion_backbone",
                            model_name: "geolocation",
                            object_name: "GeoLocation",
                            db_table: "areion_backbone_geolocation"
                        }
                    },
                    remote_field: {
                        field_name: "uuid",
                        name: "questionresponseentity",
                        editable: false,
                        null: true,
                        many_to_many: false,
                        many_to_one: false,
                        one_to_one: false,
                        one_to_many: true,
                        parent_link: false,
                        related_query_name: "None",
                        related_name: "None",
                        symmetrical: false
                    }
                },
                {
                    attname: "action_time",
                    column: "action_time",
                    name: "action_time",
                    blank: false,
                    editable: true,
                    null: true,
                    help_text: "",
                    many_to_many: "None",
                    many_to_one: "None",
                    one_to_one: "None",
                    one_to_many: "None",
                    primary_key: false,
                    unique: false,
                    verbose_name: "action time",
                    _python_type: "django.db.models.fields.BigIntegerField",
                    related_model: null,
                    remote_field: null
                }
            ],
            pk: {
                column: "uuid",
                verbose_name: "uuid"
            }
        }
    }
}