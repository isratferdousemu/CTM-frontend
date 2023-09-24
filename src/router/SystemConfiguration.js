const SystemConfigurationRoutes = [
  {
    path: "/system-configuration/division",
    name: "Division",
    meta: {
      requiresAuth: true,
      permission: "common",
    },
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
];

export default SystemConfigurationRoutes;
