<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="12">
        <v-card class="ma-0 pa-0" justify="center" outlined>
          <v-card-title class="component-title">
            <div class="clearfix">
              <div class="title-left">
                <h4 class="title-text">
                  {{
                    $t("container.emergency_payment.emergency_payroll.payroll_create")
                  }}
                </h4>
              </div>
            </div>
          </v-card-title>
          <v-card-text>
            <!-- <ValidationObserver ref="form" v-slot="{ invalid }">
                   <v-form v-on:submit.prevent="addAllotment">-->
            <!-- Form -->
            <v-row>
              <v-col cols="12" lg="12" md="6">
                <ValidationObserver ref="form" v-slot="{ invalid }">
                  <v-form @submit.prevent="onSearch()">
                    <v-row wrap>
                      <v-col class="d-flex" cols="12">
                        <v-row wrap>
                          <v-col cols="12" lg="6" sm="6">
                            <!--                            <v-col cols="12">-->
                            <!--                              <label style="font-weight: bold;">{{-->
                            <!--                                  $t(-->
                            <!--                                      "container.payroll_management_v2.allotment_distribution"-->
                            <!--                                  )-->
                            <!--                                }}-->
                            <!--                              </label>-->
                            <!--                            </v-col>-->
                            <v-col cols="12">
                              <ValidationProvider
                                  v-slot="{ errors }"
                                  name="ProgramName"
                                  rules=required
                                  vid="program_id">
                                <v-autocomplete
                                    v-model="data.program_id"
                                    :error="!!errors[0]"
                                    :error-messages="errors[0]
                          ? language === 'bn'
                            ? 'অনুগ্রহ করে প্রোগ্রামের নাম নির্বাচন করুন'
                            : 'Please select the program name'
                          : ''
                      "
                                    :hide-details="!errors[0]"
                                    :item-text="getItemText"
                                    :items="programs"
                                    :label="$t('container.system_config.demo_graphic.committee.program_name')"
                                    class="no-arrow-icon"
                                    clearable
                                    item-value="id"
                                    outlined
                                    required
                                    @input="onChangeProgramName($event)">
                                </v-autocomplete>
                              </ValidationProvider>
                            </v-col>
                            <v-col cols="12">
                              <ValidationProvider
                                  v-slot="{ errors }"
                                  name="Financial Year"
                                  rules=required
                                  vid="financial_year">
                                <v-autocomplete
                                    v-model="data.financial_year_id"
                                    :error="!!errors[0]"
                                    :error-messages="errors[0]"
                                    :hide-details="!errors[0]"
                                    :item-text="getFinancialItemText"
                                    :items="financial_years"
                                    :label="$t( 'container.system_config.demo_graphic.financial_year.financial_year')"
                                    class="no-arrow-icon" clearable
                                    item-value="id"
                                    outlined
                                    required
                                    @input="GetActiveInstallment($event)">

                                </v-autocomplete>
                              </ValidationProvider>
                            </v-col>
                            <v-col cols="12">
                              <ValidationProvider
                                  v-slot="{ errors }"
                                  name="Division"
                                  rules=required
                                  vid="division"
                              >
                                <v-text-field
                                    v-if="user_permission.division"
                                    v-model="user_permission.division_name"
                                    :label="$t('container.system_config.demo_graphic.division.division')"
                                    outlined
                                    readonly
                                >
                                </v-text-field>
                                <v-autocomplete
                                    v-if="!user_permission.division"
                                    v-model="data.division_id"
                                    :error="!!errors[0]"
                                    :error-messages="errors[0]"
                                    :hide-details="!errors[0]"
                                    :item-text="getItemText"
                                    :items="divisions"
                                    :label="$t('container.system_config.demo_graphic.division.division')"
                                    class="no-arrow-icon"
                                    clearable
                                    item-value="id"
                                    outlined
                                    @input="onChangeDivision($event)">
                                </v-autocomplete>
                              </ValidationProvider>
                            </v-col>
                            <v-col cols="12">
                              <ValidationProvider
                                  v-slot="{ errors }"
                                  name="District"
                                  rules=required
                                  vid="district">
                                <v-text-field
                                    v-if="user_permission.district"
                                    v-model="user_permission.district_name"
                                    :label="$t('container.system_config.demo_graphic.district.district')"
                                    outlined
                                    readonly
                                >
                                </v-text-field>
                                <v-autocomplete
                                    v-if="!user_permission.district"
                                    v-model="data.district_id"
                                    :error="!!errors[0]"
                                    :error-messages="errors[0]"
                                    :hide-details="!errors[0]"
                                    :item-text="getItemText"
                                    :items="districts"
                                    :label="$t('container.system_config.demo_graphic.district.district')"
                                    class="no-arrow-icon"
                                    clearable
                                    item-value="id"
                                    outlined
                                    @input="onChangeDistrict($event)"
                                >
                                </v-autocomplete>
                              </ValidationProvider>
                            </v-col>
                            <v-col cols="12">
                              <ValidationProvider
                                  v-slot="{ errors }"
                                  name="Location Type"
                                  vid="location_type">
                                <v-text-field
                                    v-if="user_permission.location_type"
                                    v-model="user_permission.location_type_name"
                                    :label="$t('container.list.location_type')"
                                    outlined
                                    readonly
                                >
                                </v-text-field>
                                <v-autocomplete
                                    v-if="!user_permission.location_type"
                                    v-model="data.location_type"
                                    :error="!!errors[0]"
                                    :error-messages="errors[0]"
                                    :hide-details="!errors[0]"
                                    :item-text="getLocationText"
                                    :items="locationType"
                                    :label="$t('container.list.location_type')"
                                    class="no-arrow-icon"
                                    clearable
                                    item-value="id"
                                    outlined
                                    @input="LocationType($event)">

                                </v-autocomplete>
                              </ValidationProvider>
                            </v-col>
                            <v-col v-if="data.location_type === 1" cols="12">
                              <ValidationProvider
                                  v-slot="{ errors }"
                                  name="thana"
                                  rules=required
                                  vid="district_pouro_id"
                              >
                                <v-text-field
                                    v-if="user_permission.district_pourashava"
                                    v-model="user_permission.district_pourashava_name"
                                    :label="$t('container.system_config.demo_graphic.ward.pouro'                              )                                      "
                                    outlined
                                    readonly
                                >
                                </v-text-field>
                                <v-autocomplete
                                    v-if="!user_permission.district_pourashava"
                                    v-model="data.district_pouro_id"
                                    :error="!!errors[0]"
                                    :error-messages="errors[0]"
                                    :hide-details="!errors[0]"
                                    :item-text="getItemText"
                                    :items="district_pouros"
                                    :label="$t('container.system_config.demo_graphic.ward.pouro')"
                                    class="no-arrow-icon"
                                    clearable
                                    item-value="id"
                                    outlined
                                    @change="onChangeDistrictPouro($event)">
                                </v-autocomplete>
                              </ValidationProvider>
                            </v-col>
                            <v-col v-if="data.location_type === 2" cols="12">
                              <ValidationProvider

                                  v-slot="{ errors }"
                                  name="Upazila"
                                  rules=required
                                  vid="upazila_id"
                              >

                                <v-text-field
                                    v-if="user_permission.upazila"
                                    v-model="user_permission.upazila_name"
                                    :label="$t('container.system_config.demo_graphic.thana.thana')"
                                    outlined readonly>
                                </v-text-field>
                                <v-autocomplete
                                    v-if="!user_permission.upazila"
                                    v-model="data.upazila_id"
                                    :error="!!errors[0]"
                                    :error-messages="errors[0]"
                                    :hide-details="!errors[0]"
                                    :item-text="getItemText"
                                    :items="thanas"
                                    :label="$t('container.system_config.demo_graphic.thana.thana')"
                                    class="no-arrow-icon"
                                    clearable
                                    item-value="id"
                                    outlined
                                    @change="onChangeUpazila($event)">
                                </v-autocomplete>
                              </ValidationProvider>

                            </v-col>
                            <v-col v-if="data.location_type === 3"
                                   cols="12">
                              <ValidationProvider
                                  v-slot="{ errors }"
                                  name="city"
                                  rules=required
                                  vid="city_id">
                                <v-text-field
                                    v-if="user_permission.city_corp"
                                    v-model="user_permission.city_corp_name"
                                    :label="$t('container.system_config.demo_graphic.ward.city')"
                                    outlined readonly
                                >
                                </v-text-field>
                                <v-autocomplete
                                    v-if="!user_permission.city_corp"
                                    v-model="data.city_id"
                                    :error="!!errors[0]" :error-messages="errors[0]"
                                    :hide-details="!errors[0]"
                                    :item-text="getItemText"
                                    :items="cities"
                                    :label="$t('container.system_config.demo_graphic.ward.city')"
                                    class="no-arrow-icon"
                                    clearable
                                    item-value="id"
                                    outlined
                                    @change="onChangeCity($event)">

                                </v-autocomplete>
                              </ValidationProvider>
                            </v-col>
                            <v-col cols="12">
                              <ValidationProvider
                                  v-slot="{ errors }"
                                  name="Remaining Installment"
                                  rules="required"
                                  vid="city_id">
                                <v-autocomplete
                                    v-model="data.remaining_installment_id"
                                    :error="!!errors[0]"
                                    :error-messages="errors[0]"
                                    :hide-details="!errors[0]"
                                    :item-text="getInstallmentText"
                                    :items="active_installments"
                                    :label="$t('container.payroll_management_v2.area_wise_ben_list.remaining_installment')"
                                    class="no-arrow-icon"
                                    clearable
                                    item-value="id"
                                    outlined
                                    required>
                                </v-autocomplete>
                              </ValidationProvider>
                            </v-col>
                          </v-col>
                          <!--Details Information -->
                          <v-col class="mt-3" cols="12" lg="6" sm="6">
                            <v-card elevation="2" outlined shaped>
                              <v-card-title class="justify-center">
                                {{
                                  programInfo === null ?
                                      $t("container.payroll_management_v2.program")
                                      : ''
                                }}
                                <span style="font-weight:bold">
                                  {{

                                    programInfo ? language === "bn" ?
                                            programInfo.name_bn : programInfo.name_en :
                                        ''
                                  }}
                                   </span>
                              </v-card-title>
                              <hr
                                  style="width: 50%; margin-left: 25% !important; margin-right: 25% !important;"/>
                              <v-card-text>
                                <h4>{{
                                    $t("container.payroll_management_v2.monthly_allowance_amount")
                                  }}
                                  <span style="font-weight:bold">
                                  {{
                                      programInfo ?
                                          programInfo.payment_cycle : ''
                                    }}
                                  </span>
                                </h4>
                                <h4>{{
                                    $t("container.payroll_management_v2.distribution_medium")
                                  }}:
                                  <span style="font-weight:bold">
                                  {{
                                      programInfo ?
                                          programInfo.payment_cycle : ''
                                    }}
                                  </span>
                                </h4>
                                <h4>{{
                                    $t("container.payroll_management_v2.bank_account")
                                  }}:
                                  <span style="font-weight:bold">
                                  {{
                                      programInfo ?
                                          programInfo.payment_cycle : ''
                                    }}
                                  </span>
                                </h4>
                              </v-card-text>
                            </v-card>
                          </v-col>
                        </v-row>
                      </v-col>
                      <!--Search & Reset Button-->
                      <v-col class="text-right" cols="12">
                        <v-btn class="btn mr-2" elevation="2" @click="resetSearch()"
                        >{{ $t("container.list.reset") }}
                        </v-btn>
                        <v-btn
                            :disabled="invalid"
                            class="btn mr-2"
                            color="success"
                            elevation="2"
                            @click="search"
                        >{{ $t("container.list.search") }}
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-form>
                </ValidationObserver>
              </v-col>
            </v-row>
            <!--Data Table-->
            <v-row>
              <v-col cols="12">
                <v-card color="white" elevation="0" outlined rounded="md" theme="light">
                  <v-card-title class="component-title mb-5">
                    <div class="clearfix">
                      <div class="title-left">
                        <h4 class="title-text">
                          {{
                            $t("container.list.allotment_area_wise_ben")
                          }}
                        </h4>
                      </div>
                    </div>
                  </v-card-title>
                  <v-card-text>
                    <!-- Total-->
                    <v-row align="center" justify="space-between">
                      <v-col cols="12" lg="3" md="3">
                        {{ $t("container.list.total") }}:&nbsp;<span
                          style="font-weight: bold"
                      >
                      {{
                          language === "bn"
                              ? $helpers.englishToBangla(totalItem)
                              : totalItem
                        }}
                    </span>
                      </v-col>
                      <v-col class="text-right" cols="12" lg="3" md="3">
                        <v-select
                            v-model="selectedColumns"
                            :items="selectableColumns"
                            :label="
                        $t(
                          'container.application_selection.application.select_column'
                        )
                      "
                            menu-props="top"
                            multiple
                            outlined
                            @change="updateVisibleColumns"
                        >
                          <template v-slot:selection="{ item, index }"></template>
                        </v-select>
                      </v-col>
                    </v-row>
                    <!-- Data Table -->
                    <v-row
                        class="ma-0 pa-0 white round-border d-flex justify-space-between align-center"
                        justify="space-between">
                      <!--<div class="d-flex justify-sm-end flex-wrap">
                        <v-text-field
                            v-model="search"
                            :label="$t('container.emergency_payment.search')"
                            class="my-sm-0 my-3 mx-0v -input&#45;&#45;horizontal"
                            color="primary"
                            dense
                            hide-details
                            outlined
                            prepend-inner-icon="mdi-magnify"
                            variant="outlined"
                            @keyup.native="getListData"
                        >
                        </v-text-field>
                      </div>-->
                      <!--<div>
                        <v-btn
                            class="btn mr-2 white&#45;&#45;text"
                            color="red darken-4"
                            elevation="2"
                            @click="generatePDF()"
                        >
                          <v-icon class="pr-1"> mdi-tray-arrow-down</v-icon>
                          {{ $t("container.list.PDF") }}
                        </v-btn>
                        <v-btn
                            class="btn mr-2 white&#45;&#45;text"
                            color="teal darken-2"
                            elevation="2"
                            @click="generateExcel()"
                        >
                          <v-icon class="pr-1"> mdi-tray-arrow-down</v-icon>
                          {{ $t("container.list.excel") }}
                        </v-btn>
                        <v-btn
                            class="my-2"
                            color="primary"
                            router
                            to="/emergency-payment/emergency-allotment/create"
                        >
                          <v-icon class="pr-1"> mdi-plus</v-icon>
                          {{ $t("container.list.add_new") }}
                        </v-btn>
                      </div>-->
                      <v-col cols="12">
                        <v-data-table
                            :headers="visibleHeaders"
                            :items="allotmentAreaList"
                            :items-per-page="pagination.perPage"
                            :loading="loading"
                            class="elevation-0 transparent row-pointer "
                            hide-default-footer
                            item-key="id"
                        >

                          <template v-slot:[`item.id`]="{ item }">
                            <span>
                              {{
                                language === 'bn' ?
                                    $helpers.englishToBangla(item.id) :
                                    item.id
                              }}
                            </span>
                          </template>
                          <template v-slot:item.sl="{ item, index }">
                            {{
                              language === "bn"
                                  ? $helpers.englishToBangla(
                                      (pagination.current - 1) * pagination.perPage +
                                      index +
                                      1
                                  )
                                  : (pagination.current - 1) * pagination.perPage +
                                  index +
                                  1
                            }}
                          </template>
                          <template v-slot:[`item.office_area`]="{ item }">
                            <span>
                              {{
                                language === 'bn' ? $helpers.englishToBangla(item.office_area.name_bn) : item.office_area.name_en ?? 0

                              }}
                            </span>
                          </template>
                          <template v-slot:[`item.allotment_area`]="{ item }">
                             <span>
                               {{
                                 language === 'bn' ?
                                     $helpers.englishToBangla(item.allotment_area.name_bn) :
                                     item.allotment_area.name_en
                               }}
                             </span>
                          </template>
                          <template v-slot:item.allotted_beneficiaries="{ item }">
                            {{
                              language === "bn"
                                  ? $helpers.englishToBangla(item.allotted_beneficiaries)
                                  : item.allotted_beneficiaries
                            }}
                          </template>
                          <template v-slot:[`item.active_beneficiaries`]="{ item }">
                            {{
                              language === 'bn' ?
                                  $helpers.englishToBangla(item.active_beneficiaries ?? 0) :
                                  item.active_beneficiaries ?? 0
                            }}
                          </template>
                          <!-- Action Button -->
                          <template v-slot:item.actions="{ item }">
                            <v-btn class="btn mr-2 white--text" color="primary" elevation="0"
                                   @click="seeBeneficiary(item.id)"
                                   v-on="on">
                              {{
                                $t(
                                    "container.payroll_management_v2.area_wise_ben_list.see_beneficiary"
                                )
                              }}
                            </v-btn>
                            <v-btn class="btn mr-2 white--text" color="red darken-4" elevation="0"
                                   @click="rollBackBeneficiary(item.id)"
                                   v-on="on">
                              {{
                                $t(
                                    "container.payroll_management_v2.area_wise_ben_list.reject"
                                )
                              }}
                            </v-btn>
                          </template>
                          <!--Footer & Pagination -->
                          <template v-slot:footer="item">
                            <v-container class="pa-0 py-0" fluid>
                              <v-row class="align-center" cols="12">
                                <v-col
                                    class="d-flex justify-center mb-2 mb-sm-0"
                                    cols="12"
                                    lg="10"
                                    md="10"
                                    sm="4"
                                >
                                  <v-pagination
                                      v-model="pagination.current"
                                      :length="pagination.total"
                                      :total-visible="11"
                                      circle
                                      class="custom-pagination-item"
                                      primary
                                      @input="onPageChange"
                                  >

                                  </v-pagination>
                                </v-col>
                                <v-col class="" cols="12" lg="2" md="2" sm="4">
                                  <v-select
                                      v-model="pagination.perPage"
                                      :items="items"
                                      dense
                                      hide-details
                                      outlined
                                      @change="onPageSetup"
                                  ></v-select>
                                </v-col>
                              </v-row>
                            </v-container>
                          </template>
                        </v-data-table>
                      </v-col>
                    </v-row>
                    <!--Preview & Send-->
                    <v-row>
                      <v-col cols="12">
                        <v-row class="justify-center mb-5">
                          <v-btn class="custom-btn mr-2" color="primary"
                                 @click="PreviewAndSend()">Preview and Send
                          </v-btn>
                        </v-row>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
            <!--</v-form>-->
            <!--</ValidationObserver>-->
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <!-- See Beneficiaries modal  -->
    <v-dialog v-model="seeBeneficiaryDialog" width="1300">
      <v-card style="justify-content: center; text-align: center">
        <v-card-title class="font-weight-bold justify-center" style="background-color: #2b4978; color: white">
          {{
            $t("container.payroll_management_v2.allotment_area_wise_ben_setup.title")
          }}
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-7">
          <ValidationObserver ref="formAdd" v-slot="{ invalid }">
            <form @submit.prevent="submitAllotmentWiseBeneficiary()">
              <v-row>
                <v-col cols="12" lg="4" md="4">
                  <div>
                    <div style="margin-left: -150px">
                      <strong>{{
                          $t("container.payroll_management_v2.allotment_area_wise_ben_setup.allotment_area")
                        }}:</strong>
                      {{ data.processor_type ?? "--" }}
                    </div>

                    <div style="padding-bottom: 8px; margin-left: -110px">
                      <strong>{{
                          $t("container.payroll_management_v2.allotment_area_wise_ben_setup.selected_beneficiaries")
                        }}:</strong>
                      {{ data.name_en ?? "--" }}
                    </div>

                  </div>
                </v-col>
                <v-col cols="12" lg="4" md="4">
                  <div>
                    <div style="padding-bottom: 8px; margin-left: -150px">
                      <strong>{{
                          $t("container.payroll_management_v2.allotment_area_wise_ben_setup.total_beneficiaries")
                        }}:</strong>
                      {{ data.processor_type ?? "--" }}
                    </div>

                    <div style="padding-bottom: 8px; margin-left: -100px">
                      <strong>{{
                          $t("container.payroll_management_v2.allotment_area_wise_ben_setup.payment_cycle_start_date")
                        }}:</strong>
                      {{ data.name_en ?? "--" }}
                    </div>

                  </div>
                </v-col>
                <v-col cols="12" lg="4" md="4">
                  <div style="margin-left: -100px">
                    <div style="padding-bottom: 8px">
                      <strong>{{
                          $t("container.payroll_management_v2.allotment_area_wise_ben_setup.allocated_beneficiaries")
                        }}:</strong>
                      {{ data.processor_type ?? "--" }}
                    </div>

                    <div style="padding-bottom: 8px">
                      <strong>{{
                          $t("container.payroll_management_v2.allotment_area_wise_ben_setup.payment_cycle_end_date")
                        }}:</strong>
                      {{ data.name_en ?? "--" }}
                    </div>

                  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" lg="4" md="4">
                  <div>
                    <div style="padding-bottom: 8px; margin-left: -100px">
                      <strong>{{
                          $t("container.payroll_management_v2.allotment_area_wise_ben_setup.payroll_eligible_amount")
                        }}:</strong>
                      {{ data.processor_type ?? "--" }}
                    </div>

                    <div style="padding-bottom: 8px;margin-left: -150px">
                      <strong>{{
                          $t("container.payroll_management_v2.allotment_area_wise_ben_setup.current_amount")
                        }}:</strong>
                      {{ data.name_en ?? "--" }}
                    </div>
                    <div style="padding-bottom: 8px;margin-left: -25px">
                      <strong>{{
                          $t("container.payroll_management_v2.allotment_area_wise_ben_setup.amount_of_money")
                        }}:</strong>
                      {{ data.name_en ?? "--" }}
                    </div>
                  </div>
                </v-col>
                <v-col cols="12" lg="4" md="4">
                  <div>
                    <div style="padding-bottom: 8px;margin-left: -35px">
                      <strong>{{
                          $t("container.payroll_management_v2.allotment_area_wise_ben_setup.amount_remain_ralance")
                        }}:</strong>
                      {{ data.processor_type ?? "--" }}
                    </div>

                    <div style="padding-bottom: 8px; margin-left: 0px">
                      <strong>{{
                          $t("container.payroll_management_v2.allotment_area_wise_ben_setup.total_amount_installments")
                        }}:</strong>
                      {{ data.name_en ?? "--" }}
                    </div>
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-data-table v-model="selectedBeneficiaries" :headers="seeBeneficiaryheaders"
                              :items="active_beneficiaries"
                              :items-per-page="pagination.perPage" :loading="isSeeLoading"
                              class="elevation-0 transparent row-pointer mt-5 mx-5" hide-default-footer
                              item-key="id" show-select>

                  <template v-slot:[`item.id`]="{ item }">
                                        <span>
                                            {{
                                            language == 'bn' ?
                                                $helpers.englishToBangla(item.id) :
                                                item.id
                                          }}
                                        </span>
                  </template>
                  <template v-slot:item.sl="{ item, index }">
                    {{
                      language === "bn"
                          ? $helpers.englishToBangla(
                              (pagination.current - 1) * pagination.perPage +
                              index +
                              1
                          )
                          : (pagination.current - 1) * pagination.perPage +
                          index +
                          1
                    }}
                  </template>

                  <template v-slot:item.allocated_beneficiary="{ item }">
                    {{
                      language === "bn"
                          ? $helpers.englishToBangla(item.allocated_beneficiary)
                          : item.allocated_beneficiary
                    }}
                  </template>

                  <template v-slot:[`item.active_beneficiary`]="{ item }">
                                        <span>
                                            {{
                                            language == 'bn' ?
                                                $helpers.englishToBangla(item.active_beneficiary) :
                                                item.active_beneficiary
                                          }}
                                        </span>
                  </template>
                  <!-- <template v-slot:footer="item">
                      <div class="text-center pt-2 v-data-footer justify-center pb-2">
                          <v-select
                              style=" position: absolute;right: 25px;width: 149px;transform: translate(0px, 0px);"
                              :items="items" hide-details dense outlined @change="onPageChange"
                              v-model="pagination.perPage"></v-select>
                          <v-pagination circle primary v-model="pagination.current"
                              :length="pagination.total" @input="onPageChange" :total-visible="11"
                              class="custom-pagination-item"></v-pagination>
                      </div>
                  </template> -->

                </v-data-table>
              </v-row>

              <v-row class="mx-0 my-0 py-2 mt-5" justify="end">
                <v-btn class="custom-btn-width py-2 mr-10" outlined
                       @click="seeBeneficiaryDialog = false">
                  {{ $t("container.list.cancel") }}
                </v-btn>

                <div>
                  <v-btn :disabled="!data.program_id ||
                                        !data.financial_year_id ||
                                        !data.remaining_installment_id || selectedBeneficiaries.length === 0"
                         :loading="loading" class="custom-btn-width success white--text py-2" color="primary"
                         type="submit">
                    {{ $t("container.list.submit") }}
                  </v-btn>
                </div>
              </v-row>
            </form>
          </ValidationObserver>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!--  See Beneficiaries modal  -->

    <!-- Preview and Send modal  -->
    <v-dialog v-model="previewAndSendDialog" width="1400">
      <v-card style="justify-content: center; text-align: center">
        <v-card-title class="font-weight-bold justify-center" style="background-color: #2b4978; color: white">
          {{
            $t("container.payroll_management_v2.allotment_area_wise_ben_setup.title_send_preview")
          }}
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-4">
          <ValidationObserver ref="formAdd" v-slot="{ invalid }">
            <form @submit.prevent="submitPreviewSendBeneficiary()">
              <template>
                <v-row class="mx-4" justify="space-between">
                  <!-- Checkbox on the left -->
                  <v-col class="text-left" cols="12" lg="2" md="2" sm="2">
                    {{ $t('container.list.total') }}:&nbsp;<span style="font-weight: bold;">

                                            {{
                      language === 'bn' ? $helpers.englishToBangla(
                          previewSendTotal) : previewSendTotal
                    }}
                                        </span>
                  </v-col>
                </v-row>
              </template>
              <v-row>
                <v-data-table :headers="sendBeneficiaryheaders" :items="previewSendList"
                              :items-per-page="pagination.perPage"
                              :loading="previewloading" class="elevation-0 transparent row-pointer mt-1 mx-5"
                              hide-default-footer
                              item-key="id">

                  <template v-slot:[`item.id`]="{ item }">
                                        <span>
                                            {{
                                            language == 'bn' ?
                                                $helpers.englishToBangla(item.id) :
                                                item.id
                                          }}
                                        </span>
                  </template>
                  <template v-slot:item.sl="{ item, index }">
                    {{
                      language === "bn"
                          ? $helpers.englishToBangla(
                              (pagination.current - 1) * pagination.perPage +
                              index +
                              1
                          )
                          : (pagination.current - 1) * pagination.perPage +
                          index +
                          1
                    }}
                  </template>

                  <template v-slot:item.allocated_beneficiary="{ item }">
                    {{
                      language === "bn"
                          ? $helpers.englishToBangla(item.allocated_beneficiary)
                          : item.allocated_beneficiary
                    }}
                  </template>

                  <template v-slot:[`item.active_beneficiary`]="{ item }">
                                        <span>
                                            {{
                                            language == 'bn' ?
                                                $helpers.englishToBangla(item.active_beneficiary) :
                                                item.active_beneficiary
                                          }}
                                        </span>
                  </template>
                  <template v-slot:item.status_name="{ item }">
                                        <span v-if="item.status == 1">
                                            {{ language === "bn" ? "সক্রিয়" : "Active" }}
                                        </span>
                    <span v-if="item.status == 2">
                                            {{ language === "bn" ? "নিষ্ক্রিয়" : "Inactive" }}
                                        </span>
                    <span v-if="item.status == 3">
                                            {{ language === "bn" ? "অপেক্ষেয়মান" : "Waiting" }}
                                        </span>
                  </template>
                </v-data-table>
              </v-row>

              <v-row align="center" class="mx-4" justify="end">
                <!-- Dropdown on the right -->
                <v-col class="text-right" cols="12" lg="4" md="4">
                  <div>
                    <strong>{{
                        $t("container.payroll_management_v2.allotment_area_wise_ben_send_preview.total_allocated_ben")
                      }}:</strong>
                    {{ previewSendList.length }}
                  </div>
                  <div>
                    <strong>{{
                        $t("container.payroll_management_v2.allotment_area_wise_ben_send_preview.total_amount")
                      }}:</strong>
                    {{ total_amount }}
                  </div>
                </v-col>
              </v-row>

              <v-row class="mx-0 my-0 py-2  mt-10" justify="center">
                <v-btn class="custom-btn-width py-2 mr-10" outlined
                       @click="previewAndSendDialog = false">
                  {{ $t("container.list.cancel") }}
                </v-btn>

                <v-btn :disabled="previewSendList.length === 0" :loading="loading"
                       class="custom-btn-width success white--text py-2" color="primary"
                       type="submit">
                  {{ $t("container.list.submit") }}
                </v-btn>
              </v-row>
            </form>
          </ValidationObserver>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!--  Preview and Send modal  -->
  </v-container>
</template>
<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import { mapActions, mapState } from "vuex";

export default {
  name: "Create",
  title: "CTM - Create Manage Allotment",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      data: {
        program_id: null,
        financial_year_id: null,
        division_id: null,
        district_id: null,
        location_type: null,
        sub_location_type: null,
        city_id: null,
        district_pouro_id: null,
        thana_id: null,
        upazila_id: null,
        union_id: null,
        ward_id: null,
        remaining_installment_id: null,
        allotment_id: null,

      },
      locationType: null,
      loading: false,
      isLoading: false,
      search: "",
      delete_id: "",
      districts: [],
      allotments: [],
      allowances: [],
      financial_years: [],
      active_installments: [],
      active_beneficiaries: [],
      isSeeLoading: false,
      allotmentAreaList: [],
      previewSendList: [],
      previewSendTotal: null,
      total_allocated_ben: null,
      total_amount: null,
      seeBeneficiaryDialog: false,
      previewAndSendDialog: false,
      previewloading: false,
      selectedBeneficiaries: [],
      total: null,
      totalItem: null,
      programInfo: null,
      pagination: {
        current: 1,
        total: 0,
        perPage: 10,
      },
      items: [5, 10, 15, 20, 40, 50, 100],
      selectedColumns: [
        "office_area",
        "allotment_area",
        "allotted_beneficiaries",
        "active_beneficiaries",
        "status"
      ], // Initially, first 6 columns are selected
      fixedColumns: ["sl", "actions"], // Two columns that will always remain visible
      user_permission: {
        division: null,
        division_name: null,
        district: null,
        district_name: null,
        location_type: null,
        location_type_name: null,
        upazila: null,
        upazila_name: null,
        city_corp: null,
        city_corp_name: null,
        district_pourashava: null,
        district_pourashava_name: null,
      },
      page: {
        current: 1,
        perPage: 10, // You can set the desired default page size
        total: 0,
      },
      payrollList: [
        {
          id: 1,
          area_type: "Gopalganj",
          allotment_area: "Ulpur",
          allocated_beneficiary: 120,
          active_beneficiary: 101,
          status: "Saved"
        },
        {
          id: 2,
          area_type: "Gopalganj",
          allotment_area: "Gopinathpur",
          allocated_beneficiary: 120,
          active_beneficiary: 102,
          status: "Not Saved"
        }
      ],
      programs: [],
      district_pouros: [],
      isEdit: false
    };

  },
  computed: {
    language: {
      get() {
        return this.$store.getters.getAppLanguage;
      }
    },
    ...mapState({
      divisions: (state) => state.Division.divisions,
    }),
    headers() {
      return [
        {
          text: this.$t("container.list.sl"),
          value: "sl",
          align: "start",
          sortable: false,
          fixed: true
        },
        {
          text: this.$t(
              "container.payroll_management_v2.area_wise_ben_list.area_type"
          ),
          value: "office_area",
          align: "center",
        },
        {
          text: this.$t(
              "container.payroll_management_v2.area_wise_ben_list.allotment_area"
          ),
          value: "allotment_area",
          align: "center",
        },
        {
          text: this.$t(
              "container.payroll_management_v2.area_wise_ben_list.allocated_beneficiary"
          ),
          value: "allotted_beneficiaries",
          align: "center",
        },
        {
          text: this.$t(
              "container.payroll_management_v2.area_wise_ben_list.active_beneficiary"
          ),
          value: "active_beneficiaries",
          align: "center",
        },
        {
          text: this.$t(
              "container.payroll_management_v2.area_wise_ben_list.status"
          ),
          value: "status",
          align: "center",
        },
        {
          text: this.$t('container.list.action'),
          fixed: true,
          value: "actions",
          align: "center",
          sortable: false,
          width: "28%"
        },

      ];
    },
    seeBeneficiaryheaders() {
      return [
        // {
        //     text: this.$t("container.list.sl"),
        //     value: "sl",
        //     align: "start",
        //     sortable: false,
        // },
        {
          text: this.$t(
              "container.payroll_management_v2.allotment_area_wise_ben_setup.ben_name"
          ),
          value: "name_en",
          align: "center",
        },
        {
          text: this.$t(
              "container.payroll_management_v2.allotment_area_wise_ben_setup.father_name"
          ),
          value: "father_name_en",
          align: "center",
        },
        {
          text: this.$t(
              "container.payroll_management_v2.allotment_area_wise_ben_setup.mother_name"
          ),
          value: "mother_name_en",
          align: "center",
        },
        {
          text: this.$t(
              "container.payroll_management_v2.allotment_area_wise_ben_setup.bank"
          ),
          value: "bank_name",
          align: "center",
        },
        {
          text: this.$t(
              "container.payroll_management_v2.allotment_area_wise_ben_setup.ward"
          ),
          value: "unionWardPourosova.name_en",
          align: "center",
        },
        {
          text: this.$t(
              "container.payroll_management_v2.allotment_area_wise_ben_setup.mobile_number"
          ),
          value: "mobile",
          align: "center",
        },
        {
          text: this.$t(
              "container.payroll_management_v2.allotment_area_wise_ben_setup.account_no"
          ),
          value: "account_number",
          align: "center",
        },
        {
          text: this.$t(
              "container.payroll_management_v2.allotment_area_wise_ben_setup.allowance_amount"
          ),
          value: "monthly_allowance",
          align: "center",
        },

      ];
    },
    sendBeneficiaryheaders() {
      return [
        {
          text: this.$t("container.list.sl"),
          value: "sl",
          align: "start",
          sortable: false,
        },
        {
          text: this.$t(
              "container.payroll_management_v2.allotment_area_wise_ben_send_preview.beneficiary_id"
          ),
          value: "beneficiary_id",
          align: "center",
        },
        {
          text: this.$t(
              "container.payroll_management_v2.allotment_area_wise_ben_send_preview.name_en"
          ),
          value: "name_en",
          align: "center",
        },
        {
          text: this.$t(
              "container.payroll_management_v2.allotment_area_wise_ben_send_preview.father_name_en"
          ),
          value: "father_name_en",
          align: "center",
        },
        {
          text: this.$t(
              "container.payroll_management_v2.allotment_area_wise_ben_send_preview.union_pourashava"
          ),
          value: "upazilaCityDistPourosova.name_en",
          align: "center",
        },
        {
          text: this.$t(
              "container.payroll_management_v2.allotment_area_wise_ben_send_preview.ward"
          ),
          value: "unionWardPourosova.name_en",
          align: "center",
        },
        // {
        //     text: this.$t(
        //         "container.payroll_management_v2.allotment_area_wise_ben_send_preview.program_name"
        //     ),
        //     value: "account_name",
        //     align: "center",
        // },
        {
          text: this.$t(
              "container.payroll_management_v2.allotment_area_wise_ben_send_preview.bank_account"
          ),
          value: "bank_name",
          align: "center",
        },
        {
          text: this.$t(
              "container.payroll_management_v2.allotment_area_wise_ben_send_preview.mobile"
          ),
          value: "mobile",
          align: "center",
        },
        {
          text: this.$t(
              "container.payroll_management_v2.allotment_area_wise_ben_send_preview.amount"
          ),
          value: "amount",
          align: "center",
        },
        {
          text: this.$t(
              "container.payroll_management_v2.allotment_area_wise_ben_send_preview.cash_out_charge"
          ),
          value: "charge",
          align: "center",
        },

        {
          text: this.$t(
              "container.payroll_management_v2.allotment_area_wise_ben_send_preview.total_amount"
          ),
          value: "total_amount",
          align: "center",
        },
        // {
        //     text: this.$t(
        //         "container.payroll_management_v2.allotment_area_wise_ben_send_preview.financial_account_status"
        //     ),
        //     value: "status",
        //     align: "center",
        // },

        {
          text: this.$t(
              "container.payroll_management_v2.allotment_area_wise_ben_send_preview.status"
          ),
          value: "status_name",
          align: "center",
        },
      ];
    },
    visibleHeaders() {
      // Combine fixed columns and selected columns
      const allVisibleColumns = [...this.fixedColumns, ...this.selectedColumns];

      // Filter the headers based on the visible columns
      return this.headers.filter((column) =>
          allVisibleColumns.includes(column.value)
      );
    },
    selectableColumns() {
      // Filter the columns that can be selected (exclude fixed columns)
      return this.headers.filter((column) => !column.fixed);
    },
  },
  created() {
  },
  mounted() {
    this.GetAllDivisions();
    if (this.$route.query.item) {
      let item = JSON.parse(this.$route.query.item);
      this.data.allotment_id = item.id;
      this.isEdit = true;
      this.getAllotmentWiseProgram(this.data.allotment_id);
      console.log(item, 'manage')
    }else{
      this.getAllAllotmentPrograms();
    }
    this.GetFinancial_Year();
    this.GetActiveInstallment();
    this.GetUserPermission();
    // this.GetAllProgram();
    this.getLocationType();

  },
  methods: {
    getLocationType() {
      this.$store
          .dispatch("getLookupByType", 1)
          .then((res) => (this.locationType = res));
    },
    // getAllotmentWiseProgram() {
    //   ApiService.get("/admin/emergency/get-allotment-wise-program")
    //       .then((res) => {
    //         this.programs = res.data;
    //       })
    //       .catch((error) => console.log(error));
    // },
    getAllotmentWiseProgram(allotment_id) {
      if (allotment_id != null) {
        ApiService.get(`/admin/emergency/get-allotment-wise-program/${allotment_id}`)
            .then((res) => {
              this.programs = res.data;
              console.log(this.allotments, 'one')
            })
            .catch((error) => console.log(error));
      }
    },
    getAllAllotmentPrograms() {
      ApiService.get(`/admin/emergency/get-all-allotment-programs`)
          .then((res) => {
            this.programs = res.data;
            console.log(res.data,'All')
          })
          .catch((error) => console.log(error));
    },
    getItemText(item) {
      return this.language === "bn" ? item.name_bn : item.name_en;
    },
    getLocationText(item) {
      return this.language === "bn" ? item.value_bn : item.value_en;
    },
    getFinancialItemText(item) {
      return this.language === "bn" ? item.financial_year : item.financial_year;
    },
    getInstallmentText(item) {
      return this.language === "bn" ? item.installment_name_bn : item.installment_name;
    },
    resetSearch() {
      if (!this.user_permission.division) {
        this.data.division_id = null;
      }
      if (!this.user_permission.district) {
        this.data.district_id = null;
      }
      if (!this.user_permission.city_corp) {
        this.data.city_id = null;
      }
      if (!this.user_permission.upazila) {
        this.data.upazila_id = null;
      }
      if (!this.user_permission.pouro_id) {
        this.data.district_pouro_id = null;
      }
      if (!this.user_permission.location_type) {
        this.data.location_type = null;
      }
      this.data.program_id = null;
      this.data.financial_year_id = null;

      this.data.sub_location_type = null;
      this.data.city_id = null;
      this.data.district_pouro_id = null;
      this.data.thana_id = null;
      this.upazila_id = null;
      this.data.union_id = null;
      this.data.ward_id = null;

      this.GetAllotmentArea();
    },
    // async GetAllProgram() {
    //   try {
    //     this.$axios
    //         .get("/global/program", {
    //           headers: {
    //             Authorization: "Bearer " + this.$store.state.token,
    //             "Content-Type": "multipart/form-data",
    //           },
    //         })
    //         .then((result) => {
    //           console.log(result, "programs");
    //           this.programs = result.data.data;
    //         })
    //         .catch((err) => {
    //           console.log(err, "error");
    //           if (err.response?.data?.errors) {
    //             this.$refs.form.setErrors(err.response.data.errors);
    //           }
    //           console.log(err.response);
    //           this.$toast.error(err?.response?.data?.message);
    //         });
    //   } catch (e) {
    //     console.log(e);
    //   }
    // },
    async GetUserPermission() {
      // this.isLoading = true;
      try {
        await this.$axios
            .get("/admin/beneficiary/getUserLocation", {
              headers: {
                Authorization: "Bearer " + this.$store.state.token,
                "Content-Type": "multipart/form-data",
              },
            })
            .then((result) => {
              console.log(result.data.data, "user_permission");
              let item = result.data.data;
              // User Permission Set
              if (item?.division) {
                this.data.division_id = item?.division?.id;
                this.user_permission.division = item?.division;
                this.user_permission.division_name =
                    this.language == "en"
                        ? item?.division?.name_en
                        : item?.division?.name_bn;
                if (!item?.district) {
                  this.onChangeDivision(item?.division?.id);
                } else {
                  this.data.district_id = item?.district?.id;
                  this.user_permission.district = item?.district;
                  this.user_permission.district_name =
                      this.language == "en"
                          ? item?.district?.name_en
                          : item?.district?.name_bn;
                }
              }
              if (item?.location_type) {
                this.user_permission.location_type = item?.location_type;
                this.data.location_type = item?.location_type?.id;
                this.user_permission.location_type_name =
                    this.language == "en"
                        ? item?.location_type?.value_en
                        : item?.location_type?.value_bn;
              }
              if (item?.district_pourashava) {
                this.data.district_pouro_id = item?.district_pourashava?.id;
                this.user_permission.district_pourashava =
                    item?.district_pourashava;
                this.onChangeDistrictPouro(item?.district_pourashava?.id);
                this.user_permission.district_pourashava_name =
                    this.language == "en"
                        ? item?.district_pourashava?.name_en
                        : item?.district_pourashava?.name_bn;
              }
              if (item?.upazila) {
                this.user_permission.upazila = item?.upazila;
                this.data.upazila_id = item?.upazila?.id;
                this.onChangeUpazila(item?.upazila?.id);
                this.user_permission.upazila_name =
                    this.language == "en"
                        ? item?.upazila?.name_en
                        : item?.upazila?.name_bn;
              }
              if (item?.city_corp) {
                this.data.city_id = item?.city_corp?.id;
                this.user_permission.city_corp = item?.city_corp;
                this.onChangeCity(item?.city_corp?.id);
                this.user_permission.city_corp_name =
                    this.language == "en"
                        ? item?.city_corp?.name_en
                        : item?.city_corp?.name_bn;
              }
              //this.isLoading = false;
              this.GetAllotmentArea();
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
    onChangeProgramName(event) {
      this.active_installments = [];
      if (this.data.financial_year_id) {
        this.GetActiveInstallment();
      }
      if (event) {
        this.onChangeProgram(event)
      } else {
        this.programInfo = null
      }

    },
    async onChangeProgram(event) {
      await this.$axios
          .get(`/admin/payroll/get-program-info/${event}`, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((result) => {
            this.programInfo = result?.data?.data?.allowance_program;
            console.log('program_info__', this.programInfo)
          });
    },
    async onChangeDivision(event) {
      await this.$axios
          .get(`/admin/district/get/${event}`, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((result) => {
            this.districts = result.data.data;
          });
    },
    async onChangeDistrict(event) {
      await this.$axios
          .get(`/admin/thana/get/${event}`, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((result) => {
            this.LocationType(this.data.location_type);
            this.thanas = result.data.data;
          });
    },
    async LocationType($event) {
      //reset all fields
      this.data.sub_location_type = null;
      this.data.city_id = null;
      this.data.district_pouro_id = null;
      this.data.thana_id = null;
      this.data.upazila_id = null;
      this.data.union_id = null;
      this.data.ward_id = null;

      this.cities = null;
      this.district_pouros = null;
      this.thanas = null;
      this.unions = null;
      this.wards = null;

      if (this.data.district_id != null && this.data.location_type != null) {
        console.log("LocationType", $event);
        if ($event === 1) {
          await this.$axios
              .get("/admin/city/get/" + this.data.district_id + "/" + $event, {
                headers: {
                  Authorization: "Bearer " + this.$store.state.token,
                  "Content-Type": "multipart/form-data",
                },
              })
              .then((result) => {
                this.district_pouros = result.data.data;
              });
        } else if ($event === 2) {
          await this.$axios
              .get(`/admin/thana/get/${this.data.district_id}`, {
                headers: {
                  Authorization: "Bearer " + this.$store.state.token,
                  "Content-Type": "multipart/form-data",
                },
              })
              .then((result) => {
                this.thanas = result.data.data;
              });
        } else if ($event === 3) {
          await this.$axios
              .get("/admin/city/get/" + this.data.district_id + "/" + $event, {
                headers: {
                  Authorization: "Bearer " + this.$store.state.token,
                  "Content-Type": "multipart/form-data",
                },
              })
              .then((result) => {
                this.cities = result.data.data;
              });
        }
      }
    },
    async onChangeUpazila(event) {
      this.data.union_id = null;
      this.data.ward_id = null;
      await this.$axios
          .get(`/admin/union/get/${this.data.upazila_id}`, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((result) => {
            this.unions = result.data.data;
          });
    },
    async onChangeSubLocationType(event) {
      if (event == 1) {
        await this.$axios
            .get(`/admin/union/pouro/get/${this.data.thana_id}`, {
              headers: {
                Authorization: "Bearer " + this.$store.state.token,
                "Content-Type": "multipart/form-data",
              },
            })
            .then((result) => {
              this.pouros = result.data.data;

              //clear data
              this.data.pouro_id = null;
              this.data.union_id = null;
              this.data.ward_id = null;
            });
        this.data.union_id = null;
      }
      if (event == 2) {
        this.onChangeUpazila(this.data.upazila_id);
        this.data.pouro_id = null;
      }
    },
    async onChangeUnionGetWard(event) {
      this.wards = [];
      this.data.ward_id = null;
      await this.$axios
          .get(`/admin/ward/get/${event}`, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((result) => {
            this.wards = result.data.data;
          });
    },
    async onChangeUnion(event) {
      await this.$axios
          .get(`/admin/ward/get/${this.data.union_id}`, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((result) => {
            this.wards = result.data.data;
          });
    },
    async onChangeCity(event) {
      this.data.thana_id = null;
      this.data.ward_id = null;

      await this.$axios
          .get(`/admin/thana/get/city/${event}`, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((result) => {
            this.thanas = result.data.data;
          });
    },
    async onChangeThana(event) {
      await this.$axios
          .get(`/admin/ward/get/thana/${this.data.thana_id}`, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((result) => {
            this.wards = result.data.data;
          });
    },
    async onChangeDistrictPouro(event) {
      this.data.ward_id = null;
      await this.$axios
          .get(`/admin/ward/get/district_pouro/${event}`, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((result) => {
            this.wards = result.data.data;
          });
    },
    onPageChange($event) {
      // this.pagination.current = $event;
      this.loading = true;
      this.GetAllotmentArea();
    },
    onPageSetup($event) {
      this.pagination = {
        ...this.pagination,
        current: 1,
      };
    },
    onSearch() {

      this.pagination = {
        ...this.pagination,
        current: 1,
      };
      this.GetAllotmentArea();
    },
    async GetAllotmentArea() {
      this.loading = true;
      const queryParams = {
        program_id: this.data.program_id,
        financial_year_id: this.data.financial_year_id,
        division_id: this.data.division_id,
        district_id: this.data.district_id,
        location_type_id: this.data.location_type,
        city_corp_id: this.data.city_id,
        district_pourashava_id: this.data.district_pouro_id,
        union_id: this.data.union_id,
        thana_id: this.data.thana_id,
        upazila_id: this.data.upazila_id,
        ward_id: this.data.ward_id,
        installment_schedule_id: this.data.remaining_installment_id,

        perPage: this.pagination.perPage,
        page: this.pagination.current,
        sortBy: this.sortBy,
        orderBy: this.sortDesc,
      };

      await this.$axios
          .get("/admin/payroll/get-allotment-area-list", {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data"
            },
            params: queryParams
          })
          .then(result => {
            this.allotmentAreaList = result.data.data;
            this.total = result?.data?.meta?.total;
            this.totalItem = result?.data?.meta?.total;
            console.log("results_total__", this.total);

            this.pagination.current = result?.data?.meta?.current_page;
            this.pagination.total = result?.data?.meta?.last_page;
            // this.pagination.grand_total = result.data.meta.total;
            this.loading = false;
          });
    },
    async GetPreviewSendData() {
      this.previewloading = true;
      const queryParams = {
        program_id: this.data.program_id,
        financial_year_id: this.data.financial_year_id,
        division_id: this.data.division_id,
        district_id: this.data.district_id,
        location_type_id: this.data.location_type,
        city_corp_id: this.data.city_id,
        district_pourashava_id: this.data.district_pouro_id,
        union_id: this.data.union_id,
        thana_id: this.data.thana_id,
        upazila_id: this.data.upazila_id,
        ward_id: this.data.ward_id,
        installment_schedule_id: this.data.remaining_installment_id,

        perPage: 500, // this.pagination.perPage
        page: this.pagination.current,
        sortBy: this.sortBy,
        orderBy: this.sortDesc,
      };

      await this.$axios
          .get("/admin/payroll/preview-beneficiaries", {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data"
            },
            params: queryParams
          })
          .then(result => {
            this.previewSendList = result.data.data;
            // this.total = result?.data?.meta?.total;
            this.previewSendTotal = result?.data?.meta?.total;
            console.log("results_total__", this.total);

            var res = result?.data?.data?.reduce((n, { total_amount }) => n + total_amount, 0)

            this.total_allocated_ben = res;
            this.total_amount = res;

            console.log('total_amount_', res);

            // this.pagination.current = result?.data?.meta?.current_page;
            //this.pagination.total = result?.data?.meta?.last_page;
            // this.pagination.grand_total = result.data.meta.total;
            this.previewloading = false;
          });
    },
    GetFinancial_Year() {
      this.$axios
          .get("/admin/financial-year/get", {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((result) => {
            this.financial_years = result.data.data;
          });
    },
    async GetActiveInstallment(event) {
      this.active_installments = [];
      if (this.data.program_id && this.data.financial_year_id) {
        await this.$axios
            .get(`/admin/payroll/get-active-installments/${this.data.program_id}/${this.data.financial_year_id}`, {
              headers: {
                Authorization: "Bearer " + this.$store.state.token,
                "Content-Type": "multipart/form-data",
              },
            })
            .then((result) => {
              this.active_installments = result.data.data;
            });
      }
    },
    async seeBeneficiary(event) {
      this.isSeeLoading = true;
      this.active_beneficiaries = [];
      this.data.allotment_id = event;

      this.seeBeneficiaryDialog = true
      await this.$axios
          .get(`/admin/payroll/get-active-beneficiaries/${event}`, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((result) => {
            this.active_beneficiaries = result.data.data;
            this.isSeeLoading = false;
          });

    },
    PreviewAndSend() {
      this.previewAndSendDialog = true
      this.previewSendList = []
      this.GetPreviewSendData()
    },
    submitPreviewSendBeneficiary() {
      let fd = new FormData();

      // Convert each object in the beneficiaries array to a JSON string
      this.previewSendList.forEach((beneficiary, index) => {
        fd.append(`payroll_details[${index}][id]`, beneficiary?.payroll_id);
        fd.append(`payroll_details[${index}][payroll_id]`, beneficiary?.payroll_detail_id);
      });

      try {
        this.$store
            .dispatch("PayrollManagement/SubmitPreviewSendBeneficiaries", fd)
            .then((res) => {
              console.log(res, "submit__");
              if (res.data?.success) {
                console.log(res.data?.success, "submit__");
                this.$toast.success("Beneficiary submit Successfully");

                this.previewAndSendDialog = true
                this.previewSendList = []
                // this.GetAllotmentArea();
              } else if (res.response?.data?.errors) {
                this.$refs.form.setErrors(res.response.data.errors);
                this.errors = res.response.data.errors;
                this.$toast.error(res.response.data.message);
              }
              console.log(this.$refs);
              console.log(this.errors, "this.errors");
            });
      } catch (e) {
        console.log(e);
      }
    },
    submitAllotmentWiseBeneficiary() {
      if (this.selectedBeneficiaries.length === 0) {
        this.$toast.error("Please select at least one item!!!");
        return;
      }
      let fd = new FormData();

      fd.append("program_id", this.data.program_id);
      fd.append("financial_year_id", this.data.financial_year_id);
      fd.append("allotment_id", this.data.allotment_id);
      fd.append("installment_schedule_id", this.data.remaining_installment_id);

      // console.log("to_program_id", this.submit_data.to_program_id);

      console.log('beneficiary_', this.selectedBeneficiaries)

      // Convert each object in the beneficiaries array to a JSON string
      this.selectedBeneficiaries.forEach((beneficiary, index) => {
        fd.append(`payroll_details[${index}][beneficiary_id]`, beneficiary?.id);
        fd.append(`payroll_details[${index}][amount]`, beneficiary?.monthly_allowance ?? 0);
      });

      try {
        this.$store
            .dispatch("PayrollManagement/SetBeneficiaries", fd)
            .then((res) => {
              console.log(res, "submit__");
              if (res.data?.success) {
                console.log(res.data?.success, "submit__");
                this.$toast.success("Beneficiary Set Successfully");
                this.seeBeneficiaryDialog = false;
                this.selectedBeneficiaries = [];
                this.GetAllotmentArea();
                // this.$router.push({ name: "beneficiary_shifting_list" });
              } else if (res.response?.data?.errors) {
                this.$refs.form.setErrors(res.response.data.errors);
                this.errors = res.response.data.errors;
                this.$toast.error(res.response.data.message);
              }
              console.log(this.$refs);
              console.log(this.errors, "this.errors");
            });
      } catch (e) {
        console.log(e);
      }
    },
    updateVisibleColumns() {
      // Triggered when the selected columns change
      // Update the visibleHeaders based on the selected columns
      this.visibleHeaders = this.headers.filter((column) =>
          this.selectedColumns.includes(column.value)
      );
    },
    ...mapActions({
      GetAllDivisions: "Division/GetAllDivisions",
    }),
  },
  watch: {
    "$i18n.locale": "updateHeaderTitle",
  },

};
</script>
<style scoped>
.custom-table {
  width: 100%;
  border-collapse: collapse;
}

.custom-table th,
.custom-table td {
  border: 1px solid black;
  padding: 10px;
  text-align: center;
}

.custom-table th {
  background-color: #afc6e9;
  color: #000;
}

/* Hover effect on rows */
.custom-table tbody tr:hover {
  background-color: #ffffff;
}
</style>