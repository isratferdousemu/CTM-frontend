<template>
    <v-container class="fill-height d-flex align-center justify-center">
        <v-card v-if="step == 1" class="mx-auto my-12 justify-center" width="40%">
            <template slot="progress">
                <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
            </template>

            <!-- <v-img
      height="250"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
    ></v-img> -->
            <div class="d-flex justify-center py-4">
                <div class="logo">
                    <router-link to="/"> <!-- <Logo /> -->LOGO </router-link>
                </div>
            </div>
            <v-card-title class="justify-center"><b>Forgot Password</b></v-card-title>

            <v-card-text>
                Please Enter Your Phone Number
                <!-- {{ forgotPasswordErrors }} -->
                <v-text-field type="number" label="Phone" v-model="form.phone"
                    :error="forgotPasswordErrors && forgotPasswordErrors.phone"
                    :error-messages="forgotPasswordErrors ? forgotPasswordErrors.phone : []" />
            </v-card-text>

            <v-card-actions>
                <v-btn color="primary lighten-2" block @click="sendOtp">
                    Send OTP
                </v-btn>
            </v-card-actions>
        </v-card>

        <!-- submit OTP  -->
        <form @submit.prevent="forgotPasswordSubmit" v-if="step == 2" style="padding-top: 25px; margin: auto; width: 350px">
            <!-- <v-otp-input
                        class="px-0"
                        variant="filled"
                        width="100%"
                        v-model="form.otp"
                        :loading="loading"
                        @finish="onFinish"
                      ></v-otp-input> -->

            <v-text-field outlined type="number" v-model="form.otp" placeholder="OTP" required :error="forgotPasswordErrorMessageOtp"
                :error-messages="forgotPasswordErrorMessageOtp"></v-text-field>
            <v-text-field outlined type="password" v-model="form.password" prepend-inner-icon="mdi-lock-open"
                placeholder="Password" required :error="forgotPasswordErrors && forgotPasswordErrors.password"
                :error-messages="forgotPasswordErrors ? forgotPasswordErrors.password : []"></v-text-field>
            <v-text-field outlined type="password" v-model="form.confirm_password" prepend-inner-icon="mdi-lock-open"
                placeholder="Confirm Password" required
                :error="forgotPasswordErrors && forgotPasswordErrors.confirm_password"
                :error-messages="forgotPasswordErrors ? forgotPasswordErrors.confirm_password : []"></v-text-field>

            <v-btn type="submit" class="mr-4 py-3 mb-5 btn" color="info" block x-large :disabled="form.busy">
                Reset
            </v-btn>
        </form>

        <!-- <v-dialog persistent v-model="otpDialog" width="350">
      <v-card style="justify-content: center; text-align: center">
        <v-card-title class="font-weight-bold justify-center">
          OTP
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <p>You will get a verification code to your register number.</p>
          <v-otp-input
            v-model="form.otp"
            :loading="loading"
            @finish="onFinish"
          ></v-otp-input>
          <p>Remaining time: {{ remainingTime }} sec</p>
        </v-card-text>
      </v-card>
    </v-dialog> -->
    </v-container>
</template>

<script>
import Form from "vform";
import axios from "axios";
import { getFingerprint } from "../../plugins/fingerprint.js";
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
        errors: [],
        error_message_otp: null
    }),
    computed: {
        ...mapState(["forgotPasswordErrors", "forgotPasswordErrorMessageOtp","step"]),
    },
    async created() {
        const fingerprint = await getFingerprint();
        this.form.device_token = fingerprint;
        console.log(this.form.device_token);
        // this.$store.dispatch("ForgotPassword/function1", { id: 1, name: "John" });
    },
    methods: {
        async sendOtp() {
            await this.$store.dispatch("sendOtp", this.form);
            // try {
            //         .then((response) => {
            //             this.loading = false;
            //             // alert(response);
            //             // if (response.data.success) {
            //             //     this.otpDialog = true;
            //             //     this.startCountdown();
            //             // }

            //         });
            // } catch (err) {
            //     // this.errors = err.response.data.errors;
            //     console.log(err);
            // }

            // this.loading = true;
            // const headers = {
            //     Authorization: `Bearer ${this.bearerToken}`,
            //     "Content-Type": "application/json",
            // };

            // const data = {
            //     phone: this.form.phone,
            // };

            // axios({
            //     method: "post",
            //     url: this.apiUrl,
            //     headers: headers,
            //     data: data,
            // })
            //     .then((response) => {
            //         this.otpDialog = true;
            //         console.log("Response Data:", response);
            //         console.log("Response Data:", response.data);
            //         if (response.data.success) {
            //             this.step = 2;
            //         }
            //     })
            //     .catch((err) => {
            //         this.loading = false;
            //         // console.log(err.response.data.errors);
            //         this.errors = err.response.data.errors;
            //     });
        },
        async forgotPasswordSubmit() {
            await this.$store.dispatch("forgotPasswordSubmit", this.form);
        },
        submitPassword() {
            this.loading = true;
            const headers = {
                Authorization: `Bearer ${this.bearerToken}`,
                "Content-Type": "application/json",
            };

            const data = {
                phone: this.form.phone,
                otp: this.form.otp,
                password: this.form.password,
                confirm_password: this.form.confirm_password,
            };

            axios({
                method: "post",
                url: "http://127.0.0.1:8000/api/v1/admin/forgot-password/submit",
                headers: headers,
                data: data,
            })
                .then((response) => {
                    this.otpDialog = true;
                    console.log("Response Data:", response);
                    console.log("Response Data:", response.data);
                    if (response.data.success) {
                        // this.step = 2;
                        this.$router.push({
                            path: "/login",
                        })
                    }
                })
                .catch((err) => {
                    this.loading = false;
                    //   this.errors = err.response.data.errors;
                    //   console.log(err.response.data);
                    if (err.response.data.success == false) {
                        this.error_message_otp = err.response.data.message;
                    } else {
                        this.errors = err.response.data.errors;
                    }
                });
        },
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
        reserve() {
            this.loading = true;

            setTimeout(() => (this.loading = false), 2000);
        },
    },
};
</script>

<style lang=""></style>
