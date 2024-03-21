data() {
return {
    
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
state: 'Your application is included to Verification list',
date_time: 'Time: 04:05:52 PM Date: 11 - 10 - 2023',
status: 'completed'
},
{
icon: 'mdi mdi-check',
name: 'Ward/Union/Pouroshava Committee',
state: 'Your application has been forwarded to the Union / pouroshava Committee',
date_time: 'Time: 04:05:52 PM Date: 11 - 10 - 2023',
status: 'completed'
},
{
icon: 'mdi-timer-sand',
name: 'Upazila/City Corporation Committee',
state: 'Your application has been forwarded to the Upazila/City Corporation Committee',
date_time: 'Time: 04:05:52 PM Date: 11 - 10 - 2023',
status: 'waiting'
},
{
icon: 'mdi mdi-check',
name: 'Waiting List',
state: 'Your application has been included in the waiting list',
date_time: 'Time: 04:05:52 PM Date: 11 - 10 - 2023',
status: 'pending'
},
{
icon: 'mdi mdi-check',
name: 'Final Selection List',
state: 'Congratulations, you have been finally selected to receive the allowance ',
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
                                    <v-col cols="12" lg="4" md="4">


                                        <v-radio-group required row v-model="data.tracking_type">
                                            <label class="mr-5">{{ $t('container.system_audit.application_tracking')
                                                }}</label>
                                            <v-radio :label="$t('container.system_audit.nbr')" :value="1"></v-radio>
                                            <v-radio :label="$t('container.system_audit.tracking_no')"
                                                :value="2"></v-radio>
                                        </v-radio-group>
                                    </v-col>
                                    <v-col cols="12" lg="6" md="6">
                                        <br>
                                        <div v-if="data.tracking_type == 2">
                                            <label>{{ $t('container.system_audit.application_tracking')
                                                }}</label>
                                            <v-text-field v-model="data.tracking_no" outlined clearable></v-text-field>
                                        </div>
                                        <div v-if="data.tracking_type == 1">
                                            <v-row>
                                                <v-col>
                                                    <label>{{ $t('container.system_audit.nbr') }}</label>
                                                    <v-text-field outlined clearable></v-text-field>
                                                </v-col>

                                                <v-col>
                                                    <label>{{
                                                        $t('container.application_selection.application.date_of_birth')
                                                        }}</label>
                                                    <v-text-field outlined clearable type="date"></v-text-field>
                                                </v-col>
                                            </v-row>
                                        </div>

                                    </v-col>
                                    <v-col cols="12" lg="2" md="2">


                                        <br>
                                        <br>
                                        <div class="text-right">

                                            <v-btn type="submit" flat color="success" :disabled="invalid"
                                                :loading="loading" @click="applicationTracking()"
                                                class="custom-btn-width white--text py-2">
                                                <span class="mdi mdi-television mr-2"></span>
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


                                <v-row>
                                    <v-col cols="12">
                                        <h4 style="text-decoration: underline" class="text--blue">{{
                                            tracking_details.program?.name_en }}</h4>
                                        <h4>Applicant Details</h4>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="4" v-for="data in tracking_summary" :key="data.name">
                                        <b>{{ data.name }}:</b> {{ data.value }}
                                    </v-col>
                                </v-row>

                                <v-row class="ma-1">


                                    <v-col cols="12" lg="12" md="12">
                                        <v-card elevation="0">
                                            <v-card-title class="custom-title">
                                                <h3 class="text-center">{{
                                                    $t('container.system_audit.application_status')
                                                    }}</h3>
                                            </v-card-title>
                                            <v-card-text>
                                                <table style="margin: 0 auto;">
                                                    <tbody>

                                                        <tr v-for="item in tracking" :key="item.name">
                                                            <td style="width: 30%">{{ item.name }}</td>
                                                            <td style="width: 10%">

                                                                <v-timeline>

                                                                    <v-timeline-item
                                                                        :color="getTimelineColor(item.status)"
                                                                        :icon="getTimelineIcon(item.status)">
                                                                    </v-timeline-item>
                                                                </v-timeline>
                                                            </td>
                                                            <td style="width: 50%;">{{ item.state }}</td>
                                                            <td style="width: 10%">Time :{{ item.time }} </br>Date:{{
                                                                item.date }} </br>
                                                                Days Taken:{{ item.daysToken }}</td>
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
                tracking_type: 2,
                data_of_birth:null,
                nid_no:null

            },
            tracking_details: [],
            localDate: null,
            localTime: null,
            tracking: [],
            tracking: [
                {
                    icon: 'mdi mdi-check',
                    name: 'Application Accepted',
                    state: 'Your application is accepted',
                    date_time: 'Time: 04:05:52 PM Date: 11 - 10 - 2023',
                    status: '',
                },
                {
                    icon: 'mdi mdi-check',
                    name: 'Primarily Verification',
                    state: 'Your application is included to Verification list',
                    status: '',
                },
                {
                    icon: 'mdi mdi-check',
                    name: 'Ward/Union/Pouroshava Committee',
                    state: 'Your application has been forwarded to the Union / pouroshava Committee',
                    status: '',
                },
                {
                    icon: 'mdi mdi-check',
                    name: 'District Pourashava/Upazila/City Corporation Committee',
                    state: 'Your application has been forwarded to the Upazila/City Corporation Committee ',
                    status: '',
                },
                {
                    icon: 'mdi mdi-check',
                    name: 'Waiting List',
                    state: 'Your application has been included in the waiting list ',
                    status: '',
                },
                {
                    icon: 'mdi mdi-check',
                    name: 'Final Selection List',
                    state: 'Congratulations, you have been finally selected to receive the allowance ',
                    status: '',
                },

            ],
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
                { name: 'Application Date', value: '' },
                { name: 'Office', value: '' },
                { name: 'Tracking No', value: '' },


            ],

        };
    },

    methods: {

        applicationTracking() {
            let data = {
                tracking_no: this.data.tracking_no,
                nid: this.data.nid,
                date_of_birth: this.data.date_of_birth,
            };
            this.$axios.post("global/applicants_tracking", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json",
                },
            }).then((response) => {
                this.tracking_details = response.data.data;
                const trackingAllData = response.data.data.committee_application;

                const updatedTracking = this.tracking.map((item, index) => {
                    if (index < trackingAllData.length) {
                        // Format the date to local date and time
                        const dateTime1 = new Date(trackingAllData[index].created_at);
                        this.localDate1 = dateTime1.toLocaleDateString();
                        this.localTime1 = dateTime1.toLocaleTimeString();

                        // Calculate the difference in days between the current item's created_at date and the previous item's created_at date
                        const previousDate = index > 0 ? new Date(trackingAllData[index - 1].created_at) : dateTime1;
                        const differenceInMilliseconds = Math.abs(dateTime1 - previousDate);
                        const differenceInDays = Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24));

                        return {
                            ...item,
                            status: trackingAllData[index].status,
                            date: this.localDate1,
                            time: this.localTime1,
                            daysToken: differenceInDays,
                        };
                    } else {
                        return item;
                    }
                });

                this.tracking = updatedTracking;

                console.log(this.tracking, 'all tracking data');

                // Format the date to local date and time
                const dateTime = new Date(response.data.data.created_at);
                this.localDate = dateTime.toLocaleDateString();
                this.localTime = dateTime.toLocaleTimeString();

                // Update tracking_summary dynamically
                this.tracking_summary = [
                    { name: 'National ID/Birth Registration No', value: this.tracking_details?.verification_number },
                    { name: 'Application Time', value: this.localTime },
                    { name: 'Application Date', value: this.localDate },
                    { name: 'Office', value: this.tracking_details?.permanent_address },
                    { name: 'Tracking No', value: this.tracking_details?.application_id },
                ];



            }).catch((error) => {
                console.log(error);
            });

        },
        getTimelineColor(status) {
            console.log('11color');
            console.log(status);
            switch (status) {
                case 1:
                    return '#26A69A';
                case 2:
                    return '#26A69A';
                case 3:
                    return '#FF6F00';
                case 4:
                    return '#FFEA00';
                case 5:
                    return '#26A69A';
                default:
                    return 'grey';
            }
        },
        getTimelineIcon(status) {
            switch (status) {

                case 1:
                    return 'mdi-check';
                case 2:
                    return 'mdi-check';
                case 3:
                    return 'mdi-clock';
                case 4:
                    return 'mdi-alert';
                case 5:
                    return 'mdi-check';
                default:
                    return 'mdi-check';
            }
        },


    },
};
</script>
