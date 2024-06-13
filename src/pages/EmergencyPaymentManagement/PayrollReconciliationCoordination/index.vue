<template>
  <div id="aplication_list">
    <v-row class="ml-sm-5 mt-0">
      <v-col cols="12">
        <v-row>
          <Spinner :loading="isLoading" />
          <v-col cols="12">

            <!-- Application list -->
            <v-card elevation="10" color="white" rounded="md" theme="light" class="mb-8 mt-5">
              <v-card-title tag="div" style="background-color:#1c3b68;color:white;margin-bottom: 17px;font-size:17px;">
                <h3 class="white--text">
                    {{ $t("container.emergency_payment.emergency_payment_reconciliation.title") }}
                </h3>
              </v-card-title>
              <v-card-text>
                <v-row justify="space-between" align="center">
                  <v-col lg="3" md="3" cols="12">
                    <v-text-field @keyup.native="GetGrievance" outlined dense v-model="search"
                      prepend-inner-icon="mdi-magnify" class="my-sm-0 my-3 mx-0v -input--horizontal" variant="outlined"
                      :label="$t('container.list.search')" hide-details color="primary"></v-text-field>
                  </v-col>
                  <v-col lg="3" md="3" cols="12"> </v-col>
                  <v-col lg="3" md="3" cols="12" class="text-right">
                    <v-select v-model="selectedColumns" :items="selectableColumns" :label="$t(
                      'container.application_selection.application.select_column'
                    )
                      " multiple @change="updateVisibleColumns" outlined menu-props="top">
                      <template v-slot:selection="{ item, index }"> </template>
                    </v-select>
                  </v-col>
                </v-row>
                <!-- </div> -->
                <template>
                  <v-row justify="space-between" align="center" class="mx-4">

                    <!-- Checkbox on the left -->
                    <v-col sm="6" lg="6" md="6" cols="12">
                      {{ $t('container.list.total') }}:&nbsp;<span style="font-weight: bold;">
                        {{ language === 'bn' ? $helpers.englishToBangla(
                          this.total) : this.total }}
                      </span>
                    </v-col>

                    <!-- Dropdown on the right -->
                    <v-col sm="6" lg="6" md="6" cols="12" class="text-right">
                      <v-btn elevation="2" class="btn mr-2 white--text" color="red darken-4" @click="GeneratePDF()">
                        <v-icon class="pr-1"> mdi-tray-arrow-down </v-icon> {{ $t("container.list.PDF") }}
                      </v-btn>
                      <v-btn elevation="2" class="btn mr-2 white--text" color="teal darken-2" @click="GenerateExcel()">
                        <v-icon class="pr-1"> mdi-tray-arrow-down </v-icon>
                        {{ $t("container.list.excel") }}
                      </v-btn>
                    </v-col>
                  </v-row>
                </template>
                <v-row class="ma-0  white round-border d-flex justify-space-between align-center" justify="center"
                  justify-lg="space-between">
                  <v-col cols="12">
                    <v-data-table :headers="visibleHeaders" :items="applications" :loading="loading" item-key="id"
                      :items-per-page="pagination.perPage" hide-default-footer
                      class="elevation-0 transparent row-pointer table-responsive table-bordered">
                      <!-- Header slot -->
                      <template v-slot:item.sl="{ item, index }">
                        {{ language === 'bn' ? $helpers.englishToBangla(
                          (pagination.current - 1) * pagination.perPage +
                          index +
                          1) : (pagination.current - 1) * pagination.perPage +
                          index +
                          1 }}
                      </template>
                      <template v-slot:item.name="{ item }">
                        <span>
                          {{ item.name }}
                          <!-- {{ item?.grievance_type?.title_en }} -->
                        </span>
                      </template>

                      <template v-slot:item.grievanceType="{ item }">
                        <span>
                          {{ language === 'bn' ? item.grievance_type?.title_bn : item.grievance_type?.title_en }}
                          <!-- {{ item?.grievance_type?.title_en }} -->
                        </span>
                      </template>

                      <template v-slot:item.grievanceSubject="{ item }">
                        <span>
                          {{ language === 'bn' ? item.grievance_subject?.title_bn : item.grievance_subject?.title_en }}
                        </span>
                      </template>

                      <template v-slot:item.created_at="{ item }">
                        <span>
                          {{ language === 'bn' ? formatDate(item.created_at) : formatDate(item.created_at) }}
                        </span>
                      </template>
                      <template v-slot:item.division="{ item }">
                        <span>
                          {{ language === 'bn' ? item.division?.name_bn : item.division?.name_en }}
                        </span>
                      </template>
                      <template v-slot:item.district="{ item }">
                        <span>
                          {{ language === 'bn' ? item.district?.name_bn : item.district?.name_en }}
                        </span>
                      </template>
                      <template v-slot:item.location="{ item }">
                        <span>
                          {{ language === 'bn' ? item.city_corporation?.name_bn : item.city_corporation?.name_en }}
                        </span>
                      </template>
                      <template v-slot:item.tracking_no="{ item }">
                        <span>
                          {{ item?.tracking_no }}
                        </span>
                      </template>
                      <template v-slot:item.resolved_officer="{ item }">
                        <span>
                          {{ language === 'bn' ? item.resolver?.name_bn : item.resolver?.name_en }}
                          <!-- {{ item?.resolved_officer }} -->
                        </span>
                      </template>
                      <template v-slot:item.status="{ item }">
                        <span v-if="item.status == 0" class="not-selected"
                          style="background-color: lightgray;  width: 100px;">
                          <!-- {{ language === 'bn' ? "সমাধান হয়নি" : "Not Solved" }} -->
                          <v-badge color="secondary" :content="(language === 'bn' ? 'সমাধান হয়নি' : 'Not Solved')">
                          </v-badge>

                        </span>
                        <span v-if="item.status == 1" class="forwarded"
                          style="background-color: #bdc749; color: white;  width: 100px;">
                          <!-- {{ language === 'bn' ? "ফরোয়ার্ড করা হয়েছে" : "Forwarded" }} -->
                          <v-badge color="primary" :content="(language === 'bn' ? 'ফরোয়ার্ড হয়েছে' : 'Forwarded')">
                          </v-badge>

                        </span>
                        <span v-if="item.status == 2" class="approved"
                          style="background-color: #008000; color: white; width: 100px;">
                          <!-- {{ language === 'bn' ? "সমাধান করা হয়েছে" : "Solved" }} -->
                          <v-badge color="success" :content="(language === 'bn' ? 'সমাধান হয়েছে' : 'Solved')">
                          </v-badge>

                        </span>
                        <span v-if="item.status == 3" class="waiting" style="background-color: #FFD700;  width: 100px;">
                          <!-- {{ language === 'bn' ? "বাতিল" : "Canceled" }} -->
                          <v-badge color="warning" :content="(language === 'bn' ? 'বাতিল হয়েছে' : 'Canceled')">
                          </v-badge>

                        </span>
                        <span v-if="item.status === 4" class="waiting" style="background-color: #FFD700;  width: 100px;">

                          <v-badge color="#009688" :content="(language === 'bn' ? 'চলমান' : 'In Progress')">
                          </v-badge>

                        </span>
                      </template>
                        <!-- Action Button -->
                        <template v-slot:item.actions="{ item }">
                           <v-tooltip top>
                              <template v-slot:activator="{ on }">
                                <v-btn v-can="'division-edit'" fab x-small v-on="on" color="success" elevation="0" class="mr-3 white--text"
                                  @click="editDialog(item)">
                                  <v-icon> mdi-checkbox-marked-circle-outline</v-icon>
                                </v-btn>
                              </template>
                              <span>
                                {{ $t("container.list.edit") }}
                              </span>
                         </v-tooltip>

                          <v-tooltip top>
                            <template v-slot:activator="{ on }">
                              <v-btn v-can="'division-edit'" fab x-small v-on="on" color="info" elevation="0"
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
                              <v-btn v-can="'division-delete'" fab x-small v-on="on" color="red" class="ml-3 white--text"
                                elevation="0" @click="deleteAlert(item.id)">
                                <v-icon> mdi-delete </v-icon>
                              </v-btn>
                            </template>
                            <span> {{ $t("container.list.delete") }}</span>
                          </v-tooltip>
                        </template>
                        <!-- End Action Button -->
                      <!-- End Action Button -->
                      <!-- End Action Button -->
                      <template v-slot:footer="item">
                        <v-container class="pa-0" fluid>
                          <v-row class="align-center" cols="12">
                            <v-col cols="12" lg="10" md="10" sm="4" class="d-flex justify-center mb-2 mb-sm-0">
                              <v-pagination circle primary v-model="pagination.current" :length="pagination.total"
                                @input="onPageChange" :total-visible="11" class="custom-pagination-item"></v-pagination>
                            </v-col>
                            <v-col cols="12" lg="2" md="2" sm="4" class="">
                              <v-select :items="items" hide-details dense outlined @change="onPageSetup"
                                v-model="pagination.perPage"></v-select>
                            </v-col>
                          </v-row>
                        </v-container>
                      </template>
                    </v-data-table>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>

import { mapState, mapActions } from "vuex";
import { extend, ValidationProvider, ValidationObserver } from "vee-validate";
import { required } from "vee-validate/dist/rules";
import { http } from "@/hooks/httpService";
import Spinner from "@/components/Common/Spinner.vue";

extend("required", required);
export default {
  name: "Index",
  title: "CTM - Grievance List",
  data() {
    return {
      data: {
        id: null,
        verification_number: null,
        tracking_no: null,
        name: null,
        code: null,
        details: null,
        division_id: null,
        district_id: null,
        thana_id: null,
        union_id: null,
        city_id: null,
        city_thana_id: null,
        district_pouro_id: null,
        pouro_id: null,
        ward_id: null,
        location_type: null,
        sub_location_type: null,
        application_id: null,
        nominee_name: null,
        account_no: null,
        status_list: null,
        program_id: null,
        status: null,
        solution: null,
        remarks: null,
        documents: null,
        grievanceType: null,
        grievanceSubject: null,
        created_at: null,
        resolved_officer: null,
        forwardOfficer: null,
        mobile: null,
      },

      dates: [],
      menu: false,
      total: null,
      showModal: false,
      dialogAdd: false,

      selectAll: null,
      committe: [],
      permissions: [],
      isFieldVisible: false,
      value: ["3", "100", "11", "12"], // Default selection without 'name'
      selectedHeaders: [],
      loading: false,
      search: "",
      delete_id: "",
      applications: [],
      districts: [],
      cities: [],
      thanas: [],
      city_thanas: [],
      unions: [],
      pouros: [],
      wards: [],
      locationType: [],
      types: [],
      subjects: [],
      setting: [],
      solutionType: [],
      forward_to: [],
      isLoading: false,
      userRoleId: '',
      firstOfficerId: '',
      subLocationType: [
        {
          id: 1,
          value_en: "Pouroshava",
        },

        {
          id: 2,
          value_en: "Union",
        },
      ],

      pagination: {
        current: 1,
        total: 0,
        perPage: 5,
      },
      items: [5, 10, 15, 20, 40, 50, 100],

      selectedColumns: ['grievanceSubject', 'grievanceType', 'tracking_no', 'created_at', 'status'],  // Initially, first 6 columns are selected

      // fixedColumns: ['sl'], 
      fixedColumns: ['id', 'sl', 'actions'], // Two columns that will always remain visible


    };
  },
  components: {
    ValidationProvider,
    ValidationObserver,
    Spinner,
  },
  computed: {

    language: {
      get() {
        return this.$store.getters.getAppLanguage;
      },
    },


    isForwardButtonDisabled() {
      // Disable the button if no applications are selected
      return !(this.forward.applications_id && this.forward.applications_id.length > 0 && this.forward.committee_id !== null);
    },
    isButtonDisabled() {
      return !(this.forward.applications_id && this.forward.applications_id.length > 0);
    },



    ...mapState({
      divisions: (state) => state.Division.divisions,
      userData: (state) => state.userData
    }),
    userRoleNames() {
      // Extract the 'name' property from each role object
      return this.userData.roles ? this.userData.roles.map(role => role.name) : [];
    },
    visibleHeaders() {
      // Combine fixed columns and selected columns
      const allVisibleColumns = [...this.fixedColumns, ...this.selectedColumns];

      // Filter the headers based on the visible columns
      return this.headers.filter((column) =>
        allVisibleColumns.includes(column.value)
      );
    },
    selectableColumns() {
      // Filter the columns that can be selected (exclude fixed columns)
      return this.headers.filter((column) => !column.fixed);
    },
    headers() {
      return [

        { text: this.$t("container.list.sl"), value: "sl", fixed: true },
        {
          text: this.$t(
            "container.emergency_payment.emergency_payment_reconciliation.program"
          ),
          value: "name",

        },

        {
          text: this.$t(
            "container.grievance_management.grievanceEntry.name"
          ),
          value: "tracking_no",

        },
        {
          text: this.$t(
            "container.emergency_payment.emergency_payment_reconciliation.nid"
          ),
          value: "grievanceType",


        },
        {
          text: this.$t("container.emergency_payment.emergency_payment_reconciliation.account_no"),
          value: "grievanceSubject",

        },

        {
          text: this.$t("container.emergency_payment.emergency_payment_reconciliation.bank"),
          value: "mobile",

        },
        {
          text: this.$t("container.emergency_payment.emergency_payment_reconciliation.branch"),
          value: "created_at",

        },
        {
          text: this.$t("container.emergency_payment.emergency_payment_reconciliation.routing_no"),
          value: "resolved_officer",

        },

        {
          text: this.$t("container.emergency_payment.emergency_payment_reconciliation.scheme_code"),
          value: "verification_number",

        },


        {
          text: this.$t("container.system_config.demo_graphic.district.district"),
          value: "district",
        },
         {
          text: this.$t("container.system_config.demo_graphic.ward.upazila"),
          value: "upazila",
        },

        {
          text: this.$t("container.list.status"),
          value: "status",

        },

        { text: this.$t("container.list.action"), value: "actions", fixed: true },

      ];
    },
  },

  methods: {
   onPageChange($event) {
      // this.pagination.current = $event;
      this.GetGrievance();
    },
    onPageSetup($event) {
      this.pagination.current = 1;
      this.GetGrievance();
    },
     updateVisibleColumns() {
      this.visibleHeaders = this.headers.filter((column) =>
        this.selectedColumns.includes(column.value)
      );
    },

    async GetGrievance(from_date = null, to_date = null) {
      this.loading = true;
      const queryParams = {
        searchText: this.search,
        verification_number: this.data.verification_number,
        tracking_no: this.data.tracking_no,
        grievanceType: this.data.grievanceType,
        grievanceSubject: this.data.grievanceSubject,
        division_id: this.data.division_id,
        district_id: this.data.district_id,
        location_type: this.data.location_type,

        thana_id: this.data.thana_id,
        union_id: this.data.union_id,
        city_id: this.data.city_id,
        city_thana_id: this.data.city_thana_id,
        district_pouro_id: this.data.district_pouro_id,
        pouro_id: this.data.pouro_id,
        sub_location_type: this.data.sub_location_type,
        ward_id: this.data.ward_id,
        status: this.data.status_list,
        perPage: this.pagination.perPage,
        page: this.pagination.current,

        name: this.data.name,
        mobile: this.data.mobile,
        status: this.data.status,
        start_date: from_date,
        end_date: to_date,
      };
      this.$axios
        .get("/admin/grievance/get", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
          params: queryParams,
        })
        .then((result) => {
          this.loading = false;
          this.applications = result.data.data;
          this.userRoleId = this.userData.roles ? this.userData.roles.map(role => role.id) : [];
          this.total = result.data.total;
          this.pagination.current = result.data.current_page;
          this.pagination.total = result.data.last_page;
          this.pagination.grand_total = result.data.total;
        });


    },

    async GeneratePDF() {
      this.isLoading = true;
      const queryParams = {

        searchText: this.search,
        application_id: this.data.application_id,
        nominee_name: this.data.nominee_name,
        account_no: this.data.account_no,
        status: this.data.status,
        program_id: this.data.program_id,
        nid_no: this.data.nid_no,
        division_id: this.data.division_id,
        district_id: this.data.district_id,
        location_type_id: this.data.location_type,
        thana_id: this.data.thana_id,
        union_id: this.data.union_id,
        city_id: this.data.city_id,
        city_thana_id: this.data.city_thana_id,
        district_pouro_id: this.data.district_pouro_id,
        pouro_id: this.data.pouro_id,
        sub_location_type: this.data.sub_location_type,
        ward_id: this.data.ward_id,
        status: this.data.status_list,
        perPage: this.total,
        // perPage: this.pagination.perPage,
        page: this.pagination.current,
        language: this.$i18n.locale,
        selectedColumns: this.selectedColumns,

      };
      await this.$axios
        .get("/admin/grievance/get", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
          params: queryParams,
        })
        .then((result) => {
          this.applications = result.data.data;
        });

      const CustomInfo = this.applications.map(((i, index) => {
        let divisionName = '';
        let districtName = '';
        let location = '';
        let union_pouro_city = '';
        let status = '';
        if (i) {
          if (i.status === 0) {
            status = this.$i18n.locale == 'en' ? "Not Solved" : "সমাধান হয়নি";
          } else if (i.status === 1) {
            status = this.$i18n.locale == 'en' ? "Forwarded" : "ফরোয়ার্ড করা হয়েছে";
          } else if (i.status === 2) {
            status = this.$i18n.locale == 'en' ? "Approved" : "অনুমোদিত";
          } else if (i.status === 3) {
            status = this.$i18n.locale == 'en' ? "Canceled" : "বাতিল";
          } else if (i.status === 4) {
            status = this.$i18n.locale == 'en' ? "In Progress" : "চলমান";
          }
        }

        if (i?.location_type_id == '1') {
          divisionName = this.$i18n.locale == 'en' ? i?.permanent_location?.parent?.parent?.parent?.name_en : i?.permanent_location?.parent?.parent?.parent?.name_bn;
          districtName = this.$i18n.locale == 'en' ? i?.permanent_location?.parent?.parent?.name_en : i?.permanent_location?.parent?.parent?.name_bn;
          location = this.$i18n.locale == 'en' ? i?.permanent_location?.parent?.name_en : i?.permanent_location?.parent?.name_bn;
        } else if (i?.permanent_location_type_id == '2' || i?.permanent_location_type_id == '3') {
          divisionName = this.$i18n.locale == 'en' ? i?.permanent_location?.parent?.parent?.parent?.parent?.name_en : i?.permanent_location?.parent?.parent?.parent?.parent?.name_bn;
          districtName = this.$i18n.locale == 'en' ? i?.permanent_location?.parent?.parent?.parent?.name_en : i?.permanent_location?.parent?.parent?.parent?.name_bn;
          location = this.$i18n.locale == 'en' ? i?.permanent_location?.parent?.parent?.name_en : i?.permanent_location?.parent?.parent?.name_bn;
          union_pouro_city = this.$i18n.locale == 'en' ? i?.permanent_location?.parent?.name_en : i?.permanent_location?.parent?.name_bn;
        }
        return {
          'sl': this.$i18n.locale == 'en' ? index + 1 : this.$helpers.englishToBangla(index + 1),
          'tracking_no': i?.tracking_no,
          'grievanceType': this.$i18n.locale == 'en' ? i?.grievance_type?.title_en : i?.grievance_type?.title_bn,
          'grievanceSubject': this.$i18n.locale == 'en' ? i?.grievance_subject?.title_en : i?.grievance_subject?.title_bn,
          'resolved_officer': this.$i18n.locale == 'en' ? i?.resolver?.name_en : i?.resolver?.name_bn,
          'created_at': this.$i18n.locale == 'en' ? this.formatDate(i?.created_at) : this.formatDate(i?.created_at),
          'name': i?.name,
          'status': status,
          'verification_number': i?.verification_number,
          'division': this.$i18n.locale == 'en' ? i?.division?.name_en : i?.division?.name_bn,
          'district': this.$i18n.locale == 'en' ? i?.district?.name_en : i?.district?.name_bn,
          'district': this.$i18n.locale == 'en' ? i?.district?.name_en : i?.district?.name_bn,
          'location': this.$i18n.locale == 'en' ? i?.city_corporation?.name_en : i?.city_corporation?.name_bn,
          'mobile': i?.mobile,
        }
      }));

      const filteredTexts = this.headers
        .filter(header => this.selectedColumns.includes(header.value))
        .map(header => header.text);

      const filteredValue = this.headers
        .filter(header => this.selectedColumns.includes(header.value))
        .map(header => header.value);

      const HeaderInfo = [this.$t("container.list.sl"), ...filteredTexts];

      const selectColumn = ['sl', ...filteredValue]

      const Info = CustomInfo.map(application => {
        const filteredValues = selectColumn.map(header => application[header]);
        return filteredValues;
      });

      const queryParam = {
        language: this.$i18n.locale,
        data: Info,
        header: HeaderInfo,
        fileName: this.$t("container.grievance_management.grievanceList.grievance_list"),
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

    async GenerateExcel() {

      const queryParams = {

        searchText: this.search,
        application_id: this.data.application_id,
        nominee_name: this.data.nominee_name,
        account_no: this.data.account_no,
        status: this.data.status,
        program_id: this.data.program_id,
        nid_no: this.data.nid_no,
        division_id: this.data.division_id,
        district_id: this.data.district_id,
        location_type_id: this.data.location_type,
        thana_id: this.data.thana_id,
        union_id: this.data.union_id,
        city_id: this.data.city_id,
        city_thana_id: this.data.city_thana_id,
        district_pouro_id: this.data.district_pouro_id,
        pouro_id: this.data.pouro_id,
        sub_location_type: this.data.sub_location_type,
        ward_id: this.data.ward_id,
        status: this.data.status_list,
        perPage: this.total,
        // perPage: this.pagination.perPage,
        page: this.pagination.current,
        language: this.$i18n.locale,
        selectedColumns: this.selectedColumns,

      };
      await this.$axios
        .get("/admin/grievance/get", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
          params: queryParams,
        })
        .then((result) => {
          this.applications = result.data.data;

          const CustomInfo = this.applications.map(((i, index) => {
            let divisionName = '';
            let districtName = '';
            let location = '';
            let union_pouro_city = '';
            let status = '';
            if (i) {
              if (i.status === 0) {
                status = this.$i18n.locale == 'en' ? "Not Solved" : "সমাধান হয়নি";
              } else if (i.status === 1) {
                status = this.$i18n.locale == 'en' ? "Forwarded" : "ফরোয়ার্ড করা হয়েছে";
              } else if (i.status === 2) {
                status = this.$i18n.locale == 'en' ? "Approved" : "অনুমোদিত";
              } else if (i.status === 3) {
                status = this.$i18n.locale == 'en' ? "Canceled" : "বাতিল";
              } else if (i.status === 4) {
                status = this.$i18n.locale == 'en' ? "In Progress" : "চলমান";
              }
            }

            if (i?.permanent_location_type_id == '1') {
              divisionName = this.$i18n.locale == 'en' ? i?.permanent_location?.parent?.parent?.parent?.name_en : i?.permanent_location?.parent?.parent?.parent?.name_bn;
              districtName = this.$i18n.locale == 'en' ? i?.permanent_location?.parent?.parent?.name_en : i?.permanent_location?.parent?.parent?.name_bn;
              location = this.$i18n.locale == 'en' ? i?.permanent_location?.parent?.name_en : i?.permanent_location?.parent?.name_bn;
            } else if (i?.permanent_location_type_id == '2' || i?.permanent_location_type_id == '3') {
              divisionName = this.$i18n.locale == 'en' ? i?.permanent_location?.parent?.parent?.parent?.parent?.name_en : i?.permanent_location?.parent?.parent?.parent?.parent?.name_bn;
              districtName = this.$i18n.locale == 'en' ? i?.permanent_location?.parent?.parent?.parent?.name_en : i?.permanent_location?.parent?.parent?.parent?.name_bn;
              location = this.$i18n.locale == 'en' ? i?.permanent_location?.parent?.parent?.name_en : i?.permanent_location?.parent?.parent?.name_bn;
              union_pouro_city = this.$i18n.locale == 'en' ? i?.permanent_location?.parent?.name_en : i?.permanent_location?.parent?.name_bn;
            }

            return {
              'sl': this.$i18n.locale == 'en' ? index + 1 : this.$helpers.englishToBangla(index + 1),
              'tracking_no': i?.tracking_no,
              'grievanceType': this.$i18n.locale == 'en' ? i?.grievance_type?.title_en : i?.grievance_type?.title_bn,
              'grievanceSubject': this.$i18n.locale == 'en' ? i?.grievance_subject?.title_en : i?.grievance_subject?.title_bn,
              'created_at': this.$i18n.locale == 'en' ? this.formatDate(i?.created_at) : this.formatDate(i?.created_at),
              'name': i?.name,
              'resolved_officer': this.$i18n.locale == 'en' ? i?.resolver?.name_en : i?.resolver?.name_bn,
              'status': status,
              'verification_number': i?.verification_number,
              'division': this.$i18n.locale == 'en' ? i?.division?.name_en : i?.division?.name_bn,
              'district': this.$i18n.locale == 'en' ? i?.district?.name_en : i?.district?.name_bn,
              'district': this.$i18n.locale == 'en' ? i?.district?.name_en : i?.district?.name_bn,
              'location': this.$i18n.locale == 'en' ? i?.city_corporation?.name_en : i?.city_corporation?.name_bn,
              'mobile': i?.mobile,
            }
          }));

          const filteredTexts = this.headers
            .filter(header => this.selectedColumns.includes(header.value))
            .map(header => header.text);

          const filteredValue = this.headers
            .filter(header => this.selectedColumns.includes(header.value))
            .map(header => header.value);

          const HeaderInfo = [this.$t("container.list.sl"), ...filteredTexts];

          const selectColumn = ['sl', ...filteredValue]

          const Info = CustomInfo.map(application => {
            const filteredValues = selectColumn.map(header => application[header]);
            return filteredValues;
          });

          try {
            import('@/plugins/Export2Excel').then((excel) => {
              const Field = selectColumn

              const Data = this.FormatJson(Field, CustomInfo)
              const currentDate = new Date().toISOString().slice(0, 10); //
              let dateinfo = queryParams.language == 'en' ? currentDate : this.$helpers.englishToBangla(currentDate)

              const filenameWithDate = `${dateinfo}_${this.$t("container.grievance_management.grievanceList.grievance_list")}`;

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
            console.error("An error occurred:", error);
            this.isLoading = false;
          } finally {
            this.isLoading = false;
          }
        });

    },

    FormatJson(FilterData, JsonData) {
      return JsonData.map((v) =>
        FilterData.map((j => {
          return v[j];
        })))
    },

    submitsearch() {
      this.GetGrievance();


    },


    // date formater function
    formatDate(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = ('0' + (date.getMonth() + 1)).slice(-2); // Adding 1 because months are zero-based
      const day = ('0' + date.getDate()).slice(-2);
      return `${day}-${month}-${year}`;
    },
  },

  created() {

  },
  beforeMount() {
    this.GetGrievance();





  },
  mounted() {



    // this.$store
    //     .dispatch("getLookupByType", 1)
    //     .then((res) => (this.locationType = res));
    this.$store
      .dispatch("getGlobalLookupByType", 1)
      .then((res) => (this.locationType = res));
  },
};
</script>
<style >
.no-arrow-icon .v-input__icon--clear {
  display: none;

}

.v-input__icon--append .v-icon {
  color: purple;
  font-weight: bold;
}

.no-arrow-icon .v-input__icon--append {
  font-weight: bold;
}

.table-bordered {
  border-collapse: collapse;
  width: 100%;
}

.table-bordered th,
.table-bordered td {
  border: 1px solid #ddd;
  /* Adjust the color to your preference */
  padding: 8px;
  text-align: left;
}

.table-bordered th {
  background-color: #f2f2f2;
  color: black;
  font-size: 16px;
  padding: 10px;
}

.table-bordered td {
  font-size: 14px;
}

.table-header {
  font-size: 16px;
  padding: 8px;
  color: black;
}

.v-simple-table thead {
  background-color: #f9f9f9;
}

.v-simple-table tbody tr:hover {
  background-color: #f1f1f1;
}
</style>
