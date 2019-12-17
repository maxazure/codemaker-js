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
          <draggable
            :list="layouts"
            class="layouts"
            :group="{ name: 'layouts', pull: 'clone', put: false }"
            handle=".nav-field"
          >
            <el-menu-item v-for="layout of layouts" :key="layout.id" :index="layout.id">
              <div
                class="nav-field"
              >{{ layout.row }}
              </div>
            </el-menu-item>

          </draggable>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-menu" />
            <span slot="title">字段</span>
          </template>
          <draggable
            :list="brick.tasks"
            class="tasks"
            :group="{ name: 'tasks' }"
            @drag="log"
          >
            <el-menu-item v-for="field of brick.tasks" :key="field.id" :index="field.id">
              <div>{{ field.name }} {{ field.cnname }}
              </div>
            </el-menu-item>

          </draggable>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-menu" />
            <span slot="title">组件</span>
          </template>
          <draggable :list="comps" class="comps" group="tasks">
            <el-menu-item index="3-1">
              下拉框
            </el-menu-item>
            <el-menu-item index="3-2">
              文本框
            </el-menu-item>
          </draggable>
        </el-submenu>
      </el-menu>

    </div>

    <div class="form-container">
      <el-card>
        {{layouts}}
        ___________
        {{ tasks }}
        <draggable :list="tasks" group="layouts" handle=".header">
          <el-card v-for="row of tasks" :key="row.id">
            <div slot="header" class="clearfix header">
              <el-input v-model="row.title" style="width: 100px" placeholder="请输入标题" />
              <div style="float: right;height: 20px">
                <el-button style="padding: 5px;margin: 0" icon="el-icon-minus" plain @click="delRow(row)">
                  <span>删除</span>
                </el-button>
              </div>
            </div>
            <div>
              <nestedDraggable :tasks="row.tasks" />
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
import baseButton from '@/components/editor/base-button'
import baseInput from '@/components/editor/base-input'
import baseSelect from '@/components/editor/base-select'
import nestedDraggable from '@/components/dragable/nested'

export default {
  components: { draggable, baseInput, baseButton, baseSelect, nestedDraggable },
  data() {
    return {
      brick: {
        name: 'test',
        tasks: [{ name: 'input', type: 'baseInput', id: '1' }, { name: 'button', type: 'baseButton', id: '2' }, {
          name: 'select',
          type: 'baseSelect', id: '3'
        }],
        id: '123'
      },
      tasks: [],
      isCollapse: false,
      layouts: [
        { row: '1列', span: 24, tasks: [{ tasks: [] }] },
        { row: '2列', span: 12, tasks: [{ tasks: [] }, { tasks: [] }] },
        { row: '3列', span: 8, tasks: [{ tasks: [] }, { tasks: [] }, { tasks: [] }] },
        {
          row: '4列', span: 6,
          tasks: [{ tasks: [] }, { tasks: [] }, { tasks: [] }, { tasks: [] }]
        }
      ],
      comps: []
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
      this.tasks.pop()
    },
    cutCol(row) {
      row.tasks.pop()
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
      this.tasks.splice(this.tasks.indexOf(row), 1)
    },
    log(evt) {
      console.log(evt)
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

      .tasks {
        /*display: flex;*/
        /*justify-content: space-around;*/
        padding: 10px;
        border: #d3dce6 1px solid;

        .tasks {
          border: #d3dce6 1px solid;
        }
      }
    }

  }
</style>
