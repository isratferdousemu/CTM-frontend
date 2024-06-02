<template>
  <div id="city">
    <v-row class="mx-5 mt-4">
      <v-col cols="12">
        <v-row>
          <Spinner :loading="isLoading" />
          <v-col cols="12">
            <v-expansion-panels>
              <v-expansion-panel>
                <v-expansion-panel-header color="#1c3b68">
                  <template v-slot:actions>
                    <v-icon color="white">
                      $expand
                    </v-icon>
                  </template>
                  <h3 class="white--text" style="font-size:19.89px;">
                    {{ $t("container.list.filter") }}
                  </h3>
                </v-expansion-panel-header>
                <v-expansion-panel-content class="mt-5">
                  <ValidationObserver ref="formsearch" v-slot="{ invalid }">
                    <form @submit.prevent="GetCity()">
                      <v-row>
                        <v-col lg="4" md="4" cols="12">
                          <v-autocomplete outlined clearable :append-icon-cb="appendIconCallback" append-icon="mdi-plus"
                            class="no-arrow-icon" v-model="location_type_search" :items="locationType"
                            :item-text="language == 'bn' ? 'value_bn' : 'value_en'" item-value="id"
                            :label="$t('container.list.location_type')">
                          </v-autocomplete>
                        </v-col>
                        <v-col lg="4" md="4" cols="12">
                          <ValidationProvider name="Division" vid="division" v-slot="{ errors }">
                            <v-autocomplete @input="onChangeDivisionSearch($event)" :append-icon-cb="appendIconCallback"
                              append-icon="mdi-plus" class="no-arrow-icon" v-model="division_id_search" outlined :label="$t(
                                'container.system_config.demo_graphic.division.division'
                              )
                                " :items="divisions" :item-text="language == 'bn' ? 'name_bn' : 'name_en'"
                              item-value="id" :error="errors[0] ? true : false"
                              :error-messages="errors[0]"></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <v-col lg="4" md="4" cols="12">
                          <ValidationProvider name="District" vid="district" v-slot="{ errors }">
                            <v-autocomplete v-model="district_id_search" outlined :label="$t(
                              'container.system_config.demo_graphic.district.district'
                            )
                              " :append-icon-cb="appendIconCallback" append-icon="mdi-plus" class="no-arrow-icon"
                              :items="districts_search" :item-text="language == 'bn' ? 'name_bn' : 'name_en'"
                              item-value="id" :error="errors[0] ? true : false" :error-messages="errors[0]"
                              :readonly="false"></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                      </v-row>

                      <div class="d-inline d-flex justify-end">
                        <v-btn elevation="2" class="btn" @click="resetSearch">{{
                          $t("container.list.reset")
                        }}</v-btn>
                        <v-btn elevation="2" type="submit" class="btn ml-2" color="success">{{ $t("container.list.filter")
                        }}</v-btn>
                      </div>
                    </form>
                  </ValidationObserver>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
          <v-col cols="12">
            <v-card elevation="10" color="white" rounded="md" theme="light" class="mb-8">
             <v-card-title tag="div" style="background-color:#1c3b68;color:white;margin-bottom: 17px;font-size:17px;">
                  <h3 class="white--text">
                    {{ $t("container.system_config.demo_graphic.city_corporation.customtitle") }}
                  </h3>
                </v-card-title>
              <v-card-text>
                <v-row justify="space-between" align="center" class="mx-5">
                  <!-- Checkbox on the left -->
                  <v-col lg="3" md="3" cols="12">
                    <v-text-field @keyup.native="GetCity" outlined dense v-model="search" prepend-inner-icon="mdi-magnify"
                      class="my-sm-0 my-3 mx-0v -input--horizontal" flat variant="outlined"
                      :label="$t('container.list.search')" hide-details color="primary"></v-text-field>
                  </v-col>

                  <!-- Dropdown on the right -->
                  <v-col lg="3" md="3" cols="12" class="text-right ">
                    <v-btn @click="createDialog" flat color="primary" prepend-icon="mdi-account-multiple-plus"
                      v-can="'city-create'">
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
                  <v-col lg="4" md="6" cols="12" class="text-right">
                    <v-btn elevation="2" class="btn mr-2 white--text" flat color="red darken-4" @click="GeneratePdf()">
                      <v-icon class="pr-1"> mdi-tray-arrow-down </v-icon> {{ $t("container.list.PDF") }}
                    </v-btn>
                    <v-btn elevation="2" flat class="btn mr-2 white--text" color="teal darken-2" @click="GenerateExcel()">
                      <v-icon class="pr-1"> mdi-tray-arrow-down </v-icon>
                      {{ $t("container.list.excel") }}
                    </v-btn>
                  </v-col>
                </v-row>
                <v-row class="ma-0 pa-3 white round-border d-flex justify-space-between align-center" justify="center"
                  justify-lg="space-between">
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
                        $t(
                          'container.system_config.demo_graphic.city_corporation.search'
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
                  </v-btn> -->
                  <v-col cols="12">
                    <v-data-table :loading="loading" item-key="id" :headers="headers" :items="city"
                      :items-per-page="pagination.perPage" @update:options="handleOptionsUpdate" hide-default-footer
                      class="elevation-0 transparent row-pointer">
                      <template v-slot:item.id="{ item, index }">
                        {{ language === 'bn' ? $helpers.englishToBangla(
                          (pagination.current - 1) * pagination.perPage +
                          index +
                          1) : (pagination.current - 1) * pagination.perPage +
                          index +
                          1 }}
                      </template>
                      <template v-slot:item.code="{ item }">
                        {{ language === 'bn' ? $helpers.englishToBangla(
                          item.code) : item.code }}
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
                            <v-btn v-can="'city-edit'" fab x-small v-on="on" color="success" elevation="0"
                              @click="editDialog(item)">
                              <v-icon> mdi-account-edit-outline </v-icon>
                            </v-btn>
                          </template>
                          <span>
                            {{ $t("container.list.edit") }}
                          </span>
                        </v-tooltip>

                        <v-tooltip top>
                          <template v-slot:activator="{ on }">
                            <v-btn v-can="'city-delete'" fab x-small v-on="on" color="grey" class="ml-3 white--text"
                              elevation="0" @click="deleteAlert(item.id)">
                              <v-icon> mdi-delete </v-icon>
                            </v-btn>
                          </template>
                          <span> {{ $t("container.list.delete") }}</span>
                        </v-tooltip>
                      </template>
                      <!-- End Action Button -->

                      <template v-slot:footer="item">
                        <div class="text-center pt-2 v-data-footer justify-center pb-2">
                          <v-select style="
                              position: absolute;
                              right: 25px;
                              width: 149px;
                              transform: translate(0px, 0px);
                            " :items="items" hide-details dense outlined @change="onPageChange"
                            v-model="pagination.perPage"></v-select>
                          <v-pagination circle primary v-model="pagination.current" :length="pagination.total"
                            @input="onPageChange" :total-visible="11" class="custom-pagination-item"></v-pagination>
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
            {{
              $t(
                "container.system_config.demo_graphic.city_corporation.add_new"
              )
            }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="mt-7">
            <ValidationObserver ref="formAdd" v-slot="{ invalid }">
              <form @submit.prevent="submitCity()">
                <!-- {{errors.code}}
                {{errors.name_en}} -->

                <ValidationProvider name="Division" vid="division" rules="required" v-slot="{ errors }">
                  <v-autocomplete @input="onChangeDivision($event)" v-model="data.division_id" outlined :label="$t(
                    'container.system_config.demo_graphic.division.division'
                  )
                    " :items="divisions" :item-text="language == 'bn' ? 'name_bn' : 'name_en'" item-value="id" required
                    :error="errors[0] ? true : false" :error-messages="errors[0] ? (language === 'bn' ? 'অনুগ্রহ করে বিভাগ নির্বাচন করুন' : 'Please Select Division.') : ''"></v-autocomplete>
                </ValidationProvider>
                <ValidationProvider name="District" vid="district" rules="required" v-slot="{ errors }">
                  <v-autocomplete v-model="data.district_id" outlined :label="$t(
                    'container.system_config.demo_graphic.district.district'
                  )
                    " :items="districts" :item-text="language == 'bn' ? 'name_bn' : 'name_en'" item-value="id" required
                    :error="errors[0] ? true : false" :error-messages="errors[0] ? (language === 'bn' ? 'অনুগ্রহ করে জেলা নির্বাচন করুন' : 'Please Select Distrcit.') : ''"></v-autocomplete>
                </ValidationProvider>

                <ValidationProvider name="LocationType" vid="locationType" rules="required" v-slot="{ errors }">
                  <v-autocomplete v-model="data.location_type" outlined :label="$t('container.list.location_type')"
                    :items="locationType" :item-text="language == 'bn' ? 'value_bn' : 'value_en'" item-value="id" required
                    :error="errors[0] ? true : false" :error-messages="errors[0] ? (language === 'bn' ? 'অনুগ্রহ করে লোকেশন টাইপ নির্বাচন করুন' : 'Please Select Loction Type.') : ''"></v-autocomplete>
                </ValidationProvider>

                <ValidationProvider name="Code" vid="code" rules="required|codeRules" v-slot="{ errors }"
                  v-if="data.location_type != null">
                  <v-text-field outlined type="text" v-model="data.code" :label="codeLabel" required
                    :error="errors[0] ? true : false" :error-messages="errors[0] ? (language === 'bn' ? 'অনুগ্রহ করে সঠিক কোড লিখুন' : 'Please Enter Valid Geo Code.') : ''"></v-text-field>
                </ValidationProvider>
                <ValidationProvider name="Name English" vid="name_en" rules="required|checkName" v-slot="{ errors }"
                  v-if="data.location_type != null">
                  <v-text-field outlined type="text" v-model="data.name_en" :label="nameEnLabel" required
                    :error="errors[0] ? true : false" :error-messages="errors[0] ? (language === 'bn' ? 'অনুগ্রহ করে ইংরেজি নাম লিখুন' : 'Please Enter English Name.') : ''"></v-text-field>
                </ValidationProvider>
                <ValidationProvider name="Name Bangla" vid="name_bn" rules="required|checkNameBn" v-slot="{ errors }"
                  v-if="data.location_type != null">
                  <v-text-field outlined type="text" v-model="data.name_bn" :label="nameBnLabel" required
                    :error="errors[0] ? true : false" :error-messages="errors[0] ? (language === 'bn' ? 'অনুগ্রহ করে বাংলা নাম লিখুন' : 'Please Enter Bangla Name.') : ''"></v-text-field>
                </ValidationProvider>

                <v-row class="mx-0 my-0 py-2" justify="center">
                  <v-btn flat @click="dialogAdd = false" outlined class="custom-btn-width py-2 mr-10">
                    {{ $t("container.list.cancel") }}
                  </v-btn>
                  <v-btn type="submit" flat color="primary" :disabled="invalid" :loading="loading"
                    class="custom-btn-width primary white--text py-2">
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
            {{
              $t("container.system_config.demo_graphic.city_corporation.edit")
            }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="mt-7">
            <ValidationObserver ref="formEdit" v-slot="{ invalid }">
              <form @submit.prevent="updateCity()">
                <!-- {{errors.code}}
                {{errors.name_en}} -->

                <ValidationProvider name="Division" vid="division" rules="required" v-slot="{ errors }">
                  <v-autocomplete @input="onChangeDivision($event)" v-model="data.division_id" outlined :label="$t(
                    'container.system_config.demo_graphic.division.division'
                  )
                    " :items="divisions" :item-text="language == 'bn' ? 'name_bn' : 'name_en'" item-value="id" required
                    :error="errors[0] ? true : false" :error-messages="errors[0]" :readonly="false"></v-autocomplete>
                </ValidationProvider>
                <ValidationProvider name="District" vid="district" rules="required" v-slot="{ errors }">
                  <v-autocomplete @input="onChangeDistrict($event)" v-model="data.district_id" outlined :label="$t(
                    'container.system_config.demo_graphic.district.district'
                  )
                    " :items="districts" :item-text="language == 'bn' ? 'name_bn' : 'name_en'" item-value="id" required
                    :error="errors[0] ? true : false" :error-messages="errors[0]" :readonly="false"></v-autocomplete>
                </ValidationProvider>

                <ValidationProvider name="LocationType" vid="locationType" rules="required" v-slot="{ errors }">
                  <v-autocomplete v-model="data.location_type" outlined :label="$t('container.list.location_type')"
                    :items="locationType" :item-text="language == 'bn' ? 'value_bn' : 'value_en'" item-value="id" required
                    :error="errors[0] ? true : false" :error-messages="errors[0]" :readonly="false"></v-autocomplete>
                </ValidationProvider>

                <ValidationProvider name="Code" vid="code" rules="required|codeRules" v-slot="{ errors }"
                  v-if="data.location_type != null">
                  <v-text-field outlined type="text" v-model="data.code" :label="codeLabel" required
                    :error="errors[0] ? true : false" :error-messages="errors[0]"></v-text-field>
                </ValidationProvider>
                <ValidationProvider name="Name English" vid="name_en" rules="required|checkName" v-slot="{ errors }"
                  v-if="data.location_type != null">
                  <v-text-field outlined type="text" v-model="data.name_en" :label="nameEnLabel" required
                    :error="errors[0] ? true : false" :error-messages="errors[0]"></v-text-field>
                </ValidationProvider>
                <ValidationProvider name="Name Bangla" vid="name_bn" rules="required|checkNameBn" v-slot="{ errors }"
                  v-if="data.location_type != null">
                  <v-text-field outlined type="text" v-model="data.name_bn" :label="nameBnLabel" required
                    :error="errors[0] ? true : false" :error-messages="errors[0]"></v-text-field>
                </ValidationProvider>

                <v-row class="mx-0 my-0 py-2" justify="center">
                  <v-btn flat @click="dialogEdit = false" outlined class="custom-btn-width py-2 mr-10">
                    {{ $t("container.list.cancel") }}
                  </v-btn>
                  <v-btn type="submit" flat color="primary" :disabled="invalid" :loading="loading"
                    class="custom-btn-width primary white--text py-2">
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
            {{
              $t("container.system_config.demo_graphic.city_corporation.delete")
            }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <div class="subtitle-1 font-weight-medium mt-5">
              {{
                $t(
                  "container.system_config.demo_graphic.city_corporation.delete_alert"
                )
              }}
            </div>
          </v-card-text>
          <v-card-actions style="display: block">
            <v-row class="mx-0 my-0 py-2" justify="center">
              <v-btn text @click="deleteDialog = false" outlined class="custom-btn-width py-2 mr-10">
                {{ $t("container.list.cancel") }}
              </v-btn>
              <v-btn text @click="deleteCity()" color="white" :loading="delete_loading"
                class="custom-btn-width warning white--text py-2">
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
      total: null,
      isLoading: false,
      locationType: [],
      districts: [],
      Allupazila: [],
      isDisabled: true,
      dialogAdd: false,
      deleteDialog: false,
      dialogEdit: false,
      delete_loading: false,
      loading: false,
      search: "",
      delete_id: "",
      label: [
        {
          id: 1,
          code: this.$t(
            "container.system_config.demo_graphic.city_corporation.code"
          ),
          name_en: this.$t(
            "container.system_config.demo_graphic.city_corporation.name_en"
          ),
          name_bn: this.$t(
            "container.system_config.demo_graphic.city_corporation.name_bn"
          ),
        },
        {
          id: 2,
          code: this.$t("container.system_config.demo_graphic.thana.code"),
          name_en: this.$t(
            "container.system_config.demo_graphic.thana.name_en"
          ),
          name_bn: this.$t(
            "container.system_config.demo_graphic.thana.name_bn"
          ),
        },
      ],
      city: [],
      districts_search: [],
      location_type_search: null,
      division_id_search: null,
      district_id_search: null,
      errors: {},
      error_status: {},
      pagination: {
        current: 1,
        total: 0,
        perPage: 15,
      },
      sortBy: "name_en",
      sortDesc: false, //ASC
      items: [5, 10, 15, 20, 40, 50, 100],
    };
  },
  components: {
    Spinner,
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
          text: this.$t(
            "container.system_config.demo_graphic.city_corporation.custom_code"
          ),
          value: "code",
          width: "5%",
        },
        {
          text: this.$t(
            "container.system_config.demo_graphic.division.division"
          ),
          // value: "district.division.name_en",
          value: this.language === 'bn' ? "parent.parent.name_bn" : "parent.parent.name_en",
          // value: "parent.parent.name_en",
        },
        {
          text: this.$t(
            "container.system_config.demo_graphic.district.district"
          ),
          value: this.language === 'bn' ? "parent.name_bn" : "parent.name_en",
          // value: "parent.name_en",
        },
        {
          text: this.$t("container.list.location_type"),
          value: this.language === 'bn' ? "location_type.value_bn" : "location_type.value_en",
          // value: "location_type.value_en",
          sortable: false,
        },
        {
          text: this.$t(
            "container.system_config.demo_graphic.city_corporation.customtitleEn"
          ),
          value: this.language === 'bn' ? "name_bn" : "name_en",
          // value: "name_en",
          class: "highlight-column",
        },
        {
          text: this.$t(
            "container.system_config.demo_graphic.city_corporation.customtitleBn"
          ),
          value: this.language === 'bn' ? "name_bn" : "name_en",

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
    codeLabel() {
      // Use a computed property to dynamically determine the label
      if (this.data.location_type === 3) {
        const data = {};
        return this.$t(
          "container.system_config.demo_graphic.city_corporation.code"
        );
      }
      if (this.data.location_type === 1) {
        return this.$t(
          "container.system_config.demo_graphic.district_pourashava.code"
        );
      }
      if (this.data.location_type === 2) {
        return this.$t("container.system_config.demo_graphic.upazila.code");
      } else {
        return "Fallback Label"; // You can set a fallback label here
      }
    },
    nameEnLabel() {
      // Use a computed property to dynamically determine the label
      if (this.data.location_type === 3) {
        const data = {};
        return this.$t(
          "container.system_config.demo_graphic.city_corporation.name_en"
        );
      }
      if (this.data.location_type === 1) {
        return this.$t(
          "container.system_config.demo_graphic.district_pourashava.name_en"
        );
      }
      if (this.data.location_type === 2) {
        return this.$t("container.system_config.demo_graphic.upazila.name_en");
      } else {
        return "Fallback Label"; // You can set a fallback label here
      }
    },
    nameBnLabel() {
      // Use a computed property to dynamically determine the label
      if (this.data.location_type === 3) {
        const data = {};
        return this.$t(
          "container.system_config.demo_graphic.city_corporation.name_bn"
        );
      }
      if (this.data.location_type === 1) {
        return this.$t(
          "container.system_config.demo_graphic.district_pourashava.name_bn"
        );
      }
      if (this.data.location_type === 2) {
        return this.$t("container.system_config.demo_graphic.upazila.name_bn");
      } else {
        return "Fallback Label"; // You can set a fallback label here
      }
    },

    // filteredOptions() {
    //   // Apply your filter logic here, e.g., filtering out options with 'Option 2' label
    //   return this.locationType.filter(
    //     (option) => option.value_en !== "Upazila"
    //   );
    // },
  },
  methods: {

    async GeneratePdf() {
      this.isLoading = true;
      const queryParams = {
        language: this.$i18n.locale,
        searchText: this.search,
        location_type: this.location_type_search,
        division_id: this.division_id_search,
        district_id: this.district_id_search,
        perPage: this.search.trim() === '' ? this.total : this.total,
        page: 1,
        sortBy: this.sortBy,
        orderBy: this.sortDesc,
      };

      await this.$axios
        .get("/admin/city/get", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
          params: queryParams,
        })
        .then((result) => {
          this.Allupazila = result.data.data;
        })
        .catch((err) => {
          console.log(err, "error");

        });

      const HeaderInfo = [
        this.$t("container.list.sl"),
        this.$t("container.system_config.demo_graphic.division.division"),
        this.$t("container.system_config.demo_graphic.district.district"),
        this.$t("container.system_config.demo_graphic.upazila.code"),
        this.$t("container.system_config.demo_graphic.upazila.thana"),
      ]

      const OBJ = this.Allupazila;

      const CustomInfo = OBJ.map((((i, index) => {
        return [
          this.$i18n.locale == 'en' ? index + 1 : this.$helpers.englishToBangla(index + 1),
          this.$i18n.locale == 'en' ? i.parent.parent?.name_en : i.parent.parent?.name_bn,
          this.$i18n.locale == 'en' ? i.parent?.name_en : i.parent?.name_bn,
          this.$i18n.locale == 'en' ? i.code : this.$helpers.englishToBangla(i.code),
          this.$i18n.locale == 'en' ? i.name_en : i.name_bn,
        ]
      })));


      const queryParam = {
        language: this.$i18n.locale,
        data: CustomInfo,
        header: HeaderInfo,
        fileName: this.$t("container.system_config.demo_graphic.upazila.list"),
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

    async GenerateExcel() {
      this.isLoading = true;
      const queryParams = {
        language: this.$i18n.locale,
        searchText: this.search,
        location_type: this.location_type_search,
        division_id: this.division_id_search,
        district_id: this.district_id_search,
        perPage: this.search.trim() === '' ? this.total : this.total,
        page: 1,
        sortBy: this.sortBy,
        orderBy: this.sortDesc,
      };

      await this.$axios
        .get("/admin/city/get", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
          params: queryParams,
        })
        .then((result) => {
          this.Allupazila = result.data.data;
        })
        .catch((err) => {
          console.log(err, "error");

        });

      try {
        import('@/plugins/Export2Excel').then((excel) => {
          const OBJ = this.Allupazila;

          const CustomInfo = OBJ.map(((i, index) => {
            return {
              "sl": queryParams.language == 'en' ? index + 1 : this.$helpers.englishToBangla(index + 1),
              "division_name": queryParams.language == 'en' ? i.parent.parent?.name_en : i.parent.parent?.name_bn,
              "district_name": queryParams.language == 'en' ? i.parent?.name_en : i.parent?.name_bn,
              "code": queryParams.language == 'en' ? i.code : this.$helpers.englishToBangla(i.code),
              "thana_name": queryParams.language == 'en' ? i.name_en : i.name_bn,
            }
          }));

          const Header = [
            this.$t("container.list.sl"),
            this.$t("container.system_config.demo_graphic.division.division"),
            this.$t("container.system_config.demo_graphic.district.district"),
            this.$t("container.system_config.demo_graphic.upazila.code"),
            this.$t("container.system_config.demo_graphic.upazila.thana"),
          ]

          const Field = ['sl', 'division_name', 'district_name', 'code', 'thana_name']

          const Data = this.FormatJson(Field, CustomInfo)
          const currentDate = new Date().toISOString().slice(0, 10); //
          let dateinfo = queryParams.language == 'en' ? currentDate : this.$helpers.englishToBangla(currentDate)

          const filenameWithDate = `${dateinfo}_${this.$t("container.system_config.demo_graphic.upazila.list")}`;

          excel.export_json_to_excel({
            header: Header,
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

    FormatJson(FilterData, JsonData) {
      return JsonData.map((v) =>
        FilterData.map((j => {
          return v[j];
        })))
    },

    resetSearch() {
      this.location_type_search = null;
      this.division_id_search = null;
      this.district_id_search = null;
      this.GetCity();
    },
    registerCustomRules() {
      extend("codeRules", (value) => {
        const regex = /^\d{1,3}$/;

        return (
          regex.test(value.toString()) ||
          this.$t(
            "container.system_config.demo_graphic.city_corporation.code"
          ) + " can have maximum 3 digit"
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
        if (this.data.location_type == 2) {
          //Insert Upazila
          this.$store
            .dispatch("Thana/StoreUpazila", this.validator())
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
        } else {
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
        }
      } catch (e) {
        console.log(e);
      }
    },
    editDialog(item) {
      console.log(item, "editDialog");
      this.dialogEdit = true;
      this.data.code = item.code;
      // this.data.division_id = item.district.division.id;
      this.data.division_id = item.parent.parent.id; //Division
      this.onChangeDivision(this.data.division_id);
      this.data.district_id = item.parent.id;
      this.data.name_en = item.name_en;
      this.data.name_bn = item.name_bn;
      this.data.id = item.id;
      this.data.location_type = item.location_type.id;
      // this.data.location_type = item.locationType.id;
      this.errors = {};
      // alert(JSON.stringify(this.data));
    },
    updateCity() {
      if (!this.checkLanguage()) {
        return;
      }

      try {
        if (this.data.location_type == 2) {
          //update Upazila
          this.$store
            .dispatch("Thana/UpdateUpazila", this.validator())
            .then((data) => {
              console.log(data, "submit");
              if (data == null) {
                this.$toast.success("Data Updated Successfully");
                this.dialogEdit = false;
                this.resetForm();
                this.GetCity();
              } else {
                this.$refs.formEdit.setErrors(data.errors);
              }
            });
        } else {
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
        }
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
    setInitialHeader() {
      for (let i = 0; i < this.headers.length; i++) {
        if (this.headers[i].value == "name_en") {
          this.headers[i].class = "highlight-column";
          console.log(this.headers[i], "headers after");
        } else {
          this.headers[i].class = "";
        }
      }
    },
    handleOptionsUpdate({ sortBy, sortDesc }) {
      console.log(this.headers, sortBy, sortDesc);
      for (let i = 0; i < this.headers.length; i++) {
        console.log(this.headers[i]);

        if (this.headers[i].value == sortBy) {
          this.headers[i].class = "highlight-column";
          console.log(this.headers[i], "headers after");
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
      this.GetCity();

      const queryParams = {
        sortBy: this.sortBy,
        orderBy: this.sortDesc,
      };

      // alert(JSON.stringify(queryParams));
    },
    async GetCity() {
      this.search = this.search.replace(/%/g, '');
      let page;
      if (!this.sortBy) {
        page = this.pagination.current;
      }
      const queryParams = {
        searchText: this.search,
        location_type: this.location_type_search,
        division_id: this.division_id_search,
        district_id: this.district_id_search,
        perPage: this.pagination.perPage,
        page: this.pagination.current,
        sortBy: this.sortBy,
        orderBy: this.sortDesc,
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
          this.pagination.current = result.data.current_page;
          this.pagination.total = result.data.last_page;
          this.pagination.grand_total = result.data.total;
          this.total = result.data.total;
          console.log(queryParams, "params123");
          console.log(this.city, "city");
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
    async onChangeDivisionSearch(event) {
      await this.$axios
        .get(`/admin/district/get/${event}`, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          this.districts_search = result.data.data;
        });
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
          console.log(this.districts, "onChangeDivision");
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
              .then(() => { });
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
          this.$store.dispatch("District/SetDistrict", payload).then(() => { });
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
      const title = this.$t(
        "container.system_config.demo_graphic.city_corporation.customtitle"
      );
      this.$store.commit("setHeaderTitle", title);
    },
  },
  created() {
    this.registerCustomRules();
    // this.GetCity();
    // this.handleOptionsUpdate();
    this.getAllDivision();
    this.$store.dispatch("getLookupByType", 1).then((res) => {
      this.locationType = res;
    });

    // this.getAllDistrict();
    // this.sortBy = 'name_en';
  },
  watch: {
    "$i18n.locale": "updateHeaderTitle",
  },
  beforeMount() {
    console.log("V1");
    this.updateHeaderTitle();
  },
  mounted() {
    this.setInitialHeader();
  },
};
</script>
<style>
.highlight-column {
  background-color: #e0eaf1;
}

.no-arrow-icon .v-input__icon--clear {
  display: none;
}

.v-input__icon--append .v-icon {
  color: purple;
  font-weight: bold;
}

.no-arrow-icon .v-input__icon--append {
  font-weight: bold;
}
</style>

