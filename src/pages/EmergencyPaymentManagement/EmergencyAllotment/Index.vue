<template>
  <v-container fluid>
    <Spinner :loading="loading"/>
    <!-- Search Panel Starts -->
    <v-expansion-panels>
      <v-expansion-panel class="mb-2">
        <v-expansion-panel-header color="#1c3b68">
          <template v-slot:actions>
            <v-icon color="white"> $expand</v-icon>
          </template>
          <h3 class="white--text text-uppercase">
            {{ $t("container.emergency_payment.search") }}
          </h3>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="elevation-0 transparent mt-5">
          <ValidationObserver ref="form" v-slot="{ invalid }">
            <form @submit.prevent="submitsearch()">
              <v-row>
                <v-col cols="12" lg="4" md="4">
                  <ValidationProvider
                      v-slot="{ errors }"
                      name="emergency_payment_name"
                      rules="required"
                      vid="emergency_payment_name"
                  >
                    <v-autocomplete
                        v-model="data.emergency_payment_name"
                        :append-icon-cb="appendIconCallback"
                        :error="!!errors[0]"
                        :error-messages="
                            errors[0]
                              ? language === 'bn'
                                ? 'অনুগ্রহ করে জরুরি অর্থপ্রদানের নাম নির্বাচন করুন'
                                : 'Please select the emergency payment name'
                              : ''
                          "
                        :hide-details="!errors[0]"
                        :item-text="'emergency_payment_name'"
                        :items="payment_names"
                        :label="
                            $t('container.emergency_payment.payment_name')
                          "
                        append-icon="mdi-plus"
                        class="no-arrow-icon"
                        clearable
                        item-value="emergency_payment_name"
                        outlined
                    ></v-autocomplete>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" lg="4" md="4">
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
                            :error-messages="
                                errors[0]
                                  ? language === 'bn'
                                    ? 'অনুগ্রহ করে শুরুর সময়কাল লিখুন'
                                    : 'Please enter started period'
                                  : ''
                              "
                            :hide-details="!errors[0]"
                            :label="
                                $t(
                                  'container.emergency_payment.starting_period'
                                )
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
                <v-col cols="12" lg="4" md="4">
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
                            :error-messages="
                                errors[0]
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
              </v-row>
              <!-- Action button -->
              <div class="d-inline d-flex justify-end mt-2">
                <v-btn class="btn mr-2" elevation="2" @click="resetForm()"
                >{{ $t("container.list.reset") }}
                </v-btn>
                <v-btn
                    :disabled="invalid"
                    class="btn mr-2"
                    color="success"
                    elevation="2"
                    type="submit"
                >{{ $t("container.list.search") }}
                </v-btn>
              </div>
            </form>
          </ValidationObserver>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <!-- Search Panel Ends -->
    <!--Table header & Body part -->
    <v-row>
      <v-col cols="12">
        <v-card color="white" elevation="10" rounded="md" theme="light">
          <v-card-title class="component-title mb-5">
            <div class="clearfix">
              <div class="title-left">
                <h4 class="title-text">
                  {{
                    $t("container.emergency_payment.list")
                  }}
                </h4>
              </div>
            </div>
          </v-card-title>
          <!-- Data Table -->
          <v-card-text>
            <v-row align="center" justify="space-between">
              <v-col cols="12" lg="3" md="3">
                {{ $t("container.list.total") }}:&nbsp;<span
                  style="font-weight: bold"
              >
                      {{
                  language === "bn"
                      ? $helpers.englishToBangla(this.total)
                      : this.total
                }}
                    </span>
              </v-col>
              <v-col class="text-right" cols="12" lg="3" md="3">
                <v-select
                    v-model="selectedColumns"
                    :items="selectableColumns"
                    :label="
                        $t(
                          'container.application_selection.application.select_column'
                        )
                      "
                    menu-props="top"
                    multiple
                    outlined
                    @change="updateVisibleColumns"
                >
                  <template v-slot:selection="{ item, index }"></template>
                </v-select>
              </v-col>
            </v-row>

            <!-- data table -->
            <v-row
                class="ma-0 pa-0 white round-border d-flex justify-space-between align-center"
                justify="space-between"
            >
              <div class="d-flex justify-sm-end flex-wrap">
                <v-text-field
                    v-model="search"
                    :label="$t('container.emergency_payment.search')"
                    class="my-sm-0 my-3 mx-0v -input--horizontal"
                    color="primary"
                    dense
                    hide-details
                    outlined
                    prepend-inner-icon="mdi-magnify"
                    variant="outlined"
                    @keyup.native="getListData"
                >
                </v-text-field>
              </div>
              <div>
                <v-btn
                    class="btn mr-2 white--text"
                    color="red darken-4"
                    elevation="2"
                    @click="generatePDF()"
                >
                  <v-icon class="pr-1"> mdi-tray-arrow-down</v-icon>
                  {{ $t("container.list.PDF") }}
                </v-btn>
                <v-btn
                    class="btn mr-2 white--text"
                    color="teal darken-2"
                    elevation="2"
                    @click="generateExcel()"
                >
                  <v-icon class="pr-1"> mdi-tray-arrow-down</v-icon>
                  {{ $t("container.list.excel") }}
                </v-btn>
                <v-btn
                    class="my-2"
                    color="primary"
                    router
                    to="/emergency-payment/emergency-allotment/create"
                >
                  <v-icon class="pr-1"> mdi-plus</v-icon>
                  {{ $t("container.list.add_new") }}
                </v-btn>
              </div>

              <v-col cols="12">
                <v-data-table
                    :headers="visibleHeaders"
                    :items="emergencyAllotments"
                    :items-per-page="pagination.perPage"
                    :loading="loading"
                    class="elevation-0 transparent row-pointer table-responsive"
                    hide-default-footer
                    item-key="id"
                >
                  <template v-slot:item.sl="{ item, index }">
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
                  <!-- Programs Template -->
                  <template v-slot:item.programs="{ item }">
                    <div v-if="item.programs && item.programs.length">
                      <div v-for="program in item.programs" :key="program.id">
                        {{ getItemText(program) }}
                      </div>
                    </div>
                  </template>
                  <template v-slot:item.no_of_new_benificiariy="{ item }">
                    {{
                      language === "bn"
                          ? $helpers.englishToBangla(
                              item.no_of_new_benificiariy
                          )
                          : item.no_of_new_benificiariy
                    }}
                  </template>
                  <template
                      v-slot:item.no_of_existing_benificiariy="{ item }"
                  >
                    {{
                      language === "bn"
                          ? $helpers.englishToBangla(
                              item.no_of_existing_benificiariy
                          )
                          : item.no_of_existing_benificiariy
                    }}
                  </template>
                  <template v-slot:item.amount_per_person="{ item }">
                    {{
                      language === "bn"
                          ? $helpers.englishToBangla(item.amount_per_person)
                          : item.amount_per_person
                    }}
                  </template>
                  <template v-slot:item.starting_period="{ item }">
                    {{
                      language === "bn"
                          ? $helpers.englishToBangla(item.starting_period)
                          : item.starting_period
                    }}
                  </template>
                  <template v-slot:item.closing_period="{ item }">
                    {{
                      language === "bn"
                          ? $helpers.englishToBangla(item.closing_period)
                          : item.closing_period
                    }}
                  </template>

                  <!-- Action Button -->

                  <template v-slot:item.actions="{ item }">
                    <v-tooltip top>
                      <template v-slot:activator="{ on }">
                        <v-btn
                            v-can="'emergency-allotment-view'"
                            color="success"
                            elevation="0"
                            fab
                            x-small
                            @click="manageBeneficiary(item)"
                            v-on="on"
                        >
                          <v-icon> mdi-eye</v-icon>
                        </v-btn>
                      </template>
                      <span>
                            {{ $t("container.list.manage_beneficary") }}
                          </span>
                    </v-tooltip>
                    <v-tooltip top>
                      <template v-slot:activator="{ on }">
                        <v-btn
                            v-can="'emergency-allotment-edit'"
                            class="ml-2 white--text"
                            color="success"
                            elevation="0"
                            fab
                            x-small
                            @click="editData(item)"
                            v-on="on"
                        >
                          <v-icon> mdi-account-edit-outline</v-icon>
                        </v-btn>
                      </template>
                      <span>
                            {{ $t("container.list.edit") }}
                          </span>
                    </v-tooltip>

                    <v-tooltip top>
                      <template v-slot:activator="{ on }">
                        <v-btn
                            v-can="'delete-division'"
                            class="ml-2 white--text"
                            color="grey"
                            elevation="0"
                            fab
                            x-small
                            @click="deleteData(item)"
                            v-on="on"
                        >
                          <v-icon> mdi-delete</v-icon>
                        </v-btn>
                      </template>
                      <span> {{ $t("container.list.delete") }}</span>
                    </v-tooltip>
                  </template>
                  <!-- End Action Button -->
                  <template v-slot:footer="item">
                    <v-container class="pa-0 py-0" fluid>
                      <v-row class="align-center" cols="12">
                        <v-col
                            class="d-flex justify-center mb-2 mb-sm-0"
                            cols="12"
                            lg="10"
                            md="10"
                            sm="4"
                        >
                          <v-pagination
                              v-model="pagination.current"
                              :length="pagination.total"
                              :total-visible="11"
                              circle
                              class="custom-pagination-item"
                              primary
                              @input="onPageChange"
                          ></v-pagination>
                        </v-col>
                        <v-col class="" cols="12" lg="2" md="2" sm="4">
                          <v-select
                              v-model="pagination.perPage"
                              :items="items"
                              dense
                              hide-details
                              outlined
                              @change="onPageSetup"
                          ></v-select>
                        </v-col>
                      </v-row>
                    </v-container>
                  </template>
                </v-data-table>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ApiService from "@/services/ApiService";
import { extend, ValidationObserver, ValidationProvider } from "vee-validate";
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
  name: "Index",
  title: "CTM - Emergency Allotment List",
  components: {
    ValidationProvider,
    ValidationObserver,
    Spinner,
  },
  data() {
    return {
      data: {
        payment_name: null,
        starting_period: null,
        closing_period: null,
      },
      loading: false,
      emergencyAllotments: [],
      payment_names: [],
      search: "",
      sortBy: "emergency_payment_name",
      sortDesc: false, //ASC
      total: null,
      pagination: {
        current: 1,
        total: 0,
        perPage: 5,
      },
      items: [5, 10, 15, 20, 40, 50, 100],
      selectedColumns: [
        "emergency_payment_name",
        "programs",
        "no_of_new_benificiariy",
        "no_of_existing_benificiariy",
        "amount_per_person",
        "starting_period",
        "closing_period",
      ], // Initially, first 6 columns are selected
      fixedColumns: ["sl", "actions"], // Two columns that will always remain visible
    };
  },

  computed: {
    headers() {
      return [
        {
          text: this.$t("container.emergency_payment.slNo"),
          value: "sl",
          width: "20px",
          fixed: true,
        },
        {
          text: this.$t("container.emergency_payment.payment_name"),
          value: "emergency_payment_name",
          width: "180px",
        },
        {
          text: this.$t("container.emergency_payment.program_name"),
          value: "programs",
          class: "highlight-column",
          width: "250px",
        },
        {
          text: this.$t("container.emergency_payment.no_of_new_benificiary"),
          value: "no_of_new_benificiariy",
        },
        {
          text: this.$t(
              "container.emergency_payment.no_of_existing_benificiary"
          ),
          value: "no_of_existing_benificiariy",
        },
        {
          text: this.$t("container.emergency_payment.per_person_amount"),
          value: "amount_per_person",
        },
        // {
        //   text: this.$t("container.emergency_payment.payment_cycle"),
        //   value: "payment_cycle",
        // },
        {
          text: this.$t("container.emergency_payment.starting_period"),
          value: "starting_period",
        },
        {
          text: this.$t("container.emergency_payment.closing_period"),
          value: "closing_period",
        },
        {
          text: this.$t("container.list.action"),
          value: "actions",
          sortable: false,

          fixed: true,
        },
      ];
    },
    language: {
      get() {
        return this.$store.getters.getAppLanguage;
      },
    },
    visibleHeaders() {
      // Combine fixed columns and selected columns
      const allVisibleColumns = [...this.fixedColumns, ...this.selectedColumns];

      // Filter the headers based on the visible columns
      return this.headers.filter((column) =>
          allVisibleColumns.includes(column.value)
      );
    },
    selectableColumns() {
      // Filter the columns that can be selected (exclude fixed columns)
      return this.headers.filter((column) => !column.fixed);
    },
  },
  created() {
  },
  mounted() {
    this.getListData();
    this.getPaymentName();
  },
  methods: {
    manageBeneficiary(item) {
      this.$router.push({
        path: `/emergency-payment/manage-emergency-beneficiary`,
      });
    },
    status(status) {
      if (status === 1) {
        return this.$i18n.locale === "en" ? "Active" : "সক্রিয়";
      } else {
        return this.$i18n.locale === "en" ? "Inactive " : "নিষ্ক্রিয়";
      }
    },
    async generatePDF() {
      this.isLoading = true;
      if (!this.sortBy) {
        let page;
        page = this.pagination.current;
      }
      const headerInfo = [
        this.$t("container.list.sl"),
        this.$t("container.emergency_payment.payment_name"),
        this.$t("container.emergency_payment.program_name"),
        this.$t("container.emergency_payment.no_of_new_benificiary"),
        this.$t("container.emergency_payment.no_of_existing_benificiary"),
        this.$t("container.emergency_payment.per_person_amount"),
        this.$t("container.emergency_payment.payment_cycle"),
        this.$t("container.emergency_payment.starting_period"),
        this.$t("container.emergency_payment.closing_period"),
        // this.$t("container.list.status"),
      ];

      const customInfo = this.emergencyAllotments.map((i, index) => {
        return [
          this.$i18n.locale === "en"
              ? index + 1
              : this.$helpers.englishToBangla(index + 1),
          i.emergency_payment_name,
          this.$i18n.locale === "bn" ? i.programs[0].name_bn : i.programs[0].name_en,
          this.$i18n.locale === "en"
              ? i.no_of_new_benificiariy
              : this.$helpers.englishToBangla(i.no_of_new_benificiariy),
          this.$i18n.locale === "en"
              ? i.no_of_existing_benificiariy
              : this.$helpers.englishToBangla(i.no_of_existing_benificiariy),
          this.$i18n.locale === "en"
              ? i.amount_per_person
              : this.$helpers.englishToBangla(i.amount_per_person),
          i.payment_cycle,
          this.$i18n.locale === "en"
              ? i.starting_period
              : this.$helpers.englishToBangla(i.starting_period),
          this.$i18n.locale === "en"
              ? i.closing_period
              : this.$helpers.englishToBangla(i.closing_period),
          // this.$i18n.locale == "en"
          //   ? this.status(i.status)
          //   : this.status(i.status),
        ];
      });

      const queryParam = {
        language: this.$i18n.locale,
        data: customInfo,
        header: headerInfo,
        fileName: this.$t("container.emergency_payment.list"),
      };
      try {
        const response = await this.$axios.post(
            "/admin/generate-pdf",
            queryParam,
            {
              headers: {
                Authorization: "Bearer " + this.$store.state.token,
                "Content-Type": "application/json", // Set content type to JSON
              },
              responseType: "arraybuffer",
            }
        );

        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);
        window.open(url, "_blank");
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        console.error("Error generating PDF:", error);
      }
    },
    async generateExcel() {
      this.isLoading = true;
      let page;
      if (!this.sortBy) {
        page = this.pagination.current;
      }

      try {
        import("@/plugins/Export2Excel").then((excel) => {
          const headerInfo = [
            this.$t("container.list.sl"),
            this.$t("container.emergency_payment.payment_name"),
            this.$t("container.emergency_payment.program_name"),
            this.$t("container.emergency_payment.no_of_new_benificiary"),
            this.$t("container.emergency_payment.no_of_existing_benificiary"),
            this.$t("container.emergency_payment.per_person_amount"),
            this.$t("container.emergency_payment.payment_cycle"),
            this.$t("container.emergency_payment.starting_period"),
            this.$t("container.emergency_payment.closing_period"),
            // this.$t("container.list.status"),
          ];
          const customInfo = this.emergencyAllotments.map((i, index) => {
            return [
              this.$i18n.locale == "en"
                  ? index + 1
                  : this.$helpers.englishToBangla(index + 1),
              i.emergency_payment_name,
              this.$i18n.locale === "bn" ? i.programs[0].name_bn : i.programs[0].name_en,
              this.$i18n.locale == "en"
                  ? i.no_of_new_benificiariy
                  : this.$helpers.englishToBangla(i.no_of_new_benificiariy),
              this.$i18n.locale == "en"
                  ? i.no_of_existing_benificiariy
                  : this.$helpers.englishToBangla(i.no_of_existing_benificiariy),
              this.$i18n.locale == "en"
                  ? i.amount_per_person
                  : this.$helpers.englishToBangla(i.amount_per_person),
              i.payment_cycle,
              this.$helpers.formatDate(i.starting_period, this.$i18n.locale),
              this.$helpers.formatDate(i.closing_period, this.$i18n.locale),
              // this.$i18n.locale == "en"
              //   ? this.status(i.status)
              //   : this.status(i.status),
            ];
          });
          const fields = [
            "sl",
            "emergency_payment_name",
            "payment_cycle",
            // "status",
          ];

          // const data = this.FormatJson(fields, customInfo);
          const currentDate = new Date().toISOString().slice(0, 10); //
          let dateinfo =
              this.language == "en"
                  ? currentDate
                  : this.$helpers.englishToBangla(currentDate);

          const filenameWithDate = `${dateinfo}_${this.$t(
              "container.emergency_payment.list"
          )}`;

          excel.export_json_to_excel({
            header: headerInfo,
            data: customInfo,
            sheetName: filenameWithDate,
            filename: filenameWithDate,
            autoWidth: true,
            bookType: "xlsx",
          });
        });
      } catch (error) {
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
    onPageSetup($event) {
      this.pagination.current = 1;
      this.getListData();
    },
    appendIconCallback() {
      // Handle the click event for the custom append icon here
      return "mdi-minus";
    },
    submitsearch() {
      this.getListData();
    },
    updateVisibleColumns() {
      // Triggered when the selected columns change
      // Update the visibleHeaders based on the selected columns
      this.visibleHeaders = this.headers.filter((column) =>
          this.selectedColumns.includes(column.value)
      );
    },
    checkLanguage() {
      let checkLanguageEnglish = this.$checkLanguage(this.data.title_en);
      let checkLanguageBangla = this.$checkLanguage(this.data.title_bn);
      let errs = {};

      if (
          checkLanguageBangla !== "Bangla" &&
          checkLanguageBangla !== "BanglaSpecialChar"
      ) {
        errs.title_bn = ["Please Enter in Bangla Language in this Field"];
      }

      if (checkLanguageEnglish !== "English") {
        errs.title_en = ["Please Enter in English Language in this Field"];
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
    onPageChange($event) {
      this.getListData();
    },
    editData(item) {
      this.$router.push({
        path: `/emergency-payment/emergency-allotment/edit/${item.id}`,
      });
    },
    getListData() {
      this.search = this.search.replace(/%/g, "");
      this.loading = true;
      const queryParams = {
        searchText: this.search,
        perPage: this.pagination.perPage,
        page: this.pagination.current,
        sortBy: this.sortBy,
        sortDesc: this.sortDesc,
        emergency_payment_name: this.data.emergency_payment_name,
        started_period: this.data.starting_period,
        closing_period: this.data.closing_period,
      };

      this.$axios
          .get("/admin/emergency/allotments", {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "application/json",
            },
            params: queryParams,
          })
          .then((result) => {
            console.log(result.data.data);
            this.total = result?.data?.meta?.total;
            this.emergencyAllotments = result.data.data;
            this.pagination.current = result.data.meta.current_page;
            this.pagination.total = result.data.meta.last_page;
            this.pagination.grand_total = result.data.meta.total;
            this.loading = false;
          });
    },
    getPaymentName() {
      var queryData = {
        table_name: "emergency_allotments",
        field_name: ["id", "emergency_payment_name"],
        condition: { status: 1, deleted_at: null },
      };
      ApiService.getDropData("global/common-dropdown", queryData)
          .then((res) => {
            console.log(res);
            this.payment_names = res.data;
          })
          .catch((error) => console.log(error));
    },
    async deleteData(item) {
      this.$swal
          .fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true,
            confirmButtonColor: "#1C3B68",
            cancelButtonColor: "#d33",
          })
          .then(async (result) => {
            if (result.isConfirmed) {
              const res = await ApiService.delete(
                  "admin/emergency/allotments/" + item.id
              );
              if (res?.data?.success) {
                this.$toast.success(this.language === 'en' ? res.data.message : "জরুরী বরাদ্দ সফলভাবে মুছে ফেলা হয়েছে");
                this.getListData();
              } else {
                this.$toast.error(res.data.message);
              }
            } else if (result.dismiss === this.$swal.DismissReason.cancel) {
              this.$swal.fire(
                  "Cancelled",
                  "Your imaginary file is safe :)",
                  "error"
              );
            }
          });
    },
    resetForm() {
      this.data = {};
      this.payment_names = [];
      this.emergencyAllotments = [];
      this.getListData();
      this.getPaymentName();
    },
    getItemText(item) {
      return this.language === "bn" ? item.name_bn : item.name_en;
    },
  },
  watch: {
    "$i18n.locale": "updateHeaderTitle",
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
</style>
