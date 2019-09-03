'use strict';

import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"
import store from './store'         //数据源



Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    store

  },
  // Vuex数据持久化插件
  plugins: [createPersistedState(
    {
      storage: window.sessionStorage,
      reducer(val){
        return {
          store: {
            userinfo: val.store.userinfo,
            layoutStyle: val.store.layoutStyle,
            collapsed: val.store.collapsed,
            selectedKeys: val.store.selectedKeys,
            openKeys: val.store.openKeys,
            useConditionList: val.store.useConditionList,
            usersList: val.store.usersList,
            routePaths: val.store.routePaths
          },
        }
      }
    }
  )],
  strict: debug
});

