<template>
  <header id="header1">
    <nav class="container hph-navbar navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a href="index.html" class="navbar-brand logo-link">
            <img src="../../../../assets/img/logo.png" class="img-responsive">
          </a>
        </div>
        <div class="navbar-collapse collapse">
          <ul class="nav navbar-nav navbar-right">
            <li :class="[menuTxt==='首页'?'df-active':'','submenu-box']">
              <a href="/" class="submenu">首页</a>
              <!--<router-link to="/">首页</router-link>-->
            </li>
            <li :class="[menuTxt==='医疗机构'?'df-active':'','submenu-box']">
             <a href="/healthInfo" class="submenu">医疗机构</a>
            </li>
            <li :class="[menuTxt==='志愿者'?'df-active':'','submenu-box']">
              <a href="/infoList" class="submenu">志愿者</a>
            </li>
            <li :class="[menuTxt==='申办方'?'df-active':'','submenu-box']">
              <a href="/biddingParty" class="submenu">申办方</a>
            </li>
            <li :class="[menuTxt==='CRO公司'?'df-active':'','submenu-box']">
              <a href="/cro" class="submenu">CRO公司</a>
            </li>
            <li :class="[menuTxt==='CRC专栏'?'df-active':'','submenu-box']">
              <a href="/crc" class="submenu">CRC专栏</a>
            </li>
            <li :class="[menuTxt==='新闻中心'?'df-active':'','submenu-box']">
              <a href="/news" class="submenu">新闻中心</a>
            </li>
            <li :class="[menuTxt==='登录'?'df-active':'','submenu-box']">
              <a href="/login" class="submenu" style="padding:30px 7px 30px 30px;font-size: 1.6rem;">登录</a>
            </li>
            <li>
              <a href="/" class="submenu" style="padding:30px 0px 30px 0px;font-size: 1.6rem;">|</a>
            </li>
            <li :class="[menuTxt==='注册'?'df-active':'','submenu-box']">
              <a href="#" @click="toChoose" class="submenu" style="padding:30px 0px 30px 7px;font-size: 1.6rem;">注册</a>
            </li>
          </ul>
        </div>
      </div>
      <Modal v-model="isChooseModel" width="800" :mask-closeable="false">
        <p slot="header" style="font-size:18px;">请选择您的角色</p>
        <div style="text-align:center;padding:24px 90px 72px 90px;color:#333333;font-size:18px;">
          <div class="row">
            <div class="col-xs-4" style="text-align:left" @click="toMechanism">
              <img src="../../../../assets/img/per3.png" />
              <span style="margin-left:14px;">医疗机构</span>
            </div>
            <div class="col-xs-4" style="text-align: left" @click="toCroRegister">
              <img src="../../../../assets/img/per2.png" />
              <span style="margin-left:14px;">CRO公司</span>
            </div>
            <div class="col-xs-4" style="text-align: left" @click="toBidRegister">
              <img src="../../../../assets/img/per1.png" />
              <span style="margin-left:14px;">申办方</span>
            </div>
          </div>
          <div class="row" style="padding-top:52px;">
            <div class="col-xs-4" style="text-align: left" @click="toPerRegister">
              <img src="../../../../assets/img/per.png" />
              <span style="margin-left:14px;">健康志愿者</span>
            </div>
            <div class="col-xs-4" style="text-align: left" @click="toPerRegister">
              <img src="../../../../assets/img/per.png" />
              <span style="margin-left:14px;">患者志愿者</span>
            </div>
            <div class="col-xs-4" style="text-align: left" @click="toCrcRegister">
              <img src="../../../../assets/img/per.png" />
              <span style="margin-left:14px;">CRC</span>
            </div>
          </div>
        </div>
        <div slot="footer">
        </div>
      </Modal>
    </nav>
  </header>
</template>
<script>
import '../../../../assets/bootstrap/css/bootstrap.min.css'
import { Modal } from 'iview';
export default {
  props: ['menuTitle'],
  components: { Modal },
  data () {
    return {
      menuTxt:this.menuTitle,
      isChooseModel:false,
    }
  },

  created () {
  },
  mounted (){
  },
  methods: {
      toChoose(){
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

}
</script>
<style type="less">
  #header1{
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
  *{
    font-family: 'Source HanSans CN';
  }
header{
  border-bottom:1px solid #e5e5e5!important;
}
.hph-navbar{
  background: #fff!important;
  border: none!important;
  margin-bottom: 0px!important;
}
.logo-link {
  padding: 27px 6px!important;
}
.submenu-box>a{
  color:#000!important;
  font-size: 1.6rem!important;
}
.navbar-nav>li>a{
  padding-top: 30px!important;
  padding-bottom: 30px!important;
}
.df-active>a{
	background-color: #fff!important;
  color:#35BACB!important;
}
.container-fluid{
  padding-right: 0px !important;
}

</style>
