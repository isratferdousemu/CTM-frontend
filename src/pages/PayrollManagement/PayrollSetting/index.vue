<template>
  <v-container>
    <v-row>
      <v-col cols="4">
        <v-list>
          <v-list-item v-for="allowance in allowances" :key="allowance.type">
            <v-list-item-content>{{ allowance.type }}</v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
      <v-col cols="8">
        <v-list v-for="allowance in allowances" :key="allowance.type">
          <v-list-item>
            <v-list-item-content v-highlight="true" style="display: flex; flex-direction: column;">
              <v-checkbox v-for="installment in allowance.installments" :key="installment.text" :label="installment.text" hide-details></v-checkbox>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      allowances: [
        {
          type: "Financial Year",
          installments: [
            { text: "2023-24" },
          ],
        },
        {
          type: "Widow Allowance",
          installments: [
            { text: "1st installment (July 2023 September 2023)" },
            { text: "2nd installment (Oct 2023 Dec 2023)" },
            { text: "3rd installment (Jan 2024 Mar 2024)" },
            { text: "4th installment (April 2024 June 2024)" },
          ],
        },

        {
          type: "Widow Allowance2",
          installments: [
            { text: "1st installment (July 2023 September 2023)" },
            { text: "2nd installment (Oct 2023 Dec 2023)" },
            { text: "3rd installment (Jan 2024 Mar 2024)" },
            { text: "4th installment (April 2024 June 2024)" },
          ],
        },

        
        // Add more allowances as needed
      ],
    };
  },
};
</script>

<style lang="scss" scoped>

</style>