<template lang="">
  <v-app-bar
    elevation="0"
    height="70"
    fixed
    app
    class="mx-5 my-3 rounded-lg header-left menu-top"
    style="box-shadow: 3px 8px 14px -5px rgb(0 0 0 / 14%) !important"
  >
    <!--  <v-app-bar-nav-icon @click.stop="drawer = !drawer" /> -->
    <v-btn icon @click.stop="Drawer = !Drawer">
      <v-icon>mdi-menu</v-icon>
    </v-btn>
    <v-img
      class="text-center ma-auto mr-2"
      max-height="100%"
      max-width="50px"
      position="center center"
      src="/assets/images/logo.png"
    ></v-img>
    <v-spacer />
    <!-- <b> {{  this.$t("topSidebar.title") }}  <p :style="{ 'margin-left': '15%', 'margin-top': '15%' }">
   </br> <span v-if="userData?.office">{{ userData?.office?.office_address}}</span>
    <span v-else>{{  this.$t("topSidebar.location") }}</span>
    </p>
    </b> -->
    <!-- <v-row no-gutters class="ml-2">
  <v-col cols="12" md="12" lg="12" sm="12" xs="12">
    <span :class="$vuetify.breakpoint.xs ? 'text-xs' : ''">{{ this.$t("topSidebar.title") }}</span>
  </v-col>
  <v-col cols="12" md="12" lg="12" sm="12" xs="12">
    <span :class="$vuetify.breakpoint.xs ? 'text-xs' : ''" v-if="userData?.office">{{ userData?.office?.office_address }}</span>
    <span :class="$vuetify.breakpoint.xs ? 'text-xs' : ''" v-else>{{ this.$t("topSidebar.location") }}</span>
  </v-col>
</v-row> -->

    <v-spacer class="hidden-xs-only" />

    <v-row no-gutters class="ml-2" v-if="$vuetify.breakpoint.smAndUp">
      <v-col cols="12" md="12" lg="12" sm="12" xs="12">
        <span :class="$vuetify.breakpoint.xs ? 'text-xs' : ''">{{
          this.$t("topSidebar.title")
        }}</span>
      </v-col>
      <v-col cols="12" md="12" lg="12" sm="12" xs="12">
        <span
          :class="$vuetify.breakpoint.xs ? 'text-xs' : ''"
          v-if="userData?.office"
          >{{ userData?.office?.office_address }}</span
        >
        <span :class="$vuetify.breakpoint.xs ? 'text-xs' : ''" v-else>{{
          this.$t("topSidebar.location")
        }}</span>
      </v-col>
    </v-row>

    <v-spacer class="hidden-sm-and-down" />

    <LocaleSwitcher />

    <!-- Notification Start -->
    <v-menu
      :close-on-content-click="false"
      :nudge-width="200"
      offset-x
      width="350"
    >
      <template v-slot:activator="{ on, attrs }">
        <div style="margin-top: 15px; margin-left: 5px">
         <b class="d-none d-sm-inline">{{ userData.full_name }}</b>
          <p style="font-size: 14px">{{ userData.roleNames.join(", ") }}</p>
        </div>

        <v-btn color="indigo" dark v-bind="attrs" v-on="on" icon>
          <v-badge
            v-if="notificationUnseen > 0"
            :content="notificationUnseen"
            class="badge-notification"
          ></v-badge>
          <v-icon>mdi-bell</v-icon>
        </v-btn>
      </template>

      <v-card id="notification" style="min-width: 350px">
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="font-weight-bold subtitle-1"
                >NOTIFICATIONS</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list
          three-line
          class="pa-0"
          style="overflow-y: scroll; height: 350px"
        >
          <template v-for="(notification, index) in notification">
            <div :key="index">
              <v-divider v-if="index != 0"></v-divider>

              <v-list-item
                :to="notification.link"
                :class="notification.seen ? '' : 'teal lighten-5'"
                @click="seenCall(notification.id)"
              >
                <v-list-item-avatar
                  class="green"
                  max-height="20px"
                  max-width="20px"
                  min-width="20px"
                  style="margin-top: 20px"
                >
                  <!-- <v-img :src="notification.avatar"></v-img> -->
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title
                    v-html="notification.title"
                    class="font-weight-bold"
                  ></v-list-item-title>
                  <v-list-item-subtitle>{{
                    notification.body
                  }}</v-list-item-subtitle>
                  <v-list-item-subtitle>
                    <span class="font-weight-bold"
                      >{{ dateToYMD(notification.created_at) }} at
                      {{ formatAMPM(notification.created_at) }}</span
                    >
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </div>
          </template>
        </v-list>
        <v-list style="background: #eaeaea; padding: 0; margin: 0">
          <v-list-item @click="seeMore()">
            <v-list-item-action>
              <v-icon>mdi-bell</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>ALL NOTIFICATIONS</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
    <!-- Notification End -->

    <!-- User link Start -->
    <v-menu
      transition="scale-transition"
      origin="top end 0"
      :close-on-content-click="false"
      offset-y
      :nudge-left="150"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          variant="text"
          class="profileBtn custom-hover-primary"
          v-bind="attrs"
          v-on="on"
          icon
        >
          <!-- <v-img :src="require('../assets/img/user-img.png')"></v-img> -->
          <!-- <img src="~/assets/img/user-img.png" class="user-img" height="40" /> -->
          <v-avatar min-width="40" width="40" height="40">
            <img
              v-if="$store.state.user && $store.state.user.photo"
              :src="$store.state.user.photo.img_url"
            />
            <div
              v-else
              class="white--text d-flex justify-center align-center primary_bg"
              style="height: 100%; width: 100%"
            >
              <v-avatar size="35">
                <!-- <img src="/assets/images/avatar-1.jpg" height="35" alt="user" /> -->
                <v-img :src="data.photo_url" height="35" alt="user"></v-img>
              </v-avatar>
            </div>
          </v-avatar>
        </v-btn>
      </template>
      <v-sheet rounded="md" width="200" elevation="10" class="">
        <v-list class="py-0" lines="one">
          <v-list-item
            :to="`/profile-info/${userData.id}`"
            value="item1"
            active-color="primary"
          >
            <v-icon size="20">mdi-account-outline</v-icon>
            <v-list-item-title class="pl-4 text-body-1"
              >My Profile</v-list-item-title
            >
          </v-list-item>
          <!-- <v-list-item value="item2" active-color="primary" to="/login">
        <v-icon size="20">mdi-cog-outline</v-icon>
        <v-list-item-title class="pl-4 text-body-1">My Account</v-list-item-title>
      </v-list-item> -->
        </v-list>
        <div class="pt-4 pb-4 px-5 text-center">
          <v-btn link @click="logout()" color="primary" outlined block
            >Logout</v-btn
          >
        </div>
      </v-sheet>
    </v-menu>
    <!-- User link End -->
  </v-app-bar>
</template>

<script>
import axios from "axios";
import LocaleSwitcher from "@/components/Common/LocaleSwitcher";
import { mapState } from "vuex";
export default {
  data() {
    return {
      data: {},
    };
  },

  components: { LocaleSwitcher },
  computed: {
    headerTitle: {
      get() {
        return this.$store.state.headerTitle;
      },
    },
    ...mapState({
      userData: (state) => state.userData,
    }),
    notification: {
      get() {
        return this.$store.state.notification;
      },
    },
    notificationUnseen: {
      get() {
        return this.$store.state.notificationUnseen;
      },
    },
    notificationTime: {
      get() {
        return this.$store.state.notificationTime;
      },
    },
    Drawer: {
      get() {
        return this.$store.state.Drawer;
      },
      set(v) {
        return this.$store.commit("setDrawer", v);
      },
    },
    
  },
  methods: {
    logout() {
      console.log(this.$store.state.token);
      this.$axios
        .get("/admin/logout", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          this.$store.commit("setToken", null);
          this.$store.commit("setUser", null);
          this.$router.push({ name: "Login" });
        });
    },

    async getUserById() {
      if (!this.userData || !this.userData.id) {
      console.log("User data or user ID is not available yet.");
      return;
    }
    
      try {
        this.$axios
          .get(`/admin/user/get-user/${this.userData?.id}`, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            if (res.data) {
              this.data = res.data.data;
            } else {
              this.$toast.error("Something went wrong");
            }
          })
          .catch((err) => {
          });
      } catch (e) {
        console.log(e);
      }
    },
  },

  mounted() {
    this.getUserById();
  },
};
</script>

<style scoped>
.text-xs {
  font-size: 5px;
}
</style>
