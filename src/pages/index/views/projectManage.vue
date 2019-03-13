<template>
    <div >
        <Header menu-title="首页"></Header>
        <div class="bgColor">
            <div class="container list-title" style="padding:17px 15px 0px 15px;">
                <span style="color: #999999">当前位置：<a href="/" style="color:#999999">首页</a> > </span> 项目管理
                <div class="searchRes-project" style="margin-top:20px;">
                    <div class="row " style="padding:0px 20px 0px 30px;">
                        <div :class="[tabName==='查找机构'?'searchActive':'','col-md-6']" style="text-align:center;font-size:18px;" @click="toJGO">查找机构</div>
                        <div :class="[tabName==='查找项目'?'searchActive':'','col-md-6']" style="text-align:center;font-size:18px;" @click="toProject">查找项目</div>
                    </div>
                    <hr style="border:1px #F2F2F2 solid;margin-top:16px;">
                    <div v-if="isProject==false?true:false" class="searchCon-health">
                        <form class="searchFrom-project">
                            <select class="selectPicker" v-model="volunteerType" title="请选择区域">
                                <option v-for="e in typeList" :key='e.value' :value="e.value">{{e.name}}</option>
                            </select>
                            <select class="selectPicker" v-model="volunteerType" title="请选择项目类型" style="margin-left:20px;">
                                <option v-for="e in typeList" :key='e.value' :value="e.value">{{e.name}}</option>
                            </select>
                            <select class="selectPicker" v-model="volunteerType" title="请输入医院名称" style="margin-left:20px;">
                                <option v-for="e in typeList" :key='e.value' :value="e.value">{{e.name}}</option>
                            </select>
                            <select class="selectPicker" v-model="volunteerType" title="床位数量" style="margin-left:20px;width:139px;">
                                <option v-for="e in typeList" :key='e.value' :value="e.value">{{e.name}}</option>
                            </select>
                            <button type="button" class="btn btn-default searchBtn-health">查询</button>
                        </form>
                    </div>
                    <div v-if="isProject==false?true:false" class="searchRes-health">
                        <p style="padding:0px 20px 20px 30px;">
                            共查询到<span style="font-size:20px;color: #35BACB;">20</span>条结果
                        </p>
                        <div class="tableType" style="padding:0px 30px 0px 30px;">
                            <table class="table table-striped">
                                <thead>
                                <tr>
                                    <th>机构名称</th>
                                    <th>所在区域</th>
                                    <th>主做类型</th>
                                    <th>机构级别</th>
                                    <th>机构床位</th>
                                    <th>联系电话</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>江苏省人民医院</td>
                                    <td>江苏省宿迁市</td>
                                    <td>神经内科</td>
                                    <td>三级甲等</td>
                                    <td>300</td>
                                    <td>17512345678</td>
                                </tr>
                                <tr>
                                    <td>江苏省人民医院</td>
                                    <td>江苏省宿迁市</td>
                                    <td>神经内科</td>
                                    <td>三级甲等</td>
                                    <td>300</td>
                                    <td>17512345678</td>
                                </tr>
                                <tr>
                                    <td>江苏省人民医院</td>
                                    <td>江苏省宿迁市</td>
                                    <td>神经内科</td>
                                    <td>三级甲等</td>
                                    <td>300</td>
                                    <td>17512345678</td>
                                </tr>
                                <tr>
                                    <td>江苏省人民医院</td>
                                    <td>江苏省宿迁市</td>
                                    <td>神经内科</td>
                                    <td>三级甲等</td>
                                    <td>300</td>
                                    <td>17512345678</td>
                                </tr>
                                <tr>
                                    <td>江苏省人民医院</td>
                                    <td>江苏省宿迁市</td>
                                    <td>神经内科</td>
                                    <td>三级甲等</td>
                                    <td>300</td>
                                    <td>17512345678</td>
                                </tr>
                                <tr>
                                    <td>江苏省人民医院</td>
                                    <td>江苏省宿迁市</td>
                                    <td>神经内科</td>
                                    <td>三级甲等</td>
                                    <td>300</td>
                                    <td>17512345678</td>
                                </tr>
                                <tr>
                                    <td>江苏省人民医院</td>
                                    <td>江苏省宿迁市</td>
                                    <td>神经内科</td>
                                    <td>三级甲等</td>
                                    <td>300</td>
                                    <td>17512345678</td>
                                </tr>
                                <tr>
                                    <td>江苏省人民医院</td>
                                    <td>江苏省宿迁市</td>
                                    <td>神经内科</td>
                                    <td>三级甲等</td>
                                    <td>300</td>
                                    <td>17512345678</td>
                                </tr>
                                <tr>
                                    <td>江苏省人民医院</td>
                                    <td>江苏省宿迁市</td>
                                    <td>神经内科</td>
                                    <td>三级甲等</td>
                                    <td>300</td>
                                    <td>17512345678</td>
                                </tr>
                                <tr>
                                    <td>江苏省人民医院</td>
                                    <td>江苏省宿迁市</td>
                                    <td>神经内科</td>
                                    <td>三级甲等</td>
                                    <td>300</td>
                                    <td>17512345678</td>
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
                    <div v-if="isProject" class="searchCon-health">
                        <form class="searchFrom-project">
                            <select class="selectPicker" v-model="volunteerType" title="请选择志愿者类型">
                                <option v-for="e in typeList" :key='e.value' :value="e.value">{{e.name}}</option>
                            </select>
                            <select class="selectPicker" v-model="volunteerType" title="请选择项目名称" style="margin-left:20px;">
                                <option v-for="e in typeList" :key='e.value' :value="e.value">{{e.name}}</option>
                            </select>
                            <select class="selectPicker" v-model="volunteerType" title="请选择补偿金额" style="margin-left:20px;">
                                <option v-for="e in typeList" :key='e.value' :value="e.value">{{e.name}}</option>
                            </select>
                            <button type="button" class="btn btn-default searchBtn-health">查询</button>
                        </form>
                    </div>
                    <div v-if="isProject" class="searchRes-health">
                        <p style="padding:0px 20px 20px 30px;">
                            共查询到<span style="font-size:20px;color: #35BACB;">20</span>条结果
                        </p>
                        <div class="tableType" style="padding:0px 30px 0px 30px;">
                            <table class="table table-striped">
                                <thead>
                                <tr>
                                    <th>发布机构</th>
                                    <th>项目名称</th>
                                    <th>志愿者类型</th>
                                    <th>招募总数</th>
                                    <th>筛选时间</th>
                                    <th>体检时间</th>
                                    <th>补偿金额</th>
                                    <th>状态</th>
                                    <th>操作</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>XXX招募公司</td>
                                    <td>空腹降压药</td>
                                    <td>健康志愿者</td>
                                    <td>150</td>
                                    <td>2018-12-28</td>
                                    <td>2018-12-28</td>
                                    <td>3000</td>
                                    <td>招募中</td>
                                    <td><a href="/projectManage" style="color:#35BACB">查看</a></td>
                                </tr>
                                <tr>
                                    <td>XXX招募公司</td>
                                    <td>空腹降压药</td>
                                    <td>健康志愿者</td>
                                    <td>150</td>
                                    <td>2018-12-28</td>
                                    <td>2018-12-28</td>
                                    <td>3000</td>
                                    <td>招募中</td>
                                    <td><a href="/projectManage" style="color:#35BACB">查看</a></td>
                                </tr>
                                <tr>
                                    <td>XXX招募公司</td>
                                    <td>空腹降压药</td>
                                    <td>健康志愿者</td>
                                    <td>150</td>
                                    <td>2018-12-28</td>
                                    <td>2018-12-28</td>
                                    <td>3000</td>
                                    <td>招募中</td>
                                    <td><a href="/projectManage" style="color:#35BACB">查看</a></td>
                                </tr>
                                <tr>
                                    <td>XXX招募公司</td>
                                    <td>空腹降压药</td>
                                    <td>健康志愿者</td>
                                    <td>150</td>
                                    <td>2018-12-28</td>
                                    <td>2018-12-28</td>
                                    <td>3000</td>
                                    <td>招募中</td>
                                    <td><a href="/projectManage" style="color:#35BACB">查看</a></td>
                                </tr>
                                <tr>
                                    <td>XXX招募公司</td>
                                    <td>空腹降压药</td>
                                    <td>健康志愿者</td>
                                    <td>150</td>
                                    <td>2018-12-28</td>
                                    <td>2018-12-28</td>
                                    <td>3000</td>
                                    <td>招募中</td>
                                    <td><a href="/projectManage" style="color:#35BACB">查看</a></td>
                                </tr>
                                <tr>
                                    <td>XXX招募公司</td>
                                    <td>空腹降压药</td>
                                    <td>健康志愿者</td>
                                    <td>150</td>
                                    <td>2018-12-28</td>
                                    <td>2018-12-28</td>
                                    <td>3000</td>
                                    <td>招募中</td>
                                    <td><a href="/projectManage" style="color:#35BACB">查看</a></td>
                                </tr>
                                <tr>
                                    <td>XXX招募公司</td>
                                    <td>空腹降压药</td>
                                    <td>健康志愿者</td>
                                    <td>150</td>
                                    <td>2018-12-28</td>
                                    <td>2018-12-28</td>
                                    <td>3000</td>
                                    <td>招募中</td>
                                    <td><a href="/projectManage" style="color:#35BACB">查看</a></td>
                                </tr>
                                <tr>
                                    <td>XXX招募公司</td>
                                    <td>空腹降压药</td>
                                    <td>健康志愿者</td>
                                    <td>150</td>
                                    <td>2018-12-28</td>
                                    <td>2018-12-28</td>
                                    <td>3000</td>
                                    <td>招募中</td>
                                    <td><a href="/projectManage" style="color:#35BACB">查看</a></td>
                                </tr>
                                <tr>
                                    <td>XXX招募公司</td>
                                    <td>空腹降压药</td>
                                    <td>健康志愿者</td>
                                    <td>150</td>
                                    <td>2018-12-28</td>
                                    <td>2018-12-28</td>
                                    <td>3000</td>
                                    <td>招募中</td>
                                    <td><a href="/projectManage" style="color:#35BACB">查看</a></td>
                                </tr>
                                <tr>
                                    <td>XXX招募公司</td>
                                    <td>空腹降压药</td>
                                    <td>健康志愿者</td>
                                    <td>150</td>
                                    <td>2018-12-28</td>
                                    <td>2018-12-28</td>
                                    <td>3000</td>
                                    <td>招募中</td>
                                    <td><a href="/projectManage" style="color:#35BACB">查看</a></td>
                                </tr>
                                <tr>
                                    <td>XXX招募公司</td>
                                    <td>空腹降压药</td>
                                    <td>健康志愿者</td>
                                    <td>150</td>
                                    <td>2018-12-28</td>
                                    <td>2018-12-28</td>
                                    <td>3000</td>
                                    <td>招募中</td>
                                    <td><a href="/projectManage" style="color:#35BACB">查看</a></td>
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
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
    import Header from "../components/common/header.vue";
    import Footer from "../components/common/footer.vue";
    import Tabs from 'iview';
    export default {
        name: "app",
        components: { Header, Footer,Tabs },
        data() {
            return {
                tabName:'查找机构',
                volunteerType:'',
                msg: "这里是资讯列表！",
                menuTitle:'志愿者',
                isProject:false
            };
        },
        created(){
        },
        methods: {
            toOnline(){
                this.$router.push('/online');
            },
            toJGO(){
                this.isProject=false;
                this.tabName='查找机构';
            },
            toProject(){
                this.isProject=true;
                this.tabName='查找项目';
            }

        }
    };
</script>
<style>
    .searchActive{
        color:#35BACB;
    }
    .searchFrom-project{
        margin-top:0px;
        padding-top:30px;
        padding-bottom:30px;
    }
    .searchCon-health{background-color:#ffffff;padding-left:20px;border-bottom:1px #DEDEDE solid;}
    .searchBtn-health{margin-left:20px;background-color:#35BACB;border:none;color:#fff;height:40px;position:relative;top:-2px;}
    .searchRes-health{background-color:#fff;padding:30px 0px 30px 0px;text-align: left;}
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
    .triangle_border_up{
        width:0;
        height:0;
        border-width:0 10px 10px;
        border-style:solid;
        border-color:transparent transparent #fff;/*透明 透明  灰*/
        margin:40px auto;
        position:relative;
    }
</style>
