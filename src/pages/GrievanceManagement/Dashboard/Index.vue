<template>
  <v-container fluid>
     <v-card-title  tag="div"
                    style="background-color:#1c3b68;color:white;margin-bottom: 17px;font-size:17px;">
                    <h3 class="white--text">
                      {{ $t("container.grievance_management.dashboard.grievance_dashboard") }}
                    </h3>
     </v-card-title>

     <!-------start  header Card component ---->
    <v-row align="center" justify="center" dense>
      <v-col cols="12" md="4">
        <v-card
          append-icon='mdi-calendar'
          class="mx-auto"
          prepend-icon="mdi-account"
          subtitle="prepend-icon and append-icon"
          title="Icons"
        >
          <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card
          class="mx-auto"
          subtitle="prepend and append"
          title="Icons"
        >
          <template v-slot:prepend>
            <v-icon color="primary" icon="mdi-account"></v-icon>
          </template>
          <template v-slot:append>
            <v-icon color="success" icon="mdi-check"></v-icon>
          </template>
          <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card
          append-avatar="https://cdn.vuetifyjs.com/images/john.jpg"
          class="mx-auto"
          prepend-avatar="https://cdn.vuetifyjs.com/images/logos/v-alt.svg"
          subtitle="prepend-avatar and append-avatar"
          title="Avatars"
        >
          <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</v-card-text>
        </v-card>
      </v-col>

    </v-row>
     <!-------End  header Card component ------->

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
    drawer: {
      get() {
        return this.$store.state.Drawer;
      },
      set(v) {
        return this.$store.commit("setDrawer", v);
      },
    },
  },
  methods: {

  },
  mounted(){
    this.drawer = false;
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