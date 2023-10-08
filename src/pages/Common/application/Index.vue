<template>
    <div id="application">
        <v-row class="mx-5 mt-4">
            <v-col cols="10" offset="1">

                <v-card class="pa-2 mb-4">
                    <h3 class="blue--text centered-text mt-5">New Applicant Information</h3>
                    <h5 class="red--text centered-text mb-5">(Those receiving allowances need not apply)</h5>

                    <ValidationProvider name="program" vid="program" rules="required" v-slot="{ errors }">
                        <v-select outlined :items="programs" v-model="data.program" required
                            :error="errors[0] ? true : false" :error-messages="errors[0]">
                            <template v-slot:label>
                                <label style="display: inline-block">Program </label>
                                <span style="margin-left: 4px; color: red">*</span>
                            </template>
                        </v-select>
                    </ValidationProvider>



                    <div v-if="data.program">
                        <v-expansion-panels>
                            <v-expansion-panel>
                                <v-expansion-panel-header color=#8C9EFF>
                                    <h3 class="white--text centered-text">Applicant Verfication </h3>
                                </v-expansion-panel-header>
                                <v-expansion-panel-content class="mt-5">
                                    <ValidationProvider name="program" vid="program" rules="required" v-slot="{ errors }">
                                        <v-radio-group v-model="row" row>
                                            Verification type <span
                                                style="margin-left: 4px;margin-right: 4px;  color: red">*</span>
                                            <v-radio label="National Identity (NID)" value="1"></v-radio>
                                            <v-radio label="Birth Registration Number" value="2"></v-radio>
                                        </v-radio-group>
                                    </ValidationProvider>
                                    <V-row>
                                        <ValidationProvider name="Number" vid="Number" rules="required" v-slot="{ errors }">
                                            <v-text-field outlined clearable v-model="data.number" class="mr-2"
                                                type="number" required :error="errors[0] ? true : false"
                                                :error-messages="errors[0]">
                                                <template v-slot:label>
                                                    <label style="display: inline-block">Number </label>
                                                    <span style="margin-left: 4px; color: red">*</span>

                                                </template>
                                            </v-text-field>
                                        </ValidationProvider>


                                        <!-- <div class="mb-6">Active picker: <code>{{ activePicker || 'null' }}</code></div> -->

                                        <v-menu ref="menu" v-model="menu" :close-on-content-click="false"
                                            transition="scale-transition" offset-y min-width="auto">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-text-field v-model="date" outlined prepend-inner-icon="mdi-calendar"
                                                    readonly v-bind="attrs" v-on="on">
                                                    <template v-slot:label>
                                                        <label style="display: inline-block">Date of Birth </label>
                                                        <span style="margin-left: 4px; color: red">*</span>
                                                    </template></v-text-field>
                                            </template>
                                            <v-date-picker v-model="date" :active-picker.sync="activePicker"
                                                :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substring(0, 10)"
                                                min="1950-01-01" @change="save"></v-date-picker>
                                        </v-menu>



                                    </V-row>
                                    <div>

                                    </div>
                                    <div class="d-inline d-flex justify-end ">
                                        <v-btn elevation="2" class="btn" color="green">Verify</v-btn>

                                    </div>

                                </v-expansion-panel-content>
                            </v-expansion-panel>

                            <!-- 2nd Expansion panel -->

                            <v-expansion-panel class="ma-4">
                                <v-expansion-panel-header color=#8C9EFF>
                                    <h3 class="white--text centered-text">Information According to the Old Allowance </h3>
                                </v-expansion-panel-header>
                                <v-expansion-panel-content class="mt-5">
                                    <div class="pa-2 ma-4">
                                        <v-row>

                                            <v-col>
                                                <ValidationProvider name="Yearly Income" vid="yearly_income"
                                                    rules="required" v-slot="{ errors }">
                                                    <v-text-field outlined clearable required v-model="data.yearly_income"
                                                        :error="errors[0] ? true : false" :error-messages="errors[0]">
                                                        <template v-slot:label>
                                                            <label style="display: inline-block">Yearly Income </label>
                                                            <span style="margin-left: 4px; color: red">*</span>

                                                        </template>
                                                    </v-text-field>
                                                </ValidationProvider>
                                                <div class="d-inline d-flex  ">
                                                    <ValidationProvider name="Family Member No" vid="family_member_no"
                                                        v-slot="{ errors }">
                                                        <v-text-field v-model="data.family_member_no" outlined clearable
                                                            label="Total No. of Family Member" class="mr-2"
                                                            :error="errors[0] ? true : false" :error-messages="errors[0]">
                                                        </v-text-field>
                                                    </ValidationProvider>
                                                    <ValidationProvider name="Male Member No" vid="male_member_no"
                                                        v-slot="{ errors }">
                                                        <v-text-field v-model="data.male_member_no" outlined clearable
                                                            label="Male" :error="errors[0] ? true : false"
                                                            :error-messages="errors[0]">
                                                        </v-text-field>
                                                    </ValidationProvider>
                                                </div>

                                            </v-col>
                                            <v-col>
                                                <ValidationProvider name="Govt/Private Beneficiary Details"
                                                    vid="beneficiary_details" v-slot="{ errors }">
                                                    <v-text-field outlined v-model="data.beneficiary_details" clearable
                                                        label="Govt/Private Beneficiary Details"
                                                        :error="errors[0] ? true : false"
                                                        :error-messages="errors[0]"></v-text-field>


                                                </ValidationProvider>

                                                <div class="d-inline d-flex  ">
                                                    <ValidationProvider name="Female Member no " vid="female_member_no"
                                                        v-slot="{ errors }">
                                                        <v-text-field outlined clearable v-model="data.female_member_no"
                                                            label="Female" class="mr-2" :error="errors[0] ? true : false"
                                                            :error-messages="errors[0]">
                                                        </v-text-field>
                                                    </ValidationProvider>
                                                    <ValidationProvider name="Children Member no " vid="children_member_no"
                                                        v-slot="{ errors }">
                                                        <v-text-field v-model="data.children_member_no" outlined clearable
                                                            label="Children" :error="errors[0] ? true : false"
                                                            :error-messages="errors[0]">
                                                        </v-text-field>
                                                    </ValidationProvider>

                                                </div>
                                            </v-col>
                                            <!-- <v-responsive></v-responsive> -->

                                        </v-row>
                                        <div class="d-inline d-flex ml-4">

                                            <v-checkbox v-model="checkbox" label="Totally Disabled"></v-checkbox>
                                            <v-checkbox v-model="checkbox" label="Sick"></v-checkbox>
                                            <v-checkbox v-model="checkbox" label="Insane"></v-checkbox>
                                            <v-checkbox v-model="checkbox" label="Disabled"></v-checkbox>
                                            <v-checkbox v-model="checkbox" label="Partially Powerless"></v-checkbox>
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
                                                            <v-select outlined v-model="data.financial_status"
                                                                :items="financial_status" :error="errors[0] ? true : false"
                                                                :error-messages="errors[0]">
                                                                <template v-slot:label>
                                                                    <label style="display: inline-block">Financial
                                                                        Status</label>
                                                                    <span style="margin-left: 4px; color: red">*</span>

                                                                </template>
                                                            </v-select>
                                                        </ValidationProvider>
                                                        <ValidationProvider name="Land Ownership" vid="land_ownership"
                                                            v-slot="{ errors }">
                                                            <v-text-field v-model="data.land_ownership" outlined clearable
                                                                label="Land Ownership" :error="errors[0] ? true : false"
                                                                :error-messages="errors[0]" class="mr-2">
                                                            </v-text-field>
                                                        </ValidationProvider>

                                                    </v-col>
                                                    <v-col>
                                                        <ValidationProvider name="Social Status" vid="socila_status"
                                                            v-slot="{ errors }">
                                                            <v-select v-model="data.social_status" outlined
                                                                :items="social_status" :error="errors[0] ? true : false"
                                                                :error-messages="errors[0]">
                                                                <template v-slot:label>
                                                                    <label style="display: inline-block">Social
                                                                        Status</label>
                                                                    <!-- <span style="margin-left: 4px; color: red">*</span> -->
                                                                </template>
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
                                <v-expansion-panel-header color=#8C9EFF>
                                    <h3 class="white--text centered-text">Personal Information </h3>
                                </v-expansion-panel-header>
                                <v-expansion-panel-content class="mt-5">
                                    <div class="pa-2 mb-4">
                                        <v-row>

                                            <v-col>

                                                <ValidationProvider name="Name in Bangla" vid="name_bn" rules="required"
                                                    v-slot="{ errors }">
                                                    <v-text-field v-model="data.name_bn" outlined clearable
                                                        :error="errors[0] ? true : false" :error-messages="errors[0]">
                                                        <template v-slot:label>
                                                            <label style="display: inline-block">Name (BN) </label>
                                                            <span style="margin-left: 4px; color: red">*</span>

                                                        </template>
                                                    </v-text-field>
                                                </ValidationProvider>
                                                <ValidationProvider name="Name in English" vid="name_en" rules="required"
                                                    v-slot="{ errors }">
                                                    <v-text-field v-model="data.name_en" outlined clearable
                                                        :error="errors[0] ? true : false" :error-messages="errors[0]">
                                                        <template v-slot:label>
                                                            <label style="display: inline-block">Name (EN) </label>
                                                            <span style="margin-left: 4px; color: red">*</span>

                                                        </template>
                                                    </v-text-field>
                                                </ValidationProvider>
                                                <ValidationProvider name="Father Name in Bangla" vid="father_name_bn"
                                                    v-slot="{ errors }">
                                                    <v-text-field v-model="data.father_name_bn" outlined clearable
                                                        :error="errors[0] ? true : false" :error-messages="errors[0]"
                                                        label="Father Name (BN)">
                                                    </v-text-field>

                                                </ValidationProvider>

                                                <ValidationProvider name="Father Name in English" vid="mother_name_bn"
                                                    v-slot="{ errors }">
                                                    <v-text-field v-model="data.father_name_en" outlined clearable
                                                        label="Father Name (EN)" :error="errors[0] ? true : false"
                                                        :error-messages="errors[0]">
                                                    </v-text-field>
                                                </ValidationProvider>
                                                <ValidationProvider name="Mother Name in English" vid="mother_name_bn"
                                                    v-slot="{ errors }">
                                                    <v-text-field v-model="data.mother_name_bn" outlined clearable
                                                        label="Mother Name (BN)" :error="errors[0] ? true : false"
                                                        :error-messages="errors[0]">
                                                    </v-text-field>
                                                </ValidationProvider>
                                                <ValidationProvider name="Mother Name in English" vid="mother_name_en"
                                                    v-slot="{ errors }">
                                                    <v-text-field v-model="data.mother_name_en" outlined clearable
                                                        label="Mother Name (EN)" :error="errors[0] ? true : false"
                                                        :error-messages="errors[0]">
                                                    </v-text-field>
                                                </ValidationProvider>
                                                <div>
                                                    <!-- <div class="mb-6">Active picker: <code>{{ activePicker || 'null' }}</code></div> -->

                                                </div>
                                                <ValidationProvider name="Spouse Name in Bangla" vid="spouse_name_bn"
                                                    v-slot="{ errors }">
                                                    <v-text-field v-model="data.spouse_name_bn" outlined clearable
                                                        label="Spouse Name (BN)" :error="errors[0] ? true : false"
                                                        :error-messages="errors[0]">
                                                    </v-text-field>
                                                </ValidationProvider>
                                                <ValidationProvider name="Spouse Name in English" vid="spouse_name_en"
                                                    v-slot="{ errors }">
                                                    <v-text-field v-model="data.spouse_name_en" outlined clearable
                                                        label="Spouse Name (EN)" :error="errors[0] ? true : false"
                                                        :error-messages="errors[0]">
                                                    </v-text-field>
                                                </ValidationProvider>
                                                <ValidationProvider name="Religion" vid="religion" v-slot="{ errors }"
                                                    rules="required">
                                                    <v-select v-model="data.religion" outlined :items="religion"
                                                        :error="errors[0] ? true : false" :error-messages="errors[0]">
                                                        <template v-slot:label>
                                                            <label style="display: inline-block">Religion</label>
                                                            <span style="margin-left: 4px; color: red">*</span>

                                                        </template>
                                                    </v-select>
                                                </ValidationProvider>

                                            </v-col>
                                            <v-col>
                                                <v-file-input label="Image" outlined show-size counter
                                                    prepend-inner-icon="mdi-camera"></v-file-input>
                                                <v-file-input label="Sign" outlined show-size counter
                                                    prepend-inner-icon="mdi-camera"></v-file-input>
                                                <ValidationProvider name="Nationality" vid="nationality"
                                                    v-slot="{ errors }">
                                                    <v-text-field v-model="data.nationality" outlined clearable
                                                        label="Nationality" :error="errors[0] ? true : false"
                                                        :error-messages="errors[0]">
                                                    </v-text-field>
                                                </ValidationProvider>

                                                <ValidationProvider name="Gender" vid="gender" v-slot="{ errors }"
                                                    rules="required">
                                                    <v-select v-model="data.gender" outlined :items="gender"
                                                        :error="errors[0] ? true : false" :error-messages="errors[0]">
                                                        <template v-slot:label>
                                                            <label style="display: inline-block">Gender</label>
                                                            <span style="margin-left: 4px; color: red">*</span>

                                                        </template>
                                                    </v-select>
                                                </ValidationProvider>

                                                <ValidationProvider name="Age" vid="age" v-slot="{ errors }"
                                                    rules="required">
                                                    <v-text-field v-model="data.age" outlined clearable
                                                        :error="errors[0] ? true : false" :error-messages="errors[0]">
                                                        <template v-slot:label>
                                                            <label style="display: inline-block">Age </label>
                                                            <span style="margin-left: 4px; color: red">*</span>

                                                        </template>
                                                    </v-text-field>
                                                </ValidationProvider>
                                                <ValidationProvider name="Spouse Name in English" vid="spouse_name_en"
                                                    v-slot="{ errors }">
                                                    <v-text-field v-model="data.spouse_name_en" outlined clearable
                                                        label="Spouse Name (EN)" :error="errors[0] ? true : false"
                                                        :error-messages="errors[0]">
                                                    </v-text-field>
                                                </ValidationProvider>
                                                <ValidationProvider name="Education Status" vid="education_status"
                                                    rules="required" v-slot="{ errors }">
                                                    <v-select v-model="data.education_status" outlined
                                                        :error="errors[0] ? true : false" :error-messages="errors[0]"
                                                        :items="education_status">
                                                        <template v-slot:label>
                                                            <label style="display: inline-block">Education Status</label>
                                                            <span style="margin-left: 4px; color: red">*</span>

                                                        </template>
                                                    </v-select>
                                                </ValidationProvider>
                                                <ValidationProvider name="Proffession" vid="profession" v-slot="{ errors }">
                                                    <v-text-field v-model="data.profession" outlined clearable
                                                        label="Proffession" :error="errors[0] ? true : false"
                                                        :error-messages="errors[0]">
                                                    </v-text-field>
                                                </ValidationProvider>
                                                <ValidationProvider name="Identification Mark" vid="identification_mark"
                                                    v-slot="{ errors }">
                                                    <v-text-field v-model="data.identification_mark" outlined clearable
                                                        label="Identification Mark" :error="errors[0] ? true : false"
                                                        :error-messages="errors[0]">
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
                                <v-expansion-panel-header color=#8C9EFF>
                                    <h3 class="white--text centered-text">Contact Information </h3>
                                </v-expansion-panel-header>
                                <v-expansion-panel-content class="mt-5">
                                    <div class="d-inline d-flex justify-center ma-4 ">
                                        <v-card ><span class="ma-5"><b>Current Address</b></span></v-card>
                                    </div>
                                    <v-row>
                                        <v-col>
                                            <ValidationProvider name="Division" vid="division" rules="required"
                                                v-slot="{ errors }">
                                                <v-autocomplete v-model="data.division" outlined :items="division"
                                                    :error="errors[0] ? true : false" :error-messages="errors[0]">
                                                    <template v-slot:label>
                                                        <label style="display: inline-block">Division</label>
                                                        <span style="margin-left: 4px; color: red">*</span>

                                                    </template>
                                                </v-autocomplete>
                                            </ValidationProvider>
                                            <ValidationProvider name="Upazila" vid="upazila" rules="required"
                                                v-slot="{ errors }">
                                                <v-autocomplete v-model="data.upazila" outlined :items="districts"
                                                    :error="errors[0] ? true : false" :error-messages="errors[0]">
                                                    <template v-slot:label>
                                                        <label style="display: inline-block">Upazila</label>
                                                        <span style="margin-left: 4px; color: red">*</span>

                                                    </template>
                                                </v-autocomplete>
                                            </ValidationProvider>
                                            <ValidationProvider name="Post Code" vid="post_code" rules="required"
                                                v-slot="{ errors }">
                                                <v-text-field v-model="data.post_code" outlined clearable
                                                    :error="errors[0] ? true : false" :error-messages="errors[0]">
                                                    <template v-slot:label>
                                                        <label style="display: inline-block">Post Code </label>
                                                        <span style="margin-left: 4px; color: red">*</span>

                                                    </template>
                                                </v-text-field>
                                            </ValidationProvider>
                                            <ValidationProvider name="Mobile Number" vid="mobile" rules="required"
                                                v-slot="{ errors }">
                                                <v-text-field v-model="data.mobile" outlined clearable type="Number"
                                                    :error="errors[0] ? true : false" :error-messages="errors[0]">
                                                    <template v-slot:label>
                                                        <label style="display: inline-block">Mobile Number </label>
                                                        <span style="margin-left: 4px; color: red">*</span>

                                                    </template>
                                                </v-text-field>
                                            </ValidationProvider>
                                        </v-col>
                                        <v-col>
                                            <ValidationProvider name="District" vid="district" rules="required"
                                                v-slot="{ errors }">
                                                <v-autocomplete v-model="data.district" outlined :items="division" :error="errors[0] ? true : false" :error-messages="errors[0]">
                                                    <template v-slot:label>
                                                        <label style="display: inline-block">District</label>
                                                        <span style="margin-left: 4px; color: red">*</span>

                                                    </template>
                                                </v-autocomplete>
                                            </ValidationProvider>
                                              <ValidationProvider name="Location" vid="locationType" rules="required"
                                                    v-slot="{ errors }">
                                            <v-text-field v-model="data.locationType" outlined clearable :error="errors[0] ? true : false" :error-messages="errors[0]">
                                                <template v-slot:label>
                                                    <label style="display: inline-block">Location Type </label>
                                                    <span style="margin-left: 4px; color: red">*</span>

                                                </template>
                                            </v-text-field>
                                            </ValidationProvider>
                                              <ValidationProvider name="Village/House No.,
                                                        Road No., Block No, Section" vid="address" rules="required"
                                                    v-slot="{ errors }">
                                            <v-text-field v-model="data.address" outlined clearable :error="errors[0] ? true : false" :error-messages="errors[0]">
                                                <template v-slot:label>
                                                    <label style="display: inline-block">Village/House No.,
                                                        Road No., Block No, Section </label>
                                                    <span style="margin-left: 4px; color: red">*</span>

                                                </template>
                                            </v-text-field>
                                              </ValidationProvider>

                                        </v-col>
                                    </v-row>
                                    <div class="d-inline d-flex justify-center ma-4 ">
                                      <v-card ><span class="ma-5"><b>Permanent Address</b></span></v-card>
                                    </div>
                                      <v-checkbox v-model="checkbox" label="Same Address " @change="handleCheckboxChange"></v-checkbox>
                                    <v-row>
                                            <v-col>
                                                <ValidationProvider name="Division" vid="division" rules="required"
                                                    v-slot="{ errors }">
                                                    <v-autocomplete v-model="data.permanent_division" outlined :items="division"
                                                        :error="errors[0] ? true : false" :error-messages="errors[0]">
                                                        <template v-slot:label>
                                                            <label style="display: inline-block">Division</label>
                                                            <span style="margin-left: 4px; color: red">*</span>

                                                        </template>
                                                    </v-autocomplete>
                                                </ValidationProvider>
                                                <ValidationProvider name="Upazila" vid="upazila" rules="required"
                                                    v-slot="{ errors }">
                                                    <v-autocomplete v-model="data.permanent_upazila" outlined :items="districts"
                                                        :error="errors[0] ? true : false" :error-messages="errors[0]">
                                                        <template v-slot:label>
                                                            <label style="display: inline-block">Upazila</label>
                                                            <span style="margin-left: 4px; color: red">*</span>

                                                        </template>
                                                    </v-autocomplete>
                                                </ValidationProvider>
                                                <ValidationProvider name="Post Code" vid="post_code" rules="required"
                                                    v-slot="{ errors }">
                                                    <v-text-field v-model="data.permanent_post_code" outlined clearable
                                                        :error="errors[0] ? true : false" :error-messages="errors[0]">
                                                        <template v-slot:label>
                                                            <label style="display: inline-block">Post Code </label>
                                                            <span style="margin-left: 4px; color: red">*</span>

                                                        </template>
                                                    </v-text-field>
                                                </ValidationProvider>
                                                <ValidationProvider name="Mobile Number" vid="mobile" rules="required"
                                                    v-slot="{ errors }">
                                                    <v-text-field v-model="data.permanent_mobile" outlined clearable type="Number"
                                                        :error="errors[0] ? true : false" :error-messages="errors[0]">
                                                        <template v-slot:label>
                                                            <label style="display: inline-block">Mobile Number </label>
                                                            <span style="margin-left: 4px; color: red">*</span>

                                                        </template>
                                                    </v-text-field>
                                                </ValidationProvider>
                                            </v-col>
                                            <v-col>
                                                <ValidationProvider name="District" vid="district" rules="required"
                                                    v-slot="{ errors }">
                                                    <v-autocomplete v-model="data.permanent_district" outlined :items="division" :error="errors[0] ? true : false" :error-messages="errors[0]">
                                                        <template v-slot:label>
                                                            <label style="display: inline-block">District</label>
                                                            <span style="margin-left: 4px; color: red">*</span>

                                                        </template>
                                                    </v-autocomplete>
                                                </ValidationProvider>
                                                  <ValidationProvider name="Location" vid="locationType" rules="required"
                                                        v-slot="{ errors }">
                                                <v-text-field v-model="data.permanent_locationType" outlined clearable :error="errors[0] ? true : false" :error-messages="errors[0]">
                                                    <template v-slot:label>
                                                        <label style="display: inline-block">Location Type </label>
                                                        <span style="margin-left: 4px; color: red">*</span>

                                                    </template>
                                                </v-text-field>
                                                </ValidationProvider>
                                                  <ValidationProvider name="Village/House No.,
                                                        Road No., Block No, Section" vid="address" rules="required"
                                                        v-slot="{ errors }">
                                                <v-text-field v-model="data.permanent_address" outlined clearable :error="errors[0] ? true : false" :error-messages="errors[0]">
                                                    <template v-slot:label>
                                                        <label style="display: inline-block">Village/House No.,
                                                            Road No., Block No, Section </label>
                                                        <span style="margin-left: 4px; color: red">*</span>

                                                    </template>
                                                </v-text-field>
                                                  </ValidationProvider>

                                            </v-col>
                                        </v-row>

                                </v-expansion-panel-content>
                            </v-expansion-panel>
                            <!-- 4th Expansion panel -->

                            <v-expansion-panel calss="ma-4">
                                <v-expansion-panel-header color=#8C9EFF>
                                    <h3 class="white--text centered-text">Nominee Information </h3>
                                </v-expansion-panel-header>
                                <v-expansion-panel-content class="mt-5">
                                    <div class="pa-2 mb-4">
                                        <v-row>

                                            <v-col>
                                                <div>
                                                    <!-- <div class="mb-6">Active picker: <code>{{ activePicker || 'null' }}</code></div> -->

                                                </div>

                                                <v-text-field outlined clearable>
                                                    <template v-slot:label>
                                                        <label style="display: inline-block">Name (BN) </label>
                                                        <span style="margin-left: 4px; color: red">*</span>

                                                    </template>
                                                </v-text-field>
                                                <v-text-field outlined clearable>
                                                    <template v-slot:label>
                                                        <label style="display: inline-block">Name (EN) </label>
                                                        <span style="margin-left: 4px; color: red">*</span>

                                                    </template>
                                                </v-text-field>
                                                <v-text-field outlined clearable label="National Identity (NID) /
Birth Registration Number">
                                                </v-text-field>
                                                <v-checkbox v-model="checkbox" label="Same Address "></v-checkbox>

                                            </v-col>
                                            <v-col>
                                                <v-file-input label="Image" outlined show-size counter
                                                    prepend-inner-icon="mdi-camera"></v-file-input>
                                                <v-file-input label="Sign" outlined show-size counter
                                                    prepend-inner-icon="mdi-camera"></v-file-input>
                                                <v-text-field outlined clearable label="Nationality">
                                                </v-text-field>
                                                <v-autocomplete outlined :items="gender">
                                                    <template v-slot:label>
                                                        <label style="display: inline-block">Relationship with
                                                            Beneficiary</label>
                                                        <span style="margin-left: 4px; color: red">*</span>

                                                    </template>
                                                </v-autocomplete>
                                                <v-textarea outlined clearable label="Address" row="1"></v-textarea>

                                            </v-col>
                                            <!-- <v-responsive></v-responsive> -->

                                        </v-row>
                                    </div>

                                </v-expansion-panel-content>
                            </v-expansion-panel>

                            <!-- 5th Expansion panel -->


                            <v-expansion-panel calss="ma-4">
                                <v-expansion-panel-header color=#8C9EFF>
                                    <h3 class="white--text centered-text">Other Information of Eligiblity </h3>
                                </v-expansion-panel-header>
                                <v-expansion-panel-content class="mt-5">
                                    <div class="pa-2 mb-4">
                                        <v-row>

                                            <v-col>
                                                <v-select outlined :items="yes_no">
                                                    <template v-slot:label>
                                                        <label style="display: inline-block">Is this house yours?</label>
                                                        <span style="margin-left: 4px; color: red">*</span>

                                                    </template>
                                                </v-select>
                                                <v-text-field outlined clearable label="Age of House Member Head">
                                                </v-text-field>
                                                <v-text-field outlined clearable type="Number">
                                                    <template v-slot:label>
                                                        <label style="display: inline-block">Number of House Members
                                                        </label>
                                                        <span style="margin-left: 4px; color: red">*</span>

                                                    </template>
                                                </v-text-field>

                                                <v-select outlined :items="education_status">
                                                    <template v-slot:label>
                                                        <label style="display: inline-block">How many total rooms does your
                                                            house
                                                            use for living?</label>
                                                        <span style="margin-left: 4px; color: red">*</span>

                                                    </template>
                                                </v-select>
                                                <v-text-field outlined clearable type="Number">
                                                    <template v-slot:label>
                                                        <label style="display: inline-block">Number of House Members
                                                        </label>
                                                        <span style="margin-left: 4px; color: red">*</span>

                                                    </template>
                                                </v-text-field>
                                                <v-select outlined :items="yes_no"
                                                    label="Does your kitchen have electricity connection?">

                                                </v-select>
                                                <v-select outlined :items="yes_no" label="
Other Information of Eligibility

Does your kitchen have  a separate Room in a house?">

                                                </v-select>
                                                <v-select outlined :items="yes_no"
                                                    label="Has your Family member head received any money from someone staying abroad in the last 1 year?">

                                                </v-select>
                                                <v-select outlined :items="yes_no" label="as any member of this
household received any
assistance under the social
safety net program in the
last 1 year?">

                                                </v-select>
                                                <v-select outlined :items="yes_no">
                                                    <template v-slot:label>
                                                        <label style="display: inline-block">Does your House have a separate
                                                            kitchen
                                                            ?</label>
                                                        <span style="margin-left: 4px; color: red">*</span>

                                                    </template>
                                                </v-select>

                                                <v-select outlined :items="yes_no">
                                                    <template v-slot:label>
                                                        <label style="display: inline-block">What is the roof of your main
                                                            house
                                                            made of ?</label>
                                                        <span style="margin-left: 4px; color: red">*</span>

                                                    </template>
                                                </v-select>

                                                <v-select outlined :items="yes_no">
                                                    <template v-slot:label>
                                                        <label style="display: inline-block">What kind of toilet do the
                                                            members
                                                            of
                                                            this house use ?</label>
                                                        <span style="margin-left: 4px; color: red">*</span>

                                                    </template>
                                                </v-select>

                                                <v-select outlined :items="yes_no">
                                                    <template v-slot:label>
                                                        <label style="display: inline-block">What is the total amount of
                                                            land
                                                            owned
                                                            by all the members of your police station ?</label>
                                                        <span style="margin-left: 4px; color: red">*</span>

                                                    </template>
                                                </v-select>
                                                <v-text-field outlined clearable>
                                                    <template v-slot:label>
                                                        <label style="display: inline-block">What are the walls of your main
                                                            room
                                                            made of ?</label>
                                                        <span style="margin-left: 4px; color: red">*</span>

                                                    </template>
                                                </v-text-field>

                                            </v-col>
                                            <v-col>

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
                                                        <v-checkbox v-model="checkbox" label="Camera Camera"
                                                            dense></v-checkbox>

                                                    </v-col>
                                                </v-row>
                                                <v-select outlined :items="yes_no">
                                                    <template v-slot:label>
                                                        <label style="display: inline-block">What type of toilet do members
                                                            of
                                                            this
                                                            household use?</label>
                                                        <span style="margin-left: 4px; color: red">*</span>

                                                    </template>
                                                </v-select>
                                                <v-select outlined :items="yes_no">
                                                    <template v-slot:label>
                                                        <label style="display: inline-block">What type of toilet do members
                                                            of
                                                            this
                                                            household use?</label>
                                                        <span style="margin-left: 4px; color: red">*</span>

                                                    </template>
                                                </v-select>

                                            </v-col>
                                            <!-- <v-responsive></v-responsive> -->

                                        </v-row>
                                    </div>

                                </v-expansion-panel-content>
                            </v-expansion-panel>

                        </v-expansion-panels>
                    </div>
                    <p class="red--text centered-text mt-5">If you have any objections or complaints regarding the
                        application, please contact the Upazila Social Service Officer. *</p>
                </v-card>

            </v-col>
        </v-row>


    </div>
</template>

<script>
import { extend, ValidationProvider, ValidationObserver } from "vee-validate";
import { mapState } from "vuex";
export default {
    title: "CTM - Online Application",
    data() {
        return {
            programs: ["Old Age Allowance Program", "Disability Allowance Program", "Widow And Husband Adopted Allowance program"],
            financial_status: ["Poor", "Refugee", "Landless"],
            social_status: ["Widow", "Widower", "Divorced"],
            religion: ["Islam", "Hindu"],
            gender: ["Male", "Female", "3rd Gender"],
            education_status: ["JSC", "SSC", "HSC"],
            division: ["Dhaka", "Rajshahi"],
            yes_no: ["Yes ", "No"],

            activePicker: null,
            date: null,
            menu: false,
            isChecked:false,
            data: {
                program: null,
                number: null,
                dob: null,
                yearly_income: null,
                beneficiary_details: null,
                family_member_no: null,
                male_member_no: null,
                female_member_no: null,
                children_member_no: null,
                financial_status: null,
                social_status: null,
                land_ownership: null,
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
                address: null,
                locationType:null,
                permanent_division: null,
                permanent_district: null,
                permanent_upazila: null,
                permanent_Location: null,
                permanent_post_code: null,
                permanent_mobile: null,
                permanent_address: null,
                permanent_location: null,




            }
        }
    },
    computed: {

        ...mapState({

            divisions: (state) => state.Division.divisions,

        }),
    },
    components: {
        ValidationProvider,
        ValidationObserver,
    },
    watch: {
        menu(val) {
            val && setTimeout(() => (this.activePicker = 'YEAR'))
        },
    },
    methods: {
        save(date) {
            this.$refs.menu.save(date)
        },
        handleCheckboxChange(){
            //   if (this.isChecked) {
            //     // Call your function when the checkbox is checked
            //     this.data.division= null,
            //      this.data.district=null,
            //      this.data.upazila=null,
            //      this.data.Location= null,
            //      this.data.post_code= null,
            //      this.data.mobile= null,
            //      this.data.address= null,
            //      this.data.location=null,
            // } else {
            //     // Call another function when the checkbox is unchecked
                
            // }

        }
    },
    mounted() {
        this.$store.commit("setHeaderTitle", "Online Application Entry");

    }

}
</script>

<style>
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



</style>
