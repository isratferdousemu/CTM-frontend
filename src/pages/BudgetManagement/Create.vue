<template>
  <div id="create_manage_allotment">
    <v-row class="mx-5 mt-5">
      <v-col cols="12">
        <ValidationObserver ref="form" v-slot="{ invalid }">
          <v-form v-on:submit.prevent="addBudget">
            <v-row wrap>
              <v-col cols="12">
                <v-card>
                  <v-row>
                    <v-col col="6">
                      <v-card-title
                        ><h3>
                          {{ $t("container.budget_management.budget_create") }}
                        </h3></v-card-title
                      >
                    </v-col>
                  </v-row>

                  <v-divider></v-divider>

                  <v-card-text>
                    <v-col cols="12" class="d-flex">
                      <v-row wrap>
                        <v-col cols="12" class="d-flex">
                          <v-row wrap>
                            <v-col cols="12" sm="6" lg="6">
                              <v-text-field
                                value="1234"
                                outlined
                                disabled
                                label="Budget ID"
                              >
                              </v-text-field>

                              <v-select
                                :items="allowances"
                                item-text="name_en"
                                item-value="id"
                                label="Select Allowance Program"
                                outlined
                                @change="getAmount($event)"
                              >
                              </v-select>

                              <v-text-field
                                value="1234"
                                outlined
                                disabled
                                label="Number of Previous Year"
                              >
                              </v-text-field>
                            </v-col>

                            <v-col cols="12" sm="6" lg="6">
                              <v-select
                                :items="financial"
                                item-text="financial_year"
                                item-value="id"
                                label="Select Financial Year"
                                outlined
                              >
                              </v-select>

                              <v-select
                                :items="districts"
                                item-text="name_en"
                                item-value="id"
                                label="Calculation Type"
                                outlined
                                @change="getOffice($event)"
                              >
                              </v-select>

                              <v-text-field
                                value="1234"
                                outlined
                                disabled
                                label="Value"
                              >
                              </v-text-field>
                            </v-col>

                            <!-- <v-col cols="12" sm="6" lg="6">
                              <v-card elevation="2" shaped outlined>
                                <v-card-title class="justify-center"
                                  >Program</v-card-title
                                >
                                <hr
                                  style="
                                    width: 50%;
                                    margin-left: 25% !important;
                                    margin-right: 25% !important;
                                  "
                                />
                                <v-card-text>
                                  <h4>
                                    Amount of Monthly Allowance per Beneficiary
                                  </h4>

                                  <div v-show="isDisable === 0">
                                    <div
                                      v-show="allowanceAmounts.length > 0"
                                      v-for="(
                                        amount, index
                                      ) in allowanceAmounts"
                                      :key="index"
                                    >
                                      <div v-for="g in genders" :key="g.id">
                                        <h5 v-if="amount.gender_id === g.id">
                                          {{ g.value_en }} : {{ amount.amount }}
                                        </h5>
                                      </div>
                                    </div>
                                  </div>

                                  <div v-show="isDisable === 1">
                                    <div
                                      v-show="allowanceAmounts.length > 0"
                                      v-for="(
                                        amount, index
                                      ) in allowanceAmounts"
                                      :key="index"
                                    >
                                      <div v-for="gt in genderTypes" :key="gt.id">
                                        <h5 v-if="amount.type_id === gt.id">
                                          {{ gt.value_en }} :
                                          {{ amount.amount }}
                                        </h5>
                                      </div>
                                    </div>
                                  </div>

                                  <h4>Distribution Medium</h4>
                                  <h4>Bank Account</h4>
                                </v-card-text>
                              </v-card>
                            </v-col> -->
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col cols="12">
                <v-card style="margin-bottom: 50px">
                  <v-row>
                    <v-col col="6">
                      <v-card-title><h3>Budget</h3></v-card-title>
                    </v-col>
                  </v-row>

                  <v-divider></v-divider>

                  <v-card-text>
                    <v-col cols="12" class="d-flex">
                      <v-row wrap>
                        <v-col cols="12" lg="12">
                          <table class="custom-table">
                            <thead>
                              <tr>
                                <th class="text-left">#Sl</th>
                                <th class="text-left">Office</th>
                                <th class="text-left">Location</th>
                                <th class="text-left">Beneficiary Regular</th>
                                <th class="text-center">
                                  Beneficiary Additional
                                </th>
                                <th class="text-left">Total Beneficiary</th>
                                <th class="text-left">
                                  Amount of Allocated Money
                                </th>
                              </tr>
                            </thead>

                            <tbody>
                              <tr>
                                <td @click="callback">+</td>
                                <td style="width: 20%">ALL</td>
                                <td style="width: 10%">test</td>
                                <td>200</td>
                                <td style="width: 40%">abc</td>
                                <td>700</td>
                                <td style="width: 10%">34567</td>
                              </tr>
                            </tbody>
                            <tbody
                              v-for="(member, index) in data.division"
                              :key="index"
                            >
                              <tr>
                                <td @click="callback2">+</td>

                                <td style="width: 20%">Division</td>
                                <td style="width: 10%">test</td>
                                <td>200</td>
                                <td style="width: 40%">
                                  <v-col cols="12" class="d-flex">
                                    <v-col v-if="isDisable === 1">
                                      <v-row>
                                        <v-col
                                          sm="4"
                                          v-for="(
                                            eg, index
                                          ) in educationGenders"
                                          :key="index"
                                        >
                                          <div v-for="g in genders" :key="g.id">
                                            <v-text-field
                                              v-show="eg.gender_id === g.id"
                                              :label="g.value_en"
                                              outlined
                                              dense
                                            ></v-text-field>
                                          </div>
                                        </v-col>
                                      </v-row>
                                    </v-col>

                                    <v-col v-if="isDisable === 0">
                                      <v-row>
                                        <v-col
                                          sm="4"
                                          v-for="(
                                            aa, index
                                          ) in allowanceAmounts"
                                          :key="index"
                                        >
                                          <div v-for="g in genders" :key="g.id">
                                            <v-text-field
                                              v-if="aa.gender_id === g.id"
                                              :label="g.value_en"
                                              outlined
                                              dense
                                            ></v-text-field>
                                          </div>
                                        </v-col>
                                      </v-row>
                                    </v-col>
                                  </v-col>
                                </td>
                                <td>700</td>
                                <td style="width: 10%">34567</td>
                              </tr>
                            </tbody>

                            <tbody
                              v-for="(member, index) in data.district"
                              :key="index"
                            >
                              <tr>
                                <td>+</td>

                                <td style="width: 20%">District</td>
                                <td style="width: 10%">test</td>
                                <td>200</td>
                                <td style="width: 40%">
                                  <v-col cols="12" class="d-flex">
                                    <v-col v-if="isDisable === 1">
                                      <v-row>
                                        <v-col
                                          sm="4"
                                          v-for="(
                                            eg, index
                                          ) in educationGenders"
                                          :key="index"
                                        >
                                          <div v-for="g in genders" :key="g.id">
                                            <v-text-field
                                              v-show="eg.gender_id === g.id"
                                              :label="g.value_en"
                                              outlined
                                              dense
                                            ></v-text-field>
                                          </div>
                                        </v-col>
                                      </v-row>
                                    </v-col>

                                    <v-col v-if="isDisable === 0">
                                      <v-row>
                                        <v-col
                                          sm="4"
                                          v-for="(
                                            aa, index
                                          ) in allowanceAmounts"
                                          :key="index"
                                        >
                                          <div v-for="g in genders" :key="g.id">
                                            <v-text-field
                                              v-if="aa.gender_id === g.id"
                                              :label="g.value_en"
                                              outlined
                                              dense
                                            ></v-text-field>
                                          </div>
                                        </v-col>
                                      </v-row>
                                    </v-col>
                                  </v-col>
                                </td>
                                <td>700</td>
                                <td style="width: 10%">34567</td>
                              </tr>
                            </tbody>
                          </table>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col cols="12">
                <v-row class="justify-end mb-5" style="margin-top: -50px">
                  <v-btn
                    flat
                    color="primary"
                    class="custom-btn mr-2"
                    router
                    to="/allotment"
                    >Back
                  </v-btn>

                  <v-btn
                    flat
                    color="success"
                    type="submit"
                    class="custom-btn mr-2"
                    :disabled="invalid"
                    >Submit
                  </v-btn>
                </v-row>
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
import office from "@/store/modules/system_configuration/office";

export default {
  name: "Create",
  title: "CTM - Budget Create ",
  components: {
    ValidationProvider,
    ValidationObserver,
  },

  data() {
    return {
      add_allotment: {
        program_id: "",
        location_id: "",
        financial_year_id: "",
        allotment_details: [],
        allotment_extra: [],
      },
      data: {
        division: [
        //   {
        //     member_name: null,
        //     designation: null,
        //     address: null,
        //     email: null,

        //     phone: null,
        //   },
        ],
        district:[],
      },
    };
  },

  computed: {
    ...mapState({
      allowances: (state) => state.ManageAllotment.allowances,
      allowanceAmounts: (state) => state.ManageAllotment.allowanceAmounts,
      educationGenders: (state) => state.ManageAllotment.educationGender,
      isDisable: (state) => state.ManageAllotment.is_disable_class,
      genders: (state) => state.Allowance.genders,
      genderTypes: (state) => state.Allowance.genderTypes,
      districts: (state) => state.ManageAllotment.districts,
      locations: (state) => state.ManageAllotment.locations,
      financial: (state) => state.ManageAllotment.financial_years,
    }),
  },

  mounted() {
    this.getAllAllowanceProgram();
    this.GerAllLookUpGender();
    this.GerAllLookUpGenderType();
    this.getAllDistrict();
    this.getAllFinancialYear();
  },

  methods: {
    ...mapActions({
      getAllAllowanceProgram: "ManageAllotment/getAllAllowanceProgram",
      GerAllLookUpGender: "Allowance/GerAllLookUpGender",
      GerAllLookUpGenderType: "Allowance/GerAllLookUpGenderType",
      getAllDistrict: "ManageAllotment/getAllDistrict",
      getAllFinancialYear: "ManageAllotment/getAllFinancialYear",
    }),

    getAmount(event) {
      this.$store.dispatch("ManageAllotment/getAllowanceProgramAmount", event);
    },

    getOffice(event) {
      this.$store.dispatch("ManageAllotment/getAllOfficeLocation", event);
    },

    addBudget: async function () {
      try {
        console.log("success");
      } catch (e) {
        console.log(e);
      }
    },
    callback() {
    //   alert("hello");

      let data = [{
        name: null,
        designation: null,
        email: null,
        address: null,
        phone: null,
      },
      {
        name: null,
        designation: null,
        email: null,
        address: null,
        phone: null,
      },
    ];
    this.data.division = data;
    //   this.data.division = [...this.data.division, data];
    },
    callback2() {
    //   alert("hello");

      let data = [{
        name: null,
        designation: null,
        email: null,
        address: null,
        phone: null,
      },
      {
        name: null,
        designation: null,
        email: null,
        address: null,
        phone: null,
      },
    ];
    this.data.district = data;
    //   this.data.district = [...this.data.district, data];
    },
  },
};
</script>
<style scoped>
.custom-table {
  width: 100%;
  border-collapse: collapse;
}

.custom-table th,
.custom-table td {
  border: 1px solid black;
  padding: 10px;
  text-align: center;
}

.custom-table th {
  background-color: #afc6e9;
  color: #000;
}

/* Hover effect on rows */
.custom-table tbody tr:hover {
  background-color: #ffffff;
}
</style>