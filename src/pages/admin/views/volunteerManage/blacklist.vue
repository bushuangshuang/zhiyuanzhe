<template>
  <div>     
    <Tabs type="card">
            <TabPane label="黑名单">
              <div class="topBody">
                <Form :model="health">
                <Row>
                    <Col span="6">
                        <FormItem label="志愿者类型" class="mleft">
                            <Select style="width:150px;margin-bottom:20px;" v-model="companyName">
                                <Option v-for="item in getVolunteerType"  v-bind:value="item.label" > {{item.label}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                      <Col span="6">
                        <FormItem label="拉黑时间" class="mleft" >
                            <DatePicker type="date" placeholder="请选择拉黑时间" style="width: 150px" v-model="getdate"></DatePicker>
                        </FormItem>
                    </Col>
                           <Col span="6">
                        <FormItem label="姓名" class="mleft" >
                            <Input  v-model="health.name" type="text" class="search"  style="width:150px;margin-bottom:20px;" ></Input> 
                        </FormItem>
                    </Col>
                    <Col span="5">
                        <FormItem  class="mleft"  >
                          <Button type="primary" @click="search"  style="margin-right:20px">查询</Button>
                          <Button @click="empty" style="margin-left:2px;margin-right:2px">清空</Button>                          
                        </FormItem>
                    </Col>
                </Row>
            </Form>
    </div>
                            <div class="enter-btn">
                                <div>
                                    <Row type="flex" justify="start" class="code-row-bg">
                                        <Button type="primary" @click="batchgroup" style="margin-right:20px">批量标记为白名单</Button>
                                        <!-- <Button type="primary" @click="Mass" style="margin-left:20px;margin-right:20px" >批量脱落</Button> -->
                                    </Row>
                                </div>
                                    <!-- <Button>导出excel</Button> -->
                            </div>
                          <div class="tableText">                   
                        <Table :columns="columns" :data="newList" border style="margin-top:20px" @on-selection-change='selectionClick'/>
                        <Page 
                                :total="this.page.total"
                                :current="this.page.page"
                                :page-size="this.page.size"
                                show-elevator show-sizer show-total
                                placement="top" @on-change="handleCurrentChange" @on-page-size-change='handleSizeChange'
                                >
                        </Page>
                    </div>
            </TabPane>
            <TabPane label="白名单"  @click="enter(name)">
               <div class="topBody">
                <Form :model="health">
                <Row>
                    <Col span="6">
                        <FormItem label="项目名称" class="mleft">
                            <Select style="width:150px;margin-bottom:20px;" v-model="companyName">
                                <Option v-for="item in hospitalSelect"  v-bind:value="item.label" > {{item.label}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                      <Col span="6">
                        <FormItem label="姓名" class="mleft" >
                            <Input  v-model="health.name" type="text" class="search"  style="width:150px;margin-bottom:20px;" ></Input> 
                        </FormItem>
                    </Col>
                    <Col span="5">
                        <FormItem  class="mleft"  >
                          <Button type="primary" @click="search"  style="margin-right:20px">查询</Button>
                          <Button @click="empty" style="margin-left:2px;margin-right:2px">清空</Button>                          
                        </FormItem>
                    </Col>
                </Row>
            </Form>
    </div>
                            <div class="enter-btn">
                                <div>
                                    <!-- <Row type="flex" justify="start" class="code-row-bg">
                                        <Button type="primary" @click="batchgroup">批量出组</Button>
                                        <Button type="primary" @click="Mass" style="margin-left:20px;margin-right:20px" >批量脱落</Button>
                                    </Row> -->
                                </div>
                                    <Button>导出excel</Button>
                            </div>
                          <div class="tableText">                   
                        <Table :columns="columns" :data="newList" border style="margin-top:20px" @on-selection-change='selectionClick'/>
                        <Page 
                                :total="this.page.total"
                                :current="this.page.page"
                                :page-size="this.page.size"
                                show-elevator show-sizer show-total
                                placement="top" @on-change="handleCurrentChange" @on-page-size-change='handleSizeChange'
                                >
                        </Page>
                    </div>

            </TabPane>
        </Tabs>
         <Modal
          :title="modalTitle"
          v-model="handleModal"
          :footer-hide="true"
          :mask-closable="false"
          @on-visible-change="handleReset('formValidate')"
          >
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="90" >
            <div class="healthy">
                <div>
                    <FormItem label="项目名称" prop="objectname">
                      <div class="addobject-name">{{companyName}}</div>
                    </FormItem>
                    <FormItem label="性别" prop="sex">
                        <Select style="width:150px;margin-bottom:20px;" v-model="formValidate.sex">
                            <Option v-for="item in sexList"  :value="item.label">{{item.label}}</Option>           
                        </Select>
                    </FormItem>
                    <FormItem label="身份证号" prop="carNumber">
                            <Input v-model="formValidate.carNumber" placeholder="请输入身份证号" ></Input>
                    </FormItem>
                    <FormItem label="身高" prop="height">
                            <Input v-model="formValidate.height" placeholder="请输入身高"></Input>
                    </FormItem>
                          <FormItem label="附件上传" prop="fileName">
                              <Upload 
                                    action="//jsonplaceholder.typicode.com/posts/"
                                    :before-upload="handleUpload"
                                    :show-upload-list="false">
                              <Button icon="ios-cloud-upload-outline">选择附件</Button>
                              </Upload>
                              <div>{{infoForm.fileName}}</div>
                          </FormItem>
            </div>
        <div>
          <FormItem label=姓名 prop="name">
            <Select style="width:150px;margin-bottom:20px;" v-model="name">
                <Option v-for="item in selectname" :value="item.label">{{item.label}}</Option>
              </Select>
          </FormItem>
          <FormItem label="联系方式" prop="phone">
              <Input v-model="formValidate.phone" placeholder="请输入联系方式"></Input>
          </FormItem>
          <FormItem label="籍贯" prop="jg">
              <Input v-model="formValidate.jg" placeholder="请输入籍贯"></Input>
          </FormItem>
          <FormItem label="体重" prop="weight">
              <Input v-model="formValidate.weight" placeholder="请输入身高"></Input>
          </FormItem>
        </div>
        </div>
              <Button type="primary" @click="handleSubmit('formValidate')" style="margin-left:150px;margin-top:40px">提交</Button>
              <Button @click="handleReset('formValidate')" style="margin-left: 8px;margin-top:40px">返回</Button>
        </FormItem>
        </Form>
  </Modal>
    </div>
</template>
<script>
import { getArrayFromFile, getTableDataFromArray } from "@/libs/util";
import { volunteeradd, getvolunteername,gethealthList ,getenterList,getblackList,whiteList} from "../../../../api/volunteer";
import { upLoadFile ,hospitalSelect,getSelectValueDesc,enterlist,blacklist} from "../../../../api/common";
    export default {
  name: "entering-group",
  data() {
    return {
      // companyName:'',
      // 添加form
      health:{
        name:'',
        companyName:''
      },
      getdate:'',
      hospitalSelect:[],
      newList2:[],
      // 分页器
      page: {
        page: 1,
        size: 10
      },
      handleModal: false,
      modalTitle: "",
      batch:'',
      name:'',
      newList: [],
       selectIds:[],
       sexList:[],
       selectname:[],
       getVolunteerType:[],
      infoForm:{
          url:'',
          fileName:''
      },
      companyName: "",
      sex: "",
      formValidate: {
        name: "",
        carNumber: ""
      },
      columns: [
         {
              type: 'selection',
              width: 60,
              align: 'center'
          },
        {
          title: "序号",
          type: "index",
          // width: 60,
          align: "center"
        },
        {
          title: "姓名",
          key: "empName",
          align:'center'
        },
        {
          title: "性别",
          key: "sex",
          align:'center'
        },
        {
          title: "电话号",
          key: "phone",
          align:'center'
        },
        {
          title: "拉黑时间",
          key: "idCard",
          align:'center'
        },
        {
          title: "备注",
          key: "phone",
          align:'center'
        },
        // {
        //   title: "状态",
        //   key: "status",
        //   align:'center'
        // },
        {
          title: "操作",
          key: "action",
          width: 200,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  props: {
                    type: "primary",

                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.editBus(params.row, params.index);
                    }
                  }
                },
                "查看"
              ),
              h(
                "span",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style:{
                    marginRight:'5px'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index);
                    }
                  }
                },

                // "删除"
              )
              ,
               h(
                "span",

                {
                  props: {
                    type: "error",

                    size: "small"
                  },

                  on: {
                    click: () => {
                      this.editBus(params.row, params.index);
                    }
                  }
                },

                // "查看"
              )
            ]);

          }
        }
      ],
      columns2: [
         {
              type: 'selection',
              width: 60,
              align: 'center'
          },
        {
          title: "序号",
          type: "index",
          // width: 60,
          align: "center"
        },
        {
          title: "项目名称",
          key: "projectName",
          align:'center'
        },
        {
          title: "姓名",
          key: "empName",
          align:'center'
        },
        {
          title: "性别",
          key: "sex",
          align:'center'
        },
        {
          title: "身份证号",
          key: "idCard",
          align:'center'
        },
        {
          title: "联系方式",
          key: "phone",
          align:'center'
        },
        {
          title: "状态",
          key: "status",
          align:'center'
        },
        {
          title: "操作",
          key: "action",
          width: 200,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  props: {
                    type: "primary",

                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                    this.editBus(params.row, params.index);
                    }
                  }
                },
                "查看"
              ),
              h(
                "span",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style:{
                    marginRight:'5px'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index);
                    }
                  }
                },

                // "删除"
              )
              ,
               h(
                "span",

                {
                  props: {
                    type: "error",

                    size: "small"
                  },

                  on: {
                    click: () => {
                      this.remove(params.index);
                    }
                  }
                },

                // "打印报告"
              )
            ]);

          }
        }
      ],
    };
  },
  //在判断与select下拉框的值对应后，查询到的新的数据数组用push的方法，添加到newlist里面
  methods: {
    // 获取入组列表
    getList(){
       const enterlist={
                // pageNumber:,
                // pageSize:,
                // projectId:,
                // physicalExaStatus:, //状态（1未体检、2体检合格、3体检不合格、4入组、5出组、6脱落 必填）
                // empName
               pageNumber:this.page.pageNumber,
                pageSize:this.page.pageSize,
                isDisease:'1',  //志愿者类型 1健康 2不健康
                createDate:'2019-12-3', //拉黑时间
                empName:'',
    }
    getblackList(enterlist).then(res=>{
        this.newList=res.data.page.list
        console.log(this.newList,'这是这是黑名单的列表')

    })
    },
    // 批量出组
    batchgroup(){
      if(this.selectIds.length==0){
        this.$Message.info('请选择数据');
        return;
      }
      this.$Modal.confirm({
          title:'批量白名单',
          content:'确定批量为白名单吗？',
          onOk: () => {
            let data={
                ids:this.selectIds
              }
              whiteList(data).then(res=>{
                if(res.data.code==200){
                  this.$Message.success('批量为白名单成功');
                  this.selectIds=[];          
                  this.getList();
                  // console.log("批量标记",res.data)
                }
                
              })
          }
})      
    },
    // 批量脱落
    Mass(){
          if(this.selectIds.length==0){
        this.$Message.info('请选择数据');
        return;
      }
      this.$Modal.confirm({
          title:'批量脱落',
          content:'确定批量脱落吗？',
          onOk: () => {
            let data={
                ids:this.selectIds
              }
              enterlist(data).then(res=>{
                if(res.data.code==200){
                  this.$Message.success('批量脱落成功');
                  this.selectIds=[];          
                  this.getList();
                  // console.log("批量标记",res.data)
                }
                
              })
          }
}) 
    },
    // 修改
      editBus(item, index) {
      this.handleModal = true;
      this.modalTitle = "修改";
      this.itemIndex = index;
      this.formValidate = JSON.parse(JSON.stringify(item));
    },
    empty(){
      this.companyName=""
      this.health.name=""
      // console.log('清空')
    },
     getnameOption: function() {
      let params = {
        key: "STATUS_GENDER"
      };
      getSelectValueDesc(params)
        .then(res => {
          this.statusOption = res.data.msg;
        })
        .catch(error => {
          this.$Message.error(error);
          console.log(error);
        });
       enter () 
    },
  
    handleSizeChange: function(val) {
      this.page.pageSize = val;
      this.getList();
    },
    handleCurrentChange: function(val) {
      this.page.pageNumber = val;
      this.getList();
    },
    search() {
      this.getList()
      // var len = this.tableData;
      // var arr = [];
      // for (var i in len) {
      //   if (len[i].name == this.companyName) {
      //     arr.push(len[i]);
      //   } else if (this.companyName == "") {
      //     this.newList = this.tableData;
      //     return;
      //   }
      // }
      // this.newList = arr;
    },
  //  点击添加用户
    editBus(item, index) {
      this.handleModal = true;
      this.modalTitle = "修改";
      this.itemIndex = index;
      this.formValidate = JSON.parse(JSON.stringify(item));
    },
    selectionClick(arr){
        this.selectIds=[];
        for (var i=0;i<arr.length;i++){
            this.selectIds.push(parseInt(arr[i].id));
        }
        console.log('选中数组数据是：'+JSON.stringify(this.selectIds));
    },
    handleSubmit(name) {
      var self = this;
      self.$refs[name].validate(valid => {
        if (valid) {
          var params = JSON.parse(JSON.stringify(self.formValidate));

          if (self.modalTitle === "新增") {
            // 获取需要渲染到页面中的数据

            self.$Message.success("新增成功!");

            self.newList.push(params);
          } else {
            // 获取需要渲染到页面中的数据

            this.$set(self.newList, self.itemIndex, params);

            self.$Message.success("修改成功!");
          }

          self.handleModal = false;
        } else {
          if (self.modalTitle === "新增") {
            self.$Message.error("新增失败!");
          } else {
            self.$Message.error("修改失败!");
          }
        }
      });
    },
    
    handleReset(name) {
      this.$refs[name].resetFields();
    },

    //删除用户时，通过splice(index, 1)，可以删除index位置的数据，页面上的数据自动就会更新

    remove(index) {
      // this.newList.splice(index, 1);
    }
  },
  mounted() {

    // 脱落
    //        const blacklist={
    //             // pageNumber:,
    //             // pageSize:,
    //             // projectId:,
    //             // physicalExaStatus:, //状态（1未体检、2体检合格、3体检不合格、4入组、5出组、6脱落 必填）
    //             // empName
    //              pageNumber:this.page.pageNumber,
    //             pageSize:this.page.pageSize,
    //             isDisease:'1',  //志愿者类型 1健康 2不健康
    //             createDate:'2019-2-5', //拉黑时间
    //             empName:'',
    // }
    const blacklist2={
      "key":'SUBJECT_TYPE'
   
    }
    blacklist(blacklist2).then(res=>{
            this.newList2=res.data
          //  console.log(this.newList2,'这是志愿者类型的下拉')
    })
    const getVolunteer ={
       "key":'SUBJECT_TYPE'
    }
    getSelectValueDesc(getVolunteer).then(res=>{
      this.getVolunteerType=res.data.msg
        // console.log(res.data,'这是志愿者类型的下拉')
    }) 
    // getblackList(blacklist).then(res=>{
    //     this.newList2=res.data
    //     console.log(this.newList2,'这是志愿者类型的下拉')

    // })
    this.getList()
    this.newList = this.tableData;
    const data={
      projectId:'1'
    }
    getvolunteername(data).then(res=>{
      console.log('下拉框人员姓名',res.data)
    })
    hospitalSelect(data).then(res=>{
            this.hospitalSelect=res.data.data
            console.log('医疗机构的下拉框项目',this.hospitalSelect)
        });
         // 获取性别下拉框
        const sex={
            "key": 'STATUS_GENDER'
        }
        getSelectValueDesc(sex).then(res=>{
            this.sexList=res.data.msg
            // console.log('性别', res.data)
        })
        // 获取姓名下拉框
         getvolunteername(data).then(res => {
            this.selectname=res.data.data
            console.log("下拉框人员姓名", this.selectname);
        });
  }

  

};
</script>

<style scoped>
    .healthy {
  width: 100%;
  display: flex;
}
.enter-btn{
    display: flex;
    justify-content: flex-end;
}
.handle-box {
  text-align: right;

  margin-bottom: 10px;
}

.topBody {
  width: 100%;

  background-color: #ffffff;

  padding-top: 30px;
}

.tableText {
  width: 100%;
}

.mleft {
  margin-left: 5px;
}

.search-btn {
  float: right;

  margin-right: 10px;
}

.input-label {
  display: inline-block;

  /* line-height: 16px; */

  margin-right: 15px;

  font-size: 16px;
}

.search {
  width: 230px;
}
</style>