<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2 class="my-4">
          Financial Year: {{ financial_year?.financial_year }}
        </h2>
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
            <v-col cols="12" class="blue-background white-text">
              <v-card-title class="text-white">{{
                getItemText(allowance)
              }}</v-card-title>
            </v-col>
            <v-col cols="12">
              <v-card-text class="d-flex flex-wrap">
                <v-checkbox
                  v-for="installment in generateInstallments(
                    allowance.payment_cycle
                  )"
                  :key="installment.id"
                  :label="installment.installment_name"
                  :value="installment.id"
                  style="margin-right: 2px;"
                  @change="toggleInstallment(allowance, installment)"
                ></v-checkbox>
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
      data: null,
      financial_year: null,
      allowances: [],
      installments: [],
      selectedData: [],
      defaultChecked: true,
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
    getItemText(item) {
      return this.language === "bn" ? item.name_bn : item.name_en;
    },

    isInstallmentSelected(allowance, installment) {
      let check = this.installments.some(
        (selectedInst) => selectedInst.id === installment.id
      );
    },

    generateInstallments(paymentCycle) {
      if (!paymentCycle) return [];

      return this.installments.filter((installment) => {
        return installment.payment_cycle === paymentCycle;
      });
    },

    toggleInstallment(allowance, installment) {
      // Check if the allowance is already selected
      const index = this.selectedData.findIndex(
        (data) => data.allowance === allowance
      );
      if (index === -1) {
        // If not selected, add it to the selectedData array
        this.selectedData.push({
          allowance: allowance,
          installments: [installment],
        });
        console.log("Added to selectedData:", this.selectedData);
      } else {
        // If already selected, add or remove the installment
        const existingInstallments = this.selectedData[index].installments;
        const installmentIndex = existingInstallments.findIndex(
          (inst) => inst === installment
        );
        if (installmentIndex === -1) {
          // Add the installment if not already present
          existingInstallments.push(installment);
          console.log("Added installment to selectedData:", this.selectedData);
        } else {
          // Remove the installment if already present
          existingInstallments.splice(installmentIndex, 1);
          console.log(
            "Removed installment from selectedData:",
            this.selectedData
          );
        }

        // If there are no installments left, remove the allowance from selectedData
        if (existingInstallments.length === 0) {
          this.selectedData.splice(index, 1);
          console.log(
            "Removed allowance from selectedData:",
            this.selectedData
          );
        }
      }
    },

    submitForm() {
      const dataToSend = {
        financial_year: this.financial_year.id,
        allowances: this.selectedData.map((item) => {
          return {
            allowance_id: item.allowance.id,
            allowanceName: item.allowance.name_en,
            selectedInstallments: item.installments.map((inst) => ({
              installment_id: inst.id,
              installmentName: inst.installment_name,
            })),
          };
        }),
      };
      
      this.$axios
        .post("/admin/payroll/setting-submit", dataToSend, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          this.$toast.success("Setting submitted successfully");
          // this.$router.push("/admin/payroll/setting");
        })
        .catch((error) => {
          console.error("API error:", error);
        });
    },

    // async getSettingData() {
    //   try {
    //     const response = await this.$axios.get(
    //       `/admin/payroll/get-setting-data`,
    //       {
    //         headers: {
    //           Authorization: "Bearer " + this.$store.state.token,
    //           "Content-Type": "multipart/form-data",
    //         },
    //       }
    //     );

    //     if (response.data) {
    //       this.data = response.data.data;
    //       this.data.forEach((item) => {
    //         // Find the corresponding allowance
    //         const allowance = this.allowances.find(
    //           (a) => a.id === item.program_id
    //         );
    //         if (allowance) {
    //           // Select each installment found in the data
    //           item.installment_ids.forEach((installmentId) => {
    //             const installment = this.installments.find(
    //               (i) => i.id === installmentId
    //             );
    //             if (installment) {
    //               this.toggleInstallment(allowance, installment);
    //             }
    //           });
    //         }
    //       });
    //     } else {
    //       this.$toast.error("Something went wrong");
    //     }
    //   } catch (error) {
    //     console.error("Error fetching setting data:", error);
    //   }
    // },

    async getFinancialYear() {
      try {
        this.$axios
          .get(`/admin/payroll/get-financial-year`, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            console.log("🚀 ~ .then ~ res:", res);
            if (res.data) {
              this.financial_year = res.data;
            } else {
              this.$toast.error("Something went wrong");
            }
          })
          .catch((err) => {});
      } catch (e) {
        console.log(e);
      }
    },

    async getAllAllowance() {
      try {
        this.$axios
          .get(`/admin/payroll/get-all-allowance`, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            console.log("🚀 ~ .then ~ res:", res)
            if (res.data) {
              this.allowances = res.data;
            } else {
              this.$toast.error("Something went wrong");
            }
          })
          .catch((err) => {});
      } catch (e) {
        console.log(e);
      }
    },

    async getInstallments() {
      try {
        this.$axios
          .get(`/admin/payroll/get-all-installments`, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            if (res.data) {
              this.installments = res.data;
            } else {
              this.$toast.error("Something went wrong");
            }
          })
          .catch((err) => {});
      } catch (e) {
        console.log(e);
      }
    },
  },

  mounted() {
    this.getFinancialYear();
    this.getAllAllowance();
    this.getInstallments();
    // this.getSettingData();
  },
};
</script>

<style scoped>
.blue-background {
  background-color: #2b4978;
}
.white-text {
  color: white;
}
</style>
