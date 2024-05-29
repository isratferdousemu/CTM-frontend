const EmergencyPaymentManagementRoutes = [
  {
    path: "/emergency-payment/emergency-allotment",
    name: "emergencyAllotment",
    meta: {
      requiresAuth: true,
      permission: "emergencyAllotment-view",
    },
    component: () => import("../pages/EmergencyPaymentManagement/Index.vue"),
  },
  {
    path: "/emergency-payment/emergency-allotment/create",
    name: "emergencyAllotment",
    meta: {
      requiresAuth: true,
      permission: "emergencyAllotment-create",
    },
    component: () => import("../pages/EmergencyPaymentManagement/Create.vue"),
  },
];

export default EmergencyPaymentManagementRoutes;
