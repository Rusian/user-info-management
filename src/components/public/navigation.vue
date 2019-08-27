<template>
  <a-layout id="unacloud-main-layout" class="unacloud-main-layout">
    <a-layout-sider collapsible v-model="collapsed" breakpoint="xxl" @breakpoint="onBreakpoint" @collapse="collapse()">
      <div class="logo" id="logo"></div>>
      <!--导航菜单项目-->
      <a-menu theme="dark" mode="inline" :openKeys="openKeys" :selectedKeys="selectedKeys" @click="handleClick" @openChange="onOpenChange">
        <!--数据展示-->
        <a-menu-item key="customer_analysis" id="customer_analysis">
          <a-icon type="stock" />
          <span class="nav-text">{{$t('DATACHART.NAVI')}}</span>
        </a-menu-item>
        <!--数据列表-->
        <a-menu-item key="customer_management" id="customer_management">
          <a-icon type="database" />
          <span class="nav-text">{{$t('DATALIST.NAVI')}}</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout :style="layoutStyle">
      <a-layout-header :style="{ background: '#fff', padding: 0 }">
        <h1 id="main-title" class="main-title">{{$t('PRODUCT-INFOS.PRODUCT-NAME')}} <br><small>{{$t('PRODUCT-INFOS.PRODUCT-NAME-EN')}}</small></h1>
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 24px 0', overflow: 'initial' }">
        <!--内容插槽 在组件被使用时插入其他组件中的内容-->
        <router-view class="child-view"/>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
  // vuex中使用多个mapActions，多个mapState，或者和其他方法混用的方式
  // ES6 State-2 解构运算符
  // https://blog.csdn.net/qq_30100043/article/details/53391308
  // Vue中使用解构扩展运算符
  // https://segmentfault.com/q/1010000011341414/a-1020000011341524
  import { mapState, mapMutations } from 'vuex'
     
  export default {

    data() {
      return {
        selectedKeysLocal: ['customer_analysis'],
      }
    },
    async mounted() {
      let self = this;
      window.onresize = self.setLayoutStyle;
      self.setLayoutStyle();
    },
    computed: {
      collapsed: {
        get(){
          return this.$store.state.store.collapsed;
        },
        set(val){
          this.SET_COLLAPSED_STATE(val)
        }
      },
      ...mapState({
        userinfo: state => state.store.userinfo,
        selectedKeys: state => state.store.selectedKeys,
        openKeys: state => state.store.openKeys,
        layoutStyle: state => state.store.layoutStyle,
      }),
    },
    methods: {
      ...mapMutations('store', ["SET_LAYOUT_STYLE", "SET_COLLAPSED_STATE", "SET_SELECTED_KEY", "SET_OPEN_KEY"]),
      //点击菜单跳转至指定页面
      handleClick(e){
        this.$router.push({name: e.key});
      },
      // 点击次级菜单更改次级菜单展开状态
      onOpenChange (openKeys) {
        this.SET_OPEN_KEY(openKeys)
      },
      // 界面处理方法
      // layout触发BreakPoint时的操作
      onBreakpoint(broken){
        this.SET_COLLAPSED_STATE(broken)
      },
      // 调整主界面尺寸
      setLayoutStyle(){
        const self = this;
        self.SET_LAYOUT_STYLE({height: document.documentElement.clientHeight})
      },
      // layout组件的collapse事件回调
      // 在state中设置当前侧边栏菜单的折叠状态
      collapse(){
        this.SET_COLLAPSED_STATE(this.collapsed)
      },
    },
  }
</script>
<style lang="less">
  @import "../../assets/less/navigation";
</style>
