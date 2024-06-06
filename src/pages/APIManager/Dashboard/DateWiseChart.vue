<template>
  <v-col>
    <v-row>
      <v-col cols="12">
        <label style="color: #1976d2">
          <span>
            {{ $t("container.api_manager.dashboard.number_of_api_request") }}

          </span>
        </label></v-col>
    </v-row>
    <v-row class="ml-1 mr-1">
      <v-menu ref="menu" v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y
        min-width="auto">
        <template v-slot:activator="{ on, attrs }">
          <v-text-field v-model="dates" :append-icon="menu ? 'mdi-calendar' : 'mdi-calendar'"
            :label="$t('container.application_selection_dashboard.enter_start_end_date')" readonly v-bind="attrs"
            v-on="on"></v-text-field>
        </template>
        <v-date-picker v-model="dates" :range="[dates[0], dates[1]]" no-title scrollable
          @input="OnChangeDateInfo($event,'total_received')">
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="resetDateRange">
            {{$t('container.list.reset')}}
          </v-btn>
          <v-btn text color="primary" @click="$refs.menu.save(dates)">
            {{ $t('container.list.ok') }}
          </v-btn>
        </v-date-picker>
      </v-menu>
    </v-row>
    <v-row>
      <canvas id="total_number_of_application_received_line_bar_info"></canvas>
    </v-row>
  </v-col>

</template>

<script>
import Chart from "chart.js/auto";
export default {
  data() {
    return {
      // Define data properties here
      dates: [],
      dateRangeText: "",
      menu: false,
      total_number_of_application_received_line_bar_chart: null,
      total_number_of_application_received_line_bar_info: [],
      total_number_of_application_received_line_bar_levels: [],
      total_number_of_application_received_line_bar_datas: [],
      isLoading: false,

    };
  },
  methods: {
    resetDateRange() {
      this.dates = [];
      this.menu = false;
      this.fetchTotalReceivedLineBarApplicationChartData()
    },
    async fetchTotalReceivedLineBarApplicationChartData(from_date = null, to_date = null) {
      await this.getTotalReceivedLineBarApplication(2, from_date, to_date);
      this.createTotalReceivedLineBarApplicentChart();
    },
    async getTotalReceivedLineBarApplication(status, from_date = null, to_date = null) {
      const queryParams = {
        status: status,
        start_date: from_date,
        end_date: to_date,
      };
      try {
        const result = await this.$axios.get("/admin/api-manager/dashboard/date-wise-count", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
          params: queryParams,
        });

        this.total_number_of_application_received_line_bar_info = result.data.data;
        this.total_number_of_application_received_line_bar_levels = this.total_number_of_application_received_line_bar_info.map((row) => row.request_date);
        this.total_number_of_application_received_line_bar_datas = this.total_number_of_application_received_line_bar_info.map((row) => row.total);
        this.isLoading = false;

      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error if necessary
      }
    },
    createTotalReceivedLineBarApplicentChart() {
      if (this.total_number_of_application_received_line_bar_chart) {
        this.total_number_of_application_received_line_bar_chart.destroy();
      }

      if (this.total_number_of_application_received_line_bar_levels && this.total_number_of_application_received_line_bar_datas) {
        this.total_number_of_application_received_line_bar_chart = new Chart(document.getElementById("total_number_of_application_received_line_bar_info"), {
          data: {
            labels:this.total_number_of_application_received_line_bar_levels,
            datasets: [
              {
                type: "line",
                label: "",
                data: this.total_number_of_application_received_line_bar_datas,
                fill: false,
                tension: 0.4,
                
              },
              
            ],
            
          },
    

        });
      } else {
        console.error("Data is not available to create chart.");
      }
    },
    OnChangeDateInfo(event, type) {
      if (this.dates.length < 2) {
        return;
      }
      if (this.dates[1] && this.dates[1] < this.dates[0]) {
        this.$toast.error(this.language == 'en' ? 'End date cannot be before start date' : 'শেষ তারিখ শুরুর তারিখের আগে হতে পারে না')
        this.resetDateRange();
      }
      let from_date = null;
      let to_date = null;

      if (event.length === 2) {
        from_date = event[0];
        to_date = event[1];
      }
      this.fetchTotalReceivedLineBarApplicationChartData(from_date, to_date);
    },
  },

  computed:{
    language: {
      get() {
        return this.$store.getters.getAppLanguage;
      }
    },
  },

  mounted() {
    this.fetchTotalReceivedLineBarApplicationChartData();
  }
}
</script>
