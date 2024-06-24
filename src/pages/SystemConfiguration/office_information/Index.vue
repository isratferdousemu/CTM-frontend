<template>
  <div id="office_information">
    <v-row class="mx-5 mt-4">
      <v-col cols="12">
        <v-row>
          <Spinner :loading="isLoading" />
          <v-col cols="12">

            <v-expansion-panels>
              <v-expansion-panel class="ma-2">
                <v-expansion-panel-header color="#8C9EFF"
                  style="background-color: #1C3B68; color: white;font-size: 17px;">
                  <h3 class="white--text">
                    {{
                    $t(
                    "container.list.filter"
                    )
                    }}
                  </h3>
                </v-expansion-panel-header>
                <v-expansion-panel-content class="elevation-0 transparent mt-10">
                  <ValidationObserver ref="form" v-slot="{ invalid }">
                    <form @submit.prevent="onSearch($event)">
                      <v-row>
                        <v-col lg="3" md="3" cols="12">
                          <ValidationProvider name="OfficeType" vid="officeType" rules="" v-slot="{ errors }">
                            <v-autocomplete :hide-details="errors[0] ? false : true" @input="onChangeOfficeType($event)"
                              v-model="data.office_type" outlined :label="$t(
                          'container.system_config.demo_graphic.office.office_type'
                        )
                          " :items="officeType" item-text="value_en" item-value="id" :error="errors[0] ? true : false"
                              :error-messages="errors[0]"></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <v-col lg="3" md="3" cols="12" v-if="data.office_type === 6 ||
                    data.office_type === 7 ||
                    data.office_type === 8 ||
                    data.office_type === 35 ||
                    data.office_type === 10 ||
                    data.office_type === 11 ||
                    data.office_type === 9
                    ">
                          <ValidationProvider name="Division" vid="division" rules="" v-slot="{ errors }">
                            <v-autocomplete :hide-details="errors[0] ? false : true" @input="onChangeDivision($event)"
                              v-model="data.division_id" outlined :label="$t(
                          'container.system_config.demo_graphic.division.division'
                        )
                          " :items="divisions" item-text="name_en" item-value="id"
                              :readonly="((selectedWards.length > 0) && (data.office_type === 35)) || ((selectedWards_UCDUpazila.length > 0) && (data.office_type === 10))"
                              :error="errors[0] ? true : false" :error-messages="errors[0]"></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <v-col lg="3" md="3" cols="12" v-if="data.office_type === 7 ||
                    data.office_type === 8 ||
                    data.office_type === 35 ||
                    data.office_type === 10 ||
                    data.office_type === 11 ||
                    data.office_type === 9">
                          <ValidationProvider name="District" vid="district" rules="" v-slot="{ errors }">
                            <v-autocomplete :hide-details="errors[0] ? false : true" outlined v-model="data.district_id"
                              @input="onChangeDistrict($event)" :label="$t(
                          'container.system_config.demo_graphic.district.district'
                        )
                          " :items="districts" item-text="name_en" item-value="id" :error="errors[0] ? true : false"
                              :error-messages="errors[0]"></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <v-col lg="3" md="3" cols="12" v-if="data.office_type === 8 ||
                    data.office_type === 10 || data.office_type === 11">
                          <ValidationProvider name="Upazila" vid="upazila" rules="" v-slot="{ errors }">
                            <v-autocomplete :hide-details="errors[0] ? false : true" outlined
                              :readonly="((selectedWards.length > 0) && (data.office_type === 35)) || ((selectedWards_UCDUpazila.length > 0) && (data.office_type === 10))"
                              v-model="data.upazila_id" :label="$t(
                          'container.system_config.demo_graphic.office.upazila'
                        )
                          " :items="upazilas" item-text="name_en" item-value="id" :error="errors[0] ? true : false"
                              :error-messages="errors[0]"></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <v-col v-if="data.office_type == 10" cols="12" md="3" lg="3">
                          <ValidationProvider name="subLocationType" vid="subLocationType" rules="required"
                            v-slot="{ errors }">
                            <v-autocomplete @input="onChangeSubLocationType($event)" v-model="data.sub_location_type"
                              outlined :label="$t(
                          'container.system_config.demo_graphic.ward.subLocation_type'
                        )
                          " :items="subLocationType" item-text="value_en" item-value="id"
                              :error="errors[0] ? true : false" :error-messages="errors[0]"
                              :hide-details="errors[0] ? false : true"></v-autocomplete>
                          </ValidationProvider>
                        </v-col>

                        <v-col v-if="data.office_type == 10 && data.sub_location_type == 1
                    " cols="12" md="3" lg="3">
                          <ValidationProvider name="pourashava" vid="pouros" v-slot="{ errors }" rules="required">
                            <v-autocomplete v-model="data.pouro_id" outlined
                              :label="$t('container.system_config.demo_graphic.ward.pouro')"
                              @input="onChangePouro($event)" :items="pouros" item-text="name_en" item-value="id"
                              :error="errors[0] ? true : false" :error-messages="errors[0]"
                              :hide-details="errors[0] ? false : true"></v-autocomplete>
                          </ValidationProvider>
                        </v-col>

                        <v-col v-if="data.sub_location_type == 2 && data.office_type == 10
                    " cols="12" md="3" lg="3">
                          <ValidationProvider name="union" vid="union" v-slot="{ errors }" rules="required">
                            <v-autocomplete v-model="data.union_id" outlined
                              :label="$t('container.system_config.demo_graphic.ward.union')"
                              @input="onChangeUnion($event)" :items="unions" item-text="name_en" item-value="id"
                              :error="errors[0] ? true : false" :error-messages="errors[0]"
                              :hide-details="errors[0] ? false : true"></v-autocomplete>
                          </ValidationProvider>
                        </v-col>

                        <v-col lg="3" md="3" cols="12" v-if="data.office_type === 9">
                          <ValidationProvider name="city" vid="city_id" rules="required" v-slot="{ errors }">
                            <v-autocomplete :hide-details="errors[0] ? false : true" v-model="data.city_id"
                              @change="onChangeCity($event)" outlined :label="$t('container.system_config.demo_graphic.office.city')
                          " :items="cities" item-text="name_en" item-value="id" :error="errors[0] ? true : false"
                              :error-messages="errors[0]"></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <!--                        <v-col lg="3" md="3" cols="12" v-if="data.office_type === 9">-->
                        <!--                          <ValidationProvider name="city" vid="city_corpo_id" rules="" v-slot="{ errors }">-->
                        <!--                            <v-autocomplete :hide-details="errors[0] ? false : true" v-model="data.thana_id"-->
                        <!--                                            @change="onChangeThana($event)" outlined :label="$t('container.system_config.demo_graphic.ward.thana')-->
                        <!--                          " :items="final_thanas" item-text="name_en" item-value="id"-->
                        <!--                                            :error="errors[0] ? true : false"-->
                        <!--                                            :error-messages="errors[0]"></v-autocomplete>-->
                        <!--                          </ValidationProvider>-->
                        <!--                        </v-col>-->
                        <!--                        <v-col lg="3" md="3" cols="12" v-if="data.office_type === 9">-->
                        <!--                          <ValidationProvider name="ward" vid="ward_id" rules="" v-slot="{ errors }">-->
                        <!--                            <v-autocomplete :hide-details="errors[0] ? false : true" v-model="selectedWards"-->
                        <!--                                            @change="onChangeWards($event)" outlined :label="$t('container.system_config.demo_graphic.ward.ward')-->
                        <!--                          " :items="final_wards" item-text="name_en" item-value="id" multiple-->
                        <!--                                            :error="errors[0] ? true : false"-->
                        <!--                                            :error-messages="errors[0]"></v-autocomplete>-->
                        <!--                          </ValidationProvider>-->
                        <!--                        </v-col>-->
                        <!--                        <v-col lg="3" md="3" cols="12" v-if="data.office_type === 10">-->
                        <!--                          <ValidationProvider name="ward" vid="ward_id_upazila_ucd" rules=""-->
                        <!--                                              v-slot="{ errors }">-->
                        <!--                            <v-autocomplete :hide-details="errors[0] ? false : true" v-model="selectedWards_UCDUpazila"-->
                        <!--                                            @change="onChangeWards_UCDUpazila($event)" outlined :label="$t('container.system_config.demo_graphic.ward.ward')-->
                        <!--                          " :items="final_wards_ucd_upazila" item-text="name_en" item-value="id" multiple-->
                        <!--                                            :error="errors[0] ? true : false"-->
                        <!--                                            :error-messages="errors[0]"></v-autocomplete>-->
                        <!--                          </ValidationProvider>-->
                        <!--                        </v-col>-->


                        <v-col lg="3" md="3" cols="12" v-if="data.office_type === 35">
                          <ValidationProvider name="District Pourashava" vid="upazila" rules="" v-slot="{ errors }">
                            <v-autocomplete :hide-details="errors[0] ? false : true" outlined
                              v-model="data.dist_pouro_id" :label="$t(
                          'container.system_config.demo_graphic.ward.dist_pouro'
                        )
                          " :items="dist_pouros" item-text="name_en" item-value="id" :error="errors[0] ? true : false"
                              :error-messages="errors[0]"></v-autocomplete>
                          </ValidationProvider>
                        </v-col>

                        <v-col lg="3" md="3" cols="12">
                          <v-row class="ml-1 mr-1">
                            <v-menu ref="menu" v-model="menu" :close-on-content-click="false"
                              transition="scale-transition" offset-y min-width="auto">
                              <template v-slot:activator="{ on, attrs }">
                                <v-text-field v-model="dates" :append-icon="menu ? 'mdi-calendar' : 'mdi-calendar'"
                                  :label="$t('container.application_selection_dashboard.enter_start_end_date')" readonly
                                  v-bind="attrs" v-on="on"></v-text-field>
                              </template>
                              <v-date-picker v-model="dates" :range="[dates[0] , dates[1]]" no-title scrollable
                                ref="datePicker">
                                <v-spacer></v-spacer>
                                <v-btn text color="primary" @click="resetDateRange">
                                  Cancel
                                </v-btn>
                                <v-btn text color="primary" @click="$refs.menu.save(dates)">
                                  OK
                                </v-btn>
                              </v-date-picker>
                            </v-menu>
                          </v-row>
                        </v-col>

                      </v-row>

                      <div class="d-inline d-flex justify-end mt-3">

                        <v-btn elevation="2" class="btn mr-2" @click="resetSearch">{{
                          $t("container.list.reset")
                          }}
                        </v-btn>
                        <v-btn elevation="2" color="success" type="submit" class="btn">
                          {{ $t("container.list.search") }}
                        </v-btn>
                      </div>
                    </form>
                  </ValidationObserver>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>

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

                  <!-- Dropdown on the right -->

                  <v-col lg="4" md="6" cols="12" class="text-right">
                    <v-btn elevation="2" class="btn mr-2 white--text" flat color="red darken-4" @click="GeneratePdf()">
                      <v-icon class="pr-1"> mdi-tray-arrow-down </v-icon> {{ $t("container.list.PDF") }}
                    </v-btn>
                    <v-btn elevation="2" flat class="btn mr-2 white--text" color="teal darken-2"
                      @click="GenerateExcel()">
                      <v-icon class="pr-1"> mdi-tray-arrow-down </v-icon>
                      {{ $t("container.list.excel") }}
                    </v-btn>
                  </v-col>

                  <v-btn @click="dialogOpen" flat color="primary" prepend-icon="mdi-account-multiple-plus"
                    v-can="'office-create'">
                    {{ $t("container.list.add_new") }}
                  </v-btn>
                  <v-col cols="12">
                    {{ $t('container.list.total') }}:&nbsp;<span style="font-weight: bold;">{{ $i18n.locale == 'en' ?
                      this.pagination.grand_total : $helpers.englishToBangla(this.pagination.grand_total) }}</span>
                  </v-col>
                  <v-col cols="12">
                    <v-data-table :loading="loading" item-key="id" :headers="headers" :items="offices"
                      :items-per-page="pagination.perPage" @update:options="handleOptionsUpdate" hide-default-footer
                      class="elevation-0 transparent row-pointer">
                      <template v-slot:item.id="{ item, index }">
                        {{$i18n.locale == "en" ? ((pagination.current - 1) * pagination.perPage + index + 1) :
                        $helpers.englishToBangla((pagination.current - 1) * pagination.perPage + index + 1) }}
                      </template>

                      <template v-slot:item.status="{ item }">
                        <span v-if="item?.status == '0'"> Inactive </span>
                        <span v-if="item?.status == '1'"> Active </span>
                      </template>

                      <!-- Action Button -->
                      <template v-slot:item.actions="{ item }">
                        <v-tooltip top>
                          <template v-slot:activator="{ on }">
                            <v-btn fab x-small v-on="on" color="success" elevation="0" @click="editOffice(item)"
                              v-can="'office-edit'">
                              <v-icon> mdi-account-edit-outline </v-icon>
                            </v-btn>
                          </template>
                          <span>
                            {{ $t("container.list.edit") }}
                          </span>
                        </v-tooltip>

                        <v-tooltip top>
                          <template v-slot:activator="{ on }">
                            <v-btn fab x-small v-on="on" color="grey" class="ml-3 white--text" elevation="0"
                              @click="deleteAlert(item.id)" v-can="'office-delete'">
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
                    data.office_type === 35 ||
                    data.office_type === 10 ||
                    data.office_type === 11 ||
                    data.office_type === 9
                    ">
                    <ValidationProvider name="Division" vid="division" rules="required" v-slot="{ errors }">
                      <v-autocomplete :hide-details="errors[0] ? false : true" @input="onChangeDivision($event)"
                        v-model="data.division_id" outlined :label="$t(
                          'container.system_config.demo_graphic.division.division'
                        )
                          " :items="divisions" item-text="name_en" item-value="id" required
                        :readonly="((selectedWards.length > 0) && (data.office_type === 35)) || ((selectedWards_UCDUpazila.length > 0) && (data.office_type === 10))"
                        :error="errors[0] ? true : false" :error-messages="errors[0]"></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="6" md="6" cols="12" v-if="data.office_type === 7 ||
                    data.office_type === 8 ||
                    data.office_type === 35 ||
                    data.office_type === 10 ||
                    data.office_type === 11 ||
                    data.office_type === 9">
                    <ValidationProvider name="District" vid="district" rules="required" v-slot="{ errors }">
                      <v-autocomplete :hide-details="errors[0] ? false : true" outlined v-model="data.district_id"
                        @input="onChangeDistrict($event)" :label="$t(
                          'container.system_config.demo_graphic.district.district'
                        )
                          " :items="districts" item-text="name_en" item-value="id" required
                        :error="errors[0] ? true : false" :error-messages="errors[0]"></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="6" md="6" cols="12" v-if="data.office_type === 8 ||
                    data.office_type === 10 || data.office_type === 11">
                    <ValidationProvider name="Upazila" vid="upazila" rules="required" v-slot="{ errors }">
                      <v-autocomplete :hide-details="errors[0] ? false : true" outlined
                        :readonly="((selectedWards.length > 0) && (data.office_type === 35)) || ((selectedWards_UCDUpazila.length > 0) && (data.office_type === 10))"
                        v-model="data.upazila_id" :label="$t(
                          'container.system_config.demo_graphic.office.upazila'
                        )
                          " :items="upazilas" item-text="name_en" item-value="id" required
                        :error="errors[0] ? true : false" :error-messages="errors[0]"></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <v-col v-if="data.office_type == 10" cols="12" md="6" lg="6">
                    <ValidationProvider name="subLocationType" vid="subLocationTypeEdit" rules="required"
                      v-slot="{ errors }">
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
                    " cols="12" md="6" lg="6">
                    <ValidationProvider name="pouros" vid="pouros" rules="required" v-slot="{ errors }">
                      <v-autocomplete v-model="data.pouro_id" outlined
                        :label="$t('container.system_config.demo_graphic.ward.pouro')" @input="onChangePouro($event)"
                        :items="pouros" item-text="name_en" item-value="id" required :error="errors[0] ? true : false"
                        :error-messages="errors[0]" :hide-details="errors[0] ? false : true"></v-autocomplete>
                    </ValidationProvider>
                  </v-col>

                  <v-col v-if="data.sub_location_type == 2 && data.office_type == 10
                    " cols="12" md="6" lg="6">
                    <ValidationProvider name="union" vid="union_id" rules="required" v-slot="{ errors }">
                      <v-autocomplete v-model="data.union_id" outlined
                        :label="$t('container.system_config.demo_graphic.ward.union')" @input="onChangeUnion($event)"
                        :items="unions" item-text="name_en" item-value="id" required :error="errors[0] ? true : false"
                        :error-messages="errors[0]" :hide-details="errors[0] ? false : true"></v-autocomplete>
                    </ValidationProvider>
                  </v-col>

                  <v-col lg="6" md="6" cols="12" v-if="data.office_type === 9">
                    <ValidationProvider name="city" vid="city_id" rules="required" v-slot="{ errors }">
                      <v-autocomplete :hide-details="errors[0] ? false : true" v-model="data.city_id"
                        @change="onChangeCity($event)" outlined :label="$t('container.system_config.demo_graphic.office.city')
                          " :items="cities" item-text="name_en" item-value="id" required
                        :error="errors[0] ? true : false" :error-messages="errors[0]"></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="6" md="6" cols="12" v-if="data.office_type === 9">
                    <ValidationProvider name="thana" vid="thana_id" rules="required" v-slot="{ errors }">
                      <v-autocomplete :hide-details="errors[0] ? false : true" v-model="data.thana_id"
                        @change="onChangeThana($event)" outlined :label="$t('container.system_config.demo_graphic.ward.thana')
                          " :items="final_thanas" item-text="name_en" item-value="id" required
                        :error="errors[0] ? true : false" :error-messages="errors[0]"></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="6" md="6" cols="12" v-if="data.office_type === 9">
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
                  </v-col>


                  <v-col lg="6" md="6" cols="12" v-if="data.office_type === 35">
                    <ValidationProvider name="District Pourashava" vid="dist_pouro_id" rules="required"
                      v-slot="{ errors }">
                      <v-autocomplete :hide-details="errors[0] ? false : true" outlined v-model="data.dist_pouro_id"
                        :label="$t(
                          'container.system_config.demo_graphic.ward.dist_pouro'
                        )
                          " :items="dist_pouros" item-text="name_en" item-value="id" required
                        :error="errors[0] ? true : false" :error-messages="errors[0]"></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="6" md="6" cols="12">
                    <ValidationProvider name="Office Name English" vid="name_en" rules="required|checkName"
                      v-slot="{ errors }">
                      <v-text-field outlined type="text" :hide-details="errors[0] ? false : true" v-model="data.name_en"
                        :label="$t(
                          'container.system_config.demo_graphic.office.name_en'
                        )
                          " required :error="errors[0] ? true : false" :error-messages="errors[0]"></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="6" md="6" cols="12">
                    <ValidationProvider name="Office Name Bangla" vid="name_bn" rules="required|checkNameBn"
                      v-slot="{ errors }">
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

                        index + 1

                        }}
                      </template>




                      <template v-slot:item.action="{ item }">
                        <v-tooltip top>
                          <template v-slot:activator="{ on }">
                            <v-btn fab x-small v-on="on" class="danger" elevation="0" @click="remove(item)">
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
                    <v-data-table :headers="headersWard_ucd_upazila" :items="selectedWardsDetails_UCDUpazila"
                      :search="search">
                      <template v-slot:item.sl_ucd_upazila="{ item, index }">
                        {{

                        index + 1

                        }}
                      </template>




                      <template v-slot:item.action_ucd_upazila="{ item }">
                        <v-tooltip top>
                          <template v-slot:activator="{ on }">
                            <v-btn fab x-small v-on="on" class="danger" elevation="0" @click="remove_ucd_upazila(item)">
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

            <ValidationObserver ref="formEdit" v-slot="{ invalid }">
              <form @submit.prevent="updateOffice()">
                <v-row>
                  <v-col lg="6" md="6" cols="12">
                    <ValidationProvider name="OfficeType" vid="officeType" rules="required" v-slot="{ errors }">
                      <v-autocomplete :hide-details="errors[0] ? false : true" @input="onChangeOfficeType($event)"
                        v-model="data.office_type" outlined :label="$t(
                          'container.system_config.demo_graphic.office.office_type'
                        )
                          " :items="officeType" item-text="value_en" item-value="id" :error="errors[0] ? true : false"
                        :error-messages="errors[0]"></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="6" md="6" cols="12" v-if="data.office_type === 6 ||
                    data.office_type === 7 ||
                    data.office_type === 8 ||
                    data.office_type === 35 ||
                    data.office_type === 10 ||
                    data.office_type === 11 ||
                    data.office_type === 9
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
                  <v-col lg="6" md="6" cols="12" v-if="data.office_type === 7 ||
                    data.office_type === 8 ||
                    data.office_type === 9 ||
                    data.office_type === 10 ||
                    data.office_type === 11 ||
                    data.office_type === 35">
                    <ValidationProvider name="District" vid="district" rules="required" v-slot="{ errors }">
                      <v-autocomplete :hide-details="errors[0] ? false : true" outlined v-model="data.district_id"
                        @input="onChangeDistrict($event)" :label="$t(
                          'container.system_config.demo_graphic.district.district'
                        )
                          " :items="districts" item-text="name_en" item-value="id" required
                        :error="errors[0] ? true : false" :error-messages="errors[0]"></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="6" md="6" cols="12" v-if="data.office_type === 8 ||
                    data.office_type === 10">
                    <ValidationProvider name="Upazila" vid="upazila" rules="required" v-slot="{ errors }">
                      <v-autocomplete :hide-details="errors[0] ? false : true" outlined
                        :readonly="((selectedWards.length > 0) && (data.office_type === 9)) || ((selectedWards_UCDUpazila.length > 0) && (data.office_type === 10))"
                        v-model="data.upazila_id" :label="$t(
                          'container.system_config.demo_graphic.office.upazila'
                        )
                          " :items="upazilas" item-text="name_en" item-value="id" required
                        :error="errors[0] ? true : false" :error-messages="errors[0]"></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <v-col v-if="data.office_type == 10" cols="12" md="6" lg="6">
                    <ValidationProvider name="subLocationType" vid="subLocationType" v-slot="{ errors }"
                      rules="required">
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
                    " cols="12" md="6" lg="6">
                    <ValidationProvider name="Pourashava" vid="pouros" v-slot="{ errors }" rules="required">
                      <v-autocomplete v-model="data.pouro_id" outlined
                        :label="$t('container.system_config.demo_graphic.ward.pouro')" @input="onChangePouro($event)"
                        :items="pouros" item-text="name_en" item-value="id" :error="errors[0] ? true : false"
                        :error-messages="errors[0]" :hide-details="errors[0] ? false : true"></v-autocomplete>
                    </ValidationProvider>
                  </v-col>

                  <v-col v-if="data.sub_location_type == 2 && data.office_type == 10
                    " cols="12" md="6" lg="6">
                    <ValidationProvider name="union" vid="union_id" v-slot="{ errors }" rules="required">
                      <v-autocomplete v-model="data.union_id" outlined
                        :label="$t('container.system_config.demo_graphic.ward.union')" @input="onChangeUnion($event)"
                        :items="unions" item-text="name_en" item-value="id" :error="errors[0] ? true : false"
                        :error-messages="errors[0]" :hide-details="errors[0] ? false : true"></v-autocomplete>
                    </ValidationProvider>
                  </v-col>

                  <v-col lg="6" md="6" cols="12" v-if="data.office_type === 9">
                    <ValidationProvider name="city" vid="city_id" rules="required" v-slot="{ errors }">
                      <v-autocomplete :hide-details="errors[0] ? false : true" v-model="data.city_id"
                        @change="onChangeCity($event)" outlined :label="$t('container.system_config.demo_graphic.office.city')
                          " :items="cities" item-text="name_en" item-value="id" required
                        :error-messages="errors[0]"></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="6" md="6" cols="12" v-if="data.office_type === 9">
                    <ValidationProvider name="thana" vid="thana_id" v-slot="{ errors }" rules="required">
                      <v-autocomplete :hide-details="errors[0] ? false : true" v-model="data.thana_id"
                        @change="onChangeThana($event)" outlined :label="$t('container.system_config.demo_graphic.ward.thana')
                          " :items="final_thanas" item-text="name_en" item-value="id" :error="errors[0] ? true : false"
                        :error-messages="errors[0]"></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="6" md="6" cols="12" v-if="data.office_type === 9">
                    <ValidationProvider name="ward" vid="selectedWards_edit" v-slot="{ errors }" rules="required">
                      <v-autocomplete :hide-details="errors[0] ? false : true" v-model="selectedWards_edit"
                        @change="onChangeWards_edit($event)" outlined :label="$t('container.system_config.demo_graphic.ward.ward')
                          " :items="final_wards" item-text="name_en" item-value="id" multiple
                        :error="errors[0] ? true : false" :error-messages="errors[0]"></v-autocomplete>
                    </ValidationProvider>
                    <div v-if="message" class="red--text">{{ message }}</div>
                  </v-col>
                  <v-col lg="6" md="6" cols="12" v-if="data.office_type === 10">
                    <ValidationProvider name="ward" vid="selectedWards_UCDUpazila_edit" v-slot="{ errors }"
                      rules="required">
                      <v-autocomplete :hide-details="errors[0] ? false : true" rules="required"
                        v-model="selectedWards_UCDUpazila_edit" @change="onChangeWards_UCDUpazila_edit($event)" outlined
                        :label="$t('container.system_config.demo_graphic.ward.ward')
                          " :items="final_wards_ucd_upazila" item-text="name_en" item-value="id" multiple
                        :error="errors[0] ? true : false" :error-messages="errors[0]"></v-autocomplete>
                    </ValidationProvider>
                    <div v-if="message" class="red--text">{{ message }}</div>
                  </v-col>
                  <v-col lg="6" md="6" cols="12" v-if="data.office_type === 35">
                    <ValidationProvider name="District Pourashava" vid="dist_pouro_id" rules="required"
                      v-slot="{ errors }">
                      <v-autocomplete :hide-details="errors[0] ? false : true" outlined v-model="data.dist_pouro_id"
                        :label="$t(
                          'container.system_config.demo_graphic.ward.dist_pouro'
                        )
                          " :items="dist_pouros" item-text="name_en" item-value="id" required
                        :error="errors[0] ? true : false" :error-messages="errors[0]"></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="6" md="6" cols="12">
                    <ValidationProvider name="Office Name English" vid="name_en" rules="required|checkName"
                      v-slot="{ errors }">
                      <v-text-field outlined type="text" :hide-details="errors[0] ? false : true" v-model="data.name_en"
                        :label="$t(
                          'container.system_config.demo_graphic.office.name_en'
                        )
                          " required :error="errors[0] ? true : false" :error-messages="errors[0]"></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="6" md="6" cols="12">
                    <ValidationProvider name="Office Name Bangla" vid="name_bn" rules="required|checkNameBn"
                      v-slot="{ errors }">
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
                    <!-- <h1>{{ selectedWardsDetails }}</h1> -->
                    <v-data-table :headers="headersWard" :items="selectedWardsDetails" :search="search">
                      <template v-slot:item.sl="{ item, index }">
                        {{

                        index + 1

                        }}
                      </template>




                      <template v-slot:item.action="{ item }">
                        <v-tooltip top>
                          <template v-slot:activator="{ on }">
                            <v-btn fab x-small v-on="on" class="danger" elevation="0" @click="remove(item)">
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
                    <v-data-table :headers="headersWard_ucd_upazila" :items="selectedWardsDetails_UCDUpazila"
                      :search="search">
                      <template v-slot:item.sl_ucd_upazila="{ item, index }">
                        {{

                        index + 1

                        }}
                      </template>




                      <template v-slot:item.action_ucd_upazila="{ item }">
                        <v-tooltip top>
                          <template v-slot:activator="{ on }">
                            <v-btn fab x-small v-on="on" class="danger" elevation="0" @click="remove_ucd_upazila(item)">
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
                class="custom-btn-width warning white--text py-2">
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

import Spinner from "@/components/Common/Spinner.vue";

extend("required", required);

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
  message: "Only Bangla Character is allowed in this field",
});

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
        dist_pouro_id: null,
        pouro_id: null,
        selectedWards: [


        ],
        sub_location_type: null,
        selectedWardsDetails_UCDUpazila: [],

      },

      officeInfo: [],

      //for edit info in data table
      districtInfo: [],
      cityInfo: [],
      thanaInfo: [],
      infoward: [],

      isLoading: false,
      thanas_for_edit: [],
      subLocationType: [
        {
          id: 1,
          value_en: "Pourashava",
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
      selectedWardsDetails: [
        // {
        //   division: 22,
        //   district: 33,
        //   city: 44,
        //   thana: 55,
        //   ward: 66,
        //   ward_id: 77,

        // }

      ],
      selectedWards: [],
      selectedWards_edit: [],
      selectedWards_UCDUpazila: [],
      selectedWards_UCDUpazila_edit: [],
      selectedWardsDetails_UCDUpazila: [],
      message: null,
      districts: [],
      cities: [],
      offices: [],
      Alloffices: [],
      officeType: [],
      upazilas: [],
      cities: [],
      thanas: [],
      final_wards: [],
      wards: [],
      final_wards_ucd_upazila: [],
      wards_ucd_upazila: [],
      dist_pouros: [],
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
      dates: [],
      sortBy: "name_en",
      sortDesc: false, //ASC
      items: [5, 10, 15, 20, 40, 50, 100],
    };
  },
  components: {
    ValidationProvider,
    ValidationObserver,
    Spinner
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
          value: this.$i18n.locale == "en" ? "office_type.value_en" : "office_type.value_bn",
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

    async GeneratePdf() {

      const queryParams = {
        searchText: this.search,
        perPage: this.search.trim() === '' ? this.pagination.grand_total : this.pagination.grand_total,
        page: 1,
        sortBy: this.sortBy,
        sortDesc: this.sortDesc,
        user_id: this.$store.state.userData.id,
      };
      await this.$axios
        .get("/admin/office/get", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
          params: queryParams,
        })
        .then((result) => {
          this.Alloffices = result.data.data;
          this.pagination.grand_total = result.data.total;
        })
        .catch((err) => {
          console.log(err, "error");

        });

      const HeaderInfo = [
        this.$t("container.list.sl"),
        this.$t("container.system_config.demo_graphic.office.code"),
        this.$t("container.system_config.demo_graphic.office.office_type"),
        this.$t("container.system_config.demo_graphic.office.office_name"),
        this.$t("container.system_config.demo_graphic.division.division"),
        this.$t("container.system_config.demo_graphic.district.district"),
      ]

      const OBJ = this.Alloffices;

      const CustomInfo = OBJ.map((((i, index) => {
        return [
          this.$i18n.locale == 'en' ? index + 1 : this.$helpers.englishToBangla(index + 1),
          this.$i18n.locale == 'en' ? i.assign_location_id : this.$helpers.englishToBangla(i.assign_location_id),
          this.$i18n.locale == 'en' ? i.office_type?.value_en : i.office_type?.value_bn,
          this.$i18n.locale == 'en' ? i.name_en : i.name_bn,
          this.$i18n.locale == 'en' ? i.assign_location?.parent?.parent?.name_en : i.assign_location?.parent?.parent?.name_bn,
          this.$i18n.locale == 'en' ? i.assign_location?.parent?.name_en : i.assign_location?.parent?.name_bn,
        ]
      })));

      const queryParam = {
        language: this.$i18n.locale,
        data: CustomInfo,
        header: HeaderInfo,
        fileName: this.$t("container.system_config.demo_graphic.office.list"),
      };

      try {
        const response = await this.$axios.post("/admin/generate-pdf", queryParam, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "application/json", // Set content type to JSON
          },
          responseType: 'arraybuffer',
        });

        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url, '_blank');
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        console.error('Error generating PDF:', error);
      }
    },

    async GenerateExcel() {
      // this.isLoading = true;
      const queryParams = {
        language: this.$i18n.locale,
        searchText: this.search,
        perPage: this.search.trim() === '' ? this.pagination.grand_total : this.pagination.grand_total,
        page: 1,
        sortBy: this.sortBy,
        sortDesc: this.sortDesc,
        user_id: this.$store.state.userData.id,
      };

      await this.$axios
        .get("/admin/office/get", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
          params: queryParams,
        })
        .then((result) => {
          this.Alloffices = result.data.data;
        })
        .catch(error => {
          this.isLoading = false;
        });

      try {
        import('@/plugins/Export2Excel').then((excel) => {
          const OBJ = this.Alloffices;

          const CustomInfo = OBJ.map(((i, index) => {
            return {
              "sl": queryParams.language == 'en' ? index + 1 : this.$helpers.englishToBangla(index + 1),
              "office_id": queryParams.language == 'en' ? i.assign_location_id : this.$helpers.englishToBangla(i.assign_location_id),
              "office_type": queryParams.language == 'en' ? i.office_type?.value_en : i.office_type?.value_bn,
              "office_name": queryParams.language == 'en' ? i.name_en : i.name_bn,
              "division_name": queryParams.language == 'en' ? i.assign_location?.parent?.parent?.name_en : i.assign_location?.parent?.parent?.name_bn,
              "district_name": queryParams.language == 'en' ? i.assign_location?.parent?.name_en : i.assign_location?.parent?.name_bn,
            }
          }));

          const Header = [
            this.$t("container.list.sl"),
            this.$t("container.system_config.demo_graphic.office.code"),
            this.$t("container.system_config.demo_graphic.office.office_type"),
            this.$t("container.system_config.demo_graphic.office.office_name"),
            this.$t("container.system_config.demo_graphic.division.division"),
            this.$t("container.system_config.demo_graphic.district.district"),
          ]

          const Field = ['sl', 'office_id', 'office_type', 'office_name', 'division_name', 'district_name']

          const Data = this.FormatJson(Field, CustomInfo)
          const currentDate = new Date().toISOString().slice(0, 10); //
          let dateinfo = queryParams.language == 'en' ? currentDate : this.$helpers.englishToBangla(currentDate)

          const filenameWithDate = `${dateinfo}_${this.$t("container.system_config.demo_graphic.office.list")}`;

          excel.export_json_to_excel({
            header: Header,
            data: Data,
            sheetName: filenameWithDate,
            filename: filenameWithDate,
            autoWidth: true,
            bookType: "xlsx"
          })
        })
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
        FilterData.map((j => {
          return v[j];
        })))
    },


    async onChangePouro($event) {
      await this.$axios
        .get(`/admin/ward/get/pouro/${$event}`, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          this.selectedWards_UCDUpazila_edit = this.selectedWards_UCDUpazila
          this.final_wards_ucd_upazila = result.data.data;
          this.wards_ucd_upazila = this.wards_ucd_upazila.concat(result.data.data);
        });

    },
    async onChangePouro_1($event) {
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
          this.selectedWards_UCDUpazila_edit = this.selectedWards_UCDUpazila
          this.final_wards_ucd_upazila = result.data.data;
          this.wards_ucd_upazila = this.wards_ucd_upazila.concat(result.data.data);
        });

    },
    async onChangeUnion_1($event) {
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
            this.data.pouro_id = null;
            this.data.union_id = null;
            this.pouros_all = result.data.data;
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
            this.data.union_id = null;
            this.data.pouro_id = null;
            this.unions_all = result.data.data;
            this.final_wards_ucd_upazila = [];
          });

      }
    },

    remove(item) {
      const index = this.selectedWardsDetails.findIndex(ward => ward.ward_id === item.ward_id);
      if (index !== -1) {
        this.selectedWardsDetails.splice(index, 1);
      }
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
      const division = this.divisions.find(div => div.id === this.data.division_id);
      const district = this.districts.find(d => d.id === this.data.district_id);
      const city = this.cities.find(c => c.id === this.data.city_id);

      selectedWards.forEach(wardId => {
        const ward = this.wards.find(w => w.id === wardId);
        const thana = this.thanas.find(t => t.id === ward?.parent?.id);

        // Create a unique identifier for the current entry
        const entryIdentifier = `${division?.id}_${district?.id}_${city?.id}_${thana?.id}_${ward?.id}`;

        // Check if the entry already exists in selectedWardsDetails
        const isDuplicate = this.selectedWardsDetails.some(info => {
          const existingIdentifier = `${info.division_id}_${info.district_id}_${info.city_id}_${info.thana_id}_${info.ward_id}`;
          return existingIdentifier === entryIdentifier;
        });

        // If it's not a duplicate, add it to selectedWardsDetails
        if (!isDuplicate) {
          const info = {
            division: division?.name_en,
            division_id: division?.id,
            district: district?.name_en,
            district_id: district?.id,
            city: city?.name_en,
            city_id: city?.id,
            thana: thana?.name_en,
            thana_id: thana?.id,
            ward: ward?.name_en,
            ward_id: ward?.id,
          };
          this.selectedWardsDetails.push(info);
        }
      });
      // console.log(this.selectedWardsDetails,"selectedWardsDetails")
    },

    onChangeWards_edit(selectedWards) {
      const division = this.divisions.find(div => div.id === this.data.division_id);
      const district = this.districts.find(d => d.id === this.data.district_id);
      const city = this.cities.find(c => c.id === this.data.city_id);

      selectedWards.forEach(wardId => {
        // Find the ward object
        const ward = this.wards.find(w => w.id === wardId);
        if (!ward) {
          return; // Skip to the next iteration
        }

        // Find the thana object
        const thana = this.thanas.find(t => t.id === ward?.parent?.id);
        if (!thana) {
          return; // Skip to the next iteration
        }

        // Create a unique identifier for the current entry
        const entryIdentifier = `${division?.id}_${district?.id}_${city?.id}_${thana?.id}_${ward?.id}`;

        // Check if the entry already exists in selectedWardsDetails
        const isDuplicate = this.selectedWardsDetails.some(info => {
          const existingIdentifier = `${info.division_id}_${info.district_id}_${info.city_id}_${info.thana_id}_${info.ward_id}`;

          return existingIdentifier === entryIdentifier;
        });


        // If it's not a duplicate, add it to selectedWardsDetails
        if (!isDuplicate) {
          const info = {
            division: division?.name_en,
            division_id: division?.id,
            district: district?.name_en,
            district_id: district?.id,
            city: city?.name_en,
            city_id: city?.id,
            thana: thana?.name_en,
            thana_id: thana?.id,
            ward: ward?.name_en,
            ward_id: ward?.id,
            // Include the unique identifier
            identifier: entryIdentifier,
          };
          this.selectedWardsDetails.push(info);
        } else {
          this.$toast.error(`Already Exists`);
        }
      });
    },


    onChangeWards_UCDUpazila_edit(selectedWards_UCDUpazila_edit) {
      // Update selectedWardsDetails based on the selectedWards
      this.selectedWards = [];
      this.selectedWardsDetails_UCDUpazila = selectedWards_UCDUpazila_edit.map(wardId => {
        const ward_ucd_upazila_const = this.wards_ucd_upazila.find(w => w.id === wardId);
        const district_ucd_upazila = this.districts.find(d => d.id === this.data.district_id);
        const division_ucd_upazila = this.divisions.find(div => div.id === this.data.division_id);
        const upazila = this.upazilas.find(c => c.id === this.data.upazila_id);
        const pouro = this.pouros_all?.find(t => t.id === ward_ucd_upazila_const?.parent?.id);
        const union = this.unions_all?.find(u => u.id === ward_ucd_upazila_const?.parent?.id);
        return {
          division_ucd_upazila: division_ucd_upazila.name_en,
          district_ucd_upazila: district_ucd_upazila.name_en,
          upazila: upazila.name_en,
          union: union?.name_en,
          pouro: pouro?.name_en,
          ward_ucd_upazila: ward_ucd_upazila_const?.name_en,
          ward_id_ucd_upazila: ward_ucd_upazila_const?.id,

          division_id: division_ucd_upazila.id,
          district_id: district_ucd_upazila.id,
          upazila_id: upazila.id,
          union_id: union?.id,
          pouro_id: pouro?.id,
          ward_id: ward_ucd_upazila_const.id,

        };
      });

      this.selectedWards_UCDUpazila = this.selectedWards_UCDUpazila_edit;

    },
    onChangeWards_UCDUpazila(selectedWards_UCDUpazila) {
      // Update selectedWardsDetails based on the selectedWards
      this.selectedWards = [];
      this.selectedWardsDetails_UCDUpazila = selectedWards_UCDUpazila.map(wardId => {
        const ward_ucd_upazila_const = this.wards_ucd_upazila.find(w => w.id === wardId);
        const district_ucd_upazila = this.districts.find(d => d.id === this.data.district_id);
        const division_ucd_upazila = this.divisions.find(div => div.id === this.data.division_id);
        const upazila = this.upazilas.find(c => c.id === this.data.upazila_id);
        const pouro = this.pouros_all?.find(t => t.id === ward_ucd_upazila_const?.parent?.id);
        const union = this.unions_all?.find(u => u.id === ward_ucd_upazila_const?.parent?.id);

        return {
          division_ucd_upazila: division_ucd_upazila.name_en,
          district_ucd_upazila: district_ucd_upazila.name_en,
          upazila: upazila.name_en,
          union: union?.name_en,
          pouro: pouro?.name_en,
          ward_ucd_upazila: ward_ucd_upazila_const?.name_en,
          ward_id_ucd_upazila: ward_ucd_upazila_const?.id,

          division_id: division_ucd_upazila.id,
          district_id: district_ucd_upazila.id,
          upazila_id: upazila.id,
          union_id: union?.id,
          pouro_id: pouro?.id,
          ward_id: ward_ucd_upazila_const.id,

        };
      });


    },
    submitOffice() {
      if (this.selectedWards && this.selectedWards.length > 0) {
        this.data.selectedWards = this.selectedWards;

      }
      if (this.selectedWards_UCDUpazila && this.selectedWards_UCDUpazila.length > 0) {
        this.data.selectedWards = this.selectedWards_UCDUpazila;
        this.data.selectedWardsDetails_UCDUpazila = JSON.stringify(this.selectedWardsDetails_UCDUpazila)

      }


      let fd = new FormData();
      for (const [key, value] of Object.entries(this.data)) {

        if (key === "status" && value === null) {
          fd.append(key, "0");
        }
        if (value !== null) {
          // fd.append(key, value);
          if (key == "selectedWards") {
            for (let i = 0; i < value.length; i++) {
              fd.append("selectedWards[" + i + "]", value[i]);

            }
          } else {
            fd.append(key, value);
          }

        }
      }

      var x = this.selectedWardsDetails;
      fd.append("selectedWardsDetails", JSON.stringify(this.selectedWardsDetails));
      try {
        this.$store.dispatch("Office/StoreOffice", fd).then((data) => {
          if (data == null) {
            this.$toast.success("Data Inserted Successfully");
            this.dialogAdd = false;
            this.resetData();
            this.GetOffices();
          } else {
             this.$toast.error(data.errors);
            console.log(data.errors,'data.errors');
            this.$refs.formAdd.setErrors(data.errors);
            // this.errors = data.errors;
          }
        });
      } catch (e) {
        console.log(e);
      }
    },

    resetDateRange() {
      this.dates = [];
      this.$refs.menu.save();
    },

    async updateOffice() {
      if (this.data.office_type === 9 && this.selectedWards_edit && this.selectedWards_edit.length > 0) {
        this.data.selectedWards = this.selectedWards_edit;

      }
      else if (this.data.office_type === 9 && this.selectedWards_edit && this.selectedWards_edit.length === 0) {
        this.data.selectedWards = this.selectedWards;
      }
      //console.log(this.data.selectedWards, "this.data.selectedWards")
      if (this.data.office_type === 10) {
        this.data.selectedWards = this.selectedWards_UCDUpazila_edit;
        this.data.selectedWardsDetails_UCDUpazila = JSON.stringify(this.selectedWardsDetails_UCDUpazila)

      }

      if ((this.data.selectedWards.length === 0 && this.data.office_type === 10) || (this.data.selectedWards.length === 0 && this.data.office_type === 9)) {
        this.message = "wards need to add under this Office type"
      }
      else {
        this.message = null;
      }

      if (this.message === null) {
        let fd = new FormData();
        for (const [key, value] of Object.entries(this.data)) {
          if (key === "status" && value === null) {
            fd.append(key, "0");
          }
          if (value !== null) {

            if (key == "selectedWards") {
              for (let i = 0; i < value.length; i++) {
                fd.append("selectedWards[" + i + "]", value[i]);

              }
            } else {
              fd.append(key, value);
            }

          }
        }
        fd.append("selectedWardsDetails", JSON.stringify(this.selectedWardsDetails));
        try {
          this.$store.dispatch("Office/UpdateOffice", fd).then((data) => {
            if (data == null) {
              this.$toast.success("Data Updated Successfully");
              this.dialogEdit = false;
              this.resetData();
              this.GetOffices();
            } else {
              this.$refs.formEdit.setErrors(data.errors);

            }
          });
        } catch (e) {
          console.log(e);
        }
      }
    },
    async editOffice(item) {

      if (this.$refs.formEdit) {
        this.$refs.formEdit.reset();
      }
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
        this.data.division_id = item?.assign_location?.id;
        this.onChangeDivision(this.data.division_id);
      }
      if (item?.assign_location?.type == "district") {
        this.data.division_id = item?.assign_location?.parent?.id;
        this.onChangeDivision(this.data.division_id);
        this.data.district_id = item?.assign_location?.id;
      }
      if (item?.assign_location?.parent?.parent?.type == "division") {
        this.data.division_id = item?.assign_location?.parent?.parent?.id;
        await this.onChangeDivision(this.data.division_id);
      }

      if (item?.assign_location?.parent?.type == "district") {
        this.data.district_id = item?.assign_location?.parent?.id;
        await this.onChangeDistrict(this.data.district_id);
      }

      if (this.edit[0]?.wards[0]?.parent?.parent?.parent?.type == "city") {
        this.data.city_id = this.edit[0]?.wards[0]?.parent?.parent?.parent?.id;
        this.onChangeCity(this.data.city_id);
      }

      if (this.edit[0]?.wards[0]?.parent?.parent?.parent?.type == "thana" && this.edit[0]?.wards[0]?.parent?.parent?.parent?.location_type === 2) {
        this.data.upazila_id = this.edit[0]?.wards[0]?.parent?.parent?.parent?.id;
      }

      const queryParams = {
        id: item.id
      }

      await this.$axios
        .get("/admin/office/get-ward-under-office", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
          params: queryParams,
        })
        .then((result) => {
          this.edit = result.data;
          return false;
        });

      if (item?.assign_location?.location_type?.value_en == "Upazila") {
        this.data.upazila_id = item?.assign_location?.id;
        this.selectedWards_UCDUpazila = this.edit[0].wards?.map(ward => ward.ward_id);
        let uniqueParentIds = new Set();

        this.edit[0].wards?.forEach((ward) => {
          if (ward.parent?.parent?.type == "pouro") {
            const parentId = ward.parent?.parent?.id;

            if (parentId !== undefined && parentId !== null && !uniqueParentIds.has(parentId)) {
              uniqueParentIds.add(parentId);
              this.data.pouro_id = parentId

              setTimeout(() => {
                this.data.pouro_id = parentId

                this.onChangeSubLocationType(1);
              }, 2000);
              setTimeout(() => {
                this.onChangePouro_1(parentId)
              }, 3000);
            }

          }
          if (ward.parent?.parent?.type == "union") {
            const parentId = ward.parent?.parent?.id;

            if (parentId !== undefined && parentId !== null && !uniqueParentIds.has(parentId)) {
              uniqueParentIds.add(parentId);
              this.data.union_id = parentId
              this.thanas_for_edit.push(parentId);
              setTimeout(() => {
                this.data.union_id = parentId

                this.onChangeSubLocationType(2);
              }, 2000);
              setTimeout(() => {
                this.onChangeUnion_1(parentId)
              }, 3000);

            }

          }

        });


        setTimeout(() => {
          this.onChangeWards_UCDUpazila(this.selectedWards_UCDUpazila);
        }, 10000);



      }
      if (item?.assign_location?.location_type?.value_en == "City Corporation") {
        this.data.city_id = item?.assign_location?.id;
        // this.selectedWards = this.edit[0].wards?.map(ward => ward.ward_id);
        this.selectedWards = this.edit[0].wards?.map(ward => ({
          ward_id: ward.ward_id,
          city_id: ward.city_id,
          division_id: ward.division_id,
          district_id: ward.district_id
        }));

        setTimeout(() => {
          this.onChangeCity(this.data.city_id);
        }, 3000);
      }
      if (item?.assign_location?.location_type?.value_en == "District Pouroshava") {
        this.data.dist_pouro_id = item?.assign_location?.id;
      }


      if (item?.assign_location?.location_type?.value_en == "Upazila") {
        this.data.thana_id = item?.assign_location?.id;
      }

      this.selectedWardsDetails = [];
      let info = [];
      for (const wardId of item.wards) {
        try {

          const division = this.divisions.find(div => div.id === wardId.division_id);
          const infodistrict = await this.$axios.get(`/admin/district/get/${wardId.division_id}`, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          });
          this.districtInfo = infodistrict.data.data;
          const district = this.districtInfo.find(d => d.id === wardId.district_id);

          const infocity = await this.$axios.get(`/admin/city/get/${wardId.district_id}/${3}`, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          });
          this.cityInfo = infocity.data.data;
          const city = this.cityInfo.find(c => c.id === wardId.city_id);


          const infothana = await this.$axios.get(`/admin/thana/get/city/${city?.id}`, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          });
          this.thanaInfo = infothana.data.data;
          const thana = this.thanaInfo.find(c => c.id === wardId?.thana_id);

          const infoward = await this.$axios.get(`/admin/ward/get/thana/${wardId?.thana_id}`, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          });
          this.infoward = infoward.data.data;
          const ward = this.infoward.find(c => c.id === wardId?.ward_id);

          info = {
            division: division?.name_en,
            division_id: division?.id,
            district: district?.name_en,
            district_id: district?.id,
            city: city?.name_en,
            city_id: city?.id,
            thana: thana?.name_en,
            thana_id: thana?.id,
            ward: ward?.name_en,
            ward_id: ward?.id,

          }
          this.selectedWardsDetails.push(info)
          // console.log(this.selectedWardsDetails,"selectedWardsDetails")

          // Do something with district
        } catch (error) {
          console.error("Error fetching district info:", error);
        }
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
      try {
        this.$store
          .dispatch("Thana/GetAllUpazilaByDistrict", id)
          .then((data) => {
            this.upazilas = data;
          });
      } catch (e) {
        console.log(e);
      }
    },

    async onChangeOfficeType($event) {

      if ($event === 9) {
        this.location_type = 3;
      }
      if ($event === 8 || $event === 10 || $event === 11) {
        this.location_type = 2;
      }
      if ($event === 35) {
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
              this.upazilas = [];
              this.upazilas = result.data.data;
              this.cities = [];
              this.dist_pouros = [];
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
              this.cities = [];
              this.cities = result.data.data;
              this.dist_pouros = [];
              this.upazilas = [];
              this.thanas = [];
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        }
        if (this.location_type === 1) {
          await this.$axios
            .get("/admin/city/get/" + this.data.district_id + "/" + this.location_type, {
              headers: {
                Authorization: "Bearer " + this.$store.state.token,
                "Content-Type": "multipart/form-data",
              },
            })
            .then((result) => {
              this.dist_pouros = [];
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
          this.data.thana_id = null;
          this.thanas = [];
          this.thanas = this.thanas.concat(result.data.data);
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
          this.selectedWards_edit = this.selectedWards
          this.final_wards = result.data.data
          this.wards = this.wards.concat(result.data.data);
        });

    },
    async onChangeThana_1($event) {
      await this.$axios
        .get(`/admin/ward/get/thana/${$event}`, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          this.final_wards = result.data.data
          this.wards = this.wards.concat(result.data.data);
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
          this.districts= null;
          this.districts = result.data.data;
        });
    },
    async onChangeDistrict($event) {
      this.onChangeOfficeType(this.data.office_type);
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
        } else {
          this.headers[i].class = "";
        }
      }
    },

    onSearch() {
      this.loading = false;
      this.pagination = {
        ...this.pagination,
        current: 1,
      };
      this.GetOffices()
    },

    resetSearch(){

      this.data.office_type = null,
      this.data.division_id = null,
      this.data.district_id = null,
      this.data.location_type = null,
      this.data.city_id = null,
      this.data.thana_id = null,
      this.data.upazila_id = null,
      this.data.union_id = null,
      this.data.dist_pouro_id = null,
     this.data.pouro_id = null,
      this.data.sub_location_type = null,
      this.data.selectedWards = [],

          this.resetDateRange(),
          this.GetOffices()

    },

    handleOptionsUpdate({ sortBy, sortDesc }) {
      for (let i = 0; i < this.headers.length; i++) {
        if (this.headers[i].value == sortBy) {
          this.headers[i].class = "highlight-column";
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
      this.GetOffices();

      const queryParams = {
        sortBy: this.sortBy,
        orderBy: this.sortDesc,
      };
    },
    async GetOffices() {
      this.isLoading = true;
      const queryParams = {
        searchText: this.search,
        perPage: this.pagination.perPage,
        page: this.pagination.current,
        sortBy: this.sortBy,
        sortDesc: this.sortDesc,
        user_id: this.$store.state.userData.id,

        office_type: this.data.office_type,
        division_id: this.data.division_id,
        district_id: this.data.district_id,
        location_type: this.data.location_type,
        city_id: this.data.city_id,
        thana_id: this.data.thana_id,
        upazila_id: this.data.upazila_id,
        union_id: this.data.union_id,
        dist_pouro_id: this.data.dist_pouro_id,
        pouro_id: this.data.pouro_id,
        sub_location_type: this.data.sub_location_type,
        wards: this.data.selectedWards,
        from_date: this.dates[0],
        to_date: this.dates[1],
      };
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
          this.pagination.current = result.data.current_page;
          this.pagination.total = result.data.last_page;
          this.pagination.grand_total = result.data.total;
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          console.log(err, "error");

        });
    },
    deleteOffice: async function () {
      await this.$store
        .dispatch("Office/DestroyOffice", this.delete_id)
        .then((res) => {
          if (res?.data?.success) {
            this.$toast.success(res.data.message);
          } else {
            this.$toast.error(res.data.message);
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
      this.message = null;
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
      this.data.dist_pouro_id = null
      this.data.thana_id = null
      this.data.selectedWards = [];
      this.data.selectedWards_UCDUpazila = [];
      this.divisions = [];
      this.districts = [];
      this.cities = [];
      this.final_wards = [];
      this.final_thanas = [];
      this.selectedWards = [];
      this.selectedWards_edit = [];
      this.selectedWards_UCDUpazila = [];
      this.selectedWards_UCDUpazila_edit = [];
      this.selectedWardsDetails_UCDUpazila = [];
      this.final_wards_ucd_upazila = [];
      this.wards_ucd_upazila = [];
      this.dist_pouros = [];
      this.unions_all = [];
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
    });

    this.GetAllDivisions();
    this.GetAllUpazila();
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
