import axios from 'axios'
// import store from '../store'
import  router from '../pages/index/router'
import { Message } from 'iview'
// import { Spin } from 'iview'
const addErrorLog = errorInfo => {
  const { statusText, status, request: { responseURL } } = errorInfo
  let info = {
    type: 'ajax',
    code: status,
    mes: statusText,
    url: responseURL
  }
  // if (!responseURL.includes('save_error_logger')) store.dispatch('addErrorLog', info)
}

class HttpRequest {
  // constructor (baseUrl = baseURL) {
  constructor (baseUrl) {
     // this.baseUrl = baseUrl
      this.baseUrl = ''
    this.queue = {}
  }
  getInsideConfig () {
    const config = {
      baseURL: '',
      //baseURL: this.baseUrl,
      headers: {
        //
      }
    }
    return config
  }
  destroy (url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }
  interceptors (instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      // 添加全局的loading...
      if (!Object.keys(this.queue).length) {
        // Spin.show() // 不建议开启，因为界面不友好
      }
      this.queue[url] = true
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      this.destroy(url)
      const { data, status } = res

      // return { data, status }
      // console.log("res ==================== " + res);
      if (res.data.code != 200) {
          // 10001:没有登录;  10002:Token 过期了;
          if (res.data.code === 10001 || res.data.code === 10002 || res.data.code === 50014) {
              console.log("res.data.code ==================== " + res.data.code)
              // if (localStorage.getItem('token')) {
              //     Message.warning('你已被登出，请重新登录')
              //     // store.dispatch('handleWebLogOut')
              //
              // }
              router.push('/login')
              location.reload()// 为了重新实例化vue-router对象 避免bug

          } else if (res.data.code == 404) {
              router.push('/404')
          } else if (res.data.code == 500) {
              router.push('/401')
          } else if (res.data.code == 403) {
              router.push('/401')
          }
          console.log('axios', res.data.msg)
          //return Promise.reject(res.data.msg);
          return res
      } else {
          // return response;
          return { data, status }
      }
      // return { data, status }
    }, error => {

      // this.destroy(url)
      // addErrorLog(error.response)
      // return Promise.reject(error)
      return error
    })
  }
  request (options) {
    const instance = axios.create();
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest
