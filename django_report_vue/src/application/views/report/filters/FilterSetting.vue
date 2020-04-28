<template>
	<form class="pa-5 pt-5 pb-5 white">
		<v-text-field label="Field Label" v-model="label"></v-text-field>
		<v-switch :disabled="dateFilterDisabled" class="ma-2" label="Apply date filters"
				  v-model="applyDateFilter"></v-switch>
		<v-select :items="filterOptions" dense label="Condition" outlined return-object v-model="filter"></v-select>
		<v-content :key="filterInputKey" class="mb-4 text-center" v-if="filterInputs.length > 0 || showAddInput">
			<template v-for="(input, index) in filterInputs">
				<v-menu :close-on-content-click="false" :nudge-right="40" min-width="290px"
						offset-y transition="scale-transition" v-if="filterDateInput"
						v-model="dateInputs[index]">
					<template v-slot:activator="{ on }">
						<v-text-field :label="`Date ` + (index + 1)" prepend-icon="event" readonly
									  v-model="filterInputs[index]" v-on="on"></v-text-field>
					</template>
					<v-date-picker @input="dateInputs[index] = false"
								   v-model="filterInputs[index]"></v-date-picker>
				</v-menu>
				<v-text-field :label="`Input ` + (index + 1)" @click:clear="clearInput(index)"
							  clearable v-else v-model="filterInputs[index]"></v-text-field>
			</template>
			<v-btn @click="addInput" icon outlined small v-show="showAddInput">
				<v-icon small>mdi-plus</v-icon>
			</v-btn>
		</v-content>
		<v-btn @click="submit" class="mr-4 primary" small>ok</v-btn>
		<v-btn @click="cancel" small>cancel</v-btn>
	</form>
</template>

<script>
    import ModelInfoMixin from "@/application/views/report/mixin/ModelInfoMixin";

    export default {
        name: 'FilterSetting',
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
                newField: false,
                label: "",
                filter: null,
                filterOptions: [],
                dateFilterDisabled: true,
                applyDateFilter: false,
                dimensionFilterOptions: [
                    {value: 'eq', text: 'equals', input: 1,},
                    {value: 'neq', text: 'does not equal', input: 1,},
                    {value: 'in', text: 'is one of', input: -1,},
                    {value: 'not_in', text: 'is not one of', input: -1,},
                    {value: 'like', text: 'like', input: 1,},
                    {value: 'not_like', text: 'is not like', input: 1,},
                    {value: 'ilike', text: 'like (case insensitive)', input: 1,},
                    {value: 'not_ilike', text: 'not like (case insensitive)', input: 1,},
					{value: 'regex', text: 'matches regex', input: 1,},
                    {value: 'isnull', text: 'is null', input: 0,},
                    {value: 'not_null', text: 'is not null', input: 0,},
                ],
                measureFilterOptions: [
                    {value: 'eq', text: 'is equals to', input: 1,},
                    {value: 'neq', text: 'does not equal to', input: 1,},
                    {value: 'in', text: 'is one of', input: -1,},
                    {value: 'not_in', text: 'is not one of', input: -1,},
                    {value: 'gt', text: 'greater than', input: 1,},
                    {value: 'gte', text: 'greater than or equal', input: 1,},
                    {value: 'lt', text: 'less than', input: 1,},
                    {value: 'lte', text: 'less than or equal', input: 1,},
                    {value: 'numbti', text: 'between and including', input: 2,},
                    {value: 'is_null', text: 'is empty', input: 0,},
                    {value: 'not_null', text: 'is not empty', input: 0,},
                ],
                dateFilterOptions: [
                    {value: 'eq', text: 'equals', input: 1, type: 'date',},
                    {value: 'neq', text: 'does not equal', input: 1, type: 'date',},
                    {value: 'in', text: 'is one of', input: -1, type: 'date',},
                    {value: 'not_in', text: 'is not one of', input: -1, type: 'date',},
                    {value: 'gt', text: 'greater than', input: 1, type: 'date',},
                    {value: 'gte', text: 'greater than or equal', input: 1, type: 'date',},
                    {value: 'lt', text: 'less than', input: 1, type: 'date',},
                    {value: 'lte', text: 'less than or equal', input: 1, type: 'date',},
                    {value: 'date_range', text: 'is between date range', input: 2, type: 'date',},
                    {value: 'n_day', text: 'is of (n) days', input: 1,},
                    {value: 'n_week', text: 'is of (n) weeks', input: 1,},
                    {value: 'n_month', text: 'is of (n) months', input: 1,},
                    {value: 'n_year', text: 'is of (n) years', input: 1,},
                    {value: 'is_null', text: 'is null', input: 0,},
                    {value: 'not_null', text: 'is not null', input: 0,},
                ],
                filterInputs: [],
                filterDateInput: false,
                filterInputKey: this.$uuid.v4(),
                showAddInput: false,
                dateFieldPopup: false,
                dateInputs: {},
            }
        },
        computed: {},
        watch: {
            label: function (newVal, oldVal) {
                this.field['_filter_config']['label'] = newVal;
            },
            applyDateFilter: function (newVal, oldVal) {
                if (newVal) {
                    this.filterOptions = this.dateFilterOptions;
                } else {
                    this.filterOptions = this.measureFilterOptions;
                }
                this.field['_filter_config']['apply_date_filter'] = newVal;
            },
            filter: function (newVal, oldVal) {
                if (newVal !== null && (oldVal !== null || this.newField)) {
                    let result = [];
                    if (newVal.input >= 0) {
                        for (let index = 0; index < newVal.input; index++) {
                            result.push("");
                        }
                        this.showAddInput = false;
                    } else {
                        this.showAddInput = true;
                    }
                    this.filterInputs = result;
                }
                if (newVal !== null) {
                    this.field['_filter_config']['filter'] = newVal.value;
                    this.filterDateInput = newVal['type'] === 'date';
                } else {
                    this.showAddInput = false;
                    this.filterInputs = [];
				}
            },
            filterInputs: function (newVal, oldVal) {
                this.field['_filter_config']['filterInputs'] = newVal;
            },
        },
        created() {
        },
        methods: {
            addInput: function () {
                this.filterInputs.push("");
                this.filterInputKey = this.$uuid.v4();
            },
            clearInput: function (index) {
                this.filterInputs.splice(index, 1);
                this.filterInputKey = this.$uuid.v4();
            },
            submit: function () {
                this.closeMenu();
            },
            cancel: function () {
                this.closeMenu();
            },
        },
        mounted() {
            let fieldType = this.getFieldCategory(this.field);
            if (fieldType === 'measure') {
                this.dateFilterDisabled = false;
                this.filterOptions = this.measureFilterOptions;
            } else if (fieldType === 'dimension') {
                this.filterOptions = this.dimensionFilterOptions;
            }
            if (this.field['_filter_config'] === undefined || this.field['_filter_config'] === null) {
                this.field['_filter_config'] = {};
                this.field['_filter_config']['label'] = "";
                this.field['_filter_config']['filter'] = null;
                this.field['_filter_config']['apply_date_filter'] = false;
                this.field['_filter_config']['filterInputs'] = [];
                this.newField = true;
            } else {
                this.label = this.field['_filter_config']['label'];
                this.filterInputs = this.field['_filter_config']['filterInputs'];
                this.applyDateFilter = this.field['_filter_config']['apply_date_filter'];
                if (this.applyDateFilter) {
                    this.filterOptions = this.dateFilterOptions;
                }
                for (let index = 0; index < this.filterOptions.length; index++) {
                    if (this.filterOptions[index].value === this.field['_filter_config']['filter']) {
                        this.filter = this.filterOptions[index];
                        this.filterDateInput = this.filter['type'] === 'date';
                        break;
                    }
                }
                if (this.filter === null)
                    this.newField = true;
            }
        }
    };
</script>

<style lang="scss" scoped>
</style>
