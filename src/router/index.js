// import { createRouter, createWebHistory } from 'vue-router'
import Vue from "vue";
import VueRouter from "vue-router";


Vue.use(VueRouter);

// Import routing modules
import APIManagerRoutes from "./APIManager";
import ApplicationSelectionRoutes from "./ApplicationSelection";
import BeneficiaryManagementRoutes from "./BeneficiaryManagement";
import BudgetManagementRoutes from "./BudgetManagement";
import EmergencyPaymentManagementRoutes from "./EmergencyPaymentManagement";
import GrievanceManagementRoutes from "./GrievanceManagement";
import MEReportingRoutes from "./M&EReporting";
import ManageAllotmentRoutes from "./ManageAllotment";
import PayrollManagementRoutes from "./PayrollManagement";
import SystemConfigurationRoutes from "./SystemConfiguration";
import SystemAuditRoutes from "./SystemAudit";
import TrainingManagementRoutes from "./TrainingManagement";
import GeneralSettingRoutes from "./GeneralSetting";
import CommonRoutes from "./Common";
import ProfileRoutes from "./Profile";

// import dependencies
import store from "../store/index";
// import components
import DefaultLayout from "../layouts/defaultLayout.vue";
import ActivityLogRoutes from "@/router/ActivityLog";
import BiReportManagerRoutes from "@/router/reports/BiReportManager";


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
      {
        path: "/dashboard",
        name: "Dashboard",
        meta: {
          requiresAuth: true,
          permission: "common",
        },
        component: () =>
          import(
            "../pages/ApplicationSelection/Dashboard/Index.vue"
            // "../pages/Common/dashboard.vue"
          ),
      },
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
      ...GeneralSettingRoutes,
      ...SystemAuditRoutes,
      ...ActivityLogRoutes,
      ...APIManagerRoutes,
      ...ProfileRoutes,
      ...BiReportManagerRoutes
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    // Page requires authentication
    if (store.state.token) {
      if (store.state && store.state.userData && store.state.userData.roleNames && !store.state.userData.roleNames.includes("super-admin")) {
          // console.log(to.meta.permission != "common" &&
          // store.getters.GetUserPermissions.findIndex(per =>
          //   per.name === to.meta.permission
          //   || per.module_name === to.meta.permission
          //   || per.sub_module_name === to.meta.permission
          //   ) === -1);

        if (to.meta.permission != "common" && store.getters.GetUserPermissions.findIndex(per => per.name === to.meta.permission || per.module_name === to.meta.permission || per.sub_module_name === to.meta.permission) === -1)
        {
          next('/dashboard');
        } else {
          next();
        }
      }
      // User is authenticated, allow access
      next();
    } else {
      // User is not authenticated, redirect to login page
      next('/login');
    }
    // next();

  } else if (to.meta.guest) {
    if (store.state.token) {
      // User is already logged in, redirect to the home page or any other authorized page
      next('/');
    } else {
      // User is not logged in, allow access to the login page
      next();
    }
  } else {
    // Page doesn't require authentication
    next();
  }
});



export default router;
