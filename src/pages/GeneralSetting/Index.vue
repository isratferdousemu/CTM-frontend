<template>
  <div id="district">
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
                  {{ $t("container.general_setting.list") }}
                </h3>
              </v-card-title>
              <v-card-text>
                <v-row
                  class="ma-0 pa-3 white round-border d-flex justify-space-between align-center"
                  justify="center"
                  justify-lg="space-between"
                >
                  <div class="d-flex justify-sm-end flex-wrap">                  
                    <v-autocomplete
                      dense
                      class="my-sm-0 my-3 mx-0v -input--horizontal"
                      @input="onChangeLookupFilter($event)"
                      outlined
                      :label="$t('container.general_setting.lookup_type')"
                      :items="lookupTypes"
                      item-text="name"
                      item-value="id"
                      required
                    ></v-autocomplete>
                    <v-text-field
                      @keyup.native="GetLookup"
                      outlined
                      dense
                      class="ml-5 my-sm-0 my-3 mx-0v -input--horizontal"
                      v-model="search"
                      prepend-inner-icon="mdi-magnify"
                      flat
                      variant="outlined"
                      :label="$t('container.general_setting.search')"
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
                  >
                    {{ $t("container.list.add_new") }}
                  </v-btn>
                  <v-col cols="12">
                    <v-data-table
                      :loading="loading"
                      item-key="id"
                      :headers="headers"
                      :items="lookups"
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
                      <template v-slot:item.type="{ item }">
                        {{ lookupTypes[item.type - 1].name }}
                      </template>
                      <template v-slot:item.value_en="{ item }">
                        {{ item.value_en }}
                      </template>
                      <template v-slot:item.value_bn="{ item }">
                        {{ item.value_bn }}
                      </template>

                      <!-- Action Button -->
                      <template v-slot:item.actions="{ item }">
                        <v-tooltip top>
                          <template
                            v-slot:activator="{ on }"
                            v-if="item.default !== 1"
                          >
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

                        <v-tooltip top>
                          <template
                            v-slot:activator="{ on }"
                            v-if="item.default !== 1"
                          >
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

      <!-- district add modal  -->
      <v-dialog v-model="dialogAdd" width="650">
        <v-card style="justify-content: center; text-align: center">
          <v-card-title class="font-weight-bold justify-center">
            {{ $t("container.general_setting.add_new") }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="mt-7">
            <ValidationObserver ref="formAdd" v-slot="{ invalid }">
              <form @submit.prevent="submitLookup()">
                <!-- {{errors.code}}
                {{errors.value_en}} -->

                <ValidationProvider
                  name="Lookup"
                  vid="division"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <v-autocomplete
                    @input="onChangeLookup($event)"
                    v-model="data.type"
                    outlined
                    :label="$t('container.general_setting.lookup_type')"
                    :items="lookupTypes"
                    item-text="name"
                    item-value="id"
                    required
                    :error="errors[0] ? true : false"
                    :error-messages="errors[0]"
                  ></v-autocomplete>
                </ValidationProvider>
                <ValidationProvider
                  name="Name English"
                  vid="value_en"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <v-text-field
                    outlined
                    type="text"
                    v-model="data.value_en"
                    :label="$t('container.general_setting.value_en')"
                    required
                    :error="errors[0] ? true : false"
                    :error-messages="errors[0]"
                  ></v-text-field>
                </ValidationProvider>
                <ValidationProvider
                  name="Name Bangla"
                  vid="value_bn"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <v-text-field
                    outlined
                    type="text"
                    v-model="data.value_bn"
                    :label="$t('container.general_setting.value_bn')"
                    required
                    :error="errors[0] ? true : false"
                    :error-messages="errors[0]"
                  ></v-text-field>
                </ValidationProvider>

                <ValidationProvider
                  name="Keywork"
                  vid="keyword"
   
                  v-slot="{ errors }"
                >
                  <v-text-field
                    outlined
                    type="text"
                    v-model="data.keyword"
                    :label="$t('container.list.keyword')"
              
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
      <!-- district add modal  -->

      <!-- district Edit modal  -->
      <v-dialog v-model="dialogEdit" width="650">
        <v-card style="justify-content: center; text-align: center">
          <v-card-title class="font-weight-bold justify-center">
            {{ $t("container.general_setting.edit") }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="mt-7">
            <ValidationObserver ref="formEdit" v-slot="{ invalid }">
              <form @submit.prevent="updateLookup()">
                <!-- {{errors.code}}
                {{errors.value_en}} -->

                <ValidationProvider
                  name="Lookup"
                  vid="division"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <v-autocomplete
                    @input="onChangeLookup($event)"
                    v-model="data.type"
                    outlined
                    :label="$t('container.general_setting.lookup_type')"
                    :items="lookupTypes"
                    item-text="name"
                    item-value="id"
                    required
                    :error="errors[0] ? true : false"
                    :error-messages="errors[0]"
                  ></v-autocomplete>
                </ValidationProvider>
                <ValidationProvider
                  name="Name English"
                  vid="value_en"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <v-text-field
                    outlined
                    type="text"
                    v-model="data.value_en"
                    :label="$t('container.general_setting.value_en')"
                    required
                    :error="errors[0] ? true : false"
                    :error-messages="errors[0]"
                  ></v-text-field>
                </ValidationProvider>
                <ValidationProvider
                  name="Name Bangla"
                  vid="value_bn"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <v-text-field
                    outlined
                    type="text"
                    v-model="data.value_bn"
                    :label="$t('container.general_setting.value_en')"
                    required
                    :error="errors[0] ? true : false"
                    :error-messages="errors[0]"
                  ></v-text-field>
                </ValidationProvider>

                <ValidationProvider
                  name="Keywork"
                  vid="keyword"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <v-text-field
                    outlined
                    type="text"
                    v-model="data.keyword"
                    :label="$t('container.list.keyword')"
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
                    class="custom-btn-width warning white--text py-2"
                  >
                    {{ $t("container.list.update") }}
                  </v-btn>
                </v-row>
              </form>
            </ValidationObserver>
          </v-card-text>
        </v-card>
      </v-dialog>
      <!-- district Edit modal  -->

      <!-- delete modal  -->
      <v-dialog v-model="deleteDialog" width="350">
        <v-card style="justify-content: center; text-align: center">
          <v-card-title class="font-weight-bold justify-center">
            {{ $t("container.general_setting.delete") }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <div class="subtitle-1 font-weight-medium mt-5">
              {{ $t("container.general_setting.delete_alert") }}
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
                @click="deleteLookup()"
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
      <!-- {{ divisions }} -->
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
  title: "CTM - General Setting",
  data() {
    return {
      data: {
        id: null,
        type: null,
        value_en: null,
        value_bn: null,
        keyword: null,
      },
      dialogAdd: false,
      deleteDialog: false,
      dialogEdit: false,
      delete_loading: false,
      loading: false,
      search: "",
      delete_id: "",
      lookups: [],
      errors: {},
      error_status: {},
      pagination: {
        current: 1,
        total: 0,
        perPage: 15,
      },
      // errors: "",
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
          text: this.$t("container.general_setting.lookup_type"),
          value: "type",
        },
        {
          text: this.$t("container.general_setting.value_en"),
          value: "value_en",
        },
        {
          text: this.$t("container.general_setting.value_bn"),
          value: "value_bn",
        },
        {
          text: this.$t("container.list.keyword"),
          value: "keyword",
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
      message: (state) => state.District.success_message,
      divisions: (state) => state.Division.divisions,
      lookupTypes: (state) => state.lookupTypes,
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
      // let checkLanguageEnglish = this.$checkLanguage(this.data.value_en);
      // let checkLanguageBangla = this.$checkLanguage(this.data.value_bn);
      // if (
      //   checkLanguageBangla != "Bangla" &&
      //   checkLanguageEnglish != "English"
      // ) {
      //   let errs = {
      //     value_bn: ["Please Enter in Bangla Language in this Field"],
      //     value_en: ["Please Enter in English Language in this Field"],
      //   };
      //   this.$refs.form.setErrors(errs);
      //   return false;
      // } else if (checkLanguageBangla != "Bangla") {
      //   let errs = {
      //     value_bn: ["Please Enter in Bangla Language in this Field"],
      //   };
      //   this.$refs.form.setErrors(errs);
      //   return false;
      // } else if (checkLanguageEnglish != "English") {
      //   let errs = {
      //     value_en: ["Please Enter in English Language in this Field"],
      //   };
      //   this.$refs.form.setErrors(errs);
      //   return false;
      // } else {
      //   return true;
      // }

      let checkLanguageEnglish = this.$checkLanguage(this.data.value_en);
      let checkLanguageBangla = this.$checkLanguage(this.data.value_bn);

      console.log(checkLanguageEnglish);
      console.log(checkLanguageBangla);
      let errs = {};

      if (
        checkLanguageBangla !== "Bangla" &&
        checkLanguageBangla !== "BanglaSpecialChar"
      ) {
        errs.value_bn = ["Please Enter in Bangla Language in this Field"];
      }

      if (checkLanguageEnglish !== "English") {
        errs.value_en = ["Please Enter in English Language in this Field"];
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
    submitLookup() {
      if (!this.checkLanguage()) {
        return;
      }
      // this.validator();
      // return;
      try {
        this.$store
          .dispatch("GeneralSetting/StoreLookup", this.validator())
          .then((data) => {
            console.log(data, "submit");
            if (data == null) {
              this.$toast.success("Data Inserted Successfully");
              this.dialogAdd = false;
              this.resetForm();
              this.GetLookup();
            } else {
              this.$refs.formAdd.setErrors(data.errors);
              this.errors = data.errors;
            }
          })
          .catch((error) => {
            console.log(error, "error");
          });
      } catch (e) {
        console.log(e);
      }
    },
    editDialog(item) {
      console.log(JSON.stringify(item));
      this.dialogEdit = true;
      this.data.id = item.id;
      this.data.type = item.type;
      this.data.value_en = item.value_en;
      this.data.value_bn = item.value_bn;
      this.data.keyword = item.keyword;
      this.errors = {};
    },
    updateLookup() {
      if (!this.checkLanguage()) {
        return;
      }

      try {
        this.$store
          .dispatch("GeneralSetting/UpdateLookup", this.validator())
          .then((data) => {
            console.log(data, "update");
            if (data == null) {
              this.$toast.success("Data Updated Successfully");
              this.dialogEdit = false;
              this.resetForm();
              this.GetLookup();
            } else {
              this.$refs.formEdit.setErrors(data.errors);
            }
          });
      } catch (e) {
        console.log(e);
      }
    },
    resetForm() {
      this.data = {
        code: "",
        value_en: "",
        value_bn: "",
      };
    },
    onPageChange($event) {
      // this.pagination.current = $event;
      this.GetLookup();
    },
    async GetLookup() {
      const queryParams = {
        searchText: this.search,
        perPage: this.pagination.perPage,
        page: this.pagination.current,
      };
      this.$axios
        .get("/admin/lookup/get", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
          params: queryParams,
        })
        .then((result) => {
          console.log(result.data.data, "getLookup");
          this.lookups = result.data.data;
          this.pagination.current = result.data.meta.current_page;
          this.pagination.total = result.data.meta.last_page;
          this.pagination.grand_total = result.data.meta.total;
        });
    },
    deleteLookup: async function () {
      try {
        await this.$store
          .dispatch("GeneralSetting/DestroyLookup", this.delete_id)
          .then((res) => {
            // check if the request was successful
            console.log(res.data);
            if (res?.data?.success) {
              this.$toast.error(res.data.message);
            } else {
              this.$toast.error(res.response.data.message);
            }
            this.deleteDialog = false;
            this.GetLookup();
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
    getAllDivision() {
      try {
        this.$store.dispatch("Division/GetAllDivisions").then(() => {
          console.log("success");
        });
      } catch (e) {
        console.log(e);
      }
    },
    async onChangeLookupFilter(event) {
      console.log(event, "onChangeLookupFilter");
      if (event === null) {
        this.GetLookup();
        return;
      }

      this.$axios
        .get("/admin/lookup/get/" + event, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          console.log(result.data.data, "getLookup");
          this.lookups = result.data.data;
        });
    },
    updateHeaderTitle() {
      const title = this.$t("container.general_setting.list");
      this.$store.commit("setHeaderTitle", title);
    },
  },
  watch: {
    "$i18n.locale": "updateHeaderTitle",
  },
  created() {
    console.log(this.lookupTypes);
    this.GetLookup();
    this.getAllDivision();
  },
  beforeMount() {
    this.updateHeaderTitle();
  },
};
</script>