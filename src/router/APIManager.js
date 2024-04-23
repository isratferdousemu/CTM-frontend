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
    {
        path: "/api-manager/url-generate/view/:id",
        name: "URLView",
        meta: {
            requiresAuth: true,
            permission: "url-edit",
        },
        component: () => import("../pages/APIManager/URLGenerate/View.vue")
    },
    /*Url Generate route e end*/
    /*API Generate route start*/
    {
        path: "/api-manager/api-generate",
        name: "APIList",
        meta: {
            requiresAuth: true,
            permission: "api-view",
        },
        component: () => import("../pages/APIManager/DynamicAPI/Index.vue")
    },

    {
        path: "/api-manager/api-generate/create",
        name: "APIGenerate",
        meta: {
            requiresAuth: true,
            permission: "api-create",
        },
        component: () => import("../pages/APIManager/DynamicAPI/Create.vue")
    },

    {
        path: "/api-manager/api-generate/edit/:id",
        name: "APIEdit",
        meta: {
            requiresAuth: true,
            permission: "api-edit",
        },
        component: () => import("../pages/APIManager/DynamicAPI/Edit.vue")
    },
    {
        path: "/api-manager/api-generate/view/:id",
        name: "APIView",
        meta: {
            requiresAuth: true,
            permission: "api-view",
        },
        component: () => import("../pages/APIManager/DynamicAPI/View.vue")
    },
    /*API Generate route e end*/
    /*API Data Receive route start*/
    {
        path: "/api-manager/data-receiver",
        name: "DataList",
        meta: {
            requiresAuth: true,
            permission: "apiDataReceive-view",
        },
        component: () => import("../pages/APIManager/DataReceive/Index.vue")
    },

    {
        path: "/api-manager/data-receiver/generate",
        name: "DataReceiveGenerate",
        meta: {
            requiresAuth: true,
            permission: "apiDataReceive-create",
        },
        component: () => import("../pages/APIManager/DataReceive/Create.vue")
    },

    {
        path: "/api-manager/data-receiver/edit/:id",
        name: "DataReceiveEdit",
        meta: {
            requiresAuth: true,
            permission: "apiDataReceive-edit",
        },
        component: () => import("../pages/APIManager/DataReceive/Edit.vue")
    },
    {
        path: "/api-manager/data-receiver/view/:id",
        name: "DataReceiveView",
        meta: {
            requiresAuth: true,
            permission: "apiDataReceive-view",
        },
        component: () => import("../pages/APIManager/DataReceive/View.vue")
    },
    /*API Generate route e end*/
];

export default APIManagerRoutes;