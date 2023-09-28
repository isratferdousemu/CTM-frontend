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
                <h3 class="text-uppercase pt-3">City List</h3>
              </v-card-title>
              <v-card-text>
                <v-row
                  class="ma-0 pa-3 white round-border d-flex justify-space-between align-center"
                  justify="center"
                  justify-lg="space-between"
                >
                  <div class="d-flex justify-sm-end flex-wrap">
                    <v-text-field
                      @keyup.native="GetCity"
                      outlined
                      dense
                      v-model="search"
                      prepend-inner-icon="mdi-magnify"
                      class="my-sm-0 my-3 mx-0v -input--horizontal"
                      flat
                      variant="outlined"
                      label="search City"
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
                    Add New City Corporation
                  </v-btn>
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
                      <template v-slot:item.actions="{ item }">
                        <v-btn
                          v-can="'update-post'"
                          fab
                          x-small
                          color="success"
                          elevation="0"
                          @click="editDialog(item)"
                        >
                          <v-icon> mdi-account-edit-outline </v-icon>
                        </v-btn>
                        <v-btn
                          v-can="'delete-city'"
                          fab
                          x-small
                          color="grey"
                          class="ml-3 white--text"
                          elevation="0"
                          @click="deleteAlert(item.id)"
                        >
                          <v-icon> mdi-delete </v-icon>
                        </v-btn>
                      </template>
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
            Add New City Corporation
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="mt-7">
            <ValidationObserver ref="form" v-slot="{ invalid }">
              <form @submit.prevent="submitCity()">
                <!-- {{errors.code}}
                {{errors.name_en}} -->

                <ValidationProvider name="Code" vid="code" rules="required">
                  <v-text-field
                    outlined
                    type="text"
                    v-model="data.code"
                    label="Code"
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
                    label="Division"
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
                  
                >
                  <v-autocomplete
                    v-model="data.district_id"
                    :disabled="isDisabled"
                    outlined
                    label="District"
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
                  
                >
                  <v-autocomplete
                    @input="onChangeLocationType($event)"
                    v-model="data.location_type"
                    outlined
                    label="LocationType"
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
                    label="Name English"
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
                    label="Name Bangla"
                    required
                    :error="errors.name_en ? true : false"
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
                    Cancel
                  </v-btn>
                  <v-btn
                    type="submit"
                    flat
                    color="primary"
                    :disabled="invalid"
                    :loading="loading"
                    class="custom-btn-width black white--text py-2"
                  >
                    Submit
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
            Edit City Corporation
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="mt-7">
            <ValidationObserver ref="form" v-slot="{ invalid }">
              <form @submit.prevent="updateCity()">
                <!-- {{errors.code}}
                {{errors.name_en}} -->

                <ValidationProvider name="Code" vid="code" rules="required">
                  <v-text-field
                    outlined
                    type="text"
                    v-model="data.code"
                    label="Code"
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
                    label="Division"
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
                  
                >
                  <v-autocomplete
                    @input="onChangeDistrict($event)"
                    v-model="data.district_id"
                    outlined
                    label="District"
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
                  
                >
                  <v-autocomplete
                    v-model="data.location_type"
                    outlined
                    label="LocationType"
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
                  name="Name English"
                  vid="name_en"
                  rules="required"
                >
                  <v-text-field
                    outlined
                    type="text"
                    v-model="data.name_en"
                    label="Name English"
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
                    label="Name Bangla"
                    required
                    :error="errors.name_en ? true : false"
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
                    Cancel
                  </v-btn>
                  <v-btn
                    type="submit"
                    flat
                    color="primary"
                    :disabled="invalid"
                    :loading="loading"
                    class="custom-btn-width black white--text py-2"
                  >
                    Submit
                  </v-btn>
                </v-row>
              </form>
            </ValidationObserver>
          </v-card-text>
        </v-card>
      </v-dialog>
      <!-- city Edit modal  -->

      <!-- delete modal  -->
      <v-dialog v-model="deleteDialog" width="350">
        <v-card style="justify-content: center; text-align: center">
          <v-card-title class="font-weight-bold justify-center">
            Delete City Corporation
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <div class="subtitle-1 font-weight-medium mt-5">
              Are you sure to delete this City Corporation? All information
              under this City Corporation will be deleted?
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
                Cancel
              </v-btn>
              <v-btn
                text
                @click="deleteCity()"
                color="white"
                :loading="delete_loading"
                class="custom-btn-width black white--text py-2"
              >
                Delete
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
import axios from "axios";

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
      locationType: {},
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
        perPage: 5,
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
        { text: "#Sl", value: "id", align: "start", sortable: false },
        { text: "Code", value: "code" },
        { text: "Division Name English", value: "district.division.name_en" },
        { text: "District Name English", value: "district.name_en" },
        { text: "Location Type", value: "locationType" },
        { text: "City Name English", value: "name_en" },
        { text: "City Name Bangla", value: "name_bn" },
        { text: "Actions", value: "actions", align: "center", sortable: false },
      ];
    },

    ...mapState({
      message: (state) => state.City.success_message,
      divisions: (state) => state.Division.divisions.data,
      districts: (state) => state.District.districts.data,
      city: (state) => state.City.city,
      errors: (state) => state.City.errors,
      error_status: (state) => state.City.error_status,
    }),
    filteredOptions() {
      // Apply your filter logic here, e.g., filtering out options with 'Option 2' label
      return this.locationType.filter((option) => option.keyword !== "Upazila");
    },
  },

  methods: {
    createDialog() {
      this.$store.commit("RESET_ERRORS");
      this.resetForm();
      this.dialogAdd = true;
    },
    submitCity() {
      console.log(JSON.stringify(this.data));
      // return;
      try {
        this.$store.dispatch("City/StoreCity", this.data).then((data) => {
          console.log(data, "submit");
          if (data == null) {
            this.$toast.success("Data Inserted Successfully");
            this.dialogAdd = false;
            this.resetForm();
            this.GetCity();
          } else {
            this.errors = data.errors;
          }
          // if (this.error_status == "") {
          //   this.$toast.success("Data Inserted Successfully");
          //   this.dialogAdd = false;
          //   this.resetForm();
          //   this.GetCity();
          // }
        });
      } catch (e) {
        console.log(e);
      }
    },
    editDialog(item) {
      // alert(JSON.stringify(item.district.id));
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
      // alert(JSON.stringify(this.data));
      try {
        this.$store.dispatch("City/UpdateCity", this.data).then((data) => {
          console.log(data, "update");
          if (data == null) {
            this.$toast.success("Data Updated Successfully");
            this.dialogEdit = false;
            this.resetForm();
            this.GetCity();
          } else {
            this.errors = data.errors;
          }
          // if (this.error_status == "") {
          //   this.$toast.success("Data Updated Successfully");
          //   this.dialogEdit = false;
          //   this.resetForm();
          //   this.GetCity();
          // }
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
        });
    },
    deleteCity: async function () {
      try {
        await this.$store
          .dispatch("City/DestroyCity", this.delete_id)
          .then(() => {
            console.log("success");
            this.$toast.error("Deleted Successfully");
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
      console.log(event);
      await axios
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
      return;

      this.getAllDistrict();

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
  },
  created() {
    this.GetCity();
    this.getAllDivision();
    this.$store.dispatch("getLookupByType", 1).then((res) => {
      this.locationType = res;
      console.log(this.locationType, " here");
    });
    // this.getAllDistrict();
  },
  beforeMount() {
    this.$store.commit("setHeaderTitle", "City List");
  },
};
</script>