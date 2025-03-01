const PayrollManagementRoutes = [
  {
    path: '/payroll-management/approval-selection',
    name: 'payment-payment',
    meta: {
      requiresAuth: true,
      permission: 'approval-selection',
    },
    component: () =>
      import('../pages/PayrollManagement/ApprovalSelection/Index.vue'),
  },

  {
    path: '/payroll-management/payroll-setting',
    name: 'payroll-setting',
    meta: {
      requiresAuth: true,
      permission: 'payroll-setting-view',
    },
    component: () =>
      import('../pages/PayrollManagement/PayrollSetting/index.vue'),
  },

  {
    path: '/payroll-management/payroll-verification-setting',
    name: 'payroll-setting',
    meta: {
      requiresAuth: true,
      permission: 'payroll-setting-view',
    },
    component: () =>
      import(
        '../pages/PayrollManagement/PayrollSetting/PayrollVerificationSetting.vue'
      ),
  },

  //payment processor
  {
    path: '/payroll-management/payment-processor',
    name: 'payment-processor',
    meta: {
      requiresAuth: true,
      permission: 'payment-processor-create',
    },
    component: () =>
      import('../pages/PayrollManagement/paymentprocessor/Index.vue'),
  },

  {
    path: '/payroll-management/payment-processor-show/:id',
    name: 'payment-processor-show',
    meta: {
      requiresAuth: true,
      permission: 'payment-processor-edit',
    },
    component: () =>
      import('../pages/PayrollManagement/paymentprocessor/show.vue'),
  },

  {
    path: '/payroll-management/create',
    name: 'payment-processor-show',
    meta: {
      requiresAuth: true,
      permission: 'payment-processor-edit',
    },
    component: () =>
      import('../pages/PayrollManagement/paymentprocessor/show.vue'),
  },

  {
    path: '/payroll-management/payment-tracking',
    name: 'payment-tracking',
    meta: {
      requiresAuth: true,
      permission: 'payroll-payment-tracking',
    },
    component: () =>
      import('../pages/PayrollManagement/PaymentTracking/Index.vue'),
  },

  {
    path: '/payroll-management/dashboard',
    name: 'payroll-management-dashboard',
    meta: {
      requiresAuth: true,
      permission: "payroll-dashboard-show",
    },
    component: () =>
      import('../pages/PayrollManagement/Dashboard/Index.vue'),
  },

  // {
  //   path: "/payroll-management/application-selection",
  //   name: "payment-payment",
  //   meta: {
  //     requiresAuth: true,
  //     permission: "payment-processor",
  //   },
  //   component: () => import("../pages/PayrollManagement/PaymentProcessor/Index.vue")
  // },

  {
    path: '/payroll-management/payroll-create',
    name: 'payroll-create',
    meta: {
      requiresAuth: true,
      permission: 'payroll-create',
    },
    component: () =>
      import('../pages/PayrollManagement/PayrollCreate/Index.vue'),
  },
  {
    path: '/payroll-management/payroll-approval',
    name: 'payroll-approval',
    meta: {
      requiresAuth: true,
      permission: 'payroll-approval',
    },
    component: () =>
      import('../pages/PayrollManagement/PayrollApproval/Index.vue'),
  },
];

export default PayrollManagementRoutes;
