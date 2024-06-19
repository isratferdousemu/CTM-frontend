<script>
import { extend, ValidationProvider, ValidationObserver } from "vee-validate";
import { mapActions, mapState } from "vuex";
extend("checkUsername", {
    validate: (value) => {
        if (!value && value !== 0) {
            return false;
        }
        // Check if all characters are numeric and not allow special characters
        const isValid = /^[a-z][a-z0-9._]*$/.test(value);

        // Return true if both conditions are met
        return isValid;
    },
    message: "Username should be in lowercase and without any special character",
});


extend('name', {
    validate: value => {
        // Regular expression for IP address validation
        const nameRegex = /^[a-zA-Z\s'().]+$/;
        return nameRegex.test(value);
    },
    message: 'Please enter a valid  Name'
});
extend('mobile', {
    validate: value => {
        // Regular expression to match phone numbers with a maximum length of 14 characters

        const mobileRegex = /^01[3-9][0-9]{8}$/;;
        return mobileRegex.test(value);

    },
    message: 'Please enter a valid phone number'
});
extend('email', {
    validate: value => {
        // Regular expression for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    },
    message: 'Please enter a valid email address'
});
extend('bangla', {
    validate: value => {
        // Regular expression to match Bangla characters
        // const banglaRegex = /^[\u0980-\u09FF\s]+$/;
        const nonBanglaRegex = /^[^\u0980-\u09FF]*$/;
        return nonBanglaRegex.test(value);
    },
    message: 'Bangla characters are not allowed in this field'
});




export default {
    name: "ParticipantCreate",
    title: "CTM -Training Registration",
    components: {
        ValidationProvider,
        ValidationObserver,
       
     
            // Use the <ckeditor> component in this view.
           
        
    },

    data() {
        return {
     
         
          
          
            users:[],
            organizations:[],
            poll_programs:[],
              circulars:[],
            programs:[],
            getPartipant: 0,
            user_type_id:null,
            userType: [
                {
                    id: 1,
                    value_en: "Office User",
                    value_bn: "অফিস ব্যবহারকারী",
                },
                {
                    id: 2,
                    value_en: "Committee User",
                    value_bn: "কমিটির ব্যবহারকারী",
                },
            ],
            training_types: [{ "id": 0, "value_en": "Internal Participant", "value_bn": "অভ্যন্তরীণ অংশগ্রহণকারী" }, { "id": 1, "value_en": "External Participant", "value_bn": "বহিরাগত অংশগ্রহণকারী" }],
            
       
            data: {
                training_program_id: null,
                 training_circular_id: null,
                user_id: [],
                is_external: 0,
                email:null,
                full_name:null,
                mobile:null,
                user_name:null
              
              
            },
            poll: {
                training_program_id: null,
                training_circular_id: null,
                full_name: null,
                email: null,
              
             

            },
            location_id: null,
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
            locationType: [],

            thanas: [],
            cities: [],
            city_thanas: [],
            unions: [],
            pouros: [],
            wards: [],
            district_poros: [],
          
        };
    },
    computed:{
        language: {
            get() {
                return this.$store.getters.getAppLanguage;
            }
        },
        ...mapState({
            divisions: (state) => state.Division.divisions,

        }),
        

},

   

    mounted() {
        // this.Program();
        this.$store
            .dispatch("getGlobalLookupByType", 1)
            .then((res) => (this.locationType = res));

        this.GetAllDivisions();
        this.GetUser();
      
        this.GetCircular();
  
      
        
    },
    

    methods: {
        async GetUser() {
            const queryParams = {

                location_id: this.location_id,


            };

            this.$axios
                .get(`/admin/training/participants/users/3`, {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                    params: queryParams,

                })
                .then((result) => {

                    this.users = result?.data?.data;



                });
        },

        async GetUser_1() {
            const queryParams = {



            };

            this.$axios
                .get(`/admin/training/participants/users/3`, {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                    params: queryParams,

                })
                .then((result) => {

                    this.users = result?.data?.data;



                });
        },
        ...mapActions({
            GetAllDivisions: "Division/GetAllDivisions",
        }),


        getItemText(item) {
            return this.language === 'bn' ? item.name_bn : item.name_en;
        },
        getItemValue(item) {
            return this.language === 'bn' ? item.value_bn : item.value_en;
        },
        async LocationType($event) {
            // this.location_id = $event;
            // this.data.division_id = null;
            // this.data.district_id = null;
            this.data.thana_id = null;
            this.data.union_id = null;
            this.data.city_id = null;
            this.data.city_thana_id = null;
            this.data.district_pouro_id = null;
            this.data.pouro_id = null;
            this.data.ward_id = null;
            this.data.username = null;
            this.data.full_name = null;
            this.GetUser_1();

            // this.data.location_type = null;

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
                            console.log(this.district_poros, "district_poros")
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
            this.GetUser();
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
            this.GetUser();
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
            this.GetUser();

            this.LocationType(this.data.location_type);


        },
        async onChangeThana(event) {
            this.location_id = event;
            this.GetUser();

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
            this.GetUser();
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
            this.GetUser();
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
            this.GetUser();
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
            this.GetUser();
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
            this.GetUser();
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
        change(){
            this.data.training_circular_id=null;
            this.data.training_program_id = null;
            this.data.username = null;
            this.data.email = null;
            this.data.full_name = null;
            this.data.mobile = null;
        },
 
        setParticipant(value) {
            // Toggle value to trigger re-render
            if (this.getPartipant === value) {
                this.getPartipant = null;
                this.$nextTick(() => {
                    this.getPartipant = value;
                });
            } else {
                this.getPartipant = value;
            }
            console.log(value, "value");
            console.log(this.getPartipant, "getPartipant");
        }
    ,
        change() {
            this.programs = [];
            const selected_programs = this.circulars.find(circular => circular.id == this.data.training_circular_id);
            this.programs = selected_programs?.programs
            console.log(this.programs,"programs");



        },
        changePoll(){
            this.poll_programs = [];
            const selected_programs = this.circulars.find(circular => circular.id == this.poll.training_circular_id);
            this.poll_programs = selected_programs?.programs
       

        },
        
        // getItemText(item) {
        //     return this.language === 'bn' ? item.value_bn : item.value_en;
        // },
        
        itemText(item) {
            return `${item.circular_name} - ${item.id}`;
        }
       ,
        getprogram(item){
            return `${item.program_name} - ${item.id}`;
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
                   
                    this.circulars = result?.data?.data;

                });
        },
      
    

        async submitForm() {
            // this.data.is_external = parseInt(this.data.is_external, 10); // or +this.data.is_external
    
           await this.$axios
                .post("admin/training/participants", this.data, {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((result) => {
                  
                    this.$toast.success(result.data.message);
                    this.$router.push("/training-management/participant");
                

                })
                .catch((err) => {
                    if (err?.response?.data?.errors?.email && Array.isArray(err.response.data.errors.email) && err.response.data.errors.email.length > 0) {
                        this.$toast.error(err.response.data.errors.email[0]);
                    }

                    if (err?.response?.data?.errors?.username && Array.isArray(err.response.data.errors.username) && err.response.data.errors.username.length > 0) {
                        this.$toast.error(err.response.data.errors.username[0]);
                    }
                    // this.$toast.error(err.response.data.errors);
                    if (err?.response?.data?.errors?.training_program_id && Array.isArray(err.response.data.errors.training_program_id) && err.response.data.errors.training_program_id.length > 0) {
                        this.$toast.error(err.response.data.errors.training_program_id[0]);
                    }
                    // 
                    // this.$refs.form.setErrors(err.response.data.errors);  
                
                       
                   

                });

        },
        async submitPoll() {

            await this.$axios
                .post("admin/training/participants/external", this.poll, {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((result) => {

                    this.$toast.success(result.data.message);
                    this.$router.push("/training-management/participant");


                })
                .catch((err) => {
                    if (err?.response?.data?.errors?.training_program_id[0]) {
                        if (this.language == 'en') {
                            this.$toast.error("This program has already been taken by this participant");
                        }
                        else {
                            this.$toast.error("এই প্রোগ্রামটি ইতিমধ্যে এই অংশগ্রহণকারী দ্বারা নেওয়া হয়েছে");
                        }


                    }



                });

        },

       
     
    },
};
</script>

<template>
    <div id="participant_create">
        <v-row class="mx-5 mt-5">
            <v-col cols="12">
                <v-row>

                    <v-col cols="12">
                        <v-card>

                            <v-card-title class="justify-center" style="background-color: #1C3B68; color: white;">
                                <h4 class="white--text">
                                    {{ $t('container.training_management.training_registration.add_3') }}
                                </h4>
                            </v-card-title>



                            <v-card-text class="mt-10">
                                <ValidationObserver ref="form" v-slot="{ invalid }">
                                    <v-form v-on:submit.prevent="submitForm()">

                                        <v-row class="mx-10 no-gap-row">
                                            <v-col cols=" 12" sm="6" lg="6">
                                                <ValidationProvider name="training_circular_id"
                                                    vid="training_circular_id" rules="required" v-slot="{ errors }">
                                                    <v-autocomplete dense type="text"
                                                        v-model="data.training_circular_id" @input="change()"
                                                        :label="$t('container.training_management.training_program.training_circular')"
                                                        persistent-hint outlined :error="errors[0] ? true : false"
                                                        :items="circulars" :item-text="itemText" item-value="id"
                                                        :error-messages="errors[0] ? (language == 'bn' ? 'অনুগ্রহ পূর্বক সার্কুলার প্রদান করুন '
                                        : 'Please enter Circular') : ''">

                                                    </v-autocomplete>
                                                </ValidationProvider>
                                            </v-col>
                                            <v-col cols="12" sm="6" lg="6">
                                                <ValidationProvider name="Program Name" vid="training_program_id"
                                                    rules="required" v-slot="{ errors }">
                                                    <v-autocomplete dense type="text" v-model="data.training_program_id"
                                                        :items="programs" :item-text="getprogram" item-value="id"
                                                        :label="$t('container.training_management.training_program.program')
                                        " persistent-hint outlined :error="errors[0] ? true : false" :error-messages="errors[0] ? (language == 'bn' ? 'অনুগ্রহ পূর্বক প্রোগ্রাম প্রদান করুন '
                                        : 'Please enter a Program') : ''"></v-autocomplete>
                                                </ValidationProvider>
                                            </v-col>
                                            <v-col cols="12" sm="6" lg="6">
                                                <ValidationProvider name="Trainer Type" vid="is_external"
                                                    rules="required" v-slot="{ errors }">
                                                    <v-select @input="change()" dense type="text"
                                                        v-model="data.is_external" :label="$t('container.training_management.trainer_info.trainer_type')
                                        " :items="training_types" :item-text="getItemValue" item-value="id"
                                                        persistent-hint outlined :error="errors[0] ? true : false"
                                                        :error-messages="errors[0] ? (language == 'bn' ? 'অনুগ্রহ পূর্বক প্রশিক্ষকের ধরন প্রদান করুন '
                                        : 'Please enter  Trainer Type') : ''"></v-select>
                                                </ValidationProvider>
                                            </v-col>
                                            <v-col lg="6" md="6" cols="12" v-if="data.is_external == 0">

                                                <v-select dense @input="LocationType($event)"
                                                    v-model="data.location_type" outlined
                                                    :label="$t('container.list.location_type')" :items="locationType"
                                                    :item-text="getItemValue" item-value="id" required></v-select>

                                            </v-col>

                                            <v-col lg="6" md="6" cols="12" v-if="data.is_external == 0">
                                                <v-select dense outlined @input="onChangeDivision($event)"
                                                    v-model="data.division_id" :label="$t(
                                        'container.system_config.demo_graphic.division.division'
                                    )
                                        " :items="divisions" :item-text="getItemText" item-value="id" required>
                                                </v-select>

                                            </v-col>
                                            <v-col lg="6" md="6" cols="12" v-if="data.is_external == 0">

                                                <v-select dense outlined v-model="data.district_id"
                                                    @input="onChangeDistrict($event)" :label="$t(
                                        'container.system_config.demo_graphic.district.district'
                                    )
                                        " :items="districts" :item-text="getItemText" item-value="id"
                                                    required></v-select>

                                            </v-col>

                                            <v-col v-if="data.location_type == 1 && data.is_external == 0" lg="6" md="6"
                                                cols="12">

                                                <v-select dense @input="onChangeDistrictPouroGetWard($event)"
                                                    v-model="data.district_pouro_id" outlined :label="$t(
                                        'container.system_config.demo_graphic.ward.dist_pouro'
                                    )
                                        " :items="district_poros" :item-text="getItemText" item-value="id"></v-select>

                                            </v-col>

                                            <!-- <v-col v-if="data.location_type == 2" lg="6" md="6" cols="12">
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

                                            <v-col v-if="data.location_type == 3 && data.is_external == 0" lg="6" md="6"
                                                cols="12">
                                                <ValidationProvider name="city" vid="city_id" rules="required"
                                                    v-slot="{ errors }">
                                                    <v-select dense v-model="data.city_id"
                                                        @change="onChangeCity($event)" outlined :label="$t('container.system_config.demo_graphic.ward.city')
                                        " :items="cities" :item-text="getItemText" item-value="id" required
                                                        :error="errors[0] ? true : false"
                                                        :error-messages="errors[0]"></v-select>
                                                </ValidationProvider>
                                            </v-col>
                                            <v-col v-if="data.location_type == 2 && data.is_external == 0" lg="6" md="6"
                                                cols="12">

                                                <v-select dense v-model="data.thana_id" outlined :label="$t(
                                        'container.system_config.demo_graphic.ward.upazila'
                                    )
                                        " @change="onChangeUpazila($event)" :items="thanas" :item-text="getItemText"
                                                    item-value="id"></v-select>

                                            </v-col>

                                            <v-col v-if="data.location_type == 3 && data.is_external == 0" lg="6"
                                                md="6">

                                                <v-select @input="onChangeThanaGetWard($event)" dense
                                                    v-model="data.city_thana_id" outlined :label="$t('container.system_config.demo_graphic.ward.thana')
                                        " :items="city_thanas" :item-text="getItemText" item-value="id"
                                                    required></v-select>

                                            </v-col>
                                            <v-col v-if="data.location_type == 2 && data.is_external == 0" lg="6" md="6"
                                                cols="12">
                                                <v-select dense @input="onChangeSubLocationType($event)"
                                                    v-model="data.sub_location_type" outlined
                                                    :label="$t('container.system_config.demo_graphic.ward.subLocation_type')"
                                                    :items="subLocationType" :item-text="getItemText"
                                                    item-value="id"></v-select>
                                            </v-col>

                                            <v-col v-if="data.location_type == 2 && data.sub_location_type == 1" lg="6"
                                                md="6" cols="12">

                                                <v-select dense v-model="data.pouro_id" outlined :label="$t(
                                        'container.system_config.demo_graphic.ward.pouro'
                                    )
                                        " :items="pouros" :item-text="getItemText" item-value="id"
                                                    @input="onChangePouroGetWard($event)"></v-select>

                                            </v-col>
                                            <!-- :readonly="permissions?.user?.committee_type_id == 12 && data.pouro_id != null" -->

                                            <v-col v-if="data.sub_location_type == 2 &&
                                        data.location_type == 2" lg="6" md="6" cols="12">

                                                <v-select dense @input="onChangeUnionGetWard($event)"
                                                    v-model="data.union_id" outlined :label="$t(
                                        'container.system_config.demo_graphic.ward.union'
                                    )
                                        " :items="unions" item-text="name_en" item-value="id"></v-select>

                                            </v-col>
                                            <v-col lg="6" md="6" cols="12" v-if="data.is_external == 0">
                                                <ValidationProvider name="Ward" vid="ward_id" v-slot="{ errors }">
                                                    <v-select v-if="data.location_type" dense v-model="data.ward_id"
                                                        outlined claerable :label="$t(
                                        'container.system_config.demo_graphic.ward.ward'
                                    )
                                        " :items="wards" :item-text="getItemText" item-value="id"></v-select>
                                                </ValidationProvider>
                                            </v-col>
                                            <v-col cols=" 12" smdata.="6" lg="6" v-if="data.is_external == 0">
                                                <ValidationProvider name="Participant" vid="user_id" rules="required"
                                                    v-slot="{ errors }">
                                                    <v-autocomplete dense type="text" v-model="data.user_id"
                                                        :label="$t('container.training_management.training_registration.participant')"
                                                        persistent-hint outlined :error="errors[0] ? true : false"
                                                        :items="users" item-text="full_name" item-value="id"
                                                        :error-messages="errors[0] ? (language == 'bn' ? 'অনুগ্রহ পূর্বক অংশগ্রহণকারী প্রদান করুন '
                                        : 'Please enter valid participant') : ''">

                                                    </v-autocomplete>
                                                </ValidationProvider>
                                            </v-col>


                                            <v-col cols="12" sm="6" lg="6" v-if="data.is_external == 1">
                                                <ValidationProvider name="Username" rules="required||checkUsername"
                                                    vid="user_name" v-slot="{ errors }">
                                                    <v-text-field dense v-model="data.username" :label="$t('container.training_management.training_registration.user_name')
                                    " persistent-hint outlined :error="errors[0] ? true : false"
                                                        :error-messages="errors[0] ? (language == 'bn' ? 'অনুগ্রহ পূর্বক ব্যবহারকারীর নাম প্রদান করুন। ব্যবহারকারীর নাম অবশ্যই ছোট হাতের অক্ষরে এবং কোনো বিশেষ অক্ষর ছাড়াই হতে হবে'
                                    : 'Please enter  Username.Username should be in lowercase and without any special character') : ''"></v-text-field>
                                                </ValidationProvider>
                                            </v-col>
                                            <v-col cols="12" sm="6" lg="6" v-if="data.is_external == 1">
                                                <ValidationProvider name="Participant" rules="required||name"
                                                    vid="poll.participant" v-slot="{ errors }">
                                                    <v-text-field dense v-model="data.full_name" :label="$t('container.training_management.training_registration.full_name')
                                        " persistent-hint outlined :error="errors[0] ? true : false" :error-messages="errors[0] ? (language == 'bn' ? 'অনুগ্রহ পূর্বক গ্রহণযোগ্য সম্পূর্ণ নাম প্রদান করুন ।'
                                        : 'Please enter valid  Full Name') : ''"></v-text-field>
                                                </ValidationProvider>
                                            </v-col>
                                            <v-col cols="12" sm="6" lg="6" v-if="data.is_external == 1">
                                                <ValidationProvider name="Mobile" vid="mobile" rules="required||mobile"
                                                    v-slot="{ errors }">
                                                    <v-text-field dense type="text" v-model="data.mobile" :label="$t('container.training_management.trainer_info.mobile')
                                    " persistent-hint outlined :error="errors[0] ? true : false" :error-messages="errors[0] ? (language == 'bn' ? 'অনুগ্রহ পূর্বক গ্রহণযোগ্য মোবাইল নম্বর প্রদান করুন '
                                    : 'Please enter a valid Mobile Number') : ''"></v-text-field>
                                                </ValidationProvider>
                                            </v-col>

                                            <v-col cols="12" sm="6" lg="6" v-if="data.is_external == 1">
                                                <ValidationProvider name="Email" vid="email"
                                                    rules="required||email||bangla" v-slot="{ errors }">
                                                    <v-text-field placeholder="xxx@gmail.com" dense type="email"
                                                        v-model="data.email" :label="$t('container.training_management.trainer_info.email')
                                        " persistent-hint outlined :error="errors[0] ? true : false" :error-messages="errors[0] ? (language == 'bn' ? 'অনুগ্রহ পূর্বক গ্রহণযোগ্য ইমেইল প্রদান করুন '
                                        : 'Please enter a valid Email') : ''"></v-text-field>
                                                </ValidationProvider>
                                            </v-col>



                                        </v-row>
                                        <v-row class="justify-end mt-5 mb-5">
                                            <v-btn color="primary" class="custom-btn mr-2" router
                                                to="/training-management/participant" v-can="'participant-view'">{{
                                                $t("container.list.back") }}
                                            </v-btn>
                                            <v-btn color="success" type="submit" class="custom-btn mr-2"
                                                :disabled="invalid" >
                                                {{ $t("container.list.submit") }}
                                            </v-btn>
                                        </v-row>
                                    </v-form>
                                </ValidationObserver>


                            </v-card-text>

                        </v-card>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>


    </div>
</template>

<style >
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
.no-gap-row {
    margin-left: 0 !important;
    margin-right: 0 !important;
}

.no-gap-row .v-col {
    padding-left: 0 !important;
    padding-right: 0 !important;
}
</style>