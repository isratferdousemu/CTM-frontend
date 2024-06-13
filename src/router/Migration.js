const MigrationRoutes = [
    {
      path: "/migration/beneficiary",
      name: "beneficiary-migrration",
      meta: {
        requiresAuth: true,
        permission: "beneficiaryMigrration-create",
      },
      component: () =>
        import("../pages/Datamigration/Beneficiary/Index.vue"),
    },
  ];
  
  export default MigrationRoutes;
  