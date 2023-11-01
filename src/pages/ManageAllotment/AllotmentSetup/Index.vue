<template>
    <div id="alloment_setup">
        <v-row class="mx-5 mt-4">
            <v-col cols="12">
                <v-row>
                    <v-col cols="12">
                        <v-card elevation="10" color="white" rounded="md" theme="light" class="mb-8">
                            <v-card-title class="justify-center" tag="div">
                                <h3 class="text-uppercase pt-3">
                                    {{ $t("container.manage_allotment.allotment_setup_list") }}
                                </h3>
                            </v-card-title>
                            <v-card-text>
                                <v-row class="ma-0 pa-3 white round-border d-flex justify-space-between align-center"
                                    justify="center" justify-lg="space-between">
                                    <div class="d-flex justify-sm-end flex-wrap">
                                        <v-text-field @keyup.native="GetAllotmentSetup" outlined dense v-model="search"
                                            prepend-inner-icon="mdi-magnify" class="my-sm-0 my-3 mx-0v -input--horizontal"
                                            flat variant="outlined" :label="$t(
                                                'container.list.search'
                                            )
                                                " hide-details color="primary">
                                        </v-text-field>
                                    </div>
                                    <!-- <v-btn @click="createDialog" flat color="primary"
                                        prepend-icon="mdi-account-multiple-plus">
                                        {{ $t("container.list.add_new") }}
                                    </v-btn> -->
                                    <v-col cols="12">
                                        <v-data-table :loading="loading" item-key="id" :headers="headers" :items="allotment_setups"
                                            :items-per-page="pagination.perPage" hide-default-footer
                                            class="elevation-0 transparent row-pointer">
                                            <template v-slot:item.id="{ item, index }">
                                                {{
                                                    (pagination.current - 1) * pagination.perPage +
                                                    index +
                                                    1
                                                }}
                                            </template>
                                            <template v-slot:item.area_type="{ item }">
                                                {{ item.area_type.value_en }}
                                            </template>
                                            <template v-slot:item.value="{ item }">
                                                {{ item.value }}
                                            </template>

                                            <!-- Action Button -->
                                            <template v-slot:item.actions="{ item }"  >
                                                <v-tooltip top>
                                                    <template v-slot:activator="{ on }"  v-if="item.default !== 1">
                                                        <v-btn v-can="'update-post'" fab x-small v-on="on" color="success"
                                                            elevation="0" @click="editDialog(item)">
                                                            <v-icon> mdi-account-edit-outline </v-icon>
                                                        </v-btn>
                                                    </template>
                                                    <span>
                                                        {{ $t("container.list.edit") }}
                                                    </span>
                                                </v-tooltip>

                                                <!-- <v-tooltip top>
                                                    <template v-slot:activator="{ on }"  v-if="item.default !== 1">
                                                        <v-btn v-can="'delete-division'" fab x-small v-on="on" color="grey"
                                                            class="ml-3 white--text" elevation="0"
                                                            @click="deleteAlert(item.id)">
                                                            <v-icon> mdi-delete </v-icon>
                                                        </v-btn>
                                                    </template>
                                                    <span> {{ $t("container.list.delete") }}</span>
                                                </v-tooltip> -->
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

            <!-- Allotment Setup add modal  -->
            <v-dialog v-model="dialogAdd" width="650">
                <v-card style="justify-content: center; text-align: center">
                    <v-card-title class="font-weight-bold justify-center">
                        {{ $t("container.manage_allotment.add_new_setup") }}
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text class="mt-7">
                        <ValidationObserver ref="formAdd" v-slot="{ invalid }">
                            <form @submit.prevent="submitAllotmentSetup()">

                                <v-row>

                                    <v-col lg="6" md="6" cols="12">
                                        <ValidationProvider v-slot="{ errors }" name="Area type" vid="area_type" rules="required">

                                            <v-autocomplete outlined clearable v-model="data.area_type"
                                                :items="locationTypes"  @input="onChangeAreaType($event)" item-text="value_en" item-value="id"
                                                :label="$t('container.manage_allotment.area_type')"
                                                :error="errors[0] ? true : false" :error-messages="errors[0]">

                                            </v-autocomplete>
                                        </ValidationProvider>
                                    </v-col>
                                        <v-col lg="6" md="6" cols="12">
                                            <ValidationProvider v-slot="{ errors }" name="Allotment Area" vid="allotment_area" rules="required">

                                                <v-autocomplete outlined clearable v-model="data.value"
                                                    :items="allotmentAreas" 
                                                    :label="$t('container.manage_allotment.allotment_area')"
                                                    :error="errors[0] ? true : false" :error-messages="errors[0]">

                                                </v-autocomplete>
                                            </ValidationProvider>
                                        </v-col>
                               
                                    

                                </v-row>




                                <v-row class="mx-0 my-0 py-2" justify="center">
                                    <v-btn flat @click="dialogAdd = false" outlined class="custom-btn-width py-2 mr-10">
                                        {{ $t("container.list.cancel") }}
                                    </v-btn>
                                    <v-btn type="submit" flat color="primary" :disabled="invalid" :loading="loading"
                                        class="custom-btn-width warning white--text py-2">
                                        {{ $t("container.list.submit") }}
                                    </v-btn>
                                </v-row>
                            </form>
                        </ValidationObserver>
                      
                    </v-card-text>
                </v-card>
            </v-dialog>
            <!-- Allotment SetUp add modal  -->

            <!-- Allotment SetUp Edit modal  -->
           <v-dialog v-model="dialogEdit" width="650">
                    <v-card style="justify-content: center; text-align: center">
                        <v-card-title class="font-weight-bold justify-center">
                            {{ $t("container.manage_allotment.add_new_setup") }}
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-card-text class="mt-7">
                            <ValidationObserver ref="formAdd" v-slot="{ invalid }">
                                <form @submit.prevent="UpdateAllotmentSetup()">

                                    <v-row>

                                        <v-col lg="6" md="6" cols="12">
                                            <ValidationProvider v-slot="{ errors }" name="Area type" vid="area_type" rules="required">

                                                <v-autocomplete  readonly outlined  v-model="data.area_type"
                                                    :items="locationTypes"  @input="onChangeAreaType($event)" item-text="value_en" item-value="id"
                                                    :label="$t('container.manage_allotment.area_type')"
                                                    :error="errors[0] ? true : false" :error-messages="errors[0]">

                                                </v-autocomplete>
                                            </ValidationProvider>
                                        </v-col>
                                            <v-col lg="6" md="6" cols="12">
                                                <ValidationProvider v-slot="{ errors }" name="Allotment Area" vid="allotment_area" rules="required">

                                                    <v-autocomplete outlined clearable v-model="data.value"
                                                        :items="allotmentAreas" item-text="name" item-value="name"
                                                        :label="$t('container.manage_allotment.allotment_area')"
                                                        :error="errors[0] ? true : false" :error-messages="errors[0]">
                                                        
                                                    </v-autocomplete>
                                                </ValidationProvider>
                                            </v-col>
                               
                                    

                                    </v-row>




                                    <v-row class="mx-0 my-0 py-2" justify="center">
                                        <v-btn flat @click="dialogEdit = false" outlined class="custom-btn-width py-2 mr-10">
                                            {{ $t("container.list.cancel") }}
                                        </v-btn>
                                        <v-btn type="submit" flat color="primary" :disabled="invalid" :loading="loading"
                                            class="custom-btn-width warning white--text py-2">
                                            {{ $t("container.list.update") }}
                                        </v-btn>
                                    </v-row>
                                </form>
                            </ValidationObserver>
                      
                        </v-card-text>
                    </v-card>
                </v-dialog>

            <!-- Allotment SetUp Edit modal  -->

            <!-- delete modal  -->
            <v-dialog v-model="deleteDialog" width="350">
                <v-card style="justify-content: center; text-align: center">
                    <v-card-title class="font-weight-bold justify-center">
                        {{ $t("container.manage_allotment.setupdelete") }}
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                        <div class="subtitle-1 font-weight-medium mt-5">
                            {{
                                $t("container.manage_allotment.setupdelete_alert")
                            }}
                        </div>
                    </v-card-text>
                    <v-card-actions style="display: block">
                        <v-row class="mx-0 my-0 py-2" justify="center">
                            <v-btn text @click="deleteDialog = false" outlined class="custom-btn-width py-2 mr-10">
                                {{ $t("container.list.cancel") }}
                            </v-btn>
                            <!-- <v-btn text @click="deleteSetup()" color="white" :loading="delete_loading"
                                class="custom-btn-width warning white--text py-2">
                                {{ $t("container.list.delete") }}
                            </v-btn> -->
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

extend("required", required);
export default {
    name: "Index",
    title: "CTM - Payment Processor",
    data() {
        return {
            data: {
                id:null,
                area_type: null,
                value:null

            },
            allotmentAreas:[],
            dialogAdd: false,
            deleteDialog: false,
            dialogEdit: false,
            delete_loading: false,
            loading: false,
            search: "",
            delete_id: "",
            allotment_setups: [],
            locationTypes: [],

            errors: {},
            error_status: {},
            pagination: {
                current: 1,
                total: 0,
                perPage: 10,
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
                { text: this.$t("container.manage_allotment.area_type"), value: "area_type" },
                {
                    text: this.$t(
                        "container.manage_allotment.allotment_area"
                    ),
                    value: "value",
                },
                
                {
                    text: this.$t("container.list.action"),
                    value: "actions",
                    align: "center",
                    width: "15%",
                    sortable: false,
                },
            ];
        },


    },

    methods: {
           async onChangeAreaType($event) {
              if ($event === 1) {
                   this.allotmentAreas = [{id:1,name:"Pouroshava"}, { id: 2, name: "Ward" }];
              } 
              if ($event === 2) {
                this.allotmentAreas = [{ id: 3, name: "Upazila" }, { id: 4, name: "Union" }, {id: 5, name: "Ward" }];
            }
            if ($event === 3) {
                 
                  this.allotmentAreas = [{ id: 6, name: "City Corporation" }, { id: 7, name: "Thana" }, { id: 8, name: "Ward" }];
            }
   
            //  switch ($event) {
            //     case '1':
            //          this.allotmentAreas = ["Pouroshava", "Ward"];
            //     case '2':
            //          this.allotmentAreas = ["Upazila", "Union", "Ward"];
            //     case '3':
            //        this.allotmentAreas = ["City Corporation", "Thana", "Ward"];
            
            //     default:
            //        this.allotmentAreas = [];
            // }
       
        },
        createDialog() {
            if (this.$refs.formAdd) {
                this.$refs.formAdd.reset();
            }
            this.resetForm();
                this.allotmentAreas = [];
            this.dialogAdd = true;
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

        editDialog(item) {
        
            this.dialogEdit = true;
            this.data.id = item.id;
            this.data.area_type = item.area_type.id;
            this.data.value = item.value;
            this.onChangeAreaType(item.area_type.id);
console.log(this.data.area_type)
            console.log(this.data.value)
            this.errors = {};
        },

        UpdateAllotmentSetup(){
              this.$axios
                .post("admin/globalsetting/update", this.data, {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((result) => {
                    this.loading = false;
                    console.log(result, 'result')
                    if (result.data.success == true) {
                        this.$toast.success("Data Updated Successfully");
                        this.dialogEdit = false;
                        this.resetForm();
                        this.GetAllotmentSetup();

                    } else {
                        this.$refs.formAdd.setErrors(result.data.errors);
                        //  this.$refs.formAdd.setErrors(data.errors);
                    }

                })
                .catch((err) => {


                });

        },
        resetForm() {
            this.allotmentAreas = [];
            this.data.area_type = null,
            this.data.value = null;
            this.errors={}

        },

        onPageChange($event) {
            // this.pagination.current = $event;
            this.GetAllotmentSetup();

        },
        submitAllotmentSetup(){

            // try {
            //     this.$store
            //         .dispatch("City/StoreCity", this.validator())
            //         .then((data) => {
            //             console.log(data, "submit");
            //             if (data == null) {
            //                 this.$toast.success("Data Inserted Successfully");
            //                 this.dialogAdd = false;
            //                 this.resetForm();
            //                 this.GetCity();
            //             } else {
            //                 this.$refs.formAdd.setErrors(data.errors);
            //             }
            //         });
            // } catch (e) {
            //     console.log(e);
            // }
             this.$axios
                .post("admin/globalsetting/insert", this.data, {
                     headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((result) => {
                    this.loading = false;
                    console.log(result, 'result')
                    if (result.data.success == true) {
                      this.$toast.success("Data Inserted Successfully");
                        this.dialogAdd = false;
                        this.resetForm();
                        this.GetAllotmentSetup();

                    } else {
                        this.$refs.formAdd.setErrors(result.data.errors);
                        //  this.$refs.formAdd.setErrors(data.errors);
                    }

                })
                .catch((err) => {
                  

                });

        },
        async GetAllotmentSetup() {
            const queryParams = {
                searchText: this.search,
                perPage: this.pagination.perPage,
                page: this.pagination.current,
            };
            this.$axios
                .get("/admin/globalsetting/get", {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                    params: queryParams,
                })
                .then((result) => {
                    this.allotment_setups = result.data.data;
                    this.pagination.current = result.data.meta.current_page;
                    this.pagination.total = result.data.meta.last_page;
                    this.pagination.grand_total = result.data.meta.total;
                });

        },

        deleteAlert(id) {
            this.data.id = id;
            // alert(JSON.stringify(id));
            this.deleteDialog = true;
            this.delete_id = id;
        },
           deleteSetup: async function () {
            try {
                      this.$axios
                    .get(`/admin/globalsetting/destroy/${this.delete_id}`, {
                        headers: {
                            Authorization: "Bearer " + this.$store.state.token,
                            "Content-Type": "multipart/form-data",
                        },
                     
                    })
                    .then((res) => {
                         console.log(res, "DestroyWard");
                        if (res?.data?.success) {
                            this.$toast.success(res.data.message);
                        } else {
                            this.$toast.error(res.data.message);
                        }
                        this.deleteDialog = false;
                        this.GetAllotmentSetup();
                    });
                // await this.$store
                //     .dispatch("Ward/DestroyWard", this.delete_id)
                //     .then((res) => {
                        
                //         console.log(res, "DestroyWard");
                //         if (res?.data?.success) {
                //             this.$toast.success(res.data.message);
                //         } else {
                //             this.$toast.error(res.data.message);
                //         }
                //         this.deleteDialog = false;
                //         this.GetWard();
                        //           // check if the request was successful
                        //           if (res?.data?.success) {
                        //   this.$toast.error(res.data.message);
                        // } else {
                        //   this.$toast.success(res.data.message);
                        // }
                        // this.deleteDialog = false;
                        // this.GetOffices();
                    // });
            } catch (e) {
                console.log(e);
            }},
        updateHeaderTitle() {
            const title = this.$t(
                "container.manage_allotment.allotment_setup_list"
            );
            this.$store.commit("setHeaderTitle", title);
        },
    },
    watch: {
        "$i18n.locale": "updateHeaderTitle",
    },
    created() {
        this.GetAllotmentSetup();
    },
    mounted(){
          this.$store
            .dispatch("getLookupByType", 1)
            .then((res) => (this.locationTypes = res));
    },


    beforeMount() {
        this.updateHeaderTitle();
    },
};
</script>