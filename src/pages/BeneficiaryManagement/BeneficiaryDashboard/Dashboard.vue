<template>
  <v-container fluid>
    <!-- header card start -->
    <v-table>
      <thead>
        <tr>
          <td>
            <v-card
              max-height="auto"
              elevation="2"
              rounded="xl"
              class="ml-2 mr-2"
            >
              <v-card-title>
                <v-row>
                  <v-avatar color="primary" size="30" class="mt-7 ml-5">
                    <!-- <v-icon dark>mdi-account-circle</v-icon> -->
                    <img
                      src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                      alt="Avatar"
                    />
                  </v-avatar>

                  <v-col>
                    <v-card-text style="word-break: break-word">
                      <span class="font-weight-bold"
                        >Total Number of Beneficiary
                      </span>
                      <br />
                      <span class="headline font-weight-bold"> 1112123 </span>
                    </v-card-text>
                  </v-col>
                </v-row>
              </v-card-title>
            </v-card>
          </td>
          <td>
            <v-card
              max-height="auto"
              elevation="2"
              rounded="xl"
              class="ml-2 mr-2"
            >
              <v-card-title>
                <v-row>
                  <v-avatar color="primary" size="30" class="mt-7 ml-5">
                    <!-- <v-icon dark>mdi-account-circle</v-icon> -->
                    <img
                      src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                      alt="Avatar"
                    />
                  </v-avatar>

                  <v-col>
                    <v-card-text>
                      <span class="font-weight-bold"
                        >Number of Active Beneficiary</span
                      >
                      <br />
                      <span class="headline font-weight-bold"> 1112123 </span>
                    </v-card-text>
                  </v-col>
                </v-row>
              </v-card-title>
            </v-card>
          </td>
          <td>
            <v-card
              max-height="auto"
              elevation="2"
              rounded="xl"
              class="ml-2 mr-2"
            >
              <v-card-title>
                <v-row>
                  <v-avatar color="primary" size="30" class="mt-7 ml-5">
                    <!-- <v-icon dark>mdi-account-circle</v-icon> -->
                    <img
                      src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                      alt="Avatar"
                    />
                  </v-avatar>

                  <v-col>
                    <v-card-text>
                      <span class="font-weight-bold"
                        >Number of Inactive/Dead Beneficiary</span
                      >
                      <br />
                      <span class="headline font-weight-bold"> 1112123 </span>
                    </v-card-text>
                  </v-col>
                </v-row>
              </v-card-title>
            </v-card>
          </td>
          <td>
            <v-card
              max-height="auto"
              elevation="2"
              rounded="xl"
              class="ml-2 mr-2"
            >
              <v-card-title>
                <v-row>
                  <v-avatar color="primary" size="30" class="mt-7 ml-5">
                    <!-- <v-icon dark>mdi-account-circle</v-icon> -->
                    <img
                      src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                      alt="Avatar"
                    />
                  </v-avatar>

                  <v-col>
                    <v-card-text>
                      <span class="font-weight-bold"
                        >Number of Beneficiary in Waiting List</span
                      >
                      <br />
                      <span class="headline font-weight-bold"> 1112123 </span>
                    </v-card-text>
                  </v-col>
                </v-row>
              </v-card-title>
            </v-card>
          </td>
          <td>
            <v-card
              max-height="auto"
              elevation="2"
              rounded="xl"
              class="ml-2 mr-2"
            >
              <v-card-title>
                <v-row>
                  <v-avatar color="primary" size="30" class="mt-7 ml-5">
                    <!-- <v-icon dark>mdi-account-circle</v-icon> -->
                    <img
                      src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                      alt="Avatar"
                    />
                  </v-avatar>

                  <v-col>
                    <v-card-text>
                      <span class="font-weight-bold"
                        >Number of Replaced Beneficiary</span
                      >
                      <br />
                      <span class="headline font-weight-bold"> 1112123 </span>
                    </v-card-text>
                  </v-col>
                </v-row>
              </v-card-title>
            </v-card>
          </td>
        </tr>
      </thead>
    </v-table>
    <!-- header card end -->
    <!-- first row chart start -->
    <v-row class="mt-3">
      <v-col cols="12" md="4" lg="4">
        <v-card height="100%">
          <v-card-text>
            <V-row>
              <v-col>
                <v-row>
                  <v-col cols="12" lg="6" md="6">
                    <label style="color: #1976d2">
                      <span>
                        {{ $t("Program & Location Wise Beneficiary") }}
                      </span>
                    </label></v-col
                  >
                  <v-col cols="3" lg="3" md="3">
                    <v-autocomplete
                      class="mr-5"
                      :items="months"
                      :label="$t('Month')"
                      dense
                      item-text="month_name"
                      item-value="month_name"
                      v-model="program_location_Wise_beneficiary.month"
                      @input="onChangeProgramAndLocationWiseBeneficiary($event)"
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="3" lg="3" md="3">
                    <v-autocomplete
                      class="mr-5"
                      :items="years"
                      :label="$t('Year')"
                      dense
                      item-text="year_name"
                      item-value="year_name"
                      v-model="program_location_Wise_beneficiary.year"
                      @input="onChangeProgramAndLocationWiseBeneficiary($event)"
                    ></v-autocomplete>
                  </v-col>
                </v-row>

                <v-row>
                  <canvas id="program_location_wise_chart"></canvas>
                </v-row>
                <v-row>
                  <v-col cols="12" lg="4" md="4"> </v-col>

                  <v-col cols="12" lg="8" md="8">
                    <v-autocomplete
                      class="mr-5"
                      :items="programs"
                      :label="$t('Programs')"
                      dense
                      item-text="name_en"
                      item-value="id"
                      v-model="program_location_Wise_beneficiary.program_id"
                      @input="onChangeProgramAndLocationWiseBeneficiary($event)"
                    ></v-autocomplete>
                  </v-col>
                </v-row>
              </v-col>
            </V-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4" lg="4">
        <v-card height="100%">
          <v-card-text>
            <V-row>
              <v-col>
                <v-row>
                  <v-col cols="12" lg="6" md="6">
                    <label style="color: #1976d2">
                      <span>
                        {{ $t("Gender Wise Beneficiary") }}
                      </span>
                    </label></v-col
                  >
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
                  <canvas id="gender_wise_beneficiary"></canvas>
                </v-row>
                <v-row>
                  <v-col cols="12" lg="4" md="4"> </v-col>
                  <v-col cols="12" lg="8" md="8">
                    <v-autocomplete
                      class="mr-5"
                      :items="genders"
                      :label="$t('Gender')"
                      dense
                      item-text="name_en"
                      item-value="id"
                    ></v-autocomplete>
                  </v-col>
                </v-row>
              </v-col>
            </V-row>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4" lg="4">
        <v-card height="100%">
          <v-card-text>
            <V-row>
              <v-col>
                <v-row>
                  <v-col cols="12" lg="6" md="6">
                    <label style="color: #1976d2">
                      <span>
                        {{
                          $t("Year Wise Number of Waiting list of Beneficiary")
                        }}
                      </span>
                    </label></v-col
                  >
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
                      v-model="year_name"
                      :items="years"
                      :label="$t('Year')"
                      dense
                      item-text="year_name"
                      item-value="year_name"
                    ></v-autocomplete>
                  </v-col>
                </v-row>

                <v-row>
                  <canvas height="300" id="year_wise_ben"></canvas>
                </v-row>
                <v-row>
                  <v-col cols="12" lg="4" md="4"> </v-col>

                  <v-col cols="12" lg="8" md="8">
                    <v-autocomplete
                      class="mr-5"
                      :items="programs"
                      :label="$t('Programs')"
                      dense
                      item-text="name_en"
                      item-value="id"
                    ></v-autocomplete>
                  </v-col>
                </v-row>
              </v-col>
            </V-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <!-- first row chart end -->
    <!-- Second row chart start -->
    <v-row class="mt-3">
      <v-col cols="12" md="6" lg="6">
        <v-card height="100%">
          <v-card-text>
            <V-row>
              <v-col>
                <v-row>
                  <v-col cols="12" lg="5" md="5">
                    <label style="color: #1976d2">
                      <span>
                        {{ $t("Program Wise Beneficiary") }}
                      </span>
                    </label></v-col
                  >
                  <v-col cols="3" lg="3">
                    <v-autocomplete
                      class="mr-5"
                      :items="programs"
                      :label="$t('Program')"
                      dense
                      item-text="name_en"
                      item-value="id"
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="2" lg="2">
                    <v-autocomplete
                      class="mr-5"
                      :items="months"
                      :label="$t('Month')"
                      dense
                      item-text="month_name"
                      item-value="month_name"
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="2" lg="2">
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
                  <canvas id="program_wise_beneficiary"></canvas>
                </v-row>
                <v-row>
                  <v-col cols="12" lg="4" md="4"> </v-col>
                  <v-col cols="12" lg="8" md="8">
                    <label>
                      <span>
                        {{ $t("Disable Program Allowance") }}
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
                  <v-col cols="12" lg="6" md="6">
                    <label style="color: #1976d2">
                      <span>
                        {{ $t("Age & Program Wise Beneficiary") }}
                      </span>
                    </label></v-col
                  >
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
                  <canvas id="age_program_wise_beneficiary"></canvas>
                </v-row>
                <v-row>
                  <v-col cols="12" lg="6" md="6">
                    <v-autocomplete
                      class="mr-5"
                      :items="programs"
                      :label="$t('Age')"
                      dense
                      item-text="name_en"
                      item-value="id"
                    ></v-autocomplete>
                  </v-col>

                  <v-col cols="12" lg="6" md="6">
                    <v-autocomplete
                      class="mr-5"
                      :items="programs"
                      :label="$t('Programs')"
                      dense
                      item-text="name_en"
                      item-value="id"
                    ></v-autocomplete>
                  </v-col>
                </v-row>
              </v-col>
            </V-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <!-- Second row chart end -->

    <!-- Third row chart start -->
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
                  <canvas id="shifted_beneficiary"></canvas>
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
      <v-col cols="12" md="6" lg="6">
        <v-card height="100%">
          <v-card-text>
            <V-row>
              <v-col>
                <v-row>
                  <v-col cols="12" lg="6" md="6">
                    <label style="color: #1976d2">
                      <span>
                        {{
                          $t("Total Percentage(%) of Beneficiary Location Wise")
                        }}
                      </span>
                    </label>
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
                  <!-- <canvas id="linechart2"></canvas> -->
                </v-row>
                <v-row>
                  <v-col cols="12" lg="4" md="4"> </v-col>
                  <v-col cols="12" lg="8" md="8">
                    <v-autocomplete
                      class="mr-5"
                      :items="programs"
                      :label="$t('Program')"
                      dense
                      item-text="name_en"
                      item-value="id"
                    ></v-autocomplete>
                  </v-col>
                </v-row>
              </v-col>
            </V-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <!-- Third row chart end -->
  </v-container>
</template>
  
  <script>
import { extend, ValidationProvider, ValidationObserver } from "vee-validate";
import { required } from "vee-validate/dist/rules";
import Chart from "chart.js/auto";
extend("required", required);
export default {
  name: "Dashboard",
  title: "CTM - Beneficiary Dashboard",
  data() {
    return {
      data: [
        { year: 2010, count: 10 },
        { year: 2011, count: 20 },
        { year: 2012, count: 15 },
        { year: 2013, count: 25 },
        { year: 2014, count: 22 },
        { year: 2015, count: 30 },
        { year: 2016, count: 28 },
        { year: 2010, count: 10 },
        { year: 2011, count: 20 },
        { year: 2012, count: 15 },
        { year: 2013, count: 25 },
        { year: 2014, count: 22 },
        { year: 2015, count: 30 },
        { year: 2016, count: 28 },
      ],
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      years: Array.from(
        { length: 100 },
        (_, i) => new Date().getFullYear() - i
      ),
      month_name: "",
      year_name: "",
      programs: [],
      genders: ["Male", "Female", "3rd Gender"],
      program_name: "",

      program_location_Wise_beneficiary: {
        program_id: null,
        month: null,
        year: null,
      },
    };
  },
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  computed: {},

  methods: {
    async GetAllProgram() {
      try {
        this.$axios
          .get("/admin/allowance/get", {
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
    onChangeProgramAndLocationWiseBeneficiary(event) {
      console.log(
        "program_id",
        this.program_location_Wise_beneficiary.program_id
      );
      console.log("month", this.program_location_Wise_beneficiary.month);
      console.log("year", this.program_location_Wise_beneficiary.year);
    },
  },
  watch: {
    "$i18n.locale": "updateHeaderTitle",
  },
  created() {},
  beforeMount() {
    this.updateHeaderTitle();
  },
  mounted() {
    this.GetAllProgram();
    // program_location_wise_chart
    const ctxpie = document.getElementById("program_location_wise_chart");
    new Chart(ctxpie, {
      type: "pie",
      data: {
        labels: ["Dhaka", "Rajshahi", "Khula", "Sylhet", "Chattrogram"],
        datasets: [
          {
            label: "My First Dataset",
            data: [300, 50, 100, 30, 200],
            backgroundColor: ["Blue", "Red", "Green", "Purple", "Yellow"],
            // backgroundColor: [
            //   "rgb(255, 99, 132)",
            //   "rgb(54, 162, 235)",
            //   "rgb(255, 205, 86)",
            // ],
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
            // labels: {
            //   color: "rgb(255, 99, 132)",
            // },
          },
          title: {
            display: true,
            text: "Custom Chart Title",
          },
        },
      },
      // options: {
      //   scales: {
      //     y: {
      //       beginAtZero: true,
      //     },
      //   },
      // },
    });

    const ctx = document.getElementById("year_wise_ben");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["2019", "2020", "2021", "2022", "2023", "2024"],
        datasets: [
          {
            label: "Yearly Beneficiaries",
            data: [1200, 1900, 1000, 2200, 2800, 900],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    new Chart(document.getElementById("program_wise_beneficiary"), {
      type: "bar",
      data: {
        labels: this.data.map((row) => row.year),
        datasets: [
          {
            barPercentage: 0.5,
            barThickness: 6,
            maxBarThickness: 8,
            minBarLength: 2,
            label: "Program Wise Beneficiary",
            data: this.data.map((row) => row.count),
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
    const ctxpie2 = document.getElementById("gender_wise_beneficiary");
    new Chart(ctxpie2, {
      type: "pie",
      data: {
        labels: ["Male", "Female", "Hijra"],
        datasets: [
          {
            label: "My First Dataset",
            data: [300, 50, 100],
            backgroundColor: ["Blue", "Green", "Purple"],
            // hoverBackgroundColor: [
            //   "rgba(255, 99, 132, 0.8)",
            //   "rgba(54, 162, 235, 0.8)",
            //   "rgba(255, 206, 86, 0.8)",
            // ],
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    new Chart(document.getElementById("age_program_wise_beneficiary"), {
      type: "line",
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
      options: {
        scales: {
          x: {
            stacked: true,
          },
        },
      },
    });

    new Chart(document.getElementById("shifted_beneficiary"), {
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
};
</script>