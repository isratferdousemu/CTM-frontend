const BeneficiaryManagementRoutes = [
  {
    path: "/beneficiary-management/committee",
    name: "Committee-List",
    meta: {
      requiresAuth: true,
      permission: "thana-list",
    },
    component: () =>
      import("../pages/BeneficiaryManagement/CommitteeManagement/Index.vue"),
  },
  {
    path: "/beneficiary-management/committee-permission",
    name: "Committee-Permission",
    meta: {
      requiresAuth: true,
      permission: "thana-list",
    },
    component: () =>
      import(
        "../pages/BeneficiaryManagement/CommitteeManagement/CommitteePermission/Index.vue"
      ),
  },
  {
    path: "/beneficiary-management/committee/create",
    name: "Committee-Create",
    meta: {
      requiresAuth: true,
      permission: "thana-list",
    },
    component: () =>
      import("../pages/BeneficiaryManagement/CommitteeManagement/Create.vue"),
  },
  {
    path: "/beneficiary-management/committee/edit/:id",
    name: "Committee-Edit",
    meta: {
      requiresAuth: true,
      permission: "thana-list",
    },
    component: () =>
      import("../pages/BeneficiaryManagement/CommitteeManagement/Edit.vue"),
  },
  {
    path: "/beneficiary-management/beneficiary-info",
    name: "Beneficiary_List",
    meta: {
      requiresAuth: true,
      permission: "beneficiary-list",
    },
    component: () =>
      import("../pages/BeneficiaryManagement/beneficiary_list/Index.vue"),
  },
  {
    path: "/beneficiary-management/beneficiary-info-active",
    name: "Beneficiary_List_Active",
    meta: {
      requiresAuth: true,
      permission: "beneficiary-list-active",
    },
    component: () =>
      import(
        "../pages/BeneficiaryManagement/beneficiary_list/BeneficiaryActiveList.vue"
      ),
  },
  {
    path: "/beneficiary-management/beneficiary-info-inactive",
    name: "Beneficiary_List_Inactive",
    meta: {
      requiresAuth: true,
      permission: "beneficiary-list-inactive",
    },
    component: () =>
      import(
        "../pages/BeneficiaryManagement/beneficiary_list/BeneficiaryInactiveList.vue"
      ),
  },
  {
    path: "/beneficiary-management/beneficiary-info-waiting",
    name: "Beneficiary_List_Waiting",
    meta: {
      requiresAuth: true,
      permission: "beneficiary-list-waiting",
    },
    component: () =>
      import(
        "../pages/BeneficiaryManagement/beneficiary_list/BeneficiaryWaitinglList.vue"
      ),
  },
  {
    path: "/beneficiary-management/beneficiary-info-delete",
    name: "Beneficiary_List_Delete",
    meta: {
      requiresAuth: true,
      permission: "beneficiary-list-delete",
    },
    component: () =>
      import(
        "../pages/BeneficiaryManagement/beneficiary_list/BeneficiaryDeleteList.vue"
      ),
  },
  {
    path: "/beneficiary-management/beneficiary-info/details/:id",
    name: "beneficiary_details",
    meta: {
      requiresAuth: true,
      permission: "beneficiary-list",
    },
    component: () =>
      import(
        "../pages/BeneficiaryManagement/beneficiary_list/BeneficiaeyDetails_V2.vue"
      ),
  },
  {
    path: "/beneficiary-management/beneficiary-info/edit/:id",
    name: "beneficiary_edit",
    meta: {
      requiresAuth: true,
      permission: "beneficiary-list",
    },
    component: () =>
      import(
        "../pages/BeneficiaryManagement/beneficiary_list/BeneficiaryEdit.vue"
      ),
  },
  {
    path: "/beneficiary-management/dashboard",
    name: "Beneficiary_Dashboard",
    meta: {
      requiresAuth: true,
      permission: "beneficiary-dashboard",
    },
    component: () =>
      import(
        "../pages/BeneficiaryManagement/BeneficiaryDashboard/Dashboard.vue"
      ),
  },
  // {
  //     path: "/beneficiary-management/switch-program",
  //     name: "beneficiary_list",
  //     meta: {
  //         requiresAuth: true,
  //         permission: "beneficiary-list",
  //     },
  //     component: () => import("../pages/BeneficiaryManagement/beneficiary_list/SwitchProgram.vue")
  // },
  {
    path: "/beneficiary-management/beneficiary-replacement-list",
    name: "beneficiary_replacement_list",
    meta: {
      requiresAuth: true,
      permission: "beneficiary-replacement-list",
    },
    component: () =>
      import("../pages/BeneficiaryManagement/BeneficiaryReplacement/Index.vue"),
  },
  {
    path: "/beneficiary-management/beneficiary-replacement/:id",
    name: "beneficiary_replacement",
    meta: {
      requiresAuth: true,
      permission: "beneficiary-replacement",
    },
    component: () =>
      import(
        "../pages/BeneficiaryManagement/beneficiary_list/BeneficiaryReplacement.vue"
      ),
  },
  {
    path: "/beneficiary-management/beneficiary-journey/:id",
    name: "beneficiary_journey",
    meta: {
      requiresAuth: true,
      permission: "beneficiary-journey",
    },
    component: () =>
      import(
        "../pages/BeneficiaryManagement/beneficiary_list/BeneficiaryHistory.vue"
      ),
  },
  {
    path: "/beneficiary-management/information-tracking",
    name: "information-tracking",
    meta: {
      requiresAuth: true,
      permission: "information-tracking",
    },
    component: () =>
      import(
        "../pages/BeneficiaryManagement/beneficiary_list/InformationTracking.vue"
      ),
  },
  {
    path: "/beneficiary-management/beneficiary-card",
    name: "beneficiary-card",
    meta: {
      requiresAuth: true,
      permission: "beneficiary-card",
    },
    component: () =>
      import("../pages/BeneficiaryManagement/DigitalIDCard/IndexNew.vue"),
  },
  {
    path: "/beneficiary-management/digital-id-card/:id",
    name: "digital-id-card",
    meta: {
      requiresAuth: true,
      permission: "digital-id-card",
    },
    component: () =>
      import(
        "../pages/BeneficiaryManagement/DigitalIDCard/DigitalIDCardV3.vue"
      ),
  },
  {
    path: "/beneficiary-management/digital-id/:id",
    name: "digital-id-card",
    meta: {
      requiresAuth: true,
      permission: "digital-id-card",
    },
    component: () =>
      import("../pages/BeneficiaryManagement/DigitalIDCard/DigitalIDCard.vue"),
  },
  {
    path: "/beneficiary-management/beneficiary-exit-list",
    name: "beneficiary_exit_list",
    meta: {
      requiresAuth: true,
      permission: "beneficiary-exit-list",
    },
    component: () =>
      import("../pages/BeneficiaryManagement/BeneficiaryExit/ExitList.vue"),
  },
  {
    path: "/beneficiary-management/beneficiary-exit",
    name: "beneficiary-exit",
    meta: {
      requiresAuth: true,
      permission: "beneficiary-exit",
    },
    component: () =>
      import("../pages/BeneficiaryManagement/BeneficiaryExit/Index.vue"),
  },
  {
    path: "/beneficiary-management/beneficiary-shifting",
    name: "beneficiary-shifting",
    meta: {
      requiresAuth: true,
      permission: "beneficiary-shifting",
    },
    component: () =>
      import("../pages/BeneficiaryManagement/BeneficiaryShifting/Index.vue"),
  },
  {
    path: "/beneficiary-management/beneficiary-shifting-list",
    name: "beneficiary_shifting_list",
    meta: {
      requiresAuth: true,
      permission: "beneficiary-shifting-list",
    },
    component: () =>
      import(
        "../pages/BeneficiaryManagement/BeneficiaryShifting/ShiftingList.vue"
      ),
  },
  {
    path: "/beneficiary-management/beneficiary-location-shifting",
    name: "beneficiary-location-shifting",
    meta: {
      requiresAuth: true,
      permission: "beneficiary-location.shifting",
    },
    component: () =>
      import(
        "../pages/BeneficiaryManagement/BeneficiaryShifting/LocationShifting/Index.vue"
      ),
  },
  {
    path: "/beneficiary-management/beneficiary-location-shifting-list",
    name: "beneficiary_location_shifting_list",
    meta: {
      requiresAuth: true,
      permission: "beneficiary-shifting-list",
    },
    component: () =>
      import(
        "../pages/BeneficiaryManagement/BeneficiaryShifting/LocationShifting/LocationShiftingList.vue"
      ),
  },
];

export default BeneficiaryManagementRoutes;
