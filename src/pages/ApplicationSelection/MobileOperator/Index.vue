<template>
    <div id="alloment_setup">
        <v-row class="mx-5 mt-4">
            <v-col cols="12">
                <v-row>
                    <v-col cols="12">
                        <v-card elevation="10" color="white" rounded="md" theme="light" class="mb-8">
                            <v-card-title class="justify-center" tag="div">
                                <h3 class="text-uppercase pt-3">
                                    {{ $t("container.application_selection.mobile_operator.list") }}
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
                                    <v-btn @click="createDialog" flat color="primary"
                                        prepend-icon="mdi-account-multiple-plus">
                                        {{ $t("container.list.add_new") }}
                                    </v-btn>
                                    <v-col cols="12">
                                        <v-data-table :loading="loading" item-key="id" :headers="headers"
                                            :items="operators" :items-per-page="pagination.perPage"
                                            hide-default-footer class="elevation-0 transparent row-pointer">
                                            <template v-slot:item.id="{ item, index }">
                                                {{
                                                    (pagination.current - 1) * pagination.perPage +
                                                    index +
                                                    1
                                                }}
                                            </template>
                                      
                                            <template v-slot:item.value="{ item }">
                                                {{ item.operator }}
                                            </template>

                                            <!-- Action Button -->
                                            <template v-slot:item.actions="{ item }">
                                                <v-tooltip top>
                                                    <template v-slot:activator="{ on }" v-if="item.default !== 1">
                                                        <v-btn v-can="'update-post'" fab x-small v-on="on" color="success"
                                                            elevation="0" @click="editDialog(item)">
                                                            <v-icon> mdi-account-edit-outline </v-icon>
                                                        </v-btn>
                                                    </template>
                                                    <span>
                                                        {{ $t("container.list.edit") }}
                                                    </span>
                                                </v-tooltip>

                                                <v-tooltip top>
                                                    <template v-slot:activator="{ on }"  v-if="item.default !== 1">
                                                        <v-btn v-can="'delete-division'" fab x-small v-on="on" color="grey"
                                                            class="ml-3 white--text" elevation="0"
                                                            @click="deleteAlert(item.id)">
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

            <!-- Allotment Setup add modal  -->
            <v-dialog v-model="dialogAdd" width="650">
                <v-card style="justify-content: center; text-align: center">
                    <v-card-title class="font-weight-bold justify-center">
                        {{ $t("container.application_selection.mobile_operator.add_new_mobile_operator") }}
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text class="mt-7">
                        <ValidationObserver  v-slot="{ invalid }">
                            <form @submit.prevent="submitMobileOperator()">

                                <v-row justify="center" align="center">

                                
                                    <v-col lg="6" md="6" cols="12">
                                        <ValidationProvider ref="formAdd" v-slot="{ errors }" name="Mobile Operator" vid="operator"
                                            rules="checkNumber">

                                            <v-text-field ref="operator" outlined clearable v-model="data.operator" 
                                                :label="$t('container.application_selection.mobile_operator.operator')"
                                                :error="errors[0] ? true : false" :error-messages="errors[0]">

                                            </v-text-field >
                                        </ValidationProvider>
                                        <div v-if="errors && errors.operator" v-html="errors.operator[0]" class="red--text" />
                                    </v-col>



                                </v-row>




                                <v-row class="mx-0 my-0 py-2" justify="center">
                                    <v-btn flat @click="dialogAdd = false" outlined class="custom-btn-width py-2 mr-10">
                                        {{ $t("container.list.cancel") }}
                                    </v-btn>
                                    <v-btn type="submit" flat color="primary" :disabled="invalid" :loading="loading"
                                        class="custom-btn-width  white--text py-2">
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
                        <ValidationObserver  v-slot="{ invalid }">
                            <form @submit.prevent="UpdateMobileOperator()">

                                                               <v-row justify="center" align="center">

                                
                                        <v-col lg="6" md="6" cols="12">
                                            <ValidationProvider ref="formAdd" v-slot="{ errors }" name="Mobile Operator" vid="operator"
                                                rules="checkNumber"
                                                >

                                                <v-text-field ref="operator" outlined clearable v-model="data.operator" 
                                                    :label="$t('container.application_selection.mobile_operator.operator')"
                                                  
                                                     :error="errors[0] ? true : false"
                                                     :error-messages="errors">

                                                </v-text-field >
                                            </ValidationProvider>
                                             <div v-if="errors && errors.operator" v-html="errors.operator[0]" class="red--text" />
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
                        {{ $t("container.application_selection.mobile_operator.delete") }}
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                        <div class="subtitle-1 font-weight-medium mt-5">
                            {{
                                $t("container.application_selection.mobile_operator.delete_alert")
                            }}
                        </div>
                    </v-card-text>
                    <v-card-actions style="display: block">
                        <v-row class="mx-0 my-0 py-2" justify="center">
                            <v-btn text @click="deleteDialog = false" outlined class="custom-btn-width py-2 mr-10">
                                {{ $t("container.list.cancel") }}
                            </v-btn>
                            <v-btn text @click="deleteMobileOperator()" color="white" :loading="delete_loading"
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
import { mapState } from "vuex";
import { extend, ValidationProvider, ValidationObserver } from "vee-validate";
import { required } from "vee-validate/dist/rules";

extend("required", required);
extend("checkNumber", {
    validate: (value) => {
        // Check if the value is a 3-digit number starting with '01'
        const isValid = /^01[0-9]{1}$/.test(value);

        // Return true if the condition is met
        return isValid;
    },
    message: "This field must be a 3-digit number starting with '01'",
});
export default {
    name: "Index",
    title: "CTM - Payment Processor",
    data() {
        return {
            data: {
                id: null,
             
                operator: null

            },
            text: null,
            allotmentAreas: [],
            dialogAdd: false,
            deleteDialog: false,
            dialogEdit: false,
            delete_loading: false,
            loading: false,
            search: "",
            delete_id: "",
            operators: [],
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
              
                {
                    text: this.$t(
                        "container.application_selection.mobile_operator.operator"
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
                this.allotmentAreas = [{ id: 1, name: "District-Pouroshava" }, { id: 2, name: "Ward" }];
            }
            if ($event === 2) {
                this.allotmentAreas = [{ id: 3, name: "Upazila" }, { id: 4, name: "Union" }, { id: 5, name: "Ward" }];
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
            this.data.operator = item.operator;
        
            this.errors = {};
        },

        UpdateMobileOperator() {
            this.$axios
                .post("admin/mobile-operator/update", this.data, {
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
                        this.GetAllOperator();

                    } else {
                        this.$refs.formAdd.setErrors(result.data.errors);
                        console.log(result);
                        //  this.$refs.formAdd.setErrors(data.errors);
                    }

                })
                .catch((err) => {
                     console.log(err, 'err')
                     
                       this.errors = err.response.data.errors
                        this.$refs.formAdd.setErrors(err.response.data.errors);
                       console.log(this.errors,"error")


                });

        },
        resetForm() {
          
            this.data.operator = null,
              
            this.errors = {}

        },

        onPageChange($event) {
            // this.pagination.current = $event;
            this.GetAllOperator();

        },
        submitMobileOperator() {

          
            this.$axios
                .post("admin/mobile-operator/insert", this.data, {
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
                        this.GetAllOperator();

                    } else {
                        this.$refs.formAdd.setErrors(result.data.errors);
                        this.$refs.formAdd.setErrors(result.data.errors);
                        console.log(result,"result");
                        //  this.$refs.formAdd.setErrors(data.errors);
                    }

                })
                .catch((err) => {
                   if (this.$refs.formAdd && this.$refs.formAdd.$refs && this.$refs.formAdd.$refs.operator) {
                        // Set errors for the 'operator' field
                        this.$refs.formAdd.$refs.operator.setErrors([err.response.data.errors.operator[0]]);
                    } else {
                        console.error('Error setting errors:', err);
                    }

                });

        },
        async GetAllOperator() {
            const queryParams = {
                searchText: this.search,
                perPage: this.pagination.perPage,
                page: this.pagination.current,
            };
            this.$axios
                .get("/admin/mobile-operator/get", {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                    params: queryParams,
                })
                .then((result) => {
                    console.log(result,'result')
                    this.operators = result.data.data;
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
        deleteMobileOperator: async function () {
            try {
                this.$axios
                    .get(`/admin/mobile-operator/destroy/${this.delete_id}`, {
                        headers: {
                            Authorization: "Bearer " + this.$store.state.token,
                            "Content-Type": "multipart/form-data",
                        },

                    })
                    .then((res) => {
                       
                        if (res?.data?.success) {
                            this.$toast.success(res.data.message);
                        } else {
                            this.$toast.error(res.data.message);
                        }
                        this.deleteDialog = false;
                        this.GetAllOperator();
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
            }
        },
        updateHeaderTitle() {
            const title = this.$t(
                "container.application_selection.mobile_operator.list"
            );
            this.$store.commit("setHeaderTitle", title);
        },
    },
    watch: {
        "$i18n.locale": "updateHeaderTitle",
    },
    created() {
        this.GetAllOperator();
    },
    mounted() {
        this.$store
            .dispatch("getLookupByType", 1)
            .then((res) => (this.locationTypes = res));
    },


    beforeMount() {
        this.updateHeaderTitle();
    },
};
</script>
<style>.no-arrow-icon .v-input__icon--clear {
    display: none;

}</style>