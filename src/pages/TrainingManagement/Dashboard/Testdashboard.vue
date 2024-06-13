<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <!-- Date Range Picker -->
        <v-row class="mb-4">
          <v-col cols="12">
            <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    v-model="dates"
                    append-icon="mdi-calendar"
                    label="Enter Start & End Date"
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
                  @input="fetchData"
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="resetDateRange">Reset</v-btn>
                <v-btn text color="primary" @click="$refs.menu.save(dates)">OK</v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
        <!-- Horizontal Bar Chart -->
        <v-row>
          <v-col cols="12">
            <canvas id="horizontal-bar-chart"></canvas>
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
      menu: false,
      dates: [],
      chartData: [],
      chartLabels: [],
      chartInstance: null,
    };
  },
  methods: {
    resetDateRange() {
      this.dates = [];
      this.menu = false;
      this.fetchData();
    },
    fetchData() {
      // Example demo data
      const data = [
        {name: "Cancelled", value: 2},
        {name: "Completed", value: 11},
        {name: "In Progress", value: 2},
        {name: "Not Started", value: 6}
      ];

      this.chartLabels = data.map(item => item.name);
      this.chartData = data.map(item => item.value);

      this.createChart();
    },
    createChart() {
      const ctx = document.getElementById("horizontal-bar-chart");

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
          indexAxis: 'y', // This is the key setting for a horizontal bar chart
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
                display: true,
                text: 'Status',
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
                  if (context.parsed.x !== null) {
                    label += context.parsed.x;
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
#horizontal-bar-chart {
  width: 100%;
  height: 400px;
}

.v-menu__content {
  max-width: 300px;
}
</style>
