<template>
    <div id="activity_log">
        <v-row class="mx-5 mt-4">
            <v-col cols="12">
                <v-row>
                    <v-col cols="12">
                        <!-- Expantion panels start -->
                        <v-expansion-panels>


                            <v-expansion-panel class="ma-2">
                                <v-expansion-panel-header color=#8C9EFF>
                                    <h3 class="white--text ">
                                        {{ $t("container.list.search") }}
                                    </h3>
                                </v-expansion-panel-header>
                                <v-expansion-panel-content class="elevation-0 transparent mt-10">
                                    <v-row>

                                        <v-col lg="6" md="6" cols="12">
                                     <v-menu
                v-model="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field outlined clearable
                    v-model="date"
                     :label="$t(
                         'container.system_audit.from_date'
                     )"
                    prepend-inner-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date"
                  @input="menu2 = false"
                ></v-date-picker>
              </v-menu>
                                        </v-col>
                                        
                                            <v-col lg="6" md="6" cols="12">
                                         <v-menu
                    v-model="menu2"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field outlined clearable
                        v-model="date"
                         :label="$t(
                             'container.system_audit.to_date'
                         )"
                        prepend-inner-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="date"
                      @input="menu2 = false"
                    ></v-date-picker>
                  </v-menu>
                                            </v-col>
                                        
                                        <v-col lg="6" md="6" cols="12">
                                            <v-autocomplete outlined clearable @input="onChangeDivision($event)"
                                                :label="$t('container.system_config.demo_graphic.division.division')"
                                                :items="divisions" item-text="name_en" item-value="id">

                                            </v-autocomplete>
                                        </v-col>
                                        <v-col lg="6" md="6" cols="12">
                                            <v-autocomplete outlined clearable
                                                :label="$t('container.system_config.demo_graphic.district.district')"
                                                :items="districts" item-text="name_en" item-value="id">

                                            </v-autocomplete>
                                        </v-col>

        <v-col lg="6" md="6" cols="12">
                                                <v-text-field outlined clearable @input="onChangeDivision($event)"
                                                    :label="$t('container.system_config.demo_graphic.office.office')"
                                                   >

                                                </v-text-field>
                                            </v-col>
                                                 <v-col lg="6" md="6" cols="12">
                                                <v-select outlined clearable
                                                    :label="$t('container.system_audit.activity_type')"
                                                    :items="activity_types" item-text="value" item-value="id">

                                                </v-select>
                                            </v-col>
                                                  <v-col lg="6" md="6" cols="12">
                                                <v-autocomplete outlined clearable
                                                    :label="$t('container.system_audit.user_id')"
                                                    :items="districts" item-text="name_en" item-value="id">

                                                </v-autocomplete>
                                            </v-col>

                                    </v-row>
                                    <div class="d-inline d-flex justify-end ">
                                        <v-btn elevation="2" class="btn mr-2" color="success">{{
                                            $t("container.list.search") }}</v-btn>
                                        <v-btn elevation="2" class="btn">{{ $t("container.list.reset") }}</v-btn>
                                    </div>

                                </v-expansion-panel-content>
                            </v-expansion-panel>
                        </v-expansion-panels>
                        <!-- Expantion panels end -->
                        <!-- Application list -->
                        <v-card elevation="10" color="white" rounded="md" theme="light" class="mb-8 mt-5">



                            <v-card-title class="justify-center" tag="div">
                                <h3 class="text-uppercase pt-3">
                                    {{ $t("container.system_audit.activity_list") }}
                                </h3>
                            </v-card-title>
                            <v-card-text>

                                <v-row class="ma-0  white round-border d-flex justify-space-between align-center"
                                    justify="center" justify-lg="space-between">

                                    <v-col cols="12">

                                        <v-data-table :headers="headers" :items="divisions" :loading="loading"
                                            item-key="id" :items-per-page="pagination.perPage" hide-default-footer
                                            class="elevation-0 transparent row-pointer">
                                            <template v-slot:item.sl="{ item, index }">
                                                {{
                                                    (pagination.current - 1) * pagination.perPage +
                                                    index +
                                                    1
                                                }}
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
                                                    <v-pagination circle primary v-model="pagination.current"
                                                        :length="pagination.total" @input="onPageChange" :total-visible="11"
                                                        class="custom-pagination-item"></v-pagination>
                                                </div>
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
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { extend, ValidationProvider, ValidationObserver } from "vee-validate";
import { required } from "vee-validate/dist/rules";

extend("required", required);
export default {
    name: "Index",
    title: "CTM - Allotment List",
    data() {
        return {
            data: {

            },

             date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            menu: false,
            modal: false,
            menu2: false,

            loading: false,
            search: "",
            delete_id: "",
            districts: [],
       
            activity_types: [{id:1,value:"Login"}, { id: 2, value: "payroll Approval" }],
            pagination: {
                current: 1,
                total: 0,
                perPage: 10,
            },
            items: [5, 10, 15, 20, 40, 50, 100],
        };
    },
    components: {
        ValidationProvider,
        ValidationObserver,
    },
    computed: {
        ...mapState({
            divisions: (state) => state.Division.divisions,

        }),
        headers() {
            return [
                { text: this.$t("container.list.sl"), value: "sl" },
                {
                    text: this.$t("container.system_audit.activity"),
                    value: "name_en",

                },
                {
                    text: this.$t(
                        "container.system_audit.user"
                    ),
                    value: "",
                },
                {
                    text: this.$t("container.system_audit.device_id"),
                    value: "100",
                },
                {
                    text: this.$t("container.system_audit.location"),
                    value: "100",
                },
                {
                    text: this.$t(
                        "container.system_audit.date_time"
                    ),
                    value: "",
                },
               
                

            ];
        },




    },

    methods: {
        ...mapActions({
            GetAllDivisions: "Division/GetAllDivisions",


        }),

        async onChangeDivision(event) {
            await this.$axios
                .get(`/admin/district/get/${event}`, {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((result) => {
                    this.districts = result.data.data;
                });
        },


        onPageChange($event) {
            // this.pagination.current = $event;
            this.GetAllotment();
        },

        async GetActivity() {
            const queryParams = {
                searchText: this.search,
                perPage: this.pagination.perPage,
                page: this.pagination.current,
            };
            this.$axios
                .get("/admin/division/get", {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                    params: queryParams,
                })
                .then((result) => {
                    this.divisions = result.data.data;
                    this.pagination.current = result.data.meta.current_page;
                    this.pagination.total = result.data.meta.last_page;
                    this.pagination.grand_total = result.data.meta.total;
                });


        },
        GetAllowance() {
            this.$axios
                .get("/admin/allowance/get", {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },

                })
                .then((result) => {
                    this.allowances = result.data.data;

                });

        },
        GetFinancial_Year() {
            this.$axios.get("/admin/financial-year/get", {
                headers: {
                    Authorization: "Bearer " + this.$store.state.token,
                    "Content-Type": "multipart/form-data",
                },

            })
                .then((result) => {
                    this.financial_years = result.data.data;

                });
        },

        updateHeaderTitle() {
            const title = this.$t(
                "container.system_audit.activity_log"
            );
            this.$store.commit("setHeaderTitle", title);
        },
    },
    watch: {
        "$i18n.locale": "updateHeaderTitle",

    },
    created() {



    },
    beforeMount() {
        this.updateHeaderTitle();
    },
    mounted() {

        this.GetAllDivisions();
        this.GetActivity();
   

    }
};
</script>