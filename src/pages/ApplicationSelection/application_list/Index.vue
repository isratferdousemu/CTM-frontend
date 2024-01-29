<template>
    <div id="aplication_list">
        <v-row class="mx-5 mt-4">
            <v-col cols="12">
                <v-row>
                    <v-col cols="12">

                        <!-- Expantion panels start -->
                        <v-expansion-panels>
                            <v-expansion-panel class="ma-2">
                                <v-expansion-panel-header color=#8C9EFF>
                                    <h3 class="white--text ">
                                        {{ $t("container.application_selection.application.search") }}
                                    </h3>
                                </v-expansion-panel-header>
                                <v-expansion-panel-content class="elevation-0 transparent mt-10">
                                    <ValidationObserver ref="formsearch" v-slot="{ invalid }">
                                        <form @submit.prevent="submitsearch()">
                                            <v-row>
                                                <v-col lg="3" md="3" cols="12">

                                                    <v-autocomplete outlined clearable class="no-arrow-icon"
                                                        v-model="data.program_id" :append-icon-cb="appendIconCallback"
                                                        append-icon="mdi-plus" :items="allowances" item-text="name_en"
                                                        item-value="id"
                                                        :label="$t('container.application_selection.application.program')">
                                                    </v-autocomplete>
                                                </v-col>

                                                <v-col lg="3" md="3" cols="12" v-if="!isReadonlyLocationType()">
                                                    <ValidationProvider name="Location Type" vid="location_type"
                                                        v-slot="{ errors }">
                                                        <v-autocomplete @input="LocationType($event)"
                                                            v-model="data.location_type" class="no-arrow-icon"
                                                            :append-icon-cb="appendIconCallback" append-icon="mdi-plus"
                                                            :hide-details="errors[0] ? false : true" outlined
                                                            :readonly="isReadonlyLocationType()"
                                                            :label="$t('container.list.location_type')"
                                                            :items="locationType" item-text="value_en" item-value="id"
                                                            :error="errors[0] ? true : false"
                                                            :error-messages="errors[0]"></v-autocomplete>

                                                    </ValidationProvider>
                                                </v-col>
                                                <v-col lg="3" md="3" cols="12" v-if="!isReadonlyDivision()">
                                                    <ValidationProvider name="Division" vid="division" v-slot="{ errors }">
                                                        <v-autocomplete :hide-details="errors[0] ? false : true"
                                                            @input="onChangeDivision($event)" v-model="data.division_id"
                                                            outlined :label="$t(
                                                                'container.system_config.demo_graphic.division.division'
                                                            )
                                                                " :items="divisions" item-text="name_en"
                                                            item-value="id" :error="errors[0] ? true : false"
                                                            :readonly="isReadonlyDivision()" :error-messages="errors[0]"
                                                            class="no-arrow-icon" :append-icon-cb="appendIconCallback"
                                                            append-icon="mdi-plus"></v-autocomplete>
                                                    </ValidationProvider>
                                                </v-col>
                                                <v-col lg="3" md="3" cols="12" v-if="!isReadonlyDistrict()">
                                                    <ValidationProvider name="District" vid="district" v-slot="{ errors }">
                                                        <v-autocomplete :hide-details="errors[0] ? false : true" outlined
                                                            v-model="data.district_id" @input="onChangeDistrict($event)"
                                                            :label="$t(
                                                                'container.system_config.demo_graphic.district.district'
                                                            )
                                                                " :items="districts" item-text="name_en"
                                                            item-value="id" :error="errors[0] ? true : false"
                                                            :readonly="isReadonlyDistrict()" :error-messages="errors[0]"
                                                            class="no-arrow-icon" :append-icon-cb="appendIconCallback"
                                                            append-icon="mdi-plus"></v-autocomplete>
                                                    </ValidationProvider>
                                                </v-col>
                                                <v-col v-if="data.location_type == 2 && !isReadonlyUpazila()" lg="3" md="3"
                                                    cols="12">
                                                    <ValidationProvider name="Upazila" vid="thana_id" v-slot="{ errors }">
                                                        <v-autocomplete :hide-details="errors[0] ? false : true"
                                                            v-model="data.thana_id" outlined
                                                            :label="$t('container.system_config.demo_graphic.ward.upazila')"
                                                            @change="onChangeUpazila($event)" :items="thanas"
                                                            item-text="name_en" item-value="id"
                                                            :error="errors[0] ? true : false" :error-messages="errors[0]"
                                                            class="no-arrow-icon" :readonly="isReadonlyUpazila()"
                                                            :append-icon-cb="appendIconCallback"
                                                            append-icon="mdi-plus"></v-autocomplete>
                                                    </ValidationProvider>
                                                </v-col>
                                                <v-col v-if="data.location_type == 2 && !isReadonlySubLocation()" lg="3"
                                                    md="3" cols="12">
                                                    <!-- :readonly="data.sub_location_type !== null &&  this.permissions?.user?.committee_type_id == 12 -->

                                                    <ValidationProvider name="subLocationType" vid="subLocationType"
                                                        v-slot="{ errors }">
                                                        <v-autocomplete @input="onChangeSubLocationType($event)"
                                                            v-model="data.sub_location_type" outlined :label="$t(
                                                                'container.system_config.demo_graphic.ward.subLocation_type'
                                                            )
                                                                " :items="subLocationType" item-text="value_en"
                                                            item-value="id" :error="errors[0] ? true : false"
                                                            :readonly="isReadonlySubLocation()" :error-messages="errors[0]"
                                                            :hide-details="errors[0] ? false : true" class="no-arrow-icon"
                                                            :append-icon-cb="appendIconCallback"
                                                            append-icon="mdi-plus"></v-autocomplete>
                                                    </ValidationProvider>
                                                </v-col>

                                                <v-col
                                                    v-if="data.location_type == 2 && data.sub_location_type == 1 && !isReadonlyPouro()"
                                                    lg="3" md="3" cols="12">
                                                    <ValidationProvider name="pouros" vid="pouros" v-slot="{ errors }">
                                                        <v-autocomplete v-model="data.pouro_id" outlined :label="$t(
                                                            'container.system_config.demo_graphic.ward.pouro'
                                                        )
                                                            " :items="pouros" item-text="name_en" item-value="id"
                                                            @input="onChangePouroGetWard($event)"
                                                            :error="errors[0] ? true : false" :error-messages="errors[0]"
                                                            :hide-details="errors[0] ? false : true" class="no-arrow-icon"
                                                            :readonly="isReadonlyPouro()"
                                                            :append-icon-cb="appendIconCallback"
                                                            append-icon="mdi-plus"></v-autocomplete>
                                                    </ValidationProvider>
                                                </v-col>
                                                <!-- :readonly="permissions?.user?.committee_type_id == 12 && data.pouro_id != null" -->

                                                <v-col
                                                    v-if="data.sub_location_type == 2 && data.location_type == 2 && !isReadonlyUnion()"
                                                    lg="3" md="3" cols="12">
                                                    <ValidationProvider name="unions" vid="unions" v-slot="{ errors }">
                                                        <v-autocomplete @input="onChangeUnionGetWard($event)"
                                                            v-model="data.union_id" outlined :label="$t(
                                                                'container.system_config.demo_graphic.ward.union'
                                                            )
                                                                " :items="unions" item-text="name_en" item-value="id"
                                                            :error="errors[0] ? true : false" :readonly="isReadonlyUnion()"
                                                            :error-messages="errors[0]"
                                                            :hide-details="errors[0] ? false : true" class="no-arrow-icon"
                                                            :append-icon-cb="appendIconCallback"
                                                            append-icon="mdi-plus"></v-autocomplete>
                                                    </ValidationProvider>
                                                </v-col>
                                                <!-- :readonly="permissions?.user?.committee_type_id == 12 && data.union_id !=null"  -->


                                                <v-col v-if="data.location_type == 3 && !isReadonlyCity()" lg="3" md="3"
                                                    cols="12">
                                                    <ValidationProvider name="city" vid="city_id" v-slot="{ errors }">
                                                        <v-autocomplete :hide-details="errors[0] ? false : true"
                                                            @change="onChangeCity($event)" outlined :label="$t('container.system_config.demo_graphic.ward.city')
                                                                " :items="cities" item-text="name_en" item-value="id"
                                                            :error="errors[0] ? true : false" :error-messages="errors[0]"
                                                            class="no-arrow-icon" :readonly="isReadonlyCity()"
                                                            v-model="data.city_id" :append-icon-cb="appendIconCallback"
                                                            append-icon="mdi-plus"></v-autocomplete>
                                                    </ValidationProvider>
                                                </v-col>
                                                <!-- :readonly="data.city_id !== null" v-model="data.city_id" -->
                                                <v-col
                                                    v-if="data.location_type == 3 && permissions?.user?.committee_type_id != 13"
                                                    lg="3" md="3" cols="12">
                                                    <ValidationProvider name="thana" vid="city_thana_id"
                                                        v-slot="{ errors }">
                                                        <v-autocomplete @input="onChangeThanaGetWard($event)"
                                                            :readonly="permissions?.user?.committee_type_id == 13"
                                                            :hide-details="errors[0] ? false : true"
                                                            v-model="data.city_thana_id" outlined :label="$t('container.system_config.demo_graphic.ward.thana')
                                                                " :items="city_thanas" item-text="name_en"
                                                            item-value="id" :error="errors[0] ? true : false"
                                                            :error-messages="errors[0]" class="no-arrow-icon"
                                                            :append-icon-cb="appendIconCallback"
                                                            append-icon="mdi-plus"></v-autocomplete>
                                                    </ValidationProvider>
                                                </v-col>

                                                <v-col v-if="data.location_type == 1 && !isReadonlyDistPouro()" lg="3"
                                                    md="3" cols="12">

                                                    <ValidationProvider name="thana" vid="district_pouro_id"
                                                        v-slot="{ errors }">
                                                        <v-autocomplete @input="onChangeDistrictPouroGetWard($event)"
                                                            :readonly="isReadonlyDistPouro()"
                                                            :hide-details="errors[0] ? false : true"
                                                            v-model="data.district_pouro_id" outlined :label="$t('container.system_config.demo_graphic.ward.dist_pouro')
                                                                " :items="district_poros" item-text="name_en"
                                                            item-value="id" :error="errors[0] ? true : false"
                                                            :error-messages="errors[0]" class="no-arrow-icon"
                                                            :append-icon-cb="appendIconCallback"
                                                            append-icon="mdi-plus"></v-autocomplete>
                                                    </ValidationProvider>
                                                </v-col>

                                                <v-col
                                                    v-if="data.location_type && permissions?.user?.committee_type_id != 13"
                                                    lg="3" md="3" cols="12">
                                                    <ValidationProvider name="Ward" vid="ward_id" v-slot="{ errors }">
                                                        <v-autocomplete :hide-details="errors[0] ? false : true"
                                                            v-model="data.ward_id" outlined :label="$t('container.system_config.demo_graphic.ward.ward')
                                                                " :items="wards" item-text="name_en" item-value="id"
                                                            :readonly="permissions?.user?.committee_type_id == 13"
                                                            :error="errors[0] ? true : false" :error-messages="errors[0]"
                                                            class="no-arrow-icon" :append-icon-cb="appendIconCallback"
                                                            append-icon="mdi-plus"></v-autocomplete>
                                                    </ValidationProvider>
                                                </v-col>

                                                <!-- :readonly="permissions?.user?.committee_type_id== 13 && data.ward_id !=null" -->



                                            </v-row>
                                            <v-row>
                                                <v-btn elevation="2" class="btn ml-3 mt-3 white--text" color="blue"
                                                    @click="toggleFieldVisibility">{{
                                                        $t("container.beneficiary_management.beneficiary_list.advance_search")
                                                    }}</v-btn>

                                            </v-row>
                                            <v-row v-if="isFieldVisible" class="mt-10">
                                                <v-col lg="3" md="3" cols="12">
                                                    <v-text-field v-model="data.application_id" outlined clearable
                                                        append-icon="mdi-plus" :append-icon-cb="appendIconCallback"
                                                        :label="$t('container.application_selection.application.applicant_id')">
                                                    </v-text-field>
                                                </v-col>
                                                <v-col lg="3" md="3" cols="12">
                                                    <v-text-field v-model="data.nominee_name" outlined clearable
                                                        append-icon="mdi-plus" :append-icon-cb="appendIconCallback"
                                                        :label="$t('container.beneficiary_management.beneficiary_list.nominee')">
                                                    </v-text-field>
                                                </v-col>
                                                <v-col lg="3" md="3" cols="12">
                                                    <v-text-field v-model="data.account_no" outlined clearable
                                                        :append-icon-cb="appendIconCallback" append-icon="mdi-plus"
                                                        :label="$t('container.application_selection.application.account')">
                                                    </v-text-field>
                                                </v-col>
                                                <v-col lg="3" md="3" cols="12">
                                                    <v-text-field v-model="data.nid_no" outlined clearable
                                                        append-icon="mdi-plus" :append-icon-cb="appendIconCallback"
                                                        :label="$t('container.beneficiary_management.beneficiary_list.nid')">
                                                    </v-text-field>
                                                </v-col>

                                                <v-col lg="3" md="3" cols="12">
                                                    <v-select outlined clearable append-icon="mdi-plus" :items="lists"
                                                        item-text="name_en" item-value="id" v-model="data.status_list"
                                                        :append-icon-cb="appendIconCallback"
                                                        :label="$t('container.list.status')">
                                                    </v-select>
                                                </v-col>
                                            </v-row>

                                            <div class="d-inline d-flex justify-end ">
                                                <v-btn elevation="2" type="submit" class="btn mr-2" color="success">{{
                                                    $t("container.list.search") }}</v-btn>
                                                <v-btn elevation="2" class="btn" @click="resetForm()">{{
                                                    $t("container.list.reset") }}</v-btn>
                                            </div>
                                        </form>
                                    </ValidationObserver>

                                </v-expansion-panel-content>
                            </v-expansion-panel>
                            <v-expansion-panel class="ma-2">
                                <v-expansion-panel-header color=#8C9EFF>
                                    <h3 class="white--text ">
                                        {{ $t("container.application_selection.application.update_status") }}
                                    </h3>
                                </v-expansion-panel-header>
                                <v-expansion-panel-content class="elevation-0 transparent mt-10">
                                    <v-row>
                                        <v-col lg="6" md="6" cols="12">
                                            <v-text-field outlined
                                                :label="$t('container.application_selection.application.remark')"
                                                v-model="forward.remark">

                                            </v-text-field>
                                        </v-col>
                                        <v-col lg="6" md="6" cols="12" v-if="this.permissions?.permission?.forward">
                                            <v-select outlined clearable :items="committe" item-text="name" item-value="id"
                                                v-model="forward.committee_id">
                                                <template v-slot:label>
                                                    <label> {{
                                                        $t("container.application_selection.application.forward_to_committee")
                                                    }}</label>
                                                    <span style="margin-left: 4px; color: red">*</span>
                                                </template>

                                            </v-select>
                                        </v-col>
                                    </v-row>
                                   

                                </v-expansion-panel-content>
                            </v-expansion-panel>
                        </v-expansion-panels>
                        <!-- Expantion panels end -->
                        <!-- Application list -->
                        <v-card elevation="10" color="white" rounded="md" theme="light" class="mb-8 mt-5">



                            <v-card-title class="justify-center" tag="div">
                                <h3 class="text-uppercase pt-3">
                                    {{ $t("container.application_selection.application.list") }}
                                </h3>
                            </v-card-title>
                            <v-card-text>
                           
                                    <v-row justify="space-between" align="center" >
                                                            <v-col lg="3" md="3" cols="12" >
                                                 
                                      
                                                   
                  </v-col>
                                         <v-col lg="3" md="3" cols="12" class="text-right">
                                                 
                                      
                                                  <v-select
                v-model="selectedColumns"
                :items="selectableColumns"
                :label="$t('container.application_selection.application.select_column')"
                multiple
                @change="updateVisibleColumns"
                outlined
                menu-props="top"
              >
                <template v-slot:selection="{ item, index }">
                </template>
              </v-select>
              </v-col>
              </v-row>
                                        <!-- </div> -->
                               <template>
      <v-row justify="space-between" align="center" class="mx-4">
        <!-- Checkbox on the left -->
        <v-col lg="3" md="3" cols="12">
           
          <v-checkbox :label="$t('container.application_selection.application.select_all')" v-model="selectAll" @change="toggleSelectAll"></v-checkbox>
        </v-col>

        <!-- Dropdown on the right -->
        <v-col lg="4" md="4" cols="12" class="text-right">
        
          <v-btn elevation="2" class="btn mr-2" color="success" @click="SubmitApproved()"
                                                :disabled="isButtonDisabled" v-if="this.permissions?.permission?.approve">{{
                                                    $t("container.list.approve") }}</v-btn>
                                            <v-btn elevation="2" class="btn mr-2 white--text" color="blue" @click="SubmitForward()"
                                                :disabled="isForwardButtonDisabled"
                                                v-if="this.permissions?.permission?.forward">{{
                                                    $t("container.list.forward") }}</v-btn>
                                            <v-btn elevation="2" class="btn mr-2" color="warning" @click="SubmitWaiting()"
                                                :disabled="isButtonDisabled" v-if="this.permissions?.permission?.waiting">{{
                                                    $t("container.list.waiting") }}</v-btn>
                                            <v-btn elevation="2" class="btn mr-2 error" @click="SubmitReject()"
                                                :disabled="isButtonDisabled" v-if="this.permissions?.permission?.reject">{{
                                                    $t("container.list.reject")
                                                }}</v-btn>
        </v-col>
      </v-row>
      <v-row justify="space-between" align="center" class="mx-4">
            <!-- Checkbox on the left -->
            <v-col lg="3" md="3" cols="12">
           
             {{  $t('container.list.total') }}:{{this.total}}
            </v-col>

            <!-- Dropdown on the right -->
            <v-col lg="4" md="4" cols="12" class="text-right">
        
              <v-btn elevation="2" class="btn mr-2 white--text" color="red darken-4" @click="GeneratePDF()"
                                                    >{{
                                                        $t("container.list.PDF") }}</v-btn>
                                                <v-btn elevation="2" class="btn mr-2  white--text" color="teal darken-2" @click="GenerateExcel()"
                                                    >{{
                                                        $t("container.list.excel") }}</v-btn>
                                               
            </v-col>
          </v-row>
    </template>
                                <v-row class="ma-0  white round-border d-flex justify-space-between align-center"
                                    justify="center" justify-lg="space-between">




                                    <v-col cols="12">


                                        <v-data-table :headers="visibleHeaders" :items="applications" :loading="loading"
                                            item-key="id" :items-per-page="pagination.perPage" hide-default-footer
                                            class="elevation-0 transparent row-pointer">
                                            <!-- Header slot -->


                                            <template v-slot:item.id="{ item, index }">

                                                <v-checkbox v-model="forward.applications_id" :value="item.id"
                                                    :disabled="unselectedItem(item)"></v-checkbox>


                                            </template>
                                            <template v-slot:item.sl="{ item, index }">
                                                {{
                                                    (pagination.current - 1) * pagination.perPage +
                                                    index +
                                                    1
                                                }}
                                            </template>
                                            <template v-slot:item.division="{ item }">
                                                <span v-if="item?.permanent_location.location_type == '1'">
                                                    {{ item?.permanent_location?.parent?.parent?.parent?.name_en }}
                                                </span>

                                                <span
                                                    v-if="item?.permanent_location.location_type == '2' || item?.permanent_location.location_type == '3'">
                                                    {{ item?.permanent_location.parent?.parent?.parent?.parent?.name_en }}
                                                </span>


                                            </template>
                                            <template v-slot:item.district="{ item }">
                                                <span v-if="item?.permanent_location.location_type == '1'">
                                                    {{ item?.permanent_location?.parent?.parent?.name_en }}
                                                </span>

                                                <span
                                                    v-if="item?.permanent_location.location_type == '2' || item?.permanent_location.location_type == '3'">
                                                    {{ item?.permanent_location.parent?.parent?.parent?.name_en }}
                                                </span>


                                            </template>
                                            <template v-slot:item.location="{ item }">
                                                <span v-if="item?.permanent_location.location_type == '1'">
                                                    {{ item?.permanent_location?.parent?.name_en }}
                                                </span>

                                                <span
                                                    v-if="item?.permanent_location.location_type == '2' || item?.permanent_location.location_type == '3'">
                                                    {{ item?.permanent_location.parent?.parent?.name_en }}
                                                </span>


                                            </template>

                                            <template v-slot:item.union_pouro_city="{ item }">


                                                <span
                                                    v-if="item?.permanent_location.location_type == '2' || item?.permanent_location.location_type == '3'">
                                                    {{ item?.permanent_location.parent?.name_en }}
                                                </span>


                                            </template>


                                            <template v-slot:item.ward="{ item }">


                                                <span>

                                                    {{ item?.permanent_location.name_en }}
                                                </span>


                                            </template>
                                            <template v-slot:item.status="{ item }">

                                                <span v-if="item.status == 0" class="not-selected"
                                                    style="background-color: lightgray; padding: 5px; width: 100px;">
                                                    Not Selected
                                                </span>
                                                <span v-if="item.status == 1" class="forwarded"
                                                    style="background-color: #4CAF50; color: white; padding: 5px; width: 100px;">
                                                    Forwarded
                                                </span>
                                                <span v-if="item.status == 2" class="approved"
                                                    style="background-color: #008000; color: white; padding: 5px; width: 100px;">
                                                    Approved
                                                </span>
                                                <span v-if="item.status == 3" class="waiting"
                                                    style="background-color: #FFD700; padding: 5px; width: 100px;">
                                                    Waiting
                                                </span>
                                                <span v-if="item.status == 4" class="rejected"
                                                    style="background-color: #FF0000; color: white; padding: 5px; width: 100px;">
                                                    Rejected
                                                </span>
                                            </template>


                                            <!-- Action Button -->
                                            <template v-slot:item.actions="{ item }">

                                                <v-tooltip top>
                                                    <template v-slot:activator="{ on }">
                                                        <v-btn fab x-small v-on="on" color="#AFB42B" router
                                                            :to="`/application-selection/application-view/${item.id}`"
                                                            elevation="0" class="white--text">
                                                            <v-icon> mdi-eye </v-icon>
                                                        </v-btn>
                                                    </template>
                                                    <span>
                                                        {{ $t("container.list.view") }}
                                                    </span>
                                                </v-tooltip>
                                            </template>




                                            <!-- End Action Button -->
                                            <template v-slot:footer="item">
                                                <div class="text-center pt-2 v-data-footer justify-center pb-2">
                                                    <v-select style="
                              position: absolute;
                              right: 25px;
                              width: 149px;
                              transform: translate(0px, 0px);
                            " :items="items" hide-details dense outlined @change="onPageChange"
                                                        v-model="pagination.perPage"></v-select>
                                                    <v-pagination circle primary v-model="pagination.current"
                                                        :length="pagination.total" @input="onPageChange" :total-visible="11"
                                                        class="custom-pagination-item"></v-pagination>
                                                </div>
                                            </template>
                                        </v-data-table>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>


        </v-row>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { extend, ValidationProvider, ValidationObserver } from "vee-validate";
import { required } from "vee-validate/dist/rules";
import { http } from "@/hooks/httpService";

extend("required", required);
export default {
    name: "Index",
    title: "CTM - Application List",
    data() {
        return {
            data: {
                id: null,
                name_en: null,
                name_bn: null,
                code: null,
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
                application_id: null,
                nominee_name: null,
                account_no: null,
                status_list: null,
                program_id: null
            },
            total:null,

            forward: {
                committee_id: null,
                remark: null,
                status: null,
                applications_id: [],
            },
            lists: [
                { id: 2, name_en: "Approved" },
                { id: 1, name_en: "Forwarded" },
                {id:0,name_en:"Not Selected"},
                { id: 4, name_en: "Rejected" },
                { id: 3, name_en: "Waiting" },

            ],

            selectAll: null,
            committe: [],
            permissions: [],
            isFieldVisible: false,
            value: ["3", "100", "11", "12"], // Default selection without 'name'
            selectedHeaders: [],
            loading: false,
            search: "",
            delete_id: "",
            applications: [],
            districts: [],
            cities: [],
            thanas: [],
            city_thanas: [],
            unions: [],
            pouros: [],
            wards: [],
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
            allowances: [],


            pagination: {
                current: 1,
                total: 0,
                perPage: 10,
            },
            items: [5, 10, 15, 20, 40, 50, 100],

            selectedColumns: ['name_en', 'program.name_en', 'application_id', 'status'],  // Initially, first 6 columns are selected

            fixedColumns: ['id', 'sl', 'actions'],  // Two columns that will always remain visible


        };
    },
    components: {
        ValidationProvider,
        ValidationObserver,
    },
    computed: {


        isForwardButtonDisabled() {
            // Disable the button if no applications are selected
            return !(this.forward.applications_id && this.forward.applications_id.length > 0 && this.forward.committee_id !== null);
        },
        isButtonDisabled() {
            return !(this.forward.applications_id && this.forward.applications_id.length > 0);
        },



        ...mapState({
            divisions: (state) => state.Division.divisions,
            userData: (state) => state.userData
        }),
        userRoleNames() {
            // Extract the 'name' property from each role object
            return this.userData.roles ? this.userData.roles.map(role => role.name) : [];
        },
        visibleHeaders() {
            // Combine fixed columns and selected columns
            const allVisibleColumns = [...this.fixedColumns, ...this.selectedColumns];

            // Filter the headers based on the visible columns
            return this.headers.filter(column => allVisibleColumns.includes(column.value));
        },
        selectableColumns() {
            // Filter the columns that can be selected (exclude fixed columns)
            return this.headers.filter(column => !column.fixed);
        },
        headers() {
            return [

                { text: this.$t("container.application_selection.application.select"), value: "id", fixed: true },
                { text: this.$t("container.list.sl"), value: "sl", fixed: true },

                {
                    text: this.$t(
                        "container.application_selection.application.applicant_id"
                    ),
                    value: "application_id",
                },
                {
                    text: this.$t(
                        "container.application_selection.application.program"
                    ),
                    value: "program.name_en",
                },
                {
                    text: this.$t("container.list.name_en"),
                    value: "name_en",

                },
                {
                    text: this.$t("container.list.status"),
                    value: "status",

                },
                {
                    text: this.$t("container.application_selection.variable.score"),
                    value: "score",

                },

                {
                    text: this.$t("container.beneficiary_management.beneficiary_list.account_no"),
                    value: "account_number",

                },
                {
                    text: this.$t("container.beneficiary_management.beneficiary_list.nid"),
                    value: "verification_number",

                },

                {
                    text: this.$t("container.system_config.demo_graphic.division.division"),
                    value: "division",
                },
                {
                    text: this.$t("container.system_config.demo_graphic.district.district"),
                    value: "district",
                },
                {
                    text: this.$t("container.system_config.demo_graphic.ward.upazila_city_district"),
                    value: "location",
                },
                {
                    text: this.$t("container.system_config.demo_graphic.ward.union_pouro_city"),
                    value: "union_pouro_city",
                },
                {
                    text: this.$t("container.system_config.demo_graphic.ward.ward"),
                    value: "ward",
                },



                {
                    text: this.$t("container.application_selection.application.father_name_en"),
                    value: "father_name_en",

                },

                {
                    text: this.$t("container.application_selection.application.mother_name_en"),
                    value: "mother_name_en",

                },

                {
                    text: this.$t("container.system_config.allowance_program.marital_status"),
                    value: "marital_status",

                },
                {
                    text: this.$t("container.application_selection.application.spouse_name_en"),
                    value: "spouse_name_en",

                },


                {
                    text: this.$t("container.beneficiary_management.beneficiary_list.nominee"),
                    value: "nominee_en",

                },
                {
                    text: this.$t("container.application_selection.application.nominee_relation_with_beneficiary"),
                    value: "nominee_relation_with_beneficiary",

                },



                {
                    text: this.$t("container.application_selection.application.mobile"),
                    value: "mobile",

                },


                { text: this.$t("container.list.action"), value: "actions", fixed: true },

            ];
        },




    },

    methods: {
        GeneratePDF(){
              const queryParams = {
                selectedColumns: this.selectedColumns,
              
            };
            this.$axios
                .get("/admin/application/generate-pdf", {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                    params: queryParams,
                })
                .then((result) => {
                    console.log(result);

                       window.open(result.data.data.url, '_blank');
                })
                .catch(error => {
                    console.error('Error generating PDF:', error);
                });

        },
        GenerateExcel(){

        },

        Division() {
            this.data.division_id != null;

        },
        toggleSelectAll() {
            // Toggle the state of selectAll
            if (this.selectAll) {
                // Select all items based on the unselectedItem logic
                this.forward.applications_id = this.applications
                    .filter(item => !this.unselectedItem(item))
                    .map(app => app.id);
            } else {
                // Deselect all items
                this.forward.applications_id = [];
            }
            console.log(this.forward.applications_id, "applications")

        },
        isReadonlyDivision() {
            if (this.permissions?.user?.office_type) {
                const officeType = this.permissions?.user?.office_type;
                return [6, 7, 8, 9, 10, 11, 35].includes(officeType);

            }
            if (this.permissions?.user?.committee_type_id) {
                const CommitteeType = this.permissions?.user?.committee_type_id;
                return [12, 13, 14, 15, 16, 17].includes(CommitteeType);
            }
            return false;

        },
        isReadonlyDistrict() {
            if (this.permissions?.user?.office_type !== null) {
                const officeType = this.permissions?.user?.office_type;
                return [7, 8, 9, 10, 11, 35].includes(officeType);

            }
            if (this.permissions?.user?.committee_type_id !== null) {
                const CommitteeType = this.permissions?.user?.committee_type_id;
                return [12, 13, 14, 15, 16, 17].includes(CommitteeType);
            }
            return false;

        },
        isReadonlyLocationType() {
            if (this.permissions?.user?.office_type) {
                const officeType = this.permissions?.user?.office_type;
                return [8, 9, 10, 11, 35].includes(officeType);

            }
            if (this.permissions?.user?.committee_type_id) {
                const CommitteeType = this.permissions?.user?.committee_type_id;
                return [12, 13, 14, 15, 16].includes(CommitteeType);
            }
            return false;

        },
        isReadonlyUpazila() {
            if (this.permissions?.user?.office_type) {
                const officeType = this.permissions?.user?.office_type;
                return [8, 10, 11].includes(officeType);

            }
            if (this.permissions?.user?.committee_type_id) {
                const CommitteeType = this.permissions?.user?.committee_type_id;
                return [12, 14].includes(CommitteeType);
            }
            return false;

        },
        isReadonlySubLocation() {

            if (this.permissions?.user?.committee_type_id) {
                const CommitteeType = this.permissions?.user?.committee_type_id;
                return [12].includes(CommitteeType);
            }
            return false;

        },
        isReadonlyPouro() {
            if (this.permissions?.user?.committee_type_id) {
                const CommitteeType = this.permissions?.user?.committee_type_id;
                return [12].includes(CommitteeType);
            }
            return false;

        },
        isReadonlyUnion() {
            if (this.permissions?.user?.committee_type_id) {
                const CommitteeType = this.permissions?.user?.committee_type_id;
                return [12].includes(CommitteeType);
            }
            return false;

        },
        isReadonlyCity() {
            if (this.permissions?.user?.office_type) {
                const officeType = this.permissions?.user?.office_type;
                return [9].includes(officeType);

            }
            if (this.permissions?.user?.committee_type_id) {
                const CommitteeType = this.permissions?.user?.committee_type_id;
                return [15, 13].includes(CommitteeType);
            }
            return false;

        },
        isReadonlyDistPouro() {
            if (this.permissions?.user?.office_type) {
                const officeType = this.permissions?.user?.office_type;
                return [35].includes(officeType);

            }
            if (this.permissions?.user?.committee_type_id) {
                const CommitteeType = this.permissions?.user?.committee_type_id;
                return [16, 13].includes(CommitteeType);
            }
            return false;

        },
        // isReadonlyWard(){

        //     if (this.permissions?.user?.committee_type_id !== null) {
        //         const CommitteeType = this.permissions?.user?.committee_type_id;
        //         return [13,0].includes(CommitteeType);
        //     }
        //     return false;

        // },
        unselectedItem(item) {
            if (this.permissions?.user?.office_type !== null && this.permissions?.user?.committee_type_id == null) {
                return item.status !== 0;

            }
            if (this.permissions?.user?.committee_type_id !== null) {
                return item.status == 2 || item.status == 4;
            }
            return false;
        },
        SubmitForward() {
            this.forward.status = 1;
            console.log('Selected Items:', this.forward.applications_id);
            console.log('status:', this.forward.status);
            console.log('committee:', this.forward.committee_id);
            let fd = new FormData();
            for (const [key, value] of Object.entries(this.forward)) {

                if (value !== null) {
                    fd.append(key, value);
                    console.log(key, value, "fd values");
                    if (key == "applications_id") {
                        console.log(key, value, " values");
                        for (let i = 0; i < value.length; i++) {
                            fd.append("applications_id[" + i + "]", value[i]);
                            console.log(key, value, "applications values");
                        }
                    } else {
                        fd.append(key, value);
                    }

                }
            }

            this.$axios
                .post("admin/application/update-status", fd, {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((result) => {
                    this.forward = [];
                    this.forward.applications_id = [];
                    this.selectAll = false;
                    this.GetApplication();


                })
                .catch((err) => {


                });



        },
        SubmitApproved() {
            this.forward.status = 2;
            console.log('Selected Items:', this.forward.applications_id);
            console.log('status:', this.forward.status);
            console.log('committee:', this.forward.committee_id);
            let fd = new FormData();
            for (const [key, value] of Object.entries(this.forward)) {

                if (value !== null) {
                    fd.append(key, value);
                    console.log(key, value, "fd values");
                    if (key == "applications_id") {
                        console.log(key, value, " values");
                        for (let i = 0; i < value.length; i++) {
                            fd.append("applications_id[" + i + "]", value[i]);
                            console.log(key, value, "applications values");
                        }
                    } else {
                        fd.append(key, value);
                    }

                }
            }

            this.$axios
                .post("admin/application/update-status", fd, {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((result) => {

                    this.forward = [];
                    this.selectAll = false;
                    this.forward.applications_id = [];
                    this.GetApplication();


                })
                .catch((err) => {


                });


        },
        SubmitWaiting() {
            this.forward.status = 3;
            console.log('Selected Items:', this.forward.applications_id);
            console.log('status:', this.forward.status);
            console.log('committee:', this.forward.committee_id);
            let fd = new FormData();
            for (const [key, value] of Object.entries(this.forward)) {

                if (value !== null) {
                    fd.append(key, value);
                    console.log(key, value, "fd values");
                    if (key == "applications_id") {
                        console.log(key, value, " values");
                        for (let i = 0; i < value.length; i++) {
                            fd.append("applications_id[" + i + "]", value[i]);
                            console.log(key, value, "applications values");
                        }
                    } else {
                        fd.append(key, value);
                    }

                }
            }

            this.$axios
                .post("admin/application/update-status", fd, {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((result) => {

                    this.forward = [];
                    this.selectAll = false;
                    console.log(this.selectAll, "select_all");
                    this.forward.applications_id = [];
                    this.GetApplication();


                })
                .catch((err) => {


                });

        },
        SubmitReject() {
            this.forward.status = 4;
            console.log('Selected Items:', this.forward.applications_id);
            console.log('status:', this.forward.status);
            console.log('committee:', this.forward.committee_id);
            let fd = new FormData();
            for (const [key, value] of Object.entries(this.forward)) {

                if (value !== null) {
                    fd.append(key, value);
                    console.log(key, value, "fd values");
                    if (key == "applications_id") {
                        console.log(key, value, " values");
                        for (let i = 0; i < value.length; i++) {
                            fd.append("applications_id[" + i + "]", value[i]);
                            console.log(key, value, "applications values");
                        }
                    } else {
                        fd.append(key, value);
                    }

                }
            }

            this.$axios
                .post("admin/application/update-status", fd, {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((result) => {

                    this.forward = [];
                    this.forward.applications_id = [];
                    this.GetApplication();
                    this.selectAll = false;


                })
                .catch((err) => {


                });

        },
        resetForm() {



            this.data.division_id = null;
            this.data.district_id = null;
            this.data.thana_id = null;
            this.data.union_id = null;
            this.data.city_id = null;
            this.data.city_thana_id = null;
            this.data.district_pouro_id = null;
            this.data.pouro_id = null;
            this.data.ward_id = null;
            this.data.location_type = null;
            this.data.sub_location_type = null;
            this.data.application_id = null;
            this.data.nominee_name = null;
            this.data.account_no = null;
            this.data.nid_no = null;

            this.data.status_list = null;
            this.data.program_id = null;



            this.GetPermissions();
            this.GetApplication();

        },
        GetPermissions() {
            http().get('/admin/application/permissions', {

            }).then((result) => {
                this.permissions = result.data.data;
                if (this.permissions?.user?.office_type == 8 || this.permissions?.user?.office_type == 9 || this.permissions?.user?.office_type == 10 || this.permissions?.user?.office_type == 11 || this.permissions?.user?.office_type == 35) {
                    this.data.division_id = this.permissions?.user?.assign_location.parent?.parent?.id;
                    this.onChangeDivision(this.data.division_id);
                    this.data.district_id = this.permissions?.user?.assign_location.parent?.id;
                    this.data.location_type = this.permissions?.user?.assign_location?.location_type;
                    if (this.permissions?.user?.office_type == 8 || this.permissions?.user?.office_type == 10 || this.permissions?.user?.office_type == 11) {
                        this.onChangeDistrict(this.data.district_id);

                        this.data.thana_id = this.permissions?.user?.assign_location.id;


                    }
                    if (this.permissions?.user?.office_type == 9) {
                        this.onChangeDistrict(this.data.district_id);
                        this.LocationType(3);


                        this.data.city_id = this.permissions?.user?.assign_location.id;
                        this.onChangeCity(this.data.city_id);



                    }
                    if (this.permissions?.user?.office_type == 35) {
                        this.onChangeDistrict(this.data.district_id);

                        this.data.district_pouro_id = this.permissions?.user?.assign_location.id;
                        this.onChangeDistrictPouroGetWard(this.data.district_pouro_id);
                        console.log(this.wards, "wards in permission 35");

                    }

                }
                if (this.permissions?.user?.office_type == 6) {
                    this.data.division_id = this.permissions?.user?.assign_location?.id;
                    this.onChangeDivision(this.data.division_id);
                    console.log(this.wards, "wards in permission 6");
                }
                if (this.permissions?.user?.office_type == 7) {
                    this.data.division_id = this.permissions?.user?.assign_location?.parent?.id;
                    this.onChangeDivision(this.data.division_id);
                    this.data.district_id = this.permissions?.user?.assign_location?.id;
                    console.log(this.wards, "wards in permission 7");
                }
                //committee Logic
                if (this.permissions?.user?.committee_type_id == 15 || this.permissions?.user?.committee_type_id == 14 || this.permissions?.user?.committee_type_id == 16) {
                    this.data.division_id = this.permissions?.user?.assign_location.parent?.parent?.id;
                    this.onChangeDivision(this.data.division_id);
                    this.data.district_id = this.permissions?.user?.assign_location.parent?.id;
                    this.data.location_type = this.permissions?.user?.assign_location?.location_type;
                    console.log(this.data.division_id, this.data.district_id, "grpou");

                    if (this.permissions?.user?.committee_type_id == 15) {
                        this.onChangeDistrict(this.data.district_id);
                        this.data.city_id = this.permissions?.user?.assign_location.id;
                        this.onChangeCity(this.data.city_id);

                        console.log(this.data.ward_id, this.data.district_id, "individual 15");




                    }
                    if (this.permissions?.user?.committee_type_id == 14) {
                        this.onChangeDistrict(this.data.district_id);
                        this.data.thana_id = this.permissions?.user?.assign_location.id;
                        console.log(this.data.ward_id, this.data.district_id, "individual 14");




                    }
                    if (this.permissions?.user?.committee_type_id == 16) {
                        this.onChangeDistrict(this.data.district_id);
                        this.data.district_pouro_id = this.permissions?.user?.assign_location.id;
                        this.onChangeDistrictPouroGetWard(this.data.district_pouro_id);
                        console.log(this.data.ward_id, this.data.district_id, "individual 16");



                    }
                }
                if (this.permissions?.user?.committee_type_id == 12) {
                    this.data.division_id = this.permissions?.user?.assign_location.parent?.parent?.parent?.id;
                    this.onChangeDivision(this.data.division_id);
                    this.data.district_id = this.permissions?.user?.assign_location.parent?.parent?.id;
                    this.data.location_type = this.permissions?.user?.assign_location?.location_type;
                    console.log(this.data.location_type, "this.data.location_type  12");
                    this.onChangeDistrict(this.data.district_id);
                    this.data.thana_id = this.permissions?.user?.assign_location.parent?.id;
                    this.onChangeUpazila(this.data.thana_id);
                    console.log(this.data.division_id, this.data.district_id, "individual 12");
                    if (this.permissions?.user?.assign_location.type == "union") {
                        this.data.sub_location_type = 2
                        this.onChangeSubLocationType(this.data.sub_location_type);
                        this.data.union_id = this.permissions?.user?.assign_location.id;
                        this.onChangeUnionGetWard(this.data.union_id);

                    }
                    if (this.permissions?.user?.assign_location.type == "pouro") {
                        this.data.sub_location_type = 1
                        this.onChangeSubLocationType(this.data.sub_location_type);
                        this.data.pouro_id = this.permissions?.user?.assign_location.id;
                        this.onChangePouroGetWard(this.data.pouro_id);

                    }
                    console.log(this.data.ward_id, this.data.district_id, "individual 12");


                }
                if (this.permissions?.user?.committee_type_id == 13 && this.permissions?.user?.assign_location?.location_type == 3) {
                    this.data.division_id = this.permissions?.user?.assign_location.parent?.parent?.parent?.parent?.id;
                    this.onChangeDivision(this.data.division_id);
                    this.data.district_id = this.permissions?.user?.assign_location.parent?.parent?.parent?.id;
                    this.data.location_type = this.permissions?.user?.assign_location?.location_type;
                    this.onChangeDistrict(this.data.district_id);
                    this.data.city_id = this.permissions?.user?.assign_location.parent?.parent?.id;
                    this.onChangeCity(this.data.thana_id);
                    this.data.city_thana_id = this.permissions?.user?.assign_location.parent?.id;
                    this.onChangeThanaGetWard(this.data.city_thana_id);




                    this.data.ward_id = this.permissions?.user?.assign_location.id;
                    console.log(this.data.ward_id, this.data.ward_id, "individual 13 3");

                    console.log(this.wards, "wards in permission committee 13 3");

                }
                if (this.permissions?.user?.committee_type_id == 13 && this.permissions?.user?.assign_location?.location_type == 1) {
                    this.data.division_id = this.permissions?.user?.assign_location.parent?.parent?.parent?.id;
                    this.onChangeDivision(this.data.division_id);
                    this.data.district_id = this.permissions?.user?.assign_location.parent?.parent?.id;
                    this.data.location_type = this.permissions?.user?.assign_location?.location_type;
                    this.onChangeDistrict(this.data.district_id);
                    this.data.district_pouro_id = this.permissions?.user?.assign_location.parent?.id;
                    this.onChangeDistrictPouroGetWard(this.data.district_pouro_id);
                    this.data.ward_id = this.permissions?.user?.assign_location.id;

                    console.log(this.data.ward_id, this.data.ward_id, "individual 13 1");
                    console.log(this.wards, "wards in permission committee 13 1");

                }

                if (this.permissions?.user?.committee_type_id == 17) {
                    this.data.division_id = this.permissions?.user?.assign_location?.parent?.id;
                    this.onChangeDivision(this.data.division_id);
                    this.data.district_id = this.permissions?.user?.assign_location?.id;
                    console.log(this.data.ward_id, this.data.district_id, "individual 17");
                }
                console.log(this.cities, " this.cities");
                console.log(this.data.ward_id, "ward_final");
                console.log(this.permissions, "permi");
                console.log(this.data, "data");
                console.log(this.wards, "wards_final");

            }).catch((err) => {
                console.log(err);
            })


        },
        // getNestedValue(propertyName) {
        //     const keys = propertyName.split('.');
        //     let value = this;

        //     for (const key of keys) {
        //         value = value[key];

        //         if (value === undefined || value === null) {
        //             break;
        //         }
        //     }

        //     return value;
        // },

        appendIconCallback() {
            // Handle the click event for the custom append icon here

        },
        appendIcon() {
            return 'mdi-plus'; // Use the appropriate Material Design Icons (MDI) class for the "+" icon
        },
        toggleFieldVisibility() {
            this.isFieldVisible = !this.isFieldVisible;
        },
        ...mapActions({
            GetAllDivisions: "Division/GetAllDivisions",



        }),
        updateVisibleColumns() {
            // Triggered when the selected columns change
            // Update the visibleHeaders based on the selected columns
            this.visibleHeaders = this.headers.filter(column => this.selectedColumns.includes(column.value));
            console.log(this.selectedColumns);
        },
        GetAllowance() {
            http().get('/global/program', {

            }).then((result) => {


                this.allowances = result.data.data;
            }).catch((err) => {
                console.log(err);
            })
        },
        GetCommitte() {
            http().get('/admin/application/committee-list', {

            }).then((result) => {


                this.committe = result.data;
                console.log(this.committe, "called properly")
            }).catch((err) => {
                console.log(err);
            })
        },

        async LocationType($event) {

            this.wards = [];
            if ($event === 1 || $event === 3) {
                this.data.sub_location_type = null;
            }


            if (this.data.district_id != null && this.data.location_type != null) {
                if ($event === 2) {
                    await this.$axios
                        .get(`/global/thana/get/${this.data.district_id}`, {
                            headers: {
                                Authorization: "Bearer " + this.$store.state.token,
                                "Content-Type": "multipart/form-data",
                            },
                        })
                        .then((result) => {
                            this.thanas = result.data.data;
                            //emu
                            // this.wards = [];
                            // this.data.ward_id = null;
                            this.cities = [];
                            this.district_poros = [];

                            this.data.city_id = null;
                            this.data.city_thana_id = null;
                            this.data.district_pouro_id = null;
                            //emu
                            // this.wards = [];
                            // this.ward_id = null;



                        });
                }
                if ($event === 3) {

                    await this.$axios
                        .get("/global/city/get/" + this.data.district_id + "/" + $event, {
                            headers: {
                                Authorization: "Bearer " + this.$store.state.token,
                                "Content-Type": "multipart/form-data",
                            },
                        })
                        .then((result) => {
                            this.cities = result.data.data;
                            //emu
                            // this.wards = [];
                            // this.data.ward_id = null;
                            this.thanas = [];
                            this.district_poros = [];
                            this.data.thana_id = null;
                            this.data.union_id = null;
                            this.data.district_pouro_id = null;
                            this.data.pouro_id = null;
                            //emu
                            // this.wards = [];
                            // this.ward_id = null;

                        });
                }
                if ($event === 1) {

                    await this.$axios
                        .get("/global/city/get/" + this.data.district_id + "/" + $event, {
                            headers: {
                                Authorization: "Bearer " + this.$store.state.token,
                                "Content-Type": "multipart/form-data",
                            },
                        })
                        .then((result) => {
                            this.district_poros = result.data.data;
                            //emu
                            // this.wards = [];
                            this.data.ward_id = null;
                            this.cities = [];
                            this.thanas = [];
                            this.thana_id = null;
                            this.union_id = null;
                            this.city_id = null;
                            this.city_thana_id = null;
                            this.pouro_id = null;


                        });
                }
            }
        },
        async onChangeSubLocationType(event) {
            // alert(event);
            this.data.ward_id = null;

            if (event == 1) {
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
        async onChangeUpazila(event) {
            if (this.data.sub_location_type == 1) {
                this.onChangeSubLocationType(1);
            } else {
                await this.$axios
                    .get(`/global/union/get/${this.data.thana_id}`, {
                        headers: {
                            Authorization: "Bearer " + this.$store.state.token,
                            "Content-Type": "multipart/form-data",
                        },
                    })
                    .then((result) => {
                        this.unions = result.data.data;
                    });
            }
        },


        async onChangeDivision(event) {
            await this.$axios
                .get(`/global/district/get/${event}`, {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((result) => {
                    this.districts = result.data.data;
                });
        },
        async onChangeDistrict(event) {
            await this.$axios
                .get(`/global/thana/get/${event}`, {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((result) => {
                    this.LocationType(this.data.location_type);
                    this.thanas = result.data.data;
                });
        },
        async onChangeThana(event) {
            await this.$axios
                .get(`/global/union/get/${event}`, {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((result) => {
                    this.unions = result.data.data;
                });
        },
        async onChangeCity(event) {
            await this.$axios
                .get(`/global/thana/get/city/${this.data.city_id}`, {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((result) => {
                    this.city_thanas = result.data.data;
                });
        },
        async onChangeUnionGetWard(event) {
            //emu
            // this.wards = [];
            // this.data.ward_id = null;
            await this.$axios
                .get(`/global/ward/get/${event}`, {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((result) => {
                    this.wards = result.data.data;
                });
        },
        async onChangePouroGetWard(event) {
            //emu
            // this.wards = [];
            // this.data.ward_id = null;
            await this.$axios
                .get(`/global/ward/get/pouro/${event}`, {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((result) => {
                    this.wards = result.data.data;
                });
        },


        async onChangeDistrictPouroGetWard(event) {
            //emu
            // this.wards = [];
            // this.data.ward_id = null;
            await this.$axios
                .get(`/global/ward/get/pouro/${this.data.district_pouro_id}`, {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((result) => {
                    this.wards = result.data.data;
                    console.log(this.wards, "wards in function dist");
                    console.log(this.data.ward_id, "ward");
                });
        },
        async onChangeThanaGetWard(event) {
            //emu
            // this.wards = [];
            // this.data.ward_id = null;
            await this.$axios
                .get(`/global/ward/get/thana/${event}`, {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((result) => {
                    this.wards = result.data.data;
                    console.log(this.wards, "thanawards")

                });
        },

        onPageChange($event) {
            // this.pagination.current = $event;
            this.GetApplication();
        },

        async GetApplication() {
            const queryParams = {
                searchText: this.search,
                application_id: this.data.application_id,
                nominee_name: this.data.nominee_name,
                account_no: this.data.account_no,
                status: this.data.status,
                program_id: this.data.program_id,
                nid_no: this.data.nid_no,
                division_id: this.data.division_id,
                district_id: this.data.district_id,
                location_type_id: this.data.location_type,
                thana_id: this.data.thana_id,
                union_id: this.data.union_id,
                city_id: this.data.city_id,
                city_thana_id: this.data.city_thana_id,
                district_pouro_id: this.data.district_pouro_id,
                pouro_id: this.data.pouro_id,
                sub_location_type: this.data.sub_location_type,
                ward_id: this.data.ward_id,
                status: this.data.status_list,
                perPage: this.pagination.perPage,
                page: this.pagination.current,
            };
            this.$axios
                .get("/admin/application/get", {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                    params: queryParams,
                })
                .then((result) => {

                    this.applications = result.data.data;
                    this.total = result.data.total;
                    this.pagination.current = result.data.current_page;
                    this.pagination.total = result.data.last_page;
                    this.pagination.grand_total = result.data.total;
                });


        },
            async GeneratePDF() {
            const queryParams = {
                selectedColumns: this.selectedColumns,
                searchText: this.search,
                application_id: this.data.application_id,
                nominee_name: this.data.nominee_name,
                account_no: this.data.account_no,
                status: this.data.status,
                program_id: this.data.program_id,
                nid_no: this.data.nid_no,
                division_id: this.data.division_id,
                district_id: this.data.district_id,
                location_type_id: this.data.location_type,
                thana_id: this.data.thana_id,
                union_id: this.data.union_id,
                city_id: this.data.city_id,
                city_thana_id: this.data.city_thana_id,
                district_pouro_id: this.data.district_pouro_id,
                pouro_id: this.data.pouro_id,
                sub_location_type: this.data.sub_location_type,
                ward_id: this.data.ward_id,
                status: this.data.status_list,
               
            };
            this.$axios
                .get("/admin/application/generate-pdf", {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                    params: queryParams,
                })
                .then((result) => {
                    window.open(result.data.data.url, '_blank');
               })
                .catch(error => {
                    console.error('Error generating PDF:', error);
                });


        },
        submitsearch() {
            this.GetApplication();


        },

        updateHeaderTitle() {
            const title = this.$t(
                "container.application_selection.application.list"
            );
            this.$store.commit("setHeaderTitle", title);
        },
    },
    watch: {
        "$i18n.locale": "updateHeaderTitle",

    },
    created() {
        this.GetAllDivisions();

        this.GetCommitte()




    },
    beforeMount() {

        this.updateHeaderTitle();
        this.GetPermissions();



        // if (this.userData?.location?.type == "division") {
        //     this.data.division_id = this.userData.location.id;
        //     this.data.location_type = this.userData.location.location_type;
        //     this.onChangeDivision(this.data.division_id)


        // }
        // if (this.userData?.location?.parent_location?.type == "division") {
        //     this.data.division_id = this.userData.location.parent_location.id;
        //     this.data.district_id = this.userData.location.id;
        //     this.data.location_type = this.userData.location.location_type;
        //     this.onChangeDivision(this.data.division_id)
        //     this.onChangeDistrict(this.data.district_id)

        // }
        // if (this.userData?.location?.parent_location?.parent_location?.type == "division") {
        //     this.data.division_id = this.userData.location.parent_location.parent_location.id;
        //     this.data.district_id = this.userData.location.parent_location.id;
        //     this.data.location_type = this.userData.location.location_type;
        //     this.onChangeDivision(this.data.division_id)
        //     this.onChangeDistrict(this.data.district_id)

        // }

        this.GetApplication();





    },
    mounted() {

        this.GetAllowance();

        // this.$store
        //     .dispatch("getLookupByType", 1)
        //     .then((res) => (this.locationType = res));
               this.$store
            .dispatch("getGlobalLookupByType", 1)
            .then((res) => (this.locationType = res));
    }
};
</script>
<style >
.no-arrow-icon .v-input__icon--clear {
    display: none;

}

.v-input__icon--append .v-icon {
    color: purple;
    font-weight: bold;
}

.no-arrow-icon .v-input__icon--append {
    font-weight: bold;

}
</style>
