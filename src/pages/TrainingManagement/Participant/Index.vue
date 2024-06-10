<script>
import {ValidationObserver } from "vee-validate";
export default {
    name: "Index",
    title: "CTM - Training Participant",
    data() {
        return {
            all_participants:[],
            participants:[],
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
            deleteDialog: false,
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
            training_circular_id:null,
            training_program_id:null,
            designation:null,
            organization_id: null,
            office_type: null,
            office_id: null,
            offices:[],
            officeType: [],
            organizations:[],
      
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
              { text: this.$t('container.training_management.training_program.circular'), value: "circular", align: "start", width: "15%", sortable: false, },
              { text: this.$t('container.training_management.training_program.program'), value: "program", align: "start", width: "15%" },
              { text: this.$t('container.training_management.training_registration.participant'), value: "participant", width: "15%", sortable: false, },
              { text: this.$t('container.training_management.training_program.employee_id'), value: "user_id", align: "start", width: "15%", sortable: false, },
              { text: this.$t('container.list.status'), value: "status", width: "15%" },
              { text: this.$t('container.list.action'), value: "actions", align: "start", sortable: false, width: "20%" },
            ];
        },


    },
   

    mounted() {  
        this.GetCircular()
        this.GetOffice();
        console.log(this.all_circulars,"circular")
        this.$store
            .dispatch("getLookupByType", 3)
            .then((res) => (this.officeType = res));
 
            if (this.$route.params.training_circular_id) {
                this.training_circular_id = this.$route.params.training_circular_id;
            }
            this.change();
            console.log(this.training_circular_id, this.programs,"program")
            if (this.$route.params.id) {
                this.training_program_id = this.$route.params.id;
            }
            console.log(this.training_program_id, this.training_circular_id, "program")
  
    
            this.GetData();
     
     
     
     
   
       
    
   

    },

    methods: {
 
        change() {
            this.programs = [];
            this.training_program_id =null;
            const selected_programs = this.all_circulars.find(circular => circular.id == this.training_circular_id);
            this.programs = selected_programs?.programs
            console.log(this.programs, "programs");



        },
        getItemText(item) {
            return this.language === 'bn' ? item.value_bn : item.value_en;
        },

         getItemName(item) {
            return this.language === 'bn' ? item.name_bn : item.name_en;
        },
        itemText(item) {
            return `${item.circular_name} - ${item.id}`;
        }
        ,
        getprogram(item) {
            return `${item.program_name} - ${item.id}`;
        },
   
   
        getItemText(item) {
            return this.language === 'bn' ? item.value_bn : item.value_en;
        },
        async GetCircular() {

            this.$axios
                .get("/admin/training/participants/circulars", {
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
         async GetOffice() {

            this.$axios
                .get("/global/office-list", {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },

                })
                .then((result) => {

                    this.offices = result?.data?.data;
                    





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
        
         

            // Optionally, you can show a message to the user indicating that the link has been copied
         
        

       
        resetSearch(){
           this.training_program_id=null,
           this.training_circular_id = null,
           this.office_type = null,
           this.office_id=null,
           this.organization_id = null,
 
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
                name: this.search,
                training_program_id: this.training_program_id,
                training_circular_id: this.training_circular_id,
                office_type: this.office_type,
                office_id: this.office_id,
              
              
            };

            await this.$axios
                .get("/admin/training/participants", {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                    params: queryParams,
                })
                .then((result) => {
                    this.all_participants = result?.data?.data?.data;
                 
                });

            const HeaderInfo = [
                this.$t("container.list.sl"),
                this.$t('container.training_management.training_program.training_circular'),
                this.$t('container.training_management.training_program.program'),
                this.$t('container.training_management.training_registration.user_name'),
                this.$t('container.training_management.training_registration.full_name'),
                this.$t('container.training_management.trainer_info.email'),
                this.$t('container.training_management.trainer_info.mobile'),
                this.$t('container.list.status'),
                
             
           
                

            ]
           

        
            const CustomInfo = this.all_participants.map(((i, index) => {
                let paymentCycle;
                switch (i.status.toString()) {
                    case '0':
                        paymentCycle = this.language == 'bn' ? "পেন্ডিং" : "Pending";
                        break;
                    case '1':
                        paymentCycle = this.language == 'bn' ? "উত্তীর্ণ" : "Pass";
                        break;
                    case '2':
                        paymentCycle = this.language == 'bn' ? "অনুত্তীর্ণ" : "Fail";
                       
                    default:
                        paymentCycle = i?.status;
                }

                return [
                    this.$i18n.locale == 'en' ? index + 1 : this.$helpers.englishToBangla(index + 1),
                    this.$i18n.locale == 'en' ? i?.training_circular.circular_name : i?.training_circular.circular_name,
                    this.$i18n.locale == 'en' ? i?.training_program.program_name : i?.training_program.program_name,
                    i?.user?.full_name,
                    i?.user?.username,
                    i?.user?.email,
                    this.$i18n.locale == 'en' ? i?.user?.mobile : this.$helpers.englishToBangla(i?.user?.mobile),
                    paymentCycle,

                ]
            }));

            const queryParam = {
                language: this.$i18n.locale,
                data: CustomInfo,
                header: HeaderInfo,
                fileName: this.$t("container.training_management.training_registration.list_1"),
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
                name: this.search,
                training_program_id: this.training_program_id,
                training_circular_id: this.training_circular_id,
                office_type: this.office_type,
                office_id: this.office_id,
                organization_id: this.organization_id,
            };

            await this.$axios
                .get("/admin/training/participants", {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                    params: queryParams,
                })
                .then((result) => {
                    this.all_participants = result?.data?.data?.data;
                })
                .catch(error => {
                    this.isLoading = false;
                });

            try {
                import('@/plugins/Export2Excel').then((excel) => {

                    const HeaderInfo = [
                        this.$t("container.list.sl"),
                        this.$t('container.training_management.training_program.training_circular'),
                        this.$t('container.training_management.training_program.program'),
                        this.$t('container.training_management.training_registration.user_name'),
                        this.$t('container.training_management.training_registration.full_name'),
                        this.$t('container.training_management.trainer_info.email'),
                        this.$t('container.training_management.trainer_info.mobile'),
                        this.$t('container.list.status'),

                    ]

                    const CustomInfo = this.all_participants.map(((i, index) => {
                        let paymentCycle;
                        switch (i.status.toString()) {
                            case '0':
                                paymentCycle = this.language == 'bn' ? "পেন্ডিং" : "Pending";
                                break;
                            case '1':
                                paymentCycle = this.language == 'bn' ? "উত্তীর্ণ" : "Pass";
                                break;
                            case '2':
                                paymentCycle = this.language == 'bn' ? "অনুত্তীর্ণ" : "Fail";

                            default:
                                paymentCycle = i?.status;
                        }
                        return {
                           

                            "sl": this.$i18n.locale == 'en' ? index + 1 : this.$helpers.englishToBangla(index + 1), 
                            "circular": this.$i18n.locale == 'en' ? i?.training_circular.circular_name : i?.training_circular.circular_name,
                            "program": this.$i18n.locale == 'en' ? i?.training_program.program_name : i?.training_program.program_name,
                            "username":i?.user?.username,
                            "full_name":i?.user?.full_name,
                            "email": i?.user?.email,
                            "mobile": this.$i18n.locale == 'en' ? i?.user?.mobile : this.$helpers.englishToBangla(i?.user?.mobile),
                            "status": paymentCycle,

                        }
                        
                    }));
                
    
                    const Field = ['sl', 'circular', 'program', "username", 'full_name', 'email','mobile' ,'status']

                    const Data = this.FormatJson(Field, CustomInfo)
                    const prefixHeader = [
                        "Government of the People's Republic of Bangladesh",
                        "Department of Social Services",
                        "Cash Transfer Modernization(CTM) Project",
                        "Social Service Building, E-8/B-1, Agargaon, Sherbangla Nagar, Dhaka-1207, Bangladesh."
                    ];
                    const currentDate = new Date().toISOString().slice(0, 10); //
                    let dateinfo = queryParams.language == 'en' ? currentDate : this.$helpers.englishToBangla(currentDate)

                    const filenameWithDate = `${dateinfo}_${this.$t("container.training_management.training_registration.list_2")}`;

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
             
            
              
                perPage: this.pagination.perPage,
                page: this.pagination.current,
                sortBy: this.sortBy,
                sortDesc: this.sortDesc,
                name: this.search,
                training_program_id: this.training_program_id,
                training_circular_id:this.training_circular_id,
                office_type:this.office_type,
                office_id: this.office_id,
             
                
            
            };
            this.$axios
                .get("/admin/training/participants", {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                    params: queryParams,
                })
                .then((result) => {
                    console.log(result,"result")

                    this.total = result?.data?.data?.total;
                    this.participants = result?.data?.data?.data;
               
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
                .delete(`admin/training/participants/${this.deleted_id}`, {
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
                                                <v-autocomplete dense type="text" v-model="training_circular_id"
                                                    append-icon="mdi-plus" @input="change()"
                                                    :label="$t('container.training_management.training_program.training_circular')"
                                                    persistent-hint outlined :error="errors[0] ? true : false"
                                                    :items="all_circulars" :item-text="itemText" item-value="id">

                                                </v-autocomplete>
                                            </v-col>
                                            <v-col lg="4" md="6" sm="12" cols="12">

                                                <v-autocomplete dense type="text" v-model="training_program_id"
                                                    append-icon="mdi-plus" :items="programs" :item-text="getprogram"
                                                    item-value="id" :label="$t('container.training_management.training_program.program')
                                        " persistent-hint outlined :error="errors[0] ? true : false"></v-autocomplete>

                                            </v-col>


                                            <v-col cols=" 12" sm="4" lg="4">

                                                <v-select dense :hide-details="errors[0] ? false : true"
                                                    append-icon="mdi-plus" v-model="office_type" outlined :label="$t(
                                        'container.system_config.demo_graphic.office.office_type'
                                    )
                                        " :items="officeType" :item-text="getItemText" item-value="id"
                                                    :error="errors[0] ? true : false"
                                                    :error-messages="errors[0]"></v-select>

                                            </v-col>
                                            <v-col cols=" 12" sm="4" lg="4">

                                                <v-select v-model="office_id" dense
                                                    :hide-details="errors[0] ? false : true" append-icon="mdi-plus"
                                                    outlined :label="$t(
                                        'container.system_config.demo_graphic.office.office'
                                    )
                                        " :items="offices" :item-text="getItemName" item-value="id"
                                                    :error="errors[0] ? true : false"
                                                    :error-messages="errors[0]"></v-select>

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
                                <h5 class="ml-2">{{ $t("container.training_management.training_registration.list_1") }}
                                </h5>
                            </v-card-title>
                            <v-card-text>
                                <v-row class="mx-5 mt-10">
                                    <v-col cols="12" md="4">
                                        <v-text-field @keyup.native="PageSetup" v-model="search"
                                            append-icon="mdi-magnify"
                                            :label="$t('container.training_management.training_registration.search')"
                                            hide-details class="mb-5 my-sm-0 my-3 mx-0v -input--horizontal" flat
                                            outlined dense></v-text-field>
                                    </v-col>
                                    <v-col class="text-right">
                                        <v-btn flat color="primary" router to="/training-management/participant/create"
                                            v-can="'participant-create'">
                                            <v-icon small>mdi-plus</v-icon>
                                            {{ $t('container.training_management.training_registration.add_1') }}
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
                                            :items="participants" :items-per-page="pagination.perPage"
                                            hide-default-footer class="elevation-0 transparent row-pointer mt-5 mx-5">
                                            <template v-slot:item.sl="{ item, index }">
                                                {{ language === 'bn' ? $helpers.englishToBangla((pagination.current - 1)
                                                * pagination.perPage + index + 1) : (pagination.current - 1) *
                                                pagination.perPage + index + 1 }}
                                            </template>

                                          <template v-slot:item.user_id="{ item }">
                                                {{ language === 'bn' ? $helpers.englishToBangla(item.user_id) : item.user_id }}
                                            </template>
                                            <template v-slot:item.circular="{ item }">
                                                <span>{{ item.training_circular?.circular_name }}</span>
                                            </template>
                                            <template v-slot:item.id="{ item }">
                                                <span> {{ language == 'bn' ?
                                                    $helpers.englishToBangla(item.id) : item.id }}</span>
                                            </template>
                                            <template v-slot:item.program="{ item }">
                                                <span>{{ item.training_program?.program_name }}</span>
                                            </template>

                                            <template v-slot:item.participant="{ item }">
                                                <span>{{item.user.full_name}}

                                                </span>

                                            </template>

                                            <template v-slot:[`item.status`]="{ item }">


                                                <span v-if="item.status==0">

                                                    {{ language === 'en' ? 'Pending' : 'পেন্ডিং' }}
                                                </span>

                                                <span v-if="item.status == 1">

                                                    {{ language === 'en' ? 'Pass' : 'উত্তীর্ণ' }}
                                                </span>
                                                <span v-if="item.status == 2">

                                                    {{ language === 'en' ? 'Fail' : 'অনুত্তীর্ণ' }}
                                                </span>

                                            </template>
                                            <template v-slot:item.actions="{ item }">

                                                <v-tooltip top>
                                                    <template v-slot:activator="{ on }">
                                                        <v-btn v-can="'Participant-view'" fab x-small v-on="on"
                                                            color="#AFB42B" elevation="0" router
                                                            class=" white--text mb-1 mr-2"
                                                            :to="`/training-management/participant/view/${item.id}`">
                                                            <v-icon> mdi-eye </v-icon>
                                                        </v-btn>
                                                    </template>
                                                    <span>{{ $t("container.list.view") }}</span>
                                                </v-tooltip>
                                                <v-tooltip top>
                                                    <template v-slot:activator="{ on }">
                                                        <v-btn v-can="'Participant-edit'" class=" mr-2 mb-1" fab x-small
                                                            v-on="on" color="success" elevation="0" router
                                                            :to="`/training-management/participant/edit/${item.id}`">
                                                            <v-icon> mdi-account-edit-outline </v-icon>
                                                        </v-btn>
                                                    </template>
                                                    <span>{{ $t("container.list.edit") }}</span>
                                                </v-tooltip>

                                              <v-tooltip top v-if="item.exam_response">
                                                    <template v-slot:activator="{ on }">
                                                        <v-btn v-can="'Participant-edit'" class=" mr-2 mb-1" fab x-small
                                                            v-on="on" color="primary" elevation="0" router
                                                            :to="`/training-management/participant/grade-exam/${item.id}`">
                                                            <v-icon> mdi-newspaper-variant-outline </v-icon>
                                                        </v-btn>
                                                    </template>
                                                    <span>{{ $t("container.list.exam") }}</span>
                                                </v-tooltip>

                                              <v-tooltip top v-if="item.trainer_rating_response">
                                                    <template v-slot:activator="{ on }">
                                                        <v-btn v-can="'Participant-edit'" class=" mr-2 mb-1" fab x-small
                                                            v-on="on" color="red" elevation="0" router
                                                            :to="`/training-management/participant/trainer-rating/${item.id}`">
                                                            <v-icon color="white"> mdi-card-account-details-star-outline </v-icon>
                                                        </v-btn>
                                                    </template>
                                                    <span>{{ $t("container.list.trainerAssessment") }}</span>
                                                </v-tooltip>

                                                <v-tooltip top>
                                                    <template v-slot:activator="{ on }">
                                                        <v-btn v-can="'Participant-delete'" fab x-small v-on="on"
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
                    {{ $t('container.training_management.training_registration.delete_header') }}
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <div class="subtitle-1 font-weight-medium mt-5">
                        {{ $t('container.training_management.training_registration.delete_alert') }}
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