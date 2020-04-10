<template>
    <v-row>
        <v-col class="pt-0 pb-0" cols="8" sm="8">
            <v-row>
                <v-col class="pb-0" cols="12" sm="12">
                    <v-autocomplete :clearable="true" :items="tables" class="my-2" dense item-text="label"
                                    label="Select Table" outlined return-object v-model="selectedTable">
                    </v-autocomplete>
                </v-col>
                <v-col class="pt-0" cols="12" sm="12">
                    <v-card>
                        <v-tabs background-color="primary" dark v-model="tab">
                            <v-tab :key="item.tab" v-for="item in items">
                                {{ item.tab }}
                            </v-tab>
                        </v-tabs>
                        <v-tabs-items v-model="tab">
                            <v-tab-item :key="item.tab" :reverse-transition="false" :transition="false"
                                        class="pb-5" v-for="item in items">
                                <v-card class="pb-2" flat>
                                    <DimensionList :reportSchema="reportSchema" v-if="item.tab === 'dimensions'"></DimensionList>
                                    <MeasureList :reportSchema="reportSchema" v-else-if="item.tab === 'measures'"></MeasureList>
                                    <FilterList :reportSchema="reportSchema" v-else-if="item.tab === 'filters'"></FilterList>
                                </v-card>
                            </v-tab-item>
                        </v-tabs-items>
                        <v-btn @click="submitReportConfiguration" absolute
                               class="float-right mt-n5" color="primary" dark fab right small>
                            <v-icon>mdi-content-save</v-icon>
                        </v-btn>
                        <v-btn @click="previewReportConfiguration" absolute
                               class="float-right mr-12 mt-n5" color="info" dark fab right small>
                            <v-icon>mdi-eye</v-icon>
                        </v-btn>
                    </v-card>
                </v-col>
                <v-col class="mt-1" cols="12" sm="12">
                    <TableRenderer></TableRenderer>
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
    import axios from 'axios';
    import Test_model_list from "@/application/tests/data/test_model_list";
    import Test_model_info from "@/application/tests/data/test_model_info";
    import DimensionList from "@/application/views/report/dimensions/DimensionList";
    import MeasureList from "@/application/views/report/measures/MeasureList";
    import FilterList from "@/application/views/report/filters/FilterList";
    import VueJsonPretty from 'vue-json-pretty'
    import ModelInfoMixin from "@/application/views/report/enums/ModelInfoMixin";
    import TableRenderer from "@/application/views/report/renderer/TableRenderer";

    export default {
        name: 'BuildReport',
        components: {TableRenderer, FilterList, MeasureList, DimensionList, VueJsonPretty},
        mixins: [ModelInfoMixin],
        data() {
            return {
                fabEnabled: false,
                reportPostURL: '/report-configuration/create',
                reportPutURL: '/report-configuration/update/',
                reportGetURL: '/report-configuration/detail/',
                contentID: 0,
                tables: [],
                tableFieldMap: {},
                selectedTable: null,
                reportSchema: {
                    table: null,
                    dimensions: {},
                    measures: {},
                    filters: [],
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
        methods: {
            previewReportConfiguration: function () {
                let _vm = this;
                // axios({
                //     method: 'post', url:
                //     _vm.reportPostURL,
                //     params: {},
                //     headers: {'Content-Type': 'application/json',},
                //     data: _vm.reportSchema,
                // }).then(response => {
                //     console.log(response);
                // }).catch(error => {
                //     console.log(error);
                // }).finally(() => {
                // });
            },
            submitReportConfiguration: function () {
                let _vm = this;
                if (_vm.contentID > 0) {
                    axios({
                        method: 'put',
                        url: _vm.reportPutURL + this.contentID + '/',
                        params: {},
                        headers: {'Content-Type': 'application/json',},
                        data: _vm.reportSchema,
                    }).then(response => {
                        console.log(response);
                    }).catch(error => {
                        console.log(error);
                    }).finally(() => {
                    });
                } else {
                    axios({
                        method: 'post', url:
                        _vm.reportPostURL,
                        params: {},
                        headers: {'Content-Type': 'application/json',},
                        data: _vm.reportSchema,
                    }).then(response => {
                        console.log(response);
                    }).catch(error => {
                        console.log(error);
                    }).finally(() => {
                    });
                }
            },
            getReportConfiguration: function () {
                let _vm = this;
                if (_vm.contentID > 0) {
                    axios.get(
                        this.reportGetURL + this.contentID + '/', {
                            headers: {}, params: {},
                        }
                    ).then(response => {
                        let data = response.data;
                        this.selectedTable = data.table;
                        this.reportSchema['dimensions'] = data.dimensions;
                        this.reportSchema['measures'] = data.measures;
                        this.reportSchema['filters'] = data.filters;
                    }).catch(error => {
                        console.log(error);
                    }).finally(() => {
                    });
                }
            },
        },
        watch: {
            selectedTable: {
                immediate: true,
                handler(newVal, oldVal) {
                    this.tableFieldMap = {};
                    this.reportSchema['fields'] = {};
                    if (oldVal !== null) {
                        this.reportSchema['dimensions'] = {};
                        this.reportSchema['measures'] = {};
                        this.reportSchema['filters'] = [];
                    }
                    if (newVal !== null && newVal !== undefined) {
                        this.reportSchema['table'] = newVal;
                        axios.get(
                            '/report-model-info/', {
                                headers: {}, params: {
                                    one_model: 'yes',
                                    app_label: newVal.app_label,
                                    model_name: newVal.model_name,
                                },
                            }
                        ).then(response => {
                            let data = response.data;
                            this.tableFieldMap = this.convertToFieldMap(data);
                            this.reportSchema['fields'] = this.tableFieldMap;
                        }).catch(error => {
                            console.log(error);
                        }).finally(() => {
                        });
                    } else {
                        this.reportSchema['table'] = null;
                    }
                },
            },
            reportSchema: {
                deep: true,
                handler(newVal, oldVal) {
                    this.uniqueJsonPrettify = this.$uuid.v4();
                },
            },
        },
        mounted() {
            ///////////////////////////////////////////////
            // // Supposed to call API for Table information
            this.tables = this.convertToModelList(Test_model_list);
            // this.selectedTable = this.tables[0];
            // // Supposed to call API for Table Field information when a table is selected
            // this.tableFieldMap = this.convertToFieldMap(Test_model_info);
            // this.reportSchema['fields'] = this.tableFieldMap;
            // // Set preselected value
            // let dimensionItem = this.tableFieldMap['dimensions'][0];
            // this.reportSchema['dimensions'][dimensionItem.name] = dimensionItem;
            // let measureItem = this.tableFieldMap['measures'][0];
            // this.reportSchema['measures'][measureItem.name] = measureItem;
            // let filterItem = this.tableFieldMap['measures'][0];
            // let filterObject = {};
            // filterObject[filterItem.name] = filterItem;
            // this.reportSchema['filters'].push(filterObject);
            ///////////////////////////////////////////////
            if (this.$route.params.contentID > 0) {
                this.contentID = this.$route.params.contentID;
                this.getReportConfiguration();
            }
        },
    };
</script>

<style lang="scss" scoped>
</style>
