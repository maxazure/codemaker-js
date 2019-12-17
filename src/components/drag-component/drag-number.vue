<template>
  <el-input-number
    v-model="value"
    controls-position="right"
    :min="1"
    :max="100"
    @change="handleChange"
  />
</template>
<script>
export default {
  data() {
    return { value: '' }
  },
  methods: {
    handleChange() {
    }
  }
}
</script>

<style lang="scss" scoped>
  .drag-number {
  }
</style>
