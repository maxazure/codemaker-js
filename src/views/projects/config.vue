<template>
  <div class="detail app-container">
    <div class="brick">
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
      <el-button type="primary" plain @click="reset">重置</el-button>
      <el-button type="success" plain @click="save">保存</el-button>
      <el-card class="form-card">
        <el-card v-for="row in rows" :key="row.id" class="rows">
          <div slot="header" class="clearfix">
            <el-input v-model="row.title" style="width: 150px" placeholder="请输入标题" />

            <div style="float: right">
              <el-button type="text" style="padding: 5px" icon="el-icon-plus" plain @click="addCol(row)">新增列
              </el-button>
              <el-button style="padding: 5px;margin: 0" icon="el-icon-minus" plain @click="cutCol(row)">
                <span>减少列</span>
              </el-button>
            </div>
          </div>
          <div
            class="row-flex"
          >
            <div v-for="col in row.cols" :key="col.id" class="row">
              <el-card class="cols">
                <draggable class="dragField drag" :list="col.fields" group="fields" @change="log">
                  <div v-for="field in col.fields" :key="field.id" class="fields">
                    {{ field.name }}
                  </div>
                </draggable>
              </el-card>
            </div>
            <div style="width: 80px" />
          </div>

        </el-card>
        <div class="add-row">
          <el-button style="padding: 5px" icon="el-icon-plus" type="primary" plain @click="addRow">新增行</el-button>
          <el-button style="padding: 5px;margin-left: 0" icon="el-icon-minus" type="info" plain @click="cutRow">减少行
          </el-button>
        </div>
      </el-card>
      <div />
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
            fields: [{ 'id': '1', 'name': 'fiel11', 'cnname': '中文名', 'type': '类型' }, {
              'id': '1',
              'name': 'fiel2',
              'cnname': '中文名',
              'type': '类型'
            }]
          },
      rows: [{
        row: 'row1',
        cols: [
          {
            col: 'col1',
            width: '10',
            fields: [{ 'name': '字段1' }, { 'name': '字段2' }]
          }, {
            col: 'col2',
            fields: []
          }
        ]
      },
      {
        row: 'row2',
        cols: [
          {
            col: 'col1',
            fields: []
          }

        ]
      }
      ]
    }
  },
  computed: {},
  watch: {},
  created() {
    this.get()
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

    addRow() {
      this.rows.push({
        row: 'row' + this.rows.length + 1, cols: [{ fields: [] }]
      })
    },
    cutRow() {
      this.rows.pop()
    },
    addCol(row) {
      row.cols.push({ fields: [] })
    },
    cutCol(row) {
      row.cols.pop()
    },
    set(id) {
      this.$router.push({ path: 'bricks/config' })
    },
    async save() {
      console.log(this.save)
    },
    reset() {
      this.get()
    }
  }
}
</script>

<style lang="scss">
  .detail {
    display: flex;

    .box-card {
      width: 200px;
      float: left;
      margin: 12px;
    }

    .form {
      /*width: 50%;*/

      .form-card {
        min-width: 800px;

        .rows {
          margin: 20px;

          .row-flex {
            display: flex;
            justify-content: center;
            align-items: center;

            .cols {
              margin: 10px;
              width: 100px;

            }
          }
        }
      }

      .add-row {
        width: 200px;
        margin: 0 auto
      }
    }

  }
</style>
