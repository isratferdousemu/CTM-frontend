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
