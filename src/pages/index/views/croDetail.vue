<template>
    <div>
        <Header menu-title="CRO公司"></Header>
        <section>
            <img src="../../../assets/img/banner1.jpg" style="width:100%;background-size:100% 100%;"/>
        </section>
        <section class="container">
            <div class="row" style="text-align:center;margin-top:50px;">
                <div class="title1">公司简介</div>
                <div class="title2">—</div>
                <p class="index_01_title1">About Us</p>
                <div class="index_01_con1">
                    北京四惠中医医院坐落于北京市朝阳区CBD商圈，彼临四惠交通枢纽，是一家集医疗、教学、科研、产品开发为一体的现代化二级中医综合医院。北
                    京四惠中医医院秉承“聚京城名医，为人民服务”的发展和服务理念，医院集中西医特色诊疗服务于一体，诊疗设备齐全、技术实力雄厚，使用面积
                    达11000 平方米。开设床位 100 张，设有临床医技科室20个，医院运用中西医结合特色疗法和技术，为海内外众多患者及家庭解除了疾病困扰，突显
                    了中医药临床治疗特色和中西医结合优势。
                    {{info.organizationBrief}}
                </div>
                <div style="margin-bottom:70px;">
                    <img src="../../../assets/img/pic5.png" style="float:left" />
                    <img src="../../../assets/img/pic5.png" />
                    <img src="../../../assets/img/pic5.png" style="float:right" />
                </div>
            </div>
        </section>
        <div class="bgColor">
            <section class="container">
                <div class="row" style="text-align:center;margin-top:50px;">
                    <div class="title1">核心优势</div>
                    <div class="title2">—</div>
                    <p class="index_01_title1">Core Advantage</p>
                    <div>
                        <div class="col-lg-4 col-md-4 col-xs-12">
                            <img src="../../../assets/img/icon2.png"  />
                            <p class="titleX">务实诚信</p>
                            <div class="lineBlue">—</div>
                            <div style="font-size:18px;padding:10px 0px 0px 0px">给患者带去有益的、更新的治疗方案、希望能够改善疾病健康状况，提高生活质量.</div>
                        </div>
                        <div class="col-lg-4 col-md-4 col-xs-12">
                            <img src="../../../assets/img/icon1.png"  />
                            <p class="titleX">务实诚信</p>
                            <div class="lineBlue">—</div>
                            <div style="font-size:18px;padding:10px 0px 0px 0px">给患者带去有益的、更新的治疗方案、希望能够改善疾病健康状况，提高生活质量.</div>
                        </div>
                        <div class="col-lg-4 col-md-4 col-xs-12">
                            <img src="../../../assets/img/icon1.png"  />
                            <p class="titleX">务实诚信</p>
                            <div class="lineBlue">—</div>
                            <div style="font-size:18px;padding:10px 0px 0px 0px">给患者带去有益的、更新的治疗方案、希望能够改善疾病健康状况，提高生活质量.</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <section class="container">
            <div class="row" style="text-align:center;margin-top:50px;padding-bottom:70px;">
                <div class="title1">案例展示</div>
                <div class="title2">—</div>
                <p class="index_01_title1"> Case Show</p>
                <div style="padding:0px 120px 0px 120px;">
                    <div id="myCarousel" class="carousel slide">
                        <!-- 轮播（Carousel）项目 -->
                        <div class="carousel-inner">
                            <div class="item active">
                                <img src="../../../assets/img/pic2.png" style="display:inline-block;float:left;">
                                <img src="../../../assets/img/pic3.png" style="display:inline-block">
                                <img src="../../../assets/img/pic2.png" style="display:inline-block;float:right;">
                            </div>
                            <div class="item">
                                <img src="../../../assets/img/pic2.png" style="display:inline-block;float:left;">
                                <img src="../../../assets/img/pic3.png" style="display:inline-block">
                                <img src="../../../assets/img/pic2.png" style="display:inline-block;float:right;">
                            </div>
                            <div class="item">
                                <img src="../../../assets/img/pic2.png" style="display:inline-block;float:left;">
                                <img src="../../../assets/img/pic3.png" style="display:inline-block">
                                <img src="../../../assets/img/pic2.png" style="display:inline-block;float:right;">
                            </div>
                        </div>
                        <!-- 轮播（Carousel）导航 -->
                        <a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
                            <span class="glyphicon glyphicon-chevron-left" style="color:#666;margin-left:-40px;" aria-hidden="true"></span>
                            <span class="sr-only">Previous</span>
                        </a>
                        <a class="right carousel-control" href="#myCarousel" role="button" data-slide="next">
                            <span class="glyphicon glyphicon-chevron-right" style="color:#666;margin-right:-150px;" aria-hidden="true"></span>
                            <span class="sr-only">Next</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
        <div class="contactBg">
            <div class="container">
                <div class="row contact">
                    <div class="title1" style="color:#ffffff;">联系方式</div>
                    <div class="title2" style="color:#ffffff;">—</div>
                    <p class="index_01_title1" style="color:#ffffff;">Contact Us</p>
                    <div class="contact-left">
                        <div style="font-size:26px;padding-bottom:20px;">CONTACT US</div>
                        <div style="color:#333333;">
                            <img src="../../../assets/img/add.png" /><span style="color:#35BACB;font-size:18px;margin-left:10px;">地址：</span>
                            <p style="padding:20px 0px 0px 36px;font-size:16px;">{{info.areaAddress}}北京：石景山区景山路中海大厦B座12层</p>
                            <hr style="margin-top:37px;margin-bottom:30px;">
                            <img src="../../../assets/img/tel.png" /><span style="color:#35BACB;font-size:18px;margin-left:10px;">联系方式：</span>
                            <p style="padding:8px 0px 10px 36px;font-size:16px;">电话：{{info.phone}}010 - 2345678</p>
                            <p style="padding:0px 0px 0px 36px;font-size:16px;color:#fff"> 邮箱：{{info.phone}}123@jsyy.com</p>
                        </div>
                    </div>
                    <div class="contact-right">
                        <div style="padding:20px 50px 26px 50px;background-color:#ffffff;">
                            <div style="font-size:26px;padding-bottom:20px;">在线联系</div>
                            <div style="color:#333333;">
                                <form class="form-horizontal" role="form" @keydown.enter.native="">
                                    <div class="form-group">
                                        <label class="col-xs-2 control-label" style="padding-right:0px;padding-left:0px;">联系人：</label>
                                        <div class="col-xs-4">
                                            <input type="text" class="form-control" placeholder="请留下您的姓名" v-model="name">
                                        </div>
                                        <label class="col-xs-2 control-label" style="padding-right:0px;padding-left:0px;">联系电话：</label>
                                        <div class="col-xs-4">
                                            <input type="text" class="form-control" placeholder="请留下您的电话" v-model="tel">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-xs-2 control-label" style="padding-right:0px;padding-left:0px;">备注：</label>
                                        <div class="col-xs-10">
                                            <textarea v-model="note" style="resize: none;" type="text" rows="6" cols="6" class="form-control" placeholder="请输入您的姓名" ></textarea>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="col-sm-offset-2 col-xs-10">
                                            <button class="btn btn-default btnTrue-health">确认提交</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
    import Header from "../components/common/header.vue";
    import Footer from "../components/common/footer.vue";
    import { medicineFindById } from '../../../api/frontSomeInterface.js'
    export default {
        name: "app",
        components: { Header, Footer },
        data() {
            return {
                name:'',
                tel:'',
                note:'',
                id:'',
                info:{
                    organizationBrief:'',
                    areaAddress:'',
                }

            };
        },
        created(){
            this.id=this.$route.query.id;
            // console.log('query.id=='+this.id);
            this.getInfo(this.id);
        },
        methods: {
            getInfo(id){
                if(id==undefined || id==='' ||id==null){
                    alert('系统错误，请重试或联系管理员！');
                    return;
                }
                let data={
                    id:id
                }
                medicineFindById(data).then(res => {
                    this.info = res.data.data;
                    this.info.organizationBrief=res.data.data.organizationBrief.replace(/<[^>]+>/g, "")
                })
            }
        }
    };
</script>

<style>
    .top-banner img {
        width: 100%;
        height: auto;
    }
    .index-titlebox h4 {
        font-size: 1.8rem;
        color: #525252;
        line-height: 2rem;
        margin: 8px 0;
    }
    .info-content ul {
        margin: 50px 0;
    }
    .info-iconbox i {
        font-size: 5rem;
    }
    .info-bigbox h4 {
        font-size: 2.4rem;
        color: #34b8de;
        text-align: center;
        padding: 20px 0 0;
    }
    .title1{margin-bottom:10px;margin-top:0px;font-size:48px;}
    .title2{font-weight:bolder;font-size:38px;vertical-align:top;line-height:1;}
    .index_01_title1{font-family: 'Microsoft Ya Hei';color:#999999;font-size: 24px;margin-bottom:58px;margin-top: 10px;}
    .index_01_con1{font-size:18px;text-align:justify;text-indent:2em;line-height:30px;padding:0px 15px 40px 15px;}
    .bgColor{background-color:#F5F5F5;padding-bottom:70px;}
    .titleX{font-size:24px;color:#35BACB;padding:10px 0px 0px 0px;}
    .lineBlue{font-weight:bolder;font-size:30px;vertical-align:top;margin-top:-18px;color:#35BACB;}
    .carousel-control{
        left:-100px;
    }
    .carousel-control:focus, .carousel-control:hover{
        /* opacity: 0!important;*/
    }
    .carousel-control.left,.carousel-control.right{background-image:none!important;}
    .btnTrue-health{border-radius:20px;background-color:#35BACB;color:#ffffff;border:1px solid #35BACB;}
    .contact-right{width:62.5%;float:left;color:#333333;text-align:left;padding-left:30px;}
    .contact{text-align:center;margin-top:50px;padding-bottom:152px;color:#ffffff;}
    .contactBg{background:url("../../../assets/img/contact.png") no-repeat center;}
    .contact-left{width:37.5%;float:left;color:#333333;text-align:left;background-color:#ffffff;padding:20px 30px 32px 50px;}
</style>
