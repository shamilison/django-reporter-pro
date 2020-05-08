<template>
	<v-list :key="uniqueKey" dense>
		<FieldPicker :fields="reportSchema['fields']" :model="reportSchema['table']"
					 :onItemSelected="onItemSelected" :purpose="'Dimension'">
		</FieldPicker>
		<Draggable @end="dragAction(false)" @start="dragAction(true)" group="dimension" v-model="fields">
			<v-list-item :key="item.key_name" @click="" v-for="item in fields">
				<v-list-item-content class="pt-0 pb-0">
					<v-divider></v-divider>
					<DimensionField :deleteField="deleteField" :field="item"></DimensionField>
				</v-list-item-content>
			</v-list-item>
		</Draggable>
	</v-list>
</template>

<script>
    import FieldPicker from "@/application/views/report/pickers/FieldPicker";
    import DimensionField from "@/application/views/report/dimensions/DimensionField";
    import Draggable from 'vuedraggable'

    export default {
        name: 'DimensionList',
        components: {DimensionField, FieldPicker, Draggable},
        props: {
            reportSchema: {
                type: Object,
                default: function () {
                    return {};
                }
            },
        },
        mixins: [],
        data() {
            return {
                fields: [],
                uniqueKey: this.$uuid.v4(),
            }
        },
        computed: {},
        watch: {
            'reportSchema.dimensions': function (newVal) {
                this.populateListItems(this.reportSchema['dimensions']);
                this.uniqueKey = this.$uuid.v4();
            },
        }, created() {
        },
        methods: {
            dragAction(drag) {
                if (!drag) {
                    this.populateDimensions(this.fields);
                    this.uniqueKey = this.$uuid.v4();
                }
            },
            deleteField(field) {
                delete this.reportSchema['dimensions'][field.key_name];
                this.populateListItems(this.reportSchema['dimensions']);
            },
            populateListItems(fields) {
                let keys = Object.keys(fields);
                let _fields = [];
                for (let index = 0; index < keys.length; index++) {
                    _fields.push(fields[keys[index]]);
                }
                this.fields = _fields;
            },
            populateDimensions(fields) {
                let dimensions = {};
                for (let index = 0; index < fields.length; index++) {
                    let _field = fields[index];
                    dimensions[_field.key_name] = _field;
                }
                this.reportSchema['dimensions'] = dimensions;
            },
            onItemSelected(item) {
                if (!this.reportSchema['dimensions'].hasOwnProperty(item.key_name)) {
                	item['_dimension_config'] = {};
                    this.reportSchema['dimensions'][item.key_name] = item;
					this.populateListItems(this.reportSchema['dimensions']);
					this.reportSchema['orders'].push(item);
				} else {
                    this.$notify({
                        type: 'warn',
                        title: 'Field already ADDED!',
                        text: 'The field you are trying to add, has been added in list already!',
                        duration: 4000,
                        speed: 1000,
                        data: {}
                    });
                }
            },
        },
        mounted() {
            this.populateListItems(this.reportSchema['dimensions']);
        }
    };
</script>

<style lang="scss" scoped>
</style>
