<template>
  <v-container fluid>
    <v-card outlined justify="center" class="ma-0 pa-0">
      <v-card-title class="component-title">
        <div class="clearfix">
          <div class="title-left">
            <h4 class="title-text">
              {{
                !isEdit
                  ? $t("container.emergency_payment.add_new")
                  : $t("container.emergency_payment.edit")
              }}
            </h4>
          </div>
        </div>
      </v-card-title>
      <v-card-text>
        <v-col cols="12" lg="12" md="6">
          <ValidationObserver ref="form">
            <v-form @submit.prevent="createEmergencyAllotment()">
              <v-container class="px-0 py-0">
                <v-row>
                  <v-col lg="6" md="6" cols="12">
                    <ValidationProvider
                      name="Emergency Payment Name"
                      vid="payment_name"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        :hide-details="errors[0] ? false : true"
                        outlined
                        type="text"
                        v-model="data.payment_name"
                        :label="$t('container.emergency_payment.payment_name')"
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="
                          errors[0]
                            ? language === 'bn'
                              ? 'অনুগ্রহ করে জরুরি অর্থপ্রদানের নাম লিখুন'
                              : 'Please enter the emergency payment name'
                            : ''
                        "
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="6" md="6" cols="12">
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
                  <v-col lg="6" md="6" cols="12">
                    <v-menu
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
                          v-model="data.starting_period"
                          :label="
                            $t('container.emergency_payment.starting_period')
                          "
                          append-icon="mdi-calendar"
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
                  </v-col>
                  <v-col lg="6" md="6" cols="12">
                    <v-menu
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
                          v-model="data.closing_period"
                          :label="
                            $t('container.emergency_payment.closing_period')
                          "
                          append-icon="mdi-calendar"
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
                  </v-col>
                  <v-col lg="6" md="6" cols="12">
                    <ValidationProvider
                      name="Per person amount"
                      vid="per_person_amount"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        :hide-details="errors[0] ? false : true"
                        outlined
                        type="number"
                        v-model="data.per_person_amount"
                        :label="
                          $t('container.emergency_payment.per_person_amount')
                        "
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="
                          errors[0]
                            ? language === 'bn'
                              ? 'অনুগ্রহ করে প্রতি ব্যক্তি পরিমাণ লিখুন'
                              : 'Please enter per person amount'
                            : ''
                        "
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="6" md="6" cols="12">
                    <ValidationProvider
                      name="Payment Cycle"
                      vid="payment_cycle"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-autocomplete
                        :hide-details="errors[0] ? false : true"
                        v-model="data.payment_cycle"
                        outlined
                        :label="$t('container.emergency_payment.payment_cycle')"
                        :items="payment_cycles"
                        item-text="name"
                        item-value="name"
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="
                          errors[0]
                            ? language === 'bn'
                              ? 'অনুগ্রহ করে পেমেন্ট সাইকেল নির্বাচন করুন'
                              : 'Please select the payment cycle'
                            : ''
                        "
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <!-- location panel -->
                  <v-col lg="6" md="6" cols="12">
                    <ValidationProvider
                      name="Division"
                      vid="division"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-autocomplete
                        :hide-details="errors[0] ? false : true"
                        @input="onChangeDivision($event)"
                        v-model="data.division_id"
                        outlined
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
                  <v-col lg="6" md="6" cols="12">
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
                        @input="onChangeDistrict($event)"
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
                  <v-col cols="12" lg="12" md="6">
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
                  <v-col v-if="data.location_type == 2" lg="6" md="6" cols="12">
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
                        @change="onChangeUpazila($event)"
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
                  <v-col v-if="data.location_type == 2" lg="6" md="6" cols="12">
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
                  <v-col v-if="data.location_type == 3" lg="6" md="6" cols="12">
                    <ValidationProvider
                      name="city corporation"
                      vid="city_id"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-autocomplete
                        :hide-details="errors[0] ? false : true"
                        v-model="data.city_id"
                        @change="onChangeCity($event)"
                        outlined
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
                  <v-col v-if="data.location_type == 3" lg="6" md="6" cols="12">
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
                  <v-col v-if="data.location_type == 1" lg="6" md="6" cols="12">
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
                      name="No of new Beneficiary"
                      vid="no_of_new_benificiary"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        :hide-details="errors[0] ? false : true"
                        outlined
                        type="number"
                        v-model="data.no_of_new_benificiary"
                        :label="
                          $t(
                            'container.emergency_payment.no_of_new_benificiary'
                          )
                        "
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="
                          errors[0]
                            ? language === 'bn'
                              ? 'অনুগ্রহ করে নতুন সুবিধাভোগীর সংখ্যা লিখুন৷'
                              : 'Please enter the no of new beneficiary'
                            : ''
                        "
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="6" md="6" cols="12">
                    <ValidationProvider
                      name="No of existing beneficiary"
                      vid="no_of_existing_benificiary"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        outlined
                        type="number"
                        :hide-details="errors[0] ? false : true"
                        v-model="data.no_of_existing_benificiary"
                        :label="
                          $t(
                            'container.emergency_payment.no_of_existing_benificiary'
                          )
                        "
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="
                          errors[0]
                            ? language === 'bn'
                              ? 'অনুগ্রহ করে বিদ্যমান সুবিধাভোগীর সংখ্যা লিখুন'
                              : 'Please enter the no of existing beneficiary'
                            : ''
                        "
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>

                  <!-- Button Part -->
                  <v-col cols="12" class="text-right">
                    <v-btn
                      color="primary"
                      class="custom-btn mr-2"
                      router
                      to="/emergency-payment/emergency-allotment"
                      >{{ $t("container.list.back") }}
                    </v-btn>

                    <v-btn
                      color="success"
                      type="submit"
                      class="custom-btn mr-2"
                      :loading="loading"
                      >{{ $t("container.list.submit") }}
                    </v-btn>
                    <!-- :disabled="invalid" -->
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
import { mapState, mapActions } from "vuex";
import { extend, ValidationProvider, ValidationObserver } from "vee-validate";
import { required } from "vee-validate/dist/rules";

extend("required", required);
export default {
  name: "Index",
  title: "CTM - Emergency Allotment",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      data: {
        id: null,
        program_id: null,
        payment_name: null,
        division_id: null,
        district_id: null,
        location_type: null,
        thana_id: null,
        union_id: null,
        city_id: null,
        city_thana_id: null,
        district_pouro_id: null,
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
      city_thanas: [],
      unions: [],
      locationType: [],
      delete_loading: false,
      loading: false,
      search: "",
      wards: [],
      pagination: {
        current: 1,
        total: 0,
        perPage: 5,
      },
      items: [5, 10, 15, 20, 40, 50, 100],
      isEdit: false,
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
  watch: {
    "$i18n.locale": "updateHeaderTitle",
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
    getLocationType() {
      this.$store
        .dispatch("getLookupByType", 1)
        .then((res) => (this.locationType = res));
    },
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
        this.$axios
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
                  ? "ডেটা সফলভাবে জমা দেওয়া হয়েছে"
                  : "Data inserted successfully"
              );
              this.resetData();
              this.$router.push("/emergency-payment/emergency-allotment");
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
    async onChangeThana(event) {
      await this.$axios
        .get(`/admin/union/get/${event}`, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          this.unions = result.data.data;
        });
    },
    async onChangeCity(event) {
      await this.$axios
        .get(`/admin/thana/get/city/${this.data.city_id}`, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          this.city_thanas = result.data.data;
        });
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
};
</script>
<style scoped></style>
