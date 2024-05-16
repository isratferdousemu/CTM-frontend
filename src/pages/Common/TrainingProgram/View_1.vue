<script>
import { ValidationObserver } from "vee-validate";
import LocaleSwitcher from "@/components/Common/LocaleSwitcher"
import FooterBar from "@/components/Common/FooterBar.vue";
export default {
    name: "Index",
    title: "CTM - Training Circular",
    data() {
        return {
            data: [],
            edited_on_days: [],
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
            time_slots: [],

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
    components: {

        LocaleSwitcher,
        FooterBar
    },

    computed: {
        sanitizedDescription() {
            // Sanitize HTML content using DOMParser
            const parser = new DOMParser();
            const doc = parser.parseFromString(this.data.description, 'text/html');
            return doc.body.innerHTML;
        },
        headers() {
            return [
                { text: this.$t('container.list.sl'), value: "id", align: "start", sortable: false, width: "15%" },
                { text: this.$t('container.api_manager.api_generate.api_name'), value: "name", width: "20%" },
                { text: this.$t('container.api_manager.api_generate.parameter'), value: "selected_columns", width: "45%" },
                { text: this.$t('container.api_manager.url_generate.url'), sortable: false, value: "api_url", width: "20%" },

            ];
        },
        language: {
            get() {
                return this.$store.getters.getAppLanguage;
            }
        },


    },

    mounted() {
        this.DataView();

    },

    methods: {
        emailAlert(id) {
            this.dialogEmail = true;
            this.email_id = id;
        },


        DataView() {
            console.log(this.$route.params.id, "params")
            this.$axios
                .get(`training/program-details/${this.$route.params.id}`, {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((result) => {

                    this.data = result?.data?.data;
                    const timeSlotsMap = new Map();
                    this.time_slots.forEach(slot => {
                        timeSlotsMap.set(slot.id.toString(), slot.time);
                    });

                    // Replace time slot IDs with time values


                    const updatedData = this.data.on_days.map(day => {
                        if (day.is_active === '1') {
                            const updatedTimeSlots = (day.timeSlots || []).map(slotId => timeSlotsMap.get(slotId) || slotId);
                            return { ...day, timeSlots: updatedTimeSlots };
                        } else {
                            return { ...day, timeSlots: null }; // If the day is not active, return it unchanged
                        }
                    });

                    this.edited_on_days = updatedData;


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
    <div id="url-generate">
        <v-app-bar color="#405c61" fixed height="80" class="px-4" dense dark>
            <v-row align="center" no-gutters>
                <v-img class="p-3 mr-4" max-height="100%" max-width="60px" position="center center"
                    src="/assets/images/logo.png"></v-img>
                <v-toolbar-title>{{ $t('container.application_selection.application.title_online_1') }}<br>{{
                    $t('container.application_selection.application.title_online_2') }}
                </v-toolbar-title>



              

                <v-col>
                    <v-row align="center" justify="end" no-gutters>
                        <v-col cols="12" class="text-right">
                            <!-- Adjust the styling of LocaleSwitcher as needed -->
                            <LocaleSwitcher />
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-app-bar>
        <v-row>
            <v-col cols="10" offset="1">
                <v-card class="mx-3">


                    <v-row class="my-custom-row ma-5">

                        <v-col cols="12" sm="12" md="12" class="mt-15 text-center">{{
                            $t("container.training_management.training_program.view") }}</v-col>
                        <v-col cols="12" sm="6" md="3" style="font-size:15px;">
                            <b>{{ $t('container.training_management.training_program.program') }}</b>:
                        </v-col>
                        <v-col cols="12" sm="6" md="9" style="font-size:15px;">
                            <b>:</b> <span class="ml-2">{{ data?.program_name }}</span>
                        </v-col>
                        <v-col cols="12" sm="6" md="3" style="font-size:15px;">
                            <b>{{ $t('container.training_management.training_program.training_circular') }}</b>:
                        </v-col>
                        <v-col cols="12" sm="6" md="9" style="font-size:15px;">
                            <b>:</b> <span class="ml-2"> {{ data?.training_circular?.circular_name
                                }}</span>
                        </v-col>
                        <v-col cols="12" sm="6" md="3" style="font-size:15px;">
                            <b>{{ $t('container.training_management.training_program.trainer') }}</b>:
                        </v-col>
                        <v-col cols="12" sm="6" md="9" style="font-size:15px;">
                            <b>:</b> <v-chip v-for="(item, index) in data.trainers" :key="index" class="ml-2 mt-2">
                                {{ item.name }}
                            </v-chip>
                        </v-col>

                        <v-col cols="12" sm="6" md="3" style="font-size:15px;">
                            <b>{{ $t('container.training_management.training_circular.module') }}</b>:
                        </v-col>
                        <v-col cols="12" sm="6" md="9" style="font-size:15px;">
                            <b>:</b>
                            <!-- <span class="ml-2">{{ language == 'bn' ?
                                    data?.modules
                                    ?.value_bn : data?.modules
                                    ?.value_en }}{{ data?.modules.value_bn }}
                                </span> -->
                            <v-chip v-for="(item, index) in data.modules" :key="index" class="ml-2 mt-2">
                                {{ language == 'bn' ?
                                item.value_bn : item.value_en }}
                            </v-chip>
                        </v-col>
                        <!-- <v-col cols="12" sm="6" md="3" style="font-size:15px;">
                                <b>{{ $t('container.training_management.training_circular.class_duration') }}</b>:
                            </v-col>
                            <v-col cols="12" sm="6" md="9" style="font-size:15px;">
                                <b>:</b> <span class="ml-2">{{ data?.class_duration }}</span>
                            </v-col> -->
                        <v-col cols="12" sm="6" md="3" style="font-size:15px;">
                            <b>{{ $t('container.training_management.training_circular.description') }}</b>:
                        </v-col>
                        <v-col cols="12" sm="6" md="9" style="font-size:15px;">
                            <b>:</b> <span class="ml-2"> {{ data?.description
                                }}</span>
                        </v-col>
                        <v-col cols="12" sm="6" md="3" style="font-size:15px;">
                            <b>{{ $t('container.api_manager.data_receiver.start_date') }}</b>:
                        </v-col>
                        <v-col cols="12" sm="6" md="9" style="font-size:15px;">
                            <b>:</b> <span class="ml-2">{{ language == 'bn' ?
                                $helpers.englishToBangla(data?.start_date) : data?.start_date }}</span>
                        </v-col>
                        <v-col cols="12" sm="6" md="3" style="font-size:15px;">
                            <b>{{ $t('container.api_manager.data_receiver.end_date') }}</b>:
                        </v-col>
                        <v-col cols="12" sm="6" md="9" style="font-size:15px;">
                            <b>:</b> <span class="ml-2">{{ language == 'bn' ?
                                $helpers.englishToBangla(data?.end_date) : data?.end_date }}</span>
                        </v-col>
                        <v-col cols="12" sm="6" md="3" style="font-size:15px;">
                            <b>{{ $t('container.list.status') }}</b>:
                        </v-col>
                        <v-col cols="12" sm="6" md="9" style="font-size:15px;">
                            <b>:</b> <span class="ml-2" v-if="data?.status == 0">
                                {{ language == 'bn' ?
                                'নিষ্ক্রিয়' : 'Inactive' }}
                            </span>
                            <span class="ml-2" v-else>
                                {{ language == 'bn' ?
                                'সক্রিয়' : 'Active' }}
                            </span>
                        </v-col>



                        <!-- Other fields -->

                    </v-row>
                    <v-row class="ma-5">
                        <v-col cols="12">
                            <h5 class="text-center mb-5">{{
                                $t('container.training_management.training_program.class_schedule') }}</h5>

                            <v-simple-table dense class=" mt-10">
                                <template v-slot:default>
                                    <thead>
                                        <tr>
                                            <th class="text-left">

                                                {{ language == 'bn' ?
                                                'দিন' : ' Day' }}
                                            </th>

                                            <th class="text-left">
                                                {{ language == 'bn' ?
                                                'স্ট্যাটাস' : 'Status' }}
                                            </th>
                                            <th class="text-left">
                                                {{ language == 'bn' ?
                                                'টাইম স্লট' : ' Time Slots' }}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(day, index) in edited_on_days" :key="index">
                                            <td>{{ day.day }}</td>
                                            <td>
                                                <span
                                                    :style="{ color: day.is_active == '1' ? 'green' : 'red', fontSize: '24px' }">
                                                    <span v-if="day.is_active == '1'">&#10003;</span>
                                                    <span v-else>-</span>
                                                </span>
                                            </td>
                                            <td>
                                                <span v-if="day.timeSlots && day.timeSlots.length">
                                                    <span v-for="(timeSlot, slotIndex) in day.timeSlots"
                                                        :key="slotIndex">
                                                        {{ timeSlot }}<span
                                                            v-if="slotIndex !== day.timeSlots.length - 1">, </span>
                                                    </span>
                                                </span>
                                                <span v-else> {{ language == 'bn' ?
                                                    'টাইম স্লট নেই' : 'No Time Slots' }}</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </v-col>
                    </v-row>


                </v-card>
            </v-col>
        </v-row>



        <!-- Mail modal -->
        <br></br>
        <FooterBar />
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