<template>
  <div id="thana">
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
                <h3 class="text-uppercase pt-3">Office List</h3>
              </v-card-title>
              <v-card-text>
                <v-row
                  class="ma-0 pa-3 white round-border d-flex justify-space-between align-center"
                  justify="center"
                  justify-lg="space-between"
                >
                  <div class="d-flex justify-sm-end flex-wrap">
                    <v-text-field
                      @keyup.native="GetOffices"
                      outlined
                      dense
                      v-model="search"
                      prepend-inner-icon="mdi-magnify"
                      class="my-sm-0 my-3 mx-0v -input--horizontal"
                      flat
                      variant="outlined"
                      label="search office"
                      hide-details
                      color="primary"
                    >
                    </v-text-field>
                  </div>
                  <v-btn
                    @click="dialogOpen"
                    flat
                    color="primary"
                    prepend-icon="mdi-account-multiple-plus"
                  >
                    Add New Office
                  </v-btn>
                  <v-col cols="12">
                    <v-data-table
                      :loading="loading"
                      item-key="id"
                      :headers="headers"
                      :items="offices"
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
                        <span v-if="item?.status == '0'"> Inactive </span>
                        <span v-if="item?.status == '1'"> Active </span>
                      </template>
                      <!--      <template v-slot:item.district="{ item }">
                        <span v-if="item?.parent?.parent?.type == 'district'">
                          {{ item?.parent?.parent.name_en }}
                        </span>
                        <span
                          v-if="
                            item?.parent?.type == 'union' ||
                            item?.parent?.type == 'thana'
                          "
                        >
                          {{ item?.parent?.parent?.parent?.name_en }}
                        </span>
                      </template>
                      <template v-slot:item.thana="{ item }">
                        <span
                          v-if="
                            item?.parent?.type == 'union' ||
                            item?.parent?.type == 'thana'
                          "
                        >
                          {{ item?.parent?.parent?.name_en }}
                        </span>
                      </template>
                      <template v-slot:item.union="{ item }">
                        <span
                          v-if="
                            item?.parent?.type == 'city' ||
                            item?.parent?.type == 'union' ||
                            item?.parent?.type == 'thana'
                          "
                        >
                          {{ item?.parent?.name_en }}
                        </span>
                      </template> -->
                      <template v-slot:item.actions="{ item }">
                        <v-btn
                          v-can="'update-post'"
                          fab
                          x-small
                          color="success"
                          elevation="0"
                          @click="editOffice(item)"
                        >
                          <v-icon> mdi-account-edit-outline </v-icon>
                        </v-btn>
                        <v-btn
                          v-can="'delete-division'"
                          fab
                          x-small
                          color="grey"
                          class="ml-3 white--text"
                          elevation="0"
                          @click="deleteAlert(item.id)"
                        >
                          <v-icon> mdi-delete </v-icon>
                        </v-btn>
                      </template>
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

      <!-- office add modal  -->
      <v-dialog v-model="dialogAdd" width="650">
        <v-card style="justify-content: center; text-align: center">
          <v-card-title class="font-weight-bold justify-center">
            Add New Office
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="mt-7">
            <v-row> </v-row>

            <ValidationObserver ref="form" v-slot="{ invalid }">
              <form @submit.prevent="submitOffice()">
                <v-row>
                  <v-col lg="6" md="6" cols="12">
                    <ValidationProvider
                      name="OfficeType"
                      vid="officeType"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-autocomplete
                        :hide-details="errors[0] ? false : true"
                        @input="onChangeOfficeType($event)"
                        v-model="data.office_type"
                        outlined
                        label="Office Type"
                        :items="officeType"
                        item-text="value_en"
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
                      office_type_id == 6 ||
                      office_type_id == 7 ||
                      office_type_id == 8 ||
                      office_type_id == 9 ||
                      office_type_id == 10 ||
                      office_type_id == 11
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
                        label="Division"
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
                      office_type_id == 7 ||
                      office_type_id == 8 ||
                      office_type_id == 9 ||
                      office_type_id == 10 ||
                      office_type_id == 11
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
                        label="District"
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
                      office_type_id == 8 ||
                      office_type_id == 10 ||
                      office_type_id == 11
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
                        v-model="data.thana_id"
                        @input="onChangeUpazila($event)"
                        label="Upazila"
                        :items="upazilas"
                        item-text="name_en"
                        item-value="id"
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="6" md="6" cols="12" v-if="office_type_id == 9">
                    <ValidationProvider
                      name="city"
                      vid="city_corpo_id"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-autocomplete
                        :hide-details="errors[0] ? false : true"
                        v-model="data.city_corpo_id"
                        @change="onChangeCity($event)"
                        outlined
                        label="City Corporation"
                        :items="city"
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
                      name="Office Name English"
                      vid="name_en"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        outlined
                        type="text"
                        :hide-details="errors[0] ? false : true"
                        v-model="data.name_en"
                        label="Office Name English"
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="6" md="6" cols="12">
                    <ValidationProvider
                      name="Office Name Bangla"
                      vid="name_bn"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        :hide-details="errors[0] ? false : true"
                        outlined
                        type="text"
                        v-model="data.name_bn"
                        label="Office Name Bangla"
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="6" md="6" cols="12">
                    <ValidationProvider
                      name="Office Address"
                      vid="office_address"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        :hide-details="errors[0] ? false : true"
                        outlined
                        type="text"
                        v-model="data.office_address"
                        label="Office Address"
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="6" md="6" cols="12">
                    <ValidationProvider
                      name="Comment"
                      vid="comment"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        :hide-details="errors[0] ? false : true"
                        outlined
                        type="text"
                        v-model="data.comment"
                        label="Comment"
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="6" md="6" cols="12">
                    <ValidationProvider
                      name="Status"
                      vid="status"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-checkbox
                        v-model="data.status"
                        label="Active"
                        color="green"
                        value="1"
                        :hide-details="errors[0] ? false : true"
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                      ></v-checkbox>
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
                    Cancel
                  </v-btn>
                  <v-btn
                    type="submit"
                    flat
                    color="primary"
                    :disabled="invalid"
                    :loading="loading"
                    class="custom-btn-width black white--text py-2"
                  >
                    Submit
                  </v-btn>
                </v-row>
              </form>
            </ValidationObserver>
          </v-card-text>
        </v-card>
      </v-dialog>
      <!-- office add modal  -->

      <!-- office Edit modal  -->
      <v-dialog v-model="dialogEdit" width="650">
        <v-card style="justify-content: center; text-align: center">
          <v-card-title class="font-weight-bold justify-center">
            Edit Office
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="mt-7">
            <v-row> </v-row>

            <ValidationObserver ref="form" v-slot="{ invalid }">
              <form @submit.prevent="updateOffice()">
                <v-row>
                  <v-col lg="6" md="6" cols="12">
                    <ValidationProvider
                      name="OfficeType"
                      vid="officeType"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-autocomplete
                        :hide-details="errors[0] ? false : true"
                        @input="onChangeOfficeType($event)"
                        v-model="data.office_type"
                        outlined
                        label="Office Type"
                        :items="officeType"
                        item-text="value_en"
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
                      office_type_id == 6 ||
                      office_type_id == 7 ||
                      office_type_id == 8 ||
                      office_type_id == 9 ||
                      office_type_id == 10 ||
                      office_type_id == 11
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
                        label="Division"
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
                      office_type_id == 7 ||
                      office_type_id == 8 ||
                      office_type_id == 9 ||
                      office_type_id == 10 ||
                      office_type_id == 11
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
                        label="District"
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
                      office_type_id == 8 ||
                      office_type_id == 10 ||
                      office_type_id == 11
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
                        v-model="data.thana_id"
                        @input="onChangeUpazila($event)"
                        label="Upazila"
                        :items="upazilas"
                        item-text="name_en"
                        item-value="id"
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="6" md="6" cols="12" v-if="office_type_id == 9">
                    <ValidationProvider
                      name="city"
                      vid="city_corpo_id"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-autocomplete
                        :hide-details="errors[0] ? false : true"
                        v-model="data.city_corpo_id"
                        @change="onChangeCity($event)"
                        outlined
                        label="City Corporation"
                        :items="city"
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
                      name="Office Name English"
                      vid="name_en"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        outlined
                        type="text"
                        :hide-details="errors[0] ? false : true"
                        v-model="data.name_en"
                        label="Office Name English"
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="6" md="6" cols="12">
                    <ValidationProvider
                      name="Office Name Bangla"
                      vid="name_bn"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        :hide-details="errors[0] ? false : true"
                        outlined
                        type="text"
                        v-model="data.name_bn"
                        label="Office Name Bangla"
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="6" md="6" cols="12">
                    <ValidationProvider
                      name="Office Address"
                      vid="office_address"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        :hide-details="errors[0] ? false : true"
                        outlined
                        type="text"
                        v-model="data.office_address"
                        label="Office Address"
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="6" md="6" cols="12">
                    <ValidationProvider
                      name="Comment"
                      vid="comment"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        :hide-details="errors[0] ? false : true"
                        outlined
                        type="text"
                        v-model="data.comment"
                        label="Comment"
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="6" md="6" cols="12">
                    <ValidationProvider
                      name="Status"
                      vid="status"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-checkbox
                        v-model="data.status"
                        label="Active"
                        color="green"
                        :hide-details="errors[0] ? false : true"
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                      ></v-checkbox>
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
                    Cancel
                  </v-btn>
                  <v-btn
                    type="submit"
                    flat
                    color="primary"
                    :disabled="invalid"
                    :loading="loading"
                    class="custom-btn-width black white--text py-2"
                  >
                    Submit
                  </v-btn>
                </v-row>
              </form>
            </ValidationObserver>
          </v-card-text>
        </v-card>
      </v-dialog>
      <!-- office Edit modal  -->
      <!-- office edit modal  -->
      <v-dialog v-model="dialogEditold" width="650">
        <v-card style="justify-content: center; text-align: center">
          <v-card-title class="font-weight-bold justify-center">
            Update Office
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="mt-7">
            <v-row> </v-row>

            <ValidationObserver ref="form" v-slot="{ invalid }">
              <form @submit.prevent="updateOffice()">
                <v-row>
                  <v-col lg="12" md="12" cols="12">
                    <ValidationProvider
                      name="Code"
                      vid="code"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        :hide-details="errors[0] ? false : true"
                        outlined
                        type="text"
                        v-model="data.code"
                        label="Code"
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="6" md="6" cols="12">
                    <ValidationProvider
                      name="Office Name English"
                      vid="name_en"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        outlined
                        type="text"
                        :hide-details="errors[0] ? false : true"
                        v-model="data.name_en"
                        label="Office Name English"
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="6" md="6" cols="12">
                    <ValidationProvider
                      name="Office Name Bangla"
                      vid="name_bn"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        :hide-details="errors[0] ? false : true"
                        outlined
                        type="text"
                        v-model="data.name_bn"
                        label="Office Name Bangla"
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>

                  <v-col lg="6" md="6" cols="12">
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
                        label="Division"
                        :items="divisions"
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
                        label="District"
                        :items="districts"
                        item-text="name_en"
                        item-value="id"
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <v-col cols="12">
                    <ValidationProvider
                      name="Location Type"
                      vid="location_type"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-autocomplete
                        @input="LocationType($event)"
                        v-model="data.location_type"
                        :hide-details="errors[0] ? false : true"
                        outlined
                        label="Location Type"
                        :items="locationType"
                        item-text="value_en"
                        item-value="id"
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <v-col v-if="data.location_type == 2" lg="6" md="6" cols="12">
                    <ValidationProvider
                      name="Upazila"
                      vid="thana_id"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-autocomplete
                        :hide-details="errors[0] ? false : true"
                        v-model="data.thana_id"
                        outlined
                        label="Upazila"
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
                  <v-col v-if="data.location_type == 2" lg="6" md="6" cols="12">
                    <ValidationProvider
                      name="union"
                      vid="union_id"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-autocomplete
                        :hide-details="errors[0] ? false : true"
                        v-model="data.union_id"
                        outlined
                        label="Union"
                        :items="unions"
                        item-text="name_en"
                        item-value="id"
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <v-col v-if="data.location_type == 3" lg="6" md="6" cols="12">
                    <ValidationProvider
                      name="city"
                      vid="city_corpo_id"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-autocomplete
                        :hide-details="errors[0] ? false : true"
                        v-model="data.city_corpo_id"
                        @change="onChangeCity($event)"
                        outlined
                        label="City Corporation"
                        :items="city"
                        item-text="name_en"
                        item-value="id"
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <v-col v-if="data.location_type == 3" lg="6" md="6" cols="12">
                    <ValidationProvider
                      name="thana"
                      vid="city_thana_id"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-autocomplete
                        :hide-details="errors[0] ? false : true"
                        v-model="data.city_thana_id"
                        outlined
                        label="Thana"
                        :items="city_thanas"
                        item-text="name_en"
                        item-value="id"
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <v-col v-if="data.location_type == 1" lg="6" md="6" cols="12">
                    <ValidationProvider
                      name="thana"
                      vid="district_pouro_id"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-autocomplete
                        :hide-details="errors[0] ? false : true"
                        v-model="data.district_pouro_id"
                        outlined
                        label="District Pouroshava"
                        :items="district_poros"
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
                    Cancel
                  </v-btn>
                  <v-btn
                    type="submit"
                    flat
                    color="primary"
                    :disabled="invalid"
                    :loading="loading"
                    class="custom-btn-width black white--text py-2"
                  >
                    Submit
                  </v-btn>
                </v-row>
              </form>
            </ValidationObserver>
          </v-card-text>
        </v-card>
      </v-dialog>
      <!-- office edit modal  -->

      <!-- delete modal  -->
      <v-dialog v-model="deleteDialog" width="350">
        <v-card style="justify-content: center; text-align: center">
          <v-card-title class="font-weight-bold justify-center">
            Delete Office
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <div class="subtitle-1 font-weight-medium mt-5">
              Are you sure to delete this Office? All information under this
              Office will be deleted.
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
                Cancel
              </v-btn>
              <v-btn
                text
                @click="deleteOffice($event)"
                color="white"
                :loading="delete_loading"
                class="custom-btn-width black white--text py-2"
              >
                Delete
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
import { mapState, mapActions } from "vuex";
import { extend, ValidationProvider, ValidationObserver } from "vee-validate";
import { required } from "vee-validate/dist/rules";

extend("required", required);

export default {
  name: "Index",
  title: "CTM - Office",
  data() {
    return {
      data: {
        id: null,
        name_en: null,
        name_bn: null,
        thana_id: null,
        office_type: null,
        office_address: null,
        comment: null,
        status: "0",
        division_id: null,
        district_id: null,
        location_type: null,
        city_corpo_id: null,
      },
      office_type_id: null,
      isDistrictHidden: true,
      isLocationTypeHidden: true,
      isCityCorporationHidden: false,
      districts: [],
      offices: [],
      officeType: [],
      upazilas: [],
      city: null,
      locationType: [],
      dialogAdd: false,
      dialogEdit: false,
      deleteDialog: false,
      delete_loading: false,
      loading: false,
      errors: {},
      error_status: {},
      search: "",
      delete_id: "",
      pagination: {
        current: 1,
        total: 0,
        perPage: 15,
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
        { text: "#Sl", value: "id", align: "start", sortable: false },
        { text: "Office  (EN)", value: "name_en" },
        { text: "Office  (BN)", value: "name_bn" },
        { text: "Office Category", value: "officeType.value_en" },
        { text: "Office Address", value: "office_address" },
        // { text: "Location Type", value: "locationType" },
        { text: "Status", value: "status" },
        {
          text: "Actions",
          value: "actions",
          align: "center",
          sortable: false,
          width: "13%",
        },
      ];
    },

    ...mapState({
      divisions: (state) => state.Division.divisions,
      // error_status: (state) => state.Office.error_status,
      // thana_errors: (state) => state.Office.thana_errors,
      // message: (state) => state.SystemConfiguration.success_message,
    }),
    filteredOptions() {
      // Apply your filter logic here, e.g., filtering out options with 'Option 2' label
      return this.locationType.filter(
        (option) => option.value_en !== "District Pouroshava"
      );
    },
  },
  methods: {
    submitOffice() {
      let fd = new FormData();
      for (const [key, value] of Object.entries(this.data)) {
        if (value !== null) {
          fd.append(key, value);
        }
      }
      // for (const [key, value] of fd.entries()) {
      //   console.log(`${key}: ${value}`);
      // }

      try {
        this.$store.dispatch("Office/StoreOffice", fd).then((data) => {
          // console.log(data, "submit");
          if (data == null) {
            this.$toast.success("Data Inserted Successfully");
            this.dialogAdd = false;
            this.resetData();
            this.GetOffices();
          } else {
            this.errors = data.errors;
          }
        });
      } catch (e) {
        console.log(e);
      }
    },
    async updateOffice() {
      let fd = new FormData();
      for (const [key, value] of Object.entries(this.data)) {
        if (value !== null) {
          fd.append(key, value);
        }
      }
      try {
        this.$store.dispatch("Office/UpdateOffice", fd).then((data) => {
          console.log(data, "update");
          if (data == null) {
            this.$toast.success("Data Updated Successfully");
            this.dialogEdit = false;
            this.resetData();
            this.GetOffices();
          } else {
            this.errors = data.errors;
          }
        });
      } catch (e) {
        console.log(e);
      }
    },
    dialogOpen() {
      if (this.$refs.form) {
        this.$refs.form.reset();
      }

      const update_error_value = null;
      this.updateError("update_error_value");
      this.resetData();
      this.dialogAdd = true;
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
    async GetAllUpazila(id) {
      console.log(id, "GetAllUpazila");
      try {
        this.$store
          .dispatch("Thana/GetAllUpazilaByDistrict", id)
          .then((data) => {
            console.log(data, "GetAllUpazilaByDistrict");
            this.upazilas = data;
          });
      } catch (e) {
        console.log(e);
      }
    },
    async GetLocationType() {
      try {
        this.$store.dispatch("getLookupByType", 1).then((data) => {
          this.locationType = data;
        });
      } catch (e) {
        console.log(e);
      }
    },
    async onChangeOfficeType(event) {
      this.office_type_id = event;
      console.log(this.office_type_id);
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
          this.isDistrictHidden = true;
        });
    },
    async onChangeDistrict(event) {
      event = 3; //Lookup.id = 3 , Look.name_en = 'City Corporation'
      const payload = {
        district_id: this.data.district_id,
        lookup_id: "3",
      };
      console.log(JSON.stringify(payload));
      // return;
      if (
        this.office_type_id == 8 ||
        this.office_type_id == 10 ||
        this.office_type_id == 11
      ) {
        console.log("load Upazila");
        this.GetAllUpazila(this.data.district_id);
      } else {
        console.log("load City Corporation");
        await this.$axios
          .get(`/admin/city/get/` + this.data.district_id + "/" + event, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((result) => {
            this.city = result.data.data;
            console.log(this.city, "onChangeDistrict");
          });
      }
    },
    ...mapActions({
      GetAllDivisions: "Division/GetAllDivisions",
      updateError: "Office/updateError",
    }),
    deleteAlert(id) {
      this.deleteDialog = true;
      this.delete_id = id;
    },
    onPageChange($event) {
      // this.pagination.current = $event;
      this.GetOffices();
    },
    async GetOffices() {
      const queryParams = {
        searchText: this.search,
        perPage: this.pagination.perPage,
        page: this.pagination.current,
      };
      console.log(queryParams);
      this.$axios
        .get("/admin/office/get", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
          params: queryParams,
        })
        .then((result) => {
          this.offices = result.data.data;
          console.log(this.offices, "Get Office");
          this.pagination.current = result.data.meta.current_page;
          this.pagination.total = result.data.meta.last_page;
          this.pagination.grand_total = result.data.meta.total;
        });
    },
    // deleteOffice: async function (id) {
    //   alert
    //   try {
    //     await this.$store
    //       .dispatch("Office/DestroyOffice", this.delete_id)
    //       .then((res) => {
    //         // check if the request was successful
    //         console.log(res, "result in vue");
    //         if (res?.data?.success) {
    //           this.$toast.success(res.data.message);
    //         } else {
    //           this.$toast.error(res.response.data.message);
    //         }
    //         this.deleteDialog = false;
    //         this.GetOffices();
    //       });
    //   } catch (e) {
    //     console.log(e);
    //   }
    // },
    deleteOffice: async function () {
      try {
        await this.$store
          .dispatch("Office/DestroyOffice", this.delete_id)
          .then((res) => {
            console.log(res);
            // check if the request was successful
            if (res?.data?.success) {
              this.$toast.error(res.data.message);
            } else {
              this.$toast.success(res.data.message);
            }
            this.deleteDialog = false;
            this.GetOffices();
          })
          .catch((error) => {
            console.log(error, "error");
          });
      } catch (e) {
        console.log(e);
      }
    },
    resetData() {
      this.dialogEdit = null;
      this.data.id = null;
      this.data.office_type = null;
      this.office_type_id = null;
      this.data.name_en = null;
      this.data.name_bn = null;
      this.data.office_address = null;
      this.data.comment = null;
      this.data.status = null;
      this.data.division_id = null;
      this.data.district_id = null;
      this.data.city_corpo_id = null;
      this.data.thana_id = null;
    },
    editOffice(item) {
      console.log(item, "editOffice");
      console.log(item?.assignLocation?.parent?.parent?.type, "editDivision");

      this.resetData();

      this.dialogEdit = true;
      this.data.id = item.id;
      this.data.office_type = item.officeType.id;
      this.office_type_id = item.officeType.id;
      this.data.name_en = item.name_en;
      this.data.name_bn = item.name_bn;
      this.data.office_address = item.office_address;
      this.data.comment = item.comment;

      // console.log(item?.assignLocation?.type, 'division 1');
      if (item?.assignLocation?.type == "division") {
        console.log("division here");
        this.data.division_id = item?.assignLocation?.id;
        // console.log(this.data.division_id);
        // this.onChangeDivision(this.data.division_id);
        // this.data.district_id = item?.assignLocation?.id;
      }
      if (item?.assignLocation?.type == "district") {
        console.log("district here");
        this.data.division_id = item?.assignLocation?.parent?.id;
        this.onChangeDivision(this.data.division_id);
        this.data.district_id = item?.assignLocation?.id;
      }
      if (item?.assignLocation?.parent?.parent?.type == "division") {
        this.data.division_id = item?.assignLocation?.parent?.parent?.id;
        this.onChangeDivision(this.data.division_id);
      }
      if (item?.assignLocation?.parent?.type == "district") {
        this.data.district_id = item?.assignLocation?.parent?.id;
        this.onChangeDistrict(this.data.district_id);
      }
      if (item?.assignLocation?.location_type?.value_en == "City Corporation") {
        this.data.city_corpo_id = item?.assignLocation?.id;
      }
      if (item?.assignLocation?.location_type?.value_en == "Upazila") {
        this.data.thana_id = item?.assignLocation?.id;
      }
      console.log(this.data, "editOffice End");
    },
  },
  mounted() {
    this.GetOfficeType();
    this.GetOffices();
    this.GetAllDivisions();
    this.GetLocationType();
    this.GetAllUpazila();
    this.GetCityCorporation();
    // this.$store
    //   .dispatch("getLookupByType", 1)
    //   .then((res) => (this.locationType = res));
  },
  beforeMount() {
    this.$store.commit("setHeaderTitle", "Office List");
  },
};
</script>