export default {
    props: {},
    data: () => ({}),
    computed: {},
    watch: {},
    methods: {
        addToOrderList: function (schema, field, key, type) {
            schema['orders'].push({
                key_name: key,
                value: key,
                label: '',
                text: '',
                type: type,
                is_hidden: false,
            });
        },
        removeFromOrder: function (schema, field) {
        },
        updateDimensionInOrderList: function (schema, config, key) {
            let orders = schema['orders'];
            for (let index = 0; index < orders.length; index++) {
                if (orders[index].key_name === key && orders[index].type === 'dimension') {
                    let _item = orders[index];
                    _item['label'] = config.label;
                    _item['text'] = config.label;
                    break;
                }
            }
        },
        updateMeasureInOrderList: function (schema, config, key) {
            let orders = schema['orders'];
            for (let index = 0; index < orders.length; index++) {
                if (orders[index].key_name === key && orders[index].type === 'measure') {
                    let _item = orders[index];
                    _item['value'] = key + '_' + config.aggregation;
                    _item['label'] = config.label;
                    _item['text'] = config.label;
                    break;
                }
            }
        },
    },
    created() {
    },
    mounted() {
    }
}
