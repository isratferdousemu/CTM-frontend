<template>
  <div id="division">
    <v-row class="mx-5 mt-4">
      <v-col cols="12">
        <v-row>
          <Spinner :loading="isLoading" />
          <v-col cols="12">

            <v-expansion-panels>
              <v-expansion-panel class="ma-2">
                <v-expansion-panel-header color="#8C9EFF" style="background-color: #1C3B68; color: white;font-size: 17px;">
                  <h3 class="white--text">
                    {{
                      $t(
                          "container.list.filter"
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
                              name="UserType"
                              vid="userType_id"
                              rules=""
                              v-slot="{ errors }"
                          >
                            <v-autocomplete
                                :hide-details="errors[0] ? false : true"
                                @input="onChangeUserType($event)"
                                v-model="data.user_type"
                                outlined
                                :label="
                          $t(
                            'container.system_config.demo_graphic.user.user_type'
                          )
                        "
                                :items="[{id:3,name_en:'Super Admin'},...userType]"
                                item-text="name_en"
                                item-value="id"
                                :error="errors[0] ? true : false"
                                :error-messages="errors[0]"
                            ></v-autocomplete>
                          </ValidationProvider>
                        </v-col>

<!--                        office type-->
                        <v-col lg="3" md="3" cols="12" v-if="data.user_type === 1">
                          <ValidationProvider
                              name="Office Type"
                              vid="office_type"
                              rules=""
                              v-slot="{ errors }"
                          >
                            <v-autocomplete
                                @input="onChangeOfficeType($event)"
                                :hide-details="errors[0] ? false : true"
                                outlined
                                v-model="data.office_type"
                                :items="officeType"
                                item-text="value_bn"
                                item-value="id"
                                :label="
                          $t(
                            'container.system_config.demo_graphic.user.office_type'
                          )
                        "
                                :error="errors[0] ? true : false"
                                :error-messages="errors[0]"
                            ></v-autocomplete>
                          </ValidationProvider>
                        </v-col>

                        <v-col
                            lg="3"
                            md="3"
                            cols="12"
                            v-if="
                      data.office_type == 6 ||
                      data.office_type == 7 ||
                      data.office_type == 8 ||
                      data.office_type == 9 ||
                      data.office_type == 10 ||
                      data.office_type == 11 ||
                      data.office_type == 35
                    "
                        >
                          <ValidationProvider
                              name="Division"
                              vid="division"
                              rules=""
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
                                :error="errors[0] ? true : false"
                                :error-messages="errors[0]"
                            ></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <v-col
                            lg="3"
                            md="3"
                            cols="12"
                            v-if="
                      data.office_type == 7 ||
                      data.office_type == 8 ||
                      data.office_type == 9 ||
                      data.office_type == 10 ||
                      data.office_type == 11 ||
                      data.office_type == 35
                    "
                        >
                          <ValidationProvider
                              name="District"
                              vid="district"
                              rules=""
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
                                :error="errors[0] ? true : false"
                                :error-messages="errors[0]"
                            ></v-autocomplete>
                          </ValidationProvider>
                        </v-col>


                        <v-col
                            lg="3"
                            md="3"
                            cols="12"
                            v-if="data.office_type == 35"
                        >
                          <ValidationProvider
                              name="union"
                              vid="paurashava_id"
                              rules=""
                              v-slot="{ errors }"
                          >
                            <v-autocomplete
                                :hide-details="errors[0] ? false : true"
                                @input="onChangeDistrictPauroshava($event)"
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
                                :error="errors[0] ? true : false"
                                :error-messages="errors[0]"
                            ></v-autocomplete>
                          </ValidationProvider>
                        </v-col>

                        <v-col
                            lg="3"
                            md="3"
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
                              rules=""
                              v-slot="{ errors }"
                          >
                            <!--                      add modal, office-->
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
                                :error="errors[0] ? true : false"
                                :error-messages="errors[0]"
                            ></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <v-col lg="3" md="3" cols="12" v-if="data.office_type == 9">
                          <ValidationProvider
                              name="city"
                              vid="city_corpo_id"
                              rules=""
                              v-slot="{ errors }"
                          >
                            <v-autocomplete
                                :hide-details="errors[0] ? false : true"
                                v-model="data.city_corpo_id"
                                @input="onChangeCity($event)"
                                outlined
                                :label="
                          $t('container.system_config.demo_graphic.office.city')
                        "
                                :items="city"
                                item-text="name_en"
                                item-value="id"
                                :error="errors[0] ? true : false"
                                :error-messages="errors[0]"
                            ></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <v-col
                            lg="3"
                            md="3"
                            cols="12"
                            v-if="
                      data.office_type == 4 ||
                      data.office_type == 5 ||
                      data.office_type == 6 ||
                      data.office_type == 7 ||
                      data.office_type == 8 ||
                      data.office_type == 9 ||
                      data.office_type == 8 ||
                      data.office_type == 10 ||
                      data.office_type == 11 ||
                      data.office_type == 35
                    "
                        >
                          <ValidationProvider
                              name="office"
                              vid="office_id"
                              rules=""
                              v-slot="{ errors }"
                          >
                            <v-autocomplete
                                :hide-details="errors[0] ? false : true"
                                v-model="data.office_id"
                                outlined
                                @input="onChangeOffice($event)"
                                :label="
                          $t(
                            'container.system_config.demo_graphic.user.office_id'
                          )
                        "
                                :items="offices"
                                item-text="name_en"
                                item-value="id"
                                :error="errors[0] ? true : false"
                                :error-messages="errors[0]"
                            ></v-autocomplete>
                          </ValidationProvider>
                        </v-col>

                        <v-col
                            lg="3"
                            md="3"
                            cols="12"
                            v-if="
                      data.office_type == 9 ||
                      data.office_type == 10
                    "
                        >
                          <ValidationProvider
                              name="Ward"
                              vid="office_ward_id"
                              rules=""
                              v-slot="{ errors }"
                          >
                            <v-autocomplete
                                :hide-details="errors[0] ? false : true"
                                v-model="data.office_ward_id"
                                outlined
                                :label="
                          $t(
                            'container.system_config.demo_graphic.user.ward'
                          )
                        "
                                :items="officeWards"
                                item-text="name_en"
                                item-value="id"
                                multiple
                                :error="errors[0] ? true : false"
                                :error-messages="errors[0]"
                            ></v-autocomplete>
                          </ValidationProvider>
                        </v-col>


<!--                        committee type-->
                        <v-col lg="3" md="3" cols="12" v-if="data.user_type === 2">
                          <ValidationProvider
                              name="CommitteeType"
                              vid="committee_type"
                              rules=""
                              v-slot="{ errors }"
                          >
                            <v-autocomplete
                                :hide-details="errors[0] ? false : true"
                                @input="onChangeCommitteeType"
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
                                :error="errors[0] ? true : false"
                                :error-messages="errors[0]"
                            ></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <v-col
                            lg="3"
                            md="3"
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
                              rules=""
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
                                :error="errors[0] ? true : false"
                                :error-messages="errors[0]"
                            ></v-autocomplete>
                          </ValidationProvider>
                        </v-col>

                        <v-col
                            lg="3"
                            md="3"
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
                              rules=""
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
                                :error="errors[0] ? true : false"
                                :error-messages="errors[0]"
                            ></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <v-col
                            lg="3"
                            md="3"
                            cols="12"
                            v-if="
                      data.committee_type == 12 ||
                      data.committee_type == 14
                    "
                        >
                          <ValidationProvider
                              name="Upazila"
                              vid="upazila"
                              rules=""
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
                                :error="errors[0] ? true : false"
                                :error-messages="errors[0]"
                            ></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <v-col
                            lg="3"
                            md="3"
                            cols="12"
                            v-if="
                      data.committee_type == 13 || data.committee_type == 15
                    "
                        >
                          <ValidationProvider
                              name="city"
                              vid="city_corpo_id"
                              rules=""
                              v-slot="{ errors }"
                          >
                            <v-autocomplete
                                :hide-details="errors[0] ? false : true"
                                v-model="data.city_corpo_id"
                                @input="onChangeCity($event)"
                                outlined
                                :label="
                          $t('container.system_config.demo_graphic.office.city')
                        "
                                :items="city"
                                item-text="name_en"
                                item-value="id"
                                :error="errors[0] ? true : false"
                                :error-messages="errors[0]"
                            ></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <v-col
                            lg="3"
                            md="3"
                            cols="12"
                            v-if="
                      data.committee_type == 13
                      //   || data.committee_type == 14
                    "
                        >
                          <ValidationProvider
                              name="thana"
                              vid="thana_id"
                              rules=""
                              v-slot="{ errors }"
                          >
                            <!--                      add modal, committee-->
                            <v-autocomplete
                                :hide-details="errors[0] ? false : true"
                                @input="onChangeThana($event)"
                                v-model="data.thana_id"
                                outlined
                                :label="
                          $t(
                            'container.system_config.demo_graphic.committee.thana'
                          )
                        "
                                :items="thanas"
                                item-text="name_en"
                                item-value="id"
                                :error="errors[0] ? true : false"
                                :error-messages="errors[0]"
                            ></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <v-col
                            lg="3"
                            md="3"
                            cols="12"
                            v-if="data.committee_type == 12"
                        >
                          <ValidationProvider
                              name="union"
                              vid="union_id"
                              rules=""
                              v-slot="{ errors }"
                          >
                            <v-autocomplete
                                :hide-details="errors[0] ? false : true"
                                @input="onChangeUnion($event)"
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
                                :error="errors[0] ? true : false"
                                :error-messages="errors[0]"
                            ></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <v-col
                            lg="3"
                            md="3"
                            cols="12"
                            v-if="data.committee_type == 16"
                        >
                          <ValidationProvider
                              name="union"
                              vid="paurashava_id"
                              rules=""
                              v-slot="{ errors }"
                          >
                            <v-autocomplete
                                :hide-details="errors[0] ? false : true"
                                @input="onChangeDistrictPauroshava($event)"
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
                                :error="errors[0] ? true : false"
                                :error-messages="errors[0]"
                            ></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <v-col
                            lg="3"
                            md="3"
                            cols="12"
                            v-if="data.committee_type == 13"
                        >
                          <ValidationProvider
                              name="ward"
                              vid="ward_id"
                              rules=""
                              v-slot="{ errors }"
                          >
                            <v-autocomplete
                                :hide-details="errors[0] ? false : true"
                                @input="onChangeWard($event)"
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
                                :error="errors[0] ? true : false"
                                :error-messages="errors[0]"
                            ></v-autocomplete>
                          </ValidationProvider>
                        </v-col>

                        <v-col
                            lg="3"
                            md="3"
                            cols="12"
                            v-if="data.committee_type"
                        >
                          <ValidationProvider
                              name="committee"
                              vid="committee_id"
                              rules=""
                              v-slot="{ errors }"
                          >
                            <v-autocomplete
                                :hide-details="errors[0] ? false : true"
                                v-model="data.committee_id"
                                outlined
                                :label="
                          $t(
                            'container.system_config.demo_graphic.committee.committee'
                          )
                        "
                                :items="committees"
                                item-text="name"
                                item-value="id"
                                :error="errors[0] ? true : false"
                                :error-messages="errors[0]"
                            ></v-autocomplete>
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
                                  ref="datePicker"
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
                  {{
                    $t("container.system_config.demo_graphic.user.listTitle")
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
                      @keyup.native="getUsers"
                      outlined
                      dense
                      v-model="search"
                      prepend-inner-icon="mdi-magnify"
                      class="my-sm-0 my-3 mx-0v -input--horizontal ml-3"
                      variant="outlined"
                      :label="
                        $t('container.system_config.demo_graphic.user.search')
                      "
                      hide-details
                      color="primary"
                    >
                    </v-text-field>
                  </div>

                  <v-col lg="4" md="6" cols="12" class="text-right">
                    <v-btn elevation="2" class="btn mr-2 white--text" color="red darken-4" @click="GeneratePdf()">
                      <v-icon class="pr-1"> mdi-tray-arrow-down </v-icon> {{ $t("container.list.PDF") }}
                    </v-btn>
                    <v-btn elevation="2" class="btn mr-2 white--text" color="teal darken-2" @click="GenerateExcel()">
                      <v-icon class="pr-1"> mdi-tray-arrow-down </v-icon>
                      {{ $t("container.list.excel") }}
                    </v-btn>
                  </v-col>

                  <v-btn
                    @click="createDialog"
                    color="primary"
                    prepend-icon="mdi-account-multiple-plus"
                    v-can="'user-create'"
                  >
                    {{ $t("container.list.add_new") }}
                  </v-btn>

                    <v-col cols="12">
                      {{ $t('container.list.total') }}:&nbsp;<span style="font-weight: bold;">{{ $i18n.locale == 'en' ? this.pagination.grand_total : $helpers.englishToBangla(this.pagination.grand_total)  }}</span>
                    </v-col>



                  <v-col cols="12">
                    <v-data-table
                      :loading="loading"
                      item-key="id"
                      :headers="headers"
                      :items="users"
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
                      <template v-slot:item.status="{ item }">
                        <v-chip
                          :color="userStatus[item.status]"
                          dark
                          small
                          class="white--text"
                        >
                          <span v-if="item.status==0">{{$t("container.system_config.demo_graphic.user.unapproved")}}</span>
                          <span v-if="item.status==1">{{$t("container.system_config.demo_graphic.user.active")}}</span>
                          <span v-if="item.status==2">{{$t("container.system_config.demo_graphic.user.banned")}}</span>
                          <span v-if="item.status==5">{{$t("container.system_config.demo_graphic.user.inactive")}}</span>
                        </v-chip>
                      </template>

                      <template v-slot:[`item.active`]="{item}">
                      <span>
                           <v-switch :input-value="item.status == 1"
                                     @change="changeStatus(item.id, item.status)"
                                     hide-details color="orange darken-3"></v-switch>
                      </span>
                      </template>


                      <template v-slot:item.assign_location.name_en="{ item }">
                        {{item?.assign_location?.name_en}}
                      </template>

                      <template v-slot:item.office.name_en="{ item }">
                        <p v-if="item.committee_id">{{item?.committee?.name}}</p>
                        <p v-else>{{item?.office?.name_en}}</p>
                      </template>

                      <!-- Action Button -->
                      <template v-slot:item.actions="{ item }">
                        <v-tooltip top>
                          <template v-slot:activator="{ on }">
                            <v-btn
                              v-can="'user-edit'"
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




<!--                        <v-tooltip top v-if="!item.status">
                          <template v-slot:activator="{ on }">
                            <v-btn
                                v-can="'user-edit'"
                                fab
                                x-small
                                v-on="on"
                                color="primary"
                                elevation="0"
                                @click="approveAlert(item.id)"
                            >
                              <v-icon> mdi-account-check</v-icon>
                            </v-btn>
                          </template>
                          <span>
                            {{ $t("container.list.approve") }}
                          </span>
                        </v-tooltip>-->


<!--                        <v-tooltip top>
                          <template v-slot:activator="{ on }">
                            <v-btn
                                :disabled="item.user_type == 1"
                                v-can="'user-delete'"
                                fab
                                x-small
                                v-on="on"
                                color="red"
                                class="ml-3 white&#45;&#45;text"
                                elevation="0"
                                @click="deleteAlert(item.id)"
                            >
                              <v-icon> mdi-delete </v-icon>
                            </v-btn>
                          </template>
                          <span> {{ $t("container.list.delete") }}</span>
                        </v-tooltip>-->

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

      <!-- user add modal  -->
      <v-dialog v-model="dialogAdd" width="650">
        <v-card style="justify-content: center; text-align: center">
          <v-card-title class="font-weight-bold justify-center">
            {{ $t("container.system_config.demo_graphic.user.add_new") }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="mt-7">
            <ValidationObserver ref="formAdd" v-slot="{ invalid }">
              <form @submit.prevent="submitUser()">
                <v-row>
                  <v-col lg="6" md="6" cols="12">
                    <ValidationProvider
                      name="Full Name"
                      vid="full_name"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        :hide-details="errors[0] ? false : true"
                        outlined
                        type="text"
                        v-model="data.full_name"
                        :label="
                          $t(
                            'container.system_config.demo_graphic.user.full_name'
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
                      name="Username"
                      vid="username"
                      rules="checkUsername"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        :hide-details="errors[0] ? false : true"
                        outlined
                        type="text"
                        v-model="data.username"
                        :label="
                          $t(
                            'container.system_config.demo_graphic.user.username'
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
                      name="Mobile Number"
                      vid="mobile"
                      rules="checkPhoneNumber"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        :hide-details="errors[0] ? false : true"
                        outlined
                        type="text"
                        v-model="data.mobile"
                        :label="
                          $t('container.system_config.demo_graphic.user.mobile')
                        "
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="6" md="6" cols="12">
                    <ValidationProvider
                      name="Email"
                      vid="email"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        :hide-details="errors[0] ? false : true"
                        outlined
                        type="text"
                        v-model="data.email"
                        :label="
                          $t('container.system_config.demo_graphic.user.email')
                        "
                        required
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="6" md="6" cols="12">
                    <ValidationProvider
                        name="UserType"
                        vid="userType_id"
                        rules="required"
                        v-slot="{ errors }"
                    >
                      <v-autocomplete
                          :hide-details="errors[0] ? false : true"
                          @input="onChangeUserType($event)"
                          v-model="data.user_type"
                          outlined
                          :label="
                          $t(
                            'container.system_config.demo_graphic.user.user_type'
                          )
                        "
                          :items="userType"
                          item-text="name_en"
                          item-value="id"
                          required
                          :error="errors[0] ? true : false"
                          :error-messages="errors[0]"
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
<!--                  <v-col lg="6" md="6" cols="12">
                    <ValidationProvider
                        name="Status"
                        vid="status"
                        rules="required"
                        v-slot="{ errors }"
                    >
                      <v-select
                          :hide-details="errors[0] ? false : true"
                          outlined
                          v-model="data.status"
                          :items="[
                          { text: 'Active', value: 1 },
                          { text: 'Inactive', value: 0 },
                        ]"
                          item-text="text"
                          item-value="value"
                          :label="
                          $t('container.system_config.demo_graphic.user.status')
                        "
                          required
                          :error="errors[0] ? true : false"
                          :error-messages="errors[0]"
                      ></v-select>
                    </ValidationProvider>
                  </v-col>-->
                  <v-col lg="6" md="6" cols="12" v-if="data.user_type === 1">
                    <ValidationProvider
                      name="Role"
                      vid="role_id"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-autocomplete
                        multiple
                        :hide-details="errors[0] ? false : true"
                        outlined
                        v-model="data.role_id"
                        :items="roles"
                        item-text="name"
                        item-value="id"
                        :label="
                          $t(
                            'container.system_config.demo_graphic.user.role_id'
                          )
                        "
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>


                  <!-- CommitteeTypes Dropdowns -->
                  <v-col lg="6" md="6" cols="12" v-if="data.user_type === 2">
                    <ValidationProvider
                      name="CommitteeType"
                      vid="committee_type"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-autocomplete
                        :hide-details="errors[0] ? false : true"
                        @input="onChangeCommitteeType"
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
                  v-if="[12, 13, 14, 15, 16, 17].includes(data.committee_type)"
                ><h4>DSS Center</h4></v-card-title>
                <v-divider
                  v-if="[12, 13, 14, 15, 16, 17].includes(data.committee_type)"
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
                      data.committee_type == 12 ||
                      data.committee_type == 14
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
                        @input="onChangeCity($event)"
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
<!--                      add modal, committee-->
                      <v-autocomplete
                        :hide-details="errors[0] ? false : true"
                        @input="onChangeThana($event)"
                        v-model="data.thana_id"
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
                        @input="onChangeUnion($event)"
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
                        @input="onChangeDistrictPauroshava($event)"
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
                        @input="onChangeWard($event)"
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

                  <v-col
                      lg="6"
                      md="6"
                      cols="12"
                      v-if="data.committee_type"
                  >
                    <ValidationProvider
                        name="committee"
                        vid="committee_id"
                        rules="required"
                        v-slot="{ errors }"
                    >
                      <v-autocomplete
                          :hide-details="errors[0] ? false : true"
                          v-model="data.committee_id"
                          outlined
                          :label="
                          $t(
                            'container.system_config.demo_graphic.committee.committee'
                          )
                        "
                          :items="committees"
                          item-text="name"
                          item-value="id"
                          required
                          :error="errors[0] ? true : false"
                          :error-messages="errors[0]"
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>

                  <!-- END Committee Dropdowns -->


                  <!--  OfficeType Dropdowns -->

                  <v-col cols="12" v-if="data.user_type === 1">
                    <ValidationProvider
                      name="Office Type"
                      vid="office_type"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-autocomplete
                        @input="onChangeOfficeType($event)"
                        :hide-details="errors[0] ? false : true"
                        outlined
                        v-model="data.office_type"
                        :items="officeType"
                        item-text="value_bn"
                        item-value="id"
                        :label="
                          $t(
                            'container.system_config.demo_graphic.user.office_type'
                          )
                        "
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
                      data.office_type == 6 ||
                      data.office_type == 7 ||
                      data.office_type == 8 ||
                      data.office_type == 9 ||
                      data.office_type == 10 ||
                      data.office_type == 11 ||
                      data.office_type == 35
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
                      data.office_type == 11 ||
                      data.office_type == 35
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
                      v-if="data.office_type == 35"
                  >
                    <ValidationProvider
                        name="union"
                        vid="paurashava_id"
                        rules="required"
                        v-slot="{ errors }"
                    >
                      <v-autocomplete
                          :hide-details="errors[0] ? false : true"
                          @input="onChangeDistrictPauroshava($event)"
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
<!--                      add modal, office-->
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
                        @input="onChangeCity($event)"
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
                  <v-col
                    lg="6"
                    md="6"
                    cols="12"
                    v-if="
                      data.office_type == 4 ||
                      data.office_type == 5 ||
                      data.office_type == 6 ||
                      data.office_type == 7 ||
                      data.office_type == 8 ||
                      data.office_type == 9 ||
                      data.office_type == 8 ||
                      data.office_type == 10 ||
                      data.office_type == 11 ||
                      data.office_type == 35
                    "
                  >
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
                        @input="onChangeOffice($event)"
                        :label="
                          $t(
                            'container.system_config.demo_graphic.user.office_id'
                          )
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

                  <v-col
                    lg="6"
                    md="6"
                    cols="12"
                    v-if="
                      data.office_type == 9 ||
                      data.office_type == 10
                    "
                  >
                    <ValidationProvider
                      name="Ward"
                      vid="office_ward_id"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-autocomplete
                        :hide-details="errors[0] ? false : true"
                        v-model="data.office_ward_id"
                        outlined
                        :label="
                          $t(
                            'container.system_config.demo_graphic.user.ward'
                          )
                        "
                        :items="officeWards"
                        item-text="name_en"
                        item-value="id"
                        multiple
                        :error="errors[0] ? true : false"
                        :error-messages="errors[0]"
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                </v-row>

                <v-row class="mx-0 my-0 py-2" justify="center">
                  <v-btn
                    @click="dialogAdd = false"
                    outlined
                    class="custom-btn-width py-2 mr-10"
                  >
                    {{ $t("container.list.cancel") }}
                  </v-btn>
                  <v-btn
                    type="submit"
                    color="primary"
                    :disabled="invalid"
                    :loading="loading"
                    class="custom-btn-width warning white--text py-2"
                  >
                    {{ $t("container.list.submit") }}
                  </v-btn>
                </v-row>
              </form>
            </ValidationObserver>
          </v-card-text>
        </v-card>
      </v-dialog>
      <!-- user add modal  -->

      <!-- user edit modal  -->
      <v-dialog v-model="dialogEdit" width="650">
        <v-card style="justify-content: center; text-align: center">
          <v-card-title class="font-weight-bold justify-center">
            {{ $t("container.system_config.demo_graphic.user.edit") }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="mt-7">
            <ValidationObserver ref="formEdit" v-slot="{ invalid }">
              <form @submit.prevent="updateUser()">
                <v-row>
                  <v-col lg="6" md="6" cols="12">
                    <ValidationProvider
                        name="Full Name"
                        vid="full_name"
                        rules="required"
                        v-slot="{ errors }"
                    >
                      <v-text-field
                          :hide-details="errors[0] ? false : true"
                          outlined
                          type="text"
                          v-model="data.full_name"
                          :label="
                          $t(
                            'container.system_config.demo_graphic.user.full_name'
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
                        name="Username"
                        vid="username"
                        rules="checkUsername"
                        v-slot="{ errors }"
                    >
                      <v-text-field
                          :hide-details="errors[0] ? false : true"
                          outlined
                          type="text"
                          v-model="data.username"
                          :label="
                          $t(
                            'container.system_config.demo_graphic.user.username'
                          )
                        "
                          required
                          :error="errors[0] ? true : false"
                          :error-messages="errors[0]"
                          :readonly="true"
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="6" md="6" cols="12">
                    <ValidationProvider
                        name="Mobile Number"
                        vid="mobile"
                        rules="checkPhoneNumber"
                        v-slot="{ errors }"
                    >
                      <v-text-field
                          :hide-details="errors[0] ? false : true"
                          outlined
                          type="text"
                          v-model="data.mobile"
                          :label="
                          $t('container.system_config.demo_graphic.user.mobile')
                        "
                          required
                          :error="errors[0] ? true : false"
                          :error-messages="errors[0]"
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="6" md="6" cols="12">
                    <ValidationProvider
                        name="Email"
                        vid="email"
                        rules="required"
                        v-slot="{ errors }"
                    >
                      <v-text-field
                          :hide-details="errors[0] ? false : true"
                          outlined
                          type="text"
                          v-model="data.email"
                          :label="
                          $t('container.system_config.demo_graphic.user.email')
                        "
                          required
                          :error="errors[0] ? true : false"
                          :error-messages="errors[0]"
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="6" md="6" cols="12">
                    <ValidationProvider
                        name="UserType"
                        vid="userType_id"
                        rules="required"
                        v-slot="{ errors }"
                    >
                      <v-autocomplete
                          :hide-details="errors[0] ? false : true"
                          @input="onChangeUserType($event)"
                          v-model="data.user_type"
                          outlined
                          :label="
                          $t(
                            'container.system_config.demo_graphic.user.user_type'
                          )
                        "
                          :items="userType"
                          item-text="name_en"
                          item-value="id"
                          required
                          :error="errors[0] ? true : false"
                          :error-messages="errors[0]"
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
<!--                  <v-col lg="6" md="6" cols="12">
                    <ValidationProvider
                        name="Status"
                        vid="status"
                        rules="required"
                        v-slot="{ errors }"
                    >
                      <v-select
                          :hide-details="errors[0] ? false : true"
                          outlined
                          v-model="data.status"
                          :items="[
                          { text: 'Active', value: 1 },
                          { text: 'Inactive', value: 0 },
                        ]"
                          item-text="text"
                          item-value="value"
                          :label="
                          $t('container.system_config.demo_graphic.user.status')
                        "
                          required
                          :error="errors[0] ? true : false"
                          :error-messages="errors[0]"
                      ></v-select>
                    </ValidationProvider>
                  </v-col>-->
                  <v-col lg="6" md="6" cols="12" v-if="data.user_type === 1">
                    <ValidationProvider
                        name="Role"
                        vid="role_id"
                        rules="required"
                        v-slot="{ errors }"
                    >
                      <v-autocomplete
                          multiple
                          :hide-details="errors[0] ? false : true"
                          outlined
                          v-model="data.role_id"
                          :items="roles"
                          item-text="name"
                          item-value="id"
                          :label="
                          $t(
                            'container.system_config.demo_graphic.user.role_id'
                          )
                        "
                          :error="errors[0] ? true : false"
                          :error-messages="errors[0]"
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>


                  <!-- CommitteeTypes Dropdowns -->
                  <v-col lg="6" md="6" cols="12" v-if="data.user_type === 2">
                    <ValidationProvider
                        name="CommitteeType"
                        vid="committee_type"
                        rules="required"
                        v-slot="{ errors }"
                    >
                      <v-autocomplete
                          :hide-details="errors[0] ? false : true"
                          @input="onChangeCommitteeType"
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
                    v-if="[12, 13, 14, 15, 16, 17].includes(data.committee_type)"
                ><h4>DSS Center</h4></v-card-title>
                <v-divider
                    v-if="[12, 13, 14, 15, 16, 17].includes(data.committee_type)"
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
                      data.committee_type == 12 ||
                      data.committee_type == 14
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
                          @input="onChangeCity($event)"
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
<!--                      Edit, city corp, load thana-->
                      <v-autocomplete
                          :hide-details="errors[0] ? false : true"
                          @input="onChangeThana($event)"
                          v-model="data.thana_id"
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
                          @input="onChangeUnion($event)"
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
                          @input="onChangeDistrictPauroshava($event)"
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
                          @input="onChangeWard($event)"
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

                  <v-col
                      lg="6"
                      md="6"
                      cols="12"
                      v-if="data.committee_type"
                  >
                    <ValidationProvider
                        name="committee"
                        vid="committee_id"
                        rules="required"
                        v-slot="{ errors }"
                    >
                      <v-autocomplete
                          :hide-details="errors[0] ? false : true"
                          v-model="data.committee_id"
                          outlined
                          :label="
                          $t(
                            'container.system_config.demo_graphic.committee.committee'
                          )
                        "
                          :items="committees"
                          item-text="name"
                          item-value="id"
                          required
                          :error="errors[0] ? true : false"
                          :error-messages="errors[0]"
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>

                  <!-- END Committee Dropdowns -->


                  <v-col cols="12" v-if="data.user_type === 1">
                    <ValidationProvider
                        name="Office Type"
                        vid="office_type"
                        rules="required"
                        v-slot="{ errors }"
                    >
                      <v-autocomplete
                          @input="onChangeOfficeType($event)"
                          :hide-details="errors[0] ? false : true"
                          outlined
                          v-model="data.office_type"
                          :items="officeType"
                          item-text="value_bn"
                          item-value="id"
                          :label="
                          $t(
                            'container.system_config.demo_graphic.user.office_type'
                          )
                        "
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
                      data.office_type == 6 ||
                      data.office_type == 7 ||
                      data.office_type == 8 ||
                      data.office_type == 9 ||
                      data.office_type == 10 ||
                      data.office_type == 11 ||
                      data.office_type == 35
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
                      data.office_type == 11 ||
                      data.office_type == 35
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
<!--                      Edit, office, ucd-->
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
                          @input="onChangeCity($event)"
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


                  <v-col
                      lg="6"
                      md="6"
                      cols="12"
                      v-if="data.office_type == 35"
                  >
                    <ValidationProvider
                        name="union"
                        vid="paurashava_id"
                        rules="required"
                        v-slot="{ errors }"
                    >
                      <v-autocomplete
                          :hide-details="errors[0] ? false : true"
                          @input="onChangeDistrictPauroshava($event)"
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
                      v-if="
                      data.office_type == 4 ||
                      data.office_type == 5 ||
                      data.office_type == 6 ||
                      data.office_type == 7 ||
                      data.office_type == 8 ||
                      data.office_type == 9 ||
                      data.office_type == 8 ||
                      data.office_type == 10 ||
                      data.office_type == 11 ||
                      data.office_type == 35
                    "
                  >
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
                          @input="onChangeOffice($event)"
                          :label="
                          $t(
                            'container.system_config.demo_graphic.user.office_id'
                          )
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


                  <v-col
                      lg="6"
                      md="6"
                      cols="12"
                      v-if="
                      data.office_type == 9 ||
                      data.office_type == 10
                    "
                  >
                    <ValidationProvider
                        name="Ward"
                        vid="office_ward_id"
                        rules="required"
                        v-slot="{ errors }"
                    >
                      <v-autocomplete
                          :hide-details="errors[0] ? false : true"
                          v-model="data.office_ward_id"
                          outlined
                          :label="
                          $t(
                            'container.system_config.demo_graphic.user.ward'
                          )
                        "
                          :items="officeWards"
                          item-text="name_en"
                          item-value="id"
                          multiple
                          :error="errors[0] ? true : false"
                          :error-messages="errors[0]"
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>

                </v-row>

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
                      :disabled="invalid"
                      :loading="loading"
                      class="custom-btn-width warning white--text py-2"
                  >
                    {{ $t("container.list.submit") }}
                  </v-btn>
                </v-row>
              </form>
            </ValidationObserver>
          </v-card-text>
        </v-card>
      </v-dialog>
      <!-- user edit modal  -->

      <!-- delete modal  -->
      <v-dialog v-model="deleteDialog" width="350">
        <v-card style="justify-content: center; text-align: center">
          <v-card-title class="font-weight-bold justify-center">
            {{ $t("container.system_config.demo_graphic.user.delete") }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <div class="subtitle-1 font-weight-medium mt-5">
              {{ $t("container.system_config.demo_graphic.user.delete_alert") }}
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
                @click="deleteUser()"
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


      <!-- Approve modal  -->
      <v-dialog v-model="approveDialog" width="350">
        <v-card style="justify-content: center; text-align: center">
          <v-card-title class="font-weight-bold justify-center">
            {{ $t("container.system_config.demo_graphic.user.approve") }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <div class="subtitle-1 font-weight-medium mt-5">
              {{ $t("container.system_config.demo_graphic.user.approve_alert") }}
            </div>
          </v-card-text>
          <v-card-actions style="display: block">
            <v-row class="mx-0 my-0 py-2" justify="center">
              <v-btn
                  text
                  @click="cancelApprove()"
                  outlined
                  class="custom-btn-width py-2 mr-10"
              >
                {{ $t("container.list.cancel") }}
              </v-btn>
              <v-btn
                  text
                  @click="callChangeStatusApi(data.id)"
                  color="white"
                  :loading="delete_loading"
                  class="custom-btn-width warning white--text py-2"
              >
                {{ $t("container.list.approve") }}
              </v-btn>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- Approve modal  -->
    </v-row>
  </div>
</template>
  
  <script>
import { mapState } from "vuex";
import { extend, ValidationProvider, ValidationObserver } from "vee-validate";
import { required } from "vee-validate/dist/rules";
import PermissionBadge from "../../../../components/BeneficiaryManagement/Committee/PermissionBadge.vue";
import Spinner from "@/components/Common/Spinner.vue";

extend("required", required);


extend("checkUsername", {
  validate: (value) => {
    if (!value && value !== 0) {
      return false;
    }
    // Check if all characters are numeric and not allow special characters
    const isValid = /^[a-z][a-z0-9._]*$/.test(value);

    // Return true if both conditions are met
    return isValid;
  },
  message: "Username should be in lowercase and without any special character",
});

extend("checkPhoneNumber", {
  validate: (value) => {
    if (!value && value !== 0) {
      return false;
    }
    // Check if all characters are numeric and not allow special characters
    const isValid = /^01[3-9]\d{8}$/.test(value);

    // Return true if both conditions are met
    return isValid;
  },
  message: "Enter a valid number eg. 017xxxxxxxx",
});

export default {
  name: "Index",
  title: "CTM - User Management",
  data() {
    return {
      data: {
        id: null,
        full_name: null,
        user_type: null,
        username: null,
        mobile: null,
        email: null,
        role_id: [],
        status: 0,
        office_type: null,
        office_id: null,
        division_id: null,
        district_id: null,
        upazila_id: null,
        thana_id: null,
        union_id: null,
        paurashava_id: null,
        ward_id: null,
        city_corpo_id: null,
        committee_type: null,
        committee_id: null,
        office_ward_id: []
      },

      userStatus: {
        0: 'grey',
        1: 'success',
        2: 'error',
        5: 'warning',
      },

      isDistrictHidden: true,
      isLocationTypeHidden: true,
      isCityCorporationHidden: false,
      dialogAdd: false,
      deleteDialog: false,
      approveDialog: false,
      dialogEdit: false,
      delete_loading: false,
      loading: false,
      search: "",
      delete_id: "",
      offices: [],
      divisions: [],
      districts: [],
      upazilas: [],
      city: [],
      thanas: [],
      unions: [],
      wards: [],
      roles: [],
      users: [],
      Allusers: [],
      committees: [],
      officeWards: [],
      userType_id: null,
      userType: [
        {
          id: 1,
          name_en: "Office User",
        },
        {
          id: 2,
          name_en: "Committee User",
        },
      ],
      officeType: [],
      pagination: {
        current: 1,
        total: 0,
        perPage: 10,
      },
      items: [5, 10, 15, 20, 40, 50, 100],
      isLoading: false,
      menu: false,
      dates: [],
    };
  },
  components: {
    PermissionBadge,
    ValidationProvider,
    ValidationObserver,
    Spinner,
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
          text: this.$t("container.system_config.demo_graphic.user.full_name"),
          value: "full_name",
        },
        {
          text: this.$t("container.system_config.demo_graphic.user.username"),
          value: "username",
        },
        {
          text: this.$t("container.system_config.demo_graphic.user.user_id"),
          value: "user_id",
        },
        {
          text: this.$t("container.system_config.demo_graphic.user.email_label"),
          value: "email",
        },
        {
          text: this.$t("container.system_config.demo_graphic.user.mobile_label"),
          value: "mobile",
        },
        {
          text: this.$t("container.system_config.demo_graphic.user.office_committee"),
          value: "office.name_en",
        },
        {
          text: this.$t("container.system_config.demo_graphic.user.location"),
          value: "assign_location.name_en",
        },
        {
          text: this.$t("container.system_config.demo_graphic.user.status"),
          value: "status",
        },
        {
          text: this.$t("container.system_config.demo_graphic.user.active"),
          value: "active",
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
      // divisions: (state) => state.Division.divisions,
    }),
  },

  methods: {

    onSearch() {
      this.loading = false;
      this.pagination = {
        ...this.pagination,
        current: 1,
      };
      this.getUsers()
    },

    resetSearch(){
      this.data.user_type = null,
      this.data.office_type = null,
      this.data.office_id = null,
      this.data.division_id = null,
      this.data.district_id = null,
      this.data.upazila_id = null,
      this.data.thana_id = null,
      this.data.union_id = null,
      this.data.paurashava_id = null,
      this.data.ward_id = null,
      this.data.city_corpo_id = null,
      this.data.committee_type = null,
      this.data.committee_id = null,
      this.data.office_ward_id = null,
          this.resetDateRange(),
      this.getUsers()

    },

    resetDateRange() {
      this.dates = [];
      this.$refs.menu.save();
    },

    async GeneratePdf(){

      const queryParams = {
        searchText: this.search,
        perPage: this.search.trim() === '' ? this.pagination.grand_total : this.pagination.grand_total,
        page: 1,
        user_id: this.$store.state.userData.id,
      };
      await this.$axios
          .get("/admin/user/get", {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
            params: queryParams,
          })
          .then((result) => {
            this.Allusers = result.data.data;
          })
          .catch((err) => {
            console.log(err, "error");
          });


      const HeaderInfo = [
        this.$t("container.list.sl"),
        this.$t("container.system_config.demo_graphic.user.user_id"),
        this.$t("container.system_config.demo_graphic.user.user_type"),
        this.$t("container.system_config.demo_graphic.user.login_id"),
        this.$t("container.system_config.demo_graphic.user.office_committee"),
        this.$t("container.system_config.demo_graphic.user.role"),
        this.$t("container.system_config.demo_graphic.user.mobile_label"),
      ]

      const OBJ = this.Allusers;

      const CustomInfo = OBJ.map((((i,index) => {
        const roleNames = i.roles.map(role => this.$i18n.locale == 'en' ? role.name_en : role.name_bn);
        const joinedRoleNames = roleNames.join(', ');
        return [
          this.$i18n.locale == 'en' ? index + 1 : this.$helpers.englishToBangla(index + 1),
          this.$i18n.locale == 'en' ? i.user_id : this.$helpers.englishToBangla(i.user_id),
          i.user_type == 1 ? "Super Admin" : "General",
          i.username,
          i.committee?.name ?? i.office?.name,
          joinedRoleNames,
          this.$i18n.locale == 'en' ? i.mobile : this.$helpers.englishToBangla(i.mobile),
        ]
      })));

      const queryParam = {
        language: this.$i18n.locale,
        data:CustomInfo,
        header:HeaderInfo,
        fileName:this.$t("container.system_config.demo_graphic.user.listTitle"),
      };

      try {
        const response = await this.$axios.post("/admin/generate-pdf", queryParam, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "application/json", // Set content type to JSON
          },
          responseType: 'arraybuffer',
        });

        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url, '_blank');
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        console.error('Error generating PDF:', error);
      }
    },

    async GenerateExcel(){

      // this.isLoading = true;
      const queryParams = {
        language: this.$i18n.locale,
        searchText: this.search,
        perPage: this.search.trim() === '' ? this.pagination.grand_total : this.pagination.grand_total,
        page: this.pagination.current,
        user_id: this.$store.state.userData.id,
      };
      await this.$axios
          .get("/admin/user/get", {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
            params: queryParams,
          })
          .then((result) => {
            this.Allusers = result.data.data;

            import('@/plugins/Export2Excel').then((excel) => {
              const OBJ = this.Allusers;

              const CustomInfo = OBJ.map((((i,index) => {
                const roleNames = i.roles.map(role => this.$i18n.locale == 'en' ? role.name_en : role.name_bn);
                const joinedRoleNames = roleNames.join(', ');
                return {
                  "SL": this.$i18n.locale == 'en' ? index + 1 : this.$helpers.englishToBangla(index + 1),
                  "user_id": this.$i18n.locale == 'en' ? i.user_id : this.$helpers.englishToBangla(i.user_id),
                  "user_type": i.user_type == 1 ? "Super Admin" : "General",
                  "user_name": i.username,
                  "committee": i.committee?.name ?? i.office?.name,
                  "role": joinedRoleNames,
                  "mobile": this.$i18n.locale == 'en' ? i.mobile : this.$helpers.englishToBangla(i.mobile),
                }
              })));

              const Header = [
                this.$t("container.list.sl"),
                this.$t("container.system_config.demo_graphic.user.user_id"),
                this.$t("container.system_config.demo_graphic.user.user_type"),
                this.$t("container.system_config.demo_graphic.user.login_id"),
                this.$t("container.system_config.demo_graphic.user.office_committee"),
                this.$t("container.system_config.demo_graphic.user.role"),
                this.$t("container.system_config.demo_graphic.user.mobile_label"),
              ]

              const Field = ['SL','user_id','user_type','user_name', 'committee','role','mobile']

              const Data = this.FormatJson(Field, CustomInfo)
              const currentDate = new Date().toISOString().slice(0, 10); //
              let dateinfo = queryParams.language == 'en' ? currentDate : this.$helpers.englishToBangla(currentDate)

              const filenameWithDate = `${dateinfo}_${this.$t("container.system_config.demo_graphic.user.listTitle")}`;

              excel.export_json_to_excel({
                header: Header,
                data: Data,
                sheetName: filenameWithDate,
                filename: filenameWithDate,
                autoWidth: true,
                bookType: "xlsx"
              })
            })
            this.isLoading = false;

          })
          .catch((err) => {
            console.log(err, "error");
          });

    },

    FormatJson(FilterData,JsonData){
      return JsonData.map((v) =>
          FilterData.map((j => {
            return v[j];
          })))
    },


    createDialog() {
      if (this.$refs.formAdd) {
        this.$refs.formAdd.reset();
      }
      this.resetForm();
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
        .post("/admin/user/insert", fd, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        })
        .then((res) => {

          this.$toast.success("Data Inserted Successfully");
          this.dialogAdd = false;
          this.getUsers();
          this.$refs.formAdd.reset();
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          if (err.response?.data?.errors) {
            this.$refs.formAdd.setErrors(err.response.data.errors);
            this.$toast.error(err.response.data.message);
          }
        });
    },
    updateUser() {
      this.loading = true;
      let fd = new FormData();

      for (const [key, value] of Object.entries(this.data)) {



        if (value !== null) {

          if (key != "role_id") {
            fd.append(key, value);
          } else if (this.data.user_type == 1) {
            // role_id is array so we need to append it separately
            for (let i = 0; i < value.length; i++) {
              fd.append("role_id[]", value[i]);
            }
          }
        }
      }


      this.$axios
        .post("/admin/user/update/" + this.data.id, fd, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "application/json",
            // "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        })
        .then((res) => {
          this.$toast.success("Data updated Successfully");
          this.getUsers();
          this.$refs.formEdit.reset();
          this.loading = false;
          this.dialogEdit = false;
        })
        .catch((err) => {
          this.loading = false;
          if (err.response?.data?.errors) {
            this.$refs.formEdit.setErrors(err.response.data.errors);
          }

          this.$toast.error(err.response.data.message);

        });
    },
    resetForm() {
      for (let prop in this.data) {
        this.data[prop] = null; // Set each property's value to null
        this.data.status = 0
      }
    },


    editDialog(item) {
      if (this.$refs.formEdit) {
        this.$refs.formEdit.reset();
      }
      this.dialogEdit = true;
      this.data.id = item.id;
      this.data.full_name = item.full_name;
      this.data.username = item.username;
      this.data.mobile = item.mobile;
      this.data.email = item.email;
      this.data.user_type = item.office_type ? 1 : 2;

      this.data.status = item.status


      if (this.data.user_type == 2) {
        this.data.office_type = null
        this.data.committee_type = item.committee_type_id
      } else {
        this.data.committee_type = null
        this.data.office_type = item.office_type
      }

      this.data.role_id = [];
      item.roles.forEach((role) => {
        this.data.role_id.push(role.id);
      });

      this.data.status = item.status;


      if (item.assign_location?.type == 'division') {
        this.data.division_id = item?.assign_location?.id
        this.onChangeDivision(this.data.division_id)
      }


      if (item.assign_location?.type == 'district') {
        this.data.division_id = item?.assign_location?.parent?.id
        this.onChangeDivision(this.data.division_id)
        this.data.district_id = item?.assign_location?.id
        this.onChangeDistrict(this.data.district_id)
      }


      if (item.assign_location?.type == 'city') {
        this.data.division_id = item?.assign_location?.parent?.parent?.id
        this.onChangeDivision(this.data.division_id)
        this.data.district_id = item?.assign_location?.parent?.id
        this.onChangeDistrict(this.data.district_id)


        if (item.assign_location?.location_type == 3) {
          this.data.city_corpo_id = item?.assign_location?.id
          this.onChangeCity(this.data.city_corpo_id)
        }

        if (item.assign_location?.location_type == 1) {
          this.data.paurashava_id = item?.assign_location?.id
          this.onChangeDistrictPauroshava(this.data.paurashava_id)
        }

      }


      if (item.assign_location?.type == 'thana') {
        this.data.division_id = item?.assign_location?.parent?.parent?.id
        this.onChangeDivision(this.data.division_id)
        this.data.district_id = item?.assign_location?.parent?.id
        this.onChangeDistrict(this.data.district_id)
        this.data.upazila_id = item?.assign_location?.id
        this.onChangeUpazila(this.data.upazila_id)


        if (this.data.user_type == 1) {


          this.data.thana_id = item?.assign_location?.id
          this.onChangeUpazila(this.data.thana_id)

        }


      }



      if (item.assign_location?.type == 'union') {
        this.data.division_id = item?.assign_location?.parent?.parent?.parent?.id
        this.onChangeDivision(this.data.division_id)
        this.data.district_id = item?.assign_location?.parent?.parent?.id
        this.onChangeDistrict(this.data.district_id)
        this.data.upazila_id = item?.assign_location?.parent?.id
        this.onChangeUpazila(this.data.upazila_id)
        this.data.union_id = item?.assign_location?.id
        this.onChangeUnion(this.data.union_id)
      }


      if (item.assign_location?.type == 'ward') {
        this.data.division_id = item?.assign_location?.parent?.parent?.parent?.parent?.id
        this.onChangeDivision(this.data.division_id)
        this.data.district_id = item?.assign_location?.parent?.parent?.parent?.id
        this.onChangeDistrict(this.data.district_id)
        this.data.city_corpo_id = item?.assign_location?.parent?.parent?.id
        this.onChangeCity(this.data.city_corpo_id)
        this.data.thana_id = item?.assign_location?.parent?.id
        this.onChangeThana(this.data.thana_id)
        this.data.ward_id = item?.assign_location?.id
        this.onChangeWard(this.data.thana_id)
      }

      this.data.office_id = item.office_id
      this.data.committee_id = item.committee_id

      if (this.data.office_id && item?.user_wards?.length) {
        this.onChangeOffice(this.data.office_id)
      }

      this.data.office_ward_id = item?.user_wards?.map(i => i.id)
    },



    updateDivision() {
      try {
        this.$store
          .dispatch("Division/UpdateDivision", this.data)
          .then((data) => {
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
    async GetOfficeType() {
      try {
        this.$store.dispatch("getLookupByType", 3).then((data) => {
          this.officeType = data;
        });
      } catch (e) {
        console.log(e);
      }
    },
    async getUsers() {
      this.isLoading = true
      const queryParams = {
        searchText: this.search,
        perPage: this.pagination.perPage,
        page: this.pagination.current,
        user_id: this.$store.state.userData.id,

        user_type: this.data.user_type,
        office_type: this.data.office_type,
        office_id: this.data.office_id,
        division_id: this.data.division_id,
        district_id: this.data.district_id,
        upazila_id: this.data.upazila_id,
        thana_id: this.data.thana_id,
        union_id: this.data.union_id,
        paurashava_id: this.data.paurashava_id,
        ward_id: this.data.ward_id,
        city_corpo_id: this.data.city_corpo_id,
        committee_type: this.data.committee_type,
        committee_id: this.data.committee_id,
        office_ward_id: this.data.office_ward_id,
        from_date: this.dates[0],
        to_date: this.dates[1],
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
          this.isLoading = false
          this.users = result.data.data;
          this.pagination.current = result.data.current_page;
          this.pagination.total = result.data.last_page;
          this.pagination.grand_total = result.data.total;
        });
    },
    async GetDivision() {
      const queryParams = {
        searchText: this.search,
        perPage: this.pagination.perPage,
        page: this.pagination.current,
      };
      this.$axios
        .get("/get-divisions", {
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
    deleteUser: async function () {
      this.$axios
        .delete("/admin/user/destroy/" + this.delete_id, {
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
          this.getUsers();
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


    approveUser: async function () {
      await this.$axios
          .get("/admin/user/approve/" + this.data.id, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            this.approveDialog = false;
            // check if the request was successful
            if (res?.data?.success) {
              this.$toast.success(res.data.message);
            } else {
              this.$toast.error(res.response.data.message);
            }
            this.getUsers();
          })
          .catch((err) => {
            console.log(err, "error");
            console.log(err.response);
            this.$toast.error(err?.response?.data?.message);
          });
    },





    cancelApprove() {
      this.users = this.users.filter(i => i.id != this.data.id)
      this.getUsers()
      this.approveDialog = false;
    },

    changeStatus(id, status) {
      if (status == 0) {
        this.data.id = id;
        return this.approveDialog = true;
      }

      this.callChangeStatusApi(id)
    },

    async callChangeStatusApi(id) {
      this.isLoading = true
      this.approveDialog = false

      await this.$axios
          .get("/admin/user/change-status/" + id, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            this.isLoading = false
            console.log(res.data)

            if (res.data.data.status == 5) {
              this.$toast.warning(res.data.message)
            } else {
              this.$toast.success(res.data.message)
            }

            this.getUsers();
          })
          .catch((err) => {
            this.isLoading = false
            console.log(err.response);
            this.$toast.error(err?.response?.data?.message);
          });
    },





    approveAlert(id) {
      this.data.id = id;
      // alert(JSON.stringify(id));
      this.approveDialog = true;
    },

    updateHeaderTitle() {
      const title = this.$t(
        "container.system_config.demo_graphic.user.listTitle"
      );
      this.$store.commit("setHeaderTitle", title);
    },
    getRoles() {
      this.$axios
        .get("/admin/user/get-roles", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          this.roles = result.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    onChangeOfficeType(event) {
      if (this.data.committee_type === 18 || this.data.committee_type === 19) {
        return this.getCommittees(-1);
      }

      this.data.city_corpo_id = null;
      this.data.division_id = null;
      this.data.district_id = null;
      this.data.thana_id = null;
      this.data.office_id = null;

      this.offices = []

      //ministry & head office
      if (event == 4 || event == 5) {
        this.getOfficeByLocation(event);
      }

      // if (this.dialogEdit) {
      //   this.getOfficeByLocation(event);
      // }
    },

    async onChangeDivision(event) {
      this.data.district_id = null;
      this.data.upazila_id = null;
      this.data.city_corpo_id = null;
      this.data.union_id = null;
      this.data.paurashava_id = null;
      this.data.thana_id = null;
      this.data.ward_id = null;
      this.data.office_id = null;
      this.data.committee_id = null;



      if (this.data.office_type === 6 ) {
        return this.getOfficeByLocation(this.data.office_type, event);
      }
      await this.$axios
          .get(`/get-districts/${event}`, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((result) => {
            this.districts = result.data.data;
            this.upazilas = []
            this.city = []
            this.unions = []
            this.thanas = []
            this.wards = []
            this.committees = []
            this.isDistrictHidden = true;
          });
    },


    async onChangeDistrict(event) {

      if (this.data.committee_type === 17) {
        return this.getCommittees(this.data.district_id)
      }

      this.data.upazila_id = null;
      this.data.city_corpo_id = null;
      this.data.union_id = null;
      this.data.paurashava_id = null;
      this.data.thana_id = null;
      this.data.ward_id = null;
      this.data.office_id = null;
      this.data.committee_id = null;


      if (this.data.office_type === 7) {
        return this.getOfficeByLocation(this.data.office_type, event);
      }
      //upazila = 8; ucd upazila = 10; social circle = 11 | union committee=12; upazila committee=14
      if ([8, 10, 11].includes(this.data.office_type) || [12, 14].includes(this.data.committee_type)) {
        this.GetAllUpazila(this.data.district_id);
      } else {
        /*
        if office/committee
          district pourosova (committee) == 16
          UCD district pourosova (office) == 35
          then lookUpType = 1 (District Pouroshava)
          else lookUpType = 3 (City)
        */

        const lookupType = this.data.committee_type == 16 || this.data.office_type == 35 ? 1 : 3

        await this.$axios
            .get(`/get-cities-pouroshavas/` + this.data.district_id + "/" + lookupType, {
              headers: {
                Authorization: "Bearer " + this.$store.state.token,
                "Content-Type": "multipart/form-data",
              },
            })
            .then((result) => {
              this.unions = lookupType === 1 ? result.data.data : []
              this.city = lookupType === 3 ? result.data.data : [];
              this.thanas = []
              this.wards = []
              this.committees = []
            });
      }
    },


    async onChangeUpazila(event) {

      if (this.data.committee_type === 14) {
        return this.getCommittees(this.data.upazila_id)
      }

      this.data.city_corpo_id = null;
      this.data.union_id = null;
      this.data.paurashava_id = null;

      if (this.data.user_type == 2) {
        this.data.thana_id = null;
      }
      this.data.ward_id = null;
      this.data.office_id = null;
      this.data.committee_id = null;


      if (this.data.office_type === 8 || this.data.office_type === 10 || this.data.office_type === 11 ) {
        return this.getOfficeByLocation(this.data.office_type, event);
      }

      await this.$axios
          .get(`/admin/union/get/${event}`, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((result) => {
            this.unions = result.data.data;
            this.thanas = []
            this.wards = []
            this.committees = []
          });
    },


    async onChangeCity(event) {
      //City corporation
      if (this.data.committee_type === 15) {
        return this.getCommittees(this.data.city_corpo_id)
      }

      this.data.union_id = null;
      this.data.paurashava_id = null;
      this.data.thana_id = null;
      this.data.ward_id = null;
      this.data.office_id = null;
      this.data.committee_id = null;



      if (this.data.office_type === 9) {
        return this.getOfficeByLocation(this.data.office_type, event);
      }

      await this.$axios
          .get(`/admin/thana/get/city/${this.data.city_corpo_id}`, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((result) => {
            this.thanas = result.data.data;
            this.unions = []
            this.wards = []
            this.committees = []
          });

    },


    async onChangeThana(event) {
      this.data.union_id = null;
      this.data.paurashava_id = null;
      this.data.ward_id = null;
      this.data.office_id = null;
      this.data.committee_id = null;


      await this.$axios
          .get(`/admin/ward/get/thana/${event}`, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((result) => {
            this.wards = result.data.data;
            this.committees = []
          });
    },



    async onChangeUnion(event) {
      if (this.data.committee_type === 12) {
        return this.getCommittees(this.data.union_id)
      }
    },

    async onChangeDistrictPauroshava(event) {
      if (this.data.office_type === 35) {
        this.data.office_id = null
        return this.getOfficeByLocation(this.data.office_type, event);
      }

      if (this.data.committee_type === 16) {
        return this.getCommittees(this.data.paurashava_id)
      }
    },

    async onChangeWard(event) {
      if (this.data.committee_type === 13) {
        return this.getCommittees(this.data.ward_id)
      }
    },


    async onChangeOffice(event) {
      this.officeWards = []
      this.data.office_ward_id = []

      await this.$axios
          .get(`/get-office-wards/${event}`, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((result) => {
            this.officeWards = result.data.data;
          });
    },






    async getCommittees(locationId) {
      this.data.committee_id = null;
      await this.$axios
          .get(`/admin/committee/${this.data.committee_type}/${locationId}`, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((result) => {
            this.committees = result.data.data;
          });
    },


    async GetAllUpazila(id) {
      if (this.data.office_type != null) {
        this.getOfficeByLocation(this.data.office_type, id);
      }

      this.data.city_corpo_id = null;
      this.data.thana_id = null;
      this.data.union_id = null;
      this.data.paurashava_id = null;
      this.data.ward_id = null;
      this.data.office_id = null;
      this.data.committee_id = null;


      await this.$axios
          .get(`/get-upazilas/${id}`, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((result) => {
            this.upazilas = result.data.data;
            this.city = []
            this.thanas = []
            this.unions = []
            this.wards = []
            this.committees = []
            this.offices = result.data.data;
          });

    },

    async getOfficeByLocation(office_type_id, location_id = null) {
      let data = {
        office_type_id: office_type_id,
        location_id: location_id,
      };
      let fd = new FormData();
      for (const [key, value] of Object.entries(data)) {
        if (value !== null) {
          fd.append(key, value);
        }
      }
      await this.$axios
        .post("/get-offices", fd, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "application/json",
          },
        })
        .then((result) => {
          this.offices = result.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async GetAllCommitteeType() {
      try {
        this.$store.dispatch("getLookupByType", 17).then((data) => {
          this.committee_types = data;
        });
      } catch (e) {
        console.log(e);
      }
    },

    async onChangeUserType(userType) {
      this.data.committee_type = null
      this.data.office_type = null

      this.resetLocations()
    },

    //18 = national, 19 = corodination
    async onChangeCommitteeType() {
      this.resetLocations()

      if (this.data.committee_type === 18 || this.data.committee_type === 19) {
        this.getCommittees(-1)
      }

    },

    async resetLocations() {
      this.data.division_id = null;
      this.data.district_id = null;
      this.data.upazila_id = null;
      this.data.thana_id = null;
      this.data.union_id = null;
      this.data.paurashava_id = null;
      this.data.ward_id = null;
      this.data.city_corpo_id = null;
      this.data.office_id = null;
      this.data.committee_id = null
      this.committees = []
      // this.data.role_id = []
    },



  },
  watch: {
    "$i18n.locale": "updateHeaderTitle",

    dialogEdit: function (val, old) {
      if (!val) {
        for (const key in this.data) {
          this.data[key] = key == 'role_id' ? []
              : (key == 'status' ? 0 : null)
        }
      }
    },

    // search: {
    //   handler () {
    //     this.getUsers()
    //   },
    // },

  },
  created() {
    this.GetAllCommitteeType();
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