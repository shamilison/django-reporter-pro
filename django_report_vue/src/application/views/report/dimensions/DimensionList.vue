<template>
	<v-list :key="uniqueKey" dense>
		<FieldPicker :fields="reportSchema['fields']" :model="reportSchema['table']"
					 :onItemSelected="onItemSelected" :purpose="'Dimension'">
		</FieldPicker>
		<v-list-item :key="item.unique_id" @click="" v-for="item in fields">
			<v-list-item-content class="pt-0 pb-0">
				<v-divider></v-divider>
				<DimensionField :deleteField="deleteField" :field="item" :schema="reportSchema"></DimensionField>
			</v-list-item-content>
		</v-list-item>
	</v-list>
</template>

<script>
    import FieldPicker from "@/application/views/report/pickers/FieldPicker";
    import DimensionField from "@/application/views/report/dimensions/DimensionField";
    import Draggable from 'vuedraggable'
    import ReportHeaderOrderMixin from "@/application/views/report/mixin/ReportHeaderOrderMixin";

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
        mixins: [ReportHeaderOrderMixin],
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
            deleteField(field) {
                delete this.reportSchema['dimensions'][field.unique_id];
                this.populateListItems(this.reportSchema['dimensions']);
                this.uniqueKey = this.$uuid.v4();
            },
            populateListItems(fields) {
                let keys = Object.keys(fields);
                let _fields = [];
                for (let index = 0; index < keys.length; index++) {
                    _fields.push(fields[keys[index]]);
                }
                this.fields = _fields;
            },
            onItemSelected(item) {
                let clonedItem = this._.cloneDeep(item);
                let uuid_key = this.$uuid.v4().replace(/-/g, "");
                if (!this.reportSchema['dimensions'].hasOwnProperty(uuid_key)) {
                    clonedItem['_dimension_config'] = {};
                    clonedItem['unique_id'] = uuid_key;
                    this.reportSchema['dimensions'][uuid_key] = clonedItem;
                    this.populateListItems(this.reportSchema['dimensions']);
                    this.addToOrderList(this.reportSchema, clonedItem, clonedItem.key_name, 'dimension');
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
