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
                  {{ $t('Activity Log View') }}
                </h4>
              </v-card-title>
              <v-simple-table dense>
                <template v-slot:default>
                  <tbody>
                  <tr>
                    <th class="text-left">
                      Causer Model
                    </th>
                    <td class="text-left">
                      App\User
                    </td>
                  </tr>
                  <tr>
                    <th class="text-left">
                      Causer
                    </th>
                    <td class="text-left">
                      Info
                    </td>
                  </tr>
                  <tr>
                    <th class="text-left">
                      Event
                    </th>
                    <td class="text-left">
                      create/edit/update/delete
                    </td>
                  </tr>

                  <tr>
                    <th class="text-left">
                      Subject Model
                    </th>
                    <td class="text-left">
                      App\Model\Article
                    </td>
                  </tr>
                  <tr>
                    <th class="text-left">
                      Subject
                    </th>
                    <td class="text-left">
                      Subject Details
                    </td>
                  </tr>

                  <tr>
                    <th class="text-left">
                      Date
                    </th>
                    <td class="text-left">
                      21 Mar 2024, 10:32
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
                            <th>Previous Value</th>
                            <th>New Value</th>
                          </thead>
                          <tbody>
                            <tr>
                              <td class="text-left">Date</td>
                              <td>2023-08-31</td>
                              <td>dssdfsdfsd</td>
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

    viewActivityLog: (id) => {
      return http().get(`/admin/activity-log/view/${id}`).then((result) => {
        console.log(result.data, 'program')
      }).catch((err) => {
        console.log(err);
      })
    },
  },
  created() {
    this.viewActivityLog(this.$route.params.id)
  },
  mounted(){
    alert(this.$route.params.id)
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