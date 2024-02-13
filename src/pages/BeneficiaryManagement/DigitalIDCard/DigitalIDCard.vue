<template>
  <div id="digital_id">
    <div class="d-flex justify-center my-5">
      <v-card id="printIDCard" ref="card" width="400" class="mx-5">
        <v-card-text style="
              background: url('/assets/images/top_line.jpg') no-repeat left top;
              background-size: 80%;
              position: relative;
            ">
          <v-img class="top-left-image" style="width: 80px; height: 80px" src="/assets/images/logo.png"></v-img>
          <v-img class="top-right-image" style="width: 80px; height: 80px"
            src="/assets/images/bangladesh-govt-logo.png"></v-img>
          <v-row justify="center">
            <div justify-center>
              <v-col>
                <v-img :src="beneficiary.image" :width="230" :height="230" class="rounded-circle"
                  v-if="beneficiary.image"></v-img>
                <v-img v-if="!beneficiary.image" src="/assets/images/profile.png" :width="230" :height="230"
                  class="rounded-circle"></v-img>
              </v-col>
            </div>
          </v-row>

          <div class="mt-4">
            <table>
              <tr>
                <th class="text-left" width="50%">
                  {{
                    $t(
                      "container.beneficiary_management.beneficiary_list.beneficiary_name"
                    )
                  }}
                </th>
                <td>: {{ beneficiary.name_en }}</td>
              </tr>
              <tr>
                <th class="text-left">
                  {{
                    $t(
                      "container.beneficiary_management.beneficiary_list.beneficiary_id"
                    )
                  }}
                </th>
                <td>: {{ beneficiary.application_id }}</td>
              </tr>
              <tr>
                <th class="text-left">
                  {{
                    $t(
                      "container.beneficiary_management.beneficiary_list.beneficiary_date_of_birth"
                    )
                  }}
                </th>
                <td>: {{ beneficiary.date_of_birth }}</td>
              </tr>
              <tr>
                <th class="text-left">
                  {{
                    $t(
                      "container.beneficiary_management.beneficiary_list.beneficiary_addess"
                    )
                  }}
                </th>
                <td>: {{ beneficiary.current_address }}</td>
              </tr>
            </table>
          </div>

          <v-row class="mt-5">
            <v-col>
              <qr-code v-if="this.beneficiary.qrCode" :text="this.beneficiary.qrCode" size="100">
              </qr-code>
            </v-col>
            <v-col class="justify">
              <v-img class="bottom-right-image" src="/assets/images/signature.png" :width="200"></v-img>
              <div class="d-flex justify-center my-2" style="text-decoration: overline">
                {{
                  $t(
                    "container.beneficiary_management.beneficiary_list.authorize_singneture"
                  )
                }}
              </div>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="py-5" style="
              background: url('/assets/images/bottom_line.jpg') no-repeat right
                bottom;
              background-size: 90%;
              position: relative;
            ">&nbsp;</v-card-actions>
      </v-card>
    </div>
    <div class="d-flex justify-center mb-10">
      <v-btn elevation="2" class="btn mr-2 justify-center" color="success" @click="pritIdCard()">{{
        $t("Print") }}</v-btn>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
// const card = ref(null);
import VueQRCodeComponent from "vue-qrcode-component";
// APi Base Url
const apiUrl = process.env.VUE_APP_BASE_API_URL_BACKEND;
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
  mounted() { },

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
    pritIdCard() {
      var content = document.getElementById("printIDCard");
      var printWindow = window.open('', '_blank');
      printWindow.document.write('<html><head><title>Print</title>');
      printWindow.document.write('</head><body>');
      printWindow.document.write('<style>@media print {body {-webkit-print-color-adjust: exact;}}</style>');
      printWindow.document.write(content.outerHTML);
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      setTimeout(function () {
        printWindow.print();
      }, 3000);
    },
  },
  watch: {
    "$i18n.locale": "updateHeaderTitle",
  },
  created() { },
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

@media print {
  body {
    visibility: hidden;
  }

  #divToPrint {
    visibility: visible;
    position: absolute;
    left: 0;
    top: 0;
  }
}
</style>
