<template>
    <form class="pa-5 pt-5 pb-5 white">
        <v-text-field label="Field Label" v-model="label"></v-text-field>
        <v-btn @click="submit" class="mr-4 primary">ok</v-btn>
        <v-btn @click="cancel">cancel</v-btn>
    </form>
</template>

<script>
    export default {
        name: 'SearchSetting',
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
            }
        },
        computed: {},
        watch: {
            label: function (newVal, oldVal) {
                this.field['_search_config']['label'] = newVal;
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
            if (this.field['_search_config'] === undefined || this.field['_search_config'] === null) {
                this.field['_search_config'] = {};
                this.field['_search_config']['label'] = "";
            } else {
                this.label = this.field['_search_config']['label'];
            }
        }
    };
</script>

<style lang="scss" scoped>
</style>
