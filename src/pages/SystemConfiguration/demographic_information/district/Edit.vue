<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Edit",
  title: "CTM - Edit Divisions",
  data() {
    return {
      edit_division: { code: "123", name_en: "Dhaka", name_bn: "Dhaka" },
      errors: {},
    };
  },

  computed: {
    ...mapState({
      editDivision: (state) => state.Division.division,
      message: (state) => state.Division.success_message,
      errors: (state) => state.Division.errors,
      success_status: (state) => state.Division.success_status,
      error_status: (state) => state.Division.error_status,
    }),
  },

  mounted() {
    this.EditDivision(this.$route.params.id);
  },

  methods: {
    ...mapActions({
      EditDivision: "Division/EditDivision",
    }),

    updateDivision: async function () {
      try {
        let id = this.$route.params.id;

        let formData = new FormData();

        formData.append("code", this.edit_division.code);
        formData.append("name_en", this.edit_division.name_en);
        formData.append("name_bn", this.edit_division.name_bn);
        formData.append("_method", "put");

        await this.$store
          .dispatch("Division/StoreDivision", { id: id, data: formData })
          .then(() => {
            this.EditDivision(id);
          });
      } catch (err) {
        console.log(err);
      }
    },
  },
  beforeMount() {
    this.$store.commit("setHeaderTitle", "Division Edit");
  },
};
</script>

<template>
  <div id="division_edit">
    <v-row class="mx-5">
      <v-col cols="12">
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-card-title>Edit Division</v-card-title>

              <v-divider></v-divider>

              <v-card-text>
                <v-form v-on:submit.prevent="updateDivision">
                  <v-col cols="12" sm="6" lg="12">
                    <v-text-field
                      type="text"
                      v-model="edit_division.code"
                      label="Enter Division Code"
                      persistent-hint
                      outlined
                    ></v-text-field>
                    <p v-if="errors.code" class="red--text custom_error">
                      {{ errors.code[0] }}
                    </p>
                  </v-col>

                  <v-col cols="12" class="d-flex">
                    <v-row wrap>
                      <v-col cols="12" sm="6" lg="6">
                        <v-text-field
                          type="text"
                          v-model="edit_division.name_en"
                          label="Enter Division Name English"
                          persistent-hint
                          outlined
                        ></v-text-field>
                        <p v-if="errors.name_en" class="red--text custom_error">
                          {{ errors.name_en[0] }}
                        </p>
                      </v-col>

                      <v-col cols="12" sm="6" lg="6">
                        <v-text-field
                          type="text"
                          v-model="edit_division.name_bn"
                          label="Enter Division Name Bangla"
                          persistent-hint
                          outlined
                        ></v-text-field>
                        <p v-if="errors.name_bn" class="red--text custom_error">
                          {{ errors.name_bn[0] }}
                        </p>
                      </v-col>
                    </v-row>
                  </v-col>

                  <v-row class="justify-end mt-5 mb-5">
                    <v-btn
                      tile
                      color="primary"
                      class="custom-btn mr-2"
                      router
                      to="/system-configuration/division"
                      >Back</v-btn
                    >
                    <v-btn
                      tile
                      color="success"
                      type="submit"
                      class="custom-btn mr-2"
                      >Submit</v-btn
                    >
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
