<template>
  <v-container fluid>
    <Spinner :loading="loading"/>
    <v-card class="ma-0 pa-0" justify="center" outlined>
      <v-card-title class="component-title">
        <div class="clearfix">
          <div class="title-left">
            <h4 class="title-text">
              {{
                $t("container.emergency_payment.add_new")
              }}
            </h4>
          </div>
        </div>
      </v-card-title>
      <v-card-text>
        <v-col cols="12" lg="12" md="6">
          <ValidationObserver ref="form" v-slot="{ invalid }">
            <v-form @submit.prevent="createEmergencyAllotment()">
              <v-container class="px-0 py-0">
                <v-row>
                  <v-col cols="12" lg="6" md="6">
                    <ValidationProvider
                        v-slot="{ errors }"
                        name="Emergency Payment Name"
                        rules="required"
                        vid="payment_name"
                    >

                      <label style="display: inline-block"
                      >{{
                          $t(
                              "container.emergency_payment.payment_name"
                          )
                        }}
                      </label>
                      <span style="margin-left: 4px; color: red"
                      >*</span
                      >
                      <v-text-field
                          v-model="data.payment_name"
                          :error="!!errors[0]"
                          :error-messages="
                          errors[0]
                            ? language === 'bn'
                              ? 'অনুগ্রহ করে জরুরি অর্থপ্রদানের নাম লিখুন'
                              : 'Please enter the emergency payment name'
                            : ''
                        "
                          :hide-details="!errors[0]"
                          clearable
                          outlined
                          required
                          type="text"
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col cols="12" lg="6" md="6">
                    <ValidationProvider
                        v-slot="{ errors }"
                        name="Program Name"
                        rules="required"
                        vid="program_name"
                    >
                      <label style="display: inline-block"
                      >{{
                          $t(
                              "container.emergency_payment.program_name"
                          )
                        }}
                      </label>
                      <span style="margin-left: 4px; color: red"
                      >*</span
                      >
                      <v-autocomplete
                          v-model="data.program_id"
                          :error="!!errors[0]"
                          :error-messages="
                          errors[0]
                            ? language === 'bn'
                              ? 'অনুগ্রহ করে প্রোগ্রামের নাম নির্বাচন করুন'
                              : 'Please select the program name'
                            : ''
                        "
                          :hide-details="!errors[0]"
                          :items="allowanceProgrames"
                          clearable
                          item-text="name_en"
                          item-value="id"
                          outlined
                          multiple
                          required
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <v-col cols="12" lg="6" md="6">
                    <ValidationProvider
                        v-slot="{ errors }"
                        name="Started Date"
                        rules="required"
                        vid="starting_period"
                    >
                      <label style="display: inline-block"
                      >{{
                          $t(
                              "container.emergency_payment.starting_period"
                          )
                        }}
                      </label>
                      <span style="margin-left: 4px; color: red"
                      >*</span
                      >
                      <v-menu
                          :close-on-content-click="false"
                          :nudge-right="40"
                          min-width="auto"
                          offset-y
                          transition="scale-transition"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                              v-model="data.starting_period"
                              :error="!!errors[0]"
                              :error-messages="errors[0]
                            ? language === 'bn'
                              ? 'অনুগ্রহ করে শুরুর সময়কাল লিখুন'
                              : 'Please enter started period'
                            : ''
                        "
                              :hide-details="!errors[0]"
                              append-icon="mdi-calendar"
                              clearable
                              outlined
                              readonly
                              v-bind="attrs"
                              v-on="on"

                          ></v-text-field>
                        </template>
                        <v-date-picker
                            v-model="data.starting_period"
                            no-title
                            scrollable
                        ></v-date-picker>
                      </v-menu>
                    </ValidationProvider>
                  </v-col>
                  <v-col cols="12" lg="6" md="6">
                    <ValidationProvider
                        v-slot="{ errors }"
                        name="Started Date"
                        rules="required"
                        vid="starting_period"
                    >
                      <label style="display: inline-block"
                      >{{
                          $t(
                              "container.emergency_payment.closing_period"
                          )
                        }}
                      </label>
                      <span style="margin-left: 4px; color: red"
                      >*</span
                      >
                      <v-menu
                          :close-on-content-click="false"
                          :nudge-right="40"
                          min-width="auto"
                          offset-y
                          transition="scale-transition"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                              v-model="data.closing_period"

                              :error="!!errors[0]"
                              :error-messages="errors[0]
                            ? language === 'bn'
                              ? 'অনুগ্রহ করে সমাপ্তির সময়কাল লিখুন'
                              : 'Please enter closing period'
                            : ''
                        "
                              :hide-details="!errors[0]"
                              append-icon="mdi-calendar"
                              clearable
                              outlined
                              readonly
                              v-bind="attrs"
                              v-on="on"

                          ></v-text-field>
                        </template>
                        <v-date-picker
                            v-model="data.closing_period"
                            no-title
                            scrollable
                        ></v-date-picker>
                      </v-menu>
                    </ValidationProvider>
                  </v-col>
                  <v-col cols="12" lg="6" md="6">
                    <ValidationProvider
                        v-slot="{ errors }"
                        name="Per person amount"
                        rules="required"
                        vid="per_person_amount"
                    >
                      <label style="display: inline-block"
                      >{{
                          $t(
                              "container.emergency_payment.per_person_amount"
                          )
                        }}
                      </label>
                      <span style="margin-left: 4px; color: red"
                      >*</span
                      >
                      <v-text-field
                          v-model="data.per_person_amount"
                          :error="!!errors[0]"
                          :error-messages="
                          errors[0]
                            ? language === 'bn'
                              ? 'অনুগ্রহ করে প্রতি ব্যক্তি পরিমাণ লিখুন'
                              : 'Please enter per person amount'
                            : ''
                        "
                          :hide-details="!errors[0]"

                          clearable
                          outlined
                          required
                          type="number"
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col cols="12" lg="6" md="6">
                    <ValidationProvider
                        v-slot="{ errors }"
                        name="Payment Cycle"
                        rules="required"
                        vid="payment_cycle"
                    >
                      <label style="display: inline-block"
                      >{{
                          $t(
                              "container.emergency_payment.payment_cycle"
                          )
                        }}
                      </label>
                      <span style="margin-left: 4px; color: red"
                      >*</span
                      >
                      <v-autocomplete
                          v-model="data.payment_cycle"
                          :error="!!errors[0]"
                          :error-messages="
                          errors[0]
                            ? language === 'bn'
                              ? 'অনুগ্রহ করে পেমেন্ট সাইকেল নির্বাচন করুন'
                              : 'Please select the payment cycle'
                            : ''
                        "
                          :hide-details="!errors[0]"
                          :items="payment_cycles"
                          clearable
                          item-text="name"
                          item-value="name"
                          outlined
                          required
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <!-- location panel -->
                  <!-- Division List -->
                  <v-col cols="12" lg="6" md="6">
                    <ValidationProvider
                        v-slot="{ errors }"
                        name="Division"
                        rules="required"
                        vid="division"
                    >
                      <label style="display: inline-block"
                      >{{
                          $t(
                              "container.system_config.demo_graphic.division.division"
                          )
                        }}
                      </label>
                      <span style="margin-left: 4px; color: red"
                      >*</span
                      >
                      <v-autocomplete
                          v-model="data.division_id"
                          :error="!!errors[0]"
                          :error-messages="
                                    errors[0]
                                      ? language === 'bn'
                                        ? 'অনুগ্রহ করে বিভাগের নাম নির্বাচন করুন'
                                        : 'Please select the division name'
                                      : ''
                                  "
                          :hide-details="!errors[0]"
                          :items="divisions"
                          clearable
                          item-text="name_en"
                          item-value="id"
                          outlined
                          required
                          @change="getDistrictList"
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <!--District List-->
                  <v-col cols="12" lg="6" md="6">
                    <ValidationProvider
                        v-slot="{ errors }"
                        name="District"
                        rules="required"
                        vid="district"
                    >
                      <label style="display: inline-block"
                      >{{
                          $t(
                              "container.system_config.demo_graphic.district.district"
                          )
                        }}
                      </label>
                      <span style="margin-left: 4px; color: red"
                      >*</span
                      >
                      <v-autocomplete
                          v-model="data.district_id"
                          :error="!!errors[0]"
                          :error-messages="
                                    errors[0]
                                      ? language === 'bn'
                                        ? 'অনুগ্রহ করে জেলার নাম নির্বাচন করুন'
                                        : 'Please select the district name'
                                      : ''
                                  "
                          :hide-details="!errors[0]"
                          :items="districts"
                          clearable
                          item-text="name_en"
                          item-value="id"
                          outlined
                          required
                          @input="getThanaList"
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <!--Location Type List-->
                  <v-col cols="12" lg="6" md="6">
                    <ValidationProvider
                        v-slot="{ errors }"
                        name="Location Type"
                        rules="required"
                        vid="location_type"
                    >
                      <label style="display: inline-block"
                      >{{ $t("container.list.location_type") }}
                      </label>
                      <span style="margin-left: 4px; color: red"
                      >*</span
                      >
                      <v-autocomplete
                          v-model="data.location_type"
                          :error="!!errors[0]"
                          :error-messages="
                                    errors[0]
                                      ? language === 'bn'
                                        ? 'অবস্থানের ধরন নির্বাচন করুন'
                                        : 'Please select the location type'
                                      : ''
                                  "
                          :hide-details="!errors[0]"
                          :items="locationType"
                          clearable
                          item-text="value_en"
                          item-value="id"
                          outlined
                          required
                          @input="LocationType($event)"
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <!--Upazila List-->
                  <v-col
                      v-if="data.location_type === 2"
                      cols="12"
                      lg="6"
                      md="6"
                  >
                    <ValidationProvider
                        v-slot="{ errors }"
                        name="Upazila"
                        rules="required"
                        vid="thana_id"
                    >
                      <label style="display: inline-block"
                      >{{
                          $t(
                              "container.system_config.demo_graphic.ward.upazila"
                          )
                        }}
                      </label>
                      <span style="margin-left: 4px; color: red"
                      >*</span
                      >
                      <v-autocomplete
                          v-model="data.thana_id"
                          :error="!!errors[0]"
                          :error-messages="
                                    errors[0]
                                      ? language === 'bn'
                                        ? 'অনুগ্রহ করে উপজেলার নাম নির্বাচন করুন'
                                        : 'Please select the upazila name'
                                      : ''
                                  "
                          :hide-details="!errors[0]"
                          :items="thanas"
                          clearable
                          item-text="name_en"
                          item-value="id"
                          outlined
                          required
                          @change="getUnionList"
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <!--Sub Location List-->
                  <v-col
                      v-if="data.location_type === 2"
                      cols="6"
                      lg="6"
                      md="6"
                  >
                    <label style="display: inline-block"
                    >{{
                        $t(
                            "container.system_config.demo_graphic.ward.subLocation_type"
                        )
                      }}
                    </label>
                    <span style="margin-left: 4px; color: red">*</span>
                    <ValidationProvider
                        v-slot="{ errors }"
                        name="Sub Location"
                        rules="required"
                        vid="subLocationType"
                    >
                      <v-autocomplete
                          v-model="data.sub_location_type"
                          :error="!!errors[0]"
                          :error-messages="
                                errors[0]
                                  ? language === 'bn'
                                    ? 'অনুগ্রহ পূর্বক সাব লোকেশন প্রদান করুন '
                                    : 'Please enter Sub Location'
                                  : ''
                              "
                          :hide-details="!errors[0]"
                          :item-text="getItemValue"
                          :items="subLocationType"
                          class="no-arrow-icon"
                          item-value="id"
                          outlined
                          @input="SubLocationType($event)"
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <!--Upazila Union List-->
                  <v-col
                      v-if="data.location_type === 2 && data.sub_location_type === 2"

                      cols="12"
                      lg="6"
                      md="6"
                  >
                    <ValidationProvider
                        v-slot="{ errors }"
                        name="union"
                        rules="required"
                        vid="union_id"
                    >
                      <label style="display: inline-block"
                      >{{
                          $t(
                              "container.system_config.demo_graphic.ward.union"
                          )
                        }}
                      </label>
                      <span style="margin-left: 4px; color: red"
                      >*</span
                      >
                      <v-autocomplete
                          v-model="data.union_id"
                          :error="!!errors[0]"
                          :error-messages="
                                    errors[0]
                                      ? language === 'bn'
                                        ? 'অনুগ্রহ করে ইউনিয়নের নাম নির্বাচন করুন'
                                        : 'Please select the union name'
                                      : ''
                                  "
                          :hide-details="!errors[0]"
                          :items="unions"
                          clearable
                          item-text="name_en"
                          item-value="id"
                          outlined
                          required
                          @input="onChangeUnion($event)"
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <!--Upazila union ward List-->
                  <v-col
                      v-if="
                            data.location_type === 2 &&
                            data.sub_location_type === 2
                          "
                      cols="6"
                      lg="6"
                      md="6"
                  >
                    <ValidationProvider
                        v-slot="{ errors }"
                        name="Ward"
                        rules="required"
                        vid="ward_id_union"
                    >
                      <label style="display: inline-block"
                      >{{
                          $t(
                              "container.system_config.demo_graphic.ward.ward"
                          )
                        }}
                      </label>
                      <span style="margin-left: 4px; color: red">*</span>
                      <v-autocomplete
                          v-model="data.ward_id_union"
                          :error="!!errors[0]"
                          :error-messages="
                                errors[0]
                                  ? language === 'bn'
                                    ? 'অনুগ্রহ পূর্বক ওয়ার্ড প্রদান করুন '
                                    : 'Please enter Ward'
                                  : ''
                              "
                          :hide-details="!errors[0]"
                          :item-text="getItemText"
                          :items="wards_upazila_union"
                          clearable
                          item-value="id"
                          outlined
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <!--Upazila Paurashava List-->
                  <v-col
                      v-if="
                            data.location_type === 2 &&
                            data.sub_location_type === 1
                          "
                      cols="6"
                  >
                    <ValidationProvider
                        v-slot="{ errors }"
                        name="Pouroshava"
                        rules="required"
                        vid="pouro_id"
                    >
                      <label style="display: inline-block"
                      >{{
                          $t(
                              "container.system_config.demo_graphic.ward.pouro"
                          )
                        }}
                      </label>
                      <span style="margin-left: 4px; color: red">*</span>
                      <v-autocomplete
                          v-model="data.pouro_id"
                          :error="!!errors[0]"
                          :error-messages="
                                errors[0]
                                  ? language === 'bn'
                                    ? 'অনুগ্রহ পূর্বক পৌরসভা প্রদান করুন '
                                    : 'Please enter Pourashava'
                                  : ''
                              "
                          :hide-details="!errors[0]"
                          :item-text="getItemText"
                          :items="pouros"
                          item-value="id"
                          outlined
                          @input="onChangePouro($event)"
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <!--Upazila Paurashava Ward List-->
                  <v-col
                      v-if="
                            data.location_type === 2 &&
                            data.sub_location_type === 1 && data.pouro_id
                          "
                      cols="6"
                      lg="6"
                      md="6"
                  >
                    <ValidationProvider
                        v-slot="{ errors }"
                        name="Ward"
                        rules="required"
                        vid="ward_id_union"
                    >
                      <label style="display: inline-block">Ward </label>
                      <span style="margin-left: 4px; color: red">*</span>
                      <v-autocomplete
                          v-model="data.ward_id_pouro"
                          :error="!!errors[0]"
                          :error-messages="
                                errors[0]
                                  ? language === 'bn'
                                    ? 'অনুগ্রহ পূর্বক ওয়ার্ড প্রদান করুন '
                                    : 'Please enter Ward'
                                  : ''
                              "
                          :hide-details="!errors[0]"
                          :item-text="getItemText"
                          :items="wards_upazila_pouro"
                          clearable
                          item-value="id"
                          outlined
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <!--City Corporation List-->
                  <v-col
                      v-if="data.location_type === 3"
                      cols="12"
                      lg="6"
                      md="6"
                  >
                    <ValidationProvider
                        v-slot="{ errors }"
                        name="city corporation"
                        rules="required"
                        vid="city_id"
                    >
                      <label style="display: inline-block"
                      >{{
                          $t(
                              "container.system_config.demo_graphic.ward.city"
                          )
                        }}
                      </label>
                      <span style="margin-left: 4px; color: red"
                      >*</span
                      >
                      <v-autocomplete
                          v-model="data.city_id"
                          :error="!!errors[0]"
                          :error-messages="
                                    errors[0]
                                      ? language === 'bn'
                                        ? 'অনুগ্রহ করে সিটি কর্পোরেশনের নাম নির্বাচন করুন'
                                        : 'Please select the city corporation Name'
                                      : ''
                                  "
                          :hide-details="!errors[0]"
                          :items="cities"
                          clearable
                          item-text="name_en"
                          item-value="id"
                          outlined
                          required
                          @change="getCityThanaList"
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <!--City Thana List-->
                  <v-col
                      v-if="data.location_type === 3"
                      cols="12"
                      lg="6"
                      md="6"
                  >
                    <ValidationProvider
                        v-slot="{ errors }"
                        name="thana"
                        rules="required"
                        vid="city_thana_id"
                    >
                      <label style="display: inline-block"
                      >{{
                          $t(
                              "container.system_config.demo_graphic.ward.thana"
                          )
                        }}
                      </label>
                      <span style="margin-left: 4px; color: red"
                      >*</span
                      >
                      <v-autocomplete
                          v-model="data.city_thana_id"
                          :error="!!errors[0]"
                          :error-messages="
                                    errors[0]
                                      ? language === 'bn'
                                        ? 'অনুগ্রহ করে থানার নাম নির্বাচন করুন'
                                        : 'Please select the thana Name'
                                      : ''
                                  "
                          :hide-details="!errors[0]"
                          :items="city_thanas"
                          clearable
                          item-text="name_en"
                          item-value="id"
                          outlined
                          required
                          @input="OnChangeCityThana($event)"
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <!--City Thana Ward List-->
                  <v-col
                      v-if="data.location_type === 3"
                      cols="6"
                      lg="6"
                      md="6"
                  >
                    <ValidationProvider
                        v-slot="{ errors }"
                        name="Ward"
                        rules="required"
                        vid="ward_id_city"
                    >
                      <label style="display: inline-block"
                      >{{
                          $t(
                              "container.system_config.demo_graphic.ward.ward"
                          )
                        }}
                      </label>
                      <span style="margin-left: 4px; color: red">*</span>
                      <v-autocomplete
                          v-model="data.ward_id_city"
                          :error="!!errors[0]"
                          :error-messages="
                                errors[0]
                                  ? language === 'bn'
                                    ? 'অনুগ্রহ পূর্বক ওয়ার্ড প্রদান করুন '
                                    : 'Please enter Ward'
                                  : ''
                              "
                          :hide-details="!errors[0]"
                          :item-text="getItemText"
                          :items="wards_city"
                          clearable
                          item-value="id"
                          outlined
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <!--District Paurashova List-->
                  <v-col
                      v-if="data.location_type === 1"
                      cols="12"
                      lg="6"
                      md="6"
                  >
                    <ValidationProvider
                        v-slot="{ errors }"
                        name="District Pourashava"
                        rules="required"
                        vid="district_pouro_id"
                    >
                      <label style="display: inline-block"
                      >{{
                          $t(
                              "container.system_config.demo_graphic.ward.pouro"
                          )
                        }}
                      </label>
                      <span style="margin-left: 4px; color: red"
                      >*</span
                      >
                      <v-autocomplete
                          v-model="data.district_pouro_id"
                          :error="!!errors[0]"
                          :error-messages="
                                    errors[0]
                                      ? language === 'bn'
                                        ? 'অনুগ্রহ করে জেলার পৌরশব নাম নির্বাচন করুন'
                                        : 'Please select the district Paurashava Name'
                                      : ''
                                  "
                          :hide-details="!errors[0]"
                          :items="district_poros"
                          clearable
                          item-text="name_en"
                          item-value="id"
                          outlined
                          required
                          @input="onChangeDistrictPouro"
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <!--District Pourashava Ward list-->
                  <v-col
                      v-if="data.location_type === 1"
                      cols="6"
                      lg="6"
                      md="6"
                  >
                    <ValidationProvider
                        v-slot="{ errors }"
                        name="Ward"
                        rules="required"
                        vid="ward_id_dist"
                    >
                      <label style="display: inline-block"
                      >{{
                          $t(
                              "container.system_config.demo_graphic.ward.ward"
                          )
                        }}
                      </label>
                      <span style="margin-left: 4px; color: red">*</span>
                      <v-autocomplete
                          v-model="data.ward_id_dist"
                          :error="!!errors[0]"
                          :error-messages="
                                errors[0]
                                  ? language === 'bn'
                                    ? 'অনুগ্রহ পূর্বক ওয়ার্ড প্রদান করুন '
                                    : 'Please enter Ward'
                                  : ''
                              "
                          :hide-details="!errors[0]"
                          :item-text="getItemText"
                          :items="wards_dist"
                          clearable
                          item-value="id"
                          outlined
                      >
                      </v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <!--Location panel ends-->
                  <v-col cols="12" lg="6" md="6">
                    <ValidationProvider
                        v-slot="{ errors }"
                        name="No of new Beneficiary"
                        rules="required"
                        vid="no_of_new_benificiary"
                    >
                      <label style="display: inline-block"
                      >{{
                          $t(
                              "container.emergency_payment.no_of_new_benificiary"
                          )
                        }}
                      </label>
                      <span style="margin-left: 4px; color: red"
                      >*</span
                      >
                      <v-text-field
                          v-model="data.no_of_new_benificiary"
                          :error="!!errors[0]"
                          :error-messages="
                          errors[0]
                            ? language === 'bn'
                              ? 'অনুগ্রহ করে নতুন সুবিধাভোগীর সংখ্যা লিখুন৷'
                              : 'Please enter the no of new beneficiary'
                            : ''
                        "
                          :hide-details="!errors[0]"
                          clearable
                          outlined
                          required
                          type="number"
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col cols="12" lg="6" md="6">
                    <ValidationProvider
                        v-slot="{ errors }"
                        name="No of existing beneficiary"
                        rules="required"
                        vid="no_of_existing_benificiary"
                    >
                      <label style="display: inline-block"
                      >{{
                          $t(
                              "container.emergency_payment.no_of_existing_benificiary"
                          )
                        }}
                      </label>
                      <span style="margin-left: 4px; color: red"
                      >*</span
                      >
                      <v-text-field
                          v-model="data.no_of_existing_benificiary"
                          :error="!!errors[0]"
                          :error-messages="
                          errors[0]
                            ? language === 'bn'
                              ? 'অনুগ্রহ করে বিদ্যমান সুবিধাভোগীর সংখ্যা লিখুন'
                              : 'Please enter the no of existing beneficiary'
                            : ''
                        "
                          :hide-details="!errors[0]"
                          clearable
                          outlined
                          required
                          type="number"
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <!-- Button Part -->
                  <v-col class="text-right" cols="12">
                    <v-btn
                        class="custom-btn mr-2"
                        color="primary"
                        router
                        to="/emergency-payment/emergency-allotment"
                    >{{ $t("container.list.back") }}
                    </v-btn>

                    <v-btn
                        :disabled="invalid"
                        :loading="loading"
                        class="custom-btn mr-2"
                        color="success"
                        type="submit"
                    >{{ $t("container.list.submit") }}
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </ValidationObserver>
        </v-col>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
import { mapActions, mapState } from "vuex";
import { extend, ValidationObserver, ValidationProvider } from "vee-validate";
import { required } from "vee-validate/dist/rules";
import Spinner from "@/components/Common/Spinner.vue";
extend("required", required);
export default {
  name: "Create",
  title: "CTM - Emergency Allotment Create",
  components: {
    ValidationProvider,
    ValidationObserver,
    Spinner,
  },
  data() {
    return {
      data: {
        id: null,
        program_id: [],
        payment_name: null,
        division_id: null,
        district_id: null,
        location_type: null,
        sub_location_type: null,
        thana_id: null,
        pouro_id: null,
        union_id: null,
        city_id: null,
        city_thana_id: null,
        district_pouro_id: null,
        ward_id_city: null,
        ward_id_upazila_union: null,
        ward_id_upazila_pouro: null,
        ward_id_dist: null,
        no_of_new_benificiary: null,
        no_of_existing_benificiary: null,
        per_person_amount: null,
        payment_cycle: null,
        starting_period: null,
        closing_period: null,
      },
      districts: [],
      district_poros: [],
      cities: [],
      thanas: [],
      programs: [],
      city_thanas: [],
      unions: [],
      wards_city: [],
      wards_upazila_pouro: [],
      wards_upazila_union: [],
      wards: [],
      locationType: [],
      subLocationType: [
        {
          id: 1,
          value_en: "Pouroshava",
          value_bn: "পৌরসভা",
        },

        {
          id: 2,
          value_en: "Union",
          value_bn: "ইউনিয়ন ",
        },
      ],
      pouros: [],
      wards_dist: [],
      loading: false,
      search: "",
      pagination: {
        current: 1,
        total: 0,
        perPage: 5,
      },
      items: [5, 10, 15, 20, 40, 50, 100],
      payment_cycles: [
        {
          id: 1,
          name: "Monthly",
        },
        {
          id: 2,
          name: "Yearly",
        },
        {
          id: 3,
          name: "Half Yearly",
        },
      ],
    };
  },
  computed: {
    ...mapState({
      divisions: (state) => state.Division.divisions,
      allowanceProgrames: (state) => state.Allowance.allowanceProgrames,
    }),
    language: {
      get() {
        return this.$store.getters.getAppLanguage;
      },
    },
  },

  created() {
    this.registerCustomRules();
  },
  mounted() {
    this.updateHeaderTitle();
    this.GetAllDivisions();
    this.GetAllAllownceProgram();
    this.getLocationType();
  },
  methods: {
    GeneratePDF() {
      this.$axios
          .get("/admin/union/generate-pdf", {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
            params: queryParams,
          })
          .then((result) => {
            window.open(result.data.data.url, "_blank");
          })
          .catch((error) => {
            console.error("Error generating PDF:", error);
          });
    },
    registerCustomRules() {
      extend("codeRules", (value) => {
        return (
            value.toString().length <= 6 ||
            this.$t("container.system_config.demo_graphic.ward.code") +
            " can have maximum 6 digit"
        );
      });
    },
    async createEmergencyAllotment() {
      try {
        let fd = new FormData();
        for (const [key, value] of Object.entries(this.data)) {
          if (value !== null) {
            fd.append(key, value);
          }
        }
        ApiService
            .post("/admin/emergency/allotments", fd, {
              headers: {
                Authorization: "Bearer " + this.$store.state.token,
                "Content-Type": "application/json",
              },
            })
            .then((res) => {
              console.log(res);
              if (res.data?.success) {
                this.$toast.success(
                    this.language === "bn"
                        ? "জরুরী বরাদ্দ সফলভাবে তৈরি করা হয়েছে"
                        : "Emergency Allotment Created Successfully"
                );
                this.$router.push("/emergency-payment/emergency-allotment");
                this.resetData();
              } else if (res?.data?.errors) {
                this.$refs.form.setErrors(res.data.errors);
                this.$toast.error(res.data.message);
              }
            })
            .catch((error) => {
              console.error("API error:", error);
            });
      } catch (e) {
        console.log(e, "err");
      }
    },
    getLocationType() {
      this.$store
          .dispatch("getLookupByType", 1)
          .then((res) => (this.locationType = res));
    },
    async LocationType($event) {
      if (this.data.district_id != null && this.data.location_type != null) {
        if ($event === 2) {
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
        }
        if ($event === 3) {
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
        if ($event === 1) {
          await this.$axios
              .get("/admin/city/get/" + this.data.district_id + "/" + $event, {
                headers: {
                  Authorization: "Bearer " + this.$store.state.token,
                  "Content-Type": "multipart/form-data",
                },
              })
              .then((result) => {
                this.district_poros = result.data.data;
              });
        }
      }
    },
    async SubLocationType($event) {
      if ($event === 1) {
        await this.$axios
            .get(`/global/union/pouro/get/${this.data.thana_id}`, {
              headers: {
                Authorization: "Bearer " + this.$store.state.token,
                "Content-Type": "multipart/form-data",
              },
            })
            .then((result) => {
              this.pouros = result.data.data;
              console.log({ pouros: this.pouros });
            });
        this.data.union_id = null;
      }
      if ($event === 2) {
        await this.onChangeUpazila(this.data.thana_id);
        this.data.pouro_id = null;
      }
    },
    async OnChangeCityThana($event) {
      await this.$axios
          .get(`/global/ward/get/thana/${this.data.city_thana_id}`, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((result) => {
            this.wards_city = result.data.data;
            this.wards_upazila = [];
            this.wards_dist = [];
            this.ward_id_dist = null;
            this.ward_id_upazila = null;
          });
    },
    async onChangeDistrictPouro($event) {
      console.log("hi district pourashava called");
      await this.$axios
          .get(`/global/ward/get/district_pouro/${this.data.district_pouro_id}`, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((result) => {
            this.wards_dist = result.data.data;
            this.wards_upazila_union = [];
            this.wards_upazila_pouro = [];
            this.wards_city = [];
            this.ward_id_city = null;
            this.ward_id_union = null;
          });
    },
    async onChangeUpazila(event) {
      await this.$axios
          .get(`/global/union/get/${this.data.thana_id}`, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((result) => {
            this.unions = result.data.data;

          });
    },
    async onChangeUnion($event) {
      await this.$axios
          .get(`/global/ward/get/${$event}`, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((result) => {
            this.wards_upazila_union = result.data.data;
            console.log(this.wards_upazila_union, "union");
            this.wards_upazila_pouro = [];
            this.wards_dist = [];
            this.wards_city = [];
            this.data.ward_id_dist = null;
            this.data.ward_id_city = null;
            this.data.ward_id_pouro = null;
          });
    },
    async onChangePouro($event) {
      await this.$axios
          .get(`/global/ward/get/pouro/${$event}`, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((result) => {
            this.wards_upazila_pouro = result.data.data;
            this.wards_upazila_union = [];
            this.wards_dist = [];
            this.wards_city = [];
            this.data.ward_id_dist = null;
            this.data.ward_id_city = null;
            this.data.ward_id_union = null;
          });
    },
    getDistrictList(division_id = null) {
      let divisionId = division_id ? division_id : this.data.division_id;
      var queryData = {
        table_name: "locations",
        field_name: ["id", "parent_id", "type", "name_en"],
        condition: { parent_id: divisionId, deleted_at: null },
      };
      ApiService.getDropData("global/common-dropdown", queryData)
          .then((res) => {
            this.districts = res.data;
          })
          .catch((error) => console.log(error));
    },
    getThanaList(district_id = null) {
      let districtId = district_id ? district_id : this.data.district_id;
      var queryData = {
        table_name: "locations",
        field_name: ["id", "parent_id", "type", "name_en"],
        condition: { parent_id: districtId, deleted_at: null },
      };
      ApiService.getDropData("global/common-dropdown", queryData)
          .then((res) => {
            this.thanas = res.data;
          })
          .catch((error) => console.log(error));
    },
    getUnionList(thana_id = null) {
      let thanaId = thana_id ? thana_id : this.data.thana_id;
      var queryData = {
        table_name: "locations",
        field_name: ["id", "parent_id", "type", "name_en"],
        condition: { parent_id: thanaId, deleted_at: null },
      };
      ApiService.getDropData("global/common-dropdown", queryData)
          .then((res) => {
            this.unions = res.data;
          })
          .catch((error) => console.log(error));
    },
    getCityThanaList(city_id = null) {
      let cityId = city_id ? city_id : this.data.city_id;
      var queryData = {
        table_name: "locations",
        field_name: ["id", "parent_id", "type", "name_en"],
        condition: { parent_id: cityId, deleted_at: null },
      };
      ApiService.getDropData("global/common-dropdown", queryData)
          .then((res) => {
            this.city_thanas = res.data;
          })
          .catch((error) => console.log(error));
    },
    getItemValue(item) {
      return this.language === "bn" ? item.value_bn : item.value_en;
    },
    getItemText(item) {
      return this.language === "bn" ? item.name_bn : item.name_en;
    },
    ...mapActions({
      GetAllDivisions: "Division/GetAllDivisions",
      GetAllAllownceProgram: "Allowance/GetAllAllownceProgram",
    }),
    updateHeaderTitle() {
      const title = this.$t("container.emergency_payment.list");
      this.$store.commit("setHeaderTitle", title);
    },
    resetData() {
      this.data = {};
    },
  },
  watch: {
    "$i18n.locale": "updateHeaderTitle",
  },
};
</script>
<style scoped>
.component-title {
  background-color: #1C3B68;
  color: white;
}
</style>
