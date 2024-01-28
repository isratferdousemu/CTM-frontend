<template>
  <div id="digital_id_list">
    <v-row class="mx-5 mt-4">
      <v-col cols="12">
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
                      <ValidationProvider
                        name="ProgramName"
                        vid="program_id"
                        v-slot="{ errors }"
                      >
                        <v-autocomplete
                          :hide-details="errors[0] ? false : true"
                          @input="onChangeProgramName($event)"
                          v-model="data.program_id"
                          outlined
                          :label="
                            $t(
                              'container.system_config.demo_graphic.committee.program_name'
                            )
                          "
                          :items="programs"
                          item-text="name_en"
                          item-value="id"
                          class="no-arrow-icon"
                          :append-icon-cb="appendIconCallback"
                          append-icon="mdi-plus"
                          :error="errors[0] ? true : false"
                          :error-messages="errors[0]"
                        ></v-autocomplete>
                      </ValidationProvider>
                    </v-col>
                    <v-col lg="3" md="3" cols="12">
                      <ValidationProvider
                        name="Division"
                        vid="division"
                        v-slot="{ errors }"
                      >
                        <v-autocomplete
                          outlined
                          @input="onChangeDivision($event)"
                          v-model="data.division_id"
                          :label="
                            $t(
                              'container.system_config.demo_graphic.division.division'
                            )
                          "
                          :items="divisions"
                          item-text="name_en"
                          item-value="id"
                          :error="errors[0] ? true : false"
                          :error-messages="errors[0]"
                          class="no-arrow-icon"
                          :append-icon-cb="appendIconCallback"
                          append-icon="mdi-plus"
                        >
                        </v-autocomplete>
                      </ValidationProvider>
                    </v-col>
                    <v-col lg="3" md="3" cols="12">
                      <ValidationProvider
                        name="District"
                        vid="district"
                        v-slot="{ errors }"
                      >
                        <v-autocomplete
                          outlined
                          v-model="data.district_id"
                          @input="onChangeDistrict($event)"
                          :label="
                            $t(
                              'container.system_config.demo_graphic.district.district'
                            )
                          "
                          :items="districts"
                          item-text="name_en"
                          item-value="id"
                          class="no-arrow-icon"
                          :append-icon-cb="appendIconCallback"
                          append-icon="mdi-plus"
                          :error="errors[0] ? true : false"
                          :error-messages="errors[0]"
                        ></v-autocomplete>
                      </ValidationProvider>
                    </v-col>
                    <v-col lg="3" md="3" cols="12">
                      <ValidationProvider
                        name="Location Type"
                        vid="location_type"
                        v-slot="{ errors }"
                      >
                        <v-autocomplete
                          @input="LocationType($event)"
                          v-model="data.location_type"
                          outlined
                          :label="$t('container.list.location_type')"
                          :items="locationType"
                          item-text="value_en"
                          item-value="id"
                          class="no-arrow-icon"
                          :append-icon-cb="appendIconCallback"
                          append-icon="mdi-plus"
                          :error="errors[0] ? true : false"
                          :error-messages="errors[0]"
                        ></v-autocomplete>
                      </ValidationProvider>
                    </v-col>
                    <v-col
                      v-if="data.location_type == 1"
                      lg="3"
                      md="3"
                      cols="12"
                    >
                      <ValidationProvider
                        name="thana"
                        vid="district_pouro_id"
                        v-slot="{ errors }"
                      >
                        <v-autocomplete
                          v-model="data.district_pouro_id"
                          outlined
                          :label="
                            $t(
                              'container.system_config.demo_graphic.ward.pouro'
                            )
                          "
                          :items="district_pouros"
                          item-text="name_en"
                          item-value="id"
                          class="no-arrow-icon"
                          :append-icon-cb="appendIconCallback"
                          append-icon="mdi-plus"
                          :error="errors[0] ? true : false"
                          :error-messages="errors[0]"
                        ></v-autocomplete>
                      </ValidationProvider>
                    </v-col>
                    <v-col
                      v-if="data.location_type == 2"
                      lg="3"
                      md="3"
                      cols="12"
                    >
                      <ValidationProvider
                        name="Upazila"
                        vid="thana_id"
                        v-slot="{ errors }"
                      >
                        <v-autocomplete
                          v-model="data.thana_id"
                          outlined
                          :label="
                            $t(
                              'container.system_config.demo_graphic.thana.thana'
                            )
                          "
                          @change="onChangeUpazila($event)"
                          :items="thanas"
                          item-text="name_en"
                          item-value="id"
                          class="no-arrow-icon"
                          :append-icon-cb="appendIconCallback"
                          append-icon="mdi-plus"
                          :error="errors[0] ? true : false"
                          :error-messages="errors[0]"
                        ></v-autocomplete>
                      </ValidationProvider>
                    </v-col>
                    <v-col
                      v-if="data.location_type == 2"
                      lg="3"
                      md="3"
                      cols="12"
                    >
                      <ValidationProvider
                        name="union"
                        vid="union_id"
                        v-slot="{ errors }"
                      >
                        <v-autocomplete
                          v-model="data.union_id"
                          outlined
                          :label="
                            $t(
                              'container.system_config.demo_graphic.ward.union'
                            )
                          "
                          :items="unions"
                          item-text="name_en"
                          item-value="id"
                          class="no-arrow-icon"
                          :append-icon-cb="appendIconCallback"
                          append-icon="mdi-plus"
                          :error="errors[0] ? true : false"
                          :error-messages="errors[0]"
                        ></v-autocomplete>
                      </ValidationProvider>
                    </v-col>

                    <v-col
                      v-if="data.location_type == 3"
                      lg="3"
                      md="3"
                      cols="12"
                    >
                      <ValidationProvider
                        name="city"
                        vid="city_id"
                        v-slot="{ errors }"
                      >
                        <v-autocomplete
                          v-model="data.city_id"
                          @change="onChangeCity($event)"
                          outlined
                          :label="
                            $t('container.system_config.demo_graphic.ward.city')
                          "
                          :items="cities"
                          item-text="name_en"
                          item-value="id"
                          class="no-arrow-icon"
                          :append-icon-cb="appendIconCallback"
                          append-icon="mdi-plus"
                          :error="errors[0] ? true : false"
                          :error-messages="errors[0]"
                        ></v-autocomplete>
                      </ValidationProvider>
                    </v-col>

                    <v-col
                      v-if="data.location_type == 3"
                      lg="3"
                      md="3"
                      cols="12"
                    >
                      <ValidationProvider
                        name="thana"
                        vid="city_thana_id"
                        v-slot="{ errors }"
                      >
                        <v-autocomplete
                          v-model="data.city_thana_id"
                          outlined
                          :label="
                            $t(
                              'container.system_config.demo_graphic.ward.thana'
                            )
                          "
                          :items="city_thanas"
                          item-text="name_en"
                          item-value="id"
                          class="no-arrow-icon"
                          :append-icon-cb="appendIconCallback"
                          append-icon="mdi-plus"
                          :error="errors[0] ? true : false"
                          :error-messages="errors[0]"
                        ></v-autocomplete>
                      </ValidationProvider>
                    </v-col>

                    <v-col
                      v-if="
                        data.location_type == 1 ||
                        data.location_type == 2 ||
                        data.location_type == 3
                      "
                      lg="3"
                      md="3"
                      cols="12"
                    >
                      <ValidationProvider
                        name="ward"
                        vid="ward_id"
                        v-slot="{ errors }"
                      >
                        <v-autocomplete
                          v-model="data.ward_id"
                          outlined
                          :label="
                            $t('container.system_config.demo_graphic.ward.ward')
                          "
                          :items="wards"
                          item-text="name_en"
                          item-value="id"
                          class="no-arrow-icon"
                          :append-icon-cb="appendIconCallback"
                          append-icon="mdi-plus"
                          :error="errors[0] ? true : false"
                          :error-messages="errors[0]"
                        ></v-autocomplete>
                      </ValidationProvider>
                    </v-col>
                  </v-row>

                  <div class="d-inline d-flex justify-end">
                    <v-btn
                      elevation="2"
                      class="btn mr-2"
                      color="success"
                      type="submit"
                      >{{ $t("container.list.search") }}</v-btn
                    >
                    <v-btn elevation="2" class="btn" @click="resetSearch">{{
                      $t("container.list.reset")
                    }}</v-btn>
                  </div>
                </form>
              </ValidationObserver>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <!-- Expantion panels end -->
      </v-col>

      <v-col cols="12">
        <v-card>
          <v-card-title class="font-weight-bold justify-center">
            {{ $t("container.beneficiary_management.beneficiary_list.list") }}
          </v-card-title>

          <v-data-table
            :headers="selectedHeaders"
            :items="beneficiaries"
            :loading="loading"
            item-key="id"
            :items-per-page="pagination.perPage"
            hide-default-footer
            class="elevation-0 transparent row-pointer"
          >
            <template v-slot:item.sl="{ item, index }">
              {{ (pagination.current - 1) * pagination.perPage + index + 1 }}
            </template>
            <!-- Action Button -->
            <template v-slot:item.actions="{ item }">
              <v-btn
                v-on="on"
                color="success"
                elevation="0"
                router
                :to="`/beneficiary-management/digital-id-card/${item.id}`"
              >
                {{
                  $t(
                    "container.beneficiary_management.digital_id.digital_id_card"
                  )
                }}
              </v-btn>
            </template>
            <!-- End Action Button -->
            <template v-slot:footer="item">
              <div class="text-center pt-2 v-data-footer justify-center pb-2">
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
  title: "CTM - Digital ID Card",

  data() {
    return {
      data: {
        program_id: null,
        division_id: null,
        district_id: null,
        city_id: null,
        city_thana_id: null,
        union_id: null,
        thana_id: null,
      },

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
      selectedHeaders: [
        { text: this.$t("container.list.sl"), value: "sl" },
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
          text: this.$t(
            // "container.beneficiary_management.beneficiary_list.beneficiary_id"
            "container.application_selection.application.father_name_en"
          ),
          value: "father_name_en",
        },
        {
          text: this.$t("container.application_selection.application.program"),
          value: "program.name_en",
        },
        {
          text: this.$t("container.application_selection.application.mobile"),
          value: "mobile",
        },
        {
          text: this.$t("container.list.status"),
          value: "status",
        },
        {
          text: this.$t("container.list.action"),
          value: "actions",
          width: "25%",
        },
      ],
      beneficiaries: [],
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

      pagination: {
        current: 1,
        total: 0,
        perPage: 10,
      },
      items: [5, 10, 15, 20, 40, 50, 100],
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
          text: this.$t(
            "container.beneficiary_management.beneficiary_list.beneficiary_id"
          ),
          value: "name_en",
        },
        {
          text: this.$t("container.system_config.demo_graphic.union.union"),
          value: "1",
        },
        {
          text: this.$t("container.list.mobile"),
          value: "2",
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
      this.data.city_thana_id = null;
      this.data.union_id = null;
      this.data.thana_id = null;

      this.districts = null;
      this.thanas = null;
      this.district_pouros = null;
      this.unions = null;
      this.cities = null;
      this.city_thanas = null;

      this.GetApplication();
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
      if (this.data.district_id != null && this.data.location_type != null) {
        if ($event === 2) {
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
        if ($event === 3) {
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
      }
    },

    async onChangeThana(event) {
      await this.$axios
        .get(`/admin/union/get/${event}`, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          this.unions = result.data.data;
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
          this.city_thanas = result.data.data;
        });
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

    onPageChange($event) {
      // this.pagination.current = $event;
      this.loading = true;
      this.Getbeneficiary();
    },
    onSearch() {
      this.loading = true;
      this.pagination = {
        ...this.pagination,
        current: 1,
      };
      this.Getbeneficiary();
    },
    async Getbeneficiary() {
      const queryParams = {
        program_id: this.data.program_id,
        division_id: this.data.division_id,
        district_id: this.district_id,
        city_corp_id: this.data.city_id,
        district_pourashava_id: this.district_pouros,
        pourashava_id: this.district_pouros,
        union_id: this.data.union_id,
        upazila_id: this.data.thana_id,
        ward_id: this.data.ward_id,

        perPage: this.pagination.perPage,
        page: this.pagination.current,
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

    updateHeaderTitle() {
      const title = this.$t(
        "container.beneficiary_management.digital_id.digital_id_card"
      );
      this.$store.commit("setHeaderTitle", title);
    },
  },
  // watch: {
  //   "$i18n.locale": "updateHeaderTitle",
  //   value(val) {
  //     this.selectedHeaders = [
  //       { text: this.$t("container.list.sl"), value: "sl" },
  //       ...val,
  //       { text: this.$t("container.list.action"), value: "actions" },
  //     ];
  //   },
  // },

  beforeMount() {
    this.updateHeaderTitle();
  },
  created() {
    this.Getbeneficiary();
  },

  mounted() {
    // this.Getbeneficiary();
    this.GetAllProgram();
    this.GetAllDivisions();
    this.$store
      .dispatch("getLookupByType", 1)
      .then((res) => (this.locationType = res));
  },
};
</script>