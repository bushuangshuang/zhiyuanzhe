<template>
    <div>
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
                    <FormItem label="姓名" class="mleft" >
                        <Input  v-model="health.name" type="text" class="search"  style="width:150px;margin-bottom:20px;" ></Input> 
                    </FormItem>
                </Col>
                 <Col span="6">
                    <!-- <FormItem label="状态" class="mleft" style="margin-right:20px;">
                        <Select style="width:150px;margin-bottom:20px;" v-model="companyName">
                            <Option value="已入组">已入组</Option>
                            <Option value="未入组">未入组</Option>
                        </Select>
                    </FormItem> -->
                </Col>
                 <Col span="6">
                    <FormItem label="项目名称" class="mleft">
                        <Select style="width:150px;margin-bottom:20px;" v-model="companyName">
                            <Option value="健康志愿者">健康志愿者</Option>
                            <!-- <Option value="乐山市公共交通总公司02">乐山市公共交通总公司02</Option> -->
                        </Select>
                    </FormItem>
                </Col>
                 <Col span="4">
                    <FormItem  class="mleft"  >
                       <Button type="primary" @click="search"  style="margin-right:20px">查询</Button>
                       <Button @click="remove">清空</Button>
                       
                    </FormItem>
                </Col>
            </Row>
        </Form>
</div>
 <Tabs type="card">
                        <div class="enter-btn">
                        </div>           
                      <div class="tableText">   
                            <Button  >导出excel</Button>                
                    <Table :columns="columns" :data="newList" border style="margin-top:20px"/>
                     <Page 
                            :total="this.page.total"
                            :current="this.page.page"
                            :page-size="this.page.size"
                            show-elevator show-sizer show-total
                            placement="top" @on-change="handleCurrentChange" @on-page-size-change='handleSizeChange'
                            >
                    </Page>
                </div>
    </Tabs>
    </div>
</template>

<script>
import { getArrayFromFile, getTableDataFromArray } from "@/libs/util";
import { volunteeradd, getvolunteername,gethealthList,volunteerSearch} from "../../../../api/volunteer";
import { upLoadFile ,hospitalSelect,getSelectValueDesc} from "../../../../api/common";
    export default {
        name: "volunteer-search",
          data() {
    return {
      // 添加form
      health:{
        name:''
      },
      getVolunteerType:[],
      getvolunteerList:[],
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
      ruleValidate: {
        name: [
          {
            required: true,
            message: "企业名称不能为空",
            trigger: "blur"
          }
        ],
        carNumber: [
          {
            required: true,
            message: "车牌号码不能为空",
            trigger: "blur"
          }
        ]
      },
      columns: [
        {
          title: "序号",
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "项目名称",
          key: "object"
        },
        {
          title: "姓名",

          key: "name"
        },
        {
          title: "性别",
          key: "sex"
        },
        {
          title: "电话号",
          key: "phone"
        },
        {
          title: "身高",
          key: "height"
        },
        {
          title: "状态",
          key: "status"
        },
        // {
        //   title: "操作",
        //   key: "action",
        //   width: 200,
        //   align: "center",
        //   render: (h, params) => {
        //     return h("div", [
        //       h(
        //         "Button",
        //         {
        //           props: {
        //             type: "primary",

        //             size: "small"
        //           },
        //           style: {
        //             marginRight: "5px"
        //           },
        //           on: {
        //             click: () => {
        //               this.editBus(params.row, params.index);
        //             }
        //           }
        //         },
        //         "修改"
        //       ),
        //       h(
        //         "Button",
        //         {
        //           props: {
        //             type: "error",
        //             size: "small"
        //           },
        //           on: {
        //             click: () => {
        //               this.remove(params.index);
        //             }
        //           }
        //         },

        //         "删除"
        //       )
        //       ,
        //        h(
        //         "Button",

        //         {
        //           props: {
        //             type: "error",

        //             size: "small"
        //           },

        //           on: {
        //             click: () => {
        //               this.remove(params.index);
        //             }
        //           }
        //         },

        //         "打印报告"
        //       )
        //     ]
        //     );

        //   }
        // }
      ],

      // tableData: [
      //   {
      //     name: "乐山市公共交通总公司01",

      //     age: 18,

      //     carNumber: "川L00001",

      //     date: "2016-10-03"
      //   },

      //   {
      //     name: "乐山市公共交通总公司02",

      //     age: 24,

      //     carNumber: "川L00002",

      //     date: "2016-10-01"
      //   }
      // ]
    };
  },

  //在判断与select下拉框的值对应后，查询到的新的数据数组用push的方法，添加到newlist里面

  methods: {
    getvolunteerList(){
      const volunteerSearchList={
          pageNumber:this.page.pageNumber,
          pageSize:this.page.pageSize,
          projectId:'1',
          projectName:'',
          empName:'',
          isDisease:'',
          physicalExaStatus:'2'
      }
      volunteerSearch(volunteerSearchList).then(res=>{
        this.SearchList=res.data.page.list
        console.log('志愿者查询',res.data)

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
    handleUpload (file) {
      const formData = new FormData();
      formData.append('upfile', file);
      upLoadFile(formData).then(res => {
          if (res.data.code === '200') {
       //this.$Message.success('上传成功');
              this.infoForm.url = res.data.map.fileUrl;
              this.infoForm.fileName = res.data.map.originalFileName
          }
      })
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
      var len = this.tableData;

      var arr = [];

      for (var i in len) {
        if (len[i].name == this.companyName) {
          arr.push(len[i]);
        } else if (this.companyName == "") {
          this.newList = this.tableData;

          return;
        }
      }

      this.newList = arr;
    },
  //  点击添加用户
    addBus() {
      const data={
                    id:'1',
                    physicalExaStatus:'2',//体检状态（2合格，3不合格 ）
                    sex:'1', //性别
                    idCard:'610114199805251527', //身份证号
                    phone:'15091868447', //手机号
                    nation:'2', //民族
                    height:'165', //身高
                    weight:'156',  //体重
                    physicalUrl:'www.baidu.com', //体检单Url

      }
      volunteeradd(data).then(res=>{
        console.log('添加成功',res.data)
      })
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
    }
  },

  mounted() {
    this.getvolunteerList()
    this.newList = this.tableData;
    const data={
      projectId:'1'
    }
    getvolunteername(data).then(res=>{
      console.log('下拉框人员姓名',res.data)
    })
    const getVolunteer ={
       "key":'SUBJECT_TYPE'
    }
    getSelectValueDesc(getVolunteer).then(res=>{
      this.getVolunteerType=res.data.msg
        // console.log(res.data,'这是志愿者类型的下拉')
    }) 
  }
  
    }
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