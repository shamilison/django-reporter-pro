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
                            <v-checkbox label="Visible" v-model="_field['is_visible']"></v-checkbox>
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
            'reportSchema.orders': function (newVal) {
                this.populateListItems(this.reportSchema);
                this.uniqueKey = this.$uuid.v4();
            },
        }, created() {
        },
        methods: {
            dragAction(drag) {
                // TODO: Update order of reportSchema order option
                if (!drag) {
                    this.populateDimensions(this.fields);
                    this.uniqueKey = this.$uuid.v4();
                }
            },
            populateListItems(schema) {
                let _fields = [];
                let orders = schema['orders'];
                let o_keys = Object.keys(orders);
                for (let index = 0; index < o_keys.length; index++) {
                    let _item = {key_name: orders[o_keys[index]].key_name,};
                    if (orders[o_keys[index]]._display_config !== undefined) {
                        _item['label'] = orders[o_keys[index]]._display_config.label;
                    }
                    _fields.push(_item);
                }
                // TODO: Implement options to add missing columns from dimensions and measures at the end of list
                // TODO: Remove a column which has been removed from dimension and measures list
                this.fields = _fields;
            },
        },
        mounted() {
            // TODO: Save order in server side
            // TODO: Load initial orders
            this.populateListItems(this.reportSchema);
        }
    };
</script>

<style lang="scss" scoped>
</style>
