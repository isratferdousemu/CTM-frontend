const SystemConfigurationRoutes = [
  {
    path: "/system-configuration/division",
    name: "Division",
    component: () =>
      import(
        "../pages/SystemConfiguration/demographic_information/division/Index.vue"
      ),
  },

  {
    path: "/system-configuration/division/create",
    name: "CreateDivision",
    component: () =>
      import(
        "../pages/SystemConfiguration/demographic_information/division/Create.vue"
      ),
  },

  {
    path: "/system-configuration/division/edit/:id",
    name: "EditDivision",
    component: () =>
      import(
        "../pages/SystemConfiguration/demographic_information/division/Edit.vue"
      ),
  },

  {
    path: "/system-configuration/menu",
    name: "Menu",
    component: () => import("../pages/SystemConfiguration/menu/Index.vue"),
  },

  {
    path: "/system-configuration/menu/create",
    name: "CreateMenu",
    component: () => import("../pages/SystemConfiguration/menu/Create.vue"),
  },

  {
    path: "/system-configuration/menu/edit/:id",
    name: "EditMenu",
    component: () => import("../pages/SystemConfiguration/menu/Edit.vue"),
  },
];

export default SystemConfigurationRoutes;
