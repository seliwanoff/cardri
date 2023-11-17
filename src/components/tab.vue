<template>
  <div v-if="isselected">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'TabApp',
  props: {
    isselected: {
      type: Boolean,
    },
  },
}
</script>
