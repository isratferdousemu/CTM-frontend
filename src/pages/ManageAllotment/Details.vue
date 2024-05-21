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
                                        {{ $t("container.manage_allotment.allotment_basic_info") }}
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
                                                                {{ allotment?.program.name_en }}
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
                                                                {{ allotment?.financialYear?.financial_year }}
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
                                                                    "container.manage_allotment.area_type"
                                                                )
                                                            }}
                                                        </label></v-col>
                                                    <v-col cols="8" lg="8">
                                                        :<template>
                                                            <span style="20px">
                                                                {{ allotment?.office_area?.name_en }}
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
                                                                    "container.budget_management.allotment_area"
                                                                )
                                                            }}
                                                        </label></v-col>
                                                    <v-col cols="8" lg="8">
                                                        :<template>
                                                            <span style="20px">
                                                                {{ allotment?.allotment_area?.name_en }}
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
                                                                    "container.manage_allotment.regular_beneficiaries"
                                                                )
                                                            }}
                                                        </label></v-col>
                                                    <v-col cols="8" lg="8">
                                                        :<template>
                                                            <span style="20px">
                                                                {{ allotment?.regular_beneficiaries }}
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
                                                                    "container.manage_allotment.additional_beneficiaries"
                                                                )
                                                            }}
                                                        </label></v-col>
                                                    <v-col cols="8" lg="8">
                                                        :<template>
                                                            <span style="20px">
                                                                {{ allotment?.additional_beneficiaries }}
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
                                                                    "container.manage_allotment.total_beneficiaries"
                                                                )
                                                            }}
                                                        </label></v-col>
                                                    <v-col cols="8" lg="8">
                                                        :<template>
                                                            <span style="20px">
                                                                {{ allotment?.total_beneficiaries }}
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
                                                                    "container.budget_management.beneficiary_amount"
                                                                )
                                                            }}
                                                        </label></v-col>
                                                    <v-col cols="8" lg="8">
                                                        :<template>
                                                            <span style="20px">
                                                                {{ allotment?.per_beneficiary_amount }}
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
                                                                    "container.manage_allotment.total_amount"
                                                                )
                                                            }}
                                                        </label></v-col>
                                                    <v-col cols="8" lg="8">
                                                        :<template>
                                                            <span style="20px">
                                                                {{ allotment?.total_amount }}
                                                            </span>
                                                        </template>
                                                    </v-col>
                                                </v-row>
                                            </v-col>

                                        </v-row>
                                    </v-card-text>
                                </v-card>
                                <!-- Budget End -- -->

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
            panel: [0],
            allotment: [],
        };
    },

    computed: {
        language: {
            get() {
                return this.$store.getters.getAppLanguage;
            },
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
            this.$router.push("/allotment");
        },
        async getAllotmentDetailsById() {
            try {
                this.$axios
                    .get(`/admin/allotment/show/${this.$route.params.id}`, {
                        headers: {
                            Authorization: "Bearer " + this.$store.state.token,
                            "Content-Type": "multipart/form-data",
                        },
                    })
                    .then((res) => {
                        if (res.data?.success) {
                            let item = res.data.data;
                            this.allotment = res.data.data;

                        } else {
                            this.$toast.error("Record not found!");
                            this.$router.push({ name: "allotment" });
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

    },

    created() {
        this.getAllotmentDetailsById();
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