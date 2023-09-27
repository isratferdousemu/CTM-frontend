<script>
import { mapActions, mapState } from "vuex";
import {http} from "@/hooks/httpService";

export default {
  name: "Index",
  title: "CTM - Menu",
  data() {
    return {
      totalMenus: 0,
      menus: [],
      loading: true,
      options: {},
      search: '',
      deleteDialog: false,
      delete_loading: false,
      deleted_id: '',
    };
  },

  watch: {
    options: {
      handler () {
        this.getAllMenus()
      },
      deep: true,
    },

    search: {
      handler () {
        this.getAllMenus()
      },
    },
  },

  computed: {
    headers() {
      return [
        { text: "#Sl", value: "id", align: "start", sortable: false },
        { text: "Label Name English", value: "label_name_en" },
        { text: "Label Name Bangla", value: "label_name_bn" },
        { text: "Parent", value: "parent_id" },
        { text: "Link", value: "link" },
        { text: "Actions", value: "actions", align: "center", sortable: false },
      ];
    },

    ...mapState({
      parents: (state) => state.Menu.parents,
      menus: (state) => state.Menu.menus,
      message: (state) => state.Menu.success_message,
    }),
  },

  mounted() {
    this.GetAllMenu();
    this.GetAllParents();
  },

  methods: {
    ...mapActions({
      GetAllMenu: "Menu/GetAllMenus",
      GetAllParents: "Menu/GetAllParents",
    }),

    getAllMenus(){
      this.loading = true

      const { sortBy, sortDesc, page, itemsPerPage } = this.options

      http().get('/admin/menu/get', {
        params: {
          sortBy: sortBy[0],
          sortDesc: sortDesc[0],
          page: page,
          itemsPerPage: itemsPerPage,
          search: this.search
        }
      }).then((result) => {
        this.menus = result.data.data;
        this.totalMenus = result.data.total;
        this.loading = false;
      }).catch((err) => {
        console.log(err);
      })
    },

    deleteAlert(id) {
      this.deleteDialog = true;
      this.deleted_id = id;
    },

    deleteMenu: async function () {
      try {
        let id = this.deleted_id;
        await this.$store.dispatch("Menu/DestroyMenu", id).then(() => {
          this.GetAllMenu();
          this.deleteDialog = false;
          this.$toast.success(this.message);
        });
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<template>
  <div id="menu">
    <v-row class="mx-5">
      <v-col cols="12">
        <v-row wrap>
          <v-col cols="12">
            <v-card>
              <v-row>
                <v-col col="6">
                  <v-card-title><h3>Menu Lists</h3></v-card-title>
                </v-col>
              </v-row>

              <v-divider></v-divider>

              <v-card-text>
                <v-card-title class="mb-5">
                  <div class="d-flex justify-sm-end flex-wrap">
                      <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Search"
                        hide-details
                        class="mb-5 my-sm-0 my-3 mx-0v -input--horizontal "
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
                      to="/system-configuration/menu/create"
                    >
                    <v-icon small left>mdi-plus</v-icon>
                    <span>Add New</span>
                  </v-btn>
                </v-card-title>

                <v-card-subtitle>
                  <v-data-table
                    :headers="headers"
                    :items="menus"
                    :search="search"
                    :options.sync="options"
                    :server-items-length="totalMenus"
                    :loading="loading"
                    :footer-props="{
                        'items-per-page-options': [1,10,20,30,40,50]
                    }"
                    dense
                    class="elevation-1"
                  >
                    <template v-slot:[`item.parent_id`]="{ item }">
                      <div v-for="parent in parents" :key="parent.id">
                        <span v-if="parent.id === item.parent_id">
                          {{ parent.label_name_en }}
                        </span>
                        <span v-else>
                          -
                        </span>
                      </div>
                    </template>

                    <template v-slot:[`item.link`]="{ item }">
                        <span v-if="item.link != null">
                          {{ item.link }}
                        </span>
                        <span v-else>
                          ---
                        </span>
                    </template>

                    <template v-slot:[`item.actions`]="{ item }">
                      <v-tooltip top>
                        <template v-slot:activator="{ on }">
                          <v-btn
                            fab
                            x-small
                            color="success"
                            v-on="on"
                            router
                            :to="`/system-configuration/menu/edit/${item.id}`"
                          >
                          <v-icon>mdi-account-edit-outline</v-icon>
                          </v-btn>
                        </template>
                        <span>Edit</span>
                      </v-tooltip>

                      <v-tooltip top>
                        <template v-slot:activator="{ on }">
                          <v-btn
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
              <v-btn text @click="deleteMenu" color="white" :loading="delete_loading"
                     class="custom-btn-width black white--text py-2">
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

<style scoped></style>
