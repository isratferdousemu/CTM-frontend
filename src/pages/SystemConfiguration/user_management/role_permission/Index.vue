<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "Index",
  title: "CTM - Role Permission",

  data(){
    return{
      add_role_permission:{
        role_id: '',
        permission: []
      },

      subModules: [],
      selectedModule: null
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
    })
  },

  mounted() {
    this.GetAllRole();
    this.GetAllPermission();
  },

  methods: {
    ...mapActions({
      GetAllRole: "Role_permission/GetAllRole",
      GetAllPermission: "Role_permission/GetAllPermission"
    }),

    toggleModule(selectedModule){
      let module = selectedModule.split('/');
      let module_name = module[0];
      let sub_module_name = module[1];

      this.subModules = [];
      this.all_modules.forEach((item) => {
        if (module_name === item.module_name && sub_module_name === item.sub_module_name)
        {
          this.subModules.push(item);
        }
      })
    },
  }
}
</script>

<template>
  <div id="role_permission">
    <v-row class="mx-5">
      <v-col cols="12">
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
                <v-card-subtitle>

                  <v-col cols="12" class="d-flex">
                    <v-row wrap>
                      <v-col cols="12" sm="6" lg="6">
                        <v-select
                            :items="roles"
                            item-text="name"
                            item-value="id"
                            label="Select Role"
                            menu-props="auto"
                            hide-details
                            persistent-hint
                            outlined
                            v-model="add_role_permission.role_id"
                        ></v-select>
                        <p v-if="errors?.role_id" class="red--text custom_error">
                          {{ errors.role_id[0] }}
                        </p>
                      </v-col>

                      <v-col cols="12" sm="6" lg="6">

                        <v-select
                            :items="modules"
                            item-text="name"
                            label="Select Module"
                            menu-props="auto"
                            hide-details
                            persistent-hint
                            outlined
                            v-model="selectedModule"
                            @change="toggleModule(selectedModule)"
                        >
                        </v-select>
                        <p v-if="errors?.permission" class="red--text custom_error">
                          {{ errors.permission[0] }}
                        </p>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-card-subtitle>
              </v-card-text>
            </v-card>


          </v-col>

          <v-col cols="12">
            <v-card>
              <v-card-text>
                <v-simple-table height="300px">
                  <template v-slot:default>
                    <thead>
                    <tr>
                      <th class="text-left">Url Name</th>
                      <th class="text-left">Create</th>
                      <th class="text-left">List</th>
                      <th class="text-left">Edit</th>
                      <th class="text-left">View</th>
                      <th class="text-left">Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr
                        v-for="item in subModules"
                        :key="item.id"
                    >
                      <td>{{ item.page_url }}</td>
<!--                      <td>-->
<!--                        <v-checkbox-->
<!--                            v-model="add_role_permission.permission"-->
<!--                            color="primary"-->
<!--                            :label="item.name"-->
<!--                            :value="item.id"-->
<!--                            hide-details-->
<!--                        ></v-checkbox>-->
<!--                      </td>-->
                    </tr>
                    </tbody>
                  </template>
                </v-simple-table>
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