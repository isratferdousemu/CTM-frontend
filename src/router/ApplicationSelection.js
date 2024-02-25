const ApplicationSelectionRoutes = [
  //   {
  //     path: '/login',
  //     name: 'Login',
  //     component: Login,
  //   },

  {
    path: "/application-management/dashboard",
    name: "application-dashboard",
    meta: {
      requiresAuth: true,
      permission: "application-dashboard",
    },
    component: () => import("../pages/ApplicationSelection/Dashboard/Index.vue")
  },
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
    path: "/application-selection/application-view/:id",
    name: "application-list",
    meta: {
      requiresAuth: true,
      permission: "application-entry-view",
    },
    component: () => import("../pages/ApplicationSelection/application_list/application_view.vue")
  },
  
  {
    path: "/application-management/poverty-cut-off-score/create",
    name: "selection_list",
    meta: {
      requiresAuth: true,
      permission: "poverty-cut-off-score-create",
    },
    component: () => import("../pages/ApplicationSelection/PMTScoring/PovertyCutOff/Create.vue")
  },
  {
    path: "/application-management/poverty-cut-off-score/edit/:param1/:param2",
    name: "edit_cutoff",
    meta: {
      requiresAuth: true,
      permission: "poverty-cut-off-score-edit",
    },
    component: () => import("../pages/ApplicationSelection/PMTScoring/PovertyCutOff/Edit.vue")
  },
  {
    path: "/application-management/poverty-cut-off-score",
    name: "selection_list",
    meta: {
      requiresAuth: true,
      permission: "poverty-cut-off-score-view",
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
      permission: "variable-view",
    },
    component: () => import("../pages/ApplicationSelection/PMTScoring/Variable/Index_v1.vue")
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
  {
    path: "/application-management/mobile-operator/",
    name: "mobile-operator",
    meta: {
      requiresAuth: true,
      permission: "application-selection-list",
    },
    component: () => import("../pages/ApplicationSelection/MobileOperator/Index.vue")
  },
];

export default ApplicationSelectionRoutes;
