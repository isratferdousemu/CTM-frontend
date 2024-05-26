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
              <v-card-title class="justify-center" tag="div">
                <h3 class="text-uppercase pt-3">
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
                  <v-col cols="12">
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
                          (pagination.current - 1) * pagination.perPage +
                          index +
                          1
                        }}
                      </template>
                      <template v-slot:item.charge="{ item }">
                        {{ item.charge }}%
                      </template>

                      <!-- Action Button -->
                      <template v-slot:item.actions="{ item }">
                        <!-- <v-tooltip top>
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
                        </v-tooltip> -->

                        <v-tooltip top>
                          <template v-slot:activator="{ on }">
                            <router-link :to="`/payroll-management/payment-processor-show/${item.id}`" tag="span" v-on="on">
                              <v-btn
                                fab
                                x-small
                                color="success"
                                elevation="0"
                              >
                                <v-icon>mdi-eye-outline</v-icon>
                              </v-btn>
                            </router-link>
                          </template>
                          <span>{{ $t("container.list.edit") }}</span>
                        </v-tooltip>

                        <v-tooltip top>
                          <template v-slot:activator="{ on }">
                            <v-btn
                              v-can="'delete-division'"
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

      <!-- division add modal  -->
      <v-dialog v-model="dialogAdd" width="950">
        <v-card style="justify-content: center; text-align: center">
          <v-card-title class="font-weight-bold justify-center">
            {{ $t("container.payroll_management.add_new") }}
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
                        :error-messages="errors[0] ? (language === 'bn' ? 'একটি প্রসেসরের ধরন নির্বাচন করুন' : 'Select a processor type'):''"
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
                        :error-messages="errors[0] ? (language === 'bn' ? 'একটি ব্যাংক নির্বাচন করুন' : 'Select a bank'):''"
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
                        :error-messages="errors[0] ? (language === 'bn' ? 'শাখার নাম বৈধ নয়' : 'Branch name is not valid'):''"
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
                        :error-messages="errors[0] ? (language === 'bn' ? 'রাউটিং নম্বর বৈধ নয়' : 'Routing number is not valid'):''"
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
                        :error-messages="errors[0] ? (language === 'bn' ? 'অনুগ্রহ করে এই ক্ষেত্রে ইংরেজি অক্ষর লিখুন' : 'Please Enter English Letters in this Field') : ''"
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
                        :error-messages="errors[0] ? (language === 'bn' ? 'অনুগ্রহ করে এই ক্ষেত্রে বাংলা অক্ষর লিখুন' : 'Please Enter bangla Letters in this Field') : ''"
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
                        :error-messages="errors[0] ? (language === 'bn' ? 'একটি বাংলাদেশী ফোন নম্বর লিখুন' : 'Enter a bangladeshi phone number') : ''"
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
                        :error-messages="errors[0] ? (language === 'bn' ? 'একটি বৈধ ইমেইল ঠিকানা লিখুন' : 'Enter a valid email address') : ''"
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
                        :error-messages="errors[0] ? (language === 'bn' ? 'চার্জ শতাংশ লিখুন' : 'Enter charge percentage') : ''"
                        >></v-text-field
                      >
                    </ValidationProvider>
                  </v-col>

                  <v-col lg="12" md="12" cols="12">
                    <v-divider></v-divider>
                    <v-card-title class="font-weight-bold justify-center">
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
                        :error-messages="errors[0] ? (language === 'bn' ? 'একটি বিভাগ নির্বাচন করুন' : 'Select a division') : ''"
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
                        :error-messages="errors[0] ? (language === 'bn' ? 'একটি জেলা নির্বাচন করুন' : 'Select a district') : ''"
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
                        clearable
                        v-model="data.location_type"
                        :items="location_types"
                        :item-text="language === 'bn' ? 'name_bn' : 'name_en'"
                        item-value="id"
                        :label="
                          $t('container.payroll_management.location_type')
                        "
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0] ? (language === 'bn' ? 'একটি অবস্থানের ধরন নির্বাচন করুন' : 'Select a location type') : ''"
                        @change="
                          getDistrictPourashava(
                            data.district,
                            data.location_type
                          )
                        "
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
                        clearable
                        v-model="data.upazila"
                        :items="upazilas"
                        :item-text="language === 'bn' ? 'name_bn' : 'name_en'"
                        item-value="id"
                        :label="$t('container.payroll_management.upazila')"
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0] ? (language === 'bn' ? 'একটি উপজেলা নির্বাচন করুন' : 'Select a upazila') : ''"
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
                      data.upazila != null
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
                        clearable
                        v-model="data.union"
                        :items="unions"
                        :item-text="language === 'bn' ? 'name_bn' : 'name_en'"
                        item-value="id"
                        :label="$t('container.payroll_management.union')"
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0] ? (language === 'bn' ? 'একটি ইউনিয়ন নির্বাচন করুন' : 'Select a union') : ''"
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
                        clearable
                        v-model="data.city_corporation"
                        :items="city_corporations"
                        :item-text="language === 'bn' ? 'name_bn' : 'name_en'"
                        item-value="id"
                        :label="
                          $t('container.payroll_management.city_corporation')
                        "
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0] ? (language === 'bn' ? 'একটি সিটি কর্পোরেশন নির্বাচন করুন' : 'Select a city corporation') : ''"
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
                      data.city_corporation != null
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
                        clearable
                        v-model="data.thana"
                        :items="thanas"
                        item-text="name"
                        item-value="id"
                        :label="$t('container.payroll_management.thana')"
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0] ? (language === 'bn' ? 'একটি থানা নির্বাচন করুন' : 'Select a thana') : ''"
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
                        clearable
                        v-model="data.district_pourashava"
                        :item-text="language === 'bn' ? 'name_bn' : 'name_en'"
                        :items="district_pourashavas"
                        item-value="id"
                        :label="
                          $t('container.payroll_management.district_pourashava')
                        "
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0] ? (language === 'bn' ? 'একটি জেলা পৌরসভা নির্বাচন করুন' : 'Select a district pourashava') : ''"
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
            <p class="red--text mt-2">
              Active field only Visible to Update Page. ***
            </p>
          </v-card-text>
        </v-card>
      </v-dialog>
      <!-- division add modal  -->

      <!-- Payment processor Edit modal  -->
      <v-dialog v-model="dialogEdit" width="950">
        <v-card style="justify-content: center; text-align: center">
          <v-card-title class="font-weight-bold justify-center">
            {{ $t("container.payroll_management.edit") }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="mt-7">
            <ValidationObserver ref="formAdd" v-slot="{ invalid }">
              <form @submit.prevent="submitPaymentProcessor()">
                <v-row>
                  <v-col lg="6" md="6" cols="12">
                    <ValidationProvider
                      v-slot="{ errors }"
                      name="Code"
                      vid="code"
                      rules="required"
                    >
                      <v-autocomplete
                        outlined
                        clearable
                        v-model="data.processor_type"
                        :items="processor_types"
                        item-text="name"
                        item-value="id"
                        :label="
                          $t('container.payroll_management.processor_type')
                        "
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                      >
                      </v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <v-col
                    lg="6"
                    md="6"
                    cols="12"
                    v-if="data.processor_type === 1"
                  >
                    <ValidationProvider
                      v-slot="{ errors }"
                      name="Code"
                      vid="code"
                      rules="required"
                    >
                      <v-autocomplete
                        outlined
                        clearable
                        v-model="data.bank_name"
                        :items="bank_names"
                        item-text="name"
                        item-value="id"
                        :label="$t('container.payroll_management.bank_name')"
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                      >
                      </v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <v-col
                    lg="6"
                    md="6"
                    cols="12"
                    v-if="data.processor_type === 1"
                  >
                    <ValidationProvider
                      v-slot="{ errors }"
                      name="Branch Name"
                      vid="name_en"
                      rules="required"
                    >
                      <v-text-field
                        outlined
                        type="text"
                        v-model="data.branch_name"
                        :label="$t('container.payroll_management.branch_name')"
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                        >></v-text-field
                      >
                    </ValidationProvider>
                  </v-col>

                  <v-col lg="6" md="6" cols="12">
                    <ValidationProvider
                      v-slot="{ errors }"
                      name="Name English"
                      vid="name_en"
                      rules="required"
                    >
                      <v-text-field
                        outlined
                        type="text"
                        v-model="data.name_en"
                        :label="$t('container.list.name_en')"
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                        >></v-text-field
                      >
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="6" md="6" cols="12">
                    <ValidationProvider
                      v-slot="{ errors }"
                      name="Name in Bangla"
                      vid="name_en"
                      rules="required"
                    >
                      <v-text-field
                        outlined
                        type="text"
                        v-model="data.name_bn"
                        :label="$t('container.list.name_en')"
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                        >></v-text-field
                      >
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="6" md="6" cols="12">
                    <ValidationProvider
                      v-slot="{ errors }"
                      name="Covearge Area"
                      vid="name_en"
                      rules="required"
                    >
                      <v-text-field
                        outlined
                        type="text"
                        v-model="data.covearge_area"
                        :label="
                          $t('container.payroll_management.coverage_area')
                        "
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                        >></v-text-field
                      >
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="6" md="6" cols="12">
                    <ValidationProvider
                      v-slot="{ errors }"
                      name="Focal Phone"
                      vid="name_en"
                      rules="required"
                    >
                      <v-text-field
                        outlined
                        type="text"
                        v-model="data.focal_phone"
                        :label="$t('container.payroll_management.focal_phone')"
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                        >></v-text-field
                      >
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="6" md="6" cols="12">
                    <ValidationProvider
                      v-slot="{ errors }"
                      name="Focal Email"
                      vid="name_en"
                      rules="required"
                    >
                      <v-text-field
                        outlined
                        type="text"
                        v-model="data.focal_email"
                        :label="$t('container.payroll_management.email')"
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                        >></v-text-field
                      >
                    </ValidationProvider>
                  </v-col>
                </v-row>

                <v-row class="mx-0 my-0 py-2" justify="center">
                  <v-btn
                    flat
                    @click="dialogEdit = false"
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
                    {{ $t("container.list.update") }}
                  </v-btn>
                </v-row>
              </form>
            </ValidationObserver>
            <p class="red--text mt-2">
              Active field only Visible to Update Page. ***
            </p>
          </v-card-text>
        </v-card>
      </v-dialog>

      <!-- Payment processor Edit modal  -->

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
  title: "CTM - Payment Processor",
  data() {
    return {
      data: {
        id:null,
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
      dialogAdd: false,
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
        {
          id: 3,
          name_en: "Agent Banking",
          name_bn: "এজেন্ট ব্যাংকিং",
          value: "agent_banking",
        },
      ],

      location_types: [
        {
          id: 1,
          name_en: "District Pourashava",
          name_bn: "জেলা পৌরসভা",
          value: "district_pourashava",
        },
        { id: 2, name_en: "Upazila", name_bn: "উপজেলা", value: "upazila" },
        {
          id: 3,
          name_en: "City Corporation",
          name_bn: "সিটি কর্পোরেশন",
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
        },
        {
          text: this.$t("container.payroll_management.processor_type"),
          value: "processor_type",
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
          text: this.$t("container.payroll_management.coverage_area"),
          value: "processor_area.district.name_en",
        },
        {
          text: this.$t("container.payroll_management.focal_phone"),
          value: "focal_phone_no",
        },
        {
          text: this.$t("container.payroll_management.email"),
          value: "focal_email_address",
        },
        {
          text: this.$t("container.payroll_management.charge"),
          value: "charge",
        },
        {
          text: this.$t("container.list.action"),
          value: "actions",
          align: "center",
          width: "15%",
          sortable: false,
        },
      ];
    },
    language: {
      get() {
        return this.$store.getters.getAppLanguage;
      },
    },
  },

  methods: {
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

    deleteAlert(id) {
      this.data.id = id;
      this.deleteDialog = true;
    },
    async deleteItem() {
      console.log("🚀 ~ deleteItem ~ this.data.id:", this.data.id)
      
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
          this.$toast.success(this.language === "bn" ? "পেমেন্ট প্রসেসর সফলভাবে মুছে ফেলা হয়েছে" : "Payment Processor deleted successfully");
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
        const response = await this.$axios.post(
          "admin/payroll/payment-processor",
          this.data,
          {
            headers: {
              Authorization: `Bearer ${this.$store.state.token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          this.getPaymentProcessor();
          this.$toast.success(this.language === "bn" ? "পেমেন্ট প্রসেসর সফলভাবে জমা দেওয়া হয়েছে" : "Payment Processor submitted successfully");
          this.dialogAdd = false;
          // Reset form data or perform other actions as needed
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

    async getDistricts(divisionId) {
    // this.data.location_type == null
    // this.data.upazila == null
    // this.data.union == null
    // this.data.thana == null
    // this.data.city_corporation == null
    // this.data.district_pourashava == null
      try {
        const response = await this.$axios.get(`get-districts/${divisionId}`, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
        });
        if (response.status == "200") {
          this.districts = response.data.data;
        } else {
          this.$toast.error("Something went wrong");
        }
      } catch (error) {
        console.error("Error fetching divisions:", error);
      }
    },

    async getDistrictPourashava(districtId, locationTypeId) {
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

    editDialog(item) {
      this.dialogEdit = true;

      this.data.name_en = item.name_en;
      this.data.name_bn = item.name_bn;

      this.errors = {};
    },

    resetForm() {},

    onPageChange($event) {
      // this.pagination.current = $event;
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
