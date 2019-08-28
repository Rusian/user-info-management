<template>
<div class="navigation-content">
    <div class="ant-page-header">
    <a-breadcrumb>
      <a-breadcrumb-item>
        <a href="#/admin"> <a-icon type="home" /></a>
      </a-breadcrumb-item>
      <a-breadcrumb-item>
        {{$t('DATALIST.NAME')}}
      </a-breadcrumb-item>
    </a-breadcrumb>
  </div>
  <a-card :bordered="false" :bodyStyle="{'padding': '24px'}">
    <a-spin :spinning="spinning">
      <a-icon slot="indicator" type="loading" style="font-size: 24px" spin />
      <a-table :columns="columns" :dataSource="usersList" :pagination="tablePagination" :rowKey="record => record.key" @change="handleTableChange" size="middle">
        <template slot="actions" slot-scope="text, record">
        <a href="javascript:;" :id="'editUser_' + record.key" @click="editUser(record)">编辑</a>
        <a-divider type="vertical" />
          <!--more action-->
      </template>
      </a-table>
    </a-spin>
  </a-card>
  <editInfo></editInfo>
</div>
</template>

<script>
  const columns = [
    {
      title: "用户名",
      key: 'username',
      dataIndex: 'username'
    },
    {
      title: "真实姓名",
      key: 'realname',
      dataIndex: 'realname'
    },
    {
      title: "邮箱",
      key: 'email',
      dataIndex: 'email'
    },
    {
      title: "手机",
      key: 'phone',
      dataIndex: 'phone',
    },
    {
      title: "地址",
      key: 'address',
      dataIndex: 'address',
    },
    {
      title: "操作",
      key: 'id',
      dataIndex: 'id',
      scopedSlots: { customRender: 'actions'}
    }
  ];
  import { mapState, mapActions, mapMutations } from 'vuex'
  import {editInfo} from '~/customer_management'
  export default {
    components: {
      editInfo
    },
    data(){
      return {
        columns,
        spinning: false,
        tablePagination:{
          current:1
        }
      }
    },
    mounted(){
      this.updateListData()
    },
    computed: {
      ...mapState({
        usersList: state => state.store.usersList,
        selectedTab: state => state.store.selectedTab,
        userinfo: state => state.store.userinfo,
        selectedUserID: state => state.store.selectedUserID,
      }),
    },
    methods: {
      ...mapActions('store', ["getUsersList"]),
      ...mapMutations('store', ["TOGGLE_USER_EDIT_MODAL","FILL_USERS_LIST"]),
      // 更新表格数据


      async updateListData(){
        this.tablePagination.current = 1;    // 重新获取数据之后，将页面重置为1
        this.spinning = true;
        try{
          await this.getUsersList({username: "", realname: "", phone: "", email: "", address: ""})
          // await this.getUsersList({username: "", realname: "", phone: "", email: "", address: ""})
          this.spinning = false
        }catch (e) {
          this.spinning = false
        }
      },
      editUser(info){
        this.TOGGLE_USER_EDIT_MODAL({show: true, info: info})
      },
      tabChange(key){
        this.$router.push({name: key});
      },
      // 集中处理表格操作(分页, 过滤器, 排序)
      handleTableChange(pagination){
        this.tablePagination.current = pagination.current; // 同步页码变化
        // 修正翻页时报错的问题
        // TODO: 需要集中考虑多条件下 数据是否需要更新的情况
        // 初步方案：数据翻页时不需要重新请求
      },
    }
  }
</script>
<style lang="less"></style>
