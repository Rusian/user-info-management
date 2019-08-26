'use strict';
// login_store
import api from '@/api'

const state = {};

const getters = {};

const mutations = {};

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
