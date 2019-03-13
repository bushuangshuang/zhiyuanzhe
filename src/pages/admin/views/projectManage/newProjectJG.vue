<template>
  <div>
    <div style="min-height:200px;width:900px;">
          <Form ref="infoForm" :model="infoForm" :rules="rules" :label-width="120" inline>
            <FormItem prop="projectName" label="项目名称">
              <Input v-model="infoForm.projectName" style="width:300px" />
            </FormItem>
            <FormItem prop="requireMajor" label="适应专业" style="float:right">
              <Input v-model="infoForm.requireMajor" style="width:300px;" />
            </FormItem>
            <FormItem prop="applicationMedicine" label="药物适应症">
              <Input v-model="infoForm.applicationMedicine" style="width:300px" />
            </FormItem>
            <FormItem prop="medicineName" label="药物名称" style="float:right">
              <Input v-model="infoForm.medicineName" style="width:300px;" />
            </FormItem>
            <FormItem prop="recruitNumber" label="招募人数">
              <Input v-model="infoForm.recruitNumber" style="width:300px" />
            </FormItem>
            <FormItem prop="testType" label="受试者类型" style="float:right">
              <Select v-model="infoForm.testType" placeholder="请选择状态" style="width:300px">
                <Option v-for="item in testTypeOption" :key="item.value" :label="item.label" :value="item.value">
                </Option>
              </Select>
            </FormItem>
            <FormItem prop="projectStage" label="项目分期">
              <Select v-model="infoForm.projectStage" placeholder="请选择状态" style="width:300px">
                <Option v-for="item in projectStageOption" :key="item.value" :label="item.label" :value="item.value">
                </Option>
              </Select>
            </FormItem>
            <FormItem label="试验起止日期" style="float:right">
                <Row>
                  <Col span="11">
                  <DatePicker type="date" placeholder="试验起始日期" v-model="infoForm.startTime" style="width:139px;"></DatePicker>
                  </Col>
                  <Col span="2" style="text-align:center;padding-left:5px;padding-right:5px;">至</Col>
                  <Col span="11">
                  <DatePicker type="date" placeholder="试验终止日期" v-model="infoForm.endTime" style="width:139px;"></DatePicker>
                  </Col>
                </Row>
            </FormItem>
            <FormItem label="报名截止日期" >
              <DatePicker v-model="infoForm.applyEndTime" type="date" placeholder="报名截止日期" style="width: 300px"></DatePicker>
            </FormItem>
            <FormItem prop="maritalStatus" label="婚姻状况" style="float:right">
              <Select v-model="infoForm.maritalStatus" placeholder="请选择状态" style="width:300px">
                <Option v-for="item in marriageOption" :key="item.value" :label="item.label" :value="item.value">
                </Option>
              </Select>
            </FormItem>
            <FormItem prop="requireSex" label="性别要求" >
              <Select v-model="infoForm.requireSex" placeholder="请选择状态" style="width:300px">
                <Option v-for="item in sexOption" :key="item.value" :label="item.label" :value="item.value">
                </Option>
              </Select>
            </FormItem>
            <FormItem prop="requireAge" label="年龄要求" style="float:right">
              <Input v-model="infoForm.requireAge" style="width:300px" />
            </FormItem>
            <FormItem prop="compensationMoney" label="补偿金">
              <Input v-model="infoForm.compensationMoney" style="width:300px" />
            </FormItem>
            <FormItem prop="linkMan" label="联系人"  style="float:right">
              <Input v-model="infoForm.linkMan" style="width:300px" />
            </FormItem>
            <FormItem prop="phone" label="联系电话">
              <Input v-model="infoForm.phone" style="width:300px" />
            </FormItem>
            <FormItem prop="actuator" label="执行机构" style="float:right">
              <Input v-model="infoForm.actuator" style="width:300px" />
            </FormItem>
            <FormItem label="附件上传" prop="fileName">
                <Upload action="//jsonplaceholder.typicode.com/posts/"
                        :before-upload="handleUpload"
                        :show-upload-list="false">
                  <Button icon="ios-cloud-upload-outline">选择附件</Button>
                </Upload>
                <div>{{infoForm.fileName}}</div>
            </FormItem>
            <FormItem label="入选标准：" prop="standard">
              <Input v-model="infoForm.standard" type="textarea" :autosize="{minRows: 3,maxRows: 5}" placeholder="请输入入选标准" style="width:710px;"></Input>
            </FormItem>
            <FormItem label="排除标准：" prop="excludeStandard">
              <Input v-model="infoForm.excludeStandard" type="textarea" :autosize="{minRows: 3,maxRows: 5}" placeholder="请输入排除标准" style="width:710px;"></Input>
            </FormItem>
            <FormItem label="项目描述：" prop="projectDescribe">
              <Input v-model="infoForm.projectDescribe" type="textarea" :autosize="{minRows: 3,maxRows: 5}" placeholder="请输入项目描述" style="width:710px;"></Input>
            </FormItem>
          </Form>
        <div style="text-align:center">
          <Button type="primary" class="btn-submit" @click="handleSubmitSave">保存</Button>
          <!--<Button type="primary" class="btn-submit" style="margin-left:40px;background-color:#ffffff!important;color:#35BACB;border:1px solid #35BACB!important;"
                  @click="handleSubmitImport">导入模板</Button>-->
        </div>
      </div>
  </div>
</template>

<script>
  import { getSelectValueDesc,upLoadFile } from '../../../../api/common.js'
  import { hospitalProjectAdd } from '../../../../api/projectManage.js'
  export default {
    data() {
      return {
        roles:'',
        sexOption:[],
        marriageOption:[],
        testTypeOption:[],
        projectStageOption:[],
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
        },
        rules: {
            projectName: [{required: true,message: '此项必填',trigger: "blur"}],
            requireMajor: [{required: true,message: '此项必填',trigger: "blur"}],
            applicationMedicine: [{required: true,message: '此项必填',trigger: "blur"}],
            medicineName: [{required: true,message: '此项必填',trigger: "blur"}],
            recruitNumber: [
                {required: true,message: '此项必填',trigger: "blur"},
                {type: 'string',pattern:/^(0|\+?[1-9][0-9]*)$/,  message: '请输入数字',trigger: 'change'}
                ],
            testType: [{required: true,message: '此项必填',trigger: "blur"}],
            projectStage: [{required: true,message: '此项必填',trigger: "blur"}],
            startTime: [{required: true,message: '此项必填',trigger: "blur"}],
            endTime: [{required: true,message: '此项必填',trigger: "blur"}],
            applyEndTime: [{required: true,message: '此项必填',trigger: "blur"}],
            maritalStatus: [{required: true,message: '此项必填',trigger: "blur"}],
            requireSex: [{required: true,message: '此项必填',trigger: "blur"}],
            requireAge: [
                {required: true,message: '此项必填',trigger: "blur"},
                {type: 'string',pattern:/^(0|\+?[1-9][0-9]*)$/, message: '请输入数字',trigger: 'change'}
            ],
            compensationMoney: [
                {required: true,message: '此项必填',trigger: "blur"},
                {type: 'string',  pattern: /^\+?(\d*\.\d{2})$/,message: '请输入正数且保留2位有效小数点',trigger: 'change'}
            ],
            linkMan: [{required: true,message: '此项必填',trigger: "blur"}],
            phone: [
                {required: true,message: '此项必填',trigger: "blur"},
                {type: 'string',pattern: /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$|^0\d{2,3}-?\d{7,8}$/,message: '请输入有效的电话号码',trigger: 'change'}
            ],
            actuator: [{required: true,message: '此项必填',trigger: "blur"}],
            url: [{required: true,message: '此项必填',trigger: "blur"}],
            standard: [{required: true,message: '此项必填',trigger: "blur"}],
            excludeStandard: [{required: true,message: '此项必填',trigger: "blur"}],
            projectDescribe: [{required: true,message: '此项必填',trigger: "blur"}],
        },
      };
    },
    created() {
        let regStr = /^["|'](.*)["|']$/g;
        this.roles = localStorage.getItem('roles').replace(regStr,"$1");
        console.log('roles=='+this.roles);
        if(this.roles.indexOf("医疗机构") != -1){
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
        }
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
    },
    mounted() {
    },
    methods: {
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
      handleSubmitSave: function() {
        this.$refs.infoForm.validate(valid => {
          if(valid) {
            let para={
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
                "phone":this.infoForm.linkMan,
                "actuator":this.infoForm.actuator,
                "url":this.infoForm.url,
                "standard":this.infoForm.standard,
                "excludeStandard":this.infoForm.excludeStandard,
                "projectDescribe":this.infoForm.projectDescribe
            };
            console.log('para---'+JSON.stringify(para));
          hospitalProjectAdd(para).then(res => {
              if(res.data.code==200){
                  this.$refs["infoForm"].resetFields();
                  this.addEditDialogVisible = false;
              }

          });
          }
        });
      },
      handleSubmitImport(){
            this.$Message.success('导入模板');
        },
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
</style>
