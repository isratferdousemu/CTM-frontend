<template>
  <v-container fluid>
<!--    <v-card-title class="justify-center" tag="div">-->
<!--      <h5 class="text-uppercase">-->
<!--        {{ $t("container.system_config.demo_graphic.district.list") }}-->
<!--      </h5>-->
<!--    </v-card-title>-->

    <v-row class="mt-3">

      <v-col cols="12" md="3" lg="3">
        <v-card>
          <v-card-text>
            <V-row>
              <v-col>
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
                            :value="formattedDates"
                            :append-icon="menu ? 'mdi-calendar' : 'mdi-calendar'"
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
                      >
                        <v-spacer></v-spacer>
                        <v-btn
                            text
                            color="primary"
                            @click="menu = false"
                        >
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

                  </v-col>
                  <canvas id="total_number_of_application_received_info"></canvas>
                </v-row>
              </v-col>
            </V-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="3" lg="3">
        <v-card height="100%">
          <v-card-text>
            <V-row>
              <v-col>
                <v-row>
                  <canvas id="total_number_of_application_approval"></canvas>
                </v-row>
              </v-col>
            </V-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="3" lg="3">
        <v-card height="100%">
          <v-card-text>
            <V-row>
              <v-col>
                <v-row>
                  <canvas id="number_of_waiting_applicant"></canvas>
                </v-row>
              </v-col>
            </V-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="3" lg="3">
        <v-card height="100%">
          <v-card-text>
            <V-row>
              <v-col>
                <v-row>
                  <canvas id="total_number_of_application_rejected"></canvas>
                </v-row>
              </v-col>
            </V-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-3">
      <v-col cols="12" md="6" lg="6">
        <v-card height="100%">
          <v-card-text>
            <V-row>
              <v-col>
                <v-row>

                </v-row>
                <v-row>
                  <canvas id="total_number_of_application_received"></canvas>
                </v-row>
                <v-row>
                  <v-col cols="12" lg="4" md="4"> </v-col>
                  <v-col cols="12" lg="8" md="8">
                    <label style="color: #1976d2">
                      <span>
                        {{ $t("Total Number of Application Received") }}
                      </span>
                    </label>
                  </v-col>
                </v-row>
              </v-col>
            </V-row>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6" lg="6">
        <v-card height="100%">
          <v-card-text>
            <V-row>
              <v-col>
                <v-row>
                </v-row>

                <v-row>
                  <canvas id="number_of_application_forwarded"></canvas>
                </v-row>
                <v-row>
                  <v-col cols="12" lg="4" md="4"> </v-col>
                  <v-col cols="12" lg="8" md="8">
                    <label style="color: #1976d2">
                      <span>
                        {{ $t("Total Number of Application Forwarded") }}
                      </span>
                    </label>
                  </v-col>
                </v-row>
              </v-col>
            </V-row>
          </v-card-text>
        </v-card>
      </v-col>

    </v-row>

  </v-container>
</template>

<script>
import Chart from "chart.js/auto";
import { GChart } from "vue-google-charts/legacy";
export default {
  name: "Index",
  title: "Application Dashboard",
  data() {
    return {
      dates: [],
      menu: false,

      chartData: [
        ['Year', 'Sales', 'Expenses', 'Profit'],
        ['2014', 10, 400, 200],
        ['2015', 1170, 460, 250],
        ['2016', 660, 1120, 300],
        ['2017', 1030, 540, 350]
      ],
      chartOptions: {
        chart: {
          title: 'Company Performance',
          subtitle: 'Sales, Expenses, and Profit: 2014-2017',
        }
      }

    };
  },
  components: {
    GChart
  },
  computed: {

  },
  methods: {

  },

  watch: {

  },

  created() {

  },
  mounted(){
    new Chart(document.getElementById("total_number_of_application_received_info"), {
      type: "doughnut",
      data: {
        // labels: Utils.months({ count: 7 }),
        labels: [
          "2024",
          "2023",
          "2022",
        ],
        datasets: [
          {
            label: "Line Dataset",
            data: [10, 20, 30],
            fill: false,
            // borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
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
      // options: {
      //   responsive: true,
      //   maintainAspectRatio: false,
      //   width: 400, // Set your desired width here
      //   height: 400, // Set your desired height here
      // },
    });
    const ctxpie = document.getElementById("total_number_of_application_approval");
    new Chart(ctxpie, {
      type: "pie",
      data: {
        labels: [
          "2024",
          "2023",
          "2022",
          "2021",
        ],
        percentage: 0.5,
        datasets: [
          {
            label: "Values",
            data: [1600, 3000, 4500, 8000],
            backgroundColor: ["Blue", "Red", "Green", "Purple", "Yellow"],
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
    const waitingapplicant = document.getElementById("number_of_waiting_applicant");
    new Chart(waitingapplicant, {
      type: "pie",
      data: {
        labels: [
          "2024",
          "2023",
          "2022",
          "2021",
        ],
        percentage: 0.5,
        datasets: [
          {
            label: "Values",
            data: [1600, 3000, 4500, 8000],
            backgroundColor: ["Blue", "Red", "Green", "Purple", "Yellow"],
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
    new Chart(document.getElementById("total_number_of_application_rejected"), {
      type: "doughnut",
      data: {
        // labels: Utils.months({ count: 7 }),
        labels: [
          "2024",
          "2023",
          "2022",
        ],
        datasets: [
          {
            label: "Line Dataset",
            data: [10, 20, 30],
            fill: false,
            // borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
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
      // options: {
      //   responsive: true,
      //   maintainAspectRatio: false,
      //   width: 400, // Set your desired width here
      //   height: 400, // Set your desired height here
      // },
    });
    new Chart(document.getElementById("total_number_of_application_received"), {
      data: {
        // labels: Utils.months({ count: 7 }),
        labels: [
          "2024",
          "2023",
          "2022",
          "2021",
          "2021",
          "2020",
          "2019",
          "2018",
        ],
        datasets: [
          {
            type: "line",
            label: "Line Dataset",
            data: [1600, 3000, 4500, 8000, 12000, 8000, 8500, 7500, 10000],
            fill: false,
            // borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
          {
            type: "bar",
            label: "Bar Dataset",
            data: [1600, 3000, 4500, 8000, 12000, 8000, 8500, 7500, 10000],
            barPercentage: 0.5,
            barThickness: 6,
            maxBarThickness: 8,
            minBarLength: 2,
          },
        ],
      },
    });
    //Number of Application Forwarded
    new Chart(document.getElementById("number_of_application_forwarded"), {
      type: "bar",
      data: {
        labels: [
          "2024",
          "2023",
          "2022",
          "2021",
          "2021",
          "2020",
          "2019",
          "2018",
        ],
        datasets: [
          {
            barPercentage: 0.5,
            barThickness: 16,
            maxBarThickness: 18,
            minBarLength: 12,
            label: "Number of Application Forwarded",
            data: [1600, 3000, 4500, 8000, 12000, 8000, 8500, 7500, 10000],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 205, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(201, 203, 207, 0.2)",
            ],
            borderColor: [
              "rgb(255, 99, 132)",
              "rgb(255, 159, 64)",
              "rgb(255, 205, 86)",
              "rgb(75, 192, 192)",
              "rgb(54, 162, 235)",
              "rgb(153, 102, 255)",
              "rgb(201, 203, 207)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: true,
            labels: {
              color: "rgb(255, 99, 132)",
            },
          },
        },
      },
    });
  },
  beforeMount() {

  },

}
</script>
<style>
.highlight-column {
  background-color: #e0eaf1;
}
</style>