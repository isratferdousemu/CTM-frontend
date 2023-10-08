<template lang="">
  <v-list-item-group v-model="model">
  <v-list-item
    v-for="(item, i) in items"
    :key="i"
  >
    <v-list-item-icon>
      <v-icon v-text="item.icon"></v-icon>
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title v-text="item.text"></v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</v-list-item-group>
</template>
<script>

export default {
  components: {
},
  props: {
      item: {
    type: Object,
    default: () => ({}),
  },
},
}
</script>
<style>
  .plf-0{
    padding-left: 0px !important;
  }
  .font-sm .v-list-item-title {
    font-size: 13px;
    font-weight: normal !important;
}
.menu-list i.mdi-minus.mdi.v-icon.notranslate.v-theme--light.v-icon--size-default {
  margin: 0 !important;
}
</style>