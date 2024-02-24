<script>
import { mapActions, mapState } from "vuex";

import {
    extend,
    ValidationProvider,
    ValidationObserver
} from "vee-validate";
import { http } from "@/hooks/httpService";

export default {
    name: "Edit",
    title: "CTM - Edit Allowance Program",
    components: {
        ValidationProvider,
        ValidationObserver,
    },

    data() {
        return {
            dataArray: '',
            deleteDialog: false,
            delete_loading: false,

            is_marital_toggle: false,
            age_limit: false,
            disable_class: false,
            //     marital_status: ["Married", "UnMarried", "Widow",
            //     "Widower",
            //     "Husband Abondoner",
            //     "Divorced",
            //     "Spouse Separated",
            //     "Polygamy",
            //     "None"
            // ],

            marital_items: [{ name: "Married" }, { name: "UnMarried" }, { name: "Widow" }, { name: "Other" }],
            payment_cycle_items: [{ name: "Monthly" }, { name: "Quarterly" }, { name: "Half Yearly" }, { name: "Yearly" }],

            index: 0,

            divs: [],

            number: 0,
            numberRule: val => {
                if (val < 0) return 'Please enter a positive number'
                return true
            },

            isChecked: false
        }
    },

    watch: {
        '$i18n.locale': 'updateHeaderTitle',
    },

    computed: {
        ...mapState({
            additionalFields: (state) => state.Allowance.additionalFields,
            editAllowanceProgram: (state) => state.Allowance.allowancePrograme,
            editAllowanceGender: (state) => state.Allowance.allowanceGender,
            editAllowanceField: (state) => state.Allowance.allowanceField,
            editAllowanceAge: (state) => state.Allowance.allowanceAge,
            editAllowanceAmount: (state) => state.Allowance.allowanceAmount,
            genders: (state) => state.Allowance.genders,
            genderTypes: (state) => state.Allowance.genderTypes,
            message: (state) => state.Allowance.success_message,
            success_status: (state) => state.Allowance.success_status,
            errors: (state) => state.Allowance.errors,
            error_status: (state) => state.Allowance.error_status,
        }),

        minValueRules() {
            return [
                v => !!v || "Minimum value is required",
                v => /^\d+$/.test(v) || 'Minimum Age must be a number',
                v => (v >= 5 && v <= 115) || 'Age must be between 5 and 115',
                v => {
                    const invalidValue = this.updateAllowanceAge.some(item => parseInt(v) > parseInt(item.max_age));
                    return invalidValue ? 'Minimum value cannot be greater than the maximum value' : true;
                },
                v => {
                    const invalidValues = this.updateAllowanceAge.some(item => parseInt(v) === parseInt(item.max_age));
                    return invalidValues ? 'Minimum age cannot be equal to maximum age' : true;
                }
            ];
        },

        maxValueRules() {
            return [
                v => !!v || "Maximum value is required",
                v => /^\d+$/.test(v) || 'Maximum Age must be a number',
                // v => (v >= 5 && v <= 115) || 'Age must be between 5 and 115',
                v => {
                    const invalidValue = this.updateAllowanceAge.some(item => parseInt(v) < parseInt(item.min_age));
                    return invalidValue ? 'Maximum value cannot be less than the minimum value' : true;
                },
                v => {
                    const invalidValues = this.updateAllowanceAge.some(item => parseInt(v) === parseInt(item.min_age));
                    return invalidValues ? 'Maximum age cannot be equal to minimum age' : true;
                }
            ];
        },

        allowance_field_data: {
            get() {
                return this.editAllowanceField
            },
            set(value) {
                this.$store.commit('Allowance/updateValue', value)
            }
        },

        genderUpdatevalue: {
            get() {
                return this.editAllowanceGender;
            },

            set(value) {
                this.$store.commit("Allowance/updateGenderValue", value);
            }
        },

        updateAllowanceAge: {
            get() {
                return this.editAllowanceAge;
            },
            set(value) {
                return this.$store.commit("Allowance/UPDATE_ALLOWANCE_AGE", value);
            },
        },

        updateAllowanceAmount: {
            get() {
                return this.editAllowanceAmount;
            },

            set(value) {
                return this.$store.commit("Allowance/UPDATE_ALLOWANCE_AMOUNT", value);
            }
        },
    },

    mounted() {
        this.GetAllAdditionalField();
        this.GetEditAllowanceProgram(this.$route.params.id);
        this.GerAllLookUpGender();
        this.GerAllLookUpGenderType();
        this.updateHeaderTitle();
    },

    methods: {
        ...mapActions({
            GetAllAdditionalField: "Allowance/GetAllAdditionalField",
            GetEditAllowanceProgram: "Allowance/GetEditAllowanceProgram",
            GerAllLookUpGender: "Allowance/GerAllLookUpGender",
            GerAllLookUpGenderType: "Allowance/GerAllLookUpGenderType"
        }),

        maritalStatus(marital) {
            if (marital === true) {
                this.is_marital_toggle = true;
            } else {
                this.is_marital_toggle = false;
            }
        },

        ageLimit(age) {
          this.age_limit = !this.age_limit;

            if (age === true) {
              this.editAllowanceProgram.is_disable_class = false
              this.is_disable_class = false
            }
        },


      allowanceAmount(amount){
        this.is_disable_class = !this.is_disable_class

        if (amount === true) {
          this.editAllowanceProgram.is_age_limit = false
          this.age_limit = false
        }


        // this.genderUpdatevalue = []

        // this.updateAllowanceAmount = [];
        if (this.is_disable_class === true && !this.updateAllowanceAmount.length)
        {
          let disable_class = {
            id: '',
            name: '',
            type_id: '',
            amount: '',
          }

          this.updateAllowanceAmount.push(disable_class);
        }
      },


        removeGender(event) {
            console.log(event);
            var arr = [];

            for (let i = 0; i < event.length; i++) {
                if (this.updateAllowanceAge.some((item) => item.gender_id == event[i])) {
                    const index = this.updateAllowanceAge.findIndex(obj => obj.gender_id === event[i]);
                    if (index !== -1) {
                        const key = Object.keys(this.updateAllowanceAge[index]);
                        console.log(index);
                        arr.push(this.updateAllowanceAge[index]);
                    } else {
                        console.log('not found');
                        // object with gender_id property does not exist in array
                    }
                } else {
                    let age_limit = {
                        gender_id: event[i],
                        min_age: '',
                        max_age: '',
                        amount: ''
                    };
                    console.log(this.updateAllowanceAge[i], 'not got', event[i]);
                    arr.push(age_limit)
                }

            }
            this.updateAllowanceAge = []
            this.updateAllowanceAge = arr
            // if (event.length !== this.updateAllowanceAge.length)
            // {
            //   this.deleteDialog = false;
            // }else {
            //   this.deleteAlert(arr);
            // }
        },

        deleteAlert(arr) {
            this.deleteDialog = true;
            this.dataArray = arr;
        },

        singleRemoveGender() {
            if (this.dataArray !== null) {
                let formData = new FormData();

                formData.append('gender_age', JSON.stringify(this.dataArray));
                formData.append('allowance_program_id', this.$route.params.id)
                this.$store.dispatch("Allowance/DeleteGender", formData).then(() => {
                    if (this.success_status === 200) {
                        this.$toast.success(this.message);

                        this.GetEditAllowanceProgram(this.$route.params.id);

                        this.deleteDialog = false;
                    }
                });
            }
        },

        deleteDialogCancel() {
            this.deleteDialog = false;
            this.GetEditAllowanceProgram(this.$route.params.id);
        },

        addRow(id) {
            this.updateAllowanceAmount.push({
                id: (id + 1),
                type_id: '',
                amount: '',
            });
        },

        deletedRow(id) {
            this.updateAllowanceAmount = this.updateAllowanceAmount.filter((item) => { return item.id !== id });
        },

        singleDisableClassremove(id) {
            try {
                this.$store.dispatch("Allowance/DeleteDisableClass", id).then(() => {
                    if (this.success_status === 200) {
                        this.$toast.success(this.message);

                        this.GetEditAllowanceProgram(this.$route.params.id);
                    }
                })
            } catch (e) {
                console.log(e);
            }
        },

        updateAllowanceProgram: async function () {
            console.log(this.editAllowanceProgram.is_active, 'this.editAllowanceProgram.is_active')
            try {
                console.log(this.updateAllowanceAge, "updateAllowanceAge")
                console.log('hello')
                let id = this.$route.params.id;

                let formData = new FormData();

                formData.append('name_en', this.editAllowanceProgram.name_en);
                formData.append('name_bn', this.editAllowanceProgram.name_bn);
                formData.append('payment_cycle', this.editAllowanceProgram.payment_cycle);
                formData.append('is_marital', !!this.editAllowanceProgram.is_marital);
                formData.append('marital_status', this.editAllowanceProgram.marital_status);

                formData.append('is_active', !!this.editAllowanceProgram.is_active);
                formData.append('system_status', this.editAllowanceProgram.system_status);
                formData.append('pmt_status', this.editAllowanceProgram.pmt_status);


                formData.append('is_disable_class', !!this.editAllowanceProgram.is_disable_class);

                formData.append('is_age_limit', !!this.editAllowanceProgram.is_age_limit);

                if (this.updateAllowanceAge !== null) {
                    this.updateAllowanceAge.forEach((item, index) => {
                        if (item.id !== undefined) {
                            formData.append(`age_limit[\`${index}\`]['id']`, item.id);
                        }
                        formData.append(`age_limit[\`${index}\`]['gender_id']`, item.gender_id);
                        formData.append(`age_limit[\`${index}\`]['min_age']`, item.min_age);
                        formData.append(`age_limit[\`${index}\`]['max_age']`, item.max_age);

                        if (item.amount !== null) {
                            formData.append(`age_limit[\`${index}\`]['amount']`, item.amount);
                        } else {
                            formData.append(`age_limit[\`${index}\`]['amount']`, null);
                        }

                    })

                }

                if (this.updateAllowanceAmount !== null) {
                    this.updateAllowanceAmount.forEach((item, index) => {
                        formData.append(`amount[\`${index}\`]['id']`, item.id);
                        formData.append(`amount[\`${index}\`]['type_id']`, item.type_id);
                        formData.append(`amount[\`${index}\`]['amount']`, item.amount);
                    })
                }

                this.allowance_field_data.forEach((item) => formData.append("add_field_id[]", item));

                formData.append('_method', 'PUT');

                await this.$store.dispatch("Allowance/UpdateAllowanceProgram", { id: id, data: formData })
                    .then(() => {
                    if (this.success_status === 200) {
                        this.$refs.form.reset();
                        this.$router.push('/system-configuration/allowance-program')
                        this.$toast.success(this.message);

                        this.success_status = '';
                        this.message = '';
                    }

                    if (this.error_status === 422) {
                        this.$refs.form.setErrors(this.errors);
                    } else {
                        this.$refs.form.setErrors();
                    }
                })
            } catch (e) {
                console.log(e);
            }
            // add function here

        },

        updateHeaderTitle() {
            const title = this.$t(
                "container.system_config.allowance_program.setting"
            );
            this.$store.commit("setHeaderTitle", title);
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
                                            <v-card-title>
                                                <h3>{{ $t('container.system_config.allowance_program.setting') }}</h3>
                                            </v-card-title>
                                        </v-col>
                                    </v-row>

                                    <v-divider></v-divider>

                                    <v-card-text>
                                        <v-col cols="12" class="d-flex">
                                            <v-row wrap>
                                                <v-col cols="12" sm="6" lg="6">
                                                    <ValidationProvider name="name english" vid="name_en" rules="required"
                                                        v-slot="{ errors }">
                                                        <v-text-field v-model="editAllowanceProgram.name_en"
                                                            :label="$t('container.system_config.allowance_program.name_en')"
                                                            menu-props="auto" persistent-hint outlined
                                                            :error="errors[0] ? true : false" :error-messages="errors[0]"
                                                            required></v-text-field>
                                                    </ValidationProvider>
                                                </v-col>

                                                <v-col cols="12" sm="6" lg="6">
                                                    <ValidationProvider name="name bangla" vid="name_bn" rules="required"
                                                        v-slot="{ errors }">
                                                        <v-text-field v-model="editAllowanceProgram.name_bn"
                                                            :label="$t('container.system_config.allowance_program.name_bn')"
                                                            menu-props="auto" persistent-hint outlined
                                                            :error="errors[0] ? true : false" :error-messages="errors[0]"
                                                            required></v-text-field>
                                                    </ValidationProvider>
                                                </v-col>
                                            </v-row>
                                        </v-col>

                                        <v-col cols="12" class="d-flex">
                                            <v-row wrap>
                                                <v-col cols="12" sm="6" lg="6">
                                                    <ValidationProvider name="gender" vid="gender" rules="required"
                                                        v-slot="{ errors }">
                                                        <v-select v-model="genderUpdatevalue" :items="genders"
                                                            item-text="value_en" item-value="id" chips
                                                            :label="$t('container.system_config.allowance_program.gender')"
                                                            multiple outlined @change="removeGender($event)"
                                                            :error="errors[0] ? true : false" :error-messages="errors[0]"
                                                            required></v-select>
                                                    </ValidationProvider>
                                                </v-col>

                                                <v-col cols="12" sm="6" lg="6">
                                                    <ValidationProvider name="payment cycle" vid="payment_cycle"
                                                        rules="required" v-slot="{ errors }">
                                                        <v-select v-model="editAllowanceProgram.payment_cycle"
                                                            :items="payment_cycle_items" item-text="name" item-value="name"
                                                            chips
                                                            :label="$t('container.system_config.allowance_program.payment_cycle')"
                                                            outlined :error="errors[0] ? true : false"
                                                            :error-messages="errors[0]" required></v-select>
                                                    </ValidationProvider>
                                                </v-col>
                                            </v-row>
                                        </v-col>

                                        <v-col cols="12" class="d-flex">
                                            <v-row wrap>
                                                <v-col cols="12" sm="6" lg="6">
                                                    <v-row wrap>
                                                        <v-col cols="4" sm="3" lg="3">
                                                            <ValidationProvider name="marital" vid="is_marital_toggle"
                                                                rules="required" v-slot="{ errors }">
                                                                <v-checkbox v-model="editAllowanceProgram.is_marital"
                                                                    :label="$t('container.system_config.allowance_program.is_marital_toggle')"
                                                                    @click="maritalStatus(editAllowanceProgram.is_marital)"
                                                                    :error="errors[0] ? true : false"
                                                                    :error-messages="errors[0]" required
                                                                    :disabled="editAllowanceProgram.is_marital === 1 ? true : false"></v-checkbox>
                                                            </ValidationProvider>
                                                        </v-col>
                                                        <v-col cols="12" sm="8" lg="8"
                                                            v-if="editAllowanceProgram.is_marital === 1 || is_marital_toggle === true">
                                                            <ValidationProvider name="marital status" vid="marital_status"
                                                                rules="required" v-slot="{ errors }">
                                                                <v-select v-model="editAllowanceProgram.marital_status"
                                                                    :items="marital_items" item-text="name"
                                                                    item-value="name"
                                                                    :label="$t('container.system_config.allowance_program.marital_status')"
                                                                    outlined :error="errors[0] ? true : false"
                                                                    :error-messages="errors[0]" required></v-select>
                                                            </ValidationProvider>
                                                        </v-col>
                                                    </v-row>
                                                </v-col>
                                                <!-- <v-col cols="12" sm="6" lg="6">
                            <v-checkbox v-model="editAllowanceProgram.system_status" :label="$t('container.system_config.allowance_program.system_status')"></v-checkbox>
                          </v-col> -->
                                                <v-col cols="12" sm="6" lg="6"
                                                    v-if="editAllowanceProgram.system_status == 1">
                                                    <v-checkbox v-model="editAllowanceProgram.is_active"
                                                        :label="$t('container.system_config.allowance_program.is_active')"></v-checkbox>
                                                </v-col>
                                            </v-row>
                                        </v-col>

                                        <v-col cols="12" class="d-flex">
                                            <v-row wrap>
                                                <v-col cols="12" sm="6" lg="6">
                                                    <v-checkbox v-model="editAllowanceProgram.is_age_limit"
                                                        :label="$t('container.system_config.allowance_program.age_limit_amount')"
                                                        @click="ageLimit(editAllowanceProgram.is_age_limit)"></v-checkbox>

                                                    <table
                                                        v-if="editAllowanceProgram.is_age_limit">
                                                        <thead>
                                                            <tr v-show="updateAllowanceAge.length">
                                                                <td>Gender</td>
                                                                <td>Min Age</td>
                                                                <td>Max Age</td>
                                                                <td>
                                                                    <span>
                                                                        Amount
                                                                    </span>

                                                                </td>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr v-for="(g, index) in updateAllowanceAge" :key="index">
                                                                <td>
                                                                    <ValidationProvider name="gender" vid="gender_id"
                                                                        rules="required" v-slot="{ errors }">
                                                                        <v-select v-model="g.gender_id" :items="genders"
                                                                            item-text="value_en" item-value="id" dense
                                                                            outlined :error="errors[0] ? true : false"
                                                                            :error-messages="errors[0]" required
                                                                            readonly></v-select>
                                                                    </ValidationProvider>
                                                                </td>
                                                                <td>
                                                                    <ValidationProvider name="minimum age" vid="min_age"
                                                                        rules="required" v-slot="{ errors }">
                                                                        <v-text-field v-model="g.min_age" type="number"
                                                                            step="any" min="0" dense outlined
                                                                            :error="errors[0] ? true : false"
                                                                            :error-messages="errors[0]" required
                                                                            :rules="minValueRules" @keyup="minValueRules"
                                                                            style="height: 64px;"></v-text-field>
                                                                    </ValidationProvider>
                                                                </td>
                                                                <td>
                                                                    <ValidationProvider name="maximum age" vid="max_age"
                                                                        rules="required" v-slot="{ errors }">
                                                                        <v-text-field v-model="g.max_age" type="number"
                                                                            step="any" min="0" dense outlined
                                                                            :error="errors[0] ? true : false"
                                                                            :error-messages="errors[0]" required
                                                                            :rules="maxValueRules" @keyup="maxValueRules"
                                                                            style="height: 64px;"></v-text-field>
                                                                    </ValidationProvider>
                                                                </td>
                                                                <td>
                                                                    <div>
                                                                        <ValidationProvider name="amount" vid="amount"
                                                                            rules="required" v-slot="{ errors }">
                                                                            <v-text-field v-model="g.amount" type="number"
                                                                                step="any" min="0" :rules="[numberRule]"
                                                                                dense outlined
                                                                                :error="errors[0] ? true : false"
                                                                                :error-messages="errors[0]" required
                                                                                style="height: 64px;"></v-text-field>
                                                                        </ValidationProvider>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr v-show="!updateAllowanceAge.length">
                                                                <td colspan="5">No Data Found</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </v-col>

                                                <v-col cols="12" sm="6" lg="6">
                                                  <v-checkbox v-model="editAllowanceProgram.is_disable_class"
                                                              :label="$t('container.system_config.allowance_program.class_wise_amount')"
                                                              @click="allowanceAmount(editAllowanceProgram.is_disable_class)"></v-checkbox>



                                                    <table
                                                        v-if="editAllowanceProgram.is_disable_class">
                                                        <thead>
                                                            <tr v-show="updateAllowanceAmount.length">
                                                                <td>Class</td>
                                                                <td>Amount</td>
                                                                <td>Add/Remove</td>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr v-if="updateAllowanceAmount.length"
                                                                v-for="(aa, index) in updateAllowanceAmount" :key="aa.id">
                                                                <td>
                                                                    <ValidationProvider name="education class" vid="type_id"
                                                                        rules="required" v-slot="{ errors }">
                                                                        <v-select v-model="aa.type_id" :items="genderTypes"
                                                                            item-value="id" item-text="value_en"
                                                                            label="Please Select" dense outlined
                                                                            :error="errors[0] ? true : false"
                                                                            :error-messages="errors[0]" required
                                                                            style="height: 64px;"></v-select>
                                                                    </ValidationProvider>
                                                                </td>
                                                                <td>
                                                                    <ValidationProvider name="education class amount"
                                                                        vid="amount" rules="required" v-slot="{ errors }">
                                                                        <v-text-field v-model="aa.amount" type="number"
                                                                            step="any" min="0" ref="input"
                                                                            :rules="[numberRule]" dense outlined
                                                                            :error="errors[0] ? true : false"
                                                                            :error-messages="errors[0]"
                                                                            required></v-text-field>
                                                                    </ValidationProvider>
                                                                </td>
                                                                <td
                                                                    style="display: flex; align-items: center; justify-content: space-between">
                                                                    <v-btn fab dark x-small color="primary"
                                                                        @click="addRow(aa.id)">
                                                                        <v-icon>mdi-plus</v-icon>
                                                                    </v-btn>

                                                                    <v-btn fab dark x-small color="red"
                                                                        @click="deletedRow(aa.id)"
                                                                        v-show="updateAllowanceAmount.length > 1">
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
                                            <v-card-title>
                                                <h3>{{ $t('container.system_config.allowance_program.add_field') }}</h3>
                                            </v-card-title>
                                        </v-col>
                                    </v-row>

                                    <v-divider></v-divider>

                                    <v-card-text>
                                        <v-col cols="12" class="d-flex">
                                            <v-row wrap>

                                                <v-col cols="12" sm="4" lg="4" v-for="(field, index) in additionalFields"
                                                    :key="field.id">
                                                    <ValidationProvider name="add_field_id" vid="add_field_id"
                                                        rules="required" v-slot="{ errors }">
                                                        <v-checkbox v-model="allowance_field_data" :label="field.name_en"
                                                            :value="field.id" menu-props="auto" persistent-hint
                                                            outlined></v-checkbox>
                                                    </ValidationProvider>
                                                </v-col>
                                                <v-col cols="12" sm="4" lg="4">
                                                    <v-checkbox v-model="editAllowanceProgram.pmt_status"
                                                        :label="$t('container.system_config.allowance_program.is_pmt_toggle')"></v-checkbox>
                                                </v-col>
                                            </v-row>
                                        </v-col>
                                    </v-card-text>
                                </v-card>
                            </v-col>

                            <v-col cols="12">
                                <v-row class="justify-end mb-5" style="margin-top: -50px">
                                    <v-btn flat color="primary" class="custom-btn mr-2" router
                                        to="/system-configuration/allowance-program">{{ $t('container.list.back') }}
                                    </v-btn>

                                    <v-btn flat color="success" type="submit" class="custom-btn mr-2"
                                        :disabled="invalid">{{ $t('container.list.submit') }}
                                    </v-btn>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-form>
                </ValidationObserver>
            </v-col>

            <!-- delete modal for allowance program age  -->
            <v-dialog v-model="deleteDialog" width="350">
                <v-card style="justify-content: center; text-align: center">
                    <v-card-title class="font-weight-bold justify-center">
                        Delete Allowance Program Age
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                        <div class="subtitle-1 font-weight-medium mt-5">
                            Are you sure to delete this allowance program age ? Allowance program age all information will
                            be deleted.
                        </div>
                    </v-card-text>
                    <v-card-actions style="display: block">
                        <v-row class="mx-0 my-0 py-2" justify="center">
                            <v-btn text @click="deleteDialogCancel" outlined class="custom-btn-width py-2 mr-10">
                                Cancel
                            </v-btn>
                            <v-btn text @click="singleRemoveGender()" color="white" :loading="delete_loading"
                                class="custom-btn-width warning white--text py-2">
                                Delete
                            </v-btn>
                        </v-row>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <!-- delete modal for allowance program age  -->
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
