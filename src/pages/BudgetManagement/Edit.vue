<template>
  <div id="create_manage_allotment">
    <v-row class="mx-5 mt-5">
      <v-col cols="12">
        <ValidationObserver ref="form" v-slot="{ invalid }">
          <v-form v-on:submit.prevent="updateBudget">
            <v-row wrap>
              <v-col cols="12">
                <v-card>
                  <v-row>
                    <v-col col="6">
                      <v-card-title>
                        <h3>
                          {{ $t("container.budget_management.budget_edit") }}
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
                              <!-- <v-text-field
                                  value="1234"
                                  outlined
                                  disabled
                                  label="Budget ID"
                                >
                                </v-text-field> -->

                              <ValidationProvider name="ProgramName" vid="program_id" rules="required"
                                v-slot="{ errors }">
                                <v-autocomplete outlined clearable :items="allowances" item-text="name_en"
                                  item-value="id" v-model="data.program_id" :label="$t(
                                    'container.application_selection.application.program'
                                  )
                                    " required :error="errors[0] ? true : false"
                                  :error-messages="errors[0]"></v-autocomplete>
                              </ValidationProvider>


                              <ValidationProvider name="previousYear" vid="previous_year" rules="required"
                                v-slot="{ errors }">

                                <v-text-field type="Number" outlined v-model="data.no_of_previous_year"
                                  label="Number of Previous Year" required :error="errors[0] ? true : false"
                                  :error-messages="errors[0]">
                                </v-text-field>

                              </ValidationProvider>

                              <ValidationProvider name="calculationValue" vid="calculation_value" rules="required"
                                v-slot="{ errors }">
                                <v-text-field type="Number" v-model="data.calculation_value" outlined label="Value"
                                  required :error="errors[0] ? true : false" :error-messages="errors[0]">
                                </v-text-field>

                              </ValidationProvider>
                            </v-col>

                            <v-col cols="12" sm="6" lg="6">
                              <ValidationProvider name="financialYear" vid="financial_year" rules="required"
                                v-slot="{ errors }">
                                <v-text-field v-model="active_year.financial_year" disabled outlined>
                                </v-text-field>
                              </ValidationProvider>

                              <ValidationProvider name="calculationType" vid="calculation_type" rules="required"
                                v-slot="{ errors }">
                                <v-select :items="calculationType" item-text="value_en" item-value="id"
                                  label="Calculation Type" v-model="data.calculation_type" outlined required
                                  :error="errors[0] ? true : false" :error-messages="errors[0]">
                                </v-select>
                              </ValidationProvider>

                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-card-text>
                  <v-col cols="12">
                    <v-row class="justify-end mb-5">
                      <v-btn flat color="primary" class="custom-btn mr-2" router to="/budget">Back
                      </v-btn>

                      <v-btn flat color="success" type="submit" class="custom-btn mr-2" :disabled="invalid">Update
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
        program_id: null,
        financial_year_id: null,
        calculation_type: null,
        no_of_previous_year: null,
        calculation_value: null,
        remarks: null
      },
      district: [],
      allowances: [],
      financial_years: [],
      active_year: '',
      calculationType: [],
    };
  },

  computed: {
    ...mapState({
      // allowances: (state) => state.ManageAllotment.allowances,
      // allowanceAmounts: (state) => state.ManageAllotment.allowanceAmounts,
      // educationGenders: (state) => state.ManageAllotment.educationGender,
      // isDisable: (state) => state.ManageAllotment.is_disable_class,
      // genders: (state) => state.Allowance.genders,
      // genderTypes: (state) => state.Allowance.genderTypes,
      // districts: (state) => state.ManageAllotment.districts,
      // locations: (state) => state.ManageAllotment.locations,
      // financial: (state) => state.ManageAllotment.financial_years,
    }),
  },

  mounted() {
    //this.getAllAllowanceProgram();
    // this.GerAllLookUpGender();
    // this.GerAllLookUpGenderType();
    // this.getAllDistrict();
    // this.getAllFinancialYear();
    this.GetAllowance();
    this.GetFinancial_Year();
    this.$store
      .dispatch("getLookupByType", 23)
      .then((res) => (this.calculationType = res));
  },
  beforeMount() {
    this.GetBudgetById();
  },

  methods: {
    ...mapActions({
      // getAllAllowanceProgram: "ManageAllotment/getAllAllowanceProgram",
      // GerAllLookUpGender: "Allowance/GerAllLookUpGender",
      // GerAllLookUpGenderType: "Allowance/GerAllLookUpGenderType",
      // getAllDistrict: "ManageAllotment/getAllDistrict",
      // getAllFinancialYear: "ManageAllotment/getAllFinancialYear",

      GetAllowance() {
        this.$axios
          .get("/global/program", {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data"
            }
          })
          .then(result => {
            this.allowances = result.data.data;
          });
      },
      GetFinancial_Year() {
        this.$axios
          .get("/admin/financial-year/get", {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data"
            }
          })
          .then(result => {
            this.financial_years = result.data.data;
            this.active_year = this.financial_years.find((item) => item.status === 1)
            console.log('active_year', this.active_year)
          });
      },
      async GetBudgetById() {
        console.log(this.$route.params.id, "GetCommitteeById");
        try {
          this.$store
            .dispatch(
              "BudgetManagement/GetSingleBudget",
              this.$route.params.id
            )
            .then((res) => {
              console.log(res.data.data, "GetBudgetById");

              let item = res.data.data

              this.data.calculation_value = item.calculation_value;
              this.data.no_of_previous_year = item.no_of_previous_year
              this.data.program_id = item.program.id
              this.data.calculation_type = item.calculation_type.id

            });
        } catch (e) {
          console.log(e);
        }
      },
    }),

    getAmount(event) {
      this.$store.dispatch("ManageAllotment/getAllowanceProgramAmount", event);
    },

    getOffice(event) {
      this.$store.dispatch("ManageAllotment/getAllOfficeLocation", event);
    },

    updateBudget() {
      let fd = new FormData();
      fd.append("program_id", this.data.program_id);
      fd.append("financial_year_id", this.active_year.id);
      fd.append("calculation_type", this.data.calculation_type);
      fd.append("no_of_previous_year", this.data.no_of_previous_year);
      fd.append("calculation_value", this.data.calculation_value);
      fd.append("remarks", this.data.remarks);

      try {
        const data = { formData: fd, id: this.$route.params.id };
        this.$store
          .dispatch("BudgetManagement/UpdateBudget", data)
          .then((res) => {
            console.log(res, "submit");
            if (res.data?.success) {
              this.$router.push({ name: "budget" });
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
