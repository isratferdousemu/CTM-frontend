<script>
export default {
    name: 'FrontendIndex',

    data() {
        return {
        data:{
            tracking_type:1

        },
            tracking: [
                {
                    icon: 'mdi mdi-check',
                    name: 'Application Accepted',
                    state: 'Your application is received',
                    date_time:'Time: 04:05:52 PM Date: 11 - 10 - 2023',
                    status:'completed'
                },
                  {
                    icon: 'mdi mdi-check',
                    name: 'Primarily Verification',
                    state: 'Your application is included to Verification list Allotted for execution Time / day     : 1 minute Estimated Execution Time / day       : 2 days',
                    date_time: 'Time: 04:05:52 PM Date: 11 - 10 - 2023',
                    status: 'completed'
                },
                 {
                    icon: 'mdi mdi-check',
                    name: 'Union/Pouroshava Committee',
                    state: 'Your application has been forwarded to the Union / pouroshava CommitteeAllotted for execution Time / day     : 1 minute Estimated Execution Time / day       : 2 days',
                    date_time: 'Time: 04:05:52 PM Date: 11 - 10 - 2023',
                    status: 'completed'
                },
                   {
                    icon: 'mdi-timer-sand',
                    name: 'Upazila/City Corporation Committee',
                    state: 'Your application has been forwarded to the Upazila/City Corporation Committee Allotted for execution Time / day     : 1 minute Estimated Execution Time / day       : days',
                    date_time: 'Time: 04:05:52 PM Date: 11 - 10 - 2023',
                    status: 'waiting'
                },
                 {
                    icon: 'mdi mdi-check',
                    name: 'Waiting List',
                    state: 'Your application has been included in the waiting list Allotted for execution Time / day     : 1 minute Estimated Execution Time / day       : 2 days',
                    date_time: 'Time: 04:05:52 PM Date: 11 - 10 - 2023',
                    status: 'pending'
                },
                {
                    icon: 'mdi mdi-check',
                    name: 'Final Selection List',
                    state: 'Congratulations, you have been finally selected to receive the allowance Allotted for execution Time / day     : 1 minute Estimated Execution Time / day       : 2 days',
                    date_time: 'Time: 04:05:52 PM Date: 11 - 10 - 2023',
                    status: 'pending'
                },
               
            ],
             legends: [
                { status: 'completed', icon: 'mdi-check', color: '#26A69A', label: 'Completed' },
            
                 { status: 'waiting', icon: 'mdi-timer-sand', color: '#FFD600', label: 'Inprogress' },
                 { status: 'pending', icon: 'mdi-clock', color: '#757575', label: 'Future Proram' },
            ],
             tracking_summary: [
                { name: 'National ID/Birth Registration No', value: '2234897899412' },
                { name: 'Application Time', value: '04:05:52'},
                { name: 'Application Date', value: '2023-10-04' },
                { name: 'Office', value: 'Head Office'},
                { name: 'Tracking No', value: '2234897899412' },
           
       
            ],

        };
    },

    mounted() {

    },

    methods: {
       
           getTimelineColor(status) {
            switch (status) {
                case 'completed':
                    return '#26A69A';
                case 'rejected':
                    return '#E53935';
                case 'waiting':
                    return '#FFD600';
                case 'pending':
                    return '#616161';
                default:
                    return 'grey';
            }
        },
            getTimelineIcon(status) {
            switch (status) {
                case 'completed':
                    return 'mdi-check';
                case 'rejected':
                    return '#mdi-close';
                case 'waiting':
                    return 'mdi-timer-sand';
                case 'pending':
                    return 'mdi-clock';
                default:
                    return 'grey';
            }
        },
        

    },
};
</script>
<style>
.small-text {
    font-size: 9px;
    /* Adjust the font size as needed */
}

.no-striped-table .v-simple-table tbody tr:nth-child(even) {
    background-color: transparent;
    /* Set the background color to transparent for even rows */
}
.custom-title {
  background-color: #4CAF50; /* Set your desired background color */
  color: white; /* Set the text color */
  padding: 10px; /* Adjust padding as needed */
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
                                            <label class="mr-5">{{ $t('container.system_audit.application_tracking')
                                                }}</label>
                                            <v-radio :label="$t('container.system_audit.nbr')" :value="1"></v-radio>
                                            <v-radio :label="$t('container.system_audit.tracking_no')"
                                                :value="2"></v-radio>
                                        </v-radio-group>
                                    </v-col>
                                    <v-col cols="12" lg="4" md="4" v-if="data.tracking_type == 2">
                                        <br>
                                        <label>{{ $t('container.system_audit.application_tracking')
                                            }}</label>
                                        <v-text-field outlined clearable></v-text-field>
                                    </v-col>

                                    <v-col cols="12" lg="4" md="4" v-if="data.tracking_type == 1">
                                        <br>
                                        <v-row>
                                            <v-col> <label>{{ $t('container.system_audit.nbr')
                                                    }}</label>
                                                <v-text-field outlined clearable></v-text-field></v-col>
                                        </v-row>
                                        <v-col> <label>{{
    $t('container.application_selection.application.date_of_birth')
                                                }}</label>
                                            <v-text-field outlined clearable type="date"></v-text-field></v-col>

                                    </v-col>
                                    <v-col cols="12" lg="4" md="4">
                                        <br>
                                        <div class="text-right">
                                            <v-btn type="submit" flat color="success" :disabled="invalid"
                                                :loading="loading" class="custom-btn-width white--text py-2">
                                                <span class="mdi mdi-television mr-2"></span> <!-- Icon -->
                                                {{ $t("container.list.preview") }}
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
                                <v-row class="ma-1">
                                    <v-col cols="12" lg="3" md="3">
                                        <table class="small-text">
                                            <h3 style="text-decoration: underline">Disability Allowance</h3>
                                            Details

                                            <tr v-for="item in tracking_summary" :key="item.name">
                                                <td><b>{{ item.name }}</b></td>

                                                <td><b>:</b>{{ item.value }}</td>
                                            </tr>

                                        </table>

                                    </v-col>
                                    <v-col cols="12" lg="9" md="9">
                                        <v-card elevation="0">
                                            <v-card-title class="custom-title">
                                                <h3 class="text-center">{{
                                                    $t('container.system_audit.application_status')
                                                    }}</h3>
                                            </v-card-title>
                                            <v-card-text>
                                                <table>
                                                    <tbody>

                                                        <tr v-for="item in tracking" :key="item.name">
                                                            <td>{{ item.name }}</td>
                                                            <td>

                                                                <v-timeline>

                                                                    <v-timeline-item
                                                                        :color="getTimelineColor(item.status)"
                                                                        :icon="getTimelineIcon(item.status)"></v-timeline-item>
                                                                </v-timeline>
                                                            </td>
                                                            <td>{{ item.state }}</td>
                                                            <td>{{ item.date_time }}</td>
                                                        </tr>

                                                    </tbody>

                                                </table>

                                            </v-card-text>
                                        </v-card>
                                    </v-col>
                                    <v-row class="justify-end mt-2">
                                        <v-col v-for="legend in legends" :key="legend.status" cols="4" md="1" lg="1">
                                            <v-icon :color="legend.color">{{ legend.icon }}</v-icon>
                                            <span>{{ legend.label }}</span>
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