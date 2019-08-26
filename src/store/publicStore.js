'use strict';
// store
import Vue from 'vue'
import api from '@/api'

const vueIns = new Vue();

const state = {
  pulseCounter: 0,
  locale: "zh",// 默认显示语言 简体中文 zh-cn
  layoutStyle: "",
  selectedKeys: ['dashboard_admin'],
  openKeys: [],// 展开的菜单项目
  selectedTab: "",
  currentRoute: {},
  collapsed: false,
  home_link: '#/dashboard-admin',
  admininfo: {
    username: "admin",
    password: "12345678"
  },
  userinfo: {
    realname: "",
    username: "",
    email: "",
    phone: "",
    address: "",
    paths: [],
  },
};

const getters = {

};

const mutations = {
  SET_COUNTER(state, payload){
    state.pulseCounter = payload.counter
  },
  SET_USER_INFOS(state, payload){
    const user_path = [
      "dashboard_user",
      "user_orders",
      "user_billings",
      "user_alarms",
      "user_logs",
      "user_settings_userinfo",
      "user_settings_sysinfo",
      "resource-application",
      "auth-application",
      "finish-application",
      "user_settings_sysinfo"
    ];

    if(payload.username !== undefined){state.userinfo.username = payload.username}
    if(payload.name !== undefined){state.userinfo.nickname = payload.name}
    if(payload.type !== undefined){state.userinfo.type = payload.type}
    if(payload.status !== undefined){state.userinfo.status = payload.status}
    if(payload.email !== undefined){state.userinfo.email = payload.email}
    if(payload.phone !== undefined){state.userinfo.phone = payload.phone}
    if(payload.authList !== undefined && payload.authList !== null){
      state.userinfo.auths = vueIns.permsToBoolean(payload.authList);
      let paths = [], permissions = payload.authList;
      for(let i=0; i<dict.length; i++){
        let match = 0;  // 权限匹配计数
        if (dict[i].auths === null) {
          paths.push(dict[i].path);
          continue
        }
        for (let j = 0; j < permissions.length; j++) {
          if (dict[i].auths.indexOf(permissions[j].id) !== -1) {
            // 如果权限和路径要求权限匹配，则匹配计数+1
            match ++  
            // 如果匹配计数和路径要求的权限数目一致（可以认为是全部匹配）则将该条路径添加进入授权路径
            if(dict[i].auths.length === match){
              paths.push(dict[i].path)
            }
            
          }
        }
      }
      state.userinfo.paths = paths;
    }else{
      state.userinfo.paths = user_path;
    }
  },
  // 在state中设置当前语言
  SET_CURRENT_LANGUAGE(state, payload){
    state.locale = payload
  },
  // 在state中设置当前折叠状态
  SET_COLLAPSED_STATE(state, payload){
    state.collapsed = payload;
    // 收起菜单时 收起默认的展开项目
    if(state.collapsed === true){
      state.openKeys = []
    }
  },
  // 在state中设置当前选中菜单
  SET_SELECTED_KEY(state, payload){
    let currentName = payload.currentName;
    // 具有三级子路由时, 选中状态继承父路由
    state.selectedKeys = {"settings_role": ["settings_accounts"]}[currentName]||[currentName]
  },
  SET_OPEN_KEY(state, payload){
    state.openKeys = payload
  },
  // 在state中设置当前选中tab
  SET_SELECTED_TAB(state, payload){
    state.selectedTab = payload
  },
  // 设置当前路由对象
  SET_CURRENT_ROUTE(state, payload){
    state.currentRoute = payload
  },
  // 在state中设置框架的样式（高度）
  SET_LAYOUT_STYLE(state, payload){
    state.layoutStyle = "min-height:" + payload.height + "px"
  },
  // 清空强制存储的状态
  EMPTY_STORE(state, payload){
    state.pulseCounter = 0;
    state.selectedKeys = ['customer_management'];
    state.openKeys = [];
    state.selectedTab = [];
    state.currentRoute = [];
    state.collapsed = false;
    state.userinfo = {
      realname: "",
      username: "",
      email: "",
      phone: "",
      address: "",
      paths: [],
    }
  }
};

const actions = {
    // 提交登录表单
    async submitLogin({state}, payload){
      return api.userService.login(payload.username, payload.password)
    },
    // 提交登出请求
    async submitLogout(){
      return api.userService.logout()
    }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}


