<template>
    <v-row>
        <v-col :key="uniqueReportKey" class="pt-0 pb-0" cols="8" sm="8">
            <v-row>
                <v-col class="pb-0" cols="6" sm="6">
                    <v-autocomplete :clearable="true" :items="tables" class="mt-2" dense item-text="label"
                                    label="Select Table" outlined return-object v-model="selectedTable">
                    </v-autocomplete>
                </v-col>
                <v-col class="pb-0" cols="6" sm="6">
                    <v-select :items="reportTypes" class="mt-2" dense label="Report Type"
                              outlined return-object v-model="reportType"></v-select>
                </v-col>
                <v-col class="pt-0" cols="12" sm="12" v-if="selectedTable !== null">
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
                                    <ReportInformation :reportSchema="reportSchema"
                                                       v-if="item.tab === 'information'"></ReportInformation>
                                    <DimensionList :reportSchema="reportSchema"
                                                   v-if="item.tab === 'dimensions'"></DimensionList>
                                    <MeasureList :reportSchema="reportSchema"
                                                 v-else-if="item.tab === 'measures'"></MeasureList>
                                    <FilterList :reportSchema="reportSchema"
                                                v-else-if="item.tab === 'filters'"></FilterList>
                                    <SearchList :reportSchema="reportSchema"
                                                v-if="item.tab === 'searches'"></SearchList>
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
                <v-col class="mt-1 pb-0 mb-2" cols="12" sm="12">
                    <SearchRenderer :key="uniqueSearchKey" :searchConfig="searchConfig"
                                    :searchFields="reportSchema['searches']"
                                    @searched="previewReportConfiguration"></SearchRenderer>
                </v-col>
                <v-col class="mt-1" cols="12" sm="12" v-if="selectedTable !== null">
                    <TableRenderer :data="previewData" :headers="previewHeaders"
                                   :key="uniqueTablePreviewKey" :reportSchema="reportSchema"
                                   v-if="reportType !== null && reportType.value === 'table'">
                    </TableRenderer>
                    <HighChartRenderer :data="previewData" :headers="previewHeaders" :key="uniqueReportPreviewKey"
                                       :livePreview="false" :renderKey="uniqueReportPreviewKey"
                                       :reportSchema="reportSchema"
                                       v-else-if="reportType !== null && reportType.value === 'chart'">
                    </HighChartRenderer>
                    <SummeryRenderer :data="previewData" :headers="previewHeaders"
                                     :key="uniqueSummeryPreviewKey" :reportSchema="reportSchema"
                                     v-else-if="reportType !== null && reportType.value === 'summery'">
                    </SummeryRenderer>
                </v-col>
            </v-row>
        </v-col>
        <v-col class="json-container" cols="4" sm="4">
            <VueJsonPretty :data="reportSchema" :deep="4" :highlightMouseoverNode="true"
                           :showLength="true" :showLine="true" :showSelectController="true">
            </VueJsonPretty>
        </v-col>
    </v-row>
</template>

<script>
    import axios from 'axios';
    import DimensionList from "@/application/views/report/dimensions/DimensionList";
    import MeasureList from "@/application/views/report/measures/MeasureList";
    import FilterList from "@/application/views/report/filters/FilterList";
    import VueJsonPretty from 'vue-json-pretty'
    import ModelInfoMixin from "@/application/views/report/mixin/ModelInfoMixin";
    import TableRenderer from "@/application/views/report/renderer/TableRenderer";
    import SearchList from "@/application/views/report/searches/SearchList";
    import HighChartRenderer from "@/application/views/report/renderer/HighChartRenderer";
    import SummeryRenderer from "@/application/views/report/renderer/SummeryRenderer";
    import ReportInformation from "@/application/views/report/information/ReportInformation";
    import {ErrorWrapper} from "./services/utils";
    import SearchRenderer from "@/application/views/report/renderer/search/SearchRenderer";

    export default {
        name: 'BuildReport',
        components: {
            SearchRenderer,
            ReportInformation, DimensionList, MeasureList, FilterList, SearchList,
            SummeryRenderer, HighChartRenderer, TableRenderer,
            VueJsonPretty,
        },
        mixins: [ModelInfoMixin],
        data() {
            return {
                fabEnabled: false,
                reportPostURL: '/report-configuration/create',
                reportPutURL: '/report-configuration/update/',
                reportGetURL: '/report-configuration/detail/',
                reportPreviewURL: '/report-configuration-preview/',
                contentID: 0,
                tables: [],
                tableFieldMap: {},
                selectedTable: null,
                reportType: {value: 'table', text: 'Table'},
                reportTypes: [
                    {value: 'summery', text: 'Summery'},
                    {value: 'chart', text: 'Chart'},
                    {value: 'table', text: 'Table'},
                ],
                reportSchema: {
                    table: null,
                    report_config: {
                        report_type: {
                            value: null,
                        },
                        chart: {},
                        widget: {},
                    },
                    information: {},
                    dimensions: {},
                    measures: {},
                    filters: [],
                    fields: {},
                    searches: {},
                },
                searchConfig: {},
                tab: null,
                items: [
                    {tab: 'filters', content: 'Filter'},
                    {tab: 'information', content: 'Information'},
                    {tab: 'dimensions', content: 'Dimension'},
                    {tab: 'measures', content: 'Measure'},
                    {tab: 'searches', content: 'Searches'},
                ],
                uniqueReportKey: this.$uuid.v4(),
                uniqueSearchKey: this.$uuid.v4(),
                uniqueTablePreviewKey: this.$uuid.v4(),
                uniqueReportPreviewKey: this.$uuid.v4(),
                uniqueSummeryPreviewKey: this.$uuid.v4(),
                previewHeaders: [],
                previewData: [],
            };
        },
        methods: {
            mounted: function () {
                ///////////////////////////////////////////////
                // // Supposed to call API for Table information
                // this.tables = this.convertToModelList(Test_model_list);
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
                this.selectedTable = null;
                axios.get(
                    '/report-model-info/', {
                        headers: {}, params: {
                            all_models: 'yes',
                        },
                    }
                ).then(response => {
                    let data = response.data;
                    this.tables = this.convertToModelList(data);
                    if (this.$route.params.contentID > 0) {
                        this.contentID = this.$route.params.contentID;
                    } else {
                        this.contentID = 0;
                    }
                    this.getReportConfiguration();
                }).catch(error => {
                    new ErrorWrapper(error)
                }).finally(() => {
                });
            },
            previewReportConfiguration: function () {
                let _vm = this;
                this.previewHeaders = [];
                this.previewData = [];
                if (this.$route.params.contentID > 0) {
                    axios({
                        method: 'put',
                        url: _vm.reportPreviewURL + this.contentID + '/',
                        params: {},
                        headers: {'Content-Type': 'application/json',},
                        data: this.searchConfig,
                    }).then(response => {
                        let data = response.data;
                        this.previewHeaders = data.headers;
                        this.previewData = data.results;
                        this.uniqueReportKey = this.$uuid.v4();
                        this.uniqueSearchKey = this.$uuid.v4();
                        this.uniqueTablePreviewKey = this.$uuid.v4();
                        this.uniqueReportPreviewKey = this.$uuid.v4();
                        this.uniqueSummeryPreviewKey = this.$uuid.v4();
                    }).catch(error => {
                        console.log(error);
                    }).finally(() => {
                    });
                } else {
                    axios({
                        method: 'post',
                        url: _vm.reportPreviewURL,
                        params: {},
                        headers: {'Content-Type': 'application/json',},
                        data: _vm.reportSchema,
                    }).then(response => {
                        let data = response.data;
                        this.previewHeaders = data.headers;
                        this.previewData = data.results;
                        this.uniqueReportKey = this.$uuid.v4();
                        this.uniqueSearchKey = this.$uuid.v4();
                        this.uniqueTablePreviewKey = this.$uuid.v4();
                        this.uniqueReportPreviewKey = this.$uuid.v4();
                        this.uniqueSummeryPreviewKey = this.$uuid.v4();
                    }).catch(error => {
                        new ErrorWrapper(error)
                    }).finally(() => {
                    });
                }
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
                        this.uniqueReportKey = this.$uuid.v4();
                    }).catch(error => {
                        new ErrorWrapper(error)
                    }).finally(() => {
                    });
                } else {
                    axios({
                        method: 'post',
                        url: _vm.reportPostURL,
                        params: {},
                        headers: {'Content-Type': 'application/json',},
                        data: _vm.reportSchema,
                    }).then(response => {
                        this.$router.push({
                            name: 'UpdateReport',
                            params: {
                                contentID: response.data.uuid,
                            }
                        });
                    }).catch(error => {
                        new ErrorWrapper(error)
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
                        if (data.information === undefined || data.information === null)
                            data.information = {};
                        this.reportSchema['information'] = data.information;
                        if (data.dimensions === undefined || data.dimensions === null)
                            data.dimensions = {};
                        this.reportSchema['dimensions'] = data.dimensions;
                        if (data.measures === undefined || data.measures === null)
                            data.measures = {};
                        this.reportSchema['measures'] = data.measures;
                        if (data.filters === undefined || data.filters === null)
                            data.filters = [];
                        this.reportSchema['filters'] = data.filters;
                        if (data.searches === undefined || data.searches === null)
                            data.searches = {};
                        this.reportSchema['searches'] = data.searches;
                        if (data.report_config === undefined || data.report_config === null)
                            data.report_config = {
                                report_type: {value: 'table', text: 'Table'}
                            };
                        this.reportSchema['report_config'] = data.report_config;
                        this.reportType = data.report_config['report_type'];
                        this.previewReportConfiguration();
                    }).catch(error => {
                        new ErrorWrapper(error)
                    }).finally(() => {
                    });
                } else {
                    this.selectedTable = null;
                    this.reportType = null;
                    this.reportSchema = {
                        table: null,
                        report_config: {
                            report_type: {
                                value: null,
                            },
                            chart: {},
                            widget: {},
                        },
                        information: {},
                        dimensions: {},
                        measures: {},
                        filters: [],
                        fields: {},
                        searches: {},
                    }
                    this.previewHeaders = [];
                    this.previewData = [];
                    this.uniqueReportKey = this.$uuid.v4();
                }
            },
        },
        watch: {
            '$route.params': {
                handler(newValue) {
                    this.mounted();
                },
                immediate: true,
            },
            selectedTable: {
                immediate: true,
                handler(newVal, oldVal) {
                    this.tableFieldMap = {};
                    this.reportSchema['fields'] = {};
                    if (oldVal !== null) {
                        this.reportSchema['information'] = {};
                        this.reportSchema['dimensions'] = {};
                        this.reportSchema['measures'] = {};
                        this.reportSchema['filters'] = [];
                        this.reportSchema['searches'] = {};
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
                            new ErrorWrapper(error)
                        }).finally(() => {
                        });
                    } else {
                        this.reportSchema['table'] = null;
                    }
                },
            },
            reportType: function (newVal, oldVal) {
                this.reportSchema.report_config['report_type'] = newVal;
            },
        },
        mounted() {
            // this.mounted();
        },
    };
</script>

<style lang="scss" scoped>
    .json-container {
        max-height: 700px;
        overflow-y: scroll;
    }
</style>
