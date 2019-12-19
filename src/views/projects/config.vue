<template>
  <div class="project-config app-container">
    <div class="nav">
      <el-menu
        default-active="1"
        :default-openeds="['1','2']"
        class="el-menu-vertical"
        :collapse="false"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location" />
            <span>布局设置</span>
          </template>
          <draggable
            class="layouts"
            :list="layouts"
            :group="{ name: 'layouts', pull: 'clone', put: false }"
            :clone="deepClone"
            handle=".nav-dfield"
          >
            <el-menu-item v-for="layout of layouts" :key="layout.row" :index="layout.row">
              <div
                class="nav-dfield"
              >
                {{ layout.row }}
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
            :list="brick.dfields"
            class="dfields"

            group="dfields"
          >
            <el-menu-item v-for="dfield of brick.dfields" :key="dfield.id" :index="dfield.id.toString()">
              <div>
                {{ dfield.cnname }}:&nbsp;{{ dfield.ctype.slice(4) }}
              </div>
            </el-menu-item>
          </draggable>
        </el-submenu>
      </el-menu>
    </div>
    <div class="form-container">
      <el-card>
        <div slot="header" class="clearfix">
          <div style="float: right;height: 20px">
            <el-button style="padding: 5px;margin: 0" plain @click="reset">
              <span>重置</span>
            </el-button>
            <el-button style="padding: 5px;margin: 0" type="primary" @click="save">
              <span>保存</span>
            </el-button>
          </div>
        </div>
        <draggable :list="rows" group="layouts" handle=".header">
          <el-card v-for="row of rows" :key="row.id">
            <div slot="header" class="clearfix header">
              <el-input v-model="row.title" style="width: 100px" placeholder="请输入标题" />
              <div style="float: right;height: 20px">
                <el-button style="padding: 5px;margin: 0" icon="el-icon-minus" plain @click="delRow(row)">
                  <span>删除</span>
                </el-button>
              </div>
            </div>
            <!--    移动 col -->
            <!--            <draggable :list="row.cols" group="cols">     -->
            <el-row>
              <div v-for="col of row.cols" :key="col.id" class="cols">
                <el-col :span="row.span">
                  <div class="th">列</div>
                  <draggable :list="col.dfields" group="dfields">
                    <div v-for="dfield of col.dfields" :key="dfield.id" class="dfields">
                      <el-row :gutter="10">
                        <el-col :span="6">
                          <div class="label">{{ dfield.cnname }}:&nbsp;</div>
                        </el-col>
                        <el-col :span="18">
                          <component
                            :is="dfield.ctype"
                            v-model="value"
                            class="dfield"
                            :options="dfield.options"
                          />
                        </el-col>
                      </el-row>
                    </div>
                  </draggable>
                </el-col>
              </div>
            </el-row>
          </el-card>
        </draggable>
      </el-card>
    </div>
  </div>
</template>
<script>
import { getBrick } from '../../api/brick'
import request from '../../utils/request'

import draggable from 'vuedraggable'

export default {
  components: {
    draggable
  },
  data() {
    return {
      value: '',
      brick: {},
      rows: [],
      layouts: [
        { row: '1列', span: 24, cols: [{ dfields: [] }] },
        { row: '2列', span: 12, cols: [{ dfields: [] }, { dfields: [] }] },
        { row: '3列', span: 8, cols: [{ dfields: [] }, { dfields: [] }, { dfields: [] }] },
        {
          row: '4列', span: 6,
          cols: [{ dfields: [] }, { dfields: [] }, { dfields: [] }, { dfields: [] }]
        }
      ]
    }
  },
  created() {
    this.get()
  },
  methods: {
    async get() {
      const res = await getBrick(this.$route.query.id)
      this.brick = res.data
      this.brick.dfields.map(async(field) => {
        if (field.api) {
          this.$set(field, 'options', [])
          const res = await request({ url: field.api, method: 'get' })
          res.data.map((option) => {
            field.options.push({ value: option.id, label: option.name })
          })
        }
      })
    },
    async save() {
      console.log(this.rows)
    },
    reset() {
      this.get()
      this.rows = []
    },
    delRow(row) {
      if (row.cols) {
        row.cols.map((item) => {
          item.dfields.map((item2) => {
            this.brick.dfields.push(item2)
          })
        })
      }
      this.rows.splice(this.rows.indexOf(row), 1)
    },
    log(evt) {
      console.log('event', evt)
    },
    deepClone(o) {
      return JSON.parse(JSON.stringify(o))
    }
  }
}
</script>

<style scoped lang="scss">
  .project-config {
    display: flex;

    .nav {
      width: 200px;
    }

    .form-container {
      flex: 1;

      .cols {
        .th {
          text-align: center;
          color: #c4c4d6;
        }

        .dfields {
          padding: 10px;

          .label {
            float: right;
            line-height: 40px;
            font-size: 13px;
          }

        }
      }
    }

  }
</style>
