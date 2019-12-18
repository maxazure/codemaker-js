<template>
  <div class="">
    <y-card :title="title">
      <template>

        <el-form
          ref="yForm"
          :model="dfieldForm"
          :rules="rules"
          label-width="100px"
        >
          <el-form-item label="项目名称:" prop="name">
            <el-input v-model="dfieldForm.name" />
          </el-form-item>
          <el-form-item label="cnname:" prop="cnname">
            <el-input v-model="dfieldForm.cnname" />
          </el-form-item>
          <el-form-item label="description:" prop="description">
            <el-input v-model="dfieldForm.description" />
          </el-form-item>
          <el-form-item label="rails_root_path:" prop="Rails根目录">
            <el-input v-model="dfieldForm.rails_root_path" />
          </el-form-item>
          <el-form-item label="vue_root_path:" prop="VUE根目录">
            <el-input v-model="dfieldForm.vue_root_path" />
          </el-form-item>
          <el-form-item label="rails_restart_cmd:" prop="Rails服务重启命令行">
            <el-input v-model="dfieldForm.rails_restart_cmd" />
          </el-form-item>
          <el-form-item label="vue_restart_cmd:" prop="VUE服务重启命令行">
            <el-input v-model="dfieldForm.vue_restart_cmd" />
          </el-form-item>
          <el-form-item label="version:" prop="version">
            <el-input v-model="dfieldForm.version" />
          </el-form-item>

          <el-form-item>
            <el-button @click="submit('dfieldForm')">提交</el-button>
            <el-button @click="back">返回</el-button>
          </el-form-item>

        </el-form>
      </template>
    </y-card>

  </div>
</template>

<script>
import { getDfield, putDfield } from '@/api/dfield'
import yCard from '@/components/yCard'

export default {
  components: { yCard },
  data() {
    return {
      title: '修改会员',
      dfieldForm: {},
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
      const response = await getDfield(this.$route.query.id);
      this.dfieldForm = response.data
    },
    async api() {
      this.$router.push({ path: '/dfields' });
      const res = await putDfield(this.dfieldForm.id, this.dfieldForm)
    },
    async submit(dfieldForm) {
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
      this.$router.push({ path: '/dfields' })
    }
  }
}
</script>
<style lang='scss' scope>

</style>
