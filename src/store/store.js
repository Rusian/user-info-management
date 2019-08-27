'use strict';
// store
import Vue from 'vue'
import api from '@/api'
import axios from 'axios'

const vueIns = new Vue();

const state = {
  pulseCounter: 0,
  locale: "zh",// 默认显示语言 简体中文 zh-cn
  layoutStyle: "",
  selectedKeys: ['customer-management'],
  openKeys: [],// 展开的菜单项目
  selectedTab: "",
  currentRoute: {},
  collapsed: false,
  home_link: '#/customer-management',
  admininfo: {
    username: "admin",
    password: "12345678",
    paths: []
  },
  userinfo: {
    realname: "",
    username: "",
    email: "",
    phone: "",
    address: "",
  },
  user_formData:{
    realname: "",
    username: "",
    email: "",
    phone: "",
    address: "",
  },
  usersList: [],
  usersListDisplay: [],
  selectedUserID: "",
  editUserModalShow: false,
  modifyInfoModal: {
    show: false,    // 是否显示用户更改个人信息窗口
  },  
  editUserInfo: "",
};

const getters = {

};

const mutations = {
  SET_COUNTER(state, payload){
    state.pulseCounter = payload.counter
  },
  SET_PATH(state, payload){
    const user_path = [
      "analysis",
      "customer_management"
    ];
    state.admininfo.paths = user_path
  },
  SET_USER_INFO(state,payload){
    if(payload.username !== undefined){state.userinfo.username = payload.username}
    if(payload.name !== undefined){state.userinfo.realname = payload.name}
    if(payload.email !== undefined){state.userinfo.email = payload.email}
    if(payload.phone !== undefined){state.userinfo.phone = payload.phone}
    if(payload.address !== undefined){state.userinfo.address = payload.address}
  },
  SET_USER_INFORMATION(state,payload){
    state.user_formData.username = payload.create_user_username ? payload.create_user_username : "";
    state.user_formData.mail = payload.ceate_user_mailbox ? payload.ceate_user_mailbox : "";
    state.user_formData.phone = payload.create_user_phone ? payload.create_user_phone : "";
    state.user_formData.realname = payload.create_user_realname ? payload.create_user_realname : "";
    state.user_formData.address = payload.create_user_address ? payload.create_user_address : ""
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
  // SET_SELECTED_TAB(state, payload){
  //   state.selectedTab = payload
  // },
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
    // state.selectedTab = [];
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
  },

  TOGGLE_USER_EDIT_MODAL(state, payload){
    state.editUserModalShow = payload.show;
    state.editUserInfo = payload.info;
  },
  // 切换用户更改个人信息窗口
  TOGGLE_USERINFO_MODIFY_MODAL(state, payload){
    state.modifyInfoModal.show = payload.show
  },
  // 根据获取的数据填充用户列表
  FILL_USERS_LIST(state, payload){
    let data = payload.data;
    state.usersList = data;
  }
};

const actions = {
  
  // 提交登录表单
  async submitLogin({state}, payload){
    return api.adminService.login(payload.username, payload.password)
    
  },

  // 获取用户列表
  async getUsersList({commit}, payload){
    let fetch, data;
    try{
      await axios.get("../static/user.json").then( res => {
        fetch = res.data;
      })
      data = await fetch.data;

      commit('FILL_USERS_LIST', {data: data});
      return data
    }
    catch(error) {
      throw error
    }

  },
  // 发送编辑用户表单
  async sendUserEditForm({state}, payload){
    return api.userService.editUser(payload.id, payload.info)
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

