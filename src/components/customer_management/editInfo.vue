<template>
  <a-modal title="编辑信息" v-model="editUserModalShow" @ok="handleModalOk" @cancle="handleModalCancel" id="edit-user-info-modal" class="edit-user-info-modal">
    <a-form :form="form" @submit="handleModalOk">
      <a-form-item label="账户名：" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
        <a-input v-decorator="['edit_form_username', edit_form_username={initialValue: '',
      rules: [{ required: true, message: this.$t('FILTERS.USERNAME.NULL'), whitespace: true }]}]" size="large" placeholder="请输入需要修改的用户名" ref="userNameInput">
        </a-input>
      </a-form-item >
      <a-form-item label="姓名：" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
        <a-input v-decorator="['edit_form_realname', edit_form_realname={
          initialValue: '',
          rules: [{ required: true, message: 'Please input your realname!', whitespace: true }]}]" size="large" placeholder="请输入需要修改的姓名" ref="userNameInput">
        </a-input>
      </a-form-item >
      <a-form-item label="邮箱：" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
        <a-input   v-decorator="['edit_form_email', edit_form_email={
           initialValue: '@',
           rules: [{
            pattern: this.patterns.email, message: this.$t('FILTERS.EMAIL.ERR'), // 校验邮箱 请输入正确格式的邮箱
           }, {
            required: true, message: this.$t('FILTERS.EMAIL.NULL'), // 校验邮箱 请输入常用邮箱
           }]
        }]" size="large" placeholder="请输入需要修改的邮箱"  ></a-input>
      </a-form-item>
      <a-form-item label="手机：" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
        <a-input  v-decorator="['edit_form_phone', edit_form_phone={
          initialValue: '13344445555',
          rules: [{
            required: true, message: this.$t('FILTERS.PHONE.NULL'), // 校验手机 请输入常用手机
          },{
            pattern: this.patterns.phone, message: this.$t('FILTERS.PHONE.ERR')  // 校验手机 请输入正确格式的手机号
          }]
        }]" size="large" placeholder="请输入需要修改的手机" ></a-input>
      </a-form-item>
       <a-form-item label="地址：" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
        <a-input  v-decorator="['edit_form_address', edit_form_address={
          initialValue: '',
          rules: [{
            required: true, message: this.$t('FILTERS.ADDRESS.NULL'), // 校验手机 请输入常住地址
          }]
        }]" size="large" placeholder="请输入需要修改的地址" ></a-input>
      </a-form-item>
    </a-form>
    <template slot="footer">
      <a-button key="back" @click="handleModalCancel">取消</a-button>
      <a-button key="submit" type="primary" :loading="loading" @click="handleModalOk">
        提交
      </a-button>
    </template>
  </a-modal>
</template>
<script>
  import { mapState, mapActions, mapMutations } from 'vuex'
  
  export default {
    data(){
      return {
        loading: false
      }
    },
    beforeCreate(){
      this.form = this.$form.createForm(this);
    },
    computed: {
      ...mapState({
        usersList: state => state.store.usersList,
        userInfo: state => state.store.editUserInfo
      }),
      // 绑定点为v-model 故get和set方法都要写
      editUserModalShow: {
        get(){
          if(this.$store.state.store.editUserModalShow === true) {
            this.initModal()
          }
          return this.$store.state.store.editUserModalShow;
        },
        set(val){
          this.TOGGLE_USER_EDIT_MODAL({show: val, info: {}})
        }
      }
      
    },
    methods: {
      ...mapMutations('store', ['TOGGLE_USER_EDIT_MODAL','UPDATE_USERS_LIST']),
      ...mapActions('store', [ 'getUsersList']),
      initModal(){
        this.loading = false;
        // 通过读取列表数据为表单赋值
        setTimeout(()=>{
          this.form.setFieldsValue({
            edit_form_username: this.userInfo.username,
            edit_form_realname: this.userInfo.realname,
            edit_form_email: this.userInfo.email,
            edit_form_phone: this.userInfo.phone,
            edit_form_address: this.userInfo.address
          });
        }, 0);
      },
      handleModalOk(e){
        e.preventDefault();
        this.loading = true;
        this.form.validateFieldsAndScroll(async (err, values) => {
          if (!err) {
            try{
              let userInfoObj = {
                username: values.edit_form_username,
                realname: values.edit_form_realname,
                phone: values.edit_form_phone,
                email: values.edit_form_email,
                address: values.edit_form_address
              };
              await this.UPDATE_USERS_LIST({id: this.userInfo.key, info: userInfoObj});
              await this.$message.success('修改成功!', 0.5);
              this.TOGGLE_USER_EDIT_MODAL({show: false, info: {}})
            }catch(e){
              this.loading = false;
              throw e
            }
          }
        });
      },
      handleModalCancel(){
        // this.loading = false;
        this.TOGGLE_USER_EDIT_MODAL({show: false, info: {}})
      }
    }
  }
</script>
<style lang="less">

</style>
