<template>
	<v-list :key="uniqueKey" dense>
		<FieldPicker :fields="reportSchema['fields']" :model="reportSchema['table']"
					 :onItemSelected="onItemSelected" :purpose="'Measure'">
		</FieldPicker>
		<v-list-item :key="item.unique_id" @click="" v-for="item in fields">
			<v-list-item-content class="pt-0 pb-0">
				<v-divider></v-divider>
				<MeasureField :deleteField="deleteField" :field="item" :schema="reportSchema"></MeasureField>
			</v-list-item-content>
		</v-list-item>
	</v-list>
</template>

<script>
    import FieldPicker from "@/application/views/report/pickers/FieldPicker";
    import MeasureField from "@/application/views/report/measures/MeasureField";
    import ReportHeaderOrderMixin from "@/application/views/report/mixin/ReportHeaderOrderMixin";
    import Draggable from 'vuedraggable'

    export default {
        name: 'MeasureList',
        components: {MeasureField, FieldPicker, Draggable},
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
            'reportSchema.measures': function (newVal) {
                this.populateListItems(this.reportSchema['measures']);
                this.uniqueKey = this.$uuid.v4();
            }
        }, created() {
        },
        methods: {
            deleteField(field) {
                delete this.reportSchema['measures'][field.unique_id];
                this.populateListItems(this.reportSchema['measures']);
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
                if (!this.reportSchema['measures'].hasOwnProperty(clonedItem.key_name)) {
                    clonedItem['_measure_config'] = {};
                    clonedItem['unique_id'] = uuid_key;
                    this.reportSchema['measures'][uuid_key] = clonedItem;
                    this.populateListItems(this.reportSchema['measures']);
                    this.addToOrderList(this.reportSchema, clonedItem, clonedItem.key_name, 'measure');
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
            editItem(item) {
            },
            deleteItem(item) {
            },
        },
        mounted() {
            this.populateListItems(this.reportSchema['measures']);
        }
    };
</script>

<style lang="scss" scoped>
</style>
