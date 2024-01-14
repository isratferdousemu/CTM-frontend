<script>
import {http} from "@/hooks/httpService";

export default {
  name: "Index",
  title: "CTM - Allowance Program",

  data(){
    return{
      deleteDialog: false,
      delete_loading: false,
      deleted_id: '',
      totalAllowances: 0,
      allowances: [],
      loading: true,
      options: {},
      search: '',
      page: 1
    }
  },

  watch: {
    '$i18n.locale': 'updateHeaderTitle',

    options: {
      handler () {
        this.getAllowance()
      },
      deep: true,
    },

    search: {
      handler () {
        this.page = this.options.page;
        this.getAllowance()
      },
    },
  },

  computed: {
    headers(){
      return[
        { text: this.$t('container.list.sl'), value: "id", align: "start", sortable: false },
        { text: this.$t('container.system_config.allowance_program.name_en'), value: "name_en" },
        { text: this.$t('container.system_config.allowance_program.name_bn'), value: "name_bn" },
        { text: this.$t('container.system_config.allowance_program.payment_cycle'), value: "payment_cycle" },
        { text: this.$t('container.system_config.allowance_program.status'), value: "is_active" },
     { text: this.$t('container.system_config.allowance_program.system_status'), value: "system_status" },
        { text: this.$t('container.list.action'), value: "actions", align: "center", sortable: false },
      ]
    }
  },

  mounted() {
    this.getAllowance();
    this.updateHeaderTitle();
  },

  methods: {
     deviceActivate: async function ({ id, system_status }) {

      this.$axios
        .get(`admin/allowance/status/${id}`, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          if (system_status == 0) {
            this.$toast.success(this.message);
          } else {
            this.$toast.warning(this.message);
          }

          this.getAllowance();


          // } else {
          //     this.$refs.formAdd.setErrors(result.data.errors);
          //     //  this.$refs.formAdd.setErrors(data.errors);
          // }

        })
        .catch((err) => {
          console.log(err);

        });

    },
    getAllowance(){
      const { sortBy, sortDesc, page, itemsPerPage } = this.options

      http().get('/admin/allowance/get', {
        params: {
          sortBy: sortBy[0],
          sortDesc: sortDesc[0],
          page: page,
          itemsPerPage: itemsPerPage,
          search: this.search
        }
      }).then((result) => {
        this.allowances = result.data.data;
        this.totalAllowances = result.data.total;
        this.loading = false;
      }).catch((err) => {
        console.log(err);
      })
    },

    deleteAlert(id) {
      this.deleteDialog = true;
      this.deleted_id = id;
    },

    deleteAllowanceProgram: async function(){
      try {
        let id = this.deleted_id;

        await http().delete(`/admin/allowance/destroy/${id}`).then((result) => {

            this.allowances = this.allowances.filter((item) => {
              return id !== item.id;
            });
            this.deleteDialog = false;
            this.$toast.success(result.data.message);
            this.getAllowance();
        })
      }catch (e) {
        console.log(e);
      }
    },

    updateHeaderTitle() {
      const title = this.$t(
          "container.system_config.allowance_program.list"
      );
      this.$store.commit("setHeaderTitle", title);
    },
  }
}
</script>

<template>
  <div id="allowance_program">
    <v-row class="mx-5 mt-5">
      <v-col cols="12">
        <v-row wrap>
          <v-col cols="12">
            <v-card>
              <v-row>
                <v-col col="6">
                  <v-card-title><h3>{{ $t('container.system_config.allowance_program.list') }}</h3></v-card-title>
                </v-col>
              </v-row>

              <v-divider></v-divider>

              <v-card-text>
                <v-card-title class="mb-5">
                  <div class="d-flex justify-sm-end flex-wrap">
                    <v-text-field
                        @keyup.native="getAllowance"
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Search"
                        hide-details
                        class="mb-5 my-sm-0 my-3 mx-0v -input--horizontal"
                        flat
                        outlined dense
                    ></v-text-field>
                  </div>

                  <v-spacer></v-spacer>

                  <v-btn
                      medium
                      flat
                      color="primary"
                      router
                      to="/system-configuration/allowance-program/create"
                  >
                    <v-icon small left>mdi-plus</v-icon>
                    <span>{{$t('container.list.add_new')}}</span>
                  </v-btn>
                </v-card-title>

                <v-card-subtitle>
                  <v-data-table
                      :headers="headers"
                      :items="allowances"
                      :search="search"
                      :options.sync="options"
                      :server-items-length="totalAllowances"
                      :loading="loading"
                      :footer-props="{
                          'items-per-page-options': [10,20,30,40,50]
                      }"
                      dense
                      class="elevation-1 transparent row-pointer"
                  >

                    <template v-slot:[`item.id`]="{ item,index }">
                      {{ index + 1 }}
                    </template>

                    <template v-slot:[`item.is_active`]="{ item }">
                      <span v-if="item.is_active === 0">
                        Inactive
                      </span>
                      <span v-else>
                        Active
                      </span>
                    </template>
                           <template v-slot:[`item.system_status`]="{ item }">
                        <span v-if="item.is_active === 0">
                          Inactive
                        </span>
                        <span v-else>
                          Active
                        </span>
                      </template>
                          <template v-slot:[`item.system_status`]="{ item }">
                                           
                                                  <span >
                                                       <v-switch :input-value="item.system_status === 1 ? true : false" @change="deviceActivate({ id: item.id, system_status: item.system_status })" hide-details color="orange darken-3"></v-switch>
                                                  </span>
                                          </template>

                    <template v-slot:[`item.actions`]="{ item }" style="padding: 10px;">
                      <v-tooltip top>
                        <template v-slot:activator="{ on }">
                          <v-btn
                              :disabled="item.default === 1"
                              fab
                              style="margin-right: 10px;"
                              x-small
                              color="success"
                              v-on="on"
                              router
                              :to="`/system-configuration/allowance-program/edit/${item.id}`"
                          >
                          <v-icon>mdi-account-edit-outline</v-icon>
                          </v-btn>
                        </template>
                        <span>{{ $t('container.list.edit') }}</span>
                      </v-tooltip>

                     <v-tooltip top>
                          <template v-slot:activator="{ on }">
                            <v-btn
                                :disabled="item.default === 1"
                                fab
                                x-small
                                color="success"
                                v-on="on"
                                router
                                :to="`/system-configuration/allowance-program/setting/${item.id}`"
                            >
                              <v-icon>mdi-cogs</v-icon>
                              <!-- <v-icon>mdi-account-edit-outline</v-icon> -->
                            </v-btn>
                          </template>
                          <span>Setings</span>
                        </v-tooltip>


                      <v-tooltip top>
                        <template v-slot:activator="{ on }">
                          <v-btn
                              :disabled="item.default === 1"
                              fab
                              x-small
                              color="grey"
                              class="ml-3 white--text"
                              v-on="on"
                              @click="deleteAlert(item.id)"
                          >
                            <v-icon>mdi-delete</v-icon>
                          </v-btn>
                        </template>
                    <span>{{ $t('container.list.delete') }}</span>
                      </v-tooltip>
                    </template>
                  </v-data-table>
                </v-card-subtitle>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>

      <!-- delete modal  -->
      <v-dialog v-model="deleteDialog" width="350">
        <v-card style="justify-content: center; text-align: center">
          <v-card-title class="font-weight-bold justify-center">
            Delete Allowance Program
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <div class="subtitle-1 font-weight-medium mt-5">
              Are you sure to delete this allowance program? Allowance program all information will be deleted.
            </div>
          </v-card-text>
          <v-card-actions style="display: block">
            <v-row class="mx-0 my-0 py-2" justify="center">
              <v-btn text @click="deleteDialog = false" outlined class="custom-btn-width py-2 mr-10">
                Cancel
              </v-btn>
              <v-btn text @click="deleteAllowanceProgram" color="white" :loading="delete_loading"
                     class="custom-btn-width warning white--text py-2">
                Delete
              </v-btn>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- delete modal  -->
    </v-row>
  </div>
</template>

<style scoped>

</style>