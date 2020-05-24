<template>
	<v-row>
		<v-col cols="12" sm="12">
			<v-card class="px-2 py-0">
				<v-card-title>
					<div class="display-1">Report List</div>
				</v-card-title>
				<v-list :key="uniqueListKey" class="pa-2" lar>
					<template v-for="(item, index) in reports">
						<v-divider></v-divider>
						<v-list-item class="py-2">
							<v-list-item-content>
								<v-list-item-title class="title" v-text="item.title"></v-list-item-title>
								<v-list-item-subtitle class="subtitle-2" v-text="item.identifier">
								</v-list-item-subtitle>
								<v-list-item-subtitle class="subtitle-1" v-text="item.created_at">
								</v-list-item-subtitle>
							</v-list-item-content>
							<v-list-item-action class="mx-2">
								<v-btn icon x-small>
									<v-icon @click="viewReport(item)" color="grey lighten-1">mdi-eye</v-icon>
								</v-btn>
							</v-list-item-action>
							<v-list-item-action class="mx-2">
								<v-btn icon x-small>
									<v-icon @click="editReport(item)" color="primary lighten-1">mdi-pencil</v-icon>
								</v-btn>
							</v-list-item-action>
							<v-list-item-action class="mx-2">
								<v-btn icon x-small>
									<v-icon @click="showDeleteConsent(item)" color="red lighten-1">mdi-delete</v-icon>
								</v-btn>
							</v-list-item-action>
						</v-list-item>
					</template>
				</v-list>
				<v-card-text style="position: sticky;bottom: 40px;left: 50%;width: 5px;">
					<v-fab-transition>
						<v-btn @click="gotoNewReport" absolute bottom color="primary" dark fab right>
							<v-icon>mdi-plus</v-icon>
						</v-btn>
					</v-fab-transition>
				</v-card-text>
				<v-dialog max-width="450" v-model="deleteDialog">
					<v-card>
						<v-card-title class="title">Are you due to delete this report?</v-card-title>
						<v-card-text>
							<template v-if="deleteCandidate !== null">
								<div>{{deleteCandidate.title}}</div>
							</template>
						</v-card-text>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn @click="hideDeleteDialog()" color="primary darken-1" text>
								No
							</v-btn>
							<v-btn @click="disableReport()" color="red darken-1" text>
								Yes, sure
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
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
                reportListURL: '/report-configuration/list/',
                reportDisableURL: '/report-configuration/delete/',
                reportPreviewURL: '/report-configuration-preview/',
                reports: [],
                deleteDialog: false,
                deleteCandidate: null,
                uniqueListKey: this.$uuid.v4(),
            };
        },
        methods: {
            mounted: function () {
                axios.get(
                    this.reportListURL, {
                        headers: {}, params: {},
                    }
                ).then(response => {
                    this.reports = response.data.results;
                }).catch(error => {
                    this.reports = [];
                    new ErrorWrapper(error)
                }).finally(() => {
                });
            },
            gotoNewReport: function () {
                this.$router.push({
                    name: 'CreateReport',
                    params: {}
                });
            },
            viewReport: function (report) {
                this.$router.push({
                    name: 'ViewReport',
                    params: {
                        contentID: report.key
                    }
                });
            },
            editReport: function (report) {
                this.$router.push({
                    name: 'UpdateReport',
                    params: {
                        contentID: report.key
                    }
                });
            },
            showDeleteConsent: function (item) {
                this.deleteDialog = true;
                this.deleteCandidate = item;
            },
            hideDeleteDialog: function (item) {
                this.deleteDialog = false;
                this.deleteCandidate = null;
            },
            disableReport: function () {
                this.deleteDialog = false;
                if (this.deleteCandidate !== null) {
                    axios.put(
                        this.reportDisableURL + this.deleteCandidate.key + '/', {
                            headers: {}, params: {}
                        }
                    ).then(response => {
                        if(response.data.success) {
                            this.$notify({
                                type: 'success',
                                title: 'Delete Done!',
                                text: 'Item deleted successfully.',
                                duration: 3000,
                                speed: 1000,
                                data: {}
                            });
                            this.mounted();
						} else {
                            this.$notify({
                                type: 'error',
                                title: 'Delete Failed!',
                                text: 'Item deletion failed.',
                                duration: 3000,
                                speed: 1000,
                                data: {}
                            });
						}
                    }).catch(error => {
                        this.$notify({
                            type: 'error',
                            title: 'Delete Failed!',
                            text: 'Item deletion failed.',
                            duration: 3000,
                            speed: 1000,
                            data: {}
                        });
                        new ErrorWrapper(error);
                    }).finally(() => {
                        this.deleteCandidate = null;
                    });
                }
                this.deleteCandidate = null;
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
