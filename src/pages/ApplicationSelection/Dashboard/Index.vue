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
  </v-container>
</template>

<script>
import { GChart } from 'vue-google-charts/legacy'
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