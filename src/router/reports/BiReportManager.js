const BiReportManagerRoutes = [
    {
        path: "/reports/bi-report",
        name: "biReport",
        meta: {
            requiresAuth: true,
            permission: "activityLog-view",
        },
        component: () => import("../../pages/MEReporting/Bireport")
    },

];

export default BiReportManagerRoutes;