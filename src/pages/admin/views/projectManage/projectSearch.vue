<template>
  <div id="testcar">
    <div style="min-height:400px;">
      <Tabs :value="nameTab" :animated="false" @on-click="tabsChanged">
        <TabPane label="进行中"  name="name1">
          <Form :model="search1" label-position="right" :label-width="0" inline >
            <FormItem label="">
              <Select v-model="search1.testType" clearable placeholder="请选择志愿者类型" style="width: 200px">
                <Option v-for="item in testTypeOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
            <FormItem label="">
              <Input v-model="search1.projectName" style="width:200px" placeholder="请输入项目名称" />
            </FormItem>
            <FormItem label="">
              <Select v-model="search1.projectStatus" placeholder="请选择状态" style="width:200px">
                <Option v-for="item in projectStatus" :key="item.value" :label="item.label" :value="item.value">
                </Option>
              </Select>
            </FormItem>
            <FormItem label="">
              <Input v-model="search1.money" style="width:200px" placeholder="请输入补偿金额" />
            </FormItem>
            <FormItem :label-width="50">
              <Button type="primary" @click="handleSearch('name1')">查询</Button>
            </FormItem>
          </Form>
          <div>
            <Row type="flex" justify="start" class="code-row-bg">
              <Button type="primary" style="margin-bottom:20px;text-align: right;">导出表格</Button>
            </Row>
            <Table :data="tableData1" :columns="columns1" stripe border></Table>
            <div style="margin: 10px;overflow: hidden">
              <div style="float: right;">
                <Page :total="page1.total" :current="page1.pageNumber" :page-size="page1.pageSize" show-elevator show-sizer show-total
                      placement="top" @on-change="handlePage1" @on-page-size-change='handlePageSize1'></Page>
              </div>
            </div>
          </div>
          <Modal title="查看" v-model="modal1" width="800px">
            <table border class="useShowTable">
              <tr>
                <td style="width:20%" align="center">项目名称</td>
                <td style="width:30%">{{infoForm1.projectName}}</td>
                <td style="width:20%" align="center">适应专业</td>
                <td style="width:30%">{{infoForm1.requireMajor}}</td>
              </tr>
              <tr>
                <td align="center">药物适应症</td>
                <td>{{infoForm1.applicationMedicine}}</td>
                <td align="center">药物名称</td>
                <td>{{infoForm1.medicineName}}</td>
              </tr>
              <tr>
                <td align="center">招募人数</td>
                <td>{{infoForm1.recruitNumber}}</td>
                <td align="center">受试者类型</td>
                <td>{{infoForm1.testTypeStr}}</td>
              </tr>
              <tr>
                <td align="center">项目分期</td>
                <td>{{infoForm1.projectStage}}</td>
                <td align="center">试验起止日期</td>
                <td>{{infoForm1.startTime}}&nbsp;&nbsp;至&nbsp;&nbsp;{{infoForm1.endTime}}</td>
              </tr>
              <tr>
                <td align="center">报名截止日期</td>
                <td>{{infoForm1.applyEndTime}}</td>
                <td align="center">婚姻状况</td>
                <td>{{infoForm1.maritalStatus}}</td>
              </tr>
              <tr>
                <td align="center">性别要求</td>
                <td>{{infoForm1.requireSex}}</td>
                <td align="center">年龄要求</td>
                <td>{{infoForm1.requireAge}}</td>
              </tr>
              <tr>
                <td align="center">补偿金</td>
                <td>{{infoForm1.compensationMoney}}</td>
                <td align="center">联系人</td>
                <td>{{infoForm1.linkMan}}</td>
              </tr>
              <tr>
                <td align="center">联系电话</td>
                <td>{{infoForm1.phone}}</td>
                <td align="center">执行机构</td>
                <td>{{infoForm1.actuator}}</td>
              </tr>
              <tr>
                <td align="center">附件</td>
                <td> <div @click="toShowAttachment(infoForm1.url)">{{infoForm1.fileName}}</div></td>
                <td align="center">区域</td>
                <td>{{infoForm1.areaAddress}}</td>
              </tr>
              <tr>
                <td align="center">入选标准</td>
                <td colspan="3">{{infoForm1.standard}}</td>
              </tr>
              <tr>
                <td align="center">排除标准</td>
                <td colspan="3">{{infoForm1.excludeStandard}}</td>
              </tr>
              <tr>
                <td align="center">项目描述</td>
                <td colspan="3">{{infoForm1.projectDescribe}}</td>
              </tr>
            </table>
            <div slot="footer" style="text-align:center">
            </div>
          </Modal>
        </TabPane>
        <TabPane label="已完成"  name="name2">
          <Form :model="search2" label-position="right" :label-width="0" inline >
            <FormItem label="">
              <Select v-model="search2.testType" clearable placeholder="请选择志愿者类型" style="width: 200px">
                <Option v-for="item in testTypeOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
            <FormItem label="">
              <Input v-model="search2.projectName" style="width:200px" placeholder="请输入项目名称" />
            </FormItem>
            <FormItem label="">
              <Select v-model="search2.projectStatus" placeholder="请选择状态" style="width:200px">
                <Option v-for="item in projectStatus" :key="item.value" :label="item.label" :value="item.value">
                </Option>
              </Select>
            </FormItem>
            <FormItem label="">
              <Input v-model="search2.money" style="width:200px" placeholder="请输入补偿金额" />
            </FormItem>
            <FormItem :label-width="50">
              <Button type="primary" @click="handleSearch('name2')">查询</Button>
            </FormItem>
          </Form>
          <div>
            <Row type="flex" justify="start" class="code-row-bg">
              <Button type="primary" style="margin-bottom:20px;text-align: right;">导出表格</Button>
            </Row>
            <Table :data="tableData2" :columns="columns2" stripe border></Table>
            <div style="margin: 10px;overflow: hidden">
              <div style="float: right;">
                <Page :total="page2.total" :current="page2.pageNumber" :page-size="page2.pageSize" show-elevator show-sizer show-total
                      placement="top" @on-change="handlePage2" @on-page-size-change='handlePageSize2'></Page>
              </div>
            </div>
          </div>
          <Modal title="查看" v-model="modal2" width="800px">
            <table border class="useShowTable">
              <tr>
                <td style="width:20%" align="center">项目名称</td>
                <td style="width:30%">{{infoForm2.projectName}}</td>
                <td style="width:20%" align="center">适应专业</td>
                <td style="width:30%">{{infoForm2.requireMajor}}</td>
              </tr>
              <tr>
                <td align="center">药物适应症</td>
                <td>{{infoForm2.applicationMedicine}}</td>
                <td align="center">药物名称</td>
                <td>{{infoForm2.medicineName}}</td>
              </tr>
              <tr>
                <td align="center">招募人数</td>
                <td>{{infoForm2.recruitNumber}}</td>
                <td align="center">受试者类型</td>
                <td>{{infoForm2.testTypeStr}}</td>
              </tr>
              <tr>
                <td align="center">项目分期</td>
                <td>{{infoForm2.projectStage}}</td>
                <td align="center">试验起止日期</td>
                <td>{{infoForm2.startTime}}&nbsp;&nbsp;至&nbsp;&nbsp;{{infoForm2.endTime}}</td>
              </tr>
              <tr>
                <td align="center">报名截止日期</td>
                <td>{{infoForm2.applyEndTime}}</td>
                <td align="center">婚姻状况</td>
                <td>{{infoForm2.maritalStatus}}</td>
              </tr>
              <tr>
                <td align="center">性别要求</td>
                <td>{{infoForm2.requireSex}}</td>
                <td align="center">年龄要求</td>
                <td>{{infoForm2.requireAge}}</td>
              </tr>
              <tr>
                <td align="center">补偿金</td>
                <td>{{infoForm2.compensationMoney}}</td>
                <td align="center">联系人</td>
                <td>{{infoForm2.linkMan}}</td>
              </tr>
              <tr>
                <td align="center">联系电话</td>
                <td>{{infoForm2.phone}}</td>
                <td align="center">执行机构</td>
                <td>{{infoForm2.actuator}}</td>
              </tr>
              <tr>
                <td align="center">附件</td>
                <td> <div @click="toShowAttachment(infoForm2.url)">{{infoForm2.fileName}}</div></td>
                <td align="center">区域</td>
                <td>{{infoForm2.areaAddress}}</td>
              </tr>
              <tr>
                <td align="center">入选标准</td>
                <td colspan="3">{{infoForm2.standard}}</td>
              </tr>
              <tr>
                <td align="center">排除标准</td>
                <td colspan="3">{{infoForm2.excludeStandard}}</td>
              </tr>
              <tr>
                <td align="center">项目描述</td>
                <td colspan="3">{{infoForm2.projectDescribe}}</td>
              </tr>
            </table>
            <div slot="footer" style="text-align:center">
            </div>
          </Modal>

        </TabPane>
      </Tabs>
    </div>
  </div>
</template>

<script>
    import { queryHospitalProject } from '../../../../api/projectManage.js'
    import { getSelectValueDesc,getSelectAreaPC,getSelectAreaPY,getSelectAreaCY } from '../../../../api/common.js'

    export default {
        name: 'testcar-mgr',
        data () {
            return {
                nameTab:'name1',
                testTypeOption:[],
                projectStatus:[],
                publishStatus:[],
                marriageOption:[],
                sexOption:[],
                approveStatusOption:[],
                search1:{
                    testType:'',
                    projectName:'',
                    projectStatus:'',
                    money:''
                },
                search2:{
                    testType:'',
                    projectName:'',
                    projectStatus:'',
                    money:''
                },
                columns1:[
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
                        title: '机构名称',
                        align:'center',
                        key: 'hospitalName',
                    },
                    {
                        title: '创建时间',
                        align:'center',
                        key: 'createDate',
                        render: function (h, params) {
                            return h('div',
                                new Date(this.row.createDate.replace(/-/g, '\/')).Format('yyyy-MM-dd'));
                        }
                    },
                    {
                        title: '补偿金额（元）',
                        align:'center',
                        key: 'compensationMoney',
                    },
                    {
                        title: '状态',
                        align:'center',
                        key: 'approveStatusStr',
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
                                            this.show1(params.row)
                                        }
                                    },

                                }, '查看')
                            ]);
                        }
                    }
                ],
                tableData1:[],
                page1:{
                    pageNumber: 1,
                    pageSize: 10,
                    total: 0
                },
                columns2:[
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
                        title: '机构名称',
                        align:'center',
                        key: 'hospitalName',
                    },
                    {
                        title: '创建时间',
                        align:'center',
                        key: 'createDate',
                        render: function (h, params) {
                            return h('div',
                                new Date(this.row.createDate.replace(/-/g, '\/')).Format('yyyy-MM-dd'));
                        }
                    },
                    {
                        title: '补偿金额（元）',
                        align:'center',
                        key: 'compensationMoney',
                    },
                    {
                        title: '状态',
                        align:'center',
                        key: 'approveStatusStr',
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
                                            this.show2(params.row)
                                        }
                                    },

                                }, '查看')
                            ]);
                        }
                    }
                ],
                tableData2:[],
                page2:{
                    pageNumber: 1,
                    pageSize: 10,
                    total: 0
                },
                modal1:false,
                modal2:false,
                infoForm1: {
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
                infoForm2: {
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

            }
        },
        computed: {
        },
        created(){
            this.initFormatter();
            let testType = {
                "key": 'SUBJECT_TYPE'
            }
            getSelectValueDesc(testType).then(res => {
                if(res.data.code = 200){
                    this.testTypeOption = res.data.msg
                }
            })
            let project = {
                "key": 'STATUS_PROJECT'
            }
            getSelectValueDesc(project).then(res => {
                if(res.data.code = 200){
                    this.projectStatus = res.data.msg
                }
            })
            let publish = {
                "key": 'PUBLISH_PROJECT'
            }
            getSelectValueDesc(publish).then(res => {
                if(res.data.code = 200){
                    this.publishStatus = res.data.msg
                }
            })
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
            this.getList1();
            this.getList2();
        },
        methods: {
            initFormatter() {
                //console.log('myDepartmentName=='+JSON.stringify(this.myDepartmentName));
                Date.prototype.Format = function (fmt) { //
                    let o = {
                        "M+": this.getMonth() + 1,                 //月份
                        "d+": this.getDate(),                    //日
                        "h+": this.getHours(),                   //小时
                        "m+": this.getMinutes(),                 //分
                        "s+": this.getSeconds(),                 //秒
                        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                        "S": this.getMilliseconds()             //毫秒
                    };
                    if (/(y+)/.test(fmt))
                        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
                    for (var k in o)
                        if (new RegExp("(" + k + ")").test(fmt))
                            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                    return fmt;
                }
            },
            tabsChanged(name){
                if(name==='name1'){
                    this.getList1();
                }else if(name==='name2'){
                    this.getList2()
                }
            },
            handleSearch(status){
                if(status==='name1'){
                    this.getList1();
                }else if(status==='name2'){
                    this.getList2();
                }
            },
            getList1(){
                let params = {
                    testType: this.search1.testType,
                    projectName: this.search1.projectName,
                    approveStatus: this.search1.projectStatus,
                    compensationMoney:this.search1.money,
                    pageNumber: this.page1.pageNumber,
                    pageSize: this.page1.pageSize,
                    approveStatus:1,
                };
                queryHospitalProject(params)
                    .then(res => {
                        this.tableData1 = res.data.page.list;
                        for(let i=0;i<this.tableData1.length;i++) {
                            let arri = this.tableData1[i];
                            for (let j = 0; j < this.testTypeOption.length; j++) {
                                let arrV = this.testTypeOption[j];
                                if (arri.testType === arrV.value) {
                                    this.tableData1[i]['testTypeStr'] = arrV.label;
                                }
                            }
                            for(let k=0;k<this.projectStatus.length;k++){
                                let arrV1=this.projectStatus[k];
                                if(arri.approveStatus===arrV1.value){
                                    this.tableData1[i]['approveStatusStr']=arrV1.label;
                                }
                            }
                        }
                        this.page1.pageNumber = res.data.page.pageNumber;
                        this.page1.pageSize = res.data.page.pageSize;
                        this.page1.total = res.data.page.totalRow;
                    })
            },
            getList2(){
                let params = {
                    testType: this.search2.testType,
                    projectName: this.search2.projectName,
                    approveStatus: this.search2.projectStatus,
                    compensationMoney:this.search2.money,
                    pageNumber: this.page2.pageNumber,
                    pageSize: this.page2.pageSize,
                    approveStatus:2,
                };
                queryHospitalProject(params)
                    .then(res => {
                        this.tableData2 = res.data.page.list;
                        for(let i=0;i<this.tableData2.length;i++) {
                            let arri = this.tableData2[i];
                            for (let j = 0; j < this.testTypeOption.length; j++) {
                                let arrV = this.testTypeOption[j];
                                if (arri.testType === arrV.value) {
                                    this.tableData2[i]['testTypeStr'] = arrV.label;
                                }
                            }
                            for(let k=0;k<this.projectStatus.length;k++){
                                let arrV1=this.projectStatus[k];
                                if(arri.approveStatus===arrV1.value){
                                    this.tableData2[i]['approveStatusStr']=arrV1.label;
                                }
                            }
                        }
                        this.page2.pageNumber = res.data.page.pageNumber;
                        this.page2.pageSize = res.data.page.pageSize;
                        this.page2.total = res.data.page.totalRow;
                    })
            },
            handlePage1(val){
                this.page1.pageNumber = val;
                this.getList1();
            },
            handlePageSize1(val){
                this.page1.pageSize = val;
                this.getList1();
            },
            handlePage2(val){
                this.page2.pageNumber = val;
                this.getList2();
            },
            handlePageSize2(val){
                this.page2.pageSize = val;
                this.getList2();
            },
            show1(row){
                this.infoForm1={};
                this.modal1=true;
                this.infoForm1=row;
                for(let i=0;i<this.projectStageOption.length;i++){
                    if(row.projectStage===this.projectStageOption[i].value){
                        this.infoForm1.projectStage=this.projectStageOption[i].label;
                        break;
                    }
                }
                for(let j=0;j<this.marriageOption.length;j++){
                    if(row.maritalStatus===this.marriageOption[j].value){
                        this.infoForm1.maritalStatus=this.marriageOption[j].label;
                        break;
                    }
                }
                for(let j=0;j<this.sexOption.length;j++){
                    if(row.requireSex===this.sexOption[j].value){
                        this.infoForm1.requireSex=this.sexOption[j].label;
                        break;
                    }
                }
                this.infoForm1.startTime=row.startTime.substring(0, 10);
                this.infoForm1.endTime=row.endTime.substring(0, 10);
                this.infoForm1.applyEndTime=row.applyEndTime.substring(0, 10);
            },
            show2(row){
                this.infoForm2={};
                this.modal2=true;
                this.infoForm2=row;
                for(let i=0;i<this.projectStageOption.length;i++){
                    if(row.projectStage===this.projectStageOption[i].value){
                        this.infoForm2.projectStage=this.projectStageOption[i].label;
                        break;
                    }
                }
                for(let j=0;j<this.marriageOption.length;j++){
                    if(row.maritalStatus===this.marriageOption[j].value){
                        this.infoForm2.maritalStatus=this.marriageOption[j].label;
                        break;
                    }
                }
                for(let j=0;j<this.sexOption.length;j++){
                    if(row.requireSex===this.sexOption[j].value){
                        this.infoForm2.requireSex=this.sexOption[j].label;
                        break;
                    }
                }
                this.infoForm2.startTime=row.startTime.substring(0, 10);
                this.infoForm2.endTime=row.endTime.substring(0, 10);
                this.infoForm2.applyEndTime=row.applyEndTime.substring(0, 10);
            },
        }

    }
</script>

<style>

</style>
