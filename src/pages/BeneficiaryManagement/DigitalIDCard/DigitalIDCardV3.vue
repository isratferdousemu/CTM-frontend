<template>
  <div id="digital_id">
    <div class="d-flex justify-center my-5">
      
      <div class="ic-content" id="printIDCard">
    <div class="ic-header">
      <div class="ic-header-logo clearfix">
        <div class="ic-header-logo-left">
          <img src="/assets/images/logo.png" alt="" class="ic-logo-left"/>
        </div>
        <div class="ic-header-logo-right">
          <img src="/assets/images/bangladesh-govt-logo.png" alt="" class="ic-logo-right"/>
        </div>
      </div>
      <div class="ic-header-avatar">
        <img v-if="beneficiary.image" :src="beneficiary.image" alt="" class="ic-avatar"/>
        <img v-if="!beneficiary.image" src="/assets/images/blank-profile-picture-300x300.png" alt="" class="ic-avatar"/>
      </div>
    </div>
    <div class="ic-body">
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
      <table>
        <tr>
          <td width="40%">
            <qr-code v-if="this.beneficiary.qrCode" :text="this.beneficiary.qrCode" size="100"></qr-code>
            <img v-if="!this.beneficiary.qrCode" src="/assets/images/qr_code.PNG" alt="" class="ic-qrcode"/>
          </td>
          <td>
            <div class="ic-body-signature">
              <img src="/assets/images/signature.png" alt="" class="ic-signature"/>
            </div>
            <div class="ic-body-signatory">
              {{
                  $t(
                    "container.beneficiary_management.beneficiary_list.authorize_singneture"
                  )
                }}
            </div>
          </td>
        </tr>
      </table>
    </div>
    <div class="ic-footer">&nbsp;</div>
  </div>

    </div>
    <div class="d-flex justify-center mb-10">
      <v-btn elevation="2" class="btn mr-2 justify-center" color="success" @click="printIDCard()">{{
        $t("Print") }}</v-btn>
    </div>
  </div>
</template>

<script>
import '/public/assets/css/style.css';
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
    printIDCard() {
      var content = document.getElementById("printIDCard");
      var printWindow = window.open('', '_blank','left=0,top=0');
      printWindow.document.write('<html><head><title>Print - Beneficiary ID Card</title>');
      printWindow.document.write('<link rel="stylesheet" href="/assets/css/style.css" type="text/css"/>');
      printWindow.document.write('</head><body>');
      printWindow.document.write(content.outerHTML);
      printWindow.document.write('</body></html>');
      setTimeout(function () {
        printWindow.print();
        printWindow.close();
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