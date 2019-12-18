<template>
  <div class="">
    <y-card :title="title">
      <template>

        <el-form
          ref="yForm"
          :model="projectForm"
          :rules="rules"
          label-width="100px"
        >
          <el-form-item label="项目名称:" prop="name">
            <el-input v-model="projectForm.name" />
          </el-form-item>
          <el-form-item label="中文名称:" prop="cnname">
            <el-input v-model="projectForm.cnname" />
          </el-form-item>
          <el-form-item label="简介:" prop="description">
            <el-input v-model="projectForm.description" type="textarea" />
          </el-form-item>
          <el-form-item label="Rails根目录:" prop="rails_root_path">
            <el-input v-model="projectForm.rails_root_path" />
          </el-form-item>
          <el-form-item label="VUE根目录:" prop="vue_root_path">
            <el-input v-model="projectForm.vue_root_path" />
          </el-form-item>
          <el-form-item label="Rails服务重启命令行:" prop="rails_restart_cmd">
            <el-input v-model="projectForm.rails_restart_cmd" />
          </el-form-item>
          <el-form-item label="VUE服务重启命令行:" prop="vue_restart_cmd">
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

  </div>
</template>

<script>
import { getProject, putProject } from '@/api/project'
import yCard from '@/components/yCard'

export default {
  components: { yCard },
  data() {
    return {
      title: '修改',
      projectForm: {},
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
      const response = await getProject(this.$route.query.id);
      this.projectForm = response.data
    },
    async api() {
      this.$router.push({ path: '/projects' });
      const res = await putProject(this.projectForm.id, this.projectForm)
    },
    async submit(projectForm) {
      this.$refs.yForm.validate(valid => {
        if (valid) {
          this.api();
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
      this.$router.push({ path: '/projects' })
    }
  }
}
</script>
<style lang='scss' scope>

</style>
