<template>
  <div id="aplication_list">
    <v-row class="mx-5 mt-4">
      <v-col cols="12">
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
              <v-row class="mt-10">
                <v-col lg="6" md="6" cols="12">
                  <v-text-field
                    :label="
                      $t(
                        'container.beneficiary_management.beneficiary_list.replacement_with'
                      )
                    "
                    outlined
                    clearable
                    v-model="beneficiary.name_en"
                  >
                  </v-text-field>
                </v-col>
                <v-col lg="6" md="6" cols="12">
                  <v-text-field
                    :label="
                      $t(
                        'container.beneficiary_management.beneficiary_list.beneficiary_details'
                      )
                    "
                    outlined
                    clearable
                    v-model="beneficiary.current_address"
                  >
                  </v-text-field>
                </v-col>

                <v-col lg="6" md="6" cols="12">
                  <v-textarea
                    :label="
                      $t(
                        'container.beneficiary_management.beneficiary_list.beneficiary_details'
                      )
                    "
                    outlined
                    clearable
                  >
                  </v-textarea>
                </v-col>

                <v-col lg="6" md="6" cols="12">
                  <v-select
                    outlined
                    menu-props="top"
                    clearable
                    :label="
                      $t(
                        'container.beneficiary_management.beneficiary_list.replacement_cause'
                      )
                    "
                  >
                  </v-select>
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
                        v-model="date"
                        :label="
                          $t(
                            'container.beneficiary_management.beneficiary_list.cause_date'
                          )
                        "
                        prepend-inner-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        outlined
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="date" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="menu = false">
                        Cancel
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.menu.save(date)"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <v-col lg="6" md="6" cols="12">
                  <v-file-input
                    outlined
                    show-size
                    counter
                    prepend-inner-icon="mdi mdi-file-account-outline"
                    accept="image/*"
                    prepend-icon=""
                  ></v-file-input>
                </v-col>
              </v-row>

              <v-row class="mx-0 my-0 py-2" justify="end">
                <v-btn
                  type="submit"
                  flat
                  :disabled="invalid"
                  :loading="loading"
                  class="custom-btn-width py-2 mr-2"
                >
                  {{ $t("container.list.reset") }}
                </v-btn>
                <v-btn
                  type="submit"
                  flat
                  :disabled="invalid"
                  :loading="loading"
                  class="custom-btn-width success white--text py-2"
                >
                  {{ $t("container.list.replace") }}
                </v-btn>
              </v-row>
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
                  "container.beneficiary_management.beneficiary_list.beneficiary_replacement_list"
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
                  show-select
                  v-model="selected"
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
                          @click="editDialog(item)"
                        >
                          <v-icon> mdi-eye </v-icon>
                        </v-btn>
                      </template>
                      <span>
                        {{ $t("container.list.view") }}
                      </span>
                    </v-tooltip>

                    <!-- <v-tooltip top>
                      <template v-slot:activator="{ on }">
                        <v-btn
                          v-can="'delete-division'"
                          fab
                          x-small
                          v-on="on"
                          color="grey"
                          class="ml-3 white--text"
                          elevation="0"
                          @click="deleteAlert(item.id)"
                        >
                          <v-icon> mdi-delete </v-icon>
                        </v-btn>
                      </template>
                      <span> {{ $t("container.list.delete") }}</span>
                    </v-tooltip> -->
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
                :loading="loading"
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
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      pagination: {
        current: 1,
        total: 0,
        perPage: 10,
      },
      items: [5, 10, 15, 20, 40, 50, 100],
      panel: [0],
      beneficiary: {},
      replaceList: [],
      selected: [],
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
            console.log("beneficiary__", this.beneficiary);
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
      try {
        const queryParams = {
          program_id: null,
        };
        this.$axios
          .get(`/admin/beneficiary/replaceList`, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
            params: queryParams,
          })
          .then((result) => {
            this.replaceList = result.data.data;
            console.log("beneficiary__replaceList", this.replaceList);
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
  },

  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    },

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
          text: this.$t("container.list.status"),
          value: "status",
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
  },
  mounted() {},
};
</script>