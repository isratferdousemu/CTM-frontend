<script>
import { ValidationObserver } from "vee-validate";
import LocaleSwitcher from "@/components/Common/LocaleSwitcher"
export default {
    name: "Index",
    title: "CTM - Training Circular",
    data() {
        return {
            data: [],
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
    components: {
    
        LocaleSwitcher
    },

    computed: {
        sanitizedDescription() {
            // Sanitize HTML content using DOMParser
            const parser = new DOMParser();
            const doc = parser.parseFromString(this.data.description, 'text/html');
            return doc.body.innerHTML;
        },
        headers() {
            return [
                { text: this.$t('container.list.sl'), value: "id", align: "start", sortable: false, width: "15%" },
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
        this.DataView();

    },

    methods: {
        emailAlert(id) {
            this.dialogEmail = true;
            this.email_id = id;
        },


        DataView() {
            console.log(this.$route.params.id, "params")
            this.$axios
                .get(`admin/circulars-details/${this.$route.params.id}`, {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((result) => {

                    this.data = result?.data?.data
                    console.log(this.data.modules, "modules");


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
        <v-app-bar color="#405c61" fixed height="80" class="px-4" dense dark>
            <v-row align="center" no-gutters>
                <v-img class="p-3 mr-4" max-height="100%" max-width="60px" position="center center"
                    src="/assets/images/logo.png"></v-img>
                <v-toolbar-title>{{ $t('container.application_selection.application.title_online_1') }}<br>{{
                    $t('container.application_selection.application.title_online_2') }}
                </v-toolbar-title>



                <v-col>
                    <!-- Empty column to create space between title and LocaleSwitcher -->
                </v-col>
                <v-col>
                    <!-- Empty column to create space between title and LocaleSwitcher -->
                </v-col>
                <v-col>
                    <!-- Empty column to create space between title and LocaleSwitcher -->
                </v-col>
                <v-col>
                    <!-- Empty column to create space between title and LocaleSwitcher -->
                </v-col>
                <v-col>
                    <!-- Empty column to create space between title and LocaleSwitcher -->
                </v-col>
                <v-col>
                    <!-- Empty column to create space between title and LocaleSwitcher -->
                </v-col>

                <v-col>
                    <v-row align="center" justify="end" no-gutters>
                        <v-col>
                            <!-- Adjust the styling of LocaleSwitcher as needed -->
                            <LocaleSwitcher />
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-app-bar>
        <v-row>
            <v-col cols="10" offset="1">
                <v-card class="mx-3">


                    <v-row class="my-custom-row ma-5">

                        <v-col cols="12" sm="12" md="12" class="mt-15 text-center">{{
                            $t('container.training_management.training_circular.view') }}</v-col>


                        <v-col cols="12" sm="6" md="3" style="font-size:15px;">
                            <b>{{ $t('container.training_management.training_circular.name') }}</b>:
                        </v-col>
                        <v-col cols="12" sm="6" md="9" style="font-size:15px;">
                            <b>:</b> <span class="ml-2">{{ data?.circular_name }}</span>
                        </v-col>
                        <v-col cols="12" sm="6" md="3" style="font-size:15px;">
                            <b>{{ $t('container.training_management.training_circular.type') }} </b>:
                        </v-col>
                        <v-col cols="12" sm="6" md="9" style="font-size:15px;">
                            <b>:</b> <span class="ml-2"> {{ language == 'bn' ?
                                data?.circular_type
                                ?.value_bn : data?.circular_type
                                ?.value_en }}</span>
                        </v-col>
                        <v-col cols="12" sm="6" md="3" style="font-size:15px;">
                            <b>{{ $t('container.training_management.training_circular.training_type') }}</b>:
                        </v-col>
                        <v-col cols="12" sm="6" md="9" style="font-size:15px;">
                            <b>:</b> <span class="ml-2">{{ language == 'bn' ?
                                data?.training_type
                                ?.value_bn : data?.training_type
                                ?.value_en }}</span>
                        </v-col>
                        <v-col cols="12" sm="6" md="3" style="font-size:15px;">
                            <b>{{ $t('container.list.status') }}</b>:
                        </v-col>
                        <v-col cols="12" sm="6" md="9" style="font-size:15px;">
                            <b>:</b> <span class="ml-2">{{ language == 'bn' ?
                                data?.status
                                ?.value_bn : data?.status
                                ?.value_en }}</span>
                        </v-col>
                        <v-col cols="12" sm="6" md="3" style="font-size:15px;">
                            <b>{{ $t('container.training_management.training_circular.module') }}</b>:
                        </v-col>
                        <v-col cols="12" sm="6" md="9" style="font-size:15px;">
                            <b>:</b>
                            <!-- <span class="ml-2">{{ language == 'bn' ?
                                    data?.modules
                                    ?.value_bn : data?.modules
                                    ?.value_en }}{{ data?.modules.value_bn }}
                                </span> -->
                            <v-chip v-for="(item, index) in data.modules" :key="index" class="ml-2 mt-2">
                                {{ language == 'bn' ?
                                item.value_bn : item.value_bn }}{{ data?.modules.value_en }}
                            </v-chip>
                        </v-col>
                        <v-col cols="12" sm="6" md="3" style="font-size:15px;">
                            <b>{{ $t('container.training_management.training_circular.class_duration') }}</b>:
                        </v-col>
                        <v-col cols="12" sm="6" md="9" style="font-size:15px;">
                            <b>:</b> <span class="ml-2">{{ data?.class_duration }}</span>
                        </v-col>
                        <v-col cols="12" sm="6" md="3" style="font-size:15px;">
                            <b>{{ $t('container.training_management.training_circular.description') }}</b>:
                        </v-col>
                        <v-col cols="12" sm="6" md="9" style="font-size:15px;">
                            <b>:</b> <span class="ml-2" v-html="sanitizedDescription"></span>
                        </v-col>
                        <v-col cols="12" sm="6" md="3" style="font-size:15px;">
                            <b>{{ $t('container.api_manager.data_receiver.start_date') }}</b>:
                        </v-col>
                        <v-col cols="12" sm="6" md="9" style="font-size:15px;">
                            <b>:</b> <span class="ml-2">{{ data?.start_date }}</span>
                        </v-col>
                        <v-col cols="12" sm="6" md="3" style="font-size:15px;">
                            <b>{{ $t('container.api_manager.data_receiver.end_date') }}</b>:
                        </v-col>
                        <v-col cols="12" sm="6" md="9" style="font-size:15px;">
                            <b>:</b> <span class="ml-2">{{ data?.end_date }}</span>
                        </v-col>

                        <!-- Other fields -->

                    </v-row>

                 
                </v-card>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12">
                <v-card>
                    <v-card-title v-if="data.api_list" class="justify-center black--text">
                        <h5 class="mt-5">{{ $t("container.api_manager.api_generate.api_view") }}</h5>
                    </v-card-title>

                    <v-data-table :loading="loading" item-key="id" :headers="headers" v-if="data.api_list"
                        :items="data?.api_list" hide-default-footer
                        class="elevation-0 transparent row-pointer mt-5 mx-5">
                        <!-- Your data table content here -->
                    </v-data-table>
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