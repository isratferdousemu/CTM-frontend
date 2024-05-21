<template>
  <div id="biReport">
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
              <v-card-title style="text-align:center; background-color: #1C3B68; color: white;font-size: 17px;padding-top:1px !important;" class="justify-center" tag="div">
                <h4 class="text-uppercase mt-3">
                  {{ $t("container.power_bi_report.index.title") }}
                </h4>
              </v-card-title>
              <v-card-text>

                <v-row justify="space-between" align="center" class="mt-1">
                  <!-- Checkbox on the left -->
                  <v-col lg="3" md="3" cols="12">
                    <v-text-field
                        @keyup.native="GetBiReport"
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

                  <!-- Dropdown on the right -->
                  <v-col lg="3" md="3" cols="12" class="text-right ">
                    <v-btn
                        @click="createDialog"
                        color="primary"
                        prepend-icon="mdi-account-multiple-plus"
                        v-can="'bireport-create'"
                    >
                      {{ $t("container.list.add_new") }}
                    </v-btn>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col
                      v-for="(item, index) in allBiReports"
                      :key="index"
                      cols="12"
                      sm="6"
                      md="4"
                      lg="3"
                      v-can="'bireport-view'"
                      class="card-column"
                  >
                    <v-card class="card-item" @mouseenter="showIcons(index)" @mouseleave="hideIcons()">
                      <router-link target="" :to="`/reports/bi-report/${item.id}`" style="text-decoration: none;">
                      <!-- Title -->

                        <v-card-title class="card-title">
                          <span v-html="truncateTitle(item)"></span>
                        </v-card-title>

<!--                      <v-card-title class="card-title">{{ $i18n.locale == 'en' ? item.name_en : item.name_bn }}</v-card-title>-->

                      <!-- Image -->
                        <div class="image-wrapper">
                          <v-img class="card-image" :src="item.image != null ? item.image : '/assets/images/no_image_icon.png'"></v-img>
                        </div>
                      </router-link>
                      <!-- Actions (Edit & Delete Icons) -->
                      <v-card-actions class="icon-actions" v-show="showIconsIndex === index">
                        <!-- Edit Icon -->
                        <v-icon v-can="'bireport-edit'" @click="editDialog(item)">mdi-pencil</v-icon>

                        <!-- Delete Icon -->
                        <v-icon v-can="'bireport-delete'" @click="deleteAlert(item.id)">mdi-delete</v-icon>
                      </v-card-actions>
                    </v-card>
                  </v-col>
                </v-row>

              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>

      <!-- Bi Report add modal  -->
      <v-dialog v-model="dialogAdd" width="650">
        <v-card style="justify-content: center; text-align: center">
          <v-card-title style="text-align:center; background-color: #1C3B68; color: white;font-size: 17px;padding-top:3px !important;" class="font-weight-bold justify-center">
            {{ $t("container.power_bi_report.index.add") }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="mt-7">
            <ValidationObserver ref="formAdd" v-slot="{ invalid }">
              <form @submit.prevent="submitBiReport()">
                <v-row>
                <v-col cols="12" sm="6" lg="6" xl="6" xs="6">
                <ValidationProvider
                    v-slot="{ errors }"
                    name="Title English"
                    vid="name_en"
                    rules="required|checkName"
                >
                  <v-text-field
                      outlined
                      type="text"
                      v-model="data.name_en"
                      :label="
                      $t(
                        'container.power_bi_report.index.title_en'
                      )
                    "
                      required
                      :error="errors[0] ? true : false"
                      :error-messages="errors[0]"
                  >></v-text-field
                  >
                </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="6" lg="6" xl="6" xs="6">
                <ValidationProvider
                    v-slot="{ errors }"
                    name="Title Bangla"
                    vid="name_bn"
                    rules="required|checkNameBn"
                >
                  <v-text-field
                      outlined
                      type="text"
                      v-model="data.name_bn"
                      :label="
                      $t(
                        'container.power_bi_report.index.title_bn'
                      )
                    "
                      required
                      :error="errors[0] ? true : false"
                      :error-messages="errors[0]"
                  >></v-text-field
                  >
                </ValidationProvider>
                </v-col>
                </v-row>
                <div class="textarea-container">
                  <div class="button-container">
                    <v-btn small class="extra-small-button">
                      <a href="https://app.powerbi.com/" target="_blank" style="text-decoration: none; color: white;">{{ $t(
                          'container.power_bi_report.index.go_power_bi'
                      )}} </a>
                    </v-btn>
                  </div>
                  <ValidationProvider
                      v-slot="{ errors }"
                      name="Embaded Code"
                      vid="embaded_code"
                      rules="required"
                  >
                    <v-textarea
                        v-model="data.embaded_code"
                        color="teal"
                        required
                        outlined
                        :label="$t('container.power_bi_report.index.embaded_code')"
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                    >
                    </v-textarea>
                  </ValidationProvider>
                </div>

                <v-row align-end>
                  <v-col cols="12" sm="3" lg="3" xl="6" xs="6">
                    <v-img :src="displayedImageUrl" style="
                        width: 100px;
                        height: 100px;
                        border-radius: 10px;
                        border: 1px solid #ccc;
                    " class="mb-5"></v-img>
                  </v-col>
                  <v-col cols="12" sm="9" lg="9" xl="6" xs="6"> <label>{{
                      $t('container.power_bi_report.index.image') }}
                    ({{
                      $t('container.training_management.trainer_info.image_alert')
                    }})</label>

                    <ValidationProvider v-slot="{ errors }" name="Image"
                                        vid="image">
                      <v-file-input dense outlined show-size counter
                                    prepend-outer-icon="mdi-camera" v-model="data.image"
                                    :placeholder="language == 'bn' ? 'ফাইল নির্বাচন করুন '
                                        : 'Choose File'" accept="image/*" @change="previewImage" prepend-icon=""
                                    id="image">
                      </v-file-input>
                    </ValidationProvider>
                  </v-col>


                </v-row>

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
      <!-- division add modal  -->

      <!-- Bi Report Edit modal  -->
      <v-dialog v-model="dialogEdit" width="650">
        <v-card style="justify-content: center; text-align: center">
          <v-card-title style="text-align:center; background-color: #1C3B68; color: white;font-size: 17px;padding-top:3px !important;" class="font-weight-bold justify-center">
            {{ $t("container.power_bi_report.index.update") }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="mt-7">
            <ValidationObserver ref="formEdit" v-slot="{ invalid }">
              <form @submit.prevent="updateBireport()">
                <!-- {{errors.code}}
                {{errors.name_en}} -->
              <v-row>
                <v-col cols="12" sm="6" lg="6" xl="6" xs="6">
                  <ValidationProvider
                      v-slot="{ errors }"
                      name="Title English"
                      vid="name_en"
                      rules="required|checkName"
                  >
                    <v-text-field
                        outlined
                        type="text"
                        v-model="data.name_en"
                        :label="
                      $t(
                        'container.power_bi_report.index.title_en'
                      )
                    "
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                    >></v-text-field
                    >
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="6" lg="6" xl="6" xs="6">
                  <ValidationProvider
                      v-slot="{ errors }"
                      name="Title Bangla"
                      vid="name_bn"
                      rules="required|checkNameBn"
                  >
                    <v-text-field
                        outlined
                        type="text"
                        v-model="data.name_bn"
                        :label="
                      $t(
                        'container.power_bi_report.index.title_bn'
                      )
                    "
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                    >></v-text-field
                    >
                  </ValidationProvider>
                </v-col>
              </v-row>
              <ValidationProvider
        v-slot="{ errors }"
        name="Embaded Code"
        vid="embaded_code"
        rules="required"
    >
      <v-textarea
          v-model="data.embaded_code"
          color="teal"
          required
          outlined
          :label="$t('container.power_bi_report.index.embaded_code')"
          :error="errors[0] ? true : false"
          :error-messages="errors[0]"
      >
      </v-textarea>
    </ValidationProvider>

              <v-row align-end>
      <v-col cols="12" sm="3" lg="3" xl="6" xs="6">
        <v-img :src="displayedImageUrl" style="
                        width: 100px;
                        height: 100px;
                        border-radius: 10px;
                        border: 1px solid #ccc;
                    " class="mb-5"></v-img>
      </v-col>
      <v-col cols="12" sm="9" lg="9" xl="6" xs="6"> <label>{{
          $t('container.power_bi_report.index.image') }}
        ({{
          $t('container.training_management.trainer_info.image_alert')
        }})</label>

        <ValidationProvider v-slot="{ errors }" name="Image"
                            vid="image">
          <v-file-input dense outlined show-size counter
                        prepend-outer-icon="mdi-camera" v-model="data.image"
                        :placeholder="language == 'bn' ? 'ফাইল নির্বাচন করুন '
                                        : 'Choose File'" accept="image/*" @change="previewImage" prepend-icon=""
                        id="image">
          </v-file-input>
        </ValidationProvider>
      </v-col>


    </v-row>

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
      <!-- bi report Edit modal  -->

      <!-- delete modal  -->
      <v-dialog v-model="deleteDialog" width="350">
        <v-card style="justify-content: center; text-align: center">
          <v-card-title class="font-weight-bold justify-center">
            {{ $t("container.power_bi_report.index.delete") }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <div class="subtitle-1 font-weight-medium mt-5">
              {{
                $t("container.power_bi_report.index.delete_alert")
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
                  @click="deleteBiReport()"
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
import { http } from "@/hooks/httpService";
import Spinner from "@/components/Common/Spinner.vue";

extend("required", required);

extend("checkName", {
  validate: (value) => {
    if (!value && value !== 0) {
      return false;
    }

    return /^[a-zA-Z\s]+$/.test(value);
  },
  message: "Please Enter English Letter's in this Field",
});

extend("checkNameBn", {
  validate: (value) => {
    if (!value && value !== 0) {
      return false;
    }

    var banglaRegex = /^[\u0980-\u09E5\u09F0-\u09FF\s]+$/;

    return banglaRegex.test(value);
  },
  message: "Please Enter Bangla Letter's in this Field",
});
export default {
  name: "Index",
  title: "CTM - Power BI Report",
  data() {
    return {
      imageUrl:null,
      data: {
        id: null,
        embaded_code: null,
        name_en: null,
        name_bn: null,
        image: null,
      },
      cards: [
        { id: 1, name_en: "Card 1", image: "https://via.placeholder.com/150", embaded_code: "<v-card>Card Content</v-card>" },
        { id: 2, name_en: "Card 2", image: "https://via.placeholder.com/150", embaded_code: "<v-card>Card Content</v-card>" },
        // Add more initial items as needed
      ],
      showIconsIndex: -1,
      allBiReports:[],
      total:null,
      isLoading:false,
      dialogAdd: false,
      deleteDialog: false,
      dialogEdit: false,
      delete_loading: false,
      loading: false,
      search: "",
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

    displayedImageUrl() {
      return this.imageUrl ? this.imageUrl : '/assets/images/no_image_icon.png';
    }

  },
  methods: {

    truncateTitle(item) {
      const maxWords = 4;
      const locale = this.$i18n.locale;
      const title = locale === 'en' ? item.name_en : item.name_bn;
      const words = title.split(' ');

      if (words.length > maxWords) {
        return words.slice(0, maxWords).join(' ') + '...';
      } else {
        return title;
      }
    },

    showIcons(index) {
      this.showIconsIndex = index;
    },
    hideIcons() {
      this.showIconsIndex = -1;
    },

    previewImage() {
      if (this.data.image) {
        const maxFileSize = 200 * 1024; // 200 KB in bytes
        if (this.data.image.size > maxFileSize) {
          if(this.language=='en'){
            this.$toast.error("File size must be under 200 KB");
          }
          else{
            this.$toast.error("ফাইলের আকার ২০০ কে বি এর কম হতে হবে");

          }
          this.data.image = '';
          return false;
        }
        const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg']; // Allowed file types
        if (!allowedTypes.includes(this.data.image.type)) {
          this.language === 'en' ? this.$toast.error("Only PNG, JPEG, or JPG files are allowed") : this.$toast.error("শুধুমাত্র পিএনজি, জেপিইজি, অথবা জেপিজি ফাইলগুলি অনুমোদিত");
          this.data.image = '';
          return false;
        }
        // return true;




        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageUrl = e.target.result;
        };
        reader.readAsDataURL(this.data.image);
      } else {
        // Clear the preview if no file is selected
        this.imageUrl = null;
      }

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
        }
      }
      return fd;
    },
    submitBiReport() {
      this.isLoading = true;
      if (!this.checkLanguage()) {
        this.isLoading = false;
        return;
      }
      const formData = new FormData();
      formData.append('name_en', this.data.name_en);
      formData.append('name_bn', this.data.name_bn);
      formData.append('embaded_code', this.data.embaded_code);
      if (this.data.image) {
        formData.append('image', this.data.image);
      }
      formData.append('lang', this.language);
      this.$axios
          .post("admin/report/power-bi-report", formData, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((result) => {
            this.dialogAdd = false;
            this.$toast.success(result.data.message);
            this.GetBiReport();
            this.isLoading = false;
          })
          .catch((err) => {
            this.isLoading = false;
            console.log(err, "err")
            this.$toast.error(err?.response?.data?.errors?.email[0]);
            this.$refs.form.setErrors(err.response.data.errors);
          });

    },
    editDialog(item) {
      this.dialogEdit = true;
      this.data.name_en = item.name_en;
      this.data.name_bn = item.name_bn;
      this.data.embaded_code = item.embaded_code;
      this.imageUrl = item.image;
      this.data.id = item.id;
      this.errors = {};
      this.delete_id = item.id;
    },
    updateBireport() {
      this.isLoading = true
      if (!this.checkLanguage()) {
        this.isLoading = false;
        return;
      }
      const formData = new FormData();
      formData.append('id', this.delete_id);
      formData.append('name_en', this.data.name_en);
      formData.append('name_bn', this.data.name_bn);
      formData.append('embaded_code', this.data.embaded_code);
      if (this.data.image) {
        formData.append('image', this.data.image);
      }
      formData.append('lang', this.language);
      formData.append('_method', "PUT");
      this.$axios
          .post(`admin/report/power-bi-report/${this.delete_id}`, formData, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((result) => {
            this.$toast.success(result.data.message);
            this.GetBiReport();
            this.dialogEdit = false;
            this.isLoading = false;
          })
          .catch((err) => {
            this.isLoading = false;
            this.$toast.error(err?.response?.data?.errors?.email[0]);
            this.$refs.form.setErrors(err.response.data.errors);
          });
    },
    resetForm() {
      this.data = {
        name_en: "",
        name_bn: "",
        embaded_code: "",
      };
      this.imageUrl = null;
      this.errors = {};
    },

    onPageChange($event) {
      this.GetBiReport();
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
      this.sortBy = "name_en";
      this.sortDesc = "asc";
      if (sortBy.length === 0 || sortDesc.length === 0) {
        this.sortBy = "name_en";
        this.sortDesc = "asc";
      } else {
        this.sortBy = sortBy[0];
        this.sortDesc = sortDesc[0] == true ? "desc" : "asc";
      }
      this.GetBiReport();

      const queryParams = {
        sortBy: this.sortBy,
        orderBy: this.sortDesc,
      };

      // alert(JSON.stringify(queryParams));
    },

    async GetBiReport() {
      this.isLoading = true;
      const queryParams = {
        searchText: this.search,
        perPage: this.pagination.perPage,
        page: this.pagination.current,
        sortBy: this.sortBy,
        sortDesc: this.sortDesc,
      };

      await this.$axios
          .get("/admin/report/power-bi-report", {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
            params: queryParams,
          })
          .then((result) => {
            this.total = result.data.total;
            this.allBiReports = result.data.data;
            this.pagination.current = result.data.current_page;
            this.pagination.total = result.data.last_page;
            this.pagination.grand_total = result.data.total;
            this.isLoading = false;
          })
          .catch((err) => {
            this.isLoading = false;
          });
    },
    deleteAlert(id) {
      this.data.id = id;
      this.deleteDialog = true;
      this.delete_id = id;
    },
    deleteBiReport: async function () {
      await this.$axios
          .delete(`admin/report/power-bi-report/${this.delete_id}`, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "application/json", // Use application/json instead of multipart/form-data
            },
          })
          .then((res) => {

            if (res?.data?.success == true) {
              this.$toast.success(res.data.message);
              this.deleteDialog = false;
              this.GetBiReport();
            }
            if (res?.data?.success == false) {
              this.$toast.error(res.data.message);
            }

          })
          .catch((error) => {
            console.log(error, "error");

          });
    },

  },
  mounted() {
    this.setInitialHeader();
  },
  created() {
    this.GetBiReport()
  },

};
</script>
<style scoped>
.card-column {
  margin-bottom: 20px; /* Adjust margin as needed */
}

.card-item {
  position: relative;
}

.icon-actions {
  position: absolute;
  top: 0;
  right: 0;
  opacity: 0;
  transition: opacity 0.5s;
  padding: 0px;
  margin: 0px;
}

.card-item:hover .icon-actions {
  opacity: 1;
}
.image-wrapper {
  display: flex;
  justify-content: center; /* Center the image horizontally */
  align-items: center; /* Center the image vertically */
  /* Hide overflow to ensure image doesn't exceed div boundaries */
}

.card-image {
  width: 200px;
  height: 200px;
  border-radius: 10px;
  padding: 5px;
  box-sizing: border-box;
}

.card-title{
  font-weight: 600;
  color: #000000;
  line-height: 18px;
  margin-top:5px; min-height: 100px !important; font-size: 12px
}

.button-container {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 2px;
}

.theme--light.v-btn.v-btn--has-bg {
  background-color: rgb(28, 59, 104);
}

</style>