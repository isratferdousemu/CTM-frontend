// import { createRouter, createWebHistory } from 'vue-router'

import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

// Import routing modules
import ApplicationSelectionRoutes from "./ApplicationSelection";
import BeneficiaryManagementRoutes from "./BeneficiaryManagement";
import BudgetManagementRoutes from "./BudgetManagement";
import EmergencyPaymentManagementRoutes from "./EmergencyPaymentManagement";
import GrievanceManagementRoutes from "./GrievanceManagement";
import MEReportingRoutes from "./M&EReporting";
import ManageAllotmentRoutes from "./ManageAllotment";
import PayrollManagementRoutes from "./PayrollManagement";
import SystemConfigurationRoutes from "./SystemConfiguration";
import TrainingManagementRoutes from "./TrainingManagement";
import CommonRoutes from "./Common";


// import components
import DefaultLayout from "../layouts/defaultLayout.vue";

const routes = [
  ...CommonRoutes,
  {
    path: "/",
    component: DefaultLayout,
    meta: {
      requiresAuth: true,
      permission: "common",
    },
    children: [
      ...ApplicationSelectionRoutes,
      ...BeneficiaryManagementRoutes,
      ...BudgetManagementRoutes,
      ...EmergencyPaymentManagementRoutes,
      ...GrievanceManagementRoutes,
      ...MEReportingRoutes,
      ...ManageAllotmentRoutes,
      ...PayrollManagementRoutes,
      ...SystemConfigurationRoutes,
      ...TrainingManagementRoutes,
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
