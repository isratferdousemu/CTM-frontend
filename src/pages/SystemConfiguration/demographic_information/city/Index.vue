<template>
  <div id="city">
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
                  {{ $t("container.system_config.demo_graphic.city.list") }}
                </h3>
              </v-card-title>
              <v-card-text>
                           <v-row justify="space-between" align="center" class="mx-5">
          <!-- Checkbox on the left -->
          <v-col lg="3" md="3" cols="12">
              <v-text-field
                  @keyup.native="Getcity"
                  outlined
                  dense
                  v-model="search"
                  prepend-inner-icon="mdi-magnify"
                  class="my-sm-0 my-3 mx-0v -input--horizontal"
                  flat
                  variant="outlined"
                  :label="$t('container.list.search')"
                  hide-details
                  color="primary"
              ></v-text-field>
          </v-col>

          <!-- Dropdown on the right -->
          <v-col lg="3" md="3" cols="12" class="text-right ">
              <v-btn
                  @click="createDialog"
                  flat
                  color="primary"
                  prepend-icon="mdi-account-multiple-plus"
              >
                  {{ $t("container.list.add_new") }}
              </v-btn>
          </v-col>
      </v-row>
      <v-row justify="space-between" align="center" class="mx-4">
          <!-- Checkbox on the left -->
          <v-col lg="3" md="3" cols="12">
              {{ $t('container.list.total') }} &nbsp;:&nbsp; {{ language === 'bn' ? $helpers.englishToBangla(
                this.total) : this.total }}
          </v-col>

          <!-- Dropdown on the right -->
          <v-col lg="4" md="4" cols="12" class="text-right">
              <v-btn elevation="2" class="btn mr-2 white--text" flat color="red darken-4" @click="GeneratePDF()">
                  {{ $t("container.list.PDF") }}
              </v-btn>
              <!-- <v-btn elevation="2" flat class="btn mr-2 white--text" color="teal darken-2" @click="GenerateExcel()">
              {{ $t("container.list.excel") }}
          </v-btn> -->
          </v-col>
      </v-row>
                <v-row
                  class="ma-0 pa-3 white round-border d-flex justify-space-between align-center"
                  justify="center"
                  justify-lg="space-between"
                >
                  <!-- <div class="d-flex justify-sm-end flex-wrap">
                    <v-text-field
                      @keyup.native="GetCity"
                      outlined
                      dense
                      v-model="search"
                      prepend-inner-icon="mdi-magnify"
                      class="my-sm-0 my-3 mx-0v -input--horizontal"
                      flat
                      variant="outlined"
                      :label="
                        $t('container.system_config.demo_graphic.city.search')
                      "
                      hide-details
                      color="primary"
                    >
                    </v-text-field>
                  </div>
                  <v-btn -->
                    @click="createDialog"
                    flat
                    color="primary"
                    prepend-icon="mdi-account-multiple-plus"
                  >
                    {{ $t("container.list.add_new") }}
                  </v-btn> -->
                  <v-col cols="12">
                    <v-data-table
                      :loading="loading"
                      item-key="id"
                      :headers="headers"
                      :items="city"
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
                      <template v-slot:item.locationType="{ item }">
                        {{ item.locationType?.value_en }}
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

      <!-- city add modal  -->
      <v-dialog v-model="dialogAdd" width="650">
        <v-card style="justify-content: center; text-align: center">
          <v-card-title class="font-weight-bold justify-center">
            {{ $t("container.system_config.demo_graphic.city.add_new") }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="mt-7">
            <ValidationObserver ref="formAdd" v-slot="{ invalid }">
              <form @submit.prevent="submitCity()">
                <!-- {{errors.code}}
                {{errors.name_en}} -->

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
                  name="District"
                  vid="district"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <v-autocomplete
                    v-model="data.district_id"
                    outlined
                    :label="
                      $t(
                        'container.system_config.demo_graphic.district.district'
                      )
                    "
                    :items="districts"
                    item-text="name_en"
                    item-value="id"
                    required
                    :error="errors[0] ? true : false"
                    :error-messages="errors[0]"
                  ></v-autocomplete>
                </ValidationProvider>
                <ValidationProvider
                  name="LocationType"
                  vid="locationType"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <v-autocomplete
                    v-model="data.location_type"
                    outlined
                    :label="$t('container.list.location_type')"
                    :items="filteredOptions"
                    item-text="value_en"
                    item-value="id"
                    required
                    :error="errors[0] ? true : false"
                    :error-messages="errors[0]"
                  ></v-autocomplete>
                </ValidationProvider>
                <ValidationProvider
                  name="Code"
                  vid="code"
                  rules="required|codeRules"
                  v-slot="{ errors }"
                >
                  <v-text-field
                    outlined
                    type="text"
                    v-model="data.code"
                    :label="$t('container.system_config.demo_graphic.city.code')"
                    required
                    :error="errors[0] ? true : false"
                    :error-messages="errors[0]"
                  ></v-text-field>
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
                    :label="$t('container.system_config.demo_graphic.city.name_en')"
                    required
                    :error="errors[0] ? true : false"
                    :error-messages="errors[0]"
                  ></v-text-field>
                </ValidationProvider>
                <ValidationProvider
                  name="Name Bangla"
                  vid="name_bn"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <v-text-field
                    outlined
                    type="text"
                    v-model="data.name_bn"
                    :label="$t('container.system_config.demo_graphic.city.name_bn')"
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
                    class="custom-btn-width primary white--text py-2"
                  >
                    {{ $t("container.list.submit") }}
                  </v-btn>
                </v-row>
              </form>
            </ValidationObserver>
          </v-card-text>
        </v-card>
      </v-dialog>
      <!-- city add modal  -->

      <!-- city Edit modal  -->
      <v-dialog v-model="dialogEdit" width="650">
        <v-card style="justify-content: center; text-align: center">
          <v-card-title class="font-weight-bold justify-center">
            {{ $t("container.system_config.demo_graphic.city.edit") }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="mt-7">
            <ValidationObserver ref="formEdit" v-slot="{ invalid }">
              <form @submit.prevent="updateCity()">
                <!-- {{errors.code}}
                {{errors.name_en}} -->

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
                    :readonly="true"
                  ></v-autocomplete>
                </ValidationProvider>
                <ValidationProvider
                  name="District"
                  vid="district"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <v-autocomplete
                    @input="onChangeDistrict($event)"
                    v-model="data.district_id"
                    outlined
                    :label="
                      $t(
                        'container.system_config.demo_graphic.district.district'
                      )
                    "
                    :items="districts"
                    item-text="name_en"
                    item-value="id"
                    required
                    :error="errors[0] ? true : false"
                    :error-messages="errors[0]"
                    :readonly="true"
                  ></v-autocomplete>
                </ValidationProvider>
                <ValidationProvider
                  name="LocationType"
                  vid="locationType"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <v-autocomplete
                    v-model="data.location_type"
                    outlined
                    :label="$t('container.list.location_type')"
                    :items="filteredOptions"
                    item-text="value_en"
                    item-value="id"
                    required
                    :error="errors[0] ? true : false"
                    :error-messages="errors[0]"
                    :readonly="true"
                  ></v-autocomplete>
                </ValidationProvider>
                <ValidationProvider
                  name="Code"
                  vid="code"
                  rules="required|codeRules"
                  v-slot="{ errors }"
                >
                  <v-text-field
                    outlined
                    type="text"
                    v-model="data.code"
                    :label="$t('container.system_config.demo_graphic.city.code')"
                    required
                    :error="errors[0] ? true : false"
                    :error-messages="errors[0]"
                  ></v-text-field>
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
                    :label="$t('container.system_config.demo_graphic.city.name_en')"
                    required
                    :error="errors[0] ? true : false"
                    :error-messages="errors[0]"
                  ></v-text-field>
                </ValidationProvider>
                <ValidationProvider
                  name="Name Bangla"
                  vid="name_bn"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <v-text-field
                    outlined
                    type="text"
                    v-model="data.name_bn"
                    :label="$t('container.system_config.demo_graphic.city.name_bn')"
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
      <!-- city Edit modal  -->

      <!-- delete modal  -->
      <v-dialog v-model="deleteDialog" width="400">
        <v-card style="justify-content: center; text-align: center">
          <v-card-title class="font-weight-bold justify-center">
            {{ $t("container.system_config.demo_graphic.city.delete") }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <div class="subtitle-1 font-weight-medium mt-5">
              {{ $t("container.system_config.demo_graphic.city.delete_alert") }}
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
                @click="deleteCity()"
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
      <!-- {{ city }} -->
      <!-- {{ districts }} -->
      <!-- {{ locationType }} -->
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
  title: "CTM - City",
  data() {
    return {
      data: {
        division_id: null,
        district_id: null,
        id: null,
        code: null,
        name_en: null,
        name_bn: null,
        locationType: null,
        location_type: null,
      },
      total:null,
      locationType: [],
      districts: [],
      isDisabled: true,
      dialogAdd: false,
      deleteDialog: false,
      dialogEdit: false,
      delete_loading: false,
      loading: false,
      search: "",
      delete_id: "",
      city: [],
      errors: {},
      error_status: {},
      pagination: {
        current: 1,
        total: 0,
        perPage: 15,
      },
      items: [5, 10, 15, 20, 40, 50, 100],
    };
  },
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  computed: {
  language: {
      get() {
        return this.$store.getters.getAppLanguage;
      },
    },
    headers() {
      return [
        {
          text: this.$t("container.list.sl"),
          value: "id",
          align: "start",
          sortable: true,
          width: "5%",
        },
        {
          text: this.$t("container.system_config.demo_graphic.city_corporation.code"),
          value: "code",
          width: "5%",
        },
        {
          text: this.$t(
            "container.system_config.demo_graphic.division.division"
          ),
          value: "district.division.name_en",
        },
        {
          text: this.$t(
            "container.system_config.demo_graphic.district.district"
          ),
          value: "district.name_en",
        },
        {
          text: this.$t("container.list.location_type"),
          value: "locationType",
          sortable: true,
        },
        {
          text: this.$t("container.system_config.demo_graphic.city.name_en"),
          value: "name_en",
        },
        {
          text: this.$t("container.system_config.demo_graphic.city.name_bn"),
          value: "name_bn",
        },
        {
          text: this.$t("container.list.action"),
          value: "actions",
          align: "center",
          sortable: false,
          width: "15%",
        },
      ];
    },
    ...mapState({
      message: (state) => state.City.success_message,
      divisions: (state) => state.Division.divisions,
      //   districts: (state) => state.District.districts.data,
      city: (state) => state.City.city,
      errors: (state) => state.City.errors,
      error_status: (state) => state.City.error_status,
    }),
    filteredOptions() {
      // Apply your filter logic here, e.g., filtering out options with 'Option 2' label
      return this.locationType.filter(
        (option) => option.value_en !== "Upazila"
      );
    },
  },
  methods: {
     GeneratePDF() {
      const queryParams = {

        searchText: this.search,
      };
      this.$axios
        .get("/admin/city/generate-pdf", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
          params: queryParams,
        })
        .then((result) => {
          window.open(result.data.data.url, '_blank');
        })
        .catch(error => {
          console.error('Error generating PDF:', error);
        });

    },
    registerCustomRules() {
      extend('codeRules', (value) => {
        return (value.toString().length <= 6) || this.$t("container.system_config.demo_graphic.city.code")+' can have maximum 6 digit';
      });
    },
    createDialog() {
      if (this.$refs.formAdd) {
        this.$refs.formAdd.reset();
      }
      this.resetForm();
      this.dialogAdd = true;
    },
    checkLanguage() {
      //   let checkLanguageEnglish = this.$checkLanguage(this.data.name_en);
      //   let checkLanguageBangla = this.$checkLanguage(this.data.name_bn);
      //   if (
      //     checkLanguageBangla != "Bangla" &&
      //     checkLanguageEnglish != "English"
      //   ) {
      //     let errs = {
      //       name_bn: ["Please Enter in Bangla Language in this Field"],
      //       name_en: ["Please Enter in English Language in this Field"],
      //     };
      //     this.$refs.form.setErrors(errs);
      //     return false;
      //   } else if (checkLanguageBangla != "Bangla") {
      //     let errs = {
      //       name_bn: ["Please Enter in Bangla Language in this Field"],
      //     };
      //     this.$refs.form.setErrors(errs);
      //     return false;
      //   } else if (checkLanguageEnglish != "English") {
      //     let errs = {
      //       name_en: ["Please Enter in English Language in this Field"],
      //     };
      //     this.$refs.form.setErrors(errs);
      //     return false;
      //   } else {
      //     return true;
      //   }

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

      if (checkLanguageEnglish !== "English") {
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
        }
      }
      return fd;
    },
    submitCity() {
      if (!this.checkLanguage()) {
        return;
      }

      try {
        this.$store
          .dispatch("City/StoreCity", this.validator())
          .then((data) => {
            console.log(data, "submit");
            if (data == null) {
              this.$toast.success("Data Inserted Successfully");
              this.dialogAdd = false;
              this.resetForm();
              this.GetCity();
            } else {
              this.$refs.formAdd.setErrors(data.errors);
            }
          });
      } catch (e) {
        console.log(e);
      }
    },
    editDialog(item) {
      this.dialogEdit = true;
      this.data.code = item.code;
      this.data.division_id = item.district.division.id;
      this.onChangeDivision(this.data.division_id);
      this.data.district_id = item.district.id;
      this.data.name_en = item.name_en;
      this.data.name_bn = item.name_bn;
      this.data.id = item.id;
      this.data.location_type = item.locationType.id;
      this.errors = {};
      // alert(JSON.stringify(this.data));
    },
    updateCity() {
      if (!this.checkLanguage()) {
        return;
      }

      try {
        this.$store
          .dispatch("City/UpdateCity", this.validator())
          .then((data) => {
            console.log(data, "update");
            if (data == null) {
              this.$toast.success("Data Updated Successfully");
              this.dialogEdit = false;
              this.resetForm();
              this.GetCity();
            } else {
              this.$refs.formEdit.setErrors(data.errors);
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
        division_id: null,
        district_id: null,
        location_type: null,
        // Reset other form fields
      };
      this.districts = [];
      this.errors = {};
    },
    onPageChange($event) {
      // this.pagination.current = $event;
      this.GetCity();
    },
    async GetCity() {
      const queryParams = {
        searchText: this.search,
        perPage: this.pagination.perPage,
        page: this.pagination.current,
      };
   

      this.$axios
        .get("/admin/city/get", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
          params: queryParams,
        })
        .then((result) => {
          this.city = result.data.data;
          this.pagination.current = result.data.meta.current_page;
          this.pagination.total = result.data.meta.last_page;
          this.pagination.grand_total = result.data.meta.total;
          this.total = result.data.meta.total;
        });
    },
    deleteCity: async function () {
      try {
        await this.$store
          .dispatch("City/DestroyCity", this.delete_id)
          .then((res) => {
            // check if the request was successful
            console.log(res.data);
            if (res?.data?.success) {
              this.$toast.success(res.data.message);
            } else {
              this.$toast.error(res.response.data.message);
            }
            this.deleteDialog = false;
            this.GetCity();
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
    getAllDistrict() {
      try {
        this.$store.dispatch("District/GetAllDistricts").then(() => {
          console.log("success");
        });
      } catch (e) {
        console.log(e);
      }
    },
    async onChangeDivision(event) {
      await this.$axios
        .get(`/admin/district/get/${event}`, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          this.districts = result.data.data;
          this.isDistrictHidden = true;
        });
    },
    async onChangeDivision1(event) {
      console.log(event);
      await this.$axios
        .get(`/admin/district/get/${event}`, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          // this.districts = result.data.data;
          console.log(result.data.data, " onChangeDivision");

          try {
            this.$store
              .dispatch("District/SetDistrict", result.data)
              .then(() => {});
          } catch (e) {
            console.log(e);
          }

          this.isDisabled = false;
        });

      console.log(event);
      const targetValue = event;
      const array = this.$store.state.District.districts.data;
      // const foundItem = array.filter((item) => item.division.id === targetValue);
      const filteredItems = this.filterArrayByProperty(
        array,
        "division.id",
        targetValue
      );

      if (filteredItems.length != 0) {
        console.log("Found item:", filteredItems);
        this.isDisabled = false;
        const payload = {
          data: filteredItems,
        };

        try {
          this.$store.dispatch("District/SetDistrict", payload).then(() => {});
        } catch (e) {
          console.log(e);
        }
      } else {
        this.isDisabled = true;
        console.log("Item not found");
      }
      // console.log("--");
      // console.log(this.$store.state.District.districts.data);
      // console.log("--");
    },
    filterArrayByProperty(array, propertyPath, targetValue) {
      const foundItems = array.filter((item) => {
        // Split the property path into an array of nested properties
        const properties = propertyPath.split(".");

        // Use reduce to access the nested property
        const propertyValue = properties.reduce(
          (obj, prop) => obj && obj[prop],
          item
        );

        // Check if the property value matches the target value
        return propertyValue === targetValue;
      });

      return foundItems;
    },
    updateHeaderTitle() {
      const title = this.$t("container.system_config.demo_graphic.city.list");
      this.$store.commit("setHeaderTitle", title);
    },
  },
  created() {
    this.registerCustomRules();
    this.GetCity();
    this.getAllDivision();
    this.$store.dispatch("getLookupByType", 1).then((res) => {
      this.locationType = res;
      console.log(this.locationType, " here");
    });
    // this.getAllDistrict();
  },
  watch: {
    "$i18n.locale": "updateHeaderTitle",
  },
  beforeMount() {
    this.updateHeaderTitle();
  },
};
</script>
