export default (await import('vue')).defineComponent({
    components: {
        NavGroup, NavItem, SubMenu
    },
    data() {
        return {
            menu: false,
            clipped: false,
            fixed: false,
            sidebarMenu: [
                {
                    icon: "mdi-view-dashboard-outline",
                    title: "Dashboard",
                    to: "/",
                    permission: "view-dashboard",
                },
                {
                    icon: "mdi mdi-cogs",
                    title: "System Configuration",
                    subItems: [
                        {
                            title: "Demographic Information",
                            icon: "mdi mdi-plus",
                            subItems: [
                                {
                                    title: "Division",
                                    icon: "mdi mdi-plus",
                                    to: "/system-configuration/division",
                                },
                                {
                                    title: "District",
                                    icon: "mdi mdi-plus",
                                    to: "/system-configuration/district",
                                },
                            ],
                        },
                    ],
                    permission: "",
                },
                {
                    icon: "mdi-cog-outline",
                    title: "Settings",
                    to: "/setting/company-setting",
                    permission: "view-customers",
                },
                {
                    icon: "mdi-chart-box-outline",
                    title: "Reports",
                    to: "/activity-log",
                    permission: "view-customers",
                },
                {
                    icon: "mdi-fence",
                    title: "Activity Log",
                    to: "/activity-log",
                    permission: "view-customers",
                },
            ],
            miniVariant: false,
            right: true,
            rightDrawer: false,
        };
    },
    computed: {
        Drawer: {
            get() {
                return this.$store.state.Drawer;
            },
            set(v) {
                return this.$store.commit("setDrawer", v);
            },
        },
    },
});
