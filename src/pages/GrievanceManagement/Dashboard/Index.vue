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
            <v-icon color= 'indigo' class="mr-8" size="64" >
             mdi-account-multiple-plus
            </v-icon>
            <v-row align="start">
              <div class="text-caption black--text text-uppercase">
                 {{ $t("container.grievance_management.dashboard.total_received")}}
              </div>
            </v-row>
          </v-card-title>
          <h1 align="center">{{ language ==='bn' ? $helpers.englishToBangla(this.totalRecivedGrievance) : this.totalRecivedGrievance }}</h1>
        </v-card>
      </v-col>

      <v-col cols="12" md="3">
        <v-card class="mx-auto" color="grey lighten-4" max-width="600">
          <v-card-title>
            <v-icon color= 'indigo' class="mr-8" size="64" >
             mdi-account-multiple-plus
            </v-icon>
            <v-row align="start">
              <div class="text-caption black--text text-uppercase">
                 {{ $t("container.grievance_management.dashboard.total_resolved") }}
              </div>
            </v-row>
          </v-card-title>
              <h1 align="center">{{ language === 'bn' ? $helpers.englishToBangla(this.totalSolvedGrievance) : this.totalSolvedGrievance }}</h1>
        </v-card>
      </v-col>

      <v-col cols="12" md="3">
        <v-card class="mx-auto" color="grey lighten-4" max-width="600">
          <v-card-title>
            <v-icon color='indigo' class="mr-8" size="64" >
             mdi-account-multiple-plus
            </v-icon>
            <v-row align="start">
              <div class="text-caption black--text text-uppercase">
                 {{ $t("container.grievance_management.dashboard.total_rejected") }}
              </div>
            </v-row>
          </v-card-title>
             <h1 align="center">{{ language === 'bn' ? $helpers.englishToBangla(this.totalCanceledGrievance) : this.totalCanceledGrievance }}</h1>
        </v-card>
      </v-col>
      <v-col cols="12" md="3">
        <v-card class="mx-auto" color="grey lighten-4" max-width="600">
          <v-card-title>
            <v-icon color='indigo' class="mr-8" size="64" >
              mdi-account-multiple-plus
            </v-icon>
            <v-row align="start">
              <div class="text-caption black--text text-uppercase">
                 {{ $t("container.grievance_management.dashboard.total_pending") }}
              </div>
            </v-row>
          </v-card-title>
           <h1 align="center">{{ language === 'bn' ? $helpers.englishToBangla(this.totalPendingGrievance) : this.totalPendingGrievance }}</h1>
        </v-card>
      </v-col>

    </v-row>
    <!-------End  header Card component ------->
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
  
    <v-row class="mt-3">
      <v-col cols="12" md="6" lg="6">
        <v-card height="100%">
          <v-card-text>
            <V-row>
              <TotalNumerLocationWisePieChart />
            </V-row>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6" lg="6">
        <v-card height="100%">
          <v-card-text>
            <V-row>
              <TotalNumerStatusWisePieChart />
            </V-row>
          </v-card-text>
        </v-card>
      </v-col>

    </v-row>

    <!-------Start  table  component ------->
    <div style="margin-top: 10px;">
      <v-simple-table fixed-header class="table-responsive">
       
        <template v-slot:default>
            <caption>
                   <v-card-title class="custom-title">
                              <h6 class="text-center" style="font-size:16.16px;">  {{ $t("container.grievance_management.dashboard.header") }}</h6>
                    </v-card-title>

            <v-breadcrumbs :items="breadcrumbItems" divider="/">
              <template v-slot:item="{ item, index }">
                <v-breadcrumbs-item
                  :key="index"
                  :disabled="item.disabled"
                  @click.prevent="handleBreadcrumbClick(item.value)"
                  style="cursor: pointer;font-weight: bold; color: blue;transition: color 0.3s ease; "
                >
                  {{ language === 'bn' ? $helpers.englishToBangla(item.text) : item.text }}
                </v-breadcrumbs-item>
              </template>
            </v-breadcrumbs>
            </caption>
  
          <thead class="primary lighten-1">
            <tr>
              <th class="text-left">
                 {{ $t("container.list.sl") }}
              </th>
              <th class="text-left">
                {{ $t("container.grievance_management.dashboard.locationName") }}
              </th>
              <th class="text-left">
                {{ $t("container.grievance_management.dashboard.total_new") }}
              </th>
              <th class="text-left">
                  {{ $t("container.grievance_management.dashboard.total_resolved") }}
              </th>
              <th class="text-left">
                 {{ $t("container.grievance_management.dashboard.total_rejected") }}
              </th>
              <th class="text-left">
                  {{ $t("container.grievance_management.dashboard.total_not_solved") }}
              </th>
              <th class="text-left">
                {{ $t("container.grievance_management.dashboard.action") }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in locationWisegrievacne" :key="item.index">
              <td>{{ language==='bn'? $helpers.englishToBangla(index + 1): index + 1}}</td>
              <td>{{ language==='bn' ? item.name_bn : item.name_en}}</td>
              <td>{{ language==='bn' ? $helpers.englishToBangla(item.total_grievance_new) : item.total_grievance_new }}</td>
              <td>{{ language==='bn' ? $helpers.englishToBangla(item.total_grievance_approved) : item.total_grievance_approved }}</td>
              <td>{{ language==='bn' ? $helpers.englishToBangla(item.total_grievance_canceled) : item.total_grievance_canceled }}</td>
              <td>{{ language==='bn' ? $helpers.englishToBangla(item.total_grievance_pending) : item.total_grievance_pending }}</td>
              <td>
                  <v-btn v-if="item.type === 'division' || item.type === 'district' " @click="fetchNextLevel(item.id,item.type)" fab x-small v-on="on" color="success" elevation="0">
                     <v-icon >mdi-arrow-collapse-right </v-icon>
                   </v-btn>
              </td>
               
              
            </tr>
          </tbody>
        </template>
        
      </v-simple-table>
    </div>
      <!-------End  table component ------->
  </v-container>
</template>

<script>
import Chart from "chart.js/auto";
import TotalNumerReceivedDoughnutChart
  from "@/pages/GrievanceManagement/Dashboard/TotalNumerReceivedDoughnutChart.vue";
import TotalNumerApprovePieChart from "@/pages/GrievanceManagement/Dashboard/TotalNumerApprovePieChart.vue";
import TotalNumerLocationWisePieChart from "@/pages/GrievanceManagement/Dashboard/TotalNumerLocationWisePieChart.vue";
import TotalNumerStatusWisePieChart from "@/pages/GrievanceManagement/Dashboard/TotalNumerStatusWisePieChart.vue";
import { GChart } from "vue-google-charts/legacy";
export default {
  name: "Index",
  title: "Grievance Dashboard",
  data() {
    return {
      totalRecivedGrievance:null,
      totalSolvedGrievance: null,
      totalCanceledGrievance: null,
      totalPendingGrievance:null,
      locationWisegrievacne:null,
      breadcrumbItems: [
        { text: this.$i18n.locale == 'en' ? 'Division' : 'বিভাগ', value: 'division' },
        { text: this.$i18n.locale == 'en' ? 'District' : 'জেলা', value: 'district' },
        { text: this.$i18n.locale == 'en' ? 'Thana' : 'থানা', value: 'thana' },
      ],
    };
  },
  components: {
    GChart,
    TotalNumerReceivedDoughnutChart,
    TotalNumerApprovePieChart,
    TotalNumerLocationWisePieChart,
    TotalNumerStatusWisePieChart
  },
  computed: {
     language: {
      get() {
        return this.$store.getters.getAppLanguage;
      }
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
    handleBreadcrumbClick(type) {
           let item='breadcrumb';
           this.getLocationoWiseNumberOfGrievance(item, type);

    },
    
   async getTotalRecivedNumberOfGrievance(){

      this.$axios.get("admin/grievance-dashboard/numberReceivedOfGrievance",{
       headers: {
          Authorization: "Bearer " + this.$store.state.token,
          "Content-Type": "multipart/form-data",
        },
        // params: queryParams,
      }).then((result) => {
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
        this.totalSolvedGrievance = result?.data?.data;
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
        this.totalCanceledGrievance = result?.data?.data;
      });
    },
    async getTotalPendingNumberOfGrievance() {
      const queryParams = {
        status: 0,
      };
      this.$axios.get("admin/grievance-dashboard/numberOfPendingdGrievance", {
        headers: {
          Authorization: "Bearer " + this.$store.state.token,
          "Content-Type": "multipart/form-data",
        },
        params: queryParams,
      }).then((result) => {
        this.totalPendingGrievance = result?.data?.data;
      });
    },
    fetchNextLevel(parentId, currentType) {
      let nextType;
      if (currentType === 'division') {
        nextType = 'district';
      } else if (currentType === 'district') {
        nextType = 'thana';
      } else {
        return; // No further levels
      }
      this.getLocationoWiseNumberOfGrievance(parentId, nextType);
    },

    async getLocationoWiseNumberOfGrievance(parentId =null, type = null) {
      const queryParams = {
        status: 'location',
        parent_id: parentId,
        type: type,
        breadcrumb: parentId,
      };
      console.log(queryParams,'queryParamsqueryParams');
      this.$axios.get("/admin/grievance-dashboard/location-wise-grievance", {
        headers: {
          Authorization: "Bearer " + this.$store.state.token,
          "Content-Type": "multipart/form-data",
        },
        params: queryParams,
      }).then((result) => {
        this.locationWisegrievacne = result?.data?.data;
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
    this.getLocationoWiseNumberOfGrievance();
  },

}
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