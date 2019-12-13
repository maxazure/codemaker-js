<template>
  <div class="detail app-container">
    <div class="nav">

      <el-menu
        default-active="1"
        class="el-menu-vertical"
        :collapse="isCollapse"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location" />
            <span>布局设置</span>
          </template>
          <draggable :list="layouts" class="layouts" :group="{ name: 'layouts', pull: 'clone', put: false }">
            <el-menu-item v-for="layout of layouts" :key="layout.id" :index="layout.id">
              {{ layout.row }}
            </el-menu-item>

          </draggable>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-menu" />
            <span slot="title">字段</span>
          </template>
          <draggable :list="brick.dfields" class="fields" :group="{name:'fields'}">
            <el-menu-item v-for="field of brick.dfields" :key="field.id" :index="field.id">
              {{ field.name }} {{ field.cnname }}
            </el-menu-item>

          </draggable>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-menu" />
            <span slot="title">组件</span>
          </template>
          <draggable :list="comps" class="comps" :group="{name:'fields'}">
            <el-menu-item index="3-1"  >
              下拉框
            </el-menu-item>
            <el-menu-item  index="3-2">
              文本框
            </el-menu-item>
          </draggable>
        </el-submenu>
      </el-menu>

    </div>

    <div class="form-container">
      <el-card>
        <draggable :list="rows" group="layouts">
          <el-card v-for="row of rows" :key="row.id">
            <div slot="header" class="clearfix">
              <el-input v-model="row.title" style="width: 100px" placeholder="请输入标题" />
              <div style="float: right;height: 20px">
                <el-button style="padding: 5px;margin: 0" icon="el-icon-minus" plain @click="delRow(row)">
                  <span>删除</span>
                </el-button>
              </div>
            </div>
            <div>
              <el-row>
                <div v-for="col of row.cols" :key="col.id">
                  <el-col :span="row.span">
                    <draggable :list="col.fields" :group="{name:'fields'}" class="cols">
                      放到此处
                      <div v-for="field of col.fields" :key="field.id" class="fields">
                        {{ field.name }} {{ field.cnname }}
                      </div>
                    </draggable>
                  </el-col>
                </div>
              </el-row>
            </div>
          </el-card>
        </draggable>
      </el-card>
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
      brick: {},
      rows: [],
      isCollapse: false,
      layouts: [
        { row: '1列', span: 24, cols: [{ fields: [] }] },
        { row: '2列', span: 12, cols: [{ fields: [] }, { fields: [] }] },
        { row: '3列', span: 8, cols: [{ fields: [] }, { fields: [] }, { fields: [] }] },
        {
          row: '4列', span: 6,
          cols: [{ fields: [] }, { fields: [] }, { fields: [] }, { fields: [] }]
        }
      ],
      comps: []
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
      this.brick = res.data
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
    cutRow() {
      this.rows.pop()
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
    },
    delRow(row) {
      this.rows.splice(this.rows.indexOf(row), 1)
    }
  }
}
</script>

<style lang="scss">
  .detail {
    display: flex;

    .nav {
      width: 200px;
    }

    .form-container {
      flex: 1;

      .cols {
        /*display: flex;*/
        /*justify-content: space-around;*/
        padding: 10px;
        border: #d3dce6 1px solid;

        .fields {
          border: #d3dce6 1px solid;
        }
      }
    }

  }
</style>
