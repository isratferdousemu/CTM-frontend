<template>
  <div id="digital_id">
    <v-row justify="center" class="mt-5">
      <v-col lg="6" md="6" cols="12">
        <v-card
          width="400"
          class="mx-5"
          height="700"
          style="
            background: url('/assets/images/digital_id_background.jpg') center
              center / cover;
            position: relative;
          "
        >
          <v-card-title></v-card-title>
          <v-card-text>
            <v-img
              class="absolute top-0 mb-5"
              style="width: 80px; height: 80px"
              src="/assets/images/logo.png"
            ></v-img>
            <v-img
              class="top-right-image"
              style="width: 80px; height: 80px"
              src="/assets/images/bangladesh-govt-logo.png"
            ></v-img>
            <v-row justify="center">
              <div justify-center>
                <v-col>
                  <v-img
                    src="/assets/images/profile_female.png"
                    style="width: 230px; height: 230px"
                  ></v-img>
                </v-col>
              </div>
            </v-row>

            <div justify-center>
              <table>
                <tr>
                  <td>Beneficiary's Name</td>
                  <td>: Mousumi Akter</td>
                </tr>
                <tr>
                  <td>Beneficiary ID</td>
                  <td>:</td>
                </tr>
                <tr>
                  <td>Date of Birth</td>
                  <td>:</td>
                </tr>
                <tr>
                  <td>Address</td>
                  <td>
                    :House- 6/2, (Level: 4 & 6) Kazi Nazrul Islam Road, Block-
                    F, Dhaka 1207
                  </td>
                </tr>
              </table>
            </div>

            <v-img
              src="/assets/images/qr_code.png"
              class="mt-8"
              style="width: 50px; height: 50px"
            ></v-img>

            <v-spacer></v-spacer>

            <div
              class="d-flex justify-end my-5"
              style="text-decoration: overline"
            >
              Authorized Signature
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "dDigitalIDCard",
  title: "CTM - Digital ID Card",

  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>
<style >
/* Add custom styles for the bottom-right image */
.top-right-image {
  position: absolute;
  top: 0;
  right: 0;
  margin: 25px;
  /* Adjust the margin as needed */
}
</style>