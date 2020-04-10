import VueRouter from "vue-router";
import BuildReport from "@/application/views/report/BuildReport";
import ApplicationBase from "@/application/views/ApplicationBase";

let applicationPages = {
    path: "/",
    name: "ApplicationBase",
    component: ApplicationBase,
    redirect: '/build-report/create',
    children: [
        {
            path: "/build-report/create",
            name: "BuildReport",
            component: BuildReport,
            meta: {},
        },
        {
            path: "/build-report/update/:contentID/",
            name: "BuildReport",
            component: BuildReport,
            meta: {},
        },
    ],
    meta: {},
};

const routes = [
    applicationPages,
];

let router = new VueRouter({
    routes: routes,
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