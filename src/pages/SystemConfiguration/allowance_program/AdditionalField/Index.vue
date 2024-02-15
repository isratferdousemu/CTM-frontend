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
                  {{ $t("container.system_config.allowance_program_additiona_field.list") }}
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
                        $t('container.system_config.allowance_program_additiona_field.search')
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
                              @click="deleteAlert(item)"
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
                    name="Name Bangla"
                    vid="name_bn"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <v-text-field
                      outlined
                      type="text"
                      v-model="data.name_bn"
                      :label="$t(
                        'container.system_config.allowance_program_additiona_field.name_bn'
                      )
                        "
                      required
                      :error="errors[0] ? true : false"
                      :error-messages="errors[0]"
                    ></v-text-field>
                  </ValidationProvider>

                <ValidationProvider
                  name="Field Type"
                  vid="type"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <v-select
                    outlined
                    v-model="data.type"
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
                    class="custom-btn-width  white--text py-2"
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
                    name="Name English"
                    vid="name_bn"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <v-text-field
                      outlined
                      type="text"
                      v-model="data.name_bn"
                      :label="$t(
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
                 
                  v-slot="{ errors }"
                >
                  <v-select
                    outlined
                    v-model="data.type"
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
                 <ValidationProvider
                        name="Date"
                        vid="date"
                    
                        v-slot="{ errors }"
                      >
                        <v-text-field
                         v-if="data.type == 3"
                          outlined
                          type="date"
                          v-model="data.date"
                          :label="$t(
                            'container.system_config.allowance_program_additiona_field.date'
                          )
                            "
                          required
                          :error="errors[0] ? true : false"
                          :error-messages="errors[0]"
                        ></v-text-field>
                      </ValidationProvider>
                       <ValidationProvider
                        name="Number"
                        vid="number"
                       
                        v-slot="{ errors }"
                      >
                        <v-text-field
                         v-if="data.type == 4"
                          outlined
                          type="number"
                          v-model="data.number"
                          :label="$t(
                            'container.system_config.allowance_program_additiona_field.value'
                          )
                            "
                          required
                          :error="errors[0] ? true : false"
                          :error-messages="errors[0]"
                        ></v-text-field>
                      </ValidationProvider>
                       <ValidationProvider
                        name="Text"
                        vid="text"
                       
                        v-slot="{ errors }"
                      >
                        <v-text-field
                         v-if="data.type == 5"
                          outlined
                          type="text"
                          v-model="data.text"
                          :label="$t(
                            'container.system_config.allowance_program_additiona_field.value'
                          )
                            "
                          required
                          :error="errors[0] ? true : false"
                          :error-messages="errors[0]"
                        ></v-text-field>
                      </ValidationProvider>

              <v-data-table
    :headers="header_additional_field_value"
    :items="data.field_value"
    v-if="data.type == 2"
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
                <v-btn v-if="data.type == 2" fab color="primary" class="m-4" @click="addRow">
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
                @click="deleteField()"
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
  title: "CTM - Additional Field",
  data() {
    return {
      data: {
        id: null,
        code: null,
        name_en: null,
        name_bn: null,
        type:null,
        field_value: [],
        date:null,
        number: null,
        text: null,
        checkbox: null,
      },
      field_types: [
       
        { id: 2, value: "Dropdown" },
        { id: 3, value: "Date" },
        { id: 4, value: "Number" },
        { id: 5, value: "Text" },
      
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
          text: this.$t("container.system_config.allowance_program_additiona_field.name_en"),
          value: "name_en",
          class: "highlight-column ",
        },
        {
          text: this.$t("container.system_config.allowance_program_additiona_field.name_bn"),
          value: "name_bn",
        },
        {
          text: this.$t(
            "container.system_config.allowance_program_additiona_field.field_type"
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
    submitField(){
        if (this.data.type === 1) {
        this.data.field_value = [];
        this.data.number = null;
        this.data.text = null;
        this.data.date = null;

        this.data.type = "checkbox";
      }
      if (this.data.type == 2) {
        this.data.checkbox = null;
        this.data.number = null;
        this.data.text = null;
        this.data.date = null;
        this.data.type = "dropdown";


      }
      if (this.data.type == 3) {

        this.data.type = "date";
        this.data.field_value = [];
        this.data.number = null;
        this.data.text = null;
        this.data.checkbox = null;

      }
      if (this.data.type == 4) {
        this.data.type = "number";
        this.data.field_value = [];
        this.data.date = null;
        this.data.text = null;
        this.data.checkbox = null;

      }
      if (this.data.type == 5) {
        this.data.type = "number";
        this.data.field_value = [];
        this.data.date = null;
        this.data.number = null;
        this.data.checkbox = null;

        this.data.type = "text";
      }
      this.$axios
        .post("admin/allowance/allowance-additional-field/insert", this.data, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          this.loading = false;

          if (result.data.success == true) {
            this.$toast.success("Data Inserted Successfully");
            this.dialogAdd = false;
            this.resetData();
            this.GetOffices();


          } else {
            this.$refs.formAdd.setErrors(result.data.errors);
            //  this.$refs.formAdd.setErrors(data.errors);
          }

        })
        .catch((err) => {


        });

    },
   
    updateField() {
   
   if (this.data.type === 1) {
      this.data.field_value = [];
      this.data.number = null;
      this.data.text = null;
      this.data.date = null;

        this.data.type =  "checkbox";
      }
      if (this.data.type == 2) {
        this.data.checkbox = null;
        this.data.number = null;
        this.data.text = null;
        this.data.date = null;
        this.data.type = "dropdown" ;
     

      }
      if (this.data.type == 3 ) {

        this.data.type = "date";
        this.data.field_value=[];
        this.data.number = null;
        this.data.text = null;
        this.data.checkbox = null;
     
      }
      if (this.data.type == 4 ) {
        this.data.type = "number";
         this.data.field_value = [];
        this.data.date = null;
        this.data.text = null;
        this.data.checkbox = null;

      }
      if (this.data.type == 5) {
         this.data.type = "number";
        this.data.field_value = [];
        this.data.date = null;
        this.data.number = null;
        this.data.checkbox = null;

        this.data.type = "text";
      }
    
         console.log(this.data, "this.data")
      let fd = new FormData();
      for (const [key, value] of Object.entries(this.data)) {
       
        if (value !== null) {
          if (key == "field_value") {
         
            for (let i = 0; i < value.length; i++) {
              
              fd.append("field_value[" + i + "].value", value[i].value);
             
            }
          } else {
            fd.append(key, value);
         
          }
           console.log(key, value);
        }
      }
   
       this.$axios
        .post("admin/allowance/allowance-additional-field/update", fd, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          this.loading = false;
         
          if (result.data.success == true) {
            this.$toast.success("Data Updated Successfully");
            this.dialogEdit = false;
            this.resetData();
            this.GetOffices();
          

          } else {
            this.$refs.formEdit.setErrors(result.data.errors);
            //  this.$refs.formAdd.setErrors(data.errors);
          }

        })
        .catch((err) => {


        });
  
    },
    
    
    editDialog(item) {
    this.resetData();
      this.dialogEdit = true;
      this.data.id = item.id;
      this.data.name_en = item.name_en;
       this.data.name_bn = item.name_bn;
      if(item.type == "checkbox"){
      
         this.data.type= 1;
      }
       if (item.type == "dropdown") {
        this.data.type = 2;
        this.data.field_value = item?.additional_field_value;
      
         
      }
       if (item.type == "date") {
       
        this.data.type = 3;
        this.data.date = item?.additional_field_value[0].value;
       
      }
      if (item.type == "number") {
        this.data.type = 4;
        this.data.number = item?.additional_field_value[0].value;;
     
      }
       if (item.type == "text") {
        
        this.data.type = 5;
         this.data.text = item?.additional_field_value[0].value;;
      }
         if (item.type == "disabled" ) {

        this.data.type = 6;
      }
 
      
      
     
      this.data.id = item.id;
      this.errors = {};
    },
  
    addRow() {
      // Find the maximum id in the current array
      const maxId = Math.max(
        ...this.data.field_value.map((item) => item.id)
      );

      if (maxId !== 0) {
        // Add a new row with id = maxId + 1
        this.data.field_value.push({
          id: maxId + 1,
          value: "",
        });
      } else {
        maxId = maxId - 1;
      }
    },
   removeRow(id) {
      // Find the index of the row with the given id
      const index = this.data.field_value.findIndex((item) => item.id === id);

      // Check if there is more than one input before removing
      // if (index !== -1 && this.data.field_value.length > 1) {
        this.data.field_value.splice(index, 1);
      // } else {
        // Optionally, you can show a message or handle this case differently
                // this.$toast.success("Atleast One input Needed");
        
      // }
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

    
  
    deleteAlert(item) {
      console.log(item, "item ")
      this.deleteDialog = true;
       this.delete_id = item.id;
      console.log(this.delete_id,"this.delete_id ")
     
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
          this.pagination.current = result.data.current_page;
          this.pagination.total = result.data.last_page;
          this.pagination.grand_total = result.data.total;
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
    deleteField: async function () {
      this.$axios
        .delete(`/admin/allowance/field/destroy/${this.delete_id}`, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },

        })
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
  
      this.data.id = null;
      this.data.name_en = null;
      this.data.name_bn = null;
      this.data.type = null;
      this.data.field_value = [];
      this.data.date = null;
      this.data.number = null;
      this.data.text = null;
      this.data.checkbox = null;
       
    
    },

    updateHeaderTitle() {
      const title = this.$t("container.system_config.allowance_program_additiona_field.list");
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

