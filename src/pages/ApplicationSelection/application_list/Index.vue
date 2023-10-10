<template>
  <div id="aplication_list">
    <v-row class="mx-5 mt-4">
      <v-col cols="12">
        <v-row>
          <v-col cols="12">
            <!-- Expantion panels start -->
            <v-expansion-panels>
              <v-expansion-panel class="ma-2">
                <v-expansion-panel-header>
                  <h3 class="text-uppercase pt-3">
                    {{ $t("container.application_selection.application.search") }}
                  </h3>
                </v-expansion-panel-header>
                <v-expansion-panel-content class="elevation-0 transparent ">
                  <v-row>
                    <v-col>
                      <v-select outlined clearable label="Program">
                      </v-select>
                      <v-select outlined clearable label="District">
                      </v-select>
                      <v-select outlined clearable label="Upazila/City Corporation/
District Pourashava">
                      </v-select>
                      <v-select outlined clearable label="List type">
                      </v-select>
                    </v-col>
                    <v-col>
                      <v-select outlined clearable label="Division">
                      </v-select>
                      <v-select outlined clearable label="location Type">
                      </v-select>
                      <v-select outlined clearable label="Union/Pourashava/
Ward">
                      </v-select>
                    </v-col>
                  </v-row>
                  <div class="d-inline d-flex justify-end ">
                    <v-btn elevation="2" class="btn mr-2" color="green">{{ $t("container.list.search") }}</v-btn>
                    <v-btn elevation="2" class="btn" color="primary">{{ $t("container.list.reset") }}</v-btn>
                  </div>

                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel class="ma-2">
                <v-expansion-panel-header>
                  <h3 class="text-uppercase pt-3">
                    {{ $t("container.application_selection.application.update_status") }}
                  </h3>
                </v-expansion-panel-header>
                <v-expansion-panel-content class="elevation-0 transparent ">
                  <v-row>
                    <v-col>
                      <v-text-field outlined label="Reamrk">

                      </v-text-field>
                    </v-col>
                    <v-col>
                      <v-select outlined clearable >
  <template v-slot:label>
          <label>Forward to Commitee</label>
           <span style="margin-left: 4px; color: red">*</span>
        </template>

                      </v-select>
                    </v-col>
                  </v-row>
                  <div class="d-inline d-flex justify-end ">
                    <v-btn elevation="2" class="btn mr-2" color="green">{{ $t("container.list.forward") }}</v-btn>
                    <v-btn elevation="2" class="btn mr-2" color="yellow">{{ $t("container.list.waiting") }}</v-btn>
                     <v-btn elevation="2" class="btn mr-2" color="red">{{ $t("container.list.reject") }}</v-btn>
                  </div>

                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
               <!-- Expantion panels end -->
               <!-- Application list -->
            <v-card elevation="10" color="white" rounded="md" theme="light" class="mb-8 mt-5">
                  
                 
 
              <v-card-title class="justify-center" tag="div">
                <h3 class="text-uppercase pt-3">
                  {{ $t("container.application_selection.application.list") }}
                </h3>
              </v-card-title>
              <v-card-text>
                 <v-row>
                      <v-col>
       
                      </v-col>
                       <v-col>
                      
                        </v-col>
                           <v-col>
                                           <!-- selected columns -->
                             <v-select
                v-model="value"
                :items="headers"
                label="Select Item"
                multiple
                return-object
                outlined
                class="ma-5"
              >
                <template v-slot:selection="{ item, index }">
                  <v-chip v-if="index === 0">
                    <span>{{ item.text }}</span>
                  </v-chip>
                  <span
                    v-if="index === 1"
                    class="grey--text caption"
                  >(+{{ value.length - 1 }} others)</span>
                </template>
              </v-select>
              <!-- Select column End -->
                      
                          </v-col>
                    </v-row>
                <v-row class="ma-0 pa-3 white round-border d-flex justify-space-between align-center" justify="center"
                  justify-lg="space-between">
                  <!-- <div class="d-flex justify-sm-end flex-wrap">

                  </div> -->
                  <v-col cols="12">
    
                    <v-data-table    :headers="selectedHeaders" :items="divisions"
                    
                      class="elevation-1">
                      <!-- <template v-slot:item.id="{ item, index }">
                        {{
                          (pagination.current - 1) * pagination.perPage +
                          index +
                          1
                        }}
                      </template>
                      <template v-slot:item.name_en="{ item }">
                        {{ item.name_en }}
                      </template>
                      <template v-slot:item.name_bn="{ item }">
                        {{ item.name_bn }}
                      </template> -->
                         <template v-slot:item.id="{ item }">
          <v-chip dark>
            {{ divisions.map(function (x) { return x.id; }).indexOf(item.id) }}
          </v-chip>
        </template>

                      <!-- Action Button -->
                      <template v-slot:item.actions="{ item }">
                        <v-tooltip top>
                          <template v-slot:activator="{ on }">
                            <v-btn v-can="'update-post'" fab x-small v-on="on" color="success" elevation="0"
                              @click="editDialog(item)">
                              <v-icon> mdi-eye </v-icon>
                            </v-btn>
                          </template>
                          <span>
                            {{ $t("container.list.view") }}
                          </span>
                        </v-tooltip>

                        <v-tooltip top>
                          <template v-slot:activator="{ on }">
                            <v-btn v-can="'delete-division'" fab x-small v-on="on" color="grey" class="ml-3 white--text"
                              elevation="0" @click="deleteAlert(item.id)">
                              <v-icon> mdi-print </v-icon>
                            </v-btn>
                          </template>
                          <span> {{ $t("container.list.print") }}</span>
                        </v-tooltip>
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
  title: "CTM - Application List",
  data() {
    return {

      value: [],
      selectedHeaders: [],
      loading: false,
      search: "",
      delete_id: "",
      divisions: [],

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
      
        { text: this.$t("container.list.code"), value: "code" },
        {
          text: this.$t(
            "container.system_config.demo_graphic.division.name_en"
          ),
          value: "name_en",
        },
        {
          text: this.$t(
            "container.system_config.demo_graphic.division.name_bn"
          ),
          value: "name_bn",
        },
        {
          text: this.$t("container.list.action"),
          value: "actions",
          align: "center",
          sortable: false,
        },
      ];
    },


  },

  methods: {







    onPageChange($event) {
      // this.pagination.current = $event;
      this.GetApplication();
    },

    async GetApplication() {
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
          this.pagination.current = result.data.meta.current_page;
          this.pagination.total = result.data.meta.last_page;
          this.pagination.grand_total = result.data.meta.total;
        });
    },

    updateHeaderTitle() {
      const title = this.$t(
        "container.application_selection.application.list"
      );
      this.$store.commit("setHeaderTitle", title);
    },
  },
  watch: {
    "$i18n.locale": "updateHeaderTitle",
    value(val) {
      this.selectedHeaders = val;
    }
  },
  created() {
    this.GetApplication();
    this.selectedHeaders = this.headers;
  },
  beforeMount() {
    this.updateHeaderTitle();
  },
};
</script>