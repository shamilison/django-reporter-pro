/**
 * Created by shamil on 5/22/18.
 */
let MODEL_FIELD_TYPES = {
    DJANGO_BINARY: "django.db.models.fields.BinaryField",
    DJANGO_BOOLEAN: "django.db.models.fields.BooleanField",
    DJANGO_NULL_BOOLEAN: "django.db.models.fields.NullBooleanField",
    DJANGO_DATE: "django.db.models.fields.DateField",
    DJANGO_TIME: "django.db.models.fields.TimeField",
    DJANGO_DATE_TIME: "django.db.models.fields.DateTimeField",
    DJANGO_DURATION: "django.db.models.fields.DurationField",
    DJANGO_AUTO: "django.db.models.fields.AutoField",
    DJANGO_BIG_INT: "django.db.models.fields.BigIntegerField",
    DJANGO_DECIMAL: "django.db.models.fields.DecimalField",
    DJANGO_FLOAT: "django.db.models.fields.FloatField",
    DJANGO_INTEGER: "django.db.models.fields.IntegerField",
    DJANGO_POSITIVE_INT: "django.db.models.fields.PositiveIntegerField",
    DJANGO_POSITIVE_SMALL_INT: "django.db.models.fields.PositiveSmallIntegerField",
    DJANGO_SMALL_INT: "django.db.models.fields.SmallIntegerField",
    DJANGO_CHAR: "django.db.models.fields.CharField",
    DJANGO_TEXT: "django.db.models.fields.TextField",
    DJANGO_COMMA_SEP_INT: "django.db.models.fields.CommaSeparatedIntegerField",
    DJANGO_EMAIL: "django.db.models.fields.EmailField",
    DJANGO_FILE: "django.db.models.fields.FileField",
    DJANGO_FILE_PATH: "django.db.models.fields.FilePathField",
    DJANGO_IMAGE: "django.db.models.fields.ImageField",
    DJANGO_GENERIC_IP_ADDRESS: "django.db.models.fields.GenericIPAddressField",
    DJANGO_SLUG: "django.db.models.fields.SlugField",
    DJANGO_URL: "django.db.models.fields.URLField",
    DJANGO_UUID: "django.db.models.fields.UUIDField",
    DJANGO_FOREIGN_KEY: "django.db.models.fields.related.ForeignKey",
    DJANGO_MANY_TO_MANY: "django.db.models.fields.related.ManyToManyField",
    DJANGO_ONE_TO_ONE: "django.db.models.fields.related.OneToOneField",
    DJANGO_JSON_FIELD: "django.contrib.postgres.fields.jsonb.JSONField",
};
let FIELD_QUERY_GROUPS = {
    'measure': {
        'field': '_python_type',
        'value': [
            MODEL_FIELD_TYPES.DJANGO_BINARY,
            MODEL_FIELD_TYPES.DJANGO_AUTO,
            MODEL_FIELD_TYPES.DJANGO_BIG_INT,
            MODEL_FIELD_TYPES.DJANGO_DECIMAL,
            MODEL_FIELD_TYPES.DJANGO_FLOAT,
            MODEL_FIELD_TYPES.DJANGO_INTEGER,
            MODEL_FIELD_TYPES.DJANGO_POSITIVE_INT,
            MODEL_FIELD_TYPES.DJANGO_POSITIVE_SMALL_INT,
            MODEL_FIELD_TYPES.DJANGO_SMALL_INT,
            MODEL_FIELD_TYPES.DJANGO_AUTO,
            MODEL_FIELD_TYPES.DJANGO_JSON_FIELD,
        ],
        'query_type': 'in'
    },
    'dimensions': {
        'field': '_python_type',
        'value': [
            MODEL_FIELD_TYPES.DJANGO_BOOLEAN,
            MODEL_FIELD_TYPES.DJANGO_NULL_BOOLEAN,
            MODEL_FIELD_TYPES.DJANGO_DATE,
            MODEL_FIELD_TYPES.DJANGO_TIME,
            MODEL_FIELD_TYPES.DJANGO_DATE_TIME,
            MODEL_FIELD_TYPES.DJANGO_DURATION,
            MODEL_FIELD_TYPES.DJANGO_CHAR,
            MODEL_FIELD_TYPES.DJANGO_TEXT,
            MODEL_FIELD_TYPES.DJANGO_EMAIL,
            MODEL_FIELD_TYPES.DJANGO_GENERIC_IP_ADDRESS,
            MODEL_FIELD_TYPES.DJANGO_SLUG,
            MODEL_FIELD_TYPES.DJANGO_URL,
            MODEL_FIELD_TYPES.DJANGO_UUID,
        ],
        'query_type': 'in'
    },
    'relation': {
        'field': '_python_type',
        'value': [
            MODEL_FIELD_TYPES.DJANGO_FOREIGN_KEY,
            MODEL_FIELD_TYPES.DJANGO_MANY_TO_MANY,
            MODEL_FIELD_TYPES.DJANGO_ONE_TO_ONE,
        ],
        'query_type': 'in'
    }
};

let INPUT_TYPE = {};
INPUT_TYPE[MODEL_FIELD_TYPES.DJANGO_BINARY] = 'number';
INPUT_TYPE[MODEL_FIELD_TYPES.DJANGO_AUTO] = 'number';
INPUT_TYPE[MODEL_FIELD_TYPES.DJANGO_BIG_INT] = 'number';
INPUT_TYPE[MODEL_FIELD_TYPES.DJANGO_DECIMAL] = 'number';
INPUT_TYPE[MODEL_FIELD_TYPES.DJANGO_FLOAT] = 'number';
INPUT_TYPE[MODEL_FIELD_TYPES.DJANGO_INTEGER] = 'number';
INPUT_TYPE[MODEL_FIELD_TYPES.DJANGO_POSITIVE_INT] = 'number';
INPUT_TYPE[MODEL_FIELD_TYPES.DJANGO_POSITIVE_SMALL_INT] = 'number';
INPUT_TYPE[MODEL_FIELD_TYPES.DJANGO_SMALL_INT] = 'number';
INPUT_TYPE[MODEL_FIELD_TYPES.DJANGO_AUTO] = 'number';
INPUT_TYPE[MODEL_FIELD_TYPES.DJANGO_BOOLEAN] = 'boolean';
INPUT_TYPE[MODEL_FIELD_TYPES.DJANGO_NULL_BOOLEAN] = 'boolean';
INPUT_TYPE[MODEL_FIELD_TYPES.DJANGO_DATE] = 'datetime';
INPUT_TYPE[MODEL_FIELD_TYPES.DJANGO_TIME] = 'datetime';
INPUT_TYPE[MODEL_FIELD_TYPES.DJANGO_DATE_TIME] = 'datetime';
INPUT_TYPE[MODEL_FIELD_TYPES.DJANGO_DURATION] = 'number';
INPUT_TYPE[MODEL_FIELD_TYPES.DJANGO_CHAR] = 'string';
INPUT_TYPE[MODEL_FIELD_TYPES.DJANGO_TEXT] = 'string';
INPUT_TYPE[MODEL_FIELD_TYPES.DJANGO_EMAIL] = 'string';
INPUT_TYPE[MODEL_FIELD_TYPES.DJANGO_GENERIC_IP_ADDRESS] = 'string';
INPUT_TYPE[MODEL_FIELD_TYPES.DJANGO_SLUG] = 'string';
INPUT_TYPE[MODEL_FIELD_TYPES.DJANGO_URL] = 'string';
INPUT_TYPE[MODEL_FIELD_TYPES.DJANGO_UUID] = 'string';
INPUT_TYPE[MODEL_FIELD_TYPES.DJANGO_FOREIGN_KEY] = 'relation';
INPUT_TYPE[MODEL_FIELD_TYPES.DJANGO_MANY_TO_MANY] = 'relation';
INPUT_TYPE[MODEL_FIELD_TYPES.DJANGO_ONE_TO_ONE] = 'relation';
INPUT_TYPE[MODEL_FIELD_TYPES.DJANGO_JSON_FIELD] = 'json';

export {MODEL_FIELD_TYPES, FIELD_QUERY_GROUPS, INPUT_TYPE}