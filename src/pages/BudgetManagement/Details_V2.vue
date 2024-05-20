<template>
    <div id="application_view">
        <v-row class="mx-5 my-5 mt-5">
            <v-col class="mt-5" cols="12">
                <ValidationObserver ref="form" v-slot="{ invalid }">
                    <form @submit.prevent="submitApplication()">
                        <v-card class="pa-5 px-10 mb-4">
                            <div>
                                <!-- Budget Information -->
                                <v-card class="mt-5">
                                    <v-card-title style="background-color: #1976d2; color: white">
                                        {{ $t("container.budget_management.budget_basic_info") }}
                                    </v-card-title>

                                    <v-card-text class="mt-5">
                                        <v-row>
                                            <v-col cols="6" lg="6">
                                                <v-row>
                                                    <v-col cols="4" lg="4">
                                                        <label>
                                                            {{
                                                                $t(
                                                                    "container.budget_management.program"
                                                                )
                                                            }}
                                                        </label></v-col>
                                                    <v-col cols="8" lg="8">
                                                        :<template>
                                                            <span style="20px">
                                                                {{ beneficiary?.program.name_en }}
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
                                                                    "container.budget_management.financial_year"
                                                                )
                                                            }}
                                                        </label>
                                                    </v-col>

                                                    <v-col cols="8" lg="8">
                                                        :<template>
                                                            <span style="20px">
                                                                {{ beneficiary?.financial_year?.financial_year }}
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
                                                                    "container.budget_management.calculation_type"
                                                                )
                                                            }}
                                                        </label></v-col>
                                                    <v-col cols="8" lg="8">
                                                        :<template>
                                                            <span style="20px">
                                                                {{ beneficiary?.calculation_type?.value_en }}
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
                                                                    "container.budget_management.approval_status"
                                                                )
                                                            }}
                                                        </label></v-col>
                                                    <v-col cols="8" lg="8">
                                                        :<template>
                                                            <span style="20px">
                                                                {{ beneficiary?.approval_status }}
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
                                                                    "container.budget_management.no_of_previous_year"
                                                                )
                                                            }}
                                                        </label></v-col>
                                                    <v-col cols="8" lg="8">
                                                        :<template>
                                                            <span style="20px">
                                                                {{ beneficiary?.no_of_previous_year }}
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
                                                                    "container.budget_management.calculation_value"
                                                                )
                                                            }}
                                                        </label></v-col>
                                                    <v-col cols="8" lg="8">
                                                        :<template>
                                                            <span style="20px">
                                                                {{ beneficiary?.calculation_value }}
                                                            </span>
                                                        </template>
                                                    </v-col>
                                                </v-row>
                                            </v-col>


                                        </v-row>
                                    </v-card-text>
                                </v-card>
                                <!-- Budget End -- -->

                                <!--  Budget Information Details -->
                                <v-card class="mt-5">
                                    <v-card-title style="background-color: #1976d2; color: white">
                                        {{ $t("container.budget_management.budget_details_info") }}
                                    </v-card-title>

                                    <v-card-text class="mt-2">
                                        <div class=" mb-4">
                                            <v-col cols="12">
                                                <ValidationObserver ref="form" v-slot="{ invalid }">
                                                    <form @submit.prevent="onSearch()">
                                                        <v-row>
                                                            <v-col lg="3" md="3" cols="12">
                                                                <ValidationProvider name="Division" vid="division"
                                                                    v-slot="{ errors }">
                                                                    <v-text-field outlined readonly
                                                                        v-model="user_permission.division_name" :label="$t(
                                                                            'container.system_config.demo_graphic.division.division'
                                                                        )
                                                                            " v-if="user_permission.division">
                                                                    </v-text-field>
                                                                    <v-select v-if="!user_permission.division" outlined
                                                                        @input="onChangeDivision($event)"
                                                                        v-model="data.division_id" :label="$t(
                                                                            'container.system_config.demo_graphic.division.division'
                                                                        )
                                                                            " :items="divisions"
                                                                        :item-text="getItemText" item-value="id"
                                                                        :error="errors[0] ? true : false"
                                                                        :error-messages="errors[0]"
                                                                        class="no-arrow-icon"
                                                                        :append-icon-cb="appendIconCallback"
                                                                        append-icon="mdi-plus" clearable>
                                                                    </v-select>
                                                                </ValidationProvider>
                                                            </v-col>
                                                            <v-col lg="3" md="3" cols="12">
                                                                <ValidationProvider name="District" vid="district"
                                                                    v-slot="{ errors }">
                                                                    <v-text-field outlined readonly
                                                                        v-model="user_permission.district_name" :label="$t(
                                                                            'container.system_config.demo_graphic.district.district'
                                                                        )
                                                                            " v-if="user_permission.district">
                                                                    </v-text-field>
                                                                    <v-select v-if="!user_permission.district" outlined
                                                                        v-model="data.district_id"
                                                                        @input="onChangeDistrict($event)" :label="$t(
                                                                            'container.system_config.demo_graphic.district.district'
                                                                        )
                                                                            " :items="districts"
                                                                        :item-text="getItemText" item-value="id"
                                                                        class="no-arrow-icon"
                                                                        :append-icon-cb="appendIconCallback"
                                                                        append-icon="mdi-plus"
                                                                        :error="errors[0] ? true : false"
                                                                        :error-messages="errors[0]"
                                                                        clearable></v-select>
                                                                </ValidationProvider>
                                                            </v-col>
                                                            <v-col lg="3" md="3" cols="12">
                                                                <ValidationProvider name="Location Type"
                                                                    vid="location_type" v-slot="{ errors }">
                                                                    <v-text-field outlined readonly
                                                                        v-model="user_permission.location_type_name"
                                                                        :label="$t('container.list.location_type')"
                                                                        v-if="user_permission.location_type">
                                                                    </v-text-field>
                                                                    <v-select v-if="!user_permission.location_type"
                                                                        @input="LocationType($event)"
                                                                        v-model="data.location_type" outlined
                                                                        :label="$t('container.list.location_type')"
                                                                        :items="locationType"
                                                                        :item-text="getLocationText" item-value="id"
                                                                        class="no-arrow-icon"
                                                                        :append-icon-cb="appendIconCallback"
                                                                        append-icon="mdi-plus"
                                                                        :error="errors[0] ? true : false"
                                                                        :error-messages="errors[0]"
                                                                        clearable></v-select>
                                                                </ValidationProvider>
                                                            </v-col>
                                                            <v-col v-if="data.location_type == 1" lg="3" md="3"
                                                                cols="12">
                                                                <ValidationProvider name="thana" vid="district_pouro_id"
                                                                    v-slot="{ errors }">
                                                                    <v-text-field outlined readonly
                                                                        v-model="user_permission.district_pourashava_name"
                                                                        :label="$t(
                                                                            'container.system_config.demo_graphic.ward.pouro'
                                                                        )
                                                                            "
                                                                        v-if="user_permission.district_pourashava">
                                                                    </v-text-field>
                                                                    <v-select
                                                                        v-if="!user_permission.district_pourashava"
                                                                        v-model="data.district_pouro_id" outlined
                                                                        :label="$t(
                                                                            'container.system_config.demo_graphic.ward.pouro'
                                                                        )
                                                                            " @change="onChangeDistrictPouro($event)"
                                                                        :items="district_pouros"
                                                                        :item-text="getItemText" item-value="id"
                                                                        class="no-arrow-icon"
                                                                        :append-icon-cb="appendIconCallback"
                                                                        append-icon="mdi-plus"
                                                                        :error="errors[0] ? true : false"
                                                                        :error-messages="errors[0]"
                                                                        clearable></v-select>
                                                                </ValidationProvider>
                                                            </v-col>
                                                            <v-col v-if="data.location_type == 2" lg="3" md="3"
                                                                cols="12">
                                                                <ValidationProvider name="Upazila" vid="upazila_id"
                                                                    v-slot="{ errors }">
                                                                    <v-text-field outlined readonly
                                                                        v-model="user_permission.upazila_name" :label="$t(
                                                                            'container.system_config.demo_graphic.thana.thana'
                                                                        )
                                                                            " v-if="user_permission.upazila">
                                                                    </v-text-field>
                                                                    <v-select v-if="!user_permission.upazila"
                                                                        v-model="data.upazila_id" outlined :label="$t(
                                                                            'container.system_config.demo_graphic.thana.thana'
                                                                        )
                                                                            " @change="onChangeUpazila($event)"
                                                                        :items="thanas" :item-text="getItemText"
                                                                        item-value="id" class="no-arrow-icon"
                                                                        :append-icon-cb="appendIconCallback"
                                                                        append-icon="mdi-plus"
                                                                        :error="errors[0] ? true : false"
                                                                        :error-messages="errors[0]"
                                                                        clearable></v-select>
                                                                </ValidationProvider>
                                                            </v-col>

                                                            <v-col v-if="data.location_type == 2" lg="3" md="3"
                                                                cols="12">
                                                                <ValidationProvider name="subLocationType"
                                                                    vid="subLocationType" v-slot="{ errors }">
                                                                    <v-autocomplete
                                                                        @input="onChangeSubLocationType($event)"
                                                                        v-model="data.sub_location_type" outlined
                                                                        :label="$t(
                                                                            'container.system_config.demo_graphic.ward.subLocation_type'
                                                                        )
                                                                            " :items="subLocationType"
                                                                        item-text="value" item-value="id"
                                                                        :error="errors[0] ? true : false"
                                                                        :error-messages="errors[0]"
                                                                        :hide-details="errors[0] ? false : true"
                                                                        class="no-arrow-icon"
                                                                        :append-icon-cb="appendIconCallback"
                                                                        append-icon="mdi-plus"
                                                                        clearable></v-autocomplete>
                                                                </ValidationProvider>
                                                            </v-col>
                                                            <v-col v-if="
                                                                data.location_type == 2 && data.sub_location_type == 1
                                                            " lg="3" md="3" cols="12">
                                                                <ValidationProvider name="pouros" vid="pouros"
                                                                    v-slot="{ errors }">
                                                                    <v-select v-model="data.pouro_id" outlined :label="$t(
                                                                        'container.system_config.demo_graphic.ward.pouro'
                                                                    )
                                                                        " :items="pouros" :item-text="getItemText"
                                                                        item-value="id"
                                                                        :error="errors[0] ? true : false"
                                                                        :error-messages="errors[0]"
                                                                        :hide-details="errors[0] ? false : true"
                                                                        class="no-arrow-icon"
                                                                        :append-icon-cb="appendIconCallback"
                                                                        append-icon="mdi-plus" clearable></v-select>
                                                                </ValidationProvider>
                                                            </v-col>

                                                            <v-col v-if="
                                                                data.sub_location_type == 2 && data.location_type == 2
                                                            " lg="3" md="3" cols="12">
                                                                <ValidationProvider name="unions" vid="unions"
                                                                    v-slot="{ errors }">
                                                                    <v-select @input="onChangeUnionGetWard($event)"
                                                                        v-model="data.union_id" outlined :label="$t(
                                                                            'container.system_config.demo_graphic.ward.union'
                                                                        )
                                                                            " :items="unions" :item-text="getItemText"
                                                                        item-value="id"
                                                                        :error="errors[0] ? true : false"
                                                                        :error-messages="errors[0]"
                                                                        :hide-details="errors[0] ? false : true"
                                                                        class="no-arrow-icon"
                                                                        :append-icon-cb="appendIconCallback"
                                                                        append-icon="mdi-plus" clearable></v-select>
                                                                </ValidationProvider>
                                                            </v-col>

                                                            <v-col v-if="data.location_type == 3" lg="3" md="3"
                                                                cols="12">
                                                                <ValidationProvider name="city" vid="city_id"
                                                                    v-slot="{ errors }">
                                                                    <v-text-field outlined readonly
                                                                        v-model="user_permission.city_corp_name" :label="$t(
                                                                            'container.system_config.demo_graphic.ward.city'
                                                                        )
                                                                            " v-if="user_permission.city_corp">
                                                                    </v-text-field>
                                                                    <v-select v-if="!user_permission.city_corp"
                                                                        v-model="data.city_id"
                                                                        @change="onChangeCity($event)" outlined :label="$t(
                                                                            'container.system_config.demo_graphic.ward.city'
                                                                        )
                                                                            " :items="cities" :item-text="getItemText"
                                                                        item-value="id" class="no-arrow-icon"
                                                                        :append-icon-cb="appendIconCallback"
                                                                        append-icon="mdi-plus"
                                                                        :error="errors[0] ? true : false"
                                                                        :error-messages="errors[0]"
                                                                        clearable></v-select>
                                                                </ValidationProvider>
                                                            </v-col>

                                                            <v-col v-if="data.location_type == 3" lg="3" md="3"
                                                                cols="12">
                                                                <ValidationProvider name="thana" vid="thana_id"
                                                                    v-slot="{ errors }">
                                                                    <v-select v-model="data.thana_id" outlined :label="$t(
                                                                        'container.system_config.demo_graphic.ward.thana'
                                                                    )
                                                                        " @change="onChangeThana($event)"
                                                                        :items="thanas" :item-text="getItemText"
                                                                        item-value="id" class="no-arrow-icon"
                                                                        :append-icon-cb="appendIconCallback"
                                                                        append-icon="mdi-plus"
                                                                        :error="errors[0] ? true : false"
                                                                        :error-messages="errors[0]"
                                                                        clearable></v-select>
                                                                </ValidationProvider>
                                                            </v-col>

                                                            <v-col v-if="
                                                                data.location_type == 1 ||
                                                                data.location_type == 2 ||
                                                                data.location_type == 3
                                                            " lg="3" md="3" cols="12">
                                                                <ValidationProvider name="ward" vid="ward_id"
                                                                    v-slot="{ errors }">
                                                                    <v-select v-model="data.ward_id" outlined :label="$t(
                                                                        'container.system_config.demo_graphic.ward.ward'
                                                                    )
                                                                        " :items="wards" :item-text="getItemText"
                                                                        item-value="id" class="no-arrow-icon"
                                                                        :append-icon-cb="appendIconCallback"
                                                                        append-icon="mdi-plus"
                                                                        :error="errors[0] ? true : false"
                                                                        :error-messages="errors[0]"
                                                                        clearable></v-select>
                                                                </ValidationProvider>
                                                            </v-col>
                                                        </v-row>
                                                        <div class="d-inline d-flex justify-end">
                                                            <v-btn elevation="2" class="btn mr-2" color="success"
                                                                type="submit" :disabled="!data.division_id ||
                                                                    !data.district_id
                                                                    ">{{ $t("container.list.search")
                                                                }}</v-btn>
                                                            <v-btn elevation="2" class="btn" @click="resetSearch">{{
                                                                $t("container.list.reset")
                                                            }}</v-btn>
                                                        </div>
                                                    </form>
                                                </ValidationObserver>
                                            </v-col>
                                            <v-col cols="12">
                                                <!-- <div justify="center">
                                                    <h3 class="text-uppercase pt-3">
                                                        {{ $t("container.manage_allotment.list") }}
                                                    </h3>
                                                </div> -->

                                                <v-card-title class="justify-center" tag="div">
                                                    <h5 class="text-uppercase pt-3">
                                                        {{ $t("container.manage_allotment.detail_budget_list") }}
                                                    </h5>
                                                </v-card-title>
                                                <v-row
                                                    class="ma-0 white round-border d-flex justify-space-between align-center"
                                                    justify="center" justify-lg="space-between">
                                                    <v-col cols="12">
                                                        <v-data-table :headers="headers" :items="allotments"
                                                            :loading="loading" item-key="id"
                                                            :items-per-page="pagination.perPage" hide-default-footer
                                                            class="elevation-0 transparent row-pointer">
                                                            <template v-slot:item.sl="{ item, index }">
                                                                {{
                                                                    (pagination.current - 1) * pagination.perPage +
                                                                    index +
                                                                    1
                                                                }}
                                                            </template>
                                                            <!-- Download Action Button -->
                                                            <template v-slot:item.download="{ item }">
                                                                <v-tooltip top>
                                                                    <template v-slot:activator="{ on }">
                                                                        <v-btn v-can="'update-post'" fab x-small
                                                                            v-on="on" color="#AFB42B" elevation="0"
                                                                            class="white--text">
                                                                            <v-icon> mdi-download </v-icon>
                                                                        </v-btn>
                                                                    </template>
                                                                    <span>
                                                                        {{ $t("container.list.view") }}
                                                                    </span>
                                                                </v-tooltip>
                                                            </template>
                                                            <!-- End Download Action Button -->
                                                            <!-- Action Button -->
                                                            <template v-slot:item.actions="{ item }">
                                                                <v-tooltip top>
                                                                    <template v-slot:activator="{ on }">
                                                                        <v-btn v-can="'update-post'" fab x-small
                                                                            v-on="on" color="#AFB42B" elevation="0"
                                                                            class="white--text">
                                                                            <v-icon> mdi-eye </v-icon>
                                                                        </v-btn>
                                                                    </template>
                                                                    <span>
                                                                        {{ $t("container.list.view") }}
                                                                    </span>
                                                                </v-tooltip>
                                                                <v-tooltip top>
                                                                    <template v-slot:activator="{ on }">
                                                                        <v-btn v-can="'update-post'" fab x-small
                                                                            v-on="on" color="success" elevation="0"
                                                                            class="ml-3">
                                                                            <v-icon> mdi-account-edit-outline
                                                                            </v-icon>
                                                                        </v-btn>
                                                                    </template>
                                                                    <span>
                                                                        {{ $t("container.list.edit") }}
                                                                    </span>
                                                                </v-tooltip>

                                                                <v-tooltip top>
                                                                    <template v-slot:activator="{ on }">
                                                                        <v-btn v-can="'delete-allotment'" fab x-small
                                                                            v-on="on" color="grey"
                                                                            class="ml-3 white--text" elevation="0">
                                                                            <v-icon> mdi-delete </v-icon>
                                                                        </v-btn>
                                                                    </template>
                                                                    <span> {{ $t("container.list.delete")
                                                                        }}</span>
                                                                </v-tooltip>
                                                            </template>
                                                            <!-- End Action Button -->
                                                            <template v-slot:footer="item">
                                                                <div
                                                                    class="text-center pt-2 v-data-footer justify-center pb-2">
                                                                    <v-select
                                                                        style="position: absolute; right: 25px; width: 149px; transform: translate(0px, 0px);"
                                                                        :items="items" hide-details dense outlined
                                                                        @change="onPageChange"
                                                                        v-model="pagination.perPage"></v-select>
                                                                    <v-pagination circle primary
                                                                        v-model="pagination.current"
                                                                        :length="pagination.total" @input="onPageChange"
                                                                        :total-visible="11"
                                                                        class="custom-pagination-item"></v-pagination>
                                                                </div>
                                                            </template>
                                                        </v-data-table>
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                        </div>
                                    </v-card-text>
                                </v-card>
                                <!--  Budget Information Details -->


                            </div>
                            <div style="display: flex; justify-content: flex-end" class="mt-5">
                                <!-- Other content on the left -->

                                <v-btn flat color="gray" type="submit" @click="navigateTolist" class="custom-btn">
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
import axios from "axios";
import { required } from "vee-validate/dist/rules";
import Form from "vform";
import { mapState, mapActions } from "vuex";

export default {
    title: "CTM -  Application View",
    data() {
        return {
            data: {
                program_id: null,
                division_id: null,
                district_id: null,
                location_type: null,
                sub_location_type: null,
                city_id: null,
                district_pouro_id: null,
                thana_id: null,
                upazila_id: null,
                union_id: null,
                ward_id: null,
            },
            applications: [],
            allowance_values: [],
            panel: [0, 1, 2, 3, 4, 5, 6],
            programs: [],

            loading: true,

            pagination: {
                current: 1,
                total: 0,
                perPage: 15,
            },
            sortBy: "name_en",
            sortDesc: false, //ASC

            user_permission: {
                division: null,
                division_name: null,
                district: null,
                district_name: null,
                location_type: null,
                location_type_name: null,
                upazila: null,
                upazila_name: null,
                city_corp: null,
                city_corp_name: null,
                district_pourashava: null,
                district_pourashava_name: null,
            },
            page: {
                current: 1,
                perPage: 10, // You can set the desired default page size
                total: 0,
            },
            items: [5, 10, 15, 20, 40, 50, 100],
        };
    },

    computed: {
        language: {
            get() {
                return this.$store.getters.getAppLanguage;
            },
        },
        headers() {
            return [
                { text: this.$t("container.list.sl"), value: "sl" },

                // {
                //     text: this.$t("container.manage_allotment.id"),
                //     value: "id",
                //     align: "start",
                //     sortable: false,
                // },
                {
                    text: this.$t("container.manage_allotment.area_type"),
                    value: "office_area.name_en",
                    align: "center",
                },
                {
                    text: this.$t("container.manage_allotment.allotment_area"),
                    value: "allotment_area.name_en",
                    align: "center",
                },
                {
                    text: this.$t("container.manage_allotment.total_beneficiaries"),
                    value: "total_beneficiaries",
                    align: "center",
                },
                {
                    text: this.$t("container.budget_management.beneficiary_amount"),
                    value: "per_beneficiary_amount",
                    align: "center",
                },
                {
                    text: this.$t("container.manage_allotment.total_amount"),
                    value: "total_amount",
                    align: "center",
                },

            ];
        },
        ...mapState({
            divisions: (state) => state.Division.divisions,
        }),
        subLocationType() {
            return [
                {
                    id: 1,
                    // value_en: "Pouroshava",
                    value: this.$t("container.list.pouroshava"),
                },

                {
                    id: 2,
                    // value_en: "Union",
                    value: this.$t("container.list.union"),
                },
            ];
        },
    },
    components: {
        ValidationProvider,
        ValidationObserver,
        FooterBar,
    },

    methods: {
        ...mapActions({
            GetAllDivisions: "Division/GetAllDivisions",
        }),
        getItemText(item) {
            return this.language === "bn" ? item.name_bn : item.name_en;
        },
        getLocationText(item) {
            return this.language === "bn" ? item.value_bn : item.value_en;
        },
        resetSearch() {
            if (!this.user_permission.division) {
                this.data.division_id = null;
            }
            if (!this.user_permission.district) {
                this.data.district_id = null;
            }
            if (!this.user_permission.city_corp) {
                this.data.city_id = null;
            }
            if (!this.user_permission.upazila) {
                this.data.upazila_id = null;
            }
            if (!this.user_permission.pouro_id) {
                this.data.district_pouro_id = null;
            }
            if (!this.user_permission.location_type) {
                this.data.location_type = null;
            }
            this.data.program_id = null;

            this.data.sub_location_type = null;
            this.data.city_id = null;
            this.data.district_pouro_id = null;
            this.data.thana_id = null;
            this.upazila_id = null;
            this.data.union_id = null;
            this.data.ward_id = null;
            this.GetAllotments();
        },
        async GetUserPermission() {
            // this.isLoading = true;
            try {
                await this.$axios
                    .get("/admin/beneficiary/getUserLocation", {
                        headers: {
                            Authorization: "Bearer " + this.$store.state.token,
                            "Content-Type": "multipart/form-data",
                        },
                    })
                    .then((result) => {
                        console.log(result.data.data, "user_permission");
                        let item = result.data.data;
                        // User Permission Set
                        if (item?.division) {
                            this.data.division_id = item?.division?.id;
                            this.user_permission.division = item?.division;
                            this.user_permission.division_name =
                                this.language == "en"
                                    ? item?.division?.name_en
                                    : item?.division?.name_bn;
                            if (!item?.district) {
                                this.onChangeDivision(item?.division?.id);
                            } else {
                                this.data.district_id = item?.district?.id;
                                this.user_permission.district = item?.district;
                                this.user_permission.district_name =
                                    this.language == "en"
                                        ? item?.district?.name_en
                                        : item?.district?.name_bn;
                            }
                        }
                        if (item?.location_type) {
                            this.user_permission.location_type = item?.location_type;
                            this.data.location_type = item?.location_type?.id;
                            this.user_permission.location_type_name =
                                this.language == "en"
                                    ? item?.location_type?.value_en
                                    : item?.location_type?.value_bn;
                        }
                        if (item?.district_pourashava) {
                            this.data.district_pouro_id = item?.district_pourashava?.id;
                            this.user_permission.district_pourashava =
                                item?.district_pourashava;
                            this.onChangeDistrictPouro(item?.district_pourashava?.id);
                            this.user_permission.district_pourashava_name =
                                this.language == "en"
                                    ? item?.district_pourashava?.name_en
                                    : item?.district_pourashava?.name_bn;
                        }
                        if (item?.upazila) {
                            this.user_permission.upazila = item?.upazila;
                            this.data.upazila_id = item?.upazila?.id;
                            this.onChangeUpazila(item?.upazila?.id);
                            this.user_permission.upazila_name =
                                this.language == "en"
                                    ? item?.upazila?.name_en
                                    : item?.upazila?.name_bn;
                        }
                        if (item?.city_corp) {
                            this.data.city_id = item?.city_corp?.id;
                            this.user_permission.city_corp = item?.city_corp;
                            this.onChangeCity(item?.city_corp?.id);
                            this.user_permission.city_corp_name =
                                this.language == "en"
                                    ? item?.city_corp?.name_en
                                    : item?.city_corp?.name_bn;
                        }
                        // this.isLoading = false;
                        this.GetAllotments();
                    })
                    .catch((err) => {
                        console.log(err, "error");
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
        async LocationType($event) {
            //reset all fields
            this.data.sub_location_type = null;
            this.data.city_id = null;
            this.data.district_pouro_id = null;
            this.data.thana_id = null;
            this.data.upazila_id = null;
            this.data.union_id = null;
            this.data.ward_id = null;

            this.cities = null;
            this.district_pouros = null;
            this.thanas = null;
            this.unions = null;
            this.wards = null;

            if (this.data.district_id != null && this.data.location_type != null) {
                console.log("LocationType", $event);
                if ($event === 1) {
                    await this.$axios
                        .get("/admin/city/get/" + this.data.district_id + "/" + $event, {
                            headers: {
                                Authorization: "Bearer " + this.$store.state.token,
                                "Content-Type": "multipart/form-data",
                            },
                        })
                        .then((result) => {
                            this.district_pouros = result.data.data;
                        });
                } else if ($event === 2) {
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
                } else if ($event === 3) {
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
            }
        },

        async onChangeUpazila(event) {
            this.data.union_id = null;
            this.data.ward_id = null;
            await this.$axios
                .get(`/admin/union/get/${this.data.upazila_id}`, {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((result) => {
                    this.unions = result.data.data;
                });
        },
        async onChangeSubLocationType(event) {
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

                        //clear data
                        this.data.pouro_id = null;
                        this.data.union_id = null;
                        this.data.ward_id = null;
                    });
                this.data.union_id = null;
            }
            if (event == 2) {
                this.onChangeUpazila(this.data.upazila_id);
                this.data.pouro_id = null;
            }
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
        async onChangeUnion(event) {
            await this.$axios
                .get(`/admin/ward/get/${this.data.union_id}`, {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((result) => {
                    this.wards = result.data.data;
                });
        },
        async onChangeCity(event) {
            this.data.thana_id = null;
            this.data.ward_id = null;

            await this.$axios
                .get(`/admin/thana/get/city/${event}`, {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((result) => {
                    this.thanas = result.data.data;
                });
        },
        async onChangeThana(event) {
            await this.$axios
                .get(`/admin/ward/get/thana/${this.data.thana_id}`, {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((result) => {
                    this.wards = result.data.data;
                });
        },
        async onChangeDistrictPouro(event) {
            this.data.ward_id = null;
            await this.$axios
                .get(`/admin/ward/get/district_pouro/${event}`, {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((result) => {
                    this.wards = result.data.data;
                });
        },
        navigateTolist() {
            this.$router.push("/budget");
        },
        async getBudgetDetailsById() {
            try {
                this.$axios
                    .get(`/admin/budget/show/${this.$route.params.id}`, {
                        headers: {
                            Authorization: "Bearer " + this.$store.state.token,
                            "Content-Type": "multipart/form-data",
                        },
                    })
                    .then((res) => {
                        if (res.data?.success) {
                            let item = res.data.data;
                            this.beneficiary = res.data.data;

                        } else {
                            this.$toast.error("Record not found!");
                            this.$router.push({ name: "budget" });
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
        onPageChange($event) {
            // this.pagination.current = $event;
            this.GetAllotments();
        },
        onSearch() {
            this.pagination = {
                ...this.pagination,
                current: 1,
            };
            this.GetAllotments();
        },
        async GetAllotments() {
            // if (
            //     !this.data.program_id &&
            //     !this.data.division_id &&
            //     !this.data.district_id
            //     // (this.data.city_id || this.data.district_pouro_id || this.data.upazila_id)
            // ) {
            this.loading = true;
            const queryParams = {
                program_id: this.data.program_id,
                division_id: this.data.division_id,
                district_id: this.data.district_id,
                location_type_id: this.data.location_type,
                city_corp_id: this.data.city_id,
                district_pourashava_id: this.data.district_pouro_id,
                union_id: this.data.union_id,
                thana_id: this.data.thana_id,
                upazila_id: this.data.upazila_id,
                ward_id: this.data.ward_id,

                perPage: this.pagination.perPage,
                page: this.pagination.current,
                sortBy: this.sortBy,
                orderBy: this.sortDesc,
            };
            await this.$axios
                .get("/admin/budget/detail/list/" + this.$route.params.id, {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                    params: queryParams,
                })
                .then((result) => {
                    this.allotments = result.data.data;

                    this.pagination.current = result.data.meta.current_page;
                    this.pagination.total = result.data.meta.last_page;
                    this.pagination.grand_total = result.data.meta.total;
                    this.loading = false;
                });
            // }
        },

    },

    mounted() {
        this.GetAllDivisions();
        this.GetUserPermission();
        this.$store
            .dispatch("getLookupByType", 1)
            .then((res) => (this.locationType = res));
    },

    created() {
        this.getBudgetDetailsById();
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