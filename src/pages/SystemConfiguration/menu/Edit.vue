<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Edit",
  title: "CTM - Edit Menu",
  data() {
    return {
      link_types: [
        { id: 1, name: "Internal" },
        { id: 2, name: "External" },
      ]
    };
  },

  computed: {
    ...mapState({
      menuEdit: (state) => state.Menu.menu,
      parents: (state) => state.Menu.parents,
      pageUrls: (state) => state.Menu.pageUrls,
      errors: (state) => state.Menu.errors,
      message: (state) => state.Menu.success_message
    }),
  },

  mounted() {
    this.GetAllParents();
    this.GetAllPageUrls();
    this.GetAllEdit(this.$route.params.id);
  },

  methods: {
    ...mapActions({
      GetAllParents: "Menu/GetAllParents",
      GetAllPageUrls: "Menu/GetAllPageUrls",
      GetAllEdit: "Menu/GetSingleMenu",
    }),

    updateMenu: async function () {
      try {
        let id = this.$route.params.id;

        let formData = new FormData();

        for (const [key, value] of Object.entries(this.menuEdit)) {
          if (value !== null) {
            formData.append(key, value);
          }
        }

        formData.append("_method", "PUT");

        // formData.append("label_name_en", this.menuEdit.label_name_en);
        // formData.append("label_name_bn", this.menuEdit.label_name_bn);
        // formData.append("page_link_id", this.menuEdit.page_link_id);
        // formData.append("parent_id", this.menuEdit.parent_id);
        // formData.append("link_type", this.menuEdit.link_type);
        // formData.append("link", this.menuEdit.link);
        // formData.append("order", this.menuEdit.order);


        await this.$store
          .dispatch("Menu/UpdateMenu", { id: id, data: formData })
          .then(() => {
    this.$store.dispatch('getAllMenus');
            this.$toast.success(this.message);
            this.GetAllEdit(this.$route.params.id);
          });
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<template>
  <div id="edit_menu">
    <v-row class="mx-5">
      <v-col cols="12">
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-card-title><h3>Edit Menu</h3></v-card-title>

              <v-divider></v-divider>

              <v-card-text>
                <v-form v-on:submit.prevent="updateMenu">
                  <v-col cols="12" class="d-flex">
                    <v-row wrap>
                      <v-col cols="12" sm="6" lg="6">
                        <v-text-field
                          type="text"
                          label="Enter Menu Name English"
                          persistent-hint
                          outlined
                          v-model="menuEdit.label_name_en"
                        ></v-text-field>
                        <p
                          v-if="errors?.label_name_en"
                          class="red--text custom_error"
                        >
                          {{ errors.label_name_en[0] }}
                        </p>
                      </v-col>

                      <v-col cols="12" sm="6" lg="6">
                        <v-text-field
                          type="text"
                          v-model="menuEdit.label_name_bn"
                          label="Enter Menu Name Bangla"
                          persistent-hint
                          outlined
                        ></v-text-field>
                        <p
                          v-if="errors?.label_name_bn"
                          class="red--text custom_error"
                        >
                          {{ errors.label_name_bn[0] }}
                        </p>
                      </v-col>
                    </v-row>
                  </v-col>

                  <v-col cols="12" sm="6" lg="12">
                    <v-autocomplete
                    :items="parents"
                    v-model="menuEdit.parent_id"
                      item-text="label_name_en"
                      item-value="id"
                      label="Select parent"
                      menu-props="auto"
                      hide-details
                      persistent-hint
                      outlined
                  ></v-autocomplete>
                  </v-col>

                  <v-col cols="12" sm="6" lg="12">
                    <v-select
                      :items="link_types"
                      item-text="name"
                      item-value="id"
                      label="Select link type"
                      menu-props="auto"
                      hide-details
                      persistent-hint
                      outlined
                      v-model="menuEdit.link_type"
                    ></v-select>
                  </v-col>

                  <v-col cols="12" class="d-flex">
                    <v-row wrap>
                      <v-col
                        cols="12"
                        sm="6"
                        lg="6"
                        v-if="menuEdit.link_type === 1"
                      >
                        <v-autocomplete
                        :items="pageUrls"
                        :item-text="item => item.page_url"
                        item-value="id"
                        :rules="[v => !!v || 'Page urls is required']"
                        label="Select page url"
                        menu-props="auto"
                        persistent-hint
                        outlined
                        v-model="menuEdit.page_link_id"
                      >
                      <template v-slot:item="{ item }">
                        ({{ item.name}}) {{ item.page_url }}
                      </template>
                    </v-autocomplete>

                      </v-col>

                      <v-col
                        cols="12"
                        sm="6"
                        lg="6"
                        v-if="menuEdit.link_type === 2"
                      >
                        <v-text-field
                          type="text"
                          v-model="menuEdit.link"
                          label="Enter Link"
                          persistent-hint
                          outlined
                        ></v-text-field>
                        <p v-if="errors?.link" class="red--text custom_error">
                          {{ errors.link[0] }}
                        </p>
                      </v-col>

                      <v-col cols="12" sm="6" lg="6">
                        <v-text-field
                          type="number"
                          v-model="menuEdit.order"
                          label="Enter Order"
                          persistent-hint
                          outlined
                        ></v-text-field>
                        <p v-if="errors?.order" class="red--text custom_error">
                          {{ errors.order[0] }}
                        </p>
                      </v-col>
                    </v-row>
                  </v-col>

                  <v-row class="justify-end mt-5 mb-5">
                    <v-btn
                      flat
                      color="primary"
                      class="custom-btn mr-2"
                      router
                      to="/system-configuration/menu"
                      >Back
                    </v-btn>
                    <v-btn
                      flat
                      color="success"
                      type="submit"
                      class="custom-btn mr-2"
                      >Submit
                    </v-btn>
                  </v-row>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped></style>
