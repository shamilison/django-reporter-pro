<template>
	<v-row>
		<v-col class="pt-0 pb-0" cols="8" sm="8">
			<v-row>
				<v-col class="mt-1" cols="12" sm="12">
					<TableRenderer :data="previewData" :headers="previewHeaders"
								   :key="uniquePreviewKey"></TableRenderer>
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
    import ModelInfoMixin from "@/application/views/report/enums/ModelInfoMixin";
    import TableRenderer from "@/application/views/report/renderer/TableRenderer";
    import SearchList from "@/application/views/report/searches/SearchList";

    export default {
        name: 'ViewReport',
        components: {SearchList, TableRenderer, FilterList, MeasureList, DimensionList, VueJsonPretty},
        mixins: [ModelInfoMixin],
        data() {
            return {
                fabEnabled: false,
                reportGetURL: '/report-configuration/detail/',
                reportPreviewURL: '/report-configuration-preview/',
                contentID: 0,
                reportSchema: {
                    table: null,
                    dimensions: {},
                    measures: {},
                    filters: [],
                    fields: {},
                    searches: {},
                },
                uniquePreviewKey: this.$uuid.v4(),
                previewHeaders: [],
                previewData: [],
            };
        },
        methods: {
            previewReportConfiguration: function () {
                let _vm = this;
                axios({
                    method: 'post', url: _vm.reportPreviewURL,
                    params: {},
                    headers: {'Content-Type': 'application/json',},
                    data: _vm.reportSchema,
                }).then(response => {
                    let data = response.data;
                    this.previewHeaders = data.headers;
                    this.previewData = data.results;
                    this.uniquePreviewKey = this.$uuid.v4();
                }).catch(error => {
                    console.log(error);
                }).finally(() => {
                });
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
                        this.previewReportConfiguration();
                    }).catch(error => {
                        console.log(error);
                    }).finally(() => {
                    });
                }
            },
        },
        watch: {
        },
        mounted() {
			if (this.$route.params.contentID > 0) {
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
