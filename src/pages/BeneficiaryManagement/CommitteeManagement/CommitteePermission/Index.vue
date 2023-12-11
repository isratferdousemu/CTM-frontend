<template>
  <div id="division">
    <v-row class="mx-5 mt-4">
      <v-col cols="12">
        <v-row>
          <v-col cols="12">
            <v-card
              elevation="10"
              color="white"
              rounded="md"
              theme="light"
              class="mb-8"
            >
              <v-card-title class="justify-center" tag="div">
                <h3 class="text-uppercase pt-3">
                  {{
                    $t("container.system_config.demo_graphic.committeePermission.list")
                  }}
                </h3>
              </v-card-title>
              <v-card-text>
                <v-row
                  class="ma-0 pa-3 white round-border d-flex justify-space-between align-center"
                  justify="center"
                  justify-lg="space-between"
                >
                  <div class="d-flex justify-sm-end flex-wrap">
                    <v-text-field
                      @keyup.native="GetCommittee"
                      outlined
                      dense
                      v-model="search"
                      prepend-inner-icon="mdi-magnify"
                      class="my-sm-0 my-3 mx-0v -input--horizontal"
                      variant="outlined"
                      :label="$t('container.system_config.demo_graphic.committeePermission.search')"
                      hide-details
                      color="primary"
                    >
                    </v-text-field>
                  </div>

                  <v-col cols="12">
                    <v-data-table
                      :loading="loading"
                      item-key="id"
                      :headers="headers"
                      :items="commitees"
                      :items-per-page="pagination.perPage"
                      hide-default-footer
                      class="elevation-0 transparent row-pointer"
                    >
                      <template v-slot:item.id="{ item, index }">
                        {{
                          (pagination.current - 1) * pagination.perPage +
                          index +
                          1
                        }}
                      </template>

                      <template v-slot:item.committee_permission.approve="{ item }">
                        <PermissionBadge :permission="item.committee_permission"
                                         :status="item.committee_permission?.approve"/>
                      </template>

                      <template v-slot:item.committee_permission.forward="{ item }">
                        <PermissionBadge :permission="item.committee_permission"
                                         :status="item.committee_permission?.forward"/>
                      </template>

                      <template v-slot:item.committee_permission.reject="{ item }">
                        <PermissionBadge :permission="item.committee_permission"
                                         :status="item.committee_permission?.reject"/>
                      </template>

                      <template v-slot:item.committee_permission.waiting="{ item }">
                        <PermissionBadge :permission="item.committee_permission"
                                         :status="item.committee_permission?.waiting"/>
                      </template>



                      <!-- Action Button -->
                      <template v-slot:item.actions="{ item }">



                        <v-tooltip top>
                          <template v-slot:activator="{ on }">
                            <v-btn
                                v-can="'update-post'"
                                fab
                                x-small
                                v-on="on"
                                color="success"
                                elevation="0"
                                @click="editDialog(item)"
                            >
                              <v-icon> mdi-account-edit-outline </v-icon>
                            </v-btn>
                          </template>
                          <span>
                            {{ $t("container.list.edit") }}
                          </span>
                        </v-tooltip>


                        <v-tooltip top>
                          <template v-slot:activator="{ on }">
                            <v-btn
                              v-can="'delete-division'"
                              fab
                              x-small
                              v-on="on"
                              color="grey"
                              class="ml-3 white--text"
                              elevation="0"
                              @click="deleteAlert(item.id)"
                            >
                              <v-icon> mdi-delete </v-icon>
                            </v-btn>
                          </template>
                          <span> {{ $t("container.list.delete") }}</span>
                        </v-tooltip>
                      </template>
                      <!-- End Action Button -->

                      <template v-slot:footer="item">
                        <div
                          class="text-center pt-2 v-data-footer justify-center pb-2"
                        >
                          <v-select
                            style="
                              position: absolute;
                              right: 25px;
                              width: 149px;
                              transform: translate(0px, 0px);
                            "
                            :items="items"
                            hide-details
                            dense
                            outlined
                            @change="onPageChange"
                            v-model="pagination.perPage"
                          ></v-select>
                          <v-pagination
                            circle
                            primary
                            v-model="pagination.current"
                            :length="pagination.total"
                            @input="onPageChange"
                            :total-visible="11"
                            class="custom-pagination-item"
                          ></v-pagination>
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

      <!-- division Edit modal  -->
      <v-dialog v-model="dialogEdit" width="650">
        <v-card style="justify-content: center; text-align: center">
          <v-card-title class="font-weight-bold justify-center">
            {{$t('container.system_config.demo_graphic.committeePermission.edit')}}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="mt-7">
            <form @submit.prevent="updatePermission()">
              <v-container fluid>
                <v-checkbox
                    v-model="data.approve"
                    label="Approve"
                    :value="true"
                ></v-checkbox>

                <v-checkbox
                    v-model="data.forward"
                    label="Forward"
                    :value="true"
                ></v-checkbox>

                <v-checkbox
                    v-model="data.reject"
                    label="Reject"
                    :value="true"
                ></v-checkbox>

                <v-checkbox
                    v-model="data.waiting"
                    label="Waiting"
                    :value="true"
                ></v-checkbox>

              </v-container>




              <v-row class="mx-0 my-0 py-2" justify="center">
                <v-btn
                    @click="dialogEdit = false"
                    outlined
                    class="custom-btn-width py-2 mr-10"
                >
                  {{ $t("container.list.cancel") }}
                </v-btn>
                <v-btn
                    type="submit"
                    color="primary"
                    :loading="loading"
                    class="custom-btn-width primary white--text py-2"
                >
                  {{ $t("container.list.update") }}
                </v-btn>
              </v-row>
            </form>
          </v-card-text>
        </v-card>
      </v-dialog>
      <!-- division Edit modal  -->

      <!-- delete modal  -->
      <v-dialog v-model="deleteDialog" width="350">
        <v-card style="justify-content: center; text-align: center">
          <v-card-title class="font-weight-bold justify-center">
            {{ $t("container.system_config.demo_graphic.committeePermission.delete") }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <div class="subtitle-1 font-weight-medium mt-5">
              {{ $t("container.system_config.demo_graphic.committeePermission.delete_alert") }}
            </div>
          </v-card-text>
          <v-card-actions style="display: block">
            <v-row class="mx-0 my-0 py-2" justify="center">
              <v-btn
                text
                @click="deleteDialog = false"
                outlined
                class="custom-btn-width py-2 mr-10"
              >
                {{ $t("container.list.cancel") }}
              </v-btn>
              <v-btn
                text
                @click="deleteCommitteePermission()"
                color="white"
                :loading="delete_loading"
                class="custom-btn-width warning white--text py-2"
              >
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
import PermissionBadge from "../../../../components/BeneficiaryManagement/Committee/PermissionBadge.vue";
import { mapState } from "vuex";
import { extend, ValidationProvider, ValidationObserver } from "vee-validate";
import { required } from "vee-validate/dist/rules";

extend("required", required);
export default {
  name: "Index",
  title: "CTM - Committees",
  data() {
    return {
      data: {
        committee_type_id: null,
        value_en: null,
        value_bn: null,
        approve: null,
        forward: null,
        reject: null,
        waiting: null,
      },

      office_type_id: null,
      isDistrictHidden: true,
      isLocationTypeHidden: true,
      isCityCorporationHidden: false,
      committee_types: [],
      divisions: [],
      districts: [],
      commitees: [],
      designations: [],
      offices: [],
      unions: [],
      programs: [],
      officeType: [],
      thanas: [],
      city: null,
      wards: [],
      locationType: [],
      dialogAdd: false,
      dialogView: false,
      dialogEdit: false,
      deleteDialog: false,
      delete_loading: false,
      loading: false,
      errors: {},
      error_status: {},
      search: "",
      delete_id: "",
      pagination: {
        current: 1,
        total: 0,
        perPage: 15,
      },
      items: [5, 10, 15, 20, 40, 50, 100],
    };
  },
  components: {
    PermissionBadge,
    ValidationProvider,
    ValidationObserver,
  },
  computed: {
    headers() {
      return [
        { text: this.$t("container.list.sl"), value: "id", align: "start", sortable: true },
        { text: this.$t("container.system_config.demo_graphic.committeePermission.name"), value: "value_en" },
        { text: this.$t("container.system_config.demo_graphic.committeePermission.approve"), value: "committee_permission.approve" },
        { text: this.$t("container.system_config.demo_graphic.committeePermission.forward"), value: "committee_permission.forward" },
        { text: this.$t("container.system_config.demo_graphic.committeePermission.reject"), value: "committee_permission.reject" },
        { text: this.$t("container.system_config.demo_graphic.committeePermission.waiting"), value: "committee_permission.waiting" },
        { text: this.$t("container.list.action"), value: "actions", align: "center", sortable: false },
      ];
    },

    ...mapState({
      message: (state) => state.committee.success_message,
      divisions: (state) => state.committee.divisions,
      // errors: (state) => state.committee.errors,
      // error_status: (state) => state.committee.error_status,
    }),
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
    submitCommittee() {
      if (!this.checkLanguage()) {
        return;
      }

      try {
        this.$store
          .dispatch("Committee/StoreCommittee", this.validator())
          .then((res) => {
            console.log('res', res.data)
            if (res.data?.success) {
              this.$toast.success("Data Inserted Successfully");
              this.resetForm();
              this.dialogAdd = false;
              this.GetCommittee();
            } else if (res.response?.data?.errors) {
              console.log(res.response.data.errors);
              // this.$refs.formAdd.setErrors(res.response.data.errors);
            }
          });
      } catch (e) {
        console.log(e);
      }
    },
    editDialog(item) {
      this.data.committee_type_id = item.id;
      this.data.value_en = item.value_en;
      this.data.value_bn = item.value_bn;
      this.data.approve = !!item.committee_permission?.approve
      this.data.forward = !!item.committee_permission?.forward
      this.data.reject = !!item.committee_permission?.reject
      this.data.waiting = !!item.committee_permission?.waiting
      this.errors = {};

      this.dialogEdit = true;
    },

    updatePermission() {
      try {
        this.$store
            .dispatch("BeneficiaryManagement/StoreCommitteePermission", this.data)
            .then((data) => {
              console.log(data, "update");
              if (data != null) {
                this.$toast.success("Data Updated Successfully");
                this.dialogEdit = false;
                this.resetForm();
                this.GetCommittee();
              } else {
                // this.$refs.formEdit.setErrors(data.errors);
              }
            });
      } catch (e) {
        console.log(e);
      }
    },

    updateCommittee() {
      if (!this.checkLanguage()) {
        return;
      }

      try {
        this.$toast.success("Data Updated Successfully");
        this.$store
          .dispatch("Committee/UpdateCommittee", this.validator())
          .then((data) => {
            console.log(data, "update");
            if (data == null) {
              this.$toast.success("Data Updated Successfully");
              this.dialogEdit = false;
              this.resetForm();
              this.GetCommittee();
            } else {
              this.$refs.formEdit.setErrors(data.errors);
            }
          });
      } catch (e) {
        console.log(e);
      }
    },
    resetForm() {
      this.data.committee_type_id = null
      this.data.value_en = null
      this.data.value_bn = null
      this.data.approve = null
      this.data.forward = null
      this.data.reject = null
      this.data.waiting = null
      this.errors = {};
    },

    onPageChange($event) {
      // this.pagination.current = $event;
      this.GetCommittee();
    },
    async GetCommitteeById(id) {
      //   alert(id, "GetCommitteeById");
      try {
        await this.$store
          .dispatch("BeneficiaryManagement/GetSingleCommittee", id)
          .then((res) => {
            console.log(res.data.data, "GetCommitteeById");
            // this.upazilas = res;
            console.log(res.data.data);
            let item = res.data.data;
            this.data = res.data.data;
            this.data.program_id = res.data.data.program.name_en;
            this.data.committee_type = res.data.data.committeeType.id;
            this.data.committee_type_name =
              res.data.data.committeeType.value_en;

            item.members.forEach((key, value) => {
              console.log(key, "key");
              console.log(value, "value");
              this.data.members[value].designation_id = key.designation.id;
            });

            console.log(this.data.members, "members");
            if (item?.location?.type == "division") {
              console.log("division here");
              this.data.division_id = item?.location?.id;
              this.data.division_name = item?.location?.type;
            }
            if (item?.location?.type == "district") {
              console.log("district here");
              this.data.division_id = item?.location?.parent?.id;
              this.data.division_name = item?.location?.parent?.name_en;
              this.onChangeDivision(this.data.division_id);
              this.data.district_id = item?.location?.id;
              this.data.district_name = item?.location?.name_en;
            }
            if (item?.location?.type == "ward") {
              console.log("ward here");
              this.data.division_id =
                item?.location?.parent?.parent?.parent?.parent_id; //Division
              this.data.division_name =
                item?.location?.parent?.parent?.parent?.parent?.name_en;

              this.onChangeDivision(this.data.division_id);
              this.data.district_id =
                item?.location?.parent?.parent?.parent?.id; //District
              this.data.district_name =
                item?.location?.parent?.parent?.parent?.name_en; //District

              this.onChangeDistrict(this.data.district_id);
              this.data.city_corpo_id = item?.location?.parent?.parent?.id; //City

              this.data.city_corpo_name =
                item?.location?.parent?.parent?.name_en; //City

              this.onChangeCity(this.data.city_corpo_id);
              this.data.city_thana_id = item?.location?.parent?.id; //Thana
              this.data.city_thana_name = item?.location?.parent?.name_en; //Thana
              this.onChangeThana(this.data.city_thana_id);
              console.log(item?.location?.id, "ward");
              this.data.ward_id = item?.location?.id; //Ward
              this.data.ward_name = item?.location?.name_en; //Ward
            }
            if (item?.location?.type == "thana") {
              console.log("thana here");
              this.data.division_id = item?.location?.parent?.parent_id; //Division
              this.data.division_name = item?.location?.parent?.parent?.name_en; //Division
              this.onChangeDivision(this.data.division_id);
              this.data.district_id = item?.location?.parent?.id; //District
              this.data.district_name = item?.location?.parent?.name_en; //District
              this.onChangeDistrict(this.data.district_id);
              this.data.upazila_id = item?.location?.id; //City
              this.data.upazila_name = item?.location?.name_en; //City
            }
            if (item?.location?.type == "city") {
              console.log("thana here");
              this.data.division_id = item?.location?.parent?.parent_id; //Division
              this.data.division_name = item?.location?.parent?.parent?.name_en; //Division
              this.onChangeDivision(this.data.division_id);
              this.data.district_id = item?.location?.parent?.id; //District
              this.data.district_name = item?.location?.parent?.name_en //District
              this.onChangeDistrict(this.data.district_id);
              this.data.city_corpo_id = item?.location?.id; //City
              this.data.city_corpo_name = item?.location?.name_en; //City
            }
            // if (item?.location?.type == "union") {
            //   console.log("thana here");
            //   this.data.division_id = item?.location?.parent?.parent_id; //Division
            //   this.data.division_name = item?.location?.parent?.parent?.name_en; //Division

            //   this.onChangeDivision(this.data.division_id);
            //   this.data.district_id = item?.location?.parent?.id; //District
            //   this.data.district_name = item?.location?.parent?.name_en //District

            //   this.onChangeDistrict(this.data.district_id);
            //   this.data.city_corpo_id = item?.location?.id; //City
            // }
            if (item?.location?.type == "union") {
              console.log("union here");
              this.data.division_id = item?.location?.parent?.parent?.parent_id; //Division
              this.data.division_name = item?.location?.parent?.parent?.name_en; //Division

              this.onChangeDivision(this.data.division_id);
              this.data.district_id = item?.location?.parent?.parent?.id; //District
              this.data.district_name = item?.location?.parent?.parent?.name_en //District

              this.onChangeDistrict(this.data.district_id);

              this.data.upazila_id = item?.location?.parent?.id; //Upazila
              this.data.upazila_name = item?.location?.parent?.name_en; //Upazila

              console.log(this.data.upazila_id, "this.data.upazila_id");

              this.onChangeUpazila(this.data.upazila_id);
              this.data.paurashava_id = item?.location?.id; //Union
              this.data.paurashava_name = item?.location?.name_en; //Union
            }
            this.dialogView = true;
          });
      } catch (e) {
        console.log(e);
      }
    },
    async GetCommitteeType() {
      try {
        this.$store.dispatch("getLookupByType", 3).then((data) => {
          this.officeType = data;
          console.log(this.officeType);
        });
      } catch (e) {
        console.log(e);
      }
    },
    async GetAllUpazila(id) {
      console.log(id, "GetAllUpazilaByDistrict");
      try {
        await this.$axios
          .get(`/admin/thana/get/${id}`, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((result) => {
            this.upazilas = result.data.data;
            console.log(this.upazilas, "this.upazilas");
          });
      } catch (e) {
        console.log(e);
      }
    },
    async GetAllProgram() {
      try {
        this.$axios
          .get("/admin/allowance/get", {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((result) => {
            console.log(result, "programs");
            this.programs = result.data.data;
          })
          .catch((err) => {
            console.log(err, "error");
            if (err.response?.data?.errors) {
              this.$refs.form.setErrors(err.response.data.errors);
            }
            console.log(err.response);
            this.$toast.error(err?.response?.data?.message);
          });
      } catch (e) {
        console.log(e);
      }
    },
    async GetAllCommitteeType() {
      try {
        this.$store.dispatch("getLookupByType", 17).then((data) => {
          this.committee_types = data;
          console.log(this.committee_types);
        });
      } catch (e) {
        console.log(e);
      }
    },
    async GetLocationType() {
      try {
        this.$store.dispatch("getLookupByType", 1).then((data) => {
          this.locationType = data;
        });
      } catch (e) {
        console.log(e);
      }
    },
    async GetAllDesignation() {
      try {
        this.$store.dispatch("getLookupByType", 18).then((data) => {
          this.designations = data;
        });
      } catch (e) {
        console.log(e);
      }
    },
    async GetCommittee() {
      const queryParams = {
        searchText: this.search,
        perPage: this.pagination.perPage,
        page: this.pagination.current,
      };
      this.$axios
        .get("/admin/committee-permissions", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
          params: queryParams,
        })
        .then((result) => {

          this.commitees = result.data.data.data;
          this.pagination.current = result.data.data.current_page;
          this.pagination.total = result.data.data.last_page;
          this.pagination.grand_total = result.data.data.total;
        });
    },

    /* -------------------------------------------------------------------------- */
    /*                               On Change Event                               */
    /* -------------------------------------------------------------------------- */

    async onChangeUpazila(event) {
      console.log(event, "thana/upazila");
      await this.$axios
        .get(`/admin/union/get/${event}`, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          this.unions = result.data.data;
          console.log(this.unions, "unions");
        });
    },
    async onChangeThana(event) {
      await this.$axios
        .get(`/admin/ward/get/thana/${event}`, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          this.wards = result.data.data;
          console.log(this.wards, "wards");
        });
    },
    async onChangeCity(event) {
      await this.$axios
        .get(`/admin/thana/get/city/${this.data.city_corpo_id}`, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          this.thanas = result.data.data;
        });
    },
    async onChangeCommitteeType(event) {
      this.data.committee_type = event;
    },
    async onChangeDivision(event) {
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
    async onChangeDistrict(event) {
      event = 3; //Lookup.id = 3 , Look.name_en = 'City Corporation'
      const payload = {
        district_id: this.data.district_id,
        lookup_id: "3",
      };
      console.log(JSON.stringify(payload));
      // return;
      if (
        this.data.committee_type == 12 ||
        this.data.committee_type == 14 ||
        this.data.committee_type == 16
      ) {
        console.log("load Upazila");
        this.GetAllUpazila(this.data.district_id);
      } else {
        console.log("load City Corporation");
        await this.$axios
          .get(`/admin/city/get/` + this.data.district_id + "/" + event, {
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
    deleteCommitteePermission: async function () {
      try {
        await this.$store
          .dispatch("BeneficiaryManagement/DeleteCommitteePermission", this.delete_id)
          .then((res) => {
            // check if the request was successful

            if (res?.data?.success) {
              this.$toast.success(res.data.message);
            } else {
              this.$toast.error(res.response.data.errors);
            }
            this.deleteDialog = false;
            this.GetCommittee();
          })
          .catch((error) => {
            console.log(error, "error");
          });
      } catch (e) {
        console.log(e);
      }
    },
    deleteAlert(id) {
      this.deleteDialog = true;
      this.delete_id = id;
    },
    async GetAllDivisions() {
      this.$axios
        .get("/admin/division/get", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          this.divisions = result.data.data;
        });
    },
    updateHeaderTitle() {
      const title = this.$t(
        "container.system_config.demo_graphic.committeePermission.list"
      );
      this.$store.commit("setHeaderTitle", title);
    },
  },
  watch: {
    "$i18n.locale": "updateHeaderTitle",
  },
  created() {
    this.GetCommittee();
    this.GetAllProgram();
    this.GetAllCommitteeType();
    this.GetCommitteeById();
    this.GetAllDivisions();
    this.GetAllDesignation();
  },
  beforeMount() {
    this.updateHeaderTitle();
  },
};
</script>