

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
                                            <label>{{ $t('container.system_audit.tracking_no')
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


                    <v-col cols="12" v-if="tracking_details !== null && tracking_details?.length!=0">
                        <v-card elevation="0">

                            <v-card-text>


                                <v-row dense class="ml-5">
                                    <v-col cols="12">
                                        <h4 style=" color: blue !important;">
                                            {{ this.language === 'bn' ? tracking_details.program?.name_bn :
                                            tracking_details.program?.name_en }}</h4>
                                        <br>
                                        <hr style="border-top: 1px solid gray; width: 40%;">


                                        <br>
                                        <h4>{{
                                            $t('container.system_audit.applicant_details')
                                            }}</h4>
                                    </v-col>
                                </v-row>
                                <v-row dense class="ml-5">
                                    <v-col cols="12" v-for="data in tracking_summary" :key="data.name">
                                        <b>{{ data.name }}:</b> {{ data.value }}
                                    </v-col>
                                </v-row>

                                <v-row class="ma-1">


                                    <v-col cols="12" lg="12" md="12">
                                        <v-card elevation="0">
                                            <v-card-title class="custom-title">
                                                <h5 class="text-center">{{
                                                    $t('container.system_audit.application_status')
                                                    }}</h5>
                                            </v-card-title>
                                            <v-card-text>
                                                <br>
                                                <table style="margin: 0 auto; width: 100%; font-size: 12px;">
                                                    <tbody>
                                                        <tr v-for="item in tracking" :key="item.name">
                                                            <td style="width: 20%;">{{ language == 'bn' ?
                                                                item.name_bn :
                                                                item.name_en }}</td>
                                                            <!-- Decrease width of the first td -->

                                                            <td style="width: 10%">
                                                                <v-timeline>
                                                                    <v-timeline-item
                                                                        :color="getTimelineColor(item.status)"
                                                                        :icon="getTimelineIcon(item.status)">
                                                                    </v-timeline-item>
                                                                </v-timeline>
                                                            </td>
                                                            <td style="width: 50%;">{{ language == 'bn' ?
                                                                item.state_bn :
                                                                item.state_en }}</td>
                                                            <!-- Increase width of the third td -->
                                                            <td style="width: 20%;">
                                                                <!-- Adjusted width for the last td -->
                                                                {{ language == 'bn' ? "সময়:" : "Time:" }} {{
                                                                language == 'bn' ?
                                                                $helpers.englishToBangla(item.time ?? '' )
                                                                : item.time ?? '' }} <br>
                                                                {{ language == 'bn' ? "তারিখ :" : "Date:" }} {{ language
                                                                ==
                                                                'bn' ?
                                                                $helpers.englishToBangla(item.date ?? '')
                                                                : item.date ?? '' }} <br>
                                                                {{ language == 'bn' ? "প্রাপ্ত কার্য সম্পাদনের গৃহীত
                                                                সময়কাল:" : "Days Taken:" }}{{ language
                                                                == 'bn' ?
                                                                $helpers.englishToBangla(item.daysToken ?? '')
                                                                : item.daysToken ?? ''}}

                                                            </td>
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
                    name_en: 'Application Accepted',
                    name_bn: 'আবেদন গৃহীত',
                    state_en: 'Your application is accepted',
                    state_bn: 'আপনার আবেদন গৃহীত হয়েছে',
                   
                    status: '',
                },
                {
                    icon: 'mdi mdi-check',
                    name_en: 'Primarily Verification',
                    name_bn: 'প্রাথমিকভাবে যাচাইকরণ',
                    state_en: 'Your application is included to Verification list',
                    state_bn: 'আপনার আবেদনটি যাচাইকরণ তালিকায় অন্তর্ভুক্ত করা হয়েছে',
                    status: '',
                },
                {
                    icon: 'mdi mdi-check',
                    name_en: 'Ward/Union/Pouroshava Committee',
                    name_bn: 'ওয়ার্ড/ইউনিয়ন/পৌরসভা কমিটি',
                    state_en: 'Your application has been forwarded to the Ward/Union/pouroshava Committee',
                    state_bn: 'আপনার আবেদনটি ওয়ার্ড/ইউনিয়ন/পৌরসভা কমিটির কাছে পাঠানো হয়েছে',
                    status: '',
                },
                {
                    icon: 'mdi mdi-check',
                    name_en: 'District Pourashava/Upazila/City Corporation Committee',
                    name_bn: 'জেলা পৌরসভা/উপজেলা/সিটি কর্পোরেশন কমিটি',
                    state_en: 'Your application has been forwarded to the District Pouroshava/Upazila/City Corporation Committee',
                    state_bn: 'আপনার আবেদন জেলা পৌরসভা/উপজেলা/সিটি কর্পোরেশন কমিটিতে পাঠানো হয়েছে',
                    status: '',
                },
                {
                    icon: 'mdi mdi-check',
                    name_en: 'Waiting List',
                    name_bn: 'অপেক্ষামান তালিকা',
                    state_en: 'Your application has been included in the waiting list',
                    state_bn: 'আপনার আবেদনটি  অপেক্ষমাণ তালিকায় অন্তর্ভুক্ত করা হয়েছে',
                    status: '',
                },
                {
                    icon: 'mdi mdi-check',
                    name_en: 'Final Selection List',
                    name_bn: 'চূড়ান্তভাবে নির্বাচিত',
                    state_en: 'Congratulations, you have been finally selected to receive the allowance',
                    state_bn: 'অভিনন্দন, আপনি চূড়ান্তভাবে ভাতা পাওয়ার জন্য নির্বাচিত হয়েছেন',
                    status: '',
                },

            ],
            legends: [
                { status: 'completed', icon: 'mdi mdi-circle', color: '#26A69A', label: 'Completed' },
     
                { status: 'pending', icon: 'mdi mdi-circle', color: '#FFEB3B', label: 'Process Runnig' },
                { status: 'waiting', icon: 'mdi mdi-circle', color: '#757575', label: 'Future Program' },
                
            ],
            // tracking_summary:{},
            
        };
    },
    computed:{
        language: {
            get() {
                return this.$store.getters.getAppLanguage;
            },
        },
        tracking_summary() {
            return [
                {
                    name: this.$t(
                        "container.system_audit.nbr"
                    ), value: this.language === 'bn' ? this.$helpers.englishToBangla(this.tracking_details?.verification_number) : this.tracking_details?.verification_number
                },
                {
                    name: this.$t(
                        "container.system_audit.application_time"
                    ), value: this.language === 'bn' ? this.$helpers.englishToBangla(this.localTime) : this.localTime
                },
                {
                    name: this.$t(
                        "container.system_audit.application_date"
                    ), value: this.language === 'bn' ? this.$helpers.englishToBangla(this.localDate) : this.localDate
                },
                {
                    name: this.$t(
                        "container.system_audit.office"
                    ), value: this.tracking_details?.permanent_address
                },
                {
                    name: this.$t(
                        "container.system_audit.tracking_no"
                    ), value: this.tracking_details?.application_id
                },
            ];   
        } 


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
