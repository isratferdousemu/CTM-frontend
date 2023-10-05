<script>
import {mapActions, mapGetters, mapState} from "vuex";
import {
  extend,
  ValidationProvider,
  ValidationObserver
} from "vee-validate";

export default {
  name: "Index",
  title: "CTM - Role Permission",
  components: {
    ValidationProvider,
    ValidationObserver,
  },

  data(){
    return{
      add_role_permission:{
        role_id: '',
        permissions: []
      },

      allSelected: false,

      subModules: '',
      subModuleKey: '',
      selectedModule: null,

      roleDialog: false,

      validationErrors: {},
    }
  },

  computed: {
    ...mapState({
      roles: (state) => state.Role_permission.roles,
      modules: (state) => state.Role_permission.modules,
      all_modules: (state) => state.Role_permission.all_modules,
      message: (state) => state.Role_permission.success_message,
      success_status: (state) => state.Role_permission.success_status,
      errors: (state) => state.Role_permission.errors,
      error_status: (state) => state.Role_permission.error_status
    }),

    ...mapGetters({
      editRolePermissionData: "Role_permission/rolePermissions"
    }),

    rolePermissions: {
      get(){
        return this.editRolePermissionData
      },
      set(value){
        this.$store.commit('Role_permission/updateValue', value)
      }
    }
  },

  mounted() {
    this.GetAllRole();
    this.GetAllPermission();
  },

  methods: {
    ...mapActions({
      GetAllRole: "Role_permission/GetAllRole",
      GetAllPermission: "Role_permission/GetAllPermission",
      EditAllPermission: "Role_permission/EditAllPermission"
    }),

    getRolePermission(role_id){
      this.EditAllPermission(role_id);
    },

    selectAll: function() {
      this.add_role_permission.permissions = [];

      console.log(this.allSelected);

      if (this.allSelected)
      {
        for (let key in this.subModules)
        {
          if (this.subModules.hasOwnProperty(key)) {
            var value = this.subModules[key];

            for (let m in value)
            {
              if (this.rolePermissions == null)
              {
                let mm = value[m];
                this.add_role_permission.permissions.push(mm.id);
              }else {
                let mm = value[m];
                this.rolePermissions.push(mm.id);

                if (this.allSelected === false)
                {
                  this.rolePermissions.splice(this.rolePermissions.indexOf(mm.id),1);
                }
              }

            }

          }
        }
      }else {
        for (let key in this.subModules)
        {
          if (this.subModules.hasOwnProperty(key)) {
            var value = this.subModules[key];

            for (let m in value)
            {
              if (this.rolePermissions == null)
              {
                let mm = value[m];
                if (this.allSelected === false)
                {
                  this.add_role_permission.permissions.splice(this.this.add_role_permission.permissions.indexOf(mm.id),1);
                }
              }else {
                let mm = value[m];

                if (this.allSelected === false)
                {
                  this.rolePermissions.splice(this.rolePermissions.indexOf(mm.id),1);
                }
              }

            }

          }
        }
      }
    },

    select: function() {
      this.allSelected = false;
    },

    toggleModule(selectedModule){
      let module = selectedModule.split('/');
      let module_name = module[0];
      let sub_module_name = module[1];

      this.subModules = null;
      for (var key in this.all_modules) {
        if (this.all_modules.hasOwnProperty(key)) {
          var value = this.all_modules[key];

          if (module_name === key)
          {
            this.subModules = value;
            this.subModuleKey = key;
          }

        }
      }
    },

    addRolePermission: async function(){
      try {
        let formData = new FormData();

        formData.append('role_id', this.add_role_permission.role_id);

        if (this.rolePermissions == null)
        {
          this.add_role_permission.permissions.forEach((item) => formData.append("permissions[]", item));
        }else {
          this.rolePermissions.forEach((item) => formData.append("permissions[]", item));
        }


        await this.$store.dispatch("Role_permission/StoreRolePermission", formData).then(() => {
          if (this.success_status === 200)
          {
            this.$toast.success(this.message);
            this.add_role_permission = {};
            this.errors = {};
            this.selectedModule = null;
            this.select();
          }

          if (this.error_status === 422)
          {
            console.log(this.errors);
            this.$refs.form.setErrors(this.errors);
            this.roleDialog = true;
          }else{
            this.roleDialog = false;
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
  <div id="role_permission">
    <v-row class="mx-5 mt-5">
        <v-col cols="12">
          <ValidationObserver ref="form" v-slot="{ invalid }">
            <v-form v-on:submit.prevent="addRolePermission">
              <v-row wrap>
                <v-col cols="12">
                  <v-card>
                    <v-row>
                      <v-col col="6">
                        <v-card-title><h3>Role Permission Create</h3></v-card-title>
                      </v-col>
                    </v-row>

                    <v-divider></v-divider>

                    <v-card-text>
                      <v-col cols="12" class="d-flex">
                        <v-row wrap>
                          <v-col cols="12" sm="6" lg="6">
                            <ValidationProvider name="role_id" vid="role_id" rules="required" v-slot="{ errors }">
                              <v-select
                                  :items="roles"
                                  item-text="name"
                                  item-value="id"
                                  label="Select Role"
                                  menu-props="auto"
                                  persistent-hint
                                  outlined
                                  v-model="add_role_permission.role_id"
                                  :error="errors[0] ? true : false"
                                  :error-messages="errors[0]"
                                  required
                                  @change="getRolePermission(add_role_permission.role_id)"
                              ></v-select>
                            </ValidationProvider>
                          </v-col>

                          <v-col cols="12" sm="6" lg="6">
                            <v-select
                                :items="modules"
                                item-text="name"
                                label="Select Module"
                                menu-props="auto"
                                persistent-hint
                                outlined
                                v-model="selectedModule"
                                :rules="[v => !!v || 'Please select a module']"
                                @change="toggleModule(selectedModule)"
                            >
                            </v-select>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-card-text>
                  </v-card>
                </v-col>

                <v-col cols="12" v-if="rolePermissions == null">
                  <v-card style="margin-bottom: 50px">
                    <v-card-text>
                      <v-simple-table height="300px">
                        <template v-slot:default>
                          <thead>
                          <tr>
                            <th class="text-left"><v-checkbox @click="selectAll" v-model="allSelected" color="primary" label="Url Name"></v-checkbox></th>
                            <th class="text-left" colspan="7"><h3>{{ subModuleKey }} For Permission Lists</h3></th>
                          </tr>
                          </thead>
                          <tbody>
                          <tr v-for="m in subModules" :key="m.id">
                            <td> <h4>{{ subModuleKey }}</h4></td>
                            <td v-for="mm in m" :key="mm.id">
                            <span>
                               <v-checkbox
                                   v-model="add_role_permission.permissions"
                                   color="primary"
                                   :label="mm.name"
                                   :value="mm.id"
                                   @click="select"
                                   hide-details
                               ></v-checkbox>
                            </span>
                            </td>
                          </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </v-card-text>
                  </v-card>
                </v-col >

                <v-col cols="12" v-else>
                  <v-card style="margin-bottom: 50px">
                    <v-card-text>
                      <v-simple-table height="300px">
                        <template v-slot:default>
                          <thead>
                          <tr>
                            <th class="text-left"><v-checkbox @click="selectAll" v-model="allSelected" color="primary" label="Url Name"></v-checkbox></th>
                            <th class="text-left" colspan="7"><h3>{{ subModuleKey }} For Permission Lists</h3></th>
                          </tr>
                          </thead>
                          <tbody>
                          <tr v-for="m in subModules" :key="m.id">
                            <td> <h4>{{ subModuleKey }}</h4></td>
                            <td v-for="mm in m" :key="mm.id">
                            <span>
                               <v-checkbox
                                   v-model="rolePermissions"
                                   color="primary"
                                   :label="mm.name"
                                   :value="mm.id"
                                   hide-details
                                   @click="select"
                               ></v-checkbox>
                            </span>
                            </td>
                          </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </v-card-text>
                  </v-card>
                </v-col>

                <v-col cols="12">
                  <v-row class="justify-end mb-5" style="margin-top: -50px">
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
                    >Submit
                    </v-btn>
                  </v-row>
                </v-col>
              </v-row>
            </v-form>
          </ValidationObserver>
        </v-col>

        <!-- error modal  -->
        <v-dialog v-model="roleDialog" width="350">
          <v-card style="justify-content: center; text-align: center">
            <v-card-title class="font-weight-bold justify-center">
              Role-Permission
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <div class="subtitle-1 font-weight-medium mt-5">
                Please select permission from permission lists? other wise you will not store data
              </div>
            </v-card-text>
            <v-card-actions style="display: block">
              <v-row class="mx-0 my-0 py-2" justify="center">
                <v-btn text @click="roleDialog = false" outlined class="custom-btn-width py-2 mr-10">
                  Cancel
                </v-btn>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- error modal  -->
    </v-row>
  </div>
</template>

<style scoped>

</style>