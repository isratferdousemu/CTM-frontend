<template>
  <div id="application_tracking">
    <v-row class="ma-1">
      <v-col cols="12">
        <v-row>
          <v-col cols="12">
            <v-card elevation="0">
              <v-card-text>
                <v-row class="ma-2">
                  <v-col cols="12" lg="6" md="6">
                    <label>beneficiary ID</label>
                    <v-text-field
                      v-model="data.beneficiary_id"
                      outlined
                      clearable
                    ></v-text-field>

                    <!-- <div class="text-right">
                        <v-radio-group v-model="data.id_type" row>
                        <v-radio label="NID" value="1"></v-radio>
                        <v-radio label="Beneficiary ID" value="2"></v-radio>
                        </v-radio-group>
                    </div> -->
                  </v-col>

                  <v-col cols="12" lg="6" md="6">
                    <label>Date of Birth</label>
                    <v-text-field
                      v-model="data.date_of_birth"
                      outlined
                      clearable
                      type="date"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" lg="2" md="2">
                    <div class="text-right">
                      <v-btn
                        @click="preview"
                        flat
                        color="success"
                        class="custom-btn-width white--text"
                      >
                        <span class="mdi mdi-television mr-2"></span>
                        Preview
                      </v-btn>
                    </div>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" v-if="showDetails">
            <v-card elevation="0">
              <v-card-text>
                <v-row dense class="ml-5">
                  <v-col cols="12">
                    <h4>Beneficiary Details</h4>
                  </v-col>
                </v-row>
                <v-row dense class="ml-5">
                  <v-col cols="12"> <b>ID:</b> 1234567890 </v-col>
                  <v-col cols="12"> <b>Name:</b> Shohorab Ahmed </v-col>
                  <v-col cols="12"> <b>Address:</b> Dhaka North </v-col>
                </v-row>
                <v-row class="ma-1">
                  <v-col cols="12" lg="12" md="12">
                    <v-card elevation="0">
                      <v-card-title class="custom-title">
                        <h5 class="text-center">Payment Status</h5>
                      </v-card-title>
                      <v-card-text>
                        <br />
                        <table
                          style="margin: 0 auto; width: 100%; font-size: 12px"
                        >
                          <tbody>
                            <tr v-for="(item, index) in tracking" :key="index">
                              <td>
                                {{
                                  language == "bn" ? item.step.bn : item.step.en
                                }}
                              </td>
                              <td>
                                <v-timeline>
                                  <v-timeline-item
                                    :color="
                                      item.completed ? '#26A69A' : '#757575'
                                    "
                                    :icon="
                                      item.completed ? 'mdi-check' : 'mdi-alert'
                                    "
                                  ></v-timeline-item>
                                </v-timeline>
                              </td>
                              <td>
                                {{
                                  language == "bn"
                                    ? item.message.bn
                                    : item.message.en
                                }}
                              </td>
                              <td>
                                {{ language == "bn" ? "সময়:" : "Time:" }}
                                {{ item.time }}
                                <br />
                                {{ language == "bn" ? "তারিখ:" : "Date:" }}
                                {{ item.date }}
                              </td>
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
  name: "FrontendIndex",
  data() {
    return {
      data: {
        tracking_no: null,
        beneficiary_id: null,
        date_of_birth: null,
        id_type: null,
      },
      items: {},

      tracking: [
        {
          step: { en: "Payroll Generated", bn: "পেরোল তৈরি হয়েছে" },
          completed: false,
          message: {
            en: "Your payroll is generated",
            bn: "আপনার পেরোল তৈরি হয়েছে",
          },
          time: null,
          date: null,
        },
        {
          step: {
            en: "Payroll Approved / Rejected",
            bn: "পেরোল অনুমোদিত / প্রত্যাখ্যান",
          },
          completed: false,
          message: {
            en: "Your payroll is approved",
            bn: "আপনার পেরোল অনুমোদিত হয়েছে",
          },
          time: null,
          date: null,
        },
        {
          step: {
            en: "Processing at iBAS++",
            bn: "iBAS++ এ প্রক্রিয়াধীন হচ্ছে",
          },
          completed: false,
          message: {
            en: "Your payroll is processing at iBAS++",
            bn: "আপনার পেরোল iBAS++ এ প্রক্রিয়াধীন হচ্ছে",
          },
          time: null,
          date: null,
        },
        {
          step: { en: "Processing at BB", bn: "BB এ প্রক্রিয়াধীন হচ্ছে" },
          completed: false,
          message: {
            en: "Your payroll is processing at BB",
            bn: "আপনার পেরোল BB এ প্রক্রিয়াধীন হচ্ছে",
          },
          time: null,
          date: null,
        },
        {
          step: { en: "Processing at MFS", bn: "MFS এ প্রক্রিয়াধীন হচ্ছে" },
          completed: false,
          message: {
            en: "Your payroll is processing at MFS",
            bn: "আপনার পেরোল MFS এ প্রক্রিয়াধীন হচ্ছে",
          },
          time: null,
          date: null,
        },
        {
          step: {
            en: "Disbursed / Bounce Back",
            bn: "বিতরণ হয়েছে / পুনরায় ফিরানো হয়েছে",
          },
          completed: false,
          message: {
            en: "Congratulations, your payroll is disbursed",
            bn: "অভিনন্দন, আপনার পেরোল বিতরণ করা হয়েছে",
          },
          time: null,
          date: null,
        },
      ],
      showDetails: false,
    };
  },
  computed: {
    language: {
      get() {
        return this.$store.getters.getAppLanguage;
      },
    },
  },
  methods: {
    formatDateTime(value) {
      const timeAndDate = new Date(value);
      const formattedDate = timeAndDate.toLocaleDateString("en-GB"); // Format: DD/MM/YYYY
      const formattedTime = timeAndDate.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      return {
        date: formattedDate,
        time: formattedTime,
      };
    },
    async preview() {
      if (!this.data.beneficiary_id) {
        this.$toast.warning(
          this.language === "bn"
            ? "একটি বৈধ ID লিখুন"
            : "Please enter a valid ID"
        );
        return;
      }
      if (!this.data.date_of_birth) {
        this.$toast.warning(
          this.language === "bn"
            ? "একটি জন্ম তারিখ নির্বাচন করুন"
            : "Please select a date of birth"
        );
        return;
      }

      const dataToSend = {
        beneficiary_id: this.data.beneficiary_id,
        date_of_birth: this.data.date_of_birth,
      };

      this.$axios
        .post("/admin/payroll/payment-tracking-info", dataToSend, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          this.items = res.data;
          this.showDetails = true;
          if (this.items?.payroll != null) {
            const formatted = this.formatDateTime(
              this.items.payroll.updated_at
            );
            this.tracking[0].completed = true;
            this.tracking[0].time = formatted.time;
            this.tracking[0].date = formatted.date;
          }

          if (this.items?.payroll.status == "Approved") {
            const formatted = this.formatDateTime(
              this.items.payroll.updated_at
            );
            this.tracking[1].completed = true;
            this.tracking[1].time = formatted.time;
            this.tracking[1].date = formatted.date;
          } else {
            this.tracking[1].completed = true;
            this.tracking[1].message.en = "Your payroll is rejected";
            this.tracking[1].message.bn = "আপনার পেরোল প্রত্যাখ্যান হয়েছে";
            const formatted = this.formatDateTime(
              this.items.payroll.updated_at
            );
            this.tracking[1].time = formatted.time;
            this.tracking[1].date = formatted.date;
          }
          if (this.items?.payment_cycle.status == "Completed") {
            this.tracking[2].completed = true;
            const formatted = this.formatDateTime(
              this.items.payroll.updated_at
            );
            this.tracking[2].time = formatted.time;
            this.tracking[2].date = formatted.date;
          }
          this.$toast.success(
            this.language === "bn"
              ? "তথ্য সফলভাবে প্রাপ্ত হয়েছে"
              : "Data retrieved successfully"
          );
        })
        .catch((error) => {
          console.error("There was an error fetching the data:", error);
          this.$toast.error(
            this.language === "bn"
              ? "তথ্য আনতে একটি ত্রুটি ঘটেছে"
              : "An error occurred while fetching the data"
          );
        });
    },
  },
};
</script>

<style>
.small-text {
  font-size: 9px;
}

.no-striped-table .v-simple-table tbody tr:nth-child(even) {
  background-color: transparent;
}

.custom-title {
  background-color: #4caf50;
  color: white;
  padding: 10px;
}
</style>
