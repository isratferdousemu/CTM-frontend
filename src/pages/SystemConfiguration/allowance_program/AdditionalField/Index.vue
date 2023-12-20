<template>
  <div id="office_information">
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
                  {{ $t("container.system_config.demo_graphic.office.list") }}
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
                      @keyup.native="GetOffices"
                      outlined
                      dense
                      v-model="search"
                      prepend-inner-icon="mdi-magnify"
                      class="my-sm-0 my-3 mx-0v -input--horizontal"
                      flat
                      variant="outlined"
                      :label="
                        $t('container.system_config.demo_graphic.office.search')
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
                      :items="additional_fields"
                      :items-per-page="pagination.perPage"
                      @update:options="handleOptionsUpdate"
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

                      <template v-slot:item.status="{ item }">
                        <span v-if="item?.status == '0'"> Inactive </span>
                        <span v-if="item?.status == '1'"> Active </span>
                      </template>

                      <!-- Action Button -->
                      <template v-slot:item.actions="{ item }">
                        <v-tooltip top>
                          <template v-slot:activator="{ on }">
                            <v-btn
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

      <!-- additional field add modal  -->
      <v-dialog v-model="dialogAdd" width="650">
        <v-card style="justify-content: center; text-align: center">
          <v-card-title class="font-weight-bold justify-center">
            {{
              $t(
                "container.system_config.allowance_program_additiona_field.add_new"
              )
            }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="mt-7">
            <ValidationObserver ref="formAdd" v-slot="{ invalid }">
              <form @submit.prevent="submitField()">
                <!-- {{errors.code}}
                {{errors.name_en}} -->

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
                        'container.system_config.allowance_program_additiona_field.name_en'
                      )
                    "
                    required
                    :error="errors[0] ? true : false"
                    :error-messages="errors[0]"
                  ></v-text-field>
                </ValidationProvider>

                <ValidationProvider
                  name="Field Type"
                  vid="field_type"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <v-select
                    outlined
                    v-model="data.field_type"
                    :items="field_types"
                    item-text="value"
                    item-value="id"
                    :label="
                      $t(
                        'container.system_config.allowance_program_additiona_field.field_type'
                      )
                    "
                    required
                    :error="errors[0] ? true : false"
                    :error-messages="errors[0]"
                  ></v-select>
                </ValidationProvider>

                <!-- <v-data-table
                  :headers="header_additional_field_value"
                  :items="selectedWardsDetails_UCDUpazila"
                  :search="search"
                >
                  <template v-slot:item.sl_ucd_upazila="{ item, index }">
                    {{ index + 1 }}
                  </template>

                  <template v-slot:item.someColumn="{ item }">
                    <v-text-field v-model="item.someProperty"></v-text-field>
                  </template>

                  <template v-slot:item.action_ucd_upazila="{ item }">
                    <v-tooltip top>
                      <template v-slot:activator="{ on }">
                        <v-btn
                          fab
                          x-small
                          v-on="on"
                          class="danger"
                          elevation="0"
                          @click="remove_ucd_upazila(item)"
                        >
                          <v-icon>mdi-trash-can-outline </v-icon>
                        </v-btn>
                      </template>
                      <span>
                        {{ $t("container.list.remove") }}
                      </span>
                    </v-tooltip>
                  </template>
                </v-data-table> -->

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
      <!-- additional field add modal  -->

      <!-- additional field edit  modal  -->
      <v-dialog v-model="dialogEdit" width="650">
        <v-card style="justify-content: center; text-align: center">
          <v-card-title class="font-weight-bold justify-center">
            {{
              $t(
                "container.system_config.allowance_program_additiona_field.edit"
              )
            }}       
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="mt-7">
            <ValidationObserver ref="formEdit" v-slot="{ invalid }">
              <form @submit.prevent="updateField()">
                <!-- {{errors.code}}
                {{errors.name_en}} -->
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
                        'container.system_config.allowance_program_additiona_field.name_en'
                      )
                    "
                    required
                    :error="errors[0] ? true : false"
                    :error-messages="errors[0]"
                  ></v-text-field>
                </ValidationProvider>

                <ValidationProvider
                  name="Field Type"
                  vid="field_type"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <v-select
                    outlined
                    v-model="data.field_type"
                    :items="field_types"
                    item-text="value"
                    item-value="id"
                    :label="
                      $t(
                        'container.system_config.allowance_program_additiona_field.field_type'
                      )
                    "
                    required
                    :error="errors[0] ? true : false"
                    :error-messages="errors[0]"
                  ></v-select>
                </ValidationProvider>

              <v-data-table
    :headers="header_additional_field_value"
    :items="field_value"
    v-if="data.field_type == 2"
    hide-default-footer
  >
    <template v-slot:item.id="{ item, index }">
      {{ index + 1 }}
    </template>

    <template v-slot:item.value="{ item }">
      <v-text-field
        outlined
        dense
        hide-details
        v-model="item.value"
      ></v-text-field>
    </template>

    <template v-slot:item.action="{ item }">
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-btn
            fab
            dense
            x-small
            v-on="on"
            class="danger"
            elevation="0"
            @click="removeRow(item.id)"
          >
            <v-icon style="color: red">mdi-trash-can-outline</v-icon>
          </v-btn>
        </template>
        <span>
          {{ $t("container.list.remove") }}
        </span>
      </v-tooltip>
    </template>
  </v-data-table>
                <v-btn v-if="data.field_type == 2" fab color="primary" class="m-4" @click="addRow">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>

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
            {{
              $t(
                "container.system_config.allowance_program_additiona_field.delete"
              )
            }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <div class="subtitle-1 font-weight-medium mt-5">
              {{
                $t(
                  "container.system_config.allowance_program_additiona_field.delete_alert"
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
                @click="deleteVariable()"
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
import { mapState, mapActions } from "vuex";
import { extend, ValidationProvider, ValidationObserver } from "vee-validate";
import { required } from "vee-validate/dist/rules";

extend("required", required);

export default {
  name: "Index",
  title: "CTM - Office",
  data() {
    return {
      data: {
        id: null,
        code: null,
        name_en: null,
        field_value: [],
      },
      field_types: [
        { id: 1, value: "Checkbox" },
        { id: 2, value: "Dropdown" },
        { id: 3, value: "Date" },
        { id: 4, value: "Number" },
        { id: 5, value: "Text" },
        { id: 6, value: "Disabled" },
      ],
      additional_field_value: [],
      
      
      additional_fields: [],
      // office_type_id: null,
      //extra work for city
      // Selected wards
      edit: [],
     
      message: null,
      districts: [],
      cities: [],
      additional_fields: [],
      field_value: [],
      dialogAdd: false,
      dialogEdit: false,
      deleteDialog: false,
      delete_loading: false,
      loading: false,
      errors: {},
      error_status: {},
      search: "",
      delete_id: "",
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
    ValidationProvider,
    ValidationObserver,
  },
  computed: {
    header_additional_field_value() {
      return [
        {
          text: this.$t("container.list.sl"),
          value: "id",
          align: "start",
          sortable: false,
        },
        {
          text: this.$t(
            "container.system_config.allowance_program_additiona_field_value.list"
          ),
          value: "value",
        },
        {
          text: this.$t("container.list.action"),
          value: "action",
          align: "center",
          sortable: false,
          width: "13%",
        },
      ];
    },
    headers() {
      return [
        {
          text: this.$t("container.list.sl"),
          value: "id",
          align: "start",
          sortable: false,
        },
        {
          text: this.$t("container.system_config.demo_graphic.office.name_en"),
          value: "name_en",
          class: "highlight-column ",
        },
        {
          text: this.$t("container.system_config.demo_graphic.office.name_bn"),
          value: "name_bn",
        },
        {
          text: this.$t(
            "container.system_config.demo_graphic.office.office_type"
          ),
          value: "type",
          sortable: false,
        },
        // {
        //   text: this.$t(
        //     "container.system_config.demo_graphic.office.office_address"
        //   ),
        //   value: "office_address",
        //   sortable: false,
        // },
        // {
        //   text: this.$t("container.system_config.demo_graphic.office.status"),
        //   value: "status",
        //   sortable: false,
        // },
        {
          text: this.$t("container.list.action"),
          value: "actions",
          align: "center",
          sortable: false,
          width: "13%",
        },
      ];
    },
    headersWard() {
      return [
        {
          text: this.$t("container.list.sl"),
          value: "sl",
          align: "start",
          sortable: false,
        },

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
        {
          text: this.$t("container.system_config.demo_graphic.ward.city"),
          value: "city",
          sortable: false,
        },
        {
          text: this.$t("container.system_config.demo_graphic.ward.thana"),
          value: "thana",
          sortable: false,
        },
        {
          text: this.$t("container.system_config.demo_graphic.ward.ward"),
          value: "ward",
          sortable: false,
        },
        {
          text: this.$t("container.list.action"),
          value: "action",

          sortable: false,
        },
      ];
    },
    headersWard_edit() {
      return [
        {
          text: this.$t("container.list.sl"),
          value: "sl_edit",
          align: "start",
          sortable: false,
        },

        {
          text: this.$t(
            "container.system_config.demo_graphic.division.division"
          ),
          value: "parent.parent.parent.parent.parent.name_en",
        },
        {
          text: this.$t(
            "container.system_config.demo_graphic.district.district"
          ),
          value: "parent.parent.parent.parent.name_en",
        },
        {
          text: this.$t("container.system_config.demo_graphic.ward.city"),
          value: "parent.parent.parent.name_en",
          sortable: false,
        },
        {
          text: this.$t("container.system_config.demo_graphic.ward.thana"),
          value: "parent.parent.name_en",
          sortable: false,
        },
        {
          text: this.$t("container.system_config.demo_graphic.ward.ward"),
          value: "parent.name_en",
          sortable: false,
        },
        {
          text: this.$t("container.list.action"),
          value: "action_edit",

          sortable: false,
        },
      ];
    },
    headersWard_ucd_upazila() {
      return [
        {
          text: this.$t("container.list.sl"),
          value: "sl_ucd_upazila",
          align: "start",
          sortable: false,
        },

        {
          text: this.$t(
            "container.system_config.demo_graphic.division.division"
          ),
          value: "division_ucd_upazila",
        },
        {
          text: this.$t(
            "container.system_config.demo_graphic.district.district"
          ),
          value: "district_ucd_upazila",
        },
        {
          text: this.$t("container.system_config.demo_graphic.ward.upazila"),
          value: "upazila",
          sortable: false,
        },
        {
          text: this.$t("container.system_config.demo_graphic.ward.union"),
          value: "union",
          sortable: false,
        },
        {
          text: this.$t("container.system_config.demo_graphic.ward.pouro"),
          value: "pouro",
          sortable: false,
        },

        {
          text: this.$t("container.system_config.demo_graphic.ward.ward"),
          value: "ward_ucd_upazila",
          sortable: false,
        },
        {
          text: this.$t("container.list.action"),
          value: "action_ucd_upazila",

          sortable: false,
        },
      ];
    },

    ...mapState({
      divisions: (state) => state.Division.divisions,
    }),
    filteredOptions() {
      // Apply your filter logic here, e.g., filtering out options with 'Option 2' label
      return this.locationType.filter(
        (option) => option.value_en !== "District Pouroshava"
      );
    },
  },
  methods: {
    async onChangePouro($event) {
      console.log(this.data.pouro_id, "called pouro_id properly");

      await this.$axios
        .get(`/admin/ward/get/pouro/${$event}`, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          this.selectedWards_UCDUpazila_edit = this.selectedWards_UCDUpazila;
          this.final_wards_ucd_upazila = result.data.data;
          console.log(this.final_wards_ucd_upazila, "only pouro wards");
          this.wards_ucd_upazila = this.wards_ucd_upazila.concat(
            result.data.data
          );
          console.log(this.wards_ucd_upazila, "poro cancat wards in pouro");
        });
    },
    async onChangePouro_1($event) {
      console.log(this.data.pouro_id, "called pouro_id properly");

      await this.$axios
        .get(`/admin/ward/get/pouro/${$event}`, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          this.final_wards_ucd_upazila = result.data.data;
          console.log(this.final_wards_ucd_upazila, "only pouro wards");
          this.wards_ucd_upazila = this.wards_ucd_upazila.concat(
            result.data.data
          );
          console.log(this.wards_ucd_upazila, "poro cancat wards in pouro");
          //    if (this.data.pouro_id) {
          //   this.selectedWards_UCDUpazila = selectedWards_UCDUpazila_edit
          // }
          // else {
          //   this.selectedWards_UCDUpazila = []
          // }
        });
    },
    async onChangeUnion($event) {
      console.log($event);
      await this.$axios
        .get(`/admin/ward/get/${$event}`, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          this.selectedWards_UCDUpazila_edit = this.selectedWards_UCDUpazila;
          this.final_wards_ucd_upazila = result.data.data;
          console.log(this.final_wards_ucd_upazila, "only union wards");
          this.wards_ucd_upazila = this.wards_ucd_upazila.concat(
            result.data.data
          );
          console.log(this.wards_ucd_upazila, "cancat wards union");
          //  if(this.data.union_id){
          //  this.selectedWards_UCDUpazila= selectedWards_UCDUpazila_edit
          //  }
          //  else{
          //  this.selectedWards_UCDUpazila=[]
          //  }
        });
    },
    async onChangeUnion_1($event) {
      console.log($event);
      await this.$axios
        .get(`/admin/ward/get/${$event}`, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          this.final_wards_ucd_upazila = result.data.data;
          console.log(this.final_wards_ucd_upazila, "only union wards");
          this.wards_ucd_upazila = this.wards_ucd_upazila.concat(
            result.data.data
          );
          console.log(this.wards_ucd_upazila, "cancat wards union");
          //  if(this.data.union_id){
          //  this.selectedWards_UCDUpazila= selectedWards_UCDUpazila_edit
          //  }
          //  else{
          //  this.selectedWards_UCDUpazila=[]
          //  }
        });
    },
    async onChangeSubLocationType(event) {
      // alert(event);

      if (event == 1) {
        await this.$axios
          .get(`/admin/union/pouro/get/${this.data.upazila_id}`, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((result) => {
            this.pouros = result.data.data;
            this.data.pouro_id = null;
            this.data.union_id = null;
            this.pouros_all = result.data.data;
            console.log(this.pouros_all, "all pouros_all called properly");

            this.final_wards_ucd_upazila = [];
          });
      }
      if (event == 2) {
        await this.$axios
          .get(`/admin/union/get/${this.data.upazila_id}`, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((result) => {
            this.unions = result.data.data;
            this.data.union_id = null;
            this.data.pouro_id = null;
            this.unions_all = result.data.data;
            console.log(this.unions_all, "all unions called properly");

            this.final_wards_ucd_upazila = [];
          });
      }
    },

    remove(item) {
      const indexToRemove = this.selectedWards.findIndex(
        (wardId) => wardId === item.ward_id
      );

      // If the item is found, remove it from the selectedWards array
      if (indexToRemove !== -1) {
        this.selectedWards.splice(indexToRemove, 1);
        console.log(this.selectedWards, "in Remove");
      }

      this.onChangeWards(this.selectedWards);
    },
    remove_ucd_upazila(item) {
      const indexToRemove = this.selectedWards_UCDUpazila.findIndex(
        (wardId) => wardId === item.ward_id_ucd_upazila
      );

      // If the item is found, remove it from the selectedWards array
      if (indexToRemove !== -1) {
        this.selectedWards_UCDUpazila.splice(indexToRemove, 1);
      }

      this.onChangeWards_UCDUpazila(this.selectedWards_UCDUpazila);
    },
    onChangeWards(selectedWards) {
      console.log(this.selectedWards, "selectedWards Check in wards");
      if (this.selectedWards.length > 0) {
        this.selectedWards_UCDUpazila = [];
        // Update selectedWardsDetails based on the selectedWards
        this.selectedWardsDetails = selectedWards.map((wardId) => {
          const ward = this.wards.find((w) => w.id === wardId);
          const district = this.districts.find(
            (d) => d.id === this.data.district_id
          );
          const division = this.divisions.find(
            (div) => div.id === this.data.division_id
          );
          const city = this.cities.find((c) => c.id === this.data.city_id);
          console.log(this.wards, "all wards");
          console.log(ward, "const ward in ward");
          const thana = this.thanas.find((t) => t.id === ward.parent.id);

          return {
            division: division.name_en,
            district: district.name_en,
            city: city.name_en,
            thana: thana.name_en,
            ward: ward.name_en,
            ward_id: ward.id,
          };
        });
        console.log(this.selectedWardsDetails, "selected ward");
      }
    },
    onChangeWards_edit(selectedWards_edit) {
      console.log(this.selectedWards_edit, "selectedWards Check in wards");
      if (this.selectedWards_edit.length > 0) {
        this.selectedWards_UCDUpazila = [];
        // Update selectedWardsDetails based on the selectedWards
        this.selectedWardsDetails = selectedWards_edit.map((wardId) => {
          const ward = this.wards.find((w) => w.id === wardId);
          const district = this.districts.find(
            (d) => d.id === this.data.district_id
          );
          const division = this.divisions.find(
            (div) => div.id === this.data.division_id
          );
          const city = this.cities.find((c) => c.id === this.data.city_id);
          console.log(this.wards, "all wards");
          console.log(ward, "const ward in ward");
          const thana = this.thanas.find((t) => t.id === ward.parent.id);

          return {
            division: division.name_en,
            district: district.name_en,
            city: city.name_en,
            thana: thana.name_en,
            ward: ward.name_en,
            ward_id: ward.id,
          };
        });
        console.log(this.selectedWardsDetails, "selected ward");
        this.selectedWards = this.selectedWards_edit;
      }
    },
    updateField() {
      console.log("called")
            console.log(this.field_value,'v')
            
       let fd = new FormData();
      for (const [key, value] of Object.entries(this.data)) {
        if (key === "status" && value === null) {
          fd.append(key, "0");
        }
        if (value !== null) {
          // fd.append(key, value);
          // console.log(key, value,"fd values");
          if (key == "item.value") {
                console.log(key, value, "field_value")
            for (let i = 0; i < value.length; i++) {
              fd.append("field_value[" + i + "]", value[i]);
                 console.log(fd, "fd")
                 console.log(key, value, "if")
              
            }
          } else {
            fd.append(key, value);
            console.log(key, value, "else")
          }
        }
     
      }
  
    },
    onChangeWards_UCDUpazila_edit(selectedWards_UCDUpazila_edit) {
      // Update selectedWardsDetails based on the selectedWards
      this.selectedWards = [];
      console.log(this.selectedWards_UCDUpazila, "selectedWards_UCDUpazila");
      console.log(this.wards_ucd_upazila, "all wards");

      this.selectedWardsDetails_UCDUpazila = selectedWards_UCDUpazila_edit.map(
        (wardId) => {
          const ward_ucd_upazila_const = this.wards_ucd_upazila.find(
            (w) => w.id === wardId
          );
          const district_ucd_upazila = this.districts.find(
            (d) => d.id === this.data.district_id
          );
          const division_ucd_upazila = this.divisions.find(
            (div) => div.id === this.data.division_id
          );
          const upazila = this.upazilas.find(
            (c) => c.id === this.data.upazila_id
          );
          const pouro = this.pouros_all?.find(
            (t) => t.id === ward_ucd_upazila_const?.parent?.id
          );
          const union = this.unions_all?.find(
            (u) => u.id === ward_ucd_upazila_const?.parent?.id
          );

          console.log(ward_ucd_upazila_const, "ward_ucd_upazila_const");

          return {
            division_ucd_upazila: division_ucd_upazila.name_en,
            district_ucd_upazila: district_ucd_upazila.name_en,
            upazila: upazila.name_en,
            union: union?.name_en,
            pouro: pouro?.name_en,
            ward_ucd_upazila: ward_ucd_upazila_const?.name_en,
            ward_id_ucd_upazila: ward_ucd_upazila_const?.id,
          };
        }
      );

      this.selectedWards_UCDUpazila = this.selectedWards_UCDUpazila_edit;
    },
    onChangeWards_UCDUpazila(selectedWards_UCDUpazila) {
      // Update selectedWardsDetails based on the selectedWards
      this.selectedWards = [];
      console.log(this.selectedWards_UCDUpazila, "selectedWards_UCDUpazila");
      console.log(this.wards_ucd_upazila, "all wards");

      this.selectedWardsDetails_UCDUpazila = selectedWards_UCDUpazila.map(
        (wardId) => {
          const ward_ucd_upazila_const = this.wards_ucd_upazila.find(
            (w) => w.id === wardId
          );
          const district_ucd_upazila = this.districts.find(
            (d) => d.id === this.data.district_id
          );
          const division_ucd_upazila = this.divisions.find(
            (div) => div.id === this.data.division_id
          );
          const upazila = this.upazilas.find(
            (c) => c.id === this.data.upazila_id
          );
          const pouro = this.pouros_all?.find(
            (t) => t.id === ward_ucd_upazila_const?.parent?.id
          );
          const union = this.unions_all?.find(
            (u) => u.id === ward_ucd_upazila_const?.parent?.id
          );

          console.log(ward_ucd_upazila_const, "ward_ucd_upazila_const");

          return {
            division_ucd_upazila: division_ucd_upazila.name_en,
            district_ucd_upazila: district_ucd_upazila.name_en,
            upazila: upazila.name_en,
            union: union?.name_en,
            pouro: pouro?.name_en,
            ward_ucd_upazila: ward_ucd_upazila_const?.name_en,
            ward_id_ucd_upazila: ward_ucd_upazila_const?.id,
          };
        }
      );
    },
    submitOffice() {
      if (this.selectedWards && this.selectedWards.length > 0) {
        this.data.selectedWards = this.selectedWards;
      }
      if (
        this.selectedWards_UCDUpazila &&
        this.selectedWards_UCDUpazila.length > 0
      ) {
        this.data.selectedWards = this.selectedWards_UCDUpazila;
      }

      let fd = new FormData();
      for (const [key, value] of Object.entries(this.data)) {
        if (key === "status" && value === null) {
          fd.append(key, "0");
        }
        if (value !== null) {
          // fd.append(key, value);
          // console.log(key, value,"fd values");
          if (key == "selectedWards") {
            for (let i = 0; i < value.length; i++) {
              fd.append("selectedWards[" + i + "]", value[i]);
            }
          } else {
            fd.append(key, value);
          }
        }
      }

      // for (const [key, value] of fd.entries()) {
      //   console.log(`${key}: ${value}`);
      // }

      try {
        this.$store.dispatch("Office/StoreOffice", fd).then((data) => {
          // console.log(data, "submit");
          if (data == null) {
            this.$toast.success("Data Inserted Successfully");
            this.dialogAdd = false;
            this.resetData();
            this.GetOffices();
          } else {
            this.$refs.formAdd.setErrors(data.errors);
            // this.errors = data.errors;
          }
        });
      } catch (e) {
        console.log(e);
      }
    },
    async updateOffice() {
      console.log(this.message, "this.message 1st start");

      console.log(this.selectedWards_edit, "this.selectedWards_edit");
      console.log(this.selectedWards, "this.selectedWards");

      if (
        this.data.office_type === 35 &&
        this.selectedWards_edit &&
        this.selectedWards_edit.length > 0
      ) {
        this.data.selectedWards = this.selectedWards_edit;
        console.log(this.selectedWards, "this.selectedWards city if");
      } else if (
        this.data.office_type === 35 &&
        this.selectedWards_edit &&
        this.selectedWards_edit.length === 0
      ) {
        this.data.selectedWards = this.selectedWards;
        console.log(this.selectedWards, "this.selectedWards city else");
      }
      //console.log(this.data.selectedWards, "this.data.selectedWards")
      if (
        this.data.office_type === 10 &&
        this.selectedWards_UCDUpazila_edit &&
        this.selectedWards_UCDUpazila_edit.length > 0
      ) {
        this.data.selectedWards = this.selectedWards_UCDUpazila_edit;
        console.log(this.selectedWards, "this.selectedWards upazila if");
      } else if (
        this.data.office_type === 10 &&
        this.selectedWards_UCDUpazila_edit &&
        this.selectedWards_UCDUpazila_edit.length === 0
      ) {
        this.data.selectedWards = this.selectedWards_UCDUpazila;
        console.log(this.selectedWards, "this.selectedWards upazila else");
      }

      if (
        (this.data.selectedWards.length === 0 &&
          this.data.office_type === 10) ||
        (this.data.selectedWards.length === 0 && this.data.office_type === 35)
      ) {
        this.message = "wards need to add under this Office type";
        console.log(this.message, "this.message not null");
      } else {
        this.message = null;
        console.log(this.message, "this.message  null");
      }

      if (this.message === null) {
        console.log(this.message, "this.message  null");
        let fd = new FormData();
        for (const [key, value] of Object.entries(this.data)) {
          if (key === "status" && value === null) {
            fd.append(key, "0");
          }
          if (value !== null) {
            if (key == "selectedWards") {
              for (let i = 0; i < value.length; i++) {
                fd.append("selectedWards[" + i + "]", value[i]);
              }
            } else {
              fd.append(key, value);
            }
          }
        }
        try {
          this.$store.dispatch("Office/UpdateOffice", fd).then((data) => {
            console.log(data, "update");
            if (data == null) {
              this.$toast.success("Data Updated Successfully");
              this.dialogEdit = false;
              this.resetData();
              this.GetOffices();
            } else {
              this.$refs.formEdit.setErrors(data.errors);
            }
          });
        } catch (e) {
          console.log(e);
        }
      }
      console.log(this.data.selectedWards, " this.data.selectedWards final");
    },
    editDialog(item) {
      console.log(item, "edit Dialog");
      this.dialogEdit = true;
      this.data.name_en = item.name_en;
      if(item.type == "checkbox"){
      
         this.data.field_type= 1;
      }
       if (item.type == "dropdown") {
        this.data.field_type = 2;
         
      }
       if (item.type == "date") {
       
        this.data.field_type = 3;
      }
      if (item.type == "number") {
        this.data.field_type = 4;
     
      }
       if (item.type == "disabled") {
        
        this.data.field_type = 1;
      }
 
      
      this.field_value = item?.additional_field_value;
      console.log(this.field_value,"field_value");
      this.data.id = item.id;
      this.errors = {};
    },
  
    addRow() {
      // Find the maximum id in the current array
      const maxId = Math.max(
        ...this.field_value.map((item) => item.id)
      );

      if (maxId != 0) {
        // Add a new row with id = maxId + 1
        this.field_value.push({
          id: maxId + 1,
          value: "",
        });
      } else {
        maxId = maxId - 1;
      }
    },
   removeRow(id) {
      // Find the index of the row with the given id
      const index = this.field_value.findIndex((item) => item.id === id);

      // Check if there is more than one input before removing
      if (index !== -1 && this.field_value.length > 1) {
        this.field_value.splice(index, 1);
      } else {
        // Optionally, you can show a message or handle this case differently
                this.$toast.success("Atleast One input Needed");
        
      }
    },
    createDialog() {
      if (this.$refs.formAdd) {
        this.$refs.formAdd.reset();
      }
      this.resetForm();
      this.dialogAdd = true;
    },

    dialogOpen() {
      if (this.$refs.formAdd) {
        this.$refs.formAdd.reset();
      }

      const update_error_value = null;
      this.updateError("update_error_value");
      this.resetData();
      this.dialogAdd = true;
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

    async GetAllUpazila(id) {
      console.log(id, "GetAllUpazila");
      try {
        this.$store
          .dispatch("Thana/GetAllUpazilaByDistrict", id)
          .then((data) => {
            console.log(data, "GetAllUpazilaByDistrict");
            this.upazilas = data;
          });
      } catch (e) {
        console.log(e);
      }
    },

    async onChangeOfficeType($event) {
      if ($event === 35) {
        this.location_type = 3;
      }
      if ($event === 8 || $event === 10) {
        this.location_type = 2;
      }
      if ($event === 9) {
        this.location_type = 1;
      }

      if (this.data.district_id != null && this.location_type != null) {
        if (this.location_type === 2) {
          await this.$axios
            .get(`/admin/thana/get/${this.data.district_id}`, {
              headers: {
                Authorization: "Bearer " + this.$store.state.token,
                "Content-Type": "multipart/form-data",
              },
            })
            .then((result) => {
              this.upazilas = result.data.data;
              this.cities = [];

              this.dist_pouros = [];
            });
        }
        if (this.location_type === 3) {
          this.$axios
            .get(
              "/admin/city/get/" +
                this.data.district_id +
                "/" +
                this.location_type,
              {
                headers: {
                  Authorization: "Bearer " + this.$store.state.token,
                  "Content-Type": "multipart/form-data",
                },
              }
            )
            .then((result) => {
              this.cities = result.data.data;
              console.log(this.cities, "cities called properly");

              this.dist_pouros = [];
              this.upazilas = [];
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        }
        if (this.location_type === 1) {
          await this.$axios
            .get(
              "/admin/city/get/" +
                this.data.district_id +
                "/" +
                this.location_type,
              {
                headers: {
                  Authorization: "Bearer " + this.$store.state.token,
                  "Content-Type": "multipart/form-data",
                },
              }
            )
            .then((result) => {
              this.dist_pouros = result.data.data;
              this.cities = [];
              this.upazilas = [];
            });
        }
      }
    },
    async onChangeCity($event) {
      await this.$axios
        .get(`/admin/thana/get/city/${$event}`, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          this.final_thanas = result.data.data;
          this.thanas = this.thanas.concat(result.data.data);
          console.log(this.thanas, "city is called properly all thana show");
        });
    },
    async onChangeThana($event) {
      await this.$axios
        .get(`/admin/ward/get/thana/${$event}`, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          this.selectedWards_edit = this.selectedWards;
          console.log(this.wards, "faka array check");
          this.final_wards = result.data.data;
          console.log(this.final_wards, "final_wards thanaedit wards");
          this.wards = this.wards.concat(result.data.data);

          console.log(this.wards, " wards thanaedit wards");
        });
    },
    async onChangeThana_1($event) {
      await this.$axios
        .get(`/admin/ward/get/thana/${$event}`, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          console.log(this.wards, "faka array check");
          this.final_wards = result.data.data;
          console.log(this.final_wards, "final_wards thanaedit wards");
          this.wards = this.wards.concat(result.data.data);

          console.log(this.wards, " wards thanaedit wards");
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

          console.log(this.districts, " district function called properly");
        });
    },
    async onChangeDistrict($event) {
      this.onChangeOfficeType(this.data.office_type);

      //juned vai
      // event = 3; //Lookup.id = 3 , Look.name_en = 'City Corporation'
      // const payload = {
      //   district_id: this.data.district_id,
      //   lookup_id: "3",
      // };
      // console.log(JSON.stringify(payload));
      // // return;
      // if (
      //   this.office_type_id == 8 ||
      //   this.office_type_id == 10 ||
      //   this.office_type_id == 11
      // ) {
      //   console.log("load Upazila");
      //   this.GetAllUpazila(this.data.district_id);
      // } else {
      //   console.log("load City Corporation");
      //   await this.$axios
      //     .get(`/admin/city/get/` + this.data.district_id + "/" + event, {
      //       headers: {
      //         Authorization: "Bearer " + this.$store.state.token,
      //         "Content-Type": "multipart/form-data",
      //       },
      //     })
      //     .then((result) => {
      //       this.city = result.data.data;
      //       console.log(this.city, "onChangeDistrict");
      //     });
      // }
    },
    async onChangeDivisionChange(event) {
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
    // //done till now
    async onChangeSubLocationTypeChange(event) {
      // alert(event);

      if (event == 1) {
        await this.$axios
          .get(`/admin/union/pouro/get/${this.thana_id_search}`, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((result) => {
            this.pouros_search = result.data.data;
          });
        this.union_id_search = null;
      }
      if (event == 2) {
        this.onChangeUpazilaChange(this.thana_id_search);
        this.pouro_id_search = null;
      }
    },
    ...mapActions({
      GetAllDivisions: "Division/GetAllDivisions",
      updateError: "Office/updateError",
    }),
    deleteAlert(id) {
      this.deleteDialog = true;
      this.delete_id = id;
    },
    onPageChange($event) {
      // this.pagination.current = $event;
      this.GetOffices();
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

      console.log(sortBy, sortDesc);
      this.sortBy = "name_en";
      this.sortDesc = "asc";
      if (sortBy.length === 0 || sortDesc.length === 0) {
        this.sortBy = "name_en";
        this.sortDesc = "asc";
      } else {
        this.sortBy = sortBy[0];
        this.sortDesc = sortDesc[0] == true ? "desc" : "asc";
      }
      this.GetOffices();

      const queryParams = {
        sortBy: this.sortBy,
        orderBy: this.sortDesc,
      };

      // alert(JSON.stringify(queryParams));
    },
    // console.log(store.state.userData.location, ' -> userData')

    async GetOffices() {
      const queryParams = {
        searchText: this.search,
        perPage: this.pagination.perPage,
        page: this.pagination.current,
        sortBy: this.sortBy,
        sortDesc: this.sortDesc,
        user_id: this.$store.state.userData.id,
      };
      console.log(queryParams);
      console.log(this.$store.state.token, "token");
      this.$axios
        .get("/admin/allowance/get_additional_field", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
          params: queryParams,
        })
        .then((result) => {
          // console.log(result, "additional_fields");
          this.additional_fields = result.data.data;
          console.log(this.additional_fields, "get additional_fields");
          this.pagination.current = result.data.meta.current_page;
          this.pagination.total = result.data.meta.last_page;
          this.pagination.grand_total = result.data.meta.total;
        })
        .catch((err) => {
          console.log(err, "error");
          if (err.response?.data?.errors) {
            this.$refs.form.setErrors(err.response.data.errors);
          }
          console.log(err.response);
          this.$toast.error(err?.response?.data?.message);
        });
    },
    deleteOffice: async function () {
      await this.$store
        .dispatch("Office/DestroyOffice", this.delete_id)
        .then((res) => {
          // console.log(res);
          // check if the request was successful
          if (res?.data?.success) {
            this.$toast.error(res.data.message);
          } else {
            this.$toast.success(res.data.message);
          }
          this.deleteDialog = false;
          this.GetOffices();
        })
        .catch((error) => {
          console.log(error, "error");
          if (error.response?.data?.errors) {
            this.$refs.form.setErrors(error.response.data.errors);
          }
          console.log(error.response);
          this.$toast.error(error?.response?.data?.message);
        });
    },
    resetData() {
      this.message = null;
      this.dialogEdit = null;
      this.data.id = null;
      this.data.office_type = null;
      this.office_type_id = null;
      this.data.name_en = null;
      this.data.name_bn = null;
      this.data.office_address = null;
      this.data.comment = null;
      this.data.status = null;
      this.data.division_id = null;
      this.data.district_id = null;
      this.data.city_id = null;
      this.data.dist_pouro_id = null;
      this.data.upazila_id = null;
      this.data.union_id = null;
      this.data.pouro_id = null;
      this.data.dist_pouro_id = null;
      this.data.thana_id = null;
      this.data.selectedWards = [];
      this.data.selectedWards_UCDUpazila = [];
      this.divisions = [];
      this.districts = [];
      this.cities = [];
      this.final_wards = [];
      this.final_thanas = [];
      this.selectedWards = [];
      this.selectedWards_edit = [];
      this.selectedWards_UCDUpazila = [];
      this.selectedWards_UCDUpazila_edit = [];
      this.selectedWardsDetails_UCDUpazila = [];
      this.final_wards_ucd_upazila = [];
      this.wards_ucd_upazila = [];
      this.dist_pouros = [];
      this.unions_all = [];
      this.pouros_all = [];
    },

    updateHeaderTitle() {
      const title = this.$t("container.system_config.demo_graphic.office.list");
      this.$store.commit("setHeaderTitle", title);
    },
  },
  mounted() {
    this.setInitialHeader();
    this.$store.dispatch("getLookupByType", 3).then((data) => {
      this.officeType = data;
      console.log(this.officeType, "Office");
    });
    // this.GetOffices();
    this.GetAllDivisions();
    // this.GetLocationType();
    this.GetAllUpazila();
    // this.GetCityCorporation();
    // this.$store
    //   .dispatch("getLookupByType", 1)
    //   .then((res) => (this.locationType = res));
  },
  watch: {
    "$i18n.locale": "updateHeaderTitle",
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

