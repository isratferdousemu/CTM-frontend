const BeneficiaryManagementRoutes = [
 
    {
        path: "/beneficiary-management/beneficiary-card",
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
            permission: "beneficiary-list",
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
];

export default BeneficiaryManagementRoutes;
