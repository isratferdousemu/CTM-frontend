<template>
  <div id="division">
    <v-row class="mx-5 mt-4">
      <v-col cols="12">
        <v-row>
          <v-col cols="12">
            <v-card elevation="10" color="white" rounded="md" theme="light" class="mb-8">
              <v-card-title class="justify-center" tag="div">
                <h3 class="text-uppercase pt-3">
                  {{
                    $t("container.application_selection.poverty_cut_off.list")
                  }}
                </h3>
              </v-card-title>

              <v-card-text>

               <v-row class="ma-0 pa-3 white round-border d-flex justify-space-between align-center"
                                      justify="center" justify-lg="space-between">
                                      <div class="d-flex justify-sm-end flex-wrap">
                                          <!-- <v-text-field @keyup.native="GetAllotmentSetup" outlined dense v-model="search"
                                              prepend-inner-icon="mdi-magnify" class="my-sm-0 my-3 mx-0v -input--horizontal"
                                              flat variant="outlined" :label="$t(
                                                'container.list.search'
                                              )
                                                " hide-details color="primary">
                                          </v-text-field> -->
                                         

                                                      <v-select class="mr-5 no-arrow-icon" v-model="data.financial_year_id"  @input="GetPovertyCutOff()"
                                                          :items="financial_years" :label="$t('container.system_config.demo_graphic.financial_year.financial_year')" outlined clearable
                                                          dense :item-text="getItemText_financial" item-value="id"
                                                          :append-icon-cb="appendIconCallback"
                                                          append-icon="mdi-plus" 
                                                          :error="errors[0] ? true : false"
                                                          :error-messages="errors[0]"></v-select>
                                                

                                                      <v-select @input="GetPovertyCutOff()" class="mr-5 no-arrow-icon" v-model="data.type"
                                                          :items="location_types" :label="$t('container.list.location_type')"  outlined clearable
                                                          dense :item-text="getItemText"  item-value="id"
                                                          :error="errors[0] ? true : false"
                                                          :append-icon-cb="appendIconCallback"
                                                            append-icon="mdi-plus" 
                                                          :error-messages="errors[0]"></v-select>
                                                
                                      </div>
                                      <v-btn @click="navigateToPovertyScore" flat color="primary"
                                          prepend-icon="mdi-account-multiple-plus"
                                             v-can="'poverty-cut-off-score-create'"
                                      >
                                          {{ $t("container.list.add_new") }}
                                      </v-btn>

                  <v-col cols="12">
                    <v-data-table :loading="loading" item-key="id" :headers="headers" :items="cut_off"
                      :items-per-page="pagination.perPage" hide-default-footer
                      class="elevation-0 transparent row-pointer">
                      <template v-slot:item.id="{ item, index }">
                        {{
                    
    language === 'bn' ?  $helpers.englishToBangla(
                            (pagination.current - 1) * pagination.perPage +
                            index +
                            1) : (pagination.current - 1) * pagination.perPage +
                            index + 1  
                    
 
                        }}
                      </template>
                   
                      <template v-slot:item.division_or_district_cut_off="{ item }">
                        <span v-if="item.type === 1">
                          {{ language === 'bn' ? 'বিভাগ' : 'Division' }}
                        </span>
                        <span v-else>
                          {{   language === 'bn' ? 'জেলা' : 'District' }}
                         
                           
                        </span>
                      </template>
                         <template v-slot:item.financial_year="{ item }">
                         
                            {{  language === 'bn' ? $helpers.englishToBangla(item.financial_year) : item.financial_year  }}
                         
                          
                        </template>
                      


                      <!-- Action Button -->
                      <template v-slot:item.actions="{ item }">
                        <v-tooltip top>
                          <template v-slot:activator="{ on }">
                            <v-btn v-can="'poverty-cut-off-score-edit'" fab x-small v-on="on" color="success" elevation="0"
                              @click="editDialog(item.financial_year_id, item.type)">
                              <v-icon> mdi-account-edit-outline </v-icon>
                            </v-btn>
                          </template>
                          <span>
                            {{ $t("container.list.edit") }}
                          </span>
                        </v-tooltip>

                        <v-tooltip top>
                          <template v-slot:activator="{ on }">
                            <v-btn v-can="'poverty-cut-off-score-delete'" fab x-small v-on="on" color="grey" class="ml-3 white--text"
                              elevation="0" @click="deleteAlert(item)">
                              <v-icon> mdi-delete </v-icon>
                            </v-btn>
                          </template>
                          <span> {{ $t("container.list.delete") }}</span>
                        </v-tooltip>
                      </template>
                      <!-- End Action Button -->

                      <template v-slot:footer="item">
                        <div class="text-center pt-2 v-data-footer justify-center pb-2">
                          <v-select style="
                              position: absolute;
                              right: 25px;
                              width: 149px;
                              transform: translate(0px, 0px);
                            " :items="items" hide-details dense outlined @change="onPageChange"
                            v-model="pagination.perPage"></v-select>
                          <v-pagination circle primary v-model="pagination.current" :length="pagination.total"
                            @input="onPageChange" :total-visible="11" class="custom-pagination-item"></v-pagination>
                        </div>
                      </template>
                    </v-data-table>

                  </v-col>




                </v-row>

              </v-card-text>

            </v-card>
          </v-col>
        </v-row>
      </v-col>


      <!-- delete modal  -->
      <v-dialog v-model="deleteDialog" width="350">
        <v-card style="justify-content: center; text-align: center">
          <v-card-title class="font-weight-bold justify-center">
            {{ $t("container.application_selection.poverty_cut_off.delete") }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <div class="subtitle-1 font-weight-medium mt-5">
              {{
                $t("container.application_selection.poverty_cut_off.delete_alert")
              }}
            </div>
          </v-card-text>
          <v-card-actions style="display: block">
            <v-row class="mx-0 my-0 py-2" justify="center">
              <v-btn text @click="deleteDialog = false" outlined class="custom-btn-width py-2 mr-10">
                {{ $t("container.list.cancel") }}
              </v-btn>
              <v-btn text @click="deleteCutoff()" color="white" :loading="delete_loading"
                class="custom-btn-width warning white--text py-2">
                {{ $t("container.list.delete") }}
              </v-btn>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- delete modal  -->
    </v-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { extend, ValidationProvider, ValidationObserver } from "vee-validate";
import { required } from "vee-validate/dist/rules";

extend("required", required);
export default {
  name: "Index",
  title: "CTM - Cutt-Off-Score",
  data() {
    return {
      data: {
        id: null,
        financial_year_id: null,
        location_id: null,
        type: null,
        score: null,
      },
      delete_item: [],
      filters: [],
      dialogAdd: false,
      deleteDialog: false,
      dialogEdit: false,
      delete_loading: false,
      loading: false,
      location_type: null,
      location_type_id: null,
      location_types: [
     
        {
          id: 1,
          name_en: "Division",name_bn:'বিভাগ',
        },
        {
          id: 2,
          name_en: "District",name_bn:'জেলা',
        },
      ],
      financial: null,
      location: null,
      type: null,

      search: "",
      delete_id: "",
      financial_year_id: null,
      cut_off: [],
      financial_years: [],
      errors: {},
      error_status: {},
      pagination: {
        current: 1,
        total: 0,
        perPage: 10,
      },
      items: [5, 10, 15, 20, 40, 50, 100],
    };
  },
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  computed: {
      language: {
      get() {
        return this.$store.getters.getAppLanguage;
      },
    },
    headers() {
      return [
        {
          text: this.$t("container.list.sl"),
          value: "id",
          align: "start",
          sortable: false,
        },
      
        {
          text: this.$t(
            "container.application_selection.poverty_cut_off.poverty_cut_off"
          ),
          align: "start",
          value: "division_or_district_cut_off",
          sortable: false,
        },
        {
          text: this.$t(
            "container.system_config.demo_graphic.financial_year.financial_year"
          ),
          align: "start",
          value: "financial_year",
        },
        { text: this.$t('container.list.action'), value: "actions", align: "center", sortable: false },

      ];
    },

    ...mapState({
      message: (state) => state.Division.success_message,
      // cut_off: (state) => state.Division.cut_off,
      // errors: (state) => state.Division.errors,
      // error_status: (state) => state.Division.error_status,
    }),
  },

  methods: {
      getItemText(item) {
      return this.language === 'bn' ? item.name_bn : item.name_en;
    },
    getItemText_financial(item){
       return this.language === 'bn' ? this.$helpers.englishToBangla(item.financial_year) : item.financial_year;

    },
    navigateToPovertyScore() {
      this.$router.push("/application-management/poverty-cut-off-score/create");
    },

    checkLanguage() {
      let checkLanguageEnglish = this.$checkLanguage(this.data.score);
      let checkLanguageBangla = this.$checkLanguage(this.data.name_bn);

      console.log(checkLanguageEnglish);
      console.log(checkLanguageBangla);
      let errs = {};

      if (
        checkLanguageBangla !== "Bangla" &&
        checkLanguageBangla !== "BanglaSpecialChar"
      ) {
        errs.name_bn = ["Please Enter in Bangla Language in this Field"];
      }

      if (checkLanguageEnglish != "English") {
        errs.score = ["Please Enter in English Language in this Field"];
      }

      if (Object.keys(errs).length > 0) {
        if (this.$refs.formAdd) {
          this.$refs.formAdd.setErrors(errs);
        }
        if (this.$refs.formEdit) {
          this.$refs.formEdit.setErrors(errs);
        }

        return false;
      }

      return true;
    },
    validator() {
      let fd = new FormData();
      for (const [key, value] of Object.entries(this.data)) {
        if (value !== null) {
          fd.append(key, value);
        }
      }
      return fd;
    },
    submitDivision() {
      if (!this.checkLanguage()) {
        return;
      }

      try {
        this.$store
          .dispatch("Division/StoreDivision", this.validator())
          .then((res) => {
            if (res.data?.success) {
              this.$toast.success("Data Inserted Successfully");
              this.resetForm();
              this.dialogAdd = false;
              this.GetPovertyCutOff();
            } else if (res.response?.data?.errors) {
              console.log(res.response.data.errors);
              this.$refs.formAdd.setErrors(res.response.data.errors);
            }
          });
      } catch (e) {
        console.log(e);
      }
    },
    editDialog(param1,param2) {

     this.$router.push({ name: 'edit_cutoff', params: { param1, param2 } });

    },
    submitCuttOff() {
      const financialYearId = this.data.financial_year_id;

      // Access item inputScore and id for each filter
      const formData = this.filters.map((item) => ({
        inputScore: item.inputScore,
        id: item.id,
        financialYearId: this.data.financial_year_id,
        type: this.data.type
      }));


      console.log("Form Data:", formData);

      this.$axios
        .post("admin/poverty/poverty-cut-off/insert", formData, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          this.loading = false;

          if (result.data.success == true) {
            this.$toast.success("Data Inserted Successfully");






          } else {

            this.$toast.error(result.data.error);
          }

        })
        .catch((err) => {


        });


    },
    updateCuttOff() {
      try {
        this.$store
          .dispatch("ApplicationSelection/updateCuttOff", this.validator())
          .then((res) => {
            if (res.data?.success) {
              this.$toast.success("Data Updated Successfully");
              // this.resetData();
              this.dialogEdit = false;
              if (this.financial_year_id == null && this.type == null) {
                this.GetPovertyCutOff();
              } else {
                this.onChangeFilter();
              }
            } else if (res.response?.data?.errors) {
              this.$refs.formEdit.setErrors(res.response.data.errors);
              this.$toast.error(res.response.data.message);
            }
            // console.log(data, "update");
            // if (data == null) {
            //   this.$toast.success("Data Updated Successfully");
            //   this.dialogEdit = false;
            //   this.resetForm();
            //   this.GetPovertyCutOff();
            // } else {
            //   this.$refs.formEdit.setErrors(data);
            // }
          });
      } catch (e) {
        console.log(e);
      }
    },
    resetForm() {
      // Reset the form data
      this.data = {
        division_name: "",
        score: "",
        name_bn: "",
        // Reset other form fields
      };
      this.errors = {};
    },

    onPageChange($event) {
      // this.pagination.current = $event;
      this.GetPovertyCutOff();
    },

    async GetPovertyCutOff() {
      const queryParams = {

        financial_year_id:this.data.financial_year_id,
        type:this.data.type,
        searchText: this.search,
        perPage: this.pagination.perPage,
        page: this.pagination.current,
      };

      this.$axios
        .get("/admin/poverty/get", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
          params: queryParams,
        })
        .then((result) => {
          this.cut_off = result.data.data;

          this.pagination.current = result.data.current_page;
          this.pagination.total = result.data.last_page;
          this.pagination.grand_total = result.data.total;
        });
    },
    async GetFinancialYear() {
      this.$axios
        .get("/admin/financial-year/get", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          this.financial_years = result.data.data;
        
        });
    },
    deleteCutoff: async function () {

      this.$axios
        .post("/admin/poverty/poverty-cut-off/destroy", this.delete_item, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },

        })
        .then((res) => {

          if (res?.data?.success) {
            this.$toast.error(res.data.message);
          } else {
            this.$toast.success(res.data.message);
          }
          this.deleteDialog = false;
          this.GetPovertyCutOff();
        })
        .catch((error) => {
          console.log(error, "error");
          if (error.response?.data?.errors) {
            this.$refs.form.setErrors(error.response.data.errors);
          }
          console.log(error.response);
          this.$toast.error(error?.response?.data?.message);
        });


    },
    deleteAlert(item) {

      this.deleteDialog = true;
      this.delete_item = item;
      console.log(this.delete_item,"  this.delete_item ")

    },
    updateHeaderTitle() {
      const title = this.$t(
        "container.application_selection.poverty_cut_off.list"
      );
      this.$store.commit("setHeaderTitle", title);
    },
  },
  watch: {
    "$i18n.locale": "updateHeaderTitle",
  },
  created() {
    this.GetFinancialYear();
    this.GetPovertyCutOff();

  },
  beforeMount() {
    this.updateHeaderTitle();
  },
  mounted() {
    this.filters.forEach(item => {
      this.$set(item, 'inputScore', item.score);
    });
  },
};
</script>
<style>
.no-arrow-icon .v-input__icon--append {
  font-weight: bold;
}
</style>
