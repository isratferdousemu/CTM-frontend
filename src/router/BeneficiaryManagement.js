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
];

export default BeneficiaryManagementRoutes;
