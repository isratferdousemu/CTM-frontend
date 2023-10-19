<template>
    <div id="aplication_list">
        <v-row class="mx-5 mt-4">
            <v-col cols="12">
                <v-card>
                    <v-row>

                        <v-col lg="6" md="6" cols="12" class="ma-5">
                            <v-card justify="center">
                                <v-card-title>

                                </v-card-title>
                                <v-card-text>
                                    <table >
                                        <tr>
                                            <td>Beneficiary ID</td>
                                            <td>: 1235</td>
                                           
                                        </tr>
                                        <tr>
                                             <td> Name</td>
                                                <td>: Radur Rahim</td>
                                        </tr>
                                          <tr>
                                                 <td> Address</td>
                                                    <td>: Naogaon sadar, Naogaon</td>
                                            </tr>

                                    </table>

                                    

                                </v-card-text>



                            </v-card>
                        </v-col>

                        <v-col cols="12" >

                            <v-expansion-panels>
                                <v-expansion-panel  >
                                    <v-expansion-panel-header color=#8C9EFF class="white--text">
                                        {{ $t('container.beneficiary_management.beneficiary_list.payment_history') }}
                                    </v-expansion-panel-header>
                                    <v-expansion-panel-content class="mt-5">
                                        <v-row>
                                            <v-col lg="6" md="6" cols="12">
                                                <v-text-field v-model="data.total_receive"
                                                    :label="$t('container.beneficiary_management.beneficiary_list.total_receive')"
                                                    outlined clearable>

                                                </v-text-field>
                                            </v-col>

                                            <v-col lg="6" md="6" cols="12">
                                                <v-menu ref="menu" v-model="menu" :close-on-content-click="false"
                                                    :return-value.sync="date" transition="scale-transition" offset-y
                                                    min-width="auto">
                                                    <template v-slot:activator="{ on, attrs }">
                                                        <v-text-field v-model="date"
                                                            :label="$t('container.beneficiary_management.beneficiary_list.cause_date')"
                                                            prepend-inner-icon="mdi-calendar" readonly v-bind="attrs"
                                                            v-on="on" outlined></v-text-field>
                                                    </template>
                                                    <v-date-picker v-model="date" no-title scrollable>
                                                        <v-spacer></v-spacer>
                                                        <v-btn text color="primary" @click="menu = false">
                                                            Cancel
                                                        </v-btn>
                                                        <v-btn text color="primary" @click="$refs.menu.save(date)">
                                                            OK
                                                        </v-btn>
                                                    </v-date-picker>
                                                </v-menu>
                                            </v-col>
                                            <v-col lg="6" md="6" cols="12">
                                                <v-text-field v-model="data.last_payment_ammount"
                                                    :label="$t('container.beneficiary_management.beneficiary_list.last_payment_amount')"
                                                    outlined clearable>

                                                </v-text-field>

                                            </v-col>
                                            <v-col lg="6" md="6" cols="12">

                                                <v-tooltip top>
                                                    <template v-slot:activator="{ on }">
                                                        <v-btn v-can="'update-post'" fab x-small v-on="on" color="#AFB42B"
                                                            @click="payment_modal = true" elevation="0" class="white--text">
                                                            <v-icon> mdi-eye </v-icon>
                                                        </v-btn>
                                                    </template>
                                                    <span>
                                                        {{ $t("container.list.view") }}
                                                    </span>
                                                </v-tooltip>
                                            </v-col>


                                        </v-row>


                                    </v-expansion-panel-content>
                                </v-expansion-panel>

                            </v-expansion-panels>

                        </v-col>
                        <v-col cols="12">

                            <v-expansion-panels>
                                <v-expansion-panel>
                                    <v-expansion-panel-header color=#8C9EFF class="white--text">
                                        {{ $t('container.beneficiary_management.beneficiary_list.grievance_history') }}
                                    </v-expansion-panel-header>
                                    <v-expansion-panel-content class="mt-5">
                                        <v-row>
                                            <v-col lg="6" md="6" cols="12">
                                                <v-text-field v-model="data.total_receive" readonly
                                                    :label="$t('container.beneficiary_management.beneficiary_list.total_grievance')"
                                                    outlined>

                                                </v-text-field>
                                            </v-col>

                                            <v-col lg="6" md="6" cols="12">
                                                <v-text-field v-model="data.last_grievance_type"
                                                    :label="$t('container.beneficiary_management.beneficiary_list.last_grievance_type')"
                                                    outlined>

                                                </v-text-field>

                                            </v-col>
                                            <v-col lg="6" md="6" cols="12">

                                                <v-tooltip top>
                                                    <template v-slot:activator="{ on }">
                                                        <v-btn v-can="'update-post'" fab x-small v-on="on" color="#AFB42B"
                                                            elevation="0" @click="grievance_modal = true"
                                                            class="white--text">
                                                            <v-icon> mdi-eye </v-icon>
                                                        </v-btn>
                                                    </template>
                                                    <span>
                                                        {{ $t("container.list.view") }}
                                                    </span>
                                                </v-tooltip>
                                            </v-col>


                                        </v-row>


                                    </v-expansion-panel-content>
                                </v-expansion-panel>

                            </v-expansion-panels>

                        </v-col>
                        <v-col cols="12">

                            <v-expansion-panels>
                                <v-expansion-panel>
                                    <v-expansion-panel-header color=#8C9EFF class="white--text">
                                        {{ $t('container.beneficiary_management.beneficiary_list.Change_tracking') }}
                                    </v-expansion-panel-header>
                                    <v-expansion-panel-content class="mt-5">
                                        <v-row>
                                            <v-col lg="6" md="6" cols="12">
                                                <v-text-field v-model="data.total_receive" readonly
                                                    :label="$t('container.beneficiary_management.beneficiary_list.total_change')"
                                                    outlined>

                                                </v-text-field>
                                            </v-col>

                                            <v-col lg="6" md="6" cols="12">

                                                <v-tooltip top>
                                                    <template v-slot:activator="{ on }">
                                                        <v-btn v-can="'update-post'" fab x-small v-on="on" color="#AFB42B"
                                                            elevation="0" @click="tracking_modal = true"
                                                            class="white--text">
                                                            <v-icon> mdi-eye </v-icon>
                                                        </v-btn>
                                                    </template>
                                                    <span>
                                                        {{ $t("container.list.view") }}
                                                    </span>
                                                </v-tooltip>
                                            </v-col>


                                        </v-row>


                                    </v-expansion-panel-content>
                                </v-expansion-panel>

                            </v-expansion-panels>

                        </v-col>
                        <!-- payment Modal -->
                        <v-dialog v-model="payment_modal" width="800">
                            <v-card style="justify-content: center; text-align: center">
                                <v-card-title class="font-weight-bold justify-center">
                                    {{ $t("container.beneficiary_management.beneficiary_list.payment_history") }}
                                </v-card-title>
                                <v-divider></v-divider>
                                <v-card-text class="mt-7">


                                    <v-col cols="12">

                                        <v-data-table :headers="headers" :items="applications"
                                            class="elevation-0 transparent row-pointer">
                                            <template v-slot:item.sl="{ item, index }">
                                                {{
                                                    (pagination.current - 1) * pagination.perPage +
                                                    index +
                                                    1
                                                }}
                                            </template>

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




                                    <v-row class="mx-0 my-0 py-2" justify="center">
                                        <v-btn flat @click="payment_modal = false" outlined
                                            class="custom-btn-width py-2 mr-10">
                                            {{ $t("container.list.cancel") }}
                                        </v-btn>
                                        <v-btn type="submit" flat color="primary" :disabled="invalid" :loading="loading"
                                            class="custom-btn-width  white--text py-2">
                                            {{ $t("container.list.print") }}
                                        </v-btn>
                                    </v-row>


                                </v-card-text>
                            </v-card>
                        </v-dialog>
                        <!-- payment History Modal  -->


                        <!-- Grievance Modal -->
                        <v-dialog v-model="grievance_modal" width="800">
                            <v-card style="justify-content: center; text-align: center">
                                <v-card-title class="font-weight-bold justify-center">
                                    {{ $t("container.beneficiary_management.beneficiary_list.grievance_history") }}
                                </v-card-title>
                                <v-divider></v-divider>
                                <v-card-text class="mt-7">


                                    <v-col cols="12">

                                        <v-data-table :headers="headers_grievance" :items="applications"
                                            class="elevation-0 transparent row-pointer">
                                            <template v-slot:item.sl="{ item, index }">
                                                {{
                                                    (pagination.current - 1) * pagination.perPage +
                                                    index +
                                                    1
                                                }}
                                            </template>

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




                                    <v-row class="mx-0 my-0 py-2" justify="center">
                                        <v-btn flat @click="grievance_modal = false" outlined
                                            class="custom-btn-width py-2 mr-10">
                                            {{ $t("container.list.cancel") }}
                                        </v-btn>
                                        <v-btn type="submit" flat color="primary" :disabled="invalid" :loading="loading"
                                            class="custom-btn-width  white--text py-2">
                                            {{ $t("container.list.print") }}
                                        </v-btn>
                                    </v-row>


                                </v-card-text>
                            </v-card>
                        </v-dialog>
                        <!-- Grievance History Modal  -->
                        <!-- Change Tracking Modal -->
                        <v-dialog v-model="tracking_modal" width="800">
                            <v-card style="justify-content: center; text-align: center">
                                <v-card-title class="font-weight-bold justify-center">
                                    {{ $t("container.beneficiary_management.beneficiary_list.Change_tracking") }}
                                </v-card-title>
                                <v-divider></v-divider>
                                <v-card-text class="mt-7">


                                    <v-col cols="12">

                                        <v-data-table :headers="headers_tracking" :items="divisions"
                                            class="elevation-0 transparent row-pointer">
                                            <template v-slot:item.sl="{ item, index }">
                                                {{
                                                    (pagination.current - 1) * pagination.perPage +
                                                    index +
                                                    1
                                                }}
                                            </template>
                                               <!-- Action Button -->
                          <template v-slot:item.actions="{ item }">
                       
                                <v-btn
                                
                                  v-on="on"
                                  color="success"
                                  elevation="0"
                                  router to="/beneficiary-management/information-tracking"
                            
                                >
                                         {{ $t("container.list.change_tracking_details") }}
                                </v-btn>
                         
                    
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




                                    <v-row class="mx-0 my-0 py-2" justify="center">
                                        <v-btn flat @click="tracking_modal = false" outlined
                                            class="custom-btn-width py-2 mr-10">
                                            {{ $t("container.list.cancel") }}
                                        </v-btn>
                                        <v-btn type="submit" flat color="primary" :disabled="invalid" :loading="loading"
                                            class="custom-btn-width  white--text py-2">
                                            {{ $t("container.list.print") }}
                                        </v-btn>
                                    </v-row>


                                </v-card-text>
                            </v-card>
                        </v-dialog>
                        <!-- Change Tracking Modal  -->
                    </v-row>
                </v-card>
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
    title: "CTM - Beneficiary History",
    data() {
        return {
            date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            menu: false,
            modal: false,
            menu2: false,
            payment_modal: false,
            grievance_modal: false,
            tracking_modal: false,

            data: {
                summary: "Beneficiary ID: 1235, Name: Radur Rahim, Address: Naogaon sadar, Naogaon",
                total_receive: 10,
                last_payment_ammount: 1000,
                last_grievance_type: "Fraud  Case"
            },
            pagination: {
                current: 1,
                total: 0,
                perPage: 10,
            },
            items: [5, 10, 15, 20, 40, 50, 100],

        }
    },

    methods: {
        updateHeaderTitle() {
            const title = this.$t(
                "container.list.beneficiary_journey"
            );
            this.$store.commit("setHeaderTitle", title);
        },
           ...mapActions({
            GetAllDivisions: "Division/GetAllDivisions",
   
        }),

    },

    computed: {
           ...mapState({
            divisions: (state) => state.Division.divisions,
        }),
        computedDateFormatted() {
            return this.formatDate(this.date)
        },
        headers() {
            return [
                { text: this.$t("container.list.sl"), value: "sl" },
                { text: this.$t("container.beneficiary_management.beneficiary_list.payment_disbursed_date"), value: "1" },
                { text: this.$t("container.beneficiary_management.beneficiary_list.ammount"), value: "2" },
                { text: this.$t("container.beneficiary_management.beneficiary_list.fiscal_year"), value: "3" },
                { text: this.$t("container.beneficiary_management.beneficiary_list.due"), value: "4" },


            ];
        },
        headers_grievance() {
            return [
                { text: this.$t("container.list.sl"), value: "sl" },
                { text: this.$t("container.beneficiary_management.beneficiary_list.type"), value: "1" },
                { text: this.$t("container.beneficiary_management.beneficiary_list.subject"), value: "2" },
                { text: this.$t("container.beneficiary_management.beneficiary_list.details"), value: "3" },
                { text: this.$t("container.beneficiary_management.beneficiary_list.allotment_distribution"), value: "4" },
                { text: this.$t("container.beneficiary_management.beneficiary_list.resolved_by"), value: "5" },
                { text: this.$t("container.beneficiary_management.beneficiary_list.resolve_comment"), value: "6" },

                { text: this.$t("container.beneficiary_management.beneficiary_list.resolve_date"), value: "7" },
            ];
        },
          headers_tracking() {
            return [
                { text: this.$t("container.list.sl"), value: "sl" },
                { text: this.$t("container.beneficiary_management.beneficiary_list.change_tracking_type"), value: "1" },
                { text: this.$t("container.beneficiary_management.beneficiary_list.change_count"), value: "2" },
                { text: this.$t("container.beneficiary_management.beneficiary_list.successful_change"), value: "3" },
                { text: this.$t("container.beneficiary_management.beneficiary_list.unsuccessful_change"), value: "4" },
                { text: this.$t("container.beneficiary_management.beneficiary_list.resolved_by"), value: "name_en" },
                { text: this.$t("container.list.action"), value: "actions" },
               
            ];
        },

    },

    watch: {
        "$i18n.locale": "updateHeaderTitle",
        date(val) {
            this.dateFormatted = this.formatDate(this.date)
        },
    },
  
    beforeMount() {
        this.updateHeaderTitle();
    },
    mounted() {
        this.GetAllDivisions();

    }
};
</script>