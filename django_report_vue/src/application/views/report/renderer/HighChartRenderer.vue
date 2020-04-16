<template>
	<v-card class="mb-3 pa-3">
		<highcharts :options="chartOptions"></highcharts>
	</v-card>
</template>

<script>

    export default {
        name: 'HighChartRenderer',
        components: {},
        mixins: [],
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
				chartOptions: {
					series: [{
						data: [1, 2, 3]
					}]
				}
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
