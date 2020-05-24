<template>
    <v-list>
        <v-row class="mx-2 my-5">
            <v-col class="py-0" cols="6">
                <v-text-field label="Report Title"
                              v-model="reportSchema.information['title']"></v-text-field>
            </v-col>
            <v-col class="py-0" cols="6">
                <v-text-field label="Report Identifier"
                              v-model="reportSchema.information['identifier']"></v-text-field>
            </v-col>
            <v-col class="py-0" cols="6" sm="6">
                <v-select :items="reportTypes" class="mt-2" dense label="Report Type"
                          return-object v-model="reportType"></v-select>
            </v-col>
            <v-col class="py-0" cols="3">
                <v-checkbox label="Declare as macro"
                            v-model="reportSchema.information['is_macro']"></v-checkbox>
            </v-col>
            <v-col class="py-0" cols="3">
                <v-checkbox label="Clear default order by"
                            v-model="reportSchema.information['clear_order']"></v-checkbox>
            </v-col>
        </v-row>
    </v-list>
</template>

<script>
    export default {
        name: 'ReportInformation',
        components: {},
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
                reportType: {value: 'table', text: 'Table'},
                reportTypes: [
                    {value: 'summery', text: 'Summery'},
                    {value: 'chart', text: 'Chart'},
                    {value: 'table', text: 'Table'},
                ],
            }
        },
        computed: {},
        watch: {
            reportType: function (newVal, oldVal) {
                this.reportSchema.report_config['report_type'] = newVal;
            },
        },
        created() {
        },
        methods: {
            closeMenu(item) {
            },
        },
        beforeMount() {
            if (this.reportSchema.information['identifier'] === undefined ||
                this.reportSchema.information['identifier'] === null) {
                this.reportType = null;
                this.reportSchema.information['identifier'] = this.$uuid.v4();
            } else {
                this.reportType = this.reportSchema.report_config['report_type'];
            }
        },
        mounted() {
        }
    };
</script>

<style lang="scss" scoped>
</style>
