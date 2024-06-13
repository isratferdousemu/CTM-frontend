<template>
  <div id="aplication_list">
    <v-row class="ml-sm-0 mt-0">
      <v-col cols="12">
        <v-row>
          <v-col cols="12">
            <!-- payment Cycle list -->
            <v-card elevation="10" color="white" rounded="md" theme="light" class="mb-8 mt-5">
              <v-card-title class="font-weight-bold justify-center"
                style="background-color:#1c3b68;color:white;font-size:17px;">
                {{ $t("container.emergency_payment.emergency_payment_cycle.payment_cycle_list") }}
              </v-card-title>
              <!-- <v-row justify="space-between" align="center" style="margin-top:10px;">
                    <v-col lg="3" md="3" cols="12">
                      <v-text-field @keyup.native="GetPaymentCycle" outlined dense v-model="search"
                        prepend-inner-icon="mdi-magnify" class="my-sm-0 my-3 mx-0v -input--horizontal" variant="outlined"
                        :label="$t('container.list.search')" hide-details color="primary"></v-text-field>
                    </v-col>
              </v-row> -->
              <template>
                <v-simple-table dense class="table-bordered table-responsive elevation-1" style="padding: 2% 0% 2% 0%;">
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <!-- <th style="font-size: 16px;padding:4% 0% 2% 2%;color:black">{{
                        $t("container.system_config.demo_graphic.district.district") }}
                      </th> -->

                        <!-- <th style="font-size: 16px;padding:4% 0% 2% 2%;color:black">{{
                        $t("container.system_config.demo_graphic.ward.upazila") }}
                      </th> -->
                        <th style="font-size: 16px;padding:4% 0% 2% 2%;color:black">{{
                          $t("container.system_audit.office") }}
                        </th>
                        <th style="font-size: 16px;padding:4% 0% 2% 2%;color:black">{{
                          $t("container.application_selection.application.program") }}
                        </th>
                        <th style="font-size: 16px;padding:4% 0% 2% 2%;color:black">{{
                          $t("container.emergency_payment.emergency_payment_cycle.cycle_id") }}
                        </th>
                        <th style="font-size: 16px;padding:4% 0% 2% 2%;color:black">{{
                          $t("container.emergency_payment.emergency_payment_cycle.installment_no") }}
                        </th>
                        <th style="font-size: 16px;padding:4% 0% 2% 2%;color:black">{{
                          $t("container.emergency_payment.payment_cycle") }}
                        </th>
                        <th style="font-size: 16px;padding:4% 0% 2% 2%;color:black">{{
                          $t("container.emergency_payment.emergency_payment_cycle.total_beneficiary") }}
                        </th>
                        <th style="font-size: 16px;padding:4% 0% 2% 2%;color:black">{{
                          $t("container.emergency_payment.emergency_payment_cycle.amount_of_money") }}
                        </th>
                        <th style="font-size: 16px;padding:4% 0% 2% 2%;color:black">{{
                          $t("container.emergency_payment.emergency_payment_cycle.charge") }}
                        </th>
                        <th style="font-size: 16px;padding:4% 0% 2% 2%;color:black">{{
                          $t("container.emergency_payment.emergency_payment_cycle.amount_of_money") }}
                        </th>
                         <th style="font-size: 16px;padding:4% 0% 2% 2%;color:black">{{
                           $t("container.list.action") }}
                          </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style="padding-buttom:2%" v-for="(item, index) in setViewData" :key="index">
                        <!-- <td>{{ setViewData?.payment_cycle_details?.beneficiary?.permanent_district_id}}</td> -->
                        <!-- <td>distrcit</td>
                        <td>upazila</td> -->

                        <td> {{ language === 'bn' ? item.payroll.office.name_bn : item.payroll.office.name_en }}</td>
                        <td> {{ language === 'bn' ? item.payroll.program.name_bn : item.payroll.program.name_en }}</td>
                        <td>{{ item.emergency_cycle_id }}</td>
                        <td> {{ language === 'bn' ? item.payroll.installment.installment_name_bn :
                          item.payroll.installment.installment_name }}</td>
                        <td>Payment Cycle</td>
                        <td>{{ item.payroll.total_beneficiaries }}</td>
                        <td>{{ item.payroll.sub_total_amount }}</td>
                        <td>{{ item.payroll.charge }}</td>
                        <td>{{ item.payroll.total_amount }}</td>
                        <td>
                         <v-tooltip top>
                            <template v-slot:activator="{ on }">
                              <v-btn v-can="'division-delete'" fab x-small v-on="on" color="grey" class="ml-3 white--text"
                                elevation="0" @click="deleteEmergencyPayroll(item.payroll.id)">
                                <v-icon> mdi-delete </v-icon>
                              </v-btn>
                            </template>
                            <span> {{ $t("container.list.delete") }}</span>
                          </v-tooltip>
                        </td>

                      </tr>
                    </tbody>

                  </template>
                </v-simple-table>
                <div style="text-align:right">
                  <v-btn style="margin:5px 5px;" router to="/emergency-payment/payment-cycle" outlined
                    class="custom-btn-width py-2 mr-10 text-right success">
                    {{ $t("container.list.back") }}
                  </v-btn>
                </div>
              </template>
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
      search: "",
      setViewData: [],
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
    async deleteEmergencyPayroll(id) {
      this.$swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, Delete it!",
          cancelButtonText: "No, cancel!",
          reverseButtons: true,
          confirmButtonColor: "#1C3B68",
          cancelButtonColor: "#d33",
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            const res = await ApiService.delete(
              "admin/emergency/payroll/" + id
            );
            console.log(res, 'resss');
            if (res?.status === 200) {
              this.$toast.success('Payroll Payment cycle Delete successfully.');
              // this.GetPaymentCycle();
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
    loadViewDetails() {
      const view_id = this.$route.params.id;
      if (view_id) {
        ApiService.get(`admin/emergency/payment-cycle/view/${view_id}`)
          .then((res) => {
            this.setViewData = res?.data?.payment_cycle_details;
            console.log(this.setViewData, 'anwar');
          })
          .catch((errors) => {
            this.$toast.error(errors.response);
          });
      }
    },
    async GeneratePDF() {
      // this.isLoading = true;
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

    updateHeaderTitle() {
      const title = this.$t("container.emergency_payment.emergency_payment_cycle.payment_cycle_list");
      this.$store.commit("setHeaderTitle", title);
    },

  },
  watch: {
    "$i18n.locale": "updateHeaderTitle",
  },
  created() {
    this.loadViewDetails();
  },

  mounted() {
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
