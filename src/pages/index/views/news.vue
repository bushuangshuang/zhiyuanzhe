<template>
    <div>
        <Header menu-title="新闻中心"></Header>
        <div class="bgColor">
            <div class="container list-title">
                <div>
                    <div class="searchRes-news">
                        <div class="row" style="margin:0px 20px 0px 20px;">
                            <div class="col-md-4" style="display:inline-block;text-align:center;">
                                <img src="../../../assets/img/news.png" />
                            </div>
                            <div class="col-md-8 resCenter" style="text-align:left;padding-left:0px;margin-left:-10px;">
                                <h4 class="resCenter-title-news">习近平会见印度总理莫迪习近平会见印度总理莫迪</h4>
                                <p style="font-size:14px;color:#999999">作者：物流创新企业<span style="margin-left:33px;">2018-04-29&nbsp;&nbsp;13:50</span></p>
                                <p style="font-size:14px;color:#666666">工商局与阿里巴巴集团签署“红盾云桥”项目合作协议工商局与阿里巴巴集签署“红盾云桥”项目合作协议工商局与阿
                                    里巴巴集团签署“红盾云桥”项目合作协议。工商局与阿里巴巴集团签署“红盾云桥”项目合作协议。工商局与阿里巴
                                    巴集团签署“红盾云桥”项目合作协议工商局与阿里巴巴集签署“红盾云桥”项目合作协议工商局与阿
                                </p>
                                <button class="btn btn-default checkDetail-news" @click="toDetail()">查看详情</button>
                            </div>
                        </div>
                        <hr align="center" style= "border:1px dotted #EBEBEB;margin-top: 45px;margin-bottom: 45px;" />
                        <div class="row" style="margin:0px 20px 0px 20px;">
                            <div class="col-md-4" style="display:inline-block;text-align:center;">
                                <img src="../../../assets/img/news.png" />
                            </div>
                            <div class="col-md-8 resCenter" style="text-align:left;padding-left:0px;margin-left:-10px;">
                                <h4 class="resCenter-title-news">习近平会见印度总理莫迪习近平会见印度总理莫迪</h4>
                                <p style="font-size:14px;color:#999999">作者：物流创新企业<span style="margin-left:33px;">2018-04-29&nbsp;&nbsp;13:50</span></p>
                                <p style="font-size:14px;color:#666666">工商局与阿里巴巴集团签署“红盾云桥”项目合作协议工商局与阿里巴巴集签署“红盾云桥”项目合作协议工商局与阿
                                    里巴巴集团签署“红盾云桥”项目合作协议。工商局与阿里巴巴集团签署“红盾云桥”项目合作协议。工商局与阿里巴
                                    巴集团签署“红盾云桥”项目合作协议工商局与阿里巴巴集签署“红盾云桥”项目合作协议工商局与阿
                                </p>
                                <button class="btn btn-default checkDetail-news">查看详情</button>
                            </div>
                        </div>
                        <hr align="center" style= "border:1px dotted #EBEBEB;margin-top: 45px;margin-bottom: 45px;" />
                        <div class="row" style="margin:0px 20px 0px 20px;">
                            <div class="col-md-4" style="display:inline-block;text-align:center;">
                                <img src="../../../assets/img/news.png" />
                            </div>
                            <div class="col-md-8 resCenter" style="text-align:left;padding-left:0px;margin-left:-10px;">
                                <h4 class="resCenter-title-news">习近平会见印度总理莫迪习近平会见印度总理莫迪</h4>
                                <p style="font-size:14px;color:#999999">作者：物流创新企业<span style="margin-left:33px;">2018-04-29&nbsp;&nbsp;13:50</span></p>
                                <p style="font-size:14px;color:#666666">工商局与阿里巴巴集团签署“红盾云桥”项目合作协议工商局与阿里巴巴集签署“红盾云桥”项目合作协议工商局与阿
                                    里巴巴集团签署“红盾云桥”项目合作协议。工商局与阿里巴巴集团签署“红盾云桥”项目合作协议。工商局与阿里巴
                                    巴集团签署“红盾云桥”项目合作协议工商局与阿里巴巴集签署“红盾云桥”项目合作协议工商局与阿
                                </p>
                                <button class="btn btn-default checkDetail-news">查看详情</button>
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
    export default {
        name: "app",
        components: { Header, Footer },
        data() {
            return {
                msg: "这里是新闻中心"
            };
        },
        methods: {
            toDetail(){
                this.$router.push('/newsDetail');
                //window.location.href = 'newsDetail.html'
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
    .index-titlebox p {
        width: 50px;
        height: 2px;
        background: #34b8de;
        margin: 0 auto;
    }
    .about-infobox p {
        font-size: 1.4rem;
        line-height: 2rem;
        text-align: center;
        padding: 10px 0;
    }
    .about-cultrue li {
        padding: 15px 30px;
        margin-bottom: 15px;
    }
    .about-cultrue li p {
        font-size: 1.4rem;
        color: #fff;
        line-height: 1.8rem;
        text-align: center;
        height: 100px;
    }
    .about-liimgbox i {
        font-size: 8rem;
        font-weight: 500;
        color: #fff;
    }
    .job-box h5 {
        font-size: 2rem;
        padding: 12px 0 15px 10px;
        border-bottom: solid 1px #edf3f5;
        margin:0;
    }
    .job-txtbox p{
        margin-bottom: 0;
        line-height: 34px;
    }
    .job-txtbox button{
        border:none;
        background: #34b8de;
        border-radius: 4px;
        padding:0 12px;
        color:#fff;
        line-height: 34px;
    }
    .about-linkus li{
        margin:50px 0;
    }
    .about-linkh4 i{
        padding-right:10px;
        font-size: 2.8rem;
        color:#525252;
        font-weight: 700;
    }
    .about-linkp span{
        font-size: 2.2rem;
        color:#ff4e00;
        padding:0 6px;
    }
    .bgColor{background-color:#F5F5F5;padding-bottom:30px;}
    .searchRes-news{margin-top:30px;background-color:#fff;padding:40px 0px 30px 0px;text-align: left}
    .searchRes-news p{margin:0 0 10px;}
    .resCenter{display:inline-block;line-height:26px;display:table-cell;vertical-align:bottom;}
    .resCenter-title-news{margin-bottom:10px;color:#333;font-size:18px;}
    .checkDetail-news{width:96px;height:34px;background-color:#35BACB;color:#fff;border: none;margin-top:38px;}
</style>
