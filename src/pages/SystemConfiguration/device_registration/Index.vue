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

      deleteDialog: false,
      delete_loading: false,
      deleted_id: '',
      totalDevices: 0,
      devices: [],
      loading: true,
      options: {},
      search: '',
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
        this.getAllDevices()
      },
    },

    "$i18n.locale": "updateHeaderTitle",
  },

  computed: {
    headers() {
      return [
        { text: this.$t('container.list.sl'), value: "id", align: "start", sortable: false },
        { text: this.$t('container.system_config.device.user_id'), value: "user_id" },
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
    console.log("First Loading")
    this.updateHeaderTitle();
  },

  methods: {
    getAllDevices(){
      this.loading = true

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

    deviceActivate: async function(id){
      try {
        await this.$store.dispatch("Device_registration/ActivateDevice", id).then(() => {
          this.$toast.success(this.message);
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

                  <v-btn
                      medium
                      flat
                      color="primary"
                      router
                      to="/system-configuration/device_registration/create"
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
                          'items-per-page-options': [10,20,30,40,50]
                      }"
                      dense
                      class="elevation-1 transparent row-pointer"
                  >

                    <template v-slot:[`item.device_type`]="{ item }">
                      <div v-for="device in device_types" :key="device.id">
                        <span v-if="device.id === item.device_type">
                          {{ device.name }}
                        </span>
                      </div>
                    </template>

                    <template v-slot:[`item.status`]="{item}">
                      <span>
                           <v-switch :input-value="item.status === 1 ? true : false" @click="deviceActivate(item.id)" hide-details color="orange darken-3"></v-switch>
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