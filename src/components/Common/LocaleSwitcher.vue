
<template>
  <div class="locale-switcher">
    <!-- <select v-model="$i18n.locale">
          <option value="en">English</option>
          <option value="bn">Bangla</option>
        </select> -->
    <v-switch v-model="$i18n.locale"   :label="getSwitchLabel"  value="bn" hide-details
      @change="handleSwitchChange"></v-switch>
           <!-- <v-row align="center">
          <v-col>
            <v-row align="center">
              <v-col>
                <div class="switch-label">OFF</div>
              </v-col>
              <v-col>
                <v-switch
                  v-model="switchState"
                  color="primary"
                  hide-details
                  @change="handleSwitchChange"
                ></v-switch>
              </v-col>
              <v-col>
                <div class="switch-label">ON</div>
              </v-col>
            </v-row>
          </v-col>
        </v-row> -->
  </div>

</template>

<script>
import {
  mapState,
  mapActions
} from "vuex";
export default {


  data() {
    return {




    };
  },
    computed: {
     getSwitchLabel() {
      return this.$i18n.locale === 'bn' ? 'BN' : 'EN';
    }
  },

  mounted() {

  },

  methods: {

    ...mapActions({


      updateLanguage: "updateLanguage",

    }),
    handleSwitchChange(newLocale) {

      if (!newLocale) {
        this.$i18n.locale = "en";
        newLocale = "en"

      }
      else {
        newLocale = "bn"
      }

      this.$store.commit("setAppLanguage", newLocale);



    },
  },
};
</script>

<style >
.switch-label {
  font-size: 12px;
  color: gray;
  margin-top: 5px;
  /* Adjust as needed */
}
</style>
