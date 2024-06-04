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
];

export default EmergencyPaymentManagementRoutes;
