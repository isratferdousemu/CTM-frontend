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
        {{ $t("container.payroll_management.dashboard.header") }}
      </h3>
    </v-card-title>

    <!-------start  header Card component ---->
    <v-row align="center" justify="center" dense>
      <v-col cols="12" md="3">
        <v-card class="mx-auto" color="grey lighten-4" max-width="600">
          <v-card-title>
            <v-icon color="indigo" class="mr-8 mb-2" size="64">
              mdi-check-circle
            </v-icon>
            <v-row align="start">
              <div class="text-caption black--text text-uppercase">
                {{
                  $t("container.payroll_management.dashboard.approved_payroll")
                }}
              </div>
            </v-row>
          </v-card-title>
          <h1 align="center">
            {{
              language === "bn"
                ? $helpers.englishToBangla(this.total_approved_payroll)
                : this.total_approved_payroll
            }}
          </h1>
        </v-card>
      </v-col>

      <v-col cols="12" md="3">
        <v-card class="mx-auto" color="grey lighten-4" max-width="600">
          <v-card-title>
            <v-icon color="indigo" class="mr-8 mb-2" size="64">
              mdi-cancel
            </v-icon>
            <v-row align="start">
              <div class="text-caption black--text text-uppercase">
                {{
                  $t("container.payroll_management.dashboard.rejected_payroll")
                }}
              </div>
            </v-row>
          </v-card-title>
          <h1 align="center">
            {{
              language === "bn"
                ? $helpers.englishToBangla(this.total_rejected_payroll)
                : this.total_rejected_payroll
            }}
          </h1>
        </v-card>
      </v-col>

      <v-col cols="12" md="3">
        <v-card class="mx-auto" color="grey lighten-4" max-width="600">
          <v-card-title>
            <v-icon color="indigo" class="mr-8 mb-2" size="64">
              mdi-refresh
            </v-icon>
            <v-row align="start">
              <div class="text-caption black--text text-uppercase">
                {{
                  $t(
                    "container.payroll_management.dashboard.total_payment_cycle"
                  )
                }}
              </div>
            </v-row>
          </v-card-title>
          <h1 align="center">
            {{
              language === "bn"
                ? $helpers.englishToBangla(this.total_payment_cycle)
                : this.total_payment_cycle
            }}
          </h1>
        </v-card>
      </v-col>

      <v-col cols="12" md="3">
        <v-card class="mx-auto" color="grey lighten-4" max-width="600">
          <v-card-title>
            <v-icon color="indigo" class="mr-8 mb-2" size="64">
              mdi-check
            </v-icon>
            <v-row align="start">
              <div class="text-caption black--text text-uppercase">
                {{
                  $t(
                    "container.payroll_management.dashboard.completed_payment_cycle"
                  )
                }}
              </div>
            </v-row>
          </v-card-title>
          <h1 align="center">
            {{
              language === "bn"
                ? $helpers.englishToBangla(this.total_payment_cycle_ibas)
                : this.total_payment_cycle_ibas
            }}
          </h1>
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
              <TotalPaymentProcessorPieChart />
            </V-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-3">
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
    </v-row>

    <v-row class="mt-3">
    <v-col cols="12" md="6" lg="6">
        <v-card height="100%">
          <v-card-text>
            <V-row>
              <ProgramWisePaymentCycleDoughnutChart />
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
import ProgramWisePayrollChart from "@/pages/PayrollManagement/Dashboard/ProgramWisePayrollChart.vue";
import TotalApprovedPayrollBarChart from "@/pages/PayrollManagement/Dashboard/TotalApprovedPayrollBarChart.vue";
import TotalAmountDisbursedBarChart from "@/pages/PayrollManagement/Dashboard/TotalAmountDisbursedBarChart.vue";
import TotalPaymentProcessorPieChart from "@/pages/PayrollManagement/Dashboard/TotalPaymentProcessorPieChart.vue";
import ProgramWisePaymentCycleDoughnutChart from "@/pages/PayrollManagement/Dashboard/ProgramWisePaymentCycleDoughnutChart.vue";
import ProgramBalanceDoughnutChart from "@/pages/PayrollManagement/Dashboard/ProgramBalanceDoughnutChart.vue";
import { GChart } from "vue-google-charts/legacy";
export default {
  name: "Index",
  title: "Payroll Dashboard",
  data() {
    return {
      total_approved_payroll: null,
      total_rejected_payroll: null,
      total_payment_cycle: null,
      total_payment_cycle_ibas: null,
    };
  },
  components: {
    GChart,
    ProgramWisePayrollChart,
    TotalApprovedPayrollBarChart,
    TotalAmountDisbursedBarChart,
    TotalPaymentProcessorPieChart,
    ProgramWisePaymentCycleDoughnutChart,
    ProgramBalanceDoughnutChart,
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
        .get("admin/payroll/payroll-status-data", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          this.total_approved_payroll = result?.data?.totalCompleted;
          this.total_rejected_payroll = result?.data?.totalRejected;
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
