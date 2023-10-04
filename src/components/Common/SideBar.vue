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
      
        <!-- <ul id="navigation">
            <li v-for="(item, index) in navigation" :key="'item'+index">
                <i v-if="item.subnav" class="far"
                   :class="{'fa-plus-square':!item.open,
                    'fa-minus-square':item.open}"></i>
                <div class="title" @click="item.open = !item.open">
                    {{ item.title }}
                </div>
                <Dropdown v-if="item.subnav" :list="item" />
            </li>
        </ul> -->
          <v-list class="left-sidebar">
             <template v-for="(item, i) in navigation">
    <v-list-item 
    :key="i"
    router
    exact

    @click.stop.prevent="handleItemClick(item.to)">
      <v-icon
        v-if="item.subnav"
        class="far"
        :class="{'fa-plus-square': !item.open, 'fa-minus-square': item.open}"
        @click="item.open = !item.open"
      ></v-icon>
      <v-list-item-content @click="item.open = !item.open">
        {{ item.title }}
      </v-list-item-content>
      <Dropdown v-if="item.subnav" :list="item" />
    </v-list-item>
    </template>
  </v-list>


    </v-navigation-drawer>
  </div>
</template>
<script>
import SidebarHeader from './SidebarHeader'
import Dropdown from './Dropdown'
export default {
  components: {
    SidebarHeader,
    Dropdown
  },
  methods:{

     handleItemClick(to) {
      if (this.$router.currentRoute.path !== to) {
        this.$router.push(to);
      }
    },
  },

  data() {
    return {

      navigation: [
        {
          icon: "mdi-view-dashboard-outline",
          title: "Dashboard",
          to: "/",
          permission: "view-dashboard",

        },
        {
          icon: "mdi-view-dashboard-outline",
          title: "System Configuration",
          open: false,
          subnav: [
            {
              icon: "mdi mdi-cogs",
              title: "Demographic Information",
              open: false,
              subnav: [

                {
                  icon: "mdi mdi-plus", title: "Division"
                },
                { icon: "mdi mdi-plus", title: "District" },
                { icon: "mdi mdi-plus", title: "City Corporation" },
                { icon: "mdi mdi-plus", title: "Thana/Upazila" },
                { icon: "mdi mdi-plus", title: "Union" },
                { icon: "mdi mdi-plus", title: "Ward" },
              ]
            },

          ]
        },



      ]
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

