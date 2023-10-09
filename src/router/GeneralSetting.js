const CommonRoutes = [
  {
    path: "/general-setting",
    name: "GeneralSetting",
    meta: {
      requiresAuth: true,
      // permission: "union-list",
    },
    component: () =>
      import(
        "../pages/GeneralSetting/Index.vue"
      ),
  },
]
export default CommonRoutes;
