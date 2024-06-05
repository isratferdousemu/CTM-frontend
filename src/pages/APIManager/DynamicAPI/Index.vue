<script>

export default {
    name: "Index",
    title: "CTM - API Generate",
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
            apis: [],
            Alldivisions: [],
            errors: {},
            error_status: {},
            pagination: {
                current: 1,
                total: 0,
                perPage: 5
            },
            sortBy: "name_en",
            sortDesc: false, //ASC
            items:[5,10, 15, 20, 40, 50, 100],
            // items: 
            // [
            //         {
            //             "name_en": 5,
            //             "name_bn": "৫"
            //         },
            //         {
            //             "name_en": 10,
            //             "name_bn": "১০"
            //         },
               
            //     {
            //         "name_en": 30,
            //         "name_bn": "৩০"
            //     },
            //     {
            //         "name_en": 40,
            //         "name_bn": "৪০"
            //     },
            //     {
            //         "name_en": 50,
            //         "name_bn": "৫০"
            //     },
                   
               
            //     {
            //         "name_en": 100,
            //         "name_bn": "১০০"
            //     }
            // ]
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
                { text: this.$t('container.list.sl'), value: "id", align: "start", sortable: false, width: "15%" },
                { text: this.$t('container.api_manager.api_generate.api_name'), value: "name", width: "20%" },
                { text: this.$t('container.api_manager.api_generate.parameter'), value: "selected_columns", width: "45%"  },
         

                { text: this.$t('container.list.action'), value: "actions", align: "center", sortable: false, width: "20%"  },
            ];
        },

      
    },

    mounted() {
        this.GetAPI();
     
    },

    methods: {
        async GeneratePDF() {
            this.isLoading = true;
            let page;
            if (!this.sortBy) {
                page = this.pagination.current;
            }
            const queryParams = {
                language: this.$i18n.locale,
                searchText: this.search,
                perPage: this.search.trim() === '' ? this.total : this.total,
                page: 1,
                sortBy: this.sortBy,
                orderBy: this.sortDesc,
            };

            await this.$axios
                .get("/admin/api-list", {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                    params: queryParams,
                })
                .then((result) => {
                    this.apis = result?.data?.data?.data;
                });

            const HeaderInfo = [
                this.$t("container.list.sl"), 
                this.$t('container.api_manager.api_generate.api_name'),
                this.$t('container.api_manager.api_generate.parameter'),
               
            ]
            

            const CustomInfo = this.apis.map(((i, index) => {

                return [
                    this.$i18n.locale == 'en' ? index + 1 : this.$helpers.englishToBangla(index + 1),
                    this.$i18n.locale == 'en' ? i.name : i.name,
                    i.selected_columns ? i.selected_columns?.join(', ') : '',
                ]
            }));

            const queryParam = {
                language: this.$i18n.locale,
                data: CustomInfo,
                header: HeaderInfo,
                fileName: this.$t("container.api_manager.api_generate.list"),
            };
            try {
                const response = await this.$axios.post("/admin/generate-pdf", queryParam, {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "application/json", // Set content type to JSON
                    },
                    responseType: 'arraybuffer',
                });

                const blob = new Blob([response.data], { type: 'application/pdf' });
                const url = window.URL.createObjectURL(blob);
                window.open(url, '_blank');
                this.isLoading = false;
            } catch (error) {
                this.isLoading = false;
                console.error('Error generating PDF:', error);
            }
        },
        async GenerateExcel() {
            this.isLoading = true;
            let page;
            if (!this.sortBy) {
                page = this.pagination.current;
            }
            const queryParams = {
                language: this.$i18n.locale,
                searchText: this.search,
                perPage: this.search.trim() === '' ? this.total : this.total,
                page: this.pagination.current,
                sortBy: this.sortBy,
                orderBy: this.sortDesc,
            };

            await this.$axios
                .get("/admin/api-list", {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                    params: queryParams,
                })
                .then((result) => {
                    this.apis = result?.data?.data?.data;
                })
                .catch(error => {
                    this.isLoading = false;
                });

            try {
                import('@/plugins/Export2Excel').then((excel) => {

                    const HeaderInfo = [
                        this.$t("container.list.sl"),
                        this.$t('container.api_manager.api_generate.api_name'),
                        this.$t('container.api_manager.api_generate.parameter'),
                    ]

                    const CustomInfo = this.apis.map(((i, index) => {
                        return {
                            "sl": this.$i18n.locale == 'en' ? index + 1 : this.$helpers.englishToBangla(index + 1),
                            "name": this.$i18n.locale == 'en' ? i.name : i.name,
                            "parameter": i.selected_columns ? i.selected_columns?.join(', ') : '',
                        }
                    }));

                    const Field = ['sl', 'name','parameter']

                    const Data = this.FormatJson(Field, CustomInfo)
                    const currentDate = new Date().toISOString().slice(0, 10); //
                    let dateinfo = queryParams.language == 'en' ? currentDate : this.$helpers.englishToBangla(currentDate)

                    const filenameWithDate = `${dateinfo}_${this.$t("container.api_manager.api_generate.list")}`;

                    excel.export_json_to_excel({
                        header: HeaderInfo,
                        data: Data,
                        sheetName: filenameWithDate,
                        filename: filenameWithDate,
                        autoWidth: true,
                        bookType: "xlsx"
                    })
                })
            } catch (error) {
                // Handle any errors here
                this.isLoading = false;
            } finally {
                this.isLoading = false;
            }
        },
        FormatJson(FilterData, JsonData) {
            return JsonData.map((v) =>
                FilterData.map((j => {
                    return v[j];
                })))
        },

    showMore(id){
         
            this.$router.push(`/api-manager/api-generate/view/${id}`);

    },
        localizationPage(item){
            
            return this.language === 'bn' ? item.name_bn : item.name_en;
         

        },
        PageSetup(){
             this.pagination.current=1;
            this.GetAPI();

        },
        async GetAPI() {
            this.loading=true;
            const queryParams = {
                search: this.search,
                perPage: this.pagination.perPage,
                page: this.pagination.current,
                sortBy: this.sortBy,
                sortDesc: this.sortDesc,
            };
            this.$axios
                .get("/admin/api-list", {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                    params: queryParams,
                })
                .then((result) => {
                     this.loading=false;
                    this.total = result?.data?.data?.total;
                    this.apis = result?.data?.data.data;
                    this.pagination.current = result?.data?.data?.current_page;
                    this.pagination.total = result?.data?.data?.last_page;
                    this.pagination.grand_total = result?.data?.data?.total;
                });
        },
        onPageChange($event) {
            // this.pagination.current = $event;
            this.GetAPI();
        },
        perPageChange($event) {
            this.pagination.current = 1;
            this.GetAPI();
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
                .delete(`admin/api-list/${this.deleted_id }`, {
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
                        this.GetAPI();
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
            <v-col cols="12" lg="12" md="12" sm="12" xs="12">
                <v-row wrap>
                    <v-col cols="12" lg="12" md="12" sm="12" xs="12">
                        <v-card>

                            <v-card-title class="justify-center"
                                style="background-color:#1c3b68;color:white;margin-bottom: 17px;">
                                <h4>{{ $t('container.api_manager.api_generate.list') }}</h4>
                            </v-card-title>


                            <!-- <v-divider></v-divider> -->

                            <v-card-text>
                                <v-card-title class="mb-5 ml-5">
                                    <div class="d-flex justify-sm-end flex-wrap">
                                        <v-text-field @keyup.native="PageSetup" v-model="search"
                                            append-icon="mdi-magnify" :label="$t(
                                            'container.list.search'
                                        )" hide-details class="mb-5 my-sm-0 my-3 mx-0v -input--horizontal" flat
                                            outlined dense></v-text-field>
                                    </div>

                                    <v-spacer></v-spacer>




                                    <v-btn medium flat class="mr-5" color="primary" router
                                        to="/api-manager/api-generate/create" v-can="'api-create'">
                                        <v-icon small left>mdi-plus</v-icon>
                                        <span>{{
                                            $t('container.api_manager.api_generate.add_new') }}</span>
                                    </v-btn>
                                </v-card-title>

                                <v-row class="mx-6">
                                    <v-col cols="12" lg="6" md="6">
                                        {{ $t('container.list.total') }}:&nbsp;<span style=" font-weight: bold;">
                                            {{ language === 'bn' ? $helpers.englishToBangla(
                                            this.total) : this.total }}
                                        </span>

                                    </v-col>
                                    <v-col cols="12" lg="6" md="6" class="text-right">
                                        <v-btn elevation="2" class="btn white--text " flat color="red darken-4"
                                            @click="GeneratePDF()">
                                            <v-icon class="pr-1"> mdi-tray-arrow-down </v-icon> {{
                                            $t("container.list.PDF") }}
                                        </v-btn>
                                        <v-btn elevation="2" class="btn white--text ml-2" flat color="teal darken-2"
                                            @click="GenerateExcel()">
                                            <v-icon class="pr-1"> mdi-tray-arrow-down </v-icon> {{
                                            $t("container.list.excel") }}
                                        </v-btn>

                                    </v-col>





                                </v-row>
                                <v-data-table :loading="loading" item-key="id" :headers="headers" :items="apis"
                                    :items-per-page="pagination.perPage" hide-default-footer
                                    class="elevation-0 transparent row-pointer mt-5 mx-5 ">
                                    <template v-slot:item.id="{ item, index }">

                                        {{ language === 'bn' ? $helpers.englishToBangla(
                                        (pagination.current - 1) * pagination.perPage +
                                        index +
                                        1) : (pagination.current - 1) * pagination.perPage +
                                        index +
                                        1 }}


                                    </template>



                                    <template v-slot:item.selected_columns="{ item }">
                                        <span v-for="(value, key) in item.selected_columns" :key="key">
                                            <v-chip small label color="#FACD91" class="ma-1" v-if="key < 10">
                                                {{ value }}
                                            </v-chip> &nbsp;
                                            <v-btn color="#FACD91" class="text-caption"
                                                v-if="key == 9 && Object.keys(item.selected_columns).length > 10"
                                                x-small @click="showMore(item.id)">+{{
                                                Object.keys(item.selected_columns).length - 10 }} more</v-btn>

                                        </span>
                                        <!-- <br><br>
                                        <span v-for="(value, key) in item.selected_columns" :key="key">
                                            <v-chip small label color="#FACD91" class="ma-1 ">
                                                {{ value }}
                                            </v-chip>
                                        </span> -->

                                    </template>





                                    <!-- Action Button -->
                                    <template v-slot:item.actions="{ item }">
                                        <v-tooltip top>
                                            <template v-slot:activator="{ on }">
                                                <v-btn v-can="'url-view'" fab x-small v-on="on" color="#AFB42B"
                                                    elevation="0" router class="mr-3 white--text"
                                                    :to="`/api-manager/api-generate/view/${item.id}`">
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
                                                    :to="`/api-manager/api-generate/edit/${item.id}`">
                                                    <v-icon> mdi-account-edit-outline </v-icon>
                                                </v-btn>
                                            </template>
                                            <span>
                                                {{ $t("container.list.edit") }}
                                            </span>
                                        </v-tooltip>

                                        <v-tooltip top>
                                            <template v-slot:activator="{ on }">
                                                <v-btn v-can="'api-delete'" fab x-small v-on="on" color="grey"
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

                                        <v-row class="text-right pt-2 v-data-footer justify-end pb-2">
                                            <v-col cols="12" lg="4" md="4" sm="12" xs="12" class="text-right">
                                                <v-pagination circle primary v-model="pagination.current"
                                                    :length="pagination.total" @input="onPageChange" :total-visible="11"
                                                    class="custom-pagination-item"></v-pagination>
                                            </v-col>
                                            <v-col cols="12" lg="4" md="4" sm="12" xs="12" class="text-right">
                                                <v-select :items="items" hide-details dense outlined
                                                    @change="perPageChange" v-model="pagination.perPage"></v-select>
                                            </v-col>
                                        </v-row>
                                    </template>
                                </v-data-table>

                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>

            <!-- delete modal  -->
            <v-dialog v-model="deleteDialog" width="350">
                <v-card style="justify-content: center; text-align: center">
                    <v-card-title class="font-weight-bold justify-center"
                        style="background-color:#1c3b68;color:white;margin-bottom: 17px;">
                        {{ $t('container.api_manager.api_generate.delete_header') }}
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                        <div class="subtitle-1 font-weight-medium mt-5">
                            {{ $t('container.api_manager.api_generate.delete_alert') }}


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

<style  >
.text-wrap {
    /* You can adjust these properties as needed */
    overflow-wrap: break-word;
    /* Handles long words */
    word-wrap: break-word;
    /* Handles long words */
    white-space: pre-wrap;
    /* Handles spaces and line breaks */
}
.word-wrap {
    overflow-wrap: break-word;
}
.custom-chip {
    background-color: blue;
    color: white;
}
</style>