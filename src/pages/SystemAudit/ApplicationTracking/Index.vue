<script>
export default {
    name: 'FrontendIndex',

    data() {
        return {

        };
    },

    mounted() {

    },

    methods: {

    },
};
</script>
<template>
    <div id="application_tracking">
        <v-row class="ma-5">
            <v-col cols="12">
                <v-row>
                    <v-col cols="12">

                    </v-col>
                    <v-col cols="12">
                        <v-card>

                            <v-card-text>
                                <v-row class="ma-5">
                                    <v-col cols="12" lg="6" md="6">
                                        <v-radio-group required row>
                                            <span class="mr-5">{{ $t('container.system_audit.application_tracking') }}</span>
                                            <v-radio :label="$t('container.system_audit.nbr')" :value="1"></v-radio>
                                            <v-radio :label="$t('container.system_audit.tracking_no')" :value="2"></v-radio>
                                        </v-radio-group>
                                    </v-col>
                                    <v-col cols="12" lg="3" md="3">
                                        <v-text-field outlined clearable></v-text-field>
                                    </v-col>
                                    <v-col cols="12" lg="3" md="3">



                                        <v-btn type="submit" flat color="success" :disabled="invalid" :loading="loading"
                                            class="custom-btn-width  white--text py-2">
                                            {{ $t("container.list.preview") }}
                                        </v-btn>


                                    </v-col>


                                </v-row>

                            </v-card-text>

                        </v-card>
                    </v-col>
                    <v-col cols="12">
                        <v-card>

                            <v-card-text>
                                <v-row class="ma-5">
                                    <v-col cols="12" lg="3" md="3">
                                        <table>
                                            <tr>
                                                <td>
                                                    National ID/Birth Registration No
                                                </td>
                                                <td>
                                                    :2234897899412
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    Application Time
                                                </td>
                                                <td>
                                                    :04:05:52
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    Application Date
                                                </td>
                                                <td>
                                                    :2023-10-04
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    Office
                                                </td>
                                                <td>
                                                    :Head Office Mirpur, Dhaka
                                                </td>
                                            </tr>

                                        </table>

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