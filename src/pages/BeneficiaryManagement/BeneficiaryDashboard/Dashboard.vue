<template>
  <v-container fluid>
    <!-- header card start -->
    <Spinner :loading="isLoading" />
    <v-table>
      <thead>
        <tr>
          <td>
            <v-card
              elevation="2"
              rounded="xl"
              class="ml-2 mr-2"
              height="100%"
              max-height="auto"
            >
              <v-card-title>
                <v-row>
                  <v-avatar color="#cce6ff" size="30" class="mt-7 ml-5">
                    <v-icon color="primary">mdi mdi-account-multiple</v-icon>
                  </v-avatar>

                  <v-col>
                    <v-card-text style="word-break: break-word">
                      <span class="font-weight-bold">
                        {{
                          $t(
                            "container.beneficiary_management.dashboard.total_beneficiary"
                          )
                        }}
                      </span>
                      <br />
                      <br />
                      <span class="headline font-weight-bold">
                        {{ beneficiaries.totalBeneficiaries }}
                      </span>
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
              height="100%"
            >
              <v-card-title>
                <v-row>
                  <v-avatar color="#cce6ff" size="30" class="mt-7 ml-5">
                    <v-icon color="primary">mdi-account</v-icon>
                  </v-avatar>

                  <v-col>
                    <v-card-text style="word-break: break-word">
                      <span class="font-weight-bold">
                        {{
                          $t(
                            "container.beneficiary_management.dashboard.active_beneficiary"
                          )
                        }}
                      </span>
                      <br />
                      <span class="headline font-weight-bold">
                        {{ beneficiaries.totalActiveBeneficiaries }}
                      </span>
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
              height="100%"
            >
              <v-card-title>
                <v-row>
                  <v-avatar color="#cce6ff" size="30" class="mt-7 ml-5">
                    <v-icon color="primary">mdi mdi-account-off</v-icon>
                  </v-avatar>

                  <v-col>
                    <v-card-text>
                      <span
                        class="font-weight-bold"
                        style="word-break: break-word"
                      >
                        {{
                          $t(
                            "container.beneficiary_management.dashboard.inactive_beneficiary"
                          )
                        }}</span
                      >
                      <br />
                      <span class="headline font-weight-bold">
                        {{ beneficiaries.totalInactiveBeneficiaries }}
                      </span>
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
              height="100%"
            >
              <v-card-title style="word-break: break-word">
                <v-row>
                  <v-avatar color="#cce6ff" size="30" class="mt-7 ml-5">
                    <v-icon color="primary"
                      >mdi mdi-account-multiple-outline</v-icon
                    >
                  </v-avatar>

                  <v-col>
                    <v-card-text>
                      <span class="font-weight-bold">
                        {{
                          $t(
                            "container.beneficiary_management.dashboard.waitining_beneficiary"
                          )
                        }}</span
                      >
                      <br />
                      <span class="headline font-weight-bold">
                        {{ beneficiaries.totalWaitingBeneficiaries }}
                      </span>
                    </v-card-text>
                  </v-col>
                </v-row>
              </v-card-title>
            </v-card>
          </td>
          <td>
            <v-card
              height="100%"
              max-height="auto"
              elevation="2"
              rounded="xl"
              class="ml-2 mr-2"
            >
              <v-card-title>
                <v-row>
                  <v-avatar color="#cce6ff" size="30" class="mt-7 ml-5">
                    <v-icon color="primary">mdi mdi-account-switch</v-icon>
                  </v-avatar>

                  <v-col>
                    <v-card-text style="word-break: break-word">
                      <span class="font-weight-bold">
                        {{
                          $t(
                            "container.beneficiary_management.dashboard.replaced_beneficiary"
                          )
                        }}</span
                      >
                      <br />
                      <span class="headline font-weight-bold">
                        {{ beneficiaries.totalReplacedBeneficiaries }}
                      </span>
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
                  <v-col cols="12">
                    <label style="color: #1976d2">
                      <span>
                        {{ $t("Program & Location Wise Beneficiary") }}
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
                        v-model="dateRangeText"
                        :value="formattedDates"
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
                      :rules="[customDateRangeRule]"
                      no-title
                      scrollable
                      @input="onChangeProgramAndLocationWiseBeneficiary($event)"
                    >
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="menu = false">
                        Cancel
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
                      @input="GetLocationWiseBeneficiaries($event)"
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
                  <v-col cols="12">
                    <label style="color: #1976d2">
                      <span>
                        {{ $t("Gender Wise Beneficiary") }}
                      </span>
                    </label></v-col
                  >
                </v-row>
                <v-row class="ml-1 mr-1">
                  <v-menu
                    ref="menu2"
                    v-model="menu2"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="dateRangeTextOnGender"
                        :value="formattedDates"
                        :append-icon="menu2 ? 'mdi-calendar' : 'mdi-calendar'"
                        :label="$t('Enter Start & End Date')"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="gender_wise_dates"
                      :range="[gender_wise_dates[0], gender_wise_dates[1]]"
                      no-title
                      scrollable
                      @input="onChangeGenderWiseBeneficiary($event)"
                    >
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="menu2 = false">
                        Cancel
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.menu2.save(gender_wise_dates)"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-row>
                <v-row>
                  <canvas id="gender_wise_beneficiary"></canvas>
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
                      v-model="gender_Wise_beneficiary.program_id"
                      @input="GetGenderWiseBeneficiaries($event)"
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
                  <v-col cols="12">
                    <label style="color: #1976d2">
                      <span>
                        {{
                          $t("Year Wise Number of Waiting list of Beneficiary")
                        }}
                      </span>
                    </label></v-col
                  >
                </v-row>

                <v-row class="ml-1 mr-1">
                  <v-menu
                    ref="menu3"
                    v-model="menu3"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="dateRangeTextOnWaitingBen"
                        :value="formattedDates"
                        :append-icon="menu3 ? 'mdi-calendar' : 'mdi-calendar'"
                        :label="$t('Enter Start & End Date')"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="wiaiting_wise_dates"
                      :range="[wiaiting_wise_dates[0], wiaiting_wise_dates[1]]"
                      no-title
                      scrollable
                      @input="onChangeWaitingBeneficiary($event)"
                    >
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="menu3 = false">
                        Cancel
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.menu3.save(wiaiting_wise_dates)"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-row>
                <v-row>
                  <canvas height="300" id="year_wise_waiting_ben"></canvas>
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
                      v-model="waiting_beneficiary.program_id"
                      @input="GetWaitingBeneficiaries($event)"
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
                  <v-col cols="12" lg="5" md="5" class="mt-4">
                    <label style="color: #1976d2">
                      <span>
                        {{ $t("Program Wise Beneficiary") }}
                      </span>
                    </label></v-col
                  >
                  <v-col cols="7" lg="7" md="7">
                    <v-menu
                      ref="menu4"
                      v-model="menu4"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="dateRangeTextOnProgramWiseBen"
                          :value="formattedDates"
                          :append-icon="menu4 ? 'mdi-calendar' : 'mdi-calendar'"
                          :label="$t('Enter Start & End Date')"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="program_wise_dates"
                        :range="[program_wise_dates[0], program_wise_dates[1]]"
                        no-title
                        scrollable
                        @input="onChangeProgramWiseBeneficiary($event)"
                      >
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu4 = false">
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.menu4.save(program_wise_dates)"
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                </v-row>

                <v-row>
                  <canvas id="program_wise_beneficiary"></canvas>
                </v-row>
                <!-- <v-row>
                  <v-col cols="12" lg="4" md="4"> </v-col>
                  <v-col cols="12" lg="8" md="8">
                    <label>
                      <span>
                        {{ $t("Disable Program Allowance") }}
                      </span>
                    </label>
                  </v-col>
                </v-row> -->
                <v-row>
                  <v-col cols="12" lg="4" md="4"> </v-col>

                  <v-col cols="12" lg="8" md="8" class="mt-2">
                    <v-autocomplete
                      class="mr-5"
                      :items="programs"
                      :label="$t('Programs')"
                      dense
                      item-text="name_en"
                      item-value="id"
                      v-model="program_wise_beneficiary.program_id"
                      @input="GetProgramWiseBeneficiaries($event)"
                    ></v-autocomplete>
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
                  <v-col cols="12" lg="5" md="5" class="mt-4">
                    <label style="color: #1976d2">
                      <span>
                        {{ $t("Age & Program Wise Beneficiary") }}
                      </span>
                    </label></v-col
                  >
                  <v-col cols="7" lg="7" md="7">
                    <v-menu
                      ref="menu5"
                      v-model="menu5"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="dateRangeTextOnAgeAndProgramWiseBen"
                          :value="formattedDates"
                          :append-icon="menu5 ? 'mdi-calendar' : 'mdi-calendar'"
                          :label="$t('Enter Start & End Date')"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="age_and_program_wise_dates"
                        :range="[
                          age_and_program_wise_dates[0],
                          age_and_program_wise_dates[1],
                        ]"
                        no-title
                        scrollable
                        @input="onChangeAgeAndProgramWiseBeneficiary($event)"
                      >
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu5 = false">
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.menu5.save(age_and_program_wise_dates)"
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                </v-row>
                <v-row>
                  <canvas id="age_program_wise_beneficiary"></canvas>
                </v-row>

                <v-row>
                  <v-col cols="12" lg="6" md="6" class="mt-2">
                    <v-autocomplete
                      class="mr-5"
                      :items="programs"
                      :label="$t('Age')"
                      dense
                      item-text="name_en"
                      item-value="id"
                    ></v-autocomplete>
                  </v-col>

                  <v-col cols="12" lg="6" md="6" class="mt-2">
                    <v-autocomplete
                      class="mr-5"
                      :items="programs"
                      :label="$t('Programs')"
                      dense
                      item-text="name_en"
                      item-value="id"
                      v-model="age_and_program_wise_beneficiary.program_id"
                      @input="GetAgeAndProgramWiseBeneficiaries($event)"
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
                      v-model="shifted_beneficiary.to_program_id"
                      @input="GetShiftedBeneficiaries($event)"
                    ></v-autocomplete>
                    <v-autocomplete
                      class="mr-5"
                      :items="programs"
                      :label="$t('From Program')"
                      dense
                      item-text="name_en"
                      item-value="id"
                      v-model="shifted_beneficiary.from_program_id"
                      @input="GetShiftedBeneficiaries($event)"
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="6" lg="6">
                    <v-menu
                      ref="menu6"
                      v-model="menu6"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="dateRangeTextShiftedBen"
                          :value="formattedDates"
                          :append-icon="menu6 ? 'mdi-calendar' : 'mdi-calendar'"
                          :label="$t('Enter Start & End Date')"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="shifted_dates"
                        :range="[shifted_dates[0], shifted_dates[1]]"
                        no-title
                        scrollable
                        @input="onChangeShiftedBeneficiary($event)"
                      >
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu6 = false">
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.menu6.save(shifted_dates)"
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
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
import ChartDataLabels from "chartjs-plugin-datalabels";
Chart.register(ChartDataLabels);
extend("required", required);
import Spinner from "@/components/Common/Spinner.vue";
export default {
  name: "Dashboard",
  title: "CTM - Beneficiary Dashboard",
  data() {
    return {
      program_location_wise_ben: [],
      year_wise_waiting_ben: [
        { year: "2019", value: 1200, waiting: 600 },
        { year: "2020", value: 1900, waiting: 1000 },
        { year: "2021", value: 1000, waiting: 500 },
        { year: "2022", value: 2200, waiting: 1100 },
        { year: "2023", value: 2800, waiting: 1400 },
        { year: "2024", value: 900, waiting: 500 },
      ],

      program_wise_ben: [
        { year: 2010, beneficiaries: 10000 },
        { year: 2011, beneficiaries: 20000 },
        { year: 2012, beneficiaries: 12000 },
        { year: 2013, beneficiaries: 8000 },
        { year: 2011, beneficiaries: 6000 },
        { year: 2012, beneficiaries: 28000 },
        { year: 2013, beneficiaries: 19000 },
      ],
      age_and_program_wise_ben: [
        { age: "22-35", beneficiaries: 10000 },
        { age: "36-45", beneficiaries: 20000 },
        { age: "46-55", beneficiaries: 12000 },
        { age: "56-65", beneficiaries: 8000 },
        { age: "66-75", beneficiaries: 6000 },
        { age: "76-85", beneficiaries: 28000 },
        { age: "86-95", beneficiaries: 19000 },
      ],
      shifted_ben: [
        { year: 2010, beneficiaries: 10000 },
        { year: 2011, beneficiaries: 20000 },
        { year: 2012, beneficiaries: 12000 },
        { year: 2013, beneficiaries: 8000 },
        { year: 2011, beneficiaries: 6000 },
        { year: 2012, beneficiaries: 28000 },
        { year: 2013, beneficiaries: 19000 },
      ],
      gender_wise_ben: [],
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
      beneficiaries: [],
      genders: ["Male", "Female", "3rd Gender"],
      program_name: "",
      //for program & location wise chart
      program_location_chart: null,
      program_location_Wise_beneficiary: {
        program_id: null,
      },
      dates: [],
      //for gender wise chart
      gender_wise_chart: null,
      gender_Wise_beneficiary: {
        program_id: null,
      },
      gender_wise_dates: [],
      waiting_beneficiary: {
        program_id: null,
      },
      wiaiting_wise_dates: [],

      program_wise_beneficiary: {
        program_id: null,
      },
      program_wise_dates: [],

      age_and_program_wise_beneficiary: {
        program_id: null,
      },
      age_and_program_wise_dates: [],

      shifted_beneficiary: {
        from_program_id: null,
        to_program_id: null,
      },
      shifted_dates: [],

      // dates: ["2019-09-10", "2019-09-20"],
      // dates: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      //   .toISOString()
      //   .substr(0, 10),
      // menu: false,
      // modal: false,
      // menu2: false,

      isLoading: false,
    };
  },
  components: {
    ValidationProvider,
    ValidationObserver,
    Spinner,
  },
  computed: {
    dateRangeText() {
      return this.dates.join(" ~ ");
    },
    dateRangeTextOnGender() {
      return this.gender_wise_dates.join(" ~ ");
    },
    dateRangeTextOnWaitingBen() {
      return this.wiaiting_wise_dates.join(" ~ ");
    },
    dateRangeTextOnProgramWiseBen() {
      return this.program_wise_dates.join(" ~ ");
    },
    dateRangeTextOnAgeAndProgramWiseBen() {
      return this.age_and_program_wise_dates.join(" ~ ");
    },
    dateRangeTextShiftedBen() {
      return this.shifted_dates.join(" ~ ");
    },
  },
  methods: {
    async GetAllProgram() {
      try {
        await this.$axios
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
    async GetTotalBeneficiaries() {
      try {
        await this.$axios
          .get("/admin/beneficiary-dashboard/getTotalBeneficiaries", {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((result) => {
            console.log(result, "beneficiaries__");
            this.beneficiaries = result.data.data;
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
      this.isLoading = true;
      const queryParams = {
        program_id: this.program_location_Wise_beneficiary.program_id,
        to_date: this.dates[0],
        from_date: this.dates[1],
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
          console.log("results_total__", this.total);

          this.program_location_chart.data.labels =
            this.program_location_wise_ben.map((row) => row.division);
          this.program_location_chart.data.percentage =
            this.program_location_wise_ben.map((row) => row.percentage);
          this.program_location_chart.data.datasets[0].data =
            this.program_location_wise_ben.map((row) => row.value);
          this.program_location_chart.update();

          this.isLoading = false;
        });
    },
    onChangeProgramAndLocationWiseBeneficiary(event) {
      if (this.dates.length < 2) {
        return;
      }
      this.GetLocationWiseBeneficiaries();
    },
    async GetGenderWiseBeneficiaries() {
      const queryParams = {
        program_id: this.gender_Wise_beneficiary.program_id,
        to_date: this.gender_wise_dates[0],
        from_date: this.gender_wise_dates[1],
      };
      await this.$axios
        .get("/admin/beneficiary-dashboard/getGenderWiseBeneficiaries", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
          params: queryParams,
        })
        .then((result) => {
          this.gender_wise_ben = result.data.data;
          console.log("results_total__", this.gender_wise_ben);

          this.gender_wise_chart.data.labels = this.gender_wise_ben.map(
            (row) => row.gender
          );
          this.gender_wise_chart.data.percentage = this.gender_wise_ben.map(
            (row) => row.percentage
          );
          this.gender_wise_chart.data.datasets[0].data =
            this.gender_wise_ben.map((row) => row.value);
          this.gender_wise_chart.update();
        });
    },
    onChangeGenderWiseBeneficiary(event) {
      if (this.gender_wise_dates.length < 2) {
        return;
      }
      this.GetGenderWiseBeneficiaries();
    },
    async GetWaitingBeneficiaries() {
      const queryParams = {
        program_id: this.waiting_beneficiary.program_id,
        to_date: this.wiaiting_wise_dates[0],
        from_date: this.wiaiting_wise_dates[1],
      };
      await this.$axios
        .get("/admin/beneficiary-dashboard/getGenderWiseBeneficiaries", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
          params: queryParams,
        })
        .then((result) => {
          console.log("result__", result.data.data);
          // this.gender_wise_ben = result.data.data;
          // console.log("results_total__", this.gender_wise_ben);
          // this.gender_wise_chart.data.labels = this.gender_wise_ben.map(
          //   (row) => row.gender
          // );
          // this.gender_wise_chart.data.percentage = this.gender_wise_ben.map(
          //   (row) => row.percentage
          // );
          // this.gender_wise_chart.data.datasets[0].data =
          //   this.gender_wise_ben.map((row) => row.value);
          // this.gender_wise_chart.update();
        });
    },
    onChangeWaitingBeneficiary(event) {
      if (this.wiaiting_wise_dates.length < 2) {
        return;
      }
      // this.GetWaitingBeneficiaries();
    },
    async GetProgramWiseBeneficiaries() {
      const queryParams = {
        program_id: this.program_wise_beneficiary.program_id,
        to_date: this.program_wise_dates[0],
        from_date: this.program_wise_dates[1],
      };
      await this.$axios
        .get("/admin/beneficiary-dashboard/getGenderWiseBeneficiaries", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
          params: queryParams,
        })
        .then((result) => {
          console.log("result__", result.data.data);
          // this.gender_wise_ben = result.data.data;
          // console.log("results_total__", this.gender_wise_ben);
          // this.gender_wise_chart.data.labels = this.gender_wise_ben.map(
          //   (row) => row.gender
          // );
          // this.gender_wise_chart.data.percentage = this.gender_wise_ben.map(
          //   (row) => row.percentage
          // );
          // this.gender_wise_chart.data.datasets[0].data =
          //   this.gender_wise_ben.map((row) => row.value);
          // this.gender_wise_chart.update();
        });
    },
    onChangeProgramWiseBeneficiary(event) {
      if (this.program_wise_dates.length < 2) {
        return;
      }
      // this.GetWaitingBeneficiaries();
    },
    async GetAgeAndProgramWiseBeneficiaries() {
      const queryParams = {
        program_id: this.age_and_program_wise_beneficiary.program_id,
        to_date: this.age_and_program_wise_dates[0],
        from_date: this.age_and_program_wise_dates[1],
      };
      await this.$axios
        .get("/admin/beneficiary-dashboard/getGenderWiseBeneficiaries", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
          params: queryParams,
        })
        .then((result) => {
          console.log("result__", result.data.data);
          // this.gender_wise_ben = result.data.data;
          // console.log("results_total__", this.gender_wise_ben);
          // this.gender_wise_chart.data.labels = this.gender_wise_ben.map(
          //   (row) => row.gender
          // );
          // this.gender_wise_chart.data.percentage = this.gender_wise_ben.map(
          //   (row) => row.percentage
          // );
          // this.gender_wise_chart.data.datasets[0].data =
          //   this.gender_wise_ben.map((row) => row.value);
          // this.gender_wise_chart.update();
        });
    },
    onChangeAgeAndProgramWiseBeneficiary(event) {
      if (this.age_and_program_wise_dates.length < 2) {
        return;
      }
      // this.GetWaitingBeneficiaries();
    },
    async GetShiftedBeneficiaries() {
      const queryParams = {
        to_program_id: this.shifted_beneficiary.to_program_id,
        from_program_id: this.shifted_beneficiary.from_program_id,
        to_date: this.shifted_dates[0],
        from_date: this.shifted_dates[1],
      };
      await this.$axios
        .get("/admin/beneficiary-dashboard/getGenderWiseBeneficiaries", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
          params: queryParams,
        })
        .then((result) => {
          console.log("result__", result.data.data);
          // this.gender_wise_ben = result.data.data;
          // console.log("results_total__", this.gender_wise_ben);
          // this.gender_wise_chart.data.labels = this.gender_wise_ben.map(
          //   (row) => row.gender
          // );
          // this.gender_wise_chart.data.percentage = this.gender_wise_ben.map(
          //   (row) => row.percentage
          // );
          // this.gender_wise_chart.data.datasets[0].data =
          //   this.gender_wise_ben.map((row) => row.value);
          // this.gender_wise_chart.update();
        });
    },
    onChangeShiftedBeneficiary(event) {
      if (this.shifted_dates.length < 2) {
        return;
      }
      // this.GetWaitingBeneficiaries();
    },

    customDateRangeRule(value) {
      alert(value);
      if (!value || value.length !== 2) {
        return "Please select a valid date range";
      }

      const startDate = value[0];
      const endDate = value[1];

      if (!startDate || !endDate) {
        return "Please select both start and end dates";
      }

      if (endDate < startDate) {
        return "End date must be after start date";
      }

      // Additional custom validation logic if needed

      return true; // Validation passed
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
    this.GetLocationWiseBeneficiaries();
    this.GetGenderWiseBeneficiaries();
    this.GetTotalBeneficiaries();
    this.GetAllProgram();
    // this.GetWaitingBeneficiaries();
    // this.GetProgramWiseBeneficiaries();
    // this.GetAgeAndProgramWiseBeneficiaries();

    // program_location_wise_chart
    const ctxpie = document.getElementById("program_location_wise_chart");
    this.program_location_chart = new Chart(ctxpie, {
      type: "pie",
      data: {
        labels: this.program_location_wise_ben.map((row) => row.division),
        percentage: this.program_location_wise_ben.map((row) => row.percentage),
        datasets: [
          {
            label: "Values::",
            data: this.program_location_wise_ben.map((row) => row.value),
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
          // title: {
          //   display: true,
          //   text: "Custom Chart Title",
          // },
          datalabels: {
            color: "#ffff",
            formatter: function (value, context) {
              return (
                value +
                ", " +
                context.chart.data.percentage[context.dataIndex] +
                "%"
              );
            },
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
    const ctxpie2 = document.getElementById("gender_wise_beneficiary");
    this.gender_wise_chart = new Chart(ctxpie2, {
      type: "pie",
      data: {
        labels: this.gender_wise_ben.map((row) => row.gender),

        percentage: this.gender_wise_ben.map((row) => row.percentage),
        datasets: [
          {
            label: "Values:: ",
            data: this.gender_wise_ben.map((row) => row.value),
            backgroundColor: ["Green", "Purple", "Blue"],
            // hoverBackgroundColor: [
            //   "rgba(255, 99, 132, 0.8)",
            //   "rgba(54, 162, 235, 0.8)",
            //   "rgba(255, 206, 86, 0.8)",
            // ],
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: true,
            position: "right",
            align: "center",
            labels: {
              // color: "rgb(255, 99, 132)",
            },
          },
          datalabels: {
            color: "#ffff",
            formatter: function (value, context) {
              return (
                value +
                ", " +
                context.chart.data.percentage[context.dataIndex] +
                "%"
              );
            },
            labels: {
              title: {
                font: {
                  weight: "bold",
                },
              },
            },
          },
        },
      },
    });
    const ctx = document.getElementById("year_wise_waiting_ben");
    new Chart(ctx, {
      data: {
        labels: this.year_wise_waiting_ben.map((row) => row.year),

        datasets: [
          {
            // barPercentage: 0.5,
            barThickness: 13,
            maxBarThickness: 10,
            // minBarLength: 2,

            type: "bar",
            label: "Waiting Beneficiaries",
            data: this.year_wise_waiting_ben.map((row) => row.waiting),
            backgroundColor: ["rgba(0, 200, 255, 1)"],
            borderWidth: 1,
            datalabels: {
              labels: {
                title: false,
              },
            },
          },
          {
            // barPercentage: 0.5,
            barThickness: 13,
            maxBarThickness: 10,
            // minBarLength: 2,

            type: "bar",
            label: "Total Beneficiaries",
            data: this.year_wise_waiting_ben.map((row) => row.value),
            borderWidth: 1,
            backgroundColor: ["rgba(0, 92, 255, 1)"],
            datalabels: {
              labels: {
                title: {
                  // color: "red",
                  anchor: "end",
                  align: "top",
                  display: "true",
                  font: {
                    // weight: "bold",
                  },
                },
              },
            },
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
        labels: this.program_wise_ben.map((row) => row.year),
        datasets: [
          {
            barPercentage: 0.5,
            barThickness: 25,
            maxBarThickness: 30,
            minBarLength: 2,
            label: "Program Wise Beneficiary",
            data: this.program_wise_ben.map((row) => row.beneficiaries),
            backgroundColor: [
              "rgba(0, 200, 255, 1)",
              "rgba(0, 92, 255, 1",
              "rgba(255, 128, 148, 1)",
              "rgba(188, 35, 199, 1)",
            ],
            // borderColor: [
            //   "rgb(255, 99, 132)",
            //   "rgb(255, 159, 64)",
            //   "rgb(255, 205, 86)",
            //   "rgb(75, 192, 192)",
            //   "rgb(54, 162, 235)",
            //   "rgb(153, 102, 255)",
            //   "rgb(201, 203, 207)",
            // ],
            borderWidth: 1,
            datalabels: {
              labels: {
                title: {
                  // color: "red",
                  anchor: "end",
                  align: "top",
                  display: "true",
                  font: {
                    // weight: "bold",
                  },
                },
              },
            },
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
    new Chart(document.getElementById("age_program_wise_beneficiary"), {
      type: "line",
      data: {
        labels: this.age_and_program_wise_ben.map((row) => row.age),
        datasets: [
          {
            type: "line",
            label: "Line Dataset",
            data: this.age_and_program_wise_ben.map((row) => row.beneficiaries),
            borderColor: "rgba(0, 92, 255, 1",
            // fill: false,
            // barThickness: 10,
            tension: 0.1,
            datalabels: {
              labels: {
                title: {
                  // color: "red",
                  anchor: "end",
                  align: "top",
                  display: "true",
                  font: {
                    // weight: "bold",
                  },
                },
              },
            },
          },
          {
            type: "bar",
            label: "Bar Dataset",
            data: this.age_and_program_wise_ben.map((row) => row.beneficiaries),
            barPercentage: 0.5,
            barThickness: 6,
            maxBarThickness: 8,
            minBarLength: 2,
            backgroundColor: [
              "rgba(0, 200, 255, 1)",
              "rgba(0, 92, 255, 1",
              "rgba(255, 128, 148, 1)",
              "rgba(188, 35, 199, 1)",
            ],
            datalabels: {
              labels: {
                title: false,
              },
            },
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            labels: false,
          },
        },
      },
      // options: {
      //   scales: {
      //     x: {
      //       stacked: true,
      //     },
      //   },
      // },
    });

    new Chart(document.getElementById("shifted_beneficiary"), {
      data: {
        // labels: Utils.months({ count: 7 }),
        labels: this.shifted_ben.map((row) => row.year),
        datasets: [
          {
            type: "line",
            label: "Line Dataset",
            data: this.shifted_ben.map((row) => row.beneficiaries),
            fill: false,
            borderColor: "rgba(0, 92, 255, 1",
            tension: 0.1,
            datalabels: {
              labels: {
                title: false,
              },
            },
          },
          {
            type: "bar",
            label: "Bar Dataset",
            data: this.shifted_ben.map((row) => row.beneficiaries),
            barPercentage: 0.5,
            barThickness: 6,
            maxBarThickness: 8,
            minBarLength: 2,
            backgroundColor: [
              "rgba(0, 200, 255, 1)",
              "rgba(0, 92, 255, 1",
              "rgba(255, 128, 148, 1)",
              "rgba(188, 35, 199, 1)",
            ],
            datalabels: {
              labels: {
                title: {
                  // color: "red",
                  anchor: "end",
                  align: "top",
                  display: "true",
                  font: {
                    // weight: "bold",
                  },
                },
              },
            },
          },
        ],
      },
    });
  },
};
</script>