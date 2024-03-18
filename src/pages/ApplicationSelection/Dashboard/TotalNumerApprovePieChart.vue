<template>
  <v-col>
  <v-row>
    <v-col cols="12">
      <label style="color: #1976d2">
                      <span>
                        {{ $t("container.application_selection_dashboard.program_wise_number_of_application_approve") }}
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
          @input="OnChangeDateInfo($event,'total_approve')"
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
    <canvas id="programwise_application_approval"></canvas>
  </v-row>
  </v-col>

</template>

<script>
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
Chart.register(ChartDataLabels);
export default {
  data() {
    return {
      // Define data properties here
      dates: [],
      menu: false,
      programwise_application_approve_chart: null,
      programwise_application_approve_info: [],
      programwise_application_approve_levels: [],
      programwise_application_approve_datas: [],
      isLoading: false,
      dateRangeText: ""
    };
  },
  methods: {
    resetDateRange() {
      this.dates = [];
      this.menu = false;
      this.fetchProgramwiseApproveApplicationChartData()
    },
    async fetchProgramwiseApproveApplicationChartData(from_date = null, to_date = null) {
      await this.getProgramwiseApproveApplication(2, from_date, to_date);
      this.createProgramwiseApproveApplicentChart();
    },
    async getProgramwiseApproveApplication(status, from_date = null, to_date = null) {
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

        this.programwise_application_approve_info = result.data.data;
        this.programwise_application_approve_levels = this.programwise_application_approve_info.map((row) => this.$i18n.locale == 'en' ? row.name_en : row.name_bn);
        this.programwise_application_approve_datas = this.programwise_application_approve_info.map((row) => row.applications_count);
        this.isLoading = false;

      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error if necessary
      }
    },
    createProgramwiseApproveApplicentChart() {
      if (this.programwise_application_approve_chart) {
        this.programwise_application_approve_chart.destroy();
      }
      if (this.programwise_application_approve_levels && this.programwise_application_approve_datas) {
        const total = this.programwise_application_approve_datas.reduce((acc, value) => acc + value, 0);
        // const percentages = this.programwise_application_approve_datas.map(value => ((value / total) * 100).toFixed(2) + '%');

        const percentages = this.programwise_application_approve_datas.map(value => {
          const percentage = ((value / total) * 100).toFixed(2);
          return isNaN(percentage) ? '0.00%' : percentage + '%';
        });

        this.programwise_application_approve_chart = new Chart(document.getElementById("programwise_application_approval"), {
          type: "pie",
          data: {
            // labels: this.programwise_application_approve_levels,
            // labels: this.programwise_application_approve_levels.map((label, index) => `${label} (${percentages[index]})`),
            labels: this.programwise_application_approve_levels.map((label, index) => `${label} (${this.$i18n.locale == 'en' ? this.programwise_application_approve_datas[index] : this.$helpers.englishToBangla(this.programwise_application_approve_datas[index])} - ${this.$i18n.locale == 'en' ? percentages[index]  : this.$helpers.englishToBangla(percentages[index])})`),
            percentages:percentages,
            datasets: [
              {
                label: "Values",
                data: this.programwise_application_approve_datas,
                backgroundColor: this.programwise_application_approve_datas.map(() => this.generateRandomColor()),
                // backgroundColor: ["Green", "Red", "blue", "Purple", "Yellow"],
                hoverOffset: 4,
              },
            ],
          },
          options: {
            plugins: {
              legend: {
                display: true,
                position: "bottom",
                align: "start",
              },
              datalabels: {
                color: '#fff',
                fontWeight: 'bold',
                formatter: (value, context) => {
                  const percentage = context.chart.data.percentages[context.dataIndex];
                  const truncatedPercentage = parseFloat(percentage).toFixed(0);
                  if (truncatedPercentage == '0') {
                    return '';
                  }
                  if (value == '0') {
                    return '';
                  }
                  return `${this.$i18n.locale == 'en' ? value : this.$helpers.englishToBangla(value)} , ${this.$i18n.locale == 'en' ? truncatedPercentage : this.$helpers.englishToBangla(truncatedPercentage)}%`;
                }
              }
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
        document.getElementById("programwise_application_approval").style.width = '400px';
        document.getElementById("programwise_application_approval").style.height = '435px';
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
      this.fetchProgramwiseApproveApplicationChartData(from_date, to_date);
    },
  },

  mounted() {
    this.fetchProgramwiseApproveApplicationChartData();
  },
  watch: {
    '$i18n.locale': {
      handler(newLocale, oldLocale) {
        if (newLocale != oldLocale) {
          this.fetchProgramwiseApproveApplicationChartData();
        }
      },
      immediate: true // Call the handler immediately to initialize the levels
    }
  },
}
</script>
