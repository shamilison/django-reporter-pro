let TABLES = [
    {value: 'survey_backbone:QuestionResponseEntity', text: 'Question Responses'},
    {value: 'survey_reward:RedeemRequest', text: 'Redeem Requests'},
    {value: 'survey_reward:RechargeRequest', text: 'Recharge Requests'},
]

let TABLE_FIELDS = {
    'survey_backbone:QuestionResponseEntity': {
        'dimensions': [
            {
                'verbose_name': 'Accessor',
                'name': 'accessor',
            },
            {
                'verbose_name': 'Unique ID',
                'name': 'uuid',
            },
        ],
        'measures': [
            {
                'verbose_name': 'Created At',
                'name': 'created_at',
            },
            {
                'verbose_name': 'Executed At',
                'name': 'executed_at',
            },
        ],
        'relations': [
            {
                'verbose_name': 'Question',
                'name': 'question',
            },
        ],
    },
}


export {TABLES, TABLE_FIELDS};