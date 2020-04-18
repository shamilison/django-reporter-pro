<template>
	<v-card class="mb-3 pa-3" max-width="400">
		<v-row>
			<v-col class="pb-0" cols="12" sm="12">
				<v-select :items="headers" class="mt-2" dense label="Summery Field"
						  outlined v-model="summeryField"></v-select>
			</v-col>
		</v-row>
		<v-list class="transparent">
			<v-list-item two-line>
				<v-list-item-content>
					<v-list-item-title class="headline">Summery Report</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
		</v-list>
		<v-divider></v-divider>
		<v-card-text>
			<v-row align="center">
				<v-divider></v-divider>
				<v-col class="display-2" cols="12">
					{{summeryValue}}
				</v-col>
			</v-row>
		</v-card-text>
	</v-card>
</template>

<script>
    export default {
        name: 'SummeryRenderer',
        components: {},
        mixins: [],
        props: {
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
        watch: {
            summeryField: function (newValue) {
                try {
                    this.summeryValue = this.data[0][newValue];
                } catch (e) {
                    this.summeryValue = 0;
                }
            }
        },
        data() {
            return {
                summeryField: null,
                summeryValue: 0,
            }
        },
        computed: {},
        methods: {},
        mounted() {
            try {
                this.summeryField = this.headers[1].value;
            } catch (e) {
            }
        },
    };
</script>

<style lang="scss" scoped>
</style>
