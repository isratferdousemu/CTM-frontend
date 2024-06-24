<template>
    <v-container fluid>
        <v-card-title tag="div" style="background-color:#1c3b68;color:white;margin-bottom: 17px;font-size:17px;">
            <h3 class="white--text">
                {{ $t("container.budget_management.budget_allotment_dashboard") }}
            </h3>
        </v-card-title>
        <!-------start header Card component ---->
        <v-row align="center" justify="center" dense>
            <v-col cols="12" md="3">
                <v-card class="mx-auto" max-width="600">
                    <v-card-title>
                        <v-icon color='indigo' class="mr-8" size="32">
                            mdi-account-multiple-plus
                        </v-icon>
                        <v-row align="start">
                            <div class="text-caption black--text text-uppercase">
                                {{ $t("container.budget_management.total_budget") }}
                            </div>
                        </v-row>
                    </v-card-title>
                    <h1 align="center">{{ language === 'bn' ?
                        $helpers.englishToBangla(beneficiaries.totalInactiveBeneficiaries) :
                        beneficiaries.totalInactiveBeneficiaries }}</h1>
                </v-card>
            </v-col>
            <v-col cols="12" md="3">
                <v-card class="mx-auto" max-width="600">
                    <v-card-title>
                        <v-icon color='indigo' class="mr-8" size="32">
                            mdi-account-multiple-plus
                        </v-icon>
                        <v-row align="start">
                            <div class="text-caption black--text text-uppercase">
                                {{ $t("container.budget_management.total_allotment") }}
                            </div>
                        </v-row>
                    </v-card-title>
                    <h1 align="center">{{ language === 'bn' ?
                        $helpers.englishToBangla(beneficiaries.totalInactiveBeneficiaries) :
                        beneficiaries.totalInactiveBeneficiaries }}</h1>
                </v-card>
            </v-col>
            <v-col cols="12" md="3">
                <v-card class="mx-auto" max-width="600">
                    <v-card-title>
                        <v-icon color='indigo' class="mr-8" size="32">
                            mdi-account-multiple-plus
                        </v-icon>
                        <v-row align="start">
                            <div class="text-caption black--text text-uppercase">
                                {{ $t("container.budget_management.yearly_total_ben") }}
                            </div>
                        </v-row>
                    </v-card-title>
                    <h1 align="center">{{ language === 'bn' ?
                        $helpers.englishToBangla(beneficiaries.totalInactiveBeneficiaries) :
                        beneficiaries.totalInactiveBeneficiaries }}</h1>
                </v-card>
            </v-col>
            <v-col cols="12" md="3">
                <v-card class="mx-auto" max-width="600">
                    <v-card-title>
                        <v-icon color='indigo' class="mr-8" size="32">
                            mdi-account-multiple-plus
                        </v-icon>
                        <v-row align="start">
                            <div class="text-caption black--text text-uppercase">
                                {{ $t("container.budget_management.year_wise_budget_amount") }}
                            </div>
                        </v-row>
                    </v-card-title>
                    <h1 align="center">{{ language === 'bn' ?
                        $helpers.englishToBangla(beneficiaries.totalInactiveBeneficiaries) :
                        beneficiaries.totalInactiveBeneficiaries }}</h1>
                </v-card>
            </v-col>
        </v-row>
        <v-row align="center" justify="center" dense>
            <v-col cols="12" md="3">
                <v-card class="mx-auto" max-width="600">
                    <v-card-title>
                        <v-icon color='indigo' class="mr-8" size="32">
                            mdi-account-multiple-plus
                        </v-icon>
                        <v-row align="start">
                            <div class="text-caption black--text text-uppercase">
                                {{ $t("container.budget_management.year_wise_allotment_amount") }}
                            </div>
                        </v-row>
                    </v-card-title>
                    <h1 align="center">{{ language === 'bn' ?
                        $helpers.englishToBangla(beneficiaries.totalInactiveBeneficiaries) :
                        beneficiaries.totalInactiveBeneficiaries }}</h1>
                </v-card>
            </v-col>
            <v-col cols="12" md="3">
                <v-card class="mx-auto" max-width="600">
                    <v-card-title>
                        <v-icon color='indigo' class="mr-8" size="32">
                            mdi-account-multiple-plus
                        </v-icon>
                        <v-row align="start">
                            <div class="text-caption black--text text-uppercase">
                                {{ $t("container.budget_management.program_wise_budget_amount") }}
                            </div>
                        </v-row>
                    </v-card-title>
                    <h1 align="center">{{ language === 'bn' ?
                        $helpers.englishToBangla(beneficiaries.totalInactiveBeneficiaries) :
                        beneficiaries.totalInactiveBeneficiaries }}</h1>
                </v-card>
            </v-col>
            <v-col cols="12" md="3">
                <v-card class="mx-auto" max-width="600">
                    <v-card-title>
                        <v-icon color='indigo' class="mr-8" size="32">
                            mdi-account-multiple-plus
                        </v-icon>
                        <v-row align="start">
                            <div class="text-caption black--text text-uppercase">
                                {{ $t("container.budget_management.program_wise_allotment_amount") }}
                            </div>
                        </v-row>
                    </v-card-title>
                    <h1 align="center">{{ language === 'bn' ?
                        $helpers.englishToBangla(beneficiaries.totalInactiveBeneficiaries) :
                        beneficiaries.totalInactiveBeneficiaries }}</h1>
                </v-card>
            </v-col>
            <v-col cols="12" md="3">
                <v-card class="mx-auto" max-width="600">
                    <v-card-title>
                        <v-icon color='indigo' class="mr-4" size="25">
                            mdi-account-multiple-plus
                        </v-icon>
                        <v-row align="start">
                            <div class="text-caption black--text text-uppercase">
                                {{ $t("container.budget_management.area_wise_budget_allotment_amount") }}
                            </div>
                        </v-row>
                    </v-card-title>
                    <h1 align="center">{{ language === 'bn' ?
                        $helpers.englishToBangla(beneficiaries.totalInactiveBeneficiaries) :
                        beneficiaries.totalInactiveBeneficiaries }}</h1>
                </v-card>
            </v-col>
        </v-row>
        <!-------end header Card component ---->

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
                                                        "container.budget_management.total_budget"
                                                    )
                                                }}
                                            </span>
                                        </label></v-col>
                                </v-row>
                                <v-row class="ml-1 mr-1">
                                    <v-col cols="4">
                                        <v-row>
                                            <v-select :label="$t(
                                                'container.budget_management.select_financial_year'
                                            )
                                                " :items="financial_years" v-model="total_budget.financial_year_id"
                                                item-text="financial_year" item-value="id"
                                                @change="GetTotalBudget($event)" clearable></v-select>
                                        </v-row>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-row class="ml-1">
                                            <v-select :label="$t(
                                                'container.budget_management.select_program'
                                            )
                                                " :items="programs" v-model="total_budget.program_id"
                                                :item-text="getItemText" item-value="id"
                                                @change="GetTotalBudget($event)" clearable></v-select>
                                        </v-row>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-row class="ml-1">
                                            <v-select :label="$t(
                                                'container.budget_management.select_location'
                                            )
                                                " :items="divisions" v-model="total_budget.location_id"
                                                :item-text="getItemText" item-value="id"
                                                @change="GetTotalBudget($event)" clearable></v-select>
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
                                                        "container.budget_management.total_allotment"
                                                    )
                                                }}
                                            </span>
                                        </label></v-col>
                                </v-row>
                                <v-row class="ml-1 mr-1">
                                    <v-col cols="4">
                                        <v-row>
                                            <v-select :label="$t(
                                                'container.budget_management.select_financial_year'
                                            )
                                                " :items="financial_years" v-model="total_allotment.financial_year_id"
                                                item-text="financial_year" item-value="id"
                                                @change="GetTotalAllotment($event)" clearable></v-select>
                                        </v-row>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-row class="ml-1">
                                            <v-select :label="$t(
                                                'container.budget_management.select_program'
                                            )
                                                " :items="programs" v-model="total_allotment.program_id"
                                                :item-text="getItemText" item-value="id"
                                                @change="GetTotalAllotment($event)" clearable></v-select>
                                        </v-row>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-row class="ml-1">
                                            <v-select :label="$t(
                                                'container.budget_management.select_location'
                                            )
                                                " :items="divisions" v-model="total_allotment.location_id"
                                                :item-text="getItemText" item-value="id"
                                                @change="GetTotalAllotment($event)" clearable></v-select>
                                        </v-row>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <!-- <canvas id="gender_wise_beneficiary"></canvas> -->
                                    <canvas height="300" id="year_wise_waiting_ben"></canvas>
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
                                                        "container.budget_management.yearly_total_ben"
                                                    )
                                                }}
                                            </span>
                                        </label></v-col>
                                </v-row>
                                <v-row class="ml-1 mr-1">
                                    <v-col cols="4">
                                        <v-row>
                                            <v-select :label="$t(
                                                'container.budget_management.select_financial_year'
                                            )
                                                " :items="financial_years"
                                                v-model="yearly_total_beneficiary.financial_year_id"
                                                item-text="financial_year" item-value="id"
                                                @change="GetYearlyTotalAmount($event)" clearable></v-select>
                                        </v-row>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-row class="ml-1">
                                            <v-select :label="$t(
                                                'container.budget_management.select_program'
                                            )
                                                " :items="programs" v-model="yearly_total_beneficiary.program_id"
                                                :item-text="getItemText" item-value="id"
                                                @change="GetYearlyTotalAmount($event)" clearable></v-select>
                                        </v-row>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-row class="ml-1">
                                            <v-select :label="$t(
                                                'container.budget_management.select_location'
                                            )
                                                " :items="divisions" v-model="yearly_total_beneficiary.location_id"
                                                :item-text="getItemText" item-value="id"
                                                @change="GetYearlyTotalAmount($event)" clearable></v-select>
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
                                                        "container.budget_management.year_wise_budget_amount"
                                                    )
                                                }}
                                            </span>
                                        </label></v-col>
                                </v-row>

                                <v-row class="ml-1 mr-1">
                                    <v-col cols="4">
                                        <v-row>
                                            <v-select :label="$t(
                                                'container.budget_management.select_financial_year'
                                            )
                                                " :items="financial_years"
                                                v-model="year_wise_budget_amount.financial_year_id"
                                                item-text="financial_year" item-value="id"
                                                @change="GetYearWiseBudgetAmount($event)" clearable></v-select>
                                        </v-row>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-row class="ml-1">
                                            <v-select :label="$t(
                                                'container.budget_management.select_program'
                                            )
                                                " :items="programs" v-model="year_wise_budget_amount.program_id"
                                                :item-text="getItemText" item-value="id"
                                                @change="GetYearWiseBudgetAmount($event)" clearable></v-select>
                                        </v-row>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-row class="ml-1">
                                            <v-select :label="$t(
                                                'container.budget_management.select_location'
                                            )
                                                " :items="divisions" v-model="year_wise_budget_amount.location_id"
                                                :item-text="getItemText" item-value="id"
                                                @change="GetYearWiseBudgetAmount($event)" clearable></v-select>
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
                                                        "container.budget_management.year_wise_allotment_amount"
                                                    )
                                                }}
                                            </span>
                                        </label></v-col>
                                </v-row>
                                <v-row class="ml-1 mr-1">
                                    <v-col cols="4">
                                        <v-row>
                                            <v-select :label="$t(
                                                'container.budget_management.select_financial_year'
                                            )
                                                " :items="financial_years"
                                                v-model="year_wise_allotment_amount.financial_year_id"
                                                item-text="financial_year" item-value="id"
                                                @change="GetYearWiseAllotmentAmount($event)" clearable></v-select>
                                        </v-row>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-row class="ml-1">
                                            <v-select :label="$t(
                                                'container.budget_management.select_program'
                                            )
                                                " :items="programs" v-model="year_wise_allotment_amount.program_id"
                                                :item-text="getItemText" item-value="id"
                                                @change="GetYearWiseAllotmentAmount($event)" clearable></v-select>
                                        </v-row>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-row class="ml-1">
                                            <v-select :label="$t(
                                                'container.budget_management.select_location'
                                            )
                                                " :items="divisions" v-model="year_wise_allotment_amount.location_id"
                                                :item-text="getItemText" item-value="id"
                                                @change="GetYearWiseAllotmentAmount($event)" clearable></v-select>
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
                                                        "container.budget_management.program_wise_budget_amount"
                                                    )
                                                }}
                                            </span>
                                        </label>
                                    </v-col>
                                </v-row>
                                <v-row class="ml-1 mr-1">
                                    <v-col cols="4">
                                        <v-row>
                                            <v-select :label="$t(
                                                'container.budget_management.select_financial_year'
                                            )
                                                " :items="financial_years"
                                                v-model="program_wise_budget_amount.financial_year_id"
                                                item-text="financial_year" item-value="id"
                                                @change="GetProgramWiseBudgetAmount($event)" clearable></v-select>
                                        </v-row>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-row class="ml-1">
                                            <v-select :label="$t(
                                                'container.budget_management.select_program'
                                            )
                                                " :items="programs" v-model="program_wise_budget_amount.program_id"
                                                :item-text="getItemText" item-value="id"
                                                @change="GetProgramWiseBudgetAmount($event)" clearable></v-select>
                                        </v-row>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-row class="ml-1">
                                            <v-select :label="$t(
                                                'container.budget_management.select_location'
                                            )
                                                " :items="divisions" v-model="program_wise_budget_amount.location_id"
                                                :item-text="getItemText" item-value="id"
                                                @change="GetProgramWiseBudgetAmount($event)" clearable></v-select>
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
                                                        "container.budget_management.year_wise_allotment_amount"
                                                    )
                                                }}
                                            </span>
                                        </label></v-col>
                                </v-row>
                                <v-row class="ml-1 mr-1">
                                    <v-col cols="4">
                                        <v-row>
                                            <v-select :label="$t(
                                                'container.budget_management.select_financial_year'
                                            )
                                                " :items="financial_years"
                                                v-model="year_wise_allotment_amount.financial_year_id"
                                                item-text="financial_year" item-value="id"
                                                @change="GetYearWiseAllotmentAmount($event)" clearable></v-select>
                                        </v-row>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-row class="ml-1">
                                            <v-select :label="$t(
                                                'container.budget_management.select_program'
                                            )
                                                " :items="programs" v-model="year_wise_allotment_amount.program_id"
                                                :item-text="getItemText" item-value="id"
                                                @change="GetYearWiseAllotmentAmount($event)" clearable></v-select>
                                        </v-row>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-row class="ml-1">
                                            <v-select :label="$t(
                                                'container.budget_management.select_location'
                                            )
                                                " :items="divisions" v-model="year_wise_allotment_amount.location_id"
                                                :item-text="getItemText" item-value="id"
                                                @change="GetYearWiseAllotmentAmount($event)" clearable></v-select>
                                        </v-row>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <canvas id="total_number_of_application_received_info"></canvas>
                                </v-row>
                            </v-col>
                        </V-row>
                    </v-card-text>
                </v-card>
            </v-col>
            <!-- <v-col cols="12" md="6" lg="6">
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
                                                        "container.budget_management.program_wise_budget_amount"
                                                    )
                                                }}
                                            </span>
                                        </label>
                                    </v-col>
                                </v-row>
                                <v-row class="ml-1 mr-1">
                                    <v-col cols="4">
                                        <v-row>
                                            <v-select :label="$t(
                                                'container.budget_management.select_financial_year'
                                            )
                                                " :items="financial_years"
                                                v-model="program_wise_budget_amount.financial_year_id"
                                                item-text="financial_year" item-value="id"
                                                @change="GetProgramWiseBudgetAmount($event)" clearable></v-select>
                                        </v-row>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-row class="ml-1">
                                            <v-select :label="$t(
                                                'container.budget_management.select_program'
                                            )
                                                " :items="programs" v-model="program_wise_budget_amount.program_id"
                                                :item-text="getItemText" item-value="id"
                                                @change="GetProgramWiseBudgetAmount($event)" clearable></v-select>
                                        </v-row>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-row class="ml-1">
                                            <v-select :label="$t(
                                                'container.budget_management.select_location'
                                            )
                                                " :items="divisions" v-model="program_wise_budget_amount.location_id"
                                                :item-text="getItemText" item-value="id"
                                                @change="GetProgramWiseBudgetAmount($event)" clearable></v-select>
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
            </v-col> -->
        </v-row>
        <!-- Third row chart end -->
    </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { extend, ValidationProvider, ValidationObserver } from "vee-validate";
import { required } from "vee-validate/dist/rules";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
Chart.register(ChartDataLabels);
extend("required", required);
import Spinner from "@/components/Common/Spinner.vue";
export default {
    name: "Dashboard",
    title: "CTM - Budget & Allotment Dashboard",
    data() {
        return {
            programs: [],
            financial_years: [],
            beneficiaries: [],
            isLoadingProgramLocation: false,
            isLoadingGender: false,
            isLoadingWaiting: false,
            isLoadingProgram: false,
            isLoadingAgeProgram: false,
            isLoadingShifted: false,
            //for program & location wise chart
            program_location_wise_ben: [],
            program_location_wise_levels: [],
            program_location_wise_datas: [],
            program_location_wise_percentage: [],
            program_location_chart: null,
            total_budget: {
                program_id: null,
                financial_year_id: null,
                location_id: null
            },
            dates: [],
            menu: false,

            //for gender wise chart
            gender_wise_ben: [],
            gender_wise_ben_levels: [],
            gender_wise_ben_datas: [],
            gender_wise_ben_percentage: [],
            gender_wise_chart: null,
            total_allotment: {
                program_id: null,
                financial_year_id: null,
                location_id: null
            },
            gender_wise_dates: [],
            menu2: false,

            //for Year Wise Number of Waiting list of Beneficiary chart
            year_wise_waiting_ben: [],
            year_wise_waiting_chart: null,
            yearly_total_beneficiary: {
                program_id: null,
                financial_year_id: null,
                location_id: null
            },
            wiaiting_wise_dates: [],
            menu3: false,

            //for Program Wise Beneficiary chart
            program_wise_ben: [],
            program_wise_ben_chart: null,
            year_wise_budget_amount: {
                program_id: null,
                financial_year_id: null,
                location_id: null
            },
            program_wise_dates: [],
            menu4: false,

            //for Age & Program Wise Beneficiary chart
            age_and_program_wise_ben: [],
            age_and_program_wise_ben_chart: null,
            year_wise_allotment_amount: {
                program_id: null,
                financial_year_id: null,
                location_id: null
            },
            age_and_program_wise_dates: [],
            menu5: false,

            //for Shifted Beneficiary chart
            shifted_ben: [],
            shifted_ben_chart: null,
            program_wise_budget_amount: {
                program_id: null,
                financial_year_id: null,
                location_id: null
            },
            shifted_dates: [],
            menu6: false,


            // for doughtnut chart
            total_number_of_application_received_chart: null,
            total_number_of_application_received_info: [],
            total_number_of_application_received_levels: [],
            total_number_of_application_received_datas: [],
        };
    },
    components: {
        ValidationProvider,
        ValidationObserver,
        Spinner,
    },
    computed: {
        ...mapState({
            divisions: (state) => state.Division.divisions,
            userData: (state) => state.userData,
        }),
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
        ...mapActions({
            GetAllDivisions: "Division/GetAllDivisions",
        }),
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
        async GetFinancial_Year() {
            await this.$axios
                .get("/admin/financial-year/list", {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data"
                    }
                })
                .then(result => {
                    this.financial_years = result.data.data;
                    // this.active_year = this.financial_years.find((item) => item.status === 1)
                });
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
        async GetTotalBudget() {
            this.isLoadingProgramLocation = true;
            const queryParams = {
                program_id: this.total_budget.program_id,
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

                    this.program_location_wise_levels =
                        this.program_location_wise_ben.map((row) =>
                            this.$i18n.locale == "en" ? row.name_en : row.name_bn
                        );

                    this.program_location_wise_datas = this.program_location_wise_ben.map(
                        (row) => row.value
                    );
                    this.program_location_wise_percentage =
                        this.program_location_wise_ben.map((row) => row.percentage);

                    this.isLoadingProgramLocation = false;
                });
            this.CreateLocationWiseBeneficiariesChart();
        },
        submitDateProgramAndLocationWiseBeneficiary() {
            this.menu = false;
            if (this.dates.length < 2) {
                return;
            }
            this.GetTotalBudget();
        },
        resetDateProgramAndLocationWiseBeneficiary() {
            this.dates = [];
            this.menu = false;
            this.GetTotalBudget();
        },
        async GetTotalAllotment() {
            this.isLoadingGender = true;
            const queryParams = {
                program_id: this.total_allotment.program_id,
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

                    this.gender_wise_ben_levels = this.gender_wise_ben.map((row) =>
                        this.$i18n.locale == "en" ? row.name_en : row.name_bn
                    );
                    this.gender_wise_ben_datas = this.gender_wise_ben.map(
                        (row) => row.value
                    );
                    this.gender_wise_ben_percentage = this.gender_wise_ben.map(
                        (row) => row.percentage
                    );

                    this.isLoadingGender = false;
                });
            this.CreateGenderWiseBeneficiariesChart();
        },
        submitDateGenderWiseBeneficiary() {
            this.menu2 = false;
            if (this.gender_wise_dates.length < 2) {
                return;
            }
            this.GetTotalAllotment();
        },
        resetDateGenderWiseBeneficiary() {
            this.gender_wise_dates = [];
            this.menu2 = false;
            this.GetTotalAllotment();
        },
        async GetYearlyTotalAmount() {
            this.isLoadingWaiting = true;
            const queryParams = {
                program_id: this.yearly_total_beneficiary.program_id,
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
            this.GetYearlyTotalAmount();
        },
        resetDateWaitingWiseBeneficiary() {
            this.wiaiting_wise_dates = [];
            this.menu3 = false;
            this.GetYearlyTotalAmount();
        },
        async GetYearWiseBudgetAmount() {
            this.isLoadingProgram = true;
            const queryParams = {
                program_id: this.year_wise_budget_amount.program_id,
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
            this.GetYearWiseBudgetAmount();
        },
        resetDateProgramWiseBeneficiary() {
            this.program_wise_dates = [];
            this.menu4 = false;
            this.GetYearWiseBudgetAmount();
        },
        async GetYearWiseAllotmentAmount() {
            this.isLoadingAgeProgram = true;
            const queryParams = {
                program_id: this.year_wise_allotment_amount.program_id,
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
            this.GetYearWiseAllotmentAmount();
        },
        resetDateAgeAndProgramWiseBeneficiary() {
            this.age_and_program_wise_dates = [];
            this.menu5 = false;
            this.GetYearWiseAllotmentAmount();
        },
        async GetProgramWiseBudgetAmount() {
            this.isLoadingShifted = true;
            const queryParams = {
                to_program_id: this.program_wise_budget_amount.program_id,
                // from_program_id: this.shifted_beneficiary.from_program_id,
                // from_date: this.shifted_dates[0],
                // to_date: this.shifted_dates[1],
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
            this.GetProgramWiseBudgetAmount();
        },
        resetDateShiftedWiseBeneficiary() {
            this.shifted_dates = [];
            this.menu6 = false;
            this.GetProgramWiseBudgetAmount();
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
                            labels: this.program_location_wise_levels.map(
                                (label, index) =>
                                    `${label} (${this.$i18n.locale == "en"
                                        ? this.program_location_wise_datas[index]
                                        : this.$helpers.englishToBangla(
                                            this.program_location_wise_datas[index]
                                        )
                                    } - ${this.$i18n.locale == "en"
                                        ? this.program_location_wise_percentage[index]
                                        : this.$helpers.englishToBangla(
                                            this.program_location_wise_percentage[index]
                                        )
                                    }%)`
                            ),
                            percentage: this.program_location_wise_percentage,
                            datasets: [
                                {
                                    label: this.$t(
                                        "container.beneficiary_management.dashboard.total_beneficiaries"
                                    ),
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
                                    formatter: (value, context) => {
                                        const percentage =
                                            context.chart.data.percentage[context.dataIndex];
                                        if (value == "0") {
                                            return "";
                                        }
                                        return `${this.$i18n.locale == "en"
                                            ? value
                                            : this.$helpers.englishToBangla(value)
                                            }, ${this.$i18n.locale == "en"
                                                ? percentage
                                                : this.$helpers.englishToBangla(percentage)
                                            }%`;
                                    },
                                    labels: {
                                        title: {
                                            font: {
                                                weight: "bold",
                                                color: "#fff",
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
            if (this.gender_wise_ben.length > 0) {
                this.gender_wise_chart = new Chart(
                    document.getElementById("gender_wise_beneficiary"),
                    {
                        type: "pie",
                        data: {
                            labels: this.gender_wise_ben_levels.map(
                                (label, index) =>
                                    `${label} (${this.$i18n.locale == "en"
                                        ? this.gender_wise_ben_datas[index]
                                        : this.$helpers.englishToBangla(
                                            this.gender_wise_ben_datas[index]
                                        )
                                    } - ${this.$i18n.locale == "en"
                                        ? this.gender_wise_ben_percentage[index]
                                        : this.$helpers.englishToBangla(
                                            this.gender_wise_ben_percentage[index]
                                        )
                                    }%)`
                            ),
                            percentage: this.gender_wise_ben_percentage,
                            datasets: [
                                {
                                    label: this.$t(
                                        "container.beneficiary_management.dashboard.total_beneficiaries"
                                    ),
                                    data: this.gender_wise_ben.map((row) => row.value),
                                    backgroundColor: this.gender_wise_ben.map(() =>
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
                                    formatter: (value, context) => {
                                        const percentage =
                                            context.chart.data.percentage[context.dataIndex];
                                        if (value == "0") {
                                            return "";
                                        }
                                        return `${this.$i18n.locale == "en"
                                            ? value
                                            : this.$helpers.englishToBangla(value)
                                            }, ${this.$i18n.locale == "en"
                                                ? percentage
                                                : this.$helpers.englishToBangla(percentage)
                                            }%`;
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
                document.getElementById("gender_wise_beneficiary").style.width =
                    "350px";
                document.getElementById("gender_wise_beneficiary").style.height =
                    "385px";
            } else {
                console.error("Data is not available to create gender wise  chart.");
            }
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
                                label: this.$t(
                                    "container.beneficiary_management.dashboard.waitining_beneficiaries"
                                ),
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
                                label: this.$t(
                                    "container.beneficiary_management.dashboard.total_beneficiaries"
                                ),
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
                                label: this.$t(
                                    "container.beneficiary_management.dashboard.program_wise_ben"
                                ),
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
                                label: this.$t(
                                    "container.beneficiary_management.dashboard.age_and_program_wise_ben"
                                ),
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
                                label: this.$t(
                                    "container.beneficiary_management.dashboard.age_and_program_wise_ben"
                                ),
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
                                label: this.$t(
                                    "container.beneficiary_management.dashboard.number_of_ben_program_shifted"
                                ),
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
                                label: this.$t(
                                    "container.beneficiary_management.dashboard.number_of_ben_program_shifted"
                                ),
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

        // for doughtnut chart

        async fetchTotalReceivedApplicationChartData(from_date = null, to_date = null) {
            await this.getTotalReceivedApplication(2, from_date, to_date);

            this.createTotalReceivedApplicentChart();

        },
        async getTotalReceivedApplication(status, from_date = null, to_date = null) {
            this.isLoading = true;
            const queryParams = {
                status: status,
                start_date: from_date,
                end_date: to_date,
            };
            try {
                const result = await this.$axios.get("/admin/application-dashboard/get-total-numberof-application", {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                    params: queryParams,
                });
                console.log(result.data.data, 777)
                this.total_number_of_application_received_info = result.data.data;
                this.total_number_of_application_received_levels = this.total_number_of_application_received_info.map((row) => this.$i18n.locale == 'en' ? row.name_en : row.name_bn);;
                this.total_number_of_application_received_datas = this.total_number_of_application_received_info.map((row) => row.applications_count);
                this.isLoading = false;

            } catch (error) {
                console.error("Error fetching data:", error);
                this.isLoading = false;
                // Handle error if necessary
            }
        },
        createTotalReceivedApplicentChart() {
            if (this.total_number_of_application_received_chart) {
                this.total_number_of_application_received_chart.destroy();
            }

            if (this.total_number_of_application_received_levels && this.total_number_of_application_received_datas) {
                const total = this.total_number_of_application_received_datas.reduce((acc, value) => acc + value, 0);
                // const percentages = this.total_number_of_application_received_datas.map(value => ((value / total) * 100).toFixed(2) + '%');
                const percentages = this.total_number_of_application_received_datas.map(value => {
                    const percentage = ((value / total) * 100).toFixed(2);
                    return isNaN(percentage) ? '0.00%' : percentage + '%';
                });

                this.total_number_of_application_received_chart = new Chart(document.getElementById("total_number_of_application_received_info"), {
                    type: "doughnut",
                    data: {
                        // labels: this.total_number_of_application_received_levels,
                        // labels: this.total_number_of_application_received_levels.map((label, index) => `${label} (${percentages[index]})`),
                        labels: this.total_number_of_application_received_levels.map((label, index) => `${label} (${this.$i18n.locale == 'en' ? this.total_number_of_application_received_datas[index] : this.$helpers.englishToBangla(this.total_number_of_application_received_datas[index])} - ${this.$i18n.locale == 'en' ? percentages[index] : this.$helpers.englishToBangla(percentages[index])})`),
                        percentages: percentages,
                        datasets: [{
                            label: "Count",
                            backgroundColor: this.total_number_of_application_received_datas.map(() => this.generateRandomColor()),
                            data: this.total_number_of_application_received_datas,
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
                document.getElementById("total_number_of_application_received_info").style.width = '400px';
                document.getElementById("total_number_of_application_received_info").style.height = '435px';
            } else {
                console.error("Data is not available to create chart.");
            }
        },
    },
    watch: {
        // "$i18n.locale": "updateHeaderTitle",
        "$i18n.locale": {
            handler(newLocale, oldLocale) {
                if (newLocale != oldLocale) {
                    this.GetTotalBudget();
                    this.GetTotalAllotment();
                    this.GetYearlyTotalAmount();
                    this.GetYearWiseBudgetAmount();
                    this.GetYearWiseAllotmentAmount();
                    this.GetProgramWiseBudgetAmount();
                    this.fetchTotalReceivedApplicationChartData();
                }
            },
            // immediate: true, // Call the handler immediately to initialize the levels
        },
    },

    created() { },
    beforeMount() {
        // this.updateHeaderTitle();
    },
    mounted() {
        this.drawer = false;
        this.GetTotalBudget();
        this.GetTotalAllotment();
        this.GetTotalBeneficiaries();
        this.GetAllProgram();
        this.GetFinancial_Year();
        this.GetAllDivisions();
        this.GetYearlyTotalAmount();
        this.GetYearWiseBudgetAmount();
        this.GetYearWiseAllotmentAmount();
        this.GetProgramWiseBudgetAmount();
        this.fetchTotalReceivedApplicationChartData();
    },
};
</script>