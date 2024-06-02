<template>
  <v-col>
    <v-row>
      <v-col cols="12">
        <label style="color: #1976d2">
          <span>
            {{ $t("container.api_manager.dashboard.organization_wise_api_requests") }}
          </span>
        </label></v-col>
    </v-row>
    <v-row class="ml-1 mr-1">
      <v-col>

        <v-row class="ml-1 mr-1">
          <v-menu ref="menu" v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y
            min-width="auto">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field v-model="dates" :append-icon="menu ? 'mdi-calendar' : 'mdi-calendar'"
                :label="$t('container.system_config_dashboard.enter_start_end_date')" readonly v-bind="attrs"
                v-on="on"></v-text-field>
            </template>
            <v-date-picker v-model="dates" :range="[dates[0], dates[1]]" no-title scrollable
              @input="OnChangeDateInfo($event,'total_approve')">
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="resetDateRange">
                {{ $t('container.list.reset') }}
              </v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(dates)">
                {{ $t('container.list.ok') }}
              </v-btn>
            </v-date-picker>
          </v-menu>
        </v-row>
      </v-col>
    </v-row>

    <v-row>
      <canvas id="office_typewise_total_user"></canvas>
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
      officeType:[],
      office_type:'',
      menu: false,
      office_type_wise_users_chart: null,
      organizationData: [],
      organizationLabels: [],
      organizationCount: [],
      isLoading: false,
      dateRangeText: ""
    };
  },
  methods: {
    resetDateRange() {
      this.dates = [];
      this.menu = false;
      this.fetchOrganizationWiseChartData()
    },
    async fetchOrganizationWiseChartData(from_date = null, to_date = null) {
      await this.getOrganizationWiseData(2, from_date, to_date);
      this.createOrganizationChart();
    },
    async getOrganizationWiseData(status, from_date = null, to_date = null, office_type = null) {
      const queryParams = {
        start_date: from_date,
        end_date: to_date,
      };
      try {
        const result = await this.$axios.get("/admin/api-manager/dashboard/organization-wise-count", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
          params: queryParams,
        });

        this.organizationData = result.data.data;
        this.organizationLabels = this.organizationData.map((row) => row.organization_name);
        this.organizationCount = this.organizationData.map((row) => row.api_logs_count);
        this.isLoading = false;

      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error if necessary
      }
    },
    createOrganizationChart() {
      if (this.office_type_wise_users_chart) {
        this.office_type_wise_users_chart.destroy();
      }
      if (this.organizationLabels && this.organizationCount) {
        const total = this.organizationCount.reduce((acc, value) => acc + value, 0);
        const percentages = this.organizationCount.map(value => {
          const percentage = ((value / total) * 100).toFixed(2);
          return isNaN(percentage) ? '0.00%' : percentage + '%';
        });

        this.office_type_wise_users_chart = new Chart(document.getElementById("office_typewise_total_user"), {

          type: "pie",
          data: {
            // labels: this.organizationLabels,
            // labels: this.organizationLabels.map((label, index) => `${label} (${percentages[index]})`),
            labels: this.organizationLabels.map((label, index) => `${label} (${this.$i18n.locale == 'en' ? this.organizationCount[index] : this.$helpers.englishToBangla(this.organizationCount[index])} - ${this.$i18n.locale == 'en' ? percentages[index]  : this.$helpers.englishToBangla(percentages[index])})`),
            percentages:percentages,
            datasets: [
              {
                label: "Count",
                data: this.organizationCount,
                // backgroundColor: ["Green", "Red", "blue", "Purple", "Yellow"],
                backgroundColor: this.organizationCount.map(() => this.generateRandomColor()),
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
        document.getElementById("office_typewise_total_user").style.width = '300px';
        document.getElementById("office_typewise_total_user").style.height = '237px';
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
      this.fetchOrganizationWiseChartData(from_date, to_date);
    },

    handleOfficeTypeChange() {
      this.fetchOrganizationWiseChartData()
    }
  },

  computed:{
    language: {
      get() {
        return this.$store.getters.getAppLanguage;
      }
    },
  },

  mounted() {
    this.fetchOrganizationWiseChartData();
    this.$store.dispatch("getLookupByType", 3).then((data) => {
      this.officeType = data
    });

  },
  watch: {
    '$i18n.locale': {
      handler(newLocale, oldLocale) {
        if (newLocale != oldLocale) {
          this.fetchOrganizationWiseChartData();
        }
      },
      immediate: true // Call the handler immediately to initialize the levels
    }
  },
}
</script>
