import axios from 'axios'
import Vue from 'vue'
import router from "@/router"
import request from "@/utils/request"


// 创建一个新的Vue实例 以便引用全局方法
const vueIns = new Vue()
const service = axios.create({
  timeout: 30000,
  baseURL: '/api'
})

// request拦截器
service.interceptors.request.use(
  config => {
    // config.method === 'post'
    //   ? config.data = qs.stringify({...config.data})
    //   : config.params = {...config.params};
    // config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    return config
  }, error => {
    console.error(error)
    return Promise.reject(error)
  }
)

// response拦截器
service.interceptors.response.use(
  response => {
    return response
  }, async error => {
    // response 出现错误时的一般处理方法
    console.error(error.response)
    await vueIns.$message.error(error.response.data.errorinfo, 0.5)
    if (router.currentRoute.name !== 'login') {
      // 当不处于登录界面时 出现未授权报错时 直接返回登录界面
      if (error.response.status === 403) {
        router.push({name: 'login'})
      }
    }
    return Promise.reject(error)
  }
)





const adminService = () => {
  return {
    // 用户登录
    login: (username, password) => service.post('/login', '', {headers: {username: username, password: password}}),

  }
}

export default {
  // resourceService: resourceService(),  // 资源管理模块
  // serviceManageService: serviceManageService(), // 服务管理模块
  // userService: userService(), // 用户管理模块
  adminService: adminService(), // 管理员用户管理模块
  
}