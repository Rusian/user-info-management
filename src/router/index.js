'use strict';

import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import lodash from 'lodash'
//import HelloWorld from '@/components/HelloWorld'
// 登录注册
import Login from '~/login/index'    
// 公共导航栏
import navigation from '~/public/navigation'   // 导航框架页面

//数据分析
import customerAnalysis from '~/customer_management/customer_analysis'
//成员管理
import customerInfo from '~/customer_management/customerInfo'

const vueIns = new Vue();

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
      name: 'admin',
      component: navigation,
      children: [
        //数据分析
        {
          path: 'customer-analysis',
          name: 'customer_analysis',
          component: customerAnalysis
        },
        //成员管理
        {
          path: 'customer-management',
          name: 'customer_management',
          component: customerInfo
        },
      ]
    },
    // 无匹配路由默认跳转回登录页面
    {path:'*',redirect:'/'}
  ]
})
// 路由进入前钩子
router.beforeEach(async (to, from, next) => {
  // 需要排除无需鉴权限制的路径
  if(to.name === 'login'){
    next()
  }else{
    // 进入页面之前向vuex store提交当前路由信息
    let paths = store.state.store.routePaths
    let findPath = lodash.find(paths, function(path){
      return path === to.name
    });
    if(findPath !== undefined){
      pageStatusDisplay(to.name, to.path);
      next()
    }else{
      await vueIns.$message.error('当前用户不允许访问该页面', 0.5);
      // 用户跳转时 如果有源 则返回源页面 如果无源 则返回登录页面
      // if(!!from.name){
      //   router.push({name: from.name})
      // }else{
      //   router.push({name: 'login'})
      // }
    }
  }
});


export default router;

/*
* 在页面切换路由之后更新页面指示的显示状态
* 提供4种标记
* 当前页面route
* 具有分步导航页面,显示当前分步导航步骤
* 具有tab页面,显示当前tab选中状态
* */
function pageStatusDisplay(name, path){
  let parentDir = path.split('/')[2];
  store.commit('store/SET_SELECTED_KEY', {currentName: name});
  // 进入每一个页面时 向vuex store记录当前页面route信息
  store.commit('store/SET_CURRENT_ROUTE', {name: name, path: path});
}
