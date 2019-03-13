import Vue from 'vue'
import Router from 'vue-router'
import index from '../views/index.vue'
import Home from '../views/Home.vue'
import accountManage from '../views/accountManage.vue'
import resList from '../views/ResList.vue'
import roleList from '../views/RoleList.vue'
import cooperation from '../views/projectManage/cooperation.vue'
import newProjectJG from '../views/projectManage/newProjectJG.vue'
import newProjectSBF from '../views/projectManage/newProjectSBF.vue'
import projectCount from '../views/projectManage/projectCount.vue'
import projectSearch from '../views/projectManage/projectSearch.vue'
import projectCheck from '../views/projectManage/projectCheck.vue'
import healthCheck from '../views/volunteerManage/healthCheck.vue'
import enteringGroup from '../views/volunteerManage/enteringGroup.vue'
import outGroup from '../views/volunteerManage/outGroup.vue'
import volunteerSearch from '../views/volunteerManage/volunteerSearch.vue'
import blacklist from '../views/volunteerManage/blacklist.vue'
import searchMechanism from '../views/projectManage/searchMechanism.vue'
import beHospitalNotice from '../views/newsManage/beHospitalNotice.vue'
import healthNotice from '../views/newsManage/healthNotice.vue'
import makeMoneyNotice from '../views/newsManage/makeMoneyNotice.vue'
import projectDraft from '../views/newsManage/projectDraft.vue'

Vue.use(Router)

export default  [
    {
      path: '/admin.html',
      component:index,
      children:[
          {
              path: 'projectManage',
              name:'项目管理',
              component: Home,
              children:[
                  {
                      path: 'newProject',
                      name:'医疗机构新建项目',
                      component: newProjectJG,
                  },
                  {
                      path: 'newProjectSBF',
                      name:'新建项目',
                      component: newProjectSBF,
                  },
                  {
                      path: 'projectCheck',
                      name:'项目审核',
                      component: projectCheck,
                  },
                  {
                      path: 'searchMechanism',
                      name:'寻找机构',
                      component: searchMechanism,
                  },
                  {
                      path: 'cooperation',
                      name:'合作机构',
                      component: cooperation,
                  },
                  {
                      path: 'projectSearch',
                      name:'项目查询',
                      component: projectSearch,
                  },
                  {
                      path: 'projectCount',
                      name:'项目统计',
                      component: projectCount,
                  },

              ]
          },
          {
              path: 'accountManage',
              name:'账号管理',
              component: Home,
              children:[
                  {
                      path: '/',
                      name:'账号管理',
                      component: accountManage,
                  }
              ]
          },
          {
              path: 'systemManage',
              name:'系统管理',
              component: Home,
              children:[
                  {
                      path: 'resList',
                      name:'资源管理',
                      component: resList,
                  },
                  {
                      path: 'roleList',
                      name:'角色管理',
                      component: roleList,
                  }

              ]
          },
          {
              path: 'volunteerManage',
              name:'志愿者管理',
              component: Home,
              children:[
                  {
                      path: 'healthCheck',
                      name:'体检管理',
                      component: healthCheck,
                  },
                  {
                      path: 'enteringGroup',
                      name:'入组管理',
                      component: enteringGroup,
                  },
                  {
                      path: 'outGroup',
                      name:'出组管理',
                      component: outGroup,
                  },
                  {
                      path: 'volunteerSearch',
                      name:'志愿者查询',
                      component: volunteerSearch,
                  },
                  {
                      path: 'blacklist',
                      name:'黑名单管理',
                      component: blacklist,
                  }

              ]
          },
          {
              path: 'newsManage',
              name:'消息管理',
              component: Home,
              children:[
                  {
                      path: 'healthNotice',
                      name:'体检通知',
                      component: healthNotice,
                  },
                  {
                      path: 'beHospitalNotice',
                      name:'入院通知',
                      component: beHospitalNotice,
                  },
                  {
                      path: 'makeMoneyNotice',
                      name:'打款通知',
                      component: makeMoneyNotice,
                  },
                  {
                      path: 'projectDraft',
                      name:'项目草稿',
                      component: projectDraft,
                  }

              ]
          }
      ]
    },
    {
      path: '/index',
      beforeEnter() {
        window.location = "/"
      }
    }
  ]
