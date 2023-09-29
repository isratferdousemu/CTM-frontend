<template>
<div id="thana">
    <v-row class="mx-5 mt-4">

        <v-col cols="12">
            <v-row>
                <v-col cols="12">
                    <v-card elevation="10" color="white" rounded="md" theme="light" class="mb-8">
                        <v-card-title class=" justify-center " tag="div">
                            <h3 class="text-uppercase pt-3">Union List</h3>
                        </v-card-title>
                        <v-card-text>
                            <v-row class="ma-0 pa-3 white round-border d-flex justify-space-between align-center " justify="center" justify-lg="space-between">
                                <div class="d-flex justify-sm-end flex-wrap">
                                    <v-text-field @keyup.native="GetUnion" outlined dense v-model="search" prepend-inner-icon="mdi-magnify" class="my-sm-0 my-3 mx-0v -input--horizontal " flat variant="outlined" label="search thana/upazila" hide-details color="primary">
                                    </v-text-field>

                                </div>
                                <v-btn @click="dialogOpen" flat color="primary" prepend-icon="mdi-account-multiple-plus">
                                    Add New Union
                                </v-btn>

                                <v-col cols="12">
                                    <v-data-table :loading="loading" item-key="id" :headers="headers" :items="unions" :items-per-page="pagination.perPage" hide-default-footer class="elevation-0 transparent row-pointer">
                                        <template v-slot:item.id="{ item, index }">
                                            {{ (pagination.current - 1) * pagination.perPage + index + 1 }}
                                        </template>
                                        <template v-slot:item.division="{ item }">
                                            {{ item.thana.district.division .name_en }}
                                        </template>
                                        <template v-slot:item.district="{ item }">
                                            {{ item.thana ?.district.name_en }}
                                        </template>
                                        <template v-slot:item.thana="{ item }">
                                            {{ item.thana ?.name_en }}
                                        </template>
                                        <template v-slot:item.name_en="{ item }">
                                            {{ item ?.name_en }}
                                        </template>
                                        <template v-slot:item.name_bn="{ item }">
                                            {{ item ?.name_bn }}
                                        </template>
                                        <template v-slot:item.actions="{ item }">
                                            <v-btn v-can="'update-post'" fab x-small color="success" elevation="0" @click="editUnion(item)">
                                                <v-icon> mdi-account-edit-outline </v-icon>
                                            </v-btn>
                                            <v-btn v-can="'delete-division'" fab x-small color="grey" class="ml-3 white--text" elevation="0" @click="deleteAlert(item.id)">
                                                <v-icon> mdi-delete </v-icon>
                                            </v-btn>
                                        </template>
                                        <template v-slot:footer="item">
                                            <div class="text-center pt-2 v-data-footer justify-center pb-2">
                                                <v-select style="
                                  position: absolute;
                                  right: 25px;
                                  width: 149px;
                                  transform: translate(0px, 0px);
                                " :items="items" hide-details dense outlined @change="onPageChange" v-model="pagination.perPage"></v-select>
                                                <v-pagination circle primary v-model="pagination.current" :length="pagination.total" @input="onPageChange" :total-visible="11" class="custom-pagination-item"></v-pagination>

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
                    Add New Union
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text class="mt-7">
                    <v-row>

                    </v-row>

                    <ValidationObserver ref="form" v-slot="{ invalid }">
                        <form @submit.prevent="submitUnion()">
                            <v-row>
                                <v-col>
                                    <ValidationProvider name="Code" vid="code" rules="required" v-slot="{ errors }">
                                        <v-text-field outlined type="text" v-model="data.code" label="Code" required :error="errors[0] ? true : false" :error-messages="errors[0]"></v-text-field>
                                        <div v-if="union_errors && union_errors.code" v-html="union_errors.code[0]" class="red--text" />
                                    </ValidationProvider>
                                    <ValidationProvider name="District" vid="district" rules="required" v-slot="{ errors }">
                                        <v-autocomplete outlined v-model="data.district_id" @input="onChangeDistrict($event)" label="District" :items="districts" item-text="name_en" item-value="id" required :error="errors[0] ? true : false" :error-messages="errors[0]"></v-autocomplete>
                                        <div v-if="union_errors && union_errors.district_id" v-html="union_errors.district_id[0]" class="red--text" />
                                    </ValidationProvider>

                                    <ValidationProvider name="Name English" vid="name_en" rules="required" v-slot="{ errors }">
                                        <v-text-field outlined type="text" v-model="data.name_en" label="Name English" required :error="errors[0] ? true : false" :error-messages="errors[0]"></v-text-field>
                                        <div v-if="union_errors && union_errors.name_en" v-html="union_errors.name_en[0]" class="red--text" />
                                    </ValidationProvider>
                                </v-col>
                                <v-col>

                                    <ValidationProvider name="Division" vid="division" rules="required" v-slot="{ errors }">
                                        <v-autocomplete @input="onChangeDivision($event)" v-model="data.division_id" outlined label="Division" :items="divisions" item-text="name_en" item-value="id" required :error="errors[0] ? true : false" :error-messages="errors[0]"></v-autocomplete>
                                        <div v-if="union_errors && union_errors.division_id" v-html="union_errors.division_id[0]" class="red--text" />
                                    </ValidationProvider>

                                    <ValidationProvider name="Thana" vid="division" rules="required" v-slot="{ errors }">
                                        <v-autocomplete v-model="data.thana_id" outlined label="Thana" :items="thanas" item-text="name_en" item-value="id" required :error="errors[0] ? true : false" :error-messages="errors[0]"></v-autocomplete>
                                        <div v-if="union_errors && union_errors.thana_id" v-html="union_errors.thana_id[0]" class="red--text" />
                                    </ValidationProvider>

                                    <ValidationProvider name="Name Bangla" vid="name_bn" rules="required" v-slot="{ errors }">
                                        <v-text-field outlined type="text" v-model="data.name_bn" label="Name Bangla" required :error="errors[0] ? true : false" :error-messages="errors[0]"></v-text-field>
                                        <div v-if="union_errors && union_errors.name_bn" v-html="union_errors.name_bn[0]" class="red--text" />
                                    </ValidationProvider>
                                </v-col>
                            </v-row>

                            <v-row class="mx-0 my-0 py-2" justify="center">
                                <v-btn flat @click="dialogAdd = false" outlined class="custom-btn-width py-2 mr-10">
                                    Cancel
                                </v-btn>
                                <v-btn type="submit" flat color="primary" :disabled="invalid" :loading="loading" class="custom-btn-width warning white--text py-2">
                                    Submit
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
                    Edit Union
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text class="mt-7">
                    <v-row>

                    </v-row>

                    <ValidationObserver ref="form" v-slot="{ invalid }">
                        <form @submit.prevent="updateUnion()">
                            <v-row>
                                <v-col>
                                    <ValidationProvider name="Code" vid="code" rules="required" v-slot="{ errors }">
                                        <v-text-field outlined type="text" v-model="data.code" label="Code" required :error="errors[0] ? true : false" :error-messages="errors[0]"></v-text-field>
                                        <div v-if="union_errors && union_errors.code" v-html="union_errors.code[0]" class="red--text" />
                                    </ValidationProvider>
                                    <ValidationProvider name="District" vid="district" rules="required" v-slot="{ errors }">
                                        <v-autocomplete outlined v-model="data.district_id" label="District" @input="onChangeDistrict($event)" :items="districts" item-text="name_en" item-value="id" required :error="errors[0] ? true : false" :error-messages="errors[0]"></v-autocomplete>
                                        <div v-if="union_errors && union_errors.district_id" v-html="union_errors.district_id[0]" class="red--text" />
                                    </ValidationProvider>
                                    <ValidationProvider name="Name English" vid="name_en" rules="required" v-slot="{ errors }">
                                        <v-text-field outlined type="text" v-model="data.name_en" label="Name English" required :error="errors[0] ? true : false" :error-messages="errors[0]"></v-text-field>
                                        <div v-if="union_errors && union_errors.name_en" v-html="union_errors.name_en[0]" class="red--text" />
                                    </ValidationProvider>

                                </v-col>
                                <v-col>
                                    <ValidationProvider name="Division" vid="division" rules="required" v-slot="{ errors }">
                                        <v-autocomplete @input="onChangeDivision($event)" v-model="data.division_id" outlined label="Division" :items="divisions" item-text="name_en" item-value="id" required :error="errors[0] ? true : false" :error-messages="errors[0]"></v-autocomplete>
                                        <div v-if="union_errors && union_errors.division_id" v-html="union_errors.division_id[0]" class="red--text" />
                                    </ValidationProvider>

                                    <ValidationProvider name="Thana" vid="division" rules="required" v-slot="{ errors }">
                                        <v-autocomplete v-model="data.thana_id" outlined label="Thana" :items="thanas" item-text="name_en" item-value="id" required :error="errors[0] ? true : false" :error-messages="errors[0]"></v-autocomplete>
                                        <div v-if="union_errors && union_errors.thana_id" v-html="union_errors.thana_id[0]" class="red--text" />
                                    </ValidationProvider>

                                    <ValidationProvider name="Name Bangla" vid="name_bn" rules="required" v-slot="{ errors }">
                                        <v-text-field outlined type="text" v-model="data.name_bn" label="Name Bangla" required :error="errors[0] ? true : false" :error-messages="errors[0]"></v-text-field>
                                        <div v-if="union_errors && union_errors.name_bn" v-html="union_errors.name_bn[0]" class="red--text" />
                                    </ValidationProvider>
                                </v-col>
                            </v-row>

                            <v-row class="mx-0 my-0 py-2" justify="center">
                                <v-btn flat @click="dialogEdit = false" outlined class="custom-btn-width py-2 mr-10">
                                    Cancel
                                </v-btn>
                                <v-btn type="submit" flat color="primary" :disabled="invalid" :loading="loading" class="custom-btn-width warning white--text py-2">
                                    Update
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
                    Delete Union
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <div class="subtitle-1 font-weight-medium mt-5">
                        Are you sure to delete this Union? Union all information will be deleted.
                    </div>
                </v-card-text>
                <v-card-actions style="display: block">
                    <v-row class="mx-0 my-0 py-2" justify="center">
                        <v-btn text @click="deleteDialog = false" outlined class="custom-btn-width py-2 mr-10">
                            Cancel
                        </v-btn>
                        <v-btn text @click="deleteUnion()" color="white" :loading="delete_loading" class="custom-btn-width  white--text py-2">
                            Delete
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
import {
    mapState,
    mapActions
} from "vuex";
import {
    extend,
    ValidationProvider,
    ValidationObserver
} from "vee-validate";
import {
    required
} from "vee-validate/dist/rules";

extend("required", required);
export default {
    name: "Index",
    title: "CTM - Union",
    data() {
        return {
            data: {
                id: null,
                name_en: null,
                name_bn: null,
                code: null,
                division_id: null,
                district_id: null,
                thana_id: null,
            },

            districts: [],
            thanas: [],
            dialogAdd: false,
            dialogEdit: false,
            deleteDialog: false,
            delete_loading: false,
            loading: false,

            search: "",
            delete_id: "",
            unions: [],
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
            return [{
                    text: "#Sl",
                    value: "id",
                    align: "start",
                    sortable: false
                },
                {
                    text: "Code",
                    value: "code"
                },
                {
                    text: "Division ",
                    value: "division"
                },
                {
                    text: "District",
                    value: "district"
                },
                {
                    text: "Thana",
                    value: "thana"
                },
                {
                    text: "Union  (EN)",
                    value: "name_en"
                },
                {
                    text: "Union  (BN)",
                    value: "name_bn"
                },
                {
                    text: "Actions",
                    value: "actions",
                    align: "center",
                    sortable: false
                },
            ];
        },

        ...mapState({
            divisions: (state) => state.Division.divisions.data,
            error_status: (state) => state.Union.error_status,
            union_errors: (state) => state.Union.union_errors,
            // message: (state) => state.SystemConfiguration.success_message,

        }),
    },

    methods: {
        async submitUnion() {
            try {
                this.$store.dispatch("Union/StoreUnion", this.data).then((res) => {
                    // if (this.error_status == "") {
                    this.$toast.success("Data Inserted Successfully");
                    this.dialogAdd = false;
                    this.resetData();
                    this.GetUnion();
                    // }
                });
            } catch (e) {
                console.log(e);
            }

        },
        async updateUnion() {
            try {
                this.$store.dispatch("Union/UpdateUnion", this.data).then(() => {
                    if (this.error_status == "") {
                        this.$toast.success("Data Updated Successfully");
                        this.dialogEdit = false;
                        this.resetData();
                        this.GetUnion();
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
            this.updateError('update_error_value');
            this.resetData();
            this.dialogAdd = true;

        },
        async onChangeDivision(event) {

            await axios.get(`/admin/district/get/${event}`, {
                headers: {
                    Authorization: "Bearer " + this.$store.state.token,
                    "Content-Type": "multipart/form-data",
                }
            }).then((result) => {

                this.districts = result.data.data

            });

        },
        async onChangeDistrict(event) {

            console.log(this.thanas)

            await axios.get(`/admin/thana/get/${event}`, {
                headers: {
                    Authorization: "Bearer " + this.$store.state.token,
                    "Content-Type": "multipart/form-data",
                }
            }).then((result) => {

                this.thanas = result.data.data

            });

        },

        ...mapActions({
            GetAllDivisions: "Division/GetAllDivisions",

            updateError: "Union/updateError",

        }),
        deleteAlert(id) {

            this.deleteDialog = true;
            this.delete_id = id;
        },
        onPageChange($event) {
            // this.pagination.current = $event;
            this.GetUnion();
        },
        async GetUnion() {
            const queryParams = {
                searchText: this.search,
                perPage: this.pagination.perPage,
                page: this.pagination.current,
            };
            this.$axios.get("/admin/union/get", {
                headers: {
                    Authorization: "Bearer " + this.$store.state.token,
                    "Content-Type": "multipart/form-data",
                },
                params: queryParams,
            }).then((result) => {
                this.unions = result.data.data;
                this.pagination.current = result.data.meta.current_page;
                this.pagination.total = result.data.meta.last_page;
                this.pagination.grand_total = result.data.meta.total;
            });
        },

        deleteUnion: async function (id) {

            try {
                await this.$store.dispatch("Union/DestroyUnion", this.delete_id).then((res) => {
                      // check if the request was successful
              console.log(res.data)
              if (res?.data?.success) {
            this.$toast.success(res.data.message);
            } else {
              this.$toast.error(res.response.data.message);
            }
                    this.deleteDialog = false;
                    this.GetUnion();
                });
            } catch (e) {
                console.log(e);
            }

        },
        resetData() {
            if (this.$refs.form) {
                this.$refs.form.reset();
            }

            this.data.name_en = null,
                this.data.name_bn = null,
                this.data.code = null,
                this.data.division_id = null,
                this.data.district_id = null,
                this.data.thana_id = null
        },
        editUnion(item) {
            if (this.$refs.form) {
                this.$refs.form.reset();
            }
            const update_error_value = null;
            this.updateError('update_error_value');

            this.dialogEdit = true;
            this.data.id = item.id;
            this.data.name_en = item.name_en;
            this.data.name_bn = item.name_bn;
            this.data.code = item.code
            this.data.division_id = item.thana.district.division.id;

            this.data.district_id = item.thana.district.id;
            this.data.thana_id = item.thana.id;
            console.log(this.data.division_id)
            this.onChangeDivision(this.data.division_id);

            this.onChangeDistrict(this.data.district_id);
        }

    },

    mounted() {
        this.$store.commit("setHeaderTitle", "Division List");
        this.GetAllDivisions();
        this.GetUnion();
    },
};
</script>
