<template>
  <v-col>
    <v-row>
      <v-col cols="12">
        <label style="color: #1976d2">
                      <span>
                        {{ $t("Office Type Wise Total Users") }}
                      </span>
        </label></v-col
      >
    </v-row>
    <v-row class="ml-1 mr-1">
      <v-col cols="7">

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
                  :label="$t('Enter Start & End Date')"
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
                @input="OnChangeDateInfo($event,'total_approve')"
            >
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="resetDateRange">
                Reset
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
        </v-row>
      </v-col>

      <v-col cols="5">
        <v-row>
            <v-select
                label="Select Office"
                :items="[ { id: null, value_en: '--Reset office--' }, ...officeType ]"
                v-model="office_type"
                item-text="value_en"
                item-value="id"
                @change="handleOfficeTypeChange"
            ></v-select>

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
export default {
  data() {
    return {
      // Define data properties here
      dates: [],
      officeType:[],
      office_type:'',
      menu: false,
      office_type_wise_users_chart: null,
      office_type_wise_users_info: [],
      office_type_wise_users_levels: [],
      office_type_wise_users_datas: [],
      isLoading: false,
      dateRangeText: ""
    };
  },
  methods: {
    resetDateRange() {
      this.dates = [];
      this.menu = false;
      this.fetchProgramwiseApproveApplicationChartData()
    },
    async fetchProgramwiseApproveApplicationChartData(from_date = null, to_date = null) {
      await this.getProgramwiseApproveApplication(2, from_date, to_date);
      this.createProgramwiseApproveApplicentChart();
    },
    async getProgramwiseApproveApplication(status, from_date = null, to_date = null, office_type = null) {
      const queryParams = {
        status: status,
        start_date: from_date,
        end_date: to_date,
        office_type: this.office_type,
      };
      try {
        const result = await this.$axios.get("/admin/system-configuration/dashboard/office-wise-total-user-count", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
          params: queryParams,
        });

        this.office_type_wise_users_info = result.data.data;
        this.office_type_wise_users_levels = this.office_type_wise_users_info.map((row) => row.value_en);
        this.office_type_wise_users_datas = this.office_type_wise_users_info.map((row) => row.users_count);
        this.isLoading = false;

      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error if necessary
      }
    },
    createProgramwiseApproveApplicentChart() {
      if (this.office_type_wise_users_chart) {
        this.office_type_wise_users_chart.destroy();
      }
      if (this.office_type_wise_users_levels && this.office_type_wise_users_datas) {
        const total = this.office_type_wise_users_datas.reduce((acc, value) => acc + value, 0);
        const percentages = this.office_type_wise_users_datas.map(value => ((value / total) * 100).toFixed(2) + '%');

        this.office_type_wise_users_chart = new Chart(document.getElementById("office_typewise_total_user"), {

          type: "pie",
          data: {
            // labels: this.office_type_wise_users_levels,
            labels: this.office_type_wise_users_levels.map((label, index) => `${label} (${percentages[index]})`),
            percentage: 0.5,
            datasets: [
              {
                label: "Count",
                data: this.office_type_wise_users_datas,
                // backgroundColor: ["Green", "Red", "blue", "Purple", "Yellow"],
                backgroundColor: this.office_type_wise_users_datas.map(() => this.generateRandomColor()),
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
        document.getElementById("office_typewise_total_user").style.width = '400px';
        document.getElementById("office_typewise_total_user").style.height = '435px';
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
      let from_date = null;
      let to_date = null;

      if (event.length === 2) {
        from_date = event[0];
        to_date = event[1];
      }
      this.fetchProgramwiseApproveApplicationChartData(from_date, to_date);
    },

    handleOfficeTypeChange() {
      this.fetchProgramwiseApproveApplicationChartData()
    }
  },

  mounted() {
    this.fetchProgramwiseApproveApplicationChartData();
    this.$store.dispatch("getLookupByType", 3).then((data) => {
      this.officeType = data
    });

  }
}
</script>
