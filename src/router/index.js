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


// import dependencies
import store from "../store/index"
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

// function createNextMiddleware(context, middleware, index) {
//   const subsequentMiddleware = middleware[index];
//   if (!subsequentMiddleware) return context.next;
//   return (...parameters) => {
//     context.next(...parameters);
//     const nextMiddleware = createNextMiddleware(context, middleware, index + 1);
//     subsequentMiddleware({ ...context, next: nextMiddleware });
//   };
// }
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    // Page requires authentication
    if (store.state.token) {
      // console.log(store.getters.GetUserPermissions)
      // console.log(to.meta.permission)
      if (to.meta.permission=="common" && store.state && store.state.userData && store.state.userData.roleNames && !store.state.userData.roleNames.includes("super-admin") && store.getters.GetUserPermissions.findIndex(per => per.name === to.meta.permission || per.module_name === to.meta.permission  || per.sub_module_name === to.meta.permission) === -1) {
      // console.log("don't load permissions")

      next('/dashboard');
      } 
      // User is authenticated, allow access
      next();
    } else {
      // User is not authenticated, redirect to login page
      next('/login');
    }
  }else if (to.meta.guest) {
    if (store.state.token) {
      // User is already logged in, redirect to the home page or any other authorized page
      next('/');
    } else {
      // User is not logged in, allow access to the login page
      next();
    }
  }  else {
    // Page doesn't require authentication
    next();
  }
});


export default router;
