import Vue from 'vue'
import Router from 'vue-router'
import index from './views/index.vue'
import Home from './views/Home.vue'
import login from './views/login.vue'
import register from './views/register.vue'
import registerCro from './views/registerCro.vue'
import registerBid from './views/registerBid.vue'
import healthInfo from './views/healthInfo.vue'
import healthInfoDetail from './views/healthInfoDetail.vue'
import healthInfoProject from './views/healthInfoProject.vue'
import infoList from './views/infoList.vue'
import infoListDetail from './views/infoListDetail.vue'
import online from './views/online.vue'
import news from './views/news.vue'
import newsDetail from './views/newsDetail.vue'
import cro from './views/cro.vue'
import croDetail from './views/croDetail.vue'
import croProject from './views/croProject.vue'
import crc from './views/crc.vue'
import resume from './views/resume.vue'
import biddingParty from './views/biddingParty.vue'
import biddingPartyDetail from './views/biddingPartyDetail.vue'
import biddingPartyProject from './views/biddingPartyProject.vue'
import projectManage from './views/projectManage.vue'
import projectDetail from './views/projectDetail.vue'
import registerPer from './views/registerPer.vue'
import registerCrc from './views/registerCrc.vue'

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: index,
      children:[
          {
              path: '/',
              component: Home,
          },
          {
              path: 'login',
              component: login,
          },
          {
              path: 'register',
              component: register,
          },
          {
              path: 'registerCro',
              component: registerCro,
          },
          {
              path: 'registerBid',
              component: registerBid,
          },
          {
              path: 'registerPer',
              component: registerPer,
          },
          {
              path: 'registerCrc',
              component: registerCrc,
          },
          {
              path: '/projectManage',
              name: 'projectManage',
              component: projectManage,
          },
          {
              path: '/healthInfo',
              name: 'healthInfo',
              component: healthInfo,
          },
          {
              path: '/healthInfoDetail',
              name:'healthInfoDetail',
              component: healthInfoDetail,
          },
          {
              path: '/healthInfoProject',
              name:'healthInfoProject',
              component: healthInfoProject,
          },
          {
              path: '/infoList',
              name:'infoList',
              component: infoList,
          },
          {
              path: '/infoListDetail',
              name:'infoListDetail',
              component: infoListDetail,
          },
          {
              path: 'online',
              component: online,
          },
          {
              path: 'news',
              component: news,
          },
          {
              path: 'newsDetail',
              component: newsDetail,
          },
          {
              path: 'cro',
              component: cro,
          },
          {
              path: 'croDetail',
              component: croDetail,
          },{
              path: 'croProject',
              component: croProject,
          },
          {
              path: 'crc',
              component: crc,
          },
          {
              path: 'resume',
              component: resume,
          },
          {
              path: 'biddingParty',
              component: biddingParty,
          },{
              path: 'biddingPartyDetail',
              component: biddingPartyDetail,
          },{
              path: 'biddingPartyProject',
              component: biddingPartyProject,
          },{
              path: 'projectDetail',
              component: projectDetail,
          },

      ]
    },
      {
          path: '/admin',
          beforeEnter(to, from, next) {
              window.location = "/admin.html"
          }
      }
  ]
})
