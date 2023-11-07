<script>
import {http} from "@/hooks/httpService";
import {mapState} from "vuex";

export default {
  name: "Index",
  title: "CTM - Roles",

  data(){
    return{
      deleteDialog: false,
      delete_loading: false,
      deleted_id: '',
      totalRoles: 0,
      roles: [],
      loading: true,
      options: {},
      search: '',
    }
  },

  watch: {
    '$i18n.locale': 'updateHeaderTitle',

    options: {
      handler () {
        this.getAllRoles()
      },
      deep: true,
    },

    search: {
      handler () {
        this.getAllRoles()
      },
    },
  },

  computed: {
    headers(){
      return[
        { text: "#Sl", value: "id", align: "start", sortable: false },
        { text: "Code", value: "code" },
        { text: "Role Name (BN)", value: "name_bn" },
        { text: "Role Name (EN)", value: "name_en" },
        { text: "Remarks", value: "comment" },
        { text: "Status", value: "status" },
        { text: "Actions", value: "actions", align: "center", sortable: false },
      ]
    },

    ...mapState({
      message: (state) => state.Role.success_message
    })
  },

  mounted() {
    this.getAllRoles();
    this.updateHeaderTitle();
  },

  methods: {
    getAllRoles(){
      const { sortBy, sortDesc, page, itemsPerPage } = this.options

      http().get('/admin/role/get', {
        params: {
          sortBy: sortBy[0],
          sortDesc: sortDesc[0],
          page: page,
          itemsPerPage: itemsPerPage,
          search: this.search
        }
      }).then((result) => {
        this.roles = result.data.data;
        this.totalRoles = result.data.total;
        this.loading = false;
      }).catch((err) => {
        console.log(err);
      })
    },
     updateHeaderTitle() {
      const title = this.$t("container.system_config.demo_graphic.role.list");
      this.$store.commit("setHeaderTitle", title);
    },

    deleteAlert(id) {
      this.deleteDialog = true;
      this.deleted_id = id;
    },

    deleteRole: async function(){
      try {
        let id = this.deleted_id;
        await this.$store.dispatch("Role/DestroyRole", id).then(() => {
          this.deleteDialog = false;
          this.$toast.success(this.message);
          this.getAllRoles();
        })
      }catch (e) {
        console.log(e);
      }
    }
  }
}
</script>

<template>
  <div id="roles">
    <v-row class="mx-5 mt-5">
      <v-col cols="12">
        <v-row wrap>
          <v-col cols="12">
            <v-card>
              <v-row>
                <v-col col="6">
                  <v-card-title><h3>Role Lists</h3></v-card-title>
                </v-col>
              </v-row>

              <v-divider></v-divider>

              <v-card-text>
                <v-card-title class="mb-5">
                  <div class="d-flex justify-sm-end flex-wrap">
                    <v-text-field
                        @keyup.native="getAllRoles"
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Search"
                        hide-details
                        class="mb-5 my-sm-0 my-3 mx-0v -input--horizontal"
                        flat
                        outlined dense
                    ></v-text-field>
                  </div>

                  <v-spacer></v-spacer>

                  <v-btn
                      medium
                      flat
                      color="primary"
                      router
                      to="/system-configuration/role/create"
                  >
                    <v-icon small left>mdi-plus</v-icon>
                    <span>Add New</span>
                  </v-btn>
                </v-card-title>

                <v-card-subtitle>
                  <v-data-table
                      :headers="headers"
                      :items="roles"
                      :search="search"
                      :options.sync="options"
                      :server-items-length="totalRoles"
                      :loading="loading"
                      :footer-props="{
                          'items-per-page-options': [10,20,30,40,50]
                      }"
                      dense
                      class="elevation-1 transparent row-pointer"
                  >

                    <template v-slot:item.id="{ item, index }">
                      {{
                        (options.page - 1) * options.itemsPerPage + index + 1
                      }}
                    </template>

                    <template v-slot:[`item.comment`]="{ item }">
                      <span v-if="item.comment != null">
                        {{ item.comment }}
                      </span>
                      <span v-else>
                        ---
                      </span>
                    </template>

                    <template v-slot:[`item.status`]="{ item }">
                      <span v-if="item.status === 0">
                        Inactive
                      </span>
                      <span v-else>
                        Active
                      </span>
                    </template>

                    <template v-slot:[`item.actions`]="{ item }" style="padding: 10px;">
                      <v-tooltip top>
                        <template v-slot:activator="{ on }">
                          <v-btn
                          :disabled="item.default === 1"
                              fab
                              x-small
                              color="success"
                              v-on="on"
                              router
                              :to="`/system-configuration/role/edit/${item.id}`"
                          >
                            <v-icon>mdi-account-edit-outline</v-icon>
                          </v-btn>
                        </template>
                        <span>Edit</span>
                      </v-tooltip>

                      <v-tooltip top>
                        <template v-slot:activator="{ on }">
                          <v-btn
                          :disabled="item.default === 1"
                              fab
                              x-small
                              color="grey"
                              class="ml-3 white--text"
                              v-on="on"
                              @click="deleteAlert(item.id)"
                          >
                            <v-icon>mdi-delete</v-icon>
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

      <!-- delete modal  -->
      <v-dialog v-model="deleteDialog" width="350">
        <v-card style="justify-content: center; text-align: center">
          <v-card-title class="font-weight-bold justify-center">
            Delete Device
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <div class="subtitle-1 font-weight-medium mt-5">
              Are you sure to delete this Device? Division all information will be deleted.
            </div>
          </v-card-text>
          <v-card-actions style="display: block">
            <v-row class="mx-0 my-0 py-2" justify="center">
              <v-btn text @click="deleteDialog = false" outlined class="custom-btn-width py-2 mr-10">
                Cancel
              </v-btn>
              <v-btn text @click="deleteRole" color="white" :loading="delete_loading"
                     class="custom-btn-width warning white--text py-2">
                Delete
              </v-btn>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- delete modal  -->
    </v-row>
  </div>
</template>

<style scoped>

</style>