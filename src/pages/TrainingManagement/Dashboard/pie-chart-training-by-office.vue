<template>
  <v-col>
    <v-row>
      <v-col cols="12">
        <v-card style="text-align: center" :loading="isLoading">
          <label style="color: #1976d2">
            <span>{{ 'Training by Office' }}</span>
          </label>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="8">
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
              @input="OnChangeDateInfo($event, 'total_received')"
          >
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="resetDateRange">
              {{ $t('Reset') }}
            </v-btn>
            <v-btn text color="primary" @click="$refs.menu.save(dates)">
              {{ $t('OK') }}
            </v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="4">
        <v-select
            :label="$t('Expire Type')"
            :items="expireTypes"
            v-model="expireType"
            item-text="name"
            item-value="id"
            clearable
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <canvas id="pie-chart-training-status"></canvas>
    </v-row>
  </v-col>
</template>

<script>
import { Pie } from "vue-chartjs";
import { Chart as ChartJS, PieController, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(PieController, ArcElement, Tooltip, Legend);

export default {
  components: {
    Pie
  },
  data() {
    return {
      menu: false,
      dates: [],
      expireType: null,
      chartInstance: null,
      chartData: [],
      chartLabels: [],
      expireTypes: [
        { id: 1, name: 'Expire Type 1' },
        { id: 2, name: 'Expire Type 2' },
      ],
      trainingData: [
        { name: "USSO 1", value: 4.55 },
        { name: "DSSO", value: 34.55 },
        { name: "UCDO 1", value: 9.09 },
        { name: "DPO", value: 8.07 },
        { name: "USSO 2", value: 6.06 },
        { name: "UCDO 2", value: 6.06 },
        { name: "UCDO 7", value: 31.82 },
      ]
    };
  },
  methods: {
    resetDateRange() {
      this.dates = [];
      this.menu = false;
      this.fetchData();
    },
    fetchData() {
      this.chartLabels = this.trainingData.map(item => item.name);
      this.chartData = this.trainingData.map(item => item.value);

      this.createChart();
    },
    generateRandomColor() {
      return '#' + Math.floor(Math.random() * 16777215).toString(16);
    },
    createChart() {
      const ctx = document.getElementById("pie-chart-training-status");

      if (this.chartInstance) {
        this.chartInstance.destroy();
      }

      this.chartInstance = new ChartJS(ctx, {
        type: "pie",
        data: {
          labels: this.chartLabels,
          datasets: [
            {
              label: "Training by Office",
              data: this.chartData,
              backgroundColor: this.chartData.map(() => this.generateRandomColor()),
              // borderColor: this.chartData.map(() => this.generateRandomColor()),
              borderWidth: 1,
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                usePointStyle: true,
              }
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  let label = context.label || '';
                  if (label) {
                    label += ': ';
                  }
                  if (context.raw !== null) {
                    label += context.raw + '%';
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
#pie-chart-training-status {
  width: 100%;
  height: 400px;
}

.v-menu__content {
  max-width: 300px;
}
</style>
