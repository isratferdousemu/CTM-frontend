const ApplicationSelectionRoutes = [
  //   {
  //     path: '/login',
  //     name: 'Login',
  //     component: Login,
  //   },
  {
    path: "/application-management/application",
    name: "application-list",
    meta: {
      requiresAuth: true,
      permission: "application-entry-view",
    },
    component: () => import("../pages/ApplicationSelection/application_list/Index.vue")
  },
  {
    path: "/application-management/poverty-cut-off-score/",
    name: "selection_list",
    meta: {
      requiresAuth: true,
      permission: "application-selection-list",
    },
    component: () => import("../pages/ApplicationSelection/PMTScoring/PovertyCutOff/Index.vue")
  },
  {
    path: "/application-management/district-fixed-effect/",
    name: "selection_list",
    meta: {
      requiresAuth: true,
      permission: "application-entry-view",
    },
    component: () => import("../pages/ApplicationSelection/PMTScoring/DistrictFixedEffect/Index.vue")
  },
  {
    path: "/application-management/variable/",
    name: "selection_list",
    meta: {
      requiresAuth: true,
      permission: "application-selection-list",
    },
    component: () => import("../pages/ApplicationSelection/PMTScoring/Variable/Index.vue")
  },
  {
    path: "/application-management/sub-variable/",
    name: "selection_list",
    meta: {
      requiresAuth: true,
      permission: "application-selection-list",
    },
    component: () => import("../pages/ApplicationSelection/PMTScoring/SubVariable/Index.vue")
  },
];

export default ApplicationSelectionRoutes;
