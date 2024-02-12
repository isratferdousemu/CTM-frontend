const ManageAllotmentRoutes = [
    {
      path: '/allotment/list',
      name: 'ManageAllotment',
      component: () => import("../pages/ManageAllotment/Index.vue"),
    },

    {
        path: '/allotment/create',
        name: "CreateManageAllotment",
        component: () => import("../pages/ManageAllotment/CreateNew.vue")
    },

    {
        path: '/allotment/edit/:id',
        name: "EditManageAllotment",
        component: () => import("../pages/ManageAllotment/Edit.vue")
    },
      {
        path: '/allotment-setup',
        name: "EditManageSetup",
          component: () => import("../pages/ManageAllotment/AllotmentSetup/Index.vue")
    }
];

export default ManageAllotmentRoutes;
