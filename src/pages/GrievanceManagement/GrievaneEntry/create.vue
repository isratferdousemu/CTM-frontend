<template>
  <div id="application">

    <v-row>
      <v-col cols="12">
        <ValidationObserver ref="form" v-slot="{ invalid }">
          <form @submit.prevent="submitApplicationCheck()">
            <v-card class="pa-5 px-10 mb-4">
              <div>
                <v-expansion-panels v-model="panel" multiple>
                  <!-------------complaint entry--------------->
                  <v-expansion-panel class="mb-4">
                    <v-expansion-panel-header color="primary">
                      <h3 class="white--text">{{ $t('container.grievance_management.grievanceEntry.grievance_entry') }}
                      </h3>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content class="mt-5">
                      <v-row>
                        <v-col cols="6" lg="6">
                          <ValidationProvider name="Existing Beneficiary" vid="is_existing_beneficiary"
                            v-slot="{ errors }" rules="required">
                            <label>{{ $t('container.grievance_management.grievanceEntry.is_existing_beneficiary')
                            }}</label>
                            <span style="margin-left: 4px; color: red">*</span>
                            <v-select v-model="data.is_existing_beneficiary" item-value="value" outlined :items="[
                              { text: 'Yes', value: 1 },
                              { text: 'No', value: 2 }
                            ]" :item-text="text" :error="errors[0] ? true : false" :error-messages="errors[0]">
                            </v-select>
                          </ValidationProvider>
                        </v-col>
                      </v-row>


                      <v-row v-if="data.is_existing_beneficiary == 1">
                        <v-col cols="6" lg="6">
                          <label>{{ $t('container.grievance_management.grievanceEntry.beneficiary_id') }}</label>
                          <v-text-field outlined clearable v-model="data.nid"></v-text-field>
                        </v-col>
                        <v-col cols="6" lg="6">
                          <label>{{
                            $t('container.application_selection.application.date_of_birth')
                          }}</label>
                          <v-text-field outlined clearable v-model="data.date_of_birth" type="date"></v-text-field>
                        </v-col>
                      </v-row>

                      <v-row v-if="data.is_existing_beneficiary == 2">
                        <v-radio-group required row v-model="data.verification_type" @change="handleRadioChange">
                          <v-radio :label="$t('container.system_audit.nbr')" :value="3"></v-radio>
                          <v-radio :label="$t('container.system_audit.tracking_no')" :value="4"></v-radio>
                        </v-radio-group>
                      </v-row>

                      <v-row v-if="data.verification_type == 3">
                        <v-col cols="6" lg="6">
                          <label>{{ $t('container.system_audit.nbr') }}</label>
                          <v-text-field outlined clearable v-model="data.nid"></v-text-field>
                        </v-col>
                        <v-col cols="6" lg="6">
                          <label>{{
                            $t('container.application_selection.application.date_of_birth')
                          }}</label>
                          <v-text-field outlined clearable v-model="data.date_of_birth" type="date"></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row v-if="data.verification_type == 4">
                          <v-col cols="6" lg="6">
                            <label>{{ $t('container.system_audit.nbr') }}</label>
                            <v-text-field outlined clearable v-model="data.nid"></v-text-field>
                          </v-col>
                          <v-col cols="6" lg="6">
                            <label>{{
                              $t('container.application_selection.application.date_of_birth')
                            }}</label>
                            <v-text-field outlined clearable v-model="data.date_of_birth" type="date"></v-text-field>
                          </v-col>
                      </v-row>

                      <v-row>
                        <v-col cols="12">
                          <div class="text-right">
                            <v-btn type="submit" flat color="success" :loading="loading" @click="applicationTracking()"
                              class="custom-btn-width white--text py-2">
                              <span class="mdi mdi-television mr-2"></span>
                              {{ $t("container.grievance_management.grievanceEntry.Verify") }}
                            </v-btn>
                          </div>
                        </v-col>
                      </v-row>

                    </v-expansion-panel-content>
                  </v-expansion-panel>
                  <!-------------complaint entry end--------------->
                  <!-------------complaint_info--------------->
                  <v-expansion-panel class="mb-4">
                    <v-expansion-panel-header color="primary">
                      <h3 class="white--text">{{ $t('container.grievance_management.grievanceEntry.complaint_info') }}
                      </h3>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content class="mt-5">
                      <div class="pa-2 mb-4">
                        <v-row>
                          <v-col cols="6" lg="6">
                            <ValidationProvider name="Name" vid="name" rules="required" v-slot="{ errors }">
                              <label>{{ $t('container.grievance_management.grievanceEntry.name') }} </label>
                              <span style="margin-left: 4px; color: red">*</span>
                              <v-text-field v-model="data.name" outlined :error="errors[0] ? true : false"
                                :error-messages="errors[0]">
                              </v-text-field>
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="6" lg="6">
                            <ValidationProvider name="Gender" vid="gender" v-slot="{ errors }" rules="required">
                              <label>{{ $t('container.system_config.allowance_program.gender') }}</label>
                              <span style="margin-left: 4px; color: red">*</span>
                              <v-select v-model="data.gender_id" item-value="id" outlined :items="genders"
                                :item-text="getItemValue" :error="errors[0] ? true : false" :error-messages="errors[0]">
                              </v-select>
                            </ValidationProvider>
                          </v-col>

                          <v-col cols="6" lg="6">
                            <ValidationProvider name="program" vid="program" rules="required" v-slot="{ errors }">
                              <label>{{ $t('container.grievance_management.grievanceEntry.Program_name') }} </label>
                              <span style="margin-left: 4px; color: red">*</span>
                              <v-select @change="getProgramName()" outlined :items="programs" :item-text="getItemText"
                                item-value="id" v-model="data.program_id" :error="errors[0] ? true : false"
                                :error-messages="errors[0]">
                              </v-select>
                            </ValidationProvider>
                          </v-col>

                          <v-col cols="6" lg="6">


                            <ValidationProvider rules="required" name="Email Adress" vid="Email"
                              v-slot="{ errors }">
                              <label style="display: inline-block">{{
                                $t('container.grievance_management.grievanceEntry.email') }} </label><span
                                style="margin-left: 4px; color: red">*</span>

                              <v-text-field v-model="data.email" outlined type="email" clearable
                                :error="errors[0] ? true : false" :error-messages="errors[0]">
                              </v-text-field>
                            </ValidationProvider>


                          </v-col>
                          <v-col cols="6" lg="6">


                            <ValidationProvider rules="checkNumberMobile||required" name="Mobile Number" vid="mobile"
                              v-slot="{ errors }">
                              <label style="display: inline-block">{{
                                $t('container.application_selection.application.mobile') }} </label><span
                                style="margin-left: 4px; color: red">*</span>

                              <v-text-field v-model="data.mobile" outlined type="number" clearable
                                :error="errors[0] ? true : false" :error-messages="errors[0]">
                              </v-text-field>
                            </ValidationProvider>


                          </v-col>
                        </v-row>
                      </div>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                  <!-------------complaint_info end--------------->

                  <!-- complaint complaint_details --------------->
                  <v-expansion-panel class="mb-4">
                    <v-expansion-panel-header color="primary">
                      <h3 class="white--text">{{ $t('container.grievance_management.grievanceEntry.complaint_details') }}
                      </h3>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content class="mt-5">
                      <v-row>
                        <v-col>
                          <label>{{ $t('container.grievance_management.main_grievance_type') }} </label>
                          <ValidationProvider name="Grievance Type" vid="grievance_type_id" rules="required" v-slot="{ errors }">
                            <v-autocomplete v-model="data.grievance_type_id" outlined :items="types" item-text="title_en"
                              item-value="id" required :error="errors[0] ? true : false"
                              :error-messages="errors[0]"></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <v-col>
                          <label>{{ $t('container.grievance_management.grievance_subject') }}</label>
                          <ValidationProvider name="Grievance Subject" vid="grievance_subject_id" rules="required"
                            v-slot="{ errors }">
                            <v-autocomplete v-model="data.grievance_subject_id" outlined :items="subjects"
                              item-text="title_en" item-value="id" required :error="errors[0] ? true : false"
                              :error-messages="errors[0]"></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <label>{{ $t('container.grievance_management.grievanceEntry.details') }}</label>
                          <ValidationProvider name="Grievance Details" vid="details" rules="required" v-slot="{ errors }">
                            <span style="margin-left: 4px; color: red">*</span>
                            <v-textarea v-model="data.details" outlined clearable :error="errors[0] ? true : false"
                              handleCheckboxChangsa :error-messages="errors[0]">
                            </v-textarea>
                          </ValidationProvider>
                        </v-col>
                        <v-col cols="6" lg="6">

                          <label>{{ $t('container.grievance_management.grievanceEntry.document') }}</label>
                          <!-- <span style="margin-left: 4px; color: red">*</span> -->
                          <ValidationProvider v-slot="{ errors }" name="Document" rules="required" vid="image">
                            <v-file-input outlined show-size counter prepend-outer-icon="mdi-camera" v-model="data.documents"
                              accept="file/*" @change="previewImage" prepend-icon="" id="image">
                            </v-file-input>
                          </ValidationProvider>

                        </v-col>
                      </v-row>

                    </v-expansion-panel-content>
                  </v-expansion-panel>
                  <!-- complaint complaint_details end ----------->
                  <!-- complaint complaint_area ------ ----------->
                  <v-expansion-panel class="ma-4">
                    <v-expansion-panel-header color="primary">
                      <h3 class="white--text">{{ $t('container.grievance_management.grievanceEntry.complaint_area') }}
                      </h3>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content class="mt-5">


                      <v-row>
                        <v-col lg="6" md="6" cols="12">
                          <ValidationProvider name="Division" vid="division" rules="required" v-slot="{ errors }">
                            <label style="display: inline-block"> {{
                              $t('container.system_config.demo_graphic.division.division') }}
                            </label>
                            <span style="margin-left: 4px; color: red">*</span>
                            <v-select :hide-details="errors[0] ? false : true" @input="onChangeDivision($event)"
                              v-model="data.division_id" outlined :items="divisions" :item-text="getItemText"
                              item-value="id" :error="errors[0] ? true : false" :error-messages="errors[0]"></v-select>
                          </ValidationProvider>
                        </v-col>
                        <v-col lg="6" md="6" cols="12">
                          <ValidationProvider name="District" vid="district" rules="required" v-slot="{ errors }">
                            <label style="display: inline-block">{{
                              $t('container.system_config.demo_graphic.district.district') }}
                            </label>
                            <span style="margin-left: 4px; color: red">*</span>
                            <v-select :hide-details="errors[0] ? false : true" outlined v-model="data.district_id"
                              @input="onChangeDistrict($event)" :items="districts" :item-text="getItemText"
                              item-value="id" :error="errors[0] ? true : false" :error-messages="errors[0]"></v-select>
                          </ValidationProvider>
                        </v-col>
                        <v-col cols="6">
                          <ValidationProvider name="Location Type" vid="location_type" rules="required"
                            v-slot="{ errors }">
                            <label style="display: inline-block">{{ $t('container.list.location_type') }}
                            </label>
                            <span style="margin-left: 4px; color: red">*</span>
                            <v-select @input="LocationType($event)" v-model="data.location_type"
                              :hide-details="errors[0] ? false : true" outlined :items="locationType"
                              :item-text="getItemValue" item-value="id" :error="errors[0] ? true : false"
                              :error-messages="errors[0]"></v-select>
                          </ValidationProvider>
                        </v-col>
                        <v-col v-if="data.location_type == 2" lg="6" md="6" cols="6">
                          <ValidationProvider name="Upazila" vid="thana_id" rules="required" v-slot="{ errors }">
                            <label style="display: inline-block">{{
                              $t('container.system_config.demo_graphic.ward.upazila') }}
                            </label>
                            <span style="margin-left: 4px; color: red">*</span>
                            <v-select :hide-details="errors[0] ? false : true" v-model="data.thana_id" outlined
                              @change="onChangeUpazila($event)" :items="thanas" :item-text="getItemText" item-value="id"
                              :error="errors[0] ? true : false" :error-messages="errors[0]"></v-select>
                          </ValidationProvider>
                        </v-col>
                        <v-col v-if="data.location_type == 2" lg="6" md="6" cols="6">
                          <label style="display: inline-block">{{
                            $t('container.system_config.demo_graphic.ward.subLocation_type') }}
                          </label>
                          <span style="margin-left: 4px; color: red">*</span>
                          <ValidationProvider name="Sub Location" vid="subLocationType" v-slot="{ errors }"
                            rules="required">
                            <v-select @input="onChangeSubLocationType($event)" v-model="data.sub_location_type" outlined
                              :items="subLocationType" :item-text="getItemValue" item-value="id"
                              :error="errors[0] ? true : false" :error-messages="errors[0]"
                              :hide-details="errors[0] ? false : true" class="no-arrow-icon"></v-select>
                          </ValidationProvider>
                        </v-col>

                        <v-col v-if="data.location_type == 2 && data.sub_location_type === 2" cols="6">
                          <ValidationProvider name="union" vid="union_id" rules="required" v-slot="{ errors }">
                            <label style="display: inline-block">{{
                              $t('container.system_config.demo_graphic.ward.union')
                            }}
                            </label>
                            <span style="margin-left: 4px; color: red">*</span>
                            <v-select :hide-details="errors[0] ? false : true" v-model="data.union_id" outlined
                              @input="onChangeUnion($event)" :items="unions" :item-text="getItemText" item-value="id"
                              :error="errors[0] ? true : false" :error-messages="errors[0]"></v-select>

                          </ValidationProvider>
                        </v-col>

                        <v-col v-if="data.location_type == 2 && data.sub_location_type === 1" cols="6">
                          <ValidationProvider name="Pouroshava" vid="pouro_id" rules="required" v-slot="{ errors }">
                            <label style="display: inline-block">{{
                              $t('container.system_config.demo_graphic.ward.pouro')
                            }}
                            </label>
                            <span style="margin-left: 4px; color: red">*</span>
                            <v-select :hide-details="errors[0] ? false : true" v-model="data.pouro_id"
                              @input="onChangePouro($event)" outlined :items="pouros" :item-text="getItemText"
                              item-value="id" :error="errors[0] ? true : false" :error-messages="errors[0]"></v-select>
                          </ValidationProvider>


                        </v-col>
                        <v-col v-if="data.location_type == 3" lg="6" md="6" cols="6">
                          <ValidationProvider name="city" vid="city_id" rules="required" v-slot="{ errors }">
                            <label style="display: inline-block">{{ $t('container.system_config.demo_graphic.ward.city')
                            }}
                            </label>
                            <span style="margin-left: 4px; color: red">*</span>
                            <v-select :hide-details="errors[0] ? false : true" v-model="data.city_id"
                              @change="onChangeCity($event)" outlined :items="cities" :item-text="getItemText"
                              item-value="id" :error="errors[0] ? true : false" :error-messages="errors[0]"></v-select>
                          </ValidationProvider>
                        </v-col>
                        <v-col v-if="data.location_type == 3" lg="6" md="6" cols="6">
                          <ValidationProvider name="thana" vid="city_thana_id" rules="required" v-slot="{ errors }">
                            <label style="display: inline-block">{{
                              $t('container.system_config.demo_graphic.ward.thana')
                            }}
                            </label>
                            <span style="margin-left: 4px; color: red">*</span>
                            <v-select :hide-details="errors[0] ? false : true" v-model="data.city_thana_id" outlined
                              @input="OnChangeCityThana($event)" :items="city_thanas" :item-text="getItemText"
                              item-value="id" :error="errors[0] ? true : false" :error-messages="errors[0]"></v-select>
                          </ValidationProvider>
                        </v-col>
                        <v-col v-if="data.location_type == 1" lg="6" md="6" cols="6">
                          <ValidationProvider name="thana" vid="district_pouro_id" rules="required" v-slot="{ errors }">
                            <label style="display: inline-block">{{
                              $t('container.system_config.demo_graphic.ward.dist_pouro') }}
                            </label>
                            <span style="margin-left: 4px; color: red">*</span>
                            <v-select :hide-details="errors[0] ? false : true" v-model="data.district_pouro_id"
                              @input="onChangeDistrictPouro" outlined :items="district_poros" :item-text="getItemText"
                              item-value="id" :error="errors[0] ? true : false" :error-messages="errors[0]"></v-select>
                          </ValidationProvider>
                        </v-col>
                        <v-col v-if="data.location_type == 3" lg="6" md="6" cols="6">
                          <ValidationProvider name="ward_id_city" vid="ward_id_city" rules="required" v-slot="{ errors }">
                            <label style="display: inline-block">{{ $t('container.system_config.demo_graphic.ward.ward')
                            }}
                            </label>
                            <span style="margin-left: 4px; color: red">*</span>
                            <v-select :hide-details="errors[0] ? false : true" v-model="data.ward_id_city" outlined
                              :items="wards_city" :item-text="getItemText" item-value="id"
                              :error="errors[0] ? true : false" :error-messages="errors[0]"></v-select>
                          </ValidationProvider>
                        </v-col>
                        <v-col v-if="data.location_type == 2 && data.sub_location_type == 2" lg="6" md="6" cols="6">
                          <ValidationProvider name="ward_id_union" vid="ward_id_union" rules="required"
                            v-slot="{ errors }">
                            <label style="display: inline-block">{{ $t('container.system_config.demo_graphic.ward.ward')
                            }}
                            </label>
                            <span style="margin-left: 4px; color: red">*</span>
                            <v-select :hide-details="errors[0] ? false : true" v-model="data.ward_id_union" outlined
                              :items="wards_upazila_union" :item-text="getItemText" item-value="id"
                              :error="errors[0] ? true : false" :error-messages="errors[0]"></v-select>
                          </ValidationProvider>
                        </v-col>
                        <v-col v-if="data.location_type == 2 && data.sub_location_type == 1" lg="6" md="6" cols="6">
                          <ValidationProvider name="ward_id_union" vid="ward_id_union" rules="required"
                            v-slot="{ errors }">
                            <label style="display: inline-block">Ward
                            </label>
                            <span style="margin-left: 4px; color: red">*</span>
                            <v-select :hide-details="errors[0] ? false : true" v-model="data.ward_id_pouro" outlined
                              :items="wards_upazila_pouro" :item-text="getItemText" item-value="id"
                              :error="errors[0] ? true : false" :error-messages="errors[0]"></v-select>
                          </ValidationProvider>
                        </v-col>
                        <v-col v-if="data.location_type == 1" lg="6" md="6" cols="6">
                          <ValidationProvider name="ward_id_dist" vid="ward_id_dist" rules="required" v-slot="{ errors }">
                            <label style="display: inline-block">{{ $t('container.system_config.demo_graphic.ward.ward')
                            }}
                            </label>
                            <span style="margin-left: 4px; color: red">*</span>
                            <v-select :hide-details="errors[0] ? false : true" v-model="data.ward_id_dist" outlined
                              :items="wards_dist" :item-text="getItemText" item-value="id"
                              :error="errors[0] ? true : false" :error-messages="errors[0]"></v-select>
                          </ValidationProvider>
                        </v-col>
                        <v-col cols="6" lg="6">
                          <ValidationProvider name="Post Code" vid="post_code" rules="CheckPost||required"
                            v-slot="{ errors }">
                            <label style="display: inline-block">{{
                              $t('container.system_config.demo_graphic.ward.post_code') }}
                            </label>
                            <span style="margin-left: 4px; color: red">*</span>
                            <v-text-field v-model="data.post_code" type="number" outlined clearable
                              :error="errors[0] ? true : false" :error-messages="errors[0]">
                            </v-text-field>
                          </ValidationProvider>
                        </v-col>
                        <v-col cols="6" lg="6">
                          <ValidationProvider name="Village/House No.,
                                                        Road No., Block No, Section" vid="address" rules="required"
                            v-slot="{ errors }">
                            <label style="display: inline-block">{{
                              $t('container.system_config.demo_graphic.ward.address') }}
                            </label>
                            <span style="margin-left: 4px; color: red">*</span>
                            <v-text-field v-model="data.address" outlined clearable :error="errors[0] ? true : false"
                              handleCheckboxChangsa :error-messages="errors[0]">
                            </v-text-field>
                          </ValidationProvider>
                        </v-col>
                      </v-row>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                  <!-- complaint complaint_area end------ ----------->
                  <!-- Expansion panel 4 End -->
                </v-expansion-panels>
              </div>
              <br>
              <div class="d-inline d-flex justify-end">
                <v-btn @click="resetForm()" elevation="2" class="btn mr-2" outlined color="red" dark>{{
                  $t('container.list.cancel') }}</v-btn>
                <v-btn @click="submitApplicationCheck()" flat color="primary" :loading="loading"
                  class="custom-btn-width black white--text py-2">
                  {{ $t('container.list.submit') }}
                </v-btn>
              </div>

            </v-card>

          </form>
        </ValidationObserver>

        <template>
          <v-dialog v-model="confirmDialog" max-width="700" max-height="500">
            <v-card>
              <v-card-title class="font-weight-bold justify-center">
                {{ $t('container.application_selection.application.form_submission') }}
              </v-card-title>
              <!-- Add a divider after the title -->
              <v-divider></v-divider>

              <v-card-text class="text-center">
                <div class="subtitle-1 font-weight-medium mt-5">
                  {{ $t('container.application_selection.application.question') }}
                </div>
              </v-card-text>

              <v-card-actions class="d-flex justify-center">
                <v-btn text @click="confirmDialog = false" outlined class="custom-btn-width">
                  {{ $t("container.list.cancel") }}
                </v-btn>
                <v-btn @click="submitApplication()" flat color="primary" :loading="loading" type="submit"
                  class="custom-btn-width black white--text py-2">
                  {{ $t('container.list.confirm') }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
        <!-- delete modal  -->

      </v-col>
    </v-row>

    <FooterBar />
  </div>
</template>

<script>
import FooterBar from "@/components/Common/FooterBar.vue";
import LocaleSwitcher from "@/components/Common/LocaleSwitcher"
import { extend, ValidationProvider, ValidationObserver } from "vee-validate";
import { mapState } from "vuex";
import axios from "axios";
import { required, numeric } from 'vee-validate/dist/rules';

extend("numeric", {
  ...numeric,
  message: "This field must be a number"
});
extend('bangla', {
  validate: value => {
    // Regular expression to match Bangla characters
    const banglaRegex = /^[\u0980-\u09FF\s]+$/;
    return banglaRegex.test(value);
  },
  message: 'Only Bangla characters will be allowed in this field'
});


extend("checkNumber", {
  validate: (value) => {
    if (!value && value !== 0) {
      return false;
    }
    // Check if all characters are numeric and not allow special characters
    const isNumeric = /^[0-9]+$/.test(value);

    // Check if the length is either 10 or 17 characters
    const isCorrectLength = value.length === 10 || value.length === 17;

    // Return true if both conditions are met
    return isNumeric && isCorrectLength;
  },
  message: "This is required field and field must be a number with either 10 or 17 characters",
});
extend("checkNumberNominee", {
  validate: (value) => {
    if (!value && value !== 0) {
      return false;
    }
    // Check if all characters are numeric and not allow special characters
    const isNumeric = /^[0-9]+$/.test(value);

    // Check if the length is either 10 or 17 characters
    const isCorrectLength = value.length === 10 || value.length === 17;


    // Return false if value is the same as data.verfication_number

    // Return true if both conditions are met
    return isNumeric && isCorrectLength;
  },
  message: "This is required field and field must be a number with either 10 or 17 characters",
});
extend("CheckPost", {
  validate: (value) => {
    if (!value && value !== 0) {
      return false;
    }
    // Check if all characters are numeric and not allow special characters
    const isNumeric = /^[0-9]+$/.test(value);

    // Check if the length is either 10 or 17 characters
    const isCorrectLength = value.length === 4;

    // Return true if both conditions are met
    return isNumeric && isCorrectLength;
  },
  message: "Please provide 4 digit post code",
});
extend("checkMobileNumber", {
  validate: (value) => {
    if (!value && value !== 0) {
      return false;
    }
    // Check if all characters are numeric and not allow special characters
    const isNumeric = value.length === 8;

    return isNumeric;
  },
  message: "This field must be a number with 8 characters",
});
extend("checkNumberMobile", {
  validate: (value) => {
    // Check if all characters are numeric and the length is 11
    const isNumeric = /^\d+$/.test(value);
    const hasCorrectLength = value.length === 11;

    // Check if the value starts with "01"
    const startsWith01 = value.startsWith("01");

    return isNumeric && hasCorrectLength && startsWith01;
  },
  message: "This field must be an 11-digit number starting with 'correct format'",
});

export default {
  title: "CTM - Online Application",

  data() {
    return {
      subjects: [],
      types: [],


      panel2Open: true,
      panel: [0, 1, 2, 3, 4, 5, 6],
      programs: [],
      mobile_operators: [],
      classes: [],
      loading: false,
      divisions: [],
      districts: [],
      thanas: [],
      cities: [],
      unions: [],
      district_poros: [],
      city_thanas: [],
      wards_city: [],
      wards_upazila: [],
      wards_dist: [],
      locationType: [],
      subLocationType: [
        {
          id: 1,
          value_en: "Pouroshava",
          value_bn: "পৌরসভা",
        },

        {
          id: 2,
          value_en: "Union",
          value_bn: "ইউনিয়ন ",
        },
      ],

      permanent_divisions: [],
      permanent_districts: [],
      permanent_thanas: [],
      permanent_cities: [],
      permanent_unions: [],
      permanent_pouros: [],
      permanent_district_poros: [],
      permanent_city_thanas: [],
      permanent_locationType: [],
      permanent_wards_city: [],
      permanent_wards_union: [],
      permanent_wards_pouro: [],
      permanent_wards_dist: [],

      marital_status: [{ name_en: 'Married', name_bn: 'বিবাহিত' },
      { name_en: 'Unmarried', name_bn: 'অবিবাহিত' },
      { name_en: 'Widow', name_bn: 'বিধবা' },
      { name_en: 'Other', name_bn: 'অন্যান্য' }

      ],


      financial_status: ["Poor", "Refugee", "Landless"],
      social_status: ["Widow", "Widower", "Divorced"],
      house_status: ["Homeless", "Self", "Rent", "Others"],
      mobile_ownership:
        [{ name_en: 'Myself', name_bn: 'নিজ' },
        { name_en: 'Family Member', name_bn: 'পরিবারের সদস্য' },
        { name_en: 'Other', name_bn: 'অন্যান্য' }],
      religion: [{ name_en: 'Islam', name_bn: 'ইসলাম' },
      { name_en: 'Hindu', name_bn: 'হিন্দু' },
      { name_en: 'Buddhist', name_bn: 'বৌদ্ধ' },
      { name_en: 'Christian', name_bn: 'খ্রিষ্টান' },
      { name_en: 'Other', name_bn: 'অন্যান্য' }],


      yes_no: ["Yes ", "No"],

      status_code: null,
      status_code_nominee: null,
      activePicker: null,
      date: null,
      menu: false,
      isChecked: false,
      deleteDialog: false,
      confirmDialog: false,
      showAlert: false,

      data: {
        is_existing_beneficiary: null,
        beneficiary_id: null,
        date_of_birth: null,
        verification_type: 1,
        verification_number: null,
        // information
        name: null,
        gender_id: null,
        program_id: null,
        email: null,
        mobile: null,

        // detaisl
        grievance_type_id:null,
        grievance_subject_id: null,
        details: null,
        documents: null,
        // area
        division_id: null,
        district_id: null,
        upazila: null,
        post_code: null,
        address: null,
        location_type: null,
        sub_location_type: null,
        thana_id: null,
        union_id: null,
        pouro_id: null,
        city_id: null,
        city_thana_id: null,
        district_pouro_id: null,
        ward_id_city: null,
        ward_id_upazila_union: null,
        ward_id_upazila_pouro: null,
        ward_id_dist: null,
        mobile: null,

        application_allowance_values: [],
        application_pmt: [],
        marital_status: null,
        email: null,
        mobile_operator: null,
        pmt_status: null,
        tracking_type: [],
        text: '',
        type: ''
      },

      checkbox: false,
      checkboxNomineeAddress: false,
      imageUrl: null,
      signUrl: null,
      nomineeImageUrl: null,
      programName: null,
      nomineeSignUrl: null,
      programDetails: null,
      PMTVariables: [],
      //Date of Birth
      selectedDay: null,
      selectedMonth: null,
      selectedYear: null,
      selectedDayNominee: null,
      selectedMonthNominee: null,
      selectedYearNominee: null,
      twoDigitDays: Array.from({ length: 32 }, (_, i) => String(i).padStart(2, '0')).slice(1),


      months: [

        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ],
      years: Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i),

    };
  },

  components: {
    ValidationProvider,
    ValidationObserver,
    FooterBar,
    LocaleSwitcher
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
    formattedDate(newDate) {
      this.$emit("update:model", newDate);
    },



  },
  computed: {
    language: {
      get() {
        return this.$store.getters.getAppLanguage;
      },
    },

    formattedDate() {
      if (this.selectedDay && this.selectedMonth && this.selectedYear) {
        const monthIndex = this.months.indexOf(this.selectedMonth) + 1;
        const formattedMonth = monthIndex < 10 ? `0${monthIndex}` : `${monthIndex}`;
        return `${this.selectedYear}-${formattedMonth}-${this.selectedDay}`;
      }
      return null;
    },
    formattedDateNominee() {
      if (this.selectedDayNominee && this.selectedMonthNominee && this.selectedYearNominee) {
        const monthIndex = this.months.indexOf(this.selectedMonthNominee) + 1;
        const formattedMonth = monthIndex < 10 ? `0${monthIndex}` : `${monthIndex}`;
        return `${this.selectedYearNominee}-${formattedMonth}-${this.selectedDayNominee}`;

      }
      return null;
    },

  },

  methods:
  {
     handleRadioChange(value) {
      if (value == 3 || value == 4) {
        this.data.tracking_no = null;

      }
      if (value == 4) {
        this.data.date_of_birth = null;
        this.data.nid = null;

      }

    },
    async GetGrievanceType() {
      const queryParams = {
        status: 'active',
      };
      this.$axios
        .get("/admin/grievanceType/get", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
          params: queryParams,
        })
        .then((result) => {
          this.types = result.data.data;
          console.log(this.types, ' this.types');

        });
    },

    async GetGrievanceSubject() {
      const queryParams = {
        status: 'active',
      };
      this.$axios
        .get("/admin/grievanceSubject/get", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
          params: queryParams,
        })
        .then((result) => {
          this.subjects = result.data.data;

        });
    },


    onChange($event) {
      this.data.per_room_score = (this.data.house_size / $event) * -0.05;
      this.data.per_room_score = parseFloat(this.data.per_room_score.toFixed(3));
      this.data.no_of_people_score = (this.data.house_size / $event) * this.data.per_room_score
      this.data.no_of_people_score = parseFloat(this.data.no_of_people_score.toFixed(3));
      // Do something with the input value


    },
    onChangeHouse($event, selected_value) {
      console.log("selected_event", $event);
      console.log("selected_value", selected_value);
      if (selected_value.id == 1) {
        const childWithId210 = selected_value.children.find(child => child.id == $event);

        // Get the name_en property if the child exists
        const name_en = childWithId210 ? childWithId210.name_en : null;

        // Do something with the name_en value
        console.log('Name (English):', name_en);
        this.data.house_size = name_en
      }
      if (this.data.house_size) {
        this.data.per_room_score = (this.data.house_size / this.data.no_of_room) * -0.05;
        this.data.per_room_score = parseFloat(this.data.per_room_score.toFixed(3));
        this.data.no_of_people_score = (this.data.house_size / this.data.no_of_room) * this.data.per_room_score
        this.data.no_of_people_score = parseFloat(this.data.no_of_people_score.toFixed(3));

      }
      // Do something with the input value
    },

    //User Activity Log
    async SendActivityLog() {
      const queryParams = {
        info: "Online Application",
      };
      this.$axios
        .get("/activity-log/get-information", {
          params: queryParams,
        })
        .then((result) => {
          console.log(result, "ActivityLog");

        });
    },

    checkLengthAndVerify() {
      if (this.data.nominee_verification_number.length === 10 || this.data.nominee_verification_number.length === 17) {
        if (this.data.verification_number == this.data.nominee_verification_number) {
          this.data.nominee_verification_number = null;
          this.$toast.error("Nominee cannot be the same as the applicant");
        }
      }
    },

    scrollToVerifyButton() {
      const verifyButton = document.getElementById('verify-button');
      if (verifyButton) {
        verifyButton.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    },
    scrollToImage() {
      const verifyButton = document.getElementById('image');
      if (verifyButton) {
        verifyButton.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    },
    scrollToSignature() {
      const verifyButton = document.getElementById('signature');
      if (verifyButton) {
        verifyButton.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    },
    scrollToNomineeImage() {
      const verifyButton = document.getElementById('nominee_image');
      if (verifyButton) {
        verifyButton.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    },
    scrollToNomineeSignature() {
      const verifyButton = document.getElementById('nominee_signature');
      if (verifyButton) {
        verifyButton.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    },
    getItemTextYear(item) {
      return this.language === 'bn' ? this.$helpers.englishToBangla(item.years) : item.years;

    },

    getItemText(item) {
      return this.language === 'bn' ? item.name_bn : item.name_en;
    },
    getItemValue(item) {
      return this.language === 'bn' ? item.value_bn : item.value_en;
    },

    getItemDivision(item) {
      return this.language === 'bn' ? item.name_bn : item.name_en;
    },
    getItemDistrict(item) {
      return this.language === 'bn' ? item.name_bn : item.name_en;
    },
    getItemLocation(item) {
      return this.language === 'bn' ? item.value_bn : item.value_bn;
    },
    mobile() {
      if (this.data.mobile) {
        this.data.account_number = this.data.mobile
      }


    },
    gotocheck() {
      this.$axios.get("/global/online-application/check", {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      })
        .then((res) => {
          console.log(res)
          // this.$toast.success(res.data.data);

        })
        .catch((err) => {
          console.log(err)
          // this.$toast.error(err.response.data.message);
        })
      // triggers watch and emits the updated date
    },
    // Update the formatted date when any dropdown changes
    updateDate() {
      this.data.date_of_birth = this.formattedDate; // triggers watch and emits the updated date
    },
    updateDateNominee() {
      this.data.nominee_date_of_birth = this.formattedDateNominee; // triggers watch and emits the updated date
    },
    resetForm() {
      this.data.location_type = null;
      this.data.program_id = null;
      this.data.verification_type = null;
      this.data.verification_number = null;
      this.data.age = null;
      this.data.date_of_birth = null;
      this.data.name_en = null;
      this.data.name_bn = null;
      this.data.father_name_en = null;
      this.data.father_name_bn = null;
      this.data.mother_name_en = null;
      this.data.mother_name_bn = null;
      this.data.spouse_name_en = null;
      this.data.spouse_name_bn = null;
      this.data.identification_mark = null;
      this.data.image = null;
      this.data.signature = null;
      this.data.nationality = "Bangladeshi";
      this.data.gender_id = null;
      this.data.education_status = null;
      this.data.profession = null;
      this.data.religion = null;
      this.data.division_id = null;
      this.data.district_id = null;
      this.data.upazila = null;
      this.data.post_code = null;
      this.data.address = null;
      this.data.location_type = null;
      this.data.thana_id = null;
      this.data.union_id = null;
      this.data.city_id = null;
      this.data.city_thana_id = null;
      this.data.district_pouro_id = null;
      this.data.mobile = null;
      this.data.permanent_division_id = null;
      this.data.permanent_district_id = null;
      this.data.permanent_upazila = null;
      this.data.permanent_post_code = null;
      this.data.permanent_address = '';
      this.data.permanent_location_type = null;
      this.data.permanent_thana_id = null;
      this.data.permanent_union_id = null;
      this.data.permanent_city_id = null;
      this.data.permanent_city_thana_id = null;
      this.data.permanent_district_pouro_id = null;
      this.data.permanent_mobile = null;
      this.data.nominee_en = null;
      this.data.nominee_bn = null;
      this.data.nominee_verification_number = null;
      this.data.nominee_address = null;
      this.data.nominee_image = null;
      this.data.nominee_signature = null;
      this.data.nominee_relation_with_beneficiary = null;
      this.data.nominee_nationality = "Bangladeshi";
      this.data.account_name = null;
      this.data.account_owner = null;
      this.data.account_number = null;
      this.data.application_allowance_values = null;
      this.data.application_pmt = null;
      this.data.marital_status = null;
      this.data.email = null;
    },
    checkNum() {
      // this.$refs.observer.validate();
    },
    checkIsHaveDIS() {
      if (this.programDetails != null) {
        let check = this.programDetails.additional_field.filter((item) => {
          return item.id == 11;
        })
        if (check.length == 0) {
          return false
        } else {
          return true
        }
      }

    },

    keyGetByName(name) {
      if (this.programDetails != null) {
        let key = this.programDetails.additional_field.findIndex(field => field.name_en == name);
        return key
      }
    },

    handleNomineeCheckboxChange(event) {
      if (event == true) {
        if (this.data.permanent_location_type == 3) {
          const selectedDivisionObj = this.permanent_divisions.find(div => div.id === this.data.permanent_division_id);
          const selectedDistrictObj = this.permanent_districts.find(dis => dis.id === this.data.permanent_district_id);
          const selectedCityObj = this.permanent_cities.find(city => city.id === this.data.permanent_city_id);
          const selectedThanaObj = this.permanent_city_thanas.find(thana => thana.id === this.data.permanent_city_thana_id);
          const selectedWardsCityObj = this.permanent_wards_city.find(ward_city => ward_city.id === this.data.permanent_ward_id_city);

          this.data.nominee_address = this.data.permanent_address + ',' + (selectedThanaObj ? selectedThanaObj.name_en : '') + ',' + (selectedCityObj ? selectedCityObj.name_en : '') + ',' + (selectedDistrictObj ? selectedDistrictObj.name_en : '') + ',' + (selectedDivisionObj ? selectedDivisionObj.name_en : '') + '-' + this.data.permanent_post_code;


          // }


        }
        if (this.data.permanent_location_type == 2) {
          const selectedDivisionObj = this.permanent_divisions.find(div => div.id === this.data.permanent_division_id);
          const selectedDistrictObj = this.permanent_districts.find(dis => dis.id === this.data.permanent_district_id);
          const selectedUpazilaObj = this.permanent_thanas.find(upazila => upazila.id === this.data.permanent_thana_id);
          var selectedUnionObj = this.permanent_unions.find(union => union.id === this.data.permanent_union_id);
          var selectedPouroObj = this.permanent_pouros.find(pouro => pouro.id === this.data.permanent_pouro_id);
          if (this.permanent_wards_upazila_union) {
            var selectedWardUnionObj = this.permanent_wards_upazila_union.find(ward_union => ward_union.id === this.data.permanent_ward_id_union);
          }

          if (this.permanent_wards_upazila_pouro) {
            var selectedWardPouroObj = this.permanent_wards_upazila_pouro.find(ward_pouro => ward_pouro.id === this.data.permanent_ward_id_pouro);
          }

          this.data.nominee_address = this.data.permanent_address + ',' + (selectedWardUnionObj ? selectedWardUnionObj.name_en : '') + '' + (selectedWardPouroObj ? selectedWardPouroObj.name_en : '') + ',' + (selectedUnionObj ? selectedUnionObj.name_en : '') + '' + (selectedPouroObj ? selectedPouroObj.name_en : '') + ',' + (selectedUpazilaObj ? selectedUpazilaObj.name_en : '') + ',' + (selectedDistrictObj ? selectedDistrictObj.name_en : '') + ',' + (selectedDivisionObj ? selectedDivisionObj.name_en : '') + '-' + this.data.permanent_post_code;

          selectedUnionObj = '';
          selectedPouroObj = '';
          selectedWardUnionObj = '';
          selectedWardPouroObj = '';
          console.log(selectedWardUnionObj, selectedWardPouroObj, "ward")


        }
        if (this.data.permanent_location_type == 1) {
          const selectedDivisionObj = this.permanent_divisions.find(div => div.id === this.data.permanent_division_id);
          const selectedDistrictObj = this.permanent_districts.find(dis => dis.id === this.data.permanent_district_id);
          const selectedDistObj = this.permanent_district_poros.find(dist => dist.id === this.data.permanent_district_pouro_id);
          const selectedDistWardObj = this.permanent_wards_dist.find(ward_dist => ward_dist.id === this.data.permanent_ward_id_dist);
          // this.data.nominee_address = 'Division: ' + (selectedDivisionObj ? selectedDivisionObj.name_en : '') + ',' + ' District: ' + (selectedDistrictObj ? selectedDistrictObj.name_en : '') + ',' + ' District Pourashava: ' + (selectedDistObj ? selectedDistObj.name_en : '') + ',' + (selectedDistWardObj ? selectedDistWardObj.name_en : '') + ',' + ' Post Code: ' + this.data.permanent_post_code + ',' + this.data.permanent_address;

          this.data.nominee_address = this.data.permanent_address + ',' + (selectedDistWardObj ? selectedDistWardObj.name_en : '') + ',' + (selectedDistObj ? selectedDistObj.name_en : '') + ',' + (selectedDistrictObj ? selectedDistrictObj.name_en : '') + ',' + (selectedDivisionObj ? selectedDivisionObj.name_en : '') + '-' + this.data.permanent_post_code;

        }
      } else {
        this.data.nominee_address = null;

      }
    },
    handleCheckboxChange(event) {
      console.log(event)
      if (event) {
        this.data.permanent_post_code = this.data.post_code
        this.data.permanent_address = this.data.address
        this.data.permanent_division_id = this.data.division_id
        this.permanent_onChangeDivision(this.data.division_id)
        this.data.permanent_district_id = this.data.district_id
        this.permanent_onChangeDistrict(this.data.district_id);
        this.data.permanent_location_type = this.data.location_type

        this.permanent_LocationType(this.data.location_type);
        this.data.permanent_union_id = this.data.union_id
        this.data.permanent_pouro_id = this.data.pouro_id

        this.data.permanent_ward_id_pouro = this.data.ward_id_pouro ?? null
        console.log(this.data.union_id, "union_id", this.data.pouro_id, "pouro_id", this.data.permanent_ward_id_pouro)

        if (this.data.thana_id) {
          this.data.permanent_thana_id = this.data.thana_id
          this.data.permanent_sub_location_type = this.data.sub_location_type
          this.onChangeSubLocationTypePermanent(this.data.sub_location_type)




        }
        if (this.data.city_id) {
          this.data.permanent_city_id = this.data.city_id
          this.permanent_onChangeCity(this.data.permanent_city_id)
          this.data.permanent_city_thana_id = this.data.city_thana_id
          this.Permanent_OnChangeCityThana(this.data.permanent_city_thana_id);
          this.data.permanent_ward_id_city = this.data.ward_id_city
        }
        if (this.data.district_pouro_id) {
          this.data.permanent_district_pouro_id = this.data.district_pouro_id
          this.Permanent_onChangeDistrictPouro(this.data.permanent_district_pouro_id)

          this.data.permanent_ward_id_dist = this.data.ward_id_dist
        }

        if (this.data.union_id) {
          this.permanent_onChangeUnion(this.data.union_id);
          setTimeout(() => {
            this.data.permanent_ward_id_union = this.data.ward_id_union ?? null
            console.log(this.data.permanent_ward_id_union, this.data.ward_id_union, "su")
          }, 4000);




        }
        if (this.data.pouro_id) {

          this.Permanent_onChangePouro(this.data.permanent_pouro_id);

          this.data.permanent_ward_id_pouro = this.data.ward_id_pouro ?? null

          console.log(this.data.permanent_ward_id_pouro, this.data.ward_id_pouro, "sp")

        }


      }
      else {
        this.data.permanent_division_id = null
        this.data.permanent_district_id = null
        this.data.permanent_upazila = null
        this.data.permanent_post_code = null
        this.data.permanent_address = null
        this.data.permanent_location_type = null
        this.data.permanent_thana_id = null
        this.data.permanent_union_id = null
        this.data.permanent_city_id = null
        this.data.permanent_city_thana_id = null
        this.data.permanent_district_pouro_id = null

      }
    },
    verifyCard() {

      // this.status_code= null;
      let data = {
        program_id: this.data.program_id,
        gender_id: this.data.gender_id,
        verification_type: this.data.verification_type,
        verification_number: this.data.verification_number,
        date_of_birth: this.data.date_of_birth,
      };

      this.$axios.post("/global/online-application/card-verification", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      })
        .then((res) => {
          console.log(res, "responseVerify")



          this.status_code = res.status;





          this.$toast.success(res.data.message);
          this.data.age = res.data.data.age
          this.data.name_en = res.data.data.nameEn
          this.data.name_bn = res.data.data.name
          this.data.account_name = res.data.data.nameEn
        })
        .catch((err) => {
          this.status_code = null;

          if (err?.response?.data?.errors && err?.response?.data?.errors?.verification_number) {
            const verificationErrors = err.response.data.errors.verification_number;
            const beneficiaryMessageIndex = verificationErrors.indexOf('You are already a beneficiary');
            if (beneficiaryMessageIndex !== -1) {
              this.$toast.error('You are already a beneficiary');
            } else {
              // If "You are already a beneficiary" message not found, display the first error message
              this.$toast.error(verificationErrors[0]);
            }
          } else if (err.response.data.message) {
            this.$toast.error(err.response.data.message);
          } else {
            this.$toast.error(err.response.data.message || err.response.data.error_code || 'Unknown error');
          }

        })

    },

    verifyNomineeCard() {
      this.status_code_nominee = null;
      let data = {
        verification_number: this.data.nominee_verification_number,
        date_of_birth: this.data.nominee_date_of_birth,
      };

      this.$axios.post("/global/online-application/nominee-card-verification", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      })
        .then((res) => {
          console.log(res)
          this.status_code_nominee = res.status;
          this.$toast.success(res.data.message);

          this.data.nominee_en = res.data.data.nameEn
          this.data.nominee_bn = res.data.data.name
        })
        .catch((err) => {
          console.log(err)
          this.$toast.error(err.response.data.message);
        })
    },
    verifyDISCard() {
      let data = {
        dis_no: this.data.application_allowance_values[`${this.keyGetByName('DIS No.')}`].value,
      };

      this.$axios.post("/global/online-application/dis-card-verification", data, {
        headers: {
          Accept: "application/json",
        },
      })
        .then((res) => {
          console.log(res)
          this.$toast.success(res.data.data);

        })
        .catch((err) => {
          console.log(err)
          this.$toast.error(err.response.data.message);
        })
    },

    async submitApplicationCheck() {
      if (this.status_code != 200) {
        this.$toast.error('Verify First');
        return false;
      }


      const isValid = await this.$refs.form.validate();

      if (!isValid) {
        // Find the first element with an error and scroll to it
        const firstErrorElement = document.querySelector('.v-messages.error--text');
        if (firstErrorElement) {
          const windowHeight = window.innerHeight;
          const elementTop = firstErrorElement.getBoundingClientRect().top;
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const offset = elementTop + scrollTop - windowHeight / 2; // Adjust scroll position

          window.scrollTo({
            top: offset,
            behavior: 'smooth'
          });
        }


      } else {
        console.log("submit Application Successfully");
        this.confirmDialog = true;
      }
    }
    ,


    submitApplication() {

      let fd = new FormData();

      this.loading = true;
      this.$axios.post("/global/online-application/registration", fd, {
        headers: {
          "Application": "application/json",
          "Content-Type": "multipart/form-data",
        }
      }).then((res) => {
        // this.$toast.success("Your Application submitted Successfully");
        this.$refs.form.reset();
        this.loading = false;
        // console.log(res.data.data, "data")
        // console.log(res.data.id, "id")
        this.$store.commit('ApplicationSelection/setSuccessId', res.data.id);
        // console.log(res.data.id, " after store id")

        this.$router.push("/submitted-application");
        // console.log(res.data.id, " after pushing id")
        // this.$router.push(`/online-application-preview/${res.data.application_id}`);

      })
        .catch((err) => {
          this.loading = false;
          console.log(err);

          if (err.response) {
            if (err.response.data.success == false) {
              // this.$refs.form.setErrors(err.response.data.errors);
              // this.$toast.error(err.response.data.message);
              if (err.response.data.error_code == "applicant_gender_type") {
                let errs = {
                  "gender_id": [err.response.data.message]
                }
                this.$refs.form.setErrors(err.response.data.message);
                //scroll to first error filed
                const firstErrorField = document.querySelector(".validation_error_gender_type");
                if (firstErrorField) {
                  firstErrorField.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                    inline: "nearest",
                  });
                }

                // end of scroll to first error filed
                this.$toast.error(err.response.data.message);



              }
     
              else if (err.response.data.error_code == "invalid_nid") {
                this.$refs.form.setErrors(err.response.data.message);
                //scroll to first error filed
                const firstErrorField = document.querySelector(".validation_error_age_limit");
                if (firstErrorField) {
                  firstErrorField.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                    inline: "nearest",
                  });
                }

                // end of scroll to first error filed
                this.$toast.error(err.response.data.message);

              }
      
            } else if (err.response) {
              this.$refs.form.setErrors(err.response.data.errors);

              // this.$toast.error(err.response.data.message);
              this.$toast.error(
                (err?.response?.data?.errors?.verification_number?.[0] ?? '') +
                '\n' +
                (err?.response?.data?.errors?.mobile?.[0] ?? '')
              );

              this.errors = err.response.data.errors


              // if (err.response.data.error_code === "verification_number") {
              if (err?.response?.data?.errors?.mobile?.[0]) {
                //scroll to first error filed
                this.$nextTick(() => {
                  const firstErrorField2 = document.querySelector(".validation-error-mobile");
                  if (firstErrorField2) {
                    firstErrorField2.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                      inline: "start",
                    });
                  }
                });
                // end of scroll to first error filed

              }

              if (err?.response?.data?.errors?.verification_number?.[0]) {
                //scroll to first error filed
                this.$nextTick(() => {
                  const firstErrorField1 = document.querySelector(".validation-error");
                  if (firstErrorField1) {
                    firstErrorField1.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                      inline: "start",
                    });
                  }
                });
                // end of scroll to first error filed

              }


              // }
              // else if (err.response.data.error_code === "mobile") {
              //      //scroll to first error filed
              //   this.$nextTick(() => {
              //     const firstErrorField = document.querySelector(".validation_error_mobile");
              //     if (firstErrorField) {
              //       firstErrorField.scrollIntoView({
              //         behavior: "smooth",
              //         block: "start",
              //         inline: "start",
              //       });
              //     }
              //   });
              //   // end of scroll to first error filed

              // }



            }
          }
        });
    },

    async getProgramName() {
      // if (this.data.program != null && this.programs.length > 0) {
      console.log(this.programs, "check");
      let programName = this.programs.filter(
        (item) => item.id == this.data.program_id
      );

      // this.programName = await programName[0]?.name_en;
      this.programName = await programName[0];

      this.pmt_status = await programName[0]?.pmt_status;
      console.log(this.pmt_status, "pmt_status");
      this.programDetails = await programName[0];
      if (this.programDetails != null) {
        this.data.application_allowance_values = [];
        await this.programDetails.additional_field.forEach((item) => {
          let obj = {
            allowance_program_additional_fields_id: item.id,
            allowance_program_additional_field_values_id: null,
            value: null,
          };
          this.data.application_allowance_values.push(obj);
        });
      }

      if (this.PMTVariables) {
        this.data.application_pmt = []
        this.PMTVariables.forEach((item) => {
          let obj = {
            variable_id: item.id,
            sub_variables: null,
          };
          this.data.application_pmt.push(obj);
        });
      }

      // }
    },
    getAllPMT() {
      this.$axios.get("global/pmt").then((res) => {
        this.PMTVariables = res.data.data;
      });
    },
    getAllProgram() {
      this.$axios.get("global/program").then((res) => {
        this.programs = res.data.data;
      });
    },
    getAllMobileOperator() {
      this.$axios.get("global/mobile-operator").then((res) => {
        this.mobile_operators = res.data;

      });
    },
    getAllDivision() {
      this.$axios.get("global/division/get").then((res) => {
        this.divisions = res.data.data;
      });
    },
    permanent_getAllDivision() {
      this.$axios.get("global/division/get").then((res) => {
        this.permanent_divisions = res.data.data;
      });
    },
    async onChangeDivision(event) {
      await this.$axios
        .get(`/global/district/get/${event}`, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          this.districts = result.data.data;
        });
    },
    async permanent_onChangeDivision(event) {
      await this.$axios
        .get(`/global/district/get/${event}`, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          this.permanent_districts = result.data.data;
        });
    },
    async onChangeSubLocationType($event) {
      // alert(event);

      if ($event == 1) {
        console.log(this.data.thana_id, "this.data.thana_id")
        await this.$axios
          .get(`/global/union/pouro/get/${this.data.thana_id}`, {
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
      if ($event == 2) {
        this.onChangeUpazila(this.data.thana_id);
        this.data.pouro_id = null;
      }
    },
    async onChangeSubLocationTypePermanent(event) {
      // alert(event);

      if (event == 1) {
        await this.$axios
          .get(`/global/union/pouro/get/${this.data.permanent_thana_id}`, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((result) => {
            this.permanent_pouros = result.data.data;
          });
        this.data.permanent_union_id = null;
      }
      if (event == 2) {
        this.permanent_onChangeUpazila(this.data.permanent_thana_id);
        this.data.permanent_pouro_id = null;
        console.log("its calling always,onChangeSubLocationTypePermanent ")
      }
    },
    async onChangeUpazila(event) {
      await this.$axios
        .get(`/global/union/get/${this.data.thana_id}`, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          this.unions = result.data.data;
          // this.onChangeSubLocationType(this.data.sub_location_type)

        });
    },
    async permanent_onChangeUpazila(event) {
      await this.$axios
        .get(`/global/union/get/${this.data.permanent_thana_id}`, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          this.permanent_unions = result.data.data;
          // this.onChangeSubLocationTypePermanent(this.data.permanent_sub_location_type)
          console.log("its calling always,permanent_onChangeUpazila ")

        });
    },
    async onChangeDistrict(event) {
      await this.$axios
        .get(`/global/thana/get/${event}`, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          this.LocationType(this.data.location_type);
          this.thanas = result.data.data;
        });
    },
    async permanent_onChangeDistrict(event) {
      await this.$axios
        .get(`/global/thana/get/${event}`, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          this.permanent_LocationType(this.data.permanent_location_type);
          this.permanent_thanas = result.data.data;
        });
    },
    async onChangeThana(event) {
      await this.$axios
        .get(`/global/union/get/${event}`, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          this.unions = result.data.data;
        });
    },
    async permanent_onChangeThana(event) {
      await this.$axios
        .get(`/global/union/get/${event}`, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          this.permanent_unions = result.data.data;
        });
    },
    async onChangeCity(event) {
      await this.$axios
        .get(`/global/thana/get/city/${this.data.city_id}`, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          this.city_thanas = result.data.data;
        });
    },
    async permanent_onChangeCity(event) {
      await this.$axios
        .get(`/global/thana/get/city/${this.data.permanent_city_id}`, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          this.permanent_city_thanas = result.data.data;
          // this.permanent_wards_upazila = [];
          // this.permanent_wards_dist = [];
          // this.permanent_ward_id_dist = null;
          // this.permanent_ward_id_upazila = null;
        });
    },
    async OnChangeCityThana($event) {
      await this.$axios
        .get(`/global/ward/get/thana/${this.data.city_thana_id}`, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          this.wards_city = result.data.data;
          this.wards_upazila = [];
          this.wards_dist = [];
          this.ward_id_dist = null;
          this.ward_id_upazila = null;
        });

    },
    async Permanent_OnChangeCityThana($event) {


      await this.$axios
        .get(`/global/ward/get/thana/${this.data.permanent_city_thana_id}`, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          this.permanent_wards_city = result.data.data;
          console.log(this.permanent_wards_city, "hi called thana properly")
          this.permanent_wards_upazila = [];
          this.permanent_wards_dist = [];
          this.permanent_ward_id_dist = null;
          this.permanent_ward_id_upazila = null;
        });

    },
    async onChangeDistrictPouro($event) {
      console.log("hi district pourashava called")
      await this.$axios
        .get(`/global/ward/get/district_pouro/${this.data.district_pouro_id}`, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          this.wards_dist = result.data.data;
          this.wards_upazila_union = [];
          this.wards_upazila_pouro = [];
          this.wards_city = [];
          this.ward_id_city = null;
          this.ward_id_union = null;
        });

    },
    async Permanent_onChangeDistrictPouro($event) {
      await this.$axios
        .get(`/global/ward/get/district_pouro/${this.data.permanent_district_pouro_id}`, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          this.permanent_wards_dist = result.data.data;
          this.permanent_wards_upazila_union = [];
          this.permanent_wards_upazila_pouro = [];
          this.permanent_wards_city = [];
          this.permanent_ward_id_city = null;
          this.permanent_ward_id_union = null;
        });

    },

    async LocationType($event) {
      if (this.data.district_id != null && this.data.location_type != null) {
        if ($event === 2) {
          await this.$axios
            .get(`/global/thana/get/${this.data.district_id}`, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((result) => {
              this.thanas = result.data.data;
            });
        }
        if ($event === 3) {
          await this.$axios
            .get("/global/city/get/" + this.data.district_id + "/" + $event, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((result) => {
              this.cities = result.data.data;
            });
        }
        if ($event === 1) {
          await this.$axios
            .get("/global/city/get/" + this.data.district_id + "/" + $event, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((result) => {
              this.district_poros = result.data.data;
            });
        }
      }
    },
    async permanent_LocationType($event) {
      if (this.data.permanent_district_id != null && this.data.permanent_location_type != null) {
        if ($event === 2) {
          await this.$axios
            .get(`/global/thana/get/${this.data.permanent_district_id}`, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((result) => {
              this.permanent_thanas = result.data.data;
              console.log("its calling always")
            });
        }
        if ($event === 3) {
          await this.$axios
            .get("/global/city/get/" + this.data.permanent_district_id + "/" + $event, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((result) => {
              this.permanent_cities = result.data.data;
            });
        }
        if ($event === 1) {
          await this.$axios
            .get("/global/city/get/" + this.data.permanent_district_id + "/" + $event, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((result) => {
              this.permanent_district_poros = result.data.data;
            });
        }
      }
    },

    save(data) {
      this.$refs.menu.save(data.date_of_birth);
    },
    previewImage() {
      if (this.data.image) {

        const maxFileSize = 200 * 1024; // 200 KB in bytes

        if (this.data.image.size > maxFileSize) {
          // alert("file size must be 200kb")
          // this.confirmDialog =true;
          this.$toast.error("File size must be under 200 KB ");// Show the alert
          this.data.image = '';

          return false;
        }
        const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg']; // Allowed file types
        if (!allowedTypes.includes(this.data.image.type)) {
          this.$toast.error("Only PNG, JPEG, or JPG files are allowed");
          this.data.image = '';
          return false;
        }
        // return true;




        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageUrl = e.target.result;
        };
        reader.readAsDataURL(this.data.image);
      } else {
        // Clear the preview if no file is selected
        this.imageUrl = null;
      }

    },
    addPreviewFile(event, index) {
      console.log(event, index)
      const reader = new FileReader();
      reader.onload = (e) => {
        this.data.application_allowance_values[index].file_value = e.target.result;
      };
      reader.readAsDataURL(event);
    },
    previewSign() {
      if (this.data.signature) {
        const maxFileSize = 200 * 1024;
        if (this.data.signature.size > maxFileSize) {

          this.$toast.error("File size must be unser 200 KB ");// Show the alert
          this.data.signature = '';

          return false;

        }
        const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg']; // Allowed file types
        if (!allowedTypes.includes(this.data.signature.type)) {
          this.$toast.error("Only PNG, JPEG, or JPG files are allowed");
          this.data.signature = '';
          return false;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
          this.signUrl = e.target.result;
        };
        reader.readAsDataURL(this.data.signature);
      } else {
        // Clear the preview if no file is selected
        this.signUrl = null;
      }
    },
    previewImageNominee() {

      if (this.data.nominee_image) {
        const maxFileSize = 200 * 1024;
        // Read the selected file and generate a preview URL
        if (this.data.nominee_image.size > maxFileSize) {

          this.$toast.error("File size must be unser 200 KB ");// Show the alert
          this.data.nominee_image = '';

          return false;

        }
        const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg']; // Allowed file types
        if (!allowedTypes.includes(this.data.nominee_image.type)) {
          this.$toast.error("Only PNG, JPEG, or JPG files are allowed");
          this.data.nominee_image = '';
          return false;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
          this.nomineeImageUrl = e.target.result;
        };
        reader.readAsDataURL(this.data.nominee_image);
      } else {
        // Clear the preview if no file is selected
        this.nomineeImageUrl = null;
      }
    },
    previewSignNominee() {
      if (this.data.nominee_signature) {
        // Read the selected file and gener
        const maxFileSize = 200 * 1024;
        if (this.data.nominee_signature.size > maxFileSize) {

          this.$toast.error("File size must be unser 200 KB ");// Show the alert
          this.data.nominee_signature = '';

          return false;

        }
        const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg']; // Allowed file types
        if (!allowedTypes.includes(this.data.nominee_signature.type)) {
          this.$toast.error("Only PNG, JPEG, or JPG files are allowed");
          this.data.nominee_signature = '';
          return false;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
          this.nomineeSignUrl = e.target.result;
        };
        reader.readAsDataURL(this.data.nominee_signature);
      } else {
        // Clear the preview if no file is selected
        this.nomineeSignUrl = null;
      }
    },
    async onChangeUnion($event) {



      await this.$axios
        .get(`/global/ward/get/${$event}`, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {

          this.wards_upazila_union = result.data.data;
          console.log(this.wards_upazila_union, "union");
          this.wards_upazila_pouro = [];
          this.wards_dist = [];
          this.wards_city = [];
          this.data.ward_id_dist = null;
          this.data.ward_id_city = null;
          this.data.ward_id_pouro = null;

        });

    },
    async permanent_onChangeUnion($event) {
      await this.$axios
        .get(`/global/ward/get/${$event}`, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {

          this.permanent_wards_upazila_union = result.data.data;
          this.permanent_wards_dist = [];
          this.permanent_wards_city = [];
          this.data.permanent_ward_id_dist = null;
          this.data.permanent_ward_id_city = null;
          this.data.permanent_ward_id_pouro = null;
          console.log(this.permanent_wards_upazila_union, "called union ward")

        });

    },
    async onChangePouro($event) {
      console.log("hi pouro called")

      await this.$axios
        .get(`/global/ward/get/pouro/${$event}`, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {

          this.wards_upazila_pouro = result.data.data;
          this.wards_upazila_union = [];
          this.wards_dist = [];
          this.wards_city = [];
          this.data.ward_id_dist = null;
          this.data.ward_id_city = null;
          this.data.ward_id_union = null;

        });

    },
    async Permanent_onChangePouro($event) {
      console.log($event, "pouro called")
      await this.$axios
        .get(`/global/ward/get/pouro/${$event}`, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {

          this.permanent_wards_upazila_pouro = result.data.data;
          console.log(this.permanent_wards_upazila_pouro, "pouro called properly")
          this.permanent_wards_upazila_union = [];
          this.permanent_wards_dist = [];
          this.permanent_wards_city = [];
          this.data.permanent_ward_id_dist = null;
          this.data.permanent_ward_id_city = null;
          this.data.permanent_ward_id_union = null;

        });

    },
  },
  mounted() {
    if (this.$refs.fieldNameInput) {
      this.$refs.fieldNameInput.$el.focus();
    }
  },
  created() {
    this.GetGrievanceSubject();
    this.GetGrievanceType();
    this.SendActivityLog();
    this.getAllProgram();
    this.getAllDivision();
    this.permanent_getAllDivision();
    this.getProgramName();
    this.getAllPMT();
    this.$store
      .dispatch("getGlobalLookupByType", 20)
      .then((res) => (this.classes = res));
    this.$store
      .dispatch("getGlobalLookupByType", 2)
      .then((res) => (this.genders = res));
    this.$store
      .dispatch("getGlobalLookupByType", 1)
      .then((res) => (this.locationType = res));
    this.getAllMobileOperator();
    console.log(this.$el, "el");
  },

};
</script>

<style scoped>
html.my-app,
body.my-app {
  overflow: hidden !important;
}

.centered-text {
  text-align: center !important;
}

.v-label-with-asterisk::after {
  content: " *";
  color: red;
  /* You can customize the asterisk color */
}

.align-end {
  align-self: flex-end;
}

.no-calendar-icon .v-input__icon {
  display: none;
  /* Hide the default calendar icon */
}

.disabled-text-field {
  background-color: #f5f5f5;
  color: #999;
  cursor: not-allowed;
}
</style>

