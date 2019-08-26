'use strict';

import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
// 登录注册
import Login from '~/login/index'    
// 公共导航栏
import navigation from '~/public/navigation'   // 导航框架页面
//成员管理
import customerManage from '~/customer_management/customer_management'
//数据分析
import analysis from '~/dataView/userInfo.vue'

Vue.use(Router)


const router = new Router({
  //mode: 'history',
  routes: [
    //默认路径重定向
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      //用户导航项目
      path: '/admin',
      component: navigation,
      children: [
        //数据分析
        {
          path: 'analysis',
          name: 'analysis',
          component: analysis
        },
        //成员管理
        {
          path: 'customer-management',
          name: 'customer_management',
          component: customerManage
        },
      ]
    },
    // 无匹配路由默认跳转回登录页面
    {path:'*',redirect:'/'}
  ]
})

export default router

// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'HelloWorld',
//       component: HelloWorld
//     }
//   ]
// })
