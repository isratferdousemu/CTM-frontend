<script>
import { extend, ValidationProvider, ValidationObserver } from "vee-validate";

import { mapActions, mapState } from "vuex";

export default {
  name: "GenerateUrl",
  title: "CTM - View API",
  components: {
    ValidationProvider,
    ValidationObserver,
  },

  data() {
    return {
      loading:false,

      methods: ['GET', 'POST'],

      data: {
        user_id: null,
        name: null,
        device_name: null,
        device_id: null,
        device_details: null,
        deviceTypeName: null,
        purpose_use: null,
        status: null,
      },
    };
  },

  computed: {
    language: {
      get() {
        return this.$store.getters.getAppLanguage;
      }
    },
  },

  watch: {
    "$i18n.locale": "updateHeaderTitle",
  },



  mounted() {
    this.APIView();


  },

  methods: {

    APIView() {
      console.log(this.$route.params.id, "params")
      this.$axios
          .get(`admin/device/show/${this.$route.params.id}`,  {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((result) => {
            console.log(result,"result")
            this.data=result?.data?.data

          })
          .catch((err) => {
            if (this.$refs.formAdd && this.$refs.formAdd.$refs && this.$refs.formAdd.$refs.operator) {

              this.$refs.formAdd.$refs.operator.setErrors([err.response.data.errors.operator[0]]);
            } else {
              console.error('Error setting errors:', err);
            }

          });

    },

  },
};
</script>

<template>
  <div id="device_create">
    <v-row class="ma-5 ">
      <v-col cols="12">
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-card-title class="justify-center">
                <h4 class="mt-5">
                  {{ $t("container.system_config.device.details") }}
                </h4>
              </v-card-title>

              <!-- <v-divider></v-divider> -->

              <v-card-text class="mt-5">

                <v-row>
                  <v-col ols="12" sm="12" lg="12">
                    <v-row class="my-custom-row ma-5">
                      <v-col cols="12" sm="2" lg="2">
                        <b>{{$t('container.system_config.device.user_id')}}</b>:
                      </v-col>
                      <v-col cols="12" sm="10" lg="10">
                        <b>:</b> <span class="ml-2">
                        {{ language === 'bn' ? $helpers.englishToBangla(data.user_id) : data.user_id }}
                      </span>

                      </v-col>
                      <v-col cols="12" sm="2" lg="2">
                        <b>{{$t('container.system_config.device.full_name')}}</b>

                      </v-col>
                      <v-col cols="12" sm="10" lg="10">
                        <b>:</b>
                        <span class="ml-2">{{ data.name }}</span>

                      </v-col>

                      <v-col cols="12" sm="2" lg="2">
                        <b>{{$t('container.system_config.device.device_type')}}</b>
                      </v-col>
                      <v-col cols="12" sm="10" lg="10">
                        <b>:</b>
                        <span class="ml-2">{{data.deviceTypeName }}</span>
                      </v-col>

                      <v-col cols="12" sm="2" lg="2">
                        <b>{{$t('container.system_config.device.unique_id')}}</b>
                      </v-col>
                      <v-col cols="12" sm="10" lg="10">
                        <b>:</b>
                        <span class="ml-2">{{data.device_id }}</span>
                      </v-col>

                      <v-col cols="12" sm="2" lg="2">
                        <b>{{ $t('container.system_config.device.pupose_of_use') }}</b>
                      </v-col>
                      <v-col cols="12" sm="10" lg="10">
                        <b>:</b>
                        <span class="ml-2">{{data.purpose_use }}</span>
                      </v-col>

                      <v-col cols="12" sm="2" lg="2">
                        <b>{{ $t('container.list.status') }}</b>
                      </v-col>
                      <v-col cols="12" sm="10" lg="10">
                        <b>:</b>
                        <span class="ml-2">{{data.status ? $t('container.list.active') : $t('container.list.inactive')}}</span>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>

                <v-row class="justify-end mt-5 mb-5 mr-5">
                  <v-btn flat color="primary" class="custom-btn mr-2" router
                         to="/system-configuration/device-registration">{{
                      $t("container.list.back") }}
                  </v-btn>
                </v-row>

              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<style >
.my-custom-row .v-col {
  padding-left: 5px;
  /* Adjust as needed */
  padding-right: 5px;
  /* Adjust as needed */
}
</style>