<template>
  <v-container fluid>
    <v-card-title
      tag="div"
      style="
        background-color: #1c3b68;
        color: white;
        margin-bottom: 17px;
        font-size: 17px;
      "
    >
      <h3 class="white--text">
        {{ $t("container.payroll_management.emergency_dashboard.header") }}
      </h3>
    </v-card-title>

    <!-------start  header Card component ---->
    <v-row align="center" justify="center" dense>
      <v-col cols="12" md="4">
        <v-card class="mx-auto" color="grey lighten-4" max-width="600">
          <v-card-title class="d-flex flex-column align-center">
            <v-icon color="indigo" size="32"> mdi-account </v-icon>
            <div class="text-caption black--text text-uppercase mt-2">
              {{
                $t(
                  "container.payroll_management.emergency_dashboard.emergency_allotment"
                )
              }}
            </div>
          </v-card-title>
          <v-card-subtitle align="center" class="mt-1">
            <h1>
              {{
                language === "bn"
                  ? $helpers.englishToBangla(this.emergency_allotments)
                  : this.emergency_allotments
              }}
            </h1>
          </v-card-subtitle>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card class="mx-auto" color="grey lighten-4" max-width="600">
          <v-card-title class="d-flex flex-column align-center">
            <v-icon color="indigo" size="32"> mdi-account </v-icon>
            <div class="text-caption black--text text-uppercase mt-2">
              {{
                $t(
                  "container.payroll_management.emergency_dashboard.existing_beneficiary"
                )
              }}
            </div>
          </v-card-title>
          <v-card-subtitle align="center" class="mt-1">
            <h1>
              {{
                language === "bn"
                  ? $helpers.englishToBangla(this.existing_beneficiary)
                  : this.existing_beneficiary
              }}
            </h1>
          </v-card-subtitle>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card class="mx-auto" color="grey lighten-4" max-width="600">
          <v-card-title class="d-flex flex-column align-center">
            <v-icon color="indigo" size="32"> mdi-account-multiple </v-icon>
            <div class="text-caption black--text text-uppercase mt-2">
              {{
                $t(
                  "container.payroll_management.emergency_dashboard.emergency_beneficiary"
                )
              }}
            </div>
          </v-card-title>
          <v-card-subtitle align="center" class="mt-1">
            <h1>
              {{
                language === "bn"
                  ? $helpers.englishToBangla(this.emergency_beneficiaries)
                  : this.emergency_beneficiaries
              }}
            </h1>
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>

    <!-------End  header Card component ------->
    <v-row class="mt-3">
      <v-col cols="12" md="6" lg="6">
        <v-card height="100%">
          <v-card-text>
            <V-row>
              <ProgramWisePayrollChart />
            </V-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" lg="6">
        <v-card height="100%">
          <v-card-text>
            <V-row>
              <ProgramWisePaymentCycleDoughnutChart />
            </V-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- <v-row class="mt-3">
    <v-col cols="12" md="6" lg="6">
        <v-card height="100%">
          <v-card-text>
            <V-row>
              <TotalApprovedPayrollBarChart />
            </V-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" lg="6">
        <v-card height="100%">
          <v-card-text>
            <V-row>
              <TotalAmountDisbursedBarChart />
            </V-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row> -->

    <v-row class="mt-3">
      <v-col cols="12" md="6" lg="6">
        <v-card height="100%">
          <v-card-text>
            <V-row>
              <PaymentCycleDisbursementStatusDoughnutChart />
            </V-row>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6" lg="6">
        <v-card height="100%">
          <v-card-text>
            <V-row>
              <ProgramBalanceDoughnutChart />
            </V-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Chart from "chart.js/auto";
import ProgramWisePayrollChart from "@/pages/EmergencyPaymentManagement/Dashboard/ProgramWisePayrollChart.vue";
import PaymentCycleDisbursementStatusDoughnutChart from "@/pages/EmergencyPaymentManagement/Dashboard/PaymentCycleDisbursementStatusDoughnutChart.vue";
import ProgramWisePaymentCycleDoughnutChart from "@/pages/EmergencyPaymentManagement/Dashboard/ProgramWisePaymentCycleDoughnutChart.vue";
import ProgramBalanceDoughnutChart from "@/pages/EmergencyPaymentManagement/Dashboard/ProgramBalanceDoughnutChart.vue";
// import TotalApprovedPayrollBarChart from "@/pages/EmergencyPaymentManagement/Dashboard/TotalApprovedPayrollBarChart.vue";
// import TotalAmountDisbursedBarChart from "@/pages/EmergencyPaymentManagement/Dashboard/TotalAmountDisbursedBarChart.vue";
// import TotalPaymentProcessorPieChart from "@/pages/EmergencyPaymentManagement/Dashboard/TotalPaymentProcessorPieChart.vue";
import { GChart } from "vue-google-charts/legacy";
export default {
  name: "Index",
  title: "Payroll Dashboard",
  data() {
    return {
      existing_beneficiary: null,
      emergency_allotments: null,
      emergency_beneficiaries: null,
    };
  },
  components: {
    GChart,
    ProgramWisePayrollChart,
    ProgramWisePaymentCycleDoughnutChart,
    ProgramBalanceDoughnutChart,
    PaymentCycleDisbursementStatusDoughnutChart,
    // TotalApprovedPayrollBarChart,
    // TotalAmountDisbursedBarChart,
    // TotalPaymentProcessorPieChart,
  },
  computed: {
    language: {
      get() {
        return this.$store.getters.getAppLanguage;
      },
    },
    // drawer: {
    //   get() {
    //     return this.$store.state.Drawer;
    //   },
    //   set(v) {
    //     return this.$store.commit("setDrawer", v);
    //   },
    // },
  },
  methods: {
    async getStatusPayrollData() {
      this.$axios
        .get("admin/payroll/emergency-dashboard-data", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          this.existing_beneficiary = result?.data?.beneficiary;
          this.emergency_allotments = result?.data?.emergency_allotments;
          this.emergency_beneficiaries = result?.data?.emergency_beneficiaries;
        });
    },

    async getStatusPaymentCycleData() {
      this.$axios
        .get("admin/payroll/payment-cycle-status-data", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          this.total_payment_cycle = result?.data?.total_payment_cycle;
          this.total_payment_cycle_ibas = result?.data?.total_processing;
        });
    },
  },
  mounted() {
    this.drawer = false;
  },
  beforeMount() {},
  watch: {},

  created() {
    this.getStatusPayrollData();
    this.getStatusPaymentCycleData();
  },
};
</script>
<style>
.highlight-column {
  background-color: #e0eaf1;
}
.custom-title {
  background-color: rgb(28, 59, 104);
  color: white;
  padding: 10px;
}
</style>
