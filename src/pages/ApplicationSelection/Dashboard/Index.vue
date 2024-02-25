<template>
  <v-container fluid>
<!--    <v-card-title class="justify-center" tag="div">-->
<!--      <h5 class="text-uppercase">-->
<!--        {{ $t("container.system_config.demo_graphic.district.list") }}-->
<!--      </h5>-->
<!--    </v-card-title>-->

    <v-row class="mt-3">
      <v-col cols="12" md="3" lg="3">
        <v-card height="100%">
          <v-card-text>
            <V-row>
              <v-col>


                  <GChart
                      type="PieChart"
                      :data="chartData"
                      :options="chartOptions"
                      :resizeDebounce="50"
                  />


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

                  <GChart
                      type="PieChart"
                      :data="chartData"
                      :options="chartOptions"
                  />

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

                  <GChart
                      type="LineChart"
                      :data="chartData"
                      :options="chartOptions"
                  />

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
                  <GChart
                      type="ColumnChart"
                      :data="chartData"
                      :options="chartOptions"
                  />


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
                  <v-col cols="12" lg="6" md="6">
                    <v-autocomplete
                        class="mr-5"
                        :items="programs"
                        :label="$t('To Program')"
                        dense
                        item-text="name_en"
                        item-value="id"
                    ></v-autocomplete>
                    <v-autocomplete
                        class="mr-5"
                        :items="programs"
                        :label="$t('From Program')"
                        dense
                        item-text="name_en"
                        item-value="id"
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="3" lg="3">
                    <v-autocomplete
                        class="mr-5"
                        :items="months"
                        :label="$t('Month')"
                        dense
                        item-text="month_name"
                        item-value="month_name"
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="3" lg="3">
                    <v-autocomplete
                        class="mr-5"
                        :items="years"
                        :label="$t('Year')"
                        dense
                        item-text="year_name"
                        item-value="year_name"
                    ></v-autocomplete>
                  </v-col>
                </v-row>

                <v-row>
                  <canvas id="total_number_of_application"></canvas>
                </v-row>
                <v-row>
                  <v-col cols="12" lg="4" md="4"> </v-col>
                  <v-col cols="12" lg="8" md="8">
                    <label style="color: #1976d2">
                      <span>
                        {{ $t("Number of Beneficiary Program Shifted") }}
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
    new Chart(document.getElementById("total_number_of_application"), {
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