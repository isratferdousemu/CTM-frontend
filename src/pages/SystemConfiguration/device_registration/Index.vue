<script>
import {mapActions, mapState} from "vuex";

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
      search: '',
      page: 1
    }
  },

  computed: {
    headers() {
      return [
        { text: "#Sl", value: "id", align: "start", sortable: false },
        { text: "User ID", value: "user_id" },
        { text: "User Name", value: "name" },
        { text: "Device Type", value: "device_type" },
        { text: "IP Address", value: "ip_address" },
        { text: "Purpose of Use", value: "purpose_use" },
        { text: "Actions", value: "actions", align: "center", sortable: false },
      ];
    },

    ...mapState({
        devices: (state) => state.Device_registration.devices,
        pagination: (state) => state.Device_registration.pagination,
        totalDevice: (state) => state.Device_registration.total,
        message: (state) => state.Device_registration.success_message
    })
  },

  mounted() {
    this.GetAllDevice();
  },

  methods: {
    ...mapActions({
      GetAllDevice: "Device_registration/GetAllDevice"
    }),

    deleteAlert(id) {
      //this.$toast.success("Logout Successfully");
      this.deleteDialog = true;
      this.deleted_id = id;
    },

    deleteDevice: async function(){
      try {
        let id = this.deleted_id;
        await this.$store.dispatch("Device_registration/DestroyDevice", id).then(() => {
          this.deleteDialog = false;
          this.$toast.success(this.message);
        })
      }catch (e) {
        console.log(e);
      }
    }
  }
}
</script>

<template>
  <div id="device-registration">
    <v-row class="mx-5">
      <v-col cols="12">
        <v-row wrap>
          <v-col cols="12">
            <v-card>
              <v-row>
                <v-col col="6">
                  <v-card-title>Device Registration Lists</v-card-title>
                </v-col>

                <v-col cols="6">
                  <v-card-actions class="justify-end">
                    <v-btn
                        text
                        color="success"
                        router
                        to="/system-configuration/device_registration/create"
                    >
                      <v-icon small left>mdi-plus</v-icon>
                      <span>Add New</span>
                    </v-btn>
                  </v-card-actions>
                </v-col>
              </v-row>

              <v-divider></v-divider>

              <v-card-text>
                <v-card-title>
                  <v-spacer></v-spacer>

                  <v-col sm="4" style="margin-right: -10px">
                    <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Search"
                        hide-details
                        class="mb-5"
                        outlined
                    ></v-text-field>
                  </v-col>
                </v-card-title>

                <v-card-subtitle>
                  <v-data-table
                      :headers="headers"
                      :items="devices"
                      :search="search"
                      dense
                      class="elevation-1"
                  >

                    <template v-slot:[`item.device_type`]="{ item }">
                      <div v-for="device in device_types" :key="device.id">
                        <span v-if="device.id === item.device_type">
                          {{ device.name }}
                        </span>
                      </div>
                    </template>

                    <template v-slot:[`item.actions`]="{ item }">
                      <v-tooltip top>
                        <template v-slot:activator="{ on }">
                          <v-btn
                              small
                              text
                              color="grey"
                              v-on="on"
                              router
                              :to="`/system-configuration/device_registration/edit/${item.id}`"
                          >
                            <v-icon left small>mdi-pencil</v-icon>
                            <span right class="caption text-lowercase"
                            >Edit</span
                            >
                          </v-btn>
                        </template>
                        <span>Edit</span>
                      </v-tooltip>

                      <v-tooltip top>
                        <template v-slot:activator="{ on }">
                          <v-btn
                              small
                              text
                              color="grey"
                              v-on="on"
                              @click="deleteAlert(item.id)"
                          >
                            <v-icon left small>mdi-delete</v-icon>
                            <span right class="caption text-lowercase"
                            >Delete</span
                            >
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
                     class="custom-btn-width black white--text py-2">
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

<style scoped>

</style>