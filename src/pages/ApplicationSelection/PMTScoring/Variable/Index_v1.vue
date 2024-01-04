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
                                        <v-text-field @keyup.native="GetOffices" outlined dense v-model="search"
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
                                        <v-data-table :loading="loading" item-key="id" :headers="headers"
                                            :items="variables" :items-per-page="pagination.perPage"
                                            hide-default-footer
                                            class="elevation-0 transparent row-pointer">
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

                                            <template v-slot:item.type="{ item }">
                                                <span v-if="item?.field_type == '1' && item?.score == null"> Single Choice Dropdown </span>
                                                 <span v-if="item?.field_type == '1' && item?.score != null"> Checkbox </span>
                                                <span v-if="item?.field_type == '2'"> Multiple Choice Dropdown </span>
                                                 
                                            </template>

                                            <!-- Action Button -->
                                            <template v-slot:item.actions="{ item }">
                                                <v-tooltip top>
                                                    <template v-slot:activator="{ on }">
                                                        <v-btn fab x-small v-on="on" color="success" elevation="0"
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
                                                        <v-btn v-can="'delete-division'" fab x-small v-on="on" color="grey"
                                                            class="ml-3 white--text" elevation="0"
                                                            @click="deleteAlert(item)">
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
                                                    <v-pagination circle primary v-model="pagination.current"
                                                        :length="pagination.total" @input="onPageChange" :total-visible="11"
                                                        class="custom-pagination-item"></v-pagination>
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
                               
                                   <ValidationProvider name="Name English" vid="name_en" rules="required" v-slot="{ errors }">
                                            <v-text-field outlined type="text" v-model="data.name_en" :label="$t(
                                                'container.application_selection.variable.name_en'
                                            )
                                                " required :error="errors[0] ? true : false" :error-messages="errors[0]"></v-text-field>
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
                                :label="$t('container.application_selection.variable.field_type')
                                    "
                                required
                                :error="errors[0] ? true : false"
                                :error-messages="errors[0]"
                              ></v-select>
                            </ValidationProvider>
                              
                           
                                         <ValidationProvider
                              name="Score"
                              vid="score"
                              v-slot="{ errors }"
                            >
                              <v-text-field
                              v-if="data.field_type == 3"
                                outlined
                                type="text"
                                v-model="data.score"
                                :label="$t(
                                    'container.application_selection.poverty_cut_off.score'
                                )
                                    "
                                :error="errors[0] ? true : false"
                                :error-messages="errors[0]"
                              ></v-text-field>
                            </ValidationProvider>

                                    <v-data-table :headers="header_field_value" :items="data.field_value"
                                        v-if="data.field_type == 1 || data.field_type == 2" hide-default-footer>
                                        <template v-slot:item.id="{ item, index }">
                                            {{ index + 1 }}
                                        </template>

                                        <template v-slot:item.value="{ item }">
                                            <v-text-field outlined dense hide-details v-model="item.value"></v-text-field>
                                        </template>
                                          <template v-slot:item.score="{ item }">
                                                <v-text-field outlined dense hide-details v-model="item.score"></v-text-field>
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
                                    <v-btn v-if="data.field_type == 1 || data.field_type == 2"  fab color="primary" class="m-4" @click="addRow">
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
    title: "CTM - Additional Field",
    data() {
        return {
            data: {
                id: null,
               
                name_en: null,
               
                score: null,
                // field_value: [],
             
                 field_value: [
                    {
                       value: null,
                       score: null
                    },
                ],
                date: null,
                number: null,
                text: null,
                checkbox: null,
            },
            field_types: [

                { id: 1, value: "Single Choice Dropdown" },
                { id: 2, value: "Multiple Choice Dropdown" },
                { id: 3, value: "Chechbox" },
              

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
            field_value: [
                  {  value: null },
                  {score:null}
            ],
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
                    value: "value",
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
                    text: this.$t(
                        "container.application_selection.variable.field_type"
                    ),
                    value: "type",
                   
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
        filteredOptions() {
            // Apply your filter logic here, e.g., filtering out options with 'Option 2' label
            return this.locationType.filter(
                (option) => option.value_en !== "District Pouroshava"
            );
        },
    },
    methods: {
        
        submitVariable() {
            if (this.data.field_type === 3) {
                this.data.field_type = 1;   
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

        updateField() {

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
                        this.GetVariable();


                    } else {
                        this.$refs.formAdd.setErrors(result.data.errors);
                        //  this.$refs.formAdd.setErrors(data.errors);
                    }
                       if (result?.data?.success) {
                       // this.$toast.error(res.data.message);
                        this.$toast.success("Data Updated Successfully");
                        this.dialogEdit = false;
                        this.resetData();
                        this.GetVariable();
                    } else {
                        this.$toast.success(res.data.message);
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
         
            if (item.type == "checkbox") {

                this.data.type = 1;
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
            if (item.type == "disabled") {

                this.data.type = 6;
            }




            this.data.id = item.id;
            this.errors = {};
        },

        addRow() {
            
            
                
             if (!Array.isArray(this.data.field_value)) {
                this.$set(this.data, 'field_value', []);
            }

            // Create a new row with default values
            const newRow = {
                value: null,
                score: null
            };

            // Push the new row to the field_value array
            this.data.field_value.push(newRow);
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
          
            this.dialogAdd = true;
        },

  
  



        deleteAlert(item) {
            console.log(item, "item ")
            this.deleteDialog = true;
            this.delete_id = item.id;
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
            const queryParams = {
                searchText: this.search,
                 perPage: this.pagination.perPage,
                page: this.pagination.current,
            };
         
            this.$axios
                .get("/admin/poverty/get/variable", {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                    params: queryParams,
                })
                .then((result) => {
                    // console.log(result, "additional_fields");
                    this.variables= result.data.data;
                  
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

    //   this.data.name_en=null;
    //   this.data.field_value =  [
    //             {
    //                 value: null,
    //                 score: null
    //             },
    //         ];
    //   this.data.name_en = null;


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

