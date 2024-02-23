<template>
  <div id="aplication_list">
    <v-row class="mx-5 mt-4">
      <v-col cols="12">
        <Spinner :loading="isLoading" />
        <v-row>
          <v-col cols="12">
            <!-- Expantion panels start -->
            <v-expansion-panels>
              <v-expansion-panel class="ma-2">
                <v-expansion-panel-header color="#8C9EFF">
                  <h3 class="white--text">
                    {{
                      $t(
                        "container.beneficiary_management.beneficiary_list.replace_list"
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
                            <v-text-field
                              outlined
                              readonly
                              v-model="user_permission.division.name_en"
                              :label="
                                $t(
                                  'container.system_config.demo_graphic.division.division'
                                )
                              "
                              v-if="user_permission.division"
                            >
                            </v-text-field>
                            <v-autocomplete
                              v-if="!user_permission.division"
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
                            <v-text-field
                              outlined
                              readonly
                              v-model="user_permission.division.name_en"
                              :label="
                                $t(
                                  'container.system_config.demo_graphic.district.district'
                                )
                              "
                              v-if="user_permission.district"
                            >
                            </v-text-field>
                            <v-autocomplete
                              v-if="!user_permission.district"
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
                            <v-text-field
                              outlined
                              readonly
                              v-model="user_permission.location_type.value_en"
                              :label="$t('container.list.location_type')"
                              v-if="user_permission.location_type"
                            >
                            </v-text-field>
                            <v-autocomplete
                              v-if="!user_permission.location_type"
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
                            <v-text-field
                              outlined
                              readonly
                              v-model="
                                user_permission.district_pourashava.name_en
                              "
                              :label="
                                $t(
                                  'container.system_config.demo_graphic.ward.pouro'
                                )
                              "
                              v-if="user_permission.location_type"
                            >
                            </v-text-field>
                            <v-autocomplete
                              v-if="!user_permission.district_pourashava"
                              v-model="data.district_pouro_id"
                              outlined
                              :label="
                                $t(
                                  'container.system_config.demo_graphic.ward.pouro'
                                )
                              "
                              @change="onChangeDistrictPouro($event)"
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
                            <v-text-field
                              outlined
                              readonly
                              v-model="user_permission.upazila.name_en"
                              :label="
                                $t(
                                  'container.system_config.demo_graphic.thana.thana'
                                )
                              "
                              v-if="user_permission.upazila"
                            >
                            </v-text-field>
                            <v-autocomplete
                              v-if="!user_permission.upazila"
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
                            name="subLocationType"
                            vid="subLocationType"
                            v-slot="{ errors }"
                          >
                            <v-autocomplete
                              @input="onChangeSubLocationType($event)"
                              v-model="data.sub_location_type"
                              outlined
                              :label="
                                $t(
                                  'container.system_config.demo_graphic.ward.subLocation_type'
                                )
                              "
                              :items="subLocationType"
                              item-text="value_en"
                              item-value="id"
                              :error="errors[0] ? true : false"
                              :error-messages="errors[0]"
                              :hide-details="errors[0] ? false : true"
                              class="no-arrow-icon"
                              :append-icon-cb="appendIconCallback"
                              append-icon="mdi-plus"
                            ></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <v-col
                          v-if="
                            data.location_type == 2 &&
                            data.sub_location_type == 1
                          "
                          lg="3"
                          md="3"
                          cols="12"
                        >
                          <ValidationProvider
                            name="pouros"
                            vid="pouros"
                            v-slot="{ errors }"
                          >
                            <v-autocomplete
                              v-model="data.pouro_id"
                              outlined
                              :label="
                                $t(
                                  'container.system_config.demo_graphic.ward.pouro'
                                )
                              "
                              :items="pouros"
                              item-text="name_en"
                              item-value="id"
                              :error="errors[0] ? true : false"
                              :error-messages="errors[0]"
                              :hide-details="errors[0] ? false : true"
                              class="no-arrow-icon"
                              :append-icon-cb="appendIconCallback"
                              append-icon="mdi-plus"
                            ></v-autocomplete>
                          </ValidationProvider>
                        </v-col>

                        <v-col
                          v-if="
                            data.sub_location_type == 2 &&
                            data.location_type == 2
                          "
                          lg="3"
                          md="3"
                          cols="12"
                        >
                          <ValidationProvider
                            name="unions"
                            vid="unions"
                            v-slot="{ errors }"
                          >
                            <v-autocomplete
                              @input="onChangeUnionGetWard($event)"
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
                              :error="errors[0] ? true : false"
                              :error-messages="errors[0]"
                              :hide-details="errors[0] ? false : true"
                              class="no-arrow-icon"
                              :append-icon-cb="appendIconCallback"
                              append-icon="mdi-plus"
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
                            <v-text-field
                              outlined
                              readonly
                              v-model="user_permission.city_corp.name_en"
                              :label="
                                $t(
                                  'container.system_config.demo_graphic.ward.city'
                                )
                              "
                              v-if="user_permission.city_corp"
                            >
                            </v-text-field>
                            <v-autocomplete
                              v-if="!user_permission.city_corp"
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
                            vid="thana_id"
                            v-slot="{ errors }"
                          >
                            <v-autocomplete
                              v-model="data.thana_id"
                              outlined
                              :label="
                                $t(
                                  'container.system_config.demo_graphic.ward.thana'
                                )
                              "
                              @change="onChangeThana($event)"
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
                    $t(
                      "container.beneficiary_management.beneficiary_list.replace_list"
                    )
                  }}
                </h3>
              </v-card-title>
              <v-card-text>
                <v-row justify="end" align="center" class="mx-4">
                  <!-- Dropdown on the right -->
                  <v-col lg="4" md="4" cols="12" class="text-right">
                    <v-btn
                      elevation="2"
                      class="btn mr-2 white--text"
                      flat
                      color="red darken-4"
                      @click="GeneratePDF()"
                    >
                      <v-icon class="pr-1"> mdi-tray-arrow-down </v-icon>
                      {{ $t("container.list.PDF") }}
                    </v-btn>
                    <!-- <v-btn
                        elevation="2"
                        class="btn mr-2 white--text"
                        color="teal darken-2"
                        @click="GenerateExcel()"
                        >{{ $t("container.list.excel") }}</v-btn
                      > -->
                  </v-col>
                </v-row>
                <v-row
                  class="ma-0 white round-border d-flex justify-space-between align-center"
                  justify="center"
                  justify-lg="space-between"
                >
                  <v-col cols="12">
                    <v-data-table
                      :headers="header"
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
                      <template v-slot:item.actions="{ item }">
                        <v-btn
                          v-on="on"
                          color="success"
                          elevation="0"
                          @click="rollBackBeneficiary(item.id)"
                        >
                          {{
                            $t(
                              "container.beneficiary_management.beneficiary_list.rollback"
                            )
                          }}
                        </v-btn>
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
      <!-- Beneficiary RollBack modal  -->
      <v-dialog v-model="dialogRollBack" width="400">
        <v-card style="justify-content: center; text-align: center">
          <v-card-title class="font-weight-bold justify-center">
            {{ $t("container.list.attention") }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="mt-2">
            <h3>
              {{
                $t(
                  "container.beneficiary_management.beneficiary_list.rollback_message"
                )
              }}
            </h3>
            <v-row class="mx-0 my-0 py-2 mt-5 mb-2" justify="end">
              <v-btn
                flat
                @click="dialogRollBack = false"
                outlined
                class="custom-btn-width py-2 mr-10"
              >
                {{ $t("container.list.no") }}
              </v-btn>
              <v-btn
                flat
                @click="beneficiaryRollBack"
                color="primary"
                :disabled="invalid"
                :loading="loading"
                class="custom-btn-width warning white--text py-2"
              >
                {{ $t("container.list.yes") }}
              </v-btn>
            </v-row>
          </v-card-text>
        </v-card>
      </v-dialog>
      <!-- Beneficiary RollBack modal  -->
    </v-row>
  </div>
</template>
  
<script>
import { mapState, mapActions } from "vuex";
import { extend, ValidationProvider, ValidationObserver } from "vee-validate";
import { required } from "vee-validate/dist/rules";
import Spinner from "@/components/Common/Spinner.vue";

extend("required", required);
export default {
  name: "Index",
  title: "CTM - Beneficiary Replacement List",
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

      beneficiaryItem: {},
      isLoading: false,
      loading: true,
      search: "",
      delete_id: "",
      applications: [],
      beneficiaries: [],
      programs: [],
      districts: [],
      locationType: [],
      thanas: [],
      cities: [],
      unions: [],
      wards: [],
      district_pouros: [],
      dialogRollBack: false,
      rollBack_id: null,
      subLocationType: [
        {
          id: 1,
          value_en: "Pouroshava",
        },

        {
          id: 2,
          value_en: "Union",
        },
      ],
      user_permission: {
        division: null,
        district: null,
        location_type: null,
        upazila: null,
        city_corp: null,
        district_pourashava: null,
      },
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
    Spinner,
    ValidationProvider,
    ValidationObserver,
  },
  computed: {
    ...mapState({
      divisions: (state) => state.Division.divisions,
      userData: (state) => state.userData,
    }),
    header() {
      return [
        { text: this.$t("container.list.sl"), value: "sl", align: "start" },
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
            "container.application_selection.application.father_name_en"
          ),
          value: "father_name_en",
        },
        {
          text: this.$t("container.application_selection.application.program"),
          value: "program_name_en",
        },
        {
          text: this.$t(
            "container.application_selection.application.replace_with_application_id"
          ),
          value: "replace_with_application_id",
        },
        {
          text: this.$t(
            "container.application_selection.application.replace_with_name_en"
          ),
          value: "replace_with_name_en",
        },
        {
          text: this.$t("container.list.action"),
          value: "actions",
          width: "100",
          align: "end",
        },
      ];
    },
  },
  methods: {
    ...mapActions({
      GetAllDivisions: "Division/GetAllDivisions",
    }),
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
              if (!item?.district) {
                this.onChangeDivision(item?.division?.id);
              } else {
                this.data.district_id = item?.district?.id;
                this.user_permission.district = item?.district;
              }
            }
            if (item?.location_type) {
              this.user_permission.location_type = item?.location_type;
              this.data.location_type = item?.location_type?.id;
            }
            if (item?.district_pourashava) {
              this.data.district_pouro_id = item?.district_pourashava?.id;
              this.user_permission.district_pourashava =
                item?.district_pourashava;
              this.onChangeDistrictPouro(item?.district_pourashava?.id);
            }
            if (item?.upazila) {
              this.user_permission.upazila = item?.upazila;
              this.data.thana_id = item?.upazila?.id;
            }
            if (item?.city_corp) {
              this.data.city_id = item?.city_corp?.id;
              this.user_permission.city_corp = item?.city_corp;
              this.onChangeCity(item?.city_corp?.id);
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
    onPageChange($event) {
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
        location_type: this.data.location_type,
        program_id: this.data.program_id,
        division_id: this.data.division_id,
        district_id: this.data.district_id,
        city_corp_id: this.data.city_id,
        thana_id: this.data.thana_id,
        district_pouro_id: this.data.district_pouro_id,

        city_thana_id: this.data.city_thana_id,
        sub_location_type: this.sub_location_type,
        pouro_id: this.data.pouro_id,
        union_id: this.data.union_id,
        ward_id: this.data.ward_id,

        perPage: this.pagination.perPage,
        page: this.pagination.current,
        // sortBy: this.sortBy,
        // orderBy: this.sortDesc,
      };
      this.$axios
        .get("/admin/beneficiary/replaceList", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
          params: queryParams,
        })
        .then((result) => {
          this.beneficiaries = result.data.data;

          // this.beneficiaries = results.map((item) => {
          //   return (item = {
          //     ...item,
          //     status: this.ben_status[item.status - 1].value,
          //   });
          // });
          this.pagination.current = result.data.meta.current_page;
          this.pagination.total = result.data.meta.last_page;
          this.pagination.grand_total = result.data.meta.total;
          this.loading = false;
        });
    },
    updateHeaderTitle() {
      const title = this.$t(
        "container.beneficiary_management.beneficiary_list.replace_list"
      );
      this.$store.commit("setHeaderTitle", title);
    },
    rollBackBeneficiary(event) {
      this.dialogRollBack = true;
      this.rollBack_id = event;
    },
    beneficiaryRollBack() {
      if (!this.rollBack_id) {
        return;
      }
      try {
        this.$store
          .dispatch(
            "BeneficiaryManagement/RollBackReplaceBeneficiary",
            this.rollBack_id
          )
          .then((res) => {
            console.log(res, "submit__");
            if (res.data?.success) {
              this.$toast.success("RollBack Successfully");
              this.dialogRollBack = false;
              this.GetApplication();
            } else if (res.response?.data?.errors) {
              this.$refs.form.setErrors(res.response.data.errors);
              this.errors = res.response.data.errors;
            }
          });
      } catch (e) {
        console.log(e);
      }
    },
    async GeneratePDF() {
      this.isLoading = true;
      const queryParams = {
        language: this.$i18n.locale,
        program_id: this.data.program_id,
        division_id: this.data.division_id,
        district_id: this.data.district_id,
        city_corp_id: this.data.city_id,
        city_thana_id: this.data.city_thana_id,
        district_pouro_id: this.data.district_pouro_id,
        location_type: this.data.location_type,

        pouro_id: this.data.pouro_id,
        union_id: this.data.union_id,
        thana_id: this.data.thana_id,
        ward_id: this.data.ward_id,
      };
      this.$axios
        .get("/admin/beneficiary/getBeneficiaryReplaceListPdf", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "application/json",
          },
          params: queryParams,
          responseType: 'arraybuffer',
        })
        .then((result) => {
          const blob = new Blob([result.data], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(blob);
          window.open(url, '_blank');
          this.isLoading = false;
          // window.open(result.data.data.url, "_blank");
        })
        .catch((error) => {
          this.isLoading = false;
          console.error("Error generating PDF:", error);
        });
    },
  },
  watch: {
    "$i18n.locale": "updateHeaderTitle",
  },
  created() {
    this.GetAllDivisions();
    this.GetAllProgram();
    this.GetUserPermission();
  },
  beforeMount() {
    this.updateHeaderTitle();
  },
  mounted() {
    this.$store
      .dispatch("getLookupByType", 1)
      .then((res) => (this.locationType = res));
  },
};
</script>