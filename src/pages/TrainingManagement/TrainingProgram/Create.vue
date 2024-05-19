<script>
import { extend, ValidationProvider, ValidationObserver } from "vee-validate";


extend('checklength', {
    validate: value => {
        return value.length <= 10;
    },
    message: 'Please enter a 10 character'
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
extend('name', {
    validate: value => {
        // Regular expression for IP address validation
        const nameRegex = /^[a-zA-Z\s']+$/;
        return nameRegex.test(value);
    },
    message: 'Please enter a valid  Name'
});

extend('end_date', {
    validate(value, { start_date }) {
        // Check if both start_date and end_date are provided
        if (value && start_date) {
            // Convert start_date and end_date to Date objects
            const startDate = new Date(start_date);
            const endDate = new Date(value);

            // Compare start_date and end_date
            return endDate >= startDate;
        }
        // If start_date is not provided, return true
        return true;
    },
    params: ['start_date'],
    message: 'The End Date must be greater than or equal to the Start Date'
});
extend('start_date', {
    validate(value, { end_date }) {
        // Check if both start_date and end_date are provided
        if (value && end_date) {
            // Convert start_date and end_date to Date objects
            const endDate = new Date(end_date);
            const startDate = new Date(value);

            // Compare start_date and end_date
            return endDate >= startDate;
        }
        // If start_date is not provided, return true
        return true;
    },
    params: ['end_date'],
    message: 'The Start Date must be less than or equal to the End Date'
});




export default {
    name: "TrainingProgramCreate",
    title: "CTM -Training program",
    components: {
        ValidationProvider,
        ValidationObserver,
       
     
            // Use the <ckeditor> component in this view.
           
        
    },

    data() {
        return {
     
         
          
            circular_types:[],
            modules:[],
            program_trainers:[],
            timeSlotModal:false,
            selected_day:null,
            selectedTimeSlots:[],
            time_slots: [
                
            ],
       
            data: {
                 program_name: null,
                 training_circular_id: null,
                 circular_modules: [],
                  trainers: [],
                  description: null,
                  start_date: null,
                  end_date: null,
                
                  on_days: [
                    {
                        "day": "Sat",
                        "is_active": 0,
                        "timeSlots": []
                    },
                    {
                        "day": "Sun",
                        "is_active": 0,
                        "timeSlots": []
                    },
                    {
                        "day": "Mon",
                        "is_active": 0,
                        "timeSlots": [
                         ]
                    },
                    {
                        "day": "Tue",
                        "is_active": 0,
                        "timeSlots": []
                    },
                    {
                        "day": "Wed",
                        "is_active": 0,
                        "timeSlots": []
                    },
                    {
                        "day": "Thu",
                        "is_active": 0,
                        "timeSlots": []
                    },
                    {
                        "day": "Fri",
                        "is_active": 0,
                        "timeSlots": []
                    }
                ]
            },
            designations:[]
        };
    },
    computed:{
        language: {
            get() {
                return this.$store.getters.getAppLanguage;
            }
        },
    },

   

   

    mounted() {
        this.Programtrainers();
        this.GetCircular();
        this.GetTimeSlot();
      
        
    },
    

    methods: {
        change(){
            this.data.circular_modules = [];
            const selected_circular = this.circulars.find(circular => circular.id == this.data.training_circular_id);
            this.modules = selected_circular?.modules
      
          

        },
        showTimeSlotModal(day) {
            if (day.is_active == 1) {
                this.selected_day=day.day
                this.timeSlotModal = true;
            }
            else{
                const inactiveDay = this.data.on_days.find(d => d.day == day.day);
                inactiveDay.timeSlots = [];
            }
        },
        saveTimeSlots() {
            // Add selected time slots to the active day's timeSlots array
        
            const activeDay = this.data.on_days.find(day => day.is_active == 1 && this.selected_day==day.day);
            console.log(activeDay,"activeDay");
            console.log(this.selectedTimeSlots,"selectedTimeSlots")
            
            activeDay.timeSlots.push(...this.selectedTimeSlots);
           
            this.closeTimeSlotModal();
        },
        closeTimeSlotModal() {
            this.timeSlotModal = false;
            this.selectedTimeSlots = []; 
            this.selected_day = null;// Clear selected time slots
        },
      
        
        getItemText(item) {
            return this.language === 'bn' ? item.value_bn : item.value_en;
        },
        
        async GetTimeSlot() {

            this.$axios
                .get("/admin/training/program-time-slots", {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },

                })
                .then((result) => {

                    this.time_slots = result?.data?.data;





                });
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
                   
                    this.circulars = result?.data?.data;
                  

                


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
                    console.log(this.program_trainers,"program_trainers")





                });
        },
       

    

        submitForm() {
           
            const inactiveDay = this.data.on_days.find(day => day.is_active == 1 );
            if (!inactiveDay) {
                const message = this.language === 'bn' ? 'অনুগ্রহ করে   দিন নির্বাচন করুন সময় স্লট সহ' : 'Please select  day with time slots';
                this.$toast.error(message);
            
                return false;
            }
            const activeDayWithEmpty = this.data.on_days.find(day => day.is_active == 1 && day.timeSlots.length === 0);

            if (activeDayWithEmpty) {
                const message = this.language === 'bn' ? `অনুগ্রহ করে ${activeDayWithEmpty.day} এ সময় স্লট যোগ করুন` : `Please add time slots On ${activeDayWithEmpty.day} `;
                this.$toast.error(message);
                return false;
            }
             
           console.log(this.data,"submitdata")

       
            this.data.on_days.forEach(day => {
                if (!day.timeSlots) {
                    day.timeSlots = []; // If timeSlots array doesn't exist, create it as an empty array
                }
                console.log(this.data,"submitted");
            });
            this.$axios
                .post("admin/training/programs", this.data, {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((result) => {
                  
                    this.$toast.success(result.data.message);
                    this.$router.push("/training-management/training-program");
                

                })
                .catch((err) => {
                   

                });

        },
       
     
    },
};
</script>

<template>
    <div id="circular_create">
        <v-row class="mx-5 mt-5">
            <v-col cols="12">
                <v-row>

                    <v-col cols="12">
                        <v-card>

                            <v-card-title class="justify-center"
                                style="background-color: #1C3B68; color: white;font-size: 17px;">
                                <h4 class="white--text">
                                    {{ $t("container.training_management.training_program.add") }}
                                </h4>
                            </v-card-title>

                            <v-divider></v-divider>



                            <v-card-text class="mt-10">
                                <ValidationObserver ref="form" v-slot="{ invalid }">
                                    <v-form v-on:submit.prevent="submitForm()">

                                        <v-row class="mx-10 no-gap-row">
                                            <v-col cols="12" sm="6" lg="6">
                                                <ValidationProvider name="Program Name" vid="program_name"
                                                    rules="required" v-slot="{ errors }">
                                                    <v-text-field dense type="text" v-model="data.program_name" :label="$t('container.training_management.training_program.program_name')
                                        " persistent-hint outlined :error="errors[0] ? true : false" :error-messages="errors[0] ? (language == 'bn' ? 'অনুগ্রহ পূর্বক প্রোগ্রামের  নাম প্রদান করুন '
                                        : 'Please enter a Program Name'): ''"></v-text-field>
                                                </ValidationProvider>
                                            </v-col>
                                            <v-col cols=" 12" sm="6" lg="6">
                                                <ValidationProvider name="training_circular_id"
                                                    vid="training_circular_id" rules="required" v-slot="{ errors }">
                                                    <v-autocomplete dense type="text"
                                                        v-model="data.training_circular_id " @input="change()"
                                                        :label="$t('container.training_management.training_program.training_circular') "
                                                        persistent-hint outlined :error="errors[0] ? true : false"
                                                        :items="circulars" item-text="circular_name" item-value="id"
                                                        :error-messages="errors[0] ? (language == 'bn' ? 'অনুগ্রহ পূর্বক সার্কুলার প্রদান করুন '
                                        : 'Please enter Circular') : ''">

                                                    </v-autocomplete>
                                                </ValidationProvider>
                                            </v-col>



                                            <v-col cols=" 12" sm="6" lg="6">
                                                <ValidationProvider name="Module" vid="module" rules="required"
                                                    v-slot="{ errors }">
                                                    <v-select multiple dense type="text" v-model="data.circular_modules"
                                                        :label="$t('container.training_management.training_circular.module')"
                                                        persistent-hint outlined :error="errors[0] ? true : false"
                                                        :items="modules" :item-text="getItemText" item-value="id"
                                                        :error-messages="errors[0] ? (language == 'bn' ? 'অনুগ্রহ পূর্বক মডিউল/কোর্স প্রদান করুন '
    : 'Please enter Module/Course') : ''">
                                                        <template v-slot:selection="{ item }">
                                                            <v-chip class="ma-1 white--text" color="blue"
                                                                v-if="language =='en'">{{
                                                                item.value_en }}</v-chip>
                                                            <v-chip class="ma-1 white--text" color="blue" v-else>{{
                                                                item.value_bn }}</v-chip>


                                                        </template>
                                                    </v-select>
                                                </ValidationProvider>
                                            </v-col>
                                            <v-col cols=" 12" sm="6" lg="6">
                                                <ValidationProvider name="Trainer" vid="trainers" rules="required"
                                                    v-slot="{ errors }">
                                                    <v-select multiple dense v-model="data.trainers"
                                                        :label="$t('container.training_management.training_program.trainer')"
                                                        persistent-hint outlined :error="errors[0] ? true : false"
                                                        :items="program_trainers" item-text="name" item-value="id"
                                                        :error-messages="errors[0] ? (language == 'bn' ? 'অনুগ্রহ পূর্বক প্রশিক্ষক প্রদান করুন '
                                        : 'Please enter Trainer') : ''">
                                                        <template v-slot:selection="{ item }">
                                                            <v-chip class="ma-1 white--text" color="blue">{{
                                                                item.name }}</v-chip>



                                                        </template>
                                                    </v-select>
                                                </ValidationProvider>
                                            </v-col>
                                            <v-col cols="12" sm="6" lg="6">
                                                <ValidationProvider name="BIO" vid="description" v-slot="{ errors }">
                                                    <v-textarea dense v-model="data.description" :label="$t('container.training_management.training_circular.description')
                                        " persistent-hint outlined :error="errors[0] ? true : false" :error-messages="errors[0] ? (language == 'bn' ? 'অনুগ্রহ পূর্বক বিবরণ প্রদান করুন '
                                        : 'Please enter  Description') : ''"></v-textarea>
                                                </ValidationProvider>
                                            </v-col>


                                            <v-col cols=" 12" sm="12" lg="12" xs="12" xl="12">
                                                <v-card>
                                                    <v-card-text>
                                                        <v-row>

                                                            <v-col cols="12" sm="6" lg="6" xs="6" xl="6">
                                                                <ValidationProvider name="start_date" vid="start_date"
                                                                    :rules="{ required, start_date: data.end_date }"
                                                                    v-slot="{ errors }">
                                                                    <v-text-field dense type="date"
                                                                        v-model="data.start_date" :label="$t('container.training_management.training_circular.start_date')
                                        " persistent-hint outlined :error="errors[0] ? true : false" :error-messages="errors[0] ? (language == 'bn' ? 'অনুগ্রহ পূর্বক গ্রহণযোগ্য শুরুর তারিখ প্রদান করুন '
                                        : 'Please enter a valid Start Date') : ''"></v-text-field>
                                                                </ValidationProvider>
                                                            </v-col>
                                                            <v-col cols="12" sm="6" lg="6" xs="6" xl="6">
                                                                <ValidationProvider name="end_date" vid="end_date"
                                                                    :rules="{ required, end_date: data.start_date }"
                                                                    v-slot="{ errors }">
                                                                    <v-text-field dense type="date"
                                                                        v-model="data.end_date" :label="$t('container.training_management.training_circular.end_date')
                                        " persistent-hint outlined :error="errors[0] ? true : false" :error-messages="errors[0] ? (language == 'bn' ? 'অনুগ্রহ পূর্বক গ্রহণযোগ্য শেষ তারিখ  প্রদান করুন '
                                        : 'Please enter a valid End Date') : ''"></v-text-field>
                                                                </ValidationProvider>
                                                            </v-col>
                                                            <v-col cols="12" sm="12" lg="12">
                                                                <h3 class="text-center mb-10">{{ $t('container.training_management.training_program.class_schedule') }}</h3>

                                                                <v-row>
                                                                    <v-col v-for="(day, index) in data.on_days"
                                                                        :key="index" cols="12" md="2" lg="2" xs="2" xl="2">
                                                                        <v-checkbox v-model="day.is_active"
                                                                            @change="showTimeSlotModal(day)"
                                                                            :true-value="1" :false-value="0"
                                                                            :label="day.day"></v-checkbox>

                                                                    </v-col>
                                                                </v-row>

                                                         


                                                            </v-col>
                                                        </v-row>
                                                    </v-card-text>
                                                </v-card>

                                            </v-col>





                                            <v-col cols="12" sm="6" lg="6">


                                            </v-col>

                                        </v-row>
                                        <v-row class="justify-end mt-5 mb-5">
                                            <v-btn flat color="primary" class="custom-btn mr-2" router
                                                to="/training-management/training-program">{{
                                                $t("container.list.back") }}
                                            </v-btn>
                                            <v-btn flat color="success" type="submit" class="custom-btn mr-2"
                                                :disabled="invalid">
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
        <v-dialog v-model="timeSlotModal" max-width="500">
            <v-card style="justify-content: center; text-align: center">
                <v-card-title class="font-weight-bold justify-center"
                    style="background-color: #1C3C6A; color: white;font-size: 12px;">
                    {{ $t('container.training_management.training_program.select_time_slot') }}
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <div class="subtitle-1 font-weight-medium mt-5">


                        <v-row>
                            <v-col v-for="slot in time_slots" :key="slot.id" cols="4">
                                <v-checkbox v-model="selectedTimeSlots" :value="slot.id"
                                    :label="slot.time"></v-checkbox>

                            </v-col>
                        </v-row>

                    </div>
                </v-card-text>

                <v-card-actions style="display: block">
                    <v-row class="mx-0 my-0 py-2" justify="center">
                        <v-btn text @click="closeTimeSlotModal" outlined class="custom-btn-width py-2 mr-10">
                            {{ $t('container.list.cancel') }}
                        </v-btn>

                        <v-btn text @click="saveTimeSlots" color="white" :loading="delete_loading"
                            class="custom-btn-width primary white--text py-2">
                            {{ $t('container.list.save') }}
                        </v-btn>
                    </v-row>
                </v-card-actions>
            </v-card>
        </v-dialog>

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