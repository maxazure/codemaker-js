<template>
  <div class='card-container'>
    <el-card class='box-card'>
      <h3>新<%= @brick[:cnname] %></h3>
      <el-form
        ref='yForm'
        :model='<%= @brick[:name]%>Form'
        :rules='rules'
        label-width='100px'

      >
        <el-row>
          <% @brick.dfields.order('sort').each do |f|%>
          <el-col :span="12">
            <el-form-item label='<%= f[:cnname] %>:' prop='<%= f[:name] %>'>
              <component  is='<%= f[:ctype] %>'  v-model='<%= @brick[:name]%>Form.<%= f[:name] %>'
              <% if f[:api] %>:options="<%= f[:name] %>Options" <%end%> />
            </el-form-item>
          </el-col>
          <%end%>
        <el-col :span="24">
        <el-form-item>
          <el-button @click="submit('<%= @brick[:name]%>Form')">提交</el-button>
          <el-button @click='back'>返回</el-button>
        </el-form-item>
        </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { add<%=titleize(@brick[:name])%> } from '@/api/<%= @brick[:name]%>';
import request from '../../utils/request'

export default {
  components: {
  },
  data() {
    return {
      <%= @brick[:name]%>Form: {  },
    //  apiList
  <% @brick.dfields.order('sort').each do |f|%>
    <% if f[:api] %>
  <%= f[:name] %>Options:[],
  <%end%> <%end%>

      rules: {<% @brick.dfields.each do |f|%><%= f[:name] %>:[<% if f[:is_required] %>
        {required:true,
          message:'请输入<%= f[:cnname] %>',
          trigger:'blur'},<%end%>
      <% if f[:regx] %>
        <%= f[:regx] %>
      <%end%>],
      <%end%>}
    };
  },
  created() {
    //    getApiList
  <% @brick.dfields.order('sort').each do |f|%>
    <% if f[:api] %>
    this.get<%= f[:name] %>List()
    <%end%> <%end%>

  },
  mounted() {},
  methods: {
    async api() {
      this.$router.push({ path: '/<%= @brick[:name_plural]%>' });
      const res = await add<%=titleize(@brick[:name])%>(this.<%= @brick[:name]%>Form);
    },
    async submit(<%= @brick[:name]%>Form) {
      this.$refs.yForm.validate(valid => {
        if (valid) {
          this.api();
          this.$message({
            message: '添加成功',
            type: 'success'
          });
        } else {
          return false;
        }
      });
    },

//    getApiList
<% @brick.dfields.order('sort').each do |f|%>
<% if f[:api] %>
async get<%= f[:name] %>List(){
  const response = await request({url:'<%= f[:api] %>',method:'get'})
  response.data.map((option) => {
    this.<%= f[:name] %>Options.push({ value: option.id, label: option.name })
  })
},
<%end%>
<%end%>



back() {
      this.$router.push({ path: '/<%= @brick[:name_plural]%>' });
    }
  }
};
</script>
<style lang='scss' scope>
.card-container {
  background-color: #f0f2f5;
  padding: 30px;
  min-height: 100vh;
  .box-card {

  }
}
</style>
