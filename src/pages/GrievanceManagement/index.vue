<template>
  <div id="aplication_list">
    <v-row class="ml-sm-5 mt-0">
      <v-col cols="12">
        <v-row>
           <Spinner :loading="isLoading" />
          <v-col cols="12">

            <!-- Expantion panels start -->
            <v-expansion-panels>
              <v-expansion-panel class="ma-2">
                <v-expansion-panel-header color=#1c3b68>
                  <template v-slot:actions>
                    <v-icon color="white">
                      $expand
                    </v-icon>
                  </template>
                  <h3 class="white--text" style="font-size:19.89px;">
                    {{ $t("container.grievance_management.grievanceList.search") }}
                  </h3>
                </v-expansion-panel-header>
                <v-expansion-panel-content class="elevation-0 transparent mt-10">
                  <ValidationObserver ref="formsearch" v-slot="{ invalid }">
                    <form @submit.prevent="submitsearch()">
                      <v-row>
                        <v-col lg="3" md="3" cols="12">
                          <v-text-field v-model="data.verification_number" outlined clearable append-icon="mdi-plus"
                            :append-icon-cb="appendIconCallback" :label="$t(
                              'container.beneficiary_management.beneficiary_list.nid'
                            )
                              " :hide-details="true">
                          </v-text-field>
                        </v-col>
                        <v-col lg="3" md="3" cols="12">
                          <v-text-field v-model="data.tracking_no" outlined clearable append-icon="mdi-plus"
                            :append-icon-cb="appendIconCallback" :label="$t(
                              'container.grievance_management.grievanceList.tracking_no'
                            )

                              " :hide-details="true">
                          </v-text-field>
                        </v-col>

                        <v-col lg="3" md="3" cols="12">
                          <ValidationProvider name="Grievance Type" vid="grievanceType" v-slot="{ errors }">
                            <v-autocomplete v-model="data.grievanceType" class="no-arrow-icon"
                              :append-icon-cb="appendIconCallback" append-icon="mdi-plus"
                              :hide-details="errors[0] ? false : true" outlined
                              :label="$t('container.grievance_management.main_grievance_type')" :items="types"
                              :item-text="language === 'bn' ? 'title_bn' : 'title_en'" item-value="id"
                              :error="errors[0] ? true : false"
                              :error-messages="errors[0] ? (language === 'bn' ? 'অনুগ্রহ করে অভিযোগের ধরন নির্বাচন করুন' : 'Please Select Grievance Type.') : ''"></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <v-col lg="3" md="3" cols="12">
                          <ValidationProvider name="Grievance Subejct" vid="grievanceSubject" v-slot="{ errors }">
                            <v-autocomplete v-model="data.grievanceSubject" class="no-arrow-icon"
                              :append-icon-cb="appendIconCallback" append-icon="mdi-plus"
                              :hide-details="errors[0] ? false : true" outlined
                              :label="$t('container.grievance_management.grievance_subject')" :items="subjects"
                              :item-text="language === 'bn' ? 'title_bn' : 'title_en'" item-value="id"
                              :error="errors[0] ? true : false"
                              :error-messages="errors[0] ? (language === 'bn' ? 'অনুগ্রহ করে অভিযোগের বিষয় নির্বাচন করুন' : 'Please Select Grievacne Subject.') : ''"></v-autocomplete>
                          </ValidationProvider>
                        </v-col>

                        <v-col lg="3" md="3" cols="12" v-if="!isReadonlyLocationType()">
                          <ValidationProvider name="Location Type" vid="location_type" v-slot="{ errors }">
                            <v-autocomplete @input="LocationType($event)" v-model="data.location_type"
                              class="no-arrow-icon" :append-icon-cb="appendIconCallback" append-icon="mdi-plus"
                              :hide-details="errors[0] ? false : true" outlined :readonly="isReadonlyLocationType()"
                              :label="$t('container.list.location_type')" :items="locationType"
                              :item-text="language === 'bn' ? 'value_bn' : 'value_en'" item-value="id"
                              :error="errors[0] ? true : false" :error-messages="errors[0]"></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <v-col lg="3" md="3" cols="12" v-if="!isReadonlyDivision()">
                          <ValidationProvider name="Division" vid="division" v-slot="{ errors }">
                            <v-autocomplete :hide-details="errors[0] ? false : true" @input="onChangeDivision($event)"
                              v-model="data.division_id" outlined :label="$t(
                                'container.system_config.demo_graphic.division.division'
                              )
                                " :items="divisions" :item-text="language === 'bn' ? 'name_bn' : 'name_en'"
                              item-value="id" :error="errors[0] ? true : false" :readonly="isReadonlyDivision()"
                              :error-messages="errors[0]" class="no-arrow-icon" :append-icon-cb="appendIconCallback"
                              append-icon="mdi-plus"></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <v-col lg="3" md="3" cols="12" v-if="!isReadonlyDistrict()">
                          <ValidationProvider name="District" vid="district" v-slot="{ errors }">
                            <v-autocomplete :hide-details="errors[0] ? false : true" outlined v-model="data.district_id"
                              @input="onChangeDistrict($event)" :label="$t(
                                'container.system_config.demo_graphic.district.district'
                              )
                                " :items="districts" :item-text="language === 'bn' ? 'name_bn' : 'name_en'"
                              item-value="id" :error="errors[0] ? true : false" :readonly="isReadonlyDistrict()"
                              :error-messages="errors[0]" class="no-arrow-icon" :append-icon-cb="appendIconCallback"
                              append-icon="mdi-plus"></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <v-col v-if="data.location_type == 2 && !isReadonlyUpazila()" lg="3" md="3" cols="12">
                          <ValidationProvider name="Upazila" vid="thana_id" v-slot="{ errors }">
                            <v-autocomplete :hide-details="errors[0] ? false : true" v-model="data.thana_id" outlined
                              :label="$t(
                                'container.system_config.demo_graphic.ward.upazila'
                              )
                                " @change="onChangeUpazila($event)" :items="thanas"
                              :item-text="language === 'bn' ? 'name_bn' : 'name_en'" item-value="id"
                              :error="errors[0] ? true : false" :error-messages="errors[0]" class="no-arrow-icon"
                              :readonly="isReadonlyUpazila()" :append-icon-cb="appendIconCallback"
                              append-icon="mdi-plus"></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <v-col v-if="data.location_type == 2 && !isReadonlySubLocation()
                          " lg="3" md="3" cols="12">
                          <!-- :readonly="data.sub_location_type !== null &&  this.permissions?.user?.committee_type_id == 12 -->

                          <ValidationProvider name="subLocationType" vid="subLocationType" v-slot="{ errors }">
                            <v-autocomplete @input="onChangeSubLocationType($event)" v-model="data.sub_location_type"
                              outlined :label="$t(
                                'container.system_config.demo_graphic.ward.subLocation_type'
                              )
                                " :items="subLocationType" :item-text="language === 'bn' ? 'value_bn' : 'value_en'"
                              item-value="id" :error="errors[0] ? true : false" :readonly="isReadonlySubLocation()"
                              :error-messages="errors[0]" :hide-details="errors[0] ? false : true" class="no-arrow-icon"
                              :append-icon-cb="appendIconCallback" append-icon="mdi-plus"></v-autocomplete>
                          </ValidationProvider>
                        </v-col>

                        <v-col v-if="data.location_type == 2 &&
                          data.sub_location_type == 1 &&
                          !isReadonlyPouro()
                          " lg="3" md="3" cols="12">
                          <ValidationProvider name="pouros" vid="pouros" v-slot="{ errors }">
                            <v-autocomplete v-model="data.pouro_id" outlined :label="$t(
                              'container.system_config.demo_graphic.ward.pouro'
                            )
                              " :items="pouros" :item-text="language === 'bn' ? 'name_bn' : 'name_en'" item-value="id"
                              @input="onChangePouroGetWard($event)" :error="errors[0] ? true : false"
                              :error-messages="errors[0]" :hide-details="errors[0] ? false : true" class="no-arrow-icon"
                              :readonly="isReadonlyPouro()" :append-icon-cb="appendIconCallback"
                              append-icon="mdi-plus"></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <!-- :readonly="permissions?.user?.committee_type_id == 12 && data.pouro_id != null" -->

                        <v-col v-if="data.sub_location_type == 2 &&
                          data.location_type == 2 &&
                          !isReadonlyUnion()
                          " lg="3" md="3" cols="12">
                          <ValidationProvider name="unions" vid="unions" v-slot="{ errors }">
                            <v-autocomplete @input="onChangeUnionGetWard($event)" v-model="data.union_id" outlined :label="$t(
                              'container.system_config.demo_graphic.ward.union'
                            )
                              " :items="unions" :item-text="language === 'bn' ? 'name_bn' : 'name_en'" item-value="id"
                              :error="errors[0] ? true : false" :readonly="isReadonlyUnion()" :error-messages="errors[0]"
                              :hide-details="errors[0] ? false : true" class="no-arrow-icon"
                              :append-icon-cb="appendIconCallback" append-icon="mdi-plus"></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <!-- :readonly="permissions?.user?.committee_type_id == 12 && data.union_id !=null"  -->

                        <v-col v-if="data.location_type == 3 && !isReadonlyCity()" lg="3" md="3" cols="12">
                          <ValidationProvider name="city" vid="city_id" v-slot="{ errors }">
                            <v-autocomplete :hide-details="errors[0] ? false : true" @change="onChangeCity($event)"
                              outlined :label="$t(
                                'container.system_config.demo_graphic.ward.city'
                              )
                                " :items="cities" :item-text="language === 'bn' ? 'name_bn' : 'name_en'"
                              item-value="id" :error="errors[0] ? true : false" :error-messages="errors[0]"
                              class="no-arrow-icon" :readonly="isReadonlyCity()" v-model="data.city_id"
                              :append-icon-cb="appendIconCallback" append-icon="mdi-plus"></v-autocomplete>
                          </ValidationProvider>
                        </v-col>
                        <!-- :readonly="data.city_id !== null" v-model="data.city_id" -->
                        <v-col v-if="data.location_type == 3 &&
                          permissions?.user?.committee_type_id != 13
                          " lg="3" md="3" cols="12">
                          <ValidationProvider name="thana" vid="city_thana_id" v-slot="{ errors }">
                            <v-autocomplete @input="onChangeThanaGetWard($event)" :readonly="permissions?.user?.committee_type_id == 13
                              " :hide-details="errors[0] ? false : true" v-model="data.city_thana_id" outlined :label="$t(
    'container.system_config.demo_graphic.ward.thana'
  )
    " :items="city_thanas" :item-text="language === 'bn' ? 'name_bn' : 'name_en'" item-value="id"
                              :error="errors[0] ? true : false" :error-messages="errors[0]" class="no-arrow-icon"
                              :append-icon-cb="appendIconCallback" append-icon="mdi-plus"></v-autocomplete>
                          </ValidationProvider>
                        </v-col>

                        <v-col v-if="data.location_type == 1 && !isReadonlyDistPouro()
                          " lg="3" md="3" cols="12">
                          <ValidationProvider name="thana" vid="district_pouro_id" v-slot="{ errors }">
                            <v-autocomplete @input="onChangeDistrictPouroGetWard($event)"
                              :readonly="isReadonlyDistPouro()" :hide-details="errors[0] ? false : true"
                              v-model="data.district_pouro_id" outlined :label="$t(
                                'container.system_config.demo_graphic.ward.dist_pouro'
                              )
                                " :items="district_poros" :item-text="language === 'bn' ? 'name_bn' : 'name_en'"
                              item-value="id" :error="errors[0] ? true : false" :error-messages="errors[0]"
                              class="no-arrow-icon" :append-icon-cb="appendIconCallback"
                              append-icon="mdi-plus"></v-autocomplete>
                          </ValidationProvider>
                        </v-col>

                        <v-col v-if="data.location_type &&
                          permissions?.user?.committee_type_id != 13
                          " lg="3" md="3" cols="12">
                          <ValidationProvider name="Ward" vid="ward_id" v-slot="{ errors }">
                            <v-autocomplete :hide-details="errors[0] ? false : true" v-model="data.ward_id" outlined
                              :label="$t(
                                'container.system_config.demo_graphic.ward.ward'
                              )
                                " :items="wards" :item-text="language === 'bn' ? 'name_bn' : 'name_en'" item-value="id"
                              :readonly="permissions?.user?.committee_type_id == 13
                                " :error="errors[0] ? true : false" :error-messages="errors[0]" class="no-arrow-icon"
                              :append-icon-cb="appendIconCallback" append-icon="mdi-plus"></v-autocomplete>
                          </ValidationProvider>
                        </v-col>

                        <!-----------extra Filed added for search------------->
                        <v-col lg="3" md="3" cols="12">
                          <v-text-field v-model="data.name" outlined clearable append-icon="mdi-plus"
                            :append-icon-cb="appendIconCallback" :label="$t(
                              'container.grievance_management.grievanceEntry.name'
                            )
                              " :hide-details="true">
                          </v-text-field>
                        </v-col>
                        <v-col lg="3" md="3" cols="12">
                          <v-text-field v-model="data.mobile" outlined clearable append-icon="mdi-plus"
                            :append-icon-cb="appendIconCallback" :label="$t(
                              'container.application_selection.application.mobile'
                            )

                              " :hide-details="true">
                          </v-text-field>
                        </v-col>

                        <v-col lg="3" md="3" cols="12">
                          <v-select outlined :label="$t('container.list.status')" v-model="data.status"
                            :items="statusFilter">

                          </v-select>
                        </v-col>
                        <v-col lg="3" md="3" cols="12">
                          <v-menu ref="menu" v-model="menu" :close-on-content-click="false" transition="scale-transition"
                            offset-y min-width="auto">
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field v-model="dates" :append-icon="menu ? 'mdi-calendar' : 'mdi-calendar'"
                                :label="$t('container.application_selection_dashboard.enter_start_end_date')" readonly
                                v-bind="attrs" v-on="on"></v-text-field>
                            </template>
                            <v-date-picker v-model="dates" :range="[dates[0], dates[1]]" no-title scrollable
                              @input="OnChangeDateInfo($event, 'total_approve')">
                              <v-spacer></v-spacer>
                              <v-btn text color="primary" @click="resetDateRange">
                                Cancel
                              </v-btn>
                              <v-btn text color="primary" @click="$refs.menu.save(dates)">
                                OK
                              </v-btn>
                            </v-date-picker>
                          </v-menu>
                        </v-col>

                      </v-row>


                      <div class="d-inline d-flex justify-end mt-2">

                        <v-btn elevation="2" class="btn  mr-2" @click="resetForm()">{{
                          $t("container.list.reset")
                        }}</v-btn>
                        <v-btn elevation="2" type="submit" class="btn mr-2" color="success">{{
                          $t("container.list.search")
                        }}</v-btn>
                      </div>
                    </form>
                  </ValidationObserver>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
            <!-- Expantion panels end -->
            <!-- Application list -->
            <v-card elevation="10" color="white" rounded="md" theme="light" class="mb-8 mt-5">
              <v-card-title tag="div" style="background-color:#1c3b68;color:white;margin-bottom: 17px;font-size:17px;">
                <h3 class="white--text">
                  {{ $t("container.grievance_management.grievanceList.grievance_list") }}
                </h3>
              </v-card-title>
              <v-card-text>
                <v-row justify="space-between" align="center">
                  <v-col lg="3" md="3" cols="12">
                    <v-text-field @keyup.native="GetGrievance" outlined dense v-model="search"
                      prepend-inner-icon="mdi-magnify" class="my-sm-0 my-3 mx-0v -input--horizontal" variant="outlined"
                      :label="$t('container.list.search')" hide-details color="primary"></v-text-field>
                  </v-col>
                  <v-col lg="3" md="3" cols="12"> </v-col>
                  <v-col lg="3" md="3" cols="12" class="text-right">
                    <v-select v-model="selectedColumns" :items="selectableColumns" :label="$t(
                      'container.application_selection.application.select_column'
                    )
                      " multiple @change="updateVisibleColumns" outlined menu-props="top">
                      <template v-slot:selection="{ item, index }"> </template>
                    </v-select>
                  </v-col>
                </v-row>
                <!-- </div> -->
                <template>
                  <v-row justify="space-between" align="center" class="mx-4">

                    <!-- Checkbox on the left -->
                    <v-col sm="6" lg="6" md="6" cols="12">
                      {{ $t('container.list.total') }}:&nbsp;<span style="font-weight: bold;">
                        {{ language === 'bn' ? $helpers.englishToBangla(
                          this.total) : this.total }}
                      </span>
                    </v-col>

                    <!-- Dropdown on the right -->
                    <v-col sm="6" lg="6" md="6" cols="12" class="text-right">
                      <v-btn elevation="2" class="btn mr-2 white--text" color="red darken-4" @click="GeneratePDF()">
                        <v-icon class="pr-1"> mdi-tray-arrow-down </v-icon> {{ $t("container.list.PDF") }}
                      </v-btn>
                      <v-btn elevation="2" class="btn mr-2 white--text" color="teal darken-2" @click="GenerateExcel()">
                        <v-icon class="pr-1"> mdi-tray-arrow-down </v-icon>
                        {{ $t("container.list.excel") }}
                      </v-btn>
                    </v-col>
                  </v-row>
                </template>
                <v-row class="ma-0  white round-border d-flex justify-space-between align-center" justify="center"
                  justify-lg="space-between">
                  <v-col cols="12">
                    <v-data-table :headers="visibleHeaders" :items="applications" :loading="loading" item-key="id"
                      :items-per-page="pagination.perPage" hide-default-footer
                      class="elevation-0 transparent row-pointer table-responsive">
                      <!-- Header slot -->
                      <template v-slot:item.sl="{ item, index }">
                        {{ language === 'bn' ? $helpers.englishToBangla(
                          (pagination.current - 1) * pagination.perPage +
                          index +
                          1) : (pagination.current - 1) * pagination.perPage +
                          index +
                          1 }}
                      </template>
                      <template v-slot:item.name="{ item }">
                        <span>
                          {{ item.name }}
                          <!-- {{ item?.grievance_type?.title_en }} -->
                        </span>
                      </template>

                      <template v-slot:item.grievanceType="{ item }">
                        <span>
                          {{ language === 'bn' ? item.grievance_type?.title_bn : item.grievance_type?.title_en }}
                          <!-- {{ item?.grievance_type?.title_en }} -->
                        </span>
                      </template>

                      <template v-slot:item.grievanceSubject="{ item }">
                        <span>
                          {{ language === 'bn' ? item.grievance_subject?.title_bn : item.grievance_subject?.title_en }}
                        </span>
                      </template>

                      <template v-slot:item.created_at="{ item }">
                        <span>
                          {{ language === 'bn' ? formatDate(item.created_at) : formatDate(item.created_at) }}
                        </span>
                      </template>
                      <template v-slot:item.division="{ item }">
                        <span>
                          {{ language === 'bn' ? item.division?.name_bn : item.division?.name_en }}
                        </span>
                      </template>
                      <template v-slot:item.district="{ item }">
                        <span>
                          {{ language === 'bn' ? item.district?.name_bn : item.district?.name_en }}
                        </span>
                      </template>
                      <template v-slot:item.location="{ item }">
                        <span>
                          {{ language === 'bn' ? item.city_corporation?.name_bn : item.city_corporation?.name_en }}
                        </span>
                      </template>
                      <template v-slot:item.tracking_no="{ item }">
                        <span>
                          {{ item?.tracking_no }}
                        </span>
                      </template>
                      <template v-slot:item.resolved_officer="{ item }">
                        <span>
                          {{ language === 'bn' ? item.resolver?.name_bn : item.resolver?.name_en }}
                          <!-- {{ item?.resolved_officer }} -->
                        </span>
                      </template>
                      <template v-slot:item.status="{ item }">
                        <span v-if="item.status == 0" class="not-selected"
                          style="background-color: lightgray;  width: 100px;">
                          <!-- {{ language === 'bn' ? "সমাধান হয়নি" : "Not Solved" }} -->
                          <v-badge color="secondary" :content="(language === 'bn' ? 'সমাধান হয়নি' : 'Not Solved')">
                          </v-badge>

                        </span>
                        <span v-if="item.status == 1" class="forwarded"
                          style="background-color: #bdc749; color: white;  width: 100px;">
                          <!-- {{ language === 'bn' ? "ফরোয়ার্ড করা হয়েছে" : "Forwarded" }} -->
                          <v-badge color="primary" :content="(language === 'bn' ? 'ফরোয়ার্ড হয়েছে' : 'Forwarded')">
                          </v-badge>

                        </span>
                        <span v-if="item.status == 2" class="approved"
                          style="background-color: #008000; color: white; width: 100px;">
                          <!-- {{ language === 'bn' ? "সমাধান করা হয়েছে" : "Solved" }} -->
                          <v-badge color="success" :content="(language === 'bn' ? 'সমাধান হয়েছে' : 'Solved')">
                          </v-badge>

                        </span>
                        <span v-if="item.status == 3" class="waiting" style="background-color: #FFD700;  width: 100px;">
                          <!-- {{ language === 'bn' ? "বাতিল" : "Canceled" }} -->
                          <v-badge color="warning" :content="(language === 'bn' ? 'বাতিল হয়েছে' : 'Canceled')">
                          </v-badge>

                        </span>
                        <span v-if="item.status === 4" class="waiting" style="background-color: #FFD700;  width: 100px;">

                          <v-badge color="#009688" :content="(language === 'bn' ? 'চলমান' : 'In Progress')">
                          </v-badge>

                        </span>
                      </template>
                      <template v-slot:item.actions="{ item }">
                        <v-tooltip top>
                          <template v-slot:activator="{ on }">
                            <v-btn fab x-small v-on="on" color="#AFB42B" elevation="0" class="white--text"
                              @click="showDetailsModal(item)">
                              <v-icon> mdi-eye </v-icon>
                            </v-btn>
                          </template>
                          <span>
                            {{ $t("container.list.view") }}
                          </span>
                        </v-tooltip>
                        <v-tooltip top
                          v-if="userRoleId[0] == item.forward_to && (item.status == 0 || item.status == 1) || userRoleId[0] == 1">
                          <template v-slot:activator="{ on }">
                            <v-btn fab x-small v-on="on" color="#616286" elevation="0" class="white--text"
                              @click="createGrievanceDialog(item)">
                              <v-icon> mdi-skip-next-circle </v-icon>
                            </v-btn>
                          </template>
                          <span>
                            {{ $t("container.grievance_management.grievanceList.status_update") }}
                          </span>
                        </v-tooltip>
                      </template>
                      <!-- End Action Button -->
                      <!-- End Action Button -->
                      <template v-slot:footer="item">
                        <v-container class="pa-0" fluid>
                          <v-row class="align-center" cols="12">
                            <v-col cols="12" lg="10" md="10" sm="4" class="d-flex justify-center mb-2 mb-sm-0">
                              <v-pagination circle primary v-model="pagination.current" :length="pagination.total"
                                @input="onPageChange" :total-visible="11" class="custom-pagination-item"></v-pagination>
                            </v-col>
                            <v-col cols="12" lg="2" md="2" sm="4" class="">
                              <v-select :items="items" hide-details dense outlined @change="onPageSetup"
                                v-model="pagination.perPage"></v-select>
                            </v-col>
                          </v-row>
                        </v-container>
                      </template>
                    </v-data-table>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>

      <!-- Grievance Details modal  -->
      <v-dialog v-model="showModal" width="1050">
        <v-card style="justify-content: center; text-align: center">
          <v-card-title class="font-weight-bold justify-center"
            style="background-color:#1c3b68;color:white;font-size:17px;">
            {{ $t("container.grievance_management.grievanceList.grievance_details") }}
          </v-card-title>
          <v-divider style="background-color:red;"></v-divider>
          <template>
            <v-simple-table dense class="table-responsive" style="padding: 2% 0% 2% 2%;">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th style="font-size: 16px;width:19%;padding:4% 0% 2% 2%;color:black">{{
                      $t("container.grievance_management.grievanceList.tracking_no") }} :
                    </th>
                    <th style="font-size: 16px;">{{ data.tracking_no }}</th>

                  </tr>
                  <tr>
                    <th style="font-size: 16px;color:black">{{ $t("container.grievance_management.main_grievance_type")
                    }} :</th>
                    <th style="font-size: 16px;">{{ data.grievanceType }}</th>
                  </tr>
                  <tr>
                    <th style="font-size: 16px;color:black">{{ $t("container.grievance_management.grievance_subject") }} :
                    </th>
                    <th style="font-size: 16px;">{{ data.grievanceSubject }}</th>
                  </tr>
                  <tr>
                    <th style="font-size: 16px;color:black">{{ $t("container.grievance_management.grievanceEntry.details")
                    }} :</th>
                    <th style="font-size: 16px;">{{ data.details }}</th>
                  </tr>
                  <tr>
                    <th style="font-size: 16px;color:black">{{
                      $t("container.grievance_management.grievanceList.grievance_date") }} :
                    </th>
                    <!-- <th>{{ data.created_at }}</th> -->
                    <th style="font-size: 16px;"> {{ formatDate(data.created_at) }}</th>
                  </tr>
                  <tr>
                   <th style="font-size: 16px;color:black">{{ $t("container.list.status") }} : </th>
                    <th style="font-size: 16px;">
                      <span v-if="data.status == 0" class="not-selected"
                        style="background-color: lightgray;  width: 100px;">
                        <!-- {{ language === 'bn' ? "সমাধান হয়নি" : "Not Solved" }} -->
                        <v-badge color="secondary" :content="(language === 'bn' ? 'সমাধান হয়নি' : 'Not Solved')">
                        </v-badge>
                      </span>
                      <span v-if="data.status == 1" class="forwarded"
                        style="background-color: #bdc749; color: white;  width: 100px;">
                        <!-- {{ language === 'bn' ? "ফরোয়ার্ড করা হয়েছে" : "Forwarded" }} -->
                        <v-badge color="primary" :content="(language === 'bn' ? 'ফরোয়ার্ড হয়েছে' : 'Forwarded')">
                        </v-badge>

                      </span>
                      <span v-if="data.status == 2" class="approved"
                        style="background-color: #008000; color: white; width: 100px;">
                        <!-- {{ language === 'bn' ? "সমাধান করা হয়েছে" : "Solved" }} -->
                        <v-badge color="success" :content="(language === 'bn' ? 'সমাধান হয়েছে' : 'Solved')">
                        </v-badge>

                      </span>
                      <span v-if="data.status == 3" class="waiting" style="background-color: #FFD700;  width: 100px;">
                        <!-- {{ language === 'bn' ? "বাতিল" : "Canceled" }} -->
                        <v-badge color="warning" :content="(language === 'bn' ? 'বাতিল হয়েছে' : 'Canceled')">
                        </v-badge>

                      </span>
                      <span v-if="data.status === 4" class="waiting" style="background-color: #FFD700;  width: 100px;">

                        <v-badge color="#009688" :content="(language === 'bn' ? 'চলমান' : 'In Progress')">
                        </v-badge>

                      </span>

                    </th>
                  </tr>
                  <tr style="padding-buttom:2%">
                    <th style="font-size: 16px;color:black">{{
                      $t("container.grievance_management.grievanceList.resolved_officer") }}
                      :</th>
                    <th style="font-size: 16px;">
                      {{ data.resolved_officer }}
                      <!-- {{ data.resolver?.name_bn ?? 'N/A' }} -->
                    </th>
                  </tr>
                </thead>

              </template>
            </v-simple-table>
            <div style="text-align:right">
              <v-btn style="margin:5px 5px;" @click="showDetailsModalClose" outlined
                class="custom-btn-width py-2 mr-10 text-right warning">
                {{ $t("container.list.cancel") }}
              </v-btn>
            </div>
          </template>
        </v-card>
      </v-dialog>
      <!-- Grievance Details modal  -->

      <!-- Grievance status update add modal  -->
      <v-dialog v-model="dialogAdd" width="60%">
        <v-card style="justify-content: center; text-align: center">
          <v-card-title class="font-weight-bold justify-center"
            style="background-color:#1c3b68;color:white;font-size:17px;">
            {{ $t("container.grievance_management.grievanceList.status_update") }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="mt-7">
            <ValidationObserver ref="formAdd" v-slot="{ invalid }">
              <form @submit.prevent="submitGrievanceStatus()">
                <!-- {{errors.code}}
                  {{errors.name_en}} -->
                <v-row dense>
                  <v-col lg="6" md="6" cols="12">
                    <v-text-field type="text" outlined v-model="data.grievanceType" readonly
                      :label="$t('container.grievance_management.main_grievance_type')">
                    </v-text-field>
                  </v-col>
                  <v-col lg="6" md="6" cols="12">
                    <v-text-field type="text" outlined v-model="data.grievanceSubject" readonly
                      :label="$t('container.grievance_management.grievance_subject')">
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row dense>
                  <v-col lg="6" md="6" cols="12">
                    <v-select outlined :label="$t('container.list.status')" v-model="data.status" :items="statusOptions">

                    </v-select>
                  </v-col>
                  <v-col lg="6" md="6" cols="12" v-if="data.status == '1'">
                    <ValidationProvider name="Forward To" vid="forward_to" v-slot="{ errors }" rules="required">
                      <v-select outlined :label="$t('container.grievance_management.grievanceList.forward_to')"
                        v-model="data.forwardOfficer" item-value="id" :items="forward_to"
                        :item-text="language === 'bn' ? 'name_bn' : 'name_en'">
                      </v-select>
                    </ValidationProvider>
                  </v-col>
                  <v-col lg="6" md="6" cols="12" v-if="data.status != '1'">
                    <v-select outlined :label="$t('container.grievance_management.grievanceList.solution')"
                      v-model="data.solution" :items="solutionType"
                      :item-text="language === 'bn' ? 'value_bn' : 'value_en'">
                    </v-select>
                  </v-col>
                </v-row>
                <v-row dense>
                  <v-col lg="12" md="12" cols="12">
                    <v-textarea rows="3" v-model="data.remarks" outlined clearable
                      :label="$t('container.grievance_management.grievanceList.remarks')">
                    </v-textarea>
                  </v-col>
                </v-row>
                <v-row dense>
                  <v-col lg="6" md="6" cols="12">
                    <v-file-input outlined v-model="data.documents" accept=".pdf,.xls,.xlsx,.jpg,.jpeg,.png"
                      :rules="[fileTypeRule, fileSizeRule]"
                      :placeholder="language === 'bn' ? 'সিলেক্ট ফাইল' : 'Select File'"
                      :label="$t('container.grievance_management.grievanceEntry.document')">
                    </v-file-input>
                  </v-col>
                </v-row>
                <v-row dense class="mx-0 my-0 py-2" justify="end">
                  <v-btn @click="dialogAdd = false" outlined class="custom-btn-width py-2 mr-10">
                    {{ $t("container.list.cancel") }}
                  </v-btn>
                  <v-btn type="submit" color="primary" :disabled="invalid" :loading="loading"
                    class="custom-btn-width warning white--text py-2">
                    {{ $t("container.list.submit") }}
                  </v-btn>
                </v-row>
              </form>
            </ValidationObserver>
          </v-card-text>
        </v-card>
      </v-dialog>
      <!-- Grievance status update modal  -->

    </v-row>
  </div>
</template>

<script>

import { mapState, mapActions } from "vuex";
import { extend, ValidationProvider, ValidationObserver } from "vee-validate";
import { required } from "vee-validate/dist/rules";
import { http } from "@/hooks/httpService";
import Spinner from "@/components/Common/Spinner.vue";

extend("required", required);
export default {
  name: "Index",
  title: "CTM - Grievance List",
  data() {
    return {
      data: {
        id: null,
        verification_number: null,
        tracking_no: null,
        name: null,
        code: null,
        details: null,
        division_id: null,
        district_id: null,
        thana_id: null,
        union_id: null,
        city_id: null,
        city_thana_id: null,
        district_pouro_id: null,
        pouro_id: null,
        ward_id: null,
        location_type: null,
        sub_location_type: null,
        application_id: null,
        nominee_name: null,
        account_no: null,
        status_list: null,
        program_id: null,
        status: null,
        solution: null,
        remarks: null,
        documents: null,
        grievanceType: null,
        grievanceSubject: null,
        created_at: null,
        resolved_officer: null,
        forwardOfficer: null,
        mobile: null,
      },
      fileTypeRule: (value) => {
        // alert(value);
        if (value != null) {
          const allowedFormats = ['.pdf', '.xls', '.xlsx', '.jpg', '.jpeg', '.png'];
          const extension = value.name.slice(((value.name.lastIndexOf(".") - 1) >>> 0) + 2);
          return allowedFormats.includes(`.${extension}`) || 'Allowed file types are PDF, Excel, JPG, JPEG, and PNG.';
        } else {
          this.data.documents = '';
        }

      },
      fileSizeRule: (value) => {
        if (value != null) {
          const maxSizeMB = 5; // Maximum file size in MB
          const maxSizeBytes = maxSizeMB * 1024 * 1024; // Convert MB to bytes
          return value.size <= maxSizeBytes || `File size should be less than ${maxSizeMB} MB.`;
        } else {
          this.data.documents = '';
        }
      },
      dates: [],
      menu: false,
      total: null,
      showModal: false,
      dialogAdd: false,
      forward: {
        committee_id: null,
        remark: null,
        status: null,
        applications_id: [],
      },
      selectAll: null,
      committe: [],
      permissions: [],
      isFieldVisible: false,
      value: ["3", "100", "11", "12"], // Default selection without 'name'
      selectedHeaders: [],
      loading: false,
      search: "",
      delete_id: "",
      applications: [],
      districts: [],
      cities: [],
      thanas: [],
      city_thanas: [],
      unions: [],
      pouros: [],
      wards: [],
      locationType: [],
      types: [],
      subjects: [],
      setting: [],
      solutionType: [],
      forward_to: [],
      isLoading:false,
      userRoleId: '',
      firstOfficerId: '',
      subLocationType: [
        {
          id: 1,
          value_en: "Pouroshava",
        },

        {
          id: 2,
          value_en: "Union",
        },
      ],

      pagination: {
        current: 1,
        total: 0,
        perPage: 5,
      },
      items: [5, 10, 15, 20, 40, 50, 100],

      selectedColumns: ['grievanceSubject', 'grievanceType', 'tracking_no', 'created_at', 'status'],  // Initially, first 6 columns are selected

      // fixedColumns: ['sl'], 
      fixedColumns: ['id', 'sl', 'actions'], // Two columns that will always remain visible


    };
  },
  components: {
    ValidationProvider,
    ValidationObserver,
    Spinner,
  },
  computed: {
    statusFilter() {
      // Define the default options
      let options = [
        { text: this.$i18n.locale == 'en' ? 'Solved' : 'সমাধান', value: 2 },
        { text: this.$i18n.locale == 'en' ? 'Cancel' : 'বাতিল', value: 3 },
        { text: this.$i18n.locale == 'en' ? 'Forward' : 'ফরোয়ার্ড', value: 1 },
        { text: this.$i18n.locale == 'en' ? 'In Progress' : 'চলমান', value: 4 }
      ];
      return options;
    },
    statusOptions() {
      this.userRoleId = this.userData.roles ? this.userData.roles.map(role => role.id) : [];
      // Define the default options
      let options = [
        { text: this.$i18n.locale == 'en' ? 'Solved' : 'সমাধান', value: 2 },
        { text: this.$i18n.locale == 'en' ? 'Cancel' : 'বাতিল', value: 3 },
        { text: this.$i18n.locale == 'en' ? 'Forward' : 'ফরোয়ার্ড', value: 1 }
      ];

      // Conditionally add the "In Progress" option
      if (this.userRoleId == this.firstOfficerId) {
        options.push({ text: this.$i18n.locale == 'en' ? 'In Progress' : 'চলমান', value: 4 });
      }

      return options;
    },
    language: {
      get() {
        return this.$store.getters.getAppLanguage;
      },
    },


    isForwardButtonDisabled() {
      // Disable the button if no applications are selected
      return !(this.forward.applications_id && this.forward.applications_id.length > 0 && this.forward.committee_id !== null);
    },
    isButtonDisabled() {
      return !(this.forward.applications_id && this.forward.applications_id.length > 0);
    },



    ...mapState({
      divisions: (state) => state.Division.divisions,
      userData: (state) => state.userData
    }),
    userRoleNames() {
      // Extract the 'name' property from each role object
      return this.userData.roles ? this.userData.roles.map(role => role.name) : [];
    },
    visibleHeaders() {
      // Combine fixed columns and selected columns
      const allVisibleColumns = [...this.fixedColumns, ...this.selectedColumns];

      // Filter the headers based on the visible columns
      return this.headers.filter((column) =>
        allVisibleColumns.includes(column.value)
      );
    },
    selectableColumns() {
      // Filter the columns that can be selected (exclude fixed columns)
      return this.headers.filter((column) => !column.fixed);
    },
    headers() {
      return [

        { text: this.$t("container.list.sl"), value: "sl", fixed: true },
        {
          text: this.$t(
            "container.grievance_management.grievanceEntry.name"
          ),
          value: "name",

        },

        {
          text: this.$t(
            "container.grievance_management.grievanceList.tracking_no"
          ),
          value: "tracking_no",

        },
        {
          text: this.$t(
            "container.grievance_management.main_grievance_type"
          ),
          value: "grievanceType",


        },
        {
          text: this.$t("container.grievance_management.grievance_subject"),
          value: "grievanceSubject",

        },

        {
          text: this.$t("container.application_selection.application.mobile"),
          value: "mobile",

        },
        {
          text: this.$t("container.grievance_management.grievanceList.grievance_date"),
          value: "created_at",

        },
        {
          text: this.$t("container.grievance_management.grievanceList.resolved_officer"),
          value: "resolved_officer",

        },

        {
          text: this.$t("container.beneficiary_management.beneficiary_list.nid"),
          value: "verification_number",

        },

        {
          text: this.$t("container.system_config.demo_graphic.division.division"),
          value: "division",
        },
        {
          text: this.$t("container.system_config.demo_graphic.district.district"),
          value: "district",
        },



        {
          text: this.$t("container.list.status"),
          value: "status",

        },


        { text: this.$t("container.list.action"), value: "actions", fixed: true },

      ];
    },
  },

  methods: {
    resetDateRange() {
      this.dates = [];
      this.menu = false;
      this.fetchProgramwiseApproveApplicationChartData()
    },
    async fetchProgramwiseApproveApplicationChartData(from_date = null, to_date = null) {
      await this.GetGrievance(from_date, to_date);
    },
    OnChangeDateInfo(event, type) {
      console.log(event.length, 'length');
      if (this.dates.length < 2) {
        return;
      }

      if (this.dates[1] && this.dates[1] < this.dates[0]) {
        this.$toast.error(this.language == 'en' ? 'End date cannot be before start date' : 'শেষ তারিখ শুরুর তারিখের আগে হতে পারে না')
        this.resetDateRange();
      }

      let from_date = null;
      let to_date = null;

      if (event.length === 2) {
        from_date = event[0];
        to_date = event[1];
      }
      console.log(from_date, to_date, 'check date');
      this.fetchProgramwiseApproveApplicationChartData(from_date, to_date);
    },
    async GetGrievanceSolutionType() {
      try {
        this.$store.dispatch("getLookupByType", 25).then((data) => {
          this.solutionType = data;
        });
      } catch (e) {
        console.log(e);
      }
    },
    submitGrievanceStatus() {
      const queryParams = {
        id: this.data.id,
        forwardOfficer: this.data.forwardOfficer,
        status: this.data.status,
        solution: this.data.solution,
        remarks: this.data.remarks,
        documents: this.data.documents,
      };
      this.$axios
        .post("admin/grievance/update-status", queryParams, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          this.resetForm();
          this.dialogAdd = false;
          this.data.id = '';
          this.data.forwardOfficer = '';
          this.data.status = '';
          this.data.solution = '';
          this.data.remarks = '';
          this.data.documents = '';
          this.GetGrievance();
        })
        .catch((err) => {
        });
    },
    createGrievanceDialog(item) {
      this.resetForm()
      const queryParams = {
        subjectId: item.grievance_subject?.id,
        typeId: item.grievance_type?.id,
        status: 'active',
      };
      this.$axios
        .get("/admin/grievance/settings/get", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
          params: queryParams,
        })
        .then((result) => {
          // this.setting = result.data;
          const data = result.data;
          this.userRoleId = this.userData.roles ? this.userData.roles.map(role => role.id) : [];
          console.log(this.userRoleId[0], 'user role name');
          this.forward_to = [
            data.first_officer,
            data.secound_officer,
            data.third_officer
          ];
          // Filter the forward_to array based on userRoleId
          this.forward_to = this.forward_to.filter(role => !this.userRoleId.includes(role.id));
          console.log(this.forward_to, 'this.forward_tothis.forward_to');

          this.firstOfficerId = data?.first_officer?.id;

          //   const totalDay = this.calculateTotalDaysFromToday(item.created_at);
          //   const first_tire_solution_time = this.setting?.first_tire_solution_time;
          //   const secound_tire_solution_time = this.setting?.secound_tire_solution_time;
          //   const third_tire_solution_time = this.setting?.third_tire_solution_time;
          //   console.log(this.data.status,'status');
          //   console.log(totalDay <= first_tire_solution_time,'time');
          // if(this.data.status <=1){
          //    if (this.data.status == 0 || totalDay <= first_tire_solution_time && first_tire_solution_time !=null) {
          //       console.log(first_tire_solution_time, 'first_tire_solution_time');
          //       this.data.forwardOfficer = this.language === 'bn' ? this.setting?.first_officer?.name_bn : this.setting.first_officer?.name_en
          //     } else if (this.data.status==1 || totalDay <= secound_tire_solution_time && secound_tire_solution_time != null) {
          //       console.log('secound_tire_solution_time');
          //       this.data.forwardOfficer = this.language === 'bn' ? this.setting?.secound_officer?.name_bn : this.setting.secound_officer?.name_en
          //     } else if (totalDay <= third_tire_solution_time && third_tire_solution_time != null) {
          //       console.log('secound_tire_solution_time');
          //       this.data.forwardOfficer = this.language === 'bn' ? this.setting?.third_officer?.name_bn : this.setting.third_officer?.name_en
          //     } else {
          //       console.log('2222222222');
          //       this.data.status = 4
          //     }
          // }

        });
      if (this.$refs.formAdd) {
        this.$refs.formAdd.reset();
      }
      this.resetForm();
      this.dialogAdd = true;
      this.data.id = item.id
      this.data.status = item.status
      this.data.tracking_no = item.tracking_no
      this.data.grievanceSubject = this.language === 'bn' ? item.grievance_subject?.title_bn : item.grievance_subject?.title_en
      this.data.grievanceType = this.language === 'bn' ? item.grievance_type?.title_bn : item.grievance_type?.title_en
      this.data.created_at = item.created_at
    },
    calculateTotalDaysFromToday(dateString) {
      const date = new Date(dateString);
      if (isNaN(date)) {
        console.error('Invalid date provided');
        return null;
      }

      const today = new Date();
      const differenceInTime = today - date; // Subtracting two Date objects gives the difference in milliseconds
      const differenceInDays = Math.round(differenceInTime / (1000 * 3600 * 24));
      return differenceInDays;
    },

    getItemText(item) {
      return this.language === 'bn' ? item.name_bn : item.name_en;
    },
    showDetailsModalClose() {
      this.showModal = false;
    },
    // show details modal
    showDetailsModal(item) {
      this.showModal = true;
      this.data.status = item.status
      this.data.tracking_no = item.tracking_no
      this.data.resolved_officer = item.resolved_officer
      this.data.grievanceSubject = this.language === 'bn' ? item.grievance_subject?.title_bn : item.grievance_subject?.title_en
      this.data.grievanceType = this.language === 'bn' ? item.grievance_type?.title_bn : item.grievance_type?.title_en
      this.data.resolved_officer = this.language === 'bn' ? item.resolver?.name_bn : item.resolver?.name_en
      this.data.created_at = item.created_at
      this.data.details = item.details

    },
    Division() {
      this.data.division_id != null;
    },

    isReadonlyDivision() {
      if (this.permissions?.user?.office_type) {
        const officeType = this.permissions?.user?.office_type;
        return [6, 7, 8, 9, 10, 11, 35].includes(officeType);
      }
      if (this.permissions?.user?.committee_type_id) {
        const CommitteeType = this.permissions?.user?.committee_type_id;
        return [12, 13, 14, 15, 16, 17].includes(CommitteeType);
      }
      return false;
    },
    isReadonlyDistrict() {
      if (this.permissions?.user?.office_type !== null) {
        const officeType = this.permissions?.user?.office_type;
        return [7, 8, 9, 10, 11, 35].includes(officeType);
      }
      if (this.permissions?.user?.committee_type_id !== null) {
        const CommitteeType = this.permissions?.user?.committee_type_id;
        return [12, 13, 14, 15, 16, 17].includes(CommitteeType);
      }
      return false;
    },
    isReadonlyLocationType() {
      if (this.permissions?.user?.office_type) {
        const officeType = this.permissions?.user?.office_type;
        return [8, 9, 10, 11, 35].includes(officeType);
      }
      if (this.permissions?.user?.committee_type_id) {
        const CommitteeType = this.permissions?.user?.committee_type_id;
        return [12, 13, 14, 15, 16].includes(CommitteeType);
      }
      return false;
    },
    isReadonlyUpazila() {
      if (this.permissions?.user?.office_type) {
        const officeType = this.permissions?.user?.office_type;
        return [8, 10, 11].includes(officeType);
      }
      if (this.permissions?.user?.committee_type_id) {
        const CommitteeType = this.permissions?.user?.committee_type_id;
        return [12, 14].includes(CommitteeType);
      }
      return false;
    },
    isReadonlySubLocation() {
      if (this.permissions?.user?.committee_type_id) {
        const CommitteeType = this.permissions?.user?.committee_type_id;
        return [12].includes(CommitteeType);
      }
      return false;
    },
    isReadonlyPouro() {
      if (this.permissions?.user?.committee_type_id) {
        const CommitteeType = this.permissions?.user?.committee_type_id;
        return [12].includes(CommitteeType);
      }
      return false;
    },
    isReadonlyUnion() {
      if (this.permissions?.user?.committee_type_id) {
        const CommitteeType = this.permissions?.user?.committee_type_id;
        return [12].includes(CommitteeType);
      }
      return false;
    },
    isReadonlyCity() {
      if (this.permissions?.user?.office_type) {
        const officeType = this.permissions?.user?.office_type;
        return [9].includes(officeType);
      }
      if (this.permissions?.user?.committee_type_id) {
        const CommitteeType = this.permissions?.user?.committee_type_id;
        return [15, 13].includes(CommitteeType);
      }
      return false;
    },
    isReadonlyDistPouro() {
      if (this.permissions?.user?.office_type) {
        const officeType = this.permissions?.user?.office_type;
        return [35].includes(officeType);
      }
      if (this.permissions?.user?.committee_type_id) {
        const CommitteeType = this.permissions?.user?.committee_type_id;
        return [16, 13].includes(CommitteeType);
      }
      return false;
    },

    resetForm() {
      this.data.division_id = null;
      this.data.district_id = null;
      this.data.thana_id = null;
      this.data.union_id = null;
      this.data.city_id = null;
      this.data.city_thana_id = null;
      this.data.district_pouro_id = null;
      this.data.pouro_id = null;
      this.data.ward_id = null;
      this.data.location_type = null;
      this.data.sub_location_type = null;
      this.data.name = null;
      this.data.tracking_no = null;
      this.data.verification_number = null;
      this.data.documents = null;
      this.data.dates = null;
      this.data.name = null;
      this.data.mobile = null;
      this.data.status = null;

      this.data.grievanceSubject = null;
      this.data.grievanceType = null;
      this.GetPermissions();
      this.GetGrievance();
      this.dates = [];
      this.menu = false;
      this.fetchProgramwiseApproveApplicationChartData()
    },
    GetPermissions() {
      http()
        .get("/admin/application/permissions", {})
        .then((result) => {
          this.permissions = result.data.data;
          if (
            this.permissions?.user?.office_type == 8 ||
            this.permissions?.user?.office_type == 9 ||
            this.permissions?.user?.office_type == 10 ||
            this.permissions?.user?.office_type == 11 ||
            this.permissions?.user?.office_type == 35
          ) {
            this.data.division_id =
              this.permissions?.user?.assign_location.parent?.parent?.id;
            this.onChangeDivision(this.data.division_id);
            this.data.district_id =
              this.permissions?.user?.assign_location.parent?.id;
            this.data.location_type =
              this.permissions?.user?.assign_location?.location_type;
            if (
              this.permissions?.user?.office_type == 8 ||
              this.permissions?.user?.office_type == 10 ||
              this.permissions?.user?.office_type == 11
            ) {
              this.onChangeDistrict(this.data.district_id);

              this.data.thana_id = this.permissions?.user?.assign_location.id;
            }
            if (this.permissions?.user?.office_type == 9) {
              this.onChangeDistrict(this.data.district_id);
              this.LocationType(3);

              this.data.city_id = this.permissions?.user?.assign_location.id;
              this.onChangeCity(this.data.city_id);
            }
            if (this.permissions?.user?.office_type == 35) {
              this.onChangeDistrict(this.data.district_id);

              this.data.district_pouro_id =
                this.permissions?.user?.assign_location.id;
              this.onChangeDistrictPouroGetWard(this.data.district_pouro_id);
              console.log(this.wards, "wards in permission 35");
            }
          }
          if (this.permissions?.user?.office_type == 6) {
            this.data.division_id = this.permissions?.user?.assign_location?.id;
            this.onChangeDivision(this.data.division_id);
            console.log(this.wards, "wards in permission 6");
          }
          if (this.permissions?.user?.office_type == 7) {
            this.data.division_id =
              this.permissions?.user?.assign_location?.parent?.id;
            this.onChangeDivision(this.data.division_id);
            this.data.district_id = this.permissions?.user?.assign_location?.id;
            console.log(this.wards, "wards in permission 7");
          }
          //committee Logic
          if (
            this.permissions?.user?.committee_type_id == 15 ||
            this.permissions?.user?.committee_type_id == 14 ||
            this.permissions?.user?.committee_type_id == 16
          ) {
            this.data.division_id =
              this.permissions?.user?.assign_location.parent?.parent?.id;
            this.onChangeDivision(this.data.division_id);
            this.data.district_id =
              this.permissions?.user?.assign_location.parent?.id;
            this.data.location_type =
              this.permissions?.user?.assign_location?.location_type;
            console.log(this.data.division_id, this.data.district_id, "grpou");

            if (this.permissions?.user?.committee_type_id == 15) {
              this.onChangeDistrict(this.data.district_id);
              this.data.city_id = this.permissions?.user?.assign_location.id;
              this.onChangeCity(this.data.city_id);

              console.log(
                this.data.ward_id,
                this.data.district_id,
                "individual 15"
              );
            }
            if (this.permissions?.user?.committee_type_id == 14) {
              this.onChangeDistrict(this.data.district_id);
              this.data.thana_id = this.permissions?.user?.assign_location.id;
              console.log(
                this.data.ward_id,
                this.data.district_id,
                "individual 14"
              );
            }
            if (this.permissions?.user?.committee_type_id == 16) {
              this.onChangeDistrict(this.data.district_id);
              this.data.district_pouro_id =
                this.permissions?.user?.assign_location.id;
              this.onChangeDistrictPouroGetWard(this.data.district_pouro_id);
              console.log(
                this.data.ward_id,
                this.data.district_id,
                "individual 16"
              );
            }
          }
          if (this.permissions?.user?.committee_type_id == 12) {
            this.data.division_id =
              this.permissions?.user?.assign_location.parent?.parent?.parent?.id;
            this.onChangeDivision(this.data.division_id);
            this.data.district_id =
              this.permissions?.user?.assign_location.parent?.parent?.id;
            this.data.location_type =
              this.permissions?.user?.assign_location?.location_type;
            console.log(this.data.location_type, "this.data.location_type  12");
            this.onChangeDistrict(this.data.district_id);
            this.data.thana_id =
              this.permissions?.user?.assign_location.parent?.id;
            this.onChangeUpazila(this.data.thana_id);
            console.log(
              this.data.division_id,
              this.data.district_id,
              "individual 12"
            );
            if (this.permissions?.user?.assign_location.type == "union") {
              this.data.sub_location_type = 2;
              this.onChangeSubLocationType(this.data.sub_location_type);
              this.data.union_id = this.permissions?.user?.assign_location.id;
              this.onChangeUnionGetWard(this.data.union_id);
            }
            if (this.permissions?.user?.assign_location.type == "pouro") {
              this.data.sub_location_type = 1;
              this.onChangeSubLocationType(this.data.sub_location_type);
              this.data.pouro_id = this.permissions?.user?.assign_location.id;
              this.onChangePouroGetWard(this.data.pouro_id);
            }
            console.log(
              this.data.ward_id,
              this.data.district_id,
              "individual 12"
            );
          }
          if (
            this.permissions?.user?.committee_type_id == 13 &&
            this.permissions?.user?.assign_location?.location_type == 3
          ) {
            this.data.division_id =
              this.permissions?.user?.assign_location.parent?.parent?.parent?.parent?.id;
            this.onChangeDivision(this.data.division_id);
            this.data.district_id =
              this.permissions?.user?.assign_location.parent?.parent?.parent?.id;
            this.data.location_type =
              this.permissions?.user?.assign_location?.location_type;
            this.onChangeDistrict(this.data.district_id);
            this.data.city_id =
              this.permissions?.user?.assign_location.parent?.parent?.id;
            this.onChangeCity(this.data.thana_id);
            this.data.city_thana_id =
              this.permissions?.user?.assign_location.parent?.id;
            this.onChangeThanaGetWard(this.data.city_thana_id);

            this.data.ward_id = this.permissions?.user?.assign_location.id;
            console.log(
              this.data.ward_id,
              this.data.ward_id,
              "individual 13 3"
            );

            console.log(this.wards, "wards in permission committee 13 3");
          }
          if (
            this.permissions?.user?.committee_type_id == 13 &&
            this.permissions?.user?.assign_location?.location_type == 1
          ) {
            this.data.division_id =
              this.permissions?.user?.assign_location.parent?.parent?.parent?.id;
            this.onChangeDivision(this.data.division_id);
            this.data.district_id =
              this.permissions?.user?.assign_location.parent?.parent?.id;
            this.data.location_type =
              this.permissions?.user?.assign_location?.location_type;
            this.onChangeDistrict(this.data.district_id);
            this.data.district_pouro_id =
              this.permissions?.user?.assign_location.parent?.id;
            this.onChangeDistrictPouroGetWard(this.data.district_pouro_id);
            this.data.ward_id = this.permissions?.user?.assign_location.id;

            console.log(
              this.data.ward_id,
              this.data.ward_id,
              "individual 13 1"
            );
            console.log(this.wards, "wards in permission committee 13 1");
          }

          if (this.permissions?.user?.committee_type_id == 17) {
            this.data.division_id =
              this.permissions?.user?.assign_location?.parent?.id;
            this.onChangeDivision(this.data.division_id);
            this.data.district_id = this.permissions?.user?.assign_location?.id;
            console.log(
              this.data.ward_id,
              this.data.district_id,
              "individual 17"
            );
          }
          console.log(this.cities, " this.cities");
          console.log(this.data.ward_id, "ward_final");
          console.log(this.permissions, "permi");
          console.log(this.data, "data");
          console.log(this.wards, "wards_final");
        })
        .catch((err) => {
          console.log(err);
        });
    },

    appendIconCallback() {
      // Handle the click event for the custom append icon here
    },
    appendIcon() {
      return "mdi-plus"; // Use the appropriate Material Design Icons (MDI) class for the "+" icon
    },
    toggleFieldVisibility() {
      this.isFieldVisible = !this.isFieldVisible;
    },
    ...mapActions({
      GetAllDivisions: "Division/GetAllDivisions",
    }),
    updateVisibleColumns() {
      // Triggered when the selected columns change
      // Update the visibleHeaders based on the selected columns
      this.visibleHeaders = this.headers.filter((column) =>
        this.selectedColumns.includes(column.value)
      );
    },


    async LocationType($event) {
      this.wards = [];
      if ($event === 1 || $event === 3) {
        this.data.sub_location_type = null;
      }

      if (this.data.district_id != null && this.data.location_type != null) {
        if ($event === 2) {
          await this.$axios
            .get(`/global/thana/get/${this.data.district_id}`, {
              headers: {
                Authorization: "Bearer " + this.$store.state.token,
                "Content-Type": "multipart/form-data",
              },
            })
            .then((result) => {
              this.thanas = result.data.data;
              //emu
              // this.wards = [];
              // this.data.ward_id = null;
              this.cities = [];
              this.district_poros = [];

              this.data.city_id = null;
              this.data.city_thana_id = null;
              this.data.district_pouro_id = null;
              //emu
              // this.wards = [];
              // this.ward_id = null;
            });
        }
        if ($event === 3) {
          await this.$axios
            .get("/global/city/get/" + this.data.district_id + "/" + $event, {
              headers: {
                Authorization: "Bearer " + this.$store.state.token,
                "Content-Type": "multipart/form-data",
              },
            })
            .then((result) => {
              this.cities = result.data.data;
              //emu
              // this.wards = [];
              // this.data.ward_id = null;
              this.thanas = [];
              this.district_poros = [];
              this.data.thana_id = null;
              this.data.union_id = null;
              this.data.district_pouro_id = null;
              this.data.pouro_id = null;
              //emu
              // this.wards = [];
              // this.ward_id = null;
            });
        }
        if ($event === 1) {
          await this.$axios
            .get("/global/city/get/" + this.data.district_id + "/" + $event, {
              headers: {
                Authorization: "Bearer " + this.$store.state.token,
                "Content-Type": "multipart/form-data",
              },
            })
            .then((result) => {
              this.district_poros = result.data.data;
              //emu
              // this.wards = [];
              this.data.ward_id = null;
              this.cities = [];
              this.thanas = [];
              this.thana_id = null;
              this.union_id = null;
              this.city_id = null;
              this.city_thana_id = null;
              this.pouro_id = null;
            });
        }
      }
    },
    async onChangeSubLocationType(event) {
      // alert(event);
      this.data.ward_id = null;

      if (event == 1) {
        await this.$axios
          .get(`/global/union/pouro/get/${this.data.thana_id}`, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((result) => {
            this.pouros = result.data.data;
          });
        this.data.union_id = null;
      }
      if (event == 2) {
        this.onChangeUpazila(this.data.thana_id);
        this.data.pouro_id = null;
      }
    },
    async onChangeUpazila(event) {
      if (this.data.sub_location_type == 1) {
        this.onChangeSubLocationType(1);
      } else {
        await this.$axios
          .get(`/global/union/get/${this.data.thana_id}`, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((result) => {
            this.unions = result.data.data;
          });
      }
    },

    async onChangeDivision(event) {
      await this.$axios
        .get(`/global/district/get/${event}`, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          this.districts = result.data.data;
        });
    },
    async onChangeDistrict(event) {
      await this.$axios
        .get(`/global/thana/get/${event}`, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          this.LocationType(this.data.location_type);
          this.thanas = result.data.data;
        });
    },
    async onChangeThana(event) {
      await this.$axios
        .get(`/global/union/get/${event}`, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          this.unions = result.data.data;
        });
    },
    async onChangeCity(event) {
      await this.$axios
        .get(`/global/thana/get/city/${this.data.city_id}`, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          this.city_thanas = result.data.data;
        });
    },
    async onChangeUnionGetWard(event) {
      await this.$axios
        .get(`/global/ward/get/${event}`, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          this.wards = result.data.data;
        });
    },
    async onChangePouroGetWard(event) {
      await this.$axios
        .get(`/global/ward/get/pouro/${event}`, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          this.wards = result.data.data;
        });
    },

    async onChangeDistrictPouroGetWard(event) {
      await this.$axios
        .get(`/global/ward/get/pouro/${this.data.district_pouro_id}`, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          this.wards = result.data.data;
        });
    },
    async onChangeThanaGetWard(event) {
      await this.$axios
        .get(`/global/ward/get/thana/${event}`, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          this.wards = result.data.data;
        });
    },

    onPageChange($event) {
      // this.pagination.current = $event;
      this.GetGrievance();
    },
    onPageSetup($event) {
      this.pagination.current = 1;
      this.GetGrievance();
    },

    async GetGrievance(from_date = null, to_date = null) {
       this.loading = true;
      const queryParams = {
        searchText: this.search,
        verification_number: this.data.verification_number,
        tracking_no: this.data.tracking_no,
        grievanceType: this.data.grievanceType,
        grievanceSubject: this.data.grievanceSubject,
        division_id: this.data.division_id,
        district_id: this.data.district_id,
        location_type: this.data.location_type,

        thana_id: this.data.thana_id,
        union_id: this.data.union_id,
        city_id: this.data.city_id,
        city_thana_id: this.data.city_thana_id,
        district_pouro_id: this.data.district_pouro_id,
        pouro_id: this.data.pouro_id,
        sub_location_type: this.data.sub_location_type,
        ward_id: this.data.ward_id,
        status: this.data.status_list,
        perPage: this.pagination.perPage,
        page: this.pagination.current,

        name: this.data.name,
        mobile: this.data.mobile,
        status: this.data.status,
        start_date: from_date,
        end_date: to_date,
      };
      this.$axios
        .get("/admin/grievance/get", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
          params: queryParams,
        })
        .then((result) => {
          this.loading = false;
          this.applications = result.data.data;
          this.userRoleId = this.userData.roles ? this.userData.roles.map(role => role.id) : [];
          this.total = result.data.total;
          this.pagination.current = result.data.current_page;
          this.pagination.total = result.data.last_page;
          this.pagination.grand_total = result.data.total;
        });


    },

    async GeneratePDF() {
      this.isLoading = true;
      const queryParams = {

        searchText: this.search,
        application_id: this.data.application_id,
        nominee_name: this.data.nominee_name,
        account_no: this.data.account_no,
        status: this.data.status,
        program_id: this.data.program_id,
        nid_no: this.data.nid_no,
        division_id: this.data.division_id,
        district_id: this.data.district_id,
        location_type_id: this.data.location_type,
        thana_id: this.data.thana_id,
        union_id: this.data.union_id,
        city_id: this.data.city_id,
        city_thana_id: this.data.city_thana_id,
        district_pouro_id: this.data.district_pouro_id,
        pouro_id: this.data.pouro_id,
        sub_location_type: this.data.sub_location_type,
        ward_id: this.data.ward_id,
        status: this.data.status_list,
        perPage: this.total,
        // perPage: this.pagination.perPage,
        page: this.pagination.current,
        language: this.$i18n.locale,
        selectedColumns: this.selectedColumns,

      };
      await this.$axios
        .get("/admin/grievance/get", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
          params: queryParams,
        })
        .then((result) => {
          this.applications = result.data.data;
        });

      const CustomInfo = this.applications.map(((i, index) => {
        let divisionName = '';
        let districtName = '';
        let location = '';
        let union_pouro_city = '';
        let status = '';
        if (i) {
          if (i.status === 0) {
            status = this.$i18n.locale == 'en' ? "Not Solved" : "সমাধান হয়নি";
          } else if (i.status === 1) {
            status = this.$i18n.locale == 'en' ? "Forwarded" : "ফরোয়ার্ড করা হয়েছে";
          } else if (i.status === 2) {
            status = this.$i18n.locale == 'en' ? "Approved" : "অনুমোদিত";
          } else if (i.status === 3) {
            status = this.$i18n.locale == 'en' ? "Canceled" : "বাতিল";
          } else if (i.status === 4) {
            status = this.$i18n.locale == 'en' ? "In Progress" : "চলমান";
          }
        }

        if (i?.location_type_id == '1') {
          divisionName = this.$i18n.locale == 'en' ? i?.permanent_location?.parent?.parent?.parent?.name_en : i?.permanent_location?.parent?.parent?.parent?.name_bn;
          districtName = this.$i18n.locale == 'en' ? i?.permanent_location?.parent?.parent?.name_en : i?.permanent_location?.parent?.parent?.name_bn;
          location = this.$i18n.locale == 'en' ? i?.permanent_location?.parent?.name_en : i?.permanent_location?.parent?.name_bn;
        } else if (i?.permanent_location_type_id == '2' || i?.permanent_location_type_id == '3') {
          divisionName = this.$i18n.locale == 'en' ? i?.permanent_location?.parent?.parent?.parent?.parent?.name_en : i?.permanent_location?.parent?.parent?.parent?.parent?.name_bn;
          districtName = this.$i18n.locale == 'en' ? i?.permanent_location?.parent?.parent?.parent?.name_en : i?.permanent_location?.parent?.parent?.parent?.name_bn;
          location = this.$i18n.locale == 'en' ? i?.permanent_location?.parent?.parent?.name_en : i?.permanent_location?.parent?.parent?.name_bn;
          union_pouro_city = this.$i18n.locale == 'en' ? i?.permanent_location?.parent?.name_en : i?.permanent_location?.parent?.name_bn;
        }
        return {
          'sl': this.$i18n.locale == 'en' ? index + 1 : this.$helpers.englishToBangla(index + 1),
          'tracking_no': i?.tracking_no,
          'grievanceType': this.$i18n.locale == 'en' ? i?.grievance_type?.title_en : i?.grievance_type?.title_bn,
          'grievanceSubject': this.$i18n.locale == 'en' ? i?.grievance_subject?.title_en : i?.grievance_subject?.title_bn,
          'resolved_officer': this.$i18n.locale == 'en' ? i?.resolver?.name_en : i?.resolver?.name_bn,
          'created_at': this.$i18n.locale == 'en' ? this.formatDate(i?.created_at) : this.formatDate(i?.created_at),
          'name': i?.name,
          'status': status,
          'verification_number': i?.verification_number,
          'division': this.$i18n.locale == 'en' ? i?.division?.name_en : i?.division?.name_bn,
          'district': this.$i18n.locale == 'en' ? i?.district?.name_en : i?.district?.name_bn,
          'district': this.$i18n.locale == 'en' ? i?.district?.name_en : i?.district?.name_bn,
          'location': this.$i18n.locale == 'en' ? i?.city_corporation?.name_en : i?.city_corporation?.name_bn,
          'mobile': i?.mobile,
        }
      }));

      const filteredTexts = this.headers
        .filter(header => this.selectedColumns.includes(header.value))
        .map(header => header.text);

      const filteredValue = this.headers
        .filter(header => this.selectedColumns.includes(header.value))
        .map(header => header.value);

      const HeaderInfo = [this.$t("container.list.sl"), ...filteredTexts];

      const selectColumn = ['sl', ...filteredValue]

      const Info = CustomInfo.map(application => {
        const filteredValues = selectColumn.map(header => application[header]);
        return filteredValues;
      });

      const queryParam = {
        language: this.$i18n.locale,
        data: Info,
        header: HeaderInfo,
        fileName: this.$t("container.grievance_management.grievanceList.grievance_list"),
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

    async GenerateExcel() {

      const queryParams = {

        searchText: this.search,
        application_id: this.data.application_id,
        nominee_name: this.data.nominee_name,
        account_no: this.data.account_no,
        status: this.data.status,
        program_id: this.data.program_id,
        nid_no: this.data.nid_no,
        division_id: this.data.division_id,
        district_id: this.data.district_id,
        location_type_id: this.data.location_type,
        thana_id: this.data.thana_id,
        union_id: this.data.union_id,
        city_id: this.data.city_id,
        city_thana_id: this.data.city_thana_id,
        district_pouro_id: this.data.district_pouro_id,
        pouro_id: this.data.pouro_id,
        sub_location_type: this.data.sub_location_type,
        ward_id: this.data.ward_id,
        status: this.data.status_list,
        perPage: this.total,
        // perPage: this.pagination.perPage,
        page: this.pagination.current,
        language: this.$i18n.locale,
        selectedColumns: this.selectedColumns,

      };
      await this.$axios
        .get("/admin/grievance/get", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
          params: queryParams,
        })
        .then((result) => {
          this.applications = result.data.data;

          const CustomInfo = this.applications.map(((i, index) => {
            let divisionName = '';
            let districtName = '';
            let location = '';
            let union_pouro_city = '';
            let status = '';
            if (i) {
              if (i.status === 0) {
                status = this.$i18n.locale == 'en' ? "Not Solved" : "সমাধান হয়নি";
              } else if (i.status === 1) {
                status = this.$i18n.locale == 'en' ? "Forwarded" : "ফরোয়ার্ড করা হয়েছে";
              } else if (i.status === 2) {
                status = this.$i18n.locale == 'en' ? "Approved" : "অনুমোদিত";
              } else if (i.status === 3) {
                status = this.$i18n.locale == 'en' ? "Canceled" : "বাতিল";
              } else if (i.status === 4) {
                status = this.$i18n.locale == 'en' ? "In Progress" : "চলমান";
              }
            }

            if (i?.permanent_location_type_id == '1') {
              divisionName = this.$i18n.locale == 'en' ? i?.permanent_location?.parent?.parent?.parent?.name_en : i?.permanent_location?.parent?.parent?.parent?.name_bn;
              districtName = this.$i18n.locale == 'en' ? i?.permanent_location?.parent?.parent?.name_en : i?.permanent_location?.parent?.parent?.name_bn;
              location = this.$i18n.locale == 'en' ? i?.permanent_location?.parent?.name_en : i?.permanent_location?.parent?.name_bn;
            } else if (i?.permanent_location_type_id == '2' || i?.permanent_location_type_id == '3') {
              divisionName = this.$i18n.locale == 'en' ? i?.permanent_location?.parent?.parent?.parent?.parent?.name_en : i?.permanent_location?.parent?.parent?.parent?.parent?.name_bn;
              districtName = this.$i18n.locale == 'en' ? i?.permanent_location?.parent?.parent?.parent?.name_en : i?.permanent_location?.parent?.parent?.parent?.name_bn;
              location = this.$i18n.locale == 'en' ? i?.permanent_location?.parent?.parent?.name_en : i?.permanent_location?.parent?.parent?.name_bn;
              union_pouro_city = this.$i18n.locale == 'en' ? i?.permanent_location?.parent?.name_en : i?.permanent_location?.parent?.name_bn;
            }

            return {
              'sl': this.$i18n.locale == 'en' ? index + 1 : this.$helpers.englishToBangla(index + 1),
              'tracking_no': i?.tracking_no,
              'grievanceType': this.$i18n.locale == 'en' ? i?.grievance_type?.title_en : i?.grievance_type?.title_bn,
              'grievanceSubject': this.$i18n.locale == 'en' ? i?.grievance_subject?.title_en : i?.grievance_subject?.title_bn,
              'created_at': this.$i18n.locale == 'en' ? this.formatDate(i?.created_at) : this.formatDate(i?.created_at),
              'name': i?.name,
              'resolved_officer': this.$i18n.locale == 'en' ? i?.resolver?.name_en : i?.resolver?.name_bn,
              'status': status,
              'verification_number': i?.verification_number,
              'division': this.$i18n.locale == 'en' ? i?.division?.name_en : i?.division?.name_bn,
              'district': this.$i18n.locale == 'en' ? i?.district?.name_en : i?.district?.name_bn,
              'district': this.$i18n.locale == 'en' ? i?.district?.name_en : i?.district?.name_bn,
              'location': this.$i18n.locale == 'en' ? i?.city_corporation?.name_en : i?.city_corporation?.name_bn,
              'mobile': i?.mobile,
            }
          }));

          const filteredTexts = this.headers
            .filter(header => this.selectedColumns.includes(header.value))
            .map(header => header.text);

          const filteredValue = this.headers
            .filter(header => this.selectedColumns.includes(header.value))
            .map(header => header.value);

          const HeaderInfo = [this.$t("container.list.sl"), ...filteredTexts];

          const selectColumn = ['sl', ...filteredValue]

          const Info = CustomInfo.map(application => {
            const filteredValues = selectColumn.map(header => application[header]);
            return filteredValues;
          });

          try {
            import('@/plugins/Export2Excel').then((excel) => {
              const Field = selectColumn

              const Data = this.FormatJson(Field, CustomInfo)
              const currentDate = new Date().toISOString().slice(0, 10); //
              let dateinfo = queryParams.language == 'en' ? currentDate : this.$helpers.englishToBangla(currentDate)

              const filenameWithDate = `${dateinfo}_${this.$t("container.grievance_management.grievanceList.grievance_list")}`;

              excel.export_json_to_excel({
                header: HeaderInfo,
                data: Data,
                sheetName: filenameWithDate,
                filename: filenameWithDate,
                autoWidth: true,
                bookType: "xlsx"
              })
            })
          } catch (error) {
            // Handle any errors here
            console.error("An error occurred:", error);
            this.isLoading = false;
          } finally {
            this.isLoading = false;
          }
        });

    },

    FormatJson(FilterData, JsonData) {
      return JsonData.map((v) =>
        FilterData.map((j => {
          return v[j];
        })))
    },

    submitsearch() {
      this.GetGrievance();


    },

    updateHeaderTitle() {
      const title = this.$t("container.application_selection.application.list");
      this.$store.commit("setHeaderTitle", title);
    },
    // date formater function
    formatDate(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = ('0' + (date.getMonth() + 1)).slice(-2); // Adding 1 because months are zero-based
      const day = ('0' + date.getDate()).slice(-2);
      return `${day}-${month}-${year}`;
    },
    async GetGrievanceType() {
      const queryParams = {
        status: 'active',
      };
      this.$axios
        .get("/global/grievanceType/get", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
          params: queryParams,
        })
        .then((result) => {
          this.types = result.data.data;
          console.log(this.types, ' this.types');

        });
    },
    async GetGrievanceSubject() {
      const queryParams = {
        status: 'active',
      };
      this.$axios
        .get("/global/grievanceSubject/get", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
          params: queryParams,
        })
        .then((result) => {
          this.subjects = result.data.data;

        });
    },
  },
  watch: {
    "$i18n.locale": "updateHeaderTitle",
  },
  created() {
    this.GetAllDivisions();
    this.GetGrievanceType();
    this.GetGrievanceSubject();
    this.GetGrievanceSolutionType();
  },
  beforeMount() {
    this.updateHeaderTitle();
    this.GetPermissions();
    this.GetGrievance();





  },
  mounted() {



    // this.$store
    //     .dispatch("getLookupByType", 1)
    //     .then((res) => (this.locationType = res));
    this.$store
      .dispatch("getGlobalLookupByType", 1)
      .then((res) => (this.locationType = res));
  },
};
</script>
<style >
.no-arrow-icon .v-input__icon--clear {
  display: none;

}

.v-input__icon--append .v-icon {
  color: purple;
  font-weight: bold;
}

.no-arrow-icon .v-input__icon--append {
  font-weight: bold;
}
</style>
