 <template>
    <div id="online">
        <Header menu-title="志愿者"></Header>
        <div class="bgColor">
            <div class="container list-title" style="padding:17px 15px 0px 15px;">
                <span style="color: #999999">当前位置：<a href="/infoList" style="color:#999999">志愿者</a> > <a href="/infoListDetail" style="color:#999999">项目详情</a> ></span> 报名
                <div class="searchRes" style="margin-top:20px;">
                    <h4 style="color: #35BACB;font-size: 24px;text-align: center;">报名项目：{{ info.projectName }}</h4>
                    <p style="font-size:18px;color:#333333;padding:30px 0px 55px 0px;text-align: center;">志愿者类型：{{ info.testType==1?'健康受试者':info.testType==2?'患者受试者':'' }}</p>
                    <form class="form-horizontal" role="form" @keydown.enter.native="" style="padding:0px 158px 70px 80px;">
                        <div class="form-group">
                            <label class="col-xs-2 control-label">姓名：</label>
                            <div class="col-xs-4">
                                <input type="text" class="form-control" placeholder="请输入姓名" v-model="name">
                            </div>
                            <label class="col-xs-2 control-label">性别：</label>
                            <div class="col-xs-4">
                                <select class="selectPicker" v-model="sex" style="width:290px">
                                    <option value="" style="color: #999999;">&nbsp;&nbsp;请选择性别</option>
                                    <option v-for="e in sexList" :key='e.value' :value="e.value">&nbsp;&nbsp;{{e.name}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-xs-2 control-label">身份证号：</label>
                            <div class="col-xs-4">
                                <input type="text" class="form-control" placeholder="请输入身份证号" v-model="ident">
                            </div>
                            <label class="col-xs-2 control-label">手机号：</label>
                            <div class="col-xs-4">
                                <input type="text" class="form-control" placeholder="请输入手机号" v-model="tel">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-xs-2 control-label">民族：</label>
                            <div class="col-xs-4">
                                <input type="text" class="form-control" placeholder="请输入民族" v-model="nation">
                            </div>
                            <label class="col-xs-2 control-label">婚姻状况：</label>
                            <div class="col-xs-4">
                                <select class="selectPicker" v-model="marriage" style="width:290px">
                                    <option value="" style="color: #999999;">&nbsp;&nbsp;请选择婚姻状况</option>
                                    <option v-for="e in marriList" :key='e.value' :value="e.value">&nbsp;&nbsp;{{e.name}}</option>
                                </select>
                                <!--<input type="text" class="form-control" placeholder="请选择婚姻状况" v-model="marriage">-->
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-xs-2 control-label">身高：</label>
                            <div class="col-xs-4">
                                <input type="text" class="form-control" placeholder="请输入身高" v-model="height">
                            </div>
                            <label class="col-xs-2 control-label">体重：</label>
                            <div class="col-xs-4">
                                <input type="text" class="form-control" placeholder="请输入体重" v-model="weight">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-xs-2 control-label">吸烟状况：</label>
                            <div class="col-xs-4">
                                <input type="text" class="form-control" placeholder="请输入吸烟状况" v-model="smokingStatus">
                            </div>
                            <label class="col-xs-2 control-label">疾病状况：</label>
                            <div class="col-xs-4">
                                <input type="text" class="form-control" placeholder="请输入疾病史" v-model="diseaseStatus">
                            </div>
                        </div>
                        <div class="form-group" style="text-align: center;">
                            <div class="col-sm-offset-2 col-xs-10">
                                <button class="btn btn-default btnTrue">确认提交</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <Modal v-model="isModel" width="510" :mask-closeable="false" style="height:484px;">
            <p slot="header" style="color:#ffffff;font-size:18px;">报名</p>
            <div style="text-align:center;padding-top:14px;color:#333333;font-size:20px;">
                <img src="../../../assets/img/twoCode.png"/>
                <p style="margin-top:19px;">扫描二维码关注微信公众号</p>
                <p>公众号在线报名可获得<span style="color:red">500</span>积分</p>
                <button class="btn btn-default continueOn" @click="closeM">继续报名</button>
            </div>
            <div slot="footer">
            </div>
        </Modal>
        <Footer></Footer>
    </div>
</template>

<script>
    import Header from "../components/common/header.vue";
    import Footer from "../components/common/footer.vue";
    import { Modal } from 'iview';
    import { projectFindById } from '../../../api/frontSomeInterface.js'
    import { getSelectValueDesc } from '../../../api/common.js'
    export default {
        name: "home",
        components: { Header, Footer,Modal },
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
                isModel:true,
                id:'',
                info:{},
                infoForm:{
                    name:'',
                    sex:'',

                },
                sexOption:[],
                marriageOption:[],


            };
        },
        created(){
            this.id=this.$route.query.id;
            this.getInfo(this.id);
            let sex = {
                "key": 'STATUS_GENDER'
            }
            getSelectValueDesc(sex).then(res => {
                if(res.data.code = 200){
                    this.sexOption = res.data.msg
                }
            })
            let marriage = {
                "key": 'STATUS_MARITAL'
            }
            getSelectValueDesc(marriage).then(res => {
                if(res.data.code = 200) {
                    this.marriageOption = res.data.msg
                }
            })
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
                projectFindById(data).then(res => {
                    this.info = res.data.data;
                })
            },
            toOnline(){
                //window.location.href = 'online.html'
            },
            closeM(){
                this.isModel=false;
            }

        }
    };
</script>
<style  lang="less">
    #online{
    .ivu-modal-content{
        border-radius:0px!important;
    }
    .ivu-modal-header{
        background-color:#35BACB!important;;
        color:#ffffff!important;;
        padding:12px 16px!important;;
    }
    .ivu-modal-header p, .ivu-modal-header-inner{
        height:24px!important;;
        line-height:24px!important;;
        font-family: 'SourceHanSansCN-Normal';
    }
    .ivu-modal-close .ivu-icon-ios-close{
        color: #fff!important;
    }
    .ivu-modal-footer{
        display: none!important;
    }
    }
    .continueOn{
        margin:37px 0px 48px 0px;
        border: none;
        font-size: 20px;
        width:148px;height:42px;
        background-color:#35BACB;
        color:#ffffff;
        border-radius:21px;
    }

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
    select::-ms-expand { display: none; }
    .bgColor{background-color:#F5F5F5;padding-bottom:30px;text-align:center;}
    .searchRes{margin-top:30px;background-color:#fff;padding:50px 0px 30px 0px;text-align:center;}
    .btnTrue{margin-top:70px;border-radius:28px;background-color:#35BACB;color:#ffffff;border:1px solid #35BACB;width:238px;height:56px;}
    hr{margin-top:20px;margin-bottom:18px;}
    .pagination>.active>a, .pagination>.active>a:focus, .pagination>.active>a:hover, .pagination>.active>span, .pagination>.active>span:focus, .pagination>.active>span:hover{
        background-color: #35BACB!important;
        border-color: #35BACB!important;
    }
    .form-control{
        height:40px;
    }
    .selectPicker{
        width:290px;
        height:40px;
        border: 1px #D7D7D7 solid;
        border-radius: 4px;

    }

</style>

