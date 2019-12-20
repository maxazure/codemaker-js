<template>

  <y-card :title="title" class="add">
    <template>
      <el-form
        ref="yForm"
        :model="templateForm"
        :rules="rules"
        label-width="100px"
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
        <el-form-item label="命令行:" prop="cmd">
          <el-input v-model="templateForm.cmd" />
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

</template>

<script>
import { addTemplate } from '@/api/template'
import yCard from '@/components/yCard'

export default {
  components: { yCard },
  data() {
    return { rules: {},
      title: '新模板',
      templateForm: {},
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
  },
  mounted() {
  },
  methods: {
    async api() {
      this.$router.push({ path: '/templates' });
      const res = await addTemplate(this.templateForm)
    },
    async submit(templateForm) {
      this.$refs.yForm.validate(valid => {
        if (valid) {
          this.api();
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
      this.$router.push({ path: '/templates' })
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
