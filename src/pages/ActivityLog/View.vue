<template>
  <div id="district">
    <v-row class="mx-5 mt-4">
      <v-col cols="12">
        <v-row>
          <Spinner :loading="isLoading" />
          <v-col cols="12">
            <v-card
                elevation="10"
                color="white"
                rounded="md"
                theme="light"
                class="mb-8"
            >
              <v-card-title class="justify-center" tag="div">
                <h4 class="text-uppercase pt-3">
                  {{ $t('container.activity_log.log_view') }}
                </h4>
              </v-card-title>
              <v-simple-table dense>
                <template v-slot:default>
                  <tbody>

                  <tr v-if=" activity_log_details.log_name">
                    <th class="text-left">
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
                      {{ activity_log_details.causer_type}}
                    </td>
                  </tr>
                  <!--                  <tr>-->
                  <!--                    <th class="text-left">-->
                  <!--                      Causer-->
                  <!--                    </th>-->
                  <!--                    <td class="text-left">-->
                  <!--                      Info-->
                  <!--                    </td>-->
                  <!--                  </tr>-->

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
                      {{ activity_log_details.database_created_at }}  ({{ activity_log_details.created_at }})
                    </td>
                  </tr>

                                    <tr>
                                      <th class="text-left">
                                        Changes:
                                      </th>
                                      <td class="text-left">
                                        <v-simple-table dense>
                                          <template v-slot:default>
                                            <thead>
                                              <th>Key</th>
                                              <th v-if="activity_log_details.properties.changes.previous">Previous Value</th>
                                              <th>New Value</th>
                                            </thead>
                                            <tbody>
                                            <tr v-for="(value, key) in activity_log_details.properties.changes.new" :key="key">
                                              <td>{{ key }}</td>
                                              <td v-if="activity_log_details.properties.changes.previous">{{ activity_log_details.properties.changes.previous[key] }}</td>
                                              <td>{{ activity_log_details.properties.changes.new[key] }}</td>
                                            </tr>
                                            </tbody>
                                          </template>
                                        </v-simple-table>
                                      </td>
                                    </tr>

<!--                  <tr>-->
<!--                    <th class="text-left">-->
<!--                      Change Info:-->
<!--                    </th>-->
<!--                    <td class="text-left">-->
<!--                      <v-simple-table dense>-->
<!--                        <template v-slot:default>-->
<!--                          <thead>-->
<!--                          <th>Key</th>-->
<!--                          <th>Value</th>-->
<!--                          </thead>-->
<!--                          <tbody>-->

<!--                          <tr v-for="(value, key) in activity_log_details.subject" :key="key">-->
<!--                            <template v-if="value != null">-->
<!--                              <td>{{ key }}</td>-->
<!--                              <td>{{ value }}</td>-->
<!--                            </template>-->
<!--                          </tr>-->

<!--                          </tbody>-->
<!--                        </template>-->
<!--                      </v-simple-table>-->
<!--                    </td>-->
<!--                  </tr>-->

                  <tr v-if="activity_log_details.causer">
                    <th class="text-left">
                      User Information:
                    </th>
                    <td class="text-left">
                      <v-simple-table dense>
                        <template v-slot:default>
                          <thead>
                          <th>Key</th>
                          <th>Value</th>
                          </thead>
                          <tbody>
                          <tr v-for="(value, key) in activity_log_details.causer" :key="key">
                            <template v-if="value != null">
                              <td>{{ key }}</td>
                              <td>{{ value }}</td>
                            </template>
                          </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </td>
                  </tr>

                  <tr v-if="activity_log_details.properties.userInfo">
                    <th class="text-left">
                       Device & Location Info:
                    </th>
                    <td class="text-left">
                      <v-simple-table dense>
                        <template v-slot:default>
                          <thead>
                          <th>Key</th>
                          <th>Value</th>
                          </thead>
                          <tbody>
                          <tr v-for="(value, key) in activity_log_details.properties.userInfo" :key="key">
                            <template v-if="value != null">
                              <td>{{ key }}</td>
                              <td>{{ value }}</td>
                            </template>
                          </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </td>
                  </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { extend, ValidationProvider, ValidationObserver } from "vee-validate";
import { required } from "vee-validate/dist/rules";
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
      isLoading:false,

      activity_log_details: [],


      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
        },
        {
          name: 'Eclair',
          calories: 262,
        },
        {
          name: 'Cupcake',
          calories: 305,
        },
        {
          name: 'Gingerbread',
          calories: 356,
        },
        {
          name: 'Jelly bean',
          calories: 375,
        },
        {
          name: 'Lollipop',
          calories: 392,
        },
        {
          name: 'Honeycomb',
          calories: 408,
        },
        {
          name: 'Donut',
          calories: 452,
        },
        {
          name: 'KitKat',
          calories: 518,
        },
      ],

    };
  },
  components: {
    Spinner,
    ValidationProvider,
    ValidationObserver,
  },
  computed: {
  },
  methods: {

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
  mounted(){
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
</style>