<template>
	<v-card class="mb-3 pa-3">
		<v-row>
			<v-col class="py-0" cols="6" sm="6">
				<v-select :items="chartTypes" class="mt-2" dense label="Chart Type"
						  outlined v-model="chartType"></v-select>
			</v-col>
			<v-col class="py-0" cols="6" sm="6">
				<v-select :items="chartGroups" class="mt-2" dense label="Chart Group Column"
						  outlined v-model="chartGroup"></v-select>
			</v-col>
			<v-col class="py-0" cols="6" sm="6">
				<v-select :items="xColumns" class="mt-2" dense label="X-Axis Column"
						  outlined v-model="xColumn"></v-select>
			</v-col>
			<v-col class="py-0" cols="6" sm="6">
				<v-select :items="yColumns" class="mt-2" dense label="Y-Axis Column"
						  outlined v-model="yColumn"></v-select>
			</v-col>
		</v-row>
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
        },
        data() {
            return {
            }
        },
        computed: {},
        methods: {
        },
        mounted() {
        },
    };
</script>

<style lang="scss" scoped>
</style>
