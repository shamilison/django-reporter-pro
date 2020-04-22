<template>
	<form class="pa-5 pt-5 pb-5 white">
		<v-text-field label="Field Label" v-model="label"></v-text-field>
		<v-select :items="categories" dense label="Search Type" outlined v-model="category"></v-select>
        <v-content :key="staticChoiceKey" class="mb-4 text-center" v-if="staticChoice">
            <template v-for="(input, index) in staticChoices">
                <v-text-field :label="`Choice ` + (index + 1)" @click:clear="clearInput(index)"
                              clearable v-model="staticChoices[index]"></v-text-field>
            </template>
            <v-btn @click="addInput" icon outlined small>
                <v-icon small>mdi-plus</v-icon>
            </v-btn>
        </v-content>
        <v-btn @click="submit" class="mr-4 primary">ok</v-btn>
		<v-btn @click="cancel">cancel</v-btn>
	</form>
</template>

<script>
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
                categories: [
                    {value: 'text', text: 'Plain Text'},
                    {value: 'number', text: 'Number'},
                    {value: 'date', text: 'Date'},
                    {value: 'date_range', text: 'Date Range'},
                    {value: 'static_choice', text: 'Static Choices'},
                    {value: 'dynamic_choice', text: 'Dynamic Choice'},
                ],
                staticChoice: false,
                staticChoices: [],
                staticChoiceKey: this.$uuid.v4(),
            }
        },
        computed: {},
        watch: {
            label: function (newVal, oldVal) {
                this.field['_search_config']['label'] = newVal;
            },
            category: function (newVal, oldVal) {
                if (newVal === 'static_choice') {
                    this.staticChoice = true;
                } else {
                    this.staticChoice = false;
                    this.staticChoices = [];
                }
                this.field['_search_config']['category'] = newVal;
                this.staticChoiceKey = this.$uuid.v4();
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
        },
        mounted() {
            if (this.field['_search_config'] === undefined || this.field['_search_config'] === null) {
                this.field['_search_config'] = {};
                this.field['_search_config']['label'] = "";
            } else {
                this.label = this.field['_search_config']['label'];
                this.category = this.field['_search_config']['category'];
            }
        }
    };
</script>

<style lang="scss" scoped>
</style>
