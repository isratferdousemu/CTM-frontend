const BeneficiaryManagementRoutes = [
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
