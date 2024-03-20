const ActivityLogRoutes = [
    {
        path: "/activity-logs",
        name: "activityLog",
        meta: {
            requiresAuth: true,
            permission: "activity_log-list",
        },
        component: () => import("../pages/ActivityLog/Index.vue")
    }
];

export default ActivityLogRoutes;
