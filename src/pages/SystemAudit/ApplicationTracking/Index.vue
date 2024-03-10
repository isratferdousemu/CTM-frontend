
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
    background-color: #4CAF50;
    /* Set your desired background color */
    color: white;
    /* Set the text color */
    padding: 10px;
    /* Adjust padding as needed */
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
                                    <v-col cols="12" lg="3" md="6">
                                     <span class="mr-5">{{ $t('container.system_audit.application_tracking') }} Number</span>
                                        <!-- <v-radio-group required row>
                                            <span class="mr-5">{{ $t('container.system_audit.application_tracking')
                                            }}</span>
                                            <v-radio :label="$t('container.system_audit.nbr')" :value="1"></v-radio>
                                            <v-radio :label="$t('container.system_audit.tracking_no')" :value="2"></v-radio>
                                        </v-radio-group> -->
                                    </v-col>
                                    <v-col cols="12" lg="6" md="3">
                                        <v-text-field v-model="data.tracking_no" outlined clearable></v-text-field>
                                    </v-col>
                                    <v-col cols="12" lg="3" md="3">



                                        <v-btn type="submit" flat color="success" :disabled="invalid" :loading="loading"
                                            class="custom-btn-width  white--text py-2" @click="applicationTracking()">
                                            {{ $t("container.list.preview") }}
                                        </v-btn>


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
                                            <h2 style="text-decoration: underline">{{ tracking_details.program?.name_en }}</h2>
                                            <h2>Applicant Details</h2>

                                            <tr v-for="data in tracking_summary">
                                                <td><b>{{ data.name }}</b></td>
                                                <td><b>:</b>{{ data.value }}</td>
                                            </tr>

                                        </table>

                                    </v-col>
                                    <v-col cols="12" lg="9" md="9">
                                        <v-card elevation="0">
                                            <v-card-title class="custom-title">
                                                <h3 class="text-center">{{ $t('container.system_audit.application_status')
                                                }}</h3>
                                            </v-card-title>
                                            <v-card-text>
                                                <table>
                                                    <tbody>

                                                        <tr v-for="item in tracking" :key="item.name">
                                                            <td>{{ item.name }}</td>
                                                            <td>

                                                                <v-timeline>

                                                                    <v-timeline-item :color="getTimelineColor(item.status)"
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

<script>
export default {
    name: 'FrontendIndex',

    data() {
        return {
            data: {
                tracking_no: null,
            },
            tracking_details: [],
            // tracking_details: {
            //     status: 'completed'
            // },
            localDate: null,
            localTime:null,
            tracking:[],
            // tracking: [
            //     {
            //         icon: 'mdi mdi-check',
            //         name: 'Application Accepted',
            //         state: 'Your application is accepted',
            //         date_time: 'Time: 04:05:52 PM Date: 11 - 10 - 2023',
            //         status: this.tracking_details?.status ? 2 : 'completed'
            //     },
            //     {
            //         icon: 'mdi mdi-check',
            //         name: 'Primarily Verification',
            //         state: 'Your application is included to Verification list Allotted for execution Time / day     : 1 minute Estimated Execution Time / day       : 2 days',
            //         date_time: 'Time: 04:05:52 PM Date: 11 - 10 - 2023',
            //         status: this.tracking_details?.status?1:'completed',
            //     },
            //     {
            //         icon: 'mdi mdi-check',
            //         name: 'Union/Pouroshava Committee',
            //         state: 'Your application has been forwarded to the Union / pouroshava CommitteeAllotted for execution Time / day     : 1 minute Estimated Execution Time / day       : 2 days',
            //         date_time: 'Time: 04:05:52 PM Date: 11 - 10 - 2023',
            //         status: this.tracking_details?.status ? 1 : 'completed'
            //     },
            //     {
            //         icon: 'mdi mdi-check',
            //         name: 'Upazila/City Corporation Committee',
            //         state: 'Your application has been forwarded to the Upazila/City Corporation Committee Allotted for execution Time / day     : 1 minute Estimated Execution Time / day       : days',
            //         date_time: 'Time: 04:05:52 PM Date: 11 - 10 - 2023',
            //         status: this.tracking_details?.status ? 1 : 'waiting'
            //     },
            //     {
            //         icon: 'mdi mdi-check',
            //         name: 'Waiting List',
            //         state: 'Your application has been included in the waiting list Allotted for execution Time / day     : 1 minute Estimated Execution Time / day       : 2 days',
            //         date_time: 'Time: 04:05:52 PM Date: 11 - 10 - 2023',
            //         status: this.tracking_details?.status ? 1 : 'waiting'
            //     },
            //     {
            //         icon: 'mdi mdi-check',
            //         name: 'Final Selection List',
            //         state: 'Congratulations, you have been finally selected to receive the allowance Allotted for execution Time / day     : 1 minute Estimated Execution Time / day       : 2 days',
            //         date_time: 'Time: 04:05:52 PM Date: 11 - 10 - 2023',
            //         status: this.tracking_details?.status ? 1 : 'waiting'
            //     },

            // ],
            legends: [
                { status: 'completed', icon: 'mdi-check', color: '#26A69A', label: 'Completed' },
                { status: 'rejected', icon: 'mdi-close', color: '#E53935', label: 'Rejected' },
                { status: 'waiting', icon: 'mdi-clock', color: '#FF6F00', label: 'Waiting' },
                { status: 'pending', icon: 'mdi-alert', color: '#FFEA00', label: 'Pending' },
            ],
            // tracking_summary:{},
            tracking_summary: [
                { name: 'National ID/Birth Registration No', value: '' },
                { name: 'Application Time', value: '' },
                { name: 'Application Date', value:  ''},
                { name: 'Office', value: '' },
                { name: 'Tracking No', value: '' },


            ],

        };
    },
    // computed: {
    //    computedColor() {
    //         return this.getTimelineColor(this.tracking_details.status);
    //     },
    //     computedIcon() {
    //         return this.getTimelineIcon(this.tracking_details.status);
    //     }
    // },


    methods: {

        applicationTracking() {
            let data = {
                tracking_no: this.data.tracking_no,
            };
            this.$axios.post("global/applicants_tracking", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json",
                },
            }).then((response) => {
                this.tracking_details = response.data.data;

              // Format the date to local date and time
               const dateTime = new Date(response.data.data.created_at);
                this.localDate = dateTime.toLocaleDateString();
                this.localTime = dateTime.toLocaleTimeString();

             // Update tracking_summary dynamically
              this.tracking_summary=[
                    { name: 'National ID/Birth Registration No', value: this.tracking_details?.verification_number },
                    { name: 'Application Time', value: this.localTime },
                    { name: 'Application Date', value: this.localDate },
                    { name: 'Office', value: this.tracking_details?.permanent_address },
                    { name: 'Tracking No', value: this.tracking_details?.application_id  },
                ];
                // this.getTimelineColor(this.tracking_details?.status)

                 this.tracking= [
                    {
                        icon: 'mdi mdi-check',
                        name: 'Application Accepted',
                        state: 'Your application is accepted',
                        date_time: 'Time: 04:05:52 PM Date: 11 - 10 - 2023',
                        status: this.tracking_details?.status ? 2 : 'completed'
                    },
                    {
                        icon: 'mdi mdi-check',
                        name: 'Primarily Verification',
                        state: 'Your application is included to Verification list Allotted for execution Time / day     : 1 minute Estimated Execution Time / day       : 2 days',
                        date_time: 'Time: 04:05:52 PM Date: 11 - 10 - 2023',
                        status: this.tracking_details?.status ? 1 : 'completed',
                    },
                    {
                        icon: 'mdi mdi-check',
                        name: 'Union/Pouroshava Committee',
                        state: 'Your application has been forwarded to the Union / pouroshava CommitteeAllotted for execution Time / day     : 1 minute Estimated Execution Time / day       : 2 days',
                        date_time: 'Time: 04:05:52 PM Date: 11 - 10 - 2023',
                        status: this.tracking_details?.status ? 1 : 'completed'
                    },
                    {
                        icon: 'mdi mdi-check',
                        name: 'Upazila/City Corporation Committee',
                        state: 'Your application has been forwarded to the Upazila/City Corporation Committee Allotted for execution Time / day     : 1 minute Estimated Execution Time / day       : days',
                        date_time: 'Time: 04:05:52 PM Date: 11 - 10 - 2023',
                        status: this.tracking_details?.status ? 1 : 'waiting'
                    },
                    {
                        icon: 'mdi mdi-check',
                        name: 'Waiting List',
                        state: 'Your application has been included in the waiting list Allotted for execution Time / day     : 1 minute Estimated Execution Time / day       : 2 days',
                        date_time: 'Time: 04:05:52 PM Date: 11 - 10 - 2023',
                        status: this.tracking_details?.status ? 1 : 'waiting'
                    },
                    {
                        icon: 'mdi mdi-check',
                        name: 'Final Selection List',
                        state: 'Congratulations, you have been finally selected to receive the allowance Allotted for execution Time / day     : 1 minute Estimated Execution Time / day       : 2 days',
                        date_time: 'Time: 04:05:52 PM Date: 11 - 10 - 2023',
                        status: this.tracking_details?.status ? 1 : 'waiting'
                    },

                ];
                 
                console.log(this.tracking_details);

            }).catch((error) => {
                console.log(error);
            });

        },
        getTimelineColor(status) {
            console.log('11color');
            console.log(status);
            switch (status) {
                case 'completed':
                    return '#26A69A';
                case 'waiting':
                    return '#E53935';
                case 'pending':
                    return '#FF6F00';
                case 'rejected':
                    return '#FFEA00';
                default:
                    return 'grey';
            }
        },
        getTimelineIcon(status) {
            switch (status) {
                case 'completed':
                    return 'mdi-check';
                case 'waiting':
                    return '#mdi-close';
                case 'pending':
                    return 'mdi-clock';
                case 'rejected':
                    return 'mdi-alert';
                default:
                    return 'mdi-check';
            }
        },


    },
};
</script>