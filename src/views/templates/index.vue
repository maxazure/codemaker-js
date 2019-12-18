<template>
  <div class="app-container">
    <el-button @click="add">添加模板</el-button>
    <y-table :table-data="tableData" :pagination="pagination" @changePage4List="getList">
      <template>
        <el-table-column prop="id" label="ID" width="50px" />
        <el-table-column prop="filename" label="文件名" width="260px" />

        <el-table-column prop="tpltype" label="模板类型" width="100px" />

        <el-table-column prop="outdir" label="输出目录" />

        <el-table-column label="操作" width="100px">
          <template slot-scope="{row}">
            <el-button type="text" size="small" @click="edit(row.id)">修改</el-button>
            <el-button type="text" size="small" @click="del(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </template>
    </y-table>
  </div>
</template>
<script>
import { getTemplates, delTemplate } from '@/api/template'
import yTable from '@/components/yTable'

export default {
  components: { yTable },
  data() {
    return {
      tableData: [],
      pagination: {
        pageNumber: 1,
        pageSize: 10
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      const response = await getTemplates({
        page: this.pagination.pageNumber,
        pagesize: this.pagination.pageSize
      });
      this.tableData = response.data;
      this.pagination.total = response.data.pagination.total
    },

    add() {
      this.$router.push({ path: 'add' })
    },
    edit(id) {
      this.$router.push({ path: 'edit', query: { id: id }})
    },
    del(id) {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delTemplate(id).then(response => {
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
    }
  }
}
</script>

<style lang='scss' scope>
  .app-container {
  }
</style>
