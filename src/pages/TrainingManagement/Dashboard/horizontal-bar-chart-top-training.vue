<template>
  <v-col>
    <v-row>
      <v-col cols="12">
        <v-card style="text-align: center" :loading="isLoading">
          <label style="color: #1976d2">
            <span>{{ chartTitle }}</span>
          </label>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
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
              range
              no-title
              scrollable
              @input="onDateChange"
          >
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="resetDateRange">
              {{ $t('Reset') }}
            </v-btn>
            <v-btn text color="primary" @click="$refs.menu.save(dates)">
              {{ $t('Ok') }}
            </v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>
    </v-row>
    <v-row>
      <canvas id="horizontal-bar-chart-top-training"></canvas>
    </v-row>
  </v-col>
</template>

<script>
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

export default {
  components: {
    Bar
  },
  data() {
    return {
      menu: false,
      dates: [],
      chartInstance: null,
      chartData: [],
      chartLabels: [],
      chartTitle: 'Top Training',
      isLoading: false,
      trainingData: [
        { name: 'Application & Selection', value: 8 },
        { name: 'Payroll Management', value: 7 },
        { name: 'Beneficiary Management', value: 6 },
        { name: 'Emergency Payment', value: 5 },
        { name: 'Grievance Management', value: 4 },
        { name: 'M&E and Reporting', value: 3 },
        { name: 'Training Management', value: 2 },
      ]
    };
  },
  methods: {
    resetDateRange() {
      this.dates = [];
      this.menu = false;
      this.fetchData();
    },
    onDateChange() {
      this.fetchData();
    },
    fetchData() {
      // Simulate fetching data based on selected dates
      // In real application, you would call an API here and filter data based on the selected date range

      // Using static data for demonstration
      this.chartLabels = this.trainingData.map(item => item.name);
      this.chartData = this.trainingData.map(item => item.value);

      this.createChart();
    },
    createChart() {
      const ctx = document.getElementById("horizontal-bar-chart-top-training");

      if (this.chartInstance) {
        this.chartInstance.destroy();
      }

      this.chartInstance = new ChartJS(ctx, {
        type: "bar",
        data: {
          labels: this.chartLabels,
          datasets: [
            {
              label: "Count",
              data: this.chartData,
              backgroundColor: "#72A0C1",
              borderColor: "#72A0C1",
              borderWidth: 1,
              borderRadius: 5
            }
          ]
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Count',
                font: {
                  size: 16
                }
              },
              ticks: {
                stepSize: 1
              }
            },
            y: {
              beginAtZero: true,
              title: {
                display: false
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
                  if (context.raw !== null) {
                    label += context.raw;
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
    this.fetchData();
  }
};
</script>

<style scoped>
#horizontal-bar-chart-top-training {
  width: 100%;
  height: 400px;
}

.v-menu__content {
  max-width: 300px;
}
</style>


