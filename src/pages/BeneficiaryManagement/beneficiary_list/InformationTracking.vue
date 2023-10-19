<template>
    <div id="information_tracking">
        <v-row class="mx-5 mt-4">
          <v-col cols="12">
            <v-row>
              <v-col cols="12">
                <v-card
                  elevation="10"
                  color="white"
                  rounded="md"
                  theme="light"
                  class="mb-8">
                  <v-card-text>
                    <v-row>
                         <v-col lg="6" md="6" cols="12">
                       <v-autocomplete outlined clearable :label="$t(
                           'container.system_config.demo_graphic.division.division'
                       )
                           "></v-autocomplete>
                        </v-col>
                         <v-col lg="6" md="6" cols="12">
                           <v-autocomplete outlined clearable :label="$t(
                               'container.system_config.demo_graphic.district.district'
                           )
                               "></v-autocomplete>
                            </v-col>
                               <v-col lg="6" md="6" cols="12">
                               <v-text-field outlined clearable :label="$t(
                                   'container.system_config.demo_graphic.office.office'
                               )
                                   "></v-text-field>
                                </v-col>
                                 <v-col lg="6" md="6" cols="12">
                                   <v-text-field outlined clearable :label="$t(
                                       'container.system_config.demo_graphic.ward.union_ward'
                                   )"></v-text-field>
                                    </v-col>
                                       <v-col lg="6" md="6" cols="12">
                               <v-autocomplete outlined clearable :label="$t(
                                   'container.beneficiary_management.beneficiary_list.tracking_type'
                               )
                                   "></v-autocomplete>
                                </v-col>
                                         <v-col lg="6" md="6" cols="12">
                                   <v-autocomplete outlined clearable :label="$t(
                                       'container.beneficiary_management.beneficiary_list.beneficiary_id'
                                   )
                                       "></v-autocomplete>
                                    </v-col>
                                       
                       
                    </v-row>
                     <div class="d-inline d-flex justify-end ">
                                                       
                                                        <v-btn elevation="2" class="btn  mr-2">{{ $t("container.list.reset") }}</v-btn>
                                                         <v-btn elevation="2" class="btn" color="success">{{
                                                             $t("container.list.search") }}</v-btn>
                                                    </div>



                                                   
                                          
                           <v-col cols="12">
                            <v-card>
                                     <v-card-title class="font-weight-bold justify-center">
                {{ $t("container.beneficiary_management.beneficiary_list.information_tracking") }}
              </v-card-title>
                        <v-data-table
                          :loading="loading"
                          item-key="id"
                          :headers="headers"
                          :items="divisions"
                          :items-per-page="pagination.perPage"
                          hide-default-footer
                          class="elevation-0 transparent row-pointer"
                        >
                          <template v-slot:item.id="{ item, index }">
                            {{
                                (pagination.current - 1) * pagination.perPage +
                                index +
                                1
                            }}
                          </template>
                          <template v-slot:item.name_en="{ item }">
                            {{ item.name_en }}
                          </template>
                          <template v-slot:item.name_bn="{ item }">
                            {{ item.name_bn }}
                          </template>

                          <!-- Action Button -->
                          <template v-slot:item.actions="{ item }">
                     

                            <v-tooltip top>
                              <template v-slot:activator="{ on }">
                                <v-btn
                                  v-can="'delete-division'"
                                  fab
                                  x-small
                                  v-on="on"
                                  color="#4A148C"
                                  class="ml-3 white--text"
                                  elevation="0"
                                  @click="deleteAlert(item.id)"
                                >
                                  <v-icon> mdi mdi-information </v-icon>
                                </v-btn>
                              </template>
                              <span> {{ $t("container.beneficiary_management.beneficiary_list.information_tracking") }}</span>
                            </v-tooltip>
                          </template>
                          <!-- End Action Button -->

                          <template v-slot:footer="item">
                            <div
                              class="text-center pt-2 v-data-footer justify-center pb-2"
                            >
                              <v-select
                                style="
                              position: absolute;
                              right: 25px;
                              width: 149px;
                              transform: translate(0px, 0px);
                            "
                                :items="items"
                                hide-details
                                dense
                                outlined
                                @change="onPageChange"
                                v-model="pagination.perPage"
                              ></v-select>
                              <v-pagination
                                circle
                                primary
                                v-model="pagination.current"
                                :length="pagination.total"
                                @input="onPageChange"
                                :total-visible="11"
                                class="custom-pagination-item"
                              ></v-pagination>
                            </div>
                          </template>
                        </v-data-table>
                          </v-card>
                        </v-col>                           
                                              
                  </v-card-text>
                 
            </v-card>
                </v-col>
            
                  
                </v-row>
                </v-col>
                </v-row>
        
    </div>
</template><script>
import { mapState,mapActions } from 'vuex';
export default {
    name: 'FrontendInformationTracking',

    data() {
        return {
            data:{
                division_id:null,
                district_id: null,
            },
            
            divisions: [],
             pagination: {
                current: 1,
                total: 0,
                perPage: 5,
            },
             items: [5, 10, 15, 20, 40, 50, 100],
            
        };
    },
     computed: {
        headers() {
            return [
                {
                    text: this.$t("container.list.sl"),
                    value: "id",
                    align: "start",
                    sortable: false,
                },
               
                {
                    text: this.$t(
                        "container.beneficiary_management.beneficiary_list.tracking_type"
                    ),
                    value: "name_en",
                },
                {
                    text: this.$t(
                        "container.beneficiary_management.beneficiary_list.beneficiary_id"
                    ),
                    value: "name_bn",
                },
                     {
                    text: this.$t(
                        "container.list.name_en"
                    ),
                    value: "name_bn",
                },
                     {
                    text: this.$t(
                        "container.beneficiary_management.beneficiary_list.address"
                    ),
                    value: "name_bn",
                },
                   {
                    text: this.$t(
                        "container.beneficiary_management.beneficiary_list.change_count"
                    ),
                    value: "name_bn",
                },
                {
                    text: this.$t("container.list.action"),
                    value: "actions",
                    align: "center",
                    sortable: false,
                },
            ];
        },

       
    },

     

    methods: {
          updateHeaderTitle() {
            const title = this.$t(
                "container.beneficiary_management.beneficiary_list.information_tracking"
            );
            this.$store.commit("setHeaderTitle", title);
        },
            ...mapActions({
            GetAllDivisions: "Division/GetAllDivisions",

        }),
          onPageChange($event) {
            // this.pagination.current = $event;
            this.GetDivision();
        },

        async GetDivision() {
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
        
    },
       beforeMount() {
        this.updateHeaderTitle();
    },

    mounted() {
        this.GetDivision();

    },
   
};
</script>