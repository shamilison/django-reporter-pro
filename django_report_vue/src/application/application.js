import Vue from 'vue';
import UUID from 'vue-uuid';
import VueRouter from "vue-router";
import Application from './Application.vue'
import router from "./routes/application-router";
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import vuetify from './plugins/vuetify';
import HighChartsVue from 'highcharts-vue'

import Notifications from 'vue-notification';

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(UUID);
Vue.use(Notifications);
Vue.use(HighChartsVue)


new Vue({
    vuetify,
    render: h => h(Application),
    router,
}).$mount('#application');