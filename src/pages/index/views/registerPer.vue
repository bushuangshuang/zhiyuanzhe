<template>
  <div class="home">
    <Header menu-title="注册"></Header>
      <div class="bgColor">
        <div class="container list-title">
          <Form ref="registerForm" :model="registerForm" :label-width="150" :rules="ruleValidate">
          <div class="searchRes-project" style="padding:20px 0px 20px 0px;">
            <div class="row" style="padding:0px 20px 0px 40px;">
              <div>
                <span style="width:4px;font-size:18px;background-color:#35BACB;height:20px;">&nbsp;</span>
                <span style="color:#35BACB;font-size:22px;">&nbsp;&nbsp;个人基本信息</span>
              </div>
            </div>
            <hr align="center" style="border-bottom:1px solid #EBEBEB;border-top:none;margin-top:20px;margin-bottom:20px;" />
            <div class="row" style="padding:0px 120px 0px 100px;font-size:16px;">
              <div style="">
                  <FormItem label="账号：" prop="name">
                      <Input v-model="registerForm.name" placeholder="请输入账号" style="width:800px;" />
                  </FormItem>
                  <FormItem label="密码：" prop="pwd">
                      <Input v-model="registerForm.pwd" type="password" placeholder="请输入密码" style="width:800px;" />
                  </FormItem>
                  <FormItem label="确认密码：" prop="conPwd" >
                      <Input v-model="registerForm.conPwd" type="password" placeholder="请输入确认密码" style="width:800px;" />
                  </FormItem>
                  <FormItem label="姓名：" prop="empName">
                    <Input v-model="registerForm.empName" placeholder="请输入姓名" style="width:800px;" />
                  </FormItem>
                  <FormItem label="性别：" prop="sex">
                    <Select v-model="registerForm.sex"  placeholder="请选择性别" clearable style="width:800px;">
                      <Option v-for="item in sexOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                  </FormItem>
                  <FormItem label="身份证号：" prop="ident">
                    <Input v-model="registerForm.ident" placeholder="请输入身份证号" style="width:800px;" />
                  </FormItem>
                  <FormItem label="手机号：" prop="phone">
                    <Input v-model="registerForm.phone" placeholder="请输入手机号" style="width:800px;" />
                  </FormItem>
                  <FormItem label="民族：" prop="nation">
                    <Input v-model="registerForm.nation" placeholder="请输入民族"style="width:800px;" />
                  </FormItem>
                  <FormItem label="婚姻状况：" prop="marriageStu">
                    <Select v-model="registerForm.marriageStu"  placeholder="请选择婚姻状况" clearable style="width:800px;">
                      <Option v-for="item in marriageOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                  </FormItem>
                  <FormItem label="身高：" prop="height" >
                    <Input v-model="registerForm.height" placeholder="请输入身高" style="width:770px;" /><span style="font-size:16px;">&nbsp;&nbsp;cm</span>
                  </FormItem>
                  <FormItem label="体重：" prop="weight" >
                    <Input v-model="registerForm.weight" placeholder="请输入体重" style="width:770px;" /><span style="font-size:16px;">&nbsp;&nbsp;kg</span>
                  </FormItem>
                <FormItem label="吸烟状况：" prop="smokeStu" >
                  <Input v-model="registerForm.smokeStu" placeholder="请输入吸烟状况" style="width:800px;" />
                </FormItem>
                <FormItem label="疾病状况：" prop="diseaseStu" >
                    <Select v-model="registerForm.diseaseStu"  placeholder="请输入疾病状况" clearable style="width:800px;">
                        <Option v-for="item in diseaseOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
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
    import { registerPerAdd,getSelectValueDesc } from '../../../api/common.js'
    import { Button,Form,FormItem,Input,Select,Option,Upload,Progress,Icon,Modal } from 'iview';
    export default {
        name: 'home',
        components: {
            Footer,Header,Button,Form,FormItem,Input,Select,Option,Upload,Progress,Icon,Modal
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
                marriageOption:[],
                diseaseOption:[],
                registerForm:{
                    name:'',
                    pwd:'',
                    conPwd:'',
                    empName:'',
                    sex:'',
                    ident:'',
                    phone:'',
                    nation:'',
                    marriageStu:'',
                    height:'',
                    weight:'',
                    smokeStu:'',
                    diseaseStu:''
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
                    empName:[
                        {required: true, message: '此项必填', trigger: 'blur'},
                    ],
                    sex:[
                        {required: true, message: '此项必填', trigger: 'blur'},
                    ],
                    ident:[
                        {required: true, message: '此项必填', trigger: 'blur'},
                        {type: 'string', pattern: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/, message: '身份证号码不合法',trigger: 'change'}
                    ],
                    phone:[
                        {required: true, message: '此项必填', trigger: 'blur'},
                    ],
                    nation:[
                        {required: true, message: '此项必填', trigger: 'blur'},
                    ],
                    marriageStu:[
                        {required: true, message: '此项必填', trigger: 'blur'},
                    ],
                    height:[
                        {required: true, message: '此项必填', trigger: 'blur'},
                    ],
                    weight:[
                        {required: true, message: '此项必填', trigger: 'blur'},
                    ],
                    smokeStu:[
                        {required: true, message: '此项必填', trigger: 'blur'},
                    ],
                    diseaseStu:[
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
            let marriage = {
                "key": 'STATUS_MARITAL'
            }
            getSelectValueDesc(marriage).then(res => {
                if(res.data.code = 200) {
                    this.marriageOption = res.data.msg
                }
            })
            let disease = {
                "key": 'STATUS_DISEASE'
            }
            getSelectValueDesc(disease).then(res => {
                if(res.data.code = 200) {
                    this.diseaseOption = res.data.msg
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
                            "sex":this.registerForm.sex,
                            "idCard":this.registerForm.ident,
                            "phone":this.registerForm.phone,
                            "nation":this.registerForm.nation,
                            "maritalStatus":this.registerForm.marriageStu,
                            "height":this.registerForm.height,
                            "weight":this.registerForm.weight,
                            "isSmoke":this.registerForm.smokeStu,
                            "isDisease":this.registerForm.diseaseStu
                        }
                        console.log('data==='+JSON.stringify(data));
                        registerPerAdd(data).then(res => {
                            console.log(res);
                            if (res.data.code == 200) {
                                alert('注册成功');
                                this.registerForm={};
                                this.uploadList=[];
                                this.certPicList=[];
                            } else {
                                alert('----'+res.data.msg);
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
