<template>
  <v-col>
  <v-row>
        <v-col cols="12" style="padding: 0px;">
        <v-card :loading="isLoading" style="background-color:#1c3b68;color:white;font-size:12px;">
           <v-card-title style=" padding: 10px;">
               <h5 class="white--text">
                 {{ $t("container.payroll_management.dashboard.available_balance") }}
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
            :label="$t('container.system_config_dashboard.enter_start_end_date')"
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
      <!-- <v-date-picker
          v-model="dates"
          :range="[dates[0], dates[1]]"
          no-title
          scrollable
          @input="OnChangeDateInfo($event,'total_received')"
      >
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="resetDateRange">
          Cancel
        </v-btn>
        <v-btn
            text
            color="primary"
            @click="$refs.menu.save(dates)"
        >
          OK
        </v-btn>
      </v-date-picker> -->
    </v-menu>
  </v-row>
  <v-row>
     <img  v-if="allZeros == true" style="margin-left:80px;margin-top:10px;width: 300px;height: 300px" src="/assets/images/pie_chart_default.png" alt="default chart">
    <canvas v-else id="program_balance"></canvas>
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
      // Define data properties here
      dates: [],
      menu: false,
      total_number_of_application_received_chart: null,
      program_balance: [],
      levels: [],
      datas: [],
      programs: [],
      program_id: null,
      isLoading: false,
      dateRangeText: ""
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
      this.fetchChartData()
    },
    async fetchChartData(from_date = null, to_date = null) {
      await this.getData(0, from_date, to_date);
     if (this.allZeros != true) {
        this.createChart();
      }
      // this.createChart();
    },
    async getData(status, from_date = null, to_date = null) {
      console.log(from_date, to_date,'date by anwar')
      this.isLoading = true;
      const queryParams = {
        program_id: this.program_id,
        start_date: from_date,
        end_date: to_date,
      };
      try {
        const result = await this.$axios.get("admin/payroll/program-balance", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
          params: queryParams,
        });
         this.program_balance = result.data.data;

        this.levels = result.data.data.map((row) => {
          return this.$i18n.locale == 'en' ? row?.name_en : row?.name_bn;
        });
        this.datas = result.data.data.map((row) => {
          return row.count > 0 ? row?.count : 0;
        });
        this.isLoading = false;

      } catch (error) {
          this.isLoading = false;
        // Handle error if necessary
      }
    },
    createChart() {
      if (this.total_number_of_application_received_chart) {
        this.total_number_of_application_received_chart.destroy();
      }

      if (this.levels && this.datas) {
        const total = this.datas.reduce((acc, value) => acc + value, 0);
        // const percentages = this.datas.map(value => ((value / total) * 100).toFixed(2) + '%');
        const percentages = this.datas.map(value => {
          const percentage = ((value / total) * 100).toFixed(2);
          return isNaN(percentage) ? '0.00%' : percentage + '%';
        });

        this.total_number_of_application_received_chart = new Chart(document.getElementById("program_balance"), {
          type: "doughnut",
          data: {
            // labels: this.levels,
            // labels: this.levels.map((label, index) => `${label} (${percentages[index]})`),
            labels: this.levels.map((label, index) => `${label} (${this.$i18n.locale == 'en' ? this.datas[index] : this.$helpers.englishToBangla(this.datas[index])} - ${this.$i18n.locale == 'en' ? percentages[index]  : this.$helpers.englishToBangla(percentages[index])})`),
            percentages:percentages,
            datasets: [{
              label: "Count",
              backgroundColor: this.datas.map(() => this.generateRandomColor()),
              data: this.datas,
              fill: false,
              tension: 0.1,
            }],
          },
          options: {
            plugins: {
              legend: {
                display: true,
                position: "bottom",
                align: "start",
              },
              datalabels: {
                color: '#fff',
                fontWeight: 'bold',
                formatter: (value, context) => {
                  const percentage = context.chart.data.percentages[context.dataIndex];
                  const truncatedPercentage = parseFloat(percentage).toFixed(0);
                  if (truncatedPercentage == '0') {
                    return '';
                  }
                  if (value == '0') {
                    return '';
                  }
                  return `${this.$i18n.locale == 'en' ? value : this.$helpers.englishToBangla(value)} , ${this.$i18n.locale == 'en' ? truncatedPercentage : this.$helpers.englishToBangla(truncatedPercentage)}%`;
                }
              }
            },
            layout: {
              padding: {
                left: 20,
                right: 20,
                top: 0,
                bottom: 20
              }
            },
            responsive: true,
            maintainAspectRatio: false,
            aspectRatio: 1, // Aspect ratio of 1 w
          },
        });
        document.getElementById("program_balance").style.width = '400px';
        document.getElementById("program_balance").style.height = '435px';
      } else {
        console.error("Data is not available to create chart.");
      }
    },
    generateRandomColor() {
      return '#' + Math.floor(Math.random() * 16777215).toString(16);
    },
    OnChangeDateInfo(event, type) {
      if (this.dates.length < 2) {
        return;
      }

      if (this.dates[1] && this.dates[1] < this.dates[0]) {
        this.$toast.error(this.language == 'en' ? 'End date cannot be before start date' : 'শেষ তারিখ শুরুর তারিখের আগে হতে পারে না')
        this.resetDateRange();
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
      }
    },
    allZeros() {
      return this.datas.every(value => value === 0);
    }
  },
  watch: {
    '$i18n.locale': {
      handler(newLocale, oldLocale) {
        if (newLocale != oldLocale) {
          this.fetchChartData();
        }
      },
      immediate: true // Call the handler immediately to initialize the levels
    }
  },
}
</script>
