<template>
    <v-list dense :key="uniqueKey">
        <FieldPicker :fields="reportSchema['fields']" :onItemSelected="onItemSelected"
                     :purpose="'Measure'">
        </FieldPicker>
        <v-list-item :key="item.name" @click="" v-for="item in fields">
            <v-list-item-content class="pt-0 pb-0">
                <v-divider></v-divider>
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
                fields: [],
                uniqueKey: this.$uuid.v4(),
            }
        },
        computed: {},
        watch: {
            'reportSchema.measures': function (newVal) {
                this.uniqueKey = this.$uuid.v4();
            }
        }, created() {
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
