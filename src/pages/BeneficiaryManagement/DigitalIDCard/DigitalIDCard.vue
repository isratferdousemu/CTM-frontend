<template>
    <div id="digital_id">
        <v-row justify="center" class="mt-5">
            <v-col lg="6" md="6" cols="12">
                <v-card width="500" class="mx-5">
                    <v-card-title></v-card-title>
                    <v-card-text>
                        <v-img class="absolute top-0 left-10 mb-5" style="width: 50px; height: 50px;"
                            src="/assets/images/logo.png"></v-img>
                         
                        <div justify-center>
                            <table>
                                <tr>
                                    <td>Beneficiary's Name</td>
                                    <td>: Mousumi Akter</td>
                                </tr>
                                <tr>
                                    <td>Beneficiary ID</td>
                                    <td>:</td>
                                </tr>
                                <tr>
                                    <td>Date of Birth</td>
                                    <td>:</td>
                                </tr>
                                <tr>
                                    <td>Address</td>
                                    <td>:House- 6/2, (Level: 4 & 6) Kazi Nazrul Islam Road, Block- F, Dhaka 1207</td>
                                </tr>
                            </table>
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    name: 'dDigitalIDCard',
    title: "CTM - Digital ID Card",

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