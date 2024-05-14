<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2 class="my-4">Financial Year: 2023-24</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card
          v-for="allowance in allowances"
          :key="allowance.type"
          class="mb-4"
        >
          <v-row no-gutters>
            <v-col cols="6">
              <v-card-title>{{ allowance.name }}</v-card-title>
            </v-col>
            <v-col cols="6">
              <v-card-text>
                <v-list>
                  <!-- <v-checkbox
                    v-for="installment in generateInstallments(
                      allowance.payment_cycle
                    )"
                    :key="installment.start"
                    v-model="installment.checked"
                    :label="installment.end ? `${installment.start} - ${installment.end}` : installment.start"
                  ></v-checkbox> -->
                  <v-checkbox
                    v-for="installment in generateInstallments(
                      allowance.payment_cycle,
                      '2023-24'
                    )"
                    :key="installment.text"
                    v-model="installment.checked"
                    :label="installment.text"
                  ></v-checkbox>
                </v-list>
              </v-card-text>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="text-right">
        <v-btn color="primary" @click="submitForm">Submit</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      // allowances: [],
      // installments: [],
      allowances: [
        {
          name: "Widow Allowance",
          payment_cycle: "Monthly",
          installments: []
        },
        {
          name: "Widow Allowance2",
          payment_cycle: "Quaterly",
          installments: []
        },
      ],
    };
  },
  methods: {
    generateInstallments(paymentCycle) {
      console.log("🚀 ~ generateInstallments ~ paymentCycle:", paymentCycle)
      let numInstallments = 0;
      if (paymentCycle === "Monthly") {
        numInstallments = 12;
      } else if (paymentCycle === "Quaterly") {
        numInstallments = 4;
      }

      const installments = [];
      for (let i = 1; i <= numInstallments; i++) {
        const installmentText = `Installment ${i}`;
        installments.push({ text: installmentText, checked: false });
      }
      return installments;
    },

    // generateInstallments(paymentCycle) {
    //   if (!paymentCycle) return []; 

    //   return this.installments.filter((installment) => {
    //     if (!installment.type) return false;
    //     console.log("🚀 ~ returnthis.installments.filter ~ paymentCycle.toLowerCase():", paymentCycle.toLowerCase())
    //     console.log("🚀 ~ returnthis.installments.filter ~ installment.type.toLowerCase():", installment.type.toLowerCase())
    //     return installment.type.toLowerCase() === paymentCycle.toLowerCase();
    //   });
    // },

    // async getAllAllowance() {
    //   try {
    //     this.$axios
    //       .get(`/admin/payroll/get-all-allowance`, {
    //         headers: {
    //           Authorization: "Bearer " + this.$store.state.token,
    //           "Content-Type": "multipart/form-data",
    //         },
    //       })
    //       .then((res) => {
    //         if (res.data) {
    //           this.allowances = res.data;
    //         } else {
    //           this.$toast.error("Something went wrong");
    //         }
    //       })
    //       .catch((err) => {
    //         console.log("🚀 ~ getUserById ~ err:", err);
    //       });
    //   } catch (e) {
    //     console.log(e);
    //   }
    // },

    // async getInstallments() {
    //   try {
    //     this.$axios
    //       .get(`/admin/payroll/get-all-installments`, {
    //         headers: {
    //           Authorization: "Bearer " + this.$store.state.token,
    //           "Content-Type": "multipart/form-data",
    //         },
    //       })
    //       .then((res) => {
    //         if (res.data) {
    //           this.installments = res.data;
    //         } else {
    //           this.$toast.error("Something went wrong");
    //         }
    //       })
    //       .catch((err) => {
    //         console.log("🚀 ~ getUserById ~ err:", err);
    //       });
    //   } catch (e) {
    //     console.log(e);
    //   }
    // },

    // generateInstallments(paymentCycle, financialYear) {
    //   const startMonth = financialYear === "2023-24" ? 7 : 1; // Starting month based on financial year
    //   const numInstallments = paymentCycle === "monthly" ? 12 : 4; // Number of installments based on payment cycle

    //   const installments = [];
    //   for (let i = 0; i < numInstallments; i++) {
    //     const month = startMonth + i;
    //     const year = month > 12 ? 2024 : 2023; // Adjust year if month goes beyond December
    //     const monthText = new Date(year, month - 1).toLocaleString("default", {
    //       month: "long",
    //     }); // Get month name
    //     const nextMonth = (month % 12) + 1;
    //     const nextYear = month === 12 ? year + 1 : year;
    //     const nextMonthText = new Date(nextYear, nextMonth - 1).toLocaleString(
    //       "default",
    //       { month: "long" }
    //     ); // Get next month name
    //     const installmentText = `${
    //       i + 1
    //     }st installment (${monthText} ${year} - ${nextMonthText} ${nextYear})`; // Construct installment text
    //     installments.push({ text: installmentText, checked: false });
    //   }
    //   return installments;
    // },

    submitForm() {
      const selectedAllowances = this.allowances.filter((allowance) => {
        return allowance.installments.some(
          (installment) => installment.checked
        );
      });

      if (selectedAllowances.length > 0) {
        const dataToSend = selectedAllowances.map((allowance) => {
          return {
            name: allowance.name,
            installments: allowance.installments
              .filter((installment) => installment.checked)
              .map((installment) => installment.text),
          };
        });

        console.log("API called with data:", dataToSend);

        this.validationError = false;
      } else {
        this.validationError = true;
      }
    },
  },

  // mounted() {
  //   this.getAllAllowance();
  //   this.getInstallments();
  // },
};
</script>

<style scoped></style>
