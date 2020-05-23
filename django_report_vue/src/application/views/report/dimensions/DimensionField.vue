<template>
	<v-row>
		<v-col class="pa-3 pt-1 pb-2" cols="6">
			<div class="pt-2 pb-2">
				<span v-if="field._dimension_config !== undefined && field._dimension_config.label !== ''">
					{{field._dimension_config.label}} ({{field.key_name}})
				</span>
				<span v-else>{{field.key_name}}</span>
			</div>
		</v-col>
		<v-col class="pa-3 pt-1 pb-2" cols="3">
			<div class="pt-2 pb-2">
				<span v-if="field._dimension_config !== undefined && field._dimension_config.sort !== ''">
					{{field._dimension_config.sort}}
				</span>
			</div>
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
				<DimensionSetting :closeMenu="closeMenu" :field="field" :schema="schema"></DimensionSetting>
			</v-menu>
			<v-icon @click="deleteField(field)" class="mr-2 ml-2 mt-1 float-right" small>
				mdi-delete
			</v-icon>
		</v-col>
	</v-row>
</template>

<script>
    import DimensionSetting from "@/application/views/report/dimensions/DimensionSetting";

    export default {
        name: 'DimensionField',
        components: {DimensionSetting},
        props: {
            schema: {
                type: Object,
                default: function () {
                }
            },
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
