<template>
    <el-select v-model="result" placeholder="请选择" @input="change">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
</template>
<script>
export default {
  props: { options: Array, value: String },
  data() {
    return {
      result: this.value
    }
  },
  watch: {
    value(val) {
      this.result = val
    }
  },
  mounted() {
  },
  methods: {
    change() {
      this.$emit('input', this.result)
    }
  }
}
</script>

<style lang="scss" scoped>
  .index.vue {
  }
</style>
