const GrievanceManagementRoutes = [
  {
    path: "/grievance-management/type",
    name: "GrievanceTypeListView",
    meta: {
      requiresAuth: true,
      Permission: "type-list",
    },
    component: () =>
      import("../pages/GrievanceManagement/GrievanceType/index.vue"),
  },
  {
    path: "grievance-management/settings",
    name: "GrievanceSettings",
    meta: {
      requiresAuth: true,
      Permission: "grievance-settings",
    },
    component: () =>
      import("../pages/GrievanceManagement/GrievanceSettings/index.vue"),
  },
  {
    path: "/grievance-management/subject",
    name: "GrievanceTypeSubject",
    meta: {
      requiresAuth: true,
      Permission: "subject-list",
    },
    component: () =>
      import("../pages/GrievanceManagement/GrievaneSubject/index.vue"),
  },
];

export default GrievanceManagementRoutes;
