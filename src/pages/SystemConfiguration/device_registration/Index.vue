<script>
import {mapActions, mapState} from "vuex";
import {http} from "@/hooks/httpService";

export default {
  name: "Index",
  title: "CTM - Device Registration",
  data(){
    return{
      device_types: [
        {id: 1, name: 'Computer Desktop'},
        {id: 2, name: 'Android Mobile'},
        {id: 3, name: 'Ios Mobile'},
        {id: 4, name: 'Laptop'},
      ],

      device_status: null,

      deleteDialog: false,
      delete_loading: false,
      deleted_id: '',
      totalDevices: 0,
      devices: [],
      Alldevices: [],
      loading: true,
      options: {},
      search: '',
      page: 1
    }
  },

  watch: {
    options: {
      handler () {
        this.getAllDevices()
      },
      deep: true,
    },

    search: {
      handler () {
        this.page = this.options.page;
        this.getAllDevices()
      },
    },

    "$i18n.locale": "updateHeaderTitle",
  },

  computed: {
    headers() {
      return [
        { text: this.$t('container.list.sl'), value: "id", align: "start", sortable: false },
        { text: this.$t('container.system_config.device.user_id'), value: "user.user_id" },
        { text: this.$t('container.system_config.device.user_name'), value: "name" },
        { text: this.$t('container.system_config.device.device_type'), value: "device_type" },
        { text: this.$t('container.system_config.device.ip_address'), value: "ip_address" },
        { text: this.$t('container.system_config.device.pupose_of_use'), value: "purpose_use" },
        { text: this.$t('container.list.status'), value: "status" },
        { text: this.$t('container.list.action'), value: "actions", align: "center", sortable: false },
      ];
    },

    ...mapState({
        message: (state) => state.Device_registration.success_message
    })
  },

  mounted() {
    this.updateHeaderTitle();
  },

  methods: {

    async GeneratePdf() {
      this.isLoading = true;
      const { sortBy, sortDesc, page, itemsPerPage } = this.options

      await http().get('/admin/device/get', {
        params: {
          sortBy: sortBy[0],
          sortDesc: sortDesc[0],
          page: page,
          itemsPerPage: this.totalDevices,
          search: this.search
        }
      }).then((result) => {
        this.Alldevices = result.data.data;
        this.loading = false;
      }).catch((err) => {
        console.log(err);
      })

      const HeaderInfo = [
        this.$t("container.list.sl"),
        this.$t('container.system_config.device.user_name'),
        this.$t('container.system_config.device.device_type'),
        this.$t('container.system_config.device.unique_id'),
        this.$t('container.system_config.device.pupose_of_use'),
      ]

      const OBJ = this.Alldevices;

      const deviceTypeMap = {};
      this.device_types.forEach(device => {
        deviceTypeMap[device.id] = device.name;
      });

      const CustomInfo = OBJ.map((((i,index) => {
        return [
          this.$i18n.locale == 'en' ? index + 1 : this.$helpers.englishToBangla(index + 1),
           i.user?.username,
          deviceTypeMap[i.device_type],
          i.device_id,
          i.purpose_use,
        ]
      })));

      const queryParam = {
        language: this.$i18n.locale,
        data:CustomInfo,
        header:HeaderInfo,
        fileName:this.$t("container.system_config.device.list"),
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

      const { sortBy, sortDesc, page, itemsPerPage } = this.options

      await http().get('/admin/device/get', {
        params: {
          sortBy: sortBy[0],
          sortDesc: sortDesc[0],
          page: page,
          itemsPerPage: this.totalDevices,
          search: this.search,
          language: this.$i18n.locale,
        }
      }).then((result) => {
        this.Alldevices = result.data.data;
        this.loading = false;

        import('@/plugins/Export2Excel').then((excel) => {
          const OBJinfo = this.Alldevices
          const deviceTypeMap = {};
          this.device_types.forEach(device => {
            deviceTypeMap[device.id] = device.name;
          });
          const CustomInfo = OBJinfo.map(((i,index) => {
            return {
              "sl" : this.$i18n.locale == 'en' ? index + 1 : this.$helpers.englishToBangla(index + 1),
              "user_name": i.user.username,
              "device_type": deviceTypeMap[i.device_type],
              "device_id": i.device_id,
              "purpose_use": i.purpose_use,
            }

          }));

          const Header = [
            this.$t("container.list.sl"),
            this.$t('container.system_config.device.user_name'),
            this.$t('container.system_config.device.device_type'),
            this.$t('container.system_config.device.unique_id'),
            this.$t('container.system_config.device.pupose_of_use'),
          ]

          const Field = ['sl','user_name','device_type','device_id','purpose_use']

          const Data = this.FormatJson(Field, CustomInfo)
          const currentDate = new Date().toISOString().slice(0, 10); //
          const filenameWithDate = `${currentDate}_${this.$t("container.system_config.device.list")}`;

          excel.export_json_to_excel({
            header: Header,
            data: Data,
            sheetName:filenameWithDate,
            filename:filenameWithDate,
            autoWidth:true,
            bookType : "xlsx"
          })
        })

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

    getAllDevices(){
      const { sortBy, sortDesc, page, itemsPerPage } = this.options

      http().get('/admin/device/get', {
        params: {
          sortBy: sortBy[0],
          sortDesc: sortDesc[0],
          page: page,
          itemsPerPage: itemsPerPage,
          search: this.search
        }
      }).then((result) => {
        this.devices = result.data.data;
        this.totalDevices = result.data.total;
        this.loading = false;
      }).catch((err) => {
        console.log(err);
      })
    },

    deleteAlert(id) {
      this.deleteDialog = true;
      this.deleted_id = id;
    },

    deleteDevice: async function(){
      try {
        let id = this.deleted_id;
        await this.$store.dispatch("Device_registration/DestroyDevice", id).then(() => {
          this.deleteDialog = false;
          this.$toast.success(this.message);
          this.getAllDevices();
        })
      }catch (e) {
        console.log(e);
      }
    },

    deviceActivate: async function({id, device_status}){
      try {
        await this.$store.dispatch("Device_registration/ActivateDevice", id).then(() => {

          if (device_status == 0)
          {
            this.$toast.success(this.message);
          }else {
            this.$toast.warning(this.message);
          }

          this.getAllDevices();
        })
      }catch (e) {
        console.log(e);
      }
    },

    updateHeaderTitle() {
      const title = this.$t(
          "container.system_config.device.list"
      );
      this.$store.commit("setHeaderTitle", title);
    },
    
  },
}
</script>

<template>
  <div id="device-registration">
    <v-row class="mx-5 mt-5">
      <v-col cols="12">
        <v-row wrap>
          <v-col cols="12">
            <v-card>
              <v-row>
                <v-col col="6">
                  <v-card-title><h3>{{ $t('container.system_config.device.list') }}</h3></v-card-title>
                </v-col>
              </v-row>

              <v-divider></v-divider>

              <v-card-text>
                <v-card-title class="mb-5">
                  <div class="d-flex justify-sm-end flex-wrap">
                    <v-text-field
                        @keyup.native="getAllDevices"
                        v-model="search"
                        append-icon="mdi-magnify"
                            :label="$t(
                              'container.list.search'
                            )"
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
                      to="/system-configuration/device_registration/create"
                      v-can="'device-registration-create'"
                  >
                    <v-icon small left>mdi-plus</v-icon>
                    <span>{{     
                    $t('container.list.add_new')}}</span>
                  </v-btn>
                </v-card-title>

                <v-card-subtitle>
                  <v-data-table
                      :headers="headers"
                      :items="devices"
                      :search="search"
                      :options.sync="options"
                      :server-items-length="totalDevices"
                      :loading="loading"
                      :footer-props="{
                          'items-per-page-options': [5,10,20,30,40,50]
                      }"
                      dense
                      class="elevation-1 transparent row-pointer"
                  >

                    <template v-slot:item.id="{ item, index }">
                      {{
                        (options.page - 1) * options.itemsPerPage + index + 1
                      }}
                    </template>

                    <template v-slot:[`item.device_type`]="{ item }">
                      <div v-for="device in device_types" :key="device.id">
                        <span v-if="device.id === item.device_type">
                          {{ device.name }}
                        </span>
                      </div>
                    </template>

                    <template v-slot:[`item.status`]="{item}">
                      <span>
                           <v-switch :input-value="item.status === 1 ? true : false" @change="deviceActivate({id:item.id, device_status:item.status})" hide-details color="orange darken-3"></v-switch>
                      </span>
                    </template>

                    <template v-slot:[`item.actions`]="{ item }" style="padding: 10px;">
                      <v-tooltip top>
                        <template v-slot:activator="{ on }">
                          <v-btn
                              fab
                              x-small
                              color="success"
                              v-on="on"
                              router
                              :to="`/system-configuration/device_registration/edit/${item.id}`"
                              v-can="'device-registration-edit'"
                          >
                            <v-icon>mdi-account-edit-outline</v-icon>
                          </v-btn>
                        </template>
                        <span>{{ $t('container.list.edit') }}</span>
                      </v-tooltip>

                      <v-tooltip top>
                        <template v-slot:activator="{ on }">
                          <v-btn
                              fab
                              x-small
                              color="grey"
                              class="ml-3 white--text"
                              v-on="on"
                              @click="deleteAlert(item.id)"
                              v-can="'device-registration-delete'"
                          >
                            <v-icon>mdi-delete</v-icon>
                          </v-btn>
                        </template>
                        <span>{{ $t('container.list.delete') }}</span>
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
            Delete Device
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <div class="subtitle-1 font-weight-medium mt-5">
              Are you sure to delete this Device? Division all information will be deleted.
            </div>
          </v-card-text>
          <v-card-actions style="display: block">
            <v-row class="mx-0 my-0 py-2" justify="center">
              <v-btn text @click="deleteDialog = false" outlined class="custom-btn-width py-2 mr-10">
                Cancel
              </v-btn>
              <v-btn text @click="deleteDevice" color="white" :loading="delete_loading"
                     class="custom-btn-width warning white--text py-2">
                Delete
              </v-btn>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- delete modal  -->
    </v-row>
  </div>
</template>

<style lang="css" scoped>

</style>