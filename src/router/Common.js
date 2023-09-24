// import components
import Login from "../pages/Common/Login/index.vue";

const CommonRoutes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/browser-token",
    name: "TokenView",
    component: TokenView,
    meta: {},
  },
];

export default CommonRoutes;
