
import Login from "../pages/Common/Login.vue";
import TokenView from "../pages/Common/copy.vue";
const CommonRoutes = [
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
    meta: {
      guest: true
    },
    component: TokenView,
  },
];

export default CommonRoutes;
