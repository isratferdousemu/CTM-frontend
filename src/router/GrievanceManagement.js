const GrievanceManagementRoutes = [
  {
    path: "/grievance/dashboard",
    name: "grievanceDashboard",
    meta: {
      requiresAuth: true,
      permission: "grievanceDashboard-view",
    },
    component: () => import("../pages/GrievanceManagement/Dashboard/Index.vue"),
  },
  {
    path: "/grievance-management/type",
    name: "grievanceType",
    meta: {
      requiresAuth: true,
      permission: "grievanceType-view",
    },
    component: () =>
      import("../pages/GrievanceManagement/GrievanceType/index.vue"),
  },
  {
    path: "/grievance-management/settings",
    name: "GrievanceSettings",
    meta: {
      requiresAuth: true,
      permission: "grievance-setting",
    },
    component: () =>
      import("../pages/GrievanceManagement/GrievanceSettings/index.vue"),
  },
  {
    path: "/grievance-management/subject",
    name: "GrievanceTypeSubject",
    meta: {
      requiresAuth: true,
      permission: "grievanceSubject-view",
    },
    component: () =>
      import("../pages/GrievanceManagement/GrievaneSubject/index.vue"),
  },

  {
    path: "/grievance-management/grievance-list",
    name: "GrievanceList",
    meta: {
      requiresAuth: true,
      permission: "grievanceList-view",
    },
    component: () => import("../pages/GrievanceManagement/index.vue"),
  },
];

export default GrievanceManagementRoutes;
