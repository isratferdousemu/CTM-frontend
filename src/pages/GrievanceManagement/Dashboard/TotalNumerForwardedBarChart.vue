<template>
  <v-col>
  <v-row>
    <v-col cols="12">
      <label style="color: #1976d2">
                      <span>
                        {{ $t("container.application_selection_dashboard.number_of_application_forwarded") }}
                      </span>
      </label></v-col
    >
  </v-row>
  <v-row class="ml-1 mr-1">
    <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
            v-model="dates"
            :append-icon="menu ? 'mdi-calendar' : 'mdi-calendar'"
            :label="$t('container.application_selection_dashboard.enter_start_end_date')"
            readonly
            v-bind="attrs"
            v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
          v-model="dates"
          :range="[dates[0], dates[1]]"
          no-title
          scrollable
          @input="OnChangeDateInfo($event,'total_received')"
      >
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="resetDateRange">
          Cancel
        </v-btn>
        <v-btn
            text
            color="primary"
            @click="$refs.menu.save(dates)"
        >
          OK
        </v-btn>
      </v-date-picker>
    </v-menu>
  </v-row>
  <v-row>
    <canvas id="total_number_of_application_forwarded_bar_info"></canvas>
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
      menu: false,
      total_number_of_application_forwarded_bar_chart: null,
      total_number_of_application_forwarded_bar_info: [],
      total_number_of_application_forwarded_bar_levels: [],
      total_number_of_application_forwarded_bar_datas: [],
      isLoading: false,
      dateRangeText: ""
    };
  },
  methods: {
    resetDateRange() {
      this.dates = [];
      this.menu = false;
      this.fetchTotalForwardedBarApplicationChartData()
    },
    async fetchTotalForwardedBarApplicationChartData(from_date = null, to_date = null) {
      await this.getTotalForwardedBarApplication(2, from_date, to_date);
      this.createTotalForwardedBarApplicentChart();
    },
    async getTotalForwardedBarApplication(status, from_date = null, to_date = null) {
      const queryParams = {
        status: status,
        start_date: from_date,
        end_date: to_date,
      };
      try {
        const result = await this.$axios.get("/admin/application-dashboard/get-total-received-application", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
          params: queryParams,
        });

        this.total_number_of_application_forwarded_bar_info = result.data.data;
        this.total_number_of_application_forwarded_bar_levels = this.total_number_of_application_forwarded_bar_info.map((row) => row.name_en.substring(0,10));
        this.total_number_of_application_forwarded_bar_datas = this.total_number_of_application_forwarded_bar_info.map((row) => row.applications_count);
        this.isLoading = false;

      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error if necessary
      }
    },
    createTotalForwardedBarApplicentChart() {
      if (this.total_number_of_application_forwarded_bar_chart) {
        this.total_number_of_application_forwarded_bar_chart.destroy();
      }

      if (this.total_number_of_application_forwarded_bar_levels && this.total_number_of_application_forwarded_bar_datas) {
        this.total_number_of_application_forwarded_bar_chart = new Chart(document.getElementById("total_number_of_application_forwarded_bar_info"), {
          type: "bar",
          data: {
            labels: this.total_number_of_application_forwarded_bar_levels,
            datasets: [
              {
                barPercentage: 0.5,
                barThickness: 16,
                maxBarThickness: 18,
                minBarLength: 12,
                label: "Number of Application Forwarded",
                data: this.total_number_of_application_forwarded_bar_datas,
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                  "rgba(255, 205, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(201, 203, 207, 0.2)",
                ],
                borderColor: [
                  "rgb(255, 99, 132)",
                  "rgb(255, 159, 64)",
                  "rgb(255, 205, 86)",
                  "rgb(75, 192, 192)",
                  "rgb(54, 162, 235)",
                  "rgb(153, 102, 255)",
                  "rgb(201, 203, 207)",
                ],
                borderWidth: 1,
              },
            ],
          },
          options: {
            plugins: {
              legend: {
                display: true,
                labels: {
                  color: "rgb(255, 99, 132)",
                },
              },
            },
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
      let from_date = null;
      let to_date = null;

      if (event.length === 2) {
        from_date = event[0];
        to_date = event[1];
      }
      this.fetchTotalForwardedBarApplicationChartData(from_date, to_date);
    },
  },

  mounted() {
    this.fetchTotalForwardedBarApplicationChartData();
  }
}
</script>
