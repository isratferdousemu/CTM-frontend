<script>
import { extend, ValidationProvider, ValidationObserver } from "vee-validate";

import { mapActions, mapState } from "vuex";

extend('email', {
    validate: value => {
        // Regular expression for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    },
    message: 'Please enter a valid email address'
});
extend('bangla', {
    validate: value => {
        // Regular expression to match Bangla characters
        // const banglaRegex = /^[\u0980-\u09FF\s]+$/;
        const nonBanglaRegex = /^[^\u0980-\u09FF]*$/;
        return nonBanglaRegex.test(value);
    },
    message: 'Bangla characters are not allowed in this field'
});
extend('ip_address', {
    validate: value => {
        // Regular expression for IP address validation
        const ipRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
        return ipRegex.test(value);
    },
    message: 'Please enter a valid IP address'
});
extend('phone', {
    validate: value => {
        // Regular expression to match phone numbers with a maximum length of 14 characters
        const phoneRegex = /^[0-9]{7,14}$/;
        return phoneRegex.test(value);
    },
    message: 'Please enter a valid phone number'
});
extend('end_date', {
    validate(value, { start_date }) {
        // Check if both start_date and end_date are provided
        if (value && start_date) {
            // Convert start_date and end_date to Date objects
            const startDate = new Date(start_date);
            const endDate = new Date(value);

            // Compare start_date and end_date
            return endDate >= startDate;
        }
        // If start_date is not provided, return true
        return true;
    },
    params: ['start_date'],
    message: 'The End Date must be greater than or equal to the Start Date'
});
extend('start_date', {
    validate(value, { end_date }) {
        // Check if both start_date and end_date are provided
        if (value && end_date) {
            // Convert start_date and end_date to Date objects
            const endDate = new Date(end_date);
            const startDate = new Date(value);

            // Compare start_date and end_date
            return endDate >= startDate;
        }
        // If start_date is not provided, return true
        return true;
    },
    params: ['end_date'],
    message: 'The Start Date must be less than or equal to the End Date'
});

extend("checkNumber", {
  validate: (value) => {
    if (!value && value !== 0) {
      return false;
    }
    // Check if all characters are numeric and not allow special characters
    const isNumeric = /^[0-9]+$/.test(value);

    // Check if the length is either 10 or 17 characters
    const isCorrectLength = value.length === 10 || value.length === 17;

    // Return true if both conditions are met
    return isNumeric && isCorrectLength;
  },
  message: "This is required field and field must be a number with either 10 or 17 characters",
});

export default {
    name: "GenerateDataReceiver",
    title: "CTM - Generate Data Receiver",
    components: {
        ValidationProvider,
        ValidationObserver,
    },

    data() {
        return {
     
            

            data: {
                organization_name: null,
                organization_phone: null,
                organization_email: null,
                responsible_person_email:null,
                responsible_person_nid: null,
                username: null,
                whitelist_ip: null,
                start_date: null,
                end_date: null,
                api_list:[]
            },
            apis:[]
        };
    },

    watch: {
        "$i18n.locale": "updateHeaderTitle",
    },

   

    mounted() {
        this.GetAPI();
      
        this.updateHeaderTitle();
    },

    methods: {
        async GetAPI() {

            this.$axios
                .get("/admin/get-api-list", {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },

                })
                .then((result) => {

                    this.apis = result?.data?.data;
                    console.log(this.apis,"apis")

                });
        },

    

        submitDataReceiver() {
            this.$axios
                .post("admin/api-data-receive", this.data, {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((result) => {
                  
                        this.$toast.success(result.data.message);
                        this.$router.push("/api-manager/data-receiver");
                

                })
                .catch((err) => {
                    console.log(err, "err")
                    this.$refs.form.setErrors(err.response.data.errors);   

                });

        },
       
        updateHeaderTitle() {
            const title = this.$t("container.system_config.device.add");
            this.$store.commit("setHeaderTitle", title);
        },
    },
};
</script>

<template>
    <div id="device_create">
        <v-row class="mx-5 mt-5">
            <v-col cols="12">
                <v-row>
                    <v-col cols="12">
                        <v-card>
                            <v-card-title class="justify-center">
                                <h4 class="mt-5">
                                    {{ $t("container.api_manager.data_receiver.add") }}
                                </h4>
                            </v-card-title>

                            <!-- <v-divider></v-divider> -->

                            <v-card-text class="mt-10">
                                <ValidationObserver ref="form" v-slot="{ invalid }">
                                    <v-form v-on:submit.prevent="submitDataReceiver()">

                                        <v-row class="mx-10">
                                            <v-col cols="12" sm="6" lg="6">
                                                <ValidationProvider name="Organization Name" vid="organization_name"
                                                    rules="required" v-slot="{ errors }">
                                                    <v-text-field dense type="text" v-model="data.organization_name"
                                                        :label="$t('container.api_manager.data_receiver.organization')
                                        " persistent-hint outlined :error="errors[0] ? true : false"
                                                        :error-messages="errors[0]"
                                                        class="mb-5 my-sm-0 my-3 mx-0v -input--horizontal"></v-text-field>
                                                </ValidationProvider>
                                            </v-col>
                                            <v-col cols="12" sm="6" lg="6">
                                                <ValidationProvider name="Organization Phone" vid="organization_phone"
                                                    rules="required||phone" v-slot="{ errors }">
                                                    <v-text-field dense type="text" v-model="data.organization_phone"
                                                        :label="$t('container.api_manager.data_receiver.phone')
                                        " persistent-hint outlined :error="errors[0] ? true : false"
                                                        :error-messages="errors[0]"></v-text-field>
                                                </ValidationProvider>
                                            </v-col>
                                            <v-col cols="12" sm="6" lg="6">
                                                <ValidationProvider name="Organization Email" vid="organization_email"
                                                    rules="required||email||bangla" v-slot="{ errors }">
                                                    <v-text-field dense type="email" placeholder="xxx@gmail.com"
                                                        v-model="data.organization_email" :label="$t('container.api_manager.data_receiver.email')
                                        " persistent-hint outlined :error="errors[0] ? true : false"
                                                        :error-messages="errors[0]"></v-text-field>
                                                </ValidationProvider>
                                            </v-col>
                                            <v-col cols="12" sm="6" lg="6">
                                                <ValidationProvider name="Responsible Person Email"
                                                    vid="responsible_person_email" rules="required||email||bangla"
                                                    v-slot="{ errors }">
                                                    <v-text-field placeholder="xxx@gmail.com" dense type="email"
                                                        v-model="data.responsible_person_email" :label="$t('container.api_manager.data_receiver.responsible_person_email')
                                        " persistent-hint outlined :error="errors[0] ? true : false"
                                                        :error-messages="errors[0]"></v-text-field>
                                                </ValidationProvider>
                                            </v-col>
                                            <v-col cols="12" sm="6" lg="6">
                                                <ValidationProvider name="Responsible Person NID"
                                                    vid="responsible_person_nid" rules="required||checkNumber"
                                                    v-slot="{ errors }">
                                                    <v-text-field dense v-model="data.responsible_person_nid" :label="$t('container.api_manager.data_receiver.responsible_person_nid')
                                        " persistent-hint outlined :error="errors[0] ? true : false"
                                                        :error-messages="errors[0]"></v-text-field>
                                                </ValidationProvider>
                                            </v-col>
                                            <v-col cols="12" sm="6" lg="6">
                                                <ValidationProvider name="Select API" vid="api_list" rules="required"
                                                    v-slot="{ errors }">
                                                    <v-autocomplete dense multiple type="text" v-model="data.api_list"
                                                        :label="$t('container.api_manager.data_receiver.select_api')"
                                                        persistent-hint outlined :error="errors[0] ? true : false"
                                                        :items="apis" item-text="name" item-value="id"
                                                        :error-messages="errors[0]" class="select-with-chips">
                                                        <!-- Slot for chips -->
                                                        <template v-slot:selection="{ item }">
                                                            <v-chip color="#169BD5" class="white--text ma-1">{{ item.name
                                                                }}</v-chip>
                                                        </template>
                                                    </v-autocomplete>
                                                </ValidationProvider>


                                            </v-col>
                                            <v-col cols="12" sm="6" lg="6">
                                                <ValidationProvider name="Server IP Address" vid="whitelist_ip"
                                                    rules="required||ip_address" v-slot="{ errors }">
                                                    <v-text-field placeholder="x.x.x.x" dense
                                                        v-model="data.whitelist_ip" :label="$t('container.api_manager.data_receiver.ip')
                                        " persistent-hint outlined :error="errors[0] ? true : false"
                                                        :error-messages="errors[0]"></v-text-field>
                                                </ValidationProvider>
                                            </v-col>
                                            <v-col cols="12" sm="6" lg="6">
                                                <ValidationProvider name="Auth 
                                                
                                                key" vid="username"
                                                    rules="required||bangla" v-slot="{ errors }">
                                                    <v-text-field dense v-model="data.username" :label="$t('container.api_manager.data_receiver.user_name')
                                        " persistent-hint outlined :error="errors[0] ? true : false"
                                                        :error-messages="errors[0]"></v-text-field>
                                                </ValidationProvider>
                                            </v-col>
                                            <v-col cols="12" sm="6" lg="6">
                                                <ValidationProvider name="Start Date" vid="start_date"
                                                    :rules="{ required, start_date: data.end_date }"
                                                    v-slot="{ errors }">
                                                    <v-text-field dense type="date" v-model="data.start_date" :label="$t('container.api_manager.data_receiver.start_date')
                                        " persistent-hint outlined :error="errors[0] ? true : false"
                                                        :error-messages="errors[0]"
                                                        
                                                        ></v-text-field>
                                                </ValidationProvider>
                                            </v-col>
                                            <v-col cols="12" sm="6" lg="6">
                                                <ValidationProvider name="End Date" vid="end_date"
                                                    :rules="{ required, end_date: data.start_date }"
                                                    v-slot="{ errors }">
                                                    <v-text-field dense type="date" v-model="data.end_date" :label="$t('container.api_manager.data_receiver.end_date')
                                        " persistent-hint outlined :error="errors[0] ? true : false"
                                                        :error-messages="errors[0]"></v-text-field>
                                                </ValidationProvider>
                                            </v-col>







                                        </v-row>
                                        <v-row class="justify-end mt-5 mb-5">
                                            <v-btn flat color="primary" class="custom-btn mr-2" router
                                                to="/api-manager/data-receiver">{{
                                                $t("container.list.back") }}
                                            </v-btn>
                                            <v-btn flat color="success" type="submit" class="custom-btn mr-2"
                                                :disabled="invalid">
                                                {{ $t("container.list.submit") }}
                                            </v-btn>
                                        </v-row>
                                    </v-form>
                                </ValidationObserver>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </div>
</template>

<style >
.gradient-background {
    background: linear-gradient(to right, #87CEEB, #ADD8E6, #F0F8FF);
    color: black;
    /* Adjust text color for better contrast */
    border-radius: 10px;
    /* Add rounded corners for a softer look */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    /* Add a subtle shadow for depth */

    /* Add a subtle animation */
    animation: gradient-animation 10s infinite alternate;
}

/* Define the animation */
@keyframes gradient-animation {
    0% {
        background-position: 0% 50%;
    }

    100% {
        background-position: 100% 50%;
    }
}
</style>