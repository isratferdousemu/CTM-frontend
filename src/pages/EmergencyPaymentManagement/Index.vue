<template>
  <div id="emergency_allotment">
    <v-row class="ml-sm-5 mt-0">
      <v-col cols="12">
        <Spinner :loading="loading" />
        <!-- Search Panel Starts -->
        <v-expansion-panels>
          <v-expansion-panel class="ma-2">
            <v-expansion-panel-header color="#1c3b68">
              <template v-slot:actions>
                <v-icon color="white"> $expand </v-icon>
              </template>
              <h3 class="white--text text-uppercase">
                {{ $t("container.grievance_management.grievanceList.search") }}
              </h3>
            </v-expansion-panel-header>
            <v-expansion-panel-content class="elevation-0 transparent mt-10">
              <ValidationObserver ref="formsearch" v-slot="{ invalid }">
                <form @submit.prevent="submitsearch()">
                  <v-row>
                    <v-col lg="3" md="3" cols="12">
                      <ValidationProvider
                        name="emergency_payment_name"
                        vid="emergency_payment_name"
                        v-slot="{ errors }"
                      >
                        <v-autocomplete
                          v-model="data.emergency_payment_name"
                          class="no-arrow-icon"
                          :append-icon-cb="appendIconCallback"
                          append-icon="mdi-plus"
                          :hide-details="errors[0] ? false : true"
                          outlined
                          clearable
                          :label="
                            $t('container.emergency_payment.payment_name')
                          "
                          :items="payment_names"
                          :item-text="'emergency_payment_name'"
                          item-value="emergency_payment_name"
                          :error="errors[0] ? true : false"
                          :error-messages="
                            errors[0]
                              ? language === 'bn'
                                ? 'অনুগ্রহ করে জরুরি অর্থপ্রদানের নাম নির্বাচন করুন'
                                : 'Please select the emergency payment name'
                              : ''
                          "
                        ></v-autocomplete>
                      </ValidationProvider>
                    </v-col>
                    <v-col lg="3" md="3" cols="12">
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
                    <v-col lg="3" md="3" cols="12">
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
                  </v-row>
                  <!-- Action button -->
                  <div class="d-inline d-flex justify-end mt-2">
                    <v-btn
                      elevation="2"
                      class="btn mr-2"
                      @click="resetForm()"
                      >{{ $t("container.list.reset") }}</v-btn
                    >
                    <v-btn
                      elevation="2"
                      type="submit"
                      class="btn mr-2"
                      color="success"
                      >{{ $t("container.list.search") }}</v-btn
                    >
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
            <v-card elevation="10" color="white" rounded="md" theme="light">
              <v-card-title
                tag="div"
                style="
                  background-color: #1c3b68;
                  color: white;
                  margin-bottom: 17px;
                  font-size: 17px;
                "
              >
                <h3 class="white--text text-uppercase pt-3">
                  {{ $t("container.emergency_payment.list") }}
                </h3>
              </v-card-title>
              <!-- Data Table -->
              <v-card-text>
                <v-row justify="space-between" align="center">
                  <v-col lg="3" md="3" cols="12">
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
                  <v-col lg="3" md="3" cols="12" class="text-right">
                    <v-select
                      v-model="selectedColumns"
                      :items="selectableColumns"
                      :label="
                        $t(
                          'container.application_selection.application.select_column'
                        )
                      "
                      multiple
                      @change="updateVisibleColumns"
                      outlined
                      menu-props="top"
                    >
                      <template v-slot:selection="{ item, index }"> </template>
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
                      @keyup.native="getListData"
                      outlined
                      dense
                      v-model="search"
                      prepend-inner-icon="mdi-magnify"
                      class="my-sm-0 my-3 mx-0v -input--horizontal"
                      variant="outlined"
                      :label="$t('container.emergency_payment.search')"
                      hide-details
                      color="primary"
                    >
                    </v-text-field>
                  </div>
                  <div>
                    <v-btn
                      elevation="2"
                      class="btn mr-2 white--text"
                      color="red darken-4"
                      @click="generatePDF()"
                    >
                      <v-icon class="pr-1"> mdi-tray-arrow-down </v-icon>
                      {{ $t("container.list.PDF") }}
                    </v-btn>
                    <v-btn
                      elevation="2"
                      class="btn mr-2 white--text"
                      color="teal darken-2"
                      @click="generateExcel()"
                    >
                      <v-icon class="pr-1"> mdi-tray-arrow-down </v-icon>
                      {{ $t("container.list.excel") }}
                    </v-btn>
                    <v-btn
                      router
                      to="/emergency-payment/emergency-allotment/create"
                      color="primary"
                      prepend-icon="mdi-account-multiple-plus"
                    >
                      {{ $t("container.list.add_new") }}
                    </v-btn>
                  </div>

                  <v-col cols="12">
                    <v-data-table
                      :loading="loading"
                      item-key="id"
                      :headers="visibleHeaders"
                      :items="emergencyAllotments"
                      :items-per-page="pagination.perPage"
                      hide-default-footer
                      class="elevation-0 transparent row-pointer table-responsive"
                    >
                      <template v-slot:item.id="{ item, index }">
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
                              v-can="'emergency-allotment-edit'"
                              fab
                              x-small
                              v-on="on"
                              color="success"
                              elevation="0"
                              @click="editData(item)"
                            >
                              <v-icon> mdi-account-edit-outline </v-icon>
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
                              fab
                              x-small
                              v-on="on"
                              color="grey"
                              class="ml-3 white--text"
                              elevation="0"
                              @click="deleteData(item)"
                            >
                              <v-icon> mdi-delete </v-icon>
                            </v-btn>
                          </template>
                          <span> {{ $t("container.list.delete") }}</span>
                        </v-tooltip>
                      </template>
                      <!-- End Action Button -->
                      <!-- <template v-slot:footer="item">
                        <div
                          class="text-center pt-2 v-data-footer justify-center pb-2"
                        >
                          <v-select
                            style="
                              position: absolute;
                              right: 25px;
                              width: 149px;
                              transform: translate(0px, 0px);
                            "
                            :items="items"
                            hide-details
                            dense
                            outlined
                            @change="onPageChange"
                            v-model="pagination.perPage"
                          ></v-select>
                          <v-pagination
                            circle
                            primary
                            v-model="pagination.current"
                            :length="pagination.total"
                            @input="onPageChange"
                            :total-visible="11"
                            class="custom-pagination-item"
                          ></v-pagination>
                        </div>
                      </template> -->

                      <template v-slot:footer="item">
                        <v-container class="pa-0 py-0" fluid>
                          <v-row class="align-center" cols="12">
                            <v-col
                              cols="12"
                              lg="10"
                              md="10"
                              sm="4"
                              class="d-flex justify-center mb-2 mb-sm-0"
                            >
                              <v-pagination
                                circle
                                primary
                                v-model="pagination.current"
                                :length="pagination.total"
                                @input="onPageChange"
                                :total-visible="11"
                                class="custom-pagination-item"
                              ></v-pagination>
                            </v-col>
                            <v-col cols="12" lg="2" md="2" sm="4" class="">
                              <v-select
                                :items="items"
                                hide-details
                                dense
                                outlined
                                @change="onPageSetup"
                                v-model="pagination.perPage"
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
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ApiService from "@/services/ApiService";
import {
  extend,
  ValidationProvider,
  ValidationObserver,
  Validator,
} from "vee-validate";
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
  title: "CTM - Emergency Allotment",
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
        "program.name_en",
        "program.name_bn",
        "no_of_new_benificiariy",
        "no_of_existing_benificiariy",
        "amount_per_person",
        "starting_period",
        "closing_period",
      ], // Initially, first 6 columns are selected
      fixedColumns: ["id", "sl", "actions"], // Two columns that will always remain visible
    };
  },
  components: {
    ValidationProvider,
    ValidationObserver,
    Spinner,
  },
  computed: {
    headers() {
      return [
        {
          text: this.$t("container.emergency_payment.slNo"),
          value: "id",
          width: "20px",
        },
        {
          text: this.$t("container.emergency_payment.payment_name"),
          value: "emergency_payment_name",
          width: "180px",
        },
        {
          text: this.$t("container.emergency_payment.program_name"),
          value: this.language === "bn" ? "program.name_bn" : "program.name_en",
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
          width: "120px",
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
  created() {},
  mounted() {
    this.getListData();
    this.getPaymentName();
  },
  methods: {
    status(status) {
      if (status == 1) {
        return this.$i18n.locale == "en" ? "Active" : "সক্রিয়";
      } else {
        return this.$i18n.locale == "en" ? "Inactive " : "নিষ্ক্রিয়";
      }
    },
    async generatePDF() {
      this.isLoading = true;
      if (!this.sortBy) {
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
        this.$t("container.list.status"),
      ];

      const customInfo = this.emergencyAllotments.map((i, index) => {
        return [
          this.$i18n.locale == "en"
            ? index + 1
            : this.$helpers.englishToBangla(index + 1),
          i.emergency_payment_name,
          this.$i18n.locale === "bn" ? i.program.name_bn : i.program.name_en,
          this.$i18n.locale == "en"
            ? index + 1
            : this.$helpers.englishToBangla(i.no_of_new_benificiariy),
          this.$i18n.locale == "en"
            ? index + 1
            : this.$helpers.englishToBangla(i.no_of_existing_benificiariy),
          this.$i18n.locale == "en"
            ? index + 1
            : this.$helpers.englishToBangla(i.amount_per_person),
          i.payment_cycle,
          this.$i18n.locale == "en"
            ? index + 1
            : this.$helpers.englishToBangla(i.starting_period),
          this.$i18n.locale == "en"
            ? index + 1
            : this.$helpers.englishToBangla(i.closing_period),
          this.$i18n.locale == "en"
            ? this.status(i.status)
            : this.status(i.status),
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
            this.$t("container.list.status"),
          ];
          const customInfo = this.emergencyAllotments.map((i, index) => {
            return [
              this.$i18n.locale == "en"
                ? index + 1
                : this.$helpers.englishToBangla(index + 1),
              i.emergency_payment_name,
              this.$i18n.locale === "bn"
                ? i.program.name_bn
                : i.program.name_en,
              this.$i18n.locale == "en"
                ? index + 1
                : this.$helpers.englishToBangla(i.no_of_new_benificiariy),
              this.$i18n.locale == "en"
                ? index + 1
                : this.$helpers.englishToBangla(i.no_of_existing_benificiariy),
              this.$i18n.locale == "en"
                ? index + 1
                : this.$helpers.englishToBangla(i.amount_per_person),
              i.payment_cycle,
              this.$helpers.formatDate(i.starting_period, this.$i18n.locale),
              this.$helpers.formatDate(i.closing_period, this.$i18n.locale),
              this.$i18n.locale == "en"
                ? this.status(i.status)
                : this.status(i.status),
            ];
          });
          const fields = [
            "sl",
            "emergency_payment_name",
            "payment_cycle",
            "status",
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
    appendIcon() {
      return "mdi-plus"; // Use the appropriate Material Design Icons (MDI) class for the "+" icon
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

      if (checkLanguageEnglish != "English") {
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
      const queryParams = {
        searchText: this.search,
        perPage: this.pagination.perPage,
        page: this.pagination.current,
        sortBy: this.sortBy,
        sortDesc: this.sortDesc,
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
              this.$toast.success(res.data.message);
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
