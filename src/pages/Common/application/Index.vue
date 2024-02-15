<template>
  <div id="application">

    <v-app-bar color="#405c61" fixed height="80" class="px-4" dense dark>
      <v-row align="center" no-gutters>
        <v-img class="p-3 mr-4" max-height="100%" max-width="60px" position="center center"
          src="/assets/images/logo.png"></v-img>
        <v-toolbar-title>{{ $t('container.application_selection.application.title_online_1') }}<br>{{
          $t('container.application_selection.application.title_online_2') }}
        </v-toolbar-title>



        <v-col>
          <!-- Empty column to create space between title and LocaleSwitcher -->
        </v-col>
        <v-col>
          <!-- Empty column to create space between title and LocaleSwitcher -->
        </v-col>
        <v-col>
          <!-- Empty column to create space between title and LocaleSwitcher -->
        </v-col>
        <v-col>
          <!-- Empty column to create space between title and LocaleSwitcher -->
        </v-col>
        <v-col>
          <!-- Empty column to create space between title and LocaleSwitcher -->
        </v-col>
        <v-col>
          <!-- Empty column to create space between title and LocaleSwitcher -->
        </v-col>

        <v-col>
          <v-row align="center" justify="end" no-gutters>
            <v-col>
              <!-- Adjust the styling of LocaleSwitcher as needed -->
              <LocaleSwitcher />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-app-bar>

    <v-row class="mx-5 my-5 mt-10">
      <v-col class="mt-10" cols="10" offset="1">
        <ValidationObserver ref="form" v-slot="{ invalid }">
          <form @submit.prevent="submitApplication()">
            <v-card class="pa-5 px-10 mb-4">

              <!-- <v-btn  flat color="primary" @click="gotocheck()"
                                class="custom-btn-width black white--text py-2">
                              check
                              </v-btn> -->
              <p class="mt-5" style="font-size: 20px">
                {{ $t('container.application_selection.application.new_applicant') }}<span class="red--text">
                  ({{ $t('container.application_selection.application.applicant_alert') }})

                </span>

              </p>

              <ValidationProvider name="program" vid="program" rules="required" v-slot="{ errors }">
                <label>{{ $t('container.application_selection.application.program') }} </label>
                <span style="margin-left: 4px; color: red">*</span>
                <v-select @change="getProgramName()" outlined :items="programs" item-text="name_en" item-value="id"
                  v-model="data.program_id" :error="errors[0] ? true : false" :error-messages="errors[0]">
                </v-select>
              </ValidationProvider>
              <div v-if="data.program_id">
                <v-expansion-panels v-model="panel" multiple>
                  <!-- Applicant Verification -->
                  <v-expansion-panel>
                    <v-expansion-panel-header color="primary">
                      <h3 class="white--text">{{ $t('container.application_selection.application.applicant_verification')
                      }}</h3>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content class="mt-5">
                      <ValidationProvider name="program" vid="verification_type" rules="required" v-slot="{ errors }">

                        <div class="validation-error validation_error_age_limit">
                          <v-radio-group v-model="data.verification_type" row>
                            {{ $t('container.application_selection.application.verification_type') }}
                            <span style="
                              margin-left: 4px;
                              margin-right: 4px;
                              color: red;
                            ">*</span>
                            <v-radio :label="$t('container.application_selection.application.nid')" :value="1"></v-radio>
                            <v-radio :label="$t('container.application_selection.application.brn')" :value="2"></v-radio>
                          </v-radio-group>
                        </div>
                      </ValidationProvider>

                      <V-row>

                        <v-col cols="4">

                          <ValidationProvider name="Number" vid="verification_number" rules="checkNumber||required"
                            v-slot="{ errors }">
                            <label>
                              <span v-if="data.verification_type == 1">
                                {{ $t('container.application_selection.application.nid') }}
                              </span>
                              <span v-else-if="data.verification_type == 2">
                                {{ $t('container.application_selection.application.brn') }}
                              </span>
                              <span v-else>
                                {{ $t('container.application_selection.application.nid_brn') }}

                              </span>

                            </label>

                            <span style="margin-left: 4px; color: red">*</span>
                            <v-text-field @change="checkNum()" outlined clearable v-model="data.verification_number"
                              class="mr-2" type="text" required :error="errors[0] ? true : false"
                              :error-messages="errors[0]">
                            </v-text-field>


                          </ValidationProvider>

                        </v-col>



                        <v-col cols="2">


                          <!-- Day Dropdown -->
                          <label>{{ $t('container.application_selection.application.day') }} </label>
                          <span style="margin-left: 4px; color: red">*</span>

                          <v-select v-model="selectedDay" :items="twoDigitDays" clearable outlined
                            @change="updateDate"></v-select>

                        </v-col>
                        <!-- Month Dropdown -->

                        <v-col cols="2">
                          <label>{{ $t('container.application_selection.application.month') }} </label>
                          <span style="margin-left: 4px; color: red">*</span>
                          <v-select clearable v-model="selectedMonth" :items="months" outlined
                            @change="updateDate"></v-select>
                        </v-col>



                        <!-- Year Dropdown -->
                        <v-col cols="2">
                          <label>{{ $t('container.application_selection.application.year') }} </label>
                          <span style="margin-left: 4px; color: red">*</span>
                          <ValidationProvider name="Age" vid="age" v-slot="{ errors }" rules="required">
                            <v-select clearable v-model="selectedYear" :items="years" outlined
                              @change="updateDate"></v-select>
                          </ValidationProvider>

                        </v-col>


                        <!-- Read-only field to display calculated date of birth -->


                        <v-col cols="2">

                          <label>{{ $t('container.application_selection.application.date_of_birth') }} </label>
                          <span style="margin-left: 4px; color: red">*</span>
                          <ValidationProvider name="Date of Birth" vid="date_of_birth" v-slot="{ errors }"
                            rules="required">

                            <v-text-field v-model="data.date_of_birth" readonly :value="formattedDate"
                              outlined></v-text-field>
                          </ValidationProvider>




                        </v-col>




                        <!-- <v-col>
                          <label>Date of Birth </label>

                          <span style="margin-left: 4px; color: red">*</span> -->

                        <!-- <ValidationProvider
                            v-slot="{ errors }"
                            name="Date of Birth"
                            rules="required"
                            vid="date_of_birth"
                          >
                            <v-text-field
                              v-model="data.date_of_birth"
                              format="YYYY-MM-DD"
                              :hide-details="errors[0] ? false : true"
                              :error="errors[0] ? true : false"
                              :error-messages="errors[0]"
                              type="date"
                              outlined
                            >
                            </v-text-field>
                          </ValidationProvider> -->
                        <!-- </v-col> -->

                      </V-row>
                      <div></div>
                      <div class="d-inline d-flex justify-end">
                        <v-btn @click="verifyCard()" elevation="2"
                          :disabled="data.date_of_birth == null || data.verification_number == null || data.verification_type == null || data.date_of_birth == '' || data.verification_number == '' || data.verification_type == ''"
                          class="btn" color="primary">{{ $t('container.list.verify') }}</v-btn>
                      </div>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                  <!-- Applicant Verification end -->



                  <!-- 3rd Expansion panel -->
                  <!-- Personal Information  -->
                  <v-expansion-panel>
                    <v-expansion-panel-header color="primary">
                      <h3 class="white--text">{{ $t('container.application_selection.application.personal_info') }}</h3>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content class="mt-5">
                      <div class="pa-2 mb-4">
                        <v-row>
                          <v-col cols="6" lg="6">
                            <v-img :src="imageUrl" style="
                                    width: 200px;
                                    height: 200px;
                                    border: 1px solid #ccc;
                                  " class="mb-5" v-if="imageUrl"></v-img>
                            <v-img src="/assets/images/profile.png" v-if="!imageUrl" style="
                                    width: 150px;
                                    height: 150px;
                                    border: 1px solid #ccc;
                                  " class="mb-5"></v-img>
                            <ValidationProvider v-slot="{ errors }" name="Image" rules="required" vid="image">
                              <label>{{ $t('container.application_selection.application.image') }} ({{
                                $t('container.application_selection.application.image_alert') }})</label>
                              <span style="margin-left: 4px; color: red">*</span>
                              <v-file-input outlined show-size counter prepend-inner-icon="mdi-camera"
                                v-model="data.image" accept="image/*" @change="previewImage"
                                prepend-icon=""></v-file-input>
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="6" align-self="end" lg="6">
                            <v-img :src="signUrl" style="
                                    width: 200px;
                                    height: 80px;
                                    border: 1px solid #ccc;
                                  " class="mb-5" v-if="signUrl"></v-img>
                            <v-img src="/assets/images/sign.png" v-if="!signUrl" style="
                                    width: 200px;
                                    height: 80px;
                                    border: 1px solid #ccc;
                                  " class="mb-5"></v-img>
                            <ValidationProvider v-slot="{ errors }" name="Signature" rules="required" vid="sign">
                              <label>{{ $t('container.application_selection.application.signature') }} ({{
                                $t('container.application_selection.application.signature_alert') }})</label>
                              <span style="margin-left: 4px; color: red">*</span>
                              <v-file-input outlined show-size counter prepend-inner-icon="mdi-camera"
                                v-model="data.signature" accept="image/*" @change="previewSign"
                                prepend-icon=""></v-file-input>
                            </ValidationProvider>
                          </v-col>

                          <v-col cols="6" lg="6">
                            <ValidationProvider name="Name in English" vid="name_en" rules="required" v-slot="{ errors }">
                              <label>{{ $t('container.application_selection.application.name_en') }}</label>
                              <span style="margin-left: 4px; color: red">*</span>
                              <v-text-field v-model="data.name_en" outlined clearable :error="errors[0] ? true : false"
                                :error-messages="errors[0]">
                              </v-text-field>
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="6" lg="6">
                            <ValidationProvider name="Name in Bangla" vid="name_bn" rules="required" v-slot="{ errors }">
                              <label>{{ $t('container.application_selection.application.name_bn') }} </label>
                              <span style="margin-left: 4px; color: red">*</span>
                              <v-text-field v-model="data.name_bn" outlined :error="errors[0] ? true : false"
                                :error-messages="errors[0]">
                              </v-text-field>
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="6" lg="6">
                            <ValidationProvider name="Father Name in Bangla" vid="father_name_bn" rules="required"
                              v-slot="{ errors }">
                              <label>{{ $t('container.application_selection.application.father_name_bn') }}</label>

                              <v-text-field v-model="data.father_name_bn" outlined clearable
                                :error="errors[0] ? true : false" :error-messages="errors[0]">
                              </v-text-field>
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="6" lg="6">
                            <ValidationProvider name="Father Name in English" vid="father_name_en" rules="required"
                              v-slot="{ errors }">
                              <label>{{ $t('container.application_selection.application.father_name_en') }}</label>
                              <v-text-field v-model="data.father_name_en" outlined clearable
                                :error="errors[0] ? true : false" :error-messages="errors[0]">
                              </v-text-field>
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="6" lg="6">
                            <div class="validation-error-mobile">
                              <ValidationProvider name="Mother Name in English" vid="mother_name_bn" v-slot="{ errors }">
                                <label>{{ $t('container.application_selection.application.mother_name_bn') }}</label>
                                <v-text-field v-model="data.mother_name_bn" outlined clearable
                                  :error="errors[0] ? true : false" :error-messages="errors[0]">
                                </v-text-field>
                              </ValidationProvider>
                            </div>
                          </v-col>

                          <v-col cols="6" lg="6">

                            <ValidationProvider name="Mother Name in English" vid="mother_name_en" v-slot="{ errors }">
                              <label>{{ $t('container.application_selection.application.mother_name_en') }}</label>
                              <v-text-field v-model="data.mother_name_en" outlined clearable
                                :error="errors[0] ? true : false" :error-messages="errors[0]">
                              </v-text-field>
                            </ValidationProvider>

                          </v-col>

                          <v-col cols="6" lg="6">


                            <ValidationProvider rules="checkNumberMobile" name="Mobile Number" vid="mobile"
                              v-slot="{ errors }">
                              <label style="display: inline-block">{{
                                $t('container.application_selection.application.mobile') }} </label><span
                                style="margin-left: 4px; color: red">*</span>

                              <v-text-field v-model="data.mobile" outlined type="number" clearable
                                :error="errors[0] ? true : false" :error-messages="errors[0]">
                              </v-text-field>
                            </ValidationProvider>


                          </v-col>


                          <v-col cols="6" lg="6">
                            <div class="validation-error_marital">
                              <ValidationProvider name="Marital Status" rules="required" vid="marital_status"
                                v-slot="{ errors }">

                                <label>{{ $t('container.system_config.allowance_program.marital_status') }}</label>
                                <span style="margin-left: 4px; color: red">*</span>
                                <v-select v-model="data.marital_status" outlined clearable :items="marital_status"
                                  :error="errors[0] ? true : false" :error-messages="errors[0]">
                                </v-select>
                              </ValidationProvider>
                            </div>
                          </v-col>
                          <v-col cols="6" lg="6" v-if="data.marital_status == 'Married'">
                            <ValidationProvider name="Spouse Name in Bangla" vid="spouse_name_bn" v-slot="{ errors }">
                              <label>{{ $t('container.application_selection.application.spouse_name_bn') }}</label>
                              <v-text-field v-model="data.spouse_name_bn" outlined clearable
                                :error="errors[0] ? true : false" :error-messages="errors[0]">
                              </v-text-field>
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="6" lg="6" v-if="data.marital_status == 'Married'">
                            <ValidationProvider name="Spouse Name in English" vid="spouse_name_en" v-slot="{ errors }">
                              <label>{{ $t('container.application_selection.application.spouse_name_en') }}</label>
                              <v-text-field v-model="data.spouse_name_en" outlined clearable
                                :error="errors[0] ? true : false" :error-messages="errors[0]">
                              </v-text-field>
                            </ValidationProvider>
                          </v-col>

                          <v-col cols="6" lg="6">
                            <ValidationProvider name="Religion" vid="religion" v-slot="{ errors }" rules="required">
                              <label>{{ $t('container.application_selection.application.religion') }}</label>
                              <span style="margin-left: 4px; color: red">*</span>

                              <v-select v-model="data.religion" outlined :items="religion"
                                :error="errors[0] ? true : false" :error-messages="errors[0]">
                              </v-select>
                            </ValidationProvider>
                          </v-col>


                          <v-col cols="6" lg="6">
                            <div class="validation_error_gender_type">
                              <ValidationProvider name="Nationality" vid="nationality" readonly v-slot="{ errors }">
                                <label>{{ $t('container.application_selection.application.nationality') }}</label>
                                <v-text-field v-model="data.nationality" outlined :error="errors[0] ? true : false"
                                  :error-messages="errors[0]">
                                </v-text-field>
                              </ValidationProvider>
                            </div>
                          </v-col>
                          <v-col cols="6" lg="6">
                            <!-- <div class="validation_error_age_limit"> -->
                            <ValidationProvider name="Age" vid="age" v-slot="{ errors }" rules="required">
                              <label>{{ $t('container.application_selection.application.age') }}</label>
                              <span style="margin-left: 4px; color: red">*</span>
                              <v-text-field v-model="data.age" outlined type="number" clearable
                                :error="errors[0] ? true : false" :error-messages="errors[0]">
                              </v-text-field>
                            </ValidationProvider>
                            <!-- </div> -->
                          </v-col>
                          <v-col cols="6" lg="6">
                            <ValidationProvider name="Gender" vid="gender" v-slot="{ errors }" rules="required">
                              <label>{{ $t('container.system_config.allowance_program.gender') }}</label>
                              <span style="margin-left: 4px; color: red">*</span>
                              <v-select v-model="data.gender_id" item-text="value_en" item-value="id" outlined
                                :items="genders" :error="errors[0] ? true : false" :error-messages="errors[0]">
                              </v-select>
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="6" lg="6">
                            <ValidationProvider name="Education Status" vid="education_status" rules="required"
                              v-slot="{ errors }">
                              <label>{{ $t('container.application_selection.application.education_status') }}</label>
                              <span style="margin-left: 4px; color: red">*</span>
                              <v-select v-model="data.education_status" outlined :error="errors[0] ? true : false"
                                :error-messages="errors[0]" :items="education_status">
                              </v-select>
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="6" lg="6">
                            <ValidationProvider name="Profession" vid="profession" v-slot="{ errors }">
                              <label>{{ $t('container.application_selection.application.profession') }}</label>
                              <span style="margin-left: 4px; color: red">*</span>
                              <v-autocomplete v-model="data.profession" outlined clearable :items="professionType"
                                :error="errors[0] ? true : false" :error-messages="errors[0]">
                              </v-autocomplete>
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="6" lg="6">
                            <ValidationProvider name="Identification Mark" vid="identification_mark" v-slot="{ errors }">
                              <label>{{ $t('container.application_selection.application.identification_mark') }}</label>
                              <v-text-field v-model="data.identification_mark" outlined clearable
                                :error="errors[0] ? true : false" :error-messages="errors[0]">
                              </v-text-field>
                            </ValidationProvider>
                          </v-col>
                        </v-row>
                      </div>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                  <!-- Personal Information end-->
                  <!-- 2nd Expansion panel -->


                  <!-- 3rd Expansion panel -->
                  <!-- Contact Information -->
                  <v-expansion-panel class="ma-4">
                    <v-expansion-panel-header color="primary">
                      <h3 class="white--text">{{ $t('container.application_selection.application.contact_info') }}</h3>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content class="mt-5">


                      <v-row>
                        <v-col cols="12" class="text-center">
                          <v-chip color="success" class="text-uppercase" label>{{
                            $t('container.application_selection.application.present_address') }}</v-chip>
                        </v-col>
                        <v-col lg="6" md="6" cols="12">
                          <ValidationProvider name="Division" vid="division" rules="required" v-slot="{ errors }">
                            <label style="display: inline-block"> {{
                              $t('container.system_config.demo_graphic.division.division') }}
                            </label>
                            <span style="margin-left: 4px; color: red">*</span>
                            <v-autocomplete :hide-details="errors[0] ? false : true" @input="onChangeDivision($event)"
                              v-model="data.division_id" outlined :items="divisions" item-text="name_en" item-value="id"
                              :error="errors[0] ? true : false" :error-messages="errors[0]"></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <v-col lg="6" md="6" cols="12">
                          <ValidationProvider name="District" vid="district" rules="required" v-slot="{ errors }">
                            <label style="display: inline-block">{{
                              $t('container.system_config.demo_graphic.district.district') }}
                            </label>
                            <span style="margin-left: 4px; color: red">*</span>
                            <v-autocomplete :hide-details="errors[0] ? false : true" outlined v-model="data.district_id"
                              @input="onChangeDistrict($event)" :items="districts" item-text="name_en" item-value="id"
                              :error="errors[0] ? true : false" :error-messages="errors[0]"></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <v-col cols="6">
                          <ValidationProvider name="Location Type" vid="location_type" rules="required"
                            v-slot="{ errors }">
                            <label style="display: inline-block">{{ $t('container.list.location_type') }}
                            </label>
                            <span style="margin-left: 4px; color: red">*</span>
                            <v-autocomplete @input="LocationType($event)" v-model="data.location_type"
                              :hide-details="errors[0] ? false : true" outlined :items="locationType" item-text="value_en"
                              item-value="id" :error="errors[0] ? true : false"
                              :error-messages="errors[0]"></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <v-col v-if="data.location_type == 2" lg="6" md="6" cols="6">
                          <ValidationProvider name="Upazila" vid="thana_id" rules="required" v-slot="{ errors }">
                            <label style="display: inline-block">{{
                              $t('container.system_config.demo_graphic.ward.upazila') }}
                            </label>
                            <span style="margin-left: 4px; color: red">*</span>
                            <v-autocomplete :hide-details="errors[0] ? false : true" v-model="data.thana_id" outlined
                              @change="onChangeUpazila($event)" :items="thanas" item-text="name_en" item-value="id"
                              :error="errors[0] ? true : false" :error-messages="errors[0]"></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <v-col v-if="data.location_type == 2" lg="6" md="6" cols="6">
                          <label style="display: inline-block">{{
                            $t('container.system_config.demo_graphic.ward.subLocation_type') }}
                          </label>
                          <span style="margin-left: 4px; color: red">*</span>
                          <ValidationProvider name="subLocationType" vid="subLocationType" v-slot="{ errors }">
                            <v-autocomplete @input="onChangeSubLocationType($event)" v-model="data.sub_location_type"
                              outlined :items="subLocationType" item-text="value_en" item-value="id"
                              :error="errors[0] ? true : false" :error-messages="errors[0]"
                              :hide-details="errors[0] ? false : true" class="no-arrow-icon"></v-autocomplete>
                          </ValidationProvider>
                        </v-col>

                        <v-col v-if="data.location_type == 2 && data.sub_location_type === 2" cols="6">
                          <ValidationProvider name="union" vid="union_id" rules="required" v-slot="{ errors }">
                            <label style="display: inline-block">{{ $t('container.system_config.demo_graphic.ward.union')
                            }}
                            </label>
                            <span style="margin-left: 4px; color: red">*</span>
                            <v-autocomplete :hide-details="errors[0] ? false : true" v-model="data.union_id" outlined
                              @input="onChangeUnion($event)" :items="unions" item-text="name_en" item-value="id"
                              :error="errors[0] ? true : false" :error-messages="errors[0]"></v-autocomplete>
                          </ValidationProvider>
                        </v-col>

                        <v-col v-if="data.location_type == 2 && data.sub_location_type === 1" cols="6">
                          <ValidationProvider name="Pouroshava" vid="pouro_id" rules="required" v-slot="{ errors }">
                            <label style="display: inline-block">{{ $t('container.system_config.demo_graphic.ward.pouro')
                            }}
                            </label>
                            <span style="margin-left: 4px; color: red">*</span>
                            <v-autocomplete :hide-details="errors[0] ? false : true" v-model="data.pouro_id"
                              @input="onChangePouro($event)" outlined :items="pouros" item-text="name_en" item-value="id"
                              :error="errors[0] ? true : false" :error-messages="errors[0]"></v-autocomplete>
                          </ValidationProvider>


                        </v-col>
                        <v-col v-if="data.location_type == 3" lg="6" md="6" cols="6">
                          <ValidationProvider name="city" vid="city_id" rules="required" v-slot="{ errors }">
                            <label style="display: inline-block">{{ $t('container.system_config.demo_graphic.ward.city')
                            }}
                            </label>
                            <span style="margin-left: 4px; color: red">*</span>
                            <v-autocomplete :hide-details="errors[0] ? false : true" v-model="data.city_id"
                              @change="onChangeCity($event)" outlined :items="cities" item-text="name_en" item-value="id"
                              :error="errors[0] ? true : false" :error-messages="errors[0]"></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <v-col v-if="data.location_type == 3" lg="6" md="6" cols="6">
                          <ValidationProvider name="thana" vid="city_thana_id" rules="required" v-slot="{ errors }">
                            <label style="display: inline-block">{{ $t('container.system_config.demo_graphic.ward.thana')
                            }}
                            </label>
                            <span style="margin-left: 4px; color: red">*</span>
                            <v-autocomplete :hide-details="errors[0] ? false : true" v-model="data.city_thana_id" outlined
                              @input="OnChangeCityThana($event)" :items="city_thanas" item-text="name_en" item-value="id"
                              :error="errors[0] ? true : false" :error-messages="errors[0]"></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <v-col v-if="data.location_type == 1" lg="6" md="6" cols="6">
                          <ValidationProvider name="thana" vid="district_pouro_id" rules="required" v-slot="{ errors }">
                            <label style="display: inline-block">{{
                              $t('container.system_config.demo_graphic.ward.dist_pouro') }}
                            </label>
                            <span style="margin-left: 4px; color: red">*</span>
                            <v-autocomplete :hide-details="errors[0] ? false : true" v-model="data.district_pouro_id"
                              @input="onChangeDistrictPouro" outlined :items="district_poros" item-text="name_en"
                              item-value="id" :error="errors[0] ? true : false"
                              :error-messages="errors[0]"></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <v-col v-if="data.location_type == 3" lg="6" md="6" cols="6">
                          <ValidationProvider name="ward_id_city" vid="ward_id_city" rules="required" v-slot="{ errors }">
                            <label style="display: inline-block">{{ $t('container.system_config.demo_graphic.ward.ward')
                            }}
                            </label>
                            <span style="margin-left: 4px; color: red">*</span>
                            <v-autocomplete :hide-details="errors[0] ? false : true" v-model="data.ward_id_city" outlined
                              :items="wards_city" item-text="name_en" item-value="id" :error="errors[0] ? true : false"
                              :error-messages="errors[0]"></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <v-col v-if="data.location_type == 2 && data.sub_location_type == 2" lg="6" md="6" cols="6">
                          <ValidationProvider name="ward_id_union" vid="ward_id_union" rules="required"
                            v-slot="{ errors }">
                            <label style="display: inline-block">{{ $t('container.system_config.demo_graphic.ward.ward')
                            }}
                            </label>
                            <span style="margin-left: 4px; color: red">*</span>
                            <v-autocomplete :hide-details="errors[0] ? false : true" v-model="data.ward_id_union" outlined
                              :items="wards_upazila_union" item-text="name_en" item-value="id"
                              :error="errors[0] ? true : false" :error-messages="errors[0]"></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <v-col v-if="data.location_type == 2 && data.sub_location_type == 1" lg="6" md="6" cols="6">
                          <ValidationProvider name="ward_id_union" vid="ward_id_union" rules="required"
                            v-slot="{ errors }">
                            <label style="display: inline-block">Ward
                            </label>
                            <span style="margin-left: 4px; color: red">*</span>
                            <v-autocomplete :hide-details="errors[0] ? false : true" v-model="data.ward_id_pouro" outlined
                              :items="wards_upazila_pouro" item-text="name_en" item-value="id"
                              :error="errors[0] ? true : false" :error-messages="errors[0]"></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <v-col v-if="data.location_type == 1" lg="6" md="6" cols="6">
                          <ValidationProvider name="ward_id_dist" vid="ward_id_dist" rules="required" v-slot="{ errors }">
                            <label style="display: inline-block">{{ $t('container.system_config.demo_graphic.ward.ward')
                            }}
                            </label>
                            <span style="margin-left: 4px; color: red">*</span>
                            <v-autocomplete :hide-details="errors[0] ? false : true" v-model="data.ward_id_dist" outlined
                              :items="wards_dist" item-text="name_en" item-value="id" :error="errors[0] ? true : false"
                              :error-messages="errors[0]"></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <v-col cols="6" lg="6">
                          <ValidationProvider name="Post Code" vid="post_code" rules="CheckPost" v-slot="{ errors }">
                            <label style="display: inline-block">{{
                              $t('container.system_config.demo_graphic.ward.post_code') }}
                            </label>
                            <span style="margin-left: 4px; color: red">*</span>
                            <v-text-field v-model="data.post_code" outlined clearable :error="errors[0] ? true : false"
                              :error-messages="errors[0]">
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


                      <v-row>
                        <v-col cols="12" class="text-center">
                          <v-chip color="success" class="text-uppercase" label>{{
                            $t('container.application_selection.application.permanent_address') }}</v-chip>
                        </v-col>
                        <v-col cols="12">
                          <v-checkbox v-model="checkbox"
                            :label="$t('container.application_selection.application.same_address')"
                            @change="handleCheckboxChange"></v-checkbox>
                        </v-col>

                        <v-col lg="6" md="6" cols="12">
                          <ValidationProvider name="Division" vid="permanent_division" rules="required"
                            v-slot="{ errors }">
                            <label style="display: inline-block">{{
                              $t('container.system_config.demo_graphic.division.division') }}
                            </label>
                            <span style="margin-left: 4px; color: red">*</span>
                            <v-autocomplete :hide-details="errors[0] ? false : true"
                              @input="permanent_onChangeDivision($event)" v-model="data.permanent_division_id" outlined
                              :items="permanent_divisions" item-text="name_en" item-value="id" required
                              :error="errors[0] ? true : false" :error-messages="errors[0]"></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <v-col lg="6" md="6" cols="12">
                          <ValidationProvider name="District" vid="permanent_district" rules="required"
                            v-slot="{ errors }">
                            <label style="display: inline-block">{{
                              $t('container.system_config.demo_graphic.district.district') }}
                            </label>
                            <span style="margin-left: 4px; color: red">*</span>
                            <v-autocomplete :hide-details="errors[0] ? false : true" outlined
                              v-model="data.permanent_district_id" @input="permanent_onChangeDistrict($event)"
                              :items="permanent_districts" item-text="name_en" item-value="id"
                              :error="errors[0] ? true : false" :error-messages="errors[0]"></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <v-col cols="6">
                          <ValidationProvider name="Location Type" vid="permanent_location_type" rules="required"
                            v-slot="{ errors }">
                            <label style="display: inline-block">{{ $t('container.list.location_type') }}
                            </label>
                            <span style="margin-left: 4px; color: red">*</span>
                            <v-autocomplete @input="permanent_LocationType($event)" v-model="data.permanent_location_type"
                              :hide-details="errors[0] ? false : true" outlined :items="locationType" item-text="value_en"
                              item-value="id" :error="errors[0] ? true : false"
                              :error-messages="errors[0]"></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <v-col v-if="data.permanent_location_type == 2" lg="6" md="6" cols="12">
                          <ValidationProvider name="Upazila" vid="permanent_thana_id" rules="required"
                            v-slot="{ errors }">
                            <label style="display: inline-block">{{
                              $t('container.system_config.demo_graphic.ward.upazila') }}
                            </label>
                            <span style="margin-left: 4px; color: red">*</span>
                            <v-autocomplete :hide-details="errors[0] ? false : true" v-model="data.permanent_thana_id"
                              outlined @change="permanent_onChangeUpazila($event)" :items="permanent_thanas"
                              item-text="name_en" item-value="id" :error="errors[0] ? true : false"
                              :error-messages="errors[0]"></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <v-col v-if="data.permanent_location_type == 2" cols="6">
                          <label style="display: inline-block"> {{
                            $t('container.system_config.demo_graphic.ward.subLocation_type') }}
                          </label>
                          <span style="margin-left: 4px; color: red">*</span>
                          <ValidationProvider name="subLocationType" vid="subLocationType" v-slot="{ errors }">
                            <v-autocomplete @input="onChangeSubLocationTypePermanent($event)"
                              v-model="data.permanent_sub_location_type" outlined :items="subLocationType"
                              item-text="value_en" item-value="id" :error="errors[0] ? true : false"
                              :error-messages="errors[0]" :hide-details="errors[0] ? false : true"
                              class="no-arrow-icon"></v-autocomplete>
                          </ValidationProvider>
                        </v-col>

                        <v-col v-if="data.permanent_location_type === 2 && data.permanent_sub_location_type === 2" lg="6"
                          md="6" cols="12">
                          <ValidationProvider name="union" vid="permanent_union_id" rules="required" v-slot="{ errors }">
                            <label style="display: inline-block">{{ $t('container.system_config.demo_graphic.ward.union')
                            }}
                            </label>
                            <span style="margin-left: 4px; color: red">*</span>
                            <v-autocomplete :hide-details="errors[0] ? false : true" v-model="data.permanent_union_id"
                              @input="permanent_onChangeUnion($event)" outlined :items="permanent_unions"
                              item-text="name_en" item-value="id" :error="errors[0] ? true : false"
                              :error-messages="errors[0]"></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <v-col v-if="data.permanent_location_type === 2 && data.permanent_sub_location_type === 1" lg="6"
                          md="6" cols="12">
                          <ValidationProvider name="Pouroshava" vid="permanent_pouro_id" rules="required"
                            v-slot="{ errors }">
                            <label style="display: inline-block">{{ $t('container.system_config.demo_graphic.ward.pouro')
                            }}
                            </label>
                            <span style="margin-left: 4px; color: red">*</span>
                            <v-autocomplete :hide-details="errors[0] ? false : true" v-model="data.permanent_pouro_id"
                              @input="Permanent_onChangePouro($event)" outlined :items="permanent_pouros"
                              item-text="name_en" item-value="id" :error="errors[0] ? true : false"
                              :error-messages="errors[0]"></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <v-col v-if="data.permanent_location_type == 3" lg="6" md="6" cols="12">
                          <ValidationProvider name="city" vid="permanent_city_id" rules="required" v-slot="{ errors }">
                            <label style="display: inline-block">City
                            </label>
                            <span style="margin-left: 4px; color: red">*</span>
                            <v-autocomplete :hide-details="errors[0] ? false : true" v-model="data.permanent_city_id"
                              @change="permanent_onChangeCity($event)" outlined :items="permanent_cities"
                              item-text="name_en" item-value="id" :error="errors[0] ? true : false"
                              :error-messages="errors[0]"></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <v-col v-if="data.permanent_location_type == 3" lg="6" md="6" cols="12">
                          <ValidationProvider name="thana" vid="permanent_city_thana_id" rules="required"
                            v-slot="{ errors }">
                            <label style="display: inline-block">{{ $t('container.system_config.demo_graphic.ward.thana')
                            }}
                            </label>
                            <span style="margin-left: 4px; color: red">*</span>
                            <v-autocomplete :hide-details="errors[0] ? false : true"
                              @input="Permanent_OnChangeCityThana($event)" v-model="data.permanent_city_thana_id" outlined
                              :items="permanent_city_thanas" item-text="name_en" item-value="id"
                              :error="errors[0] ? true : false" :error-messages="errors[0]"></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <v-col v-if="data.permanent_location_type == 1" lg="6" md="6" cols="12">
                          <ValidationProvider name="thana" vid="permanent_district_pouro_id" rules="required"
                            v-slot="{ errors }">
                            <label style="display: inline-block">{{
                              $t('container.system_config.demo_graphic.ward.dist_pouro') }}
                            </label>
                            <span style="margin-left: 4px; color: red">*</span>
                            <v-autocomplete :hide-details="errors[0] ? false : true"
                              @input="Permanent_onChangeDistrictPouro" v-model="data.permanent_district_pouro_id" outlined
                              :items="permanent_district_poros" item-text="name_en" item-value="id"
                              :error="errors[0] ? true : false" :error-messages="errors[0]"></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <v-col v-if="data.permanent_location_type == 3" lg="6" md="6" cols="12">
                          <ValidationProvider name="permanent_ward_id_city" vid="permanent_ward_id_city" rules="required"
                            v-slot="{ errors }">
                            <label style="display: inline-block">Ward
                            </label>
                            <span style="margin-left: 4px; color: red">*</span>
                            <v-autocomplete :hide-details="errors[0] ? false : true" v-model="data.permanent_ward_id_city"
                              outlined :items="permanent_wards_city" item-text="name_en" item-value="id"
                              :error="errors[0] ? true : false" :error-messages="errors[0]"></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <v-col v-if="data.permanent_location_type == 1" lg="6" md="6" cols="12">
                          <ValidationProvider name="permanent_ward_id_dist" vid="permanent_ward_id_dist" rules="required"
                            v-slot="{ errors }">
                            <label style="display: inline-block">{{ $t('container.system_config.demo_graphic.ward.ward')
                            }}
                            </label>
                            <span style="margin-left: 4px; color: red">*</span>
                            <v-autocomplete :hide-details="errors[0] ? false : true" v-model="data.permanent_ward_id_dist"
                              outlined :items="permanent_wards_dist" item-text="name_en" item-value="id"
                              :error="errors[0] ? true : false" :error-messages="errors[0]"></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <v-col v-if="data.permanent_location_type === 2 && data.permanent_sub_location_type === 2" lg="6"
                          md="6" cols="12">
                          <ValidationProvider name="permanent_ward_id_upazila" vid="permanent_ward_id_upazila"
                            rules="required" v-slot="{ errors }">
                            <label style="display: inline-block">{{ $t('container.system_config.demo_graphic.ward.ward')
                            }}
                            </label>
                            <span style="margin-left: 4px; color: red">*</span>
                            <v-autocomplete :hide-details="errors[0] ? false : true"
                              v-model="data.permanent_ward_id_union" outlined :items="permanent_wards_upazila_union"
                              item-text="name_en" item-value="id" :error="errors[0] ? true : false"
                              :error-messages="errors[0]"></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <v-col v-if="data.permanent_location_type === 2 && data.permanent_sub_location_type === 1" lg="6"
                          md="6" cols="12">
                          <ValidationProvider name="permanent_ward_id_upazila" vid="permanent_ward_id_upazila"
                            rules="required" v-slot="{ errors }">
                            <label style="display: inline-block">{{ $t('container.system_config.demo_graphic.ward.ward')
                            }}
                            </label>
                            <span style="margin-left: 4px; color: red">*</span>
                            <v-autocomplete :hide-details="errors[0] ? false : true"
                              v-model="data.permanent_ward_id_pouro" outlined :items="permanent_wards_upazila_pouro"
                              item-text="name_en" item-value="id" :error="errors[0] ? true : false"
                              :error-messages="errors[0]"></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <v-col cols="6" lg="6">
                          <ValidationProvider name="Post Code" vid="permanent_post_code" rules="CheckPost"
                            v-slot="{ errors }">
                            <label style="display: inline-block">{{
                              $t('container.system_config.demo_graphic.ward.post_code') }}
                            </label>
                            <span style="margin-left: 4px; color: red">*</span>
                            <v-text-field v-model="data.permanent_post_code" outlined clearable
                              :error="errors[0] ? true : false" :error-messages="errors[0]">
                            </v-text-field>
                          </ValidationProvider>
                        </v-col>

                        <v-col cols="6" lg="6">
                          <ValidationProvider name="Village/House No.,
                                                Road No., Block No, Section" vid="permanent_address" rules="required"
                            v-slot="{ errors }">
                            <label style="display: inline-block">{{
                              $t('container.system_config.demo_graphic.ward.address') }}
                            </label>
                            <span style="margin-left: 4px; color: red">*</span>
                            <v-text-field v-model="data.permanent_address" outlined clearable
                              :error="errors[0] ? true : false" :error-messages="errors[0]">
                            </v-text-field>
                          </ValidationProvider>
                        </v-col>
                      </v-row>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                  <!-- Contact Information End -->
                  <!-- 4th Expansion panel -->
                  <!-- Information According to the Program -->
                  <v-expansion-panel class="ma-4">
                    <v-expansion-panel-header color="primary">
                      <h3 class="white--text">
                        {{ language == 'bn' ? programName.name_bn : programName.name_en }} {{
                          $t('container.application_selection.application.info') }}
                      </h3>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content class="mt-5">
                      <div v-if="programDetails" class="py-2 ma-4">
                        <v-row>
                          <!-- <template v-if="checkIsHaveDIS()"> -->
                          <!-- <v-col cols="6" lg="6">
                              <template>
                                <label>
                                  {{ programDetails?.additional_field[keyGetByName("DIS No.")].name_en }}
                                  <span style="
                                  margin-left: 4px;
                                  margin-right: 4px;
                                  color: red;
                                ">*</span></label>
                                <ValidationProvider
                                  :name="programDetails?.additional_field[`${keyGetByName('DIS No.')}`].name_en"
                                  vid="value" rules="required" v-slot="{ errors }">
                                  <v-text-field
                                    v-model="data.application_allowance_values[`${keyGetByName('DIS No.')}`].value"
                                    :hide-details="errors[0] ? false : true" :error="errors[0] ? true : false"
                                    :error-messages="errors[0]" type="number" outlined>
                                  </v-text-field>
                                </ValidationProvider>
                              </template>

                            </v-col> -->
                          <!-- <v-col cols="6" lg="6">
                              <template>
                                <label>{{ programDetails?.additional_field[keyGetByName("Disability Type")].name_en }}
                                  <span style="
                                  margin-left: 4px;
                                  margin-right: 4px;
                                  color: red;
                                ">*</span></label>
                                <ValidationProvider
                                  :name="programDetails?.additional_field[`${keyGetByName('Disability Type')}`].name_en"
                                  vid="value" rules="required" v-slot="{ errors }">
                                  <v-text-field
                                    v-model="data.application_allowance_values[`${keyGetByName('Disability Type')}`].value"
                                    :hide-details="errors[0] ? false : true" :error="errors[0] ? true : false"
                                    :error-messages="errors[0]" type="text" disabled outlined>
                                  </v-text-field>
                                </ValidationProvider>
                              </template>
                            </v-col> -->
                          <!-- <v-col cols="12" lg="12">
                              <div class="d-inline d-flex justify-end">
                                <v-btn @click="verifyDISCard()" elevation="2"
                                  :disabled="data.application_allowance_values[`${keyGetByName('DIS No.')}`].value == null || data.application_allowance_values[`${keyGetByName('DIS No.')}`].value == ''"
                                  class="btn" color="primary">Verify</v-btn>
                              </div>
                            </v-col>
                          </template> -->
                          <v-col v-for="(
                              fields, index
                            ) in programDetails.additional_field" :key="index" cols="6" lg="6">


                            <!-- v-if="programDetails?.additional_field.length != 0 && keyGetByName('DIS No.') != index && keyGetByName('Disability Type') != index"> -->
                            <template v-if="fields.type == 'number'">
                              <v-row v-if="fields.verified === 1">
                                <v-col cols="10" lg="10">
                                  <label> {{ language == 'bn' ? fields.name_bn : fields.name_en }}
                                    <span style="
                                    margin-left: 4px;
                                    margin-right: 4px;
                                    color: red;
                                  ">*</span></label>
                                  <ValidationProvider :name="fields.name_en" vid="value" rules="required"
                                    v-slot="{ errors }">
                                    <v-text-field v-model="data.application_allowance_values[index]
                                      .value
                                      " :hide-details="errors[0] ? false : true" :error="errors[0] ? true : false"
                                      :error-messages="errors[0]" type="number" outlined>
                                    </v-text-field>
                                  </ValidationProvider>

                                </v-col>
                                <v-col cols="2" lg="2" class="text-right">
                                  <v-btn class="btn mt-5" color="primary" style="height: 56px;" :disabled="data.application_allowance_values[index]
                                    .value == null">{{ $t('container.list.verify') }}</v-btn>

                                </v-col>
                              </v-row>
                              <template v-if="fields.verified === 0">
                                <label> {{ language == 'bn' ? fields.name_bn : fields.name_en }}
                                  <span style="
                                    margin-left: 4px;
                                    margin-right: 4px;
                                    color: red;
                                  ">*</span></label>
                                <ValidationProvider :name="fields.name_en" vid="value" rules="required"
                                  v-slot="{ errors }">
                                  <v-text-field v-model="data.application_allowance_values[index]
                                    .value
                                    " :hide-details="errors[0] ? false : true" :error="errors[0] ? true : false"
                                    :error-messages="errors[0]" type="number" outlined>
                                  </v-text-field>
                                </ValidationProvider>

                              </template>




                            </template>
                            <template v-if="fields.type == 'dropdown'">
                              <label>

                                {{ language == 'bn' ? fields.name_bn : fields.name_en }}
                                <span style="
                                    margin-left: 4px;
                                    margin-right: 4px;
                                    color: red;
                                  ">*</span></label>
                              <ValidationProvider :name="fields.name_en"
                                vid="allowance_program_additional_field_values_id" rules="required" v-slot="{ errors }">
                                <v-select :hide-details="errors[0] ? false : true" :error="errors[0] ? true : false"
                                  :error-messages="errors[0]" outlined v-model="data.application_allowance_values[index]
                                    .allowance_program_additional_field_values_id
                                    " :items="fields.name_en == 'Class'
    ? classes
    : fields.additional_field_value
    " item-value="id" :item-text="fields.name_en == 'Class'
    ? 'value_en'
    : 'value'
    ">
                                </v-select>
                              </ValidationProvider>
                            </template>

                            <template v-if="fields.type == 'checkbox'">
                              <label> {{ language == 'bn' ? fields.name_bn : fields.name_en }}<span style="
                                    margin-left: 4px;
                                    margin-right: 4px;
                                    color: red;
                                  ">*</span></label>
                              <ValidationProvider :name="fields.name_en"
                                vid="allowance_program_additional_field_values_id" rules="required" v-slot="{ errors }">
                                <v-select multiple :hide-details="errors[0] ? false : true"
                                  :error="errors[0] ? true : false" :error-messages="errors[0]" outlined v-model="data.application_allowance_values[index]
                                    .allowance_program_additional_field_values_id
                                    " :items="fields.additional_field_value" item-value="id" item-text="value">
                                </v-select>
                              </ValidationProvider>
                            </template>
                            <template v-if="fields.type == 'file'">
                          
                              <label> {{ language == 'bn' ? fields.name_bn : fields.name_en }}<span style="
                                    margin-left: 4px;
                                    margin-right: 4px;
                                    color: red;
                                  ">*</span></label> 
                              <ValidationProvider :name="fields.name_en" vid="value" v-slot="{ errors }">
                                <v-file-input v-model="data.application_allowance_values[index]
                                  .value
                                  " @change="addPreviewFile($event, index)" placeholder="Select your files"
                                  prepend-icon prepend-inner-icon="mdi-paperclip" outlined
                                  :hide-details="errors[0] ? false : true" :error="errors[0] ? true : false"
                                  :error-messages="errors[0]" :show-size="1000">
                                </v-file-input>
                              </ValidationProvider>
                            </template>
                        

                            <template v-if="fields.type == 'date'">
                              <label> {{ language == 'bn' ? fields.name_bn : fields.name_en }}<span style="
                                    margin-left: 4px;
                                    margin-right: 4px;
                                    color: red;
                                  ">*</span></label>
                              <ValidationProvider :name="fields.name_en" vid="value" rules="required" v-slot="{ errors }">
                                <v-text-field v-model="data.application_allowance_values[index]
                                  .value
                                  " :hide-details="errors[0] ? false : true" :error="errors[0] ? true : false"
                                  :error-messages="errors[0]" type="date" outlined>
                                </v-text-field>
                              </ValidationProvider>
                            </template>
                            <template v-if="fields.type == 'disabled'">
                              <label>{{ fields.name_en
                              }}<span style="
                                    margin-left: 4px;
                                    margin-right: 4px;
                                    color: red;
                                  ">*</span></label>
                              <ValidationProvider :name="fields.name_en" vid="value" rules="required" v-slot="{ errors }">
                                <v-text-field v-model="data.application_allowance_values[index]
                                  .value
                                  " :hide-details="errors[0] ? false : true" :error="errors[0] ? true : false"
                                  :error-messages="errors[0]" disabled type="text" outlined>
                                </v-text-field>
                              </ValidationProvider>
                            </template>
                            <template v-if="fields.type == 'text'">
                              <label>{{ fields.name_en
                              }}<span style="
                                    margin-left: 4px;
                                    margin-right: 4px;
                                    color: red;
                                  ">*</span></label>
                              <ValidationProvider :name="fields.name_en" vid="value" rules="required" v-slot="{ errors }">
                                <v-text-field v-model="data.application_allowance_values[index]
                                  .value
                                  " :hide-details="errors[0] ? false : true" :error="errors[0] ? true : false"
                                  :error-messages="errors[0]" type="text" outlined>
                                </v-text-field>
                              </ValidationProvider>
                            </template>
                          </v-col>
                        </v-row>
                      </div>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                  <!-- Information According to the Program End -->
                  <!-- Expansion panel 5 start-->
                  <!-- Bank/MFS Information -->
                  <v-expansion-panel class="mb-4">
                    <v-expansion-panel-header color="primary">
                      <h3 class="white--text">{{ $t('container.application_selection.application.bank') }}</h3>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content class="mt-5">
                      <v-row>
                        <v-col cols="6" lg="6">
                          <ValidationProvider name="Account Name" vid="account_name" rules="required" v-slot="{ errors }">
                            <label style="display: inline-block"> {{
                              $t('container.application_selection.application.account_name') }}
                            </label>
                            <span style="margin-left: 4px; color: red">*</span>
                            <v-text-field v-model="data.account_name" outlined clearable :error="errors[0] ? true : false"
                              :error-messages="errors[0]">
                            </v-text-field>
                          </ValidationProvider>
                        </v-col>
                        <v-col cols="6" lg="6">
                          <v-radio-group v-model="data.account_type" row>
                            {{ $t('container.application_selection.application.account_type') }}

                            <span style="
                              margin-left: 4px;
                              margin-right: 4px;
                              color: red;
                            ">*</span>
                            <v-radio :label="$t('container.application_selection.application.bank_account')"
                              :value="1"></v-radio>
                            <v-radio :label="$t('container.application_selection.application.mobile_account')"
                              :value="2"></v-radio>
                          </v-radio-group>
                        </v-col>
                        <v-col cols="6" lg="6" v-if="data.account_type === 2">
                          <ValidationProvider name="Account Ownership" vid="account_owner" v-slot="{ errors }">
                            <label style="display: inline-block"> {{
                              $t('container.application_selection.application.mobile_ownership') }}
                            </label>
                            <span style="margin-left: 4px; color: red">*</span>

                            <v-select v-model="data.account_owner" outlined clearable :items="mobile_ownership"
                              :error="errors[0] ? true : false" :error-messages="errors[0]">
                            </v-select>
                          </ValidationProvider>
                        </v-col>

                        <v-col cols="6" lg="6" v-if="data.account_type === 1">
                          <ValidationProvider name="Account Ownership" vid="account_owner" v-slot="{ errors }">
                            <label style="display: inline-block">{{
                              $t('container.application_selection.application.account_ownership') }}
                            </label>
                            <span style="margin-left: 4px; color: red">*</span>

                            <v-select v-model="data.account_owner" outlined clearable :items="mobile_ownership"
                              :error="errors[0] ? true : false" :error-messages="errors[0]">
                            </v-select>
                          </ValidationProvider>
                        </v-col>
                        <v-col cols="6" lg="6" v-if="data.account_type === 2">


                          <label style="display: inline-block">{{
                            $t('container.application_selection.application.mobile_operator') }}</label><span
                            style="margin-left: 4px; color: red">*</span>
                          <v-select :items="mobile_operators" outlined item-text="operator" item-value="id"
                            v-model="data.mobile_operator">

                          </v-select>
                        </v-col>


                        <v-col cols="6" lg="6" v-if="data.account_type === 2">
                          <ValidationProvider rules="checkMobileNumber" name="Mobile Number" vid="account_number"
                            v-slot="{ errors }">
                            <label style="display: inline-block">{{
                              $t('container.application_selection.application.mobile') }} </label><span
                              style="margin-left: 4px; color: red">*</span>

                            <v-text-field v-model="data.account_number" outlined type="number" clearable
                              :error="errors[0] ? true : false" :error-messages="errors[0]">
                            </v-text-field>
                          </ValidationProvider>

                        </v-col>
                        <v-col cols="6" lg="6" v-if="data.account_type === 1">
                          <ValidationProvider rules="required" name="Bank name" vid="bank_name" v-slot="{ errors }">
                            <label style="display: inline-block">{{
                              $t('container.application_selection.application.bank_name') }} </label><span
                              style="margin-left: 4px; color: red">*</span>

                            <v-text-field v-model="data.bank_name" outlined clearable :error="errors[0] ? true : false"
                              :error-messages="errors[0]">
                            </v-text-field>
                          </ValidationProvider>
                        </v-col>

                        <v-col cols="6" lg="6" v-if="data.account_type === 1">
                          <ValidationProvider rules="required" name="Bank name" vid="bank_name" v-slot="{ errors }">
                            <label style="display: inline-block">{{
                              $t('container.application_selection.application.branch_name') }}</label><span
                              style="margin-left: 4px; color: red">*</span>

                            <v-text-field v-model="data.branch_name" outlined clearable :error="errors[0] ? true : false"
                              :error-messages="errors[0]">
                            </v-text-field>
                          </ValidationProvider>
                        </v-col>
                        <v-col cols="6" lg="6" v-if="data.account_type === 1">
                          <ValidationProvider rules="required" name="Bank Account number" vid="bank_account_number"
                            v-slot="{ errors }">
                            <label style="display: inline-block">{{
                              $t('container.application_selection.application.bank_account_number') }} </label><span
                              style="margin-left: 4px; color: red">*</span>

                            <v-text-field v-model="data.account_number" outlined clearable
                              :error="errors[0] ? true : false" :error-messages="errors[0]" type="number">
                            </v-text-field>
                          </ValidationProvider>
                        </v-col>
                        <v-col cols="6" lg="6">
                          <ValidationProvider name="Email" vid="Email" v-slot="{ errors }">
                            <label style="display: inline-block">{{
                              $t('container.application_selection.application.email') }} </label>


                            <v-text-field v-model="data.email" outlined clearable type="email"
                              :error="errors[0] ? true : false" :error-messages="errors[0]">
                            </v-text-field>
                          </ValidationProvider>
                        </v-col>
                      </v-row>
                      <p class="red--text mt-2">
                        {{ $t('container.application_selection.application.bank_alert') }}

                      </p>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                  <!-- Bank/MFS Information End -->
                  <!-- Expansion panel 5 End -->
                  <!-- Nominee Information -->
                  <v-expansion-panel class="mb-4">
                    <v-expansion-panel-header color="primary">
                      <h3 class="white--text"> {{ $t('container.application_selection.application.nominee_info') }}</h3>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content class="mt-5">
                      <div class="pa-2 mb-4">
                        <v-row>
                          <v-col cols="12" lg="12">
                            <v-card>
                              <v-card-text>


                                <v-row>
                                  <v-col cols="4" lg="4">
                                    <ValidationProvider name="National Identity (NID) / Birth Registration Number"
                                      rules="checkNumber||required" vid="nominee_verification_number" v-slot="{ errors }">
                                      <label>{{ $t('container.application_selection.application.nid_brn') }}</label>
                                      <span style="margin-left: 4px; color: red">*</span>
                                      <v-text-field v-model="data.nominee_verification_number" outlined
                                        @change="checkNum()" clearable type="text" :error="errors[0] ? true : false"
                                        :error-messages="errors[0]">
                                      </v-text-field>
                                    </ValidationProvider>
                                  </v-col>

                                  <!-- <v-col cols="2" lg="2">
                                    <v-btn class="btn mt-5" color="primary" style="height: 56px;"
                                      :disabled="data.nominee_verification_number == null">{{ $t('container.list.verify') }}</v-btn>
                                  </v-col> -->

                                  <v-col cols="2">


                                    <!-- Day Dropdown -->
                                    <label>{{ $t('container.application_selection.application.day') }} </label>
                                    <span style="margin-left: 4px; color: red">*</span>

                                    <v-select v-model="selectedDayNominee" :items="twoDigitDays" clearable outlined
                                      @change="updateDateNominee"></v-select>

                                  </v-col>
                                  <!-- Month Dropdown -->

                                  <v-col cols="2">
                                    <label>{{ $t('container.application_selection.application.month') }} </label>
                                    <span style="margin-left: 4px; color: red">*</span>
                                    <v-select clearable v-model="selectedMonthNominee" :items="months" outlined
                                      @change="updateDateNominee"></v-select>
                                  </v-col>





                                  <!-- Year Dropdown -->
                                  <v-col cols="2">
                                    <label>{{ $t('container.application_selection.application.year') }} </label>
                                    <span style="margin-left: 4px; color: red">*</span>
                                    <ValidationProvider name="Age" vid="age" v-slot="{ errors }" rules="required">
                                      <v-select clearable v-model="selectedYearNominee" :items="years" outlined
                                        @change="updateDateNominee"></v-select>
                                    </ValidationProvider>

                                  </v-col>
                                  <v-col cols="2">

                                    <label>{{ $t('container.application_selection.application.date_of_birth') }} </label>
                                    <span style="margin-left: 4px; color: red">*</span>
                                    <ValidationProvider name="Date of Birth" vid="date_of_birth" v-slot="{ errors }"
                                      rules="required">

                                      <v-text-field v-model="data.nominee_date_of_birth" readonly
                                        :value="formattedDateNominee" outlined></v-text-field>
                                    </ValidationProvider>




                                  </v-col>

                                </v-row>
                              </v-card-text>
                            </v-card>

                          </v-col>
                          <v-col cols="6" lg="6">
                            <ValidationProvider name="Nominee Name (BN)" vid="nominee_bn" rules="required"
                              v-slot="{ errors }">
                              <label style="display: inline-block">{{
                                $t('container.application_selection.application.name_bn') }}
                              </label>
                              <span style="margin-left: 4px; color: red">*</span>
                              <v-text-field v-model="data.nominee_bn" outlined clearable :error="errors[0] ? true : false"
                                :error-messages="errors[0]">
                              </v-text-field>
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="6" lg="6">
                            <ValidationProvider name="Nominee Name (EN)" vid="nominee_en" rules="required"
                              v-slot="{ errors }">
                              <label style="display: inline-block">{{
                                $t('container.application_selection.application.name_en') }}
                              </label>
                              <span style="margin-left: 4px; color: red">*</span>
                              <v-text-field v-model="data.nominee_en" outlined clearable :error="errors[0] ? true : false"
                                :error-messages="errors[0]">
                              </v-text-field>
                            </ValidationProvider>
                          </v-col>

                          <v-col cols="6" lg="6">
                            <ValidationProvider name="Nominee Natinality" readonly vid="nominee_nationality"
                              v-slot="{ errors }">
                              <label>{{ $t('container.application_selection.application.nationality') }} </label>
                              <v-text-field v-model="data.nominee_nationality" outlined readonly
                                :error="errors[0] ? true : false" :error-messages="errors[0]">
                              </v-text-field>
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="6" lg="6">
                            <div class="validation_error_gender_type">
                              <ValidationProvider name="Gender of Nominee" vid="nominee_relation_with_beneficiary"
                                v-slot="{ errors }" rules="required">
                                <label>{{ $t('container.application_selection.application.relationship') }}</label>
                                <span style="margin-left: 4px; color: red">*</span>
                                <v-autocomplete v-model="data.nominee_relation_with_beneficiary" outlined
                                  :items="relations_with_bef" :error="errors[0] ? true : false"
                                  :error-messages="errors[0]">
                                </v-autocomplete>
                              </ValidationProvider>
                            </div>
                          </v-col>
                          <v-col cols="6" lg="6">
                            <v-img :src="nomineeImageUrl" style="
                                    width: 150px;
                                    height: 150px;
                                    border: 1px solid #ccc;
                                  " class="mb-5" v-if="nomineeImageUrl"></v-img>
                            <v-img src="/assets/images/profile.png" v-if="!nomineeImageUrl" style="
                                    width: 200px;
                                    height: 200px;
                                    border: 1px solid #ccc;
                                  " class="mb-5"></v-img>
                            <ValidationProvider v-slot="{ errors }" name="Image" :rules="('imageSize')" rules="imageSize"
                              vid="image">
                              <label>{{ $t('container.application_selection.application.image') }} ({{
                                $t('container.application_selection.application.image_alert') }})</label>
                              <span style="margin-left: 4px; color: red">*</span>

                              <v-file-input outlined show-size counter prepend-inner-icon="mdi-camera"
                                v-model="data.nominee_image" accept="image/*" @change="previewImageNominee"
                                prepend-icon=""></v-file-input>
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="6" align-self="end" lg="6">
                            <v-img :src="nomineeSignUrl" style="
                                    width: 150px;
                                    height: 80px;
                                    border: 1px solid #ccc;
                                  " class="mb-5" v-if="nomineeSignUrl"></v-img>
                            <v-img src="/assets/images/sign.png" v-if="!nomineeSignUrl" style="
                                    width: 200px;
                                    height: 80px;
                                    border: 1px solid #ccc;
                                  " class="mb-5"></v-img>
                            <ValidationProvider v-slot="{ errors }" name="Signature" rules="imageSize"
                              vid="nominee_signature">
                              <label>{{ $t('container.application_selection.application.signature') }} ({{
                                $t('container.application_selection.application.signature_alert') }})</label>
                              <span style="margin-left: 4px; color: red">*</span>

                              <v-file-input outlined show-size counter prepend-inner-icon="mdi-camera"
                                v-model="data.nominee_signature" accept="image/*" @change="previewSignNominee"
                                prepend-icon=""></v-file-input>
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="12" lg="12">
                            <v-checkbox v-model="checkboxNomineeAddress" @change="handleNomineeCheckboxChange"
                              :label="$t('container.application_selection.application.same_address')"></v-checkbox>
                          </v-col>
                          <v-col cols="12" lg="12">
                            <ValidationProvider name="Address of Nominee" vid="nominee_address" v-slot="{ errors }"
                              rules="required">
                              <label>{{ $t('container.application_selection.application.nominee_address') }}</label>
                              <v-textarea v-model="data.nominee_address" outlined clearable
                                :error="errors[0] ? true : false" :error-messages="errors[0]"></v-textarea>
                            </ValidationProvider>
                          </v-col>
                        </v-row>
                      </div>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                  <!-- Nominee Information End -->
                  <!-- 5th Expansion panel -->
                  <!-- Other Information of Eligibility -->
                  <v-expansion-panel class="mb-4" v-if="pmt_status == 1">
                    <v-expansion-panel-header color="primary">
                      <h3 class="white--text">
                        {{ $t('container.application_selection.application.eligiblity_info') }}
                      </h3>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content class="mt-5">
                      <div class="pa-2 mb-4">
                        <v-row>
                          <v-col v-for="(variables, indexPMT) in PMTVariables" cols="6" lg="6" :key='indexPMT'>
                            <template v-if="variables.children.length == 0">
                              <label>{{ variables.name_en }}
                                <span style="
                                  margin-left: 4px;
                                  margin-right: 4px;
                                  color: red;
                                ">*</span></label>
                              <ValidationProvider :name="variables.name_en" vid="sub_variables" rules="required"
                                v-slot="{ errors }">
                                <v-select :hide-details="errors[0] ? false : true" :error="errors[0] ? true : false"
                                  :error-messages="errors[0]" outlined required
                                  v-model="data.application_pmt[indexPMT].sub_variables" :items="[
                                    {
                                      id: variables.id,
                                      name_en: 'Yes',
                                      name_bn: 'হ্যাঁ',
                                    },
                                    {
                                      id: 0,
                                      name_en: 'No',
                                      name_bn: 'না',
                                    },
                                  ]" item-value="id" item-text="name_en">
                                </v-select>
                              </ValidationProvider>
                            </template>
                            <template v-else-if="variables.field_type == 1">
                              <label>{{ variables.name_en }}
                                <span style="
                                  margin-left: 4px;
                                  margin-right: 4px;
                                  color: red;
                                ">*</span></label>
                              <ValidationProvider :name="variables.name_en" vid="sub_variables" rules="required"
                                v-slot="{ errors }">
                                <v-select :hide-details="errors[0] ? false : true" :error="errors[0] ? true : false"
                                  :error-messages="errors[0]" outlined
                                  v-model="data.application_pmt[indexPMT].sub_variables" :items="variables.children"
                                  item-value="id" item-text="name_en">
                                </v-select>
                              </ValidationProvider>
                            </template>

                            <template v-else-if="variables.field_type == 2">
                              <label>{{ variables.name_en
                              }}<span style="
                                  margin-left: 4px;
                                  margin-right: 4px;
                                  color: red;
                                ">*</span></label>
                              <ValidationProvider :name="variables.name_en" vid="sub_variables" rules="required"
                                v-slot="{ errors }">
                                <v-select multiple :hide-details="errors[0] ? false : true"
                                  :error="errors[0] ? true : false" :error-messages="errors[0]" outlined
                                  v-model="data.application_pmt[indexPMT].sub_variables" :items="variables.children"
                                  item-value="id" item-text="name_en">
                                </v-select>
                              </ValidationProvider>
                            </template>
                          </v-col>
                        </v-row>

                      </div>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                  <!-- Other Information of Eligibility end-->

                </v-expansion-panels>
              </div>
              <div class="d-inline d-flex justify-end">
                <v-btn @click="resetForm()" elevation="2" class="btn mr-2" color="info">{{ $t('container.list.cancel')
                }}</v-btn>
                <!-- :disabled="invalid" -->
                <v-btn @click="confirmDialog = true" flat color="primary" :disabled="invalid" :loading="loading"
                  class="custom-btn-width black white--text py-2">
                  {{ $t('container.list.preview') }}
                </v-btn>

              </div>
              <p class="red--text mt-5">
                {{ $t('container.application_selection.application.alert') }}
                *
              </p>
            </v-card>

          </form>
        </ValidationObserver>
        <!-- confirm modal  -->
        <!-- <v-dialog v-model="confirmDialog" width="350">
          <v-card style="justify-content: center; text-align: center">
          
            <v-card-text>
              <div class="subtitle-1 font-weight-medium mt-5">
              Do you want to submit the application ?
              </div>
            </v-card-text>
            <v-card-actions style="display: block">
              <v-row class="mx-0 my-0 py-2" justify="center">
                <v-btn text @click="confirmDialog = false" outlined class="custom-btn-width py-2 mr-10">
                    {{ $t("container.list.confirm") }}
                  </v-btn>
                <v-btn text @click="confirmDialog = false" outlined class="custom-btn-width py-2 mr-10">
                  {{ $t("container.list.cancel") }}
                </v-btn>

              </v-row>
            </v-card-actions>
          </v-card>
        </v-dialog> -->
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
                  {{ $t('container.application_selection.application.question') }}?
                </div>
              </v-card-text>

              <v-card-actions class="d-flex justify-center">
                <v-btn text @click="confirmDialog = false" outlined class="custom-btn-width">
                  {{ $t("container.list.cancel") }}
                </v-btn>
                <v-btn text flat color="primary" @click="submitApplication()" :loading="loading" type="submit"
                  class="custom-btn-width success white--text py-2">
                  {{ $t("container.list.confirm") }}
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
extend('imageSize', {
  validate: (value) => {
    if (!value) {
      // If no file is selected, return true (valid) or handle as needed
      return true;
    }

    const maxFileSize = 200 * 1024; // 200 KB in bytes

    return value.size <= maxFileSize;
  },
  message: 'Image must be under 200 KB',
});

export default {
  title: "CTM - Online Application",

  data() {
    return {
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
        },

        {
          id: 2,
          value_en: "Union",
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

      education_status: [
        "Illiterate",
        "Literate",
        "JSC", "SSC", "HSC",
        "Graduate",
        "Post Graduate",
        "Other"
      ],
      govt_programs: [
        "Old Age Allowance Program",
        "Disability Allowance Program",
        "Widow And Husband Adopted Allowance program",
        "Freedom Fighter Honorary Allowance",
        "No Allowance",
        "Other (specify)",
      ],
      marital_status: ["Married", "UnMarried", "Widow",
        "Other",

      ],
      health_status: [
        "Totally Disabled",
        "Sick",
        "Insane",
        "Disabled",
        "Partially Powerless",
        "Other (specify)",
      ],

      financial_status: ["Poor", "Refugee", "Landless"],
      social_status: ["Widow", "Widower", "Divorced"],
      house_status: ["Homeless", "Self", "Rent", "Others"],
      land_ownership: [
        "Habitatless",
        "Below 0.5 acre",
        "Up to 1 acre",
        "Above 1 acre",
        "Other (specify)",
      ],

      mobile_ownership: ["Myself", "Family Memeber", "Others"],
      religion: ["Islam", "Hindu", "Buddhist", "Christian", "Other"],
      genders: ["Male", "Female", "3rd Gender"],

      yes_no: ["Yes ", "No"],

      relations_with_bef: [
        "Spouse",
        "Family member",
        "Close relative",
        "Spouse",
        "Parent",
      ],

      activePicker: null,
      date: null,
      menu: false,
      isChecked: false,
      deleteDialog: false,
      confirmDialog: false,
      data: {

        program_id: null,
        verification_type: 1,
        verification_number: null,
        account_type: null,
        age: null,
        date_of_birth: null,
        name_en: null,
        name_bn: null,
        father_name_en: null,
        father_name_bn: null,
        mother_name_en: null,
        mother_name_bn: null,
        spouse_name_en: null,
        spouse_name_bn: null,
        identification_mark: null,
        image: null,
        signature: null,
        nationality: "Bangladeshi",
        gender_id: null,
        education_status: null,
        profession: null,
        religion: null,
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
        permanent_division_id: null,
        permanent_district_id: null,
        permanent_upazila: null,
        permanent_post_code: null,
        permanent_address: null,
        permanent_location_type: null,
        permanent_sub_location_type: null,
        permanent_thana_id: null,
        permanent_union_id: null,
        permanent_pouro_id: null,
        permanent_city_id: null,
        permanent_city_thana_id: null,
        permanent_district_pouro_id: null,
        permanent_ward_id_city: null,
        permanent_ward_id_union: null,
        permanent_ward_id_pouro: null,
        permanent_ward_id_dist: null,
        permanent_mobile: null,
        nominee_en: null,
        nominee_bn: null,
        nominee_verification_number: null,
        nominee_date_of_birth: null,
        nominee_address: null,
        nominee_image: null,
        nominee_signature: null,
        nominee_relation_with_beneficiary: null,
        nominee_nationality: "Bangladeshi",
        account_name: null,
        account_owner: null,
        account_number: null,
        application_allowance_values: [],
        application_pmt: [],
        marital_status: null,
        email: null,
        mobile_operator: null,
        pmt_status: null
      },
      professionType: ['Farmer',
        'Rickshaw Puller',
        'Day Laborer',
        'Street Vendor',
        'Fisherman',
        'Construction Worker',
        'Domestic Worker',
        'Tea Garden Laborer',
        'Auto Rickshaw Driver',
        'Migrant Worker',
        'Handicraftsman',
        'Cycle Rickshaw Puller',
        'Plumber',
        'Carpenter',
        'Street Sweeper',
        'Security Guard',
        'Rural Artisan',
        'Fisherwoman',
        'Other'],
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
      // days: Array.from({ length: 31 }, (_, i) => i + 1),
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
    twoDigitDays() {
      return Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'));
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

  methods: {
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
          // if( this.data.permanent_division_id ==null && this.data.permanent_division_id ==null &&  this.data.permanent_city_id == null && this.data.permanent_city_thana_id == null && this.data.permanent_ward_id_city == null){
          //   deleteDialog=true;


          // }
          // else{ 
          const selectedDivisionObj = this.permanent_divisions.find(div => div.id === this.data.permanent_division_id);
          const selectedDistrictObj = this.permanent_districts.find(dis => dis.id === this.data.permanent_district_id);
          const selectedCityObj = this.permanent_cities.find(city => city.id === this.data.permanent_city_id);
          const selectedThanaObj = this.permanent_city_thanas.find(thana => thana.id === this.data.permanent_city_thana_id);
          const selectedWardsCityObj = this.permanent_wards_city.find(ward_city => ward_city.id === this.data.permanent_ward_id_city);

          // this.data.nominee_address = 'Division: ' + (selectedDivisionObj ? selectedDivisionObj.name_en : '') + ',' + ' District: ' + (selectedDistrictObj ? selectedDistrictObj.name_en : '') + ',' + ' City: ' + (selectedCityObj ? selectedCityObj.name_en : '') + ',' + ' Thana: ' + (selectedThanaObj ? selectedThanaObj.name_en : '') + ',' + (selectedWardsCityObj ? selectedWardsCityObj.name_en : '') + ',' + ' Post Code: ' + this.data.permanent_post_code + ',' + this.data.permanent_address;

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
          // var selectedWardUnionObj = this.permanent_wards_upazila_union.find(ward_union => ward_union.id === this.data.permanent_ward_id_union);
          // var selectedWardPouroObj = this.permanent_wards_upazila_pouro.find(ward_pouro => ward_pouro.id === this.data.permanent_ward_id_pouro);
   
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







        // this.data.nominee_address = 'Division:' + this.data.permanent_division_id + 'District:'+ this.data.permanent_district_id;
        // this.data.nominee_address=this.data.permanent_address;
        //  this.data.nominee_address = 'Division: ' + (selectedDivisionObj ? selectedDivisionObj.name_en : '') + ' District: ' + this.data.permanent_district_id;
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
        console.log(this.data.union_id,"union_id", this.data.pouro_id,"pouro_id", this.data.permanent_ward_id_pouro)

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
      let data = {
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
          console.log(res)
          this.$toast.success(res.data.data);

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

    submitApplication() {

      if (this.data.mobile_operator !== null && this.data.mobile_operator !== undefined) {
        // Convert this.data.account_number to string before concatenation
        this.data.account_number = this.data.mobile_operator + String(this.data.account_number);
      }
      this.confirmDialog = false
      console.log(this.data, "All data")


      let fd = new FormData();
      for (const [key, value] of Object.entries(this.data)) {
        if (value !== null) {
          if (key == 'application_allowance_values') {
            console.log(value)
            fd.append("application_allowance_values", JSON.stringify(value));

          }
          if (key == 'application_pmt') {
            fd.append("application_pmt", JSON.stringify(value));

          }
          if (key != 'application_pmt' && key != 'application_allowance_values') {

            console.log(key, value);
            fd.append(key, value);
          }
          console.log(key, value, "z");

        }
      }

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
        console.log(res.data.data, "data")
        console.log(res.data.id, "id")
        this.$store.commit('ApplicationSelection/setSuccessId', res.data.id);
        console.log(res.data.id, " after store id")
        // this.$router.push({ name: 'SuccessView' });
        // this.$router.push({ name: 'SuccessView', query: { id: res.data.id } });
        this.$router.push("/submitted-application");
        console.log(res.data.id, " after pushing id")

      })
        .catch((err) => {
          this.loading = false;
          console.log(err);

          if (err.response) {
            if (err.response.data.success == false) {
              // this.$refs.form.setErrors(err.response.data.errors);
              // this.$toast.error(err.response.data.message);
              if (err.response.data.error_code == "applicant_marital_status") {
                let errs = {
                  "marital_status": [err.response.data.message]
                }
                this.$refs.form.setErrors(errs);
                this.$toast.error(err.response.data.message);
                //scroll to first error filed
                const firstErrorField = document.querySelector(".validation-error_marital");
                if (firstErrorField) {
                  firstErrorField.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                    inline: "start",
                  });
                }

                // end of scroll to first error filed


              }
              else if (err.response.data.error_code == "applicant_gender_type") {
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
              else if (err.response.data.error_code == "applicant_age_limit") {
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
      if (event == 2) {
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
          this.onChangeSubLocationType(this.data.sub_location_type)

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
        // Read the selected file and generate a preview URL
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
        // Read the selected file and generate a preview URL
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
        // Read the selected file and generate a preview URL
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
        // Read the selected file and generate a preview URL
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
        .get(`/admin/ward/get/${$event}`, {
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
          console.log(this.permanent_wards_upazila_union,"called union ward")

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

