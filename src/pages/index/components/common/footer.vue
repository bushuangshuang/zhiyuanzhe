<template>
  <footer>
    <div class="footer-topbox container" style="height:200px;padding-top:26px;" >
      <div class="compinfo" style="padding-right:148px;border-right:1px #DADADA solid;" ref="leftBox">
        <h4>联系我们</h4>
        <p>客服电话：010 - 12345678</p>
        <p>邮箱：zxzy@zhaomu.com</p>
        <p>QQ：5751234567</p>
      </div>
      <div class="compinfo" style="padding-left:148px;padding-right:148px;border-right:1px #DADADA solid;">
        <h4>友情链接</h4>
        <p>药物临床试验登记与信息公示平台</p>
        <p>国家食品药监局监督管理总局</p>
        <p>中国临床试验注册中心</p>
      </div>
      <div class="compinfo" style="padding-left:148px;text-align:center;vertical-align:top;">
        <img src="../../../../assets/img/QRcode.jpg" style="width:127px;">
        <p>扫一扫关注公众号</p>
      </div>
    </div>
  </footer>
</template>
<script>
import "../../../../assets/bootstrap/css/bootstrap.min.css"
export default {
  data() {
    return {
      footerLtH: 0
    };
  },
  methods: {
    showLstHeight:function (){
      let leftHeight = this.$refs.leftBox.offsetHeight
      this.footerLtH = leftHeight
    }
  },
  created() {
    setTimeout(() => {
      this.showLstHeight()
    }, 500)
    },
  mounted() {
  },
  beforeUpdate() {

  }
};
</script>
<style>
footer {
  background: #000000;
  color: #fff;
}
.compinfo{
  display: inline-block;
  text-align: left;
}
.compinfo h4{
  margin:0;
  padding:10px 0 20px;
}
.compinfo p{
  margin:0;
  padding-bottom:6px;
}
.compinfo img{
  /*vertical-align:top;*/
  border:none;
  display: inline-block;
}
.qrcodebox{
  padding:5px 0;
}
.qrcodebox p{
  padding-bottom:6px;
  margin-bottom:0;
}
.qrcodebox ul{
  padding:0;
  margin-bottom:0;
}
.qrcodebox li img{
  width:100%;
  height:auto;
}
.qrcodebox li p{
  text-align:center;
  padding: 8px 0;
  margin:0;
}
.footer-bottom{
  background: #263643
}
.footer-bottom p{
  text-align: center;
  line-height: 1.4rem;
  padding:8px 0;
  font-size: 1.2rem;
  margin:0;
}
</style>
