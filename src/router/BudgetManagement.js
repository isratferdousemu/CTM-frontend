const BudgetManagementRoutes = [
  {
    path: '/budget/dashboard',
    name: 'dashboard',
    meta: {
      requiresAuth: true,
      permission: 'dashboard-view',
    },
    component: () => import('../pages/BudgetManagement/Dashboard/Index.vue'),
  },
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
    component: () => import('../pages/BudgetManagement/Details_V2.vue'),
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
