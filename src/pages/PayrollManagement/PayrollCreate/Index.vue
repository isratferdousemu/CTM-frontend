<template>
    <div id="create_manage_allotment">
        <v-row class="mx-5 mt-5">
            <v-col cols="12">
                <ValidationObserver ref="form" v-slot="{ invalid }">
                    <v-form v-on:submit.prevent="addAllotment">
                        <v-row wrap>
                            <v-col cols="12">
                                <v-card>


                                    <v-card-title class="justify-center"
                                        style="background-color: #1C3B68; color: white;font-size: 17px;">
                                        <h4 class=" white--text">{{
                                            $t('container.payroll_management.payroll_create')
                                            }}</h4>
                                    </v-card-title>


                                    <v-divider></v-divider>

                                    <v-card-text>
                                        <v-col cols="12" class="d-flex">
                                            <v-row wrap>
                                                <v-col cols="12" class="d-flex">
                                                    <v-row wrap>
                                                        <v-col cols="12" sm="6" lg="6">
                                                            <label style="font-weight: bold;">{{
                                                                $t(
                                                                    "container.payroll_management.allotment_distribution"
                                                                )
                                                            }}
                                                            </label>
                                                            <v-select :items="programs" item-text="name_en"
                                                                item-value="id" label="Select Allowance Program"
                                                                clearable outlined @change="getAmount($event)">
                                                            </v-select>

                                                            <v-select :items="districts" item-text="name_en"
                                                                item-value="id" label="Select District" outlined
                                                                @change="getOffice($event)">
                                                            </v-select>

                                                            <v-select :items="financial" item-text="financial_year"
                                                                item-value="id" label="Select Financial Year" outlined>
                                                            </v-select>
                                                            <v-select :items="financial" item-text="financial_year"
                                                                item-value="id" label="Select Financial Year" outlined>
                                                            </v-select>
                                                        </v-col>

                                                        <v-col cols="12" sm="6" lg="6" class="mt-5">
                                                            <v-card elevation="2" shaped outlined>
                                                                <v-card-title
                                                                    class="justify-center">Program</v-card-title>
                                                                <hr
                                                                    style="width: 50%; margin-left: 25% !important; margin-right: 25% !important;" />
                                                                <v-card-text>
                                                                    <h4> Amount of Monthly Allowance per Beneficiary
                                                                    </h4>
                                                                    <h4>Distribution Medium</h4>
                                                                    <h4>Bank Account</h4>
                                                                </v-card-text>
                                                            </v-card>
                                                        </v-col>
                                                    </v-row>
                                                </v-col>
                                            </v-row>
                                        </v-col>
                                    </v-card-text>
                                </v-card>
                            </v-col>

                            <v-col cols="12">
                                <v-card style="margin-bottom: 50px">
                                    <v-row>
                                        <v-col col="6">
                                            <v-card-title>
                                                <h3>Allotment Area-Wise Beneficiaries</h3>
                                            </v-card-title>
                                        </v-col>
                                    </v-row>

                                    <v-divider></v-divider>



                                    <v-card-text class="mt-10">

                                        <v-row class="mx-5 mt-10">
                                            <v-col cols="12" md="4">
                                                <v-text-field @keyup.native="PageSetup" v-model="search"
                                                    append-icon="mdi-magnify" :label="$t(
                                                        'container.list.search_circular'
                                                    )" hide-details class="mb-5 my-sm-0 my-3 mx-0v -input--horizontal"
                                                    flat outlined dense></v-text-field>

                                            </v-col>


                                            <!-- <v-col class="text-right">

                                                <v-btn flat color="primary" router
                                                    to="/training-management/trainer-information/create"
                                                    v-can="'trainerCircular-create'">
                                                    <v-icon small>mdi-plus</v-icon>
                                                    {{
                                                        $t('container.training_management.trainer_info.add') }}
                                                </v-btn>
                                            </v-col> -->

                                        </v-row>

                                        <template>
                                            <v-row justify="space-between" align="center" class="mx-4">
                                                <!-- Checkbox on the left -->
                                                <v-col sm="6" lg="6" md="6" cols="12">
                                                    {{ $t('container.list.total') }}:&nbsp;<span
                                                        style="font-weight: bold;">
                                                        {{ language === 'bn' ? $helpers.englishToBangla(
                                                            10) : 10 }}
                                                    </span>
                                                </v-col>

                                                <!-- Dropdown on the right -->
                                                <v-col sm="6" lg="6" md="6" cols="12" class="text-right">
                                                    <v-btn elevation="2" class="btn mr-2 white--text"
                                                        color="red darken-4" @click="GeneratePDF()">
                                                        <v-icon class="pr-1"> mdi-tray-arrow-down </v-icon> {{
                                                            $t("container.list.PDF") }}
                                                    </v-btn>
                                                    <v-btn elevation="2" class="btn mr-2 white--text"
                                                        color="teal darken-2" @click="GenerateExcel()">
                                                        <v-icon class="pr-1"> mdi-tray-arrow-down </v-icon>
                                                        {{ $t("container.list.excel") }}
                                                    </v-btn>
                                                </v-col>
                                            </v-row>
                                        </template>
                                        <v-row
                                            class="ma-0  white round-border d-flex justify-space-between align-center"
                                            justify="center" justify-lg="space-between">
                                            <v-col cols="12">

                                                <v-data-table :loading="loading" item-key="id" :headers="headers"
                                                    :items="payrollList" :items-per-page="pagination.perPage"
                                                    hide-default-footer
                                                    class="elevation-0 transparent row-pointer mt-5 mx-5">

                                                    <template v-slot:[`item.id`]="{ item }">
                                                        <span>
                                                            {{ language == 'bn' ?
                                                                $helpers.englishToBangla(item.id) :
                                                                item.id }}
                                                        </span>

                                                    </template>
                                                    <template v-slot:item.sl="{ item, index }">
                                                        {{
                                                            language === "bn"
                                                                ? $helpers.englishToBangla(
                                                                    (pagination.current - 1) * pagination.perPage +
                                                                    index +
                                                                    1
                                                                )
                                                                : (pagination.current - 1) * pagination.perPage +
                                                                index +
                                                                1
                                                        }}
                                                    </template>

                                                    <template v-slot:item.allocated_beneficiary="{ item }">
                                                        {{
                                                            language === "bn"
                                                                ? $helpers.englishToBangla(item.allocated_beneficiary)
                                                                : item.allocated_beneficiary
                                                        }}
                                                    </template>

                                                    <template v-slot:[`item.active_beneficiary`]="{ item }">
                                                        <span>
                                                            {{ language == 'bn' ?
                                                                $helpers.englishToBangla(item.active_beneficiary) :
                                                                item.active_beneficiary }}
                                                        </span>

                                                    </template>

                                                    <!-- Action Button -->
                                                    <template v-slot:item.actions="{ item }">
                                                        <v-btn v-on="on" color="primary" elevation="0"
                                                            class="btn mr-2 white--text"
                                                            @click="rollBackBeneficiary(item.id)">
                                                            {{
                                                                $t(
                                                                    "See Beneficiary"
                                                                )
                                                            }}
                                                        </v-btn>
                                                        <v-btn v-on="on" color="red darken-4" elevation="0"
                                                            class="btn mr-2 white--text"
                                                            @click="rollBackBeneficiary(item.id)">
                                                            {{
                                                                $t(
                                                                    "Reject"
                                                                )
                                                            }}
                                                        </v-btn>
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
                                                                :length="pagination.total" @input="onPageChange"
                                                                :total-visible="11"
                                                                class="custom-pagination-item"></v-pagination>
                                                        </div>
                                                    </template>

                                                </v-data-table>
                                            </v-col>
                                        </v-row>

                                        <v-row>
                                            <v-col cols="12">
                                                <v-row class="justify-center mb-5">
                                                    <v-btn flat color="primary" type="submit" class="custom-btn mr-2"
                                                        :disabled="invalid">Preview and Send
                                                    </v-btn>
                                                </v-row>
                                            </v-col>
                                        </v-row>

                                    </v-card-text>
                                </v-card>
                            </v-col>


                        </v-row>
                    </v-form>
                </ValidationObserver>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import { extend, ValidationProvider, ValidationObserver } from "vee-validate";
import { mapActions, mapState } from "vuex";
import office from "@/store/modules/system_configuration/office";

export default {
    name: "Create",
    title: "CTM - Create Manage Allotment",
    components: {
        ValidationProvider,
        ValidationObserver,
    },

    data() {
        return {
            data: {
            },
            programs: [],
            total: null,
            districts: [],
            pagination: {
                current: 1,
                total: 0,
                perPage: 5
            },

            page: {
                current: 1,
                perPage: 10, // You can set the desired default page size
                total: 0,
            },
            payrollList: [{
                id: 1,
                area_type: "Gopalganj",
                allotment_area: "Ulpur",
                allocated_beneficiary: 120,
                active_beneficiary: 101,
                status: "Saved"
            },
            {
                id: 2,
                area_type: "Gopalganj",
                allotment_area: "Gopinathpur",
                allocated_beneficiary: 120,
                active_beneficiary: 102,
                status: "Not Saved"
            }]
        };
    },

    computed: {
        language: {
            get() {
                return this.$store.getters.getAppLanguage;
            }
        },
        ...mapState({
        }),
        headers() {
            return [
                {
                    text: this.$t("container.list.sl"),
                    value: "id",
                    align: "start",
                    sortable: false,
                },
                {
                    text: this.$t(
                        "container.payroll_management.area_wise_ben_list.area_type"
                    ),
                    value: "area_type",
                    align: "center",
                },
                {
                    text: this.$t(
                        "container.payroll_management.area_wise_ben_list.allotment_area"
                    ),
                    value: "allotment_area",
                    align: "center",
                },
                {
                    text: this.$t(
                        "container.payroll_management.area_wise_ben_list.allocated_beneficiary"
                    ),
                    value: "allocated_beneficiary",
                    align: "center",
                },
                {
                    text: this.$t(
                        "container.payroll_management.area_wise_ben_list.active_beneficiary"
                    ),
                    value: "active_beneficiary",
                    align: "center",
                },
                { text: this.$t('container.list.action'), value: "actions", align: "center", sortable: false, width: "28%" },

            ];
        },
    },
    methods: {
        ...mapActions({
        }),
        async GetAllProgram() {
            try {
                await this.$axios
                    .get("/global/program", {
                        headers: {
                            Authorization: "Bearer " + this.$store.state.token,
                            "Content-Type": "multipart/form-data",
                        },
                    })
                    .then((result) => {
                        console.log(result, "programs");
                        this.programs = result.data.data;

                        this.total = 0;
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
        async GetAllDistrict() {
            const queryParams = {
                language: this.$i18n.locale,

                perPage: 65,
                page: 1,
                sortBy: this.sortBy,
                orderBy: this.sortDesc,
            };
            try {
                await this.$axios
                    .get("/admin/district/get", {
                        headers: {
                            Authorization: "Bearer " + this.$store.state.token,
                            "Content-Type": "multipart/form-data",
                        },
                        params: queryParams,
                    })
                    .then((result) => {
                        console.log(result, "districts");
                        this.districts = result.data.data;
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

    },
    created() {
        this.GetAllProgram();
        this.GetAllDistrict()
    },

};
</script>

<style scoped>
.custom-table {
    width: 100%;
    border-collapse: collapse;
}

.custom-table th,
.custom-table td {
    border: 1px solid black;
    padding: 10px;
    text-align: center;
}

.custom-table th {
    background-color: #afc6e9;
    color: #000;
}

/* Hover effect on rows */
.custom-table tbody tr:hover {
    background-color: #ffffff;
}
</style>