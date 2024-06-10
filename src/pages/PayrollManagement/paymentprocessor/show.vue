<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card class="mb-4" elevation="2" outlined>
          <v-card-title
            class="headline"
            style="background-color: #2b4978; color: white; padding: 16px"
          >
            {{ language === "bn" ? "পেমেন্ট প্রসেসর" : "Payment Processor" }}
          </v-card-title>
          <v-card-text style="padding: 16px">
            <v-row>
              <!-- First Column: Name, Email, Phone -->
              <v-col cols="6">
                <div>
                  <div style="padding-bottom: 8px">
                    <strong
                      >{{
                        $t("container.payroll_management.processor_type")
                      }}:</strong
                    >
                    {{ data.processor_type ?? "--" }}
                  </div>
                  <div v-if="data.processor_type === 'bank'">
                    <div style="padding-bottom: 8px">
                      <strong
                        >{{
                          $t("container.payroll_management.bank_name")
                        }}:</strong
                      >
                      {{
                        language === "bn"
                          ? data.bank?.name_bn
                          : data.bank?.name_en
                      }}
                    </div>
                    <div style="padding-bottom: 8px">
                      <strong
                        >{{
                          $t("container.payroll_management.branch_name")
                        }}:</strong
                      >
                      {{ data.bank_branch_name ?? "--" }}
                    </div>
                    <div style="padding-bottom: 8px">
                      <strong
                        >{{
                          $t("container.payroll_management.routing_number")
                        }}:</strong
                      >
                      {{ data.bank_routing_number ?? "--" }}
                    </div>
                  </div>
                  <div style="padding-bottom: 8px">
                    <strong>{{ $t("container.list.name_en") }}:</strong>
                    {{ data.name_en ?? "--" }}
                  </div>
                  <div style="padding-bottom: 8px">
                    <strong>{{ $t("container.list.name_bn") }}:</strong>
                    {{ data.name_bn ?? "--" }}
                  </div>
                  <div style="padding-bottom: 8px">
                    <strong
                      >{{
                        $t("container.payroll_management.focal_phone")
                      }}:</strong
                    >
                    {{ data.focal_phone_no ?? "--" }}
                  </div>
                  <div style="padding-bottom: 8px">
                    <strong
                      >{{ $t("container.payroll_management.email") }}:</strong
                    >
                    {{ data.focal_email_address ?? "--" }}
                  </div>
                  <div style="padding-bottom: 8px">
                    <strong
                      >{{ $t("container.payroll_management.charge") }}:</strong
                    >
                    {{ data.charge ?? "--" }}%
                  </div>
                </div>
              </v-col>

              <!-- Second Column: Division, District, City Corporation, Thana, Union -->
              <v-col cols="6">
                <div>
                  <div style="padding-bottom: 8px">
                    <strong
                      >{{
                        $t("container.payroll_management.division")
                      }}:</strong
                    >
                    {{
                      language === "bn"
                        ? data.processor_area?.division?.name_bn
                        : data.processor_area?.division?.name_en
                    }}
                  </div>
                  <div style="padding-bottom: 8px">
                    <strong
                      >{{
                        $t("container.payroll_management.district")
                      }}:</strong
                    >
                    {{
                      language === "bn"
                        ? data.processor_area?.district?.name_bn
                        : data.processor_area?.district?.name_en
                    }}
                  </div>
                  <div style="padding-bottom: 8px">
                    <strong
                      >{{
                        $t("container.payroll_management.location_type")
                      }}:</strong
                    >
                    {{
                      language === "bn"
                        ? data.processor_area?.location_type?.value_bn
                        : data.processor_area?.location_type?.value_en ?? "--"
                    }}
                  </div>
                  <div
                    style="padding-bottom: 8px"
                    v-if="data.processor_area?.location_type?.id == 2"
                  >
                    <strong
                      >{{ $t("container.payroll_management.upazila") }}:</strong
                    >
                    {{
                      language === "bn"
                        ? data.processor_area?.upazila?.name_bn
                        : data.processor_area?.upazila?.name_en ?? "--"
                    }}
                  </div>
                  <div
                    style="padding-bottom: 8px"
                    v-if="data.processor_area?.location_type?.id == 2"
                  >
                    <strong
                      >{{ $t("container.payroll_management.union") }}:</strong
                    >
                    {{
                      language === "bn"
                        ? data.processor_area?.union?.name_bn
                        : data.processor_area?.union?.name_en ?? "--"
                    }}
                  </div>
                  <div
                    style="padding-bottom: 8px"
                    v-if="data.processor_area?.location_type?.id == 3"
                  >
                    <strong
                      >{{
                        $t("container.payroll_management.city_corporation")
                      }}:</strong
                    >
                    {{
                      language === "bn"
                        ? data.processor_area?.city_corporation?.name_bn
                        : data.processor_area?.city_corporation?.name_en ?? "--"
                    }}
                  </div>
                  <div
                    style="padding-bottom: 8px"
                    v-if="data.processor_area?.location_type?.id == 3"
                  >
                    <strong
                      >{{ $t("container.payroll_management.thana") }}:</strong
                    >
                    {{
                      language === "bn"
                        ? data.processor_area?.thana?.name_bn
                        : data.processor_area?.thana?.name_en ?? "--"
                    }}
                  </div>
                  <div v-if="data.processor_area?.location_type == 1">
                    <strong
                      >{{
                        $t("container.payroll_management.district_pourashava")
                      }}:</strong
                    >
                    {{
                      language === "bn"
                        ? data.processor_area?.district_pourashava?.name_bn
                        : data.processor_area?.district_pourashava?.name_en ??
                          "--"
                    }}
                  </div>
                </div>
              </v-col>
              <v-col cols="12" class="text-right">
                <router-link to="/payroll-management/payment-processor">
                  <v-btn color="primary" class="white--text">
                    {{ language === "bn" ? "পূর্ববর্তী পেজ" : "Back" }}
                  </v-btn>
                </router-link>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      data: "",
    };
  },

  computed: {
    language: {
      get() {
        return this.$store.getters.getAppLanguage;
      },
    },
  },

  methods: {
    async getData() {
      let id = this.$route.params.id;
      try {
        this.$axios
          .get(`/admin/payroll/payment-processor/${id}`, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            this.data = res?.data;
          })
          .catch((err) => {});
      } catch (e) {
        console.log("payroll-verification-setting", e);
      }
    },
  },

  mounted() {
    this.getData();
  },
};
</script>

<style lang="scss" scoped></style>
