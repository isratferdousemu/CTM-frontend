const ManageAllotmentRoutes = [
  {
    path: '/allotment',
    name: 'ManageAllotment',
    component: () => import('../pages/ManageAllotment/Index_V2.vue'),
  },

  {
    path: '/allotment/create',
    name: 'CreateManageAllotment',
    component: () => import('../pages/ManageAllotment/CreateNew.vue'),
  },

  {
    path: '/allotment/edit/:id',
    name: 'EditManageAllotment',
    component: () => import('../pages/ManageAllotment/Edit.vue'),
  },
  {
    path: '/allotment/detail/:id',
    name: 'budget_edit',
    meta: {
      requiresAuth: true,
      permission: 'allotment-edit',
    },
    component: () => import('../pages/ManageAllotment/Details.vue'),
  },
  {
    path: '/allotment-setup',
    name: 'EditManageSetup',
    component: () =>
      import('../pages/ManageAllotment/AllotmentSetup/Index.vue'),
  },
];

export default ManageAllotmentRoutes;
