<template>
  <div id="division_create">
    <v-row class="mx-5">
      <v-col cols="12">
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-card-title>Add Thana/ Upazila</v-card-title>

              <v-divider></v-divider>

              <v-card-text>
                <v-form v-on:submit.prevent="addThana">
                  <v-col cols="12" sm="6" lg="12">
                    <v-row wrap>
                      <v-col cols="12" sm="6" lg="6">
                        <v-text-field type="text" v-model="add_thana.code" label="Enter Thana Code" persistent-hint
                          outlined></v-text-field>
                        <p v-if="errors.code" class="red--text custom_error">
                          {{ errors.code[0] }}
                        </p>
                      </v-col>
                      <v-col cols="12" sm="6" lg="6">
                        <v-autocomplete label="Enter Division"
                          :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                          outlined></v-autocomplete>
                        <p v-if="errors.code" class="red--text custom_error">
                          {{ errors.code[0] }}
                        </p>
                      </v-col>

                    </v-row>
                  </v-col>
                  <v-col cols="12" sm="6" lg="12">
                    <v-row wrap>
                      <v-col cols="12" sm="6" lg="6">
                        <v-autocomplete label="Enter District"
                          :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                          outlined></v-autocomplete>
                        <p v-if="errors.code" class="red--text custom_error">
                          {{ errors.code[0] }}
                        </p>
                      </v-col>
                      <v-col cols="12" sm="6" lg="6">
                        <v-autocomplete label="Enter Location Type"
                          :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                          outlined></v-autocomplete>
                        <p v-if="errors.code" class="red--text custom_error">
                          {{ errors.code[0] }}
                        </p>
                      </v-col>

                    </v-row>
                  </v-col>

                  <v-col cols="12" class="d-flex">
                    <v-row wrap>
                      <v-col cols="12" sm="6" lg="6">
                        <v-text-field type="text" v-model="add_thana.name_en" label="Enter Thana Name English"
                          persistent-hint outlined></v-text-field>
                        <p v-if="errors.name_en" class="red--text custom_error">
                          {{ errors.name_en[0] }}
                        </p>
                      </v-col>

                      <v-col cols="12" sm="6" lg="6">
                        <v-text-field type="text" v-model="add_thana.name_bn" label="Enter Thana Name Bangla"
                          persistent-hint outlined></v-text-field>
                        <p v-if="errors.name_bn" class="red--text custom_error">
                          {{ errors.name_bn[0] }}
                        </p>
                      </v-col>
                    </v-row>
                  </v-col>


                  <v-row class="justify-end mt-5 mb-5">
                    <v-btn tile color="primary" class="custom-btn mr-2" router
                      to="/system-configuration/thana">Back</v-btn>
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
import { mapState } from "vuex";

export default {
  name: "Create",
  title: "CTM - Add Thana/Upazilas",
  data() {
    return {
      add_thana: {
        name_en: "",
        name_bn: "",
        code: "",
      },

      errors: {},
    };
  },

  computed: {
    ...mapState({
      message: (state) => state.Division.success_message,
      errors: (state) => state.Division.errors,
      success_status: (state) => state.Division.success_status,
      error_status: (state) => state.Division.error_status,
    }),
  },

  methods: {
    addDivision: async function () {
      try {
        let formData = new FormData();

        formData.append("name_en", this.add_division.name_en);
        formData.append("name_bn", this.add_division.name_bn);
        formData.append("code", this.add_division.code);

        await this.$store
          .dispatch("Division/StoreDivision", formData)
          .then(() => {
            this.add_division = {};
          });
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
