<template>
  <div id="district">
    <v-row class="mx-5 mt-4">
      <v-col cols="12">
        <v-row>
          <Spinner :loading="isLoading" />
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
                <v-row justify="space-between" align="center" class="mx-5">
       
        <v-col lg="3" md="3" cols="12">
            <v-text-field
                @keyup.native="GetDistrict"
                outlined
                dense
                v-model="search"
                prepend-inner-icon="mdi-magnify"
                class="my-sm-0 my-3 mx-0v -input--horizontal"
                variant="outlined"
                :label="$t('container.list.search')"
                hide-details
                color="primary"
            ></v-text-field>
        </v-col>

      
        <v-col lg="3" md="3" cols="12" class="text-right ">
            <v-btn
                @click="createDialog"
                color="primary"
                prepend-icon="mdi-account-multiple-plus"
            >
                {{ $t("container.list.add_new") }}
            </v-btn>
        </v-col>
    </v-row>
    <v-row justify="space-between" align="center" class="mx-4">
    
       <v-col lg="3" md="3" cols="12">
      {{ $t('container.list.total') }}:&nbsp;<span style="font-weight: bold;">{{ this.total }}</span>
    </v-col>


      <v-col lg="4" md="6" cols="12" class="text-right">
        <v-btn elevation="2" class="btn mr-2 white--text" color="red darken-4" @click="GeneratePDF()">
          <v-icon class="pr-1"> mdi-tray-arrow-down </v-icon> {{ $t("container.list.PDF") }}
        </v-btn>
        <v-btn elevation="2" class="btn mr-2 white--text" color="teal darken-2" @click="GenerateExcel()">
          <v-icon class="pr-1"> mdi-tray-arrow-down </v-icon>
          {{ $t("container.list.excel") }}
        </v-btn>
      </v-col>
    </v-row>
                <v-row
                  class="ma-0 pa-3 white round-border d-flex justify-space-between align-center"
                  justify="center"
                  justify-lg="space-between"
                >
                  <!-- <div class="d-flex justify-sm-end flex-wrap">
                    <v-text-field
                      @keyup.native="GetDistrict"
                      outlined
                      dense
                      v-model="search"
                      prepend-inner-icon="mdi-magnify"
                      class="my-sm-0 my-3 mx-0v -input--horizontal"

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
                      :items="districts"
                      :items-per-page="pagination.perPage"

                      @update:options="handleOptionsUpdate($event)"
                      
                      hide-default-footer
                      class="elevation-0 transparent row-pointer"
                    >
                      <!-- Headers -->
                      <!-- <template v-slot:header.division.name_en>
                        <button @click="onClickHeader('division')">
                          Division
                        </button>
                      </template>
                      <template v-slot:header.name_en>
                        <button @click="onClickHeader('name_en')">
                          District
                        </button>
                      </template>
                      <template v-slot:header.name_bn>
                        <button @click="onClickHeader('name_bn')">
                          District
                        </button>
                      </template> -->
                      <!-- Headers -->
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
            <ValidationObserver ref="formAdd" v-slot="{ invalid }">
              <form @submit.prevent="submitDistrict()">
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
                  name="Code"
                  vid="code"
                  rules="required|codeRules"
                  v-slot="{ errors }"
                >
                  <v-text-field
                    outlined
                    type="text"
                    v-model="data.code"
                    :label="
                      $t('container.system_config.demo_graphic.district.code')
                    "
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
                    :label="
                      $t(
                        'container.system_config.demo_graphic.district.name_en'
                      )
                    "
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
                    :label="
                      $t(
                        'container.system_config.demo_graphic.district.name_bn'
                      )
                    "
                    required
                    :error="errors[0] ? true : false"
                    :error-messages="errors[0]"
                  ></v-text-field>
                </ValidationProvider>

                <v-row class="mx-0 my-0 py-2" justify="center">
                  <v-btn
                    @click="dialogAdd = false"
                    outlined
                    class="custom-btn-width py-2 mr-10"
                  >
                    {{ $t("container.list.cancel") }}
                  </v-btn>
                  <v-btn
                    type="submit"
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
            <ValidationObserver ref="formEdit" v-slot="{ invalid }">
              <form @submit.prevent="updateDistrict()">
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
                  name="Code"
                  vid="code"
                  rules="required|codeRules"
                  v-slot="{ errors }"
                >
                  <v-text-field
                    outlined
                    type="text"
                    v-model="data.code"
                    :label="
                      $t('container.system_config.demo_graphic.district.code')
                    "
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
                    :label="
                      $t(
                        'container.system_config.demo_graphic.district.name_en'
                      )
                    "
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
                    :label="
                      $t(
                        'container.system_config.demo_graphic.district.name_bn'
                      )
                    "
                    required
                    :error="errors[0] ? true : false"
                    :error-messages="errors[0]"
                  ></v-text-field>
                </ValidationProvider>

                <v-row class="mx-0 my-0 py-2" justify="center">
                  <v-btn
                    @click="dialogEdit = false"
                    outlined
                    class="custom-btn-width py-2 mr-10"
                  >
                    {{ $t("container.list.cancel") }}
                  </v-btn>
                  <v-btn
                    type="submit"
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
import Spinner from "@/components/Common/Spinner.vue";

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
      isLoading:false,
      total:null,
      dialogAdd: false,
      deleteDialog: false,
      dialogEdit: false,
      delete_loading: false,
      loading: false,
      search: "",
      delete_id: "",
      divisions: [],
      districts: [],
      Alldistricts: [],
      errors: {},
      error_status: {},
      pagination: {
        current: 1,
        total: 0,
        perPage: 15,
      },
      sortBy: "name_en",
      sortDesc: false, //ASC
      // errors: "",
      items: [5, 10, 15, 20, 40, 50, 100],
    };
  },
  components: {
    Spinner,
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
          text: this.$t("container.system_config.demo_graphic.district.code"),
          value: "code",
        },
        {
          text: this.$t(
            "container.system_config.demo_graphic.division.division"
          ),
          value: "parent.name_en",
          // sortable: true,
        },
        {
          text: this.$t(
            "container.system_config.demo_graphic.district.name_en"
          ),
          value: "name_en",
          class: "highlight-column",
        },
        {
          text: this.$t(
            "container.system_config.demo_graphic.district.name_bn"
          ),
          value: "name_bn",
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
    }),
  },
  methods: {
  
    async GeneratePDF() {
      this.isLoading = true;
      let page;
      if(!this.sortBy){
        page = this.pagination.current;
      }
      const queryParams = {
        language: this.$i18n.locale,
        searchText: this.search,
        perPage: this.search.trim() === '' ? this.total : this.total,
        page: this.pagination.current,
        sortBy: this.sortBy,
        orderBy: this.sortDesc,
      };

      await this.$axios
          .get("/admin/district/get", {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
            params: queryParams,
          })
          .then((result) => {
            this.Alldistricts = result.data.data;
          });

      const HeaderInfo = [
        this.$t("container.list.sl"),
        this.$t("container.system_config.demo_graphic.division.division"),
        this.$t("container.system_config.demo_graphic.district.code"),
        this.$t("container.system_config.demo_graphic.district.district"),
      ]

      const CustomInfo = this.Alldistricts.map(((i,index) => {
        return [
          this.$i18n.locale == 'en' ? index + 1 : this.$helpers.englishToBangla(index + 1),
          this.$i18n.locale == 'en' ? i.parent.name_en : i.parent.name_bn ,
          this.$i18n.locale == 'en' ? i.code : this.$helpers.englishToBangla(i.code),
          this.$i18n.locale == 'en' ? i.name_en : i.name_bn ,
        ]
      }));

      const queryParam = {
        language: this.$i18n.locale,
        data:CustomInfo,
        header:HeaderInfo,
        fileName:this.$t("container.system_config.demo_graphic.district.list"),
      };
      try {
        const response = await this.$axios.post("/admin/generate-pdf", queryParam, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "application/json", // Set content type to JSON
          },
          responseType: 'arraybuffer',
        });

        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url, '_blank');
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        console.error('Error generating PDF:', error);
      }
    },

    async GenerateExcel(){
      this.isLoading = true;
      let page;
      if(!this.sortBy){
        page = this.pagination.current;
      }
      const queryParams = {
        language: this.$i18n.locale,
        searchText: this.search,
        perPage: this.search.trim() === '' ? this.total : this.total,
        page: this.pagination.current,
        sortBy: this.sortBy,
        orderBy: this.sortDesc,
      };

       await this.$axios
          .get("/admin/district/get", {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
            params: queryParams,
          })
          .then((result) => {
            this.Alldistricts = result.data.data;
          })
    .catch(error => {
        this.isLoading = false;
        console.error('Error generating PDF:', error);
      });

      try {
        import('@/plugins/Export2Excel').then((excel) => {

          const HeaderInfo = [
            this.$t("container.list.sl"),
            this.$t("container.system_config.demo_graphic.division.division"),
            this.$t("container.system_config.demo_graphic.district.code"),
            this.$t("container.system_config.demo_graphic.district.district"),
          ]

          const CustomInfo = this.Alldistricts.map(((i,index) => {
            return {
              "sl" : this.$i18n.locale == 'en' ? index + 1 : this.$helpers.englishToBangla(index + 1),
              "division" :this.$i18n.locale == 'en' ? i.parent.name_en : i.parent.name_bn ,
              "code" :this.$i18n.locale == 'en' ? i.code : this.$helpers.englishToBangla(i.code),
              "district" :this.$i18n.locale == 'en' ? i.name_en : i.name_bn ,
            }
          }));

          const Field = ['sl', 'division', 'code', 'district']

          const Data = this.FormatJson(Field, CustomInfo)
          const currentDate = new Date().toISOString().slice(0, 10); //
          let dateinfo = queryParams.language == 'en' ? currentDate : this.$helpers.englishToBangla(currentDate)

          const filenameWithDate = `${dateinfo}_${this.$t("container.system_config.demo_graphic.district.list")}`;

          excel.export_json_to_excel({
            header: HeaderInfo,
            data: Data,
            sheetName: filenameWithDate,
            filename: filenameWithDate,
            autoWidth: true,
            bookType: "xlsx"
          })
        })
      } catch (error) {
        // Handle any errors here
        console.error("An error occurred:", error);
        this.isLoading = false;
      } finally {
        this.isLoading = false;
      }
    },

    FormatJson(FilterData,JsonData){
      return JsonData.map((v) =>
          FilterData.map((j => {
            return v[j];
          })))
    },

    registerCustomRules() {
      extend("codeRules", (value) => {
        return (
          value.toString().length <= 2 ||
          this.$t("container.system_config.demo_graphic.district.code") +
            " can have maximum 2 digit"
        );
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

      let checkLanguageEnglish = this.$checkLanguage(this.data.name_en);
      let checkLanguageBangla = this.$checkLanguage(this.data.name_bn);
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
    onClickHeader() {
      alert("clicked");
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
    submitDistrict() {
      if (!this.checkLanguage()) {
        return;
      }

      try {
        this.$store
          .dispatch("District/StoreDistrict", this.validator())
          .then((data) => {
            if (data == null) {
              this.$toast.success("Data Inserted Successfully");
              this.dialogAdd = false;
              this.resetForm();
              this.GetDistrict();
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
      this.dialogEdit = true;
      this.data.code = item.code;
      this.data.division_id = item.parent.id;
      this.data.name_en = item.name_en;
      this.data.name_bn = item.name_bn;
      this.data.id = item.id;
      this.errors = {};
    },
    updateDistrict() {
      if (!this.checkLanguage()) {
        return;
      }

      try {
        this.$store
          .dispatch("District/UpdateDistrict", this.validator())
          .then((data) => {
            if (data == null) {
              this.$toast.success("Data Updated Successfully");
              this.dialogEdit = false;
              this.resetForm();
              this.GetDistrict();
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
        name_en: "",
        name_bn: "",
      };
    },
    onPageChange($event) {
      // this.pagination.current = $event;
      this.GetDistrict();
    },
    setInitialHeader() {
      for (let i = 0; i < this.headers.length; i++) {
        if (this.headers[i].value == "name_en") {
          this.headers[i].class = "highlight-column";
        } else {
          this.headers[i].class = "";
        }
      }
    },
    handleOptionsUpdate({ sortBy, sortDesc }) {
      for (let i = 0; i < this.headers.length; i++) {
        if (this.headers[i].value == sortBy) {
          this.headers[i].class = "highlight-column";
        } else {
          this.headers[i].class = "";
        }
      }
        this.sortBy = 'name_en';
        this.sortDesc = 'asc';
      if (sortBy.length === 0 || sortDesc.length === 0) {
        this.sortBy = 'name_en';
        this.sortDesc = 'asc';
      } else {
        this.sortBy = sortBy[0];
      this.sortDesc = sortDesc[0]==true?'desc':'asc';
    }
    this.GetDistrict();

            const queryParams = {

        sortBy: this.sortBy,
        orderBy: this.sortDesc,
      };

    },
    GetDistrict() {
      let page;
      if(!this.sortBy){
        page = this.pagination.current;
        }
      const queryParams = {
        searchText: this.search,
        perPage: this.pagination.perPage,
        page: this.pagination.current,
        sortBy: this.sortBy,
        orderBy: this.sortDesc,
      };
      // return;
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
          this.pagination.current = result.data.current_page;
          this.pagination.total = result.data.last_page;
          this.pagination.grand_total = result.data.total;
          this.total = result.data.total;
        });
    },
    deleteDistrict: async function () {
      try {
        await this.$store
          .dispatch("District/DestroyDistrict", this.delete_id)
          .then((res) => {
            // check if the request was successful
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
      this.$axios
        .get("/admin/division/get", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          this.divisions = result.data.data;
        });
    },
    async onChangeDivision(event) {
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
      const title = this.$t(
        "container.system_config.demo_graphic.district.list"
      );
      this.$store.commit("setHeaderTitle", title);
    },
  },
  
  watch: {
    "$i18n.locale": "updateHeaderTitle",
    // options: {
    //   handler() {
    //     this.GetDistrict();
    //     console.log("watcher");
    //   },
    //   deep: true,
    // },

    // search: {
    //   handler() {
    //     this.current = this.options.page;
    //     this.GetDistrict();
    //     console.log("search");
    //   },
    // },
  },
  
  created() {
    this.registerCustomRules();
    this.getAllDivision();
    // this.handleOptionsUpdate();
    // this.GetDistrict();
  },
  mounted(){
    this.setInitialHeader();
  },
  beforeMount() {
    this.updateHeaderTitle();
  },
};
</script>
<style>
.highlight-column {
  background-color: #e0eaf1;
}
</style>