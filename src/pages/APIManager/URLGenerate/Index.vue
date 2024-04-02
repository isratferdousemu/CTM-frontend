<script>

export default {
    name: "Index",
    title: "CTM - UrL Generate",
    data() {
        return {
            data: {
                id: null,
                code: null,
                name_en: null,
                name_bn: null,
            },
            total: null,
            isLoading: false,
            dialogAdd: false,
            deleteDialog: false,
            dialogEdit: false,
            delete_loading: false,
            loading: false,
            search: "",
            delete_id: "",
            urls: [],
            Alldivisions: [],
            errors: {},
            error_status: {},
            pagination: {
                current: 1,
                total: 0,
                perPage: 15,
            },
            sortBy: "name_en",
            sortDesc: false, //ASC
            // errors: "",
            items: [5, 10, 15, 20, 40, 50, 100],
        };
    },

    watch: {

        "$i18n.locale": "updateHeaderTitle",
    },

    computed: {
        language: {
            get() {
                return this.$store.getters.getAppLanguage;
            }
        },
        headers() {
            return [
                { text: this.$t('container.list.sl'), value: "id", align: "start", sortable: false, width: "10%" },
                { text: this.$t('container.api_manager.url_generate.name'), value: "name", width: "15%" },
                { text: this.$t('container.api_manager.url_generate.url'), value: "url", width: "25%"  },
                { text: this.$t('container.api_manager.url_generate.table_name'), value: "table", width: "15%"  },
                { text: this.$t('container.api_manager.url_generate.method'), value: "method", width: "15%" },

                { text: this.$t('container.list.action'), value: "actions", align: "center", sortable: false, width: "20%"  },
            ];
        },

      
    },

    mounted() {
        this.GetURL();
     
    },

    methods: {
        PageSetup(){
             this.pagination.current=1;
            this.GetURL();

        },
        async GetURL() {
            const queryParams = {
                search: this.search,
                perPage: this.pagination.perPage,
                page: this.pagination.current,
                sortBy: this.sortBy,
                sortDesc: this.sortDesc,
            };
            this.$axios
                .get("/admin/api-url", {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                    params: queryParams,
                })
                .then((result) => {
                    this.total = result?.data?.data?.total;
                    this.urls = result?.data?.data.data;
                    this.pagination.current = result?.data?.data?.current_page;
                    this.pagination.total = result?.data?.data?.last_page;
                    this.pagination.grand_total = result?.data?.data?.total;
                });
        },
        onPageChange($event) {
            // this.pagination.current = $event;
            this.GetURL();
        },
        submitUrl() {
            this.$axios
                .post("admin/url/insert", this.data, {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((result) => {
                    if (result.data.success == true) {
                        this.$toast.success("Data Inserted Successfully");

                    } else {
                        this.$refs.formAdd.setErrors(result.data.errors);
                  
                     
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

       
        
        

        deleteAlert(id) {
            this.deleteDialog = true;
            this.deleted_id = id;
        },

        deleteURL: async function () {
            this.$axios
                .delete(`admin/api-url/${this.deleted_id }`, {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "application/json", // Use application/json instead of multipart/form-data
                    },
                })
                .then((res) => {
                    console.log(res.data, "res.data")
                    if (res?.data?.success == true) {
                        this.$toast.success(res.data.message);
                        this.deleteDialog = false;
                        this.GetURL();
                    }
                    if (res?.data?.success == false) {
                        this.$toast.error(res.data.message);
                    }
               


                })
                .catch((error) => {
                    console.log(error, "error");

                });
        },

   

    },
}
</script>

<template>
    <div id="url-generate">
        <v-row class="mx-5 mt-5">
            <v-col cols="12">
                <v-row wrap>
                    <v-col cols="12">
                        <v-card>

                            <v-card-title class="justify-center">
                                <h4>{{ $t('container.api_manager.url_generate.list') }}</h4>
                            </v-card-title>


                            <!-- <v-divider></v-divider> -->

                            <v-card-text>
                                <v-card-title class="mb-5">
                                    <div class="d-flex justify-sm-end flex-wrap">
                                        <v-text-field @keyup.native="PageSetup" v-model="search"
                                            append-icon="mdi-magnify" :label="$t(
                                            'container.list.search'
                                        )" hide-details class="mb-5 my-sm-0 my-3 mx-0v -input--horizontal" flat
                                            outlined dense></v-text-field>
                                    </div>

                                    <v-spacer></v-spacer>



                                    <!-- <v-col lg="4" md="6" cols="12" class="text-right">
                                        <v-btn elevation="2" class="btn mr-2 white--text" flat color="red darken-4"
                                            @click="GeneratePdf()">
                                            <v-icon class="pr-1"> mdi-tray-arrow-down </v-icon> {{
                                            $t("container.list.PDF") }}
                                        </v-btn>
                                        <v-btn elevation="2" flat class="btn mr-2 white--text" color="teal darken-2"
                                            @click="GenerateExcel()">
                                            <v-icon class="pr-1"> mdi-tray-arrow-down </v-icon>
                                            {{ $t("container.list.excel") }}
                                        </v-btn>
                                    </v-col> -->

                                    <v-btn medium flat color="primary" router to="/api-manager/url-generate/create"
                                        v-can="'url-create'">
                                        <v-icon small left>mdi-plus</v-icon>
                                        <span>{{
                                            $t('container.list.add_new') }}</span>
                                    </v-btn>
                                </v-card-title>

                                <v-card-subtitle>
                                    {{ $t('container.list.total') }}:&nbsp;<span style="font-weight: bold;">
                                        {{ language === 'bn' ? $helpers.englishToBangla(
                                        this.total) : this.total}}
                                    </span>

                                    <v-data-table :loading="loading" item-key="id" :headers="headers" :items="urls"
                                        :items-per-page="pagination.perPage" hide-default-footer
                                        class="elevation-0 transparent row-pointer mt-5">
                                        <template v-slot:item.id="{ item, index }">

                                            {{ language === 'bn' ? $helpers.englishToBangla(
                                            (pagination.current - 1) * pagination.perPage +
                                            index +
                                            1) : (pagination.current - 1) * pagination.perPage +
                                            index +
                                            1 }}


                                        </template>


                                        <template v-slot:item.name="{ item }">
                                            {{ item.name }}
                                        </template>

                                        <!-- Action Button -->
                                        <template v-slot:item.actions="{ item }">
                                            <v-tooltip top>
                                                <template v-slot:activator="{ on }">
                                                    <v-btn v-can="'url-view'" fab x-small v-on="on" color="#AFB42B"
                                                        elevation="0" router class="mr-3 white--text" 
                                                        :to="`/api-manager/url-generate/view/${item.id}`">
                                                        <v-icon> mdi-eye </v-icon>
                                                    </v-btn>
                                                </template>
                                                <span>
                                                    {{ $t("container.list.view") }}
                                                </span>
                                            </v-tooltip>
                                            <v-tooltip top>
                                                <template v-slot:activator="{ on }">
                                                    <v-btn v-can="'url-edit'" fab x-small v-on="on" color="success"
                                                        elevation="0" router
                                                        :to="`/api-manager/url-generate/edit/${item.id}`">
                                                        <v-icon> mdi-account-edit-outline </v-icon>
                                                    </v-btn>
                                                </template>
                                                <span>
                                                    {{ $t("container.list.edit") }}
                                                </span>
                                            </v-tooltip>

                                            <v-tooltip top>
                                                <template v-slot:activator="{ on }">
                                                    <v-btn v-can="'url-delete'" fab x-small v-on="on" color="grey"
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
                                </v-card-subtitle>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>

            <!-- delete modal  -->
            <v-dialog v-model="deleteDialog" width="350">
                <v-card style="justify-content: center; text-align: center">
                    <v-card-title class="font-weight-bold justify-center">
                        {{ $t('container.api_manager.url_generate.delete_header') }}
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                        <div class="subtitle-1 font-weight-medium mt-5">
                            {{ $t('container.api_manager.url_generate.delete_alert') }}


                        </div>
                    </v-card-text>
                    <v-card-actions style="display: block">
                        <v-row class="mx-0 my-0 py-2" justify="center">
                            <v-btn text @click="deleteDialog = false" outlined class="custom-btn-width py-2 mr-10">
                                {{ $t('container.list.cancel') }}
                            </v-btn>

                            <v-btn text @click="deleteURL" color="white" :loading="delete_loading"
                                class="custom-btn-width warning white--text py-2">
                                {{ $t('container.list.delete') }}
                            </v-btn>
                        </v-row>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <!-- delete modal  -->
        </v-row>
    </div>
</template>

<style lang="css" scoped></style>