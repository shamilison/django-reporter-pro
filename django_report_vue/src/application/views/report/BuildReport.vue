<template>
    <v-container>
        <v-row>
            <v-col cols="3" sm="3">
                <v-overflow-btn
                        :items="tables" class="my-2" clearable="false" editable
                        item-value="value" label="Select Table" v-model="report_schema['table']">
                </v-overflow-btn>
            </v-col>
            <v-col cols="3" sm="3">
                {{report_schema}}
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import {TABLES, TABLE_FIELDS} from "@/application/tests/data/report_builder";

    export default {
        name: 'BuildReport',
        components: {},
        mixins: [],
        data() {
            return {
                tables: [],
                table_fields: [],
                report_schema: {
                    table: null,
                },
            };
        },
        methods: {},
        mounted() {
            // Supposed to call API for Table information
            this.tables = TABLES;
            // Supposed to call API for Table Field information when a table is selected
            this.table_fields = TABLE_FIELDS;
        }
    };
</script>

<style lang="scss" scoped>
</style>
