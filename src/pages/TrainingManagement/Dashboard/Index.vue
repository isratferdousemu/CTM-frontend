<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col
          v-for="item in cards"
          :key="item.id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
          class="justify-center"
      >
        <v-card class="elevation-10 card-container">
          <a href="#" target="_blank" class="flex-column align-center">
            <v-card-text class="text-center">
              <div class="d-flex align-center justify-center black--text">
                <div class="location-icon-container">
                  <v-icon :class="item.icon"></v-icon>
                </div>
                <span class="ml-1 font-weight-bold">{{ getCardTitle(item) }}</span>
              </div>
              <div class="mt-1 font-weight-bold text-center black--text">
                {{ $i18n.locale === 'en' ? item.value : $helpers.englishToBangla(item.value) }}
              </div>
            </v-card-text>
          </a>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="6" lg="6">
        <v-card>
          <v-card-text>
            <V-row>
              <HorizontalBarChartTrainingStatus/>
            </V-row>
          </v-card-text>
        </v-card>
      </v-col>
<!--      <v-col cols="12" md="6" lg="6">-->
<!--        <v-card height="100%">-->
<!--          <v-card-text>-->
<!--            <V-row>-->
<!--              <PieChartTrainingByOffice/>-->
<!--            </V-row>-->
<!--          </v-card-text>-->
<!--        </v-card>-->
<!--      </v-col>-->
      <v-col cols="12" md="6" lg="6">
        <v-card height="100%">
          <v-card-text>
            <V-row>
              <MonthWiseNoOfParticipantsLinebarchart/>
            </V-row>
          </v-card-text>
        </v-card>
      </v-col>
<!--      <v-col cols="12" md="6" lg="6">-->
<!--        <v-card height="100%">-->
<!--          <v-card-text>-->
<!--            <V-row>-->
<!--              <HorizontalBarChartTopTraining/>-->
<!--            </V-row>-->
<!--          </v-card-text>-->
<!--        </v-card>-->
<!--      </v-col>-->
    </v-row>

    <v-row class="mt-3">
      <v-col cols="12" md="6" lg="6">
        <v-card height="100%">
          <v-card-text>
            <V-row>
              <PerticipantsbyTrainingModeDoughnutchart/>
            </V-row>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6" lg="6">
        <v-card height="100%">
          <v-card-text>
            <V-row>
             <ParticipantsbyTrainingModeTable/>
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
              <TopTrainerTable/>
            </V-row>
          </v-card-text>
        </v-card>
      </v-col>

    </v-row>

  </v-container>
</template>

<script>
import Spinner from "@/components/Common/Spinner.vue";
import HorizontalBarChartTrainingStatus
  from "@/pages/TrainingManagement/Dashboard/horizontal-bar-chart-training-status.vue";
import PieChartTrainingByOffice from "@/pages/TrainingManagement/Dashboard/pie-chart-training-by-office.vue";
import MonthWiseNoOfParticipantsLinebarchart
  from "@/pages/TrainingManagement/Dashboard/month-wise-no-of-participants-linebarchart.vue";
import HorizontalBarChartTopTraining from "@/pages/TrainingManagement/Dashboard/horizontal-bar-chart-top-training.vue";
import PerticipantsbyTrainingModeDoughnutchart
  from "@/pages/TrainingManagement/Dashboard/perticipantsby-training-mode-doughnutchart.vue";
import ParticipantsbyTrainingModeTable
  from "@/pages/TrainingManagement/Dashboard/participantsby-training-mode-table.vue";
import TopTrainerTable from "@/pages/TrainingManagement/Dashboard/top-trainer-table.vue";

export default {
  name: "Training Dashboard",
  data() {
    return {
      cards: [],
      isLoading: false,
    };
  },
  components: {
    TopTrainerTable,
    ParticipantsbyTrainingModeTable,
    PerticipantsbyTrainingModeDoughnutchart,
    HorizontalBarChartTopTraining,
    MonthWiseNoOfParticipantsLinebarchart,
    PieChartTrainingByOffice,
    HorizontalBarChartTrainingStatus,
    Spinner,
  },
  methods: {
    getCardTitle(item) {
      return this.$i18n.locale === 'en' ? item.name_en : item.name_bn;
    },

    async getAllCardValue() {
      await this.$axios
          .get(`/admin/training/dashboard/calculation-cards`, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((result) => {
            this.cards = result.data.data
          });
    },

  },
  created() {
    this.getAllCardValue()
  },
  mounted() {
    this.drawer = false;
  },
  computed: {
    drawer: {
      get() {
        return this.$store.state.Drawer;
      },
      set(v) {
        return this.$store.commit("setDrawer", v);
      },
    },
  },
};
</script>

<style scoped>
.card-container {
  height: 70px; /* Set a fixed height */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  margin-bottom: 16px; /* Adjust margin as needed */
  box-sizing: border-box; /* Include padding and border in the element's total width and height */
}

.location-icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px; /* Adjust spacing between icon and text */
}

.v-card-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.black--text {
  color: #000;
}

.flex-column {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
