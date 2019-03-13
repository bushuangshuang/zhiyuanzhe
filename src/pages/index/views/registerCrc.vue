<template>
  <div class="home">
    <Header menu-title="注册"></Header>
      <div class="bgColor">
        <div class="container list-title">
          <Form ref="registerForm" :model="registerForm" :label-width="150" :rules="ruleValidate" inline>
          <div class="searchRes-project" style="padding:20px 0px 20px 0px;">
            <div class="row" style="padding:0px 20px 0px 40px;">
              <div>
                <span style="width:4px;font-size:18px;background-color:#35BACB;height:20px;">&nbsp;</span>
                <span style="color:#35BACB;font-size:22px;">&nbsp;&nbsp;基本信息</span>
              </div>
            </div>
            <hr align="center" style="border-bottom:1px solid #EBEBEB;border-top:none;margin-top:20px;margin-bottom:20px;" />
            <div class="row" style="padding:0px 120px 0px 100px;font-size:16px;">
              <div style="">
                <FormItem label="账号：" prop="name">
                  <Input v-model="registerForm.name" placeholder="请输入账号" style="width:300px;" />
                </FormItem>
                <FormItem label="密码：" prop="pwd" style="float:right;">
                  <Input v-model="registerForm.pwd" type="password" placeholder="请输入密码" style="width:300px;" />
                </FormItem>
                  <FormItem label="姓名：" prop="empName" >
                    <Input v-model="registerForm.empName" placeholder="请输入姓名" style="width:300px;" />
                  </FormItem>
                <FormItem label="确认密码：" prop="conPwd" style="float:right;">
                  <Input v-model="registerForm.conPwd" type="password" placeholder="请输入确认密码" style="width:300px;" />
                </FormItem>
                  <FormItem label="性别：" prop="sex" >
                    <Select v-model="registerForm.sex"  placeholder="请选择性别" clearable style="width:300px;">
                      <Option v-for="item in sexOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                  </FormItem>
                  <FormItem label="出生年月" prop="birthday" style="float:right;">
                      <DatePicker type="date" placeholder="请选择出生年月" v-model="registerForm.birthday" style="width:300px;"></DatePicker>
                  </FormItem>
                  <FormItem label="工作年限：" prop="bedPlace">
                    <Input v-model="registerForm.bedPlace" placeholder="请输入工作年限" style="width:300px;" />
                  </FormItem>
                  <FormItem label="毕业院校：" prop="phone" style="float:right;">
                    <Input v-model="registerForm.phone" placeholder="请输入毕业院校" style="width:300px;" />
                  </FormItem>
                  <FormItem label="联系方式：" prop="url">
                    <Input v-model="registerForm.url" placeholder="请输入联系方式" style="width:300px;" />
                  </FormItem>
                  <FormItem label="现居住地址：" prop="address">
                    <Input v-model="registerForm.address" placeholder="请输入现居住地址" style="width:820px;" />
                  </FormItem>
              </div>
            </div>
          </div>
          <div class="searchRes-project" style="padding:20px 0px 20px 0px;">
            <div class="row" style="padding:0px 20px 0px 40px;">
              <div>
                <span style="width:4px;font-size:18px;background-color:#35BACB;height:20px;">&nbsp;</span>
                <span style="color:#35BACB;font-size:22px;">&nbsp;&nbsp;求职意向</span>
              </div>
            </div>
            <hr align="center" style="border-bottom:1px solid #EBEBEB;border-top:none;margin-top:20px;margin-bottom:20px;" />
            <div class="row" style="padding:0px 120px 0px 100px;font-size:16px;">
              <div style="">
                <FormItem label="工作性质：" prop="sex">
                  <Select v-model="registerForm.sex"  placeholder="请选择工作性质" clearable style="width:300px;">
                    <Option v-for="item in sexOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
                <FormItem label="工作地区：" prop="sex" style="float:right;">
                  <Select v-model="registerForm.sex"  placeholder="请选择工作地区" clearable style="width:300px;">
                    <Option v-for="item in sexOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
                <FormItem label="期望行业：" prop="sex" >
                  <Select v-model="registerForm.sex"  placeholder="请选择期望行业" clearable style="width:300px;">
                    <Option v-for="item in sexOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
                <FormItem label="期望职业：" prop="sex" style="float:right;">
                  <Select v-model="registerForm.sex"  placeholder="请选择期望职业" clearable style="width:300px;">
                    <Option v-for="item in sexOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
                <FormItem label="期望月薪：" prop="sex" >
                  <Select v-model="registerForm.sex"  placeholder="请选择期望月薪" clearable style="width:300px;">
                    <Option v-for="item in sexOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
              </div>
            </div>
          </div>
            <div class="searchRes-project" style="padding:20px 0px 20px 0px;">
              <div class="row" style="padding:0px 20px 0px 40px;">
                <div>
                  <span style="width:4px;font-size:18px;background-color:#35BACB;height:20px;">&nbsp;</span>
                  <span style="color:#35BACB;font-size:22px;">&nbsp;&nbsp;工作经验</span>
                </div>
              </div>
              <hr align="center" style="border-bottom:1px solid #EBEBEB;border-top:none;margin-top:20px;margin-bottom:20px;" />
              <div class="row" style="padding:0px 120px 0px 100px;font-size:16px;">
                <div style="">
                  <FormItem label="公司名称：" prop="sex">
                    <Input v-model="registerForm.phone" placeholder="请输入公司名称" style="width:300px;" />
                  </FormItem>
                  <FormItem label="职位名称：" prop="sex" style="float:right;">
                    <Input v-model="registerForm.phone" placeholder="请输入职位名称" style="width:300px;" />
                  </FormItem>
                  <FormItem label="在职时间：">
                    <Row>
                      <Col span="10">
                      <DatePicker type="date" placeholder="请选择开始时间" v-model="registerForm.startDate" style="width:300px;"></DatePicker>
                      </Col>
                      <Col span="4" style="text-align:center;padding-left:30px;">至</Col>
                      <Col span="10">
                      <DatePicker type="date" placeholder="请选择结束时间" v-model="registerForm.endDate" style="width:300px;"></DatePicker>
                      </Col>
                    </Row>
                  </FormItem>
                  <FormItem label="工作描述：" prop="JobDesc">
                    <Input v-model="registerForm.JobDesc" type="textarea" :autosize="{minRows: 3,maxRows: 5}" placeholder="请输入工作描述" style="width:820px;"></Input>
                  </FormItem>
                </div>
              </div>
            </div>
          </Form>
          <div style="text-align:center;margin-top:37px;">
            <button class="register-btn" @click="submitRegister('registerForm')">确认提交</button>
          </div>

        </div>
      </div>
    <Footer></Footer>
  </div>
</template>

<script>
    import Header from "../components/common/header.vue";
    import Footer from "../components/common/footer.vue";
    import { getSelectValueDesc } from '../../../api/common.js'
    import { Button,Form,FormItem,Input,Select,Option,Upload,Progress,Icon,Modal,DatePicker,Row,Col } from 'iview';
    export default {
        name: 'home',
        components: {
            Footer,Header,Button,Form,FormItem,Input,Select,Option,Upload,Progress,Icon,Modal,DatePicker,Row,Col
        },
        data() {
            const pwdValidate = (rule, value, callback) => {
                this.$refs.registerForm.validateField('conPwd');
                callback();
            };
            const pwdCheckValidate = (rule, value, callback) => {
                if (this.registerForm.pwd != '' && value == '') {
                    callback(new Error('确认密码不能为空'));
                } else if (this.registerForm.pwd != value) {
                    callback(new Error('密码和确认密码应相同'));
                } else {
                    callback();
                }
            };
            return {
                sexOption:[],
                registerForm:{
                    name:'',
                    pwd:'',
                    conPwd:'',
                    empName:'',
                    sex:'',
                    birthday:'',
                    startDate:'',
                    endDate:'',
                    organizationLevel:'',
                    bedPlace:'',
                    phone:'',
                    url:'',
                    address:'',
                    organizationBrief:'',
                    organizationUrl:'',
                    certificateUrl:''
                },
                ruleValidate: {
                    name:[
                        {required: true, message: '此项必填', trigger: 'blur'},
                    ],
                    pwd: [
                        {required: true, validator: pwdValidate, trigger: 'blur'}
                    ],
                    conPwd: [
                        {required: true, validator: pwdCheckValidate, trigger: 'blur'}
                    ],
                    hospitalName:[
                        {required: true, message: '此项必填', trigger: 'blur'},
                    ],
                    organizationLevel:[
                        {required: true, message: '此项必填', trigger: 'blur'},
                    ],
                    bedPlace:[
                        {required: true, message: '此项必填', trigger: 'blur'},
                        {type:'string',pattern: /^[0-9]+$/, message: '请输入数字',trigger: 'change'}
                    ],
                    phone:[
                        {required: true, message: '此项必填', trigger: 'blur'},
                    ],
                    url:[
                        {required: true, message: '此项必填', trigger: 'blur'},
                    ],
                    address:[
                        {required: true, message: '此项必填', trigger: 'blur'},
                    ],
                    organizationBrief:[
                        {required: true, message: '此项必填', trigger: 'blur'},
                    ],
                    organizationUrl:[
                        {required: true, message: '此项必填', trigger: 'blur'},
                    ],
                    certificateUrl:[
                        {required: true, message: '此项必填', trigger: 'blur'},
                    ],
                },
            };
        },
        created() {
            let sex = {
                "key": 'STATUS_GENDER'
            }
            getSelectValueDesc(sex).then(res => {
                console.log('res.data.msg=='+JSON.stringify(res.data.msg));
                if(res.data.code = 200){
                    this.sexOption = res.data.msg
                }
            })
        },
        mounted() {

        },
        methods:{
            submitRegister(name){
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        let data = {
                            "name":this.registerForm.name,
                            "pwd":this.registerForm.pwd,
                            "conPwd":this.registerForm.conPwd,
                            "empName":this.registerForm.empName,

                            "hospitalName":this.registerForm.hospitalName,
                            "registerForm":this.registerForm.registerForm,
                            "mainType":this.registerForm.mainType,
                            "organizationLevel":this.registerForm.organizationLevel,
                            "bedPlace":this.registerForm.bedPlace,
                            "phone":this.registerForm.phone,
                            "url":this.registerForm.url,
                            "address":this.registerForm.address,
                            "organizationBrief":this.registerForm.organizationBrief,
                            "organizationUrl":this.registerForm.organizationUrl,
                            "certificateUrl":this.registerForm.certificateUrl
                        }
                        console.log('data==='+JSON.stringify(data));
                        hospitalCompanyAdd(data).then(res => {
                            console.log(res);
                            if (res.data.code == 200) {
                                alert('注册成功');
                                    /*let data = {
                                        userName: this.userName,
                                        password: this.password
                                    }
                                    login(data).then(res => {
                                        if (res.data.code === '200') {
                                            this.$router.push('/admin')
                                        } else {
                                            alert(res.data.msg)
                                        }
                                    })*/
                                this.registerForm={};
                                this.uploadList=[];
                                this.certPicList=[];
                            } else {
                                alert('----'+res.data.msg);
                               // this.$Message.error(res.data.msg);
                            }
                        })
                    }
                })
            }



        },

    }
</script>
<style>
  .register-btn{background-color:#35BACB;color:#ffffff;border:1px solid #35BACB;width:238px;height:56px;border-radius:28px}
  .bgColor{background-color:#F5F5F5;padding-bottom:30px;}
  .searchRes-project{margin-top:30px;background-color:#fff;padding:30px 0px 10px 0px;}
  .searchRes-project p{margin:0px 0px 10px;}
  .ivu-input{
    height:40px!important;
    /*border: 1px solid #999999!important;*/
  }
  .ivu-select-single .ivu-select-selection .ivu-select-placeholder, .ivu-select-single .ivu-select-selection .ivu-select-selected-value{
    height: 40px!important;
    line-height: 40px!important;
  }
  .ivu-select-single .ivu-select-selection{
    height: 40px!important;
  }
  .ivu-form .ivu-form-item-label{
    padding: 13px 12px 10px 0!important;
    font-size: 16px!important;
    font-weight:500;
    color: #333333!important;
  }
  .demo-upload-list{
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin-right: 4px;
  }
  .demo-upload-list img{
    width: 100%;
    height: 100%;
  }
  .demo-upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
  }
  .demo-upload-list:hover .demo-upload-list-cover{
    display: block;
  }
  .demo-upload-list-cover i{
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
  .quill-editor {
    height:245px;
  }
  .ql-container{
    height:67% !important;
  }
</style>
