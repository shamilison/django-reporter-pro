<template>
    <form class="pa-5 pt-5 pb-5 white">
        <v-text-field label="Field Label" v-model="label"></v-text-field>
        <v-select :items="sortOptions" label="Sort by" v-model="sort"></v-select>
        <v-btn @click="submit" class="mr-4 primary">ok</v-btn>
        <v-btn @click="cancel">cancel</v-btn>
    </form>
</template>

<script>
    export default {
        name: 'DimensionSetting',
        components: {},
        props: {
            field: {
                type: Object,
                default: function () {
                }
            },
            closeMenu: {
                type: Function,
                default: function () {
                }
            },
        },
        mixins: [],
        data() {
            return {
                label: "",
                sort: null,
                sortOptions: [
                    {value: 'ascending', text: 'Ascending'},
                    {value: 'descending', text: 'Descending'},
                ],
            }
        },
        computed: {},
        watch: {
            label: function (newVal, oldVal) {
                this.field['_display_config']['label'] = newVal;
            },
            sort: function (newVal, oldVal) {
                this.field['_display_config']['sort'] = newVal;
            },
        },
        created() {
        },
        methods: {
            submit: function () {
                this.closeMenu();
            },
            cancel: function () {
                this.closeMenu();
            },
        },
        mounted() {
            if (this.field['_display_config'] === undefined || this.field['_display_config'] === null) {
                this.field['_display_config'] = {};
                this.field['_display_config']['label'] = "";
                this.field['_display_config']['sort'] = null;
            } else {
                this.label = this.field['_display_config']['label'];
                this.sort = this.field['_display_config']['sort'];
            }
        }
    };
</script>

<style lang="scss" scoped>
</style>
