<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "Edit",
  title: "CTM - Edit Device",
  data(){
    return{
      device_types: [
        {id: 1, name: 'Computer Desktop'},
        {id: 2, name: 'Android Mobile'},
        {id: 3, name: 'Ios Mobile'},
        {id: 4, name: 'Laptop'},
      ],
    }
  },

  computed: {
    ...mapState({
      editDevice: (state) => state.Device_registration.device,
      users: (state) => state.Device_registration.users,
      message: (state) => state.Device_registration.success_message,
      errors: (state) => state.Device_registration.errors
    })
  },

  mounted() {
    this.GetALlUsers();
    this.GetSingleDevice(this.$route.params.id);
  },

  methods: {
    ...mapActions({
      GetALlUsers: "Device_registration/GetAllUsers",
      GetSingleDevice: "Device_registration/GetSingleDevice"
    }),

    updateDevice: async function(){
      try {
        let id = this.$route.params.id;
        let formData = new FormData();

        formData.append('user_id', this.editDevice.user_id);
        formData.append('name', this.editDevice.name);
        formData.append('device_id', this.editDevice.device_id);
        formData.append('ip_address', this.editDevice.ip_address);
        formData.append('device_type', this.editDevice.device_type);
        formData.append('purpose_use', this.editDevice.purpose_use);
        formData.append('id', id);

        await this.$store.dispatch("Device_registration/UpdateDevice", formData).then(() => {
          this.$toast.success(this.message);
          this.GetSingleDevice(this.$route.params.id);
        })
      }catch (e) {
        console.log(e);
      }
    }
  }
}
</script>

<template>
  <div id="device_edit">
    <v-row class="mx-5">
      <v-col cols="12">
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-card-title><h3>Edit Device</h3></v-card-title>

              <v-divider></v-divider>

              <v-card-text>
                <v-form v-on:submit.prevent="updateDevice">

                  <v-col cols="12" class="d-flex">
                    <v-row wrap>
                      <v-col cols="12" sm="6" lg="6">
                        <v-select
                            :items="users"
                            item-text="user_id"
                            item-value="id"
                            label="Select User ID"
                            menu-props="auto"
                            hide-details
                            persistent-hint
                            outlined
                            v-model="editDevice.user_id"
                            @change="getUserName(add_device.user_id)"
                        ></v-select>
                        <p v-if="errors?.user_id" class="red--text custom_error">
                          {{ errors.user_id[0] }}
                        </p>
                      </v-col>

                      <v-col cols="12" sm="6" lg="6">
                        <v-text-field
                            type="text"
                            v-model="editDevice.name"
                            label="Enter User Name"
                            persistent-hint
                            outlined
                        ></v-text-field>
                        <p
                            v-if="errors?.name"
                            class="red--text custom_error"
                        >
                          {{ errors?.name[0] }}
                        </p>
                      </v-col>
                    </v-row>
                  </v-col>

                  <v-col cols="12" class="d-flex">
                    <v-row wrap>
                      <v-col cols="12" sm="6" lg="6">
                        <v-select
                            :items="device_types"
                            item-text="name"
                            item-value="id"
                            label="Select Device Type"
                            menu-props="auto"
                            hide-details
                            persistent-hint
                            outlined
                            v-model="editDevice.device_type"
                        ></v-select>
                        <p v-if="errors?.device_type" class="red--text custom_error">
                          {{ errors.device_type[0] }}
                        </p>
                      </v-col>

                      <v-col cols="12" sm="6" lg="6">
                        <v-text-field
                            type="text"
                            v-model="editDevice.device_id"
                            label="Enter Unique ID"
                            persistent-hint
                            outlined
                        ></v-text-field>
                        <p v-if="errors?.device_id" class="red--text custom_error">
                          {{ errors?.device_id[0] }}
                        </p>
                      </v-col>
                    </v-row>
                  </v-col>

                  <v-col cols="12" class="d-flex">
                    <v-row wrap>
                      <v-col
                          cols="12"
                          sm="6"
                          lg="6"
                      >
                        <v-text-field
                            type="text"
                            v-model="editDevice.ip_address"
                            label="Enter Ip Address"
                            persistent-hint
                            outlined
                        ></v-text-field>
                        <p v-if="errors?.ip_address" class="red--text custom_error">
                          {{ errors?.ip_address[0] }}
                        </p>
                      </v-col>

                      <v-col cols="12" sm="6" lg="6">
                        <v-text-field
                            type="text"
                            v-model="editDevice.purpose_use"
                            label="Enter Purpose of Use"
                            persistent-hint
                            outlined
                        ></v-text-field>
                        <p v-if="errors?.purpose_use" class="red--text custom_error">
                          {{ errors?.purpose_use[0] }}
                        </p>
                      </v-col>
                    </v-row>
                  </v-col>

                  <v-row class="justify-end mt-5 mb-5">
                    <v-btn
                        flat
                        color="primary"
                        class="custom-btn mr-2"
                        router
                        to="/system-configuration/device_registration"
                    >Back
                    </v-btn>
                    <v-btn
                        flat
                        color="success"
                        type="submit"
                        class="custom-btn mr-2"
                    >Submit
                    </v-btn>
                  </v-row>
                </v-form>
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