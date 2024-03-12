<template>
  <div id="information_tracking">
    <v-row class="mx-5 mt-2">
      <v-col cols="12">
        <div class="d-block text-right mb-2">
          <v-btn
            elevation="2"
            class="btn"
            color="primary"
            router
            to="/beneficiary-management/beneficiary-location-shifting-list"
          >
            {{ $t("container.list.view-list") }}
          </v-btn>
        </div>
        <ValidationObserver ref="form" v-slot="{ invalid }">
          <form @submit.prevent="addByBeneficiaryInTable">
            <v-row>
              <v-col cols="12">
                <v-card elevation="3" outlined>
                  <v-row>
                    <v-col col="6">
                      <v-card-title class="page-header"
                        ><h5 class="white--text">
                          {{
                            $t(
                              "container.beneficiary_management.beneficiary_shifting.title"
                            )
                          }}
                        </h5></v-card-title
                      >
                    </v-col>
                  </v-row>
                  <v-divider></v-divider>
                  <v-card-text>
                    <div>
                      <v-row>
                        <v-col lg="6" md="6" cols="12">
                          <ValidationProvider
                            name="Division"
                            vid="division"
                            v-slot="{ errors }"
                          >
                            <v-text-field
                              outlined
                              readonly
                              v-model="user_permission.division.name_en"
                              :label="
                                $t(
                                  'container.system_config.demo_graphic.division.division'
                                )
                              "
                              v-if="user_permission.division"
                            >
                            </v-text-field>
                            <v-autocomplete
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
                              item-text="name_en"
                              item-value="id"
                              :error="errors[0] ? true : false"
                              :error-messages="errors[0]"
                              class="no-arrow-icon"
                              :append-icon-cb="appendIconCallback"
                              append-icon="mdi-plus"
                            >
                            </v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <v-col lg="6" md="6" cols="12">
                          <ValidationProvider
                            name="District"
                            vid="district"
                            v-slot="{ errors }"
                          >
                            <v-text-field
                              outlined
                              readonly
                              v-model="user_permission.division.name_en"
                              :label="
                                $t(
                                  'container.system_config.demo_graphic.district.district'
                                )
                              "
                              v-if="user_permission.district"
                            >
                            </v-text-field>
                            <v-autocomplete
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
                              item-text="name_en"
                              item-value="id"
                              class="no-arrow-icon"
                              :append-icon-cb="appendIconCallback"
                              append-icon="mdi-plus"
                              :error="errors[0] ? true : false"
                              :error-messages="errors[0]"
                            ></v-autocomplete>
                          </ValidationProvider>
                        </v-col>

                        <v-col lg="6" md="6" cols="12">
                          <ValidationProvider
                            name="Location Type"
                            vid="location_type"
                            v-slot="{ errors }"
                          >
                            <v-text-field
                              outlined
                              readonly
                              v-model="user_permission.location_type.value_en"
                              :label="$t('container.list.location_type')"
                              v-if="user_permission.location_type"
                            >
                            </v-text-field>
                            <v-autocomplete
                              v-if="!user_permission.location_type"
                              @input="LocationType($event)"
                              v-model="data.location_type"
                              outlined
                              :label="$t('container.list.location_type')"
                              :items="locationType"
                              item-text="value_en"
                              item-value="id"
                              class="no-arrow-icon"
                              :append-icon-cb="appendIconCallback"
                              append-icon="mdi-plus"
                              :error="errors[0] ? true : false"
                              :error-messages="errors[0]"
                            ></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <v-col
                          v-if="data.location_type == 1"
                          lg="6"
                          md="6"
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
                              v-model="
                                user_permission.district_pourashava.name_en
                              "
                              :label="
                                $t(
                                  'container.system_config.demo_graphic.ward.pouro'
                                )
                              "
                              v-if="user_permission.location_type"
                            >
                            </v-text-field>
                            <v-autocomplete
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
                              item-text="name_en"
                              item-value="id"
                              class="no-arrow-icon"
                              :append-icon-cb="appendIconCallback"
                              append-icon="mdi-plus"
                              :error="errors[0] ? true : false"
                              :error-messages="errors[0]"
                            ></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <v-col
                          v-if="data.location_type == 2"
                          lg="6"
                          md="6"
                          cols="12"
                        >
                          <ValidationProvider
                            name="Upazila"
                            vid="thana_id"
                            v-slot="{ errors }"
                          >
                            <v-text-field
                              outlined
                              readonly
                              v-model="user_permission.upazila.name_en"
                              :label="
                                $t(
                                  'container.system_config.demo_graphic.thana.thana'
                                )
                              "
                              v-if="user_permission.upazila"
                            >
                            </v-text-field>
                            <v-autocomplete
                              v-if="!user_permission.upazila"
                              v-model="data.thana_id"
                              outlined
                              :label="
                                $t(
                                  'container.system_config.demo_graphic.thana.thana'
                                )
                              "
                              @change="onChangeUpazila($event)"
                              :items="thanas"
                              item-text="name_en"
                              item-value="id"
                              class="no-arrow-icon"
                              :append-icon-cb="appendIconCallback"
                              append-icon="mdi-plus"
                              :error="errors[0] ? true : false"
                              :error-messages="errors[0]"
                            ></v-autocomplete>
                          </ValidationProvider>
                        </v-col>

                        <v-col
                          v-if="data.location_type == 2"
                          lg="6"
                          md="6"
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
                              item-text="value_en"
                              item-value="id"
                              :error="errors[0] ? true : false"
                              :error-messages="errors[0]"
                              :hide-details="errors[0] ? false : true"
                              class="no-arrow-icon"
                              :append-icon-cb="appendIconCallback"
                              append-icon="mdi-plus"
                            ></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <v-col
                          v-if="
                            data.location_type == 2 &&
                            data.sub_location_type == 1
                          "
                          lg="6"
                          md="6"
                          cols="12"
                        >
                          <ValidationProvider
                            name="pouros"
                            vid="pouros"
                            v-slot="{ errors }"
                          >
                            <v-autocomplete
                              v-model="data.pouro_id"
                              outlined
                              :label="
                                $t(
                                  'container.system_config.demo_graphic.ward.pouro'
                                )
                              "
                              :items="pouros"
                              item-text="name_en"
                              item-value="id"
                              :error="errors[0] ? true : false"
                              :error-messages="errors[0]"
                              :hide-details="errors[0] ? false : true"
                              class="no-arrow-icon"
                              :append-icon-cb="appendIconCallback"
                              append-icon="mdi-plus"
                            ></v-autocomplete>
                          </ValidationProvider>
                        </v-col>

                        <v-col
                          v-if="
                            data.sub_location_type == 2 &&
                            data.location_type == 2
                          "
                          lg="6"
                          md="6"
                          cols="12"
                        >
                          <ValidationProvider
                            name="unions"
                            vid="unions"
                            v-slot="{ errors }"
                          >
                            <v-autocomplete
                              @input="onChangeUnionGetWard($event)"
                              v-model="data.union_id"
                              outlined
                              :label="
                                $t(
                                  'container.system_config.demo_graphic.ward.union'
                                )
                              "
                              :items="unions"
                              item-text="name_en"
                              item-value="id"
                              :error="errors[0] ? true : false"
                              :error-messages="errors[0]"
                              :hide-details="errors[0] ? false : true"
                              class="no-arrow-icon"
                              :append-icon-cb="appendIconCallback"
                              append-icon="mdi-plus"
                            ></v-autocomplete>
                          </ValidationProvider>
                        </v-col>

                        <v-col
                          v-if="data.location_type == 3"
                          lg="6"
                          md="6"
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
                              v-model="user_permission.city_corp.name_en"
                              :label="
                                $t(
                                  'container.system_config.demo_graphic.ward.city'
                                )
                              "
                              v-if="user_permission.city_corp"
                            >
                            </v-text-field>
                            <v-autocomplete
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
                              item-text="name_en"
                              item-value="id"
                              class="no-arrow-icon"
                              :append-icon-cb="appendIconCallback"
                              append-icon="mdi-plus"
                              :error="errors[0] ? true : false"
                              :error-messages="errors[0]"
                            ></v-autocomplete>
                          </ValidationProvider>
                        </v-col>

                        <v-col
                          v-if="data.location_type == 3"
                          lg="6"
                          md="6"
                          cols="12"
                        >
                          <ValidationProvider
                            name="thana"
                            vid="thana_id"
                            v-slot="{ errors }"
                          >
                            <v-autocomplete
                              v-model="data.thana_id"
                              outlined
                              :label="
                                $t(
                                  'container.system_config.demo_graphic.ward.thana'
                                )
                              "
                              @change="onChangeThana($event)"
                              :items="thanas"
                              item-text="name_en"
                              item-value="id"
                              class="no-arrow-icon"
                              :append-icon-cb="appendIconCallback"
                              append-icon="mdi-plus"
                              :error="errors[0] ? true : false"
                              :error-messages="errors[0]"
                            ></v-autocomplete>
                          </ValidationProvider>
                        </v-col>

                        <v-col
                          v-if="
                            data.location_type == 1 ||
                            data.location_type == 2 ||
                            data.location_type == 3
                          "
                          lg="6"
                          md="6"
                          cols="12"
                        >
                          <ValidationProvider
                            name="ward"
                            vid="ward_id"
                            v-slot="{ errors }"
                          >
                            <v-autocomplete
                              v-model="data.ward_id"
                              outlined
                              :label="
                                $t(
                                  'container.system_config.demo_graphic.ward.ward'
                                )
                              "
                              :items="wards"
                              item-text="name_en"
                              item-value="id"
                              class="no-arrow-icon"
                              :append-icon-cb="appendIconCallback"
                              append-icon="mdi-plus"
                              :error="errors[0] ? true : false"
                              :error-messages="errors[0]"
                            ></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <v-col lg="6" md="6" cols="12">
                          <ValidationProvider
                            name="ProgramName"
                            vid="program_id"
                            v-slot="{ errors }"
                          >
                            <v-autocomplete
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
                              item-text="name_en"
                              item-value="id"
                              class="no-arrow-icon"
                              :append-icon-cb="appendIconCallback"
                              append-icon="mdi-plus"
                              :error="errors[0] ? true : false"
                              :error-messages="errors[0]"
                            ></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <v-col lg="6" md="6" cols="12">
                          <ValidationProvider
                            name="Beneficiary ID"
                            vid="beneficiary_id"
                            v-slot="{ errors }"
                          >
                            <v-autocomplete
                              :hide-details="errors[0] ? false : true"
                              v-model="selected_ben_ids"
                              clearable
                              outlined
                              :label="
                                $t(
                                  'container.beneficiary_management.beneficiary_list.beneficiary_id'
                                )
                              "
                              :items="beneficiary_ids"
                              item-text="application_id"
                              item-value="application_id"
                              required
                              multiple
                              chips
                              closable-chips
                              :error="errors[0] ? true : false"
                              :error-messages="errors[0]"
                            >
                              <template v-slot:selection="data">
                                <v-chip
                                  :selected="data.selected"
                                  close
                                  class="chip--select-multi"
                                  @click:close="
                                    remove(data.item.application_id)
                                  "
                                >
                                  {{ data.item.application_id }}
                                </v-chip>
                              </template>
                            </v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                      </v-row>
                    </div>
                    <div class="d-inline d-flex justify-end">
                      <v-btn
                        elevation="2"
                        class="btn mr-2 mb-1"
                        color="success"
                        type="submit"
                        flat
                        :disabled="ben_search_id ? false : true"
                        >{{ $t("container.list.add") }}</v-btn
                      >
                    </div>
                  </v-card-text>
                </v-card>
                <v-divider></v-divider>
                <v-card outlined>
                  <v-card-text out v-if="beneficiariesList.length > 0">
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
                                    'container.application_selection.application.program'
                                  )
                                "
                                :items="programs"
                                item-text="name_en"
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
              </v-col>
            </v-row>
          </form>
        </ValidationObserver>
      </v-col>

      <v-col cols="12" v-if="beneficiariesList.length > 0">
        <v-card elevation="1" outlined>
          <v-card-title> </v-card-title>
          <v-card-text>
            <ValidationObserver ref="form" v-slot="{ invalid }">
              <form @submit.prevent="submitBeneficiaryShifting()">
                <v-card>
                  <v-card-title class="font-weight-bold justify-center">
                    {{
                      $t(
                        "container.beneficiary_management.beneficiary_shifting.list"
                      )
                    }}
                  </v-card-title>
                  <v-data-table
                    item-key="id"
                    :headers="headers"
                    :items="beneficiariesList"
                    class="elevation-0 transparent row-pointer mt-5"
                    hide-default-footer
                  >
                    <!-- Action Button -->
                    <template v-slot:item.actions="{ item }">
                      <v-tooltip top>
                        <template v-slot:activator="{ on }">
                          <v-btn
                            v-can="'update-post'"
                            fab
                            x-small
                            v-on="on"
                            color="#b71c1c"
                            elevation="0"
                            class="white--text"
                            @click="removeByBeneficiaryFromTable(item.id)"
                          >
                            <v-icon> mdi-delete </v-icon>
                          </v-btn>
                        </template>
                        <span>
                          {{ $t("container.list.delete") }}
                        </span>
                      </v-tooltip>
                    </template>
                  </v-data-table>
                </v-card>
                <div class="d-inline d-flex justify-end mt-5">
                  <v-btn elevation="2" class="btn mr-2" @click="resetForm">{{
                    $t("container.list.reset")
                  }}</v-btn>
                  <v-btn
                    elevation="2"
                    class="btn mr-2"
                    color="success"
                    type="submit"
                    :disabled="submit_data.to_program_id ? false : true"
                    >{{ $t("container.list.shift") }}</v-btn
                  >
                </div>
              </form>
            </ValidationObserver>
          </v-card-text>
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
  title: "CTM - Beneficiary Location Shifting",

  data() {
    return {
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,

      search: "",
      keyup_native: "",
      programs: [],
      panel: [0],
      table_serial: 1,
      ben_search_id: "",
      beneficiaries: [],
      beneficiary_ids: [],
      selected_ben_ids: [],
      beneficiariesList: [],
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
      },
      beneficiary_details: {},
      submit_data: {
        to_program_id: null,
        shifting_cause: "",
        activation_date: "",
        beneficiaries: [],
      },
      user_permission: {
        division: null,
        district: null,
        location_type: null,
        upazila: null,
        city_corp: null,
        district_pourashava: null,
      },
      subLocationType: [
        {
          id: 1,
          value_en: "Pouroshava",
        },

        {
          id: 2,
          value_en: "Union",
        },
      ],
    };
  },
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  computed: {
    ...mapState({
      divisions: (state) => state.Division.divisions,
    }),
    headers() {
      return [
        {
          text: this.$t("container.list.sl"),
          value: "id",
          align: "start",
          sortable: false,
        },
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
          text: this.$t(
            "container.application_selection.application.mother_name_en"
          ),
          value: "mother_name_en",
        },
        {
          text: this.$t(
            "container.application_selection.application.father_name_en"
          ),
          value: "father_name_en",
        },
        {
          text: this.$t("container.application_selection.application.program"),
          value: "program_name",
        },

        {
          text: this.$t("container.application_selection.application.mobile"),
          value: "mobile",
        },
        {
          text: this.$t("container.list.action"),
          value: "actions",
          align: "center",
          sortable: false,
        },
      ];
    },
  },

  methods: {
    ...mapActions({
      GetAllDivisions: "Division/GetAllDivisions",
    }),
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
              if (!item?.district) {
                this.onChangeDivision(item?.division?.id);
              } else {
                this.data.district_id = item?.district?.id;
                this.user_permission.district = item?.district;
              }
            }
            if (item?.location_type) {
              this.user_permission.location_type = item?.location_type;
              this.data.location_type = item?.location_type?.id;
            }
            if (item?.district_pourashava) {
              this.data.district_pouro_id = item?.district_pourashava?.id;
              this.user_permission.district_pourashava =
                item?.district_pourashava;
              this.onChangeDistrictPouro(item?.district_pourashava?.id);
            }
            if (item?.upazila) {
              this.user_permission.upazila = item?.upazila;
              this.data.thana_id = item?.upazila?.id;
            }
            if (item?.city_corp) {
              this.data.city_id = item?.city_corp?.id;
              this.user_permission.city_corp = item?.city_corp;
              this.onChangeCity(item?.city_corp?.id);
            }
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
    async GetBeneficaryDetails(event) {
      console.log("ben_search_id_", this.ben_search_id);
      if (event) {
        try {
          this.$axios
            .get(`/admin/beneficiary/show/${event}`, {
              headers: {
                Authorization: "Bearer " + this.$store.state.token,
                "Content-Type": "multipart/form-data",
              },
            })
            .then((res) => {
              if (res.data?.success) {
                this.beneficiary_details = res.data.data;
                this.data = res.data.data;
              } else {
                this.$toast.error("Record not found!");
                // this.$router.push({ name: "Beneficiary_List" });
              }
            })
            .catch((err) => {
              if (err.response?.data?.errors) {
                this.$refs.form.setErrors(err.response.data.errors);
              }
              console.log(err.response);
              this.$toast.error(err?.response?.data?.message);
            });
        } catch (e) {
          console.log(e);
        }
      } else {
        this.beneficiary_details = {};
      }
    },
    async GetBeneficiaryIds() {
      const queryParams = {
        searchText: this.ben_search_id,
      };
      this.$axios
        .get("/admin/beneficiary/listDropDown", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
          params: queryParams,
        })
        .then((result) => {
          this.beneficiary_ids = result.data.data;
        });
    },
    addByBeneficiaryInTable() {
      var item = this.data;
      if (this.data.application_id !== null) {
        var result = this.beneficiariesList.filter(
          (beneficiary) => beneficiary.beneficiary_id === item.application_id
        );

        //item already loaded in list
        if (result.length === 0) {
          let data = {
            id: this.table_serial++,
            beneficiary_id: item.application_id,
            name_en: item.name_en,
            program_name: item.program.name_en,
            father_name_en: item.father_name_en,
            mother_name_en: item.mother_name_en,
            mobile: item.mobile,
          };

          this.beneficiariesList.push(data);

          //submit data prepare
          let submitData = {
            beneficiary_id: item.id,
            from_program_id: item.program.id,
          };
          this.submit_data.beneficiaries.push(submitData);
        }
        this.ben_search_id = "";
        // this.data.beneficiary_id = null;
        this.beneficiary_details = {};
      }
    },
    removeByBeneficiaryFromTable(rowId) {
      //remove from table data
      let dl = [...this.beneficiariesList];
      dl.splice(
        dl.findIndex((t) => t.id === rowId),
        1
      );
      dl.forEach((t, i) => {
        t.id = i + 1;
      });
      this.beneficiariesList = dl;

      //remove from submit json
      let data = [...this.submit_data.beneficiaries];
      data.splice(
        dl.findIndex((t) => t.id === rowId),
        1
      );
      this.submit_data.beneficiaries = data;
    },
    submitBeneficiaryShifting() {
      let fd = new FormData();

      fd.append("to_program_id", this.submit_data.to_program_id);
      fd.append("shifting_cause", this.submit_data.shifting_cause);
      fd.append("activation_date", this.submit_data.activation_date);

      console.log("bene___", this.submit_data.beneficiaries);

      // Convert each object in the beneficiaries array to a JSON string
      this.submit_data.beneficiaries.forEach((beneficiary, index) => {
        //   fd.append(`beneficiaries[${index}]`, JSON.stringify(beneficiary));
        fd.append(
          `beneficiaries[${index}][beneficiary_id]`,
          beneficiary.beneficiary_id
        );
        fd.append(
          `beneficiaries[${index}][from_program_id]`,
          beneficiary.from_program_id
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
    resetForm() {
      this.submit_data = {};
    },
    async GetAllProgram() {
      try {
        this.$axios
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
    remove(item) {
      // alert(this.selected_ben_ids.length);
      this.selected_ben_ids.map((row) => console.log("value_", row));

      const index = this.selected_ben_ids.indexOf(item);
      if (index >= 0) this.selected_ben_ids.splice(index, 1);
    },
    updateHeaderTitle() {
      const title = this.$t(
        "container.beneficiary_management.beneficiary_shifting.title"
      );
      this.$store.commit("setHeaderTitle", title);
    },
  },
  watch: {
    "$i18n.locale": "updateHeaderTitle",
    value(val) {},
  },

  beforeMount() {
    this.updateHeaderTitle();
  },
  created() {
    this.GetAllDivisions();
  },
  mounted() {
    this.GetUserPermission();
    this.GetBeneficiaryIds();
    this.GetAllProgram();
    this.$store
      .dispatch("getLookupByType", 1)
      .then((res) => (this.locationType = res));
  },
};
</script>
<style scoped>
.page-header {
  background-color: #8c9eff;
  color: #000;
}
</style>