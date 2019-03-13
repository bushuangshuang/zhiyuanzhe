<template>
  <div>
      <Tabs type="card">
          <TabPane label="合格">
            <div class="topBody">
              <Form :model="health" inline :label-width="80">
                  <FormItem label="项目名称" class="mleft">
                      <Select style="width:150px;margin-bottom:20px;" v-model="companyName">
                          <Option v-for="item in hospitalSelect"  v-bind:value="item.label" > {{item.label}}</Option>
                      </Select>
                  </FormItem>
                  <FormItem label="姓名" class="mleft" >
                      <Input  v-model="health.name" type="text" class="search"  style="width:150px;margin-bottom:20px;" ></Input>
                  </FormItem>
                  <FormItem  class="mleft"  >
                    <Button type="primary" @click="search" style="margin-right:10px">查询</Button>
                    <Button  @click="empty" >清空</Button>
                    <Button>导出excel</Button>
                  </FormItem>
                  <FormItem class="mleft" >
                    <Button @click="addBus">添加信息</Button>
                  </FormItem>
              </Form>
            </div>
            <div>
                <Row type="flex" justify="start" class="code-row-bg">
                    <Button type="primary" @click="enter">批量入组</Button>
                    <Button type="primary" @click="blacklist" style="margin-left:20px;margin-right:20px" >批量加入黑名单</Button>
                </Row>
            </div>
                        <div class="tableText">                   
                      <Table :columns="columns" :data="newList" border @on-selection-change='selectionClick' style="margin-top:20px"/>
                      <Page 
                              :total="this.page.totalRow"
                              :current="this.page.pageNumber"
                              :page-size="this.page.pageSize"
                              show-elevator show-sizer show-total
                              placement="top" 
                              @on-change="handleCurrentChange" 
                              @on-page-size-change='handleSizeChange'
                              >
                      </Page>
                  </div>
          </TabPane>
          <TabPane label="不合格">
              <div >
                <Row type="flex" justify="start" class="code-row-bg">
                    <Button type="primary" @click="enter">批量入组</Button>
                    <Button type="primary" @click="blacklist" style="margin-left:20px;margin-right:20px" >批量加入黑名单</Button>
                   
                      <Button>导出excel</Button>     
                </Row>
            </div>
            <!-- <div class="health-btn"> -->
              <Form inline>
                <FormItem label="项目名称" class="mleft">
                      <Select style="width:250px;" v-model="companyName">
                          <Option v-for="item in hospitalSelect"  v-bind:value="item.label" > {{item.label}}</Option>
                      </Select>
                  </FormItem>
                  <FormItem>
                    <Button @click="addBus"  style="margin-left:10px;margin-right:10px;margin-top:50px">添加信息</Button>
                  </FormItem>
              </Form>
            <!-- </div>    -->
              <div class="tableText">                   
                      <Table :columns="columns" :data="newList2" border  @on-selection-change='selectionClick' style="margin-top:20px"/>
                      <Page 
                              :total="this.page.totalRow"
                              :current="this.page.pageNumber"
                              :page-size="this.page.pageSize"
                              show-elevator show-sizer show-total
                              placement="top" 
                              @on-change="handleCurrentChange" 
                              @on-page-size-change='handleSizeChange'
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
          class="edibus-modal"
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
                    <FormItem label="身份证号" prop="idCard">
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
import { volunteeradd, getvolunteername,gethealthList } from "../../../../api/volunteer";
import { upLoadFile ,hospitalSelect,getSelectValueDesc,enterlist,blacklist} from "../../../../api/common";
export default {
  name: "update_table_page",
  data() {
    return {
      companyName:'新疆药品公司',
      // 添加form
      health: {
        name: "",
        companyName:''
      },
      
      // 分页器
      page: {
        page: '',
        size: ''
      },
      // 性别option
      sexList:[],
      // 姓名下拉框
     selectname:[],
      // 医疗机构项目下拉
      hospitalSelect:[],
      handleModal: false,
      modalTitle: "",
      batch: "",
      name: "",
      newList: [],
      newList2: [],
      infoForm: {
        url: "",
        fileName: ""
      },
      companyName: "",
      // sex: "",
      formValidate: {
         sex: '',
        carNumber:'',
        phone: '',
        nation: '',
        height:'',
        weight: '',
        physicalUrl: '',
        fileName:''
      },
      ruleValidate: {
     
        weight: [
          {
            required: true,
            message: "体重不能为空",
            trigger: "blur"
          }
        ],
        carNumber: [
          {
            required: true,
            message: "身份证号不能为空",
            trigger: "blur"
          }
        ],
         sex: [
          {
            required: true,
            message: "性别不能为空",
            trigger: "blur"
          }
        ],
        height:[
           {
            required: true,
            message: "身高不能为空",
            trigger: "blur"
          }
        ],
         phone:[
           {
            required: true,
            message: "手机号不能为空",
            trigger: "blur"
          }
        ],
         jg:[
           {
            required: true,
            message: "籍贯不能为空",
            trigger: "blur"
          }
        ]
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
          width: 70,
          align: "center"
        },
        {
          title: "项目名称",
          key: "projectName",
          align:'center',
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
          title: "体检结果",
          key: "healy",
          align:'center'
        },
        {
          title: "操作",
          key: "action",
          width: 160,
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
                "修改"
              ),
              h(
                "span",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                   style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.remove(params.index);
                    }
                  }
                },

                "删除"
              ),
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

                "打印报告"
              )
            ]);
          }
        }
      ],
      selectIds:[]
    };
  },
    created(){
        this.getList();
        //  this.getSelectValueDesc()
    },
    mounted() {
        this.newList = this.tableData;
        const data = {
            projectId: "1"
        };
        getvolunteername(data).then(res => {
            this.selectname=res.data.data
            console.log("下拉框人员姓名", this.selectname);
        });
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
    },
  //在判断与select下拉框的值对应后，查询到的新的数据数组用push的方法，添加到newlist里面
  methods: {
    getList(){
          const ss = {
                pageNumber:this.page.pageNumber,
                pageSize:this.page.pageSize,
                projectId:'1',
                physicalExaStatusL:'2',
                empName:this.health.name,
              }
            gethealthList(ss).then(res=>{
                this.newList=res.data.page.list
                this.page=res.data.page
                console.log('体检列表的信息',res.data)
            })
            const ss2 = {
            pageNumber:this.page.pageNumber,
            pageSize:this.page.pageSize,
            projectId:'1',
            physicalExaStatusL:'3',
            empName:this.health.name,
        }
        gethealthList(ss2).then(res=>{
            this.newList2=res.data.page.list
            console.log('体检列表的信息不合格',this.newList2)
        })
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
    },
    handleUpload(file) {
      const formData = new FormData();
      formData.append("upfile", file);
      upLoadFile(formData).then(res => {
        if (res.data.code === "200") {
          console.log('imageurl',res.data)
          //this.$Message.success('上传成功');
          this.formValidate.physicalUrl = res.data.map.fileUrl;
          this.infoForm.fileName = res.data.map.originalFileName;
        }
      });
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
    },
    enter(){
      if(this.selectIds.length==0){
        this.$Message.info('请选择数据');
        return;
      }
        this.$Modal.confirm({
          title:'批量入组',
          content:'确定批量入组吗？',
          onOk: () => {
            let data={
                ids:this.selectIds
              }
              enterlist(data).then(res=>{
                if(res.data.code==200){
                  this.$Message.success('批量入组成功');
                  this.selectIds=[];          
                  this.getList();
                  console.log("批量标记",res.data)
                }
                
              })
          }
})      
    },
    blacklist(){
        if(this.selectIds.length==0){
        this.$Message.info('请选择数据');
        return;
      }
        this.$Modal.confirm({
          title:'批量加入黑名单',
          content:'确定批量加入黑名单吗？',
          onOk: () => {
            let data={
                ids:this.selectIds
              }
              blacklist(data).then(res=>{
                if(res.data.code==200){
                  this.$Message.success('成功加入黑名单');
                  this.selectIds=[];          
                  this.getList();
                  // console.log("批量标记",res.data)
                }
                
              })
          }
})      
    },
    empty(){
        this.health.name=''
        this.companyName=''
    },
    addBus(){
       this.handleModal = true;
           this.modalTitle = "新增";
    },
    editBus(item, index) {
      this.handleModal = true;
      this.modalTitle = "修改";
      this.itemIndex = index;
      this.formValidate = JSON.parse(JSON.stringify(item));
    },
    handleSubmit(name) {
      const data = {
        id: "1",
        physicalExaStatus:'2', //体检状态（2合格，3不合格 ）
        sex: this.formValidate.sex, //性别
        idCard: this.formValidate.carNumber, //身份证号
        phone: this.formValidate.phone, //手机号
        nation: this.formValidate.jg, //民族
        height:this.formValidate.height, //身高
        weight: this.formValidate.weight, //体重
        physicalUrl: this.formValidate.physicalUrl //体检单Url
      };
      volunteeradd(data).then(res => {
        console.log("添加成功", res.data);
      });
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
      this.newList.splice(index, 1);
    },
    selectionClick(arr){
        this.selectIds=[];
        for (var i=0;i<arr.length;i++){
            this.selectIds.push(parseInt(arr[i].id));
        }
        console.log('选中数组数据是：'+JSON.stringify(this.selectIds));
    },
  },


};
</script>

 

<style scoped>
.healthy{
  width: 100%;
  display: flex;
}
.health-btn{
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.addobject-name{
  width: 150px;
  border-radius: 5px;
  text-indent: 8px;
  border: 1px solid #ccc;
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
.edibus-modal{
  width:600px !important;
}
</style>

