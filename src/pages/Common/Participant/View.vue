<script>

import LocaleSwitcher from "@/components/Common/LocaleSwitcher"
import FooterBar from "@/components/Common/FooterBar.vue";
import { extend, ValidationProvider, ValidationObserver } from "vee-validate";
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
export default {
    name: "Index",
    title: "CTM - Training Circular",
    data() {
        return {
            poll_programs: [],
            circulars: [],
            poll: {
                training_program_id: null,
                training_circular_id: null,
                full_name: null,
                email: null,
            


            },

        };
    },

    watch: {

        "$i18n.locale": "updateHeaderTitle",
    },
    components: {

        LocaleSwitcher,
        FooterBar,
      
            ValidationProvider,
            ValidationObserver,


            // Use the <ckeditor> component in this view.


        
    },

    computed: {
      
        language: {
            get() {
                return this.$store.getters.getAppLanguage;
            }
        },


    },

    mounted() {
        this.GetCircular();
       

    },

    methods: {
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
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000); 


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
        itemText(item) {
            return `${item.circular_name} - ${item.id}`;
        }
        ,
        getprogram(item) {
            return `${item.program_name} - ${item.id}`;
        },
        changePoll() {
            this.poll_programs = [];
            const selected_programs = this.circulars.find(circular => circular.id == this.poll.training_circular_id);
            this.poll_programs = selected_programs?.programs


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
        



    },
}
</script><template>
    <div id="url-generate">
        <v-app-bar color="#405c61" fixed height="60" class="px-4 mb-10" dense dark>
            <v-row align="center" no-gutters>
                <v-col cols="2">
                    <v-img class="p-3 mr-4" max-height="100%" max-width="60px" position="center center"
                        src="/assets/images/logo.png"></v-img>
                </v-col>
                <v-col cols="4">
                    <v-toolbar-title>{{ $t('container.application_selection.application.title_online_1')
                        }}<br>{{
                        $t('container.application_selection.application.title_online_2') }}
                    </v-toolbar-title>

                </v-col>







                <v-col cols="6" class="text-right">

                    <!-- Adjust the styling of LocaleSwitcher as needed -->
                    <LocaleSwitcher />

                </v-col>
            </v-row>
        </v-app-bar>
        <v-row>
            <v-col cols="10" offset="1" class="mt-10">
                <v-card class="mx-3">
                    <v-card-title class="justify-center">
                        <h4 class="white--center mt-10">
                            {{ $t('container.training_management.training_registration.registration') }}
                        </h4>
                    </v-card-title>
                    <v-card-text class="mt-10">


                        <ValidationObserver ref="form" v-slot="{ invalid }">
                            <v-form v-on:submit.prevent="submitPoll()">

                                <v-row class="mx-10 no-gap-row">

                                    <v-col cols=" 12" sm="6" lg="6">
                                        <ValidationProvider name="training_circular_id" vid="circular_id"
                                            rules="required" v-slot="{ errors }">
                                            <v-autocomplete dense type="text" v-model="poll.training_circular_id"
                                                @input="changePoll()"
                                                :label="$t('container.training_management.training_program.training_circular')"
                                                persistent-hint outlined :error="errors[0] ? true : false"
                                                :items="circulars" :item-text="itemText" item-value="id"
                                                :error-messages="errors[0] ? (language == 'bn' ? 'অনুগ্রহ পূর্বক সার্কুলার প্রদান করুন '
                        : 'Please enter Circular') : ''">

                                            </v-autocomplete>
                                        </ValidationProvider>
                                    </v-col>
                                    <v-col cols="12" sm="6" lg="6">
                                        <ValidationProvider name="Program Name" vid="program_name" rules="required"
                                            v-slot="{ errors }">
                                            <v-autocomplete dense type="text" v-model="poll.training_program_id"
                                                :items="poll_programs" :item-text="getprogram" item-value="id" :label="$t('container.training_management.training_program.program')
                        " persistent-hint outlined :error="errors[0] ? true : false" :error-messages="errors[0] ? (language == 'bn' ? 'অনুগ্রহ পূর্বক প্রোগ্রাম প্রদান করুন '
                        : 'Please enter a Program') : ''"></v-autocomplete>
                                        </ValidationProvider>
                                    </v-col>


                                    <v-col cols="12" sm="6" lg="6">
                                        <ValidationProvider name="Participant" rules="required||name"
                                            vid="poll.participant" v-slot="{ errors }">
                                            <v-text-field dense v-model="poll.full_name" :label="$t('container.training_management.training_registration.participant')
                        " persistent-hint outlined :error="errors[0] ? true : false" :error-messages="errors[0] ? (language == 'bn' ? 'অনুগ্রহ পূর্বক  অংশগ্রহণকারী প্রদান করুন ।'
                        : 'Please enter  participant') : ''"></v-text-field>
                                        </ValidationProvider>
                                    </v-col>

                                    <v-col cols="12" sm="6" lg="6">
                                        <ValidationProvider name="Email" vid="email" rules="required||email||bangla"
                                            v-slot="{ errors }">
                                            <v-text-field placeholder="xxx@gmail.com" dense type="email"
                                                v-model="poll.email" :label="$t('container.training_management.trainer_info.email')
                        " persistent-hint outlined :error="errors[0] ? true : false" :error-messages="errors[0] ? (language == 'bn' ? 'অনুগ্রহ পূর্বক গ্রহণযোগ্য ইমেইল প্রদান করুন '
                        : 'Please enter a valid Email') : ''"></v-text-field>
                                        </ValidationProvider>
                                    </v-col>





                                </v-row>
                                <v-row class="justify-end mt-5 mb-5">

                                    <v-btn flat color="success" @click="submitPoll()" class="custom-btn mr-2"
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



        <!-- Mail modal -->
        <br></br>
        <FooterBar />
    </div>
</template>
<style>
/* Default font size */


.title {
    font-size: 10px;
}
</style>