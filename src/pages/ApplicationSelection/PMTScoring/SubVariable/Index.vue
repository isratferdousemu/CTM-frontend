<template>
  <div id="variable">
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
                  {{ $t("container.application_selection.sub_variable.list") }}
                </h3>
              </v-card-title>
              <v-card-text>
                <v-row
                  class="ma-0 pa-3 white round-border d-flex justify-space-between align-center"
                  justify="center"
                  justify-lg="space-between"
                >
                  <div class="d-flex justify-sm-end flex-wrap">
                    <v-text-field
                      @keyup.native="GetVariable"
                      outlined
                      dense
                      v-model="search"
                      prepend-inner-icon="mdi-magnify"
                      class="my-sm-0 my-3 mx-0v -input--horizontal"
                      flat
                      variant="outlined"
                      :label="
                        $t(
                          'container.application_selection.sub_variable.search'
                        )
                      "
                      hide-details
                      color="primary"
                    >
                    </v-text-field>
                  </div>
                  <v-btn
                    @click="createDialog"
                    flat
                    color="primary"
                    prepend-icon="mdi-account-multiple-plus"
                    v-can="'sub-variable-create'"
                  >
                    {{ $t("container.list.add_new") }}
                  </v-btn>
                  <v-col cols="12">
                    <v-data-table
                      :loading="loading"
                      item-key="id"
                      :headers="headers"
                      :items="sub_variables"
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
                              v-can="'sub-variable-edit'"
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

                        <v-tooltip top>
                          <template v-slot:activator="{ on }">
                            <v-btn
                              v-can="'sub-variable-delete'"
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
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>

      <!-- variable add modal  -->
      <v-dialog v-model="dialogAdd" width="650">
        <v-card style="justify-content: center; text-align: center">
          <v-card-title class="font-weight-bold justify-center">
            {{ $t("container.application_selection.sub_variable.add_new") }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="mt-7">
            <ValidationObserver ref="formAdd" v-slot="{ invalid }">
              <form @submit.prevent="submitSubVariable()">
                <!-- {{errors.code}}
                {{errors.name_en}} -->
                <ValidationProvider
                  name="Variable"
                  vid="variable"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <v-autocomplete
                    @input="onChangeVariable($event)"
                    v-model="data.variable_id"
                    outlined
                    :label="
                      $t('container.application_selection.variable.name_en')
                    "
                    :items="variables"
                    item-text="name_en"
                    item-value="id"
                    required
                    :error="errors[0] ? true : false"
                    :error-messages="errors[0]"
                  ></v-autocomplete>
                </ValidationProvider>

                <ValidationProvider
                  name="Name English"
                  vid="name_en"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <v-text-field
                    outlined
                    type="text"
                    v-model="data.name_en"
                    :label="
                      $t('container.application_selection.sub_variable.name_en')
                    "
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
                    :label="
                      $t(
                        'container.application_selection.variable.score'
                      )
                    "
                    required
                    :error="errors[0] ? true : false"
                    :error-messages="errors[0]"
                  ></v-text-field>
                </ValidationProvider>

                <v-row class="mx-0 my-0 py-2" justify="center">
                  <v-btn
                    flat
                    @click="dialogAdd = false"
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
                    class="custom-btn-width warning white--text py-2"
                  >
                    {{ $t("container.list.submit") }}
                  </v-btn>
                </v-row>
              </form>
            </ValidationObserver>
          </v-card-text>
        </v-card>
      </v-dialog>
      <!-- variable add modal  -->

      <!-- variable Edit modal  -->
      <v-dialog v-model="dialogEdit" width="650">
        <v-card style="justify-content: center; text-align: center">
          <v-card-title class="font-weight-bold justify-center">
            {{ $t("container.application_selection.sub_variable.edit") }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="mt-7">
            <ValidationObserver ref="formEdit" v-slot="{ invalid }">
              <form @submit.prevent="updateSubVariable()">
                <!-- {{errors.code}}
                {{errors.name_en}} -->

                <ValidationProvider
                  name="Variable"
                  vid="variable"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <v-autocomplete
                    @input="onChangeVariable($event)"
                    v-model="data.variable_id"
                    outlined
                    :label="
                      $t('container.application_selection.variable.name_en')
                    "
                    :items="variables"
                    item-text="name_en"
                    item-value="id"
                    required
                    :error="errors[0] ? true : false"
                    :error-messages="errors[0]"
                  ></v-autocomplete>
                </ValidationProvider>

                <ValidationProvider
                  name="Name English"
                  vid="name_en"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <v-text-field
                    outlined
                    type="text"
                    v-model="data.name_en"
                    :label="
                      $t('container.application_selection.sub_variable.name_en')
                    "
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
                    :label="$t('container.application_selection.variable.score')"
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
      <!-- variable Edit modal  -->

      <!-- delete modal  -->
      <v-dialog v-model="deleteDialog" width="350">
        <v-card style="justify-content: center; text-align: center">
          <v-card-title class="font-weight-bold justify-center">
            {{ $t("container.application_selection.sub_variable.delete") }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <div class="subtitle-1 font-weight-medium mt-5">
              {{
                $t("container.application_selection.sub_variable.delete_alert")
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
                @click="deleteSubVariable()"
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
  title: "CTM - Variables",
  data() {
    return {
      data: {
        id: null,
        variable_id: null,
        name_en: null,
        score: null,
      },
      variables: [],
      sub_variables: [],
      dialogAdd: false,
      deleteDialog: false,
      dialogEdit: false,
      delete_loading: false,
      loading: false,
      search: "",
      delete_id: "",
      variables: [],
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
          text: this.$t("container.application_selection.variable.name_en"),
          value: "parent.name_en",
        },
        {
          text: this.$t("container.application_selection.sub_variable.name_en"),
          value: "name_en",
        },
        {
          text: this.$t("container.application_selection.sub_variable.score"),
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
      message: (state) => state.Variable.success_message,
      variables: (state) => state.Variable.variables,
      // errors: (state) => state.Variable.errors,
      // error_status: (state) => state.Variable.error_status,
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
      let checkLanguageEnglish = this.$checkLanguage(this.data.name_en);
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
        errs.name_en = ["Please Enter in English Language in this Field"];
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
          console.log(key, value);
        }
      }
      return fd;
    },
    submitSubVariable() {
      console.log(this.validator());
      // return;
      try {
        this.$store
          .dispatch("ApplicationSelection/StoreSubVariable", this.validator())
          .then((res) => {
            if (res.data?.success) {
              this.$toast.success("Data Inserted Successfully");
              this.resetForm();
              this.dialogAdd = false;
              this.GetSubVariable();
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
      console.log(item,"item");
      this.dialogEdit = true;
      this.data.id = item.id;
      this.data.variable_id = item.parent?.id;
      this.data.name_en = item.name_en;
      this.data.score = item.score;
      this.errors = {};
    },
    updateSubVariable() {
      try {
        this.$store
          .dispatch("ApplicationSelection/updateSubVariable", this.validator())
          .then((res) => {
            console.log(res, "update");
            if (res.data?.success) {
              this.$toast.success("Data Inserted Successfully");
              this.resetForm();
              this.dialogEdit = false;
              this.GetSubVariable();
            } else if (res.response?.data?.errors) {
              console.log(res.response.data.errors);
              this.$refs.formEdit.setErrors(res.response.data.errors);
            }
          });
      } catch (e) {
        console.log(e);
      }
    },
    resetForm() {
      // Reset the form data
      this.data = {
        code: "",
        name_en: "",
        name_bn: "",
        // Reset other form fields
      };
      this.errors = {};
    },

    onPageChange($event) {
      // this.pagination.current = $event;
      this.GetSubVariable();
    },

    async GetSubVariable() {
      const queryParams = {
        searchText: this.search,
        perPage: this.pagination.perPage,
        page: this.pagination.current,
      };
      this.$axios
        .get("/admin/poverty/get/sub-variable", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
          params: queryParams,
        })
        .then((result) => {
          this.sub_variables = result.data.data;
          this.pagination.current = result.data.meta.current_page;
          this.pagination.total = result.data.meta.last_page;
          this.pagination.grand_total = result.data.meta.total;
        });
    },
    async GetVariable() {
      const queryParams = {
        searchText: this.search,
        perPage: this.pagination.perPage,
        page: this.pagination.current,
      };
      this.$axios
        .get("/admin/poverty/get/sub-variable/variable-list", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
          params: queryParams,
        })
        .then((result) => {
          this.variables = result.data.data;
          this.pagination.current = result.data.meta.current_page;
          this.pagination.total = result.data.meta.last_page;
          this.pagination.grand_total = result.data.meta.total;
        });
    },
    deleteSubVariable: async function () {
      const data = {
        "id" : this.delete_id
      }
      try {
        await this.$store
          .dispatch("ApplicationSelection/DestroySubVariable", data)
          .then((res) => {
            // check if the request was successful
            if (res?.data?.success) {
              this.$toast.success(res.data.message);
            } else {
              this.$toast.error(res.response.data.message);
            }
            this.deleteDialog = false;
            this.GetSubVariable();
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
        "container.application_selection.sub_variable.list"
      );
      this.$store.commit("setHeaderTitle", title);
    },
  },
  watch: {
    "$i18n.locale": "updateHeaderTitle",
  },
  created() {
    this.GetVariable();
    this.GetSubVariable();
  },
  beforeMount() {
    this.updateHeaderTitle();
  },
};
</script>