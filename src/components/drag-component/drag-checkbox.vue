<template>
  <el-checkbox-group v-model="checkList">
    <el-checkbox label="复选框 A" />
    <el-checkbox label="复选框 B" />
    <el-checkbox label="复选框 C" />
    <el-checkbox label="禁用" disabled />
  </el-checkbox-group>
</template>
<script>
export default {
  data() {
    return { checkList: [] }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
  .drag-checkbox {
  }
</style>
