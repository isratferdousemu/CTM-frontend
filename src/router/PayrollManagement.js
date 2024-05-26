const PayrollManagementRoutes = [
  {
    path: "/payroll-management/approval-selection",
    name: "payment-payment",
    meta: {
      requiresAuth: true,
      permission: "approval-selection",
    },
    component: () => import("../pages/PayrollManagement/ApprovalSelection/Index.vue")
  },

  {
    path: "/payroll-management/payroll-setting",
    name: "payroll-setting",
    meta: {
      requiresAuth: true,
      permission: "payroll-setting-view",
    },
    component: () => import("../pages/PayrollManagement/PayrollSetting/index.vue")
  },

  {
    path: "/payroll-management/payroll-verification-setting",
    name: "payroll-setting",
    meta: {
      requiresAuth: true,
      permission: "payroll-setting-view",
    },
    component: () => import("../pages/PayrollManagement/PayrollSetting/PayrollVerificationSetting.vue")
  },

  //payment processor
  {
    path: "/payroll-management/payment-processor",
    name: "payment-processor",
    meta: {
      requiresAuth: true,
      permission: "payment-processor-create",
    },
    component: () => import("../pages/PayrollManagement/paymentprocessor/Index.vue")
  },

  {
    path: "/payroll-management/payment-processor-show/:id",
    name: "payment-processor-show",
    meta: {
      requiresAuth: true,
      permission: "payment-processor-edit",
    },
    component: () => import("../pages/PayrollManagement/paymentprocessor/show.vue")
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
];

export default PayrollManagementRoutes;
