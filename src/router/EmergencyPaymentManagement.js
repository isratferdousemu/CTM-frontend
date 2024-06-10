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
    path: '/emergency-payment-management/dashboard',
    name: 'emergency-payment-management-dashboard',
    meta: {
      requiresAuth: true,
      permission: "emergency-payment-dashboard-show",
    },
    component: () =>
      import('../pages/EmergencyPaymentManagement/Dashboard/Index.vue'),
  },
];

export default EmergencyPaymentManagementRoutes;
