<template>
  <v-col>
    <v-row>
      <v-col cols="12">
        <label style="color: #1976d2">
          <span>
            {{
              $t(
                "container.beneficiary_management.dashboard.program_and_location_wise_ben"
              )
            }}
          </span>
        </label></v-col
      >
    </v-row>
    <v-row class="ml-1 mr-1">
      <v-col cols="7">
        <v-row class="mr-1">
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
                v-model="dateRangeText"
                :value="formattedDates"
                :append-icon="menu ? 'mdi-calendar' : 'mdi-calendar'"
                :label="
                  $t(
                    'container.beneficiary_management.dashboard.enter_start_end_date'
                  )
                "
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="dates"
              :range="[dates[0], dates[1]]"
              :rules="[customDateRangeRule]"
              no-title
              scrollable
            >
              <v-spacer></v-spacer>
              <v-btn
                text
                color="primary"
                @click="resetDateProgramAndLocationWiseBeneficiary"
              >
                Cancel
              </v-btn>
              <v-btn
                text
                color="primary"
                @click="submitDateProgramAndLocationWiseBeneficiary"
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
        </v-row>
      </v-col>
      <v-col cols="5">
        <v-row>
          <v-select
            :label="
              $t('container.beneficiary_management.dashboard.select_program')
            "
            :items="programs"
            v-model="program_location_Wise_beneficiary.program_id"
            item-text="name_en"
            item-value="id"
            @change="GetLocationWiseBeneficiaries($event)"
            clearable
          ></v-select>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <canvas id="program_location_wise_chart"></canvas>
    </v-row>
  </v-col>
</template>

<script>
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
Chart.register(ChartDataLabels);
export default {
  data() {
    return {
      programs: [],
      isLoadingProgramLocation: false,

      //for program & location wise chart
      program_location_wise_ben_value: [],
      program_location_wise_ben_level: [],
      program_location_wise_ben: [],
      program_location_chart: null,
      program_location_Wise_beneficiary: {
        program_id: null,
      },
      dates: [],
      menu: false,

      programwise_application_approve_info: [],
      programwise_application_approve_levels: [],
      programwise_application_approve_datas: [],
      isLoading: false,
      dateRangeText: "",
    };
  },
  computed: {
    dateRangeText() {
      return this.dates.join(" ~ ");
    },
  },
  methods: {
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
            console.log(result, "programs");
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
    async GetLocationWiseBeneficiaries() {
      await this.fetchData();
      //   await this.getProgramwiseApproveApplication();
      this.CreateLocationWiseBeneficiariesChart();
      //   this.createProgramwiseApproveApplicentChart();
    },

    async fetchData() {
      this.isLoadingProgramLocation = true;
      const queryParams = {
        program_id: this.program_location_Wise_beneficiary.program_id,
        from_date: this.dates[0],
        to_date: this.dates[1],
      };
      await this.$axios
        .get("/admin/beneficiary-dashboard/getLocationWiseBeneficiaries", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
          params: queryParams,
        })
        .then((result) => {
          this.program_location_wise_ben = result.data.data;
          this.program_location_wise_ben_level =
            this.program_location_wise_ben.map((row) =>
              this.$i18n.locale == "en" ? row.division : row.division
            );
          this.program_location_wise_ben_value =
            this.program_location_wise_ben.map((row) =>
              this.$i18n.locale == "en" ? row.value : row.value
            );
          this.isLoadingProgramLocation = false;
        });
    },
    async getProgramwiseApproveApplication() {
      const queryParams = {
        status: 2,
        start_date: null,
        end_date: null,
      };
      try {
        const result = await this.$axios.get(
          "/admin/application-dashboard/get-total-received-application",
          {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
            params: queryParams,
          }
        );

        this.programwise_application_approve_info = result.data.data;
        this.programwise_application_approve_levels =
          this.programwise_application_approve_info.map((row) =>
            this.$i18n.locale == "en" ? row.name_en : row.name_bn
          );
        this.programwise_application_approve_datas =
          this.programwise_application_approve_info.map(
            (row) => row.applications_count
          );
        this.isLoading = false;
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error if necessary
      }
    },

    submitDateProgramAndLocationWiseBeneficiary() {
      this.menu = false;
      if (this.dates.length < 2) {
        return;
      }
      this.GetLocationWiseBeneficiaries();
    },
    resetDateProgramAndLocationWiseBeneficiary() {
      this.dates = [];
      this.menu = false;
      this.GetLocationWiseBeneficiaries();
    },

    generateRandomColor() {
      return "#" + Math.floor(Math.random() * 16777215).toString(16);
    },
    CreateLocationWiseBeneficiariesChart() {
      if (this.program_location_chart) {
        this.program_location_chart.destroy();
      }
      if (this.program_location_wise_ben) {
        // program_location_wise_chart
        this.program_location_chart = new Chart(
          document.getElementById("program_location_wise_chart"),
          {
            type: "pie",
            data: {
              labels: this.program_location_wise_ben.map((row) => row.division),
              percentage: this.program_location_wise_ben.map(
                (row) => row.percentage
              ),
              datasets: [
                {
                  label: "Values",
                  data: this.program_location_wise_ben.map((row) => row.value),
                  backgroundColor: this.program_location_wise_ben.map(() =>
                    this.generateRandomColor()
                  ),
                  hoverOffset: 4,
                },
              ],
            },
            options: {
              plugins: {
                legend: {
                  display: true,
                  position: "bottom",
                  align: "center",
                },
                datalabels: {
                  color: "#fff",
                  fontWeight: "bold",
                  formatter: function (value, context) {
                    // return (
                    //   value +
                    //   ", " +
                    //   context.chart.data.percentage[context.dataIndex] +
                    //   "%"
                    // );
                  },
                },
              },
              layout: {
                padding: {
                  left: 10,
                  right: 10,
                  top: 0,
                  bottom: 10,
                },
              },
              responsive: true,
              maintainAspectRatio: false,
              aspectRatio: 1, // Aspect ratio of 1 w
            },
          }
        );
        document.getElementById("program_location_wise_chart").style.width =
          "350px";
        document.getElementById("program_location_wise_chart").style.height =
          "385px";
      } else {
        console.error("Data is not available to create chart.");
      }
    },
    createProgramwiseApproveApplicentChart() {
      if (this.program_location_chart) {
        this.program_location_chart.destroy();
      }
      if (
        this.programwise_application_approve_levels &&
        this.programwise_application_approve_datas
      ) {
        const total = this.programwise_application_approve_datas.reduce(
          (acc, value) => acc + value,
          0
        );

        const percentages = this.programwise_application_approve_datas.map(
          (value) => {
            const percentage = ((value / total) * 100).toFixed(2);
            return isNaN(percentage) ? "0.00%" : percentage + "%";
          }
        );

        this.program_location_chart = new Chart(
          document.getElementById("program_location_chart"),
          {
            type: "pie",
            data: {
              // labels: this.programwise_application_approve_levels,
              // labels: this.programwise_application_approve_levels.map((label, index) => `${label} (${percentages[index]})`),
              labels: this.programwise_application_approve_levels.map(
                (label, index) =>
                  `${label} (${
                    this.$i18n.locale == "en"
                      ? this.programwise_application_approve_datas[index]
                      : this.$helpers.englishToBangla(
                          this.programwise_application_approve_datas[index]
                        )
                  } - ${
                    this.$i18n.locale == "en"
                      ? percentages[index]
                      : this.$helpers.englishToBangla(percentages[index])
                  })`
              ),
              percentages: percentages,
              datasets: [
                {
                  label: "Values",
                  data: this.programwise_application_approve_datas,
                  backgroundColor:
                    this.programwise_application_approve_datas.map(() =>
                      this.generateRandomColor()
                    ),
                  // backgroundColor: ["Green", "Red", "blue", "Purple", "Yellow"],
                  hoverOffset: 4,
                },
              ],
            },
            options: {
              plugins: {
                legend: {
                  display: true,
                  position: "bottom",
                  align: "start",
                },
                datalabels: {
                  color: "#fff",
                  fontWeight: "bold",
                  formatter: (value, context) => {
                    const percentage =
                      context.chart.data.percentages[context.dataIndex];
                    const truncatedPercentage =
                      parseFloat(percentage).toFixed(0);
                    if (truncatedPercentage == "0") {
                      return "";
                    }
                    if (value == "0") {
                      return "";
                    }
                    return `${
                      this.$i18n.locale == "en"
                        ? value
                        : this.$helpers.englishToBangla(value)
                    } , ${
                      this.$i18n.locale == "en"
                        ? truncatedPercentage
                        : this.$helpers.englishToBangla(truncatedPercentage)
                    }%`;
                  },
                },
              },
              layout: {
                padding: {
                  left: 20,
                  right: 20,
                  top: 0,
                  bottom: 20,
                },
              },
              responsive: true,
              maintainAspectRatio: false,
              aspectRatio: 1, // Aspect ratio of 1 w
            },
          }
        );
        // document.getElementById("program_location_chart").style.width = "400px";
        // document.getElementById("program_location_chart").style.height =
        //   "435px";
      } else {
        console.error("Data is not available to create chart.");
      }
    },
  },
  created() {},

  mounted() {
    // this.GetAllProgram();
    this.GetLocationWiseBeneficiaries();
  },
  watch: {
    "$i18n.locale": {
      handler(newLocale, oldLocale) {
        if (newLocale != oldLocale) {
          this.GetLocationWiseBeneficiaries();
        }
      },
      immediate: true, // Call the handler immediately to initialize the levels
    },
  },
};
</script>