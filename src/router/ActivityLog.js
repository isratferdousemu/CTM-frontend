const ActivityLogRoutes = [
    {
        path: "/activity-logs",
        name: "activityLog",
        meta: {
            requiresAuth: true,
            permission: "activity_log-list",
        },
        component: () => import("../pages/ActivityLog/Index.vue")
    },
    {
        path: "/activity-logs/view/:id",
        name: "activityLogView",
        meta: {
            requiresAuth: true,
            permission: "activity_log-view",
        },
        component: () => import("../pages/ActivityLog/View.vue")
    }
];

export default ActivityLogRoutes;
