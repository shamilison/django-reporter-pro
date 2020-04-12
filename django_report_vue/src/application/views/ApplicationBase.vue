<template>
    <v-content>
        <v-container class="pt-0 pb-0" fluid>
            <router-view></router-view>
        </v-container>
        <notifications position="bottom right"></notifications>
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
