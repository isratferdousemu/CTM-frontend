<template>
  <v-container fluid>
    <Spinner :loading="loading"/>
    <!--Search Panel -->
    <v-expansion-panels>
      <v-expansion-panel class="mb-2">
        <v-expansion-panel-header color="#1c3b68">
          <template v-slot:actions>
            <v-icon color="white"> $expand</v-icon>
          </template>
          <h3 class="white--text text-uppercase">
            {{ $t("container.emergency_payment.emergency_beneficiary.list") }}
          </h3>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="elevation-0 transparent mt-5">
          <ValidationObserver ref="form" v-slot="{ invalid }">
            <form @submit.prevent="submitSearch()">
              <v-row>
                <v-col cols="12" lg="3" md="3">
                  <ValidationProvider
                      v-slot="{ errors }"
                      name="program"
                      rules="required"
                      vid="program"
                  >

                    <v-autocomplete
                        v-model="data.program_id"
                        :append-icon-cb="appendIconCallback"
                        :error="!!errors[0]"
                        :error-messages="
                    errors[0]
                      ? language === 'bn'
                        ? 'অনুগ্রহ পূর্বক প্রোগ্রাম প্রদান করুন '
                        : 'Please enter Program'
                      : ''
                  "
                        :hide-details="!errors[0]"
                        :items="programs"
                        :label="$t('container.emergency_payment.list')"
                        append-icon="mdi-plus"
                        class="no-arrow-icon"
                        clearable
                        item-text="emergency_payment_name"
                        item-value="id"
                        outlined
                    >
                    </v-autocomplete>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" lg="3" md="3">
                  <ValidationProvider v-slot="{ errors }" name="Division" vid="division">
                    <v-text-field v-if="user_permission.division" v-model="user_permission.division_name" :label="$t(
          'container.system_config.demo_graphic.division.division'
        )
          " outlined readonly>
                    </v-text-field>
                    <v-autocomplete v-if="!user_permission.division"
                                    v-model="data.division_id"
                                    :append-icon-cb="appendIconCallback"
                                    :error="!!errors[0]" :error-messages="errors[0]"
                                    :hide-details="!errors[0]" :item-text="getItemText"
                                    :items="divisions" :label="$t(
          'container.system_config.demo_graphic.division.division'
        )
          " append-icon="mdi-plus"
                                    class="no-arrow-icon" clearable item-value="id"
                                    outlined @input="onChangeDivision($event)">
                    </v-autocomplete>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" lg="3" md="3">
                  <ValidationProvider v-slot="{ errors }" name="District" vid="district">
                    <v-text-field v-if="user_permission.district" v-model="user_permission.district_name" :label="$t(
          'container.system_config.demo_graphic.district.district'
        )
          " outlined readonly>
                    </v-text-field>
                    <v-autocomplete v-if="!user_permission.district"
                                    v-model="data.district_id"
                                    :append-icon-cb="appendIconCallback"
                                    :error="!!errors[0]" :error-messages="errors[0]"
                                    :hide-details="!errors[0]"
                                    :item-text="getItemText"
                                    :items="districts" :label="$t(
          'container.system_config.demo_graphic.district.district'
        )
          " append-icon="mdi-plus"
                                    class="no-arrow-icon" clearable
                                    item-value="id"
                                    outlined
                                    @input="onChangeDistrict($event)"
                    ></v-autocomplete>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" lg="3" md="3">
                  <ValidationProvider v-slot="{ errors }" name="Location Type" vid="location_type">
                    <v-text-field v-if="user_permission.location_type" v-model="user_permission.location_type_name"
                                  :label="$t('container.list.location_type')"
                                  outlined readonly>
                    </v-text-field>
                    <v-autocomplete v-if="!user_permission.location_type" v-model="data.location_type"
                                    :append-icon-cb="appendIconCallback" :error="!!errors[0]"
                                    :error-messages="errors[0]"
                                    :hide-details="!errors[0]"
                                    :item-text="getLocationText"
                                    :items="locationType"
                                    :label="$t('container.list.location_type')"
                                    append-icon="mdi-plus"
                                    class="no-arrow-icon"
                                    clearable
                                    item-value="id"
                                    outlined
                                    @input="LocationType($event)">

                    </v-autocomplete>
                  </ValidationProvider>
                </v-col>
                <v-col v-if="data.location_type === 1" cols="12" lg="3" md="3">
                  <ValidationProvider v-slot="{ errors }" name="thana" vid="district_pouro_id">
                    <v-text-field v-if="user_permission.district_pourashava"
                                  v-model="user_permission.district_pourashava_name" :label="$t(
          'container.system_config.demo_graphic.ward.pouro'
        )
          " outlined readonly>
                    </v-text-field>
                    <v-autocomplete v-if="!user_permission.district_pourashava"
                                    v-model="data.district_pouro_id"
                                    :append-icon-cb="appendIconCallback"
                                    :error="!!errors[0]"
                                    :error-messages="errors[0]"
                                    :hide-details="!errors[0]"
                                    :item-text="getItemText"
                                    :items="district_pouros" :label="$t(
          'container.system_config.demo_graphic.ward.pouro'
        )
          "
                                    append-icon="mdi-plus"
                                    class="no-arrow-icon"
                                    clearable
                                    item-value="id"
                                    outlined
                                    @change="onChangeDistrictPouro($event)">

                    </v-autocomplete>
                  </ValidationProvider>
                </v-col>
                <v-col v-if="data.location_type === 2" cols="12" lg="3" md="3">
                  <ValidationProvider v-slot="{ errors }" name="Upazila" vid="thana_id">
                    <v-text-field v-if="user_permission.upazila" v-model="user_permission.upazila_name" :label="$t(
          'container.system_config.demo_graphic.thana.thana'
        )
          " outlined readonly>
                    </v-text-field>
                    <v-autocomplete v-if="!user_permission.upazila"
                                    v-model="data.thana_id"
                                    :append-icon-cb="appendIconCallback" :error="!!errors[0]"
                                    :error-messages="errors[0]"
                                    :hide-details="!errors[0]" :item-text="getItemText" :items="thanas" :label="$t(
          'container.system_config.demo_graphic.thana.thana'
        )
          "
                                    append-icon="mdi-plus"
                                    class="no-arrow-icon" clearable
                                    item-value="id"
                                    outlined
                                    @change="onChangeUpazila($event)">

                    </v-autocomplete>
                  </ValidationProvider>
                </v-col>

                <v-col v-if="data.location_type === 2" cols="12" lg="3" md="3">
                  <ValidationProvider v-slot="{ errors }" name="subLocationType" vid="subLocationType">
                    <v-autocomplete
                        v-model="data.sub_location_type"
                        :append-icon-cb="appendIconCallback"
                        :error="!!errors[0]"
                        :error-messages="errors[0]"
                        :hide-details="!errors[0]"
                        :items="subLocationType"
                        :label="$t(
          'container.system_config.demo_graphic.ward.subLocation_type'
        )
          " append-icon="mdi-plus"
                        class="no-arrow-icon" clearable
                        item-text="value"
                        item-value="id" outlined
                        @input="onChangeSubLocationType($event)"></v-autocomplete>
                  </ValidationProvider>
                </v-col>
                <v-col v-if="data.location_type === 2 &&
          data.sub_location_type === 1
          " cols="12" lg="3" md="3">
                  <ValidationProvider v-slot="{ errors }" name="pouros" vid="pouros">
                    <v-autocomplete v-model="data.pouro_id" :append-icon-cb="appendIconCallback" :error="!!errors[0]"
                                    :error-messages="errors[0]" :hide-details="!errors[0]"
                                    :item-text="getItemText" :items="pouros"
                                    :label="$t(
          'container.system_config.demo_graphic.ward.pouro'
        )
          " append-icon="mdi-plus" class="no-arrow-icon"
                                    clearable item-value="id" outlined></v-autocomplete>
                  </ValidationProvider>
                </v-col>

                <v-col v-if="data.sub_location_type === 2 &&
          data.location_type === 2
          " cols="12" lg="3" md="3">
                  <ValidationProvider v-slot="{ errors }" name="unions" vid="unions">
                    <v-autocomplete v-model="data.union_id" :append-icon-cb="appendIconCallback" :error="!!errors[0]"
                                    :error-messages="errors[0]" :hide-details="!errors[0]"
                                    :item-text="getItemText" :items="unions" :label="$t(
          'container.system_config.demo_graphic.ward.union'
        )
          "
                                    append-icon="mdi-plus" class="no-arrow-icon" clearable
                                    item-value="id" outlined @input="onChangeUnionGetWard($event)"></v-autocomplete>
                  </ValidationProvider>
                </v-col>

                <v-col v-if="data.location_type === 3" cols="12" lg="3" md="3">
                  <ValidationProvider v-slot="{ errors }" name="city" vid="city_id">
                    <v-text-field v-if="user_permission.city_corp" v-model="user_permission.city_corp_name" :label="$t(
          'container.system_config.demo_graphic.ward.city'
        )
          " outlined readonly>
                    </v-text-field>
                    <v-autocomplete v-if="!user_permission.city_corp" v-model="data.city_id"
                                    :append-icon-cb="appendIconCallback" :error="!!errors[0]"
                                    :error-messages="errors[0]" :hide-details="!errors[0]"
                                    :item-text="getItemText" :items="cities" :label="$t(
          'container.system_config.demo_graphic.ward.city'
        )
          " append-icon="mdi-plus"
                                    class="no-arrow-icon" clearable
                                    item-value="id" outlined @change="onChangeCity($event)"></v-autocomplete>
                  </ValidationProvider>
                </v-col>

                <v-col v-if="data.location_type === 3" cols="12" lg="3" md="3">
                  <ValidationProvider v-slot="{ errors }" name="thana" vid="thana_id">
                    <v-autocomplete v-model="data.thana_id" :append-icon-cb="appendIconCallback" :error="!!errors[0]"
                                    :error-messages="errors[0]" :hide-details="!errors[0]" :item-text="getItemText"
                                    :items="thanas"
                                    :label="$t(
          'container.system_config.demo_graphic.ward.thana'
        )
          "
                                    append-icon="mdi-plus" class="no-arrow-icon" clearable
                                    item-value="id" outlined @change="onChangeThana($event)"></v-autocomplete>
                  </ValidationProvider>
                </v-col>

                <v-col v-if="data.location_type === 1 ||
          data.location_type === 2 ||
          data.location_type === 3
          " cols="12" lg="3" md="3">
                  <ValidationProvider v-slot="{ errors }" name="ward" vid="ward_id">
                    <v-autocomplete v-model="data.ward_id" :append-icon-cb="appendIconCallback" :error="!!errors[0]"
                                    :error-messages="errors[0]" :hide-details="!errors[0]" :item-text="getItemText"
                                    :items="wards" :label="$t(
          'container.system_config.demo_graphic.ward.ward'
        )
          "
                                    append-icon="mdi-plus" class="no-arrow-icon"
                                    clearable item-value="id" outlined></v-autocomplete>
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" lg="6" md="6">
                  <v-switch v-model="advanch_search" :label="$t(
          'container.beneficiary_management.beneficiary_list.advance_search'
        )
          " :value="!advanch_search" color="primary" hide-details></v-switch>
                </v-col>
              </v-row>

              <v-row v-if="advanch_search">
                <v-col cols="12" lg="3" md="3">
                  <v-text-field v-model="data.beneficiary_id" :label="$t(
          'container.beneficiary_management.beneficiary_list.beneficiary_id'
        )
          " clearable outlined>
                  </v-text-field>
                </v-col>
                <v-col cols="12" lg="3" md="3">
                  <v-text-field v-model="data.nominee_name" :label="$t(
          'container.beneficiary_management.beneficiary_list.nominee'
        )
          " clearable outlined>
                  </v-text-field>
                </v-col>
                <v-col cols="12" lg="3" md="3">
                  <v-text-field v-model="data.account_number" :label="$t(
          'container.beneficiary_management.beneficiary_list.account_no'
        )
          " clearable outlined>
                  </v-text-field>
                </v-col>
                <v-col cols="12" lg="3" md="3">
                  <v-text-field v-model="data.nid" :label="$t(
          'container.beneficiary_management.beneficiary_list.nid'
        )
          " clearable outlined>
                  </v-text-field>
                </v-col>

                <v-col cols="12" lg="3" md="3">
                  <ValidationProvider v-slot="{ errors }" name="status" vid="status_id">
                    <v-autocomplete v-model="data.status" :append-icon-cb="appendIconCallback" :error="!!errors[0]"
                                    :error-messages="errors[0]" :hide-details="!errors[0]" :items="ben_status"
                                    :label="$t('container.list.status')"
                                    append-icon="mdi-plus" class="no-arrow-icon"
                                    clearable item-text="value"
                                    item-value="id"
                                    outlined></v-autocomplete>
                  </ValidationProvider>
                </v-col>
              </v-row>

              <div class="d-inline d-flex justify-end">
                <v-btn class="btn" elevation="2" @click="resetSearch">{{
                    $t("container.list.reset")
                  }}
                </v-btn>
                <v-btn class="btn ml-2" color="success" elevation="2" type="submit">{{
                    $t("container.list.search")
                  }}
                </v-btn>

              </div>
            </form>
          </ValidationObserver>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <!--Search Panel Ends-->
    <!-- Data table -->
    <v-row>
      <v-col cols="12">
        <v-card color="white" elevation="10" rounded="md" theme="light">
          <v-card-title
              class="component-title"
          >
            <div class="clearfix">
              <div class="title-left">
                <h4 class="title-text">
                  {{
                    $t("container.emergency_payment.emergency_beneficiary.list")
                  }}
                </h4>
              </div>
            </div>
          </v-card-title>
          <!-- Data Table -->
          <v-card-text>
            <v-row align="center" justify="space-between">
              <v-col cols="12" lg="3" md="3">
                {{ $t("container.list.total") }}:&nbsp;<span
                  style="font-weight: bold"
              >
                      {{
                  language === "bn"
                      ? $helpers.englishToBangla(this.total)
                      : this.total
                }}
                    </span>
              </v-col>
              <v-col class="text-right mt-3" cols="12" lg="3" md="3">
                <v-autocomplete
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
                </v-autocomplete>
              </v-col>
            </v-row>
            <!-- data table -->
            <v-row
                class="ma-0 pa-0 white round-border d-flex justify-space-between align-center"
                justify="space-between"
            >
              <div class="d-flex justify-sm-end flex-wrap">
                <v-text-field
                    v-model="search"
                    :label="
                        $t(
                          'container.emergency_payment.emergency_beneficiary.search'
                        )
                      "
                    class="my-sm-0 my-3 mx-0v -input--horizontal"
                    color="primary"
                    dense
                    hide-details
                    outlined
                    prepend-inner-icon="mdi-magnify"
                    variant="outlined"
                    @keyup.native="getListData"
                >
                </v-text-field>
              </div>
              <div>
                <v-btn
                    class="btn mr-2 white--text"
                    color="red darken-4"
                    elevation="2"
                    @click="generatePDF()"
                >
                  <v-icon class="pr-1"> mdi-tray-arrow-down</v-icon>
                  {{ $t("container.list.PDF") }}
                </v-btn>
                <v-btn
                    class="btn mr-2 white--text"
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
                    to="/emergency-payment/emergency-beneficiary/create"

                >
                  <v-icon class="pr-1"> mdi-plus</v-icon>
                  {{ $t("container.list.add_new") }}
                </v-btn>
              </div>
              <!--Data table-->
              <v-col cols="12">
                <v-data-table
                    :headers="visibleHeaders"
                    :items="emergencyBeneficiaries"
                    :items-per-page="pagination.perPage"
                    :loading="loading"
                    class="elevation-0 transparent row-pointer table-responsive"
                    hide-default-footer
                    item-key="id"
                >
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
                  <template v-slot:item.current_mobile="{ item }">
                    {{
                      language === "bn"
                          ? $helpers.englishToBangla(item.current_mobile)
                          : item.current_mobile
                    }}
                  </template>
                  <template v-slot:item.status="{ item }">
                        <span v-if="item.status === 1">
                          {{ language === "bn" ? "সক্রিয়" : "Active" }}
                        </span>
                    <span v-if="item.status === 2">
                          {{ language === "bn" ? "নিষ্ক্রিয়" : "Inactive" }}
                        </span>
                    <span v-if="item.status === 3">
                          {{ language === "bn" ? "অপেক্ষেয়মান" : "Waiting" }}
                        </span>
                  </template>

                  <!-- Action Button -->

                  <template v-slot:item.actions="{ item }">
                    <v-tooltip top>
                      <template v-slot:activator="{ on }">
                        <v-btn
                            v-can="'emergency-allotment-edit'"
                            color="success"
                            elevation="0"
                            fab
                            x-small
                            @click="editData(item)"
                            v-on="on"
                        >
                          <v-icon> mdi-account-edit-outline</v-icon>
                        </v-btn>
                      </template>
                      <span>
                            {{ $t("container.list.edit") }}
                          </span>
                    </v-tooltip>

                    <v-tooltip top>
                      <template v-slot:activator="{ on }">
                        <v-btn
                            v-can="'delete-division'"
                            class="ml-3 white--text"
                            color="grey"
                            elevation="0"
                            fab
                            x-small
                            @click="deleteData(item)"
                            v-on="on"
                        >
                          <v-icon> mdi-delete</v-icon>
                        </v-btn>
                      </template>
                      <span> {{ $t("container.list.delete") }}</span>
                    </v-tooltip>
                  </template>
                  <!-- End Action Button -->
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
                          ></v-pagination>
                        </v-col>
                        <v-col class="" cols="12" lg="2" md="2" sm="4">
                          <v-autocomplete
                              v-model="pagination.perPage"
                              :items="items"
                              dense
                              hide-details
                              outlined
                              @change="onPageSetup"
                          >

                          </v-autocomplete>
                        </v-col>
                      </v-row>
                    </v-container>
                  </template>
                </v-data-table>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { extend, ValidationObserver, ValidationProvider } from "vee-validate";
import { required } from "vee-validate/dist/rules";
import Spinner from "@/components/Common/Spinner.vue";

extend("required", required);

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
  name: "Index",
  title: "CTM - Emergency Beneficiary List",
  components: {
    ValidationProvider,
    ValidationObserver,
    Spinner,

  },
  data() {
    return {
      data: {
        program_id: null,
        division_id: null,
        district_id: null,
        location_type: null,
        sub_location_type: null,
        city_id: null,
        district_pouro_id: null,
        thana_id: null,
        union_id: null,
        ward_id: null,
        beneficiary_id: null,
        nominee_name: null,
        account_number: null,
        nid: null,
        status: null,
      },
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
      programs: [],
      districts: [],
      locationType: [],
      thanas: [],
      cities: [],
      unions: [],
      wards: [],
      district_pouros: [],
      loading: false,
      advanch_search: false,
      emergencyBeneficiaries: [],
      beneficiary_list: [],
      payment_names: [],
      search: "",
      sortBy: "created_at",
      sortDesc: "desc",
      total: null,
      pagination: {
        current: 1,
        total: 0,
        perPage: 5,
      },
      items: [5, 10, 15, 20, 40, 50, 100],
      selectedColumns: [
        "beneficiary_id",
        "name_en",
        "father_name_en",
        "emergency_allotment.emergency_payment_name",
        "current_mobile",
        "status",
      ], // Initially, first 8 columns are selected

      fixedColumns: ["sl", "actions"], // Two columns that will always remain visible
    };
  },
  computed: {
    headers() {
      return [
        { text: this.$t("container.list.sl"), value: "sl", fixed: true },
        {
          text: this.$t(
              "container.beneficiary_management.beneficiary_list.beneficiary_id"
          ),
          value: "beneficiary_id",
        },
        {
          text: this.$t("container.list.name_en"),
          value: "name_en",
        },
        {
          text: this.$t("container.list.name_bn"),
          value: "name_bn",
        },
        {
          text: this.$t(
              "container.application_selection.application.father_name_en"
          ),
          value: "father_name_en",
        },
        {
          text: this.$t(
              "container.application_selection.application.father_name_bn"
          ),
          value: "father_name_bn",
        },
        {
          text: this.$t(
              "container.application_selection.application.mother_name_en"
          ),
          value: "mother_name_en",
        },
        {
          text: this.$t(
              "container.application_selection.application.mother_name_bn"
          ),
          value: "mother_name_bn",
        },
        {
          text: this.$t(
              "container.application_selection.application.spouse_name_en"
          ),
          value: "spouse_name_en",
        },
        {
          text: this.$t(
              "container.application_selection.application.spouse_name_bn"
          ),
          value: "spouse_name_bn",
        },
        {
          text: this.$t("container.emergency_payment.list"),
          value: "emergency_allotment.emergency_payment_name",
        },
        {
          text: this.$t("container.application_selection.application.mobile"),
          value: "current_mobile",
        },
        {
          text: this.$t("container.list.status"),
          value: "status",
          align: "center",
        },
        {
          text: this.$t("container.list.action"),
          value: "actions",
          align: "center",
          width: "240",
          fixed: true,
        },
      ];
    },
    language: {
      get() {
        return this.$store.getters.getAppLanguage;
      },
    },
    ben_status() {
      return [
        {
          id: 1,
          value: this.$t("container.list.active"),
        },
        {
          id: 2,
          value: this.$t("container.list.inactive"),
        },
        {
          id: 3,
          value: this.$t("container.list.waiting"),
        },
      ];
    },
    subLocationType() {
      return [
        {
          id: 1,
          // value_en: "Pouroshava",
          value: this.$t("container.list.pouroshava"),
        },

        {
          id: 2,
          // value_en: "Union",
          value: this.$t("container.list.union"),
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
    ...mapState({
      divisions: (state) => state.Division.divisions,
      userData: (state) => state.userData,
    }),
  },
  created() {
    this.GetAllDivisions();
    this.getLocationType();
  },
  beforeMount() {
    this.updateHeaderTitle();
  },
  mounted() {
    this.getListData();
    this.getPaymentName();
  },
  methods: {
    getLocationText(item) {
      return this.language === "bn" ? item.value_bn : item.value_en;
    },
    onSearch() {
      this.loading = true;
      this.pagination = {
        ...this.pagination,
        current: 1,
      };
      this.GetApplication();
    },
    status(status) {
      if (status === 1) {
        return this.$i18n.locale === "en" ? "Active" : "সক্রিয়";
      } else {
        return this.$i18n.locale === "en" ? "Inactive " : "নিষ্ক্রিয়";
      }
    },
    async generatePDF() {
      this.isLoading = true;
      const queryParams = {
        language: this.$i18n.locale,
        program_id: this.data.program_id,
        division_id: this.data.division_id,
        district_id: this.data.district_id,
        city_corp_id: this.data.city_id,
        city_thana_id: this.data.city_thana_id,
        district_pouro_id: this.data.district_pouro_id,
        location_type: this.data.location_type,

        pouro_id: this.data.pouro_id,
        union_id: this.data.union_id,
        thana_id: this.data.thana_id,
        ward_id: this.data.ward_id,
      };
      this.$axios
          .get("/admin/emergency/getBeneficiaryListPdf", {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "application/json",
            },
            params: queryParams,
            responseType: "arraybuffer",
          })
          .then((result) => {
            const blob = new Blob([result.data], { type: "application/pdf" });
            const url = window.URL.createObjectURL(blob);
            window.open(url, "_blank");
            this.isLoading = false;
            // window.open(result.data.data.url, "_blank");
          })
          .catch((error) => {
            this.isLoading = false;
            console.error("Error generating PDF:", error);
          });
    },
    async generateExcel() {
      this.isLoading = true;
      let page;
      if (!this.sortBy) {
        page = this.pagination.current;
      }
      const queryParams = {
        // language: this.$i18n.locale,
        location_type: this.data.location_type,
        program_id: this.data.program_id,
        division_id: this.data.division_id,
        district_id: this.data.district_id,
        city_corp_id: this.data.city_id,
        thana_id: this.data.thana_id,
        district_pouro_id: this.data.district_pouro_id,

        city_thana_id: this.data.city_thana_id,
        sub_location_type: this.sub_location_type,
        pouro_id: this.data.pouro_id,
        union_id: this.data.union_id,
        ward_id: this.data.ward_id,

        beneficiary_id: this.data.beneficiary_id,
        nominee_name: this.data.nominee_name,
        account_number: this.data.account_number,
        nid: this.data.nid,
        status: this.data.status,

        perPage: this.total,
        page: 1, // All data loaded
        sortBy: this.sortBy,
        orderBy: this.sortDesc,
      };

      await this.$axios
          .get("/admin/emergency/beneficiaries", {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
            params: queryParams,
          })
          .then((result) => {
            this.beneficiary_list = result.data.data.data;
            console.log(this.beneficiary_list)
          })
          .catch((error) => {
            this.isLoading = false;
            console.error("Error generating Excel:", error);
          });

      try {
        import("@/plugins/Export2Excel").then((excel) => {
          const HeaderInfo = [
            this.$t("container.list.sl"),
            this.$t(
                "container.beneficiary_management.beneficiary_list.beneficiary_id"
            ),
            this.$t(
                "container.beneficiary_management.beneficiary_list.beneficiary_name"
            ),
            this.$t(
                "container.beneficiary_management.beneficiary_list.father_name"
            ),
            this.$t(
                "container.beneficiary_management.beneficiary_list.program_name"
            ),
            this.$t(
                "container.beneficiary_management.beneficiary_list.district"
            ),
            this.$t(
                "container.beneficiary_management.beneficiary_list.city_dist_upazilla"
            ),
            this.$t(
                "container.beneficiary_management.beneficiary_list.thna_union_Pouro"
            ),
            this.$t("container.beneficiary_management.beneficiary_list.ward"),
            this.$t(
                "container.beneficiary_management.beneficiary_list.account_no"
            ),
            this.$t(
                "container.beneficiary_management.beneficiary_list.monthly_allowance_amount"
            ),
          ];
          const CustomInfo = this.beneficiary_list.map((i, index) => {
            return {
              sl:
                  this.$i18n.locale == "en"
                      ? index + 1
                      : this.$helpers.englishToBangla(index + 1),
              beneficiary_id:
                  this.$i18n.locale == "en" ? i.beneficiary_id : i.beneficiary_id,
              name: this.$i18n.locale == "en" ? i.name_en : i.name_bn,
              father_name:
                  this.$i18n.locale == "en" ? i.father_name_en : i.father_name_bn,
              program_name:
                  this.$i18n.locale == "en"
                      ? i.emergency_allotment?.emergency_payment_name
                      : i.emergency_allotment?.emergency_payment_name,
              district:
                  this.$i18n.locale == "en"
                      ? i.permanent_district?.name_en
                      : i.permanent_district?.name_bn,
              city_dist_upazilla:
                  this.$i18n.locale == "en"
                      ? i.permanent_upazila
                          ? i.permanent_upazila?.name_en
                          : i.permanent_city_corporation
                              ? i.permanent_city_corporation?.name_en
                              : i.permanent_district_pourashava
                                  ? i.permanent_district_pourashava?.name_en
                                  : ""
                      : i.permanent_upazila
                          ? i.permanent_upazila?.name_bn
                          : i.permanent_city_corporation
                              ? i.permanent_city_corporation?.name_bn
                              : i.permanent_district_pourashava
                                  ? i.permanent_district_pourashava?.name_bn
                                  : "",
              thna_union_Pouro:
                  this.$i18n.locale == "en"
                      ? i.permanent_union
                          ? i.permanent_union?.name_en
                          : i.permanentThana
                              ? i.permanent_thana?.name_en
                              : i.permanent_pourashava
                                  ? i.permanent_pourashava?.name_en
                                  : ""
                      : i.permanentUnion
                          ? i.permanent_union?.name_bn
                          : i.permanent_thana
                              ? i.permanentThana?.name_bn
                              : i.permanent_pourashava
                                  ? i.permanent_pourashava?.name_bn
                                  : "",
              ward:
                  this.$i18n.locale == "en"
                      ? i.permanent_ward?.name_en
                      : i.permanent_ward?.name_bn,

              account_number:
                  this.$i18n.locale == "en" ? i.account_number : i.account_number,
              monthly_allowance:
                  this.$i18n.locale == "en"
                      ? i.monthly_allowance
                      : this.$helpers.englishToBangla(i.monthly_allowance),
            };
          });

          const Field = [
            "sl",
            "beneficiary_id",
            "name",
            "father_name",
            "program_name",
            "district",
            "city_dist_upazilla",
            "thna_union_Pouro",
            "ward",
            "account_number",
            "monthly_allowance",
          ];

          const Data = this.FormatJson(Field, CustomInfo);
          const currentDate = new Date().toISOString().slice(0, 10);
          let dateinfo =
              queryParams.language == "en"
                  ? currentDate
                  : this.$helpers.englishToBangla(currentDate);

          const filenameWithDate = `${this.$t(
              "container.emergency_payment.emergency_beneficiary.list"
          )}`;

          excel.export_json_to_excel({
            header: HeaderInfo,
            data: Data,
            sheetName: filenameWithDate,
            filename: filenameWithDate,
            autoWidth: true,
            bookType: "xlsx",
          });
        });
      } catch (error) {
        // Handle any errors here
        console.error("An error occurred:", error);
        this.isLoading = false;
      } finally {
        this.isLoading = false;
      }
    },
    FormatJson(FilterData, JsonData) {
      return JsonData.map((v) =>
          FilterData.map((j) => {
            return v[j];
          })
      );
    },
    onPageSetup($event) {
      this.pagination.current = 1;
      this.getListData();
    },
    appendIconCallback() {
      // Handle the click event for the custom append icon here
      return "mdi-minus";
    },
    appendIcon() {
      return "mdi-plus"; // Use the appropriate Material Design Icons (MDI) class for the "+" icon
    },
    getLocationType() {
      this.$store
          .dispatch("getLookupByType", 1)
          .then((res) => (this.locationType = res));
    },
    async GetAllProgram() {
      try {
        this.$axios
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
    async GetUserPermission() {
      try {
        this.$axios
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
                this.data.thana_id = item?.upazila?.id;
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
              this.GetApplication();
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
      this.data.city_id = null;
      this.district_pouro_id = null;
      this.thana_id = null;
      this.data.union_id = null;
      this.ward_id = null;

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
    getAllotmentWiseProgram() {
      ApiService.get("/admin/emergency/get-allotment-wise-program")
          .then((res) => {
            this.programs = res.data;
          })
          .catch((error) => console.log(error));
    },
    async GetApplication() {
      const queryParams = {
        // searchText: this.search,
        location_type: this.data.location_type,
        program_id: this.data.program_id,
        division_id: this.data.division_id,
        district_id: this.data.district_id,
        city_corp_id: this.data.city_id,
        thana_id: this.data.thana_id,
        district_pouro_id: this.data.district_pouro_id,

        city_thana_id: this.data.city_thana_id,
        sub_location_type: this.sub_location_type,
        pouro_id: this.data.pouro_id,
        union_id: this.data.union_id,
        ward_id: this.data.ward_id,

        beneficiary_id: this.data.beneficiary_id,
        nominee_name: this.data.nominee_name,
        account_number: this.data.account_number,
        nid: this.data.nid,
        status: this.data.status,

        perPage: this.pagination.perPage,
        page: this.pagination.current,
        sortBy: this.sortBy,
        orderBy: this.sortDesc,
      };
      this.$axios
          .get("/admin/beneficiary/list", {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
            params: queryParams,
          })
          .then((result) => {
            this.beneficiaries = result.data.data;
            this.total = result.data.meta.total;
            console.log("results_total__", this.total);
            this.pagination.current = result.data.meta.current_page;
            this.pagination.total = result.data.meta.last_page;
            this.pagination.grand_total = result.data.meta.total;
            this.loading = false;
          });
    },
    async onChangeUpazila(event) {
      await this.$axios
          .get(`/admin/union/get/${this.data.thana_id}`, {
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
        this.onChangeUpazila(this.data.thana_id);
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
    submitSearch() {
      this.getListData();
    },
    updateVisibleColumns() {
      // Triggered when the selected columns change
      // Update the visibleHeaders based on the selected columns
      this.visibleHeaders = this.headers.filter((column) =>
          this.selectedColumns.includes(column.value)
      );
    },
    checkLanguage() {
      let checkLanguageEnglish = this.$checkLanguage(this.data.title_en);
      let checkLanguageBangla = this.$checkLanguage(this.data.title_bn);
      let errs = {};

      if (
          checkLanguageBangla !== "Bangla" &&
          checkLanguageBangla !== "BanglaSpecialChar"
      ) {
        errs.title_bn = ["Please Enter in Bangla Language in this Field"];
      }

      if (checkLanguageEnglish != "English") {
        errs.title_en = ["Please Enter in English Language in this Field"];
      }

      if (Object.keys(errs).length > 0) {
        if (this.$refs.formAdd) {
          this.$refs.formAdd.setErrors(errs);
        }
        if (this.$refs.formEdit) {
          this.$refs.formEdit.setErrors(errs);
        }

        return false;
      }

      return true;
    },
    onPageChange($event) {
      this.getListData();
    },
    editData(item) {
      this.$router.push({
        path: `/emergency-payment/emergency-beneficiary/edit/${item.id}`,
      });
    },
    ...mapActions({
      GetAllDivisions: "Division/GetAllDivisions",
    }),

    getListData() {
      // this.search = this.search.replace(/%/g, '');
      this.loading = true;
      const queryParams = {
        location_type: this.data.location_type,
        program_id: this.data.program_id,
        division_id: this.data.division_id,
        district_id: this.data.district_id,
        city_corp_id: this.data.city_id,
        thana_id: this.data.thana_id,
        district_pouro_id: this.data.district_pouro_id,

        city_thana_id: this.data.city_thana_id,
        sub_location_type: this.sub_location_type,
        pouro_id: this.data.pouro_id,
        union_id: this.data.union_id,
        ward_id: this.data.ward_id,

        beneficiary_id: this.data.beneficiary_id,
        nominee_name: this.data.nominee_name,
        account_number: this.data.account_number,
        nid: this.data.nid,
        status: this.data.status,

        perPage: this.pagination.perPage,
        page: this.pagination.current,
        sortBy: this.sortBy,
        orderBy: this.sortDesc,

      };
      ApiService
          .get("/admin/emergency/beneficiaries", {
            params: queryParams,
          })
          .then((result) => {
            console.log(result);
            this.total = result?.data?.data?.total;
            this.emergencyBeneficiaries = result.data?.data?.data;
            this.pagination.current = result.data.data.current_page;
            this.pagination.total = result.data.data.last_page;
            this.loading = false;
          });
    },
    getPaymentName() {
      const queryData = {
        table_name: "emergency_allotments",
        field_name: ["id", "emergency_payment_name"],
        condition: { status: 1, deleted_at: null },
      };
      ApiService.getDropData("global/common-dropdown", queryData)
          .then((res) => {
            console.log(res);
            this.programs = res.data;
          })
          .catch((error) => console.log(error));
    },
    async deleteData(item) {
      this.$swal
          .fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true,
            confirmButtonColor: "#1C3B68",
            cancelButtonColor: "#d33",
          })
          .then(async (result) => {
            if (result.isConfirmed) {
              const res = await ApiService.delete(
                  "admin/emergency/beneficiary/" + item.id
              );
              if (res?.data?.success) {
                this.$toast.success(res.data.message);
                this.getListData();
              } else {
                this.$toast.error(res.data.message);
              }
            } else if (result.dismiss === this.$swal.DismissReason.cancel) {
              this.$swal.fire(
                  "Cancelled",
                  "Your imaginary file is safe :)",
                  "error"
              );
            }
          });
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
        this.data.thana_id = null;
      }
      if (!this.user_permission.pouro_id) {
        this.data.district_pouro_id = null;
      }
      if (!this.user_permission.location_type) {
        this.data.location_type = null;
      }
      this.data.program_id = null;
      this.data.union_id = null;
      this.data.ward_id = null;
      this.data.beneficiary_id = null;
      this.data.nominee_name = null;
      this.data.account_number = null;
      this.data.nid = null;
      this.data.status = null;

      // this.GetApplication();
      this.getListData();
    },
    updateHeaderTitle() {
      const title = this.$t("container.emergency_payment.list");
      this.$store.commit("setHeaderTitle", title);
    },
    getItemText(item) {
      return this.language === "bn" ? item.name_bn : item.name_en;
    },
    getItemValue(item) {
      return this.language === "bn" ? item.value_bn : item.value_en;
    },
  },
  watch: {
    advanch_search(val) {
      this.data = {
        ...this.data,
        beneficiary_id: null,
        nominee_name: null,
        account_number: null,
        nid: null,
        status: null,
      };
    }
    ,
    "$i18n.locale":
        "updateHeaderTitle",
  },
};
</script>
<style scoped>
.highlight-column {
  background-color: #e0eaf1;
}

.custom-margin-left {
  margin-left: 4px;
}
</style>
