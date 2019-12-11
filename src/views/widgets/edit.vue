<template>
  <div class="">
    <y-card :title="title">
      <template>

        <el-form
          ref="yForm"
          :model="widgetForm"
          :rules="rules"
          label-width="100px"
        >
          <el-form-item label="控件名称:" prop="name">
            <el-input v-model="widgetForm.name" />
          </el-form-item>
          <el-form-item label="控件类型:" prop="cnname">
            <el-input v-model="widgetForm.widget_type" />
          </el-form-item>
          <el-form-item label="配置内容:" prop="description">
            <el-input v-model="widgetForm.config" type="textarea" :rows="3" />
          </el-form-item>
          <el-form-item label="代码:" prop="Rails根目录">
            <el-input v-model="widgetForm.code" type="textarea" :rows="3" />
          </el-form-item>
          <el-form-item label="备注:" prop="VUE根目录">
            <el-input v-model="widgetForm.remark" />
          </el-form-item>

          <el-form-item>
            <el-button @click="submit('widgetForm')">提交</el-button>
            <el-button @click="back">返回</el-button>
          </el-form-item>

        </el-form>
      </template>
    </y-card>

  </div>
</template>

<script>
import { getWidget, putWidget } from '@/api/widget'
import yCard from '@/components/yCard'

export default {
  components: { yCard },
  data() {
    return {
      title: '修改会员',
      widgetForm: {},
      rules: {}
    }
  },
  created() {
    this.get()
  },
  mounted() {
  },
  methods: {
    async get() {
      const response = await getWidget(this.$route.query.id)
      this.widgetForm = response.data
    },
    async api() {
      this.$router.push({ path: '/widgets' })
      const res = await putWidget(this.widgetForm.id, this.widgetForm)
    },
    async submit(widgetForm) {
      this.$refs.yForm.validate(valid => {
        if (valid) {
          this.api()
          this.$message({
            message: '修改成功',
            type: 'success'
          })
        } else {
          return false
        }
      })
    },
    back() {
      this.$router.push({ path: '/widgets' })
    }
  }
}
</script>
<style lang='scss' scope>

</style>
