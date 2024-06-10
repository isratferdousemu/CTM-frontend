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
            customToolbar: [
                [{ 'header': [1, 2, false] }],
                ['bold', 'italic', 'underline'],
                // ['blockquote', 'code-block'],
                [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
                [{ 'indent': '-1' }, { 'indent': '+1' }],
                [{ 'align': [] }],
                ['clean'], // remove formatting button
                ['link'],
                [{ 'color': [] }, { 'background': [] }]// removed 'image' from the default toolbar
            ],

            data: {
                token: null,
                



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
                .get("admin/training/kobo_token", {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((result) => {
                
                    
                    this.data = result?.data
                
                  
                   
                 
                  
                   




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


           
            this.$axios
                .post('admin/training/token/update' ,this.data, {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((result) => {

                    this.$toast.success("Token Updated Successfully");
                    this.DataView();


                })
                .catch((err) => {
                    console.log(err, "err")
                

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
                                    {{ $t("container.training_management.kobo.edit") }}
                                </h4>
                            </v-card-title>

                            <v-divider></v-divider>



                            <v-card-text class="mt-10">
                                <ValidationObserver ref="form" v-slot="{ invalid }">
                                    <v-form v-on:submit.prevent="updateForm()">

                                        <v-row class="mx-10 no-gap-row">
                                            <v-col cols="12" sm="8" lg="8">
                                                <ValidationProvider name="Circular Name" vid="circular_name"
                                                    rules="required" v-slot="{ errors }">
                                                    <v-text-field dense type="text" v-model="data.token" :label="$t('container.training_management.kobo.token')
                                        " persistent-hint outlined :error="errors[0] ? true : false" :error-messages="errors[0] ? (language == 'bn' ? 'অনুগ্রহ পূর্বক টোকেন প্রদান করুন '
                                        : 'Please enter Token') : ''"></v-text-field>
                                                </ValidationProvider>
                                            </v-col>


                                            <!-- </v-row>
                                        <v-row class="justify-end mt-5 mb-5"> -->
                                            <v-col cols="12" sm="4" lg="4" class="text-right">
                                                <!-- <v-btn flat color="primary" class="custom-btn mr-2" router
                                                    to="/training-management/training-circular">{{
                                                    $t("container.list.back") }}
                                                </v-btn> -->
                                                <v-btn flat color="success" type="submit" class="custom-btn mr-2"
                                                    :disabled="invalid">
                                                    {{ $t("container.list.update") }}
                                                </v-btn>
                                            </v-col>
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