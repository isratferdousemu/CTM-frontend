<template>
  <div id="create_manage_allotment">
    <v-row class="mx-5 mt-5">
      <v-col cols="12">
        <ValidationObserver ref="form" v-slot="{ invalid }">
          <v-form v-on:submit.prevent="addAllotment">
            <v-row wrap>
              <v-col cols="12">
                <v-card>
                  <v-row>
                    <v-col col="6">
                      <v-card-title><h3>Allotment Create</h3></v-card-title>
                    </v-col>
                  </v-row>

                  <v-divider></v-divider>

                  <v-card-text>
                    <v-col cols="12" class="d-flex">
                      <v-row wrap>
                        <v-col cols="12" class="d-flex">
                          <v-row wrap>
                            <v-col cols="12" sm="6" lg="6">
                              <v-select
                                :items="allowances"
                                item-text="name_en"
                                item-value="id"
                                label="Select Allowance Program"
                                outlined
                                @change="getAmount($event)"
                              >
                              </v-select>

                              <v-select
                                :items="districts"
                                item-text="name_en"
                                item-value="id"
                                label="Select District"
                                outlined
                                @change="getOffice($event)"
                              >
                              </v-select>

                              <v-select
                                :items="financial"
                                item-text="financial_year"
                                item-value="id"
                                label="Select Financial Year"
                                outlined
                              >
                              </v-select>
                            </v-col>

                            <v-col cols="12" sm="6" lg="6">
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
                                      <div v-for="g in genders">
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
                                      <div v-for="gt in genderTypes">
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
                            </v-col>
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
                      <v-card-title><h3>Allotment</h3></v-card-title>
                    </v-col>
                  </v-row>

                  <v-divider></v-divider>

                  <v-card-text>
                    <v-col cols="12" class="d-flex">
                      <v-row wrap>
                        <v-col cols="12" lg="12">
                          <v-data-table
                            :loading="loading"
                            :headers="headers"
                            :items="filters"
                            dense
                            class="elevation-1 transparent row-pointer"
                            :page.sync="page.current"
                            :items-per-page.sync="page.perPage"
                            :total-items="page.total"
                            @update:options="onOptionsUpdate"
                          >
                            <template v-slot:item.id="{ item, index }">
                              {{
                                (page.current - 1) * page.perPage + index + 1
                              }}
                            </template>
                            <template
                              v-slot:item.division_or_district_cut_off="{
                                item,
                              }"
                            >
                              {{ item.name_en }}
                            </template>
                            <template v-slot:item.score="{ item }">
                              <ValidationProvider
                                v-slot="{ errors }"
                                name="Weight/Score"
                                vid="inputScore"
                                rules="required"
                              >
                                <v-text-field
                                  v-model="item.inputScore"
                                  outlined
                                  clearable
                                  type="text"
                                ></v-text-field>
                              </ValidationProvider>
                              <!-- <ValidationProvider v-slot="{ errors }" name="Weight/Score" vid="inputScore" rules="required|decimal|numeric|min_value:-999999999|max_value:999999999">
        <v-text-field v-model="item.inputScore" outlined clearable type="text"></v-text-field>
    </ValidationProvider> -->
                            </template>
                            <template v-slot:item.name_bn="{ item }">
                              {{ item.name_bn }}
                            </template>

                            <!-- <template v-slot:footer="item">
                                                        <div class="text-center pt-2 v-data-footer justify-center pb-2">
                                                            <v-select style="
                              position: absolute;
                              right: 25px;
                              width: 149px;
                              transform: translate(0px, 0px);
                            " :items="items" hide-details dense outlined @change="onPageChange"
                                                                v-model="pagination.perPage"></v-select>
                                                            <v-pagination circle primary v-model="pagination.current"
                                                                :length="pagination.total" @input="onPageChange"
                                                                :total-visible="11"
                                                                class="custom-pagination-item"></v-pagination>
                                                        </div>
                                                    </template> -->
                          </v-data-table>


                          <!-- Previous Table -->
                          <!-- <table class="custom-table">
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
                                <td>1</td>
                                <td style="width: 20%"></td>
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
                          </table> -->
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
  title: "CTM - Create Manage Allotment",
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
      pagination: {
        current: 1,
        perPage: 10, // You can set the desired default page size
        total: 0,
      },
      page: {
        current: 1,
        perPage: 10, // You can set the desired default page size
        total: 0,
      },
      filters: [],
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
            "Office"
          ),
          value: "Office",
        },
        {
          text: this.$t(
            "Upazila"
          ),
          value: "Office",
        },
        {
          text: this.$t(
            "Union/Pourashava"
          ),
          value: "Office",
        },
        {
          text: this.$t(
            "Beneficiary Regular"
          ),
          value: "",
        },
        {
          text: this.$t(
            "container.application_selection.poverty_cut_off.name_en"
          ),
          value: "division_or_district_cut_off",
          sortable: false,
        },
        {
          text: this.$t(
            "Beneficiary Additional"
          ),
          value: "score",
          sortable: false,
        },
        {
          text: this.$t(
            "Total Beneficiary"
          ),
          value: "",
          sortable: false,
        },
        {
          text: this.$t(
            "Amount of Allocated Money"
          ),
          value: "",
          sortable: false,
        },
      ];
    },
  },

  mounted() {
    this.getAllAllowanceProgram();
    this.GerAllLookUpGender();
    this.GerAllLookUpGenderType();
    this.getAllDistrict();
    this.getAllFinancialYear();
    this.onChangeFilter();
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

    addAllotment: async function () {
      try {
        console.log("success");
      } catch (e) {
        console.log(e);
      }
    },
    async onChangeFilter() {
      this.filters = [];
      const queryParams = {
        type: 1,
        searchText: this.search,
      };

      this.$axios
        .get("/admin/poverty/filter/get", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
          params: queryParams,
        })
        .then((result) => {
          this.filters = result.data.data;
          // this.pagination.total= result.data.total;
        });
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