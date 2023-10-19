const BeneficiaryManagementRoutes = [
 
    {
        path: "/beneficiary-management/committee",
        name: "Committee-List",
        meta: {
          requiresAuth: true,
          permission: "thana-list",
        },
        component: () =>
          import(
            "../pages/BeneficiaryManagement/CommitteeManagement/Index.vue"
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
          import(
            "../pages/BeneficiaryManagement/CommitteeManagement/Create.vue"
          ),
      },
    {
        path: "/beneficiary-management/committee/edit/:id",
        name: "Committee-Edit",
        meta: {
          requiresAuth: true,
          permission: "thana-list",
        },
        component: () =>
          import(
            "../pages/BeneficiaryManagement/CommitteeManagement/Edit.vue"
          ),
      },

    {
      path: "/beneficiary-management/beneficiary-info",
        name: "beneficiary_list",
        meta: {
            requiresAuth: true,
            permission: "beneficiary-list",
        },
        component: () => import("../pages/BeneficiaryManagement/beneficiary_list/Index.vue")
    },
    {
        path: "/beneficiary-management/switch-program",
        name: "beneficiary_list",
        meta: {
            requiresAuth: true,
            permission: "beneficiary-list",
        },
        component: () => import("../pages/BeneficiaryManagement/beneficiary_list/SwitchProgram.vue")
    },
    {
        path: "/beneficiary-management/beneficiary-replacement",
        name: "beneficiary_replacement",
        meta: {
            requiresAuth: true,
          permission: "beneficiary-replacement",
        },
        component: () => import("../pages/BeneficiaryManagement/beneficiary_list/BeneficiaryReplacement.vue")
    },
    {
        path: "/beneficiary-management/beneficiary-journey",
        name: "beneficiary_journey",
        meta: {
            requiresAuth: true,
            permission: "beneficiary-list",
        },
        component: () => import("../pages/BeneficiaryManagement/beneficiary_list/BeneficiaryHistory.vue")
    },
  {
    path: "/beneficiary-management/information-tracking",
    name: "information-tracking",
    meta: {
      requiresAuth: true,
      permission: "information-tracking",
    },
    component: () => import("../pages/BeneficiaryManagement/beneficiary_list/InformationTracking.vue")
  },
  {
    path: "/beneficiary-management/beneficiary-card",
    name: "beneficiary-card",
    meta: {
      requiresAuth: true,
      permission: "beneficiary-list",
    },
    component: () => import("../pages/BeneficiaryManagement/DigitalIDCard/DigitalIDCard.vue")
  },
];

export default BeneficiaryManagementRoutes;
