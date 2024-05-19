<template>
  <div id="create_manage_allotment">
    <v-row class="mx-5 mt-5">
      <v-col cols="12">
        <ValidationObserver ref="form" v-slot="{ invalid }">
          <v-form v-on:submit.prevent="updateAllotment">
            <v-row wrap>
              <v-col cols="12">
                <v-card>
                  <v-row>
                    <v-col col="6">
                      <v-card-title>
                        <h3>
                          {{ $t("container.manage_allotment.allotment_edit") }}
                        </h3>
                      </v-card-title>
                    </v-col>
                  </v-row>

                  <v-divider></v-divider>

                  <v-card-text>
                    <v-col cols="12" class="d-flex">
                      <v-row wrap>
                        <v-col cols="12" class="d-flex">
                          <v-row wrap>
                            <v-col cols="12" sm="6" lg="6">

                              <v-text-field outlined v-model="allotment.program.name_en" disabled="" :label="$t(
                                'container.application_selection.application.program'
                              )
                                "></v-text-field>

                              <v-text-field v-model="allotment.office_area.name_en" disabled outlined :label="$t(
                                'container.manage_allotment.area_type'
                              )">
                              </v-text-field>

                              <ValidationProvider name="Regular Beneficiaries" vid="regular_beneficiaries"
                                rules="required" v-slot="{ errors }">
                                <v-text-field type="Number" disabled outlined v-model="data.regular_beneficiaries"
                                  :label="$t(
                                    'container.manage_allotment.regular_beneficiaries'
                                  )" required :error="errors[0] ? true : false" :error-messages="errors[0]">
                                </v-text-field>
                              </ValidationProvider>

                              <ValidationProvider name="Total Beneficiaries" vid="total_beneficiaries" rules="required"
                                v-slot="{ errors }">
                                <v-text-field type="Number" disabled outlined v-model="data.total_beneficiaries" :label="$t(
                                  'container.manage_allotment.total_beneficiaries'
                                )" required :error="errors[0] ? true : false" :error-messages="errors[0]">
                                </v-text-field>
                              </ValidationProvider>

                              <ValidationProvider name="Total Amount" vid="total_amount" rules="required"
                                v-slot="{ errors }">
                                <v-text-field type="Number" disabled outlined v-model="data.total_amount" :label="$t(
                                  'container.manage_allotment.total_amount'
                                )" required :error="errors[0] ? true : false" :error-messages="errors[0]">
                                </v-text-field>
                              </ValidationProvider>
                            </v-col>

                            <v-col cols="12" sm="6" lg="6">

                              <v-text-field v-model="allotment.financialYear.financial_year" disabled outlined :label="$t(
                                'container.manage_allotment.financial_year'
                              )">
                              </v-text-field>

                              <v-text-field v-model="allotment.allotment_area.name_en" disabled outlined :label="$t(
                                'container.budget_management.allotment_area'
                              )">
                              </v-text-field>

                              <ValidationProvider name="Additional Beneficiaries" vid="additional_beneficiaries"
                                rules="required" v-slot="{ errors }">

                                <v-text-field type="Number" outlined v-model="data.additional_beneficiaries" :label="$t(
                                  'container.manage_allotment.additional_beneficiaries'
                                )" required :error="errors[0] ? true : false" :error-messages="errors[0]"
                                  @input="onChangeAddBen(($event))">
                                </v-text-field>
                              </ValidationProvider>

                              <ValidationProvider name="Per Beneficiary Amount" vid="per_beneficiary_amount"
                                rules="required" v-slot="{ errors }">
                                <v-text-field type="Number" disabled outlined v-model="data.per_beneficiary_amount"
                                  :label="$t(
                                    'container.budget_management.beneficiary_amount'
                                  )" required :error="errors[0] ? true : false" :error-messages="errors[0]">
                                </v-text-field>
                              </ValidationProvider>
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-card-text>
                  <v-col cols="12">
                    <v-row class="justify-end mb-5">
                      <v-btn flat color="primary" class="custom-btn mr-2" router to="/budget">{{
                        $t("container.list.back") }}
                      </v-btn>

                      <v-btn flat color="success" type="submit" class="custom-btn mr-2" :disabled="invalid"> {{
                        $t("container.list.update") }}
                      </v-btn>
                    </v-row>
                  </v-col>
                </v-card>
              </v-col>

            </v-row>
          </v-form>
        </ValidationObserver>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { extend, ValidationProvider, ValidationObserver } from "vee-validate";
import { mapActions, mapState } from "vuex";

export default {
  name: "Edit",
  title: "CTM - Edit Create ",
  components: {
    ValidationProvider,
    ValidationObserver,
  },

  data() {
    return {
      data: {
        regular_beneficiaries: null,
        additional_beneficiaries: null,
        total_beneficiaries: null,
        total_beneficiaries_2: null,
        per_beneficiary_amount: null,
        total_amount: null,
      },
      district: [],
      allowances: [],
      financial_years: [],
      active_year: '',
      calculationType: [],
      allotment: [],
    };
  },

  computed: {
    ...mapState({
    }),
  },

  beforeMount() {
    this.GetAllotmentById();
  },

  methods: {
    async GetAllotmentById() {
      try {
        this.$axios
          .get(`/admin/allotment/show/${this.$route.params.id}`, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            if (res.data?.success) {
              let item = res.data.data;
              this.allotment = res.data.data;

              this.data.regular_beneficiaries = item.regular_beneficiaries;
              this.data.additional_beneficiaries = item.additional_beneficiaries;
              this.data.total_beneficiaries = item.total_beneficiaries;
              this.data.total_beneficiaries_2 = item.total_beneficiaries;
              this.data.per_beneficiary_amount = item.per_beneficiary_amount;
              this.data.total_amount = item.total_amount;
            } else {
              this.$toast.error("Record not found!");
              this.$router.push({ name: "allotment" });
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
    },

    onChangeAddBen($event) {
      this.data.total_beneficiaries = parseInt(this.data.additional_beneficiaries) + parseInt(this.data.total_beneficiaries_2);
      this.data.total_amount = parseInt(this.data.per_beneficiary_amount) * parseInt(this.data.total_beneficiaries);
    },

    getAmount(event) {
      this.$store.dispatch("ManageAllotment/getAllowanceProgramAmount", event);
    },

    getOffice(event) {
      this.$store.dispatch("ManageAllotment/getAllOfficeLocation", event);
    },

    updateAllotment() {
      let fd = new FormData();
      fd.append("additional_beneficiaries", this.data.additional_beneficiaries);
      fd.append("total_beneficiaries", this.data.total_beneficiaries);
      fd.append("total_amount", this.data.total_amount);

      try {
        const data = { formData: fd, id: this.$route.params.id };
        this.$store
          .dispatch("BudgetManagement/updateAllotment", data)
          .then((res) => {
            console.log(res, "submit");
            if (res.data?.success) {
              this.$router.push({ name: "allotment" });
            } else if (res.response?.data?.errors) {
              this.$refs.form.setErrors(res.response.data.errors);
              this.errors = res.response.data.errors;
            }
          });
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
