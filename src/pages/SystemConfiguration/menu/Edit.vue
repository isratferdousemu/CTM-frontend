<script>
import {
  extend,
  ValidationProvider,
  ValidationObserver
} from "vee-validate";

import { mapActions, mapState } from "vuex";

export default {
  name: "Edit",
  title: "CTM - Edit Menu",
  components: {
    ValidationProvider,
    ValidationObserver,
  },

  data() {
    return {
      link_types: [
        { id: 1, name: "Internal" },
        { id: 2, name: "External" },
      ],

      number: 0,
      numberRule: val => {
        if(val < 0) return 'Please enter a positive number'
        return true
      },
    };
  },

  watch:{
    "$i18n.locale": "updateHeaderTitle",
  },

  computed: {
    ...mapState({
      menuEdit: (state) => state.Menu.menu,
      parents: (state) => state.Menu.parents,
      pageUrls: (state) => state.Menu.pageUrls,
      message: (state) => state.Menu.success_message,
      success_status: (state) => state.Menu.success_status,
      errors: (state) => state.Menu.errors,
      error_status: (state) => state.Menu.error_status,
    }),
  },

  mounted() {
    this.GetAllParents();
    this.GetAllPageUrls();
    this.GetAllEdit(this.$route.params.id);
    this.updateHeaderTitle();
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

        await this.$store
          .dispatch("Menu/UpdateMenu", { id: id, data: formData })
          .then(() => {

            if (this.success_status == 200)
            {
              this.$store.dispatch('getAllMenus');
              this.$toast.success(this.message);
              this.GetAllEdit(this.$route.params.id);
              this.$router.push('/system-configuration/menu');
            }

            if (this.error_status === 422) {
              this.$refs.form.setErrors(this.errors);
            } else {
              this.$refs.form.setErrors();
            }

          });
      } catch (e) {
        console.log(e);
      }
    },

    updateHeaderTitle() {
      const title = this.$t(
          "container.system_config.menu.edit"
      );
      this.$store.commit("setHeaderTitle", title);
    },
  },
};
</script>

<template>
  <div id="edit_menu">
    <v-row class="mx-5 mt-5">
      <v-col cols="12">
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-card-title><h3>{{ $t('container.system_config.menu.edit') }}</h3></v-card-title>

              <v-divider></v-divider>

              <v-card-text>
                <ValidationObserver ref="form" v-slot="{ invalid }">
                  <v-form v-on:submit.prevent="updateMenu">
                    <v-col cols="12" class="d-flex">
                      <v-row wrap>
                        <v-col cols="12" sm="6" lg="6">
                          <ValidationProvider name="Label Name English" vid="label_name_en" rules="required" v-slot="{ errors }">
                            <v-text-field
                              type="text"
                              :label="$t(
                                'container.system_config.menu.label_name_en'
                              )"
                              persistent-hint
                              outlined
                              :error="errors[0] ? true : false"
                              :error-messages="errors[0]"
                              required
                              v-model="menuEdit.label_name_en"
                            ></v-text-field>
                          </ValidationProvider>
                        </v-col>

                        <v-col cols="12" sm="6" lg="6">
                          <ValidationProvider name="Label Name bangla" vid="label_name_bn" rules="required" v-slot="{ errors }">
                            <v-text-field
                              type="text"
                              v-model="menuEdit.label_name_bn"
                              :label="$t(
                                'container.system_config.menu.label_name_bn'
                              )"
                              persistent-hint
                              outlined
                              :error="errors[0] ? true : false"
                              :error-messages="errors[0]"
                              required
                            ></v-text-field>
                          </ValidationProvider>
                        </v-col>
                      </v-row>
                    </v-col>

                    <v-col cols="12" sm="6" lg="12">
                      <ValidationProvider name="Parent ID" vid="parent_id" rules="required" v-slot="{ errors }">
                        <v-autocomplete
                          :items="parents"
                          v-model="menuEdit.parent_id"
                          item-text="label_name_en"
                          item-value="id"
                          :label="$t('container.system_config.menu.parent_id')"
                          menu-props="auto"
                          hide-details
                          persistent-hint
                          outlined
                          :error="errors[0] ? true : false"
                          :error-messages="errors[0]"
                          required
                        ></v-autocomplete>
                      </ValidationProvider>
                    </v-col>

                    <v-col cols="12" sm="6" lg="12">
                      <ValidationProvider name="Link Type" vid="link_types" rules="required" v-slot="{ errors }">
                        <v-select
                          :items="link_types"
                          item-text="name"
                          item-value="id"
                          :label="$t('container.system_config.menu.link_types')"
                          menu-props="auto"
                          hide-details
                          persistent-hint
                          outlined
                          :error="errors[0] ? true : false"
                          :error-messages="errors[0]"
                          required
                          v-model="menuEdit.link_type"
                        ></v-select>
                      </ValidationProvider>
                    </v-col>

                    <v-col cols="12" class="d-flex">
                      <v-row wrap>
                        <v-col cols="12" sm="6" lg="6" v-if="menuEdit.link_type === 1">
                          <ValidationProvider name="Page Url" vid="page_link_id" rules="required" v-slot="{ errors }">
                            <v-autocomplete
                            :items="pageUrls"
                            :item-text="item => item.page_url"
                            item-value="id"
                            :label="$t('container.system_config.menu.page_link_id')"
                            menu-props="auto"
                            persistent-hint
                            outlined
                            :error="errors[0] ? true : false"
                            :error-messages="errors[0]"
                            required
                            v-model="menuEdit.page_link_id"
                            >
                              <template v-slot:item="{ item }">
                                ({{ item.name}}) {{ item.page_url }}
                              </template>
                            </v-autocomplete>
                          </ValidationProvider>
                        </v-col>

                        <v-col cols="12" sm="6" lg="6" v-if="menuEdit.link_type === 2">
                          <ValidationProvider name="Link" vid="link" rules="required" v-slot="{ errors }">
                            <v-text-field
                              type="text"
                              v-model="menuEdit.link"
                              :label="$t('container.system_config.menu.link')"
                              persistent-hint
                              outlined
                              :error="errors[0] ? true : false"
                              :error-messages="errors[0]"
                              required
                            ></v-text-field>
                          </ValidationProvider>
                        </v-col>

                        <v-col cols="12" sm="6" lg="6">
                          <ValidationProvider name="Menu Ordering" vid="order" rules="required" v-slot="{ errors }">
                            <v-text-field
                              type="number"
                              step="any"
                              min="0"
                              ref="input"
                              :rules="[numberRule]"
                              v-model="menuEdit.order"
                              :label="$t('container.system_config.menu.order')"
                              persistent-hint
                              outlined
                              :error="errors[0] ? true : false"
                              :error-messages="errors[0]"
                              required
                            ></v-text-field>
                          </ValidationProvider>
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
                        >{{ $t('container.list.back') }}
                      </v-btn>
                      <v-btn
                        flat
                        color="success"
                        type="submit"
                        class="custom-btn mr-2"
                        >{{$t('container.list.submit')}}
                      </v-btn>
                    </v-row>
                </v-form>
                </ValidationObserver>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped></style>
