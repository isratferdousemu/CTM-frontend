<script>
import {ValidationObserver } from "vee-validate";
export default {
    name: "Index",
    title: "CTM - Training Program",
    data() {
        return {
            data: {
                id: null,
                code: null,
                name_en: null,
                name_bn: null,
            },
            start_date:null,
            end_date: null,
            dates: [],
            dateRangeText: "",
            all_modules:[],
            all_circulars:[],
            total: null,
            Programs: [],
            program_trainers: [],
            training_types: [],
            all_status: [{
                "id": 1, "value_en": "Active", "value_bn": "সক্রিয়"
            }, {
                "id": 0, "value_en": "Inactive", "value_bn": "নিষ্ক্রিয়"
                }],
                status:null,
            dialogAdd: false,
            deleteDialog: false,
            dialogEmail: false,
            delete_loading: false,
            loading: false,
            search: "",
            delete_id: "",
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
                { text: this.$t('container.training_management.training_program.program_name'), value: "program_name", align: "start", width: "10%" },
                { text: this.$t('container.training_management.training_program.circular'), value: "circular", align: "start", width: "15%", sortable: false, },
                { text: this.$t('container.training_management.training_circular.module'), value: "modules", width: "25%" },
                { text: this.$t('container.training_management.training_program.trainer'), value: "trainer", width: "15%", sortable: false, },
                { text: this.$t('container.list.status'), value: "status", width: "15%" },
              
                { text: this.$t('container.list.action'), value: "actions", align: "start", sortable: false, width: "15%" },
            ];
        },


    },

    mounted() {
        this.GetData();
        this.Programtrainers();
        this.GetCircular();
        this.$store
            .dispatch("getLookupByType", 27)
            .then((res) => (this.training_types = res));
        this.$store
            .dispatch("getLookupByType", 29)
            .then((res) => (this.all_modules = res));
       
    
   

    },

    methods: {
        OnChangeDateInfo(event, type) {
            this.start_date=null;
            this.end_date = null;
            if (this.dates.length < 2) {
              
                const message = this.language === 'bn' ? 'অনুগ্রহ করে শুরুর তারিখ এবং শেষ তারিখ উভয়ই  প্রদান করুন ' : 'Please select both Start Date and End Date';
                this.$toast.error(message);
                return;
            }

            if (event.length === 2) {
                const startDate = event[0];
                const endDate = event[1];

                if (startDate < endDate) {
                    this.start_date = startDate;
                    this.end_date = endDate;
                } else {
                    const error = this.language === 'bn' ? 'শুরুর তারিখ শেষের তারিখের আগে হতে হবে। ' : 'Date of start must precede date of end.';
                    this.$toast.error(error);
                    this.resetDateRange();

                    // Optionally reset the start and end dates
                    // this.start_date = null;
                    // this.end_date = null;
                }
            }
            
        },
          resetDateRange() {
      this.dates = [];
      this.menu = false;
   
    },
        getItemText(item) {
            return this.language === 'bn' ? item.value_bn : item.value_en;
        },
        async GetCircular() {

            this.$axios
                .get("/admin/training/program-circulars", {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },

                })
                .then((result) => {

                    this.all_circulars = result?.data?.data;
                    console.log(this.all_circulars,"all_ciculars")





                });
        },
        async Programtrainers() {

            this.$axios
                .get("/admin/training/program-trainers", {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },

                })
                .then((result) => {

                    this.program_trainers = result?.data?.data;
                    console.log(this.program_trainers, "program_trainers")





                });
        },
        deviceActivate(id) {
     
            const formData = new FormData();
            
            formData.append('lang', this.language);
            formData.append('_method', "PUT");

            this.$axios
                .post(`admin/training/programs/status/${id}`, formData, {
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
                    this.$toast.error(err.response.data.errors);
             

                });

        },
        copyToClipboard(id) {
            const baseUrl = window.location.origin;
            console.log(baseUrl,"baseUrl");
            // Construct your dynamic link here
            const dynamicLink = `${baseUrl}/program-details/${id}`;

            // Create a temporary input element to copy the link
            const tempInput = document.createElement("input");
            tempInput.value = dynamicLink;
            document.body.appendChild(tempInput);

            // Select the link in the input element
            tempInput.select();
            tempInput.setSelectionRange(0, 99999); // For mobile devices

            // Copy the link to the clipboard
            document.execCommand("copy");

            // Remove the temporary input element
            document.body.removeChild(tempInput);
            if(this.language =='en'){
                   this.$toast.success("Link Copied");
            }
            else{
                this.$toast.success("লিঙ্ক কপি করা হয়েছে");
            }
            },
         

            // Optionally, you can show a message to the user indicating that the link has been copied
         
        

       
        resetSearch(){
            this.module_id=null;
            this.org_name=null;
           this.training_type_id=null;
           this.training_circular_id = null;
           this.module_id = null;
           this.status = null;
           this.trainer_id=null;
           this.start_date =null;
                this.end_date = null;
            this.dates = [];
          
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
                perPage: this.search.trim() === '' ? this.total : this.total,
                page: 1,
                sortBy: this.sortBy,
                orderBy: this.sortDesc,
                search: this.search,
                training_type_id: this.training_type_id,
                training_circular_id: this.training_circular_id,
                module_id: this.module_id,
                status: this.status,
                trainer_id: this.trainer_id,
                start_date: this.start_date,
                end_date: this.end_date,
            };

            await this.$axios
                .get("/admin/training/programs", {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                    params: queryParams,
                })
                .then((result) => {
                    this.programs = result?.data?.data?.data;
                 
                    
                    // const parts = this.apis.start_date.split(" ");
                    // const datePart = parts[0];
                    // this.apis.start_date = datePart;
                    // const parts_2 = this.apis.end_date.split(" ");
                    // const datePart_2 = parts_2[0];
                    // this.apis.end_date = datePart_2;
                });

            const HeaderInfo = [
                this.$t("container.list.sl"),
                this.$t('container.training_management.training_program.program'),
                this.$t('container.training_management.training_program.training_circular'),
                this.$t('container.training_management.training_program.trainer'),
                this.$t('container.training_management.training_circular.module'),
                this.$t('container.training_management.training_circular.description'),
                this.$t('container.training_management.training_circular.start_date'),
                this.$t('container.training_management.training_circular.end_date'),
           
                

            ]
           

        
            const CustomInfo = this.programs.map(((i, index) => {

                return [
                    this.$i18n.locale == 'en' ? index + 1 : this.$helpers.englishToBangla(index + 1),
                    
                    this.$i18n.locale == 'en' ? i.program_name : i.program_name,
                    this.$i18n.locale == 'en' ? i?.training_circular?.circular_name : i?.training_circular?.circular_name,
                    i?.trainers?.map(api => api.name).join(', '),
                    this.$i18n.locale == 'en' ? i?.modules?.map(api => api.value_en).join(', ') : i?.modules?.map(api => api.value_bn).join(', '),
                    
                    this.$i18n.locale == 'en' ? i?.description : i?.description,

                    this.$i18n.locale == 'en' ? i?.start_date : this.$helpers.englishToBangla(i?.start_date),

                    this.$i18n.locale == 'en' ? i?.end_date : this.$helpers.englishToBangla(i?.end_date),
                  
                


                ]
            }));

            const queryParam = {
                language: this.$i18n.locale,
                data: CustomInfo,
                header: HeaderInfo,
                fileName: this.$t("container.training_management.training_program.list"),
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
                .get("/admin/training/circulars", {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                    params: queryParams,
                })
                .then((result) => {
                    this.programs = result?.data?.data?.data;
                })
                .catch(error => {
                    this.isLoading = false;
                });

            try {
                import('@/plugins/Export2Excel').then((excel) => {

                    const HeaderInfo = [
                        this.$t("container.list.sl"),
                        this.$t('container.training_management.training_program.program'),
                        this.$t('container.training_management.training_program.training_circular'),
                        this.$t('container.training_management.training_program.trainer'),
                        this.$t('container.training_management.training_circular.module'),
                        this.$t('container.training_management.training_circular.description'),
                        this.$t('container.training_management.training_circular.start_date'),
                        this.$t('container.training_management.training_circular.end_date'),
                    ]

                    const CustomInfo = this.circulars.map(((i, index) => {
                        return {
                           

                            "sl": this.$i18n.locale == 'en' ? index + 1 : this.$helpers.englishToBangla(index + 1),

                            "name": this.$i18n.locale == 'en' ? i.program_name : i.program_name,
                            "circular_name": this.$i18n.locale == 'en' ? i?.training_circular?.circular_name : i?.training_circular?.circular_name,


                            "trainer": i?.trainers?.map(api => api.name).join(', '),
                            "modules": this.$i18n.locale == 'en' ? i?.modules?.map(api => api.value_en).join(', ') : i?.modules?.map(api => api.value_bn).join(', '),
                       
                            "description": this.$i18n.locale == 'en' ? i?.description : i?.description,
                            "no_of_participant": this.$i18n.locale == 'en' ? i.no_of_participant : this.$helpers.englishToBangla(i?.no_of_participant),

                            "start_date": this.$i18n.locale == 'en' ? i?.start_date : this.$helpers.englishToBangla(i?.start_date),


                            "end_date":
                                this.$i18n.locale == 'en' ? i?.end_date : this.$helpers.englishToBangla(i?.end_date),


                        }
                        
                    }));
                


                  

                      
                        
                       
                       

                      

                      
                    const Field = ['sl', 'name', 'circular_name', 'trainer', 'modules', 'description', 'start_date', 'end_date']

                    const Data = this.FormatJson(Field, CustomInfo)
                    const prefixHeader = [
                        "Government of the People's Republic of Bangladesh",
                        "Department of Social Services",
                        "Cash Transfer Modernization(CTM) Project",
                        "Social Service Building, E-8/B-1, Agargaon, Sherbangla Nagar, Dhaka-1207, Bangladesh."
                    ];
                    const currentDate = new Date().toISOString().slice(0, 10); //
                    let dateinfo = queryParams.language == 'en' ? currentDate : this.$helpers.englishToBangla(currentDate)

                    const filenameWithDate = `${dateinfo}_${this.$t("container.training_management.training_program.list")}`;

                    excel.export_json_to_excel({
                        header: HeaderInfo,
                        data: Data,
                        sheetName: filenameWithDate,
                        filename: filenameWithDate,
                        autoWidth: true,
                        bookType: "xlsx",
                        extraHeaders: prefixHeader,
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
             
            
                search: this.search,
                perPage: this.pagination.perPage,
                page: this.pagination.current,
                sortBy: this.sortBy,
                sortDesc: this.sortDesc,
                training_type_id: this.training_type_id,
                training_circular_id:this.training_circular_id,
                module_id: this.module_id,
                status: this.status,
                trainer_id: this.trainer_id,
                start_date: this.start_date,
                end_date: this.end_date,
            };
            this.$axios
                .get("/admin/training/programs", {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                    params: queryParams,
                })
                .then((result) => {
                    console.log(result,"result")

                    this.total = result?.data?.data?.total;
                    this.circulars = result?.data?.data?.data;
               
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
        perPageChange($event) {

            this.pagination.current = 1;
            this.GetData();
        },


       
        deleteAlert(id) {
            this.deleteDialog = true;
            this.deleted_id = id;
        },

        deleteData: async function () {
            this.$axios
                .delete(`admin/training/programs/${this.deleted_id}`, {
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
    <div id="trainer-program">
        <v-row class="ml-sm-5 mt-0">
            <v-col cols="12">
                <v-row>
                    <v-col cols="12">
                        <v-expansion-panels>
                            <v-expansion-panel class="ma-2">
                                <v-expansion-panel-header color="#1c3b68">
                                    <template v-slot:actions>
                                        <v-icon color="white">$expand</v-icon>
                                    </template>
                                    <h3 class="white--text">{{ $t("container.list.filter") }}</h3>
                                </v-expansion-panel-header>
                                <v-expansion-panel-content class="elevation-0 transparent mt-10">
                                    <form @submit.prevent="PageSetup()">
                                        <v-row>
                                            <v-col lg="4" md="6" sm="12" cols="12">
                                                <v-select outlined dense clearable append-icon="mdi-plus"
                                                    class="no-arrow-icon" v-model="training_circular_id"
                                                    :items="all_circulars" item-text="circular_name" item-value="id"
                                                    :label="$t('container.training_management.training_program.circular')"></v-select>
                                            </v-col>
                                            <v-col lg="4" md="6" sm="12" cols="12">
                                                <v-select outlined dense clearable append-icon="mdi-plus"
                                                    class="no-arrow-icon" v-model="training_type_id"
                                                    :items="training_types" :item-text="getItemText" item-value="id"
                                                    :label="$t('container.training_management.training_circular.training_type')"></v-select>
                                            </v-col>
                                            <v-col lg="4" md="6" sm="12" cols="12">
                                                <v-select outlined dense clearable append-icon="mdi-plus"
                                                    class="no-arrow-icon" v-model="status" :items="all_status"
                                                    :item-text="getItemText" item-value="id"
                                                    :label="$t('container.list.status')"></v-select>
                                            </v-col>
                                            <v-col lg="4" md="6" sm="12" cols="12">
                                                <v-select outlined dense clearable append-icon="mdi-plus"
                                                    class="no-arrow-icon" v-model="module_id" :items="all_modules"
                                                    :item-text="getItemText" item-value="id"
                                                    :label="$t('container.training_management.training_circular.module')"></v-select>
                                            </v-col>
                                            <v-col lg="4" md="6" sm="12" cols="12">
                                                <v-select outlined dense clearable append-icon="mdi-plus"
                                                    class="no-arrow-icon" v-model="trainer_id" :items="program_trainers"
                                                    item-text="name" item-value="id"
                                                    :label="$t('container.training_management.training_program.trainer')"></v-select>
                                            </v-col>
                                            <v-col lg="4" md="6" sm="12" cols="12">
                                                <v-menu ref="menu" v-model="menu" :close-on-content-click="false"
                                                    transition="scale-transition" offset-y min-width="auto">
                                                    <template v-slot:activator="{ on, attrs }">
                                                        <v-text-field v-model="dates" outlined dense
                                                            :append-icon="menu ? 'mdi-calendar' : 'mdi-calendar'"
                                                            :label="$t('container.application_selection_dashboard.enter_start_end_date')"
                                                            readonly v-bind="attrs" v-on="on"></v-text-field>
                                                    </template>
                                                    <v-date-picker v-model="dates" :range="[dates[0], dates[1]]"
                                                        no-title scrollable
                                                        @input="OnChangeDateInfo($event, 'total_received')">
                                                        <v-spacer></v-spacer>
                                                        <v-btn text color="primary" @click="resetDateRange">
                                                            {{ $t('container.list.reset') }}
                                                        </v-btn>
                                                        <v-btn text color="primary" @click="$refs.menu.save(dates)">
                                                            {{ $t('container.list.ok') }}
                                                        </v-btn>
                                                    </v-date-picker>
                                                </v-menu>
                                            </v-col>
                                            <v-col lg="12" md="12" cols="12">
                                                <div class="d-inline d-flex justify-end">
                                                    <v-btn elevation="2" class="btn" @click="resetSearch">
                                                        {{ $t("container.list.reset") }}
                                                    </v-btn>
                                                    <v-btn elevation="2" type="submit" class="btn ml-2" color="success">
                                                        {{ $t("container.list.filter") }}
                                                    </v-btn>
                                                </div>
                                            </v-col>
                                        </v-row>
                                    </form>
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                        </v-expansion-panels>
                        <v-card elevation="10" color="white" rounded="md" theme="light" class="mb-8 mt-5">
                            <v-card-title tag="div" style="background-color:#1c3b68;color:white;margin-bottom: 17px;">
                                <h5 class="ml-2">{{ $t("container.training_management.training_program.list") }}</h5>
                            </v-card-title>
                            <v-card-text>
                                <v-row class="mx-5 mt-10">
                                    <v-col cols="12" md="4">
                                        <v-text-field @keyup.native="PageSetup" v-model="search"
                                            append-icon="mdi-magnify"
                                            :label="$t('container.training_management.training_program.search')"
                                            hide-details class="mb-5 my-sm-0 my-3 mx-0v -input--horizontal" flat
                                            outlined dense></v-text-field>
                                    </v-col>
                                    <v-col class="text-right">
                                        <v-btn flat color="primary" router
                                            to="/training-management/training-program/create"
                                            v-can="'trainerProgram-create'">
                                            <v-icon small>mdi-plus</v-icon>
                                            {{ $t('container.training_management.training_program.add') }}
                                        </v-btn>
                                    </v-col>
                                </v-row>
                                <template>
                                    <v-row justify="space-between" align="center" class="mx-4">
                                        <!-- Checkbox on the left -->
                                        <v-col sm="6" lg="6" md="6" cols="12">
                                            {{ $t('container.list.total') }}:&nbsp;<span style="font-weight: bold;">
                                                {{ language === 'bn' ? $helpers.englishToBangla(this.total) : this.total
                                                }}
                                            </span>
                                        </v-col>
                                        <!-- Dropdown on the right -->
                                        <v-col sm="6" lg="6" md="6" cols="12" class="text-right">
                                            <v-btn elevation="2" class="btn mr-2 white--text" color="red darken-4"
                                                @click="GeneratePDF()">
                                                <v-icon class="pr-1"> mdi-tray-arrow-down </v-icon>
                                                {{ $t("container.list.PDF") }}
                                            </v-btn>
                                            <v-btn elevation="2" class="btn mr-2 white--text" color="teal darken-2"
                                                @click="GenerateExcel()">
                                                <v-icon class="pr-1"> mdi-tray-arrow-down </v-icon>
                                                {{ $t("container.list.excel") }}
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </template>
                                <v-row class="ma-0 white round-border d-flex justify-space-between align-center"
                                    justify="center" justify-lg="space-between">
                                    <v-col cols="12">
                                        <v-data-table :loading="loading" item-key="id" :headers="headers"
                                            :items="circulars" :items-per-page="pagination.perPage" hide-default-footer
                                            class="elevation-0 transparent row-pointer mt-5 mx-5">
                                            <template v-slot:item.sl="{ item, index }">
                                                {{ language === 'bn' ? $helpers.englishToBangla((pagination.current - 1)
                                                * pagination.perPage + index + 1) : (pagination.current - 1) *
                                                pagination.perPage + index + 1 }}
                                            </template>
                                            <template v-slot:item.circular="{ item }">
                                                <span>{{ item.training_circular?.circular_name }}</span>
                                            </template>
                                            <template v-slot:item.modules="{ item }">
                                                <span v-for="(value, key) in item.modules" :key="key">
                                                    <v-chip small label color="#FACD91" class="ma-1">
                                                        {{ language == 'bn' ? value.value_bn : value.value_en }}
                                                    </v-chip>
                                                </span>
                                            </template>
                                            <template v-slot:item.trainer="{ item }">
                                                <span v-for="(value, key) in item.trainers" :key="key">
                                                    <v-chip small label color="#FACD91" class="ma-1">
                                                        {{ value.name }}
                                                    </v-chip>
                                                </span>
                                            </template>
                                            <template v-slot:[`item.status`]="{ item }">
                                                <span v-if="item.status == 0">{{ language == 'bn' ? 'নিষ্ক্রিয়' :
                                                    'Inactive' }}</span>
                                                <span v-else>{{ language == 'bn' ? 'সক্রিয়' : 'Active' }}</span>
                                                <span>
                                                    <v-switch :input-value="item.status == 1 ? true : false"
                                                        @change="deviceActivate(item.id)" hide-details
                                                        color="orange darken-3"></v-switch>
                                                </span>
                                            </template>
                                            <template v-slot:item.actions="{ item }">
                                                <v-tooltip top>
                                                    <template v-slot:activator="{ on }">
                                                        <v-btn v-can="'trainerCircular-view'" fab x-small v-on="on"
                                                            color="blue" elevation="0" router class=" white--text  mr-2"
                                                            @click="copyToClipboard(item.id)">
                                                            <v-icon> mdi-link </v-icon>
                                                        </v-btn>
                                                    </template>
                                                    <span>{{ $t("container.list.copy") }}</span>
                                                </v-tooltip>
                                                <v-tooltip top>
                                                    <template v-slot:activator="{ on }">
                                                        <v-btn v-can="'trainingProgram-view'" fab x-small v-on="on"
                                                            color="#AFB42B" elevation="0" router
                                                            class=" white--text mb-1 mr-2"
                                                            :to="`/training-management/training-program/view/${item.id}`">
                                                            <v-icon> mdi-eye </v-icon>
                                                        </v-btn>
                                                    </template>
                                                    <span>{{ $t("container.list.view") }}</span>
                                                </v-tooltip>
                                                <v-tooltip top>
                                                    <template v-slot:activator="{ on }">
                                                        <v-btn v-can="'trainingProgram-edit'" class=" mr-2 mb-1" fab
                                                            x-small v-on="on" color="success" elevation="0" router
                                                            :to="`/training-management/training-program/edit/${item.id}`">
                                                            <v-icon> mdi-account-edit-outline </v-icon>
                                                        </v-btn>
                                                    </template>
                                                    <span>{{ $t("container.list.edit") }}</span>
                                                </v-tooltip>
                                                <v-tooltip top>
                                                    <template v-slot:activator="{ on }">
                                                        <v-btn v-can="'trainingProgram-delete'" fab x-small v-on="on"
                                                            color="grey" class=" mr-2 white--text mb-1" elevation="0"
                                                            @click="deleteAlert(item.id)">
                                                            <v-icon> mdi-delete </v-icon>
                                                        </v-btn>
                                                    </template>
                                                    <span>{{ $t("container.list.delete") }}</span>
                                                </v-tooltip>
                                            </template>
                                            <template v-slot:footer="item">
                                                <v-row class="text-right pt-2 v-data-footer justify-end pb-2">
                                                    <v-col cols="12" lg="4" md="4" sm="12" xs="12" class="text-right">
                                                        <v-pagination circle primary v-model="pagination.current"
                                                            :length="pagination.total" @input="onPageChange"
                                                            :total-visible="11"
                                                            class="custom-pagination-item"></v-pagination>
                                                    </v-col>
                                                    <v-col cols="12" lg="4" md="4" sm="12" xs="12" class="text-right">
                                                        <v-select :items="items" hide-details dense outlined
                                                            @change="perPageChange"
                                                            v-model="pagination.perPage"></v-select>
                                                    </v-col>
                                                </v-row>
                                            </template>
                                        </v-data-table>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
        <v-dialog v-model="deleteDialog" width="350">
            <v-card style="justify-content: center;">
                <v-card-title class="font-weight-bold justify-center"
                    style="background-color: #1C3C6A; color: white;font-size: 17px;">
                    {{ $t('container.training_management.training_program.delete_header') }}
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <div class="subtitle-1 font-weight-medium mt-5">
                        {{ $t('container.training_management.training_program.delete_alert') }}
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
    </div>
</template>

<style>

</style>