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
                                $t(
                                  'container.system_config.demo_graphic.ward.city'
                                )
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
                                $t(
                                  'container.system_config.demo_graphic.ward.ward'
                                )
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
                        <!-- <v-col lg="3" md="3" cols="12">
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
                        </v-col> -->
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
                          <v-text-field
                            outlined
                            clearable
                            :label="
                              $t(
                                'container.beneficiary_management.beneficiary_list.beneficiary_id'
                              )
                            "
                            v-model="data.beneficiary_id"
                          >
                          </v-text-field>
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
                            v-model="data.nominee_name"
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
                            v-model="data.account_number"
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
                            v-model="data.nid"
                          >
                          </v-text-field>
                        </v-col>

                        <v-col lg="3" md="3" cols="12">
                          <ValidationProvider
                            name="status"
                            vid="status_id"
                            v-slot="{ errors }"
                          >
                            <v-autocomplete
                              v-model="data.status"
                              outlined
                              :label="$t('container.list.status')"
                              :items="ben_status"
                              item-text="value"
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
                      :items="beneficiaries"
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
                              elevation="0"
                              router
                              to="/beneficiary-management/switch-program"
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
                              router
                              :to="`/beneficiary-management/beneficiary-info/details/${item.id}`"
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
                              router
                              :to="`/beneficiary-management/beneficiary-info/edit/${item.id}`"
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
                              class="ml-3 white--text"
                              elevation="0"
                              router 
                              :to="`/beneficiary-management/beneficiary-replacement/${item.id}`"
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
                              class="ml-3 white--text"
                              elevation="0"
                              router 
                              :to="`/beneficiary-management/beneficiary-journey/${item.id}`"
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

      <!-- Committee View modal  -->
      <v-dialog v-model="dialogView" width="80%">
        <v-card style="justify-content: left; text-align: left">
          <v-card-title class="font-weight-bold justify-center">
            Beneficiary View
            <!-- {{ $t("container.system_config.demo_graphic.committee.view") }} -->
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <ValidationObserver ref="form" v-slot="{ invalid }">
              <form @submit.prevent="update()">
                <v-simple-table>
                  <template v-if="beneficiaryItem">
                    <tbody>
                      <tr>
                        <td><h4>Program Name</h4></td>
                        <td>{{ beneficiaryItem.program.name_en }}</td>
                        <td><h4>Application Id</h4></td>
                        <td>{{ beneficiaryItem.application_id }}</td>
                      </tr>
                      <tr>
                        <td><h4>Name</h4></td>
                        <td>{{ beneficiaryItem.name_en }}</td>
                        <td><h4>Father Name</h4></td>
                        <td>{{ beneficiaryItem.father_name_en }}</td>
                      </tr>
                      <tr>
                        <td><h4>Mother Name</h4></td>
                        <td>{{ beneficiaryItem.mother_name_en }}</td>
                        <td><h4>Mobile</h4></td>
                        <td>{{ beneficiaryItem.mobile }}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </form>
            </ValidationObserver>
          </v-card-text>
        </v-card>
      </v-dialog>
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
        program_id: null,
        division_id: null,
        district_id: null,
        location_type: null,
        city_id: null,
        city_thana_id: null,
        union_id: null,
        ward_id: null,
        thana_id: null,
        beneficiary_id: null,
        nominee_name: null,
        account_number: null,
        nid: null,
        status: null,
      },
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

      value: [
        {
          text: this.$t("container.list.name_en"),
          value: "name_en",
        },
        {
          text: this.$t(
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
      ], // Default selection without 'name'
      selectedHeaders: [],
      dialogView: false,
      beneficiaryItem: {},
      loading: true,
      search: "",
      delete_id: "",
      applications: [],
      beneficiaries: [],
      programs: [],
      divisions: [],
      districts: [],
      locationType: [],
      thanas: [],
      cities: [],
      unions: [],
      wards: [],
      city_thanas: [],
      district_pouros: [],
      advanch_search: false,

      pagination: {
        current: 1,
        total: 0,
        perPage: 10,
      },
      sortBy: "created_at",
      sortDesc: "desc",
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
          value: "id",
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
          text: this.$t(
            "container.application_selection.application.union_pourashava"
          ),
          value: "union_pourashava",
        },
        {
          text: this.$t("container.system_config.demo_graphic.ward.ward"),
          value: "ward",
        },
        {
          text: this.$t("container.application_selection.application.village"),
          value: "village",
        },
        {
          text: this.$t("container.application_selection.application.mobile"),
          value: "mobile",
        },
        {
          text: this.$t("container.list.status"),
          value: "status",
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
          // value: item => `${item.name.first} ${item.name.last}`,
          // this.headers = this.headers.filter(header => header.key !== key)
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
    resetSearch() {
      console.log("reset __________--");
      this.data.program_id = null;
      this.data.division_id = null;
      this.data.district_id = null;
      this.data.city_id = null;
      this.data.city_thana_id = null;
      this.data.union_id = null;
      this.data.thana_id = null;
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
        console.log("LocationType", $event);
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
      this.GetApplication();
    },
    onSearch() {
      this.loading = true;
      this.pagination = {
        ...this.pagination,
        current: 1,
      };
      this.GetApplication();
    },
    async GetApplication() {
      const queryParams = {
        // searchText: this.search,
        // location_type: this.data.locationType,
        program_id: this.data.program_id,
        division_id: this.data.division_id,
        district_id: this.district_id,
        city_corp_id: this.data.city_id,
        district_pourashava_id: this.district_pouros,
        pourashava_id: this.district_pouros,
        union_id: this.data.union_id,
        upazila_id: this.data.thana_id,
        ward_id: this.data.ward_id,

        beneficiary_id: this.data.beneficiary_id,
        nominee_name: this.data.nominee_name,
        account_number: this.data.account_number,
        nid: this.data.nid,
        status: this.data.status,

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
          // this.beneficiaries = result.data.data;
          var results = result.data.data;
          console.log("results", results);

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
        "container.beneficiary_management.beneficiary_list.list"
      );
      this.$store.commit("setHeaderTitle", title);
    },

    async GetBeneficiaryById(item) {
      this.dialogView = true;
      this.beneficiaryItem = item;
      console.log(this.beneficiaryItem);
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
  },
  created() {
    this.GetApplication();
  },
  beforeMount() {
    this.updateHeaderTitle();
  },
  mounted() {
    this.selectedHeaders = this.headers_start;
    this.GetAllProgram();
    this.GetAllDivisions();
    this.$store
      .dispatch("getLookupByType", 1)
      .then((res) => (this.locationType = res));
  },
};
</script>