<template>
    <div>
        <Header menu-title="CRC专栏"></Header>
        <div class="bgColor">
            <section class="container list-title">
                <div class="searchCon">
                    <form class="searchFrom">
                        <select class="selectPicker" v-model="volunteerType" title="请选择区域">
                            <option v-for="e in typeList" :key='e.value' :value="e.value">{{e.name}}</option>
                        </select>
                        <select class="selectPicker" v-model="volunteerType" title="年龄" style="margin-left:20px;">
                            <option v-for="e in typeList" :key='e.value' :value="e.value">{{e.name}}</option>
                        </select>
                        <select class="selectPicker" v-model="volunteerType" title="性别" style="margin-left:20px;">
                            <option v-for="e in typeList" :key='e.value' :value="e.value">{{e.name}}</option>
                        </select>
                        <select class="selectPicker" v-model="volunteerType" title="工作年限" style="margin-left:20px;width:139px;">
                            <option v-for="e in typeList" :key='e.value' :value="e.value">{{e.name}}</option>
                        </select>
                        <button type="button" class="btn btn-default searchBtn">查询</button>
                    </form>
                </div>
                <div class="searchRes" style="margin-top:0px">
                    <div>
                        <div class="tableType" style="padding:0px 30px 0px 30px;">
                            <table class="table table-striped">
                                <thead>
                                <tr>
                                    <th>姓名</th>
                                    <th>性别</th>
                                    <th>年龄</th>
                                    <th>婚姻状况</th>
                                    <th>受试者类型</th>
                                    <th>所在地区</th>
                                    <th>操作</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>刘先生</td>
                                    <td>男</td>
                                    <td>43</td>
                                    <td>已婚</td>
                                    <td>患者</td>
                                    <td>贵州贵阳</td>
                                    <td style="color:#35BACB"><a href="/resume">查看</a>&nbsp;|&nbsp;下载</td>
                                </tr>
                                <tr>
                                    <td>王先生</td>
                                    <td>男</td>
                                    <td>45</td>
                                    <td>未婚</td>
                                    <td>健康志愿者</td>
                                    <td>北京西城</td>
                                    <td style="color:#35BACB">查看&nbsp;|&nbsp;下载</td>
                                </tr>
                                <tr>
                                    <td>王女士</td>
                                    <td>女</td>
                                    <td>35</td>
                                    <td>未婚</td>
                                    <td>患者</td>
                                    <td>安徽阜阳</td>
                                    <td style="color:#35BACB">查看&nbsp;|&nbsp;下载</td>
                                </tr>
                                <tr>
                                    <td>王女士</td>
                                    <td>女</td>
                                    <td>36</td>
                                    <td>已婚</td>
                                    <td>健康志愿者</td>
                                    <td>贵州贵阳</td>
                                    <td style="color:#35BACB">查看&nbsp;|&nbsp;下载</td>
                                </tr>
                                <tr>
                                    <td>张先生</td>
                                    <td>男</td>
                                    <td>45</td>
                                    <td>已婚</td>
                                    <td>患者</td>
                                    <td>北京西城</td>
                                    <td style="color:#35BACB">查看&nbsp;|&nbsp;下载</td>
                                </tr>
                                <tr>
                                    <td>张女士</td>
                                    <td>女</td>
                                    <td>43</td>
                                    <td>未婚</td>
                                    <td>健康志愿者</td>
                                    <td>安徽阜阳</td>
                                    <td style="color:#35BACB">查看&nbsp;|&nbsp;下载</td>
                                </tr>
                                <tr>
                                    <td>刘先生</td>
                                    <td>男</td>
                                    <td>43</td>
                                    <td>已婚</td>
                                    <td>患者</td>
                                    <td>贵州贵阳</td>
                                    <td style="color:#35BACB">查看&nbsp;|&nbsp;下载</td>
                                </tr>
                                <tr>
                                    <td>刘先生</td>
                                    <td>男</td>
                                    <td>43</td>
                                    <td>已婚</td>
                                    <td>患者</td>
                                    <td>贵州贵阳</td>
                                    <td style="color:#35BACB">查看&nbsp;|&nbsp;下载</td>
                                </tr>
                                <tr>
                                    <td>刘先生</td>
                                    <td>男</td>
                                    <td>43</td>
                                    <td>已婚</td>
                                    <td>患者</td>
                                    <td>贵州贵阳</td>
                                    <td style="color:#35BACB">查看&nbsp;|&nbsp;下载</td>
                                </tr>
                                <tr>
                                    <td>刘先生</td>
                                    <td>男</td>
                                    <td>43</td>
                                    <td>已婚</td>
                                    <td>患者</td>
                                    <td>贵州贵阳</td>
                                    <td style="color:#35BACB">查看&nbsp;|&nbsp;下载</td>
                                </tr>
                                <tr>
                                    <td>刘先生</td>
                                    <td>男</td>
                                    <td>43</td>
                                    <td>已婚</td>
                                    <td>患者</td>
                                    <td>贵州贵阳</td>
                                    <td style="color:#35BACB">查看&nbsp;|&nbsp;下载</td>
                                </tr>

                                </tbody>
                            </table>
                            <div style="text-align: center">
                                <ul class="pagination" style="margin:0px;margin-top:10px;">
                                    <li><a href="#">&laquo;</a></li>
                                    <li class="active"><a href="#">1</a></li>
                                    <li><a href="#">2</a></li>
                                    <li><a href="#">3</a></li>
                                    <li><a href="#">4</a></li>
                                    <li><a href="#">5</a></li>
                                    <li><a href="#">&raquo;</a></li>
                                    <li class="pageGo">跳至<input type="text" class="g-input">页<input type="button" class="goBtn" onclick="" value="跳转" /></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
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
                typeList:[{value:'111',name:'aaa'},{value:'222',name:'bbb'}],
                msg: "这里是crc！",
            };
        },
        methods: {

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
    .index-titlebox {
        width: 100%;
        text-align: center;
        padding: 12px 0 8px;
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
    .info-bigbox {
        width: 80%;
        margin: 0 auto 20px;
        text-align: center;
        padding: 15px;
        box-shadow: 0 0 4px rgba(70, 109, 122, 0.4);
        -webkit-box-shadow: 0 0 4px rgba(70, 109, 122, 0.4);
        -moz-box-shadow: 0 0 4px rgba(70, 109, 122, 0.4);
        -ms-box-shadow: 0 0 4px rgba(70, 109, 122, 0.4);
        cursor: pointer;
    }
    .info-bigbox:hover {
        transform: scale(1.1);
        -ms-transform: scale(1.1);
        -webkit-transform: scale(1.1);
        -o-transform: scale(1.1);
        -moz-transform: scale(1.1);
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
    .searchFrom{
        margin-top:10px;
        padding-top:20px;
        padding-bottom:20px;
    }
    select::-ms-expand { display: none; }
    .selectPicker{
        width:280px;
        height:40px;

        border: 1px #D7D7D7 solid;
        border-radius: 4px;
    }
    .bgColor{background-color:#F5F5F5;padding-bottom:30px;}
    .searchCon{background-color:#ffffff;padding-left:20px;border-bottom:1px #DEDEDE solid;}
    .searchBtn{margin-left:20px;background-color:#35BACB;border:none;color:#fff;height:40px;position:relative;top:-2px;}
    .searchRes{margin-top:30px;background-color:#fff;padding:30px 0px 30px 0px;text-align: left}
    .checkDetail{width:162px;height:44px;background-color:#35BACB;color:#fff;border: none;margin-top:34px;}
    .resCenter{display:inline-block;line-height:26px;display:table-cell;vertical-align:bottom;}
    .resCenter-title{margin-top:0px;color:#333;font-size:23px;}
    .resRight{text-align:center;padding: 60px 0px 68px 0px;}
    hr {margin-top: 30px;margin-bottom: 30px;}
    .g-input{width:50px;height:34px;border:1px solid #ddd;margin:0px 10px 0px 10px;text-align: center}
    .pageGo{padding:6px 12px;margin-left:18px;line-height:1.42857143;}
    .goBtn{margin-left:10px;border:1px solid #ddd;background-color:#fff;padding:4px 11px;}
    .pagination>.active>a, .pagination>.active>a:focus, .pagination>.active>a:hover, .pagination>.active>span, .pagination>.active>span:focus, .pagination>.active>span:hover{
        background-color: #35BACB!important;
        border-color: #35BACB!important;
    }
    .tableType tr th{background-color:#35BACB;color:#fff;text-align:center;line-height:2.2!important;}
    .tableType tr td{text-align:center;line-height: 2.2!important;}
</style>

