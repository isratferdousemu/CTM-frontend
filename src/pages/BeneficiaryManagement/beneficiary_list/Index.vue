<template>
  <div id="aplication_list">
    <v-row class="mx-5 mt-4">
      <v-col cols="12">
        <v-row>
          <v-col cols="12">
            <!-- Expantion panels start -->
            <v-expansion-panels>
              <v-expansion-panel class="ma-2">
                <v-expansion-panel-header color="#8C9EFF">
                  <h3 class="white--text">
                    {{
                      $t(
                        "container.beneficiary_management.beneficiary_list.list"
                      )
                    }}
                  </h3>
                </v-expansion-panel-header>
                <v-expansion-panel-content
                  class="elevation-0 transparent mt-10"
                >
                  <ValidationObserver ref="form" v-slot="{ invalid }">
                    <form @submit.prevent="">
                      <v-row>
                        <v-col lg="3" md="3" cols="12">
                          <v-select
                            outlined
                            menu-props="top"
                            clearable
                            :label="
                              $t(
                                'container.application_selection.application.program'
                              )
                            "
                          >
                          </v-select>
                        </v-col>
                        <v-col lg="3" md="3" cols="12">
                          <v-select
                            outlined
                            clearable
                            :label="$t('container.list.status')"
                          >
                          </v-select>
                        </v-col>

                        <v-col lg="3" md="3" cols="12">
                          <ValidationProvider
                            name="Division"
                            vid="division"
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <v-autocomplete
                              outlined
                              clearable
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
                              required
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
                            rules="required"
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
                              required
                              :error="errors[0] ? true : false"
                              :error-messages="errors[0]"
                            ></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <v-col lg="3" md="3" cols="12">
                          <ValidationProvider
                            name="Location Type"
                            vid="location_type"
                            rules="required"
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
                              required
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
                            rules="required"
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
                              required
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
                            rules="required"
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
                              required
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
                            rules="required"
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
                              required
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
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <v-autocomplete
                              v-model="data.city_id"
                              @change="onChangeCity($event)"
                              outlined
                              :label="
                                $t(
                                  'container.system_config.demo_graphic.ward.city'
                                )
                              "
                              :items="cities"
                              item-text="name_en"
                              item-value="id"
                              required
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
                            rules="required"
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
                              required
                              :error="errors[0] ? true : false"
                              :error-messages="errors[0]"
                            ></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <v-col lg="3" md="3" cols="12">
                          <v-select
                            outlined
                            clearable
                            :label="
                              $t(
                                'container.beneficiary_management.beneficiary_list.search_by'
                              )
                            "
                          >
                          </v-select>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col lg="6" md="6" cols="12">
                          <v-switch
                            v-model="advanch_search"
                            color="primary"
                            :label="
                              $t(
                                'container.beneficiary_management.beneficiary_list.advance_search'
                              )
                            "
                            :value="!advanch_search"
                            hide-details
                          ></v-switch>
                        </v-col>
                      </v-row>

                      <v-row v-if="advanch_search">
                        <v-col lg="3" md="3" cols="12">
                          <v-select
                            outlined
                            clearable
                            :label="
                              $t(
                                'container.beneficiary_management.beneficiary_list.beneficiary_id'
                              )
                            "
                          >
                          </v-select>
                        </v-col>
                        <v-col lg="3" md="3" cols="12">
                          <v-text-field
                            outlined
                            clearable
                            :label="
                              $t(
                                'container.beneficiary_management.beneficiary_list.nominee'
                              )
                            "
                          >
                          </v-text-field>
                        </v-col>
                        <v-col lg="3" md="3" cols="12">
                          <v-text-field
                            outlined
                            clearable
                            :label="
                              $t(
                                'container.beneficiary_management.beneficiary_list.account_no'
                              )
                            "
                          >
                          </v-text-field>
                        </v-col>
                        <v-col lg="3" md="3" cols="12">
                          <v-text-field
                            outlined
                            clearable
                            :label="
                              $t(
                                'container.beneficiary_management.beneficiary_list.nid'
                              )
                            "
                          >
                          </v-text-field>
                        </v-col>
                      </v-row>

                      <div class="d-inline d-flex justify-end">
                        <v-btn elevation="2" class="btn mr-2" color="success">{{
                          $t("container.list.search")
                        }}</v-btn>
                        <v-btn elevation="2" class="btn">{{
                          $t("container.list.reset")
                        }}</v-btn>
                      </div>
                    </form>
                  </ValidationObserver>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <!-- <v-expansion-panel class="ma-2">
                <v-expansion-panel-header color="#8C9EFF">
                  <h3 class="white--text">
                    {{
                      $t(
                        "container.beneficiary_management.beneficiary_list.advance_search"
                      )
                    }}
                  </h3>
                </v-expansion-panel-header>
                <v-expansion-panel-content
                  class="elevation-0 transparent mt-10"
                >
                  <v-row>
                    <v-col lg="6" md="6" cols="12">
                      <v-select
                        outlined
                        clearable
                        :label="
                          $t(
                            'container.beneficiary_management.beneficiary_list.beneficiary_id'
                          )
                        "
                      >
                      </v-select>
                    </v-col>
                    <v-col lg="6" md="6" cols="12">
                      <v-text-field
                        outlined
                        clearable
                        :label="
                          $t(
                            'container.beneficiary_management.beneficiary_list.nominee'
                          )
                        "
                      >
                      </v-text-field>
                    </v-col>
                    <v-col lg="6" md="6" cols="12">
                      <v-text-field
                        outlined
                        clearable
                        :label="
                          $t(
                            'container.beneficiary_management.beneficiary_list.account_no'
                          )
                        "
                      >
                      </v-text-field>
                    </v-col>
                    <v-col lg="6" md="6" cols="12">
                      <v-text-field
                        outlined
                        clearable
                        :label="
                          $t(
                            'container.beneficiary_management.beneficiary_list.nid'
                          )
                        "
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>
                  <div class="d-inline d-flex justify-end">
                    <v-btn elevation="2" class="btn mr-2" color="success">{{
                      $t("container.list.search")
                    }}</v-btn>
                    <v-btn elevation="2" class="btn">{{
                      $t("container.list.reset")
                    }}</v-btn>
                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel> -->
            </v-expansion-panels>
            <!-- Expantion panels end -->
            <!-- Application list -->
            <v-card
              elevation="10"
              color="white"
              rounded="md"
              theme="light"
              class="mb-8 mt-5"
            >
              <v-card-title class="justify-center" tag="div">
                <h3 class="text-uppercase pt-3">
                  {{
                    $t("container.beneficiary_management.beneficiary_list.list")
                  }}
                </h3>
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col> </v-col>
                  <v-col> </v-col>
                  <v-col>
                    <!-- selected columns -->
                    <v-select
                      v-model="value"
                      :items="headers"
                      :label="
                        $t(
                          'container.application_selection.application.select_column'
                        )
                      "
                      multiple
                      return-object
                      outlined
                      menu-props="top"
                    >
                      <template v-slot:selection="{ item, index }"> </template>
                    </v-select>
                    <!-- Select column End -->
                  </v-col>
                </v-row>
                <v-row
                  class="ma-0 white round-border d-flex justify-space-between align-center"
                  justify="center"
                  justify-lg="space-between"
                >
                  <v-col cols="12">
                    <v-data-table
                      :headers="selectedHeaders"
                      :items="divisions"
                      :loading="loading"
                      item-key="id"
                      :items-per-page="pagination.perPage"
                      hide-default-footer
                      class="elevation-0 transparent row-pointer"
                    >
                      <template v-slot:item.sl="{ item, index }">
                        {{
                          (pagination.current - 1) * pagination.perPage +
                          index +
                          1
                        }}
                      </template>
                      <!-- Action Button -->
                      <template v-slot:item.actions="{ item }" width="50%">
                        <v-tooltip top>
                          <template v-slot:activator="{ on }">
                            <v-btn
                              v-can="'update-post'"
                              fab
                              x-small
                              v-on="on"
                              color="#795548"
                              class="mr-3 white--text"
                              router
                              to="/beneficiary-management/switch-program"
                              elevation="0"
                            >
                              <v-icon> mdi mdi-swap-horizontal </v-icon>
                            </v-btn>
                          </template>
                          <span>
                            {{ $t("container.list.switch_program") }}
                          </span>
                        </v-tooltip>
                        <v-tooltip top>
                          <template v-slot:activator="{ on }">
                            <v-btn
                              v-can="'update-post'"
                              fab
                              x-small
                              v-on="on"
                              color="#AFB42B"
                              elevation="0"
                              class="white--text"
                            >
                              <v-icon> mdi-eye </v-icon>
                            </v-btn>
                          </template>
                          <span>
                            {{ $t("container.list.view") }}
                          </span>
                        </v-tooltip>
                        <v-tooltip top>
                          <template v-slot:activator="{ on }">
                            <v-btn
                              v-can="'update-post'"
                              fab
                              x-small
                              v-on="on"
                              color="success"
                              elevation="0"
                              class="ml-3"
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
                              color="#827717"
                              router
                              to="/beneficiary-management/beneficiary-replacement"
                              class="ml-3 white--text"
                              elevation="0"
                            >
                              <v-icon> mdi mdi-file-replace </v-icon>
                            </v-btn>
                          </template>
                          <span> {{ $t("container.list.replace") }}</span>
                        </v-tooltip>
                        <v-tooltip top>
                          <template v-slot:activator="{ on }">
                            <v-btn
                              v-can="'delete-division'"
                              fab
                              x-small
                              v-on="on"
                              color="#546E7A"
                              router
                              to="/beneficiary-management/beneficiary-journey"
                              class="ml-3 white--text"
                              elevation="0"
                            >
                              <v-icon> mdi mdi-history </v-icon>
                            </v-btn>
                          </template>
                          <span>
                            {{ $t("container.list.beneficiary_journey") }}</span
                          >
                        </v-tooltip>
                      </template>
                      <!-- End Action Button -->
                      <template v-slot:footer="item">
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
import { extend, ValidationProvider, ValidationObserver } from "vee-validate";
import { required } from "vee-validate/dist/rules";

extend("required", required);
export default {
  name: "Index",
  title: "CTM - Application List",
  data() {
    return {
      data: {
        division_id: null,
        district_id: null,
        city_id: null,
        city_thana_id: null,
        union_id: null,
        thana_id: null,
      },

      value: ["3", "100", "11", "12"], // Default selection without 'name'
      selectedHeaders: [],
      loading: true,
      search: "",
      delete_id: "",
      applications: [],
      divisions: [],
      districts: [],
      locationType: [],
      thanas: [],
      cities: [],
      unions: [],
      city_thanas: [],
      district_pouros: [],
      advanch_search: false,

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
          text: this.$t("container.application_selection.application.program"),
          value: "100",
        },
        {
          text: this.$t("container.list.name_en"),
          value: "1",
        },
        {
          text: this.$t("container.list.name_bn"),
          value: "2",
        },
        {
          text: this.$t(
            "container.application_selection.application.father_name_en"
          ),
          value: "3",
        },
        {
          text: this.$t(
            "container.application_selection.application.father_name_bn"
          ),
          value: "4",
        },
        {
          text: this.$t(
            "container.application_selection.application.mother_name_en"
          ),
          value: "5",
        },
        {
          text: this.$t(
            "container.application_selection.application.mother_name_bn"
          ),
          value: "6",
        },
        {
          text: this.$t(
            "container.application_selection.application.spouse_name_en"
          ),
          value: "7",
        },
        {
          text: this.$t(
            "container.application_selection.application.spouse_name_bn"
          ),
          value: "8",
        },
        {
          text: this.$t(
            "container.application_selection.application.union_pourashava"
          ),
          value: "9",
        },
        {
          text: this.$t("container.system_config.demo_graphic.ward.ward"),
          value: "13",
        },
        {
          text: this.$t("container.application_selection.application.village"),
          value: "10",
        },
        {
          text: this.$t("container.application_selection.application.mobile"),
          value: "11",
        },
        {
          text: this.$t("container.list.status"),
          value: "12",
        },
      ];
    },
    headers_start() {
      return [
        { text: this.$t("container.list.sl"), value: "sl" },
        {
          text: this.$t("container.list.name_en"),
          value: "name_en",
        },
        {
          text: this.$t(
            "container.beneficiary_management.beneficiary_list.beneficiary_id"
          ),
          value: "",
        },
        {
          text: this.$t("container.application_selection.application.program"),
          value: "100",
        },
        {
          text: this.$t("container.application_selection.application.mobile"),
          value: "11",
        },
        {
          text: this.$t("container.list.status"),
          value: "12",
        },
        {
          text: this.$t("container.list.action"),
          value: "actions",
          width: "25%",
        },
      ];
    },
  },

  methods: {
    ...mapActions({
      GetAllDivisions: "Division/GetAllDivisions",
    }),

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
      this.GetApplication();
    },

    async GetApplication() {
      const queryParams = {
        searchText: this.search,
        perPage: this.pagination.perPage,
        page: this.pagination.current,
      };

      this.$axios
        .get("/admin/division/get", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
          params: queryParams,
        })
        .then((result) => {
          this.divisions = result.data.data;
          this.pagination.current = result.data.meta.current_page;
          this.pagination.total = result.data.meta.last_page;
          this.pagination.grand_total = result.data.meta.total;
          this.loading =false;
        });
    },

    updateHeaderTitle() {
      const title = this.$t(
        "container.beneficiary_management.beneficiary_list.list"
      );
      this.$store.commit("setHeaderTitle", title);
    },
  },
  watch: {
    "$i18n.locale": "updateHeaderTitle",
    value(val) {
      // this.selectedHeaders = val;
      this.selectedHeaders = [
        { text: this.$t("container.list.sl"), value: "sl" },
        ...val,
        { text: this.$t("container.list.action"), value: "actions" },
      ];
    },
  },
  created() {
    this.GetApplication();
  },
  beforeMount() {
    this.updateHeaderTitle();
  },
  mounted() {
    this.selectedHeaders = this.headers_start;
    this.GetAllDivisions();
    this.$store
      .dispatch("getLookupByType", 1)
      .then((res) => (this.locationType = res));
  },
};
</script>