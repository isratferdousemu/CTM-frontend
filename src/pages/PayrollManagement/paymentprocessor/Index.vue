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
                style="background-color: #2b4978; color: white"
              >
                <h3>
                  {{ $t("container.payroll_management.list") }}
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
                      @keyup.native="getPaymentProcessor"
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

                  <v-btn
                    @click="createDialog"
                    flat
                    color="primary"
                    prepend-icon="mdi-account-multiple-plus"
                  >
                    {{ $t("container.list.add_new") }}
                  </v-btn>

                  <!-- <div class="d-flex flex-column align-items-end ml-auto mb-4">
                    <v-btn
                      @click="createDialog"
                      flat
                      color="primary"
                      prepend-icon="mdi-account-multiple-plus"
                      class="mb-6 text-right ml-auto"
                      style="width: 120px"
                    >
                      {{ $t("container.list.add_new") }}
                    </v-btn>

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
                  </div> -->

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
                      <template v-slot:item.actions="{ item }">
                        <div class="action-buttons">
                          <v-tooltip top>
                            <template v-slot:activator="{ on }">
                              <v-btn
                                v-can="'update-post'"
                                fab
                                x-small
                                v-on="on"
                                color="success"
                                elevation="0"
                                @click="editItem(item)"
                              >
                                <v-icon> mdi-account-edit-outline </v-icon>
                              </v-btn>
                            </template>
                            <span>{{ $t("container.list.edit") }}</span>
                          </v-tooltip>

                          <v-tooltip top>
                            <template v-slot:activator="{ on }">
                              <router-link
                                :to="`/payroll-management/payment-processor-show/${item.id}`"
                                tag="span"
                                v-on="on"
                              >
                                <v-btn
                                  fab
                                  x-small
                                  v-on="on"
                                  color="#AFB42B"
                                  class="white--text"
                                  elevation="0"
                                >
                                  <v-icon>mdi-eye-outline</v-icon>
                                </v-btn>
                              </router-link>
                            </template>
                            <span>{{ $t("container.list.show") }}</span>
                          </v-tooltip>

                          <v-tooltip top>
                            <template v-slot:activator="{ on }">
                              <v-btn
                                v-can="'delete-division'"
                                fab
                                x-small
                                v-on="on"
                                color="#b71c1c"
                                class="white--text"
                                elevation="0"
                                @click="deleteAlert(item.id)"
                              >
                                <v-icon> mdi-delete </v-icon>
                              </v-btn>
                            </template>
                            <span>{{ $t("container.list.delete") }}</span>
                          </v-tooltip>
                        </div>
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
                            @change="onPageSetup"
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

                        <!-- <v-container class="pa-0" fluid>
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
                                @change="onPageChange"
                                v-model="pagination.perPage"
                              ></v-select>
                            </v-col>
                          </v-row>
                        </v-container> -->
                      </template>
                    </v-data-table>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>

      <!-- add or edit modal  -->
      <v-dialog v-model="dialogAdd" width="950">
        <v-card style="justify-content: center; text-align: center">
          <v-card-title
            class="font-weight-bold justify-center"
            style="background-color: #2b4978; color: white"
          >
            {{
              this.data?.id != null
                ? this.$t("container.payroll_management.edit")
                : this.$t("container.payroll_management.add_new")
            }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="mt-7">
            <ValidationObserver ref="formAdd" v-slot="{ invalid }">
              <form @submit.prevent="submitPaymentProcessor()">
                <v-row>
                  <v-col lg="6" md="6" cols="12">
                    <ValidationProvider
                      v-slot="{ errors }"
                      name="Processor type"
                      vid="processor_type"
                      rules="required"
                    >
                      <v-autocomplete
                        outlined
                        clearable
                        v-model="data.processor_type"
                        :items="processor_types"
                        :item-text="language === 'bn' ? 'name_bn' : 'name_en'"
                        item-value="value"
                        :label="
                          $t('container.payroll_management.processor_type')
                        "
                        :error="errors[0] ? true : false"
                        :error-messages="
                          errors[0]
                            ? language === 'bn'
                              ? 'একটি প্রসেসরের ধরন নির্বাচন করুন'
                              : 'Select a processor type'
                            : ''
                        "
                      >
                      </v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <v-col
                    lg="6"
                    md="6"
                    cols="12"
                    v-if="data.processor_type === 'bank'"
                  >
                    <ValidationProvider
                      v-slot="{ errors }"
                      name="Bank name"
                      vid="bank_name"
                      rules="required"
                    >
                      <v-autocomplete
                        outlined
                        clearable
                        v-model="data.bank_id"
                        :items="banks"
                        :item-text="language === 'bn' ? 'name_bn' : 'name_en'"
                        item-value="id"
                        :label="$t('container.payroll_management.bank_name')"
                        :error="errors[0] ? true : false"
                        :error-messages="
                          errors[0]
                            ? language === 'bn'
                              ? 'একটি ব্যাংক নির্বাচন করুন'
                              : 'Select a bank'
                            : ''
                        "
                      >
                      </v-autocomplete>
                    </ValidationProvider>
                  </v-col>

                  <v-col
                    lg="6"
                    md="6"
                    cols="12"
                    v-if="data.processor_type === 'bank'"
                  >
                    <ValidationProvider
                      v-slot="{ errors }"
                      name="Branch Name"
                      vid="branch_name"
                      rules="required"
                    >
                      <v-text-field
                        outlined
                        type="text"
                        v-model="data.branch_name"
                        :label="$t('container.payroll_management.branch_name')"
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="
                          errors[0]
                            ? language === 'bn'
                              ? 'শাখার নাম বৈধ নয়'
                              : 'Branch name is not valid'
                            : ''
                        "
                        >></v-text-field
                      >
                    </ValidationProvider>
                  </v-col>

                  <v-col
                    lg="6"
                    md="6"
                    cols="12"
                    v-if="data.processor_type === 'bank'"
                  >
                    <ValidationProvider
                      v-slot="{ errors }"
                      name="Routing number"
                      vid="routing_number"
                      rules="required"
                    >
                      <v-text-field
                        outlined
                        type="number"
                        v-model="data.routing_number"
                        :label="
                          $t('container.payroll_management.routing_number')
                        "
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="
                          errors[0]
                            ? language === 'bn'
                              ? 'রাউটিং নম্বর বৈধ নয়'
                              : 'Routing number is not valid'
                            : ''
                        "
                        >></v-text-field
                      >
                    </ValidationProvider>
                  </v-col>

                  <v-col lg="6" md="6" cols="12">
                    <ValidationProvider
                      v-slot="{ errors }"
                      name="Name English"
                      vid="name_en"
                      rules="required|checkName"
                    >
                      <v-text-field
                        outlined
                        type="text"
                        v-model="data.name_en"
                        :label="$t('container.list.name_en')"
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="
                          errors[0]
                            ? language === 'bn'
                              ? 'অনুগ্রহ করে এই ক্ষেত্রে ইংরেজি অক্ষর লিখুন'
                              : 'Please Enter English Letters in this Field'
                            : ''
                        "
                        >></v-text-field
                      >
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="6" md="6" cols="12">
                    <ValidationProvider
                      v-slot="{ errors }"
                      name="Name in Bangla"
                      vid="name_bn"
                      rules="required|checkNameBn"
                    >
                      <v-text-field
                        outlined
                        type="text"
                        v-model="data.name_bn"
                        :label="$t('container.list.name_bn')"
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="
                          errors[0]
                            ? language === 'bn'
                              ? 'অনুগ্রহ করে এই ক্ষেত্রে বাংলা অক্ষর লিখুন'
                              : 'Please Enter bangla Letters in this Field'
                            : ''
                        "
                        >></v-text-field
                      >
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="6" md="6" cols="12">
                    <ValidationProvider
                      v-slot="{ errors }"
                      name="Focal Phone"
                      vid="focal_phone"
                      rules="required|bangladeshiPhone"
                    >
                      <v-text-field
                        outlined
                        type="text"
                        v-model="data.focal_phone"
                        :label="$t('container.payroll_management.focal_phone')"
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="
                          errors[0]
                            ? language === 'bn'
                              ? 'একটি বাংলাদেশী ফোন নম্বর লিখুন'
                              : 'Enter a bangladeshi phone number'
                            : ''
                        "
                        >></v-text-field
                      >
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="6" md="6" cols="12">
                    <ValidationProvider
                      v-slot="{ errors }"
                      name="Focal Email"
                      vid="focal_email"
                      rules="required|email"
                    >
                      <v-text-field
                        outlined
                        type="text"
                        v-model="data.focal_email"
                        :label="$t('container.payroll_management.email')"
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="
                          errors[0]
                            ? language === 'bn'
                              ? 'একটি বৈধ ইমেইল ঠিকানা লিখুন'
                              : 'Enter a valid email address'
                            : ''
                        "
                        >></v-text-field
                      >
                    </ValidationProvider>
                  </v-col>

                  <v-col lg="6" md="6" cols="12">
                    <ValidationProvider
                      v-slot="{ errors }"
                      name="Charge"
                      vid="charge"
                      rules="required"
                    >
                      <v-text-field
                        outlined
                        type="number"
                        v-model="data.charge"
                        :label="$t('container.payroll_management.charge')"
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="
                          errors[0]
                            ? language === 'bn'
                              ? 'চার্জ শতাংশ লিখুন'
                              : 'Enter charge percentage'
                            : ''
                        "
                        >></v-text-field
                      >
                    </ValidationProvider>
                  </v-col>

                  <v-col lg="12" md="12" cols="12">
                    <!-- <v-divider></v-divider> -->
                    <v-card-title
                      class="font-weight-bold justify-center"
                      style="background-color: #2b4978; color: white"
                    >
                      {{ $t("container.payroll_management.coverage_area") }}
                    </v-card-title>
                  </v-col>

                  <v-col lg="6" md="6" cols="12">
                    <ValidationProvider
                      v-slot="{ errors }"
                      name="Division"
                      vid="division"
                      rules="required"
                    >
                      <v-autocomplete
                        outlined
                        clearable
                        v-model="data.division"
                        :items="divisions"
                        :item-text="language === 'bn' ? 'name_bn' : 'name_en'"
                        item-value="id"
                        :label="$t('container.payroll_management.division')"
                        :error="errors[0] ? true : false"
                        :error-messages="
                          errors[0]
                            ? language === 'bn'
                              ? 'একটি বিভাগ নির্বাচন করুন'
                              : 'Select a division'
                            : ''
                        "
                        @change="getDistricts(data.division)"
                      >
                      </v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="6" md="6" cols="12">
                    <ValidationProvider
                      v-slot="{ errors }"
                      name="District"
                      vid="district"
                      rules="required"
                    >
                      <v-autocomplete
                        outlined
                        clearable
                        v-model="data.district"
                        :items="districts"
                        :item-text="language === 'bn' ? 'name_bn' : 'name_en'"
                        item-value="id"
                        :label="$t('container.payroll_management.district')"
                        :error="errors[0] ? true : false"
                        :error-messages="
                          errors[0]
                            ? language === 'bn'
                              ? 'একটি জেলা নির্বাচন করুন'
                              : 'Select a district'
                            : ''
                        "
                        @change="clearField()"
                      >
                      </v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="6" md="6" cols="12">
                    <ValidationProvider
                      v-slot="{ errors }"
                      name="Location Type"
                      vid="location_type"
                      rules="required"
                    >
                      <v-autocomplete
                        outlined
                        :clearable="clearLocation"
                        v-model="data.location_type"
                        :items="location_types"
                        :item-text="language === 'bn' ? 'value_bn' : 'value_en'"
                        item-value="id"
                        :label="
                          $t('container.payroll_management.location_type')
                        "
                        :error="errors[0] ? true : false"
                        :error-messages="
                          errors[0]
                            ? language === 'bn'
                              ? 'একটি অবস্থানের ধরন নির্বাচন করুন'
                              : 'Select a location type'
                            : ''
                        "
                        @change="getArea(data.district, data.location_type)"
                        v-if="data.district != null"
                      >
                      </v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <!-- locationType upazila start -->
                  <!-- upazila start -->
                  <v-col
                    lg="6"
                    md="6"
                    cols="12"
                    v-if="
                      data.location_type != null &&
                      data.location_type === 2 &&
                      data.district != null
                    "
                  >
                    <ValidationProvider
                      v-slot="{ errors }"
                      name="Upazila"
                      vid="upazila"
                      rules="required"
                    >
                      <v-autocomplete
                        outlined
                        :clearable="clearUpazila"
                        v-model="data.upazila"
                        :items="upazilas"
                        :item-text="language === 'bn' ? 'name_bn' : 'name_en'"
                        item-value="id"
                        :label="$t('container.payroll_management.upazila')"
                        :error="errors[0] ? true : false"
                        :error-messages="
                          errors[0]
                            ? language === 'bn'
                              ? 'একটি উপজেলা নির্বাচন করুন'
                              : 'Select a upazila'
                            : ''
                        "
                        @change="
                          getUnionOrThana(data.upazila, data.location_type)
                        "
                      >
                      </v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <!-- upazila end -->

                  <!-- union start -->
                  <v-col
                    lg="6"
                    md="6"
                    cols="12"
                    v-if="
                      data.location_type != null &&
                      data.location_type == 2 &&
                      data.upazila != null &&
                      data.district != null
                    "
                  >
                    <ValidationProvider
                      v-slot="{ errors }"
                      name="Union"
                      vid="union"
                      rules="required"
                    >
                      <v-autocomplete
                        outlined
                        :clearable="clearUnion"
                        v-model="data.union"
                        :items="unions"
                        :item-text="language === 'bn' ? 'name_bn' : 'name_en'"
                        item-value="id"
                        :label="$t('container.payroll_management.union')"
                        :error="errors[0] ? true : false"
                        :error-messages="
                          errors[0]
                            ? language === 'bn'
                              ? 'একটি ইউনিয়ন নির্বাচন করুন'
                              : 'Select a union'
                            : ''
                        "
                      >
                      </v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <!-- union end -->
                  <!-- locationType upazila start -->

                  <!-- location Type city corp start -->
                  <v-col
                    lg="6"
                    md="6"
                    cols="12"
                    v-if="
                      data.location_type != null &&
                      data.location_type === 3 &&
                      data.district != null
                    "
                  >
                    <ValidationProvider
                      v-slot="{ errors }"
                      name="City Corporation"
                      vid="city_corporation"
                      rules="required"
                    >
                      <v-autocomplete
                        outlined
                        :clearable="clearCityCorporation"
                        v-model="data.city_corporation"
                        :items="city_corporations"
                        :item-text="language === 'bn' ? 'name_bn' : 'name_en'"
                        item-value="id"
                        :label="
                          $t('container.payroll_management.city_corporation')
                        "
                        :error="errors[0] ? true : false"
                        :error-messages="
                          errors[0]
                            ? language === 'bn'
                              ? 'একটি সিটি কর্পোরেশন নির্বাচন করুন'
                              : 'Select a city corporation'
                            : ''
                        "
                        @change="
                          getUnionOrThana(
                            data.city_corporation,
                            data.location_type
                          )
                        "
                      >
                      </v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <v-col
                    lg="6"
                    md="6"
                    cols="12"
                    v-if="
                      data.location_type != null &&
                      data.location_type == 3 &&
                      data.city_corporation != null &&
                      data.district != null
                    "
                  >
                    <ValidationProvider
                      v-slot="{ errors }"
                      name="Thana"
                      vid="thana"
                      rules="required"
                    >
                      <v-autocomplete
                        outlined
                        :clearable="clearThana"
                        v-model="data.thana"
                        :items="thanas"
                        :item-text="language === 'bn' ? 'name_bn' : 'name_en'"
                        item-value="id"
                        :label="$t('container.payroll_management.thana')"
                        :error="errors[0] ? true : false"
                        :error-messages="
                          errors[0]
                            ? language === 'bn'
                              ? 'একটি থানা নির্বাচন করুন'
                              : 'Select a thana'
                            : ''
                        "
                      >
                      </v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <!-- location Type city corp end -->

                  <!-- location Type district poruoshava start -->
                  <v-col
                    lg="6"
                    md="6"
                    cols="12"
                    v-if="data.location_type === 1 && data.district != null"
                  >
                    <ValidationProvider
                      v-slot="{ errors }"
                      name="District Pourashava"
                      vid="district_pourashava"
                      rules="required"
                    >
                      <v-autocomplete
                        outlined
                        :clearable="clearDistrictPourashava"
                        v-model="data.district_pourashava"
                        :item-text="language === 'bn' ? 'name_bn' : 'name_en'"
                        :items="district_pourashavas"
                        item-value="id"
                        :label="
                          $t('container.payroll_management.district_pourashava')
                        "
                        :error="errors[0] ? true : false"
                        :error-messages="
                          errors[0]
                            ? language === 'bn'
                              ? 'একটি জেলা পৌরসভা নির্বাচন করুন'
                              : 'Select a district pourashava'
                            : ''
                        "
                      >
                      </v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <!-- location Type district poruoshava start -->
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

                  <div>
                    <v-btn
                      v-if="data.id != null"
                      type="submit"
                      flat
                      color="primary"
                      :disabled="invalid"
                      :loading="loading"
                      class="custom-btn-width success white--text py-2"
                    >
                      {{ $t("container.list.update") }}
                    </v-btn>

                    <v-btn
                      v-else
                      type="submit"
                      flat
                      color="primary"
                      :disabled="invalid"
                      :loading="loading"
                      class="custom-btn-width success white--text py-2"
                    >
                      {{ $t("container.list.submit") }}
                    </v-btn>
                  </div>
                </v-row>
              </form>
            </ValidationObserver>
          </v-card-text>
        </v-card>
      </v-dialog>
      <!--  add or edit modal  -->

      <!-- delete modal  -->
      <v-dialog v-model="deleteDialog" width="350">
        <v-card style="justify-content: center; text-align: center">
          <v-card-title class="font-weight-bold justify-center">
            {{ $t("container.payroll_management.delete") }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <div class="subtitle-1 font-weight-medium mt-5">
              {{ $t("container.payroll_management.delete_alert") }}
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
                @click="deleteItem()"
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
import { required, email } from "vee-validate/dist/rules";

extend("required", required);

extend("email", {
  ...email,
  message: "Please enter a valid email address",
});

extend("bangladeshiPhone", {
  validate: (value) => {
    if (!value && value !== 0) {
      return false;
    }

    // Regex for Bangladeshi phone number
    var banglaPhoneRegex = /^(?:\+88|88)?(01[3-9]\d{8})$/;

    return banglaPhoneRegex.test(value);
  },
  message: "Please enter a valid Bangladeshi phone number",
});
extend("checkName", {
  validate: (value) => {
    if (!value && value !== 0) {
      return false;
    }

    return /^[a-zA-Z\s]+$/.test(value);
  },
  message: "Please Enter English Letter's in this Field",
});

extend("checkNameBn", {
  validate: (value) => {
    if (!value && value !== 0) {
      return false;
    }

    var banglaRegex = /^[\u0980-\u09E5\u09F0-\u09FF\s]+$/;

    return banglaRegex.test(value);
  },
  message: "Please Enter Bangla Letter's in this Field",
});
export default {
  name: "Index",
  title: "Payment Processor",
  data() {
    return {
      data: {
        id: null,
        processor_type: null,
        bank_id: null,
        branch_name: null,
        routing_number: null,
        name_en: "",
        name_bn: "",
        focal_phone: "",
        focal_email: "",
        charge: null,
        division: null,
        district: null,
        upazila: null,
        union: null,
        thana: null,
        city_corporation: null,
        district_pourashava: null,
        location_type: null,
        office: null,
      },
      clearLocation: false,
      clearUpazila: false,
      dialogAdd: false,
      onEdit: false,
      deleteDialog: false,
      dialogEdit: false,
      delete_loading: false,
      loading: false,
      search: "",
      delete_id: "",

      values: [],
      divisions: [],
      districts: [],
      upazilas: [],
      unions: [],
      thanas: [],
      city_corporations: [],
      district_pourashavas: [],
      banks: [],

      processor_types: [
        { id: 1, name_en: "Bank", name_bn: "ব্যাংক", value: "bank" },
        { id: 2, name_en: "MFS", name_bn: "এমএফএস", value: "mfs" },
        // {
        //   id: 3,
        //   name_en: "Agent Banking",
        //   name_bn: "এজেন্ট ব্যাংকিং",
        //   value: "agent_banking",
        // },
      ],

      location_types: [
        {
          id: 1,
          value_en: "District Pourashava",
          value_bn: "জেলা পৌরসভা",
          value: "district_pourashava",
        },
        { id: 2, value_en: "Upazila", value_bn: "উপজেলা", value: "upazila" },
        {
          id: 3,
          value_en: "City Corporation",
          value_bn: "সিটি কর্পোরেশন",
          value: "city_corporation",
        },
      ],

      errors: {},
      error_status: {},
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
          class: "table-header",
        },
        {
          text: this.$t("container.payroll_management.processor_type"),
          value: "processor_type",
          align: "center",
          class: "table-header",
        },
        {
          text: this.$t("container.list.name_en"),
          value: "name_en",
          class: "table-header",
        },
        {
          text: this.$t("container.list.name_bn"),
          value: "name_bn",
          class: "table-header",
        },
        {
          text: this.$t("container.payroll_management.coverage_area"),
          value: "processor_area.district.name_en",
          class: "table-header",
        },
        {
          text: this.$t("container.payroll_management.focal_phone"),
          value: "focal_phone_no",
          class: "table-header",
        },
        {
          text: this.$t("container.payroll_management.email"),
          value: "focal_email_address",
          class: "table-header",
        },
        {
          text: this.$t("container.payroll_management.charge"),
          value: "charge",
          class: "table-header",
        },
        {
          text: this.$t("container.list.action"),
          value: "actions",
          sortable: false,
          class: "table-header",
        },
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
    convertCase(input) {
      // first latter uppar case
      let formattedInput = input.replace(/[-_]/g, " ");
      let words = formattedInput.split(" ");
      let titleCasedWords = words.map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      });
      return titleCasedWords.join(" ");
    },

    convertToUpper(input) {
      // all latter upper case
      let formattedInput = input.replace(/[-_]/g, " ");
      let upperCaseInput = formattedInput.toUpperCase();

      return upperCaseInput;
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
        .get("/admin/payroll/payment-processor", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
          params: queryParams,
        })
        .then((result) => {
          this.values = result.data?.data?.data;
        });

      const HeaderInfo = [
        this.$t("container.list.sl"),
        this.$t("container.payroll_management.processor_type"),
        this.$t("container.list.name_en"),
        this.$t("container.payroll_management.coverage_area"),
        this.$t("container.payroll_management.focal_phone"),
        this.$t("container.payroll_management.charge"),
      ];

      const CustomInfo = this.values.map((i, index) => {
        return [
          this.language == "en"
            ? index + 1
            : this.$helpers.englishToBangla(index + 1),
          this.convertToUpper(i.processor_type),
          i.name_en,
          i.processor_area.district.name_en,
          i.focal_phone_no,
          i.charge,
        ];
      });

      const queryParam = {
        language: this.$i18n.locale,
        data: CustomInfo,
        header: HeaderInfo,
        fileName: this.$t("container.payroll_management.list"),
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

    async GenerateExcel() {
      const queryParams = {
        search: this.search,
        perPage: this.pagination.perPage,
        page: this.pagination.current,
        sortBy: this.sortBy,
        sortDesc: this.sortDesc,
      };

      await this.$axios
        .get("/admin/payroll/payment-processor", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
          params: queryParams,
        })
        .then((result) => {
          this.values = result?.data?.data?.data;

          import("@/plugins/Export2Excel").then((excel) => {
            const HeaderInfo = [
              this.$t("container.list.sl"),
              this.$t("container.payroll_management.processor_type"),
              this.$t("container.list.name_en"),
              this.$t("container.payroll_management.coverage_area"),
              this.$t("container.payroll_management.focal_phone"),
              this.$t("container.payroll_management.charge"),
            ];

            const CustomInfo = this.values.map((i, index) => {
              return {
                "SL":this.language == "en"
                  ? index + 1
                  : this.$helpers.englishToBangla(index + 1),
                "Processor Type":this.convertToUpper(i.processor_type),
                "Name (English)":i.name_en,
                "Coverage Area":i.processor_area.district.name_en,
                "Phone":i.focal_phone_no,
                "Charge":i.charge,
              }
            });

            const Field = [
              "SL",
              "Processor Type",
              "Name (English)",
              "Coverage Area",
              "Phone",
              "Charge",
            ];

            const Item = this.FormatJson(Field, CustomInfo);
            const currentDate = new Date().toISOString().slice(0, 10); //
            let dateinfo =
              queryParams.language == "en"
                ? currentDate
                : this.$helpers.englishToBangla(currentDate);

            const filenameWithDate = `${dateinfo}_${this.$t(
              "container.payroll_management.list"
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

    FormatJson(FilterData,JsonData){
      return JsonData.map((v) =>
          FilterData.map((j => {
            return v[j];
          })))
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

    clear() {
      this.clearLocation = true;
      this.clearUpazila = true;
      this.clearUnion = true;
      this.clearThana = true;
      this.clearCityCorporation = true;
      this.clearDistrictPourashava = true;
      // Reset other properties
      this.data.location_type = null;
      this.data.upazila = null;
      this.data.union = null;
      this.data.thana = null;
      this.data.city_corporation = null;
      this.data.district_pourashava = null;
    },

    clearableFalse() {
      this.clearLocation = false;
      this.clearUpazila = false;
      this.clearUnion = false;
      this.clearThana = false;
      this.clearCityCorporation = false;
      this.clearDistrictPourashava = false;
    },
    clearField() {
      this.clear();
      this.clearableFalse();
    },

    resetForm() {
      this.data = {
        processor_type: null,
        bank_id: null,
        branch_name: "",
        routing_number: "",
        name_en: "",
        name_bn: "",
        focal_phone: "",
        focal_email: "",
        charge: "",
        division: null,
        district: null,
        location_type: null,
        upazila: null,
        union: null,
        city_corporation: null,
        thana: null,
        district_pourashava: null,
      };
      this.clearField();
    },

    deleteAlert(id) {
      this.data.id = id;
      this.deleteDialog = true;
    },
    async deleteItem() {
      this.loading = true;
      try {
        const response = await this.$axios.delete(
          `admin/payroll/payment-processor/${this.data.id}`,
          {
            headers: {
              Authorization: `Bearer ${this.$store.state.token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          this.getPaymentProcessor();
          this.$toast.success(
            this.language === "bn"
              ? "পেমেন্ট প্রসেসর সফলভাবে মুছে ফেলা হয়েছে"
              : "Payment Processor deleted successfully"
          );
          this.data.id = null;
          this.deleteDialog = false;
        } else {
          this.$toast.error("Form submission failed");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        this.$toast.error("An error occurred while submitting the form");
      } finally {
        this.loading = false;
      }
    },

    async submitPaymentProcessor() {
      this.loading = true;
      try {
        let response;
        if (this.data.id != null) {
          response = await this.$axios.put(
            `admin/payroll/payment-processor/${this.data.id}`,
            this.data,
            {
              headers: {
                Authorization: `Bearer ${this.$store.state.token}`,
                "Content-Type": "application/json",
              },
            }
          );
        } else {
          response = await this.$axios.post(
            "admin/payroll/payment-processor",
            this.data,
            {
              headers: {
                Authorization: `Bearer ${this.$store.state.token}`,
                "Content-Type": "application/json",
              },
            }
          );
        }
        if (response.status === 200) {
          // this.$refs.formAdd.reset();

          if (this.data.id != null) {
            this.$toast.success(
              this.language === "bn"
                ? "পেমেন্ট প্রসেসর সফলভাবে আপডেট হয়েছে"
                : "Payment Processor updated successfully"
            );
            this.onEdit = false;
          } else {
            this.$toast.success(
              this.language === "bn"
                ? "পেমেন্ট প্রসেসর সফলভাবে সংরক্ষিত হয়েছে"
                : "Payment Processor submitted successfully"
            );
          }
          this.resetForm();
          this.getPaymentProcessor();
          this.dialogAdd = false;
        } else {
          this.$toast.error("Form submission failed");
        }
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          Object.values(error.response.data.errors).forEach((errMessages) => {
            errMessages.forEach((errMessage) => {
              const errorMessage =
                this.language == "bn"
                  ? this.translateErrorToBangla(errMessage)
                  : errMessage;
              this.$toast.error(errorMessage);
            });
          });
        } else {
          console.error("Error submitting form:", error);
          this.$toast.error(
            this.language == "bn"
              ? "ফর্ম জমা দেওয়ার সময় একটি ত্রুটি ঘটেছে"
              : "An error occurred while submitting the form"
          );
        }
      } finally {
        this.loading = false;
      }
    },

    translateErrorToBangla(message) {
      const translations = {
        "The name en has already been taken.":
          "ইংরেজি নামটি ইতিমধ্যেই নেওয়া হয়েছে।",
        "The name bn has already been taken.":
          "বাংলা নামটি ইতিমধ্যেই নেওয়া হয়েছে।",
        "The focal phone has already been taken.":
          "ফোকাল ফোনটি ইতিমধ্যেই নেওয়া হয়েছে।",
        "The focal email has already been taken.":
          "ফোকাল ইমেলটি ইতিমধ্যেই নেওয়া হয়েছে।",
        "The name en field is required.": "ইংরেজি নামের ফিল্ডটি প্রয়োজন।",
        "The name bn field is required.": "বাংলা নামের ফিল্ডটি প্রয়োজন।",
        "The focal phone field is required.": "ফোকাল ফোনের ফিল্ডটি প্রয়োজন।",
        "The focal email field is required.": "ফোকাল ইমেলের ফিল্ডটি প্রয়োজন।",
        "The focal email must be a valid email address.":
          "ফোকাল ইমেল একটি বৈধ ইমেল ঠিকানা হতে হবে।",
      };
      return translations[message] || message;
    },

    async getPaymentProcessor() {
      const queryParams = {
        search: this.search,
        perPage: this.pagination.perPage,
        page: this.pagination.current,
        sortBy: this.sortBy,
        sortDesc: this.sortDesc,
      };
      try {
        const response = await this.$axios.get(
          "/admin/payroll/payment-processor",
          {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
            params: queryParams,
          }
        );
        if (response.status == "200") {
          this.values = response.data.data.data;
          this.pagination.current = response?.data?.data?.current_page;
          this.pagination.total = response?.data?.data?.last_page;
          this.pagination.grand_total = response?.data?.data?.total;
          this.loading = false;
        } else {
          this.$toast.error("Something went wrong");
        }
      } catch (error) {
        console.error("Error fetching divisions:", error);
      }
    },

    async getBanks() {
      let response;
      try {
        response = await this.$axios.get(`admin/payroll/get-banks`, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status == "200") {
          this.banks = response.data;
        } else {
          this.$toast.error("Something went wrong");
        }
      } catch (error) {
        console.error("Error fetching divisions:", error);
      }
    },

    async getDivisions() {
      try {
        const response = await this.$axios.get("/admin/division/get", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
        });
        if (response.status == "200") {
          this.divisions = response.data.data;
        } else {
          this.$toast.error("Something went wrong");
        }
      } catch (error) {
        console.error("Error fetching divisions:", error);
      }
    },

    getDistricts(divisionId) {
      this.clear();

      this.$axios
        .get(`get-districts/${divisionId}`, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response.status === 200) {
            this.clearableFalse();
            this.districts = response.data.data;
          } else {
            this.$toast.error("Something went wrong");
          }
        })
        .catch((error) => {
          console.error("Error fetching divisions:", error);
          this.$toast.error("Error fetching divisions");
        });
    },

    async getArea(districtId, locationTypeId) {
      if (districtId == null) {
        this.$toast.warning("Please select a district");
        return;
      }
      let response;
      try {
        if (this.data.location_type == 1 || this.data.location_type == 3) {
          // for district upazila or city corporation
          response = await this.$axios.get(
            `get-cities-pouroshavas/${districtId}/${locationTypeId}`,
            {
              headers: {
                Authorization: "Bearer " + this.$store.state.token,
                "Content-Type": "multipart/form-data",
              },
            }
          );
        } else {
          // otherwise get upazila
          response = await this.$axios.get(`get-upazilas/${districtId}`, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          });
        }

        if (response.status == "200") {
          if (this.data.location_type == 1) {
            this.district_pourashavas = response.data.data;
          } else if (this.data.location_type == 3) {
            this.city_corporations = response.data.data;
          } else {
            this.upazilas = response.data.data;
          }
        } else {
          this.$toast.error("Something went wrong");
        }
      } catch (error) {
        console.error("Error fetching divisions:", error);
      }
    },

    async getUnionOrThana(upazilaId, locationTypeId) {
      if (upazilaId == null) {
        this.$toast.warning("Please select a district");
        return;
      }
      let response;
      try {
        response = await this.$axios.get(
          `get-union-or-thana/${upazilaId}/${locationTypeId}`,
          {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status == "200") {
          if (this.data.location_type == 2) {
            this.unions = response.data.data;
          } else {
            this.thanas = response.data.data;
          }
        } else {
          this.$toast.error("Something went wrong");
        }
      } catch (error) {
        console.error("Error fetching divisions:", error);
      }
    },

    editItem(item) {
      this.editDialog(item);
    },
    // on edit
    async editDialog(item) {
      // this.onEdit = true;
      this.resetForm();
      this.dialogAdd = true;
      this.data = {
        id: item.id,
        processor_type: item.processor_type || null,
        bank_id: item.bank?.id || null,
        branch_name: item.bank_branch_name || "",
        routing_number: item.bank_routing_number || "",
        name_en: item.name_en || "",
        name_bn: item.name_bn || "",
        focal_phone: item.focal_phone_no || "",
        focal_email: item.focal_email_address || "",
        charge: item.charge || 0,
        division: item.processor_area?.division?.id || null,
        district: item.processor_area?.district?.id || null,
        location_type: item.processor_area?.location_type || null,
        district_pourashava:
          item.processor_area?.district_pourashava?.id || null,
        upazila: item.processor_area?.upazila?.id || null,
        union: item.processor_area?.union?.id || null,
        city_corporation: item.processor_area?.city_corporation?.id || null,
        thana: item.processor_area?.thana?.id || null,
      };

      try {
        if (this.data.division) {
          await this.getDistricts(this.data.division);
          this.data.district = item?.processor_area?.district?.id;
        }

        if (this.data.district) {
          this.data.location_type = item?.processor_area?.location_type?.id;
        }

        if (this.data.location_type && this.data.district) {
          await this.getArea(this.data.district, this.data.location_type);

          switch (this.data.location_type) {
            case 1:
              this.data.district_pourashava =
                item?.processor_area?.district_pourashava?.id;
              break;
            case 2:
              this.data.upazila = item?.processor_area?.upazila?.id;
              await this.getUnionOrThana(
                this.data.upazila,
                this.data.location_type
              );
              this.data.union = item?.processor_area?.union?.id;
              break;
            default:
              this.data.city_corporation =
                item?.processor_area?.city_corporation?.id;
              await this.getUnionOrThana(
                this.data.city_corporation,
                this.data.location_type
              );
              this.data.thana = item?.processor_area?.thana?.id;
              break;
          }
        }
      } catch (error) {
        console.error("Error in editDialog:", error);
        this.$toast.error(
          "An error occurred while initializing the edit dialog"
        );
      }
    },

    onPageChange($event) {
      this.getPaymentProcessor();
    },

    onPageSetup($event) {
      this.pagination.current = 1;
      this.getPaymentProcessor();
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
    // this.GetPaymentProcessor()();
    this.getPaymentProcessor();
    this.getDivisions();
    this.getBanks();
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
