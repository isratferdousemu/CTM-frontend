<template>
  <div id="app">
    <v-app>
      <v-container class="my-5">
        <v-card elevation="12" class="d-flex" min-height="550">
          <v-sheet width="50%" color="#0D47A1">
            <div class="pa-10 ma-10 text-center ma-auto">
              <v-img
                class="text-center ma-auto"
                max-height="100%"
                max-width="80px"
                position="center center"
                src="/assets/images/logo.png"
              ></v-img>
              <!-- <Logo class="ml-7" /> -->
            </div>
            <div class="d-flex align-center justify-center white--text">
              Integrated Social Protection Management Information System
              (ISPMIS)
            </div>
            <div class="d-flex align-center justify-center white--text">
              <h3>Notice Board</h3>
            </div>
            <div class="d-flex align-center justify-start white--text mx-2">
              No One's ID and password is asked from the MIS admin of the
              Department Social Services without solving your problem.Beware of
              cheaters. Please do not share your password with anyone and do not
              save it in your browser.
            </div>
          </v-sheet>
          <v-sheet width="50%" class="d-flex align-center justify-center">
            <div class="d-flex align-center justify-center">
              <h3>Login</h3>
            </div>
            <div class="d-flex align-center justify-center">
              <v-form @submit.prevent="submitData" class="ma-5">
                <v-text-field
                  label="Username"
                  v-model="data.email"
                  required
                ></v-text-field>
                <div v-if="errors && errors.email" v-html="errors.email" />
                <v-text-field
                  label="Password"
                  type="password"
                  v-model="data.password"
                  required
                ></v-text-field>
                <div
                  v-if="errors && errors.password"
                  v-html="errors.password"
                />
                <div class="d-inline d-flex justify-end">
                  <v-btn color="blue" :loading="loading" @click="submitData"
                    >Login</v-btn
                  >
                </div>
              </v-form>
            </div>
          </v-sheet>
        </v-card>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      data: {
        email: null,
        password: null,
      },

      errors: [],
      loading: false,
    };
  },

  methods: {
    async submitData() {
      this.loading = true;
      await axios
        .post("http://127.0.0.1:8000/api/v1/admin/login", this.data)
        .then((response) => {
          this.loading = false;

          console.log(response.data.permissions);

          let data = {
            permissions: response.data.permissions,
            token: response.data.token,
            user: response.data.data,
          };
          this.$store.dispatch("login", data);
          this.$router.push({
            path: "/",
          });
        })
        .catch((err) => {
          this.loading = false;
          console.log(err.response.data);
          this.errors = err.response.data.errors;
        });
    },
  },
};
</script>

<style></style>
