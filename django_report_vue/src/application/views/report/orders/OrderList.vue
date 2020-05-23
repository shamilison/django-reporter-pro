<template>
    <v-list :key="uniqueKey" dense>
        <v-toolbar color="white" dense flat>
            <v-toolbar-title>Order Fields</v-toolbar-title>
        </v-toolbar>
        <Draggable @end="dragAction(false)" @start="dragAction(true)"
                   group="orders" v-model="fields">
            <v-list-item :key="_field.key_name" @click="" v-for="_field in fields">
                <v-list-item-content class="pt-0 pb-0">
                    <v-divider></v-divider>
                    <v-row>
                        <v-col class="pa-3 pt-1 pb-2" cols="8">
                            <div class="pt-2 pb-2">
                                <span v-if="_field.label !== undefined && _field.label !== ''">
                                    {{_field.label}} ({{_field.key_name}})
                                </span>
                                <span v-else>{{_field.key_name}}</span>
                            </div>
                        </v-col>
                        <v-col class="pa-3 pt-1 pb-2" cols="4">
                            <v-checkbox label="Hide?" v-model="_field['is_hidden']"></v-checkbox>
                        </v-col>
                    </v-row>
                </v-list-item-content>
            </v-list-item>
        </Draggable>
    </v-list>
</template>

<script>
    import Draggable from 'vuedraggable';

    export default {
        name: 'OrderList',
        components: {Draggable},
        props: {
            reportSchema: {
                type: Object,
                default: function () {
                    return {};
                }
            },
        },
        mixins: [],
        data() {
            return {
                fields: [],
                uniqueKey: this.$uuid.v4(),
            }
        },
        computed: {},
        watch: {
            'reportSchema.dimensions': function (newVal) {
                this.populateListItems(this.reportSchema);
                this.uniqueKey = this.$uuid.v4();
            },
            'reportSchema.measures': function (newVal) {
                this.populateListItems(this.reportSchema);
                this.uniqueKey = this.$uuid.v4();
            },
            'reportSchema.orders': function (newVal) {
                this.uniqueKey = this.$uuid.v4();
            },
        }, created() {
        },
        methods: {
            dragAction(drag) {
                // TODO: Update order of reportSchema order option
                if (!drag) {
                    this.reportSchema['orders'] = this.fields;
                    this.uniqueKey = this.$uuid.v4();
                }
            },
            populateListItems(schema) {
                let _fields = [];
                // Update existing orders
                let _dimensionKeys = Object.keys(schema['dimensions']);
                let _measureKeys = Object.keys(schema['measures']);
                let orders = schema['orders'];
                // Add existing orders fields
                for (let index = 0; index < orders.length; index++) {
                    let _item = {
                        unique_id: orders[index].unique_id,
                        key_name: orders[index].key_name,
                        value: orders[index].value,
                        label: orders[index].label,
                        text: orders[index].text,
                        type: orders[index].type,
                        is_hidden: orders[index].is_hidden === undefined ? false : orders[index].is_hidden,
                    };
                    if (_item.type === 'dimension' && _dimensionKeys.indexOf(_item.unique_id) > -1) {
                        _dimensionKeys.splice(_dimensionKeys.indexOf(_item.unique_id), 1);
                        _item['type'] = 'dimension';
                        _fields.push(_item);
                    } else if (_item.type === 'measure' && _measureKeys.indexOf(_item.unique_id) > -1) {
                        // Special code to add aggregation type as suffix for measure field
                        // As their value converts to special format
                        let _field = schema['measures'][_item.unique_id];
                        _item['type'] = 'measure';
                        _item['value'] = _field.key_name + '_' + _field._measure_config.aggregation;
                        // End special code to add aggregation type as suffix
                        _measureKeys.splice(_measureKeys.indexOf(_item.unique_id), 1);
                        _fields.push(_item);
                    }
                }
                // Add new dimensions if available
                for (let _i_dim = 0; _i_dim < _dimensionKeys.length; _i_dim++) {
                    let _item = {
                        unique_id: _dimensionKeys[_i_dim],
                        key_name: schema['dimensions'][_dimensionKeys[_i_dim]].key_name,
                        type: 'dimension',
                        is_hidden: false,
                    };
                    _item['value'] = _item['query_name'];
                    _item['label'] = schema['dimensions'][_dimensionKeys[_i_dim]]._dimension_config.label;
                    _item['text'] = _item['label'];
                    _fields.push(_item);
                }
                // Add new measures if available
                for (let _i_mes = 0; _i_mes < _measureKeys.length; _i_mes++) {
                    let _field = schema['measures'][_measureKeys[_i_mes]];
                    let _item = {
                        unique_id: _measureKeys[_i_mes],
                        key_name: _field.key_name,
                        value: _field.key_name + '_' + _field._measure_config.aggregation,
                        type: 'measure',
                        is_hidden: false,
                    };
                    _item['label'] = schema['measures'][_measureKeys[_i_mes]]._measure_config.label;
                    _item['text'] = _item['label'];
                    _fields.push(_item);
                }
                this.fields = _fields;
                this.reportSchema['orders'] = this.fields;
            },
        },
        mounted() {
            this.populateListItems(this.reportSchema);
        }
    }

</script>

<style lang="scss" scoped>
</style>
