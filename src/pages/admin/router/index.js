import Vue from 'vue'
import Router from 'vue-router'
import routes from './router'
// import store from '@/store'
import iView from 'iview'
import { setToken, getToken, canTurnTo } from '@/libs/util'
import config from '@/config'
import { storage } from '../../../libs/common.js'
const { homeName } = config

console.log('routes', routes)
let route = getRouters()
let access = routes;
access[0].children = route
storage.setItem('menuList', access)
console.log('access', access)
function getRouters() {
    let menu = storage.getItem('route')
    console.log('menu', menu)
    let userMenu = []
    let routeList = routes[0].children
    routeList.map((routeItem, routeIndex)=> {
        if (!routeItem.children) {
            menu.map((menuItem,menuIndex) => {
                if(routeItem.name === menuItem.name) {
                    userMenu.push(routeItem)
                }
            })
        } else {
            let parenM = []
            routeItem.children.map((childrenItem,childrenIndex) => {
                menu.map((menuItem,menuIndex) => {
                    if(childrenItem.name === menuItem.name) {
                        parenM.push(childrenItem)
                    }
                })
                routeItem.children = parenM
            })
            if (parenM.length !== 0) {
                userMenu.push(routeItem)
            }
        }
    })
    return [...userMenu]
}
Vue.use(Router)
const router = new Router({
    mode: 'history',
    routes: access
})
const LOGIN_PAGE_NAME = 'login'

const turnTo = (to, access, next) => {
    if (canTurnTo(to.name, access, routes)) next() // 有权限，可访问
    else next({ replace: true, name: 'error_401' }) // 无权限，重定向到401页面
}

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start()
    // const token = getToken()
    // 判断用户是否登陆
    // let token = localStorage.getItem('token')
    // console.log('token', token)
  /*  if (!user) {
        console.log('未登录','to', to, 'from', from, 'next', next)
        if (to.name !== LOGIN_PAGE_NAME) {
            next({
                name: LOGIN_PAGE_NAME // 跳转到登录页
            })
        } else {
            next()
        }
    } else {
        next()
    }*/
    //
    // if (!token && to.name !== LOGIN_PAGE_NAME) {
    //   // 未登录且要跳转的页面不是登录页
    //   next({
    //     name: LOGIN_PAGE_NAME // 跳转到登录页
    //   })
    // } else if (!token && to.name === LOGIN_PAGE_NAME) {
    //   // 未登陆且要跳转的页面是登录页
    //   next() // 跳转
    // } else if (token && to.name === LOGIN_PAGE_NAME) {
    //   // 已登录且要跳转的页面是登录页
    //   next({
    //     name: homeName // 跳转到homeName页
    //   })
    // } else {
    //    next()
    // }
    next()
})

router.afterEach(to => {
    iView.LoadingBar.finish()
    window.scrollTo(0, 0)
})

export default router
