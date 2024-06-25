<script>
import { ValidationObserver } from "vee-validate";
export default {
    name: "Index",
    title: "CTM - API Data Receiver",
    data() {
        return {
            data: {
                id: null,
                code: null,
                name_en: null,
                name_bn: null,
            },
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
            // items: 
            // [
            //         {
            //             "name_en": 5,
            //             "name_bn": "৫"
            //         },
            //         {
            //             "name_en": 10,
            //             "name_bn": "১০"
            //         },

            //     {
            //         "name_en": 30,
            //         "name_bn": "৩০"
            //     },
            //     {
            //         "name_en": 40,
            //         "name_bn": "৪০"
            //     },
            //     {
            //         "name_en": 50,
            //         "name_bn": "৫০"
            //     },


            //     {
            //         "name_en": 100,
            //         "name_bn": "১০০"
            //     }
            // ]
        };
    },

    watch: {

        "$i18n.locale": "updateHeaderTitle",
    },

    computed: {
        headers() {
            return [
                // { text: this.$t('container.list.sl'), value: "id", align: "start", sortable: false, width: "15%" },
                { text: this.$t('container.api_manager.api_generate.api_name'), value: "name", width: "20%" },
                { text: this.$t('container.api_manager.api_generate.parameter'), value: "selected_columns", width: "45%" },
                { text: this.$t('container.api_manager.url_generate.url'), sortable: false, value: "api_url", width: "20%" },

            ];
        },
        language: {
            get() {
                return this.$store.getters.getAppLanguage;
            }
        },


    },

    mounted() {
        this.ReceiverView();

    },

    methods: {
        emailAlert(id) {
            this.dialogEmail = true;
            this.email_id = id;
        },

        sendEmail() {
            this.$axios
                .get(`/admin/api-manager/send-email/${this.$route.params.id}`, {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },


                })
                .then((result) => {

                    this.$toast.success(result?.data?.data);
                    this.dialogEmail = false





                })
                .catch(error => {
                    console.error('Error generating PDF:', error);
                });
        },
        ReceiverView() {
            console.log(this.$route.params.id, "params")
            this.$axios
                .get(`admin/api-data-receive/${this.$route.params.id}`, {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((result) => {
                    console.log(result, "result")
                    this.data = result?.data?.data
                    const parts = this.data.start_date.split(" ");
                    const datePart = parts[0];
                    this.data.start_date = datePart;
                    const parts_2 = this.data.end_date.split(" ");
                    const datePart_2 = parts_2[0];
                    this.data.end_date = datePart_2;

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
    <div id="url-generate">
        <v-container>
            <v-row>
                <v-col cols="12">
                    <v-card class="mx-3">
                        <v-card-title class="justify-center black--text"
                            style="background-color:#1c3b68;color:white;margin-bottom: 17px;">
                            <h5 class="white--text">{{ $t("container.api_manager.data_receiver.view") }}</h5>
                        </v-card-title>

                        <v-row class="my-custom-row ma-5">
                            <v-col cols="12" sm="6" md="3" style="font-size:13px;">
                                <b>{{ $t('container.api_manager.data_receiver.organization') }}</b>:
                            </v-col>
                            <v-col cols="12" sm="6" md="9" style="font-size:13px;">
                                <b>:</b> <span class="ml-2">{{ data.organization_name }}</span>
                            </v-col>
                            <v-col cols="12" sm="6" md="3" style="font-size:13px;">
                                <b>{{ $t('container.api_manager.data_receiver.phone') }} </b>:
                            </v-col>
                            <v-col cols="12" sm="6" md="9" style="font-size:13px;">
                                <b>:</b> <span class="ml-2">{{ data.organization_phone}}</span>
                            </v-col>
                            <v-col cols="12" sm="6" md="3" style="font-size:13px;">
                                <b>{{ $t('container.api_manager.data_receiver.email') }}</b>:
                            </v-col>
                            <v-col cols="12" sm="6" md="9" style="font-size:13px;">
                                <b>:</b> <span class="ml-2">{{ data?.organization_email }}</span>
                            </v-col>
                            <v-col cols="12" sm="6" md="3" style="font-size:13px;">
                                <b>{{ $t('container.api_manager.data_receiver.responsible_person_nid') }}</b>:
                            </v-col>
                            <v-col cols="12" sm="6" md="9" style="font-size:13px;">
                                <b>:</b> <span class="ml-2">{{ data?.responsible_person_nid }}</span>
                            </v-col>
                            <v-col cols="12" sm="6" md="3" style="font-size:13px;">
                                <b>{{ $t('container.api_manager.data_receiver.user_name') }}</b>:
                            </v-col>
                            <v-col cols="12" sm="6" md="9" style="font-size:13px;">
                                <b>:</b> <span class="ml-2">{{ data?.username}}</span>
                            </v-col>
                            <v-col cols="12" sm="6" md="3" style="font-size:13px;">
                                <b>{{ $t('container.api_manager.data_receiver.api_key') }}</b>:
                            </v-col>
                            <v-col cols="12" sm="6" md="9" style="font-size:13px;">
                                <b>:</b> <span class="ml-2">{{ data?.api_key }}</span>
                            </v-col>
                            <v-col cols="12" sm="6" md="3" style="font-size:13px;">
                                <b>{{ $t('container.api_manager.data_receiver.ip') }}</b>:
                            </v-col>
                            <v-col cols="12" sm="6" md="9" style="font-size:13px;">
                                <b>:</b> <span class="ml-2">{{ data?.whitelist_ip }}</span>
                            </v-col>
                            <v-col cols="12" sm="6" md="3" style="font-size:13px;">
                                <b>{{ $t('container.api_manager.data_receiver.start_date') }}</b>:
                            </v-col>
                            <v-col cols="12" sm="6" md="9" style="font-size:13px;">
                                <b>:</b> <span class="ml-2">{{ data?.start_date }}</span>
                            </v-col>
                            <v-col cols="12" sm="6" md="3" style="font-size:13px;">
                                <b>{{ $t('container.api_manager.data_receiver.end_date') }}</b>:
                            </v-col>
                            <v-col cols="12" sm="6" md="9" style="font-size:13px;">
                                <b>:</b> <span class="ml-2">{{ data?.end_date }}</span>
                            </v-col>

                            <!-- Other fields -->

                        </v-row>




                        <v-row>
                            <v-col cols="12">

                                <v-card-title v-if="data.api_list" class="justify-center black--text"
                                    style="background-color:#1c3b68;color:white;margin-bottom: 17px;">
                                    <h5 class="white--text">{{ $t("container.api_manager.api_generate.api_view") }}
                                    </h5>
                                </v-card-title>

                                <v-data-table :loading="loading" item-key="id" :headers="headers" v-if="data.api_list"
                                    :items="data?.api_list" hide-default-footer
                                    class="elevation-0 transparent row-pointer mt-5 mx-5">
                                    <!-- Your data table content here -->
                                    <template v-slot:item.api_url="{ item }">
                                        <div style="width:300px;">
                                            {{ item?.purpose?.url }}

                                        </div>

                                    </template>
                                    <!-- <template v-slot:item.selected_columns="{ item }">
                                        <div style="width:200px;">
                                            {{ item?.selected_columns }}

                                        </div>

                                    </template>
                                    <template v-slot:item.name="{ item }">
                                        <div style="width:100px;">
                                            {{ item?.name }}

                                        </div>

                                    </template> -->
                                </v-data-table>

                            </v-col>
                        </v-row>
                        <v-row class="justify-end ma-5">
                            <v-btn flat color="primary" class="custom-btn mr-2 mb-5" router
                                to="/api-manager/data-receiver">
                                {{ $t("container.list.back") }}
                            </v-btn>
                            <v-btn @click="emailAlert()" flat color="cyan darken-4"
                                class="custom-btn white--text mr-2 mb-5">
                                {{ $t("container.list.email") }}
                            </v-btn>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>

            <!-- Mail modal -->
            <v-dialog v-model="dialogEmail" width="350">
                <!-- Your modal content here -->
                <v-card style="justify-content: center; text-align: center">
                    <v-card-title class="font-weight-bold justify-center">
                        {{ $t('container.api_manager.data_receiver.email_header') }}
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                        <div class="subtitle-1 font-weight-medium mt-5">
                            {{ $t('container.api_manager.data_receiver.email_alert') }}
                        </div>
                    </v-card-text>
                    <v-card-actions style="display: block">
                        <v-row class="mx-0 my-0 py-2" justify="center">
                            <v-btn text @click="dialogEmail = false" outlined class="custom-btn-width py-2 mr-10">
                                {{ $t('container.list.cancel') }}
                            </v-btn>
                            <v-btn text @click="sendEmail" color="white" :loading="delete_loading"
                                class="custom-btn-width warning white--text py-2">
                                {{ $t('container.list.confirm') }}
                            </v-btn>
                        </v-row>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-container>
    </div>
</template>
<style>
.text-wrap {
    /* You can adjust these properties as needed */
    overflow-wrap: break-word;
    /* Handles long words */
    word-wrap: break-word;
    /* Handles long words */
    white-space: pre-wrap;
    /* Handles spaces and line breaks */
}

.word-wrap {
    overflow-wrap: break-word;
}

.custom-chip {
    background-color: blue;
    color: white;
}

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