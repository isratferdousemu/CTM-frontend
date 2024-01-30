<template>
  <div id="digital_id">
    <v-row justify="center" class="mt-5 mb-5">
      <v-col lg="6" md="6" cols="12">
        <v-card width="400" class="mx-5">
          <v-card-text
            style="
              background: url('/assets/images/top_line.jpg') no-repeat left top;
              background-size: 80%;
              position: relative;
            "
          >
            <v-img
              class="top-left-image"
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
                    :width="230"
                    :height="230"
                    class="rounded-circle"
                    v-if="beneficiary.image"
                  ></v-img>
                  <v-img
                    v-if="!beneficiary.image"
                    src="/assets/images/profile.png"
                    :width="230"
                    :height="230"
                    class="rounded-circle"
                  ></v-img>
                </v-col>
              </div>
            </v-row>

            <div class="mt-4">
              <table>
                <tr>
                  <th class="text-left" width="50%">Beneficiary's Name</th>
                  <td>: {{ beneficiary.name_en }}</td>
                </tr>
                <tr>
                  <th class="text-left">Beneficiary ID</th>
                  <td>: {{ beneficiary.application_id }}</td>
                </tr>
                <tr>
                  <th class="text-left">Date of Birth</th>
                  <td>: {{ beneficiary.date_of_birth }}</td>
                </tr>
                <tr>
                  <th class="text-left">Address</th>
                  <td>: {{ beneficiary.current_address }}</td>
                </tr>
              </table>
            </div>

            <v-row class="mt-5">
              <v-col>
                <qr-code
                  v-if="this.beneficiary.qrCode"
                  :text="this.beneficiary.qrCode"
                  size="100"
                >
                </qr-code>
              </v-col>
              <v-col class="justify-end">
                <v-img
                  class="bottom-right-image"
                  src="/assets/images/signature.png"
                  :width="200"
                ></v-img>
                <div
                  class="d-flex justify-end my-2"
                  style="text-decoration: overline"
                >
                  Authorized Signature
                </div>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions
            class="py-5"
            style="
              background: url('/assets/images/bottom_line.jpg') no-repeat right
                bottom;
              background-size: 90%;
              position: relative;
            "
            >&nbsp;</v-card-actions
          >
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

            this.beneficiary.qrCode = `Beneficiary Name: ${item?.name_en}, Beneficiary ID : ${item?.application_id}`;
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