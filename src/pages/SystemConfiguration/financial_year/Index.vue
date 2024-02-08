<template>
    <div id="financial_year">
        <v-row class="mx-5 mt-4">
            <v-col cols="12">
                <v-row>
                    <v-col cols="12">
                        <v-card elevation="10" color="white" rounded="md" theme="light" class="mb-8">
                            <v-card-title class="justify-center" tag="div">
                                <h3 class="text-uppercase pt-3">
                                    {{ $t("container.system_config.demo_graphic.financial_year.list") }}
                                </h3>
                            </v-card-title>

                            <v-card-text>
                                <v-row class="ma-0 pa-3 white round-border d-flex justify-space-between align-center"
                                    justify="center" justify-lg="space-between">
                                    <div class="d-flex justify-sm-end flex-wrap">
                                        <v-text-field @keyup.native="GetFinancialYear" outlined dense v-model="search"
                                            prepend-inner-icon="mdi-magnify" class="my-sm-0 my-3 mx-0v -input--horizontal"
                                            flat variant="outlined" :label="$t(
                                                'container.system_config.demo_graphic.financial_year.search'
                                            )
                                                " hide-details color="primary">
                                        </v-text-field>

                                    </div>
                                  <!-- Dropdown on the right -->

                                  <v-col lg="4" md="6" cols="12" class="text-right">
                                    <v-btn elevation="2" class="btn mr-2 white--text" flat color="red darken-4">
                                      <v-icon class="pr-1"> mdi-tray-arrow-down </v-icon> {{ $t("container.list.PDF") }}
                                    </v-btn>
                                    <v-btn elevation="2" flat class="btn mr-2 white--text" color="teal darken-2" @click="GenerateExcel()">
                                      <v-icon class="pr-1"> mdi-tray-arrow-down </v-icon>
                                      {{ $t("container.list.excel") }}
                                    </v-btn>
                                  </v-col>

                                    <v-col cols="12">
                                        <v-data-table :loading="loading" item-key="id" :headers="headers" :items="financial_years"
                                            :items-per-page="pagination.perPage" hide-default-footer
                                            class="elevation-0 transparent row-pointer">
                                            <template v-slot:item.id="{ item, index }">
                                                {{
                                                    (pagination.current - 1) * pagination.perPage +
                                                    index +
                                                    1
                                                }}
                                            </template>
                                            <template v-slot:item.financial_year="{ item }">
                                                {{ item.financial_year }}
                                            </template>
                                            <template v-slot:item.start_date="{ item }">
                                                {{ item.start_date }}
                                            </template>
                                             <template v-slot:item.end_date="{ item }">
                                                    {{ item.end_date }}
                                                </template>
                                                  <!-- <template v-slot:item.status="{ item }">
                                                        {{ item.status }}
                                                    </template> -->
                                                    <template v-slot:item.status="{ item }">
                            <span v-if="item?.status == '0'"> Inactive </span>
                            <span v-if="item?.status == '1'"> Active </span>
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
import { mapState } from "vuex";
import { extend, ValidationProvider, ValidationObserver } from "vee-validate";
import { required } from "vee-validate/dist/rules";

extend("required", required);
export default {
    name: "Index",
    title: "CTM - Financial year",
    data() {
        return {
            data: {
                id: null,
                code: null,
                name_en: null,
                name_bn: null,
            },

            loading: false,
            search: "",
            financial_years: [],
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
                        "container.system_config.demo_graphic.financial_year.financial_year"
                    ),
                    value: "financial_year",
                },
                {
                    text: this.$t(
                        "container.system_config.demo_graphic.financial_year.start_date"
                    ),
                    value: "start_date",
                },
                  {
                    text: this.$t(
                        "container.system_config.demo_graphic.financial_year.end_date"
                    ),
                    value: "end_date",
                },
                  {
                    text: this.$t(
                        "container.system_config.demo_graphic.financial_year.status"
                    ),
                    value: "status",
                },

            ];
        },


    },

    methods: {


      GenerateExcel(){

        // this.isLoading = true;
        const queryParams = {
          language: this.$i18n.locale,
        };

              import('@/plugins/Export2Excel').then((excel) => {
                const OBJ = this.GetFinancialYear();

                const Header = [
                  this.$t("container.system_config.demo_graphic.union.custom_code"),
                  this.$t("container.system_config.demo_graphic.division.division"),
                  this.$t("container.system_config.demo_graphic.district.district"),
                  this.$t("container.system_config.demo_graphic.thana.thana"),
                  this.$t("container.system_config.demo_graphic.union.name_en"),
                  this.$t("container.system_config.demo_graphic.union.name_bn"),
                ]

                const Field = ['geo_code','division_name','district_name','thana_name', 'union_name_en','union_name_bn']

                const Data = this.FormatJson(Field, OBJ)

                excel.export_json_to_excel({
                  header: Header,
                  data: Data,
                  sheetName:"demo",
                  filename:this.$t("container.system_config.demo_graphic.union1.customtitle"),
                  autoWidth:true,
                  bookType : "xlsx"
                })
              })
              this.isLoading = false;

      },

      FormatJson(FilterData,JsonData){
        return JsonData.map((v) =>
            FilterData.map((j => {
              return v[j];
            })))
      },


        onPageChange($event) {
            // this.pagination.current = $event;
            this.GetFinancialYear();
        },

        async GetFinancialYear() {

            const queryParams = {
                searchText: this.search,
                perPage: this.pagination.perPage,
                page: this.pagination.current,
            };

            this.$axios
                .get("/admin/financial-year/get", {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                    params: queryParams,
                })
                .then((result) => {
                    this.financial_years = result.data.data;
                    this.pagination.current = result.data.meta.current_page;
                    this.pagination.total = result.data.meta.last_page;
                    this.pagination.grand_total = result.data.meta.total;
                    console.log(queryParams)
                    console.log(result.data.data,77)
                });
        },

        updateHeaderTitle() {
            const title = this.$t(
                "container.system_config.demo_graphic.financial_year.list"
            );
            this.$store.commit("setHeaderTitle", title);
        },
    },
    watch: {
        "$i18n.locale": "updateHeaderTitle",
    },
    created() {
        this.GetFinancialYear();
    },
    beforeMount() {
        this.updateHeaderTitle();
    },
};
</script>