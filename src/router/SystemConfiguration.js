const SystemConfigurationRoutes = [
  {
    path: "/system-configuration/division",
    name: "Division",
    meta: {
 
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
  {
    path: "/system-configuration/thana",
    name: "Thana",
    meta: {
    
    },
    component: () =>
      import(
        "../pages/SystemConfiguration/demographic_information/thana/Index.vue"
      ),
  },
  {
    path: "/system-configuration/thana/create",
    name: "CreateThana",
    component: () =>
      import(
        "../pages/SystemConfiguration/demographic_information/thana/Create.vue"
      ),
  },
  {
    path: "/system-configuration/thana/edit/:id",
    name: "EditThana",
    component: () =>
      import(
        "../pages/SystemConfiguration/demographic_information/thana/Edit.vue"
      ),
  },

  
 

];

export default SystemConfigurationRoutes;
