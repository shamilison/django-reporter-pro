<template>
    <form class="pa-5 pt-5 pb-5 white">
        <v-text-field label="Field Label" v-model="label"></v-text-field>
        <v-select :items="filterOptions" label="Condition" v-model="filter"></v-select>
        <v-btn @click="submit" class="mr-4 primary">ok</v-btn>
        <v-btn @click="cancel">cancel</v-btn>
    </form>
</template>

<script>
    export default {
        name: 'FilterSetting',
        components: {},
        props: {
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
                filter: null,
                filterOptions: [],
                dimensionFilterOptions: [
                    {value: 'eq', text: 'equals'},
                    {value: 'neq', text: 'does not equal'},
                    {value: 'in', text: 'is one of'},
                    {value: 'not_in', text: 'is not one of'},
                    {value: 'like', text: 'like'},
                    {value: 'not_like', text: 'is not like'},
                    {value: 'regex', text: 'matches regex'},
                    {value: 'ilike', text: 'like (case insensitive)'},
                    {value: 'not_ilike', text: 'not like (case insensitive)'},
                    {value: 'is_null', text: 'is null'},
                    {value: 'not_null', text: 'is not null'},
                ],
                measureFilterOptions: [
                    {value: 'eq', text: 'equals'},
                    {value: 'neq', text: 'does not equal'},
                    {value: 'in', text: 'is one of'},
                    {value: 'not_in', text: 'is not one of'},
                    {value: 'gt', text: 'greater than'},
                    {value: 'gte', text: 'greater than or equal'},
                    {value: 'lt', text: 'less than'},
                    {value: 'lte', text: 'less than or equal'},
                    {value: 'numbti', text: 'between and including'},
                    {value: 'is_null', text: 'is null'},
                    {value: 'not_null', text: 'is not null'},
                ],
                sort: null,
                sortOptions: [
                    {value: 'ascending', text: 'Ascending'},
                    {value: 'descending', text: 'Descending'},
                ],
            }
        },
        computed: {},
        watch: {}, created() {
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
            this.filterOptions = this.measureFilterOptions;
        }
    };
</script>

<style lang="scss" scoped>
</style>
