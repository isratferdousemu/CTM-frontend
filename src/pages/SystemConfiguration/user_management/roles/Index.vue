<script>
import {http} from "@/hooks/httpService";
import {mapState} from "vuex";

export default {
  name: "Index",
  title: "CTM - Roles",

  data(){
    return{
      deleteDialog: false,
      delete_loading: false,
      deleted_id: '',
      totalRoles: 0,
      roles: [],
      Allroles: [],
      loading: true,
      options: {},
      search: '',
    }
  },

  watch: {
    '$i18n.locale': 'updateHeaderTitle',

    options: {
      handler () {
        this.getAllRoles()
      },
      deep: true,
    },

    search: {
      handler () {
        this.getAllRoles()
      },
    },
  },

  computed: {
    headers(){
      return[
        { text: this.$t('container.list.sl'), value: "id", align: "start", sortable: false },
        { text: this.$t('container.system_config.demo_graphic.role.code'), value: "code" },
        { text: this.$t('container.system_config.demo_graphic.role.name_en'), value: "name_en" },
        { text: this.$t('container.system_config.demo_graphic.role.name_bn'), value: "name_bn" },
        { text: this.$t('container.system_config.demo_graphic.role.comment'), value: "comment" },
        { text: this.$t('container.system_config.demo_graphic.role.status'), value: "status" },
        { text: this.$t('container.list.action'), value: "actions", align: "center", sortable: false },
      ]
    },

    ...mapState({
      message: (state) => state.Role.success_message
    }),
     language: {
      get() {
        return this.$store.getters.getAppLanguage;
      },
    },
  },

  mounted() {
    this.getAllRoles();
    this.updateHeaderTitle();
  },

  methods: {

    async GeneratePdf(){
      this.loading = false;
      const { sortBy, sortDesc, page, itemsPerPage } = this.options
      await http().get('/admin/role/get', {
        params: {
          sortBy: sortBy[0],
          sortDesc: sortDesc[0],
          page: page,
          itemsPerPage: this.totalRoles,
          search: this.search
        }
      }).then((result) => {
        this.Allroles = result.data.data;
        this.loading = false;
      }).catch((err) => {
        console.log(err);
      })

      const HeaderInfo = [
        this.$t('container.list.sl'),
        this.$t('container.system_config.demo_graphic.role.code'),
        this.$t('container.system_config.demo_graphic.role.name_en'),
        this.$t('container.system_config.demo_graphic.role.name_bn'),
        this.$t('container.system_config.demo_graphic.role.comment'),
        this.$t('container.system_config.demo_graphic.role.status')
      ]

      const OBJ = this.Allroles;
      const CustomInfo = OBJ.map((((i,index) => {
        return [
          this.$i18n.locale == 'en' ? index + 1 : this.$helpers.englishToBangla(index + 1),
          this.$i18n.locale == 'en' ? i.code : this.$helpers.englishToBangla(i.code),
           i.name_en ,
          i.name_bn,
          i.comment,
          this.$i18n.locale == 'en' ? i.status : this.$helpers.englishToBangla(i.status),
         ]
      })));

      const queryParam = {
        language: this.$i18n.locale,
        data:CustomInfo,
        header:HeaderInfo,
        fileName:this.$t("container.system_config.demo_graphic.role.list"),
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

    async GenerateExcel() {
      // this.isLoading = true;

      const { sortBy, sortDesc, page, itemsPerPage } = this.options
      await http().get('/admin/role/get', {
        params: {
          sortBy: sortBy[0],
          sortDesc: sortDesc[0],
          page: page,
          itemsPerPage: this.totalRoles,
          search: this.search
        }
      }).then((result) => {
        this.Allroles = result.data.data;

        import('@/plugins/Export2Excel').then((excel) => {
          const OBJ = this.Allroles;

          const CustomInfo = OBJ.map(((i,index) => {
            return {
              "sl":this.$i18n.locale == 'en' ? index + 1 : this.$helpers.englishToBangla(index + 1),
              "code":this.$i18n.locale == 'en' ? i.code : this.$helpers.englishToBangla(i.code),
              "name_en":i.name_en ,
              "name_bn":i.name_bn,
              "comment":i.comment,
              "status":this.$i18n.locale == 'en' ? i.status : this.$helpers.englishToBangla(i.status),

            }
          }));

          const Header = [
            this.$t('container.list.sl'),
            this.$t('container.system_config.demo_graphic.role.code'),
            this.$t('container.system_config.demo_graphic.role.name_en'),
            this.$t('container.system_config.demo_graphic.role.name_bn'),
            this.$t('container.system_config.demo_graphic.role.comment'),
            this.$t('container.system_config.demo_graphic.role.status')
          ]

          const Field = ['sl','code', 'name_en', 'name_bn', 'comment', 'status']

          const Data = this.FormatJson(Field, CustomInfo)
          const currentDate = new Date().toISOString().slice(0, 10); //
          let dateinfo = this.$i18n.locale == 'en' ? currentDate : this.$helpers.englishToBangla(currentDate)

          const filenameWithDate = `${dateinfo}_${this.$t("container.system_config.demo_graphic.role.list")}`;

          excel.export_json_to_excel({
            header: Header,
            data: Data,
            sheetName: filenameWithDate,
            filename: filenameWithDate,
            autoWidth: true,
            bookType: "xlsx"
          })
        })

        this.loading = false;
      }).catch((err) => {
        console.log(err);
      })

    },

    FormatJson(FilterData,JsonData){
      return JsonData.map((v) =>
          FilterData.map((j => {
            return v[j];
          })))
    },

    getAllRoles(){
      this.search = this.search.replace(/%/g, '');
      const { sortBy, sortDesc, page, itemsPerPage } = this.options

      http().get('/admin/role/get', {
        params: {
          sortBy: sortBy[0],
          sortDesc: sortDesc[0],
          page: page,
          itemsPerPage: itemsPerPage,
          search: this.search
        }
      }).then((result) => {
        this.roles = result.data.data;
        this.totalRoles = result.data.total;
        this.loading = false;
      }).catch((err) => {
        console.log(err);
      })
    },
     updateHeaderTitle() {
      const title = this.$t("container.system_config.demo_graphic.role.list");
      this.$store.commit("setHeaderTitle", title);
    },

    deleteAlert(id) {
      this.deleteDialog = true;
      this.deleted_id = id;
    },

    deleteRole: async function(){
      try {
        let id = this.deleted_id;
        await this.$store.dispatch("Role/DestroyRole", id).then(() => {
          this.deleteDialog = false;
          this.$toast.success(this.message);
          this.getAllRoles();
        })
      }catch (e) {
        console.log(e);
      }
    }
  }
}
</script>

<template>
  <div id="roles">
    <v-row class="mx-5 mt-5">
      <v-col cols="12">
        <v-row wrap>
          <v-col cols="12">
            <v-card>
              <v-row>
                <v-col col="6">
                  <v-card-title><h3>{{ this.$t('container.system_config.demo_graphic.role.list') }}</h3></v-card-title>
                </v-col>
              </v-row>

              <v-divider></v-divider>

              <v-card-text>
                <v-card-title class="mb-5">
                  <div class="d-flex justify-sm-end flex-wrap">
                    <v-text-field
                        @keyup.native="getAllRoles"
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Search"
                        hide-details
                        class="mb-5 my-sm-0 my-3 mx-0v -input--horizontal"
                        flat
                        outlined dense
                    ></v-text-field>
                  </div>

                  <v-spacer></v-spacer>

                  <v-col lg="4" md="6" cols="12" class="text-right">
                    <v-btn elevation="2" class="btn mr-2 white--text" flat color="red darken-4" @click="GeneratePdf()">
                      <v-icon class="pr-1"> mdi-tray-arrow-down </v-icon> {{ $t("container.list.PDF") }}
                    </v-btn>
                    <v-btn elevation="2" flat class="btn mr-2 white--text" color="teal darken-2" @click="GenerateExcel()">
                      <v-icon class="pr-1"> mdi-tray-arrow-down </v-icon>
                      {{ $t("container.list.excel") }}
                    </v-btn>
                  </v-col>

                  <v-btn
                      medium
                      flat
                      color="primary"
                      router
                      to="/system-configuration/role/create"
                      v-can="'role-create'"
                  >
                    <v-icon small left>mdi-plus</v-icon>
                    <span>{{$t('container.list.add_new')}}</span>
                  </v-btn>
                </v-card-title>

                <v-card-subtitle>
                  <v-data-table
                      :headers="headers"
                      :items="roles"
                      :search="search"
                      :options.sync="options"
                      :server-items-length="totalRoles"
                      :loading="loading"
                      :footer-props="{
                          'items-per-page-options': [10,20,30,40,50]
                      }"
                      dense
                      class="elevation-1 transparent row-pointer"
                  >

                    <template v-slot:item.id="{ item, index }">
                         {{ language === 'bn' ? $helpers.englishToBangla((options.page - 1) * options.itemsPerPage + index + 1) : (options.page - 1) * options.itemsPerPage + index + 1 }}
                   
                    </template>

                    <template v-slot:[`item.comment`]="{ item }">
                      <span v-if="item.comment != null">
                        {{ item.comment }}
                      </span>
                      <span v-else>
                        ---
                      </span>
                    </template>

                    <template v-slot:[`item.status`]="{ item }">
                      <span v-if="item.status === 0">
                        Inactive
                      </span>
                      <span v-else>
                        Active
                      </span>
                    </template>

                    <template v-slot:[`item.actions`]="{ item }" style="padding: 10px;">
                      <v-tooltip top>
                        <template v-slot:activator="{ on }">
                          <v-btn
                          :disabled="item.default === 1"
                              fab
                              x-small
                              color="success"
                              v-on="on"
                              router
                              :to="`/system-configuration/role/edit/${item.id}`"
                              v-can="'role-edit'"
                          >
                            <v-icon>mdi-account-edit-outline</v-icon>
                          </v-btn>
                        </template>
                        <span>Edit</span>
                      </v-tooltip>

                      <v-tooltip top>
                        <template v-slot:activator="{ on }">
                          <v-btn
                          :disabled="item.default === 1"
                              fab
                              x-small
                              color="grey"
                              class="ml-3 white--text"
                              v-on="on"
                              @click="deleteAlert(item.id)"
                              v-can="'role-delete'"
                          >
                            <v-icon>mdi-delete</v-icon>
                          </v-btn>
                        </template>
                        <span>Delete</span>
                      </v-tooltip>
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
            {{ this.$t('container.system_config.demo_graphic.role.delete') }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <div class="subtitle-1 font-weight-medium mt-5">
              {{ this.$t('container.system_config.demo_graphic.role.delete_alert') }}
            </div>
          </v-card-text>
          <v-card-actions style="display: block">
            <v-row class="mx-0 my-0 py-2" justify="center">
              <v-btn text @click="deleteDialog = false" outlined class="custom-btn-width py-2 mr-10">
                {{ $t("container.list.cancel") }}
              </v-btn>
              <v-btn text @click="deleteRole" color="white" :loading="delete_loading"
                     class="custom-btn-width warning white--text py-2">
                {{ $t("container.list.delete") }}
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