<template>
  <div id="information_tracking">
    <v-row class="mx-5 mt-4">
      <v-col cols="12">
        <div class="d-block text-right mb-2">
          <v-btn
            v-can="'beneficiaryShifting-create'"
            elevation="2"
            class="mr-2 btn"
            color="primary"
            router
            to="/beneficiary-management/beneficiary-location-shifting"
          >
            {{
              $t(
                "container.beneficiary_management.beneficiary_shifting.title_location"
              )
            }}
          </v-btn>
          <v-btn
            v-can="'beneficiaryShifting-view'"
            elevation="2"
            class="btn"
            color="primary"
            router
            to="/beneficiary-management/beneficiary-shifting-list"
          >
            {{ $t("container.list.view-list") }}
          </v-btn>
        </div>
        <!-- Expantion panels start -->
        <v-card :loading="isLoading" height="100%">
          <v-expansion-panels v-model="panel" multiple>
            <v-expansion-panel>
              <v-expansion-panel-header color="#8C9EFF">
                <h3 class="white--text">
                  {{
                    $t(
                      "container.beneficiary_management.beneficiary_shifting.title"
                    )
                  }}
                </h3>
              </v-expansion-panel-header>
              <v-expansion-panel-content class="elevation-0 transparent mt-10">
                <ValidationObserver ref="form" v-slot="{ invalid }">
                  <form @submit.prevent="onSearch()">
                    <v-row>
                      <v-col lg="3" md="3" cols="12">
                        <ValidationProvider
                          name="ProgramName"
                          vid="program_id"
                          v-slot="{ errors }"
                        >
                          <v-select
                            :hide-details="errors[0] ? false : true"
                            @input="onChangeProgramName($event)"
                            v-model="data.program_id"
                            outlined
                            :label="
                              $t(
                                'container.system_config.demo_graphic.committee.program_name'
                              )
                            "
                            :items="programs"
                            :item-text="getItemText"
                            item-value="id"
                            class="no-arrow-icon"
                            :append-icon-cb="appendIconCallback"
                            append-icon="mdi-plus"
                            :error="errors[0] ? true : false"
                            :error-messages="errors[0]"
                            clearable
                          ></v-select>
                        </ValidationProvider>
                      </v-col>
                      <v-col lg="3" md="3" cols="12">
                        <ValidationProvider
                          name="Division"
                          vid="division"
                          v-slot="{ errors }"
                        >
                          <v-text-field
                            outlined
                            readonly
                            v-model="user_permission.division_name"
                            :label="
                              $t(
                                'container.system_config.demo_graphic.division.division'
                              )
                            "
                            v-if="user_permission.division"
                          >
                          </v-text-field>
                          <v-select
                            v-if="!user_permission.division"
                            outlined
                            @input="onChangeDivision($event)"
                            v-model="data.division_id"
                            :label="
                              $t(
                                'container.system_config.demo_graphic.division.division'
                              )
                            "
                            :items="divisions"
                            :item-text="getItemText"
                            item-value="id"
                            :error="errors[0] ? true : false"
                            :error-messages="errors[0]"
                            class="no-arrow-icon"
                            :append-icon-cb="appendIconCallback"
                            append-icon="mdi-plus"
                            clearable
                          >
                          </v-select>
                        </ValidationProvider>
                      </v-col>
                      <v-col lg="3" md="3" cols="12">
                        <ValidationProvider
                          name="District"
                          vid="district"
                          v-slot="{ errors }"
                        >
                          <v-text-field
                            outlined
                            readonly
                            v-model="user_permission.district_name"
                            :label="
                              $t(
                                'container.system_config.demo_graphic.district.district'
                              )
                            "
                            v-if="user_permission.district"
                          >
                          </v-text-field>
                          <v-select
                            v-if="!user_permission.district"
                            outlined
                            v-model="data.district_id"
                            @input="onChangeDistrict($event)"
                            :label="
                              $t(
                                'container.system_config.demo_graphic.district.district'
                              )
                            "
                            :items="districts"
                            :item-text="getItemText"
                            item-value="id"
                            class="no-arrow-icon"
                            :append-icon-cb="appendIconCallback"
                            append-icon="mdi-plus"
                            :error="errors[0] ? true : false"
                            :error-messages="errors[0]"
                            clearable
                          ></v-select>
                        </ValidationProvider>
                      </v-col>
                      <v-col lg="3" md="3" cols="12">
                        <ValidationProvider
                          name="Location Type"
                          vid="location_type"
                          v-slot="{ errors }"
                        >
                          <v-text-field
                            outlined
                            readonly
                            v-model="user_permission.location_type_name"
                            :label="$t('container.list.location_type')"
                            v-if="user_permission.location_type"
                          >
                          </v-text-field>
                          <v-select
                            v-if="!user_permission.location_type"
                            @input="LocationType($event)"
                            v-model="data.location_type"
                            outlined
                            :label="$t('container.list.location_type')"
                            :items="locationType"
                            :item-text="getLocationText"
                            item-value="id"
                            class="no-arrow-icon"
                            :append-icon-cb="appendIconCallback"
                            append-icon="mdi-plus"
                            :error="errors[0] ? true : false"
                            :error-messages="errors[0]"
                            clearable
                          ></v-select>
                        </ValidationProvider>
                      </v-col>
                      <v-col
                        v-if="data.location_type == 1"
                        lg="3"
                        md="3"
                        cols="12"
                      >
                        <ValidationProvider
                          name="thana"
                          vid="district_pouro_id"
                          v-slot="{ errors }"
                        >
                          <v-text-field
                            outlined
                            readonly
                            v-model="user_permission.district_pourashava_name"
                            :label="
                              $t(
                                'container.system_config.demo_graphic.ward.pouro'
                              )
                            "
                            v-if="user_permission.district_pourashava"
                          >
                          </v-text-field>
                          <v-select
                            v-if="!user_permission.district_pourashava"
                            v-model="data.district_pouro_id"
                            outlined
                            :label="
                              $t(
                                'container.system_config.demo_graphic.ward.pouro'
                              )
                            "
                            @change="onChangeDistrictPouro($event)"
                            :items="district_pouros"
                            :item-text="getItemText"
                            item-value="id"
                            class="no-arrow-icon"
                            :append-icon-cb="appendIconCallback"
                            append-icon="mdi-plus"
                            :error="errors[0] ? true : false"
                            :error-messages="errors[0]"
                            clearable
                          ></v-select>
                        </ValidationProvider>
                      </v-col>
                      <v-col
                        v-if="data.location_type == 2"
                        lg="3"
                        md="3"
                        cols="12"
                      >
                        <ValidationProvider
                          name="Upazila"
                          vid="upazila_id"
                          v-slot="{ errors }"
                        >
                          <v-text-field
                            outlined
                            readonly
                            v-model="user_permission.upazila_name"
                            :label="
                              $t(
                                'container.system_config.demo_graphic.thana.thana'
                              )
                            "
                            v-if="user_permission.upazila"
                          >
                          </v-text-field>
                          <v-select
                            v-if="!user_permission.upazila"
                            v-model="data.upazila_id"
                            outlined
                            :label="
                              $t(
                                'container.system_config.demo_graphic.thana.thana'
                              )
                            "
                            @change="onChangeUpazila($event)"
                            :items="thanas"
                            :item-text="getItemText"
                            item-value="id"
                            class="no-arrow-icon"
                            :append-icon-cb="appendIconCallback"
                            append-icon="mdi-plus"
                            :error="errors[0] ? true : false"
                            :error-messages="errors[0]"
                            clearable
                          ></v-select>
                        </ValidationProvider>
                      </v-col>

                      <v-col
                        v-if="data.location_type == 2"
                        lg="3"
                        md="3"
                        cols="12"
                      >
                        <ValidationProvider
                          name="subLocationType"
                          vid="subLocationType"
                          v-slot="{ errors }"
                        >
                          <v-autocomplete
                            @input="onChangeSubLocationType($event)"
                            v-model="data.sub_location_type"
                            outlined
                            :label="
                              $t(
                                'container.system_config.demo_graphic.ward.subLocation_type'
                              )
                            "
                            :items="subLocationType"
                            item-text="value"
                            item-value="id"
                            :error="errors[0] ? true : false"
                            :error-messages="errors[0]"
                            :hide-details="errors[0] ? false : true"
                            class="no-arrow-icon"
                            :append-icon-cb="appendIconCallback"
                            append-icon="mdi-plus"
                            clearable
                          ></v-autocomplete>
                        </ValidationProvider>
                      </v-col>
                      <v-col
                        v-if="
                          data.location_type == 2 && data.sub_location_type == 1
                        "
                        lg="3"
                        md="3"
                        cols="12"
                      >
                        <ValidationProvider
                          name="pouros"
                          vid="pouros"
                          v-slot="{ errors }"
                        >
                          <v-select
                            v-model="data.pouro_id"
                            outlined
                            :label="
                              $t(
                                'container.system_config.demo_graphic.ward.pouro'
                              )
                            "
                            :items="pouros"
                            :item-text="getItemText"
                            item-value="id"
                            :error="errors[0] ? true : false"
                            :error-messages="errors[0]"
                            :hide-details="errors[0] ? false : true"
                            class="no-arrow-icon"
                            :append-icon-cb="appendIconCallback"
                            append-icon="mdi-plus"
                            clearable
                          ></v-select>
                        </ValidationProvider>
                      </v-col>

                      <v-col
                        v-if="
                          data.sub_location_type == 2 && data.location_type == 2
                        "
                        lg="3"
                        md="3"
                        cols="12"
                      >
                        <ValidationProvider
                          name="unions"
                          vid="unions"
                          v-slot="{ errors }"
                        >
                          <v-select
                            @input="onChangeUnionGetWard($event)"
                            v-model="data.union_id"
                            outlined
                            :label="
                              $t(
                                'container.system_config.demo_graphic.ward.union'
                              )
                            "
                            :items="unions"
                            :item-text="getItemText"
                            item-value="id"
                            :error="errors[0] ? true : false"
                            :error-messages="errors[0]"
                            :hide-details="errors[0] ? false : true"
                            class="no-arrow-icon"
                            :append-icon-cb="appendIconCallback"
                            append-icon="mdi-plus"
                            clearable
                          ></v-select>
                        </ValidationProvider>
                      </v-col>

                      <v-col
                        v-if="data.location_type == 3"
                        lg="3"
                        md="3"
                        cols="12"
                      >
                        <ValidationProvider
                          name="city"
                          vid="city_id"
                          v-slot="{ errors }"
                        >
                          <v-text-field
                            outlined
                            readonly
                            v-model="user_permission.city_corp_name"
                            :label="
                              $t(
                                'container.system_config.demo_graphic.ward.city'
                              )
                            "
                            v-if="user_permission.city_corp"
                          >
                          </v-text-field>
                          <v-select
                            v-if="!user_permission.city_corp"
                            v-model="data.city_id"
                            @change="onChangeCity($event)"
                            outlined
                            :label="
                              $t(
                                'container.system_config.demo_graphic.ward.city'
                              )
                            "
                            :items="cities"
                            :item-text="getItemText"
                            item-value="id"
                            class="no-arrow-icon"
                            :append-icon-cb="appendIconCallback"
                            append-icon="mdi-plus"
                            :error="errors[0] ? true : false"
                            :error-messages="errors[0]"
                            clearable
                          ></v-select>
                        </ValidationProvider>
                      </v-col>

                      <v-col
                        v-if="data.location_type == 3"
                        lg="3"
                        md="3"
                        cols="12"
                      >
                        <ValidationProvider
                          name="thana"
                          vid="thana_id"
                          v-slot="{ errors }"
                        >
                          <v-select
                            v-model="data.thana_id"
                            outlined
                            :label="
                              $t(
                                'container.system_config.demo_graphic.ward.thana'
                              )
                            "
                            @change="onChangeThana($event)"
                            :items="thanas"
                            :item-text="getItemText"
                            item-value="id"
                            class="no-arrow-icon"
                            :append-icon-cb="appendIconCallback"
                            append-icon="mdi-plus"
                            :error="errors[0] ? true : false"
                            :error-messages="errors[0]"
                            clearable
                          ></v-select>
                        </ValidationProvider>
                      </v-col>

                      <v-col
                        v-if="
                          data.location_type == 1 ||
                          data.location_type == 2 ||
                          data.location_type == 3
                        "
                        lg="3"
                        md="3"
                        cols="12"
                      >
                        <ValidationProvider
                          name="ward"
                          vid="ward_id"
                          v-slot="{ errors }"
                        >
                          <v-select
                            v-model="data.ward_id"
                            outlined
                            :label="
                              $t(
                                'container.system_config.demo_graphic.ward.ward'
                              )
                            "
                            :items="wards"
                            :item-text="getItemText"
                            item-value="id"
                            class="no-arrow-icon"
                            :append-icon-cb="appendIconCallback"
                            append-icon="mdi-plus"
                            :error="errors[0] ? true : false"
                            :error-messages="errors[0]"
                            clearable
                          ></v-select>
                        </ValidationProvider>
                      </v-col>
                    </v-row>
                    <div class="d-inline d-flex justify-end">
                      <v-btn
                        elevation="2"
                        class="btn mr-2"
                        color="success"
                        type="submit"
                        :disabled="
                          !data.program_id ||
                          !data.division_id ||
                          !data.district_id
                        "
                        >{{ $t("container.list.search") }}</v-btn
                      >
                      <v-btn elevation="2" class="btn" @click="resetSearch">{{
                        $t("container.list.reset")
                      }}</v-btn>
                    </div>
                  </form>
                </ValidationObserver>

                <v-divider class="mb-5 mt-5"></v-divider>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card>
        <!-- Expantion panels end -->
      </v-col>

      <v-col cols="12">
        <v-card class="mb-5">
          <v-card-title class="font-weight-bold justify-center">
            {{
              $t("container.beneficiary_management.beneficiary_shifting.list")
            }}
          </v-card-title>
          <v-data-table
            :loading="loading"
            item-key="id"
            :headers="headers"
            :items="beneficiaries"
            :items-per-page="pagination.perPage"
            hide-default-footer
            class="elevation-0 transparent row-pointer"
            show-select
            v-model="selectedBeneficiaries"
          >
            <template v-slot:item.sl="{ item, index }">
              {{
                language === "bn"
                  ? $helpers.englishToBangla(
                      (pagination.current - 1) * pagination.perPage + index + 1
                    )
                  : (pagination.current - 1) * pagination.perPage + index + 1
              }}
            </template>
            <template v-slot:item.program_name="{ item }">
              {{
                language === "bn"
                  ? item.program?.name_bn
                  : item.program?.name_en
              }}
            </template>
            <template v-slot:item.mobile="{ item }">
              {{
                language === "bn"
                  ? $helpers.englishToBangla(item.mobile)
                  : item.mobile
              }}
            </template>

            <!-- <template v-slot:item.id="{ item }">
              <td>
                <v-checkbox v-model="cb[item.id]" />
              </td>
            </template> -->

            <!-- Action Button -->
            <template v-slot:item.actions="{ item }">
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn
                    v-can="'update-post'"
                    fab
                    x-small
                    v-on="on"
                    color="#AFB42B"
                    elevation="0"
                    class="white--text"
                    router
                    :to="`/beneficiary-management/beneficiary-info/details/${item.id}`"
                  >
                    <v-icon> mdi-eye </v-icon>
                  </v-btn>
                </template>
                <span>
                  {{ $t("container.list.view") }}
                </span>
              </v-tooltip>
            </template>
            <!-- End Action Button -->

            <template v-slot:footer="item">
              <div class="text-center pt-2 v-data-footer justify-center pb-2">
                <v-select
                  style="
                    position: absolute;
                    right: 25px;
                    width: 149px;
                    transform: translate(0px, 0px);
                  "
                  :items="items"
                  hide-details
                  dense
                  outlined
                  @change="onPageChange"
                  v-model="pagination.perPage"
                ></v-select>
                <v-pagination
                  circle
                  primary
                  v-model="pagination.current"
                  :length="pagination.total"
                  @input="onPageChange"
                  :total-visible="11"
                  class="custom-pagination-item"
                ></v-pagination>
              </div>
            </template>
          </v-data-table>
        </v-card>
        <v-card>
          <ValidationObserver ref="form" v-slot="{ invalid }">
            <form @submit.prevent="submitBeneficiaryShifting()">
              <v-card outlined>
                <v-card-text>
                  <v-col cols="12" class="d-flex">
                    <v-row wrap>
                      <v-col cols="12" class="d-flex">
                        <v-row wrap>
                          <v-col cols="12" sm="6" lg="6">
                            <v-autocomplete
                              v-model="submit_data.to_program_id"
                              clearable
                              outlined
                              :label="
                                $t(
                                  'container.beneficiary_management.beneficiary_shifting.allowance_program_new'
                                )
                              "
                              :items="programs"
                              :item-text="getItemText"
                              item-value="id"
                            ></v-autocomplete>

                            <v-menu
                              v-model="menu2"
                              :close-on-content-click="false"
                              :nudge-right="40"
                              transition="scale-transition"
                              offset-y
                              min-width="auto"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                  outlined
                                  clearable
                                  v-model="submit_data.activation_date"
                                  :label="
                                    $t(
                                      'container.beneficiary_management.beneficiary_shifting.activation_date'
                                    )
                                  "
                                  prepend-inner-icon="mdi-calendar"
                                  readonly
                                  v-bind="attrs"
                                  v-on="on"
                                ></v-text-field>
                              </template>
                              <v-date-picker
                                v-model="submit_data.activation_date"
                                @input="menu2 = false"
                              ></v-date-picker>
                            </v-menu>
                          </v-col>

                          <v-col cols="12" sm="6" lg="6">
                            <v-textarea
                              :label="
                                $t(
                                  'container.beneficiary_management.beneficiary_shifting.cause'
                                )
                              "
                              outlined
                              v-model="submit_data.shifting_cause"
                            >
                            </v-textarea>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-card-text>
              </v-card>

              <div class="d-inline d-flex justify-end">
                <v-btn
                  elevation="2"
                  class="btn mr-2 mb-2"
                  @click="resetSearchShiftInfo"
                  >{{ $t("container.list.reset") }}</v-btn
                >
                <v-btn
                  elevation="2"
                  class="btn mr-2 mb-2"
                  color="success"
                  type="submit"
                  flat
                  :disabled="
                    submit_data.to_program_id &&
                    selectedBeneficiaries.length > 0 &&
                    data.program_id != submit_data.to_program_id
                      ? false
                      : true
                  "
                  >{{ $t("container.list.shift") }}</v-btn
                >
              </div>
            </form>
          </ValidationObserver>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { extend, ValidationProvider, ValidationObserver } from "vee-validate";
import { required } from "vee-validate/dist/rules";
export default {
  name: "DigitalIndex",
  title: "CTM - Beneficiary Shifting",

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
        upazila_id: null,
        union_id: null,
        ward_id: null,
      },
      selectedBeneficiaries: [],
      submit_data: {
        to_program_id: null,
        shifting_cause: "",
        activation_date: "",
        beneficiaries: [],
      },
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,

      loading: false,
      isLoading: false,
      search: "",
      beneficiaries: [],
      cause_types: [],
      programs: [],
      districts: [],
      locationType: [],
      thanas: [],
      cities: [],
      unions: [],
      wards: [],
      district_pouros: [],
      cb: {},
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
      pagination: {
        current: 1,
        total: 0,
        perPage: 10,
      },
      items: [5, 10, 15, 20, 40, 50, 100],
      value: ["name_bn"],
      panel: [0],
    };
  },
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  computed: {
    language: {
      get() {
        return this.$store.getters.getAppLanguage;
      },
    },
    ...mapState({
      divisions: (state) => state.Division.divisions,
    }),
    checked() {
      var obj = Object.entries(this.cb) // [key, value]
        .filter((o) => o[1]) // filter by truthy values
        .map((o) => o[0]); // map the keys

      console.log("checked__", obj.length);
      return obj;
    },
    headers() {
      return [
        // {
        //   text: this.$t("container.list.select"),
        //   value: "id",
        //   align: "start",
        //   sortable: false,
        // },
        {
          text: this.$t("container.list.sl"),
          value: "sl",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t(
            "container.beneficiary_management.beneficiary_list.beneficiary_id"
          ),
          value: "application_id",
          align: "center",
        },
        {
          text: this.$t("container.list.name_en"),
          value: "name_en",
          align: "center",
        },
        {
          text: this.$t(
            "container.application_selection.application.father_name_en"
          ),
          value: "father_name_en",
          align: "center",
        },
        {
          text: this.$t("container.application_selection.application.program"),
          value: "program_name",
          align: "center",
        },
        {
          text: this.$t("container.application_selection.application.mobile"),
          value: "mobile",
          align: "center",
        },
        {
          text: this.$t("container.list.action"),
          value: "actions",
          align: "center",
          sortable: false,
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
  },

  methods: {
    ...mapActions({
      GetAllDivisions: "Division/GetAllDivisions",
    }),
    getItemText(item) {
      return this.language === "bn" ? item.name_bn : item.name_en;
    },
    getLocationText(item) {
      return this.language === "bn" ? item.value_bn : item.value_en;
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

      this.data.sub_location_type = null;
      this.data.city_id = null;
      this.data.district_pouro_id = null;
      this.data.thana_id = null;
      this.upazila_id = null;
      this.data.union_id = null;
      this.data.ward_id = null;
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
      this.isLoading = true;
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
            this.isLoading = false;
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
      this.GetBeneficiary();
    },
    onSearch() {
      this.pagination = {
        ...this.pagination,
        current: 1,
      };
      this.GetBeneficiary();
    },
    async GetBeneficiary() {
      if (
        this.data.program_id &&
        this.data.division_id &&
        this.data.district_id
        // (this.data.city_id || this.data.district_pouro_id || this.data.upazila_id)
      ) {
        this.loading = true;
        const queryParams = {
          program_id: this.data.program_id,
          division_id: this.data.division_id,
          district_id: this.data.district_id,
          location_type_id: this.data.location_type,
          city_corp_id: this.data.city_id,
          district_pourashava_id: this.data.district_pouro_id,
          union_id: this.data.union_id,
          thana_id: this.data.thana_id,
          upazila_id: this.data.upazila_id,
          ward_id: this.data.ward_id,
          status: 1, //Active list

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

            this.pagination.current = result.data.meta.current_page;
            this.pagination.total = result.data.meta.last_page;
            this.pagination.grand_total = result.data.meta.total;
            this.loading = false;
          });
      }
    },
    submitBeneficiaryShifting() {
      //   const beneficiaries = [];
      //   this.checked.map((item) => {
      //     const data = {
      //       beneficiary_id: item,
      //     };
      //     beneficiaries.push(data);
      //   });

      if (this.selectedBeneficiaries.length === 0) {
        this.$toast.error("Please select at least one Beneficiary for Exit");
        return;
      }
      let fd = new FormData();

      fd.append("to_program_id", this.submit_data.to_program_id);
      fd.append("shifting_cause", this.submit_data.shifting_cause);
      fd.append("activation_date", this.submit_data.activation_date);

      console.log("to_program_id", this.submit_data.to_program_id);

      // Convert each object in the beneficiaries array to a JSON string
      this.selectedBeneficiaries.forEach((beneficiary, index) => {
        fd.append(`beneficiaries[${index}][beneficiary_id]`, beneficiary?.id);
        fd.append(
          `beneficiaries[${index}][from_program_id]`,
          beneficiary?.program?.id
        );
      });

      try {
        this.$store
          .dispatch("BeneficiaryManagement/BeneficiaryShifting", fd)
          .then((res) => {
            console.log(res, "submit__");
            if (res.data?.success) {
              console.log(res.data?.success, "submit__");
              this.$toast.success("Beneficiary Shifting Successfully");
              this.$router.push({ name: "beneficiary_shifting_list" });
            } else if (res.response?.data?.errors) {
              this.$refs.form.setErrors(res.response.data.errors);
              this.errors = res.response.data.errors;
              //   this.$toast.error(res.response.data.message);
            }
            console.log(this.$refs);
            console.log(this.errors, "this.errors");
          });
      } catch (e) {
        console.log(e);
      }
    },
    resetSearchShiftInfo() {
      this.submit_data = {};
    },
    updateHeaderTitle() {
      const title = this.$t(
        "container.beneficiary_management.beneficiary_exit.title"
      );
      this.$store.commit("setHeaderTitle", title);
    },
    async GetAllCommitteeType() {
      try {
        this.$store.dispatch("getLookupByType", 22).then((data) => {
          this.cause_types = data;
          console.log(this.cause_types, "Cause_type");
        });
      } catch (e) {
        console.log(e);
      }
    },
  },
  watch: {
    "$i18n.locale": "updateHeaderTitle",
    value(val) {},
  },
  created() {
    this.GetBeneficiary();
  },

  beforeMount() {
    this.updateHeaderTitle();
    this.GetAllCommitteeType();
  },
  mounted() {
    this.GetUserPermission();
    this.GetAllProgram();
    this.GetAllDivisions();
    this.$store
      .dispatch("getLookupByType", 1)
      .then((res) => (this.locationType = res));
  },
};
</script>