<template>
  <div id="time-slot">
    <v-row class="mx-5 mt-4">
      <v-col cols="12">
        <v-row>
          <Spinner :loading="isLoading" />
          <v-col cols="12">
            <v-card elevation="10" color="white" rounded="md" theme="light" class="mb-8">




              <v-card-title class="justify-center" tag="div"
                style="background-color: #1C3C6A; color: white;font-size: 17px;">
                <h3>
                  {{ $t("container.training_management.time_slot.list") }}
                </h3>
              </v-card-title>
              <v-card-text>
                <!-- First row -->
                <v-row justify="space-between" align="center" class="mx-5 mt-10">
                  <!-- Checkbox on the left -->
                  <v-col lg="3" md="3" cols="12">
                    <v-text-field @keyup.native="pagesetup()" outlined dense v-model="search"
                      prepend-inner-icon="mdi-magnify" class="my-sm-0 my-3 mx-0v -input--horizontal" variant="outlined"
                      :label="$t('container.list.search')" hide-details color="primary"></v-text-field>
                  </v-col>

                  <!-- Dropdown on the right -->
                  <v-col lg="3" md="3" cols="12" class="text-right ">
                    <v-btn @click="createDialog" color="primary" prepend-icon="mdi-account-multiple-plus"
                      v-can="'timeSlot-create'">
                      {{ $t("container.training_management.time_slot.add") }}
                    </v-btn>
                  </v-col>
                </v-row>

                <!-- Second row without gap -->
                <v-row class="ml-6 mr-2">
                  <v-col cols="12" lg="6" md="6">
                    {{ $t('container.list.total') }}:&nbsp;<span style=" font-weight: bold;">
                      {{ language === 'bn' ? $helpers.englishToBangla(
                      this.total) : this.total }}
                    </span>

                  </v-col>
                  <v-col cols="12" lg="6" md="6" class="text-right">
                    <v-btn elevation="2" class="btn white--text " flat color="red darken-4" @click="GeneratePDF()">
                      <v-icon class="pl-1"> mdi-tray-arrow-down </v-icon> {{
                      $t("container.list.PDF") }}
                    </v-btn>

                    <v-btn elevation="2" class="btn white--text ml-2" flat color="teal darken-2"
                      @click="GenerateExcel()">
                      <v-icon class="pl-1"> mdi-tray-arrow-down </v-icon> {{
                      $t("container.list.excel") }}
                    </v-btn>

                  </v-col>





                </v-row>

                <v-row class="ma-0 pa-3 white round-border d-flex justify-space-between align-center" justify="center"
                  justify-lg="space-between">
                  <v-col cols="12">
                    <v-data-table :loading="loading" item-key="id" :headers="headers" :items="divisions"
                      :items-per-page="pagination.perPage" @update:options="handleOptionsUpdate" hide-default-footer
                      class="elevation-0 transparent row-pointer">
                      <template v-slot:item.id="{ item, index }">

                        {{ language== 'en' ? (pagination.current - 1) * pagination.perPage +
                        index +
                        1 : $helpers.englishToBangla((pagination.current - 1) * pagination.perPage +
                        index +
                        1 )}}
                      </template>





                      <!-- Action Button -->
                      <template v-slot:item.actions="{ item }">
                        <v-tooltip top>
                          <template v-slot:activator="{ on }">
                            <v-btn v-can="'time_slot-edit'" fab x-small v-on="on" color="success" elevation="0"
                              @click="editDialog(item)">
                              <v-icon> mdi-account-edit-outline </v-icon>
                            </v-btn>
                          </template>
                          <span>
                            {{ $t("container.list.update") }}
                          </span>
                        </v-tooltip>

                        <v-tooltip top v-if="!item.children_count">
                          <template v-slot:activator="{ on }">
                            <v-btn v-can="'time_slot-delete'" fab x-small v-on="on" color="grey"
                              class="ml-3 white--text" elevation="0" @click="deleteAlert(item.id)">
                              <v-icon> mdi-delete </v-icon>
                            </v-btn>
                          </template>
                          <span> {{ $t("container.list.delete") }}</span>
                        </v-tooltip>
                      </template>
                      <!-- End Action Button -->

                      <template v-slot:footer="item">
                        <!-- <div class="text-center pt-2 v-data-footer justify-center pb-2">
                          <v-select style="
                              position: absolute;
                              right: 25px;
                              width: 149px;
                              transform: translate(0px, 0px);
                            " :items="items" hide-details dense outlined @change="onPageChange"
                            v-model="pagination.perPage"></v-select>
                          <v-pagination circle primary v-model="pagination.current" :length="pagination.total"
                            @input="onPageChange" :total-visible="11" class="custom-pagination-item"></v-pagination>
                        </div> -->
                        <row class="text-right pt-2 v-data-footer justify-end pb-2">



                          <v-col cols="12" lg="4" md="4" sm="12" xs="12" class="text-right">
                            <v-pagination circle primary v-model="pagination.current" :length="pagination.total"
                              @input="onPageChange" :total-visible="11"
                              class="custom-pagination-item"></v-pagination></v-col>
                          <v-col cols="12" lg="4" md="4" sm="12" xs="12" class="text-right">
                            <v-select style="
                     
                            
                                    
                                                " :items="items" hide-details dense outlined @change="onPageChange"
                              v-model="pagination.perPage"></v-select>


                          </v-col>
                        </row>
                      </template>
                    </v-data-table>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>

      <!-- division add modal  -->
      <v-dialog v-model="dialogAdd" width="650">
        <v-card style="justify-content: center; text-align: center">
          <v-card-title class="font-weight-bold justify-center"
            style="background-color: #1C3C6A; color: white;font-size: 12px;">
            {{ $t("container.training_management.time_slot.add") }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="mt-7">
            <ValidationObserver ref="formAdd" v-slot="{ invalid }">
              <form @submit.prevent="submitDivision()">
                <!-- {{errors.code}}
                  {{errors.name_en}} -->

                <ValidationProvider v-slot="{ errors }" name="Time Slot" vid="time" rules="required||checklength">
                  <v-text-field outlined type="text" v-model="data.time"
                    :label="$t('container.training_management.time_slot.time')"
                    :error-messages="errors[0] ? (language == 'bn' ? 'অনুগ্রহ পূর্বক  শুধুমাত্র ইংরেজি অক্ষর, সংখ্যা এবং হাইফেন (-) সহ সর্বাধিক 20 অক্ষর প্রদান করুন ' : 'Please enter time up to 20 characters with only English letters, numbers, and hyphen (-).') : ''">

                  </v-text-field>

                </ValidationProvider>

                <v-row class="mx-0 my-0 py-2" justify="center">
                  <v-btn @click="dialogAdd = false" outlined class="custom-btn-width py-2 mr-10">
                    {{ $t("container.list.cancel") }}
                  </v-btn>
                  <v-btn type="submit" color="primary" :disabled="invalid" class="custom-btn-width  white--text py-2">
                    {{ $t("container.list.submit") }}
                  </v-btn>
                </v-row>
              </form>
            </ValidationObserver>
          </v-card-text>
        </v-card>
      </v-dialog>
      <!-- division add modal  -->

      <!-- division Edit modal  -->
      <v-dialog v-model="dialogEdit" width="650">
        <v-card style="justify-content: center; text-align: center">
          <v-card-title class="font-weight-bold justify-center"
            style="background-color: #1C3C6A; color: white;font-size: 12px;">
            {{ $t("container.training_management.time_slot.edit") }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="mt-7">
            <ValidationObserver ref="formEdit" v-slot="{ invalid }">
              <form @submit.prevent="updateDivision()">
                <!-- {{errors.code}}
                  {{errors.name_en}} -->

                <ValidationProvider v-slot="{ errors }" name="Time Slot" vid="time" rules="required||checklength">
                  <v-text-field outlined type="text" v-model="data.time"
                    :label="$t('container.training_management.time_slot.time')"
                    :error-messages="errors[0] ? (language == 'bn' ? 'অনুগ্রহ পূর্বক  শুধুমাত্র ইংরেজি অক্ষর, সংখ্যা এবং হাইফেন (-) সহ সর্বাধিক 20 অক্ষর প্রদান করুন ' : 'Please enter time up to 20 characters with only English letters, numbers, and hyphen (-).') : ''">

                  </v-text-field>
                </ValidationProvider>

                <v-row class="mx-0 my-0 py-2" justify="center">
                  <v-btn @click="dialogEdit = false" outlined class="custom-btn-width py-2 mr-10">
                    {{ $t("container.list.cancel") }}
                  </v-btn>
                  <v-btn type="submit" color="primary" :disabled="invalid" class="custom-btn-width  white--text py-2">
                    {{ $t("container.list.update") }}
                  </v-btn>
                </v-row>
              </form>
            </ValidationObserver>
          </v-card-text>
        </v-card>
      </v-dialog>
      <!-- division Edit modal  -->

      <!-- delete modal  -->
      <v-dialog v-model="deleteDialog" width="350">
        <v-card style="justify-content: center; text-align: center">
          <v-card-title class="font-weight-bold justify-center"
            style="background-color: #1C3C6A; color: white;font-size: 12px;">
            {{ $t("container.training_management.time_slot.delete_header") }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <div class="subtitle-1 font-weight-medium mt-5">
              {{
              $t("container.training_management.time_slot.delete_alert")
              }}
            </div>
          </v-card-text>
          <v-card-actions style="display: block">
            <v-row class="mx-0 my-0 py-2" justify="center">
              <v-btn text @click="deleteDialog = false" outlined class="custom-btn-width py-2 mr-10">
                {{ $t("container.list.cancel") }}
              </v-btn>
              <v-btn text @click="deleteDivision()" color="white" class="custom-btn-width warning white--text py-2">
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
import { http } from "@/hooks/httpService";
import Spinner from "@/components/Common/Spinner.vue";

extend("required", required);
extend('checklength', {
  validate: value => {
    // Regular expression to match only English letters, numbers, and hyphen
    const regex = /^[a-zA-Z0-9-]+$/;
    return value.length <= 20 && regex.test(value);
  },
  message: 'Please enter time up to 20 characters with only English letters, numbers, and hyphen (-).'
});

extend("checkName", {
  validate: (value) => {
    if (!value && value !== 0) {
      return false;
    }

    return /^[a-zA-Z\s]+$/.test(value);
  },
  message: "Please Enter English Letter's in this Field",
});

extend("checkNameBn", {
  validate: (value) => {
    if (!value && value !== 0) {
      return false;
    }

    var banglaRegex = /^[\u0980-\u09E5\u09F0-\u09FF\s]+$/;

    return banglaRegex.test(value);
  },
  message: "Please Enter Bangla Letter's in this Field",
});
export default {
  name: "Index",
  title: "CTM - Time Slot",
  data() {
    return {
      data: {
        id: null,
        time: null,
      },
      loading:false,
      total:null,
      isLoading:false,
      dialogAdd: false,
      deleteDialog: false,
      dialogEdit: false,
      delete_loading: false,
      loading: false,
      search: "",
      delete_id: "",
      divisions: [],
      Alldivisions: [],
      errors: {},
      error_status: {},
      pagination: {
        current: 1,
        total: 0,
        perPage: 15,
      },
      sortBy: "name_en",
      sortDesc: false, //ASC
      // errors: "",
      items: [5, 10, 15, 20, 40, 50, 100],
    };
  },

  watch: {
    "$i18n.locale": "updateHeaderTitle",
  },

  components: {
    Spinner,
    ValidationProvider,
    ValidationObserver,
  },
  computed: {

      language: {
        get() {
          return this.$store.getters.getAppLanguage;
        }
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
            "container.training_management.time_slot.time"
          ),
          value: "time",
        },
        {
          text: this.$t("container.list.action"),
          value: "actions",
          align: "center",
          sortable: false,
        },
      ];
    },

    ...mapState({
      message: (state) => state.Division.success_message,

      // errors: (state) => state.Division.errors,
      // error_status: (state) => state.Division.error_status,
    }),
  },
  methods: {
    pagesetup(){
      this.pagination.current=1;
      this.GetData();
    },

    async GeneratePDF() {
      // this.isLoading = true;
      let page;
      if(!this.sortBy){
        page = this.pagination.current;
      }
      const queryParams = {
        language: this.$i18n.locale,
        searchText: this.search,
        perPage: this.search.trim() === '' ? this.total : this.total,
        page: 1,
        sortBy: this.sortBy,
        orderBy: this.sortDesc,
      };

      await this.$axios
        .get("/admin/training/time-slots", {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
            params: queryParams,
          })
          .then((result) => {
            this.Alldivisions = result?.data?.data?.data;
          });

      const HeaderInfo = [
        this.$t("container.list.sl"),
        this.$t("container.training_management.time_slot.time"),
    
      ]

      const CustomInfo = this.Alldivisions.map(((i,index) => {
        return [
          this.$i18n.locale == 'en' ? index + 1 : this.$helpers.englishToBangla(index + 1),
     
           i?.time ,
        ]
      }));

      const queryParam = {
        language: this.$i18n.locale,
        data:CustomInfo,
        header:HeaderInfo,
        fileName: this.$t("container.training_management.time_slot.list"),
      };
      try {
        const response = await this.$axios.post("/admin/generate-pdf", queryParam, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "application/json", // Set content type to JSON
          },
          responseType: 'arraybuffer',
        });

        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url, '_blank');
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        console.error('Error generating PDF:', error);
      }
    },

    async GenerateExcel(){
    
      let page;
      if(!this.sortBy){
        page = this.pagination.current;
      }
      const queryParams = {
        language: this.$i18n.locale,
        searchText: this.search,
        perPage: this.search.trim() === '' ? this.total : this.total,
        page: 1,
        sortBy: this.sortBy,
        orderBy: this.sortDesc,
      };

      await this.$axios
        .get("/admin/training/time-slots", {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
            params: queryParams,
          })
          .then((result) => {
            this.Alldivisions = result?.data?.data?.data;
          })
          .catch(error => {
            this.isLoading = false;
          });

      try {
        import('@/plugins/Export2Excel').then((excel) => {

          const HeaderInfo = [
            this.$t("container.list.sl"),
            this.$t("container.training_management.time_slot.time"),
          
          ]

          const CustomInfo = this.Alldivisions.map(((i,index) => {
            return {
              "sl" : this.$i18n.locale == 'en' ? index + 1 : this.$helpers.englishToBangla(index + 1),
              "time" :i?.time,
              
            }
          }));

          const Field = ['sl','time']

          const Data = this.FormatJson(Field, CustomInfo)
          const currentDate = new Date().toISOString().slice(0, 10); //
          let dateinfo = queryParams.language == 'en' ? currentDate : this.$helpers.englishToBangla(currentDate)

          const filenameWithDate = `${dateinfo}_${this.$t("container.training_management.time_slot.list_1")}`;

          excel.export_json_to_excel({
            header: HeaderInfo,
            data: Data,
            sheetName: filenameWithDate,
            filename: filenameWithDate,
            autoWidth: true,
            bookType: "xlsx"
          })
        })
      } catch (error) {
        // Handle any errors here
        this.isLoading = false;
      } finally {
        this.isLoading = false;
      }
    },

    FormatJson(FilterData,JsonData){
      return JsonData.map((v) =>
          FilterData.map((j => {
            return v[j];
          })))
    },


    registerCustomRules() {
      extend("codeRules", (value) => {
        const regex = /^\d{1,2}$/;

        return (
            regex.test(value.toString()) ||
          this.$t("container.system_config.demo_graphic.division.code") +
            " can have maximum 2 digit"
        );
      });
    },
    createDialog() {
      if (this.$refs.formAdd) {
        this.$refs.formAdd.reset();
      }
      this.resetForm();
      this.dialogAdd = true;
    },
    checkLanguage() {
      let checkLanguageEnglish = this.$checkLanguage(this.data.name_en);
      let checkLanguageBangla = this.$checkLanguage(this.data.name_bn);
      let errs = {};

      if (
        checkLanguageBangla !== "Bangla" &&
        checkLanguageBangla !== "BanglaSpecialChar"
      ) {
        errs.name_bn = ["Please Enter in Bangla Language in this Field"];
      }

      if (checkLanguageEnglish != "English") {
        errs.name_en = ["Please Enter in English Language in this Field"];
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
      this.loading = true;
      this.$axios
        .post("admin/training/time-slots", this.data, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {

          this.$toast.success(result.data.message);
          this.dialogAdd = false;
          this.loading = false;
          this.GetData();
       


        })
        .catch((err) => {
        

        });
      
    },
    editDialog(item) {
      this.dialogEdit = true;
      this.data.id = item.id;
      this.data.time = item.time;
      this.errors = {};
    },
    updateDivision() {
      this.loading = true;
      const formData = new FormData();
      // Append data to FormData object
      formData.append('time', this.data.time);
      
      formData.append('_method', "PUT");
      this.$axios
        .post(`admin/training/time-slots/${this.data.id}`, formData, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {

          this.$toast.success(result.data.message);
          this.dialogEdit = false;
          this.loading= false;
          this.GetData();



        })
        .catch((err) => {
          console.log(err, "err")
   

        });

      
    },
    resetForm() {
      // Reset the form data
      this.data = {
        code: "",
        name_en: "",
        name_bn: "",
        // Reset other form fields
      };
      this.errors = {};
    },

    onPageChange($event) {
      // this.pagination.current = $event;
      this.GetData();
    },
    setInitialHeader() {
      for (let i = 0; i < this.headers.length; i++) {
        if (this.headers[i].value == "name_en") {
          this.headers[i].class = "highlight-column";
        } else {
          this.headers[i].class = "";
        }
      }
    },
    handleOptionsUpdate({ sortBy, sortDesc }) {
      for (let i = 0; i < this.headers.length; i++) {
        if (this.headers[i].value == sortBy) {
          this.headers[i].class = "highlight-column";
        } else {
          this.headers[i].class = "";
        }
      }
      this.sortBy = "name_en";
      this.sortDesc = "asc";
      if (sortBy.length === 0 || sortDesc.length === 0) {
        this.sortBy = "name_en";
        this.sortDesc = "asc";
      } else {
        this.sortBy = sortBy[0];
        this.sortDesc = sortDesc[0] == true ? "desc" : "asc";
      }
      this.GetData();
      this.loading = true;

      const queryParams = {
        sortBy: this.sortBy,
        orderBy: this.sortDesc,
      };

      // alert(JSON.stringify(queryParams));
    },

    async GetData() {
      const queryParams = {
        search: this.search,
        perPage: this.pagination.perPage,
        page: this.pagination.current,
        sortBy: this.sortBy,
        sortDesc: this.sortDesc,
      };
      this.$axios
        .get("/admin/training/time-slots", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
          params: queryParams,
        })
        .then((result) => {
          this.total = result?.data?.data?.total;
          console.log(result,"result")
          this.divisions = result.data.data.data;
          this.pagination.current = result?.data?.data?.current_page;
          this.pagination.total = result?.data?.data?.last_page;
          this.pagination.grand_total = result?.data?.data?.total;
          this.loading = false;
        });
    },
    deleteDivision: async function () {
      this.$axios
        .delete(`admin/training/time-slots/${this.delete_id}`, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "application/json", // Use application/json instead of multipart/form-data
          },
        })
        .then((res) => {
          console.log(res.data, "res.data")
          if (res?.data?.success == true) {
            this.$toast.success(res.data.message);
            this.deleteDialog = false;
            this.GetData();
          }
          if (res?.data?.success == false) {
            this.$toast.error(res.data.message);
          }



        })
        .catch((error) => {
          console.log(error, "error");

        });
      
    },
    deleteAlert(id) {
      console.log(id,"this.delete_id");
  
      // alert(JSON.stringify(id));
      this.deleteDialog = true;
      this.delete_id = id;
      console.log(this.delete_id, "this.delete_id");
    },
    updateHeaderTitle() {
      const title = this.$t(
        "container.system_config.demo_graphic.division.list"
      );
      this.$store.commit("setHeaderTitle", title);
    },

    generatePdf() {

      this.$axios
          .get("global/pdf", {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then(response => {
            // Handle the successful response, e.g., open the generated PDF in a new tab
            window.open(response.data.data.url, '_blank');

          })
          .catch(error => {
            console.error('Error generating PDF:', error);
          });
    }
  },
  mounted() {
    this.setInitialHeader();
  },
  created() {
    this.registerCustomRules();
    // this.GetData();
  },
  beforeMount() {
    this.updateHeaderTitle();
  },
};
</script>
<style>
.highlight-column {
  background-color: #e0eaf1;
}
  .bold-text {
    font-weight: bold;
  }
</style>