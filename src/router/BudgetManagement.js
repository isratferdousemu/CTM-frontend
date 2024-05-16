const BudgetManagementRoutes = [
  {
    path: '/budget',
    name: 'budget',
    meta: {
      requiresAuth: true,
      permission: 'budget-list',
    },
    component: () => import('../pages/BudgetManagement/Index.vue'),
  },
  // {
  //   path: "/budget/edit/:id",
  //   name: "budget_edit",
  //   meta: {
  //     requiresAuth: true,
  //     permission: "budget-edit",
  //   },
  //   component: () => import("../pages/BudgetManagement/Edit.vue")
  // },
  {
    path: '/budget/edit/:id',
    name: 'budget_edit',
    meta: {
      requiresAuth: true,
      permission: 'budget-edit',
    },
    component: () => import('../pages/BudgetManagement/EditNew.vue'),
  },
  {
    path: '/budget/detail/:id',
    name: 'budget_edit',
    meta: {
      requiresAuth: true,
      permission: 'budget-edit',
    },
    component: () => import('../pages/BudgetManagement/Details.vue'),
  },
  {
    path: '/budget/create',
    name: 'budget_create',
    meta: {
      requiresAuth: true,
      permission: 'budget-create',
    },
    component: () => import('../pages/BudgetManagement/Create.vue'),
  },
];

export default BudgetManagementRoutes;
