<script>
import {mapState} from "vuex";

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
  name: "Create",
  title: "CTM - Create Role",
  components: {
    ValidationProvider,
    ValidationObserver,
  },

  data(){
    return{
      add_role: {
        code: '',
        name_en: '',
        name_bn: '',
        comment: '',
        status: 1
      },
      loading: false
    }
  },

  computed: {
    ...mapState({
      message: (state) => state.Role.success_message,
      success_status: (state) => state.Role.success_status,
      errors: (state) => state.Role.errors,
      error_status: (state) => state.Role.error_status
    }),
     language: {
      get() {
        return this.$store.getters.getAppLanguage;
      },
    },


  },

  methods: {
    addRole: async function(){
      console.log(this.add_role.status);

      try {
        let formData = new FormData();

        formData.append('code', this.add_role.code);
        formData.append('name_en', this.add_role.name_en);
        formData.append('name_bn', this.add_role.name_bn);
        formData.append('comment', this.add_role.comment);
        formData.append('status', this.add_role.status);


        await this.$store.dispatch("Role/StoreRole", formData).then((res) => {
          if (res.status === 201)
          {
            this.$toast.success(this.message);
            this.add_role = {};
            this.errors = {};
            this.$router.push('/system-configuration/role');
          }
          console.log(res.response.data.errors);

          if (res.response.status === 422)
          {
            this.$refs.form.setErrors(res.response.data.errors);
          }else{
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
  <div id="create_role">
    <v-row class="mx-5 mt-5">
      <v-col cols="12">
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-card-title><h3>{{ this.$t('container.system_config.demo_graphic.role.add') }}</h3></v-card-title>

              <v-divider></v-divider>

              <v-card-text>
                <ValidationObserver ref="form" v-slot="{ invalid }">
                  <v-form v-on:submit.prevent="addRole">

                  <v-col cols="12" class="d-flex">
                    <v-row wrap>
                      <v-col
                          cols="12"
                          sm="6"
                          lg="6"
                      >
                        <ValidationProvider name="code" vid="code" rules="required" v-slot="{ errors }">
                        <v-text-field
                            type="number"
                            v-model="add_role.code"
                            :label="$t('container.system_config.demo_graphic.role.code')"
                            persistent-hint
                            outlined
                            :error="errors[0] ? true : false"
                             :error-messages="errors[0] ? (language === 'bn' ? 'অনুগ্রহ করে কোড লিখুন' : 'Please Enter Valid Code.') : ''"
                            required
                        ></v-text-field>
                        </ValidationProvider>
                      </v-col>

                      <v-col cols="12" sm="6" lg="6">
                        <ValidationProvider name="name_bn" vid="name_bn" rules="required|checkNameBn" v-slot="{ errors }">
                        <v-text-field
                            type="text"
                            v-model="add_role.name_bn"
                            :label="$t('container.system_config.demo_graphic.role.name_bn')"
                            persistent-hint
                            outlined
                            :error="errors[0] ? true : false"
                            :error-messages="errors[0] ? (language === 'bn' ? 'অনুগ্রহ করে বাংলা রোল নাম লিখুন' : 'Please Enter Bangla Role Name.') : ''"
                            required
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
                        <ValidationProvider name="name_en" vid="name_en" rules="required|checkName" v-slot="{ errors }">
                        <v-text-field
                            type="text"
                            v-model="add_role.name_en"
                            :label="$t('container.system_config.demo_graphic.role.name_en')"
                            persistent-hint
                            outlined
                            :error="errors[0] ? true : false"
                             :error-messages="errors[0] ? (language === 'bn' ? 'অনুগ্রহ করে ইংরেজি রোল নাম লিখুন' : 'Please Enter English Role Name.') : ''"
                            required
                        ></v-text-field>
                        </ValidationProvider>
                      </v-col>

                      <v-col cols="12" sm="6" lg="6">
                        <ValidationProvider name="comment" vid="comment" rules="checkNumeric" v-slot="{ errors }">
                        <v-text-field
                            type="text"
                            v-model="add_role.comment"
                            :label="$t('container.system_config.demo_graphic.role.comment')"
                            persistent-hint
                            outlined
                            :error="errors[0] ? true : false"
                             :error-messages="errors[0] ? (language === 'bn' ? 'অনুগ্রহ করে মন্তব্য লিখুন' : 'Please Enter Comments.') : ''"
                            required
                        ></v-text-field>
                        </ValidationProvider>
                      </v-col>

                      <v-col lg="6" md="6" cols="12">
                        <ValidationProvider name="Status" vid="status" rules="required" v-slot="{ errors }">
                          <v-checkbox v-model="add_role.status" :label="$t(
                        'container.system_config.demo_graphic.office.active'
                      )
                        " color="green" value="1" :hide-details="errors[0] ? false : true"
                                      :error="errors[0] ? true : false"  :error-messages="errors[0] ? (language === 'bn' ? ' অনুগ্রহ করে চেকবক্স নির্বাচন করুন' : 'Please Select Checkbox.') : ''"></v-checkbox>
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
                    >{{ $t('container.list.back') }}
                    </v-btn>
                    <v-btn
                        flat
                        color="success"
                        type="submit"
                        class="custom-btn mr-2"
                        :disabled="invalid"
                        :loading="loading"
                    >{{$t('container.list.submit')}}
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