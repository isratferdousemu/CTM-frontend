<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="12">
        <v-card class="ma-0 pa-0" justify="center" outlined>
          <v-card-title class="component-title">
            <div class="clearfix">
              <div class="title-left">
                <h4 class="title-text">
                  {{
                    $t(
                        "container.emergency_payment.emergency_beneficiary.emergency_applicant"
                    )
                  }}
                </h4>
              </div>
            </div>
          </v-card-title>
          <v-card-text >
            <v-col cols="12" lg="12" md="4" sm="6">
              <ValidationObserver ref="form" v-slot="{ invalid }">
                <v-form>
                  <v-row align="center" justify="center">
                    <v-col>
                      <ValidationProvider
                          v-slot="{ errors }"
                          name="program"
                          rules="required"
                          vid="program"
                      >
                        <label
                        >{{
                            $t("container.emergency_payment.list")
                          }}
                        </label>
                        <span style="margin-left: 4px; color: red">*</span>
                        <v-autocomplete
                            v-model="data.emergency_allotment_id"
                            :error="!!errors[0]"
                            :error-messages="
                    errors[0]
                      ? language === 'bn'
                        ? 'অনুগ্রহ পূর্বক প্রোগ্রাম প্রদান করুন '
                        : 'Please enter Program'
                      : ''
                  "
                            :hide-details="!errors[0]"
                            :items="programs"
                            clearable
                            item-text="emergency_payment_name"
                            item-value="id"
                            outlined
                        >
                        </v-autocomplete>
                      </ValidationProvider>
                    </v-col>
                    <v-expansion-panels v-if="data.emergency_allotment_id" v-model="panel" class="mt-2" multiple>
                      <!--Applicant Verification-->
                      <v-expansion-panel>
                        <v-expansion-panel-header color="#1c3b68">
                          <template v-slot:actions>
                            <v-icon color="white">$expand</v-icon>
                          </template>
                          <h3 class="white--text">
                            {{
                              $t(
                                  "container.application_selection.application.applicant_verification"
                              )
                            }}
                          </h3>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content class="mt-2">
                          <ValidationProvider
                              v-slot="{ errors }"
                              name="Verification Type"
                              rules="required"
                              vid="verification_type"
                          >
                            <div
                                class="validation-error validation_error_age_limit"
                            >
                              <v-radio-group
                                  v-model="data.verification_type"
                                  row

                              >
                                {{
                                  $t(
                                      "container.application_selection.application.verification_type"
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
                                      'container.application_selection.application.nid'
                                    )
                                  "
                                    value="1"
                                ></v-radio>
                                <v-radio
                                    :label="
                                    $t(
                                      'container.application_selection.application.brn'
                                    )
                                  "
                                    value="2"
                                ></v-radio>
                              </v-radio-group>
                            </div>
                          </ValidationProvider>

                          <V-row>
                            <v-col cols="12" lg="6" md="4" sm="6">
                              <ValidationProvider
                                  v-slot="{ errors }"
                                  name="Number"
                                  rules="checkNumber||required"
                                  vid="verification_number"
                              >
                                <label>
                                  <span v-if="data.verification_type === 1">
                                    {{
                                      $t(
                                          "container.application_selection.application.nid"
                                      )
                                    }}
                                  </span>
                                  <span v-else-if="data.verification_type === 2">
                                    {{
                                      $t(
                                          "container.application_selection.application.brn"
                                      )
                                    }}
                                  </span>
                                  <span v-else>
                                    {{
                                      $t(
                                          "container.application_selection.application.nid_brn"
                                      )
                                    }}
                                  </span>
                                </label>

                                <span style="margin-left: 4px; color: red"
                                >*</span
                                >
                                <v-text-field
                                    v-model="data.verification_number"

                                    :error="!!errors[0]"
                                    :error-messages="
                                    errors[0]
                                      ? language === 'bn'
                                        ? 'অনুগ্রহ পূর্বক  ১০ বা ১৭ ডিজিটের সাথে যাচাইকরণ নম্বর লিখুন প্রদান করুন '
                                        : 'Please enter verification number with either 10 or 17 digit'
                                      : ''
                                  "
                                    :hide-details="!errors[0]"
                                    clearable
                                    outlined
                                    required
                                    type="text"
                                >
                                </v-text-field>
                              </ValidationProvider>
                            </v-col>

                            <!-- Read-only field to display calculated date of birth -->

                            <v-col cols="12" lg="6" md="4" sm="6">
                              <label
                              >{{
                                  $t(
                                      "container.application_selection.application.date_of_birth"
                                  )
                                }}
                              </label>
                              <span style="margin-left: 4px; color: red"
                              >*</span
                              >
                              <ValidationProvider
                                  v-slot="{ errors }"
                                  name="Date of Birth"
                                  rules="required"
                                  vid="date_of_birth"
                              >
                                <v-text-field
                                    v-model="data.date_of_birth"
                                    :error="!!errors[0]"
                                    :hide-details="!errors[0]"
                                    :value="formattedDate"
                                    clearable
                                    outlined
                                    type="date"
                                ></v-text-field>
                              </ValidationProvider>
                            </v-col>

                            <v-col class="d-flex justify-end" cols="12">
                              <v-btn
                                  :disabled="
                                  data.date_of_birth == null ||
                                  data.verification_number == null ||
                                  data.verification_type == null ||
                                  data.verification_type === 2 ||
                                  data.date_of_birth === '' ||
                                  data.verification_number === '' ||
                                  data.verification_type === ''
                                "
                                  class="btn"
                                  color="primary"
                                  elevation="1"
                                  @click="verifyApplicant"
                              >{{ $t("container.list.verify") }}
                              </v-btn>
                            </v-col>
                          </V-row>
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                      <!-- Personal Information  -->
                      <v-expansion-panel v-if="isVerified">
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
                                  v-if="imageUrl"
                                  :src="imageUrl"
                                  class="mb-5"
                                  style="
                                  width: 200px;
                                  height: 200px;

                                  border: 1px solid #ccc;
                                "
                              ></v-img>
                              <v-img
                                  v-if="!imageUrl"
                                  class="mb-5"
                                  src="/assets/images/profile.png"
                                  style="
                                  width: 150px;
                                  height: 150px;

                                  border: 1px solid #ccc;
                                "
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
                                    id="image"
                                    v-model="data.image"
                                    :hide-details="!errors[0]"
                                    :placeholder="
                                    language === 'bn'
                                      ? 'ফাইল নির্বাচন করুন'
                                      : 'Choose File'
                                  "
                                    accept="image/*"
                                    counter
                                    outlined
                                    prepend-icon=""
                                    prepend-outer-icon="mdi-camera"
                                    show-size
                                    @change="previewImage"
                                >
                                </v-file-input>
                              </ValidationProvider>
                            </v-col>
                            <v-col cols="12" lg="6" md="4" sm="6">
                              <div style="padding-top: 70px">
                                <v-img
                                    v-if="signUrl"
                                    :src="signUrl"
                                    class="mb-5"
                                    style="
                                    width: 200px;
                                    height: 80px;
                                    border: 1px solid #ccc;
                                  "
                                ></v-img>
                                <v-img
                                    v-if="!signUrl"
                                    class="mb-5"
                                    src="/assets/images/sign.png"
                                    style="
                                    width: 200px;
                                    height: 80px;
                                    border: 1px solid #ccc;
                                  "
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
                                    id="signature"
                                    v-model="data.signature"
                                    :hide-details="!errors[0]"
                                    :placeholder="
                                    language === 'bn'
                                      ? 'ফাইল নির্বাচন করুন '
                                      : 'Choose File'
                                  "
                                    accept="image/*"
                                    counter
                                    outlined
                                    prepend-icon=""
                                    prepend-outer-icon="mdi-camera"
                                    show-size
                                    @change="previewSign"
                                ></v-file-input>
                              </ValidationProvider>
                            </v-col>
                            <v-col cols="12" lg="6" md="4" sm="6">
                              <ValidationProvider
                                  v-slot="{ errors }"
                                  name="Name in Bangla"
                                  rules="required||bangla"
                                  vid="name_bn"
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
                                    :error="!!errors[0]"
                                    :error-messages="
                                    errors[0]
                                      ? language === 'bn'
                                        ? 'অনুগ্রহ পূর্বক সম্পূর্ণ নাম (বাংলায়) প্রদান করুন '
                                        : 'Please enter Full Name (Bangla)'
                                      : ''
                                  "
                                    :hide-details="!errors[0]"
                                    outlined
                                >
                                </v-text-field>
                              </ValidationProvider>
                            </v-col>
                            <v-col cols="12" lg="6" md="4" sm="6">
                              <ValidationProvider
                                  v-slot="{ errors }"
                                  name="Name in English"
                                  rules="required"
                                  vid="name_en"
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
                                    :error="!!errors[0]"
                                    :error-messages="
                                    errors[0]
                                      ? language === 'bn'
                                        ? 'অনুগ্রহ পূর্বক সম্পূর্ণ নাম (ইংরেজীতে) প্রদান করুন '
                                        : 'Please enter Full Name (English)'
                                      : ''
                                  "
                                    :hide-details="!errors[0]"
                                    clearable
                                    outlined
                                >
                                </v-text-field>
                              </ValidationProvider>
                            </v-col>
                            <v-col cols="12" lg="6" md="4" sm="6">
                              <ValidationProvider
                                  v-slot="{ errors }"
                                  name="Father Name in Bangla"
                                  rules="required||bangla"
                                  vid="father_name_bn"
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
                                    :error="!!errors[0]"
                                    :error-messages="
                                    errors[0]
                                      ? language === 'bn'
                                        ? 'অনুগ্রহ পূর্বক সম্পূর্ণ বাবার নাম (ইংরেজীতে) প্রদান করুন '
                                        : 'Please enter Father Name (English)'
                                      : ''
                                  "
                                    :hide-details="!errors[0]"
                                    clearable
                                    outlined
                                >
                                </v-text-field>
                              </ValidationProvider>
                            </v-col>
                            <v-col cols="12" lg="6" md="4" sm="6">
                              <ValidationProvider
                                  v-slot="{ errors }"
                                  name="Father Name in English"
                                  rules="required||bangla"
                                  vid="father_name_en"
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
                                    :error="!!errors[0]"
                                    :error-messages="
                                    errors[0]
                                      ? language === 'bn'
                                        ? 'অনুগ্রহ পূর্বক সম্পূর্ণ বাবার নাম (ইংরেজীতে) প্রদান করুন '
                                        : 'Please enter Father Name (English)'
                                      : ''
                                  "
                                    :hide-details="!errors[0]"
                                    clearable
                                    outlined
                                >
                                </v-text-field>
                              </ValidationProvider>
                            </v-col>
                            <v-col cols="12" lg="6" md="4" sm="6">
                              <div class="validation-error-mobile">
                                <ValidationProvider
                                    v-slot="{ errors }"
                                    name="Mother Name in Bangla"
                                    rules="required||bangla"
                                    vid="mother_name_bn"
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
                                      :error="!!errors[0]"
                                      :error-messages="
                                      errors[0]
                                        ? language === 'bn'
                                          ? 'অনুগ্রহ পূর্বক সম্পূর্ণ মায়ের নাম (বাংলায়) প্রদান করুন '
                                          : 'Please enter Mother Name (Bangla)'
                                        : ''
                                    "
                                      :hide-details="!errors[0]"
                                      clearable
                                      outlined
                                  >
                                  </v-text-field>
                                </ValidationProvider>
                              </div>
                            </v-col>
                            <v-col cols="12" lg="6" md="4" sm="6">
                              <div class="validation-error_marital">
                                <ValidationProvider
                                    v-slot="{ errors }"
                                    name="Mother Name in English"
                                    rules="required"
                                    vid="mother_name_en"
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
                                      :error="!!errors[0]"
                                      :error-messages="
                                      errors[0]
                                        ? language === 'bn'
                                          ? 'অনুগ্রহ পূর্বক সম্পূর্ণ মায়ের নাম(ইংরেজীতে) প্রদান করুন '
                                          : 'Please enter Mother Name (English)'
                                        : ''
                                    "
                                      :hide-details="!errors[0]"
                                      clearable
                                      outlined
                                  >
                                  </v-text-field>
                                </ValidationProvider>
                              </div>
                            </v-col>
                            <v-col cols="12" lg="6" md="4" sm="6">
                              <ValidationProvider
                                  v-slot="{ errors }"
                                  name="Mobile Number"
                                  rules="checkNumberMobile||required"
                                  vid="mobile"
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
                                    :error="!!errors[0]"
                                    :error-messages="
                                    errors[0]
                                      ? language === 'bn'
                                        ? 'অনুগ্রহ পূর্বক গ্রহণযোগ্য মোবাইল নাম্বার প্রদান করুন '
                                        : 'Please enter valid Mobile Number'
                                      : ''
                                  "
                                    :hide-details="!errors[0]"
                                    clearable
                                    outlined
                                    type="number"
                                >
                                </v-text-field>
                              </ValidationProvider>
                            </v-col>
                            <v-col cols="12" lg="6" md="4" sm="6">
                              <ValidationProvider
                                  v-slot="{ errors }"
                                  name="Marital Status"
                                  rules="required"
                                  vid="marital_status"
                              >
                                <label>{{
                                    $t(
                                        "container.system_config.allowance_program.marital_status"
                                    )
                                  }}</label>
                                <span style="margin-left: 4px; color: red"
                                >*</span
                                >
                                <v-autocomplete
                                    v-model="data.marital_status"
                                    :error="!!errors[0]"
                                    :error-messages="
                                    errors[0]
                                      ? language === 'bn'
                                        ? 'অনুগ্রহ পূর্বক বৈবাহিক অবস্থা প্রদান করুন '
                                        : 'Please enter Marital Status'
                                      : ''
                                  "
                                    :hide-details="!errors[0]"
                                    :item-text="getItemText"
                                    :items="marital_status"
                                    clearable
                                    item-value="name_en"
                                    outlined
                                >
                                </v-autocomplete>
                              </ValidationProvider>
                            </v-col>
                            <v-col
                                v-if="data.marital_status === 'Married'"
                                cols="12"
                                lg="6"
                                md="4"
                                sm="6"
                            >
                              <ValidationProvider
                                  v-slot="{ errors }"
                                  name="Spouse Name in Bangla"
                                  rules="required"
                                  vid="spouse_name_bn"
                              >
                                <label>{{
                                    $t(
                                        "container.application_selection.application.spouse_name_bn"
                                    )
                                  }}</label>
                                <v-text-field
                                    v-model="data.spouse_name_bn"
                                    :error="!!errors[0]"
                                    :error-messages="
                                    errors[0]
                                      ? language === 'bn'
                                        ? 'অনুগ্রহ পূর্বক সম্পূর্ণ স্বামী বা স্ত্রী(বাংলায়) প্রদান করুন '
                                        : 'Please enter Spouse Name (Bangla)'
                                      : ''
                                  "
                                    :hide-details="!errors[0]"
                                    clearable
                                    outlined
                                >
                                </v-text-field>
                              </ValidationProvider>
                            </v-col>
                            <v-col
                                v-if="data.marital_status === 'Married'"
                                cols="12"
                                lg="6"
                                md="4"
                                sm="6"
                            >
                              <ValidationProvider
                                  v-slot="{ errors }"
                                  name="Spouse Name in English"
                                  vid="spouse_name_en"
                              >
                                <label>{{
                                    $t(
                                        "container.application_selection.application.spouse_name_en"
                                    )
                                  }}</label>
                                <v-text-field
                                    v-model="data.spouse_name_en"
                                    :error="!!errors[0]"
                                    :error-messages="
                                    errors[0]
                                      ? language === 'bn'
                                        ? 'অনুগ্রহ পূর্বক সম্পূর্ণ স্বামী বা স্ত্রী নাম(ইংরেজীতে) প্রদান করুন '
                                        : 'Please enter Spouse Name (English)'
                                      : ''
                                  "
                                    :hide-details="!errors[0]"
                                    clearable
                                    outlined
                                >
                                </v-text-field>
                              </ValidationProvider>
                            </v-col>
                            <v-col cols="12" lg="6" md="4" sm="6">
                              <ValidationProvider
                                  v-slot="{ errors }"
                                  name="Religion"
                                  rules="required"
                                  vid="religion"
                              >
                                <label>{{
                                    $t(
                                        "container.application_selection.application.religion"
                                    )
                                  }}</label>
                                <span style="margin-left: 4px; color: red"
                                >*</span
                                >

                                <v-autocomplete
                                    v-model="data.religion"
                                    :error="!!errors[0]"
                                    :error-messages="
                                    errors[0]
                                      ? language === 'bn'
                                        ? 'অনুগ্রহ পূর্বক ধর্ম প্রদান করুন '
                                        : 'Please enter Religion'
                                      : ''
                                  "
                                    :hide-details="!errors[0]"
                                    :item-text="getItemText"
                                    :items="religion"
                                    item-value="name_en"
                                    outlined
                                >
                                </v-autocomplete>
                              </ValidationProvider>
                            </v-col>
                            <v-col cols="12" lg="6" md="4" sm="6">
                              <div class="validation_error_gender_type">
                                <ValidationProvider
                                    v-slot="{ errors }"
                                    name="Nationality"
                                    readonly
                                    rules="required"
                                    vid="nationality"
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
                                      v-model="data.nationality"
                                      :error="!!errors[0]"
                                      :error-messages="
                                      errors[0]
                                        ? language === 'bn'
                                          ? 'অনুগ্রহ পূর্বক জাতীয়তা প্রদান করুন '
                                          : 'Please enter Nationality'
                                        : ''
                                    "
                                      :hide-details="!errors[0]"
                                      outlined
                                      readonly
                                  >
                                  </v-text-field>
                                </ValidationProvider>
                              </div>
                            </v-col>
                            <v-col cols="12" lg="6" md="4" sm="6">
                              <ValidationProvider
                                  v-slot="{ errors }"
                                  name="Age"
                                  rules="required"
                                  vid="age"
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
                                    :error="!!errors[0]"
                                    :error-messages="
                                    errors[0]
                                      ? language === 'bn'
                                        ? 'অনুগ্রহ পূর্বক বয়স প্রদান করুন '
                                        : 'Please enter Age'
                                      : ''
                                  "
                                    :hide-details="!errors[0]"

                                    outlined
                                    type="number"
                                >
                                </v-text-field>
                              </ValidationProvider>
                            </v-col>
                            <v-col cols="12" lg="6" md="4" sm="6">
                              <ValidationProvider
                                  v-slot="{ errors }"
                                  name="Gender"
                                  rules="required"
                                  vid="gender"
                              >
                                <label>{{
                                    $t(
                                        "container.system_config.allowance_program.gender"
                                    )
                                  }}</label>
                                <span style="margin-left: 4px; color: red"
                                >*</span
                                >
                                <v-autocomplete
                                    v-model="data.gender_id"
                                    :error="!!errors[0]"
                                    :error-messages="
                                    errors[0]
                                      ? language === 'bn'
                                        ? 'অনুগ্রহ পূর্বক লিঙ্গ প্রদান করুন '
                                        : 'Please enter Gender'
                                      : ''
                                  "
                                    :hide-details="!errors[0]"
                                    :item-text="getItemValue"
                                    :items="genders"
                                    item-value="id"
                                    outlined
                                >
                                </v-autocomplete>
                              </ValidationProvider>
                            </v-col>
                            <v-col cols="12" lg="6" md="4" sm="6">
                              <ValidationProvider
                                  v-slot="{ errors }"
                                  name="Education Status"
                                  rules="required"
                                  vid="education_status"
                              >
                                <label>{{
                                    $t(
                                        "container.application_selection.application.education_status"
                                    )
                                  }}</label>
                                <span style="margin-left: 4px; color: red"
                                >*</span
                                >
                                <v-autocomplete
                                    v-model="data.education_status"
                                    :error="!!errors[0]"
                                    :error-messages="
                                    errors[0]
                                      ? language === 'bn'
                                        ? 'অনুগ্রহ পূর্বক শিক্ষাগত অবস্থা প্রদান করুন '
                                        : 'Please enter Educational Status'
                                      : ''
                                  "
                                    :hide-details="!errors[0]"
                                    :item-text="getItemText"
                                    :items="education_status"
                                    item-value="name_en"
                                    outlined
                                >
                                </v-autocomplete>
                              </ValidationProvider>
                            </v-col>
                            <v-col cols="12" lg="6" md="4" sm="6">
                              <ValidationProvider
                                  v-slot="{ errors }"
                                  name="Profession"
                                  rules="required"
                                  vid="profession"
                              >
                                <label>{{
                                    $t(
                                        "container.application_selection.application.profession"
                                    )
                                  }}</label>
                                <span style="margin-left: 4px; color: red"
                                >*</span
                                >
                                <v-autocomplete
                                    v-model="data.profession"
                                    :error="!!errors[0]"
                                    :error-messages="
                                    errors[0]
                                      ? language === 'bn'
                                        ? 'অনুগ্রহ পূর্বক পেশা প্রদান করুন '
                                        : 'Please enter Profession'
                                      : ''
                                  "
                                    :hide-details="!errors[0]"
                                    :item-text="getItemText"
                                    :items="professionType"
                                    clearable
                                    item-value="name_en"
                                    outlined
                                >
                                </v-autocomplete>
                              </ValidationProvider>
                            </v-col>
                            <v-col cols="12" lg="6" md="4" sm="6">
                              <ValidationProvider
                                  v-slot="{ errors }"
                                  name="Identification Mark"
                                  vid="identification_mark"
                              >
                                <label>{{
                                    $t(
                                        "container.application_selection.application.identification_mark"
                                    )
                                  }}</label>
                                <v-text-field
                                    v-model="data.identification_mark"
                                    :error="!!errors[0]"
                                    :error-messages="errors[0]"
                                    :hide-details="!errors[0]"
                                    clearable
                                    outlined
                                >
                                </v-text-field>
                              </ValidationProvider>
                            </v-col>
                          </v-row>
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                      <!-- Contact Information  -->
                      <v-expansion-panel v-if="isVerified" class="mt-4">
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
                            <v-col class="text-center" cols="12">
                              <v-chip
                                  class="text-uppercase"
                                  color="primary"
                                  label
                              >{{
                                  $t(
                                      "container.application_selection.application.present_address"
                                  )
                                }}
                              </v-chip>
                            </v-col>
                            <!-- location panel -->
                            <!-- Division List -->
                            <v-col cols="12" lg="6" md="6">
                              <ValidationProvider
                                  v-slot="{ errors }"
                                  name="Division"
                                  rules="required"
                                  vid="division"
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
                                    v-model="data.division_id"
                                    :error="!!errors[0]"
                                    :error-messages="
                                    errors[0]
                                      ? language === 'bn'
                                        ? 'অনুগ্রহ করে বিভাগের নাম নির্বাচন করুন'
                                        : 'Please select the division name'
                                      : ''
                                  "
                                    :hide-details="!errors[0]"
                                    :items="divisions"
                                    clearable
                                    item-text="name_en"
                                    item-value="id"
                                    outlined
                                    required
                                    @change="getDistrictList"
                                ></v-autocomplete>
                              </ValidationProvider>
                            </v-col>
                            <!--District List-->
                            <v-col cols="12" lg="6" md="6">
                              <ValidationProvider
                                  v-slot="{ errors }"
                                  name="District"
                                  rules="required"
                                  vid="district"
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
                                    v-model="data.district_id"
                                    :error="!!errors[0]"
                                    :error-messages="
                                    errors[0]
                                      ? language === 'bn'
                                        ? 'অনুগ্রহ করে জেলার নাম নির্বাচন করুন'
                                        : 'Please select the district name'
                                      : ''
                                  "
                                    :hide-details="!errors[0]"
                                    :items="districts"
                                    clearable
                                    item-text="name_en"
                                    item-value="id"
                                    outlined
                                    required
                                    @input="getThanaList"
                                ></v-autocomplete>
                              </ValidationProvider>
                            </v-col>
                            <!--Location Type List-->
                            <v-col cols="12" lg="6" md="6">
                              <ValidationProvider
                                  v-slot="{ errors }"
                                  name="Location Type"
                                  rules="required"
                                  vid="location_type"
                              >
                                <label style="display: inline-block"
                                >{{ $t("container.list.location_type") }}
                                </label>
                                <span style="margin-left: 4px; color: red"
                                >*</span
                                >
                                <v-autocomplete
                                    v-model="data.location_type"
                                    :error="!!errors[0]"
                                    :error-messages="
                                    errors[0]
                                      ? language === 'bn'
                                        ? 'অবস্থানের ধরন নির্বাচন করুন'
                                        : 'Please select the location type'
                                      : ''
                                  "
                                    :hide-details="!errors[0]"
                                    :items="locationType"
                                    clearable
                                    item-text="value_en"
                                    item-value="id"
                                    outlined
                                    required
                                    @input="LocationType($event)"
                                ></v-autocomplete>
                              </ValidationProvider>
                            </v-col>
                            <!--Upazila List-->
                            <v-col
                                v-if="data.location_type === 2"
                                cols="12"
                                lg="6"
                                md="6"
                            >
                              <ValidationProvider
                                  v-slot="{ errors }"
                                  name="Upazila"
                                  rules="required"
                                  vid="thana_id"
                              >
                                <label style="display: inline-block"
                                >{{
                                    $t(
                                        "container.system_config.demo_graphic.ward.upazila"
                                    )
                                  }}
                                </label>
                                <span style="margin-left: 4px; color: red"
                                >*</span
                                >
                                <v-autocomplete
                                    v-model="data.thana_id"
                                    :error="!!errors[0]"
                                    :error-messages="
                                    errors[0]
                                      ? language === 'bn'
                                        ? 'অনুগ্রহ করে উপজেলার নাম নির্বাচন করুন'
                                        : 'Please select the upazila name'
                                      : ''
                                  "
                                    :hide-details="!errors[0]"
                                    :items="thanas"
                                    clearable
                                    item-text="name_en"
                                    item-value="id"
                                    outlined
                                    required
                                    @change="getUnionList"
                                ></v-autocomplete>
                              </ValidationProvider>
                            </v-col>
                            <!--Sub Location List-->
                            <v-col
                                v-if="data.location_type === 2"
                                cols="6"
                                lg="6"
                                md="6"
                            >
                              <label style="display: inline-block"
                              >{{
                                  $t(
                                      "container.system_config.demo_graphic.ward.subLocation_type"
                                  )
                                }}
                              </label>
                              <span style="margin-left: 4px; color: red">*</span>
                              <ValidationProvider
                                  v-slot="{ errors }"
                                  name="Sub Location"
                                  rules="required"
                                  vid="subLocationType"
                              >
                                <v-autocomplete
                                    v-model="data.sub_location_type"
                                    :error="!!errors[0]"
                                    :error-messages="
                                errors[0]
                                  ? language === 'bn'
                                    ? 'অনুগ্রহ পূর্বক সাব লোকেশন প্রদান করুন '
                                    : 'Please enter Sub Location'
                                  : ''
                              "
                                    :hide-details="!errors[0]"
                                    :item-text="getItemValue"
                                    :items="subLocationType"
                                    class="no-arrow-icon"
                                    item-value="id"
                                    outlined
                                    @input="SubLocationType($event)"
                                ></v-autocomplete>
                              </ValidationProvider>
                            </v-col>
                            <!--Upazila Union List-->
                            <v-col
                                v-if="data.location_type === 2 && data.sub_location_type === 2"

                                cols="12"
                                lg="6"
                                md="6"
                            >
                              <ValidationProvider
                                  v-slot="{ errors }"
                                  name="union"
                                  rules="required"
                                  vid="union_id"
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
                                    v-model="data.union_id"
                                    :error="!!errors[0]"
                                    :error-messages="
                                    errors[0]
                                      ? language === 'bn'
                                        ? 'অনুগ্রহ করে ইউনিয়নের নাম নির্বাচন করুন'
                                        : 'Please select the union name'
                                      : ''
                                  "
                                    :hide-details="!errors[0]"
                                    :items="unions"
                                    clearable
                                    item-text="name_en"
                                    item-value="id"
                                    outlined
                                    required
                                    @input="onChangeUnion($event)"
                                ></v-autocomplete>
                              </ValidationProvider>
                            </v-col>
                            <!--Upazila union ward List-->
                            <v-col
                                v-if="
                            data.location_type === 2 &&
                            data.sub_location_type === 2
                          "
                                cols="6"
                                lg="6"
                                md="6"
                            >
                              <ValidationProvider
                                  v-slot="{ errors }"
                                  name="Ward"
                                  rules="required"
                                  vid="ward_id_union"
                              >
                                <label style="display: inline-block"
                                >{{
                                    $t(
                                        "container.system_config.demo_graphic.ward.ward"
                                    )
                                  }}
                                </label>
                                <span style="margin-left: 4px; color: red">*</span>
                                <v-autocomplete
                                    v-model="data.ward_id_union"
                                    :error="!!errors[0]"
                                    :error-messages="
                                errors[0]
                                  ? language === 'bn'
                                    ? 'অনুগ্রহ পূর্বক ওয়ার্ড প্রদান করুন '
                                    : 'Please enter Ward'
                                  : ''
                              "
                                    :hide-details="!errors[0]"
                                    :item-text="getItemText"
                                    :items="wards_upazila_union"
                                    item-value="id"
                                    outlined
                                ></v-autocomplete>
                              </ValidationProvider>
                            </v-col>
                            <!--Upazila Paurashava List-->
                            <v-col
                                v-if="
                            data.location_type === 2 &&
                            data.sub_location_type === 1
                          "
                                cols="6"
                            >
                              <ValidationProvider
                                  v-slot="{ errors }"
                                  name="Pouroshava"
                                  rules="required"
                                  vid="pouro_id"
                              >
                                <label style="display: inline-block"
                                >{{
                                    $t(
                                        "container.system_config.demo_graphic.ward.pouro"
                                    )
                                  }}
                                </label>
                                <span style="margin-left: 4px; color: red">*</span>
                                <v-autocomplete
                                    v-model="data.pouro_id"
                                    :error="!!errors[0]"
                                    :error-messages="
                                errors[0]
                                  ? language === 'bn'
                                    ? 'অনুগ্রহ পূর্বক পৌরসভা প্রদান করুন '
                                    : 'Please enter Pourashava'
                                  : ''
                              "
                                    :hide-details="!errors[0]"
                                    :item-text="getItemText"
                                    :items="pouros"
                                    item-value="id"
                                    outlined
                                    @input="onChangePouro($event)"
                                ></v-autocomplete>
                              </ValidationProvider>
                            </v-col>
                            <!--Upazila Paurashava Ward List-->
                            <v-col
                                v-if="
                            data.location_type === 2 &&
                            data.sub_location_type === 1 && data.pouro_id
                          "
                                cols="6"
                                lg="6"
                                md="6"
                            >
                              <ValidationProvider
                                  v-slot="{ errors }"
                                  name="Ward"
                                  rules="required"
                                  vid="ward_id_union"
                              >
                                <label style="display: inline-block">Ward </label>
                                <span style="margin-left: 4px; color: red">*</span>
                                <v-autocomplete
                                    v-model="data.ward_id_pouro"
                                    :error="!!errors[0]"
                                    :error-messages="
                                errors[0]
                                  ? language === 'bn'
                                    ? 'অনুগ্রহ পূর্বক ওয়ার্ড প্রদান করুন '
                                    : 'Please enter Ward'
                                  : ''
                              "
                                    :hide-details="!errors[0]"
                                    :item-text="getItemText"
                                    :items="wards_upazila_pouro"
                                    item-value="id"
                                    outlined
                                ></v-autocomplete>
                              </ValidationProvider>
                            </v-col>
                            <!--City Corporation List-->
                            <v-col
                                v-if="data.location_type === 3"
                                cols="12"
                                lg="6"
                                md="6"
                            >
                              <ValidationProvider
                                  v-slot="{ errors }"
                                  name="city corporation"
                                  rules="required"
                                  vid="city_id"
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
                                    v-model="data.city_id"
                                    :error="!!errors[0]"
                                    :error-messages="
                                    errors[0]
                                      ? language === 'bn'
                                        ? 'অনুগ্রহ করে সিটি কর্পোরেশনের নাম নির্বাচন করুন'
                                        : 'Please select the city corporation Name'
                                      : ''
                                  "
                                    :hide-details="!errors[0]"
                                    :items="cities"
                                    clearable
                                    item-text="name_en"
                                    item-value="id"
                                    outlined
                                    required
                                    @change="getCityThanaList"
                                ></v-autocomplete>
                              </ValidationProvider>
                            </v-col>
                            <!--City Thana List-->
                            <v-col
                                v-if="data.location_type === 3"
                                cols="12"
                                lg="6"
                                md="6"
                            >
                              <ValidationProvider
                                  v-slot="{ errors }"
                                  name="thana"
                                  rules="required"
                                  vid="city_thana_id"
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
                                    v-model="data.city_thana_id"
                                    :error="!!errors[0]"
                                    :error-messages="
                                    errors[0]
                                      ? language === 'bn'
                                        ? 'অনুগ্রহ করে থানার নাম নির্বাচন করুন'
                                        : 'Please select the thana Name'
                                      : ''
                                  "
                                    :hide-details="!errors[0]"
                                    :items="city_thanas"
                                    clearable
                                    item-text="name_en"
                                    item-value="id"
                                    outlined
                                    required
                                    @input="OnChangeCityThana($event)"
                                ></v-autocomplete>
                              </ValidationProvider>
                            </v-col>
                            <!--City Thana Ward List-->
                            <v-col
                                v-if="data.location_type === 3 && this.data.city_thana_id"
                                cols="6"
                                lg="6"
                                md="6"
                            >
                              <ValidationProvider
                                  v-slot="{ errors }"
                                  name="Ward"
                                  rules="required"
                                  vid="ward_id_city"
                              >
                                <label style="display: inline-block"
                                >{{
                                    $t(
                                        "container.system_config.demo_graphic.ward.ward"
                                    )
                                  }}
                                </label>
                                <span style="margin-left: 4px; color: red">*</span>
                                <v-autocomplete
                                    v-model="data.ward_id_city"
                                    :error="!!errors[0]"
                                    :error-messages="
                                errors[0]
                                  ? language === 'bn'
                                    ? 'অনুগ্রহ পূর্বক ওয়ার্ড প্রদান করুন '
                                    : 'Please enter Ward'
                                  : ''
                              "
                                    :hide-details="!errors[0]"
                                    :item-text="getItemText"
                                    :items="wards_city"
                                    item-value="id"
                                    outlined
                                ></v-autocomplete>
                              </ValidationProvider>
                            </v-col>
                            <!--District Paurashova List-->
                            <v-col
                                v-if="data.location_type === 1"
                                cols="12"
                                lg="6"
                                md="6"
                            >
                              <ValidationProvider
                                  v-slot="{ errors }"
                                  name="District Pourashava"
                                  rules="required"
                                  vid="district_pouro_id"
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
                                    v-model="data.district_pouro_id"
                                    :error="!!errors[0]"
                                    :error-messages="
                                    errors[0]
                                      ? language === 'bn'
                                        ? 'অনুগ্রহ করে জেলার পৌরশব নাম নির্বাচন করুন'
                                        : 'Please select the district Paurashava Name'
                                      : ''
                                  "
                                    :hide-details="!errors[0]"
                                    :items="district_poros"
                                    clearable
                                    item-text="name_en"
                                    item-value="id"
                                    outlined
                                    required
                                    @input="onChangeDistrictPouro"
                                ></v-autocomplete>
                              </ValidationProvider>
                            </v-col>
                            <!--District Pourashava Ward list-->
                            <v-col
                                v-if="data.location_type === 1 && this.data.district_pouro_id"
                                cols="6"
                                lg="6"
                                md="6"
                            >
                              <ValidationProvider
                                  v-slot="{ errors }"
                                  name="Ward"
                                  rules="required"
                                  vid="ward_id_dist"
                              >
                                <label style="display: inline-block"
                                >{{
                                    $t(
                                        "container.system_config.demo_graphic.ward.ward"
                                    )
                                  }}
                                </label>
                                <span style="margin-left: 4px; color: red">*</span>
                                <v-autocomplete
                                    v-model="data.ward_id_dist"
                                    :error="!!errors[0]"
                                    :error-messages="
                                errors[0]
                                  ? language === 'bn'
                                    ? 'অনুগ্রহ পূর্বক ওয়ার্ড প্রদান করুন '
                                    : 'Please enter Ward'
                                  : ''
                              "
                                    :hide-details="!errors[0]"
                                    :item-text="getItemText"
                                    :items="wards_dist"
                                    item-value="id"
                                    outlined
                                >
                                </v-autocomplete>
                              </ValidationProvider>
                            </v-col>
                            <!-- Post code-->
                            <v-col cols="12" lg="6" md="6">
                              <ValidationProvider
                                  v-slot="{ errors }"
                                  name="Post Code"
                                  rules="CheckPost||required"
                                  vid="post_code"
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
                                    :error="!!errors[0]"
                                    :error-messages="
                                    errors[0]
                                      ? language === 'bn'
                                        ? 'অনুগ্রহ পূর্বক গ্রহণযোগ্য পোস্ট কোড প্রদান করুন'
                                        : 'Please enter valid Post Code'
                                      : ''
                                  "
                                    :hide-details="!errors[0]"
                                    clearable
                                    outlined
                                    type="number"
                                >
                                </v-text-field>
                              </ValidationProvider>
                            </v-col>
                            <!-- Address-->
                            <v-col cols="12" lg="6" md="6">
                              <ValidationProvider
                                  v-slot="{ errors }"
                                  name="Village/House No.,
                                                        Road No., Block No, Section"
                                  rules="required"
                                  vid="address"
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
                                    :error="!!errors[0]"
                                    :error-messages="
                                    errors[0]
                                      ? language === 'bn'
                                        ? 'অনুগ্রহ পূর্বক গ্রাম/বাড়ি নং, রোড নং, ব্লক নং, সেকশন প্রদান করুন'
                                        : 'Please enter Village/House No., Road No., Block No, Section'
                                      : ''
                                  "
                                    :hide-details="!errors[0]"
                                    clearable
                                    handleCheckboxChangsa
                                    outlined
                                >
                                </v-text-field>
                              </ValidationProvider>
                            </v-col>
                          </v-row>
                          <!-- Permanent Address Section -->
                          <v-row>
                            <v-col class="text-center" cols="12">
                              <v-chip
                                  class="text-uppercase"
                                  color="primary"
                                  label
                              >{{
                                  $t(
                                      "container.application_selection.application.permanent_address"
                                  )
                                }}
                              </v-chip>
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
                            <!--Permanent Division List-->
                            <v-col cols="12" lg="6" md="6">
                              <ValidationProvider
                                  v-slot="{ errors }"
                                  name="Permanent Division"
                                  rules="required"
                                  vid="division"
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
                                    v-model="data.permanent_division_id"
                                    :error="!!errors[0]"
                                    :error-messages="
                                    errors[0]
                                      ? language === 'bn'
                                        ? 'অনুগ্রহ করে বিভাগের নাম নির্বাচন করুন'
                                        : 'Please select the division name'
                                      : ''
                                  "
                                    :hide-details="!errors[0]"
                                    :items="permanent_divisions"
                                    clearable
                                    item-text="name_en"
                                    item-value="id"
                                    outlined
                                    required
                                    @change="getPermanentDistrictList"
                                ></v-autocomplete>
                              </ValidationProvider>
                            </v-col>
                            <!--Permanent District List-->
                            <v-col cols="12" lg="6" md="6">
                              <ValidationProvider
                                  v-slot="{ errors }"
                                  name="Permanent District"
                                  rules="required"
                                  vid="permanent_district"
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
                                    v-model="data.permanent_district_id"
                                    :error="!!errors[0]"
                                    :error-messages="
                                    errors[0]
                                      ? language === 'bn'
                                        ? 'অনুগ্রহ করে জেলার নাম নির্বাচন করুন'
                                        : 'Please select the district name'
                                      : ''
                                  "
                                    :hide-details="!errors[0]"
                                    :items="permanent_districts"
                                    clearable
                                    item-text="name_en"
                                    item-value="id"
                                    outlined
                                    required
                                    @input="getPermanentThanaList"
                                ></v-autocomplete>
                              </ValidationProvider>
                            </v-col>
                            <!--Location Type List-->
                            <v-col cols="12" lg="6" md="6">
                              <ValidationProvider
                                  v-slot="{ errors }"
                                  name="Permanent Location Type"
                                  rules="required"
                                  vid="permanent_location_type"
                              >
                                <label style="display: inline-block"
                                >{{ $t("container.list.location_type") }}
                                </label>
                                <span style="margin-left: 4px; color: red"
                                >*</span
                                >
                                <v-autocomplete
                                    v-model="data.permanent_location_type"
                                    :error="!!errors[0]"
                                    :error-messages="
                                    errors[0]
                                      ? language === 'bn'
                                        ? 'অবস্থানের ধরন নির্বাচন করুন'
                                        : 'Please select the location type'
                                      : ''
                                  "
                                    :hide-details="!errors[0]"
                                    :items="locationType"
                                    clearable
                                    item-text="value_en"
                                    item-value="id"
                                    outlined
                                    required
                                    @input="permanent_locationType($event)"
                                ></v-autocomplete>
                              </ValidationProvider>
                            </v-col>
                            <!--Permanent Upazila List-->
                            <v-col
                                v-if="data.permanent_location_type === 2"
                                cols="12"
                                lg="6"
                                md="6"
                            >
                              <ValidationProvider
                                  v-slot="{ errors }"
                                  name="Permanent Upazila"
                                  rules="required"
                                  vid="permamnet_thana_id"
                              >
                                <label style="display: inline-block"
                                >{{
                                    $t(
                                        "container.system_config.demo_graphic.ward.upazila"
                                    )
                                  }}
                                </label>
                                <span style="margin-left: 4px; color: red"
                                >*</span
                                >
                                <v-autocomplete
                                    v-model="data.permanent_thana_id"
                                    :error="!!errors[0]"
                                    :error-messages="
                                    errors[0]
                                      ? language === 'bn'
                                        ? 'অনুগ্রহ করে উপজেলার নাম নির্বাচন করুন'
                                        : 'Please select the upazila name'
                                      : ''
                                  "
                                    :hide-details="!errors[0]"
                                    :items="permanent_thanas"
                                    clearable
                                    item-text="name_en"
                                    item-value="id"
                                    outlined
                                    required
                                    @change="getPermanentUnionList"
                                ></v-autocomplete>
                              </ValidationProvider>
                            </v-col>
                            <!--Permanent Sub Location Type List-->
                            <v-col
                                v-if="data.permanent_location_type === 2"
                                cols="6"
                            >
                              <label style="display: inline-block">
                                {{
                                  $t(
                                      "container.system_config.demo_graphic.ward.subLocation_type"
                                  )
                                }}
                              </label>
                              <span style="margin-left: 4px; color: red">*</span>
                              <ValidationProvider
                                  v-slot="{ errors }"
                                  name="Permanent Sub Location"
                                  rules="required"
                                  vid="permanent_sub_location_type"
                              >
                                <v-autocomplete
                                    v-model="data.permanent_sub_location_type"
                                    :error="!!errors[0]"
                                    :error-messages="
                                errors[0]
                                  ? language === 'bn'
                                    ? 'অনুগ্রহ পূর্বক সাব লোকেশন প্রদান করুন '
                                    : 'Please enter Sub Location'
                                  : ''
                              "
                                    :hide-details="!errors[0]"
                                    :item-text="getItemValue"
                                    :items="subLocationType"
                                    class="no-arrow-icon"
                                    item-value="id"
                                    outlined
                                    @input="permanentSubLocationType($event)"
                                ></v-autocomplete>
                              </ValidationProvider>
                            </v-col>
                            <!--Permanent Upazila paurashava list-->
                            <v-col
                                v-if="
                            data.permanent_location_type === 2 &&
                            data.permanent_sub_location_type === 1
                          "
                                cols="12"
                                lg="6"
                                md="6"
                            >
                              <ValidationProvider
                                  v-slot="{ errors }"
                                  name="Pouroshava"
                                  rules="required"
                                  vid="permanent_pouro_id"
                              >
                                <label style="display: inline-block"
                                >{{
                                    $t(
                                        "container.system_config.demo_graphic.ward.pouro"
                                    )
                                  }}
                                </label>
                                <span style="margin-left: 4px; color: red">*</span>
                                <v-autocomplete
                                    v-model="data.permanent_pouro_id"
                                    :error="!!errors[0]"
                                    :error-messages="
                                errors[0]
                                  ? language === 'bn'
                                    ? 'অনুগ্রহ পূর্বক পৌরসভা প্রদান করুন '
                                    : 'Please enter Pourashava'
                                  : ''
                              "
                                    :hide-details="!errors[0]"
                                    :items="permanent_pouros"
                                    item-text="name_en"
                                    item-value="id"
                                    outlined
                                    @input="Permanent_onChangePouro($event)"
                                ></v-autocomplete>
                              </ValidationProvider>
                            </v-col>
                            <!--Permanent upazila pauroshava ward list-->
                            <v-col
                                v-if="
                            data.permanent_location_type === 2 &&
                            data.permanent_sub_location_type === 1
                          "
                                cols="12"
                                lg="6"
                                md="6"
                            >
                              <ValidationProvider
                                  v-slot="{ errors }"
                                  name="Ward"
                                  rules="required"
                                  vid="permanent_ward_id_upazila"
                              >
                                <label style="display: inline-block"
                                >{{
                                    $t(
                                        "container.system_config.demo_graphic.ward.ward"
                                    )
                                  }}
                                </label>
                                <span style="margin-left: 4px; color: red">*</span>
                                <v-autocomplete
                                    v-model="data.permanent_ward_id_pouro"
                                    :error="!!errors[0]"
                                    :error-messages="
                                errors[0]
                                  ? language === 'bn'
                                    ? 'অনুগ্রহ পূর্বক ওয়ার্ড প্রদান করুন '
                                    : 'Please enter Ward'
                                  : ''
                              "
                                    :hide-details="!errors[0]"
                                    :item-text="getItemText"
                                    :items="permanent_wards_upazila_pouro"
                                    item-value="id"
                                    outlined
                                ></v-autocomplete>
                              </ValidationProvider>
                            </v-col>
                            <!--Permanent Upazila Union List-->
                            <v-col
                                v-if="data.permanent_location_type === 2 &&
                                      data.permanent_sub_location_type === 2"
                                cols="12"
                                lg="6"
                                md="6"
                            >
                              <ValidationProvider
                                  v-slot="{ errors }"
                                  name="Permanent Union"
                                  rules="required"
                                  vid="permanent_union_id"
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
                                    v-model="data.permanent_union_id"
                                    :error="!!errors[0]"
                                    :error-messages="
                                    errors[0]
                                      ? language === 'bn'
                                        ? 'অনুগ্রহ করে ইউনিয়নের নাম নির্বাচন করুন'
                                        : 'Please select the union name'
                                      : ''
                                  "
                                    :hide-details="!errors[0]"
                                    :items="permanent_unions"
                                    clearable
                                    item-text="name_en"
                                    item-value="id"
                                    outlined
                                    required
                                    @input="permanent_onChangeUnion($event)"
                                ></v-autocomplete>
                              </ValidationProvider>
                            </v-col>
                            <!--Permanent Upazila Union Ward List-->
                            <v-col
                                v-if="
                            data.permanent_location_type === 2 &&
                            data.permanent_sub_location_type === 2
                          "
                                cols="12"
                                lg="6"
                                md="6"
                            >
                              <ValidationProvider
                                  v-slot="{ errors }"
                                  name="Ward"
                                  rules="required"
                                  vid="permanent_ward_id_upazila"
                              >
                                <label style="display: inline-block"
                                >{{
                                    $t(
                                        "container.system_config.demo_graphic.ward.ward"
                                    )
                                  }}
                                </label>
                                <span style="margin-left: 4px; color: red">*</span>
                                <v-autocomplete
                                    v-model="data.permanent_ward_id_union"
                                    :error="!!errors[0]"
                                    :error-messages="
                                errors[0]
                                  ? language === 'bn'
                                    ? 'অনুগ্রহ পূর্বক ওয়ার্ড প্রদান করুন '
                                    : 'Please enter Ward'
                                  : ''
                              "
                                    :hide-details="!errors[0]"
                                    :item-text="getItemText"
                                    :items="permanent_wards_upazila_union"
                                    item-value="id"
                                    outlined
                                ></v-autocomplete>
                              </ValidationProvider>
                            </v-col>
                            <!--Permanent City Corporation List-->
                            <v-col
                                v-if="data.permanent_location_type === 3 "
                                cols="12"
                                lg="6"
                                md="6"
                            >
                              <ValidationProvider
                                  v-slot="{ errors }"
                                  name="city corporation"
                                  rules="required"
                                  vid="city_id"
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
                                    v-model="data.permanent_city_id"
                                    :error="!!errors[0]"
                                    :error-messages="
                                    errors[0]
                                      ? language === 'bn'
                                        ? 'অনুগ্রহ করে সিটি কর্পোরেশনের নাম নির্বাচন করুন'
                                        : 'Please select the city corporation Name'
                                      : ''
                                  "
                                    :hide-details="!errors[0]"
                                    :items="permanent_cities"
                                    clearable
                                    item-text="name_en"
                                    item-value="id"
                                    outlined
                                    required
                                    @change="getPermanentCityThanaList"
                                ></v-autocomplete>
                              </ValidationProvider>
                            </v-col>
                            <!--Permanent City Thana List-->
                            <v-col
                                v-if="data.permanent_location_type === 3"
                                cols="12"
                                lg="6"
                                md="6"
                            >
                              <ValidationProvider
                                  v-slot="{ errors }"
                                  name="thana"
                                  rules="required"
                                  vid="city_thana_id"
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
                                    v-model="data.permanent_city_thana_id"
                                    :error="!!errors[0]"
                                    :error-messages="
                                    errors[0]
                                      ? language === 'bn'
                                        ? 'অনুগ্রহ করে থানার নাম নির্বাচন করুন'
                                        : 'Please select the thana Name'
                                      : ''
                                  "
                                    :hide-details="!errors[0]"
                                    :items="permanent_city_thanas"
                                    clearable
                                    item-text="name_en"
                                    item-value="id"
                                    outlined
                                    required
                                    @input="Permanent_OnChangeCityThana($event)"
                                ></v-autocomplete>
                              </ValidationProvider>
                            </v-col>
                            <!--Permanent City thana ward list-->
                            <v-col
                                v-if="data.permanent_location_type === 3"
                                cols="12"
                                lg="6"
                                md="6"
                            >
                              <ValidationProvider
                                  v-slot="{ errors }"
                                  name="Ward"
                                  rules="required"
                                  vid="permanent_ward_id_city"
                              >
                                <label style="display: inline-block">Ward </label>
                                <span style="margin-left: 4px; color: red">*</span>
                                <v-autocomplete
                                    v-model="data.permanent_ward_id_city"
                                    :error="!!errors[0]"
                                    :error-messages="
                                errors[0]
                                  ? language === 'bn'
                                    ? 'অনুগ্রহ পূর্বক ওয়ার্ড প্রদান করুন '
                                    : 'Please enter Ward'
                                  : ''
                              "
                                    :hide-details="!errors[0]"
                                    :item-text="getItemText"
                                    :items="permanent_wards_city"
                                    item-value="id"
                                    outlined
                                ></v-autocomplete>
                              </ValidationProvider>
                            </v-col>
                            <!--Permanent District paurashava list-->
                            <v-col
                                v-if="data.permanent_location_type === 1"
                                cols="12"
                                lg="6"
                                md="6"
                            >
                              <ValidationProvider
                                  v-slot="{ errors }"
                                  name="District Pourashava"
                                  rules="required"
                                  vid="district_pouro_id"
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
                                    v-model="data.permanent_district_pouro_id"
                                    :error="!!errors[0]"
                                    :error-messages="
                                    errors[0]
                                      ? language === 'bn'
                                        ? 'অনুগ্রহ করে জেলার পৌরশব নাম নির্বাচন করুন'
                                        : 'Please select the district Paurashava Name'
                                      : ''
                                  "
                                    :hide-details="!errors[0]"
                                    :items="permanent_district_poros"
                                    clearable
                                    item-text="name_en"
                                    item-value="id"
                                    outlined
                                    required
                                    @input="Permanent_onChangeDistrictPouro"
                                ></v-autocomplete>
                              </ValidationProvider>
                            </v-col>
                            <!--Permanent District paurashava ward list-->
                            <v-col
                                v-if="data.permanent_location_type === 1"
                                cols="12"
                                lg="6"
                                md="6"
                            >
                              <ValidationProvider
                                  v-slot="{ errors }"
                                  name="Ward"
                                  rules="required"
                                  vid="permanent_ward_id_dist"
                              >
                                <label style="display: inline-block"
                                >{{
                                    $t(
                                        "container.system_config.demo_graphic.ward.ward"
                                    )
                                  }}
                                </label>
                                <span style="margin-left: 4px; color: red">*</span>
                                <v-autocomplete
                                    v-model="data.permanent_ward_id_dist"
                                    :error="!!errors[0]"
                                    :error-messages="
                                errors[0]
                                  ? language === 'bn'
                                    ? 'অনুগ্রহ পূর্বক ওয়ার্ড প্রদান করুন '
                                    : 'Please enter Ward'
                                  : ''
                              "
                                    :hide-details="!errors[0]"
                                    :item-text="getItemText"
                                    :items="permanent_wards_dist"
                                    item-value="id"
                                    outlined
                                ></v-autocomplete>
                              </ValidationProvider>
                            </v-col>
                            <!-- Permanent Post code-->
                            <v-col cols="12" lg="6" md="4" sm="6">
                              <ValidationProvider
                                  v-slot="{ errors }"
                                  name="Post Code"
                                  rules="CheckPost||required"
                                  type="number"
                                  vid="permanent_post_code"
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
                                    v-model="data.permanent_post_code"
                                    :error="!!errors[0]"
                                    :error-messages="
                                    errors[0]
                                      ? language === 'bn'
                                        ? 'অনুগ্রহ পূর্বক গ্রহণযোগ্য পোস্ট কোড প্রদান করুন'
                                        : 'Please enter valid Post Code'
                                      : ''
                                  "
                                    :hide-details="!errors[0]"
                                    clearable
                                    outlined
                                >
                                </v-text-field>
                              </ValidationProvider>
                            </v-col>
                            <!-- Permanent Address code-->
                            <v-col cols="12" lg="6" md="4" sm="6">
                              <ValidationProvider
                                  v-slot="{ errors }"
                                  name="Village/House No.,
                                                Road No., Block No, Section"
                                  rules="required"
                                  vid="permanent_address"
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
                                    v-model="data.permanent_address"
                                    :error="!!errors[0]"
                                    :error-messages="
                                    errors[0]
                                      ? language === 'bn'
                                        ? 'অনুগ্রহ পূর্বক গ্রাম/বাড়ি নং, রোড নং, ব্লক নং, সেকশন প্রদান করুন'
                                        : 'Please enter Village/House No., Road No., Block No, Section'
                                      : ''
                                  "
                                    :hide-details="!errors[0]"
                                    clearable
                                    outlined
                                >
                                </v-text-field>
                              </ValidationProvider>
                            </v-col>
                          </v-row>
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                      <!-- Bank/MFS Information -->
                      <v-expansion-panel v-if="isVerified" class="mt-4">
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
                            <v-col cols="12" lg="6" md="4" sm="6">
                              <ValidationProvider
                                  v-slot="{ errors }"
                                  :vid="'account_name'"
                                  name="Account Name"
                                  rules="required"
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
                                    :error="!!errors[0]"
                                    :error-messages="errors[0]"
                                    :hide-details="!errors[0]"
                                    clearable

                                    outlined
                                >
                                </v-text-field>
                              </ValidationProvider>
                            </v-col>
                            <v-col cols="12" lg="6" md="4" sm="6">
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

                                ></v-radio>
                              </v-radio-group>
                            </v-col>
                            <v-col
                                v-if="data.account_type === 2"
                                cols="12"
                                lg="6"
                                md="4"
                                sm="6"
                            >
                              <ValidationProvider
                                  v-slot="{ errors }"
                                  name="Mobile Number Ownership"
                                  rules="required"
                                  vid="account_owner"
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
                                <v-autocomplete
                                    v-model="data.account_owner"
                                    :error="!!errors[0]"
                                    :error-messages="
                                    errors[0]
                                      ? language === 'bn'
                                        ? 'অনুগ্রহ পূর্বক মোবাইল নম্বরের মালিকানা প্রদান করুন '
                                        : 'Please enter Mobile Number ownership'
                                      : ''
                                  "
                                    :hide-details="!errors[0]"
                                    :item-text="getItemText"
                                    :items="mobile_ownership"
                                    clearable
                                    item-value="name_en"
                                    outlined
                                >
                                </v-autocomplete>
                              </ValidationProvider>
                            </v-col>
                            <v-col
                                v-if="data.account_type === 1"
                                cols="12"
                                lg="6"
                                md="4"
                                sm="6"
                            >
                              <ValidationProvider
                                  v-slot="{ errors }"
                                  name=" Bank Account Ownership"
                                  rules="required"
                                  vid="bank_account_owner"
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

                                <v-autocomplete
                                    v-model="data.account_owner"
                                    :error="!!errors[0]"
                                    :error-messages="
                                    errors[0]
                                      ? language === 'bn'
                                        ? 'অনুগ্রহ পূর্বক ব্যাংক অ্যাকাউন্টের মালিকানা প্রদান করুন '
                                        : 'Please enter Bank Account ownership'
                                      : ''
                                  "
                                    :hide-details="!errors[0]"
                                    :item-text="getItemText"
                                    :items="mobile_ownership"
                                    clearable
                                    item-value="name_en"
                                    outlined
                                >
                                </v-autocomplete>
                              </ValidationProvider>
                            </v-col>
                            <v-col
                                v-if="data.account_type === 2"
                                cols="12"
                                lg="6"
                                md="4"
                                sm="6"
                            >
                              <ValidationProvider
                                  v-slot="{ errors }"
                                  name="Mobile Number"
                                  rules="checkNumberMobile||required"
                                  vid="account_number"
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
                                    :error="!!errors[0]"
                                    :error-messages="
                                    errors[0]
                                      ? language === 'bn'
                                        ? 'অনুগ্রহ পূর্বক মোবাইল নম্বর প্রদান করুন '
                                        : 'Please enter Mobile Number'
                                      : ''
                                  "
                                    :hide-details="!errors[0]"
                                    clearable
                                    outlined
                                    type="number"
                                >
                                </v-text-field>
                              </ValidationProvider>
                            </v-col>
                            <v-col
                                v-if="data.account_type === 1"
                                cols="12"
                                lg="6"
                                md="4"
                                sm="6"
                            >
                              <ValidationProvider
                                  v-slot="{ errors }"
                                  name="Bank name"
                                  rules="required"
                                  vid="bank_name"
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
                                    :error="!!errors[0]"
                                    :error-messages="
                                    errors[0]
                                      ? language === 'bn'
                                        ? 'অনুগ্রহ পূর্বক ব্যাংকের নাম প্রদান করুন'
                                        : 'Please enter Bank Name'
                                      : ''
                                  "
                                    :hide-details="!errors[0]"
                                    clearable
                                    outlined
                                >
                                </v-text-field>
                              </ValidationProvider>
                            </v-col>
                            <v-col
                                v-if="data.account_type === 1"
                                cols="12"
                                lg="6"
                                md="4"
                                sm="6"
                            >
                              <ValidationProvider
                                  v-slot="{ errors }"
                                  name="Branch name"
                                  rules="required"
                                  vid="branch_name"
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
                                    :error="!!errors[0]"
                                    :error-messages="
                                    errors[0]
                                      ? language === 'bn'
                                        ? 'অনুগ্রহ পূর্বক শাখার নাম প্রদান করুন '
                                        : 'Please enter Branch Name'
                                      : ''
                                  "
                                    :hide-details="!errors[0]"
                                    clearable
                                    outlined
                                >
                                </v-text-field>
                              </ValidationProvider>
                            </v-col>
                            <v-col
                                v-if="data.account_type === 1"
                                cols="12"
                                lg="6"
                                md="4"
                                sm="6"
                            >
                              <ValidationProvider
                                  v-slot="{ errors }"
                                  name="Bank Account number"
                                  rules="required"
                                  vid="bank_account_number"
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
                                    :error="!!errors[0]"
                                    :error-messages="
                                    errors[0]
                                      ? language === 'bn'
                                        ? 'অনুগ্রহ পূর্বক ব্যাংক অ্যাকাউন্ট নম্বর প্রদান করুন '
                                        : 'Please enter Bank Account Number'
                                      : ''
                                  "
                                    :hide-details="!errors[0]"
                                    clearable
                                    outlined
                                    type="number"
                                >
                                </v-text-field>
                              </ValidationProvider>
                            </v-col>
                            <v-col cols="12" lg="6" md="4" sm="6">
                              <ValidationProvider
                                  v-slot="{ errors }"
                                  name="Email"
                                  rules="email"
                                  vid="Email"
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
                                    :error="!!errors[0]"
                                    :error-messages="
                                    errors[0]
                                      ? language === 'bn'
                                        ? 'অনুগ্রহ পূর্বক গ্রহণযোগ্য ইমেইল প্রদান করুন '
                                        : 'Please valid enter Email'
                                      : ''
                                  "
                                    :hide-details="!errors[0]"
                                    clearable
                                    outlined
                                    type="email"
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
                      <!-- Nominee Information -->
                      <v-expansion-panel v-if="isNomineeVerified" class="mt-4">
                        <v-expansion-panel-header color="#1c3b68">
                          <template v-slot:actions>
                            <v-icon color="white">$expand</v-icon>
                          </template>
                          <h3 class="white--text">
                            {{
                              $t(
                                  "container.application_selection.application.nominee_info"
                              )
                            }}
                          </h3>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content class="mt-5">
                          <v-row align="center" justify="center">
                            <v-col cols="12" lg="12">
                              <v-card outlined>
                                <v-card-text>
                                  <v-row align="center" justify="center">
                                    <v-col cols="12" lg="5" md="5" sm="6">
                                      <ValidationProvider
                                          v-slot="{ errors }"
                                          name="National Identity (NID) / Birth Registration Number"
                                          rules="checkNumberNominee||required"
                                          vid="nominee_verification_number"
                                      >
                                        <label>{{
                                            $t(
                                                "container.application_selection.application.nid_brn"
                                            )
                                          }}</label>
                                        <span
                                            style="margin-left: 4px; color: red"
                                        >*</span
                                        >
                                        <v-text-field
                                            v-model="
                                            data.nominee_verification_number
                                          "
                                            :error="!!errors[0]"
                                            :error-messages="
                                            errors[0]
                                              ? language === 'bn'
                                                ? 'অনুগ্রহ পূর্বক  ১০ বা ১৭ ডিজিটের সাথে যাচাইকরণ নম্বর লিখুন প্রদান করুন '
                                                : 'Please enter verification number with either 10 or 17 digit'
                                              : ''
                                          "


                                            :hide-details="!errors[0]"

                                            clearable
                                            outlined
                                            type="text"
                                            @keyup="checkLengthAndVerify()"
                                        >
                                        </v-text-field>
                                      </ValidationProvider>
                                    </v-col>

                                    <v-col cols="12" lg="5" md="4" sm="6">
                                      <label
                                      >{{
                                          $t(
                                              "container.application_selection.application.date_of_birth"
                                          )
                                        }}
                                      </label>
                                      <span style="margin-left: 4px; color: red"
                                      >*</span
                                      >
                                      <ValidationProvider
                                          v-slot="{ errors }"
                                          name=" Nominee Date of Birth"
                                          rules="required"
                                          vid="nominee_date_of_birth"
                                      >
                                        <v-text-field
                                            v-model="data.nominee_date_of_birth"
                                            :hide-details="!errors[0]"
                                            :value="formattedDateNominee"
                                            outlined
                                            type="date"

                                        ></v-text-field>
                                      </ValidationProvider>
                                    </v-col>

                                    <v-col
                                        align-self="center"
                                        class="d-flex align-item-center justify-center"
                                        cols="12"
                                        lg="2"
                                        sm="6"
                                    >
                                      <v-btn
                                          id="verify-button"
                                          :disabled="
                                          data.nominee_verification_number ==
                                            null ||
                                          data.nominee_date_of_birth === ''
                                        "
                                          class="btn text-right"
                                          color="primary"
                                          elevation="1"
                                          @click="verifyNomineeCard"
                                      >{{ $t("container.list.verify") }}
                                      </v-btn>
                                    </v-col>
                                  </v-row>
                                </v-card-text>
                              </v-card>
                            </v-col>
                            <v-col cols="12" lg="6" md="4" sm="6">
                              <ValidationProvider
                                  v-slot="{ errors }"
                                  name="Nominee Name (BN)"
                                  rules="required||bangla"
                                  vid="nominee_bn"
                              >
                                <label style="display: inline-block"
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
                                    v-model="data.nominee_bn"
                                    :error="!!errors[0]"
                                    :error-messages="errors[0]"
                                    :hide-details="!errors[0]"
                                    clearable
                                    outlined
                                >
                                </v-text-field>
                              </ValidationProvider>
                            </v-col>
                            <v-col cols="12" lg="6" md="4" sm="6">
                              <ValidationProvider
                                  v-slot="{ errors }"
                                  name="Nominee Name (EN)"
                                  rules="required"
                                  vid="nominee_en"
                              >
                                <label style="display: inline-block"
                                >{{
                                    $t(
                                        "container.application_selection.application.name_en"
                                    )
                                  }}
                                </label>
                                <span style="margin-left: 4px; color: red"
                                >*</span
                                >
                                <v-text-field
                                    v-model="data.nominee_en"
                                    :error="!!errors[0]"
                                    :error-messages="
                                    errors[0]
                                      ? language === 'bn'
                                        ? 'অনুগ্রহ পূর্বক সম্পূর্ণ নাম (বাংলায়) প্রদান করুন '
                                        : 'Please enter Full Name (Bangla)'
                                      : ''
                                  "
                                    :hide-details="!errors[0]"
                                    clearable
                                    outlined
                                >
                                </v-text-field>
                              </ValidationProvider>
                            </v-col>

                            <v-col cols="12" lg="6" md="4" sm="6">
                              <ValidationProvider
                                  v-slot="{ errors }"
                                  name="Nominee Natinality"
                                  readonly
                                  rules="required"
                                  vid="nominee_nationality"
                              >
                                <label
                                >{{
                                    $t(
                                        "container.application_selection.application.nationality"
                                    )
                                  }}
                                </label>
                                <span style="margin-left: 4px; color: red"
                                >*</span
                                >
                                <v-text-field
                                    v-model="data.nominee_nationality"
                                    :error="!!errors[0]"
                                    :error-messages="
                                    errors[0]
                                      ? language === 'bn'
                                        ? 'অনুগ্রহ পূর্বক সম্পূর্ণ নাম (ইংরেজীতে) প্রদান করুন '
                                        : 'Please enter Full Name (English)'
                                      : ''
                                  "
                                    :hide-details="!errors[0]"
                                    outlined
                                    readonly
                                >
                                </v-text-field>
                              </ValidationProvider>
                            </v-col>
                            <v-col cols="12" lg="6" md="4" sm="6">
                              <div class="validation_error_gender_type">
                                <ValidationProvider
                                    v-slot="{ errors }"
                                    name="Relationship with beneficiary"
                                    rules="required"
                                    vid="nominee_relation_with_beneficiary"
                                >
                                  <label>{{
                                      $t(
                                          "container.application_selection.application.relationship"
                                      )
                                    }}</label>
                                  <span style="margin-left: 4px; color: red"
                                  >*</span
                                  >
                                  <v-autocomplete
                                      v-model="
                                      data.nominee_relation_with_beneficiary
                                    "
                                      :error="!!errors[0]"
                                      :error-messages="
                                      errors[0]
                                        ? language === 'bn'
                                          ? 'অনুগ্রহ পূর্বক নমিনীর সাথে সম্পর্ক প্রদান করুন '
                                          : 'Please enter Relationship with Nominee'
                                        : ''
                                    "
                                      :hide-details="!errors[0]"
                                      :item-text="getItemText"
                                      :items="relations_with_bef"
                                      item-value="name_en"
                                      outlined
                                  >
                                  </v-autocomplete>
                                </ValidationProvider>
                              </div>
                            </v-col>
                            <v-col cols="12" lg="6" md="4" sm="6">
                              <v-img
                                  v-if="nomineeImageUrl"
                                  :src="nomineeImageUrl"
                                  class="mb-5"
                                  style="
                                  width: 150px;
                                  height: 150px;
                                  border: 1px solid #ccc;
                                "
                              ></v-img>
                              <v-img
                                  v-if="!nomineeImageUrl"
                                  class="mb-5"
                                  src="/assets/images/profile.png"
                                  style="
                                  width: 200px;
                                  height: 200px;
                                  border: 1px solid #ccc;
                                "
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
                                  vid="nominee_image"
                              >
                                <v-file-input
                                    id="nominee_image"
                                    v-model="data.nominee_image"
                                    :hide-details="!errors[0]"
                                    :placeholder="
                                    language === 'bn'
                                      ? 'ফাইল নির্বাচন করুন '
                                      : 'Choose File'
                                  "
                                    accept="image/*"
                                    counter
                                    outlined
                                    prepend-icon=""
                                    prepend-outer-icon="mdi-camera"
                                    show-size
                                    @change="previewImageNominee"
                                ></v-file-input>
                              </ValidationProvider>
                            </v-col>
                            <v-col
                                align-self="end"
                                cols="12"
                                lg="6"
                                md="4"
                                sm="6"
                            >
                              <v-img
                                  v-if="nomineeSignUrl"
                                  :src="nomineeSignUrl"
                                  class="mb-5"
                                  style="
                                  width: 150px;
                                  height: 80px;
                                  border: 1px solid #ccc;
                                "
                              ></v-img>
                              <v-img
                                  v-if="!nomineeSignUrl"
                                  class="mb-5"
                                  src="/assets/images/sign.png"
                                  style="
                                  width: 200px;
                                  height: 80px;
                                  border: 1px solid #ccc;
                                "
                              ></v-img>

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
                              <ValidationProvider
                                  v-slot="{ errors }"
                                  name="Signature"
                                  rules="required"
                                  vid="nominee_signature"
                              >
                                <v-file-input
                                    id="nominee_signature"
                                    v-model="data.nominee_signature"
                                    :hide-details="!errors[0]"
                                    :placeholder="
                                    language === 'bn'
                                      ? 'ফাইল নির্বাচন করুন'
                                      : 'Choose File'
                                  "
                                    accept="image/*"
                                    counter
                                    outlined
                                    prepend-icon=""
                                    prepend-outer-icon="mdi-camera"
                                    show-size
                                    @change="previewSignNominee"
                                ></v-file-input>
                              </ValidationProvider>
                            </v-col>
                            <v-col cols="12" lg="12" md="6" sm="6">
                              <ValidationProvider
                                  v-slot="{ errors }"
                                  name="Address of Nominee"
                                  rules="required"
                                  vid="nominee_address"
                              >
                                <label>{{
                                    $t(
                                        "container.application_selection.application.nominee_address"
                                    )
                                  }}</label>
                                <v-textarea
                                    v-model="data.nominee_address"
                                    :error="!!errors[0]"
                                    :error-messages="
                                    errors[0]
                                      ? language === 'bn'
                                        ? 'অনুগ্রহ পূর্বক ঠিকানা প্রদান করুন '
                                        : 'Please enter Address'
                                      : ''
                                  "
                                    :hide-details="!errors[0]"
                                    clearable
                                    outlined
                                ></v-textarea>
                              </ValidationProvider>
                            </v-col>
                          </v-row>
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                    </v-expansion-panels>
                    <v-col class="text-right" cols="12">
                      <v-btn
                          class="custom-btn mr-2"
                          color="primary"
                          router
                          to="/emergency-payment/emergency-beneficiary"
                      >
                        {{ $t("container.list.back") }}
                      </v-btn>
                      <v-btn class="custom-btn mr-2" :disabled="invalid" color="primary" @click="submit">
                        {{ $t("container.list.submit") }}
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              </ValidationObserver>
            </v-col>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapActions, mapState} from "vuex";
import ApiService from "@/services/ApiService";
import {extend, ValidationObserver, ValidationProvider} from "vee-validate";
import {numeric, required} from "vee-validate/dist/rules";
import Spinner from "@/components/Common/Spinner.vue";
import EmergencyComponent from "./Includes/EmergencyComponent.vue";
import ExistingEmergency from "./Includes/ExistingEmergency.vue";

extend("required", required);
extend("numeric", {
  ...numeric,
  message: "This field must be a number",
});
extend("email", {
  validate: (value) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  },
  message: "Please enter a valid email address",
});
extend("english", {
  validate: (value) => {
    // Regular expression to match English characters, spaces, and specific additional characters
    const englishRegex = /^[a-zA-Z\s\.\:\(\)\-]+$/;

    // Check if value matches English characters, spaces, and specific additional characters
    return englishRegex.test(value);
  },
  message:
      "Only English characters, spaces, and ( . : () - ) are allowed in this field",
});
extend("bangla", {
  validate: (value) => {
    // Update the regular expression to accept Bangla letters, English letters, spaces, and specified additional characters, but not Bangla numbers
    const banglaRegex =
        /^[\u0980-\u09DF\u09E0-\u09E5\u09F0-\u09FFa-zA-Z\s\.\:\(\)\-]+$/;

    return banglaRegex.test(value);
  },
  message:
      "Please enter Bangla letters, spaces, commas, dots, colons, hyphens, or parentheses in this field. Bangla numbers are not allowed.",
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
  message:
      "This is required field and field must be a number with either 10 or 17 characters",
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
  message:
      "This is required field and field must be a number with either 10 or 17 characters",
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
  message:
      "This field must be an 11-digit number starting with 'correct format'",
});
export default {
  name: "Create",
  title: "CTM - Emergency Beneficiary Create",
  components: {
    ValidationProvider,
    ValidationObserver,
    Spinner,
    EmergencyComponent,
    ExistingEmergency,
  },
  data() {
    return {
      data: {
        verification_type: null,
        emergency_allotment_id: null,
        verification_number: null,
        division_id: null,
        district_id: null,
        location_type: null,
        sub_location_type: null,
        thana_id: null,
        pouro_id: null,
        union_id: null,
        city_id: null,
        city_thana_id: null,
        district_pouro_id: null,
        ward_id_city: null,
        ward_id_upazila_union: null,
        ward_id_upazila_pouro: null,
        ward_id_dist: null,
        permanent_division_id: null,
        permanent_district_id: null,
        permanent_location_type: null,
        permanent_sub_location_type: null,
        permanent_thana_id: null,
        permanent_union_id: null,
        permanent_city_id: null,
        permanent_city_thana_id: null,
        permanent_district_pouro_id: null,
        permanent_pouro_id: null,
        permanent_ward_id_city: null,
        permanent_ward_id_union: null,
        permanent_ward_id_pouro: null,
        permanent_ward_id_dist: null,
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
        permanent_post_code: null,
        permanent_address: null,
        mobile: null,
        account_name: null,
        account_owner: null,
        account_number: null,
        account_type: null,
        bank_name: null,
        email: null,
        branch_name: null,
        mobile_operator: null,
        nominee_en: null,
        nominee_bn: null,
        nominee_verification_number: null,
        nominee_date_of_birth: null,
        nominee_address: null,
        nominee_image: null,
        nominee_signature: null,
        nominee_relation_with_beneficiary: null,
        nominee_nationality: "Bangladeshi",
      },
      genders: [],
      imageUrl: null,
      nomineeImageUrl: null,
      panel: [0, 1],
      signUrl: null,
      nomineeSignUrl: null,
      internalDialogVisible: this.dialogVisible,
      districts: [],
      district_poros: [],
      cities: [],
      thanas: [],
      programs: [],
      city_thanas: [],
      unions: [],
      wards_city: [],
      wards_upazila_pouro: [],
      permanent_wards_upazila_pouro: [],
      permanent_districts: [],
      permanent_thanas: [],
      permanent_cities: [],
      permanent_unions: [],
      permanent_pouros: [],
      permanent_district_poros: [],
      permanent_wards_dist: [],
      permanent_city_thanas: [],
      permanent_wards_upazila_union: [],
      wards_upazila_union: [],
      wards: [],
      permanent_wards_city: [],
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
      pouros: [],
      wards_dist: [],
      loading: false,
      relations_with_bef: [
        {name_en: "Spouse", name_bn: "স্বামী/স্ত্রী"},
        {name_en: "Family member", name_bn: "পরিবারের সদস্য"},
        {name_en: "Close relative", name_bn: "নিকট আত্মীয়"},
        {name_en: "Parent", name_bn: "পিতা/মাতা"},
      ],
      marital_status: [
        {name_en: "Married", name_bn: "বিবাহিত"},
        {name_en: "Unmarried", name_bn: "অবিবাহিত"},
        {name_en: "Widow", name_bn: "বিধবা"},
        {name_en: "Other", name_bn: "অন্যান্য"},
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
        {name_en: "Myself", name_bn: "নিজ"},
        {name_en: "Family Member", name_bn: "পরিবারের সদস্য"},
        {name_en: "Other", name_bn: "অন্যান্য"},
      ],
      religion: [
        {name_en: "Islam", name_bn: "ইসলাম"},
        {name_en: "Hindu", name_bn: "হিন্দু"},
        {name_en: "Buddhist", name_bn: "বৌদ্ধ"},
        {name_en: "Christian", name_bn: "খ্রিষ্টান"},
        {name_en: "Other", name_bn: "অন্যান্য"},
      ],
      professionType: [
        {name_en: "Farmer", name_bn: "কৃষক"},
        {name_en: "Rickshaw Puller", name_bn: "রিকশাচালক"},
        {name_en: "Day Laborer", name_bn: "দিন মজুর"},
        {name_en: "Street Vendor", name_bn: "রাস্তার দোকানদার"},
        {name_en: "Fisherman", name_bn: "জেলে"},
        {name_en: "Construction Worker", name_bn: "নির্মাণ কর্মী"},
        {name_en: "Domestic Worker", name_bn: "পরিবারিক কর্মচারী"},
        {name_en: "Tea Garden Laborer", name_bn: "চা বাগানের শ্রমিক"},
        {name_en: "Auto Rickshaw Driver", name_bn: "অটো রিকশা চালক"},
        {name_en: "Handicraftsman", name_bn: "হাস্তশিল্পী"},
        {name_en: "Plumber", name_bn: "প্লাম্বার"},
        {name_en: "Carpenter", name_bn: "কার্পেন্টার"},
        {name_en: "Street Sweeper", name_bn: "রাস্তা পরিষ্কারক"},
        {name_en: "Security Guard", name_bn: "নিরাপত্তা গার্ড"},
        {name_en: "Rural Artisan", name_bn: "গ্রামীণ শিল্পী"},
        {name_en: "Other", name_bn: "অন্যান্য"},
      ],
      education_status: [
        {name_en: "Illiterate", name_bn: "অশিক্ষিত"},
        {name_en: "JSC", name_bn: "জেএসসি"},
        {name_en: "SSC", name_bn: "এসএসসি"},
        {name_en: "HSC", name_bn: "এইচএসসি"},
        {name_en: "Graduate", name_bn: "গ্রাজুয়েট"},
        {name_en: "Post Graduate", name_bn: "পোস্ট গ্রাজুয়েট"},
        {name_en: "Other", name_bn: "অন্যান্য"},
      ],
      checkbox: false,
      isVerified: true,
      isNomineeVerified: true,
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
    formattedDate() {
      if (this.selectedDay && this.selectedMonth && this.selectedYear) {
        const monthIndex = this.months.indexOf(this.selectedMonth) + 1;
        const formattedMonth =
            monthIndex < 10 ? `0${monthIndex}` : `${monthIndex}`;
        return `${this.selectedYear}-${formattedMonth}-${this.selectedDay}`;
      }
      return null;
    },
    formattedDateNominee() {
      if (
          this.selectedDayNominee &&
          this.selectedMonthNominee &&
          this.selectedYearNominee
      ) {
        const monthIndex = this.months.indexOf(this.selectedMonthNominee) + 1;
        const formattedMonth =
            monthIndex < 10 ? `0${monthIndex}` : `${monthIndex}`;
        return `${this.selectedYearNominee}-${formattedMonth}-${this.selectedDayNominee}`;
      }
      return null;
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
    this.getPaymentName();
  },
  methods: {
    getPaymentName() {
      const queryData = {
        table_name: "emergency_allotments",
        field_name: ["id", "emergency_payment_name"],
        condition: {status: 1, deleted_at: null},
      };
      ApiService.getDropData("global/common-dropdown", queryData)
          .then((res) => {
            console.log(res);
            this.programs = res.data;
          })
          .catch((error) => console.log(error));
    },
    getItemValue(item) {
      return this.language === "bn" ? item.value_bn : item.value_en;
    },
    getItemText(item) {
      return this.language === "bn" ? item.name_bn : item.name_en;
    },
    verifyApplicant() {
      let data = {
        program_id: this.data.program_id,
        gender_id: this.data.gender_id,
        verification_type: this.data.verification_type,
        verification_number: this.data.verification_number,
        date_of_birth: this.data.date_of_birth,
      };

      this.$axios
          .post("/global/online-application/card-verification", data, {
            headers: {
              "Content-Type": "multipart/form-data",
              Accept: "application/json",
            },
          })
          .then((res) => {
            if (res.status === 200) {
              this.isVerified = true;
              this.$toast.success(res.data.message);
              // this.data.age = res.data.data.age;
              // this.data.name_en = res.data.data.nameEn;
              // this.data.name_bn = res.data.data.name;
              // this.data.account_name = res.data.data.nameEn;
            }
          })
          .catch((err) => {
            this.isVerified = null;
            if (
                err?.response?.data?.errors &&
                err?.response?.data?.errors?.verification_number
            ) {
              const verificationErrors =
                  err.response.data.errors.verification_number;
              const beneficiaryMessageIndex = verificationErrors.indexOf(
                  "You are already a beneficiary"
              );
              if (beneficiaryMessageIndex !== -1) {
                this.$toast.error("You are already a beneficiary");
              } else {
                // If "You are already a beneficiary" message not found, display the first error message
                this.$toast.error(verificationErrors[0]);
              }
            } else if (err.response.data.message) {
              this.$toast.error(err.response.data.message);
            } else {
              this.$toast.error(
                  err.response.data.message ||
                  err.response.data.error_code ||
                  "Unknown error"
              );
            }
          });
    },
    verifyNomineeCard() {
      let data = {
        verification_number: this.data.nominee_verification_number,
        date_of_birth: this.data.nominee_date_of_birth,
      };

      this.$axios
          .post("/global/online-application/nominee-card-verification", data, {
            headers: {
              "Content-Type": "multipart/form-data",
              Accept: "application/json",
            },
          })
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              this.isNomineeVerified = true;
            }
            this.$toast.success(res.data.message);
            // this.data.nominee_en = res.data.data.nameEn;
            // this.data.nominee_bn = res.data.data.name;
          })
          .catch((err) => {
            console.log(err);
            this.$toast.error(err.response.data.message);
          });
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
    async SubLocationType($event) {
      if ($event === 1) {
        await this.$axios
            .get(`/global/union/pouro/get/${this.data.thana_id}`, {
              headers: {
                Authorization: "Bearer " + this.$store.state.token,
                "Content-Type": "multipart/form-data",
              },
            })
            .then((result) => {
              this.pouros = result.data.data;
              console.log({pouros: this.pouros});
            });
        this.data.union_id = null;
      }
      if ($event === 2) {
        await this.onChangeUpazila(this.data.thana_id);
        this.data.pouro_id = null;
      }
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
    async onChangeDistrictPouro($event) {
      console.log("hi district pourashava called");
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
    async onChangeUpazila(event) {
      await this.$axios
          .get(`/global/union/get/${this.data.thana_id}`, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((result) => {
            this.unions = result.data.data;

          });
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
    async onChangePouro($event) {
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
    async permanent_locationType($event) {
      if (
          this.data.permanent_district_id != null &&
          this.data.permanent_location_type != null
      ) {
        if ($event === 2) {
          await this.$axios
              .get(`/admin/thana/get/${this.data.permanent_district_id}`, {
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
              .get("/admin/city/get/" + this.data.permanent_district_id + "/" + $event, {
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
              .get("/admin/city/get/" + this.data.permanent_district_id + "/" + $event, {
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
    async permanentSubLocationType(event) {
      if (event === 1) {
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
      if (event === 2) {
        await this.permanent_onChangeUpazila(this.data.permanent_thana_id);
        this.data.permanent_pouro_id = null;
      }
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

            console.log("its calling always,permanent_onChangeUpazila ");
          });
    },
    async Permanent_onChangeDistrictPouro($event) {
      await this.$axios
          .get(
              `/global/ward/get/district_pouro/${this.data.permanent_district_pouro_id}`,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
          )
          .then((result) => {
            this.permanent_wards_dist = result.data.data;
            this.permanent_wards_upazila_union = [];
            this.permanent_wards_upazila_pouro = [];
            this.permanent_wards_city = [];
            this.permanent_ward_id_city = null;
            this.permanent_ward_id_union = null;
          });
    },
    async Permanent_onChangePouro($event) {
      console.log($event, "pouro called");
      await this.$axios
          .get(`/global/ward/get/pouro/${$event}`, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((result) => {
            this.permanent_wards_upazila_pouro = result.data.data;
            console.log(
                this.permanent_wards_upazila_pouro,
                "pouro called properly"
            );
            this.permanent_wards_upazila_union = [];
            this.permanent_wards_dist = [];
            this.permanent_wards_city = [];
            this.data.permanent_ward_id_dist = null;
            this.data.permanent_ward_id_city = null;
            this.data.permanent_ward_id_union = null;
          });
    },
    checkLengthAndVerify() {
      if (
          this.data.nominee_verification_number.length === 10 ||
          this.data.nominee_verification_number.length === 17
      ) {
        if (
            this.data.verification_number === this.data.nominee_verification_number
        ) {
          this.data.nominee_verification_number = null;
          this.$toast.error("Nominee cannot be the same as the applicant");
        }
      }
    },
    getDistrictList(division_id = null) {
      let divisionId = division_id ? division_id : this.data.division_id;
      var queryData = {
        table_name: "locations",
        field_name: ["id", "parent_id", "type", "name_en"],
        condition: {parent_id: divisionId, deleted_at: null},
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
        condition: {parent_id: districtId, deleted_at: null},
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
        condition: {parent_id: thanaId, deleted_at: null},
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
        condition: {parent_id: cityId, deleted_at: null},
      };
      ApiService.getDropData("global/common-dropdown", queryData)
          .then((res) => {
            this.city_thanas = res.data;
          })
          .catch((error) => console.log(error));
    },
    getPermanentDistrictList(permanent_division_id = null) {
      let permanent_divisionId = permanent_division_id
          ? permanent_division_id
          : this.data.permanent_division_id;
      var queryData = {
        table_name: "locations",
        field_name: ["id", "parent_id", "type", "name_en"],
        condition: {parent_id: permanent_divisionId, deleted_at: null},
      };
      ApiService.getDropData("global/common-dropdown", queryData)
          .then((res) => {
            this.permanent_districts = res.data;
          })
          .catch((error) => console.log(error));
    },
    getPermanentThanaList(permanent_district_id = null) {
      let permanent_districtId = permanent_district_id
          ? permanent_district_id
          : this.data.permanent_district_id;
      var queryData = {
        table_name: "locations",
        field_name: ["id", "parent_id", "type", "name_en"],
        condition: {parent_id: permanent_districtId, deleted_at: null},
      };
      ApiService.getDropData("global/common-dropdown", queryData)
          .then((res) => {
            this.permanent_thanas = res.data;
          })
          .catch((error) => console.log(error));
    },
    getPermanentUnionList(permanent_thana_id = null) {
      let permanent_thanaId = permanent_thana_id ? permanent_thana_id : this.data.permanent_thana_id;
      var queryData = {
        table_name: "locations",
        field_name: ["id", "parent_id", "type", "name_en"],
        condition: {parent_id: permanent_thanaId, deleted_at: null},
      };
      ApiService.getDropData("global/common-dropdown", queryData)
          .then((res) => {
            this.permanent_unions = res.data;
          })
          .catch((error) => console.log(error));
    },
    getPermanentCityThanaList(permanent_city_id = null) {
      let permanent_cityId = permanent_city_id ? permanent_city_id : this.data.permanent_city_id;
      var queryData = {
        table_name: "locations",
        field_name: ["id", "parent_id", "type", "name_en"],
        condition: {parent_id: permanent_cityId, deleted_at: null},
      };
      ApiService.getDropData("global/common-dropdown", queryData)
          .then((res) => {
            this.permanent_city_thanas = res.data;
          })
          .catch((error) => console.log(error));
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
            console.log(this.permanent_wards_upazila_union, "called union ward");
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
            console.log(this.permanent_wards_city, "hi called thana properly");
            this.permanent_wards_upazila = [];
            this.permanent_wards_dist = [];
            this.permanent_ward_id_dist = null;
            this.permanent_ward_id_upazila = null;
          });
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

      if (checkLanguageEnglish !== "English") {
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
      if (event) {
        this.data.permanent_post_code = this.data.post_code;
        this.data.permanent_address = this.data.address;
        this.data.permanent_division_id = this.data.division_id;
        this.getPermanentDistrictList(this.data.division_id);
        this.data.permanent_district_id = this.data.district_id;
        this.getPermanentThanaList(this.data.district_id);
        this.data.permanent_location_type = this.data.location_type;
        this.permanent_locationType(this.data.location_type);
        this.data.permanent_union_id = this.data.union_id;
        this.data.permanent_pouro_id = this.data.pouro_id;
        this.data.permanent_ward_id_pouro = this.data.ward_id_pouro ?? null;
        if (this.data.thana_id) {
          this.data.permanent_thana_id = this.data.thana_id;
          this.getPermanentUnionList(this.data.thana_id);
          this.data.permanent_sub_location_type = this.data.sub_location_type;
          this.permanentSubLocationType(this.data.sub_location_type);
        }
        if (this.data.city_id) {
          this.data.permanent_city_id = this.data.city_id;
          this.data.permanent_city_thana_id = this.data.city_thana_id;
          this.getPermanentCityThanaList(this.data.city_id);
          this.data.permanent_ward_id_city = this.data.ward_id_city;
          this.Permanent_OnChangeCityThana(this.data.permanent_city_thana_id);
        }
        if (this.data.district_pouro_id) {
          this.data.permanent_district_pouro_id = this.data.district_pouro_id;
          this.data.permanent_ward_id_dist = this.data.ward_id_dist;
          this.Permanent_onChangeDistrictPouro(
              this.data.permanent_district_pouro_id
          );
        }
        if (this.data.union_id) {
          this.data.permanent_ward_id_union = this.data.ward_id_union ?? null;
          this.permanent_onChangeUnion(this.data.union_id);
        }
        if (this.data.pouro_id) {
          this.data.permanent_ward_id_pouro = this.data.ward_id_pouro ?? null;
          this.Permanent_onChangePouro(this.data.permanent_pouro_id);
        }
        if (this.data.address != null) {
          this.data.permanent_address = this.data.address;
        }
        if (this.data.post_code != null) {
          this.data.permanent_post_code = this.data.post_code;
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
    submit() {
      try {
        let fd = new FormData();
        for (const [key, value] of Object.entries(this.data)) {
          if (value !== null) {
            fd.append(key, value);
          }
        }
        ApiService
            .post("/admin/emergency/beneficiaries", fd)
            .then((res) => {
              console.log(res);
              if (res.data?.success) {
                this.$toast.success(
                    this.language === "bn"
                        ? "ডেটা সফলভাবে জমা দেওয়া হয়েছে"
                        : "Data inserted successfully"
                );
                this.resetData();
                this.$router.push("/emergency-payment/emergency-beneficiary");
              } else if (res?.data?.errors) {
                this.$refs.form.setErrors(res.data.errors);
                this.$toast.error(res.data.message);
              }
            })
            .catch((error) => {
              console.error("API error:", error);
            });
      } catch (e) {
        console.log(e, "err");
      }
    },
    previewImage() {
      if (this.data.image) {
        const maxFileSize = 200 * 1024; // 200 KB in bytes
        if (this.data.image.size > maxFileSize) {
          // alert("file size must be 200kb")
          // this.confirmDialog =true;
          if (this.language === "en") {
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
          if (this.language === "en") {
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
          if (this.language === "en") {
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
          if (this.language === "en") {
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
    ...mapActions({
      GetAllDivisions: "Division/GetAllDivisions",
      GetAllAllownceProgram: "Allowance/GetAllAllownceProgram",
    }),
    resetData() {
      this.data = {};
    },
  },
  watch: {
    "$i18n.locale": "updateHeaderTitle",
    formattedDate(newDate) {
      this.$emit("update:model", newDate);
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
}
</style>
