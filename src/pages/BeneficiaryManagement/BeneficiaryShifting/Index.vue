<template>
  <div id="information_tracking">
    <v-row class="mx-5 mt-4">
      <v-col cols="12">
        <div class="d-block text-right">
          <v-btn
            elevation="2"
            class="btn my-2"
            color="primary"
            router
            to="/beneficiary-management/beneficiary-shifting-list"
          >
            {{ $t("container.list.view-list") }}
          </v-btn>
        </div>
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
                <form @submit.prevent="addByBeneficiaryInTable">
                  <v-row>
                    <v-col cols="12">
                      <v-card elevation="1" outlined>
                        <v-card-title> </v-card-title>
                        <v-card-text>
                          <v-row>
                            <v-col lg="6" md="6" cols="12">
                              <ValidationProvider
                                name="Beneficiary ID"
                                vid="beneficiary_id"
                                rules="required"
                                v-slot="{ errors }"
                              >
                                <v-autocomplete
                                  :hide-details="errors[0] ? false : true"
                                  v-model="ben_search_id"
                                  clearable
                                  outlined
                                  :label="
                                    $t(
                                      'container.beneficiary_management.beneficiary_list.beneficiary_id'
                                    )
                                  "
                                  :items="beneficiary_ids"
                                  item-text="application_id"
                                  item-value="id"
                                  required
                                  :error="errors[0] ? true : false"
                                  :error-messages="errors[0]"
                                  @change="GetBeneficaryDetails($event)"

                                ></v-autocomplete>
                              </ValidationProvider>
                            </v-col>
                            <v-col lg="6" md="6" cols="12">
                              <v-card
                                class="mb-2"
                                elevation="2"
                                shaped
                                outlined
                              >
                                <v-card-text>
                                  <table>
                                    <tr>
                                      <td>
                                        {{
                                          $t(
                                            "container.beneficiary_management.beneficiary_list.beneficiary_id"
                                          )
                                        }}
                                      </td>
                                      <td>
                                        :
                                        {{ beneficiary_details.application_id }}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        {{
                                          $t(
                                            "container.beneficiary_management.beneficiary_list.beneficiary_name"
                                          )
                                        }}
                                      </td>
                                      <td>
                                        : {{ beneficiary_details.name_en }}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        {{
                                          $t(
                                            "container.beneficiary_management.beneficiary_list.beneficiary_mobile"
                                          )
                                        }}
                                      </td>
                                      <td>
                                        : {{ beneficiary_details.mobile }}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        {{
                                          $t(
                                            "container.beneficiary_management.beneficiary_list.beneficiary_addess"
                                          )
                                        }}
                                      </td>
                                      <td>
                                        :
                                        {{
                                          beneficiary_details.permanent_address
                                        }}
                                      </td>
                                    </tr>
                                  </table>
                                </v-card-text>
                              </v-card>
                            </v-col>
                          </v-row>
                          <div class="d-inline d-flex justify-end">
                            <v-btn
                              elevation="2"
                              class="btn mr-2 mb-1"
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

      <v-col cols="12" v-if="beneficiariesList.length > 0">
        <v-card elevation="1" outlined class="mb-2">
          <v-card-title> </v-card-title>
          <v-card-text>
            <ValidationObserver ref="form" v-slot="{ invalid }">
              <form @submit.prevent="submitBeneficiaryShifting()">
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
                        v-model="submit_data.to_program_id"
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
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      :return-value.sync="date"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="submit_data.activation_date"
                          :label="
                            $t(
                              'container.beneficiary_management.beneficiary_shifting.activation_date'
                            )
                          "
                          prepend-inner-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          outlined
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="submit_data.activation_date"
                        no-title
                        scrollable
                      >
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu = false">
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.menu.save(submit_data.activation_date)"
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>

                  <v-col lg="6" md="6" cols="12">
                    <v-textarea
                      :label="
                        $t(
                          'container.beneficiary_management.beneficiary_shifting.cause'
                        )
                      "
                      outlined
                      v-model="submit_data.shifting_cause"
                    >
                    </v-textarea>
                  </v-col>
                </v-row>
                <v-card>
                  <v-card-title class="font-weight-bold justify-center">
                    {{
                      $t(
                        "container.beneficiary_management.beneficiary_shifting.list"
                      )
                    }}
                  </v-card-title>
                  <v-data-table
                    item-key="id"
                    :headers="headers"
                    :items="beneficiariesList"
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
                            @click="removeByBeneficiaryFromTable(item.id)"
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
                <div class="d-inline d-flex justify-end mt-5">
                  <v-btn elevation="2" class="btn mr-2">{{
                    $t("container.list.reset")
                  }}</v-btn>
                  <v-btn
                    elevation="2"
                    class="btn mr-2"
                    color="success"
                    type="submit"
                    :disabled="invalid"
                    >{{ $t("container.list.shift") }}</v-btn
                  >
                </div>
              </form>
            </ValidationObserver>
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
      table_serial: 1,

      ben_search_id: '',
      beneficiaries: [],
      beneficiary_ids: [],
      beneficiariesList: [],
      data: {
        program_id: null,
        division_id: null,

        id: null,
        beneficiary_id: null,
        name_en: null,
        program_name: null,
        father_name_en: null,
        mother_name_en: null,
        mobile: null,
      },
      beneficiary_details: {},
      submit_data: {
        to_program_id: null,
        shifting_cause: null,
        activation_date: null,
        beneficiaries: [],
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
          value: "beneficiary_id",
        },
        {
          text: this.$t("container.list.name_en"),
          value: "name_en",
        },
        {
          text: this.$t(
            "container.application_selection.application.mother_name_en"
          ),
          value: "mother_name_en",
        },
        {
          text: this.$t(
            "container.application_selection.application.father_name_en"
          ),
          value: "father_name_en",
        },
        {
          text: this.$t("container.application_selection.application.program"),
          value: "program_name",
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
    async GetBeneficaryDetails(event) {
      if(event){
      try {
        this.$axios
          .get(`/admin/beneficiary/show/${event}`, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            if (res.data?.success) {
              this.beneficiary_details = res.data.data;
              this.data = res.data.data;
            } else {
              this.$toast.error("Record not found!");
              // this.$router.push({ name: "Beneficiary_List" });
            }
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
    }else{
      this.beneficiary_details = {};
    }

    },

    async GetBeneficiaryIds() {
      this.$axios
        .get(`/admin/beneficiary/listDropDown?srcText=${this.ben_search_id}`, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          // alert(result);
          if (result.data?.success) {
            const res = result.data.data;
            console.log("BEN_DET__1", res);
            this.beneficiary_ids = res;
          } else {
            this.$toast.error("Please Search with Valid Beneficiary ID");
           // this.data.beneficiary_id = null;
          }
        });
    },
    addByBeneficiaryInTable() {
      var item = this.data;
      if (this.data.application_id !== null) {
        var result = this.beneficiariesList.filter(
          (beneficiary) => beneficiary.beneficiary_id === item.application_id
        );

        //item already loaded in list
        if (result.length === 0) {
          let data = {
            id: this.table_serial++,
            beneficiary_id: item.application_id,
            name_en: item.name_en,
            program_name: item.program.name_en,
            father_name_en: item.father_name_en,
            mother_name_en: item.mother_name_en,
            mobile: item.mobile,
          };

          this.beneficiariesList.push(data);

          //submit data prepare
          let submitData = {
            beneficiary_id: item.id,
            from_program_id: item.program.id,
          };
          this.submit_data.beneficiaries.push(submitData);
        }
        this.ben_search_id = '';
        // this.data.beneficiary_id = null;
        this.beneficiary_details = {};
      }
    },
    removeByBeneficiaryFromTable(rowId) {
      //remove from table data
      let dl = [...this.beneficiariesList];
      dl.splice(
        dl.findIndex((t) => t.id === rowId),
        1
      );
      dl.forEach((t, i) => {
        t.id = i + 1;
      });
      this.beneficiariesList = dl;

      //remove from submit json
      let data = [...this.submit_data.beneficiaries];
      data.splice(
        dl.findIndex((t) => t.id === rowId),
        1
      );
      this.submit_data.beneficiaries = data;
    },

    submitBeneficiaryShifting() {
      let fd = new FormData();

      fd.append("to_program_id", this.submit_data.to_program_id);
      fd.append("shifting_cause", this.submit_data.shifting_cause);
      fd.append("activation_date", this.submit_data.activation_date);

      console.log("bene___", this.submit_data.beneficiaries);

      // Convert each object in the beneficiaries array to a JSON string
      this.submit_data.beneficiaries.forEach((beneficiary, index) => {
        //   fd.append(`beneficiaries[${index}]`, JSON.stringify(beneficiary));
        fd.append(
          `beneficiaries[${index}][beneficiary_id]`,
          beneficiary.beneficiary_id
        );
        fd.append(
          `beneficiaries[${index}][from_program_id]`,
          beneficiary.from_program_id
        );
      });

      try {
        this.$store
          .dispatch("BeneficiaryManagement/BeneficiaryShifting", fd)
          .then((res) => {
            console.log(res, "submit__");
            if (res.data?.success) {
              console.log(res.data?.success, "submit__");
              this.$toast.success("Beneficiary Shifting Successfully");
              this.$router.push({ name: "beneficiary_shifting_list" });
            } else if (res.response?.data?.errors) {
              this.$refs.form.setErrors(res.response.data.errors);
              this.errors = res.response.data.errors;
              //   this.$toast.error(res.response.data.message);
            }
            console.log(this.$refs);
            console.log(this.errors, "this.errors");
          });
      } catch (e) {
        console.log(e);
      }
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
    this.GetBeneficiaryIds();
    this.GetAllProgram();
    this.$store
      .dispatch("getLookupByType", 1)
      .then((res) => (this.locationType = res));
  },
};
</script>