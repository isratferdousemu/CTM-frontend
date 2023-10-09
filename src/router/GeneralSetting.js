const CommonRoutes = [
  {
    path: "/setting/general",
    name: "GeneralSetting",
    meta: { 
      requiresAuth: true,
      permission: "general-setting-view",
    },
    component: () =>
      import(
        "../pages/GeneralSetting/Index.vue"
      ),
  }
]
export default CommonRoutes;
