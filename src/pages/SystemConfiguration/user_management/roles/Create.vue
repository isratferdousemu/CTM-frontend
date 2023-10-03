<script>
import {mapState} from "vuex";

export default {
  name: "Create",
  title: "CTM - Create Role",

  data(){
    return{
      add_role: {
        code: '',
        name_en: '',
        name_bn: '',
        comment: '',
        status: ''
      }
    }
  },

  computed: {
    ...mapState({
      message: (state) => state.Role.success_message,
      success_status: (state) => state.Role.success_status,
      errors: (state) => state.Role.errors
    })

  },

  methods: {
    addRole: async function(){
      console.log(this.add_role.status);

      try {
        let formData = new FormData();

        formData.append('code', this.add_role.code);
        formData.append('name_en', this.add_role.name_en);
        formData.append('name_bn', this.add_role.name_bn);
        formData.append('comment', this.add_role.comment);
        formData.append('status', this.add_role.status);

        await this.$store.dispatch("Role/StoreRole", formData).then(() => {
          if (this.success_status === 201)
          {
            this.$toast.success(this.message);
            this.add_role = {};
            this.errors = {};
            this.$router.push('/system-configuration/role');
          }
        })
      }catch (e) {
        console.log(e);
      }
    }
  }
}
</script>

<template>
  <div id="create_role">
    <v-row class="mx-5 mt-5">
      <v-col cols="12">
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-card-title><h3>Add Role</h3></v-card-title>

              <v-divider></v-divider>

              <v-card-text>
                <v-form v-on:submit.prevent="addRole">

                  <v-col cols="12" class="d-flex">
                    <v-row wrap>
                      <v-col
                          cols="12"
                          sm="6"
                          lg="6"
                      >
                        <v-text-field
                            type="text"
                            v-model="add_role.code"
                            label="Enter Code"
                            persistent-hint
                            outlined
                        ></v-text-field>
                        <p v-if="errors?.code" class="red--text custom_error">
                          {{ errors?.code[0] }}
                        </p>
                      </v-col>

                      <v-col cols="12" sm="6" lg="6">
                        <v-text-field
                            type="text"
                            v-model="add_role.name_bn"
                            label="Enter Role Name (BN)"
                            persistent-hint
                            outlined
                        ></v-text-field>
                        <p v-if="errors?.name_bn" class="red--text custom_error">
                          {{ errors?.name_bn[0] }}
                        </p>
                      </v-col>
                    </v-row>
                  </v-col>

                  <v-col cols="12" class="d-flex">
                    <v-row wrap>
                      <v-col
                          cols="12"
                          sm="6"
                          lg="6"
                      >
                        <v-text-field
                            type="text"
                            v-model="add_role.name_en"
                            label="Enter Role Name (EN)"
                            persistent-hint
                            outlined
                        ></v-text-field>
                        <p v-if="errors?.name_en" class="red--text custom_error">
                          {{ errors?.name_en[0] }}
                        </p>
                      </v-col>

                      <v-col cols="12" sm="6" lg="6">
                        <v-text-field
                            type="text"
                            v-model="add_role.comment"
                            label="Enter Remark"
                            persistent-hint
                            outlined
                        ></v-text-field>
                        <p v-if="errors?.comment" class="red--text custom_error">
                          {{ errors?.comment[0] }}
                        </p>
                      </v-col>
                    </v-row>
                  </v-col>

                  <v-col cols="12" class="d-flex">
                    <v-row wrap>
                      <v-col
                          cols="12"
                          sm="6"
                          lg="6"
                      >
                        <v-checkbox
                            v-model="add_role.status"
                            color="primary"
                            label="Is Active ?"
                            hide-details
                        ></v-checkbox>
                        <p v-if="errors?.status" class="red--text custom_error">
                          {{ errors?.status[0] }}
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
                        to="/system-configuration/role"
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

<style scoped>

</style>