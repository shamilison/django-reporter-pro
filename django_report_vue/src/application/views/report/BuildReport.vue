<template>
    <v-row>
        <v-col cols="8" sm="8">
            <v-row>
                <v-col cols="12" sm="12">
                    <v-overflow-btn
                            :clearable="true" :items="tables" class="my-2" editable
                            item-value="value" label="Select Table" v-model="selectedTable">
                    </v-overflow-btn>
                </v-col>
                <v-col cols="12" sm="12">
                    <v-card>
                        <v-tabs background-color="primary" dark v-model="tab">
                            <v-tab :key="item.tab" v-for="item in items">
                                {{ item.tab }}
                            </v-tab>
                        </v-tabs>
                        <v-tabs-items v-model="tab">
                            <v-tab-item :key="item.tab" v-for="item in items">
                                <v-card flat>
                                    <DimensionList :reportSchema="reportSchema" v-if="item.tab === 'dimensions'"></DimensionList>
                                    <MeasureList :reportSchema="reportSchema" v-else-if="item.tab === 'measures'"></MeasureList>
                                    <FilterList :reportSchema="reportSchema" v-else-if="item.tab === 'filters'"></FilterList>
                                </v-card>
                            </v-tab-item>
                        </v-tabs-items>
                    </v-card>
                </v-col>
            </v-row>
        </v-col>
        <v-col cols="4" sm="4">
            <VueJsonPretty :data="reportSchema" :deep="4" :highlightMouseoverNode="true" :key="uniqueJsonPrettify"
                           :showLength="true" :showLine="true" :showSelectController="true">
            </VueJsonPretty>
        </v-col>
    </v-row>
</template>

<script>
    import {TABLE_FIELDS, TABLES} from "@/application/tests/data/report_builder";
    import DimensionList from "@/application/views/report/dimensions/DimensionList";
    import MeasureList from "@/application/views/report/measures/MeasureList";
    import FilterList from "@/application/views/report/filters/FilterList";
    import VueJsonPretty from 'vue-json-pretty'

    export default {
        name: 'BuildReport',
        components: {FilterList, MeasureList, DimensionList, VueJsonPretty},
        mixins: [],
        data() {
            return {
                tables: [],
                tableFieldMap: {},
                selectedTable: null,
                reportSchema: {
                    table: null,
                    dimensions: {},
                    measures: {},
                    filters: {},
                    fields: {},
                },
                tab: null,
                items: [
                    {tab: 'filters', content: 'Filter'},
                    {tab: 'measures', content: 'Measure'},
                    {tab: 'dimensions', content: 'Dimension'},
                ],
                uniqueJsonPrettify: this.$uuid.v4(),
            };
        },
        methods: {},
        watch: {
            selectedTable: {
                immediate: true,
                handler(newVal, oldVal) {
                    if (newVal !== null && newVal !== undefined) {
                        this.reportSchema['table'] = newVal;
                        this.reportSchema['fields'] = this.tableFieldMap[newVal];
                    } else {
                        this.reportSchema['table'] = null;
                        this.reportSchema['fields'] = {};
                    }
                },
            },
            reportSchema: {
                deep: true,
                handler(newVal, oldVal) {
                    console.log(newVal)
                    this.uniqueJsonPrettify = this.$uuid.v4();
                },
            },
        },
        mounted() {
            ///////////////////////////////////////////////
            // Supposed to call API for Table information
            this.tables = TABLES;
            // Supposed to call API for Table Field information when a table is selected
            this.tableFieldMap = TABLE_FIELDS;
            // Set preselected value
            this.selectedTable = this.tables[0].value;
            let dimensionItem = this.tableFieldMap[this.selectedTable]['dimensions'][0];
            this.reportSchema['dimensions'][dimensionItem.name] = dimensionItem;
            let measureItem = this.tableFieldMap[this.selectedTable]['measures'][0];
            this.reportSchema['measures'][measureItem.name] = measureItem;
            let filterItem = this.tableFieldMap[this.selectedTable]['measures'][0];
            this.reportSchema['filters'][filterItem.name] = filterItem;
            ///////////////////////////////////////////////
        },
    };
</script>

<style lang="scss" scoped>
</style>
