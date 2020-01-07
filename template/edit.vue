<template>
  <div class='card-container'>
    <el-card class='box-card'>
      <h3>修改<%= @brick[:cnname] %></h3>
      <el-form
        ref='<%= @brick[:name]%>EditForm'
        :model='<%= @brick[:name]%>EditForm'
        :rules='rules'
        label-width='100px'
      >
        <el-row>
          <% @brick.dfields.order('sort').each do |f|%>
          <el-col :span="12">
         <el-form-item label='<%= f[:cnname] %>:' prop='<%= f[:name] %>'>
          <component  is='<%= f[:ctype] %>'  v-model='<%= @brick[:name]%>EditForm.<%= f[:name] %>'
           <% if f[:api] %>:options="<%= f[:name] %>Options" <%end%>

           <%= f[:c_prop_config] %>
           />
        </el-form-item>
          </el-col>
<%end%>
          <el-col :span="24">
        <el-form-item>
          <el-button @click="submit">提交</el-button>
          <el-button @click='back'>返回</el-button>
        </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { get<%=titleize(@brick[:name])%>, put<%=titleize(@brick[:name])%> } from '@/api/<%= @brick[:name]%>';

import request from '../../utils/request'

export default {
  components: {
  },
  data() {
    return {
    <%= @brick[:name]%>EditForm: {},
  //  apiList
  <% @brick.dfields.order('sort').each do |f|%>
    <% if f[:api] %>
  <%= f[:name] %>Options:[],
  <%end%> <%end%>
    //  rules
    rules: {<% @brick.dfields.each do |f|%><%= f[:name] %>:[<% if f[:is_required] %>
      {required:true,
        message:'请输入<%= f[:cnname] %>',
        trigger:'blur'},<%end%>
      <% if f[:regx] %>
    <%= f[:regx] %>
    <%end%>],
    <%end%>}
        }
  },
  created() {
    this.get()
  //    getApiList
  <% @brick.dfields.order('sort').each do |f|%>
  <% if f[:api] %>
    this.get<%= f[:name] %>List()
  <%end%> <%end%>

  },
  mounted() {},
  methods: {
    async get() {
      const res = await get<%=titleize(@brick[:name])%>(this.$route.query.id);
      this.<%= @brick[:name]%>EditForm = res.data;
    },
//    getApiList
<% @brick.dfields.order('sort').each do |f|%><% if f[:api] %>
          async get<%= f[:name] %>List(){
                const res = await request({url:'<%= f[:api] %>',method:'get'})
                this.<%= f[:name] %>Options = res.data
          },<%end%>
<%end%>

    async api() {
      const res = await put<%=titleize(@brick[:name])%>(this.<%= @brick[:name]%>EditForm.id,this.<%= @brick[:name]%>EditForm);
      if(res.code === '200') {
        this.$message({
          message: '修改成功',
          type: 'success'
        });
      this.$router.push({ path: '<%= @brick[:parent_dir] %>/<%= @brick[:name_plural]%>' });
      }
    },
    async submit() {
      this.$refs.<%= @brick[:name]%>EditForm.validate(valid => {
        if (valid) {
          this.api();
        } else {
          return false;
        }
      });
    },
    back() {
      history.back()
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
