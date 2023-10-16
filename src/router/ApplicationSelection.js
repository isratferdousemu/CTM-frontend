const ApplicationSelectionRoutes = [
  //   {
  //     path: '/login',
  //     name: 'Login',
  //     component: Login,
  //   },
  {
    path: "/application-management/primary-selection-upazila",
    name: "selection_list",
    meta: {
      requiresAuth: true,
      permission: "application-selection-list",
    },
    component: () => import("../pages/ApplicationSelection/application_list/Index.vue")
  },
  {
    path: "/application-management/division-cut-off-score/",
    name: "selection_list",
    meta: {
      requiresAuth: true,
      permission: "application-selection-list",
    },
    component: () => import("../pages/ApplicationSelection/PMTScoring/Division/Index.vue")
  },
  {
    path: "/application-management/district-cut-off-score/",
    name: "selection_list",
    meta: {
      requiresAuth: true,
      permission: "application-selection-list",
    },
    component: () => import("../pages/ApplicationSelection/PMTScoring/District/Index.vue")
  },
];

export default ApplicationSelectionRoutes;
