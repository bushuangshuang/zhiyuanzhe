<template>
    <div >
        <Header menu-title="新闻中心"></Header>
        <div class="bgColor">
            <div class="container list-title" style="padding:17px 15px 0px 15px;">
                <span style="color: #999999">当前位置：<a href="/news" style="color:#999999">新闻中心</a> ></span> 详情
                <div class="searchRes" style="margin-top:20px;">
                    <div class="row " style="padding:10px 20px 0px 30px;">
                        <h4 style="font-size:20px;color:#333333;text-align:center;padding-bottom:20px;">省委七届四次全会进行分组讨论 吹响海南自贸区(港)建设冲锋号</h4>
                        <div class="col-md-6" style="color:#999999;text-align:center;">作者：物流创新企业</div>
                        <div class="col-md-6" style="color:#999999;text-align:center;">发布日期：2018-04-29   13:50</div>
                    </div>
                    <hr align="center" style="border-bottom:2px solid #DEDEDE;border-top:none;margin-top:10px;margin-bottom:18px;" />
                    <div style="font-size:16px;line-height:30px;color:#666666;font-size:16px;padding:0px 50px 0px 50px;text-align:justify">
                        <div style="text-indent:2em;">
                            本报海口5月13日讯 (记者金昌波 李磊 尤梦瑜 刘操 陈蔚林)今天，省委七届四次全会在海口召开。开幕式结束下午半天时间里，与会委员和列席人员
                            进行分组讨论，大家一致认为，此次全会彰显了省委团结带领全省各族人民全面深化改革开放、加快建设美好新海南的信心和决心，更吹响了海南全岛建设自
                            由贸易试验区和中国特色自由贸易港的冲锋号。深化改革开放、加快建设美好新海南的信心和决心.
                        </div>
                        <img src="../../../assets/img/news2.png" style="width:100%;margin:30px 0px 30px 0px;" />
                        <div style="text-indent:2em;">
                            讨论现场气氛热烈，与会人员围绕《省委常委会工作报告》《中共海南省委关于深入学习贯彻习近平总书记在庆祝海南建省办经济特区30周年大会上的
                            重要讲话精神和《中共中央国务院关于支持海南全面深化改革开放的指导意见的决定(讨论稿)》和省委书记刘赐贵所作的说明、《百万人才进海南行动计划
                            (2018-2025年)(讨论稿)》《省委七届四次全体会议决议(讨论稿)》踊跃发言。大家一致认为，此次全会是我省进一步统一思想、凝聚共识、扎实推进海南
                            自贸区(港)建设的重要举措，《省委常委会工作报告》主题鲜明、重点突出，令人振奋、鼓舞，充分体现了本届省委的政治智慧与责任担当。
                        </div>
                        <div style="text-indent:2em;margin-top:20px;">
                            大家纷纷表示，全会审议通过的《决定》，全面贯彻党的十九大、习近平总书记“4·13”重要讲话和中央12号文件精神，政治站位高、目标定位准、工
                            作部署实，是海南全面深化改革开放、建设自贸区(港)的“施工图”，充分体现了省委对新时代海南全面深化改革开放的战略思考和总体部署，是指导海南
                            当前和今后一个时期,全面深化改革开放的基遵循和重要依据。大家纷纷表示，全会审议通过的《决定》，全面贯彻党的十九大、习近平总书记“4·13”重要讲
                            话和中央12号文件精神，政治站位高、目标定位准、工作部署实，是海南全面深化改革开放、建设自贸区(港)的“施工图”，充分体现了省委对新时代海南
                            全面深化改革开放的战略思考和总体部署。
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
                volunteerType:'',
                msg: "这里是新闻详情！"
            };
        }
    };
</script>
<style>

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
    select::-ms-expand { display: none; }
    .bgColor{background-color:#F5F5F5;padding-bottom:30px;}
    .searchRes{margin-top:30px;background-color:#fff;padding:30px 0px 30px 0px;text-align: left}
    hr{}
    .pagination>.active>a, .pagination>.active>a:focus, .pagination>.active>a:hover, .pagination>.active>span, .pagination>.active>span:focus, .pagination>.active>span:hover{
        background-color: #35BACB!important;
        border-color: #35BACB!important;
    }
</style>
