const BudgetManagementRoutes = [
  {
    path: "/budget",
    name: "budget",
    meta: {
      requiresAuth: true,
      permission: "budget-list",
    },
    component: () => import("../pages/SystemConfiguration/user_management/users/index.vue")
  },
];

export default BudgetManagementRoutes;
