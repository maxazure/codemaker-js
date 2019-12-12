<template>
  <div class="detail app-container">
    <div class="bricks">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>{{ brick.name }}/{{ brick.cnname }}</span>
          <div style="float: right">
            <el-button type="text" @click="edit(brick.id)">修改</el-button>
            <el-button type="text" @click="del(brick.id)">删除</el-button>
            <el-button type="text" @click="addField(brick.id)">添加字段</el-button>
          </div>
        </div>
        <draggable class="dragField drag" :list="brick.fields" group="fields" @change="log">
          <div v-for="field in brick.fields" :key="field.id" class="fields">
            {{ field.name }}
          </div>
        </draggable>
      </el-card>

    </div>
    <div class="form">
      <div>生成表单</div>
      <el-button type="primary" plain @click="addFormCol">新增列</el-button>
      <el-button type="info" plain @click="cutFormCol">减少列</el-button>
      <el-button type="success" plain @click="save">保存</el-button>
      <div v-for="brick in row" :key="brick.id">
        <el-card class="box-card form-card">

          <draggable class="dragField drag" :list="brick.fields" group="fields" @change="log">
            <div v-for="field in brick.fields" :key="field.id" class="fields">
              {{ field.name }}
            </div>
          </draggable>
        </el-card>
      </div>
      <div>
        {{ row }}
      </div>
    </div>
  </div>
</template>
<script>
import { getBrick, delBrick } from '../../api/brick'
import draggable from 'vuedraggable'

export default {
  components: { draggable },
  data() {
    return {
      brick:
          {
            'name': 'Johnson',
            'id': 7,
            fields: [{ 'id': '1', 'name': 'fiel111dname', 'cnname': '中文名', 'type': '类型' }]
          },
      data: {},
      row: [{
        col: 1,
        fields: []
      }]
    }
  },
  computed: {},
  watch: {},
  created() {
    // this.get()
  },
  mounted() {
  },
  methods: {
    async get() {
      const res = await getBrick(this.$route.query.id)
      this.list = res.data
    },
    add() {
      this.$router.push({ path: 'bricks/add', query: { id: this.$route.query.id }})
    },
    edit(id) {
      this.$router.push({ path: 'bricks/edit', query: { id: id }})
    },
    del(id) {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delBrick(id).then(response => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getList()
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    addField(id) {
      this.$router.push({ path: 'bricks/fields/add' })
    },
    addFormCol() {
      this.row.push({ col: this.row.length + 1, fields: [] })
    },
    cutFormCol() {
      this.row.pop()
    },
    set(id) {
      this.$router.push({ path: 'bricks/config' })
    },
    back() {
      history.go(-1)
    },
    async save() {
      console.log(this.save)
    }
  }
}
</script>

<style scoped lang="scss">
  .detail {
    display: flex;

    .box-card {
      width: 400px;
      float: left;
      margin: 12px;
    }

    .form-card {
      width: 200px;
    }

    .bricks {
      width: 50%;
    }

    .form {
      width: 50%;
    }

    .drag {
      font-size: 18px;
      line-height: 30px;
    }
  }
</style>
