<template>
    <div id="office_information">
        <v-row class="mx-5 mt-4">
            <v-col cols="12">
                <v-row>
                    <v-col cols="12">
                        <v-card elevation="10" color="white" rounded="md" theme="light" class="mb-8">
                            <v-card-title class="justify-center" tag="div">
                                <h3 class="text-uppercase pt-3">
                                    {{ $t("container.application_selection.variable.list") }}
                                </h3>
                            </v-card-title>
                            <v-card-text>
                                <v-row class="ma-0 pa-3 white round-border d-flex justify-space-between align-center"
                                    justify="center" justify-lg="space-between">
                                    <div class="d-flex justify-sm-end flex-wrap">
                                        <v-text-field @keyup.native="GetVariable" outlined dense v-model="search"
                                            prepend-inner-icon="mdi-magnify" class="my-sm-0 my-3 mx-0v -input--horizontal"
                                            flat variant="outlined" :label="$t('container.application_selection.variable.search')
                                                " hide-details color="primary">
                                        </v-text-field>
                                    </div>
                                    <v-btn @click="createDialog" flat color="primary"
                                        prepend-icon="mdi-account-multiple-plus">
                                        {{ $t("container.list.add_new") }}
                                    </v-btn>
                      
                                    <v-col cols="12">
                                       <v-data-table
                          :headers="headers"
                          :items="variables"
                          :search="search"
                          :options.sync="options"
                          :server-items-length="totalvariables"
                          :loading="loading"
                          :footer-props="{
                              'items-per-page-options': [5,10, 20, 30, 40, 50]
                          }"
                          dense
                          class="elevation-1 transparent row-pointer"
                      >

                    

                       <template v-slot:item.id="{ item, index }">
        <!-- {{ (currentPage - 1) * itemsPerPage + index + 1 }} -->
           {{

               language === 'bn' ? $helpers.englishToBangla(
                   (currentPage - 1) * itemsPerPage + index + 1) : (currentPage - 1) * itemsPerPage + index + 1


                                                      }}
    </template>

                        <template v-slot:[`item.actions`]="{ item }" style="padding: 10px;">
                          <v-tooltip top>
                            <template v-slot:activator="{ on }">
                              <v-btn
                             
                                  fab
                                
                                  x-small
                                  color="success"
                                  v-on="on"
                                   @click="editDialog(item)"
                              >
                              <v-icon>mdi-account-edit-outline</v-icon>
                              </v-btn>
                            </template>
                            <span>{{ $t('container.list.edit') }}</span>
                          </v-tooltip>

                     

                          <v-tooltip top>
                            <template v-slot:activator="{ on }">
                              <v-btn
                                  :disabled="item.default === 1"
                                  fab
                                  x-small
                                  color="grey"
                                  class="ml-3 white--text"
                                  v-on="on"
                                  @click="deleteAlert(item.id)"
                              >
                                <v-icon>mdi-delete</v-icon>
                              </v-btn>
                            </template>
                        <span>{{ $t('container.list.delete') }}</span>
                          </v-tooltip>
                        </template>
                      </v-data-table>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>

            <!-- Variable add modal  -->
            <v-dialog v-model="dialogAdd" width="650">
                <v-card style="justify-content: center; text-align: center">
                    <v-card-title class="font-weight-bold justify-center">
                        {{
                            $t(
                                "container.application_selection.variable.add_new"
                            )
                        }}
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text class="mt-7">
                        <ValidationObserver ref="formAdd" v-slot="{ invalid }">
                            <form @submit.prevent="submitVariable()">

                                <ValidationProvider name="Name in English" vid="name_en" rules="required" v-slot="{ errors }">
                                    <v-text-field outlined type="text" v-model="data.name_en" :label="$t(
                                        'container.application_selection.variable.name_en'
                                    )
                                        " required :error="errors[0] ? true : false"
                                        :error-messages="errors[0]"></v-text-field>
                                </ValidationProvider>
                                       <ValidationProvider name="Name in Bangla" vid="name_bn" rules="required" v-slot="{ errors }">
                                        <v-text-field outlined type="text" v-model="data.name_bn" :label="$t(
                                            'container.application_selection.variable.name_bn'
                                        )
                                            " required :error="errors[0] ? true : false"
                                            :error-messages="errors[0]"></v-text-field>
                                    </ValidationProvider>
                                <ValidationProvider name="Field Type" vid="field_type" rules="required" v-slot="{ errors }">
                                    <v-select outlined v-model="data.field_type" :items="field_types" :item-text="getItemText" item-value="id" :label="$t('container.application_selection.variable.field_type')" required :error="errors[0] ? true : false" :error-messages="errors[0]">
    </v-select>
                                </ValidationProvider>


                                <ValidationProvider name="Score" vid="score" v-slot="{ errors }" rules="required">
                                    <v-text-field v-if="data.field_type == 3" outlined type="text" v-model="data.score"
                                        :label="$t(
                                            'container.application_selection.poverty_cut_off.score'
                                        )
                                            " :error="errors[0] ? true : false"
                                        :error-messages="errors[0]"></v-text-field>
                                </ValidationProvider>

                                  <!-- <v-data-table :headers="header_field_value" :items="data.field_value"
                                        v-if="data.field_type == 1 || data.field_type == 2" hide-default-footer> -->
    <v-data-table
      :headers="header_field_value"
      :items="data.field_value"
      v-if="data.field_type == 1 || data.field_type == 2"
      :items-per-page="100" 
      hide-default-footer
      no-data-text=""
    > 
                                        <template v-slot:item.id="{ item, index }">
                                            {{ index + 1 }}
                                        </template>

                                        <template v-slot:item.value_en="{ item }">



                                            <ValidationProvider name="Subvariable Name in English" vid="value_en" rules="required" v-slot="{ errors }">
                                                <v-text-field outlined dense hide-details v-model="item.value_en"></v-text-field>
                                            </ValidationProvider>
                                                 </template>
                                                  <template v-slot:item.value_bn="{ item }">
                                                    <ValidationProvider name="Subvariable Name in Bangla" vid="value_bn" rules="required" v-slot="{ errors }">
                                                        <v-text-field outlined dense hide-details v-model="item.value_bn"></v-text-field>
                                                    </ValidationProvider>

                                                </template>
                                            
                                   
                                        <template v-slot:item.score="{ item }">
                                            <ValidationProvider name="Score" vid="score" rules="required" v-slot="{ errors }">
                                                <v-text-field outlined dense hide-details v-model="item.score"></v-text-field>
                                            </ValidationProvider>
                                        </template>

                                        <template v-slot:item.action="{ item }">
                                            <v-tooltip top>
                                                <template v-slot:activator="{ on }">
                                                    <v-btn fab dense x-small v-on="on" class="danger" elevation="0"
                                                        @click="removeRow(item.id)">
                                                        <v-icon style="color: red">mdi-trash-can-outline</v-icon>
                                                    </v-btn>
                                                </template>
                                                <span>
                                                    {{ $t("container.list.remove") }}
                                                </span>
                                            </v-tooltip>
                                        </template>
                                    </v-data-table>
                                <v-btn v-if="data.field_type == 1 || data.field_type == 2" fab color="primary" class="m-4"
                                    @click="addRow">
                                    <v-icon>mdi-plus</v-icon>
                                </v-btn>

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
            <!-- Variable add modal   -->

            <!-- Variable edit modal  -->
            <v-dialog v-model="dialogEdit" width="650">
                <v-card style="justify-content: center; text-align: center">
                    <v-card-title class="font-weight-bold justify-center">
                        {{
                            $t(
                                "container.application_selection.variable.edit"
                            )
                        }}
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text class="mt-7">
                        <ValidationObserver ref="formAdd" v-slot="{ invalid }">
                            <form @submit.prevent="updateVariable()">

                                <ValidationProvider name="Name in English" vid="name_en" rules="required" v-slot="{ errors }">
                                    <v-text-field outlined type="text" v-model="data.name_en" :label="$t(
                                        'container.application_selection.variable.name_en'
                                    )
                                        " required :error="errors[0] ? true : false"
                                        :error-messages="errors[0]"></v-text-field>
                                </ValidationProvider>
                                 <ValidationProvider name="Name in Bangla" vid="name_bn" rules="required" v-slot="{ errors }">
                                        <v-text-field outlined type="text" v-model="data.name_bn" :label="$t(
                                            'container.application_selection.variable.name_en'
                                        )
                                            " required :error="errors[0] ? true : false"
                                            :error-messages="errors[0]"></v-text-field>
                                    </ValidationProvider>
                                <ValidationProvider name="Field Type" vid="field_type" rules="required" v-slot="{ errors }">
                                     <v-select outlined v-model="data.field_type" :items="field_types" :item-text="getItemText" item-value="id" :label="$t('container.application_selection.variable.field_type')" required :error="errors[0] ? true : false" :error-messages="errors[0]">
        </v-select>
                                </ValidationProvider>


                                <ValidationProvider name="Score" vid="score" v-slot="{ errors }" rules="required">
                                    <v-text-field v-if="data.field_type == 3" outlined type="text" v-model="data.score"
                                        :label="$t(
                                            'container.application_selection.poverty_cut_off.score'
                                        )
                                            " :error="errors[0] ? true : false"
                                        :error-messages="errors[0]"></v-text-field>
                                </ValidationProvider>

                                <!-- <v-data-table :headers="header_field_value" :items="data.field_value"
                                    v-if="data.field_type == 1 || data.field_type == 2" hide-default-footer> -->
                                     <v-data-table
          :headers="header_field_value"
          :items="data.field_value"
          v-if="data.field_type == 1 || data.field_type == 2"
          :items-per-page="100" 
          hide-default-footer
          no-data-text=""
        > 
                                    <template v-slot:item.id="{ item, index }">
                                        {{ index + 1 }}
                                    </template>

                                    <template v-slot:item.value_en="{ item }">



                                        <ValidationProvider name="Value" vid="value" rules="required" v-slot="{ errors }">
                                            <v-text-field outlined dense hide-details v-model="item.value_en"></v-text-field>
                                        </ValidationProvider>
                                      
                                    </template>
                                    <template v-slot:item.value_bn="{ item }">
                                            <ValidationProvider name="Value" vid="value" rules="required" v-slot="{ errors }">
                                                    <v-text-field outlined dense hide-details v-model="item.value_bn"></v-text-field>
                                                </ValidationProvider>
                                    </template>
                                    <template v-slot:item.score="{ item }">
                                        <ValidationProvider name="Score" vid="score" rules="required" v-slot="{ errors }">
                                            <v-text-field outlined dense hide-details v-model="item.score"></v-text-field>
                                        </ValidationProvider>
                                    </template>

                                    <template v-slot:item.action="{ item }">
                                        <v-tooltip top>
                                            <template v-slot:activator="{ on }">
                                                <v-btn fab dense x-small v-on="on" class="danger" elevation="0"
                                                    @click="removeRow(item.id)">
                                                    <v-icon style="color: red">mdi-trash-can-outline</v-icon>
                                                </v-btn>
                                            </template>
                                            <span>
                                                {{ $t("container.list.remove") }}
                                            </span>
                                        </v-tooltip>
                                    </template>
                                </v-data-table>
                                <v-btn v-if="data.field_type == 1 || data.field_type == 2" fab color="primary" class="m-4"
                                    @click="addRow">
                                    <v-icon>mdi-plus</v-icon>
                                </v-btn>

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
            <!-- Variable edit modal   -->


            <!-- delete modal  -->
            <v-dialog v-model="deleteDialog" width="350">
                <v-card style="justify-content: center; text-align: center">
                    <v-card-title class="font-weight-bold justify-center">
                        {{
                            $t(
                                "container.application_selection.variable.delete"
                            )
                        }}
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                        <div class="subtitle-1 font-weight-medium mt-5">
                            {{
                                $t(
                                    "container.application_selection.variable.delete_alert"
                                )
                            }}
                        </div>
                    </v-card-text>
                    <v-card-actions style="display: block">
                        <v-row class="mx-0 my-0 py-2" justify="center">
                            <v-btn text @click="deleteDialog = false" outlined class="custom-btn-width py-2 mr-10">
                                {{ $t("container.list.cancel") }}
                            </v-btn>
                            <v-btn text @click="deleteField()" color="white" :loading="delete_loading"
                                class="custom-btn-width warning white--text py-2">
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
    title: "CTM - Variable",
    data() {
        return {
            data: {
                id: null,

                name_en: null,
                name_bn: null,

                score: null,
                // field_value: [],

                field_value: [
                    {
                        value_en: null,
                        value_bn: null,
                        score: null
                    },
                ],
                date: null,
                number: null,
                text: null,
                checkbox: null,
            },
            field_types: [

                { id: 1, value_en: "Single Choice Dropdown", value_bn: "সিঙ্গেল চয়েস ড্রপডাউন " },
                { id: 2, value_en: "Multiple Choice Dropdown",value_bn: "মাল্টিপল চয়েস ড্রপডাউন" },
                { id: 3, value_en: "Chechbox", value_bn: "চেকবক্স " },


            ],
          
          

            message: null,
         
         
            field_value: [
                { value: null },
                { score: null }
            ],
            dialogAdd: false,
            dialogEdit: false,
            deleteDialog: false,
            delete_loading: false,
            loading: false,
            errors: {},
            error_status: {},
            totalvariables: 0,
            variables: [],
            loading: true,
            options: {},
            search: '',
            page: 1,
            delete_id: "",
           
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
        header_field_value() {
            return [
                {
                    text: this.$t("container.list.sl"),
                    value: "id",
                    align: "start",
                    sortable: false,
                },
                {
                    text: this.$t(
                        "container.application_selection.sub_variable.name_en"
                    ),
                    value: "value_en",
                },
                   {
                    text: this.$t(
                        "container.application_selection.sub_variable.name_bn"
                    ),
                    value: "value_bn",
                },
                {
                    text: this.$t(
                        "container.application_selection.sub_variable.score"
                    ),
                    value: "score",
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
                    text: this.$t("container.application_selection.variable.name_en"),
                    value: "name_en",

                },
                   {
                    text: this.$t("container.application_selection.variable.name_bn"),
                    value: "name_bn",

                },


           

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
       
    },
    methods: {
         getItemText(item) {
            return this.language === 'bn' ? item.value_bn : item.value_en;
        },

        submitVariable() {
            if (this.data.field_type === 3) {
                this.data.field_type = 1;
                this.data.field_value = [];

            }


            this.$axios
                .post("admin/poverty/variable/insert", this.data, {
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
                        this.GetVariable();


                    } else {
                        this.$refs.formAdd.setErrors(result.data.errors);

                    }

                })
                .catch((err) => {


                });

        },

        updateVariable() {
            if (this.data.field_type === 3) {
                this.data.field_type = 1;
                this.data.field_value = [];

            }
console.log(this.data,"update_variable")

            this.$axios
                .post("admin/poverty/variable/update", this.data, {
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
                        this.GetVariable();


                    } else {
                        this.$refs.formAdd.setErrors(result.data.errors);

                    }

                })
                .catch((err) => {


                });

        },



        editDialog(item) {
            this.resetData();
            console.log(item, "item", this.data, "data")

            this.data.id = item.id;
            this.data.name_en = item.name_en;
            this.data.name_bn = item.name_bn;
            this.data.field_type = item.field_type;
            this.errors = {};
            this.data.field_value = item.children.map(child => {
                return {
                    value_en: child.name_en,
                    value_bn: child.name_bn,
                    score: child.score
                };
            });
            if (item.field_type == 1 && item.score != null) {
                this.data.field_type = 3;
            }

            this.dialogEdit = true;
        },

        // addRow() {



        //     if (!Array.isArray(this.data.field_value)) {
        //         this.$set(this.data, 'field_value', []);
        //     }

        //     // Create a new row with default values
        //     const newRow = {
        //         value: null,
        //         score: null
        //     };

        //     // Push the new row to the field_value array
        //     this.data.field_value.push(newRow);
        // },
        // addRow() {
        //     // Ensure that field_value is an array
        //     if (!Array.isArray(this.data.field_value)) {
        //         this.$set(this.data, 'field_value', []);
        //     }

        //     // Create a new row with default values
        //     const newRow = {
        //         value: null,
        //         score: null
        //     };

        //     // Push the new row to the field_value array
        //     this.data.field_value.push(newRow);
        // },
      
            // Ensure that field_value is an array
          addRow() {
                console.log('Entering addRow function');
                console.log('Before adding row:', this.data.field_value);

                // Ensure that field_value is an array
                if (!Array.isArray(this.data.field_value)) {
                    this.$set(this.data, 'field_value', []);
                }

                // Create a new row with default values
                const newRow = {
                    value_en: null,
                    value_bn: null,
                    score: null
                };
                console.log('New row:', newRow);

                // Push the new row to the field_value array
                this.data.field_value.push(newRow);
                console.log('After adding row:', this.data.field_value);
           
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
            this.resetData();
            this.dialogAdd = true;

        },






        deleteAlert(item) {
            console.log(item, "item ")
            this.deleteDialog = true;
            this.delete_id = item;
            console.log(this.delete_id, "this.delete_id ")

        },
        onPageChange($event) {
            // this.pagination.current = $event;
            this.GetVariable();
        },
        // setInitialHeader() {
        //     for (let i = 0; i < this.headers.length; i++) {
        //         if (this.headers[i].value == "name_en") {
        //             this.headers[i].class = "highlight-column";
        //             console.log(this.headers[i], "headers after");
        //         } else {
        //             this.headers[i].class = "";
        //         }
        //     }
        // },
        // handleOptionsUpdate({ sortBy, sortDesc }) {
        //     console.log(this.headers, sortBy, sortDesc);
        //     for (let i = 0; i < this.headers.length; i++) {
        //         console.log(this.headers[i]);

        //         if (this.headers[i].value == sortBy) {
        //             this.headers[i].class = "highlight-column";
        //             console.log(this.headers[i], "headers after");
        //         } else {
        //             this.headers[i].class = "";
        //         }
        //     }

        //     console.log(sortBy, sortDesc);
        //     this.sortBy = "name_en";
        //     this.sortDesc = "asc";
        //     if (sortBy.length === 0 || sortDesc.length === 0) {
        //         this.sortBy = "name_en";
        //         this.sortDesc = "asc";
        //     } else {
        //         this.sortBy = sortBy[0];
        //         this.sortDesc = sortDesc[0] == true ? "desc" : "asc";
        //     }
        //     this.GetOffices();

        //     const queryParams = {
        //         sortBy: this.sortBy,
        //         orderBy: this.sortDesc,
        //     };

        //     // alert(JSON.stringify(queryParams));
        // },
        // console.log(store.state.userData.location, ' -> userData')

        async GetVariable() {
           const { sortBy, sortDesc, page, itemsPerPage } = this.options

            this.$axios
                .get("/admin/poverty/get/variable", {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                    params: {
                        sortBy: sortBy[0],
                        sortDesc: sortDesc[0],
                        page: page,
                        itemsPerPage: itemsPerPage,
                        search: this.search
                    }
                })
                .then((result) => {
              
                   this.variables = result.data.data;
                    this.totalvariables = result.data.meta.total;
                   this.currentPage= result.data.meta.current_page;
                    this.itemsPerPage = result.data.meta.per_page;
                    this.loading = false;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        deleteField: async function () {
            // this.$axios
            //     .post("/admin/poverty/variable/destroy",this.delete_id, {
            //         headers: {
            //             Authorization: "Bearer " + this.$store.state.token,
            //             "Content-Type": "multipart/form-data",
            //         },

            //     })
            //     .then((res) => {
            //         // console.log(res);
            //         // check if the request was successful
            //         if (res?.data?.success) {
            //             this.$toast.error(res.data.message);
            //         } else {
            //             this.$toast.success(res.data.message);
            //         }
            //         this.deleteDialog = false;
            //         this.GetOffices();
            //     })
            //     .catch((error) => {
            //         console.log(error, "error");
            //         if (error.response?.data?.errors) {
            //             this.$refs.form.setErrors(error.response.data.errors);
            //         }
            //         console.log(error.response);
            //         this.$toast.error(error?.response?.data?.message);
            //     });
            this.$axios
                .post("/admin/poverty/variable/destroy", { delete_id: this.delete_id }, {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "application/json", // Use application/json instead of multipart/form-data
                    },
                })
                .then((res) => {
                    console.log(res.data,"res.data")
                       if (res?.data?.success == true) {
                        this.$toast.success(res.data.message);
                             this.deleteDialog = false;
                        this.GetVariable();
                    }
                    if (res?.data?.success == false) {
                        this.$toast.error(res.data.message);
                     } 
                    //  else {
                        // this.$toast.success(res.data.message);
                        //     this.deleteDialog = false;
                        // this.GetVariable();
                    // }
                  
                
                })
                .catch((error) => {
                    console.log(error, "error");
                   
                });
        },
        resetData() {

            this.data.name_en = null;
            this.data.name_bn = null;
            this.data.field_type = null;
            this.data.field_value = [

            ];
this.errors={}


        },

        updateHeaderTitle() {
            const title = this.$t("container.application_selection.variable.list");
            this.$store.commit("setHeaderTitle", title);
        },
    },
    mounted() {


        this.GetVariable();




    },
    watch: {
        "$i18n.locale": "updateHeaderTitle",
        options: {
            handler() {
                this.GetVariable()
            },
            deep: true,
        },

        search: {
            handler() {
                this.page = this.options.page;
                this.GetVariable()
            },
        },
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

