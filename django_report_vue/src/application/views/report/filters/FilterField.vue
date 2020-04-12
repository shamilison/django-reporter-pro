<template>
	<v-row>
		<v-col class="pa-3 pt-1 pb-2" cols="5">
			<span v-if="field._filter_config !== undefined && field._filter_config.label !== ''">
				{{field._filter_config.label}} ({{field.key_name}})
			</span>
			<span v-else>{{field.key_name}}</span>
		</v-col>
		<v-col class="pa-3 pt-1 pb-2" cols="4">
			<span v-if="field._filter_config !== undefined && field._filter_config.filter !== ''">
				{{field._filter_config.filter}}
			</span>
			<span v-if="field._filter_config !== undefined && field._filter_config.filter !== ''
			 			&& field._filter_config.filterInputs.length > 0">
				<span v-for="(input, index) in field._filter_config.filterInputs">
					<span v-if="index > 0">,</span>{{input}}
				</span>
			</span>
		</v-col>
		<v-col class="pa-3 pt-2 pb-1" cols="3">
			<v-menu :close-on-click="false" :close-on-content-click="false"
					bottom offset-y v-model="settingShown">
				<template v-slot:activator="{ on }">
					<v-btn class="ml-2 float-right" outlined small v-on="on">
						<v-icon left small>mdi-pencil</v-icon>
						Settings
					</v-btn>
				</template>
				<FilterSetting :closeMenu="closeMenu" :field="field"></FilterSetting>
			</v-menu>
			<v-icon @click="deleteField(field)" class="mr-2 ml-2 mt-1 float-right" small>
				mdi-delete
			</v-icon>
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
        watch: {},
        created() {
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
