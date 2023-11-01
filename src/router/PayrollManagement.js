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
