<script>
import {mapActions, mapState} from "vuex";

import {
  extend,
  ValidationProvider,
  ValidationObserver
} from "vee-validate";

export default {
  name: "Edit",
  title: "CTM - Edit Allowance Program",
  components: {
    ValidationProvider,
    ValidationObserver,
  },

  data(){
    return{
      add_allowance_program: {
        name_en: '',
        name_bn: '',
        gender: [],
        payment_cycle: '',
        is_marital: '',
        marital_status: '',
        is_active: '',
        add_field_id: [],
        allowance_age: [],
      },

      is_marital_toggle: false,
      age_limit: false,
      amount_limit: false,

      gender_items: [{id:1, name: "Male"}, {id:2, name: "Female"}, {id:3, name: "Other"}],
      marital_items: [{name: "Married"}, {name: "UnMarried"}, {name: "Widow"}],
      payment_cycle_items: [{name: "Monthly"}, {name: "Quarterly"}, {name: "Half Yearly"}, {name: "Yearly"}],

      index: 0
    }
  },

  computed: {
    ...mapState({
      additionalFields: (state) => state.Allowance.additionalFields,
      editAllowanceProgram: (state) => state.Allowance.allowancePrograme,
      editAllowanceGender: (state) => state.Allowance.allowanceGender,
      editAllowanceField: (state) => state.Allowance.allowanceField,
      editAllowanceAge: (state) => state.Allowance.allowanceAge,
      editAllowanceAmount: (state) => state.Allowance.allowanceAmount,
      message: (state) => state.Allowance.success_message,
      success_status: (state) => state.Allowance.success_status,
      errors: (state) => state.Allowance.errors,
      error_status: (state) => state.Allowance.error_status
    }),

    allowance_field_data: {
      get(){
        return this.editAllowanceField
      },
      set(value){
        this.$store.commit('Allowance/updateValue', value)
      }
    }
  },

  mounted() {
    this.GetAllAdditionalField();
    this.GetEditAllowanceProgram(this.$route.params.id);
  },

  methods: {
    ...mapActions({
      GetAllAdditionalField: "Allowance/GetAllAdditionalField",
      GetEditAllowanceProgram: "Allowance/GetEditAllowanceProgram"
    }),

    maritalStatus(marital){
      if (marital === true)
      {
        this.is_marital_toggle = true;
      }else {
        this.is_marital_toggle = false;
      }
    },

    ageLimit(age){
      if (age === true)
      {
        this.age_limit = true;
      }else {
        this.age_limit = false;
      }
    },

    allowanceAmount(amount){
      if (amount === true)
      {
        this.amount_limit = true;
      }else {
        this.amount_limit = false;
      }

      console.log(this.editAllowanceAmount);
    },

    addRow() {
      this.editAllowanceAmount.push({
        id: this.index,
        type_id: '',
        amount: '',
      });
      this.index++;
    },

    deletedRow(index) {
      this.editAllowanceAmount.splice(index, 1);
    },

    updateAllowanceProgram: async function(){
      try {
        console.log('hello')
        let id = this.$route.params.id;

        let formData = new FormData();

        formData.append('name_en', this.editAllowanceProgram.name_en);
        formData.append('name_bn', this.editAllowanceProgram.name_bn);
        formData.append('payment_cycle', this.editAllowanceProgram.payment_cycle);
        formData.append('is_marital', this.editAllowanceProgram.is_marital);
        formData.append('marital_status', this.editAllowanceProgram.marital_status);
        formData.append('is_active', this.editAllowanceProgram.is_active);
        formData.append('is_age_limit', this.editAllowanceProgram.is_age_limit);
        formData.append('is_amount', this.editAllowanceProgram.is_amount);

        formData.append("gender", JSON.stringify(this.editAllowanceGender));
        formData.append('age_limit', JSON.stringify(this.editAllowanceAge));
        formData.append('amount', JSON.stringify(this.editAllowanceAmount));

        this.allowance_field_data.forEach((item) => formData.append("add_field_id[]", item));


        formData.append('_method', 'PUT');

        await this.$store.dispatch("Allowance/UpdateAllowanceProgram", {id:id, data:formData}).then(() => {
          if (this.success_status === 200)
          {
            this.$toast.success(this.message);
            this.$refs.form.reset();
            this.$router.push('/system-configuration/allowance-program')
          }

          if (this.error_status === 422)
          {
            this.$refs.form.setErrors(this.errors);
          }else{
            this.$refs.form.setErrors();
          }
        })
      }catch (e) {
        console.log(e);
      }
    },
  }
}
</script>

<template>
  <div id="edit_allowance_program">
    <v-row class="mx-5 mt-5">
      <v-col cols="12">
        <ValidationObserver ref="form" v-slot="{ invalid }">
          <v-form v-on:submit.prevent="updateAllowanceProgram">
            <v-row wrap>
              <v-col cols="12">
                <v-card>
                  <v-row>
                    <v-col col="6">
                      <v-card-title><h3>Allowance Program Edit</h3></v-card-title>
                    </v-col>
                  </v-row>

                  <v-divider></v-divider>

                  <v-card-text>
                    <v-col cols="12" class="d-flex">
                      <v-row wrap>
                        <v-col cols="12" sm="6" lg="6">
                          <ValidationProvider name="name_en" vid="name_en" rules="required" v-slot="{ errors }">
                            <v-text-field
                                v-model="editAllowanceProgram.name_en"
                                label="Program Name EN"
                                menu-props="auto"
                                persistent-hint
                                outlined
                            ></v-text-field>
                          </ValidationProvider>
                        </v-col>

                        <v-col cols="12" sm="6" lg="6">
                          <ValidationProvider name="name_bn" vid="name_bn" rules="required" v-slot="{ errors }">
                            <v-text-field
                                v-model="editAllowanceProgram.name_bn"
                                label="Program Name BN"
                                menu-props="auto"
                                persistent-hint
                                outlined
                            ></v-text-field>
                          </ValidationProvider>
                        </v-col>
                      </v-row>
                    </v-col>

                    <v-col cols="12" class="d-flex">
                      <v-row wrap>
                        <v-col cols="12" sm="6" lg="6">
                          <ValidationProvider name="gender" vid="gender" rules="required" v-slot="{ errors }">
                            <v-select
                                v-model="editAllowanceGender"
                                :items="gender_items"
                                item-text="name"
                                item-value="id"
                                chips
                                label="Select Gender"
                                multiple
                                outlined
                            ></v-select>
                          </ValidationProvider>
                        </v-col>

                        <v-col cols="12" sm="6" lg="6">
                          <ValidationProvider name="payment_cycle" vid="payment_cycle" rules="required" v-slot="{ errors }">
                            <v-select
                                v-model="editAllowanceProgram.payment_cycle"
                                :items="payment_cycle_items"
                                item-text="name"
                                item-value="name"
                                chips
                                label="Select Payment Cycle"
                                outlined
                            ></v-select>
                          </ValidationProvider>
                        </v-col>
                      </v-row>
                    </v-col>

                    <v-col cols="12" class="d-flex">
                      <v-row wrap>
                        <v-col cols="12" sm="6" lg="6">
                          <v-row wrap>
                            <v-col cols="4" sm="3" lg="3">
                              <v-checkbox v-model="editAllowanceProgram.is_marital" label="Marital Status" @click="maritalStatus(editAllowanceProgram.is_marital)"></v-checkbox>
                            </v-col>
                            <v-col cols="12" sm="8" lg="8" v-if="editAllowanceProgram.is_marital === 1 || is_marital_toggle === true">
                              <v-select v-model="editAllowanceProgram.marital_status" :items="marital_items" item-text="name" item-value="name" label="Please Select" outlined></v-select>
                            </v-col>
                          </v-row>
                        </v-col>

                        <v-col cols="12" sm="6" lg="6">
                          <v-checkbox v-model="editAllowanceProgram.is_active" label="Is Active"></v-checkbox>
                        </v-col>
                      </v-row>
                    </v-col>

                    <v-col cols="12" class="d-flex">
                      <v-row wrap>
                        <v-col cols="12" sm="6" lg="6">
                          <v-checkbox v-model="editAllowanceProgram.is_age_limit" label="Age Limit" @click="ageLimit(editAllowanceProgram.is_age_limit)"></v-checkbox>

                          <table v-if="editAllowanceProgram.is_age_limit === 1 || age_limit === true">
                            <thead>
                            <tr>
                              <td>Gender</td>
                              <td>Min Age</td>
                              <td>Max Age</td>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(g,index) in editAllowanceAge" :key="index">
                              <td>
                                <v-select v-model="g.gender_id" :items="gender_items" item-text="name" item-value="id" dense outlined></v-select>
                              </td>
                              <td><v-text-field v-model="g.min_age" dense outlined></v-text-field></td>
                              <td><v-text-field v-model="g.max_age"  dense outlined></v-text-field></td>
                            </tr>
                            </tbody>
                          </table>
                        </v-col>

                        <v-col cols="12" sm="6" lg="6">
                          <v-checkbox v-model="editAllowanceProgram.is_amount" label="Amount" @click="allowanceAmount(editAllowanceProgram.is_amount)"></v-checkbox>

                          <table v-if="editAllowanceProgram.is_amount === 1 || amount_limit === true">
                            <thead>
                            <tr>
                              <td>Type</td>
                              <td>Amount</td>
                              <td>Add/Remove</td>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(aa, index) in editAllowanceAmount" :key="index">
                              <td><v-select v-model="aa.type_id" :items="gender_items" item-value="id" item-text="name" label="Please Select" dense outlined></v-select></td>
                              <td><v-text-field v-model="aa.amount" dense outlined></v-text-field></td>
                              <td>
                                <v-btn
                                    fab
                                    dark
                                    x-small
                                    color="primary"
                                    @click="addRow()"
                                >
                                  <v-icon>mdi-plus</v-icon>
                                </v-btn>

                                <v-btn
                                    fab
                                    dark
                                    x-small
                                    color="red"
                                    @click="deletedRow(index)"
                                    v-show="editAllowanceAmount.length > 1"
                                >
                                  <v-icon>mdi-minus</v-icon>
                                </v-btn>
                              </td>
                            </tr>
                            </tbody>
                          </table>
                        </v-col>
                      </v-row>
                    </v-col>

                  </v-card-text>
                </v-card>
              </v-col>

              <v-col cols="12">
                <v-card style="margin-bottom: 50px">
                  <v-row>
                    <v-col col="6">
                      <v-card-title><h3>Add Field</h3></v-card-title>
                    </v-col>
                  </v-row>

                  <v-divider></v-divider>

                  <v-card-text>
                    <v-col cols="12" class="d-flex">
                      <v-row wrap>
                        <v-col cols="12" sm="6" lg="6" v-for="(field, index) in additionalFields" :key="field.id">
                          <ValidationProvider name="add_field_id" vid="add_field_id" rules="required" v-slot="{ errors }">
                            <v-checkbox
                                v-model="allowance_field_data"
                                :label="field.name_en"
                                :value="field.id"
                                menu-props="auto"
                                persistent-hint
                                outlined
                            ></v-checkbox>
                          </ValidationProvider>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-card-text>
                </v-card>
              </v-col >

              <v-col cols="12">
                <v-row class="justify-end mb-5" style="margin-top: -50px">
                  <v-btn
                      flat
                      color="primary"
                      class="custom-btn mr-2"
                      router
                      to="/system-configuration/allowance-program"
                  >Back
                  </v-btn>

                  <v-btn
                      flat
                      color="success"
                      type="submit"
                      class="custom-btn mr-2"
                      :disabled="invalid"
                  >Submit
                  </v-btn>
                </v-row>
              </v-col>
            </v-row>
          </v-form>
        </ValidationObserver>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.theme--dark.v-btn.v-btn--has-bg {
  margin-top: -25px !important;
  margin-left: 10px;
}
</style>