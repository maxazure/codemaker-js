<template>
  <el-input-number
    v-model="result"
    controls-position="right"
    :min="min"
    :max="max"
    @change="handleChange"
  />
</template>
<script>
export default {
  props: {
    value: Number,
    min: { type: Number, default: () => 1 },
    max: { type: Number, default: () => 100 }
  },
  data() {
    return { result: this.value }
  },
  methods: {
    handleChange() {
      this.$emit('input', this.result)
    }
  }
}
</script>

<style lang="scss" scoped>
  .drag-number {
  }
</style>
