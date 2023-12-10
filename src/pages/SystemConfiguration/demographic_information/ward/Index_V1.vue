<template>
  <div id="thana">
    <v-row class="mx-5 mt-4">
      <v-col cols="12">
        <v-row>
          <v-col cols="12">
            <!-- Expantion panels start -->
            <v-expansion-panels>
              <v-expansion-panel class="ma-2">
                <v-expansion-panel-header color="#8C9EFF">
                  <h3 class="white--text">
                    {{ $t("container.list.filter") }}
                  </h3>
                </v-expansion-panel-header>
                <v-expansion-panel-content
                  class="elevation-0 transparent mt-10"
                >
                  <ValidationObserver ref="formsearch" v-slot="{ invalid }">
                    <form @submit.prevent="GetWard()">
                      <v-row>
                        <v-col lg="4" md="4" cols="12">
                          <ValidationProvider
                            name="Location Type"
                            vid="location_type"
                            v-slot="{ errors }"
                          >
                            <v-autocomplete
                              @input="LocationTypeChange($event)"
                              v-model="location_type_search"
                              class="no-arrow-icon"
                              :append-icon-cb="appendIconCallback"
                              append-icon="mdi-plus"
                              :hide-details="errors[0] ? false : true"
                              outlined
                              :label="$t('container.list.location_type')"
                              :items="locationType"
                              item-text="value_en"
                              item-value="id"
                              :error="errors[0] ? true : false"
                              :error-messages="errors[0]"
                            ></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <v-col lg="4" md="4" cols="12">
                          <ValidationProvider
                            name="Division"
                            vid="division"
                            v-slot="{ errors }"
                          >
                            <v-autocomplete
                              :hide-details="errors[0] ? false : true"
                              @input="onChangeDivisionChange($event)"
                              v-model="division_id_search"
                              outlined
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
                            ></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <v-col lg="4" md="4" cols="12">
                          <ValidationProvider
                            name="District"
                            vid="district"
                            v-slot="{ errors }"
                          >
                            <v-autocomplete
                              :hide-details="errors[0] ? false : true"
                              outlined
                              v-model="district_id_search"
                              @input="onChangeDistrictChange($event)"
                              :label="
                                $t(
                                  'container.system_config.demo_graphic.district.district'
                                )
                              "
                              :items="districts_search"
                              item-text="name_en"
                              item-value="id"
                              :error="errors[0] ? true : false"
                              :error-messages="errors[0]"
                              class="no-arrow-icon"
                              :append-icon-cb="appendIconCallback"
                              append-icon="mdi-plus"
                            ></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <v-col
                          v-if="location_type_search == 2"
                          lg="4"
                          md="4"
                          cols="12"
                        >
                          <ValidationProvider
                            name="Upazila"
                            vid="thana_id"
                            v-slot="{ errors }"
                          >
                            <v-autocomplete
                              :hide-details="errors[0] ? false : true"
                              v-model="upazila_id_search"
                              outlined
                              :label="
                                $t(
                                  'container.system_config.demo_graphic.ward.upazila'
                                )
                              "
                              @change="onChangeUpazilaChange($event)"
                              :items="thanas_search"
                              item-text="name_en"
                              item-value="id"
                              :error="errors[0] ? true : false"
                              :error-messages="errors[0]"
                              class="no-arrow-icon"
                              :append-icon-cb="appendIconCallback"
                              append-icon="mdi-plus"
                            ></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <v-col
                          v-if="location_type_search == 2"
                          lg="4"
                          md="4"
                          cols="12"
                        >
                          <ValidationProvider
                            name="subLocationType"
                            vid="subLocationType"
                            v-slot="{ errors }"
                          >
                            <v-autocomplete
                              @input="onChangeSubLocationTypeChange($event)"
                              v-model="sub_location_type_search"
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
                            location_type_search == 2 &&
                            sub_location_type_search == 1
                          "
                          lg="4"
                          md="4"
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
                              :items="pouros_search"
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
                            sub_location_type_search == 2 &&
                            location_type_search == 2
                          "
                          lg="4"
                          md="4"
                          cols="12"
                        >
                          <ValidationProvider
                            name="unions"
                            vid="unions"
                            v-slot="{ errors }"
                          >
                            <v-autocomplete
                              @input="onChangeUnionGetWardChange($event)"
                              v-model="union_id_search"
                              outlined
                              :label="
                                $t(
                                  'container.system_config.demo_graphic.ward.union'
                                )
                              "
                              :items="unions_search"
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
                          v-if="location_type_search == 3"
                          lg="4"
                          md="4"
                          cols="12"
                        >
                          <ValidationProvider
                            name="city"
                            vid="city_id"
                            v-slot="{ errors }"
                          >
                            <v-autocomplete
                              :hide-details="errors[0] ? false : true"
                              v-model="city_id_search"
                              @change="onChangeCityChange($event)"
                              outlined
                              :label="
                                $t(
                                  'container.system_config.demo_graphic.ward.city'
                                )
                              "
                              :items="cities_search"
                              item-text="name_en"
                              item-value="id"
                              :error="errors[0] ? true : false"
                              :error-messages="errors[0]"
                              class="no-arrow-icon"
                              :append-icon-cb="appendIconCallback"
                              append-icon="mdi-plus"
                            ></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <v-col
                          v-if="location_type_search == 3"
                          lg="4"
                          md="4"
                          cols="12"
                        >
                          <ValidationProvider
                            name="thana"
                            vid="city_thana_id"
                            v-slot="{ errors }"
                          >
                            <v-autocomplete
                              @input="onChangeThanaGetWardSearch($event)"
                              :hide-details="errors[0] ? false : true"
                              v-model="city_thana_id_search"
                              outlined
                              :label="
                                $t(
                                  'container.system_config.demo_graphic.ward.thana'
                                )
                              "
                              :items="city_thanas_search"
                              item-text="name_en"
                              item-value="id"
                              :error="errors[0] ? true : false"
                              :error-messages="errors[0]"
                              class="no-arrow-icon"
                              :append-icon-cb="appendIconCallback"
                              append-icon="mdi-plus"
                            ></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <v-col
                          v-if="location_type_search == 1"
                          lg="4"
                          md="4"
                          cols="12"
                        >
                          <ValidationProvider
                            name="thana"
                            vid="district_pouro_id"
                            v-slot="{ errors }"
                          >
                            <v-autocomplete
                              @input="
                                onChangeDistrictPouroGetWardSearch($event)
                              "
                              :hide-details="errors[0] ? false : true"
                              v-model="district_pouro_id_search"
                              outlined
                              :label="
                                $t(
                                  'container.system_config.demo_graphic.ward.pouro'
                                )
                              "
                              :items="district_poros_search"
                              item-text="name_en"
                              item-value="id"
                              :error="errors[0] ? true : false"
                              :error-messages="errors[0]"
                              class="no-arrow-icon"
                              :append-icon-cb="appendIconCallback"
                              append-icon="mdi-plus"
                            ></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <!--                         
                        <v-col
                          v-if="data.location_type"
                          lg="4"
                          md="4"
                          cols="12"
                        >
                          <ValidationProvider
                            name="Ward"
                            vid="ward_id"
                            v-slot="{ errors }"
                          >
                            <v-autocomplete
                              :hide-details="errors[0] ? false : true"
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
                              :error="errors[0] ? true : false"
                              :error-messages="errors[0]"
                              class="no-arrow-icon"
                              :append-icon-cb="appendIconCallback"
                              append-icon="mdi-plus"
                            ></v-autocomplete>
                          </ValidationProvider>
                        </v-col> -->
                      </v-row>

                      <div class="d-inline d-flex justify-end mt-10">
                        <v-btn elevation="2" class="btn" @click="resetSearch">{{
                          $t("container.list.reset")
                        }}</v-btn>
                        <v-btn
                          elevation="2"
                          type="submit"
                          class="btn ml-2"
                          color="success"
                          >{{ $t("container.list.filter") }}</v-btn
                        >
                      </div>
                    </form>
                  </ValidationObserver>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>

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
                      @update:options="handleOptionsUpdate"
                      hide-default-footer
                      class="elevation-0 transparent row-pointer"
                    >
                      <!-- <template v-slot:item.id="{ item, index }">
                                              {{ (pagination.current - 1) * pagination.perPage + index + 1 }}
                                              v-if="item?.parent?.parent?.parent.type == 'division'"
                                            </template> -->
                      <template
                        v-slot:item.parent.parent.parent.parent.name_en="{
                          item,
                        }"
                      >
                        <span v-if="item?.location_type.id == '1'">
                          {{ item?.parent?.parent?.parent.name_en }}
                        </span>

                        <span
                          v-if="
                            item?.location_type.id == '2' ||
                            item?.location_type.id == '3'
                          "
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
            {{ $t("container.system_config.demo_graphic.ward.add_new") }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="mt-7">
            <v-row> </v-row>

            <ValidationObserver ref="formAdd" v-slot="{ invalid }">
              <form @submit.prevent="submitWard()">
                <v-row>
                  <v-col cols="12">
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
                  <v-col cols="12">
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
                  <v-col v-if="data.location_type == 2" cols="12">
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
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>

                  <v-col
                    v-if="
                      data.location_type == 2 && data.sub_location_type == 1
                    "
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
                          $t('container.system_config.demo_graphic.ward.pouro')
                        "
                        :items="pouros"
                        item-text="name_en"
                        item-value="id"
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                        :hide-details="errors[0] ? false : true"
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>

                  <v-col
                    v-if="
                      data.sub_location_type == 2 && data.location_type == 2
                    "
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
                          $t('container.system_config.demo_graphic.ward.union')
                        "
                        :items="unions"
                        item-text="name_en"
                        item-value="id"
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                        :hide-details="errors[0] ? false : true"
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>

                  
                  <v-col v-if="data.location_type == 3" cols="12">
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
                  <v-col v-if="data.location_type == 3" cols="12">
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
                  <!-- <v-col lg="12" md="12" cols="12">
                    <ValidationProvider name="Code" vid="code" rules="codeRules||required" v-slot="{ errors }">
                      <v-text-field :hide-details="errors[0] ? false : true" outlined type="text" v-model="data.code" 
                        :label="$t('container.system_config.demo_graphic.ward.code')
                          "  :error="errors[0] ? true : false" :error-messages="errors[0]"></v-text-field>
                    </ValidationProvider>
                  </v-col> -->
                  <v-col cols="12">
                    <v-row>
                      <v-col cols="12" md="4" lg="4">
                        <ValidationProvider
                          name="Code"
                          vid="code"
                          v-slot="{ errors }"
                        >
                          <v-text-field
                            :hide-details="errors[0] ? false : true"
                            outlined
                            type="text"
                            v-model="data.ward"
                            readonly
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
                      <v-col cols="12" md="2" lg="2">
                        <ValidationProvider name="Code" vid="code" rules="twoDigitNumberGreaterThanZero" v-slot="{ errors }">
                          <v-text-field :hide-details="errors[0] ? false : true" outlined v-model="data.code" required 
                            @keyup="onKeyUp(data.code)"  :label="$t('container.list.code')
                              " :error="errors[0] ? true : false" :error-messages="errors[0]"></v-text-field>
                        </ValidationProvider>
                      </v-col>
                      <v-col cols="12" md="6" lg="6">
                        <ValidationProvider name="Suffix" vid="name_en" v-slot="{ errors }">
                          <v-text-field outlined type="text" :hide-details="errors[0] ? false : true"
                            v-model="data.suffix" :label="$t(
                              'container.system_config.demo_graphic.ward.suffix'
                            )" :disabled="isWardInputReadOnly" ></v-text-field>
                        </ValidationProvider>
                      </v-col>
                    </v-row>
                  </v-col>
                  <!-- //Bangla field start -->
                  <v-col cols="12">
                    <v-row>
                      <v-col cols="12" md="4" lg="4">
                        <ValidationProvider
                          name="Code"
                          vid="code"
                          v-slot="{ errors }"
                        >
                          <v-text-field
                            :hide-details="errors[0] ? false : true"
                            outlined
                            type="text"
                            v-model="data.ward_b"
                            readonly
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
                      <v-col cols="12" md="2" lg="2">
                        <ValidationProvider name="Code" vid="code"  v-slot="{ errors }">
                          <v-text-field :hide-details="errors[0] ? false : true" outlined v-model="data.code_b" readonly
                            required :label="$t('container.list.code')
                              "  :error="errors[0] ? true : false"
                            :error-messages="errors[0]"></v-text-field>
                        </ValidationProvider>
                      </v-col>
                      <v-col cols="12" md="6" lg="6">
                        <ValidationProvider name="Suffix" vid="name_en" v-slot="{ errors }">
                          <v-text-field outlined type="text" :hide-details="errors[0] ? false : true"
                            v-model="data.suffix_b" :label="$t(
                              'container.system_config.demo_graphic.ward.suffix_b'
                            )" :disabled="isWardInputReadOnly" ></v-text-field>
                        </ValidationProvider>
                      </v-col>
                    </v-row>
                  </v-col>
                  <!-- <v-col cols="12">
                    <ValidationProvider name="Ward Name Bangla" vid="name_bn" rules="required" v-slot="{ errors }">
                      <v-text-field :hide-details="errors[0] ? false : true" outlined type="text" v-model="data.name_bn"
                        :label="$t(
                          'container.system_config.demo_graphic.ward.name_bn'
                        )
                          " required :error="errors[0] ? true : false" :error-messages="errors[0]"></v-text-field>
                    </ValidationProvider>
                  </v-col> -->
                </v-row>

                <v-row class="mx-0 my-0 py- mt-5" justify="center">
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
            {{ $t("container.system_config.demo_graphic.ward.edit")
            }}{{ errors }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="mt-7">
            <v-row> </v-row>

            <ValidationObserver ref="formEdit" v-slot="{ invalid }">
              <form @submit.prevent="updateWard()">
                <v-row>
                  <v-col cols="12">
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
                  <v-col cols="12">
                    <ValidationProvider
                      name="District"
                      vid="district"
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
                  <v-col v-if="data.location_type == 2" cols="12">
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
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>

                  <v-col v-if="data.sub_location_type == 1" cols="12">
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
                          $t('container.system_config.demo_graphic.ward.pouro')
                        "
                        :items="pouros"
                        item-text="name_en"
                        item-value="id"
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                        :hide-details="errors[0] ? false : true"
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>

                  <v-col v-if="data.sub_location_type == 2" cols="12">
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
                          $t('container.system_config.demo_graphic.ward.union')
                        "
                        :items="unions"
                        item-text="name_en"
                        item-value="id"
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                        :hide-details="errors[0] ? false : true"
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>

                  <v-col v-if="data.location_type == 3" cols="12">
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
                  <v-col v-if="data.location_type == 3" cols="12">
                    <ValidationProvider
                      name="thana"
                      vid="city_thana_id"
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
                  <!-- <v-col lg="12" md="12" cols="12">
                    <ValidationProvider name="Code" vid="code" rules="codeRules" v-slot="{ errors }">
                      <v-text-field outlined type="number" :hide-details="errors[0] ? false : true" v-model="data.code"
                        :label="$t('container.system_config.demo_graphic.ward.code')
                          " required :error="errors[0] ? true : false" :error-messages="errors[0]"></v-text-field>
                    </ValidationProvider>
                    <div v-if="errors && errors.code" v-html="errors.code" class="red--text" />
                  </v-col>
                  <v-col cols="12">
                    <ValidationProvider name="Ward Name English" vid="name_en" rules="required" v-slot="{ errors }">
                      <v-text-field :hide-details="errors[0] ? false : true" outlined type="text" v-model="data.name_en"
                        :label="$t(
                          'container.system_config.demo_graphic.ward.name_en'
                        )
                          " required :error="errors[0] ? true : false" :error-messages="errors[0]"></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col cols="12">
                    <ValidationProvider name="Ward Name Bangla" vid="name_bn" rules="required" v-slot="{ errors }">
                      <v-text-field :hide-details="errors[0] ? false : true" outlined type="text" v-model="data.name_bn"
                        :label="$t(
                          'container.system_config.demo_graphic.ward.name_bn'
                        )
                          " required :error="errors[0] ? true : false" :error-messages="errors[0]"></v-text-field>
                    </ValidationProvider>
                  </v-col> -->
                  <v-col cols="12">
                    <v-row>
                      <v-col cols="12" md="4" lg="4">
                        <ValidationProvider
                          name="Code"
                          vid="code"
                          v-slot="{ errors }"
                        >
                          <v-text-field
                            :hide-details="errors[0] ? false : true"
                            outlined
                            type="text"
                            v-model="data.ward"
                            readonly
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
                      <v-col cols="12" md="2" lg="2">
                        <ValidationProvider name="Code" vid="code" rules="twoDigitNumberGreaterThanZero||required" v-slot="{ errors }">
                          <v-text-field :hide-details="errors[0] ? false : true" outlined v-model="data.code" required
                            @keyup="onKeyUp(data.code)"  :label="$t('container.list.code')
                              " :error="errors[0] ? true : false" :error-messages="errors[0]"></v-text-field>
                        </ValidationProvider>
                      </v-col>
                      <v-col cols="12" md="6" lg="6">
                        <ValidationProvider name="Suffix" vid="name_en" v-slot="{ errors }">
                          <v-text-field outlined type="text" :hide-details="errors[0] ? false : true"
                            v-model="data.suffix" :label="$t(
                              'container.system_config.demo_graphic.ward.suffix'
                            )" :disabled="isWardInputReadOnly" ></v-text-field>
                        </ValidationProvider>
                      </v-col>
                    </v-row>
                  </v-col>
                  <!-- //Bangla field start -->
                  <v-col cols="12">
                    <v-row>
                      <v-col cols="12" md="4" lg="4">
                        <ValidationProvider
                          name="Code"
                          vid="code"
                          v-slot="{ errors }"
                        >
                          <v-text-field
                            :hide-details="errors[0] ? false : true"
                            outlined
                            type="text"
                            v-model="data.ward_b"
                            readonly
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
                      <v-col cols="12" md="2" lg="2">
                        <ValidationProvider name="Code" vid="code" v-slot="{ errors }">
                          <v-text-field :hide-details="errors[0] ? false : true" outlined v-model="data.code_b" readonly
                            required :label="$t('container.list.code')
                              " :error="errors[0] ? true : false" :error-messages="errors[0]"></v-text-field>
                        </ValidationProvider>
                      </v-col>
                      <v-col cols="12" md="6" lg="6">
                        <ValidationProvider name="Suffix" vid="name_en" v-slot="{ errors }">
                          <v-text-field outlined type="text" :hide-details="errors[0] ? false : true"
                            v-model="data.suffix_b" :label="$t(
                              'container.system_config.demo_graphic.ward.suffix_b'
                            )" :disabled="isWardInputReadOnly" > </v-text-field>
                        </ValidationProvider>
                      </v-col>
                    </v-row>
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
        code_b: null,
        ward: 'Ward No',
        ward_b: 'ওয়ার্ড নং',
        suffix: '',
        suffix_b: '',
        division_id: null,
        district_id: null,
        thana_id: null,
        union_id: null,
        city_id: null,
        city_thana_id: null,
        district_pouro_id: null,
        pouro_id: null,
        location_type: null,
        sub_location_type: null,
      },

      districts: [],
      cities: [],
      thanas: [],
      city_thanas: [],
      unions: [],
      pouros: [],
      locationType: [],
      //search
      districts_search: [],
      cities_search: [],
      thanas_search: [],
      city_thanas_search: [],
      unions_search: [],
      pouros_search: [],
      district_poros_search: [],
      division_id_search: null,
      district_id_search: null,
      thana_id_search: null,
      upazila_id_search: null,
      union_id_search: null,
      city_id_search: null,
      city_thana_id_search: null,
      district_pouro_id_search: null,
      pouro_id_search: null,
      location_type_search: null,
      sub_location_type_search: null,
      //search end
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
    isWardInputReadOnly() {
      // Make the "Ward" input read-only if data.location_type is not equal to 3
      return [1, 2, null].includes(this.data.location_type);
    },
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
          value: "parent.parent.parent.parent.name_en",
        },
        {
          text: this.$t(
            "container.system_config.demo_graphic.district.district"
          ),
          value: "parent.parent.parent.name_en",
        },
        {
          text: this.$t(
            "container.system_config.demo_graphic.ward.upazila_city_district"
          ),
          value: this.getValue("location_type.value_en"),
          sortable: false,
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
          class: "highlight-column",
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
      // error_status: (state) => state.Ward.error_status,
      // errors: (state) => state.Ward.ward_errors,
      // message: (state) => state.SystemConfiguration.success_message,
    }),
  },
  watch: {
    "$i18n.locale": "updateHeaderTitle",
  },
  created() {
    this.registerCustomRules();
    this.customCode();
  },
  methods: {
    getValue(location_type) {
      if (location_type == "Upazila") {
        return "parent.parent.name_en";
      } 
      else {
        return "location_type.value_en";
      }
    },
    registerCustomRules() {
      extend("codeRules", (value) => {
        return (
          value.toString().length <= 2 ||
          this.$t("container.system_config.demo_graphic.ward.code") +
            " can have maximum 2 digit"
        );
      });
    },
    customCode() {

      
  
      //  extend("twoDigitNumberGreaterThanZero", (value) => {
      //   const numericValue = Number(value);

      //   return (
      //     !isNaN(numericValue) &&
      //     numericValue > 0 &&
      //     value.toString().length === 2
      //   ) || this.$t("container.system_config.demo_graphic.ward.code") +
      //     " must be a 2 digit numeric value and greater than 0";
      // });
      extend("twoDigitNumberGreaterThanZero", {
        validate: (value) => {
          const numericValue = Number(value);

          return (
            !isNaN(numericValue) &&
            numericValue > 0 &&
            value.toString().length === 2
          ) || "Ward code must be a 2 digit numeric value and greater than 0";
        },
      });
    
      
    },
    resetSearch() {
      this.districts_search = [];
      this.cities_search = [];
      this.thanas_search = [];
      this.city_thanas_search = [];
      this.unions_search = [];
      this.pouros_search = [];
      this.district_poros_search = [];
      this.division_id_search = null;
      this.district_id_search = null;
      this.thana_id_search = null;
      this.union_id_search = null;
      this.city_id_search = null;
      this.city_thana_id_search = null;
      this.district_pouro_id_search = null;
      this.pouro_id_search = null;
      this.location_type_search = null;
      this.sub_location_type_search = null;
      this.GetWard();
    },
    onKeyUp(data) {
      if (data && data.length === 2 && /^\d+$/.test(data)) {
        const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
        this.data.code_b = banglaDigits[data[0]] + banglaDigits[data[1]];

        console.log(this.data.code_b, "code accepted");
      } else {
        this.data.code_b = "";
        console.log(this.data.code_b, "code invalid");
      }
    },
    async submitWard() {
      this.data.name_en = this.data.ward + ' ' + ' ' + this.data.code + ' ' + this.data.suffix;
      this.data.name_bn = this.data.ward_b + ' ' + ' ' + this.data.code_b + ' ' + this.data.suffix_b;


      try {
        let fd = new FormData();
        console.log("------------");

        for (const [key, value] of Object.entries(this.data)) {
          if (value !== null) {
            fd.append(key, value);
            console.log(key, value);
          }
        }
// console.log(this.data);
        // return;
        this.$store.dispatch("Ward/StoreWard", fd).then((res) => {
          console.log(res, "res");
          if (res.data?.success) {
            this.$toast.success("Data Inserted Successfully");
            this.resetData();
            this.dialogAdd = false;
            this.GetWard();
          } else if (res.response?.data?.errors) {
            this.$refs.formAdd.setErrors(res.response.data.errors);
            this.$toast.error(res.response.data.message);
          }
        });
      } catch (e) {
        console.log(e, "err");
      }
    },
    async updateWard() {
      this.data.name_en =
        this.data.ward + " " + this.data.code + " " + this.data.suffix;
      this.data.name_bn =
        this.data.ward_b + " " + this.data.code_b + " " + this.data.suffix_b;
      try {
        let fd = new FormData();
        for (const [key, value] of Object.entries(this.data)) {
          if (value !== null) {
            fd.append(key, value);
          }
        }
        console.log(this.data,"update data")
        this.$store.dispatch("Ward/UpdateWard", fd).then((res) => {
          console.log(res, "update rest");
          if (res?.data?.success) {
            this.$toast.success("Data Updated Successfully");
            this.dialogEdit = false;
            this.resetData();
            this.GetWard();
          } else if (res.response?.data?.errors) {
            this.$refs.formEdit.setErrors(res.response.data.errors);
            // this.$toast.error(res.response.data.message);
          }
        });
      } catch (e) {
        console.log(e);
      }
    },
    async LocationType($event) {
      if ($event === 1 || $event === 3) {
        this.data.sub_location_type = null;
      }

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
              this.cities = [];
              this.district_poros = [];
              this.data.city_id = null;
              this.data.city_thana_id = null;
              this.data.district_pouro_id = null;
              this.data.suffix = "";
              this.data.suffix_b = "";
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
              this.thanas = [];
              this.district_poros = [];
              this.data.thana_id = null;
              this.data.union_id = null;
              this.data.district_pouro_id = null;
              this.data.pouro_id = null;
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
              this.cities = [];
              this.thanas = [];
              this.data.thana_id = null;
              this.data.union_id = null;
              this.data.city_id = null;
              this.data.city_thana_id = null;
              this.data.pouro_id = null;
              this.data.suffix='';
              this.data.suffix_b = '';
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
      if (this.$refs.formAdd) {
        this.$refs.formAdd.reset();
      }

      (this.data.id = ""),
        (this.data.name_en = ""),
        (this.data.name_bn = ""),
        (this.data.code = ""),
        (this.data.suffix = ""),
        (this.data.code_b = ""),
        (this.data.suffix_b = ""),
        (this.data.division_id = ""),
        (this.data.district_id = ""),
        (this.data.thana_id = ""),
        (this.data.union_id = ""),
        (this.data.city_id = ""),
        (this.data.city_thana_id = ""),
        (this.data.district_pouro_id = ""),
        (this.data.location_type = ""),
        (this.data.sub_location_type = "");
      (this.data.pouro_id = ""), (this.data.sub_location_type = "");
      const update_error_value = "";
      this.updateError("update_error_value");
      this.resetData();
      this.dialogAdd = true;
      this.districts = [];
      this.thanas = [];
      this.city_thanas = [];
      this.unions = [];
      this.pouros = [];
      this.cities = [];
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
    setInitialHeader() {
      for (let i = 0; i < this.headers.length; i++) {
        if (this.headers[i].value == "name_en") {
          this.headers[i].class = "highlight-column";
          console.log(this.headers[i], "headers after");
        } else {
          this.headers[i].class = "";
        }
      }
    },
    handleOptionsUpdate({ sortBy, sortDesc }) {
      console.log(this.headers, sortBy, sortDesc);
      for (let i = 0; i < this.headers.length; i++) {
        console.log(this.headers[i]);

        if (this.headers[i].value == sortBy) {
          this.headers[i].class = "highlight-column";
          console.log(this.headers[i], "headers after");
        } else {
          this.headers[i].class = "";
        }
      }

      this.sortBy = "name_en";
      this.sortDesc = "asc";
      if (sortBy.length === 0 || sortDesc.length === 0) {
        this.sortBy = "name_en";
        this.sortDesc = "asc";
      } else {
        this.sortBy = sortBy[0];
        this.sortDesc = sortDesc[0] == true ? "desc" : "asc";
      }
      this.GetWard();

      const queryParams = {
        sortBy: this.sortBy,
        orderBy: this.sortDesc,
      };

      // alert(JSON.stringify(queryParams));
    },
    async GetWard() {
      const queryParams = {
        searchText: this.search,
        location_type: this.location_type_search,
        division_id: this.division_id_search,
        district_id: this.district_id_search,

        ////////////City Corporation////////////////
        city_id_search: this.city_id_search,
        city_thana_id_search: this.city_thana_id_search,
        ////////////City Corporation////////////////

        ////////////Upazila Corporation////////////////
        upazila_id_search: this.upazila_id_search,
        union_id_search: this.union_id_search,
        ////////////Upazila Corporation////////////////

        ////////////Upazila Corporation////////////////
        district_pouro_id_search: this.district_pouro_id_search,
        ////////////Upazila Corporation////////////////

        perPage: this.pagination.perPage,
        page: this.pagination.current,
        sortBy: this.sortBy,
        orderBy: this.sortDesc,
      };

      if (this.division_id != null) {
        delete queryParams.upazila_id_search;
        delete queryParams.union_id_search;
        delete queryParams.city_id_search;
        delete queryParams.city_thana_id_search;
        delete queryParams.district_id;
        delete queryParams.district_pouro_id_search;

        queryParams.division_id = this.division_id_search;
      }
      if (this.district_id_search != null) {
        delete queryParams.upazila_id_search;
        delete queryParams.union_id_search;
        delete queryParams.city_id_search;
        delete queryParams.city_thana_id_search;
        delete queryParams.division_id;
        delete queryParams.district_pouro_id_search;

        queryParams.district_id = this.district_id_search;
      }
      if (this.district_pouro_id_search != null) {
        delete queryParams.upazila_id_search;
        delete queryParams.union_id_search;
        delete queryParams.city_id_search;
        delete queryParams.city_thana_id_search;
        delete queryParams.district_id;
        delete queryParams.division_id;
        queryParams.district_pouro_id_search = this.district_pouro_id_search;
      }
      if (this.city_id_search != null) {
        delete queryParams.district_pouro_id_search;
        delete queryParams.upazila_id_search;
        delete queryParams.union_id_search;
        delete queryParams.district_id;
        delete queryParams.division_id;
        delete queryParams.city_thana_id_search;
        queryParams.city_id_search = this.city_id_search;
      }
      if (this.city_thana_id_search != null) {
        delete queryParams.district_pouro_id_search;
        delete queryParams.upazila_id_search;
        delete queryParams.union_id_search;
        delete queryParams.district_id;
        delete queryParams.division_id;
        delete queryParams.city_id_search;
        queryParams.city_thana_id_search = this.city_thana_id_search;
      }
      if (this.upazila_id_search != null) {
        delete queryParams.district_pouro_id_search;
        delete queryParams.city_id_search;
        delete queryParams.city_thana_id_search;
        delete queryParams.district_id;
        delete queryParams.division_id;
        queryParams.upazila_id_search = this.upazila_id_search;
        queryParams.union_id_search = this.union_id_search;
      }
      if (this.union_id_search != null) {
        delete queryParams.district_pouro_id_search;
        delete queryParams.city_id_search;
        delete queryParams.city_thana_id_search;
        delete queryParams.district_id;
        delete queryParams.division_id;
        delete queryParams.upazila_id_search;
        queryParams.union_id_search = this.union_id_search;
      }

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
          this.pagination.current = result.data.current_page;
          this.pagination.total = result.data.last_page;
          this.pagination.grand_total = result.data.total;
          console.log(queryParams, "queryParams");
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
      if (this.$refs.formEdit) {
        this.$refs.formEdit.reset();
      }
      console.log(item, "editWard");
      const update_error_value = null;
      this.updateError("update_error_value");

      this.data.id = item.id;
      this.data.name_en = item.name_en;
      this.data.name_bn = item.name_bn;
      this.data.code = item.code;
      const inputString = item.name_en;
      // Extracting components
      const parts = inputString.split(' ');
      const wardNo = parts[0] + ' ' + parts[1] + ' ' + parts[2]; // "Ward No -"
      const twoDigitNumber = parts[3]; // "01"
      const restOfString = parts.slice(4).join(' '); // "suffix"

     
      this.data.ward = wardNo;
      this.data.code = twoDigitNumber;
      this.data.suffix = restOfString;

      const inputString_b = item.name_bn;
      // Extracting components
      const parts_b = inputString_b.split(' ');
      const wardNo_b = parts_b[0] + ' ' + parts_b[1] + ' ' + parts_b[2]; // "Ward No -"
      const twoDigitNumber_b = parts_b[3]; // "01"
      const restOfString_b = parts_b.slice(4).join(' '); // "suffix"

   
      this.data.ward_b = wardNo_b;
      this.data.code_b = twoDigitNumber_b;
      this.data.suffix_b = restOfString_b;

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
      this.LocationType(this.data.location_type);

      setTimeout(() => {
        this.dialogEdit = true;
      }, 500);
    },
    //search New
    async LocationTypeChange($event) {
      if ($event === 1 || $event === 3) {
        this.sub_location_type_search = null;
      }

      if (
        this.district_id_search != null &&
        this.location_type_search != null
      ) {
        if ($event === 2) {
          await this.$axios
            .get(`/admin/thana/get/${this.district_id_search}`, {
              headers: {
                Authorization: "Bearer " + this.$store.state.token,
                "Content-Type": "multipart/form-data",
              },
            })
            .then((result) => {
              this.thanas_search = result.data.data;
              this.cities_search = [];
              this.district_poros_search = [];
              this.city_id_search = null;
              this.city_thana_id_search = null;
              this.district_pouro_id_search = null;
            });
        }
        if ($event === 3) {
          await this.$axios
            .get("/admin/city/get/" + this.district_id_search + "/" + $event, {
              headers: {
                Authorization: "Bearer " + this.$store.state.token,
                "Content-Type": "multipart/form-data",
              },
            })
            .then((result) => {
              this.cities_search = result.data.data;
              this.thanas_search = [];
              this.district_poros_search = [];
              this.data.thana_id_search = null;
              this.data.union_id_search = null;
              this.data.district_pouro_id_search = null;
              this.data.pouro_id_search = null;
            });
        }

        if ($event === 1) {
          await this.$axios
            .get("/admin/city/get/" + this.district_id_search + "/" + $event, {
              headers: {
                Authorization: "Bearer " + this.$store.state.token,
                "Content-Type": "multipart/form-data",
              },
            })
            .then((result) => {
              this.district_poros_search = result.data.data;
              this.cities_search = [];
              this.thanas_search = [];
              this.thana_id_search = null;
              this.union_id_search = null;
              this.city_id_search = null;
              this.city_thana_id_search = null;
              this.pouro_id_search = null;
            });
        }
      }
    },
    async onChangeDivisionChange(event) {
      await this.$axios
        .get(`/admin/district/get/${event}`, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          this.districts_search = result.data.data;
        });
    },
    // //done till now
    async onChangeSubLocationTypeChange(event) {
      alert(event);

      if (event == 1) {
        await this.$axios
          .get(`/admin/union/pouro/get/${this.upazila_id_search}`, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((result) => {
            this.pouros_search = result.data.data;
          });
        this.union_id_search = null;
      }
      if (event == 2) {
        this.onChangeUpazilaChange(this.upazila_id_search);
        this.pouro_id_search = null;
      }
    },
    async onChangeUpazilaChange(event) {
      if (this.sub_location_type_search == 1) {
        // this.onChangeSubLocationTypeChange(1);

        await this.$axios
          .get(`/admin/union/pouro/get/${this.upazila_id_search}`, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((result) => {
            this.pouros_search = result.data.data;
          });
        this.union_id_search = null;
      } else {
        await this.$axios
          .get(`/admin/union/get/${this.upazila_id_search}`, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((result) => {
            this.unions_search = result.data.data;
          });
      }
    },

    // },
    async onChangeDistrictChange(event) {
      await this.$axios
        .get(`/admin/thana/get/${event}`, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          this.LocationTypeChange(this.location_type_search);
          this.thanas_search = result.data.data;
        });
    },
    async onChangeThanaChange(event) {
      await this.$axios
        .get(`/admin/union/get/${event}`, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          this.unions_search = result.data.data;
        });
    },
    async onChangeCityChange(event) {
      await this.$axios
        .get(`/admin/thana/get/city/${this.city_id_search}`, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          this.city_thanas_search = result.data.data;
        });
    },
  },

  mounted() {
    this.updateHeaderTitle();
    this.GetAllDivisions();
    this.setInitialHeader();
    // this.GetWard();
    this.$store
      .dispatch("getLookupByType", 1)
      .then((res) => (this.locationType = res));
  },
};
</script>
<style>
.highlight-column {
  background-color: #e0eaf1;
}
</style>
  
