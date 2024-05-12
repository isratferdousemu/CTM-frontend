const BudgetManagementRoutes = [
  {
    path: "/budget",
    name: "budget",
    meta: {
      requiresAuth: true,
      permission: "budget-list",
    },
    component: () => import("../pages/BudgetManagement/Index.vue")
  },
  {
    path: "/budget/list",
    name: "budget_list",
    meta: {
      requiresAuth: true,
      permission: "budget-list",
    },
    component: () => import("../pages/BudgetManagement/Index.vue")
  },
  {
    path: "/budget/create",
    name: "budget_create",
    meta: {
      requiresAuth: true,
      permission: "budget-create",
    },
    component: () => import("../pages/BudgetManagement/Create.vue")
  },
];

export default BudgetManagementRoutes;
