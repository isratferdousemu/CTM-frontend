<template>
  <div id="success">
    <v-app-bar color="#405c61" fixed height="80" class="px-4" dense dark>
      <v-row align="center" no-gutters>
        <v-img class="p-3 mr-4" max-height="100%" max-width="60px" position="center center" src="/assets/images/logo.png"></v-img>
        <v-toolbar-title>{{ $t('container.application_selection.application.title_online_1') }}<br>{{ $t('container.application_selection.application.title_online_2') }}
        </v-toolbar-title>



        <v-col>
          <!-- Empty column to create space between title and LocaleSwitcher -->
        </v-col>
        <v-col>
          <!-- Empty column to create space between title and LocaleSwitcher -->
        </v-col>
        <v-col>
          <!-- Empty column to create space between title and LocaleSwitcher -->
        </v-col>
        <v-col>
          <!-- Empty column to create space between title and LocaleSwitcher -->
        </v-col>
        <v-col>
          <!-- Empty column to create space between title and LocaleSwitcher -->
        </v-col>
        <v-col>
          <!-- Empty column to create space between title and LocaleSwitcher -->
        </v-col>

        <v-col>
          <v-row align="center" justify="end" no-gutters>
            <v-col>
              <!-- Adjust the styling of LocaleSwitcher as needed -->
              <LocaleSwitcher />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-app-bar>
    <v-row class="mt-10">
      <v-col cols="6" class="mx-auto mt-10">
        <v-card>
          <v-card-text class="mt-10 text-center">
            <p style="font-size: 15px" class="mt-5">
              {{ $t('container.application_selection.application.successfull') }} {{ successId }}

            </p>
            <p style="font-size: 15px" class="mt-5"> {{ $t('container.application_selection.application.tracking') }} </p>


            <v-btn elevation="2" class="btn mr-2 white--text" color="red darken-4" @click="generatePDF">
              {{ $t("container.list.PDF") }}
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import LocaleSwitcher from "@/components/Common/LocaleSwitcher"
export default {
  components: {

    LocaleSwitcher
  },

  computed: {
    successId() {
      return this.$store.state.ApplicationSelection.successId;
    },
  },
  methods: {
    generatePDF() {
      const queryParams = {
        // application_id: this.successId,

        language: this.$i18n.locale,

        application_id: this.successId,
        program: this.$t('container.application_selection.application.program'),
        application: this.$t('container.application_selection.application.applicant_id'),
        title: this.$t('container.application_selection.application.title'),
        mobile:this.$t("container.application_selection.application.mobile"),
        personal_info: this.$t('container.application_selection.application.personal_info'),
        name_en: this.$t('container.application_selection.application.name_en'),
        name_bn: this.$t('container.application_selection.application.name_bn'),
        nid: this.$t('container.application_selection.application.nid_brn'),
        date_of_birth: this.$t('container.application_selection.application.date_of_birth'),
        father_name_en: this.$t('container.application_selection.application.father_name_en'),
        father_name_bn: this.$t('container.application_selection.application.father_name_bn'),
        mother_name_en: this.$t('container.application_selection.application.mother_name_en'),
        mother_name_bn: this.$t('container.application_selection.application.mother_name_bn'),
        spouse_name_en: this.$t('container.application_selection.application.spouse_name_en'),
        spouse_name_bn: this.$t('container.application_selection.application.spouse_name_bn'),
        religion: this.$t('container.system_config.allowance_program.religion'),
        gender: this.$t('container.system_config.allowance_program.gender'),
        marital_status: this.$t('container.system_config.allowance_program.marital_status'),
        present_address: this.$t('container.application_selection.application.present_address'),
        permanent_address: this.$t('container.application_selection.application.permanent_address'),
        division: this.$t('container.system_config.demo_graphic.division.division'),
        district: this.$t('container.system_config.demo_graphic.district.district'),
        union_pouro_city: this.$t('container.system_config.demo_graphic.ward.union_pouro_city'),
        ward: this. $t('container.system_config.demo_graphic.ward.ward'),
        location: this.$t('container.system_config.demo_graphic.ward.upazila_city_district'),
        nominee_info: this.$t('container.application_selection.application.nominee_info'),
        nominee_en: this.$t('container.beneficiary_management.beneficiary_list.nominee'),
        nominee_address: this.$t('container.application_selection.application.nominee_address'),
        nationality: this.$t('container.application_selection.application.nationality'),
        relationship: this.$t('container.application_selection.application.relationship'),
        bank_info: this.$t('container.application_selection.application.bank'),
        account_ownership: this.$t('container.application_selection.application.account_ownership'),
        account_no: this.$t('container.beneficiary_management.beneficiary_list.account_no'),
        bank_name: this.$t('container.application_selection.application.bank_name'),
        branch_name: this.$t('container.application_selection.application.branch_name'),






      };
      this.$axios
          .get("/global/applicants_copy", {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
            params: queryParams,
            responseType: 'arraybuffer',
          })
          .then((result) => {
            // console.log(result,"result");

            const blob = new Blob([result.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            window.open(url, '_blank');


          })
          .catch(error => {
            console.error('Error generating PDF:', error);
          });
    },
  }
};
</script>
