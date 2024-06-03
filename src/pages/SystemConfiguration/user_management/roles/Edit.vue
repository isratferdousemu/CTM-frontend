<script>
import {mapActions, mapState} from "vuex";

import {
  extend,
  ValidationProvider,
  ValidationObserver
} from "vee-validate";

import {
  required
} from "vee-validate/dist/rules";

extend("required", required);

extend("checkName", {
  validate: (value) => {
    if (!value && value !== 0) {
      return false;
    }

    return /^[a-zA-Z\s]+$/.test(value);
  },
  message: "Please Enter English Letter's in this Field",
});

extend('checkNumeric', {
  validate: (value) => {
    // Check if the value is defined and not null
    if (value === null || value === undefined || value === '') {
      return false;
    }

    // Check if the value contains only numeric characters
    return /^[\u0980-\u09FFa-zA-Z\s]+$/.test(value);
  },
  message: "Please enter only numeric values in this field",
});

extend("checkNameBn", {
  validate: (value) => {
    if (!value && value !== 0) {
      return false;
    }

    var banglaRegex = /^[\u0980-\u09E5\u09F0-\u09FF\s]+$/;

    return banglaRegex.test(value);
  },
  message: "Please Enter Bangla Letter's in this Field",
});

export default {
  name: "Edit",
  title: "CTM - Edit Role",
  components: {
    ValidationProvider,
    ValidationObserver,
  },

  data(){
    return{
      loading: false
    }
  },

  computed: {
    ...mapState({
      role: (state) => state.Role.role,
      message: (state) => state.Role.success_message,
      success_status: (state) => state.Role.success_status,
      errors: (state) => state.Role.errors,
      error_status: (state) => state.Role.error_status
    }),

    update_role: {
      get(){
        return this.role;
      },

      set(value){
        return this.$store.commit("Role/UPDATE_ROLE_STATUS", value);
      }
    }
  },

  mounted() {
    this.EditRole(this.$route.params.id);
  },

  methods: {
    ...mapActions({
      EditRole: "Role/EditRole"
    }),

    updateRole: async function(){
      try {
        let id = this.$route.params.id;
        let formData = new FormData();

        formData.append('code', this.update_role.code);
        formData.append('name_en', this.update_role.name_en);
        formData.append('name_bn', this.update_role.name_bn);
        formData.append('comment', this.update_role.comment);

        if (this.update_role.status !== null)
        {
          formData.append('status', this.update_role.status);
        }

        formData.append('id', id);

        await this.$store.dispatch("Role/UpdateRole", formData).then(() => {
          if (this.success_status === 200)
          {
            this.$toast.success(this.message);
            this.EditRole(this.$route.params.id);
            this.$router.push('/system-configuration/role');

          }

          if (this.error_status === 422)
          {
            this.$refs.form.setErrors(this.errors);
          }else {
            this.$refs.form.setErrors();
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
  <div id="edit_role">
    <v-row class="mx-5 mt-5">
      <v-col cols="12">
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-card-title><h3>Edit Role</h3></v-card-title>

              <v-divider></v-divider>

              <v-card-text>
                <ValidationObserver ref="form" v-slot="{ invalid }">
                  <v-form v-on:submit.prevent="updateRole">

                  <v-col cols="12" class="d-flex">
                    <v-row wrap>
                      <v-col
                          cols="12"
                          sm="6"
                          lg="6"
                      >
                        <ValidationProvider name="Code" vid="code" rules="required" v-slot="{ errors }">
                          <v-text-field
                              type="number"
                              v-model="update_role.code"
                              :label="$t('container.system_config.demo_graphic.role.code')"
                              persistent-hint
                              outlined
                              :hide-details="errors[0] ? false : true"
                              required
                              :error="errors[0] ? true : false"
                              :error-messages="errors[0]"
                          ></v-text-field>
                        </ValidationProvider>
                      </v-col>

                      <v-col cols="12" sm="6" lg="6">
                        <ValidationProvider name="name_bn" vid="name_bn" rules="required|checkName" v-slot="{ errors }">
                          <v-text-field
                              type="text"
                              v-model="update_role.name_bn"
                              :label="$t('container.system_config.demo_graphic.role.name_bn')"
                              persistent-hint
                              outlined
                              :hide-details="errors[0] ? false : true"
                              required
                              :error="errors[0] ? true : false"
                              :error-messages="errors[0]"
                          ></v-text-field>
                        </ValidationProvider>
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
                        <ValidationProvider name="name_en" vid="name_en" rules="required|checkNameBn" v-slot="{ errors }">
                          <v-text-field
                              type="text"
                              v-model="update_role.name_en"
                              :label="$t('container.system_config.demo_graphic.role.name_en')"
                              persistent-hint
                              outlined
                              :hide-details="errors[0] ? false : true"
                              required
                              :error="errors[0] ? true : false"
                              :error-messages="errors[0]"
                          ></v-text-field>
                        </ValidationProvider>
                      </v-col>

                      <v-col cols="12" sm="6" lg="6">
                        <ValidationProvider name="comment" vid="comment" rules="required|checkNumeric" v-slot="{ errors }">
                          <v-text-field
                              type="text"
                              v-model="update_role.comment"
                              :label="$t('container.system_config.demo_graphic.role.comment')"
                              persistent-hint
                              outlined
                              :hide-details="errors[0] ? false : true"
                              required
                              :error="errors[0] ? true : false"
                              :error-messages="errors[0]"
                          ></v-text-field>
                        </ValidationProvider>
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
                        <ValidationProvider name="status" vid="status" rules="required" v-slot="{ errors }">
                          <v-checkbox
                              v-model="update_role.status"
                              color="primary"
                              :label="$t('container.system_config.demo_graphic.role.is_active')"
                              hide-details
                              :hide-details="errors[0] ? false : true"
                              required
                              :error="errors[0] ? true : false"
                              :error-messages="errors[0]"
                          ></v-checkbox>
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
                        to="/system-configuration/role"
                    >Back
                    </v-btn>
                    <v-btn
                        flat
                        color="success"
                        type="submit"
                        class="custom-btn mr-2"
                        :disabled="invalid"
                        :loading="loading"
                    >Submit
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