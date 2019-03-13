<template>
    <div >
        <Header menu-title="志愿者"></Header>
        <div class="bgColor" id="hospital">
            <section class="container list-title">
                <div class="searchCon" style="padding-top:24px;">
                    <Form :model="query" label-position="right" :label-width="0" inline >
                        <FormItem label="">
                            <Select v-model="query.province" placeholder="请选择省" style="width:120px" @on-change="selectCity">
                                <Option v-for="item in provinceOption" :key="item.value" :label="item.label" :value="item.value">
                                </Option>
                            </Select>
                            <Select v-model="query.city" placeholder="请选择市" style="width:120px" @on-change="selectCounty">
                                <Option v-for="item in cityOption" :key="item.value" :label="item.label" :value="item.value">
                                </Option>
                            </Select>
                            <Select v-model="query.county" placeholder="请选择区县" style="width:120px">
                                <Option v-for="item in countyOption" :key="item.value" :label="item.label" :value="item.value">
                                </Option>
                            </Select>
                        </FormItem>
                        <FormItem label="" prop="hospitalId">
                            <Select v-model="query.hospitalId" placeholder="请选择机构名称" style="width:200px">
                                <Option v-for="item in hospitalOption" :key="item.value" :label="item.label" :value="item.value">
                                </Option>
                            </Select>
                        </FormItem>
                        <FormItem label="" prop="testType">
                            <Select v-model="query.testType" placeholder="请选择志愿者类型" style="width:200px">
                                <Option v-for="item in testTypeOption" :key="item.value" :label="item.label" :value="item.value">
                                </Option>
                            </Select>
                        </FormItem>
                        <FormItem label="" prop="compensationMoney">
                            <Input v-model="query.compensationMoney" style="width:200px" placeholder="请输入补偿金" />
                        </FormItem>
                        <FormItem :label-width="50">
                            <Button type="primary" @click="handleSearch" style="background-color:#35BACB;border:1px solid #35BACB;">查询</Button>
                        </FormItem>
                    </Form>
                </div>
                <div class="searchType" v-if="isShowType">
                    <dl>
                        <dt>西医</dt>
                        <dd>
                            <a href="#" class="active">全部</a>
                            <a href="#">心血管</a>
                            <a href="#">肿瘤</a>
                            <a href="#">呼吸</a>
                            <a href="#">消化</a>
                            <a href="#">神经内科</a>
                            <a href="#">肾病</a>
                            <a href="#">内分泌</a>
                            <a href="#">血液</a>
                            <a href="#">皮肤</a>
                           <!-- <a href="#" style="margin-left:90px;">更多</a>-->
                        </dd>
                    </dl>
                    <dl>
                        <dt>西医</dt>
                        <dd>
                            <a href="#" class="active">全部</a>
                            <a href="#">心血管</a>
                            <a href="#">骨伤</a>
                            <a href="#">神经内科</a>
                            <a href="#">肾病</a>
                            <a href="#">内分泌</a>
                            <a href="#">血液</a>
                            <a href="#">皮肤</a>
                            <a href="#">肿瘤</a>
                            <a href="#">呼吸</a>
                        </dd>
                    </dl>
                    <dl>
                        <dt>民族医</dt>
                        <dd>
                            <a href="#" class="active">全部</a>
                            <a href="#">脑血管</a>
                            <a href="#">骨伤</a>
                            <a href="#">风湿</a>
                            <a href="#">血液</a>
                            <a href="#">肝胆内科</a>
                            <a href="#">心脑血管</a>
                        </dd>
                    </dl>
                </div>
                <div class="searchRes" :style="isShowType==false?'margin-top:0px':''">
                    <p style="padding:0px 20px 20px 30px;">
                        共查询到<span style="font-size:20px;color: #35BACB;">&nbsp;{{page.total}}&nbsp;</span>条结果
                        <span style="float:right">
              <span style="margin-right:8px;color:#C6C6C6">显示方式</span><span style="color:#C6C6C6">|</span>
              <img :src="isShowType1" style="padding:0px 10px 0px 18px;" @click="isShowTypeOne" />
              <img :src="isShowType2" style="padding:0px 10px;" @click="isShowTypeOne" />
            </span>
                    </p>
                    <div v-if="isShowType">
                        <div v-if="page.total==0?true:false" style="text-align: center">暂无数据</div>
                        <div v-for="(item, index) in tableData">
                            <div class="row " style="padding:0px 20px 0px 30px;">
                                <div class="col-md-4" style="display:inline-block;">
                                    <img src="../../../assets/img/pic1.png" />
                                </div>
                                <div class="col-md-4 resCenter-info">
                                    <h4 class="resCenter-title-info">{{ item.projectName }}</h4>
                                    <p><span style="color:#999">适应范围：</span><span style="color: #333;">{{ item.applicationMedicine }}</span></p>
                                    <p><span style="color:#999">研究机构：</span><span style="color: #333;">{{ item.hospitalName }}</span></p>
                                    <p><span style="color:#999">开展地点：</span><span style="color: #333;">{{ item.areaAddress }}</span></p>
                                    <p><span style="color:#999">招募人数：</span><span style="color:#35BACB;">{{ item.recruitedNumber }}</span>/{{ item.recruitNumber }}</p>
                                    <p><span style="color:#999">补偿金额：</span><span style="color: #333;">{{ item.compensationMoney }}</span></p>
                                    <p><span style="color:#999;">报名截止时间：</span><span style="color: #333;">{{ item.applyEndTime }}</span></p>
                                </div>
                                <div class="col-md-4 resRight">
                                    <h4 style="color:#04BA7D;font-size:18px;">{{ item.recruitStatus==0?'未招募':item.recruitStatus==1?'招募中':item.recruitStatus==2?'停止招募':'' }}</h4>
                                    <button class="btn btn-default checkDetail" @click="toDetail(item.id)">查看详情</button>
                                </div>
                            </div>
                            <hr align="center" style= "border:1px dotted #EBEBEB;margin-top:10px;margin-bottom: 30px;" />
                        </div>
                        <div style="margin: 10px;overflow: hidden">
                            <div style="text-align: center">
                                <Page :total="page.total" :current="page.pageNumber" :page-size-opts="[5,10,15,20]" :page-size="page.pageSize" show-elevator show-sizer
                                      placement="top" @on-change="handlePage" @on-page-size-change="handlePageSize"></Page>
                            </div>
                        </div>
                        <!--<div class="row" style="padding:0px 20px 0px 30px;">
                            <div class="col-md-4" style="display:inline-block;">
                                <img src="../../../assets/img/pic1.png" />
                            </div>
                            <div class="col-md-4 resCenter-info">
                                <h4 class="resCenter-title-info">胃癌或胃食管结合部腺癌患者招募</h4>
                                <p><span style="color:#999">适应范围：</span><span style="color: #333;">类风湿性关节炎</span></p>
                                <p><span style="color:#999">研究机构：</span><span style="color: #333;">上海医院</span></p>
                                <p><span style="color:#999">开展地点：</span><span style="color: #333;">上海</span></p>
                                <p><span style="color:#999">招募人数：</span><span style="color:#35BACB;">20</span>/50</p>
                                <p><span style="color:#999">补偿金额：</span><span style="color: #333;">5000</span></p>
                                <p style="display:table-cell;vertical-align:bottom;"><span style="color:#999">体检时间：</span><span style="color: #333;">2018-12-13</span></p>
                            </div>
                            <div class="col-md-4 resRight">
                                <h4 style="color:#04BA7D;font-size:18px;">招募中</h4>
                                <button class="btn btn-default checkDetail">查看详情</button>
                            </div>
                        </div>
                        <hr align="center" style= "border:1px dotted #EBEBEB;margin-top:10px;margin-bottom: 30px;" />
                        <div class="row" style="padding:0px 20px 0px 30px;">
                            <div class="col-md-4" style="display:inline-block;">
                                <img src="../../../assets/img/pic1.png" />
                            </div>
                            <div class="col-md-4 resCenter-info">
                                <h4 class="resCenter-title-info">胃癌或胃食管结合部腺癌患者招募</h4>
                                <p><span style="color:#999">适应范围：</span><span style="color: #333;">类风湿性关节炎</span></p>
                                <p><span style="color:#999">研究机构：</span><span style="color: #333;">上海医院</span></p>
                                <p><span style="color:#999">开展地点：</span><span style="color: #333;">上海</span></p>
                                <p><span style="color:#999">招募人数：</span><span style="color:#35BACB;">20</span>/50</p>
                                <p><span style="color:#999">补偿金额：</span><span style="color: #333;">5000</span></p>
                                <p><span style="color:#999">体检时间：</span><span style="color: #333;">2018-12-13</span></p>
                            </div>
                            <div class="col-md-4 resRight">
                                <h4 style="color:#04BA7D;font-size:18px;">招募中</h4>
                                <button class="btn btn-default checkDetail">查看详情</button>
                            </div>
                        </div>
                        <hr align="center" style= "border:1px dotted #EBEBEB;margin-top:10px;margin-bottom: 30px;" />
                        <div style="text-align: center">
                            <ul class="pagination" style="margin:0px;">
                                <li><a href="#">&laquo;</a></li>
                                <li class="active"><a href="#">1</a></li>
                                <li><a href="#">2</a></li>
                                <li><a href="#">3</a></li>
                                <li><a href="#">4</a></li>
                                <li><a href="#">5</a></li>
                                <li><a href="#">&raquo;</a></li>
                                <li class="pageGo">跳至<input type="text" class="g-input">页<input type="button" class="goBtn" onclick="" value="跳转" /></li>
                            </ul>
                        </div>-->
                    </div>
                    <div v-if="isShowType==false?true:false">
                        <div class="tableType" style="padding:0px 30px 0px 30px;">
                            <Table :data="tableDataT" :columns="columns" stripe></Table>
                            <div style="margin: 10px;overflow: hidden">
                                <div style="text-align: center">
                                    <Page :total="pageT.total" :current="pageT.pageNumber" :page-size="pageT.pageSize" show-elevator show-sizer
                                          placement="top" @on-change="handlePageT" @on-page-size-change='handlePageSizeT'></Page>
                                </div>
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
    import { Form,FormItem,Select,Option,Input,Button,Page,Table } from 'iview';
    import { getSelectAreaPC,getSelectAreaPY,getSelectAreaCY,getSelectValueDesc } from '../../../api/common.js'
    import { selectHospital,projectList } from '../../../api/frontSomeInterface.js'
    export default {
        name: "home",
        components: { Header, Footer,Form,FormItem,Select,Option,Input,Button,Page,Table },
        data() {
            return {
                provinceOption:[],
                cityOption:[],
                countyOption:[],
                hospitalOption:[],
                testTypeOption:[],
                recruitOption:[],
                query:{
                    province:'',
                    city:'',
                    county:'',
                    hospitalId:'',
                    testType:'',
                    compensationMoney:'',
                },
                tableData:[],
                page:{
                    pageNumber: 1,
                    pageSize: 5,
                    total: 0
                },
                pageT:{
                    pageNumber: 1,
                    pageSize: 10,
                    total: 0
                },
                isShowType:true,
                isShowType1:require('../../../assets/img/list1.png'),
                isShowType2:require('../../../assets/img/list3.png'),
                columns:[
                    {
                        title: '项目名称',
                        align:'center',
                        key: 'projectName',
                    },
                    {
                        title: '机构名称',
                        align:'center',
                        key: 'hospitalName',
                    },
                    {
                        title: '地点',
                        key: 'areaAddress',
                        align: 'center',
                    },
                    {
                        title: '报名截止时间',
                        align:'center',
                        key: 'applyEndTime',
                    },
                    {
                        title: '补偿金额',
                        align:'center',
                        key: 'compensationMoney',
                    },
                    {
                        title: '招募人数',
                        align:'center',
                        key: 'recruitNumber'
                    },
                    {
                        title: '招募状态',
                        align:'center',
                        key: 'recruitStatus',
                        render: (h, params) => {
                            return h('div',
                                this.getStatus(params.row.recruitStatus)
                            )
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 160,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('span', {
                                    props: {
                                        type: 'text',
                                        size: 'small',
                                    },
                                    style:{
                                        color:'#35BACB',
                                    },
                                    on: {
                                        click: () => {
                                            this.toDetail(params.row.id)
                                        }
                                    },

                                }, '查看详情')
                            ]);
                        }
                    }
                ],
                tableDataT:[],

            };
        },
        created(){
            getSelectAreaPC().then(res => {
                this.cityOption=[];
                this.countyOption=[];
                if(res.data.code = 200){
                    this.provinceOption = res.data.msg
                }
            });
            this.getList();
            this.getListT();
            selectHospital().then(res => {
                this.hospitalOption=res.data.data;
            })
            let testType = {
                "key": 'SUBJECT_TYPE'
            }
            getSelectValueDesc(testType).then(res => {
                if(res.data.code = 200){
                    this.testTypeOption = res.data.msg
                }
            })
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
            getStatus(value) {
                var label = ''
                for(var child of this.recruitOption) {
                    if(child.value === value) {
                        label = child.label;
                        break;
                    }
                }
                return label;
            },
            initFormatter() {
                //console.log('myDepartmentName=='+JSON.stringify(this.myDepartmentName));
                Date.prototype.Format = function (fmt) { //
                    let o = {
                        "M+": this.getMonth() + 1,                 //月份
                        "d+": this.getDate(),                    //日
                        "h+": this.getHours(),                   //小时
                        "m+": this.getMinutes(),                 //分
                        "s+": this.getSeconds(),                 //秒
                        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                        "S": this.getMilliseconds()             //毫秒
                    };
                    if (/(y+)/.test(fmt))
                        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
                    for (var k in o)
                        if (new RegExp("(" + k + ")").test(fmt))
                            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                    return fmt;
                }
            },
            selectCity(value){
                this.countyOption=[];
                let codePY={
                    "code":value
                }
                getSelectAreaPY(codePY).then(res => {
                    if(res.data.code = 200){
                        this.cityOption = res.data.msg
                    }
                });
            },
            selectCounty(value){
                let codePY={
                    "code":value
                }
                getSelectAreaCY(codePY).then(res => {
                    if(res.data.code = 200){
                        this.countyOption = res.data.msg
                    }
                });
            },
            isShowTypeOne(){
                if(this.isShowType==true){
                    this.isShowType=false;
                    this.isShowType1=require('../../../assets/img/list2.png');
                    this.isShowType2=require('../../../assets/img/list4.png');
                }else{
                    this.isShowType=true;
                    this.isShowType1=require('../../../assets/img/list1.png');
                    this.isShowType2=require('../../../assets/img/list3.png');
                }
            },
            toDetail(id){
                this.$router.push({ path: "/infoListDetail", query: { id: id } });
                //this.$router.push('/infoListDetail');
            },
            handleSearch(){
                if(this.isShowType==true){
                    this.getList();
                }else if(this.isShowType==false){
                    this.getListT();
                }
            },
            getList(){
                let params = {
                    hospitalId: this.query.hospitalId,
                    testType:this.query.testType,
                    compensationMoney:this.query.compensationMoney,
                    province: this.query.province,
                    city: this.query.city,
                    county: this.query.county,
                    pageNumber: this.page.pageNumber,
                    pageSize: this.page.pageSize,
                };
                console.log('params=='+JSON.stringify(params));
                projectList(params)
                    .then(res => {
                        this.tableData = res.data.page.list;
                        for(let i=0;i<this.tableData.length;i++){
                            if(this.tableData[i].applyEndTime!=undefined&&this.tableData[i].applyEndTime!=null&&this.tableData[i].applyEndTime!=''){
                                this.tableData[i].applyEndTime=this.tableData[i].applyEndTime.substring(0, 10);
                            }
                            /*for (let j=0;j<this.recruitOption.length;j++){
                                if(this.tableData[i].recruitStatus==this.recruitOption[j].value){
                                    this.tableData[i].recruitStatus=this.recruitOption[j].label;
                                    break;
                                }

                            }*/
                        }
                        this.page.pageNumber = res.data.page.pageNumber;
                        this.page.pageSize = res.data.page.pageSize;
                        this.page.total = res.data.page.totalRow;
                    })
            },
            getListT(){
                let params = {
                    hospitalId: this.query.hospitalId,
                    testType: this.query.testType,
                    compensationMoney:this.query.compensationMoney,
                    province: this.query.province,
                    city: this.query.city,
                    county: this.query.county,
                    pageNumber: this.pageT.pageNumber,
                    pageNumber: this.pageT.pageNumber,
                    pageSize: this.pageT.pageSize,
                };
                //console.log('params=='+JSON.stringify(params));
                projectList(params)
                    .then(res => {
                        this.tableDataT = res.data.page.list;
                        for(let i=0;i<this.tableDataT.length;i++){
                            if(this.tableDataT[i].applyEndTime!=undefined&&this.tableDataT[i].applyEndTime!=null&&this.tableDataT[i].applyEndTime!=''){
                                this.tableDataT[i].applyEndTime=this.tableDataT[i].applyEndTime.substring(0, 10);
                            }
                        }
                        this.pageT.pageNumber = res.data.page.pageNumber;
                        this.pageT.pageSize = res.data.page.pageSize;
                        this.pageT.total = res.data.page.totalRow;
                    })
            },
            handlePage(val){
                this.page.pageNumber = val;
                this.getList();
            },
            handlePageSize(val){
                this.page.pageSize = val;
                this.getList();
            },
            handlePageT(val){
                console.log('val=='+val);
                this.pageT.pageNumber = val;
                this.getListT();
            },
            handlePageSizeT(val){
                console.log('val=1='+val);
                this.pageT.pageSize = val;
                this.getListT();
            },

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
    .list-bottom {
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
    }
    .list-bottom p {
        color: #ccc;
    }
    .searchFrom{
        margin-top:30px;
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
    .searchType{background-color:#ffffff;padding:40px 20px 20px 20px;text-align: left;}
    dl{margin:0;margin-bottom:28px!important;}
    dt,dd{ display:inline-block; margin:0; padding:0;}
    dt { font-weight: bold;}
    dt::after { content: " :  "; }
    dd::after{ content:"\0A"; white-space:pre; }
    dd a{padding:4px 8px;border-radius:4px;color:#666;margin-left:20px;text-decoration:none}
    dd a:hover{text-decoration:none;color:#35BACB}
    dt{width:100px!important;text-align:right;}
    .active{background-color:#35BACB;color:#fff;}
    .active:hover{background-color:#35BACB;color:#fff;}
    .searchRes{margin-top:30px;background-color:#fff;padding:30px 0px 30px 0px;text-align: left}
    .checkDetail{width:162px;height:44px;background-color:#35BACB;color:#fff;border: none;margin-top:34px;}
    .resCenter-info{display:inline-block;line-height:26px;display:table-cell;vertical-align:bottom;}
    .resCenter-info p{margin:0px 0px 10px;}
    .resCenter-title-info{margin-bottom:20px;color:#333;font-size:23px;}
    .resRight{text-align:center;padding: 60px 0px 68px 0px;}
    hr {}
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
<style lang="less">
    #hospital {
        .ivu-table {
            font-size: 16px !important;
        }
        .ivu-table-cell{
            padding:8px!important;
        }

    }
</style>