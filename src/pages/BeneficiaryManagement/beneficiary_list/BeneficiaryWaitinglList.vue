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
                        "container.beneficiary_management.beneficiary_list.list_waiting"
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
                      "container.beneficiary_management.beneficiary_list.list_waiting"
                    )
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
                    <v-btn
                      elevation="2"
                      class="btn mr-2 white--text"
                      color="teal darken-2"
                      @click="GenerateExcel()"
                    >
                      <v-icon class="pr-1"> mdi-tray-arrow-down </v-icon>
                      {{ $t("container.list.excel") }}
                    </v-btn>
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
                        <v-tooltip top>
                          <template v-slot:activator="{ on }">
                            <v-btn
                              v-can="'update-post'"
                              fab
                              x-small
                              v-on="on"
                              color="#b71c1c"
                              class="ml-3 white--text"
                              elevation="0"
                              @click="deleteBeneficiaryItem(item.id)"
                            >
                              <v-icon> mdi mdi-delete </v-icon>
                            </v-btn>
                          </template>
                          <span>
                            {{ $t("container.list.delete") }}
                          </span>
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
      <!-- Beneficiary Delete modal  -->
      <v-dialog v-model="dialogDelete" width="650">
        <v-card style="justify-content: center; text-align: center">
          <v-card-title class="font-weight-bold justify-center">
            {{
              $t(
                "container.beneficiary_management.beneficiary_list.beneficiary_delete"
              )
            }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="mt-7">
            <ValidationObserver ref="formDelete" v-slot="{ invalid }">
              <form @submit.prevent="deleteBeneficiary()">
                <!-- {{errors.code}}
                  {{errors.name_en}} -->
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Name English"
                  vid="name_en"
                  rules="required"
                >
                  <v-text-field
                    outlined
                    type="text"
                    v-model="delete_cause"
                    :label="
                      $t(
                        'container.beneficiary_management.beneficiary_list.delete_cause'
                      )
                    "
                    required
                    :error="errors[0] ? true : false"
                    :error-messages="errors[0]"
                  ></v-text-field>
                </ValidationProvider>
                <v-row class="mx-0 my-0 py-2" justify="center">
                  <v-btn
                    flat
                    @click="dialogDelete = false"
                    outlined
                    class="custom-btn-width py-2 mr-10"
                  >
                    {{ $t("container.list.cancel") }}
                  </v-btn>
                  <v-btn
                    type="submit"
                    flat
                    color="#b71c1c"
                    :disabled="invalid"
                    :loading="loading"
                    class="custom-btn-width white--text py-2"
                  >
                    {{ $t("container.list.submit") }}
                  </v-btn>
                </v-row>
              </form>
            </ValidationObserver>
          </v-card-text>
        </v-card>
      </v-dialog>
      <!-- Beneficiary Delete modal  -->
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
  name: "WaitingIndex",
  title: "CTM - Beneficiary (Waiting) List",
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
      beneficiaryItem: {},
      isLoading: false,
      loading: true,
      search: "",
      delete_id: "",
      applications: [],
      beneficiaries: [],
      beneficiary_list: [],
      total: "",
      programs: [],
      districts: [],
      locationType: [],
      thanas: [],
      cities: [],
      unions: [],
      wards: [],
      district_pouros: [],
      advanch_search: false,
      dialogDelete: false,
      ben_delete_id: null,
      delete_cause: null,
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
    ValidationProvider,
    ValidationObserver,
    Spinner,
  },
  computed: {
    ...mapState({
      divisions: (state) => state.Division.divisions,
      userData: (state) => state.userData,
    }),
    headers() {
      return [
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
          align: "center",
          width: "250",
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
      this.data.beneficiary_id = null;
      this.data.nominee_name = null;
      this.data.account_number = null;
      this.data.nid = null;
      this.data.status = null;

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

        beneficiary_id: this.data.beneficiary_id,
        nominee_name: this.data.nominee_name,
        account_number: this.data.account_number,
        nid: this.data.nid,
        status: 3, //Waiting List

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
          this.total = result.data.meta.total;
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
        "container.beneficiary_management.beneficiary_list.list_waiting"
      );
      this.$store.commit("setHeaderTitle", title);
    },
    async GeneratePDF() {
      this.isLoading = true;
      const queryParams = {
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

        beneficiary_id: this.data.beneficiary_id,
        nominee_name: this.data.nominee_name,
        account_number: this.data.account_number,
        nid: this.data.nid,
        status: 3, //Waiting
      };
      this.$axios
        .get("/admin/beneficiary/getBeneficiaryListPdf", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
          params: queryParams,
        })
        .then((result) => {
          window.open(result.data.data.url, "_blank");
          this.isLoading = false;
        })
        .catch((error) => {
          this.isLoading = false;
          console.error("Error generating PDF:", error);
        });
    },
    async GenerateExcel() {
      this.isLoading = true;
      let page;
      if (!this.sortBy) {
        page = this.pagination.current;
      }
      const queryParams = {
        // language: this.$i18n.locale,
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

        beneficiary_id: this.data.beneficiary_id,
        nominee_name: this.data.nominee_name,
        account_number: this.data.account_number,
        nid: this.data.nid,
        status: 3, //Waiting list

        perPage: this.total,
        page: 1, // All data loaded
        sortBy: this.sortBy,
        orderBy: this.sortDesc,
      };

      await this.$axios
        .get("/admin/beneficiary/list", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
          params: queryParams,
        })
        .then((result) => {
          this.beneficiary_list = result.data.data;
          this.isLoading = false;
        })
        .catch((error) => {
          this.isLoading = false;
          console.error("Error generating Excel:", error);
        });

      try {
        import("@/plugins/Export2Excel").then((excel) => {
          const HeaderInfo = [
            this.$t("container.list.sl"),
            this.$t(
              "container.beneficiary_management.beneficiary_list.beneficiary_id"
            ),
            this.$t(
              "container.beneficiary_management.beneficiary_list.beneficiary_name"
            ),
            this.$t(
              "container.beneficiary_management.beneficiary_list.father_name"
            ),
            this.$t(
              "container.beneficiary_management.beneficiary_list.program_name"
            ),
            this.$t(
              "container.beneficiary_management.beneficiary_list.district"
            ),
            this.$t(
              "container.beneficiary_management.beneficiary_list.city_dist_upazilla"
            ),
            this.$t(
              "container.beneficiary_management.beneficiary_list.thna_union_Pouro"
            ),
            this.$t("container.beneficiary_management.beneficiary_list.ward"),
            this.$t(
              "container.beneficiary_management.beneficiary_list.account_no"
            ),
            this.$t(
              "container.beneficiary_management.beneficiary_list.monthly_allowance_amount"
            ),
          ];

          console.log("Beneficiary_info__", this.beneficiary_list);

          const CustomInfo = this.beneficiary_list.map((i, index) => {
            return {
              sl:
                this.$i18n.locale == "en"
                  ? index + 1
                  : this.$helpers.englishToBangla(index + 1),
              beneficiary_id:
                this.$i18n.locale == "en" ? i.application_id : i.application_id,
              name: this.$i18n.locale == "en" ? i.name_en : i.name_bn,
              father_name:
                this.$i18n.locale == "en" ? i.father_name_en : i.father_name_bn,
              program_name:
                this.$i18n.locale == "en"
                  ? i.program.name_en
                  : i.program.name_bn,
              district:
                this.$i18n.locale == "en"
                  ? i.permanentDistrict.name_en
                  : i.permanentDistrict.name_bn,
              city_dist_upazilla:
                this.$i18n.locale == "en"
                  ? i.permanentUpazila
                    ? i.permanentUpazila.name_en
                    : i.permanentCityCorporation
                    ? i.permanentCityCorporation.name_en
                    : i.permanentDistrictPourashava
                    ? i.permanentDistrictPourashava.name_en
                    : ""
                  : i.permanentUpazila
                  ? i.permanentUpazila.name_bn
                  : i.permanentCityCorporation
                  ? i.permanentCityCorporation.name_bn
                  : i.permanentDistrictPourashava
                  ? i.permanentDistrictPourashava.name_bn
                  : "",
              thna_union_Pouro:
                this.$i18n.locale == "en"
                  ? i.permanentUnion
                    ? i.permanentUnion.name_en
                    : i.permanentThana
                    ? i.permanentThana.name_en
                    : i.permanentPourashava
                    ? i.permanentPourashava.name_en
                    : ""
                  : i.permanentUnion
                  ? i.permanentUnion.name_bn
                  : i.permanentThana
                  ? i.permanentThana.name_bn
                  : i.permanentPourashava
                  ? i.permanentPourashava.name_bn
                  : "",
              ward:
                this.$i18n.locale == "en"
                  ? i.permanentWard.name_en
                  : i.permanentWard.name_bn,

              account_number:
                this.$i18n.locale == "en" ? i.account_number : i.account_number,
              monthly_allowance:
                this.$i18n.locale == "en"
                  ? i.monthly_allowance
                  : this.$helpers.englishToBangla(i.monthly_allowance),
            };
          });

          const Field = [
            "sl",
            "beneficiary_id",
            "name",
            "father_name",
            "program_name",
            "district",
            "city_dist_upazilla",
            "thna_union_Pouro",
            "ward",
            "account_number",
            "monthly_allowance",
          ];

          const Data = this.FormatJson(Field, CustomInfo);
          const currentDate = new Date().toISOString().slice(0, 10);
          let dateinfo =
            queryParams.language == "en"
              ? currentDate
              : this.$helpers.englishToBangla(currentDate);

          const filenameWithDate = `${this.$t(
            "container.beneficiary_management.beneficiary_list.ben_list_waiting"
          )}`;

          excel.export_json_to_excel({
            header: HeaderInfo,
            data: Data,
            sheetName: filenameWithDate,
            filename: filenameWithDate,
            autoWidth: true,
            bookType: "xlsx",
          });
        });
      } catch (error) {
        // Handle any errors here
        console.error("An error occurred:", error);
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
    deleteBeneficiaryItem(event) {
      if (this.$refs.formDelete) {
        this.$refs.formDelete.reset();
      }
      this.delete_cause = null;
      this.ben_delete_id = event;
      this.dialogDelete = true;
    },

    deleteBeneficiary() {
      if (!this.ben_delete_id) {
        return;
      }
      try {
        let formData = new FormData();
        formData.append("delete_cause", this.delete_cause);

        const data = { formData: formData, id: this.ben_delete_id };

        this.$store
          .dispatch("BeneficiaryManagement/DeleteBeneficiary", data)
          .then((res) => {
            console.log(res, "submit__");
            if (res.data?.success) {
              this.$toast.success("Data Deleted Successfully");
              this.dialogDelete = false;
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
  },
  watch: {
    "$i18n.locale": "updateHeaderTitle",
    value(val) {
      // this.selectedHeaders = val;

      this.selectedHeaders = [
        { text: this.$t("container.list.sl"), value: "sl" },
        ...val,
        {
          text: this.$t("container.list.action"),
          value: "actions",
          align: "center",
          width: "250",
        },
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
    this.GetAllDivisions();
    this.GetAllProgram();
    this.GetUserPermission();
  },
  beforeMount() {
    this.updateHeaderTitle();
  },
  mounted() {
    this.selectedHeaders = this.headers_start;
    this.$store
      .dispatch("getLookupByType", 1)
      .then((res) => (this.locationType = res));
  },
};
</script>