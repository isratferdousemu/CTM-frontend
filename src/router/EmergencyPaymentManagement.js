const EmergencyPaymentManagementRoutes = [
  {
    path: "/emergency-payment/emergency-allotment",
    name: "Emergency Allotment",
    meta: {
      requiresAuth: true,
      permission: "emergency-allotment-view",
    },
    component: () =>
      import(
        "../pages/EmergencyPaymentManagement/EmergencyAllotment/Index.vue"
      ),
  },
  {
    path: "/emergency-payment/emergency-allotment/create",
    name: "Emergency Allotment Create",
    meta: {
      requiresAuth: true,
      permission: "emergency-allotment-create",
    },
    component: () =>
      import(
        "../pages/EmergencyPaymentManagement/EmergencyAllotment/Create.vue"
      ),
  },
  {
    path: "/emergency-payment/emergency-allotment/edit/:id",
    name: "Emergency Allotment Edit",
    meta: {
      requiresAuth: true,
      permission: "emergency-allotment-edit",
    },
    component: () =>
      import("../pages/EmergencyPaymentManagement/EmergencyAllotment/Edit.vue"),
  },
  //   Manage Emergency Beneficiary
  {
    path: "/emergency-payment/manage-emergency-beneficiary",
    name: "Manage Emergency beneficiary",
    meta: {
      requiresAuth: true,
      permission: "manage-emergency-beneficiary-view",
    },
    component: () =>
        import(
            "../pages/EmergencyPaymentManagement/EmergencyBeneficiary/Includes/ManageBeneficiary.vue"
            ),
  },
  {
    path: "/emergency-payment/manage-emergency-beneficiary/create",
    name: "Existing Emergency beneficiary",
    meta: {
      requiresAuth: true,
      permission: "manage-emergency-beneficiary-create",
    },
    component: () =>
      import(
        "../pages/EmergencyPaymentManagement/EmergencyBeneficiary/Includes/ExistingEmergency.vue"
      ),
  },
  // Emergency Beneficiary routes
  {
    path: "/emergency-payment/emergency-beneficiary",
    name: "Emergency Beneficiary",
    meta: {
      requiresAuth: true,
      permission: "emergency-beneficiary-view",
    },
    component: () =>
      import(
        "../pages/EmergencyPaymentManagement/EmergencyBeneficiary/Index.vue"
      ),
  },
  {
    path: "/emergency-payment/emergency-beneficiary/create",
    name: "Emergency Beneficiary Create",
    meta: {
      requiresAuth: true,
      permission: "emergency-beneficiary-create",
    },
    component: () =>
      import(
        "../pages/EmergencyPaymentManagement/EmergencyBeneficiary/Create.vue"
      ),
  },
  {
    path: "/emergency-payment/emergency-beneficiary/edit/:id",
    name: "Emergency Beneficiary Edit",
    meta: {
      requiresAuth: true,
      permission: "emergency-beneficiary-edit",
    },
    component: () =>
      import(
        "../pages/EmergencyPaymentManagement/EmergencyBeneficiary/Edit.vue"
      ),
  },
  // Emergency Payroll routes
  {
    path: "/emergency-payment/emergency-payroll/create",
    name: "Emergency Payroll Create",
    meta: {
      requiresAuth: true,
      permission: "emergency-payroll-create",
    },
    component: () =>
      import(
        "../pages/EmergencyPaymentManagement/EmergencyPayroll/Create.vue"
        ),
  },
  {
    path: '/emergency-payment/emergency-payroll/approval',
    name: 'Emergency Payroll Approval',
    meta: {
      requiresAuth: true,
      permission: 'emergency-payroll-approval',
    },
    component: () =>
      import('../pages/EmergencyPaymentManagement/EmergencyPayrollApproval/Index.vue'),
  },
  // Payment cycle routers:
  {
    path: "/emergency-payment/payment-cycle",
    name: "Emergency Payment Cycle",
    meta: {
      requiresAuth: true,
      permission: "emergency-payment-cycle-create",
    },
    component: () =>
      import("../pages/EmergencyPaymentManagement/PaymentCycle/Index.vue"),
  },

  //dashboard
  {
    path: "/emergency-payment-management/dashboard",
    name: "emergency-payment-management-dashboard",
    meta: {
      requiresAuth: true,
      permission: "emergency-payment-dashboard-show",
    },
    component: () =>
      import("../pages/EmergencyPaymentManagement/Dashboard/Index.vue"),
  },
  {
    path: "/emergency-payment/supplementary-payroll",
    name: "emergency-payment-supplementary-payroll",
    meta: {
      requiresAuth: true,
      permission: "emergency-supplementary-payroll-show",
    },
    component: () =>
      import(
        "../pages/EmergencyPaymentManagement/SupplementaryPayroll/index.vue"
      ),
  },
  {
    path: "/emergency-payment/cycle/view/:id",
    name: "Emergency Payment",
    meta: {
      requiresAuth: true,
      permission: "emergency-payment-cycle-view",
    },
    component: () =>
      import(
        "../pages/EmergencyPaymentManagement/PaymentCycle/viewDetails.vue"
      ),
  },
  {
    path: "/emergency-payment/cycle/reject/:id",
    name: "Emergency Payment",
    meta: {
      requiresAuth: true,
      permission: "emergency-payment-cycle-view",
    },
    component: () =>
      import(
        "../pages/EmergencyPaymentManagement/PaymentCycle/RejectDetails.vue"
      ),
  },
  {
    path: "/emergency-payment/payroll-reconciliation",
    name: "Emergency Payment Reconciliation",
    meta: {
      requiresAuth: true,
      permission: "emergency-payment-reconciliation-create",
    },
    component: () =>
      import(
        "../pages/EmergencyPaymentManagement/PayrollReconciliationCoordination/index.vue"
      ),
  },
];

export default EmergencyPaymentManagementRoutes;
