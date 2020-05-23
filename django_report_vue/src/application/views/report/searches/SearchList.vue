<template>
	<v-list :key="uniqueKey" dense>
		<FieldPicker :fields="reportSchema['fields']" :model="reportSchema['table']"
					 :onItemSelected="onItemSelected" :purpose="'Search'">
		</FieldPicker>
		<Draggable @end="dragAction(false)" @start="dragAction(true)" group="search" v-model="fields">
			<v-list-item :key="item.key_name" @click="" v-for="item in fields">
				<v-list-item-content class="pt-0 pb-0">
					<v-divider></v-divider>
					<SearchField :deleteField="deleteField" :field="item"></SearchField>
				</v-list-item-content>
			</v-list-item>
		</Draggable>
	</v-list>
</template>

<script>
    import FieldPicker from "@/application/views/report/pickers/FieldPicker";
    import SearchField from "@/application/views/report/searches/SearchField";
    import Draggable from 'vuedraggable';

    export default {
        name: 'SearchList',
        components: {SearchField, FieldPicker, Draggable},
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
            'reportSchema.searches': function (newVal) {
                this.populateListItems(this.reportSchema['searches']);
                this.uniqueKey = this.$uuid.v4();
            },
        }, created() {
        },
        methods: {
            dragAction(drag) {
                if (!drag) {
                    this.populateSearches(this.fields);
                    this.uniqueKey = this.$uuid.v4();
                }
            },
            deleteField(field) {
                delete this.reportSchema['searches'][field.unique_id];
                this.populateListItems(this.reportSchema['searches']);
            },
            populateListItems(fields) {
                let keys = Object.keys(fields);
                let _fields = [];
                for (let index = 0; index < keys.length; index++) {
                    _fields.push(fields[keys[index]]);
                }
                this.fields = _fields;
            },
            populateSearches(fields) {
                let searches = {};
                for (let index = 0; index < fields.length; index++) {
                    let _field = fields[index];
                    searches[_field.unique_id] = _field;
                }
                this.reportSchema['searches'] = searches;
            },
            onItemSelected(item) {
                let clonedItem = this._.cloneDeep(item);
                let uuid_key = this.$uuid.v4().replace(/-/g, "");
                if (!this.reportSchema['searches'].hasOwnProperty(clonedItem.key_name)) {
                    clonedItem['unique_id'] = uuid_key;
                    this.reportSchema['searches'][uuid_key] = clonedItem;
                    this.populateListItems(this.reportSchema['searches']);
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
            this.populateListItems(this.reportSchema['searches']);
        }
    };
</script>

<style lang="scss" scoped>
</style>
