<template>
	<v-expansion-panels multiple v-model="panel">
		<v-expansion-panel :key="0" focusable>
			<v-expansion-panel-header expand-icon="mdi-menu-down">Search Options</v-expansion-panel-header>
			<v-expansion-panel-content>
				<v-row dense>
					<v-col class="pa-0" cols="12" sm="12">
						<v-row :key="searchViewKey" dense>
							<v-col cols="6" sm="6" v-bind:class="(i % 2 === 0)? 'pl-0 pr-2':'pl-2 pr-0'"
								   v-for="(field, i) in fields">
								<template v-if="field._search_config.category === 'text'">
									<v-text-field :label="field._search_config.label" dense
												  v-model="searchInputs[field.key_name]">
									</v-text-field>
								</template>
								<template v-if="field._search_config.category === 'number'">
									<v-text-field :label="field._search_config.label" dense type="number"
												  v-model="searchInputs[field.key_name]">
									</v-text-field>
								</template>
								<template v-if="field._search_config.category === 'date'">

								</template>
								<template v-if="field._search_config.category === 'date_range'">

								</template>
								<template v-if="field._search_config.category === 'static_choice'">
									<v-select :items="field._search_config.choices"
											  :label="field._search_config.label" dense outlined
											  v-model="searchInputs[field.key_name]"></v-select>
								</template>
								<template v-if="field._search_config.category === 'dynamic_choice'">
									<v-select :item-text="dynamicChoiceMap[field.key_name].text"
											  :item-value="dynamicChoiceMap[field.key_name].value"
											  :items="dynamicChoiceMap[field.key_name].items"
											  :label="field._search_config.label" dense outlined
											  v-model="searchInputs[field.key_name]"></v-select>
								</template>
							</v-col>
						</v-row>
					</v-col>
					<v-col class="pa-0 w" cols="2" sm="2">
					</v-col>
				</v-row>
				<v-btn @click="$emit('searched')" absolute color="primary" fab right small>
					<v-icon>mdi-magnify</v-icon>
				</v-btn>
			</v-expansion-panel-content>
		</v-expansion-panel>
	</v-expansion-panels>
</template>
panel
<script>

    import axios from "axios";

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
                reportPreviewURL: '/report-configuration-preview/',
                panel: [0],
                fields: [],
                dynamicChoiceMap: {},
                searchInputs: {},
                searchViewKey: this.$uuid.v4(),
            }
        },
        computed: {},
        watch: {
            searchFields: function (newVal) {
                let _vm = this;
                this.populateListItems(newVal);
                let keys = Object.keys(newVal);
                for (let index = 0; index < keys.length; index++) {
                    if (newVal[keys[index]]._search_config.category === 'dynamic_choice') {
                        let keyName = newVal[keys[index]].key_name;
                        _vm.dynamicChoiceMap[keyName] = {
                            text: "text",
                            value: "value",
                            items: [],
                        };
                        if (newVal[keys[index]]._search_config.macro !== null) {
                            axios({
                                method: 'put',
                                url: _vm.reportPreviewURL + newVal[keys[index]]._search_config.macro + '/',
                                params: {},
                                headers: {'Content-Type': 'application/json',},
                                data: this.searchConfig,
                            }).then(response => {
                                _vm.dynamicChoiceMap[keyName] = {
                                    value: response.data.headers[0].value,
                                    text: response.data.headers[1].value,
                                    items: response.data.results,
                                };
                                _vm.searchViewKey = this.$uuid.v4();
                            }).catch(error => {
                                console.log(error);
                            }).finally(() => {
                            });
                        }
                    }
                }
            },
            searchInputs: {
                deep: true,
                handler: function (newVal, oldVal) {
                    let keys = Object.keys(newVal);
                    for (let index = 0; index < keys.length; index++) {
                        this.searchConfig[keys[index]] = newVal[keys[index]];
                    }
                    this.$router.replace({
                        ...this.$router.currentRoute,
                        query: {
                            search: btoa(JSON.stringify(newVal))
                        }
                    });
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
            try {
                this.searchInputs = JSON.parse(atob(this.$route.query.search));
            } catch (error) {
				console.log(error);
            }
        },
    };
</script>

<style lang="scss" scoped>
</style>
