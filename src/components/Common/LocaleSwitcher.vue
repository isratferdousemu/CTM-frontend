
<template>
  <div class="locale-switcher">
    <v-btn-toggle @change="handleSwitchChange" v-model="getSwitchLabel">
      <v-btn small  :color="getSwitchLabel === 0 ? '#388E3C' : undefined" :class="{ 'white--text': getSwitchLabel === 0 }">
        BN
      </v-btn>
      <v-btn small :color="getSwitchLabel === 1 ? '#283593' : undefined" :class="{ 'white--text': getSwitchLabel === 1 }">
      EN
      </v-btn>
    </v-btn-toggle>
 
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
      toggle_none: 0,
    };
  },
    computed: {
     getSwitchLabel() {
      return this.$i18n.locale === 'bn' ? 0 : 1;
    }
  },

  mounted() {

  },

  methods: {

    ...mapActions({


      updateLanguage: "updateLanguage",

    }),
    handleSwitchChange(newLocale) {
      console.log(newLocale,'button switch')
      this.$i18n.locale = newLocale==1?'en':'bn';
      this.$store.commit("setAppLanguage", newLocale==1?'en':'bn');



    },
  },
};
</script>

<style >
.switch-label {
  font-size: 12px;
  color: blue;
  margin-top: 5px;
  /* Adjust as needed */
}
</style>
