<template>
  <div id="thana">
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
                  {{ $t("container.system_config.demo_graphic.thana.list") }}
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
                      @keyup.native="GetUpazila"
                      outlined
                      dense
                      v-model="search"
                      prepend-inner-icon="mdi-magnify"
                      class="my-sm-0 my-3 mx-0v -input--horizontal"
                      flat
                      variant="outlined"
                      :label="
                        $t('container.system_config.demo_graphic.thana.search')
                      "
                      hide-details
                      color="primary"
                    >
                    </v-text-field>
                  </div>
                  <v-btn
                    @click="dialogOpen"
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
                      :items="upazilas"
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
                      <template v-slot:item.division="{ item }">
                        {{ item.district.division.name_en }}
                      </template>
                      <template v-slot:item.district="{ item }">
                        {{ item.district.name_en }}
                      </template>
                      <template v-slot:item.locationType="{ item }">
                        {{ item.locationType?.value_en }}
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
                              @click="editUpazila(item)"
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

      <!-- upazila add modal  -->
      <v-dialog v-model="dialogAdd" width="650">
        <v-card style="justify-content: center; text-align: center">
          <v-card-title class="font-weight-bold justify-center">
            {{ $t("container.system_config.demo_graphic.thana.add_new") }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="mt-7">
            <v-row> </v-row>

            <ValidationObserver ref="form" v-slot="{ invalid }">
              <form @submit.prevent="submitUpazila()">
                <v-row>
                  <v-col>
                    <ValidationProvider name="Code" vid="code" rules="required">
                      <v-text-field
                        outlined
                        type="text"
                        v-model="data.code"
                        :label="$t('container.list.code')"
                        required
                        :error="errors.code ? true : false"
                        :error-messages="errors.code"
                      ></v-text-field>
                      <!-- <div
                        v-if="thana_errors && thana_errors.code"
                        v-html="thana_errors.code[0]"
                        class="red--text"
                      /> -->
                    </ValidationProvider>
                    <ValidationProvider
                      v-if="isDistrictHidden"
                      name="District"
                      vid="district"
                      rules="required"
                    >
                      <v-autocomplete
                        @input="onChangeDistrict($event)"
                        outlined
                        v-model="data.district_id"
                        :label='$t("container.system_config.demo_graphic.district.district")' 
                        :items="districts"
                        item-text="name_en"
                        item-value="id"
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                      ></v-autocomplete>
                      <!-- <div
                        v-if="thana_errors && thana_errors.district_id"
                        v-html="thana_errors.district_id[0]"
                        class="red--text"
                      /> -->
                    </ValidationProvider>
                    <!-- <ValidationProvider name="Code" vid="code" rules="required" >
                      <v-text-field outlined type="text" v-model="data.code" label="Code" required
                        :error="errors[0] ? true : false" :error-messages="errors[0]"></v-text-field>
                      <div v-if="thana_errors && thana_errors.code" v-html="thana_errors.code[0]" class="red--text" />
                    </ValidationProvider> -->
                    <ValidationProvider
                      v-if="!isCityCorporationHidden"
                      name="City Corporation"
                      vid="city corporation"
                      rules="required"
                    >
                      <v-autocomplete
                        v-model="data.city_corporation_id"
                        outlined
                        :label="
                          $t('container.system_config.demo_graphic.city.city')
                        "
                        :items="city"
                        item-text="name_en"
                        item-value="id"
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                      ></v-autocomplete>
                      <div
                        v-if="thana_errors && thana_errors.thana_id"
                        v-html="thana_errors.thana_id[0]"
                        class="red--text"
                      />
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
                      <!-- <div
                        v-if="thana_errors && thana_errors.name_bn"
                        v-html="thana_errors.name_bn[0]"
                        class="red--text"
                      /> -->
                    </ValidationProvider>
                  </v-col>
                  <v-col>
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
                      <!-- <div
                        v-if="thana_errors && thana_errors.division_id"
                        v-html="thana_errors.division_id[0]"
                        class="red--text"
                      /> -->
                    </ValidationProvider>

                    <ValidationProvider
                      v-if="isLocationTypeHidden"
                      name="Location Type"
                      vid="division"
                      rules="required"
                    >
                      <v-autocomplete
                        @input="onChangeLocationType($event)"
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
                      <!-- <div
                        v-if="thana_errors && thana_errors.name_en"
                        v-html="thana_errors.name_en[0]"
                        class="red--text"
                      /> -->
                    </ValidationProvider>
                  </v-col>
                </v-row>

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
                    class="custom-btn-width black white--text py-2"
                  >
                    {{ $t("container.list.submit") }}
                  </v-btn>
                </v-row>
              </form>
            </ValidationObserver>
          </v-card-text>
        </v-card>
      </v-dialog>
      <!-- Upazila add modal  -->
      <!-- upazila Edit modal  -->
      <v-dialog v-model="dialogEdit" width="650">
        <v-card style="justify-content: center; text-align: center">
          <v-card-title class="font-weight-bold justify-center">
            {{ $t("container.system_config.demo_graphic.thana.edit") }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="mt-7">
            <v-row> </v-row>

            <ValidationObserver ref="form" v-slot="{ invalid }">
              <form @submit.prevent="updateUpazila()">
                <v-row>
                  <v-col>
                    <ValidationProvider name="Code" vid="code" rules="required">
                      <v-text-field
                        outlined
                        type="text"
                        v-model="data.code"
                        :label="$t('container.list.code')"
                        required
                        :error="errors.code ? true : false"
                        :error-messages="errors.code"
                        :readonly="true"
                      ></v-text-field>
                      <!-- <div
                        v-if="thana_errors && thana_errors.code"
                        v-html="thana_errors.code[0]"
                        class="red--text"
                      /> -->
                    </ValidationProvider>
                    <ValidationProvider
                      name="District"
                      vid="district"
                      rules="required"
                    >
                      <v-autocomplete
                        outlined
                        v-model="data.district_id"
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
                      <!-- <div
                        v-if="thana_errors && thana_errors.district_id"
                        v-html="thana_errors.district_id[0]"
                        class="red--text"
                      /> -->
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
                      <!-- <div
                        v-if="thana_errors && thana_errors.name_en"
                        v-html="thana_errors.name_en[0]"
                        class="red--text"
                      /> -->
                    </ValidationProvider>
                  </v-col>
                  <v-col>
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
                        :readonly="true"
                      ></v-autocomplete>
                      <div
                        v-if="thana_errors && thana_errors.division_id"
                        v-html="thana_errors.division_id[0]"
                        class="red--text"
                      />
                    </ValidationProvider>

                    <ValidationProvider
                      name="Location Type"
                      vid="division"
                      rules="required"
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
                      <!-- <div
                        v-if="thana_errors && thana_errors.thana_id"
                        v-html="thana_errors.thana_id[0]"
                        class="red--text"
                      /> -->
                    </ValidationProvider>
                    <!-- <ValidationProvider
                      name="City Corporation"
                      vid="city corporation"
                      rules="required"
                      
                    >
                      <v-autocomplete
                        v-model="data.cityCorporation"
                        outlined
                        label="City Corporation"
                        :items="city"
                        item-text="name_en"
                        item-value="id"
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                      ></v-autocomplete>
                      <div
                        v-if="thana_errors && thana_errors.thana_id"
                        v-html="thana_errors.thana_id[0]"
                        class="red--text"
                    </ValidationProvider> -->
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
                      <!-- <div
                        v-if="thana_errors && thana_errors.name_bn"
                        v-html="thana_errors.name_bn[0]"
                        class="red--text"
                      /> -->
                    </ValidationProvider>
                  </v-col>
                </v-row>

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
                    class="custom-btn-width black white--text py-2"
                  >
                    {{ $t("container.list.update") }}
                  </v-btn>
                </v-row>
              </form>
            </ValidationObserver>
          </v-card-text>
        </v-card>
      </v-dialog>
      <!-- Upazila Edit modal  -->

      <!-- delete modal  -->
      <v-dialog v-model="deleteDialog" width="350">
        <v-card style="justify-content: center; text-align: center">
          <v-card-title class="font-weight-bold justify-center">
            {{ $t("container.system_config.demo_graphic.thana.delete") }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <div class="subtitle-1 font-weight-medium mt-5">
              {{
                $t("container.system_config.demo_graphic.thana.delete_alert")
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
                @click="deleteUpazila()"
                color="white"
                :loading="delete_loading"
                class="custom-btn-width black white--text py-2"
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
import { mapState, mapActions } from "vuex";
import { extend, ValidationProvider, ValidationObserver } from "vee-validate";
import { required } from "vee-validate/dist/rules";

extend("required", required);
export default {
  name: "Index",
  title: "CTM - Thana/Upazila",
  data() {
    return {
      data: {
        id: null,
        name_en: null,
        name_bn: null,
        code: null,
        division_id: null,
        district_id: null,
        location_type: null,
        city_corporation_id: null,
      },
      isDistrictHidden: true,
      isLocationTypeHidden: true,
      isCityCorporationHidden: true,
      districts: [],
      city: null,
      locationType: [],
      dialogAdd: false,
      dialogEdit: false,
      deleteDialog: false,
      delete_loading: false,
      loading: false,
      errors: {},
      error_status: {},
      search: "",
      delete_id: "",
      upazilas: [],
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
          value: "division",
        },
        {
          text: this.$t(
            "container.system_config.demo_graphic.district.district"
          ),
          value: "district",
        },
        // { text: "Location Type", value: "locationType" },
        {
          text: this.$t("container.list.location_type"),
          value: "locationType",
        },
        { text: this.$t("container.system_config.demo_graphic.thana.name_en"), value: "name_en" },
        { text: this.$t("container.system_config.demo_graphic.thana.name_bn"), value: "name_bn" },
        {
          text: this.$t("container.list.action"),
          value: "actions",
          align: "center",
          sortable: false,
          width: "13%",
        },
      ];
    },

    ...mapState({
      divisions: (state) => state.Division.divisions,
    }),
    filteredOptions() {
      return this.locationType.filter(
        (option) => option.value_en !== "District Pouroshava"
      );
    },
  },

  methods: {
    async submitUpazila() {
      // alert(JSON.stringify(this.data));
      // return;
      try {
        let fd = new FormData();
        for (const [key, value] of Object.entries(this.data)) {
          if (value !== null) {
            fd.append(key, value);
          }
        }
        this.$store.dispatch("Thana/StoreUpazila", fd).then((data) => {
          console.log(data, "submit");
          if (data == null) {
            this.$toast.success("Data Inserted Successfully");
            this.dialogAdd = false;
            this.resetData();
            this.GetUpazila();
          } else {
            this.errors = data.errors;
          }
        });
      } catch (e) {
        console.log(e);
      }
    },
    async updateUpazila() {
      try {
        this.$store.dispatch("Thana/UpdateUpazila", this.data).then((data) => {
          console.log(data, "update");
          if (data == null) {
            this.$toast.success("Data Updated Successfully");
            this.dialogEdit = false;
            this.resetData();
            this.GetUpazila();
          } else {
            this.errors = data.errors;
          }
        });
      } catch (e) {
        console.log(e);
      }
    },
    dialogOpen() {
      if (this.$refs.form) {
        this.$refs.form.reset();
      }

      const update_error_value = null;
      this.updateError("update_error_value");
      this.resetData();
      this.dialogAdd = true;
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
    onChangeDistrict() {
      this.isLocationTypeHidden = true;
      if (this.data.location_type != null && this.data.district_id != null) {
        this.onChangeLocationType(this.data.location_type);
      }
    },
    async onChangeLocationType(event) {
      console.log(event);
      // alert("onChangeLocationType"+event);
      if (this.data.division_id == null) {
        alert("Select Division First");
        return;
      }
      if (this.data.district_id == null) {
        alert("Select District First");
        return;
      }

      if (event == 3) {
        this.isCityCorporationHidden = false;

        const queryParams = {
          district_id: this.data.district_id,
          location_type: event,
        };
        console.log(JSON.stringify(queryParams));
        // return;
        await this.$axios
          .get(`/admin/city/get/` + this.data.district_id + "/" + event, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((result) => {
            this.city = result.data.data;
            console.log(this.city);
          });
      } else {
        this.isCityCorporationHidden = true;
      }
    },
    ...mapActions({
      GetAllDivisions: "Division/GetAllDivisions",
      updateError: "Thana/updateError",
    }),
    deleteAlert(id) {
      this.deleteDialog = true;
      this.delete_id = id;
    },
    onPageChange($event) {
      // this.pagination.current = $event;
      this.GetUpazila();
    },
    async GetUpazila() {
      const queryParams = {
        searchText: this.search,
        perPage: this.pagination.perPage,
        page: this.pagination.current,
      };
      this.$axios
        .get("/admin/thana/get", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
          params: queryParams,
        })
        .then((result) => {
          this.upazilas = result.data.data;
          console.log(this.upazilas, "Get Upazillas");
          this.pagination.current = result.data.meta.current_page;
          this.pagination.total = result.data.meta.last_page;
          this.pagination.grand_total = result.data.meta.total;
        });
    },

    deleteUpazila: async function (id) {
      try {
        await this.$store
          .dispatch("Thana/DestroyUpazila", this.delete_id)
          .then((res) => {
            // check if the request was successful
            console.log(res, "result in vue");
            if (res?.data?.success) {
              this.$toast.success(res.data.message);
            } else {
              this.$toast.error(res.response.data.message);
            }
            this.deleteDialog = false;
            this.GetUpazila();
          });
      } catch (e) {
        console.log(e);
      }
    },
    resetData() {
      (this.data.name_en = null),
        (this.data.name_bn = null),
        (this.data.code = null),
        (this.data.division_id = null),
        (this.data.district_id = null),
        (this.data.location_type = null);
    },
    editUpazila(item) {
      if (this.$refs.form) {
        this.$refs.form.reset();
      }
      const update_error_value = null;
      this.updateError("update_error_value");
      console.log(item.district.division, "edit");
      this.dialogEdit = true;
      this.data.id = item.id;
      this.data.name_en = item.name_en;
      this.data.name_bn = item.name_bn;
      this.data.code = item.code;
      this.data.division_id = item.district.division.id;

      this.data.district_id = item.district.id;
      this.data.location_type = item.locationType.id;

      this.onChangeDivision(this.data.division_id);

      this.data.district_id = item.district.id;
      this.data.location_type = item.locationType.id;
      this.onChangeDivision(this.data.division_id);
    },
    updateHeaderTitle() {
      const title = this.$t("container.system_config.demo_graphic.thana.list");
      this.$store.commit("setHeaderTitle", title);
    },
  },
  watch: {
    '$i18n.locale': 'updateHeaderTitle',
  },
  
  mounted() {
   
    this.GetAllDivisions();
    this.GetUpazila();
    this.$store
      .dispatch("getLookupByType", 1)
      .then((res) => (this.locationType = res));
  },
  beforeMount() {
    this.updateHeaderTitle();
  },
};
</script>