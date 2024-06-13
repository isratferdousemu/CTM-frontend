<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import { mapState, mapActions } from "vuex";

export default {
    name: "Index",
    title: "CTM - Trainer Information",
    components: {
        ValidationProvider,
        ValidationObserver,
     
    },
    data() {
        return {
            data: {
                id: null,
                code: null,
                name_en: null,
                name_bn: null,
             
            },
            location_id:null,
            subLocationType: [
                {
                    id: 1,
                    name_en: "Pourashava",
                    name_bn: "পৌরসভা",
                },

                {
                    id: 2,
                    name_en: "Union",
                    name_bn: "ইউনিয়ন",
                },
            ],
            districts: [],
            locationType:[],
        
            thanas:[],
            cities:[],
            city_thanas:[],
            unions:[],
            pouros:[],
            wards:[],
            district_poros:[],
            showPassword: false,
            total: null,
            org_name: null,
            module_id: null,
            organization_names: [],
            trainers: [],

            dialogAdd: false,
            deleteDialog: false,
            dialogEmail: false,
            delete_loading: false,
            loading: false,
            search: "",
            delete_id: "",
            email_id: "",

            apis: [],

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
        ...mapState({
            divisions: (state) => state.Division.divisions,

        }),
        headers() {
            return [
                { text: this.$t('container.list.sl'), value: "sl", align: "start", sortable: false, width: "5%" },
                { text: this.$t('container.training_management.trainer_info.ID'), value: "id_no", align: "start", width: "10%", sortable: false, },
                { text: this.$t('container.training_management.trainer_info.name'), value: "name", width: "15%" },
                { text: this.$t('container.training_management.trainer_info.designation'), value: "designation", width: "15%", sortable: false, },

                { text: this.$t('container.training_management.trainer_info.email'), value: "email", width: "10%" },
                { text: this.$t('container.list.status'), value: "status", width: "15%", sortable: false, },


                { text: this.$t('container.list.action'), value: "actions", align: "start", sortable: false, width: "25%" },
            ];
        },


    },

    mounted() {
        this.$store
            .dispatch("getGlobalLookupByType", 1)
            .then((res) => (this.locationType = res));
    
        this.GetAllDivisions();
        this.GetData();




    },

    methods: {
        resetForm() {
            this.data.division_id = null;
            this.data.district_id = null;
            this.data.thana_id = null;
            this.data.union_id = null;
            this.data.city_id = null;
            this.data.city_thana_id = null;
            this.data.district_pouro_id = null;
            this.data.pouro_id = null;
            this.data.ward_id = null;
            this.data.location_type = null;
           

           
            this.GetData();
        },
        async LocationType($event) {
            // this.location_id = $event;
            this.wards = [];
            if ($event === 1 || $event === 3) {
                this.data.sub_location_type = null;
            }

            if (this.data.district_id != null && this.data.location_type != null) {
                if ($event === 2) {
                    await this.$axios
                        .get(`/global/thana/get/${this.data.district_id}`, {
                            headers: {
                                Authorization: "Bearer " + this.$store.state.token,
                                "Content-Type": "multipart/form-data",
                            },
                        })
                        .then((result) => {
                            this.thanas = result.data.data;
                            //emu
                            // this.wards = [];
                            // this.data.ward_id = null;
                            this.cities = [];
                            this.district_poros = [];

                            this.data.city_id = null;
                            this.data.city_thana_id = null;
                            this.data.district_pouro_id = null;
                            //emu
                            // this.wards = [];
                            // this.ward_id = null;
                        });
                }
                if ($event === 3) {
                    await this.$axios
                        .get("/global/city/get/" + this.data.district_id + "/" + $event, {
                            headers: {
                                Authorization: "Bearer " + this.$store.state.token,
                                "Content-Type": "multipart/form-data",
                            },
                        })
                        .then((result) => {
                            this.cities = result.data.data;
                            //emu
                            // this.wards = [];
                            // this.data.ward_id = null;
                            this.thanas = [];
                            this.district_poros = [];
                            this.data.thana_id = null;
                            this.data.union_id = null;
                            this.data.district_pouro_id = null;
                            this.data.pouro_id = null;
                            //emu
                            // this.wards = [];
                            // this.ward_id = null;
                        });
                }
                if ($event === 1) {
                    await this.$axios
                        .get("/global/city/get/" + this.data.district_id + "/" + this.data.location_type, {
                            headers: {
                                Authorization: "Bearer " + this.$store.state.token,
                                "Content-Type": "multipart/form-data",
                            },
                        })
                        .then((result) => {
                            this.district_poros = result.data.data;
                            console.log(this.district_poros,"district_poros")
                            //emu
                            // this.wards = [];
                            this.data.ward_id = null;
                            this.cities = [];
                            this.thanas = [];
                            this.thana_id = null;
                            this.union_id = null;
                            this.city_id = null;
                            this.city_thana_id = null;
                            this.pouro_id = null;
                        });
                }
            }
        },
        async onChangeSubLocationType(event) {
            
            // this.location_id = $event;
            this.data.ward_id = null;

            if (event == 1) {
                await this.$axios
                    .get(`/global/union/pouro/get/${this.data.thana_id}`, {
                        headers: {
                            Authorization: "Bearer " + this.$store.state.token,
                            "Content-Type": "multipart/form-data",
                        },
                    })
                    .then((result) => {
                        this.pouros = result.data.data;
                    });
                this.data.union_id = null;
            }
            if (event == 2) {
                this.onChangeUpazila(this.data.thana_id);
                this.data.pouro_id = null;
            }
        },
        async onChangeUpazila(event) {
            this.location_id = event;
            this.location_id = event;
            if (this.data.sub_location_type == 1) {
                this.onChangeSubLocationType(1);
            } else {
                await this.$axios
                    .get(`/global/union/get/${this.data.thana_id}`, {
                        headers: {
                            Authorization: "Bearer " + this.$store.state.token,
                            "Content-Type": "multipart/form-data",
                        },
                    })
                    .then((result) => {
                        this.unions = result.data.data;
                    });
            }
        },

        async onChangeDivision(event) {
               this.location_id = event;
            await this.$axios
                .get(`/global/district/get/${event}`, {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((result) => {
                    this.districts = result.data.data;
                });
        },
        async onChangeDistrict(event) {
            this.location_id = this.data.district_id;
       
                    this.LocationType(this.data.location_type);
                 
                
        },
        async onChangeThana(event) {
            this.location_id = event;

            await this.$axios
                .get(`/global/union/get/${event}`, {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((result) => {
                    this.unions = result.data.data;
                });
        },
        async onChangeCity(event) {
            this.location_id = event;
            await this.$axios
                .get(`/global/thana/get/city/${this.data.city_id}`, {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((result) => {
                    this.city_thanas = result.data.data;
                });
        },
        async onChangeUnionGetWard(event) {
            this.location_id = event;
            //emu
            // this.wards = [];
            // this.data.ward_id = null;
            await this.$axios
                .get(`/global/ward/get/${event}`, {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((result) => {
                    this.wards = result.data.data;
                });
        },
        async onChangePouroGetWard(event) {
            this.location_id = event;
            //emu
            // this.wards = [];
            // this.data.ward_id = null;
            await this.$axios
                .get(`/global/ward/get/pouro/${event}`, {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((result) => {
                    this.wards = result.data.data;
                });
        },

        async onChangeDistrictPouroGetWard(event) {
            this.location_id = event;
            //emu
            // this.wards = [];
            // this.data.ward_id = null;
            await this.$axios
                .get(`/global/ward/get/pouro/${this.data.district_pouro_id}`, {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((result) => {
                    this.wards = result.data.data;
                    console.log(this.wards, "wards in function dist");
                    console.log(this.data.ward_id, "ward");
                });
        },
        async onChangeThanaGetWard(event) {
            this.location_id = event;
            //emu
            // this.wards = [];
            // this.data.ward_id = null;
            await this.$axios
                .get(`/global/ward/get/thana/${event}`, {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((result) => {
                    this.wards = result.data.data;
                    console.log(this.wards, "thanawards");
                });
        },
        // async onChangeThanaGetWard(event) {

        //     await this.$axios
        //         .get(`/global/ward/get/thana/${event}`, {
        //             headers: {
        //                 Authorization: "Bearer " + this.$store.state.token,
        //                 "Content-Type": "multipart/form-data",
        //             },
        //         })
        //         .then((result) => {
        //             this.wards = result.data.data;
        //             console.log(this.wards, "thanawards");
        //         });
        // },
        getItemText(item) {
            return this.language === 'bn' ? item.name_bn : item.name_en;
        },
        getItemValue(item) {
            return this.language === 'bn' ? item.value_bn : item.value_en;
        },
        perPageChange($event) {

            this.pagination.current = 1;
            this.GetData();
        },
        ...mapActions({
            GetAllDivisions: "Division/GetAllDivisions",
        }),
        deviceActivate(id) {
            console.log(id, "id");


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

        resetSearch() {
            this.module_id = null;
            this.org_name = null;
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
                  
                   
                    this.$i18n.locale == 'en' ? (i.status == 1 ? 'Active' : 'Inactive') : (i.status == 1 ? 'সক্রিয়' : 'নিষ্ক্রিয়'),
                


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


                            "status": this.$i18n.locale == 'en' ? (i.status == 0 ? 'Active' : 'Inactive') : (i.status == 0 ? 'সক্রিয়' : 'নিষ্ক্রিয়')


                        }
                    }));

                    const Field = ['sl', 'id', 'name', 'designation', 'mobile', 'email', 'address', 'status']

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

            this.loading = true;
            const queryParams = {
                
                location_id:this.location_id,
            
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
                    console.log(result, "result")

                    this.total = result?.data?.data?.total;
                    this.trainers = result?.data?.data?.data;
                    console.log(this.trainers, "trainers")
                    this.pagination.current = result?.data?.data?.current_page;
                    this.pagination.total = result?.data?.data?.last_page;
                    this.pagination.grand_total = result?.data?.data?.total;
                    this.loading = false;


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
        <v-row class="ml-sm-5 mt-0">
            <v-col cols="12">
                <v-row>
                    <v-col cols="12">
                        <v-expansion-panels>
                            <v-expansion-panel class="ma-2">
                                <v-expansion-panel-header color=#1c3b68>
                                    <template v-slot:actions>
                                        <v-icon color="white">$expand</v-icon>
                                    </template>
                                    <h3 class="white--text ">
                                        {{ $t("container.list.filter") }}
                                    </h3>
                                </v-expansion-panel-header>
                                <v-expansion-panel-content class="elevation-0 transparent mt-10">
                                    <ValidationObserver ref="form" v-slot="{ invalid }">
                                        <form @submit.prevent="submitWard()">
                                            <v-row>
                                               
                                                <v-col lg="3" md="3" cols="12">

                                                    <v-select dense :append-icon-cb="appendIconCallback"
                                                        append-icon="mdi-plus" @input="LocationType($event)"
                                                        v-model="data.location_type" outlined
                                                        :label="$t('container.list.location_type')"
                                                        :items="locationType" :item-text="getItemValue" item-value="id"
                                                        required :error="errors[0] ? true : false"
                                                        :error-messages="errors[0]"></v-select>

                                                </v-col>
                                                <v-col lg="3" md="3" cols="12">
                                                    <v-select dense outlined clearable @input="onChangeDivision($event)"
                                                        :append-icon-cb="appendIconCallback" append-icon="mdi-plus"
                                                        v-model="data.division_id" :label="$t(
                                'container.system_config.demo_graphic.division.division'
                              )
                                " :items="divisions" :item-text="getItemText" item-value="id" required
                                                        :error="errors[0] ? true : false" :error-messages="errors[0]">
                                                    </v-select>

                                                </v-col>
                                                <v-col lg="3" md="3" cols="12">

                                                    <v-select dense outlined :append-icon-cb="appendIconCallback"
                                                        append-icon="mdi-plus" v-model="data.district_id"
                                                        @input="onChangeDistrict($event)" :label="$t(
                                'container.system_config.demo_graphic.district.district'
                              )
                                " :items="districts" :item-text="getItemText" item-value="id" required
                                                        :error="errors[0] ? true : false"
                                                        :error-messages="errors[0]"></v-select>

                                                </v-col>

                                                <v-col v-if="data.location_type == 1" lg="3" md="3" cols="12">

                                                    <v-select dense clearable
                                                        @input="onChangeDistrictPouroGetWard($event)"
                                                        :hide-details="errors[0] ? false : true"
                                                        v-model="data.district_pouro_id" outlined :label="$t(
                                            'container.system_config.demo_graphic.ward.dist_pouro'
                                        )
                                            " :items="district_poros" :item-text="getItemText" item-value="id"
                                                        :error="errors[0] ? true : false" :error-messages="errors[0]"
                                                        class="no-arrow-icon" :append-icon-cb="appendIconCallback"
                                                        append-icon="mdi-plus"></v-select>

                                                </v-col>

                                                <!-- <v-col v-if="data.location_type == 2" lg="3" md="3" cols="12">
                                                    <ValidationProvider name="union" vid="union_id" rules="required"
                                                        v-slot="{ errors }">
                                                        <v-select dense :append-icon="appendIcon"
                                                            :append-icon-cb="appendIconCallback"
                                                            prepend-inner-icon="mdi-plus" v-model="data.union_id"
                                                            outlined :label="$t('container.system_config.demo_graphic.ward.union')
                                " :items="unions" :item-text="getItemText" item-value="id" required
                                                            :error="errors[0] ? true : false"
                                                            :error-messages="errors[0]"></v-select>
                                                    </ValidationProvider>
                                                </v-col> -->

                                                <v-col v-if="data.location_type == 3" lg="3" md="3" cols="12">
                                                    <ValidationProvider name="city" vid="city_id" rules="required"
                                                        v-slot="{ errors }">
                                                        <v-select dense :append-icon="appendIcon"
                                                            :append-icon-cb="appendIconCallback"
                                                            prepend-inner-icon="mdi-plus" v-model="data.city_id"
                                                            @change="onChangeCity($event)" outlined :label="$t('container.system_config.demo_graphic.ward.city')
                                " :items="cities" :item-text="getItemText" item-value="id" required
                                                            :error="errors[0] ? true : false"
                                                            :error-messages="errors[0]"></v-select>
                                                    </ValidationProvider>
                                                </v-col>
                                                <v-col v-if="data.location_type == 2" lg="3" md="3" cols="12">

                                                    <v-select dense clearable :hide-details="errors[0] ? false : true"
                                                        v-model="data.thana_id" outlined :label="$t(
                                            'container.system_config.demo_graphic.ward.upazila'
                                        )
                                            " @change="onChangeUpazila($event)" :items="thanas"
                                                        :item-text="getItemText" item-value="id"
                                                        :error="errors[0] ? true : false" :error-messages="errors[0]"
                                                        class="no-arrow-icon" :append-icon-cb="appendIconCallback"
                                                        append-icon="mdi-plus"></v-select>

                                                </v-col>

                                                <v-col v-if="data.location_type == 3" lg="3" md="3" cols="12">
                                                    <ValidationProvider name="thana" vid="city_thana_id"
                                                        rules="required" v-slot="{ errors }">
                                                        <v-select clearable @input="onChangeThanaGetWard($event)" dense
                                                            :append-icon="appendIcon"
                                                            :append-icon-cb="appendIconCallback"
                                                            prepend-inner-icon="mdi-plus" v-model="data.city_thana_id"
                                                            outlined :label="$t('container.system_config.demo_graphic.ward.thana')
                                " :items="city_thanas" :item-text="getItemText" item-value="id" required
                                                            :error="errors[0] ? true : false"
                                                            :error-messages="errors[0]"></v-select>
                                                    </ValidationProvider>
                                                </v-col>
                                                <v-col v-if="data.location_type == 2" lg="3" md="3" cols="12">
                                                    <v-select clearable dense @input="onChangeSubLocationType($event)"
                                                        v-model="data.sub_location_type" outlined
                                                        :label="$t('container.system_config.demo_graphic.ward.subLocation_type')"
                                                        :items="subLocationType" :item-text="getItemText"
                                                        item-value="id" :error="errors[0] ? true : false"
                                                        :error-messages="errors[0]"
                                                        :hide-details="errors[0] ? false : true" class="no-arrow-icon"
                                                        :append-icon-cb="appendIconCallback"></v-select>
                                                </v-col>

                                                <v-col v-if="data.location_type == 2 && data.sub_location_type == 1"
                                                    lg="3" md="3" cols="12">

                                                    <v-select clearable dense v-model="data.pouro_id" outlined :label="$t(
                                            'container.system_config.demo_graphic.ward.pouro'
                                        )
                                            " :items="pouros" :item-text="getItemText" item-value="id"
                                                        @input="onChangePouroGetWard($event)"
                                                        :error="errors[0] ? true : false" :error-messages="errors[0]"
                                                        :hide-details="errors[0] ? false : true" class="no-arrow-icon"
                                                        :append-icon-cb="appendIconCallback"
                                                        append-icon="mdi-plus"></v-select>

                                                </v-col>
                                                <!-- :readonly="permissions?.user?.committee_type_id == 12 && data.pouro_id != null" -->

                                                <v-col v-if="data.sub_location_type == 2 &&
                                            data.location_type == 2" lg="3" md="3" cols="12">

                                                    <v-select clearable dense @input="onChangeUnionGetWard($event)"
                                                        v-model="data.union_id" outlined :label="$t(
                                            'container.system_config.demo_graphic.ward.union'
                                        )
                                            " :items="unions" item-text="name_en" item-value="id"
                                                        :error="errors[0] ? true : false" :error-messages="errors[0]"
                                                        :hide-details="errors[0] ? false : true" class="no-arrow-icon"
                                                        :append-icon-cb="appendIconCallback"
                                                        append-icon="mdi-plus"></v-select>

                                                </v-col>
                                                <v-col lg="3" md="3" cols="12">
                                                    <ValidationProvider name="Ward" vid="ward_id" v-slot="{ errors }">
                                                        <v-select clearable v-if="data.location_type" dense
                                                            :hide-details="errors[0] ? false : true"
                                                            v-model="data.ward_id" outlined claerable :label="$t(
                                            'container.system_config.demo_graphic.ward.ward'
                                        )
                                            " :items="wards" :item-text="getItemText" item-value="id"
                                                            :error="errors[0] ? true : false"
                                                            :error-messages="errors[0]" class="no-arrow-icon"
                                                            :append-icon-cb="appendIconCallback"
                                                            append-icon="mdi-plus"></v-select>
                                                    </ValidationProvider>
                                                </v-col>


                                            </v-row>
                                            <v-row>
                                                <v-col class="text-right">
                                                    <div class="d-inline d-flex justify-end">

                                                        <v-btn elevation="2" class="btn mr-2" @click="resetForm()">
                                                            {{ $t("container.list.reset") }}
                                                        </v-btn>
                                                        <v-btn elevation="2" type="submit" class="btn mr-2"
                                                            @click="GetData()" color="success">
                                                            {{ $t("container.list.search") }}
                                                        </v-btn>
                                                    </div>
                                                </v-col>
                                            </v-row>
                                        </form>
                                    </ValidationObserver>
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                        </v-expansion-panels>

                    </v-col>
                    <v-col cols="12">
                        <v-card elevation="10" color="white" rounded="md" theme="light" class="mb-8 mt-5">

                            <v-card-title style="background-color: #1c3b68; color: white;">
                                <h5 class=" white--text ml-2">{{ $t('container.training_management.trainer_info.list')
                                    }}</h5>
                            </v-card-title>


                            <!-- <v-divider></v-divider> -->

                            <v-card-text class="mt-10">
                                <!-- <v-card-title class="mb-5 ml-5 ">
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

                                </v-card-title> -->
                                <v-row class="mx-5 mt-10">
                                    <v-col cols="12" md="4">
                                        <v-text-field @keyup.native="PageSetup" v-model="search"
                                            append-icon="mdi-magnify" :label="$t(
                                                'container.list.search'
                                            )" hide-details class="mb-5 my-sm-0 my-3 mx-0v -input--horizontal" flat
                                            outlined dense></v-text-field>

                                    </v-col>




                                    <v-col class="text-right">

                                        <v-btn flat color="primary" router
                                            to="/training-management/trainer-information/create"
                                            v-can="'trainerCircular-create'">
                                            <v-icon small>mdi-plus</v-icon>
                                            {{
                                            $t('container.training_management.trainer_info.add') }}
                                        </v-btn>
                                    </v-col>




                                </v-row>

                                <template>
                                    <v-row justify="space-between" align="center" class="mx-4">
                                        <!-- Checkbox on the left -->
                                        <v-col sm="6" lg="6" md="6" cols="12">
                                            {{ $t('container.list.total') }}:&nbsp;<span style="font-weight: bold;">
                                                {{ language === 'bn' ? $helpers.englishToBangla(
                                                this.total) : this.total }}
                                            </span>
                                        </v-col>

                                        <!-- Dropdown on the right -->
                                        <v-col sm="6" lg="6" md="6" cols="12" class="text-right">
                                            <v-btn elevation="2" class="btn mr-2 white--text" color="red darken-4"
                                                @click="GeneratePDF()">
                                                <v-icon class="pr-1"> mdi-tray-arrow-down </v-icon> {{
                                                $t("container.list.PDF") }}
                                            </v-btn>
                                            <v-btn elevation="2" class="btn mr-2 white--text" color="teal darken-2"
                                                @click="GenerateExcel()">
                                                <v-icon class="pr-1"> mdi-tray-arrow-down </v-icon>
                                                {{ $t("container.list.excel") }}
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </template>
                                <v-row class="ma-0  white round-border d-flex justify-space-between align-center"
                                    justify="center" justify-lg="space-between">
                                    <v-col cols="12">

                                        <v-data-table :loading="loading" item-key="id" :headers="headers"
                                            :items="trainers" :items-per-page="pagination.perPage" hide-default-footer
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
                                                    $helpers.englishToBangla(item.id) : item.id }}
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
                                                <!-- <span v-if="item.status == 0">
                                                    {{ language == 'bn' ?
                                                        'নিষ্ক্রিয়' : 'Inactive' }}
                                                </span>
                                                <span v-else>
                                                    {{ language == 'bn' ?
                                                    'সক্রিয়' : 'Active' }}
                                                </span> -->


                                                <span>
                                                    <v-switch :input-value="item.status == 1 ? true : false"
                                                        @change="deviceActivate(item.id)" hide-details
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
                                                    $helpers.englishToBangla(item.mobile_no) : item.mobile_no }}
                                                </span>

                                            </template>





                                            <!-- Action Button -->
                                            <template v-slot:item.actions="{ item }">
                                                <v-tooltip top>
                                                    <template v-slot:activator="{ on }">
                                                        <v-btn v-can="'trainerInfo-view'" fab x-small v-on="on"
                                                            color="#AFB42B" elevation="0" router class="white--text mt-1 
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
                                                            v-on="on" color="success" elevation="0" router
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
                                                        <v-btn v-can="'trainerInfo-delete'" fab x-small v-on="on"
                                                            color="grey" class="mr-2 white--text  mt-1" elevation="0"
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
                                                            :length="pagination.total" @input="onPageChange"
                                                            :total-visible="11"
                                                            class="custom-pagination-item"></v-pagination></v-col>
                                                    <v-col cols="12" lg="4" md="4" sm="12" xs="12" class="text-right">
                                                        <v-select dense style="
                     
                            
                                    
                                                " :items="items" hide-details dense outlined @change="perPageChange"
                                                            v-model="pagination.perPage"></v-select>


                                                    </v-col>
                                                </row>

                                            </template>
                                        </v-data-table>
                                    </v-col>
                                </v-row>

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
                        style="background-color: #1C3B68; color: white;font-size: 20px;">
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
            <!-- <v-dialog v-model="dialogEmail" width="350">
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
            </v-dialog> -->
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