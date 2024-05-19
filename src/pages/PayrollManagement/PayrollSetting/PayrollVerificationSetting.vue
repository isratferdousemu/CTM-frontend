<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card class="mb-4">
          <v-card-title class="headline" style="background-color: #2b4978; color: white">
            {{ language === 'bn' ? 'পেরোল যাচাই সেটিং' : 'Payroll Verification Setting' }}
            </v-card-title>
          <v-card-text>
            <v-radio-group v-model="verificationType" row>
              <v-radio :label="language === 'bn' ? 'পেরোল অনুমোদনের মাধ্যমে যাচাই প্রক্রিয়া' : 'Payroll Approval Through Verification Process'" value="verification_process"></v-radio>
              <v-radio :label="language === 'bn' ? 'পেরোল অনুমোদনের মাধ্যমে সরাসরি অনুমোদন প্রক্রিয়া' : 'Payroll Approval Through Direct Approval Process'" value="direct_approval"></v-radio>
            </v-radio-group>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn color="primary" @click="submit">
            {{ language === 'bn' ? 'জমা দিন' : 'Submit' }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      verificationType: "",
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
    submit() {
        const dataToSend = {
        verificationType: this.verificationType,
        };

        this.$axios
        .post("/admin/payroll/verification-setting-submit", dataToSend, {
            headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "application/json",
            },
        })
        .then((res) => {
            this.$toast.success("Verification type submitted successfully");
        })
        .catch((error) => {
            console.error("API error:", error);
        });
    },

    async getData() {
      try {
        this.$axios
          .get(`/admin/payroll/get-verification-setting`, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            this.verificationType = res?.data?.verification_type;
          })
          .catch((err) => {
          });
      } catch (e) {
        console.log("payroll-verification-setting",e);
      }
    },
  },

  mounted() {
    this.getData();
  },
};
</script>

<style lang="scss" scoped></style>
