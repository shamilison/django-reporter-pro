<template>
	<form class="pa-5 pt-5 pb-5 white">
		<v-text-field label="Field Label" v-model="label"></v-text-field>
		<v-select :items="categories" dense label="Search Type" outlined v-model="category"></v-select>
		<v-content :key="staticChoiceKey" class="mb-4 text-center" v-if="category === 'static_choice'">
			<template v-for="(input, index) in staticChoices">
				<v-text-field :label="`Choice ` + (index + 1)" @click:clear="clearInput(index)"
							  clearable v-model="staticChoices[index]"></v-text-field>
			</template>
			<v-btn @click="addInput" icon outlined small>
				<v-icon small>mdi-plus</v-icon>
			</v-btn>
		</v-content>
		<v-content :key="macroChoiceKey" class="mb-4 text-center" v-else-if="category === 'dynamic_choice'">
			<v-select :items="macroReports" dense label="Macro Report" outlined v-model="macroReport"></v-select>
		</v-content>
		<v-btn @click="submit" class="mr-4 primary">ok</v-btn>
		<v-btn @click="cancel">cancel</v-btn>
	</form>
</template>

<script>
    import axios from "axios";
    import {ErrorWrapper} from "@/application/views/report/services/utils";

    export default {
        name: 'SearchSetting',
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
        mixins: [],
        data() {
            return {
                label: "",
                category: null,
                macroReport: null,
                categories: [
                    {value: 'text', text: 'Plain Text'},
                    {value: 'number', text: 'Number'},
                    {value: 'date', text: 'Date'},
                    {value: 'date_range', text: 'Date Range'},
                    {value: 'static_choice', text: 'Static Choices'},
                    {value: 'dynamic_choice', text: 'Dynamic Choice'},
                ],
                staticChoices: [],
                macroReports: [],
                staticChoiceKey: this.$uuid.v4(),
                macroChoiceKey: this.$uuid.v4(),
            }
        },
        computed: {},
        watch: {
            label: function (newVal, oldVal) {
                this.field['_search_config']['label'] = newVal;
            },
            category: function (newVal, oldVal) {
                if (newVal === 'static_choice') {
                    this.staticChoiceKey = this.$uuid.v4();
                } else if (newVal === 'dynamic_choice') {
                    this.loadMacros(newVal);
                    this.macroChoiceKey = this.$uuid.v4();
                }
                this.field['_search_config']['category'] = newVal;
            },
            macroReport: function (newVal, oldVal) {
                this.field['_search_config']['macro'] = newVal;
            },
            staticChoices: function (newVal, oldVal) {
                this.field['_search_config']['choices'] = newVal;
            },
        },
        created() {
        },
        methods: {
            addInput: function () {
                this.staticChoices.push("");
                this.staticChoiceKey = this.$uuid.v4();
            },
            clearInput: function (index) {
                this.staticChoices.splice(index, 1);
                this.staticChoiceKey = this.$uuid.v4();
            },
            submit: function () {
                this.closeMenu();
            },
            cancel: function () {
                this.closeMenu();
            },
            loadMacros: function () {
                axios.get(
                    '/report-configuration/list/', {
                        headers: {}, params: {
                            type: 'macro',
						},
                    }
                ).then(response => {
                    let data = response.data;
                    this.macroReports = data.results;
                }).catch(error => {
                    new ErrorWrapper(error)
                }).finally(() => {
                });
            },
        },
        mounted() {
            if (this.field['_search_config'] === undefined || this.field['_search_config'] === null) {
                this.field['_search_config'] = {};
                this.field['_search_config']['label'] = "";
                this.field['_search_config']['label'] = "";
                this.field['_search_config']['macro'] = null;
                this.field['_search_config']['choices'] = [];
            } else {
                this.label = this.field['_search_config']['label'];
                this.category = this.field['_search_config']['category'];
                this.macroReport = this.field['_search_config']['macro'];
                this.staticChoices = this.field['_search_config']['choices'];
            }
        }
    };
</script>

<style lang="scss" scoped>
</style>
