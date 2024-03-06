<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col v-for="item in get_all_application_count_info" :key="item.id" class="justify-center">
        <v-card class="elevation-10 border-radius-card">
          <v-card-text class="flex-column align-center">
            <div class="d-flex align-center">
              <div class="location-icon-container">
                <v-icon class="mdi mdi-map-marker"></v-icon>
              </div>
              <span class="ml-1 font-weight-bold">{{ item.title }}</span>
            </div>
            <div class="mt-1 font-weight-bold text-center">{{ item.number }}</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="6" lg="6">
        <v-card>
          <v-card-text>
            <V-row>
              <ProgramWiseTotalBeneficiaryDoughnutChart/>
            </V-row>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6" lg="6">
        <v-card height="100%">
          <v-card-text>
            <V-row>
              <OfficeTypeofUserNumber/>
            </V-row>
          </v-card-text>
        </v-card>
      </v-col>

    </v-row>

<!--    <v-row>-->
<!--      <v-col>-->
<!--        <v-simple-table class="table-bord">-->
<!--          <template v-slot:default>-->
<!--            <thead>-->
<!--            <tr>-->
<!--              <th colspan="5" class="text-center">Active Allowance Program List</th>-->
<!--            </tr>-->
<!--            <tr>-->
<!--              <th class="text-center">SL</th>-->
<!--              <th class="text-center">Program Name</th>-->
<!--              <th class="text-center">Total Number of Beneficiary</th>-->
<!--              <th class="text-center">Active Fiscal Year</th>-->
<!--              <th class="text-center">Year of Start</th>-->
<!--            </tr>-->
<!--            </thead>-->
<!--            <tbody>-->
<!--            <tr>-->
<!--              <td class="bordered-cell">1</td>-->
<!--              <td class="bordered-cell">Old Age</td>-->
<!--              <td class="bordered-cell">125000</td>-->
<!--              <td class="bordered-cell">2024-2025</td>-->
<!--              <td class="bordered-cell">1992-1993</td>-->
<!--            </tr>-->
<!--            </tbody>-->
<!--          </template>-->
<!--        </v-simple-table>-->

<!--      </v-col>-->
<!--    </v-row>-->
  </v-container>
</template>

<script>
import Chart from "chart.js/auto";
import OfficeTypeofUserNumber from "@/pages/SystemConfiguration/Dashboard/OfficeTypeofUserNumber.vue";
import TotalNumerForwardedBarChart from "@/pages/ApplicationSelection/Dashboard/TotalNumerForwardedBarChart.vue";
import ProgramWiseTotalBeneficiaryDoughnutChart
  from "@/pages/SystemConfiguration/Dashboard/ProgramWiseTotalBeneficiaryDoughnutChart.vue";
export default {
  name: "Index",
  title: "System Configuration Dashboard",
  data() {
    return {
      get_all_application_count_info: [],

    };
  },
  components: {
    TotalNumerForwardedBarChart,
    OfficeTypeofUserNumber,
    ProgramWiseTotalBeneficiaryDoughnutChart
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
    async getAllApplicationLocationCount() {
      await this.$axios
          .get(`/admin/system-configuration/dashboard/get-all-location-application-count`, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((result) => {
            this.get_all_application_count_info = result.data.data
          });

    },
  },
  mounted(){
    this.drawer = false;
  },
  beforeMount() {

  },
  watch: {

  },

  created() {
    this.getAllApplicationLocationCount()
  },

}
</script>
<style>
.highlight-column {
  background-color: #e0eaf1;
}
.location-icon-container {
  background-color: #ff5722; /* or any other color */
  width: 32px; /* adjust as needed */
  height: 32px; /* adjust as needed */
  border-radius: 50%; /* to make it round */
  display: flex;
  justify-content: center;
  align-items: center;
}
.location-icon-container {
  background-color: #BBDEFB; /* or any other color */
  width: 20px; /* adjust as needed */
  height: 20px; /* adjust as needed */
  border-radius: 100%; /* to make it round */
  display: flex;
  justify-content: center;
  align-items: center;
}
.location-icon-container .v-icon {
  font-size: 12px;
  color:#1976D2
}

.table-bord td, .table-bord th {
  border: 1px solid #000;
}

.table-bord th {
  background-color: #f0f0f0; /* Background color for headers */
}

/* Optional: Center text horizontally and vertically */
.table-bord td, .table-bord th {
  text-align: center;
  vertical-align: middle;
}

</style>