<template>
  <div id="allotment_list">
    <v-row class="mx-5 mt-4">
      <v-col cols="12">
        <Spinner :loading="isLoading" />
        <v-row>
          <v-col cols="12">
            <div class="d-block text-right">
              <v-btn elevation="2" class="btn my-2" color="primary" router to="/budget/create">{{
                $t("container.budget_management.add_new") }}</v-btn>
            </div>
            <!-- Expantion panels start -->
            <v-expansion-panels>
              <v-expansion-panel class="ma-2">
                <v-expansion-panel-header color="#8C9EFF">
                  <h3 class="white--text">{{ $t("container.list.search") }}</h3>
                </v-expansion-panel-header>
                <v-expansion-panel-content class="elevation-0 transparent mt-10">
                  <ValidationObserver ref="form" v-slot="{ invalid }">
                    <form @submit.prevent="onSearch()">
                      <v-row>
                        <v-col lg="6" md="6" cols="12">
                          <v-autocomplete outlined clearable :items="allowances" item-text="name_en" item-value="id"
                            v-model="data.program_id" :label="$t(
                              'container.application_selection.application.program'
                            )
                              "></v-autocomplete>
                        </v-col>
                        <v-col lg="6" md="6" cols="12">
                          <v-select outlined clearable :items="financial_years" item-text="financial_year"
                            item-value="id" v-model="data.financial_year_id" :label="$t(
                              'container.system_config.demo_graphic.financial_year.financial_year'
                            )
                              "></v-select>
                        </v-col>
                      </v-row>
                      <div class="d-inline d-flex justify-end">
                        <v-btn elevation="2" class="btn mr-2" color="success" type="submit">{{
                          $t("container.list.search") }}</v-btn>
                        <v-btn elevation="2" class="btn" @click="resetSearch">
                          {{
                            $t("container.list.reset")
                          }}
                        </v-btn>
                      </div>
                    </form>
                  </ValidationObserver>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
            <!-- Expantion panels end -->
            <!-- Application list -->
            <v-card elevation="10" color="white" rounded="md" theme="light" class="mb-8 mt-5">
              <v-card-title class="justify-center" tag="div">
                <h3 class="text-uppercase pt-3">{{ $t("container.budget_management.budget_info_list") }}</h3>
              </v-card-title>
              <v-card-text>
                <v-row class="ma-0 white round-border d-flex justify-space-between align-center" justify="center"
                  justify-lg="space-between">
                  <v-col cols="12">
                    <v-data-table :headers="headers" :items="allotments" :loading="loading" item-key="id"
                      :items-per-page="pagination.perPage" hide-default-footer
                      class="elevation-0 transparent row-pointer">
                      <template v-slot:item.approve_name="{ item }">
                        <span v-if="item.is_approved == 1">
                          {{ language === "bn" ? "অনুমোদিত" : "Approved" }}
                        </span>
                        <span v-else>
                          {{ language === "bn" ? "খসড়া" : "Draft" }}
                        </span>

                      </template>
                      <template v-slot:item.sl="{ item, index }">
                        {{
                          (pagination.current - 1) * pagination.perPage +
                          index +
                          1
                        }}
                      </template>
                      <!-- Action Button -->
                      <template v-slot:item.actions="{ item }">
                        <v-tooltip top>
                          <template v-slot:activator="{ on }">
                            <v-btn :disabled="item.process_flag === 0" v-can="'update-post'" fab x-small v-on="on"
                              color="#F40F02" elevation="0" class="white--text ml-2" @click="GeneratePDF(item.id)">
                              <v-icon>mdi-file-pdf-box</v-icon>
                            </v-btn>
                          </template>
                          <span>{{ $t("Pdf") }}</span>
                        </v-tooltip>

                        <v-tooltip top>
                          <template v-slot:activator="{ on }">
                            <v-btn :disabled="item.process_flag === 0" v-can="'update-post'" fab x-small v-on="on"
                              color="#1D6F42" elevation="0" class="white--text ml-2" @click="GenerateExcel(item.id)">
                              <v-icon>mdi-file-excel</v-icon>
                            </v-btn>
                          </template>
                          <span>{{ $t("Excel") }}</span>
                        </v-tooltip>

                        <v-tooltip top>
                          <template v-slot:activator="{ on }">
                            <v-btn :disabled="item.process_flag === 0" v-can="'update-post'" fab x-small v-on="on"
                              color="#AFB42B" elevation="0" class="white--text ml-2" :to="`/budget/detail/${item.id}`">
                              <v-icon>mdi-eye</v-icon>
                            </v-btn>
                          </template>
                          <span>{{ $t("container.list.view") }}</span>
                        </v-tooltip>

                        <span v-if="item.is_approved == 0">
                          <v-tooltip top>
                            <template v-slot:activator="{ on }">
                              <v-btn :disabled="item.process_flag === 0" v-can="'update-post'" fab x-small v-on="on"
                                color="#83D3F3" elevation="0" class="white--text ml-2"
                                @click="verifyBudgetItem(item.id)">
                                <v-icon>mdi-checkbox-marked-circle</v-icon>
                              </v-btn>
                            </template>
                            <span>{{ $t("Verified") }}</span>
                          </v-tooltip>
                          <v-tooltip top>
                            <template v-slot:activator="{ on }">
                              <v-btn :disabled="item.process_flag === 0" v-can="'update-post'" fab x-small v-on="on"
                                color="success" elevation="0" class="ml-3" :to="`/budget/edit/${item.id}`">
                                <v-icon>mdi-account-edit-outline</v-icon>
                              </v-btn>
                            </template>
                            <span>{{ $t("container.list.edit") }}</span>
                          </v-tooltip>

                          <v-tooltip top>
                            <template v-slot:activator="{ on }">
                              <v-btn :disabled="item.process_flag === 0" v-can="'delete-allotment'" fab x-small
                                v-on="on" color="#b71c1c" class="ml-3 white--text" elevation="0"
                                @click="deleteAlert(item.id)">
                                <v-icon>mdi-delete</v-icon>
                              </v-btn>
                            </template>
                            <span>{{ $t("container.list.delete") }}</span>
                          </v-tooltip>
                        </span>

                      </template>
                      <!-- End Action Button -->
                      <template v-slot:footer="item">
                        <div class="text-center pt-2 v-data-footer justify-center pb-2">
                          <v-select style="
                              position: absolute;
                              right: 25px;
                              width: 149px;
                              transform: translate(0px, 0px);
                            " :items="items" hide-details dense outlined @change="onPageChange"
                            v-model="pagination.perPage"></v-select>
                          <v-pagination circle primary v-model="pagination.current" :length="pagination.total"
                            @input="onPageChange" :total-visible="11" class="custom-pagination-item"></v-pagination>
                        </div>
                      </template>
                    </v-data-table>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>

      <!-- Budget Verify modal  -->
      <v-dialog v-model="dialogVerify" width="650">
        <v-card style="justify-content: center; text-align: center">
          <v-card-title class="font-weight-bold justify-center">
            {{ $t("container.budget_management.budget_verification") }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="mt-7">
            <ValidationObserver ref="formVerify" v-slot="{ invalid }">
              <form @submit.prevent="submitVerification()">
                <v-row>
                  <!-- <v-col lg="6" md="6" cols="12">
                    <ValidationProvider name="Full Name" vid="full_name" rules="required" v-slot="{ errors }">
                      <v-autocomplete outlined clearable :items="allowances" item-text="name_en" item-value="id"
                        v-model="budget_verify.program_id" :label="$t(
                          'container.application_selection.application.program'
                        )
                          " required :error="errors[0] ? true : false" :error-messages="errors[0]"></v-autocomplete>
                    </ValidationProvider>
                  </v-col> -->

                  <v-col lg="6" md="6" cols="12">
                    <ValidationProvider name="Approved By" vid="approvedby" rules="required" v-slot="{ errors }">
                      <v-text-field :hide-details="errors[0] ? false : true" outlined type="text"
                        v-model="budget_verify.approve_by" :label="$t(
                          'container.budget_management.approved_by'
                        )
                          " required :error="errors[0] ? true : false" :error-messages="errors[0]"></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="6" md="6" cols="12">
                    <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40"
                      transition="scale-transition" offset-y min-width="auto">
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field outlined clearable v-model="budget_verify.approved_date" :label="$t(
                          'container.budget_management.approved_date'
                        )
                          " prepend-inner-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                      </template>
                      <v-date-picker v-model="budget_verify.approved_date" @input="menu2 = false"></v-date-picker>
                    </v-menu>

                  </v-col>
                  <!-- <v-col lg="6" md="6" cols="12">
                    <ValidationProvider v-slot="{ errors }" name="Image" vid="image">
                      <v-file-input outlined show-size counter prepend-inner-icon="mdi-camera" label="File Attached"
                        v-model="budget_verify.attachment" accept="image/*" :error="errors[0] ? true : false"
                        :error-messages="errors[0]"></v-file-input>
                    </ValidationProvider>
                  </v-col> -->
                  <v-col lg="12" md="12" cols="12">
                    <ValidationProvider name="Remarks" vid="remarks" rules="required" v-slot="{ errors }">
                      <v-textarea :hide-details="errors[0] ? false : true" outlined type="text"
                        v-model="budget_verify.remakrs" :label="$t('container.budget_management.remark')
                          " rows="2" required :error="errors[0] ? true : false"
                        :error-messages="errors[0]"></v-textarea>
                    </ValidationProvider>
                  </v-col>
                </v-row>

                <v-row class="mx-0 my-0 py-2" justify="center">
                  <v-btn @click="dialogVerify = false" outlined class="custom-btn-width py-2 mr-10">
                    {{ $t("container.list.cancel") }}
                  </v-btn>
                  <v-btn type="submit" color="primary" :disabled="invalid" :loading="loading"
                    class="custom-btn-width warning white--text py-2">
                    {{ $t("container.list.submit") }}
                  </v-btn>
                </v-row>
              </form>
            </ValidationObserver>
          </v-card-text>
        </v-card>
      </v-dialog>
      <!-- Budget Verify modal  -->

      <!-- Budget delete modal  -->
      <v-dialog v-model="deleteDialog" width="350">
        <v-card style="justify-content: center; text-align: center">
          <v-card-title class="font-weight-bold justify-center">
            {{ $t("container.budget_management.delete_title") }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <div class="subtitle-1 font-weight-medium mt-5">
              {{
                $t(
                  "container.budget_management.delete_message"
                )
              }}
            </div>
          </v-card-text>
          <v-card-actions style="display: block">
            <v-row class="mx-0 my-0 py-2" justify="center">
              <v-btn text @click="deleteDialog = false" outlined class="custom-btn-width py-2 mr-10">
                {{ $t("container.list.cancel") }}
              </v-btn>
              <v-btn text @click="deleteyBudgetItem()" color="white" :loading="delete_loading"
                class="custom-btn-width warning white--text py-2">
                {{ $t("container.list.delete") }}
              </v-btn>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- Budget delete modal  -->
    </v-row>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider, extend } from "vee-validate";
import { required } from "vee-validate/dist/rules";
import { mapActions, mapState } from "vuex";
import Spinner from "@/components/Common/Spinner.vue";

extend("required", required);
export default {
  name: "Index",
  title: "CTM - Budget List",
  data() {
    return {
      data: {
        program_id: null,
        financial_year_id: null
      },

      loading: true,
      search: "",
      delete_id: "",
      districts: [],
      allotments: [],
      allowances: [],
      financial_years: [],
      budget_list: [],
      dialogVerify: false,
      deleteDialog: false,
      verify_id: null,
      delete_id: null,
      isLoading: false,
      budget_verify: {
        program_id: null,
        approve_by: null,
        approved_date: null,
        attachment: null,
        remakrs: null
      },
      pagination: {
        current: 1,
        total: 0,
        perPage: 10
      },
      items: [5, 10, 15, 20, 40, 50, 100]
    };
  },
  components: {
    ValidationProvider,
    ValidationObserver,
    Spinner
  },
  computed: {
    language: {
      get() {
        return this.$store.getters.getAppLanguage;
      },
    },
    ...mapState({
      divisions: state => state.Division.divisions
    }),
    headers() {
      return [
        { text: this.$t("container.list.sl"), value: "sl" },
        { text: this.$t("container.budget_management.id"), value: "budget_id" },
        {
          text: this.$t("container.budget_management.program_name"),
          value: "program.name_en"
        },
        {
          text: this.$t("container.budget_management.calculation_type"),
          value: "calculation_type.value_en"
        },
        {
          text: this.$t("container.budget_management.financial_year"),
          value: "financial_year.financial_year"
        },
        {
          text: this.$t("container.budget_management.approval_status"),
          value: "approve_name"
        },
        {
          text: this.$t("container.list.action"),
          value: "actions",
          width: "25%",
          align: "center"
        }
      ];
    }
  },

  methods: {
    ...mapActions({
      GetAllDivisions: "Division/GetAllDivisions"
    }),
    onPageChange($event) {
      // this.pagination.current = $event;
      this.GetAllotment();
    },
    resetSearch() {
      this.loading = true;
      this.data.program_id = null;
      this.data.financial_year_id = null;
      this.GetAllotment();
    },
    onSearch() {
      this.loading = true;
      this.pagination = {
        ...this.pagination,
        current: 1,
      };
      this.GetAllotment();
    },

    async GetAllotment() {
      const queryParams = {
        program_id: this.data.program_id,
        financial_year_id: this.data.financial_year_id,
        perPage: this.pagination.perPage,
        page: this.pagination.current
      };
      this.$axios
        .get("/admin/budget/list", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data"
          },
          params: queryParams
        })
        .then(result => {
          this.allotments = result.data.data;
          this.total = result.data.meta.total;
          console.log("results_total__", this.total);

          this.pagination.current = result.data.meta.current_page;
          this.pagination.total = result.data.meta.last_page;
          this.pagination.grand_total = result.data.meta.total;
          this.loading = false;
        });
    },
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
        });
    },
    updateHeaderTitle() {
      const title = this.$t("container.budget_management.budget_info");
      this.$store.commit("setHeaderTitle", title);
    },
    verifyBudgetItem(event) {
      if (this.$refs.formVerify) {
        this.$refs.formVerify.reset();
      }
      this.verify_id = event;
      this.dialogVerify = true;
    },

    deleteAlert(id) {
      this.deleteDialog = true;
      this.delete_id = id;
    },

    async deleteyBudgetItem() {
      if (!this.delete_id)
        return
      try {
        await this.$store
          .dispatch("BudgetManagement/DestroyBudget", this.delete_id)
          .then((res) => {
            // check if the request was successful
            if (res?.data?.success) {
              this.$toast.success(res.data.message);
            } else {
              this.$toast.error(res.response.data.message);
            }
            this.deleteDialog = false;
            this.GetAllotment();
          })
          .catch((error) => {
            console.log(error, "error");
          });
      } catch (e) {
        console.log(e);
      }

    },
    submitVerification() {
      if (!this.verify_id) {
        return;
      }
      try {
        let fd = new FormData();
        // fd.append("program_id", this.budget_verify.program_id);
        fd.append("approved_by", this.budget_verify.approve_by);
        // fd.append("approved_date", this.budget_verify.approved_date);
        // fd.append("attachment", this.budget_verify.attachment);
        fd.append("approved_remarks", this.budget_verify.remakrs);

        const data = { formData: fd, id: this.verify_id };

        this.$store
          .dispatch("BudgetManagement/BudgetVerification", data)
          .then((res) => {
            console.log(res, "submit__");
            if (res.data?.success) {
              this.$toast.success("Verification Successfully");
              this.dialogVerify = false;
              this.GetAllotment();
              this.$refs.formVerify.reset();
            } else if (res.response?.data?.errors) {
              this.$refs.form.setErrors(res.response.data.errors);
              this.errors = res.response.data.errors;
            }
          });
      } catch (e) {
        console.log(e);
      }
    },
    async GeneratePDF(id) {
      this.isLoading = true;
      const queryParams = {
        language: this.$i18n.locale,
      };
      this.$axios
        .get("/admin/budget/detail/report/" + id, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "application/json",
          },
          params: queryParams,
          responseType: "arraybuffer",
        })
        .then((result) => {
          const blob = new Blob([result.data], { type: "application/pdf" });
          const url = window.URL.createObjectURL(blob);
          window.open(url, "_blank");
          this.isLoading = false;
          // window.open(result.data.data.url, "_blank");
        })
        .catch((error) => {
          this.isLoading = false;
          console.error("Error generating PDF:", error);
        });
    },

    async GenerateExcel(id) {
      this.isLoading = true;
      let page;
      if (!this.sortBy) {
        page = this.pagination.current;
      }
      const queryParams = {
        // language: this.$i18n.locale,
        // program_id: this.data.program_id,
        // financial_year_id: this.data.financial_year_id,

        perPage: 50000,
        page: 1, // All data loaded
        // sortBy: this.sortBy,
        // orderBy: this.sortDesc,
      };

      await this.$axios
        .get("/admin/budget/detail/list/" + id, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
          params: queryParams,
        })
        .then((result) => {
          this.budget_list = result.data.data;
        })
        .catch((error) => {
          this.isLoading = false;
          console.error("Error generating PDF:", error);
        });

      try {
        import("@/plugins/Export2Excel").then((excel) => {
          const HeaderInfo = [
            this.$t("container.list.sl"),
            this.$t(
              "container.budget_management.office"
            ),
            this.$t(
              "container.budget_management.allotment_area"
            ),
            this.$t(
              "container.budget_management.total_beneficiary"
            ),
            this.$t(
              "container.budget_management.amount_of_allocated_money"
            ),
          ];
          const CustomInfo = this.budget_list.map((i, index) => {
            return {
              sl:
                this.$i18n.locale == "en"
                  ? index + 1
                  : index + 1,
              office_area:
                this.$i18n.locale == "en" ? i.office_area?.name_en : i.office_area?.name_bn,
              allotment_area: this.$i18n.locale == "en" ? i.allotment_area?.name_en : i.allotment_area?.name_bn,
              total_beneficiaries:
                this.$i18n.locale == "en" ? i.total_beneficiaries : i.total_beneficiaries,
              total_amount:
                this.$i18n.locale == "en" ? i.total_amount : i.total_amount,

            };
          });

          const Field = [
            "sl",
            "office_area",
            "allotment_area",
            "total_beneficiaries",
            "total_amount",
          ];

          const Data = this.FormatJson(Field, CustomInfo);
          const currentDate = new Date().toISOString().slice(0, 10);
          let dateinfo =
            queryParams.language == "en"
              ? currentDate
              : this.$helpers.englishToBangla(currentDate);

          const filenameWithDate = `${this.$t(
            "container.budget_management.budget_info_list"
          )}`;

          excel.export_json_to_excel({
            header: HeaderInfo,
            data: Data,
            sheetName: filenameWithDate,
            filename: filenameWithDate,
            autoWidth: true,
            bookType: "xlsx",
          });
        });
      } catch (error) {
        // Handle any errors here
        console.error("An error occurred:", error);
        this.isLoading = false;
      } finally {
        this.isLoading = false;
      }
    },
    FormatJson(FilterData, JsonData) {
      return JsonData.map((v) =>
        FilterData.map((j) => {
          return v[j];
        })
      );
    },
  },
  watch: {
    "$i18n.locale": "updateHeaderTitle"
  },
  created() {
    this.GetAllotment();
  },
  beforeMount() {
    this.updateHeaderTitle();
  },
  mounted() {
    // this.GetAllDivisions();
    this.GetAllowance();
    this.GetFinancial_Year();
  }
};
</script>
