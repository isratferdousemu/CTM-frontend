
<template>
    <div id="device_create">
        <v-row class="mx-5 mt-5">
            <v-col cols="12">
                <v-row>
                    <v-col cols="12">
                        <v-card>
                            <v-card-title class="justify-center"
                                style="background-color: #1C3B68; color: white;">
                                <h3>
                                    {{ $t("container.training_management.trainer_info.edit") }}
                                </h3>
                            </v-card-title>

                            <!-- <v-divider></v-divider> -->

                            <v-card-text class="mt-10 ">
                                <ValidationObserver ref="form" v-slot="{ invalid }">
                                    <v-form v-on:submit.prevent="updateForm()">

                                        <v-row class="mx-10 no-gap-row">
                                            <!-- <v-col cols="12" sm="6" lg="6">
                                                <ValidationProvider name="Trainer Type" vid="is_external"
                                                    rules="required" @input="changeTrainer()" v-slot="{ errors }">
                                                    <v-select readonly @input="changeTrainer()" dense type="text"
                                                        v-model="data.is_external" :label="$t('container.training_management.trainer_info.trainer_type')
                                        " :items="trainer_types" :item-text="getItemText" item-value="id"
                                                        persistent-hint outlined :error="errors[0] ? true : false"
                                                        :error-messages="errors[0] ? (language == 'bn' ? 'অনুগ্রহ পূর্বক প্রশিক্ষকের ধরন প্রদান করুন '
                                        : 'Please enter  Trainer Type') : ''"></v-select>
                                                </ValidationProvider>
                                            </v-col> -->
                                            <!-- <v-col cols="12" sm="6" lg="6" v-if="data.is_external == 0">
                                                <ValidationProvider name="User" vid="user_id" rules="required"
                                                    v-slot="{ errors }">
                                                    <v-select readonly dense @input="change()" type="text"
                                                        v-model="data.user_id" :label="$t('container.training_management.training_registration.user_name')
                                        " :items="users" item-text="username" item-value="id" persistent-hint outlined
                                                        :error="errors[0] ? true : false" :error-messages="errors[0] ? (language == 'bn' ? 'অনুগ্রহ পূর্বক ব্যবহারকারীর নাম প্রদান করুন '
                                        : 'Please enter  UserName') : ''"></v-select>
                                                </ValidationProvider>
                                            </v-col> -->
                                            <!-- <v-col cols="12" sm="6" lg="6" v-if="data.is_external == 1">
                                                <ValidationProvider name="User" vid="user_id"
                                                    rules="required||checkUsername" v-slot="{ errors }">
                                                    <v-text-field dense type="text" v-model="data.username" :label="$t('container.training_management.training_registration.user_name')
                                        " persistent-hint outlined :error="errors[0] ? true : false"
                                                        :error-messages="errors[0] ? (language == 'bn' ? 'অনুগ্রহ পূর্বক  ছোট হাতের এবং কোনো বিশেষ অক্ষর ছাড়া  ব্যবহারকারীর নাম লিখুন প্রদান করুন '
                                        : 'Please enter  UserName with lowercase and without any special character') : ''"></v-text-field>
                                                </ValidationProvider>
                                            </v-col> -->
                                            <v-col cols="12" sm="6" lg="6">
                                                <ValidationProvider name="Participant" rules="required||name" vid="name"
                                                    v-slot="{ errors }">
                                                    <v-text-field dense v-model="data.name" :label="$t('container.training_management.training_registration.full_name')
                                        " persistent-hint outlined :error="errors[0] ? true : false" :error-messages="errors[0] ? (language == 'bn' ? 'অনুগ্রহ পূর্বক গ্রহণযোগ্য সম্পূর্ণ নাম প্রদান করুন ।'
                                        : 'Please enter valid  Full Name') : ''"></v-text-field>
                                                </ValidationProvider>
                                            </v-col>





                                            <v-col cols=" 12" sm="6" lg="6">
                                                <ValidationProvider name="Designation" vid="designation"
                                                    rules="required" v-slot="{ errors }">
                                                    <v-select dense type="text" v-model="data.designation_id"
                                                        :label="$t('container.training_management.trainer_info.designation')"
                                                        persistent-hint outlined :error="errors[0] ? true : false"
                                                        :items="designations" :item-text="getItemText" item-value="id"
                                                        :error-messages="errors[0] ? (language == 'bn' ? 'অনুগ্রহ পূর্বক পদবী প্রদান করুন '
                                        : 'Please enter Designation') : ''">



                                                    </v-select>
                                                </ValidationProvider>
                                            </v-col>
                                            <v-col cols="12" sm="6" lg="6">
                                                <ValidationProvider name="Mobile" vid="mobile" rules="required||mobile"
                                                    v-slot="{ errors }">
                                                    <v-text-field dense type="text" v-model="data.mobile_no" :label="$t('container.training_management.trainer_info.mobile')
                                        " persistent-hint outlined :error="errors[0] ? true : false" :error-messages="errors[0] ? (language == 'bn' ? 'অনুগ্রহ পূর্বক গ্রহণযোগ্য মোবাইল নম্বর প্রদান করুন '
                                        : 'Please enter  valid Mobile Number') : ''"></v-text-field>
                                                </ValidationProvider>
                                            </v-col>

                                            <v-col cols="12" sm="6" lg="6">
                                                <ValidationProvider name="Email" vid="email"
                                                    rules="required||email||bangla" v-slot="{ errors }">
                                                    <v-text-field placeholder="xxx@gmail.com" dense type="email"
                                                        v-model="data.email" :label="$t('container.training_management.trainer_info.email')
                                        " persistent-hint outlined :error="errors[0] ? true : false" :error-messages="errors[0] ? (language == 'bn' ? 'অনুগ্রহ পূর্বক গ্রহণযোগ্য ইমেইল প্রদান করুন '
                                        : 'Please enter  valid Email') : ''"></v-text-field>
                                                </ValidationProvider>
                                            </v-col>
                                            <v-col cols="12" sm="6" lg="6">
                                                <ValidationProvider name="Address" vid="address" rules="required"
                                                    v-slot="{ errors }">
                                                    <v-textarea dense v-model="data.address" :label="$t('container.training_management.trainer_info.address')
                                        " persistent-hint outlined :error="errors[0] ? true : false" :error-messages="errors[0] ? (language == 'bn' ? 'অনুগ্রহ পূর্বক ঠিকানা প্রদান করুন '
                                        : 'Please enter  Address') : ''"></v-textarea>
                                                </ValidationProvider>
                                            </v-col>
                                            <v-col cols="12" sm="6" lg="6">
                                                <v-row align-end>
                                                    <v-col cols="12" sm="6" lg="6" xl="6" xs="6">
                                                        <v-img :src="imageUrl" style="
                                    width: 145px;
                                    height: 145px;
                                    border: 1px solid #ccc;
                                  " class="mb-5" v-if="imageUrl"></v-img>
                                                        <v-img src="/assets/images/profile.png" v-if="!imageUrl" style="
                                    width: 145px;
                                    height: 145px;
                                    border: 1px solid #ccc;
                                  " class="mb-5"></v-img>

                                                    </v-col>
                                                    <v-col cols="12" sm="6" lg="6" xl="6" xs="6"> <label>{{
                                                            $t('container.application_selection.application.image') }}
                                                            ({{
                                                            $t('container.training_management.trainer_info.image_alert')
                                                            }})</label>

                                                        <ValidationProvider v-slot="{ errors }" name="Image"
                                                            vid="image">
                                                            <v-file-input dense outlined show-size counter
                                                                prepend-outer-icon="mdi-camera" v-model="data.image"
                                                                :placeholder="language == 'bn' ? 'ফাইল নির্বাচন করুন '
                                        : 'Choose File'" accept="image/*" @change="previewImage" prepend-icon=""
                                                                id="image">
                                                            </v-file-input>
                                                        </ValidationProvider>
                                                    </v-col>


                                                </v-row>






                                            </v-col>

                                            <!-- <ValidationProvider name="BIO" vid="description" v-slot="{ errors }">
                                                    <v-textarea dense v-model="data.description" :label="$t('container.training_management.trainer_info.description')
                                        " persistent-hint outlined :error="errors[0] ? true : false" :error-messages="errors[0] ? (language == 'bn' ? 'অনুগ্রহ পূর্বক বায়ো প্রদান করুন '
                                        : 'Please enter  Bio') : ''"></v-textarea>
                                                </ValidationProvider> -->
                                            <v-col cols="12" sm="12" lg="12">

                                                <label>{{ $t('container.training_management.trainer_info.description')
                                                    }}</label>

                                                <vue-editor v-model="data.description" :editor-toolbar="customToolbar">
                                                </vue-editor>

                                            </v-col>






                                        </v-row>
                                        <v-row class="justify-end mt-5 mb-5">
                                            <v-btn flat color="primary" class="custom-btn mr-2" router
                                                to="/training-management/trainer-information">{{
                                                $t("container.list.back") }}
                                            </v-btn>
                                            <v-btn flat color="success" type="submit" class="custom-btn mr-2"
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
.reduce-gap {
    margin-left: -5px;
    margin-right: -5px;
}

.reduce-gap>.v-col {
    padding-left: 5px;
    padding-right: 5px;
}
</style>
<script>
import { extend, ValidationProvider, ValidationObserver } from "vee-validate";
import { VueEditor } from "vue2-editor";
import { mapActions, mapState } from "vuex";
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
    message: 'Please enter  valid  Name'
});

extend('email', {
    validate: value => {
        // Regular expression for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    },
    message: 'Please enter  valid email address'
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

export default {    name: "GenerateDataReceiver",
    title: "CTM - Trainer Information",
    components: {
        ValidationProvider,
        ValidationObserver,
        VueEditor,
    },

    data() {
        return {


            imageUrl: null,
            customToolbar: [
                [{ 'header': [1, 2, false] }],
                ['bold', 'italic', 'underline'],
                // [ 'code-block'],
                [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
                [{ 'indent': '-1' }, { 'indent': '+1' }],
                [{ 'align': [] }],
                ['clean'], // remove formatting button
                ['link'] ,
                [{ 'color': [] }, { 'background': [] }]// removed 'image' from the default toolbar
            ],
            data: {
                name: null,
                designation_id: null,
                mobile_no: null,
                email: null,
                address: null,
                image: null,
                description: null,
                is_external: null,
                username: null,
                full_name: null,


            },
            designations: [],
            users: [],
            trainer_types: [{ "id": 0, "value_en": "Internal Trainer", "value_bn": "অভ্যন্তরীণ প্রশিক্ষক" }, { "id": 1, "value_en": "External Trainer", "value_bn": "বহিরাগত প্রশিক্ষক" }],
        };
    },
    computed: {
        language: {
            get() {
                return this.$store.getters.getAppLanguage;
            }
        },
    },

    watch: {
        "$i18n.locale": "updateHeaderTitle",
    },



    mounted() {
        this.GetUser();
        this.GetData();

        this.updateHeaderTitle();
        this.$store
            .dispatch("getLookupByType", 24)
            .then((res) => (this.designations = res));
    },


    methods: {
        change() {


            this.data.name = null;
            this.imageUrl = null;

            this.data.mobile_no = null;
            this.data.email = null;
            const selected_user = this.users.find(circular => circular.id == this.data.user_id);
            this.data.name = selected_user.full_name
            this.imageUrl = selected_user.photo_url;
            this.data.email = selected_user.email;
            this.data.mobile_no = selected_user.mobile;

        },
        changeTrainer() {

            this.data.user_id = null;
            this.data.name = null;
            this.imageUrl = null;
            this.data.address = null;
            this.data.mobile_no = null;
            this.data.email = null;

        },
        getItemText(item) {
            return this.language === 'bn' ? item.value_bn : item.value_en;
        },
        previewImage() {
            if (this.data.image) {

                const maxFileSize = 200 * 1024; // 200 KB in bytes

                if (this.data.image.size > maxFileSize) {
                    // alert("file size must be 200kb")
                    // this.confirmDialog =true;
                    if (this.language == 'en') {
                        this.$toast.error("File size must be under 200 KB");
                    }
                    else {
                        this.$toast.error("ফাইলের আকার ২০০ কে বি এর কম হতে হবে");

                    }
                    // Show the alert
                    this.data.image = '';

                    return false;
                }
                const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg']; // Allowed file types
                if (!allowedTypes.includes(this.data.image.type)) {
                    this.language === 'en' ? this.$toast.error("Only PNG, JPEG, or JPG files are allowed") : this.$toast.error("শুধুমাত্র পিএনজি, জেপিইজি, অথবা জেপিজি ফাইলগুলি অনুমোদিত");
                    this.data.image = '';
                    return false;
                }
                // return true;




                const reader = new FileReader();
                reader.onload = (e) => {
                    this.imageUrl = e.target.result;
                };
                reader.readAsDataURL(this.data.image);
            } else {
                // Clear the preview if no file is selected
                this.imageUrl = null;
            }

        },

        async GetUser() {

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
        async GetData() {

            this.$axios
                .get(`/admin/training/trainers/${this.$route.params.id}`,  {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },

                })
                .then((result) => {

                    this.data = result?.data?.data;
                    this.data.image = null;
                    this.imageUrl = result?.data?.data.image;




                });
        },




        updateForm() {

            const formData = new FormData();
            // Append data to FormData object
            formData.append('name', this.data.name);
            formData.append('designation_id', this.data.designation_id);
            formData.append('mobile_no', this.data.mobile_no);
            formData.append('email', this.data.email);
            formData.append('address', this.data.address);
            formData.append('description', this.data.description);

            if (this.data.image) {
                formData.append('image', this.data.image);

            }
            formData.append('lang', this.language);
            formData.append('_method', "PUT");
            this.$axios
                .post(`admin/training/trainers/${this.$route.params.id}`, formData, {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((result) => {

                    this.$toast.success(result.data.message);
                    this.$router.push("/training-management/trainer-information");


                })
                .catch((err) => {
                   
                    if (err?.response?.data?.errors?.email && Array.isArray(err.response.data.errors.email) && err.response.data.errors.email.length > 0) {
                        this.$toast.error(err.response.data.errors.email[0]);
                    }

                    if (err?.response?.data?.errors?.username && Array.isArray(err.response.data.errors.username) && err.response.data.errors.username.length > 0) {
                        this.$toast.error(err.response.data.errors.username[0]);
                    }
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
