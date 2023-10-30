const SystemAuditRoutes = [
    {
        path: "/system-audit/application-tracking",
        name: "application-tracking",
        meta: {
            requiresAuth: true,
            permission: "application-tracking",
        },
        component: () => import("../pages/SystemAudit/ApplicationTracking/Index.vue")
    },
];

export default SystemAuditRoutes;