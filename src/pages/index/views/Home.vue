<template>
  <div class="home">
    <Header menu-title="首页"></Header>
    <section>
      <img src="../../../assets/img/banner.jpg" style="width:100%;background-size:100% 100%;"/>
    </section>
    <section>
      <div class="index_01" >
        <div class="col-lg-5 col-md-5 col-xs-12">
        </div>
        <div class="col-lg-5 col-md-5 col-xs-12 index_01_con">
          <h2 class="title1">医疗机构</h2>
          <div class="title2">—</div>
          <p class="index_01_title1">Medical Institution</p>
          <div class="index_01_con1">
            秉承着严谨的医学态度，执着的科学态度，拥有精良的开发团队，
            为医学的发展建立了新的平台。此平台可以实现线上招募，线下受试。
            医疗机构可以通过此平台发布临床试验项目，受试者可以通过此网站了
            解相关项目，根据特定的条件参与选择的项目。此平台可以通过电子病
            历充分了解受试者的受试状况，受试者可以充分了解机构项目需求。
          </div>
          <button class="index_btn" @click="toHealthInfo">查看详情>></button>
        </div>
        <div class="col-lg-2 col-md-2 col-xs-12" >
        </div>
      </div>
    </section>
    <section>
      <div class="index_02" >
        <div class="col-lg-2 col-md-2 col-xs-12">
        </div>
        <div class="col-lg-5 col-md-5 col-xs-12 index_01_con" style="padding-left:0px;padding-right:80px;color:#fff;">
          <h2 class="title1">520志愿者招募</h2>
          <div class="title2">—
          </div>
          <p class="index_01_title1" style="color:#fff;">Volunteer Recruitment</p>
          <div class="index_01_con1">
            秉承着严谨的医学态度，执着的科学态度，拥有精良的开发团队，
            为医学的发展建立了新的平台。此平台可以实现线上招募，线下受试。
            医疗机构可以通过此平台发布临床试验项目，受试者可以通过此网站了
            解相关项目，根据特定的条件参与选择的项目。此平台可以通过电子病
            历充分了解受试者的受试状况，受试者可以充分了解机构项目需求。
          </div>
          <button class="index_btn" style="background-color:#fff;color: #35BACB;" @click="toInfoList">查看详情>></button>
        </div>
        <div class="col-lg-5 col-md-5 col-xs-12" style="">
        </div>
      </div>
    </section>
    <section>
      <div class="index_03" >
        <div class="col-lg-5 col-md-5 col-xs-12">
        </div>
        <div class="col-lg-5 col-md-5 col-xs-12 index_01_con">
          <h2 class="title1">项目管理</h2>
          <div class="title2">—
          </div>
          <p class="index_01_title1">Project Management</p>
          <div class="index_01_con1">
            点击查看申办方、CRO、医疗机构发布的项目信息，分类更清晰，
            为医学的发展建立了新的平台。此平台可以实现线上招募，线下受试。
            医疗机构可以通过此平台发布临床试验项目，受试者可以通过此网站了
            解相关项目，根据特定的条件参与选择的项目。此平台可以通过电子病
            历充分了解受试者的受试状况，受试者可以充分了解机构项目需求。
          </div>
          <button class="index_btn" @click="toProjectManage">查看详情>></button>
        </div>
        <div class="col-lg-2 col-md-2 col-xs-12">
        </div>
      </div>
    </section>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "../components/common/header.vue";
import Footer from "../components/common/footer.vue";
export default {
  name: 'home',
    components: {
        Footer,
        Header
    },
    data() {
        return {
            msg: "这里是首页！",
            interval: 0,
            indicators: true,
            controls: false,
        };
    },
    methods:{
        toHealthInfo(){
            this.$router.push('/healthInfo');
        },
        toInfoList(){
            this.$router.push('/infoList');
        },
        toProjectManage(){
            this.$router.push('/projectManage');
        }
    },
    created() {},
    mounted() {
    }
}
</script>
<style>
  .index_01 {
    height: 700px;
    background: url("../../../assets/img/index_01.jpg") 0 0 no-repeat;
  }
  .index_02 {
    height: 700px;
    background: url("../../../assets/img/index_02.jpg") 0 0 no-repeat;
    width:100%;
    background-size:100% 100%;
  }
  .index_03 {
    height: 700px;
    background: url("../../../assets/img/index_03.jpg") 0 0 no-repeat;
    width:100%;
    background-size:100% 100%;
  }
  .index_01_con{text-align:center;padding-top:116px;margin:0 auto;padding-left:80px;}
  .title1{margin-bottom:10px;margin-top:0px;font-size:48px;}
  .title2{font-weight:bolder;font-size:38px;vertical-align:top;line-height:1;}
  .index_01_title1{font-family: 'Microsoft Ya Hei';color:#999999;font-size: 24px;margin-bottom:30px;margin-top: 10px;}
  .index_01_con1{font-size:22px;text-align:justify;text-indent:2em;line-height:40px;}
  .index_btn{
    margin-top:50px;
    width:190px;
    height:60px;
    border:0px;
    color:#fff;
    font-size:22px;
    border-radius:6px;
    background-color: #35BACB;
    float: left;
  }
</style>-->
