<template>
	<v-list>
		<v-row class="mx-2 my-5">
			<v-col cols="4 py-0">
				<v-text-field label="Report Title" v-model="reportSchema.information['title']"></v-text-field>
			</v-col>
			<v-col cols="8">
			</v-col>
			<v-col class="py-0" cols="4">
				<v-checkbox label="Declare as macro" v-model="reportSchema.information['is_macro']"></v-checkbox>
			</v-col>
		</v-row>
	</v-list>
</template>

<script>
    export default {
        name: 'ReportInformation',
        components: {},
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
            return {}
        },
        computed: {},
        watch: {},
        created() {
        },
        methods: {
            closeMenu(item) {
            },
        },
        mounted() {
        }
    };
</script>

<style lang="scss" scoped>
</style>
