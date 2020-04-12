<template>
	<v-list :key="uniqueKey" dense>
		<FieldPicker :fields="reportSchema['fields']" :model="reportSchema['table']"
					 :onItemSelected="onItemSelected" :purpose="'Dimension'">
		</FieldPicker>
		<v-list-item :key="item.key_name" @click="" v-for="item in fields">
			<v-list-item-content class="pt-0 pb-0">
				<v-divider></v-divider>
				<DimensionField :field="item" :deleteField="deleteField"></DimensionField>
			</v-list-item-content>
		</v-list-item>
	</v-list>
</template>

<script>
    import FieldPicker from "@/application/views/report/pickers/FieldPicker";
    import DimensionField from "@/application/views/report/dimensions/DimensionField";

    export default {
        name: 'DimensionList',
        components: {DimensionField, FieldPicker},
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
                this.uniqueKey = this.$uuid.v4();
                this.populateListItems(this.reportSchema['dimensions']);
            }
        }, created() {
        },
        methods: {
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
            onItemSelected(item) {
                if (!this.reportSchema['dimensions'].hasOwnProperty(item.key_name)) {
                    this.reportSchema['dimensions'][item.key_name] = item;
                    this.populateListItems(this.reportSchema['dimensions']);
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
