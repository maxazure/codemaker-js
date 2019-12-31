<template>

  <y-card :title="title" class="add_brick ">
    <template>
      <el-form
        ref="yForm"
        :model="brickForm"
        :rules="rules"
        label-width="100px"
      >
        <el-form-item />
        <el-form-item label="模块名称:" prop="name">
          <el-input v-model="brickForm.name" />
        </el-form-item>
        <el-form-item label="复数:" prop="name">
          <el-input v-model="brickForm.name_plural" />
        </el-form-item>
        <el-form-item label="中文名:" prop="name">
          <el-input v-model="brickForm.cnname" />
        </el-form-item>
        <el-form-item label="简介:" prop="version">
          <el-input v-model="brickForm.description" />
        </el-form-item>

        <el-form-item label="父文件夹:" prop="version">
          <el-input v-model="brickForm.parent_dir" />
        </el-form-item>

        <el-form-item label="API路径:" prop="version">
          <el-input v-model="brickForm.api_path" />
        </el-form-item>

        <el-form-item label="类型:" prop="type">
          <el-input v-model="brickForm.type" />
        </el-form-item>

        <el-form-item>
          <el-button @click="submit('brickForm')">提交</el-button>
          <el-button @click="back">返回</el-button>
        </el-form-item>

      </el-form>
    </template>
  </y-card>

</template>

<script>
import { addBrick } from '@/api/brick'
import yCard from '@/components/yCard'

export default {
  components: { yCard },
  data() {
    return {
      title: '新模块',
      brickForm: {},
      rules: null
    }
  },
  computed: {},
  created() {
  },
  mounted() {
  },
  methods: {
    async api() {
      this.brickForm.project_id = this.$route.query.id
      const res = await addBrick(this.brickForm)
      this.back()
    },
    async submit(brickForm) {
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
    Pl(str) {
      switch (true) {
        case /[sxz]$/.test(str):
          return str + 'es'
        case /[^aeioudgkprt]h$/.test(str):
          return str + 'es'
        case /(qu|[^aeiou])y$/.test(str):
          return str.substr(0, str.length - 1) + 'ies'
        case /^undefined$/.test(str):
          return ''
        default:
          return str + 's'
      }
    },
    back() {
      history.go(-1)
    }
  }
}
</script>
<style lang='scss' scope>
  .add_brick {
    /*区分单卡片与多卡片*/
    /*min-height: 90vh;*/
  }

</style>
