<script>
import { extend, ValidationProvider, ValidationObserver } from "vee-validate";
import { mapActions, mapState } from "vuex";

extend("checkName", {
  validate: (value) => {
    if (!value && value !== 0) {
      return false;
    }

    // Update the regular expression to accept English letters, spaces, and commas
    return /^[a-zA-Z\s,]+$/.test(value);
  },
  message: "Please enter English letters, spaces, or commas in this field",
});
extend("checkNameBn", {
  validate: (value) => {
    if (!value && value !== 0) {
      return false;
    }

    // Update the regular expression to accept Bangla letters, spaces, and commas
    var banglaRegex = /^[\u0980-\u09E5\u09F0-\u09FF\s,]+$/;

    return banglaRegex.test(value);
  },
  message: "Please enter Bangla letters, spaces, or commas in this field",
});


export default {
  name: "Create",
  title: "CTM - Create Allowance Program",
  components: {
    ValidationProvider,
    ValidationObserver,
  },

  data() {
    return {
      add_allowance_program: {
        name_en: "",
        name_bn: "",
        gender: [],
        payment_cycle: "",
        marital_status: "",
        is_active: "",
        add_field_id: [],
        allowance_age: [],
      },
      activeSection:null,
      selectedSection: null,
      amount_error_note: null,
      is_marital_toggle: false,
      is_age_limit: false,
      is_disable_class: false,

      marital_items: [
        { name: "Married" },
        { name: "UnMarried" },
        { name: "Widow" },
        { name: "Single" },
        { name: "None" },
        { name: "Other" },
      ],
      payment_cycle_items: [
        { name: "Monthly" },
        { name: "Quarterly" },
        { name: "Half Yearly" },
        { name: "Yearly" },
      ],

      index: 0,
      divs: [],
      number: 0,
      numberRule: (val) => {
        if (val < 0) return "Please enter a positive number";
        return true;
      },
    };
  },

  watch: {
    "$i18n.locale": "updateHeaderTitle",
  },

  computed: {
    ...mapState({
      additionalFields: (state) => state.Allowance.additionalFields,
      genders: (state) => state.Allowance.genders,
      genderTypes: (state) => state.Allowance.genderTypes,
      message: (state) => state.Allowance.success_message,
      success_status: (state) => state.Allowance.success_status,
      errors: (state) => state.Allowance.errors,
      error_status: (state) => state.Allowance.error_status,
    }),
    language: {
      get() {
        return this.$store.getters.getAppLanguage;
      },
    },

    minValueRules() {
      return [
        (v) => !!v || "Minimum value is required",
        (v) => /^\d+$/.test(v) || "Minimum Age must be a number",
        (v) => (v >= 5 && v <= 115) || "Age must be between 5 and 115",
        (v) => {
          const invalidValue = this.add_allowance_program.allowance_age.some(
            (item) => parseInt(v) > parseInt(item.max_age)
          );
          return invalidValue
            ? "Minimum age cannot be greater than the maximum value"
            : true;
        },
        (v) => {
          const invalidValues = this.add_allowance_program.allowance_age.some(
            (item) => parseInt(v) === parseInt(item.max_age)
          );
          return invalidValues
            ? "Minimum age cannot be equal to maximum age"
            : true;
        },
      ];
    },

    maxValueRules() {
      return [
        (v) => !!v || "Maximum value is required",
        (v) => /^\d+$/.test(v) || "Maximum Age must be a number",
        (v) => (v >= 5 ) || "Age  must be greater than 5",
        (v) => {
          const invalidValue = this.add_allowance_program.allowance_age.some(
            (item) => parseInt(v) < parseInt(item.min_age)
          );
          return invalidValue
            ? "Maximum age cannot be less than the minimum value"
            : true;
        },
        (v) => {
          const invalidValues = this.add_allowance_program.allowance_age.some(
            (item) => parseInt(v) === parseInt(item.min_age)
          );
          return invalidValues
            ? "Maximum age cannot be equal to minimum age"
            : true;
        },
      ];
    },
  },

  mounted() {
    // this.GetAllAdditionalField();
    this.GerAllLookUpGender();
    this.GerAllLookUpGenderType();
    this.updateHeaderTitle();
  },

  methods: {
    ...mapActions({
      // GetAllAdditionalField: "Allowance/GetAllAdditionalField",
      GerAllLookUpGender: "Allowance/GerAllLookUpGender",
      GerAllLookUpGenderType: "Allowance/GerAllLookUpGenderType",
    }),
      toggleSection(section) {
      this.selectedSection = section;
      this.activeSection = this.activeSection === section ? null : section;
      if (this.selectedSection=="age_limit"){
        this.ageLimit();

      }
      if (this.selectedSection == "disable_class") {
        console.log('disable_class');
        this.allowanceAmount();

      }
    },

    maritalStatus() {
      this.is_marital_toggle = !this.is_marital_toggle;
    },

    ageLimit( ) {
    
      this.is_age_limit = !this.is_age_limit;

      if (this.is_disable_class === false) {
        this.add_allowance_program.allowance_age = [];

        this.add_allowance_program.gender.forEach((item) => {
          let age_limit = {
            gender_id: item,
            min_age: "",
            max_age: "",
            amount: "",
          };

          this.add_allowance_program.allowance_age.push(age_limit);
        });

        this.amount_error_note = null;
      }
    },

    removeGender(event) {
      this.add_allowance_program.allowance_age = [];

      event.forEach((item) => {
        let age_limit = {
          gender_id: item,
          min_age: "",
          max_age: "",
          amount: "",
        };

        this.add_allowance_program.allowance_age.push(age_limit);
      });
    },

    allowanceAmount() {
      this.is_disable_class = !this.is_disable_class;

      this.add_allowance_program.allowance_age.forEach((item) => {
        return (item.amount = "");
      });

      this.divs = [];
      if (this.is_disable_class === true) {
        let disable_class = {
          id: "",
          name: "",
          type_id: "",
          amount: "",
        };

        this.divs.push(disable_class);
        this.amount_error_note = null;
      }
    },

    addRow() {
      this.divs.push({
        id: this.index,
        name: "div" + this.index,
        type_id: "",
        amount: "",
      });
      this.index++;
    },

    deletedRow(id) {
      this.divs = this.divs.filter((d) => d.id !== id);
    },

    getValidationRules(fieldName) {
      return {
        required: () => {
          return (
            this.is_age_limit ||
            this.is_disable_class ||
            `At least one of ${fieldName} is required`
          );
        },
      };
    },
    addAllowanceProgram: async function () {

      // if(this.is_disable_class === false && this.is_age_limit == false){

      //   this.amount_error_note = "Atleast one type of amount is required";
      //   this.$toast.error(this.amount_error_note);

      //   return;
      // }
      try {
        let formData = new FormData();

        formData.append("name_en", this.add_allowance_program.name_en);
        formData.append("name_bn", this.add_allowance_program.name_bn);
        formData.append(
          "payment_cycle",
          this.add_allowance_program.payment_cycle
        );
        if (this.is_marital_toggle != false) {
          formData.append("is_marital", this.is_marital_toggle);
          formData.append(
            "marital_status",
            this.add_allowance_program.marital_status
          );
        }
        if (this.is_disable_class === false) {
          formData.append("is_disable_class", 0);
        } else {
          formData.append("is_disable_class", 1);
        }

        if (this.is_age_limit != false) {
          formData.append("is_age_limit", this.is_age_limit);

          console.log("here");

          if (this.add_allowance_program.allowance_age !== null) {
            console.log("here1");
            this.add_allowance_program.allowance_age.forEach((item, index) => {
              let age_limit = {
                gender_id: item.gender_id,
                min_age: item.min_age,
                max_age: item.max_age,
                amount: item.amount,
              };
              formData.append(
                `age_limit[\`${index}\`]['gender_id']`,
                item.gender_id
              );
              formData.append(
                `age_limit[\`${index}\`]['min_age']`,
                item.min_age
              );
              formData.append(
                `age_limit[\`${index}\`]['max_age']`,
                item.max_age
              );
              formData.append(`age_limit[\`${index}\`]['amount']`, item.amount);
            });
          }
        }

        if (this.divs !== null) {
          formData.append("amount", JSON.stringify(this.divs));
        }

        for (const [key, value] of formData.entries()) {
          if (value !== null) {
            // fd.append(key, value);
            console.log("------");
            console.log(key, value);
            console.log("------");
          }
        }

        console.log(this.is_age_limit, "this.is_age_limit");
        console.log(this.is_marital_toggle, "this.is_marital_toggle");
        // return;
        this.add_allowance_program.add_field_id.forEach((item) =>
          formData.append("add_field_id[]", item)
        );

        await this.$store
          .dispatch("Allowance/StoreAllowanceProgram", formData)
          .then(() => {
            if (this.success_status === 201) {
              this.add_allowance_program = {};
              this.add_allowance_program.allowance_age = [];
              this.add_allowance_program.gender = [];
              this.is_marital_toggle = false;
              this.is_age_limit = false;
              this.divs = [];
              this.$refs.form.reset();

              this.$router.push("/system-configuration/allowance-program");

              this.$toast.success(this.message);
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
      const title = this.$t("container.system_config.allowance_program.add");
      this.$store.commit("setHeaderTitle", title);
    },
  },
};
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
                      <v-card-title></v-card-title>
                      <h3>
                        {{
                        $t("container.system_config.allowance_program.add")
                        }}
                      </h3>
                      </v-card-title>
                    </v-col>
                  </v-row>

                  <v-divider></v-divider>

                  <v-card-text>
                    <v-col cols="12" class="d-flex">
                      <v-row wrap>
                        <v-col cols="12" sm="6" lg="6">
                          <ValidationProvider name="name english" vid="name_en" rules="required|checkName"
                            v-slot="{ errors }">
                            <v-text-field v-model="add_allowance_program.name_en" :label="
                                $t(
                                  'container.system_config.allowance_program.name_en'
                                )
                              " menu-props="auto" persistent-hint outlined :error="errors[0] ? true : false"
                              :error-messages="errors[0] ? (language == 'bn' ? 'অনুগ্রহ পূর্বক গ্রহণযোগ্য ভাতা কার্যক্রমের নাম  ইংরেজিতে প্রদান করুন '
          : 'Please enter  valid Program Name in English') : ''" required></v-text-field>
                          </ValidationProvider>
                        </v-col>

                        <v-col cols=" 12" sm="6" lg="6">
                          <ValidationProvider name="name bangla" vid="name_bn" rules="required|checkNameBn"
                            v-slot="{ errors }">
                            <v-text-field v-model="add_allowance_program.name_bn" :label="
                                $t(
                                  'container.system_config.allowance_program.name_bn'
                                )
                              " menu-props="auto" persistent-hint outlined :error="errors[0] ? true : false"
                              :error-messages="errors[0] ? (language == 'bn' ? 'অনুগ্রহ পূর্বক গ্রহণযোগ্য ভাতা কার্যক্রমের নাম  বাংলায় প্রদান করুন '
          : 'Please enter  valid Program Name in Bangla') : ''" required></v-text-field>
                          </ValidationProvider>
                        </v-col>
                      </v-row>
                    </v-col>
                    <!-- emu -->

                    <!-- <v-col cols="12" class="d-flex">
                      <v-row wrap>
                        <v-col cols="12" sm="6" lg="6">
                          <ValidationProvider
                            name="gender"
                            vid="gender"
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <v-select
                              v-model="add_allowance_program.gender"
                              :items="genders"
                              item-text="value_en"
                              item-value="id"
                              chips
                              :label="
                                $t(
                                  'container.system_config.allowance_program.gender'
                                )
                              "
                              multiple
                              outlined
                              @change="removeGender($event)"
                              :error="errors[0] ? true : false"
                              :error-messages="errors[0]"
                              required
                            ></v-select>
                          </ValidationProvider>
                        </v-col>

                        <v-col cols="12" sm="6" lg="6">
                          <ValidationProvider
                            name="payment cycle"
                            vid="payment_cycle"
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <v-select
                              v-model="add_allowance_program.payment_cycle"
                              :items="payment_cycle_items"
                              item-text="name"
                              item-value="name"
                              chips
                              :label="
                                $t(
                                  'container.system_config.allowance_program.payment_cycle'
                                )
                              "
                              outlined
                              :error="errors[0] ? true : false"
                              :error-messages="errors[0]"
                              required
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
                            
                                <v-checkbox
                                  v-model="
                                    add_allowance_program.is_marital_toggle
                                  "
                                  :label="
                                    $t(
                                      'container.system_config.allowance_program.is_marital_toggle'
                                    )
                                  "
                                  @click="maritalStatus"
                                  >
                               
                                </v-checkbox>
                             
                            </v-col>
                            <v-col
                              cols="12"
                              sm="8"
                              lg="8"
                              v-if="is_marital_toggle === true"
                            >
                              <ValidationProvider
                                name="marital status"
                                vid="marital_status"
                                rules="required"
                                v-slot="{ errors }"
                              >
                                <v-select
                                  v-model="add_allowance_program.marital_status"
                                  :items="marital_items"
                                  item-text="name"
                                  item-value="name"
                                  :label="
                                    $t(
                                      'container.system_config.allowance_program.marital_status'
                                    )
                                  "
                                  outlined
                                  :error="errors[0] ? true : false"
                                  :error-messages="errors[0]"
                                  required
                                >
                                </v-select>
                              </ValidationProvider>
                            </v-col>
                          </v-row>
                        </v-col>

                        <v-col cols="12" sm="6" lg="6"> </v-col>
                      </v-row>
                    </v-col> -->


                    <!-- emu 2 -->
                    <!-- <v-col cols="12" class="d-flex">

                      <v-row wrap>
                        <v-col cols="12" sm="6" lg="6">
                          <v-checkbox
                          :disabled="activeSection === 'disable_class'"
                            :label="
                              $t(
                                'container.system_config.allowance_program.age_limit_amount'
                              )
                            "
                            :rules="getValidationRules('is_age_limit')"
                       
                             @click="toggleSection('age_limit')"
                          ></v-checkbox>
                               <!-- @click="ageLimit" -->

                    <!-- <table v-if="selectedSection === 'age_limit' && is_age_limit === true">
                            <thead>
                              <tr v-show="add_allowance_program.gender.length">
                                <td>Gender</td>
                                <td>Min Age</td>
                                <td>Max Age</td>
                                <td>
                                  <span v-if="is_disable_class === false">
                                    Amount
                                  </span>
                                </td>
                              </tr>
                            </thead>
                            <tbody >
                              <tr
                                v-show="add_allowance_program.gender.length"
                                v-for="(
                                  g, index
                                ) in add_allowance_program.allowance_age"
                                :key="index"
                              >
                                <td>
                                  <ValidationProvider
                                    name="gender"
                                    vid="gender_id"
                                    rules="required"
                                    v-slot="{ errors }"
                                  >
                                    <v-select
                                      v-model="g.gender_id"
                                      :items="genders"
                                      item-text="value_en"
                                      item-value="id"
                                      dense
                                      outlined
                                      :error="errors[0] ? true : false"
                                      :error-messages="errors[0]"
                                      required
                                      readonly
                                    ></v-select>
                                  </ValidationProvider>
                                </td>
                                <td>
                                  <ValidationProvider
                                    name="min age"
                                    vid="min_age"
                                    rules="required"
                                    v-slot="{ errors }"
                                  >
                                    <v-text-field
                                      v-model="g.min_age"
                                      type="number"
                                      step="any"
                                      min="0"
                                      dense
                                      outlined
                                      :error="errors[0] ? true : false"
                                      :error-messages="errors[0]"
                                      required
                                      :rules="minValueRules"
                                      @keyup="minValueRules"
                                      style="height: 64px"
                                    >
                                    </v-text-field>
                                  </ValidationProvider>
                                </td>
                                <td>
                                  <ValidationProvider
                                    name="max age"
                                    vid="max_age"
                                    rules="required"
                                    v-slot="{ errors }"
                                  >
                                    <v-text-field
                                      v-model="g.max_age"
                                      type="number"
                                      step="any"
                                      min="0"
                                      dense
                                      outlined
                                      :error="errors[0] ? true : false"
                                      :error-messages="errors[0]"
                                      required
                                      :rules="maxValueRules"
                                      @keyup="maxValueRules"
                                      style="height: 64px"
                                    >
                                    </v-text-field>
                                  </ValidationProvider>
                                </td>
                                <td>
                                  <div v-if="is_disable_class === false">
                                    <ValidationProvider
                                      name="amount"
                                      vid="amount"
                                      rules="required"
                                      v-slot="{ errors }"
                                    >
                                      <v-text-field
                                        v-model="g.amount"
                                        type="number"
                                        step="any"
                                        min="0"
                                        ref="input"
                                        :rules="[numberRule]"
                                        dense
                                        outlined
                                        :error="errors[0] ? true : false"
                                        :error-messages="errors[0]"
                                        required
                                        style="height: 64px"
                                      ></v-text-field>
                                    </ValidationProvider>
                                  </div>
                                </td>
                              </tr>

                              <tr v-show="!add_allowance_program.gender.length">
                                <h5>Please Select Gender</h5>
                              </tr>
                            </tbody>
                          </table>
                        </v-col>

                        <v-col cols="12" sm="6" lg="6">
                          <v-checkbox
                            :label="
                              $t(
                                'container.system_config.allowance_program.class_wise_amount'
                              )
                            "
                            :rules="getValidationRules('is_disable_class')"
                              @click="toggleSection('disable_class')"
                              :disabled="activeSection === 'age_limit'"
                        
                          ></v-checkbox> -->
                    <!-- @click="allowanceAmount" -->

                    <!-- <table v-if="selectedSection === 'disable_class' && is_disable_class === true">
                            <thead>
                              <tr>
                                <td>Type</td>
                                <td>Amount</td>
                                <td>Add/Remove</td>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="div in divs" :key="div.id">
                                <td>
                                  <v-select
                                    v-model="div.type_id"
                                    :items="genderTypes"
                                    item-value="id"
                                    item-text="value_en"
                                    label="Please Select"
                                    dense
                                    outlined
                                  ></v-select>
                                </td>
                                <td>
                                  <v-text-field
                                    v-model="div.amount"
                                    type="number"
                                    step="any"
                                    min="0"
                                    ref="input"
                                    :rules="[numberRule]"
                                    dense
                                    outlined
                                    style="height: 64px"
                                  ></v-text-field>
                                </td>
                                <td
                                  style="
                                    display: flex;
                                    align-items: center;
                                    justify-content: space-between;
                                  "
                                >
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

                    <v-col cols="12" sm="12" lg="12"> 
                      <div v-if="amount_error_note" v-html="amount_error_note" style="color: red;"/>

                    </v-col>  -->


                    <!-- emu end -->

                    <v-col cols="12">
                      <v-row class="justify-end mb-5 mt-2" style="margin-top: -50px">
                        <v-btn flat color="primary" class="custom-btn mr-2" router
                          to="/system-configuration/allowance-program">{{ $t("container.list.back") }}
                        </v-btn>
                        <v-btn flat color="success" type="submit" class="custom-btn mr-2" :disabled="invalid">{{
                          $t("container.list.submit") }}
                        </v-btn>
                      </v-row>
                    </v-col>

                  </v-card-text>
                </v-card>
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
  margin-top: 0px !important;
  margin-left: 10px;
  margin-bottom: 25px !important;
}
</style>