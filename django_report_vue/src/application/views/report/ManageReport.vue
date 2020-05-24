<template>
	<v-row>
		<v-col cols="12" sm="12">
			<v-card class="px-2 py-0">
				<v-list :key="uniqueListKey" class="pa-2" lar>
					<template v-for="(item, index) in reports">
						<v-divider v-if="index > 0"></v-divider>
						<v-list-item class="py-2">
							<v-list-item-content>
								<v-list-item-title v-text="item.text"></v-list-item-title>
								<v-list-item-subtitle v-text="item.identifier"></v-list-item-subtitle>
							</v-list-item-content>
							<v-list-item-action>
								<v-btn icon>
									<v-icon color="primary lighten-1">mdi-pencil</v-icon>
								</v-btn>
							</v-list-item-action>
							<v-list-item-action>
								<v-btn icon>
									<v-icon color="primary lighten-1">mdi-delete</v-icon>
								</v-btn>
							</v-list-item-action>
						</v-list-item>
					</template>
				</v-list>
				<v-card-text style="position: sticky;bottom: 40px;left: 50%;width: 5px;">
					<v-fab-transition>
						<v-btn absolute bottom color="primary" dark fab right>
							<v-icon>mdi-plus</v-icon>
						</v-btn>
					</v-fab-transition>
				</v-card-text>
			</v-card>
		</v-col>
	</v-row>
</template>

<script>
    import axios from 'axios';
    import ModelInfoMixin from "@/application/views/report/mixin/ModelInfoMixin";
    import {ErrorWrapper} from "./services/utils";

    export default {
        name: 'ManageReport',
        components: {},
        mixins: [ModelInfoMixin],
        data() {
            return {
                reportListURL: '/all-report-list/',
                reportPreviewURL: '/report-configuration-preview/',
                reports: [],
                uniqueListKey: this.$uuid.v4(),
            };
        },
        methods: {
            mounted: function () {
                axios.get(
                    this.reportListURL, {
                        headers: {}, params: {
                            all_models: 'yes',
                        },
                    }
                ).then(response => {
                    this.reports = response.data.results;
                }).catch(error => {
                    this.reports = [];
                    new ErrorWrapper(error)
                }).finally(() => {
                });
            },
        },
        watch: {
            '$route.params': {
                handler(newValue) {
                    this.mounted();
                },
                immediate: true,
            },
        },
        mounted() {
        },
    };
</script>

<style lang="scss" scoped>
	.json-container {
		max-height: 700px;
		overflow-y: scroll;
	}
</style>
