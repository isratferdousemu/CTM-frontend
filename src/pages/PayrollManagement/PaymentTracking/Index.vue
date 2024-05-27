<style>
.small-text {
    font-size: 9px;
}

.no-striped-table .v-simple-table tbody tr:nth-child(even) {
    background-color: transparent;
}

.custom-title {
    background-color: #4CAF50;
    color: white;
    padding: 10px;
}
</style>

<template>
    <div id="application_tracking">
        <v-row class="ma-5">
            <v-col cols="12">
                <v-row>
                    <v-col cols="12">
                    </v-col>
                    <v-col cols="12">
                        <v-card elevation="0">
                            <v-card-text>
                                <v-row class="ma-5">
                                    <v-col cols="12" lg="4" md="4">
                                        <v-radio-group required row v-model="data.tracking_type">
                                            <label class="mr-5">Application Tracking</label>
                                            <v-radio label="NBR" value="1"></v-radio>
                                            <v-radio label="Tracking No" value="2"></v-radio>
                                        </v-radio-group>
                                    </v-col>
                                    <v-col cols="12" lg="6" md="6">
                                        <br>
                                        <div v-if="data.tracking_type == 2">
                                            <label>Tracking No</label>
                                            <v-text-field v-model="data.tracking_no" outlined clearable></v-text-field>
                                        </div>
                                        <div v-if="data.tracking_type == 1">
                                            <v-row>
                                                <v-col>
                                                    <label>NBR</label>
                                                    <v-text-field outlined clearable v-model="data.nid"></v-text-field>
                                                </v-col>
                                                <v-col>
                                                    <label>Date of Birth</label>
                                                    <v-text-field outlined clearable v-model="data.date_of_birth" type="date"></v-text-field>
                                                </v-col>
                                            </v-row>
                                        </div>
                                    </v-col>
                                    <v-col cols="12" lg="2" md="2">
                                        <br>
                                        <br>
                                        <div class="text-right">
                                            <v-btn type="submit" flat color="success" class="custom-btn-width white--text py-2">
                                                <span class="mdi mdi-television mr-2"></span>
                                                Preview
                                            </v-btn>
                                        </div>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col cols="12">
                        <v-card elevation="0">
                            <v-card-text>
                                <v-row dense class="ml-5">
                                    <v-col cols="12">
                                        <h4 style="color: blue !important;">Payment Details</h4>
                                        <br>
                                        <hr style="border-top: 1px solid gray; width: 40%;">
                                        <br>
                                        <h4>Beneficiary Details</h4>
                                    </v-col>
                                </v-row>
                                <v-row dense class="ml-5">
                                    <v-col cols="12">
                                        <b>ID:</b> 1234567890
                                    </v-col>
                                    <v-col cols="12">
                                        <b>Name:</b> Shohorab Ahmed
                                    </v-col>
                                    <v-col cols="12">
                                        <b>Address:</b> Dhaka North
                                    </v-col>
                                </v-row>
                                <v-row class="ma-1">
                                    <v-col cols="12" lg="12" md="12">
                                        <v-card elevation="0">
                                            <v-card-title class="custom-title">
                                                <h5 class="text-center">Application Status</h5>
                                            </v-card-title>
                                            <v-card-text>
                                                <br>
                                                <table style="margin: 0 auto; width: 100%; font-size: 12px;">
                                                    <tbody>
                                                        <tr>
                                                            <td>Application Accepted</td>
                                                            <td>
                                                                <v-timeline>
                                                                    <v-timeline-item color="#26A69A" icon="mdi-check"></v-timeline-item>
                                                                </v-timeline>
                                                            </td>
                                                            <td>Your application is accepted</td>
                                                            <td>Time: 10:00 AM<br>Date: 01/01/2024<br>Days Taken: 0</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Primarily Verification</td>
                                                            <td>
                                                                <v-timeline>
                                                                    <v-timeline-item color="#26A69A" icon="mdi-check"></v-timeline-item>
                                                                </v-timeline>
                                                            </td>
                                                            <td>Your application is included in the Verification list</td>
                                                            <td>Time: 11:00 AM<br>Date: 01/01/2024<br>Days Taken: 1</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Ward/Union/Pouroshava Committee</td>
                                                            <td>
                                                                <v-timeline>
                                                                    <v-timeline-item color="#FF6F00" icon="mdi-clock"></v-timeline-item>
                                                                </v-timeline>
                                                            </td>
                                                            <td>Your application has been forwarded to the Ward/Union/Pouroshava Committee</td>
                                                            <td>Time: 12:00 PM<br>Date: 02/01/2024<br>Days Taken: 1</td>
                                                        </tr>
                                                        <tr>
                                                            <td>District Pourashava/Upazila/City Corporation Committee</td>
                                                            <td>
                                                                <v-timeline>
                                                                    <v-timeline-item color="#FFEA00" icon="mdi-alert"></v-timeline-item>
                                                                </v-timeline>
                                                            </td>
                                                            <td>Your application has been forwarded to the District Pouroshava/Upazila/City Corporation Committee</td>
                                                            <td>Time: 01:00 PM<br>Date: 03/01/2024<br>Days Taken: 1</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Waiting List</td>
                                                            <td>
                                                                <v-timeline>
                                                                    <v-timeline-item color="grey" icon="mdi-check"></v-timeline-item>
                                                                </v-timeline>
                                                            </td>
                                                            <td>Your application has been included in the waiting list</td>
                                                            <td>Time: 02:00 PM<br>Date: 04/01/2024<br>Days Taken: 1</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Final Selection List</td>
                                                            <td>
                                                                <v-timeline>
                                                                    <v-timeline-item color="#26A69A" icon="mdi-check"></v-timeline-item>
                                                                </v-timeline>
                                                            </td>
                                                            <td>Congratulations, you have been finally selected to receive the allowance</td>
                                                            <td>Time: 03:00 PM<br>Date: 05/01/2024<br>Days Taken: 1</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </v-card-text>
                                        </v-card>
                                    </v-col>
                                    <v-row class="justify-end mt-2">
                                        <v-col cols="4" md="1" lg="1">
                                            <v-icon color="#26A69A">mdi-circle</v-icon>
                                            <span>Completed</span>
                                        </v-col>
                                        <v-col cols="4" md="1" lg="1">
                                            <v-icon color="#FFEB3B">mdi-circle</v-icon>
                                            <span>Process Running</span>
                                        </v-col>
                                        <v-col cols="4" md="1" lg="1">
                                            <v-icon color="#757575">mdi-circle</v-icon>
                                            <span>Future Program</span>
                                        </v-col>
                                    </v-row>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    name: 'FrontendIndex',
    data() {
        return {
            data: {
                tracking_no: null,
                nid: null,
                date_of_birth: null,
                tracking_type: 2
            }
        };
    }
};
</script>
