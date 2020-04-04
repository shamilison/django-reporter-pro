<template>
    <v-list dense>
        <v-toolbar color="white" flat>
            <v-toolbar-title>Filter Fields</v-toolbar-title>
        </v-toolbar>
        <template v-for="item in reportSchema['filters']">
            <FilterAndList :filters="item" :reportSchema="reportSchema" @click="">
            </FilterAndList>
            <div class="text-center">
                <v-btn outlined small v-on="on" @click="addItem">
                    <v-icon left small>mdi-pencil</v-icon>
                    Or
                </v-btn>
            </div>
        </template>
    </v-list>
</template>

<script>
    import FieldPicker from "@/application/views/report/pickers/FieldPicker";
    import FilterAndList from "@/application/views/report/filters/FilterAndList";

    export default {
        name: 'FilterList',
        props: {
            reportSchema: {
                type: Object,
                default: function () {
                    return {};
                }
            },
        },
        components: {FilterAndList, FieldPicker},
        mixins: [],
        data() {
            return {
                fields: [],
            }
        },
        computed: {},
        watch: {}, created() {
        },
        methods: {
            addItem() {
                this.reportSchema['filters'].push({});
            },
        },
        mounted() {
        }
    };
</script>

<style lang="scss" scoped>
</style>
