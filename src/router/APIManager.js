const APIManagerRoutes = [
    //   {
    //     path: '/login',
    //     name: 'Login',
    //     component: Login,
    //   },
    /*Url Generate route start*/
    {
        path: "/api-manager/url-generate",
        name: "URLList",
        meta: {
            requiresAuth: true,
            permission: "url-view",
        },
        component: () => import("../pages/APIManager/URLGenerate/Index.vue")
    },

    {
        path: "/api-manager/url-generate/create",
        name: "URLGenerate",
        meta: {
            requiresAuth: true,
            permission: "url-create",
        },
        component: () => import("../pages/APIManager/URLGenerate/Create.vue")
    },

    {
        path: "/api-manager/url-generate/edit/:id",
        name: "URLEdit",
        meta: {
            requiresAuth: true,
            permission: "url-edit",
        },
        component: () => import("../pages/APIManager/URLGenerate/Edit.vue")
    },
    /*Url Generate route e end*/
];

export default APIManagerRoutes;