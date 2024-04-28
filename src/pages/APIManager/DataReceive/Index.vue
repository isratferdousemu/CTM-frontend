<script>
import {ValidationObserver } from "vee-validate";
export default {
    name: "Index",
    title: "CTM - API Data Receiver",
    data() {
        return {
            data: {
                id: null,
                code: null,
                name_en: null,
                name_bn: null,
            },
            showPassword: false,
            total: null,
            org_name:null,
            module_id:null,
            modules:[],

            dialogAdd: false,
            deleteDialog: false,
            dialogEmail: false,
            delete_loading: false,
            loading: false,
            search: "",
            delete_id: "",
            email_id: "",
           
            apis:[],

            errors: {},
            error_status: {},
            pagination: {
                current: 1,
                total: 0,
                perPage: 5
            },
            sortBy: "name_en",
            sortDesc: false, //ASC
            items: [5, 10, 15, 20, 40, 50, 100],
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
                { text: this.$t('container.list.sl'), value: "id", align: "start", sortable: false, width: "5%" },
                { text: this.$t('container.api_manager.data_receiver.organization'), value: "organization_name", width: "20%" },
                { text: this.$t('container.api_manager.data_receiver.api'), value: "api_list_custom", width: "25%" },
                { text: this.$t('container.api_manager.data_receiver.total_heat'), value: "total_hit", width: "5%" },
                { text: this.$t('container.api_manager.data_receiver.api_key'), value: "api_key_custom", width: "5%" },
                { text: this.$t('container.list.action'), value: "actions", align: "center", sortable: false, width: "40%" },
            ];
        },


    },

    mounted() {
        this.GetDataReceiver();
        this.GetModule();

    },

    methods: {
        togglePasswordVisibility() {
            this.showPassword = !this.showPassword;
        },
        sendEmail(){
            this.$axios
                .get(`/admin/api-manager/send-email/${this.email_id}`, {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                 
                 
                })
                .then((result) => {
                   
                    this.$toast.success(result?.data?.data);
                    this.dialogEmail=false;
                    
                   
    


                })
                .catch(error => {
                    console.error('Error generating PDF:', error);
                });
        },
        resetSearch(){
            this.module_id=null;
            this.org_name=null;
            this.GetDataReceiver();
        },
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
                .get("/admin/api-data-receive", {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                    params: queryParams,
                })
                .then((result) => {
                    this.apis = result?.data?.data?.data;
                    // const parts = this.apis.start_date.split(" ");
                    // const datePart = parts[0];
                    // this.apis.start_date = datePart;
                    // const parts_2 = this.apis.end_date.split(" ");
                    // const datePart_2 = parts_2[0];
                    // this.apis.end_date = datePart_2;
                });

            const HeaderInfo = [
                this.$t("container.list.sl"),
                this.$t('container.api_manager.data_receiver.organization'),
                this.$t('container.api_manager.data_receiver.api'),
                this.$t('container.api_manager.data_receiver.email'),
                this.$t('container.api_manager.data_receiver.phone'),
                this.$t('container.api_manager.data_receiver.responsible_person_email'),
                this.$t('container.api_manager.data_receiver.responsible_person_nid'),
                this.$t('container.api_manager.data_receiver.user_name'),
                this.$t('container.api_manager.data_receiver.ip'),
                this.$t('container.api_manager.data_receiver.total_heat'),
                 this.$t('container.api_manager.data_receiver.start_date'),
                this.$t('container.api_manager.data_receiver.end_date'),
                

            ]

        
            const CustomInfo = this.apis.map(((i, index) => {

                return [
                    this.$i18n.locale == 'en' ? index + 1 : this.$helpers.englishToBangla(index + 1),
                    
                    this.$i18n.locale == 'en' ? i.organization_name : i.organization_name,
                  
                    i?.api_list?.map(api => api.name).join(', '),
                    this.$i18n.locale == 'en' ? i.organization_phone : this.$helpers.englishToBangla(i.organization_phone),
                    this.$i18n.locale == 'en' ? i?.organization_email : i?.organization_email,
                    this.$i18n.locale == 'en' ? i?.responsible_person_email : i?.responsible_person_email,
                    this.$i18n.locale == 'en' ? i.responsible_person_nid : this.$helpers.englishToBangla(i.responsible_person_nid),
                    this.$i18n.locale == 'en' ? i?.username : i?.username,
                    this.$i18n.locale == 'en' ? i?.whitelist_ip : this.$helpers.englishToBangla(i?.whitelist_ip),
                    this.$i18n.locale == 'en' ? i?.total_hit : this.$helpers.englishToBangla(i?.total_hit),
                    this.$i18n.locale == 'en' ? i?.start_date : this.$helpers.englishToBangla(i?.start_date),
                    this.$i18n.locale == 'en' ? i?.end_date : this.$helpers.englishToBangla(i?.end_date),
                


                ]
            }));

            const queryParam = {
                language: this.$i18n.locale,
                data: CustomInfo,
                header: HeaderInfo,
                fileName: this.$t("container.api_manager.data_receiver.list"),
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
                page: 1,
                sortBy: this.sortBy,
                orderBy: this.sortDesc,
            };

            await this.$axios
                .get("/admin/api-data-receive", {
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
                        this.$t('container.api_manager.data_receiver.organization'),
                        this.$t('container.api_manager.data_receiver.api'),
                        this.$t('container.api_manager.data_receiver.email'),
                        this.$t('container.api_manager.data_receiver.phone'),
                        this.$t('container.api_manager.data_receiver.responsible_person_email'),
                        this.$t('container.api_manager.data_receiver.responsible_person_nid'),
                        this.$t('container.api_manager.data_receiver.user_name'),
                        this.$t('container.api_manager.data_receiver.ip'),
                        this.$t('container.api_manager.data_receiver.total_heat'),
                        this.$t('container.api_manager.data_receiver.start_date'),
                        this.$t('container.api_manager.data_receiver.end_date'),
                    ]

                    const CustomInfo = this.apis.map(((i, index) => {
                        return {
                            "sl": this.$i18n.locale == 'en' ? index + 1 : this.$helpers.englishToBangla(index + 1),
                            "organization_name": this.$i18n.locale == 'en' ? i?.organization_name : i?.organization_name,

                            // "ip":i?.api_list?.map(api => api.name).join(', '),
                            "ip": this.$i18n.locale == 'en' ? i?.api_list?.map(api => api.name).join(', ') : i?.api_list?.map(api => api.name).join(', '),
                            "organization_email": this.$i18n.locale == 'en' ? i?.organization_email : i?.organization_email,
                            "organization_phone": this.$i18n.locale == 'en' ? i.organization_phone : this.$helpers.englishToBangla(i.organization_phone),
                         
                            "responsible_person_email": this.$i18n.locale == 'en' ? i?.organization_name : i?.responsible_person_email,
                            "responsible_person_nid": this.$i18n.locale == 'en' ? i?.responsible_person_nid : this.$helpers.englishToBangla(i?.responsible_person_nid),
                            "username": this.$i18n.locale == 'en' ? i?.username : i?.username,
                            "whitelist_ip": this.$i18n.locale == 'en' ? i?.whitelist_ip : this.$helpers.englishToBangla(i?.whitelist_ip),
                            "total_hit": this.$i18n.locale == 'en' ? i?.total_hit : this.$helpers.englishToBangla(i?.total_hit),
                            "start_date": this.$i18n.locale == 'en' ? i?.start_date : this.$helpers.englishToBangla(i?.start_date),
                            "end_date": this.$i18n.locale == 'en' ? i?.end_date : this.$helpers.englishToBangla(i?.end_date),

                            


                        }
                    }));

                    const Field = ['sl', 'organization_name', 'ip','organization_email', 'organization_phone',  'responsible_person_email', 'responsible_person_nid', 'username', 'whitelist_ip','total_hit','start_date','end_date']

                    const Data = this.FormatJson(Field, CustomInfo)
                    const currentDate = new Date().toISOString().slice(0, 10); //
                    let dateinfo = queryParams.language == 'en' ? currentDate : this.$helpers.englishToBangla(currentDate)

                    const filenameWithDate = `${dateinfo}_${this.$t("container.api_manager.api_generate.list_1")}`;

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

    
        localizationPage(item) {

            return this.language === 'bn' ? item.name_bn : item.name_en;


        },
        PageSetup() {
            this.pagination.current = 1;
            this.GetDataReceiver();

        },
        async GetModule(){
        
            this.$axios
                .get("/admin/get-modules", {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                  
                })
                .then((result) => {

                    
                    this.modules = result?.data?.data;
                  
                 

                });
        },
        async GetDataReceiver() {
            
            this.loading=true;
            const queryParams = {
                module_id: this.module_id,
                org_name: this.org_name,
                search: this.search,
                perPage: this.pagination.perPage,
                page: this.pagination.current,
                sortBy: this.sortBy,
                sortDesc: this.sortDesc,
            };
            this.$axios
                .get("/admin/api-data-receive", {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                    params: queryParams,
                })
                .then((result) => {

                    this.total = result?.data?.data?.total;
                    this.apis = result?.data?.data?.data;
                    console.log(this.apis,"apis")
                    this.pagination.current = result?.data?.data?.current_page;
                    this.pagination.total = result?.data?.data?.last_page;
                    this.pagination.grand_total = result?.data?.data?.total;
                    this.loading=false;
                 
                });
        },
        onPageChange($event) {
            // this.pagination.current = $event;
            this.GetDataReceiver();
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



        emailAlert(id) {
            this.dialogEmail = true;
            this.email_id = id;
        },

        deleteAlert(id) {
            this.deleteDialog = true;
            this.deleted_id = id;
        },

        deleteDataReceiver: async function () {
            this.$axios
                .delete(`admin/api-data-receive/${this.deleted_id}`, {
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
                        this.GetDataReceiver();
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
                        <v-expansion-panels>
                            <v-expansion-panel>
                                <v-expansion-panel-header color="#8C9EFF">
                                    <h3 class="white--text">
                                        {{ $t("container.list.filter") }}
                                    </h3>
                                </v-expansion-panel-header>
                                <v-expansion-panel-content class="mt-5">

                                    <form @submit.prevent="GetDataReceiver()">

                                        <v-row>

                                            <v-col lg="4" md="4" cols="12">
                                                <v-autocomplete outlined dense :append-icon-cb="appendIconCallback"
                                                    append-icon="mdi-plus" class="no-arrow-icon" v-model="module_id"
                                                    :items="modules" item-text="name" item-value="id"
                                                    :label="$t('container.api_manager.api_generate.module')">
                                                </v-autocomplete>
                                            </v-col>
                                            <v-col lg="4" md="4" cols="12">
                                                <v-text-field outlined clearable dense
                                                    :append-icon-cb="appendIconCallback" append-icon="mdi-plus"
                                                    v-model="org_name"
                                                    :label="$t('container.api_manager.data_receiver.organization') ">
                                                </v-text-field>
                                            </v-col>
                                            <v-col lg="4" md="4" cols="12">
                                                <div class="d-inline d-flex justify-end">
                                                    <v-btn elevation="2" class="btn" @click="resetSearch">{{
                                                        $t("container.list.reset")
                                                        }}</v-btn>
                                                    <v-btn elevation="2" type="submit" class="btn ml-2"
                                                        color="success">{{
                                                        $t("container.list.filter") }}</v-btn>
                                                </div>

                                            </v-col>

                                        </v-row>


                                    </form>

                                </v-expansion-panel-content>
                            </v-expansion-panel>
                        </v-expansion-panels>
                    </v-col>
                    <v-col cols="12">
                        <v-card>

                            <v-card-title class="justify-center ">
                                <h4 class="mt-5">{{ $t('container.api_manager.data_receiver.list') }}</h4>
                            </v-card-title>


                            <!-- <v-divider></v-divider> -->

                            <v-card-text class="mt-10">
                                <v-card-title class="mb-5 ml-5 ">
                                    <div class="d-flex justify-sm-end flex-wrap">
                                        <v-text-field @keyup.native="PageSetup" v-model="search"
                                            append-icon="mdi-magnify" :label="$t(
                                    'container.list.search'
                                )" hide-details class="mb-5 my-sm-0 my-3 mx-0v -input--horizontal" flat outlined
                                            dense></v-text-field>
                                    </div>

                                    <v-spacer></v-spacer>





                                    <v-btn flat color="primary" router to="/api-manager/data-receiver/generate"
                                        v-can="'data-receiver-create'">
                                        <v-icon small>mdi-plus</v-icon>
                                        {{
                                        $t('container.api_manager.data_receiver.add') }}
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
                                    class="elevation-0 transparent row-pointer mt-5 mx-5">
                                    <template v-slot:item.id="{ item, index }">

                                        {{ language === 'bn' ? $helpers.englishToBangla(
                                        (pagination.current - 1) * pagination.perPage +
                                        index +
                                        1) : (pagination.current - 1) * pagination.perPage +
                                        index +
                                        1 }}


                                    </template>




                                    <template v-slot:item.api_list_custom="{ item }">
                                        <div>
                                            <v-chip label color="#FACD91" v-for="(name, index) in item.api_list"
                                                class="ma-1" :key="index">{{ name.name
                                                }}</v-chip>
                                        </div>
                                    </template>

                                    <template v-slot:item.api_key_custom="{ item }">
                                        <v-row align="center">
                                            <span>
                                                <span v-if="!showPassword">
                                                    <span v-for="char in item.api_key" :key="char">*</span>
                                                </span>
                                                <span v-else>{{ item.api_key }}</span>
                                                <v-icon @click="togglePasswordVisibility">{{ showPassword ?
                                                    'mdi-eye-off' : 'mdi-eye' }}</v-icon>
                                            </span>
                                        </v-row>

                                    </template>





                                    <!-- Action Button -->
                                    <template v-slot:item.actions="{ item }">
                                        <v-tooltip top>
                                            <template v-slot:activator="{ on }">
                                                <v-btn v-can="'apiDataReceive-view'" fab x-small v-on="on"
                                                    color="#AFB42B" elevation="0" router class="mr-3 white--text"
                                                    :to="`/api-manager/data-receiver/view/${item.id}`">
                                                    <v-icon> mdi-eye </v-icon>
                                                </v-btn>
                                            </template>
                                            <span>
                                                {{ $t("container.list.view") }}
                                            </span>
                                        </v-tooltip>
                                        <v-tooltip top>
                                            <template v-slot:activator="{ on }">
                                                <v-btn v-can="'apiDataReceive-edit'" fab x-small v-on="on"
                                                    color="success" elevation="0" router
                                                    :to="`/api-manager/data-receiver/edit/${item.id}`">
                                                    <v-icon> mdi-account-edit-outline </v-icon>
                                                </v-btn>
                                            </template>
                                            <span>
                                                {{ $t("container.list.edit") }}
                                            </span>
                                        </v-tooltip>

                                        <v-tooltip top>
                                            <template v-slot:activator="{ on }">
                                                <v-btn v-can="'apiDataReceive-delete'" fab x-small v-on="on"
                                                    color="grey" class="ml-3 white--text" elevation="0"
                                                    @click="deleteAlert(item.id)">
                                                    <v-icon> mdi-delete </v-icon>
                                                </v-btn>
                                            </template>
                                            <span> {{ $t("container.list.delete") }}</span>
                                        </v-tooltip>
                                        <v-tooltip top>
                                            <template v-slot:activator="{ on }">
                                                <v-btn fab x-small v-on="on" color="cyan darken-4"
                                                    class="ml-3 white--text" elevation="0" @click="emailAlert(item.id)">
                                                    <v-icon> mdi mdi-email-alert </v-icon>
                                                </v-btn>
                                            </template>
                                            <span> {{ $t("container.list.email") }}</span>
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
                                            <!-- :item-text="localizationPage" item-value="name_en"  -->
                                            <v-pagination circle primary v-model="pagination.current"
                                                :length="pagination.total" @input="onPageChange" :total-visible="11"
                                                class="custom-pagination-item"></v-pagination>
                                        </div>
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
                    <v-card-title class="font-weight-bold justify-center">
                        {{ $t('container.api_manager.data_receiver.delete_header') }}
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                        <div class="subtitle-1 font-weight-medium mt-5">
                            {{ $t('container.api_manager.data_receiver.delete_alert') }}


                        </div>
                    </v-card-text>
                    <v-card-actions style="display: block">
                        <v-row class="mx-0 my-0 py-2" justify="center">
                            <v-btn text @click="deleteDialog = false" outlined class="custom-btn-width py-2 mr-10">
                                {{ $t('container.list.cancel') }}
                            </v-btn>

                            <v-btn text @click="deleteDataReceiver" color="white" :loading="delete_loading"
                                class="custom-btn-width warning white--text py-2">
                                {{ $t('container.list.delete') }}
                            </v-btn>
                        </v-row>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <!-- delete modal  -->
            <!-- Mail modal  -->
            <v-dialog v-model="dialogEmail" width="350">
                <v-card style="justify-content: center; text-align: center">
                    <v-card-title class="font-weight-bold justify-center">
                        {{ $t('container.api_manager.data_receiver.email_header') }}
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                        <div class="subtitle-1 font-weight-medium mt-5">
                            {{ $t('container.api_manager.data_receiver.email_alert') }}


                        </div>
                    </v-card-text>
                    <v-card-actions style="display: block">
                        <v-row class="mx-0 my-0 py-2" justify="center">
                            <v-btn text @click="dialogEmail = false" outlined class="custom-btn-width py-2 mr-10">
                                {{ $t('container.list.cancel') }}
                            </v-btn>

                            <v-btn text @click="sendEmail" color="white" :loading="delete_loading"
                                class="custom-btn-width warning white--text py-2">
                                {{ $t('container.list.confirm') }}
                            </v-btn>
                        </v-row>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <!-- Mail modal  -->
        </v-row>
    </div>
</template>

<style>
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
.gradient-background {
    background: linear-gradient(to right, #87CEEB, #ADD8E6, #F0F8FF);
    color: black;
    /* Adjust text color for better contrast */
    border-radius: 10px;
    /* Add rounded corners for a softer look */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    /* Add a subtle shadow for depth */

    /* Add a subtle animation */
    animation: gradient-animation 10s infinite alternate;
}

/* Define the animation */
@keyframes gradient-animation {
    0% {
        background-position: 0% 50%;
    }

    100% {
        background-position: 100% 50%;
    }
}
</style>