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
    {
        path: "/system-audit/grievance-tracking",
        name: "grievance-tracking",
        meta: {
            requiresAuth: true,
            permission: "grievance-tracking",
        },
        component: () => import("../pages/SystemAudit/GrievanceTracking/Index.vue")
    },
    {
        path: "/system-audit/payment-tracking",
        name: "payment-tracking",
        meta: {
            requiresAuth: true,
            permission: "payment-tracking",
        },
        component: () => import("../pages/SystemAudit/PaymentTracking/Index.vue")
    },
    {
        path: "/system-audit/activity-log",
        name: "activity-log",
        meta: {
            requiresAuth: true,
            permission: "activity-log",
        },
        component: () => import("../pages/SystemAudit/ActivityLog/Index.vue")
    },
];

export default SystemAuditRoutes;