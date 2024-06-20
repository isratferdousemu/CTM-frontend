<script>
import { extend, ValidationProvider, ValidationObserver } from "vee-validate";
extend("checkUsername", {
    validate: (value) => {
        if (!value && value !== 0) {
            return false;
        }
        // Check if all characters are numeric and not allow special characters
        const isValid = /^[a-z][a-z0-9._]*$/.test(value);

        // Return true if both conditions are met
        return isValid;
    },
    message: "Username should be in lowercase and without any special character",
});


extend('name', {
    validate: value => {
        // Regular expression for IP address validation
        const nameRegex = /^[a-zA-Z\s'().]+$/;
        return nameRegex.test(value);
    },
    message: 'Please enter a valid  Name'
});
extend('mobile', {
    validate: value => {
        // Regular expression to match phone numbers with a maximum length of 14 characters

        const mobileRegex = /^01[3-9][0-9]{8}$/;;
        return mobileRegex.test(value);

    },
    message: 'Please enter a valid phone number'
});
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




export default {
    name: "ParticipantCreate",
    title: "CTM -Training Registration",
    components: {
        ValidationProvider,
        ValidationObserver,


        // Use the <ckeditor> component in this view.


    },

    data() {
        return {




            users: [],
            organizations: [],
            poll_programs: [],
            circulars: [],
            programs: [],
            getPartipant: 0,
            user_type_id: null,
            userType: [
                {
                    id: 1,
                    value_en: "Office User",
                    value_bn: "অফিস ব্যবহারকারী",
                },
                {
                    id: 2,
                    value_en: "Committee User",
                    value_bn: "কমিটির ব্যবহারকারী",
                },
            ],
            status_types: [{ "id": 0, "value_en": "Pending", "value_bn": "পেন্ডিং" },
            { "id": 1, "value_en": "Completed", "value_bn": "সম্পন্ন" },
            { "id": 2, "value_en": "Not completed", "value_bn": "সম্পন্ন নয় " }],


            data: {
                training_program_id: null,
                training_circular_id: null,
               
                status: null,
        


            },
            
        };
    },
    computed: {
        language: {
            get() {
                return this.$store.getters.getAppLanguage;
            }
        },


    },



    mounted() {
        // this.Program();
        this.onChangeUserType();

        this.GetCircular();
        this.DataView();



    },


    methods: {
        DataView() {
            this.$axios
                .get(`admin/training/participants/${this.$route.params.id}`, {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((result) => {


                    this.data.training_circular_id = result?.data?.data.training_circular_id;
                    this.change();
                    this.data.training_program_id = result?.data?.data.training_program_id;
                    this.data.status = result?.data?.data.status;
                    this.data._method = "PUT"
                  
                    

                })
                .catch((err) => {
                    if (this.$refs.formAdd && this.$refs.formAdd.$refs && this.$refs.formAdd.$refs.operator) {

                        this.$refs.formAdd.$refs.operator.setErrors([err.response.data.errors.operator[0]]);
                    } else {
                        console.error('Error setting errors:', err);
                    }

                });

        },
        change() {
            this.data.training_circular_id = null;
            this.data.training_program_id = null;
            this.data.username = null;
            this.data.email = null;
            this.data.full_name = null;
            this.data.mobile = null;
        },

        setParticipant(value) {
            // Toggle value to trigger re-render
            if (this.getPartipant === value) {
                this.getPartipant = null;
                this.$nextTick(() => {
                    this.getPartipant = value;
                });
            } else {
                this.getPartipant = value;
            }
            console.log(value, "value");
            console.log(this.getPartipant, "getPartipant");
        }
        ,
        change() {
            this.programs = [];
            this.training_program_id=null;
            const selected_programs = this.circulars.find(circular => circular.id == this.data.training_circular_id);
            this.programs = selected_programs?.programs
            console.log(this.programs, "programs");



        },
      

        getItemText(item) {
            return this.language === 'bn' ? item.value_bn : item.value_en;
        },

        itemText(item) {
            return `${item.circular_name} - ${item.id}`;
        }
        ,
        getprogram(item) {
            return `${item.program_name} - ${item.id}`;
        },
        async GetCircular() {

            this.$axios
                .get("/admin/training/participants/circulars", {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },

                })
                .then((result) => {

                    this.circulars = result?.data?.data;

                });
        },
        async onChangeUserType() {

            this.$axios
                .get(`/admin/training/participants/users/3`, {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },

                })
                .then((result) => {

                    this.users = result?.data?.data;


                });
        },




        async updateForm() {
            // this.data.is_external = parseInt(this.data.is_external, 10); // or +this.data.is_external

            await this.$axios
                .post(`admin/training/participants/${this.$route.params.id}`, this.data, {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((result) => {

                    this.$toast.success(result.data.message);
                    this.$router.push("/training-management/participant");


                })
                .catch((err) => {
              
                    // this.$toast.error(err.response.data.errors);
                    if (err?.response?.data?.errors?.training_program_id && Array.isArray(err.response.data.errors.training_program_id) && err.response.data.errors.training_program_id.length > 0) {
                        this.$toast.error(err.response.data.errors.training_program_id[0]);
                    }
                    if (err?.response?.data?.errors?.training_circular_id && Array.isArray(err.response.data.errors.training_circular_id) && err.response.data.errors.training_circular_id.length > 0) {
                        this.$toast.error(err.response.data.errors.training_circular_id[0]);
                    }
                    // 
                    // this.$refs.form.setErrors(err.response.data.errors);  




                });

        },
        async submitPoll() {

            await this.$axios
                .post("admin/training/participants/external", this.poll, {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((result) => {

                    this.$toast.success(result.data.message);
                    this.$router.push("/training-management/participant");


                })
                .catch((err) => {
                    if (err?.response?.data?.errors?.training_program_id[0]) {
                        if (this.language == 'en') {
                            this.$toast.error("This program has already been taken by this participant");
                        }
                        else {
                            this.$toast.error("এই প্রোগ্রামটি ইতিমধ্যে এই অংশগ্রহণকারী দ্বারা নেওয়া হয়েছে");
                        }


                    }



                });

        },



    },
};
</script>

<template>
    <div id="participant_create">
        <v-row class="mx-5 mt-5">
            <v-col cols="12">
                <v-row>

                    <v-col cols="12">
                        <v-card>

                            <v-card-title class="justify-center" style="background-color: #1C3B68; color: white;">
                                <h4 class="white--text">
                                    {{ $t('container.training_management.training_registration.add_3') }}
                                </h4>
                            </v-card-title>



                            <v-card-text class="mt-10">
                                <ValidationObserver ref="form" v-slot="{ invalid }">
                                    <v-form v-on:submit.prevent="updateForm()">

                                        <v-row class="mx-10 no-gap-row">
                                            <!-- <v-col cols="12" sm="6" lg="6">
                                                <ValidationProvider name="Trainer Type" vid="is_external"
                                                    rules="required" v-slot="{ errors }">
                                                    <v-select @input="change()" dense type="text"
                                                        v-model="data.is_external" :label="$t('container.training_management.trainer_info.trainer_type')
                                        " :items="training_types" :item-text="getItemText" item-value="id"
                                                        persistent-hint outlined :error="errors[0] ? true : false"
                                                        :error-messages="errors[0] ? (language == 'bn' ? 'অনুগ্রহ পূর্বক প্রশিক্ষকের ধরন প্রদান করুন '
                                        : 'Please enter  Trainer Type') : ''"></v-select>
                                                </ValidationProvider>
                                            </v-col> -->
                                            <!-- <v-col cols=" 12" smdata.="6" lg="6" v-if="data.is_external == 0">
                                                <ValidationProvider name="Participant" vid="user_id" rules="required"
                                                    v-slot="{ errors }">
                                                    <v-autocomplete dense type="text" v-model="data.user_id"
                                                        :label="$t('container.training_management.training_registration.participant')"
                                                        persistent-hint outlined :error="errors[0] ? true : false"
                                                        :items="users" item-text="full_name" item-value="id"
                                                        :error-messages="errors[0] ? (language == 'bn' ? 'অনুগ্রহ পূর্বক অংশগ্রহণকারী প্রদান করুন '
                                        : 'Please enter valid participant') : ''">

                                                    </v-autocomplete>
                                                </ValidationProvider>
                                            </v-col> -->

                                            <v-col cols=" 12" sm="6" lg="6">
                                                <ValidationProvider name="training_circular_id"
                                                    vid="training_circular_id" rules="required" v-slot="{ errors }">
                                                    <v-autocomplete dense type="text"
                                                        v-model="data.training_circular_id" @input="change()"
                                                        :label="$t('container.training_management.training_program.training_circular')"
                                                        persistent-hint outlined :error="errors[0] ? true : false"
                                                        :items="circulars" :item-text="itemText" item-value="id"
                                                        :error-messages="errors[0] ? (language == 'bn' ? 'অনুগ্রহ পূর্বক সার্কুলার প্রদান করুন '
                                        : 'Please enter Circular') : ''">

                                                    </v-autocomplete>
                                                </ValidationProvider>
                                            </v-col>
                                            <v-col cols="12" sm="6" lg="6">
                                                <ValidationProvider name="Program Name" vid="training_program_id"
                                                    rules="required" v-slot="{ errors }">
                                                    <v-autocomplete dense type="text" v-model="data.training_program_id"
                                                        :items="programs" :item-text="getprogram" item-value="id"
                                                        :label="$t('container.training_management.training_program.program')
                                        " persistent-hint outlined :error="errors[0] ? true : false" :error-messages="errors[0] ? (language == 'bn' ? 'অনুগ্রহ পূর্বক প্রোগ্রাম প্রদান করুন '
                                        : 'Please enter a Program') : ''"></v-autocomplete>
                                                </ValidationProvider>
                                            </v-col>
                                            <!-- <v-col cols="12" sm="6" lg="6" v-if="data.is_external == 1">
                                                <ValidationProvider name="Username" rules="required||checkUsername"
                                                    vid="user_name" v-slot="{ errors }">
                                                    <v-text-field dense v-model="data.username" :label="$t('container.training_management.training_registration.user_name')
                                        " persistent-hint outlined :error="errors[0] ? true : false"
                                                        :error-messages="errors[0] ? (language == 'bn' ? 'অনুগ্রহ পূর্বক ব্যবহারকারীর নাম প্রদান করুন। ব্যবহারকারীর নাম অবশ্যই ছোট হাতের অক্ষরে এবং কোনো বিশেষ অক্ষর ছাড়াই হতে হবে'
                                        : 'Please enter  Username.Username should be in lowercase and without any special character') : ''"></v-text-field>
                                                </ValidationProvider>
                                            </v-col>
                                            <v-col cols="12" sm="6" lg="6" v-if="data.is_external == 1">
                                                <ValidationProvider name="Participant" rules="required||name"
                                                    vid="poll.participant" v-slot="{ errors }">
                                                    <v-text-field dense v-model="data.full_name" :label="$t('container.training_management.training_registration.full_name')
                                        " persistent-hint outlined :error="errors[0] ? true : false" :error-messages="errors[0] ? (language == 'bn' ? 'অনুগ্রহ পূর্বক গ্রহণযোগ্য সম্পূর্ণ নাম প্রদান করুন ।'
                                        : 'Please enter valid  Full Name') : ''"></v-text-field>
                                                </ValidationProvider>
                                            </v-col>
                                            <v-col cols="12" sm="6" lg="6" v-if="data.is_external == 1">
                                                <ValidationProvider name="Mobile" vid="mobile" rules="required||mobile"
                                                    v-slot="{ errors }">
                                                    <v-text-field dense type="text" v-model="data.mobile" :label="$t('container.training_management.trainer_info.mobile')
                                        " persistent-hint outlined :error="errors[0] ? true : false" :error-messages="errors[0] ? (language == 'bn' ? 'অনুগ্রহ পূর্বক গ্রহণযোগ্য মোবাইল নম্বর প্রদান করুন '
                                        : 'Please enter a valid Mobile Number') : ''"></v-text-field>
                                                </ValidationProvider>
                                            </v-col>

                                            <v-col cols="12" sm="6" lg="6" v-if="data.is_external == 1">
                                                <ValidationProvider name="Email" vid="email"
                                                    rules="required||email||bangla" v-slot="{ errors }">
                                                    <v-text-field placeholder="xxx@gmail.com" dense type="email"
                                                        v-model="data.email" :label="$t('container.training_management.trainer_info.email')
                                        " persistent-hint outlined :error="errors[0] ? true : false" :error-messages="errors[0] ? (language == 'bn' ? 'অনুগ্রহ পূর্বক গ্রহণযোগ্য ইমেইল প্রদান করুন '
                                        : 'Please enter a valid Email') : ''"></v-text-field>
                                                </ValidationProvider>
                                            </v-col> -->
                                            <v-col cols="12" sm="6" lg="6">
                                                <ValidationProvider name="Trainer Type" vid="is_external"
                                                    rules="required" v-slot="{ errors }">
                                                    <v-select dense type="text"
                                                        v-model="data.status" :label="$t('container.training_management.training_registration.result')
                                        " :items="status_types" :item-text="getItemText" item-value="id"
                                                        persistent-hint outlined :error="errors[0] ? true : false"
                                                        :error-messages="errors[0] ? (language == 'bn' ? 'অনুগ্রহ পূর্বক প্রশিক্ষকের ধরন প্রদান করুন '
                                        : 'Please enter  Trainer Type') : ''"></v-select>
                                                </ValidationProvider>
                                            </v-col>



                                        </v-row>
                                        <v-row class="justify-end mt-5 mb-5">
                                            <v-btn color="primary" class="custom-btn mr-2" router
                                                to="/training-management/participant" v-can="'participant-view'">{{
                                                $t("container.list.back") }}
                                            </v-btn>
                                            <v-btn color="success" type="submit" class="custom-btn mr-2"
                                                :disabled="invalid">
                                                {{ $t("container.list.update") }}
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

<style>
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
.no-gap-row {
    margin-left: 0 !important;
    margin-right: 0 !important;
}

.no-gap-row .v-col {
    padding-left: 0 !important;
    padding-right: 0 !important;
}
</style>