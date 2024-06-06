<template>
  <div id="emergency_allotment">
    <v-row class="ml-sm-5 mt-0">
      <v-col cols="12">
        <Spinner :loading="loading" />
        <!-- Search Panel Starts -->
        <!--Table header & Body part ends -->
        <!-- Dialog Starts -->
        <v-row justify="center">
          <v-dialog v-model="openDialog" persistent max-width="80%">
            <v-card>
              <v-card-title>
                <span class="text-h5">Search</span>
              </v-card-title>
              <!-- Form -->
              <v-card-text>
                <ValidationObserver ref="form">
                  <v-form @submit.prevent="createEmergencyAllotment()">
                    <v-container>
                      <v-row>
                        <v-col lg="6" md="4" sm="6" cols="12">
                          <ValidationProvider
                            name="Program Name"
                            vid="program_name"
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <v-autocomplete
                              :hide-details="errors[0] ? false : true"
                              v-model="data.program_id"
                              outlined
                              clearable
                              :label="
                                $t('container.emergency_payment.program_name')
                              "
                              :items="allowanceProgrames"
                              item-text="name_en"
                              item-value="id"
                              required
                              :error="errors[0] ? true : false"
                              :error-messages="
                                errors[0]
                                  ? language === 'bn'
                                    ? 'অনুগ্রহ করে প্রোগ্রামের নাম নির্বাচন করুন'
                                    : 'Please select the program name'
                                  : ''
                              "
                            ></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <!-- location panel -->
                        <v-col lg="6" md="4" sm="6" cols="12">
                          <ValidationProvider
                            name="Division"
                            vid="division"
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <v-autocomplete
                              :hide-details="errors[0] ? false : true"
                              @change="getDistrictList"
                              v-model="data.division_id"
                              outlined
                              clearable
                              :label="
                                $t(
                                  'container.system_config.demo_graphic.division.division'
                                )
                              "
                              :items="divisions"
                              item-text="name_en"
                              item-value="id"
                              required
                              :error="errors[0] ? true : false"
                              :error-messages="
                                errors[0]
                                  ? language === 'bn'
                                    ? 'অনুগ্রহ করে বিভাগের নাম নির্বাচন করুন'
                                    : 'Please select the division name'
                                  : ''
                              "
                            ></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <v-col lg="6" md="4" sm="6" cols="12">
                          <ValidationProvider
                            name="District"
                            vid="district"
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <v-autocomplete
                              :hide-details="errors[0] ? false : true"
                              outlined
                              v-model="data.district_id"
                              @input="getThanaList"
                              clearable
                              :label="
                                $t(
                                  'container.system_config.demo_graphic.district.district'
                                )
                              "
                              :items="districts"
                              item-text="name_en"
                              item-value="id"
                              required
                              :error="errors[0] ? true : false"
                              :error-messages="
                                errors[0]
                                  ? language === 'bn'
                                    ? 'অনুগ্রহ করে জেলার নাম নির্বাচন করুন'
                                    : 'Please select the district name'
                                  : ''
                              "
                            ></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <v-col cols="12" lg="6" md="4" sm="6">
                          <ValidationProvider
                            name="Location Type"
                            vid="location_type"
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <v-autocomplete
                              @input="LocationType($event)"
                              v-model="data.location_type"
                              :hide-details="errors[0] ? false : true"
                              outlined
                              :label="$t('container.list.location_type')"
                              :items="locationType"
                              item-text="value_en"
                              clearable
                              item-value="id"
                              required
                              :error="errors[0] ? true : false"
                              :error-messages="
                                errors[0]
                                  ? language === 'bn'
                                    ? 'অবস্থানের ধরন নির্বাচন করুন'
                                    : 'Please select the location type'
                                  : ''
                              "
                            ></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <v-col
                          v-if="data.location_type == 2"
                          lg="6"
                          md="4"
                          sm="6"
                          cols="12"
                        >
                          <ValidationProvider
                            name="Upazila"
                            vid="thana_id"
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <v-autocomplete
                              :hide-details="errors[0] ? false : true"
                              v-model="data.thana_id"
                              outlined
                              :label="
                                $t(
                                  'container.system_config.demo_graphic.thana.thana'
                                )
                              "
                              @change="getUnionList"
                              clearable
                              :items="thanas"
                              item-text="name_en"
                              item-value="id"
                              required
                              :error="errors[0] ? true : false"
                              :error-messages="
                                errors[0]
                                  ? language === 'bn'
                                    ? 'অনুগ্রহ করে উপজেলার নাম নির্বাচন করুন'
                                    : 'Please select the upazila name'
                                  : ''
                              "
                            ></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <v-col
                          v-if="data.location_type == 2"
                          lg="6"
                          md="4"
                          sm="6"
                          cols="12"
                        >
                          <ValidationProvider
                            name="union"
                            vid="union_id"
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <v-autocomplete
                              :hide-details="errors[0] ? false : true"
                              v-model="data.union_id"
                              outlined
                              :label="
                                $t(
                                  'container.system_config.demo_graphic.ward.union'
                                )
                              "
                              :items="unions"
                              item-text="name_en"
                              clearable
                              item-value="id"
                              required
                              :error="errors[0] ? true : false"
                              :error-messages="
                                errors[0]
                                  ? language === 'bn'
                                    ? 'অনুগ্রহ করে ইউনিয়নের নাম নির্বাচন করুন'
                                    : 'Please select the union name'
                                  : ''
                              "
                            ></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <v-col
                          v-if="data.location_type == 3"
                          lg="6"
                          md="4"
                          sm="6"
                          cols="12"
                        >
                          <ValidationProvider
                            name="city corporation"
                            vid="city_id"
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <v-autocomplete
                              :hide-details="errors[0] ? false : true"
                              v-model="data.city_id"
                              @change="getCityThanaList"
                              outlined
                              clearable
                              :label="
                                $t(
                                  'container.system_config.demo_graphic.ward.city'
                                )
                              "
                              :items="cities"
                              item-text="name_en"
                              item-value="id"
                              required
                              :error="errors[0] ? true : false"
                              :error-messages="
                                errors[0]
                                  ? language === 'bn'
                                    ? 'অনুগ্রহ করে সিটি কর্পোরেশনের নাম নির্বাচন করুন'
                                    : 'Please select the city corporation Name'
                                  : ''
                              "
                            ></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <v-col
                          v-if="data.location_type == 3"
                          lg="6"
                          md="4"
                          sm="6"
                          cols="12"
                        >
                          <ValidationProvider
                            name="thana"
                            vid="city_thana_id"
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <v-autocomplete
                              :hide-details="errors[0] ? false : true"
                              v-model="data.city_thana_id"
                              outlined
                              :label="
                                $t(
                                  'container.system_config.demo_graphic.ward.thana'
                                )
                              "
                              :items="city_thanas"
                              item-text="name_en"
                              item-value="id"
                              clearable
                              required
                              :error="errors[0] ? true : false"
                              :error-messages="
                                errors[0]
                                  ? language === 'bn'
                                    ? 'অনুগ্রহ করে থানার নাম নির্বাচন করুন'
                                    : 'Please select the thana Name'
                                  : ''
                              "
                            ></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <v-col
                          v-if="data.location_type == 1"
                          lg="6"
                          md="4"
                          sm="6"
                          cols="12"
                        >
                          <ValidationProvider
                            name="District Pourashava"
                            vid="district_pouro_id"
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <v-autocomplete
                              :hide-details="errors[0] ? false : true"
                              v-model="data.district_pouro_id"
                              outlined
                              :label="
                                $t(
                                  'container.system_config.demo_graphic.ward.pouro'
                                )
                              "
                              :items="district_poros"
                              item-text="name_en"
                              item-value="id"
                              clearable
                              required
                              :error="errors[0] ? true : false"
                              :error-messages="
                                errors[0]
                                  ? language === 'bn'
                                    ? 'অনুগ্রহ করে জেলার পৌরশব নাম নির্বাচন করুন'
                                    : 'Please select the district Paurashava Name'
                                  : ''
                              "
                            ></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <v-col lg="6" md="6" cols="12">
                          <ValidationProvider
                            name="Search By"
                            vid="searchBy"
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <v-autocomplete
                              :hide-details="errors[0] ? false : true"
                              v-model="data.searchBy"
                              outlined
                              :label="
                                $t(
                                  'container.emergency_payment.emergency_beneficiary.searchBy'
                                )
                              "
                              :items="searchFilters"
                              item-text="name"
                              item-value="name"
                              required
                              clearable
                              :error="errors[0] ? true : false"
                              :error-messages="
                                errors[0]
                                  ? language === 'bn'
                                    ? 'দ্বারা অনুসন্ধান নির্বাচন করুন'
                                    : 'Please select Search By'
                                  : ''
                              "
                            ></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <v-col lg="6" md="6" cols="12">
                          <ValidationProvider
                            name="Status"
                            vid="status"
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <v-autocomplete
                              :hide-details="errors[0] ? false : true"
                              v-model="data.status"
                              outlined
                              clearable
                              :label="$t('container.list.status')"
                              :items="statusFilters"
                              item-text="name"
                              item-value="name"
                              required
                              :error="errors[0] ? true : false"
                              :error-messages="
                                errors[0]
                                  ? language === 'bn'
                                    ? 'অনুগ্রহ করে স্ট্যাটাস সিলেক্ট করুন'
                                    : 'Please select the status'
                                  : ''
                              "
                            ></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <!-- v-data table -->
                        <v-col cols="12">
                          <v-data-table
                            :loading="loading"
                            item-key="id"
                            :headers="modalHeaders"
                            v-model="selected"
                            :items="emergencyAllotments"
                            :items-per-page="pagination.perPage"
                            hide-default-footer
                            class="elevation-1 transparent row-pointer table-responsive"
                          >
                            <!-- :single-select="singleSelect" show-select -->
                            <!-- <template v-slot:top>
                              <v-switch
                                v-model="singleSelect"
                                label="Single select"
                                class="pa-3"
                              ></v-switch>
                            </template> -->
                            <template v-slot:item.glutenfree="{ item }">
                              <v-simple-checkbox
                                v-model="item.glutenfree"
                              ></v-simple-checkbox>
                            </template>
                          </v-data-table>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-form>
                </ValidationObserver>
              </v-card-text>
              <!-- Action buttons -->
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="openDialog = false">
                  {{ $t("container.list.close") }}
                </v-btn>
                <v-btn color="blue darken-1" text @click="addToList">
                  {{ $t("container.list.addToList") }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
        <!-- Dialog Ends -->
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ApiService from "@/services/ApiService";
import { extend, ValidationProvider, ValidationObserver } from "vee-validate";
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
  name: "Create",
  title: "CTM - Emergency Beneficiary Create",
  components: {
    ValidationProvider,
    ValidationObserver,
    Spinner,
  },
  props: ["componentData", "openDialog"],
  data() {
    return {
      data: {
        program_id: null,
        emergency_payment_name: null,
        division_id: null,
        district_id: null,
        location_type: null,
        thana_id: null,
        union_id: null,
        city_id: null,
        city_thana_id: null,
        district_pouro_id: null,
        searchBy: null,
        status: null,
      },
      styleObject: { border: "2px solid  rgba(9, 9, 121, 100)" },
      districts: [],
      district_poros: [],
      cities: [],
      thanas: [],
      city_thanas: [],
      unions: [],
      wards: [],
      locationType: [],
      loading: false,
      emergencyAllotments: [],
      payment_names: [],
      search: "",
      sortBy: "emergency_payment_name",
      sortDesc: false, //ASC
      total: null,
      pagination: {
        current: 1,
        total: 0,
        perPage: 5,
      },

      items: [5, 10, 15, 20, 40, 50, 100],
      selectedColumns: [
        "emergency_payment_name",
        "program.name_en",
        "program.name_bn",
        "no_of_new_benificiariy",
        "no_of_existing_benificiariy",
      ], // Initially, first 6 columns are selected
      fixedColumns: ["id", "actions"], // Two columns that will always remain visible
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
      searchFilters: [
        {
          id: 1,
          name: "By Name",
        },
        {
          id: 2,
          name: "By Division",
        },
        {
          id: 3,
          name: "By Date",
        },
        {
          id: 3,
          name: "By Month",
        },
      ],
      singleSelect: false,
      selected: [],
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: 1,
          glutenfree: true,
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: 1,
          glutenfree: false,
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: 7,
          glutenfree: false,
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: 0,
          glutenfree: true,
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: 2,
          glutenfree: true,
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: 6,
          glutenfree: false,
        },
      ],
    };
  },
  computed: {
    ...mapState({
      divisions: (state) => state.Division.divisions,
      allowanceProgrames: (state) => state.Allowance.allowanceProgrames,
    }),
    headers() {
      return [
        {
          text: this.$t("container.emergency_payment.slNo"),
          value: "id",
          width: "20px",
        },
        {
          text: this.$t(
            "container.beneficiary_management.beneficiary_list.beneficiary_id"
          ),
          value: "beneficiary_id",
          width: "80px",
        },
        {
          text: this.$t(
            "container.beneficiary_management.beneficiary_list.beneficiary_name"
          ),
          value: "name",
          width: "180px",
        },
        {
          text: this.$t(
            "container.beneficiary_management.beneficiary_list.beneficiary_father_name"
          ),
          value: "father_name",
          width: "180px",
        },

        {
          text: this.$t(
            "container.beneficiary_management.beneficiary_list.beneficiary_mother_name"
          ),
          value: "mother_name",
          width: "180px",
        },
        {
          text: this.$t("container.system_config.demo_graphic.union.union"),
          value: "union",
          width: "80px",
        },
        {
          text: this.$t("container.system_config.demo_graphic.ward.ward"),
          value: "ward",
          width: "100px",
        },
        {
          text: this.$t("container.emergency_payment.program_name"),
          value: this.language === "bn" ? "program.name_bn" : "program.name_en",
          class: "highlight-column",
          width: "200px",
        },
        {
          text: this.$t("container.payroll_management.bank_name"),
          value: "bank_name",
          width: "70px",
        },
        {
          text: this.$t("container.training_management.trainer_info.mobile"),
          value: "mobile",
          width: "120px",
        },
        {
          text: this.$t("container.list.status"),
          value: "status",
          width: "80px",
        },

        {
          text: this.$t("container.list.action"),
          value: "actions",
          sortable: false,
          width: "80px",
        },
      ];
    },
    modalHeaders() {
      return [
        {
          text: this.$t("container.emergency_payment.slNo"),
          value: "id",
          width: "20px",
        },
        {
          text: this.$t(
            "container.beneficiary_management.beneficiary_list.beneficiary_id"
          ),
          value: "beneficiary_id",
          width: "80px",
        },
        {
          text: this.$t(
            "container.beneficiary_management.beneficiary_list.beneficiary_name"
          ),
          value: "name",
          width: "180px",
        },
        {
          text: this.$t(
            "container.beneficiary_management.beneficiary_list.beneficiary_father_name"
          ),
          value: "father_name",
          width: "180px",
        },

        {
          text: this.$t(
            "container.beneficiary_management.beneficiary_list.beneficiary_mother_name"
          ),
          value: "mother_name",
          width: "180px",
        },
        {
          text: this.$t("container.system_config.demo_graphic.union.union"),
          value: "union",
          width: "80px",
        },
        {
          text: this.$t("container.system_config.demo_graphic.ward.ward"),
          value: "ward",
          width: "80px",
        },
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

        { text: "Selected", value: "glutenfree", width: "80px" },
      ];
    },
    language: {
      get() {
        return this.$store.getters.getAppLanguage;
      },
    },
  },
  created() {},
  beforeMount() {
    this.updateHeaderTitle();
  },
  mounted() {
    this.getListData();
    this.getLocationType();
    this.GetAllDivisions();
    this.GetAllAllownceProgram();
    this.getPaymentName();
  },
  methods: {
    getLocationType() {
      this.$store
        .dispatch("getLookupByType", 1)
        .then((res) => (this.locationType = res));
    },
    createDialog() {
      this.dialog = true;
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
    addToList() {
      this.openDialog = false;
    },
    editData(item) {
      this.$router.push({
        path: `/emergency-payment/emergency-allotment/edit/${item.id}`,
      });
    },
    getListData() {
      this.loading = true;
      const queryParams = {
        searchText: this.search,
        perPage: this.pagination.perPage,
        page: this.pagination.current,
        sortBy: this.sortBy,
        sortDesc: this.sortDesc,
        sortDesc: this.sortDesc,
        emergency_payment_name: this.data.emergency_payment_name,
        started_period: this.data.starting_period,
        closing_period: this.data.closing_period,
      };

      this.$axios
        .get("/admin/emergency/allotments", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "application/json",
          },
          params: queryParams,
        })
        .then((result) => {
          console.log(result.data.data);
          this.total = result?.data?.meta?.total;
          this.emergencyAllotments = result.data.data;
          this.pagination.current = result.data.meta.current_page;
          this.pagination.total = result.data.meta.last_page;
          this.pagination.grand_total = result.data.meta.total;
          this.loading = false;
        });
    },
    getPaymentName() {
      var queryData = {
        table_name: "emergency_allotments",
        field_name: ["id", "emergency_payment_name"],
        condition: { status: 1, deleted_at: null },
      };
      ApiService.getDropData("global/common-dropdown", queryData)
        .then((res) => {
          console.log(res);
          this.payment_names = res.data;
        })
        .catch((error) => console.log(error));
    },
    deleteData(item) {
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
              "admin/emergency/allotments/" + item.id
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
    submit() {
      alert("Submitting");
    },
    updateHeaderTitle() {
      const title = this.$t(
        "container.emergency_payment.emergency_beneficary.list"
      );
      this.$store.commit("setHeaderTitle", title);
    },
    ...mapActions({
      GetAllDivisions: "Division/GetAllDivisions",
      GetAllAllownceProgram: "Allowance/GetAllAllownceProgram",
    }),
  },
  watch: {
    "$i18n.locale": "updateHeaderTitle",
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
.button-color-linear-gradient {
  background: rgb(2, 0, 36);
  background: linear-gradient(
    90deg,
    rgb(28, 59, 104) 0%,
    rgba(9, 9, 121, 1) 35%
  );

  /* background: rgb(49, 232, 232);
  background: linear-gradient(
    90deg,
    rgba(49, 232, 232, 1) 0%,
    rgba(41, 110, 110, 1) 0%,
    rgba(16, 30, 61, 1) 64%
  ); */
}
</style>
