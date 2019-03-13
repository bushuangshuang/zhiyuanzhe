<template>
  <div class="home" id="login1">
    <Header menu-title="登录"></Header>
    <div class="login-bg">
      <div class="container" style="text-align:center;padding-right:30px;padding-left:30px;">
        <h2 style="color:#ffffff;padding:65px 0px;letter-spacing:2px;text-align: center;">欢迎您登录本平台~</h2>
        <div class="row" style="text-align:left;padding-bottom:114px;">
          <img src="../../../assets/img/login-left.jpg" class="col-lg-6 col-md-6 col-xs-6" style="padding-right: 0px;">
          <div class="col-lg-6 col-md-6 col-xs-6" style="height:100%;padding:118px 89px 47px 50px;background-color:#fff;">
            <form class="form-horizontal" role="form" @keydown.enter.native="toLogin">
              <div class="form-group">
                <label class="col-xs-2 control-label" style="margin-top:8px;">账号</label>
                <div class="col-xs-10">
                  <input type="text" class="form-control" placeholder="请输入账号" v-model="userName">
                </div>
              </div>
              <div class="form-group">
                <label class="col-xs-2 control-label" style="margin-top:38px;">密码</label>
                <div class="col-xs-10" style="margin-top:30px;">
                  <input type="password" class="form-control" placeholder="请输入密码" v-model="password">
                </div>
              </div>
              <div class="form-group">
                <div class="col-sm-offset-2 col-xs-10">
                  <p v-if="isError" class="login-tip" style="color:red;">{{errorMsg}}</p>
                  <p v-if="isError==true?false:true" class="login-tip" style="">{{errorMsg}}</p>
                </div>
              </div>
              <div class="form-group">
                <div class="col-sm-offset-2 col-xs-10">
                  <button type="button" class="btn btn-default login-btn" @click="toLogin">登录</button>
                </div>
              </div>
              <div class="form-group">
                <div class="col-sm-offset-2 col-xs-10">
                  <a href="#" @click="toRegister" style="color: #35BACB">立即注册</a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <Modal v-model="isChooseModel" width="800" :mask-closeable="false">
      <p slot="header" style="font-size:18px;">请选择您的角色</p>
      <div style="text-align:center;padding:24px 90px 72px 90px;color:#333333;font-size:18px;">
        <div class="row">
          <div class="col-xs-4" style="text-align:left" @click="toMechanism">
            <img src="../../../assets/img/per3.png" />
            <span style="margin-left:14px;">医疗机构</span>
          </div>
          <div class="col-xs-4" style="text-align: left" @click="toCroRegister">
            <img src="../../../assets/img/per2.png" />
            <span style="margin-left:14px;">CRO公司</span>
          </div>
          <div class="col-xs-4" style="text-align: left" @click="toBidRegister">
            <img src="../../../assets/img/per1.png" />
            <span style="margin-left:14px;">申办方</span>
          </div>
        </div>
        <div class="row" style="padding-top:52px;">
          <div class="col-xs-4" style="text-align: left">
            <img src="../../../assets/img/per.png" @click="toPerRegister" />
            <span style="margin-left:14px;">健康志愿者</span>
          </div>
          <div class="col-xs-4" style="text-align: left">
            <img src="../../../assets/img/per.png" @click="toPerRegister" />
            <span style="margin-left:14px;">患者志愿者</span>
          </div>
          <div class="col-xs-4" style="text-align: left">
            <img src="../../../assets/img/per.png" @click="toCrcRegister" />
            <span style="margin-left:14px;">CRC</span>
          </div>
        </div>
      </div>
      <div slot="footer">
      </div>
    </Modal>
    <Footer></Footer>
  </div>
</template>

<script>
    import Header from "../components/common/header.vue";
    import Footer from "../components/common/footer.vue";
    import { storage } from '../../../libs/common.js'
    import { login,admin } from '../../../api/user.js'
    import { Button,Modal } from 'iview';
    import { serverSrc } from '../../../api/global.js'
    export default {
        name: 'home',
        components: {
            Footer,
            Header,
            Button,Modal
        },
        data() {
            return {
                msg: "这里是首页！",
                interval: 0,
                indicators: true,
                controls: false,
                userName: '',
                password: '',
                isError:false,
                errorMsg:'请输入正确的用户名和密码',
                isChooseModel:false

            };
        },
        methods:{
            toLogin() {
                let data = {
                    userName: this.userName,
                    password: this.password
                }
                login(data).then(res => {
                    if (res.data.code == 200) {
                        console.log('storage', storage);
                        storage.setItem('userName', this.userName);
                        storage.setItem('route', res.data.account.menus);
                        storage.setItem('roles',res.data.account.roles[0].name);
                        console.log('roles==--', localStorage.getItem('roles'));
                        console.log('res', res);
                        //window.location.href = serverSrc+"/doAdmin"+'#/admin.html'
                        // console.log('userInfo=='+this.userName);
                        this.$router.push('/admin')
                    } else {
                        this.isError=true;
                        this.errorMsg=res.data.msg;
                        //alert(res.data.msg);
                        console.log('loginError=='+res.data.msg);
                    }
                })
            },
            toRegister(){
                this.isChooseModel=true;
            },
            toMechanism(){
                this.isChooseModel=false;
                this.$router.push('/register');
            },
            toCroRegister(){
                this.isChooseModel=false;
                this.$router.push('/registerCro');
            },
            toBidRegister(){
                this.isChooseModel=false;
                this.$router.push('/registerBid');
            },
            toPerRegister(){
                this.isChooseModel=false;
                this.$router.push('/registerPer');
            },
            toCrcRegister(){
                this.isChooseModel=false;
                this.$router.push('/registerCrc');
            }
        },
        created() {},
        mounted() {
        }
    }
</script>
<style type="less">
  #login1{
    .ivu-modal-content{
      border-radius:0px!important;
    }
    .ivu-modal-header{
      background-color:#35BACB!important;;
      color:#ffffff!important;;
      padding:12px 16px!important;;
    }
    .ivu-modal-header p, .ivu-modal-header-inner{
      height:24px!important;;
      line-height:24px!important;;
      font-family: 'SourceHanSansCN-Normal';
    }
    .ivu-modal-close .ivu-icon-ios-close{
      color: #fff!important;
    }
    .ivu-modal-footer{
      display: none!important;
    }
  }
  .form-control{
    height: 46px;
  }
  .input-group .form-control{
    width:360px;
  }
  .login-bg{background:url("../../../assets/img/login-bg.jpg") center no-repeat}
  .login-btn{width:100%;height:46px;background-color:#35BACB;color:#ffffff;border:none;margin-top: 41px;}
  btn-default:hover {
    color: #fff!important;
    background-color: #35BACB!important;
    border-color: #35BACB!important;
  }
  .btn.focus, .btn:focus, .btn:hover {
    color: #fff!important;
    text-decoration: none;
    background-color: #35BACB!important;
    border-color: #35BACB!important;
  }
  .btn-default.active.focus, .btn-default.active:focus, .btn-default.active:hover, .btn-default:active.focus, .btn-default:active:focus, .btn-default:active:hover, .open>.dropdown-toggle.btn-default.focus, .open>.dropdown-toggle.btn-default:focus, .open>.dropdown-toggle.btn-default:hover{
    background-color: #35BACB!important;
    color: #fff!important;
  }
  .login-tip{
    font-size: 10px;
    text-align: left;
    color: #c3c3c3;
  }
</style>
