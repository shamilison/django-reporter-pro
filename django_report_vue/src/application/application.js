import Vue from 'vue';
import UUID from 'vue-uuid';
import VueRouter from "vue-router";
import Application from './Application.vue'
import router from "./routes/application-router";
import CustomFilters from '@/plugins/filters';
import VueLodash from 'vue-lodash';
import lodash from 'lodash';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import vuetify from './plugins/vuetify';
import Notifications from 'vue-notification';
import HighChartsVue from 'highcharts-vue';

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(UUID);
Vue.use(CustomFilters)
Vue.use(VueLodash, { name: '$lodash' , lodash: lodash })
Vue.use(Notifications);
Vue.use(HighChartsVue);


new Vue({
    vuetify,
    render: h => h(Application),
    router,
}).$mount('#application');