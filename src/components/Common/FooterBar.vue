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
    <p class="mb-0">Copyright © {{ new Date().getFullYear() }}, DSS</p>

    <v-spacer />
    <span class="mb-0">
      Design & Developed By,
      <br />
      IBCS-PRIMAX Software (Bangladesh) Ltd.
    </span>
  </v-app-bar>
</template>
<script>
export default {};
</script>
<style lang=""></style>
