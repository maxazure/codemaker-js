<template>
  <el-select v-model="result" placeholder="请选择" @change="handleChange">
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </el-select>
</template>

<script>
import request from '@/utils/request'

export default {
  props: { url: { type: String }, value: String },
  data() {
    return {
      options: [],
      result: this.value
    }
  },
  created() {
    this.get()
  },
  mounted() {
  },
  methods: {
    async get() {
      const res = await request({ url: this.url, method: 'get' });
      res.data.forEach(item => {
        this.options.push({ value: item.id, label: item.name })
      })
    },
    handleChange() {
      this.$emit('input', this.result)
    }
  }
}
</script>
