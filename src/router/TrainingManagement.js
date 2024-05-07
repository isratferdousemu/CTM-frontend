const TrainingManagementRoutes = [
  //   {
  //     path: '/login',
  //     name: 'Login',
  //     component: Login,
  //   },
  /*Trainer Info route start*/
  {
    path: "/training-management/trainer-information",
    name: "TrainerInformation",
    meta: {
      requiresAuth: true,
      permission: "trainerInfo-view",
    },
    component: () => import("../pages/TrainingManagement/TrainerInformation/Index.vue")
  },

  {
    path: "/training-management/trainer-information/create",
    name: "TrainerInformationCreate",
    meta: {
      requiresAuth: true,
      permission: "trainerInfo-create",
    },
    component: () => import("../pages/TrainingManagement/TrainerInformation/Create.vue")
  },

  {
    path: "/training-management/trainer-information/edit/:id",
    name: "trainerInfo-edit",
    meta: {
      requiresAuth: true,
      permission: "trainerInfo-edit",
    },
    component: () => import("../pages/TrainingManagement/TrainerInformation/Edit.vue")
  },
  {
    path: "/training-management/trainer-information/view/:id",
    name: "trainerInfo-view",
    meta: {
      requiresAuth: true,
      permission: "trainerInfo-view",
    },
    component: () => import("../pages/TrainingManagement/TrainerInformation/View.vue")
  },
  /*Trainer Info route end*/
];

export default TrainingManagementRoutes;
