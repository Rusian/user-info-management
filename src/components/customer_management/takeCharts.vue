<template>
  <div>
    <div id="chart" class="chart-container" style="height: 450px"></div>

  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import echarts from 'echarts'



const colorSets = ["#1890ff", "#2fc25b", "#facc14", "#223273", "#8543e0", "#13c2c2", "#3436c7", "#f04864"]

export default {
  
  mounted() {
    this.loadChart()
  },

  computed: {
    ...mapState({
      useConditionList: state => state.store.useConditionList
    })
  },

  methods: {
    ...mapMutations('store', ['FILL_CONDITION_LIST']),
    ...mapActions('store', [ 'getConditionList']),
  
    timexAxis(){
      var now = new Date();
      var res=[];
      var len =12;
      while(len--) {
        res.unshift(now.toLocaleString().replace(/^\D*/,''));
        now = new Date(now - 6000);
      }
      return res;
    },
    
    timeAxis(){
      var data = useConditionList.uptime


    },

    convertCPU(data){
      if(data == NaN)
        cpuPer = 0
      let cpuPer = parseFloat((data/100).toFixed(2))
      return cpuPer
    },

    convertGB(data){
      if(data == NaN)
        ram = 0
      let ram = parseFloat((data/1024).toFixed(2))
      return ram

    },


    loadChart(){
      this.Chart = echarts.init(document.getElementById('chart'))
      this.chartOpt = {
        color: colorSets,
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            animation: false
          }
        },
        grid: [{
          id: 0,
          top: 40,
          left: 50,
          right: 20,
          height: 150
        },
        {
          id: 1,
          left: 50,
          right: 20,
          top: 250,
          height: 150
        }],
        xAxis: [
          {
            id: 0,
            type: 'category',
            boundaryGap: false,
            axisLine: {onZero: true},
            data: (this.timexAxis)()
          },
          {
            gridIndex: 1,
            id: 1,
            type: 'category',
            boundaryGap: false,
            axisLine: {onZero: true},
            data:  (this.timexAxis)(),
            // position: 'top',
            // axisLabel: {
            //   show: false
            // }
          }
        ],
        yAxis: [
          {
            id: 0,
            name: 'CPU使用率(%)',
            type: 'value',
            max: 100
          },
          {
            gridIndex: 1,
            id: 1,
            name: '内存使用量(GB)',
            type: 'value',
            max: 100
          }
        ],
        series: [
          {
            name: 'CPU',
            type: 'line',
            symbolSize: 4,
            data: this.cpuData.cpu
          },
          {
            name: 'RAM',
            type: 'line',
            xAxisIndex: 1,
            yAxisIndex: 1,
            symbolSize: 4,
            areaStyle: {normal: {}},
            data: this.ramData.useram
          }
        ]
      };
      this.Chart.setOption(this.chartOpt);
    }
  }
}
</script>
<style>

</style>
