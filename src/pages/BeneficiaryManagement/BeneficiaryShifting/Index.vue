<template>
  <div id="information_tracking">
    <v-row class="mx-5 mt-4">
      <v-col cols="12">
        <!-- Expantion panels start -->
        <v-expansion-panels v-model="panel" multiple>
          <v-expansion-panel v-model="panel" multiple>
            <v-expansion-panel-header color="#8C9EFF">
              <h3 class="white--text">
                {{ $t("container.list.search") }}
              </h3>
            </v-expansion-panel-header>
            <v-expansion-panel-content class="elevation-0 transparent mt-2">
              <ValidationObserver ref="form" v-slot="{ invalid }">
                <form @submit.prevent="">
                  <v-row>
                    <v-col cols="12">
                      <v-card elevation="1" outlined>
                        <v-card-title> </v-card-title>
                        <v-card-text>
                          <v-row>
                            <v-col lg="6" md="6" cols="12">
                              <ValidationProvider v-slot="{ errors }">
                                <v-text-field
                                  outlined
                                  clearable
                                  v-model="ben_search_id"
                                  :label="
                                    $t(
                                      'container.beneficiary_management.beneficiary_list.beneficiary_id'
                                    )
                                  "
                                  required
                                  :append-icon="'mdi-file-find'"
                                  @click:append="onFindBeneficary"
                                  :error="errors[0] ? true : false"
                                  :error-messages="errors[0]"
                                >
                                </v-text-field>
                              </ValidationProvider>
                            </v-col>
                          </v-row>
                        </v-card-text>
                      </v-card>
                    </v-col>
                    <v-col cols="12" v-if="data.beneficiary_id">
                      <v-card elevation="1" outlined>
                        <v-card-title> </v-card-title>
                        <v-card-text>
                          <v-row>
                            <v-col cols="12">
                              <v-card justify="center" class="mb-2">
                                <v-card-title> </v-card-title>
                                <v-card-text>
                                  <table>
                                    <tr>
                                      <td>Beneficiary ID</td>
                                      <td>: {{data.beneficiary_id}}</td>
                                    </tr>
                                    <tr>
                                      <td>Name</td>
                                      <td>: Radur Rahim</td>
                                    </tr>
                                    <tr>
                                      <td>Address</td>
                                      <td>: Naogaon sadar, Naogaon</td>
                                    </tr>
                                  </table>
                                </v-card-text>
                              </v-card>
                            </v-col>
                          </v-row>
                          <div class="d-inline d-flex justify-end">
                            <v-btn
                              elevation="2"
                              class="btn mr-2 mb-2"
                              color="success"
                              type="submit"
                              flat
                              :disabled="invalid"
                              >{{ $t("container.list.add") }}</v-btn
                            >
                          </div>
                        </v-card-text>
                      </v-card>
                    </v-col>
                  </v-row>
                </form>
              </ValidationObserver>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <!-- Expantion panels end -->
      </v-col>

      <v-col cols="12" v-if="data.beneficiary_id">
        <v-card elevation="1" outlined class="mb-2">
          <v-card-title> </v-card-title>
          <v-card-text>
            <ValidationObserver ref="form" v-slot="{ invalid }">
              <form @submit.prevent="">
                <v-row>
                  <v-col lg="6" md="6" cols="12">
                    <ValidationProvider
                      name="ProgramName"
                      vid="program_id"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-autocomplete
                        :hide-details="errors[0] ? false : true"
                        @input="onChangeProgramName($event)"
                        v-model="data.program_id"
                        clearable
                        outlined
                        :label="
                          $t(
                            'container.application_selection.application.program'
                          )
                        "
                        :items="programs"
                        item-text="name_en"
                        item-value="id"
                        required
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
                          v-model="date"
                          :label="
                            $t(
                              'container.beneficiary_management.beneficiary_shifting.activation_date'
                            )
                          "
                          prepend-inner-icon="mdi-calendar"
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="date"
                        @input="menu2 = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>

                  <v-col lg="6" md="6" cols="12">
                    <ValidationProvider v-slot="{ errors }">
                      <v-text-field
                        outlined
                        clearable
                        @input="onChangeDivision($event)"
                        v-model="data.division_id"
                        :label="
                          $t(
                            'container.beneficiary_management.beneficiary_shifting.activation_date'
                          )
                        "
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                      >
                      </v-text-field>
                    </ValidationProvider>
                  </v-col>
                </v-row>
                <div class="d-inline d-flex justify-end mt-5">
                  <v-btn elevation="2" class="btn mr-2">{{
                    $t("container.list.reset")
                  }}</v-btn>
                  <v-btn
                    elevation="2"
                    class="btn mr-2"
                    color="success"
                    :disabled="invalid"
                    >{{ $t("container.list.exit") }}</v-btn
                  >
                </div>
              </form>
            </ValidationObserver>
          </v-card-text>
        </v-card>

        <v-card>
          <v-card-title class="font-weight-bold justify-center">
            {{
              $t("container.beneficiary_management.beneficiary_shifting.title")
            }}
          </v-card-title>
          <v-data-table
            item-key="id"
            :headers="headers"
            :items="beneficiaries"
            class="elevation-0 transparent row-pointer mt-5"
            hide-default-footer
          >
            <!-- Action Button -->
            <template v-slot:item.actions="{ item }">
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn
                    v-can="'update-post'"
                    fab
                    x-small
                    v-on="on"
                    color="#AFB42B"
                    elevation="0"
                    class="white--text"
                  >
                    <v-icon> mdi-delete </v-icon>
                  </v-btn>
                </template>
                <span>
                  {{ $t("container.list.delete") }}
                </span>
              </v-tooltip>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { extend, ValidationProvider, ValidationObserver } from "vee-validate";
import { required } from "vee-validate/dist/rules";
export default {
  name: "DigitalIndex",
  title: "CTM - Digital ID Card",

  data() {
    return {
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      search: "",
      programs: [],
      panel: [0],

      ben_search_id: null,
      beneficiaries: [],
      beneficiary: null,
      data: {
        program_id: null,
        division_id: null,
        beneficiary_id: null,
      },
    };
  },
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  computed: {
    headers() {
      return [
        {
          text: this.$t("container.list.sl"),
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
          text: this.$t("container.application_selection.application.program"),
          value: "program_name",
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

  methods: {
    async onFindBeneficary() {
      this.Getbeneficiary();
    },
    async Getbeneficiary() {
      if (this.ben_search_id) {
        this.$axios
          .get("/admin/beneficiary/getByBeneficiaryId/" + this.ben_search_id, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
            //   params: queryParams,
          })
          .then((result) => {
            console.log("BEN_DET__", result.data.data);
            this.beneficiary = result.data.data;
           this.data.beneficiary_id = result.data.data.application_id;
            console.log("BEN_DET__2", this.beneficiary.application_id);
          });
      }else{
        this.$toast.success("Please Search with Valid Beneficiary ID");
      }
    },

    getByBeneficiaryId() {
      this.Getbeneficiary(this.data.beneficiary_id);

      let data = {
        id: 1,
        application_id: this.data.beneficiary_id,
        name_en: "Monir",
        program_name: "Widow",
        father_name_en: "A Mondal",
        mobile: "01731982323",
      };
      var result = this.beneficiaries.filter(
        (beneficiary) => beneficiary.application_id === data.application_id
      );
      if (result.length === 0) {
        this.beneficiaries.push(data);
      }

      //this.data.beneficiary_id = null;
    },
    async GetAllProgram() {
      try {
        this.$axios
          .get("/admin/allowance/get", {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((result) => {
            console.log(result, "programs");
            this.programs = result.data.data;
          })
          .catch((err) => {
            console.log(err, "error");
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
    updateHeaderTitle() {
      const title = this.$t(
        "container.beneficiary_management.beneficiary_shifting.title"
      );
      this.$store.commit("setHeaderTitle", title);
    },
  },
  watch: {
    "$i18n.locale": "updateHeaderTitle",
    value(val) {},
  },

  beforeMount() {
    this.updateHeaderTitle();
  },
  mounted() {
    this.GetAllProgram();
    this.$store
      .dispatch("getLookupByType", 1)
      .then((res) => (this.locationType = res));
  },
};
</script>