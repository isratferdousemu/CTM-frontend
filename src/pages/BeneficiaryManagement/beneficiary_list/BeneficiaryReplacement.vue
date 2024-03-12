<template>
  <div id="aplication_list">
    <v-row class="mx-5 mt-4">
      <v-col cols="12">
        <div class="d-block text-right">
          <v-btn
            elevation="2"
            class="btn my-2"
            color="primary"
            router
            to="/beneficiary-management/beneficiary-replacement-list"
          >
            {{ $t("container.list.view-list") }}
          </v-btn>
        </div>
        <v-expansion-panels v-model="panel" multiple>
          <v-expansion-panel>
            <v-expansion-panel-header color="#8C9EFF">
              {{
                $t(
                  "container.beneficiary_management.beneficiary_list.beneficiary_replacement"
                )
              }}
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <ValidationObserver ref="form" v-slot="{ invalid }">
                <form @submit.prevent="submit()">
                  <v-row class="mt-10">
                    <v-col lg="6" md="6" cols="12">
                      <v-text-field
                        :label="
                          $t(
                            'container.beneficiary_management.beneficiary_list.replacement_with'
                          )
                        "
                        outlined
                        disabled
                        v-model="ben_id_with_name"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col lg="6" md="6" cols="12">
                      <v-text-field
                        :label="
                          $t(
                            'container.beneficiary_management.beneficiary_list.contract_number'
                          )
                        "
                        outlined
                        disabled
                        v-model="beneficiary.mobile"
                      >
                      </v-text-field>
                    </v-col>

                    <v-col lg="6" md="6" cols="12">
                      <v-textarea
                        :label="
                          $t(
                            'container.beneficiary_management.beneficiary_list.replacement_cause_details'
                          )
                        "
                        outlined
                        v-model="data.cause_details"
                      >
                      </v-textarea>
                    </v-col>

                    <v-col lg="6" md="6" cols="12">
                      <ValidationProvider
                        name="Reason"
                        vid="data.exit_reason_id"
                        rules="required"
                        v-slot="{ errors }"
                      >
                        <v-autocomplete
                          :hide-details="errors[0] ? false : true"
                          v-model="data.cause_type"
                          outlined
                          :label="
                            $t(
                              'container.beneficiary_management.beneficiary_list.replacement_cause'
                            )
                          "
                          :items="cause_types"
                          item-text="value_en"
                          item-value="id"
                          required
                          clearable
                          :error="errors[0] ? true : false"
                          :error-messages="errors[0]"
                        ></v-autocomplete>
                      </ValidationProvider>
                    </v-col>

                    <v-col lg="6" md="6" cols="12">
                      <v-menu
                        v-model="menu2"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            outlined
                            clearable
                            v-model="data.date_of_impact"
                            :label="
                              $t(
                                'container.beneficiary_management.beneficiary_list.cause_date'
                              )
                            "
                            prepend-inner-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="data.date_of_impact"
                          @input="menu2 = false"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col lg="6" md="6" cols="12">
                      <v-file-input
                        outlined
                        show-size
                        counter
                        prepend-inner-icon="mdi mdi-file-account-outline"
                        :label="
                          $t(
                            'container.beneficiary_management.beneficiary_list.cause_provement'
                          )
                        "
                        accept="image/*, application/pdf"
                        prepend-icon=""
                        v-model="data.file"
                      ></v-file-input>
                    </v-col>
                  </v-row>

                  <v-row class="mx-0 my-0 py-2" justify="end">
                    <v-btn
                      @click="resetBeneficiary"
                      flat
                      class="custom-btn-width py-2 mr-2"
                    >
                      {{ $t("container.list.reset") }}
                    </v-btn>
                    <v-btn
                      type="submit"
                      flat
                      :disabled="invalid"
                      class="custom-btn-width success white--text py-2"
                    >
                      {{ $t("container.list.replace") }}
                    </v-btn>
                  </v-row>
                </form>
              </ValidationObserver>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>

      <v-col cols="12">
        <v-card>
          <v-card-title class="justify-center" tag="div">
            <h3 class="text-uppercase pt-3">
              {{
                $t(
                  "container.beneficiary_management.beneficiary_list.beneficiary_waiting_list"
                )
              }}
            </h3>
          </v-card-title>
          <v-card-text>
            <v-row
              class="ma-0 pa-3 white round-border d-flex justify-space-between align-center"
              justify="center"
              justify-lg="space-between"
            >
              <v-col cols="12">
                <v-data-table
                  :loading="loading"
                  item-key="id"
                  :headers="headers"
                  :items="replaceList"
                  :items-per-page="pagination.perPage"
                  hide-default-footer
                  class="elevation-0 transparent row-pointer"
                >
                  <template v-slot:item.id="{ item, index }">
                    {{
                      (pagination.current - 1) * pagination.perPage + index + 1
                    }}
                  </template>
                  <template v-slot:item.name_en="{ item }">
                    {{ item.name_en }}
                  </template>
                  <template v-slot:item.name_bn="{ item }">
                    {{ item.name_bn }}
                  </template>

                  <template v-slot:item.id="{ item }">
                    <td>
                      <v-checkbox
                        :value="item.id === selectedId"
                        @change="onCheckboxChange(item.id)"
                      />
                    </td>
                  </template>

                  <!-- Action Button -->
                  <template v-slot:item.actions="{ item }">
                    <v-tooltip top>
                      <template v-slot:activator="{ on }">
                        <v-btn
                          v-can="'update-post'"
                          fab
                          x-small
                          v-on="on"
                          color="success"
                          elevation="0"
                          router
                          :to="`/beneficiary-management/beneficiary-info/details/${item.id}`"
                        >
                          <v-icon> mdi-eye </v-icon>
                        </v-btn>
                      </template>
                      <span>
                        {{ $t("container.list.view") }}
                      </span>
                    </v-tooltip>
                  </template>
                  <!-- End Action Button -->
                  <template v-slot:footer="item">
                    <div
                      class="text-center pt-2 v-data-footer justify-center pb-2"
                    >
                      <v-select
                        style="
                          position: absolute;
                          right: 25px;
                          width: 149px;
                          transform: translate(0px, 0px);
                        "
                        :items="items"
                        hide-details
                        dense
                        outlined
                        @change="onPageChange"
                        v-model="pagination.perPage"
                      ></v-select>
                      <v-pagination
                        circle
                        primary
                        v-model="pagination.current"
                        :length="pagination.total"
                        @input="onPageChange"
                        :total-visible="11"
                        class="custom-pagination-item"
                      ></v-pagination>
                    </div>
                  </template>
                </v-data-table>
              </v-col>
            </v-row>
            <v-row class="mx-0 my-0 py-2" justify="end">
              <v-btn
                type="submit"
                flat
                router
                to="/beneficiary-management/beneficiary-info"
                :disabled="invalid"
                class="custom-btn-width py-2 mr-2"
              >
                {{ $t("container.list.back") }}
              </v-btn>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { extend, ValidationProvider, ValidationObserver } from "vee-validate";
import { required } from "vee-validate/dist/rules";

extend("required", required);
export default {
  name: "Index",
  title: "CTM - Beneficiary Replacement",
  data() {
    return {
      data: {
        cause_type: null,
        cause_details: "",
        date_of_impact: "",
        file: "",
      },

      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      loading: false,
      pagination: {
        current: 1,
        total: 0,
        perPage: 10,
      },
      items: [5, 10, 15, 20, 40, 50, 100],
      panel: [0],
      beneficiary: {},
      ben_id_with_name: "",
      replaceList: [],
      selected: [],
      cause_types: [],

      cb: {},
      selectedId: null,
    };
  },
  methods: {
    updateHeaderTitle() {
      const title = this.$t(
        "container.beneficiary_management.beneficiary_list.beneficiary_replacement"
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
            this.beneficiary = result.data.data;
            this.ben_id_with_name = this.beneficiary.application_id.concat(
              "_",
              this.beneficiary.name_en
            );
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
    async GetReplaceList() {
      this.loading = true;
      try {
        const queryParams = {
          exclude_beneficiary_id: this.$route.params.id,
        };
        this.$axios
          .get(`/admin/beneficiary/getListForReplace`, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
            params: queryParams,
          })
          .then((result) => {
            this.replaceList = result.data.data;
            this.loading = false;
          })
          .catch((err) => {
            if (err.response?.data?.errors) {
              this.$refs.form.setErrors(err.response.data.errors);
            }
            console.log(err.response);
            this.$toast.error(err?.response?.data?.message);
          });
      } catch (e) {
        console.log("beneficiary__replaceList", e);
      }
    },
    onCheckboxChange(id) {
      console.log("CHECK_BOX_ID", id);
      if (this.selectedId === id) {
        this.selectedId = null;
      } else {
        this.selectedId = id;
      }
    },
    submit() {
      try {
        let fd = new FormData();
        if (this.selectedId) {
          fd.append("replace_with_ben_id", this.selectedId);
          fd.append("cause_id", this.data.cause_type);
          fd.append("cause_detail", this.data.cause_details);
          fd.append("cause_date", this.data.date_of_impact);
          fd.append("cause_proof_doc", this.data.file);

          const data = { formData: fd, id: this.$route.params.id };
          this.$store
            .dispatch("BeneficiaryManagement/BeneficiaryReplacement", data)
            .then((res) => {
              console.log(res, "submit__");
              if (res.data?.success) {
                this.$toast.success("Beneficiary Replace Successfully");
                this.$router.push({ name: "beneficiary_replacement_list" });
              } else {
                console.log("ERROR__", res?.message);
                this.$refs.form.setErrors(res?.message);
                this.errors = res?.message;
                this.$toast.error(res?.message);
              }
            });
        } else {
          this.$toast.success("Please select a Replacement Item");
        }
      } catch (e) {
        console.log("submit__", e);
      }
    },
    async GetAllCommitteeType() {
      try {
        this.$store.dispatch("getLookupByType", 21).then((data) => {
          this.cause_types = data;
          console.log(this.cause_types, "Cause_type");
        });
      } catch (e) {
        console.log(e);
      }
    },
    resetBeneficiary() {
      this.data.cause_type = null;
      this.data.cause_details = null;
      this.data.date_of_impact = null;
      this.data.file = null;
    },
  },
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    },

    checked() {
      var obj = Object.entries(this.cb) // [key, value]
        .filter((o) => o[1]) // filter by truthy values
        .map((o) => o[0]); // map the keys

      console.log("checked__", obj.length);

      return obj;
    },

    headers() {
      return [
        {
          text: this.$t("container.list.single_select"),
          value: "id",
          align: "start",
          sortable: false,
        },
        {
          text: this.$t(
            "container.beneficiary_management.beneficiary_list.beneficiary_id"
          ),
          value: "application_id",
        },
        {
          text: this.$t("container.list.name_en"),
          value: "name_en",
        },
        {
          text: this.$t(
            "container.application_selection.application.father_name_en"
          ),
          value: "father_name_en",
        },
        {
          text: this.$t("container.application_selection.application.mobile"),
          value: "mobile",
        },
        {
          text: this.$t("container.list.action"),
          value: "actions",
          align: "center",
          sortable: false,
        },
      ];
    },
  },

  watch: {
    "$i18n.locale": "updateHeaderTitle",
    date(val) {
      this.dateFormatted = this.formatDate(this.date);
    },
  },
  created() {},
  beforeMount() {
    this.updateHeaderTitle();
    this.GetBeneficiaryDetails(this.$route.params.id);
    this.GetReplaceList();
    this.GetAllCommitteeType();
  },
  mounted() {},
};
</script>
