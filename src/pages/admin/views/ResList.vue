<template>
<div  id="contai">
    <div style="min-height:200px;">
<!-- 搜索 -->
    <Form inline :model="query" label-position="right"  class="query-form">
      <FormItem label="名称" :label-width="80">
        <Input  v-model="query.name" placeholder="请输入名称" style="width:200px;margin:4px 10px 0 0" />
      </FormItem>
      <FormItem label="url" :label-width="70">
        <Input  v-model="query.url" placeholder="url" style="width:200px;margin-top:4px" />
      </FormItem>
      <FormItem :label-width="50">
        <Button  type="primary" @click="handleSearch" style="margin-right: 10px;">查询</Button>
        <Button  type="primary" @click="handleAdd">添加</Button>
      </FormItem>
</Form>
    <Form class="mt20">
    <FormItem label="添加/编辑">
      <span class="ssss">{{pname}}</span>
      <Button type="text" @click="handleReturn" style="margin-top: -3px">返回上级</Button>
    </FormItem>
</Form>
<!-- 数据表格 -->
    <Table border  ref="selection" :columns="dataColumns" @on-select="handleRowChange" :data="tableData"></Table>
<!-- 分页组件 -->
    <div class="center">
  <Page :total="this.page.total" :current="this.page.page" :page-size="this.page.size" show-elevator show-sizer show-total
    placement="top" @on-change="handleCurrentChange" @on-page-size-change='handleSizeChange'></Page>
</div>
    <Modal title="查看" v-model="infoDialogVisible" width="800px" >
 <Form :label-width="120">
  <FormItem class="school-item" label="资源父级名称">
    <span class="school-name">{{pname}}</span>
  </FormItem>
  <FormItem class="school-item" label="名称">
    <span class="school-name">{{infoForm.name}}</span>
  </FormItem>
  <FormItem class="school-item" label="Url：">
    <span>{{infoForm.url}}</span>
  </FormItem>
  <FormItem class="school-item" label="排序">
    <span>{{infoForm.seq}}</span>
  </FormItem>
  <FormItem class="school-item" label="类型">
    <span >{{getType(infoForm.type)}}</span>
  </FormItem>
  <FormItem class="school-item" label="最后更新人">
    <span>{{infoForm.lastUpdAcct}}</span>
  </FormItem>
  <FormItem class="school-item" label="最后更新时间">
    <span>{{infoForm.lastUpdTime}}</span>
  </FormItem>
  <FormItem>
    <Button style=" color: #ed4014; font-size: 14px" type="text" v-if="infoForm.status==='1'" @click="handleStop">停用</Button>
    <Button style=" color: #1B8BEE; font-size: 14px" type="text" v-else  @click="handleEnable">启用</Button>
  </FormItem>
</Form>
  <span slot="footer" class="dialog-footer">
    <Button type="text" style=" color: #999; font-size: 14px" @click="infoDialogVisible = false">关闭</Button>
  </span>
</Modal>
    <Modal title="新增/编辑" v-model="addEditDialogVisible" width="800px" >
 <Form ref="infoForm" :model="infoForm" :rules="rules" :label-width="120">
  <FormItem label="资源父级名称">
    <Input v-model="pname" :disabled="true" />
  </FormItem>
  <FormItem prop="name" label="名称">
    <Input v-model="infoForm.name" />
  </FormItem>
  <FormItem prop="url" label="Url">
    <Input v-model="infoForm.url" />
  </FormItem>
  <FormItem prop="des" label="描述">
    <Input v-model="infoForm.des" />
  </FormItem>
  <FormItem prop="seq" label="排序">
    <Input v-model="infoForm.seq" />
  </FormItem>
  <FormItem prop="type" label="类型">
     <Select v-model="infoForm.type" placeholder="请选择类型">
      <Option
        v-for="item in typeOption"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </Option>
    </Select>
  </FormItem>
  <FormItem prop="status" label="状态">
     <Select v-model="infoForm.status" placeholder="请选择状态">
      <Option
        v-for="item in statusOption"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </Option>
    </Select>
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
import { resList,resSave,resEnable,resUpdate,resRemove,resStop } from '../../../api/res.js'
export default {
  data() {
    return {
      query: {
        name: "",
        url: ""
      },
      pid: 0,
      pname: "ROOT",
      bid: 0,
      infoDialogVisible: false,
      addEditDialogVisible: false,
      isEdit: false,
      page: {
        pageNumber: 1,
        pageSize: 10,
        total: 0
      },
      infoForm: {},
      rules: {
        name: [{ required: true, message: '此项必填', trigger: "blur" }],
        url: [{ required: true, message: '此项必填', trigger: "blur" }],
        des: [{ required: true, message: '此项必填', trigger: "blur" }],
        seq: [{ required: true, message: '此项必填', trigger: "blur" }],
        type: [{ required: true, message: '此项必填', trigger: "change" }],
        status: [{ required: true, message:'此项必填', trigger: "change" }]
      },
      tableData: [],
      statusOption: [],
      typeOption: [],
      dataColumns: [{
        type: 'index',
        width: 60,
        align: 'center'
      }, {
        title: '名称',
        key: 'name',
        render:(h, params) => {
          return h('div', [
            h('span', {
              style: {
                color: '#2d8cf0'
              },
              on: {
                click: () => {
                  this.handleInter(params.index, params.row)
                }
              }
            }),
            h('strong', params.row.name)
          ])
        },
      },
      {title: '描述', key: 'des',
      },
      {title: '排序', key: 'seq', maxWidth: 80,
      },
      {title: '最后更新人', key: 'lastUpdAcct',
      },
      {title: '最后更新时间', key: 'lastUpdTime',
        sortable: true,
        render: function (h, params) {
          return h('div',
            new Date(params.row.lastUpdTime.replace(/-/g, '\/')).Format('yyyy-MM-dd'));
        }
      },
      {title: '状态',
        key: 'statusStr', maxWidth: 80},
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
                color: '#2d8cf0',
                fontSize: '12px'
              },
              on: {
                click: () => {
                  this.handleRead(params.index, params.row)
                }
              }
            }, '查看'),
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
            },'编辑'),
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
    this.getList();
  },
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
    handleSizeChange: function(val) {
      this.page.pageSize = val;
      this.getList();
    },
    handleCurrentChange: function(val) {
      this.page.pageNumber = val;
      this.getList();
    },
    handleRead: function(index, row) {
      this.infoDialogVisible = true;
      this.infoForm = Object.assign({}, row);
      this.infoForm.pid = this.pid;
    },
    handleAdd: function() {
      this.isEdit = false;
      this.addEditDialogVisible = true;
      this.infoForm = Object.assign({}, null);
      this.infoForm.pid = this.pid;
    },
    handleEdit: function(index, row) {
      this.isEdit = true;
      this.addEditDialogVisible = true;
      this.infoForm = Object.assign({}, row);
      console.log('infoForm==='+JSON.stringify(this.infoForm));
      this.infoForm.pid = this.pid;
      this.infoForm.seq = row.seq.toString();
    },
    handleSearch: function() {
      this.getList();
    },
    handleSubmitSave: function() {
      this.$refs.infoForm.validate(valid => {
        if (valid) {
          this.$Modal.confirm({
            title: '提示',
            content: `<p>确定提交吗？</p>`,
            onOk: () => {
              let para = Object.assign({}, this.infoForm);
              resSave(para).then(res => {
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
      this.$refs.infoForm.validate(valid => {
        if (valid) {
          this.$Modal.confirm({
            title: '提示',
            content:`<p>确定提交吗？</p>`,
            onOk: () => {
              let para = Object.assign({}, this.infoForm);
                resUpdate(para).then(res => {
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
        content: '确定删除吗？',
        closable: true,
        onOk: () => {
          let params = {
            id: row.id
          };
          resRemove(params)
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
    handleStop: function(index, row) {
      this.$Modal.confirm({
        title:'提示',
        content:'确认停用吗?',
        onOk: () => {
          let params = {
            id: this.infoForm.id
          };
          resStop(params)
            .then(res => {
              this.infoDialogVisible = false;
              this.getList();
              this.$Message.success(res.data.msg);
            })
            .catch(error => {
              this.$Message.error(error);
            });
        }
      })
    },
    handleEnable: function(index, row) {
      this.$Modal.confirm({
        title:'提示',
        content:'确认启用吗?',
        onOk: () => {
          let params = {
            id: this.infoForm.id
          };
          resEnable(params)
            .then(res => {
              this.infoDialogVisible = false;
              this.getList();
              this.$Message.success(res.data.msg);
            })
            .catch(error => {
              this.$Message.error(error);
            });
        }
      })
    },
    handleTeacherList: function() {
      const schoolId = this.infoForm.id;
      this.$router.push({ path: "teacher", query: { shcoolId: schoolId } }); // -> /user/123
    },
    handleStudentList: function() {
      const schoolId = this.infoForm.id;
      this.$router.push({ path: "student", query: { shcoolId: schoolId } }); // -> /user/123
    },
    handleParentList: function() {
      const schoolId = this.infoForm.id;
      this.$router.push({ path: "parent", query: { shcoolId: schoolId } }); // -> /user/123
    },
    getTypeOption: function() {
      let params = {
        key: "TYPE_RES4S"
      };
      getSelectValueDesc(params)
        .then(res => {
          this.typeOption = res.data.msg;
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
          this.$Message.error(error);
          console.log(error);
        });
    },
    getList: function() {
      this.getStatusOption();
      let params = {
        name: this.query.name,
        url: this.query.url,
        pid: this.pid,
        pageNumber: this.page.pageNumber,
        pageSize: this.page.pageSize
      };
      resList(params)
        .then(res => {
          this.tableData = res.data.msg.page.list;
          for (let i=0;i<this.tableData.length;i++){
            let arri=this.tableData[i];
            for(let j=0;j<this.statusOption.length;j++){
              let arrV=this.statusOption[j];
              if(arri.status===arrV.value){
                this.tableData[i]['statusStr']=arrV.label;
              }
            }
          }
          this.pid = res.data.msg.pid;
          this.pname = res.data.msg.pname;
          this.bid = res.data.msg.bid;
          this.page.pageNumber = res.data.msg.page.pageNumber;
          this.page.pageSize = res.data.msg.page.pageSize;
          this.page.total = res.data.msg.page.totalRow;
        })
        .catch(error => {
          this.$Message.error(error);
        });
      this.getTypeOption();
    },
    handleInter: function(index, row) {
      let params = {
        name: this.query.name,
        url: this.query.url,
        pid: row.id,
        pageNumber: this.page.pageNumber,
        pageSize: this.page.pageSize
      };
      console.log('params=='+JSON.stringify(params));
      resList(params)
        .then(res => {
          this.tableData = res.data.msg.page.list;
          this.pid = res.data.msg.pid;
          this.pname = res.data.msg.pname;
          this.bid = res.data.msg.bid;
          this.page.pageNumber = res.data.msg.page.pageNumber;
          this.page.pageSize = res.data.msg.page.pageSize;
          this.page.total = res.data.msg.page.totalRow;
        })
        .catch(error => {
          this.$Message.error(error);
          console.log(error);
        });
    },
    handleReturn: function() {
      let params = {
        name: this.query.name,
        url: this.query.url,
        pid: this.bid,
        pageNumber: this.page.pageNumber,
        pageSize: this.page.pageSize
      };
      resList(params)
        .then(res => {
          this.tableData = res.data.msg.page.list;
          this.pid = res.data.msg.pid;
          this.pname = res.data.msg.pname;
          this.bid = res.data.msg.bid;
          this.page.pageNumber = res.data.msg.page.pageNumber;
          this.page.pageSize = res.data.msg.page.pageSize;
          this.page.total = res.data.msg.page.totalRow;
        })
        .catch(error => {
          this.$Message.error(error);
          console.log(error);
        });
    },
    getType: function(value) {
      var label = '';
      for (var child of this.typeOption) {
        if (child.value === value) {
          label = child.label;
          break;
        }
      }
      return label;
    },
    getStatus: function(value) {
      var label = '';
      for (var child of this.statusOption) {
        if (child.value === value) {
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
  #contai {
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
    .ivu-form-item{
      &:nth-of-type(2){
        margin-right: 0;
      }
    }
    .ssss{
      display: inline-block;
      height: 43px;
      line-height: 43px;
    }
    .ivu-form .ivu-form-item-label{
      text-align: left;
      padding: 12px 10px 10px 0;
      margin-top: 3px;
    }
    .ivu-input{
      height: 40px;
      line-height: 40px;
    }
    .ivu-btn{
      height: 40px;
      line-height: 40px !important;
      padding: 0 10px !important;
      font-size: 14px;
      margin-top: 2px;
    }
    .ivu-btn > span{
      display: block;
      height: 40px;
      line-height: 40px;
    }
    .ml50{
      margin-left: 50px !important;
    }
    /*padding: 20px*/
    .query-form {
      margin-top: 30px;
    }
    .mt20{
      margin-top: 20px;
    }
    .school-item {
      margin-bottom: 1px;
    }
    .school-name {
      font-weight: 700;
    }
    .lineHight {
      marging: 0 20px;
      border-color: #d1d1d1;
    }
    .lineHight td {
      height: 20px;
      padding: 5px 0;
      color: #333;
      border-color: #d1d1d1;
    }
    .jianbian th {
      color: #333;
      padding: 5px 0;
      border-color: #d1d1d1;
      background: linear-gradient(#fcfcfc, #eee);
    }
    .pages {
      margin: 20px auto;
    }
    .center {
      text-align: center;
      margin-top: 20px;
    }
    .btn_common {
      cursor: pointer;
      color: #409EFF;
    }
  }
</style>
