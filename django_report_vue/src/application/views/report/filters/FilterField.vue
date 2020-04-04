<template>
    <v-row>
        <v-col class="pa-3 pt-1 pb-2" cols="9">
            <div class="pt-2 pb-2">{{field.verbose_name}}</div>
        </v-col>
        <v-col class="pa-3 pt-2 pb-1" cols="3">
            <v-icon @click="deleteItem(field)" class="mr-2 ml-2 mt-1 float-right" small>
                mdi-delete
            </v-icon>
            <v-menu :close-on-click="false" :close-on-content-click="false"
                    bottom offset-y v-model="settingShown">
                <template v-slot:activator="{ on }">
                    <v-btn class="mr-2 ml-2 float-right" outlined small v-on="on">
                        <v-icon small left>mdi-pencil</v-icon>
                        Settings
                    </v-btn>
                </template>
                <FilterSetting :closeMenu="closeMenu"></FilterSetting>
            </v-menu>
        </v-col>
    </v-row>
</template>

<script>
    import FilterSetting from "@/application/views/report/filters/FilterSetting";

    export default {
        name: 'FilterField',
        components: {FilterSetting},
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
