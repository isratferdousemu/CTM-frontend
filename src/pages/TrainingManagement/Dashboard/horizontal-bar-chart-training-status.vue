<template>
  <v-col>
    <v-row>
      <v-col cols="12">
        <v-card style="text-align: center" :loading="isLoading">
          <label style="color: #1976d2">
            <span>{{ $t('container.training_management.dashboard.training_status.title') }}</span>
          </label>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="7">
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
                v-model="dateRange"
                :append-icon="menu ? 'mdi-calendar' : 'mdi-calendar'"
                :label="$t('container.system_config_dashboard.enter_start_end_date')"
                readonly
                v-bind="attrs"
                v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
              v-model="dateRange"
              :range="true"
              no-title
              scrollable
              @input="fetchData"
          >
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="resetDateRange">
              {{ $t('container.list.reset')}}
            </v-btn>
            <v-btn
                text
                color="primary"
                @click="$refs.menu.save(dateRange)"
            >
              {{ $t('container.list.ok')}}
            </v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="5">
        <v-select
            :label="$t('container.training_management.dashboard.training_status.module')"
            :items="moduleList"
            v-model="selectedModule"
            item-text="name_en"
            item-value="id"
            clearable
            @change="fetchData"
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <canvas id="horizontal-bar-chart-training-status"></canvas>
    </v-row>
  </v-col>
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
      dateRange: [],
      chartData: [],
      chartLabels: [],
      chartInstance: null,
      selectedModule: null,
      moduleList: [
        { id: 1, name_en: 'Module 1', name_bn: 'মডিউল ১' },
        { id: 2, name_en: 'Module 2', name_bn: 'মডিউল ২' }
      ],
    };
  },
  methods: {
    resetDateRange() {
      this.dateRange = [];
      this.menu = false;
      this.fetchData();
    },
    generateRandomColor() {
      return '#' + Math.floor(Math.random() * 16777215).toString(16);
    },
    fetchData() {
      // Example data, replace with actual fetch logic
      const data = [
        { name: this.$t('cancelled'), value: 2 },
        { name: this.$t('completed'), value: 11 },
        { name: this.$t('in_progress'), value: 2 },
        { name: this.$t('not_started'), value: 6 },
      ];

      this.chartLabels = data.map(item => item.name);
      const total = data.reduce((sum, item) => sum + item.value, 0);
      this.chartData = data.map(item => ({
        name: item.name,
        value: item.value,
        percentage: ((item.value / total) * 100).toFixed(2) + '%'
      }));

      this.createChart();
    },
    createChart() {
      const ctx = document.getElementById("horizontal-bar-chart-training-status").getContext('2d');

      if (this.chartInstance) {
        this.chartInstance.destroy();
      }

      this.chartInstance = new ChartJS(ctx, {
        type: "bar",
        data: {
          labels: this.chartLabels,
          datasets: [
            {
              label: this.$t('container.training_management.dashboard.training_status.total'),
              data: this.chartData.map(item => item.value),
              backgroundColor: this.chartData.map(() => this.generateRandomColor()),
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
                text: this.$t('container.training_management.dashboard.training_status.total'),
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
                label: (context) => {
                  let label = `${context.dataset.label}: ${context.raw}`;
                  const percentage = this.chartData[context.dataIndex].percentage;
                  return `${label} (${percentage})`;
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
#horizontal-bar-chart-training-status {
  width: 100%;
  height: 400px;
}

.v-menu__content {
  max-width: 300px;
}
</style>

