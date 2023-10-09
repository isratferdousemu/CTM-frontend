<template lang="">
    <template v-if="level > 0">
        <component
          :is="item"
          size="5"
          fill="currentColor"
          stroke-width="1.5"
          class="iconClass"
        ></component>
      </template>
      <template v-else>
        <component
          :is="item"
          size="20"
          stroke-width="1.5"
          class="iconClass"
        ></component>
      </template>
</template>
<script>
export default {
    props: {
        item: {
      type: Object,
      default: () => ({}),
    },
    level: {
      type: Number,
    },
  },
}
</script>
<style lang="">
    
</style>