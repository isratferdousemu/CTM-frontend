<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <!-- Filter Dropdowns -->
        <v-row class="mb-4">
          <v-col cols="12" md="4">
            <v-select
                v-model="selectedFilter"
                :items="filters"
                label="Filter By"
                outlined
                dense
                @change="updateChart"
            ></v-select>
          </v-col>
          <v-col cols="12" md="4" v-if="selectedFilter === 'Year'">
            <v-select
                v-model="selectedYear"
                :items="years"
                label="Year"
                outlined
                dense
                @change="updateChart"
            ></v-select>
          </v-col>
          <v-col cols="12" md="4" v-if="selectedFilter === 'Month'">
            <v-select
                v-model="selectedMonth"
                :items="months"
                label="Month"
                outlined
                dense
                @change="updateChart"
            ></v-select>
          </v-col>
          <v-col cols="12" md="4" v-if="selectedFilter === 'Day'">
            <v-text-field
                v-model="selectedDay"
                label="Day (e.g., 2023-06-15)"
                outlined
                dense
                type="date"
                @change="updateChart"
            ></v-text-field>
          </v-col>
        </v-row>
        <!-- Bar Chart -->
        <v-row>
          <v-col cols="12">
            <canvas id="dynamic-bar-chart"></canvas>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { Bar } from "vue-chartjs";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

export default {
  components: {
    Bar
  },
  data() {
    return {
      selectedFilter: 'Month',
      selectedYear: new Date().getFullYear().toString(),
      selectedMonth: this.formatMonth(new Date().getMonth() + 1),
      selectedDay: this.formatDate(new Date()),
      chartData: [],
      chartLabels: [],
      chartInstance: null,
      filters: ['Day', 'Month', 'Year'],
      years: this.generateYears(),
      months: this.generateMonths(),
    };
  },
  methods: {
    generateYears() {
      const currentYear = new Date().getFullYear();
      return Array.from({ length: 5 }, (_, i) => (currentYear - i).toString());
    },
    generateMonths() {
      return [
        { text: 'January', value: '01' },
        { text: 'February', value: '02' },
        { text: 'March', value: '03' },
        { text: 'April', value: '04' },
        { text: 'May', value: '05' },
        { text: 'June', value: '06' },
        { text: 'July', value: '07' },
        { text: 'August', value: '08' },
        { text: 'September', value: '09' },
        { text: 'October', value: '10' },
        { text: 'November', value: '11' },
        { text: 'December', value: '12' },
      ];
    },
    formatMonth(month) {
      return month < 10 ? `0${month}` : `${month}`;
    },
    formatDate(date) {
      return date.toISOString().split('T')[0];
    },
    updateChart() {
      // Use demo data or replace with API call for real data
      if (this.selectedFilter === 'Year') {
        this.fetchYearlyData();
      } else if (this.selectedFilter === 'Month') {
        this.fetchMonthlyData();
      } else {
        this.fetchDailyData();
      }
    },
    fetchYearlyData() {
      const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        values: [50, 80, 40, 70, 50, 65, 55, 80, 50, 60, 50, 70]
      };
      this.chartLabels = data.labels;
      this.chartData = data.values;
      this.createChart();
    },
    fetchMonthlyData() {
      const data = {
        labels: Array.from({ length: 31 }, (_, i) => (i + 1).toString()),
        values: Array.from({ length: 31 }, () => Math.floor(Math.random() * 100))
      };
      this.chartLabels = data.labels;
      this.chartData = data.values;
      this.createChart();
    },
    fetchDailyData() {
      const data = {
        labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
        values: Array.from({ length: 24 }, () => Math.floor(Math.random() * 100))
      };
      this.chartLabels = data.labels;
      this.chartData = data.values;
      this.createChart();
    },
    createChart() {
      const ctx = document.getElementById("dynamic-bar-chart");

      if (this.chartInstance) {
        this.chartInstance.destroy();
      }

      this.chartInstance = new ChartJS(ctx, {
        type: "bar",
        data: {
          labels: this.chartLabels,
          datasets: [{
            label: "Participants",
            data: this.chartData,
            backgroundColor: "#72A0C1",
            borderColor: "#72A0C1",
            borderWidth: 1,
            borderRadius: 5
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Category',
                font: {
                  size: 16
                }
              }
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Count',
                font: {
                  size: 16
                }
              }
            }
          },
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              enabled: true,
              callbacks: {
                label: function (context) {
                  let label = context.dataset.label || '';
                  if (label) {
                    label += ': ';
                  }
                  if (context.parsed.y !== null) {
                    label += context.parsed.y;
                  }
                  return label;
                }
              }
            }
          }
        }
      });
    }
  },
  mounted() {
    this.updateChart();
  }
};
</script>

<style scoped>
#dynamic-bar-chart {
  width: 100%;
  height: 400px;
}

.v-select {
  width: 100%;
}
</style>
