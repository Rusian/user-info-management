<template>
  <a-modal title="编辑信息" v-model="editUserModalShow" @ok="handleModalOk" @cancle="handleModalCancel">
    <a-form :form="form" @submit="handleModalOk">
      <a-form-item label="账户名：" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
        <a-input v-decorator="['update_form_username', formConfigs.update_form_username]" size="large" placeholder="请输入需要修改的用户名" ref="userNameInput" disabled>
        </a-input>
      </a-form-item >
      <a-form-item label="姓名：" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
        <a-input v-decorator="['update_form_realname', formConfigs.update_form_realname]" size="large" placeholder="请输入需要修改的姓名" ref="userNameInput">
        </a-input>
      </a-form-item >
      <a-form-item label="邮箱：" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
        <a-input   v-decorator="['update_form_mailbox', formConfigs.update_form_mailbox]" size="large" placeholder="请输入需要修改的邮箱"  ></a-input>
      </a-form-item>
      <a-form-item label="手机：" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
        <a-input  v-decorator="['update_form_phone', formConfigs.update_form_phone]" size="large" placeholder="请输入需要修改的手机" ></a-input>
      </a-form-item>
       <a-form-item label="地址：" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
        <a-input  v-decorator="['update_form_address', formConfigs.update_form_address]" size="large" placeholder="请输入需要修改的地址" ></a-input>
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
        // 表单项目设置项
        formConfigs: {
          update_form_username: {
            initialValue: '',
            rules: [{ required: true, message: this.$t('FILTERS.USERNAME.NULL'), whitespace: true }]
          },
          update_form_realname: {
            initialValue: '',
            rules: [{ required: false, message: 'Please input your realname!', whitespace: true },
              {max: 16, message: this.$t('FILTERS.realname.MAXSIZE')} // 校验昵称 昵称最大长度为16位
            ]
          },
          update_form_mailbox: {
            initialValue: '',
            rules: [{
              type: 'email', message: this.$t('FILTERS.MAILBOX.ERR'), // 校验邮箱 请输入正确格式的邮箱
            }, {
              required: true, message: this.$t('FILTERS.MAILBOX.NULL'), // 校验邮箱 请输入常用邮箱
            }]
          },
          update_form_phone: {
            initialValue: '',
            rules: [{
              required: true, message: this.$t('FILTERS.PHONE.NULL'), // 校验手机 请输入常用手机
            },{
              pattern: this.patterns.phone, message: this.$t('FILTERS.PHONE.ERR')  // 校验手机 请输入正确格式的手机号
            }],
          },
          update_form_address: {
            initialValue: '',
            rules: [{
              required: true, message: this.$t('FILTERS.ADDRESS.NULL'), // 校验手机 请输入常住地址
            }],
          },
          loading: false
        }
      }
    },
    beforeCreate(){
      this.form = this.$form.createForm(this);
    },
    computed: {
      ...mapState({
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
      ...mapMutations('store', ['TOGGLE_USER_EDIT_MODAL']),
      ...mapActions('store', ['sendUserEditForm', 'getUsersList']),
      initModal(){
        this.loading = false;
        // 通过读取列表数据为表单赋值
        setTimeout(()=>{
          this.form.setFieldsValue({
            update_form_username: this.userInfo.username,
            update_form_realname: this.userInfo.name,
            update_form_mailbox: this.userInfo.email,
            update_form_phone: this.userInfo.phone,
            update_form_address: this.userInfo.address
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
                username: values.update_form_username,
                name: values.update_form_realname,
                phone: values.update_form_phone,
                email: values.update_form_mailbox,
                address: values.update_form_address
              };
              await this.sendUserEditForm({id: this.userInfo.id, info: userInfoObj});
              await this.$message.success('修改成功!', 0.5);
              await this.getUsersList(this.searchObj);
              this.TOGGLE_USER_EDIT_MODAL({show: false, info: {}})
            }catch(e){
              this.loading = false;
              throw e
            }
          }
        });
      },
      handleModalCancel(){
        this.loading = false;
        this.TOGGLE_USER_EDIT_MODAL({show: false, info: {}})
      }
    }
  }
</script>
<style lang="less">

</style>
