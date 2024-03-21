<template>
  <v-container fluid>
    <v-row class="mt-3">
      <v-col cols="12" md="6" lg="6">
        <v-card>
          <v-card-text>
            <V-row>
              <ProgramLocationWisePieChartVue />
            </V-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Chart from "chart.js/auto";
import ProgramLocationWisePieChartVue from "@/pages/BeneficiaryManagement/BeneficiaryDashboard//ProgramLocationWisePieChart.vue";
import TotalNumerApprovePieChart from "@/pages/ApplicationSelection/Dashboard/TotalNumerApprovePieChart.vue";

import { GChart } from "vue-google-charts/legacy";
export default {
  name: "Index",
  title: "Beneficiary Dashboard",
  data() {
    return {};
  },
  components: {
    GChart,
    ProgramLocationWisePieChartVue,
    TotalNumerApprovePieChart,
  },
  computed: {
    drawer: {
      get() {
        return this.$store.state.Drawer;
      },
      set(v) {
        return this.$store.commit("setDrawer", v);
      },
    },
  },
  methods: {},
  mounted() {
    this.drawer = false;
  },
  beforeMount() {},
  watch: {},

  created() {},
};
</script>
<style>
.highlight-column {
  background-color: #e0eaf1;
}
</style>