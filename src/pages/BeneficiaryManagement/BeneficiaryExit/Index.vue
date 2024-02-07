<template>
  <div id="information_tracking">
    <v-row class="mx-5 mt-4">
      <v-col cols="12">
        <div class="d-block text-right">
          <v-btn elevation="2" class="btn my-2" color="primary" router to="/beneficiary-management/beneficiary-exit-list">
            {{ $t("container.list.view-list") }}
          </v-btn>
        </div>
        <!-- Expantion panels start -->
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-header color="#8C9EFF">
              <h3 class="white--text">
                {{ $t("container.list.search") }}
              </h3>
            </v-expansion-panel-header>
            <v-expansion-panel-content class="elevation-0 transparent mt-10">
              <ValidationObserver ref="form" v-slot="{ invalid }">
                <form @submit.prevent="onSearch()">
                  <v-row>
                    <v-col lg="3" md="3" cols="12">
                      <ValidationProvider name="ProgramName" vid="program_id" v-slot="{ errors }">
                        <v-autocomplete :hide-details="errors[0] ? false : true" @input="onChangeProgramName($event)"
                          v-model="data.program_id" outlined :label="$t(
                            'container.system_config.demo_graphic.committee.program_name'
                          )
                            " :items="programs" item-text="name_en" item-value="id" class="no-arrow-icon"
                          :append-icon-cb="appendIconCallback" append-icon="mdi-plus" :error="errors[0] ? true : false"
                          :error-messages="errors[0]"></v-autocomplete>
                      </ValidationProvider>
                    </v-col>
                    <v-col lg="3" md="3" cols="12">
                      <ValidationProvider name="Division" vid="division" v-slot="{ errors }">
                        <v-autocomplete outlined @input="onChangeDivision($event)" v-model="data.division_id" :label="$t(
                          'container.system_config.demo_graphic.division.division'
                        )
                          " :items="divisions" item-text="name_en" item-value="id" :error="errors[0] ? true : false"
                          :error-messages="errors[0]" class="no-arrow-icon" :append-icon-cb="appendIconCallback"
                          append-icon="mdi-plus">
                        </v-autocomplete>
                      </ValidationProvider>
                    </v-col>
                    <v-col lg="3" md="3" cols="12">
                      <ValidationProvider name="District" vid="district" v-slot="{ errors }">
                        <v-autocomplete outlined v-model="data.district_id" @input="onChangeDistrict($event)" :label="$t(
                          'container.system_config.demo_graphic.district.district'
                        )
                          " :items="districts" item-text="name_en" item-value="id" class="no-arrow-icon"
                          :append-icon-cb="appendIconCallback" append-icon="mdi-plus" :error="errors[0] ? true : false"
                          :error-messages="errors[0]"></v-autocomplete>
                      </ValidationProvider>
                    </v-col>
                    <v-col lg="3" md="3" cols="12">
                      <ValidationProvider name="Location Type" vid="location_type" v-slot="{ errors }">
                        <v-autocomplete @input="LocationType($event)" v-model="data.location_type" outlined
                          :label="$t('container.list.location_type')" :items="locationType" item-text="value_en"
                          item-value="id" class="no-arrow-icon" :append-icon-cb="appendIconCallback"
                          append-icon="mdi-plus" :error="errors[0] ? true : false"
                          :error-messages="errors[0]"></v-autocomplete>
                      </ValidationProvider>
                    </v-col>
                    <v-col v-if="data.location_type == 1" lg="3" md="3" cols="12">
                      <ValidationProvider name="thana" vid="district_pouro_id" v-slot="{ errors }">
                        <v-autocomplete v-model="data.district_pouro_id" outlined :label="$t(
                          'container.system_config.demo_graphic.ward.pouro'
                        )
                          " @change="onChangeDistrictPouro($event)" :items="district_pouros" item-text="name_en"
                          item-value="id" class="no-arrow-icon" :append-icon-cb="appendIconCallback"
                          append-icon="mdi-plus" :error="errors[0] ? true : false"
                          :error-messages="errors[0]"></v-autocomplete>
                      </ValidationProvider>
                    </v-col>
                    <v-col v-if="data.location_type == 2" lg="3" md="3" cols="12">
                      <ValidationProvider name="Upazila" vid="thana_id" v-slot="{ errors }">
                        <v-autocomplete v-model="data.thana_id" outlined :label="$t(
                          'container.system_config.demo_graphic.thana.thana'
                        )
                          " @change="onChangeUpazila($event)" :items="thanas" item-text="name_en" item-value="id"
                          class="no-arrow-icon" :append-icon-cb="appendIconCallback" append-icon="mdi-plus"
                          :error="errors[0] ? true : false" :error-messages="errors[0]"></v-autocomplete>
                      </ValidationProvider>
                    </v-col>
                    <v-col v-if="data.location_type == 2" lg="3" md="3" cols="12">
                      <ValidationProvider name="union" vid="union_id" v-slot="{ errors }">
                        <v-autocomplete v-model="data.union_id" outlined :label="$t(
                          'container.system_config.demo_graphic.ward.union'
                        )
                          " @change="onChangeUnion($event)" :items="unions" item-text="name_en" item-value="id"
                          class="no-arrow-icon" :append-icon-cb="appendIconCallback" append-icon="mdi-plus"
                          :error="errors[0] ? true : false" :error-messages="errors[0]"></v-autocomplete>
                      </ValidationProvider>
                    </v-col>

                    <v-col v-if="data.location_type == 3" lg="3" md="3" cols="12">
                      <ValidationProvider name="city" vid="city_id" v-slot="{ errors }">
                        <v-autocomplete v-model="data.city_id" @change="onChangeCity($event)" outlined :label="$t(
                          'container.system_config.demo_graphic.ward.city'
                        )
                          " :items="cities" item-text="name_en" item-value="id" class="no-arrow-icon"
                          :append-icon-cb="appendIconCallback" append-icon="mdi-plus" :error="errors[0] ? true : false"
                          :error-messages="errors[0]"></v-autocomplete>
                      </ValidationProvider>
                    </v-col>

                    <v-col v-if="data.location_type == 3" lg="3" md="3" cols="12">
                      <ValidationProvider name="thana" vid="thana_id" v-slot="{ errors }">
                        <v-autocomplete v-model="data.thana_id" outlined :label="$t(
                          'container.system_config.demo_graphic.ward.thana'
                        )
                          " @change="onChangeThana($event)" :items="thanas" item-text="name_en" item-value="id"
                          class="no-arrow-icon" :append-icon-cb="appendIconCallback" append-icon="mdi-plus"
                          :error="errors[0] ? true : false" :error-messages="errors[0]"></v-autocomplete>
                      </ValidationProvider>
                    </v-col>

                    <v-col v-if="data.location_type == 1 ||
                      data.location_type == 2 ||
                      data.location_type == 3
                      " lg="3" md="3" cols="12">
                      <ValidationProvider name="ward" vid="ward_id" v-slot="{ errors }">
                        <v-autocomplete v-model="data.ward_id" outlined :label="$t(
                          'container.system_config.demo_graphic.ward.ward'
                        )
                          " :items="wards" item-text="name_en" item-value="id" class="no-arrow-icon"
                          :append-icon-cb="appendIconCallback" append-icon="mdi-plus" :error="errors[0] ? true : false"
                          :error-messages="errors[0]"></v-autocomplete>
                      </ValidationProvider>
                    </v-col>
                  </v-row>
                  <div class="d-inline d-flex justify-end">
                    <v-btn elevation="2" class="btn mr-2" color="success" type="submit">{{ $t("container.list.search")
                    }}</v-btn>
                    <v-btn elevation="2" class="btn" @click="resetSearch">{{
                      $t("container.list.reset")
                    }}</v-btn>
                  </div>
                </form>
              </ValidationObserver>

              <v-divider class="mb-5 mt-5"></v-divider>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <!-- Expantion panels end -->
      </v-col>

      <v-col cols="12">
        <v-card class="mb-2">
          <ValidationObserver ref="form" v-slot="{ invalid }">
            <form @submit.prevent="onBeneficiaryExit()">
              <v-row class="ml-2 mr-2">
                <v-col lg="6" md="6" cols="12">
                  <ValidationProvider name="Reason" vid="data.exit_reason_id" rules="required" v-slot="{ errors }">
                    <v-autocomplete :hide-details="errors[0] ? false : true" v-model="data.exit_reason_id" outlined
                      :label="$t('container.list.reason')" :items="cause_types" item-text="value_en" item-value="id"
                      required clearable :error="errors[0] ? true : false" :error-messages="errors[0]"></v-autocomplete>
                  </ValidationProvider>
                </v-col>

                <v-col lg="6" md="6" cols="12">
                  <v-text-field :label="$t('container.list.reason_details')" outlined v-model="data.exit_reason_detail">
                  </v-text-field>
                </v-col>
                <v-col lg="6" md="6" cols="12">
                  <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition"
                    offset-y min-width="auto">
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field outlined clearable v-model="data.exit_date" :label="$t(
                        'container.beneficiary_management.beneficiary_exit.date_of_exit'
                      )
                        " prepend-inner-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                    </template>
                    <v-date-picker v-model="data.exit_date" @input="menu2 = false"></v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>

              <div class="d-inline d-flex justify-end">
                <v-btn elevation="2" class="btn mr-2 mb-2">{{
                  $t("container.list.reset")
                }}</v-btn>
                <v-btn elevation="2" class="btn mr-2 mb-2" color="success" type="submit" flat :disabled="invalid">{{
                  $t("container.list.exit") }}</v-btn>
              </div>
            </form>
          </ValidationObserver>
        </v-card>
        <v-card>
          <v-card-title class="font-weight-bold justify-center">
            {{ $t("container.beneficiary_management.beneficiary_exit.title") }}
          </v-card-title>

          <v-data-table :loading="loading" item-key="id" :headers="headers" :items="beneficiaries"
            :items-per-page="pagination.perPage" hide-default-footer class="elevation-0 transparent row-pointer">
            <template v-slot:item.sl="{ item, index }">
              {{ (pagination.current - 1) * pagination.perPage + index + 1 }}
            </template>
            <template v-slot:item.name_en="{ item }">
              {{ item.name_en }}
            </template>
            <template v-slot:item.name_bn="{ item }">
              {{ item.name_bn }}
            </template>

            <template v-slot:item.id="{ item }">
              <td>
                <v-checkbox v-model="cb[item.id]" />
              </td>
            </template>

            <!-- Action Button -->
            <template v-slot:item.actions="{ item }">
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn v-can="'update-post'" fab x-small v-on="on" color="#AFB42B" elevation="0" class="white--text">
                    <v-icon> mdi-eye </v-icon>
                  </v-btn>
                </template>
                <span>
                  {{ $t("container.list.view") }}
                </span>
              </v-tooltip>
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
                <v-pagination circle primary v-model="pagination.current" :length="pagination.total" @input="onPageChange"
                  :total-visible="11" class="custom-pagination-item"></v-pagination>
              </div>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { extend, ValidationProvider, ValidationObserver } from "vee-validate";
import { required } from "vee-validate/dist/rules";
export default {
  name: "DigitalIndex",
  title: "CTM - Beneficiary Exit",

  data() {
    return {
      data: {
        program_id: null,
        division_id: null,
        district_id: null,
        location_type: null,
        city_id: null,
        // city_thana_id: null,
        district_pouro_id: null,
        thana_id: null,
        union_id: null,
        ward_id: null,

        exit_reason_id: null,
        exit_reason_detail: null,
        exit_date: null,
        beneficiaries: [],
      },

      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,

      loading: false,
      search: "",
      beneficiaries: [],
      cause_types: [],
      loading: true,
      programs: [],
      divisions: [],
      districts: [],
      locationType: [],
      thanas: [],
      cities: [],
      unions: [],
      city_thanas: [],
      district_pouros: [],
      cb: {},

      pagination: {
        current: 1,
        total: 0,
        perPage: 10,
      },
      items: [5, 10, 15, 20, 40, 50, 100],
      value: ["name_bn"],
      ben_status: [
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
      ],
    };
  },
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  computed: {
    checked() {
      var obj = Object.entries(this.cb) // [key, value]
        .filter((o) => o[1]) // filter by truthy values
        .map((o) => o[0]); // map the keys

      console.log("checked__", obj.length);
      return obj;
    },
    headers() {
      return [
        {
          text: this.$t("container.list.select"),
          value: "id",
          align: "start",
          sortable: false,
        },
        {
          text: this.$t(
            "container.beneficiary_management.beneficiary_list.beneficiary_id"
          ),
          value: "application_id",
        },
        {
          text: this.$t("container.list.name_en"),
          value: "name_en",
        },
        {
          text: this.$t("container.application_selection.application.program"),
          value: "program.name_en",
        },
        {
          text: this.$t(
            "container.application_selection.application.father_name_en"
          ),
          value: "father_name_en",
        },
        {
          text: this.$t("container.application_selection.application.mobile"),
          value: "mobile",
        },
        {
          text: this.$t("container.list.action"),
          value: "actions",
          align: "center",
          sortable: false,
        },
      ];
    },
  },

  methods: {

    resetSearch() {
      console.log("reset __________--");
      this.data.program_id = null;
      this.data.division_id = null;
      this.data.district_id = null;
      this.data.city_id = null;
      this.data.district_pouro_id = null;
      this.data.thana_id = null;
      this.data.union_id = null;
      this.data.ward_id = null;
      this.data.beneficiary_id = null;
      this.data.nominee_name = null;
      this.data.account_number = null;
      this.data.nid = null;
      this.data.status = null;

      this.districts = null;
      this.thanas = null;
      this.district_pouros = null;
      this.unions = null;
      this.cities = null;
      this.wards = null;
      // this.city_thanas = null;

      this.GetBeneficiary();
    },

    async GetAllProgram() {
      try {
        this.$axios
          .get("/admin/allowance/get", {
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
    async GetAllDivisions() {
      try {
        this.$axios
          .get("/admin/division/get", {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((result) => {
            console.log(result, "programs");
            this.divisions = result.data.data;
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
        }
        else if ($event === 2) {
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
        }
        else if ($event === 3) {
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
        .get(`/admin/thana/get/city/${this.data.city_id}`, {
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
        .get(`/admin/ward/get/district_pouro/${this.data.district_pouro_id}`, {
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
      this.GetBeneficiary();
    },
    onSearch() {
      this.loading = true;
      this.pagination = {
        ...this.pagination,
        current: 1,
      };
      this.GetBeneficiary();
    },
    async GetBeneficiary() {
      const queryParams = {
        program_id: this.data.program_id,
        division_id: this.data.division_id,
        district_id: this.data.district_id,
        city_corp_id: this.data.city_id,
        district_pourashava_id: this.data.district_pouro_id,
        union_id: this.data.union_id,
        thana_id: this.data.thana_id,
        ward_id: this.data.ward_id,

        perPage: this.pagination.perPage,
        page: this.pagination.current,
        sortBy: this.sortBy,
        orderBy: this.sortDesc,
      };
      this.$axios
        .get("/admin/beneficiary/list", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
          params: queryParams,
        })
        .then((result) => {
          var results = result.data.data;
          this.beneficiaries = results.map((item) => {
            return (item = {
              ...item,
              status: this.ben_status[item.status - 1].value,
            });
          });

          this.pagination.current = result.data.meta.current_page;
          this.pagination.total = result.data.meta.last_page;
          this.pagination.grand_total = result.data.meta.total;
          this.loading = false;
        });
    },
    onCheckboxChange(id) {
      //   const data = {
      //     beneficiary_id: id,
      //   };
      //   this.data.beneficiaries.push(data);
      //   console.log("BEN_DATA", this.data.beneficiaries);
    },
    async onBeneficiaryExit() {
      const beneficiaries = [];

      this.checked.map((item) => {
        const data = {
          beneficiary_id: item,
        };
        beneficiaries.push(data);
      });

      let fd = new FormData();

      fd.append("exit_reason_id", this.data.exit_reason_id);
      fd.append("exit_reason_detail", this.data.exit_reason_detail);
      fd.append("exit_date", this.data.exit_date);

      beneficiaries.forEach((beneficiary, index) => {
        fd.append(
          `beneficiaries[${index}][beneficiary_id]`,
          beneficiary.beneficiary_id
        );
      });

      console.log("__checked__ fd", fd);

      try {
        this.$store
          .dispatch("BeneficiaryManagement/BeneficiaryExit", fd)
          .then((res) => {
            console.log(res, "submit__");
            if (res.data?.success) {
              console.log(res.data?.success, "submit__");
              this.$toast.success("Beneficiary Exit Successfully");
              this.$router.push({ name: "Beneficiary_List" });
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
    updateHeaderTitle() {
      const title = this.$t(
        "container.beneficiary_management.beneficiary_exit.title"
      );
      this.$store.commit("setHeaderTitle", title);
    },
    async GetAllCommitteeType() {
      try {
        this.$store.dispatch("getLookupByType", 22).then((data) => {
          this.cause_types = data;
          console.log(this.cause_types, "Cause_type");
        });
      } catch (e) {
        console.log(e);
      }
    },
  },
  watch: {
    "$i18n.locale": "updateHeaderTitle",
    value(val) { },
  },
  created() {
    this.GetBeneficiary();
  },

  beforeMount() {
    this.updateHeaderTitle();
    this.GetAllCommitteeType();

  },
  mounted() {
    this.GetAllProgram();
    this.GetAllDivisions();
    this.$store
      .dispatch("getLookupByType", 1)
      .then((res) => (this.locationType = res));

  },
};
</script>