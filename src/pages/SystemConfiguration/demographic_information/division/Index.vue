<template>
  <div id="division">
    <v-row class="mx-5">
      <v-col cols="12">
        <v-row wrap>
          <v-col cols="12">
            <v-card>
              <v-row>
                <v-col col="6">
                  <v-card-title>Division Lists</v-card-title>
                </v-col>

                <v-col cols="6">
                  <v-card-actions class="justify-end">
                    <v-btn
                      text
                      color="success"
                      router
                      to="/system-configuration/division/create"
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
                    :items="divisions"
                    :search="search"
                    dense
                    class="elevation-1"
                  >
                    <template v-slot:[`item.actions`]="{ item }">
                      <v-tooltip top>
                        <template v-slot:activator="{ on }">
                          <v-btn
                            small
                            text
                            color="grey"
                            v-on="on"
                            router
                            :to="`/system-configuration/division/edit/${item.id}`"
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
                            @click="deleteDivision(item.id)"
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

              <v-row>
                <v-col cols="12">
                  <v-card
                    elevation="10"
                    color="white"
                    rounded="md"
                    theme="light"
                    class="mb-8"
                  >
                    <v-card-text>
                      <v-row
                        class="ma-0 pa-3 white round-border d-flex justify-space-between align-center monthName-container"
                        justify="center"
                        justify-lg="space-between"
                      >
                        <v-btn
                          @click="dailogAdd = true"
                          flat
                          color="primary"
                          prepend-icon="mdi-account-multiple-plus"
                        >
                          Add New Plan
                        </v-btn>
                        <v-col cols="12">
                          <v-data-table
                            :loading="loading"
                            item-key="id"
                            :headers="headers"
                            :items="divisions"
                            hide-default-footer
                            class="elevation-0 transparent customer_list row-pointer"
                          >
                            <template v-slot:item.name_en="{ item }">
                              {{ item.name_en }}
                            </template>
                            <template v-slot:item.name_bn="{ item }">
                              {{ item.name_bn }}
                            </template>
                            <template v-slot:item.actions="{ item }">
                              <v-btn
                        v-can="'update-post'"
                        fab
                        x-small
                        color="success"
                        elevation="0"
                        @click="editPlan(item)"
                      >
                        <v-icon> mdi-account-edit-outline </v-icon>
                      </v-btn>
                              <v-btn
                                v-can="'delete-post'"
                                fab
                                x-small
                                color="grey"
                                class="mr-1 white--text"
                                elevation="0"
                                @click="deleteDivision(item.id)"
                              >
                                <v-icon> mdi-delete </v-icon>
                              </v-btn>
                            </template>
                          </v-data-table>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { extend } from "vee-validate";
import { required } from "vee-validate/dist/rules";

extend("required", required);
export default {
  name: "Index",
  title: "CTM - Divisions",
  data() {
    return {
      loading: false,
      search: "",
      divisions: [
        { id: 1, name_en: "1Dhaka", name_bn: "1Dhaka" },
        { id: 2, name_en: "2Dhaka", name_bn: "2Dhaka" },
        { id: 3, name_en: "3Dhaka", name_bn: "3Dhaka" },
        { id: 4, name_en: "4Dhaka", name_bn: "4Dhaka" },
        { id: 5, name_en: "5Dhaka", name_bn: "5Dhaka" },
        { id: 6, name_en: "6Dhaka", name_bn: "6Dhaka" },
        { id: 7, name_en: "7Dhaka", name_bn: "7Dhaka" },
      ],
    };
  },
  components: {
    // ValidationProvider,
    // ValidationObserver,
  },
  computed: {
    headers() {
      return [
        { text: "#Sl", value: "id", align: "start", sortable: false },
        { text: "Division Name English", value: "name_en" },
        { text: "Division Name English Bangla", value: "name_bn" },
        { text: "Actions", value: "actions", align: "center", sortable: false },
      ];
    },

    ...mapState({
      message: (state) => state.Division.success_message,
    }),
  },

  methods: {
    editPlan() {
      this.$router.push({
        name: "EditPlan",
      });
    },
    deleteDivision: async function (id) {
      try {
        await this.$store.dispatch("Division/DestroyDivision", id).then(() => {
          console.log("success");
        });
      } catch (e) {
        console.log(e);
      }
    },
  },
  beforeMount() {
    this.$store.commit("setHeaderTitle", "Division List");
  },
};
</script>

<style scoped></style>
