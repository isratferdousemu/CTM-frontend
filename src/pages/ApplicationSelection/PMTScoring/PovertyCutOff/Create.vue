<template>
  <div id="division">
    <v-row class="mx-5 mt-4">
      <v-col cols="12">
        <v-row>
          <v-col cols="12">
            <v-card elevation="10" color="white" rounded="md" theme="light" class="mb-8">
              <v-card-title class="justify-center" tag="div">
                <h3 class="text-uppercase pt-3">
                  {{
                    $t("container.application_selection.poverty_cut_off.list")
                  }}
                </h3>
              </v-card-title>

              <v-card-text>
                <ValidationObserver ref="formAdd" v-slot="{ invalid }">
                  <form @submit.prevent="submitCuttOff()">
                    <v-row class="ma-0 pa-3 white round-border d-flex justify-space-between align-center"
                      justify="center" justify-lg="space-between">
                      <div class="d-flex justify-md-end flex-wrap">
                        <ValidationProvider v-slot="{ errors }" name="Financial Year" vid="financial_year_id"
                          rules="required">
                          <v-autocomplete class="mr-5" v-model="data.financial_year_id" :items="financial_years"
                            :label="$t('container.system_config.demo_graphic.financial_year.financial_year')"
                            :append-icon-cb="appendIconCallback" append-icon="mdi-plus" outlined clearable dense
                            :item-text="getItemText_financial" item-value="id" :error="errors[0] ? true : false"
                            :error-messages="errors[0]"></v-autocomplete>
                        </ValidationProvider>
                        <ValidationProvider v-slot="{ errors }" name="type" vid="type" rules="required">
                          <v-select @input="onChangeFilter()" class="mr-5" v-model="data.type" :items="location_types"
                            :label="$t('container.list.location_type')" outlined clearable
                            :append-icon-cb="appendIconCallback" append-icon="mdi-plus" dense :item-text="getItemText"
                            item-value="id" :error="errors[0] ? true : false" :error-messages="errors[0]"></v-select>
                        </ValidationProvider>
                        <div v-if="data.type === 0">
                          <ValidationProvider v-slot="{ errors }" name="Score" vid="score" rules="required">
                            <v-text-field outlined dense clearable v-model="data.score"
                              class="my-sm-0 my-3 mx-0v -input--horizontal" flat variant="outlined" :label="$t(
                                'container.application_selection.poverty_cut_off.score'
                              )
                                " hide-details color="primary">
                            </v-text-field>
                          </ValidationProvider>
                        </div>

                        <!-- <v-text-field 
                                                    outlined dense clearable v-model="search"
                                                    prepend-inner-icon="mdi-magnify"
                                                    class="my-sm-0 my-3 mx-0v -input--horizontal " flat variant="outlined"
                                                    :label="$t(
                                                        'container.application_selection.poverty_cut_off.search'
                                                    )
                                                        ">

                                                </v-text-field> -->
                      </div>
                      <v-col cols="12" v-if="filters">
                        <v-data-table :loading="loading" :headers="headers" :items="filters" dense
                          class="elevation-1 transparent row-pointer" :page.sync="page.current"
                          :items-per-page.sync="page.perPage" :total-items="page.total"
                          @update:options="onOptionsUpdate">
                          <template v-slot:item.id="{ item, index }">
                            {{ language === 'bn' ? $helpers.englishToBangla((page.current - 1) * page.perPage + index +
                              1) : (page.current - 1) * page.perPage + index + 1 }}
                            <!-- {{ (page.current - 1) * page.perPage + index + 1 }} -->
                          </template>
                          <template v-slot:item.division_or_district_cut_off="{ item }">
                            {{ language === 'bn' ? item.name_bn : item.name_en }}
                            <!-- {{ item.name_en }} -->
                          </template>

                          <template v-slot:item.score="{ item }">
                            <ValidationProvider v-slot="{ errors }" name="Weight/Score" vid="inputScore"
                              rules="required">
                              <v-text-field v-model="item.inputScore" outlined clearable type="text"></v-text-field>
                            </ValidationProvider>

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
                      </v-col>

                      <v-btn flat color="gray" type="submit" @click="navigateTolist" class="mr-5 custom-btn ml-auto">
                        {{ $t("container.list.back") }}
                      </v-btn>

                      <v-btn flat color="success" type="submit" class="mr-5 custom-btn" :disabled="!allInputsProvided ||
                        !data.financial_year_id ||
                        invalid
                        ">
                        {{ $t("container.list.submit") }}
                      </v-btn>
                    </v-row>
                  </form>
                </ValidationObserver>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { extend, ValidationProvider, ValidationObserver } from "vee-validate";
import { required } from "vee-validate/dist/rules";

extend("required", required);
export default {
  name: "Index",
  title: "CTM - Cutt-Off-Score",
  data() {
    return {
      data: {
        id: null,
        financial_year_id: null,
        location_id: null,
        type: null,
        score: null,
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
      options: {},
      allInputsProvided: false,

      dialogAdd: false,
      deleteDialog: false,
      dialogEdit: false,
      delete_loading: false,
      loading: false,
      location_type: null,
      location_type_id: null,
      location_types: [
        {
          id: 0,
          name_en: "All", name_bn: 'সব',
        },
        {
          id: 1,
          name_en: "Division", name_bn: 'বিভাগ',
        },
        {
          id: 2,
          name_en: "District", name_bn: 'জেলা',
        },
      ],
      financial: null,
      location: null,
      type: null,

      search: "",
      delete_id: "",
      financial_year_id: null,
      cut_off: [],
      financial_years: [],
      errors: {},
      error_status: {},

      items: [5, 10, 15, 20, 40, 50, 100],
    };
  },
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  computed: {
    language: {
      get() {
        return this.$store.getters.getAppLanguage;
      },
    },
    headers() {
      return [
        {
          text: this.$t("container.list.sl"),
          value: "id",
          align: "start",
          sortable: false,
        },
        // {
        //   text: this.$t(
        //     "container.system_config.demo_graphic.financial_year.financial_year"
        //   ),
        //   value: "financial_year",
        // },
        {
          text: this.data.type == '1' ? this.$t("container.system_config.demo_graphic.division.division") : this.$t("container.system_config.demo_graphic.district.district"),
          value: "division_or_district_cut_off",
          sortable: false,
        },
        {
          text: this.$t(
            "container.application_selection.poverty_cut_off.score"
          ),
          value: "score",
          sortable: false,
        },
      ];
    },

    ...mapState({
      message: (state) => state.Division.success_message,
      // cut_off: (state) => state.Division.cut_off,
      // errors: (state) => state.Division.errors,
      // error_status: (state) => state.Division.error_status,
    }),
  },

  methods: {
    getItemText(item) {
      return this.language === 'bn' ? item.name_bn : item.name_en;
    },
    getItemText_financial(item) {
      return this.language === 'bn' ? this.$helpers.englishToBangla(item.financial_year) : item.financial_year;

    },
    onOptionsUpdate(options) {
      console.log("Options updated:", options);

      // Check if the pagination values have actually changed

      // Update pagination properties
      this.page.current = options.page;
      this.page.perPage = options.itemsPerPage;

      // // Log additional information for debugging
      console.log("Current Page:", this.page.current);
      console.log("Items Per Page:", this.page.perPage);

      // // Fetch data using your API call based on the updated pagination properties
      // this.onChangeFilter();
    },

    navigateTolist() {
      this.$router.push("/application-management/poverty-cut-off-score");
    },
    createDialog() {
      if (this.$refs.formAdd) {
        this.$refs.formAdd.reset();
      }
      this.resetForm();
      this.dialogAdd = true;
    },
    checkLanguage() {
      let checkLanguageEnglish = this.$checkLanguage(this.data.score);
      let checkLanguageBangla = this.$checkLanguage(this.data.name_bn);

      console.log(checkLanguageEnglish);
      console.log(checkLanguageBangla);
      let errs = {};

      if (
        checkLanguageBangla !== "Bangla" &&
        checkLanguageBangla !== "BanglaSpecialChar"
      ) {
        errs.name_bn = ["Please Enter in Bangla Language in this Field"];
      }

      if (checkLanguageEnglish != "English") {
        errs.score = ["Please Enter in English Language in this Field"];
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
    validator() {
      let fd = new FormData();
      for (const [key, value] of Object.entries(this.data)) {
        if (value !== null) {
          fd.append(key, value);
        }
      }
      return fd;
    },
    submitDivision() {
      if (!this.checkLanguage()) {
        return;
      }

      try {
        this.$store
          .dispatch("Division/StoreDivision", this.validator())
          .then((res) => {
            if (res.data?.success) {
              this.$toast.success("Data Inserted Successfully");
              this.resetForm();
              this.dialogAdd = false;
              this.GetPovertyCutOff();
            } else if (res.response?.data?.errors) {
              console.log(res.response.data.errors);
              this.$refs.formAdd.setErrors(res.response.data.errors);
            }
          });
      } catch (e) {
        console.log(e);
      }
    },
    editDialog(item) {
      console.log(item);
      this.dialogEdit = true;
      this.data.division_name = item.name_en;
      this.data.score = item.score;
      this.data.location_id = item.assign_location.id;
      this.data.type = item.type;
      this.data.id = item.id;
      this.errors = {};
    },
    submitCuttOff() {
      if (this.data.type === 0) {
        this.$axios
          .post("admin/poverty/poverty-cut-off/insert", this.data, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((result) => {
            this.loading = false;

            if (result.data.success == true) {
              this.$toast.success("Data Inserted Successfully");

              this.$router.push(
                "/application-management/poverty-cut-off-score"
              );
            }
            if (result.data.success == false) {
              this.$toast.error(result.data.error);
            }
          })
          .catch((err) => { });
      } else {
        const financialYearId = this.data.financial_year_id;

        // Access item inputScore and id for each filter
        const formData = this.filters.map((item) => ({
          inputScore: item.inputScore,
          id: item.id,
          financialYearId: this.data.financial_year_id,
          type: this.data.type,
        }));

        this.$axios
          .post("admin/poverty/poverty-cut-off/insert", formData, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((result) => {
            this.loading = false;
            console.log(result, "result");

            if (result.data.success == true) {
              this.$toast.success("Data Inserted Successfully");

              this.$router.push(
                "/application-management/poverty-cut-off-score"
              );
            }
            if (result.data.success == false) {
              this.$toast.error(result.data.error);
            }
          })
          .catch((err) => { });
      }
    },

    resetForm() {
      // Reset the form data
      this.data = {
        division_name: "",
        score: "",
        name_bn: "",
        // Reset other form fields
      };
      this.errors = {};
    },

    async onChangeFilter() {
      this.filters = [];
      const queryParams = {
        type: this.data.type,
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

    async GetFinancialYear() {
      this.$axios
        .get("/admin/financial-year/get", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          this.financial_years = result.data.data;
        });
    },
    deleteDivision: async function () {
      try {
        await this.$store
          .dispatch("Division/DestroyDivision", this.delete_id)
          .then((res) => {
            // check if the request was successful
            if (res?.data?.success) {
              // this.$router.push("/application-management/poverty-cut-off-score");
              // this.$toast.success(res.data.message);
              this.$router.push("/system-configuration/allowance-program");
            } else {
              this.$toast.error(res.response.data.message);
            }
            this.deleteDialog = false;
            this.GetPovertyCutOff();
          })
          .catch((error) => {
            console.log(error, "error");
          });
      } catch (e) {
        console.log(e);
      }
    },
    deleteAlert(id) {
      this.data.id = id;
      // alert(JSON.stringify(id));
      this.deleteDialog = true;
      this.delete_id = id;
    },
    updateHeaderTitle() {
      const title = this.$t(
        "container.application_selection.poverty_cut_off.list"
      );
      this.$store.commit("setHeaderTitle", title);
    },
  },
  watch: {
    "$i18n.locale": "updateHeaderTitle",
    filters: {
      handler(newFilters) {
        this.allInputsProvided = newFilters.every(
          (item) => item.inputScore !== undefined && item.inputScore !== null
        );
      },
      deep: true,
    },
  },
  created() {
    this.GetFinancialYear();
    // this.GetPovertyCutOff();
    this.onChangeFilter();
  },
  beforeMount() {
    this.updateHeaderTitle();
  },
  mounted() {
    this.filters.forEach((item) => {
      this.$set(item, "inputScore", item.score);
    });
  },
};
</script>
