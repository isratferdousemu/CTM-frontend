<script>
import { ValidationObserver } from "vee-validate";
export default {
    name: "Index",
    title: "CTM - Training Program",
    data() {
        return {
            data: [],
            edited_on_days:[],
            showPassword: false,
            total: null,
            org_name: null,
            module_id: null,
            modules: [],

            dialogAdd: false,
            deleteDialog: false,
            dialogEmail: false,
            delete_loading: false,
            loading: false,
            search: "",
            delete_id: "",
            email_id: "",
            time_slots:[],

            apis: [],

            errors: {},
            error_status: {},
            pagination: {
                current: 1,
                total: 0,
                perPage: 5
            },
            sortBy: "name_en",
            sortDesc: false, //ASC
            items: [5, 10, 15, 20, 40, 50, 100],
            
        };
    },

    watch: {

        "$i18n.locale": "updateHeaderTitle",
     
    },

    computed: {
        
       
        language: {
            get() {
                return this.$store.getters.getAppLanguage;
            }
        },


    },

    mounted() {
        this.GetTimeSlot();
        this.DataView();

    },

    methods: {
        async GetTimeSlot() {

          await  this.$axios
                .get("/admin/training/program-time-slots", {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },

                })
                .then((result) => {

                    this.time_slots = result?.data?.data;





                });
        },
        
        emailAlert(id) {
            this.dialogEmail = true;
            this.email_id = id;
        },

        
        async  DataView() {
            console.log(this.$route.params.id, "params")
            await  this.$axios
                .get(`admin/training/participants/${this.$route.params.id}`, {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((result) => {
                    
                    this.data = result?.data?.data;
                })
                .catch((err) => {
                    if (this.$refs.formAdd && this.$refs.formAdd.$refs && this.$refs.formAdd.$refs.operator) {

                        this.$refs.formAdd.$refs.operator.setErrors([err.response.data.errors.operator[0]]);
                    } else {
                        console.error('Error setting errors:', err);
                    }

                });

        },




    },
}
</script><template>
    <div id="training-program">
        <v-container>
            <v-row>
                <v-col cols="12">
                    <v-card class="mx-3">
                        <v-card-title class="justify-center black--text"
                            style="background-color: #1C3C6A; color: white;">
                            <h4 class="white--text">{{ $t("container.training_management.training_registration.view") }}
                            </h4>
                        </v-card-title>

                        <v-row class="my-custom-row ma-5">
                            <v-col cols="5" style="font-size:13px;">
                                <b>{{ $t('container.training_management.training_program.training_circular') }}</b>
                            </v-col>
                            <v-col cols="7" style="font-size:13px;">
                                <b>:</b> <span class="ml-2"> {{data?.training_circular?.circular_name
                                    }}</span>
                            </v-col>
                            <v-col cols="5" style="font-size:13px;">
                                <b>{{ $t('container.training_management.training_program.program_name') }}</b>
                            </v-col>
                            <v-col cols="7" style="font-size:13px;">
                                <b>:</b> <span class="ml-2">{{ data?.training_program?.program_name }}</span>
                            </v-col>
                            <v-col cols="5" style="font-size:13px;">
                                <b>{{ $t('container.training_management.training_registration.user_name') }}</b>
                            </v-col>
                            <v-col cols="7" style="font-size:13px;">
                                <b>:</b> <span class="ml-2">{{ data?.user?.username }}</span>
                            </v-col>
                            <v-col cols="5" style="font-size:13px;">
                                <b>{{ $t('container.training_management.training_registration.full_name') }}</b>
                            </v-col>
                            <v-col cols="7" style="font-size:13px;">
                                <b>:</b> <span class="ml-2">{{ data?.user?.full_name }}</span>
                            </v-col>
                            <v-col cols="5" style="font-size:13px;">
                                <b>{{ $t('container.training_management.trainer_info.email') }}</b>
                            </v-col>
                            <v-col cols="7" style="font-size:13px;">
                                <b>:</b> <span class="ml-2">{{ data?.user?.email }}</span>
                            </v-col>
                            <v-col cols="5" style="font-size:13px;">
                                <b>{{ $t('container.training_management.trainer_info.mobile') }}</b>
                            </v-col>
                            <v-col cols="7" style="font-size:13px;">
                                <b>:</b> <span class="ml-2">{{
                                    language == 'en' ? data?.user?.mobile : $helpers.englishToBangla(data?.user?.mobile)
                                    }}</span>
                            </v-col>
                          <v-col cols="5" style="font-size:13px;">
                                <b>{{ $t('container.training_management.training_program.employee_id') }}</b>
                            </v-col>
                            <v-col cols="7" style="font-size:13px;">
                                <b>:</b> <span class="ml-2">{{
                                    language == 'en' ? data?.user_id : $helpers.englishToBangla(data?.user_id)
                                    }}</span>
                            </v-col>
                            <v-col cols="5" style="font-size:13px;">
                                <b>{{ $t('container.list.status') }}</b>
                            </v-col>
                            <v-col cols="7" style="font-size:13px;">
                                <b>:</b> <span v-if="data?.status == 0" class="ml-2">

                                    {{ language === 'en' ? 'Pending' : 'পেন্ডিং' }}
                                </span>

                                <span v-if="data?.status == 1" class="ml-2">

                                    {{ language === 'en' ? 'Pass' : 'উত্তীর্ণ' }}
                                </span>
                                <span v-if="data?.status == 2" class="ml-2">

                                    {{ language === 'en' ? 'Fail' : 'অনুত্তীর্ণ' }}
                                </span>

                            </v-col>


                            <!-- Other fields -->

                        </v-row>



                        <v-row class="justify-end ma-5">
                            <v-btn flat color="primary" class="custom-btn mr-2 mb-5" router
                                to="/training-management/participant">
                                {{ $t("container.list.back") }}
                            </v-btn>

                        </v-row>
                    </v-card>
                </v-col>
            </v-row>




        </v-container>
    </div>
</template>
</script>

<style scoped>
.my-custom-row {
    font-size: 16px;
    /* Default font size for other devices */
}

@media (max-width: 600px) {

    /* Vuetify xs breakpoint */
    .my-custom-row {
        font-size: 12px;
        /* Smaller font size for extra small devices */
    }
}
</style>