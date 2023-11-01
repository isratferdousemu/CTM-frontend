<script>
export default {
    name: 'FrontendIndex',

    data() {
        return {
            tracking: [
                {
               
                    name: 'Grievance Tracking Accepted',
                    state: 'Your grievance application is accepted',
                    date_time:'Time: 04:05:52 PM Date: 11 - 10 - 2023',
                    status:'completed'
                },
                  {
                 
                    name: 'Grievance Processing',
                    state: 'Your grievance application is processing Reviewed by: Upazila social service officer Saver, Dhaka',
                    date_time: 'Time: 04:05:52 PM Date: 11 - 10 - 2023',
                    status: 'completed'
                },
                 {
                  
                    name: 'Solved / Forwarded',
                    state: 'Your grievance application has been forwarded Forwared To: Officer Division Head Office',
                    date_time: 'Time: 04:05:52 PM Date: 11 - 10 - 2023',
                    status: 'completed'
                },
                   {
                   
                    name: 'Resolved',
                    state: 'Your Grievance has been Resolved Resolved By: Social Service Officer',
                    date_time: 'Time: 04:05:52 PM Date: 11 - 10 - 2023',
                    status: 'waiting'
                },
                 {
                    
                    name: 'Appeal(If Any)',
                    state: 'Your Grievance has been Appealed Appealed By: Social Service Officer',
                    date_time: 'Time: 04:05:52 PM Date: 11 - 10 - 2023',
                    status: 'pending'
                },
                {
                   
                    name: 'Processing Resolved',
                    state: 'Your Grievance has been Appeal Resolved Appeal Resolved By: Social Service Officer',
                    date_time: 'Time: 04:05:52 PM Date: 11 - 10 - 2023',
                    status: 'pending'
                },
               
            ],
             legends: [
                { status: 'completed', icon: 'mdi-check', color: '#26A69A', label: 'Completed' },
                { status: 'rejected', icon: 'mdi-close', color: '#E53935', label: 'Rejected' },
                { status: 'waiting', icon: 'mdi-clock', color: '#FF6F00', label: 'Waiting' },
                { status: 'pending', icon: 'mdi-alert', color: '#FFEA00', label: 'Pending' },
            ],
             tracking_summary: [
                { name: 'Grievance Type', value: 'Application' },
                { name: 'Subject', value: 'I was not informed when, where and how to submit the application'},
                { name: 'ID', value: '13298543' },
                { name: 'Name', value: 'Raisul Islam'},
              
           
       
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
                    return '#FF6F00';
                case 'pending':
                    return '#FFEA00';
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
                    return 'mdi-clock';
                case 'pending':
                    return 'mdi-alert';
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
                                    <v-col cols="12" lg="6" md="6">
                                        <v-radio-group required row>
                                            <span class="mr-5">{{ $t('container.system_audit.grievance_tracking')
                                            }}</span>
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
                        <v-card elevation="0">

                            <v-card-text>
                                <v-row class="ma-1">
                                    <v-col cols="12" lg="3" md="3">
                                        <table class="small-text">
                                            <h3 style="text-decoration: underline">Grievance Details</h3>
                                        
                                           
      <tr v-for="item in tracking_summary" :key="item.name">
                                                            <td><b>{{ item.name }}</b></td>
                                                          
                                                             <td><b>:</b>{{ item.value }}</td>
                                                        </tr>

                                        </table>

                                    </v-col>
                                    <v-col cols="12" lg="9" md="9">
                                        <v-card elevation="0">
                                            <v-card-title class="custom-title"><h3 class="text-center">{{ $t('container.system_audit.grievance_status')
                                                                                            }}</h3></v-card-title>
                                            <v-card-text>
               <table>
           <tbody>
                                                
                                                    <tr v-for="item in tracking" :key="item.name">
                                                        <td>{{ item.name }}</td>
                                                        <td>
                                                            
                                                            <v-timeline >
                                                 
                                                                <v-timeline-item :color="getTimelineColor(item.status)" :icon="getTimelineIcon(item.status)"></v-timeline-item>
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
                                    <v-row  class="justify-end mt-2">
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