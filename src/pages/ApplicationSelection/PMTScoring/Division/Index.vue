<template>
  <div id="division">
    <v-row class="mx-5 mt-4">
      <v-col cols="12">
        <v-row>
          <v-col cols="12">
            <v-card
              elevation="10"
              color="white"
              rounded="md"
              theme="light"
              class="mb-8"
            >
              <v-card-title class="justify-center" tag="div">
                <h3 class="text-uppercase pt-3">
                  {{
                    $t("container.application_selection.division_cut_off.list")
                  }}
                </h3>
              </v-card-title>

              <v-card-text>
                <v-row
                  class="ma-0 pa-3 white round-border d-flex justify-space-between align-center"
                  justify="center"
                  justify-lg="space-between"
                >
                  <div class="d-flex justify-md-end flex-wrap">
                    <v-autocomplete
                      @input="onChangeFilter()"
                      class="mr-5"
                      v-model="financial_year_id"
                      :items="financial_years"
                      label="Financial Year"
                      outlined
                      dense
                      item-text="financial_year"
                      item-value="id"
                      :error="errors[0] ? true : false"
                      :error-messages="errors[0]"
                    ></v-autocomplete>

                    <v-select
                      @input="onChangeFilter()"
                      class="mr-5"
                      v-model="location_type_id"
                      :items="location_types"
                      label="Location Type"
                      outlined
                      dense
                      item-text="name_en"
                      item-value="id"
                      :error="errors[0] ? true : false"
                      :error-messages="errors[0]"
                    ></v-select>

                    <v-text-field
                      @keyup.native="GetPovertyCutOff"
                      outlined
                      dense
                      v-model="search"
                      prepend-inner-icon="mdi-magnify"
                      class="my-sm-0 my-3 mx-0v -input--horizontal"
                      flat
                      variant="outlined"
                      :label="
                        $t(
                          'container.application_selection.division_cut_off.search'
                        )
                      "
                      hide-details
                      color="primary"
                    >
                    </v-text-field>
                    <!-- <v-btn
                      @click="createDialog"
                      flat
                      class="my-sm-0 my-3 mx-0v -input--horizontal"
                      color="primary"
                      prepend-icon="mdi-account-multiple-plus"
                    >
                      {{ $t("container.list.add_new") }}
                    </v-btn> -->
                  </div>
                  <v-col cols="12">
                    <v-data-table
                      :loading="loading"
                      item-key="id"
                      :headers="headers"
                      :items="divisions"
                      :items-per-page="pagination.perPage"
                      hide-default-footer
                      class="elevation-0 transparent row-pointer"
                    >
                      <template v-slot:item.id="{ item, index }">
                        {{
                          (pagination.current - 1) * pagination.perPage +
                          index +
                          1
                        }}
                      </template>
                      <template v-slot:item.location_id="{ item }">
                        <span v-if="item.location_id == 1">All Over Bangladesh</span>
                      </template>
                      <template v-slot:item.score="{ item }">
                        {{ item.score }}
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
                              <v-icon> mdi-account-edit-outline </v-icon>
                            </v-btn>
                          </template>
                          <span>
                            {{ $t("container.list.edit") }}
                          </span>
                        </v-tooltip>
<!-- 
                        <v-tooltip top>
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
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>

      <!-- division add modal  -->
      <v-dialog v-model="dialogAdd" width="650">
        <v-card style="justify-content: center; text-align: center">
          <v-card-title class="font-weight-bold justify-center">
            {{ $t("container.application_selection.division_cut_off.add_new") }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="mt-7"> </v-card-text>
        </v-card>
      </v-dialog>
      <!-- division add modal  -->

      <!-- division Edit modal  -->
      <v-dialog v-model="dialogEdit" width="650">
        <v-card style="justify-content: center; text-align: center">
          <v-card-title class="font-weight-bold justify-center">
            {{ $t("container.application_selection.division_cut_off.edit") }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="mt-7">
            <ValidationObserver ref="formEdit" v-slot="{ invalid }">
              <form @submit.prevent="updateCuttOff()">
                <!-- {{errors.division_name}}
                {{errors.score}} -->

                <ValidationProvider
                  name="Division"
                  vid="division_name"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <v-text-field
                    outlined
                    readonly
                    type="text"
                    v-model="data.division_name"
                    :label="$t('container.list.division_name')"
                    required
                    :error="errors[0] ? true : false"
                    :error-messages="errors[0]"
                  ></v-text-field>
                </ValidationProvider>
                <ValidationProvider
                  name="Score"
                  vid="score"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <v-text-field
                    outlined
                    type="text"
                    v-model="data.score"
                    :label="$t('container.list.score')"
                    required
                    :error="errors[0] ? true : false"
                    :error-messages="errors[0]"
                  ></v-text-field>
                </ValidationProvider>

                <v-row class="mx-0 my-0 py-2" justify="center">
                  <v-btn
                    flat
                    @click="dialogEdit = false"
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
                    class="custom-btn-width primary white--text py-2"
                  >
                    {{ $t("container.list.update") }}
                  </v-btn>
                </v-row>
              </form>
            </ValidationObserver>
          </v-card-text>
        </v-card>
      </v-dialog>
      <!-- division Edit modal  -->

      <!-- delete modal  -->
      <v-dialog v-model="deleteDialog" width="350">
        <v-card style="justify-content: center; text-align: center">
          <v-card-title class="font-weight-bold justify-center">
            {{ $t("container.application_selection.division_cut_off.delete") }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <div class="subtitle-1 font-weight-medium mt-5">
              {{
                $t(
                  "container.application_selection.division_cut_off.delete_alert"
                )
              }}
            </div>
          </v-card-text>
          <v-card-actions style="display: block">
            <v-row class="mx-0 my-0 py-2" justify="center">
              <v-btn
                text
                @click="deleteDialog = false"
                outlined
                class="custom-btn-width py-2 mr-10"
              >
                {{ $t("container.list.cancel") }}
              </v-btn>
              <v-btn
                text
                @click="deleteDivision()"
                color="white"
                :loading="delete_loading"
                class="custom-btn-width warning white--text py-2"
              >
                {{ $t("container.list.delete") }}
              </v-btn>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- delete modal  -->
    </v-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { extend, ValidationProvider, ValidationObserver } from "vee-validate";
import { required } from "vee-validate/dist/rules";

extend("required", required);
export default {
  name: "Index",
  title: "CTM - Divisions",
  data() {
    return {
      data: {
        id: null,
        division_name: null,
        type: null,
        score: null,
      },
      dialogAdd: false,
      deleteDialog: false,
      dialogEdit: false,
      delete_loading: false,
      loading: false,
      location_type: null,
      location_type_id: null,
      location_types: [
        {
          id: 0,
          name_en: "All",
        },
        {
          id: 1,
          name_en: "Division",
        },
        {
          id: 2,
          name_en: "District",
        },
      ],
      search: "",
      delete_id: "",
      financial_year_id: null,
      divisions: [],
      financial_years: [],
      errors: {},
      error_status: {},
      pagination: {
        current: 1,
        total: 0,
        perPage: 10,
      },
      items: [5, 10, 15, 20, 40, 50, 100],
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
            "container.application_selection.division_cut_off.name_en"
          ),
          value: "assign_location.name_en",
        },
        {
          text: this.$t(
            "container.application_selection.division_cut_off.score"
          ),
          value: "score",
        },
        {
          text: this.$t("container.list.action"),
          value: "actions",
          align: "center",
          sortable: false,
        },
      ];
    },

    ...mapState({
      message: (state) => state.Division.success_message,
      // divisions: (state) => state.Division.divisions,
      // errors: (state) => state.Division.errors,
      // error_status: (state) => state.Division.error_status,
    }),
  },

  methods: {
    createDialog() {
      if (this.$refs.formAdd) {
        this.$refs.formAdd.reset();
      }
      this.resetForm();
      this.dialogAdd = true;
    },
    checkLanguage() {
      let checkLanguageEnglish = this.$checkLanguage(this.data.score);
      let checkLanguageBangla = this.$checkLanguage(this.data.name_bn);

      console.log(checkLanguageEnglish);
      console.log(checkLanguageBangla);
      let errs = {};

      if (
        checkLanguageBangla !== "Bangla" &&
        checkLanguageBangla !== "BanglaSpecialChar"
      ) {
        errs.name_bn = ["Please Enter in Bangla Language in this Field"];
      }

      if (checkLanguageEnglish != "English") {
        errs.score = ["Please Enter in English Language in this Field"];
      }

      if (Object.keys(errs).length > 0) {
        if (this.$refs.formAdd) {
          this.$refs.formAdd.setErrors(errs);
        }
        if (this.$refs.formEdit) {
          this.$refs.formEdit.setErrors(errs);
        }

        return false;
      }

      return true;
    },
    validator() {
      let fd = new FormData();
      for (const [key, value] of Object.entries(this.data)) {
        if (value !== null) {
          fd.append(key, value);
        }
      }
      return fd;
    },
    submitDivision() {
      if (!this.checkLanguage()) {
        return;
      }

      try {
        this.$store
          .dispatch("Division/StoreDivision", this.validator())
          .then((res) => {
            if (res.data?.success) {
              this.$toast.success("Data Inserted Successfully");
              this.resetForm();
              this.dialogAdd = false;
              this.GetPovertyCutOff();
            } else if (res.response?.data?.errors) {
              console.log(res.response.data.errors);
              this.$refs.formAdd.setErrors(res.response.data.errors);
            }
          });
      } catch (e) {
        console.log(e);
      }
    },
    editDialog(item) {
      console.log(item);
      this.dialogEdit = true;
      this.data.division_name = item.assign_location.name_en;
      this.data.score = item.score;
      this.data.location_id = item.assign_location.id;
      this.data.type = item.type;
      this.data.id = item.id;
      this.errors = {};
    },
    updateCuttOff() {
      try {
        this.$store
          .dispatch("ApplicationSelection/updateCuttOff", this.validator())
          .then((res) => {
            if (res.data?.success) {
              this.$toast.success("Data Updated Successfully");
              // this.resetData();
              this.dialogEdit = false;
              this.GetPovertyCutOff();
            } else if (res.response?.data?.errors) {
              this.$refs.form.setErrors(res.response.data.errors);
              this.$toast.error(res.response.data.message);
            }
            // console.log(data, "update");
            // if (data == null) {
            //   this.$toast.success("Data Updated Successfully");
            //   this.dialogEdit = false;
            //   this.resetForm();
            //   this.GetPovertyCutOff();
            // } else {
            //   this.$refs.formEdit.setErrors(data);
            // }
          });
      } catch (e) {
        console.log(e);
      }
    },
    resetForm() {
      // Reset the form data
      this.data = {
        division_name: "",
        score: "",
        name_bn: "",
        // Reset other form fields
      };
      this.errors = {};
    },

    onPageChange($event) {
      // this.pagination.current = $event;
      this.GetPovertyCutOff();
    },
    async onChangeFilter() {
      const data = {
        financial_year_id: this.financial_year_id,
        type: this.location_type_id,
      };
      console.log(data, "onChangeFilter");
      // return;

      try {
        this.$store
          .dispatch("ApplicationSelection/filterCutOff", data)
          .then((res) => {
            console.log(res, "filterCutOff");
            this.divisions = res.data.data;
          });
      } catch (e) {
        console.log(e);
      }
    },
    async GetPovertyCutOff() {
      const queryParams = {
        searchText: this.search,
        perPage: this.pagination.perPage,
        page: this.pagination.current,
      };
      this.$axios
        .get("/admin/poverty/get", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
          params: queryParams,
        })
        .then((result) => {
          this.divisions = result.data.data;
          console.log(this.divisions);
          this.pagination.current = result.data.meta.current_page;
          this.pagination.total = result.data.meta.last_page;
          this.pagination.grand_total = result.data.meta.total;
        });
    },
    async GetFinancialYear() {
      this.$axios
        .get("/admin/financial-year/get", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          this.financial_years = result.data.data;
        });
    },
    deleteDivision: async function () {
      try {
        await this.$store
          .dispatch("Division/DestroyDivision", this.delete_id)
          .then((res) => {
            // check if the request was successful
            if (res?.data?.success) {
              this.$toast.success(res.data.message);
            } else {
              this.$toast.error(res.response.data.message);
            }
            this.deleteDialog = false;
            this.GetPovertyCutOff();
          })
          .catch((error) => {
            console.log(error, "error");
          });
      } catch (e) {
        console.log(e);
      }
    },
    deleteAlert(id) {
      this.data.id = id;
      // alert(JSON.stringify(id));
      this.deleteDialog = true;
      this.delete_id = id;
    },
    updateHeaderTitle() {
      const title = this.$t(
        "container.application_selection.division_cut_off.list"
      );
      this.$store.commit("setHeaderTitle", title);
    },
  },
  watch: {
    "$i18n.locale": "updateHeaderTitle",
  },
  created() {
    this.GetFinancialYear();
    this.GetPovertyCutOff();
  },
  beforeMount() {
    this.updateHeaderTitle();
  },
};
</script>