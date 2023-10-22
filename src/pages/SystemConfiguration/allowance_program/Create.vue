<script>
import {
  extend,
  ValidationProvider,
  ValidationObserver
} from "vee-validate";
import {mapActions, mapState} from "vuex";
export default {
  name: "Create",
  title: "CTM - Create Allowance Program",
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
      is_age_limit: false,
      is_disable_class: false,

      marital_items: [{name: "Married"}, {name: "UnMarried"}, {name: "Widow"}],
      payment_cycle_items: [{name: "Monthly"}, {name: "Quarterly"}, {name: "Half Yearly"}, {name: "Yearly"}],

      index: 0,
      divs: [
      
      ],
    }
  },

  computed: {
    ...mapState({
        additionalFields: (state) => state.Allowance.additionalFields,
        genders: (state) => state.Allowance.genders,
        genderTypes: (state) => state.Allowance.genderTypes,
        message: (state) => state.Allowance.success_message,
        success_status: (state) => state.Allowance.success_status,
        errors: (state) => state.Allowance.errors,
        error_status: (state) => state.Allowance.error_status
    })
  },

  mounted() {
    this.GetAllAdditionalField();
    this.GerAllLookUpGender();
    this.GerAllLookUpGenderType();
  },

  methods: {
    ...mapActions({
      GetAllAdditionalField: "Allowance/GetAllAdditionalField",
      GerAllLookUpGender: "Allowance/GerAllLookUpGender",
      GerAllLookUpGenderType: "Allowance/GerAllLookUpGenderType"
    }),

    maritalStatus(){
      this.is_marital_toggle = !this.is_marital_toggle;
    },

    ageLimit(){
      this.is_age_limit = !this.is_age_limit;

      this.add_allowance_program.allowance_age = [];

      this.add_allowance_program.gender.forEach(item => {
        let age_limit = {
          gender_id: item,
          min_age: '',
          max_age: '',
          amount: ''
        };

        this.add_allowance_program.allowance_age.push(age_limit);
      })
    },

    removeGender(event){
      this.add_allowance_program.allowance_age = [];

      event.forEach(item => {
        let age_limit = {
          gender_id: item,
          min_age: '',
          max_age: '',
          amount: ''
        };

        this.add_allowance_program.allowance_age.push(age_limit);
      })

    },

    allowanceAmount(){
      this.is_disable_class = !this.is_disable_class
      let data = {
        id: '',
        name: '',
        type_id: '',
        amount: '',
      };
      this.divs = [];
      this.divs.push(data)
    },

    addRow() {
      this.divs.push({
        id: this.index,
        name: 'div' + this.index,
        type_id: '',
        amount: '',
      });
      this.index++;
    },

    deletedRow(id) {
      this.divs = this.divs.filter(d => d.id !== id);
    },

    addAllowanceProgram: async function(){
      try {
        let formData = new FormData();

        formData.append('name_en', this.add_allowance_program.name_en);
        formData.append('name_bn', this.add_allowance_program.name_bn);
        formData.append('payment_cycle', this.add_allowance_program.payment_cycle);
        formData.append('is_marital', this.add_allowance_program.is_marital);
        formData.append('marital_status', this.add_allowance_program.marital_status);
        formData.append('is_active', this.add_allowance_program.is_active);
        formData.append('is_age_limit', this.add_allowance_program.is_age_limit);
        formData.append('is_disable_class', this.add_allowance_program.is_disable_class);

        formData.append('age_limit', JSON.stringify(this.add_allowance_program.allowance_age));
        formData.append('amount', JSON.stringify(this.divs));

        this.add_allowance_program.add_field_id.forEach((item) => formData.append("add_field_id[]", item));

        await this.$store.dispatch("Allowance/StoreAllowanceProgram", formData).then(() => {
          if (this.success_status === 201)
          {
            this.$toast.success(this.message);
            this.add_allowance_program = {};
            this.add_allowance_program.allowance_age = [];
            this.add_allowance_program.gender = [];
            this.is_marital_toggle = false;
            this.is_age_limit = false;
            this.is_amount = false;
            this.divs = [];
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
    }
  }
}
</script>

<template>
  <div id="add_allowance_program">
    <v-row class="mx-5 mt-5">
      <v-col cols="12">
        <ValidationObserver ref="form" v-slot="{ invalid }">
          <v-form v-on:submit.prevent="addAllowanceProgram">
            <v-row wrap>
              <v-col cols="12">
                <v-card>
                  <v-row>
                    <v-col col="6">
                      <v-card-title><h3>Allowance Program Create</h3></v-card-title>
                    </v-col>
                  </v-row>

                  <v-divider></v-divider>

                  <v-card-text>
                    <v-col cols="12" class="d-flex">
                      <v-row wrap>
                        <v-col cols="12" sm="6" lg="6">
                          <ValidationProvider name="name_en" vid="name_en" rules="required" v-slot="{ errors }">
                            <v-text-field
                                v-model="add_allowance_program.name_en"
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
                              v-model="add_allowance_program.name_bn"
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
                                v-model="add_allowance_program.gender"
                                :items="genders"
                                item-text="value_en"
                                item-value="id"
                                chips
                                label="Select Gender"
                                multiple
                                outlined
                                @change="removeGender($event)"
                            ></v-select>
                          </ValidationProvider>
                        </v-col>

                        <v-col cols="12" sm="6" lg="6">
                          <ValidationProvider name="payment_cycle" vid="payment_cycle" rules="required" v-slot="{ errors }">
                            <v-select
                                v-model="add_allowance_program.payment_cycle"
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
                              <v-checkbox v-model="add_allowance_program.is_marital" label="Marital Status" @click="maritalStatus"></v-checkbox>
                            </v-col>
                            <v-col cols="12" sm="8" lg="8" v-if="is_marital_toggle === true">
                              <v-select v-model="add_allowance_program.marital_status" :items="marital_items" item-text="name" item-value="name" label="Please Select" outlined></v-select>
                            </v-col>
                          </v-row>
                        </v-col>

                        <v-col cols="12" sm="6" lg="6">
                          <v-checkbox v-model="add_allowance_program.is_active" label="Is Active"></v-checkbox>
                        </v-col>
                      </v-row>
                    </v-col>

                    <v-col cols="12" class="d-flex">
                      <v-row wrap>
                        <v-col cols="12" sm="6" lg="6">
                          <v-checkbox label="Age Limit" @click="ageLimit"></v-checkbox>

                          <table v-if="is_age_limit === true">
                            <thead>
                              <tr>
                                <td>Gender</td>
                                <td>Min Age</td>
                                <td>Max Age</td>
                                <td>Amount</td>
                              </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(g,index) in add_allowance_program.allowance_age" :key="index">
                              <td>
                                <v-select v-model="g.gender_id" :items="genders" item-text="value_en" item-value="id" dense outlined></v-select>
                              </td>
                              <td><v-text-field v-model="g.min_age" dense outlined></v-text-field></td>
                              <td><v-text-field v-model="g.max_age"  dense outlined></v-text-field></td>
                              <td><v-text-field v-model="g.amount"  dense outlined></v-text-field></td>
                            </tr>
                            </tbody>
                          </table>
                        </v-col>

                        <v-col cols="12" sm="6" lg="6">
                          <v-checkbox label="Disable Class" @click="allowanceAmount"></v-checkbox>

                          <table v-if="is_disable_class === true">
                            <thead>
                            <tr>
                              <td>Type</td>
                              <td>Amount</td>
                              <td>Add/Remove</td>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="div in divs" :key="div.id">
                              <td><v-select v-model="div.type_id" :items="genderTypes" item-value="id" item-text="value_en" label="Please Select" dense outlined></v-select></td>
                              <td><v-text-field v-model="div.amount" dense outlined></v-text-field></td>
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
                                    @click="deletedRow(div.id)"
                                    v-show="divs.length > 1"
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
                        <v-col cols="12" sm="4" lg="4" v-for="field in additionalFields" :key="field.id">
                          <ValidationProvider name="add_field_id" vid="add_field_id" rules="required" v-slot="{ errors }">
                            <v-checkbox
                                v-model="add_allowance_program.add_field_id"
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