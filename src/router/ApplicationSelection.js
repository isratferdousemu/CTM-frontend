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
];

export default ApplicationSelectionRoutes;
