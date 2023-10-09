<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Create",
  title: "CTM - Add Menu",
  data() {
    return {
      link_types: [
        { id: 1, name: "Internal" },
        { id: 2, name: "External" },
      ],
      add_menu: {
        label_name_en: null,
        label_name_bn: null,
        page_link_id: null,
        parent_id: null,
        order: null,
        link_type: null,
        link: null,
      },
      labelNameEnRules: [
        v => !!v || 'Label Name English is Required',
        v => v.length <= 50 || 'Label Name English must be 50 characters or more',
      ],
      labelNameBnRules: [
        v => !!v || 'Label Name Bangla is Required',
        v => v.length <= 50 || 'Label Name must bangla be 50 characters or more',
      ],
      orderRules: [
        v => v.length > 0 || 'This field may not be empty',
        v => Number.isInteger(Number(v)) || "The value must be an integer number",
        v => v > 0 || 'The value must be greater than zero'
      ]
    };
  },

  computed: {
    ...mapState({
      parents: (state) => state.Menu.parents,
      pageUrls: (state) => state.Menu.pageUrls,
      errors: state => state.Menu.errors,
      message: (state) => state.Menu.success_message
    }),
  },

  mounted() {
    this.GetAllParents();
    this.GetAllPageUrls();
  },

  methods: {
    ...mapActions({
      GetAllParents: "Menu/GetAllParents",
      GetAllPageUrls: "Menu/GetAllPageUrls",
    }),

    addMenu: async function () {
      try {
        let formData = new FormData();
        for (const [key, value] of Object.entries(this.add_menu)) {
        if (value !== null) {
          formData.append(key, value);
        }
      }

        await this.$store.dispatch("Menu/StoreMenu", formData).then((res) => {
          console.log(res, 'res');
          if (res.status === 200 || res.status === 201) {
    this.$store.dispatch('getAllMenus');
            this.add_menu = {};
          this.$toast.success(this.message);
          this.$router.push({ name: "Menu" });
          }else{
            this.$toast.error(res.response.data.message);
          }

        
        });
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<template>
  <div id="create-menu">
    <v-row class="mx-5">
      <v-col cols="12">
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-card-title><h3>Add Menu</h3></v-card-title>

              <v-divider></v-divider>

              <v-card-text>
                <v-form v-on:submit.prevent="addMenu">
                  <v-col cols="12" class="d-flex">
                    <v-row wrap>
                      <v-col cols="12" sm="6" lg="6">
                        <v-text-field
                          type="text"
                          v-model="add_menu.label_name_en"
                          :rules="labelNameEnRules"
                          label="Enter Label Name English"
                          persistent-hint
                          outlined
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
                          v-model="add_menu.label_name_bn"
                          :rules="labelNameBnRules"
                          label="Enter Label Name Bangla"
                          persistent-hint
                          outlined
                        ></v-text-field>
                        <p
                          v-if="errors?.label_name_bn"
                          class="red--text custom_error"
                        >
                          {{ errors?.label_name_bn[0] }}
                        </p>
                      </v-col>
                    </v-row>
                  </v-col>

                  <v-col cols="12" sm="6" lg="12">
                    <v-autocomplete
                    :items="parents"
                    v-model="add_menu.parent_id"
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
                      :rules="[v => !!v || 'Link Type is required']"
                      label="Select link type"
                      menu-props="auto"
                      hide-details
                      persistent-hint
                      outlined
                      v-model="add_menu.link_type"
                    ></v-select>
                  </v-col>

                  <v-col cols="12" class="d-flex">
                    <v-row wrap>
                      <v-col
                        cols="12"
                        sm="6"
                        lg="6"
                        v-if="add_menu.link_type === 1"
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
                        v-model="add_menu.page_link_id"
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
                        v-if="add_menu.link_type === 2"
                      >
                        <v-text-field
                          type="text"
                          v-model="add_menu.link"
                          label="Enter Link"
                          persistent-hint
                          outlined
                        ></v-text-field>
                        <p v-if="errors.link" class="red--text custom_error">
                          {{ errors?.link[0] }}
                        </p>
                      </v-col>

                      <v-col cols="12" sm="6" lg="6">
                        <v-text-field
                          type="number"
                          v-model="add_menu.order"
                          :rules="orderRules"
                          label="Enter Order"
                          persistent-hint
                          outlined
                        ></v-text-field>
                        <p v-if="errors?.order" class="red--text custom_error">
                          {{ errors?.order[0] }}
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
