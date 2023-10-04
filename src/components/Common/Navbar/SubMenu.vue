<template lang="">
  <v-list-item-group>
    <v-list-item v-for="(sub, i) in item" :key="i">
      <template v-if="!sub.subSubMenu">
        <v-list-item-icon>
          <v-icon> {{ sub.icon }} </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title v-text="sub.title"></v-list-item-title>
        </v-list-item-content>
      </template>
    </v-list-item>
  </v-list-item-group>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>
<style lang=""></style>
