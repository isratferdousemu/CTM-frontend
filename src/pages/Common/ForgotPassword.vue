<!-- <template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-card v-if="step == 1" class="mx-auto my-12 justify-center" width="40%">
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>
      <div class="d-flex justify-center py-4">
        <div class="logo">
            <v-img class="text-center ma-auto" max-height="100%" max-width="80px"
                                                                position="center center" src="/assets/images/logo.png"></v-img>
        </div>
      </div>
      <v-card-title class="justify-center"><b>Forgot Password</b></v-card-title>

      <v-card-text>
        Please Enter Your Phone Number
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
</template> -->

<template>
  <div
    id="app"
    class="loginApp"
    style="
      background-image: url('/assets/images/dss.jpg');
      background-size: cover;
    "
  >
    <div class="loginAppShadow"></div>
    <v-container class="h-100vh">
      <!-- login OTP -->
      <!-- <v-dialog persistent v-model="otpDialog" width="350">
        <v-card style="justify-content: center; text-align: center">
          <v-card-title class="font-weight-bold justify-center">
            OTP
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <p>You will get a verification code to your registered number.</p>
            <ValidationObserver
              ref="form"
              class="w-100"
              lazy-validation
              v-slot="{ invalid }"
            >
              <ValidationProvider
                name="OTP"
                vid="otp"
                rules="required"
                v-slot="{ errors }"
              >
                <v-otp-input
                  v-model="form.otp"
                  :loading="loading"
                  :error="errors[0] ? true : false"
                  :error-messages="errors[0]"
                  @finish="onFinish"
                ></v-otp-input>
              </ValidationProvider>
            </ValidationObserver>
            <p>Remaining time: {{ remainingTime }} sec</p>
          </v-card-text>
        </v-card>
      </v-dialog> -->

      <!-- Forgot Password OTP -->

      <div class="row d-flex loginBox justify-center align-center">
        <v-card elevation="12" class="d-flex align-center col-lg-4 col-12">
          <v-row>
            <v-col>
              <div class="d-flex align-items-start" v-if="step == 2">
                <v-btn class="ma-2" color="default" text @click="reloadPage">
                  <v-icon dark left> mdi-arrow-left </v-icon>
                </v-btn>
              </div>
              <div
                class="d-flex flex-column align-center justify-center"
                style="height"
              >
                <div class="pa-5 ma-5 text-center">
                  <v-img
                    class="text-center ma-auto"
                    max-height="100%"
                    max-width="80px"
                    position="center center"
                    src="/assets/images/logo.png"
                  ></v-img>
                  <!-- <Logo class="ml-7" /> -->
                </div>
                <div class="text-center mb-2">
                  <h3>Forgot Password</h3>
                </div>

                <ValidationObserver
                  ref="form"
                  class="w-100"
                  lazy-validation
                  v-slot="{ invalid }"
                  v-if="step == 2"
                >
                  <form @submit.prevent="forgotPasswordSubmit" class="ma-5">
                    <v-otp-input
                      v-model="form.otp"
                      :loading="loading"
                      :error="errors.message ? true : false"
                      :error-messages="errors.message"
                    ></v-otp-input>

                    <v-text-field
                      type="password"
                      v-model="form.password"
                      prepend-inner-icon="mdi-lock-open"
                      placeholder="Password"
                      required
                      :error="errors.password ? true : false"
                      :error-messages="errors.password"
                    ></v-text-field>
                    <v-text-field
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
                      :disabled="invalid"
                    >
                      Reset
                    </v-btn>
                  </form>
                </ValidationObserver>

                <ValidationObserver
                  ref="form"
                  class="w-100"
                  lazy-validation
                  v-slot="{ invalid }"
                  v-if="step == 1"
                >
                  <v-form @submit.prevent="sendOtp" class="ma-5">
                    <ValidationProvider
                      name="Phone"
                      vid="phone"
                      rules="required"
                    >
                    <v-text-field
                      type="number"
                      label="Phone"
                      v-model="form.phone"
                      :error="errors.phone ? true : false"
                      :error-messages="errors.phone"
                    ></v-text-field>
                      <!-- :error="
                          forgotPasswordErrors && forgotPasswordErrors.phone
                        "
                        :error-messages="
                          forgotPasswordErrors ? forgotPasswordErrors.phone : []
                        " -->
                    </ValidationProvider>

                    <div class="d-inline d-flex justify-end">
                      <v-btn
                        color="blue"
                        block
                        type="submit"
                        class="my-4 white--text"
                        :loading="loading"
                        :disabled="invalid"
                        >Send Otp</v-btn
                      >
                    </div>
                  </v-form>
                </ValidationObserver>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </div>
      <p class="text-center white--text position-relative">
        Copyright © 2023 DSS | All Rights Reserved
      </p>
    </v-container>
  </div>
</template>

<script>
import Form from "vform";
import { mapState } from "vuex";
import { extend, ValidationProvider, ValidationObserver } from "vee-validate";

export default {
  data: () => ({
    loading: false,
    selection: 1,
    step: 1,
    height: "57vh",
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
    errors: {
      message: "",
    },
    error_message: {},
    error_message_otp: null,
  }),
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  computed: {
    ...mapState(["forgotPasswordErrors", "forgotPasswordErrorMessageOtp"]),
  },
  methods: {
    reloadPage() {
      // window.location.reload();
      this.step = 1;
    },
    async sendOtp() {
      await this.$store.dispatch("sendOtpForgetPassword", this.form);
      try {
        this.$store
          .dispatch("sendOtpForgetPassword", this.form)
          .then((data) => {
            if (data?.success == true) {
              this.height = "70vh";
              this.step = 2;
              this.resetErrors();
            } else {
              this.errors = data.errors;
              console.log(this.errors.phone);
            }
          });
      } catch (e) {
        console.log(e);
      }
    },
    resetErrors() {
      (this.form.otp = ""),
        (this.form.password = ""),
        (this.form.confirm_password = ""),
        (this.errors = {});
      this.errors = { message: "" };
    },
    async forgotPasswordSubmit() {
      console.log(JSON.stringify(this.form));
      // return;
      // this.resetErrors();
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
              this.$toast.error(data.message);
            } else {
              this.errors = data.errors;
              //   this.$toast.error("Password Reset Failed");
            }
          }
        });
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style lang=""></style>
