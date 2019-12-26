<template>
  <div class="pos app-container">
    <div class="header">
      <div>店铺收银台</div>

    </div>
    <el-row class="row2" type="flex" justify="space-between" align="middle">
      <el-col :span="4">
        <el-input v-model="input" size="small" placeholder="请输入商品条码" />
      </el-col>
      <el-col />
      <el-col :span="4">
        <div>信息</div>
      </el-col>
    </el-row>

    <div class="main">
      <el-row class="table-header" type="flex" align="middle">
        <el-col :span="24">商品信息</el-col>
      </el-row>
      <el-table
        :data="[{ date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄' }, { date: '2016-05-04', name: '王小虎', address: '上海市普陀区金沙江路 1517 弄' }]"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column
          prop="date"
          label="日期"
          width="180"
        />
        <el-table-column
          prop="name"
          label="姓名"
          width="180"
        />
        <el-table-column
          prop="address"
          label="地址"
        />
      </el-table>
    </div>
    <div class="bottom">
      <el-row class="bottom-header" type="flex" align="middle">
        <el-col :span="24">支付信息</el-col>
      </el-row>
      <el-row gutter="10" class="bottom-card" type="flex" justify="space-between">
        <el-col :span="7">
          <el-card class="box-card">
            <el-row slot="header" class="clearfix">
              <el-col :span="12">会员信息</el-col>
              <el-col :span="12">
                <el-select size="mini" type="text">操作按钮</el-select>
              </el-col>
            </el-row>
            <div v-for="o in 4" :key="o" class="text item">
              {{ '列表内容 ' + o }}
            </div>
          </el-card>
        </el-col>
        <el-col>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>卡片名称</span>
              <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <el-row :gutter="10">
              <el-col :span="6">
                <div class="">总数量</div>
                <div class="">总数量</div>
                <div class="">总数量</div>
                <div class="">总数量</div>
              </el-col>
              <el-col :span="18">
                <div class="">icon</div>
                <i class="el-icon-edit" />
                <i class="el-icon-edit" />
                <i class="el-icon-edit" />
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>

    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
  .pos {
    .header {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 50px;
      background-color: lightblue;
      color: white;

    }

    .row2 {
      height: 50px;
      background-color: lightcyan;
    }

    .main {
      min-height: 500px;

      .table-header {
        height: 30px;
        background-color: lightgoldenrodyellow;
      }
    }

    .bottom {
      .bottom-header {
        background-color: lightgoldenrodyellow;
        height: 30px;

        .el-col {

        }
      }

      .bottom-card {
        padding: 10px 0
      }

    }
  }
</style>
