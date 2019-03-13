<template>
    <div>
        <Header menu-title="CRO公司"></Header>
        <div class="bgColor" id="hospital">
            <section class="container">
                <div class="searchCon-health" style="padding-top:24px;">
                    <Form :model="query" label-position="right" :label-width="0" inline >
                        <FormItem label="">
                            <Select v-model="query.province" placeholder="请选择省" style="width:140px" @on-change="selectCity">
                                <Option v-for="item in provinceOption" :key="item.value" :label="item.label" :value="item.value">
                                </Option>
                            </Select>
                            <Select v-model="query.city" placeholder="请选择市" style="width:140px" @on-change="selectCounty">
                                <Option v-for="item in cityOption" :key="item.value" :label="item.label" :value="item.value">
                                </Option>
                            </Select>
                            <Select v-model="query.county" placeholder="请选择区县" style="width:140px">
                                <Option v-for="item in countyOption" :key="item.value" :label="item.label" :value="item.value">
                                </Option>
                            </Select>
                        </FormItem>
                        <FormItem label="" prop="corporateName">
                            <Input v-model="query.corporateName" style="width:280px" placeholder="请输入机构名称" />
                        </FormItem>
                        <FormItem :label-width="50">
                            <Button type="primary" @click="handleSearch" style="background-color:#35BACB;border:1px solid #35BACB;">查询</Button>
                        </FormItem>
                    </Form>
                </div>
                <div class="searchRes-health" :style="isShowType==false?'margin-top:0px':''">
                    <p style="padding:0px 20px 20px 30px;">
                        共查询到<span style="font-size:20px;color: #35BACB;">&nbsp;{{page.total}}&nbsp;</span>条结果
                        <span style="float:right">
              <span style="margin-right:8px;color:#C6C6C6">显示方式</span><span style="color:#C6C6C6">|</span>
              <img :src="isShowType1" style="padding:0px 10px 0px 18px;" @click="isShowTypeOne" />
              <img :src="isShowType2" style="padding:0px 10px;" @click="isShowTypeOne" />
            </span>
                    </p>
                    <div v-if="isShowType">
                        <div v-if="page.total==0?true:false" style="text-align: center;">暂无数据</div>
                        <div v-for="(item, index) in tableData">
                            <div class="row " style="padding:0px 20px 0px 30px;">
                                <div class="col-md-4" style="display:inline-block;">
                                    <img src="../../../assets/img/pic1.png" />
                                </div>
                                <div class="col-md-4 resCenter-health">
                                    <h4 class="resCenter-title-health">{{ item.corporateName }}</h4>
                                    <p><span style="color:#999">主做类型：</span><span style="color: #333;">{{ item.corporateName }}</span></p>
                                    <p><span style="color:#999">机构级别：</span><span style="color: #333;">{{ item.organizationLevel }}</span></p>
                                    <p><span style="color:#999">机构床位：</span><span style="color: #333;">{{ item.bedPlace }}</span></p>
                                    <p><span style="color:#999">联系电话：</span><span style="color:#35BACB;">{{ item.phone }}</span></p>
                                    <p><span style="color:#999">地址：</span><span style="color: #333;">{{ item.areaAddress }}</span></p>
                                    <p><span style="color:#999;">网址：</span><span style="color: #333;">{{ item.url }}</span></p>
                                </div>
                                <div class="col-md-4 resRight">
                                    <button class="btn btn-default checkDetail" @click="toDetail(item.id)">公司简介</button>
                                </div>
                            </div>
                            <hr align="center" style= "border:1px dotted #EBEBEB;margin-top:17px;margin-bottom:30px;" />
                        </div>
                        <div style="margin: 10px;overflow: hidden">
                            <div style="text-align: center">
                                <Page :total="page.total" :current="page.pageNumber" :page-size-opts="[5,10,15,20]" :page-size="page.pageSize" show-elevator show-sizer
                                      placement="top" @on-change="handlePage" @on-page-size-change="handlePageSize"></Page>
                            </div>
                        </div>
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
    import { getSelectAreaPC,getSelectAreaPY,getSelectAreaCY } from '../../../api/common.js'
    import { medicineList } from '../../../api/frontSomeInterface.js'
    export default {
        name: "app",
        components: { Header, Footer,Form,FormItem,Select,Option,Input,Button,Page,Table },
        data() {
            return {
                provinceOption:[],
                cityOption:[],
                countyOption:[],
                hospitalOption:[],
                query:{
                    province:'',
                    city:'',
                    county:'',
                    corporateName:''
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
                columns:[
                    {
                        title: '公司名称',
                        align:'center',
                        key: 'corporateName',
                    },
                    {
                        title: '地址',
                        key: 'areaAddress',
                        align: 'center',
                    },
                    {
                        title: '主做类型',
                        align:'center',
                        key: 'mainType',
                    },
                    {
                        title: '机构级别',
                        align:'center',
                        key: 'organizationLevel',
                    },
                    {
                        title: '机构床位',
                        align:'center',
                        key: 'bedPlace'
                    },
                    {
                        title: '联系电话',
                        align:'center',
                        key: 'phone',
                    },
                    {
                        title: '网址',
                        align:'center',
                        key: 'url',
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
                                            this.toBiddingPartyProject(params.row.id)
                                        }
                                    },

                                }, '查看详情')
                            ]);
                        }
                    }
                ],
                tableDataT:[],
                isShowType:true,
                isShowType1:require('../../../assets/img/list1.png'),
                isShowType2:require('../../../assets/img/list3.png'),
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
        },
        methods: {
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
                    this.getListT();
                }else{
                    this.isShowType=true;
                    this.isShowType1=require('../../../assets/img/list1.png');
                    this.isShowType2=require('../../../assets/img/list3.png');
                    this.getList();
                }
            },
            toDetail(id){
                this.$router.push({ path: "/croDetail", query: { id: id } });
                //this.$router.push('/biddingPartyDetail');
            },
            toBiddingPartyProject(id){
                this.$router.push({path:"/croProject",query: { id: id } });
                //this.$router.push('/biddingPartyProject');
                //this.$router.push({name:'infoListDetail',params:{id: 'healthInfo'}});
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
                    corporateName: this.query.corporateName,
                    province: this.query.province,
                    city: this.query.city,
                    county: this.query.county,
                    pageNumber: this.page.pageNumber,
                    pageSize: this.page.pageSize,
                    type:2
                };
                //console.log('params=='+JSON.stringify(params));
                medicineList(params)
                    .then(res => {
                        this.tableData = res.data.page.list;
                        this.page.pageNumber = res.data.page.pageNumber;
                        this.page.pageSize = res.data.page.pageSize;
                        this.page.total = res.data.page.totalRow;
                    })
            },
            getListT(){
                let params = {
                    corporateName: this.query.corporateName,
                    province: this.query.province,
                    city: this.query.city,
                    county: this.query.county,
                    pageNumber: this.pageT.pageNumber,
                    pageSize: this.pageT.pageSize,
                    type:2
                };
                //console.log('params=='+JSON.stringify(params));
                medicineList(params)
                    .then(res => {
                        this.tableDataT = res.data.page.list;
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
    .searchFrom-health{
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
    .searchCon-health{background-color:#ffffff;padding-left:20px;border-bottom:1px #DEDEDE solid;}
    .searchBtn-health{margin-left:20px;background-color:#35BACB;border:none;color:#fff;height:40px;position:relative;top:-2px;}
    .searchRes-health{background-color:#fff;padding:30px 0px 30px 0px;text-align: left;}
    .checkDetail{width:162px;height:44px;background-color:#35BACB;color:#fff;border: none;margin-top:34px;}
    .resCenter-health{display:inline-block;line-height:26px;display:table-cell;vertical-align:bottom;}
    .resCenter-title-health{margin-bottom:18px;color:#333;font-size:23px;}
    .resCenter-health p{margin:0px 0px 10px!important;}
    .resRight{text-align:center;padding: 60px 0px 68px 0px;}
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
