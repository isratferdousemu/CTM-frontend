<template>
  <v-container fluid>
    <!--    <v-card-title class="justify-center" tag="div">-->
    <!--      <h5 class="text-uppercase">-->
    <!--        {{ $t("container.system_config.demo_graphic.district.list") }}-->
    <!--      </h5>-->
    <!--    </v-card-title>-->

    <v-row class="mt-3">

      <v-col cols="12" md="6" lg="6">
        <v-card>
          <v-card-text>
            <V-row>
                  <TotalNumerReceivedDoughnutChart/>
            </V-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" lg="6">
        <v-card height="100%">
          <v-card-text>
            <V-row>
              <TotalNumerApprovePieChart/>
            </V-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" lg="6">
        <v-card height="100%">
          <v-card-text>
            <V-row>
              <ProgramWiseWaitingPieChart/>
            </V-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" lg="6">
        <v-card height="100%">
          <v-card-text>
            <V-row>
              <NumerofApplicationRejectedDoughnutChart/>
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
              <TotalNumerReceivedLineBarChart/>
            </V-row>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6" lg="6">
        <v-card height="100%">
          <v-card-text>
            <V-row>
              <TotalNumerForwardedBarChart/>
            </V-row>
          </v-card-text>
        </v-card>
      </v-col>

    </v-row>

  </v-container>
</template>

<script>
import Chart from "chart.js/auto";
import TotalNumerReceivedDoughnutChart
  from "@/pages/ApplicationSelection/Dashboard/TotalNumerReceivedDoughnutChart.vue";
import TotalNumerApprovePieChart from "@/pages/ApplicationSelection/Dashboard/TotalNumerApprovePieChart.vue";
import ProgramWiseWaitingPieChart from "@/pages/ApplicationSelection/Dashboard/ProgramWiseWaitingPieChart.vue";
import NumerofApplicationRejectedDoughnutChart
  from "@/pages/ApplicationSelection/Dashboard/NumerofApplicationRejectedDoughnutChart.vue";
import TotalNumerReceivedLineBarChart from "@/pages/ApplicationSelection/Dashboard/TotalNumerReceivedLineBarChart.vue";
import TotalNumerForwardedBarChart from "@/pages/ApplicationSelection/Dashboard/TotalNumerForwardedBarChart.vue";
import { GChart } from "vue-google-charts/legacy";
export default {
  name: "Index",
  title: "Application Dashboard",
  data() {
    return {

    };
  },
  components: {
    GChart,
    TotalNumerReceivedDoughnutChart,
    TotalNumerApprovePieChart,
    ProgramWiseWaitingPieChart,
    NumerofApplicationRejectedDoughnutChart,
    TotalNumerReceivedLineBarChart,
    TotalNumerForwardedBarChart,
  },
  computed: {

  },
  methods: {


  },
  mounted(){
  },
  beforeMount() {

  },
  watch: {

  },

  created() {

  },

}
</script>
<style>
.highlight-column {
  background-color: #e0eaf1;
}
</style>