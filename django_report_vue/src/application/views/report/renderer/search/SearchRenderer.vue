<template>
    <v-expansion-panels multiple v-model="panel">
        <v-expansion-panel  :key="0" focusable>
            <v-expansion-panel-header expand-icon="mdi-menu-down">Search Options</v-expansion-panel-header>
            <v-expansion-panel-content>
                <v-row dense>
                    <v-col class="pa-0" cols="10" sm="10">
                        <v-row dense>
                            <v-col class="pa-0" cols="6" sm="6"  v-for="(field, i) in fields">
                                <v-text-field v-model="searchInputs[field.key_name]" dense></v-text-field>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col class="pa-0 w" cols="2" sm="2">
                    </v-col>
                </v-row>
                <v-btn color="primary" fab small absolute right @click="$emit('searched')">
                    <v-icon>mdi-magnify</v-icon>
                </v-btn>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-expansion-panels>
</template>

<script>

    export default {
        name: 'SearchRenderer',
        components: {},
        mixins: [],
        model: {
            event: 'searched'
        },
        props: {
            searchConfig: {
                type: Object,
                default: function () {
                    return {};
                }
            },
            searchFields: {
                type: Object,
                default: function () {
                    return [];
                }
            },
        },
        data() {
            return {
                panel: [0],
                fields: [],
                searchInputs: {},
            }
        },
        computed: {},
        watch: {
            searchFields: function (newVal) {
                this.populateListItems(newVal);
            },
            searchInputs: {
                deep: true,
                handler: function (newVal) {
                    let keys = Object.keys(newVal);
                    for (let index = 0; index < keys.length; index++) {
                        this.searchConfig[keys[index]] = newVal[keys[index]];
                    }
                }
            },
        },
        methods: {
            populateListItems(fields) {
                let keys = Object.keys(fields);
                let _fields = [];
                for (let index = 0; index < keys.length; index++) {
                    _fields.push(fields[keys[index]]);
                }
                this.fields = _fields;
            },
        },
        mounted() {
        },
    };
</script>

<style lang="scss" scoped>
</style>
