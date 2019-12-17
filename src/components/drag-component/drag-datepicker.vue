<template>
  <el-date-picker
    v-model="value"
    type="daterange"
    range-separator="至"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
  />
</template>
<script>
export default {
  data() {
    return { value: '' }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
  .drag-datepicker {
  }
</style>
