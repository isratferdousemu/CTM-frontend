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



    mounted() {
        this.UrlView();

       
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

        UrlView() {
            console.log(this.$route.params.id, "params")
          this.$axios
              .get(`admin/api-url/${this.$route.params.id}`,  {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((result) => {
                    console.log(result,"result")
                    this.data=result?.data?.data
                   
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
                            <v-card-title class="justify-center">
                                <h4 class="mt-5">
                                    {{ $t("container.api_manager.api_generate.api_view") }}
                                </h4>
                            </v-card-title>

                            <!-- <v-divider></v-divider> -->

                            <v-card-text class="mt-5">

                                <v-row>
                                    <v-col ols="8" sm="8" lg="8">
                                        <v-row class="my-custom-row ma-5">
                                            <v-col cols="3" sm="3" lg="3" style="font-weight: bold;">

                                                <b>{{ $t('container.api_manager.url_generate.name') }}</b>
                                            </v-col>
                                            <v-col cols="3" sm="3" lg="3" style="font-weight: bold;">

                                                :
                                            </v-col>
                                            <v-col cols="2" sm="2" lg="2">

                                                {{ data.name }}
                                            </v-col>
                                            <v-col cols="2" sm="2" lg="2">

                                                <b>{{ $t('container.api_manager.url_generate.url') }}</b>
                                            </v-col>
                                            <v-col cols="2" sm="2" lg="2" style="font-weight: bold;">

                                                :
                                            </v-col>
                                            <v-col cols="2" sm="2" lg="2">
                                                {{ data.url }}
                                            </v-col>
                                            <v-col cols="2" sm="2" lg="2">

                                                <b>{{ $t('container.api_manager.url_generate.table_name') }}</b>
                                            </v-col>
                                            <v-col cols="2" sm="2" lg="2" style="font-weight: bold;">

                                                :
                                            </v-col>
                                            <v-col cols="2" sm="2" lg="2">
                                                {{ data.table }}
                                            </v-col>
                                            <v-col cols="2" sm="2" lg="2">

                                                <b>{{ $t('container.api_manager.url_generate.method') }}</b>
                                            </v-col>
                                            <v-col cols="2" sm="2" lg="2" style="font-weight: bold;">

                                                :
                                            </v-col>
                                            <v-col cols="2" sm="2" lg="2">
                                                {{ data.method }}
                                            </v-col>




                                        </v-row>
                                    </v-col>
                                </v-row>

                                <v-row class="justify-end mt-5 mb-5 mr-5">
                                    <v-btn flat color="primary" class="custom-btn mr-2" router
                                        to="/api-manager/url-generate">{{
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