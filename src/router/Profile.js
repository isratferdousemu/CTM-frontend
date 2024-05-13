const ProfileRoutes = [
    {
      path: "/profile-info/:id",
      name: "profile",
    //   meta: {
    //     requiresAuth: true,
    //     permission: "grievanceType-view",
    //   },
      component: () =>
        import("../pages/Profile/index.vue"),
    },
  ];
  
  export default ProfileRoutes;
  