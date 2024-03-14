
<template>
  <div id="create-menu">
    <v-row class="mx-5 mt-4">
      <v-col cols="12">
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-card-title
                ><h3>
                  {{ $t("container.system_config.demo_graphic.committee.add") }}
                </h3></v-card-title
              >

              <v-divider></v-divider>

              <v-card-text>
                <ValidationObserver ref="form" v-slot="{ invalid }">
                  <form @submit.prevent="submit()">
                    <v-row>
                      <!-- <v-col lg="6" md="6" cols="12">
                        <ValidationProvider
                          name="Code"
                          vid="code"
                          rules="required"
                          v-slot="{ errors }"
                        >
                          <v-text-field
                            outlined
                            type="text"
                            :hide-details="errors[0] ? false : true"
                            v-model="data.code"
                            :label="
                              $t(
                                'container.system_config.demo_graphic.committee.code'
                              )
                            "
                            required
                            :error="errors[0] ? true : false"
                            :error-messages="errors[0]"
                          ></v-text-field>
                        </ValidationProvider>
                      </v-col>
                      <v-col lg="6" md="6" cols="12">
                        <ValidationProvider
                          name="Committee Name"
                          vid="name"
                          rules="required"
                          v-slot="{ errors }"
                        >
                          <v-text-field
                            outlined
                            type="text"
                            :hide-details="errors[0] ? false : true"
                            v-model="data.name"
                            :label="
                              $t(
                                'container.system_config.demo_graphic.committee.name_en'
                              )
                            "
                            required
                            :error="errors[0] ? true : false"
                            :error-messages="errors[0]"
                          ></v-text-field>
                        </ValidationProvider>
                      </v-col> -->
                      <v-col lg="6" md="6" cols="12">
                        <ValidationProvider
                          name="ProgramName"
                          vid="program_id"
                          rules="required"
                          v-slot="{ errors }"
                        >
                          <v-autocomplete
                            :hide-details="errors[0] ? false : true"
                            @input="onChangeProgramName($event)"
                            v-model="data.program_id"
                            outlined
                            :label="
                              $t(
                                'container.system_config.demo_graphic.committee.program_name'
                              )
                            "
                            :items="programs"
                            item-text="name_en"
                            item-value="id"
                            required
                            :error="errors[0] ? true : false"
                            :error-messages="errors[0]"
                          ></v-autocomplete>
                        </ValidationProvider>
                      </v-col>
                      <v-col lg="6" md="6" cols="12">
                        <ValidationProvider
                          name="details"
                          vid="details"
                          v-slot="{ errors }"
                        >
                          <v-text-field
                            outlined
                            type="text"
                            :hide-details="errors[0] ? false : true"
                            v-model="data.details"
                            :label="
                              $t(
                                'container.system_config.demo_graphic.committee.details'
                              )
                            "
                            :error="errors[0] ? true : false"
                            :error-messages="errors[0]"
                          ></v-text-field>
                        </ValidationProvider>
                      </v-col>
                      <v-col lg="6" md="6" cols="12">
                        <ValidationProvider
                          name="CommitteeType"
                          vid="committee_type"
                          rules="required"
                          v-slot="{ errors }"
                        >
                          <v-autocomplete
                            :hide-details="errors[0] ? false : true"
                            @input="onChangeCommitteeType($event)"
                            v-model="data.committee_type"
                            outlined
                            :label="
                              $t(
                                'container.system_config.demo_graphic.committee.committee_type'
                              )
                            "
                            :items="committee_types"
                            item-text="value_en"
                            item-value="id"
                            required
                            :error="errors[0] ? true : false"
                            :error-messages="errors[0]"
                          ></v-autocomplete>
                        </ValidationProvider>
                      </v-col>
                    </v-row>
                    <v-card-title
                      v-if="
                        data.committee_type == 12 ||
                        data.committee_type == 13 ||
                        data.committee_type == 14 ||
                        data.committee_type == 15 ||
                        data.committee_type == 16 ||
                        data.committee_type == 17
                      "
                      ><h4>DSS Center</h4></v-card-title
                    >
                    <v-divider
                      v-if="
                        data.committee_type == 12 ||
                        data.committee_type == 13 ||
                        data.committee_type == 14 ||
                        data.committee_type == 15 ||
                        data.committee_type == 16 ||
                        data.committee_type == 17
                      "
                    ></v-divider>

                    <v-row>
                      <v-col
                        lg="6"
                        md="6"
                        cols="12"
                        v-if="
                          data.committee_type == 12 ||
                          data.committee_type == 13 ||
                          data.committee_type == 14 ||
                          data.committee_type == 15 ||
                          data.committee_type == 16 ||
                          data.committee_type == 17
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
                          data.committee_type == 12 ||
                          data.committee_type == 13 ||
                          data.committee_type == 14 ||
                          data.committee_type == 15 ||
                          data.committee_type == 16 ||
                          data.committee_type == 17
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
                          data.committee_type == 12 || data.committee_type == 14
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
                            v-model="data.upazila_id"
                            @input="onChangeUpazila($event)"
                            :label="
                              $t(
                                'container.system_config.demo_graphic.committee.upazila'
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
                      <v-col
                        lg="6"
                        md="6"
                        cols="12"
                        v-if="
                          data.committee_type == 13 || data.committee_type == 15
                        "
                      >
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
                              $t(
                                'container.system_config.demo_graphic.office.city'
                              )
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
                      <v-col
                        lg="6"
                        md="6"
                        cols="12"
                        v-if="
                          data.committee_type == 13
                          //   || data.committee_type == 14
                        "
                      >
                        <ValidationProvider
                          name="thana"
                          vid="thana_id"
                          rules="required"
                          v-slot="{ errors }"
                        >
                          <v-autocomplete
                            :hide-details="errors[0] ? false : true"
                            v-model="data.thana_id"
                            @change="onChangeThana($event)"
                            outlined
                            :label="
                              $t(
                                'container.system_config.demo_graphic.committee.thana'
                              )
                            "
                            :items="thanas"
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
                        v-if="data.committee_type == 12"
                      >
                        <ValidationProvider
                          name="union"
                          vid="union_id"
                          rules="required"
                          v-slot="{ errors }"
                        >
                          <v-autocomplete
                            :hide-details="errors[0] ? false : true"
                            v-model="data.union_id"
                            outlined
                            :label="
                              $t(
                                'container.system_config.demo_graphic.committee.union'
                              )
                            "
                            :items="unions"
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
                        v-if="data.committee_type == 16"
                      >
                        <ValidationProvider
                          name="union"
                          vid="paurashava_id"
                          rules="required"
                          v-slot="{ errors }"
                        >
                          <v-autocomplete
                            :hide-details="errors[0] ? false : true"
                            v-model="data.paurashava_id"
                            outlined
                            :label="
                              $t(
                                'container.system_config.demo_graphic.committee.pouro'
                              )
                            "
                            :items="unions"
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
                        v-if="data.committee_type == 13"
                      >
                        <ValidationProvider
                          name="ward"
                          vid="ward_id"
                          rules="required"
                          v-slot="{ errors }"
                        >
                          <v-autocomplete
                            :hide-details="errors[0] ? false : true"
                            v-model="data.ward_id"
                            outlined
                            :label="
                              $t(
                                'container.system_config.demo_graphic.committee.ward'
                              )
                            "
                            :items="wards"
                            item-text="name_en"
                            item-value="id"
                            required
                            :error="errors[0] ? true : false"
                            :error-messages="errors[0]"
                          ></v-autocomplete>
                        </ValidationProvider>
                      </v-col>
                    </v-row>

                    <v-card-title
                      ><h4>
                        {{
                          $t(
                            "container.system_config.demo_graphic.committee.add_more_member"
                          )
                        }}
                      </h4></v-card-title
                    >
                    <v-divider></v-divider>
                    <div class="wrapper mt-5">
                      <div>
                        <div
                          v-for="(member, index) in data.members"
                          :key="index"
                        >
                          <v-row justify="center">
                            <v-col>
                              <ValidationProvider
                                name="member_name"
                                vid="member_name"
                              >
                                <v-text-field
                                  :label="
                                    $t(
                                      'container.system_config.demo_graphic.committee.member_name'
                                    )
                                  "
                                  v-model="data.members[index]['member_name']"
                                  required
                                  outlined
                                  :id="member"
                                  :error="errors[0] ? true : false"
                                  :error-messages="
                                    errors['members.' + index + '.member_name']
                                  "
                                ></v-text-field>
                              </ValidationProvider>
                            </v-col>

                            <v-col>
                              <ValidationProvider
                                name="designation_id"
                                vid="designation_id"
                                rules="required"
                              >
                                <v-select
                                  outlined
                                  :id="member"
                                  :items="designations"
                                  item-text="value_en"
                                  item-value="id"
                                  :label="
                                    $t(
                                      'container.system_config.demo_graphic.committee.member_designation'
                                    )
                                  "
                                  v-model="data.members[index]['designation']"
                                  required
                                  :error="errors[0] ? true : false"
                                  :error-messages="
                                    errors[
                                      'members.' + index + '.designation_id'
                                    ]
                                  "
                                >
                                </v-select>
                              </ValidationProvider>
                            </v-col>

                            <v-col>
                              <ValidationProvider
                                name="member_address"
                                vid="member_address"
                                rules="required"
                              >
                                <v-text-field
                                  :label="
                                    $t(
                                      'container.system_config.demo_graphic.committee.member_address'
                                    )
                                  "
                                  v-model="data.members[index]['address']"
                                  required
                                  outlined
                                  :id="member"
                                  :error="errors[0] ? true : false"
                                  :error-messages="
                                    errors['members.' + index + '.address']
                                  "
                                ></v-text-field>
                              </ValidationProvider>
                            </v-col>
                            <v-col>
                              <ValidationProvider
                                name="member_email"
                                vid="member_email"
                                rules="required"
                              >
                                <v-text-field
                                  :label="
                                    $t(
                                      'container.system_config.demo_graphic.committee.member_email'
                                    )
                                  "
                                  v-model="data.members[index]['email']"
                                  required
                                  outlined
                                  :id="member"
                                  :error="errors[0] ? true : false"
                                  :error-messages="
                                    errors['members.' + index + '.email']
                                  "
                                ></v-text-field>
                              </ValidationProvider>
                            </v-col>
                            <v-col>
                              <ValidationProvider
                                name="member_phone"
                                vid="member_phone"
                                rules="required"
                              >
                                <v-text-field
                                  :label="
                                    $t(
                                      'container.system_config.demo_graphic.committee.member_phone'
                                    )
                                  "
                                  v-model="data.members[index]['phone']"
                                  required
                                  outlined
                                  :id="member"
                                  :error="errors[0] ? true : false"
                                  :error-messages="
                                    errors['members.' + index + '.phone']
                                  "
                                ></v-text-field>
                              </ValidationProvider>
                            </v-col>

                            <v-col>
                              <v-btn
                                @click="remove(index)"
                                v-if="data.members.length > 1"
                                class="ma-1"
                                color="error"
                              >
                                <v-icon>mdi-trash-can-outline </v-icon></v-btn
                              >
                            </v-col>
                          </v-row>
                        </div>
                      </div>
                    </div>

                    <v-row class="mx-0 my-0 py-2" justify="center">
                      <v-btn
                        type="button"
                        @click="add"
                        flat
                        color="primary"
                        :loading="loading"
                        class="custom-btn-width black white--text py-2"
                      >
                        {{
                          $t(
                            "container.system_config.demo_graphic.committee.add_row"
                          )
                        }}
                      </v-btn>
                    </v-row>

                    <v-row class="mx-0 my-0 py-2" justify="center">
                      <v-btn
                        flat
                        @click="dialogAdd = false"
                        outlined
                        class="custom-btn-width py-2 mr-10"
                      >
                        {{ $t("container.list.cancel") }}
                      </v-btn>
                      <v-btn
                        type="submit"
                        flat
                        color="primary"
                        :disabled="invalid"
                        :loading="loading"
                        class="custom-btn-width black white--text py-2"
                      >
                        {{ $t("container.list.submit") }}
                      </v-btn>
                    </v-row>
                  </form>
                </ValidationObserver>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>
  
  <style scoped></style>
  


  <script>
import { mapState, mapActions } from "vuex";
import { extend, ValidationProvider, ValidationObserver } from "vee-validate";
import { required } from "vee-validate/dist/rules";

extend("required", required);

export default {
  name: "Index",
  title: "CTM - Committe create",
  data() {
    return {
      data: {
        id: null,
        program_id: null,
        details: null,
        upazila_id: null,
        thana_id: null,
        office_type: null,
        office_address: null,
        comment: null,
        status: "0",
        division_id: null,
        district_id: null,
        location_type: null,
        city_corpo_id: null,
        thana_id: null,
        union_id: null,
        paurashava_id: null,
        members: [
          {
            member_name: null,
            designation: null,
            address: null,
            email: null,
            phone: null,
          },
        ],
      },
      committee: {
        id: null,
        code: null,
        name: null,
        program_id: null,
        district_id: null,
        office_id: null,
        members: [
          {
            member_name: null,
            designation: null,
            address: null,
            email: null,
            phone: null,
          },
        ],
      },
      office_type_id: null,
      isDistrictHidden: true,
      isLocationTypeHidden: true,
      isCityCorporationHidden: false,
      districts: [],
      committee_types: [],
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
            "container.system_config.demo_graphic.committee.name_en"
          ),
          value: "name_en",
        },
        {
          text: this.$t(
            "container.system_config.demo_graphic.committee.name_bn"
          ),
          value: "name_bn",
        },
        {
          text: this.$t(
            "container.system_config.demo_graphic.committee.office_type"
          ),
          value: "officeType.value_en",
        },
        {
          text: this.$t(
            "container.system_config.demo_graphic.committee.office_address"
          ),
          value: "office_address",
        },
        {
          text: this.$t(
            "container.system_config.demo_graphic.committee.status"
          ),
          value: "status",
        },
        {
          text: this.$t("container.list.action"),
          value: "actions",
          align: "center",
          sortable: false,
          width: "13%",
        },
      ];
    },

    ...mapState({
      divisions: (state) => state.Division.divisions,
    }),
    filteredOptions() {
      // Apply your filter logic here, e.g., filtering out options with 'Option 2' label
      return this.locationType.filter(
        (option) => option.value_en !== "District Pouroshava"
      );
    },
  },
  methods: {
    submit() {
      let fd = new FormData();
      for (const [key, value] of Object.entries(this.data)) {
        // if (key === "status" && value === null) {
        //   fd.append(key, "0");
        // }
        if (value !== null) {
          if (key == "members") {
            for (let i = 0; i < value.length; i++) {
              fd.append("members[" + i + "].member_name", value[i].member_name);
              fd.append("members[" + i + "].address", value[i].address);
              fd.append(
                "members[" + i + "].designation_id",
                value[i].designation
              );
              fd.append("members[" + i + "].email", value[i].email);
              fd.append("members[" + i + "].phone", value[i].phone);
            }
          } else {
            fd.append(key, value);
          }
          console.log(key, value);
        }
      }
      //   console.log(fd);
      //   return;
      // for (const [key, value] of fd.entries()) {
      //   console.log(`${key}: ${value}`);
      // }

      try {
        this.$store
          .dispatch("BeneficiaryManagement/StoreCommittee", fd)
          .then((res) => {
            console.log(res, "submit__");
            if (res.data?.success) {
              console.log(res.data?.success, "submit__");
              this.$toast.success("Data Inserted Successfully");
              this.resetData();
              this.dialogAdd = false;
              this.$router.push({ name: "Committee-List" });
            } else if (res.response?.data?.errors) {
              this.$refs.form.setErrors(res.response.data.errors);
              this.errors = res.response.data.errors;
              //   this.$toast.error(res.response.data.message);
            }
            console.log(this.$refs);
            console.log(this.errors, "this.errors");
            //   if (data == null) {
            //     this.$toast.success("Data Inserted Successfully");
            //     this.dialogAdd = false;
            //     this.resetData();
            //     this.GetOffices();
            //   } else {
            //     this.errors = data.errors;
            //   }
          });
      } catch (e) {
        console.log(e);
      }
    },
    async updateOffice() {
      let fd = new FormData();
      for (const [key, value] of Object.entries(this.data)) {
        if (key === "status" && value === null) {
          fd.append(key, "0");
        }
        if (value !== null) {
          fd.append(key, value);
        }
      }
      try {
        this.$store.dispatch("Office/UpdateOffice", fd).then((data) => {
          console.log(data, "update");
          if (data == null) {
            this.$toast.success("Data Updated Successfully");
            this.dialogEdit = false;
            this.resetData();
            this.GetOffices();
          } else {
            this.errors = data.errors;
          }
        });
      } catch (e) {
        console.log(e);
      }
    },
    editOffice(item) {
      console.log(item, "editOffice");
      console.log(item?.assignLocation?.parent?.parent?.type, "editDivision");

      this.resetData();

      this.dialogEdit = true;
      this.data.id = item.id;
      this.data.office_type = item.officeType.id;
      this.office_type_id = item.officeType.id;
      //   this.data.name_en = item.name_en;
      this.data.name_bn = item.name_bn;
      this.data.office_address = item.office_address;
      this.data.comment = item.comment;
      this.data.status = String(item.status);
      // console.log(this.data.status);

      if (item?.assignLocation?.type == "division") {
        console.log("division here");
        this.data.division_id = item?.assignLocation?.id;
      }
      if (item?.assignLocation?.type == "district") {
        console.log("district here");
        this.data.division_id = item?.assignLocation?.parent?.id;
        this.onChangeDivision(this.data.division_id);
        this.data.district_id = item?.assignLocation?.id;
      }
      if (item?.assignLocation?.parent?.parent?.type == "division") {
        this.data.division_id = item?.assignLocation?.parent?.parent?.id;
        this.onChangeDivision(this.data.division_id);
      }
      if (item?.assignLocation?.parent?.type == "district") {
        this.data.district_id = item?.assignLocation?.parent?.id;
        this.onChangeDistrict(this.data.district_id);
      }
      if (item?.assignLocation?.location_type?.value_en == "City Corporation") {
        this.data.city_corpo_id = item?.assignLocation?.id;
      }
      if (item?.assignLocation?.location_type?.value_en == "Upazila") {
        this.data.thana_id = item?.assignLocation?.id;
      }
      console.log(this.data, "editOffice End");
    },
    dialogOpen() {
      if (this.$refs.form) {
        this.$refs.form.reset();
      }

      const update_error_value = null;
      this.updateError("update_error_value");
      this.resetData();
      this.dialogAdd = true;
    },

    /* -------------------------------------------------------------------------- */
    /*                               Getters Define                               */
    /* -------------------------------------------------------------------------- */
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
    async GetOffices() {
      const queryParams = {
        searchText: this.search,
        perPage: this.pagination.perPage,
        page: this.pagination.current,
      };
      console.log(queryParams);
      this.$axios
        .get("/admin/office/get", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
          params: queryParams,
        })
        .then((result) => {
          console.log(result, "office");
          this.offices = result.data.data;
          console.log(this.offices, "Get Office");
          this.pagination.current = result.data.meta.current_page;
          this.pagination.total = result.data.meta.last_page;
          this.pagination.grand_total = result.data.meta.total;
        })
        .catch((err) => {
          console.log(err, "error");
          if (err.response?.data?.errors) {
            this.$refs.form.setErrors(err.response.data.errors);
          }
          console.log(err.response);
          this.$toast.error(err?.response?.data?.message);
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
      // alert(event, "thana, upazila");
      //   if (
      //     this.data.committee_type == 13 // only load wards
      //   ) {
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
      //   } else {
      //     await this.$axios
      //       .get(`/admin/union/get/${this.data.thana_id}`, {
      //         headers: {
      //           Authorization: "Bearer " + this.$store.state.token,
      //           "Content-Type": "multipart/form-data",
      //         },
      //       })
      //       .then((result) => {
      //           this.unions = result.data.data;
      //           console.log(this.unions, "unions");
      //       });
      //   }
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
      if (this.data.committee_type == 12 || this.data.committee_type == 14) {
        console.log("load Upazila");
        this.upazilas = [];
        this.GetAllUpazila(this.data.district_id);
      } else {
        /*
          if committee_type = 16 (district pourosova)
          then lookUpType = 1 (District Pouroshava)
          else lookUpType = 3 (City)
        */
        console.log("load City Corporation/District Pourosova");
        const lookupType = this.data.committee_type === 16 ? 1 : 3;

        await this.$axios
          .get(`/admin/city/get/` + this.data.district_id + "/" + lookupType, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((result) => {
            this.unions = lookupType === 1 ? result.data.data : [];
            this.city = lookupType === 3 ? result.data.data : [];
          });
      }
    },
    ...mapActions({
      GetAllDivisions: "Division/GetAllDivisions",
      updateError: "Office/updateError",
    }),
    deleteAlert(id) {
      this.deleteDialog = true;
      this.delete_id = id;
    },
    onPageChange($event) {
      // this.pagination.current = $event;
      this.GetOffices();
    },

    deleteOffice: async function () {
      await this.$store
        .dispatch("Office/DestroyOffice", this.delete_id)
        .then((res) => {
          // console.log(res);
          // check if the request was successful
          if (res?.data?.success) {
            this.$toast.error(res.data.message);
          } else {
            this.$toast.success(res.data.message);
          }
          this.deleteDialog = false;
          this.GetOffices();
        })
        .catch((error) => {
          console.log(error, "error");
          if (error.response?.data?.errors) {
            this.$refs.form.setErrors(error.response.data.errors);
          }
          console.log(error.response);
          this.$toast.error(error?.response?.data?.message);
        });
    },
    resetData() {
      this.dialogEdit = null;
      this.data.id = null;
      this.data.office_type = null;
      this.office_type_id = null;
      //   this.data.name_en = null;
      this.data.name_bn = null;
      this.data.office_address = null;
      this.data.comment = null;
      this.data.status = null;
      this.data.division_id = null;
      this.data.district_id = null;
      this.data.city_corpo_id = null;
      this.data.thana_id = null;
    },
    updateHeaderTitle() {
      const title = this.$t(
        "container.system_config.demo_graphic.committee.list"
      );
      this.$store.commit("setHeaderTitle", title);
    },
    add() {
      let data = {
        name: null,
        designation: null,
        email: null,
        address: null,
        phone: null,
      };
      this.data.members = [...this.data.members, data];
    },
    remove(index) {
      this.data.members.splice(index, 1);
    },
  },
  mounted() {
    this.GetAllProgram();
    this.GetAllCommitteeType();
    this.GetOffices();
    this.GetAllDivisions();
    this.GetLocationType();
    this.GetAllDesignation();
    // this.GetAllUpazila();
    // this.GetCityCorporation();
    // this.$store
    //   .dispatch("getLookupByType", 1)
    //   .then((res) => (this.locationType = res));
  },
  watch: {
    "$i18n.locale": "updateHeaderTitle",
  },
  beforeMount() {
    this.updateHeaderTitle();
  },
};
</script>