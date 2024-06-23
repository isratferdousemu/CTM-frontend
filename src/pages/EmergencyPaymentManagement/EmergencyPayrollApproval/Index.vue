<script>
import { extend, ValidationProvider, ValidationObserver } from "vee-validate";
import { mapActions, mapState } from "vuex";
import office from "@/store/modules/system_configuration/office";
import { required } from "vee-validate/dist/rules";

export default {
  name: "Create",
  title: "CTM - Create Manage Allotment",
  components: {
    ValidationProvider,
    ValidationObserver,
  },

  data() {
    return {
      data: {
        program_id: null,
        financial_year_id: null,
        division_id: null,
        district_id: null,
        location_type: null,
        sub_location_type: null,
        city_id: null,
        district_pouro_id: null,
        thana_id: null,
        upazila_id: null,
        union_id: null,
        ward_id: null,
        remaining_installment_id: null,

      },

      loading: false,
      isLoading: false,
      search: "",
      delete_id: "",
      districts: [],
      allotments: [],
      allowances: [],
      financial_years: [],
      active_installments: [],
      allotmentAreaList: [],
      seeBeneficiaryDialog: false,
      previewAndSendDialog: false,
      selectedBeneficiaries: [],
      total: null,
      totalItem: null,
      pagination: {
        current: 1,
        total: 0,
        perPage: 10,
      },
      items: [5, 10, 15, 20, 40, 50, 100],

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
      page: {
        current: 1,
        perPage: 10, // You can set the desired default page size
        total: 0,
      },
      payrollList: [{
        id: 1,
        area_type: "Gopalganj",
        allotment_area: "Ulpur",
        allocated_beneficiary: 120,
        active_beneficiary: 101,
        status: "Saved"
      },
        {
          id: 2,
          area_type: "Gopalganj",
          allotment_area: "Gopinathpur",
          allocated_beneficiary: 120,
          active_beneficiary: 102,
          status: "Not Saved"
        }],
    };
  },

  computed: {
    language: {
      get() {
        return this.$store.getters.getAppLanguage;
      }
    },
    ...mapState({
      divisions: (state) => state.Division.divisions,
    }),
    headers() {
      return [
        {
          text: this.$t("container.list.sl"),
          value: "sl",
          align: "start",
          sortable: false,
        },
        {
          text: this.$t(
              "container.payroll_management_v2.payroll_approval.approval_list.district"
          ),
          value: "office_area",
          align: "center",
        },
        {
          text: this.$t(
              "container.payroll_management_v2.payroll_approval.approval_list.upazila"
          ),
          value: "allotment_area",
          align: "center",
        },
        {
          text: this.$t(
              "container.payroll_management_v2.payroll_approval.approval_list.office"
          ),
          value: "allotted_beneficiaries",
          align: "center",
        },
        {
          text: this.$t(
              "container.payroll_management_v2.payroll_approval.approval_list.program"
          ),
          value: "active_beneficiaries",
          align: "center",
        },
        {
          text: this.$t(
              "container.payroll_management_v2.payroll_approval.approval_list.installment"
          ),
          value: "active_beneficiaries",
          align: "center",
        },
        {
          text: this.$t(
              "container.payroll_management_v2.payroll_approval.approval_list.total_beneficiary"
          ),
          value: "active_beneficiaries",
          align: "center",
        },
        {
          text: this.$t(
              "container.payroll_management_v2.payroll_approval.approval_list.allowance_amount"
          ),
          value: "active_beneficiaries",
          align: "center",
        },
        {
          text: this.$t(
              "container.payroll_management_v2.payroll_approval.approval_list.charge"
          ),
          value: "active_beneficiaries",
          align: "center",
        },
        {
          text: this.$t(
              "container.payroll_management_v2.payroll_approval.approval_list.total_money"
          ),
          value: "active_beneficiaries",
          align: "center",
        },
        {
          text: this.$t(
              "container.payroll_management_v2.payroll_approval.approval_list.status"
          ),
          value: "status",
          align: "center",
        },
        { text: this.$t('container.list.action'), value: "actions", align: "start", sortable: false, width: "40%" },

      ];
    },
    seeBeneficiaryheaders() {
      return [
        {
          text: this.$t("container.list.sl"),
          value: "id",
          align: "start",
          sortable: false,
        },
        {
          text: this.$t(
              "container.payroll_management_v2.allotment_area_wise_ben_setup.ben_name"
          ),
          value: "area_type",
          align: "center",
        },
        {
          text: this.$t(
              "container.payroll_management_v2.allotment_area_wise_ben_setup.father_name"
          ),
          value: "allotment_area",
          align: "center",
        },
        {
          text: this.$t(
              "container.payroll_management_v2.allotment_area_wise_ben_setup.mother_name"
          ),
          value: "allocated_beneficiary",
          align: "center",
        },
        {
          text: this.$t(
              "container.payroll_management_v2.allotment_area_wise_ben_setup.bank"
          ),
          value: "active_beneficiary",
          align: "center",
        },
        {
          text: this.$t(
              "container.payroll_management_v2.allotment_area_wise_ben_setup.ward"
          ),
          value: "active_beneficiary",
          align: "center",
        },
        {
          text: this.$t(
              "container.payroll_management_v2.allotment_area_wise_ben_setup.mobile_number"
          ),
          value: "active_beneficiary",
          align: "center",
        },
        {
          text: this.$t(
              "container.payroll_management_v2.allotment_area_wise_ben_setup.account_no"
          ),
          value: "active_beneficiary",
          align: "center",
        },
        {
          text: this.$t(
              "container.payroll_management_v2.allotment_area_wise_ben_setup.allowance_amount"
          ),
          value: "active_beneficiary",
          align: "center",
        },

      ];
    },
    sendBeneficiaryheaders() {
      return [
        {
          text: this.$t("container.list.sl"),
          value: "id",
          align: "start",
          sortable: false,
        },
        {
          text: this.$t(
              "container.payroll_management_v2.allotment_area_wise_ben_send_preview.beneficiary_id"
          ),
          value: "area_type",
          align: "center",
        },
        {
          text: this.$t(
              "container.payroll_management_v2.allotment_area_wise_ben_send_preview.name_en"
          ),
          value: "allotment_area",
          align: "center",
        },
        {
          text: this.$t(
              "container.payroll_management_v2.allotment_area_wise_ben_send_preview.father_name_en"
          ),
          value: "allocated_beneficiary",
          align: "center",
        },
        {
          text: this.$t(
              "container.payroll_management_v2.allotment_area_wise_ben_send_preview.union_pourashava"
          ),
          value: "active_beneficiary",
          align: "center",
        },
        {
          text: this.$t(
              "container.payroll_management_v2.allotment_area_wise_ben_send_preview.ward"
          ),
          value: "active_beneficiary",
          align: "center",
        },
        {
          text: this.$t(
              "container.payroll_management_v2.allotment_area_wise_ben_send_preview.program_name"
          ),
          value: "active_beneficiary",
          align: "center",
        },
        {
          text: this.$t(
              "container.payroll_management_v2.allotment_area_wise_ben_send_preview.bank_account"
          ),
          value: "active_beneficiary",
          align: "center",
        },
        {
          text: this.$t(
              "container.payroll_management_v2.allotment_area_wise_ben_send_preview.mobile"
          ),
          value: "active_beneficiary",
          align: "center",
        },
        {
          text: this.$t(
              "container.payroll_management_v2.allotment_area_wise_ben_send_preview.account"
          ),
          value: "active_beneficiary",
          align: "center",
        },
        {
          text: this.$t(
              "container.payroll_management_v2.allotment_area_wise_ben_send_preview.cash_out_charge"
          ),
          value: "active_beneficiary",
          align: "center",
        },

        {
          text: this.$t(
              "container.payroll_management_v2.allotment_area_wise_ben_send_preview.total_amount"
          ),
          value: "active_beneficiary",
          align: "center",
        },
        {
          text: this.$t(
              "container.payroll_management_v2.allotment_area_wise_ben_send_preview.financial_account_status"
          ),
          value: "active_beneficiary",
          align: "center",
        },

        {
          text: this.$t(
              "container.payroll_management_v2.allotment_area_wise_ben_send_preview.status"
          ),
          value: "active_beneficiary",
          align: "center",
        },
      ];
    },

  },
  methods: {
    ...mapActions({
      GetAllDivisions: "Division/GetAllDivisions",
    }),
    getItemText(item) {
      return this.language === "bn" ? item.name_bn : item.name_en;
    },
    getLocationText(item) {
      return this.language === "bn" ? item.value_bn : item.value_en;
    },
    getFinancialItemText(item) {
      return this.language === "bn" ? item.financial_year : item.financial_year;
    },
    getInstallmentText(item) {
      return this.language === "bn" ? item.installment_name_bn : item.installment_name;
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
        this.data.upazila_id = null;
      }
      if (!this.user_permission.pouro_id) {
        this.data.district_pouro_id = null;
      }
      if (!this.user_permission.location_type) {
        this.data.location_type = null;
      }
      this.data.program_id = null;
      this.data.financial_year_id = null;

      this.data.sub_location_type = null;
      this.data.city_id = null;
      this.data.district_pouro_id = null;
      this.data.thana_id = null;
      this.upazila_id = null;
      this.data.union_id = null;
      this.data.ward_id = null;

      this.GetAllotmentArea();
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
      // this.isLoading = true;
      try {
        await this.$axios
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
                this.data.upazila_id = item?.upazila?.id;
                this.onChangeUpazila(item?.upazila?.id);
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
              //this.isLoading = false;
              // this.GetAllotmentArea();
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
      //reset all fields
      this.data.sub_location_type = null;
      this.data.city_id = null;
      this.data.district_pouro_id = null;
      this.data.thana_id = null;
      this.data.upazila_id = null;
      this.data.union_id = null;
      this.data.ward_id = null;

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
      this.data.union_id = null;
      this.data.ward_id = null;
      await this.$axios
          .get(`/admin/union/get/${this.data.upazila_id}`, {
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
        this.onChangeUpazila(this.data.upazila_id);
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
      this.data.thana_id = null;
      this.data.ward_id = null;

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
      this.data.ward_id = null;
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
    onPageChange($event) {
      // this.pagination.current = $event;
      this.loading = true;
      this.GetAllotmentArea();
    },
    onSearch() {

      this.pagination = {
        ...this.pagination,
        current: 1,
      };
      this.GetAllotmentArea();
    },
    async GetAllotmentArea() {
      this.loading = true;
      const queryParams = {
        program_id: this.data.program_id,
        financial_year_id: this.data.financial_year_id,
        division_id: this.data.division_id,
        district_id: this.data.district_id,
        location_type_id: this.data.location_type,
        city_corp_id: this.data.city_id,
        district_pourashava_id: this.data.district_pouro_id,
        union_id: this.data.union_id,
        thana_id: this.data.thana_id,
        upazila_id: this.data.upazila_id,
        ward_id: this.data.ward_id,

        perPage: this.pagination.perPage,
        page: this.pagination.current,
        sortBy: this.sortBy,
        orderBy: this.sortDesc,
      };

      await this.$axios
          .get("/admin/payroll/get-allotment-area-list", {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data"
            },
            params: queryParams
          })
          .then(result => {
            this.allotmentAreaList = result.data.data;
            this.total = result?.data?.meta?.total;
            this.totalItem = result?.data?.meta?.total;
            console.log("results_total__", this.total);

            this.pagination.current = result?.data?.meta?.current_page;
            this.pagination.total = result?.data?.meta?.last_page;
            // this.pagination.grand_total = result.data.meta.total;
            this.loading = false;
          });
    },
    GetAllowance() {
      this.$axios
          .get("/global/program", {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((result) => {
            this.allowances = result.data.data;
          });
    },
    GetFinancial_Year() {
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
    async GetActiveInstallment(event) {
      await this.$axios
          .get(`/admin/payroll/get-active-installments/${this.data.program_id}/${this.data.financial_year_id}`, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((result) => {
            this.active_installments = result.data.data;
          });
    },
    seeBeneficiary() {
      this.seeBeneficiaryDialog = true
    },
    PreviewAndSend() {
      this.previewAndSendDialog = true
    },
    submitAllotmentWiseBeneficiary() {
      if (this.selectedBeneficiaries.length === 0) {
        this.$toast.error("Please select at least one item!!!");
        return;
      }
      let fd = new FormData();

      // fd.append("to_program_id", this.submit_data.to_program_id);
      // fd.append("shifting_cause", this.submit_data.shifting_cause);
      // fd.append("activation_date", this.submit_data.activation_date);

      // console.log("to_program_id", this.submit_data.to_program_id);

      console.log('beneficiary_', this.selectedBeneficiaries)

      // Convert each object in the beneficiaries array to a JSON string
      this.selectedBeneficiaries.forEach((beneficiary, index) => {
        fd.append(`beneficiaries[${index}][beneficiary_id]`, beneficiary?.id);
        fd.append(
            `beneficiaries[${index}][from_program_id]`,
            beneficiary?.program?.id
        );
      });

      try {
        this.$store
            .dispatch("BeneficiaryManagement/BeneficiaryShifting", fd)
            .then((res) => {
              console.log(res, "submit__");
              if (res.data?.success) {
                console.log(res.data?.success, "submit__");
                this.$toast.success("Beneficiary Shifting Successfully");
                this.$router.push({ name: "beneficiary_shifting_list" });
              } else if (res.response?.data?.errors) {
                this.$refs.form.setErrors(res.response.data.errors);
                this.errors = res.response.data.errors;
                //   this.$toast.error(res.response.data.message);
              }
              console.log(this.$refs);
              console.log(this.errors, "this.errors");
            });
      } catch (e) {
        console.log(e);
      }
    },

  },
  watch: {
    "$i18n.locale": "updateHeaderTitle",
  },
  created() {
  },
  mounted() {
    this.GetAllDivisions();
    this.GetAllowance();
    this.GetFinancial_Year();
    // this.GetActiveInstallment();

    this.GetUserPermission();
    this.GetAllProgram();
    this.$store
        .dispatch("getLookupByType", 1)
        .then((res) => (this.locationType = res));
  }

};
</script>

<template>
  <div id="create_manage_allotment">
    <v-row class="mx-5 mt-5">
      <v-col cols="12">
        <ValidationObserver ref="form" v-slot="{ invalid }">
          <v-form v-on:submit.prevent="addAllotment">
            <v-row wrap>
              <v-col cols="12">
                <v-card>
                  <v-card-title class="justify-center"
                                style="background-color: #1C3B68; color: white;font-size: 17px;">
                    <h4 class=" white--text">{{
                        $t('container.payroll_management_v2.payroll_approval.title')
                      }}</h4>
                  </v-card-title>

                  <v-divider></v-divider>
                  <ValidationObserver ref="form" v-slot="{ invalid }">
                    <form @submit.prevent="onSearch()">
                      <v-card-text>
                        <v-row>
                          <v-col lg="3" md="3" cols="12">
                            <ValidationProvider name="ProgramName" vid="program_id"
                                                v-slot="{ errors }">
                              <v-select :hide-details="errors[0] ? false : true"
                                        @input="onChangeProgramName($event)"
                                        v-model="data.program_id" outlined :label="$t(
                                                                    'container.system_config.demo_graphic.committee.program_name'
                                                                )
                                                                    " :items="programs" :item-text="getItemText"
                                        item-value="id" class="no-arrow-icon"
                                        :append-icon-cb="appendIconCallback"
                                        append-icon="mdi-plus" :error="errors[0] ? true : false"
                                        :error-messages="errors[0]" clearable></v-select>
                            </ValidationProvider>
                          </v-col>
                          <v-col lg="3" md="3" cols="12">
                            <ValidationProvider name="ProgramName" vid="program_id"
                                                v-slot="{ errors }">
                              <v-select outlined clearable :items="financial_years"
                                        v-model="data.financial_year_id"
                                        :item-text="getFinancialItemText" item-value="id"
                                        :label="$t(
                                                                    'container.system_config.demo_graphic.financial_year.financial_year'
                                                                )
                                                                    " class="no-arrow-icon"
                                        :append-icon-cb="appendIconCallback"
                                        append-icon="mdi-plus" :error="errors[0] ? true : false"
                                        :error-messages="errors[0]">

                              </v-select>
                            </ValidationProvider>
                          </v-col>

                          <v-col lg="3" md="3" cols="12">
                            <ValidationProvider name="Division" vid="division"
                                                v-slot="{ errors }">
                              <v-text-field outlined readonly
                                            v-model="user_permission.division_name" :label="$t(
                                                                    'container.system_config.demo_graphic.division.division'
                                                                )
                                                                    " v-if="user_permission.division">
                              </v-text-field>
                              <v-select v-if="!user_permission.division" outlined
                                        @input="onChangeDivision($event)"
                                        v-model="data.division_id" :label="$t(
                                                                    'container.system_config.demo_graphic.division.division'
                                                                )
                                                                    " :items="divisions" :item-text="getItemText"
                                        item-value="id" :error="errors[0] ? true : false"
                                        :error-messages="errors[0]" class="no-arrow-icon"
                                        :append-icon-cb="appendIconCallback"
                                        append-icon="mdi-plus" clearable>
                              </v-select>
                            </ValidationProvider>
                          </v-col>
                          <v-col lg="3" md="3" cols="12">
                            <ValidationProvider name="District" vid="district"
                                                v-slot="{ errors }">
                              <v-text-field outlined readonly
                                            v-model="user_permission.district_name" :label="$t(
                                                                    'container.system_config.demo_graphic.district.district'
                                                                )
                                                                    " v-if="user_permission.district">
                              </v-text-field>
                              <v-select v-if="!user_permission.district" outlined
                                        v-model="data.district_id"
                                        @input="onChangeDistrict($event)" :label="$t(
                                                                    'container.system_config.demo_graphic.district.district'
                                                                )
                                                                    " :items="districts" :item-text="getItemText"
                                        item-value="id" class="no-arrow-icon"
                                        :append-icon-cb="appendIconCallback"
                                        append-icon="mdi-plus" :error="errors[0] ? true : false"
                                        :error-messages="errors[0]" clearable></v-select>
                            </ValidationProvider>
                          </v-col>
                          <v-col lg="3" md="3" cols="12">
                            <ValidationProvider name="Location Type" vid="location_type"
                                                v-slot="{ errors }">
                              <v-text-field outlined readonly
                                            v-model="user_permission.location_type_name"
                                            :label="$t('container.list.location_type')"
                                            v-if="user_permission.location_type">
                              </v-text-field>
                              <v-select v-if="!user_permission.location_type"
                                        @input="LocationType($event)"
                                        v-model="data.location_type" outlined
                                        :label="$t('container.list.location_type')"
                                        :items="locationType" :item-text="getLocationText"
                                        item-value="id" class="no-arrow-icon"
                                        :append-icon-cb="appendIconCallback"
                                        append-icon="mdi-plus" :error="errors[0] ? true : false"
                                        :error-messages="errors[0]" clearable></v-select>
                            </ValidationProvider>
                          </v-col>
                          <v-col v-if="data.location_type == 1" lg="3" md="3" cols="12">
                            <ValidationProvider name="thana" vid="district_pouro_id"
                                                v-slot="{ errors }">
                              <v-text-field outlined readonly
                                            v-model="user_permission.district_pourashava_name"
                                            :label="$t(
                                                                    'container.system_config.demo_graphic.ward.pouro'
                                                                )
                                                                    " v-if="user_permission.district_pourashava">
                              </v-text-field>
                              <v-select v-if="!user_permission.district_pourashava"
                                        v-model="data.district_pouro_id" outlined :label="$t(
                                                                    'container.system_config.demo_graphic.ward.pouro'
                                                                )
                                                                    " @change="onChangeDistrictPouro($event)"
                                        :items="district_pouros" :item-text="getItemText"
                                        item-value="id" class="no-arrow-icon"
                                        :append-icon-cb="appendIconCallback"
                                        append-icon="mdi-plus" :error="errors[0] ? true : false"
                                        :error-messages="errors[0]" clearable></v-select>
                            </ValidationProvider>
                          </v-col>
                          <v-col v-if="data.location_type == 2" lg="3" md="3" cols="12">
                            <ValidationProvider name="Upazila" vid="upazila_id"
                                                v-slot="{ errors }">
                              <v-text-field outlined readonly
                                            v-model="user_permission.upazila_name" :label="$t(
                                                                    'container.system_config.demo_graphic.thana.thana'
                                                                )
                                                                    " v-if="user_permission.upazila">
                              </v-text-field>
                              <v-select v-if="!user_permission.upazila"
                                        v-model="data.upazila_id" outlined :label="$t(
                                                                    'container.system_config.demo_graphic.thana.thana'
                                                                )
                                                                    " @change="onChangeUpazila($event)" :items="thanas"
                                        :item-text="getItemText" item-value="id"
                                        class="no-arrow-icon"
                                        :append-icon-cb="appendIconCallback"
                                        append-icon="mdi-plus" :error="errors[0] ? true : false"
                                        :error-messages="errors[0]" clearable></v-select>
                            </ValidationProvider>
                          </v-col>

                          <v-col v-if="data.location_type == 2" lg="3" md="3" cols="12">
                            <ValidationProvider name="subLocationType" vid="subLocationType"
                                                v-slot="{ errors }">
                              <v-autocomplete @input="onChangeSubLocationType($event)"
                                              v-model="data.sub_location_type" outlined :label="$t(
                                                                    'container.system_config.demo_graphic.ward.subLocation_type'
                                                                )
                                                                    " :items="subLocationType" item-text="value"
                                              item-value="id" :error="errors[0] ? true : false"
                                              :error-messages="errors[0]"
                                              :hide-details="errors[0] ? false : true"
                                              class="no-arrow-icon"
                                              :append-icon-cb="appendIconCallback"
                                              append-icon="mdi-plus" clearable></v-autocomplete>
                            </ValidationProvider>
                          </v-col>
                          <v-col v-if="
                                                        data.location_type == 2 && data.sub_location_type == 1
                                                    " lg="3" md="3" cols="12">
                            <ValidationProvider name="pouros" vid="pouros"
                                                v-slot="{ errors }">
                              <v-select v-model="data.pouro_id" outlined :label="$t(
                                                                'container.system_config.demo_graphic.ward.pouro'
                                                            )
                                                                " :items="pouros" :item-text="getItemText"
                                        item-value="id" :error="errors[0] ? true : false"
                                        :error-messages="errors[0]"
                                        :hide-details="errors[0] ? false : true"
                                        class="no-arrow-icon"
                                        :append-icon-cb="appendIconCallback"
                                        append-icon="mdi-plus" clearable></v-select>
                            </ValidationProvider>
                          </v-col>

                          <v-col v-if="
                                                        data.sub_location_type == 2 && data.location_type == 2
                                                    " lg="3" md="3" cols="12">
                            <ValidationProvider name="unions" vid="unions"
                                                v-slot="{ errors }">
                              <v-select @input="onChangeUnionGetWard($event)"
                                        v-model="data.union_id" outlined :label="$t(
                                                                    'container.system_config.demo_graphic.ward.union'
                                                                )
                                                                    " :items="unions" :item-text="getItemText"
                                        item-value="id" :error="errors[0] ? true : false"
                                        :error-messages="errors[0]"
                                        :hide-details="errors[0] ? false : true"
                                        class="no-arrow-icon"
                                        :append-icon-cb="appendIconCallback"
                                        append-icon="mdi-plus" clearable></v-select>
                            </ValidationProvider>
                          </v-col>

                          <v-col v-if="data.location_type == 3" lg="3" md="3" cols="12">
                            <ValidationProvider name="city" vid="city_id"
                                                v-slot="{ errors }">
                              <v-text-field outlined readonly
                                            v-model="user_permission.city_corp_name" :label="$t(
                                                                    'container.system_config.demo_graphic.ward.city'
                                                                )
                                                                    " v-if="user_permission.city_corp">
                              </v-text-field>
                              <v-select v-if="!user_permission.city_corp"
                                        v-model="data.city_id" @change="onChangeCity($event)"
                                        outlined :label="$t(
                                                                    'container.system_config.demo_graphic.ward.city'
                                                                )
                                                                    " :items="cities" :item-text="getItemText"
                                        item-value="id" class="no-arrow-icon"
                                        :append-icon-cb="appendIconCallback"
                                        append-icon="mdi-plus" :error="errors[0] ? true : false"
                                        :error-messages="errors[0]" clearable></v-select>
                            </ValidationProvider>
                          </v-col>

                          <v-col v-if="data.location_type == 3" lg="3" md="3" cols="12">
                            <ValidationProvider name="thana" vid="thana_id"
                                                v-slot="{ errors }">
                              <v-select v-model="data.thana_id" outlined :label="$t(
                                                                'container.system_config.demo_graphic.ward.thana'
                                                            )
                                                                " @change="onChangeThana($event)" :items="thanas"
                                        :item-text="getItemText" item-value="id"
                                        class="no-arrow-icon"
                                        :append-icon-cb="appendIconCallback"
                                        append-icon="mdi-plus" :error="errors[0] ? true : false"
                                        :error-messages="errors[0]" clearable></v-select>
                            </ValidationProvider>
                          </v-col>
                          <v-col v-if="
                                                        data.location_type == 1 ||
                                                        data.location_type == 2 ||
                                                        data.location_type == 3
                                                    " lg="3" md="3" cols="12">
                            <ValidationProvider name="ward" vid="ward_id"
                                                v-slot="{ errors }">
                              <v-select v-model="data.ward_id" outlined :label="$t(
                                                                'container.system_config.demo_graphic.ward.ward'
                                                            )
                                                                " :items="wards" :item-text="getItemText"
                                        item-value="id" class="no-arrow-icon"
                                        :append-icon-cb="appendIconCallback"
                                        append-icon="mdi-plus" :error="errors[0] ? true : false"
                                        :error-messages="errors[0]" clearable></v-select>
                            </ValidationProvider>
                          </v-col>
                          <v-col lg="3" md="3" cols="12">
                            <ValidationProvider name="Office Type" vid="office_type"
                                                v-slot="{ errors }">
                              <v-select v-model="data.office_type" outlined :label="$t(
                                                                'container.payroll_management_v2.payroll_approval.office_type'
                                                            )
                                                                " :items="officeTypes" :item-text="getItemText"
                                        item-value="id" class="no-arrow-icon"
                                        :append-icon-cb="appendIconCallback"
                                        append-icon="mdi-plus" :error="errors[0] ? true : false"
                                        :error-messages="errors[0]" clearable></v-select>
                            </ValidationProvider>
                          </v-col>
                          <v-col lg="3" md="3" cols="12">
                            <ValidationProvider name="Office" vid="office"
                                                v-slot="{ errors }">
                              <v-select v-model="data.office" outlined :label="$t(
                                                                'container.payroll_management_v2.payroll_approval.office'
                                                            )
                                                                " :items="offices" :item-text="getItemText"
                                        item-value="id" class="no-arrow-icon"
                                        :append-icon-cb="appendIconCallback"
                                        append-icon="mdi-plus" :error="errors[0] ? true : false"
                                        :error-messages="errors[0]" clearable></v-select>
                            </ValidationProvider>
                          </v-col>
                          <v-col lg="3" md="3" cols="12">
                            <ValidationProvider name="Installment" vid="installment"
                                                v-slot="{ errors }">
                              <v-select v-model="data.office" outlined :label="$t(
                                                                'container.payroll_management_v2.payroll_approval.installment'
                                                            )
                                                                " :items="installments" :item-text="getItemText"
                                        item-value="id" class="no-arrow-icon"
                                        :append-icon-cb="appendIconCallback"
                                        append-icon="mdi-plus" :error="errors[0] ? true : false"
                                        :error-messages="errors[0]" clearable></v-select>
                            </ValidationProvider>
                          </v-col>
                          <v-col lg="3" md="3" cols="12">
                            <ValidationProvider name="status" vid="status"
                                                v-slot="{ errors }">
                              <v-select v-model="data.office" outlined :label="$t(
                                                                'container.payroll_management_v2.payroll_approval.status'
                                                            )
                                                                " :items="statusList" :item-text="getItemText"
                                        item-value="id" class="no-arrow-icon"
                                        :append-icon-cb="appendIconCallback"
                                        append-icon="mdi-plus" :error="errors[0] ? true : false"
                                        :error-messages="errors[0]" clearable></v-select>
                            </ValidationProvider>
                          </v-col>
                        </v-row>
                        <div class="d-inline d-flex justify-end">
                          <v-btn elevation="2" class="btn mr-2" color="success" type="submit"
                                 :disabled="!data.program_id ||
                                                            !data.financial_year_id
                                                            ">{{ $t("container.list.search") }}</v-btn>
                          <v-btn elevation="2" class="btn" @click="resetSearch">{{
                              $t("container.list.reset")
                            }}</v-btn>
                        </div>
                      </v-card-text>
                    </form>
                  </ValidationObserver>
                </v-card>
              </v-col>

              <v-col cols="12">
                <v-card style="margin-bottom: 5px">

                  <v-card-text class="mt-1">
                    <template>
                      <v-row justify="space-between" align="center" class="mx-4">
                        <!-- Checkbox on the left -->
                        <v-col sm="6" lg="6" md="6" cols="12">
                          {{ $t('container.list.total') }}:&nbsp;<span
                            style="font-weight: bold;">
                                                        <!-- {{ totalItem }} -->
                                                        {{ language === 'bn' ? $helpers.englishToBangla(
                            totalItem) : totalItem }}
                                                    </span>
                        </v-col>

                        <!-- <v-col sm="3" lg="3" md="3" cols="12" class="text-right">
                            <v-text-field @keyup.native="PageSetup" v-model="search"
                                append-icon="mdi-magnify" :label="$t(
                                    'container.list.search_circular'
                                )" hide-details
                                class="mb-5 my-sm-0 my-3 mx-0v -input--horizontal" flat outlined
                                dense></v-text-field>
                        </v-col> -->
                      </v-row>
                    </template>
                    <v-row
                        class="ma-0  white round-border d-flex justify-space-between align-center"
                        justify="center" justify-lg="space-between" show-select>
                      <v-col cols="12">

                        <v-data-table :loading="loading" item-key="id" :headers="headers"
                                      :items="allotmentAreaList" :items-per-page="pagination.perPage"
                                      hide-default-footer
                                      class="elevation-0 transparent row-pointer mt-5 mx-5" show-select
                                      v-model="selectedBeneficiaries">

                          <template v-slot:[`item.id`]="{ item }">
                                                        <span>
                                                            {{ language == 'bn' ?
                                                            $helpers.englishToBangla(item.id) :
                                                            item.id }}
                                                        </span>
                          </template>
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

                          <template v-slot:[`item.office_area`]="{ item }">
                                                        <span>
                                                            {{ language == 'bn' ?
                                                            $helpers.englishToBangla(item.office_area.name_bn) :
                                                            item.office_area.name_en ?? 0 }}
                                                        </span>
                          </template>

                          <template v-slot:[`item.allotment_area`]="{ item }">
                                                        <span>
                                                            {{ language == 'bn' ?
                                                            $helpers.englishToBangla(item.allotment_area.name_bn) :
                                                            item.allotment_area.name_en }}
                                                        </span>
                          </template>

                          <template v-slot:item.allotted_beneficiaries="{ item }">
                            {{
                              language === "bn"
                                  ? $helpers.englishToBangla(item.allotted_beneficiaries)
                                  : item.allotted_beneficiaries
                            }}
                          </template>

                          <template v-slot:[`item.active_beneficiaries`]="{ item }">
                                                        <span>
                                                            {{ language == 'bn' ?
                                                            $helpers.englishToBangla(item.active_beneficiaries ?? 0) :
                                                            item.active_beneficiaries ?? 0 }}
                                                        </span>
                          </template>

                          <!-- Action Button -->
                          <template v-slot:item.status="{ item }">
                            <v-btn v-on="on" color="primary" elevation="0"
                                   class="btn mr-2 white--text"
                                   @click="seeBeneficiary(item.id)">
                              {{
                                item.status

                              }}
                            </v-btn>

                          </template>
                          <!-- End Action Button -->

                          <!-- Action Button -->
                          <template v-slot:item.actions="{ item }">

                            <v-tooltip>
                              <template v-slot:activator="{ on }">
                                <v-btn :disabled="item.process_flag === 0"
                                       v-can="'update-post'" fab x-small v-on="on"
                                       color="#F40F02" elevation="0"
                                       class="white--text ml-2"
                                       @click="GeneratePDF(item.id)">
                                  <v-icon>mdi-file-pdf-box</v-icon>
                                </v-btn>
                              </template>
                              <span>{{ $t("Pdf") }}</span>
                            </v-tooltip>

                            <v-tooltip>
                              <template v-slot:activator="{ on }">
                                <v-btn :disabled="item.process_flag === 0"
                                       v-can="'update-post'" fab x-small v-on="on"
                                       color="#1D6F42" elevation="0"
                                       class="white--text ml-2"
                                       @click="GenerateExcel(item.id)">
                                  <v-icon>mdi-file-excel</v-icon>
                                </v-btn>
                              </template>
                              <span>{{ $t("Excel") }}</span>
                            </v-tooltip>
                            <v-btn v-on="on" color="red darken-4" elevation="0"
                                   class="btn mr-2 white--text"
                                   @click="rollBackBeneficiary(item.id)">
                              {{
                                $t(
                                    "Reject"
                                )
                              }}
                            </v-btn>
                            <v-btn v-on="on" color="primary" elevation="0"
                                   class="btn mr-2 white--text"
                                   @click="seeBeneficiary(item.id)">
                              {{
                                $t(
                                    "See Beneficiary"
                                )
                              }}
                            </v-btn>

                          </template>
                          <!-- End Action Button -->
                          <template v-slot:footer="item">
                            <div class="text-center pt-2 v-data-footer justify-center pb-2">
                              <v-select
                                  style=" position: absolute;right: 25px;width: 149px;transform: translate(0px, 0px);"
                                  :items="items" hide-details dense outlined
                                  @change="onPageChange"
                                  v-model="pagination.perPage"></v-select>
                              <v-pagination circle primary v-model="pagination.current"
                                            :length="pagination.total" @input="onPageChange"
                                            :total-visible="11"
                                            class="custom-pagination-item"></v-pagination>
                            </div>
                          </template>

                        </v-data-table>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-form>
        </ValidationObserver>
      </v-col>
    </v-row>

    <!-- See Beneficiaries modal  -->
    <v-dialog v-model="seeBeneficiaryDialog" width="1300">
      <v-card style="justify-content: center; text-align: center">
        <v-card-title class="font-weight-bold justify-center" style="background-color: #2b4978; color: white">
          {{
            $t("container.payroll_management_v2.allotment_area_wise_ben_setup.title")
          }}
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-7">
          <ValidationObserver ref="formAdd" v-slot="{ invalid }">
            <form @submit.prevent="submitAllotmentWiseBeneficiary()">
              <v-row>
                <v-col lg="4" md="4" cols="12">
                  <div>
                    <div style="margin-left: -100px">
                      <strong>{{
                          $t("container.payroll_management_v2.allotment_area_wise_ben_setup.allotment_area")
                        }}:</strong>
                      {{ data.processor_type ?? "--" }}
                    </div>

                    <div style="padding-bottom: 8px; margin-left: -70px">
                      <strong>{{
                          $t("container.payroll_management_v2.allotment_area_wise_ben_setup.selected_beneficiaries")
                        }}:</strong>
                      {{ data.name_en ?? "--" }}
                    </div>

                  </div>
                </v-col>
                <v-col lg="4" md="4" cols="12">
                  <div>
                    <div style="padding-bottom: 8px; margin-left: -100px">
                      <strong>{{
                          $t("container.payroll_management_v2.allotment_area_wise_ben_setup.total_beneficiaries")
                        }}:</strong>
                      {{ data.processor_type ?? "--" }}
                    </div>

                    <div style="padding-bottom: 8px; margin-left: -50px">
                      <strong>{{
                          $t("container.payroll_management_v2.allotment_area_wise_ben_setup.payment_cycle_start_date")
                        }}:</strong>
                      {{ data.name_en ?? "--" }}
                    </div>

                  </div>
                </v-col>
                <v-col lg="4" md="4" cols="12">
                  <div style="margin-left: -100px">
                    <div style="padding-bottom: 8px">
                      <strong>{{
                          $t("container.payroll_management_v2.allotment_area_wise_ben_setup.allocated_beneficiaries")
                        }}:</strong>
                      {{ data.processor_type ?? "--" }}
                    </div>

                    <div style="padding-bottom: 8px">
                      <strong>{{
                          $t("container.payroll_management_v2.allotment_area_wise_ben_setup.payment_cycle_end_date")
                        }}:</strong>
                      {{ data.name_en ?? "--" }}
                    </div>

                  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-col lg="4" md="4" cols="12">
                  <div>
                    <div style="margin-left: -100px">
                      <strong>{{
                          $t("container.payroll_management_v2.allotment_area_wise_ben_setup.payroll_eligible_amount")
                        }}:</strong>
                      {{ data.processor_type ?? "--" }}
                    </div>

                    <div style="padding-bottom: 8px;margin-left: -120px">
                      <strong>{{
                          $t("container.payroll_management_v2.allotment_area_wise_ben_setup.current_amount")
                        }}:</strong>
                      {{ data.name_en ?? "--" }}
                    </div>
                    <div style="padding-bottom: 8px;margin-left: -40px">
                      <strong>{{
                          $t("container.payroll_management_v2.allotment_area_wise_ben_setup.amount_of_money")
                        }}:</strong>
                      {{ data.name_en ?? "--" }}
                    </div>
                  </div>
                </v-col>
                <v-col lg="4" md="4" cols="12">
                  <div>
                    <div style="padding-bottom: 8px;margin-left: -30px">
                      <strong>{{
                          $t("container.payroll_management_v2.allotment_area_wise_ben_setup.amount_remain_ralance")
                        }}:</strong>
                      {{ data.processor_type ?? "--" }}
                    </div>

                    <div style="padding-bottom: 8px; margin-left: -20px">
                      <strong>{{
                          $t("container.payroll_management_v2.allotment_area_wise_ben_setup.total_amount_installments")
                        }}:</strong>
                      {{ data.name_en ?? "--" }}
                    </div>
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-data-table :loading="loading" item-key="id" :headers="seeBeneficiaryheaders"
                              :items="payrollList" :items-per-page="pagination.perPage" hide-default-footer
                              class="elevation-0 transparent row-pointer mt-5 mx-5" show-select
                              v-model="selectedBeneficiaries">

                  <template v-slot:[`item.id`]="{ item }">
                                        <span>
                                            {{ language == 'bn' ?
                                            $helpers.englishToBangla(item.id) :
                                            item.id }}
                                        </span>
                  </template>
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

                  <template v-slot:item.allocated_beneficiary="{ item }">
                    {{
                      language === "bn"
                          ? $helpers.englishToBangla(item.allocated_beneficiary)
                          : item.allocated_beneficiary
                    }}
                  </template>

                  <template v-slot:[`item.active_beneficiary`]="{ item }">
                                        <span>
                                            {{ language == 'bn' ?
                                            $helpers.englishToBangla(item.active_beneficiary) :
                                            item.active_beneficiary }}
                                        </span>
                  </template>
                  <template v-slot:footer="item">
                    <div class="text-center pt-2 v-data-footer justify-center pb-2">
                      <v-select
                          style=" position: absolute;right: 25px;width: 149px;transform: translate(0px, 0px);"
                          :items="items" hide-details dense outlined @change="onPageChange"
                          v-model="pagination.perPage"></v-select>
                      <v-pagination circle primary v-model="pagination.current"
                                    :length="pagination.total" @input="onPageChange" :total-visible="11"
                                    class="custom-pagination-item"></v-pagination>
                    </div>
                  </template>

                </v-data-table>
              </v-row>
              <v-row>
                <v-col lg="4" md="6" cols="12" class="text-right">
                  <v-btn flat @click="seeBeneficiaryDialog = false" outlined
                         class="custom-btn-width py-2 mr-10">
                    {{ $t("container.list.cancel") }}
                  </v-btn>
                  <v-btn type="submit" flat color="primary" :disabled="invalid" :loading="loading"
                         class="custom-btn-width success white--text py-2">
                    {{ $t("container.list.submit") }}
                  </v-btn>
                </v-col>
              </v-row>
            </form>
          </ValidationObserver>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!--  See Beneficiaries modal  -->

    <!-- Preview and Send modal  -->
    <v-dialog v-model="previewAndSendDialog" width="1300">
      <v-card style="justify-content: center; text-align: center">
        <v-card-title class="font-weight-bold justify-center" style="background-color: #2b4978; color: white">
          {{
            $t("container.payroll_management_v2.allotment_area_wise_ben_setup.title_send_preview")
          }}
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-4">
          <ValidationObserver ref="formAdd" v-slot="{ invalid }">
            <form @submit.prevent="submitAllotmentWiseBeneficiary()">
              <template>
                <v-row justify="space-between" class="mx-4">
                  <!-- Checkbox on the left -->
                  <v-col sm="2" lg="2" md="2" cols="12" class="text-left">
                    {{ $t('container.list.total') }}:&nbsp;<span style="font-weight: bold;">

                                            <!-- {{ language === 'bn' ? $helpers.englishToBangla(
                                                this.total) : this.total }} -->
                                        </span>
                  </v-col>

                  <!-- <v-col sm="3" lg="3" md="3" cols="12" class="text-right">
                      <v-text-field @keyup.native="PageSetup" v-model="search"
                          append-icon="mdi-magnify" :label="$t(
                              'container.list.search_circular'
                          )" hide-details class="mb-5 my-sm-0 my-3 mx-0v -input--horizontal" flat
                          outlined dense></v-text-field>

                  </v-col> -->

                </v-row>
              </template>
              <v-row>
                <v-data-table :loading="loading" item-key="id" :headers="sendBeneficiaryheaders"
                              :items="payrollList" :items-per-page="pagination.perPage" hide-default-footer
                              class="elevation-0 transparent row-pointer mt-1 mx-5">

                  <template v-slot:[`item.id`]="{ item }">
                                        <span>
                                            {{ language == 'bn' ?
                                            $helpers.englishToBangla(item.id) :
                                            item.id }}
                                        </span>
                  </template>
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

                  <template v-slot:item.allocated_beneficiary="{ item }">
                    {{
                      language === "bn"
                          ? $helpers.englishToBangla(item.allocated_beneficiary)
                          : item.allocated_beneficiary
                    }}
                  </template>

                  <template v-slot:[`item.active_beneficiary`]="{ item }">
                                        <span>
                                            {{ language == 'bn' ?
                                            $helpers.englishToBangla(item.active_beneficiary) :
                                            item.active_beneficiary }}
                                        </span>
                  </template>
                </v-data-table>
              </v-row>

              <v-row class="mx-0 my-0 py-2" justify="center">
                <v-btn flat @click="dialogAdd = false" outlined class="custom-btn-width py-2 mr-10">
                  {{ $t("container.list.cancel") }}
                </v-btn>

                <div>
                  <v-btn v-if="data.id != null" type="submit" flat color="primary" :disabled="invalid"
                         :loading="loading" class="custom-btn-width success white--text py-2">
                    {{ $t("container.list.update") }}
                  </v-btn>

                  <v-btn v-else type="submit" flat color="primary" :disabled="invalid"
                         :loading="loading" class="custom-btn-width success white--text py-2">
                    {{ $t("container.list.submit") }}
                  </v-btn>
                </div>
              </v-row>
            </form>
          </ValidationObserver>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!--  Preview and Send modal  -->
  </div>
</template>

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