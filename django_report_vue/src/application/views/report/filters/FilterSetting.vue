<template>
	<form class="pa-5 pt-5 pb-5 white">
		<v-text-field label="Field Label" v-model="label"></v-text-field>
		<v-select :items="filterOptions" dense label="Condition" return-object v-model="filter"></v-select>
		<v-content :key="filterInputKey" class="mb-4 text-center" v-if="filterInputs.length > 0 || showAddInput">
			<v-text-field :label="`Input ` + (index + 1)" @click:clear="clearInput(index)" clearable
						  v-for="(input, index) in filterInputs" v-model="filterInputs[index]"></v-text-field>
			<v-btn @click="addInput" icon outlined small v-show="showAddInput">
				<v-icon small>mdi-plus</v-icon>
			</v-btn>
		</v-content>
		<v-btn @click="submit" class="mr-4 primary" small>ok</v-btn>
		<v-btn @click="cancel" small>cancel</v-btn>
	</form>
</template>

<script>
    import ModelInfoMixin from "@/application/views/report/enums/ModelInfoMixin";

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
                label: "",
                filter: null,
                filterOptions: [],
                dimensionFilterOptions: [
                    {value: 'eq', text: 'equals', input: 1,},
                    {value: 'neq', text: 'does not equal', input: 1,},
                    {value: 'in', text: 'is one of', input: -1,},
                    {value: 'not_in', text: 'is not one of', input: -1,},
                    {value: 'like', text: 'like', input: 1,},
                    {value: 'not_like', text: 'is not like', input: 1,},
                    {value: 'regex', text: 'matches regex', input: 1,},
                    {value: 'ilike', text: 'like (case insensitive)', input: 1,},
                    {value: 'not_ilike', text: 'not like (case insensitive)', input: 1,},
                    {value: 'is_null', text: 'is null', input: 1,},
                    {value: 'not_null', text: 'is not null', input: 1,},
                ],
                measureFilterOptions: [
                    {value: 'eq', text: 'equals', input: 1,},
                    {value: 'neq', text: 'does not equal', input: 1,},
                    {value: 'in', text: 'is one of', input: -1,},
                    {value: 'not_in', text: 'is not one of', input: -1,},
                    {value: 'gt', text: 'greater than', input: 1,},
                    {value: 'gte', text: 'greater than or equal', input: 1,},
                    {value: 'lt', text: 'less than', input: 1,},
                    {value: 'lte', text: 'less than or equal', input: 1,},
                    {value: 'numbti', text: 'between and including', input: 2,},
                    {value: 'is_null', text: 'is null', input: 1,},
                    {value: 'not_null', text: 'is not null', input: 1,},
                ],
                filterInputs: [],
                filterInputKey: this.$uuid.v4(),
                showAddInput: false,
            }
        },
        computed: {},
        watch: {
            label: function (newVal, oldVal) {
                this.field['_filter_config']['label'] = newVal;
            },
            filter: function (newVal, oldVal) {
                this.field['_filter_config']['filter'] = newVal.value;
                if (oldVal !== null) {
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
                this.filterOptions = this.measureFilterOptions;
            } else if (fieldType === 'dimension') {
                this.filterOptions = this.dimensionFilterOptions;
            }
            if (this.field['_filter_config'] === undefined || this.field['_filter_config'] === null) {
                this.field['_filter_config'] = {};
                this.field['_filter_config']['label'] = "";
                this.field['_filter_config']['filter'] = null;
                this.field['_filter_config']['filterInputs'] = [];
            } else {
                this.label = this.field['_filter_config']['label'];
                this.filter = this.field['_filter_config']['filter'];
                this.filterInputs = this.field['_filter_config']['filterInputs'];
            }
        }
    };
</script>

<style lang="scss" scoped>
</style>
