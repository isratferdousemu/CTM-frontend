

<style>
.custom-title {
    background-color: rgb(28, 59, 104);
    color: white;
    padding: 10px;
}

.header-row {
    background-color: rgb(28, 59, 104);
    color: white;
}

.tracking-item {
    font-size: 16px;
    margin-bottom: 16px;
}

.status-cell, .timeline-cell, .state-cell, .time-date-cell {
    padding: 8px 0;
}

.tracking-summary-item {
    font-size: 16px;
    margin-top: 8px;
}

@media (max-width: 1024px) {
    .tracking-item {
        font-size: 14px;
        text-align: center;
    }
    .tracking-summary-item {
        font-size: 14px;
        margin-top: 8px;
    }
    .timeline-cell {
        text-align: center !important;
    }
}

@media (max-width: 599px) {
    .tracking-item {
        font-size: 14px;
        text-align: center;
    }
    .tracking-summary-item {
        font-size: 14px;
        margin-top: 8px;
    }
    .v-radio-group label {
        display: block;
        margin-bottom: 8px;
    }
    .v-btn.custom-btn-width {
        width: 100%;
    }
    .text-right {
        text-align: center;
    }
}

@media (min-width: 600px) and (max-width: 959px) {
    .tracking-item {
        font-size: 15px;
        text-align: center;
    }
    .tracking-summary-item {
        font-size: 15px;
        margin-top: 8px;
    }
    .v-radio-group label {
        margin-right: 0;
        display: block;
        text-align: center;
        margin-bottom: 8px;
    }
    .text-right {
        text-align: center;
    }
}

@media (min-width: 960px) {
    .tracking-summary-item {
        font-size: 16px;
        margin-top: 8px;
    }
}
</style>

<template>
    <div id="application_tracking">
        <v-row class="ml-sm-5 mt-0">
            <v-col cols="12">
                <v-row cols="12">
                    <v-col cols="12">
                        <v-card elevation="0">
                            <v-card-text>
                                <v-container fluid>
                                    <v-row class="ma-5">
                                        <v-col cols="12" md="4" style="margin-top: -15px;">
                                            <v-radio-group required row v-model="data.tracking_type"
                                                @change="handleRadioChange">
                                                <label class="mr-5">{{ $t('container.grievance_management.grievanceList.grievance_tracking')
                                                }}</label>
                                                <v-radio :label="$t('container.system_audit.nbr')" :value="1"></v-radio>
                                                <v-radio :label="$t('container.grievance_management.grievanceList.tracking_no')"
                                                    :value="2"></v-radio>
                                            </v-radio-group>
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <div v-if="data.tracking_type == 2">
                                                <label>{{ $t('container.grievance_management.grievanceList.tracking_no') }}</label>
                                                <v-text-field v-model="data.tracking_no" outlined clearable></v-text-field>
                                            </div>
                                            <div v-if="data.tracking_type == 1">
                                                <v-row>
                                                    <v-col cols="12" sm="6">
                                                        <label>{{ $t('container.system_audit.nbr') }}</label>
                                                        <v-text-field outlined clearable v-model="data.nid"></v-text-field>
                                                    </v-col>
                                                    <v-col cols="12" sm="6">
                                                        <label>{{
                                                            $t('container.application_selection.application.date_of_birth')
                                                        }}</label>
                                                        <v-text-field outlined clearable v-model="data.date_of_birth"
                                                            type="date"></v-text-field>
                                                    </v-col>
                                                </v-row>
                                            </div>
                                        </v-col>
                                        <v-col cols="12" md="2">
                                            <div class="text-right">
                                                <v-btn type="submit" flat color="success" @click="grievanceTracking()"
                                                    class="custom-btn-width white--text py-2" style="margin-top:22px;">
                                                    <span class="mdi mdi-television mr-2"></span>
                                                    {{ $t("container.list.preview") }}
                                                </v-btn>
                                            </div>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col cols="12" v-if="tracking_details !== null && tracking_details?.length != 0">
                        <v-card elevation="0">
                            <v-card-text>
                                <v-row cols="12" dense style="background-color:rgb(28, 59, 104);color:white">
                                    <v-col md="6" sm="6" lg="6" cols="12">
                                            <v-card-title class="custom-title">
                                                <h6 class="text-center" style="font-size:16.16px;">{{ $t('container.grievance_management.grievanceList.grievance_details') }}</h6>
                                          </v-card-title>
                                    </v-col>
                                </v-row>
                                <v-row dense style="margin-left:9px;">
                                    <v-col v-for="data in tracking_summary" :key="data.name" cols="12" sm="6" md="4" lg="3"
                                        class="tracking-summary-item">
                                        <b>{{ data.name }}:</b> {{ data.value }}
                                    </v-col>
                                </v-row>
                       <v-row cols="12">
        <v-col cols="12">
          <v-card elevation="0">
            <v-card-title class="custom-title">
              <h5 class="text-center">{{ $t('container.grievance_management.grievanceList.grievance_status') }}</h5>
            </v-card-title>
            <v-card-text class="m-0">
              <v-container fluid>
                <v-row v-for="(item, index) in tracking" :key="index" v-show="item.status != '' && item.length != 0" :style="{ color: getFontColor(item.status) }" class="tracking-item mt-2">
                  <v-col cols="12" sm="6" md="3" class="text-center status-cell">
                    {{ getStatusName(item.status) }}
                  </v-col>
                  <v-col cols="12" sm="6" md="2" class="text-center timeline-cell" style="margin-top:-30px;">
                    <v-timeline align-top truncate-line="both">
                      <v-timeline-item :color="getTimelineColor(item.status)" :icon="getTimelineIcon(item.status)">
                      </v-timeline-item>
                    </v-timeline>
                  </v-col>
                  <v-col cols="12" md="5" class="text-center state-cell">
                    {{ getStateName(item.status) }}
                  </v-col>
                  <v-col cols="12" md="2" class="time-date-cell" v-show="item.status != ''">
                    {{ language == 'bn' ? "সময়:" : "Time:" }} {{ language == 'bn' ? $helpers.englishToBangla(item.time ?? '') : item.time ?? '' }}<br>
                    {{ language == 'bn' ? "তারিখ :" : "Date:" }} {{ language == 'bn' ? $helpers.englishToBangla(item.date ?? '') : item.date ?? '' }}<br>
                    <span v-if="item.daysToken > 0">
                      {{ language == 'bn' ? "প্রাপ্ত কার্য সম্পাদনের গৃহীত সময়কাল:" : "Days Taken: " }} {{ language == 'bn' ? $helpers.englishToBangla(item.daysToken ?? '') : item.daysToken ?? '' }}
                    </span>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </v-col>
        <v-row class="justify-end mt-2">
          <v-col v-for="legend in legends" :key="legend.status" cols="4" sm="3" md="1" lg="1" class="text-center">
            <v-icon :color="legend.color">{{ legend.icon }}</v-icon><br>
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
                nid: null,
                date_of_birth: null,
                tracking_type: 2,
                data_of_birth: null,
                nid_no: null

            },
            tracking_details: [],
            localDate: null,
            localTime: null,
            tracking: [],
            tracking: [
                {
                    icon: 'mdi mdi-check',
                    name_en: 'Grievance Submitted',
                    name_bn: 'অভিযোগ জমা',
                    state_en: 'Your grievance application is Submitted',
                    state_bn: 'আপনার অভিযোগ আবেদন জমা দেওয়া হয়',
                    status: '',
                },
                {
                    icon: 'mdi mdi-check',
                    name_en: 'Grievance Processing',
                    name_bn: 'অভিযোগ প্রক্রিয়াকরণ',
                    state_en: 'Your grievance application is processing',
                    state_bn: 'আপনার অভিযোগের আবেদন প্রক্রিয়াকরণ করা হচ্ছে',
                    status: '',
                },
                {
                    icon: 'mdi mdi-check',
                    name_en: 'Forwarded',
                    name_bn: 'ফরোয়ার্ড',
                    state_en: 'Your grievance application has been forwarded',
                    state_bn: 'আপনার অভিযোগ আবেদন ফরোয়ার্ড করা হয়েছে',
                    status: '',
                },
                {
                    icon: 'mdi mdi-check',
                    name_en: 'Solved /Rejected',
                    name_bn: 'সমাধান /বাতিল',
                    state_en: 'Your Grievance has been Solved',
                    state_bn: 'আপনার অভিযোগ সমাধান করা হয়েছে',
                    status: '',
                },
                {
                    icon: 'mdi mdi-alert',
                    name_en: 'Rejected',
                    name_bn: 'বাতিল',
                    state_en: 'Your Grievance has been Rejected',
                    state_bn: 'আপনার অভিযোগ বাতিল করা হয়েছে',
                    status: '',
                },


            ],
            legends: [
                { status: 'completed', icon: 'mdi mdi-circle', color: '#26A69A', label: 'Completed' },

                { status: 'pending', icon: 'mdi mdi-alert', color: 'red', label: 'Rejected' },
                { status: 'waiting', icon: 'mdi mdi-circle', color: '#757575', label: 'Not Solved' },

            ],


        };
    },
    computed: {
        language: {
            get() {
                return this.$store.getters.getAppLanguage;
            },
        },
        tracking_summary() {
            return [
                {
                    name: this.$t(
                        "container.grievance_management.grievanceEntry.name"
                    ), value: this.language === 'bn' ? this.$helpers.englishToBangla(this.tracking_details?.name) : this.tracking_details?.name
                },
                {
                    name: this.$t(
                        "container.grievance_management.grievanceType"
                    ), value: this.language === 'bn' ? this.$helpers.englishToBangla(this.tracking_details?.grievance_type?.title_bn) : this.tracking_details?.grievance_type?.title_en
                },
                {
                    name: this.$t(
                        "container.grievance_management.grievance_subject"
                    ), value: this.language === 'bn' ? this.$helpers.englishToBangla(this.tracking_details?.grievance_subject?.title_bn) : this.tracking_details?.grievance_subject?.title_en
                },

                {
                    name: this.$t(
                        "container.system_audit.application_date"
                    ), value: this.language === 'bn' ? this.formatDate(this.tracking_details.created_at) : this.formatDate(this.tracking_details.created_at)
                },

                {
                    name: this.$t(
                        "container.grievance_management.grievanceList.tracking_no"
                    ), value: this.tracking_details?.tracking_no
                },
            ];
        }


    },

    methods: {
        // date formater function
        formatDate(dateString) {
            const date = new Date(dateString);
            const year = date.getFullYear();
            const month = ('0' + (date.getMonth() + 1)).slice(-2); // Adding 1 because months are zero-based
            const day = ('0' + date.getDate()).slice(-2);
            return `${day}-${month}-${year}`;
        },
        handleRadioChange(value) {
            if (value == 1) {
                this.data.tracking_no = null;

            }
            if (value == 2) {
                this.data.date_of_birth = null;
                this.data.nid = null;

            }

        },
        grievanceTracking() {
            this.$axios.post("global/grievance_tracking", this.data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json",
                },
            }).then((response) => {
                this.tracking_details = response.data.data;

                const trackingAllData = response.data.data.grievacne_status_details;

                var updatedTracking=[];
                 updatedTracking = this.tracking.map((item, index) => {
                    if (index < trackingAllData.length) {
                        // Format the date to local date and time
                        const dateTime1 = new Date(trackingAllData[index].created_at);
                        this.localDate1 = dateTime1.toLocaleDateString();
                        this.localTime1 = dateTime1.toLocaleTimeString();

                        // Calculate the difference in days between the current item's created_at date and the previous item's created_at date
                        const previousDate = index > 0 ? new Date(trackingAllData[index - 1].created_at) : dateTime1;
                        const differenceInMilliseconds = Math.abs(dateTime1 - previousDate);
                        const differenceInDays = Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24));
                        // Debugging: log the updated item values
                
                        return {
                            ...item,
                            status: trackingAllData[index].status,
                            date: this.localDate1,
                            time: this.localTime1,
                            daysToken: differenceInDays,
                        };
                    } else {
                        //  const updatedTracking=[];
                        return  this.tracking = updatedTracking;
                    }
                });
                // Debugging: log the updated tracking array to ensure it's correct
                console.log('Updated Tracking:', updatedTracking);
               
                this.tracking = updatedTracking;
                 console.log('this.tracking:', this.tracking);

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
            switch (status) {

                case "0":
                    return '#26A69A';
                case '1':
                    return '#26A69A';
                case '2':
                    return '#26A69A';
                case '3':
                    return 'red';
                case '4':
                    return '#26A69A';
                default:
                    return '#757575';
            }
        },
        getTimelineIcon(status) {

            switch (status) {

                case '0':
                    return 'mdi-check';
                case '1':
                    return 'mdi-check';
                case '2':
                    return 'mdi-check';
                case '3':
                    return 'mdi-alert';
                case '4':
                    return 'mdi-check';
                default:
                    return 'mdi-check';
            }
        },
        getFontColor(status) {
            switch (status) {
                case "0":
                    return '#26A69A';
                case "1":
                    return '#26A69A';
                case "2":
                    return '#26A69A';
                case "3":
                    return '#26A69A';
                case '4':
                    return '#26A69A';
                default:
                    return 'black';
            }
        },
        getStatusName(status) {
            switch (status) {
                case "0":
                    return this.language === 'bn' ? "অভিযোগ জমা" : "Grievance Submitted";
                case "1":
                    return this.language === 'bn' ? "ফরোয়ার্ড" : "Forwarded";
                case "2":
                    return this.language === 'bn' ? "সমাধান " : "Solved";
                case "3":
                    return this.language === 'bn' ? "বাতিল" : "Rejected";
                case '4':
                    return this.language === 'bn' ? "অভিযোগ প্রক্রিয়াকরণ" : "Grievance Processing";
                default:

            }
        },
        getStateName(status) {
            switch (status) {
                case "0":
                    return this.language === 'bn' ? "আপনার অভিযোগ জমা দেওয়া হয়েছে" : "Your grievance application is Submitted";
                case "1":
                    return this.language === 'bn' ? "আপনার অভিযোগ ফরোয়ার্ড করা হয়েছে" : "Your grievance application has been forwarded";
                case "2":
                    return this.language === 'bn' ? "আপনার অভিযোগ সমাধান করা হয়েছে" : "Your Grievance has been Solved";
                case "3":
                    return this.language === 'bn' ? "আপনার অভিযোগ বাতিল করা হয়েছে" : "Your Grievance has been Rejected";
                case '4':
                    return this.language === 'bn' ? "আপনার অভিযোগের আবেদন প্রক্রিয়াকরণ করা হচ্ছে" : "Your grievance application is processing";
                default:

            }
        },


    },
};
</script>
