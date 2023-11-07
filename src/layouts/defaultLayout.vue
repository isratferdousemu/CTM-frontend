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
    CheckToken() {
      let token = this.$store.state.token;
      this.$axios
        .post("auth/token/check", { token })
        .then((res) => {
          console.log(res, "token");
        })
        .catch((err) => {
          console.log(err, "token error");
          this.$store.dispatch("logout");
          this.$router.push("/login");
        });
      // Cookie.remove('token')
      //   	Cookie.remove('setUser')
      //   	this.$store.commit('setToken', null)
      //   	this.$store.commit('setUser', null)
      // this.$router.push('/login')
    },
     updateHeaderTitle() {
      const title = this.$t("sidebar.dashboard");
      this.$store.commit("setHeaderTitle", title);
    },
    
  },
  created() {
    this.updateHeaderTitle();
  },
  beforeMount() {
    this.CheckToken();
  },
  computed: {
    str() {
      return this.$store.state;
    },
  },
  watch: {
    '$i18n.locale': 'updateHeaderTitle',
  },


 
};
</script>

