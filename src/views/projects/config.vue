<template>
  <div class="app-container">
    <el-row>
      <el-col :span="3">
        <el-button @click="addInput">button1</el-button>
      </el-col>
      <el-col :span="21">
        {{yyyy}}
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getBrick, delBrick } from '../../api/brick'
import draggable from 'vuedraggable'

export default {
  components: { draggable },
  data() {
    return {
      yyyy: '',
      list1: [
        { name: 'John', id: 1 },
        { name: 'Joao', id: 2 },
        { name: 'Jean', id: 3 },
        { name: 'Gerard', id: 4 }
      ],
      list2: [
        { name: 'Juan', id: 5 },
        { name: 'Edgard', id: 6 },
        { name: 'Johnson', id: 7 }
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
    log: function(evt) {
      window.console.log(evt)
    },
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
    addInput() {
      this.yyyy = `<el-input v-model="input" placeholder="请输入内容"></el-input>`
    }
  }
}
</script>

<style lang="scss">

</style>
