<script>
import {ValidationObserver } from "vee-validate";
export default {
    name: "Index",
    title: "CTM - Trainer Information",
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
            organization_names:[],
            trainers: [],

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
                { text: this.$t('container.list.sl'), value: "sl", align: "start", sortable: false, width: "5%" },
                { text: this.$t('container.training_management.trainer_info.ID'), value: "id_no", align: "start", width: "15%", sortable: false, },
                { text: this.$t('container.training_management.trainer_info.name'), value: "name", width: "20%" },
                { text: this.$t('container.training_management.trainer_info.designation'), value: "designation", width: "15%", sortable: false, },
            
                { text: this.$t('container.training_management.trainer_info.email'), value: "email", width: "10%" },
                { text: this.$t('container.list.status'), value: "status", width: "15%", sortable: false, },

              
                { text: this.$t('container.list.action'), value: "actions", align: "start", sortable: false, width: "15%" },
            ];
        },


    },

    mounted() {
        this.GetData();
       
    
   

    },

    methods: {
        deviceActivate(id) {
            console.log(id,"id");

      
            this.$axios
                .get(`admin/training/trainers/status/${id}`, {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((result) => {
                    this.$toast.success(result?.data?.message);
       
                    this.GetData();
                   
                
              


                })
                .catch((err) => {
                    console.log(err, "err")
                    this.$toast.error(err.response.data.errors.email[0]);
                    this.$refs.form.setErrors(err.response.data.errors);

                });

        },
       
        resetSearch(){
            this.module_id=null;
            this.org_name=null;
            this.GetData();
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
                .get("/admin/training/trainers", {
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
                this.$t('container.training_management.trainer_info.ID'),
                this.$t('container.training_management.trainer_info.name'),
                this.$t('container.training_management.trainer_info.designation'),
                this.$t('container.training_management.trainer_info.mobile'),
                this.$t('container.training_management.trainer_info.email'),
                 this.$t('container.training_management.trainer_info.address'),
                this.$t('container.training_management.trainer_info.description'),
                this.$t('container.list.status'),
               
                

            ]
           

        
            const CustomInfo = this.apis.map(((i, index) => {

                return [
                    this.$i18n.locale == 'en' ? index + 1 : this.$helpers.englishToBangla(index + 1),
                    
                    this.$i18n.locale == 'en' ? i.id : this.$helpers.englishToBangla(i.id),
                    this.$i18n.locale == 'en' ? i.name : i.name,
                    this.$i18n.locale == 'en' ? i?.designation?.value_en : i?.designation?.value_bn,
                  
               
                    this.$i18n.locale == 'en' ? i.mobile_no : this.$helpers.englishToBangla(i.mobile_no),
                    this.$i18n.locale == 'en' ? i?.email : i?.email,
                    this.$i18n.locale == 'en' ? i?.address : i?.address,
                    this.$i18n.locale == 'en' ? i?.description : i?.description,
                   
                    this.$i18n.locale == 'en' ? (i.status == 0 ? 'Active' : 'Inactive') : (i.status == 0 ? 'সক্রিয়' : 'নিষ্ক্রিয়'),
                


                ]
            }));

            const queryParam = {
                language: this.$i18n.locale,
                data: CustomInfo,
                header: HeaderInfo,
                fileName: this.$t("container.training_management.trainer_info.list"),
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
                .get("/admin/training/trainers", {
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
                        this.$t('container.training_management.trainer_info.ID'),
                        this.$t('container.training_management.trainer_info.name'),
                        this.$t('container.training_management.trainer_info.designation'),
                        this.$t('container.training_management.trainer_info.mobile'),
                        this.$t('container.training_management.trainer_info.email'),
                        this.$t('container.training_management.trainer_info.address'),
                        this.$t('container.training_management.trainer_info.description'),
                        this.$t('container.list.status'),
                    ]

                    const CustomInfo = this.apis.map(((i, index) => {
                        return {
                           

                            "sl": this.$i18n.locale == 'en' ? index + 1 : this.$helpers.englishToBangla(index + 1),

                            "id": this.$i18n.locale == 'en' ? i.id : this.$helpers.englishToBangla(i.id),
                            "name": this.$i18n.locale == 'en' ? i.name : i.name,
                            "designation": this.$i18n.locale == 'en' ? i?.designation?.value_en : i?.designation?.value_bn,


                            "mobile": this.$i18n.locale == 'en' ? i.mobile_no : this.$helpers.englishToBangla(i.mobile_no),
                            "email": this.$i18n.locale == 'en' ? i?.email : i?.email,
                            "address": this.$i18n.locale == 'en' ? i?.address : i?.address,
                            "description": this.$i18n.locale == 'en' ? i?.description : i?.description,

                            "status": this.$i18n.locale == 'en' ? (i.status == 0 ? 'Active' : 'Inactive') : (i.status == 0 ? 'সক্রিয়' : 'নিষ্ক্রিয়')


                        }
                    }));

                    const Field = ['sl', 'id', 'name', 'designation', 'mobile', 'email', 'address','description', 'status']

                    const Data = this.FormatJson(Field, CustomInfo)
                    const currentDate = new Date().toISOString().slice(0, 10); //
                    let dateinfo = queryParams.language == 'en' ? currentDate : this.$helpers.englishToBangla(currentDate)

                    const filenameWithDate = `${dateinfo}_${this.$t("container.training_management.trainer_info.list_1")}`;

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
            this.GetData();

        },
       
        async GetData() {
            
            this.loading=true;
            const queryParams = {
                module_id: this.module_id,
            
                search: this.search,
                perPage: this.pagination.perPage,
                page: this.pagination.current,
                sortBy: this.sortBy,
                sortDesc: this.sortDesc,
            };
            this.$axios
                .get("/admin/training/trainers", {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                    params: queryParams,
                })
                .then((result) => {
                    console.log(result,"result")

                    this.total = result?.data?.data?.total;
                    this.trainers = result?.data?.data?.data;
                    console.log(this.trainers,"trainers")
                    this.pagination.current = result?.data?.data?.current_page;
                    this.pagination.total = result?.data?.data?.last_page;
                    this.pagination.grand_total = result?.data?.data?.total;
                    this.loading=false;
                  
                 
                });
        },
        onPageChange($event) {
            // this.pagination.current = $event;
            this.GetData();
        },
       


       
        deleteAlert(id) {
            this.deleteDialog = true;
            this.deleted_id = id;
        },

        deleteData: async function () {
            this.$axios
                .delete(`admin/training/trainers/${this.deleted_id}`, {
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
                        this.GetData();
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
    <div id="trainer-info">
        <v-row class="mx-5 mt-5">
            <v-col cols="12" lg="12" md="12" sm="12" xs="12">
                <v-row wrap>

                    <v-col cols="12">
                        <v-card>

                            <v-card-title class="justify-center"
                                style="background-color: #1C3B68; color: white;font-size: 17px;">
                                <h4 class=" white--text">{{ $t('container.training_management.trainer_info.list')
                                    }}</h4>
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





                                    <v-btn flat color="primary" router
                                        to="/training-management/trainer-information/create"
                                        v-can="'data-receiver-create'">
                                        <v-icon small>mdi-plus</v-icon>
                                        {{
                                        $t('container.training_management.trainer_info.add') }}
                                    </v-btn>

                                </v-card-title>

                                <v-row class="ml-6 mr-2">
                                    <v-col cols="12" lg="6" md="6">
                                        {{ $t('container.list.total') }}:&nbsp;<span style=" font-weight: bold;">
                                            {{ language === 'bn' ? $helpers.englishToBangla(
                                            this.total) : this.total }}
                                        </span>

                                    </v-col>
                                    <v-col cols="12" lg="6" md="6" class="text-right">
                                        <v-btn elevation="2" class="btn white--text " flat color="red darken-4"
                                            @click="GeneratePDF()">
                                            <v-icon class="pl-1"> mdi-tray-arrow-down </v-icon> {{
                                            $t("container.list.PDF") }}
                                        </v-btn>

                                        <v-btn elevation="2" class="btn white--text ml-2" flat color="teal darken-2"
                                            @click="GenerateExcel()">
                                            <v-icon class="pl-1"> mdi-tray-arrow-down </v-icon> {{
                                            $t("container.list.excel") }}
                                        </v-btn>

                                    </v-col>





                                </v-row>

                                <v-data-table :loading="loading" item-key="id" :headers="headers" :items="trainers"
                                    :items-per-page="pagination.perPage" hide-default-footer
                                    class="elevation-0 transparent row-pointer mt-5 mx-5">
                                    <template v-slot:item.sl="{ item, index }">

                                        {{ language === 'bn' ? $helpers.englishToBangla(
                                        (pagination.current - 1) * pagination.perPage +
                                        index +
                                        1) : (pagination.current - 1) * pagination.perPage +
                                        index +
                                        1 }}


                                    </template>
                                    <template v-slot:[`item.id_no`]="{ item }">
                                        <span>
                                            {{ language == 'bn' ?
                                            $helpers.englishToBangla(item.id): item.id }}
                                        </span>

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
                                                <span v-if="!item.showApiKey">
                                                    <span v-for="char in item.api_key" :key="char">*</span>
                                                </span>
                                                <span v-else>{{ item.api_key }}</span>
                                                <v-icon @click="toggleApiKeyVisibility(item)">
                                                    {{ item.showApiKey ? 'mdi-eye-off' : 'mdi-eye' }}
                                                </v-icon>
                                            </span>
                                        </v-row>

                                    </template>
                                    <template v-slot:[`item.status`]="{ item }">
                                        <span v-if="item.status == 0">
                                            {{ language == 'bn' ?
                                            'নিষ্ক্রিয়' : 'Inactive' }}
                                        </span>
                                        <span v-else>
                                            {{ language == 'bn' ?
                                            'সক্রিয়' : 'Active' }}
                                        </span>


                                        <span>
                                            <v-switch :input-value="item.status == 1 ? true : false"
                                                @change="deviceActivate( item.id)" hide-details
                                                color="orange darken-3"></v-switch>
                                        </span>
                                    </template>
                                    <template v-slot:[`item.designation`]="{ item }">
                                        <span>
                                            {{ language == 'bn' ?
                                            item?.designation?.value_bn : item?.designation?.value_en }}
                                        </span>

                                    </template>
                                    <template v-slot:[`item.mobile`]="{ item }">
                                        <span>
                                            {{ language == 'bn' ?
                                            $helpers.englishToBangla(item.mobile_no): item.mobile_no }}
                                        </span>

                                    </template>





                                    <!-- Action Button -->
                                    <template v-slot:item.actions="{ item }">
                                        <v-tooltip top>
                                            <template v-slot:activator="{ on }">
                                                <v-btn v-can="'trainerInfo-view'" fab x-small v-on="on" color="#AFB42B"
                                                    elevation="0" router class="white--text mt-1 
                                                     mr-2"
                                                    :to="`/training-management/trainer-information/view/${item.id}`">
                                                    <v-icon> mdi-eye </v-icon>
                                                </v-btn>
                                            </template>
                                            <span>
                                                {{ $t("container.list.view") }}
                                            </span>
                                        </v-tooltip>

                                        <v-tooltip top>
                                            <template v-slot:activator="{ on }">
                                                <v-btn v-can="'trainerInfo-edit'" class="mr-2  mt-1" fab x-small
                                                    v-on=" on" color="success" elevation="0" router
                                                    :to="`/training-management/trainer-information/edit/${item.id}`">
                                                    <v-icon> mdi-account-edit-outline </v-icon>
                                                </v-btn>
                                            </template>
                                            <span>
                                                {{ $t("container.list.edit") }}
                                            </span>
                                        </v-tooltip>


                                        <v-tooltip top>
                                            <template v-slot:activator="{ on }">
                                                <v-btn v-can="'trainerInfo-delete'" fab x-small v-on="on" color="grey"
                                                    class="mr-2 white--text  mt-1" elevation="0"
                                                    @click="deleteAlert(item.id)">
                                                    <v-icon> mdi-delete </v-icon>
                                                </v-btn>
                                            </template>
                                            <span> {{ $t("container.list.delete") }}</span>
                                        </v-tooltip>

                                    </template>

                                    <!-- End Action Button -->

                                    <template v-slot:footer="item">

                                        <row class="text-right pt-2 v-data-footer justify-end pb-2">



                                            <v-col cols="12" lg="4" md="4" sm="12" xs="12" class="text-right">
                                                <v-pagination circle primary v-model="pagination.current"
                                                    :length="pagination.total" @input="onPageChange" :total-visible="11"
                                                    class="custom-pagination-item"></v-pagination></v-col>
                                            <v-col cols="12" lg="4" md="4" sm="12" xs="12" class="text-right">
                                                <v-select style="
                     
                            
                                    
                                                " :items="items" hide-details dense outlined @change="onPageChange"
                                                    v-model="pagination.perPage"></v-select>


                                            </v-col>
                                        </row>

                                    </template>
                                </v-data-table>

                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>
            <!-- position: absolute;
                              right: 25px;
                              width: 149px;
                              transform: translate(0px, 0px); -->
            <!-- delete modal  -->
            <v-dialog v-model="deleteDialog" width="350">
                <v-card style="justify-content: center; ">
                    <v-card-title class="font-weight-bold justify-center"
                        style="background-color: #1C3B68; color: white;font-size: 17px;">
                        {{ $t('container.training_management.trainer_info.delete_header') }}
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                        <div class="subtitle-1 font-weight-medium mt-5">
                            {{ $t('container.training_management.trainer_info.delete_alert') }}


                        </div>
                    </v-card-text>
                    <v-card-actions style="display: block">
                        <v-row class="mx-0 my-0 py-2" justify="center">
                            <v-btn text @click="deleteDialog = false" outlined class="custom-btn-width py-2 mr-10">
                                {{ $t('container.list.cancel') }}
                            </v-btn>

                            <v-btn text @click="deleteData" color="white" :loading="delete_loading"
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
.v-expansion-panel-header__icon {
  color: #ff0000;
  /* Your desired arrow color */
  }
</style>