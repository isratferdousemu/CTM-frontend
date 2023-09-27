<template>
  <div id="division_create">
    <v-row class="mx-5">
      <v-col cols="12">
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-card-title>Add Division</v-card-title>

              <v-divider></v-divider>

              <v-card-text>
                <v-form v-on:submit.prevent="addDivision">
                  <v-col cols="12" sm="6" lg="12">
                    <v-text-field type="text" v-model="form.code" label="Enter Division Code" persistent-hint outlined
                      required></v-text-field>
                    <p v-if="errors.code" class="red--text custom_error">
                      {{ errors.code[0] }}
                    </p>
                  </v-col>

                  <v-col cols="12" class="d-flex">
                    <v-row wrap>
                      <v-col cols="12" sm="6" lg="6">
                        <v-text-field type="text" v-model="form.name_en" label="Enter Division Name English"
                          persistent-hint outlined required></v-text-field>
                        <p v-if="errors.name_en" class="red--text custom_error">
                          {{ errors.name_en[0] }}
                        </p>
                      </v-col>

                      <v-col cols="12" sm="6" lg="6">
                        <v-text-field type="text" v-model="form.name_bn" label="Enter Division Name Bangla"
                          persistent-hint outlined required></v-text-field>
                        <p v-if="errors.name_bn" class="red--text custom_error">
                          {{ errors.name_bn[0] }}
                        </p>
                      </v-col>
                    </v-row>
                  </v-col>

                  <v-row class="justify-end mt-5 mb-5">
                    <v-btn tile color="primary" class="custom-btn mr-2" router
                      to="/system-configuration/division">Back</v-btn>
                    <v-btn tile color="success" type="submit" class="custom-btn mr-2">Submit</v-btn>
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

<script>
import Form from "vform";
import { mapState } from "vuex";

export default {
  name: "Create",
  title: "CTM - Add Divisions",
  data() {
    return {
      form: new Form({
        name_en: "",
        name_bn: "",
        code: "",
      }),
      // errors: {},
    };
  },

  computed: {
    ...mapState({
      message: (state) => state.SystemConfiguration.success_message,
      errors: (state) => state.SystemConfiguration.errors,
      success_status: (state) => state.SystemConfiguration.success_status,
      error_status: (state) => state.SystemConfiguration.error_status,
    }),
  },

  methods: {
    addDivision: async function () {
      try {
        await this.$store.dispatch("SystemConfiguration/StoreDivision", this.form);
      } catch (err) {
        console.log(err);
      }
    },
  },
  beforeMount() {
    this.$store.commit("setHeaderTitle", "Division Create");
  },
};
</script>

<style scoped></style>
