<template>
  <div class="detail app-container">
    <div>
      <el-button style="margin: 12px;" type="primary" plain @click="add">新增模块</el-button>
    </div>
    <div class="bricks">

      <div v-for="item in list" :key="item.id">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="line-height: 40px">{{ item.name }}/{{ item.cnname }}</span>
            <div style="float: right">
              <el-button type="text" size="mini" @click="edit(item.id)">修改</el-button>
              <el-button type="text" size="mini" @click="del(item.id)">删除</el-button>
              <el-button type="text" size="mini" @click="set(item.id)">配置</el-button>
              <el-button type="text" size="mini" @click="addField(item.id)">添加字段</el-button>
            </div>
          </div>
          <el-table :data="item.dfields" style="width: 100%" @row-click="rowClick">
            <el-table-column prop="name" label="字段名" />
            <el-table-column prop="cnname" label="中文名" />
            <el-table-column prop="ctype" label="组件类型" width="112px" />
            <el-table-column prop="field_type" label="类型" width="70px" />
            <el-table-column label="必 首 改" width="80px">
              <template slot-scope="scope">
                <i :class="scope.row.is_required? 'el-icon-check':'el-icon-close'" />
                <i :class="scope.row.is_show_in_list? 'el-icon-check':'el-icon-close'" />
                <i :class="scope.row.is_editable? 'el-icon-check':'el-icon-close'" />
              </template>
            </el-table-column>

          </el-table>
          <div style="float: right">
            <el-dropdown>
              <el-button type="text" size="mini" @click="log(item.id)">生成Rails<i
                class="el-icon-arrow-down el-icon--right"
              />&nbsp;&nbsp;
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>打包生成Rails</el-dropdown-item>
                <el-dropdown-item>生成migration</el-dropdown-item>
                <el-dropdown-item>生成controller.rb</el-dropdown-item>
                <el-dropdown-item>生成index.jbuilder</el-dropdown-item>
                <el-dropdown-item>生成show.jbuilder</el-dropdown-item>
                <el-dropdown-item>生成model</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown>
              <el-button type="text" size="mini" @click="log(item.id)">生成Vue<i
                class="el-icon-arrow-down el-icon--right"
              />
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>打包生成vue</el-dropdown-item>
                <el-dropdown-item>生成index.vue</el-dropdown-item>
                <el-dropdown-item>生成add.vue</el-dropdown-item>
                <el-dropdown-item>生成edit.vue</el-dropdown-item>
                <el-dropdown-item>生成api.js</el-dropdown-item>
                <el-dropdown-item>生成router.js</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-card>

      </div>
    </div>

  </div>
</template>
<script>
import { delBrick, getBricks } from '../../api/brick'

export default {
  components: {},
  data() {
    return {
      list: []
    }
  },
  computed: {},
  watch: {},
  created() {
  },
  mounted() {
    this.getList()
  },
  methods: {
    async getList() {
      const res = await getBricks(this.$route.query.id);
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
            });
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
      this.$router.push({ path: 'bricks/fields/add', query: { id: id }})
    },
    addFormCol() {
      this.row.push({ col: this.row.length + 1, fields: [] })
    },
    cutFormCol() {
      this.row.pop()
    },
    set(id) {
      this.$router.push({ path: 'bricks/config', query: { id: id }})
    },
    rowClick(row, column, event) {
      this.$router.push({ path: 'bricks/fields/edit', query: { id: row.id }})
    },
    log(o) {
      console.log(o)
    }
  }
}
</script>

<style lang="scss">
  .detail {
    .bricks {
      display: flex;
      flex-wrap: wrap;

      .box-card {
        width: 500px;
        /*float: left;*/
        margin: 12px;

        .el-table {
          font-size: 12px;

          td {
            padding: 0;
          }

          th {
            padding: 0;
          }
        }
      }
    }

  }

</style>
