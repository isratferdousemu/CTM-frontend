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
          <div></div>

          <div></div>
          <div></div>
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
                    :src="beneficiary.image"
                    style="width: 230px; height: 230px"
                    v-if="beneficiary.image"
                  ></v-img>
                  <v-img
                    v-if="!beneficiary.image"
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
                  <td>: {{ beneficiary.name_en }}</td>
                </tr>
                <tr>
                  <td>Beneficiary ID</td>
                  <td>: {{ beneficiary.application_id }}</td>
                </tr>
                <tr>
                  <td>Date of Birth</td>
                  <td>: {{ beneficiary.date_of_birth }}</td>
                </tr>
                <tr>
                  <td>Address</td>
                  <td>: {{ beneficiary.current_address }}</td>
                </tr>
              </table>
            </div>

            <!-- <v-img
              src="/assets/images/qr_code.png"
              class="mt-8"
              style="width: 50px; height: 50px"
            ></v-img> -->

            <qr-code
              v-if="this.beneficiary.qrCode"
              class="mt-5 mb-5"
              :text="this.beneficiary.qrCode"
              size="100"
            >
            </qr-code>

            <v-spacer></v-spacer>

            <div class="d-flex justify-end">
              <v-img
                :src="beneficiary.signature"
                style="width: 20px; height: 20px"
                v-if="beneficiary.signature"
              ></v-img>
              <v-img
                v-if="!beneficiary.signature"
                src="/assets/images/qr_code.png"
                style="width: 100px; height: 20px"
              ></v-img>
            </div>

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
import Vue from "vue";
import VueQRCodeComponent from "vue-qrcode-component";
Vue.component("qr-code", VueQRCodeComponent);
export default {
  name: "dDigitalIDCard",
  title: "CTM - Digital ID Card",

  data() {
    return {
      beneficiary: {
        imageUrl: null,
        signUrl: null,
        qrCode: null,
      },
    };
  },
  mounted() {},

  methods: {
    updateHeaderTitle() {
      const title = this.$t(
        "container.beneficiary_management.digital_id.digital_id_card"
      );
      this.$store.commit("setHeaderTitle", title);
    },
    async GetBeneficiaryDetails(id) {
      try {
        this.$axios
          .get(`/admin/beneficiary/show/${id}`, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((result) => {
            let item = result.data.data;
            this.beneficiary = item;
            //this.beneficiary.imageUrl = item?.image;
            //this.beneficiary.signUrl = item?.signature;

            this.beneficiary.qrCode =  `Beneficiary Name: ${item?.name_en}, Beneficiary ID : ${item?.application_id}`
             
          })
          .catch((err) => {
            if (err.response?.data?.errors) {
              this.$refs.form.setErrors(err.response.data.errors);
            }
            console.log(err.response);
            this.$toast.error(err?.response?.data?.message);
          });
      } catch (e) {
        console.log(e);
      }
    },
  },
  watch: {
    "$i18n.locale": "updateHeaderTitle",
  },
  created() {},
  beforeMount() {
    this.updateHeaderTitle();
    this.GetBeneficiaryDetails(this.$route.params.id);
  },
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