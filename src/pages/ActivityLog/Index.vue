<template>
  <div id="district">
    <v-row class="mx-5 mt-4">
      <v-col cols="12">
        <v-row>
          <Spinner :loading="isLoading" />
          <v-col cols="12">

            <v-expansion-panels>
              <v-expansion-panel class="ma-2">
                <v-expansion-panel-header color="#8C9EFF">
                  <h3 class="white--text">
                    {{
                      $t(
                          "container.activity_log.filter.title"
                      )
                    }}
                  </h3>
                </v-expansion-panel-header>
                <v-expansion-panel-content
                    class="elevation-0 transparent mt-10"
                >
                  <ValidationObserver ref="form" v-slot="{ invalid }">
                    <form @submit.prevent="onSearch($event)">
                      <v-row>
                        <v-col lg="3" md="3" cols="12">
                          <ValidationProvider
                              name="Division"
                              vid="division"
                              v-slot="{ errors }"
                          >
                            <v-select
                                outlined
                                @input="onChangeDivision($event)"
                                v-model="data.division_id"
                                :label="
                                $t(
                                  'container.activity_log.filter.division'
                                )
                              "
                                :items="divisions"
                                :item-text="getItemText"
                                item-value="id"
                                :error="errors[0] ? true : false"
                                :error-messages="errors[0]"
                                class="no-arrow-icon"
                                append-icon="mdi-plus"
                                clearable
                            >
                            </v-select>
                          </ValidationProvider>
                        </v-col>
                        <v-col lg="3" md="3" cols="12">
                          <ValidationProvider
                              name="District"
                              vid="district"
                              v-slot="{ errors }"
                          >
                            <v-select
                                outlined
                                v-model="data.district_id"
                                @input="onChangeDistrict($event)"
                                :label="
                                $t(
                                  'container.activity_log.filter.district'
                                )
                              "
                                :items="districts"
                                :item-text="getItemText"
                                item-value="id"
                                class="no-arrow-icon"
                                append-icon="mdi-plus"
                                :error="errors[0] ? true : false"
                                :error-messages="errors[0]"
                                clearable
                            ></v-select>
                          </ValidationProvider>
                        </v-col>
                        <v-col lg="3" md="3" cols="12">
                          <ValidationProvider
                              name="Office Name"
                              vid="office_name"
                              v-slot="{ errors }"
                          >

                            <v-select
                                outlined
                                v-model="data.office_id"
                                :label="
                                $t(
                                  'container.activity_log.filter.office'
                                )
                              "
                                :items="offices"
                                item-value="id"
                                item-text="name_en"
                                :error="errors[0] ? true : false"
                                :error-messages="errors[0]"
                                class="no-arrow-icon"
                                append-icon="mdi-plus"
                                clearable
                            >
                            </v-select>
                          </ValidationProvider>
                        </v-col>
                        <v-col lg="3" md="3" cols="12">
                          <ValidationProvider
                              name="Device Type"
                              vid="device_type"
                              v-slot="{ errors }"
                          >
                            <v-select
                                outlined
                                v-model="data.device_type"
                                :label="
                                $t(
                                  'container.activity_log.filter.device_type'
                                )
                              "
                                :items="device_types.map(device => device.toLowerCase())"
                                item-value="id"
                                class="no-arrow-icon"
                                append-icon="mdi-plus"
                                :error="errors[0] ? true : false"
                                :error-messages="errors[0]"
                                clearable
                            ></v-select>
                          </ValidationProvider>
                        </v-col>
                      </v-row>

                      <v-row>
                        <v-col lg="3" md="3" cols="12">
                          <v-text-field
                              outlined
                              clearable
                              :label="
                              $t(
                                'container.activity_log.filter.user_id'
                              )
                            "
                              v-model="data.user_id"
                          >
                          </v-text-field>
                        </v-col>
                        <v-col lg="3" md="3" cols="12">
                          <v-text-field
                              outlined
                              clearable
                              :label="
                              $t(
                                'container.activity_log.filter.user_name'
                              )
                            "
                              v-model="data.user_name"
                          >
                          </v-text-field>
                        </v-col>

                        <v-col lg="3" md="3" cols="12">
                          <ValidationProvider
                              name="Action Type"
                              vid="action_type"
                              v-slot="{ errors }"
                          >
                            <v-select
                                outlined
                                v-model="data.action_type"
                                :label="
                                $t(
                                  'container.activity_log.filter.action_type'
                                )
                              "
                                :items="action_types.map(name => name.log_name)"
                                item-value="id"
                                class="no-arrow-icon"
                                append-icon="mdi-plus"
                                :error="errors[0] ? true : false"
                                :error-messages="errors[0]"
                                clearable
                            ></v-select>
                          </ValidationProvider>
                        </v-col>

                        <v-col lg="3" md="3" cols="12">
                          <v-row class="ml-1 mr-1">
                            <v-menu
                                ref="menu"
                                v-model="menu"
                                :close-on-content-click="false"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="dates"
                                    :append-icon="menu ? 'mdi-calendar' : 'mdi-calendar'"
                                    :label="$t('container.application_selection_dashboard.enter_start_end_date')"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                ></v-text-field>
                              </template>
                              <v-date-picker
                                  v-model="dates"
                                  :range="[dates[0] , dates[1]]"
                                  no-title
                                  scrollable
                              >
                                <v-spacer></v-spacer>
                                <v-btn text color="primary" @click="resetDateRange">
                                  Cancel
                                </v-btn>
                                <v-btn
                                    text
                                    color="primary"
                                    @click="$refs.menu.save(dates)"
                                >
                                  OK
                                </v-btn>
                              </v-date-picker>
                            </v-menu>
                          </v-row>
                        </v-col>

                      </v-row>

                      <div class="d-inline d-flex justify-end">
                        <v-btn
                            elevation="2"
                            class="btn mr-2"
                            color="success"
                            type="submit"
                        >{{ $t("container.list.search") }}</v-btn
                        >
                        <v-btn elevation="2" class="btn" @click="resetSearch">{{
                            $t("container.list.reset")
                          }}</v-btn>
                      </div>
                    </form>
                  </ValidationObserver>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>


            <v-card
                elevation="10"
                color="white"
                rounded="md"
                theme="light"
                class="mb-8"
            >
              <v-card-title class="justify-center" tag="div">
                <h3 class="text-uppercase pt-3">
                  {{ $t('container.activity_log.table.title') }}
                </h3>
              </v-card-title>
              <v-card-text>
                <v-row justify="space-between" align="center" class="mx-5">
<!--                  <v-col lg="3" md="3" cols="12">-->
<!--                    <v-text-field-->
<!--                        outlined-->
<!--                        dense-->
<!--                        v-model="search"-->
<!--                        prepend-inner-icon="mdi-magnify"-->
<!--                        class="my-sm-0 my-3 mx-0v -input&#45;&#45;horizontal"-->
<!--                        variant="outlined"-->
<!--                        :label="$t('container.list.search')"-->
<!--                        hide-details-->
<!--                        color="primary"-->
<!--                    ></v-text-field>-->
<!--                  </v-col>-->

<!--                  <v-col lg="4" md="4" cols="12">-->
<!--                    <v-row class="ml-1 mr-1">-->
<!--                      <v-menu-->
<!--                          ref="menu"-->
<!--                          v-model="menu"-->
<!--                          :close-on-content-click="false"-->
<!--                          transition="scale-transition"-->
<!--                          offset-y-->
<!--                          min-width="auto"-->
<!--                      >-->
<!--                        <template v-slot:activator="{ on, attrs }">-->
<!--                          <v-text-field-->
<!--                              v-model="dates"-->
<!--                              :append-icon="menu ? 'mdi-calendar' : 'mdi-calendar'"-->
<!--                              :label="$t('container.application_selection_dashboard.enter_start_end_date')"-->
<!--                              readonly-->
<!--                              v-bind="attrs"-->
<!--                              v-on="on"-->
<!--                          ></v-text-field>-->
<!--                        </template>-->
<!--                        <v-date-picker-->
<!--                            v-model="dates"-->
<!--                            :range="[dates[0] , dates[1]]"-->
<!--                            no-title-->
<!--                            scrollable-->
<!--                            @input="OnChangeDateInfo($event,'total_received')"-->
<!--                        >-->
<!--                          <v-spacer></v-spacer>-->
<!--                          <v-btn text color="primary" @click="resetDateRange">-->
<!--                            Cancel-->
<!--                          </v-btn>-->
<!--                          <v-btn-->
<!--                              text-->
<!--                              color="primary"-->
<!--                              @click="$refs.menu.save(dates)"-->
<!--                          >-->
<!--                            OK-->
<!--                          </v-btn>-->
<!--                        </v-date-picker>-->
<!--                      </v-menu>-->
<!--                    </v-row>-->
<!--                  </v-col>-->

                  <v-col lg="3" md="3" cols="12">

                  </v-col>

                </v-row>
                <v-row justify="space-between" align="center" class="mx-4">

                  <v-col lg="3" md="3" cols="12">
                    {{ $t('container.list.total') }}:&nbsp;<span style="font-weight: bold;">{{ this.total }}</span>
                  </v-col>

                </v-row>
                <v-row
                    class="ma-0 pa-3 white round-border d-flex justify-space-between align-center"
                    justify="center"
                    justify-lg="space-between"
                >
                  <v-col cols="12">
                    <v-data-table
                        :loading="loading"
                        item-key="id"
                        :headers="headers"
                        :items="activity_logs"
                        :items-per-page="pagination.perPage"

                        @update:options="handleOptionsUpdate($event)"

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

                      <template v-slot:item.subject="{ item }">

                        <span>

<!--                          <v-expansion-panels>-->
                          <!--                            <v-expansion-panel>-->
                          <!--                              <v-expansion-panel-header>-->
                          <!--                                {{ $t('container.activity_log.table.change_info') }}-->
                          <!--                              </v-expansion-panel-header>-->
                          <!--                              <v-expansion-panel-content>-->
                          <!--                                <v-container>-->
                          <!--                                  <v-row v-for="(value, key) in item.subject" :key="key">-->
                          <!--                                    <v-col cols="6">{{ key }}</v-col>-->
                          <!--                                    <v-col cols="6">{{ value }}</v-col>-->
                          <!--                                  </v-row>-->
                          <!--                                </v-container>-->
                          <!--                              </v-expansion-panel-content>-->
                          <!--                            </v-expansion-panel>-->
                          <!--                          </v-expansion-panels>-->

                          <!--                          {{ JSON.stringify(item.subject) }}-->
                        </span>
                      </template>

<!--                                            <template v-slot:item.causer.user_type="{ item }">-->

<!--                                              <span>-->
<!--                                                {{ item.causer != null ? item.causer['User Type'] : "" }}-->
<!--                                              </span>-->
<!--                                            </template>-->

                      <template v-slot:item.causer.user_name="{ item }">

                                                                  <span>
                                                                    {{
                                                                      item.causer != null ? item.causer['User Name'] : ""
                                                                    }}
                                                                  </span>
                      </template>

                      <template v-slot:item.causer.email="{ item }">

                                                                  <span>
                                                                    {{
                                                                      item.causer != null ? item.causer['Email'] : ""
                                                                    }}
                                                                  </span>
                      </template>

                      <template v-slot:item.properties.device="{ item }">

                                                                  <span>
                                                                    {{
                                                                      item.properties['userInfo'] != null ? item.properties['userInfo']['Device Type'] : ""
                                                                    }}
                                                                  </span>
                      </template>
                      <template v-slot:item.properties.ip="{ item }">

                                                                  <span>
                                                                    {{
                                                                      item.properties['userInfo'] != null ? item.properties['userInfo']['Ip Address'] : ""
                                                                    }}
                                                                  </span>
                      </template>

                      <!--                      <template v-slot:item.properties="{ item }">-->

                      <!--                        <span>-->

                      <!--                          <v-expansion-panels>-->
                      <!--                            <v-expansion-panel>-->
                      <!--                              <v-expansion-panel-header>-->
                      <!--                                {{ $t('container.activity_log.table.login_anonymous_user_info') }}-->
                      <!--                              </v-expansion-panel-header>-->
                      <!--                              <v-expansion-panel-content>-->
                      <!--                                <v-container>-->
                      <!--                                  <v-row v-for="(value, key) in item.properties.userInfo" :key="key">-->
                      <!--                                    <v-col cols="6">{{ key }}</v-col>-->
                      <!--                                    <v-col cols="6">{{ value }}</v-col>-->
                      <!--                                  </v-row>-->
                      <!--                                </v-container>-->
                      <!--                                <v-container>-->
                      <!--                                  <v-row v-for="(value, key) in item.properties.data" :key="key">-->
                      <!--                                    <v-col cols="6">{{ key }}</v-col>-->
                      <!--                                    <v-col cols="6">{{ value }}</v-col>-->
                      <!--                                  </v-row>-->
                      <!--                                </v-container>-->
                      <!--&lt;!&ndash;                                <v-container>&ndash;&gt;-->
                      <!--&lt;!&ndash;                                  {{ JSON.stringify(item.properties)}}&ndash;&gt;-->
                      <!--&lt;!&ndash;                                </v-container>&ndash;&gt;-->
                      <!--                              </v-expansion-panel-content>-->
                      <!--                            </v-expansion-panel>-->
                      <!--                          </v-expansion-panels>-->

                      <!--                        </span>-->
                      <!--                      </template>-->
                      <!-- Action Button -->
                      <template v-slot:item.actions="{ item }">
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
                                :to="`/activity-logs/view/${item.id}`"
                                v-can="'activity_log-view'"
                            >
                              <v-icon>mdi-eye-outline</v-icon>
                            </v-btn>
                          </template>
                          <span>{{ $t('container.list.view') }}</span>
                        </v-tooltip>

<!--                        <v-tooltip top>-->
<!--                          <template v-slot:activator="{ on }">-->
<!--                            <v-btn-->
<!--                                v-can="'activity_log-delete'"-->
<!--                                fab-->
<!--                                x-small-->
<!--                                v-on="on"-->
<!--                                color="grey"-->
<!--                                class="ml-3 white&#45;&#45;text"-->
<!--                                elevation="0"-->
<!--                                @click="deleteAlert(item.id)"-->
<!--                            >-->
<!--                              <v-icon> mdi-delete </v-icon>-->
<!--                            </v-btn>-->
<!--                          </template>-->
<!--                          <span> {{ $t("container.list.delete") }}</span>-->
<!--                        </v-tooltip>-->
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

      <!-- delete modal  -->
      <v-dialog v-model="deleteDialog" width="350">
        <v-card style="justify-content: center; text-align: center">
          <v-card-title class="font-weight-bold justify-center">
            {{ $t("container.activity_log.table.delete") }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <div class="subtitle-1 font-weight-medium mt-5">
              {{ $t("container.activity_log.table.delete_alert") }}
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
                  @click="deleteActivityLog()"
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
import {mapActions, mapState} from "vuex";
import { extend, ValidationProvider, ValidationObserver } from "vee-validate";
import { required } from "vee-validate/dist/rules";
import Spinner from "@/components/Common/Spinner.vue";

extend("required", required);
export default {
  name: "Index",
  title: "CTM - Activity Logs",
  data() {
    return {
      data: {
        id: null,
        division_id: null,
        district_id: null,
        action_type: null,
        office_id: null,
        device_type: null,
        user_id: '',
        user_name: '',
      },
      action_types:[],
      dates: [],
      menu: false,
      isLoading:false,
      total:null,
      deleteDialog: false,
      delete_loading: false,
      loading: false,
      search: "",
      delete_id: "",
      activity_logs: [],
      errors: {},
      error_status: {},
      pagination: {
        current: 1,
        total: 0,
        perPage: 15,
      },
      sortBy: "name_en",
      sortDesc: false, //ASC
      items: [5, 10, 15, 20, 40, 50, 100],
      districts: [],
      offices: [],
      device_types: ['Desktop', 'Mobile', 'Phone', 'Tablet', 'Robot']
    };
  },
  components: {
    Spinner,
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
          text:  this.$t("container.activity_log.table.action_type") ,
          value: "log_name",
        },
        {
          text: this.$t("container.activity_log.table.description"),
          value: "description",
        },
        // {
        //   text:  this.$t("User Type") ,
        //   value: "causer.user_type",
        // },
        {
          text:  this.$t("container.activity_log.table.user_name") ,
          value: "causer.user_name",
        },
        {
          text:  this.$t("container.activity_log.table.user_email") ,
          value: "causer.email",
        },
        {
          text: this.$t("container.activity_log.table.device"),
          value: "properties.device",
        },
        {
          text: this.$t("container.activity_log.table.source_ip"),
          value: "properties.ip",
        },
        // {
        //   text: this.$t("container.activity_log.table.change_info"),
        //   value: "subject",
        //   // sortable: true,
        // },

        {
          text: this.$t("container.activity_log.table.create"),
          value: "created_at",
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
      message: (state) => state.District.success_message,
      divisions: (state) => state.Division.divisions,
    }),
  },
  methods: {

    ...mapActions({
      GetAllDivisions: "Division/GetAllDivisions",
    }),

    getAllLogName() {
       this.$axios
          .get(`/admin/activity-log/all-log-name`, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((result) => {
            this.action_types = result.data.data;
          });
    },

    onSearch(event) {
      // this.loading = true;
      this.pagination = {
        ...this.pagination,
        current: 1,
      };
      this.GetActivityLog()
    },

    getItemText(item) {
      return this.language === "bn" ? item.name_bn : item.name_en;
    },

    async onChangeDistrict(event){
      try {
        const headers = {
          Authorization: "Bearer " + this.$store.state.token,
          "Content-Type": "multipart/form-data",
        };
        const office = await this.$axios.get(`/admin/activity-log/division-districtwise/office-lists/${event}`, {
          headers: headers
        });
        this.offices = office.data.data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },

    async onChangeDivision(event) {
      try {
        const headers = {
          Authorization: "Bearer " + this.$store.state.token,
          "Content-Type": "multipart/form-data",
        };

        const district = await this.$axios.get(`/admin/district/get/${event}`, {
          headers: headers
        });
        const office = await this.$axios.get(`/admin/activity-log/division-districtwise/office-lists/${event}`, {
          headers: headers
        });
        this.districts = district.data.data;
        this.offices = office.data.data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },

    resetDateRange() {
      this.dates = [];
      this.menu = false;
      this.data.division_id= null,
      this.data.district_id= null,
      this.data.action_type= null,
      this.data.office_id= null,
      this.data.device_type= null,
      this.data.user_id= '',
      this.data.user_name= '',
      this.GetActivityLog()
    },

    async OnChangeDateInfo(event, type) {
      if (this.dates.length < 2) {
        return;
      }
      let from_date = null;
      let to_date = null;
      if (event.length === 2) {
        from_date = event[0];
        to_date = event[1];
      }

      this.GetActivityLog(from_date,to_date)
    },

    registerCustomRules() {
      extend("codeRules", (value) => {
        return (
            value.toString().length <= 2 ||
            this.$t("container.system_config.demo_graphic.district.code") +
            " can have maximum 2 digit"
        );
      });
    },

    onClickHeader() {
      alert("clicked");
    },

    onPageChange($event) {
      this.GetActivityLog();
    },
    setInitialHeader() {
      for (let i = 0; i < this.headers.length; i++) {
        if (this.headers[i].value == "name_en") {
          this.headers[i].class = "highlight-column";
        } else {
          this.headers[i].class = "";
        }
      }
    },
    handleOptionsUpdate({ sortBy, sortDesc }) {
      for (let i = 0; i < this.headers.length; i++) {
        if (this.headers[i].value == sortBy) {
          this.headers[i].class = "highlight-column";
        } else {
          this.headers[i].class = "";
        }
      }
      this.sortBy = 'name_en';
      this.sortDesc = 'asc';
      if (sortBy.length === 0 || sortDesc.length === 0) {
        this.sortBy = 'name_en';
        this.sortDesc = 'asc';
      } else {
        this.sortBy = sortBy[0];
        this.sortDesc = sortDesc[0]==true?'desc':'asc';
      }
      this.GetActivityLog();

      const queryParams = {

        sortBy: this.sortBy,
        orderBy: this.sortDesc,
      };

    },
    async GetActivityLog( from_date = null, to_date = null ) {
      this.isLoading = true;
      let page;
      if(!this.sortBy){
        page = this.pagination.current;
      }

      const queryParams = {
        searchText: this.search,
        division_id: this.data.division_id,
        district_id: this.data.district_id,
        office_id: this.data.office_id,
        device_type: this.data.device_type,
        action_type: this.data.action_type,
        user_id: this.data.user_id,
        user_name: this.data.user_name,
        perPage: this.pagination.perPage,
        page: this.pagination.current,
        sortBy: this.sortBy,
        orderBy: this.sortDesc,
        from_date: this.dates[0],
        to_date: this.dates[1],
      };

      // return;
      this.$axios
          .get("/admin/activity-log/all/filtered", {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
            params: queryParams,
          })  
          .then((result) => {
            console.log(result,'tanbeer')
            this.activity_logs = result.data?.data;
            this.pagination.current = result.data?.meta?.current_page[0];
            this.pagination.total = result.data?.meta?.last_page[0];
            this.pagination.grand_total = result.data?.meta?.total[0];
            this.total = result.data?.meta?.total[0];
            this.isLoading = false;
          })
          .catch((error) => {
              console.error(error);
            this.isLoading = false;
            })
          .finally(() => {
            this.isLoading = false;
          });
    },

    resetSearch() {
      this.resetDateRange();
    },

    deleteActivityLogs: async function () {
      try {
        await this.$store
            .dispatch("District/DestroyDistrict", this.delete_id)
            .then((res) => {
              // check if the request was successful
              if (res?.data?.success) {
                this.$toast.success(res.data.message);
              } else {
                this.$toast.error(res.response.data.message);
              }
              this.deleteDialog = false;
              this.GetActivityLog();
            });
      } catch (e) {
        console.log(e);
      }
    },

    deleteActivityLog: async function () {
      this.$axios
          .delete("/admin/activity-log/destroy/" + this.delete_id, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            this.deleteDialog = false;
            // check if the request was successful
            if (res?.data?.success) {
              this.$toast.success(res.data.message);
            } else {
              this.$toast.error(res.response.data.message);
            }
            this.GetActivityLog();
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
    deleteAlert(id) {
      this.data.id = id;
      // alert(JSON.stringify(id));
      this.deleteDialog = true;
      this.delete_id = id;
    },
    updateHeaderTitle() {
      const title = this.$t(
          "container.system_config.demo_graphic.district.list"
      );
      this.$store.commit("setHeaderTitle", title);
    },
  },

  watch: {
    "$i18n.locale": "updateHeaderTitle",

  },

  created() {
    this.GetAllDivisions();
    this.registerCustomRules();
    this.getAllLogName()
  },
  mounted(){
    this.setInitialHeader();
  },
  beforeMount() {
    this.updateHeaderTitle();
  },
};
</script>
<style>
.highlight-column {
  background-color: #e0eaf1;
}
</style>