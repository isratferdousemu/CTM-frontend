<script>
import {http} from "@/hooks/httpService";

export default {
  name: "Index",
  title: "CTM -Allowance Program",

  data(){
    return{
      deleteDialog: false,
      delete_loading: false,
      deleted_id: '',
      totalAllowances: 0,
      allowances: [],
      loading: true,
      options: {},
      search: '',
      page: 1,
      total:null,
      pagination: {
        current: 1,
        total: 0,
        perPage: 10,
      },
      sortBy: "name_en",
      sortDesc: false, //ASC
      items: [5, 10, 15, 20, 40, 50, 100],

    }
  },

  watch: {
    '$i18n.locale': 'updateHeaderTitle',

    options: {
      handler () {
        this.getAllowance()
      },
      deep: true,
    },

    search: {
      handler () {
        this.page = this.options.page;
        this.getAllowance()
      },
    },
  },

  computed: {
    language: {
      get() {
        return this.$store.getters.getAppLanguage;
      }
    },
    headers(){
      let headers = 
   [
          { text: this.$t('container.list.sl'), value: "id", align: "start", sortable: false, width:"5%"},
       
          { text: this.$t('container.system_config.allowance_program.payment_cycle'), value: "payment", width: "10%" },
          { text: this.$t('container.system_config.allowance_program.status'), value: "is_active", width: "10%" },
          { text: this.$t('container.system_config.allowance_program.system_status'), value: "system_status", width: "15%" },
          { text: this.$t('container.list.action'), value: "actions", align: "center", sortable: false, width: "20%" },
      ];
      if (this.language == 'en') {
        headers.splice(1, 0, {
          text: this.$t('container.system_config.allowance_program.name_en'), value: "name_en", width: "20%"
         
        });
      } else if (this.language == 'bn') {
        headers.splice(1, 0, {
          text: this.$t('container.system_config.allowance_program.name_bn'), value: "name_bn", width: "20%"
       
        });
      }
      return headers;
    }
  },

  mounted() {
    this.getAllowance();
    this.updateHeaderTitle();
  },

  methods: {
    perPageChange($event) {

      this.pagination.current = 1;
      this.getAllowance();
    },

    async GeneratePDF() {
      // this.isLoading = true;


      await http().get('/admin/allowance/get', {
        params: {
          sortBy: this.sortBy,
          sortDesc: this.sortDesc, 
          page: 1,
          itemsPerPage: this.total,
          search: this.search
        }
      }).then((result) => {
        this.allowances = result.data.data;
        this.loading = false;
      }).catch((err) => {
        console.log(err);
      })

      const HeaderInfo = [
        this.$t("container.list.sl"),
        this.$t('container.system_config.allowance_program.name_en'),
        this.$t('container.system_config.allowance_program.name_bn'),
        this.$t('container.system_config.allowance_program.payment_cycle'),
        this.$t('container.system_config.allowance_program.status'),
        this.$t('container.system_config.allowance_program.system_status')
      ]

      const CustomInfo = this.allowances.map(((i,index) => {
       
          let paymentCycle;
          switch (i.payment_cycle) {
            case 'Quarterly':
              paymentCycle = this.language == 'bn' ? "ত্রৈমাসিক" : "Quarterly";
              break;
            case 'Monthly':
              paymentCycle = this.language == 'bn' ? "মাসিক" : "Monthly";
              break;
            case 'Half Yearly':
              paymentCycle = this.language == 'bn' ? "অর্ধ বার্ষিক" : "Half Yearly";
              break;
            case 'Yearly':
              paymentCycle = this.language == 'bn' ? "বার্ষিক" : "Yearly";
              break;
            default:
              paymentCycle = i.payment_cycle;
          }
        return [
          this.$i18n.locale == 'en' ? index + 1 : this.$helpers.englishToBangla(index + 1),
          i.name_en,
          i.name_bn,
          paymentCycle,
          this.$i18n.locale == 'en' ? (i.is_active == 1 ? 'Active' : 'Inactive') : (i.is_active == 1 ? 'সক্রিয়' : 'নিষ্ক্রিয়'),
          this.$i18n.locale == 'en' ? (i.pmt_status == 1 ? 'Active' : 'Inactive') : (i.pmt_status == 1 ? 'সক্রিয়' : 'নিষ্ক্রিয়')
      ]
      }));

      const queryParam = {
        language: this.$i18n.locale,
        data:CustomInfo,
        header:HeaderInfo,
        fileName:this.$t('container.system_config.allowance_program.list'),
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



      await http().get('/admin/allowance/get', {
        params: {
          sortBy: this.sortBy,
          sortDesc: this.sortDesc, 
          page: 1,
          itemsPerPage: this.total,
          search: this.search
        }
      }).then((result) => {
        this.allowances = result.data.data;

        import('@/plugins/Export2Excel').then((excel) => {

          const HeaderInfo = [
            this.$t("container.list.sl"),
            this.$t('container.system_config.allowance_program.name_en'),
            this.$t('container.system_config.allowance_program.name_bn'),
            this.$t('container.system_config.allowance_program.payment_cycle'),
            this.$t('container.system_config.allowance_program.status'),
            this.$t('container.system_config.allowance_program.system_status')
          ]

          const CustomInfo = this.allowances.map(((i,index) => {
            let paymentCycle;
            switch (i.payment_cycle) {
              case 'Quarterly':
                paymentCycle = this.language == 'bn' ? "ত্রৈমাসিক" : "Quarterly";
                break;
              case 'Monthly':
                paymentCycle = this.language == 'bn' ? "মাসিক" : "Monthly";
                break;
              case 'Half Yearly':
                paymentCycle = this.language == 'bn' ? "অর্ধ বার্ষিক" : "Half Yearly";
                break;
              case 'Yearly':
                paymentCycle = this.language == 'bn' ? "বার্ষিক" : "Yearly";
                break;
              default:
                paymentCycle = i.payment_cycle;
            }
            return {
              "sl" : this.$i18n.locale == 'en' ? index + 1 : this.$helpers.englishToBangla(index + 1),
              "name_en" :i.name_en,
              "name_bn" :i.name_bn,
              "payment_cycle": paymentCycle,
              "status": this.$i18n.locale == 'en' ? (i.is_active == 1 ? 'Active' : 'Inactive') : (i.is_active == 1 ? 'সক্রিয়' : 'নিষ্ক্রিয়'),
              "system_status":  this.$i18n.locale == 'en' ? (i.pmt_status == 1 ? 'Active' : 'Inactive') : (i.pmt_status == 1 ? 'সক্রিয়' : 'নিষ্ক্রিয়')

             
            }
          }));

          const Field = ['sl', 'name_en', 'name_bn', 'payment_cycle', 'status','system_status']

          const Data = this.FormatJson(Field, CustomInfo)
          const currentDate = new Date().toISOString().slice(0, 10); //
          let dateinfo = this.$i18n.locale == 'en' ? currentDate : this.$helpers.englishToBangla(currentDate)

          const filenameWithDate = `${dateinfo}_${this.$t("container.system_config.allowance_program.list")}`;

          excel.export_json_to_excel({
            header: HeaderInfo,
            data: Data,
            sheetName: '',
            filename: filenameWithDate,
            autoWidth: true,
            bookType: "xlsx"
          })
        })

        this.loading = false;
      }).catch((err) => {
        console.log(err);
      })

      // this.isLoading = true;

    },

    FormatJson(FilterData,JsonData){
      return JsonData.map((v) =>
          FilterData.map((j => {
            return v[j];
          })))
    },


     deviceActivate: async function ({ id, system_status }) {

      this.$axios
        .get(`admin/allowance/status/${id}`, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          if (system_status == 0) {
            this.$toast.success(this.message);
          } else {
            this.$toast.warning(this.message);
          }

          this.getAllowance();


          // } else {
          //     this.$refs.formAdd.setErrors(result.data.errors);
          //     //  this.$refs.formAdd.setErrors(data.errors);
          // }

        })
        .catch((err) => {
          console.log(err);

        });

    },
    getAllowance(){
  

      http().get('/admin/allowance/get', {
        params: {
          sortBy: this.sortBy,
          sortDesc: this.sortDesc, 
          perPage: this.pagination.perPage,
          page: this.pagination.current,
          search: this.search
        }
      }).then((result) => {
        console.log(result.data,'tanbeer test data')
        this.allowances = result.data.data;
       
        this.total = result.data.total;
        this.pagination.current = result.data.current_page;
        this.pagination.total = result.data.last_page;
        this.pagination.perPage = result.data.per_page;
         this.pagination.grand_total = result?.data?.total;
        this.loading = false;
        //
        // this.total = result?.data?.data?.total;
        // this.trainers = result?.data?.data?.data;
        // console.log(this.trainers, "trainers")
        // this.pagination.current = result?.data?.data?.current_page;
        // this.pagination.total = result?.data?.data?.last_page;
        // this.pagination.grand_total = result?.data?.data?.total;
        // this.loading = false;
      }).catch((err) => {
        console.log(err);
      })
    },

    deleteAlert(id) {
      this.deleteDialog = true;
      this.deleted_id = id;
    },

    deleteAllowanceProgram: async function(){
      try {
        let id = this.deleted_id;

        await http().delete(`/admin/allowance/destroy/${id}`).then((result) => {

            this.allowances = this.allowances.filter((item) => {
              return id !== item.id;
            });
            this.deleteDialog = false;
            this.$toast.success(result.data.message);
            this.getAllowance();
        })
      }catch (e) {
        console.log(e);
      }
    },

    updateHeaderTitle() {
      const title = this.$t(
          "container.system_config.allowance_program.list"
      );
      this.$store.commit("setHeaderTitle", title);
    },
  }
}
</script>

<template>
  <div id="allowance_program">
    <v-row class="mx-5 mt-5">
      <v-col cols="12">
        <v-row wrap>
          <v-col cols="12">
            <v-card>
              <v-row>
                <v-col col="6">
                  <v-card-title>
                    <h3>{{ $t('container.system_config.allowance_program.list') }}</h3>
                  </v-card-title>
                </v-col>
              </v-row>

              <v-divider></v-divider>

              <v-card-text>
                <v-card-title class="mb-5">
                  <div class="d-flex justify-sm-end flex-wrap">
                    <v-text-field @keyup.native="getAllowance" v-model="search" append-icon="mdi-magnify" label="Search"
                      hide-details class="mb-5 my-sm-0 my-3 mx-0v -input--horizontal" flat outlined
                      dense></v-text-field>
                  </div>

                  <v-spacer></v-spacer>

                  <v-btn medium flat color="primary" router to="/system-configuration/allowance-program/create"
                    class=" mr-5" v-can="'allowance-create'">
                    <v-icon small left>mdi-plus</v-icon>
                    <span>{{$t('container.list.add_new')}}</span>
                  </v-btn>
                </v-card-title>


                <v-row justify="space-between" align="center" class="mx-3">
                  <!-- Checkbox on the left -->
                  <v-col lg="3" md="3" cols="12">

                    {{ $t('container.list.total') }}:&nbsp;
                    {{ language === 'bn' ? $helpers.englishToBangla(
                    this.total) : this.total }}
                  </v-col>

                  <v-col lg="4" md="6" cols="12" class="text-right">
                    <v-btn elevation="2" class="btn mr-2 white--text" color="red darken-4" @click="GeneratePDF()">
                      <v-icon class="pr-1"> mdi-tray-arrow-down </v-icon> {{ $t("container.list.PDF") }}
                    </v-btn>
                    <v-btn elevation="2" class="btn mr-2 white--text" color="teal darken-2" @click="GenerateExcel()">
                      <v-icon class="pr-1"> mdi-tray-arrow-down </v-icon>
                      {{ $t("container.list.excel") }}
                    </v-btn>
                  </v-col>
                </v-row>
                <v-card-subtitle>
                  <!-- <v-data-table :headers="headers" :items="allowances" :search="search" :options.sync="options"
                    :server-items-length="totalAllowances" :loading="loading" :footer-props="{
                          'items-per-page-options': [10,20,30,40,50]
                      }" dense class="elevation-1 transparent row-pointer"> -->
                  <v-data-table :loading="loading" item-key="id" :headers="headers" :items="allowances"
                    :items-per-page="pagination.perPage" hide-default-footer
                    class="elevation-0 transparent row-pointer mt-5 mx-5">

                    <template v-slot:[`item.id`]="{ item,index }">

                      {{
                      language === 'bn' ?
                      $helpers.englishToBangla((pagination.current - 1) * pagination.perPage +
                      index +
                      1)
                      :
                      (pagination.current - 1) * pagination.perPage +
                      index +
                      1
                      }}
                      <!-- {{ index + 1 }} -->
                    </template>
                    <template v-slot:item.payment="{ item }">
                      <span v-if="item.payment_cycle == 'Quarterly'"> {{
                        language == 'bn' ? "ত্রৈমাসিক" : item.payment_cycle }}</span>
                      <span v-if="item.payment_cycle == 'Monthly'"> {{
                        language == 'bn' ? "মাসিক" : item.payment_cycle }}</span>
                      <span v-if="item.payment_cycle == 'Half Yearly'"> {{
                        language == 'bn' ? "অর্ধ বার্ষিক" : item.payment_cycle }}</span>
                      <span v-if="item.payment_cycle == 'Yearly'"> {{
                        language == 'bn' ? "বার্ষিক" : item.payment_cycle }}</span>
                    </template>

                    <template v-slot:[`item.is_active`]="{ item }">
                      <span v-if="item.is_active === 0">
                        {{
                        language == 'bn' ? "নিষ্ক্রিয়" : 'Inactive' }}
                      </span>
                      <span v-else>
                        {{
                        language == 'bn' ? "সক্রিয়" : 'Active' }}
                      </span>
                    </template>
                    <template v-slot:[`item.system_status`]="{ item }">
                      <span v-if="item.is_active === 0">
                        Inactive
                      </span>
                      <span v-else>
                        Active
                      </span>
                    </template>
                    <template v-slot:[`item.system_status`]="{ item }">

                      <span>
                        <v-switch :input-value="item.system_status === 1 ? true : false"
                          @change="deviceActivate({ id: item.id, system_status: item.system_status })" hide-details
                          color="orange darken-3"></v-switch>
                      </span>
                    </template>

                    <template v-slot:[`item.actions`]="{ item }" style="padding: 10px;">
                      <!--                      <v-tooltip top>-->
                      <!--                        <template v-slot:activator="{ on }">-->
                      <!--                          <v-btn :disabled="item.default === 1" fab style="margin-right: 10px;" x-small color="success"-->
                      <!--                            v-on="on" router :to="`/system-configuration/allowance-program/edit/${item.id}`"-->
                      <!--                            v-can="'allowance-edit'">-->
                      <!--                            <v-icon>mdi-account-edit-outline</v-icon>-->
                      <!--                          </v-btn>-->
                      <!--                        </template>-->
                      <!--                        <span>{{ $t('container.list.edit') }}</span>-->
                      <!--                      </v-tooltip>-->

                      <v-tooltip top>
                        <template v-slot:activator="{ on }">
                          <v-btn :disabled="item.default === 1" fab x-small color="success" v-on="on" router
                            :to="`/system-configuration/allowance-program/setting/${item.id}`" v-can="'allowance-edit'">
                            <v-icon>mdi-cogs</v-icon>
                            <!-- <v-icon>mdi-account-edit-outline</v-icon> -->
                          </v-btn>
                        </template>
                        <span>{{ language == 'en' ? 'Settings' : 'সেটিংস'}}</span>
                      </v-tooltip>


                      <v-tooltip top>
                        <template v-slot:activator="{ on }">
                          <v-btn :disabled="item.default === 1" fab x-small color="grey" class="ml-3 white--text"
                            v-on="on" @click="deleteAlert(item.id)" v-can="'allowance-delete'">
                            <v-icon>mdi-delete</v-icon>
                          </v-btn>
                        </template>
                        <span>{{ $t('container.list.delete') }}</span>
                      </v-tooltip>
                    </template>
                    <template v-slot:footer="item">

                      <row class="text-right pt-2 v-data-footer justify-end pb-2">



                        <v-col cols="12" lg="4" md="4" sm="12" xs="12" class="text-right">
                          <v-pagination circle primary v-model="pagination.current" :length="pagination.total"
                            @input="onPageChange" :total-visible="11"
                            class="custom-pagination-item"></v-pagination></v-col>
                        <v-col cols="12" lg="4" md="4" sm="12" xs="12" class="text-right">
                          <v-select style="
                     
                            
                                    
                                                " :items="items" hide-details dense outlined @change="perPageChange()"
                            v-model="pagination.perPage"></v-select>


                        </v-col>
                      </row>

                    </template>
                  </v-data-table>
                </v-card-subtitle>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>

      <!-- delete modal  -->
      <v-dialog v-model="deleteDialog" width="350">
        <v-card style="justify-content: center; text-align: center">
          <v-card-title class="font-weight-bold justify-center">
            {{ $t('container.system_config.allowance_program.delete_header') }}

          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <div class="subtitle-1 font-weight-medium mt-5">
              {{ $t('container.system_config.allowance_program.delete_alert') }}
            </div>
          </v-card-text>
          <v-card-actions style="display: block">
            <v-row class="mx-0 my-0 py-2" justify="center">
              <v-btn text @click="deleteDialog = false" outlined class="custom-btn-width py-2 mr-10">
                {{ $t('container.list.cancel') }}
              </v-btn>
              <v-btn text @click="deleteAllowanceProgram" color="white" :loading="delete_loading"
                class="custom-btn-width warning white--text py-2">
                {{ $t('container.list.delete')}}
              </v-btn>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- delete modal  -->
    </v-row>
  </div>
</template>

<style scoped>

</style>