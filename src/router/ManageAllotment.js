const ManageAllotmentRoutes = [
    {
      path: '/allotment',
      name: 'ManageAllotment',
      component: () => import("../pages/ManageAllotment/Index.vue"),
    },

    {
        path: '/allotment/create',
        name: "CreateManageAllotment",
        component: () => import("../pages/ManageAllotment/Create.vue")
    },

    {
        path: '/allotment/edit/:id',
        name: "EditManageAllotment",
        component: () => import("../pages/ManageAllotment/Edit.vue")
    }
];

export default ManageAllotmentRoutes;
