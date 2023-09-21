<template>
    <v-container class="fill-height d-flex align-center justify-center">
        <v-card class="mx-auto my-12 justify-center" width="40%">
            <template slot="progress">
                <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
            </template>

            <!-- <v-img
      height="250"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
    ></v-img> -->
            <div class="d-flex justify-center py-4">
                <div class="logo">
                    <router-link to="/">
                        <!-- <Logo /> -->LOGO
                    </router-link>
                </div>
            </div>
            <v-card-title class="justify-center"><b>Forgot Password</b></v-card-title>

            <v-card-text>
                Please Enter Your Phone Number
                <v-text-field type="number" label="Phone" v-model="form.phone" :error="errors && errors.phone"
                    :error-messages="errors ? errors.phone : []" />
            </v-card-text>

            <v-card-actions>
                <v-btn color="primary lighten-2" block @click="sendOtp">
                    Send OTP
                </v-btn>
            </v-card-actions>
        </v-card>

        <v-dialog persistent v-model="otpDialog" width="350">
            <v-card style="justify-content: center; text-align: center">
                <v-card-title class="font-weight-bold justify-center">
                    OTP
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <p>You will get a verification code to your register number.</p>
                    <v-otp-input v-model="form.otp" :loading="loading" @finish="onFinish"></v-otp-input>
                    <p>Remaining time: {{ remainingTime }} sec</p>
                </v-card-text>

            </v-card>
        </v-dialog>

    </v-container>
</template>

<script>
import Form from 'vform'
import axios from 'axios';
import { getFingerprint } from '../../plugins/fingerprint.js';

export default {
    data: () => ({
        loading: false,
        selection: 1,
        form: new Form({
            device_token: 'admin@ctm.com',
            phone: '',
            otp: '',
            password: '',
            confirm_password: '',
        }),
        otpDialog: false,
        remainingTime: 60,
        apiUrl: 'http://127.0.0.1:8000/api/v1/admin/forgot-password',
        bearerToken: '4|1QjdA8vjG15B4ImbcOI5Kr0r7uuRAjJKpwoU2s5f40c5d6bc',
        errors: [],
    }),
    async created() {
        const fingerprint = await getFingerprint();
        this.form.device_token = fingerprint;
        console.log(this.form.device_token);
    },
    methods: {
        sendOtp() {
            this.loading = true

            const headers = {
                'Authorization': `Bearer ${this.bearerToken}`, // Add the bearer token to the Authorization header
                'Content-Type': 'application/json', // You can set other headers as needed
            };

            const data = {
                phone: this.form.phone,
            };

            axios({
                method: 'post', // Specify the HTTP method (GET, POST, PUT, DELETE, etc.)
                url: this.apiUrl,    // Specify the URL of the API endpoint
                headers: headers, // Pass the headers containing the bearer token
                data: data, // Include request data if needed (e.g., for POST or PUT requests)
            })
                .then(response => {
                    // Handle the successful response here
                    var token = null;
                    this.otpDialog = true;
                    console.log('Response Data:', response);
                    console.log('Response Data:', response.data);
                    if (response.data.success) {
                        this.otpDialog = true
                        this.startCountdown();
                        // this.$router.push({
                        //     path: "/",
                        // })
                    }
                    // console.log('Response Token:', response.data.authorisation.token);
                    // token = response.data.authorisation;
                    // this.$store.dispatch('login', token);
                    // this.$router.push('/');

                })
                .catch(err => {
                    this.loading = false;
                    // console.log(err.response.data);
                    console.log(err.response.data.errors);
                    // console.log(err.response.data.errors.phone);
                    this.errors = err.response.data.errors;
                    // this.errors = JSON.stringify(err.response.data.errors.message);
                });


            // this.axios.post("/admin/forgot-password/submit", this.form)
            //     .then((response) => {
            //         this.loading = false;
            //         console.log(response, 'final')
            //         // console.log(response.data.permissions)
            //         if (response.data.success) {
            //             // this.otpDialog = true
            //             // this.startCountdown();
            //             this.$router.push({
            //                 path: "/",
            //             })
            //         }
            //     })
            //     .catch((err) => {
            //         this.loading = false;
            //         console.log(err.response.data)
            //         this.errors = err.response.data.errors
            //     })
        },
        onFinish() {

        },
        startCountdown() {
            this.intervalId = setInterval(() => {
                if (this.remainingTime > 0) {
                    this.remainingTime--;
                } else {
                    clearInterval(this.intervalId);
                    this.otpDialog = false
                    this.remainingTime = 60
                }
            }, 1000); // Update every second (1000 milliseconds)
        },
        reserve() {
            this.loading = true

            setTimeout(() => (this.loading = false), 2000)
        },
    },
}
</script>

<style lang="">
    
</style>