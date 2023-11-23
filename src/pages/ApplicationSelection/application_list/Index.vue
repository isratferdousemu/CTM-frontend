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

                                                    <v-autocomplete outlined  clearable
                                                        class="no-arrow-icon" v-model="data.program_id"
                                                        :append-icon-cb="appendIconCallback" append-icon="mdi-plus"
                                                        :items="allowances" item-text="name_en" item-value="id"
                                                        :label="$t('container.application_selection.application.program')">
                                                    </v-autocomplete>
                                                </v-col>
                                                <v-col lg="3" md="3" cols="12">
                                                    <ValidationProvider name="Location Type" vid="location_type"
                                                        v-slot="{ errors }">
                                                        <v-autocomplete @input="LocationType($event)"
                                                        :readonly="userData.office !== null && userData.office.office_type === 8 || userData.office !== null && userData.office.office_type === 9|| userData.office !== null && userData.office.office_type === 10"
                                                            v-model="data.location_type" class="no-arrow-icon"
                                                            :append-icon-cb="appendIconCallback" append-icon="mdi-plus"
                                                            :hide-details="errors[0] ? false : true" outlined
                                                            :label="$t('container.list.location_type')"
                                                            :items="locationType" item-text="value_en" item-value="id"
                                                            :error="errors[0] ? true : false"
                                                            :error-messages="errors[0]"></v-autocomplete>

                                                    </ValidationProvider>
                                                </v-col>
                                                <v-col lg="3" md="3" cols="12">
                                                    <ValidationProvider name="Division" vid="division" v-slot="{ errors }">
                                                        <v-autocomplete :readonly="data.division_id !== null"
                                                            :hide-details="errors[0] ? false : true"
                                                            @input="onChangeDivision($event)" v-model="data.division_id"
                                                            outlined :label="$t(
                                                                'container.system_config.demo_graphic.division.division'
                                                            )
                                                                " :items="divisions" item-text="name_en"
                                                            item-value="id" :error="errors[0] ? true : false"
                                                            :error-messages="errors[0]" class="no-arrow-icon"
                                                            :append-icon-cb="appendIconCallback"
                                                            append-icon="mdi-plus"></v-autocomplete>
                                                    </ValidationProvider>
                                                </v-col>
                                                <v-col lg="3" md="3" cols="12">
                                                    <ValidationProvider name="District" vid="district" v-slot="{ errors }">
                                                        <v-autocomplete :readonly="userData.location !== null"
                                                            :hide-details="errors[0] ? false : true" outlined
                                                            v-model="data.district_id" @input="onChangeDistrict($event)"
                                                            :label="$t(
                                                                'container.system_config.demo_graphic.district.district'
                                                            )
                                                                " :items="districts" item-text="name_en"
                                                            item-value="id" :error="errors[0] ? true : false"
                                                            :error-messages="errors[0]" class="no-arrow-icon"
                                                            :append-icon-cb="appendIconCallback"
                                                            append-icon="mdi-plus"></v-autocomplete>
                                                    </ValidationProvider>
                                                </v-col>
                                                <v-col v-if="data.location_type == 2" lg="3" md="3" cols="12">
                                                    <ValidationProvider name="Upazila" vid="thana_id" v-slot="{ errors }">
                                                        <v-autocomplete :hide-details="errors[0] ? false : true"
                                                            v-model="data.thana_id" outlined :label="$t('container.system_config.demo_graphic.ward.upazila')
                                                                " @change="onChangeUpazila($event)" :items="thanas"
                                                            item-text="name_en" item-value="id"
                                                            :error="errors[0] ? true : false" :error-messages="errors[0]"
                                                            class="no-arrow-icon" :append-icon-cb="appendIconCallback"
                                                            append-icon="mdi-plus"></v-autocomplete>
                                                    </ValidationProvider>
                                                </v-col>
                                                <v-col v-if="data.location_type == 2" lg="3" md="3" cols="12">
                                                    <ValidationProvider name="subLocationType" vid="subLocationType"
                                                        v-slot="{ errors }">
                                                        <v-autocomplete @input="onChangeSubLocationType($event)"
                                                            v-model="data.sub_location_type" outlined :label="$t(
                                                                'container.system_config.demo_graphic.ward.subLocation_type'
                                                            )
                                                                " :items="subLocationType" item-text="value_en"
                                                            item-value="id" :error="errors[0] ? true : false"
                                                            :error-messages="errors[0]"
                                                            :hide-details="errors[0] ? false : true" :readonly="false"
                                                            class="no-arrow-icon" :append-icon-cb="appendIconCallback"
                                                            append-icon="mdi-plus"></v-autocomplete>
                                                    </ValidationProvider>
                                                </v-col>

                                                <v-col v-if="data.location_type == 2 && data.sub_location_type == 1" lg="3"
                                                    md="3" cols="12">
                                                    <ValidationProvider name="pouros" vid="pouros" v-slot="{ errors }">
                                                        <v-autocomplete v-model="data.pouro_id" outlined :label="$t(
                                                            'container.system_config.demo_graphic.ward.pouro'
                                                        )
                                                            " :items="pouros" item-text="name_en" item-value="id"
                                                            :error="errors[0] ? true : false" :error-messages="errors[0]"
                                                            :hide-details="errors[0] ? false : true" :readonly="false"
                                                            class="no-arrow-icon" :append-icon-cb="appendIconCallback"
                                                            append-icon="mdi-plus"></v-autocomplete>
                                                    </ValidationProvider>
                                                </v-col>

                                                <v-col v-if="data.sub_location_type == 2 && data.location_type == 2" lg="3"
                                                    md="3" cols="12">
                                                    <ValidationProvider name="unions" vid="unions" v-slot="{ errors }">
                                                        <v-autocomplete @input="onChangeUnionGetWard($event)"
                                                            v-model="data.union_id" outlined :label="$t(
                                                                'container.system_config.demo_graphic.ward.union'
                                                            )
                                                                " :items="unions" item-text="name_en" item-value="id"
                                                            :error="errors[0] ? true : false" :error-messages="errors[0]"
                                                            :hide-details="errors[0] ? false : true" :readonly="false"
                                                            class="no-arrow-icon" :append-icon-cb="appendIconCallback"
                                                            append-icon="mdi-plus"></v-autocomplete>
                                                    </ValidationProvider>
                                                </v-col>


                                                <v-col v-if="data.location_type == 3" lg="3" md="3" cols="12">
                                                    <ValidationProvider name="city" vid="city_id" v-slot="{ errors }">
                                                        <v-autocomplete :hide-details="errors[0] ? false : true"
                                                            v-model="data.city_id" @change="onChangeCity($event)" outlined
                                                            :label="$t('container.system_config.demo_graphic.ward.city')
                                                                " :items="cities" item-text="name_en" item-value="id"
                                                            :error="errors[0] ? true : false" :error-messages="errors[0]"
                                                            class="no-arrow-icon" :append-icon-cb="appendIconCallback"
                                                            append-icon="mdi-plus"></v-autocomplete>
                                                    </ValidationProvider>
                                                </v-col>
                                                <v-col v-if="data.location_type == 3" lg="3" md="3" cols="12">
                                                    <ValidationProvider name="thana" vid="city_thana_id"
                                                        v-slot="{ errors }">
                                                        <v-autocomplete @input="onChangeThanaGetWard($event)"
                                                            :hide-details="errors[0] ? false : true"
                                                            v-model="data.city_thana_id" outlined :label="$t('container.system_config.demo_graphic.ward.thana')
                                                                " :items="city_thanas" item-text="name_en"
                                                            item-value="id" :error="errors[0] ? true : false"
                                                            :error-messages="errors[0]" class="no-arrow-icon"
                                                            :append-icon-cb="appendIconCallback"
                                                            append-icon="mdi-plus"></v-autocomplete>
                                                    </ValidationProvider>
                                                </v-col>
                                                <v-col v-if="data.location_type == 1" lg="3" md="3" cols="12">
                                                    <ValidationProvider name="thana" vid="district_pouro_id"
                                                        v-slot="{ errors }">
                                                        <v-autocomplete @input="onChangeDistrictPouroGetWard($event)"
                                                            :hide-details="errors[0] ? false : true"
                                                            v-model="data.district_pouro_id" outlined :label="$t('container.system_config.demo_graphic.ward.pouro')
                                                                " :items="district_poros" item-text="name_en"
                                                            item-value="id" :error="errors[0] ? true : false"
                                                            :error-messages="errors[0]" class="no-arrow-icon"
                                                            :append-icon-cb="appendIconCallback"
                                                            append-icon="mdi-plus"></v-autocomplete>
                                                    </ValidationProvider>
                                                </v-col>
                                                <v-col v-if="data.location_type" lg="3" md="3" cols="12">
                                                    <ValidationProvider name="Ward" vid="ward_id" v-slot="{ errors }">
                                                        <v-autocomplete :hide-details="errors[0] ? false : true"
                                                            v-model="data.ward_id" outlined :label="$t('container.system_config.demo_graphic.ward.ward')
                                                                " :items="wards" item-text="name_en"
                                                            item-value="id" :error="errors[0] ? true : false"
                                                            :error-messages="errors[0]" class="no-arrow-icon"
                                                            :append-icon-cb="appendIconCallback"
                                                            append-icon="mdi-plus"></v-autocomplete>
                                                    </ValidationProvider>
                                                </v-col>


                                                <!-- purano start -->
                                                <!-- 
                                                <v-col lg="3" md="3" cols="12">
                                                    <ValidationProvider name="Division" vid="division" rules="required"
                                                        v-slot="{ errors }">
                                                        <v-autocomplete outlined clearable @input="onChangeDivision($event)"
                                                            :append-icon-cb="appendIconCallback" append-icon="mdi-plus"
                                                            v-model="data.division_id" :label="$t(
                                                                'container.system_config.demo_graphic.division.division'
                                                            )
                                                                " :items="divisions" item-text="name_en"
                                                            item-value="id" required :error="errors[0] ? true : false"
                                                            :error-messages="errors[0]">
                                                        </v-autocomplete>
                                                    </ValidationProvider>
                                                </v-col>
                                                <v-col lg="3" md="3" cols="12">
                                                    <ValidationProvider name="District" vid="district" rules="required"
                                                        v-slot="{ errors }">
                                                        <v-autocomplete outlined :append-icon-cb="appendIconCallback"
                                                            append-icon="mdi-plus" v-model="data.district_id"
                                                            @input="onChangeDistrict($event)" :label="$t(
                                                                'container.system_config.demo_graphic.district.district'
                                                            )
                                                                " :items="districts" item-text="name_en"
                                                            item-value="id" required :error="errors[0] ? true : false"
                                                            :error-messages="errors[0]"></v-autocomplete>
                                                    </ValidationProvider>
                                                </v-col>
                                                <v-col lg="3" md="3" cols="12">
                                                    <ValidationProvider name="Location Type" vid="location_type"
                                                        rules="required" v-slot="{ errors }">
                                                        <v-autocomplete :append-icon-cb="appendIconCallback"
                                                            append-icon="mdi-plus" @input="LocationType($event)"
                                                            v-model="data.location_type" outlined
                                                            :label="$t('container.list.location_type')"
                                                            :items="locationType" item-text="value_en" item-value="id"
                                                            required :error="errors[0] ? true : false"
                                                            :error-messages="errors[0]"></v-autocomplete>
                                                    </ValidationProvider>
                                                </v-col>
                                                <v-col v-if="data.location_type == 1" lg="3" md="3" cols="12">
                                                    <ValidationProvider name="thana" vid="district_pouro_id"
                                                        rules="required" v-slot="{ errors }">
                                                        <v-autocomplete :append-icon="appendIcon"
                                                            :append-icon-cb="appendIconCallback"
                                                            prepend-inner-icon="mdi-plus" v-model="data.district_pouro_id"
                                                            outlined :label="$t('container.system_config.demo_graphic.ward.pouro')
                                                                " :items="district_pouros" item-text="name_en"
                                                            item-value="id" required :error="errors[0] ? true : false"
                                                            :error-messages="errors[0]"></v-autocomplete>
                                                    </ValidationProvider>
                                                </v-col>
                                                <v-col v-if="data.location_type == 2" lg="3" md="3" cols="12">
                                                    <ValidationProvider name="Upazila" vid="thana_id" rules="required"
                                                        v-slot="{ errors }">
                                                        <v-autocomplete :append-icon="appendIcon"
                                                            :append-icon-cb="appendIconCallback"
                                                            prepend-inner-icon="mdi-plus" v-model="data.thana_id" outlined
                                                            :label="$t('container.system_config.demo_graphic.thana.thana')
                                                                " @change="onChangeUpazila($event)" :items="thanas"
                                                            item-text="name_en" item-value="id" required
                                                            :error="errors[0] ? true : false"
                                                            :error-messages="errors[0]"></v-autocomplete>
                                                    </ValidationProvider>
                                                </v-col>
                                                <v-col v-if="data.location_type == 2" lg="3" md="3" cols="12">
                                                    <ValidationProvider name="union" vid="union_id" rules="required"
                                                        v-slot="{ errors }">
                                                        <v-autocomplete :append-icon="appendIcon"
                                                            :append-icon-cb="appendIconCallback"
                                                            prepend-inner-icon="mdi-plus" v-model="data.union_id" outlined
                                                            :label="$t('container.system_config.demo_graphic.ward.union')
                                                                " :items="unions" item-text="name_en" item-value="id"
                                                            required :error="errors[0] ? true : false"
                                                            :error-messages="errors[0]"></v-autocomplete>
                                                    </ValidationProvider>
                                                </v-col>

                                                <v-col v-if="data.location_type == 3" lg="3" md="3" cols="12">
                                                    <ValidationProvider name="city" vid="city_id" rules="required"
                                                        v-slot="{ errors }">
                                                        <v-autocomplete :append-icon="appendIcon"
                                                            :append-icon-cb="appendIconCallback"
                                                            prepend-inner-icon="mdi-plus" v-model="data.city_id"
                                                            @change="onChangeCity($event)" outlined :label="$t('container.system_config.demo_graphic.ward.city')
                                                                " :items="cities" item-text="name_en" item-value="id"
                                                            required :error="errors[0] ? true : false"
                                                            :error-messages="errors[0]"></v-autocomplete>
                                                    </ValidationProvider>
                                                </v-col>

                                                <v-col v-if="data.location_type == 3" lg="3" md="3" cols="12">
                                                    <ValidationProvider name="thana" vid="city_thana_id" rules="required"
                                                        v-slot="{ errors }">
                                                        <v-autocomplete :append-icon="appendIcon"
                                                            :append-icon-cb="appendIconCallback"
                                                            prepend-inner-icon="mdi-plus" v-model="data.city_thana_id"
                                                            outlined :label="$t('container.system_config.demo_graphic.ward.thana')
                                                                " :items="city_thanas" item-text="name_en"
                                                            item-value="id" required :error="errors[0] ? true : false"
                                                            :error-messages="errors[0]"></v-autocomplete>
                                                    </ValidationProvider>
                                                </v-col> -->


                                            </v-row>
                                            <v-row>
                                                <v-btn elevation="2" class="btn ml-3 mt-3" color="blue"
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
                                                    <v-select v-model="list_type_id" outlined clearable
                                                        append-icon="mdi-plus" :append-icon-cb="appendIconCallback"
                                                        :label="$t('container.application_selection.application.list_type')">
                                                    </v-select>
                                                </v-col>
                                            </v-row>

                                            <div class="d-inline d-flex justify-end ">
                                                <v-btn elevation="2" type="submit" class="btn mr-2" color="success">{{
                                                    $t("container.list.search") }}</v-btn>
                                                <v-btn elevation="2" class="btn">{{ $t("container.list.reset") }}</v-btn>
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
                                                :label="$t('container.application_selection.application.remark')">

                                            </v-text-field>
                                        </v-col>
                                        <v-col lg="6" md="6" cols="12">
                                            <v-select outlined clearable>
                                                <template v-slot:label>
                                                    <label> {{
                                                        $t("container.application_selection.application.forward_to_committee")
                                                    }}</label>
                                                    <span style="margin-left: 4px; color: red">*</span>
                                                </template>

                                            </v-select>
                                        </v-col>
                                    </v-row>
                                    <div class="d-inline d-flex justify-end ">
                                        <v-btn elevation="2" class="btn mr-2" color="success">{{
                                            $t("container.list.approve") }}</v-btn>
                                        <v-btn elevation="2" class="btn mr-2" color="success">{{
                                            $t("container.list.forward") }}</v-btn>
                                        <v-btn elevation="2" class="btn mr-2" color="warning">{{
                                            $t("container.list.waiting") }}</v-btn>
                                        <v-btn elevation="2" class="btn mr-2 error">{{ $t("container.list.reject")
                                        }}</v-btn>
                                    </div>

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
                                <v-row justify="end">

                                    <v-col lg="3" md="3" cols="12">

                                        <!-- selected columns -->
                                        <v-select v-model="selectedColumns" :items="selectableColumns"
                                            :label="$t('container.application_selection.application.select_column')"
                                            multiple v-on:change="updateVisibleColumns" outlined menu-props="top">
                                            <template v-slot:selection="{ item, index }">

                                            </template>

                                        </v-select>
                                        <!-- Select column End -->

                                    </v-col>
                                </v-row>
                                <v-row class="ma-0  white round-border d-flex justify-space-between align-center"
                                    justify="center" justify-lg="space-between">

                                    <v-col cols="12">

   
                                        <v-data-table :headers="visibleHeaders" :items="applications" :loading="loading"
                                            item-key="id" :items-per-page="pagination.perPage" hide-default-footer
                                            class="elevation-0 transparent row-pointer">
                                            <template v-slot:item.sl="{ item, index }">
                                                {{
                                                    (pagination.current - 1) * pagination.perPage +
                                                    index +
                                                    1
                                                }}
                                            </template>
                                            <template v-slot:item.division="{ item }">
                                                <span v-if="item?.permanent_location.location_type == '1'">
                                                    {{ item?.permanent_location?.parent?.parent?.name_en }}
                                                </span>

                                                <span
                                                    v-if="item?.permanent_location.location_type == '2' || item?.permanent_location.location_type == '3'">
                                                    {{ item?.permanent_location.parent?.parent?.parent?.parent.name_en }}
                                                </span>

                                                <span v-if="item?.permanent_location?.type == 'union' ||
                                                    item?.parent?.type == 'thana'
                                                    ">
                                                    {{ item?.permanent_location?.parent?.parent?.parent?.name_en }}
                                                </span>
                                            </template>
                                            <template v-slot:item.district="{ item }">
                                                <span v-if="item?.permanent_location.location_type == '1'">
                                                    {{ item?.permanent_location?.parent?.name_en }}
                                                </span>

                                                <span
                                                    v-if="item?.permanent_location.location_type == '2' || item?.permanent_location.location_type == '3'">
                                                    {{ item?.permanent_location.parent?.parent?.parent.name_en }}
                                                </span>

                                                <span v-if="item?.permanent_location?.type == 'union' ||
                                                    item?.parent?.type == 'thana' || item?.parent?.type == 'pourashava'
                                                    ">
                                                 {{ item?.permanent_location?.parent?.parent?.name_en }}
                                                </span>
                                            </template>

                                            <!-- Action Button -->
                                            <template v-slot:item.actions="{ item }">
                                      
                                                     <v-tooltip top>
                                                        <template v-slot:activator="{ on }">
                                                            <v-btn fab x-small v-on="on" color="#AFB42B"
                                                                router
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
                list_type_id: null,
                program_id: null
            },
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

            selectedColumns: ['name_en', 'program.name_en', 'application_id'],  // Initially, first 6 columns are selected

            fixedColumns: ['sl', 'actions'],  // Two columns that will always remain visible


        };
    },
    components: {
        ValidationProvider,
        ValidationObserver,
    },
    computed: {
     isReadonly() {
            const officeType = this.userData.office.office_type;
            return [8, 9, 10].includes(officeType);
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
        getNestedValue(propertyName) {
            const keys = propertyName.split('.');
            let value = this;

            for (const key of keys) {
                value = value[key];

                if (value === undefined || value === null) {
                    break;
                }
            }

            return value;
        },

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
        },
        GetAllowance() {
            http().get('/admin/allowance/get', {

            }).then((result) => {


                this.allowances = result.data.data;
            }).catch((err) => {
                console.log(err);
            })
        },

        async LocationType($event) {


            if ($event === 1 || $event === 3) {
                this.data.sub_location_type = null;
            }


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
                            this.wards = [];
                            this.data.ward_id = null;
                            this.cities = [];
                            this.district_poros = [];

                            this.data.city_id = null;
                            this.data.city_thana_id = null;
                            this.data.district_pouro_id = null;
                            this.wards = [];
                            this.ward_id = null;



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
                            this.wards = [];
                            this.data.ward_id = null;
                            this.thanas = [];
                            this.district_poros = [];
                            this.data.thana_id = null;
                            this.data.union_id = null;
                            this.data.district_pouro_id = null;
                            this.data.pouro_id = null;
                            this.wards = [];
                            this.ward_id = null;

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
                            this.wards = [];
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

            if (event == 1) {
                await this.$axios
                    .get(`/admin/union/pouro/get/${this.data.thana_id}`, {
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
                    .get(`/admin/union/get/${this.data.thana_id}`, {
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
                .get(`/admin/district/get/${event}`, {
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
                .get(`/admin/thana/get/${event}`, {
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
                .get(`/admin/union/get/${event}`, {
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
                .get(`/admin/thana/get/city/${this.data.city_id}`, {
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
            this.wards = [];
            this.data.ward_id = null;
            await this.$axios
                .get(`/admin/ward/get/${event}`, {
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
            this.wards = [];
            this.data.ward_id = null;
            await this.$axios
                .get(`/admin/ward/get/pouro/${event}`, {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((result) => {
                    this.wards = result.data.data;
                });
        },
        async onChangeThanaGetWard(event) {
            this.wards = [];
            this.data.ward_id = null;
            await this.$axios
                .get(`/admin/ward/get/thana/${event}`, {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((result) => {
                    this.wards = result.data.data;
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
                list_type_id: this.data.list_type_id,
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
                // pouro_id: this.data.pouro_id,
                ward_id: this.data.ward_id,
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
                    this.pagination.current = result.data.current_page;
                    this.pagination.total = result.data.last_page;
                    this.pagination.grand_total = result.data.total;
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




    },
    beforeMount() {

        this.updateHeaderTitle();
        this.GetAllDivisions();

        if (this.userData?.location?.type == "division") {
            this.data.division_id = this.userData.location.id;
            this.data.location_type = this.userData.location.location_type;
            this.onChangeDivision(this.data.division_id)
            

        }
        if (this.userData?.location?.parent_location?.type == "division") {
            this.data.division_id = this.userData.location.parent_location.id;
            this.data.district_id = this.userData.location.id;
            this.data.location_type = this.userData.location.location_type;
            this.onChangeDivision(this.data.division_id)
            this.onChangeDistrict(this.data.district_id)

        }
        if (this.userData?.location?.parent_location?.parent_location?.type == "division") {
            this.data.division_id = this.userData.location.parent_location.parent_location.id;
            this.data.district_id = this.userData.location.parent_location.id;
            this.data.location_type = this.userData.location.location_type;
            this.onChangeDivision(this.data.division_id)
            this.onChangeDistrict(this.data.district_id)

        }

        this.GetApplication();





    },
    mounted() {

        this.GetAllowance();

        this.$store
            .dispatch("getLookupByType", 1)
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
