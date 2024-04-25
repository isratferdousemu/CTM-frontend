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
            loading: false,

            methods: ['GET', 'POST'],
            dialogEmail:false,
            email_id: "",

            data: {
                name: null,
                url: null,
                table: null,
                method: null
            },
        };
    },
    computed:{
        headers() {
            return [
                { text: this.$t('container.list.sl'), value: "id", align: "start", sortable: false, width: "15%" },
                { text: this.$t('container.api_manager.api_generate.api_name'), value: "name", width: "20%" },
                { text: this.$t('container.api_manager.api_generate.parameter'), value: "selected_columns", width: "45%" },
                { text: this.$t('container.api_manager.url_generate.url'), value: "api_url", width: "20%" },
            
            ];
        },
        language: {
            get() {
                return this.$store.getters.getAppLanguage;
            }
        },
    },

    watch: {
        "$i18n.locale": "updateHeaderTitle",
    },



    mounted() {
        this.ReceiverView();


    },

    methods: {
        sendEmail() {
            this.$axios
                .get(`/admin/api-manager/send-email/${this.email_id}`, {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },


                })
                .then((result) => {

                    this.$toast.success(result?.data?.data);
                    this.dialogEmail = false





                })
                .catch(error => {
                    console.error('Error generating PDF:', error);
                });
        },
        emailAlert(id) {
            this.dialogEmail = true;
            this.email_id = this.$route.params.id;
        },


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

        ReceiverView() {
            console.log(this.$route.params.id, "params")
            this.$axios
                .get(`admin/api-data-receive/${this.$route.params.id}`, {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((result) => {
                    console.log(result, "result")
                    this.data = result?.data?.data
                    const parts = this.data.start_date.split(" ");
                    const datePart = parts[0];
                    this.data.start_date = datePart;
                    const parts_2 = this.data.end_date.split(" ");
                    const datePart_2 = parts_2[0];
                    this.data.end_date = datePart_2;

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
                            <v-card-title class="justify-center ">
                                <h4 class="mt-5">
                                    {{ $t("container.api_manager.data_receiver.view") }}
                                </h4>
                            </v-card-title>

                            <!-- <v-divider></v-divider> -->

                            <v-card-text class="mt-10">

                                <v-row>
                                    <v-col ols="12" sm="12" lg="12">
                                        <v-row class="my-custom-row ma-5">
                                            <v-col cols="12" sm="3" lg="3">
                                                <b>{{ $t('container.api_manager.data_receiver.organization') }}</b>:
                                            </v-col>
                                            <v-col cols="12" sm="9" lg="9">
                                                <b>:</b> <span class="ml-2">{{ data.organization_name }}</span>

                                            </v-col>
                                            <v-col cols="12" sm="3" lg="3">
                                                <b>{{ $t('container.api_manager.data_receiver.phone') }}</b>

                                            </v-col>
                                            <v-col cols="12" sm="9" lg="9">
                                                <b>:</b>
                                                <span class="ml-2">{{ data.organization_phone
                                                    }}</span>

                                            </v-col>
                                            <v-col cols="12" sm="3" lg="3">
                                                <b>{{ $t('container.api_manager.data_receiver.email') }}</b>

                                            </v-col>
                                            <v-col cols="12" sm="9" lg="9">
                                                <b>:</b> <span class="ml-2">{{
                                                    data?.organization_email }}</span>

                                            </v-col>


                                            <v-col cols="12" sm="3" lg="3">
                                                <b>{{ $t('container.api_manager.data_receiver.responsible_person_email')
                                                    }}</b>

                                            </v-col>
                                            <v-col cols="12" sm="9" lg="9">
                                                <b>:</b>
                                                <!-- <v-chip v-for="(item, index) in data.selected_columns" :key="index"
                                                    class="ml-2 mt-2">
                                                    {{ item }}
                                                </v-chip> -->
                                                <span class="ml-2">{{
                                                    data?.responsible_person_email }}</span>

                                            </v-col>
                                            <v-col cols="12" sm="3" lg="3">
                                                <b>{{ $t('container.api_manager.data_receiver.responsible_person_nid')
                                                    }}</b>

                                            </v-col>
                                            <v-col cols="12" sm="9" lg="9">
                                                <b>:</b>

                                                <span class="ml-2">{{
                                                    data?.responsible_person_nid }}</span>

                                            </v-col>
                                            <v-col cols="12" sm="3" lg="3">
                                                <b>{{ $t('container.api_manager.data_receiver.user_name')
                                                    }}</b>

                                            </v-col>
                                            <v-col cols="12" sm="9" lg="9">
                                                <b>:</b>

                                                <span class="ml-2">{{
                                                    data?.username }}</span>

                                            </v-col>
                                            <v-col cols="12" sm="3" lg="3">
                                                <b>{{ $t('container.api_manager.data_receiver.api_key')
                                                    }}</b>

                                            </v-col>
                                            <v-col cols="12" sm="9" lg="9">
                                                <b>:</b>

                                                <span class="ml-2">{{
                                                    data?.api_key }}</span>

                                            </v-col>
                                            <v-col cols="12" sm="3" lg="3">
                                                <b>{{ $t('container.api_manager.data_receiver.ip')
                                                    }}</b>

                                            </v-col>
                                            <v-col cols="12" sm="9" lg="9">
                                                <b>:</b>

                                                <span class="ml-2">{{
                                                    data?.whitelist_ip }}</span>

                                            </v-col>
                                            <v-col cols="12" sm="3" lg="3">
                                                <b>{{ $t('container.api_manager.data_receiver.start_date')
                                                    }}</b>

                                            </v-col>
                                            <v-col cols="12" sm="9" lg="9">
                                                <b>:</b>

                                                <span class="ml-2">{{
                                                    data?.start_date }}</span>

                                            </v-col>
                                            <v-col cols="12" sm="3" lg="3">
                                                <b>{{ $t('container.api_manager.data_receiver.end_date')
                                                    }}</b>

                                            </v-col>
                                            <v-col cols="12" sm="9" lg="9">
                                                <b>:</b>

                                                <span class="ml-2">{{
                                                    data?.end_date }}</span>

                                            </v-col>




                                            <v-col cols="12" sm="3" lg="3">
                                                <b>{{ $t('container.api_manager.data_receiver.total_heat')
                                                    }}</b>

                                            </v-col>
                                            <v-col cols="12" sm="9" lg="9">
                                                <b>:</b>

                                                <span class="ml-2">{{
                                                    data?.total_hit }}</span>

                                            </v-col>
                                        </v-row>

                                        <v-card-title v-if="data.api_list" class="justify-center black--text">
                                            <h5 class="mt-5">
                                                {{ $t("container.api_manager.api_generate.api_view") }}
                                            </h5>
                                        </v-card-title>




                                        <v-data-table :loading="loading" item-key="id" :headers="headers"
                                            v-if="data.api_list" :items="data?.api_list" hide-default-footer
                                            class="elevation-0 transparent row-pointer mt-5 mx-5 ">
                                            <template v-slot:item.id="{ item, index }">

                                                {{ language === 'bn' ? $helpers.englishToBangla(

                                                index +1) : index+1}}




                                            </template>



                                            <template v-slot:item.selected_columns="{ item }">

                                                <span v-for="(value, key) in item.selected_columns" :key="key">
                                                    <v-chip small label color="#FACD91" class="ma-1">
                                                        {{ value }}
                                                    </v-chip> &nbsp;


                                                </span>


                                            </template>
                                            <template v-slot:item.api_url="{ item }">

                                                {{ item?.purpose?.url }}


                                            </template>







                                        </v-data-table>

                                    </v-col>
                                </v-row>

                                <v-row class="justify-end mt-5 mb-5 mr-5">
                                    <v-btn flat color="primary" class="custom-btn mr-2" router
                                        to="/api-manager/data-receiver">{{
                                        $t("container.list.back") }}
                                    </v-btn>
                                    <v-btn @click="emailAlert()" flat color="cyan darken-4"
                                        class="custom-btn mr-2 white--text">{{
                                        $t("container.list.email") }}
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
        <!-- Mail modal  -->
        <v-dialog v-model="dialogEmail" width="350">
            <v-card style="justify-content: center; text-align: center">
                <v-card-title class="font-weight-bold justify-center">
                    {{ $t('container.api_manager.data_receiver.email_header') }}
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <div class="subtitle-1 font-weight-medium mt-5">
                        {{ $t('container.api_manager.data_receiver.email_alert') }}


                    </div>
                </v-card-text>
                <v-card-actions style="display: block">
                    <v-row class="mx-0 my-0 py-2" justify="center">
                        <v-btn text @click="dialogEmail = false" outlined class="custom-btn-width py-2 mr-10">
                            {{ $t('container.list.cancel') }}
                        </v-btn>

                        <v-btn text @click="sendEmail()" color="white" :loading="delete_loading"
                            class="custom-btn-width warning white--text py-2">
                            {{ $t('container.list.confirm') }}
                        </v-btn>
                    </v-row>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- Mail modal  -->
    </div>
</template>

<style>
.my-custom-row .v-col {
    padding-left: 5px;
    /* Adjust as needed */
    padding-right: 5px;
    /* Adjust as needed */
}
.gradient-background {
    background: linear-gradient(to right, #87CEEB, #ADD8E6, #F0F8FF);
    color: black;
    /* Adjust text color for better contrast */
    border-radius: 10px;
    /* Add rounded corners for a softer look */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    /* Add a subtle shadow for depth */

    /* Add a subtle animation */
    animation: gradient-animation 10s infinite alternate;
}

/* Define the animation */
@keyframes gradient-animation {
    0% {
        background-position: 0% 50%;
    }

    100% {
        background-position: 100% 50%;
    }
}
</style>