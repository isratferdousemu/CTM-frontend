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
        path: "/beneficiary-management/switch_program",
        name: "beneficiary_list",
        meta: {
            requiresAuth: true,
            permission: "beneficiary-list",
        },
        component: () => import("../pages/BeneficiaryManagement/switch_program/Index.vue")
    },
    {
        path: "/beneficiary-management/beneficiary-card",
        name: "beneficiary_list",
        meta: {
            requiresAuth: true,
            permission: "beneficiary-list",
        },
        component: () => import("../pages/BeneficiaryManagement/beneficiary_list/Index.vue")
    },
];

export default BeneficiaryManagementRoutes;
