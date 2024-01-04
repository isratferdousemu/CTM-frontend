<script>
import { extend, ValidationProvider, ValidationObserver } from "vee-validate";

import { mapActions, mapState } from "vuex";

export default {
  name: "Edit",
  title: "CTM - Edit Device",
  components: {
    ValidationProvider,
    ValidationObserver,
  },

  data() {
    return {
      device_types: [
        { id: 1, name: "Computer Desktop" },
        { id: 2, name: "Android Mobile" },
        { id: 3, name: "Ios Mobile" },
        { id: 4, name: "Laptop" },
      ],
    };
  },

  watch: {
    "$i18n.locale": "updateHeaderTitle",
  },

  computed: {
    ...mapState({
      editDevice: (state) => state.Device_registration.device,
      users: (state) => state.Device_registration.users,
      message: (state) => state.Device_registration.success_message,
      success_status: (state) => state.Device_registration.success_status,
      errors: (state) => state.Device_registration.errors,
      error_status: (state) => state.Device_registration.error_status,
    }),
  },

  mounted() {
    this.GetALlUsers();
    this.GetSingleDevice(this.$route.params.id);
    this.updateHeaderTitle();
  },

  methods: {
    ...mapActions({
      GetALlUsers: "Device_registration/GetAllUsers",
      GetSingleDevice: "Device_registration/GetSingleDevice",
    }),

    updateDevice: async function () {
      try {
        let id = this.$route.params.id;
        let formData = new FormData();

        formData.append("user_id", this.editDevice.user_id);
        formData.append("name", this.editDevice.name);
        formData.append("device_id", this.editDevice.device_id);
        formData.append("ip_address", this.editDevice.ip_address);
        formData.append("device_type", this.editDevice.device_type);
        formData.append("purpose_use", this.editDevice.purpose_use);
        formData.append("id", id);

        await this.$store
          .dispatch("Device_registration/UpdateDevice", formData)
          .then(() => {
            if (this.success_status == 200) {
              this.$toast.success(this.message);
              this.GetSingleDevice(this.$route.params.id);
              this.$router.push("/system-configuration/device-registration");
            }
            if (this.error_status === 422) {
              this.$refs.form.setErrors(this.errors);
            } else {
              this.$refs.form.setErrors();
            }
          });
      } catch (e) {
        console.log(e);
      }
    },

    updateHeaderTitle() {
      const title = this.$t("container.system_config.device.edit");
      this.$store.commit("setHeaderTitle", title);
    },
  },
};
</script>

<template>
  <div id="device_edit">
    <v-row class="mx-5 mt-5">
      <v-col cols="12">
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-card-title
                ><h3>
                  {{ $t("container.system_config.device.edit") }}
                </h3></v-card-title
              >

              <v-divider></v-divider>

              <v-card-text>
                <ValidationObserver ref="form" v-slot="{ invalid }">
                  <v-form v-on:submit.prevent="updateDevice">
                    <v-col cols="12" class="d-flex">
                      <v-row wrap>
                        <v-col cols="12" sm="6" lg="6">
                          <ValidationProvider
                            name="User Id"
                            vid="user_id"
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <v-select
                              :items="users"
                              item-text="username"
                              item-value="user_id"
                              :label="
                                $t('container.system_config.device.user_id')
                              "
                              menu-props="auto"
                              hide-details
                              persistent-hint
                              outlined
                              :error="errors[0] ? true : false"
                              :error-messages="errors[0]"
                              required
                              readonly
                              v-model="editDevice.user_id"
                            ></v-select>
                          </ValidationProvider>
                        </v-col>

                        <v-col cols="12" sm="6" lg="6">
                          <ValidationProvider
                            name="User Name"
                            vid="name"
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <v-text-field
                              type="text"
                              v-model="editDevice.name"
                              :label="
                                $t('container.system_config.device.user_name')
                              "
                              persistent-hint
                              outlined
                              :error="errors[0] ? true : false"
                              :error-messages="errors[0]"
                              required
                              readonly
                            ></v-text-field>
                          </ValidationProvider>
                        </v-col>
                      </v-row>
                    </v-col>

                    <v-col cols="12" class="d-flex">
                      <v-row wrap>
                        <v-col cols="12" sm="6" lg="6">
                          <ValidationProvider
                            name="Device type"
                            vid="device_type"
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <v-select
                              :items="device_types"
                              item-text="name"
                              item-value="id"
                              :label="
                                $t('container.system_config.device.device_type')
                              "
                              menu-props="auto"
                              hide-details
                              persistent-hint
                              outlined
                              :error="errors[0] ? true : false"
                              :error-messages="errors[0]"
                              required
                              v-model="editDevice.device_type"
                            ></v-select>
                          </ValidationProvider>
                        </v-col>

                        <v-col cols="12" sm="6" lg="6">
                          <ValidationProvider
                            name="Device Id"
                            vid="device_id"
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <v-text-field
                              type="text"
                              v-model="editDevice.device_id"
                              :label="
                                $t('container.system_config.device.unique_id')
                              "
                              persistent-hint
                              outlined
                              :error="errors[0] ? true : false"
                              :error-messages="errors[0]"
                              required
                            ></v-text-field>
                          </ValidationProvider>
                        </v-col>
                      </v-row>
                    </v-col>

                    <v-col cols="12" class="d-flex">
                      <v-row wrap>
                        <v-col cols="12" sm="6" lg="6">
                          <ValidationProvider
                            name="Ip Address"
                            vid="ip_address"
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <v-text-field
                              type="text"
                              v-model="editDevice.ip_address"
                              :label="
                                $t('container.system_config.device.ip_address')
                              "
                              persistent-hint
                              outlined
                              :error="errors[0] ? true : false"
                              :error-messages="errors[0]"
                              required
                            ></v-text-field>
                          </ValidationProvider>
                        </v-col>

                        <v-col cols="12" sm="6" lg="6">
                          <ValidationProvider
                            name="Purpose Use"
                            vid="purpose_use"
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <v-text-field
                              type="text"
                              v-model="editDevice.purpose_use"
                              label="Enter Purpose of Use"
                              persistent-hint
                              outlined
                              :error="errors[0] ? true : false"
                              :error-messages="errors[0]"
                              required
                            ></v-text-field>
                          </ValidationProvider>
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
                        >{{ $t("container.list.back") }}
                      </v-btn>
                      <v-btn
                        flat
                        color="success"
                        type="submit"
                        class="custom-btn mr-2"
                        :disabled="invalid"
                        >{{ $t("container.list.update") }}
                      </v-btn>
                    </v-row>
                  </v-form>
                </ValidationObserver>
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