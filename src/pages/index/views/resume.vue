 <template>
    <div >
        <Header menu-title="CRC专栏"></Header>
        <div class="bgColor" style="padding-bottom: 40px;">
          <div class="container list-title">
            <div class="resume-searchRes">
                <div class="row" style="padding:0px 20px 0px 40px;">
                    <div>
                        <span class="lineIcon">&nbsp;</span>
                        <span class="lineTitle">基本信息</span>
                    </div>
                </div>
                <hr align="center" style="border-bottom:1px solid #EBEBEB;border-top:none;margin-top:20px;margin-bottom: 10px;" />
                <div class="row resume-con">
                    <div class="resume-con1">
                        <p class="resume-name">刘闻</p>
                        <p class="resume-age">35岁<span class="padding-40">|</span>女<span class="padding-40">|</span>10年经验</p>
                        <p class="resume-age">北京<span class="padding-40">|</span>清华大学<span class="padding-40">|</span>17512345678</p>
                    </div>
                    <div class="resume-img"><img src="../../../assets/img/pic4.png" /></div>
                </div>
            </div>
          </div>
          <div class="container list-title">
            <div class="resume-searchRes" style="padding: 20px 0px 40px 0px;">
                <div class="row" style="padding:0px 20px 0px 40px;">
                    <div>
                        <span class="lineIcon">&nbsp;</span>
                        <span class="lineTitle">求职意向</span>
                    </div>
                </div>
                <hr align="center" style="border-bottom:1px solid #EBEBEB;border-top:none;margin-top:20px;margin-bottom:30px;" />
                <div class="row resume-con">
                    <div class="col-md-4" style="font-size:16px;color:#666666;">
                        <span>工作性质：</span><span style="color:#000;margin-left:30px;">全职</span>
                    </div>
                    <div class="col-md-4" style="font-size:16px;color:#666666;">
                        <span>工作地区：</span><span style="color:#000;margin-left:30px;">北京</span>
                    </div>
                    <div class="col-md-4" style="font-size:16px;color:#666666;">
                        <span>期望职业：</span><span style="color:#000;margin-left:30px;">职业名称</span>
                    </div>
                    <div class="col-md-4" style="font-size:16px;color:#666666;padding-top:30px">
                        <span>期望薪资：</span><span style="color:#000;margin-left:30px;">面议</span>
                    </div>
                    <div class="col-md-4" style="font-size:16px;color:#666666;padding-top:30px">
                        <span>期望行业：</span><span style="color:#000;margin-left:30px;">互联网</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="container list-title">
            <div class="resume-searchRes" style="padding: 20px 0px 40px 0px;">
                <div class="row" style="padding:0px 20px 0px 40px;">
                    <div>
                        <span class="lineIcon">&nbsp;</span>
                        <span class="lineTitle">工作经验</span>
                    </div>
                </div>
                <hr align="center" style="border-bottom:1px solid #EBEBEB;border-top:none;margin-top:20px;margin-bottom:40px;" />
                <div class="row resume-con" style="padding:0px 50px 0px 36px;color:#666666;margin-right:0px;margin-left:0px;">
                    <div id="resumeHeight" style="border-left:1px #DADADA dashed;">
                        <div style="position:relative;">
                            <div style="position:absolute;left:-1px;width:2px;height:8px;background-color:#ffffff;"></div>
                            <div class="resume-circle"></div>
                            <div style="padding-left:20px;">2010年03月 - 2012年09月</div>
                            <div style="padding:28px 60px 0px 60px;">
                                <p style="color:#333333;font-size:20px;">公司名称科技有限公司</p>
                                <p>此处是职位名称</p>
                                <div class="resume-bg-10" style="padding:39px 52px 30px 52px;">
                                    <p>1：工作描述工作描述工作描述工作描述工作描述工作描述工作描述。</p>
                                    <p>2：工作描述工作描述工作描述工作描述工作描述工作描述工作描述工作描述工作描述。</p>
                                    <p>3：工作描述工作描述工作描述工作描述工作描述工作描述工作描述工作描述。</p>
                                </div>
                            </div>
                        </div>
                        <div style="position:relative;margin-top:50px;">
                            <div class="resume-circle"></div>
                            <div style="padding-left:20px;">2010年03月 - 2012年09月</div>
                            <div style="padding:28px 60px 0px 60px;">
                                <p style="color:#333333;font-size:20px;">公司名称科技有限公司</p>
                                <p>此处是职位名称</p>
                                <div class="resume-bg-10" style="padding:39px 52px 30px 52px;">
                                    <p>1：工作描述工作描述工作描述工作描述工作描述工作描述工作描述。</p>
                                    <p>2：工作描述工作描述工作描述工作描述工作描述工作描述工作描述工作描述工作描述。</p>
                                    <p>3：工作描述工作描述工作描述工作描述工作描述工作描述工作描述工作描述。</p>
                                </div>
                            </div>
                        </div>


                    </div>

                </div>

            </div>
        </div>
        <div class="container list-title" style="text-align: center;">
            <button class="btn btn-default resume-btn">下载</button>
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
                sexList:[{value:'1',name:'男'},{value:'2',name:'女'}],
                marriList:[{value:'1',name:'未婚'},{value:'2',name:'已婚'},{value:'3',name:'离异'}],
                name:'',
                sex:'',
                ident:'',
                tel:'',
                nation:'',
                marriage:'',
                height:'',
                weight:'',
                smokingStatus:'',
                diseaseStatus:'',
                msg: "这里是资讯列表！"
            };
        },
        methods: {
            toOnline(){
                this.$router.push('/online');
               // window.location.href = 'online.html'
            }

        }
    };
</script>
<style>
    .top-banner {
        width: 100%;
        height: 300px;
        position: relative;
    }
    .top-banner img {
        width: 100%;
        height: auto;
    }
    .list-txtbox > p {
        word-wrap:break-word;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .list-title{
        padding:20px 15px 0px 15px;
    }
    .list-title h1 {
        font-size: 2.4rem;
        color: #34b8de;
        padding: 8px 0;
        border-bottom: 1px solid #ccc;
        line-height: 2.8rem;
    }
    .list-title h1 span {
        display: inline-block;
        vertical-align: middle;
    }
    .list-title h1 i {
        width: 6px;
        height: 20px;
        background: #34b8de;
        display: inline-block;
        vertical-align: middle;
        margin-right: 10px;
    }
    .list-bottom p {
        color: #ccc;
    }
    select::-ms-expand { display: none; }
    .bgColor{background-color:#F5F5F5;padding-bottom:30px;text-align:left;}
    .resume-searchRes{margin-top:10px;background-color:#fff;padding:20px 0px 20px 0px;}
    .pagination>.active>a, .pagination>.active>a:focus, .pagination>.active>a:hover, .pagination>.active>span, .pagination>.active>span:focus, .pagination>.active>span:hover{
        background-color: #35BACB!important;
        border-color: #35BACB!important;
    }
    .lineIcon{width:4px;font-size:18px;background-color:#35BACB;height:20px;}
    .lineTitle{color:#35BACB;font-size:22px;margin-left:10px;}
    .resume-con{padding:0px 50px 0px 50px;font-size:16px;}
    .resume-con1{float:left;font-size:16px;color:#666666}
    .resume-name{font-size:36px;padding:20px 0px 0px 10px;}
    .resume-age{padding:10px 0px 0px 10px;}
    .padding-40{padding:0px 40px;}
    .resume-img{float:right;padding-top:20px;}
    .resume-bg-10{
        margin-top:33px;
        background-color: rgba(53,186,203,0.1);
       /* background:#35BACB;
        filter:alpha(opacity=10);
        -moz-opacity:0.1;
        -khtml-opacity: 0.1;
        opacity: 0.1;  */
    }
    @media \0screen\,screen\9 {
        /* 只支持IE6、7、8 */
        .resume-bg-10 {
            background-color: #35BACB;
            filter: Alpha(opacity=10);
            position: static; /* IE6、7、8只能设置position:static(默认属性) ，否则会导致子元素继承Alpha值 */
            *zoom: 1; /* 激活IE6、7的haslayout属性，让它读懂Alpha */
        }

        .resume-bg-10 p {
            position: relative; /* 设置子元素为相对定位，可让子元素不继承Alpha值 */
        }
    }
    .resume-btn{margin-top:20px;width:238px;height:56px;background-color:#35BACB;border:none;font-size:28px;color:#ffffff;border-radius:28px;}
    .resume-circle{position:absolute;top:8px;left:-3px;width:6px;height:6px;border-radius:3px;background-color:#35BACB;display: inline-block;}
</style>

