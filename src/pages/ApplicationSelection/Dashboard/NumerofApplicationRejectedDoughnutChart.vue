<template>
  <v-col>
  <v-row>
    <v-col cols="12">
      <label style="color: #1976d2">
                      <span>
                        {{ $t("Number of Application Rejected") }}
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
            :label="$t('Enter Start & End Date')"
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
    <canvas id="total_number_of_application_rejected_info"></canvas>
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
      total_number_of_application_rejected_chart: null,
      total_number_of_application_rejected_info: [],
      total_number_of_application_rejected_levels: [],
      total_number_of_application_rejected_datas: [],
      isLoading: false,
      dateRangeText: ""
    };
  },
  methods: {
    resetDateRange() {
      this.dates = [];
      this.menu = false;
      this.fetchTotalRejectedApplicationChartData()
    },
    async fetchTotalRejectedApplicationChartData(from_date = null, to_date = null) {
      await this.getTotalRejectedApplication(4, from_date, to_date);
      this.createTotalRejectedApplicentChart();
    },
    async getTotalRejectedApplication(status, from_date = null, to_date = null) {
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

        this.total_number_of_application_rejected_info = result.data.data;
        this.total_number_of_application_rejected_levels = this.total_number_of_application_rejected_info.map((row) => row.name_en);
        this.total_number_of_application_rejected_datas = this.total_number_of_application_rejected_info.map((row) => row.applications_count);
        this.isLoading = false;

      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error if necessary
      }
    },
    createTotalRejectedApplicentChart() {
      if (this.total_number_of_application_rejected_chart) {
        this.total_number_of_application_rejected_chart.destroy();
      }

      if (this.total_number_of_application_rejected_levels && this.total_number_of_application_rejected_datas) {
        const total = this.total_number_of_application_rejected_datas.reduce((acc, value) => acc + value, 0);
        const percentages = this.total_number_of_application_rejected_datas.map(value => ((value / total) * 100).toFixed(2) + '%');

        this.total_number_of_application_rejected_chart = new Chart(document.getElementById("total_number_of_application_rejected_info"), {
          type: "doughnut",
          data: {
            // labels: this.total_number_of_application_rejected_levels,
            labels: this.total_number_of_application_rejected_levels.map((label, index) => `${label} (${percentages[index]})`),
            datasets: [{
              label: "Count",
              data: this.total_number_of_application_rejected_datas,
              backgroundColor: this.total_number_of_application_rejected_datas.map(() => this.generateRandomColor()),
              // backgroundColor: ["Red", "Green", "blue", "Purple", "Yellow"],
              fill: false,
              tension: 0.1,
            }],
          },
          options: {
            plugins: {
              legend: {
                display: true,
                position: "bottom",
                align: "start",
              },
            },
            layout: {
              padding: {
                left: 20,
                right: 20,
                top: 0,
                bottom: 20
              }
            },
            responsive: true,
            maintainAspectRatio: false,
            aspectRatio: 1, // Aspect ratio of 1 w
          },
        });
        document.getElementById("total_number_of_application_rejected_info").style.width = '400px';
        document.getElementById("total_number_of_application_rejected_info").style.height = '435px';
      } else {
        console.error("Data is not available to create chart.");
      }
    },
    generateRandomColor() {
      return '#' + Math.floor(Math.random() * 16777215).toString(16);
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
      this.fetchTotalRejectedApplicationChartData(from_date, to_date);
    },
  },

  mounted() {
    this.fetchTotalRejectedApplicationChartData();
  }
}
</script>
