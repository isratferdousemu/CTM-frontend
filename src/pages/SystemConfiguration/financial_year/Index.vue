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
                                    <v-btn elevation="2" class="btn mr-2 white--text" color="red darken-4" @click="GeneratePdf()">
                                      <v-icon class="pr-1"> mdi-tray-arrow-down </v-icon> {{ $t("container.list.PDF") }}
                                    </v-btn>
                                    <v-btn elevation="2" class="btn mr-2 white--text" color="teal darken-2" @click="GenerateExcel()">
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
            Allfinancial_years: [],
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

      async GeneratePdf(){

        const queryParams = {
          searchText: this.search,
          page: this.pagination.current,
          perPage: this.search.trim() === '' ? this.pagination.grand_total : this.pagination.grand_total,

        };
        await this.$axios
            .get("/admin/financial-year/get", {
              headers: {
                Authorization: "Bearer " + this.$store.state.token,
                "Content-Type": "multipart/form-data",
              },
              params: queryParams,
            })
            .then((result) => {
              this.Allfinancial_years = result.data.data;
            })
            .catch((err) => {
              console.log(err, "error");

            });

        const HeaderInfo = [
          this.$t("container.list.sl"),
          this.$t("container.system_config.demo_graphic.financial_year.financial_year"),
          this.$t("container.system_config.demo_graphic.financial_year.start_date"),
          this.$t("container.system_config.demo_graphic.financial_year.end_date"),
          this.$t("container.system_config.demo_graphic.financial_year.status"),
        ]

        const OBJ = this.Allfinancial_years;

        const CustomInfo = OBJ.map((((i,index) => {
          return [
            this.$i18n.locale == 'en' ? index + 1 : this.$helpers.englishToBangla(index + 1),
            this.$i18n.locale == 'en' ? i.financial_year:this.$helpers.englishToBangla(i.financial_year),
            this.$i18n.locale == 'en' ? i.start_date:this.$helpers.englishToBangla(i.start_date),
            this.$i18n.locale == 'en' ? i.end_date:this.$helpers.englishToBangla(i.end_date),
            this.$i18n.locale == 'en' ? i.status:this.$helpers.englishToBangla(i.status),
          ]
        })));

        const queryParam = {
          language: this.$i18n.locale,
          data:CustomInfo,
          header:HeaderInfo,
          fileName:this.$t("container.system_config.demo_graphic.financial_year.list"),
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

      async GenerateExcel(){

        // this.isLoading = true;
        const queryParams = {
          language: this.$i18n.locale,
          searchText: this.search,
          page: this.pagination.current,
          perPage: this.search.trim() === '' ? this.pagination.grand_total : this.pagination.grand_total,

        };
        await this.$axios
            .get("/admin/financial-year/get", {
              headers: {
                Authorization: "Bearer " + this.$store.state.token,
                "Content-Type": "multipart/form-data",
              },
              params: queryParams,
            })
            .then((result) => {
              this.Allfinancial_years = result.data.data;

              import('@/plugins/Export2Excel').then((excel) => {
                const OBJ = this.Allfinancial_years;

                const CustomInfo = OBJ.map((((i,index) => {
                  return {
                    "SL":this.$i18n.locale == 'en' ? index + 1 : this.$helpers.englishToBangla(index + 1),
                    "financial_year":this.$i18n.locale == 'en' ? i.financial_year : this.$helpers.englishToBangla(i.financial_year),
                    "start_date":this.$i18n.locale == 'en' ? i.start_date : this.$helpers.englishToBangla(i.start_date),
                    "end_date":this.$i18n.locale == 'en' ? i.end_date : this.$helpers.englishToBangla(i.end_date),
                    "status":this.$i18n.locale == 'en' ? i.status : this.$helpers.englishToBangla(i.status),
                  }
                })));

                const Header = [
                  this.$t("container.list.sl"),
                  this.$t("container.system_config.demo_graphic.financial_year.financial_year"),
                  this.$t("container.system_config.demo_graphic.financial_year.start_date"),
                  this.$t("container.system_config.demo_graphic.financial_year.end_date"),
                  this.$t("container.system_config.demo_graphic.financial_year.status"),
                ]

                const Field = ['SL','financial_year','start_date','end_date', 'status']

                const Data = this.FormatJson(Field, CustomInfo)
                const currentDate = new Date().toISOString().slice(0, 10); //
                let dateinfo = queryParams.language == 'en' ? currentDate : this.$helpers.englishToBangla(currentDate)

                const filenameWithDate = `${dateinfo}_${this.$t("container.system_config.demo_graphic.financial_year.financial_year")}`;

                excel.export_json_to_excel({
                  header: Header,
                  data: Data,
                  sheetName: filenameWithDate,
                  filename: filenameWithDate,
                  autoWidth: true,
                  bookType: "xlsx"
                })
              })
              this.isLoading = false;

            })
            .catch((err) => {
              console.log(err, "error");
            });

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