<template>
    <v-container class="fill-height d-flex align-center justify-center">
  <v-card
    class="mx-auto my-12"
    width="40%"
  >
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <!-- <v-img
      height="250"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
    ></v-img> -->

    <v-card-title class="justify-center"><b>FORGOT PASSWORD</b></v-card-title>

    <v-card-text></v-card-text>
    <v-card-text>
        Please Enter Your Phone Number
        <v-text-field
          name="input-10-2"
          label="Phone"
          hint="Phone Number"
        ></v-text-field>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="primary lighten-2"
        block
      >
        Send OTP
      </v-btn>
    </v-card-actions>
  </v-card>
</v-container>
</template>

<script>
  export default {
    data: () => ({
      loading: false,
      selection: 1,
    }),

    methods: {
      reserve () {
        this.loading = true

        setTimeout(() => (this.loading = false), 2000)
      },
    },
  }
</script>

<style lang="">
    
</style>