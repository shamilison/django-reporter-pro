<template>
	<v-card class="mb-3 pa-3">
		<v-row v-show="update">
			<v-col class="py-0" cols="6" sm="6">
				<v-select :items="chartTypes" class="mt-2" dense label="Chart Type"
						  outlined return-object v-model="chartType"></v-select>
			</v-col>
			<v-col class="py-0" cols="6" sm="6">
				<v-select :items="chartGroups" class="mt-2" dense label="Chart Group Column"
						  outlined return-object v-model="chartGroup"></v-select>
			</v-col>
			<v-col class="py-0" cols="6" sm="6">
				<v-select :items="xColumns" class="mt-2" dense label="X-Axis Column"
						  outlined return-object v-model="xColumn"></v-select>
			</v-col>
			<v-col class="py-0" cols="6" sm="6">
				<v-select :items="yColumns" class="mt-2" dense label="Y-Axis Column"
						  outlined return-object v-model="yColumn"></v-select>
			</v-col>
		</v-row>
		<highcharts :options="chartOptions" :highcharts="highChart3D"></highcharts>
	</v-card>
</template>

<script>
    import HighChart from 'highcharts';
    import HighChart3D from 'highcharts/highcharts-3d';
    import HighChartRenderMixin from "@/application/views/report/mixin/HighChartRenderMixin";

    HighChart.setOptions({
        colors: HighChart.map(HighChart.getOptions().colors, function (color) {
            return {
                radialGradient: {
                    cx: 0.5,
                    cy: 0.3,
                    r: 0.7
                },
                stops: [
                    [0, color],
                    [1, HighChart.color(color).brighten(-0.3).get('rgb')] // darken
                ]
            };
        })
    });

    export default {
        name: 'HighChartRenderer',
        components: {},
        mixins: [HighChartRenderMixin],
        props: {
            reportSchema: {
                type: Object,
                default: function () {
                    return {};
                }
            },
            update: {
                type: Boolean,
                default: function () {
                    return true;
                }
            },
        },
        data() {
            return {
                highChart3D: HighChart3D(HighChart),
			}
        },
        computed: {},
        watch: {
            chartType: function (newValue) {
                if (!this.reportSchema.report_config.hasOwnProperty('chart'))
                    this.reportSchema.report_config['chart'] = {};
                this.reportSchema.report_config.chart['chart_type'] = newValue;
            },
            chartGroup: function (newValue) {
                if (!this.reportSchema.report_config.hasOwnProperty('chart'))
                    this.reportSchema.report_config['chart'] = {};
                this.reportSchema.report_config.chart['chart_group'] = newValue;
            },
            xColumn: function (newValue) {
                if (!this.reportSchema.report_config.hasOwnProperty('chart'))
                    this.reportSchema.report_config['chart'] = {};
                this.reportSchema.report_config.chart['x_column'] = newValue;
            },
            yColumn: function (newValue) {
                if (!this.reportSchema.report_config.hasOwnProperty('chart'))
                    this.reportSchema.report_config['chart'] = {};
                this.reportSchema.report_config.chart['y_column'] = newValue;
            },
        },
        methods: {},
        mounted() {
            try {
                this.chartGroups = this.headers;
                this.xColumns = this.headers;
                this.yColumns = this.headers;
                if (this.reportSchema.report_config !== null && this.reportSchema.report_config.chart !== null) {
                    this.chartType = this.reportSchema.report_config.chart['chart_type'];
                    this.chartGroup = this.reportSchema.report_config.chart['chart_group'];
                    this.xColumn = this.reportSchema.report_config.chart['x_column'];
                    this.yColumn = this.reportSchema.report_config.chart['y_column'];
                }
            } catch (e) {
            }
        },
    };
</script>

<style lang="scss" scoped>
</style>
