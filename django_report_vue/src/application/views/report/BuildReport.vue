<template>
	<v-row>
		<v-col cols="4" sm="4">
			<v-overflow-btn
					:clearable="true" :items="tables" class="my-2" editable
					item-value="value" label="Select Table" v-model="report_schema['table']">
			</v-overflow-btn>
		</v-col>
		<v-col cols="4" sm="4">
			{{report_schema}}
		</v-col>
		<v-col cols="12" sm="12">
			<Dimension></Dimension>
		</v-col>
		<v-col cols="12" sm="12">
			<Refiner></Refiner>
		</v-col>
		<v-col cols="12" sm="12">
			<Measure></Measure>
		</v-col>
	</v-row>
</template>

<script>
    import {TABLE_FIELDS, TABLES} from "@/application/tests/data/report_builder";
    import Dimension from "@/application/views/report/dimensions/Dimension";
    import Measure from "@/application/views/report/measures/Measure";
    import Refiner from "@/application/views/report/filters/Refiner";

    export default {
        name: 'BuildReport',
        components: {Refiner, Measure, Dimension},
        mixins: [],
        data() {
            return {
                tables: [],
                table_fields: [],
                report_schema: {
                    table: null,
                },
            };
        },
        methods: {},
        mounted() {
            // Supposed to call API for Table information
            this.tables = TABLES;
            // Supposed to call API for Table Field information when a table is selected
            this.table_fields = TABLE_FIELDS;
        }
    };
</script>

<style lang="scss" scoped>
</style>
