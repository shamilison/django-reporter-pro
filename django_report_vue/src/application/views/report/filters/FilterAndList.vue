<template>
    <v-list dense>
        <FieldPicker :fields="reportSchema['fields']" :model="reportSchema['table']"
                     :onItemSelected="onItemSelected" :purpose="'Filter'">
        </FieldPicker>
        <v-list-item :key="item.unique_id" @click="" v-for="item in fields">
            <v-list-item-content class="pt-0 pb-0">
                <v-divider></v-divider>
                <FilterField :deleteField="deleteField" :field="item" :reportSchema="reportSchema"></FilterField>
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
        computed: {
        },
        watch: {
            filters: function (newVal) {
                this.populateListItems(this.filters);
            }
        },
        created() {
        },
        methods: {
            deleteField(field) {
                delete this.filters[field.unique_id];
                this.populateListItems(this.filters);
            },
            populateListItems(fields) {
                let keys = Object.keys(fields);
                let _fields = [];
                for (let index = 0; index < keys.length; index++) {
                    _fields.push(fields[keys[index]]);
                }
                this.fields = _fields;
            },
            onItemSelected(item) {
                let clonedItem = this._.cloneDeep(item);
                let uuid_key = this.$uuid.v4().replace(/-/g, "");
                if (!this.filters.hasOwnProperty(uuid_key)) {
                    clonedItem['unique_id'] = uuid_key;
                    this.filters[uuid_key] = clonedItem;
                    this.populateListItems(this.filters);
                } else {
                    this.$notify({
                        type: 'warn',
                        title: 'Field already ADDED!',
                        text: 'The field you are trying to add, has been added in list already!',
                        duration: 4000,
                        speed: 1000,
                        data: {}
                    });
                }
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
