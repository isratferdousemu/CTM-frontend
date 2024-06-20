<script>
import { ValidationObserver } from "vee-validate";
export default {
    name: "Index",
    title: "CTM - Training Program",
    data() {
        return {
            data: [],
            edited_on_days:[],
            showPassword: false,
            total: null,
            org_name: null,
            module_id: null,
            modules: [],

            dialogAdd: false,
            deleteDialog: false,
            dialogEmail: false,
            delete_loading: false,
            loading: false,
            search: "",
            delete_id: "",
            email_id: "",
            time_slots:[],

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


    },

    mounted() {
        this.GetTimeSlot();
        this.DataView();

    },

    methods: {
        async GetTimeSlot() {

          await  this.$axios
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
        
        emailAlert(id) {
            this.dialogEmail = true;
            this.email_id = id;
        },

        
        async  DataView() {
            console.log(this.$route.params.id, "params")
            await  this.$axios
                .get(`admin/training/programs/${this.$route.params.id}`, {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((result) => {
                    
                    
             
                 
                    this.data = result?.data?.data;
                    setTimeout(() => {
                        const timeSlotsMap = new Map();
                        this.time_slots.forEach(slot => {
                            timeSlotsMap.set(slot.id.toString(), slot.time);
                        });
                        // Code to execute after delay
               
                    
                    
                   

                        const updatedData = this.data.on_days.map(day => {
                            if (day.is_active === '1') {
                                const updatedTimeSlots = (day.timeSlots || []).map(slotId => timeSlotsMap.get(slotId) || slotId);
                                return { ...day, timeSlots: updatedTimeSlots };
                            } else {
                                return { ...day, timeSlots: null }; // If the day is not active, return it unchanged
                            }
                        });
                

                        this.edited_on_days = updatedData;
                    }, 1500);
                    // Replace time slot IDs with time values
                  
                 
               
                   
                    
                 

                })
                .catch((err) => {
                    if (this.$refs.formAdd && this.$refs.formAdd.$refs && this.$refs.formAdd.$refs.operator) {

                        this.$refs.formAdd.$refs.operator.setErrors([err.response.data.errors.operator[0]]);
                    } else {
                        console.error('Error setting errors:', err);
                    }

                });

        },




    },
}
</script><template>
    <div id="training-program">
        <v-container>
            <v-row>
                <v-col cols="12">
                    <v-card class="mx-3">
                        <v-card-title class="justify-center black--text"
                            style="background-color: #1C3C6A; color: white;font-size: 17px;">
                            <h4 class="white--text">{{ $t("container.training_management.training_program.view") }}
                            </h4>
                        </v-card-title>

                        <v-row class="my-custom-row ma-5">
                            <v-col cols="2" style="font-size:13px;">
                                <b>{{ $t('container.training_management.training_program.program_name') }}</b>:
                            </v-col>
                            <v-col cols="10" style="font-size:13px;">
                                <b>:</b> <span class="ml-2">{{ data?.program_name }}</span>
                            </v-col>
                            <v-col cols="2" style="font-size:13px;">
                                <b>{{ $t('container.training_management.training_program.training_circular') }}</b>:
                            </v-col>
                            <v-col cols="10" style="font-size:13px;">
                                <b>:</b> <span class="ml-2"> {{data?.training_circular?.circular_name
                                    }}</span>
                            </v-col>
                            <v-col cols="2" style="font-size:13px;">
                                <b>{{ $t('container.training_management.training_circular.training_type') }}</b>:
                            </v-col>
                            <v-col cols="10" style="font-size:13px;">
                                <b>:</b> <span class="ml-2">
                                    {{ language == 'bn' ?
                                    data?.training_circular?.training_type.value_bn :
                                    data?.training_circular?.training_type.value_en }}</span>
                            </v-col>
                            <v-col cols="2" style="font-size:13px;">
                                <b>{{ $t('container.training_management.training_program.trainer') }}</b>:
                            </v-col>
                            <v-col cols="10" style="font-size:13px;">
                                <b>:</b> <v-chip v-for="(item, index) in data.trainers" :key="index" class="ml-2 mt-2">
                                    {{ item.name}}
                                </v-chip>
                            </v-col>

                            <v-col cols="2" style="font-size:13px;">
                                <b>{{ $t('container.training_management.training_circular.module') }}</b>:
                            </v-col>
                            <v-col cols="10" style="font-size:13px;">
                                <b>:</b>

                                <v-chip v-for="(item, index) in data.modules" :key="index" class="ml-2 mt-2">
                                    {{ language == 'bn' ?
                                    item.value_bn : item.value_en }}
                                </v-chip>
                            </v-col>

                            <v-col cols="2" style="font-size:13px;">
                                <b>{{ $t('container.training_management.training_circular.description') }}</b>:
                            </v-col>
                            <v-col cols="10" class="d-flex align-items-start">
                                <b>:</b>

                                <div v-html="data?.description" class="ml-3"></div>
                            </v-col>
                            <v-col cols="2" style="font-size:13px;">
                                <b>{{ $t('container.training_management.training_program.start_date') }}</b>:
                            </v-col>
                            <v-col cols="10" style="font-size:13px;">
                                <b>:</b> <span class="ml-2">{{ language == 'bn' ?
                                    $helpers.englishToBangla(data?.start_date) : data?.start_date }}</span>
                            </v-col>
                            <v-col cols="2" style="font-size:13px;">
                                <b>{{ $t('container.training_management.training_program.end_date') }}</b>:
                            </v-col>
                            <v-col cols="10" style="font-size:13px;">
                                <b>:</b> <span class="ml-2">{{ language == 'bn' ?
                                    $helpers.englishToBangla(data?.end_date) : data?.end_date }}</span>
                            </v-col>

                            <template v-if="!data.participant">
                                <v-col cols="2" style="font-size:13px;">
                                    <b>{{ $t('container.training_management.training_program.form_id') }}</b>:
                                </v-col>
                                <v-col cols="10" style="font-size:13px;">
                                    <b>:</b> <span class="ml-2">{{ data?.form_id }}</span>
                                </v-col>
                                <v-col cols="2" style="font-size:13px;">
                                    <b>{{ $t('container.training_management.training_program.training_form_id') }}</b>:
                                </v-col>
                                <v-col cols="10" style="font-size:13px;">
                                    <b>:</b> <span class="ml-2">{{ data?.training_form_id }}</span>
                                </v-col>
                                <v-col cols="2" style="font-size:13px;">
                                    <b>{{ $t('container.training_management.training_program.exam_link') }}</b>:
                                </v-col>
                                <v-col cols="10" style="font-size:13px;">
                                    <b>:</b> <span class="ml-2">{{ data?.question_link }}</span>
                                </v-col>
                                <v-col cols="2" style="font-size:13px;">
                                    <b>{{ $t('container.training_management.training_program.rating_link') }}</b>:
                                </v-col>
                                <v-col cols="10" style="font-size:13px;">
                                    <b>:</b> <span class="ml-2">{{ data?.trainer_ratings_link }}</span>
                                </v-col>
                            </template>


                            <v-col cols="2" style="font-size:13px;">
                                <b>{{ $t('container.list.status') }}</b>:
                            </v-col>
                            <v-col cols="10" style="font-size:13px;">
                                <b>:</b> <span class="ml-2">
                                    {{ language == 'bn' ?
                                    data?.status_name.value_bn : data?.status_name.value_en }}
                                </span>

                            </v-col>

                            <v-col cols="2" style="font-size:13px;">
                                <b>{{ $t('container.training_management.training_program.exam_status') }}</b>:
                            </v-col>
                            <v-col cols="10" style="font-size:13px;">
                                <b>:</b> <span class="ml-2" v-if="data?.exam_status == 0">
                                    {{ language == 'bn' ?
                                    'নিষ্ক্রিয়' : 'Inactive' }}
                                </span>
                                <span class="ml-2" v-else>
                                    {{ language == 'bn' ?
                                    'সক্রিয়' : 'Active' }}
                                </span>
                            </v-col>
                            <v-col cols="2" style="font-size:13px;">
                                <b>{{
                                    $t('container.training_management.training_program.trainer_rating_status')
                                    }}</b>:
                            </v-col>
                            <v-col cols="10" style="font-size:13px;">
                                <b>:</b> <span class="ml-2" v-if="data?.rating_status == 0">
                                    {{ language == 'bn' ?
                                    'নিষ্ক্রিয়' : 'Inactive' }}
                                </span>
                                <span class="ml-2" v-else>
                                    {{ language == 'bn' ?
                                    'সক্রিয়' : 'Active' }}
                                </span>
                            </v-col>


                            <template v-if="data.participant">
                                <v-col cols="2" style="font-size:13px;">
                                    <b>{{ $t('container.training_management.training_program.employee_id') }}</b>:
                                </v-col>
                                <v-col cols="10" style="font-size:13px;">
                                    <b>:</b> <span class="ml-2">{{ language == 'bn' ?
                                        $helpers.englishToBangla(data?.participant?.user_id) :
                                        data?.participant?.user_id }}</span>
                                </v-col>

                                <v-col cols="2" style="font-size:13px;">
                                    <b>{{ $t('container.training_management.training_program.passcode') }}</b>:
                                </v-col>
                                <v-col cols="10" style="font-size:13px;">
                                    <b>:</b> <span class="ml-2">{{ language == 'bn' ?
                                        $helpers.englishToBangla(data?.participant?.passcode) :
                                        data?.participant?.passcode }}</span>
                                </v-col>
                            </template>


                            <!-- Other fields -->

                        </v-row>

                        <v-row class="ma-5" v-if="edited_on_days && edited_on_days.length > 0">
                            <v-col cols="12">
                                <h4 class="text-center mb-5">{{
                                    $t('container.training_management.training_program.class_schedule') }}</h4>

                                <v-simple-table dense class="mt-10" v-if="edited_on_days">
                                    <template v-slot:default>
                                        <thead>
                                            <tr>
                                                <th class="text-left">{{ language == 'bn' ? 'দিন' : 'Day' }}</th>
                                                <th class="text-left">{{ language == 'bn' ? 'স্ট্যাটাস' : 'Status' }}
                                                </th>
                                                <th class="text-left">{{ language == 'bn' ? 'টাইম স্লট' : 'Time Slots'
                                                    }}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(day, index) in edited_on_days" :key="index"
                                                v-if="day.timeSlots && day.timeSlots.length > 0">
                                                <td>{{ day.day }}</td>
                                                <td>
                                                    <span
                                                        :style="{ color: day.is_active == '1' ? 'green' : 'red', fontSize: '24px' }">
                                                        <span v-if="day.is_active == '1'">&#10003;</span>
                                                        <span v-else>-</span>
                                                    </span>
                                                </td>
                                                <td>
                                                    <span>
                                                        <span v-for="(timeSlot, slotIndex) in day.timeSlots"
                                                            :key="slotIndex">
                                                            {{ timeSlot }}
                                                            <span v-if="slotIndex !== day.timeSlots.length - 1">,
                                                            </span>
                                                        </span>
                                                    </span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </template>
                                </v-simple-table>
                            </v-col>
                        </v-row>

                        <v-row class="justify-end ma-5">
                            <v-btn flat color="primary" class="custom-btn mr-2 mb-5" router
                                to="/training-management/training-program">
                                {{ $t("container.list.back") }}
                            </v-btn>

                        </v-row>
                    </v-card>
                </v-col>
            </v-row>




        </v-container>
    </div>
</template>
</script>

<style scoped>
.my-custom-row {
    font-size: 16px;
    /* Default font size for other devices */
}

@media (max-width: 600px) {

    /* Vuetify xs breakpoint */
    .my-custom-row {
        font-size: 12px;
        /* Smaller font size for extra small devices */
    }
}
</style>