<template>
    <form class="pa-5 pt-5 pb-5 white">
        <v-text-field label="Field Label" v-model="label"></v-text-field>
        <v-select :items="sortOptions" clearable dense label="Sort by" outlined v-model="sort"></v-select>
        <v-btn @click="submit" class="mr-4 primary">ok</v-btn>
        <v-btn @click="cancel">cancel</v-btn>
    </form>
</template>

<script>
    import ReportHeaderOrderMixin from "@/application/views/report/mixin/ReportHeaderOrderMixin";

    export default {
        name: 'DimensionSetting',
        components: {},
        props: {
            schema: {
                type: Object,
                default: function () {
                }
            },
            field: {
                type: Object,
                default: function () {
                }
            },
            closeMenu: {
                type: Function,
                default: function () {
                }
            },
        },
        mixins: [ReportHeaderOrderMixin],
        data() {
            return {
                label: "",
                sort: null,
                sortOptions: [
                    {value: 'ascending', text: 'Ascending'},
                    {value: 'descending', text: 'Descending'},
                ],
            }
        },
        computed: {},
        watch: {
            label: function (newVal, oldVal) {
                this.field['_dimension_config']['label'] = newVal;
                this.updateDimensionInOrderList(this.schema, this.field['_dimension_config'], this.field.unique_id);
            },
            sort: function (newVal, oldVal) {
                this.field['_dimension_config']['sort'] = newVal;
            },
        },
        created() {
        },
        methods: {
            submit: function () {
                this.closeMenu();
            },
            cancel: function () {
                this.closeMenu();
            },
        },
        mounted() {
            if (this.field['_dimension_config'] === undefined || this.field['_dimension_config'] === null) {
                this.field['_dimension_config'] = {};
                this.field['_dimension_config']['label'] = "";
                this.field['_dimension_config']['sort'] = null;
            } else {
                this.label = this.field['_dimension_config']['label'];
                this.sort = this.field['_dimension_config']['sort'];
            }
        }
    };
</script>

<style lang="scss" scoped>
</style>
