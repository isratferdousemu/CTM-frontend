<template>
  <div id="application_view">
    <v-row class="mx-5 my-5 mt-5">
      <v-col class="mt-5" cols="12">
        <ValidationObserver ref="form" v-slot="{ invalid }">
          <form @submit.prevent="submitApplication()">
            <v-card class="pa-5 px-10 mb-4">
              <v-row>
                <v-col cols="6" lg="6">
                  <v-row class="mx-4">
                    <v-col cols="4" lg="4">
                      <label
                        >{{
                          $t(
                            "container.application_selection.application.program"
                          )
                        }}
                      </label></v-col
                    >
                    <v-col cols="8" lg="8">
                      :<template>
                        <span style="20px">
                          {{
                            language === "bn"
                              ? beneficiary.program.name_bn
                              : beneficiary.program.name_en
                          }}
                        </span>
                      </template>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="6" lg="6"> </v-col>
              </v-row>

              <div>
                <!-- Applicant Verification -->
                <v-card class="mt-5">
                  <v-card-title style="background-color: #1976d2; color: white">
                    {{
                      $t(
                        "container.application_selection.application.applicant_verification"
                      )
                    }}
                  </v-card-title>

                  <v-card-text class="mt-5">
                    <template>
                      <ValidationProvider
                        name="program"
                        vid="verification_type"
                        rules="required"
                        v-slot="{ errors }"
                      >
                        <v-radio-group
                          :readonly="isRadioGroupReadonly"
                          v-model="beneficiary.verification_type"
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
                        <v-row>
                          <v-col cols="4" lg="4">
                            <label>
                              <span v-if="beneficiary.verification_type == 1">
                                {{
                                  $t(
                                    "container.application_selection.application.nid"
                                  )
                                }}
                              </span>
                              <span
                                v-else-if="beneficiary.verification_type == 2"
                              >
                                {{
                                  $t(
                                    "container.application_selection.application.brn"
                                  )
                                }}
                              </span>
                              <span v-else>
                                {{
                                  $t(
                                    "container.beneficiary_management.beneficiary_list.nid"
                                  )
                                }}
                              </span>
                            </label></v-col
                          >
                          <v-col cols="8" lg="8">
                            :<template>
                              <span style="20px">
                                {{ beneficiary.verification_number }}
                              </span>
                            </template>
                          </v-col>
                        </v-row>
                      </v-col>

                      <v-col>
                        <v-row>
                          <v-col cols="4" lg="4">
                            <label
                              >{{
                                $t(
                                  "container.application_selection.application.date_of_birth"
                                )
                              }}
                            </label></v-col
                          >
                          <v-col cols="8" lg="8">
                            :<template>
                              <span style="20px">
                                {{ beneficiary.date_of_birth }}
                              </span>
                            </template>
                          </v-col>
                        </v-row>
                      </v-col>
                    </V-row>
                  </v-card-text>
                </v-card>
                <v-card class="mt-5">
                  <v-card-title style="background-color: #1976d2; color: white">
                    {{
                      $t(
                        "container.application_selection.application.personal_info"
                      )
                    }}
                  </v-card-title>

                  <v-card-text class="mt-5">
                    <div class="pa-2 mb-4">
                      <v-row>
                        <v-col cols="6" lg="6">
                          <v-img
                            :src="beneficiary.imageUrl"
                            style="
                              width: 200px;
                              height: 200px;
                              border: 1px solid #ccc;
                            "
                            class="mb-5"
                            v-if="beneficiary.imageUrl"
                          ></v-img>
                        </v-col>
                        <v-col cols="6" align-self="end" lg="6">
                          <v-img
                            :src="beneficiary.signUrl"
                            style="
                              width: 200px;
                              height: 80px;
                              border: 1px solid #ccc;
                            "
                            class="mb-5"
                            v-if="beneficiary.signUrl"
                          ></v-img>
                        </v-col>
                        <v-col cols="6" lg="6">
                          <v-row>
                            <v-col cols="4" lg="4">
                              <label
                                >{{
                                  $t(
                                    "container.application_selection.application.name_bn"
                                  )
                                }}
                              </label></v-col
                            >
                            <v-col cols="8" lg="8">
                              :<template>
                                <span style="20px">
                                  {{ beneficiary.name_bn }}
                                </span>
                              </template>
                            </v-col>
                          </v-row>
                        </v-col>

                        <v-col cols="6" lg="6">
                          <v-row>
                            <v-col cols="4" lg="4">
                              <label
                                >{{
                                  $t(
                                    "container.application_selection.application.name_en"
                                  )
                                }}
                              </label></v-col
                            >
                            <v-col cols="8" lg="8">
                              :<template>
                                <span style="20px">
                                  {{ beneficiary.name_en }}
                                </span>
                              </template>
                            </v-col>
                          </v-row>
                        </v-col>
                        <v-col cols="6" lg="6">
                          <v-row>
                            <v-col cols="4" lg="4">
                              <label>{{
                                $t(
                                  "container.application_selection.application.father_name_bn"
                                )
                              }}</label></v-col
                            >
                            <v-col cols="8" lg="8">
                              :<template>
                                <span style="20px">
                                  {{ beneficiary.father_name_bn }}
                                </span>
                              </template>
                            </v-col>
                          </v-row>
                        </v-col>
                        <v-col cols="6" lg="6">
                          <v-row>
                            <v-col cols="4" lg="4">
                              <label
                                >{{
                                  $t(
                                    "container.application_selection.application.father_name_en"
                                  )
                                }}
                              </label></v-col
                            >
                            <v-col cols="8" lg="8">
                              :<template>
                                <span style="20px">
                                  {{ beneficiary.father_name_en }}
                                </span>
                              </template>
                            </v-col>
                          </v-row>
                        </v-col>
                        <v-col cols="6" lg="6">
                          <v-row>
                            <v-col cols="4" lg="4">
                              <label
                                >{{
                                  $t(
                                    "container.application_selection.application.mother_name_bn"
                                  )
                                }}
                              </label></v-col
                            >
                            <v-col cols="8" lg="8">
                              :<template>
                                <span style="20px">
                                  {{ beneficiary.mother_name_bn }}
                                </span>
                              </template>
                            </v-col>
                          </v-row>
                        </v-col>
                        <v-col cols="6" lg="6">
                          <v-row>
                            <v-col cols="4" lg="4">
                              <label
                                >{{
                                  $t(
                                    "container.application_selection.application.mother_name_en"
                                  )
                                }}
                              </label></v-col
                            >
                            <v-col cols="8" lg="8">
                              :<template>
                                <span style="20px">
                                  {{ beneficiary.mother_name_en }}
                                </span>
                              </template>
                            </v-col>
                          </v-row>
                        </v-col>
                        <v-col cols="6" lg="6">
                          <v-row>
                            <v-col cols="4" lg="4">
                              <label
                                >{{
                                  $t(
                                    "container.system_config.allowance_program.marital_status"
                                  )
                                }}
                              </label></v-col
                            >
                            <v-col cols="8" lg="8">
                              :<template>
                                <span style="20px">
                                  {{ beneficiary.marital_status }}
                                </span>
                              </template>
                            </v-col>
                          </v-row>
                        </v-col>
                        <v-col cols="6" lg="6">
                          <v-row>
                            <v-col cols="4" lg="4">
                              <label
                                >{{
                                  $t(
                                    "container.application_selection.application.spouse_name_bn"
                                  )
                                }}
                              </label></v-col
                            >
                            <v-col cols="8" lg="8">
                              :<template>
                                <span style="20px">
                                  {{ beneficiary.spouse_name_bn }}
                                </span>
                              </template>
                            </v-col>
                          </v-row>
                        </v-col>

                        <v-col cols="6" lg="6">
                          <v-row>
                            <v-col cols="4" lg="4">
                              <label
                                >{{
                                  $t(
                                    "container.application_selection.application.spouse_name_en"
                                  )
                                }}
                              </label></v-col
                            >
                            <v-col cols="8" lg="8">
                              :<template>
                                <span style="20px">
                                  {{ beneficiary.spouse_name_en }}
                                </span>
                              </template>
                            </v-col>
                          </v-row>
                        </v-col>
                        <v-col cols="6" lg="6">
                          <v-row>
                            <v-col cols="4" lg="4">
                              <label
                                >{{
                                  $t(
                                    "container.application_selection.application.religion"
                                  )
                                }}
                              </label></v-col
                            >
                            <v-col cols="8" lg="8">
                              :<template>
                                <span style="20px">
                                  {{ beneficiary.religion }}
                                </span>
                              </template>
                            </v-col>
                          </v-row>
                        </v-col>
                        <v-col cols="6" lg="6">
                          <v-row>
                            <v-col cols="4" lg="4">
                              <label
                                >{{
                                  $t(
                                    "container.application_selection.application.mobile"
                                  )
                                }}
                              </label></v-col
                            >
                            <v-col cols="8" lg="8">
                              :<template>
                                <span style="20px">
                                  {{ beneficiary.mobile }}
                                </span>
                              </template>
                            </v-col>
                          </v-row>
                        </v-col>

                        <v-col cols="6" lg="6">
                          <v-row>
                            <v-col cols="4" lg="4">
                              <label
                                >{{
                                  $t(
                                    "container.application_selection.application.nationality"
                                  )
                                }}
                              </label></v-col
                            >
                            <v-col cols="8" lg="8">
                              :<template>
                                <span style="20px">
                                  {{ beneficiary.nationality }}
                                </span>
                              </template>
                            </v-col>
                          </v-row>
                        </v-col>
                        <v-col cols="6" lg="6">
                          <v-row>
                            <v-col cols="4" lg="4">
                              <label
                                >{{
                                  $t(
                                    "container.application_selection.application.age"
                                  )
                                }}
                              </label></v-col
                            >
                            <v-col cols="8" lg="8">
                              :<template>
                                <span style="20px">
                                  {{ beneficiary.age }}
                                </span>
                              </template>
                            </v-col>
                          </v-row>
                        </v-col>
                        <v-col cols="6" lg="6">
                          <v-row>
                            <v-col cols="4" lg="4">
                              <label
                                >{{
                                  $t(
                                    "container.system_config.allowance_program.gender"
                                  )
                                }}
                              </label></v-col
                            >
                            <v-col cols="8" lg="8">
                              :<template>
                                <span style="20px">
                                  {{
                                    language === "bn"
                                      ? beneficiary.gender.value_bn
                                      : beneficiary.gender.value_en
                                  }}
                                </span>
                              </template>
                            </v-col>
                          </v-row>
                        </v-col>
                        <v-col cols="6" lg="6">
                          <v-row>
                            <v-col cols="4" lg="4">
                              <label
                                >{{
                                  $t(
                                    "container.application_selection.application.education_status"
                                  )
                                }}
                              </label></v-col
                            >
                            <v-col cols="8" lg="8">
                              :<template>
                                <span style="20px">
                                  {{ beneficiary.education_status }}
                                </span>
                              </template>
                            </v-col>
                          </v-row>
                        </v-col>
                        <v-col cols="6" lg="6">
                          <v-row>
                            <v-col cols="4" lg="4">
                              <label
                                >{{
                                  $t(
                                    "container.application_selection.application.profession"
                                  )
                                }}
                              </label></v-col
                            >
                            <v-col cols="8" lg="8">
                              :<template>
                                <span style="20px">
                                  {{ beneficiary.profession }}
                                </span>
                              </template>
                            </v-col>
                          </v-row>
                        </v-col>
                        <v-col cols="6" lg="6">
                          <v-row>
                            <v-col cols="4" lg="4">
                              <label
                                >{{
                                  $t(
                                    "container.application_selection.application.identification_mark"
                                  )
                                }}
                              </label></v-col
                            >
                            <v-col cols="8" lg="8">
                              :<template>
                                <span style="20px">
                                  {{ beneficiary.identification_mark }}
                                </span>
                              </template>
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                    </div>
                  </v-card-text>
                </v-card>
                <!-- Personal Information end-->

                <!-- 3rd Expansion panel -->
                <!-- Contact Information -->

                <v-card class="mt-5">
                  <v-card-title style="background-color: #1976d2; color: white">
                    {{
                      $t(
                        "container.application_selection.application.contact_info"
                      )
                    }}
                  </v-card-title>

                  <v-card-text class="mt-5">
                    <v-row>
                      <v-col cols="12" class="text-center">
                        <v-chip color="success" class="text-uppercase" label>{{
                          $t(
                            "container.application_selection.application.present_address"
                          )
                        }}</v-chip>
                      </v-col>

                      <v-col lg="6" md="6" cols="12">
                        <v-row>
                          <v-col cols="4" lg="4">
                            <label
                              >{{
                                $t(
                                  "container.system_config.demo_graphic.division.division"
                                )
                              }}
                            </label></v-col
                          >
                          <v-col cols="8" lg="8">
                            :<template>
                              <span style="20px">
                                {{
                                  language == "bn"
                                    ? beneficiary.currentDivision.name_bn
                                    : beneficiary.currentDivision.name_en
                                }}
                              </span>
                            </template>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col lg="6" md="6" cols="12">
                        <v-row>
                          <v-col cols="4" lg="4">
                            <label
                              >{{
                                $t(
                                  "container.system_config.demo_graphic.district.district"
                                )
                              }}
                            </label></v-col
                          >
                          <v-col cols="8" lg="8">
                            :<template>
                              <span style="20px">
                                {{
                                  language == "bn"
                                    ? beneficiary.currentDistrict.name_bn
                                    : beneficiary.currentDistrict.name_en
                                }}
                              </span>
                            </template>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col lg="6" md="6" cols="12">
                        <v-row>
                          <v-col cols="4" lg="4">
                            <label
                              >{{ $t("container.list.location_type") }}
                            </label></v-col
                          >
                          <v-col cols="8" lg="8">
                            :<template>
                              <span style="20px">
                                {{
                                  language == "bn"
                                    ? location_type
                                    : location_type
                                }}
                              </span>
                            </template>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col
                        v-if="beneficiary.currentCityCorporation"
                        lg="6"
                        md="6"
                        cols="12"
                      >
                        <v-row>
                          <v-col cols="4" lg="4">
                            <label
                              >{{
                                $t(
                                  "container.system_config.demo_graphic.ward.city"
                                )
                              }}
                            </label></v-col
                          >
                          <v-col cols="8" lg="8">
                            :<template>
                              <span style="20px">
                                {{
                                  language == "bn"
                                    ? beneficiary.currentCityCorporation.name_bn
                                    : beneficiary.currentCityCorporation.name_en
                                }}
                              </span>
                            </template>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col
                        v-if="beneficiary.currentUpazila"
                        lg="6"
                        md="6"
                        cols="12"
                      >
                        <v-row>
                          <v-col cols="4" lg="4">
                            <label
                              >{{
                                $t(
                                  "container.system_config.demo_graphic.ward.upazila"
                                )
                              }}
                            </label></v-col
                          >
                          <v-col cols="8" lg="8">
                            :<template>
                              <span style="20px">
                                {{
                                  language == "bn"
                                    ? beneficiary.currentUpazila.name_bn
                                    : beneficiary.currentUpazila.name_en
                                }}
                              </span>
                            </template>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col
                        v-if="beneficiary.currentDistrictPourashava"
                        lg="6"
                        md="6"
                        cols="12"
                      >
                        <v-row>
                          <v-col cols="4" lg="4">
                            <label
                              >{{
                                $t(
                                  "container.system_config.demo_graphic.ward.dist_pouro"
                                )
                              }}
                            </label></v-col
                          >
                          <v-col cols="8" lg="8">
                            :<template>
                              <span style="20px">
                                {{
                                  language == "bn"
                                    ? beneficiary.currentDistrictPourashava
                                        .name_bn
                                    : beneficiary.currentDistrictPourashava
                                        .name_en
                                }}
                              </span>
                            </template>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col
                        v-if="beneficiary.currentThana"
                        lg="6"
                        md="6"
                        cols="12"
                      >
                        <v-row>
                          <v-col cols="4" lg="4">
                            <label
                              >{{
                                $t(
                                  "container.system_config.demo_graphic.ward.thana"
                                )
                              }}
                            </label></v-col
                          >
                          <v-col cols="8" lg="8">
                            :<template>
                              <span style="20px">
                                {{
                                  language == "bn"
                                    ? beneficiary.currentThana.name_bn
                                    : beneficiary.currentThana.name_en
                                }}
                              </span>
                            </template>
                          </v-col>
                        </v-row>
                      </v-col>

                      <v-col
                        v-if="beneficiary.currentUnion"
                        lg="6"
                        md="6"
                        cols="12"
                      >
                        <v-row>
                          <v-col cols="4" lg="4">
                            <label
                              >{{
                                $t(
                                  "container.system_config.demo_graphic.ward.union_pouro"
                                )
                              }}
                            </label></v-col
                          >
                          <v-col cols="8" lg="8">
                            :<template>
                              <span style="20px">
                                {{
                                  language == "bn"
                                    ? beneficiary.currentUnion.name_bn
                                    : beneficiary.currentUnion.name_en
                                }}
                              </span>
                            </template>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col
                        v-if="beneficiary.currentPourashava"
                        lg="6"
                        md="6"
                        cols="12"
                      >
                        <v-row>
                          <v-col cols="4" lg="4">
                            <label
                              >{{
                                $t(
                                  "container.system_config.demo_graphic.ward.union_pouro"
                                )
                              }}
                            </label></v-col
                          >
                          <v-col cols="8" lg="8">
                            :<template>
                              <span style="20px">
                                {{
                                  language == "bn"
                                    ? beneficiary.currentPourashava.name_bn
                                    : beneficiary.currentPourashava.name_en
                                }}
                              </span>
                            </template>
                          </v-col>
                        </v-row>
                      </v-col>

                      <v-col lg="6" md="6" cols="6">
                        <v-row>
                          <v-col cols="4" lg="4">
                            <label
                              >{{
                                $t(
                                  "container.system_config.demo_graphic.ward.ward"
                                )
                              }}
                            </label></v-col
                          >
                          <v-col cols="8" lg="8">
                            :<template>
                              <span style="20px">
                                {{
                                  language == "bn"
                                    ? beneficiary.currentWard.name_bn
                                    : beneficiary.currentWard.name_en
                                }}
                              </span>
                            </template>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col cols="6" lg="6">
                        <v-row>
                          <v-col cols="4" lg="4">
                            <label
                              >{{
                                $t(
                                  "container.system_config.demo_graphic.ward.post_code"
                                )
                              }}
                            </label></v-col
                          >
                          <v-col cols="8" lg="8">
                            :<template>
                              <span style="20px">
                                {{ beneficiary.current_post_code }}
                              </span>
                            </template>
                          </v-col>
                        </v-row>
                      </v-col>

                      <v-col cols="6" lg="6">
                        <v-row>
                          <v-col cols="4" lg="4">
                            <label
                              >{{
                                $t(
                                  "container.system_config.demo_graphic.ward.address"
                                )
                              }}
                            </label></v-col
                          >
                          <v-col cols="8" lg="8">
                            :<template>
                              <span style="20px">
                                {{ beneficiary.current_address }}
                              </span>
                            </template>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="12" class="text-center">
                        <v-chip color="success" class="text-uppercase" label
                          >{{
                            $t(
                              "container.application_selection.application.permanent_address"
                            )
                          }}
                        </v-chip>
                      </v-col>

                      <v-col lg="6" md="6" cols="12">
                        <v-row>
                          <v-col cols="4" lg="4">
                            <label
                              >{{
                                $t(
                                  "container.system_config.demo_graphic.division.division"
                                )
                              }}
                            </label></v-col
                          >
                          <v-col cols="8" lg="8">
                            :<template>
                              <span style="20px">
                                {{
                                  language == "bn"
                                    ? beneficiary.permanentDivision.name_bn
                                    : beneficiary.permanentDivision.name_en
                                }}
                              </span>
                            </template>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col lg="6" md="6" cols="12">
                        <v-row>
                          <v-col cols="4" lg="4">
                            <label
                              >{{
                                $t(
                                  "container.system_config.demo_graphic.district.district"
                                )
                              }}
                            </label></v-col
                          >
                          <v-col cols="8" lg="8">
                            :<template>
                              <span style="20px">
                                {{
                                  language == "bn"
                                    ? beneficiary.permanentDistrict.name_bn
                                    : beneficiary.permanentDistrict.name_en
                                }}
                              </span>
                            </template>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col lg="6" md="6" cols="12">
                        <v-row>
                          <v-col cols="4" lg="4">
                            <label
                              >{{ $t("container.list.location_type") }}
                            </label></v-col
                          >
                          <v-col cols="8" lg="8">
                            :<template>
                              <span style="20px">
                                {{
                                  language == "bn"
                                    ? location_type
                                    : location_type
                                }}
                              </span>
                            </template>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col
                        v-if="beneficiary.permanentCityCorporation"
                        lg="6"
                        md="6"
                        cols="12"
                      >
                        <v-row>
                          <v-col cols="4" lg="4">
                            <label
                              >{{
                                $t(
                                  "container.system_config.demo_graphic.ward.city"
                                )
                              }}
                            </label></v-col
                          >
                          <v-col cols="8" lg="8">
                            :<template>
                              <span style="20px">
                                {{
                                  language == "bn"
                                    ? beneficiary.permanentCityCorporation
                                        .name_bn
                                    : beneficiary.permanentCityCorporation
                                        .name_en
                                }}
                              </span>
                            </template>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col
                        v-if="beneficiary.permanentUpazila"
                        lg="6"
                        md="6"
                        cols="12"
                      >
                        <v-row>
                          <v-col cols="4" lg="4">
                            <label
                              >{{
                                $t(
                                  "container.system_config.demo_graphic.ward.upazila"
                                )
                              }}
                            </label></v-col
                          >
                          <v-col cols="8" lg="8">
                            :<template>
                              <span style="20px">
                                {{
                                  language == "bn"
                                    ? beneficiary.permanentUpazila.name_bn
                                    : beneficiary.permanentUpazila.name_en
                                }}
                              </span>
                            </template>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col
                        v-if="beneficiary.permanentDistrictPourashava"
                        lg="6"
                        md="6"
                        cols="12"
                      >
                        <v-row>
                          <v-col cols="4" lg="4">
                            <label
                              >{{
                                $t(
                                  "container.system_config.demo_graphic.ward.dist_pouro"
                                )
                              }}
                            </label></v-col
                          >
                          <v-col cols="8" lg="8">
                            :<template>
                              <span style="20px">
                                {{
                                  language == "bn"
                                    ? beneficiary.permanentDistrictPourashava
                                        .name_bn
                                    : beneficiary.permanentDistrictPourashava
                                        .name_en
                                }}
                              </span>
                            </template>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col
                        v-if="beneficiary.permanentThana"
                        lg="6"
                        md="6"
                        cols="12"
                      >
                        <v-row>
                          <v-col cols="4" lg="4">
                            <label
                              >{{
                                $t(
                                  "container.system_config.demo_graphic.ward.thana"
                                )
                              }}
                            </label></v-col
                          >
                          <v-col cols="8" lg="8">
                            :<template>
                              <span style="20px">
                                {{
                                  language == "bn"
                                    ? beneficiary.permanentThana.name_bn
                                    : beneficiary.permanentThana.name_en
                                }}
                              </span>
                            </template>
                          </v-col>
                        </v-row>
                      </v-col>

                      <v-col
                        v-if="beneficiary.permanentUnion"
                        lg="6"
                        md="6"
                        cols="12"
                      >
                        <v-row>
                          <v-col cols="4" lg="4">
                            <label
                              >{{
                                $t(
                                  "container.system_config.demo_graphic.ward.union_pouro"
                                )
                              }}
                            </label></v-col
                          >
                          <v-col cols="8" lg="8">
                            :<template>
                              <span style="20px">
                                {{
                                  language == "bn"
                                    ? beneficiary.permanentUnion.name_bn
                                    : beneficiary.permanentUnion.name_en
                                }}
                              </span>
                            </template>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col
                        v-if="beneficiary.permanentPourashava"
                        lg="6"
                        md="6"
                        cols="12"
                      >
                        <v-row>
                          <v-col cols="4" lg="4">
                            <label
                              >{{
                                $t(
                                  "container.system_config.demo_graphic.ward.union_pouro"
                                )
                              }}
                            </label></v-col
                          >
                          <v-col cols="8" lg="8">
                            :<template>
                              <span style="20px">
                                {{
                                  language == "bn"
                                    ? beneficiary.permanentPourashava.name_bn
                                    : beneficiary.permanentPourashava.name_en
                                }}
                              </span>
                            </template>
                          </v-col>
                        </v-row>
                      </v-col>

                      <v-col lg="6" md="6" cols="6">
                        <v-row>
                          <v-col cols="4" lg="4">
                            <label
                              >{{
                                $t(
                                  "container.system_config.demo_graphic.ward.ward"
                                )
                              }}
                            </label></v-col
                          >
                          <v-col cols="8" lg="8">
                            :<template>
                              <span style="20px">
                                {{
                                  language == "bn"
                                    ? beneficiary.permanentWard.name_bn
                                    : beneficiary.permanentWard.name_en
                                }}
                              </span>
                            </template>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col cols="6" lg="6">
                        <v-row>
                          <v-col cols="4" lg="4">
                            <label
                              >{{
                                $t(
                                  "container.system_config.demo_graphic.ward.post_code"
                                )
                              }}
                            </label></v-col
                          >
                          <v-col cols="8" lg="8">
                            :<template>
                              <span style="20px">
                                {{ beneficiary.permanent_post_code }}
                              </span>
                            </template>
                          </v-col>
                        </v-row>
                      </v-col>

                      <v-col cols="6" lg="6">
                        <v-row>
                          <v-col cols="4" lg="4">
                            <label
                              >{{
                                $t(
                                  "container.system_config.demo_graphic.ward.address"
                                )
                              }}
                            </label></v-col
                          >
                          <v-col cols="8" lg="8">
                            :<template>
                              <span style="20px">
                                {{ beneficiary.permanent_address }}
                              </span>
                            </template>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
                <!-- Contact Information End -->
                <!-- 4th Expansion panel -->
                <!-- Information According to the Program -->

                <!-- <v-card class="mt-5">

                                    <v-card-title style="background-color: #1976D2; color: white;">
                                        {{ language == 'bn' ? whole_program.name_bn : whole_program.name_en }} {{
                                            $t('container.application_selection.application.info') }}
                                    </v-card-title>
                                    <v-card-text class="mt-5">
                                        <v-row>
                                            <v-col v-for="(field, index) in formattedAllowanceValues" :key="index" cols="6"
                                                lg="6">
                                                <v-row>
                                                    <v-col cols="4" lg="4"> <label>{{ language == 'bn' ? field.label
                                                        .name_bn : field.label
                                                            .name_en }}
                                                        </label></v-col>
                                                    <v-col cols="8" lg="8">
                                                        :<template>
                                                            <span style="20px">
                                                                {{

                                                                    field.value }}
                                                            </span>
                                                        </template>
                                                    </v-col>
                                                </v-row>
                                            
                                            </v-col>
                                            <v-col v-for="(field, index) in allowance_filed" :key="index" cols="6" lg="6"
                                                v-if="field.type == 'text'">
                                                <v-row>
                                                    <v-col cols="4" lg="4"> <label>{{ language == 'bn' ? field
                                                        .name_bn : field.name_en }}
                                                        </label></v-col>
                                                    <v-col cols="8" lg="8">
                                                        :<template>
                                                            <span style="20px">
                                                                {{

                                                                    field.pivot.value }}
                                                            </span>
                                                        </template>
                                                    </v-col>
                                                </v-row>

                                            </v-col>
                                            <v-col v-for="(field, index) in allowance_filed" :key="index" cols="6" lg="6"
                                                v-if="field.type == 'number'">
                                                <v-row>
                                                    <v-col cols="4" lg="4"> <label> {{ language == 'bn' ? field
                                                        .name_bn : field.name_en }}
                                                        </label></v-col>
                                                    <v-col cols="8" lg="8">
                                                        :<template>
                                                            <span style="20px">
                                                                {{

                                                                    field.pivot.value }}
                                                            </span>
                                                        </template>
                                                    </v-col>
                                                </v-row>

                                            </v-col>
                                            <v-col v-for="(field, index) in allowance_filed" :key="index" cols="6" lg="6"
                                                v-if="field.type == 'date'">

                                                <v-row>
                                                    <v-col cols="4" lg="4"> <label> {{ language == 'bn' ? field
                                                        .name_bn : field.name_en }}
                                                        </label></v-col>
                                                    <v-col cols="8" lg="8">
                                                        :<template>
                                                            <span style="20px">
                                                                {{

                                                                    field.pivot.value }}
                                                            </span>
                                                        </template>
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                        </v-row>
                                    </v-card-text>
                                </v-card> -->

                <!-- Information According to the Program End -->
                <!-- Expansion panel 5 start-->
                <!-- Bank/MFS Information -->

                <v-card class="mt-5">
                  <v-card-title style="background-color: #1976d2; color: white">
                    {{ $t("container.application_selection.application.bank") }}
                  </v-card-title>

                  <v-card-text class="mt-5">
                    <v-row>
                      <v-col cols="6" lg="6">
                        <v-row>
                          <v-col cols="4" lg="4">
                            <label>
                              {{
                                $t(
                                  "container.application_selection.application.account_name"
                                )
                              }}
                            </label></v-col
                          >
                          <v-col cols="8" lg="8">
                            :<template>
                              <span style="20px">
                                {{ beneficiary.account_name }}
                              </span>
                            </template>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col cols="6" lg="6">
                        <v-row>
                          <v-col cols="4" lg="4">
                            <label>
                              {{
                                $t(
                                  "container.application_selection.application.account_type"
                                )
                              }}
                            </label></v-col
                          >
                          <v-col cols="8" lg="8">
                            :<template>
                              <span
                                style="20px"
                                v-if="beneficiary.account_type === 1"
                              >
                                {{
                                  $t(
                                    "container.application_selection.application.mobile_account"
                                  )
                                }}
                              </span>
                              <span style="20px" v-else>
                                {{
                                  $t(
                                    "container.application_selection.application.bank_account"
                                  )
                                }}
                              </span>
                            </template>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col
                        cols="6"
                        lg="6"
                        v-if="beneficiary.account_type === 2"
                      >
                        <v-row>
                          <v-col cols="4" lg="4">
                            <label>
                              {{
                                $t(
                                  "container.application_selection.application.mobile_ownership"
                                )
                              }}
                            </label></v-col
                          >
                          <v-col cols="8" lg="8">
                            :<template>
                              <span style="20px">
                                {{ beneficiary.account_owner }}
                              </span>
                            </template>
                          </v-col>
                        </v-row>
                      </v-col>

                      <v-col cols="6" lg="6">
                        <v-row>
                          <v-col cols="4" lg="4">
                            <label>
                              {{
                                $t(
                                  "container.application_selection.application.account_ownership"
                                )
                              }}
                            </label></v-col
                          >
                          <v-col cols="8" lg="8">
                            :<template>
                              <span style="20px">
                                {{ beneficiary.account_owner }}
                              </span>
                            </template>
                          </v-col>
                        </v-row>
                      </v-col>

                      <v-col cols="6" lg="6" v-if="beneficiary.bank_name">
                        <v-row>
                          <v-col cols="4" lg="4">
                            <label>
                              {{
                                $t(
                                  "container.application_selection.application.bank_name"
                                )
                              }}
                            </label></v-col
                          >
                          <v-col cols="8" lg="8">
                            :<template>
                              <span style="20px">
                                {{ beneficiary.bank_name }}
                              </span>
                            </template>
                          </v-col>
                        </v-row>
                      </v-col>

                      <v-col cols="6" lg="6" v-if="beneficiary.branch_name">
                        <v-row>
                          <v-col cols="4" lg="4">
                            <label>
                              {{
                                $t(
                                  "container.application_selection.application.branch_name"
                                )
                              }}
                            </label></v-col
                          >
                          <v-col cols="8" lg="8">
                            :<template>
                              <span style="20px">
                                {{ beneficiary.branch_name }}
                              </span>
                            </template>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col cols="6" lg="6">
                        <v-row>
                          <v-col cols="4" lg="4">
                            <label>
                              {{
                                $t(
                                  "container.application_selection.application.bank_account_number"
                                )
                              }}
                            </label></v-col
                          >
                          <v-col cols="8" lg="8">
                            :<template>
                              <span style="20px">
                                {{ beneficiary.account_number }}
                              </span>
                            </template>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col cols="6" lg="6">
                        <v-row>
                          <v-col cols="4" lg="4">
                            <label>
                              {{
                                $t(
                                  "container.beneficiary_management.beneficiary_list.monthly_honorarium_amount"
                                )
                              }}
                            </label></v-col
                          >
                          <v-col cols="8" lg="8">
                            :<template>
                              <span style="20px">
                                {{ beneficiary.monthly_allowance }}
                              </span>
                            </template>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col cols="6" lg="6">
                        <v-row>
                          <v-col cols="4" lg="4">
                            <label>
                              {{
                                $t(
                                  "container.beneficiary_management.beneficiary_list.financial_year"
                                )
                              }}
                            </label></v-col
                          >
                          <v-col cols="8" lg="8">
                            :<template>
                              <span style="20px">
                                {{ beneficiary?.financialYear?.financial_year }}
                              </span>
                            </template>
                          </v-col>
                        </v-row>
                      </v-col>
                      <!-- <v-col cols="6" lg="6">
                        <v-row>
                          <v-col cols="4" lg="4">
                            <label>
                              {{
                                $t(
                                  "container.application_selection.application.email"
                                )
                              }}
                            </label></v-col
                          >
                          <v-col cols="8" lg="8">
                            :<template>
                              <span style="20px">
                                {{ beneficiary.email }}
                              </span>
                            </template>
                          </v-col>
                        </v-row>
                      </v-col> -->
                    </v-row>
                  </v-card-text>
                </v-card>
                <!-- Bank/MFS Information End -->
                <!-- Expansion panel 5 End -->
                <!-- Nominee Information -->

                <v-card class="mt-5">
                  <v-card-title style="background-color: #1976d2; color: white">
                    {{
                      $t(
                        "container.application_selection.application.nominee_info"
                      )
                    }}
                  </v-card-title>

                  <v-card-text class="mt-5">
                    <div class="pa-2 mb-4">
                      <v-row>
                        <v-col cols="6" lg="6">
                          <v-img
                            :src="beneficiary.nomineeImageUrl"
                            style="
                              width: 200px;
                              height: 200px;
                              border: 1px solid #ccc;
                            "
                            class="mb-5"
                          ></v-img>
                        </v-col>
                        <v-col cols="6" align-self="end" lg="6">
                          <v-img
                            :src="beneficiary.nomineeSignUrl"
                            style="
                              width: 200px;
                              height: 80px;
                              border: 1px solid #ccc;
                            "
                            class="mb-5"
                          ></v-img>
                        </v-col>

                        <v-col cols="6" lg="6">
                          <v-row>
                            <v-col cols="4" lg="4">
                              <label>
                                {{
                                  $t(
                                    "container.application_selection.application.name_bn"
                                  )
                                }}
                              </label></v-col
                            >
                            <v-col cols="8" lg="8">
                              :<template>
                                <span style="20px">
                                  {{ beneficiary.nominee_bn }}
                                </span>
                              </template>
                            </v-col>
                          </v-row>
                        </v-col>
                        <v-col cols="6" lg="6">
                          <v-row>
                            <v-col cols="4" lg="4">
                              <label>
                                {{
                                  $t(
                                    "container.application_selection.application.name_en"
                                  )
                                }}
                              </label></v-col
                            >
                            <v-col cols="8" lg="8">
                              :<template>
                                <span style="20px">
                                  {{ beneficiary.nominee_en }}
                                </span>
                              </template>
                            </v-col>
                          </v-row>
                        </v-col>
                        <v-col cols="6" lg="6">
                          <v-row>
                            <v-col cols="4" lg="4">
                              <label>
                                {{
                                  $t(
                                    "container.application_selection.application.nid_brn"
                                  )
                                }}
                              </label></v-col
                            >
                            <v-col cols="8" lg="8">
                              :<template>
                                <span style="20px">
                                  {{ beneficiary.nominee_verification_number }}
                                </span>
                              </template>
                            </v-col>
                          </v-row>
                        </v-col>
                        <v-col
                          cols="6"
                          lg="6"
                          v-if="beneficiary.nominee_date_of_birth"
                        >
                          <v-row>
                            <v-col cols="4" lg="4">
                              <label>
                                {{
                                  $t(
                                    "container.application_selection.application.date_of_birth"
                                  )
                                }}
                              </label></v-col
                            >
                            <v-col cols="8" lg="8">
                              :<template>
                                <span style="20px">
                                  {{ beneficiary.nominee_date_of_birth }}
                                </span>
                              </template>
                            </v-col>
                          </v-row>
                        </v-col>
                        <v-col cols="6" lg="6">
                          <v-row>
                            <v-col cols="4" lg="4">
                              <label>
                                {{
                                  $t(
                                    "container.application_selection.application.nationality"
                                  )
                                }}
                              </label></v-col
                            >
                            <v-col cols="8" lg="8">
                              :<template>
                                <span style="20px">
                                  {{ beneficiary.nominee_nationality }}
                                </span>
                              </template>
                            </v-col>
                          </v-row>
                        </v-col>
                        <v-col cols="6" lg="6">
                          <v-row>
                            <v-col cols="4" lg="4">
                              <label>
                                {{
                                  $t(
                                    "container.application_selection.application.relationship"
                                  )
                                }}
                              </label></v-col
                            >
                            <v-col cols="8" lg="8">
                              :<template>
                                <span style="20px">
                                  {{
                                    beneficiary.nominee_relation_with_beneficiary
                                  }}
                                </span>
                              </template>
                            </v-col>
                          </v-row>
                        </v-col>

                        <v-col cols="6" lg="6">
                          <v-row>
                            <v-col cols="4" lg="4">
                              <label>
                                {{
                                  $t(
                                    "container.application_selection.application.nominee_address"
                                  )
                                }}
                              </label></v-col
                            >
                            <v-col cols="8" lg="8">
                              :<template>
                                <span style="20px">
                                  {{ beneficiary.nominee_address }}
                                </span>
                              </template>
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                    </div>
                  </v-card-text>
                </v-card>

                <!-- Nominee Information End -->
                <!-- 5th Expansion panel -->
                <!-- Other Information of Eligibility -->

                <!-- <v-card class="mt-5" v-if="variable && variable.length > 0">
                  <v-card-title style="background-color: #1976d2; color: white">
                    {{
                      $t(
                        "container.application_selection.application.eligiblity_info"
                      )
                    }}
                  </v-card-title>
                  <v-card-text class="mt-5">
                    <v-row>
                      <v-col
                        v-for="(field, index) in variable"
                        :key="index"
                        cols="6"
                        lg="6"
                        v-if="field.parent"
                      >
                        <v-row>
                          <v-col cols="4" lg="4">
                            <label>
                              {{
                                language === "bn"
                                  ? field.parent
                                    ? field.parent.name_bn
                                    : ""
                                  : field.parent
                                  ? field.parent.name_en
                                  : ""
                              }}
                            </label></v-col
                          >
                          <v-col cols="8" lg="8">
                            :<template>
                              <span style="20px">
                                {{
                                  language === "bn"
                                    ? field.name_bn
                                    : field.name_en
                                }}
                              </span>
                            </template>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col
                        v-for="(field, index) in variable"
                        :key="index"
                        cols="6"
                        lg="6"
                        v-if="field.parent == null"
                      >
                        <v-row>
                          <v-col cols="4" lg="4">
                            <label>
                              {{
                                language === "bn"
                                  ? field.name_bn
                                  : field.name_en
                              }}
                            </label></v-col
                          >
                          <v-col cols="8" lg="8">
                            :<template>
                              <span style="20px">
                                {{ language === "bn" ? "হ্যাঁ" : "Yes" }}
                              </span>
                            </template>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card> -->

                <!-- Other Information of Eligibility end-->
              </div>
              <div
                style="display: flex; justify-content: flex-end"
                class="mt-5"
              >
                <!-- Other content on the left -->

                <v-btn
                  flat
                  color="gray"
                  type="submit"
                  @click="navigateTolist"
                  class="custom-btn"
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
import FooterBar from "@/components/Common/FooterBar.vue";
import { extend, ValidationProvider, ValidationObserver } from "vee-validate";
import { mapState } from "vuex";
import axios from "axios";
import { required } from "vee-validate/dist/rules";
import Form from "vform";

export default {
  title: "CTM -  Application View",
  data() {
    return {
      applications: [],
      allowance_values: [],
      panel: [0, 1, 2, 3, 4, 5, 6],
      programs: [],
      classes: [],
      loading: false,
      divisions: [],
      districts: [],
      thanas: [],
      cities: [],
      unions: [],
      district_poros: [],
      city_thanas: [],
      locationType: [],

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
      program_name: null,
      whole_program: [],
      genderName: null,

      beneficiary: {
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
      variable: [],
      data: [],
      image: null,
      signature: null,
      nominee_image: null,
      nominee_signature: null,

      permanent_location: [],

      checkbox: false,
      checkboxNomineeAddress: false,
      imageUrl: null,
      signUrl: null,
      nomineeImageUrl: null,
      programName: null,
      nomineeSignUrl: null,
      programDetails: null,
      PMTVariables: [],
    };
  },
  computed: {
    isRadioGroupReadonly() {
      return this.data.verification_type !== null;
    },
    language: {
      get() {
        return this.$store.getters.getAppLanguage;
      },
    },
    checkboxData() {
      return this.allowance_values
        .filter((item) => item.type === "checkbox")
        .map((item) => {
          const labelName = item.name_en || item.name_bn;
          const values = item.allow_addi_field_values
            .map((value) => value.value)
            .join(", ");
          return { label_name: labelName, values: values };
        });
    },
    formattedVariables() {
      const formattedVariables = {};

      // Iterate through the allowance_values array
      this.variable.forEach((value) => {
        // Check if the id already exists in formattedValues
        if (formattedVariables[value.variable]) {
          // Concatenate the value with comma
          formattedVariables[value.variable].value += `, ${value.value}`;
        } else {
          // Create a new entry with the label as the key and the value as an object
          formattedVariables[value.variable] = {
            label: value.allow_addi_field, // Assuming English label is used
            value: value.value,
          };
        }
      });

      // Convert object to array
      return Object.values(formattedVariables);
    },
    formattedAllowanceValues() {
      const formattedValues = {};

      // Iterate through the allowance_values array
      this.allowance_values.forEach((value) => {
        // Check if the id already exists in formattedValues
        if (formattedValues[value.additional_field_id]) {
          // Concatenate the value with comma
          formattedValues[
            value.additional_field_id
          ].value += `, ${value.value}`;
        } else {
          // Create a new entry with the label as the key and the value as an object
          formattedValues[value.additional_field_id] = {
            label: value.allow_addi_field, // Assuming English label is used
            value: value.value,
          };
        }
      });

      // Convert object to array
      return Object.values(formattedValues);
    },
  },

  components: {
    ValidationProvider,
    ValidationObserver,
    FooterBar,
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
  },

  methods: {
    navigateTolist() {
      this.$router.push("/beneficiary-management/beneficiary-info");
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
              this.beneficiary = res.data.data;

              this.beneficiary.imageUrl = item?.image;
              this.beneficiary.signUrl = item?.signature;

              this.beneficiary.nomineeImageUrl = item?.nominee_image;
              this.beneficiary.nomineeSignUrl = item?.nominee_signature;

              this.location_type = "City Corporation";

              console.log("division_id__", this.beneficiary.division_id);
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
    async getApplicationById() {
      this.$axios
        .get(`/admin/application/get/R7C5qFYEKp`, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          this.data = result.data.application;
          const genderArray = this.genders;
          const genderObject = genderArray.find(
            (gender) => gender.id === this.data.gender_id
          );

          this.genderName = genderObject;

          this.current_location = result?.data?.application?.current_location;
          this.permanent_location =
            result?.data?.application?.permanent_location;
          this.variable = result?.data?.application?.subvariable;
          this.allowance_filed = result?.data?.application?.allow_addi_fields;
          this.allowance_values =
            result?.data?.application?.allow_addi_field_value;
          this.program_name = this.data?.program.name_en;
          this.whole_program = this.data?.program;
          this.image = result?.data?.image;
          //  this.image = this.image.replace(/\\\//g, '/');
          console.log(this.image, "image");

          this.signature = result?.data?.signature;
          //   this.signature = this.signature.replace(/\\\//g, '/');
          this.nominee_image = result?.data?.nominee_image;
          //  this.nominee_image = this.nominee_image.replace(/\\\//g, '/');
          this.nominee_signature = result?.data?.nominee_signature;
          //  this.nominee_signature = this.nominee_signature.replace(/\\\//g, '/');
          console.log(this.nominee_signature, "nominee_signature");

          console.log(this.allowance_filed, "this.allowance_filed");
          console.log(this.permanent_location, "this.permanent_location");
          if (this.current_location?.location_type == 3) {
            this.data.division_id =
              this.current_location?.parent?.parent?.parent?.parent;
            this.data.district_id =
              this.current_location?.parent?.parent?.parent;
            this.data.location_type = this.current_location.location_type;
            const LocationArray = this.locationType;

            const locationObject = LocationArray.find(
              (location) => location.id === 3
            );

            this.LocationName = locationObject;
            console.log(this.LocationName, "location");
            this.data.city_id = this.current_location?.parent?.parent;
            this.data.city_thana_id = this.current_location?.parent;
            this.data.ward_id = this.current_location;
            this.data.post_code = this.data?.current_post_code;
            this.data.address = this.data?.current_address;
          }
          if (this.current_location?.location_type == 2) {
            this.data.division_id =
              this.current_location?.parent?.parent?.parent?.parent;
            this.data.district_id =
              this.current_location?.parent?.parent?.parent;
            this.data.location_type = this.current_location.location_type;
            const LocationArray = this.locationType;

            const locationObject = LocationArray.find(
              (location) => location.id === 2
            );

            this.LocationName = locationObject;
            this.data.thana_id = this.current_location?.parent?.parent;
            this.data.union_id = this.current_location?.parent;
            this.data.ward_id = this.current_location;
            this.data.post_code = this.data?.current_post_code;
            this.data.address = this.data?.current_address;
          }
          if (this.current_location?.location_type == 1) {
            this.data.division_id =
              this.current_location?.parent?.parent?.parent;
            this.data.district_id = this.current_location?.parent?.parent;
            this.data.location_type = this.current_location.location_type;
            const LocationArray = this.locationType;
            const locationObject = LocationArray.find(
              (location) => location.id === 1
            );

            this.LocationName = locationObject;
            this.data.district_pouro_id = this.current_location?.parent;

            this.data.ward_id = this.current_location;
            this.data.post_code = this.data?.current_post_code;
            this.data.address = this.data?.current_address;
          }
          if (this.permanent_location?.location_type == 3) {
            this.data.permanent_division_id =
              this.permanent_location?.parent?.parent?.parent?.parent;
            this.data.permanent_district_id =
              this.permanent_location?.parent?.parent?.parent;
            this.data.permanent_location_type =
              this.permanent_location.location_type;
            const LocationArray = this.locationType;
            const locationObject = LocationArray.find(
              (location) => location.id === 3
            );

            this.permanentLocationName = locationObject;
            this.data.permanent_city_id =
              this.permanent_location?.parent?.parent;
            this.data.permanent_city_thana_id = this.permanent_location?.parent;
            this.data.permanent_ward_id = this.permanent_location;
            this.data.permanent_post_code = this.data?.permanent_post_code;
            this.data.permanent_address = this.data?.permanent_address;
          }
          if (this.permanent_location?.location_type == 2) {
            this.data.permanent_division_id =
              this.permanent_location?.parent?.parent?.parent?.parent;
            this.data.permanent_district_id =
              this.permanent_location?.parent?.parent?.parent;
            this.data.permanent_location_type =
              this.permanent_location.location_type;
            const LocationArray = this.locationType;
            const locationObject = LocationArray.find(
              (location) => location.id === 2
            );

            this.permanentLocationName = locationObject;
            this.data.permanent_thana_id =
              this.permanent_location?.parent?.parent;
            this.data.permanent_union_id = this.permanent_location?.parent;
            this.data.permanent_ward_id = this.permanent_location;
            this.data.permanent_post_code = this.data?.permanent_post_code;
            this.data.permanent_address = this.data?.permanent_address;
          }
          if (this.permanent_location?.location_type == 1) {
            this.data.permanent_division_id =
              this.permanent_location?.parent?.parent?.parent;
            this.data.permanent_district_id =
              this.permanent_location?.parent?.parent;
            this.data.permanent_location_type =
              this.permanent_location.location_type;
            const LocationArray = this.locationType;
            const locationObject = LocationArray.find(
              (location) => location.id === 1
            );

            this.permanentLocationName = locationObject;
            this.data.permanent_district_pouro_id =
              this.permanent_location?.parent;

            this.data.permanent_ward_id = this.permanent_location;
            this.data.permanent_post_code = this.data?.permanent_post_code;
            this.data.permanent_address = this.data?.permanent_address;
          }
        });
    },
    concatenateCheckboxValues(checkboxValues) {
      return checkboxValues.map((value) => value.value).join(", ");
    },
  },

  created() {
    // this.$store
    //   .dispatch("getGlobalLookupByType", 20)
    //   .then((res) => (this.classes = res));
    // this.$store
    //   .dispatch("getGlobalLookupByType", 2)
    //   .then((res) => (this.genders = res));
    // this.$store
    //   .dispatch("getGlobalLookupByType", 1)
    //   .then((res) => (this.locationType = res));
    // console.log(this.locationType, "l");
    // this.getApplicationById();
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
