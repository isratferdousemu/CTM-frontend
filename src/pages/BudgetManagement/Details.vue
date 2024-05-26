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
                                <!-- Nominee Information -->
                                <v-card class="mt-5">
                                    <v-card-title style="background-color: #1976d2; color: white">
                                        {{
                                            $t(
                                                "container.budget_management.budget_details_info"
                                            )
                                        }}
                                    </v-card-title>

                                    <v-card-text class="mt-5">
                                        <div class="pa-2 mb-4">
                                            <v-col cols="12">

                                                <v-data-table :loading="loading" item-key="id" :headers="headers"
                                                    :items="divisions" :items-per-page="pagination.perPage"
                                                    hide-default-footer class="elevation-0 transparent row-pointer">
                                                    <template v-slot:item.id="{ item, index }">
                                                        {{
                                                            (pagination.current - 1) * pagination.perPage +
                                                            index +
                                                            1
                                                        }}
                                                    </template>

                                                    <template v-slot:item.name_en="{ item }">
                                                        {{ item.name_en }}
                                                    </template>
                                                    <template v-slot:item.name_bn="{ item }">
                                                        {{ item.name_bn }}
                                                    </template>

                                                    <!-- Action Button -->
                                                    <template v-slot:item.actions="{ item }">
                                                        <v-tooltip top>
                                                            <template v-slot:activator="{ on }">
                                                                <v-btn v-can="'division-edit'" fab x-small v-on="on"
                                                                    color="success" elevation="0"
                                                                    @click="nextPageDataLoad(item)">
                                                                    <v-icon> mdi-arrow-right-bold </v-icon>
                                                                </v-btn>
                                                            </template>
                                                            <span>
                                                                {{ $t("container.list.edit") }}
                                                            </span>
                                                        </v-tooltip>

                                                    </template>
                                                </v-data-table>
                                            </v-col>
                                        </div>
                                    </v-card-text>
                                </v-card>

                                <!-- Nominee Information End -->


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

            divisions: [],
            loading: true,

            pagination: {
                current: 1,
                total: 0,
                perPage: 15,
            },
            sortBy: "name_en",
            sortDesc: false, //ASC
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
                {
                    text: this.$t("container.list.sl"),
                    value: "id",
                    align: "start",
                    sortable: false,
                },
                {
                    text: this.$t("container.system_config.demo_graphic.division.code"),
                    value: "code",
                },
                {
                    text: this.$t(
                        "container.system_config.demo_graphic.division.name_en"
                    ),
                    value: "name_en",
                    class: "highlight-column ",
                },
                {
                    text: this.$t(
                        "container.system_config.demo_graphic.division.name_bn"
                    ),
                    value: "name_bn",
                },
                {
                    // text: this.$t("container.list.action"),
                    value: "actions",
                    align: "center",
                    sortable: false,
                },
            ];
        },

        ...mapState({
            message: (state) => state.Division.success_message,

            // errors: (state) => state.Division.errors,
            // error_status: (state) => state.Division.error_status,
        }),
    },
    components: {
        ValidationProvider,
        ValidationObserver,
        FooterBar,
    },

    methods: {
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
        async GetDivision() {
            const queryParams = {
                perPage: this.pagination.perPage,
                page: this.pagination.current,
                sortBy: this.sortBy,
                sortDesc: this.sortDesc,
            };
            this.$axios
                .get("/admin/division/get", {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                    params: queryParams,
                })
                .then((result) => {
                    this.total = result.data.meta.total;
                    this.divisions = result.data.data;
                    this.pagination.current = result.data.meta.current_page;
                    this.pagination.total = result.data.meta.last_page;
                    this.pagination.grand_total = result.data.meta.total;

                    this.loading = false;
                });
        },
        async nextPageDataLoad(item) {
            this.loading = true;
            this.divisions = [];
            this.GetDivision();
        }
    },

    created() {
        this.getBudgetDetailsById();
        this.GetDivision();
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