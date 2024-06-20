<template>
  <v-container fluid>
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
                      <v-text-field
                          v-model="data.payment_name"
                          :error="errors[0] ? true : false"
                          :error-messages="
                          errors[0]
                            ? language === 'bn'
                              ? 'অনুগ্রহ করে জরুরি অর্থপ্রদানের নাম লিখুন'
                              : 'Please enter the emergency payment name'
                            : ''
                        "
                          :hide-details="!errors[0]"
                          :label="$t('container.emergency_payment.payment_name')"
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
                      <v-autocomplete
                          v-model="data.program_id"
                          :error="errors[0] ? true : false"
                          :error-messages="
                          errors[0]
                            ? language === 'bn'
                              ? 'অনুগ্রহ করে প্রোগ্রামের নাম নির্বাচন করুন'
                              : 'Please select the program name'
                            : ''
                        "
                          :hide-details="errors[0] ? false : true"
                          :items="allowanceProgrames"
                          :label="$t('container.emergency_payment.program_name')"
                          clearable
                          item-text="name_en"
                          item-value="id"
                          outlined
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
                              :label="
                            $t('container.emergency_payment.starting_period')
                          "
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
                              :label="
                            $t('container.emergency_payment.closing_period')
                          "
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
                      <v-text-field
                          v-model="data.per_person_amount"
                          :error="errors[0] ? true : false"
                          :error-messages="
                          errors[0]
                            ? language === 'bn'
                              ? 'অনুগ্রহ করে প্রতি ব্যক্তি পরিমাণ লিখুন'
                              : 'Please enter per person amount'
                            : ''
                        "
                          :hide-details="errors[0] ? false : true"
                          :label="
                          $t('container.emergency_payment.per_person_amount')
                        "
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
                      <v-autocomplete
                          v-model="data.payment_cycle"
                          :error="errors[0] ? true : false"
                          :error-messages="
                          errors[0]
                            ? language === 'bn'
                              ? 'অনুগ্রহ করে পেমেন্ট সাইকেল নির্বাচন করুন'
                              : 'Please select the payment cycle'
                            : ''
                        "
                          :hide-details="errors[0] ? false : true"
                          :items="payment_cycles"
                          :label="$t('container.emergency_payment.payment_cycle')"
                          clearable
                          item-text="name"
                          item-value="name"
                          outlined
                          required
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <!-- location panel -->
                  <v-col cols="12" lg="6" md="6">
                    <ValidationProvider
                        v-slot="{ errors }"
                        name="Division"
                        rules="required"
                        vid="division"
                    >
                      <v-autocomplete
                          v-model="data.division_id"
                          :error="errors[0] ? true : false"
                          :error-messages="
                          errors[0]
                            ? language === 'bn'
                              ? 'অনুগ্রহ করে বিভাগের নাম নির্বাচন করুন'
                              : 'Please select the division name'
                            : ''
                        "
                          :hide-details="errors[0] ? false : true"
                          :items="divisions"
                          :label="
                          $t(
                            'container.system_config.demo_graphic.division.division'
                          )
                        "
                          clearable
                          item-text="name_en"
                          item-value="id"
                          outlined
                          required
                          @input="onChangeDivision($event)"
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <v-col cols="12" lg="6" md="6">
                    <ValidationProvider
                        v-slot="{ errors }"
                        name="District"
                        rules="required"
                        vid="district"
                    >
                      <v-autocomplete
                          v-model="data.district_id"
                          :error="errors[0] ? true : false"
                          :error-messages="
                          errors[0]
                            ? language === 'bn'
                              ? 'অনুগ্রহ করে জেলার নাম নির্বাচন করুন'
                              : 'Please select the district name'
                            : ''
                        "
                          :hide-details="errors[0] ? false : true"
                          :items="districts"
                          :label="
                          $t(
                            'container.system_config.demo_graphic.district.district'
                          )
                        "
                          clearable
                          item-text="name_en"
                          item-value="id"
                          outlined
                          required
                          @input="onChangeDistrict($event)"
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <v-col cols="12" lg="6" md="6">
                    <ValidationProvider
                        v-slot="{ errors }"
                        name="Location Type"
                        rules="required"
                        vid="location_type"
                    >
                      <v-autocomplete
                          v-model="data.location_type"
                          :error="errors[0] ? true : false"
                          :error-messages="
                          errors[0]
                            ? language === 'bn'
                              ? 'অবস্থানের ধরন নির্বাচন করুন'
                              : 'Please select the location type'
                            : ''
                        "
                          :hide-details="errors[0] ? false : true"
                          :items="locationType"
                          :label="$t('container.list.location_type')"
                          clearable
                          item-text="value_en"
                          item-value="id"
                          outlined
                          required
                          @input="LocationType($event)"
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <v-col v-if="data.location_type == 2" cols="12" lg="6" md="6">
                    <ValidationProvider
                        v-slot="{ errors }"
                        name="Upazila"
                        rules="required"
                        vid="thana_id"
                    >
                      <v-autocomplete
                          v-model="data.thana_id"
                          :error="errors[0] ? true : false"
                          :error-messages="
                          errors[0]
                            ? language === 'bn'
                              ? 'অনুগ্রহ করে উপজেলার নাম নির্বাচন করুন'
                              : 'Please select the upazila name'
                            : ''
                        "
                          :hide-details="errors[0] ? false : true"
                          :items="thanas"
                          :label="
                          $t('container.system_config.demo_graphic.thana.thana')
                        "
                          clearable
                          item-text="name_en"
                          item-value="id"
                          outlined
                          required
                          @change="onChangeUpazila($event)"
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <v-col v-if="data.location_type == 2" cols="12" lg="6" md="6">
                    <ValidationProvider
                        v-slot="{ errors }"
                        name="union"
                        rules="required"
                        vid="union_id"
                    >
                      <v-autocomplete
                          v-model="data.union_id"
                          :error="errors[0] ? true : false"
                          :error-messages="
                          errors[0]
                            ? language === 'bn'
                              ? 'অনুগ্রহ করে ইউনিয়নের নাম নির্বাচন করুন'
                              : 'Please select the union name'
                            : ''
                        "
                          :hide-details="errors[0] ? false : true"
                          :items="unions"
                          :label="
                          $t('container.system_config.demo_graphic.ward.union')
                        "
                          clearable
                          item-text="name_en"
                          item-value="id"
                          outlined
                          required
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <v-col v-if="data.location_type == 3" cols="12" lg="6" md="6">
                    <ValidationProvider
                        v-slot="{ errors }"
                        name="city corporation"
                        rules="required"
                        vid="city_id"
                    >
                      <v-autocomplete
                          v-model="data.city_id"
                          :error="errors[0] ? true : false"
                          :error-messages="
                          errors[0]
                            ? language === 'bn'
                              ? 'অনুগ্রহ করে সিটি কর্পোরেশনের নাম নির্বাচন করুন'
                              : 'Please select the city corporation Name'
                            : ''
                        "
                          :hide-details="errors[0] ? false : true"
                          :items="cities"
                          :label="
                          $t('container.system_config.demo_graphic.ward.city')
                        "
                          clearable
                          item-text="name_en"
                          item-value="id"
                          outlined
                          required
                          @change="onChangeCity($event)"
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <v-col v-if="data.location_type == 3" cols="12" lg="6" md="6">
                    <ValidationProvider
                        v-slot="{ errors }"
                        name="thana"
                        rules="required"
                        vid="city_thana_id"
                    >
                      <v-autocomplete
                          v-model="data.city_thana_id"
                          :error="errors[0] ? true : false"
                          :error-messages="
                          errors[0]
                            ? language === 'bn'
                              ? 'অনুগ্রহ করে থানার নাম নির্বাচন করুন'
                              : 'Please select the thana Name'
                            : ''
                        "
                          :hide-details="errors[0] ? false : true"
                          :items="city_thanas"
                          :label="
                          $t('container.system_config.demo_graphic.ward.thana')
                        "
                          clearable
                          item-text="name_en"
                          item-value="id"
                          outlined
                          required
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <v-col v-if="data.location_type == 1" cols="12" lg="6" md="6">
                    <ValidationProvider
                        v-slot="{ errors }"
                        name="District Pourashava"
                        rules="required"
                        vid="district_pouro_id"
                    >
                      <v-autocomplete
                          v-model="data.district_pouro_id"
                          :error="errors[0] ? true : false"
                          :error-messages="
                          errors[0]
                            ? language === 'bn'
                              ? 'অনুগ্রহ করে জেলার পৌরশব নাম নির্বাচন করুন'
                              : 'Please select the district Paurashava Name'
                            : ''
                        "
                          :hide-details="errors[0] ? false : true"
                          :items="district_poros"
                          :label="
                          $t('container.system_config.demo_graphic.ward.pouro')
                        "
                          clearable
                          item-text="name_en"
                          item-value="id"
                          outlined
                          required
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>

                  <v-col cols="12" lg="6" md="6">
                    <ValidationProvider
                        v-slot="{ errors }"
                        name="No of new Beneficiary"
                        rules="required"
                        vid="no_of_new_benificiary"
                    >
                      <v-text-field
                          v-model="data.no_of_new_benificiary"
                          :error="errors[0] ? true : false"
                          :error-messages="
                          errors[0]
                            ? language === 'bn'
                              ? 'অনুগ্রহ করে নতুন সুবিধাভোগীর সংখ্যা লিখুন৷'
                              : 'Please enter the no of new beneficiary'
                            : ''
                        "
                          :hide-details="errors[0] ? false : true"
                          :label="
                          $t(
                            'container.emergency_payment.no_of_new_benificiary'
                          )
                        "
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
                      <v-text-field
                          v-model="data.no_of_existing_benificiary"
                          :error="errors[0] ? true : false"
                          :error-messages="
                          errors[0]
                            ? language === 'bn'
                              ? 'অনুগ্রহ করে বিদ্যমান সুবিধাভোগীর সংখ্যা লিখুন'
                              : 'Please enter the no of existing beneficiary'
                            : ''
                        "
                          :hide-details="errors[0] ? false : true"
                          :label="
                          $t(
                            'container.emergency_payment.no_of_existing_benificiary'
                          )
                        "
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
import {mapActions, mapState} from "vuex";
import {extend, ValidationObserver, ValidationProvider} from "vee-validate";
import {required} from "vee-validate/dist/rules";

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
<style scoped>
.component-title {
  background-color: #1C3B68;
  color: white;
}
</style>
