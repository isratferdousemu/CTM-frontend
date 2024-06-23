<template>
  <div id="payment_processor">
    <v-row class="mx-5 mt-4">
      <v-col cols="12">
        <v-row>
          <v-col cols="12">
            <v-card
              elevation="10"
              color="white"
              rounded="md"
              theme="light"
              class="mb-8"
            >
              <v-card-title
                class="justify-center"
                tag="div"
                style="background-color: #1c3b68; color: white"
              >
                <h3>
                  {{
                    $t(
                      "container.emergency_payment.emergency_supplementary_payroll.header"
                    )
                  }}
                </h3>
              </v-card-title>
              <v-card-text>
                <v-row
                  class="ma-0 pa-3 white round-border d-flex justify-space-between align-center"
                  justify="center"
                  justify-lg="space-between"
                >
                  <div class="d-flex justify-sm-end flex-wrap">
                    <v-text-field
                      @keyup.native="getData"
                      outlined
                      dense
                      v-model="search"
                      prepend-inner-icon="mdi-magnify"
                      class="my-sm-0 my-3 mx-0v -input--horizontal"
                      flat
                      variant="outlined"
                      :label="$t('container.list.search')"
                      hide-details
                      color="primary"
                    >
                    </v-text-field>
                  </div>

                  <div class="d-flex flex-column align-items-end ml-auto mb-4">
                    <div class="d-flex ml-auto">
                      <v-btn
                        elevation="2"
                        class="btn mr-2 white--text"
                        color="red darken-4"
                        @click="GeneratePDF()"
                      >
                        <v-icon class="pr-1">mdi-tray-arrow-down</v-icon>
                        {{ $t("container.list.PDF") }}
                      </v-btn>
                      <v-btn
                        elevation="2"
                        class="btn mr-2 white--text"
                        color="teal darken-2"
                        @click="GenerateExcel()"
                      >
                        <v-icon class="pr-1">mdi-tray-arrow-down</v-icon>
                        {{ $t("container.list.excel") }}
                      </v-btn>
                    </div>
                  </div>

                  <v-col cols="12" class="mt-6">
                    <v-data-table
                      :loading="loading"
                      item-key="id"
                      :headers="headers"
                      :items="values"
                      :items-per-page="pagination.perPage"
                      hide-default-footer
                      class="elevation-0 transparent row-pointer"
                    >
                      <template v-slot:item.id="{ item, index }">
                        {{
                          language === "bn"
                            ? englishToBanglaNumber(
                                (pagination.current - 1) * pagination.perPage +
                                  index +
                                  1
                              )
                            : (pagination.current - 1) * pagination.perPage +
                              index +
                              1
                        }}
                      </template>
                      <template v-slot:item.charge="{ item }">
                        {{ item.charge }}%
                      </template>

                      <!-- Action Button -->
                      <!-- <template v-slot:item.actions="{ item }">
                        <div class="action-buttons">
                          <v-tooltip top>
                            <template v-slot:activator="{ on }">
                              <v-btn
                                fab
                                x-small
                                v-on="on"
                                color="blue"
                                class="white--text"
                                elevation="0"
                                @click="openModal(item)"
                              >
                                <v-icon>mdi-send-outline</v-icon>
                              </v-btn>
                            </template>
                            <span>{{ $t("container.list.send") }}</span>
                          </v-tooltip>
                        </div>
                      </template> -->
                      <!-- End Action Button -->

                      <template v-slot:footer="item">
                        <v-container class="pa-0 mt-4" fluid>
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

    <v-dialog v-model="showModal" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">{{
            $t("container.emergency_payment.select_items_to_send")
          }}</span>
        </v-card-title>
        <v-card-text>
          <v-data-table
            :headers="modalHeaders"
            :items="modalItems"
            item-key="id"
            :items-per-page="5"
            class="elevation-1"
          >
            <template v-slot:item.checkbox="{ item }">
              <v-checkbox v-model="selectedItems" :value="item.id"></v-checkbox>
            </template>
          </v-data-table>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="sendSelectedItems">{{
            $t("container.list.send")
          }}</v-btn>
          <v-btn color="grey" text @click="showModal = false">{{
            $t("container.list.cancel")
          }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { extend, ValidationProvider, ValidationObserver } from "vee-validate";
import { required, email } from "vee-validate/dist/rules";
export default {
  name: "Index",
  title: "Emergency Supplementary",
  data() {
    return {
      filter: false,
      dialogAdd: false,
      onEdit: false,
      deleteDialog: false,
      dialogEdit: false,
      delete_loading: false,
      loading: false,
      search: "",
      delete_id: "",

      values: [],

      errors: {},
      error_status: {},
      pagination: {
        current: 1,
        total: 0,
        perPage: 10,
      },
      items: [5, 10, 15, 20, 40, 50, 100],
      showModal: false,
      modalItems: [],
      selectedItems: [],
      modalHeaders: [
        {
          text: this.$t("container.list.select"),
          value: "checkbox",
          align: "center",
          sortable: false,
        },
        { text: this.$t("container.list.name"), value: "name" },
        { text: this.$t("container.list.status"), value: "status" },
      ],
    };
  },
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  computed: {
    headers() {
      return [
        {
          text: this.$t("container.list.sl"),
          value: "id",
          align: "start",
          sortable: false,
        },
        // {
        //   text: this.$t("container.payroll_management_v2.allotment_area_wise_ben_send_preview.program_name"),
        //   value: "processor_type",
        //   align: "center",
        // },
        // {
        //   text: this.$t("container.system_config.demo_graphic.financial_year.financial_year"),
        //   value: "name_en",
        // },
        {
          text: this.$t("container.emergency_payment.payment_cycle"),
          value: "cycle_id",
        },
        {
          text: this.$t(
            "container.emergency_payment.emergency_supplementary_payroll.awaiting_correction"
          ),
          value: "cycle_details.failed_count",
        },
        {
          text: this.$t(
            "container.emergency_payment.emergency_supplementary_payroll.revised_beneficiary"
          ),
          value: "cycle_details.resubmitted_count",
        },
        {
          text: this.$t(
            "container.emergency_payment.emergency_supplementary_payroll.total"
          ),
          value: "cycle_details.status_total",
        },
        // {
        //   text: this.$t("container.list.action"),
        //   value: "actions",
        //   sortable: false,
        // },
      ];
    },
    language: {
      get() {
        return this.$store.getters.getAppLanguage;
      },
    },

    translatedPagination() {
      return {
        ...this.pagination,
        current:
          this.language === "bn"
            ? englishToBanglaNumber(this.pagination.current)
            : this.pagination.current,
        total:
          this.language === "bn"
            ? englishToBanglaNumber(this.pagination.total)
            : this.pagination.total,
      };
    },
  },

  methods: {
    openModal(item) {
      this.showModal = true;
      // this.modalItems = item.details;
    },
    sendSelectedItems() {
      console.log(this.selectedItems);
      this.showModal = false;
    },

    async GeneratePDF() {
      // this.isLoading = true;
      const queryParams = {
        search: this.search,
        perPage: this.pagination.perPage,
        page: this.pagination.current,
        sortBy: this.sortBy,
        sortDesc: this.sortDesc,
      };

      await this.$axios
        .get("/admin/payroll/emergency-supplementary-payroll", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
          params: queryParams,
        })
        .then((result) => {
          this.values = result.data?.data;
        });

      const HeaderInfo = [
        this.$t("container.list.sl"),
        this.$t("container.emergency_payment.payment_cycle"),
        this.$t(
          "container.emergency_payment.emergency_supplementary_payroll.awaiting_correction"
        ),
        this.$t(
          "container.emergency_payment.emergency_supplementary_payroll.revised_beneficiary"
        ),
        this.$t(
          "container.emergency_payment.emergency_supplementary_payroll.total"
        ),
      ];

      const CustomInfo = this.values.map((i, index) => {
        return [
          this.language == "en"
            ? index + 1
            : this.$helpers.englishToBangla(index + 1),
          i.cycle_id,
          i.cycle_details.failed_count,
          i.cycle_details.resubmitted_count,
          i.cycle_details.status_total,
        ];
      });

      const queryParam = {
        language: this.$i18n.locale,
        data: CustomInfo,
        header: HeaderInfo,
        fileName: this.$t(
          "container.emergency_payment.emergency_supplementary_payroll.header"
        ),
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

    //generate excel
    async GenerateExcel() {
      const queryParams = {
        search: this.search,
        perPage: this.pagination.perPage,
        page: this.pagination.current,
        sortBy: this.sortBy,
        sortDesc: this.sortDesc,
      };

      await this.$axios
        .get("/admin/payroll/emergency-supplementary-payroll", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
          params: queryParams,
        })
        .then((result) => {
          this.values = result?.data?.data;
          import("@/plugins/Export2Excel").then((excel) => {
            const HeaderInfo = [
              this.$t("container.list.sl"),
              this.$t("container.emergency_payment.payment_cycle"),
              this.$t(
                "container.emergency_payment.emergency_supplementary_payroll.awaiting_correction"
              ),
              this.$t(
                "container.emergency_payment.emergency_supplementary_payroll.revised_beneficiary"
              ),
              this.$t(
                "container.emergency_payment.emergency_supplementary_payroll.total"
              ),
            ];

            const CustomInfo = this.values.map((i, index) => {
              return {
                SL:
                  this.language == "en"
                    ? index + 1
                    : this.$helpers.englishToBangla(index + 1),
                "Payment Cycle": i.cycle_id,
                "Awaiting Correction": i.cycle_details.failed_count,
                "Revised Beneficiary": i.cycle_details.resubmitted_count,
                Total: i.cycle_details.status_total,
              };
            });

            const Field = [
              "SL",
              "Payment Cycle",
              "Awaiting Correction",
              "Revised Beneficiary",
              "Total",
            ];

            const Item = this.FormatJson(Field, CustomInfo);
            const currentDate = new Date().toISOString().slice(0, 10); //
            let dateinfo =
              queryParams.language == "en"
                ? currentDate
                : this.$helpers.englishToBangla(currentDate);

            const filenameWithDate = `${dateinfo}_${this.$t(
              "container.emergency_payment.emergency_supplementary_payroll.header"
            )}`;

            excel.export_json_to_excel({
              header: HeaderInfo,
              data: Item,
              sheetName: "",
              filename: filenameWithDate,
              autoWidth: true,
              bookType: "xlsx",
            });
          });
        });
    },

    FormatJson(FilterData, JsonData) {
      return JsonData.map((v) =>
        FilterData.map((j) => {
          return v[j];
        })
      );
    },

    englishToBanglaNumber(number) {
      const banglaNumbers = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
      return number.toString().replace(/\d/g, (digit) => banglaNumbers[digit]);
    },

    createDialog() {
      if (this.$refs.formAdd) {
        this.$refs.formAdd.reset();
      }
      this.resetForm();
      this.dialogAdd = true;
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

    async getData() {
      const queryParams = {
        search: this.search,
        //dropdown filter
        filter: this.filter,
        perPage: this.pagination.perPage,
        page: this.pagination.current,
        sortBy: this.sortBy,
        sortDesc: this.sortDesc,
      };
      try {
        const response = await this.$axios.get(
          "/admin/payroll/emergency-supplementary-payroll",
          {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
            params: queryParams,
          }
        );
        if (response.status == "200") {
          this.values = response.data.data;
          this.pagination.current = response?.data?.current_page;
          this.pagination.total = response?.data?.last_page;
          this.pagination.grand_total = response?.data?.total;
          this.loading = false;
          this.filter = false;
        } else {
          this.$toast.error("Something went wrong");
          this.filter = false;
        }
      } catch (error) {
        console.error("Error fetching divisions:", error);
        this.filter = false;
      }
    },

    onPageChange($event) {
      this.getData();
    },

    onPageSetup($event) {
      this.pagination.current = 1;
      this.getData();
    },

    updateHeaderTitle() {
      const title = this.$t("container.payroll_management.list");
      this.$store.commit("setHeaderTitle", title);
    },
  },
  watch: {
    "$i18n.locale": "updateHeaderTitle",
  },
  created() {
    this.getData();
  },
  beforeMount() {
    this.updateHeaderTitle();
  },
};
</script>

<style scoped>
.action-buttons {
  display: flex;
  gap: 10px;
}
.table-header {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
