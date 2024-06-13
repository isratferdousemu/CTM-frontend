<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col
          v-for="item in cards"
          :key="item.id"
          class="justify-center"
          cols="12" sm="6" md="4" lg="3"
      >
        <v-card class="elevation-10 card-container">
          <a href="#" target="_blank" class="flex-column align-center">
            <v-card-text class="text-center">
              <div class="d-flex align-center justify-center black--text">
                <div class="location-icon-container">
                  <v-icon class="mdi mdi-map-marker"></v-icon>
                </div>
                <span class="ml-1 font-weight-bold">{{ item.title }}</span>
              </div>
              <div class="mt-1 font-weight-bold text-center black--text">
                {{ $i18n.locale === 'en' ? item.value : $helpers.englishToBangla(item.value) }}
              </div>
            </v-card-text>
          </a>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-3">
      <v-col cols="12" md="6" lg="6">
        <v-card>
          <v-card-text>
            <V-row>
              <Testdashboard/>
            </V-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" lg="6">
        <v-card height="100%">
          <v-card-text>
            <V-row>
              <Test2dashboard/>
            </V-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" lg="6">
        <v-card height="100%">
          <v-card-text>
            <V-row>

            </V-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" lg="6">
        <v-card height="100%">
          <v-card-text>
            <V-row>

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

            </V-row>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6" lg="6">
        <v-card height="100%">
          <v-card-text>
            <V-row>

            </V-row>
          </v-card-text>
        </v-card>
      </v-col>

    </v-row>

  </v-container>
</template>

<script>
import Spinner from "@/components/Common/Spinner.vue";
import Testdashboard from "@/pages/TrainingManagement/Dashboard/Testdashboard.vue";
import Test2dashboard from "@/pages/TrainingManagement/Dashboard/Test2dashboard.vue";

export default {
  name: "Training Dashboard",
  data() {
    return {
      cards: [
        { id: 1, title: 'Total Course', value: 11 },
        { id: 2, title: 'Total Participants', value: 2555 },
        { id: 3, title: 'Training Completion', value: '59%' },
        { id: 4, title: 'Active Batches', value: 9 },
        { id: 5, title: 'Total No of Trainers', value: 50 },
        { id: 6, title: 'Active Trainers', value: 16 },
        { id: 7, title: 'Enrolment Per Training (Avg.)', value: 20 },
      ],
      isLoading: false,
    };
  },
  components: {
    Test2dashboard,
    Testdashboard,
    Spinner,
  },
  methods: {

  },
  created() {

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
  height: 60px; /* Set a fixed height */
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
