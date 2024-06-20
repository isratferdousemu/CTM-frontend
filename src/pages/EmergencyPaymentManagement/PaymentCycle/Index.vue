<template>
  <div id="aplication_list">
    <v-row class="ml-sm-0 mt-0">
      <v-col cols="12">
        <v-row>
            <Spinner :loading="isLoading" />
          <v-col cols="12">

            <!-- Expantion panels start -->
            <v-expansion-panels>
              <v-expansion-panel class="ma-2">
                <v-expansion-panel-header color=#1c3b68>
                  <template v-slot:actions>
                    <v-icon color="white">
                      $expand
                    </v-icon>
                  </template>
                  <h3 class="white--text" style="font-size:19.89px;">
                    {{ $t("container.emergency_payment.emergency_payment_cycle.filter_title") }}
                  </h3>
                </v-expansion-panel-header>
                <v-expansion-panel-content class="elevation-0 transparent mt-10">
                  <ValidationObserver ref="formsearch" v-slot="{ invalid }">
                    <form @submit.prevent="GetPaymentCycle()">
                      <v-row>
                        <v-col lg="4" md="4" cols="12">
                          <ValidationProvider name="program" vid="program" v-slot="{ errors }">
                            <v-autocomplete outlined clearable class="no-arrow-icon" v-model="data.program_id"
                              :append-icon-cb="appendIconCallback" append-icon="mdi-plus" :items="programs"
                              :item-text="getItemText" item-value="id" @input="onChangeProgram($event)"
                              :label="$t('container.application_selection.application.program')">
                            </v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <v-col lg="4" md="4" cols="12">
                          <ValidationProvider name="Installment No" vid="installment_no" v-slot="{ errors }">
                            <v-autocomplete v-model="data.installment_no" class="no-arrow-icon"
                              :append-icon-cb="appendIconCallback" append-icon="mdi-plus"
                              :hide-details="errors[0] ? false : true" outlined
                              :label="$t('container.emergency_payment.emergency_payment_cycle.installment_no')"
                              :items="installments"
                              :item-text="language === 'bn' ? 'installment_name_bn' : 'installment_name'"
                              :item-value="language === 'bn' ? 'installment_name_bn' : 'installment_name'"
                              :error="errors[0] ? true : false"
                              :error-messages="errors[0] ? (language === 'bn' ? 'অনুগ্রহ করে অভিযোগের বিষয় নির্বাচন করুন' : 'Please Select Grievacne Subject.') : ''"></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <v-col lg="4" md="4" cols="12">
                          <ValidationProvider name="Financial Year" vid="financial_year" v-slot="{ errors }">
                            <v-autocomplete v-model="data.financial_year" class="no-arrow-icon"
                              :append-icon-cb="appendIconCallback" append-icon="mdi-plus"
                              :hide-details="errors[0] ? false : true" outlined
                              :label="$t('container.emergency_payment.emergency_payment_cycle.financial_year')"
                              :items="financial_years"
                              :item-text="language === 'bn' ? 'financial_year' : 'financial_year'" item-value="id"
                              :error="errors[0] ? true : false"
                              :error-messages="errors[0] ? (language === 'bn' ? 'অনুগ্রহ করে কিস্তির নম্বর নির্বাচন করুন' : 'Please Select Installment No.') : ''"></v-autocomplete>
                          </ValidationProvider>

                        </v-col>
                      </v-row>
                      <div class="d-inline d-flex justify-end mt-2">

                        <v-btn elevation="2" class="btn  mr-2" @click="resetForm()">{{
                          $t("container.list.reset")
                        }}</v-btn>
                        <v-btn elevation="2" type="submit" class="btn mr-2" color="success">{{
                          $t("container.list.search")
                        }}</v-btn>
                      </div>
                    </form>
                  </ValidationObserver>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
            <!-- Expantion panels end -->
            <!-- payment Cycle list -->
            <v-card elevation="10" color="white" rounded="md" theme="light" class="mb-8 mt-5">
              <v-card-title tag="div" style="background-color:#1c3b68;color:white;margin-bottom: 17px;font-size:17px;">
                <h3 class="white--text">
                  {{ $t("container.emergency_payment.emergency_payment_cycle.payment_cycle_list") }}
                </h3>
              </v-card-title>
              <v-card-text>
                <v-row justify="space-between" align="center">
                  <v-col lg="3" md="3" cols="12">
                    <v-text-field @keyup.native="GetPaymentCycle" outlined dense v-model="search"
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
                    <v-col sm="3" lg="3" md="3" cols="12">
                      {{ $t('container.list.total') }}:&nbsp;<span style="font-weight: bold;">
                        {{ language === 'bn' ? $helpers.englishToBangla(
                          this.total) : this.total }}
                      </span>
                    </v-col>

                    <!-- Dropdown on the right -->
                    <v-col sm="3" lg="3" md="3" cols="12" class="text-right">
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
                    <v-data-table :headers="visibleHeaders" :items="paymentCycleList" :loading="loading" item-key="id"
                      :items-per-page="pagination.perPage" hide-default-footer
                      class="elevation-0 transparent row-pointer table-responsive">
                      <!-- Header slot -->

                      <template v-slot:item.sl="{ item, index }">
                        {{ language === 'bn' ? $helpers.englishToBangla(
                          (pagination.current - 1) * pagination.perPage +
                          index +
                          1) : (pagination.current - 1) * pagination.perPage +
                          index +
                          1 }}
                      </template>
                      <template v-slot:item.cycle_id="{ item }">
                        <span>
                          {{ item.cycle_id }}
                        </span>
                      </template>

                      <template v-slot:item.name_en="{ item }">
                        <span>
                          {{ language === 'bn' ? item.name_bn : item.name_en }}
                        </span>
                      </template>

                      <template v-slot:item.total_beneficiaries="{ item }">
                        <span>
                          {{ item.total_beneficiaries }}
                        </span>
                      </template>

                      <template v-slot:item.created_at="{ item }">
                        <span>
                          {{ language === 'bn' ? formatDate(item.created_at) : formatDate(item.created_at) }}
                        </span>
                      </template>

                      <template v-slot:item.status="{ item }">
                          <span v-if="item.status == 'Initiated'" class="not-selected"
                          style="background-color: lightgray;  width: 100px;">
                          <!-- {{ language === 'bn' ? "সমাধান হয়নি" : "Not Solved" }} -->
                          <v-badge color="secondary" :content="(language === 'bn' ? 'সূচনা করেছে' : 'Initiated')">
                          </v-badge>
                        </span>
                        <span v-if="item.status == 'Pending'" class="forwarded"
                          style="background-color: #bdc749; color: white;  width: 100px;">
                          <!-- {{ language === 'bn' ? "ফরোয়ার্ড করা হয়েছে" : "Forwarded" }} -->
                          <v-badge color="primary" :content="(language === 'bn' ? 'বিচারাধীন' : 'Pending')">
                          </v-badge>

                        </span>
                        <span v-if="item.status == 'Completed'" class="approved"
                          style="background-color: #008000; color: white; width: 100px;">
                          <!-- {{ language === 'bn' ? "সমাধান করা হয়েছে" : "Solved" }} -->
                          <v-badge color="success" :content="(language === 'bn' ? 'সম্পন্ন' : 'Completed')">
                          </v-badge>

                        </span>
                      </template>

                      <template v-slot:item.actions="{ item }">

                        <v-tooltip top v-if="item.status == 'Pending'">
                          <template v-slot:activator="{ on }">
                            <v-btn size="x-small" color="teal darken-2" class="white--text text-none"
                              @click="sendToFinanceCycle(item)">
                               {{ $t("container.emergency_payment.emergency_payment_cycle.send_finance_cycle") }}
                            </v-btn>
                          </template>
                        </v-tooltip>
                          <v-tooltip top v-if="item.status == 'Pending'">
                            <template v-slot:activator="{ on }">
                              <v-btn size="x-small" color="red darken-2" class="white--text text-none"
                                @click="RejectPaymentCycle(item)">
                                 {{ $t("container.emergency_payment.emergency_payment_cycle.reject") }}
                              </v-btn>
                            </template>
                          </v-tooltip>
                        <v-tooltip top v-if="item.status == 'Completed'">
                          <template v-slot:activator="{ on }">
                            <v-btn color="rgb(28, 59, 104)" elevation="0" class="white--text text-none">
                              {{ $t("container.emergency_payment.emergency_payment_cycle.already_send") }}
                            </v-btn>
                          </template>

                        </v-tooltip>

                        <v-tooltip top>
                          <template v-slot:activator="{ on }">
                            <v-btn fab x-small v-on="on" color="#AFB42B" elevation="0" class="white--text"
                              @click="showDetail(item)">
                              <v-icon> mdi-eye </v-icon>
                            </v-btn>
                          </template>
                          <span>
                            {{ $t("container.list.view") }}
                          </span>
                        </v-tooltip>
                      </template>
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
import ApiService from "@/services/ApiService";
import Spinner from "@/components/Common/Spinner.vue";

extend("required", required);
export default {
  name: "Index",
  title: "CTM - Payment Cycle",
  data() {
    return {
      data: {
        id: null,
        program_id: null,
        installment_no: null,
        financial_year: null,
        name_en: null,
      },

      total: null,
      showModal: false,
      dialogAdd: false,
      value: ["3", "100", "11", "12"], // Default selection without 'name'
      selectedHeaders: [],
      loading: false,
      isLoading:false,
      search: "",
      paymentCycleList: [],
      installments: [],
      financial_years: '',
      programs: [],
      pagination: {
        current: 1,
        total: 0,
        perPage: 5,
      },
      items: [5, 10, 15, 20, 40, 50, 100],

      selectedColumns: ['cycle_id', 'name_en', 'total_beneficiaries', 'total_charge', 'status'],  // Initially, first 6 columns are selected

      // fixedColumns: ['sl'], 
      fixedColumns: ['id', 'sl', 'actions'], // Two columns that will always remain visible


    };
  },
  components: {
    ValidationProvider,
    ValidationObserver,
    Spinner
  },
  computed: {

    language: {
      get() {
        return this.$store.getters.getAppLanguage;
      },
    },




    ...mapState({
      userData: (state) => state.userData
    }),

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
            "container.emergency_payment.emergency_payment_cycle.cycle_id"
          ),
          value: "cycle_id",

        },

        {
          text: this.$t(
            "container.emergency_payment.emergency_payment_cycle.installment_no"
          ),
          value: "name_en",

        },
        {
          text: this.$t(
            "container.emergency_payment.payment_cycle"
          ),
          value: "payment_cycle",


        },
        {
          text: this.$t("container.emergency_payment.emergency_payment_cycle.total_beneficiary"),
          value: "total_beneficiaries",

        },

        {
          text: this.$t("container.emergency_payment.emergency_payment_cycle.amount_of_money"),
          value: "sub_total_amount",

        },
        {
          text: this.$t("container.emergency_payment.emergency_payment_cycle.charge"),
          value: "total_charge",

        },

        {
          text: this.$t("container.list.status"),
          value: "status",

        },


        { text: this.$t("container.list.action"), value: "actions", fixed: true, align: 'center' },

      ];
    },
  },

  methods: {
    async sendToFinanceCycle(item) {
      this.$swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, Send it!",
          cancelButtonText: "No, cancel!",
          reverseButtons: true,
          confirmButtonColor: "#1C3B68",
          cancelButtonColor: "#d33",
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            const res = await ApiService.post(
              "admin/emergency/push-payroll-summary/" + item.id
            );
            console.log(res, 'resss');
            if (res?.status === 200) {
              this.$toast.success('Payment cycle and details updated successfully.');
              this.GetPaymentCycle();
            } else {
              this.$toast.error('No records Found.');
            }
          } else if (result.dismiss === this.$swal.DismissReason.cancel) {
            this.$swal.fire(
              "Cancelled",
              "Your imaginary file is safe :)",
              "error"
            );
          }
        });
    },
    async RejectPaymentCycle(item) {
     this.$router.push({
        path: `/emergency-payment/cycle/reject/${item.id}`,
      });
    },
    async GetFinancialYear() {

      const queryParams = {
        searchText: this.search,
        perPage: this.pagination.perPage,
        page: this.pagination.current,
      };

      this.$axios
        .get("/admin/financial-year/get", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
          params: queryParams,
        })
        .then((result) => {
          this.financial_years = result.data.data;

        });
    },
    async onChangeProgram($event) {

      const queryParams = {
        searchText: this.search,
        perPage: this.pagination.perPage,
        page: this.pagination.current,
      };

      this.$axios
        .get(`admin/emergency/program-wise-installment/${$event}`, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
          params: queryParams,
        })
        .then((result) => {
          this.installments = result.data;
        });
    },
    getAllProgram() {
      this.$axios.get("global/program").then((res) => {
        this.programs = res.data.data;
        console.log(this.programs, 'dfsf');
      });
    },
    OnChangeDateInfo(event, type) {
      console.log(event.length, 'length');
      if (this.dates.length < 2) {
        return;
      }

      if (this.dates[1] && this.dates[1] < this.dates[0]) {
        this.$toast.error(this.language == 'en' ? 'End date cannot be before start date' : 'শেষ তারিখ শুরুর তারিখের আগে হতে পারে না')
        this.resetDateRange();
      }

      let from_date = null;
      let to_date = null;

      if (event.length === 2) {
        from_date = event[0];
        to_date = event[1];
      }
      console.log(from_date, to_date, 'check date');
      this.fetchProgramwiseApproveApplicationChartData(from_date, to_date);
    },

    createGrievanceDialog(item) {
      this.resetForm()
      const queryParams = {
        subjectId: item.grievance_subject?.id,
        typeId: item.grievance_type?.id,
        status: 'active',
      };
      this.$axios
        .get("/admin/grievance/settings/get", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
          params: queryParams,
        })
        .then((result) => {
          // this.setting = result.data;
          const data = result.data;
          this.userRoleId = this.userData.roles ? this.userData.roles.map(role => role.id) : [];
          console.log(this.userRoleId[0], 'user role name');
          this.forward_to = [
            data.first_officer,
            data.secound_officer,
            data.third_officer
          ];
          // Filter the forward_to array based on userRoleId
          this.forward_to = this.forward_to.filter(role => !this.userRoleId.includes(role.id));
          console.log(this.forward_to, 'this.forward_tothis.forward_to');

          this.firstOfficerId = data?.first_officer?.id;

          //   const totalDay = this.calculateTotalDaysFromToday(item.created_at);
          //   const first_tire_solution_time = this.setting?.first_tire_solution_time;
          //   const secound_tire_solution_time = this.setting?.secound_tire_solution_time;
          //   const third_tire_solution_time = this.setting?.third_tire_solution_time;
          //   console.log(this.data.status,'status');
          //   console.log(totalDay <= first_tire_solution_time,'time');
          // if(this.data.status <=1){
          //    if (this.data.status == 0 || totalDay <= first_tire_solution_time && first_tire_solution_time !=null) {
          //       console.log(first_tire_solution_time, 'first_tire_solution_time');
          //       this.data.forwardOfficer = this.language === 'bn' ? this.setting?.first_officer?.name_bn : this.setting.first_officer?.name_en
          //     } else if (this.data.status==1 || totalDay <= secound_tire_solution_time && secound_tire_solution_time != null) {
          //       console.log('secound_tire_solution_time');
          //       this.data.forwardOfficer = this.language === 'bn' ? this.setting?.secound_officer?.name_bn : this.setting.secound_officer?.name_en
          //     } else if (totalDay <= third_tire_solution_time && third_tire_solution_time != null) {
          //       console.log('secound_tire_solution_time');
          //       this.data.forwardOfficer = this.language === 'bn' ? this.setting?.third_officer?.name_bn : this.setting.third_officer?.name_en
          //     } else {
          //       console.log('2222222222');
          //       this.data.status = 4
          //     }
          // }

        });
      if (this.$refs.formAdd) {
        this.$refs.formAdd.reset();
      }
      this.resetForm();
      this.dialogAdd = true;
      this.data.id = item.id
      this.data.status = item.status
      this.data.tracking_no = item.tracking_no
      this.data.grievanceSubject = this.language === 'bn' ? item.grievance_subject?.title_bn : item.grievance_subject?.title_en
      this.data.grievanceType = this.language === 'bn' ? item.grievance_type?.title_bn : item.grievance_type?.title_en
      this.data.created_at = item.created_at
    },
    getItemText(item) {
      return this.language === 'bn' ? item.name_bn : item.name_en;
    },
    showDetailsModalClose() {
      this.showModal = false;
    },
    // show details modal
    showDetail(item) {
      this.$router.push({
        path: `/emergency-payment/cycle/view/${item.id}`,
      });
    },

    resetForm() {
      this.data.financial_year = null;
      this.data.installment_no = null;
      this.data.program_id = null;
      this.GetPaymentCycle();

    },


    appendIconCallback() {
      // Handle the click event for the custom append icon here
    },
    appendIcon() {
      return "mdi-plus"; // Use the appropriate Material Design Icons (MDI) class for the "+" icon
    },
    toggleFieldVisibility() {
      this.isFieldVisible = !this.isFieldVisible;
    },
    ...mapActions({
      GetAllDivisions: "Division/GetAllDivisions",
    }),
    updateVisibleColumns() {
      // Triggered when the selected columns change
      // Update the visibleHeaders based on the selected columns
      this.visibleHeaders = this.headers.filter((column) =>
        this.selectedColumns.includes(column.value)
      );
    },




    onPageChange($event) {
      // this.pagination.current = $event;
      this.GetPaymentCycle();
    },
    onPageSetup($event) {
      this.pagination.current = 1;
      this.GetPaymentCycle();
    },

    async GetPaymentCycle() {
      this.loading=true;
      this.search = this.search.replace(/%/g, '');
      const queryParams = {
        searchText: this.search,
        program_id: this.data.program_id,
        installment_no: this.data.installment_no,
        financial_year: this.data.financial_year,

      };
      this.$axios
        .get("/admin/emergency/payment-cycle", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
          params: queryParams,
        })
        .then((result) => {
          this.loading = false;
          this.paymentCycleList = result.data.data;
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
        financial_year: this.data.financial_year,
        installment_no: this.data.installment_no,
        perPage: this.total,
        // perPage: this.pagination.perPage,
        page: this.pagination.current,
        language: this.$i18n.locale,
        selectedColumns: this.selectedColumns,

      };
      await this.$axios
        .get("/admin/emergency/payment-cycle", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
          params: queryParams,
        })
        .then((result) => {
          this.paymentCycleList = result.data.data;
        });

      const CustomInfo = this.paymentCycleList.map(((i, index) => {
        return {
          'sl': this.$i18n.locale == 'en' ? index + 1 : this.$helpers.englishToBangla(index + 1),
          'cycle_id': i?.cycle_id,
          'name_en': i?.name_en,
          'payment_cycle': i?.payment_cycle,
          'total_beneficiaries': i?.total_beneficiaries,
          'sub_total_amount': i?.sub_total_amount,
          'total_charge': i?.total_charge,
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
        fileName: this.$t("container.emergency_payment.emergency_payment_cycle.payment_cycle_list"),
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
      this.isLoading = true;
      const queryParams = {

        searchText: this.search,
        financial_year: this.data.financial_year,
        installment_no: this.data.installment_no,
        perPage: this.total,
        // perPage: this.pagination.perPage,
        page: this.pagination.current,
        language: this.$i18n.locale,
        selectedColumns: this.selectedColumns,

      };
      await this.$axios
        .get("/admin/emergency/payment-cycle", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
          params: queryParams,
        })
        .then((result) => {
          this.paymentCycleList = result.data.data;

          const CustomInfo = this.paymentCycleList.map(((i, index) => {


            return {
              'sl': this.$i18n.locale == 'en' ? index + 1 : this.$helpers.englishToBangla(index + 1),
              'cycle_id': i?.cycle_id,
              'name_en': i?.name_en,
              'payment_cycle': i?.payment_cycle,
              'total_beneficiaries': i?.total_beneficiaries,
              'sub_total_amount': i?.sub_total_amount,
              'total_charge': i?.total_charge,
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

              const filenameWithDate = `${dateinfo}_${this.$t("container.emergency_payment.emergency_payment_cycle.payment_cycle_list")}`;

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
    updateHeaderTitle() {
      const title = this.$t("container.emergency_payment.emergency_payment_cycle.payment_cycle_list");
      this.$store.commit("setHeaderTitle", title);
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
  watch: {
    "$i18n.locale": "updateHeaderTitle",
  },
  created() {
    this.GetPaymentCycle();
    this.GetFinancialYear();
    this.getAllProgram();
  },
  beforeMount() {
    this.updateHeaderTitle();

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
  border: 1px solid #ddd; /* Adjust the color to your preference */
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
