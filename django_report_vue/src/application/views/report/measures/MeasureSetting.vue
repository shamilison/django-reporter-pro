<template>
    <form class="pa-5 pt-5 pb-5 white">
        <v-text-field label="Field Label" v-model="label"></v-text-field>
        <v-select :items="aggregateOptions" label="Aggregation" v-model="aggregation"></v-select>
        <v-select :items="sortOptions" label="Sort by" v-model="sort"></v-select>
        <v-btn @click="submit" class="mr-4 primary">ok</v-btn>
        <v-btn @click="cancel">cancel</v-btn>
    </form>
</template>

<script>
    export default {
        name: 'MeasureSetting',
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
                aggregation: null,
                aggregateOptions: [
                    {value: 'unagg', text: 'Unaggregated'},
                    {value: 'count', text: 'Count of distinct'},
                    {value: 'countall', text: 'Count of all'},
                    {value: 'sum', text: 'Total sum'},
                    {value: 'average', text: 'Average'},
                    {value: 'min', text: 'Minimum'},
                    {value: 'max', text: 'Maximum'},
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
        }
    };
</script>

<style lang="scss" scoped>
</style>
