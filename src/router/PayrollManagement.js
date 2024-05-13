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
    path: "/payroll-management/payroll-settings",
    name: "payroll-settings",
    // meta: {
    //   requiresAuth: true,
    //   permission: "payroll-settings-view",
    // },
    component: () => import("../pages/PayrollManagement/PayrollSetting/index.vue")
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
