<template>
	<v-row>
		<v-col class="pa-3 pt-1 pb-2" cols="9">
			<div class="pt-2 pb-2">
				<span v-if="field._display_config !== undefined && field._display_config.label !== ''">
					{{field._display_config.label}} ({{field.key_name}})
				</span>
				<span v-else>{{field.key_name}}</span>
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
				<DimensionSetting :closeMenu="closeMenu" :field="field"></DimensionSetting>
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
