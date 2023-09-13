<template>
  <v-app>
    <!-- SideBar  -->
    <sidebarView />
    <!------TopBar-------->
    <TopBar />
    <!-- MAIN VIEW COMPONENT  -->
    <v-main>
      <v-container fluid class="page-wrapper">
        <router-view />
      </v-container>
    </v-main>

    <!------Footer-------->
    <FooterBar />
  </v-app>
</template>
<script>
import sidebarView from "@/components/Common/SideBar.vue";
import TopBar from "@/components/Common/TopBar.vue";
import FooterBar from "@/components/Common/FooterBar.vue";

export default {
  components: { sidebarView, TopBar, FooterBar },
  computed: {
    str() {
      return this.$store.state;
    },
  },
};
</script>
<style></style>
