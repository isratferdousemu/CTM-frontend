<template>
    <div id="payment_processor">
        <v-row class="mx-5 mt-4">
            <v-col cols="12">
                <v-row>
                    <v-col cols="12">
                        <v-card elevation="10" color="white" rounded="md" theme="light" class="mb-8">
                            <v-card-title class="justify-center" tag="div">
                                <h3 class="text-uppercase pt-3">
                                    {{ $t("container.payroll_management.list") }}
                                </h3>
                            </v-card-title>
                            <v-card-text>
                                <v-row class="ma-0 pa-3 white round-border d-flex justify-space-between align-center"
                                    justify="center" justify-lg="space-between">
                                    <div class="d-flex justify-sm-end flex-wrap">
                                        <v-text-field @keyup.native="GetPaymentProcessor" outlined dense v-model="search"
                                            prepend-inner-icon="mdi-magnify" class="my-sm-0 my-3 mx-0v -input--horizontal"
                                            flat variant="outlined" :label="$t(
                                                'container.list.search'
                                            )
                                                " hide-details color="primary">
                                        </v-text-field>
                                    </div>
                                    <v-btn @click="createDialog" flat color="primary"
                                        prepend-icon="mdi-account-multiple-plus">
                                        {{ $t("container.list.add_new") }}
                                    </v-btn>
                                    <v-col cols="12">
                                        <v-data-table :loading="loading" item-key="id" :headers="headers" :items="divisions"
                                            :items-per-page="pagination.perPage" hide-default-footer
                                            class="elevation-0 transparent row-pointer">
                                            <template v-slot:item.id="{ item, index }">
                                                {{
                                                    (pagination.current - 1) * pagination.perPage +
                                                    index +
                                                    1
                                                }}
                                            </template>
                                            <template v-slot:item.name_en="{ item }">
                                                {{ item.name_en }}
                                            </template>
                                            <template v-slot:item.name_bn="{ item }">
                                                {{ item.name_bn }}
                                            </template>

                                            <!-- Action Button -->
                                            <template v-slot:item.actions="{ item }">
                                                <v-tooltip top>
                                                    <template v-slot:activator="{ on }">
                                                        <v-btn v-can="'update-post'" fab x-small v-on="on" color="success"
                                                            elevation="0" @click="editDialog(item)">
                                                            <v-icon> mdi-account-edit-outline </v-icon>
                                                        </v-btn>
                                                    </template>
                                                    <span>
                                                        {{ $t("container.list.edit") }}
                                                    </span>
                                                </v-tooltip>

                                                <v-tooltip top>
                                                    <template v-slot:activator="{ on }">
                                                        <v-btn v-can="'delete-division'" fab x-small v-on="on" color="grey"
                                                            class="ml-3 white--text" elevation="0"
                                                            @click="deleteAlert(item.id)">
                                                            <v-icon> mdi-delete </v-icon>
                                                        </v-btn>
                                                    </template>
                                                    <span> {{ $t("container.list.delete") }}</span>
                                                </v-tooltip>
                                            </template>
                                            <!-- End Action Button -->

                                            <template v-slot:footer="item">
                                                <div class="text-center pt-2 v-data-footer justify-center pb-2">
                                                    <v-select style="
                              position: absolute;
                              right: 25px;
                              width: 149px;
                              transform: translate(0px, 0px);
                            " :items="items" hide-details dense outlined @change="onPageChange"
                                                        v-model="pagination.perPage"></v-select>
                                                    <v-pagination circle primary v-model="pagination.current"
                                                        :length="pagination.total" @input="onPageChange" :total-visible="11"
                                                        class="custom-pagination-item"></v-pagination>
                                                </div>
                                            </template>
                                        </v-data-table>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>

            <!-- division add modal  -->
            <v-dialog v-model="dialogAdd" width="650">
                <v-card style="justify-content: center; text-align: center">
                    <v-card-title class="font-weight-bold justify-center">
                        {{ $t("container.payroll_management.add_new") }}
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text class="mt-7">
                        <ValidationObserver ref="formAdd" v-slot="{ invalid }">
                            <form @submit.prevent="submitPaymentProcessor()">

                                <v-row>

                                    <v-col lg="6" md="6" cols="12">
                                        <ValidationProvider v-slot="{ errors }" name="Code" vid="code" rules="required">

                                            <v-autocomplete outlined clearable v-model="data.processor_type"
                                                :items="processor_types" item-text="name" item-value="id"
                                                :label="$t('container.payroll_management.processor_type')"
                                                :error="errors[0] ? true : false" :error-messages="errors[0]">

                                            </v-autocomplete>
                                        </ValidationProvider>
                                    </v-col>
                                         <v-col lg="6" md="6" cols="12" v-if="data.processor_type === 1">
                                            <ValidationProvider v-slot="{ errors }" name="Code" vid="code" rules="required">

                                                <v-autocomplete outlined clearable v-model="data.bank_name"
                                                    :items="bank_names" item-text="name" item-value="id"
                                                    :label="$t('container.payroll_management.bank_name')"
                                                    :error="errors[0] ? true : false" :error-messages="errors[0]">

                                                </v-autocomplete>
                                            </ValidationProvider>
                                        </v-col>
                                               <v-col lg="6" md="6" cols="12" v-if="data.processor_type === 1">
                                            <ValidationProvider v-slot="{ errors }" name="Branch Name" vid="name_en"
                                                rules="required">
                                                <v-text-field outlined type="text" v-model="data.branch_name"
                                                    :label="$t('container.payroll_management.branch_name')" required
                                                    :error="errors[0] ? true : false"
                                                    :error-messages="errors[0]">></v-text-field>
                                            </ValidationProvider>
                                        </v-col>

                                    <v-col lg="6" md="6" cols="12" >
                                        <ValidationProvider v-slot="{ errors }" name="Name English" vid="name_en"
                                            rules="required">
                                            <v-text-field outlined type="text" v-model="data.name_en"
                                                :label="$t('container.list.name_en')" required
                                                :error="errors[0] ? true : false"
                                                :error-messages="errors[0]">></v-text-field>
                                        </ValidationProvider>
                                    </v-col>
                                           <v-col lg="6" md="6" cols="12">
                                                <ValidationProvider v-slot="{ errors }" name="Name in Bangla" vid="name_en"
                                                    rules="required">
                                                    <v-text-field outlined type="text" v-model="data.name_bn"
                                                        :label="$t('container.list.name_en')" required
                                                        :error="errors[0] ? true : false"
                                                        :error-messages="errors[0]">></v-text-field>
                                                </ValidationProvider>
                                            </v-col>
                                    <v-col lg="6" md="6" cols="12">
                                        <ValidationProvider v-slot="{ errors }" name="Covearge Area" vid="name_en"
                                            rules="required">
                                            <v-text-field outlined type="text" v-model="data.covearge_area"
                                                :label="$t('container.payroll_management.coverage_area')" required
                                                :error="errors[0] ? true : false"
                                                :error-messages="errors[0]">></v-text-field>
                                        </ValidationProvider>
                                    </v-col>
                                        <v-col lg="6" md="6" cols="12">
                                            <ValidationProvider v-slot="{ errors }" name="Focal Phone" vid="name_en"
                                                rules="required">
                                                <v-text-field outlined type="text" v-model="data.focal_phone"
                                                    :label="$t('container.payroll_management.focal_phone')" required
                                                    :error="errors[0] ? true : false"
                                                    :error-messages="errors[0]">></v-text-field>
                                            </ValidationProvider>
                                        </v-col>
                                            <v-col lg="6" md="6" cols="12">
                                            <ValidationProvider v-slot="{ errors }" name="Focal Email" vid="name_en"
                                                rules="required">
                                                <v-text-field outlined type="text" v-model="data.focal_email"
                                                    :label="$t('container.payroll_management.email')" required
                                                    :error="errors[0] ? true : false"
                                                    :error-messages="errors[0]">></v-text-field>
                                            </ValidationProvider>
                                        </v-col>
                               
                                </v-row>


                           

                                <v-row class="mx-0 my-0 py-2" justify="center">
                                    <v-btn flat @click="dialogAdd = false" outlined class="custom-btn-width py-2 mr-10">
                                        {{ $t("container.list.cancel") }}
                                    </v-btn>
                                    <v-btn type="submit" flat color="primary" :disabled="invalid" :loading="loading"
                                        class="custom-btn-width warning white--text py-2">
                                        {{ $t("container.list.submit") }}
                                    </v-btn>
                                </v-row>
                            </form>
                        </ValidationObserver>
                        <p  class="red--text mt-2">Active field only Visible to Update Page. ***</p>
                    </v-card-text>
                </v-card>
            </v-dialog>
            <!-- division add modal  -->

            <!-- Payment processor Edit modal  -->
               <v-dialog v-model="dialogEdit" width="650">
                    <v-card style="justify-content: center; text-align: center">
                        <v-card-title class="font-weight-bold justify-center">
                            {{ $t("container.payroll_management.edit") }}
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-card-text class="mt-7">
                            <ValidationObserver ref="formAdd" v-slot="{ invalid }">
                                <form @submit.prevent="submitPaymentProcessor()">

                                    <v-row>

                                        <v-col lg="6" md="6" cols="12">
                                            <ValidationProvider v-slot="{ errors }" name="Code" vid="code" rules="required">

                                                <v-autocomplete outlined clearable v-model="data.processor_type"
                                                    :items="processor_types" item-text="name" item-value="id"
                                                    :label="$t('container.payroll_management.processor_type')"
                                                    :error="errors[0] ? true : false" :error-messages="errors[0]">

                                                </v-autocomplete>
                                            </ValidationProvider>
                                        </v-col>
                                             <v-col lg="6" md="6" cols="12" v-if="data.processor_type === 1">
                                                <ValidationProvider v-slot="{ errors }" name="Code" vid="code" rules="required">

                                                    <v-autocomplete outlined clearable v-model="data.bank_name"
                                                        :items="bank_names" item-text="name" item-value="id"
                                                        :label="$t('container.payroll_management.bank_name')"
                                                        :error="errors[0] ? true : false" :error-messages="errors[0]">

                                                    </v-autocomplete>
                                                </ValidationProvider>
                                            </v-col>
                                                   <v-col lg="6" md="6" cols="12" v-if="data.processor_type === 1">
                                                <ValidationProvider v-slot="{ errors }" name="Branch Name" vid="name_en"
                                                    rules="required">
                                                    <v-text-field outlined type="text" v-model="data.branch_name"
                                                        :label="$t('container.payroll_management.branch_name')" required
                                                        :error="errors[0] ? true : false"
                                                        :error-messages="errors[0]">></v-text-field>
                                                </ValidationProvider>
                                            </v-col>

                                        <v-col lg="6" md="6" cols="12" >
                                            <ValidationProvider v-slot="{ errors }" name="Name English" vid="name_en"
                                                rules="required">
                                                <v-text-field outlined type="text" v-model="data.name_en"
                                                    :label="$t('container.list.name_en')" required
                                                    :error="errors[0] ? true : false"
                                                    :error-messages="errors[0]">></v-text-field>
                                            </ValidationProvider>
                                        </v-col>
                                               <v-col lg="6" md="6" cols="12">
                                                    <ValidationProvider v-slot="{ errors }" name="Name in Bangla" vid="name_en"
                                                        rules="required">
                                                        <v-text-field outlined type="text" v-model="data.name_bn"
                                                            :label="$t('container.list.name_en')" required
                                                            :error="errors[0] ? true : false"
                                                            :error-messages="errors[0]">></v-text-field>
                                                    </ValidationProvider>
                                                </v-col>
                                        <v-col lg="6" md="6" cols="12">
                                            <ValidationProvider v-slot="{ errors }" name="Covearge Area" vid="name_en"
                                                rules="required">
                                                <v-text-field outlined type="text" v-model="data.covearge_area"
                                                    :label="$t('container.payroll_management.coverage_area')" required
                                                    :error="errors[0] ? true : false"
                                                    :error-messages="errors[0]">></v-text-field>
                                            </ValidationProvider>
                                        </v-col>
                                            <v-col lg="6" md="6" cols="12">
                                                <ValidationProvider v-slot="{ errors }" name="Focal Phone" vid="name_en"
                                                    rules="required">
                                                    <v-text-field outlined type="text" v-model="data.focal_phone"
                                                        :label="$t('container.payroll_management.focal_phone')" required
                                                        :error="errors[0] ? true : false"
                                                        :error-messages="errors[0]">></v-text-field>
                                                </ValidationProvider>
                                            </v-col>
                                                <v-col lg="6" md="6" cols="12">
                                                <ValidationProvider v-slot="{ errors }" name="Focal Email" vid="name_en"
                                                    rules="required">
                                                    <v-text-field outlined type="text" v-model="data.focal_email"
                                                        :label="$t('container.payroll_management.email')" required
                                                        :error="errors[0] ? true : false"
                                                        :error-messages="errors[0]">></v-text-field>
                                                </ValidationProvider>
                                            </v-col>
                               
                                    </v-row>


                           

                                    <v-row class="mx-0 my-0 py-2" justify="center">
                                        <v-btn flat @click="dialogEdit = false" outlined class="custom-btn-width py-2 mr-10">
                                            {{ $t("container.list.cancel") }}
                                        </v-btn>
                                        <v-btn type="submit" flat color="primary" :disabled="invalid" :loading="loading"
                                            class="custom-btn-width warning white--text py-2">
                                            {{ $t("container.list.update") }}
                                        </v-btn>
                                    </v-row>
                                </form>
                            </ValidationObserver>
                            <p  class="red--text mt-2">Active field only Visible to Update Page. ***</p>
                        </v-card-text>
                    </v-card>
                </v-dialog>
           
            <!-- Payment processor Edit modal  -->

            <!-- delete modal  -->
            <v-dialog v-model="deleteDialog" width="350">
                <v-card style="justify-content: center; text-align: center">
                    <v-card-title class="font-weight-bold justify-center">
                        {{ $t("container.payroll_management.delete") }}
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                        <div class="subtitle-1 font-weight-medium mt-5">
                            {{
                                $t("container.payroll_management.delete_alert")
                            }}
                        </div>
                    </v-card-text>
                    <v-card-actions style="display: block">
                        <v-row class="mx-0 my-0 py-2" justify="center">
                            <v-btn text @click="deleteDialog = false" outlined class="custom-btn-width py-2 mr-10">
                                {{ $t("container.list.cancel") }}
                            </v-btn>
                            <v-btn text @click="deleteDivision()" color="white" :loading="delete_loading"
                                class="custom-btn-width warning white--text py-2">
                                {{ $t("container.list.delete") }}
                            </v-btn>
                        </v-row>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <!-- delete modal  -->
        </v-row>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { extend, ValidationProvider, ValidationObserver } from "vee-validate";
import { required } from "vee-validate/dist/rules";

extend("required", required);
export default {
    name: "Index",
    title: "CTM - Payment Processor",
    data() {
        return {
            data: {
                processor_type: null,

            },
            dialogAdd: false,
            deleteDialog: false,
            dialogEdit: false,
            delete_loading: false,
            loading: false,
            search: "",
            delete_id: "",
            divisions: [],
            processor_types: [
                { id: 1, name: 'Bank' },
                { id: 2, name: 'MFS' },
            ],

            errors: {},
            error_status: {},
            pagination: {
                current: 1,
                total: 0,
                perPage: 10,
            },
            items: [5, 10, 15, 20, 40, 50, 100],
        };
    },
    components: {
        ValidationProvider,
        ValidationObserver,
    },
    computed: {
        headers() {
            return [
                {
                    text: this.$t("container.list.sl"),
                    value: "id",
                    align: "start",
                    sortable: false,
                },
                { text: this.$t("container.payroll_management.processor_type"), value: "code" },
                {
                    text: this.$t(
                        "container.list.name_en"
                    ),
                    value: "name_en",
                },
                {
                    text: this.$t(
                              "container.list.name_en"
                    ),
                    value: "name_bn",
                },
                  { text: this.$t("container.payroll_management.coverage_area"), value: "code" },
                  { text: this.$t("container.payroll_management.focal_phone"), value: "code" },
                        { text: this.$t("container.payroll_management.email"), value: "code" },
                {
                    text: this.$t("container.list.action"),
                    value: "actions",
                    align: "center",
                    width:"15%",
                    sortable: false,
                },
            ];
        },

      
    },

    methods: {
        createDialog() {
            if (this.$refs.formAdd) {
                this.$refs.formAdd.reset();
            }
            this.resetForm();
            this.dialogAdd = true;
        },
      
        validator() {
            let fd = new FormData();
            for (const [key, value] of Object.entries(this.data)) {
                if (value !== null) {
                    fd.append(key, value);
                }
            }
            return fd;
        },
      
        editDialog(item) {
            this.dialogEdit = true;
        
            this.data.name_en = item.name_en;
            this.data.name_bn = item.name_bn;
          
            this.errors = {};
        },
       
        resetForm() {
    
        },

        onPageChange($event) {
            // this.pagination.current = $event;
         this.GetPaymentProcessor()();
      
        },

        async GetPaymentProcessor() {
            const queryParams = {
                searchText: this.search,
                perPage: this.pagination.perPage,
                page: this.pagination.current,
            };
              this.$axios
                .get("/admin/division/get", {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                    params: queryParams,
                })
                .then((result) => {
                    this.divisions = result.data.data;
                    this.pagination.current = result.data.meta.current_page;
                    this.pagination.total = result.data.meta.last_page;
                    this.pagination.grand_total = result.data.meta.total;
                });
           
        },
       
        deleteAlert(id) {
            this.data.id = id;
            // alert(JSON.stringify(id));
            this.deleteDialog = true;
            this.delete_id = id;
        },
        updateHeaderTitle() {
            const title = this.$t(
                "container.payroll_management.list"
            );
            this.$store.commit("setHeaderTitle", title);
        },
    },
    watch: {
        "$i18n.locale": "updateHeaderTitle",
    },
    created() {
        this.GetPaymentProcessor()();
    },
    beforeMount() {
        this.updateHeaderTitle();
    },
};
</script>