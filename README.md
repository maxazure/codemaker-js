## API路径
http://123.207.179.135:3002/projects
* 显示在首页
name:string 项目名称 cnname:string 中文名 description:string 简介 version:string 版本
* 显示在修改页面
rails_root_path:string Rails根目录 vue_root_path:string VUE根目录 rails_restart_cmd:string Rails服务重启命令行 vue_restart_cmd:string VUE服务重启命令行 

http://123.207.179.135:3002/bricks

name:string 英文名称 name_plural:string 名称复数 cnname:string 中文名称 description:string 简介 parent_dir:string 父目录api_path:string API路径 project_id:integer 

http://123.207.179.135:3002/dfields
name:string 英文名称 cnname:string 中文名称 description:string 简介 field_type:string 字段类型 is_required:boolean 是否必填is_show_in_list:boolean 是否显示在列表 is_editable:boolean 是否可编辑 api:string API数据接口 sort:integer 排序 width:integer 宽度 regx:string 正则 brick_id:integer

http://123.207.179.135:3002/templates
filename:string 文件名 outdir:string 输出目录 body:text 模板内容* tpltype:string 模板类型 remark:text 备注*

http://123.207.179.135:3002/widgets
name:string 控件名称 widget_type:string 控件类型 config:string 配置内容* code:string 代码* remark:string 备注
