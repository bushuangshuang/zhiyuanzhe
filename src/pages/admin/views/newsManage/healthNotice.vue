<template>
  <div id="testcar">
      <div style="min-height:400px;">
        <Tabs :value="nameTab" :animated="false" @on-click="tabsChanged">
          <TabPane label="已发送" name="name1">
            <div>
              <Row type="flex" justify="end" class="code-row-bg">
                <Button type="primary" style="margin-bottom:20px;text-align: right;" @click="noticeAdd">新建通知</Button>
              </Row>
              <Table :data="tableData1" :columns="columns1" stripe border></Table>
              <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                  <Page :total="page1.total" :current="page1.pageNumber" :page-size="page1.pageSize" show-elevator show-sizer show-total
                        placement="top" @on-change="handlePage1" @on-page-size-change='handlePageSize1'></Page>
                </div>
              </div>
            </div>
            <Modal title="新建通知" v-model="modal1" width="800px">
              <Form ref="infoForm1" :model="infoForm1" :rules="rules1" :label-width="120" style="padding-right:26px;">
                <FormItem prop="projectId" label="项目名称">
                  <Select v-model="infoForm1.projectId" placeholder="请选择项目名称" style="width:600px">
                    <Option v-for="item in projectNameOption" :key="item.value" :label="item.label" :value="item.value">
                    </Option>
                  </Select>
                </FormItem>
                <FormItem prop="newTitle" label="标题名称">
                  <Input v-model="infoForm1.newTitle" placeholder="请输入标题名称" style="width:600px" />
                </FormItem>
                <FormItem prop="publishContent" label="通知内容">
                  <Input type="textarea" :autosize="{minRows: 5,maxRows: 5}" v-model="infoForm1.publishContent" placeholder="请输入通知内容" style="width:600px" />
                </FormItem>
                <FormItem label="发送对象">
                  <div style="border:1px solid #dcdee2;border-radius: 4px;padding:20px;width:600px;">
                      <Form :model="search1" label-position="right" :label-width="0" inline >
                        <FormItem label="">
                          <Select v-model="search1.testType" clearable placeholder="请选择志愿者类型" style="width:140px">
                            <Option v-for="item in testTypeOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
                          </Select>
                        </FormItem>
                        <FormItem label="">
                          <Select v-model="search1.projectId" placeholder="请选择项目名称" style="width:140px">
                            <Option v-for="item in projectNameOption" :key="item.value" :label="item.label" :value="item.value">
                            </Option>
                          </Select>
                        </FormItem>
                        <FormItem label="">
                          <Select v-model="search1.physicalExaStatus" clearable placeholder="请选择状态" style="width:140px">
                            <Option v-for="item in physicalExaStatusOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
                          </Select>
                        </FormItem>
                        <FormItem :label-width="0">
                          <Button type="primary" @click="handleSearchAdd">查询</Button>
                        </FormItem>
                      </Form>
                    <Table :data="tableDataAdd1" :columns="columnsAdd1" @on-selection-change='selectionClick1' stripe border style="margin-top:20px;"></Table>
                    <div style="margin: 10px;overflow: hidden">
                      <div style="float: right;">
                        <Page :total="pageAdd1.total" :current="pageAdd1.pageNumber" :page-size="pageAdd1.pageSize" show-elevator show-sizer show-total
                              placement="top" @on-change="handlePageAdd1" @on-page-size-change='handlePageSizeAdd1'></Page>
                      </div>
                    </div>
                  </div>
                </FormItem>
              </Form>
              <div slot="footer" style="text-align:center">
                <Button type="primary" class="btn-submit" @click="handleSubmitUpdate1">保存</Button>
                <Button type="primary" class="btn-submit btn-cancel" @click="cancelModal1">取消</Button>
              </div>
            </Modal>
            <Modal title="查看" v-model="modalDetail1" width="800px">
              <table border class="useShowTable">
                <tr>
                  <td style="width:20%" align="center">项目名称</td>
                  <td style="width:30%">{{detail1.projectName}}</td>
                  <td style="width:20%" align="center">标题名称</td>
                  <td style="width:30%">{{detail1.newTitle}}</td>
                </tr>
                <tr>
                  <td align="center">通知内容</td>
                  <td colspan="3">{{detail1.publishContent}}</td>
                </tr>
              </table>
              <div slot="footer" style="text-align:center">
              </div>
            </Modal>
            <Modal title="人员明细" v-model="personDetail1" width="800px">
              <Table :data="tableDataPerson1" :columns="columnsPerson1" @on-selection-change='selectionClick1' stripe border style="margin-top:20px;"></Table>
              <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                  <Page :total="pagePerson1.total" :current="pagePerson1.pageNumber" :page-size="pagePerson1.pageSize" show-elevator show-sizer show-total
                        placement="top" @on-change="handlePagePerson1" @on-page-size-change='handlePageSizePerson1'></Page>
                </div>
              </div>
              <div slot="footer" style="text-align:center">
              </div>
            </Modal>
          </TabPane>
          <TabPane label="未发送" name="name2">
            <div>
              <Row type="flex" justify="end" class="code-row-bg">
                <Button type="primary" style="margin-bottom:20px;text-align: right;" @click="noticeAdd">新建通知</Button>
              </Row>
              <Table :data="tableData1" :columns="columns1" stripe border></Table>
              <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                  <Page :total="page1.total" :current="page1.pageNumber" :page-size="page1.pageSize" show-elevator show-sizer show-total
                        placement="top" @on-change="handlePage1" @on-page-size-change='handlePageSize1'></Page>
                </div>
              </div>
            </div>
            <Modal title="新建通知" v-model="modal2" width="800px">
              <Form ref="infoForm1" :model="infoForm1" :rules="rules1" :label-width="120" style="padding-right:26px;">
                <FormItem prop="projectId" label="项目名称">
                  <Select v-model="infoForm1.projectId" placeholder="请选择项目名称" style="width:600px">
                    <Option v-for="item in projectNameOption" :key="item.value" :label="item.label" :value="item.value">
                    </Option>
                  </Select>
                </FormItem>
                <FormItem prop="newTitle" label="标题名称">
                  <Input v-model="infoForm1.newTitle" placeholder="请输入标题名称" style="width:600px" />
                </FormItem>
                <FormItem prop="publishContent" label="通知内容">
                  <Input type="textarea" :autosize="{minRows: 5,maxRows: 5}" v-model="infoForm1.publishContent" placeholder="请输入通知内容" style="width:600px" />
                </FormItem>
                <FormItem label="发送对象">
                  <div style="border:1px solid #dcdee2;border-radius: 4px;padding:20px;width:600px;">
                    <Form :model="search1" label-position="right" :label-width="0" inline >
                      <FormItem label="">
                        <Select v-model="search1.testType" clearable placeholder="请选择志愿者类型" style="width:140px">
                          <Option v-for="item in testTypeOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                      </FormItem>
                      <FormItem label="">
                        <Select v-model="search1.projectId" placeholder="请选择项目名称" style="width:140px">
                          <Option v-for="item in projectNameOption" :key="item.value" :label="item.label" :value="item.value">
                          </Option>
                        </Select>
                      </FormItem>
                      <FormItem label="">
                        <Select v-model="search1.physicalExaStatus" clearable placeholder="请选择状态" style="width:140px">
                          <Option v-for="item in physicalExaStatusOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                      </FormItem>
                      <FormItem :label-width="0">
                        <Button type="primary" @click="handleSearchAdd">查询</Button>
                      </FormItem>
                    </Form>
                    <Table :data="tableDataAdd1" :columns="columnsAdd1" @on-selection-change='selectionClick1' stripe border style="margin-top:20px;"></Table>
                    <div style="margin: 10px;overflow: hidden">
                      <div style="float: right;">
                        <Page :total="pageAdd1.total" :current="pageAdd1.pageNumber" :page-size="pageAdd1.pageSize" show-elevator show-sizer show-total
                              placement="top" @on-change="handlePageAdd1" @on-page-size-change='handlePageSizeAdd1'></Page>
                      </div>
                    </div>
                  </div>
                </FormItem>
              </Form>
              <div slot="footer" style="text-align:center">
                <Button type="primary" class="btn-submit" @click="handleSubmitUpdate1">保存</Button>
                <Button type="primary" class="btn-submit btn-cancel" @click="cancelModal1">取消</Button>
              </div>
            </Modal>
          </TabPane>
          <TabPane label="已回复" name="name3">
            <div>
              <Row type="flex" justify="end" class="code-row-bg">
                <Button type="primary" style="margin-bottom:20px;text-align: right;" @click="noticeAdd">新建通知</Button>
              </Row>
              <Table :data="tableData1" :columns="columns1" stripe border></Table>
              <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                  <Page :total="page1.total" :current="page1.pageNumber" :page-size="page1.pageSize" show-elevator show-sizer show-total
                        placement="top" @on-change="handlePage1" @on-page-size-change='handlePageSize1'></Page>
                </div>
              </div>
            </div>
            <Modal title="新建通知" v-model="modal3" width="800px">
              <Form ref="infoForm1" :model="infoForm1" :rules="rules1" :label-width="120" style="padding-right:26px;">
                <FormItem prop="projectId" label="项目名称">
                  <Select v-model="infoForm1.projectId" placeholder="请选择项目名称" style="width:600px">
                    <Option v-for="item in projectNameOption" :key="item.value" :label="item.label" :value="item.value">
                    </Option>
                  </Select>
                </FormItem>
                <FormItem prop="newTitle" label="标题名称">
                  <Input v-model="infoForm1.newTitle" placeholder="请输入标题名称" style="width:600px" />
                </FormItem>
                <FormItem prop="publishContent" label="通知内容">
                  <Input type="textarea" :autosize="{minRows: 5,maxRows: 5}" v-model="infoForm1.publishContent" placeholder="请输入通知内容" style="width:600px" />
                </FormItem>
                <FormItem label="发送对象">
                  <div style="border:1px solid #dcdee2;border-radius: 4px;padding:20px;width:600px;">
                    <Form :model="search1" label-position="right" :label-width="0" inline >
                      <FormItem label="">
                        <Select v-model="search1.testType" clearable placeholder="请选择志愿者类型" style="width:140px">
                          <Option v-for="item in testTypeOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                      </FormItem>
                      <FormItem label="">
                        <Select v-model="search1.projectId" placeholder="请选择项目名称" style="width:140px">
                          <Option v-for="item in projectNameOption" :key="item.value" :label="item.label" :value="item.value">
                          </Option>
                        </Select>
                      </FormItem>
                      <FormItem label="">
                        <Select v-model="search1.physicalExaStatus" clearable placeholder="请选择状态" style="width:140px">
                          <Option v-for="item in physicalExaStatusOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                      </FormItem>
                      <FormItem :label-width="0">
                        <Button type="primary" @click="handleSearchAdd">查询</Button>
                      </FormItem>
                    </Form>
                    <Table :data="tableDataAdd1" :columns="columnsAdd1" @on-selection-change='selectionClick1' stripe border style="margin-top:20px;"></Table>
                    <div style="margin: 10px;overflow: hidden">
                      <div style="float: right;">
                        <Page :total="pageAdd1.total" :current="pageAdd1.pageNumber" :page-size="pageAdd1.pageSize" show-elevator show-sizer show-total
                              placement="top" @on-change="handlePageAdd1" @on-page-size-change='handlePageSizeAdd1'></Page>
                      </div>
                    </div>
                  </div>
                </FormItem>
              </Form>
              <div slot="footer" style="text-align:center">
                <Button type="primary" class="btn-submit" @click="handleSubmitUpdate1">保存</Button>
                <Button type="primary" class="btn-submit btn-cancel" @click="cancelModal1">取消</Button>
              </div>
            </Modal>
          </TabPane>
          <TabPane label="未回复" name="name4">
            <div>
              <Row type="flex" justify="end" class="code-row-bg">
                <Button type="primary" style="margin-bottom:20px;text-align: right;" @click="noticeAdd">新建通知</Button>
              </Row>
              <Table :data="tableData1" :columns="columns1" stripe border></Table>
              <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                  <Page :total="page1.total" :current="page1.pageNumber" :page-size="page1.pageSize" show-elevator show-sizer show-total
                        placement="top" @on-change="handlePage1" @on-page-size-change='handlePageSize1'></Page>
                </div>
              </div>
            </div>
            <Modal title="新建通知" v-model="modal4" width="800px">
              <Form ref="infoForm1" :model="infoForm1" :rules="rules1" :label-width="120" style="padding-right:26px;">
                <FormItem prop="projectId" label="项目名称">
                  <Select v-model="infoForm1.projectId" placeholder="请选择项目名称" style="width:600px">
                    <Option v-for="item in projectNameOption" :key="item.value" :label="item.label" :value="item.value">
                    </Option>
                  </Select>
                </FormItem>
                <FormItem prop="newTitle" label="标题名称">
                  <Input v-model="infoForm1.newTitle" placeholder="请输入标题名称" style="width:600px" />
                </FormItem>
                <FormItem prop="publishContent" label="通知内容">
                  <Input type="textarea" :autosize="{minRows: 5,maxRows: 5}" v-model="infoForm1.publishContent" placeholder="请输入通知内容" style="width:600px" />
                </FormItem>
                <FormItem label="发送对象">
                  <div style="border:1px solid #dcdee2;border-radius: 4px;padding:20px;width:600px;">
                    <Form :model="search1" label-position="right" :label-width="0" inline >
                      <FormItem label="">
                        <Select v-model="search1.testType" clearable placeholder="请选择志愿者类型" style="width:140px">
                          <Option v-for="item in testTypeOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                      </FormItem>
                      <FormItem label="">
                        <Select v-model="search1.projectId" placeholder="请选择项目名称" style="width:140px">
                          <Option v-for="item in projectNameOption" :key="item.value" :label="item.label" :value="item.value">
                          </Option>
                        </Select>
                      </FormItem>
                      <FormItem label="">
                        <Select v-model="search1.physicalExaStatus" clearable placeholder="请选择状态" style="width:140px">
                          <Option v-for="item in physicalExaStatusOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                      </FormItem>
                      <FormItem :label-width="0">
                        <Button type="primary" @click="handleSearchAdd">查询</Button>
                      </FormItem>
                    </Form>
                    <Table :data="tableDataAdd1" :columns="columnsAdd1" @on-selection-change='selectionClick1' stripe border style="margin-top:20px;"></Table>
                    <div style="margin: 10px;overflow: hidden">
                      <div style="float: right;">
                        <Page :total="pageAdd1.total" :current="pageAdd1.pageNumber" :page-size="pageAdd1.pageSize" show-elevator show-sizer show-total
                              placement="top" @on-change="handlePageAdd1" @on-page-size-change='handlePageSizeAdd1'></Page>
                      </div>
                    </div>
                  </div>
                </FormItem>
              </Form>
              <div slot="footer" style="text-align:center">
                <Button type="primary" class="btn-submit" @click="handleSubmitUpdate1">保存</Button>
                <Button type="primary" class="btn-submit btn-cancel" @click="cancelModal1">取消</Button>
              </div>
            </Modal>
          </TabPane>
        </Tabs>
      </div>
  </div>
</template>

<script>
  import { newsList,findProjectSelect,volunteerList,newsAdd } from '../../../../api/news.js'
import { getSelectValueDesc } from '../../../../api/common.js'
    export default {
        name: 'testcar-mgr',
        orderState(v) {
            return 1
        },
        data () {
            return {
                nameTab:'name1',
                modal1:false,
                modal2:false,
                modal3:false,
                modal4:false,
                modalDetail1:false,
                personDetail1:false,
                sexOption:[],
                columns1:[
                    {
                        title: '序号',
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '项目名称',
                        align:'center',
                        key: 'projectName',
                    },
                    {
                        title: '标题名称',
                        key: 'newTitle',
                        align: 'center',
                    },
                    {
                        title: '通知内容',
                        align:'center',
                        key: 'publishContent',
                    },
                    {
                        title: '发送时间',
                        align:'center',
                        key: 'sendDate',
                        render: function (h, params) {
                            return h('div',
                                new Date(this.row.sendDate.replace(/-/g, '\/')).Format('yyyy-MM-dd'));
                        }
                    },
                    {
                        title: '状态',
                        align:'center',
                        key: 'status',
                        render: (h, params) => {
                            return h('div',params.row.status==0?'草稿':params.row.status==1?'已发送':params.row.status)
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 160,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small',
                                    },
                                    style:{
                                        color:'#2d8cf0'
                                    },
                                    on: {
                                        click: () => {
                                            this.show1(params.row)
                                        }
                                    },

                                }, '查看'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small',
                                    },
                                    style:{
                                        color:'#2d8cf0'
                                    },
                                    on: {
                                        click: () => {
                                            this.personDetail(params.row)
                                        }
                                    }
                                }, '人员明细')
                            ]);
                        }
                    }
                ],
                tableData1:[],
                page1:{
                    pageNumber: 1,
                    pageSize: 10,
                    total: 0
                },
                page2:{
                    pageNumber: 1,
                    pageSize: 10,
                    total: 0
                },
                page3:{
                    pageNumber: 1,
                    pageSize: 10,
                    total: 0
                },
                page4:{
                    pageNumber: 1,
                    pageSize: 10,
                    total: 0
                },
                projectNameOption:[],
                testTypeOption:[],
                physicalExaStatusOption:[//1未体检、2体检合格、3体检不合格、4入组、5出组、6脱落
                    {
                    "value": "1",
                    "label": "未体检"
                    },
                    {
                        "value": "2",
                        "label": "体检合格"
                    },
                    {
                        "value": "3",
                        "label": "体检不合格"
                    },
                    {
                        "value": "4",
                        "label": "入组"
                    },
                    {
                        "value": "5",
                        "label": "出组"
                    },
                    {
                        "value": "6",
                        "label": "脱落"
                    },],
                search1:{
                    testType:'',
                    projectId:'',
                    physicalExaStatus:''
                },
                columnsAdd1:[
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '序号',
                        type: 'index',
                        width: 70,
                        align: 'center'
                    },
                    {
                        title: '姓名',
                        align:'center',
                        key: 'empName',
                    },
                    {
                        title: '性别',
                        key: 'sex',
                        align: 'center',
                        render: (h, params) => {
                            return h('div',
                                this.getSex(params.row.sex)
                            )
                        }
                    },
                    {
                        title: '电话',
                        align:'center',
                        key: 'phone',
                    },
                    {
                        title: '身高',
                        align:'center',
                        key: 'height',
                    },
                ],
                tableDataAdd1:[],
                pageAdd1:{
                    pageNumber: 1,
                    pageSize: 5,
                    total: 0
                },
                selectIds:[],
                infoForm1: {
                    projectId:'',
                    newTitle:'',
                    publishContent:''
                },
                rules1: {
                    projectId:[{required: true,message: '此项必填',trigger: "blur"}],
                    newTitle:[{required: true,message: '此项必填',trigger: "blur"}],
                    publishContent:[{required: true,message: '此项必填',trigger: "blur"}],
                },
                detail1:{},
                columnsPerson1:[
                    {
                        title: '序号',
                        type: 'index',
                        width: 70,
                        align: 'center'
                    },
                    {
                        title: '姓名',
                        align:'center',
                        key: 'empName',
                    },
                    {
                        title: '发送内容',
                        key: 'publishContent',
                        align: 'left',
                    },
                    {
                        title: '发送时间',
                        align:'center',
                        key: 'sendDate',
                        render: function (h, params) {
                            return h('div',
                                new Date(this.row.sendDate.replace(/-/g, '\/')).Format('yyyy-MM-dd'));
                        }
                    },
                ],
                tableDataPerson1:[],
                pagePerson1:{
                    pageNumber: 1,
                    pageSize: 5,
                    total: 0
                },


            }
        },
        computed: {
        },
        created(){
            this.initFormatter();
            findProjectSelect().then(res => {
                this.projectNameOption=[];
                if(res.data.code = 200){
                    this.projectNameOption = res.data.data
                }
            });
            let testType = {
                "key": 'SUBJECT_TYPE'
            }
            getSelectValueDesc(testType).then(res => {
                if(res.data.code = 200){
                    this.testTypeOption = res.data.msg
                }
            })
            let sex = {
                "key": 'STATUS_GENDER'
            }
            getSelectValueDesc(sex).then(res => {
                if(res.data.code = 200){
                    this.sexOption = res.data.msg
                }
            })
            this.getList1();
            this.getList2();
            this.getList3();
            this.getList4();
        },
        methods: {
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
            noticeAdd(){
                this.modal1=true;
                this.getList1Add();

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
            tabsChanged(name){
                if(name==='name1'){
                    this.getList1();
                }else if(name==='name2'){
                    this.getList2()
                }else if(name==='name3'){
                    this.getList3();
                }else if(name==='name4'){
                    this.getList4();
                }
            },
            handleSearch(status){
                if(status==='name1'){
                    this.getList1();
                }else if(status==='name2'){
                    this.getList2();
                }else if(status==='name3'){
                    this.getList3();
                }else if(status==='name4'){
                    this.getList4();
                }
            },
            handleSearchAdd(){
                this.getList1Add();
            },
            getSex(value) {
                var label = ''
                for(var child of this.sexOption) {
                    if(child.value === value) {
                        label = child.label;
                        break;
                    }
                }
                return label;
            },
            getList1Add(){
                let params = {
                    isDisease:this.search1.testType,
                    projectId:this.search1.projectId,
                    physicalExaStatus:this.search1.physicalExaStatus,
                    pageNumber: this.page1.pageNumber,
                    pageSize: this.page1.pageSize,
                    status:1
                };
                //console.log('params=='+JSON.stringify(params));
                volunteerList(params)
                    .then(res => {
                        this.tableDataAdd1 = res.data.page.list;
                        this.pageAdd1.pageNumber = res.data.page.pageNumber;
                        this.pageAdd1.pageSize = res.data.page.pageSize;
                        this.pageAdd1.total = res.data.page.totalRow;
                    })
            },
            handlePageAdd1(val){
                this.pageAdd1.pageNumber = val;
                this.getList1Add();
            },
            handlePageSizeAdd1(val){
                this.pageAdd1.pageSize = val;
                this.getList1Add();
            },
            handlePagePerson1(val){
                this.pagePerson1.pageNumber = val;
                this.getList1Add();
            },
            handlePageSizePerson1(val){
                this.pagePerson1.pageSize = val;
                this.getList1Add();
            },
            selectionClick1(arr){
                this.selectIds=[];
                for (var i=0;i<arr.length;i++){
                    this.selectIds.push(parseInt(arr[i].userId));
                }
                console.log('选中数组数据是：'+JSON.stringify(this.selectIds));
            },
            getList1(){
                let params = {
                    pageNumber: this.page1.pageNumber,
                    pageSize: this.page1.pageSize,
                    //status:1
                };
                //console.log('params=='+JSON.stringify(params));
                newsList(params)
                    .then(res => {
                        this.tableData1 = res.data.page.list;
                        /*for(let i=0;i<this.tableData1.length;i++) {
                            let arri = this.tableData1[i];
                            for (let j = 0; j < this.testTypeOption.length; j++) {
                                let arrV = this.testTypeOption[j];
                                if (arri.testType === arrV.value) {
                                    this.tableData1[i]['testTypeStr'] = arrV.label;
                                }
                            }
                            for(let k=0;k<this.projectStatus.length;k++){
                                let arrV1=this.projectStatus[k];
                                if(arri.approveStatus===arrV1.value){
                                    this.tableData1[i]['approveStatusStr']=arrV1.label;
                                }
                            }
                        }*/
                        this.page1.pageNumber = res.data.page.pageNumber;
                        this.page1.pageSize = res.data.page.pageSize;
                        this.page1.total = res.data.page.totalRow;
                    })
            },
            getList2(){
                let params = {
                    pageNumber: this.page2.pageNumber,
                    pageSize: this.page2.pageSize,
                    approveStatus:2
                };
                newsList(params)
                    .then(res => {
                        this.tableData2 = res.data.page.list;
                        for(let i=0;i<this.tableData2.length;i++) {
                            let arri = this.tableData2[i];
                            for (let j = 0; j < this.testTypeOption.length; j++) {
                                let arrV = this.testTypeOption[j];
                                if (arri.testType === arrV.value) {
                                    this.tableData2[i]['testTypeStr'] = arrV.label;
                                }
                            }
                            for(let k=0;k<this.projectStatus.length;k++){
                                let arrV1=this.projectStatus[k];
                                if(arri.approveStatus===arrV1.value){
                                    this.tableData2[i]['approveStatusStr']=arrV1.label;
                                }
                            }
                        }
                        this.page2.pageNumber = res.data.page.pageNumber;
                        this.page2.pageSize = res.data.page.pageSize;
                        this.page2.total = res.data.page.totalRow;
                    })
            },
            getList3(){
                let params = {
                    pageNumber: this.page3.pageNumber,
                    pageSize: this.page3.pageSize,
                    publishStatus:2
                };
                console.log('this.params=='+JSON.stringify(params));
                newsList(params)
                    .then(res => {
                        this.tableData3 = res.data.page.list;
                        console.log('this.tableData3=='+JSON.stringify(this.tableData4));
                        for(let i=0;i<this.tableData3.length;i++) {
                            let arri = this.tableData3[i];
                            for (let j = 0; j < this.testTypeOption.length; j++) {
                                let arrV = this.testTypeOption[j];
                                if (arri.testType === arrV.value) {
                                    this.tableData3[i]['testTypeStr'] = arrV.label;
                                }
                            }
                            for(let k=0;k<this.publishStatus.length;k++){
                                let arrV1=this.publishStatus[k];
                                if(arri.publishStatus===arrV1.value){
                                    this.tableData3[i]['publishStatusStr']=arrV1.label;
                                }
                            }
                        }
                        this.page3.pageNumber = res.data.page.pageNumber;
                        this.page3.pageSize = res.data.page.pageSize;
                        this.page3.total = res.data.page.totalRow;
                    })
            },
            getList4(){
                let params = {
                    pageNumber: this.page4.pageNumber,
                    pageSize: this.page4.pageSize,
                    publishStatus:1
                };
                newsList(params)
                    .then(res => {
                        this.tableData4 = res.data.page.list;
                        console.log('this.tableData4=='+JSON.stringify(this.tableData4));
                        for(let i=0;i<this.tableData4.length;i++) {
                            let arri = this.tableData4[i];
                            for (let j = 0; j < this.testTypeOption.length; j++) {
                                let arrV = this.testTypeOption[j];
                                if (arri.testType === arrV.value) {
                                    this.tableData4[i]['testTypeStr'] = arrV.label;
                                }
                            }
                            for(let k=0;k<this.publishStatus.length;k++){
                                let arrV1=this.publishStatus[k];
                                if(arri.publishStatus===arrV1.value){
                                    this.tableData4[i]['publishStatusStr']=arrV1.label;
                                }
                            }
                        }
                        this.page4.pageNumber = res.data.page.pageNumber;
                        this.page4.pageSize = res.data.page.pageSize;
                        this.page4.total = res.data.page.totalRow;
                    })
            },
            handlePage1(val){
                this.page1.pageNumber = val;
                this.getList1();
            },
            handlePageSize1(val){
                this.page1.pageSize = val;
                this.getList1();
            },
            handlePage2(val){
                this.page2.pageNumber = val;
                this.getList2();
            },
            handlePageSize2(val){
                this.page2.pageSize = val;
                this.getList2();
            },
            handlePage3(val){
                this.page3.pageNumber = val;
                this.getList3();
            },
            handlePageSize3(val){
                this.page3.pageSize = val;
                this.getList3();
            },
            handlePage4(val){
                this.page4.pageNumber = val;
                this.getList4();
            },
            handlePageSize4(val){
                this.page4.pageSize = val;
                this.getList4();
            },
            show1(row){
                this.detail1=row;
                this.modalDetail1=true;
            },
            personDetail(row){
                this.personDetail1=true;

            },
            handleSubmitUpdate1(){
                this.$refs.infoForm1.validate(valid => {
                    if(valid) {
                        if(this.selectIds.length==0){
                            this.$Message.info('请选择发送人');
                            return;
                        }
                        let data={
                            "projectId":parseInt(this.infoForm1.projectId),
                            "newTitle":this.infoForm1.newTitle,
                            "publishContent":this.infoForm1.publishContent,
                            "userIds":this.selectIds,
                            "noteType":1
                        };//（1体检，2入院，3打款）
                        //console.log('data---'+JSON.stringify(data));
                        newsAdd(data).then(res => {
                            if(res.data.code==200){
                                this.$Message.success('编辑项目成功！');
                                this.$refs["infoForm1"].resetFields();
                                this.modal1 = false;
                                this.getList1();
                            }

                        });
                    }
                });
            },
            cancelModal1(){
                this.modal1=false;
                this.infoForm1={}
            },
            check1(row){
                this.checkModal1=true;
                this.checkId1=row.id;
            },
            handleSubmitCheck(){
                this.$refs.infoForm1.validate(valid => {
                    if(valid) {
                      if(this.checkForm1.opinion=='1'){//同意
                          let data={
                              "id":parseInt(this.checkId1)
                          }
                        agreeHospitalProject(data).then(res => {
                            if(res.data.code==200){
                                this.$Message.success('项目已审核！');
                                this.$refs["checkForm1"].resetFields();
                                this.checkModal1 = false;
                                this.getList1();
                            }
                        });

                      }else if(this.checkForm1.opinion=='2'){//不同意
                          let data={
                              "id":parseInt(this.checkId1),
                              "auditFailedReason":this.checkForm1.noteReason
                          }
                          disagreeHospitalProject(data).then(res => {
                              if(res.data.code==200){
                                  this.$Message.success('项目已审核！');
                                  this.$refs["checkForm1"].resetFields();
                                  this.checkModal1 = false;
                                  this.getList1();
                              }
                          });
                      }
                    }
                });
              console.log('check=='+JSON.stringify(this.checkForm1));
            },
            show2(row){
              this.infoForm2={};
              this.isShowModal2=true;
              this.infoForm2=row;
                for(let i=0;i<this.projectStageOption.length;i++){
                    if(row.projectStage===this.projectStageOption[i].value){
                        this.infoForm2.projectStage=this.projectStageOption[i].label;
                        break;
                    }
                }
                for(let j=0;j<this.marriageOption.length;j++){
                    if(row.maritalStatus===this.marriageOption[j].value){
                        this.infoForm2.maritalStatus=this.marriageOption[j].label;
                        break;
                    }
                }
                for(let j=0;j<this.sexOption.length;j++){
                    if(row.requireSex===this.sexOption[j].value){
                        this.infoForm2.requireSex=this.sexOption[j].label;
                        break;
                    }
                }
                this.infoForm2.startTime=row.startTime.substring(0, 10);
                this.infoForm2.endTime=row.endTime.substring(0, 10);
                this.infoForm2.applyEndTime=row.applyEndTime.substring(0, 10);
              this.selectCity(row.province);
              this.selectCounty(row.city);
            },
            cancelModal2(){
                this.isShowModal2=false;
            },
            show3(row){
                this.infoForm3={};
                this.isShowModal3=true;
                this.infoForm3=row;
                for(let i=0;i<this.projectStageOption.length;i++){
                    if(row.projectStage===this.projectStageOption[i].value){
                        this.infoForm3.projectStage=this.projectStageOption[i].label;
                        break;
                    }
                }
                for(let j=0;j<this.marriageOption.length;j++){
                    if(row.maritalStatus===this.marriageOption[j].value){
                        this.infoForm3.maritalStatus=this.marriageOption[j].label;
                        break;
                    }
                }
                for(let j=0;j<this.sexOption.length;j++){
                    if(row.requireSex===this.sexOption[j].value){
                        this.infoForm3.requireSex=this.sexOption[j].label;
                        break;
                    }
                }
                this.infoForm3.startTime=row.startTime.substring(0, 10);
                this.infoForm3.endTime=row.endTime.substring(0, 10);
                this.infoForm3.applyEndTime=row.applyEndTime.substring(0, 10);
                this.selectCity(row.province);
                this.selectCounty(row.city);
            },
            publish3(row){
                this.$Modal.warning({
                    title: '发布项目',
                    content: '确定发布项目吗？',
                    width:'400px',
                    closable:true,
                    onOk: () => {
                        let data={
                            "id":parseInt(row.id),
                        };
                        publishHospitalProject(data).then(res => {
                            if (res.data.code=='200'){
                                this.$Message.info('发布项目成功');
                                this.getList3();
                            }
                        })
                    }
                })
            },
            show4(row){
                this.infoForm4={};
                this.isShowModal4=true;
                this.infoForm4=row;
                for(let i=0;i<this.projectStageOption.length;i++){
                    if(row.projectStage===this.projectStageOption[i].value){
                        this.infoForm4.projectStage=this.projectStageOption[i].label;
                        break;
                    }
                }
                for(let j=0;j<this.marriageOption.length;j++){
                    if(row.maritalStatus===this.marriageOption[j].value){
                        this.infoForm4.maritalStatus=this.marriageOption[j].label;
                        break;
                    }
                }
                for(let j=0;j<this.sexOption.length;j++){
                    if(row.requireSex===this.sexOption[j].value){
                        this.infoForm4.requireSex=this.sexOption[j].label;
                        break;
                    }
                }
                this.infoForm4.startTime=row.startTime.substring(0, 10);
                this.infoForm4.endTime=row.endTime.substring(0, 10);
                this.infoForm4.applyEndTime=row.applyEndTime.substring(0, 10);
                this.selectCity(row.province);
                this.selectCounty(row.city);
            },

        }

    }
</script>

<style>
  .useShowTable{
    width:100%;
    border-collapse:collapse;
    border:none;
    word-wrap:break-word;
    word-break:break-all;
  }
  .useShowTable tr td{
    border: 1px #e8eaec solid;
    padding:8px;
  }

</style>
