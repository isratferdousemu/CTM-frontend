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
      <v-col cols="6">
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
                v-model="startDate"
                :append-icon="menu ? 'mdi-calendar' : 'mdi-calendar'"
                :label="$t('Enter Start Date')"
                readonly
                v-bind="attrs"
                v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
              v-model="startDate"
              no-title
              scrollable
              @input="onDateChange"
          >
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="resetDate">
              {{ $t('Reset') }}
            </v-btn>
            <v-btn text color="primary" @click="$refs.menu.save(startDate)">
              {{ $t('Ok') }}
            </v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="6">
        <v-select
            :label="$t('Select Program')"
            :items="programList"
            v-model="selectedProgram"
            item-text="name"
            item-value="id"
            clearable
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <canvas id="doughnut-chart-participants" width="400" height="400"></canvas>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
import { Doughnut } from "vue-chartjs";
import {
  Chart as ChartJS,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(DoughnutController, ArcElement, Tooltip, Legend);

export default {
  components: {
    Doughnut
  },
  data() {
    return {
      menu: false,
      startDate: '',
      selectedProgram: null,
      chartInstance: null,
      chartData: [],
      chartLabels: ['Online', 'Offline'],
      chartTitle: 'Participants by Mode',
      isLoading: false,
      programList: [
        { id: 1, name: 'Program A' },
        { id: 2, name: 'Program B' },
        { id: 3, name: 'Program C' }
      ],
      participantsData: {
        1: { online: 30, offline: 20 },
        2: { online: 40, offline: 60 },
        3: { online: 50, offline: 50 }
      }
    };
  },
  methods: {
    resetDate() {
      this.startDate = '';
      this.menu = false;
      this.fetchData();
    },
    onDateChange() {
      this.fetchData();
    },
    fetchData() {
      if (this.selectedProgram) {
        const data = this.participantsData[this.selectedProgram];
        this.chartData = [data.online, data.offline];
      } else {
        this.chartData = [5, 2];
      }

      this.createChart();
    },
    createChart() {
      const ctx = document.getElementById("doughnut-chart-participants").getContext('2d');

      if (this.chartInstance) {
        this.chartInstance.destroy();
      }

      this.chartInstance = new ChartJS(ctx, {
        type: "doughnut",
        data: {
          labels: this.chartLabels,
          datasets: [
            {
              data: this.chartData,
              backgroundColor: ["#42A5F5", "#66BB6A"],
              hoverBackgroundColor: ["#64B5F6", "#81C784"]
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom'
            },
            tooltip: {
              enabled: true
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
#doughnut-chart-participants {
  width: 100%;
  height: 400px;
}

.v-menu__content {
  max-width: 300px;
}
</style>


