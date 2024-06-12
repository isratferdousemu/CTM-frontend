<script>
import { extend, ValidationProvider, ValidationObserver } from "vee-validate";

import { mapActions, mapState } from "vuex";

export default {
   
    title: "CTM - Edit API",
    components: {
        ValidationProvider,
        ValidationObserver,
    },

    data() {
        return {

           
            modules: [],
            selected_columns: [],
            purposes: [],

            data: {
                name: null,
                url:null,
                api_purpose_id: null,
                api_unique_id: null,
                module: null,
                selected_columns: []
            },
        };
    },

    watch: {
        "$i18n.locale": "updateHeaderTitle",
    },
    computed: {
        language: {
            get() {
                return this.$store.getters.getAppLanguage;
            }
        },
    },


    mounted() {
        this.GetModules();
        this.APIView();
        

        this.updateHeaderTitle();
    },

    methods: {
        getItemText(item) {
            return this.language === 'bn' ? item.name_bn : item.name;
        },
        handleChange() {
            // Find the selected module by its id
            // Find the selected module by its id
            this.data.url = null;
         this.data.selected_columns=[];
            this.data.api_purpose_id=null;
            const selectedModule = this.modules.find(module => module.id === this.data.module);
            if (selectedModule) {
              
                // const purposes = selectedModule.purposes;
                this.purposes = selectedModule.purposes
                console.log(this.purposes, "purposes")

            }

        },
        handleChange_1() {
            // Find the selected module by its id
            // Find the selected module by its id

         
            const selectedModule = this.modules.find(module => module.id === this.data.module);
            if (selectedModule) {

                // const purposes = selectedModule.purposes;
                this.purposes = selectedModule.purposes
                console.log(this.purposes, "purposes")

            }

        },
       
        APIView() {
          
            console.log(this.$route.params.id, "params")
            this.$axios
                .get(`admin/api-list/${this.$route.params.id}`, {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((result) => {
                    console.log(result, "result")
                    this.data = result?.data?.data
                    this.data.module = result?.data?.data?.purpose?.api_module_id;
                    this.data.api_unique_id= result?.data?.data?.purpose?.api_unique_id
;
                    this.handleChange_1();
                    this.Change_1();
                    console.log("selected_columns",this.data.selected_columns)

                })
                .catch((err) => {
                    if (this.$refs.formAdd && this.$refs.formAdd.$refs && this.$refs.formAdd.$refs.operator) {

                        this.$refs.formAdd.$refs.operator.setErrors([err.response.data.errors.operator[0]]);
                    } else {
                        console.error('Error setting errors:', err);
                    }

                });

        },

        Change() {
            // Find the selected module by its id
            this.data.selected_columns = [];
            const selectedpurpose = this.purposes.find(purpose => purpose.id == this.data.api_purpose_id);
            if (selectedpurpose) {
                // const purposes = selectedModule.purposes;
                this.data.url = selectedpurpose.url;
                this.data.api_unique_id = selectedpurpose.api_unique_id
                this.selected_columns = selectedpurpose.columns


            }

        },
        Change_1() {
            // Find the selected module by its id
     
            const selectedpurpose = this.purposes.find(purpose => purpose.id == this.data.api_purpose_id);
            if (selectedpurpose) {
                // const purposes = selectedModule.purposes;
                this.data.url = selectedpurpose.url;
                this.data.api_unique_id = selectedpurpose.api_unique_id
                this.selected_columns = selectedpurpose.columns


            }

        },
        async GetModules() {

            this.$axios
                .get("/admin/get-modules", {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },

                })
                .then((result) => {

                    const modules = result?.data?.data || [];

                    modules.forEach(module => {
                        if (module.name === "Application & Selection") {
                            module.name_bn = "আবেদন ও নির্বাচন";
                        } else if (module.name === "Beneficiary Management") {
                            module.name_bn = "উপকারভোগী ব্যবস্থাপনা";
                        }
                    });

                    console.log(modules, "modules");
                    this.modules = modules;

                });
        },




        updateAPI() {
            const formData = new FormData();
            // Append data to FormData object
            formData.append('name', this.data.name);
            formData.append('api_purpose_id', this.data.api_purpose_id);
            formData.append('api_unique_id', this.data.api_unique_id);
            formData.append('api_unique_id', this.data.api_unique_id);
            // formData.append('selected_columns', this.data.selected_columns);

          if (this.data.selected_columns) {
            this.data?.selected_columns.forEach((item, index) => {
              formData.append('selected_columns[]', item);
            });
          }


            // formData.append('selected_columns', JSON.stringify(this.data.selected_columns)); // Convert to JSON string
            formData.append('_method', "PUT");
            console.log("data", this.data);

            this.$axios
                .post(`admin/api-list/${this.$route.params.id}`, formData, {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((result) => {
                    if (result.data.success == true) {
                        this.$toast.success(result.data.message);
                        this.$router.push("/api-manager/api-generate");
                    } else {
                        this.$refs.form.setErrors(result.data.errors);


                    }

                })
                .catch((err) => {
                    if (this.$refs.formAdd && this.$refs.formAdd.$refs && this.$refs.formAdd.$refs.operator) {

                        this.$refs.formAdd.$refs.operator.setErrors([err.response.data.errors.operator[0]]);
                    } else {
                        console.error('Error setting errors:', err);
                    }

                });

        },

        updateHeaderTitle() {
            const title = this.$t("container.system_config.device.add");
            this.$store.commit("setHeaderTitle", title);
        },
    },
};
</script>

<template>
    <div id="device_create">
        <v-row class="mx-5 mt-5">
            <v-col cols="12">
                <v-row>
                    <v-col cols="12">
                        <v-card>
                            <v-card-title class="justify-center"
                                style="background-color:#1c3b68;color:white;margin-bottom: 17px;">
                                <h4>
                                    {{ $t("container.api_manager.api_generate.edit") }}
                                </h4>
                            </v-card-title>

                            <!-- <v-divider></v-divider> -->

                            <v-card-text class="mt-5">
                                <ValidationObserver ref="form" v-slot="{ invalid }">
                                    <v-form v-on:submit.prevent="updateAPI()">

                                        <v-row class="mt-10">
                                            <v-col cols="12" sm="3" lg="3">
                                                <ValidationProvider name=" API Name" vid="api_name" rules="required"
                                                    v-slot="{ errors }">
                                                    <v-text-field type="text" v-model="data.name" :label="$t('container.api_manager.api_generate.api_name')
                                        " persistent-hint outlined :error="errors[0] ? true : false" :error-messages="errors[0] ? (language == 'bn' ? 'অনুগ্রহ পূর্বক এপিআই নাম প্রদান করুন '
                                        : 'Please enter API Name') : ''"></v-text-field>
                                                </ValidationProvider>
                                            </v-col>
                                            <v-col cols="12" sm="3" lg="3">
                                                <ValidationProvider name="Module" vid="module" rules="required"
                                                    v-slot="{ errors }">
                                                    <v-select v-model="data.module" :label="$t('container.api_manager.api_generate.module')
                                        " persistent-hint outlined :error="errors[0] ? true : false" :items="modules"
                                                        :item-text="getItemText" item-value="id" :error-messages="errors[0] ? (language == 'bn' ? 'অনুগ্রহ পূর্বক মডিউল প্রদান করুন '
                                        : 'Please enter Module') : ''" @change="handleChange"></v-select>

                                                </ValidationProvider>
                                            </v-col>
                                            <v-col cols="12" sm="3" lg="3">
                                                <ValidationProvider name="Purpose" vid="purpose" rules="required"
                                                    v-slot="{ errors }">
                                                    <v-select type="text" v-model="data.api_purpose_id" :label="$t('container.api_manager.api_generate.purpose')
                                        " persistent-hint outlined :error="errors[0] ? true : false" :items="purposes"
                                                        item-text="purpose" item-value="id" :error-messages="errors[0] ? (language == 'bn' ? 'অনুগ্রহ পূর্বক উদ্দেশ্য প্রদান করুন '
                                        : 'Please enter Purpose') : ''" @change="Change"></v-select>
                                                </ValidationProvider>
                                            </v-col>
                                            <v-col cols="12" sm="3" lg="3">
                                                <ValidationProvider name="URL" vid="url" rules="required"
                                                    v-slot="{ errors }">

                                                    <v-text-field type="text" v-model="data.url" :label="$t('container.api_manager.url_generate.url')
                                        " persistent-hint outlined :error="errors[0] ? true : false"
                                                        :error-messages="errors[0]" disabled></v-text-field>
                                                </ValidationProvider>
                                            </v-col>
                                            <v-col cols="12" sm="12" lg="12">
                                                <ValidationProvider name="Select Column" vid="Parameter"
                                                    v-slot="{ errors }">
                                                    <!-- <v-select multiple type="text" v-model="data.selected_columns"
                                                        :label="$t('container.api_manager.api_generate.select_column')
                                        " persistent-hint outlined :error="errors[0] ? true : false"
                                                        :items="selected_columns" item-text="name" item-value="id"
                                                        :error-messages="errors[0]"></v-select> -->
                                                    <v-autocomplete
                                                        v-if="selected_columns && selected_columns.length > 0" multiple
                                                        type="text" v-model="data.selected_columns"
                                                        :label="$t('container.api_manager.api_generate.parameter')"
                                                        persistent-hint outlined :error="errors[0] ? true : false"
                                                        :items="selected_columns" item-text="name" item-value="id"
                                                        :error-messages="errors[0]" class="select-with-chips">
                                                        <!-- Slot for chips -->
                                                        <template v-slot:selection="{ item }">
                                                            <v-chip color="#CCCCCC">{{ item }}</v-chip>
                                                        </template>
                                                    </v-autocomplete>
                                                </ValidationProvider>
                                            </v-col>
                                            <!-- <v-col cols="12" sm="3" lg="3">
                                                <ValidationProvider name="Table Name" vid="url" rules="required"
                                                    v-slot="{ errors }">
                                                    <v-text-field type="text" v-model="data.table" :label="$t('container.api_manager.url_generate.table_name')
                                        " persistent-hint outlined :error="errors[0] ? true : false"
                                                        :error-messages="errors[0]"></v-text-field>
                                                </ValidationProvider>
                                            </v-col>
                                            <v-col cols="12" sm="3" lg="3">
                                                <ValidationProvider name="Method" vid="methods" rules="required"
                                                    v-slot="{ errors }">
                                                    <v-autocomplete v-model="data.method" :label="$t('container.api_manager.url_generate.method')
                                        " persistent-hint outlined :error="errors[0] ? true : false"
                                                        :error-messages="errors[0]" :items="methods"></v-autocomplete>
                                                </ValidationProvider>
                                            </v-col> -->




                                        </v-row>
                                        <v-row class="justify-end mt-5 mb-5">
                                            <v-btn flat color="primary" class="custom-btn mr-2" router
                                                to="/api-manager/api-generate">{{
                                                $t("container.list.back") }}
                                            </v-btn>
                                            <v-btn flat color="success" type="submit" class="custom-btn mr-2"
                                                :disabled="invalid">
                                                {{ $t("container.list.update") }}
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

<style >
.select-with-chips .v-select__selections {
    max-height: 150px;
    /* Set max height as needed */
    overflow-y: auto;
    /* Enable vertical scrolling */
}
</style>