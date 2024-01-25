<template>
    <div id="application_view">
        <v-row class="mx-5 my-5 mt-5">
            <v-col class="mt-5" cols="12">
                <ValidationObserver ref="form" v-slot="{ invalid }">
                    <form @submit.prevent="submitApplication()">
                        <v-card class="pa-5 px-10 mb-4">


                            <ValidationProvider name="program" vid="program" rules="required" v-slot="{ errors }">
                                <label>Program </label>
                                <span style="margin-left: 4px; color: red">*</span>
                                <v-select outlined :items="data?.program" item-text="name_en" item-value="id"
                                    v-model="data.program_id" required :error="errors[0] ? true : false"
                                    :error-messages="errors[0]" readonly>
                                </v-select>
                            </ValidationProvider>
                            <div>
                                <v-expansion-panels v-model="panel" multiple>
                                    <!-- Applicant Verification -->
                                    <v-expansion-panel>
                                        <v-expansion-panel-header color="primary">
                                            <h3 class="white--text">Applicant Verification</h3>
                                        </v-expansion-panel-header>
                                        <v-expansion-panel-content class="mt-5">
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
                                                                NID No
                                                            </span>
                                                            <span v-else-if="data.verification_type == 2">
                                                                BRN No
                                                            </span>
                                                            <span v-else>
                                                                NID / BRN No
                                                            </span>

                                                        </label>
                                                        <span style="margin-left: 4px; color: red">*</span>
                                                        <v-text-field outlined readonly v-model="data.verification_number"
                                                            class="mr-2" type="number" required
                                                            :error="errors[0] ? true : false" :error-messages="errors[0]">
                                                        </v-text-field>
                                                    </ValidationProvider>
                                                </v-col>

                                                <v-col>
                                                    <label>Date of Birth </label>

                                                    <span style="margin-left: 4px; color: red">*</span>


                                                    <v-text-field v-model="data.date_of_birth" readonly outlined>

                                                    </v-text-field>

                                                </v-col>
                                            </V-row>

                                            <!-- <div class="d-inline d-flex justify-end">
                                                <v-btn @click="verifyCard()" elevation="2"
                                                    :disabled="data.date_of_birth == null || data.verification_number == null || data.verification_type == null || data.date_of_birth == '' || data.verification_number == '' || data.verification_type == ''"
                                                    class="btn" color="primary">Verify</v-btn>
                                            </div> -->
                                        </v-expansion-panel-content>
                                    </v-expansion-panel>
                                    <!-- Applicant Verification end -->

                                    <!-- 2nd Expansion panel -->


                                    <!-- 3rd Expansion panel -->
                                    <!-- Personal Information  -->
                                    <v-expansion-panel class="mt-5">
                                        <v-expansion-panel-header color="primary">
                                            <h3 class="white--text">Personal Information</h3>
                                        </v-expansion-panel-header>
                                        <v-expansion-panel-content>
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
                                                        <ValidationProvider v-slot="{ errors }" name="Image"
                                                            rules="required" vid="image">
                                                            <label>Image</label>
                                                            <v-file-input outlined show-size counter
                                                                prepend-inner-icon="mdi-camera" v-model="data.image"
                                                                accept="image/*" @change="previewImage"
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
                                                        <ValidationProvider v-slot="{ errors }" name="Signature"
                                                            rules="required" vid="sign">
                                                            <label>Signature</label>
                                                            <v-file-input outlined show-size counter
                                                                prepend-inner-icon="mdi-camera" v-model="data.signature"
                                                                accept="image/*" @change="previewSign"
                                                                prepend-icon=""></v-file-input>
                                                        </ValidationProvider>
                                                    </v-col>
                                                    <v-col cols="6" lg="6">
                                                        <ValidationProvider name="Name in Bangla" vid="name_bn"
                                                            rules="required" v-slot="{ errors }">
                                                            <label>Name (BN) </label>
                                                            <span style="margin-left: 4px; color: red">*</span>
                                                            <v-text-field v-model="data.name_bn" outlined readonly
                                                                :error="errors[0] ? true : false"
                                                                :error-messages="errors[0]">
                                                            </v-text-field>
                                                        </ValidationProvider>
                                                    </v-col>
                                                    <v-col cols="6" lg="6">
                                                        <ValidationProvider name="Name in English" vid="name_en"
                                                            rules="required" v-slot="{ errors }">
                                                            <label>Name (EN) </label>
                                                            <span style="margin-left: 4px; color: red">*</span>
                                                            <v-text-field v-model="data.name_en" outlined readonly
                                                                :error="errors[0] ? true : false"
                                                                :error-messages="errors[0]">
                                                            </v-text-field>
                                                        </ValidationProvider>
                                                    </v-col>
                                                    <v-col cols="6" lg="6">
                                                        <ValidationProvider name="Father Name in Bangla"
                                                            vid="father_name_bn" rules="required" v-slot="{ errors }">
                                                            <label>Father Name (BN)</label>

                                                            <v-text-field v-model="data.father_name_bn" outlined required
                                                                readonly :error="errors[0] ? true : false"
                                                                :error-messages="errors[0]">
                                                            </v-text-field>
                                                        </ValidationProvider>
                                                    </v-col>
                                                    <v-col cols="6" lg="6">
                                                        <ValidationProvider name="Father Name in English"
                                                            vid="father_name_en" rules="required" v-slot="{ errors }">
                                                            <label>Father Name (EN)</label>
                                                            <v-text-field v-model="data.father_name_en" outlined required
                                                                readonly :error="errors[0] ? true : false"
                                                                :error-messages="errors[0]">
                                                            </v-text-field>
                                                        </ValidationProvider>
                                                    </v-col>
                                                    <v-col cols="6" lg="6">
                                                        <ValidationProvider name="Mother Name in English"
                                                            vid="mother_name_bn" v-slot="{ errors }">
                                                            <label>Mother Name (BN)</label>
                                                            <v-text-field v-model="data.mother_name_bn" outlined required
                                                                readonly :error="errors[0] ? true : false"
                                                                :error-messages="errors[0]">
                                                            </v-text-field>
                                                        </ValidationProvider>
                                                    </v-col>
                                                    <v-col cols="6" lg="6">
                                                        <ValidationProvider name="Mother Name in English"
                                                            vid="mother_name_en" v-slot="{ errors }">
                                                            <label>Mother Name (EN)</label>
                                                            <v-text-field v-model="data.mother_name_en" outlined readonly
                                                                required :error="errors[0] ? true : false"
                                                                :error-messages="errors[0]">
                                                            </v-text-field>
                                                        </ValidationProvider>
                                                    </v-col>
                                                    <v-col cols="6" lg="6">
                                                        <ValidationProvider name="Spouse Name in Bangla"
                                                            vid="spouse_name_bn" v-slot="{ errors }">
                                                            <label>Spouse Name (BN)</label>
                                                            <v-text-field v-model="data.spouse_name_bn" outlined readonly
                                                                :error="errors[0] ? true : false"
                                                                :error-messages="errors[0]">
                                                            </v-text-field>
                                                        </ValidationProvider>
                                                    </v-col>
                                                    <v-col cols="6" lg="6">
                                                        <ValidationProvider name="Marital Status" vid="marital_status"
                                                            v-slot="{ errors }">
                                                            <label>Marital Status</label>
                                                            <v-select v-model="data.marital_status" outlined readonly
                                                                required :items="marital_status"
                                                                :error="errors[0] ? true : false"
                                                                :error-messages="errors[0]">
                                                            </v-select>
                                                        </ValidationProvider>
                                                    </v-col>
                                                    <v-col cols="6" lg="6">
                                                        <ValidationProvider name="Spouse Name in English"
                                                            vid="spouse_name_en" v-slot="{ errors }">
                                                            <label>Spouse Name (EN)</label>
                                                            <v-text-field v-model="data.spouse_name_en" outlined readonly
                                                                :error="errors[0] ? true : false"
                                                                :error-messages="errors[0]">
                                                            </v-text-field>
                                                        </ValidationProvider>
                                                    </v-col>
                                                    <v-col cols="6" lg="6">
                                                        <ValidationProvider name="Religion" vid="religion"
                                                            v-slot="{ errors }" rules="required">
                                                            <label>Religion</label>
                                                            <span style="margin-left: 4px; color: red">*</span>

                                                            <v-select v-model="data.religion" outlined required
                                                                :items="religion" :error="errors[0] ? true : false"
                                                                :error-messages="errors[0]">
                                                            </v-select>
                                                        </ValidationProvider>
                                                    </v-col>
                                                    <v-col cols="6" lg="6">
                                                        <ValidationProvider name="Mobile Number" vid="mobile"
                                                            rules="required" v-slot="{ errors }">
                                                            <label style="display: inline-block">Mobile Number
                                                            </label>
                                                            <span style="margin-left: 4px; color: red">*</span>
                                                            <v-text-field v-model="data.mobile" outlined readonly
                                                                type="Number" :error="errors[0] ? true : false"
                                                                :error-messages="errors[0]">
                                                            </v-text-field>
                                                        </ValidationProvider>
                                                    </v-col>

                                                    <v-col cols="6" lg="6">
                                                        <ValidationProvider name="Nationality" vid="nationality"
                                                            v-slot="{ errors }">
                                                            <label>Nationality</label>
                                                            <v-text-field v-model="data.nationality" outlined required
                                                                readonly :error="errors[0] ? true : false"
                                                                :error-messages="errors[0]">
                                                            </v-text-field>
                                                        </ValidationProvider>
                                                    </v-col>
                                                    <v-col cols="6" lg="6">
                                                        <ValidationProvider name="Age" vid="age" v-slot="{ errors }"
                                                            rules="required">
                                                            <label>Age</label>
                                                            <span style="margin-left: 4px; color: red">*</span>
                                                            <v-text-field v-model="data.age" outlined type="number" required
                                                                readonly :error="errors[0] ? true : false"
                                                                :error-messages="errors[0]">
                                                            </v-text-field>
                                                        </ValidationProvider>
                                                    </v-col>
                                                    <v-col cols="6" lg="6">
                                                        <ValidationProvider name="Gender" vid="gender" v-slot="{ errors }"
                                                            rules="required">
                                                            <label>Gender</label>
                                                            <span style="margin-left: 4px; color: red">*</span>
                                                            <v-select v-model="data.gender_id" item-text="value_en"
                                                                item-value="id" outlined :items="genders" required
                                                                :error="errors[0] ? true : false"
                                                                :error-messages="errors[0]" readonly>
                                                            </v-select>
                                                        </ValidationProvider>
                                                    </v-col>
                                                    <v-col cols="6" lg="6">
                                                        <ValidationProvider name="Education Status" vid="education_status"
                                                            rules="required" v-slot="{ errors }">
                                                            <label>Education Status</label>
                                                            <span style="margin-left: 4px; color: red">*</span>
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
                                                            <label>Profession</label>
                                                            <v-text-field v-model="data.profession" outlined readonly
                                                                :error="errors[0] ? true : false"
                                                                :error-messages="errors[0]">
                                                            </v-text-field>
                                                        </ValidationProvider>
                                                    </v-col>
                                                    <v-col cols="6" lg="6">
                                                        <ValidationProvider name="Identification Mark"
                                                            vid="identification_mark" v-slot="{ errors }">
                                                            <label>Identification Mark</label>
                                                            <v-text-field v-model="data.identification_mark" outlined
                                                                readonly :error="errors[0] ? true : false"
                                                                :error-messages="errors[0]">
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
                                            <h3 class="white--text">Contact Information</h3>
                                        </v-expansion-panel-header>
                                        <v-expansion-panel-content class="mt-5">


                                            <v-row>
                                                <v-col cols="12" class="text-center">
                                                    <v-chip color="success" class="text-uppercase" label>Present
                                                        Address</v-chip>
                                                </v-col>
                                                <!-- {{ permanent_location }}  -->
                                                <v-col lg="6" md="6" cols="12">

                                                    <label style="display: inline-block">Division
                                                    </label>
                                                    <span style="margin-left: 4px; color: red">*</span>
                                                    <v-text-field v-model="data.division_id" readonly
                                                        outlined></v-text-field>

                                                </v-col>
                                                <v-col lg="6" md="6" cols="12">

                                                    <label style="display: inline-block">District
                                                    </label>
                                                    <v-text-field v-model="data.district_id" readonly
                                                        outlined></v-text-field>
                                                </v-col>
                                                <v-col lg="6" md="6" cols="12">
                                                    <ValidationProvider name="Location Type" vid="location_type"
                                                        rules="required" v-slot="{ errors }">
                                                        <label style="display: inline-block">Location Type
                                                        </label>
                                                        <span style="margin-left: 4px; color: red">*</span>
                                                        <v-autocomplete @input="LocationType($event)"
                                                            v-model="data.location_type"
                                                            :hide-details="errors[0] ? false : true" outlined
                                                            :items="locationType" item-text="value_en" item-value="id"
                                                            readonly :error="errors[0] ? true : false"
                                                            :error-messages="errors[0]"></v-autocomplete>
                                                    </ValidationProvider>
                                                </v-col>
                                                <v-col v-if="data.location_type == 2" lg="6" md="6" cols="12">

                                                    <label style="display: inline-block">Upazila
                                                    </label>
                                                    <span style="margin-left: 4px; color: red">*</span>
                                                    <v-text-field v-model="data.thana_id" outlined readonly></v-text-field>

                                                </v-col>
                                                <v-col v-if="data.location_type == 2" lg="6" md="6" cols="12">

                                                    <label style="display: inline-block">Union/Pouroshava
                                                    </label>
                                                    <span style="margin-left: 4px; color: red">*</span>
                                                    <v-text-field v-model="data.union_id" outlined readonly></v-text-field>

                                                </v-col>
                                                <v-col v-if="data.location_type == 3" lg="6" md="6" cols="12">

                                                    <label style="display: inline-block">City
                                                    </label>
                                                    <span style="margin-left: 4px; color: red">*</span>
                                                    <v-text-field v-model="data.city_id" outlined readonly></v-text-field>

                                                </v-col>
                                                <v-col v-if="data.location_type == 3" lg="6" md="6" cols="12">
                                                    <label style="display: inline-block">Thana
                                                    </label>
                                                    <span style="margin-left: 4px; color: red">*</span>
                                                    <v-text-field v-model="data.city_thana_id" outlined
                                                        readonly></v-text-field>
                                                </v-col>
                                                <v-col v-if="data.location_type == 1" lg="6" md="6" cols="12">

                                                    <label style="display: inline-block">District Pouroshava
                                                    </label>
                                                    <v-text-field v-model="data.district_pouro_id" outlined
                                                        readonly></v-text-field>
                                                </v-col>

                                                <v-col lg="6" md="6" cols="6">

                                                    <label style="display: inline-block">Ward
                                                    </label>
                                                    <span style="margin-left: 4px; color: red">*</span>
                                                    <v-text-field v-model="data.ward_id" outlined readonly></v-text-field>

                                                </v-col>
                                                <v-col cols="6" lg="6">
                                                    <ValidationProvider name="Post Code" vid="post_code" rules="required"
                                                        v-slot="{ errors }">
                                                        <label style="display: inline-block">Post Code
                                                        </label>
                                                        <span style="margin-left: 4px; color: red">*</span>
                                                        <v-text-field v-model="data.post_code" outlined readonly
                                                            :error="errors[0] ? true : false" :error-messages="errors[0]">
                                                        </v-text-field>
                                                    </ValidationProvider>
                                                </v-col>




                                                <v-col cols="6" lg="6">
                                                    <ValidationProvider name="Village/House No.,
                                                        Road No., Block No, Section" vid="address" rules="required"
                                                        v-slot="{ errors }">
                                                        <label style="display: inline-block">Village/House No., Road No.,
                                                            Block No, Section
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
                                                    <v-chip color="success" class="text-uppercase" label>Permanent
                                                        Address</v-chip>
                                                </v-col>


                                                <v-col lg="6" md="6" cols="12">

                                                    <label style="display: inline-block">Division
                                                    </label>
                                                    <span style="margin-left: 4px; color: red">*</span>
                                                    <v-text-field v-model="data.division_id" readonly
                                                        outlined></v-text-field>

                                                </v-col>
                                                <v-col lg="6" md="6" cols="12">

                                                    <label style="display: inline-block">District
                                                    </label>
                                                    <v-text-field v-model="data.permanent_district_id" readonly
                                                        outlined></v-text-field>
                                                </v-col>
                                                <v-col lg="6" md="6" cols="12">
                                                    <ValidationProvider name="Location Type" vid="location_type"
                                                        rules="required" v-slot="{ errors }">
                                                        <label style="display: inline-block">Location Type
                                                        </label>
                                                        <span style="margin-left: 4px; color: red">*</span>
                                                        <v-autocomplete @input="LocationType($event)"
                                                            v-model="data.permanent_location_type"
                                                            :hide-details="errors[0] ? false : true" outlined
                                                            :items="locationType" item-text="value_en" item-value="id"
                                                            readonly :error="errors[0] ? true : false"
                                                            :error-messages="errors[0]"></v-autocomplete>
                                                    </ValidationProvider>
                                                </v-col>
                                                <v-col v-if="data.permanent_location_type == 2" lg="6" md="6" cols="12">

                                                    <label style="display: inline-block">Upazila
                                                    </label>
                                                    <span style="margin-left: 4px; color: red">*</span>
                                                    <v-text-field v-model="data.permanent_thana_id" outlined
                                                        readonly></v-text-field>

                                                </v-col>
                                                <v-col v-if="data.permanent_location_type == 2" lg="6" md="6" cols="12">

                                                    <label style="display: inline-block">Union/Pouroshava
                                                    </label>
                                                    <span style="margin-left: 4px; color: red">*</span>
                                                    <v-text-field v-model="data.permanent_union_id" outlined
                                                        readonly></v-text-field>

                                                </v-col>
                                                <v-col v-if="data.permanent_location_type == 3" lg="6" md="6" cols="12">

                                                    <label style="display: inline-block">City
                                                    </label>
                                                    <span style="margin-left: 4px; color: red">*</span>
                                                    <v-text-field v-model="data.permanent_city_id" outlined
                                                        readonly></v-text-field>

                                                </v-col>
                                                <v-col v-if="data.permanent_location_type == 3" lg="6" md="6" cols="12">
                                                    <label style="display: inline-block">Thana
                                                    </label>
                                                    <span style="margin-left: 4px; color: red">*</span>
                                                    <v-text-field v-model="data.permanent_city_thana_id" outlined
                                                        readonly></v-text-field>
                                                </v-col>
                                                <v-col v-if="data.permanent_location_type == 1" lg="6" md="6" cols="12">

                                                    <label style="display: inline-block">District Pouroshava
                                                    </label>
                                                    <v-text-field v-model="data.permanent_district_pouro_id" outlined
                                                        readonly></v-text-field>
                                                </v-col>

                                                <v-col lg="6" md="6" cols="6">

                                                    <label style="display: inline-block">Ward
                                                    </label>
                                                    <span style="margin-left: 4px; color: red">*</span>
                                                    <v-text-field v-model="data.permanent_ward_id" outlined
                                                        readonly></v-text-field>

                                                </v-col>
                                                <v-col cols="6" lg="6">
                                                    <ValidationProvider name="Post Code" vid="post_code" rules="required"
                                                        v-slot="{ errors }">
                                                        <label style="display: inline-block">Post Code
                                                        </label>
                                                        <span style="margin-left: 4px; color: red">*</span>
                                                        <v-text-field v-model="data.permanent_post_code" outlined readonly
                                                            :error="errors[0] ? true : false" :error-messages="errors[0]">
                                                        </v-text-field>
                                                    </ValidationProvider>
                                                </v-col>




                                                <v-col cols="6" lg="6">
                                                    <ValidationProvider name="Village/House No.,
                                                        Road No., Block No, Section" vid="address" rules="required"
                                                        v-slot="{ errors }">
                                                        <label style="display: inline-block">Village/House No., Road No.,
                                                            Block No, Section
                                                        </label>
                                                        <span style="margin-left: 4px; color: red">*</span>
                                                        <v-text-field v-model="data.permanent_address" outlined readonly
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
                                                Information According to the {{ programName }}
                                            </h3>
                                        </v-expansion-panel-header>
                                        <v-expansion-panel-content class="mt-5">
                                            <!-- <v-expansion-panel-content class="mt-5">
                                            <div v-if="programDetails" class="py-2 ma-4">
                                                <v-row>
                                                    <template v-if="checkIsHaveDIS()">
                                                        <v-col cols="6" lg="6">
                                                            <template>
                                                                <label>{{ programDetails?.additional_field[keyGetByName("DIS
                                                                                                                                    No.")].name_en }}
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
                                                                        :hide-details="errors[0] ? false : true"
                                                                        :error="errors[0] ? true : false"
                                                                        :error-messages="errors[0]" type="number" outlined>
                                                                    </v-text-field>
                                                                </ValidationProvider>
                                                            </template>

                                                        </v-col>
                                                        <v-col cols="6" lg="6">
                                                            <template>
                                                                <label>{{
                                                                    programDetails?.additional_field[keyGetByName("Disability
                                                                                                                                    Type")].name_en }}
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
                                                                        :hide-details="errors[0] ? false : true"
                                                                        :error="errors[0] ? true : false"
                                                                        :error-messages="errors[0]" type="text" disabled
                                                                        outlined>
                                                                    </v-text-field>
                                                                </ValidationProvider>
                                                            </template>
                                                        </v-col>
                                                        <v-col cols="12" lg="12">
                                                            <div class="d-inline d-flex justify-end">
                                                                <v-btn @click="verifyDISCard()" elevation="2"
                                                                    :disabled="data.application_allowance_values[`${keyGetByName('DIS No.')}`].value == null || data.application_allowance_values[`${keyGetByName('DIS No.')}`].value == ''"
                                                                    class="btn" color="primary">Verify</v-btn>
                                                            </div>
                                                        </v-col>
                                                    </template>
                                                    <v-col v-for="(
                              fields, index
                            ) in programDetails.additional_field" :key="index" cols="6" lg="6"
                                                        v-if="programDetails?.additional_field.length != 0 && keyGetByName('DIS No.') != index && keyGetByName('Disability Type') != index">
                                                        <template v-if="fields.type == 'dropdown'">
                                                            <label>{{ fields.name_en }}
                                                                <span style="
                                    margin-left: 4px;
                                    margin-right: 4px;
                                    color: red;
                                  ">*</span></label>
                                                            <ValidationProvider :name="fields.name_en"
                                                                vid="allowance_program_additional_field_values_id"
                                                                rules="required" v-slot="{ errors }">
                                                                <v-select :hide-details="errors[0] ? false : true"
                                                                    :error="errors[0] ? true : false"
                                                                    :error-messages="errors[0]" outlined required v-model="data.application_allowance_values[index]
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
                                                        <template v-if="fields.type == 'number'">
                                                            <label>{{ fields.name_en }}
                                                                <span style="
                                    margin-left: 4px;
                                    margin-right: 4px;
                                    color: red;
                                  ">*</span></label>
                                                            <ValidationProvider :name="fields.name_en" vid="value"
                                                                rules="required" v-slot="{ errors }">
                                                                <v-text-field v-model="data.application_allowance_values[index]
                                                                        .value
                                                                    " :hide-details="errors[0] ? false : true" :error="errors[0] ? true : false"
                                                                    :error-messages="errors[0]" type="number" outlined>
                                                                </v-text-field>
                                                            </ValidationProvider>
                                                        </template>
                                                        <template v-if="fields.type == 'checkbox'">
                                                            <label>{{ fields.name_en
                                                            }}<span style="
                                    margin-left: 4px;
                                    margin-right: 4px;
                                    color: red;
                                  ">*</span></label>
                                                            <ValidationProvider :name="fields.name_en"
                                                                vid="allowance_program_additional_field_values_id"
                                                                rules="required" v-slot="{ errors }">
                                                                <v-select multiple :hide-details="errors[0] ? false : true"
                                                                    :error="errors[0] ? true : false"
                                                                    :error-messages="errors[0]" outlined required v-model="data.application_allowance_values[index]
                                                                            .allowance_program_additional_field_values_id
                                                                        " :items="fields.additional_field_value" item-value="id" item-text="value">
                                                                </v-select>
                                                            </ValidationProvider>
                                                        </template>
                                                        <template v-if="fields.type == 'file'">
                                                            <label>{{ fields.name_en
                                                            }}<span style="
                                    margin-left: 4px;
                                    margin-right: 4px;
                                    color: red;
                                  ">*</span></label>
                                                            <ValidationProvider :name="fields.name_en" vid="value"
                                                                v-slot="{ errors }">
                                                                <v-file-input v-model="data.application_allowance_values[index]
                                                                        .value
                                                                    " @change="addPreviewFile($event, index)" placeholder="Select your files"
                                                                    prepend-icon prepend-inner-icon="mdi-paperclip" outlined
                                                                    :hide-details="errors[0] ? false : true"
                                                                    :error="errors[0] ? true : false"
                                                                    :error-messages="errors[0]" :show-size="1000">
                                                                </v-file-input>
                                                            </ValidationProvider>
                                                        </template>

                                                        <template v-if="fields.type == 'date'">
                                                            <label>{{ fields.name_en
                                                            }}<span style="
                                    margin-left: 4px;
                                    margin-right: 4px;
                                    color: red;
                                  ">*</span></label>
                                                            <ValidationProvider :name="fields.name_en" vid="value"
                                                                rules="required" v-slot="{ errors }">
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
                                                            <ValidationProvider :name="fields.name_en" vid="value"
                                                                rules="required" v-slot="{ errors }">
                                                                <v-text-field v-model="data.application_allowance_values[index]
                                                                        .value
                                                                    " :hide-details="errors[0] ? false : true" :error="errors[0] ? true : false"
                                                                    :error-messages="errors[0]" disabled type="text"
                                                                    outlined>
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
                                                            <ValidationProvider :name="fields.name_en" vid="value"
                                                                rules="required" v-slot="{ errors }">
                                                                <v-text-field v-model="data.application_allowance_values[index]
                                                                        .value
                                                                    " :hide-details="errors[0] ? false : true" :error="errors[0] ? true : false"
                                                                    :error-messages="errors[0]" type="text" outlined>
                                                                </v-text-field>
                                                            </ValidationProvider>
                                                        </template>
                                                    </v-col>
                                                </v-row>
                                            </div> -->


                                            <v-row>
                                                <v-col v-for="(field, index) in allowance_filed" :key="index" cols="6"
                                                    lg="6">

                                                    <template v-if="field.type === 'number' || field.type === 'text'">
                                                        <label>{{ field.name_en }}</label>
                                                        <v-text-field v-model="field.pivot.value" outlined readonly>
                                                        </v-text-field>
                                                    </template>
                                                    <template v-if="field.type === 'dropdown'">
                                                        <label>{{ field.name_en }}</label>
                                                        <v-text-field v-model="field.allow_addi_field_values[0].value"
                                                            outlined readonly>
                                                        </v-text-field>
                                                    </template>
                                                    <template v-if="field.type === 'checkbox'">
                                                        <label>{{ field.name_en }}</label>
                                                        <v-text-field
                                                            :value="concatenateCheckboxValues(field.allow_addi_field_values)"
                                                            outlined readonly></v-text-field>
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
                                    <!-- Information According to the Program End -->
                                    <!-- Expansion panel 5 start-->
                                    <!-- Bank/MFS Information -->
                                    <v-expansion-panel class="mb-4">
                                        <v-expansion-panel-header color="primary">
                                            <h3 class="white--text">Bank/MFS Information</h3>
                                        </v-expansion-panel-header>
                                        <v-expansion-panel-content class="mt-5">
                                            <v-row>
                                                <v-col cols="6" lg="6">
                                                    <ValidationProvider name="Account Name" vid="account_name"
                                                        rules="required" v-slot="{ errors }">
                                                        <label style="display: inline-block">Account Name
                                                        </label>
                                                        <span style="margin-left: 4px; color: red">*</span>
                                                        <v-text-field v-model="data.account_name" outlined clearable
                                                            :error="errors[0] ? true : false" :error-messages="errors[0]">
                                                        </v-text-field>
                                                    </ValidationProvider>
                                                </v-col>
                                                <v-col cols="6" lg="6">
                                                    <v-radio-group v-model="data.account_type" row>
                                                        Account type
                                                        <span style="
                              margin-left: 4px;
                              margin-right: 4px;
                              color: red;
                            ">*</span>
                                                        <v-radio label="Bank Account" :value="1"></v-radio>
                                                        <v-radio label="MFS (Mobile Financial Service)"
                                                            :value="2"></v-radio>
                                                    </v-radio-group>
                                                </v-col>
                                                <v-col cols="6" lg="6" v-if="data.account_type === 2">
                                                    <ValidationProvider name="Account Ownership" vid="account_owner"
                                                        v-slot="{ errors }">
                                                        <label style="display: inline-block">Mobile Ownership
                                                        </label>
                                                        <span style="margin-left: 4px; color: red">*</span>

                                                        <v-select v-model="data.account_owner" outlined clearable
                                                            :items="mobile_ownership" :error="errors[0] ? true : false"
                                                            :error-messages="errors[0]">
                                                        </v-select>
                                                    </ValidationProvider>
                                                </v-col>

                                                <v-col cols="6" lg="6" v-if="data.account_type === 1">
                                                  
                                                        <label style="display: inline-block">Account Ownership
                                                        </label>
                                                        <span style="margin-left: 4px; color: red">*</span>

                                                        <v-text-field v-model="data.account_owner" outlined  readonly
                                                           >
                                                        </v-text-field>
                                                   
                                                </v-col>
                                                <!-- <v-col cols="6" lg="6" v-if="data.account_type === 2">


                                                    <label style="display: inline-block">Mobile operator </label><span
                                                        style="margin-left: 4px; color: red">*</span>
                                                    <v-select :items="mobile_operators" outlined item-text="operator"
                                                        item-value="id" v-model="data.mobile_operator">

                                                    </v-select>
                                                </v-col> -->


                                                <v-col cols="6" lg="6" v-if="data.account_type === 2">
                                                    <ValidationProvider rules="checkMobileNumber" name="Mobile Number"
                                                        vid="account_number" v-slot="{ errors }">
                                                        <label style="display: inline-block">Mobile Number </label><span
                                                            style="margin-left: 4px; color: red">*</span>

                                                        <v-text-field v-model="data.account_number" outlined type="number"
                                                            clearable :error="errors[0] ? true : false"
                                                            :error-messages="errors[0]">
                                                        </v-text-field>
                                                    </ValidationProvider>

                                                </v-col>
                                                <v-col cols="6" lg="6" v-if="data.account_type === 1">
                                                   
                                                        <label style="display: inline-block">Bank name </label><span
                                                            style="margin-left: 4px; color: red">*</span>

                                                        <v-text-field v-model="data.bank_name" outlined readonly>
                                                        </v-text-field>
                                                 
                                                </v-col>

                                                <v-col cols="6" lg="6" v-if="data.account_type === 1">
                                                 
                                                        <label style="display: inline-block">Branch name </label><span
                                                            style="margin-left: 4px; color: red">*</span>

                                                        <v-text-field v-model="data.branch_name" outlined readonly>
                                                        </v-text-field>
                                                
                                                </v-col>
                                                <v-col cols="6" lg="6" v-if="data.account_type === 1">
                                                  
                                                        <label style="display: inline-block">Bank Account Number
                                                        </label><span style="margin-left: 4px; color: red">*</span>

                                                        <v-text-field v-model="data.account_number" outlined readonly>
                                                        </v-text-field>
                                                 
                                                </v-col>
                                                <v-col cols="6" lg="6">
                                                
                                                        <label style="display: inline-block">Email </label>


                                                        <v-text-field v-model="data.email" outlined clearable readonly>
                                                        </v-text-field>
                                               
                                                </v-col>
                                            </v-row>
                                            <!-- <p class="red--text mt-2">
                                                Must have active Nagad / Bkash account where applicable.
                                            </p> -->
                                        </v-expansion-panel-content>
                                    </v-expansion-panel>
                                    <!-- Bank/MFS Information End -->
                                    <!-- Expansion panel 5 End -->
                                    <!-- Nominee Information -->
                                    <v-expansion-panel class="mb-4">
                                        <v-expansion-panel-header color="primary">
                                            <h3 class="white--text">Nominee Information</h3>
                                        </v-expansion-panel-header>
                                        <v-expansion-panel-content class="mt-5">
                                            <div class="pa-2 mb-4">
                                                <v-row>
                                                    <v-col cols="6" lg="6">
                                                        <ValidationProvider name="Nominee Name (BN)" vid="nominee_bn"
                                                            rules="required" v-slot="{ errors }">
                                                            <label style="display: inline-block">Name (BN)
                                                            </label>
                                                            <span style="margin-left: 4px; color: red">*</span>
                                                            <v-text-field v-model="data.nominee_bn" outlined readonly
                                                                :error="errors[0] ? true : false"
                                                                :error-messages="errors[0]">
                                                            </v-text-field>
                                                        </ValidationProvider>
                                                    </v-col>
                                                    <v-col cols="6" lg="6">
                                                        <ValidationProvider name="Nominee Name (EN)" vid="nominee_en"
                                                            rules="required" v-slot="{ errors }">
                                                            <label style="display: inline-block">Name (EN)
                                                            </label>
                                                            <span style="margin-left: 4px; color: red">*</span>
                                                            <v-text-field v-model="data.nominee_en" outlined readonly
                                                                :error="errors[0] ? true : false"
                                                                :error-messages="errors[0]">
                                                            </v-text-field>
                                                        </ValidationProvider>
                                                    </v-col>
                                                    <v-col cols="6" lg="6">
                                                        <ValidationProvider name="National Identity (NID) /
Birth Registration Number" vid="nominee_verification_number" v-slot="{ errors }">
                                                            <label>National Identity (NID) / Birth Registration
                                                                Number
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
                                                            <label>Nationality </label>
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
                                                            <label>Relationship with Beneficiary</label>
                                                            <span style="margin-left: 4px; color: red">*</span>
                                                            <v-autocomplete v-model="data.nominee_relation_with_beneficiary"
                                                                outlined :items="relations_with_bef" readonly
                                                                :error="errors[0] ? true : false"
                                                                :error-messages="errors[0]">
                                                            </v-autocomplete>
                                                        </ValidationProvider>
                                                    </v-col>
                                                    <v-col cols="6" lg="6">
                                                        <v-img :src="nomineeImageUrl" style="
                                    width: 150px;
                                    height: 150px;
                                    border: 1px solid #ccc;
                                  " class="mb-5" v-if="nomineeImageUrl"></v-img>
                                                        <v-img src="/assets/images/profile.png" v-if="!nomineeImageUrl"
                                                            style="
                                    width: 200px;
                                    height: 200px;
                                    border: 1px solid #ccc;
                                  " class="mb-5"></v-img>
                                                        <ValidationProvider v-slot="{ errors }" name="Image"
                                                            rules="required" vid="image">
                                                            <label>Image</label>

                                                            <v-file-input outlined show-size counter
                                                                prepend-inner-icon="mdi-camera" v-model="data.nominee_image"
                                                                accept="image/*" @change="previewImageNominee"
                                                                prepend-icon=""></v-file-input>
                                                        </ValidationProvider>
                                                    </v-col>
                                                    <v-col cols="6" align-self="end" lg="6">
                                                        <v-img :src="nomineeSignUrl" style="
                                    width: 150px;
                                    height: 80px;
                                    border: 1px solid #ccc;
                                  " class="mb-5" v-if="nomineeSignUrl"></v-img>
                                                        <v-img :src="imageUrlFetch" style="
                                    width: 200px;
                                    height: 80px;
                                    border: 1px solid #ccc;
                                  " class="mb-5"></v-img>
                                                        <ValidationProvider v-slot="{ errors }" name="Signature"
                                                            rules="required" vid="nominee_signature">
                                                            <label>Signature</label>
                                                            <v-file-input outlined show-size counter
                                                                prepend-inner-icon="mdi-camera"
                                                                v-model="data.nominee_signature"
                                                                prepend-icon=""></v-file-input>
                                                        </ValidationProvider>
                                                    </v-col>

                                                    <v-col cols="12" lg="12">
                                                        <ValidationProvider name="Address of Nominee" vid="nominee_address"
                                                            v-slot="{ errors }" rules="required">
                                                            <label>Address</label>
                                                            <v-textarea v-model="data.nominee_address" outlined readonly
                                                                :error="errors[0] ? true : false"
                                                                :error-messages="errors[0]"></v-textarea>
                                                        </ValidationProvider>
                                                    </v-col>
                                                </v-row>
                                            </div>
                                        </v-expansion-panel-content>
                                    </v-expansion-panel>
                                    <!-- Nominee Information End -->
                                    <!-- 5th Expansion panel -->
                                    <!-- Other Information of Eligibility -->
                                    <v-expansion-panel class="mb-4">
                                        <v-expansion-panel-header color="primary">
                                            <h3 class="white--text">
                                                Other Information of Eligibility
                                            </h3>
                                        </v-expansion-panel-header>
                                        <v-expansion-panel-content class="mt-5">
                                            <!-- <div class="pa-2 mb-4">
                                                     <v-row>
                                                           <v-col cols="12" lg="6" md="6" v-for="(variable,indexPMT) in  data.poverty_score" :key='indexPMT'>
        <v-select outlined readonly :label="variable.name_en" :items="variable.children" item-text="name_en"></v-select>
                                            </v-col>

                                        </v-row>
                                                 </div> -->


                                            <!-- <div class="pa-2 mb-4">
                                                <v-row>
                                                    <v-col v-for="(variables, indexPMT) in data.poverty_score" cols="6" lg="6"
                                                        :key='indexPMT'>
                                                        <template v-if="variables.children.length == 0">
                                                            <label>{{ variables.name_en }}
                                                                <span style="
                                  margin-left: 4px;
                                  margin-right: 4px;
                                  color: red;
                                ">*</span></label>
                                                            <ValidationProvider :name="variables.name_en"
                                                                vid="sub_variables" rules="required" v-slot="{ errors }">
                                                                <v-select :hide-details="errors[0] ? false : true"
                                                                    :error="errors[0] ? true : false"
                                                                    :error-messages="errors[0]" outlined required
                                                                    v-model="data.application_pmt[indexPMT].sub_variables"
                                                                    :items="[
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
                                                            <ValidationProvider :name="variables.name_en"
                                                                vid="sub_variables" rules="required" v-slot="{ errors }">
                                                                <v-select :hide-details="errors[0] ? false : true"
                                                                    :error="errors[0] ? true : false"
                                                                    :error-messages="errors[0]" outlined required
                                                                    v-model="data.application_pmt[indexPMT].sub_variables"
                                                                    :items="variables.children" item-value="id"
                                                                    item-text="name_en">
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
                                                            <ValidationProvider :name="variables.name_en"
                                                                vid="sub_variables" rules="required" v-slot="{ errors }">
                                                                <v-select multiple :hide-details="errors[0] ? false : true"
                                                                    :error="errors[0] ? true : false"
                                                                    :error-messages="errors[0]" outlined required
                                                                    v-model="data.application_pmt[indexPMT].sub_variables"
                                                                    :items="variables.children" item-value="id"
                                                                    item-text="name_en">
                                                                </v-select>
                                                            </ValidationProvider>
                                                        </template>
                                                    </v-col>
                                                </v-row>
                                                <div class="d-inline d-flex justify-end">
                                                    <v-btn elevation="2" class="btn mr-2" color="info">Reset</v-btn>
                                               :disabled="invalid" -->
                                            <!-- <v-btn type="submit" flat color="primary" :loading="loading"
                                                        class="custom-btn-width black white--text py-2">
                                                        {{ $t("container.list.submit") }}
                                                    </v-btn>

                                                </div>
                                            </div>  -->
                                        </v-expansion-panel-content>
                                    </v-expansion-panel>
                                    <!-- Other Information of Eligibility end-->

                                </v-expansion-panels>
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
            religion: ["Islam", "Hindu","Buddhist","Christian"],
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
            data: [],

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

                    this.current_location = result?.data?.application?.current_location;
                    this.permanent_location = result?.data?.application?.permanent_location;
                    this.allowance_filed = result?.data?.unique_additional_fields;
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
}</style>
