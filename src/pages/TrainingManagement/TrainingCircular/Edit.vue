<script>
import { extend, ValidationProvider, ValidationObserver } from "vee-validate";


import { VueEditor } from "vue2-editor";



import { mapActions, mapState } from "vuex";


extend('number', {
    validate: value => {
        // Regular expression for non-negative integer validation
        const isNonNegativeInteger = /^\d+$/.test(value);
        return isNonNegativeInteger;
    },
    message: 'Please enter a valid non-negative number'
});
extend('email', {
    validate: value => {
        // Regular expression for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    },
    message: 'Please enter a valid email address'
});
extend('checklength', {
    validate: value => {
        return value.length <= 10;
    },
    message: 'Please enter a 10 character'
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
        const nameRegex = /^[a-zA-Z\s']+$/;
        return nameRegex.test(value);
    },
    message: 'Please enter a valid  Name'
});
extend('mobile', {
    validate: value => {
        // Regular expression to match phone numbers with a maximum length of 14 characters
        const mobileRegex = /^01\d{9}$/;
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

export default {
    name: "Training_Circular",
    title: "CTM -Training Circular",
    components: {
        ValidationProvider,
        ValidationObserver,
        VueEditor,

        // Use the <ckeditor> component in this view.


    },

    data() {
        return {

            content: "<h1>Some initial content</h1>",
            imageUrl: null,

            circular_types: [],
            modules: [],
            edited_modules:[],

            data: {
                circular_name: null,
                circular_type_id: null,
                training_type_id: null,
                status_id: null,
                module_id: [

                ],
                no_of_participant: null,
                no_of_participant_open: null,
                no_of_participant_selected: null,
                start_dat: null,
                end_date: null,
                class_duration: null,
                description: null



            },
            designations: []
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
  
        this.$store
            .dispatch("getLookupByType", 26)
            .then((res) => (this.circular_types = res));
        this.$store
            .dispatch("getLookupByType", 27)
            .then((res) => (this.training_types = res));
        this.$store
            .dispatch("getLookupByType", 28)
            .then((res) => (this.status_types = res));
        this.$store
            .dispatch("getLookupByType", 29)
            .then((res) => (this.modules = res));
        this.DataView();
    },


    methods: {
        change() {


            if (this.data.circular_type_id === 59) {
                this.data.no_of_participant = null

            }
            if (this.data.circular_type_id === 60) {
                this.data.no_of_participant_open = null
                this.data.no_of_participant_selected = null

            }
            console.log(this.data, "data")

        },
        DataView() {
            this.$axios
                .get(`admin/training/circulars/${this.$route.params.id}`, {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((result) => {
                
                    
                    this.data = result?.data?.data
                
                    this.edited_modules = result?.data?.data?.modules;
                    console.log(this.edited_modules,"edited_modules")

                    // this.$store.modules
                    //     .dispatch("getLookupByType", 29)
                    //     .then((res) => (this.modules = res));
                    this.data.module_id = [];
                    this.edited_modules.forEach((item, index) => {
                    
                        this.data.module_id.push(item.id);
                       
                  
                     
                    });
                    console.log(this.data.module_id, "module_id")
                 
                  
                   




                })
                .catch((err) => {
                    if (this.$refs.formAdd && this.$refs.formAdd.$refs && this.$refs.formAdd.$refs.operator) {

                        this.$refs.formAdd.$refs.operator.setErrors([err.response.data.errors.operator[0]]);
                    } else {
                        console.error('Error setting errors:', err);
                    }

                });

        },
        getItemText(item) {
            return this.language === 'bn' ? item.value_bn : item.value_en;
        },





        updateForm() {


            const formData = new FormData();
            // Append data to FormData object
            formData.append('circular_name', this.data.circular_name);
            formData.append('circular_type_id', this.data.circular_type_id);
            formData.append('training_type_id', this.data.training_type_id);
            formData.append('status_id', this.data.status_id);
            // formData.append('module_id', this.data.module_id);
            if (this.data.no_of_participant) {
                formData.append('no_of_participant', this.data.no_of_participant);

            }
            if (this.data.no_of_participant_open) {
                formData.append('no_of_participant_open', this.data.no_of_participant_open);

            }
            if (this.data.no_of_participant_selected) {
                formData.append('no_of_participant_selected', this.data.no_of_participant_selected);

            }
            ;

            if (this.data.module_id) {
                this.data?.module_id.forEach((item, index) => {
                    formData.append('module_id[]', item);
                });
            }
            formData.append('start_date', this.data.start_date);
            formData.append('end_date', this.data.start_date);
            formData.append('class_duration', this.data.class_duration);
            formData.append('description', this.data.description);
            formData.append('lang', this.language);
            formData.append('_method', "PUT");
            this.$axios
                .post(`admin/training/circulars/${this.$route.params.id}`, formData, {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((result) => {

                    this.$toast.success(result.data.message);
                    this.$router.push("/training-management/trainer-circular");


                })
                .catch((err) => {
                    console.log(err, "err")
                    this.$toast.error(err.response.data.errors.email[0]);
                    this.$refs.form.setErrors(err.response.data.errors);

                });

        },

     
    },
};
</script>

<template>
    <div id="circular_create">
        <v-row class="mx-5 mt-5">
            <v-col cols="12">
                <v-row>
                    <v-col cols="12">
                        <v-card>

                            <v-card-title class="justify-center"
                                style="background-color: #1C3B68; color: white;font-size: 17px;">
                                <h4 class="white--text">
                                    {{ $t("container.training_management.training_circular.edit") }}
                                </h4>
                            </v-card-title>

                            <v-divider></v-divider>



                            <v-card-text class="mt-10">
                                <ValidationObserver ref="form" v-slot="{ invalid }">
                                    <v-form v-on:submit.prevent="updateForm()">

                                        <v-row class="mx-10 no-gap-row">
                                            <v-col cols="12" sm="6" lg="6">
                                                <ValidationProvider name="Circular Name" vid="circular_name"
                                                    rules="required" v-slot="{ errors }">
                                                    <v-text-field dense type="text" v-model="data.circular_name" :label="$t('container.training_management.training_circular.name')
                                        " persistent-hint outlined :error="errors[0] ? true : false" :error-messages="errors[0] ? (language == 'bn' ? 'অনুগ্রহ পূর্বক সার্কুলারের নাম প্রদান করুন '
                                        : 'Please enter a Cicular Name') : ''"></v-text-field>
                                                </ValidationProvider>
                                            </v-col>
                                            <v-col cols=" 12" sm="6" lg="6">
                                                <ValidationProvider name="Type" vid="type" rules="required"
                                                    v-slot="{ errors }">
                                                    <v-select @input="change()" dense type="text" v-model="data.circular_type_id"
                                                        :label="$t('container.training_management.training_circular.type')"
                                                        persistent-hint outlined :error="errors[0] ? true : false"
                                                        :items="circular_types" :item-text="getItemText" item-value="id"
                                                        :error-messages="errors[0] ? (language == 'bn' ? 'অনুগ্রহ পূর্বক সার্কুলারের ধরন প্রদান করুন '
                                        : 'Please enter Circular Type') : ''">

                                                    </v-select>
                                                </ValidationProvider>
                                            </v-col>

                                            <v-col cols=" 12" sm="6" lg="6">
                                                <ValidationProvider name="Training Type" vid="training_type"
                                                    rules="required" v-slot="{ errors }">
                                                    <v-select dense type="text" v-model="data.training_type_id"
                                                        :label="$t('container.training_management.training_circular.training_type')"
                                                        persistent-hint outlined :error="errors[0] ? true : false"
                                                        :items="training_types" :item-text="getItemText" item-value="id"
                                                        :error-messages="errors[0] ? (language == 'bn' ? 'অনুগ্রহ পূর্বক প্রশিক্ষণের ধরন প্রদান করুন '
                                        : 'Please enter Training Type') : ''">

                                                    </v-select>
                                                </ValidationProvider>
                                            </v-col>
                                            <v-col cols=" 12" sm="6" lg="6">
                                                <ValidationProvider name="Status" vid="status" rules="required"
                                                    v-slot="{ errors }">
                                                    <v-select dense type="text" v-model="data.status_id"
                                                        :label="$t('container.list.status')" persistent-hint outlined
                                                        :error="errors[0] ? true : false" :items="status_types"
                                                        :item-text="getItemText" item-value="id" :error-messages="errors[0] ? (language == 'bn' ? 'অনুগ্রহ পূর্বক স্ট্যাটাস প্রদান করুন '
                                        : 'Please enter Status') : ''">

                                                    </v-select>
                                                </ValidationProvider>
                                            </v-col>
                                            <v-col cols=" 12" sm="6" lg="6">
                                                <ValidationProvider name="Module" vid="module" rules="required"
                                                    v-slot="{ errors }">
                                                    <v-autocomplete multiple dense type="text" v-model="data.module_id"
                                                        :label="$t('container.training_management.training_circular.module')"
                                                        persistent-hint outlined :error="errors[0] ? true : false"
                                                        :items="modules" :item-text="getItemText" item-value="id"
                                                        :error-messages="errors[0] ? (language == 'bn' ? 'অনুগ্রহ পূর্বক মডিউল/কোর্স প্রদান করুন '
                                        : 'Please enter Module/Course') : ''">
                                                        <template v-slot:selection="{ item }">
                                                            <v-chip class="ma-1 white--text" color="blue"
                                                                v-if="language == 'en'">{{
                                                                item.value_en }}</v-chip>
                                                            <v-chip class="ma-1 white--text" color="blue" v-else>{{
                                                                item.value_bn }}</v-chip>


                                                        </template>
                                                    </v-autocomplete>
                                                </ValidationProvider>
                                            </v-col>
                                            <v-col cols=" 12" sm="6" lg="6" v-if="data.circular_type_id == 60">
                                                <ValidationProvider name="No of participant" vid="no_of_participant"
                                                    rules="required||number" v-slot="{ errors }">
                                                    <v-text-field dense type="number" v-model="data.no_of_participant"
                                                        :label="$t('container.training_management.training_circular.no_of_participant')
                                        " persistent-hint outlined :error="errors[0] ? true : false" :error-messages="errors[0] ? (language == 'bn' ? 'অনুগ্রহ করে অংশগ্রহণকারীদের সংখ্যা প্রদান করুন'
                                        : 'Please enter No of Participant') : ''"></v-text-field>
                                                </ValidationProvider>
                                            </v-col>
                                            <v-col cols="12" sm="6" lg="6" v-if="data.circular_type_id == 59">
                                                <ValidationProvider name="No of participant (Open)"
                                                    vid="no_of_participant_open" rules="required||number"
                                                    v-slot="{ errors }">
                                                    <v-text-field dense type="number"
                                                        v-model="data.no_of_participant_open" :label="$t('container.training_management.training_circular.no_of_participant_open')
                                        " persistent-hint outlined :error="errors[0] ? true : false" :error-messages="errors[0] ? (language == 'bn' ? 'অনুগ্রহ করে অংশগ্রহণকারীদের সংখ্যা প্রদান করুন (ওপেন) '
                                        : 'Please enter No of Participant (Open)') : ''"></v-text-field>
                                                </ValidationProvider>
                                            </v-col>
                                            <v-col cols="12" sm="6" lg="6" v-if="data.circular_type_id == 59">
                                                <ValidationProvider name="No of participant (Selected)"
                                                    vid="no_of_participant_selected" rules="required||number"
                                                    v-slot="{ errors }">
                                                    <v-text-field dense type="number"
                                                        v-model="data.no_of_participant_selected" :label="$t('container.training_management.training_circular.no_of_participant_selected')
                                        " persistent-hint outlined :error="errors[0] ? true : false" :error-messages="errors[0] ? (language == 'bn' ? 'অংশগ্রহণকারীদের সংখ্যা (নির্বাচিত) প্রদান করুন'
                                        : 'Please enter No of Participant (Selected)') : ''"></v-text-field>
                                                </ValidationProvider>
                                            </v-col>
                                            <v-col cols="12" sm="6" lg="6">
                                                <ValidationProvider name="Duration Hour" vid="duration_hour"
                                                    rules="required||checklength" v-slot="{ errors }">
                                                    <v-text-field dense type="text" v-model="data.class_duration"
                                                        :label="$t('container.training_management.training_circular.class_duration')
                                        " persistent-hint outlined :error="errors[0] ? true : false"
                                                        :error-messages="errors[0] ? (language == 'bn' ? 'অনুগ্রহ পূর্বক সর্বাধিক ১০ অক্ষর সমেত ক্লাসের সময়কাল (ঘন্টা/দিন)  প্রদান করুন '
                                        : 'Please enter a valid Class Duration with Maximum 10 Characters') : ''"></v-text-field>
                                                </ValidationProvider>
                                            </v-col>

                                            <v-col cols="12" sm="6" lg="6">
                                                <ValidationProvider name="start_date" vid="start_date"
                                                    :rules="{ required, start_date: data.end_date }"
                                                    v-slot="{ errors }">
                                                    <v-text-field dense type="date" v-model="data.start_date" :label="$t('container.training_management.training_circular.start_date')
                                        " persistent-hint outlined :error="errors[0] ? true : false" :error-messages="errors[0] ? (language == 'bn' ? 'অনুগ্রহ পূর্বক গ্রহণযোগ্য শুরুর তারিখ প্রদান করুন '
                                        : 'Please enter a valid Start Date') : ''"></v-text-field>
                                                </ValidationProvider>
                                            </v-col>
                                            <v-col cols="12" sm="6" lg="6">
                                                <ValidationProvider name="end_date" vid="end_date"
                                                    :rules="{ required, end_date: data.start_date }"
                                                    v-slot="{ errors }">
                                                    <v-text-field dense type="date" v-model="data.end_date" :label="$t('container.training_management.training_circular.end_date')
                                        " persistent-hint outlined :error="errors[0] ? true : false" :error-messages="errors[0] ? (language == 'bn' ? 'অনুগ্রহ পূর্বক গ্রহণযোগ্য শেষ তারিখ  প্রদান করুন '
                                        : 'Please enter a valid End Date') : ''"></v-text-field>
                                                </ValidationProvider>
                                            </v-col>
                                            <!-- <v-col cols="12" sm="6" lg="6">
                                                <ValidationProvider name="Description" vid="description"
                                                    rules="required" v-slot="{ errors }">
                                                    <v-textarea dense v-model="data.description" :label="$t('container.training_management.training_circular.description')
                                        " persistent-hint outlined :error="errors[0] ? true : false" :error-messages="errors[0] ? (language == 'bn' ? 'অনুগ্রহ পূর্বক ঠিকানা প্রদান করুন '
                                        : 'Please enter  Address') : ''"></v-textarea>
                                                </ValidationProvider>
                                            </v-col> -->


                                            <v-col cols="12" sm="6" lg="6">
                                                <label>{{
                                                    $t('container.training_management.training_circular.description')
                                                    }}</label>
                                                <vue-editor id="editor" useCustomImageHandler
                                                    v-model="data.description">
                                                </vue-editor>

                                            </v-col>

                                        </v-row>
                                        <v-row class="justify-end mt-5 mb-5">
                                            <v-btn flat color="primary" class="custom-btn mr-2" router
                                                to="/training-management/trainer-circular">{{
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
.no-gap-row {
    margin-left: 0 !important;
    margin-right: 0 !important;
}

.no-gap-row .v-col {
    padding-left: 0 !important;
    padding-right: 0 !important;
}
</style>