<template>
  <div>
    <div style="min-height:200px;">
      <Form inline :model="query" label-position="right" :label-width="0" class="query-form">
        <FormItem label="">
          <Input v-model="query.projectName" placeholder="请输入项目名称" style="width:200px;margin-right: 10px;"></Input>
        </FormItem>
        <FormItem label="" :label-width="0">
          <Input v-model="query.mechanism" placeholder="请输入机构名称" style="width:200px;"></Input>
        </FormItem>
        <FormItem label="" :label-width="0">
          <Input v-model="query.money" placeholder="请输入补偿金额" style="width:200px;"></Input>
        </FormItem>
        <FormItem :label-width="50">
          <Button  type="primary" @click="handleSearchSBF">查询</Button>
        </FormItem>
        <FormItem :label-width="30">
          <Button  type="primary" style="float:right;margin-left:10px" @click="handleAddSBF">新建</Button>
        </FormItem>
      </Form>
      <Table border  ref="selection" :columns="tableColumns" :data="tableData"></Table>
      <div class="center" style="margin-top: 20px;">
        <Page :total="this.page.total" :current="this.page.page" :page-size="this.page.size" show-elevator show-sizer show-total
              placement="top" @on-change="handleCurrentChange" @on-page-size-change='handleSizeChange'></Page>
      </div>
      <Modal :title="isAdd?'新建':'编辑'" v-model="addEdit" width="800px" :on-cancel="cancelDialog('infoForm')">
        <Form ref="infoForm" :model="infoForm" :rules="rules" :label-width="120" inline style="padding-right:26px;">
          <FormItem prop="projectName" label="项目名称">
            <Input v-model="infoForm.projectName" placeholder="请输入项目名称" style="width:240px" />
          </FormItem>
          <FormItem prop="requireMajor" label="适应专业" style="float:right">
            <Input v-model="infoForm.requireMajor" placeholder="请输入适应专业" style="width:240px;" />
          </FormItem>
          <FormItem prop="applicationMedicine" label="药物适应症">
            <Input v-model="infoForm.applicationMedicine" placeholder="请输入药物适应症" style="width:240px" />
          </FormItem>
          <FormItem prop="medicineName" label="药物名称" style="float:right">
            <Input v-model="infoForm.medicineName" placeholder="请输入药物名称" style="width:240px;" />
          </FormItem>
          <FormItem prop="recruitNumber" label="招募人数">
            <Input v-model="infoForm.recruitNumber" placeholder="请输入招募人数" style="width:240px" />
          </FormItem>
          <FormItem prop="testType" label="受试者类型" style="float:right">
            <Select v-model="infoForm.testType" placeholder="请选择受试者类型" style="width:240px">
              <Option v-for="item in testTypeOption" :key="item.value" :label="item.label" :value="item.value">
              </Option>
            </Select>
          </FormItem>
          <FormItem prop="projectStage" label="项目分期">
            <Select v-model="infoForm.projectStage" placeholder="请选择项目分期" style="width:240px">
              <Option v-for="item in projectStageOption" :key="item.value" :label="item.label" :value="item.value">
              </Option>
            </Select>
          </FormItem>
          <FormItem label="试验起止日期" style="float:right">
            <Row>
              <Col span="11">
              <DatePicker type="date" placeholder="试验起始日期" v-model="infoForm.startTime" style="width:110px;"></DatePicker>
              </Col>
              <Col span="2" style="text-align:center;padding-left:5px;padding-right:5px;">至</Col>
              <Col span="11">
              <DatePicker type="date" placeholder="试验终止日期" v-model="infoForm.endTime" style="width:110px;"></DatePicker>
              </Col>
            </Row>
          </FormItem>
          <FormItem label="报名截止日期" >
            <DatePicker v-model="infoForm.applyEndTime" type="date" placeholder="报名截止日期" style="width: 240px"></DatePicker>
          </FormItem>
          <FormItem prop="maritalStatus" label="婚姻状况" style="float:right">
            <Select v-model="infoForm.maritalStatus" placeholder="请选择婚姻状况" style="width:240px">
              <Option v-for="item in marriageOption" :key="item.value" :label="item.label" :value="item.value">
              </Option>
            </Select>
          </FormItem>
          <FormItem prop="requireSex" label="性别要求" >
            <Select v-model="infoForm.requireSex" placeholder="请选择性别要求" style="width:240px">
              <Option v-for="item in sexOption" :key="item.value" :label="item.label" :value="item.value">
              </Option>
            </Select>
          </FormItem>
          <FormItem prop="requireAge" label="年龄要求" style="float:right">
            <Input v-model="infoForm.requireAge" placeholder="请输入年龄要求" style="width:240px" />
          </FormItem>
          <FormItem prop="compensationMoney" label="补偿金">
            <Input v-model="infoForm.compensationMoney" placeholder="请输入补偿金" style="width:240px" />
          </FormItem>
          <FormItem prop="linkMan" label="联系人"  style="float:right">
            <Input v-model="infoForm.linkMan" placeholder="请输入联系人" style="width:240px" />
          </FormItem>
          <FormItem prop="phone" label="联系电话">
            <Input v-model="infoForm.phone" placeholder="请输入联系电话" style="width:240px" />
          </FormItem>
          <FormItem prop="actuator" label="执行机构" style="float:right">
            <Input v-model="infoForm.actuator" placeholder="请输入执行机构" style="width:240px" />
          </FormItem>
          <FormItem label="附件上传" prop="fileName" >
            <Upload action="//jsonplaceholder.typicode.com/posts/"
                    :before-upload="handleUpload"
                    :show-upload-list="false" >
              <Button icon="ios-cloud-upload-outline">选择附件</Button>
            </Upload>
            <div  @click="toShowAttachment(infoForm.url)">{{infoForm.fileName}}</div>
          </FormItem>
          <FormItem label="区域">
            <Select v-model="infoForm.province" placeholder="请选择省" style="width:180px" @on-change="selectCity">
              <Option v-for="item in provinceOption" :key="item.value" :label="item.label" :value="item.value">
              </Option>
            </Select>
            <Select v-model="infoForm.city" placeholder="请选择市" style="width:180px" @on-change="selectCounty">
              <Option v-for="item in cityOption" :key="item.value" :label="item.label" :value="item.value">
              </Option>
            </Select>
            <Select v-model="infoForm.county" placeholder="请选择区县" style="width:180px">
              <Option v-for="item in countyOption" :key="item.value" :label="item.label" :value="item.value">
              </Option>
            </Select>
          </FormItem>
          <FormItem label="" :label-width="0" style="float:right;">
            <div @click="resetA">清除区域</div>
          </FormItem>
          <FormItem label="入选标准：" prop="standard">
            <Input v-model="infoForm.standard" type="textarea" :autosize="{minRows: 3,maxRows: 5}" placeholder="请输入入选标准" style="width:610px;"></Input>
          </FormItem>
          <FormItem label="排除标准：" prop="excludeStandard">
            <Input v-model="infoForm.excludeStandard" type="textarea" :autosize="{minRows: 3,maxRows: 5}" placeholder="请输入排除标准" style="width:610px;"></Input>
          </FormItem>
          <FormItem label="项目描述：" prop="projectDescribe">
            <Input v-model="infoForm.projectDescribe" type="textarea" :autosize="{minRows: 3,maxRows: 5}" placeholder="请输入项目描述" style="width:610px;"></Input>
          </FormItem>
        </Form>
        <div slot="footer" style="text-align:center">
          <Button v-if="isAdd" type="primary" class="btn-submit" @click="handleSubmitSave">提交</Button>
          <Button v-if="isAdd==false?true:false" type="primary" class="btn-submit" @click="handleSubmitUpdate">保存</Button>
          <Button v-if="isAdd==false?true:false" type="primary" class="btn-submit btn-cancel" @click="cancelModal">取消</Button>
        </div>
      </Modal>
      <Modal v-model="sendModal" title="发送项目" width="800px" >
        <Form :model="search" label-position="right" :label-width="0" class="query-form" inline>
          <FormItem label="">
            <Select v-model="search.mechanism" placeholder="请选择机构" style="width:200px">
              <Option v-for="item in mechanismOption" :key="item.value" :label="item.label" :value="item.value">
              </Option>
            </Select>
          </FormItem>
          <FormItem>
            <Button  type="primary" style="float:right;margin-left:10px" @click="handleSearch">查询</Button>
          </FormItem>
        </Form>
        <Table border  ref="selection" :columns="columnsH" :data="tableDataH"></Table>
        <div class="center" style="margin-top:20px;">
          <Page :total="this.pageH.total" :current="this.pageH.page" :page-size="this.pageH.size" show-elevator show-sizer show-total
                placement="top" @on-change="handleCurrentChangeH" @on-page-size-change='handleSizeChangeH'></Page>
        </div>
        <div slot="footer" style="text-align:center">
          <Button type="primary" @click="handleSubmitSend">提交</Button>
          <Button type="default" @click="cancelModal2">取消</Button>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
  import { getSelectValueDesc,upLoadFile,findProjectSelect,getSelectAreaPC,getSelectAreaPY,getSelectAreaCY } from '../../../../api/common.js'
  import { listProject,addProject,updateProject,sendProject,hospitalProjectFindById } from '../../../../api/projectManage.js'
  import { serverSrc } from '../../../../api/global.js'
  import { hospitalList } from '../../../../api/hospital.js'
  export default {
    data() {
      return {
        roles:'',
        sexOption:[],
        marriageOption:[],
        testTypeOption:[],
        projectStageOption:[],
        provinceOption:[],
        cityOption:[],
        countyOption:[],
        infoForm: {
            projectName:'',
            requireMajor:'',
            applicationMedicine:'',
            medicineName:'',
            recruitNumber:'',
            testType:'',
            projectStage:'',
            startTime:'',
            endTime:'',
            applyEndTime:'',
            maritalStatus:'',
            requireSex:'',
            requireAge:'',
            compensationMoney:'',
            linkMan:'',
            phone:'',
            actuator:'',
            url:'',
            fileName:'',
            standard:'',
            excludeStandard:'',
            projectDescribe:'',
            province:'',
            city:'',
            county:''
        },
        rules: {
            projectName: [{
                required: true,
                message: '此项必填',
                trigger: "blur"
            }],
            requireMajor: [{
                required: true,
                message: '此项必填',
                trigger: "blur"
            }],
            applicationMedicine: [{
                required: true,
                message: '此项必填',
                trigger: "blur"
            }],
            medicineName: [{
                required: true,
                message: '此项必填',
                trigger: "blur"
            }],
            recruitNumber: [
                {required: true,message: '此项必填',trigger: "blur"},
               /* {type: 'string',pattern:/^(0|\+?[1-9][0-9]*)$/,  message: '请输入数字',trigger: 'change'}*/
            ],
            testType: [{
                required: true,
                message: '此项必填',
                trigger: "blur"
            }],
            projectStage: [{
                required: true,
                message: '此项必填',
                trigger: "blur"
            }],
            startTime: [{
                required: true,
                message: '此项必填',
                trigger: "blur"
            }],
            endTime: [{
                required: true,
                message: '此项必填',
                trigger: "blur"
            }],
            applyEndTime: [{
                required: true,
                message: '此项必填',
                trigger: "blur"
            }],
            maritalStatus: [{
                required: true,
                message: '此项必填',
                trigger: "blur"
            }],
            requireSex: [{
                required: true,
                message: '此项必填',
                trigger: "blur"
            }],
            requireAge: [
                {required: true,message: '此项必填',trigger: "blur"},
                /*{type: 'string',pattern:/^(0|\+?[1-9][0-9]*)$/, message: '请输入数字',trigger: 'change'}*/
            ],
            compensationMoney: [
                {required: true,message: '此项必填',trigger: "blur"},
                /*{type: 'string',  pattern: /^\+?(\d*\.\d{2})$/,message: '请输入正数且保留2位有效小数点',trigger: 'change'}*/
            ],
            linkMan: [{
                required: true,
                message: '此项必填',
                trigger: "blur"
            }],
            phone: [
                {required: true,message: '此项必填',trigger: "blur"},
                {type: 'string',pattern: /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$|^0\d{2,3}-?\d{7,8}$/,message: '请输入有效的电话号码',trigger: 'change'}
            ],
            actuator: [{
                required: true,
                message: '此项必填',
                trigger: "blur"
            }],
            url: [{
                required: true,
                message: '此项必填',
                trigger: "blur"
            }],
            standard: [{
                required: true,
                message: '此项必填',
                trigger: "blur"
            }],
            excludeStandard: [{
                required: true,
                message: '此项必填',
                trigger: "blur"
            }],
            projectDescribe: [{
                required: true,
                message: '此项必填',
                trigger: "blur"
            }],
        },
        addEdit:false,
        isAdd:false,
        query:{
            projectName:'',
            mechanism:'',
            money:'',
        },
        tableColumns: [
            {
                title: '序号',
                type: 'index',
                width: 60,
                align: 'center'
            },
            {
                title: '项目名称',
                align:'center',
                key: 'projectName',
            },
            {
                title: '志愿者类型',
                key: 'testTypeStr',
                align: 'center',
            },
            {
                title: '区域',
                align:'center',
                key: 'areaAddress',
            },
            {
                title: '发布时间',
                align:'center',
                key: 'createDate',
                render: function (h, params) {
                    return h('div',
                        new Date(this.row.createDate.replace(/-/g, '\/')).Format('yyyy-MM-dd'));
                }
            },
            {
                title: '适应症',
                align:'center',
                key: 'applicationMedicine',
            },
            {
                title: '补偿金额（元）',
                align:'center',
                key: 'compensationMoney',
            },
            {
                title: '操作',
                key: 'action',
                width: 120,
                align: 'center',
                render: (h, params) => {
                    return h('div', [
                        h('Button', {
                            props: {
                                type: 'text',
                                size: 'small',
                            },
                            style:{
                                color:'#2d8cf0'
                            },
                            on: {
                                click: () => {
                                    this.showProject(params.row)
                                }
                            },

                        }, '查看'),
                        h('Button', {
                            props: {
                                type: 'text',
                                size: 'small',
                            },
                            style:{
                                color:'#2d8cf0'
                            },
                            on: {
                                click: () => {
                                    this.toSend(params.row)
                                }
                            }
                        }, '发送')
                    ]);
                }
            }
        ],
        tableData:[],
        page:{
            pageNumber: 1,
            pageSize: 10,
            total: 0
        },
        pageH:{
            pageNumber: 1,
            pageSize: 500,
            total: 0
        },
        sendModal:false,
        search:{
            mechanism:''
        },
        mechanismOption:[],
        tableDataH:[],
        selectId:'',
        projectId:'',
        columnsH: [
            {
                title:'请选择',
                width:80,
                align:'center',
                render:(h,params)=>{
                    let id = params.row.id;
                    let defaults = false;
                    if(this.selectId === id){
                        defaults = true;
                    } else {
                        defaults = false;
                    }
                    let self = this;
                    return h("div",[
                        h("Radio",{
                            props:{value:defaults},
                            on:{
                                input:function(){
                                    self.selectId = id;
                                }
                            }
                        })
                    ])
                }
            },
              {
                  title: '序号',
                  type: 'index',
                  width: 70,
                  align: 'center'
              },
              {
                  title: '机构名称',
                  align:'center',
                  key: 'hospitalName',
              },
              {
                  title: '机构地址',
                  key: 'areaAddress',
                  align: 'center',
              },
              {
                  title: '联系方式',
                  align:'center',
                  key: 'phone',
              },
              {
                  title: '机构等级',
                  align:'center',
                  key: 'organizationLevel',
              },
              {
                  title: '病床数量',
                  align:'center',
                  key: 'bedPlace',
              }
          ],
      };
    },
    created() {
        this.initFormatter();
        let regStr = /^["|'](.*)["|']$/g;
        this.roles = localStorage.getItem('roles').replace(regStr,"$1");
        console.log('roles=='+this.roles);
        /*if(this.roles.indexOf("医疗机构") != -1){
          this.addJG=true;
          this.addSBF=false;
          this.addCRO=false;
        }else if(this.roles.indexOf("申办方") != -1) {
            this.addJG=false;
            this.addSBF=true;
            this.addCRO=false;
        }else if(this.roles.indexOf("CRO") != -1) {
            this.addJG=false;
            this.addSBF=false;
            this.addCRO=true;
        }*/
        let sex = {
            "key": 'STATUS_GENDER'
        }
        getSelectValueDesc(sex).then(res => {
            if(res.data.code = 200){
                this.sexOption = res.data.msg
            }
        })
        let marriage = {
            "key": 'STATUS_MARITAL'
        }
        getSelectValueDesc(marriage).then(res => {
            if(res.data.code = 200) {
                this.marriageOption = res.data.msg
            }
        })
        let stage = {
            "key": 'PROJECT_STAGES'
        }
        getSelectValueDesc(stage).then(res => {
            if(res.data.code = 200){
                this.projectStageOption = res.data.msg
            }
        })
        let testType = {
            "key": 'SUBJECT_TYPE'
        }
        getSelectValueDesc(testType).then(res => {
            if(res.data.code = 200){
                this.testTypeOption = res.data.msg
            }
        })
        this.getList();
        findProjectSelect().then(res => {
            if(res.data.code = 200){
                this.mechanismOption = res.data.data
            }
        });
        getSelectAreaPC().then(res => {
            this.cityOption=[];
            this.countyOption=[];
            if(res.data.code = 200){
                this.provinceOption = res.data.msg
            }
        });
    },
    mounted() {
    },
    methods: {
      resetA(){
            this.infoForm.province='';
            this.infoForm.city='';
            this.infoForm.county='';
            this.cityOption=[];
            this.countyOption=[];
        },
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
      selectCity(value){
        this.countyOption=[];
          let codePY={
              "code":value
          }
          getSelectAreaPY(codePY).then(res => {
              if(res.data.code = 200){
                  this.cityOption = res.data.msg
              }
          });
      },
      selectCounty(value){
            let codePY={
                "code":value
            }
            getSelectAreaCY(codePY).then(res => {
                if(res.data.code = 200){
                    this.countyOption = res.data.msg
                }
            });
        },
      getList(){
          let params = {
              projectName: this.query.projectName,
              mechanism: this.query.mechanism,
              money: this.query.money,
              pageNumber: this.page.pageNumber,
              pageSize: this.page.pageSize
          };
          listProject(params)
              .then(res => {
                  //console.log(res);
                  this.tableData = res.data.page.list;
                  for(let i=0;i<this.tableData.length;i++){
                      let arri=this.tableData[i];
                      for(let j=0;j<this.testTypeOption.length;j++){
                          let arrV=this.testTypeOption[j];
                          if(arri.testType===arrV.value){
                              this.tableData[i]['testTypeStr']=arrV.label;
                          }
                      }
                  }
                  this.page.pageNumber = res.data.page.pageNumber;
                  this.page.pageSize = res.data.page.pageSize;
                  this.page.total = res.data.page.totalRow;
              })
      },
      handleSearchSBF() {
          this.getList();
      },
      handleCurrentChange(val){
          this.page.pageNumber = val;
          this.getList();
      },
      handleSizeChange(val){
          this.page.pageSize = val;
          this.getList();
      },
      handleAddSBF(){
          this.infoForm={};
          this.isAdd=true;
          this.addEdit = true;
      },
      cancelDialog(formRule) {},
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
      handleSubmitSave() {
        this.$refs.infoForm.validate(valid => {
          if(valid) {
            let data={
                "projectName":this.infoForm.projectName,
                "requireMajor":this.infoForm.requireMajor,
                "applicationMedicine":this.infoForm.applicationMedicine,
                "medicineName":this.infoForm.medicineName,
                "recruitNumber":this.infoForm.recruitNumber,
                "testType":this.infoForm.testType,
                "projectStage":this.infoForm.projectStage,
                "startTime":this.infoForm.startTime,
                "endTime":this.infoForm.endTime,
                "applyEndTime":this.infoForm.applyEndTime,
                "maritalStatus":this.infoForm.maritalStatus,
                "requireSex":this.infoForm.requireSex,
                "requireAge":this.infoForm.requireAge,
                "compensationMoney":this.infoForm.compensationMoney,
                "linkMan":this.infoForm.linkMan,
                "phone":this.infoForm.phone,
                "actuator":this.infoForm.actuator,
                "url":this.infoForm.url,
                "standard":this.infoForm.standard,
                "excludeStandard":this.infoForm.excludeStandard,
                "projectDescribe":this.infoForm.projectDescribe,
                "province":this.infoForm.province,
                "city":this.infoForm.city,
                "county":this.infoForm.county
            };
            console.log('data---'+JSON.stringify(data));
            addProject(data).then(res => {
              if(res.data.code==200){
                  this.$Message.success('新建项目成功！');
                  this.$refs["infoForm"].resetFields();
                  this.isAdd = false;
                  this.addEdit = false;
                  this.getList();
              }

          });
          }
        });
      },
      toShowAttachment(url){
            window.location.href=serverSrc+url;
        },
      handleSubmitUpdate(){
          this.$refs.infoForm.validate(valid => {
              if(valid) {
                  let data={
                      "id":this.infoForm.id,
                      "projectName":this.infoForm.projectName,
                      "requireMajor":this.infoForm.requireMajor,
                      "applicationMedicine":this.infoForm.applicationMedicine,
                      "medicineName":this.infoForm.medicineName,
                      "recruitNumber":this.infoForm.recruitNumber,
                      "testType":this.infoForm.testType,
                      "projectStage":this.infoForm.projectStage,
                      "startTime":this.infoForm.startTime,
                      "endTime":this.infoForm.endTime,
                      "applyEndTime":this.infoForm.applyEndTime,
                      "maritalStatus":this.infoForm.maritalStatus,
                      "requireSex":this.infoForm.requireSex,
                      "requireAge":this.infoForm.requireAge,
                      "compensationMoney":this.infoForm.compensationMoney,
                      "linkMan":this.infoForm.linkMan,
                      "phone":this.infoForm.phone,
                      "actuator":this.infoForm.actuator,
                      "url":this.infoForm.url,
                      "standard":this.infoForm.standard,
                      "excludeStandard":this.infoForm.excludeStandard,
                      "projectDescribe":this.infoForm.projectDescribe,
                      "province":this.infoForm.province,
                      "city":this.infoForm.city,
                      "county":this.infoForm.county
                  };
                  console.log('data---'+JSON.stringify(data));
                  updateProject(data).then(res => {
                      if(res.data.code==200){
                          this.$Message.success('编辑项目成功！');
                          this.$refs["infoForm"].resetFields();
                          this.isAdd = false;
                          this.addEdit = false;
                          this.getList();
                      }

                  });
              }
          });
      },
      handleSubmitImport(){
            this.$Message.success('导入模板');
        },
      showProject(row){
          this.isAdd=false;
          this.addEdit=true;
          //console.log('row=='+JSON.stringify(row));
          this.selectCity(row.province);
          this.selectCounty(row.city);
          this.infoForm=row;

      },
      cancelModal(){
         this.infoForm={},
         this.addEdit=false;
      },
      toSend(row){
          this.sendModal=true;
          this.getSendList();
          this.selectId='';
          this.projectId=row.id;
      },
      getSendList(){
          let data={
              "mechanism":this.search.mechanism
          }
          hospitalList(data)
              .then(res => {
                  console.log(res);
                  this.tableDataH = res.data.page.list;
                  this.pageH.pageNumber = res.data.page.pageNumber;
                  this.pageH.pageSize = res.data.page.pageSize;
                  this.pageH.total = res.data.page.totalRow;
              })
      },
      handleCurrentChangeH(val){
          this.pageH.pageNumber = val;
          this.getSendList();
      },
      handleSizeChangeH(val){
          this.pageH.pageSize = val;
          this.getSendList();
      },
      handleSearch(){
        this.getSendList();
      },
      handleSubmitSend(){
        if (this.selectId == "undefined" || this.selectId == null || this.selectId == "") {
            this.$Message.success('请选择一条记录');
            return;
        }
        let data={
            "projectId":parseInt(this.projectId),
            "hospitalId":parseInt(this.selectId)
        }
        console.log('data==='+JSON.stringify(data));
        sendProject(data).then(res => {
            if(res.data.code==200){
                this.$Message.success('发送项目成功');
                this.projectId='';
                this.hospitalId='';
                this.cancelModal2();
            }
        })

      },
      cancelModal2(){
            this.sendModal=false;
        }
    }
  };
</script>

<style lang="less">
    .btn-submit{
      width:166px!important;
      height:44px!important;
      border-radius:22px!important;
      border:none!important;
      background-color:#35BACB!important;
    }
  .btn-cancel{
    margin-left:20px!important;
    border:1px solid #35BACB!important;
    color:#35BACB!important;
    background-color:#ffffff!important;
  }
</style>
