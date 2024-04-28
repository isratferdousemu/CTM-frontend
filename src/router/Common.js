import ForgotPassword from "../pages/Common/ForgotPassword.vue";
import Login from "../pages/Common/Login.vue";
import TokenView from "../pages/Common/copy.vue";
import ApplicationView from "../pages/Common/application/Index.vue";
import ApplicationEdit from "../pages/Common/application/Edit.vue";
import ApplicationPreView from "../pages/Common/application/ApplicationPreView.vue";
import SuccessView from "../pages/Common/application/Successpage.vue";
import APiView from "../pages/Common/api_manager/Index.vue";
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
    path: "/online-application-preview/:id",
    name: "ApplicationPreView",
    component: ApplicationPreView,
  },
  {
    path: "/online-application/edit/:id",
    name: "Edit",
    component: ApplicationEdit,
  },


  {
    path: "/submitted-application",
    name: "SuccessView",
    component: SuccessView,
  },
  {
    path: "/api-documentation",
    name: "APiView",
    component: APiView,
  },
]
export default CommonRoutes;
