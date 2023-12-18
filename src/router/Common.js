import ForgotPassword from "../pages/Common/ForgotPassword.vue";
import Login from "../pages/Common/Login.vue";
import TokenView from "../pages/Common/copy.vue";
import ApplicationView from "../pages/Common/application/Index.vue";
import SuccessView from "../pages/Common/application/Successpage.vue";
const CommonRoutes = [
  {
    path: "/forgotPassword",
    name: "ForgotPassword",
    meta: {
      guest: true
    },
    component: ForgotPassword,
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      guest: true
    },
    component: Login,
  },
  {
    path: "/browser-token",
    name: "TokenView",
    component: TokenView,
  },
  {
    path: "/online-application",
    name: "ApplicationView",
    component: ApplicationView,
  },
  {
    path: "/submitted-application/:id",
    name: "SuccessView",
    component: SuccessView,
  },
]
export default CommonRoutes;
