<template>
    <v-row>
        <v-col class="pa-3 pt-1 pb-2" cols="3">
			<span v-if="field._measure_config !== undefined && field._measure_config.label !== ''">
				{{field._measure_config.label}} ({{field.key_name}})
			</span>
            <span v-else>{{field.key_name}}</span>
        </v-col>
        <v-col class="pa-3 pt-1 pb-2" cols="2">
			<span v-if="field._measure_config !== undefined && field._measure_config.aggregation !== ''">
				{{field._measure_config.aggregation}}
			</span>
        </v-col>
        <v-col class="pa-3 pt-1 pb-2" cols="2">
			<span v-if="field._measure_config !== undefined && field._measure_config.aggregation !== ''">
				{{field._measure_config.aggregation}}
			</span>
        </v-col>
        <v-col class="pa-3 pt-1 pb-2" cols="2">
            <template v-show="field._measure_config !== undefined">
                <v-checkbox dense label="Group By" v-model="field._measure_config['group_by']"></v-checkbox>
            </template>
        </v-col>
        <v-col class="pa-3 pt-2 pb-1" cols="3">
            <v-menu :close-on-click="false" :close-on-content-click="false"
                    bottom offset-y v-model="settingShown">
                <template v-slot:activator="{ on }">
                    <v-btn class="mr-2 ml-2 float-right" outlined small v-on="on">
                        <v-icon left small>mdi-pencil</v-icon>
                        Settings
                    </v-btn>
                </template>
                <MeasureSetting :closeMenu="closeMenu" :field="field"></MeasureSetting>
            </v-menu>
            <v-icon @click="deleteField(field)" class="mr-2 ml-2 mt-1 float-right" small>
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
            deleteField: {
                type: Function,
                default: function (item) {
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
