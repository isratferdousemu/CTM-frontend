<template>
  <v-app>
    <!-- SideBar  -->
    <sidebarView />
    <!------TopBar-------->
    <TopBar />
    <!-- MAIN VIEW COMPONENT  -->
    <v-main >
      <v-container fluid class="page-wrapper">
        <!-- <h1 v-tooltip="hello">OK</h1> -->
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
  data() {
    return {
      data: "",
      hello: "okk",
    };
  },
  methods: {
    async getdata() {
      const response = await this.apiRequest.fetchData(
        "https://jsonplaceholder.typicode.com/users"
      );

      this.data = response;
    },
  },
  created() {
    this.getdata();
  },
  computed: {
    str() {
      return this.$store.state;
    },
  },
};
</script>

