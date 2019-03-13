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
                <span style="color:#35BACB;font-size:22px;">&nbsp;&nbsp;机构基本信息</span>
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
                <FormItem label="确认密码：" prop="conPwd" >
                  <Input v-model="registerForm.conPwd" type="password" placeholder="请输入确认密码" style="width:300px;" />
                </FormItem>
                  <FormItem label="机构名称：" prop="hospitalName" style="float:right;">
                    <Input v-model="registerForm.hospitalName" placeholder="请输入机构名称" style="width:300px;" />
                  </FormItem>
                  <FormItem label="主做类型：" prop="mainType">
                    <Select v-model="registerForm.mainType"  placeholder="请选择所属科室" clearable style="width:300px;">
                      <Option v-for="item in mainTypeOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                  </FormItem>
                  <FormItem label="机构级别：" prop="organizationLevel" style="float:right;">
                    <Input v-model="registerForm.organizationLevel" placeholder="请输入机构的级别" style="width:300px;" />
                  </FormItem>
                  <FormItem label="床位：" prop="bedPlace">
                    <Input v-model="registerForm.bedPlace" placeholder="请输入床位个数" style="width:300px;" />
                  </FormItem>
                  <FormItem label="联系电话：" prop="phone" style="float:right;">
                    <Input v-model="registerForm.phone" placeholder="请输入联系电话" style="width:300px;" />
                  </FormItem>
                  <FormItem label="网址：" prop="url">
                    <Input v-model="registerForm.url" placeholder="请输入机构网址" style="width:300px;" />
                  </FormItem>
                  <FormItem label="地址：" prop="address" >
                    <Input v-model="registerForm.address" placeholder="请输入机构网址" style="width:820px;" />
                  </FormItem>
                  <FormItem label="机构简介：" prop="organizationBrief">
                    <quill-editor  v-model="registerForm.organizationBrief"
                                   :options="editorOption"
                                   @blur="onEditorBlur($event)"
                                   @focus="onEditorFocus($event)"
                                   @change="onEditorChange($event)">
                    </quill-editor>
                    <!--<Input v-model="registerForm.organizationBrief" placeholder="请输入机构名称" style="width:850px;" />-->
                  </FormItem>
                  <FormItem label="机构照片：" prop="organizationUrl">
                    <div class="demo-upload-list" v-for="item in uploadList">
                      <template v-if="item.status === 'finished'">
                        <img :src="imgSrc+item.url">
                        <div class="demo-upload-list-cover">
                          <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                          <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                        </div>
                      </template>
                      <template v-else>
                        <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                      </template>
                    </div><!--:default-file-list="defaultList"-->
                    <Upload ref="upload" :show-upload-list="false"
                            :on-success="handleSuccess"
                            :format="['jpg','jpeg','png']"
                            :max-size="500"
                            :on-format-error="handleFormatError"
                            :on-exceeded-size="handleMaxSize"
                            :before-upload="handleBeforeUpload"
                            multiple
                            type="drag"
                            action="//jsonplaceholder.typicode.com/posts/"
                            style="display: inline-block;width:58px;">
                      <div style="width: 58px;height:58px;line-height: 58px;">
                        <Icon type="ios-camera" size="20"></Icon>
                      </div>
                    </Upload>
                    <div style="color:#999999">
                      共可上传{{certPicList.length}}/4张图片（图片尺寸1920px * 520px,354px * 260px,大小请不要超过500k）
                    </div>
                  </FormItem>
              </div>
            </div>
          </div>
          <div class="searchRes-project" style="padding:20px 0px 20px 0px;">
            <div class="row" style="padding:0px 20px 0px 40px;">
              <div>
                <span style="width:4px;font-size:18px;background-color:#35BACB;height:20px;">&nbsp;</span>
                <span style="color:#35BACB;font-size:22px;">&nbsp;&nbsp;机构认证信息</span>
              </div>
            </div>
            <hr align="center" style="border-bottom:1px solid #EBEBEB;border-top:none;margin-top:20px;margin-bottom:20px;" />
            <div class="row" style="padding:0px 120px 0px 100px;font-size:16px;">
              <div style="">
                  <FormItem label="认证证书：" prop="certificateUrl">
                    <div class="demo-upload-list" v-for="item in certPicList">
                      <template v-if="item.status === 'finished'">
                        <img :src="imgSrc+item.url">
                        <div class="demo-upload-list-cover">
                          <Icon type="ios-eye-outline" @click.native="handleCertView(item.url)"></Icon>
                          <Icon type="ios-trash-outline" @click.native="handleCertRemove(item)"></Icon>
                        </div>
                      </template>
                      <template v-else>
                        <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                      </template>
                    </div>
                    <Upload ref="uploadCert" :show-upload-list="false"
                            :on-success="handleCertSuccess"
                            :format="['jpg','jpeg','png']"
                            :max-size="500"
                            :on-format-error="handleCertFormatError"
                            :on-exceeded-size="handleCertMaxSize"
                            :before-upload="handleCertBeforeUpload"
                            multiple
                            type="drag"
                            action="//jsonplaceholder.typicode.com/posts/"
                            style="display: inline-block;width:58px;">
                      <div style="width: 58px;height:58px;line-height: 58px;">
                        <Icon type="ios-camera" size="20"></Icon>
                      </div>
                    </Upload>
                    <div style="color:#999999">
                      共可上传{{certPicList.length}}/4张图片（图片尺寸1920px * 520px,354px * 260px,大小请不要超过500k）
                    </div>
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
    <Modal title="查看图片" v-model="visible">
      <img :src="imgSrc+imgUrl" v-if="visible" style="width: 100%"/>
    </Modal>
    <Modal title="提示" v-model="isMessage">
        <p>{{someMessage}}</p>
    </Modal>
    <Footer></Footer>
  </div>
</template>

<script>
    import Header from "../components/common/header.vue";
    import Footer from "../components/common/footer.vue";
    import { login } from '../../../api/user.js'
    import { upLoadFile,hospitalCompanyAdd } from '../../../api/common.js'
    import { serverSrc } from '../../../api/global.js'
    import { Button,Form,FormItem,Input,Select,Option,Upload,Progress,Icon,Modal } from 'iview';
    import { quillEditor } from 'vue-quill-editor'
    export default {
        name: 'home',
        components: {
            Footer,Header,Button,Form,FormItem,Input,Select,Option,Upload,Progress,Icon,Modal,
            quillEditor
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
                editorOption:{},
                mainTypeOption:[],
                registerForm:{
                    name:'',
                    pwd:'',
                    conPwd:'',
                    hospitalName:'',
                    mainType:'',
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
                    /*mainType:[
                        {required: true, message: '此项必填', trigger: 'blur'},
                    ],*/
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
                insideSrc: '',
                isMessage:false,
                someMessage:'',
                imgSrc:serverSrc+'/admin/common/preview?fileUrl=',
                imgUrl: '',
                visible: false,
                uploadList: [],
                originalFileName:'',
                fileUrl:'',
                uploadListUrl:[],
                certPicList:[],
                certPicListUrl:[],
            };
        },
        created() {

        },
        mounted() {
            this.uploadList = this.$refs.upload.fileList;
            this.certPicList = this.$refs.uploadCert.fileList;

        },
        methods:{
            onEditorBlur(editor){//失去焦点事件
            },
            onEditorFocus(editor){//获得焦点事件
            },
            onEditorChange({editor,html,text}){//编辑器文本发生变化
                //this.content可以实时获取到当前编辑器内的文本内容
                console.log(this.content);
            },
            handleView (url) {
                this.imgUrl = url;
                this.visible = true;
            },
            handleRemove (file) {
                const fileList = this.$refs.upload.fileList;
                this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
            },
            handleSuccess (res, file) {
              file.url = this.fileUrl;
              file.name = this.originalFileName;
            },
            handleFormatError (file) {
                this.isMessage=true;
                this.someMessage='选择正确的图片格式';
            },
            handleMaxSize (file) {
                this.isMessage=true;
                this.someMessage='大小请不要超过500k';
            },
            handleBeforeUpload (file) {
                const check = this.uploadList.length < 4;
                if (!check) {
                    this.isMessage=true;
                    this.someMessage='图片不能超过4个';
                    return check;
                }else{
                    const formData = new FormData();
                    formData.append('upfile', file);
                    upLoadFile(formData).then(res => {
                        if (res.data.code === '200') {
                           // alert('上传成功');
                            console.log('res.data.map='+JSON.stringify(res.data.map));
                            this.fileUrl = res.data.map.fileUrl;
                            this.originalFileName = res.data.map.originalFileName;
                        }
                    })
                }
            },
//CERT
            handleCertView (url) {
                this.imgUrl = url;
                this.visible = true;
            },
            handleCertRemove (file) {
                const fileList = this.$refs.uploadCert.fileList;
                this.$refs.uploadCert.fileList.splice(fileList.indexOf(file), 1);
            },
            handleCertSuccess (res, file) {
                //console.log('res=='+JSON.stringify(res)+"==="+JSON.stringify(file));
                file.url = this.fileUrl;
                file.name = this.originalFileName;
            },
            handleCertFormatError (file) {
                this.isMessage=true;
                this.someMessage='选择正确的图片格式';
            },
            handleCertMaxSize (file) {
                this.isMessage=true;
                this.someMessage='大小请不要超过500k';
            },
            handleCertBeforeUpload (file) {
                const check = this.certPicList.length < 4;
                if (!check) {
                    this.isMessage=true;
                    this.someMessage='图片不能超过4个';
                    return check;
                }else{
                    const formData = new FormData();
                    formData.append('upfile', file);
                    upLoadFile(formData).then(res => {
                        if (res.data.code === '200') {
                            // alert('上传成功');
                            this.fileUrl='';
                            this.originalFileName='';
                           // console.log('res.data.map='+JSON.stringify(res.data.map));
                            this.fileUrl = res.data.map.fileUrl;
                            this.originalFileName = res.data.map.originalFileName;
                        }
                    })
                }
            },
            submitRegister(name){
                //.log('certPicList==='+JSON.stringify(this.certPicList));
                for(let i=0;i<this.uploadList.length;i++){
                    this.uploadListUrl.push(this.uploadList[i].url);
                }
                this.registerForm.organizationUrl=this.uploadListUrl.join(";");
                for(let i=0;i<this.certPicList.length;i++){
                    this.certPicListUrl.push(this.certPicList[i].url);
                }
                this.registerForm.certificateUrl=this.certPicListUrl.join(";");
                //console.log('this.registerForm.certificateUrl=='+this.registerForm.certificateUrl);
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        let data = {
                            "name":this.registerForm.name,
                            "pwd":this.registerForm.pwd,
                            "conPwd":this.registerForm.conPwd,
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
                                this.isMessage=true;
                                this.someMessage='注册成功';
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
