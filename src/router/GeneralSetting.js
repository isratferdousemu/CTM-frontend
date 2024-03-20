const CommonRoutes = [
  {
    path: "/setting/general",
    name: "GeneralSetting",
    meta: { 
      requiresAuth: true,
      permission: "generalSetting-view",
    },
    component: () =>
      import(
        "../pages/GeneralSetting/Index.vue"
      ),
  }
]
export default CommonRoutes;
