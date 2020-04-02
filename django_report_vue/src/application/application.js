import Vue from 'vue';
import VueRouter from "vue-router";
import Application from './Application.vue'
import router from "./routes/application-router";

Vue.config.productionTip = false;

Vue.use(VueRouter);

new Vue({
    render: h => h(Application),
    store,
    router,
}).$mount('#application');