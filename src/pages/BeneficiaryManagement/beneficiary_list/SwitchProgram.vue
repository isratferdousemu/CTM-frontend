<template>
  <div id="switch_program">
    <v-row class="mx-5 mt-4">
      <v-col cols="12">
        <v-card>
          <v-card-text class="mt-5">
            <v-row>
              <v-col cols="12">
                <v-textarea
                  :label="
                    $t(
                      'container.beneficiary_management.beneficiary_list.beneficiary_summary'
                    )
                  "
                  outlined
                  clearable
                >
                </v-textarea>
              </v-col>

              <v-col lg="6" md="6" cols="12">
                <v-select
                  outlined
                  menu-props="top"
                  clearable
                  :label="
                    $t('container.application_selection.application.program')
                  "
                >
                </v-select>
              </v-col>

              <v-col lg="6" md="6" cols="12">
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="date"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="date"
                      label="Activation Date"
                      prepend-inner-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      outlined
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false">
                      Cancel
                    </v-btn>
                    <v-btn text color="primary" @click="$refs.menu.save(date)">
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  :label="$t('container.list.reason')"
                  outlined
                  clearable
                >
                </v-textarea>
              </v-col>
            </v-row>

            <v-row class="mx-0 my-0 py-2" justify="end">
              <v-btn
                type="submit"
                flat
                router
                to="/beneficiary-management/beneficiary-info"
                :disabled="invalid"
                :loading="loading"
                class="custom-btn-width py-2 mr-2"
              >
                {{ $t("container.list.back") }}
              </v-btn>
              <v-btn
                type="submit"
                flat
                :disabled="invalid"
                :loading="loading"
                class="custom-btn-width success white--text py-2"
              >
                {{ $t("container.list.save") }}
              </v-btn>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { extend, ValidationProvider, ValidationObserver } from "vee-validate";
import { required } from "vee-validate/dist/rules";

extend("required", required);
export default {
  name: "Index",
  title: "CTM - Switch program",
  data() {
    return {
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
    };
  },
  methods: {
    updateHeaderTitle() {
      const title = this.$t("container.list.switch_program");
      this.$store.commit("setHeaderTitle", title);
    },
  },

  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
  },

  watch: {
    "$i18n.locale": "updateHeaderTitle",
    date(val) {
      this.dateFormatted = this.formatDate(this.date);
    },
  },
  created() {
    this.GetApplication();
  },
  beforeMount() {
    this.updateHeaderTitle();
  },
  mounted() {},
};
</script>