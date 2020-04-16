<template>
	<v-card class="mb-3 pa-3">
		<highcharts :options="chartOptions"></highcharts>
	</v-card>
</template>

<script>

    import HighChartRenderMixin from "@/application/views/report/mixin/HighChartRenderMixin";

    export default {
        name: 'HighChartRenderer',
        components: {},
        mixins: [HighChartRenderMixin],
        props: {
			headers: {
				type: Array,
				default: function () {
					return [];
				}
			},
			data: {
				type: Array,
				default: function () {
					return [];
				}
			},
        },
        data() {
            return {
            }
        },
        computed: {},
        methods: {
        },
        mounted() {
            this.renderLineChart(this.headers, this.data);
        },
    };
</script>

<style lang="scss" scoped>
</style>
