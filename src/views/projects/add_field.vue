<template>

  <y-card :title="title" class="add_field ">
    <template>
      <el-form
        ref="yForm"
        :model="fieldForm"
        :rules="rules"
        label-width="150px"
      >
        <el-form-item />
        <el-form-item label="英文名称:">
          <el-input v-model="fieldForm.name" />
        </el-form-item>
        <el-form-item label="中文名称:">
          <el-input v-model="fieldForm.cnname" />
        </el-form-item>
        <el-form-item label="简介:">
          <el-input v-model="fieldForm.description" />
        </el-form-item>
        <el-form-item label="字段类型:">
          <array-select v-model="fieldForm.field_type" :options="fieldTypes" />
        </el-form-item>
        <el-form-item label="组件类型:">
          <array-select v-model="fieldForm.ctype" :options="types" />
        </el-form-item>
        <el-form-item label="是否必填:">
          <el-switch
            v-model="fieldForm.is_required"
            active-color="#13ce66"
            inactive-color="#ff4949"
          />
        </el-form-item>
        <el-form-item label="是否显示在列表:">
          <el-switch
            v-model="fieldForm.is_show_in_list"
            active-color="#13ce66"
            inactive-color="#ff4949"
          />
        </el-form-item>
        <el-form-item label="是否可编辑:">
          <el-switch
            v-model="fieldForm.is_editable"
            active-color="#13ce66"
            inactive-color="#ff4949"
          />
        </el-form-item>
        <el-form-item label="API数据接口:">
          <el-input v-model="fieldForm.api" />
        </el-form-item>
        <el-form-item label="排序:">
          <el-input v-model="fieldForm.sort" />
        </el-form-item>
        <el-form-item label="宽度:">
          <el-input v-model="fieldForm.width" />
        </el-form-item>
        <el-form-item label="正则:">
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
import { addDfield } from '@/api/dfield'
import yCard from '@/components/yCard'
import arraySelect from '@/components/array-select'
import global from '@/components/Global'
import { getWidgets } from '../../api/widget'

export default {
  components: { yCard, arraySelect },
  data() {
    return {
      title: '新字段',
      fieldForm: {
        field_type: 'string',
        ctype: 'dragInput',
        is_show_in_list: true,
        is_editable: true,
        is_required: true
      },
      fieldTypes: global.fieldTypes,
      rules: null,
      types: []
    }
  },
  created() {
    // this.init()
    this.getWidgets()
  },
  mounted() {
  },
  methods: {
    async getWidgets() {
      const res = await getWidgets()
      console.log(res)
      res.data.map((item) => {
        this.types.push({ value: item.widget_type, label: item.name })
      })
    },

    async api() {
      this.fieldForm.brick_id = this.$route.query.id
      const res = await addDfield(this.fieldForm)
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
  .add_field {
    /*区分单卡片与多卡片*/
    /*min-height: 90vh;*/
  }

</style>
