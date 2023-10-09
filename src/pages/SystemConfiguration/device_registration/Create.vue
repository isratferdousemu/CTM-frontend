<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "Create",
  title: "CTM - Create Device",
  data(){
    return{
      device_types: [
        {id: 1, name: 'Computer Desktop'},
        {id: 2, name: 'Android Mobile'},
        {id: 3, name: 'Ios Mobile'},
        {id: 4, name: 'Laptop'},
      ],

      add_device: {
        user_id: '',
        name: '',
        device_id: '',
        ip_address: '',
        device_type: '',
        purpose_use: ''
      }
    }
  },

  computed: {
    ...mapState({
      users: (state) => state.Device_registration.users,
      message: (state) => state.Device_registration.success_message,
      errors: (state) => state.Device_registration.errors,
      status: (state) => state.Device_registration.success_status
    })
  },

  mounted() {
    this.GetALlUsers();
  },

  methods: {
    ...mapActions({
      GetALlUsers: "Device_registration/GetAllUsers"
    }),

    getUserName(user_id){
      this.users.forEach((item, index) => {
        if (item.id == user_id)
        {
          this.add_device.name = item.full_name;
          return this.add_device.name;
        }
      })
    },

    addDevice: async function(){
      try {
        let formData = new FormData();

        formData.append('user_id', this.add_device.user_id);
        formData.append('name', this.add_device.name);
        formData.append('device_id', this.add_device.device_id);
        formData.append('ip_address', this.add_device.ip_address);
        formData.append('device_type', this.add_device.device_type);
        formData.append('purpose_use', this.add_device.purpose_use);

        await this.$store.dispatch("Device_registration/StoreDevice", formData).then(() => {
          if (this.status == 201)
          {
            this.add_device = {};
            this.$toast.success(this.message);
          }

        })
      }catch (e) {
        console.log(e);
      }
    }
  }
}
</script>

<template>
  <div id="device_create">
    <v-row class="mx-5">
      <v-col cols="12">
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-card-title><h3>Add Device</h3></v-card-title>

              <v-divider></v-divider>

              <v-card-text>
                <v-form v-on:submit.prevent="addDevice">

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
                            v-model="add_device.user_id"
                            @change="getUserName(add_device.user_id)"
                        ></v-select>
                        <p v-if="errors?.user_id" class="red--text custom_error">
                          {{ errors.user_id[0] }}
                        </p>
                      </v-col>

                      <v-col cols="12" sm="6" lg="6">
                        <v-text-field
                            type="text"
                            v-model="add_device.name"
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
                            v-model="add_device.device_type"
                        ></v-select>
                        <p v-if="errors?.device_type" class="red--text custom_error">
                          {{ errors.device_type[0] }}
                        </p>
                      </v-col>

                      <v-col cols="12" sm="6" lg="6">
                        <v-text-field
                            type="text"
                            v-model="add_device.device_id"
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
                            v-model="add_device.ip_address"
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
                            v-model="add_device.purpose_use"
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
                        to="/system-configuration/device-registration"
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