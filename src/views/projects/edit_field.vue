<template>

  <y-card :title="title" class="edit_field ">
    <template>
      <el-form
        ref="yForm"
        :model="fieldForm"
        :rules="rules"
        label-width="150px"
      >
        <el-form-item />
        <el-form-item label="英文名称:" >
          <el-input v-model="fieldForm.name" />
        </el-form-item>
        <el-form-item label="中文名称:" >
          <el-input v-model="fieldForm.cnname" />
        </el-form-item>
        <el-form-item label="简介:"  >
          <el-input v-model="fieldForm.description" />
        </el-form-item>
        <el-form-item label="字段类型:"  >
          <el-input v-model="fieldForm.field_type" />
        </el-form-item>
        <el-form-item label="是否必填:" >
          <el-switch
            v-model="fieldForm.is_required"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
        <el-form-item label="是否显示在列表:" >
          <el-switch
            v-model="fieldForm.is_show_in_list"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
        <el-form-item label="是否可编辑:" >
          <el-switch
            v-model="fieldForm.is_editable"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
        <el-form-item label="API数据接口:" >
          <el-input v-model="fieldForm.api" />
        </el-form-item>
        <el-form-item label="排序:" >
          <el-input v-model="fieldForm.sort" />
        </el-form-item>
        <el-form-item label="宽度:" >
          <el-input v-model="fieldForm.width" />
        </el-form-item>
        <el-form-item label="正则:" >
          <el-input v-model="fieldForm.regx" />
        </el-form-item>

        <el-form-item>
          <el-button @click="submit('fieldForm')">提交</el-button>
          <el-button @click="back">返回</el-button>
        </el-form-item>

      </el-form>
    </template>
  </y-card>

</template>

<script>
import yCard from '@/components/yCard'
import { getDfield, putDfield } from '../../api/dfield'

export default {
  components: { yCard },
  data() {
    return {
      title: '修改字段',
      fieldForm: {},
      rules: null
    }
  },
  created() {
    this.get()
  },
  mounted() {
  },
  methods: {
    async get() {
      const res = await getDfield(this.$route.query.id)
      this.fieldForm = res.data
    },
    async api() {
      this.fieldForm.project_id = this.$route.query.id
      const res = await putDfield(this.fieldForm.id,this.fieldForm)
      this.back()
    },
    async submit(fieldForm) {
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
      history.go(-1)
    }
  }
}
</script>
<style lang='scss' scope>
  .edit_field {
    /*区分单卡片与多卡片*/
    /*min-height: 90vh;*/
  }

</style>
