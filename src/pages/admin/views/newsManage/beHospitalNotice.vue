<template>
  <div id="testcar">
      <div style="min-height:400px;">
        <!--<div style="">
          <Form :model="search" label-position="right" :label-width="0" inline >
            <FormItem label="">
              <Select v-model="search.testType" clearable placeholder="请选择志愿者类型" style="width: 200px">
                <Option v-for="item in testTypeOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
            <FormItem label="">
              <Input v-model="search.projectName" style="width:200px" placeholder="请输入项目名称" />
            </FormItem>
            <FormItem label="">
              <Input v-model="search.projectName" style="width:200px" placeholder="请输入区域" />
            </FormItem>
            <FormItem label="">
              <Input v-model="search.projectName" style="width:200px" placeholder="请输入补偿金额" />
            </FormItem>
            <FormItem :label-width="50">
              <Button type="primary" @click="handleSearch('applySearch')">查询</Button>
            </FormItem>
          </Form>
        </div>-->
        <Tabs :value="nameTab" :animated="false" @on-click="tabsChanged">
          <TabPane label="待审核"  name="name1">
            <Form :model="search1" label-position="right" :label-width="0" inline >
              <FormItem label="">
                <Select v-model="search1.testType" clearable placeholder="请选择志愿者类型" style="width: 200px">
                  <Option v-for="item in testTypeOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
              <FormItem label="">
                <Input v-model="search1.projectName" style="width:200px" placeholder="请输入项目名称" />
              </FormItem>
              <FormItem label="">
                <Select v-model="search1.province" placeholder="请选择省" style="width:100px" @on-change="selectCity">
                  <Option v-for="item in provinceOption" :key="item.value" :label="item.label" :value="item.value">
                  </Option>
                </Select>
                <Select v-model="search1.city" placeholder="请选择市" style="width:100px" @on-change="selectCounty">
                  <Option v-for="item in cityOption" :key="item.value" :label="item.label" :value="item.value">
                  </Option>
                </Select>
                <Select v-model="search1.county" placeholder="请选择区县" style="width:100px">
                  <Option v-for="item in countyOption" :key="item.value" :label="item.label" :value="item.value">
                  </Option>
                </Select>
              </FormItem>
              <FormItem label="" :label-width="0">
                <div @click="resetA1">清除区域</div>
              </FormItem>
              <FormItem label="">
                <Input v-model="search1.money" style="width:200px" placeholder="请输入补偿金额" />
              </FormItem>
              <FormItem :label-width="50">
                <Button type="primary" @click="handleSearch('name1')">查询</Button>
              </FormItem>
            </Form>
            <div>
              <Row type="flex" justify="start" class="code-row-bg">
                <Button type="primary" style="margin-bottom:20px;text-align: right;">导出表格</Button>
              </Row>
              <Table :data="tableData1" :columns="columns1" stripe border></Table>
              <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                  <Page :total="page1.total" :current="page1.pageNumber" :page-size="page1.pageSize" show-elevator show-sizer show-total
                        placement="top" @on-change="handlePage1" @on-page-size-change='handlePageSize1'></Page>
                </div>
              </div>
            </div>
            <Modal :title="isShow1?'查看':'修改'" v-model="isShowModal1" width="800px">
              <Form v-if="isShow1==false?true:false" ref="infoForm1" :model="infoForm1" :rules="rules" :label-width="120" inline style="padding-right:26px;">
                <FormItem prop="projectName" label="项目名称">
                  <Input v-model="infoForm1.projectName" placeholder="请输入项目名称" style="width:240px" />
                </FormItem>
                <FormItem prop="requireMajor" label="适应专业" style="float:right">
                  <Input v-model="infoForm1.requireMajor" placeholder="请输入适应专业" style="width:240px;" />
                </FormItem>
                <FormItem prop="applicationMedicine" label="药物适应症">
                  <Input v-model="infoForm1.applicationMedicine" placeholder="请输入药物适应症" style="width:240px" />
                </FormItem>
                <FormItem prop="medicineName" label="药物名称" style="float:right">
                  <Input v-model="infoForm1.medicineName" placeholder="请输入药物名称" style="width:240px;" />
                </FormItem>
                <FormItem prop="recruitNumber" label="招募人数">
                  <Input v-model="infoForm1.recruitNumber" placeholder="请输入招募人数" style="width:240px" />
                </FormItem>
                <FormItem prop="testType" label="受试者类型" style="float:right">
                  <Select v-model="infoForm1.testType" placeholder="请选择受试者类型" style="width:240px">
                    <Option v-for="item in testTypeOption" :key="item.value" :label="item.label" :value="item.value">
                    </Option>
                  </Select>
                </FormItem>
                <FormItem prop="projectStage" label="项目分期">
                  <Select v-model="infoForm1.projectStage" placeholder="请选择项目分期" style="width:240px">
                    <Option v-for="item in projectStageOption" :key="item.value" :label="item.label" :value="item.value">
                    </Option>
                  </Select>
                </FormItem>
                <FormItem label="试验起止日期" style="float:right">
                  <Row>
                    <Col span="11">
                    <DatePicker type="date" placeholder="试验起始日期" v-model="infoForm1.startTime" style="width:110px;"></DatePicker>
                    </Col>
                    <Col span="2" style="text-align:center;padding-left:5px;padding-right:5px;">至</Col>
                    <Col span="11">
                    <DatePicker type="date" placeholder="试验终止日期" v-model="infoForm1.endTime" style="width:110px;"></DatePicker>
                    </Col>
                  </Row>
                </FormItem>
                <FormItem label="报名截止日期" >
                  <DatePicker v-model="infoForm1.applyEndTime" type="date" placeholder="报名截止日期" style="width: 240px"></DatePicker>
                </FormItem>
                <FormItem prop="maritalStatus" label="婚姻状况" style="float:right">
                  <Select v-model="infoForm1.maritalStatus" placeholder="请选择婚姻状况" style="width:240px">
                    <Option v-for="item in marriageOption" :key="item.value" :label="item.label" :value="item.value">
                    </Option>
                  </Select>
                </FormItem>
                <FormItem prop="requireSex" label="性别要求" >
                  <Select v-model="infoForm1.requireSex" placeholder="请选择性别要求" style="width:240px">
                    <Option v-for="item in sexOption" :key="item.value" :label="item.label" :value="item.value">
                    </Option>
                  </Select>
                </FormItem>
                <FormItem prop="requireAge" label="年龄要求" style="float:right">
                  <Input v-model="infoForm1.requireAge" placeholder="请输入年龄要求" style="width:240px" />
                </FormItem>
                <FormItem prop="compensationMoney" label="补偿金">
                  <Input v-model="infoForm1.compensationMoney" placeholder="请输入补偿金" style="width:240px" />
                </FormItem>
                <FormItem prop="linkMan" label="联系人"  style="float:right">
                  <Input v-model="infoForm1.linkMan" placeholder="请输入联系人" style="width:240px" />
                </FormItem>
                <FormItem prop="phone" label="联系电话">
                  <Input v-model="infoForm1.phone" placeholder="请输入联系电话" style="width:240px" />
                </FormItem>
                <FormItem prop="actuator" label="执行机构" style="float:right">
                  <Input v-model="infoForm1.actuator" placeholder="请输入执行机构" style="width:240px" />
                </FormItem>
                <FormItem label="附件上传" prop="fileName" >
                  <Upload action="//jsonplaceholder.typicode.com/posts/"
                          :before-upload="handleUpload1"
                          :show-upload-list="false" >
                    <Button icon="ios-cloud-upload-outline">选择附件</Button>
                  </Upload>
                  <div  @click="toShowAttachment(infoForm1.url)">{{infoForm1.fileName}}</div>
                </FormItem>
                <FormItem label="区域">
                  <Select v-model="infoForm1.province" placeholder="请选择省" style="width:180px" @on-change="selectCity">
                    <Option v-for="item in provinceOption" :key="item.value" :label="item.label" :value="item.value">
                    </Option>
                  </Select>
                  <Select v-model="infoForm1.city" placeholder="请选择市" style="width:180px" @on-change="selectCounty">
                    <Option v-for="item in cityOption" :key="item.value" :label="item.label" :value="item.value">
                    </Option>
                  </Select>
                  <Select v-model="infoForm1.county" placeholder="请选择区县" style="width:180px">
                    <Option v-for="item in countyOption" :key="item.value" :label="item.label" :value="item.value">
                    </Option>
                  </Select>
                </FormItem>
                <FormItem label="" :label-width="0" style="float:right;">
                  <div @click="resetB1">清除区域</div>
                </FormItem>
                <FormItem label="入选标准：" prop="standard">
                  <Input v-model="infoForm1.standard" type="textarea" :autosize="{minRows: 3,maxRows: 5}" placeholder="请输入入选标准" style="width:610px;"></Input>
                </FormItem>
                <FormItem label="排除标准：" prop="excludeStandard">
                  <Input v-model="infoForm1.excludeStandard" type="textarea" :autosize="{minRows: 3,maxRows: 5}" placeholder="请输入排除标准" style="width:610px;"></Input>
                </FormItem>
                <FormItem label="项目描述：" prop="projectDescribe">
                  <Input v-model="infoForm1.projectDescribe" type="textarea" :autosize="{minRows: 3,maxRows: 5}" placeholder="请输入项目描述" style="width:610px;"></Input>
                </FormItem>
              </Form>
              <table v-if="isShow1" border class="useShowTable">
                <tr>
                  <td style="width:20%" align="center">项目名称</td>
                  <td style="width:30%">{{infoForm1.projectName}}</td>
                  <td style="width:20%" align="center">适应专业</td>
                  <td style="width:30%">{{infoForm1.requireMajor}}</td>
                </tr>
                <tr>
                  <td align="center">药物适应症</td>
                  <td>{{infoForm1.applicationMedicine}}</td>
                  <td align="center">药物名称</td>
                  <td>{{infoForm1.medicineName}}</td>
                </tr>
                <tr>
                  <td align="center">招募人数</td>
                  <td>{{infoForm1.recruitNumber}}</td>
                  <td align="center">受试者类型</td>
                  <td>{{infoForm1.testTypeStr}}</td>
                </tr>
                <tr>
                  <td align="center">项目分期</td>
                  <td>{{infoForm1.projectStage}}</td>
                  <td align="center">试验起止日期</td>
                  <td>{{infoForm1.startTime}}&nbsp;&nbsp;至&nbsp;&nbsp;{{infoForm1.endTime}}</td>
                </tr>
                <tr>
                  <td align="center">报名截止日期</td>
                  <td>{{infoForm1.applyEndTime}}</td>
                  <td align="center">婚姻状况</td>
                  <td>{{infoForm1.maritalStatus}}</td>
                </tr>
                <tr>
                  <td align="center">性别要求</td>
                  <td>{{infoForm1.requireSex}}</td>
                  <td align="center">年龄要求</td>
                  <td>{{infoForm1.requireAge}}</td>
                </tr>
                <tr>
                  <td align="center">补偿金</td>
                  <td>{{infoForm1.compensationMoney}}</td>
                  <td align="center">联系人</td>
                  <td>{{infoForm1.linkMan}}</td>
                </tr>
                <tr>
                  <td align="center">联系电话</td>
                  <td>{{infoForm1.phone}}</td>
                  <td align="center">执行机构</td>
                  <td>{{infoForm1.actuator}}</td>
                </tr>
                <tr>
                  <td align="center">附件</td>
                  <td> <div @click="toShowAttachment(infoForm1.url)">{{infoForm1.fileName}}</div></td>
                  <td align="center">区域</td>
                  <td>{{infoForm1.areaAddress}}</td>
                </tr>
                <tr>
                  <td align="center">入选标准</td>
                  <td colspan="3">{{infoForm1.standard}}</td>
                </tr>
                <tr>
                  <td align="center">排除标准</td>
                  <td colspan="3">{{infoForm1.excludeStandard}}</td>
                </tr>
                <tr>
                  <td align="center">项目描述</td>
                  <td colspan="3">{{infoForm1.projectDescribe}}</td>
                </tr>
              </table>
              <div slot="footer" style="text-align:center">
                <Button v-if="isShow1==false?true:false" type="primary" class="btn-submit" @click="handleSubmitUpdate1">保存</Button>
                <Button v-if="isShow1==false?true:false" type="primary" class="btn-submit btn-cancel" @click="cancelModal1">取消</Button>
              </div>
            </Modal>
            <Modal v-model="checkModal1" title="审核" width="800px" >
              <Form ref="checkForm1" :model="checkForm1" :rules="checkRules1" :label-width="200" style="padding-right:26px;margin-top:40px;">
                <FormItem label="审核意见" prop="opinion">
                  <RadioGroup v-model="checkForm1.opinion">
                    <Radio label="1">&nbsp;&nbsp;&nbsp;同意&nbsp;&nbsp;&nbsp;</Radio>
                    <Radio label="2">&nbsp;&nbsp;&nbsp;不同意</Radio>
                  </RadioGroup>
                </FormItem>
                <FormItem label="备注信息" prop="noteReason" style="width:600px;">
                  <Input type="textarea" v-model="checkForm1.noteReason" :autosize="{minRows: 3,maxRows: 8}"  placeholder="可以备注不通过原因" />
                </FormItem>
              </Form>
              <div slot="footer" style="text-align:center">
                <Button type="primary" @click="handleSubmitCheck">确定</Button>
              </div>
            </Modal>
          </TabPane>
          <TabPane label="已审核"  name="name2">
            <Form :model="search2" label-position="right" :label-width="0" inline >
              <FormItem label="">
                <Select v-model="search2.testType" clearable placeholder="请选择志愿者类型" style="width: 200px">
                  <Option v-for="item in testTypeOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
              <FormItem label="">
                <Input v-model="search2.projectName" style="width:200px" placeholder="请输入项目名称" />
              </FormItem>
              <FormItem label="">
                <Select v-model="search2.province" placeholder="请选择省" style="width:100px" @on-change="selectCity">
                  <Option v-for="item in provinceOption" :key="item.value" :label="item.label" :value="item.value">
                  </Option>
                </Select>
                <Select v-model="search2.city" placeholder="请选择市" style="width:100px" @on-change="selectCounty">
                  <Option v-for="item in cityOption" :key="item.value" :label="item.label" :value="item.value">
                  </Option>
                </Select>
                <Select v-model="search2.county" placeholder="请选择区县" style="width:100px">
                  <Option v-for="item in countyOption" :key="item.value" :label="item.label" :value="item.value">
                  </Option>
                </Select>
              </FormItem>
              <FormItem label="" :label-width="0">
                <div @click="resetA2">清除区域</div>
              </FormItem>
              <FormItem label="">
                <Input v-model="search2.money" style="width:200px" placeholder="请输入补偿金额" />
              </FormItem>
              <FormItem :label-width="50">
                <Button type="primary" @click="handleSearch('name2')">查询</Button>
              </FormItem>
            </Form>
            <div>
              <Row type="flex" justify="start" class="code-row-bg">
                <Button type="primary" style="margin-bottom:20px;text-align: right;">导出表格</Button>
              </Row>
              <Table :data="tableData2" :columns="columns2" stripe border></Table>
              <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                  <Page :total="page2.total" :current="page2.pageNumber" :page-size="page2.pageSize" show-elevator show-sizer show-total
                        placement="top" @on-change="handlePage2" @on-page-size-change='handlePageSize2'></Page>
                </div>
              </div>
            </div>
            <Modal title="查看" v-model="isShowModal2" width="800px">
              <table border class="useShowTable">
                <tr>
                  <td style="width:20%" align="center">项目名称</td>
                  <td style="width:30%">{{infoForm2.projectName}}</td>
                  <td style="width:20%" align="center">适应专业</td>
                  <td style="width:30%">{{infoForm2.requireMajor}}</td>
                </tr>
                <tr>
                  <td align="center">药物适应症</td>
                  <td>{{infoForm2.applicationMedicine}}</td>
                  <td align="center">药物名称</td>
                  <td>{{infoForm2.medicineName}}</td>
                </tr>
                <tr>
                  <td align="center">招募人数</td>
                  <td>{{infoForm2.recruitNumber}}</td>
                  <td align="center">受试者类型</td>
                  <td>{{infoForm2.testTypeStr}}</td>
                </tr>
                <tr>
                  <td align="center">项目分期</td>
                  <td>{{infoForm2.projectStage}}</td>
                  <td align="center">试验起止日期</td>
                  <td>{{infoForm2.startTime}}&nbsp;&nbsp;至&nbsp;&nbsp;{{infoForm2.endTime}}</td>
                </tr>
                <tr>
                  <td align="center">报名截止日期</td>
                  <td>{{infoForm2.applyEndTime}}</td>
                  <td align="center">婚姻状况</td>
                  <td>{{infoForm2.maritalStatus}}</td>
                </tr>
                <tr>
                  <td align="center">性别要求</td>
                  <td>{{infoForm2.requireSex}}</td>
                  <td align="center">年龄要求</td>
                  <td>{{infoForm2.requireAge}}</td>
                </tr>
                <tr>
                  <td align="center">补偿金</td>
                  <td>{{infoForm2.compensationMoney}}</td>
                  <td align="center">联系人</td>
                  <td>{{infoForm2.linkMan}}</td>
                </tr>
                <tr>
                  <td align="center">联系电话</td>
                  <td>{{infoForm2.phone}}</td>
                  <td align="center">执行机构</td>
                  <td>{{infoForm2.actuator}}</td>
                </tr>
                <tr>
                  <td align="center">附件</td>
                  <td> <div @click="toShowAttachment(infoForm2.url)">{{infoForm2.fileName}}</div></td>
                  <td align="center">区域</td>
                  <td>{{infoForm2.areaAddress}}</td>
                </tr>
                <tr>
                  <td align="center">入选标准</td>
                  <td colspan="3">{{infoForm2.standard}}</td>
                </tr>
                <tr>
                  <td align="center">排除标准</td>
                  <td colspan="3">{{infoForm2.excludeStandard}}</td>
                </tr>
                <tr>
                  <td align="center">项目描述</td>
                  <td colspan="3">{{infoForm2.projectDescribe}}</td>
                </tr>
              </table>
              <div slot="footer" style="text-align:center">
              </div>
            </Modal>
          </TabPane>
          <TabPane label="未发布"  name="name3">
            <Form :model="search3" label-position="right" :label-width="0" inline >
              <FormItem label="">
                <Select v-model="search3.testType" clearable placeholder="请选择志愿者类型" style="width: 200px">
                  <Option v-for="item in testTypeOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
              <FormItem label="">
                <Input v-model="search3.projectName" style="width:200px" placeholder="请输入项目名称" />
              </FormItem>
              <FormItem label="">
                <Select v-model="search3.province" placeholder="请选择省" style="width:100px" @on-change="selectCity">
                  <Option v-for="item in provinceOption" :key="item.value" :label="item.label" :value="item.value">
                  </Option>
                </Select>
                <Select v-model="search3.city" placeholder="请选择市" style="width:100px" @on-change="selectCounty">
                  <Option v-for="item in cityOption" :key="item.value" :label="item.label" :value="item.value">
                  </Option>
                </Select>
                <Select v-model="search3.county" placeholder="请选择区县" style="width:100px">
                  <Option v-for="item in countyOption" :key="item.value" :label="item.label" :value="item.value">
                  </Option>
                </Select>
              </FormItem>
              <FormItem label="" :label-width="0">
                <div @click="resetA3">清除区域</div>
              </FormItem>
              <FormItem label="">
                <Input v-model="search3.money" style="width:200px" placeholder="请输入补偿金额" />
              </FormItem>
              <FormItem :label-width="50">
                <Button type="primary" @click="handleSearch('name3')">查询</Button>
              </FormItem>
            </Form>
            <div>
              <Row type="flex" justify="start" class="code-row-bg">
                <Button type="primary" style="margin-bottom:20px;text-align: right;">导出表格</Button>
              </Row>
              <Table :data="tableData3" :columns="columns3" stripe border></Table>
              <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                  <Page :total="page3.total" :current="page3.pageNumber" :page-size="page3.pageSize" show-elevator show-sizer show-total
                        placement="top" @on-change="handlePage3" @on-page-size-change='handlePageSize3'></Page>
                </div>
              </div>
            </div>
            <Modal title="查看" v-model="isShowModal3" width="800px">
              <table border class="useShowTable">
                <tr>
                  <td style="width:20%" align="center">项目名称</td>
                  <td style="width:30%">{{infoForm3.projectName}}</td>
                  <td style="width:20%" align="center">适应专业</td>
                  <td style="width:30%">{{infoForm3.requireMajor}}</td>
                </tr>
                <tr>
                  <td align="center">药物适应症</td>
                  <td>{{infoForm3.applicationMedicine}}</td>
                  <td align="center">药物名称</td>
                  <td>{{infoForm3.medicineName}}</td>
                </tr>
                <tr>
                  <td align="center">招募人数</td>
                  <td>{{infoForm3.recruitNumber}}</td>
                  <td align="center">受试者类型</td>
                  <td>{{infoForm3.testTypeStr}}</td>
                </tr>
                <tr>
                  <td align="center">项目分期</td>
                  <td>{{infoForm3.projectStage}}</td>
                  <td align="center">试验起止日期</td>
                  <td>{{infoForm3.startTime}}&nbsp;&nbsp;至&nbsp;&nbsp;{{infoForm3.endTime}}</td>
                </tr>
                <tr>
                  <td align="center">报名截止日期</td>
                  <td>{{infoForm3.applyEndTime}}</td>
                  <td align="center">婚姻状况</td>
                  <td>{{infoForm3.maritalStatus}}</td>
                </tr>
                <tr>
                  <td align="center">性别要求</td>
                  <td>{{infoForm3.requireSex}}</td>
                  <td align="center">年龄要求</td>
                  <td>{{infoForm3.requireAge}}</td>
                </tr>
                <tr>
                  <td align="center">补偿金</td>
                  <td>{{infoForm3.compensationMoney}}</td>
                  <td align="center">联系人</td>
                  <td>{{infoForm3.linkMan}}</td>
                </tr>
                <tr>
                  <td align="center">联系电话</td>
                  <td>{{infoForm3.phone}}</td>
                  <td align="center">执行机构</td>
                  <td>{{infoForm3.actuator}}</td>
                </tr>
                <tr>
                  <td align="center">附件</td>
                  <td> <div @click="toShowAttachment(infoForm3.url)">{{infoForm3.fileName}}</div></td>
                  <td align="center">区域</td>
                  <td>{{infoForm3.areaAddress}}</td>
                </tr>
                <tr>
                  <td align="center">入选标准</td>
                  <td colspan="3">{{infoForm3.standard}}</td>
                </tr>
                <tr>
                  <td align="center">排除标准</td>
                  <td colspan="3">{{infoForm3.excludeStandard}}</td>
                </tr>
                <tr>
                  <td align="center">项目描述</td>
                  <td colspan="3">{{infoForm3.projectDescribe}}</td>
                </tr>
              </table>
              <div slot="footer" style="text-align:center">
              </div>
            </Modal>

          </TabPane>
          <TabPane label="已发布"  name="name4">
            <Form :model="search4" label-position="right" :label-width="0" inline >
              <FormItem label="">
                <Select v-model="search4.testType" clearable placeholder="请选择志愿者类型" style="width: 200px">
                  <Option v-for="item in testTypeOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
              <FormItem label="">
                <Input v-model="search4.projectName" style="width:200px" placeholder="请输入项目名称" />
              </FormItem>
              <FormItem label="">
                <Select v-model="search4.province" placeholder="请选择省" style="width:100px" @on-change="selectCity">
                  <Option v-for="item in provinceOption" :key="item.value" :label="item.label" :value="item.value">
                  </Option>
                </Select>
                <Select v-model="search4.city" placeholder="请选择市" style="width:100px" @on-change="selectCounty">
                  <Option v-for="item in cityOption" :key="item.value" :label="item.label" :value="item.value">
                  </Option>
                </Select>
                <Select v-model="search4.county" placeholder="请选择区县" style="width:100px">
                  <Option v-for="item in countyOption" :key="item.value" :label="item.label" :value="item.value">
                  </Option>
                </Select>
              </FormItem>
              <FormItem label="" :label-width="0">
                <div @click="resetA4">清除区域</div>
              </FormItem>
              <FormItem label="">
                <Input v-model="search4.money" style="width:200px" placeholder="请输入补偿金额" />
              </FormItem>
              <FormItem :label-width="50">
                <Button type="primary" @click="handleSearch('name4')">查询</Button>
              </FormItem>
            </Form>
            <div>
              <Row type="flex" justify="start" class="code-row-bg">
                <Button type="primary" style="margin-bottom:20px;text-align: right;">导出表格</Button>
              </Row>
              <Table :data="tableData4" :columns="columns4" stripe border></Table>
              <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                  <Page :total="page4.total" :current="page4.pageNumber" :page-size="page4.pageSize" show-elevator show-sizer show-total
                        placement="top" @on-change="handlePage4" @on-page-size-change='handlePageSize4'></Page>
                </div>
              </div>
            </div>
            <Modal title="查看" v-model="isShowModal4" width="800px">
              <table border class="useShowTable">
                <tr>
                  <td style="width:20%" align="center">项目名称</td>
                  <td style="width:30%">{{infoForm4.projectName}}</td>
                  <td style="width:20%" align="center">适应专业</td>
                  <td style="width:30%">{{infoForm4.requireMajor}}</td>
                </tr>
                <tr>
                  <td align="center">药物适应症</td>
                  <td>{{infoForm4.applicationMedicine}}</td>
                  <td align="center">药物名称</td>
                  <td>{{infoForm4.medicineName}}</td>
                </tr>
                <tr>
                  <td align="center">招募人数</td>
                  <td>{{infoForm4.recruitNumber}}</td>
                  <td align="center">受试者类型</td>
                  <td>{{infoForm4.testTypeStr}}</td>
                </tr>
                <tr>
                  <td align="center">项目分期</td>
                  <td>{{infoForm4.projectStage}}</td>
                  <td align="center">试验起止日期</td>
                  <td>{{infoForm4.startTime}}&nbsp;&nbsp;至&nbsp;&nbsp;{{infoForm4.endTime}}</td>
                </tr>
                <tr>
                  <td align="center">报名截止日期</td>
                  <td>{{infoForm4.applyEndTime}}</td>
                  <td align="center">婚姻状况</td>
                  <td>{{infoForm4.maritalStatus}}</td>
                </tr>
                <tr>
                  <td align="center">性别要求</td>
                  <td>{{infoForm4.requireSex}}</td>
                  <td align="center">年龄要求</td>
                  <td>{{infoForm4.requireAge}}</td>
                </tr>
                <tr>
                  <td align="center">补偿金</td>
                  <td>{{infoForm4.compensationMoney}}</td>
                  <td align="center">联系人</td>
                  <td>{{infoForm4.linkMan}}</td>
                </tr>
                <tr>
                  <td align="center">联系电话</td>
                  <td>{{infoForm4.phone}}</td>
                  <td align="center">执行机构</td>
                  <td>{{infoForm4.actuator}}</td>
                </tr>
                <tr>
                  <td align="center">附件</td>
                  <td> <div @click="toShowAttachment(infoForm4.url)">{{infoForm4.fileName}}</div></td>
                  <td align="center">区域</td>
                  <td>{{infoForm4.areaAddress}}</td>
                </tr>
                <tr>
                  <td align="center">入选标准</td>
                  <td colspan="3">{{infoForm4.standard}}</td>
                </tr>
                <tr>
                  <td align="center">排除标准</td>
                  <td colspan="3">{{infoForm4.excludeStandard}}</td>
                </tr>
                <tr>
                  <td align="center">项目描述</td>
                  <td colspan="3">{{infoForm4.projectDescribe}}</td>
                </tr>
              </table>
              <div slot="footer" style="text-align:center">
              </div>
            </Modal>

          </TabPane>
        </Tabs>
      </div>
  </div>
</template>

<script>
import { hospitalProjectList,agreeHospitalProject,disagreeHospitalProject } from '../../../../api/hospital.js'
import { getSelectValueDesc,getSelectAreaPC,getSelectAreaPY,getSelectAreaCY,upLoadFile } from '../../../../api/common.js'
import { hospitalProjectUpdate,publishHospitalProject } from '../../../../api/projectManage.js'
import { serverSrc } from '../../../../api/global.js'
    export default {
        name: 'testcar-mgr',
        orderState(v) {
            return 1
        },
        data () {
            return {
                nameTab:'name1',
                testTypeOption:[],
                sexOption:[],
                marriageOption:[],
                projectStageOption:[],
                projectStatus:[],
                publishStatus:[],
                provinceOption:[],
                cityOption:[],
                countyOption:[],
                search1:{
                    testType:'',
                    projectName:'',
                    province:'',
                    city:'',
                    county:'',
                    money:''
                },
                search2:{
                    testType:'',
                    projectName:'',
                    province:'',
                    city:'',
                    county:'',
                    money:''
                },
                search3:{
                    testType:'',
                    projectName:'',
                    province:'',
                    city:'',
                    county:'',
                    money:''
                },
                search4:{
                    testType:'',
                    projectName:'',
                    province:'',
                    city:'',
                    county:'',
                    money:''
                },
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
                        title: '志愿者类型',
                        key: 'testTypeStr',
                        align: 'center',
                    },
                    {
                        title: '区域',
                        align:'center',
                        key: 'areaAddress',
                    },
                    {
                        title: '机构名称',
                        align:'center',
                        key: 'hospitalName',
                    },
                    {
                        title: '创建时间',
                        align:'center',
                        key: 'createDate',
                        render: function (h, params) {
                            return h('div',
                                new Date(this.row.createDate.replace(/-/g, '\/')).Format('yyyy-MM-dd'));
                        }
                    },
                    {
                        title: '补偿金额（元）',
                        align:'center',
                        key: 'compensationMoney',
                    },
                    {
                        title: '状态',
                        align:'center',
                        key: 'approveStatusStr',
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
                                            this.edit1(params.row)
                                        }
                                    }
                                }, '修改'),
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
                                            this.check1(params.row)
                                        }
                                    }
                                }, '审核')
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
                columns2:[
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
                        title: '志愿者类型',
                        key: 'testTypeStr',
                        align: 'center',
                    },
                    {
                        title: '区域',
                        align:'center',
                        key: 'areaAddress',
                    },
                    {
                        title: '机构名称',
                        align:'center',
                        key: 'hospitalName',
                    },
                    {
                        title: '创建时间',
                        align:'center',
                        key: 'createDate',
                        render: function (h, params) {
                            return h('div',
                                new Date(this.row.createDate.replace(/-/g, '\/')).Format('yyyy-MM-dd'));
                        }
                    },
                    {
                        title: '补偿金额（元）',
                        align:'center',
                        key: 'compensationMoney',
                    },
                    {
                        title: '状态',
                        align:'center',
                        render: function (h, params) {
                            return h('div','已审核');
                        }
                    },
                    {
                        title: '审核结果',
                        align:'center',
                        key: 'approveStatusStr',
                    },
                    {
                        title: '备注',
                        align:'center',
                        key: 'status',
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 120,
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
                                            this.show2(params.row)
                                        }
                                    },

                                }, '查看'),
                            ]);
                        }
                    }
                ],
                tableData2:[],
                page2:{
                    pageNumber: 1,
                    pageSize: 10,
                    total: 0
                },
                columns3:[
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
                        title: '志愿者类型',
                        key: 'testTypeStr',
                        align: 'center',
                    },
                    {
                        title: '区域',
                        align:'center',
                        key: 'areaAddress',
                    },
                    {
                        title: '机构名称',
                        align:'center',
                        key: 'hospitalName',
                    },
                    {
                        title: '创建时间',
                        align:'center',
                        key: 'createDate',
                        render: function (h, params) {
                            return h('div',
                                new Date(this.row.createDate.replace(/-/g, '\/')).Format('yyyy-MM-dd'));
                        }
                    },
                    {
                        title: '补偿金额（元）',
                        align:'center',
                        key: 'compensationMoney',
                    },
                    {
                        title: '状态',
                        align:'center',
                        render: function (h, params) {
                            return h('div','未发布');
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 120,
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
                                            this.show3(params.row)
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
                                            this.publish3(params.row)
                                        }
                                    }
                                }, '发布')
                            ]);
                        }
                    }
                ],
                tableData3:[],
                page3:{
                    pageNumber: 1,
                    pageSize: 10,
                    total: 0
                },
                columns4:[
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
                        title: '志愿者类型',
                        key: 'testType',
                        align: 'center',
                    },
                    {
                        title: '区域',
                        align:'center',
                        key: 'areaAddress',
                    },
                    {
                        title: '机构名称',
                        align:'center',
                        key: 'hospitalName',
                    },
                    {
                        title: '创建时间',
                        align:'center',
                        key: 'createDate',
                        render: function (h, params) {
                            return h('div',
                                new Date(this.row.createDate.replace(/-/g, '\/')).Format('yyyy-MM-dd'));
                        }
                    },
                    {
                        title: '补偿金额（元）',
                        align:'center',
                        key: 'compensationMoney',
                    },
                    {
                        title: '状态',
                        align:'center',
                        key: 'publishStatusStr',
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 120,
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
                                            this.show4(params.row)
                                        }
                                    },

                                }, '查看')
                            ]);
                        }
                    }
                ],
                tableData4:[],
                page4:{
                    pageNumber: 1,
                    pageSize: 10,
                    total: 0
                },
                isShow1:false,
                isShowModal1:false,
                infoForm1: {
                    projectName:'',
                    requireMajor:'',
                    applicationMedicine:'',
                    medicineName:'',
                    recruitNumber:'',
                    testType:'',
                    projectStage:'',
                    startTime:'',
                    endTime:'',
                    applyEndTime:'',
                    maritalStatus:'',
                    requireSex:'',
                    requireAge:'',
                    compensationMoney:'',
                    linkMan:'',
                    phone:'',
                    actuator:'',
                    url:'',
                    fileName:'',
                    standard:'',
                    excludeStandard:'',
                    projectDescribe:'',
                    province:'',
                    city:'',
                    county:''
                },
                rules: {
                    projectName: [{
                        required: true,
                        message: '此项必填',
                        trigger: "blur"
                    }],
                    requireMajor: [{
                        required: true,
                        message: '此项必填',
                        trigger: "blur"
                    }],
                    applicationMedicine: [{
                        required: true,
                        message: '此项必填',
                        trigger: "blur"
                    }],
                    medicineName: [{
                        required: true,
                        message: '此项必填',
                        trigger: "blur"
                    }],
                    recruitNumber: [
                        {required: true,message: '此项必填',trigger: "blur"}/*,
                         {type: 'string',pattern:/^(0|\+?[1-9][0-9]*)$/,  message: '请输入数字',trigger: 'change'}*/
                    ],
                    testType: [{
                        required: true,
                        message: '此项必填',
                        trigger: "blur"
                    }],
                    projectStage: [{
                        required: true,
                        message: '此项必填',
                        trigger: "blur"
                    }],
                    startTime: [{
                        required: true,
                        message: '此项必填',
                        trigger: "blur"
                    }],
                    endTime: [{
                        required: true,
                        message: '此项必填',
                        trigger: "blur"
                    }],
                    applyEndTime: [{
                        required: true,
                        message: '此项必填',
                        trigger: "blur"
                    }],
                    maritalStatus: [{
                        required: true,
                        message: '此项必填',
                        trigger: "blur"
                    }],
                    requireSex: [{
                        required: true,
                        message: '此项必填',
                        trigger: "blur"
                    }],
                    requireAge: [
                        {required: true,message: '此项必填',trigger: "blur"},
                        /*{type: 'string',pattern:/^(0|\+?[1-9][0-9]*)$/, message: '请输入数字',trigger: 'change'}*/
                    ],
                    compensationMoney: [
                        {required: true,message: '此项必填',trigger: "blur"},
                        /*{type: 'string',  pattern: /^\+?(\d*\.\d{2})$/,message: '请输入正数且保留2位有效小数点',trigger: 'change'}*/
                    ],
                    linkMan: [{
                        required: true,
                        message: '此项必填',
                        trigger: "blur"
                    }],
                    phone: [
                        {required: true,message: '此项必填',trigger: "blur"},
                        {type: 'string',pattern: /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$|^0\d{2,3}-?\d{7,8}$/,message: '请输入有效的电话号码',trigger: 'change'}
                    ],
                    actuator: [{
                        required: true,
                        message: '此项必填',
                        trigger: "blur"
                    }],
                    url: [{
                        required: true,
                        message: '此项必填',
                        trigger: "blur"
                    }],
                    standard: [{
                        required: true,
                        message: '此项必填',
                        trigger: "blur"
                    }],
                    excludeStandard: [{
                        required: true,
                        message: '此项必填',
                        trigger: "blur"
                    }],
                    projectDescribe: [{
                        required: true,
                        message: '此项必填',
                        trigger: "blur"
                    }],
                },
                checkModal1:false,
                checkForm1:{
                    opinion:'',
                    noteReason:''
                },
                checkRules1:{
                    opinion: [{
                        required: true,
                        message: '此项必填',
                        trigger: "blur"
                    }]
                },
                checkId1:'',
                isShowModal2:false,
                infoForm2: {
                    projectName:'',
                    requireMajor:'',
                    applicationMedicine:'',
                    medicineName:'',
                    recruitNumber:'',
                    testType:'',
                    projectStage:'',
                    startTime:'',
                    endTime:'',
                    applyEndTime:'',
                    maritalStatus:'',
                    requireSex:'',
                    requireAge:'',
                    compensationMoney:'',
                    linkMan:'',
                    phone:'',
                    actuator:'',
                    url:'',
                    fileName:'',
                    standard:'',
                    excludeStandard:'',
                    projectDescribe:'',
                    province:'',
                    city:'',
                    county:''
                },
                isShowModal3:false,
                infoForm3: {
                    projectName:'',
                    requireMajor:'',
                    applicationMedicine:'',
                    medicineName:'',
                    recruitNumber:'',
                    testType:'',
                    projectStage:'',
                    startTime:'',
                    endTime:'',
                    applyEndTime:'',
                    maritalStatus:'',
                    requireSex:'',
                    requireAge:'',
                    compensationMoney:'',
                    linkMan:'',
                    phone:'',
                    actuator:'',
                    url:'',
                    fileName:'',
                    standard:'',
                    excludeStandard:'',
                    projectDescribe:'',
                    province:'',
                    city:'',
                    county:''
                },
                isShowModal4:false,
                infoForm4: {
                    projectName:'',
                    requireMajor:'',
                    applicationMedicine:'',
                    medicineName:'',
                    recruitNumber:'',
                    testType:'',
                    projectStage:'',
                    startTime:'',
                    endTime:'',
                    applyEndTime:'',
                    maritalStatus:'',
                    requireSex:'',
                    requireAge:'',
                    compensationMoney:'',
                    linkMan:'',
                    phone:'',
                    actuator:'',
                    url:'',
                    fileName:'',
                    standard:'',
                    excludeStandard:'',
                    projectDescribe:'',
                    province:'',
                    city:'',
                    county:''
                },

            }
        },
        computed: {
        },
        created(){
            this.initFormatter();
            let testType = {
                "key": 'SUBJECT_TYPE'
            }
            getSelectValueDesc(testType).then(res => {
                if(res.data.code = 200){
                    this.testTypeOption = res.data.msg
                }
            })
            getSelectAreaPC().then(res => {
                this.cityOption=[];
                this.countyOption=[];
                if(res.data.code = 200){
                    this.provinceOption = res.data.msg
                }
            });
            this.getList1();
            this.getList2();
            this.getList3();
            this.getList4();
            let project = {
                "key": 'STATUS_PROJECT'
            }
            getSelectValueDesc(project).then(res => {
                if(res.data.code = 200){
                    this.projectStatus = res.data.msg
                }
            })
            let publish = {
                "key": 'PUBLISH_PROJECT'
            }
            getSelectValueDesc(publish).then(res => {
                if(res.data.code = 200){
                    this.publishStatus = res.data.msg
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
            let marriage = {
                "key": 'STATUS_MARITAL'
            }
            getSelectValueDesc(marriage).then(res => {
                if(res.data.code = 200) {
                    this.marriageOption = res.data.msg
                }
            })
            let stage = {
                "key": 'PROJECT_STAGES'
            }
            getSelectValueDesc(stage).then(res => {
                if(res.data.code = 200){
                    this.projectStageOption = res.data.msg
                }
            })
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
            resetA1(){
                this.search1.province='';
                this.search1.city='';
                this.search1.county='';
                this.cityOption=[];
                this.countyOption=[];
            },
            resetA2(){
                this.search2.province='';
                this.search2.city='';
                this.search2.county='';
                this.cityOption=[];
                this.countyOption=[];
            },
            resetA3(){
                this.search3.province='';
                this.search3.city='';
                this.search3.county='';
                this.cityOption=[];
                this.countyOption=[];
            },
            resetA4(){
                this.search4.province='';
                this.search4.city='';
                this.search4.county='';
                this.cityOption=[];
                this.countyOption=[];
            },
            getList1(){
                let params = {
                    testType: this.search1.testType,
                    projectName: this.search1.projectName,
                    province: this.search1.province,
                    city: this.search1.city,
                    county: this.search1.county,
                    pageNumber: this.page1.pageNumber,
                    pageSize: this.page1.pageSize,
                    approveStatus:1
                };
                console.log('params=='+JSON.stringify(params));
                hospitalProjectList(params)
                    .then(res => {
                        this.tableData1 = res.data.page.list;
                        for(let i=0;i<this.tableData1.length;i++) {
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
                        }
                        this.page1.pageNumber = res.data.page.pageNumber;
                        this.page1.pageSize = res.data.page.pageSize;
                        this.page1.total = res.data.page.totalRow;
                    })
            },
            getList2(){
                let params = {
                    testType: this.search2.testType,
                    projectName: this.search2.projectName,
                    province: this.search2.province,
                    city: this.search2.city,
                    county: this.search2.county,
                    pageNumber: this.page2.pageNumber,
                    pageSize: this.page2.pageSize,
                    approveStatus:2
                };
                hospitalProjectList(params)
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
                    testType: this.search3.testType,
                    projectName: this.search3.projectName,
                    province: this.search3.province,
                    city: this.search3.city,
                    county: this.search3.county,
                    pageNumber: this.page3.pageNumber,
                    pageSize: this.page3.pageSize,
                    publishStatus:2
                };
                console.log('this.params=='+JSON.stringify(params));
                hospitalProjectList(params)
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
                    testType: this.search4.testType,
                    projectName: this.search4.projectName,
                    province: this.search4.province,
                    city: this.search4.city,
                    county: this.search4.county,
                    pageNumber: this.page4.pageNumber,
                    pageSize: this.page4.pageSize,
                    publishStatus:1
                };
                hospitalProjectList(params)
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
                //console.log('row---'+JSON.stringify(row));
                this.infoForm1=row;
                this.isShow1=true;
                this.isShowModal1=true;
                for(let i=0;i<this.projectStageOption.length;i++){
                    if(row.projectStage===this.projectStageOption[i].value){
                        this.infoForm1.projectStage=this.projectStageOption[i].label;
                        break;
                    }
                }
                for(let j=0;j<this.marriageOption.length;j++){
                    if(row.maritalStatus===this.marriageOption[j].value){
                        this.infoForm1.maritalStatus=this.marriageOption[j].label;
                        break;
                    }
                }
                for(let j=0;j<this.sexOption.length;j++){
                    if(row.requireSex===this.sexOption[j].value){
                        this.infoForm1.requireSex=this.sexOption[j].label;
                        break;
                    }
                }
                this.infoForm1.startTime=row.startTime.substring(0, 10);
                this.infoForm1.endTime=row.endTime.substring(0, 10);
                this.infoForm1.applyEndTime=row.applyEndTime.substring(0, 10);
                this.selectCity(row.province);
                this.selectCounty(row.city);
            },
            edit1(row){
                this.infoForm1=row;
                this.isShow1=false;
                this.isShowModal1=true;
                this.selectCity(row.province);
                this.selectCounty(row.city);
            },
            handleSubmitUpdate1(){
                this.$refs.infoForm1.validate(valid => {
                    if(valid) {
                        let data={
                            "id":this.infoForm1.id,
                            "projectName":this.infoForm1.projectName,
                            "requireMajor":this.infoForm1.requireMajor,
                            "applicationMedicine":this.infoForm1.applicationMedicine,
                            "medicineName":this.infoForm1.medicineName,
                            "recruitNumber":this.infoForm1.recruitNumber,
                            "testType":this.infoForm1.testType,
                            "projectStage":this.infoForm1.projectStage,
                            "startTime":this.infoForm1.startTime,
                            "endTime":this.infoForm1.endTime,
                            "applyEndTime":this.infoForm1.applyEndTime,
                            "maritalStatus":this.infoForm1.maritalStatus,
                            "requireSex":this.infoForm1.requireSex,
                            "requireAge":this.infoForm1.requireAge,
                            "compensationMoney":this.infoForm1.compensationMoney,
                            "linkMan":this.infoForm1.linkMan,
                            "phone":this.infoForm1.phone,
                            "actuator":this.infoForm1.actuator,
                            "url":this.infoForm1.url,
                            "standard":this.infoForm1.standard,
                            "excludeStandard":this.infoForm1.excludeStandard,
                            "projectDescribe":this.infoForm1.projectDescribe,
                            "province":this.infoForm1.province,
                            "city":this.infoForm1.city,
                            "county":this.infoForm1.county
                        };
                        //console.log('data---'+JSON.stringify(data));
                        hospitalProjectUpdate(data).then(res => {
                            if(res.data.code==200){
                                this.$Message.success('编辑项目成功！');
                                this.$refs["infoForm1"].resetFields();
                                this.isShow1 = false;
                                this.isShowModal1 = false;
                                this.getList1();
                            }

                        });
                    }
                });
            },
            cancelModal1(){
                this.isShowModal1=false;
                this.infoForm1={}
            },
            resetB1(){
                this.infoForm1.province='';
                this.infoForm1.city='';
                this.infoForm1.county='';
                this.cityOption=[];
                this.countyOption=[];
            },
            resetB2(){
                this.infoForm2.province='';
                this.infoForm2.city='';
                this.infoForm2.county='';
                this.cityOption=[];
                this.countyOption=[];
            },
            resetB3(){
                this.infoForm3.province='';
                this.infoForm3.city='';
                this.infoForm3.county='';
                this.cityOption=[];
                this.countyOption=[];
            },
            resetB4(){
                this.infoForm4.province='';
                this.infoForm4.city='';
                this.infoForm4.county='';
                this.cityOption=[];
                this.countyOption=[];
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
            handleUpload1 (file) {
                const formData = new FormData();
                formData.append('upfile', file);
                upLoadFile(formData).then(res => {
                    if (res.data.code === '200') {
                        //this.$Message.success('上传成功');
                        this.infoForm1.url = res.data.map.fileUrl;
                        this.infoForm1.fileName = res.data.map.originalFileName
                    }
                })
            },
            handleUpload2(file) {
                const formData = new FormData();
                formData.append('upfile', file);
                upLoadFile(formData).then(res => {
                    if (res.data.code === '200') {
                        //this.$Message.success('上传成功');
                        this.infoForm2.url = res.data.map.fileUrl;
                        this.infoForm2.fileName = res.data.map.originalFileName
                    }
                })
            },
            handleUpload3 (file) {
                const formData = new FormData();
                formData.append('upfile', file);
                upLoadFile(formData).then(res => {
                    if (res.data.code === '200') {
                        //this.$Message.success('上传成功');
                        this.infoForm3.url = res.data.map.fileUrl;
                        this.infoForm3.fileName = res.data.map.originalFileName
                    }
                })
            },
            handleUpload4 (file) {
                const formData = new FormData();
                formData.append('upfile', file);
                upLoadFile(formData).then(res => {
                    if (res.data.code === '200') {
                        //this.$Message.success('上传成功');
                        this.infoForm4.url = res.data.map.fileUrl;
                        this.infoForm4.fileName = res.data.map.originalFileName
                    }
                })
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
            toShowAttachment(url){
                window.location.href=serverSrc+url;
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
