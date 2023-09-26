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
    path: "/system-configuration/district",
    name: "District",
    meta: {
      requiresAuth: true,
      permission: "common",
    },
    component: () =>
      import(
        "../pages/SystemConfiguration/demographic_information/district/Index.vue"
      ),
  },
  {
    path: "/system-configuration/city",
    name: "City",
    meta: {
      requiresAuth: true,
      permission: "common",
    },
    component: () =>
      import(
        "../pages/SystemConfiguration/demographic_information/city/Index.vue"
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
    path: "/system-configuration/union",
    name: "Thana",
    meta: {

    },
    component: () =>
      import(
        "../pages/SystemConfiguration/demographic_information/union/Index.vue"
      ),
  },
  {
    path: "/system-configuration/ward",
    name: "Thana",
    meta: {

    },
    component: () =>
      import(
        "../pages/SystemConfiguration/demographic_information/ward/Index.vue"
      ),
  },



    /*Menu route start*/
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
    /*Menu route end*/

    /*Device Registration route start*/
  {
    path: "/system-configuration/device_registration",
    name: "DeviceRegistration",
    component: () => import("../pages/SystemConfiguration/device_registration/Index.vue")
  },

  {
    path: "/system-configuration/device_registration/create",
    name: "DeviceRegistrationCreate",
    component: () => import("../pages/SystemConfiguration/device_registration/Create.vue")
  },

  {
    path: "/system-configuration/device_registration/edit/:id",
    name: "DeviceRegistrationEdit",
    component: () => import("../pages/SystemConfiguration/device_registration/Edit.vue")
  }
    /*Device Registration route end*/
];

export default SystemConfigurationRoutes;
