<template>
  <div id="division">
    <v-row class="mx-5 mt-4">
      <v-col cols="12">
        <v-row>
          <Spinner :loading="isLoading" />
          <v-col cols="12">
            <v-card elevation="10" color="white" rounded="md" theme="light" class="mb-8">
                 <v-card-title tag="div" style="background-color:#1c3b68;color:white;margin-bottom: 17px;font-size:17px;">
                  <h3 class="white--text">
                     {{ $t("container.grievance_management.grievance_subject") }}
                  </h3>
                </v-card-title>
              <v-card-text>

                <v-row justify="space-between" align="center" class="mx-5">
                  <!-- Checkbox on the left -->
                  <v-col lg="3" md="3" cols="12">
                    <v-text-field @keyup.native="GetGrievanceSubject" outlined dense v-model="search"
                      prepend-inner-icon="mdi-magnify" class="my-sm-0 my-3 mx-0v -input--horizontal" variant="outlined"
                      :label="$t('container.list.search')" hide-details color="primary"></v-text-field>
                  </v-col>

                  <!-- Dropdown on the right -->
                  <v-col lg="3" md="3" cols="12" class="text-right ">
                    <v-btn @click="createDialog" color="primary" prepend-icon="mdi-account-multiple-plus"
                      v-can="'division-create'">
                      {{ $t("container.grievance_management.add_grievance_subject") }}
                    </v-btn>
                  </v-col>
                </v-row>

                <!-- Second row without gap -->
                <v-row justify="space-between" align="center" class="mx-4">
                  <!-- Checkbox on the left -->
                  <v-col lg="3" md="3" cols="12">
                    {{ $t('container.list.total') }}:&nbsp;<span style="font-weight: bold;">

                      {{ language === 'bn' ? $helpers.englishToBangla(
                        this.total) : this.total }}
                    </span>
                  </v-col>

                  <!-- Dropdown on the right -->
                  <v-col lg="4" md="6" cols="12" class="text-right">
                    <v-btn elevation="2" class="btn mr-2 white--text" color="red darken-4" @click="GeneratePDF()">
                      <v-icon class="pr-1"> mdi-tray-arrow-down </v-icon> {{ $t("container.list.PDF") }}
                    </v-btn>
                    <v-btn elevation="2" class="btn mr-2 white--text" color="teal darken-2" @click="GenerateExcel()">
                      <v-icon class="pr-1"> mdi-tray-arrow-down </v-icon>
                      {{ $t("container.list.excel") }}
                    </v-btn>
                  </v-col>
                </v-row>

                <v-row class="ma-0 pa-3 white round-border d-flex justify-space-between align-center" justify="center"
                  justify-lg="space-between">

                  <v-col cols="12">
                    <v-data-table :loading="loading" item-key="id" :headers="headers" :items="subjects"
                      :items-per-page="pagination.perPage" @update:options="handleOptionsUpdate" hide-default-footer
                      class="elevation-0 transparent row-pointer">
                      <template v-slot:item.id="{ item, index }">
                        {{ language === 'bn' ? $helpers.englishToBangla(
                          (pagination.current - 1) * pagination.perPage +
                          index +
                          1) : (pagination.current - 1) * pagination.perPage +
                          index +
                          1 }}
                      </template>


                      <template v-slot:item.title_en="{ item }">
                        {{ item.title_en }}
                      </template>
                      <template v-slot:item.title_bn="{ item }">
                        {{ item.title_bn }}
                      </template>
                      <template v-slot:item.status="{ item }">
                        <span v-if="item?.status == '0'"> Inactive </span>
                        <span v-if="item?.status == '1'"> Active </span>
                      </template>

                      <!-- Action Button -->
                      <template v-slot:item.actions="{ item }">
                        <v-tooltip top>
                          <template v-slot:activator="{ on }">
                            <v-btn v-can="'subject-edit'" fab x-small v-on="on" color="success" elevation="0"
                              @click="editDialog(item)">
                              <v-icon> mdi-account-edit-outline </v-icon>
                            </v-btn>
                          </template>
                          <span>
                            {{ $t("container.list.edit") }}
                          </span>
                        </v-tooltip>

                        <v-tooltip top>
                          <template v-slot:activator="{ on }">
                            <v-btn v-can="'division-delete'" fab x-small v-on="on" color="grey" class="ml-3 white--text"
                              elevation="0" @click="deleteAlert(item.id)">
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

      <!-- Grievance Subject add modal  -->
      <v-dialog v-model="dialogAdd" width="650">
        <v-card style="justify-content: center; text-align: center">
          <v-card-title class="font-weight-bold justify-center">
            {{ $t("container.grievance_management.add_new_subject") }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="mt-7">
            <ValidationObserver ref="formAdd" v-slot="{ invalid }">
              <form @submit.prevent="submitGrievanceSubject()">
                <!-- {{errors.code}}
                  {{errors.name_en}} -->
                <ValidationProvider name="Grievance Type" vid="subject" rules="required" v-slot="{ errors }">
                  <v-autocomplete v-model="data.grievance_type_id" outlined :label="$t(
                    'container.grievance_management.main_grievance_type'
                  )
                    " :items="types" item-text="title_en" item-value="id" required
                    :error="errors[0] ? true : false" :error-messages="errors[0]"></v-autocomplete>
                </ValidationProvider>

                <ValidationProvider v-slot="{ errors }" name="Title English" vid="title_en" rules="required">
                  <v-text-field outlined type="text" v-model="data.title_en" :label="$t('container.grievance_management.title_en')
                    " required :error="errors[0] ? true : false" :error-messages="errors[0]">></v-text-field>
                </ValidationProvider>
                <ValidationProvider v-slot="{ errors }" name="Title Bangla" vid="title_bn" rules="required||bangla">
                  <v-text-field outlined type="text" v-model="data.title_bn" :label="$t(
                    'container.grievance_management.title_bn'
                  )
                    " required :error="errors[0] ? true : false" :error-messages="errors[0]">></v-text-field>
                </ValidationProvider>
                <ValidationProvider name="Status" vid="status" v-slot="{ errors }">
                  <v-checkbox v-model="data.status" :label="$t(
                    'container.system_config.demo_graphic.office.active'
                  )
                    " color="green" value="1" :hide-details="errors[0] ? false : true"
                    :error="errors[0] ? true : false" :error-messages="errors[0]"></v-checkbox>
                </ValidationProvider>

                <v-row class="mx-0 my-0 py-2" justify="center">
                  <v-btn @click="dialogAdd = false" outlined class="custom-btn-width py-2 mr-10">
                    {{ $t("container.list.cancel") }}
                  </v-btn>
                  <v-btn type="submit" color="primary" :disabled="invalid" :loading="loading"
                    class="custom-btn-width warning white--text py-2">
                    {{ $t("container.list.submit") }}
                  </v-btn>
                </v-row>
              </form>
            </ValidationObserver>
          </v-card-text>
        </v-card>
      </v-dialog>
      <!-- Grievance Subject add modal  -->

      <!-- Grievance Subject Edit modal  -->
      <v-dialog v-model="dialogEdit" width="650">
        <v-card style="justify-content: center; text-align: center">
          <v-card-title class="font-weight-bold justify-center">
            {{ $t("container.grievance_management.edit_grievance_subject") }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="mt-7">
            <ValidationObserver ref="formEdit" v-slot="{ invalid }">
              <form @submit.prevent="updateGrievanceSubject()">
                <!-- {{errors.code}}
                {{errors.name_en}} -->
                <ValidationProvider name="Grievance Type" vid="subject" rules="required" v-slot="{ errors }">
                  <v-autocomplete v-model="data.grievance_type_id" outlined :label="$t(
                    'container.grievance_management.main_grievance_type'
                  )
                    " :items="types" item-text="title_en" item-value="id" required
                    :error="errors[0] ? true : false" :error-messages="errors[0]"></v-autocomplete>
                </ValidationProvider>

                <ValidationProvider name="Title English" vid="title_en" v-slot="{ errors }">
                  <v-text-field outlined type="text" v-model="data.title_en" :label="$t('container.grievance_management.title_en')
                    " required :error="errors[0] ? true : false" :error-messages="errors[0]"></v-text-field>
                </ValidationProvider>
                <ValidationProvider name="Title Bangla" vid="title_bn" rules="required||bangla" v-slot="{ errors }">
                  <v-text-field outlined type="text" v-model="data.title_bn" :label="$t(
                    'container.grievance_management.title_bn'
                  )
                    " required :error="errors[0] ? true : false" :error-messages="errors[0]"></v-text-field>
                </ValidationProvider>
                <ValidationProvider name="Status" vid="status" v-slot="{ errors }">
                  <v-checkbox v-model="data.status" :label="$t(
                    'container.system_config.demo_graphic.office.active'
                  )
                    " color="green" value="1" :hide-details="errors[0] ? false : true"
                    :error="errors[0] ? true : false" :error-messages="errors[0]"></v-checkbox>
                </ValidationProvider>

                <v-row class="mx-0 my-0 py-2" justify="center">
                  <v-btn @click="dialogEdit = false" outlined class="custom-btn-width py-2 mr-10">
                    {{ $t("container.list.cancel") }}
                  </v-btn>
                  <v-btn type="submit" color="primary" :disabled="invalid" :loading="loading"
                    class="custom-btn-width primary white--text py-2">
                    {{ $t("container.list.update") }}
                  </v-btn>
                </v-row>
              </form>
            </ValidationObserver>
          </v-card-text>
        </v-card>
      </v-dialog>
      <!-- Grievance Subject Edit modal  -->

      <!-- delete modal  -->
      <v-dialog v-model="deleteDialog" width="350">
        <v-card style="justify-content: center; text-align: center">
          <v-card-title class="font-weight-bold justify-center">
            {{ $t("container.grievance_management.grievance_subject_delete") }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <div class="subtitle-1 font-weight-medium mt-5">
              {{
                $t("container.grievance_management.grievance_subject_delete_message")
              }}
            </div>
          </v-card-text>
          <v-card-actions style="display: block">
            <v-row class="mx-0 my-0 py-2" justify="center">
              <v-btn text @click="deleteDialog = false" outlined class="custom-btn-width py-2 mr-10">
                {{ $t("container.list.cancel") }}
              </v-btn>
              <v-btn text @click="deleteDivision()" color="white" :loading="delete_loading"
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
import { http } from "@/hooks/httpService";
import Spinner from "@/components/Common/Spinner.vue";

extend("required", required);
extend('bangla', {
  validate: value => {
    // Regular expression to match Bangla characters
    const banglaRegex = /^[\u0980-\u09FF\s]+$/;
    return banglaRegex.test(value);
  },
  message: 'Only Bangla characters will be allowed in this field'
});
export default {
  name: "Index",
  title: "CTM - Grievance",
  data() {
    return {
      data: {
        id: null,
        status: null,
        title_en: null,
        title_bn: null,
        grievance_type_id: null,
      },
      total: null,
      isLoading: false,
      dialogAdd: false,
      deleteDialog: false,
      dialogEdit: false,
      delete_loading: false,
      loading: false,
      search: "",
      delete_id: "",
      subjects: [],
      types: [],
      AllGrievanceSubject: [],
      errors: {},
      error_status: {},
      pagination: {
        current: 1,
        total: 0,
        perPage: 15,
      },
      sortBy: "title_en",
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
          text: this.$t("container.grievance_management.title_en"),
          value: "title_en",
        },
        {
          text: this.$t(
            "container.grievance_management.title_bn"
          ),
          value: "title_bn",
          class: "highlight-column ",
        },
        {
          text: this.$t(
            "container.grievance_management.main_grievance_type"
          ),
          value: "grievanceTypeEn",
        },
        {
          text: this.$t(
            "container.list.status"
          ),
          value: "status",
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

    }),
  },
  methods: {

    async GeneratePDF() {
      this.isLoading = true;
      let page;
      if (!this.sortBy) {
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
        .get("/admin/grievanceSubject/get", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
          params: queryParams,
        })
        .then((result) => {
          this.AllGrievanceSubject = result.data.data;
        });

      const HeaderInfo = [
        this.$t("container.list.sl"),
        this.$t("container.grievance_management.title_en"),
        this.$t("container.grievance_management.title_bn"),
        this.$t("container.grievance_management.main_grievance_type"),
        this.$t("container.list.status"),
      ]

      const CustomInfo = this.AllGrievanceSubject.map(((i, index) => {
        return [
          this.$i18n.locale == 'en' ? index + 1 : this.$helpers.englishToBangla(index + 1),
          this.$i18n.locale == 'en' ? i.title_en : i.title_en,
          this.$i18n.locale == 'en' ? i.title_bn : i.title_bn,
          this.$i18n.locale == 'en' ? i.grievanceTypeEn : i.grievanceTypeBn,
          this.$i18n.locale == 'en' ? this.status(i.status) : this.status(i.status),
        ]
      }));

      const queryParam = {
        language: this.$i18n.locale,
        data: CustomInfo,
        header: HeaderInfo,
        fileName: this.$t("container.grievance_management.grievance_subject"),
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
    status(status) {
      if (status == 1) {
        return this.$i18n.locale == 'en' ? 'Active' : 'সক্রিয়'
      } else {
        return this.$i18n.locale == 'en' ? 'Inactive ' : 'নিষ্ক্রিয়'
      }
    },
    async GenerateExcel() {
      this.isLoading = true;
      let page;
      if (!this.sortBy) {
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
        .get("/admin/grievanceSubject/get", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
          params: queryParams,
        })
        .then((result) => {
          this.AllGrievanceSubject = result.data.data;
          console.log(this.AllGrievanceSubject, 'excel')
        })
        .catch(error => {
          this.isLoading = false;
        });

      try {
        import('@/plugins/Export2Excel').then((excel) => {

          const HeaderInfo = [
            this.$t("container.list.sl"),
            this.$t("container.grievance_management.title_en"),
            this.$t("container.grievance_management.title_bn"),
            this.$t("container.grievance_management.main_grievance_type"),
            this.$t("container.list.status"),
          ]

          const CustomInfo = this.AllGrievanceSubject.map(((i, index) => {
            return {
              "sl": this.$i18n.locale == 'en' ? index + 1 : this.$helpers.englishToBangla(index + 1),
              "title_en": this.$i18n.locale == 'en' ? i.title_en : i.title_en,
              "title_bn": this.$i18n.locale == 'en' ? i.title_bn : i.title_bn,
              "grievance_type_id": this.$i18n.locale == 'en' ? i.grievanceTypeEn : i.grievanceTypeBn,
              "status": this.$i18n.locale == 'en' ? this.status(i.status) : this.status(i.status),
            }
          }));

          const Field = ['sl', 'title_en', 'title_bn', 'grievance_type_id', 'status']

          const Data = this.FormatJson(Field, CustomInfo)
          const currentDate = new Date().toISOString().slice(0, 10); //
          let dateinfo = queryParams.language == 'en' ? currentDate : this.$helpers.englishToBangla(currentDate)

          const filenameWithDate = `${dateinfo}_${this.$t("container.grievance_management.grievance_subject")}`;

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

    FormatJson(FilterData, JsonData) {
      return JsonData.map((v) =>
        FilterData.map((j => {
          return v[j];
        })))
    },


    createDialog() {
      if (this.$refs.formAdd) {
        this.$refs.formAdd.reset();
      }
      this.resetForm();
      this.dialogAdd = true;
    },
    checkLanguage() {
      let checkLanguageEnglish = this.$checkLanguage(this.data.title_en);
      let checkLanguageBangla = this.$checkLanguage(this.data.title_bn);
      let errs = {};

      if (
        checkLanguageBangla !== "Bangla" &&
        checkLanguageBangla !== "BanglaSpecialChar"
      ) {
        errs.title_bn = ["Please Enter in Bangla Language in this Field"];
      }

      if (checkLanguageEnglish != "English") {
        errs.title_en = ["Please Enter in English Language in this Field"];
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
    submitGrievanceSubject() {
      if (!this.checkLanguage()) {
        return;
      }

      try {

        this.$axios
          .post(`/admin/grievanceSubject/store`, this.data, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },

          })
          .then((res) => {
            if (res.data?.success) {
              this.$toast.success("Data Inserted Successfully");
              this.resetForm();
              this.dialogAdd = false;
              this.GetGrievanceSubject();
            } else if (res.response?.data?.errors) {
              this.$refs.formAdd.setErrors(res.response.data.errors);
            }
          });
      } catch (e) {
      }
    },
    editDialog(item) {
      console.log(item, 'itemitemitemitem');
      this.dialogEdit = true;
      // this.data.status = item.status;
      this.data.status = String(item.status);
      this.data.title_en = item.title_en;
      this.data.title_bn = item.title_bn;
      this.data.grievance_type_id = item.grievance_type_id;
      this.data.id = item.id;
      this.errors = {};
    },
    updateGrievanceSubject() {
      if (!this.checkLanguage()) {
        return;
      }

      try {
        this.$axios
          .post(`/admin/grievanceSubject/update/`, this.data, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },

          })
          .then((data) => {
            if (data != null) {
              this.$toast.success("Data Updated Successfully");
              this.dialogEdit = false;
              this.resetForm();
              this.GetGrievanceSubject();
            } else {
              this.$refs.formEdit.setErrors(data.errors);
            }
          });
      } catch (e) {
      }
    },
    resetForm() {
      // Reset the form data
      this.data = {
        status: "",
        title_en: "",
        title_bn: "",
        grievance_type_id: "",
        // Reset other form fields
      };
      this.errors = {};
    },

    onPageChange($event) {
      // this.pagination.current = $event;
      this.GetGrievanceSubject();
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
      // this.GetDivision();

      const queryParams = {
        sortBy: this.sortBy,
        orderBy: this.sortDesc,
      };

      // alert(JSON.stringify(queryParams));
    },

    async GetGrievanceType() {
       this.loading = true;
      const queryParams = {
        searchText: this.search,
        perPage: this.pagination.perPage,
        page: this.pagination.current,
        sortBy: this.sortBy,
        sortDesc: this.sortDesc,
        status: 'active',
      };
      this.$axios
        .get("/admin/grievanceType/get", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
          params: queryParams,
        })
        .then((result) => {
          this.types = result.data.data;
           this.loading = false;

        });
    },

    async GetGrievanceSubject() {
      const queryParams = {
        searchText: this.search,
        perPage: this.pagination.perPage,
        page: this.pagination.current,
        sortBy: this.sortBy,
        sortDesc: this.sortDesc,
      };
      this.$axios
        .get("/admin/grievanceSubject/get", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
          params: queryParams,
        })
        .then((result) => {
          console.log(result, ' this.subjects11111');
          this.total = result.data.meta.total;
          this.subjects = result.data.data;

          this.pagination.current = result.data.meta.current_page;
          this.pagination.total = result.data.meta.last_page;
          this.pagination.grand_total = result.data.meta.total;
        });
    },
    deleteDivision: async function () {
      try {
        this.$axios
          .delete(`/admin/grievanceSubject/destroy/${this.delete_id}`, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
            },

          })
          .then((res) => {
            // check if the request was successful
            if (res?.data?.success) {
              this.$toast.success(res.data.message);
            } else {
              this.$toast.error(res.response.data.message);
            }
            this.deleteDialog = false;
            this.GetGrievanceSubject();
          })
          .catch((error) => {
            console.log(error, "error");
          });
      } catch (e) {
        console.log(e);
      }
    },
    deleteAlert(id) {
      this.data.id = id;
      // alert(JSON.stringify(id));
      this.deleteDialog = true;
      this.delete_id = id;
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
    this.GetGrievanceType();
  },
  beforeMount() {
    this.updateHeaderTitle();
    this.GetGrievanceSubject();
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