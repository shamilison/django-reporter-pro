<template>
	<v-card class="pt-3 pb-3 pa-3">
		<v-data-table :custom-filter="filterSearch" :headers="headers"
					  :items="data" :search="search" item-key="name">
			<template v-slot:top>
			</template>
		</v-data-table>
	</v-card>
</template>

<script>

    export default {
        name: 'TableRenderer',
        components: {},
        mixins: [],
        props: {
            reportSchema: {
                type: Object,
                default: function () {
                    return {};
                }
            },
            headers: {
                type: Array,
                default: function () {
                    return [];
                }
            },
            data: {
                type: Array,
                default: function () {
                    return [];
                }
            },
        },
        data() {
            return {
                search: '',
                calories: '',
            }
        },
        computed: {},
        methods: {
            filterSearch(value, search, item) {
                return value != null &&
                    search != null &&
                    typeof value === 'string' && value.toString().indexOf(search) !== -1
            },
        },
        mounted() {
        },
    };
</script>

<style lang="scss" scoped>
</style>
