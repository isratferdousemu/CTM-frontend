<template>
<div id="app" class="loginApp" style="background-image:url('/assets/images/dss.jpg');background-size:cover">
    <div class="loginAppShadow"></div>
    <v-container class="h-100vh">
        <!-- login OTP -->
        <v-dialog persistent v-model="otpDialog" width="350">
            <v-card style="justify-content: center; text-align: center">
                <v-card-title class="font-weight-bold justify-center">
                    OTP
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <p>You will get a verification code to your registered number.
                    </p>
                    <ValidationObserver ref="form" class="w-100" lazy-validation v-slot="{ invalid }">
                        <ValidationProvider name="OTP" vid="otp" rules="required" v-slot="{ errors }">
                            <v-otp-input v-model="form.otp" :loading="loading" :error="errors[0] ? true : false" :error-messages="errors[0]" @finish="onFinish"></v-otp-input>
                        </ValidationProvider>
                    </ValidationObserver>
                    <p>Remaining time: {{ remainingTime }} sec</p>

                </v-card-text>
            </v-card>
        </v-dialog>

        <!-- login OTP -->

        <div class="row d-flex loginBox justify-center align-center">
            <v-card elevation="12" class="d-flex align-center col-lg-8 col-12">
                <v-row>
                    <v-col cols="6" class="loginLeft">
                        <div class="pa-5 ma-5 text-center ma-auto">
                            <v-img class="text-center ma-auto" max-height="100%" max-width="80px" position="center center" src="/assets/images/logo.png"></v-img>
                            <!-- <Logo class="ml-7" /> -->
                        </div>
                        <h3 class="text-center white--text">
                            Integrated Social Protection Management Information System
                            (ISPMIS)
                        </h3>
                        <div class="text-center orange--text my-4">
                            <h3>Notice Board</h3>
                        </div>
                        <p class=" orange--text mx-6" style="font-size: 14px;">
                            No One's ID and password is asked from the MIS admin of the
                            Department of Social Services (DSS) without solving your problem. Beware
                            of
                            cheaters. Please do not share your password with anyone and do
                            not
                            save it in your browser.
                        </p>
                    </v-col>
                    <v-col v-if="!resetPassword" cols="6">
                        <div class="d-flex flex-column align-center justify-center" style="height: 57vh">
                            <div class="text-center mb-2">
                                <h3>Login</h3>
                            </div>
                            <ValidationObserver ref="form" class="w-100" lazy-validation v-slot="{ invalid }">
                                <v-form @submit.prevent="submitLogin" class="ma-5">
                                    <ValidationProvider name="Username" vid="username" rules="required" v-slot="{ errors }">
                                        <v-text-field label="Username" v-model="form.username" :error="errors[0] ? true : false" :error-messages="errors[0]" required></v-text-field>
                                    </ValidationProvider>
                                    <!-- :error="errors && errors.username" :error-messages="errors ? errors.username : []"  -->
                                    <ValidationProvider name="Password" vid="password" rules="required" v-slot="{ errors }">
                                        <v-text-field type="password" v-model="form.password" placeholder="Password" required :error="errors[0] ? true : false" :error-messages="errors[0]"></v-text-field>
                                    </ValidationProvider>

                                    <div class="d-inline d-flex justify-end">
                                        <router-link to="/forgotPassword" class="font-sm">Forgot Password
                                        </router-link>
                                    </div>
                                    <div class="d-inline d-flex justify-end">
                                        <v-btn color="blue" block type="submit" class="my-4 white--text" :loading="loading">Login</v-btn>
                                    </div>
                                </v-form>
                            </ValidationObserver>

                        </div>
                    </v-col>
                    <!-- reset password  -->
                    <v-col v-if="resetPassword" cols="6">
                        <div class="d-flex flex-column align-center justify-center" style="height: 57vh">
                            <div class="text-center mb-2">
                                <h3>Reset Password</h3>
                            </div>
                            <ValidationObserver ref="form" class="w-100" lazy-validation v-slot="{ invalid }">
                                <v-form @submit.prevent="submitResetPassword" class="ma-5">
                                    <ValidationProvider name="OldPassword" vid="old_password" rules="required" v-slot="{ errors }">
                                        <v-text-field type="password" label="Old Password" v-model="form.old_password" :error="errors[0] ? true : false" :error-messages="errors[0]" required></v-text-field>
                                    </ValidationProvider>
                                    <!-- :error="errors && errors.username" :error-messages="errors ? errors.username : []"  -->
                                    <ValidationProvider name="Password" vid="password" rules="required" v-slot="{ errors }">
                                        <v-text-field type="password" v-model="form.password" placeholder="Password" required :error="errors[0] ? true : false" :error-messages="errors[0]"></v-text-field>
                                    </ValidationProvider>
                                    <v-text-field
                                    type="password"
                                    v-model="form.confirm_password" 
                                    placeholder="Confirm Password"
                                    required
                                    :error="errors[0] ? true : false" :error-messages="errors[0]">
                                  ></v-text-field>
 
                                    <div class="d-inline d-flex justify-end">
                                        <v-btn color="blue" block type="submit" class="my-4 white--text" :loading="loading">Submit</v-btn>
                                    </div>
                                </v-form>
                            </ValidationObserver>

                        </div>
                    </v-col>


                </v-row>

            </v-card>

        </div>
        <p class="text-center white--text position-relative">Copyright © 2023 DSS | All Rights
            Reserved</p>

    </v-container>
</div>
</template>

<script>
import {
    getFingerprint
} from "../../plugins/fingerprint.js";
import {
    mapGetters
} from 'vuex'
import {
    mapState
} from "vuex";
import {
    extend,
    ValidationProvider,
    ValidationObserver
} from "vee-validate";
import {
    required
} from "vee-validate/dist/rules";
extend("required", required);
export default {
    name: "Login",
    title: "CTM - Login",
    components: {
        ValidationProvider,
        ValidationObserver,
    },
    data() {
        return {
            resetPassword:false,
            remainingTime: 60,
            intervalId: null,
            errors: [],
            form: {
                device_token: null,
                username: "ctm-01",
                password: "12345678",
                confirm_password: "",
                old_password: "",
                otp: "",
            },

            loading: false,
            otpDialog: false

        };
    },
    computed: {

        ...mapState({
            message: (state) => state.success_message,

        }),
        ...mapGetters(["getLoginresponse", "getOtpresponse"]),
    },

    async created() {
        const fingerprint = await getFingerprint();
        this.form.device_token = fingerprint;
    },

    methods: {

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
        submitResetPassword() {
            this.loading = true;
            this.$axios
                .post("admin/reset/password", this.form, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then((result) => {
                    this.loading = false;
                    console.log(result, 'result')
                    if (result.data.success == true) {
                        this.$toast.success(result.data.message);
                        this.resetPassword=false;
                    } else {
                        this.$refs.form.setErrors(result.data.errors);
                    }
                })
                .catch((err) => {
                    this.loading = false;
                    if (err.response) {
                        if (err.response.data.success == false) {
                            console.log(err.response.data, 'und');
                            console.log(err.response.data.error_code, 'und');
                            if (err.response.data.error_code == "verify_failed") {
                                let errs = {
                                    "otp": [err.response.data.message]
                                }
                                this.$refs.form.setErrors(errs);
                                this.$toast.error(err.response.data.message);

                            }
                            if (err.response.data.error_code == "device_not_found") {
                                 
                                 this.$toast.error(err.response.data.message);
 
                             }
                        } else if (err.response) {
                            this.$refs.form.setErrors(err.response.data.errors);
                        }
                    }

                });
        },
        onFinish() {
            this.loading = true;
            this.$axios
                .post("admin/login", this.form, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then((result) => {
                    this.loading = false;
                    console.log(result, 'result')
                    if (result.data.success == true) {
                        this.$toast.success(result.data.message);
                        let data = {
                            permissions: result
                                .data
                                .permissions,
                            token: result
                                .data.token,
                            user: result
                                .data.data,
                        };
                        this.$store.dispatch("login", data);
                        this.$router.push({
                            path: "/",
                        });
                        // this.otpDialog = true;
                        //                 this.startCountdown();

                    } else {
                        this.$refs.form.setErrors(result.data.errors);

                    }

                })
                .catch((err) => {
                    this.loading = false;
                    if (err.response) {
                        if (err.response.data.success == false) {
                            console.log(err.response.data, 'und');
                            console.log(err.response.data.error_code, 'und');
                            if (err.response.data.error_code == "verify_failed") {
                                let errs = {
                                    "otp": [err.response.data.message]
                                }
                                this.$refs.form.setErrors(errs);
                                this.$toast.error(err.response.data.message);

                            }
                            if (err.response.data.error_code == "device_not_found") {
                                 
                                 this.$toast.error(err.response.data.message);
 
                             }
                        } else if (err.response) {
                            this.$refs.form.setErrors(err.response.data.errors);
                        }
                    }

                });
        },
        submitLogin: async function () {
            this.loading = true;
            this.$axios
                .post("admin/login/otp", this.form, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then((result) => {
                    this.loading = false;
                    console.log(result, 'result')
                    if (result.data.success == true) {
                        this.$toast.success(result.data.message);

                        this.otpDialog = true;
                        this.startCountdown();

                    } else {
                        this.$refs.form.setErrors(result.data.errors);
                    }

                })
                .catch((err) => {
                    this.loading = false;
                    if (err.response) {
                        if (err.response.data.success == false) {
                            console.log(err.response.data, 'und');
                            console.log(err.response.data.error_code, 'und');
                            if (err.response.data.error_code == "wrong_email_or_password") {
                                let errs = {
                                    "password": [err.response.data.message]
                                }
                                this.$refs.form.setErrors(errs);
                            }
                            if (err.response.data.error_code == "device_not_found") {
                                 
                                 this.$toast.error(err.response.data.message);
                             }
                            if (err.response.data.error_code == "user_default_password") {
                                 
                                this.$toast.error(err.response.data.message);
                                 this.resetPassword=true
 
                             }
                        } else if (err.response) {
                            this.$refs.form.setErrors(err.response.data.errors);
                        }
                    }

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

.h-100vh {
    height: 100vh;
}

.loginLeft {
    background: linear-gradient(180deg, rgba(43, 48, 75, 1) 54%, rgba(63, 43, 150, 1) 134%);
}

.loginBox {
    height: 100%;
}

.loginAppShadow {
    border-width: 0px;
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100% !important;
    height: 100% !important;
    background-color: rgba(43, 43, 43, 0.6823529411764706);
    border: none;
    border-radius: 0px;
}

.position-relative {
    position: relative;
}

.w-100 {
    width: 100%;
}
</style>
