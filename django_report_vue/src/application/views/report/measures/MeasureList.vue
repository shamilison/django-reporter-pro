<template>
	<v-list :key="uniqueKey" dense>
		<FieldPicker :fields="reportSchema['fields']" :model="reportSchema['table']"
					 :onItemSelected="onItemSelected" :purpose="'Measure'">
		</FieldPicker>
		<v-list-item :key="item.key_name" @click="" v-for="item in fields">
			<v-list-item-content class="pt-0 pb-0">
				<v-divider></v-divider>
				<MeasureField :field="item" :deleteField="deleteField"></MeasureField>
			</v-list-item-content>
		</v-list-item>
	</v-list>
</template>

<script>
    import FieldPicker from "@/application/views/report/pickers/FieldPicker";
    import MeasureField from "@/application/views/report/measures/MeasureField";

    export default {
        name: 'MeasureList',
        props: {
            reportSchema: {
                type: Object,
                default: function () {
                    return {};
                }
            },
        },
        components: {MeasureField, FieldPicker},
        mixins: [],
        data() {
            return {
                fields: [],
                uniqueKey: this.$uuid.v4(),
            }
        },
        computed: {},
        watch: {
            'reportSchema.measures': function (newVal) {
                this.uniqueKey = this.$uuid.v4();
                this.populateListItems(this.reportSchema['measures']);
            }
        }, created() {
        },
        methods: {
            deleteField(field) {
                delete this.reportSchema['measures'][field.key_name];
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
                if (!this.reportSchema['measures'].hasOwnProperty(item.key_name)) {
                    this.reportSchema['measures'][item.key_name] = item;
                    this.populateListItems(this.reportSchema['measures']);
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
