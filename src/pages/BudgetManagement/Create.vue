<template>
  <div id="create_manage_allotment">
    <v-row class="mx-5 mt-5">
      <v-col cols="12">
        <ValidationObserver ref="form" v-slot="{ invalid }">
          <v-form v-on:submit.prevent="addBudget">
            <v-row wrap>
              <v-col cols="12">
                <div class="d-block text-right">
                  <v-btn elevation="2" class="btn mb-2" color="primary" router to="/budget">
                    {{ $t("container.budget_management.budget_info_list") }}
                  </v-btn>
                </div>
                <v-card elevation="10" color="white" rounded="md" theme="light">
                  <v-card-title tag="div" class="mb-3" style="
                  background-color: #1c3b68;
                  color: white;">
                    <h3 class="white--text text-uppercase pt-3">
                      {{ $t("container.budget_management.budget_create") }}
                    </h3>
                  </v-card-title>

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


                              <ValidationProvider name="Previous Financial Year" vid="prev_financial_year_ids"
                                rules="required" v-slot="{ errors }">
                                <v-select clearable chips :label="$t('container.budget_management.previous_year')"
                                  :items="financial_years" item-text="financial_year" item-value="id"
                                  v-model="data.prev_financial_year_ids" multiple outlined required
                                  :error="errors[0] ? true : false" :error-messages="errors[0]"></v-select>
                              </ValidationProvider>

                              <ValidationProvider name="calculationValue" vid="calculation_value" rules="required"
                                v-slot="{ errors }">
                                <v-text-field type="Number" v-model="data.calculation_value" outlined :label="$t(
                                  'container.budget_management.calculation_value'
                                )
                                  " required :error="errors[0] ? true : false" :error-messages="errors[0]">
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
                                <v-select :items="calculationType" item-text="value_en" item-value="id" :label="$t(
                                  'container.budget_management.calculation_type'
                                )
                                  " v-model="data.calculation_type" outlined required :error="errors[0] ? true : false"
                                  :error-messages="errors[0]">
                                </v-select>
                              </ValidationProvider>

                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-card-text>

                  <v-col cols="12">
                    <v-row class="justify-end mb-5 mr-2">
                      <!-- <v-btn flat color="primary" class="custom-btn mr-2" router to="/budget">{{
          $t("container.list.back") }}
                      </v-btn> -->

                      <v-btn elevation="2" class="btn mr-2" @click="resetSearch()">
                        {{ $t("container.list.reset") }}
                      </v-btn>
                      <v-btn elevation="2"
                        :disabled="!data.program_id || !data.calculation_type || !data.prev_financial_year_ids || !data.calculation_value"
                        class="btn mr-2" @click="getLocationoWiseBudgetDetails(null)">
                        {{ $t("Forecast Budget") }}
                      </v-btn>

                      <v-btn flat color="success" type="submit" class="custom-btn mr-2" :disabled="invalid">
                        {{ $t("container.list.submit") }}
                      </v-btn>
                    </v-row>
                  </v-col>
                </v-card>
              </v-col>

            </v-row>
          </v-form>
        </ValidationObserver>
      </v-col>
      <v-col cols="12">
        <!-------Start  table  component ------->
        <div>
          <v-simple-table fixed-header class="table-responsive">

            <template v-slot:default>
              <caption>
                <v-card-title class="custom-title">
                  <h6 class="text-center" style="font-size:16.16px;"> {{
                    $t("Forecast Details") }}</h6>
                </v-card-title>

                <v-breadcrumbs :items="breadcrumbItems" divider="/">
                  <template v-slot:item="{ item, index }">
                    <v-breadcrumbs-item :key="index" :disabled="item.disabled"
                      @click.prevent="handleBreadcrumbClick(item.value)"
                      style="cursor: pointer;font-weight: bold; color: blue;transition: color 0.3s ease; ">
                      {{ language === 'bn' ? $helpers.englishToBangla(item.text) : item.text }}
                    </v-breadcrumbs-item>
                  </template>
                </v-breadcrumbs>
              </caption>

              <thead class="primary lighten-1">
                <tr>
                  <th class="text-left">
                    {{ $t("container.list.sl") }}
                  </th>
                  <th class="text-left">
                    {{ $t("container.grievance_management.dashboard.locationName") }}
                  </th>
                  <th class="text-left">
                    {{ $t("Previous Total Beneficiary") }}
                  </th>
                  <th class="text-left">
                    {{ $t("Previous Total Amount") }}
                  </th>
                  <th class="text-left">
                    {{ $t("Current Total Beneficiary") }}
                  </th>
                  <th class="text-left">
                    {{ $t("Current Total Amount") }}
                  </th>
                  <th class="text-left">
                    {{ $t("container.grievance_management.dashboard.action") }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in locationWiseBudget" :key="item.index">
                  <td>{{ language === 'bn' ? $helpers.englishToBangla(index + 1) : index + 1 }}</td>
                  <td>{{ language === 'bn' ? item.name_bn : item.name_en }}</td>
                  <td>{{ language === 'bn' ? $helpers.englishToBangla(item.previous_total_beneficiary) :
                    item.previous_total_beneficiary
                    }}</td>
                  <td>{{ language === 'bn' ? $helpers.englishToBangla(item.previous_total_amount) :
                    item.previous_total_amount }}
                  </td>
                  <td>{{ language === 'bn' ? $helpers.englishToBangla(item.current_total_beneficiary) :
                    item.current_total_beneficiary }}
                  </td>
                  <td>{{ language === 'bn' ? $helpers.englishToBangla(item.current_total_beneficiary) :
                    item.current_total_beneficiary }}
                  </td>
                  <td>
                    <v-btn v-if="!item.is_allotment_area" @click="fetchNextLevel(item.id, item.type)" fab x-small
                      v-on="on" color="success" elevation="0">
                      <v-icon>mdi-arrow-collapse-right </v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </template>

          </v-simple-table>
        </div>
        <!-------End  table component ------->
      </v-col>

    </v-row>
  </div>
</template>

<script>
import { extend, ValidationProvider, ValidationObserver } from "vee-validate";
import { mapActions, mapState } from "vuex";

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
        program_id: null,
        financial_year_id: null,
        calculation_type: null,
        prev_financial_year_ids: null,
        calculation_value: null,
        remarks: null
      },
      district: [],
      allowances: [],
      financial_years: [],
      active_year: '',
      calculationType: [],
      locationWiseBudget: null,
      breadcrumbItems: [
        { text: this.$i18n.locale == 'en' ? 'Division' : 'বিভাগ', value: null },
        //{ text: this.$i18n.locale == 'en' ? 'District' : 'জেলা', value: 'district' },
        // { text: this.$i18n.locale == 'en' ? 'Thana' : 'থানা', value: 'thana' },
      ],
    };

  },
  computed: {
    ...mapState({
    }),
  },
  methods: {
    ...mapActions({
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
          .get("/admin/financial-year/list", {
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
    }),

    getAmount(event) {
      this.$store.dispatch("ManageAllotment/getAllowanceProgramAmount", event);
    },

    getOffice(event) {
      this.$store.dispatch("ManageAllotment/getAllOfficeLocation", event);
    },

    addBudget() {
      let fd = new FormData();
      fd.append("program_id", this.data.program_id ?? '');
      fd.append("financial_year_id", this.active_year.id ?? '');
      fd.append("calculation_type", this.data.calculation_type ?? '');
      fd.append("prev_financial_year_ids", this.data.prev_financial_year_ids ?? '');
      fd.append("calculation_value", this.data.calculation_value ?? '');
      fd.append("remarks", this.data.remarks ?? '');

      try {
        this.$store
          .dispatch("BudgetManagement/StoreBudget", fd)
          .then((res) => {
            console.log(res, "submit");
            if (res.data?.success) {
              this.$toast.success("Data Inserted Successfully");
              this.$router.push({ name: "budget" });
            } else if (res.response?.data?.errors) {
              this.$refs.form.setErrors(res.response.data.errors);
              this.errors = res.response.data.errors;
              //   this.$toast.error(res.response.data.message);
            }
            console.log(this.$refs);
            console.log(this.errors, 'this.errors');
            //   if (data == null) {
            //     this.$toast.success("Data Inserted Successfully");
            //     this.dialogAdd = false;
            //     this.resetData();
            //     this.GetOffices();
            //   } else {
            //     this.errors = data.errors;
            //   }
          });
      } catch (e) {
        console.log(e);
      }
    },
    resetSearch() {
      this.data.program_id = null;
      this.data.financial_year_id = null;
      this.data.calculation_type = null;
      this.data.prev_financial_year_ids = null;
      this.data.calculation_value = null;
      this.data.remarks = null;
    },
    handleBreadcrumbClick(parentId) {
      // remove item in breadcrumb
      const pos = this.breadcrumbItems.map(e => e.value).indexOf(parentId);
      this.breadcrumbItems = this.breadcrumbItems.slice(0, pos + 1); //Need to assign it to the same or another variable
      this.getLocationoWiseBudgetDetails(parentId);
    },

    fetchNextLevel(parentId, currentType) {
      let nextType;
      if (currentType === 'division') {
        nextType = 'District';
      } else if (currentType === 'district') {
        nextType = 'Thana/City/Pourosova';
      } else if (currentType === 'city') {
        nextType = 'Thana';
      } else if (currentType === 'thana') {
        nextType = 'Union';
      } else if (currentType === 'union') {
        nextType = 'Ward';
      }
      //  else {
      //   return; // No further levels
      // }

      let obj = {
        text: nextType, value: parentId
      };
      // add item in breadcrumb
      this.breadcrumbItems.push(obj);
      this.getLocationoWiseBudgetDetails(parentId);
    },

    async getLocationoWiseBudgetDetails(parentId) {
      const queryParams = {
        program_id: this.data.program_id ?? '',
        financial_year_id: this.active_year.id ?? '',
        calculation_type: this.data.calculation_type ?? '',
        prev_financial_year_ids: this.data.prev_financial_year_ids ?? '',
        calculation_value: this.data.calculation_value ?? '',
        location_id: parentId

      };
      console.log(queryParams, 'queryParamsqueryParams');
      await this.$axios.get("/admin/budget/getProjection", {
        headers: {
          Authorization: "Bearer " + this.$store.state.token,
          "Content-Type": "multipart/form-data",
        },
        params: queryParams,
      }).then((result) => {
        this.locationWiseBudget = result?.data?.data;
      });
    },

  },
  mounted() {
    this.GetAllowance();
    this.GetFinancial_Year();
    this.$store
      .dispatch("getLookupByType", 23)
      .then((res) => (this.calculationType = res));
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

.highlight-column {
  background-color: #e0eaf1;
}

.custom-title {
  background-color: rgb(28, 59, 104);
  color: white;
  padding: 10px;
}
</style>