<template>
        <div id="app">
                <v-app>
                        <v-container class="my-5">
                                <!-- login OTP -->

                                <v-dialog persistent v-model="otpDialog" width="350">
                                        <v-card style="justify-content: center; text-align: center">
                                                <v-card-title class="font-weight-bold justify-center">
                                                        OTP
                                                </v-card-title>
                                                <v-divider></v-divider>
                                                <v-card-text>
                                                        <p>You will get a verification code to your registered number.</p>
                                                        <v-otp-input v-model="form.otp" :loading="loading"
                                                                @finish="onFinish"></v-otp-input>
                                                        <!-- <div v-if="getLoginresponse.message" v-html="getLoginresponse.message" class="red--text" /> -->
                                                        <p>Remaining time: {{ remainingTime }} sec</p>


                                                </v-card-text>
                                        </v-card>
                                </v-dialog>

                                <!-- login OTP -->

                                <v-card elevation="12" class="d-flex" min-height="550">
                                        <v-sheet width="50%" color="#0D47A1">
                                                <div class="pa-5 ma-5 text-center ma-auto">
                                                        <v-img class="text-center ma-auto" max-height="100%" max-width="80px"
                                                                position="center center" src="/assets/images/logo.png"></v-img>
                                                        <!-- <Logo class="ml-7" /> -->
                                                </div>
                                                <div class="d-flex align-center justify-center white--text">
                                                        Integrated Social Protection Management Information System
                                                        (ISPMIS)
                                                </div>
                                                <div class="d-flex align-center justify-center orange--text ma-t">
                                                        <h3>Notice Board</h3>
                                                </div>
                                                <div class="d-flex align-center justify-start orange--text mx-6">
                                                        No One's ID and password is asked from the MIS admin of the
                                                        Department Social Services without solving your problem.Beware of
                                                        cheaters. Please do not share your password with anyone and do not
                                                        save it in your browser.
                                                </div>
                                        </v-sheet>

                                        <v-sheet width="50%">
                                                <div class="d-flex flex-column align-center justify-center"
                                                        style="height: 70vh">
                                                        <div class="text-center mb-2">
                                                                <h3>Login</h3>
                                                        </div>

                                                        <v-form v-on:submit.prevent="submitLogin" class="ma-5">
                                                                <v-text-field label="Username" v-model="form.email"
                                                                        :error="errors && errors.email"
                                                                        :error-messages="errors ? errors.email : []"
                                                                        required></v-text-field>
                                                                <!-- <div v-if="errors && errors.email" v-html="errors.email" /> -->
                                                                <!-- <p v-if="errors.email" class="red--text custom_error">
                                                                        {{ errors.email }}
                                                                </p> -->
                                                                <v-text-field label="Password" type="password"
                                                                        v-model="form.password"
                                                                        :error="errors && errors.password"
                                                                        :error-messages="errors ? errors.password : []"
                                                                        required></v-text-field>
                                                                <!-- <div v-if="message && !errors" v-html="message"
                                                                        class="red--text" /> -->



                                                                <div class="d-inline d-flex justify-end">
                                                                        <router-link to="/forgot-password"
                                                                                class="font-sm">Forgot Password</router-link>
                                                                </div>
                                                                <div class="d-inline d-flex justify-end">
                                                                        <v-btn color="blue" type="submit" class="my-4"
                                                                                :loading="loading">Login</v-btn>
                                                                </div>
                                                        </v-form>
                                                </div>
                                        </v-sheet>
                                </v-card>
                                <span class="d-flex align-center justify-center my-10">Copyright © 2023 DSS | All Rights
                                        Reserved</span>

                        </v-container>

                </v-app>
        </div>
</template>

<script>
import {
        getFingerprint
} from "../../plugins/fingerprint.js";
import {
        mapGetters
} from 'vuex'
import { mapState } from "vuex";
export default {
        name: "Login",
        title: "CTM - Login",
        data() {
                return {
                        remainingTime: 60,
                        intervalId: null,

                        form: {
                                device_token: "admin@ctm.com",
                                email: null,
                                password: null,
                                otp: "",
                        },

                        loading: false,
                        otpDialog: false



                };
        },
        computed: {

                ...mapState({
                        message: (state) => state.success_message,
                        errors: (state) => state.errors,
                        success_status: (state) => state.success_status,
                        error_message: (state) => state.error_message,


                }),
                ...mapGetters(["getLoginresponse", "getOtpresponse"]),
        },

        async created() {
                const fingerprint = await getFingerprint();
                this.form.device_token = fingerprint;
        },

        methods: {
                // async submitData() {
                //         this.loading = true;
                //         axios
                //                 .post("/admin/login/otp", this.form)
                //                 .then((response) => {
                //                         this.loading = false;
                //                         if (response.data.success) {
                //                                 this.otpDialog = true;
                //                                 this.startCountdown();
                //                         }
                //                 })
                //                 .catch((err) => {
                //                         this.loading = false;
                //                         // console.log(err.response.data)
                //                         this.errors = err.response.data.errors;
                //                         this.message = err.response.data.message;
                //                 });
                // },
                startCountdown() {
                        this.intervalId = setInterval(() => {
                                if (this.remainingTime > 0) {
                                        this.remainingTime--;
                                } else {
                                        clearInterval(this.intervalId);
                                        this.otpDialog = false;
                                        this.remainingTime = 60;
                                }
                        }, 1000); // Update every second (1000 milliseconds)
                },
                // onFinish() {
                //         this.loading = true;
                //         axios
                //                 .post("/admin/login", this.form)
                //                 .then((response) => {
                //                         this.loading = false;
                //                         console.log(response, "final");
                //                         // console.log(response.data.permissions)

                //                         let data = {
                //                                 permissions: response.data.permissions,
                //                                 token: response.data.token,
                //                                 user: response.data.data,
                //                         };
                //                         this.$store.dispatch("login", data);
                //                         this.$router.push({
                //                                 path: "/",
                //                         });
                //                 })
                //                 .catch((err) => {
                //                         this.loading = false;
                //                         console.log(err.response.data);
                //                         this.errors = err.response.data.errors;
                //                         // this.validation_message = err.response.data.message;
                //                 });
                // },
                onFinish: async function () {
                        try {
                                this.loading = true;
                                await this.$store
                                        .dispatch("sendOtp", this.form)
                                        .then(() => {
                                                console.log('emu')

                                                if (this.getLoginresponse.data.token) {
                                                        let data = {

                                                                permissions: this.getLoginresponse.data.permissions,
                                                                token: this.getLoginresponse.data.token,
                                                                user: this.getLoginresponse.data.data,
                                                        };
                                                        this.$store.dispatch("login", data);
                                                        this.$router.push({
                                                                path: "/",
                                                        });

                                                }
                                                // let data = {
                                                //   // permissions: response.data.permissions,
                                                //   // token: response.data.token,
                                                //   // user: response.data.data,
                                                //         permissions:  this.Getotp.data.permissions,
                                                //         token: this.Getotp.data.token,
                                                //         user: this.Getotp.data.data,
                                                // };
                                                // this.$store.dispatch("login", data);
                                                // this.$router.push({
                                                //         path: "/",
                                                // });

                                        });
                        } catch (err) {
                                console.log(err);
                        }
                },
                submitLogin: async function () {

                        this.loading = true;
                        await this.$store
                                .dispatch("LoginSubmit", this.form).then(() => {
                                        if (!this.errors.email) {
                                                this.otpDialog = true;
                                                this.startCountdown();
                                                console.log(this.errors)
                                        }

                                        this.loading = false;




                                });




                },
        },
};
</script>

<style>
html.my-app,
body.my-app {
        overflow: hidden !important;
}
</style>
