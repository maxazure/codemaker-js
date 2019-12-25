<template>
  <component is="el-switch"  v-model="value" placeholder="请选择123456">

  </component>
</template>
<script>
export default {
  data() {
    return {
      value:null,
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }], value: ''
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
  .index {
  }
</style>
