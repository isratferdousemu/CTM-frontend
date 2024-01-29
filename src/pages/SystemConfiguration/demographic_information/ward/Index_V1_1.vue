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
                <h3 class="text-uppercase pt-3">
                  {{ $t("container.system_config.demo_graphic.ward.list") }}
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
                      @keyup.native="GetWard"
                      outlined
                      dense
                      v-model="search"
                      prepend-inner-icon="mdi-magnify"
                      class="my-sm-0 my-3 mx-0v -input--horizontal"
                      flat
                      variant="outlined"
                      :label="
                        $t('container.system_config.demo_graphic.ward.search')
                      "
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
                    {{ $t("container.list.add_new") }}
                  </v-btn>
                  <v-col cols="12">
                    <v-data-table
                      :loading="loading"
                      item-key="id"
                      :headers="headers"
                      :items="wards"
                      :items-per-page="pagination.perPage"
                      hide-default-footer
                      class="elevation-0 transparent row-pointer"
                    >
                      <!-- <template v-slot:item.id="{ item, index }">
                                              {{ (pagination.current - 1) * pagination.perPage + index + 1 }}
                                              v-if="item?.parent?.parent?.parent.type == 'division'"
                                            </template> -->
                      <template v-slot:item.division="{ item }">
                        <span
                          v-if="item?.location_type.id == '1'"
                        >
                       {{ item?.parent?.parent?.parent.name_en }}
                        </span>
                        
                        <span
                          v-if="item?.location_type.id == '2' || item?.location_type.id == '3'"
                        >
                       {{ item?.parent?.parent?.parent?.parent.name_en }}
                        </span>

                        <!-- <span
                          v-if="
                            item?.parent?.type == 'union' ||
                            item?.parent?.type == 'thana'
                          "
                        >
                         asdasd {{ item?.parent?.parent?.parent?.parent?.name_en }}
                        </span> -->
                      </template>
                      <template v-slot:item.district="{ item }">
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
                              @click="editWard(item)"
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

      <!-- ward add modal  -->
      <v-dialog v-model="dialogAdd" width="650">
        <v-card style="justify-content: center; text-align: center">
          <v-card-title class="font-weight-bold justify-center">
            {{ $t("container.system_config.demo_graphic.ward.add_new") }}{{ data }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="mt-7">
            <v-row> </v-row>

            <ValidationObserver ref="form" v-slot="{ invalid }">
              <form @submit.prevent="submitWard()">
                <v-row>
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
                  <v-col  cols="12">
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
                  <v-col  cols="12">
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
                  <v-col v-if="data.location_type == 2"  cols="12">
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
                        :label="
                          $t('container.system_config.demo_graphic.ward.upazila')
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
                  <v-col v-if="data.location_type == 2"  cols="12">
                    <ValidationProvider
                      name="subLocationType"
                      vid="subLocationType"
                      rules="required"
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
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                        :hide-details="errors[0] ? false : true"
                        :readonly="false"
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>

                  <v-col
                    v-if="data.location_type != 1 && data.sub_location_type == 1 "
                
                    cols="12"
                  >
                    <ValidationProvider
                      name="pouros"
                      vid="pouros"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-autocomplete
                        v-model="data.pouro_id"
                        outlined
                        :label="
                          $t(
                            'container.system_config.demo_graphic.ward.pouroshava'
                          )
                        "
                        :items="pouros"
                        item-text="name_en"
                        item-value="id"
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                        :hide-details="errors[0] ? false : true"
                        :readonly="false"
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
     <!-- v-if=" data.sub_location_type == 2" -->
                  <v-col
              v-if="data.location_type == 2 && data.sub_location_type == 2"
                     
                    cols="12"
                  >
                    <ValidationProvider
                      name="unions"
                      vid="unions"
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
                        :hide-details="errors[0] ? false : true"
                        :readonly="false"
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>

                  <!-- <v-col v-if="data.location_type == 2" lg="6" md="6" cols="12">
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
                        :label="
                          $t('container.system_config.demo_graphic.ward.union')
                        "
                        :items="unions"
                        item-text="name_en"
                        item-value="id"
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col> -->
                  <v-col v-if="data.location_type == 3"  cols="12">
                    <ValidationProvider
                      name="city"
                      vid="city_id"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-autocomplete
                        :hide-details="errors[0] ? false : true"
                        v-model="data.city_id"
                        @change="onChangeCity($event)"
                        outlined
                        :label="
                          $t('container.system_config.demo_graphic.ward.city')
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
                  <v-col v-if="data.location_type == 3"  cols="12">
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
                        :label="
                          $t('container.system_config.demo_graphic.ward.thana')
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
                  <v-col v-if="data.location_type == 1"  cols="12">
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
                        :label="
                          $t('container.system_config.demo_graphic.ward.pouro')
                        "
                        :items="district_poros"
                        item-text="name_en"
                        item-value="id"
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="12" md="12" cols="12">
                    <ValidationProvider
                      name="Code"
                      vid="code"
                      rules="codeRules"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        :hide-details="errors[0] ? false : true"
                        outlined
                        type="text"
                        v-model="data.code"
                        :label="
                          $t('container.system_config.demo_graphic.ward.code')
                        "
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col  cols="12">
                    <ValidationProvider
                      name="Ward Name English"
                      vid="name_en"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        outlined
                        type="text"
                        :hide-details="errors[0] ? false : true"
                        v-model="data.name_en"
                        :label="
                          $t(
                            'container.system_config.demo_graphic.ward.name_en'
                          )
                        "
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col 
                   cols="12">
                    <ValidationProvider
                      name="Ward Name Bangla"
                      vid="name_bn"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        :hide-details="errors[0] ? false : true"
                        outlined
                        type="text"
                        v-model="data.name_bn"
                        :label="
                          $t(
                            'container.system_config.demo_graphic.ward.name_bn'
                          )
                        "
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>
                </v-row>

                <v-row class="mx-0 my-0 py-2 mt-5" justify="center">
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
                    class="custom-btn-width black white--text py-2"
                  >
                    {{ $t("container.list.submit") }}
                  </v-btn>
                </v-row>
              </form>
            </ValidationObserver>
          </v-card-text>
        </v-card>
      </v-dialog>
      <!-- ward add modal  -->
      <!-- ward edit modal  -->
      <v-dialog v-model="dialogEdit" width="650">
        <v-card style="justify-content: center; text-align: center">
          <v-card-title class="font-weight-bold justify-center">
            {{ $t("container.system_config.demo_graphic.ward.edit") }}{{ data }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="mt-7">
            <v-row> </v-row>

            <ValidationObserver ref="form" v-slot="{ invalid }">
              <form @submit.prevent="updateWard()">
                <v-row>
                  <v-col cols="12">
                    <ValidationProvider
                      name="Location Type"
                      vid="location_type"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-autocomplete
                        @input="LocationTypeEdit($event)"
                        v-model="data.location_type"
                        :hide-details="errors[0] ? false : true"
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
                  <v-col  cols="12">
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
                  <v-col  cols="12">
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
                  <v-col v-if="data.location_type == 2" cols="12">
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
                        :label="
                          $t('container.system_config.demo_graphic.ward.upazila')
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
                  <v-col v-if="data.location_type == 2"  cols="12">
                    <ValidationProvider
                      name="subLocationType"
                      vid="subLocationType"
                      rules="required"
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
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                        :hide-details="errors[0] ? false : true"
                        :readonly="false"
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>

                  <v-col
                    v-if="data.sub_location_type == 1"
                  
                    
                    cols="12"
                  >
                    <ValidationProvider
                      name="pouros"
                      vid="pouros"
                      rules="required"
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
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                        :hide-details="errors[0] ? false : true"
                        :readonly="false"
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>

                  <v-col
                    v-if="data.sub_location_type == 2"
                
                    
                    cols="12"
                  >
                    <ValidationProvider
                      name="unions"
                      vid="unions"
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
                        :hide-details="errors[0] ? false : true"
                        :readonly="false"
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>

                  <!-- <v-col v-if="data.location_type == 2" lg="6" md="6" cols="12">
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
                        :label="
                          $t('container.system_config.demo_graphic.ward.union')
                        "
                        :items="unions"
                        item-text="name_en"
                        item-value="id"
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col> -->
                  <v-col v-if="data.location_type == 3"  cols="12">
                    <ValidationProvider
                      name="city"
                      vid="city_id"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-autocomplete
                        :hide-details="errors[0] ? false : true"
                        v-model="data.city_id"
                        @change="onChangeCity($event)"
                        outlined
                        :label="
                          $t('container.system_config.demo_graphic.ward.city')
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
                  <v-col v-if="data.location_type == 3"  cols="12">
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
                        :label="
                          $t('container.system_config.demo_graphic.ward.thana')
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
                  <v-col v-if="data.location_type == 1" cols="12">
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
                        :label="
                          $t('container.system_config.demo_graphic.ward.pouro')
                        "
                        :items="district_poros"
                        item-text="name_en"
                        item-value="id"
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <v-col  cols="12">
                    <ValidationProvider
                      name="Code"
                      vid="code"
                      rules="codeRules"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        :hide-details="errors[0] ? false : true"
                        outlined
                        type="text"
                        v-model="data.code"
                        :label="
                          $t('container.system_config.demo_graphic.ward.code')
                        "
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col  cols="12">
                    <ValidationProvider
                      name="Ward Name English"
                      vid="name_en"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        outlined
                        type="text"
                        :hide-details="errors[0] ? false : true"
                        v-model="data.name_en"
                        :label="
                          $t(
                            'container.system_config.demo_graphic.ward.name_en'
                          )
                        "
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col  cols="12">
                    <ValidationProvider
                      name="Ward Name Bangla"
                      vid="name_bn"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        :hide-details="errors[0] ? false : true"
                        outlined
                        type="text"
                        v-model="data.name_bn"
                        :label="
                          $t(
                            'container.system_config.demo_graphic.ward.name_bn'
                          )
                        "
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>

                  <!-- <v-col lg="6" md="6" cols="12">
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
                        :label="
                          $t(
                            'container.system_config.demo_graphic.ward.upazila'
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
                        :label="
                          $t('container.system_config.demo_graphic.ward.union')
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
                  <v-col v-if="data.location_type == 3" lg="6" md="6" cols="12">
                    <ValidationProvider
                      name="city"
                      vid="city_id"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-autocomplete
                        :hide-details="errors[0] ? false : true"
                        v-model="data.city_id"
                        @change="onChangeCity($event)"
                        outlined
                        :label="
                          $t('container.system_config.demo_graphic.ward.city')
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
                        :label="
                          $t('container.system_config.demo_graphic.ward.thana')
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
                  <v-col lg="12" md="12" cols="12">
                    <ValidationProvider
                      name="Code"
                      vid="code"
                      rules="codeRules"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        :hide-details="errors[0] ? false : true"
                        outlined
                        type="text"
                        v-model="data.code"
                        :label="
                          $t('container.system_config.demo_graphic.ward.code')
                        "
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="6" md="6" cols="12">
                    <ValidationProvider
                      name="Ward Name English"
                      vid="name_en"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        outlined
                        type="text"
                        :hide-details="errors[0] ? false : true"
                        v-model="data.name_en"
                        :label="
                          $t(
                            'container.system_config.demo_graphic.ward.name_en'
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
                      name="Ward Name Bangla"
                      vid="name_bn"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        :hide-details="errors[0] ? false : true"
                        outlined
                        type="text"
                        v-model="data.name_bn"
                        :label="$t('container.list.name_bn')"
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col> -->
                </v-row>

                <v-row class="mx-0 my-0 py-2 mt-5" justify="center">
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
                    class="custom-btn-width black white--text py-2"
                  >
                    {{ $t("container.list.submit") }}
                  </v-btn>
                </v-row>
              </form>
            </ValidationObserver>
          </v-card-text>
        </v-card>
      </v-dialog>
      <!-- ward edit modal  -->

      <!-- delete modal  -->
      <v-dialog v-model="deleteDialog" width="350">
        <v-card style="justify-content: center; text-align: center">
          <v-card-title class="font-weight-bold justify-center">
            {{ $t("container.system_config.demo_graphic.ward.delete") }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <div class="subtitle-1 font-weight-medium mt-5">
              {{ $t("container.system_config.demo_graphic.ward.delete_alert") }}
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
                @click="deleteWard()"
                color="white"
                :loading="delete_loading"
                class="custom-btn-width black white--text py-2"
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
import { mapState, mapActions } from "vuex";
import {
  extend,
  ValidationProvider,
  ValidationObserver,
  Validator,
} from "vee-validate";
import { required } from "vee-validate/dist/rules";

extend("required", required);
export default {
  name: "Index",
  title: "CTM - Ward",
  data() {
    return {
      data: {
        id: null,
        name_en: null,
        name_bn: null,
        code: null,
        division_id: null,
        district_id: null,
        thana_id: null,
        union_id: null,
        city_id: null,
        city_thana_id: null,
        district_pouro_id: null,
        location_type: null,
        sub_location_type: null,
        pouro_id: null,
      },

      districts: [],
      cities: [],
      thanas: [],
      city_thanas: [],
      unions: [],
      pouros: [],
      locationType: [],
      subLocationType: [
        {
          id: 1,
          value_en: "Pouroshava",
        },
        // {
        //   id: 2,
        //   value_en: "Thana",
        // },
        {
          id: 2,
          value_en: "Union",
        },
      ],
      dialogAdd: false,
      dialogEdit: false,
      deleteDialog: false,
      delete_loading: false,
      loading: false,

      search: "",
      delete_id: "",
      wards: [],
      wards: [],
      pagination: {
        current: 1,
        total: 0,
        perPage: 5,
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
          text: this.$t("container.system_config.demo_graphic.ward.code"),
          value: "code",
        },
        {
          text: this.$t(
            "container.system_config.demo_graphic.division.division"
          ),
          // value: "parent.parent.parent.parent.name_en",
          value: "division",
        },
        {
          text: this.$t(
            "container.system_config.demo_graphic.district.district"
          ),
          value: "parent.parent.parent.name_en",
        },
        {
          text: this.$t("container.system_config.demo_graphic.ward.upazila_city_district"),
          value: "location_type.value_en",
         
        },

        {
          text: this.$t(
            "container.system_config.demo_graphic.ward.union_pouro_city"
          ),
          value: "parent.name_en",
        },
        // {
        //   text: this.$t("container.list.location_type"),
        //   value: "type",

        // },
        {
          text: this.$t("container.system_config.demo_graphic.ward.name_en"),
          value: "name_en",
        },
        {
          text: this.$t("container.system_config.demo_graphic.ward.name_bn"),
          value: "name_bn",
        },
        {
          text: this.$t("container.list.action"),
          value: "actions",
          align: "center",
          sortable: false,
          width: "14%",
        },
      ];
    },
    // codeRules() {
    //   return [
    //     v => (v.toString().length <= 6) || 'Ward Code can have maximum 6 digit',
    //   ];
    // },
    ...mapState({
      divisions: (state) => state.Division.divisions,
      error_status: (state) => state.Ward.error_status,
      ward_errors: (state) => state.Ward.ward_errors,
      // message: (state) => state.SystemConfiguration.success_message,
    }),
  },
  watch: {
    "$i18n.locale": "updateHeaderTitle",
  },
  created() {
    this.registerCustomRules();
  },
  methods: {
    registerCustomRules() {
      extend("codeRules", (value) => {
        return (
          value.toString().length <= 6 ||
          this.$t("container.system_config.demo_graphic.ward.code") +
            " can have maximum 6 digit"
        );
      });
    },
    async submitWard() {
      try {
        let fd = new FormData();
        console.log("------------");

        for (const [key, value] of Object.entries(this.data)) {
          if (value !== null) {
            fd.append(key, value);
            console.log(key, value);
          }
        }

        // return;
        this.$store.dispatch("Ward/StoreWard", fd).then((res) => {
          console.log(res, "res");
          if (res.data?.success) {
            this.$toast.success("Data Inserted Successfully");
            this.resetData();
            this.dialogAdd = false;
            this.GetWard();
          } else if (res.response?.data?.errors) {
            this.$refs.form.setErrors(res.response.data.errors);
            this.$toast.error(res.response.data.message);
          }
        });
      } catch (e) {
        console.log(e, "err");
      }
    },
    async updateWard() {
      try {
        let fd = new FormData();
        for (const [key, value] of Object.entries(this.data)) {
          if (value !== null) {
            fd.append(key, value);
          }
        }
        this.$store.dispatch("Ward/UpdateWard", fd).then((res) => {
          console.log(res, "upddate rest");
          if (res.data.success) {
            this.$toast.success("Data Updated Successfully");
            this.dialogEdit = false;
            this.resetData();
            this.GetWard();
          }
        });
      } catch (e) {
        console.log(e);
      }
    },
    async LocationType($event) {
        // this.data.thana_id=null;
        // this.data.union_id= null;
        // this.data.city_id= null;
        // this.data.city_thana_id=null;
        // this.data.district_pouro_id= null;        
        // this.data.sub_location_type= null;
        // this.data.pouro_id= null;
        //this.data.sub_location_type = null;

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
              this.district_poros = result.data.data;
              
            });
        }
      }
    },
     
    async onChangeSubLocationType(event) {
      // alert(event);

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
          });
        this.data.union_id = null;
      }
      if (event == 2) {
        this.onChangeUpazila(this.data.thana_id);
        this.data.pouro_id = null;
      }
    },
    async onChangeUpazila(event) {
      if (this.data.sub_location_type == 1) {
        this.onChangeSubLocationType(1);
      } else {
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

    ...mapActions({
      GetAllDivisions: "Division/GetAllDivisions",

      updateError: "Ward/updateError",
    }),
    deleteAlert(id) {
      this.deleteDialog = true;
      this.delete_id = id;
    },
    onPageChange($event) {
      // this.pagination.current = $event;
      this.GetWard();
    },
    async GetWard() {
      const queryParams = {
        searchText: this.search,
        perPage: this.pagination.perPage,
        page: this.pagination.current,
      };
      this.$axios
        .get("/admin/ward/get", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
          params: queryParams,
        })
        .then((result) => {
          this.wards = result.data.data;
          console.log(this.wards);
          this.pagination.current = result.data.meta.current_page;
          this.pagination.total = result.data.meta.last_page;
          this.pagination.grand_total = result.data.meta.total;
        });
    },

    deleteWard: async function () {
      try {
        await this.$store
          .dispatch("Ward/DestroyWard", this.delete_id)
          .then((res) => {
            // check if the request was successful
            console.log(res, "DestroyWard");
            if (res?.data?.success) {
              this.$toast.success(res.data.message);
            } else {
              this.$toast.error(res.data.message);
            }
            this.deleteDialog = false;
            this.GetWard();
            //           // check if the request was successful
            //           if (res?.data?.success) {
            //   this.$toast.error(res.data.message);
            // } else {
            //   this.$toast.success(res.data.message);
            // }
            // this.deleteDialog = false;
            // this.GetOffices();
          });
      } catch (e) {
        console.log(e);
      }
    },
    updateHeaderTitle() {
      const title = this.$t("container.system_config.demo_graphic.ward.list");
      this.$store.commit("setHeaderTitle", title);
    },
    resetData() {
      (this.data.name_en = null),
        (this.data.name_bn = null),
        (this.data.code = null),
        (this.data.division_id = null),
        (this.data.district_id = null),
        (this.data.thana_id = null),
        (this.data.union_id = null),
        (this.data.location_type = null),
        (this.city_id = null),
        (this.city_thana_id = null),
        (this.district_pouro_id = null);
    },
    editWard(item) {
      if (this.$refs.form) {
        this.$refs.form.reset();
      }
      console.log(item, "editWard");
      const update_error_value = null;
      this.updateError("update_error_value");

      this.data.id = item.id;
      this.data.name_en = item.name_en;
      this.data.name_bn = item.name_bn;
    
      this.data.code = item.code;
      if (item?.parent?.parent?.parent.type == "division") {
        this.data.division_id = item?.parent?.parent?.parent.id;
      } else if (
        item?.parent?.type == "union" ||
        item?.parent?.type == "thana" ||
        item?.parent?.type == "pouro"
      ) {
        this.data.division_id = item?.parent?.parent?.parent?.parent?.id;
      }
      this.onChangeDivision(this.data.division_id);

      if (item?.parent?.parent?.type == "district") {
        this.data.district_id = item?.parent?.parent.id;
      } else if (
        item?.parent?.type == "union" ||
        item?.parent?.type == "thana" ||
        item?.parent?.type == "pouro"
      ) {
        this.data.district_id = item?.parent?.parent?.parent?.id;
      }
      this.onChangeDistrict(this.data.district_id);

      if (item?.parent?.type == "city" && item?.parent?.location_type == 1) {
        this.data.district_pouro_id = item?.parent?.id;
        // this.LocationType(item?.parent?.location_type==1);
      }
      this.onChangeCity(this.data.city_id);


      if (item?.parent?.type == "union") {
        this.data.sub_location_type = 2;

        this.data.union_id = item?.parent?.id;
        if (item?.parent?.parent?.type == "thana") {
          this.data.thana_id = item?.parent?.parent?.id;
          this.onChangeThana(this.data.thana_id);

        }
      }
      if (item?.parent?.type == "pouro") {
        this.data.sub_location_type = 1;
        this.data.pouro_id = item?.parent?.id;
        if (item?.parent?.parent?.type == "thana") {
          this.data.thana_id = item?.parent?.parent?.id;
        }
      }
      this.onChangeSubLocationType(this.data.sub_location_type);

      if (item?.parent?.type == "thana" && item?.parent?.location_type == 3) {
        this.data.city_thana_id = item?.parent?.id;
        this.data.city_id = item?.parent?.parent?.id;
      }
      this.data.location_type = item.location_type.id;

      setTimeout(() => {
        this.dialogEdit = true;
      }, 500);
    },
  },

  mounted() {
    this.updateHeaderTitle();
    this.GetAllDivisions();
    this.GetWard();

    this.$store
      .dispatch("getLookupByType", 1)
      .then((res) => (this.locationType = res));
  },
};
</script>
  