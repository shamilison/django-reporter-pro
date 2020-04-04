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
        watch: {}, created() {
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
        }
    };
</script>

<style lang="scss" scoped>
</style>
