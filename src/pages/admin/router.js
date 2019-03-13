import Vue from 'vue'
import Router from 'vue-router'
import index from './views/index.vue'
import Home from './views/Home.vue'
import cooperation from './views/projectManage/cooperation.vue'
import accountManage from './views/accountManage.vue'
import resList from './views/ResList.vue'
import roleList from './views/RoleList.vue'
import newProject from './views/projectManage/newProjectJG.vue'
import projectCount from './views/projectManage/projectCount.vue'
import projectSearch from './views/projectManage/projectSearch.vue'
import healthCheck from './views/volunteerManage/healthCheck.vue'
import enteringGroup from './views/volunteerManage/enteringGroup.vue'
import outGroup from './views/volunteerManage/outGroup.vue'
import volunteerSearch from './views/volunteerManage/volunteerSearch.vue'
import blacklist from './views/volunteerManage/blacklist.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/admin.html',
      // path: '/',
      component:index,
      children:[
        {
          path: '/',
          component: Home,
        },
        {
            path: '/projectManage',
            name:'项目管理',
            children:[
                {
                    path: 'cooperation',
                    name:'合作机构',
                    component: cooperation,
                },
                {
                    path: 'newProject',
                    name:'新建项目',
                    component: newProject,
                },
                {
                    path: 'projectCount',
                    name:'项目统计',
                    component: projectCount,
                },
                {
                    path: 'projectSearch',
                    name:'项目查询',
                    component: projectSearch,
                },
            ]
        },
         {
             path: '/accountManage',
             name:'账号管理',
             children:[
                 {
                     path: '/',
                     name:'账号管理',
                     component: accountManage,
                 }
             ]
         },
          {
              path: '/systemManage',
              name:'系统管理',
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
              path: '/volunteerManage',
              name:'志愿者管理',
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
})
