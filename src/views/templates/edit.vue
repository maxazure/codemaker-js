<template>
  <div class="edit_tpl">
    <y-card :title="title">
      <template>

        <el-form
          ref="yForm"
          :model="templateForm"
          :rules="rules"
          label-width="100px"
          class="form_tpl"
        >
          <el-row>
            <el-col :span="8">
              <el-form-item label="文件名称:" prop="name">
                <el-input v-model="templateForm.filename" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="输出目录:" prop="outdir">
                <el-input v-model="templateForm.outdir" />
              </el-form-item>
            </el-col>
            <el-col :span="8">

              <el-form-item label="模板类型:" prop="tpltype">
                <el-select v-model="templateForm.tpltype">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>

              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="备注:" prop="remark">
            <el-input v-model="templateForm.remark" />
          </el-form-item>
          <el-form-item label="生成前执行命令行:" prop="cmd">
            <el-input v-model="templateForm.cmd" />
          </el-form-item>
          <el-form-item label="生成后执行命令行:" prop="cmd_after">
            <el-input v-model="templateForm.cmd_after" />
          </el-form-item>
          <el-form-item label="模板内容:" prop="body">
            <el-input v-model="templateForm.body" :autosize="true" type="textarea" />
          </el-form-item>
          <el-form-item>
            <el-button @click="submit('templateForm')">提交</el-button>
            <el-button @click="back">返回</el-button>
          </el-form-item>

        </el-form>
      </template>
    </y-card>

  </div>
</template>

<script>
import { getTemplate, putTemplate } from '@/api/template'
import yCard from '@/components/yCard'

export default {
  components: { yCard },
  data() {
    return {
      title: '修改模板',
      templateForm: {},
      rules: {},
      options: [{
        value: 'rails',
        label: 'rails'
      }, {
        value: 'vue',
        label: 'vue'
      }, {
        value: 'other',
        label: 'other'
      }]
    }
  },
  created() {
    this.get()
  },
  mounted() {
  },
  methods: {
    async get() {
      const response = await getTemplate(this.$route.query.id)
      this.templateForm = response.data
    },
    async api() {
      this.$router.push({ path: '/templates' })
      const res = await putTemplate(this.templateForm.id, this.templateForm)
    },
    async submit(templateForm) {
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
      this.$router.push({ path: '/templates' })
    }
  }
}
</script>
<style lang='scss' scope>
  .edit_tpl {
    .form_tpl {
      padding: 30px;
    }
  }
</style>
