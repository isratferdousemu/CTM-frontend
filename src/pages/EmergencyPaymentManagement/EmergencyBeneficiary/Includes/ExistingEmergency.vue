<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="12">
<!--        <Spinner :loading="loading"/>-->
        <v-card class="ma-0 pa-0" justify="center" outlined>
          <v-card-title class="component-title">
            <div class="clearfix">
              <div class="title-left">
                <h4 class="title-text">
                  {{
                    $t(
                        "container.emergency_payment.emergency_beneficiary.searchBy"
                    )
                  }}
                </h4>
              </div>
            </div>
          </v-card-title>
          <!-- Form -->
          <v-card-text>
            <ValidationObserver ref="form" v-slot="{ invalid }">
              <v-form @submit.prevent="submitSelectedData">
                <v-container>
                  <v-row>
                    <v-col cols="12" lg="6" md="4" sm="6">
                      <ValidationProvider
                          v-slot="{ errors }"
                          name="Emergency Allotment"
                          rules="required"
                          vid="emergency_allotment"
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
                            v-model="data.allotment_id"
                            :error="!!errors[0]"
                            :error-messages="
                        errors[0]
                          ? language === 'bn'
                            ? 'অনুগ্রহ করে প্রোগ্রামের নাম নির্বাচন করুন'
                            : 'Please select the program name'
                          : ''
                      "
                            :hide-details="!errors[0]"
                            :items="allotments"
                            clearable
                            item-text="name_en"
                            item-value="id"
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
                        v-if="data.location_type === 3 && this.data.city_thana_id"
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
                        v-if="data.location_type === 1 && this.data.district_pouro_id"
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
                    <v-col cols="12" lg="6" md="6">
                      <ValidationProvider
                          v-slot="{ errors }"
                          name="Status"
                          rules="required"
                          vid="status"
                      >
                        <label style="display: inline-block"
                        >{{
                            $t(
                                "container.list.status"
                            )
                          }}

                        </label>
                        <span style="margin-left: 4px; color: red"
                        >*</span
                        >
                        <v-autocomplete
                            v-model="data.status"
                            :error="!!errors[0]"
                            :error-messages="
                        errors[0]
                          ? language === 'bn'
                            ? 'অনুগ্রহ করে স্ট্যাটাস সিলেক্ট করুন'
                            : 'Please select the status'
                          : ''
                      "
                            :hide-details="!errors[0]"
                            :items="statusFilters"
                            clearable
                            item-text="name"
                            item-value="name"
                            outlined
                        ></v-autocomplete>
                      </ValidationProvider>
                    </v-col>
                    <!--Search and Reset Button-->
                    <v-col class="text-right" cols="12">
                      <v-btn class="btn mr-2" elevation="2" @click="resetForm()"
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
                    <!-- v-data table -->
                    <v-col cols="12">
                      <v-data-table
                          v-model="selectedBeneficiaries"
                          :headers="headers"
                          :items="paginatedItems"
                          :items-per-page="pagination.perPage"
                          :loading="loading"
                          class="elevation-0 transparent row-pointer table-responsive"
                          hide-default-footer
                          item-key="id"
                      >
                        <template v-slot:item.id="{ item, index }">
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
                        <template v-slot:item.select="{ item }">
                          <v-simple-checkbox
                              v-model="item.isSelected"
                              @change="selectBeneficiary(item)"
                          ></v-simple-checkbox>
                        </template>
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
                                <!--                                :length="pagination.total"-->
                                <v-pagination
                                    v-model="pagination.current"
                                    :length="totalPages"
                                    :total-visible="11"
                                    circle
                                    class="custom-pagination-item"
                                    primary
                                    @input="onPageChange"
                                ></v-pagination>
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
                    <!-- Submit and Back Button-->
                    <v-col class="text-right" cols="12">
                      <v-btn class="mr-2" color="primary" router to="/emergency-payment/emergency-allotment">
                        {{ $t("container.list.back") }}
                      </v-btn>
                      <v-btn :disabled="invalid" color="primary" type="submit">
                        {{ $t("container.list.submit") }}
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </ValidationObserver>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapActions, mapState } from "vuex";
import ApiService from "@/services/ApiService";
import { extend, ValidationObserver, ValidationProvider } from "vee-validate";
import { required } from "vee-validate/dist/rules";
import Spinner from "@/components/Common/Spinner.vue";

extend("required", required);
extend("bangla", {
  validate: (value) => {
    // Regular expression to match Bangla characters
    const banglaRegex = /^[\u0980-\u09FF\s]+$/;
    return banglaRegex.test(value);
  },
  message: "Only Bangla characters will be allowed in this field",
});
export default {
  name: "ExistingEmergency",
  title: "CTM - Existing Emergency Beneficiary",
  components: {
    ValidationProvider,
    ValidationObserver,
    Spinner,
  },
  data() {
    return {
      data: {
        allotment_id: null,
        emergency_payment_name: null,
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
        searchBy: null,
        status: null,
      },
      flag: this.$route.query.flag || 'Existing',
      styleObject: { border: "2px solid  rgba(9, 9, 121, 100)" },
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
      payment_names: [],
      total: null,
      pagination: {
        current: 1,
        total: 0,
        perPage: 10,
      },
      items: [5, 10, 15, 20, 40, 50, 100],
      statusFilters: [
        {
          id: 1,
          name: "Active",
        },
        {
          id: 2,
          name: "Inactive",
        },
        {
          id: 3,
          name: "Waiting",
        },
      ],
      selectedBeneficiaries: [],
      beneficiaries: [],
      allotments: [],
      isExisting: null
    };
  },
  computed: {
    ...mapState({
      divisions: (state) => state.Division.divisions,

    }),
    language: {
      get() {
        return this.$store.getters.getAppLanguage;
      },
    },
    headers() {
      return [
        {
          text: this.$t("container.emergency_payment.slNo"),
          value: "id",
          width: "20px",
        },
        // {
        //   text: this.$t(
        //     "container.beneficiary_management.beneficiary_list.beneficiary_id"
        //   ),
        //   value: "beneficiary_id",
        //   width: "80px",
        // },
        {
          text: this.$t(
              "container.beneficiary_management.beneficiary_list.beneficiary_name"
          ),
          value: this.language === "bn" ? "name_bn" : "name_en",
          width: "180px",
        },
        {
          text: this.$t(
              "container.beneficiary_management.beneficiary_list.beneficiary_father_name"
          ),
          value: this.language === "bn" ? "father_name_bn" : "father_name_en",
          width: "180px",
        },

        {
          text: this.$t(
              "container.beneficiary_management.beneficiary_list.beneficiary_mother_name"
          ),
          value: this.language === "bn" ? "mother_name_bn" : "mother_name_en",
          width: "180px",
        },
        {
          text: this.$t("container.system_config.demo_graphic.union.union"),
          value:
              this.language === "bn"
                  ? "permanent_union.name_bn"
                  : "permanent_union.name_en",
          width: "80px",
        },
        // {
        //   text: this.$t("container.system_config.demo_graphic.ward.ward"),
        //   value: "ward",
        //   width: "80px",
        // },
        {
          text: this.$t("container.emergency_payment.program_name"),
          value: this.language === "bn" ? "program.name_bn" : "program.name_en",
          class: "highlight-column",
          width: "180px",
        },
        {
          text: this.$t("container.payroll_management.bank_name"),
          value: "bank_name",
          width: "70px",
        },
        {
          text: this.$t("container.training_management.trainer_info.mobile"),
          value: "mobile",
          width: "130px",
        },
        {
          text: this.$t("container.list.status"),
          value: "status",
          width: "80px",
        },

        {
          text: this.$t("container.list.select"),
          value: "select",
          sortable: false,
          width: "80px",
        },
      ];
    },
    totalPages() {
      return Math.ceil(this.beneficiaries.length / this.pagination.perPage);
    },
    paginatedItems() {
      const start = (this.pagination.current - 1) * this.pagination.perPage;
      const end = start + this.pagination.perPage;
      return this.beneficiaries.slice(start, end);
    },
  },
  created() {
  },

  mounted() {
    this.getLocationType();
    this.GetAllDivisions();
    this.getAllotmentWiseProgram();
  },
  methods: {
    onPageSetup() {
      this.pagination.current = 1;
    },
    onPageChange(page) {
      this.pagination.current = page;
    },
    getBeneficiariesInfo() {
      this.loading = true;
      const queryParams = {
        program_id: this.data.program_id,
        division_id: this.data.division_id,
        district_id: this.data.district_id,
        location_type: this.data.location_type,
        thana_id: this.data.thana_id,
        union_id: this.data.union_id,
        city_id: this.data.city_id,
        city_thana_id: this.data.city_thana_id,
        district_pouro_id: this.data.district_pouro_id,
        searchBy: this.data.searchBy,
        status: this.data.location_type,
        perPage: this.pagination.perPage,
        page: this.pagination.current,
      };
      ApiService.get("/admin/emergency/get-existing-beneficiaries-info", {
        params: queryParams,
      })
          .then((res) => {
            this.beneficiaries = res.data.data;
            this.beneficiaries.forEach((beneficiary) => {
              this.$set(beneficiary, "isSelected", false);
            });
            this.total = res?.data?.data.length;
            this.pagination.total = res.data.data.length;
            this.loading = false;
          })
          .catch((error) => {
            console.log(error);
          });
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
    updateSelectedBeneficiaries() {
      this.selectedBeneficiaries = this.beneficiaries.filter(
          (b) => b.isSelected
      );
    },
    getNewEmergencyBeneficiariesList() {
      this.loading = true;
      const queryParams = {
        program_id: this.data.program_id,
        division_id: this.data.division_id,
        district_id: this.data.district_id,
        location_type: this.data.location_type,
        thana_id: this.data.thana_id,
        union_id: this.data.union_id,
        city_id: this.data.city_id,
        city_thana_id: this.data.city_thana_id,
        district_pouro_id: this.data.district_pouro_id,
        searchBy: this.data.searchBy,
        status: this.data.location_type,
        perPage: this.pagination.perPage,
        page: this.pagination.current,
      };
      ApiService.get("/admin/emergency/get-new-beneficiaries-info", {
        params: queryParams,
      })
          .then((res) => {
            this.beneficiaries = res.data.data;
            this.total = res?.data?.data?.length;
            this.pagination.total = res.data.data.length;
            this.loading = false;
          })
          .catch((error) => {
            console.log(error);
          });
    },
    search() {
      if (this.flag === "New") {
        this.getNewEmergencyBeneficiariesList();
        console.log(this.flag);
      } else {
        this.getBeneficiariesInfo();
        console.log(this.flag);
      }
    },

    submitSelectedData() {
      this.loading = true;
      this.updateSelectedBeneficiaries();
      console.log({ selected: this.selectedBeneficiaries })
      try {
        let modifiedBeneficiaries;
        if (this.flag === "New") {
          this.isExisting = 0;
          modifiedBeneficiaries = this.selectedBeneficiaries.map(beneficiary => {
            return {
              ...beneficiary,
              isExisting: this.isExisting
            };
          });
        } else {
          this.isExisting = 1;
          modifiedBeneficiaries = this.selectedBeneficiaries.map(beneficiary => {
            return {
              ...beneficiary,
              isExisting: this.isExisting
            };
          });
        }
        ApiService
            .post("/admin/emergency/store-multiple-beneficiaries", modifiedBeneficiaries)
            .then((res) => {
              console.log(res);
              if (res.data?.success) {
                this.$toast.success(
                    this.language === "bn"
                        ? "জরুরী সুবিধাভোগী সফলভাবে যোগ করা হয়েছে"
                        : "Emergency beneficiary added successfully"
                );
                this.$router.push("/emergency-payment/manage-emergency-beneficiary");
                this.resetForm();
                this.loading = false;
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
    ...mapActions({
      GetAllDivisions: "Division/GetAllDivisions",

    }),

    resetForm() {
      this.data = {};
      this.selectedBeneficiaries = [];
    },
    getAllotmentWiseProgram() {
      ApiService.get("/admin/emergency/get-allotment-wise-program")
          .then((res) => {
            this.allotments = res.data;
          })
          .catch((error) => console.log(error));
    }
  },
  watch: {
    "$i18n.locale": "updateHeaderTitle",
    '$route.query.flag'(newFlag) {
      this.flag = newFlag;
    }
  },
};
</script>
<style scoped>
.highlight-column {
  background-color: #e0eaf1;
}
</style>
