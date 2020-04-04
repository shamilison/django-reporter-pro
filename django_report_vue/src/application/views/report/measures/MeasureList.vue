<template>
    <v-list>
        <FieldPicker :fields="reportSchema['fields']" :onItemSelected="onItemSelected"
                     :purpose="'Measure'">
        </FieldPicker>
        <v-list-item :key="item.name" @click="" v-for="item in fields">
            <v-list-item-content>
                <MeasureField :field="item"></MeasureField>
            </v-list-item-content>
        </v-list-item>
    </v-list>
</template>

<script>
    import FieldPicker from "@/application/views/report/pickers/FieldPicker";
    import MeasureField from "@/application/views/report/measures/MeasureField";

    export default {
        name: 'MeasureList',
        props: {
            reportSchema: {
                type: Object,
                default: function () {
                    return {};
                }
            },
        },
        components: {MeasureField, FieldPicker},
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
                this.reportSchema['measures'][item.name] = item;
                this.populateListItems(this.reportSchema['measures']);
            },
            editItem(item) {
            },
            deleteItem(item) {
            },
        },
        mounted() {
            this.populateListItems(this.reportSchema['measures']);
        }
    };
</script>

<style lang="scss" scoped>
</style>
