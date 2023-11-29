<template>
  <div id="thana">
    <v-row class="mx-5 mt-4">
      <v-col cols="12">
        <v-row>
         <v-col cols="12">
                   <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-header  color=#8C9EFF>
                    <h3 class="white--text ">
                        {{ $t('container.list.search') }}
                    </h3>
            
              </v-expansion-panel-header>
              <v-expansion-panel-content class="mt-5">

   
                 <ValidationObserver ref="formsearch" v-slot="{ invalid }">
                                                <form @submit.prevent="GetUnion()">
                                                    <v-row>
                                                        <v-col lg="4" md="4" cols="12">

                                                                <v-autocomplete
         :append-icon-cb="appendIconCallback" append-icon="mdi-plus" 
         class="no-arrow-icon"                                                              outlined  
                                                                    
                                                                       @input="onChangeLocationSearch()"
                                                                  v-model="location_type_search"
                                                                    :items="locationTypes" item-text="value_en" item-value="id"
                                                                    :label="$t('container.list.location_type')">
                                                                </v-autocomplete>
                                                            </v-col>
                                                      
                                                         <v-col lg="4" md="4" cols="12">
                                                            <ValidationProvider
                        name="Division"
                        vid="division"
                
                        v-slot="{ errors }"
                      >
                  
                        <v-autocomplete
                          @input="onChangeDivisionSearch($event)"
                          :append-icon-cb="appendIconCallback" append-icon="mdi-plus" 
                          class="no-arrow-icon" 
                          v-model="division_id_search"
                          outlined
                          :label="$t(
                            'container.system_config.demo_graphic.division.division'
                          )
                            "
                          :items="divisions"
                          item-text="name_en"
                          item-value="id"
                     
                          :error="errors[0] ? true : false"
                          :error-messages="errors[0]"
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
                  @input="onChangeDistrictSearch($event)" 
                    :append-icon-cb="appendIconCallback" append-icon="mdi-plus" 
                    class="no-arrow-icon" 
                          v-model="district_id_search"
                          outlined
                          :label="$t(
                            'container.system_config.demo_graphic.district.district'
                          )
                            "
                          :items="districts_search"
                          item-text="name_en"
                          item-value="id"
                     
                          :error="errors[0] ? true : false"
                          :error-messages="errors[0]"
                          :readonly="false"
                        ></v-autocomplete>
                      </ValidationProvider>
                       </v-col>
                       
                        <v-col md="4" lg="4" cols="12"   v-if="location_type_search == 1">
                      <ValidationProvider
                        name="city"
                        vid="city_id"
                     
                        v-slot="{ errors }"
                      >
                        <v-autocomplete
                        v-if="location_type_search == 1"
                          :hide-details="errors[0] ? false : true"
                          v-model="district_pouro_id_search"
                         :append-icon-cb="appendIconCallback" append-icon="mdi-plus" 
                         class="no-arrow-icon" 
                          outlined
                          :label="$t('container.system_config.demo_graphic.office.pouro')
                            "
                          :items="district_pouros_search"
                          item-text="name_en"
                          item-value="id"
                      
                          :error="errors[0] ? true : false"
                          :error-messages="errors[0]"
                        ></v-autocomplete>
                      </ValidationProvider>
                    </v-col>
                     <v-col md="4" lg="4" cols="12"   v-if="location_type_search == 3">
                      <ValidationProvider
                        name="city"
                        vid="city_id"
                     
                        v-slot="{ errors }"
                      >
                        <v-autocomplete
                          :append-icon-cb="appendIconCallback" append-icon="mdi-plus" 
                          class="no-arrow-icon" 
                          :hide-details="errors[0] ? false : true"
                          v-model="city_id_search"
                      
                          outlined
                          :label="$t('container.system_config.demo_graphic.ward.city')
                            "
                          :items="cities_search"
                          item-text="name_en"
                          item-value="id"
                      
                          :error="errors[0] ? true : false"
                          :error-messages="errors[0]"
                        ></v-autocomplete>
                      </ValidationProvider>
                    </v-col>
                     <v-col md="4" lg="4" cols="12" v-if="location_type_search == 2">
                        <ValidationProvider
                          name="city"
                          vid="city_id"
                     
                          v-slot="{ errors }"
                        >
                          <v-autocomplete
                            :append-icon-cb="appendIconCallback" append-icon="mdi-plus" 
                            class="no-arrow-icon" 
                            :hide-details="errors[0] ? false : true"
                            v-model="data.city_id"
                      
                            outlined
                            :label="$t('container.system_config.demo_graphic.ward.upazila')
                              "
                            :items="upazilas_search"
                            item-text="name_en"
                            item-value="id"
                      
                            :error="errors[0] ? true : false"
                            :error-messages="errors[0]"
                          ></v-autocomplete>
                        </ValidationProvider>
                      </v-col>
  
                                                
        
                                                    </v-row>

                                                    <div class="d-inline d-flex justify-end ">
                                                        <v-btn elevation="2" type="submit" class="btn mr-2" color="success">{{
                                                          $t("container.list.search") }}</v-btn>
                                                        <v-btn elevation="2" class="btn" @click="resetSearch">{{ $t("container.list.reset") }}</v-btn>
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
                  {{
                    $t(
                      "container.system_config.demo_graphic.union1.customtitle"
                    )
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
                      @keyup.native="GetUnion"
                      outlined
                      dense
                      v-model="search"
                      prepend-inner-icon="mdi-magnify"
                      class="my-sm-0 my-3 mx-0v -input--horizontal"
                      flat
                      variant="outlined"
                      :label="
                        $t('container.system_config.demo_graphic.union.search')
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
                      :items="unions"
                      :items-per-page="pagination.perPage"
                      @update:options="handleOptionsUpdate"
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
                      <template v-slot:item.division="{ item }">
                        {{ item.thana.district.division.name_en }}
                      </template>
                      <template v-slot:item.district="{ item }">
                        {{ item.thana?.district.name_en }}
                      </template>
                      <template v-slot:item.thana="{ item }">
                        {{ item.thana?.name_en }}
                      </template>
                      <template v-slot:item.name_en="{ item }">
                        {{ item?.name_en }}
                      </template>
                      <template v-slot:item.name_bn="{ item }">
                        {{ item?.name_bn }}
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
                              @click="editUnion(item)"
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

      <!-- upazila add modal  -->
      <v-dialog v-model="dialogAdd" width="650">
        <v-card style="justify-content: center; text-align: center">
          <v-card-title class="font-weight-bold justify-center">
            {{ $t("container.system_config.demo_graphic.union1.add_new") }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="mt-7">
            <v-row> </v-row>

            <ValidationObserver ref="formAdd" v-slot="{ invalid }">
              <form @submit.prevent="submitUnion()">
                <v-row>

                  <v-col lg="12" md="12" cols="12">
                    <ValidationProvider
                      name="Division"
                      vid="division_id"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-autocomplete
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
                        :hide-details="errors[0] ? false : true"
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="12" md="12" cols="12">
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
                        :hide-details="errors[0] ? false : true"
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                
                  <v-col lg="12" md="12" cols="12">
                    <ValidationProvider
                      name="LocationType"
                      vid="locationType"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-autocomplete
                        @input="onChangeLocationType($event)"
                        v-model="data.location_type"
                        outlined
                        :label="$t('container.list.location_type')"
                        :items="locationType"
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
                    lg="12"
                    md="12"
                    cols="12"
                    v-if="data.location_type == 2"
                  >
                    <ValidationProvider
                      name="city"
                      vid="city"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-autocomplete
                        v-model="data.thana_id"
                        outlined
                        :label="
                          $t('container.system_config.demo_graphic.city.city')
                        "
                        :items="city"
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
                    lg="12"
                    md="12"
                    cols="12"
                    v-if="data.location_type == 3 || data.location_type == 1"
                  >
                    <ValidationProvider
                      name="Thana"
                      vid="division"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-autocomplete
                        v-model="data.thana_id"
                        outlined
                        :label="
                          $t(
                            'container.system_config.demo_graphic.ward.upazila'
                          )
                        "
                        :items="thanas"
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
                    lg="12"
                    md="12"
                    cols="12"
                    v-if="data.location_type != null"
                  >
                    <ValidationProvider
                      name="Code"
                      vid="code"
                      rules="codeRules"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        outlined
                        type="text"
                        v-model="data.code"
                        :label="codeLabel"
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                        :hide-details="errors[0] ? false : true"
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col
                    lg="12"
                    md="12"
                    cols="12"
                    v-if="data.location_type != null"
                  >
                    <ValidationProvider
                      name="Name English"
                      vid="name_en"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        outlined
                        type="text"
                        v-model="data.name_en"
                        :label="nameEnLabel"
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                        :hide-details="errors[0] ? false : true"
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col
                    lg="12"
                    md="12"
                    cols="12"
                    v-if="data.location_type != null"
                  >
                    <ValidationProvider
                      name="Name Bangla"
                      vid="name_bn"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        outlined
                        type="text"
                        v-model="data.name_bn"
                        :label="nameBnLabel"
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                        :hide-details="errors[0] ? false : true"
                      ></v-text-field>
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
      <!-- Upazila add modal  -->
      <!-- upazila Edit modal  -->
      <v-dialog v-model="dialogEdit" width="650">
        <v-card style="justify-content: center; text-align: center">
          <v-card-title class="font-weight-bold justify-center">
            {{ $t("container.system_config.demo_graphic.union1.edit") }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="mt-7">
            <v-row> </v-row>

            <ValidationObserver ref="formEdit" v-slot="{ invalid }">
              <form @submit.prevent="updateUnion()">
                <!-- <v-row>
                  <v-col>
                    <ValidationProvider
                      name="Code"
                      vid="code"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        outlined
                        type="text"
                        v-model="data.code"
                                            :rules="codeRules"

                        :label="$t('container.system_config.demo_graphic.union.code')"
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                      ></v-text-field>
                      <div
                        v-if="union_errors && union_errors.code"
                        v-html="union_errors.code[0]"
                        class="red--text"
                      />
                    </ValidationProvider>
                    <ValidationProvider
                      name="District"
                      vid="district"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-autocomplete
                        outlined
                        v-model="data.district_id"
                        :label="
                          $t(
                            'container.system_config.demo_graphic.district.district'
                          )
                        "
                        @input="onChangeDistrict($event)"
                        :items="districts"
                        item-text="name_en"
                        item-value="id"
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                      ></v-autocomplete>
                      <div
                        v-if="union_errors && union_errors.district_id"
                        v-html="union_errors.district_id[0]"
                        class="red--text"
                      />
                    </ValidationProvider>
                    <ValidationProvider
                      name="Name English"
                      vid="name_en"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        outlined
                        type="text"
                        v-model="data.name_en"
                        :label="$t('container.system_config.demo_graphic.union.name_en')"
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                      ></v-text-field>
                      <div
                        v-if="union_errors && union_errors.name_en"
                        v-html="union_errors.name_en[0]"
                        class="red--text"
                      />
                    </ValidationProvider>
                  </v-col>
                  <v-col>
                    <ValidationProvider
                      name="Division"
                      vid="division"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-autocomplete
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
                      <div
                        v-if="union_errors && union_errors.division_id"
                        v-html="union_errors.division_id[0]"
                        class="red--text"
                      />
                    </ValidationProvider>

                    <ValidationProvider
                      name="Thana"
                      vid="division"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-autocomplete
                        v-model="data.thana_id"
                        outlined
                        :label="
                          $t('container.system_config.demo_graphic.thana.thana')
                        "
                        :items="thanas"
                        item-text="name_en"
                        item-value="id"
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                      ></v-autocomplete>
                      <div
                        v-if="union_errors && union_errors.thana_id"
                        v-html="union_errors.thana_id[0]"
                        class="red--text"
                      />
                    </ValidationProvider>

                    <ValidationProvider
                      name="Name Bangla"
                      vid="name_bn"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        outlined
                        type="text"
                        v-model="data.name_bn"
                        :label="$t('container.system_config.demo_graphic.union.name_bn')"
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                      ></v-text-field>
                      <div
                        v-if="union_errors && union_errors.name_bn"
                        v-html="union_errors.name_bn[0]"
                        class="red--text"
                      />
                    </ValidationProvider>
                  </v-col>
                </v-row> -->
                <!-- 
                <v-row>
                  <v-col lg="12" md="12" cols="12">
                    <ValidationProvider
                      name="Division"
                      vid="division_id"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-autocomplete
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
                        :hide-details="errors[0] ? false : true"
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="12" md="12" cols="12">
                    <ValidationProvider
                      name="District"
                      vid="district_id"
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
                        :hide-details="errors[0] ? false : true"
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="12" md="12" cols="12">
                    <ValidationProvider
                      name="Thana"
                      vid="thana"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-autocomplete
                        v-model="data.thana_id"
                        outlined
                        :label="
                          $t(
                            'container.system_config.demo_graphic.ward.upazila'
                          )
                        "
                        :items="thanas"
                        item-text="name_en"
                        item-value="id"
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                        :hide-details="errors[0] ? false : true"
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
                        outlined
                        type="text"
                        v-model="data.code"
                        :label="
                          $t('container.system_config.demo_graphic.union.code')
                        "
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                        :hide-details="errors[0] ? false : true"
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="12" md="12" cols="12">
                    <ValidationProvider
                      name="Name English"
                      vid="name_en"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        outlined
                        type="text"
                        v-model="data.name_en"
                        :label="
                          $t(
                            'container.system_config.demo_graphic.union.name_en'
                          )
                        "
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                        :hide-details="errors[0] ? false : true"
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="12" md="12" cols="12">
                    <ValidationProvider
                      name="Name Bangla"
                      vid="name_bn"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        outlined
                        type="text"
                        v-model="data.name_bn"
                        :label="
                          $t(
                            'container.system_config.demo_graphic.union.name_bn'
                          )
                        "
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                        :hide-details="errors[0] ? false : true"
                      ></v-text-field>
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
                 -->

                <v-row>
                  <v-col lg="12" md="12" cols="12">
                    <ValidationProvider
                      name="Division"
                      vid="division_id"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-autocomplete
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
                        :hide-details="errors[0] ? false : true"
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="12" md="12" cols="12">
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
                        :hide-details="errors[0] ? false : true"
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>

                  <v-col lg="12" md="12" cols="12">
                    <ValidationProvider
                      name="LocationType"
                      vid="locationType"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-autocomplete
                        @input="onChangeLocationType($event)"
                        v-model="data.location_type"
                        outlined
                        :label="$t('container.list.location_type')"
                        :items="locationType"
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
                    lg="12"
                    md="12"
                    cols="12"
                    v-if="data.location_type == 2"
                  >
                    <ValidationProvider
                      name="city"
                      vid="city"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-autocomplete
                        v-model="data.thana_id"
                        outlined
                        :label="
                          $t('container.system_config.demo_graphic.city.city')
                        "
                        :items="city"
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
                    lg="12"
                    md="12"
                    cols="12"
                    v-if="data.location_type == 3 || data.location_type == 1"
                  >
                    <ValidationProvider
                      name="Thana"
                      vid="division"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-autocomplete
                        v-model="data.thana_id"
                        outlined
                        :label="
                          $t(
                            'container.system_config.demo_graphic.ward.upazila'
                          )
                        "
                        :items="thanas"
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
                    lg="12"
                    md="12"
                    cols="12"
                    v-if="data.location_type != null"
                  >
                    <ValidationProvider
                      name="Code"
                      vid="code"
                      rules="codeRules"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        outlined
                        type="text"
                        v-model="data.code"
                        :label="codeLabel"
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                        :hide-details="errors[0] ? false : true"
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col
                    lg="12"
                    md="12"
                    cols="12"
                    v-if="data.location_type != null"
                  >
                    <ValidationProvider
                      name="Name English"
                      vid="name_en"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        outlined
                        type="text"
                        v-model="data.name_en"
                        :label="nameEnLabel"
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                        :hide-details="errors[0] ? false : true"
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col
                    lg="12"
                    md="12"
                    cols="12"
                    v-if="data.location_type != null"
                  >
                    <ValidationProvider
                      name="Name Bangla"
                      vid="name_bn"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        outlined
                        type="text"
                        v-model="data.name_bn"
                        :label="nameBnLabel"
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                        :hide-details="errors[0] ? false : true"
                      ></v-text-field>
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
      <!-- Upazila Edit modal  -->

      <!-- delete modal  -->
      <v-dialog v-model="deleteDialog" width="350">
        <v-card style="justify-content: center; text-align: center">
          <v-card-title class="font-weight-bold justify-center">
            {{ $t("container.system_config.demo_graphic.union.delete") }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <div class="subtitle-1 font-weight-medium mt-5">
              {{
                $t("container.system_config.demo_graphic.union.delete_alert")
              }}
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
                @click="deleteUnion()"
                color="white"
                :loading="delete_loading"
                class="custom-btn-width black white--text py-2"
              >
                {{ $t("container.list.delete") }}
              </v-btn>
              <v-btn
                text
                @click="deleteUnion()"
                color="white"
                :loading="delete_loading"
                class="custom-btn-width white--text py-2"
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
import { extend, ValidationProvider, ValidationObserver } from "vee-validate";
import { required } from "vee-validate/dist/rules";

extend("required", required);
export default {
  name: "Index",
  title: "CTM - Union",
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
        // city_id: null,
        location_type: null,
      },

      locationType: [
        {
          id: 1,
          value_en: "Pouroshava",
        },
        {
          id: 2,
          value_en: "Thana",
        },
        {
          id: 3,
          value_en: "Union",
        },
      ],
      locationTypes:[],
      districts_search:[],
      districts: [],
      thanas: [],
      upazilas_search: [],
      district_pouros_search: [],
      cities_search: [],
      dialogAdd: false,
      dialogEdit: false,
      deleteDialog: false,
      delete_loading: false,
      loading: false,
      location_type_search : null,
      division_id_search : null,
      district_id_search :null,
      upazila_id_search:null,
      city_id_search:null,
      district_pouro_id_search:null,
     
      search: "",
      delete_id: "",
      unions: [],
      pagination: {
        current: 1,
        total: 0,
        perPage: 20,
      },
      sortBy: "name_en",
      sortDesc: false, //ASC
      items: [10, 15, 20, 40, 50, 100],
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
          text: this.$t("container.system_config.demo_graphic.union.custom_code"),
          value: "code",
        },
        {
          text: this.$t(
            "container.system_config.demo_graphic.division.division"
          ),
          value: "parent.parent.parent.name_en",
        },
        {
          text: this.$t(
            "container.system_config.demo_graphic.district.district"
          ),
          value: "parent.parent.name_en",
        },
        {
          text: this.$t("container.system_config.demo_graphic.thana.thana"),
          value: "parent.name_en",
        },
        {
          text: this.$t("container.system_config.demo_graphic.union.name_en"),
          value: "name_en",
        },
        {
          text: this.$t("container.system_config.demo_graphic.union.name_bn"),
          value: "name_bn",
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
      divisions: (state) => state.Division.divisions,
      //   error_status: (state) => state.Union.error_status,
      //   union_errors: (state) => state.Union.union_errors,
      // message: (state) => state.SystemConfiguration.success_message,
    }),
    codeLabel() {
      // Use a computed property to dynamically determine the label
      if (this.data.location_type === 3) {
        const data = {};
        return this.$t("container.system_config.demo_graphic.union1.code");
      }
      if (this.data.location_type === 1) {
        return this.$t("container.system_config.demo_graphic.pouro.code");
      }
      if (this.data.location_type === 2) {
        return this.$t("container.system_config.demo_graphic.thana1.code");
      } else {
        return "Fallback Label"; // You can set a fallback label here
      }
    },
    nameEnLabel() {
      // Use a computed property to dynamically determine the label
      if (this.data.location_type === 3) {
        const data = {};
        return this.$t("container.system_config.demo_graphic.union1.name_en");
      }
      if (this.data.location_type === 1) {
        return this.$t("container.system_config.demo_graphic.pouro.name_en");
      }
      if (this.data.location_type === 2) {
        return this.$t("container.system_config.demo_graphic.thana1.name_en");
      } else {
        return "Fallback Label"; // You can set a fallback label here
      }
    },
    nameBnLabel() {
      // Use a computed property to dynamically determine the label
      if (this.data.location_type === 3) {
        const data = {};
        return this.$t("container.system_config.demo_graphic.union1.name_bn");
      }
      if (this.data.location_type === 1) {
        return this.$t("container.system_config.demo_graphic.pouro.name_bn");
      }
      if (this.data.location_type === 2) {
        return this.$t("container.system_config.demo_graphic.thana1.name_bn");
      } else {
        return "Fallback Label"; // You can set a fallback label here
      }
    },
  },
  created() {
    this.GetAllDivisions();
    this.registerCustomRules();
  },
  methods: {
     appendIconCallback() {
      // Handle the click event for the custom append icon here

    },
    appendIcon() {
      return 'mdi-plus'; // Use the appropriate Material Design Icons (MDI) class for the "+" icon
    },
      resetSearch() {
      this.location_type_search = null;
      this.division_id_search = null;
      this.district_id_search = null;
    },
    registerCustomRules() {
      extend("codeRules", (value) => {
        if (this.data.location_type === 3) {
          return (
            value.toString().length <= 6 ||
            this.$t("container.system_config.demo_graphic.union1.code") +
              " can have maximum 6 digit"
          );
        }
        if (this.data.location_type === 1) {
          return (
            value.toString().length <= 6 ||
            this.$t("container.system_config.demo_graphic.pouro.code") +
              " can have maximum 6 digit"
          );
        }
        if (this.data.location_type === 2) {
          return (
            value.toString().length <= 6 ||
            this.$t("container.system_config.demo_graphic.thana1.code") +
              " can have maximum 6 digit"
          );
        }
      });
    },
    createDialog() {
      if (this.$refs.formAdd) {
        this.$refs.formAdd.reset();
      }
      this.resetData();
      this.dialogAdd = true;
    },
    checkLanguage() {
      let checkLanguageEnglish = this.$checkLanguage(this.data.name_en);
      let checkLanguageBangla = this.$checkLanguage(this.data.name_bn);

      console.log(checkLanguageEnglish);
      console.log(checkLanguageBangla);
      let errs = {};

      if (
        checkLanguageBangla !== "Bangla" &&
        checkLanguageBangla !== "BanglaSpecialChar"
      ) {
        errs.name_bn = ["Please Enter in Bangla Language in this Field"];
      }

      if (checkLanguageEnglish !== "English") {
        errs.name_en = ["Please Enter in English Language in this Field"];
      }

      if (Object.keys(errs).length > 0) {
        if (this.$refs.formAdd) {
          this.$refs.formAdd.setErrors(errs);
        }
        if (this.$refs.formEdit) {
          this.$refs.formEdit.setErrors(errs);
        }

        return false;
      }

      return true;
    },
    validator() {
      let fd = new FormData();
      for (const [key, value] of Object.entries(this.data)) {
        if (value !== null) {
          fd.append(key, value);
          console.log(key, value);
        }
      }
      return fd;
    },
    submitUnion() {
      if (!this.checkLanguage()) {
        return;
      }
      // this.validator();
      // return;
      try {
        // if (this.data.location_type == 2) {
        //   //Insert Thana
        //   this.$store
        //     .dispatch("Thana/StoreUpazila", this.validator())
        //     .then((data) => {
        //       console.log(data, "submit");
        //       if (data == null) {
        //         this.$toast.success("Data Inserted Successfully");
        //         this.dialogAdd = false;
        //         this.resetData();
        //         this.GetUnion();
        //       } else {
        //         this.$refs.formAdd.setErrors(data.errors);
        //       }
        //     });
        // } 
        // else {

          this.$store
            .dispatch("Union/StoreUnion", this.validator())
            .then((res) => {
              if (res.data?.success) {
                this.$toast.success("Data Inserted Successfully");
                this.dialogAdd = false;
                this.resetData();
                this.GetUnion();
              } else if (res.response?.data?.errors) {
                this.$refs.formAdd.setErrors(res.response.data.errors);
              }
            });
        // }
      } catch (e) {
        console.log(e);
      }
    },
    updateUnion() {
      if (!this.checkLanguage()) {
        return;
      }

      try {
        // if (this.data.location_type == 2) {
        //   //Update Thana
        //   this.$store
        //     .dispatch("Thana/UpdateUpazila", this.validator())
        //     .then((data) => {
        //       console.log(data, "submit");
        //       if (data == null) {
        //         this.$toast.success("Data Updated Successfully");
        //         this.dialogEdit = false;
        //         this.resetData();
        //         this.GetUnion();
        //       } else {
        //         this.$refs.formEdit.setErrors(data.errors);
        //       }
        //     });
        // } else {

          this.$store
            .dispatch("Union/UpdateUnion", this.validator())
            .then((res) => {
              console.log(res, "update_union");
              if (res.data?.success) {
                this.$toast.success("Data Updated Successfully");
                this.dialogEdit = false;
                this.resetData();
                this.GetUnion();
              } else if (res.response?.data?.errors) {
                this.$refs.formEdit.setErrors(res.response.data.errors);
              }
            });
        
          // }
      } catch (e) {
        console.log(e);
      }
    },
    dialogOpen() {
      if (this.$refs.formAdd) {
        this.$refs.formAdd.reset();
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
    // async onChangeDistrict(event) {
    //   console.log(this.thanas);

    //   await this.$axios
    //     .get(`/admin/thana/get/${event}`, {
    //       headers: {
    //         Authorization: "Bearer " + this.$store.state.token,
    //         "Content-Type": "multipart/form-data",
    //       },
    //     })
    //     .then((result) => {
    //       this.thanas = result.data.data;
    //     });
    // },

    ...mapActions({
      GetAllDivisions: "Division/GetAllDivisions",

      updateError: "Union/updateError",
    }),
    deleteAlert(id) {
      this.deleteDialog = true;
      this.delete_id = id;
    },
    onPageChange($event) {
      // this.pagination.current = $event;
      this.GetUnion();
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
      this.GetUnion();

      const queryParams = {
        sortBy: this.sortBy,
        orderBy: this.sortDesc,
      };

      // alert(JSON.stringify(queryParams));
    },
    async GetUnion() {
      let page;
      if (!this.sortBy) {
        page = this.pagination.current;
      }
      const queryParams = {
        searchText: this.search,
        perPage: this.pagination.perPage,
        page: this.pagination.current,
        sortBy: this.sortBy,
        orderBy: this.sortDesc,
      };
      this.$axios
        .get("/admin/union/get", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
          params: queryParams,
        })
        .then((result) => {
          this.unions = result.data.data;
          this.pagination.current = result.data.current_page;
          this.pagination.total = result.data.last_page;
          this.pagination.grand_total = result.data.total;
        });
    },
        async onChangeDivisionSearch(event) {
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
      async onChangeDistrictSearch($event) {
    //      console.log(this.location_type_search, "location");
    //        console.log($event, "event");
    //        this.upazilas_search =null;
      
    // await this.$axios
    //     .get("/admin/city/get/" +  $event + "/" + this.location_type_search , {
    //       headers: {
    //         Authorization: "Bearer " + this.$store.state.token,
    //         "Content-Type": "multipart/form-data",
    //       },
    //     })
    //     .then((result) => {
    //       this.upazilas_search = result.data.data;
      
    //       console.log(this.upazilas_search,"upazila");
     
    //     });

    console.log($event,"event");
     console.log(this.location_type_search,"search");
      if (this.district_id_search != null && this.location_type_search != null) {
        if (this.location_type_search === 2) {
          await this.$axios
            .get("/admin/thana/get/"+ $event, {
              headers: {
                Authorization: "Bearer " + this.$store.state.token,
                "Content-Type": "multipart/form-data",
              },
            })
            .then((result) => {
              this.upazilas_search = result.data.data;
              this.cities_search = null;
              this.district_pouros_search = null;
          
      
           



            });
        }
        if (this.location_type_search === 3) {

          await this.$axios
            .get("/admin/city/get/" +  $event + "/" + this.location_type_search, {
              headers: {
                Authorization: "Bearer " + this.$store.state.token,
                "Content-Type": "multipart/form-data",
              },
            })
            .then((result) => {
              this.cities_search = result.data.data;
               this.district_pouros_search = null;
              this.upazilas_search = null;
         

            });
        }
        if (this.location_type_search === 1) {

          await this.$axios
            .get("/admin/city/get/" + $event + "/" + this.location_type_search, {
              headers: {
                Authorization: "Bearer " + this.$store.state.token,
                "Content-Type": "multipart/form-data",
              },
            })
            .then((result) => {
              this.district_pouros_search = result.data.data;
              this.upazilas_search=null;
            });
        }
      }
    },
    async onChangeLocationSearch($event) {
      this.onChangeDistrictSearch(this.district_id_search );

    },

    deleteUnion: async function (id) {
      try {
        await this.$store
          .dispatch("Union/DestroyUnion", this.delete_id)
          .then((res) => {
            // check if the request was successful
            console.log(res, "delete");
            if (res?.data?.success) {
              this.$toast.error(res.data.message);
            } else {
              this.$toast.error(res.data.message);
            }
            this.deleteDialog = false;
            this.GetUnion();
          });
      } catch (e) {
        console.log(e);
      }
    },
    onChangeDistrict(event) {
      this.onChangeLocationType(event);
    },
    async onChangeLocationType(event) {
      console.log(event);
      console.log(this.data.location_type);

      let param;

      // if (this.data.location_type == 1) {
      //   param = 3; //City Corporation
      //   await this.$axios
      //     .get(`/admin/city/get/` + this.data.district_id + "/" + param, {
      //       headers: {
      //         Authorization: "Bearer " + this.$store.state.token,
      //         "Content-Type": "multipart/form-data",
      //       },
      //     })
      //     .then((result) => {
      //       this.city = result.data.data;
      //       console.log(this.city);
      //     });
      // }
      if (this.data.location_type == 2) {
        param = 3; //City Corporation
        await this.$axios
          .get(`/admin/city/get/` + this.data.district_id + "/" + param, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((result) => {
            this.city = result.data.data;
            console.log(this.city);
          });
      } else {
        // if (this.data.location_type == 3) {
        // alert(event);
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
    },
    resetData() {
      //   if (this.$refs.formAdd) {
      //     this.$refs.formAdd.reset();
      //   }

      (this.data.name_en = null),
        (this.data.name_bn = null),
        (this.data.code = null),
        (this.data.division_id = null),
        (this.data.district_id = null),
        (this.divisions = []),
        (this.districts = []),
        (this.thanas = []),
        (this.data.thana_id = null);
    },
    editUnion(item) {
      console.log(item, "editUnion");
      if (this.$refs.formEdit) {
        this.$refs.formEdit.reset();
      }
      const update_error_value = null;
      this.updateError("update_error_value");

      if (item.type == "union") {
        this.data.location_type = 3;
      }

      if (item.type == "pouro") {
        this.data.location_type = 1;
      }

      if (item.type == "city") {
        this.data.location_type = 2;
      }

      this.dialogEdit = true;
      this.data.id = item.id;
      this.data.name_en = item.name_en;
      this.data.name_bn = item.name_bn;
      this.data.code = item.code;
      // this.data.division_id = item.thana.district.division.id;
      this.data.division_id = item.parent.parent.parent.id; //division
      console.log(this.data.division_id, 'this.data.division_id');
      console.log(this.divisions,' divisions');
      this.data.district_id = item.parent.parent.id; //district
      this.data.thana_id = item.parent.id;
      console.log(this.data.division_id);
      this.onChangeDivision(this.data.division_id);

      this.onChangeDistrict(this.data.district_id);
    },
    updateHeaderTitle() {
      const title = this.$t(
        "container.system_config.demo_graphic.union1.customtitle"
      );
      this.$store.commit("setHeaderTitle", title);
    },
  },
  watch: {
    "$i18n.locale": "updateHeaderTitle",
  },

  mounted() {
    this.$store.dispatch("getLookupByType", 1).then((res) => {
      this.locationTypes = res;
      console.log(this.locationTypes, " here");
    });
   
    this.setInitialHeader();
   
    // this.GetUnion();
  },
  beforeMount() {
    this.updateHeaderTitle();
  },
  // mounted(){
  // }
};
</script>
<style >
.no-arrow-icon .v-input__icon--clear {
  display: none;

}

.v-input__icon--append .v-icon {
  color: purple;
  font-weight: bold;
}

.no-arrow-icon .v-input__icon--append {
  font-weight: bold;

}
</style>

