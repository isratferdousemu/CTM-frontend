<template>
  <v-col>
    <v-row>
      <v-col cols="12">
        <v-card style="text-align: center" :loading="isLoading">
          <label style="color: #1976d2">
            <span>{{ $t('container.training_management.dashboard.month_wise_no_participants.title') }}</span>
          </label>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <v-select
            :items="timeFilters"
            v-model="selectedFilter"
            item-text="name"
            item-value="value"
            @change="changeFilter"
            clearable
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <canvas id="bar-chart-participants"></canvas>
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
      chartInstance: null,
      chartData: [],
      chartLabels: [],
      selectedFilter: 'month',
      chartTitle: 'Month-wise No of Participants',
      timeFilters: [
        { name: 'Day', value: 'day' },
        { name: 'Month', value: 'month' },
        { name: 'Year', value: 'year' }
      ],
      participantsData: {
        day: [
          { label: '01', value: 15 },
          { label: '02', value: 18 },
          { label: '03', value: 20 },
          { label: '04', value: 22 },
          { label: '05', value: 16 },
          { label: '06', value: 14 },
          { label: '07', value: 19 },
          { label: '08', value: 21 },
          { label: '09', value: 23 },
          { label: '10', value: 25 },
          { label: '11', value: 27 },
          { label: '12', value: 30 },
          { label: '13', value: 33 },
          { label: '14', value: 28 },
          { label: '15', value: 32 },
          { label: '16', value: 26 },
          { label: '17', value: 24 },
          { label: '18', value: 20 },
          { label: '19', value: 22 },
          { label: '20', value: 23 },
          { label: '21', value: 25 },
          { label: '22', value: 27 },
          { label: '23', value: 29 },
          { label: '24', value: 28 },
          { label: '25', value: 26 },
          { label: '26', value: 24 },
          { label: '27', value: 22 },
          { label: '28', value: 21 },
          { label: '29', value: 23 },
          { label: '30', value: 25 },
          { label: '31', value: 27 }
        ],
        month: [
          { label: 'Jan', value: 50 },
          { label: 'Feb', value: 80 },
          { label: 'Mar', value: 40 },
          { label: 'Apr', value: 57 },
          { label: 'May', value: 50 },
          { label: 'Jun', value: 70 },
          { label: 'Jul', value: 57 },
          { label: 'Aug', value: 65 },
          { label: 'Sep', value: 55 },
          { label: 'Oct', value: 80 },
          { label: 'Nov', value: 50 },
          { label: 'Dec', value: 60 }
        ],
        year: [
          { label: '2020', value: 600 },
          { label: '2021', value: 720 },
          { label: '2022', value: 750 },
          { label: '2023', value: 680 }
        ]
      }
    };
  },
  methods: {
    changeFilter() {
      this.fetchData();
      this.updateChartTitle();
    },
    updateChartTitle() {
      if (this.selectedFilter === 'day') {
        this.chartTitle = 'Day-wise No of Participants';
      } else if (this.selectedFilter === 'month') {
        this.chartTitle = 'Month-wise No of Participants';
      } else if (this.selectedFilter === 'year') {
        this.chartTitle = 'Year-wise No of Participants';
      }
    },
    fetchData() {
      const filterType = this.selectedFilter;
      const data = this.participantsData[filterType];
      this.chartLabels = data.map(item => item.label);
      this.chartData = data.map(item => item.value);

      this.createChart();
    },
    generateRandomColor() {
      return '#' + Math.floor(Math.random() * 16777215).toString(16);
    },
    createChart() {
      const ctx = document.getElementById("bar-chart-participants");

      if (this.chartInstance) {
        this.chartInstance.destroy();
      }

      this.chartInstance = new ChartJS(ctx, {
        type: "bar",
        data: {
          labels: this.chartLabels,
          datasets: [
            {
              label: "No of Participants",
              data: this.chartData,
              // backgroundColor: "#1976d2",
              backgroundColor: this.chartData.map(() => this.generateRandomColor()),
              // borderColor: "#1976d2",
              // borderWidth: 5
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Number of Participants',
                font: {
                  size: 16
                }
              }
            },
            x: {
              title: {
                display: true,
                text: this.selectedFilter === 'day' ? 'Days' : this.selectedFilter === 'year' ? 'Years' : 'Months',
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
#bar-chart-participants {
  width: 100%;
  height: 400px;
}
</style>


