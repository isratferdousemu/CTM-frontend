<template>
  <div id="office_information">
    <v-row class="mx-5 mt-4">
      <v-col cols="12">
        <v-row>
          <v-col cols="12">
            <v-card elevation="10" color="white" rounded="md" theme="light" class="mb-8">
              <v-card-title class="justify-center" tag="div">
                <h3 class="text-uppercase pt-3">
                  {{ $t("container.system_config.demo_graphic.office.list") }}
                </h3>
              </v-card-title>
              <v-card-text>
                <v-row class="ma-0 pa-3 white round-border d-flex justify-space-between align-center" justify="center"
                  justify-lg="space-between">
                  <div class="d-flex justify-sm-end flex-wrap">
                    <v-text-field @keyup.native="GetOffices" outlined dense v-model="search"
                      prepend-inner-icon="mdi-magnify" class="my-sm-0 my-3 mx-0v -input--horizontal" flat
                      variant="outlined" :label="$t('container.system_config.demo_graphic.office.search')
                        " hide-details color="primary">
                    </v-text-field>
                  </div>
                  <v-btn @click="dialogOpen" flat color="primary" prepend-icon="mdi-account-multiple-plus">
                    {{ $t("container.list.add_new") }}
                  </v-btn>
                  <v-col cols="12">
                    <v-data-table :loading="loading" item-key="id" :headers="headers" :items="offices"
                      :items-per-page="pagination.perPage" @update:options="handleOptionsUpdate" hide-default-footer
                      class="elevation-0 transparent row-pointer">
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

                      <!-- Action Button -->
                      <template v-slot:item.actions="{ item }">
                        <v-tooltip top>
                          <template v-slot:activator="{ on }">
                            <v-btn fab x-small v-on="on" color="success" elevation="0"
                              @click="editOffice(item)">
                              <v-icon> mdi-account-edit-outline </v-icon>
                            </v-btn>
                          </template>
                          <span>
                            {{ $t("container.list.edit") }}
                          </span>
                        </v-tooltip>

                        <v-tooltip top>
                          <template v-slot:activator="{ on }">
                            <v-btn v-can="'delete-division'" fab x-small v-on="on" color="grey" class="ml-3 white--text"
                              elevation="0" @click="deleteAlert(item.id)">
                              <v-icon> mdi-delete </v-icon>
                            </v-btn>
                          </template>
                          <span> {{ $t("container.list.delete") }}</span>
                        </v-tooltip>
                      </template>
                      <!-- End Action Button -->

                      <template v-slot:footer="item">
                        <div class="text-center pt-2 v-data-footer justify-center pb-2">
                          <v-select style="
                              position: absolute;
                              right: 25px;
                              width: 149px;
                              transform: translate(0px, 0px);
                            " :items="items" hide-details dense outlined @change="onPageChange"
                            v-model="pagination.perPage"></v-select>
                          <v-pagination circle primary v-model="pagination.current" :length="pagination.total"
                            @input="onPageChange" :total-visible="11" class="custom-pagination-item"></v-pagination>
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
      <v-dialog v-model="dialogAdd" width="1250">
        <v-card style="justify-content: center; text-align: center">
          <v-card-title class="font-weight-bold justify-center">
            {{ $t("container.system_config.demo_graphic.office.add_new") }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="mt-7">
            <v-row> </v-row>

            <ValidationObserver ref="formAdd" v-slot="{ invalid }">
              <form @submit.prevent="submitOffice()">
                <v-row>
                  <v-col lg="6" md="6" cols="12">
                    <ValidationProvider name="OfficeType" vid="officeType" rules="required" v-slot="{ errors }">
                      <v-autocomplete :hide-details="errors[0] ? false : true" @input="onChangeOfficeType($event)"
                        v-model="data.office_type" outlined :label="$t(
                          'container.system_config.demo_graphic.office.office_type'
                        )
                          " :items="officeType" item-text="value_en" item-value="id" required
                        :error="errors[0] ? true : false" :error-messages="errors[0]"></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="6" md="6" cols="12" v-if="data.office_type === 6 ||
                    data.office_type === 7 ||
                    data.office_type === 8 ||
                    data.office_type === 9 ||
                    data.office_type === 10 ||
                    data.office_type === 11 ||
                    data.office_type === 35
                    ">
                    <ValidationProvider name="Division" vid="division" rules="required" v-slot="{ errors }">
                      <v-autocomplete :hide-details="errors[0] ? false : true" @input="onChangeDivision($event)"
                        v-model="data.division_id" outlined :label="$t(
                          'container.system_config.demo_graphic.division.division'
                        )
                          " :items="divisions" item-text="name_en" item-value="id" required  :readonly="(selectedWards.length > 0) || (selectedWards_UCDUpazila.length > 0)"
                        :error="errors[0] ? true : false" :error-messages="errors[0]"></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="6" md="6" cols="12" v-if="
                    data.office_type === 7 ||
                    data.office_type === 8 ||
                    data.office_type === 9 ||
                    data.office_type === 10 ||
                    data.office_type === 11 ||
                    data.office_type === 35 ">
                    <ValidationProvider name="District" vid="district" rules="required" v-slot="{ errors }">
                      <v-autocomplete :hide-details="errors[0] ? false : true" outlined v-model="data.district_id"
                        @input="onChangeDistrict($event)" :label="$t(
                          'container.system_config.demo_graphic.district.district'
                        )
                          " :items="districts" item-text="name_en" item-value="id" required  :readonly="(selectedWards.length > 0) || (selectedWards_UCDUpazila.length > 0)"
                        :error="errors[0] ? true : false" :error-messages="errors[0]"></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <v-col
                    lg="6"
                    md="6"
                    cols="12"
                   v-if="
                    data.office_type === 8 ||
                    data.office_type === 10"
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
                       :readonly="(selectedWards.length > 0) || (selectedWards_UCDUpazila.length > 0)"
                        v-model="data.upazila_id"
                       
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
                  <v-col v-if="data.office_type == 10" cols="12"  md="6" lg="6">
                      <ValidationProvider name="subLocationType" vid="subLocationType" rules="required" v-slot="{ errors }">
                        <v-autocomplete @input="onChangeSubLocationType($event)" v-model="data.sub_location_type" outlined
                          :label="$t(
                            'container.system_config.demo_graphic.ward.subLocation_type'
                          )
                            " :items="subLocationType" item-text="value_en" item-value="id" required
                          :error="errors[0] ? true : false" :error-messages="errors[0]"
                          :hide-details="errors[0] ? false : true"></v-autocomplete>
                      </ValidationProvider>
                    </v-col>

                    <v-col v-if="data.office_type == 10 && data.sub_location_type == 1
                      " cols="12"  md="6" lg="6">
                      <ValidationProvider name="pouros" vid="pouros" rules="required" v-slot="{ errors }">
                        <v-autocomplete v-model="data.pouro_id" outlined :label="$t('container.system_config.demo_graphic.ward.pouro')"  @input="onChangePouro($event)" :items="pouros" item-text="name_en" item-value="id" required
                          :error="errors[0] ? true : false" :error-messages="errors[0]"
                          :hide-details="errors[0] ? false : true"></v-autocomplete>
                      </ValidationProvider>
                    </v-col>

                    <v-col v-if="data.sub_location_type == 2 && data.office_type == 10
                      " cols="12"  md="6" lg="6">
                      <ValidationProvider name="unions" vid="unions" rules="required" v-slot="{ errors }">
                        <v-autocomplete v-model="data.union_id" outlined :label="$t('container.system_config.demo_graphic.ward.union')" @input="onChangeUnion($event)" :items="unions" item-text="name_en" item-value="id" required
                          :error="errors[0] ? true : false" :error-messages="errors[0]"
                          :hide-details="errors[0] ? false : true"></v-autocomplete>
                      </ValidationProvider>
                    </v-col>
               
                  <v-col lg="6" md="6" cols="12" v-if="data.office_type === 35">
                    <ValidationProvider name="city" vid="city_id" rules="required" v-slot="{ errors }">
                      <v-autocomplete :hide-details="errors[0] ? false : true" v-model="data.city_id"
                        @change="onChangeCity($event)" outlined :label="$t('container.system_config.demo_graphic.office.city')
                          " :items="cities" item-text="name_en" item-value="id" required   :readonly="(selectedWards.length > 0) || (selectedWards_UCDUpazila.length > 0)"
                        :error="errors[0] ? true : false" :error-messages="errors[0]"></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="6" md="6" cols="12" v-if="data.office_type === 35">
                    <ValidationProvider name="city" vid="city_corpo_id" rules="required" v-slot="{ errors }">
                      <v-autocomplete :hide-details="errors[0] ? false : true" v-model="data.thana_id"
                        @change="onChangeThana($event)" outlined :label="$t('container.system_config.demo_graphic.ward.thana')
                          " :items="final_thanas" item-text="name_en" item-value="id" required
                        :error="errors[0] ? true : false" :error-messages="errors[0]"></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="6" md="6" cols="12" v-if="data.office_type === 35 ">
                    <ValidationProvider name="ward" vid="ward_id" rules="required" v-slot="{ errors }">
                      <v-autocomplete :hide-details="errors[0] ? false : true" v-model="selectedWards"
                        @change="onChangeWards($event)" outlined :label="$t('container.system_config.demo_graphic.ward.ward')
                          " :items="final_wards" item-text="name_en" item-value="id" multiple 
                        :error="errors[0] ? true : false" :error-messages="errors[0]"></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                     <v-col lg="6" md="6" cols="12" v-if="data.office_type === 10">
                      <ValidationProvider name="ward" vid="ward_id_upazila_ucd" rules="required" v-slot="{ errors }">
                        <v-autocomplete :hide-details="errors[0] ? false : true" v-model="selectedWards_UCDUpazila"
                          @change="onChangeWards_UCDUpazila($event)" outlined :label="$t('container.system_config.demo_graphic.ward.ward')
                            " :items="final_wards_ucd_upazila" item-text="name_en" item-value="id" multiple 
                          :error="errors[0] ? true : false" :error-messages="errors[0]"></v-autocomplete>
                      </ValidationProvider>
                    </v-col>
                   <v-col
                      lg="6"
                      md="6"
                      cols="12"
                     v-if="data.office_type === 9 "
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
                       
                          v-model="data.dist_pouro_id"
                       
                          :label="$t(
                            'container.system_config.demo_graphic.ward.dist_pouro'
                          )
                            "
                          :items="dist_pouros"
                          item-text="name_en"
                          item-value="id"
                          required
                          :error="errors[0] ? true : false"
                          :error-messages="errors[0]"
                        ></v-autocomplete>
                      </ValidationProvider>
                    </v-col>
                  <v-col lg="6" md="6" cols="12">
                    <ValidationProvider name="Office Name English" vid="name_en" rules="required" v-slot="{ errors }">
                      <v-text-field outlined type="text" :hide-details="errors[0] ? false : true" v-model="data.name_en"
                        :label="$t(
                          'container.system_config.demo_graphic.office.name_en'
                        )
                          " required :error="errors[0] ? true : false" :error-messages="errors[0]"></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="6" md="6" cols="12">
                    <ValidationProvider name="Office Name Bangla" vid="name_bn" rules="required" v-slot="{ errors }">
                      <v-text-field :hide-details="errors[0] ? false : true" outlined type="text" v-model="data.name_bn"
                        :label="$t(
                          'container.system_config.demo_graphic.office.name_bn'
                        )
                          " required :error="errors[0] ? true : false" :error-messages="errors[0]"></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="6" md="6" cols="12">
                    <ValidationProvider name="Office Address" vid="office_address" rules="required" v-slot="{ errors }">
                      <v-text-field :hide-details="errors[0] ? false : true" outlined type="text"
                        v-model="data.office_address" :label="$t(
                          'container.system_config.demo_graphic.office.office_address'
                        )
                          " required :error="errors[0] ? true : false" :error-messages="errors[0]"></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="6" md="6" cols="12">
                    <ValidationProvider name="Comment" vid="comment" v-slot="{ errors }">
                      <v-text-field :hide-details="errors[0] ? false : true" outlined type="text" v-model="data.comment"
                        :label="$t(
                          'container.system_config.demo_graphic.office.comment'
                        )
                          " :error="errors[0] ? true : false" :error-messages="errors[0]"></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="6" md="6" cols="12">
                    <ValidationProvider name="Status" vid="status" v-slot="{ errors }">
                      <v-checkbox v-model="data.status" :label="$t(
                        'container.system_config.demo_graphic.office.active'
                      )
                        " color="green" value="1" :hide-details="errors[0] ? false : true"
                        :error="errors[0] ? true : false" :error-messages="errors[0]"></v-checkbox>
                    </ValidationProvider>
                  </v-col>
                </v-row>




                <v-row class="my-10">
                  <v-col cols="12" v-if="selectedWards.length > 0">
                    <v-data-table :headers="headersWard" :items="selectedWardsDetails" :search="search">
                        <template v-slot:item.sl="{ item, index }">
                          {{
                           
                            index +1
                      
                          }}
                        </template>
                    
                 
                  
               
                   <template v-slot:item.action="{ item }">
                          <v-tooltip top>
                            <template v-slot:activator="{ on }">
                              <v-btn fab x-small v-on="on" class="danger" elevation="0"
                                @click="remove(item)">
                                <v-icon>mdi-trash-can-outline </v-icon>
                              </v-btn>
                            </template>
                            <span>
                              {{ $t("container.list.remove") }}
                            </span>
                          </v-tooltip>

                        
                        </template>
                      </v-data-table>
              
                  </v-col>
                   <v-col cols="12" v-if="selectedWards_UCDUpazila.length > 0">
                      <v-data-table :headers="headersWard_ucd_upazila" :items="selectedWardsDetails_UCDUpazila" :search="search">
                          <template v-slot:item.sl_ucd_upazila="{ item, index }">
                            {{

                              index + 1

                            }}
                          </template>
                    
                 
                  
               
                     <template v-slot:item.action_ucd_upazila="{ item }">
                            <v-tooltip top>
                              <template v-slot:activator="{ on }">
                                <v-btn fab x-small v-on="on" class="danger" elevation="0"
                                  @click="remove_ucd_upazila(item)">
                                  <v-icon>mdi-trash-can-outline </v-icon>
                                </v-btn>
                              </template>
                              <span>
                                {{ $t("container.list.remove") }}
                              </span>
                            </v-tooltip>

                        
                          </template>
                        </v-data-table>
              
                    </v-col>
                </v-row>



                <v-row class="mx-0 my-0 py-2 mt-5" justify="center">
                  <v-btn flat @click="dialogAdd = false" outlined class="custom-btn-width py-2 mr-10">
                    {{ $t("container.list.cancel") }}
                  </v-btn>
                  <v-btn type="submit" flat color="primary" :disabled="invalid" :loading="loading"
                    class="custom-btn-width black white--text py-2">
                    {{ $t("container.list.submit") }}
                  </v-btn>
                </v-row>
              </form>
            </ValidationObserver>
          </v-card-text>
        </v-card>
      </v-dialog>
      <!-- office add modal  -->
      <!-- office Edit modal  -->
      <v-dialog v-model="dialogEdit" width="1250">
        <v-card style="justify-content: center; text-align: center">
          <v-card-title class="font-weight-bold justify-center">
            {{ $t("container.system_config.demo_graphic.office.edit") }} 
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="mt-7">
            <v-row> </v-row>

            <ValidationObserver ref="formAdd" v-slot="{ invalid }">
              <form @submit.prevent="updateOffice()">
                <v-row>
                  <v-col lg="6" md="6" cols="12">
                    <ValidationProvider name="OfficeType" vid="officeType" rules="required" v-slot="{ errors }">
                      <v-autocomplete :hide-details="errors[0] ? false : true" @input="onChangeOfficeType($event)"
                        v-model="data.office_type" outlined :label="$t(
                          'container.system_config.demo_graphic.office.office_type'
                        )
                          " :items="officeType" item-text="value_en" item-value="id" required
                        :error="errors[0] ? true : false" :error-messages="errors[0]"></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="6" md="6" cols="12" v-if="data.office_type === 6 ||
                    data.office_type === 7 ||
                    data.office_type === 8 ||
                    data.office_type === 9 ||
                    data.office_type === 10 ||
                    data.office_type === 11 ||
                    data.office_type === 35
                    ">
                    <ValidationProvider name="Division" vid="division" rules="required" v-slot="{ errors }">
                      <v-autocomplete :hide-details="errors[0] ? false : true" @input="onChangeDivision($event)"
                        v-model="data.division_id" outlined :label="$t(
                          'container.system_config.demo_graphic.division.division'
                        )
                          " :items="divisions" item-text="name_en" item-value="id" required  :readonly="(data.city_id !== null)|| ((data.upazila_id !== null) && (data.office_type === 10))  "
                        :error="errors[0] ? true : false" :error-messages="errors[0]"></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="6" md="6" cols="12" v-if="
                    data.office_type === 7 ||
                    data.office_type === 8 ||
                    data.office_type === 9 ||
                    data.office_type === 10 ||
                    data.office_type === 11 ||
                    data.office_type === 35 ">
                    <ValidationProvider name="District" vid="district" rules="required" v-slot="{ errors }">
                      <v-autocomplete :hide-details="errors[0] ? false : true" outlined v-model="data.district_id"
                        @input="onChangeDistrict($event)" :label="$t(
                          'container.system_config.demo_graphic.district.district'
                        )
                          " :items="districts" item-text="name_en" item-value="id" required  :readonly="(data.city_id !== null) || ((data.upazila_id !== null) && (data.office_type === 10))"
                        :error="errors[0] ? true : false" :error-messages="errors[0]"></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <v-col
                    lg="6"
                    md="6"
                    cols="12"
                   v-if="
                    data.office_type === 8 ||
                    data.office_type === 10"
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
                       :readonly="(data.city_id !== null) || ((data.upazila_id !== null) && (data.office_type === 10))"
                        v-model="data.upazila_id"
                       
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
                  <v-col v-if="data.office_type == 10" cols="12"  md="6" lg="6">
                      <ValidationProvider name="subLocationType" vid="subLocationType"  v-slot="{ errors }">
                        <v-autocomplete @input="onChangeSubLocationType($event)" v-model="data.sub_location_type" outlined
                          :label="$t(
                            'container.system_config.demo_graphic.ward.subLocation_type'
                          )
                            " :items="subLocationType" item-text="value_en" item-value="id" 
                          :error="errors[0] ? true : false" :error-messages="errors[0]"
                          :hide-details="errors[0] ? false : true"></v-autocomplete>
                      </ValidationProvider>
                    </v-col>

                    <v-col v-if="data.office_type == 10 && data.sub_location_type == 1
                      " cols="12"  md="6" lg="6">
                      <ValidationProvider name="pouros" vid="pouros"  v-slot="{ errors }">
                        <v-autocomplete v-model="data.pouro_id" outlined :label="$t('container.system_config.demo_graphic.ward.pouro')"  @input="onChangePouro($event)" :items="pouros" item-text="name_en" item-value="id" 
                          :error="errors[0] ? true : false" :error-messages="errors[0]"
                          :hide-details="errors[0] ? false : true"></v-autocomplete>
                      </ValidationProvider>
                    </v-col>

                    <v-col v-if="data.sub_location_type == 2 && data.office_type == 10
                      " cols="12"  md="6" lg="6">
                      <ValidationProvider name="unions" vid="unions"  v-slot="{ errors }">
                        <v-autocomplete v-model="data.union_id" outlined :label="$t('container.system_config.demo_graphic.ward.union')" @input="onChangeUnion($event)" :items="unions" item-text="name_en" item-value="id" 
                          :error="errors[0] ? true : false" :error-messages="errors[0]"
                          :hide-details="errors[0] ? false : true"></v-autocomplete>
                      </ValidationProvider>
                    </v-col>
               
                  <v-col lg="6" md="6" cols="12" v-if="data.office_type === 35">
                    <ValidationProvider name="city" vid="city_id" rules="required" v-slot="{ errors }">
                      <v-autocomplete :hide-details="errors[0] ? false : true" v-model="data.city_id"
                        @change="onChangeCity($event)" outlined :label="$t('container.system_config.demo_graphic.office.city')
                          " :items="cities" item-text="name_en" item-value="id" required  :readonly="data.city_id !== null"
                        :error="errors[0] ? true : false" :error-messages="errors[0]"></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="6" md="6" cols="12" v-if="data.office_type === 35">
                    <ValidationProvider name="city" vid="city_corpo_id"  v-slot="{ errors }">
                      <v-autocomplete :hide-details="errors[0] ? false : true" v-model="data.thana_id"
                        @change="onChangeThana($event)" outlined :label="$t('container.system_config.demo_graphic.ward.thana')
                          " :items="final_thanas" item-text="name_en" item-value="id" 
                        :error="errors[0] ? true : false" :error-messages="errors[0]"></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="6" md="6" cols="12" v-if="data.office_type === 35 ">
                    <ValidationProvider name="ward" vid="ward_id" rules="required" v-slot="{ errors }">
                      <v-autocomplete :hide-details="errors[0] ? false : true" v-model="selectedWards"
                        @change="onChangeWards($event)" outlined :label="$t('container.system_config.demo_graphic.ward.ward')
                          " :items="final_wards" item-text="name_en" item-value="id" multiple 
                        :error="errors[0] ? true : false" :error-messages="errors[0]"></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                     <v-col lg="6" md="6" cols="12" v-if="data.office_type === 10">
                      <ValidationProvider name="ward" vid="ward_id_upazila_ucd" rules="required" v-slot="{ errors }">
                        <v-autocomplete :hide-details="errors[0] ? false : true" v-model="selectedWards_UCDUpazila"
                          @change="onChangeWards_UCDUpazila($event)" outlined :label="$t('container.system_config.demo_graphic.ward.ward')
                            " :items="final_wards_ucd_upazila" item-text="name_en" item-value="id" multiple 
                          :error="errors[0] ? true : false" :error-messages="errors[0]"></v-autocomplete>
                      </ValidationProvider>
                    </v-col>
                   <v-col
                      lg="6"
                      md="6"
                      cols="12"
                     v-if="data.office_type === 9 "
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
                       
                          v-model="data.dist_pouro_id"
                       
                          :label="$t(
                            'container.system_config.demo_graphic.ward.dist_pouro'
                          )
                            "
                          :items="dist_pouros"
                          item-text="name_en"
                          item-value="id"
                          required
                          :error="errors[0] ? true : false"
                          :error-messages="errors[0]"
                        ></v-autocomplete>
                      </ValidationProvider>
                    </v-col>
                  <v-col lg="6" md="6" cols="12">
                    <ValidationProvider name="Office Name English" vid="name_en" rules="required" v-slot="{ errors }">
                      <v-text-field outlined type="text" :hide-details="errors[0] ? false : true" v-model="data.name_en"
                        :label="$t(
                          'container.system_config.demo_graphic.office.name_en'
                        )
                          " required :error="errors[0] ? true : false" :error-messages="errors[0]"></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="6" md="6" cols="12">
                    <ValidationProvider name="Office Name Bangla" vid="name_bn" rules="required" v-slot="{ errors }">
                      <v-text-field :hide-details="errors[0] ? false : true" outlined type="text" v-model="data.name_bn"
                        :label="$t(
                          'container.system_config.demo_graphic.office.name_bn'
                        )
                          " required :error="errors[0] ? true : false" :error-messages="errors[0]"></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="6" md="6" cols="12">
                    <ValidationProvider name="Office Address" vid="office_address" rules="required" v-slot="{ errors }">
                      <v-text-field :hide-details="errors[0] ? false : true" outlined type="text"
                        v-model="data.office_address" :label="$t(
                          'container.system_config.demo_graphic.office.office_address'
                        )
                          " required :error="errors[0] ? true : false" :error-messages="errors[0]"></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="6" md="6" cols="12">
                    <ValidationProvider name="Comment" vid="comment" v-slot="{ errors }">
                      <v-text-field :hide-details="errors[0] ? false : true" outlined type="text" v-model="data.comment"
                        :label="$t(
                          'container.system_config.demo_graphic.office.comment'
                        )
                          " :error="errors[0] ? true : false" :error-messages="errors[0]"></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="6" md="6" cols="12">
                    <ValidationProvider name="Status" vid="status" v-slot="{ errors }">
                      <v-checkbox v-model="data.status" :label="$t(
                        'container.system_config.demo_graphic.office.active'
                      )
                        " color="green" value="1" :hide-details="errors[0] ? false : true"
                        :error="errors[0] ? true : false" :error-messages="errors[0]"></v-checkbox>
                    </ValidationProvider>
                  </v-col>
                </v-row>




                <v-row class="my-10">
                  <!-- <v-col cols="12" v-if="selectedWards.length > 0">
                    <v-data-table :headers="headersWard_edit" :items="edit[0].wards" :search="search">
                        <template v-slot:item.sl_edit="{ item, index }">
                          {{
                           
                            index +1
                      
                          }}
                        </template>
                    
                 
                  
               
                   <template v-slot:item.action_edit="{ item }">
                          <v-tooltip top>
                            <template v-slot:activator="{ on }">
                              <v-btn fab x-small v-on="on" class="danger" elevation="0"
                                @click="remove(item)">
                                <v-icon>mdi-trash-can-outline </v-icon>
                              </v-btn>
                            </template>
                            <span>
                              {{ $t("container.list.remove") }}
                            </span>
                          </v-tooltip>

                        
                        </template>
                      </v-data-table>
              
                  </v-col> -->
                   <v-col cols="12" v-if="selectedWards.length > 0">
                      <v-data-table :headers="headersWard" :items="selectedWardsDetails" :search="search">
                          <template v-slot:item.sl="{ item, index }">
                            {{

                              index + 1

                            }}
                          </template>
                    
                 
                  
               
                     <template v-slot:item.action="{ item }">
                            <v-tooltip top>
                              <template v-slot:activator="{ on }">
                                <v-btn fab x-small v-on="on" class="danger" elevation="0"
                                  @click="remove(item)">
                                  <v-icon>mdi-trash-can-outline </v-icon>
                                </v-btn>
                              </template>
                              <span>
                                {{ $t("container.list.remove") }}
                              </span>
                            </v-tooltip>

                        
                          </template>
                        </v-data-table>
              
                    </v-col>
                   <v-col cols="12" v-if="selectedWards_UCDUpazila.length > 0">
                      <v-data-table :headers="headersWard_ucd_upazila" :items="selectedWardsDetails_UCDUpazila" :search="search">
                          <template v-slot:item.sl_ucd_upazila="{ item, index }">
                            {{

                              index + 1

                            }}
                          </template>
                    
                 
                  
               
                     <template v-slot:item.action_ucd_upazila="{ item }">
                            <v-tooltip top>
                              <template v-slot:activator="{ on }">
                                <v-btn fab x-small v-on="on" class="danger" elevation="0"
                                  @click="remove_ucd_upazila(item)">
                                  <v-icon>mdi-trash-can-outline </v-icon>
                                </v-btn>
                              </template>
                              <span>
                                {{ $t("container.list.remove") }}
                              </span>
                            </v-tooltip>

                        
                          </template>
                        </v-data-table>
              
                    </v-col>
                </v-row>



                <v-row class="mx-0 my-0 py-2 mt-5" justify="center">
                  <v-btn flat @click="dialogEdit = false" outlined class="custom-btn-width py-2 mr-10">
                    {{ $t("container.list.cancel") }}
                  </v-btn>
                  <v-btn type="submit" flat color="primary" :disabled="invalid" :loading="loading"
                    class="custom-btn-width black white--text py-2">
                    {{ $t("container.list.submit") }}
                  </v-btn>
                </v-row>
              </form>
            </ValidationObserver>
          </v-card-text>
        </v-card>
      </v-dialog>
      <!-- office Edit modal  -->


      <!-- office Edit modal  -->
      <!-- <v-dialog v-model="dialogEdit" width="650">
        <v-card style="justify-content: center; text-align: center">
          <v-card-title class="font-weight-bold justify-center">
            {{ $t("container.system_config.demo_graphic.office.edit") }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="mt-7">
            <v-row> </v-row>

            <ValidationObserver ref="formEdit" v-slot="{ invalid }">
              <form @submit.prevent="updateOffice()">
                <v-row>
                  <v-col lg="6" md="6" cols="12">
                    <ValidationProvider name="OfficeType" vid="officeType" rules="required" v-slot="{ errors }">
                      <v-autocomplete :hide-details="errors[0] ? false : true" @input="onChangeOfficeType($event)"
                        v-model="data.office_type" outlined :label="$t(
                          'container.system_config.demo_graphic.office.office_type'
                        )
                          " :items="officeType" item-text="value_en" item-value="id" required
                        :error="errors[0] ? true : false" :error-messages="errors[0]"></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="6" md="6" cols="12" v-if="office_type_id == 6 ||
                    office_type_id == 7 ||
                    office_type_id == 8 ||
                    office_type_id == 9 ||
                    office_type_id == 10 ||
                    office_type_id == 11
                    ">
                    <ValidationProvider name="Division" vid="division" rules="required" v-slot="{ errors }">
                      <v-autocomplete :hide-details="errors[0] ? false : true" @input="onChangeDivision($event)"
                        v-model="data.division_id" outlined :label="$t(
                          'container.system_config.demo_graphic.division.division'
                        )
                          " :items="divisions" item-text="name_en" item-value="id" required
                        :error="errors[0] ? true : false" :error-messages="errors[0]"></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="6" md="6" cols="12" v-if="office_type_id == 7 ||
                    office_type_id == 8 ||
                    office_type_id == 9 ||
                    office_type_id == 10 ||
                    office_type_id == 11
                    ">
                    <ValidationProvider name="District" vid="district" rules="required" v-slot="{ errors }">
                      <v-autocomplete :hide-details="errors[0] ? false : true" outlined v-model="data.district_id"
                        @input="onChangeDistrict($event)" :label="$t(
                          'container.system_config.demo_graphic.district.district'
                        )
                          " :items="districts" item-text="name_en" item-value="id" required
                        :error="errors[0] ? true : false" :error-messages="errors[0]"></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                
                  <v-col lg="6" md="6" cols="12" v-if="data.office_type === 35">
                    <ValidationProvider name="city" vid="city_corpo_id" rules="required" v-slot="{ errors }">
                      <v-autocomplete :hide-details="errors[0] ? false : true" v-model="data.city_corpo_id"
                        @change="onChangeCity($event)" outlined :label="$t('container.system_config.demo_graphic.office.city')
                          " :items="city" item-text="name_en" item-value="id" required :error="errors[0] ? true : false"
                        :error-messages="errors[0]"></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="6" md="6" cols="12">
                    <ValidationProvider name="Office Name English" vid="name_en" rules="required" v-slot="{ errors }">
                      <v-text-field outlined type="text" :hide-details="errors[0] ? false : true" v-model="data.name_en"
                        :label="$t(
                          'container.system_config.demo_graphic.office.name_en'
                        )
                          " required :error="errors[0] ? true : false" :error-messages="errors[0]"></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="6" md="6" cols="12">
                    <ValidationProvider name="Office Name Bangla" vid="name_bn" rules="required" v-slot="{ errors }">
                      <v-text-field :hide-details="errors[0] ? false : true" outlined type="text" v-model="data.name_bn"
                        :label="$t(
                          'container.system_config.demo_graphic.office.name_bn'
                        )
                          " required :error="errors[0] ? true : false" :error-messages="errors[0]"></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="6" md="6" cols="12">
                    <ValidationProvider name="Office Address" vid="office_address" rules="required" v-slot="{ errors }">
                      <v-text-field :hide-details="errors[0] ? false : true" outlined type="text"
                        v-model="data.office_address" :label="$t(
                          'container.system_config.demo_graphic.office.office_address'
                        )
                          " required :error="errors[0] ? true : false" :error-messages="errors[0]"></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="6" md="6" cols="12">
                    <ValidationProvider name="Comment" vid="comment" v-slot="{ errors }">
                      <v-text-field :hide-details="errors[0] ? false : true" outlined type="text" v-model="data.comment"
                        :label="$t(
                          'container.system_config.demo_graphic.office.comment'
                        )
                          " :error="errors[0] ? true : false" :error-messages="errors[0]"></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="6" md="6" cols="12">
                    <ValidationProvider name="Status" vid="status" v-slot="{ errors }">
                      <v-checkbox v-model="data.status" :label="$t(
                        'container.system_config.demo_graphic.office.active'
                      )
                        " color="green" value="1" :hide-details="errors[0] ? false : true"
                        :error="errors[0] ? true : false" :error-messages="errors[0]"></v-checkbox>
                    </ValidationProvider>
                  </v-col>
                </v-row>

                <v-row class="mx-0 my-0 py-2" justify="center">
                  <v-btn flat @click="dialogEdit = false" outlined class="custom-btn-width py-2 mr-10">
                    {{ $t("container.list.cancel") }}
                  </v-btn>
                  <v-btn type="submit" flat color="primary" :disabled="invalid" :loading="loading"
                    class="custom-btn-width black white--text py-2">
                    {{ $t("container.list.submit") }}
                  </v-btn>
                </v-row>
              </form>
            </ValidationObserver>
          </v-card-text>
        </v-card>
      </v-dialog> -->
      <!-- office Edit modal  -->

      <!-- delete modal  -->
      <v-dialog v-model="deleteDialog" width="350">
        <v-card style="justify-content: center; text-align: center">
          <v-card-title class="font-weight-bold justify-center">
            {{ $t("container.system_config.demo_graphic.office.delete") }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <div class="subtitle-1 font-weight-medium mt-5">
              {{
                $t("container.system_config.demo_graphic.office.delete_alert")
              }}
            </div>
          </v-card-text>
          <v-card-actions style="display: block">
            <v-row class="mx-0 my-0 py-2" justify="center">
              <v-btn text @click="deleteDialog = false" outlined class="custom-btn-width py-2 mr-10">
                {{ $t("container.list.cancel") }}
              </v-btn>
              <v-btn text @click="deleteOffice($event)" color="white" :loading="delete_loading"
                class="custom-btn-width black white--text py-2">
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
  title: "CTM - Office",
  data() {
    return {
      data: {
        id: null,
        name_en: null,
        name_bn: null,
       
        office_type: null,
        office_address: null,
        comment: null,
        status: "0",
        division_id: null,
        district_id: null,
        location_type: null,
        city_id: null,
        thana_id: null,
        dist_pouro_id:null,
        selectedWards: [
        
       
        ],
        sub_location_type: null,
      
      },
      thanas_for_edit:[],
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
      // office_type_id: null,
      //extra work for city
                // Selected wards
      edit: [],
      selectedWardsDetails: [],
      selectedWards: [],
      selectedWards_UCDUpazila:[],
      selectedWardsDetails_UCDUpazila: [],

      districts: [],
      cities: [],
      offices: [],
      officeType: [],
      upazilas: [],
      cities: [],
      thanas: [],
      final_wards:[],
      wards: [],
      final_wards_ucd_upazila:[],
      wards_ucd_upazila: [],
      dist_pouros:[],
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
      sortBy: "name_en",
      sortDesc: false, //ASC
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
          text: this.$t("container.system_config.demo_graphic.office.name_en"),
          value: "name_en",
          class: "highlight-column ",
        },
        {
          text: this.$t("container.system_config.demo_graphic.office.name_bn"),
          value: "name_bn",
        },
        {
          text: this.$t(
            "container.system_config.demo_graphic.office.office_type"
          ),
          value: "office_type.value_en",
          sortable: false,
        },
        {
          text: this.$t(
            "container.system_config.demo_graphic.office.office_address"
          ),
          value: "office_address",
          sortable: false,
        },
        {
          text: this.$t("container.system_config.demo_graphic.office.status"),
          value: "status",
          sortable: false,

        },
        {
          text: this.$t("container.list.action"),
          value: "actions",
          align: "center",
          sortable: false,
          width: "13%",
        },
      ];
    },
    headersWard() {
      return [
           {
          text: this.$t("container.list.sl"),
          value: "sl",
          align: "start",
          sortable: false,
        },
      
        {
          text: this.$t("container.system_config.demo_graphic.division.division"),
          value: "division",

        },
        {
          text: this.$t("container.system_config.demo_graphic.district.district"),
          value: "district",
        },
        {
          text: this.$t(
            "container.system_config.demo_graphic.ward.city"
          ),
          value: "city",
          sortable: false,
        },
        {
          text: this.$t(
            "container.system_config.demo_graphic.ward.thana"
          ),
          value: "thana",
          sortable: false,
        },
        {
          text: this.$t(
            "container.system_config.demo_graphic.ward.ward"
          ),
          value: "ward",
          sortable: false,
        },
     {
          text: this.$t("container.list.action"),
          value: "action",
      
          sortable: false,
        },
       
      ];
    },
     headersWard_edit() {
      return [
        {
          text: this.$t("container.list.sl"),
          value: "sl_edit",
          align: "start",
          sortable: false,
        },

        {
          text: this.$t("container.system_config.demo_graphic.division.division"),
          value: "parent.parent.parent.parent.parent.name_en",

        },
        {
          text: this.$t("container.system_config.demo_graphic.district.district"),
          value: "parent.parent.parent.parent.name_en",
        },
        {
          text: this.$t(
            "container.system_config.demo_graphic.ward.city"
          ),
          value: "parent.parent.parent.name_en",
          sortable: false,
        },
        {
          text: this.$t(
            "container.system_config.demo_graphic.ward.thana"
          ),
          value: "parent.parent.name_en",
          sortable: false,
        },
        {
          text: this.$t(
            "container.system_config.demo_graphic.ward.ward"
          ),
          value: "parent.name_en",
          sortable: false,
        },
        {
          text: this.$t("container.list.action"),
          value: "action_edit",

          sortable: false,
        },

      ];
    },
     headersWard_ucd_upazila() {
      return [
        {
          text: this.$t("container.list.sl"),
          value: "sl_ucd_upazila",
          align: "start",
          sortable: false,
        },

        {
          text: this.$t("container.system_config.demo_graphic.division.division"),
          value: "division_ucd_upazila",

        },
        {
          text: this.$t("container.system_config.demo_graphic.district.district"),
          value: "district_ucd_upazila",
        },
        {
          text: this.$t(
            "container.system_config.demo_graphic.ward.upazila"
          ),
          value: "upazila",
          sortable: false,
        },
        {
          text: this.$t(
            "container.system_config.demo_graphic.ward.union"
          ),
          value: "union",
          sortable: false,
        },
           {
          text: this.$t(
            "container.system_config.demo_graphic.ward.pouro"
          ),
          value: "pouro",
          sortable: false,
        },
        
        {
          text: this.$t(
            "container.system_config.demo_graphic.ward.ward"
          ),
          value: "ward_ucd_upazila",
          sortable: false,
        },
        {
          text: this.$t("container.list.action"),
          value: "action_ucd_upazila",

          sortable: false,
        },

      ];
    },


    ...mapState({
      divisions: (state) => state.Division.divisions,
    }),
    filteredOptions() {
      // Apply your filter logic here, e.g., filtering out options with 'Option 2' label
      return this.locationType.filter(
        (option) => option.value_en !== "District Pouroshava"
      );
    },
  },
  methods: {
    async onChangePouro($event){
       await this.$axios
        .get(`/admin/ward/get/pouro/${$event}`, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          this.final_wards_ucd_upazila = result.data.data;
           this.wards_ucd_upazila = this.wards_ucd_upazila.concat(result.data.data);
           console.log(this.wards_ucd_upazila,"called pouro properly")
        
        });

    },
      async onChangeUnion($event) {
      await this.$axios
        .get(`/admin/ward/get/${$event}`, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          this.final_wards_ucd_upazila = result.data.data;
           this.wards_ucd_upazila = this.wards_ucd_upazila.concat(result.data.data);
           console.log(this.wards_ucd_upazila, "called union properly")

        });

    },
     async onChangeSubLocationType(event) {
      // alert(event);

      if (event == 1) {
        await this.$axios
          .get(`/admin/union/pouro/get/${this.data.upazila_id}`, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((result) => {
            this.pouros = result.data.data;
              this.pouros_all = result.data.data;
            this.unions = [];
            this.data.union_id = null;
            this.final_wards_ucd_upazila = [];
      
          
          });
      
      }
      if (event == 2) {
         await this.$axios
          .get(`/admin/union/get/${this.data.upazila_id}`, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((result) => {
            this.unions = result.data.data;
            this.pouros = [];
            this.unions_all = result.data.data;
            this.data.pouro_id = null;
             this.final_wards_ucd_upazila = [];
       
        
          });
       
      }
    },
 
    
    remove(item){
   
      const indexToRemove = this.selectedWards.findIndex(wardId => wardId === item.ward_id);

      // If the item is found, remove it from the selectedWards array
      if (indexToRemove !== -1) {
        this.selectedWards.splice(indexToRemove, 1);
      }
      this.onChangeWards(this.selectedWards);
    },
     remove_ucd_upazila(item) {
    
      const indexToRemove = this.selectedWards_UCDUpazila.findIndex(wardId => wardId === item.ward_id_ucd_upazila);

      // If the item is found, remove it from the selectedWards array
      if (indexToRemove !== -1) {
        this.selectedWards_UCDUpazila.splice(indexToRemove, 1);
      }
      this.onChangeWards_UCDUpazila(this.selectedWards_UCDUpazila);
    },
    onChangeWards(selectedWards) {
      console.log(this.selectedWards,"selectedWards Check in wards")
  
      this.selectedWards_UCDUpazila=[];
      // Update selectedWardsDetails based on the selectedWards
      this.selectedWardsDetails = selectedWards.map(wardId => {
        const ward = this.wards.find(w => w.id === wardId);
        const district = this.districts.find(d => d.id === this.data.district_id);
        const division = this.divisions.find(div => div.id === this.data.division_id);
        const city = this.cities.find(c => c.id === this.data.city_id);
        console.log(ward,"ward in ward")
        const thana = this.thanas.find(t => t.id === ward.parent.id);
        
  return {
          division: division.name_en,
          district: district.name_en,
          city: city.name_en,
          thana: thana.name_en,
          ward: ward.name_en,
          ward_id: ward.id,
        };
      });
      console.log(this.selectedWardsDetails,"selected ward")
    },
        onChangeWards_UCDUpazila(selectedWards_UCDUpazila) {
      // Update selectedWardsDetails based on the selectedWards
      this.selectedWards=[];
      console.log(this.selectedWards_UCDUpazila,"selectedWards_UCDUpazila");

      this.selectedWardsDetails_UCDUpazila = selectedWards_UCDUpazila.map(wardId => {
        const ward_ucd_upazila_const = this.wards_ucd_upazila.find(w => w.id === wardId);
        const district_ucd_upazila = this.districts.find(d => d.id === this.data.district_id);
        const division_ucd_upazila = this.divisions.find(div => div.id === this.data.division_id);
        const upazila = this.upazilas.find(c => c.id === this.data.upazila_id);
        const pouro = this.pouros_all?.find(t => t.id === ward_ucd_upazila_const.parent.id);
        const union = this.unions_all?.find(u => u.id === ward_ucd_upazila_const.parent.id);
        
    console.log(ward_ucd_upazila_const ,"ward_ucd_upazila_const")
    
        return {
          division_ucd_upazila: division_ucd_upazila.name_en,
          district_ucd_upazila: district_ucd_upazila.name_en,
          upazila: upazila.name_en,
          union: union?.name_en,
          pouro: pouro?.name_en,
          ward_ucd_upazila: ward_ucd_upazila_const.name_en,
          ward_id_ucd_upazila: ward_ucd_upazila_const.id,
          
        };
      });
  
    },
    submitOffice() {
      if(this.selectedWards && this.selectedWards.length > 0) {
        this.data.selectedWards = this.selectedWards;

      }
       if (this.selectedWards_UCDUpazila && this.selectedWards_UCDUpazila.length > 0) {
        this.data.selectedWards = this.selectedWards_UCDUpazila;

      }
      
  
      let fd = new FormData();
      for (const [key, value] of Object.entries(this.data)) {
        if (key === "status" && value === null) {
          fd.append(key, "0");
        }
        if (value !== null) {
          // fd.append(key, value);
          // console.log(key, value,"fd values");
          if (key == "selectedWards") {
            for (let i = 0; i < value.length; i++) {
              fd.append("selectedWards[" + i + "]", value[i]);
           
            }
          } else {
            fd.append(key, value);
          }
      
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
            this.$refs.formAdd.setErrors(data.errors);
            // this.errors = data.errors;
          }
        });
      } catch (e) {
        console.log(e);
      }
    },
    async updateOffice() {
      // let fd = new FormData();
      // for (const [key, value] of Object.entries(this.data)) {
      //   if (key === "status" && value === null) {
      //     fd.append(key, "0");
      //   }
      //   if (value !== null) {
      //     fd.append(key, value);
      //   }
      // }
       if (this.selectedWards && this.selectedWards.length > 0) {
        this.data.selectedWards = this.selectedWards;

      }
      if (this.selectedWards_UCDUpazila && this.selectedWards_UCDUpazila.length > 0) {
        this.data.selectedWards = this.selectedWards_UCDUpazila;

      }


      let fd = new FormData();
      for (const [key, value] of Object.entries(this.data)) {
        if (key === "status" && value === null) {
          fd.append(key, "0");
        }
        if (value !== null) {
          // fd.append(key, value);
          // console.log(key, value,"fd values");
          if (key == "selectedWards") {
            for (let i = 0; i < value.length; i++) {
              fd.append("selectedWards[" + i + "]", value[i]);

            }
          } else {
            fd.append(key, value);
          }

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
            this.$refs.formEdit.setErrors(data.errors);
            // this.errors = data.errors;
          }
        });
      } catch (e) {
        console.log(e);
      }
    },
   async  editOffice(item) {
        this.resetData();

      this.data.id = item.id;
      this.data.office_type = item.office_type.id;
      this.office_type_id = item.office_type.id;
      this.data.office_type = item.office_type.id;
      this.data.name_en = item.name_en;
      this.data.name_bn = item.name_bn;
      this.data.office_address = item.office_address;
      this.data.comment = item.comment;
      this.data.status = String(item.status);
       this.dialogEdit = true;
   

      if (item?.assign_location?.type == "division") {
        console.log("division here");
        this.data.division_id = item?.assign_location?.id;
          this.onChangeDivision(this.data.division_id);
        // this.data.division_id = item?.parent?.id; // 
      }
      if (item?.assign_location?.type == "district") {
        console.log("district here");
        this.data.division_id = item?.assign_location?.parent?.id;
        this.onChangeDivision(this.data.division_id);
        this.data.district_id = item?.assign_location?.id;
      }
      if (item?.assign_location?.parent?.parent?.type == "division") {
        this.data.division_id = item?.assign_location?.parent?.parent?.id;
         console.log("division here 2nd");
         await  this.onChangeDivision(this.data.division_id);
           console.log(this.districts, "districts in division here 3rd");
         
      }
  
      if (item?.assign_location?.parent?.type == "district") {
        this.data.district_id = item?.assign_location?.parent?.id;
           console.log("district here 2nd");
         await  this.onChangeDistrict(this.data.district_id);
          console.log(this.cities, "cities district here 2nd");
     
      }
      
      //  if (this.edit[0]?.wards[0]?.parent?.parent?.parent?.type == "city") {
      //   this.data.city_id = this.edit[0]?.wards[0]?.parent?.parent?.parent?.id;
      //   this.onChangeCity(this.data.city_id);
      // }
     
      //  if (this.edit[0]?.wards[0]?.parent?.parent?.parent?.type == "thana" && this.edit[0]?.wards[0]?.parent?.parent?.parent?.location_type === 2) {
      //   this.data.upazila_id = this.edit[0]?.wards[0]?.parent?.parent?.parent?.id;
      // }
      const queryParams = {
        id: item.id
      }

     await   this.$axios
        .get("/admin/office/get-ward-under-office", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
          params: queryParams,
        })
        .then((result) => {
          this.edit = result.data;


        });
      if (item?.assign_location?.location_type?.value_en == "Upazila") {
        this.data.upazila_id = item?.assign_location?.id;
           this.selectedWards_UCDUpazila = this.edit[0].wards?.map(ward => ward.ward_id);
        console.log(this.selectedWards_UCDUpazila,"upazila");
       let uniqueParentIds = new Set();

        this.edit[0].wards?.forEach((ward) => {
          if(ward.parent?.parent?.type == "pouro"){
             const parentId = ward.parent?.parent?.id;

            if (parentId !== undefined && parentId !== null && !uniqueParentIds.has(parentId)) {
              uniqueParentIds.add(parentId);
               this.data.pouro_id = parentId
              console.log(this.data.pouro_id, "Pouro id")
              this.thanas_for_edit.push(parentId);
                     setTimeout(() => {
                       this.data.pouro_id = parentId
                      
                  this.onChangeSubLocationType(1);
              }, 1000);
                   setTimeout(() => {
                this.onChangePouro(this.data.pouro_id)
                console.log(this.wards_ucd_upazila, "wards_ucd_upazila_pouro")
              }, 2000);
            }

          }
            if (ward.parent?.parent?.type == "union") {
            const parentId = ward.parent?.parent?.id;

            if (parentId !== undefined && parentId !== null && !uniqueParentIds.has(parentId)) {
              uniqueParentIds.add(parentId);
              this.data.union_id= parentId
               console.log(this.data.union_id, "Union id")
              this.thanas_for_edit.push(parentId);
                   setTimeout(() => {
                     
                    this.data.union_id = parentId
                     this.onChangeSubLocationType(2);
              }, 1000);
                 setTimeout(() => {
              this.onChangeUnion(this.data.union_id)
              console.log(this.wards_ucd_upazila, "wards_ucd_upazila_union")
              }, 2000);
            
            }

          }
         
        });
        

        setTimeout(() => {
          this.onChangeWards_UCDUpazila(this.selectedWards_UCDUpazila);
        }, 10000);
     
       
      
      }
      if (item?.assign_location?.location_type?.value_en == "City Corporation") {
      this.data.city_id = item?.assign_location?.id;
       
        this.selectedWards = this.edit[0].wards?.map(ward => ward.ward_id);
        console.log(this.selectedWards,"wards works properly or not")
       

   
    
      let uniqueParentIds = new Set();

        this.edit[0].wards?.forEach((ward) => {
          const parentId = ward.parent?.parent?.id;

          if (parentId !== undefined && parentId !== null && !uniqueParentIds.has(parentId)) {
           
        
             uniqueParentIds.add(parentId);
          //   console.log(parentId, "thana_id")
  
                   this.onChangeThana(parentId);
               
              
         
           
          }
        });
     
       
        
      setTimeout(() => {
            this.onChangeCity(this.data.city_id);
        }, 3000);   
       
    setTimeout(() => {
          this.onChangeWards(this.selectedWards);
        }, 4000);
        // setTimeout(this.onchangeWards(this.selectedWards), 5000);
      }
      if (item?.assign_location?.location_type?.value_en == "District Pouroshava") {
        this.data.dist_pouro_id = item?.assign_location?.id;
      }
   
      
      if (item?.assign_location?.location_type?.value_en == "Upazila") {
        this.data.thana_id = item?.assign_location?.id;
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

    async onChangeOfficeType($event) {
    

      if ($event === 35) {
        this.location_type = 3;
     
      }
       if ($event === 8 || $event === 10) {
        this.location_type = 2;

      }
         if ($event === 9) {
        this.location_type = 1;

      }

      if (this.data.district_id != null && this.location_type != null) {
        if (this.location_type === 2) {
          await this.$axios
            .get(`/admin/thana/get/${this.data.district_id}`, {
              headers: {
                Authorization: "Bearer " + this.$store.state.token,
                "Content-Type": "multipart/form-data",
              },
            })
            .then((result) => {
              this.upazilas = result.data.data;
              this.cities=[];
              
             
            });
        }
        if (this.location_type === 3) {
      

          this.$axios
            .get("/admin/city/get/" + this.data.district_id + "/" + this.location_type, {
              headers: {
                Authorization: "Bearer " + this.$store.state.token,
                "Content-Type": "multipart/form-data",
              },
            })
            .then((result) => {
              this.cities = result.data.data;
              console.log(this.cities,"cities called properly")
          
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        }
        if (this.location_type === 1) {
          await this.$axios
            .get("/admin/city/get/" + this.data.district_id + "/" +  this.location_type, {
              headers: {
                Authorization: "Bearer " + this.$store.state.token,
                "Content-Type": "multipart/form-data",
              },
            })
            .then((result) => {
              this.dist_pouros = result.data.data;
              this.cities = [];
              this.upazilas = [];
           
            });
        }


      }


    },
    async onChangeCity($event) {

      await this.$axios
        .get(`/admin/thana/get/city/${$event}`, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          this.final_thanas = result.data.data
          this.thanas = this.thanas.concat(result.data.data);
          console.log(this.thanas,"thana is called properly");
         

        });

    },
    async onChangeThana($event) {
      await this.$axios
        .get(`/admin/ward/get/thana/${$event}`, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
           console.log(this.wards, "faka array check");
          this.final_wards= result.data.data
          console.log(this.final_wards, "final_wards thanaedit wards");
           this.wards = this.wards.concat(result.data.data);
          
          console.log(this.wards, " wards thanaedit wards");

        });

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

        console.log(this.districts," district function called properly")
        });
    },
    async onChangeDistrict($event) {


      this.onChangeOfficeType(this.data.office_type);

      //juned vai
      // event = 3; //Lookup.id = 3 , Look.name_en = 'City Corporation'
      // const payload = {
      //   district_id: this.data.district_id,
      //   lookup_id: "3",
      // };
      // console.log(JSON.stringify(payload));
      // // return;
      // if (
      //   this.office_type_id == 8 ||
      //   this.office_type_id == 10 ||
      //   this.office_type_id == 11
      // ) {
      //   console.log("load Upazila");
      //   this.GetAllUpazila(this.data.district_id);
      // } else {
      //   console.log("load City Corporation");
      //   await this.$axios
      //     .get(`/admin/city/get/` + this.data.district_id + "/" + event, {
      //       headers: {
      //         Authorization: "Bearer " + this.$store.state.token,
      //         "Content-Type": "multipart/form-data",
      //       },
      //     })
      //     .then((result) => {
      //       this.city = result.data.data;
      //       console.log(this.city, "onChangeDistrict");
      //     });
      // }


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
      // alert(event);

      if (event == 1) {
        await this.$axios
          .get(`/admin/union/pouro/get/${this.thana_id_search}`, {
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
        this.onChangeUpazilaChange(this.thana_id_search);
        this.pouro_id_search = null;
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

      console.log(sortBy, sortDesc);
      this.sortBy = "name_en";
      this.sortDesc = "asc";
      if (sortBy.length === 0 || sortDesc.length === 0) {
        this.sortBy = "name_en";
        this.sortDesc = "asc";
      } else {
        this.sortBy = sortBy[0];
        this.sortDesc = sortDesc[0] == true ? "desc" : "asc";
      }
      this.GetOffices();

      const queryParams = {
        sortBy: this.sortBy,
        orderBy: this.sortDesc,
      };

      // alert(JSON.stringify(queryParams));
    },

    async GetOffices() {
      const queryParams = {
        searchText: this.search,
        perPage: this.pagination.perPage,
        page: this.pagination.current,
        sortBy: this.sortBy,
        sortDesc: this.sortDesc,
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
          console.log(result, "office");
          this.offices = result.data.data;
          console.log(this.offices, "Get Office");
          this.pagination.current = result.data.meta.current_page;
          this.pagination.total = result.data.meta.last_page;
          this.pagination.grand_total = result.data.meta.total;
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
    deleteOffice: async function () {
      await this.$store
        .dispatch("Office/DestroyOffice", this.delete_id)
        .then((res) => {
          // console.log(res);
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
          if (error.response?.data?.errors) {
            this.$refs.form.setErrors(error.response.data.errors);
          }
          console.log(error.response);
          this.$toast.error(error?.response?.data?.message);
        });
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
      this.data.city_id = null;
      this.data.dist_pouro_id = null
      this.data.upazila_id = null
      this.data.union_id = null
      this.data.pouro_id = null
      this.data.dist_pouro_id=null
      this.data.thana_id = null
      this.data.selectedWards=[];
      this.data.selectedWards_UCDUpazila = [];
      this.divisions = [];
      this.districts = [];
      this.cities = [];
      this.final_wards = [];
      this.final_thanas = [];
      this.selectedWards = [];
      this.selectedWards_UCDUpazila=[];
      this.selectedWardsDetails_UCDUpazila= [];
      this.final_wards_ucd_upazila= [];
      this.wards_ucd_upazila= [];
      this.dist_pouros= [];
      this.unions_all= [];
      this.pouros_all = [];
                     
      
      },
 
    updateHeaderTitle() {
      const title = this.$t("container.system_config.demo_graphic.office.list");
      this.$store.commit("setHeaderTitle", title);
    },
  },
  mounted() {
    this.setInitialHeader();
    this.$store.dispatch("getLookupByType", 3).then((data) => {
      this.officeType = data;
      console.log(this.officeType, "Office");

    });
    // this.GetOffices();
    this.GetAllDivisions();
    // this.GetLocationType();
    this.GetAllUpazila();
    // this.GetCityCorporation();
    // this.$store
    //   .dispatch("getLookupByType", 1)
    //   .then((res) => (this.locationType = res));
  },
  watch: {
    "$i18n.locale": "updateHeaderTitle",
  },
  beforeMount() {
    this.updateHeaderTitle();
  },
};
</script>
<style>
.highlight-column {
  background-color: #e0eaf1;
}
</style>
