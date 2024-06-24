<template>
  <div id="Certificate">
    <v-row class="mx-5 mt-4">
      <v-col cols="12">
        <v-row>
          <Spinner :loading="isLoading" />
          <v-col cols="12">
            <v-card
                elevation="10"
                color="white"
                rounded="md"
                theme="light"
                class="mb-8"
            >
              <v-card-title
                  class="justify-center text-center"
                  tag="div"
                  style="background-color: #1C3B68; color: white; font-size: 17px; padding: 1px !important;"
              >
                <h4 class="text-uppercase mt-0">
                  {{ $t('container.training_management.training_program.certificate') }}
                </h4>
              </v-card-title>
              <v-card-text>
                <v-row justify="end" align="center" class="mt-1">
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <v-btn fab x-small v-on="on" color="green"
                             class=" mr-2 white--text mb-1" elevation="0"
                             @click="downloadCertificate"
                      >
                        <v-icon> mdi-file-download-outline </v-icon>
                      </v-btn>
                    </template>
                    <span>{{ $t("container.list.PDF") }}</span>
                  </v-tooltip>

                </v-row>
                <v-row class="mt-5" justify="center">
                  <v-col cols="12" md="12">
                    <div class="certificate" ref="certificate">
                      <v-card class="card">
                        <h1 class="text-center great-vibes" style="position: absolute; top: 325px; left: 50%; transform: translate(-50%, -50%); z-index: 1;">
                          {{ this.certificateInfo.user_name }}
                        </h1>
                        <h4 class="text-center" style="position: absolute; top: 418px; left: 50%; transform: translate(-50%, -50%); z-index: 1;">
                          {{ this.certificateInfo.program_name }}
                        </h4>
                        <h4 class="text-center" style="position: absolute; top: 500px; left: 26%; transform: translate(-50%, -50%); z-index: 1;">
                          {{ this.certificateInfo.passing_date }}
                        </h4>
                      </v-card>
                    </div>
                  </v-col>
                </v-row>
              </v-card-text>

            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Spinner from "@/components/Common/Spinner.vue";
import html2pdf from "html2pdf.js";

export default {
  name: "Certificate",
  data() {
    return {
      isLoading: false,
      certificateInfo:{}
    };
  },
  components: {
    Spinner,
  },
  methods: {
    downloadCertificate() {
      const element = this.$refs.certificate;
      const options = {
        margin: [0, 0, 0, 0],
        filename: this.certificateInfo.user_name+'.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: true,
          allowTaint: true,
        },
        jsPDF: {
          unit: 'mm',
          format: 'a4',
          orientation: 'landscape' // Set to landscape
        }
      };

      html2pdf().from(element).set(options).save();
    },
  },
  created() {
    this.certificateInfo = this.$route.params.certificate;
    if (typeof this.certificateInfo === 'undefined') {
      this.$toast.error('Certificate information is missing. Redirecting back to the previous page.')
      this.$router.go(-1);
    }
  },
  mounted() {

  }
};
</script>

<style scoped>
.certificate {
  max-width: 1000px;
  height: 650px;
  margin: 0 auto;
  padding: 0px;
  position: relative;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url('/public/assets/images/certificate.png');
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.shadow {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}


.great-vibes {
  font-size: 48px;
  color: #333;
}

</style>
