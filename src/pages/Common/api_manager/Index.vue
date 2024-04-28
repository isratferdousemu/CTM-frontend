<script>
import LocaleSwitcher from "@/components/Common/LocaleSwitcher"
export default {
    name: "Index",
    title: "CTM - API Docimentation",
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
    components: {
    
        LocaleSwitcher
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
                { text: this.$t('container.api_manager.api_generate.parameter'), value: "selected_columns", width: "45%" },


                { text: this.$t('container.list.action'), value: "actions", align: "center", sortable: false, width: "20%" },
            ];
        },


    },

    mounted() {
        

    },

    methods: {
       

    },
}
</script>

<template>
    <div id="api-documentation">
        <v-app-bar color="#405c61" fixed height="80" class="px-4" dense dark>
            <v-row align="center" no-gutters>
                <v-img class="p-3 mr-4" max-height="100%" max-width="60px" position="center center"
                    src="/assets/images/logo.png"></v-img>
                <v-toolbar-title>{{ $t('container.application_selection.application.title_online_1') }}<br>{{
                    $t('container.application_selection.application.title_online_2') }}
                </v-toolbar-title>



                <v-col>
                    <!-- Empty column to create space between title and LocaleSwitcher -->
                </v-col>
                <v-col>
                    <!-- Empty column to create space between title and LocaleSwitcher -->
                </v-col>
                <v-col>
                    <!-- Empty column to create space between title and LocaleSwitcher -->
                </v-col>
                <v-col>
                    <!-- Empty column to create space between title and LocaleSwitcher -->
                </v-col>
                <v-col>
                    <!-- Empty column to create space between title and LocaleSwitcher -->
                </v-col>
                <v-col>
                    <!-- Empty column to create space between title and LocaleSwitcher -->
                </v-col>

                <v-col>
                    <v-row align="center" justify="end" no-gutters>
                        <v-col>
                            <!-- Adjust the styling of LocaleSwitcher as needed -->
                            <LocaleSwitcher />
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-app-bar>
        <template>
            <v-bottom-navigation v-model="value">
                <v-btn value="recent">
                    <span>Recent</span>

                    <v-icon>mdi-history</v-icon>
                </v-btn>

                <v-btn value="favorites">
                    <span>Favorites</span>

                    <v-icon>mdi-heart</v-icon>
                </v-btn>

                <v-btn value="nearby">
                    <span>Nearby</span>

                    <v-icon>mdi-map-marker</v-icon>
                </v-btn>
            </v-bottom-navigation>
        </template>

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
</style>