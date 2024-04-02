const TrainingManagementRoutes = [
  //   {
  //     path: '/login',
  //     name: 'Login',
  //     component: Login,
  //   },
  /*Device Registration route start*/
  {
    path: "/training-management/trainer-information",
    name: "TrainerInformation",
    meta: {
      requiresAuth: true,
      permission: "trainer-info-view",
    },
    component: () => import("../pages/TrainingManagement/TrainerInformation/Index.vue")
  },

  {
    path: "/training-management/trainer-information/create",
    name: "TrainerInformationCreate",
    meta: {
      requiresAuth: true,
      permission: "trainer-info-create",
    },
    component: () => import("../pages/TrainingManagement/TrainerInformation/Create.vue")
  },

  {
    path: "/system-configuration/device_registration/edit/:id",
    name: "DeviceRegistrationEdit",
    meta: {
      requiresAuth: true,
      permission: "device-registration-edit",
    },
    component: () => import("../pages/SystemConfiguration/device_registration/Edit.vue")
  },
  /*Device Registration route end*/
];

export default TrainingManagementRoutes;
