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
      requiresAuth: true,
      permission: "common",
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
      requiresAuth: true,
      permission: "common",
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
      requiresAuth: true,
      permission: "common",
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
    meta: {
      requiresAuth: true,
      permission: "common",
    },
    component: () => import("../pages/SystemConfiguration/menu/Index.vue"),
  },

  {
    path: "/system-configuration/menu/create",
    name: "CreateMenu",
    meta: {
      requiresAuth: true,
      permission: "common",
    },
    component: () => import("../pages/SystemConfiguration/menu/Create.vue"),
  },

  {
    path: "/system-configuration/menu/edit/:id",
    name: "EditMenu",
    meta: {
      requiresAuth: true,
      permission: "common",
    },
    component: () => import("../pages/SystemConfiguration/menu/Edit.vue"),
  },
    /*Menu route end*/

    /*Device Registration route start*/
  {
    path: "/system-configuration/device_registration",
    name: "DeviceRegistration",
    meta: {
      requiresAuth: true,
      permission: "common",
    },
    component: () => import("../pages/SystemConfiguration/device_registration/Index.vue")
  },

  {
    path: "/system-configuration/device_registration/create",
    name: "DeviceRegistrationCreate",
    meta: {
      requiresAuth: true,
      permission: "common",
    },
    component: () => import("../pages/SystemConfiguration/device_registration/Create.vue")
  },

  {
    path: "/system-configuration/device_registration/edit/:id",
    name: "DeviceRegistrationEdit",
    meta: {
      requiresAuth: true,
      permission: "common",
    },
    component: () => import("../pages/SystemConfiguration/device_registration/Edit.vue")
  },
    /*Device Registration route end*/

    /*Office information route start*/
  {
    path: "/system-configuration/office_information",
    name: "OfficeInformation",
    meta: {
      requiresAuth: true,
      permission: "common",
    },
    component: () => import("../pages/SystemConfiguration/office_information/Index.vue")
  },
  {
    path: "/system-configuration/office_information/create",
    name: "OfficeInformationCreate",
    meta: {
      requiresAuth: true,
      permission: "common",
    },
    component: () => import("../pages/SystemConfiguration/office_information/Create.vue")
  },
  {
    path: "/system-configuration/office_information/edit/:id",
    name: "OfficeInformationEdit",
    meta: {
      requiresAuth: true,
      permission: "common",
    },
    component: () => import("../pages/SystemConfiguration/office_information/Edit.vue")
  },
    /*Office information route end*/

    /*user management/role route start*/
  {
    path: "/system-configuration/role",
    name: "Role",
    meta: {
      requiresAuth: true,
      permission: "common",
    },
    component: () => import("../pages/SystemConfiguration/user_management/roles/Index.vue")
  },
  {
    path: "/system-configuration/role/create",
    name: "RoleCreate",
    meta: {
      requiresAuth: true,
      permission: "common",
    },
    component: () => import("../pages/SystemConfiguration/user_management/roles/Create.vue")
  },
  {
    path: "/system-configuration/role/edit/:id",
    name: "RoleEdit",
    meta: {
      requiresAuth: true,
      permission: "common",
    },
    component: () => import("../pages/SystemConfiguration/user_management/roles/Edit.vue")
  },
    /*user management/role route end*/

    /*user management/rolePermission route start*/
  {
    path: "/system-configuration/role-permission",
    name: "RolePermission",
    meta: {
      requiresAuth: true,
      permission: "common",
    },
    component: () => import("../pages/SystemConfiguration/user_management/role_permission/Index.vue")
  }
 
];

export default SystemConfigurationRoutes;
