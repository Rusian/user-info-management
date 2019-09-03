'use strict';
// store
import Vue from 'vue'
import axios from 'axios'
import moment from 'moment'
const vueIns = new Vue();



const state = {
  pulseCounter: 0,
  locale: "zh",// 默认显示语言 简体中文 zh-cn
  layoutStyle: "",
  selectedKeys: ['admin'],
  openKeys: [],// 展开的菜单项目
  currentRoute: {},
  collapsed: false,
  home_link: '#/admin',
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
  routePaths:[],
  usersList: [],
  selectedUserID: "",
  editUserModalShow: false,
  modifyInfoModal: {
    show: false,    // 是否显示用户更改个人信息窗口
  },  
  editUserInfo: "",
  useConditionList: [
  ],
};

const getters = {

};

const mutations = {
  SET_COUNTER(state, payload){
    state.pulseCounter = payload.counter
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
    state.selectedKeys = ['admin'];
    state.openKeys = [];
    // state.selectedTab = [];
    state.currentRoute = [];
    state.collapsed = false;
    state.userinfo = {
      realname: "",
      username: "",
      email: "",
      phone: "",
      address: ""
    };
    const user_path = [
      'admin',
      "customer_analysis",
      "customer_management"
    ];
    state.routePaths = user_path
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
    state.usersList = data.users;
  },

  //根据获取的数据填充需要的信息CPU
  FILL_CONDITION_LIST(state, payload){
    let data = payload.data
    state.useConditionList = data
  },


  // 发送编辑用户表单
  UPDATE_USERS_LIST(state, payload){
      let data = state.usersList
      for(let i=0; i<data.length; i++){
        if(data[i].key == payload.id){
          data[i].username = payload.info.username;
          data[i].realname = payload.info.realname;
          data[i].phone = payload.info.phone;
          data[i].email = payload.info.email;
          data[i].address = payload.info.address;
        }  
      }
      state.usersList = data;
    },
    



};

const actions = {
  
  // 提交登录表单
  async submitLogin({state}, payload){
    return true
  },

  // 获取用户列表
  async getUsersList({commit}, payload){
    let fetch, data;
    try{
      await axios.get("../static/user.json").then( response => {
        fetch = response.data;
      })
      data = await fetch;
      commit('FILL_USERS_LIST', {data: data});
      return data
    }
    catch(error) {
      throw error
    }

  },

  //获取CPU、内存等使用信息
  async getConditionList({commit},payload){
    let jsonstr, fetch, data;
    try{
      await axios.get("../static/cpu-data3.json").then ( response => {
        jsonstr = JSON.stringify(response.data,['uptime','cpu','useram']);
        fetch = eval("("+jsonstr+")")
      })
      data =await fetch;
      commit('FILL_CONDITION_LIST',{data: data});
    }
    catch(error){
      throw error
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

