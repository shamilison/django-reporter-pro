<template>
	<v-toolbar color="white" dense flat>
		<v-toolbar-title v-if="purpose != null">{{purpose}} Fields</v-toolbar-title>
		<v-divider class="mx-4" inset v-if="purpose != null" vertical></v-divider>
		<v-spacer></v-spacer>
		<v-dialog max-width="500px" v-if="onItemSelected!= null" v-model="dialog">
			<template v-slot:activator="{ on }">
				<v-btn class="mb-1" color="primary" dark small v-on="on">Add {{purpose}} Field</v-btn>
			</template>
			<v-card class="mx-auto">
				<v-toolbar light>
					<v-toolbar-title>
						<v-breadcrumbs class="pa-0">
							<v-breadcrumbs-item @click="browseField(breadcrumb)" exact
												v-for="breadcrumb, index in breadCrumbs">
								<v-icon left v-if="index > 0">mdi-chevron-right</v-icon>
								<a>{{ breadcrumb.text }}</a>
							</v-breadcrumbs-item>
						</v-breadcrumbs>
					</v-toolbar-title>
					<v-spacer></v-spacer>
					<v-btn icon>
						<v-icon>mdi-magnify</v-icon>
					</v-btn>
				</v-toolbar>
				<div class="mt-3">
					<v-subheader class="pa-2">Dimension Fields</v-subheader>
					<v-chip @click="displaySelected(item)" class="ml-4 mb-3" small
							v-for="(item, i) in currentFields['dimensions']">
						{{item.name}}
					</v-chip>
					<v-subheader class="pa-2">Measure Fields</v-subheader>
					<v-chip @click="measureSelected(item)" class="ml-4 mb-3" small
							v-for="(item, i) in currentFields['measures']">
						{{item.name}}
					</v-chip>
					<v-subheader class="pa-2">Relational Fields</v-subheader>
					<v-chip @click="relationSelected(item, false)"
							@click:close="relationSelected(item, true)" class="ml-4 mb-3"
							close close-icon="subdirectory_arrow_right" small
							v-for="(item, i) in currentFields['relations']">
						{{item.name}}
					</v-chip>
				</div>
			</v-card>
		</v-dialog>
	</v-toolbar>
</template>

<script>
    import axios from 'axios';
    import ModelInfoMixin from "@/application/views/report/enums/ModelInfoMixin";

    export default {
        name: 'FieldPicker',
        props: {
            purpose: {
                type: String,
                default: function () {
                    return "";
                }
            },
            model: {
                type: Object,
                default: function () {
                    return null;
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
        mixins: [ModelInfoMixin],
        data() {
            return {
                dialog: false,
                breadCrumbs: [],
                currentFields: {
                    dimensions: [],
                    measures: [],
                    relations: [],
                },
            }
        },
        computed: {},
        watch: {
            fields(newVal) {
                this.currentFields = newVal;
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
            getNestedRelations: function (field) {
                let relations = [], _k_name = '', _q_name = '';
                for (let index = 0; index < this.breadCrumbs.length; index++) {
                    let _item = this.breadCrumbs[index];
                    if(_item.selectedField === null)
                        continue;
                    relations.push({
                        table: _item.model,
                        field: _item.selectedField,
                    });
                    _k_name += _item.selectedField.name + '.';
                    _q_name += _item.selectedField.name + '__';
                }
                field['key_name'] = _k_name + field['name'];
                field['query_name'] = _q_name + field['name'];
                field['relations'] = relations;
                return field;
            },
            displaySelected: function (item) {
                this.close();
                item = this.getNestedRelations(item);
                this.onItemSelected(item);
            },
            measureSelected: function (item) {
                this.close();
                item = this.getNestedRelations(item);
                this.onItemSelected(item);
            },
            relationSelected: function (item, explore) {
                if (!explore) {
                    this.close();
                    item = this.getNestedRelations(item);
                    this.onItemSelected(item);
                } else {
                    let model = item.related_model._meta;
                    if (this.breadCrumbs.length >= 4) {
                        this.$notify({
                            type: 'warn',
                            title: 'STOP PLEASE!',
                            text: 'You can not dig deeper than 4 nested levels.',
                            duration: 3000,
                            speed: 1000,
                            data: {}
                        });
                        return;
                    }
                    axios.get(
                        '/report-model-info/', {
                            headers: {}, params: {
                                one_model: 'yes',
                                app_label: model.app_label,
                                model_name: model.model_name,
                            },
                        }
                    ).then(response => {
                        let data = response.data;
                        let lastBreadCrumb = this.breadCrumbs[this.breadCrumbs.length - 1];
                        lastBreadCrumb.selectedField = item;
                        lastBreadCrumb.fields = this.currentFields;
                        lastBreadCrumb.disabled = false;
                        this.currentFields = this.convertToFieldMap(data);
                        this.breadCrumbs.push({
                            key: this.$uuid.v4(),
                            label: model.label,
                            text: model.object_name,
                            model: model,
                            selectedField: null,
                            fields: null,
                            disabled: true,
                        });
                    }).catch(error => {
                        console.log(error);
                    }).finally(() => {
                    });
                }
            },
            browseField: function (_breadCrumb) {
                console.log(_breadCrumb);
                let _breadCrumbs = [], _currentFields = null;
                for (let index = 0; index < this.breadCrumbs.length; index++) {
                    let _item = this.breadCrumbs[index];
                    if(_item.key !== _breadCrumb.key) {
                        _breadCrumbs.push(_item);
					} else {
                        _currentFields = _item.fields;
                        _item.selectedField = null;
                        _item.fields = null;
                        _item.disabled = true;
                        _breadCrumbs.push(_item);
                        break;
					}
                }
                if(_currentFields !== null) {
                    this.currentFields = _currentFields;
                    this.breadCrumbs = _breadCrumbs;
				}
            },
        },
        mounted() {
            this.currentFields = this.fields;
            if (this.model !== null) {
                this.breadCrumbs.push({
					key: this.$uuid.v4(),
                    label: this.model.label,
                    text: this.model.object_name,
                    model: this.model,
                    selectedField: null,
                    fields: null,
                    disabled: true,
                });
            }
        }
    };
</script>

<style scoped>

</style>