<template>
	<v-row>
		<v-col class="pa-3 pt-1 pb-2" cols="9">
			<div class="pt-2 pb-2">
				<span v-if="field._search_config !== undefined && field._search_config.label !== ''">
					{{field._search_config.label}} ({{field.key_name}})
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
				<SearchSetting :closeMenu="closeMenu" :field="field"></SearchSetting>
			</v-menu>
			<v-icon @click="deleteField(field)" class="mr-2 ml-2 mt-1 float-right" small>
				mdi-delete
			</v-icon>
		</v-col>
	</v-row>
</template>

<script>
    import SearchSetting from "@/application/views/report/searches/SearchSetting";

    export default {
        name: 'SearchField',
        components: {SearchSetting},
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
