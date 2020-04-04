<template>
    <v-list>
        <FieldPicker :fields="reportSchema['fields']" :onItemSelected="onItemSelected"
                     :purpose="'Dimension'">
        </FieldPicker>
        <v-list-item :key="item.name" @click="" v-for="item in fields">
            <v-list-item-content>
                <DimensionField :field="item"></DimensionField>
            </v-list-item-content>
        </v-list-item>
    </v-list>
</template>

<script>
    import FieldPicker from "@/application/views/report/pickers/FieldPicker";
    import DimensionField from "@/application/views/report/dimensions/DimensionField";

    export default {
        name: 'DimensionList',
        components: {DimensionField, FieldPicker},
        props: {
            reportSchema: {
                type: Object,
                default: function () {
                    return {};
                }
            },
        },
        mixins: [],
        data() {
            return {
                singleSelect: true,
                selected: [],
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
                this.reportSchema['dimensions'][item.name] = item;
                this.populateListItems(this.reportSchema['dimensions']);
            },
        },
        mounted() {
            this.populateListItems(this.reportSchema['dimensions']);
        }
    };
</script>

<style lang="scss" scoped>
</style>
