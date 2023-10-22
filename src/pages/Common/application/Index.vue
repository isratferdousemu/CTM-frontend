<template>
 
    <div id="application">
        <v-app-bar
        color="#405c61"
        fixed
        height="80"
        class="px-4 "
      dense
      dark
    > 
    <v-img
    class="p-3 mr-4"
    max-height="100%"
    max-width="60px"
    position="center center"
    src="/assets/images/logo.png"
  ></v-img>
      <v-toolbar-title>সামাজিক নিরাপত্তা কর্মসূচী
        সমাজসেবা অধিদফতর</v-toolbar-title>
    </v-app-bar>
        <v-row class="mx-5 my-5 mt-10">
            <v-col class="mt-10" cols="10" offset="1">

                <v-card class="pa-5 px-10 mb-4">
                    <p class="mt-5" style="font-size: 20px;">New Applicant Information<span class="red--text"> (Those
                            receiving allowances need not apply)</span></p>


                    <ValidationProvider name="program" vid="program" rules="required" v-slot="{ errors }">
                          <label>Program </label>
                                    <span style="margin-left: 4px; color: red">*</span>
        <v-select @change="getProgramName()" outlined :items="programs" item-text="name_en" item-value="id" v-model="data.program" required
                            :error="errors[0] ? true : false" :error-messages="errors[0]">
              
                        </v-select>
                    </ValidationProvider>



                    <div v-if="data.program">
                        <v-expansion-panels v-model="panel" multiple>
                            <v-expansion-panel>
                                <v-expansion-panel-header color="primary">
                                    <h3 class="white--text ">Applicant Verification </h3>
                                </v-expansion-panel-header>
                                <v-expansion-panel-content class="mt-5">
                                    <ValidationProvider name="program" vid="verification_type" rules="required" v-slot="{ errors }">
                                        <v-radio-group v-model="data.verification_type" row>
                                            Verification type <span
                                                style="margin-left: 4px;margin-right: 4px;  color: red">*</span>
                                            <v-radio label="National Identity (NID)" :value='1'></v-radio>
                                            <v-radio label="Birth Registration Number" :value="2"></v-radio>
                                        </v-radio-group>
                                    </ValidationProvider>
                                    <V-row>
                                        <v-col>
                                            <ValidationProvider name="Number" vid="verification_number" rules="required"
                                                v-slot="{ errors }">
                                                <label>NID/ BRN No</label>
                                                <span style="margin-left: 4px; color: red">*</span>
                                                <v-text-field outlined clearable v-model="data.verification_number" class="mr-2"
                                                    type="number" required :error="errors[0] ? true : false"
                                                    :error-messages="errors[0]">

                                                </v-text-field>
                                            </ValidationProvider>
                                        </v-col>

                                        <v-col>

                                            <label>Date of Birth </label>
                                            <span style="margin-left: 4px; color: red">*</span>

                                            <v-menu ref="menu" v-model="menu" :close-on-content-click="false"
                                                transition="scale-transition" offset-y min-width="auto">
                                                <template v-slot:activator="{ on, attrs }">
                                                    <ValidationProvider v-slot="{ errors }" name="Date of Birth"
                                                        rules="required" vid="date_of_birth">
                                                        <v-text-field v-model="data.date_of_birth" outlined
                                                            prepend-inner-icon="mdi-calendar" v-bind="attrs" v-on="on"
                                                            class="no-calendar-icon" format="YYYY-MM-DD">
                                                        </v-text-field>
                                                    </ValidationProvider>
                                                </template>
                                                <v-date-picker v-model="data.date_of_birth"
                                                    :active-picker.sync="activePicker"
                                                    :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substring(0, 10)"
                                                    min="1950-01-01" @change="save"></v-date-picker>
                                            </v-menu>


                                        </v-col>
 
                                    </V-row>
                                    <div>

                                    </div>
                                    <div class="d-inline d-flex justify-end ">
                                        <v-btn @click="verifyCard()" elevation="2" class="btn" color="primary">Verify</v-btn>
                                    </div>

                                </v-expansion-panel-content>
                            </v-expansion-panel>

                            <!-- 2nd Expansion panel -->

                            <v-expansion-panel class="ma-4">
                                <v-expansion-panel-header color="primary">
                                    <h3 class="white--text ">Information According to the {{programName}} </h3>
                                </v-expansion-panel-header>
                                <v-expansion-panel-content class="mt-5">
                                    <div class="pa-2 ma-4">
                                        <v-row>
         <v-col v-for="(fields,index) in programDetails?.additional_field" cols="6" lg="6" >
                                            <template v-if="fields.type=='dropdown'">
                            <label>{{fields.name_en}}</label> 
                            <v-select hide-details outlined required v-model="data.yearly_income"
                            :items="fields.additional_field_value" item-value="id" item-text="value"  >
                        </v-select>
                                    </template>
                         <template v-if="fields.type=='number'">
                            <label>{{fields.name_en}}</label> 
                            <v-text-field v-model="data.name_bn" type="number" outlined >

                        </v-text-field>
                                    </template>
                                    <template v-if="fields.type=='checkbox'">
                                        <label>{{fields.name_en}}</label> 
                                        <v-select multiple hide-details outlined required v-model="data.yearly_income"
                                        :items="fields.additional_field_value" item-value="id" item-text="value"  >
                                    </v-select>
                                                </template>
                                </v-col>
                                        </v-row>

                                        <div class="d-inline d-flex ml-4">


                                        </div>
                                        <v-card elevation="2">
                                            <v-card-title>

                                                Socio Economic Infromation
                                            </v-card-title>
                                            <v-card-text>
                                                <v-row>
                                                    <v-col>
                                                        <ValidationProvider name="Financial Status" vid="financial_status"
                                                            rules="required" v-slot="{ errors }">
                                                            <label>Financial
                                                                Status</label> <span
                                                                style="margin-left: 4px; color: red">*</span>
                                                            <v-select outlined v-model="data.financial_status"
                                                                :items="financial_status" :error="errors[0] ? true : false"
                                                                :error-messages="errors[0]">
                                                            </v-select>
                                                        </ValidationProvider>
                                                            <ValidationProvider name="Residence" vid="residence"
                                                                    v-slot="{ errors }">
                                                                    <label>Residence</label>
                                                                    <v-select v-model="data.residence" outlined clearable
                                                                        :items="house_status" :error="errors[0] ? true : false"
                                                                        :error-messages="errors[0]" class="mr-2">
                                                                    </v-select>
                                                                </ValidationProvider>

                                                    </v-col>
                                                    <v-col>
                                                        <ValidationProvider name="Social Status" vid="socila_status"
                                                            v-slot="{ errors }">
                                                            <label>Social
                                                                Status</label> <span
                                                                style="margin-left: 4px; color: red">*</span>
                                                            <v-select v-model="data.social_status" outlined
                                                                :items="social_status" :error="errors[0] ? true : false"
                                                                :error-messages="errors[0]">

                                                            </v-select>
                                                        </ValidationProvider>
                                                   
                                                               <ValidationProvider name="Land Ownership" vid="land_ownership"
                                                            v-slot="{ errors }">
                                                            <label>Land Ownership</label>
                                                            <v-select v-model="data.land_ownership" outlined clearable
                                                                :items="land_ownership" :error="errors[0] ? true : false"
                                                                :error-messages="errors[0]" class="mr-2">
                                                            </v-select>
                                                        </ValidationProvider>
                                                    </v-col>
                                                </v-row>
                                                <div class="d-inline d-flex justify-start ">
                                                    PMT Scoring<span style="margin-left: 4px; color: red">*</span>
                                                </div>
                                                <v-row>
                                                    <v-col>
                                                        <v-checkbox v-model="checkbox" label="Tube Well"></v-checkbox>
                                                        <v-checkbox v-model="checkbox" label="Motor Vehicle"></v-checkbox>
                                                        <v-checkbox v-model="checkbox" label="Electric Fan"></v-checkbox>
                                                    </v-col>
                                                    <v-col>
                                                        <v-checkbox v-model="checkbox" label="Mobile Phone"></v-checkbox>
                                                        <v-checkbox v-model="checkbox" label="Computer/Laptop"></v-checkbox>
                                                        <v-checkbox v-model="checkbox"
                                                            label="Radio/Cassette Player/Two-in-One"></v-checkbox>
                                                    </v-col>
                                                    <v-col>
                                                        <v-checkbox v-model="checkbox" label="Cycle"></v-checkbox>
                                                        <v-checkbox v-model="checkbox" label="Motorcycle"></v-checkbox>
                                                        <v-checkbox v-model="checkbox" label="Television"></v-checkbox>
                                                    </v-col>
                                                    <v-col>
                                                        <v-checkbox v-model="checkbox" label=" Tractor"></v-checkbox>
                                                        <v-checkbox v-model="checkbox" label="Boat"></v-checkbox>
                                                        <v-checkbox v-model="checkbox" label="Camera"></v-checkbox>

                                                    </v-col>

                                                    <v-col>
                                                        <v-checkbox v-model="checkbox"
                                                            label="VCR/VCP/DISH connection"></v-checkbox>

                                                    </v-col>
                                                </v-row>

                                            </v-card-text>
                                        </v-card>

                                    </div>

                                </v-expansion-panel-content>
                            </v-expansion-panel>

                            <!-- 3rd Expansion panel -->

                            <v-expansion-panel>
                                <v-expansion-panel-header color="primary">
                                    <h3 class="white--text">Personal Information </h3>
                                </v-expansion-panel-header>
                                <v-expansion-panel-content class="mt-5">
                                    <div class="pa-2 mb-4">
                                        <v-row>

                                            <v-col>

                                                <ValidationProvider name="Name in Bangla" vid="name_bn" rules="required"
                                                    v-slot="{ errors }">
                                                    <label>Name (BN) </label>
                                                    <span style="margin-left: 4px; color: red">*</span>
                                                    <v-text-field v-model="data.name_bn" outlined clearable
                                                        :error="errors[0] ? true : false" :error-messages="errors[0]">

                                                    </v-text-field>
                                                </ValidationProvider>
                                                <ValidationProvider name="Name in English" vid="name_en" rules="required"
                                                    v-slot="{ errors }">
                                                    <label>Name (EN) </label>
                                                    <span style="margin-left: 4px; color: red">*</span>
                                                    <v-text-field v-model="data.name_en" outlined clearable
                                                        :error="errors[0] ? true : false" :error-messages="errors[0]">

                                                    </v-text-field>
                                                </ValidationProvider>
                                                <ValidationProvider name="Father Name in Bangla" vid="father_name_bn"
                                                    v-slot="{ errors }">
                                                    <label>Father Name (BN)</label>

                                                    <v-text-field v-model="data.father_name_bn" outlined clearable
                                                        :error="errors[0] ? true : false" :error-messages="errors[0]">
                                                    </v-text-field>

                                                </ValidationProvider>

                                                <ValidationProvider name="Father Name in English" vid="mother_name_bn"
                                                    v-slot="{ errors }">
                                                    <label>Father Name (EN)</label>
                                                    <v-text-field v-model="data.father_name_en" outlined clearable
                                                        :error="errors[0] ? true : false" :error-messages="errors[0]">
                                                    </v-text-field>
                                                </ValidationProvider>
                                                <ValidationProvider name="Mother Name in English" vid="mother_name_bn"
                                                    v-slot="{ errors }">
                                                    <label>Mother Name (BN)</label>
                                                    <v-text-field v-model="data.mother_name_bn" outlined clearable
                                                        :error="errors[0] ? true : false" :error-messages="errors[0]">
                                                    </v-text-field>
                                                </ValidationProvider>
                                                <ValidationProvider name="Mother Name in English" vid="mother_name_en"
                                                    v-slot="{ errors }">
                                                    <label>Mother Name (EN)</label>
                                                    <v-text-field v-model="data.mother_name_en" outlined clearable
                                                        :error="errors[0] ? true : false" :error-messages="errors[0]">
                                                    </v-text-field>
                                                </ValidationProvider>
                                                <div>
                                                    <!-- <div class="mb-6">Active picker: <code>{{ activePicker || 'null' }}</code></div> -->

                                                </div>
                                                <ValidationProvider name="Spouse Name in Bangla" vid="spouse_name_bn"
                                                    v-slot="{ errors }">
                                                    <label>Spouse Name (BN)</label>
                                                    <v-text-field v-model="data.spouse_name_bn" outlined clearable
                                                        :error="errors[0] ? true : false" :error-messages="errors[0]">
                                                    </v-text-field>
                                                </ValidationProvider>
                                                 <ValidationProvider name="Marital Status" vid="marital_status"
                                                        v-slot="{ errors }">
                                                        <label>Marital Status</label>
                                                        <v-select v-model="data.marital_status" outlined clearable :items="marital_status"
                                                            :error="errors[0] ? true : false" :error-messages="errors[0]">
                                                        </v-select>
                                                    </ValidationProvider>

                                                <ValidationProvider name="Spouse Name in English" vid="spouse_name_en"
                                                    v-slot="{ errors }">
                                                    <label>Spouse Name (EN)</label>
                                                    <v-text-field v-model="data.spouse_name_en" outlined clearable
                                                        :error="errors[0] ? true : false" :error-messages="errors[0]">
                                                    </v-text-field>
                                                </ValidationProvider>
                                                <ValidationProvider name="Religion" vid="religion" v-slot="{ errors }"
                                                    rules="required">
                                                    <label>Religion</label> <span
                                                        style="margin-left: 4px; color: red">*</span>

                                                    <v-select v-model="data.religion" outlined :items="religion"
                                                        :error="errors[0] ? true : false" :error-messages="errors[0]">
                                                    </v-select>
                                                </ValidationProvider>





                                            </v-col>
                                            <v-col class="align-end">
                                                <v-row>
                                                    <v-col>

                                                        <v-img :src="imageUrl"
                                                            style="width: 200px; height: 200px; border: 1px solid #ccc;"
                                                            class="mb-5" v-if="imageUrl"></v-img>
                                                        <v-img src="/assets/images/profile.png" v-if="!imageUrl"
                                                            style="width: 200px; height: 200px; border: 1px solid #ccc;"
                                                            class="mb-5"></v-img>
                                                        <ValidationProvider v-slot="{ errors }" name="Image"
                                                            rules="required" vid="image">
                                                            <label>Image</label>
                                                            <v-file-input outlined show-size counter
                                                                prepend-inner-icon="mdi-camera" v-model="data.image"
                                                                accept="image/*" @change="previewImage"
                                                                prepend-icon=""></v-file-input>
                                                        </ValidationProvider>
                                                    </v-col>
                                                    <v-col class="align-end">
                                                        <v-img :src="signUrl"
                                                            style="width: 200px; height: 80px; border: 1px solid #ccc;"
                                                            class="mb-5" v-if="signUrl"></v-img>
                                                        <v-img src="/assets/images/sign.png" v-if="!signUrl"
                                                            style="width: 200px; height: 80px; border: 1px solid #ccc;"
                                                            class="mb-5"></v-img>
                                                        <ValidationProvider v-slot="{ errors }" name="Signature"
                                                            rules="required" vid="sign">
                                                            <label>Signature</label>
                                                            <v-file-input outlined show-size counter
                                                                prepend-inner-icon="mdi-camera" v-model="data.sign"
                                                                accept="image/*" @change="previewSign"
                                                                prepend-icon=""></v-file-input>
                                                        </ValidationProvider>
                                                    </v-col>
                                                </v-row>
                                                <ValidationProvider name="Nationality" vid="nationality"
                                                    v-slot="{ errors }">
                                                    <label>Nationality</label>
                                                    <v-text-field v-model="data.nationality" outlined clearable
                                                        :error="errors[0] ? true : false" :error-messages="errors[0]">
                                                    </v-text-field>
                                                </ValidationProvider>

                                                <ValidationProvider name="Age" vid="age" v-slot="{ errors }"
                                                    rules="required">
                                                    <label>Age</label> <span style="margin-left: 4px; color: red">*</span>
                                                    <v-text-field v-model="data.age" outlined clearable
                                                        :error="errors[0] ? true : false" :error-messages="errors[0]">

                                                    </v-text-field>
                                                </ValidationProvider>
                                                <ValidationProvider name="Gender" vid="gender" v-slot="{ errors }"
                                                    rules="required">
                                                    <label>Gender</label> <span
                                                        style="margin-left: 4px; color: red">*</span>
                                                    <v-select v-model="data.gender" outlined :items="gender"
                                                        :error="errors[0] ? true : false" :error-messages="errors[0]">

                                                    </v-select>
                                                </ValidationProvider>
                                                <!-- <ValidationProvider name="Spouse Name in English" vid="spouse_name_en"
                                                    v-slot="{ errors }">
                                                    <v-text-field v-model="data.spouse_name_en" outlined clearable
                                                        label="Spouse Name (EN)" :error="errors[0] ? true : false"
                                                        :error-messages="errors[0]">
                                                    </v-text-field>
                                                </ValidationProvider> -->
                                                <ValidationProvider name="Education Status" vid="education_status"
                                                    rules="required" v-slot="{ errors }">
                                                    <label>Education Status</label> <span
                                                        style="margin-left: 4px; color: red">*</span>
                                                    <v-select v-model="data.education_status" outlined
                                                        :error="errors[0] ? true : false" :error-messages="errors[0]"
                                                        :items="education_status">

                                                    </v-select>
                                                </ValidationProvider>
                                                <ValidationProvider name="Proffession" vid="profession" v-slot="{ errors }">
                                                    <label>Proffession</label>
                                                    <v-text-field v-model="data.profession" outlined clearable
                                                        :error="errors[0] ? true : false" :error-messages="errors[0]">
                                                    </v-text-field>
                                                </ValidationProvider>
                                                <ValidationProvider name="Identification Mark" vid="identification_mark"
                                                    v-slot="{ errors }">
                                                    <label>Identification Mark</label>
                                                    <v-text-field v-model="data.identification_mark" outlined clearable
                                                        :error="errors[0] ? true : false" :error-messages="errors[0]">
                                                    </v-text-field>
                                                </ValidationProvider>

                                            </v-col>
                                            <!-- <v-responsive></v-responsive> -->

                                        </v-row>
                                    </div>

                                </v-expansion-panel-content>
                            </v-expansion-panel>
                            <!-- 3rd Expansion panel -->
                            <v-expansion-panel class="ma-4">
                                <v-expansion-panel-header color="primary">
                                    <h3 class="white--text ">Contact Information </h3>
                                </v-expansion-panel-header>
                                <v-expansion-panel-content class="mt-5">
                                    <div class="d-inline d-flex justify-center ma-4 ">
                                        <v-card><span class="ma-5"><b>Current Address</b></span></v-card>
                                    </div>
                                    <v-row>
                                        <v-col>
                                            <ValidationProvider name="Division" vid="division" rules="required"
                                                v-slot="{ errors }">
                                                <label style="display: inline-block">Division</label>
                                                <span style="margin-left: 4px; color: red">*</span>
                                                <v-autocomplete v-model="data.division" outlined :items="division"
                                                    :error="errors[0] ? true : false" :error-messages="errors[0]">




                                                </v-autocomplete>
                                            </ValidationProvider>
                                            <ValidationProvider name="Upazila" vid="upazila" rules="required"
                                                v-slot="{ errors }">
                                                <label style="display: inline-block">Upazila</label>
                                                <span style="margin-left: 4px; color: red">*</span>
                                                <v-autocomplete v-model="data.upazila" outlined :items="districts"
                                                    :error="errors[0] ? true : false" :error-messages="errors[0]">

                                                </v-autocomplete>
                                            </ValidationProvider>
                                            <ValidationProvider name="Post Code" vid="post_code" rules="required"
                                                v-slot="{ errors }">
                                                <label style="display: inline-block">Post Code </label>
                                                <span style="margin-left: 4px; color: red">*</span>
                                                <v-text-field v-model="data.post_code" outlined clearable
                                                    :error="errors[0] ? true : false" :error-messages="errors[0]">

                                                </v-text-field>
                                            </ValidationProvider>
                                            <ValidationProvider name="Mobile Number" vid="mobile" rules="required"
                                                v-slot="{ errors }">
                                                <label style="display: inline-block">Mobile Number </label>
                                                <span style="margin-left: 4px; color: red">*</span>
                                                <v-text-field v-model="data.mobile" outlined clearable type="Number"
                                                    :error="errors[0] ? true : false" :error-messages="errors[0]">

                                                </v-text-field>
                                            </ValidationProvider>
                                        </v-col>
                                        <v-col>
                                            <ValidationProvider name="District" vid="district" rules="required"
                                                v-slot="{ errors }">
                                                <label style="display: inline-block">District</label>
                                                <span style="margin-left: 4px; color: red">*</span>
                                                <v-autocomplete v-model="data.district" outlined :items="division"
                                                    :error="errors[0] ? true : false" :error-messages="errors[0]">

                                                </v-autocomplete>
                                            </ValidationProvider>
                                            <ValidationProvider name="Location" vid="locationType" rules="required"
                                                v-slot="{ errors }">
                                                <label style="display: inline-block">Location Type </label>
                                                <span style="margin-left: 4px; color: red">*</span>
                                                <v-text-field v-model="data.locationType" outlined clearable
                                                    :error="errors[0] ? true : false" :error-messages="errors[0]">

                                                </v-text-field>
                                            </ValidationProvider>
                                            <ValidationProvider name="Village/House No.,
                                                        Road No., Block No, Section" vid="address" rules="required"
                                                v-slot="{ errors }">
                                                <label style="display: inline-block">Village/House No.,
                                                    Road No., Block No, Section </label>
                                                <span style="margin-left: 4px; color: red">*</span>
                                                <v-text-field v-model="data.address" outlined clearable
                                                    :error="errors[0] ? true : false" :error-messages="errors[0]">

                                                </v-text-field>
                                            </ValidationProvider>

                                        </v-col>
                                    </v-row>
                                    <div class="d-inline d-flex justify-center ma-4 ">
                                        <v-card><span class="ma-5"><b>Permanent Address</b></span></v-card>
                                    </div>
                                    <v-checkbox v-model="checkbox" label="Same Address "
                                        @change="handleCheckboxChange"></v-checkbox>
                                    <v-row>
                                        <v-col>
                                            <ValidationProvider name="Division" vid="division" rules="required"
                                                v-slot="{ errors }">
                                                <label style="display: inline-block">Division</label>
                                                <span style="margin-left: 4px; color: red">*</span>
                                                <v-autocomplete v-model="data.permanent_division" outlined :items="division"
                                                    :error="errors[0] ? true : false" :error-messages="errors[0]">


                                                </v-autocomplete>
                                            </ValidationProvider>

                                            <ValidationProvider name="Upazila" vid="upazila" rules="required"
                                                v-slot="{ errors }">
                                                <label style="display: inline-block">Upazila</label>
                                                <span style="margin-left: 4px; color: red">*</span>
                                                <v-autocomplete v-model="data.permanent_upazila" outlined :items="districts"
                                                    :error="errors[0] ? true : false" :error-messages="errors[0]">

                                                </v-autocomplete>
                                            </ValidationProvider>
                                            <ValidationProvider name="Post Code" vid="post_code" rules="required"
                                                v-slot="{ errors }">
                                                <label style="display: inline-block">Post Code </label>
                                                <span style="margin-left: 4px; color: red">*</span>
                                                <v-text-field v-model="data.permanent_post_code" outlined clearable
                                                    :error="errors[0] ? true : false" :error-messages="errors[0]">

                                                </v-text-field>
                                            </ValidationProvider>
                                            <ValidationProvider name="Mobile Number" vid="mobile" rules="required"
                                                v-slot="{ errors }">
                                                <label style="display: inline-block">Mobile Number </label>
                                                <span style="margin-left: 4px; color: red">*</span>
                                                <v-text-field v-model="data.permanent_mobile" outlined clearable
                                                    type="Number" :error="errors[0] ? true : false"
                                                    :error-messages="errors[0]">
                                                </v-text-field>
                                            </ValidationProvider>
                                        </v-col>
                                        <v-col>
                                            <ValidationProvider name="District" vid="district" rules="required"
                                                v-slot="{ errors }">
                                                <label style="display: inline-block">District</label>
                                                <span style="margin-left: 4px; color: red">*</span>
                                                <v-autocomplete v-model="data.permanent_district" outlined :items="division"
                                                    :error="errors[0] ? true : false" :error-messages="errors[0]">

                                                </v-autocomplete>
                                            </ValidationProvider>
                                            <ValidationProvider name="Location" vid="locationType" rules="required"
                                                v-slot="{ errors }">
                                                <label style="display: inline-block">Location Type </label>
                                                <span style="margin-left: 4px; color: red">*</span>
                                                <v-text-field v-model="data.permanent_locationType" outlined clearable
                                                    :error="errors[0] ? true : false" :error-messages="errors[0]">


                                                </v-text-field>
                                            </ValidationProvider>
                                            <ValidationProvider name="Village/House No.,
                                                        Road No., Block No, Section" vid="address" rules="required"
                                                v-slot="{ errors }">
                                                <label style="display: inline-block">Village/House No.,
                                                    Road No., Block No, Section </label>
                                                <span style="margin-left: 4px; color: red">*</span>
                                                <v-text-field v-model="data.permanent_address" outlined clearable
                                                    :error="errors[0] ? true : false" :error-messages="errors[0]">

                                                </v-text-field>
                                            </ValidationProvider>

                                        </v-col>
                                    </v-row>

                                </v-expansion-panel-content>
                            </v-expansion-panel>
                            <!-- 4th Expansion panel -->
                            <!-- Expansion panel 5 start-->
                              <v-expansion-panel class="mb-4">
                                    <v-expansion-panel-header color="primary">
                                        <h3 class="white--text">Bank/MFS Information </h3>
                                    </v-expansion-panel-header>
                                    <v-expansion-panel-content class="mt-5">
                                       
<v-row>
    <v-col>
           <ValidationProvider name="Bank Name" vid="bank_name"
                                                        rules="required" v-slot="{ errors }">
                                                             <label style="display: inline-block">Bank Name  </label>
                                                                    <span style="margin-left: 4px; color: red">*</span>
                                                        <v-text-field v-model="data.bank_name" outlined clearable
                                                            :error="errors[0] ? true : false" :error-messages="errors[0]">
                                           
                                                        </v-text-field>
                                                        </ValidationProvider> 
                                                        <ValidationProvider name="Bank Name" vid="Bank"
                                                             v-slot="{ errors }">
                                                                 <label style="display: inline-block">Mobile Ownnership </label>
                                                                        
                                                            <v-select v-model="data.mobile_ownership" outlined clearable :items="mobile_ownership"
                                                                :error="errors[0] ? true : false" :error-messages="errors[0]">
                                           
                                                            </v-select>
                                                            </ValidationProvider> 
    </v-col>
      <v-col>
         <ValidationProvider name="Mobile Number" vid="mobile_number"
                                                            v-slot="{ errors }">
                                                                 <label style="display: inline-block">Mobile Number  </label><span style="margin-left: 4px; color: red">*</span>
                                                                      
                                                            <v-text-field v-model="data.mobile_number" outlined clearable
                                                                :error="errors[0] ? true : false" :error-messages="errors[0]">
                                           
                                                            </v-text-field>
                                                            </ValidationProvider> 
                                                               <ValidationProvider name="Email" vid="Email"
                                                                    rules="required" v-slot="{ errors }">
                                                                         <label style="display: inline-block">Email  </label><span style="margin-left: 4px; color: red">*</span>
                                                                      
                                                                    <v-text-field v-model="data.email" outlined clearable type="email"
                                                                        :error="errors[0] ? true : false" :error-messages="errors[0]">
                                           
                                                                    </v-text-field>
                                                                    </ValidationProvider> 
                                                                   
        </v-col>
    
          
      

</v-row>
      <p class="red--text  mt-2">   Must have active Nagad / Bkash account where applicable. </p>
 
                                    </v-expansion-panel-content>
                                </v-expansion-panel>
                                <!-- Expansion panel 5 End -->

                            <v-expansion-panel class="mb-4">
                                <v-expansion-panel-header color="primary">
                                    <h3 class="white--text ">Nominee Information </h3>
                                </v-expansion-panel-header>
                                <v-expansion-panel-content class="mt-5">
                                    <div class="pa-2 mb-4">
                                        <v-row>

                                            <v-col>
                                                <div>
                                                    <!-- <div class="mb-6">Active picker: <code>{{ activePicker || 'null' }}</code></div> -->

                                                </div>
                                                <ValidationProvider name="Nominee Name (BN)" vid="nominee_bn"
                                                    rules="required" v-slot="{ errors }">
                                                         <label style="display: inline-block">Name (BN) </label>
                                                                <span style="margin-left: 4px; color: red">*</span>
                                                    <v-text-field v-model="data.nominee_bn" outlined clearable
                                                        :error="errors[0] ? true : false" :error-messages="errors[0]">
                                           
                                                    </v-text-field>
                                                </ValidationProvider>
                                                <ValidationProvider name="Nominee Name (EN)" vid="nominee_en"
                                                    rules="required" v-slot="{ errors }">
                                                        <label style="display: inline-block">Name (EN) </label>
                                                                <span style="margin-left: 4px; color: red">*</span>
                                                    <v-text-field v-model="data.nominee_en" outlined clearable
                                                        :error="errors[0] ? true : false" :error-messages="errors[0]">
                                          
                                                    </v-text-field>
                                                </ValidationProvider>
                                                <ValidationProvider name="National Identity (NID) /
Birth Registration Number" vid="nominee_nid" v-slot="{ errors }">
    <label>National Identity (NID) /
    Birth Registration Number </label>
                                                    <v-text-field v-model="data.nominee_nid" outlined clearable label="" :error="errors[0] ? true : false" :error-messages="errors[0]">
                                                    </v-text-field>
                                                </ValidationProvider>
                                                <ValidationProvider name="Nominee Natinality" vid="nominee_nationality"
                                                    v-slot="{ errors }">
                                                     <label>Nationality </label>
                                                    <v-text-field v-model="data.nominee_nationality" outlined clearable
                                                       :error="errors[0] ? true : false"
                                                        :error-messages="errors[0]">
                                                    </v-text-field>
                                                </ValidationProvider>
                                                <ValidationProvider name="Gender of Nominee" vid="nominee_relationship"
                                                    v-slot="{ errors }" rules="required">
                                                      <label>Relationship with
                                                                    Beneficiary</label>
                                                                <span style="margin-left: 4px; color: red">*</span>
                                                    <v-autocomplete v-model="data.nominee_relationship" outlined
                                                        :items="gender" :error="errors[0] ? true : false"
                                                        :error-messages="errors[0]">
                                                    </v-autocomplete>
                                                </ValidationProvider>
                                               

                                            </v-col>
                                            <v-col>
                                                <v-row>
                                                    <v-col class="align-end">

                                                        <v-img :src="nomineeImageUrl"
                                                            style="width: 200px; height: 200px; border: 1px solid #ccc;"
                                                            class="mb-5" v-if="nomineeImageUrl"></v-img>
                                                        <v-img src="/assets/images/profile.png" v-if="!nomineeImageUrl"
                                                            style="width: 200px; height: 200px; border: 1px solid #ccc;"
                                                            class="mb-5"></v-img>
                                                        <ValidationProvider v-slot="{ errors }" name="Image"
                                                            rules="required" vid="image">
                                                               <label>Image</label>
                                                                  
                                                            <v-file-input  outlined show-size counter
                                                                prepend-inner-icon="mdi-camera" v-model="data.nominee_image"
                                                                accept="image/*" @change="previewImageNominee"
                                                                prepend-icon=""></v-file-input>
                                                        </ValidationProvider>
                                                    </v-col>
                                                    <v-col class="align-end">
                                                        <v-img :src="nomineeSignUrl"
                                                            style="width: 200px; height: 80px; border: 1px solid #ccc;"
                                                            class="mb-5" v-if="nomineeSignUrl"></v-img>
                                                        <v-img src="/assets/images/sign.png" v-if="!nomineeSignUrl"
                                                            style="width: 200px; height: 80px; border: 1px solid #ccc;"
                                                            class="mb-5"></v-img>
                                                        <ValidationProvider v-slot="{ errors }" name="Signature"
                                                            rules="required" vid="sign">
                                                            <label>Signature</label>
                                                            <v-file-input  outlined show-size counter
                                                                prepend-inner-icon="mdi-camera" v-model="data.nominee_sign"
                                                                accept="image/*" @change="previewSignNominee"
                                                                prepend-icon=""></v-file-input>
                                                        </ValidationProvider>
                                                    </v-col>
                                                </v-row>
     <v-checkbox v-model="checkbox" label="Same Address "></v-checkbox>
                                                <ValidationProvider name="Address of Nominee" vid="nominee_address"
                                                    v-slot="{ errors }" rules="required">
                                                       <label>Address</label>
                                                    <v-textarea v-model="data.nominee_address" outlined clearable
                                                       :error="errors[0] ? true : false"
                                                        :error-messages="errors[0]"></v-textarea>
                                                </ValidationProvider>

                                            </v-col>
                                            <!-- <v-responsive></v-responsive> -->

                                        </v-row>
                                    </div>

                                </v-expansion-panel-content>
                            </v-expansion-panel>

                            <!-- 5th Expansion panel -->


                            <v-expansion-panel class="mb-4">
                                <v-expansion-panel-header color="primary">
                                    <h3 class="white--text">Other Information of Eligiblity </h3>
                                </v-expansion-panel-header>
                                <v-expansion-panel-content class="mt-5">
                                    <div class="pa-2 mb-4">
                                        <v-row>

                                            <v-col>

                                                <label>Is this house yours?</label>
                                                <span style="margin-left: 4px; color: red">*</span>

                                                <v-select outlined :items="yes_no">
                                                </v-select>

                                                <label>Age of House Member Head</label>
                                                <v-text-field outlined clearable>
                                                </v-text-field>

                                                <label style="display: inline-block">Number of House Members
                                                </label>
                                                <span style="margin-left: 4px; color: red">*</span>
                                                <v-text-field outlined clearable type="Number">

                                                </v-text-field>

                                                <label style="display: inline-block">Number of Childresn of House
                                                </label>
                                                <span style="margin-left: 4px; color: red">*</span>

                                                <v-text-field outlined clearable type="Number">
                                                </v-text-field>

                                                <label>House member Head Education
                                                </label>
                                                <span style="margin-left: 4px; color: red">*</span>
                                                <v-select outlined :items="house_head_education" label="">
                                                </v-select>

                                                <label>House member Head Occupation
                                                </label>
                                                <span style="margin-left: 4px; color: red">*</span>
                                                <v-select outlined :items="house_head_occupation" label="">
                                                </v-select>

                                                <label>Spouse's Education (Highest

                                                    Degree Completed)
                                                </label>
                                                <span style="margin-left: 4px; color: red">*</span>
                                                <v-select outlined :items="spouse_education">
                                                </v-select>

                                                <label style="display: inline-block">How many total rooms does your
                                                    house
                                                    use for living?</label>
                                                <span style="margin-left: 4px; color: red">*</span>
                                                <v-text-field outlined>
                                                </v-text-field>

                                                <label>How many Does your house have
                                                    electricity connection?</label>
                                                <span style="margin-left: 4px; color: red">*</span>
                                                <v-select outlined :items="yes_no">
                                                </v-select>

                                                <label>Does your House have a separate
                                                    kitchen
                                                    ?</label>
                                                <span style="margin-left: 4px; color: red">*</span>
                                                <v-select outlined :items="yes_no">
                                                </v-select>

                                                <label>Has your Family member head
                                                    received any money from someone staying abroad in the last 1
                                                    year?
                                                </label>
                                                <span style="margin-left: 4px; color: red">*</span>
                                                <v-select outlined :items="yes_no">
                                                </v-select>

                                                <label>Has any member of this
                                                    household received any
                                                    assistance under the social
                                                    safety net program in the
                                                    last 1 year?
                                                    ?</label>
                                                <span style="margin-left: 4px; color: red">*</span>
                                                <v-select outlined :items="yes_no">
                                                </v-select>



                                            </v-col>
                                            <v-col>
                                                <label>What is the roof of your main
                                                    house
                                                    made of ?</label>
                                                <span style="margin-left: 4px; color: red">*</span>
                                                <v-select outlined :items="wall_status">
                                                </v-select>


                                                <label>What kind of toilet do the
                                                    members
                                                    of
                                                    this house use ?</label>
                                                <span style="margin-left: 4px; color: red">*</span>
                                                <v-select outlined :items="toilet_status">
                                                </v-select>

                                                <label>What is the total amount of
                                                    land
                                                    owned
                                                    by all the members of your police station ?</label>
                                                <span style="margin-left: 4px; color: red">*</span>
                                                <v-select outlined :items="yes_no">
                                                </v-select>

                                                Which of the following assets does your household own? (Multiple answer
                                                accepted)

                                                <span style="margin-left: 4px; color: red">*</span>
                                                <v-row>
                                                    <v-col>
                                                        <v-checkbox v-model="checkbox" label="Tube Well" dense></v-checkbox>
                                                        <v-checkbox v-model="checkbox" label="Motor Vehicle"
                                                            dense></v-checkbox>
                                                        <v-checkbox v-model="checkbox" label="Electric Fan"
                                                            dense></v-checkbox>
                                                        <v-checkbox v-model="checkbox" label="Cycle" dense></v-checkbox>
                                                        <v-checkbox v-model="checkbox" label="Motorcycle Powerless"
                                                            dense></v-checkbox>
                                                        <v-checkbox v-model="checkbox" label="Television"
                                                            dense></v-checkbox>
                                                        <v-checkbox v-model="checkbox" label="VCR/VCP/DISH connection"
                                                            dense></v-checkbox>
                                                        <v-checkbox v-model="checkbox" label="Carpet" dense></v-checkbox>
                                                        <v-checkbox v-model="checkbox" label="Heater" dense></v-checkbox>
                                                        <v-checkbox v-model="checkbox" label="Cow/ Goat/ Sheep"
                                                            dense></v-checkbox>
                                                    </v-col>

                                                    <v-col>
                                                        <v-checkbox v-model="checkbox" label="Mobile Phone"
                                                            dense></v-checkbox>
                                                        <v-checkbox v-model="checkbox" label="Computer/Laptop"
                                                            dense></v-checkbox>
                                                        <v-checkbox v-model="checkbox"
                                                            label="Radio/Cassette Player/Two-in-One" dense></v-checkbox>
                                                        <v-checkbox v-model="checkbox" label="Tractor" dense></v-checkbox>
                                                        <v-checkbox v-model="checkbox" label="The Boat" dense></v-checkbox>
                                                        <v-checkbox v-model="checkbox" label="Camera" dense></v-checkbox>
                                                        <v-checkbox v-model="checkbox" label="Furniture "
                                                            dense></v-checkbox>
                                                        <v-checkbox v-model="checkbox" label="Tube Well for Irrigation"
                                                            dense></v-checkbox>
                                                        <v-checkbox v-model="checkbox" label="Power Tiller"
                                                            dense></v-checkbox>

                                                    </v-col>
                                                </v-row>


                                                <label>What is the source of food and water in your police station?</label>
                                                <span style="margin-left: 4px; color: red">*</span>
                                                <v-select outlined :items="yes_no">
                                                </v-select>
                                                <label>Are any members of your police station engaged as agricultural or
                                                    non-agricultural labourers?</label>
                                                <span style="margin-left: 4px; color: red">*</span>
                                                <v-select outlined :items="yes_no">
                                                </v-select>
                                                <label>What is the total amount of land owned by all the members of your
                                                    house?</label>
                                                <span style="margin-left: 4px; color: red">*</span>
                                                <v-select outlined :items="house_land_status">
                                                </v-select>
                                                <label>What is the source of drinking water in your police station</label>
                                                <span style="margin-left: 4px; color: red">*</span>
                                                <v-select outlined :items="water_resource_status">
                                                </v-select>

                                            </v-col>
                                            <!-- <v-responsive></v-responsive> -->

                                        </v-row>
                                          <div class="d-inline d-flex justify-end ">
                                              <v-btn elevation="2" class="btn mr-2" color="primary">Reset</v-btn>
                                            <v-btn elevation="2" class="btn" color="green">Save</v-btn>

                                        </div>
                                    </div>

                                </v-expansion-panel-content>
                            </v-expansion-panel>

                        </v-expansion-panels>
                    </div>
                    <p class="red--text  mt-5">If you have any objections or complaints regarding the
                        application, please contact the Upazila Social Service Officer. *</p>
                </v-card>
   
            </v-col>
        </v-row>

       <FooterBar />
    </div>
    
</template>

<script>
import FooterBar from "@/components/Common/FooterBar.vue";
import { extend, ValidationProvider, ValidationObserver } from "vee-validate";
import { mapState } from "vuex";
import axios from 'axios';
export default {
    title: "CTM - Online Application",
    data() {
        return {
            panel: [0, 1, 2, 3, 4, 5, 6],
            programs:[],
            // programs: ["Old Age Allowance Program", "Disability Allowance Program", "Widow And Husband Adopted Allowance program"],
            govt_programs: ["Old Age Allowance Program", "Disability Allowance Program", "Widow And Husband Adopted Allowance program", "Freedom Fighter Honorary Allowance", "No Allowance", "Other (specify)"],
            yearly_income: ["Up to 24000 Tk", "28001 to 48000 Tk", "48001 to 72000 Tk", "72000 TK or above"],
            health_status: ["Totally Disabled", "Sick", "Insane", "Disabled", "Partially Powerless", "Other (specify)"],
            financial_status: ["Poor", "Refugee", "Landless"],
            social_status: ["Widow", "Widower", "Divorced"],
            house_status: ["Homeless", "Self", "Rent", "Others"],
            land_ownership: ["Habitatless", "Below 0.5 acre", "Up to 1 acre", "Above 1 acre", "Other (specify)"],
            marital_status:["Married","Unmarried","Widow"],
            mobile_ownership: ["No Mobie Phone","Family Memeber", "Others" ],
            religion: ["Islam", "Hindu"],
            gender: ["Male", "Female", "3rd Gender"],
            education_status: ["JSC", "SSC", "HSC"],
            division: ["Dhaka", "Rajshahi"],
            yes_no: ["Yes ", "No"],
           
            house_children_no: ["0", "1", "2", "3", "4", "4+"],
            spouse_education: ["Uneducated", "Below 5 Statndard", "5-9 Standard", "Above 10 Stansard", "Not Applicable"],
            house_head_education: ["Uneducated", "Below 5 Statndard", "5-9 Standard", "Above 10 Stansard", "Not Applicable"],
            house_head_education: ["Uneducated", "Below 5 Statndard", "5-9 Standard", "Above 10 Stansard", "Not Applicable"],
            house_head_occupation: ["Job", "Farming", "Business", "Student", "Retired"],
            wall_status: ["Concrete", "Tin/wood", "Mud house", "Others"],
            toilet_status: ["Sanitary Latrines", "Pit or hole", "Raw or Hanging", "Open field or open space"],
            water_resource_status: ["Supply", "Tubewell", "Others"],
            agricultural_status: ["Labor in agriculture", "Labor in non-agricultural sector"],
            house_land_status: ["Below 0.5 acre", "0.51 to 1.50 acre", "Above 1.50 acre"],



            activePicker: null,
            date: null,
            menu: false,
            isChecked: false,
            data: {
                verification_type:null,
                verification_number:null,
                date_of_birth: null,
                program: null,
                number: null,
                dob: null,
                yearly_income: null,
                beneficiary_details: null,
                beneficiary_details_others: null,
                family_member_no: null,
                male_member_no: null,
                female_member_no: null,
                hijra_member_no: null,
                health_status: null,
                health_status_others: null,
                financial_status: null,
                social_status: null,
                land_ownership: null,
                residence: null,
                name_en: null,
                name_bn: null,
                father_name_en: null,
                father_name_bn: null,
                mother_name_en: null,
                mother_name_bn: null,
                marital_status: null,
                spouse_name_en: null,
                spouse_name_bn: null,
                profession: null,
                religion: null,
                image: null,
                sign: null,
                nationality: null,
                gender: null,
                age: null,
                education_status: null,
                identification_mark: null,
                division: null,
                district: null,
                upazila: null,
                Location: null,
                post_code: null,
                mobile: null,
                email:null,
                address: null,
                locationType: null,
                permanent_division: null,
                permanent_district: null,
                permanent_upazila: null,
                permanent_Location: null,
                permanent_post_code: null,
                permanent_mobile: null,
                permanent_address: null,
                permanent_location: null,
                nominee_en: null,
                nominee_bn: null,
                nominee_nid: null,
                nominee_image: null,
                nominee_sign: null,
                nominee_nationality: null,
                nominee_relationship: null,
                nominee_address: null,
                bank_name:null,
                mobile_ownership:null,
                mobile_number:null,
                marital_status:null
            },

            imageUrl: null,
            signUrl: null,
            nomineeImageUrl: null,
            programName: null,
            nomineeSignUrl: null,
            programDetails: null,
        }
    },
    computed: {

        ...mapState({

            divisions: (state) => state.Division.divisions,

        }),
    },
    components: {
        ValidationProvider,
        ValidationObserver, FooterBar
    },
    watch: {
        menu(val) {
            val && setTimeout(() => (this.activePicker = 'YEAR'))
        },
    },
    methods: {
        async getProgramName() {
            // if (this.data.program != null && this.programs.length > 0) {
                let programName = this.programs.filter((item) =>  item.id == this.data.program);
            this.programName = await programName[0]?.name_en;
            this.programDetails = await programName[0];
            // }
        },
        getAllProgram() {
            this.$axios.get("global/program").then((res) => {
                this.programs = res.data.data;
            });
        },
        save(data) {
            this.$refs.menu.save(data.date_of_birth)
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
        previewSign() {
            if (this.data.sign) {
                // Read the selected file and generate a preview URL
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.signUrl = e.target.result;
                };
                reader.readAsDataURL(this.data.sign);
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
            if (this.data.nominee_sign) {
                // Read the selected file and generate a preview URL
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.nomineeSignUrl = e.target.result;
                };
                reader.readAsDataURL(this.data.nominee_sign);
            } else {
                // Clear the preview if no file is selected
                this.nomineeSignUrl = null;
            }
        },

    },

    created() {
        this.getAllProgram()
        this.getProgramName()
    },

}
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
