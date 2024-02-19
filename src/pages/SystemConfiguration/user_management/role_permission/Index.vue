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
      sub_module_name: '',
      selectedModule: null,

      roleDialog: false,

      validationErrors: {},
      roleName:'',
    }
  },

  watch: {

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

    async GeneratePDF() {
      const permissionsMap = {};
      let increment= 1;
      Object.entries(this.subModules).forEach(([category, moduleArr]) => {
        permissionsMap[category] = [increment++,this.roleName, category, ...moduleArr.map(module => {
          return this.rolePermissions.includes(module.id) ? "v" : "x";
        })];
      });
      const HeaderInfo = [
        this.$t("container.list.sl"),
        this.$t("container.system_config.demo_graphic.role.role_name"),
        this.$t("container.system_config.demo_graphic.role.module_name"),
        this.$t("container.list.view"),
        this.$t("container.list.create"),
        this.$t("container.list.edit"),
        this.$t("container.list.delete")
      ]

      const queryParam = {
        language: this.$i18n.locale,
        data:permissionsMap,
        header:HeaderInfo,
        fileName:this.$t("container.system_config.demo_graphic.role.list"),
      };
      try {
        const response = await this.$axios.post("/admin/generate-pdf", queryParam, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "application/json", // Set content type to JSON
          },
          responseType: 'arraybuffer',
        });

        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url, '_blank');
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        console.error('Error generating PDF:', error);
      }
    },

    GenerateExcel(){
      // this.isLoading = true;

      try {
        import('@/plugins/Export2Excel').then((excel) => {

          const HeaderInfo = [
            this.$t("container.system_config.demo_graphic.role.role_name"),
            this.$t("container.system_config.demo_graphic.role.module_name"),
            this.$t("container.list.view"),
            this.$t("container.list.create"),
            this.$t("container.list.edit"),
            this.$t("container.list.delete")
          ]

          const permissionsMap = {};
          let increment= 1;
          Object.entries(this.subModules).forEach(([category, moduleArr]) => {
            permissionsMap[category] = [increment++,this.roleName, category, ...moduleArr.map(module => {
              return this.rolePermissions.includes(module.id) ? "v" : "x";
            })];
          });

          const CustomInfo = Object.values(permissionsMap).map((i, index) => {
           return {
             'SL': index,
             'role_name': i[1],
             'module_name': i[2],
             'view': i[3],
             'create': i[4],
             'edit': i[5],
             'delete': i[6],
           }
          });

          const Field = ['role_name', 'module_name','view','create','edit','delete']

          const Data = this.FormatJson(Field, CustomInfo)
          const currentDate = new Date().toISOString().slice(0, 10); //
          let dateinfo = this.$i18n.locale ? currentDate : this.$helpers.englishToBangla(currentDate)

          const filenameWithDate = `${dateinfo}_${this.$t("container.system_config.demo_graphic.role.list")}`;

          excel.export_json_to_excel({
            header: HeaderInfo,
            data: Data,
            sheetName: '',
            filename: filenameWithDate,
            autoWidth: true,
            bookType: "xlsx"
          })
        })
      } catch (error) {
        // Handle any errors here
        this.isLoading = false;
      } finally {
        this.isLoading = false;
      }
    },

    FormatJson(FilterData,JsonData){
      return JsonData.map((v) =>
          FilterData.map((j => {
            return v[j];
          })))
    },

    getRolePermission(role_id){
      const selectedRole = this.roles.find(role => role.id === role_id);
      this.roleName = selectedRole ? selectedRole.name : null;
      this.EditAllPermission(role_id);
    },

    selectAll: function() {
      this.add_role_permission.permissions = [];

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
                  this.add_role_permission.permissions = [];
                }
              }else {
                let mm = value[m];

                if (this.allSelected === false)
                {
                  this.rolePermissions.splice(this.rolePermissions.indexOf(mm.id),1);
                  this.rolePermissions = [];
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
      this.subModules = null;

      for (var key in this.all_modules) {
        if (this.all_modules.hasOwnProperty(key)) {
          var value = this.all_modules[key];

          if (selectedModule === key)
          {
            this.subModules = value;
            this.subModuleKey = key;
          }
        }
      }
    },

    forceUpdate(){

        this.selectedModule = null;
        this.subModules = null;
        this.add_role_permission.role_id = null;
        this.$refs.form.reset();
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
            this.selectedModule = null;
            this.subModules = null;
            this.select();
            this.$refs.form.setErrors();
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
                                @change="toggleModule(selectedModule)"
                            >
                            </v-select>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-card-text>
                  </v-card>
                </v-col>

                <v-row justify="end">
                <v-col lg="4" md="6" cols="12" class="text-right">
                  <v-btn elevation="2" class="btn mr-2 white--text" color="red darken-4" @click="GeneratePDF()">
                    <v-icon class="pr-1">mdi-tray-arrow-down</v-icon> {{ $t("container.list.PDF") }}
                  </v-btn>
                  <v-btn elevation="2" class="btn mr-2 white--text" color="teal darken-2" @click="GenerateExcel()">
                    <v-icon class="pr-1">mdi-tray-arrow-down</v-icon>
                    {{ $t("container.list.excel") }}
                  </v-btn>
                </v-col>
                </v-row>


                <v-col cols="12" v-if="rolePermissions === null">
                  <v-card style="margin-bottom: 50px">
                    <v-card-text>
                      <v-simple-table height="500px">
                        <template v-slot:default>
                          <thead>
                          <tr>
                            <th class="text-left"><v-checkbox @click="selectAll" v-model="allSelected" color="primary" label="Select All"></v-checkbox></th>
                            <th class="text-left">Create</th>
                            <th class="text-left">View</th>
                            <th class="text-left">Edit</th>
                            <th class="text-left">Delete</th>
                          </tr>
                          </thead>
                          <tbody>
                          <tr v-for="(m, key) in subModules" :key="m.id">
                            <td style="width: 30%">
                                <h4>{{ key }}</h4>
                            </td>
                            <td v-for="mm in m" :key="mm.id">
                            <span>
                               <v-checkbox
                                   v-model="add_role_permission.permissions"
                                   color="primary"
                                   :value="mm.id"
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
                </v-col >

                <v-col cols="12" v-else>
                  <v-card style="margin-bottom: 50px">
                    <v-card-text>
                      <v-simple-table height="500px">
                        <template v-slot:default>
                          <thead>
                          <tr>
                            <th class="text-left"><v-checkbox @click="selectAll" v-model="allSelected" color="primary" label="Select All"></v-checkbox></th>
                            <th class="text-left">Create</th>
                            <th class="text-left">View</th>
                            <th class="text-left">Edit</th>
                            <th class="text-left">Delete</th>
                          </tr>
                          </thead>
                          <tbody>
                          <tr v-for="(m, key) in subModules" :key="m.id">
                            <td style="width: 30%">
                              <h4>{{ key }}</h4>
                            </td>
                            <td v-for="mm in m" :key="mm.id">
                            <span>
                               <v-checkbox
                                   v-model="rolePermissions"
                                   color="primary"
                                   :value="mm.id"
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
                        color="primary"
                        class="custom-btn mr-2"
                        router
                        to="/system-configuration/role"
                    >Back
                    </v-btn>

                    <v-btn
                        color="orange"
                        class="custom-btn mr-2"
                        @click="forceUpdate()"
                    >Reset
                    </v-btn>
                    <v-btn
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