<template>
  <v-row justify="center">
    <v-dialog v-model="isExistingDialogVisible" persistent max-width="80%">
      <v-card>
        <v-card-title>
          <span class="text-h5">Search</span>
        </v-card-title>
        <!-- Form -->
        <v-card-text>
          <ValidationObserver ref="form">
            <v-form>
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
                        :label="$t('container.emergency_payment.program_name')"
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
                          $t('container.system_config.demo_graphic.thana.thana')
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
                          $t('container.system_config.demo_graphic.ward.union')
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
                          $t('container.system_config.demo_graphic.ward.city')
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
                          $t('container.system_config.demo_graphic.ward.thana')
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
                          $t('container.system_config.demo_graphic.ward.pouro')
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
                        district_pouro_id
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
                        requireddistrict_pouro_id
                        :error="errors[0] ? true : false"
                        :error-messages="
                          errors[0]
                            ? language === 'bn'
                              ? 'অনুগ্রহ করে স্ট্যাটাস সিলেক্ট করুন'
                              : 'Please select the status'
                            : ''
                        "
                        @change="getBeneficiariesInfo"
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <!-- v-data table -->
                  <v-col cols="12">
                    <v-data-table
                      :loading="loading"
                      item-key="id"
                      :headers="headers"
                      :items="beneficiaries"
                      :items-per-page="pagination.perPage"
                      v-model="selectedBeneficiaries"
                      hide-default-footer
                      class="elevation-0 transparent row-pointer table-responsive"
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
                              cols="12"
                              lg="10"
                              md="10"
                              sm="4"
                              class="d-flex justify-center mb-2 mb-sm-0"
                            >
                              <v-pagination
                                circle
                                primary
                                v-model="pagination.current"
                                :length="pagination.total"
                                @input="onPageChange"
                                :total-visible="11"
                                class="custom-pagination-item"
                              ></v-pagination>
                            </v-col>
                            <v-col cols="12" lg="2" md="2" sm="4" class="">
                              <v-select
                                :items="items"
                                hide-details
                                dense
                                outlined
                                @change="onPageSetup"
                                v-model="pagination.perPage"
                              ></v-select>
                            </v-col>
                          </v-row>
                        </v-container>
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
          <v-btn color="blue darken-1" text @click="closeDialog">
            {{ $t("container.list.close") }}
          </v-btn>
          <v-btn color="blue darken-1" text @click="submitSelection">
            {{ $t("container.list.addToList") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";
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
  name: "ExistingEmergency",
  title: "CTM - Emergency Beneficiary Create",
  components: {
    ValidationProvider,
    ValidationObserver,
    Spinner,
  },
  props: {
    existingDialogVisible: {
      type: Boolean,
      required: true,
    },
  },
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
      payment_names: [],
      total: null,
      pagination: {
        current: 1,
        total: 0,
        perPage: 10,
      },
      items: [5, 10, 15, 20, 40, 50, 100],
      isExistingDialogVisible: false,
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
      selectedBeneficiaries: [],
      beneficiaries: [],
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
  },
  created() {},

  mounted() {
    this.getLocationType();
    this.GetAllDivisions();
    this.GetAllAllownceProgram();
  },
  methods: {
    onPageSetup($event) {
      this.pagination.current = 1;
      this.getBeneficiariesInfo();
    },
    onPageChange($event) {
      this.getBeneficiariesInfo();
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
          console.log(res);
          this.beneficiaries = res.data.data.data;
          this.beneficiaries.forEach((beneficiary) => {
            this.$set(beneficiary, "isSelected", false);
          });
          console.log(this.beneficiaries);
          this.total = res?.data?.total;
          this.pagination.current = res.data.data.current_page;
          this.pagination.total = res.data.data.last_page;
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

    updateSelectedBeneficiaries() {
      this.selectedBeneficiaries = this.beneficiaries.filter(
        (b) => b.isSelected
      );
      console.log({ update: this.selectedBeneficiaries });
    },
    submitSelection() {
      this.updateSelectedBeneficiaries();
      this.$emit("selectedBeneficiaries", this.selectedBeneficiaries);
      console.log({ selected: this.selectedBeneficiaries });
      this.isExistingDialogVisible = false;
    },
    ...mapActions({
      GetAllDivisions: "Division/GetAllDivisions",
      GetAllAllownceProgram: "Allowance/GetAllAllownceProgram",
    }),

    closeDialog() {
      this.isExistingDialogVisible = false;
    },
  },
  watch: {
    "$i18n.locale": "updateHeaderTitle",
    existingDialogVisible(newValue) {
      this.isExistingDialogVisible = newValue;
    },
    isExistingDialogVisible(newValue) {
      this.$emit("update:existingDialogVisible", newValue);
    },
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
