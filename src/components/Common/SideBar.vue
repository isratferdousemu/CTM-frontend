<template lang="">
  <div>
    <v-navigation-drawer
      width="280"
      elevation="0"
      v-model="Drawer"
      :clipped="clipped"
      fixed
      app
      class="mr-9 ml-3 my-3 nav-height rounded-lg nav-left-custom"
    >
      <div class="pa-2 text-center ma-auto">
        <v-img
          class="text-center ma-auto"
          max-height="100%"
          max-width="80px"
          position="center center"
          src="/assets/images/logo.png"
        ></v-img>
        <!-- <Logo class="ml-7" /> -->
      </div>
      <v-divider></v-divider>

      <v-list class="left-sidebar">
        <template v-for="(item, i) in items">
          <v-list-item
            v-if="!item.subTtems && item.to == '/log'"
            :key="i"
            router
            exact
         
            v-can="item.permission"
            @click.stop="
              drawer = false;
              $router.push(item.to);
            "
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title class="list_size">
                  <!-- {{ $t(`sidebar.${item.title}`) }} -->
                {{ item.title }}
                <v-badge
                  v-if="item.title == 'Employee' && new_employee > 0"
                  :content="new_employee"
                  class="badge-employee"
                ></v-badge>
                <v-badge
                  v-if="item.title == 'Apprentice' && new_apprentice > 0"
                  :content="new_apprentice"
                  class="badge-employee"
                ></v-badge>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item
            v-else-if="!item.subTtems"
            :key="i"
            :to="item.to"
            router
            exact
            v-can="item.permission"
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="list_size">
                {{ $t(`sidebar.${item.title}`) }}
                 <!-- {{ $t(`sidebar.${item.title}`) }} -->
                <!-- {{ item.title }} -->
                <v-badge
                  v-if="item.title == 'Employee' && new_employee > 0"
                  :content="new_employee"
                  class="badge-employee"
                ></v-badge>
                <v-badge
                  v-if="item.title == 'Apprentice' && new_apprentice > 0"
                  :content="new_apprentice"
                  class="badge-employee"
                ></v-badge>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-group
            v-else
            :key="i"
            :value="false"
            :prepend-icon="item.icon"
            v-can="item.permission"
          >
            <template v-slot:activator>
              <v-list-item-title class="list_size">{{
                item.title
              }}</v-list-item-title>
            </template>

            <template v-for="subitem in item.subTtems">
              <v-list-item
                v-if="
                  subitem.to == '/setting/franchise-info'
                    ? isSuperAdmin()
                    : true
                "
                :to="subitem.to"
                :key="subitem.id"
                v-can="subitem.permission"
              >
                <v-list-item-action>
                  <v-icon>{{ subitem.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title
                    class="sub_list_size"
                    v-text="subitem.title"
                  />
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list-group>
        </template>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      menu: false,
      clipped: false,
      fixed: false,
      items: [
        {
          icon: "mdi-view-dashboard-outline",
          title: "dashboard",
          to: "/",
          permission: "view-dashboard",
        },
        {
          icon: "mdi mdi-cogs",
          title: 'System Configuration',
          subTtems: [
            {
              title: "Division",
              icon: "mdi mdi-plus",
              to: "/system-configuration/division",
            },
            {
              title: "Disrict",
              icon: "mdi mdi-plus",
              to: "/system-configuration/district",
            },
            {
              title: "City Corporation",
              icon: "mdi mdi-plus",
              to: "/system-configuration/city",
            },
            {
              title: "Thana/Upazila",
              icon: "mdi mdi-plus",
              to: "/system-configuration/thana",
            },
            {
              title: "Union",
              icon: "mdi mdi-plus",
              to: "/system-configuration/union",
            },
            {
              title: "Ward",
              icon: "mdi mdi-plus",
              to: "/system-configuration/ward",
            },
            {
              title: "Office Management",
              icon: "mdi mdi-plus",
              to: "/system-configuration/office_information",
            },
            {
              title: "Role Management",
              icon: "mdi mdi-plus",
              to: "/system-configuration/role",
            },
            {
              title: "User Management",
              icon: "mdi mdi-plus",
              to: "/system-configuration/users",
            },
            // {
            //   title: "Menu",
            //   icon: "mdi mdi-plus",
            //   to: "/system-configuration/menu",
            // },
            //
            // {
            //   title: "Device Registration",
            //   icon: "mdi mdi-plus",
            //   to: "/system-configuration/device_registration",
            // },
          ],
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
};
</script>

<style lang="css">
.list_size {
  color: #000000;
}
</style>
