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
            <span >布局设置</span>
          </template>
          <draggable
            :list="layouts"
            class="layouts"
            :group="{ name: 'layouts', pull: 'clone', put: false }"
            @change="log"
          >
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
          <div class="field-group">
            <el-menu-item v-for="field of brick.fields" :key="field.id" :index="field.id">
              <div class="field-item">
                {{ field.name }} {{ field.cnname }}
              </div>
            </el-menu-item>

          </div>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-menu" />
            <span slot="title">组件</span>
          </template>
          <draggable :list="comps" class="comps" group="fields">
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
        <div>{{ rows }}</div>
        <draggable :list="rows" group="layouts" @change="changeLayout">
          <el-card v-for="row of rows" :key="row.id">
            <div slot="header" class="clearfix row-header">
              <el-input v-model="row.title" style="width: 100px" placeholder="请输入标题" />
              <div style="float: right;height: 20px">
                <el-button style="padding: 5px;margin: 0" icon="el-icon-minus" plain @click="delRow(row)">
                  <span>删除</span>
                </el-button>
              </div>
            </div>
            <div>
              <el-row>
                <div v-for="(col,colIndex ) of row.cols" :key="col.id">
                  <el-col :span="row.span">
                    <div :class="'col'+colIndex">
                      放到此处
                      <div v-for="(field,fieldIndex) of col.fields" :key="field.id" class="field">
                        <!--                        <div   class="field-item"  >{{ field.name }} {{ field.cnname }}</div>-->
                        <component :is="field.type" />
                      </div>
                    </div>
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
import baseButton from '@/components/editor/base-button'
import baseInput from '@/components/editor/base-input'
import baseSelect from '@/components/editor/base-select'
import Sortable from 'sortablejs'

export default {
  components: { draggable, baseInput, baseButton, baseSelect },
  data() {
    return {
      brick: {
        name: 'test',
        fields: [
          { name: 'input', type: 'baseInput', id: '1' },
          { name: 'button', type: 'baseButton', id: '2' },
          { name: 'select', type: 'baseSelect', id: '3' }],
        id: '123'
      },
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
    // this.get()
  },
  mounted() {
    const $list1 = this.$el.querySelector('.field-group')

    new Sortable.create($list1, {
      handle: '.field-item',
      animation: 150,
      group: 'fields',
      ghostClass: 'blue-background-class',
      onUpdate: (event) => {
        console.log('event值为：', event, event.newIndex, event.oldIndex)
        this.onUpEvent(event)
      }
    })
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
    },
    log: function(evt) {
      window.console.log(evt)
    },
    onUpEvent(e) {
      console.log(e)
      // var item = this.list1[e.oldIndex]
      // this.rows.splice(e.oldIndex, 1)
      // this.rows.splice(e.newIndex, 0, item)
      console.log('拖动后的数据显示', this.rows)
    },
    changeLayout(evt) {
      console.log(evt)
      if (evt.added) {
        const cols = evt.added.element.cols
        for (let i = 0; i < cols.length; i++) {
          const $col = this.$el.querySelector('.col' + i)
          new Sortable.create($col, {
            handle: 'field-item',
            animation: 150,
            group: 'fields',
            fallbackOnBody: true,
            ghostClass: 'blue-background-class',
            onUpdate: (event) => {
              console.log('event值为：', event, event.newIndex, event.oldIndex)
              this.onUpEvent(event)
            }
          })
        }
      }
    },
    clickField(evt) {
      console.log('cli')
      console.log(evt)
    },
    drag(evt) {
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
