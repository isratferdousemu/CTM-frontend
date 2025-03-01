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
      page: 1
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
      handler() {
          this.page = this.options.page;
          this.getAllMenus();
      },
    },

    "$i18n.locale": "updateHeaderTitle",
  },

  created() {
    this.getAllMenus();
  },

  computed: {
    headers() {
      return [
        { text: this.$t('container.list.sl'), value: "id", align: "start", sortable: false },
        { text: this.$t('container.system_config.menu.label_name_en'), value: "label_name_en" },
        { text: this.$t('container.system_config.menu.label_name_bn'), value: "label_name_bn" },
        { text: this.$t('container.system_config.menu.parent_id'), value: "parent_id" },
        { text: this.$t('container.system_config.menu.link'), value: "link" },
        { text: this.$t('container.list.action'), value: "actions", align: "center", sortable: false },
      ];
    },

    ...mapState({
      parents: (state) => state.Menu.parents,
      message: (state) => state.Menu.success_message,
    }),
  },

  mounted() {
    this.GetAllParents();
    this.updateHeaderTitle();
  },

  methods: {
    ...mapActions({
      GetAllParents: "Menu/GetAllParents",
    }),

    getAllMenus(){
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
          this.loading = false;
        });
    },

    deleteAlert(id) {
      this.deleteDialog = true;
      this.deleted_id = id;
    },

    deleteMenu: async function () {
      try {
        let id = this.deleted_id;
        await this.$store.dispatch("Menu/DestroyMenu", id).then(() => {
          this.getAllMenus();
          this.$store.dispatch('getAllMenus');
          this.deleteDialog = false;
          this.$toast.success(this.message);
        });
      } catch (e) {
        console.log(e);
      }
    },

    updateHeaderTitle() {
      const title = this.$t(
          "container.system_config.menu.list"
      );
      this.$store.commit("setHeaderTitle", title);
    },

  },
};
</script>

<template>
  <div id="menu">
    <v-row class="mx-5 mt-5">
      <v-col cols="12">
        <v-row wrap>
          <v-col cols="12">
            <v-card>
              <v-row>
                <v-col col="6">
                  <v-card-title><h3>{{ $t('container.system_config.menu.list') }}</h3></v-card-title>
                </v-col>
              </v-row>

              <v-divider></v-divider>

              <v-card-text>
                <v-card-title class="mb-5">
                  <div class="d-flex justify-sm-end flex-wrap">
                      <v-text-field
                        @keyup.native="getAllMenus"
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
                      v-can="'menu-create'"
                    >
                    <v-icon small left>mdi-plus</v-icon>
                    <span>{{$t('container.list.add_new')}}</span>
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
                        'items-per-page-options': [10,20,30,40,50]
                    }"
                    dense
                    class="elevation-1"
                  >
                    <template v-slot:item.id="{ item, index }">
                      {{
                        (options.page - 1) * options.itemsPerPage + index + 1
                      }}
                    </template>

                    <template v-slot:[`item.parent_id`]="{ item }">
                      <span v-if="item.parent_id == null">
                          ---
                      </span>
                      <span v-else>
                        <span v-if="item.parent_id != null">
                          <div v-for="parent in parents" :key="parent.id">
                              <span v-if="item.parent_id === parent.id">{{ parent.label_name_en }}</span>
                          </div>
                        </span>
                      </span>

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
                            v-can="'menu-edit'"
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
                            v-can="'menu-delete'"
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
            {{ $t('container.system_config.menu.delete') }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <div class="subtitle-1 font-weight-medium mt-5">
              {{ $t('container.system_config.menu.delete_alert') }}
            </div>
          </v-card-text>
          <v-card-actions style="display: block">
            <v-row class="mx-0 my-0 py-2" justify="center">
              <v-btn text @click="deleteDialog = false" outlined class="custom-btn-width py-2 mr-10">
                {{ $t("container.list.cancel") }}
              </v-btn>
              <v-btn text @click="deleteMenu" color="white" :loading="delete_loading"
                     class="custom-btn-width warning white--text py-2">
                {{ $t("container.list.delete") }}
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
