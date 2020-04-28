<template>
	<v-row>
		<v-col class="pt-0" cols="12" sm="12">
			<v-row>
				<v-col class="mt-1 pb-0 mb-2" cols="12" sm="12" v-if="searchEnabled">
					<SearchRenderer :key="uniqueSearchKey" :searchConfig="searchConfig"
									:searchFields="reportSchema['searches']"
									@searched="previewReportConfiguration"></SearchRenderer>
				</v-col>
				<v-col class="mt-1" cols="12" sm="12">
					<SummeryRenderer :data="previewData" :headers="previewHeaders" :key="uniqueSummeryPreviewKey"
									 :reportSchema="reportSchema" :update="false"
									 v-if="reportSchema.report_config.report_type.value === 'summery'">
					</SummeryRenderer>
					<HighChartRenderer :data="previewData" :headers="previewHeaders" :key="uniqueReportPreviewKey"
									   :reportSchema="reportSchema" :update="false"
									   v-else-if="reportSchema.report_config.report_type.value === 'chart'">
					</HighChartRenderer>
					<TableRenderer :data="previewData" :headers="previewHeaders"
								   :key="uniqueTablePreviewKey" :reportSchema="reportSchema"
								   v-else-if="reportSchema.report_config.report_type.value === 'table'">
					</TableRenderer>
				</v-col>
			</v-row>
		</v-col>
		<v-col class="json-container" cols="4" sm="4" v-if="jsonPrettyEnabled">
			<VueJsonPretty :data="searchConfig" :deep="4" :highlightMouseoverNode="true"
						   :showLength="true" :showLine="true" :showSelectController="true">
			</VueJsonPretty>
			<VueJsonPretty :data="reportSchema['searches']" :deep="4" :highlightMouseoverNode="true"
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
    import SearchRenderer from "@/application/views/report/renderer/search/SearchRenderer";
    import HighChartRenderer from "@/application/views/report/renderer/HighChartRenderer";
    import SummeryRenderer from "@/application/views/report/renderer/SummeryRenderer";

    export default {
        name: 'ViewReport',
        components: {
            SummeryRenderer,
            HighChartRenderer,
            SearchRenderer,
            SearchList,
            TableRenderer,
            FilterList,
            MeasureList,
            DimensionList,
            VueJsonPretty
        },
        mixins: [ModelInfoMixin],
        data() {
            return {
                fabEnabled: false,
                searchEnabled: false,
                jsonPrettyEnabled: false,
                reportGetURL: '/report-configuration/detail/',
                reportPreviewURL: '/report-configuration-preview/',
                contentID: 0,
                reportSchema: {
                    table: null,
                    report_config: {
                        report_type: {
                            value: null,
                        },
                        chart: {},
                        widget: {},
                    },
                    dimensions: {},
                    measures: {},
                    filters: [],
                    fields: {},
                    searches: {},
                },
                uniqueSearchKey: this.$uuid.v4(),
                uniqueTablePreviewKey: this.$uuid.v4(),
                uniqueReportPreviewKey: this.$uuid.v4(),
                uniqueSummeryPreviewKey: this.$uuid.v4(),
                previewHeaders: [],
                previewData: [],
                searchConfig: {},
            };
        },
        methods: {
            previewReportConfiguration: function () {
                let _vm = this;
                this.previewHeaders = [];
                this.previewData = [];
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
                    this.uniqueTablePreviewKey = this.$uuid.v4();
                    this.uniqueReportPreviewKey = this.$uuid.v4();
                    this.uniqueSummeryPreviewKey = this.$uuid.v4();
                }).catch(error => {
                    console.log(error);
                }).finally(() => {
                });
            },
            getReportConfiguration: function () {
                let _vm = this;
                if (_vm.contentID !== 0) {
                    axios.get(
                        this.reportGetURL + this.contentID + '/', {
                            headers: {}, params: {},
                        }
                    ).then(response => {
                        let data = response.data;
                        this.reportSchema['table'] = data.table;
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
                        if (data.report_config !== null && data.report_config !== undefined)
                            this.reportSchema.report_config = data.report_config;
                        this.previewReportConfiguration();
                    }).catch(error => {
                        console.log(error);
                    }).finally(() => {
                    });
                }
            },
        },
        watch: {},
        mounted() {
            this.searchEnabled = this.$route.query['searchable'] !== '0';
            if(!this.searchEnabled) {
                try {
                    this.searchConfig = JSON.parse(atob(this.$route.query.search));
                } catch (error) {
                    console.log(error);
                }
            }
            if (this.$route.params.contentID !== 0) {
                this.contentID = this.$route.params.contentID;
                this.getReportConfiguration();
            }
        },
    };
</script>

<style lang="scss" scoped>
	.json-container {
		max-height: 700px;
		overflow-y: scroll;
	}
</style>
