<template>
  <v-col>
  <v-row>
    <v-col cols="12">
      <label style="color: #1976d2">
                      <span>
                        {{ $t("container.system_config_dashboard.total_number_of_program_wise_beneficiary") }}
                      </span>
      </label></v-col
    >
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
  </v-row>
  <v-row>
    <canvas id="total_number_of_office_typewise_user_info"></canvas>
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
      total_number_of_office_typewise_user_chart: null,
      total_number_of_office_typewise_user_info: [],
      total_number_of_office_typewise_user_levels: [],
      total_number_of_office_typewise_user_datas: [],
      isLoading: false,
      dateRangeText: ""
    };
  },
  methods: {
    resetDateRange() {
      this.dates = [];
      this.menu = false;
      this.fetchTotalOfficeTypewiseUserChartData()
    },
    async fetchTotalOfficeTypewiseUserChartData(from_date = null, to_date = null) {
      await this.getTotalOfficeTypewiseUser(2, from_date, to_date);
      this.createTotalOfficeTypewiseUserChart();
    },
    async getTotalOfficeTypewiseUser(status, from_date = null, to_date = null) {
      const queryParams = {
        status: status,
        start_date: from_date,
        end_date: to_date,
      };
      try {
        const result = await this.$axios.get("/admin/system-configuration/dashboard/get-program-wise-beneficiary-count", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
          params: queryParams,
        });
        this.total_number_of_office_typewise_user_info = result.data.data;
        this.total_number_of_office_typewise_user_levels = this.total_number_of_office_typewise_user_info.map((row) => this.$i18n.locale == 'en' ? row.name_en : row.name_bn);
        this.total_number_of_office_typewise_user_datas = this.total_number_of_office_typewise_user_info.map((row) =>  row.beneficiaries_count);
        this.isLoading = false;

      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error if necessary
      }
    },
    createTotalOfficeTypewiseUserChart() {
      if (this.total_number_of_office_typewise_user_chart) {
        this.total_number_of_office_typewise_user_chart.destroy();
      }

      if (this.total_number_of_office_typewise_user_levels && this.total_number_of_office_typewise_user_datas) {
        const total = this.total_number_of_office_typewise_user_datas.reduce((acc, value) => acc + value, 0);
        const percentages = this.total_number_of_office_typewise_user_datas.map(value => {
          const percentage = ((value / total) * 100).toFixed(2);
          return isNaN(percentage) ? '0.00%' : percentage + '%';
        });

        this.total_number_of_office_typewise_user_chart = new Chart(document.getElementById("total_number_of_office_typewise_user_info"), {
          type: "doughnut",
          data: {
            // labels: this.total_number_of_office_typewise_user_levels.map((label, index) => `${label} (${percentages[index]})`),
            labels: this.total_number_of_office_typewise_user_levels.map((label, index) => `${label} (${this.$i18n.locale == 'en' ? this.total_number_of_office_typewise_user_datas[index] : this.$helpers.englishToBangla(this.total_number_of_office_typewise_user_datas[index])} - ${this.$i18n.locale == 'en' ? percentages[index]  : this.$helpers.englishToBangla(percentages[index])})`),
            percentages:percentages,
            datasets: [{
              label: "Count",
              data: this.total_number_of_office_typewise_user_datas,
              backgroundColor: this.total_number_of_office_typewise_user_datas.map(() => this.generateRandomColor()),
              fill: true,
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
        document.getElementById("total_number_of_office_typewise_user_info").style.width = '400px';
        document.getElementById("total_number_of_office_typewise_user_info").style.height = '435px';
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
      this.fetchTotalOfficeTypewiseUserChartData(from_date, to_date);
    },
  },

  computed:{
    language: {
      get() {
        return this.$store.getters.getAppLanguage;
      }
    },
  },

  mounted() {
    this.fetchTotalOfficeTypewiseUserChartData();
  },
  watch: {
    '$i18n.locale': {
      handler(newLocale, oldLocale) {
        if (newLocale != oldLocale) {
          this.fetchTotalOfficeTypewiseUserChartData();
        }
      },
      immediate: true // Call the handler immediately to initialize the levels
    }
  },
}
</script>
