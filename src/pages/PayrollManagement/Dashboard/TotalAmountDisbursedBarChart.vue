<template>
  <v-col>
    <v-row>
      <v-col cols="12" style="padding: 0px">
        <v-card
          :loading="isLoading"
          style="background-color: #1c3b68; color: white; font-size: 12px"
        >
          <v-card-title style="padding: 10px">
            <h5 class="white--text">
              {{
                $t(
                  "container.payroll_management.dashboard.total_amount_disbursed"
                )
              }}
            </h5>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="ml-1 mr-1">
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <!-- <v-text-field
            v-model="dates"
            :append-icon="menu ? 'mdi-calendar' : 'mdi-calendar'"
            :label="
              $t(
                'container.application_selection_dashboard.enter_start_end_date'
              )
            "
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field> -->

          <v-col cols="12">
            <v-row>
              <v-select
                :label="
                  $t(
                    'container.beneficiary_management.dashboard.select_program'
                  )
                "
                :items="programs"
                v-model="program_id"
                :item-text="getItemText"
                item-value="id"
                @change="fetchChartData()"
                clearable
              ></v-select>
            </v-row>
          </v-col>
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
            {{ $t("container.list.reset") }}
          </v-btn>
          <v-btn text color="primary" @click="$refs.menu.save(dates)">
            {{ $t("container.list.ok") }}
          </v-btn>
        </v-date-picker>
      </v-menu>
    </v-row>
    <v-row>
      <canvas id="total_amount_disbursed_info"></canvas>
    </v-row>
  </v-col>
</template>

<script>
import Chart from "chart.js/auto";
export default {
  data() {
    return {
      // Define data properties here
      dates: [],
      program_id: null,
      programs: [],
      menu: false,
      total_number_of_application_forwarded_bar_chart: null,
      total_amount_disbursed_info: [],
      levels: [],
      datas: [],
      isLoading: false,
      dateRangeText: "",
    };
  },
  methods: {
    getItemText(item) {
      return this.language === "bn" ? item.name_bn : item.name_en;
    },
    async GetAllProgram() {
      try {
        await this.$axios
          .get("/global/program", {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((result) => {
            this.programs = result.data.data;
          })
          .catch((err) => {
            console.log(err, "error");
            if (err.response?.data?.errors) {
              this.$refs.form.setErrors(err.response.data.errors);
            }
            console.log(err.response);
            this.$toast.error(err?.response?.data?.message);
          });
      } catch (e) {
        console.log(e);
      }
    },
    resetDateRange() {
      this.dates = [];
      this.menu = false;
      this.fetchChartData();
    },
    async fetchChartData(
      from_date = null,
      to_date = null
    ) {
      await this.getData(null, from_date, to_date);
      this.createChart();
    },
    async getData(
      status,
      from_date = null,
      to_date = null
    ) {
      this.isLoading = true;
      const queryParams = {
        program_id: this.program_id,
        start_date: from_date,
        end_date: to_date,
      };
      try {
        const result = await this.$axios.get(
          "/admin/payroll/total-amount-disbursed",
          {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
            params: queryParams,
          }
        );
        this.total_amount_disbursed_info = result.data.data;
        this.levels =
          this.total_amount_disbursed_info.map((row) =>
            this.language == "en"
              ? row.year
              : row.year
          );
        this.datas =
          this.total_amount_disbursed_info.map(
            (row) => row.total_amount
          );
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        console.error("Error fetching data:", error);
        // Handle error if necessary
      }
    },
    createChart() {
      if (this.total_number_of_application_forwarded_bar_chart) {
        this.total_number_of_application_forwarded_bar_chart.destroy();
      }

      if (
        this.levels &&
        this.datas
      ) {
        this.total_number_of_application_forwarded_bar_chart = new Chart(
          document.getElementById(
            "total_amount_disbursed_info"
          ),
          {
            type: "bar",
            data: {
              labels: this.levels,
              datasets: [
                {
                  barPercentage: 0.5,
                  barThickness: 16,
                  maxBarThickness: 18,
                  minBarLength: 12,
                  label: "",
                  data: this.datas,
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
          }
        );
      } else {
        console.error("Data is not available to create chart.");
      }
    },
    OnChangeDateInfo(event, type) {
      if (this.dates[1] && this.dates[1] < this.dates[0]) {
        this.$toast.error(
          this.language == "en"
            ? "End date cannot be before start date"
            : "শেষ তারিখ শুরুর তারিখের আগে হতে পারে না"
        );
        this.resetDateRange();
      }
      if (this.dates.length < 2) {
        return;
      }
      let from_date = null;
      let to_date = null;

      if (event.length === 2) {
        from_date = event[0];
        to_date = event[1];
      }
      this.fetchChartData(from_date, to_date);
    },
  },

  mounted() {
    this.fetchChartData();
    this.GetAllProgram();
  },
  computed: {
    language: {
      get() {
        return this.$store.getters.getAppLanguage;
      },
    },
  },
  watch: {
    "$i18n.locale": {
      handler(newLocale, oldLocale) {
        if (newLocale != oldLocale) {
          this.fetchChartData();
        }
      },
      immediate: true,
    },
  },
};
</script>


