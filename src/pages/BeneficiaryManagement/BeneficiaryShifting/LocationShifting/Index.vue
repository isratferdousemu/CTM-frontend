<template>
  <div id="information_tracking">
    <v-row class="mx-5 mt-2">
      <v-col cols="12">
        <div class="d-block text-right mb-2">
          <v-btn v-can="'beneficiaryShifting-create'" elevation="2" class="mr-2 btn" color="primary" router
            to="/beneficiary-management/beneficiary-shifting">
            {{
            $t(
              "container.beneficiary_management.beneficiary_shifting.title_program_shifting"
            )
          }}
          </v-btn>

          <v-btn v-can="'beneficiaryShifting-view'" elevation="2" class="btn" color="primary" router
            to="/beneficiary-management/beneficiary-location-shifting-list">
            {{ $t("container.list.view-list") }}
          </v-btn>
        </div>
        <ValidationObserver ref="form" v-slot="{ invalid }">
          <form @submit.prevent="addByBeneficiaryInTable">
            <v-row>
              <v-col cols="12">
                <v-card elevation="10" color="white" rounded="md" theme="light">

                  <v-card-title tag="div" style="
                  background-color: #1c3b68;
                  color: white;
                  margin-bottom: 17px;
                  font-size: 17px;
                ">
                    <h3 class="white--text text-uppercase pt-3">
                      {{ $t("container.beneficiary_management.beneficiary_shifting.title") }}
                    </h3>
                  </v-card-title>




                  <v-card-text>
                    <div>
                      <v-row>
                        <v-col lg="6" md="6" cols="12">
                          <ValidationProvider name="Division" vid="division" v-slot="{ errors }">
                            <v-text-field outlined readonly v-model="user_permission.division.name_en" :label="$t(
            'container.system_config.demo_graphic.division.division'
          )
            " v-if="user_permission.division">
                            </v-text-field>
                            <v-autocomplete v-if="!user_permission.division" outlined @input="onChangeDivision($event)"
                              v-model="data.division_id" :label="$t(
            'container.system_config.demo_graphic.division.division'
          )
            " :items="divisions" item-text="name_en" item-value="id" :error="errors[0] ? true : false"
                              :error-messages="errors[0]" class="no-arrow-icon" :append-icon-cb="appendIconCallback"
                              append-icon="mdi-plus">
                            </v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <v-col lg="6" md="6" cols="12">
                          <ValidationProvider name="District" vid="district" v-slot="{ errors }">
                            <v-text-field outlined readonly v-model="user_permission.division.name_en" :label="$t(
            'container.system_config.demo_graphic.district.district'
          )
            " v-if="user_permission.district">
                            </v-text-field>
                            <v-autocomplete v-if="!user_permission.district" outlined v-model="data.district_id"
                              @input="onChangeDistrict($event)" :label="$t(
            'container.system_config.demo_graphic.district.district'
          )
            " :items="districts" item-text="name_en" item-value="id" class="no-arrow-icon"
                              :append-icon-cb="appendIconCallback" append-icon="mdi-plus"
                              :error="errors[0] ? true : false" :error-messages="errors[0]"></v-autocomplete>
                          </ValidationProvider>
                        </v-col>

                        <v-col lg="6" md="6" cols="12">
                          <ValidationProvider name="Location Type" vid="location_type" v-slot="{ errors }">
                            <v-text-field outlined readonly v-model="user_permission.location_type.value_en"
                              :label="$t('container.list.location_type')" v-if="user_permission.location_type">
                            </v-text-field>
                            <v-autocomplete v-if="!user_permission.location_type" @input="LocationType($event)"
                              v-model="data.location_type" outlined :label="$t('container.list.location_type')"
                              :items="locationType" item-text="value_en" item-value="id" class="no-arrow-icon"
                              :append-icon-cb="appendIconCallback" append-icon="mdi-plus"
                              :error="errors[0] ? true : false" :error-messages="errors[0]"></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <v-col v-if="data.location_type == 1" lg="6" md="6" cols="12">
                          <ValidationProvider name="thana" vid="district_pourashava_id" v-slot="{ errors }">
                            <v-text-field outlined readonly v-model="user_permission.district_pourashava.name_en
            " :label="$t(
            'container.system_config.demo_graphic.ward.pouro'
          )
            " v-if="user_permission.location_type">
                            </v-text-field>
                            <v-autocomplete v-if="!user_permission.district_pourashava"
                              v-model="data.district_pourashava_id" outlined :label="$t(
            'container.system_config.demo_graphic.ward.pouro'
          )
            " @change="onChangeDistrictPouro($event)" :items="district_pouros" item-text="name_en" item-value="id"
                              class="no-arrow-icon" :append-icon-cb="appendIconCallback" append-icon="mdi-plus"
                              :error="errors[0] ? true : false" :error-messages="errors[0]"></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <v-col v-if="data.location_type == 2" lg="6" md="6" cols="12">
                          <ValidationProvider name="Upazila" vid="thana_id" v-slot="{ errors }">
                            <v-text-field outlined readonly v-model="user_permission.upazila.name_en" :label="$t(
            'container.system_config.demo_graphic.thana.thana'
          )
            " v-if="user_permission.upazila">
                            </v-text-field>
                            <v-autocomplete v-if="!user_permission.upazila" v-model="data.thana_id" outlined :label="$t(
            'container.system_config.demo_graphic.thana.thana'
          )
            " @change="onChangeUpazila($event)" :items="thanas" item-text="name_en" item-value="id"
                              class="no-arrow-icon" :append-icon-cb="appendIconCallback" append-icon="mdi-plus"
                              :error="errors[0] ? true : false" :error-messages="errors[0]"></v-autocomplete>
                          </ValidationProvider>
                        </v-col>

                        <v-col v-if="data.location_type == 2" lg="6" md="6" cols="12">
                          <ValidationProvider name="subLocationType" vid="subLocationType" v-slot="{ errors }">
                            <v-autocomplete @input="onChangeSubLocationType($event)" v-model="data.sub_location_type"
                              outlined :label="$t(
            'container.system_config.demo_graphic.ward.subLocation_type'
          )
            " :items="subLocationType" item-text="value_en" item-value="id" :error="errors[0] ? true : false"
                              :error-messages="errors[0]" :hide-details="errors[0] ? false : true" class="no-arrow-icon"
                              :append-icon-cb="appendIconCallback" append-icon="mdi-plus"></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <v-col v-if="data.location_type == 2 &&
            data.sub_location_type == 1
            " lg="6" md="6" cols="12">
                          <ValidationProvider name="pouros" vid="pouros" v-slot="{ errors }">
                            <v-autocomplete v-model="data.pouro_id" outlined :label="$t(
            'container.system_config.demo_graphic.ward.pouro'
          )
            " :items="pouros" item-text="name_en" item-value="id" :error="errors[0] ? true : false"
                              :error-messages="errors[0]" :hide-details="errors[0] ? false : true" class="no-arrow-icon"
                              :append-icon-cb="appendIconCallback" append-icon="mdi-plus"></v-autocomplete>
                          </ValidationProvider>
                        </v-col>

                        <v-col v-if="data.sub_location_type == 2 &&
            data.location_type == 2
            " lg="6" md="6" cols="12">
                          <ValidationProvider name="unions" vid="unions" v-slot="{ errors }">
                            <v-autocomplete @input="onChangeUnionGetWard($event)" v-model="data.union_id" outlined
                              :label="$t(
            'container.system_config.demo_graphic.ward.union'
          )
            " :items="unions" item-text="name_en" item-value="id" :error="errors[0] ? true : false"
                              :error-messages="errors[0]" :hide-details="errors[0] ? false : true" class="no-arrow-icon"
                              :append-icon-cb="appendIconCallback" append-icon="mdi-plus"></v-autocomplete>
                          </ValidationProvider>
                        </v-col>

                        <v-col v-if="data.location_type == 3" lg="6" md="6" cols="12">
                          <ValidationProvider name="city" vid="city_id" v-slot="{ errors }">
                            <v-text-field outlined readonly v-model="user_permission.city_corp.name_en" :label="$t(
            'container.system_config.demo_graphic.ward.city'
          )
            " v-if="user_permission.city_corp">
                            </v-text-field>
                            <v-autocomplete v-if="!user_permission.city_corp" v-model="data.city_id"
                              @change="onChangeCity($event)" outlined :label="$t(
            'container.system_config.demo_graphic.ward.city'
          )
            " :items="cities" item-text="name_en" item-value="id" class="no-arrow-icon"
                              :append-icon-cb="appendIconCallback" append-icon="mdi-plus"
                              :error="errors[0] ? true : false" :error-messages="errors[0]"></v-autocomplete>
                          </ValidationProvider>
                        </v-col>

                        <v-col v-if="data.location_type == 3" lg="6" md="6" cols="12">
                          <ValidationProvider name="thana" vid="thana_id" v-slot="{ errors }">
                            <v-autocomplete v-model="data.thana_id" outlined :label="$t(
            'container.system_config.demo_graphic.ward.thana'
          )
            " @change="onChangeThana($event)" :items="thanas" item-text="name_en" item-value="id" class="no-arrow-icon"
                              :append-icon-cb="appendIconCallback" append-icon="mdi-plus"
                              :error="errors[0] ? true : false" :error-messages="errors[0]"></v-autocomplete>
                          </ValidationProvider>
                        </v-col>

                        <v-col v-if="data.location_type == 1 ||
            data.location_type == 2 ||
            data.location_type == 3
            " lg="6" md="6" cols="12">
                          <ValidationProvider name="ward" vid="ward_id" v-slot="{ errors }">
                            <v-autocomplete v-model="data.ward_id" outlined :label="$t(
            'container.system_config.demo_graphic.ward.ward'
          )
            " :items="wards" item-text="name_en" item-value="id" class="no-arrow-icon"
                              :append-icon-cb="appendIconCallback" append-icon="mdi-plus"
                              :error="errors[0] ? true : false" :error-messages="errors[0]"></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <!-- <v-col lg="6" md="6" cols="12">
                          <ValidationProvider
                            name="officeName"
                            vid="officeName"
                            v-slot="{ errors }"
                          >
                            <v-autocomplete
                              v-model="data.office_name"
                              outlined
                              :label="
                                $t(
                                  'container.system_config.demo_graphic.ward.office_name'
                                )
                              "
                              :items="officeName"
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
                        </v-col> -->
                        <v-col lg="6" md="6" cols="12">
                          <ValidationProvider name="ProgramName" vid="program_id" v-slot="{ errors }">
                            <v-autocomplete :hide-details="errors[0] ? false : true"
                              @input="onChangeProgramName($event)" v-model="data.program_id" outlined :label="$t(
            'container.application_selection.application.program'
          )
            " :items="programs" item-text="name_en" item-value="id" class="no-arrow-icon"
                              :append-icon-cb="appendIconCallback" append-icon="mdi-plus"
                              :error="errors[0] ? true : false" :error-messages="errors[0]"></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <v-col lg="6" md="6" cols="12">
                          <ValidationProvider name="Beneficiary ID" vid="beneficiary_id" v-slot="{ errors }">
                            <v-autocomplete :hide-details="errors[0] ? false : true" v-model="selected_ben_ids"
                              clearable outlined :label="$t(
            'container.beneficiary_management.beneficiary_list.beneficiary_id'
          )
            " :items="beneficiary_ids" item-text="application_id" item-value="id" required multiple
                              :error="errors[0] ? true : false" :error-messages="errors[0]">
                              <template v-slot:selection="data">
                                <v-chip :selected="data.selected" close class="chip--select-multi"
                                  @click:close="remove(data.item.id)">
                                  {{ data.item.application_id }}
                                </v-chip>
                              </template>
                            </v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <v-col lg="6" md="6" cols="12">
                          <ValidationProvider name="Effective date" vid="effective_date" v-slot="{ errors }">
                            <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40"
                              transition="scale-transition" offset-y min-width="auto">
                              <template v-slot:activator="{ on, attrs }">
                                <v-text-field outlined clearable v-model="data.effective_date" :label="$t(
            'container.beneficiary_management.beneficiary_shifting.effective_date'
          )
            " prepend-inner-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" :error="errors[0] ? true : false"
                                  :error-messages="errors[0]"></v-text-field>
                              </template>
                              <v-date-picker v-model="data.effective_date" @input="menu2 = false"></v-date-picker>
                            </v-menu>
                          </ValidationProvider>
                        </v-col>
                        <v-col lg="6" md="6" cols="12">
                          <ValidationProvider name="Shifting cause" vid="shifting_cause" v-slot="{ errors }">
                            <v-textarea :label="$t(
            'container.beneficiary_management.beneficiary_shifting.cause'
          )
            " outlined v-model="data.cause" :error="errors[0] ? true : false" :error-messages="errors[0]">
                            </v-textarea>
                          </ValidationProvider>
                        </v-col>
                      </v-row>
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </form>
        </ValidationObserver>
      </v-col>
      <v-col cols="12">
        <v-card elevation="1" outlined>
          <v-card-text>
            <ValidationObserver ref="form" v-slot="{ invalid }">
              <form @submit.prevent="submitLocationShifting()">
                <v-card outlined>
                  <v-row>
                    <v-col col="6">
                      <v-card-title>
                        <h5>
                          {{
            $t(
              "container.beneficiary_management.beneficiary_shifting.new_location"
            )
          }}
                        </h5>
                      </v-card-title>
                    </v-col>
                  </v-row>
                  <v-divider></v-divider>
                  <v-card-text>
                    <div>
                      <v-row>
                        <v-col lg="6" md="6" cols="12">
                          <ValidationProvider name="Division" vid="division" v-slot="{ errors }">
                            <v-text-field outlined readonly v-model="user_permission.division.name_en" :label="$t(
            'container.system_config.demo_graphic.division.division'
          )
            " v-if="user_permission.division">
                            </v-text-field>
                            <v-autocomplete v-if="!user_permission.division" outlined
                              @input="onChangeDivisionNewLocation($event)" v-model="new_location_data.division_id"
                              :label="$t(
            'container.system_config.demo_graphic.division.division'
          )
            " :items="divisions" item-text="name_en" item-value="id" :error="errors[0] ? true : false"
                              :error-messages="errors[0]" class="no-arrow-icon" :append-icon-cb="appendIconCallback"
                              append-icon="mdi-plus">
                            </v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <v-col lg="6" md="6" cols="12">
                          <ValidationProvider name="District" vid="district" v-slot="{ errors }">
                            <v-text-field outlined readonly v-model="user_permission.division.name_en" :label="$t(
            'container.system_config.demo_graphic.district.district'
          )
            " v-if="user_permission.district">
                            </v-text-field>
                            <v-autocomplete v-if="!user_permission.district" outlined
                              v-model="new_location_data.district_id" @input="onChangeDistrictNewLocation($event)"
                              :label="$t(
            'container.system_config.demo_graphic.district.district'
          )
            " :items="districts_new_loc" item-text="name_en" item-value="id" class="no-arrow-icon"
                              :append-icon-cb="appendIconCallback" append-icon="mdi-plus"
                              :error="errors[0] ? true : false" :error-messages="errors[0]"></v-autocomplete>
                          </ValidationProvider>
                        </v-col>

                        <v-col lg="6" md="6" cols="12">
                          <ValidationProvider name="Location Type" vid="location_type" v-slot="{ errors }">
                            <v-text-field outlined readonly v-model="user_permission.location_type.value_en"
                              :label="$t('container.list.location_type')" v-if="user_permission.location_type">
                            </v-text-field>
                            <v-autocomplete v-if="!user_permission.location_type"
                              @input="LocationTypeNewLocation($event)" v-model="new_location_data.location_type"
                              outlined :label="$t('container.list.location_type')" :items="locationType"
                              item-text="value_en" item-value="id" class="no-arrow-icon"
                              :append-icon-cb="appendIconCallback" append-icon="mdi-plus"
                              :error="errors[0] ? true : false" :error-messages="errors[0]"></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <v-col v-if="new_location_data.location_type == 1" lg="6" md="6" cols="12">
                          <ValidationProvider name="thana" vid="district_pourashava_id" v-slot="{ errors }">
                            <v-text-field outlined readonly v-model="user_permission.district_pourashava.name_en
            " :label="$t(
            'container.system_config.demo_graphic.ward.pouro'
          )
            " v-if="user_permission.location_type">
                            </v-text-field>
                            <v-autocomplete v-if="!user_permission.district_pourashava"
                              v-model="new_location_data.district_pourashava_id" outlined :label="$t(
            'container.system_config.demo_graphic.ward.pouro'
          )
            " @change="onChangeDistrictPouroNewLocation($event)" :items="district_pouros_new_loc" item-text="name_en"
                              item-value="id" class="no-arrow-icon" :append-icon-cb="appendIconCallback"
                              append-icon="mdi-plus" :error="errors[0] ? true : false"
                              :error-messages="errors[0]"></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <v-col v-if="new_location_data.location_type == 2" lg="6" md="6" cols="12">
                          <ValidationProvider name="Upazila" vid="thana_id" v-slot="{ errors }">
                            <v-text-field outlined readonly v-model="user_permission.upazila.name_en" :label="$t(
            'container.system_config.demo_graphic.thana.thana'
          )
            " v-if="user_permission.upazila">
                            </v-text-field>
                            <v-autocomplete v-if="!user_permission.upazila" v-model="new_location_data.thana_id"
                              outlined :label="$t(
            'container.system_config.demo_graphic.thana.thana'
          )
            " @change="onChangeUpazilaNewLocation($event)" :items="thanas_new_loc" item-text="name_en" item-value="id"
                              class="no-arrow-icon" :append-icon-cb="appendIconCallback" append-icon="mdi-plus"
                              :error="errors[0] ? true : false" :error-messages="errors[0]"></v-autocomplete>
                          </ValidationProvider>
                        </v-col>

                        <v-col v-if="new_location_data.location_type == 2" lg="6" md="6" cols="12">
                          <ValidationProvider name="subLocationType" vid="subLocationType" v-slot="{ errors }">
                            <v-autocomplete @input="
            onChangeSubLocationTypeNewLocation($event)
            " v-model="new_location_data.sub_location_type" outlined :label="$t(
            'container.system_config.demo_graphic.ward.subLocation_type'
          )
            " :items="subLocationType" item-text="value_en" item-value="id" :error="errors[0] ? true : false"
                              :error-messages="errors[0]" :hide-details="errors[0] ? false : true" class="no-arrow-icon"
                              :append-icon-cb="appendIconCallback" append-icon="mdi-plus"></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <v-col v-if="new_location_data.location_type == 2 &&
            new_location_data.sub_location_type == 1
            " lg="6" md="6" cols="12">
                          <ValidationProvider name="pouros" vid="pouros" v-slot="{ errors }">
                            <v-autocomplete v-model="new_location_data.pouro_id" outlined :label="$t(
            'container.system_config.demo_graphic.ward.pouro'
          )
            " :items="pouros_new_loc" item-text="name_en" item-value="id" :error="errors[0] ? true : false"
                              :error-messages="errors[0]" :hide-details="errors[0] ? false : true" class="no-arrow-icon"
                              :append-icon-cb="appendIconCallback" append-icon="mdi-plus"></v-autocomplete>
                          </ValidationProvider>
                        </v-col>

                        <v-col v-if="new_location_data.sub_location_type == 2 &&
            new_location_data.location_type == 2
            " lg="6" md="6" cols="12">
                          <ValidationProvider name="unions" vid="unions" v-slot="{ errors }">
                            <v-autocomplete @input="onChangeUnionGetWardNewLocation($event)"
                              v-model="new_location_data.union_id" outlined :label="$t(
            'container.system_config.demo_graphic.ward.union'
          )
            " :items="unions_new_loc" item-text="name_en" item-value="id" :error="errors[0] ? true : false"
                              :error-messages="errors[0]" :hide-details="errors[0] ? false : true" class="no-arrow-icon"
                              :append-icon-cb="appendIconCallback" append-icon="mdi-plus"></v-autocomplete>
                          </ValidationProvider>
                        </v-col>

                        <v-col v-if="new_location_data.location_type == 3" lg="6" md="6" cols="12">
                          <ValidationProvider name="city" vid="city_id" v-slot="{ errors }">
                            <v-text-field outlined readonly v-model="user_permission.city_corp.name_en" :label="$t(
            'container.system_config.demo_graphic.ward.city'
          )
            " v-if="user_permission.city_corp">
                            </v-text-field>
                            <v-autocomplete v-if="!user_permission.city_corp" v-model="new_location_data.city_id"
                              @change="onChangeCityNewLocation($event)" outlined :label="$t(
            'container.system_config.demo_graphic.ward.city'
          )
            " :items="cities_new_loc" item-text="name_en" item-value="id" class="no-arrow-icon"
                              :append-icon-cb="appendIconCallback" append-icon="mdi-plus"
                              :error="errors[0] ? true : false" :error-messages="errors[0]"></v-autocomplete>
                          </ValidationProvider>
                        </v-col>

                        <v-col v-if="new_location_data.location_type == 3" lg="6" md="6" cols="12">
                          <ValidationProvider name="thana" vid="thana_id" v-slot="{ errors }">
                            <v-autocomplete v-model="new_location_data.thana_id" outlined :label="$t(
            'container.system_config.demo_graphic.ward.thana'
          )
            " @change="onChangeThanaNewLocation($event)" :items="thanas_new_loc" item-text="name_en" item-value="id"
                              class="no-arrow-icon" :append-icon-cb="appendIconCallback" append-icon="mdi-plus"
                              :error="errors[0] ? true : false" :error-messages="errors[0]"></v-autocomplete>
                          </ValidationProvider>
                        </v-col>

                        <v-col v-if="new_location_data.location_type == 1 ||
            new_location_data.location_type == 2 ||
            new_location_data.location_type == 3
            " lg="6" md="6" cols="12">
                          <ValidationProvider name="ward" vid="ward_id" v-slot="{ errors }">
                            <v-autocomplete v-model="new_location_data.ward_id" outlined :label="$t(
            'container.system_config.demo_graphic.ward.ward'
          )
            " :items="wards_new_loc" item-text="name_en" item-value="id" class="no-arrow-icon"
                              :append-icon-cb="appendIconCallback" append-icon="mdi-plus"
                              :error="errors[0] ? true : false" :error-messages="errors[0]"></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <!-- <v-col lg="6" md="6" cols="12">
                          <ValidationProvider
                            name="officeName"
                            vid="officeName"
                            v-slot="{ errors }"
                          >
                            <v-autocomplete
                              v-model="new_location_data.office_name"
                              outlined
                              :label="
                                $t(
                                  'container.system_config.demo_graphic.ward.office_name'
                                )
                              "
                              :items="officeName"
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
                        </v-col> -->
                      </v-row>
                    </div>
                  </v-card-text>
                </v-card>
                <div class="d-inline d-flex justify-end mt-5">
                  <v-btn elevation="2" class="btn mr-2" @click="resetForm">{{
            $t("container.list.reset")
          }}</v-btn>
                  <v-btn elevation="2" class="btn mr-2" color="success" type="submit" :disabled="selected_ben_ids.length > 0 &&
              new_location_data.division_id != '' &&
              new_location_data.district_id != '' &&
              locationCheck()
              ? false
              : true
            ">{{
            $t(
              "container.beneficiary_management.beneficiary_shifting.shift_location"
            )
          }}</v-btn>
                </div>
              </form>
            </ValidationObserver>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { extend, ValidationProvider, ValidationObserver } from "vee-validate";
import { required } from "vee-validate/dist/rules";
export default {
  name: "DigitalIndex",
  title: "CTM - Beneficiary Location Shifting",

  data() {
    return {
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,

      locationType: [],
      programs: [],
      beneficiary_ids: [],
      selected_ben_ids: [],
      districts: [],
      cities: [],
      district_pouros: [],
      pouros: [],
      thanas: [],
      unions: [],
      wards: [],
      data: {
        program_id: null,
        division_id: null,
        district_id: null,
        location_type: null,
        sub_location_type: null,
        city_id: null,
        district_pourashava_id: null,
        thana_id: null,
        union_id: null,
        ward_id: null,
        office_name: null,
        effective_date: "",
        cause: "",
      },
      // For New Location
      districts_new_loc: [],
      cities_new_loc: [],
      district_pouros_new_loc: [],
      pouros_new_loc: [],
      thanas_new_loc: [],
      unions_new_loc: [],
      wards_new_loc: [],
      new_location_data: {
        program_id: "",
        division_id: "",
        district_id: "",
        location_type: "",
        sub_location_type: "",
        city_id: "",
        district_pourashava_id: "",
        pouro_id: "",
        thana_id: "",
        union_id: "",
        ward_id: "",
        office_name: "",
      },
      submit_data: {
        to_program_id: null,
        shifting_cause: "",
        activation_date: "",
        beneficiaries: [],
      },
      user_permission: {
        division: null,
        district: null,
        location_type: null,
        upazila: null,
        city_corp: null,
        district_pourashava: null,
      },
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
      officeName: [
        {
          id: 1,
          value_en: "Upazila",
        },

        {
          id: 2,
          value_en: "Union",
        },
        {
          id: 3,
          value_en: "City Corporation",
        },
      ],
    };
  },
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  computed: {
    ...mapState({
      divisions: (state) => state.Division.divisions,
    }),
  },

  methods: {
    ...mapActions({
      GetAllDivisions: "Division/GetAllDivisions",
    }),

    locationCheck() {
      if (
        this.new_location_data.city_id == "" &&
        this.new_location_data.district_pourashava_id == "" &&
        this.new_location_data.thana_id == ""
      ) {
        return false;
      } else {
        return true;
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
              this.data.district_pourashava_id = item?.district_pourashava?.id;
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
          this.GetBeneficiaryIds();
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
          this.GetBeneficiaryIds();
        });
    },
    async LocationType($event) {
      this.data.city_id = null;
      this.data.district_pourashava_id = null;
      this.data.thana_id = null;
      this.data.union_id = null;
      this.data.ward_id = null;

      this.cities = null;
      this.district_pouros = null;
      this.pouros = null;
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
          this.GetBeneficiaryIds();
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
          this.GetBeneficiaryIds();
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
          this.GetBeneficiaryIds();
        });
    },
    // For new Location
    async onChangeDivisionNewLocation(event) {
      await this.$axios
        .get(`/admin/district/get/${event}`, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          this.districts_new_loc = result.data.data;
        });
    },
    async onChangeDistrictNewLocation(event) {
      await this.$axios
        .get(`/admin/thana/get/${event}`, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          this.LocationTypeNewLocation(this.new_location_data.location_type);
          this.thanas_new_loc = result.data.data;
        });
    },
    async LocationTypeNewLocation($event) {
      this.new_location_data.city_id = "";
      this.new_location_data.district_pourashava_id = "";
      this.new_location_data.thana_id = "";
      this.new_location_data.union_id = "";
      this.new_location_data.ward_id = "";

      this.cities_new_loc = null;
      this.district_pouros_new_loc = null;
      this.pouros_new_loc = null;
      this.thanas_new_loc = null;
      this.unions_new_loc = null;
      this.wards_new_loc = null;

      if (
        this.new_location_data.district_id != "" &&
        this.new_location_data.location_type != ""
      ) {
        console.log("LocationType", $event);
        if ($event === 1) {
          await this.$axios
            .get(
              "/admin/city/get/" +
              this.new_location_data.district_id +
              "/" +
              $event,
              {
                headers: {
                  Authorization: "Bearer " + this.$store.state.token,
                  "Content-Type": "multipart/form-data",
                },
              }
            )
            .then((result) => {
              this.district_pouros_new_loc = result.data.data;
            });
        } else if ($event === 2) {
          await this.$axios
            .get(`/admin/thana/get/${this.new_location_data.district_id}`, {
              headers: {
                Authorization: "Bearer " + this.$store.state.token,
                "Content-Type": "multipart/form-data",
              },
            })
            .then((result) => {
              this.thanas_new_loc = result.data.data;
            });
        } else if ($event === 3) {
          await this.$axios
            .get(
              "/admin/city/get/" +
              this.new_location_data.district_id +
              "/" +
              $event,
              {
                headers: {
                  Authorization: "Bearer " + this.$store.state.token,
                  "Content-Type": "multipart/form-data",
                },
              }
            )
            .then((result) => {
              this.cities_new_loc = result.data.data;
            });
        }
      }
    },
    async onChangeUpazilaNewLocation(event) {
      await this.$axios
        .get(`/admin/union/get/${this.new_location_data.thana_id}`, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          this.unions_new_loc = result.data.data;
        });
    },
    async onChangeSubLocationTypeNewLocation(event) {
      if (event == 1) {
        await this.$axios
          .get(`/admin/union/pouro/get/${this.new_location_data.thana_id}`, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((result) => {
            this.pouros_new_loc = result.data.data;

            //clear data
            this.new_location_data.pouro_id = "";
            this.new_location_data.union_id = "";
            this.new_location_data.ward_id = "";
          });
        this.new_location_data.union_id = "";
      }
      if (event == 2) {
        this.onChangeUpazilaNewLocation(this.new_location_data.thana_id);
        this.new_location_data.pouro_id = "";
      }
    },
    async onChangeUnionGetWardNewLocation(event) {
      this.wards_new_loc = [];
      this.new_location_data.ward_id = "";
      await this.$axios
        .get(`/admin/ward/get/${event}`, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          this.wards_new_loc = result.data.data;
        });
    },
    async onChangeUnionNewLocation(event) {
      await this.$axios
        .get(`/admin/ward/get/${this.new_location_data.union_id}`, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          this.wards_new_loc = result.data.data;
        });
    },
    async onChangeCityNewLocation(event) {
      await this.$axios
        .get(`/admin/thana/get/city/${event}`, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          this.thanas_new_loc = result.data.data;
        });
    },
    async onChangeThanaNewLocation(event) {
      await this.$axios
        .get(`/admin/ward/get/thana/${this.new_location_data.thana_id}`, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          this.wards_new_loc = result.data.data;
        });
    },
    async onChangeDistrictPouroNewLocation(event) {
      await this.$axios
        .get(`/admin/ward/get/district_pouro/${event}`, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          this.wards_new_loc = result.data.data;
        });
    },

    async GetBeneficiaryIds() {
      this.selected_ben_ids = [];
      const queryParams = {
        division_id: this.data.division_id,
        district_id: this.data.district_id,
        city_id: this.data.city_id,
        district_pourashava_id: this.data.district_pourashava_id,
        thana_id: this.data.thana_id,
      };
      this.$axios
        .get("/admin/beneficiary/listDropDown", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
          params: queryParams,
        })
        .then((result) => {
          this.beneficiary_ids = result.data.data;
        });
    },
    submitLocationShifting() {
      let fd = new FormData();

      if (this.new_location_data.division_id != "")
        fd.append("to_division_id", this.new_location_data.division_id);

      if (this.new_location_data.district_id != "")
        fd.append("to_district_id", this.new_location_data.district_id);

      if (this.new_location_data.city_id != "")
        fd.append("to_city_corp_id", this.new_location_data.city_id);

      if (this.new_location_data.district_pourashava_id != "")
        fd.append(
          "to_district_pourashava_id",
          this.new_location_data.district_pourashava_id
        );
      //  fd.append("to_upazila_id", this.new_location_data.thana_id);

      if (this.new_location_data.pouro_id != "")
        fd.append("to_pourashava_id", this.new_location_data.pouro_id);

      if (this.new_location_data.thana_id != "")
        fd.append("to_thana_id", this.new_location_data.thana_id);

      if (this.new_location_data.union_id != "")
        fd.append("to_union_id", this.new_location_data.union_id);

      if (this.new_location_data.ward_id != "")
        fd.append("to_ward_id", this.new_location_data.ward_id);

      if (this.new_location_data.location_type != "")
        fd.append("to_location_type_id", this.new_location_data.location_type);

      if (this.data.cause) fd.append("shifting_cause", this.data.cause);
      if (this.data.effective_date)
        fd.append("effective_date", this.data.effective_date);

      console.log("bene___", this.submit_data.beneficiaries);

      // Convert each object in the beneficiaries array to a JSON string
      this.selected_ben_ids.forEach((beneficiary, index) => {
        fd.append(`beneficiaries[${index}][beneficiary_id]`, beneficiary);
      });

      try {
        this.$store
          .dispatch("BeneficiaryManagement/BeneficiaryLocationShifting", fd)
          .then((res) => {
            console.log(res, "submit__");
            if (res.data?.success) {
              console.log(res.data?.success, "submit__");
              this.$toast.success("Beneficiary Location Shifting Successfully");
              this.$router.push({ name: "beneficiary_location_shifting_list" });
            } else if (res.response?.data?.errors) {
              this.$refs.form.setErrors(res.response.data.errors);
              this.errors = res.response.data.errors;
              //   this.$toast.error(res.response.data.message);
            }
            console.log(this.$refs);
            console.log(this.errors, "this.errors");
          });
      } catch (e) {
        console.log(e);
      }
    },
    resetForm() {
      this.data = {};
      this.selected_ben_ids = {};
      this.submit_data = {};
      this.new_location_data = {};
    },
    async GetAllProgram() {
      try {
        this.$axios
          .get("/global/program", {
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
    remove(item) {
      // alert(this.selected_ben_ids.length);
      this.selected_ben_ids.map((row) => console.log("value_", row));

      const index = this.selected_ben_ids.indexOf(item);
      if (index >= 0) this.selected_ben_ids.splice(index, 1);
    },
    updateHeaderTitle() {
      const title = this.$t(
        "container.beneficiary_management.beneficiary_shifting.title"
      );
      this.$store.commit("setHeaderTitle", title);
    },
  },
  watch: {
    "$i18n.locale": "updateHeaderTitle",
    value(val) { },
  },

  beforeMount() {
    this.updateHeaderTitle();
  },
  created() {
    this.GetAllDivisions();
  },
  mounted() {
    this.GetUserPermission();
    // this.GetBeneficiaryIds();
    this.GetAllProgram();
    this.$store
      .dispatch("getLookupByType", 1)
      .then((res) => (this.locationType = res));
  },
};
</script>
<style scoped>
.page-header {
  background-color: #8c9eff;
  color: #000;
}
</style>