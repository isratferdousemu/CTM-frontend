]<template>
    <div id="application_view">
        <v-row class="mx-5 my-5 mt-5">
            <v-col class="mt-5" cols="12">
                <ValidationObserver ref="form" v-slot="{ invalid }">
                    <form @submit.prevent="submitApplication()">
                        <v-card class="pa-5 px-10 mb-4">


                            <ValidationProvider name="program" vid="program" rules="required" v-slot="{ errors }">
                                <label>{{ $t('container.application_selection.application.program') }} </label>
                             
                                <v-text-field  outlined 
                                  required :error="errors[0] ? true : false" v-model="program_name"
                                     readonly>
                                </v-text-field >
                            </ValidationProvider>
                            <div>
                        
                                    <!-- Applicant Verification -->
                                    <v-card>
                                    <v-card-title style="background-color: #1976D2; color: white;">
      {{ $t('container.application_selection.application.applicant_verification') }} 
    </v-card-title>
                                     
                                        <v-card-text class="mt-5">
                                           
                                            <template>
                                                <ValidationProvider name="program" vid="verification_type" rules="required"
                                                    v-slot="{ errors }">
                                                    <v-radio-group :readonly="isRadioGroupReadonly"
                                                        v-model="data.verification_type" row>
                                                        <v-radio label="National Identity (NID)" :value="1"
                                                            v-if="!isRadioGroupReadonly"></v-radio>
                                                        <v-radio label="Birth Registration Number" :value="2"
                                                            v-if="!isRadioGroupReadonly"></v-radio>
                                                    </v-radio-group>
                                                </ValidationProvider>
                                            </template>
                                            <V-row>
                                                <v-col>
                                                    <ValidationProvider name="Number" vid="verification_number"
                                                        rules="required" v-slot="{ errors }">
                                                        <label>
                                                            <span v-if="data.verification_type == 1">
                                                               {{ $t('container.application_selection.application.nid') }}
                                                            </span>
                                                            <span v-else-if="data.verification_type == 2">
                                                             {{ $t('container.application_selection.application.brn') }}
                                                            </span>
                                                            <span v-else>
                                                               {{ $t('container.beneficiary_management.beneficiary_list.nid') }}
                                                            </span>

                                                        </label>
                                                     
                                                        <v-text-field outlined readonly v-model="data.verification_number"
                                                            class="mr-2" type="number" required
                                                            :error="errors[0] ? true : false" :error-messages="errors[0]">
                                                        </v-text-field>
                                                    </ValidationProvider>
                                                </v-col>

                                                <v-col>
                                                    <label>{{ $t('container.application_selection.application.date_of_birth') }} </label>

                                               


                                                    <v-text-field v-model="data.date_of_birth" readonly outlined>

                                                    </v-text-field>

                                                </v-col>
                                            </V-row>

                                            <!-- <div class="d-inline d-flex justify-end">
                                                <v-btn @click="verifyCard()" elevation="2"
                                                    :disabled="data.date_of_birth == null || data.verification_number == null || data.verification_type == null || data.date_of_birth == '' || data.verification_number == '' || data.verification_type == ''"
                                                    class="btn" color="primary">Verify</v-btn>
                                            </div> -->
                                        </v-card-text>
                                    </v-card>
                                                            <v-card class="mt-5">
                                        <v-card-title style="background-color: #1976D2; color: white;">
     {{ $t('container.application_selection.application.personal_info') }}
        </v-card-title>
                                     
                                            <v-card-text class="mt-5">
                              
                                      
                                            <div class="pa-2 mb-4">
                                                <v-row>
                                                    <v-col cols="6" lg="6">
                                                        <v-img :src="image" style="
                                    width: 200px;
                                    height: 200px;
                                    border: 1px solid #ccc;
                                  " class="mb-5"></v-img>
                                                        <!-- <v-img :src="image" v-if="!imageUrl" style="
                                    width: 150px;
                                    height: 150px;
                                    border: 1px solid #ccc;
                                  " class="mb-5"></v-img> -->
                                                        <!-- <ValidationProvider v-slot="{ errors }" name="Image"
                                                            rules="required" vid="image">
                                                            <label>Image</label>
                                                            <v-file-input outlined show-size counter
                                                                prepend-inner-icon="mdi-camera" v-model="data.image"
                                                                accept="image/*" @change="previewImage"
                                                                prepend-icon=""></v-file-input>
                                                        </ValidationProvider> -->
                                                    </v-col>
                                                    <v-col cols="6" align-self="end" lg="6">
                                                        <!-- <v-img :src="signature" style="
                                    width: 200px;
                                    height: 80px;
                                    border: 1px solid #ccc;
                                  " class="mb-5" ></v-img> -->
                                                        <v-img :src="signature" style="
                                    width: 200px;
                                    height: 80px;
                                    border: 1px solid #ccc;
                                  " class="mb-5"></v-img>
                                                        <!-- <ValidationProvider v-slot="{ errors }" name="Signature"
                                                            rules="required" vid="sign">
                                                            <label>Signature</label>
                                                            <v-file-input outlined show-size counter
                                                                prepend-inner-icon="mdi-camera" v-model="data.signature"
                                                                accept="image/*" @change="previewSign"
                                                                prepend-icon=""></v-file-input>
                                                        </ValidationProvider> -->
                                                    </v-col>
                                                    <v-col cols="6" lg="6">
                                                        <ValidationProvider name="Name in Bangla" vid="name_bn"
                                                            rules="required" v-slot="{ errors }">
                                                            <label>{{$t('container.application_selection.application.name_bn') }} </label>
                                                        
                                                            <v-text-field v-model="data.name_bn" outlined readonly
                                                                :error="errors[0] ? true : false"
                                                                :error-messages="errors[0]">
                                                            </v-text-field>
                                                        </ValidationProvider>
                                                    </v-col>
                                                    <v-col cols="6" lg="6">
                                                        <ValidationProvider name="Name in English" vid="name_en"
                                                            rules="required" v-slot="{ errors }">
                                                            <label>{{ $t('container.application_selection.application.name_en') }} </label>
                                                           
                                                            <v-text-field v-model="data.name_en" outlined readonly
                                                                :error="errors[0] ? true : false"
                                                                :error-messages="errors[0]">
                                                            </v-text-field>
                                                        </ValidationProvider>
                                                    </v-col>
                                                    <v-col cols="6" lg="6">
                                                        <ValidationProvider name="Father Name in Bangla"
                                                            vid="father_name_bn" rules="required" v-slot="{ errors }">
                                                            <label>{{ $t('container.application_selection.application.father_name_bn') }}</label>

                                                            <v-text-field v-model="data.father_name_bn" outlined required
                                                                readonly :error="errors[0] ? true : false"
                                                                :error-messages="errors[0]">
                                                            </v-text-field>
                                                        </ValidationProvider>
                                                    </v-col>
                                                    <v-col cols="6" lg="6">
                                                        <ValidationProvider name="Father Name in English"
                                                            vid="father_name_en" rules="required" v-slot="{ errors }">
                                                            <label>{{ $t('container.application_selection.application.father_name_en') }}</label>
                                                            <v-text-field v-model="data.father_name_en" outlined required
                                                                readonly :error="errors[0] ? true : false"
                                                                :error-messages="errors[0]">
                                                            </v-text-field>
                                                        </ValidationProvider>
                                                    </v-col>
                                                    <v-col cols="6" lg="6">
                                                        <ValidationProvider name="Mother Name in English"
                                                            vid="mother_name_bn" v-slot="{ errors }">
                                                            <label>{{ $t('container.application_selection.application.mother_name_bn') }}</label>
                                                            <v-text-field v-model="data.mother_name_bn" outlined required
                                                                readonly :error="errors[0] ? true : false"
                                                                :error-messages="errors[0]">
                                                            </v-text-field>
                                                        </ValidationProvider>
                                                    </v-col>
                                                    <v-col cols="6" lg="6">
                                                        <ValidationProvider name="Mother Name in English"
                                                            vid="mother_name_en" v-slot="{ errors }">
                                                            <label>{{ $t('container.application_selection.application.mother_name_en') }}</label>
                                                            <v-text-field v-model="data.mother_name_en" outlined readonly
                                                                required :error="errors[0] ? true : false"
                                                                :error-messages="errors[0]">
                                                            </v-text-field>
                                                        </ValidationProvider>
                                                    </v-col>
                                                    <v-col cols="6" lg="6">
                                                        <ValidationProvider name="Spouse Name in Bangla"
                                                            vid="spouse_name_bn" v-slot="{ errors }">
                                                            <label>{{ $t('container.application_selection.application.spouse_name_bn') }}</label>
                                                            <v-text-field v-model="data.spouse_name_bn" outlined readonly
                                                                :error="errors[0] ? true : false"
                                                                :error-messages="errors[0]">
                                                            </v-text-field>
                                                        </ValidationProvider>
                                                    </v-col>
                                                    <v-col cols="6" lg="6">
                                                        <ValidationProvider name="Marital Status" vid="marital_status"
                                                            v-slot="{ errors }">
                                                            
                                                            <label>{{ $t('container.system_config.allowance_program.marital_status') }}</label>
                                                            <v-text-field v-model="data.marital_status" outlined readonly
                                                                 >
                                                            </v-text-field>
                                                        </ValidationProvider>
                                                    </v-col>
                                                    <v-col cols="6" lg="6">
                                                        <ValidationProvider name="Spouse Name in English"
                                                            vid="spouse_name_en" v-slot="{ errors }">
                                                            <label>{{ $t('container.application_selection.application.spouse_name_en') }}</label>
                                                            <v-text-field v-model="data.spouse_name_en" outlined readonly
                                                                :error="errors[0] ? true : false"
                                                                :error-messages="errors[0]">
                                                            </v-text-field>
                                                        </ValidationProvider>
                                                    </v-col>
                                                    <v-col cols="6" lg="6">
                                                        <ValidationProvider name="Religion" vid="religion"
                                                            v-slot="{ errors }" rules="required">
                                                            <label>{{ $t('container.application_selection.application.religion') }}</label>
                                                         

                                                            <v-text-field v-model="data.religion" outlined required readonly
                                                               >
                                                            </v-text-field>
                                                        </ValidationProvider>
                                                    </v-col>
                                                    <v-col cols="6" lg="6">
                                                        <ValidationProvider name="Mobile Number" vid="mobile"
                                                            rules="required" v-slot="{ errors }">
                                                            <label style="display: inline-block">{{ $t('container.application_selection.application.mobile') }}
                                                            </label>
                                                          
                                                            <v-text-field v-model="data.mobile" outlined readonly
                                                                type="Number" :error="errors[0] ? true : false"
                                                                :error-messages="errors[0]">
                                                            </v-text-field>
                                                        </ValidationProvider>
                                                    </v-col>

                                                    <v-col cols="6" lg="6">
                                                        <ValidationProvider name="Nationality" vid="nationality"
                                                            v-slot="{ errors }">
                                                            <label>{{ $t('container.application_selection.application.nationality') }}</label>
                                                            <v-text-field v-model="data.nationality" outlined required
                                                                readonly :error="errors[0] ? true : false"
                                                                :error-messages="errors[0]">
                                                            </v-text-field>
                                                        </ValidationProvider>
                                                    </v-col>
                                                    <v-col cols="6" lg="6">
                                                        <ValidationProvider name="Age" vid="age" v-slot="{ errors }"
                                                            rules="required">
                                                            <label>{{ $t('container.application_selection.application.age') }}</label>
                                                          
                                                            <v-text-field v-model="data.age" outlined type="number" required
                                                                readonly :error="errors[0] ? true : false"
                                                                :error-messages="errors[0]">
                                                            </v-text-field>
                                                        </ValidationProvider>
                                                    </v-col>
                                                    <v-col cols="6" lg="6">
                                                     
                                                            <label>{{ $t('container.system_config.allowance_program.gender') }}</label>
                                                          
                                                            <v-text-field v-model="genderName"  outlined readonly>
                                                            </v-text-field>
                                                   
                                                    </v-col>
                                                    <v-col cols="6" lg="6">
                                                        <ValidationProvider name="Education Status" vid="education_status"
                                                            rules="required" v-slot="{ errors }">
                                                            <label>{{ $t('container.application_selection.application.education_status') }}</label>
                                                            
                                                            <v-select v-model="data.education_status" outlined required
                                                                :error="errors[0] ? true : false"
                                                                :error-messages="errors[0]" :items="education_status"
                                                                readonly>
                                                            </v-select>
                                                        </ValidationProvider>
                                                    </v-col>
                                                    <v-col cols="6" lg="6">
                                                        <ValidationProvider name="Profession" vid="profession"
                                                            v-slot="{ errors }">
                                                            <label>{{ $t('container.application_selection.application.profession') }}</label>
                                                            <v-text-field v-model="data.profession" outlined readonly
                                                                :error="errors[0] ? true : false"
                                                                :error-messages="errors[0]">
                                                            </v-text-field>
                                                        </ValidationProvider>
                                                    </v-col>
                                                    <v-col cols="6" lg="6">
                                                        <ValidationProvider name="Identification Mark"
                                                            vid="identification_mark" v-slot="{ errors }">
                                                            <label>{{ $t('container.application_selection.application.identification_mark') }}</label>
                                                            <v-text-field v-model="data.identification_mark" outlined
                                                                readonly :error="errors[0] ? true : false"
                                                                :error-messages="errors[0]">
                                                            </v-text-field>
                                                        </ValidationProvider>
                                                    </v-col>
                                                </v-row>
                                            </div>
                                        </v-card-text >
                                    </v-card>
                                    <!-- Personal Information end-->

                                    <!-- 3rd Expansion panel -->
                                    <!-- Contact Information -->
                                    
                                    <v-card class="mt-5">
                                                     <v-card-title style="background-color: #1976D2; color: white;">
         {{ $t('container.application_selection.application.contact_info') }}
            </v-card-title>
                                     
                                        <v-card-text class="mt-5">


                                            <v-row>
                                                <v-col cols="12" class="text-center">
                                                    <v-chip color="success" class="text-uppercase" label>{{ $t('container.application_selection.application.present_address') }}</v-chip>
                                                </v-col>
                                                <!-- {{ permanent_location }}  -->
                                                <v-col lg="6" md="6" cols="12">

                                                    <label style="display: inline-block">{{ $t('container.system_config.demo_graphic.division.division') }}
                                                    </label>
                                                
                                                    <v-text-field v-model="data.division_id" readonly
                                                        outlined></v-text-field>

                                                </v-col>
                                                <v-col lg="6" md="6" cols="12">

                                                    <label style="display: inline-block">{{ $t('container.system_config.demo_graphic.district.district') }}
                                                    </label>
                                                    <v-text-field v-model="data.district_id" readonly
                                                        outlined></v-text-field>
                                                </v-col>
                                                <v-col lg="6" md="6" cols="12">
                                                    <ValidationProvider name="Location Type" vid="location_type"
                                                        rules="required" v-slot="{ errors }">
                                                        <label style="display: inline-block">{{ $t('container.list.location_type') }}
                                                        </label>
                                                     
                                                        <v-autocomplete @input="LocationType($event)"
                                                            v-model="data.location_type"
                                                            :hide-details="errors[0] ? false : true" outlined
                                                            :items="locationType" item-text="value_en" item-value="id"
                                                            readonly :error="errors[0] ? true : false"
                                                            :error-messages="errors[0]"></v-autocomplete>
                                                    </ValidationProvider>
                                                </v-col>
                                                <v-col v-if="data.location_type == 2" lg="6" md="6" cols="12">

                                                    <label style="display: inline-block">{{ $t('container.system_config.demo_graphic.ward.upazila') }}
                                                    </label>
                                           
                                                    <v-text-field v-model="data.thana_id" outlined readonly></v-text-field>

                                                </v-col>
                                                <v-col v-if="data.location_type == 2" lg="6" md="6" cols="12">

                                                    <label style="display: inline-block">{{ $t('container.system_config.demo_graphic.ward.union_pouro') }}
                                                    </label>
                                                    <span style="margin-left: 4px; color: red">*</span>
                                                    <v-text-field v-model="data.union_id" outlined readonly></v-text-field>

                                                </v-col>
                                                <v-col v-if="data.location_type == 3" lg="6" md="6" cols="12">

                                                    <label style="display: inline-block">{{ $t('container.system_config.demo_graphic.ward.city') }}
                                                    </label>
                                                 
                                                    <v-text-field v-model="data.city_id" outlined readonly></v-text-field>

                                                </v-col>
                                                <v-col v-if="data.location_type == 3" lg="6" md="6" cols="12">
                                                    <label style="display: inline-block">{{ $t('container.system_config.demo_graphic.ward.thana') }}
                                                    </label>
                                                  
                                                    <v-text-field v-model="data.city_thana_id" outlined
                                                        readonly></v-text-field>
                                                </v-col>
                                                <v-col v-if="data.location_type == 1" lg="6" md="6" cols="12">

                                                    <label style="display: inline-block">{{ $t('container.system_config.demo_graphic.ward.dist_pouro') }}
                                                    </label>
                                                    <v-text-field v-model="data.district_pouro_id" outlined
                                                        readonly></v-text-field>
                                                </v-col>

                                                <v-col lg="6" md="6" cols="6">

                                                    <label style="display: inline-block">{{ $t('container.system_config.demo_graphic.ward.ward') }}
                                                    </label>
                                                    <span style="margin-left: 4px; color: red">*</span>
                                                    <v-text-field v-model="data.ward_id" outlined readonly></v-text-field>

                                                </v-col>
                                                <v-col cols="6" lg="6">
                                                    <ValidationProvider name="Post Code" vid="post_code" rules="required"
                                                        v-slot="{ errors }">
                                                        <label style="display: inline-block">{{ $t('container.system_config.demo_graphic.ward.post_code') }}
                                                        </label>
                                                      
                                                        <v-text-field v-model="data.post_code" outlined readonly
                                                            :error="errors[0] ? true : false" :error-messages="errors[0]">
                                                        </v-text-field>
                                                    </ValidationProvider>
                                                </v-col>




                                                <v-col cols="6" lg="6">
                                                    <ValidationProvider name="Village/House No.,
                                                        Road No., Block No, Section" vid="address" rules="required"
                                                        v-slot="{ errors }">
                                                        <label style="display: inline-block">{{ $t('container.system_config.demo_graphic.ward.address') }}
                                                        </label>
                                                        <span style="margin-left: 4px; color: red">*</span>
                                                        <v-text-field v-model="data.address" outlined readonly
                                                            :error="errors[0] ? true : false" :error-messages="errors[0]">
                                                        </v-text-field>
                                                    </ValidationProvider>
                                                </v-col>
                                            </v-row>


                                            <v-row>
                                                <v-col cols="12" class="text-center">
                                                    <v-chip color="success" class="text-uppercase" label>{{ $t('container.application_selection.application.permanent_address') }}
                                                </v-chip>
                                                </v-col>


                                                <v-col lg="6" md="6" cols="12">

                                                    <label style="display: inline-block">{{ $t('container.system_config.demo_graphic.division.division') }}
                                                    </label>
                                                   
                                                    <v-text-field v-model="data.division_id" readonly
                                                        outlined></v-text-field>

                                                </v-col>
                                                <v-col lg="6" md="6" cols="12">

                                                    <label style="display: inline-block">{{ $t('container.system_config.demo_graphic.district.district') }}
                                                    </label>
                                                    <v-text-field v-model="data.permanent_district_id" readonly
                                                        outlined></v-text-field>
                                                </v-col>
                                                <v-col lg="6" md="6" cols="12">
                                                    <ValidationProvider name="Location Type" vid="location_type"
                                                        rules="required" v-slot="{ errors }">
                                                        <label style="display: inline-block">{{ $t('container.list.location_type') }}
                                                        </label>
                                                       
                                                        <v-autocomplete @input="LocationType($event)"
                                                            v-model="data.permanent_location_type"
                                                            :hide-details="errors[0] ? false : true" outlined
                                                            :items="locationType" item-text="value_en" item-value="id"
                                                            readonly :error="errors[0] ? true : false"
                                                            :error-messages="errors[0]"></v-autocomplete>
                                                    </ValidationProvider>
                                                </v-col>
                                                <v-col v-if="data.permanent_location_type == 2" lg="6" md="6" cols="12">

                                                    <label style="display: inline-block">{{ $t('container.system_config.demo_graphic.ward.upazila') }}
                                                    </label>
                                                  
                                                    <v-text-field v-model="data.permanent_thana_id" outlined
                                                        readonly></v-text-field>

                                                </v-col>
                                                <v-col v-if="data.permanent_location_type == 2" lg="6" md="6" cols="12">

                                                    <label style="display: inline-block">{{ $t('container.system_config.demo_graphic.ward.union_pouro') }}
                                                    </label>
                                                 
                                                    <v-text-field v-model="data.permanent_union_id" outlined
                                                        readonly></v-text-field>

                                                </v-col>
                                                <v-col v-if="data.permanent_location_type == 3" lg="6" md="6" cols="12">

                                                    <label style="display: inline-block">{{ $t('container.system_config.demo_graphic.ward.city') }}
                                                    </label>
                                                
                                                    <v-text-field v-model="data.permanent_city_id" outlined
                                                        readonly></v-text-field>

                                                </v-col>
                                                <v-col v-if="data.permanent_location_type == 3" lg="6" md="6" cols="12">
                                                    <label style="display: inline-block">{{ $t('container.system_config.demo_graphic.ward.thana') }}
                                                    </label>
                                                   
                                                    <v-text-field v-model="data.permanent_city_thana_id" outlined
                                                        readonly></v-text-field>
                                                </v-col>
                                                <v-col v-if="data.permanent_location_type == 1" lg="6" md="6" cols="12">

                                                    <label style="display: inline-block">{{ $t('container.system_config.demo_graphic.ward.dist_pouro') }}
                                                    </label>
                                                    <v-text-field v-model="data.permanent_district_pouro_id" outlined
                                                        readonly></v-text-field>
                                                </v-col>

                                                <v-col lg="6" md="6" cols="6">

                                                    <label style="display: inline-block">{{ $t('container.system_config.demo_graphic.ward.ward') }}
                                                    </label>
                                                   
                                                    <v-text-field v-model="data.permanent_ward_id" outlined
                                                        readonly></v-text-field>

                                                </v-col>
                                                <v-col cols="6" lg="6">
                                                    <ValidationProvider name="Post Code" vid="post_code" rules="required"
                                                        v-slot="{ errors }">
                                                        <label style="display: inline-block">{{ $t('container.system_config.demo_graphic.ward.post_code') }}
                                                        </label>
                                                     
                                                        <v-text-field v-model="data.permanent_post_code" outlined readonly
                                                            :error="errors[0] ? true : false" :error-messages="errors[0]">
                                                        </v-text-field>
                                                    </ValidationProvider>
                                                </v-col>




                                                <v-col cols="6" lg="6">
                                                    <ValidationProvider name="Village/House No.,
                                                        Road No., Block No, Section" vid="address" rules="required"
                                                        v-slot="{ errors }">
                                                        <label style="display: inline-block">{{ $t('container.system_config.demo_graphic.ward.address') }}
                                                        </label>
                                                        <span style="margin-left: 4px; color: red">*</span>
                                                        <v-text-field v-model="data.permanent_address" outlined readonly
                                                            :error="errors[0] ? true : false" :error-messages="errors[0]">
                                                        </v-text-field>
                                                    </ValidationProvider>
                                                </v-col>
                                            </v-row>
                                        </v-card-text>
                                    </v-card>
                                    <!-- Contact Information End -->
                                    <!-- 4th Expansion panel -->
                                    <!-- Information According to the Program -->
                                    <v-card class="mt-5">
                                     
                                         <v-card-title style="background-color: #1976D2; color: white;">
              {{ language == 'bn' ? whole_program.name_bn : whole_program.name_en }} {{ $t('container.application_selection.application.info') }}
                </v-card-title>
                                        <v-card-text class="mt-5">
                                         
                                            <v-row>
                                                <v-col v-for="(field, index) in allowance_filed" :key="index" cols="6"
                                                    lg="6">

                                                    <template v-if="field.type === 'number' || field.type === 'text'">
                                                        <label>{{ language == 'bn' ? field.name_bn : field.name_en  }}</label>
                                                        <v-text-field v-model="field.pivot.value" outlined readonly>
                                                        </v-text-field>
                                                    </template>
                                                    <template v-if="field.type === 'dropdown'">
                                                        <label>{{ language == 'bn' ? field.name_bn : field.name_en }}</label>
                                                        <v-text-field v-model="field.allow_addi_field_values[0].value"
                                                            outlined readonly>
                                                        </v-text-field>
                                                    </template>
                                                    <template v-if="field.type === 'checkbox'">
                                                        <label>{{ language == 'bn' ? field.name_bn : field.name_en }}</label>
                                                        <v-text-field
                                                            :value="concatenateCheckboxValues(field.allow_addi_field_values)"
                                                            outlined readonly></v-text-field>
                                                    </template>
                                                </v-col>


                                            </v-row>


                                        </v-card-text>
                                    </v-card>
                                    <!-- Information According to the Program End -->
                                    <!-- Expansion panel 5 start-->
                                    <!-- Bank/MFS Information -->
                                  
                                    <v-card class="mt-5">
                                                               <v-card-title style="background-color: #1976D2; color: white;">
             {{ $t('container.application_selection.application.bank') }}
                </v-card-title>
                                     
                                        <v-card-text class="mt-5">
                                            <v-row>
                                                <v-col cols="6" lg="6">
                                                    <ValidationProvider name="Account Name" vid="account_name"
                                                        rules="required" v-slot="{ errors }">
                                                        <label style="display: inline-block">     {{ $t('container.application_selection.application.account_name') }}
                                                        </label>
                                                    
                                                        <v-text-field v-model="data.account_name" outlined clearable
                                                            :error="errors[0] ? true : false" :error-messages="errors[0]">
                                                        </v-text-field>
                                                    </ValidationProvider>
                                                </v-col>
                                                <v-col cols="6" lg="6">
                                                    <v-radio-group v-model="data.account_type" row>
                                                        {{ $t('container.application_selection.application.account_type') }}
                                                        
                                                        <v-radio v-if="data.account_type === 1" readonly :label="$t('container.application_selection.application.bank_account')" :value="1"></v-radio>
                                                        <v-radio  v-if="data.account_type === 2" readonly :label="$t('container.application_selection.application.mobile_account')"
                                                            :value="2"></v-radio>
                                                    </v-radio-group>
                                                </v-col>
                                                <v-col cols="6" lg="6" v-if="data.account_type === 2">
                                                    <ValidationProvider name="Account Ownership" vid="account_owner"
                                                        v-slot="{ errors }">
                                                        <label style="display: inline-block">  {{ $t('container.application_selection.application.mobile_ownership') }}
                                                        </label>
                                                  

                                                               <v-text-field v-model="data.account_owner" outlined readonly>
                                                        </v-text-field>
                                                    </ValidationProvider>
                                                </v-col>

                                                <v-col cols="6" lg="6" v-if="data.account_type === 1">

                                                    <label style="display: inline-block">{{ $t('container.application_selection.application.account_ownership') }}
                                                    </label>
                                                 

                                                    <v-text-field v-model="data.account_owner" outlined readonly>
                                                    </v-text-field>

                                                </v-col>
                                             


                                                <v-col cols="6" lg="6" v-if="data.account_type === 2">
                                                    <ValidationProvider rules="checkMobileNumber" name="Mobile Number"
                                                        vid="account_number" v-slot="{ errors }">
                                                        <label style="display: inline-block">{{ $t('container.application_selection.application.mobile') }} </label>

                                                        <v-text-field v-model="data.account_number" outlined type="number"
                                                            clearable :error="errors[0] ? true : false"
                                                            :error-messages="errors[0]">
                                                        </v-text-field>
                                                    </ValidationProvider>

                                                </v-col>
                                                <v-col cols="6" lg="6" v-if="data.account_type === 1">

                                                    <label style="display: inline-block">{{ $t('container.application_selection.application.bank_name') }} </label>

                                                    <v-text-field v-model="data.bank_name" outlined readonly>
                                                    </v-text-field>

                                                </v-col>

                                                <v-col cols="6" lg="6" v-if="data.account_type === 1">

                                                    <label style="display: inline-block">{{ $t('container.application_selection.application.branch_name') }}</label>

                                                    <v-text-field v-model="data.branch_name" outlined readonly>
                                                    </v-text-field>

                                                </v-col>
                                                <v-col cols="6" lg="6" v-if="data.account_type === 1">

                                                    <label style="display: inline-block">{{ $t('container.application_selection.application.bank_account_number') }}
                                                    </label>

                                                    <v-text-field v-model="data.account_number" outlined readonly>
                                                    </v-text-field>

                                                </v-col>
                                                <v-col cols="6" lg="6">

                                                    <label style="display: inline-block">{{ $t('container.application_selection.application.email') }} </label>


                                                    <v-text-field v-model="data.email" outlined clearable readonly>
                                                    </v-text-field>

                                                </v-col>
                                            </v-row>
                                            <!-- <p class="red--text mt-2">
                                                Must have active Nagad / Bkash account where applicable.
                                            </p> -->
                                        </v-card-text>
                                    </v-card>
                                    <!-- Bank/MFS Information End -->
                                    <!-- Expansion panel 5 End -->
                                    <!-- Nominee Information -->
                                      
                                    <v-card class="mt-5">
                                                                <v-card-title style="background-color: #1976D2; color: white;">
             {{ $t('container.application_selection.application.nominee_info') }}
                </v-card-title>
                                      
                                        <v-card-text class="mt-5">
                                            <div class="pa-2 mb-4">
                                                <v-row>
                                                    
                                                    <v-col cols="6" lg="6">
                                                        <ValidationProvider name="Nominee Name (BN)" vid="nominee_bn"
                                                            rules="required" v-slot="{ errors }">
                                                            <label style="display: inline-block">  {{ $t('container.application_selection.application.name_bn') }}
                                                            </label>
                                                        
                                                            <v-text-field v-model="data.nominee_bn" outlined readonly
                                                                :error="errors[0] ? true : false"
                                                                :error-messages="errors[0]">
                                                            </v-text-field>
                                                        </ValidationProvider>
                                                    </v-col>
                                                    <v-col cols="6" lg="6">
                                                        <ValidationProvider name="Nominee Name (EN)" vid="nominee_en"
                                                            rules="required" v-slot="{ errors }">
                                                            <label style="display: inline-block">{{ $t('container.application_selection.application.name_en') }}
                                                            </label>
                                                       
                                                            <v-text-field v-model="data.nominee_en" outlined readonly
                                                                :error="errors[0] ? true : false"
                                                                :error-messages="errors[0]">
                                                            </v-text-field>
                                                        </ValidationProvider>
                                                    </v-col>
                                                    <v-col cols="6" lg="6">
                                                        <ValidationProvider name="National Identity (NID) /
Birth Registration Number" vid="nominee_verification_number" v-slot="{ errors }">
                                                            <label>{{ $t('container.application_selection.application.nid_brn') }}
                                                            </label>
                                                            <v-text-field v-model="data.nominee_verification_number"
                                                                outlined readonly type="number"
                                                                :error="errors[0] ? true : false"
                                                                :error-messages="errors[0]">
                                                            </v-text-field>
                                                        </ValidationProvider>
                                                    </v-col>
                                                    <v-col cols="6" lg="6">
                                                        <ValidationProvider name="Nominee Natinality"
                                                            vid="nominee_nationality" v-slot="{ errors }">
                                                            <label>{{ $t('container.application_selection.application.nationality') }} </label>
                                                            <v-text-field v-model="data.nominee_nationality" outlined
                                                                readonly :error="errors[0] ? true : false"
                                                                :error-messages="errors[0]">
                                                            </v-text-field>
                                                        </ValidationProvider>
                                                    </v-col>
                                                    <v-col cols="12" lg="12">
                                                        <ValidationProvider name="Gender of Nominee"
                                                            vid="nominee_relation_with_beneficiary" v-slot="{ errors }"
                                                            rules="required">
                                                            <label>{{ $t('container.application_selection.application.relationship') }} </label>
                                                            
                                                         
                                                            <v-text-field v-model="data.nominee_relation_with_beneficiary"
                                                                outlined readonly>
                                                            </v-text-field>
                                                        </ValidationProvider>
                                                    </v-col>
                                                    <v-col cols="6" lg="6">


                                                        <v-img :src="nominee_image" style="
                                    width: 200px;
                                    height: 200px;
                                    border: 1px solid #ccc;
                                  " class="mb-5"></v-img>
                                                        <!-- <ValidationProvider v-slot="{ errors }" name="Image"
                                                            rules="required" vid="image">
                                                            <label>Image</label>

                                                            <v-file-input outlined show-size counter
                                                                prepend-inner-icon="mdi-camera" v-model="data.nominee_image"
                                                                accept="image/*" @change="previewImageNominee"
                                                                prepend-icon=""></v-file-input>
                                                        </ValidationProvider> -->
                                                    </v-col>
                                                    <v-col cols="6" align-self="end" lg="6">
                                                        <!-- <v-img :src="nominee_image"  style="
                                    width: 150px;
                                    height: 80px;
                                    border: 1px solid #ccc;
                                  " class="mb-5"></v-img> -->
                                                        <v-img :src="nominee_image" style="
                                    width: 200px;
                                    height: 80px;
                                    border: 1px solid #ccc;
                                  " class="mb-5"></v-img>
                                                        <!-- <ValidationProvider v-slot="{ errors }" name="Signature"
                                                            rules="required" vid="nominee_signature">
                                                            <label>Signature</label>
                                                            <v-file-input outlined show-size counter
                                                                prepend-inner-icon="mdi-camera"
                                                                v-model="data.nominee_signature"
                                                                prepend-icon=""></v-file-input>
                                                        </ValidationProvider> -->
                                                    </v-col>

                                                    <v-col cols="12" lg="12">
                                                        <ValidationProvider name="Address of Nominee" vid="nominee_address"
                                                            v-slot="{ errors }" rules="required">
                                                            <label>{{ $t('container.application_selection.application.nominee_address') }}</label>
                                                            <v-textarea v-model="data.nominee_address" outlined readonly
                                                                :error="errors[0] ? true : false"
                                                                :error-messages="errors[0]"></v-textarea>
                                                        </ValidationProvider>
                                                    </v-col>
                                                </v-row>
                                            </div>
                                        </v-card-text>
                                    </v-card>

                                    <!-- Nominee Information End -->
                                    <!-- 5th Expansion panel -->
                                    <!-- Other Information of Eligibility -->
                                  
                                    <v-card class="mt-5" >
                                        <!-- <v-card-text color="primary">
                                            <h3 class="white--text">
                                                Other Information of Eligibility
                                            </h3>
                                        </v-expansion-panel-header> -->
                                        <v-card-title style="background-color: #1976D2; color: white;">
         {{ $t('container.application_selection.application.eligiblity_info') }}
            </v-card-title>
                                        <v-card-text class="mt-5">
                                            <v-row>
                                                <v-col v-for="(field, index) in variable" :key="index" cols="6" lg="6">

                                                       <template>
            <label>
                {{ field.parent ? field.parent.name_en : '' }}
                <!-- {{ field.parent ? (language === 'bn' ? field.parent.name_bn : field.parent.name_en) : (language === 'bn' ? field.name_bn : field.name_en) }} -->
    </label>
            <v-text-field v-model="field.name_en" outlined readonly></v-text-field>
        </template>

                                                </v-col>


                                            </v-row>
                                           
                                        </v-card-text>
                                    </v-card>
                                    <!-- Other Information of Eligibility end-->

                          
                            </div>
    <div style="display: flex; justify-content: flex-end;" class="mt-5">
        <!-- Other content on the left -->

        <v-btn flat color="gray" type="submit" @click="navigateTolist" class="custom-btn">
            {{ $t('container.list.back') }}
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
import { required } from 'vee-validate/dist/rules';
import Form from "vform";

export default {
    title: "CTM - Online Application",
    data() {
        return {
            applications: [],
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
                "Widower",
                "Husband Abondoner",
                "Divorced",
                "Spouse Separated",
                "Polygamy"
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
            whole_program:[],
            genderName:null,




            // data: {
            //     location_type: null,
            //     program_id: null,
            //     verification_type: 1,
            //     verification_number: 123345678,
            //     age: 24,
            //     date_of_birth: "1999-11-11",
            //     name_en: 'null',
            //     name_bn: 'null',
            //     father_name_en: 'null',
            //     father_name_bn: 'null',
            //     mother_name_en: 'null',
            //     mother_name_bn: 'null',
            //     spouse_name_en: 'null',
            //     spouse_name_bn: 'null',
            //     identification_mark: 'null',
            //     image: null,
            //     signature: null,
            //     nationality: 'null',
            //     gender_id: null,
            //     education_status: null,
            //     profession: 'null',
            //     religion: null,
            //     division_id: null,
            //     district_id: null,
            //     upazila: null,
            //     post_code: null,
            //     address: 'null',
            //     location_type: null,
            //     thana_id: null,
            //     union_id: null,
            //     city_id: null,
            //     city_thana_id: null,
            //     district_pouro_id: null,
            //     mobile: '01877678899',
            //     permanent_division_id: null,
            //     permanent_district_id: null,
            //     permanent_upazila: null,
            //     permanent_post_code: null,
            //     permanent_address: 'null',
            //     permanent_location_type: null,
            //     permanent_thana_id: null,
            //     permanent_union_id: null,
            //     permanent_city_id: null,
            //     permanent_city_thana_id: null,
            //     permanent_district_pouro_id: null,
            //     permanent_mobile: null,
            //     nominee_en: 'null',
            //     nominee_bn: 'null',
            //     nominee_verification_number: 2212121,
            //     nominee_address: 'null',
            //     nominee_image: null,
            //     nominee_signature: null,
            //     nominee_relation_with_beneficiary: null,
            //     nominee_nationality: 'null',
            //     account_name: 'null',
            //     account_owner: null,
            //     account_number: '01877678899',
            //     application_allowance_values: [],
            //     application_pmt: [],
            //     marital_status: null,
            //     email: 'null@gmail.com',
            // },
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
            this.$router.push("/application-management/application");
        },
        async getApplicationById() {

            this.$axios
                .get(`/admin/application/get/${this.$route.params.id}`, {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },

                })
                .then((result) => {

                    this.data = result.data.application;
                  
                    const genderArray = this.genders;
                    
                    // Now you can use nameEnOfId23 as needed
                    

                    // Find the object with id 23
                    const genderObject = genderArray.find(gender => gender.id === this.data.gender_id

                    );

                    // Check if the object with id 23 was found
                 
                        // Access the name_en property of the found object
                        this.genderName = genderObject.value_en;
                       

                        // Now you can use nameEnOfId23 as needed
                       
             
                        // Handle the case where the object with id 23 was not found
                  
                  

                    this.current_location = result?.data?.application?.current_location;
                    this.permanent_location = result?.data?.application?.permanent_location;
                    this.variable = result?.data?.application?.subvariable;
                    this.allowance_filed = result?.data?.unique_additional_fields
                    this.program_name = this.data?.program.name_en;
                    this.whole_program = this.data?.program;
                    this.image = result?.data?.image
                    this.signature = result?.data?.signature;
                    this.nominee_image = result?.data?.nominee_image;
                    this.nominee_signature = result?.data?.nominee_signature;


                    console.log(this.allowance_filed, "this.allowance_filed")
                    console.log(this.permanent_location, "this.permanent_location")
                    if (this.current_location?.location_type == 3) {

                        this.data.division_id = this.current_location?.parent?.parent?.parent?.parent?.name_en;
                        this.data.district_id = this.current_location?.parent?.parent?.parent?.name_en;
                        this.data.location_type = this.current_location.location_type
                        this.data.city_id = this.current_location?.parent?.parent?.name_en;
                        this.data.city_thana_id = this.current_location?.parent?.name_en;
                        this.data.ward_id = this.current_location?.name_en;
                        this.data.post_code = this.data?.current_post_code;
                        this.data.address = this.data?.current_address;

                    }
                    if (this.current_location?.location_type == 2) {

                        this.data.division_id = this.current_location?.parent?.parent?.parent?.parent?.name_en;
                        this.data.district_id = this.current_location?.parent?.parent?.parent?.name_en;
                        this.data.location_type = this.current_location.location_type
                        this.data.thana_id = this.current_location?.parent?.parent?.name_en;
                        this.data.union_id = this.current_location?.parent?.name_en;
                        this.data.ward_id = this.current_location?.name_en;
                        this.data.post_code = this.data?.current_post_code;
                        this.data.address = this.data?.current_address;

                    }
                    if (this.current_location?.location_type == 1) {

                        this.data.division_id = this.current_location?.parent?.parent?.parent?.name_en;
                        this.data.district_id = this.current_location?.parent?.parent?.name_en;
                        this.data.location_type = this.current_location.location_type
                        this.data.district_pouro_id = this.current_location?.parent?.name_en;

                        this.data.ward_id = this.current_location?.name_en;
                        this.data.post_code = this.data?.current_post_code;
                        this.data.address = this.data?.current_address;

                    }
                    if (this.permanent_location?.location_type == 3) {

                        this.data.permanent_division_id = this.permanent_location?.parent?.parent?.parent?.parent?.name_en;
                        this.data.permanent_district_id = this.permanent_location?.parent?.parent?.parent?.name_en;
                        this.data.permanent_location_type = this.permanent_location.location_type
                        this.data.permanent_city_id = this.permanent_location?.parent?.parent?.name_en;
                        this.data.permanent_city_thana_id = this.permanent_location?.parent?.name_en;
                        this.data.permanent_ward_id = this.permanent_location?.name_en;
                        this.data.permanent_post_code = this.data?.permanent_post_code;
                        this.data.permanent_address = this.data?.permanent_address;

                    }
                    if (this.permanent_location?.location_type == 2) {

                        this.data.permanent_division_id = this.permanent_location?.parent?.parent?.parent?.parent?.name_en;
                        this.data.permanent_district_id = this.permanent_location?.parent?.parent?.parent?.name_en;
                        this.data.permanent_location_type = this.permanent_location.location_type
                        this.data.permanent_thana_id = this.permanent_location?.parent?.parent?.name_en;
                        this.data.permanent_union_id = this.permanent_location?.parent?.name_en;
                        this.data.permanent_ward_id = this.permanent_location?.name_en;
                        this.data.permanent_post_code = this.data?.permanent_post_code;
                        this.data.permanent_address = this.data?.permanent_address;
                    }
                    if (this.permanent_location?.location_type == 1) {

                        this.data.permanent_division_id = this.permanent_location?.parent?.parent?.parent?.name_en;
                        this.data.permanent_district_id = this.permanent_location?.parent?.parent?.name_en;
                        this.data.permanent_location_type = this.permanent_location.location_type
                        this.data.permanent_district_pouro_id = this.permanent_location?.parent?.name_en;

                        this.data.permanent_ward_id = this.permanent_location?.name_en;
                        this.data.permanent_post_code = this.data?.permanent_post_code;
                        this.data.permanent_address = this.data?.permanent_address;

                    }


                });

        },
        concatenateCheckboxValues(checkboxValues) {
            return checkboxValues.map(value => value.value).join(', ');
        }

    },


    created() {
        this.getApplicationById();
        this.$store
            .dispatch("getGlobalLookupByType", 20)
            .then((res) => (this.classes = res));
        this.$store
            .dispatch("getGlobalLookupByType", 2)
            .then((res) => (this.genders = res));
        this.$store
            .dispatch("getGlobalLookupByType", 1)
            .then((res) => (this.locationType = res));


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
