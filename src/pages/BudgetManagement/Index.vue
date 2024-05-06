<template>
  <div id="allotment_list">
    <v-row class="mx-5 mt-4">
      <v-col cols="12">
        <v-row>
          <v-col cols="12">
            <div class="d-block text-right">
              <v-btn
                elevation="2"
                class="btn my-2"
                color="primary"
                router
                to="/budget/create"
              >{{ $t("container.budget_management.add_new") }}</v-btn>
            </div>
            <!-- Expantion panels start -->
            <v-expansion-panels>
              <v-expansion-panel class="ma-2">
                <v-expansion-panel-header color="#8C9EFF">
                  <h3 class="white--text">{{ $t("container.list.search") }}</h3>
                </v-expansion-panel-header>
                <v-expansion-panel-content class="elevation-0 transparent mt-10">
                  <ValidationObserver ref="form" v-slot="{ invalid }">
                    <form @submit.prevent="onSearch()">
                      <v-row>
                        <v-col lg="6" md="6" cols="12">
                          <v-autocomplete
                            outlined
                            clearable
                            :items="allowances"
                            item-text="name_en"
                            item-value="id"
                            v-model="data.program_id"
                            :label="
                          $t(
                            'container.application_selection.application.program'
                          )
                        "
                          ></v-autocomplete>
                        </v-col>
                        <v-col lg="6" md="6" cols="12">
                          <v-select
                            outlined
                            clearable
                            :items="financial_years"
                            item-text="financial_year"
                            item-value="id"
                            v-model="data.financial_year_id"
                            :label="
                          $t(
                            'container.system_config.demo_graphic.financial_year.financial_year'
                          )
                        "
                          ></v-select>
                        </v-col>
                      </v-row>
                      <div class="d-inline d-flex justify-end">
                        <v-btn
                          elevation="2"
                          class="btn mr-2"
                          color="success"
                          type="submit"
                        >{{ $t("container.list.search") }}</v-btn>
                        <v-btn elevation="2" class="btn" @click="resetSearch">
                          {{
                          $t("container.list.reset")
                          }}
                        </v-btn>
                      </div>
                    </form>
                  </ValidationObserver>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
            <!-- Expantion panels end -->
            <!-- Application list -->
            <v-card elevation="10" color="white" rounded="md" theme="light" class="mb-8 mt-5">
              <v-card-title class="justify-center" tag="div">
                <h3
                  class="text-uppercase pt-3"
                >{{ $t("container.budget_management.budget_info_list") }}</h3>
              </v-card-title>
              <v-card-text>
                <v-row
                  class="ma-0 white round-border d-flex justify-space-between align-center"
                  justify="center"
                  justify-lg="space-between"
                >
                  <v-col cols="12">
                    <v-data-table
                      :headers="headers"
                      :items="allotments"
                      :loading="loading"
                      item-key="id"
                      :items-per-page="pagination.perPage"
                      hide-default-footer
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
                              <v-icon>mdi-eye</v-icon>
                            </v-btn>
                          </template>
                          <span>{{ $t("container.list.view") }}</span>
                        </v-tooltip>
                        <v-tooltip top>
                          <template v-slot:activator="{ on }">
                            <v-btn
                              v-can="'update-post'"
                              fab
                              x-small
                              v-on="on"
                              color="success"
                              elevation="0"
                              class="ml-3"
                            >
                              <v-icon>mdi-account-edit-outline</v-icon>
                            </v-btn>
                          </template>
                          <span>{{ $t("container.list.edit") }}</span>
                        </v-tooltip>

                        <v-tooltip top>
                          <template v-slot:activator="{ on }">
                            <v-btn
                              v-can="'delete-allotment'"
                              fab
                              x-small
                              v-on="on"
                              color="grey"
                              class="ml-3 white--text"
                              elevation="0"
                            >
                              <v-icon>mdi-delete</v-icon>
                            </v-btn>
                          </template>
                          <span>{{ $t("container.list.delete") }}</span>
                        </v-tooltip>
                      </template>
                      <!-- End Action Button -->
                      <template v-slot:footer="item">
                        <div class="text-center pt-2 v-data-footer justify-center pb-2">
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
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
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
  title: "CTM - Budget List",
  data() {
    return {
      data: {
        program_id: null,
        financial_year_id: null
      },

      loading: true,
      search: "",
      delete_id: "",
      districts: [],
      allotments: [],
      allowances: [],
      financial_years: [],
      pagination: {
        current: 1,
        total: 0,
        perPage: 10
      },
      items: [5, 10, 15, 20, 40, 50, 100]
    };
  },
  components: {
    ValidationProvider,
    ValidationObserver
  },
  computed: {
    ...mapState({
      divisions: state => state.Division.divisions
    }),
    headers() {
      return [
        { text: this.$t("container.list.sl"), value: "sl" },
        { text: this.$t("container.budget_management.id"), value: "budget_id" },
        {
          text: this.$t("container.budget_management.program_name"),
          value: "program.name_en"
        },
        {
          text: this.$t("container.budget_management.calculation_type"),
          value: "calculation_type.value_en"
        },
        {
          text: this.$t("container.budget_management.financial_year"),
          value: "financial_year.financial_year"
        },
        {
          text: this.$t("container.list.action"),
          value: "actions",
          width: "15%",
          align: "center"
        }
      ];
    }
  },

  methods: {
    ...mapActions({
      GetAllDivisions: "Division/GetAllDivisions"
    }),
    onPageChange($event) {
      // this.pagination.current = $event;
      this.GetAllotment();
    },
    resetSearch() {
      this.loading = true;
     this.data.program_id = null;
     this.data.financial_year_id = null;
     this.GetAllotment();
    },
    onSearch() {
      this.loading = true;
      this.pagination = {
        ...this.pagination,
        current: 1,
      };
      this.GetAllotment();
    },

    async GetAllotment() {
      const queryParams = {
        program_id: this.data.program_id,
        financial_year_id: this.data.financial_year_id,
        perPage: this.pagination.perPage,
        page: this.pagination.current
      };
      this.$axios
        .get("/admin/budget/list", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data"
          },
          params: queryParams
        })
        .then(result => {
          this.allotments = result.data.data;
          this.total = result.data.meta.total;
          console.log("results_total__", this.total);

          this.pagination.current = result.data.meta.current_page;
          this.pagination.total = result.data.meta.last_page;
          this.pagination.grand_total = result.data.meta.total;
          this.loading = false;
        });
    },
    GetAllowance() {
      this.$axios
        .get("/global/program", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data"
          }
        })
        .then(result => {
          this.allowances = result.data.data;
        });
    },
    GetFinancial_Year() {
      this.$axios
        .get("/admin/financial-year/get", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data"
          }
        })
        .then(result => {
          this.financial_years = result.data.data;
        });
    },
    updateHeaderTitle() {
      const title = this.$t("container.budget_management.budget_info");
      this.$store.commit("setHeaderTitle", title);
    }
  },
  watch: {
    "$i18n.locale": "updateHeaderTitle"
  },
  created() {
    this.GetAllotment();
  },
  beforeMount() {
    this.updateHeaderTitle();
  },
  mounted() {
    // this.GetAllDivisions();
    this.GetAllowance();
    this.GetFinancial_Year();
  }
};
</script>
