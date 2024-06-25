<template>
  <div id="district">
    <v-row class="mx-5 mt-4">
      <v-col cols="12">
        <v-row>
          <Spinner :loading="isLoading"/>
          <v-col cols="12" id="print-section">
            <v-card
                elevation="10"
                color="white"
                rounded="md"
                theme="light"
                class="mb-8"
            >

              <div id="printHeadingAddress">
                <div class="text-center" style="font-weight: bold" v-if="$i18n.locale == 'en'">
                  <h3 class="title" style="font-weight: bold">
                    Government of the People's Republic of Bangladesh <br>
                    Department of Social Services
                  </h3>
                  <p style="font-size:15px" class="center">Cash Transfer Modernization(CTM)Project</p>
                  <p style="font-size:12px">Social Service Building, E-8/B-1, Agargaon, Sherbangla Nagar, Dhaka-1207,
                    Bangladesh.</p>
                  <a target="_blank" href="https://dss.gov.bd/">www.dss.gov.bd</a>
                </div>
                <div class="text-center" style="font-weight: bold" v-if="$i18n.locale == 'bn'">
                  <h3 class="title" style="font-weight: bold">
                    গণপ্রজাতন্ত্রী বাংলাদেশ সরকার <br>
                    সমাজসেবা অধিদফতর
                  </h3>
                  <p style="font-size:15px; " class="center">ক্যাশ ট্রান্সফার মডার্নাইজেশন (সিটিএম) প্রকল্প</p>
                  <p style="font-size:12px">সমাজসেবা ভবন, ই-৮/বি-১, আগারগাঁও, শেরেবাংলা নগর, ঢাকা-১২০৭, বাংলাদেশ।</p>
                  <a target="_blank" href="https://dss.gov.bd/">www.dss.gov.bd</a>
                </div>
              </div>


              <v-card-title class="justify-center" tag="div" style="text-align:center; background-color: #1C3B68; color: white;font-size: 17px;">
                <h4 class="text-uppercase pt-3">
                  {{ $t('container.activity_log.table.log_view') }}
                </h4>
              </v-card-title>

              <div class="d-inline d-flex justify-end ma-1 mr-5">
                <v-icon color="black" @click="printTable">mdi-printer</v-icon>
              </div>
              <v-simple-table dense>

                <template v-slot:default>
                  <tbody>
                  <tr v-if=" activity_log_details.log_name">
                    <th style="width:20%" class="text-left first-table-td">
                      Subject
                    </th>
                    <td class="text-left">
                      {{ activity_log_details.log_name }}
                    </td>
                  </tr>

                  <tr v-if=" activity_log_details.subject_id">
                    <th class="text-left">
                      Subject Id
                    </th>
                    <td class="text-left">
                      {{ activity_log_details.subject_id }}
                    </td>
                  </tr>

                  <tr v-if="activity_log_details.description">
                    <th class="text-left">
                      Description
                    </th>
                    <td class="text-left">
                      {{ activity_log_details.description }}
                    </td>
                  </tr>

                  <tr v-if="activity_log_details.causer_type">
                    <th class="text-left">
                      Causer Model
                    </th>
                    <td class="text-left">
                      {{ activity_log_details.causer_type }}
                    </td>
                  </tr>

                  <tr v-if="activity_log_details.subject_type">
                    <th class="text-left">
                      Subject Model
                    </th>
                    <td class="text-left">
                      {{ activity_log_details.subject_type }}
                    </td>
                  </tr>

                  <tr v-if="activity_log_details.event">
                    <th class="text-left">
                      Event
                    </th>
                    <td class="text-left">
                      {{ activity_log_details.event }}
                    </td>
                  </tr>


                  <tr>
                    <th class="text-left">
                      Date
                    </th>
                    <td class="text-left">
                      {{ activity_log_details.database_created_at }} ({{ activity_log_details.created_at }})
                    </td>
                  </tr>

                  </tbody>
                </template>
              </v-simple-table>
            </v-card>

            <v-card
                elevation="10"
                color="white"
                rounded="md"
                theme="light"
                class="mb-8"
            >
              <template
                  v-if="activity_log_details?.properties?.changes?.previous || activity_log_details?.properties?.changes?.new">

                <v-simple-table dense>
                  <template v-slot:default>
                    <thead>
                    <tr class="text-center">
                      <th style="text-align:center; background-color: #1C3B68; color: white;font-size: 15px;"
                          colspan="3">
                        Change Information
                      </th>
                    </tr>
                    <tr style="color: black !important; font-weight: bold">
                      <td>Key</td>
                      <td v-if="activity_log_details.properties.changes.previous">Previous Value</td>
                      <td>New Value</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(value, key) in activity_log_details.properties.changes.new" :key="key">
                      <th>{{ key }}</th>
                      <td v-if="activity_log_details.properties.changes.previous">
                        {{ activity_log_details.properties.changes.previous[key] }}
                      </td>
                      <td>{{ activity_log_details.properties.changes.new[key] }}</td>
                    </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </template>

            </v-card>

            <v-card
                elevation="10"
                color="white"
                rounded="md"
                theme="light"
                class="mb-8"
            >

              <template v-if="activity_log_details.causer">
                <v-simple-table dense v-if="activity_log_details.properties.userInfo">
                  <template v-slot:default>
                    <thead>
                    <tr class="text-center">
                      <th style="text-align:center; background-color: #1C3B68; color: white;font-size: 15px;"
                          colspan="2">
                        User Information
                      </th>
                    </tr>
                    <tr style="color: black !important; font-weight: bold !important;">
                      <td>Key</td>
                      <td>Value</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(value, key) in activity_log_details.causer" :key="key">
                      <template v-if="value != null">
                        <th style="width:20%;">{{ key }}</th>
                        <td >{{ value }}</td>
                      </template>
                    </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </template>

            </v-card>

            <v-card
                elevation="10"
                color="white"
                rounded="md"
                theme="light"
                class="mb-8"
            >

              <template v-if="activity_log_details.properties.userInfo">

                <v-simple-table dense v-if="activity_log_details.properties.userInfo">
                  <template v-slot:default>
                    <thead>
                    <tr>
                      <th style="text-align:center; background-color: #1C3B68; color: white;font-size: 15px;"
                          colspan="2">
                        Device & Location Information
                      </th>
                    </tr>
                    <tr style="color: black !important; font-weight: bold">
                      <td>Key</td>
                      <td>Value</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(value, key) in activity_log_details.properties.userInfo" :key="key">
                      <template v-if="value != null">
                        <th style="width:20%;">{{ key }}</th>
                        <td>{{ value }}</td>
                      </template>
                    </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </template>
            </v-card>
            <router-link to="/system-audit/activity-logs">
              <v-btn color="primary lighten-2 text-right">
                Back
              </v-btn>
            </router-link>


          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {mapState} from "vuex";
import {extend, ValidationProvider, ValidationObserver} from "vee-validate";
import {required} from "vee-validate/dist/rules";
import Spinner from "@/components/Common/Spinner.vue";
import {http} from "@/hooks/httpService";

extend("required", required);
export default {
  name: "Index",
  title: "CTM - Activity Logs",
  data() {
    return {
      data: {
        id: null,
      },
      isLoading: false,
      activity_log_details: [],
    };
  },
  components: {
    Spinner,
    ValidationProvider,
    ValidationObserver,
  },
  computed: {
    drawer: {
      get() {
        return this.$store.state.Drawer;
      },
      set(v) {
        return this.$store.commit("setDrawer", v);
      },
    },
  },
  methods: {
    async printTable() {
      this.drawer = false;
      setTimeout(() => {
        if (this.drawer === false) {
          window.print();
          this.drawer = true;
        }
      }, 100);
    },


    viewActivityLog(id) {
      this.$axios.get(`/admin/activity-log/view/${id}`, {
        headers: {
          Authorization: "Bearer " + this.$store.state.token,
          "Content-Type": "multipart/form-data",
        },
      })
          .then((response) => {
            this.activity_log_details = response.data.data;
            console.log(response.data, 'program');

          })
          .catch((err) => {
            console.log(err)
          })

    },
  },
  created() {

  },
  mounted() {
    this.viewActivityLog(this.$route.params.id)
  },
  beforeMount() {

  },
};
</script>
<style>
.highlight-column {
  background-color: #e0eaf1;
}

#printHeadingAddress {
  display: none;
}

@media print {
  body * {
    visibility: hidden;
  }

  #print-section, #print-section * {
    visibility: visible;
  }

  #print-section {
    position: absolute;
    left: 0;
    top: 0;
  }

  #printHeadingAddress {
    display: block;
  }
  .first-table-td {
    width: 20% !important;
  }
}
</style>