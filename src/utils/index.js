'use strict'
import Vue from 'vue'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn');

// 注册到Vue.prototype的公共方法

Vue.prototype.$bus = new Vue();                                                                                         // $bus 消息事件管道                                                                              // unixToDate 时间戳转日期
Vue.prototype.permsToBoolean = permsToBoolean;
Vue.prototype.bytesToSize = bytesToSize;
Vue.prototype.removeObserver = removeObserver;   // 移除Object的观察者模式
Vue.prototype.$moment = moment;                 // 将moment 注册为全局组件 并默认使用中文模式

// 表单校验 正则
Vue.prototype.patterns = {
  username: /^[a-zA-Z0-9_]*$/,                                                                                          // 校验用户名正则 大小写字母、数字、下划线
  password: /^(?![0-9a-z]+$)(?![0-9A-Z]+$)(?![0-9\W]+$)(?![a-z\W]+$)(?![a-zA-Z]+$)(?![A-Z\W]+$)[a-zA-Z0-9\W_]+$/, // 校验密码正则 大小写字母、数字、特殊字符 四选三
  phone: /^1[3|4|5|7|8][0-9]\d{8}$/,                                                                                    // 校验手机号正则
  port: /^([1-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/,             // 校验端口号正则 1-65535
  number: /^[0-9]*$/,                                                                                                   // 校验数字
  roleName: /^[a-zA-Z0-9_\u4e00-\u9fa5]*$/,                                                                             // 校验角色名 中英文、数字、下划线
  realNum: /^[0-9]+([.]{1}[0-9]+){0,1}$/                                                                                // 校验数字 0、正整数、正小数
}

/*
* Unix To Date with format
* https://www.cnblogs.com/jingwhale/p/4674946.html
* */


// 移除观察者模式数据
function removeObserver(object){
  return JSON.parse(JSON.stringify(object))
}

// perms to boolean
function permsToBoolean(perms){
  let obj = {};
  for(let i = 0; i < perms.length; i++){
    obj[perms[i].id] = true;
  }
  return obj
}


export default {
  $bus: new Vue(),
  permsToBoolean: permsToBoolean,
  bytesToSize: bytesToSize,
}
