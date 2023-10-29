const PayrollManagementRoutes = [
  {
    path: "/payroll-management/payment-payment",
    name: "payment-payment",
    meta: {
      requiresAuth: true,
      permission: "payment-payment",
    },
    component: () => import("../pages/PayrollManagement/paymentprocessor/Index.vue")
  },
];

export default PayrollManagementRoutes;
