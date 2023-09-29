<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-card v-if="step == 1" class="mx-auto my-12 justify-center" width="40%">
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>

      <!-- <v-img
      height="250"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
    ></v-img> -->

      <div class="d-flex justify-center py-4">
        <div class="logo">
            <v-img class="text-center ma-auto" max-height="100%" max-width="80px"
                                                                position="center center" src="/assets/images/logo.png"></v-img>
          <!-- <router-link to="/"> <Logo />LOGO </router-link> -->
        </div>
      </div>
      <v-card-title class="justify-center"><b>Forgot Password</b></v-card-title>

      <v-card-text>
        Please Enter Your Phone Number
        <!-- {{ forgotPasswordErrors }} -->
        <v-text-field
          type="number"
          label="Phone"
          v-model="form.phone"
          :error="forgotPasswordErrors && forgotPasswordErrors.phone"
          :error-messages="
            forgotPasswordErrors ? forgotPasswordErrors.phone : []
          "
        />
      </v-card-text>

      <v-card-actions>
        <v-btn color="primary lighten-2" block @click="sendOtp">
          Send OTP
        </v-btn>
      </v-card-actions>
    </v-card>

    <!-- submit OTP  -->
    <form
      @submit.prevent="forgotPasswordSubmit"
      v-if="step == 2"
      style="padding-top: 25px; margin: auto; width: 350px"
    >
      <v-text-field
        outlined
        type="number"
        v-model="form.otp"
        placeholder="OTP"
        required
        :error="errors.message ? true : false"
        :error-messages="errors.message"
      ></v-text-field>
      <v-text-field
        outlined
        type="password"
        v-model="form.password"
        prepend-inner-icon="mdi-lock-open"
        placeholder="Password"
        required
        :error="errors.password ? true : false"
        :error-messages="errors.password"
      ></v-text-field>
      <v-text-field
        outlined
        type="password"
        v-model="form.confirm_password"
        prepend-inner-icon="mdi-lock-open"
        placeholder="Confirm Password"
        required
        :error="errors.confirm_password ? true : false"
        :error-messages="errors.confirm_password"
      ></v-text-field>

      <v-btn
        type="submit"
        class="mr-4 py-3 mb-5 btn"
        color="info"
        block
        x-large
        :disabled="form.busy"
      >
        Reset
      </v-btn>
    </form>
  </v-container>
</template>

<script>
import Form from "vform";
import { mapState } from "vuex";

export default {
  data: () => ({
    loading: false,
    selection: 1,
    // step: 1,
    form: new Form({
      device_token: "admin@ctm.com",
      phone: "",
      otp: "",
      password: "",
      confirm_password: "",
    }),
    otpDialog: false,
    remainingTime: 60,
    apiUrl: "http://127.0.0.1:8000/api/v1/admin/forgot-password",
    bearerToken: "4|1QjdA8vjG15B4ImbcOI5Kr0r7uuRAjJKpwoU2s5f40c5d6bc",
    errors: {
      message: "",
    },
    error_message: {},
    error_message_otp: null,
  }),
  computed: {
    ...mapState([
      "forgotPasswordErrors",
      "forgotPasswordErrorMessageOtp",
      "step",
    ]),
  },
  methods: {
    async sendOtp() {
      await this.$store.dispatch("sendOtpForgetPassword", this.form);
    },
    resetErrors() {
      this.errors = {};
      this.errors = { message: "" };
    },
    async forgotPasswordSubmit() {
      this.resetErrors();
      try {
        this.$store.dispatch("forgotPasswordSubmit", this.form).then((data) => {
          console.log(data);
          if (data == null) {
            this.$toast.success("Password Reset Successfully");
            this.$router.push({
              path: "/login",
            });
          } else {
            if (data.success == false) {
              this.errors.message = data.message;
              // this.$toast.error("Password Reset Failed");
            } else {
              this.errors = data.errors;
              //   this.$toast.error("Password Reset Failed");
            }
          }

          //   this.$router.push({
          //     path: "/login",
          //   });
          //   console.log(data, "submitForgotIndex");
          // if (data == null) {
          //   this.$toast.success("Data Inserted Successfully");
          //   this.dialogAdd = false;
          //   this.resetForm();
          //   this.GetDivision();
          // } else {
          //   this.errors = data.errors;
          // }
          // // if (this.error_status == "") {
          // //   this.$toast.success("Data Inserted Successfully");
          // //   this.dialogAdd = false;
          // //   this.resetForm();
          // //   this.GetDivision();
          // // }
        });
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style lang=""></style>
