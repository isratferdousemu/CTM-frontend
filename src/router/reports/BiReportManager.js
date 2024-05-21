const BiReportManagerRoutes = [
    {
        path: "/reports/bi-report",
        name: "Bireport",
        meta: {
            requiresAuth: true,
            permission: "bireport-view",
        },
        component: () => import("../../pages/MEReporting/Bireport")
    },
    {
        path: "/reports/bi-report/:id",
        name: "Bireport",
        meta: {
            requiresAuth: true,
            permission: "bireport-view",
        },
        component: () => import("../../pages/MEReporting/Bireport/view.vue")
    },

];

export default BiReportManagerRoutes;