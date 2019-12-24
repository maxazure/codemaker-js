<template>
  <div class="project-bricks app-container">
    <div>
      <el-button style="margin: 12px;" type="primary" plain @click="add">新增模块</el-button>
    </div>
    <div class="bricks">
      <div v-for="brick in bricks" :key="brick.id">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="line-height: 40px">{{ brick.name }}/{{ brick.cnname }}</span>
            <div style="font-size: small">{{ brick.description }}</div>
            <div style="float: right">
              <el-button type="text" size="mini" @click="edit(brick.id)">修改</el-button>
              <el-button type="text" size="mini" @click="del(brick.id)">删除</el-button>
              <el-button type="text" size="mini" @click="set(brick.id)">配置</el-button>
              <el-button type="text" size="mini" @click="addField(brick.id)">添加字段</el-button>
            </div>
          </div>
          <el-table :data="brick.dfields" style="width: 100%" @row-click="rowClick">
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
            <el-dropdown @command="generate">
              <el-button type="text" size="mini" @click="log(brick.id)">生成Rails<i
                class="el-icon-arrow-down el-icon--right"
              />&nbsp;&nbsp;
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="{brickId:brick.id,type:'rails',index:'1'}">生成到Rails目录</el-dropdown-item>
                <el-dropdown-item :command="{brickId:brick.id,type:'rails',index:'2'}">打包生成Rails</el-dropdown-item>
                <el-dropdown-item v-for="item of railList" :key="item.id" :command="{brickId:brick.id ,tplId:item.id}">
                  {{ item.remark }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown @command="generate">
              <el-button type="text" size="mini" @click="log(brick.id)">生成Vue<i
                class="el-icon-arrow-down el-icon--right"
              />
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="{brickId:brick.id,type:'vue',index:'1'}">生成到vue目录</el-dropdown-item>
                <el-dropdown-item :command="{brickId:brick.id,type:'vue',index:'2'}">打包生成vue</el-dropdown-item>
                <el-dropdown-item v-for="item of vueList" :key="item.id" :command="{brickId:brick.id ,tplId:item.id}">{{
                  item.remark }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <el-dialog title="代码生成" :visible="dialogVisible" :fullscreen="true" @close="closeDialog">
            <el-input v-model="code" :autosize="true" type="textarea" />
            <el-button @click="closeDialog">关闭</el-button>
          </el-dialog>
        </el-card>

      </div>
    </div>

  </div>
</template>
<script>
import { delBrick, getBricks } from '../../api/brick'
import {
  getGenerateCode,
  getGeneratorBatch,
  getGeneratorBatchDir,
  getGeneratorListRails,
  getGeneratorListVue
} from '../../api/generate'

export default {
  components: {},
  data() {
    return {
      dialogVisible: false,
      bricks: [],
      railList: [],
      vueList: [],
      code: '',
      uploadType: 'photo'
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getList()
    this.getGeneratorListRails()
    this.getGeneratorListVue()
  },
  mounted() {
  },
  methods: {
    async getList() {
      const res = await getBricks(this.$route.query.id)
      this.bricks = res.data
    },
    async getGeneratorListRails() {
      const res = await getGeneratorListRails()
      res.data.map(
        (item) => {
          this.railList.push(item)
        }
      )
    },
    async getGeneratorListVue() {
      const res = await getGeneratorListVue()
      res.data.map(
        (item) => {
          this.vueList.push(item)
        }
      )
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
    },
    async generate(evt) {
      if (evt.index) {
        if (evt.index === '1') {
          const res = await getGeneratorBatchDir(evt.brickId, evt.type)
          this.$message({
            message: `生成成功
            ${res}`,
            type: 'success'
          })
        }
        if (evt.index === '2') {
          const res = this.getAllVue(evt.brickId, evt.type)
        }
        return
      }
      const res = await getGenerateCode(evt.brickId, evt.tplId)
      this.code = res
      this.dialogVisible = true
    },
    closeDialog() {
      this.dialogVisible = false
    },
    async getAllVue(brickId, type) {
      const res = await getGeneratorBatch(brickId, type)
      const rgx = /href=".*"/
      const oldUrl = rgx.exec(res)[0].slice(6, -1)
      this.$alert(`<a href="/api${oldUrl} " style="color:#409EFF">点击此处下载</a>`, '下载', {
        dangerouslyUseHTMLString: true
      //  todo 点击链接后自动关闭对话框
      })
    }

  }
}
</script>

<style lang="scss">
  .project-bricks {
    .bricks {
      display: flex;
      flex-wrap: wrap;

      .box-card {
        width: 500px;
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
