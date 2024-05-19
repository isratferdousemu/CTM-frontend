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
    path: "/training-management/training-circular",
    name: "trainingCircular",
    meta: {
      requiresAuth: true,
      permission: "trainingCircular-view",
    },
    component: () => import("../pages/TrainingManagement/TrainingCircular/Index.vue")
  },

  {
    path: "/training-management/training-circular/create",
    name: "trainingCircularCreate",
    meta: {
      requiresAuth: true,
      permission: "trainingCircular-create",
    },
    component: () => import("../pages/TrainingManagement/TrainingCircular/Create.vue")
  },

  {
    path: "/training-management/training-circular/edit/:id",
    name: "trainingCircularEdit",
    meta: {
      requiresAuth: true,
      permission: "trainingCircular-edit",
    },
    component: () => import("../pages/TrainingManagement/TrainingCircular/Edit.vue")
  },
  {
    path: "/training-management/training-circular/view/:id",
    name: "trainingCircularView",
    meta: {
      requiresAuth: true,
      permission: "trainingCircular-view",
    },
    component: () => import("../pages/TrainingManagement/TrainingCircular/View.vue")
  },

  /*Training Circular route end*/
  {
    path: "/training-management/time-slots",
    name: "timeSlot-view",
    meta: {
      requiresAuth: true,
      permission: "timeSlot-view",
    },
    component: () => import("../pages/TrainingManagement/TimeSlot/Index.vue")
  },
  /*Time Slot route end*/
  /*Training Program  route start*/
  {
    path: "/training-management/training-program",
    name: "TrainingProgram",
    meta: {
      requiresAuth: true,
      permission: "trainingProgram-view",
    },
    component: () => import("../pages/TrainingManagement/TrainingProgram/Index.vue")
  },

  {
    path: "/training-management/training-program/create",
    name: "TrainingProgramCreate",
    meta: {
      requiresAuth: true,
      permission: "trainingProgram-create",
    },
    component: () => import("../pages/TrainingManagement/TrainingProgram/Create.vue")
  },

  {
    path: "/training-management/training-program/edit/:id",
    name: "TrainingProgramEdit",
    meta: {
      requiresAuth: true,
      permission: "trainingProgram-edit",
    },
    component: () => import("../pages/TrainingManagement/TrainingProgram/Edit.vue")
  },
  {
    path: "/training-management/training-program/view/:id",
    name: "TrainingProgramView",
    meta: {
      requiresAuth: true,
      permission: "trainingProgram-view",
    },
    component: () => import("../pages/TrainingManagement/TrainingProgram/View.vue")
  },

  /*Training Program route end*/
];

export default TrainingManagementRoutes;
