<template>
  <v-container>
    <v-row class="ml-sm-5 mt-0">
      <v-col cols="12">
        <Spinner :loading="loading"/>
        <!--Search Panel -->
        <v-row>
          <v-col cols="12">
            <v-card color="white" elevation="10" rounded="md" theme="light">
              <v-card-title
                  style="
                  background-color: #1c3b68;
                  color: white;
                  margin-bottom: 17px;
                  font-size: 17px;
                "
                  tag="div"
              >
                <h3 class="white--text text-uppercase pt-3">
                  {{
                    $t("container.list.manage_beneficary")
                  }}
                </h3>
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
                    <v-autocomplete
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
                    </v-autocomplete>
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
                        :label="
                        $t(
                          'container.emergency_payment.emergency_beneficiary.search'
                        )
                      "
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
                        color="primary"
                        @click="getNewBeneficiary"
                    >
                      <v-icon class="pr-1"> mdi-plus</v-icon>
                      {{ $t("container.list.add_beneficiary") }}
                    </v-btn>
                    <v-btn
                        class="ml-2"
                        color="success"
                        @click="getExistingBeneficiary"
                    >
                      <v-icon class="pr-1"> mdi-plus</v-icon>
                      {{ $t("container.list.existing") }}
                    </v-btn>
                  </div>
                  <!--Data table-->
                  <v-col cols="12">
                    <v-data-table
                        :headers="visibleHeaders"
                        :items="emergencyBeneficiaries"
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
                      <template v-slot:item.current_mobile="{ item }">
                        {{
                          language === "bn"
                              ? $helpers.englishToBangla(item.current_mobile)
                              : item.current_mobile
                        }}
                      </template>
                      <template v-slot:item.status="{ item }">
                        <span v-if="item.status === 1">
                          {{ language === "bn" ? "সক্রিয়" : "Active" }}
                        </span>
                        <span v-if="item.status === 2">
                          {{ language === "bn" ? "নিষ্ক্রিয়" : "Inactive" }}
                        </span>
                        <span v-if="item.status === 3">
                          {{ language === "bn" ? "অপেক্ষেয়মান" : "Waiting" }}
                        </span>
                      </template>

                      <!-- Action Button -->

                      <template v-slot:item.actions="{ item }">
                        <v-tooltip top>
                          <template v-slot:activator="{ on }">
                            <v-btn
                                v-can="'delete-division'"
                                class="ml-3 white--text"
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
                              <v-autocomplete
                                  v-model="pagination.perPage"
                                  :items="items"
                                  dense
                                  hide-details
                                  outlined
                                  @change="onPageSetup"
                              >

                              </v-autocomplete>
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
  </v-container>
</template>

<script>
import {mapActions, mapState} from "vuex";
import {extend, ValidationObserver, ValidationProvider} from "vee-validate";
import {required} from "vee-validate/dist/rules";
import Spinner from "@/components/Common/Spinner.vue";

extend("required", required);

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
  name: "ManageBeneficiary",
  title: "CTM - Manage Emergency Beneficiary List",
  components: {
    ValidationProvider,
    ValidationObserver,
    Spinner,

  },
  data() {
    return {
      data: {
        program_id: null,
        division_id: null,
        district_id: null,
        location_type: null,
        sub_location_type: null,
        city_id: null,
        district_pouro_id: null,
        thana_id: null,
        union_id: null,
        ward_id: null,
        beneficiary_id: null,
        nominee_name: null,
        account_number: null,
        nid: null,
        status: null,
      },
      user_permission: {
        division: null,
        division_name: null,
        district: null,
        district_name: null,
        location_type: null,
        location_type_name: null,
        upazila: null,
        upazila_name: null,
        city_corp: null,
        city_corp_name: null,
        district_pourashava: null,
        district_pourashava_name: null,
      },
      programs: [],
      districts: [],
      locationType: [],
      thanas: [],
      cities: [],
      unions: [],
      wards: [],
      district_pouros: [],
      loading: false,
      advanch_search: false,
      emergencyBeneficiaries: [],
      payment_names: [],
      search: "",
      sortBy: "name_en",
      sortDesc: false, //ASC
      total: null,
      pagination: {
        current: 1,
        total: 0,
        perPage: 5,
      },
      items: [5, 10, 15, 20, 40, 50, 100],
      selectedColumns: [
        "beneficiary_id",
        "name_en",
        "father_name_en",
        "emergency_allotment.emergency_payment_name",
        "current_mobile",
        "status",
      ], // Initially, first 8 columns are selected

      fixedColumns: ["sl", "actions"], // Two columns that will always remain visible
    };
  },
  computed: {
    headers() {
      return [
        {text: this.$t("container.list.sl"), value: "sl", fixed: true},
        {
          text: this.$t(
              "container.beneficiary_management.beneficiary_list.beneficiary_id"
          ),
          value: "beneficiary_id",
        },
        {
          text: this.$t("container.list.name_en"),
          value: "name_en",
        },
        {
          text: this.$t("container.list.name_bn"),
          value: "name_bn",
        },
        {
          text: this.$t(
              "container.application_selection.application.father_name_en"
          ),
          value: "father_name_en",
        },
        {
          text: this.$t(
              "container.application_selection.application.father_name_bn"
          ),
          value: "father_name_bn",
        },
        {
          text: this.$t(
              "container.application_selection.application.mother_name_en"
          ),
          value: "mother_name_en",
        },
        {
          text: this.$t(
              "container.application_selection.application.mother_name_bn"
          ),
          value: "mother_name_bn",
        },
        {
          text: this.$t(
              "container.application_selection.application.spouse_name_en"
          ),
          value: "spouse_name_en",
        },
        {
          text: this.$t(
              "container.application_selection.application.spouse_name_bn"
          ),
          value: "spouse_name_bn",
        },
        {
          text: this.$t("container.emergency_payment.list"),
          value: "emergency_allotment.emergency_payment_name",
        },
        {
          text: this.$t("container.application_selection.application.mobile"),
          value: "current_mobile",
        },
        {
          text: this.$t("container.list.status"),
          value: "status",
          align: "center",
        },
        {
          text: this.$t("container.list.action"),
          value: "actions",
          align: "center",
          width: "240",
          fixed: true,
        },
      ];
    },
    language: {
      get() {
        return this.$store.getters.getAppLanguage;
      },
    },
    ben_status() {
      return [
        {
          id: 1,
          value: this.$t("container.list.active"),
        },
        {
          id: 2,
          value: this.$t("container.list.inactive"),
        },
        {
          id: 3,
          value: this.$t("container.list.waiting"),
        },
      ];
    },
    subLocationType() {
      return [
        {
          id: 1,
          // value_en: "Pouroshava",
          value: this.$t("container.list.pouroshava"),
        },

        {
          id: 2,
          // value_en: "Union",
          value: this.$t("container.list.union"),
        },
      ];
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
    ...mapState({
      divisions: (state) => state.Division.divisions,
      userData: (state) => state.userData,
    }),
  },
  created() {
    this.GetAllDivisions();
  },
  beforeMount() {
    this.updateHeaderTitle();
  },
  mounted() {
    this.getListData();
    this.getPaymentName();

  },
  methods: {
    getLocationText(item) {
      return this.language === "bn" ? item.value_bn : item.value_en;
    },
    getNewBeneficiary() {
      this.$router.push({
        path: `/emergency-payment/manage-emergency-beneficiary/create`,
        query: { flag: 'New' }
      });
    },
    getExistingBeneficiary() {
      this.$router.push({
        path: `/emergency-payment/manage-emergency-beneficiary/create`
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
      let page;
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

        const blob = new Blob([response.data], {type: "application/pdf"});
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
    async GetAllProgram() {
      try {
        this.$axios
            .get("/global/program", {
              headers: {
                Authorization: "Bearer " + this.$store.state.token,
                "Content-Type": "multipart/form-data",
              },
            })
            .then((result) => {
              console.log(result, "programs");
              this.programs = result.data.data;
            })
            .catch((err) => {
              console.log(err, "error");
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
    async GetUserPermission() {
      try {
        this.$axios
            .get("/admin/beneficiary/getUserLocation", {
              headers: {
                Authorization: "Bearer " + this.$store.state.token,
                "Content-Type": "multipart/form-data",
              },
            })
            .then((result) => {
              console.log(result.data.data, "user_permission");
              let item = result.data.data;
              // User Permission Set
              if (item?.division) {
                this.data.division_id = item?.division?.id;
                this.user_permission.division = item?.division;
                this.user_permission.division_name =
                    this.language == "en"
                        ? item?.division?.name_en
                        : item?.division?.name_bn;
                if (!item?.district) {
                  this.onChangeDivision(item?.division?.id);
                } else {
                  this.data.district_id = item?.district?.id;
                  this.user_permission.district = item?.district;
                  this.user_permission.district_name =
                      this.language == "en"
                          ? item?.district?.name_en
                          : item?.district?.name_bn;
                }
              }
              if (item?.location_type) {
                this.user_permission.location_type = item?.location_type;
                this.data.location_type = item?.location_type?.id;
                this.user_permission.location_type_name =
                    this.language == "en"
                        ? item?.location_type?.value_en
                        : item?.location_type?.value_bn;
              }
              if (item?.district_pourashava) {
                this.data.district_pouro_id = item?.district_pourashava?.id;
                this.user_permission.district_pourashava =
                    item?.district_pourashava;
                this.onChangeDistrictPouro(item?.district_pourashava?.id);
                this.user_permission.district_pourashava_name =
                    this.language == "en"
                        ? item?.district_pourashava?.name_en
                        : item?.district_pourashava?.name_bn;
              }
              if (item?.upazila) {
                this.user_permission.upazila = item?.upazila;
                this.data.thana_id = item?.upazila?.id;
                this.user_permission.upazila_name =
                    this.language == "en"
                        ? item?.upazila?.name_en
                        : item?.upazila?.name_bn;
              }
              if (item?.city_corp) {
                this.data.city_id = item?.city_corp?.id;
                this.user_permission.city_corp = item?.city_corp;
                this.onChangeCity(item?.city_corp?.id);
                this.user_permission.city_corp_name =
                    this.language == "en"
                        ? item?.city_corp?.name_en
                        : item?.city_corp?.name_bn;
              }
              this.GetApplication();
            })
            .catch((err) => {
              console.log(err, "error");
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
    async onChangeDivision(event) {
      await this.$axios
          .get(`/admin/district/get/${event}`, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((result) => {
            this.districts = result.data.data;
          });
    },
    async onChangeDistrict(event) {
      await this.$axios
          .get(`/admin/thana/get/${event}`, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((result) => {
            this.LocationType(this.data.location_type);
            this.thanas = result.data.data;
          });
    },
    async LocationType($event) {
      this.data.city_id = null;
      this.district_pouro_id = null;
      this.thana_id = null;
      this.data.union_id = null;
      this.ward_id = null;

      this.cities = null;
      this.district_pouros = null;
      this.thanas = null;
      this.unions = null;
      this.wards = null;

      if (this.data.district_id != null && this.data.location_type != null) {
        console.log("LocationType", $event);
        if ($event === 1) {
          await this.$axios
              .get("/admin/city/get/" + this.data.district_id + "/" + $event, {
                headers: {
                  Authorization: "Bearer " + this.$store.state.token,
                  "Content-Type": "multipart/form-data",
                },
              })
              .then((result) => {
                this.district_pouros = result.data.data;
              });
        } else if ($event === 2) {
          await this.$axios
              .get(`/admin/thana/get/${this.data.district_id}`, {
                headers: {
                  Authorization: "Bearer " + this.$store.state.token,
                  "Content-Type": "multipart/form-data",
                },
              })
              .then((result) => {
                this.thanas = result.data.data;
              });
        } else if ($event === 3) {
          await this.$axios
              .get("/admin/city/get/" + this.data.district_id + "/" + $event, {
                headers: {
                  Authorization: "Bearer " + this.$store.state.token,
                  "Content-Type": "multipart/form-data",
                },
              })
              .then((result) => {
                this.cities = result.data.data;
              });
        }
      }
    },

    async onChangeUpazila(event) {
      await this.$axios
          .get(`/admin/union/get/${this.data.thana_id}`, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((result) => {
            this.unions = result.data.data;
          });
    },
    async onChangeSubLocationType(event) {
      if (event == 1) {
        await this.$axios
            .get(`/admin/union/pouro/get/${this.data.thana_id}`, {
              headers: {
                Authorization: "Bearer " + this.$store.state.token,
                "Content-Type": "multipart/form-data",
              },
            })
            .then((result) => {
              this.pouros = result.data.data;

              //clear data
              this.data.pouro_id = null;
              this.data.union_id = null;
              this.data.ward_id = null;
            });
        this.data.union_id = null;
      }
      if (event == 2) {
        this.onChangeUpazila(this.data.thana_id);
        this.data.pouro_id = null;
      }
    },
    async onChangeUnionGetWard(event) {
      this.wards = [];
      this.data.ward_id = null;
      await this.$axios
          .get(`/admin/ward/get/${event}`, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((result) => {
            this.wards = result.data.data;
          });
    },
    async onChangeUnion(event) {
      await this.$axios
          .get(`/admin/ward/get/${this.data.union_id}`, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((result) => {
            this.wards = result.data.data;
          });
    },
    async onChangeCity(event) {
      await this.$axios
          .get(`/admin/thana/get/city/${event}`, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((result) => {
            this.thanas = result.data.data;
          });
    },
    async onChangeThana(event) {
      await this.$axios
          .get(`/admin/ward/get/thana/${this.data.thana_id}`, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((result) => {
            this.wards = result.data.data;
          });
    },
    async onChangeDistrictPouro(event) {
      await this.$axios
          .get(`/admin/ward/get/district_pouro/${event}`, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((result) => {
            this.wards = result.data.data;
          });
    },
    submitSearch() {
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
        path: `/emergency-payment/emergency-beneficiary/edit/${item.id}`,
      });
    },
    ...mapActions({
      GetAllDivisions: "Division/GetAllDivisions",
    }),

    getListData() {
      this.search = this.search.replace(/%/g, '');
      this.loading = true;
      const queryParams = {
        searchText: this.search,
        perPage: this.pagination.perPage,
        page: this.pagination.current,
        sortBy: this.sortBy,
        sortDesc: this.sortDesc,
        emergency_payment_name: this.data.emergency_payment_name,
        started_period: this.data.starting_period,

      };
      ApiService
          .get("/admin/emergency/beneficiaries", {
            params: queryParams,
          })
          .then((result) => {
            console.log(result);
            this.total = result?.data?.data?.total;
            this.emergencyBeneficiaries = result.data?.data?.data;
            this.pagination.current = result.data.data.current_page;
            this.pagination.total = result.data.data.last_page;
            this.loading = false;
          });
    },
    getPaymentName() {
      const queryData = {
        table_name: "emergency_allotments",
        field_name: ["id", "emergency_payment_name"],
        condition: {status: 1, deleted_at: null},
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
                  "admin/emergency/beneficiary/" + item.id
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
    resetSearch() {
      if (!this.user_permission.division) {
        this.data.division_id = null;
      }
      if (!this.user_permission.district) {
        this.data.district_id = null;
      }
      if (!this.user_permission.city_corp) {
        this.data.city_id = null;
      }
      if (!this.user_permission.upazila) {
        this.data.thana_id = null;
      }
      if (!this.user_permission.pouro_id) {
        this.data.district_pouro_id = null;
      }
      if (!this.user_permission.location_type) {
        this.data.location_type = null;
      }
      this.data.program_id = null;
      this.data.union_id = null;
      this.data.ward_id = null;
      this.data.beneficiary_id = null;
      this.data.nominee_name = null;
      this.data.account_number = null;
      this.data.nid = null;
      this.data.status = null;

      this.getListData();
    },
    updateHeaderTitle() {
      const title = this.$t("container.emergency_payment.list");
      this.$store.commit("setHeaderTitle", title);
    },
    getItemText(item) {
      return this.language === "bn" ? item.name_bn : item.name_en;
    },
  },

  watch: {
    advanch_search(val) {
      this.data = {
        ...this.data,
        beneficiary_id: null,
        nominee_name: null,
        account_number: null,
        nid: null,
        status: null,
      };
    },
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
