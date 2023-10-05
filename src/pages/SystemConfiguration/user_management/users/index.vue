<template>
    <div id="division">
      <v-row class="mx-5 mt-4">
        <v-col cols="12">
          <v-row>
            <v-col cols="12">
              <v-card elevation="10" color="white" rounded="md" theme="light" class="mb-8">
                <v-card-title class="justify-center" tag="div">
                  <h3 class="text-uppercase pt-3">
                    {{ $t("container.system_config.demo_graphic.user.listTitle") }}
                  </h3>
                </v-card-title>
                <v-card-text>
                  <v-row class="ma-0 pa-3 white round-border d-flex justify-space-between align-center" justify="center"
                    justify-lg="space-between">
                    <div class="d-flex justify-sm-end flex-wrap">
                      <v-text-field @keyup.native="GetDivision" outlined dense v-model="search"
                        prepend-inner-icon="mdi-magnify" class="my-sm-0 my-3 mx-0v -input--horizontal" flat
                        variant="outlined" :label="$t(
                          'container.system_config.demo_graphic.user.search'
                        )
                          " hide-details color="primary">
                      </v-text-field>
                    </div>
                    <v-btn @click="createDialog" flat color="primary" prepend-icon="mdi-account-multiple-plus">
                      {{ $t("container.list.add_new") }}
                    </v-btn>
                    <v-col cols="12">
                      <v-data-table :loading="loading" item-key="id" :headers="headers" :items="users"
                        :items-per-page="pagination.perPage" hide-default-footer
                        class="elevation-0 transparent row-pointer">
                        <template v-slot:item.id="{ item, index }">
                          {{
                            (pagination.current - 1) * pagination.perPage +
                            index +
                            1
                          }}
                        </template>
                        <template v-slot:item.status="{ item }">
                            <v-chip
                                :color="item.status == 1 ? 'success' : 'error'"
                                dark
                                small
                                class="white--text"
                            >
                                {{
                                item.status == 1
                                    ? $t("container.list.active")
                                    : $t("container.list.inactive")
                                }}
                            </v-chip>
                        </template>
                         
                        <!-- Action Button -->
                        <template v-slot:item.actions="{ item }">
                          <!-- <v-tooltip top>
                            <template v-slot:activator="{ on }">
                              <v-btn v-can="'update-post'" fab x-small v-on="on" color="success" elevation="0"
                                @click="editDialog(item)">
                                <v-icon> mdi-account-edit-outline </v-icon>
                              </v-btn>
                            </template>
                            <span>
                              {{ $t("container.list.edit") }}
                            </span>
                          </v-tooltip> -->
  
                          <!-- <v-tooltip top>
                            <template v-slot:activator="{ on }">
                              <v-btn v-can="'delete-division'" fab x-small v-on="on" color="grey" class="ml-3 white--text"
                                elevation="0" @click="deleteAlert(item.id)">
                                <v-icon> mdi-delete </v-icon>
                              </v-btn>
                            </template>
                            <span> {{ $t("container.list.delete") }}</span>
                          </v-tooltip> -->
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
                            <v-pagination circle primary v-model="pagination.current" :length="pagination.total"
                              @input="onPageChange" :total-visible="11" class="custom-pagination-item"></v-pagination>
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
              {{ $t("container.system_config.demo_graphic.user.add_new") }}
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text class="mt-7">
              <ValidationObserver ref="form" v-slot="{ invalid }">
                <form @submit.prevent="submitUser()">
                    <v-row>
                        <v-col lg="6" md="6" cols="12">
                          <ValidationProvider name="Full Name" vid="full_name" rules="required" v-slot="{ errors }">
                            <v-text-field :hide-details="errors[0] ? false : true" outlined type="text" v-model="data.full_name"
                              :label="$t('container.system_config.demo_graphic.user.full_name')" required :error="errors[0] ? true : false"
                              :error-messages="errors[0]"></v-text-field>
                          </ValidationProvider>
                        </v-col>
                        <v-col lg="6" md="6" cols="12">
                          <ValidationProvider name="Username" vid="username" rules="required" v-slot="{ errors }">
                            <v-text-field :hide-details="errors[0] ? false : true" outlined type="text" v-model="data.username"
                              :label="$t('container.system_config.demo_graphic.user.username')" required :error="errors[0] ? true : false"
                              :error-messages="errors[0]"></v-text-field>
                          </ValidationProvider>
                        </v-col>
                        <v-col lg="6" md="6" cols="12">
                          <ValidationProvider name="Mobile Number" vid="mobile" rules="required" v-slot="{ errors }">
                            <v-text-field :hide-details="errors[0] ? false : true" outlined type="text" v-model="data.mobile"
                              :label="$t('container.system_config.demo_graphic.user.mobile')" required :error="errors[0] ? true : false"
                              :error-messages="errors[0]"></v-text-field>
                          </ValidationProvider>
                        </v-col>
                        <v-col lg="6" md="6" cols="12">
                          <ValidationProvider name="Email" vid="email" rules="required" v-slot="{ errors }">
                            <v-text-field :hide-details="errors[0] ? false : true" outlined type="text" v-model="data.email"
                              :label="$t('container.system_config.demo_graphic.user.email')" required :error="errors[0] ? true : false"
                              :error-messages="errors[0]"></v-text-field>
                          </ValidationProvider>
                        </v-col>
                        <v-col lg="6" md="6" cols="12">
                          <ValidationProvider name="Role" vid="role_id" rules="required" v-slot="{ errors }">
                        <v-autocomplete multiple :hide-details="errors[0] ? false : true" outlined v-model="data.role_id" :items="roles" item-text="name" item-value="id" :label="$t('container.system_config.demo_graphic.user.role_id')" :error="errors[0] ? true : false" :error-messages="errors[0]"></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <v-col lg="6" md="6" cols="12">
                          <ValidationProvider name="Status" vid="status" rules="required" v-slot="{ errors }">
                    
                            <v-select :hide-details="errors[0] ? false : true" outlined v-model="data.status" :items="[{text: 'Active', value: 1}, {text: 'Inactive', value: 0}]" item-text="text" item-value="value" :label="$t('container.system_config.demo_graphic.user.status')" required :error="errors[0] ? true : false" :error-messages="errors[0]"></v-select>
                            
                          </ValidationProvider>
                        </v-col>
                        <v-col cols="12">
                          <ValidationProvider name="Office Type" vid="office_type" rules="required" v-slot="{ errors }">
                            <v-autocomplete @input="onChangeOfficeType($event)" :hide-details="errors[0] ? false : true" outlined v-model="data.office_type" :items="officeType" item-text="value_bn" item-value="id" :label="$t('container.system_config.demo_graphic.user.office_type')" required :error="errors[0] ? true : false" :error-messages="errors[0]"></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <v-col
                        lg="6"
                        md="6"
                        cols="12"
                        v-if="
                        data.office_type == 6 ||
                        data.office_type == 7 ||
                          data.office_type == 8 ||
                          data.office_type == 9 ||
                          data.office_type == 10 ||
                          data.office_type == 11
                        "
                      >
                        <ValidationProvider
                          name="Division"
                          vid="division"
                          rules="required"
                          v-slot="{ errors }"
                        >
                          <v-autocomplete
                            :hide-details="errors[0] ? false : true"
                            @input="onChangeDivision($event)"
                            v-model="data.division_id"
                            outlined
                            :label="
                              $t(
                                'container.system_config.demo_graphic.division.division'
                              )
                            "
                            :items="divisions"
                            item-text="name_en"
                            item-value="id"
                            required
                            :error="errors[0] ? true : false"
                            :error-messages="errors[0]"
                          ></v-autocomplete>
                        </ValidationProvider>
                      </v-col>
                      <v-col
                      lg="6"
                      md="6"
                      cols="12"
                      v-if="
                        data.office_type == 7 ||
                        data.office_type == 8 ||
                        data.office_type == 9 ||
                        data.office_type == 10 ||
                        data.office_type == 11
                      "
                    >
                      <ValidationProvider
                        name="District"
                        vid="district"
                        rules="required"
                        v-slot="{ errors }"
                      >
                        <v-autocomplete
                          :hide-details="errors[0] ? false : true"
                          outlined
                          v-model="data.district_id"
                          @input="onChangeDistrict($event)"
                          :label="
                            $t(
                              'container.system_config.demo_graphic.district.district'
                            )
                          "
                          :items="districts"
                          item-text="name_en"
                          item-value="id"
                          required
                          :error="errors[0] ? true : false"
                          :error-messages="errors[0]"
                        ></v-autocomplete>
                      </ValidationProvider>
                    </v-col>
                    <v-col
                      lg="6"
                      md="6"
                      cols="12"
                      v-if="
                        data.office_type == 8 ||
                        data.office_type == 10 ||
                        data.office_type == 11
                      "
                    >
                      <ValidationProvider
                        name="Upazila"
                        vid="upazila"
                        rules="required"
                        v-slot="{ errors }"
                      >
                        <v-autocomplete
                          :hide-details="errors[0] ? false : true"
                          outlined
                          @input="onChangeUpazila($event)"
                          v-model="data.thana_id" 
                          :label="
                            $t(
                              'container.system_config.demo_graphic.office.upazila'
                            )
                          "
                          :items="upazilas"
                          item-text="name_en"
                          item-value="id"
                          required
                          :error="errors[0] ? true : false"
                          :error-messages="errors[0]"
                        ></v-autocomplete>
                      </ValidationProvider>
                    </v-col>
                    <v-col lg="6" md="6" cols="12" v-if="data.office_type == 9">
                      <ValidationProvider
                        name="city"
                        vid="city_corpo_id"
                        rules="required"
                        v-slot="{ errors }"
                      >
                        <v-autocomplete
                          :hide-details="errors[0] ? false : true"
                          v-model="data.city_corpo_id"
                          @change="onChangeCity($event)"
                          outlined
                          :label="
                            $t('container.system_config.demo_graphic.office.city')
                          "
                          :items="city"
                          item-text="name_en"
                          item-value="id"
                          required
                          :error="errors[0] ? true : false"
                          :error-messages="errors[0]"
                        ></v-autocomplete>
                      </ValidationProvider>
                    </v-col>
                    <v-col lg="6" md="6" cols="12" >
                      <ValidationProvider
                        name="office"
                        vid="office_id"
                        rules="required"
                        v-slot="{ errors }"
                      >
                        <v-autocomplete
                          :hide-details="errors[0] ? false : true"
                          v-model="data.office_id" 
                          outlined
                          :label="
                            $t('container.system_config.demo_graphic.user.office_id')
                          "
                          :items="offices"
                          item-text="name_en"
                          item-value="id"
                          required
                          :error="errors[0] ? true : false"
                          :error-messages="errors[0]"
                        ></v-autocomplete>
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
            </v-card-text>
          </v-card>
        </v-dialog>
        <!-- user add modal  -->
  
        <!-- delete modal  -->
        <v-dialog v-model="deleteDialog" width="350">
          <v-card style="justify-content: center; text-align: center">
            <v-card-title class="font-weight-bold justify-center">
              {{ $t("container.system_config.demo_graphic.division.delete") }}
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <div class="subtitle-1 font-weight-medium mt-5">
                {{
                  $t("container.system_config.demo_graphic.division.delete_alert")
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
    title: "CTM - User Management",
    data() {
      return {
        data: {
          id: null,
          full_name: null,
          username: null,
          mobile: null,
          email: null,
          role_id: [],
          status: 0,
          office_type: null,
          office_id: null,
          division_id: null,
          district_id: null,
          thana_id: null,
          city_corpo_id: null,
            },
      isDistrictHidden: true,
      isLocationTypeHidden: true,
      isCityCorporationHidden: false,
        dialogAdd: false,
        deleteDialog: false,
        dialogEdit: false,
        delete_loading: false,
        loading: false,
        search: "",
        delete_id: "",
        offices: [],
        divisions: [],
        upazilas: [],
        city: [],
        roles: [], 
        users: [],
        officeType: [], 
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
          {
            text: this.$t(
              "container.system_config.demo_graphic.user.full_name"
            ),
            value: "full_name",
          },
          {
            text: this.$t(
              "container.system_config.demo_graphic.user.username"
            ),
            value: "username",
          },
          {
            text: this.$t(
              "container.system_config.demo_graphic.user.email"
            ),
            value: "email",
          },
          {
            text: this.$t(
              "container.system_config.demo_graphic.user.mobile"
            ),
            value: "mobile",
          },
          {
            text: this.$t(
              "container.system_config.demo_graphic.user.office"
            ),
            value: "office.name_en",
          },
          {
            text: this.$t(
              "container.system_config.demo_graphic.user.status"
            ),
            value: "status",
          },
          {
            text: this.$t("container.list.action"),
            value: "actions",
            align: "center",
            sortable: false,
          },
        ];
      },
  
      ...mapState({
        message: (state) => state.Division.success_message,
        divisions: (state) => state.Division.divisions, 
      }),
    },
  
    methods: {
          createDialog() {
        this.dialogAdd = true;
      },
      submitUser() {
     
            this.loading = true;
            let fd = new FormData();
            for (const [key, value] of Object.entries(this.data)) {
              if (value !== null) {
                    fd.append(key, value);
                    // role_id is array so we need to append it separately
                    if (key == "role_id") {
                        for (let i = 0; i < value.length; i++) {
                            fd.append("role_id[]", value[i]);
                        }
                    }
              }
            }
            this.$axios
          .post("/admin/user/insert",fd, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            }})
                  .then((res) => {
                    this.$toast.success("Data Inserted Successfully");
            this.dialogAdd = false;
            this.getUsers();
            this.$refs.form.reset();
            this.loading = false;
            
          })
                  .catch((err) => {
                    this.loading = false;
                    if (err.response?.data?.errors) {
            this.$refs.form.setErrors(err.response.data.errors);
            this.$toast.error(err.response.data.message);
          }
          });
      },
      editDialog(item) {
        this.dialogEdit = true;
        this.data.code = item.code;
        this.data.name_en = item.name_en;
        this.data.name_bn = item.name_bn;
        this.data.id = item.id;
        this.errors = {};
      },
      updateDivision() {
        try {
          this.$store
            .dispatch("Division/UpdateDivision", this.data)
            .then((data) => {
              console.log(data, "update");
              if (data == null) {
                this.$toast.success("Data Updated Successfully");
                this.dialogEdit = false;
                this.GetDivision();
              } else {
                this.errors = data.errors;
              }
              // if (this.error_status == "") {
              //   this.$toast.success("Data Updated Successfully");
              //   this.dialogEdit = false;
              //   this.resetForm();
              //   this.GetDivision();
              // }
            });
        } catch (e) {
          console.log(e);
        }
      },
 
  
      onPageChange($event) {
        this.getUsers();
      },
   
      async getUsers() {
        const queryParams = {
          searchText: this.search,
          perPage: this.pagination.perPage,
          page: this.pagination.current,
        };
        this.$axios
          .get("/admin/user/get", {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
            params: queryParams,
          })
          .then((result) => {
            this.users = result.data.data;
            this.pagination.current = result.data.meta.current_page;
            this.pagination.total = result.data.meta.last_page;
            this.pagination.grand_total = result.data.meta.total;
          });
      },
      async GetDivision() {
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
          });
      },
      deleteDivision: async function () {
        try {
            
          await this.$store
            .dispatch("Division/DestroyDivision", this.delete_id)
            .then((res) => {
              // check if the request was successful
              if (res?.data?.success) {
                this.$toast.success(res.data.message);
              } else {
                this.$toast.error(res.response.data.message);
              }
              this.deleteDialog = false;
              this.GetDivision();
            })
            .catch((error) => {
              console.log(error, "error");
            });
        } catch (e) {
          console.log(e);
        }
      },
      deleteAlert(id) {
        this.data.id = id;
        // alert(JSON.stringify(id));
        this.deleteDialog = true;
        this.delete_id = id;
      },
      updateHeaderTitle() {
        const title = this.$t("container.system_config.demo_graphic.user.listTitle");
        this.$store.commit("setHeaderTitle", title);
          },
    async GetOfficeType() {
      try {
        this.$store.dispatch("getLookupByType", 3).then((data) => {
          this.officeType = data;
        });
      } catch (e) {
        console.log(e);
      }
    },
          getRoles() {
            this.$axios.get('/admin/role/get', {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            }}).then((result) => {
        this.roles = result.data.data;
      }).catch((err) => {
        console.log(err);
      })
          },
          async onChangeDivision(event) {
        this.data.office_id=null
        this.data.district_id=null
        this.data.thana_id=null
        this.data.city_corpo_id = null
        if (this.data.office_type != null) {
            this.getOfficeByLocation(this.data.office_type, event);
        }
      await this.$axios
        .get(`/admin/district/get/${event}`, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          this.districts = result.data.data;
          this.isDistrictHidden = true;
        });
          },
          onChangeUpazila(event) {
            if (this.data.office_type != null) {
            this.getOfficeByLocation(this.data.office_type, event);
        }
          },
          onChangeCity(event) {
            if (this.data.office_type != null) {
            this.getOfficeByLocation(this.data.office_type, event);
        }
          },
    async onChangeDistrict(event) {
            this.data.office_id=null
          this.data.thana_id=null
          this.data.city_corpo_id = null        
          if (this.data.office_type != null) {
            this.getOfficeByLocation(this.data.office_type, event);
        }
    //   event = 3; //Lookup.id = 3 , Look.name_en = 'City Corporation'
      const payload = {
        district_id: this.data.district_id,
        lookup_id: "3",
      };
      if (
        this.data.office_type == 8 ||
        this.data.office_type == 10 ||
        this.data.office_type == 11
      ) {
        console.log("load Upazila");
        this.GetAllUpazila(this.data.district_id);
      } else {
        console.log("load City Corporation");
        await this.$axios
          .get(`/admin/city/get/` + this.data.district_id + "/" + 3, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((result) => {
            this.city = result.data.data;
            console.log(this.city, "onChangeDistrict");
          });
      }
          },
          async GetAllUpazila(id) {
            if (this.data.office_type != null) {
            this.getOfficeByLocation(this.data.office_type, id);
        }
        this.data.office_id=null
          this.data.city_corpo_id=null  
      console.log(id, "GetAllUpazila");
      try {
        this.$store
          .dispatch("Thana/GetAllUpazilaByDistrict", id)
          .then((data) => {
            console.log(data, "GetAllUpazilaByDistrict");
            this.upazilas = data;
          });
      } catch (e) {
        console.log(e);
      }
          },

          onChangeOfficeType(event) {
            this.data.division_id=null
        this.data.district_id=null
            this.data.office_id=null
          this.data.thana_id=null
                this.data.city_corpo_id = null  
                this.getOfficeByLocation(event);
          
          },

          getOfficeByLocation(office_type_id, location_type_id=null) {
            let data = {
                office_type_id: office_type_id,
                location_type_id: location_type_id,
            };
            let fd = new FormData();
        for (const [key, value] of Object.entries(data)) {
          if (value !== null) {
            fd.append(key, value);
          }
        }
            this.$axios
                .post("/admin/user/office/by-location",fd, {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "application/json",
                    },
                })
                .then((result) => {
                    this.offices= result.data.data
                    console.log(result, 'result')
                })
                .catch((err) => {
                    console.log(err);
                });
          }
    },
    watch: {
      '$i18n.locale': 'updateHeaderTitle',
    },
    created() {
      this.getUsers();
      this.GetDivision();
      this.getRoles();
      this.GetOfficeType();
    },
    beforeMount() {
      this.updateHeaderTitle();
    },
  };
  </script>