<template>
    <div id="app">
      <router-view/>
    </div>
</template>

<script>
  import { mapState, mapActions, mapMutations } from 'vuex'
  import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
export default {
  name: 'App',
  data(){
    return{
      zhCN,
      counter: 0
    }
  },
  mounted(){
    // 系统统一计时器
    if(!this.pulseInterval){
      this.pulseInterval = setInterval(()=>{
        this.counter++;
        this.SET_COUNTER({counter: this.counter})
      }, 5000);
    }else{
      this.counter = 0;
      clearInterval(this.pulseInterval)
    }
  },
  methods: {
    ...mapMutations('store', ['SET_COUNTER'])
  },
  destroyed(){
    this.counter = 0;
    clearInterval(this.pulseInterval)
  }
}
</script>

<style lang="less">

@static_image_path: "../../../static/images";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.ant-page-header{
  .ant-breadcrumb{
    margin-bottom: 12px;
  }

  .ant-page-header-title-view{
    padding-bottom: 12px;
  }

  .ant-tabs-bar{
    margin-bottom: 0;
    border-bottom-color: #fff;
  }

  .ant-tabs-content{
    display: none!important;
  }
}

  h4.ant-typography {
    margin-bottom: .5em;
    color: rgba(0,0,0,.85);
    font-weight: 600;
    font-size: 18px;
    line-height: 1.4;
  }
  
  // 页面内的搜索和操作表单
  .page-search-form{
    margin-bottom: 24px;

    & > .ant-row{
      margin-bottom: 16px;
      &:last-child{
        margin-bottom: 0;
      }
    }
  }

  .ant-table{
    p{
      margin-bottom: 0;
    }
  }

  // form
.step-form-wrapper{
  width: 540px;
  margin: 55px auto 0;
}

</style>
