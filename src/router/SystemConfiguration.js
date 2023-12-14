const SystemConfigurationRoutes = [
  {
    path: "/system-configuration/division",
    name: "Division",
    meta: {
      requiresAuth: true,
      permission: "division-view",
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
      permission: "district-view",
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
      permission: "city-view",
    },
    component: () =>
      import(
        "../pages/SystemConfiguration/demographic_information/city/Index_V1.vue"
      ),
  },

  {
    path: "/system-configuration/thana",
    name: "Thana",
    meta: {
      requiresAuth: true,
      permission: "thana-view",
    },
    component: () =>
      import(
        "../pages/SystemConfiguration/demographic_information/thana/Index.vue"
      ),
  },
  {
    path: "/system-configuration/union",
    name: "Union",
    meta: {
      requiresAuth: true,
      permission: "union-view",
    },
    component: () =>
      import(
        "../pages/SystemConfiguration/demographic_information/union/Index_V1.vue"
      ),
  },
  {
    path: "/system-configuration/ward",
    name: "Ward",
    meta: {
      requiresAuth: true,
      permission: "ward-view",
    },
    component: () =>
      import(
        "../pages/SystemConfiguration/demographic_information/ward/Index_V1.vue"
      ),
  },



    /*Menu route start*/
  {
    path: "/system-configuration/menu",
    name: "Menu",
    meta: {
      requiresAuth: true,
      permission: "menu-view",
    },
    component: () => import("../pages/SystemConfiguration/menu/Index.vue"),
  },

  {
    path: "/system-configuration/menu/create",
    name: "CreateMenu",
    meta: {
      requiresAuth: true,
      permission: "menu-create",
    },
    component: () => import("../pages/SystemConfiguration/menu/Create.vue"),
  },

  {
    path: "/system-configuration/menu/edit/:id",
    name: "EditMenu",
    meta: {
      requiresAuth: true,
      permission: "menu-edit",
    },
    component: () => import("../pages/SystemConfiguration/menu/Edit.vue"),
  },
    /*Menu route end*/

    /*Device Registration route start*/
  {
    path: "/system-configuration/device-registration",
    name: "DeviceRegistration",
    meta: {
      requiresAuth: true,
      permission: "device-view",
    },
    component: () => import("../pages/SystemConfiguration/device_registration/Index.vue")
  },

  {
    path: "/system-configuration/device_registration/create",
    name: "DeviceRegistrationCreate",
    meta: {
      requiresAuth: true,
      permission: "device-create",
    },
    component: () => import("../pages/SystemConfiguration/device_registration/Create.vue")
  },

  {
    path: "/system-configuration/device_registration/edit/:id",
    name: "DeviceRegistrationEdit",
    meta: {
      requiresAuth: true,
      permission: "device-edit",
    },
    component: () => import("../pages/SystemConfiguration/device_registration/Edit.vue")
  },
    /*Device Registration route end*/

    /*Office information route start*/
  {
    path: "/system-configuration/office",
    name: "OfficeInformation",
    meta: {
      requiresAuth: true,
      permission: "office-view",
    },
    component: () => import("../pages/SystemConfiguration/office_information/Index.vue")
  },
  {
    path: "/system-configuration/office/create",
    name: "OfficeInformationCreate",
    meta: {
      requiresAuth: true,
      permission: "office-create",
    },
    component: () => import("../pages/SystemConfiguration/office_information/Create.vue")
  },
  {
    path: "/system-configuration/office/edit/:id",
    name: "OfficeInformationEdit",
    meta: {
      requiresAuth: true,
      permission: "office-edit",
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
      permission: "role-view",
    },
    component: () => import("../pages/SystemConfiguration/user_management/roles/Index.vue")
  },
  {
    path: "/system-configuration/role/create",
    name: "RoleCreate",
    meta: {
      requiresAuth: true,
      permission: "role-create",
    },
    component: () => import("../pages/SystemConfiguration/user_management/roles/Create.vue")
  },
  {
    path: "/system-configuration/role/edit/:id",
    name: "RoleEdit",
    meta: {
      requiresAuth: true,
      permission: "role-edit",
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
      permission: "role-permission",
    },
    component: () => import("../pages/SystemConfiguration/user_management/role_permission/Index.vue")
  },
  /*user management/rolePermission route start*/

    /*user management/ users route start*/
  {
    path: "/system-configuration/users",
    name: "userList",
    meta: {
      requiresAuth: true,
      permission: "user-view",
    },
    component: () => import("../pages/SystemConfiguration/user_management/users/index.vue")
  },
  {
    path: "/system-configuration/financial",
    name: "financial_year_list",
    meta: {
      requiresAuth: true,
      permission: "financial-year-view",
    },
    component: () => import("../pages/SystemConfiguration/financial_year/Index.vue")
  },
 
    /*user management/ users route start*/



    //////////////////////////////////
    /*allowance program route start*/
    //////////////////////////////////
  {
    path: '/system-configuration/allowance-program/setting',
    name: 'AllowanceProgram',
    meta: {
      requiresAuth: true,
      permission: "allowance-view", //change permission: "allowance-view",
    },
    component: () => import("../pages/SystemConfiguration/allowance_program/Index.vue")
  },
  {
    path: '/system-configuration/allowance-program',
    name: 'AllowanceProgram',
    meta: {
      requiresAuth: true,
      permission: "allowance-view",
    },
    component: () => import("../pages/SystemConfiguration/allowance_program/Index.vue")
  },
  {
    path: '/system-configuration/allowance-program/create',
    name: 'AllowanceProgramCreate',
    meta: {
      requiresAuth: true,
      permission: "allowance-create",
    },
    component: () => import("../pages/SystemConfiguration/allowance_program/Create.vue")
  },
  {
    path: '/system-configuration/allowance-program/edit/:id',
    name: 'AllowanceProgramEdit',
    meta: {
      requiresAuth: true,
      permission: "allowance-edit",
    },
    component: () => import("../pages/SystemConfiguration/allowance_program/Edit.vue")
  },
  {
    path: '/system-configuration/allowance-program/setting/:id',
    name: 'AllowanceProgramSetting',
    meta: {
      requiresAuth: true,
      permission: "allowance-edit",
    },
    component: () => import("../pages/SystemConfiguration/allowance_program/Setting.vue")
  },
  // Allowance Program Field List - this is the list of fields that will be shown in the Allowance Program
  {
    path: '/system-configuration/allowance-program-additional-field/',
    name: 'AllowanceProgramSetting',
    meta: {
      requiresAuth: true,
      permission: "allowance-create",
    },
    component: () => import("../pages/SystemConfiguration/allowance_program/AdditionalField/Index.vue")
  },
  // Allowance Program Field Values - this is the list of field values that will be shown in the Online Application Form for Allowance Program
  {
    path: '/system-configuration/allowance-program-additional-field-value/',
    name: 'AllowanceProgramSetting',
    meta: {
      requiresAuth: true,
      permission: "allowance-edit",
    },
    component: () => import("../pages/SystemConfiguration/allowance_program/AdditionalField/Index.vue")
  },
    
    //////////////////////////////////
    /*END allowance program route start*/
    //////////////////////////////////

];

export default SystemConfigurationRoutes;
