<template>
  <div class="detail app-container">
    <el-button type="primary" @click="add">新增模块</el-button>
    <div v-for="item in list" :key="item.id">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>{{ item.name }}/{{ item.cnname }}</span>
          <div style="float: right">
            <el-button type="primary">修改</el-button>
            <el-button type="primary">添加</el-button>
          </div>
        </div>
        <el-table
          :data="item"
          border
          style="width: 100%"
        >
          <el-table-column
            prop="name"
            label="字段名"
            width="180"
          />
          <el-table-column
            prop="cnname"
            label="中文名"
            width="180"
          />
          <el-table-column
            prop="type"
            label="类型"
          />
        </el-table>
      </el-card>

    </div>
  </div>
</template>
<script>
import { getBricks } from '../../api/brick'

export default {
  components: {},
  data() {
    return {
      list: [],
      data: {}
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getList()
  },
  mounted() {
  },
  methods: {
    async getList() {
      const res = await getBricks(this.$route.query.id)
      this.list = res.data
    },
    add() {
      this.$router.push({ path: 'bricks/add', query: { id: this.$route.query.id }})
    }
  }
}
</script>

<style scoped lang="scss">
  .detail {
    .box-card {
      width: 400px;
      float: left;
      margin: 24px;
    }
  }
</style>
