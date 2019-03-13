<template>
    <div >
        <Header menu-title="志愿者"></Header>
        <div class="bgColor">
            <div class="container list-title" style="padding:17px 15px 0px 15px;">
                <span style="color: #999999">当前位置：<a href="/infoList" style="color:#999999">志愿者</a> > </span> 项目详情
                <div class="searchRes-project" style="margin-top:20px;">
                    <div class="row " style="padding:0px 20px 0px 30px;">
                        <div class="col-md-4" style="display:inline-block;">
                            <img src="../../../assets/img/pic1.png" />
                        </div>
                        <div class="col-md-4 resCenter-project">
                            <h4 class="resCenter-title-project">{{ info.projectName }}</h4>
                            <p><span style="color:#999">适应范围：</span><span style="color: #333;">{{ info.applicationMedicine }}</span></p>
                            <p><span style="color:#999">研究机构：</span><span style="color: #333;">{{ info.hospitalName }}</span></p>
                            <p><span style="color:#999">开展地点：</span><span style="color: #333;">{{ info.areaAddress }}</span></p>
                            <p><span style="color:#999">招募人数：</span><span style="color:#35BACB;">{{ info.recruitedNumber }}</span>/{{ info.recruitNumber }}</p>
                            <p><span style="color:#999">补偿金额：</span><span style="color: #333;">{{ info.compensationMoney }}</span></p>
                            <p><span style="color:#999;">体检时间：</span><span style="color: #333;">{{ info.applyEndTime }}</span></p>
                        </div>
                        <div class="col-md-4 resRight"><!--{{ info.recruitStatusStr}}-->
                            <h4 style="color:#04BA7D;font-size:18px;">{{ info.recruitStatus==0?'未招募':info.recruitStatus==1?'招募中':info.recruitStatus==2?'停止招募':'' }}</h4>
                            <button v-if="info.recruitStatus==1?true:false" class="btn btn-default checkDetail" @click="toOnline(id)">在线报名</button>
                        </div>
                    </div>
                </div>
                <div class="searchRes-project" style="padding:20px 0px 20px 0px;">
                    <div class="row" style="padding:0px 20px 0px 40px;">
                        <div>
                            <span style="width:4px;font-size:18px;background-color:#35BACB;height:20px;">&nbsp;</span>
                            <span style="color:#35BACB;font-size:22px;font-weight:bold;">&nbsp;项目简介</span>
                        </div>
                    </div>
                    <hr align="center" style="border-bottom:1px solid #EBEBEB;border-top:none;margin-top:20px;margin-bottom:20px;" />
                    <div class="row" style="padding:0px 50px 0px 50px;font-size:16px;">
                        <div style="text-indent:2em;line-height:28px;">
                            {{ info.projectBrief }}
                            <!--该药物计划探索的临床适应症主要包括免疫相关性疾病（RA、哮喘、细胞因子风暴等）及血液/实体肿瘤（多发骨髓瘤、前列腺癌）等领域。 这项研究
                            在北京大学人民医院开展，将入选58名健康志愿者，已经获得国家食品药品监督管理局（批件号：2016L10584）的批准。-->
                        </div>
                    </div>
                </div>
                <div class="searchRes-project" style="padding:20px 0px 20px 0px;background-color:#D7F4EA;">
                    <div class="row" style="padding:0px 20px 0px 40px;">
                        <div>
                            <span style="width:4px;font-size:18px;background-color:#35BACB;height:20px;">&nbsp;</span>
                            <span style="color:#35BACB;font-size:22px;font-weight:bold;">&nbsp;入选标准</span>
                        </div>
                    </div>
                    <hr align="center" style="border-bottom:1px solid #D9D9D9;border-top:none;margin-top:20px;margin-bottom:20px;" />
                    <div class="row" style="padding:0px 50px 0px 50px;font-size:16px;line-height:28px;">
                        {{ info.standard}}
                        <!--<p><img src="../../../assets/img/icon3.png" style="vertical-align:top;margin-top:3px;">&nbsp;&nbsp;1：自愿参加临床试验，并签署知情同意书者。</p>
                        <p><img src="../../../assets/img/icon3.png" style="vertical-align:top;margin-top:3px;">&nbsp;&nbsp;2：18～45周岁健康成年志愿者，男女兼有。</p>
                        <p><img src="../../../assets/img/icon3.png" style="vertical-align:top;margin-top:3px;">&nbsp;&nbsp;3：试验前30日内按要求体检合格，体重指数（BMI）在19~24范围内，体重在45~75 kg。</p>
                        <p><img src="../../../assets/img/icon3.png" style="vertical-align:top;margin-top:3px;">&nbsp;&nbsp;4：心、肝、肾、血液等检查指标基本在正常值范围内。</p>-->
                    </div>
                </div>
                <div class="searchRes-project" style="padding:20px 0px 20px 0px;background-color:#F6E6E6;">
                    <div class="row" style="padding:0px 20px 0px 40px;">
                        <div>
                            <span style="width:4px;font-size:18px;background-color:#35BACB;height:20px;">&nbsp;</span>
                            <span style="color:#35BACB;font-size:22px;font-weight:bold;">&nbsp;排除标准</span>
                        </div>
                    </div>
                    <hr align="center" style="border-bottom:1px solid #D9D9D9;border-top:none;margin-top:20px;margin-bottom:20px;" />
                    <div class="row" style="padding:0px 50px 0px 50px;font-size:16px;line-height:28px;">
                        {{ info.excludeStandard}}
                        <!--<p><img src="../../../assets/img/icon4.png" style="vertical-align:top;margin-top:3px;">&nbsp;&nbsp;1：自愿参加临床试验，并签署知情同意书者。</p>
                        <p><img src="../../../assets/img/icon4.png" style="vertical-align:top;margin-top:3px;">&nbsp;&nbsp;2：18～45周岁健康成年志愿者，男女兼有。</p>
                        <p><img src="../../../assets/img/icon4.png" style="vertical-align:top;margin-top:3px;">&nbsp;&nbsp;3：试验前30日内按要求体检合格，体重指数（BMI）在19~24范围内，体重在45~75 kg。</p>
                    -->
                    </div>
                </div>
                <div class="searchRes-project" style="padding:20px 0px 20px 0px;">
                    <div class="row" style="padding:0px 20px 0px 40px;">
                        <div>
                            <span style="width:4px;font-size:18px;background-color:#35BACB;height:20px;">&nbsp;</span>
                            <span style="color:#35BACB;font-size:22px;font-weight:bold;">&nbsp;志愿者权益</span>
                        </div>
                    </div>
                    <hr align="center" style="border-bottom:1px solid #D9D9D9;border-top:none;margin-top:20px;margin-bottom:20px;" />
                    <div class="row" style="padding:0px 50px 0px 50px;font-size:16px;">
                        {{ info.testBenefit}}
                        <!--<p>1：免费体检；</p>
                        <p>2：误工费、营养费及交通住宿补助共计4500元（出组三个工作日左右打卡）；</p>
                        <p>3：体检补助：做完所有体检不合格（完成采血）者补助50元，住宿补贴50元（要求不能迟到）；</p>
                        <p>4：住院期间包食宿；</p>-->
                    </div>
                </div>
                <!--<div class="searchRes-project" style="padding:20px 0px 20px 0px;">
                    <div class="row" style="padding:0px 20px 0px 40px;">
                        <div>
                            <span style="width:4px;font-size:18px;background-color:#35BACB;height:20px;">&nbsp;</span>
                            <span style="color:#35BACB;font-size:22px;font-weight:bold;">&nbsp;时间安排</span>
                        </div>
                    </div>
                    <hr align="center" style="border-bottom:1px solid #D9D9D9;border-top:none;margin-top:20px;margin-bottom:20px;" />
                    <div class="row" style="padding:0px 50px 0px 50px;font-size:16px;">
                        <p>1：12月上旬早上7:30知情体检（12月4/5/6日具体哪一天下周三确定）；</p>
                        <p>2：试验分两个周期，每周期三天四晚；</p>
                        <p>3：住3天4晚空3天再住3天4晚；</p>
                    </div>
                </div>-->
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
    import Header from "../components/common/header.vue";
    import Footer from "../components/common/footer.vue";
    import { projectFindById } from '../../../api/frontSomeInterface.js'
    import { getSelectValueDesc } from '../../../api/common.js'
    export default {
        name: "app",
        components: { Header, Footer },
        data() {
            return {
                volunteerType:'',
                msg: "这里是资讯列表！",
                menuTitle:'志愿者',
                id:'',
                info:{},
                recruitOption:[],
            };
        },
        created(){
            this.id=this.$route.query.id;
            // console.log('query.id=='+this.id);
            this.getInfo(this.id);
            let recruit = {
                "key": 'RECRUIT_PROJECT'
            }
            getSelectValueDesc(recruit).then(res => {
                if(res.data.code = 200){
                    this.recruitOption = res.data.msg
                }
            })
        },
        methods: {
            toOnline(id){
                this.$router.push({ path: "/online", query: { id: id } });
               // this.$router.push('/online');
            },
            getInfo(id){
                if(id==undefined || id==='' ||id==null){
                    alert('系统错误，请重试或联系管理员！');
                    return;
                }
                let data={
                    id:id
                }
                projectFindById(data).then(res => {
                    this.info = res.data.data;
                        if(this.info.applyEndTime!=undefined&&this.info.applyEndTime!=null&&this.info.applyEndTime!=''){
                            this.info.applyEndTime=this.info.applyEndTime.substring(0, 10);
                        }
                        for (let j=0;j<this.recruitOption.length;j++){
                            if(this.info.recruitStatus==this.recruitOption[j].value){
                                this.info.recruitStatusStr=this.recruitOption[j].label;
                                break;
                            }

                        }
                    //this.info.organizationBrief=res.data.data.organizationBrief.replace(/<[^>]+>/g, "")
                })
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
    .searchFrom{
        margin-top:30px;
        padding-top:20px;
        padding-bottom:20px;
    }
    /**{text-align: left;}*/
    select::-ms-expand { display: none; }
    .bgColor{background-color:#F5F5F5;padding-bottom:30px;text-align:left;}
    .searchRes-project{margin-top:30px;background-color:#fff;padding:30px 0px 10px 0px;}
    .checkDetail{width:162px;height:44px;background-color:#35BACB;color:#fff;border: none;margin-top:34px;}
    .resCenter-project{display:inline-block;line-height:26px;display:table-cell;vertical-align:bottom;}
    .searchRes-project p{margin:0px 0px 10px;}
    .resCenter-title-project{margin-bottom:20px;color:#333;font-size:23px;}
    .resRight{text-align:center;padding: 60px 0px 68px 0px;}
    hr{margin-top:20px;margin-bottom:18px;}
    .pagination>.active>a, .pagination>.active>a:focus, .pagination>.active>a:hover, .pagination>.active>span, .pagination>.active>span:focus, .pagination>.active>span:hover{
        background-color: #35BACB!important;
        border-color: #35BACB!important;
    }
</style>

<!-- -->
