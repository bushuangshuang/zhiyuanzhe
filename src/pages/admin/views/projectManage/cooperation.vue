<template>
    <div id="testcar">
        <div style="min-height:400px;">
            <Form :model="search1" label-position="right" :label-width="0" inline >
                <FormItem label="">
                    <Select v-model="search1.province" placeholder="请选择省" style="width:100px" @on-change="selectCity">
                        <Option v-for="item in provinceOption" :key="item.value" :label="item.label" :value="item.value">
                        </Option>
                    </Select>
                    <Select v-model="search1.city" placeholder="请选择市" style="width:100px" @on-change="selectCounty">
                        <Option v-for="item in cityOption" :key="item.value" :label="item.label" :value="item.value">
                        </Option>
                    </Select>
                    <Select v-model="search1.county" placeholder="请选择区县" style="width:100px">
                        <Option v-for="item in countyOption" :key="item.value" :label="item.label" :value="item.value">
                        </Option>
                    </Select>
                </FormItem>
                <FormItem label="" :label-width="0">
                    <div @click="resetA1">清除区域</div>
                </FormItem>
                <FormItem label="">
                    <Input v-model="search1.projectName" style="width:200px" placeholder="请输入项目名称" />
                </FormItem>
                <FormItem :label-width="50">
                    <Button type="primary" @click="handleSearch">查询</Button>
                </FormItem>
            </Form>
            <div>
                <Row type="flex" justify="end" class="code-row-bg">
                    <Button v-if="isCro" type="primary" style="margin-bottom:20px;text-align:right;" @click="toPublish">发布项目</Button>
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
                        <td style="width:20%" align="center">机构名称</td>
                        <td style="width:30%">{{infoForm1.hospitalName}}</td>
                        <td style="width:20%" align="center">主做类型</td>
                        <td style="width:30%">{{infoForm1.mainType}}</td>
                    </tr>
                    <tr>
                        <td align="center">机构级别</td>
                        <td>{{infoForm1.organizationLevel}}</td>
                        <td align="center">床位</td>
                        <td>{{infoForm1.bedPlace}}</td>
                    </tr>
                    <tr>
                        <td align="center">联系电话</td>
                        <td>{{infoForm1.phone}}</td>
                        <td align="center">网址</td>
                        <td>{{infoForm1.url}}</td>
                    </tr>
                    <tr>
                        <td align="center">地址</td>
                        <td colspan="3">{{infoForm1.areaAddress}}</td>
                    </tr>
                    <tr>
                        <td align="center">机构简介</td>
                        <td colspan="3">{{infoForm1.organizationBrief}}</td>
                    </tr>
                    <tr>
                        <td align="center">机构照片</td>
                        <td colspan="3"><div @click="toShowAttachment(infoForm1.organizationUrl)">{{infoForm1.organizationUrl}}</div></td>
                    </tr>
                    <tr>
                        <td align="center">认证证书</td>
                        <td colspan="3"><div @click="toShowAttachment(infoForm1.certificateUrl)">{{infoForm1.certificateUrl}}</div></td>
                    </tr>
                </table>
                <div slot="footer" style="text-align:center">
                </div>
            </Modal>
            <Modal title="发布" v-model="modal2" width="800px">
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
                    <FormItem label="报名截止日期" style="float:right">
                        <DatePicker v-model="infoForm.applyEndTime" type="date" placeholder="报名截止日期" style="width: 240px"></DatePicker>
                    </FormItem>
                    <FormItem label="试验起止日期">
                        <Row>
                            <Col span="11">
                            <DatePicker type="date" placeholder="试验起始日期" v-model="infoForm.startTime" style="width:240px;"></DatePicker>
                            </Col>
                            <Col span="2" style="text-align:center;">&nbsp;&nbsp;&nbsp;&nbsp;至&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Col>
                            <Col span="11">
                            <DatePicker type="date" placeholder="试验终止日期" v-model="infoForm.endTime" style="width:240px;"></DatePicker>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem label="机构地址">
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
                    <FormItem label="" :label-width="0">
                        <div @click="resetA2">清除机构地址</div>
                    </FormItem>
                    <FormItem prop="organizationLevel" label="机构等级">
                        <Input v-model="infoForm.organizationLevel" placeholder="请输入机构等级" style="width:240px" />
                    </FormItem>
                    <FormItem prop="bedPlace" label="病床数量">
                        <Input v-model="infoForm.bedPlace" placeholder="请输入病床数量" style="width:240px" />
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
                </Form>
                <div slot="footer" style="text-align:center">
                    <Button type="primary" class="btn-submit" @click="handleSubmitUpdate1">保存</Button>
                    <Button type="primary" class="btn-submit btn-cancel" @click="cancelModal1">取消</Button>
                </div>
            </Modal>
        </div>
    </div>
</template>

<script>
    import { medicineCooperative,medicinePublishAdd } from '../../../../api/projectManage.js'
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
                provinceOption:[],
                cityOption:[],
                countyOption:[],
                projectStageOption:[],
                search1:{
                    province:'',
                    city:'',
                    county:'',
                    projectName:'',
                },
                columns1:[
                    {
                        title: '序号',
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '机构名称',
                        align:'center',
                        key: 'hospitalName',
                    },
                    {
                        title: '机构地址',
                        align:'center',
                        key: 'areaAddress',
                    },
                    {
                        title: '联系电话',
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
                modal1:false,
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
                modal2:false,
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
                    province:'',
                    city:'',
                    county:'',
                    organizationLevel:'',
                    linkMan:'',
                    bedPlace:'',
                    phone:'',
                    compensationMoney:'',
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
                        {required: true,message: '此项必填',trigger: "blur"}/*,
                         {type: 'string',pattern:/^(0|\+?[1-9][0-9]*)$/,  message: '请输入数字',trigger: 'change'}*/
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
                    organizationLevel: [{
                        required: true,
                        message: '此项必填',
                        trigger: "blur"
                    }],
                    bedPlace: [
                        {required: true,message: '此项必填',trigger: "blur"},
                         {type: 'string',  message: '请输入数字',trigger: 'change'}
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
                },
                roleName:'',
                isCro:false,
            }
        },
        computed: {
        },
        created(){
            this.roleName=localStorage.getItem('roles');
            if(this.roleName.indexOf("CRO") != -1){
                this.isCro=true;
            }else{
                this.isCro=false;
            }
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
            getSelectAreaPC().then(res => {
                this.cityOption=[];
                this.countyOption=[];
                if(res.data.code = 200){
                    this.provinceOption = res.data.msg
                }
            });
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
            resetA1(){
                this.search1.province='';
                this.search1.city='';
                this.search1.county='';
                this.cityOption=[];
                this.countyOption=[];
            },
            resetA2(){
                this.infoForm.province='';
                this.infoForm.city='';
                this.infoForm.county='';
                this.cityOption=[];
                this.countyOption=[];
            },
            handleSearch(){
                this.getList1();
            },
            getList1(){
                let params = {
                    hospitalName: this.search1.projectName,
                    province:this.search1.province,
                    city:this.search1.city,
                    county:this.search1.county,
                    pageNumber: this.page1.pageNumber,
                    pageSize: this.page1.pageSize,
                };
                medicineCooperative(params)
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
            handlePage1(val){
                this.page1.pageNumber = val;
                this.getList1();
            },
            handlePageSize1(val){
                this.page1.pageSize = val;
                this.getList1();
            },
            show1(row){
                this.infoForm1={};
                this.modal1=true;
                this.infoForm1=row;
                this.infoForm1.organizationBrief=row.organizationBrief.replace(/<[^>]+>/g, "")
                //console.log('row==='+JSON.stringify(row));
            },
            toPublish(){
                this.infoForm={};
                this.modal2=true;

            },
            handleSubmitUpdate1(){
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
                            "province":this.infoForm.province,
                            "city":this.infoForm.city,
                            "county":this.infoForm.county,
                            "organizationLevel":this.infoForm.organizationLevel,
                            "bedPlace":this.infoForm.bedPlace,
                            "compensationMoney":this.infoForm.compensationMoney,
                            "linkMan":this.infoForm.linkMan,
                            "phone":this.infoForm.phone,
                        };
                        //console.log('data---'+JSON.stringify(data));
                        medicinePublishAdd(data).then(res => {
                            if(res.data.code==200){
                                this.$Message.success('发布项目成功！');
                                this.$refs["infoForm"].resetFields();
                                this.modal2 = false;
                                this.getList1();
                            }

                        });
                    }
                });
            },
            cancelModal1(){
                this.modal2=false;
                this.infoForm={}
            },

        }

    }
</script>

<style>

</style>
