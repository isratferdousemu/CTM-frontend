<script>
import { extend, ValidationProvider, ValidationObserver } from "vee-validate";

import { mapActions, mapState } from "vuex";

export default {
    name: "GenerateUrl",
    title: "CTM - View API",
    components: {
        ValidationProvider,
        ValidationObserver,
    },

    data() {
        return {
            loading:false,

            methods: ['GET', 'POST'],

            data: {
                name: null,
                url: null,
                table: null,
                method: null
            },
        };
    },

    watch: {
        "$i18n.locale": "updateHeaderTitle",
    },

    computed: {
        language: {
            get() {
                return this.$store.getters.getAppLanguage;
            }
        },
    },

    mounted() {
        this.APIView();

       
    },

    methods: {




        updateUrl() {
            const formData = new FormData();
            // Append data to FormData object
            formData.append('name', this.data.name);
            formData.append('table', this.data.table);
            formData.append('url', this.data.url);
            formData.append('method', this.data.method);
            formData.append('_method', "PUT");
            console.log("data", this.data);
            this.$axios
                .post(`admin/api-url/${this.$route.params.id}`, formData, {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                }) // Corrected placement of parentheses
                .then((result) => {
                    if (result.data.success == true) {
                        this.$toast.success(result.data.message);
                        this.$router.push("/api-manager/url-generate");
                    } else {
                        this.$refs.form.setErrors(result.data.errors);
                    }
                })
                .catch((err) => {
                    if (this.$refs.formAdd && this.$refs.formAdd.$refs && this.$refs.formAdd.$refs.operator) {
                        this.$refs.formAdd.$refs.operator.setErrors([err.response.data.errors.operator[0]]);
                    } else {
                        console.error('Error setting errors:', err);
                    }
                });
        },

        APIView() {
            console.log(this.$route.params.id, "params")
          this.$axios
              .get(`admin/api-list/${this.$route.params.id}`,  {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((result) => {
                    console.log(result,"result")
                    this.data=result?.data?.data
                    this.data.module = result?.data?.data?.purpose?.api_module_id;
                    this.modules=result?.data?.data?.purpose?.module;
                    console.log(this.modules,"before")
                   
                  
                    console.log(this.modules, "after")

                   
                })
                .catch((err) => {
                    if (this.$refs.formAdd && this.$refs.formAdd.$refs && this.$refs.formAdd.$refs.operator) {

                        this.$refs.formAdd.$refs.operator.setErrors([err.response.data.errors.operator[0]]);
                    } else {
                        console.error('Error setting errors:', err);
                    }

                });

        },

    },
};
</script>

<template>
    <div id="device_create">
        <v-row class="ma-5 ">
            <v-col cols="12">
                <v-row>
                    <v-col cols="12">
                        <v-card>
                            <v-card-title class="justify-center"
                                style="background-color:#1c3b68;color:white;margin-bottom: 17px;">
                                <h4>
                                    {{ $t("container.api_manager.api_generate.api_view") }}
                                </h4>
                            </v-card-title>

                            <!-- <v-divider></v-divider> -->

                            <v-card-text class="mt-5">

                                <v-row>
                                    <v-col ols="12" sm="12" lg="12">
                                        <v-row class="my-custom-row ma-5">
                                            <v-col cols="12" sm="2" lg="2">
                                                <b>{{ $t('container.api_manager.api_generate.api_name') }}</b>:
                                            </v-col>
                                            <v-col cols="12" sm="10" lg="10">
                                                <b>:</b> <span class="ml-2">{{ data.name }}</span>

                                            </v-col>
                                            <v-col cols="12" sm="2" lg="2">
                                                <b>{{ $t('container.api_manager.api_generate.module') }}</b>

                                            </v-col>
                                            <v-col cols="12" sm="10" lg="10">
                                                <b>:</b>
                                                <span class="ml-2" v-if="data.purpose?.module?.name == 'Application & Selection'">
                                                    {{ language == 'bn' && data.purpose?.module?.name == 'Application &
                                                    Selection'
                                                    ? 'আবেদন ও নির্বাচন'
                                                    : data.purpose?.module?.name
                                                    }}
                                                </span>
                                                <span class="ml-2"
                                                    v-if="data.purpose?.module?.name == 'Beneficiary Management'">
                                                    {{ language == 'bn' && data.purpose?.module?.name == 'Beneficiary
                                                    Management'
                                                    ? 'উপকারভোগী ব্যবস্থাপনা'
                                                    : data.purpose?.module?.name
                                                    }}
                                                </span>

                                            </v-col>
                                            <v-col cols="12" sm="2" lg="2">
                                                <b>{{ $t('container.api_manager.api_generate.purpose') }}</b>

                                            </v-col>
                                            <v-col cols="12" sm="10" lg="10">
                                                <b>:</b> <span class="ml-2">{{
                                                    data?.purpose?.purpose }}</span>

                                            </v-col>


                                            <v-col cols="12" sm="2" lg="2">
                                                <b>{{ $t('container.api_manager.api_generate.parameter') }}</b>

                                            </v-col>
                                            <v-col cols="12" sm="10" lg="10">
                                                <b>:</b>
                                                <v-chip v-for="(item, index) in data.selected_columns" :key="index"
                                                    class="ml-2 mt-2">
                                                    {{ item }}
                                                </v-chip>

                                            </v-col>





                                        </v-row>
                                    </v-col>
                                </v-row>

                                <v-row class="justify-end mt-5 mb-5 mr-5">
                                    <v-btn flat color="primary" class="custom-btn mr-2" router
                                        to="/api-manager/api-generate">{{
                                        $t("container.list.back") }}
                                    </v-btn>
                                    <!-- <v-btn flat color="success" type="submit" class="custom-btn mr-2"
                                                :disabled="invalid">
                                                {{ $t("container.list.update") }}
                                            </v-btn> -->
                                </v-row>

                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </div>
</template>

<style >
.my-custom-row .v-col {
    padding-left: 5px;
    /* Adjust as needed */
    padding-right: 5px;
    /* Adjust as needed */
}
</style>