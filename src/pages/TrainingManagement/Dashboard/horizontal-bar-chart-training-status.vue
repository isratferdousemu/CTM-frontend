<template>
  <v-col>
    <v-row>
      <v-col cols="12">
        <v-card style="text-align: center" :loading="isLoading">
          <label style="color: #1976d2">
                      <span>
                        {{ $t('container.training_management.dashboard.training_status.title') }}
                      </span>
          </label>
        </v-card>
      </v-col
      >
    </v-row>
    <v-row>
      <v-col cols="5">
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
              :label="$t('container.system_config_dashboard.enter_start_end_date')"
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
            {{ $t('container.list.reset')}}
          </v-btn>
          <v-btn
              text
              color="primary"
              @click="$refs.menu.save(dates)"
          >
            {{ $t('container.list.ok')}}
          </v-btn>
        </v-date-picker>
      </v-menu>
      </v-col>
      <v-col cols="4">
          <v-select
              :label="$t('container.training_management.dashboard.training_status.location')"
              :items="this.locationList"
              v-model="location"
              item-text="name_en"
              item-value="id"
              clearable
          ></v-select>
      </v-col>
      <v-col cols="3">
        <v-select
            :label="$t('container.training_management.dashboard.training_status.module')"
            :items="this.moduleList"
            v-model="module"
            item-text="name_en"
            item-value="id" clearable
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
      dates: [],
      chartData: [],
      chartLabels: [],
      chartInstance: null,
      module:null,
      location:null,
      moduleList: [
          {
            id: 1,
            name_en: 'Module1',
            name_bn: 'Module1'
          },
        {
          id: 2,
          name_en: 'Module2en',
          name_bn: 'Module2bn'
        }
      ],
      locationList: [
        {
          id: 1,
          name_en: 'Location1',
          name_bn: 'Location1'
        },
        {
          id: 2,
          name_en: 'location2',
          name_bn: 'location2'
        }
      ],
    };
  },
  methods: {
    resetDateRange() {
      this.dates = [];
      this.menu = false;
      this.fetchData();
    },
    generateRandomColor() {
      return '#' + Math.floor(Math.random() * 16777215).toString(16);
    },
    fetchData() {
      // Example demo data
      const data = [
        {name: "Cancelled", value: 2},
        {name: "Completed", value: 11},
        {name: "In Progress", value: 2},
        {name: "Not Started", value: 6},
      ];

      this.chartLabels = data.map(item => item.name);
      this.chartData = data.map(item => item.value);

      this.createChart();
    },
    createChart() {
      const ctx = document.getElementById("horizontal-bar-chart-training-status");

      if (this.chartInstance) {
        this.chartInstance.destroy();
      }

      this.chartInstance = new ChartJS(ctx, {
        type: "bar",
        data: {
          labels: this.chartLabels,
          datasets: [
            {
              label: "Total-",
              data: this.chartData,
              backgroundColor: this.chartData.map(() => this.generateRandomColor()),
              // borderColor: "#72A0C1",
              // borderWidth: 8,
              // borderRadius: 5
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
                text: 'Training Status',
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
                display: false,
                text: 'Training Status',
                font: {
                  size: 12
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
#horizontal-bar-chart-training-status {
  width: 100%;
  height: 400px;
}

.v-menu__content {
  max-width: 300px;
}
</style>
