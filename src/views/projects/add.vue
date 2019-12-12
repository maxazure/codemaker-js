<template>

  <y-card :title="title" class="add">
    <template>
      <el-form
        ref="yForm"
        :model="projectForm"
        :rules="rules"
        label-width="150px"
      >
        <el-form-item label="项目名称:" prop="name">
          <el-input v-model="projectForm.name" />
        </el-form-item>
        <el-form-item label="cnname:" prop="cnname">
          <el-input v-model="projectForm.cnname" />
        </el-form-item>
        <el-form-item label="description:" prop="description">
          <el-input v-model="projectForm.description" />
        </el-form-item>
        <el-form-item label="rails_root_path:" prop="Rails根目录">
          <el-input v-model="projectForm.rails_root_path" />
        </el-form-item>
        <el-form-item label="vue_root_path:" prop="VUE根目录">
          <el-input v-model="projectForm.vue_root_path" />
        </el-form-item>
        <el-form-item label="rails_restart_cmd:" prop="Rails服务重启命令行">
          <el-input v-model="projectForm.rails_restart_cmd" />
        </el-form-item>
        <el-form-item label="vue_restart_cmd:" prop="VUE服务重启命令行">
          <el-input v-model="projectForm.vue_restart_cmd" />
        </el-form-item>
        <el-form-item label="版本:" prop="version">
          <el-input v-model="projectForm.version" />
        </el-form-item>

        <el-form-item>
          <el-button @click="submit('projectForm')">提交</el-button>
          <el-button @click="back">返回</el-button>
        </el-form-item>

      </el-form>
    </template>
  </y-card>

</template>

<script>
import { addProject } from '@/api/project'
import yCard from '@/components/yCard'

export default {
  components: { yCard },
  data() {
    return {
      title: '新项目',
      projectForm: {},
      rules: {}
    }
  },
  computed:{
  },
  created() {
  },
  mounted() {
  },
  methods: {
    async api() {
      this.$router.push({ path: '/projects' })
      const res = await addProject(this.projectForm)
    },
    async submit(projectForm) {
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
      this.$router.push({ path: '/projects' })
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
