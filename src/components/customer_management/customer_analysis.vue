<template>
    <div class="navigation-content">
    <div class="ant-page-header">
      <a-breadcrumb>
        <a-breadcrumb-item>
          <a href="#/customer_analysis"><a-icon type="home" /></a>
        </a-breadcrumb-item>
        <a-breadcrumb-item>
          {{$t('DATACHART.NAME')}}
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>

    <detail-drawer v-if="drawerExist"></detail-drawer>
  </div>
</template>
<script>
export default {
  
}
</script>
<style>

</style>
