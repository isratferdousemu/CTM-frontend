<template>
  <v-container fluid>
    <v-card-title tag="div" style="background-color:#1c3b68;color:white;margin-bottom: 17px;font-size:17px;">
      <h3 class="white--text">
        {{ $t("container.grievance_management.dashboard.grievance_dashboard") }}
      </h3>
    </v-card-title>

    <!-------start  header Card component ---->
    <v-row align="center" justify="center" dense>
      <v-col cols="12" md="3">
        <v-card class="mx-auto" color="grey lighten-4" max-width="600">
          <v-card-title>
            <v-icon :color="checking ? 'red lighten-2' : 'indigo'" class="mr-8" size="64" @click="takePulse">
              mdi-heart-pulse
            </v-icon>
            <v-row align="start">
              <div class="text-caption black--text text-uppercase">
                Total Grievance Received
              </div>
            </v-row>
          </v-card-title>
          <h1 align="center">{{  totalRecivedGrievance }}</h1>
        </v-card>
      </v-col>

      <v-col cols="12" md="3">
        <v-card class="mx-auto" color="grey lighten-4" max-width="600">
          <v-card-title>
            <v-icon :color="checking ? 'red lighten-2' : 'indigo'" class="mr-8" size="64" @click="takePulse">
              mdi-heart-pulse
            </v-icon>
            <v-row align="start">
              <div class="text-caption black--text text-uppercase">
                Total Grievance Solved
              </div>
            </v-row>
          </v-card-title>
          <h1 align="center">{{ totalSolvedGrievance }}</h1>
        </v-card>
      </v-col>

      <v-col cols="12" md="3">
        <v-card class="mx-auto" color="grey lighten-4" max-width="600">
          <v-card-title>
            <v-icon :color="checking ? 'red lighten-2' : 'indigo'" class="mr-8" size="64" @click="takePulse">
              mdi-heart-pulse
            </v-icon>
            <v-row align="start">
              <div class="text-caption black--text text-uppercase">
                Total Grievance Canceled
              </div>
            </v-row>
          </v-card-title>
          <h1 align="center">{{ totalCanceledGrievance }}</h1>
        </v-card>
      </v-col>
      <v-col cols="12" md="3">
        <v-card class="mx-auto" color="grey lighten-4" max-width="600">
          <v-card-title>
            <v-icon :color="checking ? 'red lighten-2' : 'indigo'" class="mr-8" size="64" @click="takePulse">
              mdi-heart-pulse
            </v-icon>
            <v-row align="start">
              <div class="text-caption black--text text-uppercase">
                Total Grievance Pending
              </div>
            </v-row>
          </v-card-title>
          <h1 align="center">{{ totalPendingGrievance }}</h1>
        </v-card>
      </v-col>

    </v-row>
    <!-------End  header Card component ------->
    <!-------Start  table  component ------->
    <!-- <div style="margin-top: 10px;">
        <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-simple-table fixed-header height="300px" class="table-responsive">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">
                SL
              </th>
              <th class="text-left">
                Division
              </th>
              <th class="text-left">
                New Grievance
              </th>
              <th class="text-left">
                Total Solved Grievacne
              </th>
              <th class="text-left">
               Avarage Resolved
              </th>
              <th class="text-left">
                 Resolved Rate
              </th>
              <th class="text-left">
                Total Grievacne
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>01</td>
              <td>Dhaka</td>
              <td>Dhaka</td>
              <td>Dhaka</td>
              <td>Dhaka</td>
              <td>Dhaka</td>
              <td>Dhaka</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div> -->
    <!-------End  table component ------->

    <v-row class="mt-3">

      <v-col cols="12" md="6" lg="6">
        <v-card>
          <v-card-text>
            <V-row>
              <TotalNumerReceivedDoughnutChart />
            </V-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" lg="6">
        <v-card height="100%">
          <v-card-text>
            <V-row>
              <TotalNumerApprovePieChart />
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
              <TotalNumerReceivedLineBarChart />
            </V-row>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6" lg="6">
        <v-card height="100%">
          <v-card-text>
            <V-row>
              <TotalNumerForwardedBarChart />
            </V-row>
          </v-card-text>
        </v-card>
      </v-col>

    </v-row> -->

  </v-container>
</template>

<script>
import Chart from "chart.js/auto";
import TotalNumerReceivedDoughnutChart
  from "@/pages/GrievanceManagement/Dashboard/TotalNumerReceivedDoughnutChart.vue";
import TotalNumerApprovePieChart from "@/pages/GrievanceManagement/Dashboard/TotalNumerApprovePieChart.vue";
import ProgramWiseWaitingPieChart from "@/pages/GrievanceManagement/Dashboard/ProgramWiseWaitingPieChart.vue";
import NumerofApplicationRejectedDoughnutChart
  from "@/pages/GrievanceManagement/Dashboard/NumerofApplicationRejectedDoughnutChart.vue";
import TotalNumerReceivedLineBarChart from "@/pages/GrievanceManagement/Dashboard/TotalNumerReceivedLineBarChart.vue";
import TotalNumerForwardedBarChart from "@/pages/GrievanceManagement/Dashboard/TotalNumerForwardedBarChart.vue";
import { GChart } from "vue-google-charts/legacy";
export default {
  name: "Index",
  title: "Grievance Dashboard",
  data() {
    return {
      totalRecivedGrievance: null,
      totalSolvedGrievance: null,
      totalCanceledGrievance: null,
      totalPendingGrievance:null,
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
   async getTotalRecivedNumberOfGrievance(){
      const queryParams = {
        status: 1,
       };
      this.$axios.get("admin/grievance-dashboard/numberReceivedOfGrievance",{
       headers: {
          Authorization: "Bearer " + this.$store.state.token,
          "Content-Type": "multipart/form-data",
        },
        params: queryParams,
      }).then((result) => {
         console.log(result.data.data,'total');
        this.totalRecivedGrievance = result?.data?.data;
      });
    },

   async getTotalSolvedNumberOfGrievance() {
      const queryParams = {
        status: 2,
      };
      this.$axios.get("admin/grievance-dashboard/numberOfSolvedGrievance", {
        headers: {
          Authorization: "Bearer " + this.$store.state.token,
          "Content-Type": "multipart/form-data",
        },
        params: queryParams,
      }).then((result) => {
        console.log(result?.data?.data,'result?.data?.data')
        this.totalSolvedGrievance = result?.data?.data;
        console.log(this.totalSolvedGrievance,'this.totalSolvedGrievance');
      });
    },
    async getTotalCanceledNumberOfGrievance() {
      const queryParams = {
        status: 3,
      };
      this.$axios.get("admin/grievance-dashboard/numberOfCanceledGrievance", {
        headers: {
          Authorization: "Bearer " + this.$store.state.token,
          "Content-Type": "multipart/form-data",
        },
        params: queryParams,
      }).then((result) => {
        console.log(result?.data?.data, 'result?.data?.data')
        this.totalCanceledGrievance = result?.data?.data;
        console.log(this.totalCanceledGrievance, 'this.totalCanceledGrievance');
      });
    },
    async getTotalPendingNumberOfGrievance() {
      const queryParams = {
        status: 4,
      };
      this.$axios.get("admin/grievance-dashboard/numberOfPendingdGrievance", {
        headers: {
          Authorization: "Bearer " + this.$store.state.token,
          "Content-Type": "multipart/form-data",
        },
        params: queryParams,
      }).then((result) => {
        console.log(result?.data?.data, 'result?.data?.data')
        this.totalPendingGrievance = result?.data?.data;
        console.log(this.totalPendingGrievance, 'this.totalPendingGrievance');
      });
    }

  },
  mounted() {
    this.drawer = false;
  },
  beforeMount() {

  },
  watch: {

  },

  created() {
    this.getTotalRecivedNumberOfGrievance();
    this.getTotalSolvedNumberOfGrievance();
    this.getTotalCanceledNumberOfGrievance();
    this.getTotalPendingNumberOfGrievance();
  },

}
</script>
<style>
.highlight-column {
  background-color: #e0eaf1;
}
</style>