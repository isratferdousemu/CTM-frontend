<script>
import { extend, ValidationProvider, ValidationObserver } from "vee-validate";

import { mapActions, mapState } from "vuex";

export default {
    name: "GenerateUrl",
    title: "CTM - Generate URL",
    components: {
        ValidationProvider,
        ValidationObserver,
    },

    data() {
        return {
     
                methods:['GET','POST'],

            data: {
                name: null,
                url: null,
                table: null,
                method:null
            },
        };
    },

    watch: {
        "$i18n.locale": "updateHeaderTitle",
    },

   

    mounted() {
      
        this.updateHeaderTitle();
    },

    methods: {
     

    

        submitUrl() {
            this.$axios
                .post("admin/api-url", this.data, {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                })
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
       
        updateHeaderTitle() {
            const title = this.$t("container.system_config.device.add");
            this.$store.commit("setHeaderTitle", title);
        },
    },
};
</script>

<template>
    <div id="device_create">
        <v-row class="mx-5 mt-5">
            <v-col cols="12">
                <v-row>
                    <v-col cols="12">
                        <v-card>
                            <v-card-title class="justify-center">
                                <h4 class="mt-5">
                                    {{ $t("container.api_manager.url_generate.add") }}
                                </h4>
                            </v-card-title>

                            <!-- <v-divider></v-divider> -->

                            <v-card-text class="mt-5">
                                <ValidationObserver ref="form" v-slot="{ invalid }">
                                    <v-form v-on:submit.prevent="submitUrl()">

                                        <v-row>
                                            <v-col cols="12" sm="3" lg="3">
                                                <ValidationProvider name="Name" vid="name" rules="required"
                                                    v-slot="{ errors }">
                                                    <v-text-field type="text" v-model="data.name" :label="$t('container.api_manager.url_generate.name')
                                        " persistent-hint outlined :error="errors[0] ? true : false"
                                                        :error-messages="errors[0]"></v-text-field>
                                                </ValidationProvider>
                                            </v-col>
                                            <v-col cols="12" sm="3" lg="3">
                                                <ValidationProvider name="URL" vid="url" rules="required"
                                                    v-slot="{ errors }">
                                                    <v-text-field type="text" v-model="data.url" :label="$t('container.api_manager.url_generate.url')
                                        " persistent-hint outlined :error="errors[0] ? true : false"
                                                        :error-messages="errors[0]"></v-text-field>
                                                </ValidationProvider>
                                            </v-col>
                                            <v-col cols="12" sm="3" lg="3">
                                                <ValidationProvider name="Table Name" vid="url" rules="required"
                                                    v-slot="{ errors }">
                                                    <v-text-field type="text" v-model="data.table" :label="$t('container.api_manager.url_generate.table_name')
                                        " persistent-hint outlined :error="errors[0] ? true : false"
                                                        :error-messages="errors[0]"></v-text-field>
                                                </ValidationProvider>
                                            </v-col>
                                            <v-col cols="12" sm="3" lg="3">
                                                <ValidationProvider name="Method" vid="methods" rules="required"
                                                    v-slot="{ errors }">
                                                    <v-autocomplete v-model="data.method" :label="$t('container.api_manager.url_generate.method')
                                        " persistent-hint outlined :error="errors[0] ? true : false"
                                                        :error-messages="errors[0]" :items="methods"></v-autocomplete>
                                                </ValidationProvider>
                                            </v-col>




                                        </v-row>
                                        <v-row class="justify-end mt-5 mb-5">
                                            <v-btn flat color="primary" class="custom-btn mr-2" router
                                                to="/api-manager/url-generate">{{
                                                $t("container.list.back") }}
                                            </v-btn>
                                            <v-btn flat color="success" type="submit" class="custom-btn mr-2"
                                                :disabled="invalid">
                                                {{ $t("container.list.submit") }}
                                            </v-btn>
                                        </v-row>
                                    </v-form>
                                </ValidationObserver>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </div>
</template>

<style scoped></style>