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
                  {{ $t("container.system_config.demo_graphic.district.list") }}
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
                      @keyup.native="GetDistrict"
                      outlined
                      dense
                      v-model="search"
                      prepend-inner-icon="mdi-magnify"
                      class="my-sm-0 my-3 mx-0v -input--horizontal"
                      flat
                      variant="outlined"
                      :label="
                        $t(
                          'container.system_config.demo_graphic.district.search'
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
                  >
                    {{ $t("container.list.add_new") }}
                  </v-btn>
                  <v-col cols="12">
                    <v-data-table
                      :loading="loading"
                      item-key="id"
                      :headers="headers"
                      :items="districts"
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
            {{ $t("container.system_config.demo_graphic.district.add_new") }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="mt-7">
            <ValidationObserver ref="form" v-slot="{ invalid }">
              <form @submit.prevent="submitDistrict()">
                <!-- {{errors.code}}
                {{errors.name_en}} -->

                <ValidationProvider name="Code" vid="code" rules="required">
                  <v-text-field
                    outlined
                    type="text"
                    v-model="data.code"
                    :label="$t('container.list.code')"
                    required
                    :error="errors[0] ? true : false"
                    :error-messages="errors.code"
                  ></v-text-field>
                </ValidationProvider>
                <ValidationProvider
                  name="Division"
                  vid="division"
                  rules="required"
                >
                  <v-autocomplete
                    @input="onChangeDivision($event)"
                    v-model="data.division_id"
                    outlined
                    :label="
                      $t(
                        'container.system_config.demo_graphic.division.division'
                      )
                    "
                    :items="divisions"
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
                >
                  <v-text-field
                    outlined
                    type="text"
                    v-model="data.name_en"
                    :label="$t('container.list.name_en')"
                    required
                    :error="errors.name_en ? true : false"
                    :error-messages="errors.name_en"
                  ></v-text-field>
                </ValidationProvider>
                <ValidationProvider
                  name="Name Bangla"
                  vid="name_bn"
                  rules="required"
                >
                  <v-text-field
                    outlined
                    type="text"
                    v-model="data.name_bn"
                    :label="$t('container.list.name_bn')"
                    required
                    :error="errors.name_bn ? true : false"
                    :error-messages="errors.name_bn"
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
            {{ $t("container.system_config.demo_graphic.district.edit") }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="mt-7">
            <ValidationObserver ref="form" v-slot="{ invalid }">
              <form @submit.prevent="updateDistrict()">
                <!-- {{errors.code}}
                {{errors.name_en}} -->

                <ValidationProvider name="Code" vid="code" rules="required">
                  <v-text-field
                    outlined
                    type="text"
                    v-model="data.code"
                    :label="$t('container.list.code')"
                    required
                    :error="errors[0] ? true : false"
                    :error-messages="errors.code"
                  ></v-text-field>
                </ValidationProvider>

                <ValidationProvider
                  name="Division"
                  vid="division"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <v-autocomplete
                    @input="onChangeDivision($event)"
                    v-model="data.division_id"
                    outlined
                    :label="
                      $t(
                        'container.system_config.demo_graphic.division.division'
                      )
                    "
                    :items="divisions"
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
                >
                  <v-text-field
                    outlined
                    type="text"
                    v-model="data.name_en"
                    :label="$t('container.list.name_en')"
                    required
                    :error="errors.name_en ? true : false"
                    :error-messages="errors.name_en"
                  ></v-text-field>
                </ValidationProvider>
                <ValidationProvider
                  name="Name Bangla"
                  vid="name_bn"
                  rules="required"
                >
                  <v-text-field
                    outlined
                    type="text"
                    v-model="data.name_bn"
                    :label="$t('container.list.name_bn')"
                    required
                    :error="errors.name_bn ? true : false"
                    :error-messages="errors.name_bn"
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
            {{ $t("container.system_config.demo_graphic.district.delete") }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <div class="subtitle-1 font-weight-medium mt-5">
              {{
                $t("container.system_config.demo_graphic.district.delete_alert")
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
                @click="deleteDistrict()"
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
  title: "CTM - Districts",
  data() {
    return {
      data: {
        division_id: null,
        id: null,
        code: null,
        name_en: null,
        name_bn: null,
      },
      dialogAdd: false,
      deleteDialog: false,
      dialogEdit: false,
      delete_loading: false,
      loading: false,
      search: "",
      delete_id: "",
      districts: [],
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
        { text: this.$t("container.list.code"), value: "code" },
        {
          text: this.$t(
            "container.system_config.demo_graphic.division.division"
          ),
          value: "division.name_en",
        },
        { text: this.$t("container.system_config.demo_graphic.district.name_en"), value: "name_en" },
        { text: this.$t("container.system_config.demo_graphic.district.name_bn"), value: "name_bn" },
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
      districts: (state) => state.District.districts,
    }),
  },

  methods: {
    createDialog() {
      this.resetForm();
      this.dialogAdd = true;
    },
    submitDistrict() {
      try {
        this.$store
          .dispatch("District/StoreDistrict", this.data)
          .then((data) => {
            console.log(data, "submit");
            if (data == null) {
              this.$toast.success("Data Inserted Successfully");
              this.dialogAdd = false;
              this.resetForm();
              this.GetDistrict();
            } else {
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
      this.data.code = item.code;
      this.data.division_id = item.division.id;
      this.data.name_en = item.name_en;
      this.data.name_bn = item.name_bn;
      this.data.id = item.id;
      this.errors = {};
    },
    updateDistrict() {
      // alert(this.data);
      try {
        this.$store
          .dispatch("District/UpdateDistrict", this.data)
          .then((data) => {
            console.log(data, "update");
            if (data == null) {
              this.$toast.success("Data Updated Successfully");
              this.dialogEdit = false;
              this.resetForm();
              this.GetDistrict();
            } else {
              this.errors = data.errors;
            }

            // if (this.error_status == "") {
            //   this.$toast.success("Data Updated Successfully");
            //   this.dialogEdit = false;
            //   this.resetForm();
            //   this.GetDistrict();
            // }
          });
      } catch (e) {
        console.log(e);
      }
    },
    resetForm() {
      this.data = {
        code: "",
        name_en: "",
        name_bn: "",
      };
      this.errors = {};
    },
    onPageChange($event) {
      // this.pagination.current = $event;
      this.GetDistrict();
    },
    async GetDistrict() {
      const queryParams = {
        searchText: this.search,
        perPage: this.pagination.perPage,
        page: this.pagination.current,
      };
      this.$axios
        .get("/admin/district/get", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
          params: queryParams,
        })
        .then((result) => {
          this.districts = result.data.data;
          this.pagination.current = result.data.meta.current_page;
          this.pagination.total = result.data.meta.last_page;
          this.pagination.grand_total = result.data.meta.total;
        });
    },
    deleteDistrict: async function () {
      try {
        await this.$store
          .dispatch("District/DestroyDistrict", this.delete_id)
          .then((res) => {
            // check if the request was successful
            console.log(res.data);
            if (res?.data?.success) {
              this.$toast.success(res.data.message);
            } else {
              this.$toast.error(res.response.data.message);
            }
            this.deleteDialog = false;
            this.GetDistrict();
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
    async onChangeDivision(event) {
      console.log(event);
      // await axios
      //   .get(`/admin/district/get/${event}`, {
      //     headers: {
      //       Authorization: "Bearer " + this.$store.state.token,
      //       "Content-Type": "multipart/form-data",
      //     },
      //   })
      //   .then((result) => {
      //     this.districts = result.data.data;
      //     console.log(this.districts);
      //   });
    },
       updateHeaderTitle() {
      const title = this.$t("container.system_config.demo_graphic.district.list");
      this.$store.commit("setHeaderTitle", title);
    },
  },
    watch: {
    '$i18n.locale': 'updateHeaderTitle',
  },
  created() {
    this.GetDistrict();
    this.getAllDivision();
  },
  beforeMount() {
    this.updateHeaderTitle();
  },
};
</script>