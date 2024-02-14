<template lang="">
  <v-app-bar
    elevation="0"
    height="70"
    :clipped-left="clipped"
    fixed
    flat
    bottom
    app
    class="mx-4 my-3 header-left menu-top"
  >
    <p class="mb-0">{{ this.$t('footer.copyright')}} © {{ this.$i18n.locale == 'en'? new Date().getFullYear() : this.$helpers.englishToBangla(new Date().getFullYear()) }}, {{ this.$t('footer.dss')}}</p>

    <v-spacer />
    <span class="mb-0">
      <a class="black--text" target="_blank" href="https://www.ibcs-primax.com/">{{ this.$t('footer.designDevelopedBy')}}</a>
    </span>
  </v-app-bar>
</template>
<script>
export default {};
</script>
<style lang=""></style>
