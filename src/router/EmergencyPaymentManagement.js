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
];

export default EmergencyPaymentManagementRoutes;
