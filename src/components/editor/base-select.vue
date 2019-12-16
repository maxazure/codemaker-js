<template>
  <el-select v-model="value" placeholder="请选择">
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </el-select>
</template>
<script>
export default {
  components: {},
  props: { config: Object },
  data() {
    return {
      value: '',
      options: []
    }
  },
  computed: {},
  watch: {},
  created() {
    // this.get()
  },
  mounted() {
  },
  methods: {
    async get() {
      const res = await request({ url: this.config.url, method: 'get' })
      res.data.forEach(item => {
        this.options.push({ value: item.id, label: item.name })
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .base-select {
  }
</style>
