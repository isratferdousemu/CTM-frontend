<template>
  <div id="division">
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
              <v-card-title class="justify-center" tag="div">
                <h3 class="text-uppercase pt-3">
                  {{
                    $t("container.system_config.demo_graphic.user.listTitle")
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
                      @keyup.native="GetDivision"
                      outlined
                      dense
                      v-model="search"
                      prepend-inner-icon="mdi-magnify"
                      class="my-sm-0 my-3 mx-0v -input--horizontal"
                      flat
                      variant="outlined"
                      :label="
                        $t('container.system_config.demo_graphic.user.search')
                      "
                      hide-details
                      color="primary"
                    >
                    </v-text-field>
                  </div>
                  <v-btn
                    @click="createDialog"
                    flat
                    color="primary"
                    prepend-icon="mdi-account-multiple-plus"
                  >
                    {{ $t("container.list.add_new") }}
                  </v-btn>
                  <v-col cols="12">
                    <v-data-table
                      :loading="loading"
                      item-key="id"
                      :headers="headers"
                      :items="users"
                      :items-per-page="pagination.perPage"
                      hide-default-footer
                      class="elevation-0 transparent row-pointer"
                    >
                      <template v-slot:item.id="{ item, index }">
                        {{
                          (pagination.current - 1) * pagination.perPage +
                          index +
                          1
                        }}
                      </template>
                      <template v-slot:item.status="{ item }">
                        <v-chip
                          :color="item.status == 1 ? 'success' : 'error'"
                          dark
                          small
                          class="white--text"
                        >
                          {{
                            item.status == 1
                              ? $t("container.list.active")
                              : $t("container.list.inactive")
                          }}
                        </v-chip>
                      </template>

                      <!-- Action Button -->
                      <template v-slot:item.actions="{ item }">
                        <v-tooltip top>
                          <template v-slot:activator="{ on }">
                            <v-btn
                              v-can="'update-post'"
                              fab
                              x-small
                              v-on="on"
                              color="success"
                              elevation="0"
                              @click="editDialog(item)"
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
                              :disabled="item.user_type == 1"
                              v-can="'user-destroy'"
                              fab
                              x-small
                              v-on="on"
                              color="grey"
                              class="ml-3 white--text"
                              elevation="0"
                              @click="deleteAlert(item.id)"
                            >
                              <v-icon> mdi-delete </v-icon>
                            </v-btn>
                          </template>
                          <span> {{ $t("container.list.delete") }}</span>
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

      <!-- user add modal  -->
      <v-dialog v-model="dialogAdd" width="650">
        <v-card style="justify-content: center; text-align: center">
          <v-card-title class="font-weight-bold justify-center">
            {{ $t("container.system_config.demo_graphic.user.add_new") }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="mt-7">
            <ValidationObserver ref="formAdd" v-slot="{ invalid }">
              <form @submit.prevent="submitUser()">
                <v-row>
                  <v-col lg="6" md="6" cols="12">
                    <ValidationProvider
                      name="Full Name"
                      vid="full_name"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        :hide-details="errors[0] ? false : true"
                        outlined
                        type="text"
                        v-model="data.full_name"
                        :label="
                          $t(
                            'container.system_config.demo_graphic.user.full_name'
                          )
                        "
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="6" md="6" cols="12">
                    <ValidationProvider
                      name="Username"
                      vid="username"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        :hide-details="errors[0] ? false : true"
                        outlined
                        type="text"
                        v-model="data.username"
                        :label="
                          $t(
                            'container.system_config.demo_graphic.user.username'
                          )
                        "
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="6" md="6" cols="12">
                    <ValidationProvider
                      name="Mobile Number"
                      vid="mobile"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        :hide-details="errors[0] ? false : true"
                        outlined
                        type="text"
                        v-model="data.mobile"
                        :label="
                          $t('container.system_config.demo_graphic.user.mobile')
                        "
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="6" md="6" cols="12">
                    <ValidationProvider
                      name="Email"
                      vid="email"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        :hide-details="errors[0] ? false : true"
                        outlined
                        type="text"
                        v-model="data.email"
                        :label="
                          $t('container.system_config.demo_graphic.user.email')
                        "
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="6" md="6" cols="12">
                    <ValidationProvider
                        name="UserType"
                        vid="userType_id"
                        rules="required"
                        v-slot="{ errors }"
                    >
                      <v-autocomplete
                          :hide-details="errors[0] ? false : true"
                          @input="onChangeUserType($event)"
                          v-model="data.user_type"
                          outlined
                          :label="
                          $t(
                            'container.system_config.demo_graphic.user.user_type'
                          )
                        "
                          :items="userType"
                          item-text="name_en"
                          item-value="id"
                          required
                          :error="errors[0] ? true : false"
                          :error-messages="errors[0]"
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="6" md="6" cols="12">
                    <ValidationProvider
                        name="Status"
                        vid="status"
                        rules="required"
                        v-slot="{ errors }"
                    >
                      <v-select
                          :hide-details="errors[0] ? false : true"
                          outlined
                          v-model="data.status"
                          :items="[
                          { text: 'Active', value: 1 },
                          { text: 'Inactive', value: 0 },
                        ]"
                          item-text="text"
                          item-value="value"
                          :label="
                          $t('container.system_config.demo_graphic.user.status')
                        "
                          required
                          :error="errors[0] ? true : false"
                          :error-messages="errors[0]"
                      ></v-select>
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="6" md="6" cols="12" v-if="data.user_type === 1">
                    <ValidationProvider
                      name="Role"
                      vid="role_id"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-autocomplete
                        multiple
                        :hide-details="errors[0] ? false : true"
                        outlined
                        v-model="data.role_id"
                        :items="roles"
                        item-text="name"
                        item-value="id"
                        :label="
                          $t(
                            'container.system_config.demo_graphic.user.role_id'
                          )
                        "
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>


                  <!-- CommitteeTypes Dropdowns -->
                  <v-col lg="6" md="6" cols="12" v-if="data.user_type === 2">
                    <ValidationProvider
                      name="CommitteeType"
                      vid="committee_type"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-autocomplete
                        :hide-details="errors[0] ? false : true"
                        @input="onChangeCommitteeType"
                        v-model="data.committee_type"
                        outlined
                        :label="
                          $t(
                            'container.system_config.demo_graphic.committee.committee_type'
                          )
                        "
                        :items="committee_types"
                        item-text="value_en"
                        item-value="id"
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                </v-row>
                <v-card-title
                  v-if="[12, 13, 14, 15, 16, 17].includes(data.committee_type)"
                ><h4>DSS Center</h4></v-card-title>
                <v-divider
                  v-if="[12, 13, 14, 15, 16, 17].includes(data.committee_type)"
                ></v-divider>

                <v-row>
                  <v-col
                    lg="6"
                    md="6"
                    cols="12"
                    v-if="
                      data.committee_type == 12 ||
                      data.committee_type == 13 ||
                      data.committee_type == 14 ||
                      data.committee_type == 15 ||
                      data.committee_type == 16 ||
                      data.committee_type == 17
                    "
                  >
                    <ValidationProvider
                      name="Division"
                      vid="division"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-autocomplete
                        :hide-details="errors[0] ? false : true"
                        @input="onChangeDivision($event)"
                        v-model="data.division_id"
                        outlined
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
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <v-col
                    lg="6"
                    md="6"
                    cols="12"
                    v-if="
                      data.committee_type == 12 ||
                      data.committee_type == 13 ||
                      data.committee_type == 14 ||
                      data.committee_type == 15 ||
                      data.committee_type == 16 ||
                      data.committee_type == 17
                    "
                  >
                    <ValidationProvider
                      name="District"
                      vid="district"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-autocomplete
                        :hide-details="errors[0] ? false : true"
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
                  <v-col
                    lg="6"
                    md="6"
                    cols="12"
                    v-if="
                      data.committee_type == 12 ||
                      data.committee_type == 14
                    "
                  >
                    <ValidationProvider
                      name="Upazila"
                      vid="upazila"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-autocomplete
                        :hide-details="errors[0] ? false : true"
                        outlined
                        v-model="data.upazila_id"
                        @input="onChangeUpazila($event)"
                        :label="
                          $t(
                            'container.system_config.demo_graphic.committee.upazila'
                          )
                        "
                        :items="upazilas"
                        item-text="name_en"
                        item-value="id"
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <v-col
                    lg="6"
                    md="6"
                    cols="12"
                    v-if="
                      data.committee_type == 13 || data.committee_type == 15
                    "
                  >
                    <ValidationProvider
                      name="city"
                      vid="city_corpo_id"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-autocomplete
                        :hide-details="errors[0] ? false : true"
                        v-model="data.city_corpo_id"
                        @input="onChangeCity($event)"
                        outlined
                        :label="
                          $t('container.system_config.demo_graphic.office.city')
                        "
                        :items="city"
                        item-text="name_en"
                        item-value="id"
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <v-col
                    lg="6"
                    md="6"
                    cols="12"
                    v-if="
                      data.committee_type == 13
                      //   || data.committee_type == 14
                    "
                  >
                    <ValidationProvider
                      name="thana"
                      vid="thana_id"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-autocomplete
                        :hide-details="errors[0] ? false : true"
                        @input="onChangeThana($event)"
                        v-model="data.thana_id"
                        outlined
                        :label="
                          $t(
                            'container.system_config.demo_graphic.committee.thana'
                          )
                        "
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
                    lg="6"
                    md="6"
                    cols="12"
                    v-if="data.committee_type == 12"
                  >
                    <ValidationProvider
                      name="union"
                      vid="union_id"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-autocomplete
                        :hide-details="errors[0] ? false : true"
                        @input="onChangeUnion($event)"
                        v-model="data.union_id"
                        outlined
                        :label="
                          $t(
                            'container.system_config.demo_graphic.committee.union'
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
                    lg="6"
                    md="6"
                    cols="12"
                    v-if="data.committee_type == 16"
                  >
                    <ValidationProvider
                      name="union"
                      vid="paurashava_id"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-autocomplete
                        :hide-details="errors[0] ? false : true"
                        @input="onChangeDistrictPauroshava($event)"
                        v-model="data.paurashava_id"
                        outlined
                        :label="
                          $t(
                            'container.system_config.demo_graphic.committee.pouro'
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
                    lg="6"
                    md="6"
                    cols="12"
                    v-if="data.committee_type == 13"
                  >
                    <ValidationProvider
                      name="ward"
                      vid="ward_id"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-autocomplete
                        :hide-details="errors[0] ? false : true"
                        v-model="data.ward_id"
                        outlined
                        :label="
                          $t(
                            'container.system_config.demo_graphic.committee.ward'
                          )
                        "
                        :items="wards"
                        item-text="name_en"
                        item-value="id"
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>

                  <v-col
                      lg="6"
                      md="6"
                      cols="12"
                      v-if="data.committee_type"
                  >
                    <ValidationProvider
                        name="committee"
                        vid="committee_id"
                        rules="required"
                        v-slot="{ errors }"
                    >
                      <v-autocomplete
                          :hide-details="errors[0] ? false : true"
                          v-model="data.committee_id"
                          outlined
                          :label="
                          $t(
                            'container.system_config.demo_graphic.committee.committee'
                          )
                        "
                          :items="committees"
                          item-text="name"
                          item-value="id"
                          required
                          :error="errors[0] ? true : false"
                          :error-messages="errors[0]"
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>

                  <!-- END Committee Dropdowns -->


                  <v-col cols="12" v-if="data.user_type === 1">
                    <ValidationProvider
                      name="Office Type"
                      vid="office_type"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-autocomplete
                        @input="onChangeOfficeType($event)"
                        :hide-details="errors[0] ? false : true"
                        outlined
                        v-model="data.office_type"
                        :items="officeType"
                        item-text="value_bn"
                        item-value="id"
                        :label="
                          $t(
                            'container.system_config.demo_graphic.user.office_type'
                          )
                        "
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <v-col
                    lg="6"
                    md="6"
                    cols="12"
                    v-if="
                      data.office_type == 6 ||
                      data.office_type == 7 ||
                      data.office_type == 8 ||
                      data.office_type == 9 ||
                      data.office_type == 10 ||
                      data.office_type == 11
                    "
                  >
                    <ValidationProvider
                      name="Division"
                      vid="division"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-autocomplete
                        :hide-details="errors[0] ? false : true"
                        @input="onChangeDivision($event)"
                        v-model="data.division_id"
                        outlined
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
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <v-col
                    lg="6"
                    md="6"
                    cols="12"
                    v-if="
                      data.office_type == 7 ||
                      data.office_type == 8 ||
                      data.office_type == 9 ||
                      data.office_type == 10 ||
                      data.office_type == 11
                    "
                  >
                    <ValidationProvider
                      name="District"
                      vid="district"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-autocomplete
                        :hide-details="errors[0] ? false : true"
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
                  <v-col
                    lg="6"
                    md="6"
                    cols="12"
                    v-if="
                      data.office_type == 8 ||
                      data.office_type == 10 ||
                      data.office_type == 11
                    "
                  >
                    <ValidationProvider
                      name="Upazila"
                      vid="upazila"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-autocomplete
                        :hide-details="errors[0] ? false : true"
                        outlined
                        @input="onChangeUpazila($event)"
                        v-model="data.thana_id"
                        :label="
                          $t(
                            'container.system_config.demo_graphic.office.upazila'
                          )
                        "
                        :items="upazilas"
                        item-text="name_en"
                        item-value="id"
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="6" md="6" cols="12" v-if="data.office_type == 9">
                    <ValidationProvider
                      name="city"
                      vid="city_corpo_id"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-autocomplete
                        :hide-details="errors[0] ? false : true"
                        v-model="data.city_corpo_id"
                        @input="onChangeCity($event)"
                        outlined
                        :label="
                          $t('container.system_config.demo_graphic.office.city')
                        "
                        :items="city"
                        item-text="name_en"
                        item-value="id"
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <v-col
                    lg="6"
                    md="6"
                    cols="12"
                    v-if="
                      data.office_type == 4 ||
                      data.office_type == 5 ||
                      data.office_type == 6 ||
                      data.office_type == 7 ||
                      data.office_type == 8 ||
                      data.office_type == 9 ||
                      data.office_type == 8 ||
                      data.office_type == 10 ||
                      data.office_type == 11
                    "
                  >
                    <ValidationProvider
                      name="office"
                      vid="office_id"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-autocomplete
                        :hide-details="errors[0] ? false : true"
                        v-model="data.office_id"
                        outlined
                        :label="
                          $t(
                            'container.system_config.demo_graphic.user.office_id'
                          )
                        "
                        :items="offices"
                        item-text="name_en"
                        item-value="id"
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                </v-row>

                <v-row class="mx-0 my-0 py-2" justify="center">
                  <v-btn
                    flat
                    @click="dialogAdd = false"
                    outlined
                    class="custom-btn-width py-2 mr-10"
                  >
                    {{ $t("container.list.cancel") }}
                  </v-btn>
                  <v-btn
                    type="submit"
                    flat
                    color="primary"
                    :disabled="invalid"
                    :loading="loading"
                    class="custom-btn-width warning white--text py-2"
                  >
                    {{ $t("container.list.submit") }}
                  </v-btn>
                </v-row>
              </form>
            </ValidationObserver>
          </v-card-text>
        </v-card>
      </v-dialog>
      <!-- user add modal  -->

      <!-- user edit modal  -->
      <v-dialog v-model="dialogEdit" width="650">
        <v-card style="justify-content: center; text-align: center">
          <v-card-title class="font-weight-bold justify-center">
            {{ $t("container.system_config.demo_graphic.user.edit") }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="mt-7">
            <ValidationObserver ref="formEdit" v-slot="{ invalid }">
              <form @submit.prevent="updateUser()">
                <v-row>
                  <v-col lg="6" md="6" cols="12">
                    <ValidationProvider
                        name="Full Name"
                        vid="full_name"
                        rules="required"
                        v-slot="{ errors }"
                    >
                      <v-text-field
                          :hide-details="errors[0] ? false : true"
                          outlined
                          type="text"
                          v-model="data.full_name"
                          :label="
                          $t(
                            'container.system_config.demo_graphic.user.full_name'
                          )
                        "
                          required
                          :error="errors[0] ? true : false"
                          :error-messages="errors[0]"
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="6" md="6" cols="12">
                    <ValidationProvider
                        name="Username"
                        vid="username"
                        rules="required"
                        v-slot="{ errors }"
                    >
                      <v-text-field
                          :hide-details="errors[0] ? false : true"
                          outlined
                          type="text"
                          v-model="data.username"
                          :label="
                          $t(
                            'container.system_config.demo_graphic.user.username'
                          )
                        "
                          required
                          :error="errors[0] ? true : false"
                          :error-messages="errors[0]"
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="6" md="6" cols="12">
                    <ValidationProvider
                        name="Mobile Number"
                        vid="mobile"
                        rules="required"
                        v-slot="{ errors }"
                    >
                      <v-text-field
                          :hide-details="errors[0] ? false : true"
                          outlined
                          type="text"
                          v-model="data.mobile"
                          :label="
                          $t('container.system_config.demo_graphic.user.mobile')
                        "
                          required
                          :error="errors[0] ? true : false"
                          :error-messages="errors[0]"
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="6" md="6" cols="12">
                    <ValidationProvider
                        name="Email"
                        vid="email"
                        rules="required"
                        v-slot="{ errors }"
                    >
                      <v-text-field
                          :hide-details="errors[0] ? false : true"
                          outlined
                          type="text"
                          v-model="data.email"
                          :label="
                          $t('container.system_config.demo_graphic.user.email')
                        "
                          required
                          :error="errors[0] ? true : false"
                          :error-messages="errors[0]"
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="6" md="6" cols="12">
                    <ValidationProvider
                        name="UserType"
                        vid="userType_id"
                        rules="required"
                        v-slot="{ errors }"
                    >
                      <v-autocomplete
                          :hide-details="errors[0] ? false : true"
                          @input="onChangeUserType($event)"
                          v-model="data.user_type"
                          outlined
                          :label="
                          $t(
                            'container.system_config.demo_graphic.user.user_type'
                          )
                        "
                          :items="userType"
                          item-text="name_en"
                          item-value="id"
                          required
                          :error="errors[0] ? true : false"
                          :error-messages="errors[0]"
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="6" md="6" cols="12">
                    <ValidationProvider
                        name="Status"
                        vid="status"
                        rules="required"
                        v-slot="{ errors }"
                    >
                      <v-select
                          :hide-details="errors[0] ? false : true"
                          outlined
                          v-model="data.status"
                          :items="[
                          { text: 'Active', value: 1 },
                          { text: 'Inactive', value: 0 },
                        ]"
                          item-text="text"
                          item-value="value"
                          :label="
                          $t('container.system_config.demo_graphic.user.status')
                        "
                          required
                          :error="errors[0] ? true : false"
                          :error-messages="errors[0]"
                      ></v-select>
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="6" md="6" cols="12" v-if="data.user_type === 1">
                    <ValidationProvider
                        name="Role"
                        vid="role_id"
                        rules="required"
                        v-slot="{ errors }"
                    >
                      <v-autocomplete
                          multiple
                          :hide-details="errors[0] ? false : true"
                          outlined
                          v-model="data.role_id"
                          :items="roles"
                          item-text="name"
                          item-value="id"
                          :label="
                          $t(
                            'container.system_config.demo_graphic.user.role_id'
                          )
                        "
                          :error="errors[0] ? true : false"
                          :error-messages="errors[0]"
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>


                  <!-- CommitteeTypes Dropdowns -->
                  <v-col lg="6" md="6" cols="12" v-if="data.user_type === 2">
                    <ValidationProvider
                        name="CommitteeType"
                        vid="committee_type"
                        rules="required"
                        v-slot="{ errors }"
                    >
                      <v-autocomplete
                          :hide-details="errors[0] ? false : true"
                          @input="onChangeCommitteeType"
                          v-model="data.committee_type"
                          outlined
                          :label="
                          $t(
                            'container.system_config.demo_graphic.committee.committee_type'
                          )
                        "
                          :items="committee_types"
                          item-text="value_en"
                          item-value="id"
                          required
                          :error="errors[0] ? true : false"
                          :error-messages="errors[0]"
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                </v-row>
                <v-card-title
                    v-if="[12, 13, 14, 15, 16, 17].includes(data.committee_type)"
                ><h4>DSS Center</h4></v-card-title>
                <v-divider
                    v-if="[12, 13, 14, 15, 16, 17].includes(data.committee_type)"
                ></v-divider>

                <v-row>
                  <v-col
                      lg="6"
                      md="6"
                      cols="12"
                      v-if="
                      data.committee_type == 12 ||
                      data.committee_type == 13 ||
                      data.committee_type == 14 ||
                      data.committee_type == 15 ||
                      data.committee_type == 16 ||
                      data.committee_type == 17
                    "
                  >
                    <ValidationProvider
                        name="Division"
                        vid="division"
                        rules="required"
                        v-slot="{ errors }"
                    >
                      <v-autocomplete
                          :hide-details="errors[0] ? false : true"
                          @input="onChangeDivision($event)"
                          v-model="data.division_id"
                          outlined
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
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <v-col
                      lg="6"
                      md="6"
                      cols="12"
                      v-if="
                      data.committee_type == 12 ||
                      data.committee_type == 13 ||
                      data.committee_type == 14 ||
                      data.committee_type == 15 ||
                      data.committee_type == 16 ||
                      data.committee_type == 17
                    "
                  >
                    <ValidationProvider
                        name="District"
                        vid="district"
                        rules="required"
                        v-slot="{ errors }"
                    >
                      <v-autocomplete
                          :hide-details="errors[0] ? false : true"
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
                  <v-col
                      lg="6"
                      md="6"
                      cols="12"
                      v-if="
                      data.committee_type == 12 ||
                      data.committee_type == 14
                    "
                  >
                    <ValidationProvider
                        name="Upazila"
                        vid="upazila"
                        rules="required"
                        v-slot="{ errors }"
                    >
                      <v-autocomplete
                          :hide-details="errors[0] ? false : true"
                          outlined
                          v-model="data.upazila_id"
                          @input="onChangeUpazila($event)"
                          :label="
                          $t(
                            'container.system_config.demo_graphic.committee.upazila'
                          )
                        "
                          :items="upazilas"
                          item-text="name_en"
                          item-value="id"
                          required
                          :error="errors[0] ? true : false"
                          :error-messages="errors[0]"
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <v-col
                      lg="6"
                      md="6"
                      cols="12"
                      v-if="
                      data.committee_type == 13 || data.committee_type == 15
                    "
                  >
                    <ValidationProvider
                        name="city"
                        vid="city_corpo_id"
                        rules="required"
                        v-slot="{ errors }"
                    >
                      <v-autocomplete
                          :hide-details="errors[0] ? false : true"
                          v-model="data.city_corpo_id"
                          @input="onChangeCity($event)"
                          outlined
                          :label="
                          $t('container.system_config.demo_graphic.office.city')
                        "
                          :items="city"
                          item-text="name_en"
                          item-value="id"
                          required
                          :error="errors[0] ? true : false"
                          :error-messages="errors[0]"
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <v-col
                      lg="6"
                      md="6"
                      cols="12"
                      v-if="
                      data.committee_type == 13
                      //   || data.committee_type == 14
                    "
                  >
                    <ValidationProvider
                        name="thana"
                        vid="thana_id"
                        rules="required"
                        v-slot="{ errors }"
                    >
                      <v-autocomplete
                          :hide-details="errors[0] ? false : true"
                          @input="onChangeThana($event)"
                          v-model="data.thana_id"
                          outlined
                          :label="
                          $t(
                            'container.system_config.demo_graphic.committee.thana'
                          )
                        "
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
                      lg="6"
                      md="6"
                      cols="12"
                      v-if="data.committee_type == 12"
                  >
                    <ValidationProvider
                        name="union"
                        vid="union_id"
                        rules="required"
                        v-slot="{ errors }"
                    >
                      <v-autocomplete
                          :hide-details="errors[0] ? false : true"
                          @input="onChangeUnion($event)"
                          v-model="data.union_id"
                          outlined
                          :label="
                          $t(
                            'container.system_config.demo_graphic.committee.union'
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
                      lg="6"
                      md="6"
                      cols="12"
                      v-if="data.committee_type == 16"
                  >
                    <ValidationProvider
                        name="union"
                        vid="paurashava_id"
                        rules="required"
                        v-slot="{ errors }"
                    >
                      <v-autocomplete
                          :hide-details="errors[0] ? false : true"
                          @input="onChangeDistrictPauroshava($event)"
                          v-model="data.paurashava_id"
                          outlined
                          :label="
                          $t(
                            'container.system_config.demo_graphic.committee.pouro'
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
                      lg="6"
                      md="6"
                      cols="12"
                      v-if="data.committee_type == 13"
                  >
                    <ValidationProvider
                        name="ward"
                        vid="ward_id"
                        rules="required"
                        v-slot="{ errors }"
                    >
                      <v-autocomplete
                          :hide-details="errors[0] ? false : true"
                          v-model="data.ward_id"
                          outlined
                          :label="
                          $t(
                            'container.system_config.demo_graphic.committee.ward'
                          )
                        "
                          :items="wards"
                          item-text="name_en"
                          item-value="id"
                          required
                          :error="errors[0] ? true : false"
                          :error-messages="errors[0]"
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>

                  <v-col
                      lg="6"
                      md="6"
                      cols="12"
                      v-if="data.committee_type"
                  >
                    <ValidationProvider
                        name="committee"
                        vid="committee_id"
                        rules="required"
                        v-slot="{ errors }"
                    >
                      <v-autocomplete
                          :hide-details="errors[0] ? false : true"
                          v-model="data.committee_id"
                          outlined
                          :label="
                          $t(
                            'container.system_config.demo_graphic.committee.committee'
                          )
                        "
                          :items="committees"
                          item-text="name"
                          item-value="id"
                          required
                          :error="errors[0] ? true : false"
                          :error-messages="errors[0]"
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>

                  <!-- END Committee Dropdowns -->


                  <v-col cols="12" v-if="data.user_type === 1">
                    <ValidationProvider
                        name="Office Type"
                        vid="office_type"
                        rules="required"
                        v-slot="{ errors }"
                    >
                      <v-autocomplete
                          @input="onChangeOfficeType($event)"
                          :hide-details="errors[0] ? false : true"
                          outlined
                          v-model="data.office_type"
                          :items="officeType"
                          item-text="value_bn"
                          item-value="id"
                          :label="
                          $t(
                            'container.system_config.demo_graphic.user.office_type'
                          )
                        "
                          required
                          :error="errors[0] ? true : false"
                          :error-messages="errors[0]"
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <v-col
                      lg="6"
                      md="6"
                      cols="12"
                      v-if="
                      data.office_type == 6 ||
                      data.office_type == 7 ||
                      data.office_type == 8 ||
                      data.office_type == 9 ||
                      data.office_type == 10 ||
                      data.office_type == 11
                    "
                  >
                    <ValidationProvider
                        name="Division"
                        vid="division"
                        rules="required"
                        v-slot="{ errors }"
                    >
                      <v-autocomplete
                          :hide-details="errors[0] ? false : true"
                          @input="onChangeDivision($event)"
                          v-model="data.division_id"
                          outlined
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
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <v-col
                      lg="6"
                      md="6"
                      cols="12"
                      v-if="
                      data.office_type == 7 ||
                      data.office_type == 8 ||
                      data.office_type == 9 ||
                      data.office_type == 10 ||
                      data.office_type == 11
                    "
                  >
                    <ValidationProvider
                        name="District"
                        vid="district"
                        rules="required"
                        v-slot="{ errors }"
                    >
                      <v-autocomplete
                          :hide-details="errors[0] ? false : true"
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
                  <v-col
                      lg="6"
                      md="6"
                      cols="12"
                      v-if="
                      data.office_type == 8 ||
                      data.office_type == 10 ||
                      data.office_type == 11
                    "
                  >
                    <ValidationProvider
                        name="Upazila"
                        vid="upazila"
                        rules="required"
                        v-slot="{ errors }"
                    >
                      <v-autocomplete
                          :hide-details="errors[0] ? false : true"
                          outlined
                          @input="onChangeUpazila($event)"
                          v-model="data.thana_id"
                          :label="
                          $t(
                            'container.system_config.demo_graphic.office.upazila'
                          )
                        "
                          :items="upazilas"
                          item-text="name_en"
                          item-value="id"
                          required
                          :error="errors[0] ? true : false"
                          :error-messages="errors[0]"
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="6" md="6" cols="12" v-if="data.office_type == 9">
                    <ValidationProvider
                        name="city"
                        vid="city_corpo_id"
                        rules="required"
                        v-slot="{ errors }"
                    >
                      <v-autocomplete
                          :hide-details="errors[0] ? false : true"
                          v-model="data.city_corpo_id"
                          @input="onChangeCity($event)"
                          outlined
                          :label="
                          $t('container.system_config.demo_graphic.office.city')
                        "
                          :items="city"
                          item-text="name_en"
                          item-value="id"
                          required
                          :error="errors[0] ? true : false"
                          :error-messages="errors[0]"
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <v-col
                      lg="6"
                      md="6"
                      cols="12"
                      v-if="
                      data.office_type == 4 ||
                      data.office_type == 5 ||
                      data.office_type == 6 ||
                      data.office_type == 7 ||
                      data.office_type == 8 ||
                      data.office_type == 9 ||
                      data.office_type == 8 ||
                      data.office_type == 10 ||
                      data.office_type == 11
                    "
                  >
                    <ValidationProvider
                        name="office"
                        vid="office_id"
                        rules="required"
                        v-slot="{ errors }"
                    >
                      <v-autocomplete
                          :hide-details="errors[0] ? false : true"
                          v-model="data.office_id"
                          outlined
                          :label="
                          $t(
                            'container.system_config.demo_graphic.user.office_id'
                          )
                        "
                          :items="offices"
                          item-text="name_en"
                          item-value="id"
                          required
                          :error="errors[0] ? true : false"
                          :error-messages="errors[0]"
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                </v-row>

                <v-row class="mx-0 my-0 py-2" justify="center">
                  <v-btn
                      flat
                      @click="dialogAdd = false"
                      outlined
                      class="custom-btn-width py-2 mr-10"
                  >
                    {{ $t("container.list.cancel") }}
                  </v-btn>
                  <v-btn
                      type="submit"
                      flat
                      color="primary"
                      :disabled="invalid"
                      :loading="loading"
                      class="custom-btn-width warning white--text py-2"
                  >
                    {{ $t("container.list.submit") }}
                  </v-btn>
                </v-row>
              </form>
            </ValidationObserver>
          </v-card-text>
        </v-card>
      </v-dialog>
      <!-- user edit modal  -->

      <!-- delete modal  -->
      <v-dialog v-model="deleteDialog" width="350">
        <v-card style="justify-content: center; text-align: center">
          <v-card-title class="font-weight-bold justify-center">
            {{ $t("container.system_config.demo_graphic.user.delete") }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <div class="subtitle-1 font-weight-medium mt-5">
              {{ $t("container.system_config.demo_graphic.user.delete_alert") }}
            </div>
          </v-card-text>
          <v-card-actions style="display: block">
            <v-row class="mx-0 my-0 py-2" justify="center">
              <v-btn
                text
                @click="deleteDialog = false"
                outlined
                class="custom-btn-width py-2 mr-10"
              >
                {{ $t("container.list.cancel") }}
              </v-btn>
              <v-btn
                text
                @click="deleteUser()"
                color="white"
                :loading="delete_loading"
                class="custom-btn-width warning white--text py-2"
              >
                {{ $t("container.list.delete") }}
              </v-btn>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- delete modal  -->
    </v-row>
  </div>
</template>
  
  <script>
import { mapState } from "vuex";
import { extend, ValidationProvider, ValidationObserver } from "vee-validate";
import { required } from "vee-validate/dist/rules";

extend("required", required);
export default {
  name: "Index",
  title: "CTM - User Management",
  data() {
    return {
      data: {
        id: null,
        full_name: null,
        user_type: null,
        username: null,
        mobile: null,
        email: null,
        role_id: [],
        status: 0,
        office_type: null,
        office_id: null,
        division_id: null,
        district_id: null,
        upazila_id: null,
        thana_id: null,
        union_id: null,
        paurashava_id: null,
        ward_id: null,
        city_corpo_id: null,
        committee_type: null,
        committee_id: null
      },
      isDistrictHidden: true,
      isLocationTypeHidden: true,
      isCityCorporationHidden: false,
      dialogAdd: false,
      deleteDialog: false,
      dialogEdit: false,
      delete_loading: false,
      loading: false,
      search: "",
      delete_id: "",
      offices: [],
      divisions: [],
      districts: [],
      upazilas: [],
      city: [],
      thanas: [],
      unions: [],
      wards: [],
      roles: [],
      users: [],
      committees: [],
      userType_id: null,
      userType: [
        {
          id: 1,
          name_en: "Office User",
        },
        {
          id: 2,
          name_en: "Committee User",
        },
      ],
      officeType: [],
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
          text: this.$t("container.list.sl"),
          value: "id",
          align: "start",
          sortable: false,
        },
        {
          text: this.$t("container.system_config.demo_graphic.user.full_name"),
          value: "full_name",
        },
        {
          text: this.$t("container.system_config.demo_graphic.user.username"),
          value: "username",
        },
        {
          text: this.$t("container.system_config.demo_graphic.user.email"),
          value: "email",
        },
        {
          text: this.$t("container.system_config.demo_graphic.user.mobile"),
          value: "mobile",
        },
        {
          text: this.$t("container.system_config.demo_graphic.user.office"),
          value: "office.name_en",
        },
        {
          text: this.$t("container.system_config.demo_graphic.user.status"),
          value: "status",
        },
        {
          text: this.$t("container.list.action"),
          value: "actions",
          align: "center",
          sortable: false,
        },
      ];
    },

    ...mapState({
      message: (state) => state.Division.success_message,
      // divisions: (state) => state.Division.divisions,
    }),
  },

  methods: {
    createDialog() {
      if (this.$refs.formAdd) {
        this.$refs.formAdd.reset();
      }
      this.resetForm();
      this.dialogAdd = true;
    },
    submitUser() {
      this.loading = true;
      let fd = new FormData();
      for (const [key, value] of Object.entries(this.data)) {
        if (value !== null) {
          fd.append(key, value);
          // role_id is array so we need to append it separately
          if (key == "role_id") {
            for (let i = 0; i < value.length; i++) {
              fd.append("role_id[]", value[i]);
            }
          }
        }
      }
      this.$axios
        .post("/admin/user/insert", fd, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        })
        .then((res) => {


          console.log(res.data)


          this.$toast.success("Data Inserted Successfully");
          this.dialogAdd = false;
          this.getUsers();
          this.$refs.formAdd.reset();
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          if (err.response?.data?.errors) {
            // this.$refs.formAdd.setErrors(err.response.data.errors);
            this.$toast.error(err.response.data.message);
          }
        });
    },
    updateUser() {
      console.log(this.data, "edit");
      this.loading = true;
      // return;
      // this.data.role_id = [];
      // let temp = this.data.role_id[];
      let ud = new FormData();
      for (const [key, value] of Object.entries(this.data)) {
        if (value != null) {
          // role_id is array so we need to append it separately
          ud.append(key, value);

          if (key == "role_id") {
            for (let i = 0; i < value.length; i++) {
              ud.append("role_id[]", value);
            }
          }
        }
      }
      // return;
      // Include the _method field for PUT request
      console.log("FormData:", ud);

      // delete ud["role_id"];
      // ud.delete("role_id");

      for (const [key, value] of ud.entries()) {
        console.log(`${key}: ${value}`);
      }
      ud.append("_method", "PUT");

      this.$axios
        .put("/admin/user/update/" + this.data.id, this.data, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "application/json",
            // "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        })
        .then((res) => {
          console.log(res);
          this.$toast.success("Data updated Successfully");
          this.getUsers();
          this.$refs.formEdit.reset();
          this.loading = false;
          this.dialogEdit = false;
        })
        .catch((err) => {
          this.loading = false;
          if (err.response?.data?.errors) {
            this.$refs.formEdit.setErrors(err.response.data.errors);
            this.$toast.error(err.response.data.message);
          }
        });
    },
    resetForm() {
      for (let prop in this.data) {
        this.data[prop] = null; // Set each property's value to null
        this.data.status = 0
      }
    },


    editDialog(item) {
      if (this.$refs.formEdit) {
        this.$refs.formEdit.reset();
      }
      console.log(item, "user ");
      this.dialogEdit = true;
      // console.log(item.roles[0].id, "roles id");
      console.log(item, "editDialog");
      this.data.id = item.id;
      this.data.full_name = item.full_name;
      this.data.username = item.username;
      this.data.mobile = item.mobile;
      this.data.email = item.email;
      this.data.user_type = item.office_id ? 1 : 2;

      if (this.data.user_type == 2) {
        // this.data.committee_type =
      }


      this.data.role_id = [];
      item.roles.forEach((role) => {
        this.data.role_id.push(role.id);
      });

      this.data.status = item.status;
      this.data.office_type = item.office_type.id;
      this.data.office_id = item?.office?.id;
      // console.log(item?.assign_location?.type, 'edit--');
      // this.onChangeOfficeType(item.office_type.id);
      if (item.office_type.id == "4" || item.office_type.id == "5") {
        this.getOfficeByLocation(this.data.office_type, null);
      }
      if (item?.assign_location?.type == "division") {
        // console.log("division here");
        this.data.division_id = item?.assign_location?.id;
        this.onChangeDivision(this.data.division_id);
      }
      if (item?.assign_location?.type == "district") {
        console.log("district here");
        this.data.division_id = item?.assign_location?.parent?.id;
        this.onChangeDivision(this.data.division_id);
        this.data.district_id = item?.assign_location?.id;
      }
      if (item?.assign_location?.parent?.parent?.type == "division") {
        console.log("here Division");
        this.data.division_id = item?.assign_location?.parent?.parent?.id;
        this.onChangeDivision(this.data.division_id);
      }
      if (item?.assign_location?.parent?.type == "district") {
        this.data.district_id = item?.assign_location?.parent?.id;
        this.onChangeDistrict(this.data.district_id);
      }
      if (item?.assign_location?.type == "city") {
        this.data.city_corpo_id = item?.assign_location?.id;
        this.onChangeCity(item?.assign_location?.id);
        console.log(item?.office?.id, " in the city");
      }
      if (item?.assign_location?.type == "thana") {
        this.data.thana_id = item?.assign_location?.id;
        this.onChangeUpazila(item?.assign_location?.id);
      }

      // if (item?.assign_location?.location_type?.value_en == "Upazila") {
      //   this.data.thana_id = item?.assign_location?.id;
      // }

      console.log(this.data, "End editDialog");
      // this.data.code = item.code;
      // this.data.name_en = item.name_en;
      // this.data.name_bn = item.name_bn;
      // this.data.id = item.id;
      // this.errors = {};
    },



    updateDivision() {
      try {
        this.$store
          .dispatch("Division/UpdateDivision", this.data)
          .then((data) => {
            console.log(data, "update");
            if (data == null) {
              this.$toast.success("Data Updated Successfully");
              this.dialogEdit = false;
              this.GetDivision();
            } else {
              this.errors = data.errors;
            }
            // if (this.error_status == "") {
            //   this.$toast.success("Data Updated Successfully");
            //   this.dialogEdit = false;
            //   this.resetForm();
            //   this.GetDivision();
            // }
          });
      } catch (e) {
        console.log(e);
      }
    },

    onPageChange($event) {
      this.getUsers();
    },
    async GetOfficeType() {
      try {
        this.$store.dispatch("getLookupByType", 3).then((data) => {
          this.officeType = data;
          console.log(this.officeType);
        });
      } catch (e) {
        console.log(e);
      }
    },
    async getUsers() {
      const queryParams = {
        searchText: this.search,
        perPage: this.pagination.perPage,
        page: this.pagination.current,
        user_id: this.$store.state.userData.id,
      };
      this.$axios
        .get("/admin/user/get", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
          params: queryParams,
        })
        .then((result) => {
          this.users = result.data.data;
          console.log(this.users, "getUsers");
          this.pagination.current = result.data.current_page;
          this.pagination.total = result.data.last_page;
          this.pagination.grand_total = result.data.total;
        });
    },
    async GetDivision() {
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
        });
    },
    deleteUser: async function () {
      this.$axios
        .delete("/admin/user/destroy/" + this.delete_id, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          this.deleteDialog = false;
          // check if the request was successful
          if (res?.data?.success) {
            this.$toast.success(res.data.message);
          } else {
            this.$toast.error(res.response.data.message);
          }
          this.getUsers();
        })
        .catch((err) => {
          console.log(err, "error");
          if (err.response?.data?.errors) {
            this.$refs.form.setErrors(err.response.data.errors);
          }
          console.log(err.response);
          this.$toast.error(err?.response?.data?.message);
        });
    },
    deleteAlert(id) {
      this.data.id = id;
      // alert(JSON.stringify(id));
      this.deleteDialog = true;
      this.delete_id = id;
    },
    updateHeaderTitle() {
      const title = this.$t(
        "container.system_config.demo_graphic.user.listTitle"
      );
      this.$store.commit("setHeaderTitle", title);
    },
    getRoles() {
      this.$axios
        .get("/admin/role/get", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          this.roles = result.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    onChangeOfficeType(event) {
      if (this.data.committee_type === 18 || this.data.committee_type === 19) {
        return this.getCommittees(-1);
      }

      this.data.city_corpo_id = null;
      this.data.division_id = null;
      this.data.district_id = null;
      this.data.thana_id = null;
      this.data.office_id = null;

      this.getOfficeByLocation(event);
    },

    async onChangeDivision(event) {
      this.data.district_id = null;
      this.data.upazila_id = null;
      this.data.city_corpo_id = null;
      this.data.union_id = null;
      this.data.paurashava_id = null;
      this.data.thana_id = null;
      this.data.ward_id = null;
      this.data.office_id = null;
      this.data.committee_id = null;



      if (this.data.office_type != null) {
        this.getOfficeByLocation(this.data.office_type, event);
      }
      await this.$axios
          .get(`/admin/district/get/${event}`, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((result) => {
            this.districts = result.data.data;
            this.upazilas = []
            this.city = []
            this.unions = []
            this.thanas = []
            this.wards = []
            this.committees = []
            this.isDistrictHidden = true;
          });
    },


    async onChangeDistrict(event) {
      console.log('district change')

      if (this.data.committee_type === 17) {
        return this.getCommittees(this.data.district_id)
      }

      this.data.upazila_id = null;
      this.data.city_corpo_id = null;
      this.data.union_id = null;
      this.data.paurashava_id = null;
      this.data.thana_id = null;
      this.data.ward_id = null;
      this.data.office_id = null;
      this.data.committee_id = null;


      if (this.data.office_type != null) {
        this.getOfficeByLocation(this.data.office_type, event);
      }
      if ([8, 10, 11].includes(this.data.office_type) || [12, 14].includes(this.data.committee_type)) {
        this.GetAllUpazila(this.data.district_id);
      }
      else {
        /*
          if committee_type == 16 (district pourosova)
          then lookUpType = 1 (District Pouroshava)
          else lookUpType = 3 (City)
        */

        const lookupType = this.data.committee_type == 16 ? 1 : 3

        await this.$axios
            .get(`/admin/city/get/` + this.data.district_id + "/" + lookupType, {
              headers: {
                Authorization: "Bearer " + this.$store.state.token,
                "Content-Type": "multipart/form-data",
              },
            })
            .then((result) => {
              this.unions = lookupType === 1 ? result.data.data : []
              this.city = lookupType === 3 ? result.data.data : [];
              this.thanas = []
              this.wards = []
              this.committees = []

              console.log(this.city, "onChangeDistrict");
            });
      }
    },


    async onChangeUpazila(event) {
      console.log('upazila change')

      if (this.data.committee_type === 14) {
        return this.getCommittees(this.data.upazila_id)
      }

      this.data.city_corpo_id = null;
      this.data.union_id = null;
      this.data.paurashava_id = null;
      this.data.thana_id = null;
      this.data.ward_id = null;
      this.data.office_id = null;
      this.data.committee_id = null;


      if (this.data.office_type != null) {
        this.getOfficeByLocation(this.data.office_type, event);
      }

      await this.$axios
          .get(`/admin/union/get/${event}`, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((result) => {
            this.unions = result.data.data;
            this.thanas = []
            this.wards = []
            this.committees = []
            console.log(this.unions, "unions");
          });
    },


    async onChangeCity(event) {
      console.log('City change')

      //City corporation
      if (this.data.committee_type === 15) {
        return this.getCommittees(this.data.city_corpo_id)
      }

      this.data.union_id = null;
      this.data.paurashava_id = null;
      this.data.thana_id = null;
      this.data.ward_id = null;
      this.data.office_id = null;
      this.data.committee_id = null;



      if (this.data.office_type != null) {
        this.getOfficeByLocation(this.data.office_type, event);
      }

      await this.$axios
          .get(`/admin/thana/get/city/${this.data.city_corpo_id}`, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((result) => {
            this.thanas = result.data.data;
            this.unions = []
            this.wards = []
            this.committees = []
          });

    },


    async onChangeThana(event) {

      console.log('thana change')

      this.data.union_id = null;
      this.data.paurashava_id = null;
      this.data.ward_id = null;
      this.data.office_id = null;
      this.data.committee_id = null;


      await this.$axios
          .get(`/admin/ward/get/thana/${event}`, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((result) => {
            this.wards = result.data.data;
            this.committees = []
            console.log(this.wards, "wards");
          });
    },



    async onChangeUnion(event) {
      if (this.data.committee_type === 12) {
        return this.getCommittees(this.data.union_id)
      }
    },

    async onChangeDistrictPauroshava(event) {
      console.log('pouro',event, this.data.paurashava_id)
      if (this.data.committee_type === 16) {
        return this.getCommittees(this.data.paurashava_id)
      }
    },

    async onChangeWard(event) {
      console.log(event, this.data.ward_id)
      if (this.data.committee_type === 13) {
        return this.getCommittees(this.data.ward_id)
      }
    },



    async getCommittees(locationId) {
      this.data.committee_id = null;

      console.log('get commitees')
      await this.$axios
          .get(`/admin/committee/${this.data.committee_type}/${locationId}`, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((result) => {
            console.log(result)
            this.committees = result.data.data;
          });
    },


    // async onChangeDivision(event) {
    //   await this.$axios
    //     .get(`/admin/district/get/${event}`, {
    //       headers: {
    //         Authorization: "Bearer " + this.$store.state.token,
    //         "Content-Type": "multipart/form-data",
    //       },
    //     })
    //     .then((result) => {
    //       this.districts = result.data.data;
    //       this.isDistrictHidden = true;
    //     });
    // },
    // async onChangeDistrict(event) {
    //   event = 3; //Lookup.id = 3 , Look.name_en = 'City Corporation'
    //   const payload = {
    //     district_id: this.data.district_id,
    //     lookup_id: "3",
    //   };
    //   console.log(JSON.stringify(payload));
    //   // return;
    //   if (
    //     this.office_type_id == 8 ||
    //     this.office_type_id == 10 ||
    //     this.office_type_id == 11
    //   ) {
    //     console.log("load Upazila");
    //     this.GetAllUpazila(this.data.district_id);
    //   } else {
    //     console.log("load City Corporation");
    //     await this.$axios
    //       .get(`/admin/city/get/` + this.data.district_id + "/" + event, {
    //         headers: {
    //           Authorization: "Bearer " + this.$store.state.token,
    //           "Content-Type": "multipart/form-data",
    //         },
    //       })
    //       .then((result) => {
    //         this.city = result.data.data;
    //         console.log(this.city, "onChangeDistrict");
    //       });
    //   }
    // },
    async GetAllUpazila(id) {
      console.log('get thana')
      if (this.data.office_type != null) {
        this.getOfficeByLocation(this.data.office_type, id);
      }

      this.data.city_corpo_id = null;
      this.data.thana_id = null;
      this.data.union_id = null;
      this.data.paurashava_id = null;
      this.data.ward_id = null;
      this.data.office_id = null;
      this.data.committee_id = null;

      try {
        this.$store
          .dispatch("Thana/GetAllUpazilaByDistrict", id)
          .then((data) => {
            this.upazilas = data;
            this.city = []
            this.thanas = []
            this.unions = []
            this.wards = []
            this.committees = []
          });
      } catch (e) {
        console.log(e);
      }
    },

    getOfficeByLocation(office_type_id, location_type_id = null) {
      let data = {
        office_type_id: office_type_id,
        location_type_id: location_type_id,
      };
      console.log(data, "getOfficeByLocation");
      let fd = new FormData();
      for (const [key, value] of Object.entries(data)) {
        if (value !== null) {
          fd.append(key, value);
        }
      }
      this.$axios
        .post("/admin/user/office/by-location", fd, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "application/json",
          },
        })
        .then((result) => {
          this.offices = result.data.data;
          console.log(this.offices, "this.offices");
          this.data.office_id = this.offices[0].id;
          // console.log(result, "result");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async GetAllCommitteeType() {
      try {
        this.$store.dispatch("getLookupByType", 17).then((data) => {
          this.committee_types = data;
          console.log(this.committee_types);
        });
      } catch (e) {
        console.log(e);
      }
    },

    async onChangeUserType(userType) {
      this.data.committee_type = null
      this.data.office_type = null

      this.resetLocations()
    },

    //18 = national, 19 = corodination
    async onChangeCommitteeType() {
      this.resetLocations()

      if (this.data.committee_type === 18 || this.data.committee_type === 19) {
        this.getCommittees(-1)
      }

    },

    async resetLocations() {
      this.data.division_id = null;
      this.data.district_id = null;
      this.data.upazila_id = null;
      this.data.thana_id = null;
      this.data.union_id = null;
      this.data.paurashava_id = null;
      this.data.ward_id = null;
      this.data.city_corpo_id = null;
      this.data.office_id = null;
      this.data.committee_id = null
      this.committees = []
    },



  },
  watch: {
    "$i18n.locale": "updateHeaderTitle",
  },
  created() {
    this.GetAllCommitteeType();
    this.getUsers();
    this.GetDivision();
    this.getRoles();
    this.GetOfficeType();
  },
  beforeMount() {
    this.updateHeaderTitle();
  },
};
</script>