<template>
    <form class="pa-5 pt-5 pb-5 white">
        <v-text-field label="Field Label" v-model="label"></v-text-field>
        <v-select :items="sortOptions" clearable dense label="Sort by" outlined v-model="sort"></v-select>
        <v-switch :disabled="dateDisabled" class="ma-2" label="Apply as date" v-model="applyAsDate"></v-switch>
        <v-select :items="aggregateOptions" dense label="Aggregation" outlined v-model="aggregation"></v-select>
        <v-content class="mb-4 text-center"
                   v-if="aggregation !== null && aggregation.startsWith('jsonb')">
            <v-row class="mx-0">
                <v-col class="pa-0 ma-0" cols="6">
                    <v-text-field class="mr-1" cols="6" label="Jsonb Field Path"
                                  v-model="jsonbPath"></v-text-field>
                </v-col>
                <v-col class="pa-0 ma-0" cols="6">
                    <v-text-field class="ml-1" cols="6" label="Aggregating Jsonb Field"
                                  v-model="jsonbAggregateField"></v-text-field>
                </v-col>
            </v-row>
            <v-content :key="jsonbColumnsKey" v-if="aggregation ==='jsonb_join'">
                <v-row class="mx-0" v-for="(item, index) in jsonbColumns">
                    <v-col class="pa-0 ma-0" cols="6">
                        <v-text-field @click:clear="clearInput(index)" class="mr-1" clearable
                                      label="Column Field" v-model="item.field"></v-text-field>
                    </v-col>
                    <v-col class="pa-0 ma-0" cols="6">
                        <v-select :items="jsonbColumnTypes" class="ml-1" cols="6" dense label="Column Type"
                                  outlined v-model="item.type"></v-select>
                    </v-col>
                </v-row>
                <v-btn @click="addInput" icon outlined small>
                    <v-icon small>mdi-plus</v-icon>
                </v-btn>
            </v-content>
        </v-content>
        <v-switch :disabled="dateDisabled" class="ma-2" label="Apply filter" v-model="applyFilter"></v-switch>
        <template v-if="applyFilter === true">
            <FilterSetting :defaultMeasure="true" :field="field" :filterOnly="true"></FilterSetting>
        </template>
        <v-btn @click="submit" class="mr-4 primary">ok</v-btn>
        <v-btn @click="cancel">cancel</v-btn>
    </form>
</template>

<script>
    import ModelInfoMixin from "@/application/views/report/mixin/ModelInfoMixin";
    import ReportHeaderOrderMixin from "@/application/views/report/mixin/ReportHeaderOrderMixin";
    import FilterSetting from "@/application/views/report/filters/FilterSetting";

    export default {
        name: 'MeasureSetting',
        components: {FilterSetting},
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
        mixins: [ModelInfoMixin, ReportHeaderOrderMixin],
        data() {
            return {
                label: "",
                sort: null,
                sortOptions: [
                    {value: 'ascending', text: 'Ascending'},
                    {value: 'descending', text: 'Descending'},
                ],
                aggregation: null,
                aggregateOptions: [],
                dateDisabled: true,
                applyAsDate: false,
                generalAnnotations: [
                    {value: 'unagg', text: 'Unaggregated'},
                    {value: 'count', text: 'Count of distinct'},
                    {value: 'countall', text: 'Count of all'},
                    {value: 'sum', text: 'Total sum'},
                    {value: 'average', text: 'Average'},
                    {value: 'min', text: 'Minimum'},
                    {value: 'max', text: 'Maximum'},
                ],
                timeAnnotations: [
                    {value: 'daily', text: 'By daily'},
                    {value: 'weekly', text: 'By weekly'},
                    {value: 'monthly', text: 'By month'},
                    {value: 'quarterly', text: 'By quarter year'},
                    {value: 'yearly', text: 'By year'},
                ],
                jsonbPath: null,
                jsonbAggregateField: null,
                jsonbColumns: [],
                jsonAnnotations: [
                    {value: 'jsonb_aggregation', text: 'Aggregate Json'},
                    {value: 'jsonb_join', text: 'Join Json Array'},
                ],
                jsonbColumnTypes: [
                    {value: 'text', text: 'Text'},
                    {value: 'int', text: 'Int'},
                ],
                jsonbColumnsKey: this.$uuid.v4(),
                applyFilter: false,
            }
        },
        computed: {},
        watch: {
            label: function (newVal, oldVal) {
                this.field['_measure_config']['label'] = newVal;
                this.updateMeasureInOrderList(this.schema, this.field['_measure_config'], this.field.key_name);
            },
            sort: function (newVal, oldVal) {
                this.field['_measure_config']['sort'] = newVal;
            },
            aggregation: function (newVal, oldVal) {
                this.field['_measure_config']['aggregation'] = newVal;
                this.updateMeasureInOrderList(this.schema, this.field['_measure_config'], this.field.key_name);
            },
            jsonbPath: function (newVal, oldVal) {
                this.field['_measure_config']['jsonb_config']['jsonb_path'] = newVal;
            },
            jsonbAggregateField: function (newVal, oldVal) {
                this.field['_measure_config']['jsonb_config']['aggregate_field'] = newVal;
            },
            jsonbColumns: function (newVal, oldVal) {
                this.field['_measure_config']['jsonb_config']['jsonb_columns'] = newVal;
            },
            applyAsDate: function (newVal) {
                if (newVal) {
                    this.aggregateOptions = this.timeAnnotations;
                } else {
                    this.aggregateOptions = this.generalAnnotations;
                }
                this.field['_measure_config']['apply_as_date'] = newVal;
            },
            applyFilter: function (newVal, oldValue) {
                this.field['_measure_config']['apply_filter'] = newVal;
            },
        },
        created() {
        },
        methods: {
            addInput: function () {
                this.jsonbColumns.push({field: null, type: null});
                this.jsonbColumnsKey = this.$uuid.v4();
            },
            clearInput: function (index) {
                this.jsonbColumns.splice(index, 1);
                this.jsonbColumnsKey = this.$uuid.v4();
            },
            submit: function () {
                this.closeMenu();
            },
            cancel: function () {
                this.closeMenu();
            },
        },
        mounted() {
            if (this.field['_measure_config'] === undefined || this.field['_measure_config'] === null) {
                this.field['_measure_config'] = {
                    label: "",
                    sort: null,
                    aggregation: null,
                    apply_as_date: false,
                    jsonb_config: {
                        jsonb_path: null,
                        aggregate_field: null,
                        jsonb_columns: [],
                    },
                    apply_filter: false,
                };
            } else {
                this.label = this.field['_measure_config']['label'];
                this.sort = this.field['_measure_config']['sort'];
                if (this.field['_measure_config']['aggregation'] !== undefined)
                    this.aggregation = this.field['_measure_config']['aggregation'];
                this.applyAsDate = this.field['_measure_config']['apply_as_date'];
                if (this.field['_measure_config']['jsonb_config'] === undefined ||
                    this.field['_measure_config']['jsonb_config'] === null) {
                    this.field['_measure_config']['jsonb_config'] = {
                        jsonb_path: null,
                        aggregate_field: null,
                        jsonb_columns: [],
                    }
                } else {
                    this.jsonbPath = this.field['_measure_config']['jsonb_config']['jsonb_path'];
                    this.jsonbAggregateField = this.field['_measure_config']['jsonb_config']['aggregate_field'];
                    this.jsonbColumns = this.field['_measure_config']['jsonb_config']['jsonb_columns'];
                }
                this.applyFilter = this.field['_measure_config']['apply_filter'];
            }
            if (this.isJsonType(this.field)) {
                this.applyAsDate = false;
                this.dateDisabled = true;
                this.aggregateOptions = this.jsonAnnotations;
            } else if (this.isDateType(this.field)) {
                this.applyAsDate = true;
                this.aggregateOptions = this.timeAnnotations;
            } else {
                this.dateDisabled = false;
                this.aggregateOptions = this.generalAnnotations;
            }
        }
    };
</script>

<style lang="scss" scoped>
</style>
