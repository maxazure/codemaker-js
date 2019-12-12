<template>

  <y-card :title="title" class="add">
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

</template>

<script>
import { addWidget } from '@/api/widget'
import yCard from '@/components/yCard'

export default {
  components: { yCard },
  data() {
    return {
      title: '新项目',
      widgetForm: {},
      rules: {}
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    async api() {
      this.$router.push({ path: '/widgets' })
      const res = await addWidget(this.widgetForm)
    },
    async submit(widgetForm) {
      this.$refs.yForm.validate(valid => {
        if (valid) {
          this.api()
          this.$message({
            message: '添加成功',
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
  .add {
    /*区分单卡片与多卡片*/
    /*min-height: 90vh;*/
  }

</style>
