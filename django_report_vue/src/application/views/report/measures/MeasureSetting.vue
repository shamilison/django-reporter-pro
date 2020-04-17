<template>
	<form class="pa-5 pt-5 pb-5 white">
		<v-text-field label="Field Label" v-model="label"></v-text-field>
		<v-switch :disabled="dateDisabled" class="ma-2" label="Apply as date" v-model="applyAsDate"></v-switch>
		<v-select :items="aggregateOptions" dense label="Aggregation" outlined v-model="aggregation"></v-select>
		<v-select :items="sortOptions" dense label="Sort by" outlined v-model="sort"></v-select>
		<v-btn @click="submit" class="mr-4 primary">ok</v-btn>
		<v-btn @click="cancel">cancel</v-btn>
	</form>
</template>

<script>
    import ModelInfoMixin from "@/application/views/report/mixin/ModelInfoMixin";

    export default {
        name: 'MeasureSetting',
        components: {},
        props: {
            field: {
                type: Object,
                default: function () {
                }
            },
            closeMenu: {
                type: Function,
                default: function () {
                }
            },
        },
        mixins: [ModelInfoMixin],
        data() {
            return {
                label: "",
                aggregation: null,
                aggregateOptions: [],
                dateDisabled: true,
                applyAsDate: false,
                generalAnnotations: [
                    {value: 'unagg', text: 'Unaggregated'},
                    {value: 'count', text: 'Count of distinct'},
                    {value: 'countall', text: 'Count of all'},
                    {value: 'sum', text: 'Total sum'},
                    {value: 'average', text: 'Average'},
                    {value: 'min', text: 'Minimum'},
                    {value: 'max', text: 'Maximum'},
                ],
                timeAnnotations: [
                    {value: 'daily', text: 'By daily'},
                    {value: 'weekly', text: 'By weekly'},
                    {value: 'bi_weekly', text: 'By bi-weekly'},
                    {value: 'monthly', text: 'By month'},
                    {value: 'quarterly', text: 'By quarter year'},
                    {value: 'half_yearly', text: 'By half year'},
                    {value: 'yearly', text: 'By year'},
                ],
                sort: null,
                sortOptions: [
                    {value: 'ascending', text: 'Ascending'},
                    {value: 'descending', text: 'Descending'},
                ],
            }
        },
        computed: {},
        watch: {
            label: function (newVal, oldVal) {
                this.field['_measure_config']['label'] = newVal;
            },
            sort: function (newVal, oldVal) {
                this.field['_measure_config']['sort'] = newVal;
            },
            aggregation: function (newVal, oldVal) {
                this.field['_measure_config']['aggregation'] = newVal;
            },
            applyAsDate: function (newVal) {
                if (newVal) {
                    this.aggregateOptions = this.timeAnnotations;
                } else {
                    this.aggregateOptions = this.generalAnnotations;
                }
                this.field['_measure_config']['apply_as_date'] = newVal;
            },
        },
        created() {
        },
        methods: {
            submit: function () {
                this.closeMenu();
            },
            cancel: function () {
                this.closeMenu();
            },
        },
        mounted() {
            if (this.field['_measure_config'] === undefined || this.field['_measure_config'] === null) {
                this.field['_measure_config'] = {};
                this.field['_measure_config']['label'] = "";
                this.field['_measure_config']['sort'] = null;
                this.field['_measure_config']['aggregation'] = null;
                this.field['_measure_config']['apply_as_date'] = false;
            } else {
                this.label = this.field['_measure_config']['label'];
                this.sort = this.field['_measure_config']['sort'];
                this.aggregation = this.field['_measure_config']['aggregation'];
                this.applyAsDate = this.field['_measure_config']['apply_as_date'];
            }
            if (this.isDateType(this.field)) {
                this.applyAsDate = true;
                this.aggregateOptions = this.timeAnnotations;
            } else {
                this.dateDisabled = false;
                this.aggregateOptions = this.generalAnnotations;
            }
        }
    };
</script>

<style lang="scss" scoped>
</style>
