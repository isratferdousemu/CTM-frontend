<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card v-for="allowance in allowances" :key="allowance.type" class="mb-4">
          <v-card-title>{{ allowance.name }}</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item v-for="installment in generateInstallments(allowance.payment_cycle)" :key="installment.text">
                <v-list-item-content>{{ installment.text }}</v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<!-- <template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card v-for="allowance in allowances" :key="allowance.type" class="mb-4">
          <v-row no-gutters>
            <v-col cols="6">
              <v-card-title>{{ allowance.name }}</v-card-title>
            </v-col>
            <v-col cols="6">
              <v-card-text>
                <v-list>
                  <v-checkbox v-for="installment in generateInstallments(allowance.payment_cycle)" :key="installment.text" v-model="installment.checked" :label="installment.text"></v-checkbox>
                </v-list>
              </v-card-text>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template> -->

<script>
export default {
  data() {
    return {
      allowances: [
        {
          name: "Widow Allowance",
          payment_cycle: "monthly",
        },
        {
          name: "Widow Allowance2",
          payment_cycle: "quarterly",
        },
      ],
    };
  },
  methods: {
    generateInstallments(paymentCycle) {
      let numInstallments = 0;
      if (paymentCycle === "monthly") {
        numInstallments = 12;
      } else if (paymentCycle === "quarterly") {
        numInstallments = 4;
      }

      const installments = [];
      for (let i = 1; i <= numInstallments; i++) {
        const installmentText = `Installment ${i}`;
        installments.push({ text: installmentText, checked: false });
      }
      return installments;
    },
  },
};
</script>

<style scoped>
.v-card {
  height: 100%;
}
</style>

