<template>
    <v-content>
        <v-container fluid>
            <router-view></router-view>
        </v-container>
    </v-content>
</template>

<script>
    export default {
        name: 'ApplicationBase',
        components: {},
        mixins: [],
        data() {
            return {};
        },
        methods: {},
        mounted() {
        }
    };
</script>

<style lang="scss" scoped>
</style>
