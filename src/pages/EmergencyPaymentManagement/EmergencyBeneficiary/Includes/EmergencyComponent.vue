<template>
  <v-row justify="center">
    <v-dialog v-model="internalDialogVisible" persistent max-width="80%">
      <v-card outlined justify="center" class="ma-0 pa-0">
        <!-- Form -->
        <v-card-text>
          <v-col cols="12" lg="12" md="4" sm="6">
            <ValidationObserver ref="form">
              <v-form @submit.prevent="createEmergencyAllotment()">
                <v-container fluid>
                  <v-row>
                    <v-expansion-panels v-model="panel" multiple class="mt-2">
                      <!-- Personal Information  -->
                      <v-expansion-panel>
                        <v-expansion-panel-header color="#1c3b68">
                          <template v-slot:actions>
                            <v-icon color="white">$expand</v-icon>
                          </template>
                          <h3 class="white--text">
                            {{
                              $t(
                                "container.application_selection.application.personal_info"
                              )
                            }}
                          </h3>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                          <v-row class="pt-2">
                            <v-col cols="12" lg="6" md="4" sm="6">
                              <v-img
                                :src="imageUrl"
                                style="
                                  width: 200px;
                                  height: 200px;

                                  border: 1px solid #ccc;
                                "
                                class="mb-5"
                                v-if="imageUrl"
                              ></v-img>
                              <v-img
                                src="/assets/images/profile.png"
                                v-if="!imageUrl"
                                style="
                                  width: 150px;
                                  height: 150px;

                                  border: 1px solid #ccc;
                                "
                                class="mb-5"
                              ></v-img>

                              <label
                                >{{
                                  $t(
                                    "container.application_selection.application.image"
                                  )
                                }}
                                ({{
                                  $t(
                                    "container.application_selection.application.image_alert"
                                  )
                                }})</label
                              >
                              <span style="margin-left: 4px; color: red"
                                >*</span
                              >
                              <ValidationProvider
                                v-slot="{ errors }"
                                name="Image"
                                rules="required"
                                vid="image"
                              >
                                <v-file-input
                                  outlined
                                  show-size
                                  counter
                                  :hide-details="errors[0] ? false : true"
                                  :placeholder="
                                    language == 'bn'
                                      ? 'ফাইল নির্বাচন করুন'
                                      : 'Choose File'
                                  "
                                  prepend-outer-icon="mdi-camera"
                                  v-model="data.image"
                                  accept="image/*"
                                  @change="previewImage"
                                  prepend-icon=""
                                  id="image"
                                >
                                </v-file-input>
                              </ValidationProvider>
                            </v-col>
                            <v-col cols="12" lg="6" md="4" sm="6">
                              <div style="padding-top: 70px">
                                <v-img
                                  :src="signUrl"
                                  style="
                                    width: 200px;
                                    height: 80px;
                                    border: 1px solid #ccc;
                                  "
                                  class="mb-5"
                                  v-if="signUrl"
                                ></v-img>
                                <v-img
                                  src="/assets/images/sign.png"
                                  v-if="!signUrl"
                                  style="
                                    width: 200px;
                                    height: 80px;
                                    border: 1px solid #ccc;
                                  "
                                  class="mb-5"
                                ></v-img>
                              </div>
                              <ValidationProvider
                                v-slot="{ errors }"
                                name="Signature"
                                rules="required"
                                vid="signature"
                              >
                                <label
                                  >{{
                                    $t(
                                      "container.application_selection.application.signature"
                                    )
                                  }}
                                  ({{
                                    $t(
                                      "container.application_selection.application.signature_alert"
                                    )
                                  }})</label
                                >
                                <span style="margin-left: 4px; color: red"
                                  >*</span
                                >
                                <v-file-input
                                  :placeholder="
                                    language == 'bn'
                                      ? 'ফাইল নির্বাচন করুন '
                                      : 'Choose File'
                                  "
                                  outlined
                                  show-size
                                  counter
                                  :hide-details="errors[0] ? false : true"
                                  prepend-outer-icon="mdi-camera"
                                  v-model="data.signature"
                                  accept="image/*"
                                  @change="previewSign"
                                  id="signature"
                                  prepend-icon=""
                                ></v-file-input>
                              </ValidationProvider>
                            </v-col>
                            <v-col cols="12" lg="6" md="4" sm="6">
                              <ValidationProvider
                                name="Name in Bangla"
                                vid="name_bn"
                                rules="required||bangla"
                                v-slot="{ errors }"
                              >
                                <label
                                  >{{
                                    $t(
                                      "container.application_selection.application.name_bn"
                                    )
                                  }}
                                </label>
                                <span style="margin-left: 4px; color: red"
                                  >*</span
                                >
                                <v-text-field
                                  v-model="data.name_bn"
                                  outlined
                                  :hide-details="errors[0] ? false : true"
                                  :error="errors[0] ? true : false"
                                  :error-messages="
                                    errors[0]
                                      ? language == 'bn'
                                        ? 'অনুগ্রহ পূর্বক সম্পূর্ণ নাম (বাংলায়) প্রদান করুন '
                                        : 'Please enter Full Name (Bangla)'
                                      : ''
                                  "
                                >
                                </v-text-field>
                              </ValidationProvider>
                            </v-col>
                            <v-col cols="12" lg="6" md="4" sm="6">
                              <ValidationProvider
                                name="Name in English"
                                vid="name_en"
                                rules="required"
                                v-slot="{ errors }"
                              >
                                <label>{{
                                  $t(
                                    "container.application_selection.application.name_en"
                                  )
                                }}</label>
                                <span style="margin-left: 4px; color: red"
                                  >*</span
                                >
                                <v-text-field
                                  v-model="data.name_en"
                                  outlined
                                  clearable
                                  :hide-details="errors[0] ? false : true"
                                  :error="errors[0] ? true : false"
                                  :error-messages="
                                    errors[0]
                                      ? language == 'bn'
                                        ? 'অনুগ্রহ পূর্বক সম্পূর্ণ নাম (ইংরেজীতে) প্রদান করুন '
                                        : 'Please enter Full Name (English)'
                                      : ''
                                  "
                                >
                                </v-text-field>
                              </ValidationProvider>
                            </v-col>
                            <v-col cols="12" lg="6" md="4" sm="6">
                              <ValidationProvider
                                name="Father Name in Bangla"
                                vid="father_name_bn"
                                rules="required||bangla"
                                v-slot="{ errors }"
                              >
                                <label>{{
                                  $t(
                                    "container.application_selection.application.father_name_bn"
                                  )
                                }}</label>
                                <span style="margin-left: 4px; color: red"
                                  >*</span
                                >
                                <v-text-field
                                  v-model="data.father_name_bn"
                                  outlined
                                  clearable
                                  :hide-details="errors[0] ? false : true"
                                  :error="errors[0] ? true : false"
                                  :error-messages="
                                    errors[0]
                                      ? language == 'bn'
                                        ? 'অনুগ্রহ পূর্বক সম্পূর্ণ বাবার নাম (ইংরেজীতে) প্রদান করুন '
                                        : 'Please enter Father Name (English)'
                                      : ''
                                  "
                                >
                                </v-text-field>
                              </ValidationProvider>
                            </v-col>
                            <v-col cols="12" lg="6" md="4" sm="6">
                              <ValidationProvider
                                name="Father Name in English"
                                vid="father_name_en"
                                rules="required||bangla"
                                v-slot="{ errors }"
                              >
                                <label>{{
                                  $t(
                                    "container.application_selection.application.father_name_en"
                                  )
                                }}</label>
                                <span style="margin-left: 4px; color: red"
                                  >*</span
                                >
                                <v-text-field
                                  v-model="data.father_name_en"
                                  outlined
                                  clearable
                                  :hide-details="errors[0] ? false : true"
                                  :error="errors[0] ? true : false"
                                  :error-messages="
                                    errors[0]
                                      ? language == 'bn'
                                        ? 'অনুগ্রহ পূর্বক সম্পূর্ণ বাবার নাম (ইংরেজীতে) প্রদান করুন '
                                        : 'Please enter Father Name (English)'
                                      : ''
                                  "
                                >
                                </v-text-field>
                              </ValidationProvider>
                            </v-col>
                            <v-col cols="12" lg="6" md="4" sm="6">
                              <div class="validation-error-mobile">
                                <ValidationProvider
                                  name="Mother Name in Bangla"
                                  vid="mother_name_bn"
                                  v-slot="{ errors }"
                                  rules="required||bangla"
                                >
                                  <label>{{
                                    $t(
                                      "container.application_selection.application.mother_name_bn"
                                    )
                                  }}</label>
                                  <span style="margin-left: 4px; color: red"
                                    >*</span
                                  >
                                  <v-text-field
                                    v-model="data.mother_name_bn"
                                    outlined
                                    clearable
                                    :hide-details="errors[0] ? false : true"
                                    :error="errors[0] ? true : false"
                                    :error-messages="
                                      errors[0]
                                        ? language == 'bn'
                                          ? 'অনুগ্রহ পূর্বক সম্পূর্ণ মায়ের নাম (বাংলায়) প্রদান করুন '
                                          : 'Please enter Mother Name (Bangla)'
                                        : ''
                                    "
                                  >
                                  </v-text-field>
                                </ValidationProvider>
                              </div>
                            </v-col>
                            <v-col cols="12" lg="6" md="4" sm="6">
                              <div class="validation-error_marital">
                                <ValidationProvider
                                  name="Mother Name in English"
                                  vid="mother_name_en"
                                  v-slot="{ errors }"
                                  rules="required"
                                >
                                  <label>{{
                                    $t(
                                      "container.application_selection.application.mother_name_en"
                                    )
                                  }}</label>
                                  <span style="margin-left: 4px; color: red"
                                    >*</span
                                  >
                                  <v-text-field
                                    v-model="data.mother_name_en"
                                    outlined
                                    clearable
                                    :hide-details="errors[0] ? false : true"
                                    :error="errors[0] ? true : false"
                                    :error-messages="
                                      errors[0]
                                        ? language == 'bn'
                                          ? 'অনুগ্রহ পূর্বক সম্পূর্ণ মায়ের নাম(ইংরেজীতে) প্রদান করুন '
                                          : 'Please enter Mother Name (English)'
                                        : ''
                                    "
                                  >
                                  </v-text-field>
                                </ValidationProvider>
                              </div>
                            </v-col>
                            <v-col cols="12" lg="6" md="4" sm="6">
                              <ValidationProvider
                                rules="checkNumberMobile||required"
                                name="Mobile Number"
                                vid="mobile"
                                v-slot="{ errors }"
                              >
                                <label style="display: inline-block"
                                  >{{
                                    $t(
                                      "container.application_selection.application.mobile"
                                    )
                                  }} </label
                                ><span style="margin-left: 4px; color: red"
                                  >*</span
                                >

                                <v-text-field
                                  v-model="data.mobile"
                                  outlined
                                  type="number"
                                  clearable
                                  :hide-details="errors[0] ? false : true"
                                  :error="errors[0] ? true : false"
                                  :error-messages="
                                    errors[0]
                                      ? language == 'bn'
                                        ? 'অনুগ্রহ পূর্বক গ্রহণযোগ্য মোবাইল নাম্বার প্রদান করুন '
                                        : 'Please enter valid Mobile Number'
                                      : ''
                                  "
                                >
                                </v-text-field>
                              </ValidationProvider>
                            </v-col>
                            <v-col cols="12" lg="6" md="4" sm="6">
                              <ValidationProvider
                                name="Marital Status"
                                rules="required"
                                vid="marital_status"
                                v-slot="{ errors }"
                              >
                                <label>{{
                                  $t(
                                    "container.system_config.allowance_program.marital_status"
                                  )
                                }}</label>
                                <span style="margin-left: 4px; color: red"
                                  >*</span
                                >
                                <v-select
                                  v-model="data.marital_status"
                                  outlined
                                  :hide-details="errors[0] ? false : true"
                                  clearable
                                  :items="marital_status"
                                  item-value="name_en"
                                  :item-text="getItemText"
                                  :error="errors[0] ? true : false"
                                  :error-messages="
                                    errors[0]
                                      ? language == 'bn'
                                        ? 'অনুগ্রহ পূর্বক বৈবাহিক অবস্থা প্রদান করুন '
                                        : 'Please enter Marital Status'
                                      : ''
                                  "
                                >
                                </v-select>
                              </ValidationProvider>
                            </v-col>
                            <v-col
                              cols="12"
                              lg="6"
                              md="4"
                              sm="6"
                              v-if="data.marital_status == 'Married'"
                            >
                              <ValidationProvider
                                name="Spouse Name in Bangla"
                                vid="spouse_name_bn"
                                rules="required"
                                v-slot="{ errors }"
                              >
                                <label>{{
                                  $t(
                                    "container.application_selection.application.spouse_name_bn"
                                  )
                                }}</label>
                                <v-text-field
                                  v-model="data.spouse_name_bn"
                                  outlined
                                  clearable
                                  :hide-details="errors[0] ? false : true"
                                  :error="errors[0] ? true : false"
                                  :error-messages="
                                    errors[0]
                                      ? language == 'bn'
                                        ? 'অনুগ্রহ পূর্বক সম্পূর্ণ স্বামী বা স্ত্রী(বাংলায়) প্রদান করুন '
                                        : 'Please enter Spouse Name (Bangla)'
                                      : ''
                                  "
                                >
                                </v-text-field>
                              </ValidationProvider>
                            </v-col>
                            <v-col
                              cols="12"
                              lg="6"
                              md="4"
                              sm="6"
                              v-if="data.marital_status == 'Married'"
                            >
                              <ValidationProvider
                                name="Spouse Name in English"
                                vid="spouse_name_en"
                                v-slot="{ errors }"
                              >
                                <label>{{
                                  $t(
                                    "container.application_selection.application.spouse_name_en"
                                  )
                                }}</label>
                                <v-text-field
                                  v-model="data.spouse_name_en"
                                  outlined
                                  clearable
                                  :hide-details="errors[0] ? false : true"
                                  :error="errors[0] ? true : false"
                                  :error-messages="
                                    errors[0]
                                      ? language == 'bn'
                                        ? 'অনুগ্রহ পূর্বক সম্পূর্ণ স্বামী বা স্ত্রী নাম(ইংরেজীতে) প্রদান করুন '
                                        : 'Please enter Spouse Name (English)'
                                      : ''
                                  "
                                >
                                </v-text-field>
                              </ValidationProvider>
                            </v-col>
                            <v-col cols="12" lg="6" md="4" sm="6">
                              <ValidationProvider
                                name="Religion"
                                vid="religion"
                                v-slot="{ errors }"
                                rules="required"
                              >
                                <label>{{
                                  $t(
                                    "container.application_selection.application.religion"
                                  )
                                }}</label>
                                <span style="margin-left: 4px; color: red"
                                  >*</span
                                >

                                <v-select
                                  v-model="data.religion"
                                  outlined
                                  :items="religion"
                                  :hide-details="errors[0] ? false : true"
                                  item-value="name_en"
                                  :item-text="getItemText"
                                  :error="errors[0] ? true : false"
                                  :error-messages="
                                    errors[0]
                                      ? language == 'bn'
                                        ? 'অনুগ্রহ পূর্বক ধর্ম প্রদান করুন '
                                        : 'Please enter Religion'
                                      : ''
                                  "
                                >
                                </v-select>
                              </ValidationProvider>
                            </v-col>
                            <v-col cols="12" lg="6" md="4" sm="6">
                              <div class="validation_error_gender_type">
                                <ValidationProvider
                                  name="Nationality"
                                  vid="nationality"
                                  readonly
                                  v-slot="{ errors }"
                                  rules="required"
                                >
                                  <label>{{
                                    $t(
                                      "container.application_selection.application.nationality"
                                    )
                                  }}</label>
                                  <span style="margin-left: 4px; color: red"
                                    >*</span
                                  >
                                  <v-text-field
                                    readonly
                                    v-model="data.nationality"
                                    outlined
                                    :hide-details="errors[0] ? false : true"
                                    :error="errors[0] ? true : false"
                                    :error-messages="
                                      errors[0]
                                        ? language == 'bn'
                                          ? 'অনুগ্রহ পূর্বক জাতীয়তা প্রদান করুন '
                                          : 'Please enter Nationality'
                                        : ''
                                    "
                                  >
                                  </v-text-field>
                                </ValidationProvider>
                              </div>
                            </v-col>
                            <v-col cols="12" lg="6" md="4" sm="6">
                              <ValidationProvider
                                name="Age"
                                vid="age"
                                v-slot="{ errors }"
                                rules="required"
                              >
                                <label>{{
                                  $t(
                                    "container.application_selection.application.age"
                                  )
                                }}</label>
                                <span style="margin-left: 4px; color: red"
                                  >*</span
                                >
                                <v-text-field
                                  v-model="data.age"
                                  :hide-details="errors[0] ? false : true"
                                  outlined
                                  type="number"
                                  readonly
                                  :error="errors[0] ? true : false"
                                  :error-messages="
                                    errors[0]
                                      ? language == 'bn'
                                        ? 'অনুগ্রহ পূর্বক বয়স প্রদান করুন '
                                        : 'Please enter Age'
                                      : ''
                                  "
                                >
                                </v-text-field>
                              </ValidationProvider>
                            </v-col>
                            <v-col cols="12" lg="6" md="4" sm="6">
                              <ValidationProvider
                                name="Gender"
                                vid="gender"
                                v-slot="{ errors }"
                                rules="required"
                              >
                                <label>{{
                                  $t(
                                    "container.system_config.allowance_program.gender"
                                  )
                                }}</label>
                                <span style="margin-left: 4px; color: red"
                                  >*</span
                                >
                                <v-select
                                  v-model="data.gender_id"
                                  item-value="id"
                                  outlined
                                  :items="genders"
                                  :hide-details="errors[0] ? false : true"
                                  :item-text="getItemValue"
                                  :error="errors[0] ? true : false"
                                  :error-messages="
                                    errors[0]
                                      ? language == 'bn'
                                        ? 'অনুগ্রহ পূর্বক লিঙ্গ প্রদান করুন '
                                        : 'Please enter Gender'
                                      : ''
                                  "
                                >
                                </v-select>
                              </ValidationProvider>
                            </v-col>
                            <v-col cols="12" lg="6" md="4" sm="6">
                              <ValidationProvider
                                name="Education Status"
                                vid="education_status"
                                rules="required"
                                v-slot="{ errors }"
                              >
                                <label>{{
                                  $t(
                                    "container.application_selection.application.education_status"
                                  )
                                }}</label>
                                <span style="margin-left: 4px; color: red"
                                  >*</span
                                >
                                <v-select
                                  v-model="data.education_status"
                                  :item-text="getItemText"
                                  item-value="name_en"
                                  outlined
                                  :error="errors[0] ? true : false"
                                  :hide-details="errors[0] ? false : true"
                                  :error-messages="
                                    errors[0]
                                      ? language == 'bn'
                                        ? 'অনুগ্রহ পূর্বক শিক্ষাগত অবস্থা প্রদান করুন '
                                        : 'Please enter Educational Status'
                                      : ''
                                  "
                                  :items="education_status"
                                >
                                </v-select>
                              </ValidationProvider>
                            </v-col>
                            <v-col cols="12" lg="6" md="4" sm="6">
                              <ValidationProvider
                                name="Profession"
                                vid="profession"
                                v-slot="{ errors }"
                                rules="required"
                              >
                                <label>{{
                                  $t(
                                    "container.application_selection.application.profession"
                                  )
                                }}</label>
                                <span style="margin-left: 4px; color: red"
                                  >*</span
                                >
                                <v-select
                                  v-model="data.profession"
                                  outlined
                                  clearable
                                  :items="professionType"
                                  :item-text="getItemText"
                                  :hide-details="errors[0] ? false : true"
                                  item-value="name_en"
                                  :error="errors[0] ? true : false"
                                  :error-messages="
                                    errors[0]
                                      ? language == 'bn'
                                        ? 'অনুগ্রহ পূর্বক পেশা প্রদান করুন '
                                        : 'Please enter Profession'
                                      : ''
                                  "
                                >
                                </v-select>
                              </ValidationProvider>
                            </v-col>
                            <v-col cols="12" lg="6" md="4" sm="6">
                              <ValidationProvider
                                name="Identification Mark"
                                vid="identification_mark"
                                v-slot="{ errors }"
                              >
                                <label>{{
                                  $t(
                                    "container.application_selection.application.identification_mark"
                                  )
                                }}</label>
                                <v-text-field
                                  v-model="data.identification_mark"
                                  outlined
                                  :hide-details="errors[0] ? false : true"
                                  clearable
                                  :error="errors[0] ? true : false"
                                  :error-messages="errors[0]"
                                >
                                </v-text-field>
                              </ValidationProvider>
                            </v-col>
                          </v-row>
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                      <!-- Contact Information  -->
                      <v-expansion-panel class="mt-4">
                        <v-expansion-panel-header color="#1c3b68">
                          <h3 class="white--text">
                            {{
                              $t(
                                "container.application_selection.application.contact_info"
                              )
                            }}
                          </h3>
                          <template v-slot:actions>
                            <v-icon color="white">$expand</v-icon>
                          </template>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content class="mt-5">
                          <!-- Present Address Section -->
                          <v-row>
                            <v-col cols="12" class="text-center">
                              <v-chip
                                color="primary"
                                class="text-uppercase"
                                label
                                >{{
                                  $t(
                                    "container.application_selection.application.present_address"
                                  )
                                }}</v-chip
                              >
                            </v-col>
                            <!-- location panel -->
                            <v-col lg="6" md="6" cols="12">
                              <ValidationProvider
                                name="Division"
                                vid="division"
                                rules="required"
                                v-slot="{ errors }"
                              >
                                <label style="display: inline-block"
                                  >{{
                                    $t(
                                      "container.system_config.demo_graphic.division.division"
                                    )
                                  }}
                                </label>
                                <span style="margin-left: 4px; color: red"
                                  >*</span
                                >
                                <v-autocomplete
                                  :hide-details="errors[0] ? false : true"
                                  @change="getDistrictList"
                                  v-model="data.division_id"
                                  clearable
                                  outlined
                                  :items="divisions"
                                  item-text="name_en"
                                  item-value="id"
                                  required
                                  :error="errors[0] ? true : false"
                                  :error-messages="
                                    errors[0]
                                      ? language === 'bn'
                                        ? 'অনুগ্রহ করে বিভাগের নাম নির্বাচন করুন'
                                        : 'Please select the division name'
                                      : ''
                                  "
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
                                <label style="display: inline-block"
                                  >{{
                                    $t(
                                      "container.system_config.demo_graphic.district.district"
                                    )
                                  }}
                                </label>
                                <span style="margin-left: 4px; color: red"
                                  >*</span
                                >
                                <v-autocomplete
                                  :hide-details="errors[0] ? false : true"
                                  outlined
                                  v-model="data.district_id"
                                  clearable
                                  @input="getThanaList"
                                  :items="districts"
                                  item-text="name_en"
                                  item-value="id"
                                  required
                                  :error="errors[0] ? true : false"
                                  :error-messages="
                                    errors[0]
                                      ? language === 'bn'
                                        ? 'অনুগ্রহ করে জেলার নাম নির্বাচন করুন'
                                        : 'Please select the district name'
                                      : ''
                                  "
                                ></v-autocomplete>
                              </ValidationProvider>
                            </v-col>
                            <v-col cols="12" lg="6" md="6">
                              <ValidationProvider
                                name="Location Type"
                                vid="location_type"
                                rules="required"
                                v-slot="{ errors }"
                              >
                                <label style="display: inline-block"
                                  >{{ $t("container.list.location_type") }}
                                </label>
                                <span style="margin-left: 4px; color: red"
                                  >*</span
                                >
                                <v-autocomplete
                                  @input="LocationType($event)"
                                  v-model="data.location_type"
                                  :hide-details="errors[0] ? false : true"
                                  outlined
                                  :items="locationType"
                                  item-text="value_en"
                                  item-value="id"
                                  clearable
                                  required
                                  :error="errors[0] ? true : false"
                                  :error-messages="
                                    errors[0]
                                      ? language === 'bn'
                                        ? 'অবস্থানের ধরন নির্বাচন করুন'
                                        : 'Please select the location type'
                                      : ''
                                  "
                                ></v-autocomplete>
                              </ValidationProvider>
                            </v-col>
                            <v-col
                              v-if="data.location_type == 2"
                              lg="6"
                              md="6"
                              cols="12"
                            >
                              <ValidationProvider
                                name="Upazila"
                                vid="thana_id"
                                rules="required"
                                v-slot="{ errors }"
                              >
                                <label style="display: inline-block"
                                  >{{
                                    $t(
                                      "container.system_config.demo_graphic.thana.thana"
                                    )
                                  }}
                                </label>
                                <span style="margin-left: 4px; color: red"
                                  >*</span
                                >
                                <v-autocomplete
                                  :hide-details="errors[0] ? false : true"
                                  v-model="data.thana_id"
                                  outlined
                                  @change="getUnionList"
                                  :items="thanas"
                                  clearable
                                  item-text="name_en"
                                  item-value="id"
                                  required
                                  :error="errors[0] ? true : false"
                                  :error-messages="
                                    errors[0]
                                      ? language === 'bn'
                                        ? 'অনুগ্রহ করে উপজেলার নাম নির্বাচন করুন'
                                        : 'Please select the upazila name'
                                      : ''
                                  "
                                ></v-autocomplete>
                              </ValidationProvider>
                            </v-col>
                            <v-col
                              v-if="data.location_type == 2"
                              lg="6"
                              md="6"
                              cols="12"
                            >
                              <ValidationProvider
                                name="union"
                                vid="union_id"
                                rules="required"
                                v-slot="{ errors }"
                              >
                                <label style="display: inline-block"
                                  >{{
                                    $t(
                                      "container.system_config.demo_graphic.ward.union"
                                    )
                                  }}
                                </label>
                                <span style="margin-left: 4px; color: red"
                                  >*</span
                                >
                                <v-autocomplete
                                  :hide-details="errors[0] ? false : true"
                                  v-model="data.union_id"
                                  outlined
                                  clearable
                                  :items="unions"
                                  item-text="name_en"
                                  item-value="id"
                                  required
                                  :error="errors[0] ? true : false"
                                  :error-messages="
                                    errors[0]
                                      ? language === 'bn'
                                        ? 'অনুগ্রহ করে ইউনিয়নের নাম নির্বাচন করুন'
                                        : 'Please select the union name'
                                      : ''
                                  "
                                ></v-autocomplete>
                              </ValidationProvider>
                            </v-col>
                            <v-col
                              v-if="data.location_type == 3"
                              lg="6"
                              md="6"
                              cols="12"
                            >
                              <ValidationProvider
                                name="city corporation"
                                vid="city_id"
                                rules="required"
                                v-slot="{ errors }"
                              >
                                <label style="display: inline-block"
                                  >{{
                                    $t(
                                      "container.system_config.demo_graphic.ward.city"
                                    )
                                  }}
                                </label>
                                <span style="margin-left: 4px; color: red"
                                  >*</span
                                >
                                <v-autocomplete
                                  :hide-details="errors[0] ? false : true"
                                  v-model="data.city_id"
                                  @change="getCityThanaList"
                                  outlined
                                  clearable
                                  :items="cities"
                                  item-text="name_en"
                                  item-value="id"
                                  required
                                  :error="errors[0] ? true : false"
                                  :error-messages="
                                    errors[0]
                                      ? language === 'bn'
                                        ? 'অনুগ্রহ করে সিটি কর্পোরেশনের নাম নির্বাচন করুন'
                                        : 'Please select the city corporation Name'
                                      : ''
                                  "
                                ></v-autocomplete>
                              </ValidationProvider>
                            </v-col>
                            <v-col
                              v-if="data.location_type == 3"
                              lg="6"
                              md="6"
                              cols="12"
                            >
                              <ValidationProvider
                                name="thana"
                                vid="city_thana_id"
                                rules="required"
                                v-slot="{ errors }"
                              >
                                <label style="display: inline-block"
                                  >{{
                                    $t(
                                      "container.system_config.demo_graphic.ward.thana"
                                    )
                                  }}
                                </label>
                                <span style="margin-left: 4px; color: red"
                                  >*</span
                                >
                                <v-autocomplete
                                  :hide-details="errors[0] ? false : true"
                                  v-model="data.city_thana_id"
                                  outlined
                                  :items="city_thanas"
                                  item-text="name_en"
                                  clearable
                                  item-value="id"
                                  required
                                  :error="errors[0] ? true : false"
                                  :error-messages="
                                    errors[0]
                                      ? language === 'bn'
                                        ? 'অনুগ্রহ করে থানার নাম নির্বাচন করুন'
                                        : 'Please select the thana Name'
                                      : ''
                                  "
                                ></v-autocomplete>
                              </ValidationProvider>
                            </v-col>
                            <v-col
                              v-if="data.location_type == 1"
                              lg="6"
                              md="6"
                              cols="12"
                            >
                              <ValidationProvider
                                name="District Pourashava"
                                vid="district_pouro_id"
                                rules="required"
                                v-slot="{ errors }"
                              >
                                <label style="display: inline-block"
                                  >{{
                                    $t(
                                      "container.system_config.demo_graphic.ward.pouro"
                                    )
                                  }}
                                </label>
                                <span style="margin-left: 4px; color: red"
                                  >*</span
                                >
                                <v-autocomplete
                                  :hide-details="errors[0] ? false : true"
                                  v-model="data.district_pouro_id"
                                  outlined
                                  clearable
                                  :items="district_poros"
                                  item-text="name_en"
                                  item-value="id"
                                  required
                                  :error="errors[0] ? true : false"
                                  :error-messages="
                                    errors[0]
                                      ? language === 'bn'
                                        ? 'অনুগ্রহ করে জেলার পৌরশব নাম নির্বাচন করুন'
                                        : 'Please select the district Paurashava Name'
                                      : ''
                                  "
                                ></v-autocomplete>
                              </ValidationProvider>
                            </v-col>
                            <v-col lg="6" md="6" cols="12">
                              <ValidationProvider
                                name="Post Code"
                                vid="post_code"
                                rules="CheckPost||required"
                                v-slot="{ errors }"
                              >
                                <label style="display: inline-block"
                                  >{{
                                    $t(
                                      "container.system_config.demo_graphic.ward.post_code"
                                    )
                                  }}
                                </label>
                                <span style="margin-left: 4px; color: red"
                                  >*</span
                                >
                                <v-text-field
                                  v-model="data.post_code"
                                  type="number"
                                  outlined
                                  :hide-details="errors[0] ? false : true"
                                  clearable
                                  :error="errors[0] ? true : false"
                                  :error-messages="
                                    errors[0]
                                      ? language == 'bn'
                                        ? 'অনুগ্রহ পূর্বক গ্রহণযোগ্য পোস্ট কোড প্রদান করুন'
                                        : 'Please enter valid Post Code'
                                      : ''
                                  "
                                >
                                </v-text-field>
                              </ValidationProvider>
                            </v-col>
                            <v-col lg="6" md="6" cols="12">
                              <ValidationProvider
                                name="Village/House No.,
                                                        Road No., Block No, Section"
                                vid="address"
                                rules="required"
                                v-slot="{ errors }"
                              >
                                <label style="display: inline-block"
                                  >{{
                                    $t(
                                      "container.system_config.demo_graphic.ward.address"
                                    )
                                  }}
                                </label>
                                <span style="margin-left: 4px; color: red"
                                  >*</span
                                >
                                <v-text-field
                                  v-model="data.address"
                                  outlined
                                  clearable
                                  :hide-details="errors[0] ? false : true"
                                  :error="errors[0] ? true : false"
                                  handleCheckboxChangsa
                                  :error-messages="
                                    errors[0]
                                      ? language == 'bn'
                                        ? 'অনুগ্রহ পূর্বক গ্রাম/বাড়ি নং, রোড নং, ব্লক নং, সেকশন প্রদান করুন'
                                        : 'Please enter Village/House No., Road No., Block No, Section'
                                      : ''
                                  "
                                >
                                </v-text-field>
                              </ValidationProvider>
                            </v-col>
                          </v-row>
                          <!-- Permanent Address Section -->
                          <v-row>
                            <v-col cols="12" class="text-center">
                              <v-chip
                                color="primary"
                                class="text-uppercase"
                                label
                                >{{
                                  $t(
                                    "container.application_selection.application.permanent_address"
                                  )
                                }}</v-chip
                              >
                            </v-col>
                            <v-col cols="12">
                              <v-checkbox
                                v-model="checkbox"
                                :label="
                                  $t(
                                    'container.application_selection.application.same_address'
                                  )
                                "
                                @change="handleCheckboxChange"
                              ></v-checkbox>
                            </v-col>
                            <!-- Location Part -->
                            <v-col lg="6" md="6" cols="12">
                              <ValidationProvider
                                name="Division"
                                vid="division"
                                rules="required"
                                v-slot="{ errors }"
                              >
                                <label style="display: inline-block"
                                  >{{
                                    $t(
                                      "container.system_config.demo_graphic.division.division"
                                    )
                                  }}
                                </label>
                                <span style="margin-left: 4px; color: red"
                                  >*</span
                                >
                                <v-autocomplete
                                  :hide-details="errors[0] ? false : true"
                                  @change="getPermanentDistrictList"
                                  v-model="data.p_division_id"
                                  clearable
                                  outlined
                                  :items="permanent_divisions"
                                  item-text="name_en"
                                  item-value="id"
                                  required
                                  :error="errors[0] ? true : false"
                                  :error-messages="
                                    errors[0]
                                      ? language === 'bn'
                                        ? 'অনুগ্রহ করে বিভাগের নাম নির্বাচন করুন'
                                        : 'Please select the division name'
                                      : ''
                                  "
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
                                <label style="display: inline-block"
                                  >{{
                                    $t(
                                      "container.system_config.demo_graphic.district.district"
                                    )
                                  }}
                                </label>
                                <span style="margin-left: 4px; color: red"
                                  >*</span
                                >
                                <v-autocomplete
                                  :hide-details="errors[0] ? false : true"
                                  outlined
                                  v-model="data.p_district_id"
                                  clearable
                                  @input="getPermanentThanaList"
                                  :items="permanent_districts"
                                  item-text="name_en"
                                  item-value="id"
                                  required
                                  :error="errors[0] ? true : false"
                                  :error-messages="
                                    errors[0]
                                      ? language === 'bn'
                                        ? 'অনুগ্রহ করে জেলার নাম নির্বাচন করুন'
                                        : 'Please select the district name'
                                      : ''
                                  "
                                ></v-autocomplete>
                              </ValidationProvider>
                            </v-col>
                            <v-col cols="12" lg="6" md="6">
                              <ValidationProvider
                                name="Location Type"
                                vid="location_type"
                                rules="required"
                                v-slot="{ errors }"
                              >
                                <label style="display: inline-block"
                                  >{{ $t("container.list.location_type") }}
                                </label>
                                <span style="margin-left: 4px; color: red"
                                  >*</span
                                >
                                <v-autocomplete
                                  @input="permanent_locationType($event)"
                                  v-model="data.p_location_type"
                                  :hide-details="errors[0] ? false : true"
                                  outlined
                                  :items="locationType"
                                  item-text="value_en"
                                  item-value="id"
                                  clearable
                                  required
                                  :error="errors[0] ? true : false"
                                  :error-messages="
                                    errors[0]
                                      ? language === 'bn'
                                        ? 'অবস্থানের ধরন নির্বাচন করুন'
                                        : 'Please select the location type'
                                      : ''
                                  "
                                ></v-autocomplete>
                              </ValidationProvider>
                            </v-col>
                            <v-col
                              v-if="data.p_location_type == 2"
                              lg="6"
                              md="6"
                              cols="12"
                            >
                              <ValidationProvider
                                name="Upazila"
                                vid="thana_id"
                                rules="required"
                                v-slot="{ errors }"
                              >
                                <label style="display: inline-block"
                                  >{{
                                    $t(
                                      "container.system_config.demo_graphic.thana.thana"
                                    )
                                  }}
                                </label>
                                <span style="margin-left: 4px; color: red"
                                  >*</span
                                >
                                <v-autocomplete
                                  :hide-details="errors[0] ? false : true"
                                  v-model="data.p_thana_id"
                                  outlined
                                  @change="getPermanentUnionList"
                                  :items="permanent_thanas"
                                  clearable
                                  item-text="name_en"
                                  item-value="id"
                                  required
                                  :error="errors[0] ? true : false"
                                  :error-messages="
                                    errors[0]
                                      ? language === 'bn'
                                        ? 'অনুগ্রহ করে উপজেলার নাম নির্বাচন করুন'
                                        : 'Please select the upazila name'
                                      : ''
                                  "
                                ></v-autocomplete>
                              </ValidationProvider>
                            </v-col>
                            <v-col
                              v-if="data.p_location_type == 2"
                              lg="6"
                              md="6"
                              cols="12"
                            >
                              <ValidationProvider
                                name="union"
                                vid="union_id"
                                rules="required"
                                v-slot="{ errors }"
                              >
                                <label style="display: inline-block"
                                  >{{
                                    $t(
                                      "container.system_config.demo_graphic.ward.union"
                                    )
                                  }}
                                </label>
                                <span style="margin-left: 4px; color: red"
                                  >*</span
                                >
                                <v-autocomplete
                                  :hide-details="errors[0] ? false : true"
                                  v-model="data.p_union_id"
                                  outlined
                                  clearable
                                  :items="permanent_unions"
                                  item-text="name_en"
                                  item-value="id"
                                  required
                                  :error="errors[0] ? true : false"
                                  :error-messages="
                                    errors[0]
                                      ? language === 'bn'
                                        ? 'অনুগ্রহ করে ইউনিয়নের নাম নির্বাচন করুন'
                                        : 'Please select the union name'
                                      : ''
                                  "
                                ></v-autocomplete>
                              </ValidationProvider>
                            </v-col>
                            <v-col
                              v-if="data.p_location_type == 3"
                              lg="6"
                              md="6"
                              cols="12"
                            >
                              <ValidationProvider
                                name="city corporation"
                                vid="city_id"
                                rules="required"
                                v-slot="{ errors }"
                              >
                                <label style="display: inline-block"
                                  >{{
                                    $t(
                                      "container.system_config.demo_graphic.ward.city"
                                    )
                                  }}
                                </label>
                                <span style="margin-left: 4px; color: red"
                                  >*</span
                                >
                                <v-autocomplete
                                  :hide-details="errors[0] ? false : true"
                                  v-model="data.p_city_id"
                                  @change="getPermanentCityThanaList"
                                  outlined
                                  clearable
                                  :items="permanent_cities"
                                  item-text="name_en"
                                  item-value="id"
                                  required
                                  :error="errors[0] ? true : false"
                                  :error-messages="
                                    errors[0]
                                      ? language === 'bn'
                                        ? 'অনুগ্রহ করে সিটি কর্পোরেশনের নাম নির্বাচন করুন'
                                        : 'Please select the city corporation Name'
                                      : ''
                                  "
                                ></v-autocomplete>
                              </ValidationProvider>
                            </v-col>
                            <v-col
                              v-if="data.p_location_type == 3"
                              lg="6"
                              md="6"
                              cols="12"
                            >
                              <ValidationProvider
                                name="thana"
                                vid="city_thana_id"
                                rules="required"
                                v-slot="{ errors }"
                              >
                                <label style="display: inline-block"
                                  >{{
                                    $t(
                                      "container.system_config.demo_graphic.ward.thana"
                                    )
                                  }}
                                </label>
                                <span style="margin-left: 4px; color: red"
                                  >*</span
                                >
                                <v-autocomplete
                                  :hide-details="errors[0] ? false : true"
                                  v-model="data.p_city_thana_id"
                                  outlined
                                  :items="permanent_city_thanas"
                                  item-text="name_en"
                                  clearable
                                  item-value="id"
                                  required
                                  :error="errors[0] ? true : false"
                                  :error-messages="
                                    errors[0]
                                      ? language === 'bn'
                                        ? 'অনুগ্রহ করে থানার নাম নির্বাচন করুন'
                                        : 'Please select the thana Name'
                                      : ''
                                  "
                                ></v-autocomplete>
                              </ValidationProvider>
                            </v-col>
                            <v-col
                              v-if="data.p_location_type == 1"
                              lg="6"
                              md="6"
                              cols="12"
                            >
                              <ValidationProvider
                                name="District Pourashava"
                                vid="district_pouro_id"
                                rules="required"
                                v-slot="{ errors }"
                              >
                                <label style="display: inline-block"
                                  >{{
                                    $t(
                                      "container.system_config.demo_graphic.ward.pouro"
                                    )
                                  }}
                                </label>
                                <span style="margin-left: 4px; color: red"
                                  >*</span
                                >
                                <v-autocomplete
                                  :hide-details="errors[0] ? false : true"
                                  v-model="data.p_district_pouro_id"
                                  outlined
                                  clearable
                                  :items="permanent_district_poros"
                                  item-text="name_en"
                                  item-value="id"
                                  required
                                  :error="errors[0] ? true : false"
                                  :error-messages="
                                    errors[0]
                                      ? language === 'bn'
                                        ? 'অনুগ্রহ করে জেলার পৌরশব নাম নির্বাচন করুন'
                                        : 'Please select the district Paurashava Name'
                                      : ''
                                  "
                                ></v-autocomplete>
                              </ValidationProvider>
                            </v-col>
                            <v-col cols="12" lg="6" md="4" sm="6">
                              <ValidationProvider
                                name="Post Code"
                                vid="permanent_post_code"
                                rules="CheckPost||required"
                                type="number"
                                v-slot="{ errors }"
                              >
                                <label style="display: inline-block"
                                  >{{
                                    $t(
                                      "container.system_config.demo_graphic.ward.post_code"
                                    )
                                  }}
                                </label>
                                <span style="margin-left: 4px; color: red"
                                  >*</span
                                >
                                <v-text-field
                                  v-model="data.p_post_code"
                                  outlined
                                  clearable
                                  :hide-details="errors[0] ? false : true"
                                  :error="errors[0] ? true : false"
                                  :error-messages="
                                    errors[0]
                                      ? language == 'bn'
                                        ? 'অনুগ্রহ পূর্বক গ্রহণযোগ্য পোস্ট কোড প্রদান করুন'
                                        : 'Please enter valid Post Code'
                                      : ''
                                  "
                                >
                                </v-text-field>
                              </ValidationProvider>
                            </v-col>
                            <v-col cols="12" lg="6" md="4" sm="6">
                              <ValidationProvider
                                name="Village/House No.,
                                                Road No., Block No, Section"
                                vid="permanent_address"
                                rules="required"
                                v-slot="{ errors }"
                              >
                                <label style="display: inline-block"
                                  >{{
                                    $t(
                                      "container.system_config.demo_graphic.ward.address"
                                    )
                                  }}
                                </label>
                                <span style="margin-left: 4px; color: red"
                                  >*</span
                                >
                                <v-text-field
                                  v-model="data.p_address"
                                  outlined
                                  :hide-details="errors[0] ? false : true"
                                  clearable
                                  :error="errors[0] ? true : false"
                                  :error-messages="
                                    errors[0]
                                      ? language == 'bn'
                                        ? 'অনুগ্রহ পূর্বক গ্রাম/বাড়ি নং, রোড নং, ব্লক নং, সেকশন প্রদান করুন'
                                        : 'Please enter Village/House No., Road No., Block No, Section'
                                      : ''
                                  "
                                >
                                </v-text-field>
                              </ValidationProvider>
                            </v-col>
                          </v-row>
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                      <!-- Bank/MFS Information -->
                      <v-expansion-panel class="mt-4">
                        <v-expansion-panel-header color="#1c3b68">
                          <template v-slot:actions>
                            <v-icon color="white">$expand</v-icon>
                          </template>
                          <h3 class="white--text">
                            {{
                              $t(
                                "container.application_selection.application.bank"
                              )
                            }}
                          </h3>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content class="mt-2">
                          <v-row>
                            <v-col cols="12" lg="6" sm="6" md="4">
                              <ValidationProvider
                                name="Account Name"
                                :vid="'account_name'"
                                rules="required"
                                v-slot="{ errors }"
                              >
                                <label style="display: inline-block">
                                  {{
                                    $t(
                                      "container.application_selection.application.account_name"
                                    )
                                  }}
                                </label>
                                <span style="margin-left: 4px; color: red"
                                  >*</span
                                >
                                <v-text-field
                                  v-model="data.account_name"
                                  outlined
                                  :hide-details="errors[0] ? false : true"
                                  clearable
                                  :error="errors[0] ? true : false"
                                  readonly
                                  :error-messages="errors[0]"
                                >
                                </v-text-field>
                              </ValidationProvider>
                            </v-col>
                            <v-col cols="12" lg="6" sm="6" md="4">
                              <v-radio-group v-model="data.account_type" row>
                                {{
                                  $t(
                                    "container.application_selection.application.account_type"
                                  )
                                }}

                                <span
                                  style="
                                    margin-left: 4px;
                                    margin-right: 4px;
                                    color: red;
                                  "
                                  >*</span
                                >
                                <v-radio
                                  :label="
                                    $t(
                                      'container.application_selection.application.bank_account'
                                    )
                                  "
                                  :value="1"
                                ></v-radio>
                                <v-radio
                                  :label="
                                    $t(
                                      'container.application_selection.application.mobile_account'
                                    )
                                  "
                                  :value="2"
                                  @click="mobile()"
                                ></v-radio>
                              </v-radio-group>
                            </v-col>
                            <v-col
                              cols="12"
                              lg="6"
                              sm="6"
                              md="4"
                              v-if="data.account_type === 2"
                            >
                              <ValidationProvider
                                name="Mobile Number Ownership"
                                vid="account_owner"
                                rules="required"
                                v-slot="{ errors }"
                              >
                                <label style="display: inline-block">
                                  {{
                                    $t(
                                      "container.application_selection.application.mobile_ownership"
                                    )
                                  }}
                                </label>
                                <span style="margin-left: 4px; color: red"
                                  >*</span
                                >
                                <v-select
                                  v-model="data.account_owner"
                                  outlined
                                  clearable
                                  :hide-details="errors[0] ? false : true"
                                  :items="mobile_ownership"
                                  :item-text="getItemText"
                                  item-value="name_en"
                                  :error="errors[0] ? true : false"
                                  :error-messages="
                                    errors[0]
                                      ? language == 'bn'
                                        ? 'অনুগ্রহ পূর্বক মোবাইল নম্বরের মালিকানা প্রদান করুন '
                                        : 'Please enter Mobile Number ownership'
                                      : ''
                                  "
                                >
                                </v-select>
                              </ValidationProvider>
                            </v-col>
                            <v-col
                              cols="12"
                              lg="6"
                              sm="6"
                              md="4"
                              v-if="data.account_type === 1"
                            >
                              <ValidationProvider
                                name=" Bank Account Ownership"
                                vid="bank_account_owner"
                                rules="required"
                                v-slot="{ errors }"
                              >
                                <label style="display: inline-block"
                                  >{{
                                    $t(
                                      "container.application_selection.application.account_ownership"
                                    )
                                  }}
                                </label>
                                <span style="margin-left: 4px; color: red"
                                  >*</span
                                >

                                <v-select
                                  v-model="data.account_owner"
                                  outlined
                                  clearable
                                  :items="mobile_ownership"
                                  :item-text="getItemText"
                                  item-value="name_en"
                                  :hide-details="errors[0] ? false : true"
                                  :error="errors[0] ? true : false"
                                  :error-messages="
                                    errors[0]
                                      ? language == 'bn'
                                        ? 'অনুগ্রহ পূর্বক ব্যাংক অ্যাকাউন্টের মালিকানা প্রদান করুন '
                                        : 'Please enter Bank Account ownership'
                                      : ''
                                  "
                                >
                                </v-select>
                              </ValidationProvider>
                            </v-col>
                            <v-col
                              cols="12"
                              lg="6"
                              sm="6"
                              md="4"
                              v-if="data.account_type === 2"
                            >
                              <ValidationProvider
                                rules="checkNumberMobile||required"
                                name="Mobile Number"
                                vid="account_number"
                                v-slot="{ errors }"
                              >
                                <label style="display: inline-block"
                                  >{{
                                    $t(
                                      "container.application_selection.application.mobile"
                                    )
                                  }} </label
                                ><span style="margin-left: 4px; color: red"
                                  >*</span
                                >

                                <v-text-field
                                  v-model="data.account_number"
                                  outlined
                                  :hide-details="errors[0] ? false : true"
                                  type="number"
                                  clearable
                                  :error="errors[0] ? true : false"
                                  :error-messages="
                                    errors[0]
                                      ? language == 'bn'
                                        ? 'অনুগ্রহ পূর্বক মোবাইল নম্বর প্রদান করুন '
                                        : 'Please enter Mobile Number'
                                      : ''
                                  "
                                >
                                </v-text-field>
                              </ValidationProvider>
                            </v-col>
                            <v-col
                              cols="12"
                              lg="6"
                              sm="6"
                              md="4"
                              v-if="data.account_type === 1"
                            >
                              <ValidationProvider
                                rules="required"
                                name="Bank name"
                                vid="bank_name"
                                v-slot="{ errors }"
                              >
                                <label style="display: inline-block"
                                  >{{
                                    $t(
                                      "container.application_selection.application.bank_name"
                                    )
                                  }} </label
                                ><span style="margin-left: 4px; color: red"
                                  >*</span
                                >

                                <v-text-field
                                  v-model="data.bank_name"
                                  outlined
                                  :hide-details="errors[0] ? false : true"
                                  clearable
                                  :error="errors[0] ? true : false"
                                  :error-messages="
                                    errors[0]
                                      ? language == 'bn'
                                        ? 'অনুগ্রহ পূর্বক ব্যাংকের নাম প্রদান করুন'
                                        : 'Please enter Bank Name'
                                      : ''
                                  "
                                >
                                </v-text-field>
                              </ValidationProvider>
                            </v-col>
                            <v-col
                              cols="12"
                              lg="6"
                              sm="6"
                              md="4"
                              v-if="data.account_type === 1"
                            >
                              <ValidationProvider
                                rules="required"
                                name="Branch name"
                                vid="branch_name"
                                v-slot="{ errors }"
                              >
                                <label style="display: inline-block">{{
                                  $t(
                                    "container.application_selection.application.branch_name"
                                  )
                                }}</label
                                ><span style="margin-left: 4px; color: red"
                                  >*</span
                                >

                                <v-text-field
                                  v-model="data.branch_name"
                                  outlined
                                  clearable
                                  :error="errors[0] ? true : false"
                                  :hide-details="errors[0] ? false : true"
                                  :error-messages="
                                    errors[0]
                                      ? language == 'bn'
                                        ? 'অনুগ্রহ পূর্বক শাখার নাম প্রদান করুন '
                                        : 'Please enter Branch Name'
                                      : ''
                                  "
                                >
                                </v-text-field>
                              </ValidationProvider>
                            </v-col>
                            <v-col
                              cols="12"
                              lg="6"
                              sm="6"
                              md="4"
                              v-if="data.account_type === 1"
                            >
                              <ValidationProvider
                                rules="required"
                                name="Bank Account number"
                                vid="bank_account_number"
                                v-slot="{ errors }"
                              >
                                <label style="display: inline-block"
                                  >{{
                                    $t(
                                      "container.application_selection.application.bank_account_number"
                                    )
                                  }} </label
                                ><span style="margin-left: 4px; color: red"
                                  >*</span
                                >

                                <v-text-field
                                  v-model="data.account_number"
                                  :hide-details="errors[0] ? false : true"
                                  outlined
                                  clearable
                                  :error="errors[0] ? true : false"
                                  :error-messages="
                                    errors[0]
                                      ? language == 'bn'
                                        ? 'অনুগ্রহ পূর্বক ব্যাংক অ্যাকাউন্ট নম্বর প্রদান করুন '
                                        : 'Please enter Bank Account Number'
                                      : ''
                                  "
                                  type="number"
                                >
                                </v-text-field>
                              </ValidationProvider>
                            </v-col>
                            <v-col cols="12" lg="6" sm="6" md="4">
                              <ValidationProvider
                                name="Email"
                                vid="Email"
                                rules="email"
                                v-slot="{ errors }"
                              >
                                <label style="display: inline-block"
                                  >{{
                                    $t(
                                      "container.application_selection.application.email"
                                    )
                                  }}
                                </label>

                                <v-text-field
                                  v-model="data.email"
                                  outlined
                                  clearable
                                  :hide-details="errors[0] ? false : true"
                                  type="email"
                                  :error="errors[0] ? true : false"
                                  :error-messages="
                                    errors[0]
                                      ? language == 'bn'
                                        ? 'অনুগ্রহ পূর্বক গ্রহণযোগ্য ইমেইল প্রদান করুন '
                                        : 'Please valid enter Email'
                                      : ''
                                  "
                                >
                                </v-text-field>
                              </ValidationProvider>
                            </v-col>
                          </v-row>
                          <p class="red--text mt-2">
                            {{
                              $t(
                                "container.application_selection.application.bank_alert"
                              )
                            }}
                          </p>
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                    </v-expansion-panels>
                  </v-row>
                </v-container>
              </v-form>
            </ValidationObserver>
          </v-col>
        </v-card-text>
        <!-- Action buttons -->
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog">
            {{ $t("container.list.close") }}
          </v-btn>
          <v-btn color="blue darken-1" text @click="addToList">
            {{ $t("container.list.addToList") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ApiService from "@/services/ApiService";
import { extend, ValidationProvider, ValidationObserver } from "vee-validate";
import { required } from "vee-validate/dist/rules";
import Spinner from "@/components/Common/Spinner.vue";
extend("required", required);
extend("bangla", {
  validate: (value) => {
    // Regular expression to match Bangla characters
    const banglaRegex = /^[\u0980-\u09FF\s]+$/;
    return banglaRegex.test(value);
  },
  message: "Only Bangla characters will be allowed in this field",
});
export default {
  name: "Create",
  title: "CTM - Emergency Beneficiary Create",
  components: {
    ValidationProvider,
    ValidationObserver,
    Spinner,
  },
  props: {
    dialogVisible: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      data: {
        program_id: null,
        emergency_payment_name: null,
        division_id: null,
        district_id: null,
        location_type: null,
        thana_id: null,
        union_id: null,
        city_id: null,
        city_thana_id: null,
        district_pouro_id: null,
        p_division_id: null,
        p_district_id: null,
        p_location_type: null,
        p_thana_id: null,
        p_union_id: null,
        p_city_id: null,
        p_city_thana_id: null,
        p_district_pouro_id: null,
        p_location_type: null,
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
        marital_status: null,
        post_code: null,
        address: null,
        p_post_code: null,
        p_address: null,
        mobile: null,
        account_name: null,
        account_number: null,
        account_type: null,
        bank_name: null,
        email: null,
        account_owner: null,
        branch_name: null,
      },
      genders: [],
      imageUrl: null,
      panel: [0, 1],
      signUrl: null,
      internalDialogVisible: this.dialogVisible,
      districts: [],
      district_poros: [],
      cities: [],
      thanas: [],
      city_thanas: [],
      unions: [],
      permanent_districts: [],
      permanent_thanas: [],
      permanent_cities: [],
      permanent_unions: [],
      permanent_pouros: [],
      permanent_district_poros: [],
      permanent_city_thanas: [],
      wards: [],
      locationType: [],
      loading: false,
      marital_status: [
        { name_en: "Married", name_bn: "বিবাহিত" },
        { name_en: "Unmarried", name_bn: "অবিবাহিত" },
        { name_en: "Widow", name_bn: "বিধবা" },
        { name_en: "Other", name_bn: "অন্যান্য" },
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
      mobile_ownership: [
        { name_en: "Myself", name_bn: "নিজ" },
        { name_en: "Family Member", name_bn: "পরিবারের সদস্য" },
        { name_en: "Other", name_bn: "অন্যান্য" },
      ],
      religion: [
        { name_en: "Islam", name_bn: "ইসলাম" },
        { name_en: "Hindu", name_bn: "হিন্দু" },
        { name_en: "Buddhist", name_bn: "বৌদ্ধ" },
        { name_en: "Christian", name_bn: "খ্রিষ্টান" },
        { name_en: "Other", name_bn: "অন্যান্য" },
      ],
      professionType: [
        { name_en: "Farmer", name_bn: "কৃষক" },
        { name_en: "Rickshaw Puller", name_bn: "রিকশাচালক" },
        { name_en: "Day Laborer", name_bn: "দিন মজুর" },
        { name_en: "Street Vendor", name_bn: "রাস্তার দোকানদার" },
        { name_en: "Fisherman", name_bn: "জেলে" },
        { name_en: "Construction Worker", name_bn: "নির্মাণ কর্মী" },
        { name_en: "Domestic Worker", name_bn: "পরিবারিক কর্মচারী" },
        { name_en: "Tea Garden Laborer", name_bn: "চা বাগানের শ্রমিক" },
        { name_en: "Auto Rickshaw Driver", name_bn: "অটো রিকশা চালক" },
        { name_en: "Handicraftsman", name_bn: "হাস্তশিল্পী" },
        { name_en: "Plumber", name_bn: "প্লাম্বার" },
        { name_en: "Carpenter", name_bn: "কার্পেন্টার" },
        { name_en: "Street Sweeper", name_bn: "রাস্তা পরিষ্কারক" },
        { name_en: "Security Guard", name_bn: "নিরাপত্তা গার্ড" },
        { name_en: "Rural Artisan", name_bn: "গ্রামীণ শিল্পী" },
        { name_en: "Other", name_bn: "অন্যান্য" },
      ],
      education_status: [
        { name_en: "Illiterate", name_bn: "অশিক্ষিত" },
        { name_en: "JSC", name_bn: "জেএসসি" },
        { name_en: "SSC", name_bn: "এসএসসি" },
        { name_en: "HSC", name_bn: "এইচএসসি" },
        { name_en: "Graduate", name_bn: "গ্রাজুয়েট" },
        { name_en: "Post Graduate", name_bn: "পোস্ট গ্রাজুয়েট" },
        { name_en: "Other", name_bn: "অন্যান্য" },
      ],
      checkbox: false,
    };
  },
  computed: {
    ...mapState({
      divisions: (state) => state.Division.divisions,
      permanent_divisions: (state) => state.Division.divisions,
      allowanceProgrames: (state) => state.Allowance.allowanceProgrames,
    }),
    language: {
      get() {
        return this.$store.getters.getAppLanguage;
      },
    },
  },
  created() {
    this.$store
      .dispatch("getGlobalLookupByType", 2)
      .then((res) => (this.genders = res));
  },
  beforeMount() {
    this.updateHeaderTitle();
  },
  mounted() {
    this.getLocationType();
    this.GetAllDivisions();
    this.GetAllAllownceProgram();
  },
  methods: {
    getItemValue(item) {
      return this.language === "bn" ? item.value_bn : item.value_en;
    },
    getItemText(item) {
      return this.language === "bn" ? item.name_bn : item.name_en;
    },
    getLocationType() {
      this.$store
        .dispatch("getLookupByType", 1)
        .then((res) => (this.locationType = res));
    },
    async LocationType($event) {
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
    async permanent_locationType($event) {
      if (
        this.data.p_district_id != null &&
        this.data.p_location_type != null
      ) {
        if ($event === 2) {
          await this.$axios
            .get(`/admin/thana/get/${this.data.p_district_id}`, {
              headers: {
                Authorization: "Bearer " + this.$store.state.token,
                "Content-Type": "multipart/form-data",
              },
            })
            .then((result) => {
              this.permanent_thanas = result.data.data;
            });
        }
        if ($event === 3) {
          await this.$axios
            .get("/admin/city/get/" + this.data.p_district_id + "/" + $event, {
              headers: {
                Authorization: "Bearer " + this.$store.state.token,
                "Content-Type": "multipart/form-data",
              },
            })
            .then((result) => {
              this.permanent_cities = result.data.data;
            });
        }
        if ($event === 1) {
          await this.$axios
            .get("/admin/city/get/" + this.data.p_district_id + "/" + $event, {
              headers: {
                Authorization: "Bearer " + this.$store.state.token,
                "Content-Type": "multipart/form-data",
              },
            })
            .then((result) => {
              this.permanent_district_poros = result.data.data;
            });
        }
      }
    },
    getDistrictList(division_id = null) {
      let divisionId = division_id ? division_id : this.data.division_id;
      var queryData = {
        table_name: "locations",
        field_name: ["id", "parent_id", "type", "name_en"],
        condition: { parent_id: divisionId, deleted_at: null },
      };
      ApiService.getDropData("global/common-dropdown", queryData)
        .then((res) => {
          this.districts = res.data;
        })
        .catch((error) => console.log(error));
    },
    getThanaList(district_id = null) {
      let districtId = district_id ? district_id : this.data.district_id;
      var queryData = {
        table_name: "locations",
        field_name: ["id", "parent_id", "type", "name_en"],
        condition: { parent_id: districtId, deleted_at: null },
      };
      ApiService.getDropData("global/common-dropdown", queryData)
        .then((res) => {
          this.thanas = res.data;
        })
        .catch((error) => console.log(error));
    },
    getUnionList(thana_id = null) {
      let thanaId = thana_id ? thana_id : this.data.thana_id;
      var queryData = {
        table_name: "locations",
        field_name: ["id", "parent_id", "type", "name_en"],
        condition: { parent_id: thanaId, deleted_at: null },
      };
      ApiService.getDropData("global/common-dropdown", queryData)
        .then((res) => {
          this.unions = res.data;
        })
        .catch((error) => console.log(error));
    },
    getCityThanaList(city_id = null) {
      let cityId = city_id ? city_id : this.data.city_id;
      var queryData = {
        table_name: "locations",
        field_name: ["id", "parent_id", "type", "name_en"],
        condition: { parent_id: cityId, deleted_at: null },
      };
      ApiService.getDropData("global/common-dropdown", queryData)
        .then((res) => {
          this.city_thanas = res.data;
        })
        .catch((error) => console.log(error));
    },
    getPermanentDistrictList(p_division_id = null) {
      let p_divisionId = p_division_id
        ? p_division_id
        : this.data.p_division_id;
      var queryData = {
        table_name: "locations",
        field_name: ["id", "parent_id", "type", "name_en"],
        condition: { parent_id: p_divisionId, deleted_at: null },
      };
      ApiService.getDropData("global/common-dropdown", queryData)
        .then((res) => {
          this.permanent_districts = res.data;
        })
        .catch((error) => console.log(error));
    },
    getPermanentThanaList(p_district_id = null) {
      let p_districtId = p_district_id
        ? p_district_id
        : this.data.p_district_id;
      var queryData = {
        table_name: "locations",
        field_name: ["id", "parent_id", "type", "name_en"],
        condition: { parent_id: p_districtId, deleted_at: null },
      };
      ApiService.getDropData("global/common-dropdown", queryData)
        .then((res) => {
          this.permanent_thanas = res.data;
        })
        .catch((error) => console.log(error));
    },
    getPermanentUnionList(p_thana_id = null) {
      let p_thanaId = p_thana_id ? p_thana_id : this.data.p_thana_id;
      var queryData = {
        table_name: "locations",
        field_name: ["id", "parent_id", "type", "name_en"],
        condition: { parent_id: p_thanaId, deleted_at: null },
      };
      ApiService.getDropData("global/common-dropdown", queryData)
        .then((res) => {
          this.permanent_unions = res.data;
        })
        .catch((error) => console.log(error));
    },
    getPermanentCityThanaList(p_city_id = null) {
      let p_cityId = p_city_id ? p_city_id : this.data.p_city_id;
      var queryData = {
        table_name: "locations",
        field_name: ["id", "parent_id", "type", "name_en"],
        condition: { parent_id: p_cityId, deleted_at: null },
      };
      ApiService.getDropData("global/common-dropdown", queryData)
        .then((res) => {
          this.permanent_city_thanas = res.data;
        })
        .catch((error) => console.log(error));
    },
    checkLanguage() {
      let checkLanguageEnglish = this.$checkLanguage(this.data.title_en);
      let checkLanguageBangla = this.$checkLanguage(this.data.title_bn);
      let errs = {};

      if (
        checkLanguageBangla !== "Bangla" &&
        checkLanguageBangla !== "BanglaSpecialChar"
      ) {
        errs.title_bn = ["Please Enter in Bangla Language in this Field"];
      }

      if (checkLanguageEnglish != "English") {
        errs.title_en = ["Please Enter in English Language in this Field"];
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
    handleCheckboxChange(event) {
      console.log(event);
      console.log(event);
      if (event) {
        this.data.p_post_code = this.data.post_code;
        this.data.p_address = this.data.address;
        this.data.p_division_id = this.data.division_id;
        this.getPermanentDistrictList(this.data.division_id);
        this.data.p_district_id = this.data.district_id;
        this.getPermanentThanaList(this.data.district_id);
        this.data.p_location_type = this.data.location_type;

        this.permanent_locationType(this.data.location_type);
        this.data.p_union_id = this.data.union_id;
        this.data.p_pouro_id = this.data.pouro_id;

        if (this.data.thana_id) {
          this.data.p_thana_id = this.data.thana_id;
          this.getPermanentUnionList(this.data.thana_id);
        }
        if (this.data.city_id) {
          this.data.p_city_id = this.data.city_id;
          this.data.p_city_thana_id = this.data.city_thana_id;
          this.getPermanentCityThanaList(this.data.city_id);
        }
        if (this.data.district_pouro_id) {
          this.data.p_district_pouro_id = this.data.district_pouro_id;
        }
        if (this.data.address != null) {
          this.data.p_address = this.data.address;
        }
        if (this.data.post_code != null) {
          this.data.p_post_code = this.data.post_code;
        }
      } else {
        this.data.permanent_division_id = null;
        this.data.permanent_district_id = null;
        this.data.permanent_upazila = null;
        this.data.permanent_post_code = null;
        this.data.permanent_address = null;
        this.data.permanent_location_type = null;
        this.data.permanent_thana_id = null;
        this.data.permanent_union_id = null;
        this.data.permanent_city_id = null;
        this.data.permanent_city_thana_id = null;
        this.data.permanent_district_pouro_id = null;
      }
    },
    addToList() {
      this.$emit("getData", this.data);
      this.internalDialogVisible = false;
    },
    previewImage() {
      if (this.data.image) {
        const maxFileSize = 200 * 1024; // 200 KB in bytes
        if (this.data.image.size > maxFileSize) {
          // alert("file size must be 200kb")
          // this.confirmDialog =true;
          if (this.language == "en") {
            this.$toast.error("File size must be under 200 KB");
          } else {
            this.$toast.error("ফাইলের আকার ২০০ কে বি এর কম হতে হবে");
          } // Show the alert
          this.data.image = "";

          return false;
        }
        const allowedTypes = ["image/png", "image/jpeg", "image/jpg"]; // Allowed file types
        if (!allowedTypes.includes(this.data.image.type)) {
          this.language === "en"
            ? this.$toast.error("Only PNG, JPEG, or JPG files are allowed")
            : this.$toast.error(
                "শুধুমাত্র পিএনজি, জেপিইজি, অথবা জেপিজি ফাইলগুলি অনুমোদিত"
              );
          this.data.image = "";
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
      console.log(event, index);
      const reader = new FileReader();
      reader.onload = (e) => {
        this.data.application_allowance_values[index].file_value =
          e.target.result;
      };
      reader.readAsDataURL(event);
    },
    previewSign() {
      if (this.data.signature) {
        const maxFileSize = 200 * 1024;
        if (this.data.signature.size > maxFileSize) {
          if (this.language == "en") {
            this.$toast.error("File size must be under 200 KB");
          } else {
            this.$toast.error("ফাইলের আকার ২০০ কে বি এর কম হতে হবে");
          } // Show the alert
          this.data.signature = "";

          return false;
        }
        const allowedTypes = ["image/png", "image/jpeg", "image/jpg"]; // Allowed file types
        if (!allowedTypes.includes(this.data.signature.type)) {
          this.language === "en"
            ? this.$toast.error("Only PNG, JPEG, or JPG files are allowed")
            : this.$toast.error(
                "শুধুমাত্র পিএনজি, জেপিইজি, অথবা জেপিজি ফাইলগুলি অনুমোদিত"
              );
          this.data.signature = "";
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
          if (this.language == "en") {
            this.$toast.error("File size must be under 200 KB");
          } else {
            this.$toast.error("ফাইলের আকার ২০০ কে বি এর কম হতে হবে");
          } // Show the alert
          this.data.nominee_image = "";

          return false;
        }
        const allowedTypes = ["image/png", "image/jpeg", "image/jpg"]; // Allowed file types
        if (!allowedTypes.includes(this.data.nominee_image.type)) {
          this.language === "en"
            ? this.$toast.error("Only PNG, JPEG, or JPG files are allowed")
            : this.$toast.error(
                "শুধুমাত্র পিএনজি, জেপিইজি, অথবা জেপিজি ফাইলগুলি অনুমোদিত"
              );
          this.data.nominee_image = "";
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
          if (this.language == "en") {
            this.$toast.error("File size must be under 200 KB");
          } else {
            this.$toast.error("ফাইলের আকার ২০০ কে বি এর কম হতে হবে");
          } // Show the alert
          this.data.nominee_signature = "";

          return false;
        }
        const allowedTypes = ["image/png", "image/jpeg", "image/jpg"]; // Allowed file types
        if (!allowedTypes.includes(this.data.nominee_signature.type)) {
          this.language === "en"
            ? this.$toast.error("Only PNG, JPEG, or JPG files are allowed")
            : this.$toast.error(
                "শুধুমাত্র পিএনজি, জেপিইজি, অথবা জেপিজি ফাইলগুলি অনুমোদিত"
              );
          this.data.nominee_signature = "";
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
    updateHeaderTitle() {
      const title = this.$t(
        "container.emergency_payment.emergency_beneficary.list"
      );
      this.$store.commit("setHeaderTitle", title);
    },
    closeDialog() {
      this.internalDialogVisible = false;
    },
    ...mapActions({
      GetAllDivisions: "Division/GetAllDivisions",
      GetAllAllownceProgram: "Allowance/GetAllAllownceProgram",
    }),
  },
  watch: {
    "$i18n.locale": "updateHeaderTitle",
    dialogVisible(newValue) {
      this.internalDialogVisible = newValue;
    },
    internalDialogVisible(newValue) {
      this.$emit("update:dialogVisible", newValue);
    },
  },
};
</script>
<style scoped>
.highlight-column {
  background-color: #e0eaf1;
}
.custom-margin-left {
  margin-left: 4px;
}
.button-color-linear-gradient {
  background: rgb(2, 0, 36);
  background: linear-gradient(
    90deg,
    rgb(28, 59, 104) 0%,
    rgba(9, 9, 121, 1) 35%
  );

  /* background: rgb(49, 232, 232);
  background: linear-gradient(
    90deg,
    rgba(49, 232, 232, 1) 0%,
    rgba(41, 110, 110, 1) 0%,
    rgba(16, 30, 61, 1) 64%
  ); */
}
</style>
