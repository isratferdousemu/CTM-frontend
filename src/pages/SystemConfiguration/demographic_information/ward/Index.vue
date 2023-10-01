<template>
<div id="thana">
    <v-row class="mx-5 mt-4">

        <v-col cols="12">
            <v-row>
                <v-col cols="12">
                    <v-card elevation="10" color="white" rounded="md" theme="light" class="mb-8">
                        <v-card-title class=" justify-center " tag="div">
                            <h3 class="text-uppercase pt-3">Ward List</h3>
                        </v-card-title>
                        <v-card-text>
                            <v-row class="ma-0 pa-3 white round-border d-flex justify-space-between align-center " justify="center" justify-lg="space-between">
                                <div class="d-flex justify-sm-end flex-wrap">
                                    <v-text-field @keyup.native="GetWard" outlined dense v-model="search" prepend-inner-icon="mdi-magnify" class="my-sm-0 my-3 mx-0v -input--horizontal " flat variant="outlined" label="search ward" hide-details color="primary">
                                    </v-text-field>

                                </div>
                                <v-btn @click="dialogOpen" flat color="primary" prepend-icon="mdi-account-multiple-plus">
                                    Add New Ward {{ error_status }}
                                </v-btn>
                                <v-col cols="12">
                                    <v-data-table :loading="loading" item-key="id" :headers="headers" :items="wards" :items-per-page="pagination.perPage" hide-default-footer class="elevation-0 transparent row-pointer">
                                        <!-- <template v-slot:item.id="{ item, index }">
                                            {{ (pagination.current - 1) * pagination.perPage + index + 1 }}
                                        </template> -->
                                        <template v-slot:item.division="{ item }">
                                            <span v-if="item?.parent?.parent?.parent.type=='division'">
                                                {{ item?.parent?.parent?.parent.name_en }}
                                            </span>
                                            <span v-if="item?.parent?.type=='union' || item?.parent?.type=='thana'">
                                                {{ item?.parent?.parent?.parent?.parent?.name_en }}
                                            </span>
                                        </template>
                                        <template v-slot:item.district="{ item }">
                                            <span v-if="item?.parent?.parent?.type=='district'">
                                                {{ item?.parent?.parent.name_en }}
                                            </span>
                                            <span v-if="item?.parent?.type=='union' || item?.parent?.type=='thana'">
                                                {{ item?.parent?.parent?.parent?.name_en }}
                                            </span>
                                        </template>
                                         <template v-slot:item.thana="{ item }">
                                            <span v-if="item?.parent?.type=='union' || item?.parent?.type=='thana'">
                                                {{ item?.parent?.parent?.name_en }}
                                            </span>
                                        </template>  
                                        <template v-slot:item.union="{ item }">
                                            <span v-if="item?.parent?.type=='city' || item?.parent?.type=='union' || item?.parent?.type=='thana'">
                                                {{ item?.parent?.name_en }}
                                            </span>
                                        </template>
                                        <template v-slot:item.actions="{ item }">
                                            <v-btn v-can="'update-post'" fab x-small color="success" elevation="0" @click="editWard(item)">
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

        <!-- ward add modal  -->
        <v-dialog v-model="dialogAdd" width="650">
            <v-card style="justify-content: center; text-align: center">
                <v-card-title class="font-weight-bold justify-center">
                    Add New Ward
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text class="mt-7">
                    <v-row>

                    </v-row>

                    <ValidationObserver ref="form" v-slot="{ invalid }">
                        <form @submit.prevent="submitWard()">
                           <v-row>
                            <v-col lg="12" md="12" cols="12">
                              <ValidationProvider name="Code" vid="code" rules="required" v-slot="{ errors }">
                                  <v-text-field :hide-details="errors[0] ? false : true" outlined type="text" v-model="data.code" label="Code" required :error="errors[0] ? true : false" :error-messages="errors[0]"></v-text-field>
                              </ValidationProvider>
                          </v-col>
                    <v-col lg="6" md="6" cols="12">
                      <ValidationProvider name="Ward Name English" vid="name_en" rules="required" v-slot="{ errors }">
                        <v-text-field outlined type="text" :hide-details="errors[0] ? false : true" v-model="data.name_en" label="Ward Name English" required :error="errors[0] ? true : false" :error-messages="errors[0]"></v-text-field>
                    </ValidationProvider>
                    </v-col>
                    <v-col lg="6" md="6" cols="12">
                      <ValidationProvider  name="Ward Name Bangla" vid="name_bn" rules="required" v-slot="{ errors }">
                        <v-text-field :hide-details="errors[0] ? false : true" outlined type="text" v-model="data.name_bn" label="Ward Name Bangla" required :error="errors[0] ? true : false" :error-messages="errors[0]"></v-text-field>
                    </ValidationProvider>
                    </v-col>

                    <v-col lg="6" md="6"  cols="12">
                        <ValidationProvider name="Division" vid="division" rules="required" v-slot="{ errors }">
                                        <v-autocomplete :hide-details="errors[0] ? false : true" @input="onChangeDivision($event)" v-model="data.division_id" outlined label="Division" :items="divisions" item-text="name_en" item-value="id" required :error="errors[0] ? true : false" :error-messages="errors[0]"></v-autocomplete>
                                    </ValidationProvider>
                    </v-col>
                    <v-col lg="6" md="6"  cols="12">
                      <ValidationProvider name="District" vid="district" rules="required" v-slot="{ errors }">
                        <v-autocomplete :hide-details="errors[0] ? false : true"  outlined v-model="data.district_id" @input="onChangeDistrict($event)" label="District" :items="districts" item-text="name_en" item-value="id" required :error="errors[0] ? true : false" :error-messages="errors[0]"></v-autocomplete> 
                    </ValidationProvider>
                    </v-col>
                    <v-col cols="12">
                      <ValidationProvider
                      name="Location Type"
                      vid="location_type"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-autocomplete
                        @input="LocationType($event)"
                        v-model="data.location_type"
                        :hide-details="errors[0] ? false : true"
                        outlined
                        label="Location Type"
                        :items="locationType"
                        item-text="value_en"
                        item-value="id"
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                      ></v-autocomplete>
                    </ValidationProvider>
                    </v-col>
                    <v-col v-if="data.location_type==2" lg="6" md="6"  cols="12">
                      <ValidationProvider name="Upazila" vid="thana_id" rules="required" v-slot="{ errors }">
                        <v-autocomplete
                        :hide-details="errors[0] ? false : true"
                        v-model="data.thana_id"
                        outlined
                        label="Upazila"
                        @change="onChangeUpazila($event)"
                        :items="thanas"
                        item-text="name_en"
                        item-value="id"
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]
                        "></v-autocomplete>
                    </ValidationProvider>
                    </v-col>
                    <v-col v-if="data.location_type==2" lg="6" md="6"  cols="12">
                      <ValidationProvider name="union" vid="union_id" rules="required" v-slot="{ errors }">
                        <v-autocomplete
                        :hide-details="errors[0] ? false : true"
                        v-model="data.union_id"
                        
                        outlined
                        label="Union"
                        :items="unions"
                        item-text="name_en"
                        item-value="id"
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]
                        "></v-autocomplete>
                    </ValidationProvider>
                    </v-col>
                    <v-col v-if="data.location_type==3" lg="6" md="6"  cols="12">
                      <ValidationProvider name="city" vid="city_id" rules="required" v-slot="{ errors }">
                        <v-autocomplete
                        :hide-details="errors[0] ? false : true"
                        v-model="data.city_id"
                        @change="onChangeCity($event)"
                        outlined
                        label="City Corporation"
                        :items="cities"
                        item-text="name_en"
                        item-value="id"
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]
                        "></v-autocomplete>
                    </ValidationProvider>
                    </v-col>
                    <v-col v-if="data.location_type==3" lg="6" md="6"  cols="12">
                      <ValidationProvider name="thana" vid="city_thana_id" rules="required" v-slot="{ errors }">
                        <v-autocomplete
                        :hide-details="errors[0] ? false : true"
                        v-model="data.city_thana_id"
                        outlined
                        label="Thana"
                        :items="city_thanas"
                        item-text="name_en"
                        item-value="id"
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]
                        "></v-autocomplete>
                    </ValidationProvider>
                    </v-col>
                    <v-col v-if="data.location_type==1" lg="6" md="6"  cols="12">
                      <ValidationProvider name="thana" vid="district_pouro_id" rules="required" v-slot="{ errors }">
                        <v-autocomplete
                        :hide-details="errors[0] ? false : true"
                        v-model="data.district_pouro_id"
                        outlined
                        label="District Pouroshava"
                        :items="district_poros"
                        item-text="name_en"
                        item-value="id"
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]
                        "></v-autocomplete>
                    </ValidationProvider>
                    </v-col>
                      
                           </v-row>

                            <v-row class="mx-0 my-0 py-2" justify="center">
                                <v-btn flat @click="dialogAdd = false" outlined class="custom-btn-width py-2 mr-10">
                                    Cancel
                                </v-btn>
                                <v-btn type="submit" flat color="primary" :disabled="invalid" :loading="loading" class="custom-btn-width black white--text py-2">
                                    Submit
                                </v-btn>
                            </v-row>
                        </form>
                    </ValidationObserver>
                </v-card-text>
            </v-card>
        </v-dialog>
        <!-- ward add modal  -->
        <!-- ward edit modal  -->
        <v-dialog v-model="dialogEdit" width="650">
            <v-card style="justify-content: center; text-align: center">
                <v-card-title class="font-weight-bold justify-center">
                    Update Ward
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text class="mt-7">
                    <v-row>

                    </v-row>

                    <ValidationObserver ref="form" v-slot="{ invalid }">
                        <form @submit.prevent="updateWard()">
                           <v-row>
                            <v-col lg="12" md="12" cols="12">
                              <ValidationProvider name="Code" vid="code" rules="required" v-slot="{ errors }">
                                  <v-text-field :hide-details="errors[0] ? false : true" outlined type="text" v-model="data.code" label="Code" required :error="errors[0] ? true : false" :error-messages="errors[0]"></v-text-field>
                              </ValidationProvider>
                          </v-col>
                    <v-col lg="6" md="6" cols="12">
                      <ValidationProvider name="Ward Name English" vid="name_en" rules="required" v-slot="{ errors }">
                        <v-text-field outlined type="text" :hide-details="errors[0] ? false : true" v-model="data.name_en" label="Ward Name English" required :error="errors[0] ? true : false" :error-messages="errors[0]"></v-text-field>
                    </ValidationProvider>
                    </v-col>
                    <v-col lg="6" md="6" cols="12">
                      <ValidationProvider  name="Ward Name Bangla" vid="name_bn" rules="required" v-slot="{ errors }">
                        <v-text-field :hide-details="errors[0] ? false : true" outlined type="text" v-model="data.name_bn" label="Ward Name Bangla" required :error="errors[0] ? true : false" :error-messages="errors[0]"></v-text-field>
                    </ValidationProvider>
                    </v-col>

                    <v-col lg="6" md="6"  cols="12">
                        <ValidationProvider name="Division" vid="division" rules="required" v-slot="{ errors }">
                                        <v-autocomplete :hide-details="errors[0] ? false : true" @input="onChangeDivision($event)" v-model="data.division_id" outlined label="Division" :items="divisions" item-text="name_en" item-value="id" required :error="errors[0] ? true : false" :error-messages="errors[0]"></v-autocomplete>
                                    </ValidationProvider>
                    </v-col>
                    <v-col lg="6" md="6"  cols="12">
                      <ValidationProvider name="District" vid="district" rules="required" v-slot="{ errors }">
                        <v-autocomplete :hide-details="errors[0] ? false : true"  outlined v-model="data.district_id" @input="onChangeDistrict($event)" label="District" :items="districts" item-text="name_en" item-value="id" required :error="errors[0] ? true : false" :error-messages="errors[0]"></v-autocomplete> 
                    </ValidationProvider>
                    </v-col>
                    <v-col cols="12">
                      <ValidationProvider
                      name="Location Type"
                      vid="location_type"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-autocomplete
                        @input="LocationType($event)"
                        v-model="data.location_type"
                        :hide-details="errors[0] ? false : true"
                        outlined
                        label="Location Type"
                        :items="locationType"
                        item-text="value_en"
                        item-value="id"
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                      ></v-autocomplete>
                    </ValidationProvider>
                    </v-col>
                    <v-col v-if="data.location_type==2" lg="6" md="6"  cols="12">
                      <ValidationProvider name="Upazila" vid="thana_id" rules="required" v-slot="{ errors }">
                        <v-autocomplete
                        :hide-details="errors[0] ? false : true"
                        v-model="data.thana_id"
                        outlined
                        label="Upazila"
                        @change="onChangeUpazila($event)"
                        :items="thanas"
                        item-text="name_en"
                        item-value="id"
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]
                        "></v-autocomplete>
                    </ValidationProvider>
                    </v-col>
                    <v-col v-if="data.location_type==2" lg="6" md="6"  cols="12">
                      <ValidationProvider name="union" vid="union_id" rules="required" v-slot="{ errors }">
                        <v-autocomplete
                        :hide-details="errors[0] ? false : true"
                        v-model="data.union_id"
                        
                        outlined
                        label="Union"
                        :items="unions"
                        item-text="name_en"
                        item-value="id"
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]
                        "></v-autocomplete>
                    </ValidationProvider>
                    </v-col>
                    <v-col v-if="data.location_type==3" lg="6" md="6"  cols="12">
                      <ValidationProvider name="city" vid="city_id" rules="required" v-slot="{ errors }">
                        <v-autocomplete
                        :hide-details="errors[0] ? false : true"
                        v-model="data.city_id"
                        @change="onChangeCity($event)"
                        outlined
                        label="City Corporation"
                        :items="cities"
                        item-text="name_en"
                        item-value="id"
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]
                        "></v-autocomplete>
                    </ValidationProvider>
                    </v-col>
                    <v-col v-if="data.location_type==3" lg="6" md="6"  cols="12">
                      <ValidationProvider name="thana" vid="city_thana_id" rules="required" v-slot="{ errors }">
                        <v-autocomplete
                        :hide-details="errors[0] ? false : true"
                        v-model="data.city_thana_id"
                        outlined
                        label="Thana"
                        :items="city_thanas"
                        item-text="name_en"
                        item-value="id"
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]
                        "></v-autocomplete>
                    </ValidationProvider>
                    </v-col>
                    <v-col v-if="data.location_type==1" lg="6" md="6"  cols="12">
                      <ValidationProvider name="thana" vid="district_pouro_id" rules="required" v-slot="{ errors }">
                        <v-autocomplete
                        :hide-details="errors[0] ? false : true"
                        v-model="data.district_pouro_id"
                        outlined
                        label="District Pouroshava"
                        :items="district_poros"
                        item-text="name_en"
                        item-value="id"
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]
                        "></v-autocomplete>
                    </ValidationProvider>
                    </v-col>
                      
                           </v-row>

                            <v-row class="mx-0 my-0 py-2" justify="center">
                                <v-btn flat @click="dialogAdd = false" outlined class="custom-btn-width py-2 mr-10">
                                    Cancel
                                </v-btn>
                                <v-btn type="submit" flat color="primary" :disabled="invalid" :loading="loading" class="custom-btn-width black white--text py-2">
                                    Submit
                                </v-btn>
                            </v-row>
                        </form>
                    </ValidationObserver>
                </v-card-text>
            </v-card>
        </v-dialog>
        <!-- ward edit modal  -->
 

        <!-- delete modal  -->
        <v-dialog v-model="deleteDialog" width="350">
            <v-card style="justify-content: center; text-align: center">
                <v-card-title class="font-weight-bold justify-center">
                    Delete Ward
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <div class="subtitle-1 font-weight-medium mt-5">
                        Are you sure to delete this Ward? Ward all information will be deleted.
                    </div>
                </v-card-text>
                <v-card-actions style="display: block">
                    <v-row class="mx-0 my-0 py-2" justify="center">
                        <v-btn text @click="deleteDialog = false" outlined class="custom-btn-width py-2 mr-10">
                            Cancel
                        </v-btn>
                        <v-btn text @click="deleteWard()" color="white" :loading="delete_loading" class="custom-btn-width black white--text py-2">
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
    title: "CTM - Ward",
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
                union_id: null,
                city_id: null,
                city_thana_id: null,
                district_pouro_id: null,
                location_type: null
            },

            districts: [],
            cities: [],
            thanas: [],
            city_thanas: [],
            unions: [],
            locationType: [],
            dialogAdd: false,
            dialogEdit: false,
            deleteDialog: false,
            delete_loading: false,
            loading: false,

            search: "",
            delete_id: "",
            wards: [],
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
                {
                    text: "Code",
                    value: "code"
                },
                {
                    text: "Division",
                    value: "division"
                },
                {
                    text: "District",
                    value: "district"
                },
                {
                    text: "Thana/Upazila",
                    value: "thana"
                },
                {
                    text: "Union/Pourashava/City Corporation",
                    value: "union"
                },
                {
                    text: "Location Type",
                    value: "location_type.value_en"
                },
                {
                    text: "Ward  (EN)",
                    value: "name_en"
                },
                {
                    text: "Ward  (BN)",
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
            divisions: (state) => state.Division.divisions,
            error_status: (state) => state.Ward.error_status,
            ward_errors: (state) => state.Ward.ward_errors,
            // message: (state) => state.SystemConfiguration.success_message,

        }),
    },

    methods: {
        async submitWard() {
            try {
                let fd = new FormData();
                for (const [key, value] of Object.entries(this.data)) {
                    if (value !== null) {
                        fd.append(key, value);
                    }
                }
                this.$store.dispatch("Ward/StoreWard", fd).then((res) => {
                    if (res.data.success) {
                        this.$toast.success("Data Inserted Successfully");
                        this.resetData();
                        this.dialogAdd = false;
                        this.GetWard();
                    }
                });
            } catch (e) {
                console.log(e);
            }

        },
        async updateWard() {
            try {
                let fd = new FormData();
                for (const [key, value] of Object.entries(this.data)) {
                    if (value !== null) {
                        fd.append(key, value);
                    }
                }
                this.$store.dispatch("Ward/UpdateWard", fd).then((res) => {
                    console.log(res, 'upddate rest')
                    if(res.data.success){
                        this.$toast.success("Data Updated Successfully");
                        this.dialogEdit = false;
                        this.resetData();
                        this.GetWard();
                    }
                 
                });
            } catch (e) {
                console.log(e);
            }

        },
        async LocationType($event) {
            if (this.data.district_id != null && this.data.location_type != null) {
                if ($event === 2) {
                    await this.$axios.get(`/admin/thana/get/${this.data.district_id}`, {
                        headers: {
                            Authorization: "Bearer " + this.$store.state.token,
                            "Content-Type": "multipart/form-data",
                        }
                    }).then((result) => {
                        this.thanas = result.data.data
                    });
                }
                if ($event === 3) {

                    await this.$axios.get("/admin/city/get/" + this.data.district_id + "/" + $event, {
                        headers: {
                            Authorization: "Bearer " + this.$store.state.token,
                            "Content-Type": "multipart/form-data",
                        }
                    }).then((result) => {

                        this.cities = result.data.data

                    });

                }
                if ($event === 1) {
                    await this.$axios.get("/admin/city/get/" + this.data.district_id + "/" + $event, {
                        headers: {
                            Authorization: "Bearer " + this.$store.state.token,
                            "Content-Type": "multipart/form-data",
                        }
                    }).then((result) => {

                        this.district_poros = result.data.data

                    });

                }

            }

        },
        async onChangeUpazila(event) {
            await this.$axios.get(`/admin/union/get/${this.data.thana_id}`, {
                headers: {
                    Authorization: "Bearer " + this.$store.state.token,
                    "Content-Type": "multipart/form-data",
                }
            }).then((result) => {

                this.unions = result.data.data

            });

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

            await this.$axios.get(`/admin/district/get/${event}`, {
                headers: {
                    Authorization: "Bearer " + this.$store.state.token,
                    "Content-Type": "multipart/form-data",
                }
            }).then((result) => {

                this.districts = result.data.data

            });

        },
        async onChangeDistrict(event) {

            await this.$axios.get(`/admin/thana/get/${event}`, {
                headers: {
                    Authorization: "Bearer " + this.$store.state.token,
                    "Content-Type": "multipart/form-data",
                }
            }).then((result) => {
this.LocationType(this.data.location_type)
                this.thanas = result.data.data

            });

        },
        async onChangeThana(event) {

            await this.$axios.get(`/admin/union/get/${event}`, {
                headers: {
                    Authorization: "Bearer " + this.$store.state.token,
                    "Content-Type": "multipart/form-data",
                }
            }).then((result) => {

                this.unions = result.data.data

            });

        },
        async onChangeCity(event) {

            await this.$axios.get(`/admin/thana/get/city/${this.data.city_id}`, {
                headers: {
                    Authorization: "Bearer " + this.$store.state.token,
                    "Content-Type": "multipart/form-data",
                }
            }).then((result) => {

                this.city_thanas = result.data.data

            });

        },

        ...mapActions({
            GetAllDivisions: "Division/GetAllDivisions",

            updateError: "Ward/updateError",

        }),
        deleteAlert(id) {

            this.deleteDialog = true;
            this.delete_id = id;
        },
        onPageChange($event) {
            // this.pagination.current = $event;
            this.GetWard();
        },
        async GetWard() {
            const queryParams = {
                searchText: this.search,
                perPage: this.pagination.perPage,
                page: this.pagination.current,
            };
            this.$axios.get("/admin/ward/get", {
                headers: {
                    Authorization: "Bearer " + this.$store.state.token,
                    "Content-Type": "multipart/form-data",
                },
                params: queryParams,
            }).then((result) => {
                this.wards = result.data.data;
                console.log(this.wards);
                this.pagination.current = result.data.meta.current_page;
                this.pagination.total = result.data.meta.last_page;
                this.pagination.grand_total = result.data.meta.total;
            });
        },

        deleteWard: async function (id) {

            try {
                await this.$store.dispatch("Ward/DestroyWard", this.delete_id).then((err) => {
                    // check if the request was successful
                    console.log(res.data)
                    if (res?.data?.success) {
                        this.$toast.success(res.data.message);
                    } else {
                        this.$toast.error(res.response.data.message);
                    }
                    this.deleteDialog = false;
                    this.GetWard();
                });
            } catch (e) {
                console.log(e);
            }

        },
        resetData() {

            this.data.name_en = null,
                this.data.name_bn = null,
                this.data.code = null,
                this.data.division_id = null,
                this.data.district_id = null,
                this.data.thana_id = null,
                this.data.union_id = null,
                this.data.location_type = null,
                this.city_id = null,
                this.city_thana_id = null,
                this.district_pouro_id = null
        },
        editWard(item) {
            if (this.$refs.form) {
                this.$refs.form.reset();
            }
            const update_error_value = null;
            this.updateError('update_error_value');

            this.data.id = item.id;
            this.data.name_en = item.name_en;
            this.data.name_bn = item.name_bn;
            this.data.code = item.code
            if (item?.parent?.parent?.parent.type=='division') {
                this.data.division_id = item?.parent?.parent?.parent.id;
            } else if (item?.parent?.type=='union' || item?.parent?.type=='thana') {
                this.data.division_id = item?.parent?.parent?.parent?.parent?.id;
                
            }
 
if (item?.parent?.parent?.type=='district') {
                this.data.district_id = item?.parent?.parent.id;
            } else if (item?.parent?.type=='union' || item?.parent?.type=='thana') {
                this.data.district_id = item?.parent?.parent?.parent?.id;
                
}
 
            if (item?.parent?.type=='city' && item?.parent?.location_type==1) {
                this.data.district_pouro_id = item?.parent?.id;
            // this.LocationType(item?.parent?.location_type==1);

            }
            if (item?.parent?.type=='union') {
                this.data.union_id = item?.parent?.id;
                if (item?.parent?.parent?.type=='thana') {
                this.data.thana_id = item?.parent?.parent?.id;
            }
            }
            if (item?.parent?.type=='thana' && item?.parent?.location_type==3) {
                this.data.city_thana_id = item?.parent?.id;
                this.data.city_id = item?.parent?.parent?.id;
            }
            this.data.location_type = item.location_type.id;
            this.onChangeDivision(this.data.division_id);
            this.onChangeDistrict(this.data.district_id);
            this.onChangeThana(this.data.thana_id);
            this.onChangeCity(this.data.city_id);
            setTimeout(() => {
                this.dialogEdit = true;
            }, 500);

        }

    },

    mounted() {
        this.$store.commit("setHeaderTitle", "Division List");
        this.GetAllDivisions();
        this.GetWard();

        this.$store.dispatch('getLookupByType', 1).then((res) =>
            this.locationType = res)

    },
};
</script>
