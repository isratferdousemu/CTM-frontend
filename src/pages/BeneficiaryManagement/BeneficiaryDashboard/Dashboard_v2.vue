<template>
  <v-container fluid>
    <!-- header card start -->
    <v-table>
      <thead>
        <tr>
          <td width="20%">
            <v-card
              elevation="2"
              rounded="xl"
              class="mr-2"
              height="100%"
              @click="GoBenInfoList()"
            >
              <v-card-title>
                <v-row>
                  <v-avatar color="#cce6ff" size="30" class="mt-7 ml-5">
                    <v-icon color="primary">mdi mdi-account-multiple</v-icon>
                  </v-avatar>

                  <v-col>
                    <v-card-text style="word-break: break-word">
                      <div class="font-weight-bold d-flex">
                        {{
                          $t(
                            "container.beneficiary_management.dashboard.total_beneficiary"
                          )
                        }}
                      </div>
                      <div class="headline font-weight-bold d-flex">
                        {{
                          beneficiaries.totalBeneficiaries
                            ? this.$i18n.locale == "en"
                              ? beneficiaries.totalBeneficiaries
                              : this.$helpers.englishToBangla(
                                  beneficiaries.totalBeneficiaries
                                )
                            : null
                        }}
                      </div>
                    </v-card-text>
                  </v-col>
                </v-row>
              </v-card-title>
            </v-card>
          </td>
          <td width="20%">
            <v-card
              max-height="auto"
              elevation="2"
              rounded="xl"
              class="ml-2 mr-2"
              height="100%"
              @click="GoActiveBenInfoList()"
            >
              <v-card-title>
                <v-row>
                  <v-avatar color="#cce6ff" size="30" class="mt-7 ml-5">
                    <v-icon color="primary">mdi-account</v-icon>
                  </v-avatar>

                  <v-col>
                    <v-card-text style="word-break: break-word">
                      <div class="font-weight-bold d-flex">
                        {{
                          $t(
                            "container.beneficiary_management.dashboard.active_beneficiary"
                          )
                        }}
                      </div>
                      <div class="headline font-weight-bold d-flex">
                        {{
                          beneficiaries.totalActiveBeneficiaries
                            ? this.$i18n.locale == "en"
                              ? beneficiaries.totalActiveBeneficiaries
                              : this.$helpers.englishToBangla(
                                  beneficiaries.totalActiveBeneficiaries
                                )
                            : null
                        }}
                      </div>
                    </v-card-text>
                  </v-col>
                </v-row>
              </v-card-title>
            </v-card>
          </td>
          <td width="20%">
            <v-card
              max-height="auto"
              elevation="2"
              rounded="xl"
              class="ml-2 mr-2"
              height="100%"
              @click="GoInActiveBenInfoList()"
            >
              <v-card-title>
                <v-row>
                  <v-avatar color="#cce6ff" size="30" class="mt-7 ml-5">
                    <v-icon color="primary">mdi mdi-account-off</v-icon>
                  </v-avatar>

                  <v-col>
                    <v-card-text>
                      <div
                        class="font-weight-bold d-flex"
                        style="word-break: break-word"
                      >
                        {{
                          $t(
                            "container.beneficiary_management.dashboard.inactive_beneficiary"
                          )
                        }}
                      </div>
                      <div class="headline font-weight-bold d-flex">
                        {{
                          beneficiaries.totalInactiveBeneficiaries
                            ? this.$i18n.locale == "en"
                              ? beneficiaries.totalInactiveBeneficiaries
                              : this.$helpers.englishToBangla(
                                  beneficiaries.totalInactiveBeneficiaries
                                )
                            : null
                        }}
                      </div>
                    </v-card-text>
                  </v-col>
                </v-row>
              </v-card-title>
            </v-card>
          </td>
          <td width="20%">
            <v-card
              max-height="auto"
              elevation="2"
              rounded="xl"
              class="ml-2 mr-2"
              height="100%"
              @click="GoWaitingBenInfoList()"
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
                      <div class="font-weight-bold d-flex">
                        {{
                          $t(
                            "container.beneficiary_management.dashboard.waitining_beneficiary"
                          )
                        }}
                      </div>
                      <div class="headline font-weight-bold d-flex">
                        {{
                          beneficiaries.totalWaitingBeneficiaries
                            ? this.$i18n.locale == "en"
                              ? beneficiaries.totalWaitingBeneficiaries
                              : this.$helpers.englishToBangla(
                                  beneficiaries.totalWaitingBeneficiaries
                                )
                            : null
                        }}
                      </div>
                    </v-card-text>
                  </v-col>
                </v-row>
              </v-card-title>
            </v-card>
          </td>
          <td width="20%">
            <v-card
              height="100%"
              max-height="auto"
              elevation="2"
              rounded="xl"
              class="ml-2"
              @click="GoReplaceBenInfoList()"
            >
              <v-card-title>
                <v-row>
                  <v-avatar color="#cce6ff" size="30" class="mt-7 ml-5">
                    <v-icon color="primary">mdi mdi-account-switch</v-icon>
                  </v-avatar>

                  <v-col>
                    <v-card-text style="word-break: break-word">
                      <div class="font-weight-bold d-flex">
                        {{
                          $t(
                            "container.beneficiary_management.dashboard.replaced_beneficiary"
                          )
                        }}
                      </div>
                      <div class="headline font-weight-bold d-flex">
                        {{
                          beneficiaries.totalReplacedBeneficiaries
                            ? this.$i18n.locale == "en"
                              ? beneficiaries.totalReplacedBeneficiaries
                              : this.$helpers.englishToBangla(
                                  beneficiaries.totalReplacedBeneficiaries
                                )
                            : null
                        }}
                      </div>
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
      <v-col cols="12" md="6" lg="6">
        <v-card :loading="isLoadingProgramLocation" height="100%">
          <v-card-text>
            <V-row>
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
                            :append-icon="
                              menu ? 'mdi-calendar' : 'mdi-calendar'
                            "
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
                          $t(
                            'container.beneficiary_management.dashboard.select_program'
                          )
                        "
                        :items="programs"
                        v-model="program_location_Wise_beneficiary.program_id"
                        :item-text="getItemText"
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
            </V-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" lg="6">
        <v-card :loading="isLoadingGender" height="100%">
          <v-card-text>
            <V-row>
              <v-col>
                <v-row>
                  <v-col cols="12">
                    <label style="color: #1976d2">
                      <span>
                        {{
                          $t(
                            "container.beneficiary_management.dashboard.gender_wise_ben"
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
                            :append-icon="
                              menu2 ? 'mdi-calendar' : 'mdi-calendar'
                            "
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
                          v-model="gender_wise_dates"
                          :range="[gender_wise_dates[0], gender_wise_dates[1]]"
                          no-title
                          scrollable
                        >
                          <v-spacer></v-spacer>
                          <v-btn
                            text
                            color="primary"
                            @click="resetDateGenderWiseBeneficiary"
                          >
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="submitDateGenderWiseBeneficiary"
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
                          $t(
                            'container.beneficiary_management.dashboard.select_program'
                          )
                        "
                        :items="programs"
                        v-model="gender_Wise_beneficiary.program_id"
                        :item-text="getItemText"
                        item-value="id"
                        @change="GetGenderWiseBeneficiaries($event)"
                        clearable
                      ></v-select>
                    </v-row>
                  </v-col>
                </v-row>
                <v-row>
                  <canvas id="gender_wise_beneficiary"></canvas>
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
        <v-card :loading="isLoadingWaiting" height="100%">
          <v-card-text>
            <V-row>
              <v-col>
                <v-row>
                  <v-col cols="12">
                    <label style="color: #1976d2">
                      <span>
                        {{
                          $t(
                            "container.beneficiary_management.dashboard.year_wise_waiting_ben"
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
                            :append-icon="
                              menu3 ? 'mdi-calendar' : 'mdi-calendar'
                            "
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
                          v-model="wiaiting_wise_dates"
                          :range="[
                            wiaiting_wise_dates[0],
                            wiaiting_wise_dates[1],
                          ]"
                          no-title
                          scrollable
                        >
                          <v-spacer></v-spacer>
                          <v-btn
                            text
                            color="primary"
                            @click="resetDateWaitingWiseBeneficiary"
                          >
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="submitDateWaitingBeneficiary"
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
                          $t(
                            'container.beneficiary_management.dashboard.select_program'
                          )
                        "
                        :items="programs"
                        v-model="waiting_beneficiary.program_id"
                        :item-text="getItemText"
                        item-value="id"
                        @change="GetWaitingBeneficiaries($event)"
                        clearable
                      ></v-select>
                    </v-row>
                  </v-col>
                </v-row>
                <v-row>
                  <canvas height="300" id="year_wise_waiting_ben"></canvas>
                </v-row>
              </v-col>
            </V-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" lg="6">
        <v-card :loading="isLoadingProgram" height="100%">
          <v-card-text>
            <V-row>
              <v-col>
                <v-row>
                  <v-col cols="12">
                    <label style="color: #1976d2">
                      <span>
                        {{
                          $t(
                            "container.beneficiary_management.dashboard.program_wise_ben"
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
                            :append-icon="
                              menu4 ? 'mdi-calendar' : 'mdi-calendar'
                            "
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
                          v-model="program_wise_dates"
                          :range="[
                            program_wise_dates[0],
                            program_wise_dates[1],
                          ]"
                          no-title
                          scrollable
                        >
                          <v-spacer></v-spacer>
                          <v-btn
                            text
                            color="primary"
                            @click="resetDateProgramWiseBeneficiary"
                          >
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="submitDateProgramBeneficiary"
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
                          $t(
                            'container.beneficiary_management.dashboard.select_program'
                          )
                        "
                        :items="programs"
                        v-model="program_wise_beneficiary.program_id"
                        :item-text="getItemText"
                        item-value="id"
                        @change="GetProgramWiseBeneficiaries($event)"
                        clearable
                      ></v-select>
                    </v-row>
                  </v-col>
                </v-row>

                <v-row>
                  <canvas id="program_wise_beneficiary"></canvas>
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
        <v-card :loading="isLoadingAgeProgram" height="100%">
          <v-card-text>
            <V-row>
              <v-col>
                <v-row>
                  <v-col cols="12">
                    <label style="color: #1976d2">
                      <span>
                        {{
                          $t(
                            "container.beneficiary_management.dashboard.age_and_program_wise_ben"
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
                            :append-icon="
                              menu5 ? 'mdi-calendar' : 'mdi-calendar'
                            "
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
                          v-model="age_and_program_wise_dates"
                          :range="[
                            age_and_program_wise_dates[0],
                            age_and_program_wise_dates[1],
                          ]"
                          no-title
                          scrollable
                        >
                          <v-spacer></v-spacer>
                          <v-btn
                            text
                            color="primary"
                            @click="resetDateAgeAndProgramWiseBeneficiary"
                          >
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="submitDateAgeAndProgramBeneficiary"
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
                          $t(
                            'container.beneficiary_management.dashboard.select_program'
                          )
                        "
                        :items="programs"
                        v-model="age_and_program_wise_beneficiary.program_id"
                        :item-text="getItemText"
                        item-value="id"
                        @change="GetAgeAndProgramWiseBeneficiaries($event)"
                        clearable
                      ></v-select>
                    </v-row>
                  </v-col>
                </v-row>
                <v-row>
                  <canvas id="age_program_wise_beneficiary"></canvas>
                </v-row>
              </v-col>
            </V-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" lg="6">
        <v-card :loading="isLoadingShifted" height="100%">
          <v-card-text>
            <V-row>
              <v-col>
                <v-row>
                  <v-col cols="6" class="mt-2">
                    <label style="color: #1976d2">
                      <span>
                        {{
                          $t(
                            "container.beneficiary_management.dashboard.number_of_ben_program_shifted"
                          )
                        }}
                      </span>
                    </label>
                  </v-col>
                  <v-col cols="6">
                    <v-row class="mr-1">
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
                            :append-icon="
                              menu6 ? 'mdi-calendar' : 'mdi-calendar'
                            "
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
                          v-model="shifted_dates"
                          :range="[shifted_dates[0], shifted_dates[1]]"
                          no-title
                          scrollable
                        >
                          <v-spacer></v-spacer>
                          <v-btn
                            text
                            color="primary"
                            @click="resetDateShiftedWiseBeneficiary"
                          >
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="submitDateShiftedBeneficiary"
                          >
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-menu>
                    </v-row>
                  </v-col>
                </v-row>
                <v-row class="ml-1">
                  <v-col cols="6">
                    <v-row>
                      <v-autocomplete
                        class="mr-5"
                        :items="programs"
                        :label="
                          $t(
                            'container.beneficiary_management.dashboard.to_program_name'
                          )
                        "
                        dense
                        :item-text="getItemText"
                        item-value="id"
                        v-model="shifted_beneficiary.to_program_id"
                        @input="GetShiftedBeneficiaries($event)"
                        clearable
                      ></v-autocomplete>
                    </v-row>
                  </v-col>
                  <v-col cols="6">
                    <v-row>
                      <v-autocomplete
                        class="mr-5"
                        :items="programs"
                        :label="
                          $t(
                            'container.beneficiary_management.dashboard.from_program_name'
                          )
                        "
                        dense
                        :item-text="getItemText"
                        item-value="id"
                        v-model="shifted_beneficiary.from_program_id"
                        @input="GetShiftedBeneficiaries($event)"
                        clearable
                      ></v-autocomplete>
                    </v-row>
                  </v-col>
                </v-row>

                <v-row>
                  <canvas id="shifted_beneficiary"></canvas>
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
      isLoadingProgramLocation: false,
      isLoadingGender: false,
      isLoadingWaiting: false,
      isLoadingProgram: false,
      isLoadingAgeProgram: false,
      isLoadingShifted: false,
      //for program & location wise chart
      program_location_chart: null,
      program_location_Wise_beneficiary: {
        program_id: null,
      },
      dates: [],
      menu: false,

      //for gender wise chart
      gender_wise_ben: [],
      gender_wise_chart: null,
      gender_Wise_beneficiary: {
        program_id: null,
      },
      gender_wise_dates: [],
      menu2: false,

      //for Year Wise Number of Waiting list of Beneficiary chart
      year_wise_waiting_ben: [],
      year_wise_waiting_chart: null,
      waiting_beneficiary: {
        program_id: null,
      },
      wiaiting_wise_dates: [],
      menu3: false,

      //for Program Wise Beneficiary chart
      program_wise_ben: [],
      program_wise_ben_chart: null,
      program_wise_beneficiary: {
        program_id: null,
      },
      program_wise_dates: [],
      menu4: false,

      //for Age & Program Wise Beneficiary chart
      age_and_program_wise_ben: [],
      age_and_program_wise_ben_chart: null,
      age_and_program_wise_beneficiary: {
        program_id: null,
      },
      age_and_program_wise_dates: [],
      menu5: false,

      //for Shifted Beneficiary chart
      shifted_ben: [],
      shifted_ben_chart: null,
      shifted_beneficiary: {
        from_program_id: null,
        to_program_id: null,
      },
      shifted_dates: [],
      menu6: false,
    };
  },
  components: {
    ValidationProvider,
    ValidationObserver,
    Spinner,
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
    language: {
      get() {
        return this.$store.getters.getAppLanguage;
      },
    },
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
          this.isLoadingProgramLocation = false;
        });
      this.CreateLocationWiseBeneficiariesChart();
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
    async GetGenderWiseBeneficiaries() {
      this.isLoadingGender = true;
      const queryParams = {
        program_id: this.gender_Wise_beneficiary.program_id,
        from_date: this.gender_wise_dates[0],
        to_date: this.gender_wise_dates[1],
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
          this.CreateGenderWiseBeneficiariesChart();
          this.isLoadingGender = false;
        });
    },
    submitDateGenderWiseBeneficiary() {
      this.menu2 = false;
      if (this.gender_wise_dates.length < 2) {
        return;
      }
      this.GetGenderWiseBeneficiaries();
    },
    resetDateGenderWiseBeneficiary() {
      this.gender_wise_dates = [];
      this.menu2 = false;
      this.GetGenderWiseBeneficiaries();
    },
    async GetWaitingBeneficiaries() {
      this.isLoadingWaiting = true;
      const queryParams = {
        program_id: this.waiting_beneficiary.program_id,
        from_date: this.wiaiting_wise_dates[0],
        to_date: this.wiaiting_wise_dates[1],
      };
      await this.$axios
        .get("/admin/beneficiary-dashboard/getYearWiseWaitingBeneficiaries", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
          params: queryParams,
        })
        .then((result) => {
          console.log("result__", result.data.data);
          this.year_wise_waiting_ben = result.data.data;
          this.CreateWaitingBeneficiariesChart();
          this.isLoadingWaiting = false;
        });
    },
    submitDateWaitingBeneficiary() {
      this.menu3 = false;
      if (this.wiaiting_wise_dates.length < 2) {
        return;
      }
      this.GetWaitingBeneficiaries();
    },
    resetDateWaitingWiseBeneficiary() {
      this.wiaiting_wise_dates = [];
      this.menu3 = false;
      this.GetWaitingBeneficiaries();
    },
    async GetProgramWiseBeneficiaries() {
      this.isLoadingProgram = true;
      const queryParams = {
        program_id: this.program_wise_beneficiary.program_id,
        from_date: this.program_wise_dates[0],
        to_date: this.program_wise_dates[1],
      };
      await this.$axios
        .get("/admin/beneficiary-dashboard/getProgramWiseBeneficiaries", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
          params: queryParams,
        })
        .then((result) => {
          this.program_wise_ben = result.data.data;
          this.CreateProgramWiseBeneficiariesChart();
          this.isLoadingProgram = false;
        });
    },
    submitDateProgramBeneficiary() {
      this.menu4 = false;
      if (this.program_wise_dates.length < 2) {
        return;
      }
      this.GetProgramWiseBeneficiaries();
    },
    resetDateProgramWiseBeneficiary() {
      this.program_wise_dates = [];
      this.menu4 = false;
      this.GetProgramWiseBeneficiaries();
    },
    async GetAgeAndProgramWiseBeneficiaries() {
      this.isLoadingAgeProgram = true;
      const queryParams = {
        program_id: this.age_and_program_wise_beneficiary.program_id,
        from_date: this.age_and_program_wise_dates[0],
        to_date: this.age_and_program_wise_dates[1],
      };
      await this.$axios
        .get("/admin/beneficiary-dashboard/getAgeWiseBeneficiaries", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
          params: queryParams,
        })
        .then((result) => {
          this.age_and_program_wise_ben = result.data.data;
          this.CreateAgeAndProgramWiseBeneficiariesChart();
          this.isLoadingAgeProgram = false;
        });
    },
    submitDateAgeAndProgramBeneficiary() {
      this.menu5 = false;
      if (this.age_and_program_wise_dates.length < 2) {
        return;
      }
      this.GetAgeAndProgramWiseBeneficiaries();
    },
    resetDateAgeAndProgramWiseBeneficiary() {
      this.age_and_program_wise_dates = [];
      this.menu5 = false;
      this.GetAgeAndProgramWiseBeneficiaries();
    },
    async GetShiftedBeneficiaries() {
      this.isLoadingShifted = true;
      const queryParams = {
        to_program_id: this.shifted_beneficiary.to_program_id,
        from_program_id: this.shifted_beneficiary.from_program_id,
        from_date: this.shifted_dates[0],
        to_date: this.shifted_dates[1],
      };
      await this.$axios
        .get("/admin/beneficiary-dashboard/getYearWiseProgramShifting", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
          params: queryParams,
        })
        .then((result) => {
          console.log("result__", result.data.data);
          this.shifted_ben = result.data.data;
          this.CreateShiftedBeneficiariesChart();

          this.isLoadingShifted = false;
        });
    },
    submitDateShiftedBeneficiary() {
      this.menu6 = false;
      if (this.shifted_dates.length < 2) {
        return;
      }
      this.GetShiftedBeneficiaries();
    },
    resetDateShiftedWiseBeneficiary() {
      this.shifted_dates = [];
      this.menu6 = false;
      this.GetShiftedBeneficiaries();
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
    generateRandomColor() {
      return "#" + Math.floor(Math.random() * 16777215).toString(16);
    },
    getItemText(item) {
      return this.language === "bn" ? item.name_bn : item.name_en;
    },
    CreateLocationWiseBeneficiariesChart() {
      if (this.program_location_chart) {
        this.program_location_chart.destroy();
      }
      if (this.program_location_wise_ben.length > 0) {
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
                  label: "Values::",
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
                    return (
                      value +
                      ", " +
                      context.chart.data.percentage[context.dataIndex] +
                      "%"
                    );
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
    CreateGenderWiseBeneficiariesChart() {
      if (this.gender_wise_chart) {
        this.gender_wise_chart.destroy();
      }
      this.gender_wise_chart = new Chart(
        document.getElementById("gender_wise_beneficiary"),
        {
          type: "pie",
          data: {
            labels: this.gender_wise_ben.map((row) => row.gender),

            percentage: this.gender_wise_ben.map((row) => row.percentage),
            datasets: [
              {
                label: "Values:: ",
                data: this.gender_wise_ben.map((row) => row.value),
                backgroundColor: this.program_location_wise_ben.map(() =>
                  this.generateRandomColor()
                ),
              },
            ],
          },
          options: {
            plugins: {
              legend: {
                display: true,
                position: "bottom",
                align: "center",
                labels: {
                  // color: "rgb(255, 99, 132)",
                },
              },
              datalabels: {
                color: "#fff",
                fontWeight: "bold",
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
      document.getElementById("gender_wise_beneficiary").style.width = "350px";
      document.getElementById("gender_wise_beneficiary").style.height = "385px";
    },
    CreateWaitingBeneficiariesChart() {
      if (this.year_wise_waiting_chart) {
        this.year_wise_waiting_chart.destroy();
      }
      this.year_wise_waiting_chart = new Chart(
        document.getElementById("year_wise_waiting_ben"),
        {
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
                backgroundColor: this.program_location_wise_ben.map(() =>
                  this.generateRandomColor()
                ),
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
                backgroundColor: this.program_location_wise_ben.map(() =>
                  this.generateRandomColor()
                ),
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
    },
    CreateProgramWiseBeneficiariesChart() {
      if (this.program_wise_ben_chart) {
        this.program_wise_ben_chart.destroy();
      }
      this.program_wise_ben_chart = new Chart(
        document.getElementById("program_wise_beneficiary"),
        {
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
                backgroundColor: this.program_location_wise_ben.map(() =>
                  this.generateRandomColor()
                ),
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
                display: false,
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
    },
    CreateAgeAndProgramWiseBeneficiariesChart() {
      if (this.age_and_program_wise_ben_chart) {
        this.age_and_program_wise_ben_chart.destroy();
      }
      this.age_and_program_wise_ben_chart = new Chart(
        document.getElementById("age_program_wise_beneficiary"),
        {
          type: "line",
          data: {
            labels: this.age_and_program_wise_ben.map((row) => row.age),
            datasets: [
              {
                type: "line",
                label: "Line Dataset",
                data: this.age_and_program_wise_ben.map(
                  (row) => row.beneficiaries
                ),
                // fill: false,
                // barThickness: 10,
                borderColor: this.program_location_wise_ben.map(() =>
                  this.generateRandomColor()
                ),
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
                data: this.age_and_program_wise_ben.map(
                  (row) => row.beneficiaries
                ),
                barPercentage: 0.5,
                barThickness: 6,
                maxBarThickness: 8,
                minBarLength: 2,
                backgroundColor: this.program_location_wise_ben.map(() =>
                  this.generateRandomColor()
                ),
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
    },
    CreateShiftedBeneficiariesChart() {
      if (this.shifted_ben_chart) {
        this.shifted_ben_chart.destroy();
      }
      this.shifted_ben_chart = new Chart(
        document.getElementById("shifted_beneficiary"),
        {
          data: {
            labels: this.shifted_ben.map((row) => row.year),
            datasets: [
              {
                type: "line",
                label: "Line Dataset",
                data: this.shifted_ben.map((row) => row.beneficiaries),
                fill: false,
                borderColor: this.program_location_wise_ben.map(() =>
                  this.generateRandomColor()
                ),
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
                backgroundColor: this.program_location_wise_ben.map(() =>
                  this.generateRandomColor()
                ),
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
                labels: false,
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
    },
    GoBenInfoList() {
      if (
        !this.isLoadingProgramLocation &&
        !this.isLoadingGender &&
        !this.isLoadingWaiting &&
        !this.isLoadingProgram &&
        !this.isLoadingAgeProgram &&
        !this.isLoadingShifted
      ) {
        this.$router.push({ name: "Beneficiary_List" });
      } else {
        this.$toast.error("Please wait!!!");
      }
    },
    GoActiveBenInfoList() {
      if (
        !this.isLoadingProgramLocation &&
        !this.isLoadingGender &&
        !this.isLoadingWaiting &&
        !this.isLoadingProgram &&
        !this.isLoadingAgeProgram &&
        !this.isLoadingShifted
      ) {
        this.$router.push({ name: "Beneficiary_List_Active" });
      } else {
        this.$toast.error("Please wait!!!");
      }
    },
    GoInActiveBenInfoList() {
      if (
        !this.isLoadingProgramLocation &&
        !this.isLoadingGender &&
        !this.isLoadingWaiting &&
        !this.isLoadingProgram &&
        !this.isLoadingAgeProgram &&
        !this.isLoadingShifted
      ) {
        this.$router.push({ name: "Beneficiary_List_Inactive" });
      } else {
        this.$toast.error("Please wait!!!");
      }
    },
    GoWaitingBenInfoList() {
      if (
        !this.isLoadingProgramLocation &&
        !this.isLoadingGender &&
        !this.isLoadingWaiting &&
        !this.isLoadingProgram &&
        !this.isLoadingAgeProgram &&
        !this.isLoadingShifted
      ) {
        this.$router.push({ name: "Beneficiary_List_Waiting" });
      } else {
        this.$toast.error("Please wait!!!");
      }
    },
    GoReplaceBenInfoList() {
      if (
        !this.isLoadingProgramLocation &&
        !this.isLoadingGender &&
        !this.isLoadingWaiting &&
        !this.isLoadingProgram &&
        !this.isLoadingAgeProgram &&
        !this.isLoadingShifted
      ) {
        this.$router.push({ name: "beneficiary_replacement_list" });
      } else {
        this.$toast.error("Please wait!!!");
      }
    },
  },
  watch: {
    // "$i18n.locale": "updateHeaderTitle",
    "$i18n.locale": {
      handler(newLocale, oldLocale) {
        if (newLocale != oldLocale) {
          //this.GetLocationWiseBeneficiaries();
        }
      },
      immediate: true, // Call the handler immediately to initialize the levels
    },
  },
  created() {},
  beforeMount() {
    this.updateHeaderTitle();
  },
  mounted() {
    this.drawer = false;
    this.GetLocationWiseBeneficiaries();
    this.GetGenderWiseBeneficiaries();
    this.GetTotalBeneficiaries();
    this.GetAllProgram();
    this.GetWaitingBeneficiaries();
    this.GetProgramWiseBeneficiaries();
    this.GetAgeAndProgramWiseBeneficiaries();
    this.GetShiftedBeneficiaries();
  },
};
</script>