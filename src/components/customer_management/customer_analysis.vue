<template>
    <div class="navigation-content">
    <div class="ant-page-header">
      <a-breadcrumb>
        <a-breadcrumb-item>
          <a href="#/admin"><a-icon type="home" /></a>
        </a-breadcrumb-item>
        <a-breadcrumb-item>
          {{$t('DATACHART.NAME')}}
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <a-card :bordered="false" :bodyStyle="{'padding': '24px'}">
    <takeCharts></takeCharts>
    </a-card>

   
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex' 
import { takeCharts } from '~/customer_management'
import { async } from 'q';
export default {
  components:{
    takeCharts
  },
  computed: {
    ...mapState({
      useConditionList: state => state.store.useConditionList
    })
  },

}
</script>
<style>

</style>
