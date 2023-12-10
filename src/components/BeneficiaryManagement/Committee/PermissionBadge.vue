<template>
  <v-row justify="space-around">
    <v-btn elevation="2" outlined  x-small
           disabled v-if="!permission">N/A</v-btn>

    <v-icon large color="green darken-2"
            v-else-if="status">mdi-check</v-icon>

    <v-icon large color="red darken-2" v-else>mdi-cancel</v-icon>

  </v-row>
</template>


<script>
export default {
  name: "PermissionBadge",

  props: ['permission', 'status'],
}
</script>

<style scoped>

</style>