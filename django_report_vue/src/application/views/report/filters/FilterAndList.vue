<template>
    <v-list dense>
        <FieldPicker :fields="reportSchema['fields']" :onItemSelected="onItemSelected"
                     :purpose="null">
        </FieldPicker>
        <v-list-item :key="item.name" @click="" v-for="item in fields">
            <v-list-item-content class="pt-0 pb-0">
                <v-divider></v-divider>
                <FilterField :field="item"></FilterField>
            </v-list-item-content>
        </v-list-item>
    </v-list>
</template>

<script>
    import FieldPicker from "@/application/views/report/pickers/FieldPicker";
    import FilterField from "@/application/views/report/filters/FilterField";

    export default {
        name: 'FilterAndList',
        props: {
            reportSchema: {
                type: Object,
                default: function () {
                    return {};
                }
            },
            filters: {
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
                this.filters[item.name] = item;
                this.populateListItems(this.filters);
            },
            editItem(item) {
            },
            deleteItem(item) {
            },
        },
        mounted() {
            this.populateListItems(this.filters);
        }
    };
</script>

<style lang="scss" scoped>
</style>
