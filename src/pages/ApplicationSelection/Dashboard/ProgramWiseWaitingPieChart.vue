<template>
  <v-col>
  <v-row>
    <v-col cols="12">
      <label style="color: #1976d2">
                      <span>
                        {{ $t("Program Wise Number of Waiting Applicant") }}
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
          @input="OnChangeDateInfo($event,'total_waiting')"
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
    <canvas id="programwise_application_waiting"></canvas>
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
      programwise_application_waiting_chart: null,
      programwise_application_waiting_info: [],
      programwise_application_waiting_levels: [],
      programwise_application_waiting_datas: [],
      isLoading: false,
      dateRangeText: ""
    };
  },
  methods: {
    resetDateRange() {
      this.dates = [];
      this.menu = false;
      this.fetchProgramwiseWaitingApplicationChartData()
    },
    async fetchProgramwiseWaitingApplicationChartData(from_date = null, to_date = null) {
      await this.getProgramwiseWaitingApplication(3, from_date, to_date);
      this.createProgramwiseWaitingApplicentChart();
    },
    async getProgramwiseWaitingApplication(status, from_date = null, to_date = null) {
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
        this.programwise_application_waiting_info = result.data.data;
        this.programwise_application_waiting_levels = this.programwise_application_waiting_info.map((row) => row.name_en);
        this.programwise_application_waiting_datas = this.programwise_application_waiting_info.map((row) => row.applications_count);
        this.isLoading = false;

      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error if necessary
      }
    },
    createProgramwiseWaitingApplicentChart() {
      if (this.programwise_application_waiting_chart) {
        this.programwise_application_waiting_chart.destroy();
      }

      if (this.programwise_application_waiting_levels && this.programwise_application_waiting_datas) {
        this.programwise_application_waiting_chart = new Chart(document.getElementById("programwise_application_waiting"), {
          type: "pie",
          data: {
            labels: this.programwise_application_waiting_levels,
            percentage: 0.5,
            datasets: [
              {
                label: "Values",
                data: this.programwise_application_waiting_datas,
                backgroundColor: ["Purple", "Red", "Green", "Blue", "Yellow"],
                hoverOffset: 4,
              },
            ],
          },
          options: {
            plugins: {
              legend: {
                display: true,
                position: "right",
                align: "center",
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
      this.fetchProgramwiseWaitingApplicationChartData(from_date, to_date);
    },
  },

  mounted() {
    this.fetchProgramwiseWaitingApplicationChartData();
  }
}
</script>
