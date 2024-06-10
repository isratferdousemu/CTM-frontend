<script>
import { ValidationObserver } from "vee-validate";
import ApiService from "../../../services/ApiService";
export default {
    name: "Index",
    title: "CTM - Training Program",
    data() {
        return {
            data: [],
            questionPaper: [],
            answers: [],
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
            status_types: [{ "id": 0, "value_en": "Pending", "value_bn": "পেন্ডিং" },
              { "id": 1, "value_en": "Pass", "value_bn": "উত্তীর্ণ" },
              { "id": 2, "value_en": "Fail", "value_bn": "অনুত্তীর্ণ" }],


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
        this.DataView();

    },

    methods: {

        emailAlert(id) {
            this.dialogEmail = true;
            this.email_id = id;
        },

        
        async  DataView() {

          await ApiService.get(`admin/training/participants/${this.$route.params.id}`)
              .then(res => {
                this.data = res?.data?.data;
                this.answers = this.data.exam_response
                this.questionPaper = this.data.training_program?.question_paper
              })
        },

      getItemText(item) {
        return this.language === 'bn' ? item.value_bn : item.value_en;
      },

      changeStatus(status) {
          ApiService.update(`admin/training/participants/update-status/${this.$route.params.id}`, {
            status: status
          }).then(res => {
            this.$toast.success(res.data?.message ?? 'Operation Successful');
          }).catch(err => {
            this.$toast.error(err.response?.data?.message ?? 'Something went wrong');
          })

      }


    },
}
</script>

<template>
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

                          <template v-for="(item, index) in questionPaper">
                            <v-col cols="5" style="font-size:13px;">
                              {{ item.label }}
                            </v-col>

                            <v-col cols="7" style="font-size:13px;">
                              <b>:</b> <span class="ml-2">
                              {{answers?.[item['$autoname']] }}
                            </span>
                            </v-col>

                          </template>


                          <v-col cols="5" style="font-size:13px;margin-top: 15px;">
                            <b>{{ $t("container.training_management.training_registration.result") }}</b>
                          </v-col>

                          <v-col cols="3" style="font-size:13px;margin-top: 15px;">
                            <v-select dense type="text"
                                      v-model="data.status"
                                      :items="status_types"
                                      :item-text="getItemText"
                                      item-value="id"
                                      @change="changeStatus"
                                      persistent-hint outlined
                            ></v-select>

                          </v-col>



                            <!-- Other fields -->

                        </v-row>



                        <v-row class="justify-end ma-5">
                            <v-btn flat color="primary" class="custom-btn mr-2 mb-5"
                                   :to="`/training-management/participant/${data.training_program_id}/${data.training_circular_id}`">
                                {{ $t("container.list.back") }}
                            </v-btn>

                        </v-row>
                    </v-card>
                </v-col>
            </v-row>




        </v-container>
    </div>
</template>

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