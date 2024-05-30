<script>
import { ValidationObserver } from "vee-validate";
export default {
    name: "Index",
    title: "CTM - Trainer Information",
    data() {
        return {
            data: {
                id: null,
                code: null,
                name_en: null,
                name_bn: null,
            },
          
            selectedTab: 'about',
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
                .get(`admin/training/trainers/${this.$route.params.id}`, {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((result) => {
                    console.log(result, "result")
                    this.data = result?.data?.data
                

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
    <div id="trainerInfo-view">
        <v-container>
            <v-row>
                <v-col cols="12" lg="12" md="12" sm="12" xs="12">
                    <v-card class="mx-3">

                        <v-card-title class="justify-center black--text"
                            style="background-color: #1C3B68; color: white;">
                            <h3 class="white--text">{{ $t("container.training_management.trainer_info.view") }}</h3>
                        </v-card-title>


                        <v-row v-if="data.name">
                            <v-col cols="12" lg="12" md="4" sm="12" xs="12">
                                <v-card class="ma-5 " rounded>
                                    <v-card-text>
                                        <!-- Left side for the image -->
                                        <v-row class="mr-5">
                                            <v-col cols="12" lg="4" md="4" sm="4" xs="4">
                                                <v-img :src="data.image" class="rounded-image" height="100%" contain>
                                                    <!-- Circular chip with sign mark -->

                                                    <v-icon v-if="data.image" class="icon" color="white"
                                                        style="position: absolute; bottom: 40px; right: 40px;">mdi-check</v-icon>

                                                </v-img>


                                            </v-col>

                                            <v-col cols="12" lg="4" md="4" sm="4" xs="4">
                                                <b>
                                                    <div class="increased-font mt-3">{{ data.name }}</div>
                                                </b>
                                                <b>
                                                    <div class="increased-contact"> {{
                                                        $t("container.training_management.trainer_info.contact")
                                                        }}</div>
                                                </b>
                                                {{
                                                $t("container.training_management.trainer_info.mobile")
                                                }}:{{ language == 'bn' ?
                                                $helpers.englishToBangla(
                                                this.data?.mobile_no) : data?.mobile_no }}<br>
                                                {{
                                                $t("container.training_management.trainer_info.email")
                                                }}:{{ data.email }}
                                            </v-col>

                                            <v-col cols="12" lg="4" md="4" sm="4" xs="4" class="text-right">




                                                <b><span style="font-size:12px;"> {{
                                                        $t("container.training_management.trainer_info.rating")
                                                        }}</span></b><br>
                                                {{ language == 'bn' ?
                                                $helpers.englishToBangla(
                                                8.15) : '8.15' }}
                                            </v-col>
                                        </v-row>
                                        <v-divider></v-divider>
                                        <br>
                                        <v-row>
                                            <v-col cols="12" lg="4" md="4" sm="4" xs="4">

                                            </v-col>

                                            <v-col cols="12" lg="4" md="4" sm="4" xs="4">
                                                <v-row>
                                                    <v-col cols="12" lg="4" md="4" sm="4" xs="4">
                                                        <div class="d-flex  flex-column">
                                                            <span class="mdi mdi-school-outline mdi-36px"></span>
                                                            <span class="ml-3">{{ language == 'bn' ?
                                                                $helpers.englishToBangla(data?.programs_count) :
                                                                data?.programs_count }}</span>
                                                            <span>
                                                                {{
                                                                $t("container.training_management.trainer_info.program")
                                                                }}</span>
                                                        </div>
                                                    </v-col>
                                                    <v-col cols="12" lg="4" md="4" sm="4" xs="4">
                                                        <div class="d-flex  flex-column">
                                                            <span
                                                                class="mdi mdi-book-open-blank-variant mdi-36px"></span>
                                                            <span class="ml-3">{{ language == 'bn' ?
                                                                $helpers.englishToBangla(
                                                                data?.modules_count) : data?.modules_count }}</span>
                                                            <span>{{
                                                                $t("container.training_management.trainer_info.course")
                                                                }}</span>
                                                        </div>
                                                    </v-col>
                                                    <!-- <v-col cols="12" lg="4" md="4" sm="4" xs="4">
                                                        <div class="d-flex  flex-column">
                                                            <span class="mdi mdi-crowd mdi-36px"></span>
                                                            <span class="ml-3">{{ language == 'bn' ?
                                                                $helpers.englishToBangla(
                                                                0) : '0' }}</span>
                                                            <span>{{
                                                                $t("container.training_management.trainer_info.upcoming")
                                                                }}</span>
                                                        </div>
                                                    </v-col> -->



                                                </v-row>


                                            </v-col>


                                            <v-col cols="12" lg="2" md="2" sm="2" xs="2">

                                            </v-col>

                                        </v-row>

                                    </v-card-text>
                                </v-card>
                                <!-- Your text content here -->

                            </v-col>

                        </v-row>
                        <v-row v-if="data.name">
                            <v-col cols="12" lg="12" md="4" sm="12" xs="12">
                                <v-card class="ma-5 " rounded>
                                    <v-card-text>
                                        <!-- Left side for the image -->
                                        <v-row class="mr-5">

                                            <v-col cols="12" lg="4" md="4" sm="4" xs="4">

                                            </v-col>

                                            <v-col cols="12" lg="2" md="2" sm="2" xs="2" @click="selectedTab = 'about'"
                                                :class="{ 'active-tab': selectedTab === 'about' }"
                                                style="cursor: pointer;">
                                                {{ $t("container.training_management.trainer_info.about")
                                                }}

                                            </v-col>

                                            <v-col cols="2" lg="2" md="2" sm="2" xs="2" @click="selectedTab = 'program'"
                                                :class="{ 'active-tab': selectedTab === 'program' }"
                                                style="cursor: pointer;">
                                                {{ $t("container.training_management.trainer_info.program")
                                                }}
                                            </v-col>


                                        </v-row>
                                        <br>

                                        <!-- <v-divider></v-divider> -->
                                        <br>
                                        <v-row v-if="data.name">
                                            <v-col cols="12" lg="12" md="12" sm="12" xs="12">
                                                <v-row v-if="selectedTab === 'about'" class="selected-tab-content">

                                                    <v-col cols="5"> {{
                                                        $t("container.training_management.trainer_info.name") }}</v-col>
                                                    <v-col cols="7">
                                                        <b>:</b> <span class="ml-2"> {{
                                                            data?.name }}</span></v-col>
                                                    <v-col cols="5"> {{
                                                        $t("container.training_management.trainer_info.designation")
                                                        }}</v-col>
                                                    <v-col cols="7">
                                                        <b>:</b> <span class="ml-2">{{ language == 'bn' ?
                                                            data?.designation?.value_bn : data?.designation?.value_en
                                                            }}
                                                        </span></v-col>
                                                    <v-col cols="5"> {{
                                                        $t("container.training_management.trainer_info.trainer_type")
                                                        }}</v-col>
                                                    <v-col cols="7">
                                                        <b>:</b> <span class="ml-2">
                                                            {{ language === 'en'
                                                            ? (data?.is_external === 0
                                                            ? 'Internal Trainer'
                                                            : 'External Trainer')
                                                            : (language === 'bn'
                                                            ? (data?.is_external === 0
                                                            ? 'অভ্যন্তরীণ প্রশিক্ষক'
                                                            : 'বহিরাগত প্রশিক্ষক')
                                                            : '')
                                                            }}
                                                        </span></v-col>
                                                    <v-col cols="5"> {{
                                                        $t("container.training_management.trainer_info.mobile")
                                                        }}</v-col>
                                                    <v-col cols="7">
                                                        <b>:</b> <span class="ml-2"></span>{{
                                                        }} {{ language == 'bn' ?
                                                        $helpers.englishToBangla(
                                                        this.data?.mobile_no) : data?.mobile_no }}</span></v-col>
                                                    <v-col cols="5"> {{
                                                        $t("container.training_management.trainer_info.email")
                                                        }}</v-col>
                                                    <v-col cols="7">
                                                        <b>:</b> <span class="ml-2">{{
                                                            data?.email }}</span></v-col>
                                                    <v-col cols="5"> {{
                                                        $t("container.training_management.trainer_info.address")
                                                        }}</v-col>
                                                    <v-col cols="7">
                                                        <b>:</b> <span class="ml-2">{{
                                                            data?.address }}</span></v-col>
                                                    <v-col cols="5"> {{
                                                        $t("container.training_management.trainer_info.description")
                                                        }}</v-col>
                                                    <v-col cols="7" class="d-flex align-items-start">
                                                        <b>:</b>

                                                        <div v-html="data?.description" class="ml-3"></div>
                                                    </v-col>

                                                    <!-- <v-col cols="7"  v-else>
                                                        <b>:</b> <span class="ml-2">{{ language == 'bn' ?
                                                            'প্রযোজ্য নয় ' : 'N/A'
                                                            }}</span></v-col> -->
                                                </v-row>
                                                <v-row v-if="selectedTab === 'program'" class="selected-tab-content">
                                                    <v-col cols="12"
                                                        v-if="data?.programs && data?.programs.length > 0 ">
                                                        <v-simple-table>
                                                            <template v-slot:default>
                                                                <thead>
                                                                    <tr>
                                                                        <th>{{
                                                                            $t("container.training_management.training_program.program_name")
                                                                            }}</th>
                                                                        <th>{{
                                                                            $t("container.training_management.training_circular.start_date")
                                                                            }}</th>
                                                                        <th>{{
                                                                            $t("container.training_management.training_circular.end_date")
                                                                            }}</th>
                                                                        <th>{{
                                                                            $t("container.training_management.training_circular.module")
                                                                            }}</th>
                                                                        <!-- Add more headers if needed -->
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr v-for="program in data?.programs"
                                                                        :key="program.id">
                                                                        <td>{{ program.program_name }}</td>
                                                                        <td>{{ language == 'bn' ?
                                                                            $helpers.englishToBangla(program.start_date)
                                                                            : program.start_date }}</td>
                                                                        <td>{{ language == 'bn' ?
                                                                            $helpers.englishToBangla(program.end_date) :
                                                                            program.end_date }}</td>
                                                                        <td>
                                                                            <!-- v-chips to display modules -->
                                                                            <v-chip label
                                                                                v-for="module in program.modules"
                                                                                :key="module.id" class="ma-1">
                                                                                {{ language == 'bn' ? module.value_bn :
                                                                                module.value_en }}
                                                                            </v-chip>
                                                                        </td>
                                                                        <!-- Add more columns if needed -->
                                                                    </tr>
                                                                </tbody>
                                                            </template>
                                                        </v-simple-table>

                                                    </v-col>
                                                    <v-col cols="12" v-else  class="text-center">
                                                     
                                                        {{ language == 'bn' ?
                                                        'এই প্রশিক্ষকের কোন নির্ধারিত প্রোগ্রাম নেই' : 'This trainer has no assigned programs.'}}
                                                    </v-col>


                                                </v-row>




                                            </v-col>

                                        </v-row>



                                    </v-card-text>
                                </v-card>
                                <!-- Your text content here -->

                            </v-col>

                        </v-row>

                        <v-row class="justify-end ma-5">
                            <v-btn flat color="primary" class="custom-btn mr-2 mb-5" router
                                to="/training-management/trainer-information">
                                {{ $t("container.list.back") }}
                            </v-btn>

                        </v-row>
                    </v-card>
                </v-col>
            </v-row>


            <!-- Mail modal -->

        </v-container>
    </div>
</template>
<style>
.rounded-image {
    border-radius: 10%;
    width:70%;
    height: 70%;

}
.icon{
    background: blue;
    border-radius: 100%;

}
.increased-font {
    font-size: 18px;
}
.increased-contact {
    font-size: 15px;
}
.active-tab {
    background-color: #9E9E9E;
    color: white;
    /* Change background color of active tab */
}

.selected-tab-content {

    /* Add padding for better spacing */
}
</style>