<template>
    <v-toolbar color="white" flat dense>
        <v-toolbar-title v-if="purpose != null">{{purpose}} Fields</v-toolbar-title>
        <v-divider class="mx-4" inset v-if="purpose != null" vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog max-width="500px" v-if="onItemSelected!= null" v-model="dialog">
            <template v-slot:activator="{ on }">
                <v-btn class="mb-1" color="primary" dark v-on="on" small>Add {{purpose}} Field</v-btn>
            </template>
            <v-card class="mx-auto">
                <v-toolbar light>
                    <v-toolbar-title>Select Field</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon>
                        <v-icon>mdi-magnify</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-list dense>
                    <v-subheader>Dimension Fields</v-subheader>
                    <v-list-item-group color="primary">
                        <v-list-item :key="i" @click="displaySelected(item)"
                                     v-for="(item, i) in fields['dimensions']">
                            <v-list-item-icon>
                                <v-icon v-text="item.icon"></v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title v-text="item.name"></v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                    <v-subheader>Measure Fields</v-subheader>
                    <v-list-item-group color="primary">
                        <v-list-item :key="i" @click="measureSelected(item)"
                                     v-for="(item, i) in fields['measures']">
                            <v-list-item-icon>
                                <v-icon v-text="item.icon"></v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title v-text="item.name"></v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                    <v-subheader>Relational Fields</v-subheader>
                    <v-list-item-group color="primary">
                        <v-list-item :key="i" @click="relationSelected(item)"
                                     v-for="(item, i) in fields['relations']">
                            <v-list-item-icon>
                                <v-icon v-text="item.icon"></v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title v-text="item.name"></v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-card>
        </v-dialog>
    </v-toolbar>
</template>

<script>
    export default {
        name: 'FieldPicker',
        props: {
            purpose: {
                type: String,
                default: function () {
                    return "";
                }
            },
            fields: {
                type: Object,
                default: function () {
                    return {};
                }
            },
            onItemSelected: {
                type: Function,
                default: null,
            },
        },
        components: {},
        mixins: [],
        data() {
            return {
                dialog: false,
            }
        },
        computed: {},
        watch: {
            dialog(newVal) {
            },
        }, created() {
            this.initialize()
        },
        methods: {
            initialize() {
            },
            close() {
                this.dialog = false
            },
            displaySelected: function (item) {
                this.close();
                this.onItemSelected(item);
            },
            measureSelected: function (item) {
                this.close();
                this.onItemSelected(item);
            },
            relationSelected: function (item) {
                this.close();
                this.onItemSelected(item);
            },
        },
        mounted() {
        }
    };
</script>

<style scoped>

</style>