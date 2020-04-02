import VueRouter from "vue-router";
import ApplicationBase from '@/application/views/ApplicationBase.vue';

let applicationPages = {
    path: "/",
    name: "ApplicationBase",
    component: ApplicationBase,
    children: [
    ],
    meta: {
    },
};

const routes = [
    applicationPages,
];

let router = new VueRouter({
    routes: routes,
    // mode: 'history',
    saveScrollPosition: true,
    history: true,
    linkExactActiveClass: "nav-item active",
    scrollBehavior: to => {
        if (to.hash) {
            return {selector: to.hash};
        } else {
            return {x: 0, y: 0};
        }
    }
});

export default router;