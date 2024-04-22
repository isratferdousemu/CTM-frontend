<template>
  <div id="division">
    <v-row class="mx-5 mt-4">
      <v-col cols="12">
        <v-row>
          <Spinner :loading="isLoading" />
          <v-col cols="12">
            <v-card elevation="10" color="white" rounded="md" theme="light" class="mb-8">
              <v-card-title class="justify-center" tag="div">
                <h3 class="text-uppercase pt-3">
                  {{ $t("container.grievance_management.grievance_settings") }}
                </h3>
              </v-card-title>
              <v-card-text>

                <v-row justify="space-between" align="center" class="mx-5">
                  <!-- Checkbox on the left -->
                  <v-col lg="3" md="3" cols="12">
                    <v-text-field @keyup.native="GetGrievanceSettings" outlined dense v-model="search"
                      prepend-inner-icon="mdi-magnify" class="my-sm-0 my-3 mx-0v -input--horizontal" variant="outlined"
                      :label="$t('container.list.search')" hide-details color="primary"></v-text-field>
                  </v-col>

                  <!-- Dropdown on the right -->
                  <v-col lg="3" md="3" cols="12" class="text-right ">
                    <v-btn @click="createDialog" color="primary" prepend-icon="mdi-account-multiple-plus"
                      v-can="'division-create'">
                      {{ $t("container.grievance_management.grievance_setup") }}
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
                    <v-data-table :loading="loading" item-key="id" :headers="headers" :items="settings"
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
                        {{ item.grievance_type_id }}
                      </template>
                      <template v-slot:item.title_bn="{ item }">
                        {{ item.grievance_type_id }}
                      </template>
                      <template v-slot:item.first_tire_solution_time="{ item }">
                        {{ item.first_tire_solution_time }}
                      </template>
                      <template v-slot:item.secound_tire_solution_time="{ item }">
                        {{ item.secound_tire_solution_time ?? 'N/A' }}
                      </template>
                      <template v-slot:item.secound_tire_officer="{ item }">
                        {{ item.secound_tire_officer ?? 'N/A' }}
                      </template>

                      <template v-slot:item.third_tire_solution_time="{ item }">
                        {{ item.third_tire_solution_time ?? 'N/A' }}
                      </template>

                      <template v-slot:item.third_tire_officer="{ item }">
                        {{ item.third_tire_officer ?? 'N/A' }}
                      </template>


                      <!-- Action Button -->
                      <template v-slot:item.actions="{ item }">
                        <v-tooltip top>
                          <template v-slot:activator="{ on }">
                            <v-btn v-can="'division-edit'" fab x-small v-on="on" color="success" elevation="0"
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

      <!-- Grievance Settings add modal  -->
      <v-dialog v-model="dialogAdd" width="1050">
        <v-card style="justify-content: center; text-align: center">
          <v-card-title class="font-weight-bold justify-center">
            {{ $t("container.grievance_management.add_new_grievance_setting") }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="mt-7">
            <ValidationObserver ref="formAdd" v-slot="{ invalid }">
              <form @submit.prevent="submitGrievanceSetting()">
                <!-- {{errors.code}}
                  {{errors.name_en}} -->
                <v-row>
                  <v-col>
                    <ValidationProvider name="Grievance Type" vid="type" rules="required" v-slot="{ errors }">
                      <v-autocomplete v-model="data.grievance_type_id" outlined :label="$t(
                        'container.grievance_management.main_grievance_type'
                      )
                        " :items="types" item-text="title_en" item-value="id" required
                        :error="errors[0] ? true : false" :error-messages="errors[0]"></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <v-col>
                    <ValidationProvider name="Grievance Subject" vid="grievance_subject_id" rules="required"
                      v-slot="{ errors }">
                      <v-autocomplete v-model="data.grievance_subject_id" outlined :label="$t(
                        'container.grievance_management.grievance_subject'
                      )
                        " :items="subjects" item-text="title_en" item-value="id" required
                        :error="errors[0] ? true : false" :error-messages="errors[0]"></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                </v-row>

                <v-row v-for="(OfficerForm, index) in data.OfficerForm" :key="index">
                  <v-col>
                    <ValidationProvider name="Grievance Type" vid="subject" rules="required" v-slot="{ errors }">
                      <v-autocomplete v-model="OfficerForm.first_tire_officer" outlined :label="dynamicLabel(index)"
                        :items="roles" item-text="name" item-value="id" required :error="errors[0] ? true : false"
                        :error-messages="errors[0]"></v-autocomplete>

                    </ValidationProvider>

                  </v-col>
                  <v-col cols="5">
                    <ValidationProvider v-slot="{ errors }" name="Solution Time" vid="first_tire_solution_time"
                      rules="required">
                      <v-text-field outlined type="number" v-model="OfficerForm.first_tire_solution_time" :label="$t('container.grievance_management.solution_time')
                        " required :error="errors[0] ? true : false" :error-messages="errors[0]">></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col cols="1">
                    <v-btn class="mx-2" fab dark x-small color="red" @click="remove(index)">
                      <v-icon dark> mdi-minus </v-icon>
                    </v-btn>

                    <v-btn v-if="index === countInput && index < 2" class="mx-2" fab dark x-small color="green"
                      @click="addmore(index)">
                      <!-- <v-icon dark> mdi-plus </v-icon> -->
                      <v-icon> mdi-plus </v-icon>
                    </v-btn>
                  </v-col>
                </v-row>

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
      <!-- Grievance Settings add modal  -->

      <!-- Grievance Settings Edit modal  -->
      <v-dialog v-model="dialogEdit" width="1050">
        <v-card style="justify-content: center; text-align: center">
          <v-card-title class="font-weight-bold justify-center">
            {{ $t("container.grievance_management.edit_grievance_setting") }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="mt-7">
            <ValidationObserver ref="formEdit" v-slot="{ invalid }">
              <form @submit.prevent="updateGrievanceSetting()">
                <!-- {{errors.code}}
                {{errors.name_en}} -->
                <v-row>
                  <v-col>
                    <ValidationProvider name="Grievance Type" vid="type" rules="required" v-slot="{ errors }">
                      <v-autocomplete v-model="data.grievance_type_id" outlined :label="$t(
                        'container.grievance_management.main_grievance_type'
                      )
                        " :items="types" item-text="title_en" item-value="id" required
                        :error="errors[0] ? true : false" :error-messages="errors[0]"></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <v-col>
                    <ValidationProvider name="Grievance Subject" vid="grievance_subject_id" rules="required"
                      v-slot="{ errors }">
                      <v-autocomplete v-model="data.grievance_subject_id" outlined :label="$t(
                        'container.grievance_management.grievance_subject'
                      )
                        " :items="subjects" item-text="title_en" item-value="id" required
                        :error="errors[0] ? true : false" :error-messages="errors[0]"></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                </v-row>
                <v-row v-for="(OfficerForm, index) in data.OfficerForm" :key="index">
                  <v-col>
                    <ValidationProvider name="Officer" vid="First Tire Officer" rules="required" v-slot="{ errors }">
                      <v-autocomplete v-model="OfficerForm.first_tire_officer" outlined :label="dynamicLabel(index)
                        " :items="roles" item-text="name" item-value="id" required :error="errors[0] ? true : false"
                        :error-messages="errors[0]"></v-autocomplete>
                    </ValidationProvider>

                  </v-col>
                  <v-col cols="5">
                    <ValidationProvider v-slot="{ errors }" name="Solution Time" vid="first_tire_solution_time"
                      rules="required">
                      <v-text-field outlined type="number" v-model="OfficerForm.first_tire_solution_time" :label="$t('container.grievance_management.solution_time')
                        " required :error="errors[0] ? true : false" :error-messages="errors[0]">></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col cols="1">
                    <v-btn class="mx-2" fab dark x-small color="red" @click="remove(index)">
                      <v-icon dark> mdi-minus </v-icon>
                    </v-btn>
                    <v-btn v-if="index === countInput && index < 2" class="mx-2" fab dark x-small color="green"
                      @click="addmore(index)">
                      <v-icon> mdi-plus</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>


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
      <!-- Grievance Settings Edit modal  -->

      <!-- delete modal  -->
      <v-dialog v-model="deleteDialog" width="350">
        <v-card style="justify-content: center; text-align: center">
          <v-card-title class="font-weight-bold justify-center">
            {{ $t("container.grievance_management.grievance_setting_delete") }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <div class="subtitle-1 font-weight-medium mt-5">
              {{
                $t("container.grievance_management.grievance_setting_delete_message")
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
export default {
  name: "Index",
  title: "CTM - Grievance",
  data: () => ({
    data: {
      id: null,
      grievance_type_id: null,
      grievance_subject_id: null,
      OfficerForm: [
        {
          first_tire_officer: "",
          first_tire_solution_time: "",
        },
      ],

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
    roles: [],
    settings: [],
    AllGrievanceSettings: [],
    errors: {},
    error_status: {},
    pagination: {
      current: 1,
      total: 0,
      perPage: 15,
    },
    sortBy: "id",
    sortDesc: false, //ASC
    // errors: "",
    items: [5, 10, 15, 20, 40, 50, 100],
    countInput: 0,
  }),

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
          text: this.$t("container.grievance_management.main_grievance_type"),
          value: "grievanceTypeEn",
        },
        {
          text: this.$t(
            "container.grievance_management.grievance_subject"
          ),
          value: "grievanceSubjectEn",
          class: "highlight-column ",
        },

        {
          text: this.$t(
            "container.grievance_management.1stOfficer"
          ),
          value: "first_tire_officer",
        },
        {
          text: this.$t(
            "container.grievance_management.solution_time"
          ),
          value: "first_tire_solution_time",
        },

        {
          text: this.$t(
            "container.grievance_management.2ndOfficer"
          ),
          value: "secound_tire_officer",
        },
        {
          text: this.$t(
            "container.grievance_management.solution_time"
          ),
          value: "secound_tire_solution_time",
        },

        {
          text: this.$t(
            "container.grievance_management.3rdOfficer"
          ),
          value: "third_tire_officer",
        },
        {
          text: this.$t(
            "container.grievance_management.solution_time"
          ),
          value: "third_tire_solution_time",
        },
        {
          text: this.$t("container.list.action"),
          value: "actions",
          align: "center",
          sortable: false,
        },
      ];
    },

  },
  methods: {
    dynamicLabel(index) {
      if (index == 0) {
        return this.$t('container.grievance_management.1stOfficer');
      }
      if (index == 1) {
        return this.$t('container.grievance_management.2ndOfficer');
      }
      if (index == 2) {
        return this.$t('container.grievance_management.3rdOfficer');
      }
      // You can calculate or fetch the dynamic label here

    },
    addmore(index) {

      this.data.OfficerForm.push({
        first_tire_solution_time: "",
        first_tire_officer: "",
      });

      this.countInput++;

    },
    remove(index) {
      if (this.countInput > 0) {
        this.data.OfficerForm.splice(index, 1);
        this.countInput--;
      }
    },

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
        page: this.pagination.current,
        sortBy: this.sortBy,
        orderBy: this.sortDesc,
      };

      await this.$axios
        .get("/admin/grievanceSetting/get", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
          params: queryParams,
        })
        .then((result) => {
          this.AllGrievanceSettings = result.data.data;
        });

      const HeaderInfo = [
        this.$t("container.list.sl"),
        this.$t("container.grievance_management.main_grievance_type"),
        this.$t("container.grievance_management.grievance_subject"),
        this.$t("container.grievance_management.solution_time"),
        this.$t("container.grievance_management.1stOfficer"),
        this.$t("container.grievance_management.solution_time"),
        this.$t("container.grievance_management.2ndOfficer"),
        this.$t("container.grievance_management.solution_time"),
        this.$t("container.grievance_management.3rdOfficer"),

      ]

      const CustomInfo = this.AllGrievanceSettings.map(((i, index) => {
        return [
          this.$i18n.locale == 'en' ? index + 1 : this.$helpers.englishToBangla(index + 1),
          this.$i18n.locale == 'en' ? i.grievanceTypeEn : i.grievanceTypeBn,
          this.$i18n.locale == 'en' ? i.grievanceSubjectEn : i.grievanceSubjectBn,
          this.$i18n.locale == 'en' ? i.first_tire_solution_time : this.$helpers.englishToBangla(i.first_tire_solution_time),
          this.$i18n.locale == 'en' ? i.first_tire_officer : i.first_tire_officer,
          this.$i18n.locale == 'en' ? i.secound_tire_solution_time ?? 'N/A' : this.$helpers.englishToBangla(i.secound_tire_solution_time) ?? 'N/A',
          this.$i18n.locale == 'en' ? i.secound_tire_officer ?? 'N/A' : i.secound_tire_officer ?? 'N/A',
          this.$i18n.locale == 'en' ? i.third_tire_solution_time ?? 'N/A' : this.$helpers.englishToBangla(i.third_tire_solution_time) ?? 'N/A',
          this.$i18n.locale == 'en' ? i.third_tire_officer ?? 'N/A' : i.third_tire_officer ?? 'N/A',

        ]
      }));

      const queryParam = {
        language: this.$i18n.locale,
        data: CustomInfo,
        header: HeaderInfo,
        fileName: this.$t("container.grievance_management.grievance_setup"),
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
        page: this.pagination.current,
        sortBy: this.sortBy,
        orderBy: this.sortDesc,
      };

      await this.$axios
        .get("/admin/grievanceSetting/get", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
          params: queryParams,
        })
        .then((result) => {
          this.AllGrievanceSettings = result.data.data;
          console.log(this.AllGrievanceSettings, 'excel')
        })
        .catch(error => {
          this.isLoading = false;
        });

      try {
        import('@/plugins/Export2Excel').then((excel) => {

          const HeaderInfo = [
            this.$t("container.list.sl"),
            this.$t("container.grievance_management.main_grievance_type"),
            this.$t("container.grievance_management.grievance_subject"),
            this.$t("container.grievance_management.solution_time"),
            this.$t("container.grievance_management.1stOfficer"),
            this.$t("container.grievance_management.solution_time"),
            this.$t("container.grievance_management.2ndOfficer"),
            this.$t("container.grievance_management.solution_time"),
            this.$t("container.grievance_management.3rdOfficer"),
          ]

          const CustomInfo = this.AllGrievanceSettings.map(((i, index) => {
            return {
              "sl": this.$i18n.locale == 'en' ? index + 1 : this.$helpers.englishToBangla(index + 1),
              "grievance_type_id": this.$i18n.locale == 'en' ? i.grievanceTypeEn : i.grievanceTypeBn,
              "grievance_subject_id": this.$i18n.locale == 'en' ? i.grievanceSubjectEn : i.grievanceSubjectEn,
              "first_tire_solution_time": this.$i18n.locale == 'en' ? i.first_tire_solution_time : this.$helpers.englishToBangla(i.first_tire_solution_time),
              "first_tire_officer": this.$i18n.locale == 'en' ? i.first_tire_officer : i.first_tire_officer,
              "secound_tire_solution_time": this.$i18n.locale == 'en' ? i.secound_tire_solution_time ?? 'N/A' : this.$helpers.englishToBangla(i.secound_tire_solution_time) ?? 'N/A',
              "secound_tire_officer": this.$i18n.locale == 'en' ? i.secound_tire_officer ?? 'N/A' : i.secound_tire_officer ?? 'N/A',
              "third_tire_solution_time": this.$i18n.locale == 'en' ? i.third_tire_solution_time ?? 'N/A' : this.$helpers.englishToBangla(i.third_tire_solution_time) ?? 'N/A',
              "third_tire_officer": this.$i18n.locale == 'en' ? i.third_tire_officer ?? 'N/A' : i.third_tire_officer ?? 'N/A',

            }
          }));

          const Field = ['sl', 'grievance_type_id', 'grievance_subject_id', 'first_tire_solution_time', 'first_tire_officer', 'secound_tire_solution_time', 'secound_tire_officer', 'third_tire_solution_time', 'third_tire_officer']

          const Data = this.FormatJson(Field, CustomInfo)
          const currentDate = new Date().toISOString().slice(0, 10); //
          let dateinfo = queryParams.language == 'en' ? currentDate : this.$helpers.englishToBangla(currentDate)

          const filenameWithDate = `${dateinfo}_${this.$t("container.grievance_management.grievance_setup")}`;

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
      this.countInput = 0;
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
    submitGrievanceSetting() {
      try {
        this.$axios
          .post(`/admin/grievanceSetting/store`, this.data, {
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
              this.GetGrievanceSettings();
            } else if (res.response?.data?.errors) {
              this.$refs.formAdd.setErrors(res.response.data.errors);
            }
          });
      } catch (e) {
      }
    },
    editDialog(items) {
      this.dialogEdit = true;
      this.data.grievance_type_id = items.grievance_type_id;
      this.data.grievance_subject_id = items.grievance_subject_id;
      this.data.id = items.id;
      this.data.OfficerForm = [];
      // Define an array of property names
      const propertyNames = ['first', 'secound', 'third'];

      for (let i = 0; i < propertyNames.length; i++) {
        if (items[`${propertyNames[i]}_tire_officer_id`] != null && items[`${propertyNames[i]}_tire_solution_time`] != null) {
          let newItem = {
            first_tire_officer: items[`${propertyNames[i]}_tire_officer_id`],
            first_tire_solution_time: items[`${propertyNames[i]}_tire_solution_time`]
          };
          this.data.OfficerForm.push(newItem);
          // this.countInput++;
        }


      }
      this.countInput = this.data.OfficerForm.length - 1;
      this.errors = {};
    },
    updateGrievanceSetting() {
      console.log(this.data, 'this.datathis.data');
      try {
        this.$axios
          .post(`/admin/grievanceSetting/update/`, this.data, {
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
              this.GetGrievanceSettings();
            } else {
              this.$refs.formEdit.setErrors(data.errors);
            }
          });
      } catch (e) {
      }
    },
    resetForm() {
      this.data.grievance_type_id = '';
      this.data.grievance_subject_id = '';
      // Reset OfficerForm array
      this.data.OfficerForm = [
        {
          first_tire_officer: "",
          first_tire_solution_time: "",
        }
      ];
      this.errors = {};
    },

    onPageChange($event) {
      // this.pagination.current = $event;
      this.GetGrievanceSettings();
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
          console.log(this.types, ' this.types');

        });
    },

    async GetGrievanceSubject() {
      const queryParams = {
        searchText: this.search,
        perPage: this.pagination.perPage,
        page: this.pagination.current,
        sortBy: this.sortBy,
        sortDesc: this.sortDesc,
        status: 'active',
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
          this.subjects = result.data.data;

        });
    },
    async GetGrievanceSettings() {
      const queryParams = {
        searchText: this.search,
        perPage: this.pagination.perPage,
        page: this.pagination.current,
        sortBy: this.sortBy,
        sortDesc: this.sortDesc,
      };
      console.log(queryParams, 'queryParams');
      this.$axios
        .get("/admin/grievanceSetting/get", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
          params: queryParams,
        })
        .then((result) => {
          console.log(result, 'all get data');
          this.total = result?.data?.meta?.total;
          this.settings = result.data.data;
          this.pagination.current = result.data.meta.current_page;
          this.pagination.total = result.data.meta.last_page;
          this.pagination.grand_total = result.data.meta.total;


        });
    },
    deleteDivision: async function () {
      try {
        this.$axios
          .delete(`/admin/grievanceSetting/destroy/${this.delete_id}`, {
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
            this.GetGrievanceSettings();
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
    },
    getRoles() {
      this.$axios
        .get("/admin/user/get-roles", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          this.roles = result.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

  },
  mounted() {
    this.setInitialHeader();
  },
  created() {
    this.GetGrievanceType();
    this.getRoles();
    this.GetGrievanceSettings();
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
