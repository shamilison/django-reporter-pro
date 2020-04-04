<template>
    <v-list>
        <FieldPicker :fields="reportSchema['fields']" :onItemSelected="onItemSelected"
                     :purpose="'Filter'">
        </FieldPicker>
        <v-list-item :key="item.name" @click="" v-for="item in fields">
            <v-list-item-content>
                <FilterField :field="item"></FilterField>
            </v-list-item-content>
        </v-list-item>
    </v-list>
</template>

<script>
    import FieldPicker from "@/application/views/report/pickers/FieldPicker";
    import FilterField from "@/application/views/report/filters/FilterField";

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
        components: {FilterField, FieldPicker},
        mixins: [],
        data() {
            return {
                singleSelect: true,
                selected: [],
                headers: [
                    {text: 'Field Name', align: 'start', value: 'name',},
                    {text: 'Display Name', align: 'start', value: 'verbose_name',},
                    {text: 'Actions', value: 'actions', sortable: false},
                ],
                fields: [],
            }
        },
        computed: {},
        watch: {}, created() {
        },
        methods: {
            populateListItems(fields) {
                let keys = Object.keys(fields);
                this.fields = [];
                for (let index = 0; index < keys.length; index++) {
                    this.fields.push(fields[keys[index]]);
                }
            },
            onItemSelected(item) {
                this.reportSchema['filters'][item.name] = item;
                this.populateListItems(this.reportSchema['filters']);
            },
            editItem(item) {
            },
            deleteItem(item) {
            },
        },
        mounted() {
            this.populateListItems(this.reportSchema['filters']);
        }
    };
</script>

<style lang="scss" scoped>
</style>
