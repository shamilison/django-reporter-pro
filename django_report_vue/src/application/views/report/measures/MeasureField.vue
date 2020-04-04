<template>
    <v-row>
        <v-col cols="7">{{field.verbose_name}}</v-col>
        <v-col cols="5" right>
            <v-menu :close-on-click="false" :close-on-content-click="false"
                    v-model="settingShown" bottom offset-y>
                <template v-slot:activator="{ on }">
                    <v-btn class="mr-2 ml-2" outlined v-on="on">
                        <v-icon left>mdi-pencil</v-icon>
                        Settings
                    </v-btn>
                </template>
                <MeasureSetting :closeMenu="closeMenu"></MeasureSetting>
            </v-menu>
            <v-divider :vertical="true"></v-divider>
            <v-icon @click="editItem(field)" class="mr-2 ml-2">
                mdi-pencil
            </v-icon>
            <v-divider :vertical="true"></v-divider>
            <v-icon @click="deleteItem(field)" class="mr-2 ml-2">
                mdi-delete
            </v-icon>
        </v-col>
    </v-row>
</template>

<script>
    import MeasureSetting from "@/application/views/report/measures/MeasureSetting";

    export default {
        name: 'MeasureField',
        components: {MeasureSetting},
        props: {
            field: {
                type: Object,
                default: function () {
                    return {};
                }
            },
        },
        mixins: [],
        data() {
            return {
                settingShown: false,
            }
        },
        computed: {},
        watch: {}, created() {
        },
        methods: {
            showDimensionOption(item) {
            },
            editItem(item) {
            },
            deleteItem(item) {
            },
            closeMenu(item) {
                this.settingShown = false;
            },
        },
        mounted() {
        }
    };
</script>

<style lang="scss" scoped>
</style>
