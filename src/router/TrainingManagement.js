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
  /*Training Circular  route start*/
  {
    path: "/training-management/trainer-circular",
    name: "TrainerInformation",
    meta: {
      requiresAuth: true,
      permission: "trainerCircular-view",
    },
    component: () => import("../pages/TrainingManagement/TrainingCircular/Index.vue")
  },

  {
    path: "/training-management/trainer-circular/create",
    name: "TrainerInformationCreate",
    meta: {
      requiresAuth: true,
      permission: "trainerCircular-create",
    },
    component: () => import("../pages/TrainingManagement/TrainingCircular/Create.vue")
  },

  {
    path: "/training-management/trainer-circular/edit/:id",
    name: "trainerInfo-edit",
    meta: {
      requiresAuth: true,
      permission: "trainerCircular-edit",
    },
    component: () => import("../pages/TrainingManagement/TrainingCircular/Edit.vue")
  },
  {
    path: "/training-management/trainer-circular/view/:id",
    name: "trainerInfo-view",
    meta: {
      requiresAuth: true,
      permission: "trainerCircular-view",
    },
    component: () => import("../pages/TrainingManagement/TrainingCircular/View.vue")
  },
  {
    path: "/training-management/time-slots",
    name: "timeSlot-view",
    meta: {
      requiresAuth: true,
      permission: "timeSlot-view",
    },
    component: () => import("../pages/TrainingManagement/TimeSlot/Index.vue")
  },
  /*Training Circular route end*/
];

export default TrainingManagementRoutes;
