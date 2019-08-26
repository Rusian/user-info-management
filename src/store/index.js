'use strict';

import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"
import public_store from './publicStore'         // 公共数据源
import login_store from './loginStore' // 登录页面数据
import customer_info_store from './infoStore' //数据列表页面数据

/*
* 现有state记录
* ~/public/store.js | public_store
* ----------------------------------------------------------------------------------------------------------------------
* locale: "zh" | [string] | 当前界面显示语言
* layoutStyle: "" | [object] | 当前界面框架高度设置
* selectedKeys: [] | [Array] | 当前已选中导航菜单项目(可多选)
* selectedTab: "" | [string] | (对具有选项卡显示的页面有效) 当前已选中选项卡
* currentStep: "" | [number] | (对具有步骤导航的页面有效) 当前页面所处步骤
* collapsed: false | [Boolean] | 当前导航菜单是否折叠
* home_link: "#/dashboard-admin" | [string] | 跳转的首页链接
*
* */

/*
* 现有Mutation记录
* ~/public/store.js | public_store
* ----------------------------------------------------------------------------------------------------------------------
*
* */

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    public_store,
    login_store,

  },
  // Vuex数据持久化插件
  plugins: [createPersistedState(
    {
      storage: window.sessionStorage,
      reducer(val){
        return {
          public_store: {
            userinfo: val.public_store.userinfo,
            layoutStyle: val.public_store.layoutStyle,
            collapsed: val.public_store.collapsed,
            selectedKeys: val.public_store.selectedKeys,
            openKeys: val.public_store.openKeys,
          },
        }
      }
    }
  )],
  strict: debug
});

