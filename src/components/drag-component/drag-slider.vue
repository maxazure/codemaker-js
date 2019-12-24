<template>
  <el-slider v-model="result" @change="change" />
</template>
<script>
export default {
  props: { value: Number },
  data() {
    return {
      result: this.value
    }
  },
  methods: {
    change() {
      this.$emit('input', this.result)
    }
  }
}
</script>

<style lang="scss" scoped>
    .drag_slider {
    }
</style>
