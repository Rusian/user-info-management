<template>
  <div class="page page-login">
    <h1 id="logo"><img class="logo-img" src="../../../static/images/logo.png" alt="user-info"></h1>
    <div class="login-box" id="main-login-box">
      <h2 class="title" id="product-title">{{$t('PRODUCT-INFOS.PRODUCT-NAME')}}<br><small>{{$t('PRODUCT-INFOS.PRODUCT-NAME-EN')}}</small></h2>
      <h3>{{$t('LOGIN.TITLE')}}</h3>
      <a-form :form="form" @submit="submit">
        <a-form-item>
          <a-input size="large" autocomplete="off" ref="userNameInput" v-decorator="['login_form_username', formConfigs.login_form_username]">
            <a-icon slot="prefix" type="user" />
            <a-icon v-if="username_fill" slot="suffix" type="close-circle" @click="emitEmpty()" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input size="large" autocomplete="off" :type="passwdHide?'password':'text'" v-decorator="['login_form_password', formConfigs.login_form_password]">
            <a-icon slot="prefix" type="key" />
            <a-icon slot="suffix" :type="passwdHide?'eye':'eye-invisible'" @click="passwdHide = !passwdHide"/>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button size="large" type="primary" id="login_form_submit" :loading="loading" html-type="submit" block>{{$t('LOGIN.LOGININ')}}</a-button>
        </a-form-item>
      </a-form>
    </div>
    <div class="footer" id="login-page-footer">
      <p class="copyright">&copy;2019 {{$t('PRODUCT-INFOS.COPYRIGHT')}}</p>
    </div>
  </div>
</template>
<script>
  import { mapState, mapActions, mapMutations } from 'vuex'
  export default {
    data(){
      return {
        username_fill: false,
        passwdHide: true,
        loading: false,
        formConfigs: {
          login_form_username: {
            initialValue: '',
            rules: [{ required: true, message: '请输入用户名' }],
          },
          login_form_password: {
            initialValue: '',
            rules: [{ required: true, message: '请输入密码' },
            {min: 6, message: this.$t('FILTERS.PASSWORD.MINSIZE')}]
          }
        }
      }
    },
    mounted(){
      // 进入登录页面之后清除store的内容
      this.EMPTY_STORE();
      // 进入登录页面重置修改密码弹窗状态 防止登录其他用户时误弹起
      // this.TOGGLE_MODIFY_PASS_MODAL({show: false, closeable: true})
    },
    computed: {
      ...mapState({
        login_form_data: state => state.store.login_form_data,
        admininfo: state => state.store.admininfo,
        routePaths: state => state.store.routePaths
      })
    },
    created(){
      this.form = this.$form.createForm(this, {
        onFieldsChange: (_, changedFields) => {
          if(changedFields.login_form_username){
            this.username_fill = changedFields.login_form_username.value !== ""
          }
        }
      })
    },
    methods: {
      ...mapMutations('store', [ 'SET_PATH', 'SET_USER_INFO', 'EMPTY_STORE']),
      ...mapActions('store', ['submitLogin', 'getUsersList']),
      // 重置登录表单
      resetForm(){
        this.form.resetFields()
      },
      // 提交登录
      async submit(e){
        e.preventDefault();
        this.loading = true;
        this.form.validateFieldsAndScroll(async (err, values) => {
          if (!err) {
            try{
              // await this.getUsersList();
              await this.$message.success('登录成功', 0.5);
              this.$router.push({path: this.routePaths[0]});
            }catch(error){
              this.loading = false;
            }
          }else{
            this.loading = false;
          }
        })
      },
      // 清空用户名功能
      emitEmpty () {
        this.$refs.userNameInput.focus();
        this.form.setFieldsValue({login_form_username: ''})
      }
    }
  }
</script>
<style lang="less">
  @import "../../assets/less/login";
</style>
