import Vue from 'vue';
import VueRouter from "vue-router";
import Application from './Application.vue'
import router from "./routes/application-router";
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

Vue.use(VueRouter);

new Vue({
    vuetify,
    render: h => h(Application),
    router,
}).$mount('#application');