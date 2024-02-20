<template>
  <div id="application_view">
    <v-row class="mx-5 my-5 mt-5">
      <v-col class="mt-5" cols="12">
        <ValidationObserver ref="form" v-slot="{ invalid }">
          <form @submit.prevent="">
            <v-card class="pa-5 px-10 mb-4">
              <ValidationProvider
                name="program"
                vid="program"
                rules="required"
                v-slot="{ errors }"
              >
                <label
                  >{{
                    $t(
                      "container.beneficiary_management.beneficiary_list.program"
                    )
                  }}
                </label>
                <span style="margin-left: 4px; color: red">*</span>
                <v-select
                  outlined
                  :items="data?.program"
                  item-text="name_en"
                  item-value="id"
                  v-model="data.program.id"
                  required
                  :error="errors[0] ? true : false"
                  :error-messages="errors[0]"
                  readonly
                >
                </v-select>
              </ValidationProvider>
              <div>
                <v-expansion-panels v-model="panel" multiple>
                  <!-- Applicant Verification -->
                  <v-expansion-panel>
                    <v-expansion-panel-header color="primary">
                      <h3 class="white--text">
                        {{
                          $t(
                            "container.beneficiary_management.beneficiary_list.applicant_verification"
                          )
                        }}
                      </h3>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content class="mt-5">
                      <template>
                        <ValidationProvider
                          name="program"
                          vid="verification_type"
                          rules="required"
                          v-slot="{ errors }"
                        >
                          <v-radio-group
                            :readonly="isRadioGroupReadonly"
                            v-model="data.verification_type"
                            row
                          >
                            <v-radio
                              :label="
                                $t(
                                  'container.beneficiary_management.beneficiary_list.national_identity'
                                )
                              "
                              value="1"
                              v-if="isRadioGroupReadonly"
                            ></v-radio>
                            <v-radio
                              :label="
                                $t(
                                  'container.beneficiary_management.beneficiary_list.birth_registration'
                                )
                              "
                              value="2"
                              v-if="isRadioGroupReadonly"
                            ></v-radio>
                          </v-radio-group>
                        </ValidationProvider>
                      </template>
                      <V-row>
                        <v-col>
                          <ValidationProvider
                            name="Number"
                            vid="verification_number"
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <label>
                              <span v-if="data.verification_type == 1">
                                {{
                                  $t(
                                    "container.beneficiary_management.beneficiary_list.nid_no"
                                  )
                                }}
                              </span>
                              <span v-else-if="data.verification_type == 2">
                                {{
                                  $t(
                                    "container.beneficiary_management.beneficiary_list.brn_no"
                                  )
                                }}
                              </span>
                              <span v-else
                                >{{
                                  $t(
                                    "container.beneficiary_management.beneficiary_list.nid_or_brn_no"
                                  )
                                }}
                              </span>
                            </label>
                            <span style="margin-left: 4px; color: red">*</span>
                            <v-text-field
                              outlined
                              readonly
                              v-model="data.verification_number"
                              class="mr-2"
                              type="number"
                              required
                              :error="errors[0] ? true : false"
                              :error-messages="errors[0]"
                            >
                            </v-text-field>
                          </ValidationProvider>
                        </v-col>

                        <v-col>
                          <label>
                            <label
                              >{{
                                $t(
                                  "container.beneficiary_management.beneficiary_list.date_of_birth"
                                )
                              }}
                            </label>
                          </label>

                          <span style="margin-left: 4px; color: red">*</span>

                          <v-text-field
                            v-model="data.date_of_birth"
                            readonly
                            outlined
                          >
                          </v-text-field>
                        </v-col>
                      </V-row>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                  <!-- Applicant Verification end -->

                  <!-- 2nd Expansion panel -->
                  <!-- Information According to the Old Allowance -->
                  <v-expansion-panel class="mt-5" v-model="panel" multiple>
                    <v-expansion-panel-header color="primary">
                      <h3 class="white--text">
                        {{
                          $t(
                            "container.beneficiary_management.beneficiary_list.information_according_to_the_old"
                          )
                        }}
                      </h3>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content class="mt-5">
                      <V-row>
                        <v-col>
                          <ValidationProvider
                            name="Number"
                            vid="verification_number"
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <label>
                              <span>
                                {{
                                  $t(
                                    "container.beneficiary_management.beneficiary_list.yearly_income"
                                  )
                                }}
                              </span>
                            </label>
                            <span style="margin-left: 4px; color: red">*</span>
                            <v-text-field
                              outlined
                              readonly
                              v-model="data.verification_number"
                              class="mr-2"
                              type="number"
                              required
                              :error="errors[0] ? true : false"
                              :error-messages="errors[0]"
                            >
                            </v-text-field>
                          </ValidationProvider>
                        </v-col>

                        <v-col>
                          <ValidationProvider
                            name="Number"
                            vid="verification_number"
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <label>
                              <span>
                                {{
                                  $t(
                                    "container.beneficiary_management.beneficiary_list.govt_private_ben_details"
                                  )
                                }}
                              </span>
                            </label>
                            <span style="margin-left: 4px; color: red">*</span>
                            <v-text-field
                              outlined
                              readonly
                              v-model="data.verification_number"
                              class="mr-2"
                              type="number"
                              required
                              :error="errors[0] ? true : false"
                              :error-messages="errors[0]"
                            >
                            </v-text-field>
                          </ValidationProvider>
                        </v-col>
                      </V-row>
                      <V-row>
                        <v-col>
                          <ValidationProvider
                            name="Number"
                            vid="verification_number"
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <label>
                              <span>
                                {{
                                  $t(
                                    "container.beneficiary_management.beneficiary_list.total_no_of_family_member"
                                  )
                                }}
                              </span>
                            </label>
                            <span style="margin-left: 4px; color: red">*</span>
                            <v-text-field
                              outlined
                              readonly
                              v-model="data.verification_number"
                              class="mr-2"
                              type="number"
                              required
                              :error="errors[0] ? true : false"
                              :error-messages="errors[0]"
                            >
                            </v-text-field>
                          </ValidationProvider>
                        </v-col>
                        <v-col>
                          <ValidationProvider
                            name="Number"
                            vid="verification_number"
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <label>
                              <span>
                                {{
                                  $t(
                                    "container.beneficiary_management.beneficiary_list.male"
                                  )
                                }}
                              </span>
                            </label>
                            <span style="margin-left: 4px; color: red">*</span>
                            <v-text-field
                              outlined
                              readonly
                              v-model="data.verification_number"
                              class="mr-2"
                              type="number"
                              required
                              :error="errors[0] ? true : false"
                              :error-messages="errors[0]"
                            >
                            </v-text-field>
                          </ValidationProvider>
                        </v-col>
                        <v-col>
                          <ValidationProvider
                            name="Number"
                            vid="verification_number"
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <label>
                              <span>
                                {{
                                  $t(
                                    "container.beneficiary_management.beneficiary_list.female"
                                  )
                                }}
                              </span>
                            </label>
                            <span style="margin-left: 4px; color: red">*</span>
                            <v-text-field
                              outlined
                              readonly
                              v-model="data.verification_number"
                              class="mr-2"
                              type="number"
                              required
                              :error="errors[0] ? true : false"
                              :error-messages="errors[0]"
                            >
                            </v-text-field>
                          </ValidationProvider>
                        </v-col>
                        <v-col>
                          <ValidationProvider
                            name="Number"
                            vid="verification_number"
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <label>
                              <span>
                                {{
                                  $t(
                                    "container.beneficiary_management.beneficiary_list.children"
                                  )
                                }}
                              </span>
                            </label>
                            <span style="margin-left: 4px; color: red">*</span>
                            <v-text-field
                              outlined
                              readonly
                              v-model="data.verification_number"
                              class="mr-2"
                              type="number"
                              required
                              :error="errors[0] ? true : false"
                              :error-messages="errors[0]"
                            >
                            </v-text-field>
                          </ValidationProvider>
                        </v-col>
                      </V-row>
                      <V-row>
                        <v-col md="2" lg="2" cols="12">
                          <label>{{
                            $t(
                              "container.beneficiary_management.beneficiary_list.health_status"
                            )
                          }}</label>
                          <span style="margin-left: 4px; color: red">*</span>
                        </v-col>
                        <v-col md="2" lg="2" cols="12">
                          <v-checkbox
                            disabled
                            v-model="health_status_value.totally_disabled"
                            :label="health_status[0]"
                          ></v-checkbox>
                        </v-col>
                        <v-col md="2" lg="2" cols="12">
                          <v-checkbox
                            disabled
                            v-model="health_status_value.sick"
                            :label="health_status[1]"
                          ></v-checkbox>
                        </v-col>
                        <v-col md="2" lg="2" cols="12">
                          <v-checkbox
                            disabled
                            v-model="health_status_value.insane"
                            :label="health_status[2]"
                          ></v-checkbox>
                        </v-col>
                        <v-col md="2" lg="2" cols="12">
                          <v-checkbox
                            disabled
                            v-model="health_status_value.disabled"
                            :label="health_status[3]"
                          ></v-checkbox>
                        </v-col>
                        <v-col md="2" lg="2" cols="12">
                          <v-checkbox
                            disabled
                            v-model="health_status_value.partially_powerless"
                            :label="health_status[4]"
                          ></v-checkbox>
                        </v-col>
                      </V-row>
                      <v-row>
                        <v-col cols="12" class="text-center">
                          <v-chip color="success" label
                            >Socio Economic Infromation</v-chip
                          >
                        </v-col>
                      </v-row>
                      <V-row>
                        <v-col>
                          <ValidationProvider
                            name="program"
                            vid="program"
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <label>{{
                              $t(
                                "container.beneficiary_management.beneficiary_list.financial_status"
                              )
                            }}</label>
                            <span style="margin-left: 4px; color: red">*</span>
                            <v-select
                              outlined
                              :items="data?.program"
                              item-text="name_en"
                              item-value="id"
                              v-model="data.program.id"
                              required
                              :error="errors[0] ? true : false"
                              :error-messages="errors[0]"
                              readonly
                            >
                            </v-select>
                          </ValidationProvider>
                        </v-col>

                        <v-col>
                          <ValidationProvider
                            name="program"
                            vid="program"
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <label>{{
                              $t(
                                "container.beneficiary_management.beneficiary_list.social_status"
                              )
                            }}</label>
                            <span style="margin-left: 4px; color: red">*</span>
                            <v-select
                              outlined
                              :items="data?.program"
                              item-text="name_en"
                              item-value="id"
                              v-model="data.program.id"
                              required
                              :error="errors[0] ? true : false"
                              :error-messages="errors[0]"
                              readonly
                            >
                            </v-select>
                          </ValidationProvider>
                        </v-col>
                      </V-row>
                      <V-row>
                        <v-col>
                          <ValidationProvider
                            name="Number"
                            vid="verification_number"
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <label>
                              <span>
                                {{
                                  $t(
                                    "container.beneficiary_management.beneficiary_list.land_ownership"
                                  )
                                }}
                              </span>
                            </label>
                            <span style="margin-left: 4px; color: red">*</span>
                            <v-text-field
                              outlined
                              readonly
                              v-model="data.verification_number"
                              class="mr-2"
                              type="number"
                              required
                              :error="errors[0] ? true : false"
                              :error-messages="errors[0]"
                            >
                            </v-text-field>
                          </ValidationProvider>
                        </v-col>

                        <v-col> </v-col>
                      </V-row>
                      <V-row>
                        <v-col>
                          <label> PMT Scoring</label>
                          <span style="margin-left: 4px; color: red">*</span>
                        </v-col>
                      </V-row>
                      <V-row>
                        <v-col v-for="i in 5" :key="i">
                          <v-checkbox
                            readonly
                            :label="health_status[i - 1]"
                            :value="health_status[i - 1]"
                          ></v-checkbox>
                        </v-col>
                      </V-row>
                    </v-expansion-panel-content>
                  </v-expansion-panel>

                  <!-- 3rd Expansion panel -->
                  <!-- Personal Information  -->
                  <v-expansion-panel class="mt-5">
                    <v-expansion-panel-header color="primary">
                      <h3 class="white--text">
                        {{
                          $t(
                            "container.beneficiary_management.beneficiary_list.personal_info"
                          )
                        }}
                      </h3>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content class="mt-5">
                      <div class="pa-2 mb-4">
                        <v-row>
                          <v-col cols="6" lg="6">
                            <v-img
                              :src="data.imageUrl"
                              style="
                                width: 200px;
                                height: 200px;
                                border: 1px solid #ccc;
                              "
                              class="mb-5"
                              v-if="data.imageUrl"
                            ></v-img>
                            <v-img
                              src="/assets/images/profile.png"
                              v-if="!data.imageUrl"
                              style="
                                width: 150px;
                                height: 150px;
                                border: 1px solid #ccc;
                              "
                              class="mb-5"
                            ></v-img>
                            <ValidationProvider
                              v-slot="{ errors }"
                              name="Image"
                              rules="required"
                              vid="image"
                            >
                              <h3>
                                {{
                                  $t(
                                    "container.beneficiary_management.beneficiary_list.image"
                                  )
                                }}
                              </h3>
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="6" align-self="end" lg="6">
                            <v-img
                              :src="data.signUrl"
                              style="
                                width: 200px;
                                height: 80px;
                                border: 1px solid #ccc;
                              "
                              class="mb-5"
                              v-if="data.signUrl"
                            ></v-img>
                            <v-img
                              src="/assets/images/sign.png"
                              v-if="!data.signUrl"
                              style="
                                width: 200px;
                                height: 80px;
                                border: 1px solid #ccc;
                              "
                              class="mb-5"
                            ></v-img>
                            <ValidationProvider
                              v-slot="{ errors }"
                              name="Signature"
                              rules="required"
                              vid="sign"
                            >
                              <h3>
                                {{
                                  $t(
                                    "container.beneficiary_management.beneficiary_list.signature"
                                  )
                                }}
                              </h3>
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="6" lg="6">
                            <ValidationProvider
                              name="Name in Bangla"
                              vid="name_bn"
                              rules="required"
                              v-slot="{ errors }"
                            >
                              <label
                                >{{
                                  $t(
                                    "container.beneficiary_management.beneficiary_list.name_bn"
                                  )
                                }}
                              </label>
                              <v-text-field
                                v-model="data.name_bn"
                                outlined
                                readonly
                                :error="errors[0] ? true : false"
                                :error-messages="errors[0]"
                              >
                              </v-text-field>
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="6" lg="6">
                            <ValidationProvider
                              name="Name in English"
                              vid="name_en"
                              rules="required"
                              v-slot="{ errors }"
                            >
                              <label
                                >{{
                                  $t(
                                    "container.beneficiary_management.beneficiary_list.name_en"
                                  )
                                }}
                              </label>
                              <v-text-field
                                v-model="data.name_en"
                                outlined
                                readonly
                                :error="errors[0] ? true : false"
                                :error-messages="errors[0]"
                              >
                              </v-text-field>
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="6" lg="6">
                            <ValidationProvider
                              name="Father Name in Bangla"
                              vid="father_name_bn"
                              rules="required"
                              v-slot="{ errors }"
                            >
                              <label
                                >{{
                                  $t(
                                    "container.beneficiary_management.beneficiary_list.father_name_bn"
                                  )
                                }}
                              </label>
                              <v-text-field
                                v-model="data.father_name_bn"
                                outlined
                                required
                                readonly
                                :error="errors[0] ? true : false"
                                :error-messages="errors[0]"
                              >
                              </v-text-field>
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="6" lg="6">
                            <ValidationProvider
                              name="Father Name in English"
                              vid="father_name_en"
                              rules="required"
                              v-slot="{ errors }"
                            >
                              <label
                                >{{
                                  $t(
                                    "container.beneficiary_management.beneficiary_list.father_name_en"
                                  )
                                }}
                              </label>
                              <v-text-field
                                v-model="data.father_name_en"
                                outlined
                                required
                                readonly
                                :error="errors[0] ? true : false"
                                :error-messages="errors[0]"
                              >
                              </v-text-field>
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="6" lg="6">
                            <ValidationProvider
                              name="Mother Name in English"
                              vid="mother_name_bn"
                              v-slot="{ errors }"
                            >
                              <label
                                >{{
                                  $t(
                                    "container.beneficiary_management.beneficiary_list.mother_name_bn"
                                  )
                                }}
                              </label>
                              <v-text-field
                                v-model="data.mother_name_bn"
                                outlined
                                required
                                readonly
                                :error="errors[0] ? true : false"
                                :error-messages="errors[0]"
                              >
                              </v-text-field>
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="6" lg="6">
                            <ValidationProvider
                              name="Mother Name in English"
                              vid="mother_name_en"
                              v-slot="{ errors }"
                            >
                              <label
                                >{{
                                  $t(
                                    "container.beneficiary_management.beneficiary_list.mother_name_en"
                                  )
                                }}
                              </label>
                              <v-text-field
                                v-model="data.mother_name_en"
                                outlined
                                readonly
                                required
                                :error="errors[0] ? true : false"
                                :error-messages="errors[0]"
                              >
                              </v-text-field>
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="6" lg="6">
                            <ValidationProvider
                              name="Spouse Name in Bangla"
                              vid="spouse_name_bn"
                              v-slot="{ errors }"
                            >
                              <label
                                >{{
                                  $t(
                                    "container.beneficiary_management.beneficiary_list.spouse_name_bn"
                                  )
                                }}
                              </label>
                              <v-text-field
                                v-model="data.spouse_name_bn"
                                outlined
                                readonly
                                :error="errors[0] ? true : false"
                                :error-messages="errors[0]"
                              >
                              </v-text-field>
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="6" lg="6">
                            <ValidationProvider
                              name="Marital Status"
                              vid="marital_status"
                              v-slot="{ errors }"
                            >
                              <label
                                >{{
                                  $t(
                                    "container.beneficiary_management.beneficiary_list.marital_status"
                                  )
                                }}
                              </label>
                              <v-text-field
                                v-model="data.marital_status"
                                outlined
                                readonly
                                :error="errors[0] ? true : false"
                                :error-messages="errors[0]"
                              >
                              </v-text-field>
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="6" lg="6">
                            <ValidationProvider
                              name="Spouse Name in English"
                              vid="spouse_name_en"
                              v-slot="{ errors }"
                            >
                              <label
                                >{{
                                  $t(
                                    "container.beneficiary_management.beneficiary_list.spouse_name_en"
                                  )
                                }}
                              </label>
                              <v-text-field
                                v-model="data.spouse_name_en"
                                outlined
                                readonly
                                :error="errors[0] ? true : false"
                                :error-messages="errors[0]"
                              >
                              </v-text-field>
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="6" lg="6">
                            <ValidationProvider
                              name="Religion"
                              vid="religion"
                              v-slot="{ errors }"
                              rules="required"
                            >
                              <label
                                >{{
                                  $t(
                                    "container.beneficiary_management.beneficiary_list.religion"
                                  )
                                }}
                              </label>
                              <v-text-field
                                v-model="data.religion"
                                outlined
                                readonly
                                :error="errors[0] ? true : false"
                                :error-messages="errors[0]"
                              >
                              </v-text-field>
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="6" lg="6">
                            <ValidationProvider
                              name="Mobile Number"
                              vid="mobile"
                              rules="required"
                              v-slot="{ errors }"
                            >
                              <label
                                >{{
                                  $t(
                                    "container.beneficiary_management.beneficiary_list.mobile_number"
                                  )
                                }}
                              </label>
                              <v-text-field
                                v-model="data.mobile"
                                outlined
                                readonly
                                type="Number"
                                :error="errors[0] ? true : false"
                                :error-messages="errors[0]"
                              >
                              </v-text-field>
                            </ValidationProvider>
                          </v-col>

                          <v-col cols="6" lg="6">
                            <ValidationProvider
                              name="Nationality"
                              vid="nationality"
                              v-slot="{ errors }"
                            >
                              <label
                                >{{
                                  $t(
                                    "container.beneficiary_management.beneficiary_list.nationality"
                                  )
                                }}
                              </label>
                              <v-text-field
                                v-model="data.nationality"
                                outlined
                                required
                                readonly
                                :error="errors[0] ? true : false"
                                :error-messages="errors[0]"
                              >
                              </v-text-field>
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="6" lg="6">
                            <ValidationProvider
                              name="Age"
                              vid="age"
                              v-slot="{ errors }"
                              rules="required"
                            >
                              <label
                                >{{
                                  $t(
                                    "container.beneficiary_management.beneficiary_list.age"
                                  )
                                }}
                              </label>
                              <v-text-field
                                v-model="data.age"
                                outlined
                                type="number"
                                required
                                readonly
                                :error="errors[0] ? true : false"
                                :error-messages="errors[0]"
                              >
                              </v-text-field>
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="6" lg="6">
                            <ValidationProvider
                              name="Gender"
                              vid="gender"
                              v-slot="{ errors }"
                              rules="required"
                            >
                              <label
                                >{{
                                  $t(
                                    "container.beneficiary_management.beneficiary_list.gender"
                                  )
                                }}
                              </label>
                              <v-text-field
                                v-model="data.gender.value_en"
                                outlined
                                required
                                readonly
                                :error="errors[0] ? true : false"
                                :error-messages="errors[0]"
                              >
                              </v-text-field>
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="6" lg="6">
                            <ValidationProvider
                              name="Education Status"
                              vid="education_status"
                              rules="required"
                              v-slot="{ errors }"
                            >
                              <label
                                >{{
                                  $t(
                                    "container.beneficiary_management.beneficiary_list.education_status"
                                  )
                                }}
                              </label>
                              <v-text-field
                                v-model="data.education_status"
                                outlined
                                readonly
                                :error="errors[0] ? true : false"
                                :error-messages="errors[0]"
                              >
                              </v-text-field>
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="6" lg="6">
                            <ValidationProvider
                              name="Profession"
                              vid="profession"
                              v-slot="{ errors }"
                            >
                              <label
                                >{{
                                  $t(
                                    "container.beneficiary_management.beneficiary_list.profession"
                                  )
                                }}
                              </label>
                              <v-text-field
                                v-model="data.profession"
                                outlined
                                readonly
                                :error="errors[0] ? true : false"
                                :error-messages="errors[0]"
                              >
                              </v-text-field>
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="6" lg="6">
                            <ValidationProvider
                              name="Identification Mark"
                              vid="identification_mark"
                              v-slot="{ errors }"
                            >
                              <label
                                >{{
                                  $t(
                                    "container.beneficiary_management.beneficiary_list.identification_mark"
                                  )
                                }}
                              </label>
                              <v-text-field
                                v-model="data.identification_mark"
                                outlined
                                readonly
                                :error="errors[0] ? true : false"
                                :error-messages="errors[0]"
                              >
                              </v-text-field>
                            </ValidationProvider>
                          </v-col>
                        </v-row>
                      </div>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                  <!-- Personal Information end-->

                  <!-- 3rd Expansion panel -->
                  <!-- Contact Information -->
                  <v-expansion-panel class="mt-4">
                    <v-expansion-panel-header color="primary">
                      <h3 class="white--text">
                        {{
                          $t(
                            "container.beneficiary_management.beneficiary_list.contact_info"
                          )
                        }}
                      </h3>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content class="mt-5">
                      <v-row>
                        <v-col cols="12" class="text-center">
                          <v-chip
                            color="success"
                            class="text-uppercase"
                            label
                            >{{
                              $t(
                                "container.beneficiary_management.beneficiary_list.present_address"
                              )
                            }}</v-chip
                          >
                        </v-col>
                        <!-- {{ permanent_location }}  -->
                        <v-col
                          lg="6"
                          md="6"
                          cols="12"
                          v-if="data.currentDivision"
                        >
                          <v-text-field
                            v-model="data.currentDivision.name_en"
                            outlined
                            readonly
                            :label="
                              $t(
                                'container.system_config.demo_graphic.division.division'
                              )
                            "
                          >
                          </v-text-field>
                        </v-col>
                        <v-col
                          lg="6"
                          md="6"
                          cols="12"
                          v-if="data.currentDistrict"
                        >
                          <v-text-field
                            v-model="data.currentDistrict.name_en"
                            outlined
                            readonly
                            :label="
                              $t(
                                'container.system_config.demo_graphic.district.district'
                              )
                            "
                          >
                          </v-text-field>
                        </v-col>

                        <v-col
                          lg="6"
                          md="6"
                          cols="12"
                          v-if="data.currentUpazila"
                        >
                          <v-text-field
                            v-model="data.currentUpazila.name_en"
                            outlined
                            readonly
                            :label="
                              $t(
                                'container.system_config.demo_graphic.ward.upazila'
                              )
                            "
                          >
                          </v-text-field>
                        </v-col>

                        <v-col
                          lg="6"
                          md="6"
                          cols="12"
                          v-if="data.currentCityCorporation"
                        >
                          <v-text-field
                            v-model="data.currentCityCorporation.name_en"
                            outlined
                            readonly
                            :label="
                              $t(
                                'container.system_config.demo_graphic.ward.city'
                              )
                            "
                          >
                          </v-text-field>
                        </v-col>
                        <v-col
                          lg="6"
                          md="6"
                          cols="12"
                          v-if="data.currentDistrictPourashava"
                        >
                          <v-text-field
                            v-model="data.currentDistrictPourashava.name_en"
                            outlined
                            readonly
                            :label="
                              $t(
                                'container.system_config.demo_graphic.ward.dist_pouro'
                              )
                            "
                          >
                          </v-text-field>
                        </v-col>

                        <v-col lg="6" md="6" cols="12" v-if="data.currentThana">
                          <v-text-field
                            v-model="data.currentThana.name_en"
                            outlined
                            readonly
                            :label="
                              $t(
                                'container.system_config.demo_graphic.ward.thana'
                              )
                            "
                          >
                          </v-text-field>
                        </v-col>

                        <v-col
                          lg="6"
                          md="6"
                          cols="12"
                          v-if="data.currentPourashava"
                        >
                          <v-text-field
                            v-model="data.currentPourashava.name_en"
                            outlined
                            readonly
                            :label="
                              $t(
                                'container.system_config.demo_graphic.ward.pouro'
                              )
                            "
                          >
                          </v-text-field>
                        </v-col>

                        <v-col lg="6" md="6" cols="12" v-if="data.currentUnion">
                          <v-text-field
                            v-model="data.currentUnion.name_en"
                            outlined
                            readonly
                            :label="
                              $t(
                                'container.system_config.demo_graphic.ward.union'
                              )
                            "
                          >
                          </v-text-field>
                        </v-col>
                        <v-col lg="6" md="6" cols="12" v-if="data.currentWard">
                          <v-text-field
                            v-model="data.currentWard.name_en"
                            outlined
                            readonly
                            :label="
                              $t(
                                'container.system_config.demo_graphic.ward.ward'
                              )
                            "
                          >
                          </v-text-field>
                        </v-col>

                        <v-col
                          lg="6"
                          md="6"
                          cols="12"
                          v-if="data.current_post_code"
                        >
                          <v-text-field
                            v-model="data.current_post_code"
                            outlined
                            readonly
                            :label="
                              $t(
                                'container.system_config.demo_graphic.ward.post_code'
                              )
                            "
                          >
                          </v-text-field>
                        </v-col>

                        <v-col
                          lg="6"
                          md="6"
                          cols="12"
                          v-if="data.current_address"
                        >
                          <v-text-field
                            v-model="data.current_address"
                            outlined
                            readonly
                            :label="
                              $t(
                                'container.system_config.demo_graphic.ward.address'
                              )
                            "
                          >
                          </v-text-field>
                        </v-col>
                        <v-col lg="6" md="6" cols="12" v-if="data.mobile">
                          <v-text-field
                            v-model="data.mobile"
                            outlined
                            readonly
                            :label="
                              $t(
                                'container.system_config.demo_graphic.ward.mobile'
                              )
                            "
                          >
                          </v-text-field>
                        </v-col>
                      </v-row>

                      <v-row>
                        <v-col cols="12" class="text-center">
                          <v-chip
                            color="success"
                            class="text-uppercase"
                            label
                            >{{
                              $t(
                                "container.beneficiary_management.beneficiary_list.permanent_address"
                              )
                            }}</v-chip
                          >
                        </v-col>

                        <v-col
                          lg="6"
                          md="6"
                          cols="12"
                          v-if="data.permanentDivision"
                        >
                          <v-text-field
                            v-model="data.permanentDivision.name_en"
                            outlined
                            readonly
                            :label="
                              $t(
                                'container.system_config.demo_graphic.division.division'
                              )
                            "
                          >
                          </v-text-field>
                        </v-col>
                        <v-col
                          lg="6"
                          md="6"
                          cols="12"
                          v-if="data.permanentDistrict"
                        >
                          <v-text-field
                            v-model="data.permanentDistrict.name_en"
                            outlined
                            readonly
                            :label="
                              $t(
                                'container.system_config.demo_graphic.district.district'
                              )
                            "
                          >
                          </v-text-field>
                        </v-col>

                        <v-col
                          lg="6"
                          md="6"
                          cols="12"
                          v-if="data.permanentUpazila"
                        >
                          <v-text-field
                            v-model="data.permanentUpazila.name_en"
                            outlined
                            readonly
                            :label="
                              $t(
                                'container.system_config.demo_graphic.ward.upazila'
                              )
                            "
                          >
                          </v-text-field>
                        </v-col>

                        <v-col
                          lg="6"
                          md="6"
                          cols="12"
                          v-if="data.permanentCityCorporation"
                        >
                          <v-text-field
                            v-model="data.permanentCityCorporation.name_en"
                            outlined
                            readonly
                            :label="
                              $t(
                                'container.system_config.demo_graphic.ward.city'
                              )
                            "
                          >
                          </v-text-field>
                        </v-col>
                        <v-col
                          lg="6"
                          md="6"
                          cols="12"
                          v-if="data.permanentDistrictPourashava"
                        >
                          <v-text-field
                            v-model="data.permanentDistrictPourashava.name_en"
                            outlined
                            readonly
                            :label="
                              $t(
                                'container.system_config.demo_graphic.ward.dist_pouro'
                              )
                            "
                          >
                          </v-text-field>
                        </v-col>

                        <v-col
                          lg="6"
                          md="6"
                          cols="12"
                          v-if="data.permanentThana"
                        >
                          <v-text-field
                            v-model="data.permanentThana.name_en"
                            outlined
                            readonly
                            :label="
                              $t(
                                'container.system_config.demo_graphic.ward.thana'
                              )
                            "
                          >
                          </v-text-field>
                        </v-col>

                        <v-col
                          lg="6"
                          md="6"
                          cols="12"
                          v-if="data.permanentPourashava"
                        >
                          <v-text-field
                            v-model="data.permanentPourashava.name_en"
                            outlined
                            readonly
                            :label="
                              $t(
                                'container.system_config.demo_graphic.ward.pouro'
                              )
                            "
                          >
                          </v-text-field>
                        </v-col>

                        <v-col
                          lg="6"
                          md="6"
                          cols="12"
                          v-if="data.permanentUnion"
                        >
                          <v-text-field
                            v-model="data.permanentUnion.name_en"
                            outlined
                            readonly
                            :label="
                              $t(
                                'container.system_config.demo_graphic.ward.union'
                              )
                            "
                          >
                          </v-text-field>
                        </v-col>
                        <v-col
                          lg="6"
                          md="6"
                          cols="12"
                          v-if="data.permanentWard"
                        >
                          <v-text-field
                            v-model="data.permanentWard.name_en"
                            outlined
                            readonly
                            :label="
                              $t(
                                'container.system_config.demo_graphic.ward.ward'
                              )
                            "
                          >
                          </v-text-field>
                        </v-col>

                        <v-col
                          lg="6"
                          md="6"
                          cols="12"
                          v-if="data.permanent_post_code"
                        >
                          <v-text-field
                            v-model="data.permanent_post_code"
                            outlined
                            readonly
                            :label="
                              $t(
                                'container.system_config.demo_graphic.ward.post_code'
                              )
                            "
                          >
                          </v-text-field>
                        </v-col>

                        <v-col
                          lg="6"
                          md="6"
                          cols="12"
                          v-if="data.permanent_address"
                        >
                          <v-text-field
                            v-model="data.permanent_address"
                            outlined
                            readonly
                            :label="
                              $t(
                                'container.system_config.demo_graphic.ward.address'
                              )
                            "
                          >
                          </v-text-field>
                        </v-col>

                        <v-col
                          lg="6"
                          md="6"
                          cols="12"
                          v-if="data.permanent_mobile"
                        >
                          <v-text-field
                            v-model="data.permanent_mobile"
                            outlined
                            readonly
                            :label="
                              $t(
                                'container.system_config.demo_graphic.ward.mobile'
                              )
                            "
                          >
                          </v-text-field>
                        </v-col>
                      </v-row>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                  <!-- Contact Information End -->
                  <!-- Expansion panel 5 End -->
                  <!-- Nominee Information -->
                  <v-expansion-panel class="mb-4">
                    <v-expansion-panel-header color="primary">
                      <h3 class="white--text">
                        {{
                          $t(
                            "container.beneficiary_management.beneficiary_list.nominee_info"
                          )
                        }}
                      </h3>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content class="mt-5">
                      <div class="pa-2 mb-4">
                        <v-row>
                          <v-col lg="6" md="6" cols="12" v-if="data.nominee_en">
                            <v-text-field
                              v-model="data.nominee_en"
                              outlined
                              readonly
                              :label="
                                $t(
                                  'container.beneficiary_management.beneficiary_list.nominee_name_en'
                                )
                              "
                            >
                            </v-text-field>
                          </v-col>

                          <v-col lg="6" md="6" cols="12" v-if="data.nominee_bn">
                            <v-text-field
                              v-model="data.nominee_bn"
                              outlined
                              readonly
                              :label="
                                $t(
                                  'container.beneficiary_management.beneficiary_list.nominee_name_bn'
                                )
                              "
                            >
                            </v-text-field>
                          </v-col>

                          <v-col
                            lg="6"
                            md="6"
                            cols="12"
                            v-if="data.nominee_verification_number"
                          >
                            <v-text-field
                              v-model="data.nominee_verification_number"
                              outlined
                              readonly
                              :label="
                                $t(
                                  'container.beneficiary_management.beneficiary_list.nid_or_brn_number'
                                )
                              "
                            >
                            </v-text-field>
                          </v-col>

                          <v-col
                            lg="6"
                            md="6"
                            cols="12"
                            v-if="data.nominee_nationality"
                          >
                            <v-text-field
                              v-model="data.nominee_nationality"
                              outlined
                              readonly
                              :label="
                                $t(
                                  'container.beneficiary_management.beneficiary_list.nationality'
                                )
                              "
                            >
                            </v-text-field>
                          </v-col>

                          <v-col
                            lg="6"
                            md="6"
                            cols="12"
                            v-if="data.nominee_relation_with_beneficiary"
                          >
                            <v-text-field
                              v-model="data.nominee_relation_with_beneficiary"
                              outlined
                              readonly
                              :label="
                                $t(
                                  'container.beneficiary_management.beneficiary_list.relationship_with_beneficiary'
                                )
                              "
                            >
                            </v-text-field>
                          </v-col>

                          <v-col
                            lg="6"
                            md="6"
                            cols="12"
                            v-if="data.nominee_address"
                          >
                            <v-text-field
                              v-model="data.nominee_address"
                              outlined
                              readonly
                              :label="
                                $t(
                                  'container.beneficiary_management.beneficiary_list.address'
                                )
                              "
                            >
                            </v-text-field>
                          </v-col>

                          <v-col cols="6" lg="6" md="6">
                            <v-img
                              :src="data.nomineeImageUrl"
                              style="
                                width: 150px;
                                height: 150px;
                                border: 1px solid #ccc;
                              "
                              class="mb-5"
                              v-if="data.nomineeImageUrl"
                            ></v-img>
                            <v-img
                              src="data.nomineeImageUrl"
                              v-if="!data.nomineeImageUrl"
                              style="
                                width: 200px;
                                height: 200px;
                                border: 1px solid #ccc;
                              "
                              class="mb-5"
                            ></v-img>
                            <h3>
                              {{
                                $t(
                                  "container.beneficiary_management.beneficiary_list.image"
                                )
                              }}
                            </h3>
                          </v-col>
                          <v-col cols="6" align-self="end" lg="6">
                            <v-img
                              :src="data.nomineeSignUrl"
                              style="
                                width: 150px;
                                height: 80px;
                                border: 1px solid #ccc;
                              "
                              class="mb-5"
                              v-if="data.nomineeSignUrl"
                            ></v-img>
                            <v-img
                              v-if="!data.nomineeImageUrl"
                              :src="data.nomineeSignUrl"
                              style="
                                width: 200px;
                                height: 80px;
                                border: 1px solid #ccc;
                              "
                              class="mb-5"
                            ></v-img>
                            <h3>
                              {{
                                $t(
                                  "container.beneficiary_management.beneficiary_list.signature"
                                )
                              }}
                            </h3>
                          </v-col>
                        </v-row>
                      </div>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                  <!-- Nominee Information End -->
                  <!-- 4th Expansion panel -->
                  <!-- For Office Use -->
                  <v-expansion-panel class="ma-4">
                    <v-expansion-panel-header color="primary">
                      <h3 class="white--text">
                        {{
                          $t(
                            "container.beneficiary_management.beneficiary_list.for_office_use"
                          )
                        }}
                      </h3>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content class="mt-5">
                      <div class="pa-2 mb-4">
                        <v-row>
                          <v-col
                            lg="6"
                            md="6"
                            cols="12"
                            v-if="data.account_number"
                          >
                            <v-text-field
                              v-model="data.account_number"
                              outlined
                              readonly
                              :label="
                                $t(
                                  'container.beneficiary_management.beneficiary_list.beneficary_bank_acc_number'
                                )
                              "
                            >
                            </v-text-field>
                          </v-col>
                          <v-col
                            lg="6"
                            md="6"
                            cols="12"
                            v-if="data.account_name"
                          >
                            <v-text-field
                              v-model="data.account_name"
                              outlined
                              readonly
                              :label="
                                $t(
                                  'container.beneficiary_management.beneficiary_list.account_name'
                                )
                              "
                            >
                            </v-text-field>
                          </v-col>

                          <v-col
                            lg="6"
                            md="6"
                            cols="12"
                            v-if="data.account_owner"
                          >
                            <v-text-field
                              v-model="data.account_owner"
                              outlined
                              readonly
                              :label="
                                $t(
                                  'container.beneficiary_management.beneficiary_list.account_owner'
                                )
                              "
                            >
                            </v-text-field>
                          </v-col>
                          <v-col
                            lg="6"
                            md="6"
                            cols="12"
                            v-if="data.account_owner"
                          >
                            <v-text-field
                            v-model="data.monthly_allowance"
                              outlined
                              readonly
                              :label="
                                $t(
                                  'container.beneficiary_management.beneficiary_list.monthly_honorarium_amount'
                                )
                              "
                            >
                            </v-text-field>
                          </v-col>

                          <v-col
                            lg="6"
                            md="6"
                            cols="12"
                            v-if="data.financialYear"
                          >
                            <v-text-field
                              v-model="data.financialYear.financial_year"
                              outlined
                              readonly
                              :label="
                                $t(
                                  'container.beneficiary_management.beneficiary_list.financial_year'
                                )
                              "
                            >
                            </v-text-field>
                          </v-col>
                        </v-row>
                      </div>

                      <v-row>
                        <v-col
                          v-for="(field, index) in allowance_filed"
                          :key="index"
                          cols="6"
                          lg="6"
                        >
                          <template
                            v-if="
                              field.type === 'number' || field.type === 'text'
                            "
                          >
                            <label>{{ field.name_en }}</label>
                            <v-text-field
                              v-model="field.pivot.value"
                              outlined
                              readonly
                            >
                            </v-text-field>
                          </template>
                          <template v-if="field.type === 'dropdown'">
                            <label>{{ field.name_en }}</label>
                            <v-text-field
                              v-model="field.allow_addi_field_values[0].value"
                              outlined
                              readonly
                            >
                            </v-text-field>
                          </template>
                          <template v-if="field.type === 'checkbox'">
                            <label>{{ field.name_en }}</label>
                            <v-text-field
                              :value="
                                concatenateCheckboxValues(
                                  field.allow_addi_field_values
                                )
                              "
                              outlined
                              readonly
                            ></v-text-field>
                          </template>
                        </v-col>
                      </v-row>

                      <!-- <template v-else-if="field.type === 'checkbox'">
            <v-checkbox
              v-for="(value, valueIndex) in field.allow_addi_field_values"
              :key="valueIndex"
              :label="value.value"
              v-model="fieldValues[field.id]"
            ></v-checkbox>
          </template>
          <template v-else-if="field.type === 'dropdown'">
            <v-select
              v-model="fieldValues[field.id]"
              :items="field.allow_addi_field_values.map(item => item.value)"
              label="Select"
            ></v-select>
          </template> -->
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                  <!-- For Office Use End -->
                  <!-- 5th Expansion panel -->
                  <!-- Other Information of Eligibility -->
                  <!-- <v-expansion-panel class="mb-4">
                    <v-expansion-panel-header color="primary">
                      <h3 class="white--text">
                        {{ $t("container.beneficiary_management.beneficiary_list.other_info_of_eligibility") }}
                      </h3>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content class="mt-5">
                      <div class="pa-2 mb-4">
                        <v-row>
                          <v-col cols="12" lg="6" md="6" v-for="(variable, indexPMT) in data.poverty_score"
                            :key="indexPMT">
                            <v-select outlined readonly :label="variable.name_en" :items="variable.children"
                              item-text="name_en"></v-select>
                          </v-col>
                        </v-row>
                      </div>

                      <div class="pa-2 mb-4">
                        <v-row>
                          <v-col v-for="(variables, indexPMT) in data.poverty_score" cols="6" lg="6" :key="indexPMT">
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
                                  :error-messages="errors[0]" outlined required v-model="data.application_pmt[indexPMT].sub_variables
                                    " :items="[
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
                                  :error-messages="errors[0]" outlined required v-model="data.application_pmt[indexPMT].sub_variables
                                    " :items="variables.children" item-value="id" item-text="name_en">
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
                                  :error="errors[0] ? true : false" :error-messages="errors[0]" outlined required v-model="data.application_pmt[indexPMT].sub_variables
                                    " :items="variables.children" item-value="id" item-text="name_en">
                                </v-select>
                              </ValidationProvider>
                            </template>
                          </v-col>
                        </v-row>
                      </div>
                    </v-expansion-panel-content>
                  </v-expansion-panel> -->
                  <!-- Other Information of Eligibility end-->
                </v-expansion-panels>
              </div>
              <div class="d-inline d-flex justify-end">
                <v-btn
                  type="submit"
                  flat
                  router
                  to="/beneficiary-management/beneficiary-info"
                  :loading="loading"
                  class="custom-btn-width py-2 mr-2"
                >
                  {{ $t("container.list.back") }}
                </v-btn>
              </div>
            </v-card>
          </form>
        </ValidationObserver>
      </v-col>
    </v-row>

    <FooterBar />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import FooterBar from "@/components/Common/FooterBar.vue";
import { extend, ValidationProvider, ValidationObserver } from "vee-validate";
import axios from "axios";
import { required } from "vee-validate/dist/rules";
import Form from "vform";

export default {
  title: "CTM - Beneficiary Information Detail",
  data() {
    return {
      applications: [],
      panel: [0, 1, 2, 3, 4, 5, 6],
      programs: [],
      classes: [],
      loading: false,
      // divisions: [],
      districts: [],
      thanas: [],
      cities: [],
      unions: [],
      district_poros: [],
      city_thanas: [],
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
      permanent_district_poros: [],
      permanent_city_thanas: [],
      permanent_locationType: [],
      imageUrlFetch: null,
      // imageUrlFetch,
      // imageUrlFetch,
      UrlFetch: null,
      education_status: [
        "Illiterate",
        "Literate",
        "JSC",
        "SSC",
        "HSC",
        "Graduate",
        "Post Graduate",
        "Other",
      ],
      govt_programs: [
        "Old Age Allowance Program",
        "Disability Allowance Program",
        "Widow And Husband Adopted Allowance program",
        "Freedom Fighter Honorary Allowance",
        "No Allowance",
        "Other (specify)",
      ],
      marital_status: [
        "Married",
        "UnMarried",
        "Widow",
        "Widower",
        "Husband Abondoner",
        "Divorced",
        "Spouse Separated",
        "Polygamy",
      ],
      health_status: [
        "Totally Disabled",
        "Sick",
        "Insane",
        "Disabled",
        "Partially Powerless",
        "Other (specify)",
      ],
      health_status_value: {
        totally_disabled: true,
        sick: false,
        insane: true,
        disabled: false,
        partially_powerless: false,
        other_specify: false,
      },
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

      mobile_ownership: ["No Mobile Phone", "Family Memeber", "Others"],
      religion: ["Islam", "Hindu", "Buddhist", "Christian"],
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
      permanent_location: [],
      current_location: [],
      allowance_filed: [],

      data: {
        verification_type: null,

        division_id: null,
        district_id: null,
        thana_id: null,
        union_id: null,
        city_id: null,
        city_thana_id: null,
        district_pouro_id: null,
        pouro_id: null,
        ward_id: null,
        location_type: null,
        sub_location_type: null,
        permanent_district_pouro_id: null,
        current_post_code: null,
        current_address: null,
        imageUrl: null,
        signUrl: null,
        nomineeImageUrl: null,
        nomineeSignUrl: null,
        accountNumber: null,
        accountName: null,
        accountOwner: null,
      },

      permanent_location: [],

      checkbox: false,
      checkboxNomineeAddress: false,
      // nomineeImageUrl: null,
      programName: null,
      // nomineeSignUrl: null,
      programDetails: null,
      PMTVariables: [],
    };
  },
  computed: {
    ...mapState({
      divisions: (state) => state.Division.divisions,
    }),

    isRadioGroupReadonly() {
      return this.data.verification_type !== null;
    },
  },

  components: {
    ValidationProvider,
    ValidationObserver,
    FooterBar,
  },
  watch: {
    "$i18n.locale": "updateHeaderTitle",
    menu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
  },

  methods: {
    updateHeaderTitle() {
      const title = this.$t(
        "container.beneficiary_management.beneficiary_list.beneficiary_details"
      );
      this.$store.commit("setHeaderTitle", title);
    },
    async getBeneficiaryDetailsById() {
      try {
        this.$axios
          .get(`/admin/beneficiary/show/${this.$route.params.id}`, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            if (res.data?.success) {
              let item = res.data.data;
              this.data = res.data.data;

              this.data.imageUrl = item?.image;
              this.data.signUrl = item?.signature;

              this.data.nomineeImageUrl = item?.nominee_image;
              this.data.nomineeSignUrl = item?.nominee_signature;

              console.log("division_id__", this.data.division_id);
            } else {
              this.$toast.error("Record not found!");
              this.$router.push({ name: "Beneficiary_List" });
            }
          })
          .catch((err) => {
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
    concatenateCheckboxValues(checkboxValues) {
      return checkboxValues.map((value) => value.value).join(", ");
    },
    ...mapActions({
      GetAllDivisions: "Division/GetAllDivisions",
    }),
  },
  beforeMount() {
    this.updateHeaderTitle();
  },
  created() {
    this.GetAllDivisions();
    this.getBeneficiaryDetailsById();
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
</style>
