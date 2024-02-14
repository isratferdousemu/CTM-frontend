<template>
  <div id="aplication_list">
    <v-row class="mx-5 mt-4">
      <v-col cols="12">
        <v-card>
          <v-row>
            <v-col lg="6" md="6" cols="12" class="ma-5">
              <v-card justify="center">
                <v-card-title> </v-card-title>
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
                      <td>: {{ data.application_id }}</td>
                    </tr>
                    <tr>
                      <td>
                        {{
                          $t(
                            "container.beneficiary_management.beneficiary_list.name"
                          )
                        }}
                      </td>
                      <td>: {{ data.name_en }}</td>
                    </tr>
                    <tr>
                      <td>
                        {{
                          $t(
                            "container.beneficiary_management.beneficiary_list.address"
                          )
                        }}
                      </td>
                      <td>: {{ data.beneficiary_address }}</td>
                    </tr>
                    <tr>
                      <td>
                        {{
                          $t(
                            "container.beneficiary_management.beneficiary_list.application_date"
                          )
                        }}
                      </td>
                      <td>: {{ CustomDateFormat(data.application_date)  }}</td>
                    </tr>
                    <tr>
                      <td>
                        {{
                          $t(
                            "container.beneficiary_management.beneficiary_list.approval_date"
                          )
                        }}
                      </td>
                      <td>: {{ CustomDateFormat(data.approve_date) }}</td>
                    </tr>
                  </table>
                </v-card-text>
              </v-card>
            </v-col>

            <v-col cols="12">
              <v-expansion-panels v-model="panel" multiple>
                <v-expansion-panel>
                  <v-expansion-panel-header color="#8C9EFF" class="white--text">
                    {{
                      $t(
                        "container.beneficiary_management.beneficiary_list.payment_history"
                      )
                    }}
                  </v-expansion-panel-header>
                  <v-expansion-panel-content class="mt-5">
                    <v-row>
                      <v-col lg="6" md="6" cols="12">
                        <v-text-field
                          :label="
                            $t(
                              'container.beneficiary_management.beneficiary_list.total_installment'
                            )
                          "
                          outlined
                          readonly
                          value="8"
                        >
                        </v-text-field>
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
                                  'container.beneficiary_management.beneficiary_list.last_payment_date'
                                )
                              "
                              prepend-inner-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                              outlined
                            ></v-text-field>
                          </template>
                          <!-- <v-date-picker v-model="date" no-title scrollable>
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
                          </v-date-picker> -->
                        </v-menu>
                      </v-col>
                      <v-col lg="6" md="6" cols="12">
                        <v-text-field
                          value="1000000"
                          :label="
                            $t(
                              'container.beneficiary_management.beneficiary_list.last_payment_receive'
                            )
                          "
                          outlined
                          readonly
                        >
                        </v-text-field>
                      </v-col>
                      <v-col lg="6" md="6" cols="12">
                        <v-text-field
                          value="10000"
                          :label="
                            $t(
                              'container.beneficiary_management.beneficiary_list.last_payment_amount'
                            )
                          "
                          outlined
                          readonly
                        >
                        </v-text-field>
                      </v-col>
                      <v-col lg="6" md="6" cols="12">
                        <v-tooltip top>
                          <template v-slot:activator="{ on }">
                            <v-btn
                              v-can="'update-post'"
                              fab
                              x-small
                              v-on="on"
                              color="#AFB42B"
                              @click="payment_modal = true"
                              elevation="0"
                              class="white--text"
                            >
                              <v-icon> mdi-eye </v-icon>
                            </v-btn>
                          </template>
                          <span>
                            {{ $t("container.list.view") }}
                          </span>
                        </v-tooltip>
                      </v-col>
                    </v-row>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
            <v-col cols="12">
              <v-expansion-panels v-model="panel" multiple>
                <v-expansion-panel>
                  <v-expansion-panel-header color="#8C9EFF" class="white--text">
                    {{
                      $t(
                        "container.beneficiary_management.beneficiary_list.grievance_history"
                      )
                    }}
                  </v-expansion-panel-header>
                  <v-expansion-panel-content class="mt-5">
                    <v-row>
                      <v-col lg="6" md="6" cols="12">
                        <v-text-field
                          value="25"
                          readonly
                          :label="
                            $t(
                              'container.beneficiary_management.beneficiary_list.total_grievance'
                            )
                          "
                          outlined
                        >
                        </v-text-field>
                      </v-col>

                      <v-col lg="6" md="6" cols="12">
                        <v-text-field
                          value="Application"
                          :label="
                            $t(
                              'container.beneficiary_management.beneficiary_list.last_grievance_type'
                            )
                          "
                          readonly
                          outlined
                        >
                        </v-text-field>
                      </v-col>
                      <v-col lg="6" md="6" cols="12">
                        <v-tooltip top>
                          <template v-slot:activator="{ on }">
                            <v-btn
                              v-can="'update-post'"
                              fab
                              x-small
                              v-on="on"
                              color="#AFB42B"
                              elevation="0"
                              @click="grievance_modal = true"
                              class="white--text"
                            >
                              <v-icon> mdi-eye </v-icon>
                            </v-btn>
                          </template>
                          <span>
                            {{ $t("container.list.view") }}
                          </span>
                        </v-tooltip>
                      </v-col>
                    </v-row>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
            <v-col cols="12">
              <v-expansion-panels v-model="panel" multiple>
                <v-expansion-panel>
                  <v-expansion-panel-header color="#8C9EFF" class="white--text">
                    {{
                      $t(
                        "container.beneficiary_management.beneficiary_list.Change_tracking"
                      )
                    }}
                  </v-expansion-panel-header>
                  <v-expansion-panel-content class="mt-5">
                    <v-row>
                      <v-col lg="6" md="6" cols="12">
                        <v-text-field
                          value="12"
                          readonly
                          :label="
                            $t(
                              'container.beneficiary_management.beneficiary_list.total_change'
                            )
                          "
                          outlined
                        >
                        </v-text-field>
                      </v-col>

                      <v-col lg="6" md="6" cols="12">
                        <v-tooltip top>
                          <template v-slot:activator="{ on }">
                            <v-btn
                              v-can="'update-post'"
                              fab
                              x-small
                              v-on="on"
                              color="#AFB42B"
                              elevation="0"
                              @click="tracking_modal = true"
                              class="white--text"
                            >
                              <v-icon> mdi-eye </v-icon>
                            </v-btn>
                          </template>
                          <span>
                            {{ $t("container.list.view") }}
                          </span>
                        </v-tooltip>
                      </v-col>
                    </v-row>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
              <v-row class="mx-0 my-0 py-2 mt-5" justify="end">
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
            </v-col>
            <!-- payment Modal -->
            <v-dialog v-model="payment_modal" width="900">
              <v-card style="justify-content: center; text-align: center">
                <v-card-title class="font-weight-bold justify-center">
                  {{
                    $t(
                      "container.beneficiary_management.beneficiary_list.payment_history"
                    )
                  }}
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text class="mt-7">
                  <v-col cols="12">
                    <v-data-table
                      :headers="headers"
                      :items="payment_histories"
                      class="elevation-0 transparent row-pointer"
                    >
                      <template v-slot:item.sl="{ item, index }">
                        {{
                          (pagination.current - 1) * pagination.perPage +
                          index +
                          1
                        }}
                      </template>

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

                  <v-row class="mx-0 my-0 py-2" justify="center">
                    <v-btn
                      flat
                      @click="payment_modal = false"
                      outlined
                      class="custom-btn-width py-2 mr-10"
                    >
                      {{ $t("container.list.cancel") }}
                    </v-btn>
                    <v-btn
                      type="submit"
                      flat
                      color="primary"
                      :disabled="invalid"
                      :loading="loading"
                      class="custom-btn-width white--text py-2"
                    >
                      {{ $t("container.list.print") }}
                    </v-btn>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-dialog>
            <!-- payment History Modal  -->

            <!-- Grievance Modal -->
            <v-dialog v-model="grievance_modal" width="900">
              <v-card style="justify-content: center; text-align: center">
                <v-card-title class="font-weight-bold justify-center">
                  {{
                    $t(
                      "container.beneficiary_management.beneficiary_list.grievance_history"
                    )
                  }}
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text class="mt-7">
                  <v-col cols="12">
                    <v-data-table
                      :headers="headers_grievance"
                      :items="grievance_histories"
                      class="elevation-0 transparent row-pointer"
                    >
                      <template v-slot:item.sl="{ item, index }">
                        {{
                          (pagination.current - 1) * pagination.perPage +
                          index +
                          1
                        }}
                      </template>

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

                  <v-row class="mx-0 my-0 py-2" justify="center">
                    <v-btn
                      flat
                      @click="grievance_modal = false"
                      outlined
                      class="custom-btn-width py-2 mr-10"
                    >
                      {{ $t("container.list.cancel") }}
                    </v-btn>
                    <v-btn
                      type="submit"
                      flat
                      color="primary"
                      :disabled="invalid"
                      :loading="loading"
                      class="custom-btn-width white--text py-2"
                    >
                      {{ $t("container.list.print") }}
                    </v-btn>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-dialog>
            <!-- Grievance History Modal  -->
            <!-- Change Tracking Modal -->
            <v-dialog v-model="tracking_modal" width="900">
              <v-card style="justify-content: center; text-align: center">
                <v-card-title class="font-weight-bold justify-center">
                  {{
                    $t(
                      "container.beneficiary_management.beneficiary_list.Change_tracking"
                    )
                  }}
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text class="mt-7">
                  <v-col cols="12">
                    <v-data-table
                      :headers="headers_tracking"
                      :items="change_tracking"
                      class="elevation-0 transparent row-pointer"
                    >
                      <template v-slot:item.sl="{ item, index }">
                        {{
                          (pagination.current - 1) * pagination.perPage +
                          index +
                          1
                        }}
                      </template>
                      <!-- Action Button -->
                      <!-- <template v-slot:item.actions="{ item }">
                        <v-btn
                          v-on="on"
                          color="success"
                          elevation="0"
                          router
                          to="/beneficiary-management/information-tracking"
                        >
                          {{ $t("container.list.change_tracking_details") }}
                        </v-btn>
                      </template> -->
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

                  <v-row class="mx-0 my-0 py-2" justify="center">
                    <v-btn
                      flat
                      @click="tracking_modal = false"
                      outlined
                      class="custom-btn-width py-2 mr-10"
                    >
                      {{ $t("container.list.cancel") }}
                    </v-btn>
                    <v-btn
                      type="submit"
                      flat
                      color="primary"
                      :disabled="invalid"
                      :loading="loading"
                      class="custom-btn-width white--text py-2"
                    >
                      {{ $t("container.list.print") }}
                    </v-btn>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-dialog>
            <!-- Change Tracking Modal  -->
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { extend, ValidationProvider, ValidationObserver } from "vee-validate";
import { required } from "vee-validate/dist/rules";
import moment from 'moment';

extend("required", required);
export default {
  name: "Index",
  title: "CTM - Beneficiary History",
  data() {
    return {
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      payment_modal: false,
      grievance_modal: false,
      tracking_modal: false,
      panel: [0, 1, 2],

      data: {
      },
      payment_histories: [
        {
          payment_disbursed_date: "15-09-2023",
          amount: "500",
          acoount_no: "01784512363",
          fiscal_year: "2023-2024",
          due_payment: "No",
        },
        {
          payment_disbursed_date: "15-09-2023",
          amount: "500",
          acoount_no: "01784512363",
          fiscal_year: "2023-2024",
          due_payment: "No",
        },
      ],
      grievance_histories: [
        {
          grievance_type: "Application",
          grievance_subject:
            "I was not informed when, where and how to submit the application.",
          grievance_details:
            "I was not informed when, where and how to submit the application.",
          grievance_raise_date: "10-10-2023",
          resolved_by: "Upazila UCD",
          resolve_comment: "Solved",
          resolve_date: "20-09-2023",
        },
        {
          grievance_type: "Other Complaints",
          grievance_subject: "I could not submit the application.",
          grievance_details: "I could not submit the application.",
          grievance_raise_date: "12-10-2023",
          resolved_by: "Head Office",
          resolve_comment: "N/A",
          resolve_date: "18-10-2023",
        },
      ],

      change_tracking: [
        {
          change_tracking_type: "Change Account",
          change_count: "3",
          successful_change: "2",
          unsuccessful_change: "1",
        },
        {
          change_tracking_type: "Changed Nominee",
          change_count: "5",
          successful_change: "4",
          unsuccessful_change: "1",
        },
      ],

      pagination: {
        current: 1,
        total: 0,
        perPage: 10,
      },
      items: [5, 10, 15, 20, 40, 50, 100],
    };
  },

  methods: {
    updateHeaderTitle() {
      const title = this.$t("container.list.beneficiary_journey");
      this.$store.commit("setHeaderTitle", title);
    },
    async getBeneficiaryDetailsById() {
      try {
        this.$axios
          .get(`/admin/beneficiary/show/${this.$route.params.id}`, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            let item = res.data.data;
            this.data = res.data.data;

            console.log("BEN___", this.data);
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
    CustomDateFormat(value){
      if (value) {
        return moment(String(value)).format('DD-MM-YYYY')
    }
    }
  },

  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
    headers() {
      return [
        { text: this.$t("container.list.sl"), value: "sl" },
        {
          text: this.$t(
            "container.beneficiary_management.beneficiary_list.payment_disbursed_date"
          ),
          value: "payment_disbursed_date",
        },
        {
          text: this.$t(
            "container.beneficiary_management.beneficiary_list.ammount"
          ),
          value: "amount",
        },
        {
          text: this.$t(
            "container.beneficiary_management.beneficiary_list.acoount_no"
          ),
          value: "acoount_no",
        },
        {
          text: this.$t(
            "container.beneficiary_management.beneficiary_list.fiscal_year"
          ),
          value: "fiscal_year",
        },
        {
          text: this.$t(
            "container.beneficiary_management.beneficiary_list.due"
          ),
          value: "due_payment",
          align: "center",
        },
      ];
    },
    headers_grievance() {
      return [
        { text: this.$t("container.list.sl"), value: "sl" },
        {
          text: this.$t(
            "container.beneficiary_management.beneficiary_list.grievance_type"
          ),
          value: "grievance_type",
        },
        {
          text: this.$t(
            "container.beneficiary_management.beneficiary_list.grievance_subject"
          ),
          value: "grievance_subject",
        },
        {
          text: this.$t(
            "container.beneficiary_management.beneficiary_list.grievance_details"
          ),
          value: "grievance_details",
        },
        {
          text: this.$t(
            "container.beneficiary_management.beneficiary_list.grievance_raise_date"
          ),
          value: "grievance_raise_date",
        },
        {
          text: this.$t(
            "container.beneficiary_management.beneficiary_list.resolved_by"
          ),
          value: "resolved_by",
        },
        {
          text: this.$t(
            "container.beneficiary_management.beneficiary_list.resolve_comment"
          ),
          value: "resolve_comment",
        },

        {
          text: this.$t(
            "container.beneficiary_management.beneficiary_list.resolve_date"
          ),
          value: "resolve_date",
        },
      ];
    },
    headers_tracking() {
      return [
        { text: this.$t("container.list.sl"), value: "sl" },
        {
          text: this.$t(
            "container.beneficiary_management.beneficiary_list.change_tracking_type"
          ),
          value: "change_tracking_type",
          align:'center'
        },
        {
          text: this.$t(
            "container.beneficiary_management.beneficiary_list.change_count"
          ),
          value: "change_count",
          align:'center'
        },
        {
          text: this.$t(
            "container.beneficiary_management.beneficiary_list.successful_change"
          ),
          value: "successful_change",
          align:'center'
        },
        {
          text: this.$t(
            "container.beneficiary_management.beneficiary_list.unsuccessful_change"
          ),
          value: "unsuccessful_change",
          align:'center'
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

  beforeMount() {
    this.updateHeaderTitle();
  },
  mounted() {},
  created() {
    this.getBeneficiaryDetailsById();
  },
};
</script>