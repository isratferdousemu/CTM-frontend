<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Index",
  title: "CTM - Menu",
  data() {
    return {
      search: '',
    };
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

    deleteMenu: async function (id) {
      try {
        await this.$store.dispatch("Menu/DestroyMenu", id).then(() => {
          this.GetAllMenu();
          console.log("success");
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
                  <v-card-title>Menu Lists</v-card-title>
                </v-col>

                <v-col cols="6">
                  <v-card-actions class="justify-end">
                    <v-btn
                      text
                      color="success"
                      router
                      to="/system-configuration/menu/create"
                    >
                      <v-icon small left>mdi-plus</v-icon>
                      <span>Add New</span>
                    </v-btn>
                  </v-card-actions>
                </v-col>
              </v-row>

              <v-divider></v-divider>

              <v-card-text>
                <v-card-title>
                  <v-spacer></v-spacer>

                  <v-col sm="4" style="margin-right: -10px">
                    <v-text-field
                      v-model="search"
                      append-icon="mdi-magnify"
                      label="Search"
                      hide-details
                      class="mb-5"
                      outlined
                    ></v-text-field>
                  </v-col>
                </v-card-title>

                <v-card-subtitle>
                  <v-data-table
                    :headers="headers"
                    :items="menus"
                    :search="search"
                    dense
                    class="elevation-1"
                  >
                    <template v-slot:[`item.parent_id`]="{ item }">
                      <div v-for="parent in parents" :key="parent.id">
                        <span v-if="parent.id === item.parent_id">
                          {{ parent.label_name_en }}
                        </span>
                      </div>
                    </template>

                    <template v-slot:[`item.actions`]="{ item }">
                      <v-tooltip top>
                        <template v-slot:activator="{ on }">
                          <v-btn
                            small
                            text
                            color="grey"
                            v-on="on"
                            router
                            :to="`/system-configuration/menu/edit/${item.id}`"
                          >
                            <v-icon left small>mdi-pencil</v-icon>
                            <span right class="caption text-lowercase"
                              >Edit</span
                            >
                          </v-btn>
                        </template>
                        <span>Edit</span>
                      </v-tooltip>

                      <v-tooltip top>
                        <template v-slot:activator="{ on }">
                          <v-btn
                            small
                            text
                            color="grey"
                            v-on="on"
                            @click="deleteMenu(item.id)"
                          >
                            <v-icon left small>mdi-delete</v-icon>
                            <span right class="caption text-lowercase"
                              >Delete</span
                            >
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
    </v-row>
  </div>
</template>

<style scoped></style>
