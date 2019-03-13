<template>
  <div id="role">
      <div style="min-height: 200px;">
        <!-- 搜索 -->
        <Form inline :model="query" label-position="right" :label-width="80" class="query-form">
          <FormItem label="角色名称">
            <Input v-model="query.name" placeholder="请输入角色名称" style="width:200px;margin-right: 10px;"></Input>
          </FormItem>
          <FormItem label="描述" :label-width="70">
            <Input v-model="query.des" placeholder="请输入描述" style="width:200px;"></Input>
          </FormItem>
          <FormItem :label-width="50">
            <Button  type="primary" @click="handleSearch">查询</Button>
          </FormItem>
          <FormItem :label-width="30">
            <Button  type="primary" style="float:right;margin-left:10px" @click="handleAdd()">新建</Button>
          </FormItem>
        </Form>
        <!-- 数据表格 -->
        <Table border  ref="selection" :columns="columns7" @on-select="handleRowChange" :data="tableData"></Table>
        <!-- 分页组件 -->
        <div class="center">
          <Page :total="this.page.total" :current="this.page.page" :page-size="this.page.size" show-elevator show-sizer show-total
                placement="top" @on-change="handleCurrentChange" @on-page-size-change='handleSizeChange'></Page>
        </div>
        <Modal :title="isAdd?'新建':'编辑'" v-model="addEditDialogVisible" width="800px" :on-cancel="cancelDialog('infoForm')">
          <Form ref="infoForm" :model="infoForm" :rules="rules" :label-width="120">
            <FormItem prop="name" label="名称">
              <Input v-model="infoForm.name" />
            </FormItem>
            <FormItem prop="des" label="描述">
              <Input v-model="infoForm.des" />
            </FormItem>
            <FormItem prop="seq" label="排序">
              <Input v-model="infoForm.seq" />
            </FormItem>
            <FormItem prop="status" label="状态">
              <Select v-model="infoForm.status" placeholder="请选择状态">
                <Option v-for="item in statusOption" :key="item.value" :label="item.label" :value="item.value">
                </Option>
              </Select>
            </FormItem>
            <FormItem prop="menus" label="权限">
              <Tree :data="menus" show-checkbox expand-on-click-node ref="tree" :props="defaultProps">
              </Tree>
            </FormItem>
          </Form>
          <span slot="footer" class="dialog-footer">
        <Button type="text" style="margin:10px 0 10px 10px; color: #999; font-size: 14px" @click="addEditDialogVisible = false">关闭</Button>
        <Button type="text" style="margin:10px 0 10px 0; color: #19be6b; font-size: 14px" v-if="isEdit" @click="handleSubmitUpdate">提交</Button>
        <Button type="text" style="margin:10px 10px 10px 0; color: #1B8BEE; font-size: 14px" v-else @click="handleSubmitSave">确定</Button>
      </span>
        </Modal>
      </div>
  </div>
</template>

<script>
  import { getSelectValueDesc } from '../../../api/common.js'
  import { roleList,roleSave,roleMenuTree,roleUpdate,roleRemove,roleExportFile,roleGetMenuList } from '../../../api/role.js'
  export default {
    data() {
      return {
        query: {
          name: "",
          des: "",
          status: ""
        },
        loading: false,
        addEditDialogVisible: false,
        isEdit: false,
        isAdd:false,
        menus: [],
        cacheMenus: [],
        infoForm: {
          id: "",
          name: "",
          des: "",
          seq: "",
          status: "",
          menus: ''
        },
        page:{
          page: 1,
          size: 10,
        },
        defaultProps: {
          children: "children",
          label: "label"
        },
        page: {
          pageNumber: 1,
          pageSize: 10,
          total: 0
        },
        tableData: [],
        rules: {
          name: [{
            required: true,
            message: '此项必填',
            trigger: "blur"
          }],
          des: [{
            required: true,
            message: '此项必填',
            trigger: "blur"
          }],
          seq: [{
            required: true,
            message: '此项必填',
            trigger: "blur"
          }],
          status: [{
            required: true,
            message: '此项必填',
            trigger: "blur"
          }],
          menus: [{
            required: true,
            message:'此项必填'
          }]
        },
        statusOption: [],
        columns7: [{
        type: 'index',
        width: 60,
        align: 'center'
      },
      {title: '名称',
        key: 'name'},
      {title: '描述',
        key: 'des'},
      {title: '排序',
        key: 'seq', maxWidth:80},
      /*{title: '类型', key: 'type'},*/
      {title: '最后更新人', key: 'lastUpdAcct',
      },
      {title: '最后更新时间', key: 'lastUpdTime',
        render: function (h, params) {
          return h('div',
            new Date(params.row.lastUpdTime.replace(/-/g, '\/')).Format('yyyy-MM-dd'));
        }
      },
      {title: '状态', key: 'status',maxWidth:80,
        render: (h, params) => {
        return h('div',
          this.getStatus(params.row.status)
        )
      }},
      {title: '操作',
        key: 'action',
        render: (h, params) => {
          return ('div', [
            h('Button', {
              props: {
                type: 'text',
                size: 'small'
              },
              style: {
                color: '#19be6b',
                fontSize: '12px'
              },
              on: {
                click: () => {
                  this.handleEdit(params.index, params.row)
                }
              }
            }, '编辑'),
            h('Button', {
              props: {
                type: 'text',
                size: 'small'
              },
              style: {
                color: '#ed4014',
                fontSize: '12px'
              },
              on: {
                click: () => {
                  this.handleRemove(params.index, params.row)
                }
              }
            },'删除')
          ])
        }
      }]
      };
    },
    created() {
      this.initFormatter()
    },
    mounted() {
      this.getList()
      this.getMenus()
    },
    watch: {},
    methods: {
      initFormatter(){
      Date.prototype.Format = function(fmt) { //
        let o = {
          "M+" : this.getMonth()+1,                 //月份
          "d+" : this.getDate(),                    //日
          "h+" : this.getHours(),                   //小时
          "m+" : this.getMinutes(),                 //分
          "s+" : this.getSeconds(),                 //秒
          "q+" : Math.floor((this.getMonth()+3)/3), //季度
          "S"  : this.getMilliseconds()             //毫秒
        };
        if(/(y+)/.test(fmt))
          fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
        for(var k in o)
          if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        return fmt;
      }
    },
      handleRowChange(selection, row){
        console.log(selection)
      },
      cancelDialog: function(formRule) {},
      handleSizeChange: function(val) {
        this.page.pageSize = val;
        this.getList();
      },
      handleCurrentChange: function(val) {
        this.page.pageNumber = val;
        this.getList();
      },
      handleAdd: function() {
        this.isAdd=true;
        this.isEdit = false;
        this.addEditDialogVisible = true;
        this.infoForm = {
          id: "",
          name: "",
          des: "",
          seq: "",
          status: "",
          menus: []
        }
        this.menus = this.cacheMenus
      },
      handleEdit: function(index, row) {
        console.log('row', row)
        this.isAdd=false;
        this.isEdit = true;
        this.addEditDialogVisible = true;
        this.infoForm = Object.assign({}, row);
        this.menus = row.menus;
        this.infoForm.seq=row.seq.toString();
      },
      handleSearch: function() {
        this.getList();
      },
      getList: function() {
        this.loading = true;
        let params = {
          name: this.query.name,
          des: this.query.des,
          status: this.query.status,
          pageNumber: this.page.pageNumber,
          pageSize: this.page.pageSize
        };
        roleList(params)
          .then(res => {
            console.log(res);
            this.tableData = res.data.page.list;
            this.page.pageNumber = res.data.page.pageNumber;
            this.page.pageSize = res.data.page.pageSize;
            this.page.total = res.data.page.totalRow;
            this.loading = false;
          })
          .catch(error => {
            this.loading = false;
            this.$Message.error(error);
            console.log(error);
          });
        this.getStatusOption();
      },
      getMenus: function() {
          roleMenuTree()
          .then(res => {
            console.log(res)
            this.cacheMenus = res.data.list;
            this.menus = res.data.list;
          })
          .catch(error => {
            this.$Message.error(error);
            console.log(error);
          });
      },
      getStatusOption: function() {
        let params = {
          key: "STATUS_COMMON"
        };
        getSelectValueDesc(params)
          .then(res => {
            this.statusOption = res.data.msg;
          })
          .catch(error => {
          //  this.$Message.error(error);
            console.log(error);
          });
      },
      handleSubmitSave: function() {
        this.infoForm.menus = []
        const checkedMenus = this.$refs.tree.getCheckedNodes()
        checkedMenus.forEach((item, index) => {
          this.infoForm.menus.push(item.id)
        })
        this.$refs.infoForm.validate(valid => {
          if(valid) {
            this.$Modal.confirm({
              title: '提示',
              content:'确认提交吗?',
              onOk: () => {
                let para = Object.assign({}, this.infoForm);
                delete para.id
                roleSave(para).then(res => {
                  this.$Message.success(res.data.msg);
                  this.$refs["infoForm"].resetFields();
                  this.addEditDialogVisible = false;
                  this.getList();
                });
              }
            })
          }
        });
      },
      handleSubmitUpdate: function() {
        this.infoForm.menus = []
        const checkedMenus = this.$refs.tree.getCheckedNodes()
        checkedMenus.forEach((item, index) => {
          this.infoForm.menus.push(item.id)
        })
        this.$refs.infoForm.validate(valid => {
          if(valid) {
            this.$Modal.confirm({
              title: '提示',
              content:'确认提交吗?',
              onOk: () => {
                let para = Object.assign({}, this.infoForm);
                roleUpdate(para).then(res => {
                  this.$Message.success(res.data.msg);
                  this.$refs["infoForm"].resetFields();
                  this.addEditDialogVisible = false;
                  this.getList();
                });
              }
            })
          }
        });
      },
      handleRemove: function(index, row) {
        this.$Modal.warning({
          title: '删除',
          content:'确认删除吗?',
          closable: true,
          onOk: () => {
            let params = {
              id: row.id
            };
            roleRemove(params)
              .then(res => {
                this.$Message.success(res.data.msg);
                this.getList();
              })
              .catch(error => {
                this.$Message.error(error);
              });
          }
        })
      },
      getStatus: function(value) {
        var label = ''
        for(var child of this.statusOption) {
          if(child.value === value) {
            label = child.label;
            break;
          }
        }
        return label;
      }
    }
  };
</script>

<style lang="less">
  #role{
    .ivu-table-tbody{
      .ivu-btn{
        height: 32px;
        line-height: 32px !important;
        padding: 0 10px !important;
        //font-size: 14px !important;
      }
      .ivu-btn > span{
        display: block;
        height: 32px;
        line-height: 32px;
      }
    }
    padding: 20px;
    .ivu-form-item{
      &:nth-of-type(2){
        margin-right: 0;
      }
    }
    .ivu-form .ivu-form-item-label{
      text-align: left;
      padding-top: 12px;
    }
    .ivu-input{
      height: 40px;
    }
    .ivu-btn{
      height: 40px;
      line-height: 40px !important;
      padding: 0 10px !important;
      font-size: 14px;
    }
    .ivu-btn > span{
      display: block;
      height: 40px;
      line-height: 40px;
    }
    .contai{
      padding: 20px;
    }
    .school-item {
      margin-bottom: 1px;
    }
    .rightlay{
      text-align: right;
      margin-bottom: 10px;
      margin-top: 10px;
    }
    .school-name {
      font-weight: 700;
    }
    .lineHight{
      marging: 0 20px;
      border-color: #d1d1d1;
    }
    .lineHight td{
      height:20px;
      padding: 5px 0;
      color:#333;
      border-color: #d1d1d1;
    }
    .jianbian th{
      color:#333;
      padding: 5px 0;
      border-color: #d1d1d1;
      background:linear-gradient(#fcfcfc, #eee);
      /*background:-webkit-gradient(linear, 0 0, 0 bottom, from(#c5c5c5), to(rgba(238, 238, 238, 0.5)));*/
      /*background:-moz-linear-gradient(top, #ff3620, rgba(234, 234, 234, 0.5));*/
      /*background:-o-linear-gradient(top, #ff3620, rgba(234, 234, 234, 0.5));*/
    }
    .query-form{
      font-size: 14px;
      height: 38px;
      margin-top: 30px;
      margin-bottom: 30px;
      /*margin-left: 20px;*/
    }
    .pages{
      margin: 20px  auto;
    }
    .center{
      text-align: center;
    }
    .btn_common{
      cursor: pointer;
      color: #409EFF;
    }
  }
</style>
