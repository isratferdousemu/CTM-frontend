<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "Index",
  title: "CTM - Device Registration",
  data(){
    return{
      search: ''
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

    deleteDevice: async function(id){
      try {
        await this.$store.dispatch("Device_registration/DestroyDevice", id).then(() => {
          console.log('success')
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
                      :items="menus"
                      :search="search"
                      dense
                      class="elevation-1"
                  >
                    <template v-slot:[`item.actions`]="{ item }">
                      <v-tooltip top>
                        <template v-slot:activator="{ on }">
                          <v-btn
                              small
                              text
                              color="grey"
                              v-on="on"
                              router
                              :to="`/system-configuration/device/edit/${item.id}`"
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
                              @click="deleteDevice(item.id)"
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
    </v-row>
  </div>
</template>

<style scoped>

</style>