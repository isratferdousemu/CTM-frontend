<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col v-for="(item ,index) in getAllApiCount" :key="index" class="justify-center">
        <v-card class="elevation-10 border-radius-card">

          <div class="flex-column align-center">
            <v-card-text>
              <div class="d-flex align-center black--text">

                <v-row>
                  <v-col>
                    <v-chip> <v-icon class="mdi mdi-map-marker"></v-icon></v-chip>


                    <span class="ml-1 font-weight-bold">{{ $i18n.locale ==
                      'en' ? item.title_en : item.title_bn
                      }}</span>
                  </v-col>
                  <v-col v-if="index == 2 || index == 3" class="font-weight-bold text-right align-right">
                    Last 24
                    Hour
                  </v-col>
                </v-row>



              </div>
              <div class="mt-1 ml-5 font-weight-bold text-left black--text">{{ $i18n.locale == 'en' ? item.number :
                $helpers.englishToBangla(item.number) }}</div>
            </v-card-text>
          </div>

        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="6" lg="6">
        <v-card>
          <v-card-text>
            <V-row>
              <DateWiseChart />
            </V-row>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6" lg="6">
        <v-card>
          <v-card-text>
            <V-row>
              <OrganizationWiseChart />
            </V-row>
          </v-card-text>
        </v-card>
      </v-col>

    </v-row>

  </v-container>
</template>

<script>
import Chart from "chart.js/auto";
import OrganizationWiseChart from "@/pages/APIManager/Dashboard/OrganizationWiseChart.vue";
import DateWiseChart from "@/pages/APIManager/Dashboard/DateWiseChart.vue";
export default {
  name: "Index",
  title: "API Manager Dashboard",
  data() {
    return {
      getAllApiCount: [],
    };
  },
  components: {
    OrganizationWiseChart,
    DateWiseChart
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
          .get(`/admin/api-manager/dashboard/get-all-api-count`, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((result) => {
            this.getAllApiCount = result.data.data
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